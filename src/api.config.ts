export const API_CONFIG = {
  BASE_URL: 'http://www.omdbapi.com',
  API_KEY: import.meta.env.VITE_API_KEY,
  ITEMS_PER_PAGE: 10,
} as const;
