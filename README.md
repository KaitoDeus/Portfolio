# Portfolio Website - Vo Anh Khai

## Table of Contents

1. [Introduction](#1-introduction)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture](#3-system-architecture)
4. [Project Structure](#4-project-structure)
5. [Installation Guide (Local)](#5-installation-guide-local)

---

## 1. Introduction

Welcome to **Vo Anh Khai's** personal Portfolio website! This project is a modern, high-performance web application designed to showcase my software engineering journey, skills, and projects.

**Key Features:**

- **Clean & Modern UI**: Built with the **Montserrat** font family for a premium feel.
- **Singleton Service Architecture**: Centralized data management via `PortfolioService`.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **Dynamic Animations**: Smooth transitions powered by **Framer Motion**.
- **SEO Optimized**: Properly structured meta tags and semantic HTML for visibility.
- **Seamless Navigation**: Single-page scrolling experience with dedicated project micro-pages.

---

## 2. Tech Stack

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-FF5733?style=for-the-badge&logo=lucide&logoColor=white)

---

## 3. System Architecture

The project follows the **Clean Architecture** principles with a focus on **SOLID** and **Design Patterns**:

- **Singleton Pattern**: Managed via `PortfolioService` to ensure a single source of truth for all data.
- **Repository Pattern**: Abstracted data access layer that decouples components from the data source.
- **Dependency Inversion**: UI components depend on abstract interfaces (`IPortfolioData`, `IProject`) rather than concrete implementations.

### Logic Flow

```text
+-------------------+       +-----------------------+       +-------------------+
|       VIEW        |       |        SHARED         |       |       CORE        |
| (React Pages)     | <---> | (Hooks & Utilities)   | <---> | (Logic & Data)    |
| - HomePage        |       | - useProjects.ts      |       | - PortfolioService|
| - ProjectsPage    |       | - usePageTitle.ts     |       | - portfolioData.ts|
+-------------------+       +-----------------------+       +-------------------+
```

---

## 4. Project Structure

The project was refactored into a **Core/Shared** architecture for better maintainability:

```text
src/
├── core/           # The "Brain" of the application
│   ├── data/       # Static configuration and project READMEs
│   ├── models/     # TypeScript Interfaces (ISP/DIP)
│   └── services/   # Business Logic & Data Services (Singleton)
├── shared/         # Reusable global utilities
│   ├── hooks/      # Custom React Hooks
│   └── lib/        # Helper functions (utils.ts)
├── components/     # UI Building Blocks
│   ├── common/     # Generic components (Section, Pagination)
│   ├── layout/     # Global layout (Header, MainLayout)
│   └── ui/         # Base UI elements (Shadcn-like)
├── pages/          # Main application views/screens
└── assets/         # Static assets (images, fonts)
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

**Step 3: Launch Development Server**

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the project.

---

**Author:** [Vo Anh Khai](https://github.com/KaitoDeus)
