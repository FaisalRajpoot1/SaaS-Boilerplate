# Client — SaaS Boilerplate Pro

Frontend single-page application: **React 19 + Vite + TypeScript (strict)**.

> Status: **M0 — Foundation.** Runnable base scaffold in place. Tailwind, routing,
> and the data layer are added in subsequent Phase 0.2 tasks.

## Scripts

| Script              | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server (http://localhost:5173)    |
| `npm run build`     | Type-check (`tsc -b`) then produce a production build |
| `npm run preview`   | Preview the production build locally                 |
| `npm run typecheck` | Type-check without emitting                          |

## Notes

- **Path alias:** import from `@/` → `src/` (configured in both `tsconfig` and Vite).
- **API proxy:** in development, requests to `/api` are proxied to the backend at
  `http://localhost:4000`, so the browser uses a single origin (no CORS, no hardcoded API host).
