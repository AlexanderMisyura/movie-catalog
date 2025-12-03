import { createPages } from '@/utils/create-pages';

describe('createPages', () => {
  it('should return an array of pages', () => {
    const result = createPages(1, 30, 10, 2);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should return an array of pages with "..."', () => {
    const result = createPages(1, 100, 10, 2);
    expect(result).toEqual([1, 2, 3, '...', 10]);
  });

  it("should return an array with a single page even if there's 0 items provided", () => {
    const result = createPages(1, 1, 10, 2);
    expect(result).toEqual([1]);

    const result2 = createPages(1, 0, 10, 2);
    expect(result2).toEqual([1]);
  });

  it('should return an array with "..." if the difference between the first or last page and the edge pages around the current page is greater than 1', () => {
    const result = createPages(6, 110, 10, 2);
    expect(result).toEqual([1, '...', 4, 5, 6, 7, 8, '...', 11]);
  });

  it('should return an array without "..." if the difference between the first or last page and the edge pages around the current page is 1', () => {
    const result = createPages(5, 90, 10, 2);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should return an array where there is one page on each side of the current page', () => {
    const result = createPages(5, 90, 10, 1);
    expect(result).toEqual([1, '...', 4, 5, 6, '...', 9]);
  });
});
