# Client — SaaS Boilerplate Pro

Frontend single-page application: **React 19 + Vite + TypeScript (strict)**, with
Tailwind v4, React Router, and TanStack Query.

> Status: **M0 — Foundation complete.** Routing, app shell, design tokens, dark mode,
> the data layer, and lint/format tooling are all in place.

## Stack

- **React 19** + **Vite** (strict TypeScript, project references)
- **Tailwind v4** + Shadcn-compatible design tokens (`cn()` helper, `components.json`)
- **React Router** (data router, lazy routes, error boundary)
- **TanStack Query** + a typed `fetch` client (`@/lib/api/http-client`)

## Scripts

| Script                 | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server (http://localhost:5173)     |
| `npm run build`        | Type-check (`tsc -b`) then produce a production build |
| `npm run preview`      | Preview the production build locally                  |
| `npm run typecheck`    | Type-check without emitting                           |
| `npm run lint`         | Lint with ESLint (type-aware)                         |
| `npm run format`       | Format with Prettier                                  |

## Notes

- **Path alias:** import from `@/` → `src/` (configured in both `tsconfig` and Vite).
- **API proxy:** in development, requests to `/api` and `/health` are proxied to the
  backend at `http://localhost:4000`, so the browser uses a single origin (no CORS,
  no hardcoded API host). Set `VITE_API_URL` for cross-origin deployments.
- **Structure:** feature-first (`src/features/*`), with shared `components/`, `lib/`,
  `pages/`, and `app/` (router + providers).
