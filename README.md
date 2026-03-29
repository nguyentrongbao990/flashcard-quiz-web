# Flashcard Quiz Web

Web hỗ trợ học từ vựng/kiến thức bằng flashcard và quiz để ôn tập, ghi nhớ hiệu quả.

## Mục tiêu MVP

Sản phẩm hiện tại tập trung vào các chức năng cốt lõi:
- Xem danh sách bộ flashcard
- Tạo bộ flashcard mới
- Xem chi tiết một bộ thẻ
- Thêm flashcard vào bộ thẻ
- Học bằng cách lật flashcard
- Làm quiz từ bộ thẻ
- Xem kết quả đúng/sai

## Công nghệ sử dụng

- HTML
- CSS
- JavaScript
- Bootstrap
- localStorage

## Cấu trúc thư mục

```text
flashcard-quiz-web/
│
├── assets/
│   └── image/
│       ├── avatar.png
│       └── logo.png
│
├── components/
│   └── header.html
│
├── css/
│   ├── base.css
│   ├── style-home.css
│   └── style.css
│
├── js/
│   ├── core/
│   │   ├── flashcard.js
│   │   └── storage.js
│   │
│   ├── pages/
│   │   ├── detail.js
│   │   ├── home.js
│   │   ├── quiz.js
│   │   └── study.js
│   │
│   └── shared/
│       └── import-header.js
│
├── pages/
│   ├── detail.html
│   ├── home.html
│   ├── quiz.html
│   └── study.html
│
├── .gitignore
└── README.md
```
## Chức năng từng phần
1. Trang chủ (pages/home.html)
Hiển thị danh sách các bộ thẻ
Tạo bộ thẻ mới
Chuyển đến:
Chi tiết bộ thẻ
Trang học flashcard
Trang quiz

2. Trang chi tiết bộ thẻ (pages/detail.html)
Hiển thị tên bộ thẻ
Hiển thị mô tả bộ thẻ
Hiển thị danh sách flashcard trong bộ
Thêm flashcard mới vào bộ
Chuyển sang trang học hoặc quiz

3. Trang học flashcard (pages/study.html)
Hiển thị thẻ hiện tại
Lật mặt trước / mặt sau
Chuyển sang thẻ tiếp theo
Hiển thị tiến độ học

4. Trang quiz (pages/quiz.html)
Hiển thị câu hỏi từ flashcard
Nhập đáp án
Chấm điểm
Hiển thị kết quả cuối cùng

## Vai trò các file JavaScript

1. js/core/storage.js
Quản lý dữ liệu trong localStorage:

- lưu danh sách bộ thẻ
- đọc danh sách bộ thẻ
- lưu bộ thẻ hiện tại đang được chọn

2. js/core/flashcard.js
Xử lý logic lõi của flashcard:

- tạo bộ thẻ mới
- lấy bộ thẻ theo id
- thêm flashcard vào bộ thẻ

3. js/pages/home.js
Xử lý logic cho trang chủ:

- render danh sách bộ thẻ
- tạo bộ thẻ mới
- điều hướng sang các trang khác

4. js/pages/detail.js
Xử lý logic cho trang chi tiết:

- hiển thị thông tin bộ thẻ
- render danh sách flashcard
- thêm flashcard mới

5. js/pages/study.js
Xử lý logic cho trang học:

- hiển thị flashcard hiện tại
- lật thẻ
- cập nhật tiến độ
- chuyển sang thẻ tiếp theo

6. js/pages/quiz.js
Xử lý logic cho trang quiz:

- bắt đầu quiz
- hiển thị câu hỏi
- kiểm tra đáp án
- hiển thị kết quả

7. js/shared/import-header.js
Import header dùng chung từ components/header.html.

## Cách chạy project
- Mở project bằng VS Code
- Mở thư mục pages
- Chạy file home.html bằng Live Server

## Luồng demo sản phẩm

- Vào trang chủ
- Xem danh sách bộ thẻ
- Tạo bộ thẻ mới
- Chọn một bộ thẻ
- Xem chi tiết bộ thẻ
- Thêm flashcard
- Chuyển sang học flashcard
- Chuyển sang quiz
- Xem kết quả

## Hướng phát triển trong tương lai

- Thêm đăng nhập / đăng ký
- Lưu dữ liệu bằng database thay vì localStorage
- Theo dõi lịch sử học
- Thống kê kết quả học tập
- Thêm chức năng chỉnh sửa / xóa flashcard
- Tối ưu giao diện và trải nghiệm người dùng
