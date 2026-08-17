# Claude AI Guidelines - Portfolio Vo Anh Khai

This file provides key context, architectural guidelines, commands, and code conventions for Claude Code and AI assistants working on this codebase.

---

## 1. Project Overview & Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components + Client Components)
- **Language**: TypeScript 5+ (Strict Mode)
- **Styling**: Tailwind CSS v4 + `@tailwindcss/postcss` + CSS Variables
- **UI Components**: Radix UI primitives, Lucide React, React Icons (Si, Di, Fa)
- **Animations**: Framer Motion, HTML5 Canvas Particle System, CSS Marquee
- **AI Integration**: Google Gemini 2.5 Flash via Next.js Server Route Handler (`/api/chat`)
- **Architecture**: Clean Architecture (Core / Shared / Components / Sections / App)

---

## 2. Common Commands

```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Production server
npm run start

# Linting
npm run lint
```

---

## 3. Directory Structure & Conventions

```text
src/
├── app/                  # Next.js App Router (Layout, Page, Global CSS, API Routes)
│   ├── api/chat/route.ts # Server-side Gemini AI Chat Route Handler
│   ├── globals.css       # Tailwind CSS v4 design tokens & theme classes
│   ├── layout.tsx        # Root Layout with Font & SEO Metadata
│   └── page.tsx          # Root Page assembling MainLayout and Sections
├── components/           # Reusable UI building blocks
│   ├── common/           # Section, Pagination, InteractiveParticles
│   ├── layout/           # Header, MainLayout
│   └── ui/               # Badge, Button, Card, Input, Textarea, Separator
├── core/                 # Domain logic and data layer (Clean Architecture)
│   ├── config/           # AI configuration & constants
│   ├── data/             # Static portfolio data (portfolioData.ts)
│   ├── models/           # TypeScript interfaces & types (PortfolioModels.ts)
│   └── services/         # Services (PortfolioService Singleton, ChatService)
├── sections/             # Page sections (Home, About, Skills, Projects, Contact)
├── shared/               # Global utilities and custom hooks
│   ├── hooks/            # Custom hooks (useProjects, usePagination)
│   └── lib/              # Utility functions (utils.ts: cn, getImageSrc)
└── assets/               # Static images, logos, avatars, certs
```

---

## 4. Key Rules & Coding Standards

### Architecture & Patterns
- **Single Source of Truth**: All portfolio profile information (projects, skills, career, education, certs) is managed in `src/core/data/portfolioData.ts` and accessed through `PortfolioService.getInstance()`.
- **Server vs Client Components**:
  - Keep `layout.tsx` and static wrappers as Server Components whenever possible.
  - Add `'use client'` directive to interactive components (Framer Motion, Canvas, Hooks, Event listeners).
- **Sections vs Pages**: Keep section views in `src/sections/` to prevent Next.js Pages Router collisions.
- **Images**: Use `getImageSrc(img)` from `@/shared/lib/utils` when dealing with imported static images (`StaticImageData`) in custom `<img>` tags.

### Security & API Keys
- Never expose Gemini AI API keys to client-side bundles.
- All Gemini calls must route through the server Route Handler at `src/app/api/chat/route.ts`.
- Server environment variables are read from `process.env.GEMINI_API_KEY`.

### Styling & Design System
- Use semantic Tailwind tokens defined in `src/app/globals.css` (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`).
- Support both Light and Dark themes seamlessly.
- Use `cn()` helper from `@/shared/lib/utils` for conditional class joining with `clsx` and `tailwind-merge`.
- Never use inline style hacks when Tailwind utility classes or theme variables are available.
