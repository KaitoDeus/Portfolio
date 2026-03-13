# Merry Christmas 25 (Web 3D & AI Gesture Control)

**Vai trò:** Fullstack AI/Web Developer  
**Thời gian:** 24/12/2025  
**Trạng thái:** Đã hoàn thành  
**Quy mô nhóm:** 1

## 🌟 Tổng quan

Dự án website Giáng Sinh tương tác 3D sử dụng thư viện Javascript (Three.js) tích hợp trí tuệ nhân tạo (AI) nhận diện cử chỉ bàn tay. Đây là một dự án cá nhân sáng tạo cho phép người dùng điều khiển môi trường 3D một cách mượt mà thông qua webcam và các chuyển động của bàn tay.

## 🚀 Tính năng nổi bật

- **Cây Thông 3D (Dispersion Effect):** Khi camera di chuyển ra xa, cây thông sẽ tự động tách ra thành hàng ngàn mảnh nhỏ bay lơ lửng. Khi camera tiến lại gần, các mảnh vỡ tự động hút lại vào nhau để tạo thành cây thông hoàn chỉnh.
- **Điều Khiển Bằng Cử Chỉ Tay (AI):** Sử dụng MediaPipe Hand Landmarker nhận diện 21 điểm trên bàn tay. Mở bàn tay để đẩy camera ra xa (kích hoạt tan biến), nắm bàn tay để kéo camera lại gần (lắp ráp cây), và vuốt để xoay camera.
- **Tương Tác & Giải Trí:** Nhấp vào quả châu để xem ảnh popup (Kỷ niệm), trình phát nhạc Giáng Sinh tích hợp và hiệu ứng tuyết rơi 3D.
- **WebSocket Backend:** Giao tiếp thời gian thực (real-time) giữa backend Python AI xử lý cử chỉ và frontend WebGL để hiển thị 3D.

## 🛠️ Ngăn xếp công nghệ

- **Frontend:** Three.js, EffectComposer (Unreal Bloom), Vanilla JavaScript, CSS3
- **Backend (AI):** Python, FastAPI, WebSocket, Uvicorn
- **AI & Computer Vision:** MediaPipe Tasks API, OpenCV
