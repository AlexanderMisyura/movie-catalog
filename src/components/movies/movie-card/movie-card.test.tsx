import { render, screen } from '@testing-library/react';

import { MovieCard } from './movie-card';

vi.mock('@components', () => ({
  ImageLoader: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('MovieCard', () => {
  it('should render a card with correct data', () => {
    const movie = {
      Poster: 'test-poster',
      Title: 'test-title',
      Year: 'test-year',
      imdbID: 'test-imdbID',
      Type: 'test-type',
    };

    render(<MovieCard {...movie} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-poster');
    expect(screen.getByAltText('test-title')).toBeInTheDocument();
    expect(screen.getByText(/test-title/)).toBeInTheDocument();
    expect(screen.getByText(/test-year/)).toBeInTheDocument();
    expect(screen.getByText(/test-imdbID/)).toBeInTheDocument();
    expect(screen.getByText(/test-type/)).toBeInTheDocument();
  });
});
