import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenreService } from './genres.service';
import { Genre } from './genres.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenresController],
  providers: [GenreService],
})
export class GenreModule {}
