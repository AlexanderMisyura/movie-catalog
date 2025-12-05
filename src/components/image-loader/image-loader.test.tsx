import { render, screen, waitFor } from '@testing-library/react';

import placeholderIcon from '@/assets/icons/placeholder.svg';
import spinnerIcon from '@/assets/icons/spinner.svg';

import { ImageLoader } from './image-loader';

const INVALID_IMAGE_SRC = 'non-existent.jpg';
const VALID_IMAGE_SRC = 'valid.jpg';

describe('ImageLoader', () => {
  const originalImage = globalThis.Image;

  beforeAll(() => {
    globalThis.Image = class {
      public onload: (() => void) | null = null;
      public onerror: (() => void) | null = null;

      public set src(source: string) {
        setTimeout(() => {
          if (source === INVALID_IMAGE_SRC) {
            this.onerror?.();
          } else {
            this.onload?.();
          }
        }, 50);
      }
    } as unknown as typeof Image;
  });

  afterAll(() => {
    globalThis.Image = originalImage;
  });

  it('should display spinner when image is loading and placeholder on image loading error', async () => {
    render(<ImageLoader src={INVALID_IMAGE_SRC} />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', spinnerIcon);
    expect(image).not.toHaveAttribute('src', placeholderIcon);

    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', placeholderIcon);
    });
  });

  it('should display spinner when image is loading and corresponding image on its successful loading', async () => {
    render(<ImageLoader src={VALID_IMAGE_SRC} />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', spinnerIcon);
    expect(image).not.toHaveAttribute('src', placeholderIcon);

    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', VALID_IMAGE_SRC);
    });
  });
});
