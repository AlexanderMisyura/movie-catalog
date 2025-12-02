import { MoviesDataSchema } from '@schemas';
import type { MoviesPromiseProps } from '@ts-interfaces';
import { use } from 'react';

import styles from './search-title.module.css';

export const SearchTitle: React.FC<MoviesPromiseProps> = ({
  moviesPromise,
}) => {
  const resolved = use(moviesPromise);

  const moviesDataParsed = MoviesDataSchema.safeParse(resolved);

  if (!moviesDataParsed.success) {
    return null;
  }

  const { searchTerm, totalResults } = moviesDataParsed.data;

  if (!searchTerm) {
    return null;
  }

  return (
    <div className={styles.searchLine}>
      <div className={styles.searchTitle}>
        You searched for:{' '}
        <span className={styles.searchTerm}>{searchTerm}</span>{' '}
      </div>
      <span className={styles.searchNumber}>{`${totalResults} results`}</span>
    </div>
  );
};
