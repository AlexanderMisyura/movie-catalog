import { MovieCard } from '@components';

import type { Movie } from '@/models/types/movie';

import styles from './movie-grid.module.css';

export const MovieGrid: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} {...movie} />
      ))}
    </div>
  );
};
