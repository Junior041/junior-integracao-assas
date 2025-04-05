import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  DEFAULT_PER_PAGE: z.number().optional().default(20),
  TEMPO_EM_MINUTOS_PARA_ENVIO_DE_EMAIL: z.coerce
    .number()
    .optional()
    .default(30),
  DATABASE_URL: z.string().url(),
  TOKEN_ASSAS: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
});

export type Env = z.infer<typeof envSchema>;
