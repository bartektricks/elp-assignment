import { requestPolicyExchange } from '@urql/exchange-request-policy';
import { Client, cacheExchange, fetchExchange } from 'urql';
import { env } from '~/utils/env';

const createClient = () =>
  new Client({
    url: 'https://api.github.com/graphql',
    exchanges: [
      requestPolicyExchange({
        ttl: 1000 * 10, // 1 minute
        shouldUpgrade: (op) => op.context.requestPolicy !== 'cache-only',
      }),
      cacheExchange,
      fetchExchange,
    ],
    suspense: true,
    async fetch(...args) {
      const res = await fetch(...args);
      const rateLimit = {
        limit: res.headers.get('X-RateLimit-Limit'),
        remaining: res.headers.get('X-RateLimit-Remaining'),
        reset: res.headers.get('X-RateLimit-Reset'),
      };

      // TODO: add Pino for better logging
      console.log(rateLimit); // log rate limit for personal tracking
      return res;
    },
    fetchOptions() {
      return {
        headers: {
          Authorization: env.GH_AUTH_TOKEN ? `Bearer ${env.GH_AUTH_TOKEN}` : '',
        },
        credentials: 'include',
      };
    },
  });

const globalForGql = globalThis as unknown as {
  graphql: ReturnType<typeof createClient> | undefined;
};

export const graphql = globalForGql.graphql ?? createClient();

if (process.env.NODE_ENV !== 'production') globalForGql.graphql = graphql;
