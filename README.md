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

Run the codegen if you have made changes to the GraphQL schema:

```shellscript
pnpm codegen
```

Note: this could be done automatically with a git hook or a postinstall, but I didn't want to overcomplicate the setup and exceed the rate limit.

You can also use the watch mode for the codegen:

```shellscript
pnpm codegen --watch
```

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

#### Code quality

- [Biome](https://biome.sh/) - I have migrated from ESLint to Biome because we use it company wide and it's really fast
- [Lefthook](https://github.com/evilmartians/lefthook) - git hooks manager, really good replacement for husky, has simple API
- [Commitlint](https://commitlint.js.org/) - to enforce conventional commits (corporate habits :D)
