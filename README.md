# Taylor Rater

Nuxt 3 + Tailwind CSS app for rating Taylor Swift albums with friends. The first album flow is `Midnights`, including the 13 standard tracks plus `Hits Different`.

## Local Development

```bash
npm install
npm run dev
```

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

The current UI works with local mock data first. Supabase migrations and seed data live in `supabase/`.
