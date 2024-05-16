// @vitest-environment node

import { Client } from 'urql';

describe('gqlClient', (test) => {
  test('is an instance of urql', async () => {
    const { gqlClient } = await import('./gqlClient.server');

    expect(gqlClient).toBeDefined();
    expect(gqlClient).toHaveProperty('query');
    expect(gqlClient instanceof Client).toBeTruthy();
  });

  test.sequential.each(['test', 'production', 'development'] as const)(
    'ttl should be different on %s env',
    async (env) => {
      vi.resetModules();
      vi.stubEnv('NODE_ENV', env);

      const { getTimeToLive } = await import('./gqlClient.server');

      const ttl = getTimeToLive();

      if (env === 'production') {
        expect(ttl).toBe(1000 * 60 * 2);
      } else {
        expect(ttl).toBe(1000 * 60);
      }

      vi.unstubAllEnvs();
    },
  );
});
