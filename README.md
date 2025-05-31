# Hệ thống đánh giá giảng viên

Hệ thống thu thập đánh giá giảng viên sau mỗi buổi học, được xây dựng bằng Next.js, TypeScript, Tailwind CSS và Firebase.

## Tính năng

- **Trang đánh giá dành cho học viên**:
  - Chọn giảng viên và khóa học
  - Đánh giá chuyên môn giảng viên (thang điểm 1-5)
  - Đánh giá phương pháp giảng dạy
  - Đánh giá giao tiếp & tương tác
  - Đánh giá kết quả học tập
  - Phản hồi tự do
  - Tùy chọn ẩn danh

- **Trang quản trị**:
  - Quản lý danh sách giảng viên (thêm/sửa/xóa)
  - Quản lý danh sách khóa học (thêm/sửa/xóa)
  - Xem và lọc đánh giá từ học viên

## Công nghệ sử dụng

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Firebase Firestore
- **Hosting**: Vercel (khuyến nghị)

## Cài đặt và chạy

1. Clone repository:
   ```bash
   git clone <repository-url>
   cd feedback
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Tạo một dự án Firebase và cập nhật thông tin cấu hình trong `app/firebase/config.ts`.

4. Khởi tạo dữ liệu mẫu:
   - Truy cập `/api/init?key=initialize-database-secret` để khởi tạo dữ liệu mẫu (giảng viên và khóa học).

5. Chạy ứng dụng ở môi trường phát triển:
   ```bash
   npm run dev
   ```

6. Truy cập ứng dụng:
   - Trang đánh giá: [http://localhost:3000](http://localhost:3000)
   - Trang quản trị: [http://localhost:3000/admin-secret](http://localhost:3000/admin-secret)

## Cấu trúc dự án

```
feedback/
├── app/
│   ├── admin-secret/       # Trang quản trị
│   ├── api/                # API routes
│   ├── components/         # React components
│   │   ├── admin/          # Components cho trang quản trị
│   │   ├── common/         # Components dùng chung
│   │   └── feedback/       # Components cho form đánh giá
│   ├── firebase/           # Cấu hình và services Firebase
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets
└── ...
```

## Màu sắc

Hệ thống sử dụng bảng màu sau:
- **#ffffff** (Trắng)
- **#fc5d01** (Cam đậm)
- **#fedac2** (Cam nhạt rất nhẹ)
- **#fdbc94** (Cam nhạt trung bình)
- **#ffac7b** (Cam sáng hơn)
- **#fd7f33** (Cam rực)

## Triển khai

Khuyến nghị triển khai ứng dụng lên Vercel:

1. Đẩy code lên GitHub
2. Kết nối repository với Vercel
3. Cấu hình các biến môi trường cần thiết
4. Deploy

## Bảo mật

- Trang quản trị được bảo vệ bằng URL bí mật (`/admin-secret`)
- API khởi tạo dữ liệu được bảo vệ bằng khóa bí mật
- Trong môi trường production, nên bổ sung thêm các biện pháp bảo mật như Firebase Authentication

## License

MIT
