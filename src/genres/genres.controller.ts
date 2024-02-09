import { Body, Controller, Delete, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateGenreDto, CreateGenreDtoApiDocs } from './dto/create-genre.dto'; // Import CreateGenreDto and Swagger documentation
import { GenreService } from './genres.service';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenreService) {}
  // GET route to show all Genres
  @Get()
  getAllGenres() {
    return this.genresService.getAllGenres();
  }
  // POST route to add new genre
  @Post()
  @ApiBody({ type: CreateGenreDtoApiDocs })
  addGenre(@Body() genreName: CreateGenreDto) {
    return this.genresService.addGenre(genreName);
  }
  // DELETE route to remove a genre
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  deleteGenre(@Param('id') id: number) {
    return this.genresService.deleteGenre(+id);
  }
}
