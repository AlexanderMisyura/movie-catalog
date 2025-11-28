import { z } from 'zod';

export const MovieErrorResponseSchema = z.object({
  Response: z.string(),
  Error: z.string(),
});
