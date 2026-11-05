# Claude AI Guidelines - Portfolio Vo Anh Khai (Kaito)

This file provides architectural context, coding standards, commands, security rules, and component conventions for AI assistants and contributors working on this codebase.

---

## 1. Project Overview & Tech Stack

- **Framework**: Next.js 15.5+ (App Router, Server Components + Client Components)
- **Language**: TypeScript 5.9+ (Strict Mode)
- **Styling**: Tailwind CSS v4 + `@tailwindcss/postcss` + Theme Tokens
- **UI Components**: Radix UI primitives, Lucide React, React Icons (Si, Di, Fa)
- **Animations**: Framer Motion 12, HTML5 Canvas 2D Particle System, CSS Marquee
- **Database & Cache**: Upstash Redis (`@upstash/redis`) with local JSON fallback
- **AI Integration**: Google Gemini 2.5 Flash via Server Route Handler (`/api/chat`)
- **Security**: HMAC-SHA256 session cookie tokens, Next.js Edge Middleware, IP Rate-limiting
- **Architecture**: Clean Architecture (Core / Shared / Components / Sections / App)

---

## 2. Common Commands

```bash
# Development server with Turbopack (http://localhost:3000)
npm run dev

# Development server with Webpack fallback
npm run dev:webpack

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
│   ├── (routes)/         # Multi-page views (/, /about, /skills, /projects, /contact)
│   ├── admin/            # Protected Admin Dashboard & Security Login Gate
│   ├── api/
│   │   ├── admin/        # Portfolio live mutation & upload endpoints
│   │   ├── analytics/    # Unique visitor analytics API (/api/analytics/views)
│   │   ├── auth/         # Login, logout, session check, audit logs
│   │   └── chat/         # Server-side Gemini AI Chat Route Handler
│   ├── globals.css       # Tailwind CSS v4 design tokens & theme classes
│   ├── layout.tsx        # Root Layout with Font & SEO Metadata
│   └── page.tsx          # Root Page assembling MainLayout and Sections
├── components/           # Reusable UI building blocks
│   ├── common/           # Section, Pagination, ViewCounter, InteractiveParticles
│   ├── layout/           # Header, MainLayout, Navigation
│   └── ui/               # Badge, Button, Card, Input, Textarea, Separator
├── core/                 # Domain logic and data layer (Clean Architecture)
│   ├── config/           # AI system prompt & configuration constants
│   ├── data/             # Static portfolio data, analytics.json, security_logs.json
│   ├── models/           # TypeScript interfaces & types (PortfolioModels.ts)
│   └── services/         # Services (PortfolioService Singleton, ChatService)
├── sections/             # Page sections (Home, About, Skills, Projects, Contact)
├── shared/               # Global utilities and custom hooks
│   ├── hooks/            # Custom hooks (useProjects, usePagination)
│   └── lib/              # Utility functions (analytics.ts, auth.ts, utils.ts)
└── assets/               # Static images, logos, avatars, certs
```

---

## 4. Key Rules & Coding Standards

### Architecture & Patterns
- **Single Source of Truth**: All portfolio profile information (projects, skills, career, education, certs) is managed in `src/core/data/portfolioData.ts` and accessed through `PortfolioService.getInstance()`.
- **Server vs Client Components**:
  - Keep `layout.tsx` and static wrappers as Server Components whenever possible.
  - Add `'use client'` directive to interactive components (Framer Motion, Canvas, Hooks, Event listeners).
- **Next.js 15 App Router Suspense Rule**:
  - Any client component using `useSearchParams()` (e.g. `src/app/admin/login/page.tsx`) must be wrapped in a `<React.Suspense fallback={...}>` boundary to prevent prerender bailout during `next build`.
- **Images**: Use `getImageSrc(img)` from `@/shared/lib/utils` when dealing with imported static images (`StaticImageData`) in custom `<img>` tags.

### Analytics & Visitor Deduplication
- **Dual-Engine Pattern** in `src/shared/lib/analytics.ts`:
  - When `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_URL` & `KV_REST_API_TOKEN`) exist, it uses Upstash Redis atomic `SET portfolio:ip:<hash> 1 NX EX 86400` + `INCR portfolio:unique_visitors`.
  - Otherwise, it smoothly falls back to local file storage (`src/core/data/analytics.json`).
  - IP addresses are always hashed with SHA-256 for privacy.

### Security & Authentication
- **Edge Middleware**: Protected routes under `/admin` are guarded by `middleware.ts`. Unauthorized requests are redirected to `/admin/login`.
- **HMAC-SHA256 Token Signing**: Admin session tokens are signed using the Web Crypto API with `ADMIN_SESSION_SECRET`.
- **Rate-Limiting**: IP-based rate limiting in `src/shared/lib/auth.ts` limits failed attempts to 5, then temporarily locks out the IP for 15 minutes.
- **Never expose sensitive keys**: Gemini API keys, Admin passwords, and Redis tokens must never be exposed to client-side bundles or committed to git.

### Styling & Design System
- Use semantic Tailwind tokens defined in `src/app/globals.css` (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`).
- Support both Light and Dark themes seamlessly.
- Use `cn()` helper from `@/shared/lib/utils` for conditional class joining with `clsx` and `tailwind-merge`.
- Never use inline style hacks when Tailwind utility classes or theme variables are available.
