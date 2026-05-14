# Taylor Rater

Nuxt 3 + Tailwind CSS app for rating Taylor Swift albums with friends. The app now supports independent album flows for `Midnights` and `THE TORTURED POETS DEPARTMENT`, with separate drafts, submissions, leaderboards, and review walls per album.

## Local Development

```bash
npm install
npm run dev
npm run typecheck
```

Use Node 22 for local development, matching the GitHub Pages workflow.

## Environment

Create `.env` from `.env.example`.

```env
NUXT_PUBLIC_SUPABASE_URL=https://sfgdeegnusxurebrorhg.supabase.co
NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=replace-with-your-publishable-or-anon-public-key
NUXT_APP_BASE_URL=/taylor-rater/
```

Only use a Supabase publishable key or the legacy anon public key in this app. Never place `sb_secret`, `service_role`, or any secret key in frontend code or GitHub Actions public build output.

## GitHub Pages

This repository is configured for:

```text
https://RyanLee-ljx.github.io/taylor-rater/
```

In GitHub, set:

```text
Settings > Pages > Build and deployment > Source: GitHub Actions
```

Then add repository secrets:

```text
NUXT_PUBLIC_SUPABASE_URL
NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

## Supabase Setup

Run the SQL files in this order from the Supabase SQL editor:

```text
supabase/migrations/0001_init.sql
supabase/migrations/0002_rls_policies.sql
supabase/seed.sql
```

Then enable anonymous sign-ins:

```text
Authentication > Sign In / Providers > Anonymous sign-ins
```

The app uses Supabase when the public URL/key are available and the tables are seeded. If Supabase is missing or not ready, it falls back to browser-local ratings so the UI still works.
