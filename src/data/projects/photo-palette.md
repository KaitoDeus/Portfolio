# Photo Palette (Online Photobooth)

**Role:** Frontend Developer  
**Timeline:** 04/02/2026 - Present  
**Status:** Completed  
**Team Size:** 1

## 🌟 Overview

Photo Palette brings the trendy physical Korean Photobooth experience entirely into the web browser. The application enables users to shoot spontaneous selfies directly via the webcam, customize layouts, apply unique photo frames, and download their high-quality results instantly without installing any external software.

## 🚀 Key Features

- **Client-Side Image Processing:** Merging, composing, and rendering webcam snapshots and layout frames heavily utilizing HTML5 `<canvas>` API entirely on the user's browser.
- **Customizable Experience:** Offers diverse layouts (Strip 1x4, Grid 2x2, etc.) and creative styling themes (Cool, Basic, Y2K...).
- **Real-Time Camera Capture:** Dynamic continuous camera feed with countdown timer (3-2-1 logic) and flash UI effects simulating a real photobooth experience.
- **Video Recap:** (Bonus) Generates a playback video of the entire shooting process for social media sharing.
- **Immediate Downloads:** Users instantly acquire their composed creations natively from the browser.

## 🛠️ Technical Stack

- **Framework:** React 18, Vite 6
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Browser APIs Utilized:** MediaStream API (Webcam), HTML5 Canvas

## 💡 Technical Highlights

- Developed a robust custom hook `usePhotoBooth` to isolate state management (Camera, Layouts, Timer, Photos Array) away from the view layer, enabling a clean Presentation-Container architectural pattern.
- Successfully circumvented performance bottlenecks associated with Canvas drawing and data URI generation across various layouts to provide buttery-smooth interactive UX.
