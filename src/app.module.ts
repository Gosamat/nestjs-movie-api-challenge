import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movies/movies.module';
import { GenreModule } from './genres/genres.module';

@Module({
  imports: [
    // Importing modules related to different features such as movies and genre
    MovieModule,
    GenreModule,
    // using TypeORM for general database integration
    // Database implementation is for testing uses only,
    // in a real environment the information would be stored in a .env file
    // so as to not be displayed publicly
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
