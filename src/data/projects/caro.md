# Game Caro (LAN Multiplayer)

**Role:** Windows Forms Developer  
**Timeline:** 02/12/2025 - 06/02/2026  
**Status:** Completed  
**Team Size:** 1

## 🌟 Overview

Game Caro is a classic Tic-Tac-Toe (Caro) desktop game built with C# and Windows Forms. It features a modern, clean user interface and supports both local multiplayer on the same machine and real-time LAN multiplayer using TCP/IP Sockets. The project focuses on real-time network interactions, socket programming, and smooth UI/UX design components.

## 🚀 Key Features

- **LAN Multiplayer:** Real-time seamless gameplay between two players over a local area network with zero noticeable latency.
- **Intelligent Networking:** Automated Host/Join architecture with automatic IP detection out-of-the-box.
- **In-Game Chat:** Built-in real-time chat room during LAN matches to communicate with the opponent.
- **Game State Management:** Complete support for Undo/Redo moves and countdown timers to increase match excitement.
- **Customization:** Personalized player profiles and avatar importing.

## 🛠️ Technical Stack

- **Language:** C#
- **Framework:** .NET Framework 4.8
- **UI Toolkit:** Windows Forms, SunnyUI (v3.9.2)
- **Networking:** TCP/IP Sockets
- **Graphics:** GDI+ (Optimized for drawing the game board smoothly)

## 💡 Technical Highlights

- Developed a highly optimized custom `ChessBoardManager` to handle game logic and fast GDI+ rendering of the large board.
- Designed a non-blocking `SocketManager` that serializes interactions (moves, chat messages, game commands) as `SocketData` packets, enabling real-time bidirectional communication between the Host and Client computers.
- Implemented robust thread-safe UI updates to prevent cross-thread operation exceptions when receiving network data.
