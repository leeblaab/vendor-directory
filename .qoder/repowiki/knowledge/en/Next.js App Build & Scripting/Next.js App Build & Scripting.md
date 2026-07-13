---
kind: build_system
name: Next.js App Build & Scripting
category: build_system
scope:
    - '**'
source_files:
    - package.json
    - next.config.js
    - tsconfig.json
    - postcss.config.mjs
---

This repository uses the standard Next.js 16 build system with no custom Makefiles, Dockerfiles, or CI pipelines in the repo. The entire build and artifact management flow is driven by npm scripts and Next.js's built-in toolchain.

**Build pipeline**
- `npm run dev` — starts the Next.js development server via `next dev`, using Node's legacy OpenSSL provider flag (`--openssl-legacy-provider`) to work around compatibility issues.
- `npm run build` — runs `next build` to produce a production-ready static/bundle output into `.next/`.
- `npm run start` — serves the production build via `next start`.
- `npm run lint` — invokes `next lint` (ESLint v9 via `eslint-config-next`).

**TypeScript compilation**
- `tsconfig.json` targets ES2017, enables strict mode, sets `moduleResolution: "bundler"`, and configures the `@/*` path alias pointing at `src/`. The Next.js TS plugin is included so type generation stays in sync with the framework.

**Styling pipeline**
- Tailwind CSS v4 is used through `@tailwindcss/postcss` configured in `postcss.config.mjs`; there is no separate `tailwind.config.js` (Tailwind v4 uses CSS-first configuration).

**Runtime / image optimization**
- `next.config.js` enables React Strict Mode and configures the Directus asset host (`http://206.189.50.71:8055/assets/**`) as an allowed remote pattern for `<Image>`. Image optimization is disabled (`unoptimized: true`) because the external host does not support Next.js image processing.

**Dependency management**
- Lockfile-based via `package-lock.json`; no yarn/pnpm lockfile present. Dependencies are pinned to specific versions in `package.json` (e.g., `react` 19.2.4, `next` ^16.2.6).

**What is NOT present**
- No `Dockerfile`, `docker-compose.yml`, or containerization scripts in the repository (the README references one but it is not committed here).
- No GitHub Actions, CircleCI, Jenkins, or any other CI/CD YAML files under `.github/workflows` or similar.
- No `Makefile`, shell build scripts, or release automation.
- No monorepo tooling (no Turborepo, Nx, etc.).

**Developer conventions**
- All source lives under `src/` and is referenced via the `@/` import alias.
- Linting is enforced through the Next.js ESLint preset; no additional ruleset overrides are visible.
- Environment variables (e.g., `.env.local`) are gitignored per the project's security note.