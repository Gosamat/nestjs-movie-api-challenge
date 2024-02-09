import { z } from 'zod';

export const updateMovieSchema = z.object({
  title: z.string(),
  description: z.string(),
  releaseDate: z.coerce.date(),
  genre: z.array(z.string()),
});

export type UpdateMovieDto = z.infer<typeof updateMovieSchema>;
