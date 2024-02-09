import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genres.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  async getAllGenres() {
    try {
      return await this.genresRepository.find({ relations: ['movies'] });
    } catch (error) {
      throw new Error("Couldn't fetch genre list");
    }
  }

  async addGenre(receivedGenreName: CreateGenreDto): Promise<Genre> {
    try {
      console.log(receivedGenreName);
      const newGenre = await this.genresRepository.create({
        name: receivedGenreName.name,
      });
      console.log(newGenre);
      return await this.genresRepository.save(newGenre);
    } catch (error) {
      throw new Error('Oops! Failed to add the Genre: ' + error.message);
    }
  }
}
