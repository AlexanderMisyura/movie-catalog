import type { MoviesData, MoviesErrorResponse } from '@ts-types';

export interface MoviesPromiseProps {
  moviesPromise: Promise<MoviesData | MoviesErrorResponse>;
}
