# NeoShop E-Commerce

**Role:** Fullstack Developer  
**Timeline:** 22/01/2026 - 04/03/2026  
**Status:** Completed  
**Team Size:** 1

## 🌟 Overview

NeoShop is a fully-fledged, end-to-end B2C e-commerce platform specializing in the autonomous delivery of premium digital products such as media accounts (Netflix, Spotify), software licenses (Windows, Adobe), and Steam game keys. It boasts full integration with prominent Vietnamese payment gateways, ensuring customers get their product keys instantly verified and delivered right after checkout.

## 🚀 Key Features

- **Automated Digital Product Delivery:** Bypasses manual processing by automatically validating successful transactions and allocating matching product keys to the buyer within milliseconds.
- **Payment Gateway Integrations:** Supports seamless payments via VNPay and MoMo employing advanced HMAC-SHA256 encryptions for maximum security.
- **Real-time Chat Support:** Implemented Bidirectional instant messaging providing Customer Support assistance natively within the application.
- **Advanced Coupon Engine:** Flexible discount constraints configurable on cart value, timeline, or quantity.
- **Robust Security & Identity:** Complete standard JWT Stateless Authentication workflow combined with Google Identity Services (OAuth 2.0).

## 🛠️ Technical Stack

- **Frontend:** React 19, Vite, Vanilla CSS
- **Backend:** Java 21, Spring Boot 3
- **Database:** PostgreSQL 17
- **Real-time Protocol:** STOMP over WebSockets (SockJS)
- **DevOps:** Docker Compose, GitHub Actions
- **Other Details:** Spring Security, OpenAPI 3 (Swagger), LocalStorage synchronization

## 💡 Technical Highlights

- Engineered an automated Server-to-Server IPN (Instant Payment Notification) Webhook to confirm VNPay/MoMo transactions. Payments are reliably executed even if the end-user closes their browser prematurely.
- Designed comprehensive Global Exception Handling mechanisms via `@ControllerAdvice`, ensuring the backend never reveals internal server stacks and returns properly formatted RESTful JSON objects.
- Developed an optimized cart solution relying dynamically on Context API coupled tightly with LocalStorage, guaranteeing state persistence across page refreshes.
