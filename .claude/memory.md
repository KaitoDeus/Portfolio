# Claude AI Project Memory - kaitodeus Portfolio

Persistent project memory, architectural decisions, resolved issues, and development context for AI assistants.

---

## 1. Project Context & Evolution History

- **Origin**: Initially developed as a Single Page Application (SPA) utilizing **Vite + React 19 + TypeScript + Tailwind CSS v4 + react-router-dom**.
- **Next.js Migration**: Completely refactored into **Next.js 15 (App Router)**.
- **Core Motivation**:
  1. Secure Gemini AI API keys on the server instead of exposing them in client-side bundles.
  2. Implement native Next.js Server-Side SEO via Metadata API & Google Font optimization (`next/font/google`).
  3. Retain Clean Architecture, rapid static pre-rendering, and fluid micro-animations.

---

## 2. Key Architectural Decisions & Rationale

| Decision | Rationale & Trade-offs |
| :--- | :--- |
| **`src/sections` instead of `src/pages`** | Next.js automatically treats `src/pages` as Pages Router files, causing build-time type collisions with App Router (`src/app`). Grouping views under `src/sections` cleanly separates page sections from routing infrastructure. |
| **Server Route Handler (`/api/chat`)** | Ensures `GEMINI_API_KEY` remains strictly confidential on the backend, preventing unauthorized client-side quota theft. |
| **`useSyncExternalStore` for Theme State** | React 19 introduces strict ESLint checks (`react-hooks/set-state-in-effect`) against calling `setState` inside mounting effects. `useSyncExternalStore` provides a rock-solid, hydration-safe bridge between DOM `.dark` class, `localStorage`, and React components with 0 cascading renders. |
| **`suppressHydrationWarning` on `<body>`** | Third-party browser extensions (e.g., Grammarly injecting `data-new-gr-c-s-check-loaded`, Dark Reader) mutate `<body>` attributes before hydration completes. Adding this flag suppresses spurious mismatch warnings. |
| **Type-Safe `getImageSrc` Utility** | Next.js static asset imports return `StaticImageData` (`{ src, width, height }`), whereas remote or public assets are string URLs. The `getImageSrc` utility seamlessly resolves both formats. |

---

## 3. Resolved Issues & Gotchas

1. **Next.js `PagesPageConfig` Build Collision**:
   - *Problem*: Coexistence of `src/pages` alongside `src/app` caused Next.js to treat components as Pages Router endpoints.
   - *Solution*: Renamed `src/pages/` to `src/sections/` and adjusted all import specifiers.

2. **ESLint `react-hooks/set-state-in-effect` Error**:
   - *Problem*: Synchronous `setMounted(true)` and `setTheme(...)` calls inside `useEffect`.
   - *Solution*: Migrated to React's native `useSyncExternalStore` hook.

3. **Hydration Attribute Mismatch from Browser Extensions**:
   - *Problem*: Grammarly injecting `data-new-gr-c-s-check-loaded="14.1320.0"` into `<body>`.
   - *Solution*: Added `suppressHydrationWarning` to the root `<body>` in `src/app/layout.tsx`.

4. **Tailwind CSS v4 Configuration in Next.js 15**:
   - *Setup*: Configured `@tailwindcss/postcss` in `postcss.config.mjs` and `@import "tailwindcss";` in `src/app/globals.css`.

---

## 4. Coding Standards & Conventions

- **Language of Communication**: English for project documentation, configs, and technical specs.
- **TypeScript**: Strict mode enabled, explicit type definitions, zero `any` usage (`ImageSource = string | StaticImageData`).
- **Styling**: Utilize semantic Tailwind CSS color tokens (`bg-background`, `text-foreground`, `bg-card`, `border-border`) declared in `globals.css`.
- **Git Commits**: Follow Conventional Commits convention (`feat:`, `fix:`, `refactor:`, `docs:`, `build:`).
- **Clean Architecture Hierarchy**:
  - `src/core/`: Business domain models, static data, singleton services.
  - `src/shared/`: Shared custom hooks, utilities (`utils.ts`).
  - `src/components/`: Reusable UI building blocks, layout containers, canvas background.
  - `src/sections/`: Primary portfolio sections.
  - `src/app/`: Next.js App Router (Layouts, Pages, Global Styles, API Route Handlers).
