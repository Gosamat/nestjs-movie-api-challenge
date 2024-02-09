import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const createMovieSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    releaseDate: z.coerce.date(),
    genre: z.array(z.string()),
  })
  .required();

export type CreateMovieDto = z.infer<typeof createMovieSchema>;

// ApiProperty decorator for each property
export class CreateMovieDtoApiDocs {
  @ApiProperty({ description: 'Title of the movie' })
  title: string;

  @ApiProperty({ description: 'Description of the movie' })
  description: string;

  @ApiProperty({ description: 'Release date of the movie' })
  releaseDate: Date;

  @ApiProperty({ description: 'Genres of the movie' })
  genre: string[];
}
