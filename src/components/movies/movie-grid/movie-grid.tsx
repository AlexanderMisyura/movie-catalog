import { MovieCard } from '@components';
import type { MoviesData } from '@ts-interfaces';
import { use } from 'react';

import styles from './movie-grid.module.css';

export const MovieGrid: React.FC<{ moviesPromise: Promise<MoviesData> }> = ({
  moviesPromise,
}) => {
  const { movies, searchTerm } = use(moviesPromise);

  if (!searchTerm) {
    return (
      <p className={styles.message}>
        To search for a movie, enter the name in the search field
      </p>
    );
  }

  if (!movies.length) {
    return <p className={styles.message}>No movies found</p>;
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} {...movie} />
      ))}
    </div>
  );
};
