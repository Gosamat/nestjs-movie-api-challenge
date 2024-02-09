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

import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenreService) {}

  @Get()
  getAllGenres() {
    return this.genresService.getAllGenres();
  }

  @Post()
  addGenre(@Body() genreName: CreateGenreDto) {
    return this.genresService.addGenre(genreName);
  }
}
