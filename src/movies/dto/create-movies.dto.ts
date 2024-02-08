import { z } from 'zod';

export const createMovieDto = z.object({
  title: z.string(),
  description: z.string(),
  releaseDate: z.date(),
  genres: z.array(z.string()),
});

export type CreateMovieDto = z.infer<typeof createMovieDto>;
