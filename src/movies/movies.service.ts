import { Injectable } from '@nestjs/common';

import { Movie } from './interfaces/movies.interface';

@Injectable()
export class MovieService {
  private readonly movies: Movie[] = [];

  // Method for add new movie to movies array
  create(movie: Movie) {
    this.movies.push(movie);
  }
  // Method to retrieve all movies from the movies array
  findAll(): Movie[] {
    return this.movies;
  }
}
