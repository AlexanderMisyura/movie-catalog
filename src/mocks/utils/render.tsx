import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createMemoryRouter,
  type RouteObject,
  RouterProvider,
} from 'react-router';
import { routes as routeObjects } from 'router';

import { UrlPath } from '@/models/enums';

interface ExtendedRenderOptions extends RenderOptions {
  routes?: RouteObject[];
  initialEntries?: string[];
}

export const renderRouter = ({
  routes = routeObjects,
  initialEntries = [UrlPath.CATALOG],
  ...restOptions
}: ExtendedRenderOptions = {}) => {
  const router = createMemoryRouter(routes, { initialEntries });

  const renderResult = render(<RouterProvider router={router} />, {
    ...restOptions,
  });

  return { ...renderResult, router, user: userEvent.setup() };
};
