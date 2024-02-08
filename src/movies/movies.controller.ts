import { Controller, Get, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  // Route to display list of Movies
  @Get()
  findAll(): string {
    return 'list of all movies';
  }

  // Route to add a Movie to the Database
  @Post()
  create(): string {
    return ' This action adds a movie';
  }

  // Route update details of a specific Movie
}
