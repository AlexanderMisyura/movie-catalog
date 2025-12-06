import { z } from 'zod';

import { MovieSchema } from './movie.schema';

export const MovieResponseSchema = z.object({
  Response: z.literal('True'),
  Search: z.array(MovieSchema),
  totalResults: z.string(),
});
