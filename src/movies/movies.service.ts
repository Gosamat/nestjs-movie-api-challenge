import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { CreateMovieDto } from './dto/create-movies.dto';
import { Genre } from '../genres/genres.entity';
import { UpdateMovieDto } from './dto/update-movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  // Retrieves a paginated list of all the movies.
  async getAllMovies(page: number = 1, limit: number = 10) {
    try {
      const [movies, totalCount] = await this.moviesRepository.findAndCount({
        relations: ['genres'], // Load the 'genres' relation
        skip: (page - 1) * limit,
        take: limit,
      });
      return {
        movies,
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      };
    } catch (error) {
      throw new Error("Oops! We couldn't fetch the movies: " + error.message);
    }
  }

  // Searches movie collection based on title or genre with support for pagination.
  async searchMovies(
    title: string | null,
    genre: string | null,
    page: number = 1,
    limit: number = 10,
  ) {
    try {
      const queryBuilder = this.moviesRepository.createQueryBuilder('movie');
      queryBuilder.leftJoinAndSelect('movie.genres', 'genre'); // Use leftJoin instead of innerJoin

      console.log(title, genre);
      if (title && genre) {
        queryBuilder.where('movie.title = :title AND genre.name = :genre', {
          title,
          genre,
        }); // Apply both title and genre conditions
      } else if (title) {
        queryBuilder.where('movie.title = :title', { title }); // Apply only title condition
      } else if (genre) {
        queryBuilder.where('genre.name = :genre', { genre }); // Apply only genre condition
      }

      const [movies, totalCount] = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
      return {
        movies,
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      };
    } catch (error) {
      throw new Error("Oops! We couldn't fetch the movies: " + error.message);
    }
  }

  // Adds a new movie.
  async addMovie(receivedMovie: CreateMovieDto): Promise<Movie> {
    try {
      const { title, description, releaseDate, genre } = receivedMovie;

      // Check if movie with the same title already exists
      const existingMovie = await this.moviesRepository.findOne({
        where: { title: receivedMovie.title },
      });
      if (existingMovie) {
        throw new Error('Movie with the same name already exists');
      }

      // Find or create genres and associate them with the movie
      let genres: Genre[] = [];
      if (genre && genre.length > 0) {
        genres = await Promise.all(
          genre.map(async (genreName) => {
            let existingGenre = await this.genresRepository.findOne({
              where: { name: genreName },
            });
            if (!existingGenre) {
              existingGenre = this.genresRepository.create({ name: genreName });
              await this.genresRepository.save(existingGenre);
            }

            // Return the existing or new genre
            return existingGenre;
          }),
        );
      }

      // Create the movie entity without associating genres
      const newMovie = this.moviesRepository.create({
        title,
        description,
        releaseDate,
        genres,
      });

      // Save the movie with the associated genres
      return await this.moviesRepository.save(newMovie);
    } catch (error) {
      throw new Error('Oops! Failed to add the movie: ' + error.message);
    }
  }

  // Updates the information of an existing movie.
  async updateMovie(id: number, updatedMovieInfo: UpdateMovieDto) {
    try {
      const foundMovie = await this.moviesRepository.findOne({ where: { id } });

      if (!foundMovie) {
        throw new NotFoundException(
          "Sorry, we couldn't find a movie with that ID",
        );
      }

      await this.moviesRepository.update(id, updatedMovieInfo);

      // Fetch the updated movie
      const updatedMovie = await this.moviesRepository.findOne({
        where: { id },
      });

      return updatedMovie;
    } catch (error) {
      throw new Error('Oops! Failed to update the movie: ' + error.message);
    }
  }

  // Removes a movie based on its ID.
  async deleteMovie(id: number) {
    try {
      const foundMovie = await this.moviesRepository.findOne({ where: { id } });
      const movieTitle = foundMovie.title;

      if (!foundMovie) {
        throw new NotFoundException(
          "Sorry, we couldn't find a movie with that ID",
        );
      }

      await this.moviesRepository.delete(id);

      return `Successfully removed the movie: ${movieTitle}`;
    } catch (error) {
      throw new Error('Oops! Failed to remove the movie: ' + error.message);
    }
  }
}
