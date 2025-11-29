import type {
  MovieErrorResponseSchema,
  MovieResponseSchema,
  MovieSchema,
  MoviesDataSchema,
} from '@schemas';
import type { z } from 'zod';

export type Movie = z.infer<typeof MovieSchema>;

export type MoviesResponse = z.infer<typeof MovieResponseSchema>;

export type MoviesErrorResponse = z.infer<typeof MovieErrorResponseSchema>;

export type MoviesData = z.infer<typeof MoviesDataSchema>;
