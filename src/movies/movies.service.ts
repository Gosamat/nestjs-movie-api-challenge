import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  // Retrieves a paginated list of all the movies available in our collection.
  async find(page: number = 1, limit: number = 10) {
    try {
      const [movies, totalCount] = await this.moviesRepository.findAndCount({
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

  // Searches our movie collection based on title, genre, or both, with support for pagination.
  async findBy(
    title: string | null,
    genre: string | null,
    page: number = 1,
    limit: number = 10,
  ) {
    try {
      let whereCondition = {};
      if (title) {
        whereCondition = { title };
      }
      if (genre) {
        whereCondition['genre'] = genre;
      }
      const [movies, totalCount] = await this.moviesRepository.findAndCount({
        where: whereCondition,
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

  // Adds a new movie to our collection.
  async create(movie: Partial<Movie>) {
    try {
      const newMovie = this.moviesRepository.create(movie);
      return await this.moviesRepository.save(newMovie);
    } catch (error) {
      throw new Error('Oops! Failed to add the movie: ' + error.message);
    }
  }

  // Updates the information of an existing movie in our collection.
  async update(id, updatedMovieInfo) {
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

  // Removes a movie from our collection based on its ID.
  async remove(id) {
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
