import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MovieService } from './movies.service';
import { Movie } from './movies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MovieService],
})
export class MovieModule {}
