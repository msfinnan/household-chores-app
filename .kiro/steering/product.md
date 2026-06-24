# Product & Conventions

## Product

household-chores-app is a small web app for managing household chores. People in a
household can track chores and who is responsible for them. There is no backend and
no authentication; the current user is picked from a simple dropdown selector.

## Tech Stack

- React 18.3 with TypeScript (~5.6)
- Vite 6 for dev server and build
- State managed with React Context + `useReducer`
- Persistence via `localStorage`, accessed through a swappable `StorageService`
  interface (`src/storage/StorageService.ts`) with a `LocalStorageService`
  implementation

## Conventions

- Write functional React components using hooks. Avoid class components.
- Keep code typed; prefer explicit types and share shared types from
  `src/types/index.ts`.
- Do all persistence through the `StorageService` abstraction. Do not call
  `localStorage` directly from components or feature code, so the storage layer
  stays swappable.
- Keep app state in the Context + reducer rather than scattering local state.

## Project Layout

- `src/App.tsx`, `src/main.tsx` — app entry and root component
- `src/storage/` — storage interface and implementations
- `src/types/index.ts` — shared TypeScript types
- `.kiro/specs/chores-app/` — feature specs

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build (`tsc -b && vite build`)
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build

## Testing

This is a hobby project. There is no test script and testing is kept minimal.
Add tests only when they earn their keep; do not introduce heavy test
infrastructure.
