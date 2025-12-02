import { ImageLoader } from '@components';
import type { Movie } from '@ts-types';

import styles from './movie-card.module.css';

export const MovieCard: React.FC<Movie> = ({
  Poster,
  Title,
  Year,
  imdbID,
  Type,
}) => {
  return (
    <figure className={styles.card}>
      <ImageLoader className={styles.poster} src={Poster} alt={Title} />
      <div className={styles.info}>
        <figcaption>Name: {Title}</figcaption>
        <p>Year: {Year}</p>
        <p>imdbID: {imdbID}</p>
        <p>Type: {Type}</p>
      </div>
    </figure>
  );
};
