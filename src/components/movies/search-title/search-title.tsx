import type { MoviesData } from '@ts-interfaces';
import { use } from 'react';

import styles from './search-title.module.css';

export const SearchTitle: React.FC<{ moviesPromise: Promise<MoviesData> }> = ({
  moviesPromise,
}) => {
  const { searchTerm, totalResults } = use(moviesPromise);

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
