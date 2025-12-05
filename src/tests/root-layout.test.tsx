import { ErrorBoundary } from '@components';
import { act, screen, waitFor } from '@testing-library/react';
import { UrlPath } from '@ts-enums';
import { RootLayout } from 'root-layout';

import { renderRouter } from '@/mocks/utils/render';

describe('RootLayout', () => {
  it('should redirect from root to catalog path', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);

    renderRouter({ initialEntries: [UrlPath.HOME] });

    await waitFor(() => {
      expect(window.location.pathname).toBe(UrlPath.CATALOG);
    });
  });

  it('should initially display header and spinner on /catalog route', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    renderRouter();

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText('spinner')).toBeInTheDocument();
  });

  it('should render header and catalog page on /catalog route after suspense resolves', async () => {
    await act(async () => {
      renderRouter();
    });

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(await screen.findByTestId('catalog-data')).toBeInTheDocument();
    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
  });

  it('should render error page when a route is not found', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);

    renderRouter({
      initialEntries: ['/non-existent'],
    });

    expect(screen.getByTestId('error-display')).toBeInTheDocument();
  });

  it('should render error page when an error occurs and display error message', () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);

    const errorMessage = 'Test error';
    const ErrorTrigger = () => {
      throw new Error(errorMessage);
    };

    renderRouter({
      routes: [
        {
          Component: RootLayout,
          ErrorBoundary,
          children: [{ index: true, Component: ErrorTrigger }],
        },
      ],
      initialEntries: ['/'],
    });

    expect(screen.getByTestId('error-display')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
