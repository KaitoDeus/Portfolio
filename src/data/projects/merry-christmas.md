# Merry Christmas 25 (3D & AI Gesture Control)

**Role:** Fullstack AI/Web Developer  
**Timeline:** 24/12/2025  
**Status:** Completed  
**Team Size:** 1

## 🌟 Overview

A 3D interactive Christmas website using the Three.js library integrated with Artificial Intelligence (AI) for hand gesture recognition. This innovative personal project allows users to control a 3D environment seamlessly using their webcam and physical hand movements.

## 🚀 Key Features

- **3D Pine Tree (Dispersion Effect):** When the camera moves away, the tree disperses into thousands of floating pieces. Bringing the camera closer reassembles the tree perfectly. Complete with twinkling lights, reflective ornaments, and a spinning star.
- **AI Hand Gesture Control:** Utilizes MediaPipe Hand Landmarker to track 21 hand points. Open hand zooms out (dispersion), closed fist zooms in (assembly), and swiping rotates the camera.
- **Interactive Entertainment:** Clickable ornaments reveal popup photos, integrated Christmas music player, and global 3D snowfall effects.
- **WebSocket Backend:** Real-time communication between the Python AI backend tracking gestures and the frontend WebGL rendering engine.

## 🛠️ Technical Stack

- **Frontend:** Three.js, EffectComposer (Unreal Bloom), Vanilla JavaScript, CSS3
- **Backend (AI):** Python, FastAPI, WebSocket, Uvicorn
- **AI & Computer Vision:** MediaPipe Tasks API, OpenCV
