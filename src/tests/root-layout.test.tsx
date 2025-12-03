import { ErrorBoundary } from '@components';
import { screen, waitFor } from '@testing-library/react';
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
