import type { Movie } from '@ts-types';

import { API_CONFIG } from '@/api.config';

export const TEST_RESULTS_COUNT = 15;

export function createMockMovies(
  length: number = API_CONFIG.ITEMS_PER_PAGE
): Movie[] {
  return Array.from({ length }, (_, index) => ({
    Title: `test-title-${index}`,
    Year: `${index}`,
    imdbID: `test-id-${index}`,
    Type: 'movie',
    Poster: `test-url-${index}.jpg`,
  }));
}
