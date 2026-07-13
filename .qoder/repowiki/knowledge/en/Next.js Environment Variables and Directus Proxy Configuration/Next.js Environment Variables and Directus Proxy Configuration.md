---
kind: configuration_system
name: Next.js Environment Variables and Directus Proxy Configuration
category: configuration_system
scope:
    - '**'
source_files:
    - .env.local
    - next.config.js
    - src/lib/directus.ts
    - src/app/api/directus/[...path]/route.ts
---

This Next.js application uses a minimal, file-based configuration system built entirely on Next.js native environment variables with no dedicated config loader or schema validation.

## What system/approach is used
- **Next.js process.env** — all runtime configuration comes from environment variables loaded automatically by Next.js from .env.local (and other env files). There is no custom config parser, YAML/TOML loader, or centralized config module.
- **No schema validation** — environment variables are consumed directly as strings without type-checking or default-value coercion beyond simple fallback expressions.
- **Directus SDK client** — the backend connection is configured via the @directus/sdk client initialized at module load time in src/lib/directus.ts.

## Key files and packages
- .env.local — single source of truth for all environment variables (Directus URL, API token, site URL, GA ID)
- next.config.js — build/runtime config (Strict Mode, image remotePatterns, unoptimized images)
- src/lib/directus.ts — initializes the Directus SDK client; throws if NEXT_PUBLIC_DIRECTUS_URL is missing
- src/app/api/directus/[...path]/route.ts — catch-all API route that proxies requests to Directus using NEXT_PUBLIC_DIRECTUS_URL
- src/app/layout.tsx, src/app/page.tsx, src/app/robots.ts, src/app/sitemap.ts — read NEXT_PUBLIC_SITE_URL for metadata/base URLs
- src/components/AnalyticsTracker.tsx, src/lib/analytics.ts — read NEXT_PUBLIC_GA_ID for Google Analytics

## Architecture and conventions
1. **Public vs secret split via naming convention**: NEXT_PUBLIC_* variables are exposed to the browser bundle (e.g., NEXT_PUBLIC_DIRECTUS_URL, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_GA_ID). Secrets like DIRECTUS_API_TOKEN are server-only and never prefixed with NEXT_PUBLIC_.
2. **Fallback defaults everywhere**: Every place that reads an env var provides a local fallback so the app runs locally without production values set.
3. **Single proxy endpoint for secrets**: Client-side code never calls Directus directly. All authenticated requests go through /api/directus/[...path], which injects the server-only DIRECTUS_API_TOKEN header. This keeps tokens out of the browser bundle.
4. **Module-level initialization with early exit**: src/lib/directus.ts reads NEXT_PUBLIC_DIRECTUS_URL at import time and throws immediately if it is missing, failing fast at startup rather than later at request time.
5. **Hardcoded build-time overrides in next.config.js**: The Directus host/IP/port for image optimization is hardcoded in images.remotePatterns rather than sourced from env, creating a potential drift between runtime and build-time configuration.

## Rules developers should follow
- Never hardcode secrets — use DIRECTUS_API_TOKEN (server-only) and never prefix secrets with NEXT_PUBLIC_.
- Always provide a local fallback when reading env vars so the dev server works without production values.
- Route all authenticated Directus calls through /api/directus — do not call NEXT_PUBLIC_DIRECTUS_URL directly from client components.
- Keep next.config.js in sync with env — if you change NEXT_PUBLIC_DIRECTUS_URL, also update the hostname/port in images.remotePatterns since they are currently hardcoded.
- Add new env vars to .env.local (and document them in README.md where the existing ones are listed) — there is no central types/schema file to update.
- Be aware of the missing validation — unlike projects using dotenv-safe, zod, or similar validators, there is no guardrail preventing typos in variable names; rely on the throw in src/lib/directus.ts and local fallbacks to catch issues.