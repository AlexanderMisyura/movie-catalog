import { MovieErrorResponseSchema, MovieResponseSchema } from '@schemas';
import type { MoviesData, MoviesErrorResponse } from '@ts-types';
import { API_CONFIG } from 'api.config';

import { messages } from '@/constants/messages';

export async function getMovies(
  searchParams: URLSearchParams
): Promise<MoviesData | MoviesErrorResponse> {
  const searchTerm = searchParams.get('s')?.trim();
  const rawPageParam = searchParams.get('page')?.trim();
  const page = rawPageParam && rawPageParam !== '' ? rawPageParam : '1';

  if (!searchTerm) {
    return {
      Response: 'True',
      movies: [],
      totalResults: 0,
      searchTerm: '',
      currentPage: 1,
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

      throw new Error(messages.moviesAPI.fetchError);
    }

    const data: unknown = await response.json();
    const parsedResponse = MovieResponseSchema.safeParse(data);

    if (parsedResponse.success) {
      return {
        Response: parsedResponse.data.Response,
        movies: parsedResponse.data.Search,
        totalResults: Number(parsedResponse.data.totalResults),
        searchTerm,
        currentPage: Number(page),
      };
    }

    const parsedErrorResponse = MovieErrorResponseSchema.safeParse(data);
    if (parsedErrorResponse.success) {
      return parsedErrorResponse.data;
    }

    throw new Error(messages.moviesAPI.parseError);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(messages.moviesAPI.unexpectedError);
  }
}
