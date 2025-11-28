import type { Movie } from '@ts-types';

export interface MoviesData {
  movies: Movie[];
  totalResults: string;
  searchTerm: string;
}
