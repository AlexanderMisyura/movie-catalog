import type { MoviesErrorResponse, MoviesResponse } from '@ts-types';
import { API_CONFIG } from 'api.config';
import { http, HttpResponse } from 'msw';

import {
  createMockMovies,
  TEST_RESULTS_COUNT,
} from '@/mocks/utils/create-mock-movies';

export const getMoviesHandler = (
  response: MoviesResponse | MoviesErrorResponse,
  { forceError = false } = {}
) => {
  if (forceError) {
    return http.get(API_CONFIG.BASE_URL, () => {
      return HttpResponse.json(response, { status: 400 });
    });
  }

  return http.get(API_CONFIG.BASE_URL, () => {
    return HttpResponse.json(response);
  });
};

export const handlers = [
  getMoviesHandler({
    Search: createMockMovies(),
    totalResults: `${TEST_RESULTS_COUNT}`,
    Response: 'True',
  }),
];
