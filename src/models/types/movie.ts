import type { MovieResponseSchema, MovieSchema } from '@schemas';
import type { z } from 'zod';

export type Movie = z.infer<typeof MovieSchema>;

export type MoviesResponse = z.infer<typeof MovieResponseSchema>;
