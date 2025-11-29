import { MovieErrorResponseSchema, MovieResponseSchema } from '@schemas';
import { API_CONFIG } from 'api.config';

export async function getMovies(searchParams: URLSearchParams) {
  const searchTerm = searchParams.get('s')?.trim();
  const page = searchParams.get('page')?.trim() ?? '1';

  if (!searchTerm) {
    return {
      movies: [],
      totalResults: '0',
      searchTerm: '',
    };
  }

  const requestParams = new URLSearchParams({
    s: searchTerm,
    page: page,
    apikey: API_CONFIG.API_KEY,
  });

  const url = new URL(API_CONFIG.BASE_URL);
  url.search = requestParams.toString();

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData: unknown = await response.json();
      const parsedError = MovieErrorResponseSchema.safeParse(errorData);

      if (parsedError.success) {
        throw new Error(parsedError.data.Error);
      }

      throw new Error('An error occurred while fetching movies');
    }

    const data: unknown = await response.json();
    const parsedData = MovieResponseSchema.safeParse(data);

    if (parsedData.success) {
      return {
        movies: parsedData.data.Search,
        totalResults: parsedData.data.totalResults,
        searchTerm,
      };
    }

    const parsedError = MovieErrorResponseSchema.safeParse(data);
    if (parsedError.success) {
      return parsedError.data;
    }

    throw new Error('An error occurred with data format');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('An unexpected error occurred');
  }
}
