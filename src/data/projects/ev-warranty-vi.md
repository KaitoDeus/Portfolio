# Hệ thống Quản lý Bảo hành xe điện (EV Warranty)

**Vai trò:** Backend Developer  
**Thời gian:** 19/12/2025 - 07/02/2026  
**Trạng thái:** Đã hoàn thành  
**Quy mô nhóm:** Nhóm

## 🌟 Tổng quan

Hệ thống bảo hành xe điện (EV Warranty System) là một nền tảng quản lý bảo hành chuyên biệt, tập trung được thiết kế riêng cho hệ sinh thái Xe điện (EV). Nó hoạt động như một cầu nối dữ liệu giữa Nhà sản xuất thiết bị gốc (OEM) và các Trung tâm dịch vụ. Hệ thống chuẩn hóa quy trình tiếp nhận, xử lý và phân tích các yêu cầu bảo hành, bên cạnh việc giám sát dữ liệu hoạt động của xe điện.

## 🚀 Tính năng nổi bật

- **Cổng thông tin Trung tâm Dịch vụ:** Dễ dàng quản lý dữ liệu xe, lịch sử sửa chữa, và tạo yêu cầu bảo hành trực tuyến.
- **Trang tổng quan cho Nhà sản xuất (OEM):** Giám sát thời gian thực các hoạt động bảo hành, quản lý linh kiện, luồng công việc phê duyệt yêu cầu bảo hành, và điều hành các đợt triệu hồi.
- **Phân tích rủi ro bằng AI:** Phân tích dự đoán và lập bản đồ các lỗi linh kiện tiềm năng dựa trên dữ liệu vận hành hiện tại và lịch sử kiểu xe.
- **Quản trị hệ thống:** Kiểm soát truy cập phân quyền chi tiết (RBAC) đảm bảo tính bảo mật và phần mềm chỉ hoạt động đúng luồng dành cho các Quản trị viên, Nhân viên Dịch vụ, Kỹ thuật viên, và Nhân viên từ Phía OEM.

## 🛠️ Ngăn xếp công nghệ

- **Backend:** Java 21, Spring Boot 3.2
- **Frontend / View:** Thymeleaf, Bootstrap, jQuery, CSS3
- **Cơ sở dữ liệu:** PostgreSQL 17
- **DevOps & Công cụ:** Docker, Docker Compose, Apache Maven

## 💡 Điểm nổi bật về kỹ thuật

- Xây dựng kiến trúc backend bảo mật cao, hướng đến xử lý hệ thống xử lý dòng dữ liệu lớn áp dụng tiêu chuẩn mô hình hệ thống RESTful.
- Docker hóa toàn bộ ứng dụng thành công, tạo ra một môi trường `docker-compose` thống nhất khởi chạy cả Ứng dụng Servlet lẫn hệ cơ sở dữ liệu PostgreSQL chỉ với một dòng lệnh duy nhất, tiết kiệm triệt để trải nghiệm lập trình viên (DX).
- Tích hợp các ràng buộc JPA/Hibernate phức tạp cho thực thể quan hệ, đảm bảo khả năng toàn vẹn dữ liệu cho các thao tác Entity phức tạp.
