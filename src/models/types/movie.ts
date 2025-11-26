import type { z } from 'zod';

import type { MovieSchema } from '../schemas/movie.schema';

export type Movie = z.infer<typeof MovieSchema>;
