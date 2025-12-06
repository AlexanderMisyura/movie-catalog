import { messages } from '@constants';
import { act, render, screen } from '@testing-library/react';
import type { MoviesData, MoviesErrorResponse } from '@ts-types';

import { createMockMovies } from '@/mocks/utils/create-mock-movies';
import { WithSuspense } from '@/mocks/with-suspense-wrapper';

import { SearchTitle } from './search-title';

describe('SearchTitle', () => {
  it('should not render if promise resolves with error response', async () => {
    const errorPromise: Promise<MoviesErrorResponse> = Promise.resolve({
      Response: 'False',
      Error: 'test error',
    });

    await act(async () => {
      render(
        <WithSuspense Component={SearchTitle} moviesPromise={errorPromise} />
      );
    });

    expect(
      screen.queryByText(messages.searchTitle.searchedFor)
    ).not.toBeInTheDocument();
  });

  it('should not render if promise resolves with empty "searchTerm"', async () => {
    const emptyPromise: Promise<MoviesData> = Promise.resolve({
      Response: 'True',
      movies: [],
      totalResults: 0,
      searchTerm: '',
      currentPage: 1,
    });

    await act(async () => {
      render(
        <WithSuspense Component={SearchTitle} moviesPromise={emptyPromise} />
      );
    });

    expect(
      screen.queryByText(messages.searchTitle.searchedFor)
    ).not.toBeInTheDocument();
  });

  it('should display correct results if promise resolves successfully', async () => {
    const totalResults = 3;
    const searchTerm = 'test';
    const moviesPromise: Promise<MoviesData> = Promise.resolve({
      Response: 'True',
      movies: createMockMovies(totalResults),
      totalResults,
      searchTerm,
      currentPage: 1,
    });

    await act(async () => {
      render(
        <WithSuspense Component={SearchTitle} moviesPromise={moviesPromise} />
      );
    });

    expect(
      screen.getByText(messages.searchTitle.searchedFor)
    ).toBeInTheDocument();
    expect(screen.getByText(searchTerm)).toBeInTheDocument();
    expect(screen.getByText(`${totalResults} results`)).toBeInTheDocument();
  });
});
