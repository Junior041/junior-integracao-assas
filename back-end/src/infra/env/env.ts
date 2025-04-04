import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  DEFAULT_PER_PAGE: z.number().optional().default(20),
  DATABASE_URL: z.string().url(),
  TOKEN_ASSAS: z.string(),
});

export type Env = z.infer<typeof envSchema>;
