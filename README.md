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

## Deployment

Build the project:

```shellscript
pnpm build
```

Serve the project:

```shellscript
pnpm start
```
