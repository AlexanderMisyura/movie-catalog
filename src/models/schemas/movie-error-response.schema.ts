import { z } from 'zod';

export const MovieErrorResponseSchema = z.object({
  Response: z.literal('False'),
  Error: z.string(),
});
