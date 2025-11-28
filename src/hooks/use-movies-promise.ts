import { useSearchParams } from 'react-router';

import { getMovies } from '@/api/movies';

export function useMoviesPromise() {
  const [params] = useSearchParams();

  return getMovies(params);
}
