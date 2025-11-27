import { ImageLoader } from '@components';
import type { Movie } from '@ts-types';

import styles from './movie-card.module.css';

export const MovieCard: React.FC<Movie> = (movie) => {
  return (
    <figure className={styles.card}>
      <ImageLoader
        className={styles.poster}
        src={movie.Poster}
        alt={movie.Title}
      />
      <div className={styles.info}>
        <figcaption>Name: {movie.Title}</figcaption>
        <p>Year: {movie.Year}</p>
        <p>imdbID: {movie.imdbID}</p>
        <p>Type: {movie.Type}</p>
      </div>
    </figure>
  );
};
