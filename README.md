# ELP assignment

### Nice to have

If you want to have a higher rate limit for the GitHub API, you can create a personal access token. Follow the guide [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) (read access should be enough in this case).

After that fill in the `.env` file with the following content:

```shellscript
GH_AUTH_TOKEN=your_token_here
```

## Development

Install dependencies:

```shellscript
pnpm install
```

Run the dev server:

```shellscript
pnpm dev
```

Run the codegen in watch mode:

```shellscript
pnpm codegen --watch
```

NOTE: in this version of the project the codegen should take the schema from node_modules so it's not abusing the GitHub API rate limit.

## Deployment

Build the project:

```shellscript
pnpm build
```

Serve the project:

```shellscript
pnpm start
```

## Notes

### Stack

#### Development

- [Remix](https://remix.run/) - never tried it before and I thought it would be a good opportunity to learn something new
- [URQL](https://github.com/urql-graphql/urql) - my first time with graphql outside of Gatsby's internal implementation. Tried Apollo but I had some caching and import paths issues
- [Codegen](https://graphql-code-generator.com/) - to generate types for the queries and mutations
- [Radash](https://github.com/sodiray/radash) - modern replacement for Lodash
- [Pino](https://github.com/pinojs/pino) - lightweight logger for the server with pretty print
- [Framer Motion](https://www.framer.com/motion/) - for animations

#### Code quality

- [Biome](https://biome.sh/) - I have migrated from ESLint to Biome because we use it company wide and it's really fast
- [Lefthook](https://github.com/evilmartians/lefthook) - git hooks manager, really good replacement for husky, has simple API
- [Commitlint](https://commitlint.js.org/) - to enforce conventional commits (corporate habits :D)

#### Testing

- [Vitest](https://vitest.dev/) - unit tests
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/) - for testing React components
- [MSW](https://mswjs.io/) - for mocking the API requests

## Folder structure

```markdown
.
├── __generated__/ - generated graphql helpers and types
├── __tests__/ - unit tests
├── app/
│   ├── assets/ - svgs and icons
│   ├── components/ - globally shared components
│   ├── libs/
│   │   ├── api - api call functions
│   │   ├── fragments.ts - graphql fragments (more like typeguard helpers)
│   │   ├── gqlClient.server.ts - graphql client
│   │   └── logger.server.ts - server logger
│   ├── routes/
│   │   └── (page)/
│   │       ├── components/ - page specific components
│   │       ├── loader.server.ts - server side loader
│   │       ├── loaderHooks.ts - hooks for the loader
│   │       └── route.tsx - page component
│   └── utils/ - utility functions
├── plugins/ - TailwindCSS plugins
└── public/ - public assets
```