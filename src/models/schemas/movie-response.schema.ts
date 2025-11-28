import { z } from 'zod';

import { MovieSchema } from './movie.schema';

export const MovieResponseSchema = z.object({
  Search: z.array(MovieSchema),
  totalResults: z.string(),
  Response: z.string(),
});
