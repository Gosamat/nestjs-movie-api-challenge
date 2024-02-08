import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { Genre } from '../genres/genres.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  // Method to add new movie to movies array
  async create(movieData: Partial<Movie>): Promise<Movie> {
    // Check if movie already exists with the same title
    const existingMovie = await this.moviesRepository.findOne({
      where: { title: movieData.title },
    });
    if (existingMovie) {
      throw new Error('Movie with the same title already exists.');
    }

    // Check if genre already exists in the genre repository
    let genre = await this.genreRepository.findOne({
      where: { name: movieData.genre[0] },
    });
    if (!genre) {
      // If genre doesn't exist, create a new one
      genre = this.genreRepository.create({ name: movieData.genre[0] });
      genre = await this.genreRepository.save(genre);
    }

    // Create a new movie entity
    const newMovie = this.moviesRepository.create({ ...movieData, genre });
    return this.moviesRepository.save(newMovie);
  }

  // Method to retrieve all movies from the movie array
  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }
}
