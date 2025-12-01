import {
  ErrorBoundary,
  MovieGrid,
  PaginationBlock,
  SearchTitle,
  Spinner,
} from '@components';
import { useMoviesPromise } from '@hooks';
import { Suspense } from 'react';

import styles from './catalog.module.css';

export const Catalog = () => {
  const moviesPromise = useMoviesPromise();

  return (
    <>
      <title>Movie Catalog</title>

      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <div className={styles.catalogData}>
            <SearchTitle moviesPromise={moviesPromise} />
            <MovieGrid moviesPromise={moviesPromise} />
          </div>

          <div className={styles.pagination}>
            <PaginationBlock moviesPromise={moviesPromise} />
          </div>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
