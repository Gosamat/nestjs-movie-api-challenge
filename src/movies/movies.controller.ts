import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Query,
} from '@nestjs/common';

import { CreateMovieDto } from './dto/create-movies.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // Create a new movie
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  // Get all movies with pagination support
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.moviesService.find(page, limit);
  }

  // Search for movies by title and genre
  @Post('search')
  findByTitleAndGenre(
    @Body() searchParams: { title: string, genre: string },
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.moviesService.findBy(searchParams.title, searchParams.genre, page, limit);
  }

  // Update a movie by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedMovieDto: CreateMovieDto) {
    return this.moviesService.update(+id, updatedMovieDto);
  }

  // Delete a movie by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
