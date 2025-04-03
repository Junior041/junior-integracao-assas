import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  DATABASE_URL: z.string().url(),
  DEFAULT_PER_PAGE: z.number().optional().default(20),
});

export type Env = z.infer<typeof envSchema>;
