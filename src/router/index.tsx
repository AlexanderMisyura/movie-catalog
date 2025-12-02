import { ErrorBoundary } from '@components';
import { Catalog } from '@pages';
import { UrlPath } from '@ts-enums';
import { createBrowserRouter, redirect, type RouteObject } from 'react-router';

import { RootLayout } from '@/root-layout';

export const routes: RouteObject[] = [
  {
    Component: RootLayout,
    path: UrlPath.HOME,
    ErrorBoundary,

    children: [
      {
        index: true,
        loader: () => redirect(UrlPath.CATALOG),
      },
      {
        path: UrlPath.CATALOG,
        Component: Catalog,
        ErrorBoundary,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
