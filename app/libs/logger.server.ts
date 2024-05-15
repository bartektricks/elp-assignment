import pino from 'pino';
import pretty from 'pino-pretty';
import { env } from '~/utils/env';

const pinoPretty =
  env.NODE_ENV === 'production'
    ? undefined
    : pretty({
        colorize: true,
      });

function createLogger() {
  return pino(pinoPretty);
}

const globalForLogger = globalThis as unknown as {
  logger: ReturnType<typeof createLogger> | undefined;
};

export const logger = globalForLogger.logger ?? createLogger();

if (env.NODE_ENV !== 'production') globalForLogger.logger = logger;
