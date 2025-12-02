import { MovieCard } from '@components';
import { MovieErrorResponseSchema, MoviesDataSchema } from '@schemas';
import type { MoviesPromiseProps } from '@ts-interfaces';
import { use } from 'react';

import styles from './movie-grid.module.css';

export const MovieGrid: React.FC<MoviesPromiseProps> = ({ moviesPromise }) => {
  const resolved = use(moviesPromise);

  const errorParsed = MovieErrorResponseSchema.safeParse(resolved);

  if (errorParsed.success) {
    return <p className={styles.message}>{errorParsed.data.Error}</p>;
  }

  const moviesDataParsed = MoviesDataSchema.safeParse(resolved);

  if (!moviesDataParsed.success) {
    return <p className={styles.message}>{moviesDataParsed.error.message}</p>;
  }

  const { movies, searchTerm } = moviesDataParsed.data;

  if (!searchTerm) {
    return (
      <p className={styles.message}>
        To search for a movie, enter the name in the search field
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} {...movie} />
      ))}
    </div>
  );
};
