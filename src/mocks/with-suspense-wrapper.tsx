import type { MoviesPromiseProps } from '@ts-interfaces';
import { Suspense } from 'react';

interface WithSuspenseProps extends MoviesPromiseProps {
  Component: React.FC<MoviesPromiseProps>;
}

export const WithSuspense: React.FC<WithSuspenseProps> = ({
  Component,
  moviesPromise,
}) => (
  <Suspense>
    <Component moviesPromise={moviesPromise} />
  </Suspense>
);
