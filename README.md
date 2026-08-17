# Portfolio Website - Vo Anh Khai

## Table of Contents

1. [Introduction](#1-introduction)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture](#3-system-architecture)
4. [Project Structure](#4-project-structure)
5. [Installation Guide (Local)](#5-installation-guide-local)

---

## 1. Introduction

Welcome to **Vo Anh Khai's** personal Portfolio website! This project is a modern, high-performance web application built with **Next.js (App Router)** and **TypeScript**, designed to showcase my software engineering journey, skills, and projects.

**Key Features:**

- **Next.js 15 App Router & Server Components**: Fast static pre-rendering with dynamic Server-side API Route Handlers.
- **Secure AI Chat Assistant**: Server-side Route Handler (`/api/chat`) integrated with **Gemini 2.5 Flash** for intelligent Q&A while protecting the API key.
- **Interactive Skills Marquee**: Infinite smooth scrolling tech ribbons with interactive badges and tooltips.
- **Interactive Terminal**: Custom typing terminal simulation executing the `nickname: kaitodeus` command and loading stack specs.
- **Project Showcase & Filtering**: Real-time category filtering (Personal, School, Unity) with paginated grid view.
- **Font & SEO Optimized**: Automatic font optimization via `next/font/google` (Montserrat) and structured Metadata API.
- **Premium Aesthetics**: Clean theme switching (Dark / Light) with hydration-safe synchronization, interactive canvas particle background, and Framer Motion transitions.

---

## 2. Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-FF5733?style=for-the-badge&logo=lucide&logoColor=white)

---

## 3. System Architecture

The project follows **Clean Architecture** principles with a focus on **SOLID** and **Design Patterns**:

- **Singleton Pattern**: Managed via `PortfolioService` to ensure a single source of truth for all portfolio data.
- **Repository Pattern**: Abstracted data access layer that decouples UI components from the data source.
- **Server Route Handler Pattern**: `/api/chat` securely handles Google Gemini API requests without exposing API keys to client bundles.

### Logic Flow

```text
+-------------------+       +-----------------------+       +-------------------+
|    NEXT.JS APP    |       |        SHARED         |       |       CORE        |
| (App & Sections)  | <---> | (Hooks & Utilities)   | <---> | (Logic & Data)    |
| - src/app/        |       | - useProjects.ts      |       | - PortfolioService|
| - src/sections/   |       | - utils.ts            |       | - ChatService     |
| - src/components/ |       |                       |       | - portfolioData.ts|
+-------------------+       +-----------------------+       +-------------------+
                                                                     |
                                                                     v
                                                            [ /api/chat Route ]
                                                                     |
                                                                     v
                                                             [ Gemini AI API ]
```

---

## 4. Project Structure

```text
src/
├── app/            # Next.js App Router (Layout, Page, Global CSS, API Routes)
│   ├── api/chat/   # Server-side Gemini AI Chat Route Handler
│   ├── layout.tsx  # Root Layout (Fonts, Metadata, Hydration-safe theme)
│   ├── page.tsx    # Root Home Page
│   └── globals.css # Tailwind CSS v4 design tokens
├── core/           # The core domain logic and data
│   ├── config/     # AI & application config
│   ├── data/       # Static portfolio data
│   ├── models/     # TypeScript interfaces & types
│   └── services/   # Business logic & services (PortfolioService, ChatService)
├── shared/         # Reusable global utilities & hooks
│   ├── hooks/      # Custom React hooks (useProjects, usePagination)
│   └── lib/        # Helper functions (utils.ts)
├── components/     # UI Building Blocks
│   ├── common/     # Generic components (Section, Pagination, InteractiveParticles)
│   ├── layout/     # Header & MainLayout
│   └── ui/         # Base UI elements (Badge, Button, Card, Input, Textarea)
├── sections/       # Main portfolio sections (Home, About, Skills, Projects, Contact)
└── assets/         # Static assets (images, logos, certs)
```

---

## 5. Installation Guide (Local)

**Prerequisites:** Ensure **Node.js** (v18 or higher) is installed.

**Step 1: Clone the repository**

```bash
git clone https://github.com/KaitoDeus/Portfolio.git
cd Portfolio
```

**Step 2: Install Dependencies**

```bash
npm install
```

**Step 3: Setup Environment Variables**

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

**Step 4: Launch Development Server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the project.

**Step 5: Build for Production**

```bash
npm run build
npm run start
```
