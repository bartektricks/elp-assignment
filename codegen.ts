import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './node_modules/@octokit/graphql-schema/schema.json',
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
