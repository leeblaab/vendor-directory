---
kind: error_handling
name: Ad-hoc try/catch with mixed error propagation patterns
category: error_handling
scope:
    - '**'
source_files:
    - src/lib/directus.ts
    - src/app/actions.ts
    - src/app/api/directus/[...path]/route.ts
    - src/components/ReviewForm.tsx
    - src/app/HomeClient.tsx
---

This Next.js vendor directory app does not implement a centralized error-handling system. Instead, it uses scattered, ad-hoc patterns across server actions, API routes, and client components:

**Server-side (lib/directus.ts)**
- Most data-fetching functions wrap calls in `try/catch`, log via `console.error`, then either return a safe default (`[]`, `null`) or rethrow a generic `new Error('Failed to fetch ...')`. There is no custom error class or error-code taxonomy — callers must guess the meaning of the thrown string.
- Auth-related mutations (`registerUser`, `submitVendor`, `submitReviewClient`, `voteReviewClient`) follow a different convention: they never throw; instead they return `{ success: boolean; message: string }` objects, with user-facing messages extracted from Directus's `errors[0].message` / `extensions.code` payloads.
- Configuration errors are handled at module load time by throwing immediately if `NEXT_PUBLIC_DIRECTUS_URL` is missing.

**Server Actions (app/actions.ts)**
- `fetchCategoriesAction` catches network errors and returns an empty array (graceful degradation).
- `fetchVendorsAction` logs and rethrows the caught error so the caller can decide how to surface it.

**API Proxy Route (app/api/directus/[...path]/route.ts)**
- A single `proxyRequest` helper wraps every HTTP method handler. On failure it returns a uniform `NextResponse.json({ errors: [{ message, extensions: { code: 'PROXY_ERROR' } }] })` with status 502, giving clients a consistent shape for proxy failures.

**Client Components**
- Errors are surfaced through local React state (`useState<boolean>` flags like `categoriesError`, `vendorsError`, or string `error`). Components render inline fallback UI (e.g., "Please log in to submit a review", red-bordered error banners) rather than bubbling up to a global error boundary.
- No `ErrorBoundary` component, no `unhandledrejection`/`componentDidCatch` usage was found.

**Notable absences**
- No custom error types or sentinel errors (no `class AppError extends Error` or `ERR_*` constants).
- No middleware-level error interceptor (no `next.config.js` middleware, no `src/middleware.ts`).
- No structured logging library — all diagnostics go to `console.error`.
- No panic/recover pattern (not applicable in JS, but there is no equivalent top-level unhandled-rejection handler).

**Developer conventions observed**
1. For read-only data access: catch → log → return safe default (`[]`/`null`).
2. For write operations that must inform the user: catch → log → return `{ success: false, message }`.
3. For server actions where the page should fail fast: catch → log → rethrow.
4. For the Directus proxy: always respond with a JSON `{ errors: [...] }` envelope on failure.