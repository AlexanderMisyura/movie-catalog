import { useMoviesPromise } from '@hooks';
import { screen, waitFor } from '@testing-library/react';
import { UrlPath } from '@ts-enums';
import type { MoviesData, MoviesErrorResponse } from '@ts-types';
import { Link } from 'react-router';

import { renderRouter } from '@/mocks/utils/render';

const searchOne = '?s=initial';
const searchTwo = '?s=second';

const TestComponent = ({
  onPromiseChange,
}: {
  onPromiseChange: (p: Promise<MoviesData | MoviesErrorResponse>) => void;
}) => {
  const promise = useMoviesPromise();

  onPromiseChange(promise);

  return (
    <div>
      <Link to={searchTwo}>Test link</Link>
    </div>
  );
};

describe('useMoviesPromise', () => {
  it('should return a new promise when search params change', async () => {
    const promiseSpy = vi.fn();

    const { user, router } = renderRouter({
      routes: [
        {
          path: UrlPath.HOME,
          element: <TestComponent onPromiseChange={promiseSpy} />,
        },
      ],
      initialEntries: [`${UrlPath.HOME}${searchOne}`],
    });

    const firstPromise = promiseSpy.mock.calls[0][0] as Promise<MoviesData>;
    expect(firstPromise).toBeInstanceOf(Promise);

    await user.click(screen.getByRole('link'));

    await waitFor(() => {
      expect(router.state.location.search).toBe(searchTwo);
    });

    const secondPromise = promiseSpy.mock.calls[
      promiseSpy.mock.calls.length - 1
    ][0] as Promise<MoviesData>;
    expect(secondPromise).not.toBe(firstPromise);
  });
});
