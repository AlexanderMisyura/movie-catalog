import { messages } from '@constants';
import type { MoviesPromiseProps } from '@ts-interfaces';
import { use } from 'react';

import styles from './search-title.module.css';

export const SearchTitle: React.FC<MoviesPromiseProps> = ({
  moviesPromise,
}) => {
  const resolved = use(moviesPromise);

  if (resolved.Response === 'False') {
    return null;
  }

  const { searchTerm, totalResults } = resolved;

  if (!searchTerm) {
    return null;
  }

  return (
    <div className={styles.searchLine}>
      <div className={styles.searchTitle}>
        {messages.searchTitle.searchedFor}{' '}
        <span className={styles.searchTerm}>{searchTerm}</span>{' '}
      </div>
      <span className={styles.searchNumber}>{`${totalResults} results`}</span>
    </div>
  );
};
