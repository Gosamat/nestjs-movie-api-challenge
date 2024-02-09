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
      const existingGenre = await this.genresRepository.findOne({
        where: { name: receivedGenreName.name },
      });
      if (existingGenre) {
        throw new Error('Genre with the same name already exists');
      }

      const newGenre = await this.genresRepository.create({
        name: receivedGenreName.name,
      });
      return await this.genresRepository.save(newGenre);
    } catch (error) {
      throw new Error('Oops! Failed to add the Genre: ' + error.message);
    }
  }

  async deleteGenre(id: number) {
    try {
      // Find the genre by its ID
      const genre = await this.genresRepository.findOne({
        where: { id },
        relations: ['movies'],
      });
      console.log(genre);
      if (!genre) {
        throw new Error('Genre not found');
      }
      const deletedGenreName = genre.name;

      // Delete records from the movie_genres_genre table
      await this.genresRepository
        .createQueryBuilder()
        .delete()
        .from('movie_genres_genre')
        .where('genreId = :id', { id })
        .execute();

      // Delete the genre
      await this.genresRepository.delete(id);
      return `Genre '${deletedGenreName}' has been deleted`;
    } catch (error) {
      throw new Error('Error while attempting to delete Genre');
    }
  }
}
