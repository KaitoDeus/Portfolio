# Photo Palette (Phòng chụp hình trực tuyến)

**Vai trò:** Frontend Developer  
**Thời gian:** 04/02/2026 - Nay  
**Trạng thái:** Đã hoàn thành  
**Quy mô nhóm:** 1

## 🌟 Tổng quan

Photo Palette đưa trải nghiệm Photobooth phong cách Hàn Quốc vật lý đang thịnh hành lên thẳng trình duyệt web. Ứng dụng cho phép người dùng tự động chụp selfie trực tiếp qua webcam, chỉnh sửa bố cục, áp dụng khung hình điện tử độc quyền, và tải về các bức ảnh chất lượng cao ngay lập tức mà không cần cài đặt phần mềm phụ trợ.

## 🚀 Tính năng nổi bật

- **Xử lý Ảnh phía Client (Trình duyệt):** Ghép, kết hợp, và hiển thị ảnh chụp webcam với khung bố cục ứng dụng API HTML5 `<canvas>` vô cùng linh hoạt được chạy ngay trên trình duyệt máy khách (Client).
- **Trải nghiệm Tùy chỉnh Cao cấp:** Cung cấp nhiều loại bố cục đa dạng (Dải 1x4, Lưới 2x2, v.v...) và các bộ lọc thẩm mỹ (Cool, Basic, Y2K...).
- **Chụp ảnh qua Camera trong Thời gian thực:** Trực tuyến bộ đếm thời gian thực (logic đếm lùi 3-2-1) tích hợp công cụ UI mượt mà tạo luồng ứng dụng giống một buồng chụp hình chuyên nghiệp.
- **Video Tổng hợp Ngắn:** Cung cấp định dạng video tua nhanh toàn bộ quy trình chụp (time-lapse).
- **Tải ảnh thành phẩm Tức thì:** Cung cấp bức thư viện tác phẩm đã chụp với định dạng PNG mà không gặp độ trễ API.

## 🛠️ Ngăn xếp công nghệ

- **Framework:** React 18, Vite 6
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Browser APIs Xử lý:** MediaStream API (Webcam), HTML5 Canvas

## 💡 Điểm nổi bật về kỹ thuật

- Phát triển một custom hook `usePhotoBooth` độc quyền nhằm kiểm soát Trạng thái Ứng dụng (Camera, Bố cục, Đồng hồ bấm, Quản lý ảnh chụp) khỏi quá trình Render màn hình giao diện, mang đến mô hình chia cắt cấu trúc sạch cho kiến trúc theo kiểu Presentation-Container.
- Vượt qua một loạt vấn đề nút thắt hiệu suất liên quan nhiều bước xử lý luồng WebGL và xuất dữ liệu thông qua Canvas sang định dạng URI trên khung ảnh tùy biến đa luồng, giữ đúng mượt mà khi người dùng tương tác.
