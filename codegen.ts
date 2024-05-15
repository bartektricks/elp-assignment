import type { CodegenConfig } from '@graphql-codegen/cli';
import { GITHUB_API_URL } from '~/utils/constants';
import getAuthorizationHeader from '~/utils/getAuthorizationHeader.server';

const config: CodegenConfig = {
  schema: {
    [GITHUB_API_URL]: {
      headers: {
        'User-Agent': 'GraphQL Code Generator',
        ...getAuthorizationHeader(),
      },
    },
  },
  documents: ['app/**/*.{ts,tsx}'],
  overwrite: true,
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './__generated__/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
