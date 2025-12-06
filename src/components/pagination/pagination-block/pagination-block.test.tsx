import { act, render, screen } from '@testing-library/react';
import type { MoviesData, MoviesErrorResponse } from '@ts-types';

import { createMockMovies } from '@/mocks/utils/create-mock-movies';
import { WithSuspense } from '@/mocks/with-suspense-wrapper';

import { PaginationBlock } from './pagination-block';

vi.mock('@components', () => ({
  PaginationItem: ({ page }: { page: number | '...' }) => <div>{page}</div>,
  PaginationEdges: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('PaginationBlock', () => {
  it('should not render if promise resolves with error response', async () => {
    const errorPromise: Promise<MoviesErrorResponse> = Promise.resolve({
      Response: 'False',
      Error: 'test error',
    });

    await act(async () => {
      render(
        <WithSuspense
          Component={PaginationBlock}
          moviesPromise={errorPromise}
        />
      );
    });

    expect(screen.queryByTestId('pagination-block')).not.toBeInTheDocument();
  });

  it('should not render if promise resolves with empty "searchTerm"', async () => {
    const emptyPromise: Promise<MoviesData> = Promise.resolve({
      Response: 'True',
      movies: createMockMovies(),
      totalResults: 50,
      searchTerm: '',
      currentPage: 1,
    });

    await act(async () => {
      render(
        <WithSuspense
          Component={PaginationBlock}
          moviesPromise={emptyPromise}
        />
      );
    });

    expect(screen.queryByTestId('pagination-block')).not.toBeInTheDocument();
  });

  it('should not render if there is only one page', async () => {
    const emptyPromise: Promise<MoviesData> = Promise.resolve({
      Response: 'True',
      movies: createMockMovies(1),
      totalResults: 1,
      searchTerm: 'test',
      currentPage: 1,
    });

    await act(async () => {
      render(
        <WithSuspense
          Component={PaginationBlock}
          moviesPromise={emptyPromise}
        />
      );
    });

    expect(screen.queryByTestId('pagination-block')).not.toBeInTheDocument();
  });

  it('should display correct results if promise resolves successfully', async () => {
    const moviesPromise: Promise<MoviesData> = Promise.resolve({
      Response: 'True',
      movies: createMockMovies(),
      totalResults: 100,
      searchTerm: `test`,
      currentPage: 1,
    });

    await act(async () => {
      render(
        <WithSuspense
          Component={PaginationBlock}
          moviesPromise={moviesPromise}
        />
      );
    });

    expect(screen.queryByTestId('pagination-block')).toBeInTheDocument();
  });
});
