This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create your local environment file:

```bash
cp .env.example .env.local
```

3. Update `.env.local` with real values.

The app validates required environment variables at startup using `zod`.
If a required variable is missing or invalid, startup fails with a helpful error.

## Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `pnpm dev`: start the dev server
- `pnpm build`: build for production
- `pnpm start`: start the production server
- `pnpm lint`: run ESLint
- `pnpm format`: format files with Prettier
- `pnpm format:check`: check formatting with Prettier
