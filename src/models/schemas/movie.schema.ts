import { z } from 'zod';

export const MovieSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  Poster: z.string(),
});

export const MoviesDataSchema = z.object({
  movies: z.array(MovieSchema),
  totalResults: z.string(),
  searchTerm: z.string(),
});
