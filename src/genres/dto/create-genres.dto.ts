import { z } from 'zod';


export const createGenreDto = z.object({
    name: z.string(),
  });
  
  export type CreateGenreDto = z.infer<typeof createGenreDto>;
  
