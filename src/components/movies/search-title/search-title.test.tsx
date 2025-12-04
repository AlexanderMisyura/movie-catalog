import { messages } from '@constants';
import { act, render, screen } from '@testing-library/react';
import type { MoviesData, MoviesErrorResponse } from '@ts-types';
import { Suspense } from 'react';

import { createMockMovies } from '@/mocks/utils/create-mock-movies';

import { SearchTitle } from './search-title';

const TestWrapper = ({
  promise,
}: {
  promise: Promise<MoviesData | MoviesErrorResponse>;
}) => (
  <Suspense>
    <SearchTitle moviesPromise={promise} />
  </Suspense>
);

describe('SearchTitle', () => {
  it('should not render if movies data not parsed successfully', async () => {
    const errorDataOrUnsupportedPromise = Promise.resolve(
      'error-or-unsupported'
    ) as unknown as Promise<MoviesData | MoviesErrorResponse>;

    await act(async () => {
      render(<TestWrapper promise={errorDataOrUnsupportedPromise} />);
    });

    expect(
      screen.queryByText(messages.searchTitle.searchedFor)
    ).not.toBeInTheDocument();
  });

  it('should not render if promise resolves with empty "searchTerm"', async () => {
    const emptyPromise: Promise<MoviesData> = Promise.resolve({
      movies: [],
      totalResults: 0,
      searchTerm: '',
      currentPage: 1,
    });

    await act(async () => {
      render(<TestWrapper promise={emptyPromise} />);
    });

    expect(
      screen.queryByText(messages.searchTitle.searchedFor)
    ).not.toBeInTheDocument();
  });

  it('should display correct results if promise resolves successfully', async () => {
    const totalResults = 3;
    const searchTerm = 'test';
    const moviesPromise: Promise<MoviesData> = Promise.resolve({
      movies: createMockMovies(totalResults),
      totalResults,
      searchTerm,
      currentPage: 1,
    });

    await act(async () => {
      render(<TestWrapper promise={moviesPromise} />);
    });

    expect(
      screen.getByText(messages.searchTitle.searchedFor)
    ).toBeInTheDocument();
    expect(screen.getByText(searchTerm)).toBeInTheDocument();
    expect(screen.getByText(`${totalResults} results`)).toBeInTheDocument();
  });
});
