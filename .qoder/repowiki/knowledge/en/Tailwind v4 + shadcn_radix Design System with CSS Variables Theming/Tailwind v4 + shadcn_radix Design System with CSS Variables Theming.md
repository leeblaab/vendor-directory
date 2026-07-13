---
kind: frontend_style
name: Tailwind v4 + shadcn/radix Design System with CSS Variables Theming
category: frontend_style
scope:
    - '**'
source_files:
    - src/app/globals.css
    - postcss.config.mjs
    - components.json
    - src/components/RippleButton.css
---

The frontend styling system is built on **Tailwind CSS v4** (via `@tailwindcss/postcss`) combined with the **shadcn/ui** component library using the **radix-luma** style preset. All styles are centralized in a single global stylesheet and organized through Tailwind's new CSS-first configuration model.

### Core Stack
- **Tailwind CSS v4** — configured via `postcss.config.mjs` using `@tailwindcss/postcss`; no traditional `tailwind.config.js` file exists.
- **shadcn/ui** — installed with `style: "radix-luma"`, RSC enabled, TypeScript, CSS variables mode (`cssVariables: true`), base color `neutral`, and aliases mapping `@/components/ui` → `@/components/ui`.
- **tw-animate-css** — imported for reusable animation utilities.
- **CSS custom properties (variables)** — all theming lives in `src/app/globals.css` as HSL-based CSS variables under `:root` and `.dark` selectors.

### Theme Architecture
Theming is driven entirely by CSS variables defined in `globals.css`:
- **Color tokens**: `--background`, `--foreground`, `--primary`, `--secondary`, `--accent`, `--muted`, `--destructive`, `--border`, `--input`, `--ring`, plus chart and sidebar variants — all expressed as HSL triplets (e.g. `238 245 255`).
- **Typography tokens**: `--font-sans`, `--font-mono`, `--font-heading` mapped to Geist Sans/Mono.
- **Radius tokens**: `--radius` with derived `--radius-sm` through `--radius-4xl`.
- **Dark mode**: A parallel set of variable overrides under the `.dark` class, swapping light blues/teals for deep blue-grays and lighter accents for contrast.
- **Theme registration**: An `@theme inline { ... }` block maps CSS variables into Tailwind's design token namespace (`--color-*`, `--radius-*`, `--ease-*`) so they can be referenced via utility classes like `bg-[rgb(var(--background))]`.

### Style Organization Conventions
- **Single source of truth**: All global styles live in `src/app/globals.css`, which imports Tailwind, tw-animate-css, and shadcn's generated CSS.
- **Layered CSS**: Uses Tailwind's `@layer` directive — `@layer base` for resets/body/html defaults, `@layer components` for component-scoped styles (see `RippleButton.css`).
- **Custom variant**: `@custom-variant dark (&:is(.dark *))` enables a `dark:` variant prefix.
- **No per-component CSS-in-JS**: Components use Tailwind utility classes exclusively; shared animations and effects are isolated in small dedicated CSS files (e.g. `RippleButton.css`) wrapped in `@layer components`.
- **Utility helper**: The `cn()` function from `@/lib/utils` is used throughout animata components for conditional class merging, following shadcn conventions.

### Responsive & Animation Strategy
- **Responsive breakpoints**: Inherited from Tailwind v4 defaults (no custom config overrides found).
- **Animations**: Mix of tw-animate-css utilities and hand-written `@keyframes` inside `@theme inline` (`reveal-up`, `reveal-down`, `content-blur`) plus component-specific keyframes in `RippleButton.css`.
- **Easing tokens**: Custom `--ease-minor-spring` cubic-bezier exposed as a theme token.

### Rules for Developers
1. **Theme colors must come from CSS variables** — never hardcode hex values in components; use `bg-[rgb(var(--primary))]` or equivalent Tailwind color references registered via `@theme`.
2. **Dark mode via class strategy** — toggle the `dark` class on the root element; rely on the `.dark` variable overrides rather than media queries.
3. **New UI elements go through shadcn** — add components via `npx shadcn add <component>` to keep them consistent with the radix-luma style preset.
4. **Component-scoped styles belong in `@layer components`** — if a component needs bespoke CSS beyond Tailwind utilities, create a sibling `.css` file and wrap it in `@layer components`.
5. **Use `cn()` for dynamic classes** — merge Tailwind classes conditionally via the shared `cn` utility instead of string concatenation.