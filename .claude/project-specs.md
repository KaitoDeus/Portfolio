# Project Specifications - kaitodeus Portfolio

Comprehensive technical specifications and domain models for the kaitodeus portfolio application.

---

## 1. Domain Model & Data Architecture

The project strictly follows the **Single Source of Truth** and **Clean Architecture** principles. All candidate data (projects, skills, career history, education, certifications, bio, and social links) is centralized in `src/core/data/portfolioData.ts` and strongly typed via `src/core/models/PortfolioModels.ts`.

### 1.1 Data Models (`src/core/models/PortfolioModels.ts`)
- **`IPersonalInfo`**: Personal background metadata (full name, date of birth, gender, location, career objective).
- **`IProject`**:
  - `id`: Unique identifier / slug.
  - `title`: Project display name.
  - `image`: Relative/static image import (`ImageSource` = `string | StaticImageData`).
  - `role`: Role title (e.g., Fullstack Web Developer, Desktop App Developer).
  - `link`: Live demo / production URL.
  - `githubLink`: GitHub repository URL.
  - `status`: `'completed' | 'in-progress'`.
  - `technologies`: Array of technologies used (`string[]`).
  - `startDate`: Start date format (`YYYY-MM-DD`).
  - `category`: Classification category (`'personal' | 'school' | 'unity'`).
- **`ISkill`**:
  - `name`: Technology display name.
  - `icon`: Icon mapping key resolved via `iconMap` (`react-icons` or `lucide-react`).
  - `color`: Official HEX brand color.
  - `category`: `'core' | 'frontend' | 'backend' | 'database' | 'devops' | 'tools'`.
- **`ICertificate`**: Certifications & credentials (`title`, `image`, `rating`, `status`).
- **`ITimelineItem`**: Education history (`education`) and career timeline (`career`) with `year`, `title`, `location`, `subtitle`, `extra` (supports markdown links), `logo`, `details`.

---

## 2. Component & Section Specifications

### 2.1 Navigation & Header (`src/components/layout/Header.tsx`)
- **Desktop Header**: Floating pill navigation bar centered at the top (`fixed top-0`, `backdrop-blur-2xl`, glassmorphic styling).
- **Mobile/Tablet Dock**: Floating bottom dock (`fixed bottom-6`) with tactile icons and active indicator dot.
- **Theme Synchronization**:
  - Persisted in `localStorage` ('light' | 'dark').
  - Synchronized with `.dark` CSS class on `document.documentElement`.
  - Driven by React 19 `useSyncExternalStore` to eliminate hydration mismatches and prevent cascading renders.
- **Active Section Tracking**: Dynamically tracks scroll offset `window.scrollY + window.innerHeight / 3` throttled with `requestAnimationFrame`.

### 2.2 Hero Section (`src/sections/Home/HomePage.tsx`)
- **Typewriter Effect**: Cycles smoothly through developer roles (`roles`), deleting and typing characters with a blinking cursor.
- **Call-to-Action (CTA)**: Quick smooth-scroll button navigating directly to the `#skills` section.

### 2.3 About Section (`src/sections/About/AboutPage.tsx`)
- High-resolution developer portrait with styled border and ambient drop shadow.
- Info cards: Personal Details, Career Goals (Short-term & Long-term), Interests & Hobbies with dynamic Lucide icons.
- **Certificates Viewer (`CertModal`)**: Clickable certificate thumbnails launching an animated Framer Motion zoom modal.
- **Timeline Cards (`TimelineCard`)**: Structured presentation of academic degrees and professional career with automatic markdown link parsing `[label](url)`.

### 2.4 Skills Section (`src/sections/Skills/SkillsPage.tsx`)
- **Terminal Simulator**: Simulated interactive terminal typing `$ nickname: kaitodeus` and outputting system environment specs (OS, Shell, Editor, Focus).
- **Infinite Tech Ribbon (`TechMarquee`)**: Continuous 60fps CSS marquee rendering high-contrast technology icons with floating hover tooltips.

### 2.5 Projects Section (`src/sections/Projects/ProjectsPage.tsx`)
- **Category Filter Tabs**: Instant filtering by category (`All`, `Personal Projects`, `School Projects`, `Unity Developer`).
- **Pagination (`Pagination`)**: Configured at 6 projects per page using the `usePagination` custom hook.
- **Project Cards**: Responsive cards displaying thumbnail, tech stack tags, GitHub link button, and Live Demo button.

### 2.6 Contact & AI Chatbot Section (`src/sections/Contact/ContactPage.tsx`)
- Social media profile links (LinkedIn, GitHub, Email).
- **AI Chat Assistant**:
  - Powered by Google Gemini 2.5 Flash via Next.js Server Route Handler (`/api/chat`).
  - Pre-prompted with structured contextual information from `portfolioData.ts`.
  - Quick question pills ('Work', 'About me', 'Projects', 'Contact').
  - Real-time chat stream parser automatically formatting URLs, GitHub/LinkedIn links, and mailto links.

### 2.8 Local Admin CMS Dashboard (`src/app/admin/page.tsx`)
- **Visual Interface**: Full CRUD dashboard for Projects, Skills, Education/Career Timeline, Certificates, and Profile Info.
- **File-based Persistence**: Calls `PUT /api/admin/portfolio` to write formatted updates directly to `src/core/data/portfolioData.json`.
- **Git Push Assistant**: Built-in 1-click clipboard helper for `git add . && git commit -m "..." && git push`.
- **Production Guard**: Updates are locked in production (`process.env.NODE_ENV === 'production'`).

---

## 3. Server Route Handler API Specifications

1. **Font Optimization**: Powered by `next/font/google` (Montserrat) loaded at build-time to eliminate render-blocking external requests.
2. **Metadata API**: Complete Open Graph, Twitter Cards, Canonical URLs, and Favicon declarations in `src/app/layout.tsx`.
3. **Hydration Warning Safety**: Root `<body suppressHydrationWarning>` prevents layout crashes caused by browser extensions injecting unexpected DOM attributes (e.g., Grammarly, DarkReader).
