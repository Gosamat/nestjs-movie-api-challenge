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
import { ApiTags, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators
import { CreateMovieDto, CreateMovieDtoApiDocs } from './dto/create-movies.dto';
import { MoviesService } from './movies.service';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  //POST route to create a new movie
  @Post()
  @ApiBody({ type: CreateMovieDtoApiDocs })
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.addMovie(createMovieDto);
  }

  // GET route to show all movies, with pagination support.
  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  getAllMovies(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.moviesService.getAllMovies(page, limit);
  }

  // GET route to search for movies by title and genre
  @Get('search')
  @ApiQuery({ name: 'title', type: String, required: false })
  @ApiQuery({ name: 'genre', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  searchMovies(
    @Body() searchParams: { title: string; genre: string },
    @Query('title') title?: string,
    @Query('genre') genre?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.moviesService.searchMovies(title, genre, page, limit);
  }

  // PATCH route to Update a movie by ID
  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateMovieDtoApiDocs })
  updateMovie(
    @Param('id') id: string,
    @Body() updatedMovieDto: CreateMovieDto,
  ) {
    return this.moviesService.updateMovie(+id, updatedMovieDto);
  }

  // DELETE route to delete a movie by ID
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteMovie(+id);
  }
}
