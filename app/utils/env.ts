import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    GH_AUTH_TOKEN: z.string().optional(),
  },
  shared: {
    NODE_ENV: z
      .enum(['test', 'development', 'production'])
      .optional()
      .default(process.env.NODE_ENV),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
