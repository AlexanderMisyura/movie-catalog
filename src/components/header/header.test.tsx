import { TEMP_USER } from '@constants';
import { screen, waitFor } from '@testing-library/react';

import { renderRouter } from '@/mocks/utils/render';
import { UrlPath } from '@/models/enums';

import { Header } from './header';

beforeAll(() => {
  vi.mock('@/utils/debounce', () => ({
    changeEventDebounceWrapper: vi
      .fn()
      .mockImplementation((callback: () => void) => callback),
  }));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('Header', () => {
  it('search should update url search params', async () => {
    const testSearchTerm = 'test';
    const { user, router } = renderRouter({
      routes: [
        {
          path: UrlPath.HOME,
          element: <Header user={TEMP_USER} />,
        },
      ],
      initialEntries: [UrlPath.HOME],
    });

    const input = screen.getByRole('searchbox');

    expect(input).toBeInTheDocument();
    expect(router.state.location.search).toBe('');

    await user.type(input, testSearchTerm);

    await waitFor(() => {
      expect(router.state.location.search).toBe(`?s=${testSearchTerm}`);
    });
  });
});
