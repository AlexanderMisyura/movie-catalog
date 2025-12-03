import { getMovies } from '@/api/movies';
import { messages } from '@/constants';
import { getMoviesHandler } from '@/mocks/handlers';
import { server } from '@/mocks/node';
import {
  createMockMovies,
  TEST_RESULTS_COUNT,
} from '@/mocks/utils/create-mock-movies';
import type { MoviesResponse } from '@/models/types';

const TEST_ERROR_MESSAGE = 'Test error';
const SEARCH_TERM = 'test';
const PAGE = '1';
const searchParams = new URLSearchParams({ s: SEARCH_TERM, page: PAGE });

describe('getMovies', () => {
  it('should return empty movies object if no search term in params is provided', async () => {
    const response = await getMovies(new URLSearchParams());

    expect(response).toEqual({
      movies: [],
      totalResults: 0,
      searchTerm: '',
      currentPage: 1,
    });
  });

  it('should throw error if response is not ok', async () => {
    server.use(
      getMoviesHandler(
        { Response: 'False', Error: TEST_ERROR_MESSAGE },
        { forceError: true }
      )
    );

    const response = getMovies(searchParams);

    await expect(response).rejects.toThrow(TEST_ERROR_MESSAGE);
  });

  it('should throw error if response is not ok and data format is invalid', async () => {
    server.use(
      getMoviesHandler('invalid-response-format' as unknown as MoviesResponse, {
        forceError: true,
      })
    );

    const response = getMovies(searchParams);

    await expect(response).rejects.toThrow(messages.moviesAPI.fetchError);
  });

  it('should return movies', async () => {
    const response = await getMovies(searchParams);

    expect(response).toEqual({
      movies: createMockMovies(),
      totalResults: TEST_RESULTS_COUNT,
      searchTerm: SEARCH_TERM,
      currentPage: Number(PAGE),
    });
  });

  it('should return error response', async () => {
    const errorResponseData = { Response: 'False', Error: TEST_ERROR_MESSAGE };
    server.use(getMoviesHandler(errorResponseData));
    const response = await getMovies(searchParams);

    expect(response).toEqual(errorResponseData);
  });

  it('should throw error if data format is invalid', async () => {
    server.use(
      getMoviesHandler('invalid-response-format' as unknown as MoviesResponse)
    );

    const response = getMovies(searchParams);

    await expect(response).rejects.toThrow(messages.moviesAPI.parseError);
  });

  it('should throw error if fetch throws', async () => {
    const errorMessage = 'test error';
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error(errorMessage));

    const response = getMovies(searchParams);

    await expect(response).rejects.toThrow(errorMessage);
  });

  it('should throw error if fetch throws unexpected data', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue('unexpected');

    const response = getMovies(searchParams);

    await expect(response).rejects.toThrow(messages.moviesAPI.unexpectedError);
  });
});
