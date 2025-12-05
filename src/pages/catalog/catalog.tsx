import { MovieGrid, PaginationBlock, SearchTitle, Spinner } from '@components';
import { useMoviesPromise } from '@hooks';
import { Suspense } from 'react';

import styles from './catalog.module.css';

export const Catalog = () => {
  const moviesPromise = useMoviesPromise();

  return (
    <>
      <title>Movie Catalog</title>

      <Suspense fallback={<Spinner />}>
        <div data-testid="catalog-data" className={styles.catalogData}>
          <SearchTitle moviesPromise={moviesPromise} />
          <MovieGrid moviesPromise={moviesPromise} />
        </div>

        <div data-testid="pagination" className={styles.pagination}>
          <PaginationBlock moviesPromise={moviesPromise} />
        </div>
      </Suspense>
    </>
  );
};
