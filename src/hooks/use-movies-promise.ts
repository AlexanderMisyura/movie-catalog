import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { getMovies } from '@/api/movies';

export function useMoviesPromise() {
  const [searchParams] = useSearchParams();
  const [stateParams, setStateParams] = useState<URLSearchParams>(searchParams);

  useEffect(() => {
    setStateParams(searchParams);
  }, [searchParams]);

  return getMovies(stateParams);
}
