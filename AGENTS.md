# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Route files (`index.astro`, `components.astro`, `playground.astro`, `effects/*`).
- `src/components/`: Reusable UI like `ComponentShowcase.astro`.
- `src/layouts/`: App shells (e.g., `Base.astro`).
- `src/styles/`: Global styles (`app.css`, `playground.css`).
- `astro.config.mjs`: Astro config with `@tailwindcss/vite` plugin.
- `tailwind.config.mjs`: Tailwind v4 content globs and theme extensions.
- `dist/`: Build output (do not edit).

## Build, Test, and Development Commands
- `npm run dev`: Start Astro dev server (defaults to `http://localhost:4321`).
- `npm run build`: Production build to `dist/`.
- `npm run preview`: Serve the production build locally.
- `npm run clean`: Remove `dist/`.
- Requirements: Node `>=18`, npm `>=8`. After cloning, run `npm install`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; UTF-8; LF line endings.
- Filenames: components `PascalCase.astro` (e.g., `ComponentShowcase.astro`); pages lower-case or kebab-case (e.g., `components.astro`); CSS kebab-case.
- CSS: Prefer Tailwind utilities; avoid inline styles. Use library classes from `@casoon/tailwindcss-effects` (e.g., `glass`, `glass-card`, `bg-orbs-hero`).
- Imports: Keep relative paths tidy and group framework imports first.
- Formatting: No repo formatter configured—use your editor’s Prettier defaults consistently.

## Testing Guidelines
- No automated tests configured. Validate visually in dev:
  - Pages: `/`, `/components`, `/playground`, `/effects/*`.
  - Check responsive breakpoints and effect rendering (glass, orbs, animations).
- If adding tests, prefer Playwright for E2E screenshots and viewports; keep in a `tests/` folder.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise subject; include scope when useful.
  - Example: `feat(playground): add glass-card variants`;
    `fix(layout): correct nav contrast on dark backgrounds`.
- PRs: Describe motivation and changes; link issues; include before/after screenshots for visual updates; note accessibility and responsiveness checks; ensure `npm run build` passes.

## Security & Configuration Tips
- Do not commit `dist/` or `node_modules/`.
- When adding new file types, update Tailwind `content` globs in `tailwind.config.mjs`.
- Keep secrets out of the repo; `src/env.d.ts` is for typing only, not values.
