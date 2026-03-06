# Game Caro (LAN Multiplayer)

**Vai trò:** Windows Forms Developer  
**Thời gian:** 02/12/2025 - 06/02/2026  
**Trạng thái:** Đã hoàn thành  
**Quy mô nhóm:** 1

## 🌟 Tổng quan

Game Caro là một trò chơi Tic-Tac-Toe (Caro) cổ điển trên máy tính được xây dựng bằng C# và Windows Forms. Nó có giao diện người dùng hiện đại, gọn gàng và hỗ trợ cả chơi nhiều người cục bộ trên cùng máy tính và nhiều người qua mạng LAN theo thời gian thực sử dụng TCP/IP Sockets. Dự án tập trung vào các tương tác mạng thời gian thực, lập trình socket, và thiết kế các thành phần UI/UX mượt mà.

## 🚀 Tính năng nổi bật

- **Nhiều người chơi qua LAN:** Trải nghiệm chơi game thời gian thực liền mạch giữa hai người chơi trên mạng nội bộ với độ trễ gần như bằng không.
- **Mạng thông minh:** Kiến trúc Host/Join tự động với tính năng tự động nhận diện IP sẵn có.
- **Chat trong game:** Tích hợp phòng chat thời gian thực trong các trận đấu LAN để giao tiếp với đối thủ.
- **Quản lý trạng thái game:** Hỗ trợ hoàn toàn thao tác Đi lại/Hủy đi lại (Undo/Redo) và đếm ngược thời gian để tăng sự kịch tính cho trận đấu.
- **Cá nhân hóa:** Hồ sơ cá nhân hóa người chơi và cập nhật ảnh đại diện.

## 🛠️ Ngăn xếp công nghệ

- **Ngôn ngữ:** C#
- **Framework:** .NET Framework 4.8
- **UI Toolkit:** Windows Forms, SunnyUI (v3.9.2)
- **Mạng:** TCP/IP Sockets
- **Đồ họa:** GDI+ (Tối ưu hóa để vẽ bảng game mượt mà)

## 💡 Điểm nổi bật về kỹ thuật

- Phát triển một `ChessBoardManager` tùy chỉnh, tối ưu hóa cao để xử lý logic phần mềm và hiển thị GDI+ nhanh chóng.
- Thiết kế một `SocketManager` không chặn dữ liệu (non-blocking) tuần tự hóa các tương tác (nước đi, tin nhắn chat, lệnh game) dưới dạng gói tin `SocketData`, cho phép giao tiếp hai chiều theo thời gian thực giữa máy Host và Client.
- Triển khai cập nhật UI an toàn luồng (thread-safe) để ngăn chặn các ngoại lệ khi thao tác chéo luồng trong quá trình truyền nhận dữ liệu mạng.
