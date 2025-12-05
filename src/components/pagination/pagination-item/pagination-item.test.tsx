import { render, screen } from '@testing-library/react';

import { renderRouter } from '@/mocks/utils/render';
import { UrlPath } from '@/models/enums';

import { PaginationItem } from './pagination-item';

describe('PaginationItem', () => {
  it('should not render link if page is "..."', () => {
    render(<PaginationItem page="..." searchTerm="test" />);

    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should render link if page is a number', () => {
    renderRouter({
      routes: [
        {
          path: UrlPath.HOME,
          element: <PaginationItem page={1} searchTerm="test" />,
        },
      ],
      initialEntries: [UrlPath.HOME],
    });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
