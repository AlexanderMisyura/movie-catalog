import { screen } from '@testing-library/react';

import { renderRouter } from '@/mocks/utils/render';
import { UrlPath } from '@/models/enums';

import { PaginationEdges } from './pagination-edges';

describe('PaginationEdges', () => {
  it('should not render previous page link if it is the first page', () => {
    renderRouter({
      routes: [
        {
          path: UrlPath.HOME,
          element: (
            <PaginationEdges
              previousPage={0}
              nextPage={2}
              totalPages={3}
              searchTerm="test"
            />
          ),
        },
      ],
      initialEntries: [UrlPath.HOME],
    });

    const previousPageImage = screen.getByAltText('left');
    const previousPageLink = screen.queryByTestId('previous-page');

    expect(previousPageImage).toBeInTheDocument();
    expect(previousPageLink).not.toBeInTheDocument();
  });

  it('should not render next page link if it is the last page', () => {
    renderRouter({
      routes: [
        {
          path: UrlPath.HOME,
          element: (
            <PaginationEdges
              previousPage={2}
              nextPage={4}
              totalPages={3}
              searchTerm="test"
            />
          ),
        },
      ],
      initialEntries: [UrlPath.HOME],
    });

    const nextPageImage = screen.getByAltText('right');
    const previousPage = screen.queryByTestId('next-page');

    expect(nextPageImage).toBeInTheDocument();
    expect(previousPage).not.toBeInTheDocument();
  });

  it('should render links to previous and next pages', () => {
    renderRouter({
      routes: [
        {
          path: UrlPath.HOME,
          element: (
            <PaginationEdges
              previousPage={1}
              nextPage={3}
              totalPages={3}
              searchTerm="test"
            />
          ),
        },
      ],
      initialEntries: [UrlPath.HOME],
    });

    const previousPage = screen.getByTestId('previous-page');
    const nextPage = screen.getByTestId('next-page');

    expect(previousPage).toBeInTheDocument();
    expect(nextPage).toBeInTheDocument();
  });
});
