import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { CreateMovieDto, createMovieSchema } from './dto/create-movies.dto';

import { MovieService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  // Route to display list of Movies
  //Implemented
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  // Route to add a Movie to the Database
  //Implemented
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    try {
      // Validate body against zod schema
      createMovieSchema.parse(createMovieDto);
      this.movieService.create(createMovieDto)
      // Return confirmation and title of added movie
      return 'New Movie added: ' + createMovieDto.title;
    } catch (error) {
      // If validation fails, return error message
      return 'error adding movie: ' + error.message;
    }
  }
  // Route update details of a specific Movie
  // WIP
  @Patch()
  update() {
    return 'updating movie';
  }

  // Route delete specific Movie
  // WIP
  @Delete()
  remove() {
    return 'deleting movie';
  }
}
