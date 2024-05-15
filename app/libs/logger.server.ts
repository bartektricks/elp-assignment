import pino from 'pino';
import pretty from 'pino-pretty';
import { env } from '~/utils/env';

function createLogger() {
  return pino(
    pretty({
      colorize: true,
    }),
  );
}

const globalForLogger = globalThis as unknown as {
  logger: ReturnType<typeof createLogger> | undefined;
};

export const logger = globalForLogger.logger ?? createLogger();

if (env.NODE_ENV !== 'production') globalForLogger.logger = logger;
