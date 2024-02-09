import { z } from 'zod';

export const createMovieSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    releaseDate: z.coerce.date(),
    genre: z.array(z.string()),
  }).required();

export type CreateMovieDto = z.infer<typeof createMovieSchema>;
