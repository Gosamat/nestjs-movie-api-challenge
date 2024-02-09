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
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.addMovie(createMovieDto);
  }

  // Get all movies with pagination support
  @Get()
  getAllMovies(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.moviesService.getAllMovies(page, limit);
  }

  // Search for movies by title and genre
  @Post('search')
  searchMovies(
    @Body() searchParams: { title: string; genre: string },
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.moviesService.searchMovies(
      searchParams.title,
      searchParams.genre,
      page,
      limit,
    );
  }

  // Update a movie by ID
  @Patch(':id')
  updateMovie(
    @Param('id') id: string,
    @Body() updatedMovieDto: CreateMovieDto,
  ) {
    return this.moviesService.updateMovie(+id, updatedMovieDto);
  }

  // Delete a movie by ID
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.moviesService.deleteMovie(+id);
  }
}
