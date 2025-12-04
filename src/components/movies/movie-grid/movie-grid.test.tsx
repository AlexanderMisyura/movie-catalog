import { messages } from '@constants';
import { act, render, screen } from '@testing-library/react';
import type { MoviesData, MoviesErrorResponse } from '@ts-types';
import { Suspense } from 'react';

import { createMockMovies } from '@/mocks/utils/create-mock-movies';

import { MovieGrid } from './movie-grid';

vi.mock('@components', () => ({
  MovieCard: () => <div data-testid="movie-card" />,
}));

const TestWrapper = ({
  promise,
}: {
  promise: Promise<MoviesData | MoviesErrorResponse>;
}) => (
  <Suspense>
    <MovieGrid moviesPromise={promise} />
  </Suspense>
);

describe('MovieGrid', () => {
  it('should display error message from promise if it resolves with error response', async () => {
    const errorMessage = 'test error';

    const errorPromise: Promise<MoviesErrorResponse> = Promise.resolve({
      Response: 'False',
      Error: errorMessage,
    });

    await act(async () => {
      render(<TestWrapper promise={errorPromise} />);
    });

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('should display error message if promise resolves with unsupported data', async () => {
    const unsupportedPromise = Promise.resolve(
      'unsupported'
    ) as unknown as Promise<MoviesData | MoviesErrorResponse>;

    await act(async () => {
      render(<TestWrapper promise={unsupportedPromise} />);
    });

    expect(await screen.findByTestId('data-parse-error')).toBeInTheDocument();
  });

  it('should display an initial message if promise resolves with empty "searchTerm"', async () => {
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
      await screen.findByText(messages.movieGrid.initialMessage)
    ).toBeInTheDocument();
  });

  it('should render movie cards for each movie', async () => {
    const cardsNumber = 3;
    const moviesPromise: Promise<MoviesData> = Promise.resolve({
      movies: createMockMovies(cardsNumber),
      totalResults: cardsNumber,
      searchTerm: 'test',
      currentPage: 1,
    });

    await act(async () => {
      render(<TestWrapper promise={moviesPromise} />);
    });

    expect(await screen.findAllByTestId('movie-card')).toHaveLength(
      cardsNumber
    );
  });
});
