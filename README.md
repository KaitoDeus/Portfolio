<div align="center">

# 🎮 Portfolio Website — Vo Anh Khai (Kaito)

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5.23-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Upstash Redis](https://img.shields.io/badge/Upstash_Redis-Serverless-00E699?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-AI_Chat-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://aistudio.google.com/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Production_Ready-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A modern, high-performance personal developer portfolio and interactive showcase built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS v4**, and **Clean Architecture**. Designed with an arcade-minimalist aesthetic, smart AI assistant integration, enterprise-grade admin authentication, and cloud-persistent unique visitor analytics.

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Architecture](#-system-architecture) • [Getting Started](#-getting-started) • [Deployment](#-vercel-deployment) • [Security](#-security-architecture)

</div>

---

## ✨ Key Features

### 🖥️ Arcade-Inspired & Modern Minimalist UI
- **Interactive Pixel Terminal**: Custom typing terminal executing `status --profile kaitodeus --mode arcade`, displaying live system integrity, quest status, and specialization specs.
- **Dynamic Theme Synchronization**: Seamless Dark and Light mode transitions with hydration-safe synchronization to avoid SSR flash.
- **Interactive Particle Background**: High-performance HTML5 Canvas particle physics responding to cursor movements with low CPU overhead.
- **Smooth Animations**: Smooth layout animations powered by **Framer Motion** and CSS marquee ribbons for skill tech stacks.

### 👁️ Cloud-Persistent Unique Visitor Analytics
- **Upstash Redis Serverless Engine**: Distributed, atomic visitor tracking powered by `@upstash/redis` designed specifically for Vercel serverless edge runtime.
- **Anti-Spam & IP Deduplication**: Uses atomic `SET portfolio:ip:<hash> 1 NX EX 86400` with 24-hour TTL and SHA-256 IP hashing for privacy preservation. Repeated page refreshes (F5) or rapid clicks never inflate visitor metrics.
- **Local Fallback**: Automatically falls back to local file storage (`src/core/data/analytics.json`) during offline local development when Redis environment variables are absent.
- **Live Counter Pill**: Compact view counter with eye icon seamlessly integrated into the hero section baseline.

### 🤖 Intelligent AI Chat Assistant (Gemini 2.5 Flash)
- **Secure Server-side Route Handler**: `/api/chat` securely handles Google Gemini API requests without exposing keys to client-side bundles.
- **Context-Aware Knowledge Base**: Pre-loaded with structured context from `PortfolioService`, answering visitors' questions about skills, projects, background, and contact details with markdown streaming.

### 🛡️ Hardened Admin Portal & Access Gate
- **Next.js Edge Middleware Protection**: Blocks unauthorized route access to `/admin` using edge-level session verification.
- **HMAC-SHA256 Signed Session Cookies**: Cryptographically verified session tokens created via the Web Crypto API.
- **Brute-Force & Rate-Limiting Defense**: Automatically locks out an IP address for 15 minutes after 5 consecutive failed login attempts, complete with a real-time countdown timer.
- **Audit Logging**: Logs all access attempts with timestamp, IP address, device user-agent, and status in `src/core/data/security_logs.json`.
- **Dynamic Portfolio Management**: Dedicated admin dashboard to manage portfolio data and upload assets on the fly.

### ⚡ Full Multi-Page & Standalone Routing
- **Dual Navigation Experience**: Supports both single-page fluid smooth-scroll navigation and dedicated standalone pages (`/about`, `/skills`, `/projects`, `/contact`, `/admin`, `/admin/login`).
- **Turbopack Powered**: Lightning-fast local development and sub-second Fast Refresh.

### 🚀 SEO, PWA & Performance
- **Dynamic Sitemap & Robots**: Generated at `/sitemap.xml` and `/robots.txt`.
- **Structured Data (JSON-LD)**: Schema.org markup (`Person`, `WebSite`) for rich Google search indexing.
- **PWA Ready**: Web App Manifest (`/manifest.webmanifest`) with icons and theme colors.
- **Typography**: Optimized font loading via `next/font/google` (Montserrat).

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Framework** | [Next.js 15.5](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) (Strict Mode) |
| **Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/postcss` |
| **Icons & UI** | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/), [Radix UI](https://www.radix-ui.com/) |
| **Animation** | [Framer Motion 12](https://motion.dev/), HTML5 Canvas 2D |
| **Database & Cache** | [Upstash Redis](https://upstash.com/) (Serverless REST API) |
| **Artificial Intelligence** | [Google Gemini 2.5 Flash API](https://ai.google.dev/) |
| **Markdown Rendering** | `react-markdown` + `remark-gfm` |
| **Security & Cryptography** | Web Crypto API (HMAC-SHA256, PBKDF2), HTTP-Only Cookies |
| **Deployment Platform** | [Vercel](https://vercel.com/) |

---

## 🏗️ System Architecture

The codebase adheres strictly to **Clean Architecture** principles, enforcing a clear separation of concerns across layers:

```text
src/
├── app/                  # Presentation & Routing Layer (Next.js 15 App Router)
│   ├── (routes)/         # Multi-page routes (/, /about, /skills, /projects, /contact)
│   ├── admin/            # Protected Admin Dashboard & Security Login Gate
│   ├── api/              # Server Route Handlers (/api/chat, /api/auth/*, /api/analytics/*)
│   ├── layout.tsx        # Root Layout with Font & SEO Metadata
│   └── globals.css       # Tailwind CSS v4 design tokens & theme variables
├── components/           # Reusable UI Components
│   ├── common/           # Generic widgets (ViewCounter, ParticleBackground, Terminal)
│   ├── layout/           # Global Header, Navigation, and Layout containers
│   └── ui/               # Atomic design primitives (Button, Card, Input, Badge)
├── core/                 # Domain & Business Logic (Framework-independent)
│   ├── config/           # App & AI system prompt configurations
│   ├── data/             # Static portfolio data, analytics & security audit logs
│   ├── models/           # Domain TypeScript interfaces and types
│   └── services/         # Singleton services (PortfolioService, ChatService)
├── sections/             # Page section compositions (Hero, About, Skills, Projects, Contact)
├── shared/               # Cross-cutting Utilities & Infrastructure
│   ├── hooks/            # Custom React hooks (useProjects, usePagination)
│   └── lib/              # Core utilities (analytics.ts, auth.ts, utils.ts)
└── assets/               # Static images, avatars, project screenshots, and certificates
```

### Architectural Request & Data Flow

```text
[ Client Browser ]
        │
        ├── (1) Page Request ────────► [ Next.js Edge Middleware ]
        │                                        │
        │                                 (Verify Session Cookie)
        │                                        │
        │                                        ▼
        │                              [ Route Handlers / Pages ]
        │
        ├── (2) Unique Visit (IP) ────► [ /api/analytics/views ]
        │                                        │
        │                                (SHA-256 IP Hash)
        │                                        │
        │                                        ▼
        │                             [ Upstash Redis Cloud ]
        │                             (SET NX EX 86400 + INCR)
        │
        └── (3) AI Assistant Chat ───► [ /api/chat ]
                                                 │
                                         (Portfolio Context)
                                                 │
                                                 ▼
                                      [ Google Gemini 2.5 API ]
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root (see [`.env.example`](.env.example)):

```env
# Google Gemini AI Assistant
GEMINI_API_KEY=your_gemini_api_key_here

# Admin Security Credentials
ADMIN_PASSWORD=your_secure_admin_password_here
ADMIN_SESSION_SECRET=your_random_hmac_secret_string_min_32_characters

# Upstash Redis (For Persistent Unique Visitor Tracking)
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token_here
```

> [!NOTE]
> If `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are omitted during local development, the application automatically uses local JSON storage (`src/core/data/analytics.json`) with zero setup needed.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.18 or higher (Node.js 20+ recommended)
- **npm**, **pnpm**, or **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/KaitoDeus/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Open `.env` and fill in your keys.

### 4. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Build for production
```bash
npm run build
npm run start
```

---

## ☁️ Vercel Deployment

Deploying this project to Vercel takes less than 2 minutes:

### Step 1: Deploy to Vercel
1. Push your code to your GitHub repository:
   ```bash
   git push origin main
   ```
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. In **Project Settings** -> **Environment Variables**, add:
   - `GEMINI_API_KEY`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`

### Step 2: Connect Upstash Redis (1-Click)
1. In your Vercel Project Dashboard, navigate to the **Storage** tab.
2. Click **Create Database** and select **Upstash Redis**.
3. Click **Connect to Project** and select your portfolio repository.
4. Vercel will automatically populate `KV_REST_API_URL` and `KV_REST_API_TOKEN` (which the codebase natively supports without any extra configuration).
5. Trigger a redeploy, and your cloud unique visitor counter is fully live!

---

## 🔒 Security Architecture

- **Protected Route Guards**: All requests to `/admin` are intercepted by Next.js Edge `middleware.ts`. Unauthorized users are immediately redirected to `/admin/login`.
- **HMAC-SHA256 Token Signing**: Session tokens are cryptographically signed with your private `ADMIN_SESSION_SECRET` and stored in `httpOnly`, `sameSite: lax`, `secure` cookies.
- **Brute-Force Protection**: 
  - Tracks failed login attempts per client IP.
  - 5 failed attempts trigger an automatic 15-minute IP lockout.
  - Responses return standard `429 Too Many Requests` status codes with `retryAfterSeconds` payloads.
- **Security Audit Logs**: Failed and successful administrative authentications are recorded in `src/core/data/security_logs.json` for incident review.

---

## 📜 Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `next dev --turbopack` | Starts development server with Turbopack |
| `npm run dev:webpack` | `next dev` | Starts development server with standard Webpack |
| `npm run build` | `next build` | Compiles optimized production bundle |
| `npm run start` | `next start` | Runs the production build server locally |
| `npm run lint` | `next lint` | Runs ESLint analysis |

---

## 👤 Author

**Vo Anh Khai (Kaito / kaitodeus)**
- **Role**: Software & Game Developer
- **GitHub**: [@KaitoDeus](https://github.com/KaitoDeus)
- **Portfolio**: [https://kaitodeus.vercel.app](https://kaitodeus.vercel.app)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
