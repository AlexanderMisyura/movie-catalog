import { API_CONFIG } from 'api.config';

const PAGES_AROUND_CURRENT = 2;

export function createPages(
  currentPage: number,
  totalItems: number,
  itemsPerPage = API_CONFIG.ITEMS_PER_PAGE,
  pagesAroundCurrent = PAGES_AROUND_CURRENT
): (number | '...')[] {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const numberPages: number[] = [];

  if (totalPages <= 1) {
    return [1];
  }

  numberPages.push(1);

  for (
    let i = currentPage - pagesAroundCurrent;
    i <= currentPage + pagesAroundCurrent;
    i++
  ) {
    if (i < totalPages && i > 1) {
      numberPages.push(i);
    }
  }

  numberPages.push(totalPages);

  const resultPages: (number | '...')[] = [];

  for (let i = 0; i < numberPages.length; i++) {
    if (i === 0) {
      resultPages.push(numberPages[i]);
      continue;
    }
    const prev = numberPages[i - 1];
    const curr = numberPages[i];
    const gap = curr - prev;

    if (gap === 1) {
      resultPages.push(curr);
    } else if (gap === 2) {
      resultPages.push(prev + 1);
      resultPages.push(curr);
    } else {
      resultPages.push('...');
      resultPages.push(curr);
    }
  }

  return resultPages;
}
