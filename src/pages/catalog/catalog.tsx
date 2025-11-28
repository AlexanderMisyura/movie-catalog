import { ErrorBoundary, MovieGrid, SearchTitle, Spinner } from '@components';
import { useMoviesPromise } from '@hooks';
import { Suspense } from 'react';

import styles from './catalog.module.css';

export const Catalog = () => {
  const moviesPromise = useMoviesPromise();

  return (
    <>
      <title>Movie Catalog</title>

      <ErrorBoundary>
        <div className={styles.catalogData}>
          <Suspense fallback={<Spinner />}>
            <SearchTitle moviesPromise={moviesPromise} />
            <MovieGrid moviesPromise={moviesPromise} />
          </Suspense>
        </div>

        <p>pagination</p>
      </ErrorBoundary>
    </>
  );
};
