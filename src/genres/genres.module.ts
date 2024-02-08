import { Module } from '@nestjs/common';
import { GenreController } from './genres.controller';
import { GenreService } from './genres.service';
import { Genre } from './genres.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
