import { messages } from '@constants';
import { act, render, screen } from '@testing-library/react';
import type { MoviesData, MoviesErrorResponse } from '@ts-types';

import { createMockMovies } from '@/mocks/utils/create-mock-movies';
import { WithSuspense } from '@/mocks/with-suspense-wrapper';

import { MovieGrid } from './movie-grid';

vi.mock('@components', () => ({
  MovieCard: () => <div data-testid="movie-card" />,
}));

describe('MovieGrid', () => {
  it('should display error message from promise if it resolves with error response', async () => {
    const errorMessage = 'test error';

    const errorPromise: Promise<MoviesErrorResponse> = Promise.resolve({
      Response: 'False',
      Error: errorMessage,
    });

    await act(async () => {
      render(
        <WithSuspense Component={MovieGrid} moviesPromise={errorPromise} />
      );
    });

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('should display an initial message if promise resolves with empty "searchTerm"', async () => {
    const emptyPromise: Promise<MoviesData> = Promise.resolve({
      Response: 'True',
      movies: [],
      totalResults: 0,
      searchTerm: '',
      currentPage: 1,
    });

    await act(async () => {
      render(
        <WithSuspense Component={MovieGrid} moviesPromise={emptyPromise} />
      );
    });

    expect(
      await screen.findByText(messages.movieGrid.initialMessage)
    ).toBeInTheDocument();
  });

  it('should render movie cards for each movie', async () => {
    const cardsNumber = 3;
    const moviesPromise: Promise<MoviesData> = Promise.resolve({
      Response: 'True',
      movies: createMockMovies(cardsNumber),
      totalResults: cardsNumber,
      searchTerm: 'test',
      currentPage: 1,
    });

    await act(async () => {
      render(
        <WithSuspense Component={MovieGrid} moviesPromise={moviesPromise} />
      );
    });

    expect(await screen.findAllByTestId('movie-card')).toHaveLength(
      cardsNumber
    );
  });
});
