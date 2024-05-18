import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './node_modules/@octokit/graphql-schema/schema.graphql',
  documents: ['app/**/*.{ts,tsx}'],
  overwrite: true,
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './__generated__/gql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getUnmaskedFragmentData' },
      },
      config: {
        avoidOptionals: true,
        flattenGeneratedTypes: true,
        skipTypename: true,
        // Based on the official comments in the graphql.ts file.
        scalars: {
          Base64String: { input: 'string', output: 'string' },
          BigInt: { input: 'number', output: 'number' },
          DateTime: { input: 'string', output: 'string' },
          GitObjectID: { input: 'string', output: 'string' },
          GitRefname: { input: 'string', output: 'string' },
          GitSSHRemote: { input: 'string', output: 'string' },
          GitTimestamp: { input: 'number', output: 'number' },
          HTML: { input: 'string', output: 'string' },
          PreciseDateTime: { input: 'string', output: 'string' },
          URI: { input: 'string', output: 'string' },
          X509Certificate: { input: 'string', output: 'string' },
        },
      },
    },
  },
};

export default config;
