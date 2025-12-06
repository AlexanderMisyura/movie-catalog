import { MovieCard } from '@components';
import { messages } from '@constants';
import type { MoviesPromiseProps } from '@ts-interfaces';
import { use } from 'react';

import styles from './movie-grid.module.css';

export const MovieGrid: React.FC<MoviesPromiseProps> = ({ moviesPromise }) => {
  const resolved = use(moviesPromise);

  if (resolved.Response === 'False') {
    return <p className={styles.message}>{resolved.Error}</p>;
  }

  const { movies, searchTerm } = resolved;

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
