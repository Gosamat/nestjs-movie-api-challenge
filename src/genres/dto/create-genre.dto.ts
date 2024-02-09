import { z } from 'zod';

export const createGenreSchema = z
  .object({
    name: z.string(),
  })
  .required();

export type CreateGenreDto = z.infer<typeof createGenreSchema>;
