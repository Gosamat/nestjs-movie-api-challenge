import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './movies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/genres/genres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MovieModule {}
