import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('genres')
export class GenreController {
  // Route to display list of Movies
  //Implemented
  @Get()
  findAll() {
    return 'list genres';
  }
}
