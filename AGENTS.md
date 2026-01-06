# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds application code: `components/` (UI), `services/` (API calls), `hooks/`, `utils/`, `types/`, and `styles/`.
- `public/` contains static assets served as-is.
- `docs/` and `knowledge-base/` store product specs and reference material.
- `index.html` is the Vite entry point.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run dev` starts the Vite dev server at `http://localhost:5173`.
- `npm run build` runs TypeScript checks and produces a production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint across `.ts/.tsx`.
- `npm run type-check` runs `tsc --noEmit` for type safety.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; quotes: single quotes.
- TypeScript in strict mode; avoid `any`, prefer `interface` over `type` unless unions are needed.
- React: functional components with hooks; component names in `PascalCase`.
- File naming:
  - Components: `PascalCase.tsx` (e.g., `AnalyzerPanel.tsx`).
  - Hooks: `useSomething.ts`.
  - Utilities: `camelCase.ts`.
  - Types: `camelCase.types.ts`.
- Styling uses Tailwind utility classes; use `@apply` sparingly for complex patterns.

## Testing Guidelines
- No automated test runner is configured yet.
- If adding tests, align on a framework first (e.g., Vitest + React Testing Library) and document the new `npm test` script in `package.json`.

## Commit & Pull Request Guidelines
- No git history is available; follow `CLAUDE.md` conventions:
  - Branches: `feature/...`, `fix/...`, `docs/...`.
  - Commits: `<type>: <description>` where type is `feat`, `fix`, `docs`, `style`, `refactor`, `test`, or `chore`.
- PRs (if used): describe the change, link relevant issues/specs in `docs/`, and include screenshots for UI updates.

## Security & Configuration Tips
- Configure `VITE_CLAUDE_API_KEY` in your local environment for API calls.
- Do not commit API keys or user content; keep secrets in local env files ignored by git.
