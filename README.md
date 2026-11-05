# Portfolio — Vo Anh Khai

A personal portfolio web application engineered to showcase software engineering work, game development projects, technical proficiencies, and professional journey. The application is designed with an arcade-minimalist aesthetic, featuring an interactive command terminal, integrated artificial intelligence assistant, and privacy-focused visitor analytics.

---

## Overview

This project serves as the central digital showcase for Vo Anh Khai (Kaito). It combines clean architecture principles with modern web standards to deliver a responsive, performant, and accessible experience across desktop and mobile devices.

The system emphasizes high code quality, strict TypeScript typing, optimized asset loading, and serverless edge compatibility.

---

## Core Capabilities

### Interactive Terminal System
A simulated terminal interface replicating retro-futuristic arcade operating system environments. It processes simulated diagnostic commands, renders real-time system specifications, and outlines development specializations.

### Contextual AI Assistant
An integrated AI chat module powered by Google Gemini. The assistant is contextualized with profile, project, and background data, allowing visitors to inquire about technical capabilities, career milestones, and project implementations via natural language.

### Verified Visitor Analytics
A serverless analytics engine that tracks unique visits using cryptographic IP hashing and deduplication. Repeated reloads and automated requests within a 24-hour window are filtered out, preserving metric accuracy without compromising visitor privacy.

### Visual Architecture & Design
- **Theme Synchronization**: Dual-mode (Light and Dark) architecture with persistent client-state hydration.
- **Particle System**: Lightweight canvas-based particle dynamics responsive to cursor movement with minimal GPU and CPU overhead.
- **Motion & Typography**: Hardware-accelerated transitions via Framer Motion paired with optimized Google Fonts delivery.

---

## Architecture & Design Patterns

The codebase is structured following Clean Architecture principles, ensuring decoupling between domain logic, data persistence, and presentation layers:

- **Core Layer**: Encapsulates business models, static data repositories, and core services. Manages state independently of UI frameworks.
- **Shared Layer**: Houses cross-cutting utilities, cryptographic helpers, and shared custom React hooks.
- **Components Layer**: Modular UI hierarchy composed of atomic elements, structural layouts, and composite widgets.
- **Application Layer**: Next.js App Router handling routing, server-rendered layouts, dynamic routes, and server-side Route Handlers.

---

## Technical Specifications

| Category | Specifications |
|---|---|
| **Core Framework** | Next.js (App Router, Server & Client Components) |
| **Language** | TypeScript (Strict Mode) |
| **User Interface** | React, Tailwind CSS, Radix UI Primitives, Lucide Icons |
| **Animation & Graphics** | Framer Motion, HTML5 2D Canvas |
| **AI Integration** | Google Gemini API (Server Route Handler) |
| **Data & Caching** | Upstash Redis (REST API), Structured JSON |
| **Security Standards** | HMAC-SHA256 Token Verification, Edge Middleware Guards |

---

## Author

**Vo Anh Khai (Kaito)**
- Specialization: Software & Game Developer
- GitHub: [https://github.com/KaitoDeus](https://github.com/KaitoDeus)

---

## License

This project is licensed under the MIT License.

```text
MIT License

Copyright (c) 2026 Vo Anh Khai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
