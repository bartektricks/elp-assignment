import { requestPolicyExchange } from '@urql/exchange-request-policy';
import { Client, cacheExchange, fetchExchange } from 'urql';
import { GITHUB_API_URL } from '~/utils/constants';
import { env } from '~/utils/env';
import getAuthorizationHeader from '~/utils/getAuthorizationHeader.server';
import { logger } from './logger.server';

export const getTimeToLive = () => {
  if (env.NODE_ENV === 'production') return 1000 * 60 * 2; // 2 minutes

  return 1000 * 60; // 1 minute
};

const createClient = () =>
  new Client({
    url: GITHUB_API_URL,
    exchanges: [
      requestPolicyExchange({
        ttl: getTimeToLive(),
        shouldUpgrade: (op) => op.context.requestPolicy !== 'cache-only',
      }),
      cacheExchange,
      fetchExchange,
    ],
    async fetch(...args) {
      const res = await fetch(...args);
      const rateLimit = {
        limit: res.headers.get('X-RateLimit-Limit'),
        remaining: res.headers.get('X-RateLimit-Remaining'),
        reset: res.headers.get('X-RateLimit-Reset'),
      };

      // log rate limit for personal tracking
      logger.info(rateLimit, 'GitHub API rate limit headers');
      return res;
    },
    fetchOptions() {
      return {
        headers: getAuthorizationHeader(),
        credentials: 'include',
      };
    },
  });

const globalForGql = globalThis as unknown as {
  gqlClient: ReturnType<typeof createClient> | undefined;
};

export const gqlClient = globalForGql.gqlClient ?? createClient();

if (env.NODE_ENV !== 'production') globalForGql.gqlClient = gqlClient;
