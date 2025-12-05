import { MovieCard } from '@components';
import { messages } from '@constants';
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
    return (
      <p data-testid="data-parse-error" className={styles.message}>
        {moviesDataParsed.error.message}
      </p>
    );
  }

  const { movies, searchTerm } = moviesDataParsed.data;

  if (!searchTerm) {
    return (
      <p className={styles.message}>{messages.movieGrid.initialMessage}</p>
    );
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie, index) => (
        <MovieCard
          key={`${movie.imdbID}${movies[index - 1]?.imdbID ?? ''}`}
          {...movie}
        />
      ))}
    </div>
  );
};
