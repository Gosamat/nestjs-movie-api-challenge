import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const createGenreSchema = z
  .object({
    name: z.string(),
  })
  .required();

export type CreateGenreDto = z.infer<typeof createGenreSchema>;

// ApiProperty decorator for each property
export class CreateGenreDtoApiDocs {
  @ApiProperty({ description: 'Name of the genre' })
  name: string;
}
