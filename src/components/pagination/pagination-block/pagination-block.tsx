import { PaginationEdges, PaginationItem } from '@components';
import { MoviesDataSchema } from '@schemas';
import type { MoviesPromiseProps } from '@ts-interfaces';
import { use } from 'react';

import { createPages } from '@/utils/create-pages';

import styles from './pagination-block.module.css';

export const PaginationBlock: React.FC<MoviesPromiseProps> = ({
  moviesPromise,
}) => {
  const resolved = use(moviesPromise);

  const moviesDataParsed = MoviesDataSchema.safeParse(resolved);

  if (!moviesDataParsed.success) {
    return null;
  }

  const { currentPage, totalResults, searchTerm } = moviesDataParsed.data;

  const pages = createPages(currentPage, totalResults);

  if (!searchTerm || pages.length < 2) {
    return null;
  }

  return (
    <div className={styles.paginationBlock}>
      <PaginationEdges
        previousPage={currentPage - 1}
        nextPage={currentPage + 1}
        pages={pages}
        searchTerm={searchTerm}
      >
        {pages.map((page, index) => {
          return (
            <PaginationItem
              key={`${pages[index - 1]}${page}`}
              page={page}
              searchTerm={searchTerm}
              isActive={page === currentPage}
            />
          );
        })}
      </PaginationEdges>
    </div>
  );
};
