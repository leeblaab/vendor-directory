---
kind: dependency_management
name: npm + lockfile-based dependency management
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - package-lock.json
    - components.json
---

This Next.js project uses the standard npm ecosystem for dependency management with no custom vendoring, private registries, or Go tooling.

**System and tools**
- Package manager: npm (lockfileVersion 3 in `package-lock.json`).
- Runtime framework: Next.js 16 (`next`, `eslint-config-next` pinned to matching versions).
- No `.npmrc`, `yarn.lock`, `pnpm-lock.yaml`, `go.mod`, `vendor/`, or other alternative managers are present — npm is the sole declared resolver against the public registry (`https://registry.npmjs.org`).

**Key files**
- `package.json` — single-source-of-truth manifest declaring runtime `dependencies` and `devDependencies`.
- `package-lock.json` — deterministic lockfile that pins every transitive package version and integrity hash; committed to the repo.
- `node_modules/` — installed tree (not committed via gitignore); regenerated from the lockfile.
- `components.json` — shadcn CLI config used by the `shadcn` devDependency to scaffold UI components into `src/components`; these generated files are treated as source code rather than third-party deps.

**Architecture and conventions**
- All third-party packages are declared explicitly in `package.json` under `dependencies` or `devDependencies`. There are no inline `require()` of local vendored copies.
- Version ranges use caret (`^`) for most packages, allowing minor/patch updates within the major version. A few core packages (`react`, `react-dom`, `@types/react`, `eslint-config-next`) are pinned to exact versions to keep the React/Next.js stack aligned.
- The `shadcn` CLI (`shadcn add ...`) is used to pull component sources directly from their upstream npm packages into `src/components/*` at development time; those copied files are then versioned like application code.
- The `dev` script runs Node with `--openssl-legacy-provider` to work around OpenSSL 3 compatibility with older dependencies bundled by Next.js.

**Rules developers should follow**
- Add new packages exclusively through `npm install <pkg>` so both `package.json` and `package-lock.json` stay in sync; never hand-edit either file manually.
- Keep `package-lock.json` committed — it is the canonical source of truth for reproducible installs across CI and production.
- Do not commit `node_modules/`; rely on the lockfile to regenerate it.
- Prefer pinning peer-depended packages (React, Next.js, TypeScript types) to exact versions to avoid drift between them.
- When using `shadcn` to add a component, review the generated source in `src/components` before committing, since it becomes part of the app's own codebase.