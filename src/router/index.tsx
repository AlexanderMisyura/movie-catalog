import { Catalog, NotFound } from '@pages';
import { UrlPath } from '@ts-enums';
import { createBrowserRouter, redirect, type RouteObject } from 'react-router';

import { RootLayout } from '@/root-layout';

export const routes: RouteObject[] = [
  {
    Component: RootLayout,
    path: UrlPath.HOME,
    children: [
      {
        children: [
          {
            index: true,
            loader: () => redirect(UrlPath.CATALOG),
            Component: () => null,
          },
          {
            path: UrlPath.CATALOG,
            Component: Catalog,
          },
          {
            path: '/*',
            Component: NotFound,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
