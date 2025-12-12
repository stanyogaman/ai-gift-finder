# AWSEEN Platform Monorepo

AWSEEN is an AI shopping intelligence stack delivering personalised recommendations, partner analytics and automation-ready
workflows. This monorepo hosts the Next.js frontend, Express + Prisma backend, shared packages and automation playbooks.

## Structure

```
/apps
  /frontend    # Next.js 14 App Router + Tailwind + shadcn/ui
  /backend     # Express API with Prisma + PostgreSQL
  /automation  # n8n / Make.com workflow blueprints
/packages
  /ui          # Shared React components
  /utils       # Utility helpers (scoring, formatting)
  /types       # Zod schemas shared across apps
  /config      # Environment variable helpers
```

## Getting Started

1. Install dependencies (npm workspaces):

```bash
npm install
```

2. Generate Prisma client and run database migrations:

```bash
cd apps/backend
npx prisma generate
npx prisma migrate dev
```

3. Start the dev servers (frontend + backend):

```bash
npm run dev
```

- Frontend runs on [http://localhost:3000](http://localhost:3000)
- Backend runs on [http://localhost:4000](http://localhost:4000)

## Testing

- Frontend unit tests: `npm run test --workspace apps/frontend`
- Backend Jest tests: `npm run test --workspace apps/backend`

## Deployment

- **Frontend (Vercel):** configure environment variables (`NEXTAUTH_URL`, Google OAuth, backend URL). Deploy via Vercel using the
  `apps/frontend` project.
- **Backend (Railway):** provision a PostgreSQL instance, set environment variables from `.env.example`, run `npm run build` and
  `npm start`.
- **Automation:** import workflows from `apps/automation/playbooks` into n8n or Make.com and configure webhook secrets.

## Environment Variables

All required variables are listed in `.env.example`. Secrets are namespaced to avoid leaking API keys to the frontend.

## Security

- JWT-authenticated APIs with role-based middleware
- Prisma ORM to guard against SQL injection
- Webhook signature verification for partner integrations
- Helmet, CORS and rate limiting enabled by default

## AI Integrations

- Google Gemini 1.5 Pro for product data extraction
- OpenAI GPT-4/5 models for summarisation + SEO assets
- Google Programmable Search to expand catalogues

The adapters for these services should be implemented within `apps/backend/src/services` with environment-provided credentials.
