# NeoShop Thương mại điện tử

**Vai trò:** Fullstack Developer  
**Thời gian:** 22/01/2026 - 04/03/2026  
**Trạng thái:** Đã hoàn thành  
**Quy mô nhóm:** 1

## 🌟 Tổng quan

NeoShop là một nền tảng thương mại điện tử B2C toàn diện từ đầu đến cuối, chuyên biệt trong việc giao hàng tự động các sản phẩm kỹ thuật số cao cấp như tài khoản truyền thông (Netflix, Spotify), bản quyền phần mềm (Windows, Adobe), và key game Steam. Hệ thống tự hào tích hợp toàn diện với các cổng thanh toán nổi tiếng của Việt Nam, đảm bảo khách hàng nhận được key sản phẩm của họ ngay lập tức được xác minh và chuyển giao ngay sau khi thanh toán.

## 🚀 Tính năng nổi bật

- **Giao sản phẩm Kỹ thuật số tự động:** Bỏ qua các khâu xử lý thủ công bằng việc tự động xác thực các giao dịch thành công và phân bổ key sản phẩm tương ứng cho người mua một cách nhanh chóng.
- **Tích hợp Cổng thanh toán:** Hỗ trợ thanh toán liền mạch qua VNPay và MoMo sử dụng mã hóa HMAC-SHA256 tiên tiến để đảm bảo mức bảo mật tối đa.
- **Hỗ trợ Chat thời gian thực:** Tích hợp bộ phận tin nhắn tức thời hai chiều (Bidirectional) cung cấp sự hỗ trợ tự nhiên từ Dịch vụ khách hàng.
- **Hệ thống Mã giảm giá Nâng cao:** Các giới hạn giảm giá linh hoạt có thể tinh chỉnh dựa theo giá trị giỏ hàng, dòng thời gian, hoặc số lượng còn tồn kho.
- **Bảo mật & Định danh Mạnh mẽ:** Luồng xác thực bảo mật JWT (JSON Web Tokens) tiêu chuẩn kết hợp cùng công cụ Google Identity Services (OAuth 2.0).

## 🛠️ Ngăn xếp công nghệ

- **Frontend:** React 19, Vite, Vanilla CSS
- **Backend:** Java 21, Spring Boot 3
- **Cơ sở dữ liệu:** PostgreSQL 17
- **Giao thức Thực tế / API Thời gian thực:** STOMP qua WebSockets (SockJS)
- **DevOps:** Docker Compose, GitHub Actions
- **Khác:** Spring Security, OpenAPI 3 (Swagger JS), Xử lý đồng bộ LocalStorage

## 💡 Điểm nổi bật về kỹ thuật

- Xây dựng một Webhook Server-to-Server IPN (Thông báo thanh toán tức thì) tự động hóa chuyên biệt để xác nhận giao dịch từ luồng VNPay/MoMo. Giúp máy chủ xử lý tác vụ mượt mà và an toàn ngay cả khi trình duyệt được đóng trên máy Client.
- Thiết kế các cơ chế Xử lý Ngoại lệ Toàn cục (Global Exception Handling) toàn diện thông qua `@ControllerAdvice`, đảm bảo phần mềm bảo vệ dữ liệu nền và trả ra định dạng dữ liệu chuẩn JSON cho Endpoint REST.
- Nâng cấp khả năng đồng bộ Context API lưu trạng thái LocalStorage cho giỏ hàng, cung cấp khả năng đa truy cập trên mọi kết nối web độc lập.
