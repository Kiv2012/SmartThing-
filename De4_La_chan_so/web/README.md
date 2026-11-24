# Lá Chắn Số – web mobile (prototype bấm được)

Ứng dụng web giao diện ưu tiên điện thoại. HTML, CSS, JavaScript thuần, không cần cài đặt hay build.

## Chạy

- **Cách nhanh:** mở `index.html` bằng Chrome.
- **Đầy đủ** (để dùng được khi mất mạng và "Thêm vào màn hình chính"): chạy một máy chủ tĩnh trong thư mục này, ví dụ `python -m http.server 8765`, rồi mở `http://localhost:8765`.
- Xem ở khung điện thoại: Chrome DevTools → Toggle device toolbar → 390 × 844.

## Đường dẫn hữu ích

| Đường dẫn | Màn |
|---|---|
| `/` | Trang cá nhân, tra cứu ngay |
| `#/bat-dau` | MH-01 Chọn nhóm nội dung tùy chọn |
| `#/man-hinh` | **Danh mục toàn bộ màn hình và trạng thái** (dùng khi trình chiếu, chụp PDF) |
| `#/toi` | Đổi cách hiển thị, nghe đọc, nội dung và vào công tác theo quyền |
| `#/dang-nhap?work=1` | Chọn tài khoản mẫu Tình nguyện viên hoặc Điều phối viên |

Đăng nhập, mã xác minh và phân quyền trong bản này được mô phỏng tại trình duyệt. Các màn hình tài khoản chỉ dùng dữ liệu mẫu.

Huy hiệu Đoàn được lấy từ [trang Điều lệ Đoàn của Đại học Tôn Đức Thắng](https://student.tdtu.edu.vn/doan-hoi/dieu-le-doan-thanh-nien-cong-san-ho-chi-minh-khoa-xi). Họa tiết trống đồng Đông Sơn là hình minh họa tạo cho bản demo dựa trên ảnh tham chiếu.

## Cấu trúc thư mục

```
web/
├── index.html            Nạp CSS và JS theo thứ tự lớp (xem chú thích trong file)
├── manifest.json, sw.js  Thêm vào màn hình chính, dùng khi mất mạng
├── assets/
│   ├── icon.svg
│   └── fonts/            Bai Jamjuree, Be Vietnam Pro (SIL OFL 1.1), lưu cùng web
├── css/                  Theo ../DESIGN.md – nạp đúng thứ tự dưới đây
│   ├── tokens.css        Biến màu, chữ, khoảng cách; chế độ Dễ nhìn
│   ├── base.css          Nền tảng
│   ├── layout.css        Khung màn, đầu trang, thanh điều hướng, thanh bước
│   ├── components.css    Thẻ, chữ, nút, ô nhập
│   ├── screens.css       Kết quả, tin nhắn, học, đội TNV, khẩn cấp
│   ├── overlays.css      Bottom sheet, toast, trợ lý giọng nói
│   └── responsive.css    Màn rộng cho đội TNV
└── js/
    ├── data/             DỮ LIỆU GIẢ LẬP
    │   ├── scenarios.js    10 tình huống T01–T10
    │   ├── lookup.js       Danh sách tra cứu, ví dụ bấm nhanh
    │   ├── community.js    Xã/phường, chi đoàn, hộ đỡ đầu, buổi tuyên truyền, người thân mẫu
    │   ├── reports.js      120 báo cáo (42 đường dẫn giả mạo = 35%)
    │   └── quiz-bank.js    Ngân hàng câu hỏi
    ├── core/             Lõi dùng chung
    │   ├── state.js        Trạng thái lưu trên máy, vai trò, xưng hô
    │   ├── utils.js        Tiện ích chuỗi, định dạng số
    │   ├── icons.js        Icon nét (chỉ 4 chỗ – DESIGN.md 1A)
    │   ├── ui.js           Toast, bottom sheet, đầu trang, thanh điều hướng, khung màn
    │   ├── speech.js       Đọc to, nhận giọng nói tiếng Việt
    │   └── router.js       Điều hướng #/..., sự kiện data-go / data-act
    ├── logic/            Nghiệp vụ, không phụ thuộc giao diện
    │   ├── checker.js      Kiểm tra số / link / tài khoản (CN-02, QT-04…10)
    │   ├── analyzer.js     Phân tích tin nhắn – tầng luật (CN-03)
    │   └── trends.js       Phát hiện kiểu lừa MỚI (QT-20)
    ├── shared/           Dùng chung giữa các màn
    │   ├── install.js      Gợi ý Thêm vào màn hình chính (MH-02a)
    │   ├── input.js        Nút Dán
    │   ├── qr.js           Mã QR minh họa
    │   └── quiz-engine.js  Tạo đề, chấm điểm, trang kết quả (CN-07)
    ├── screens/          Mỗi file một màn hoặc một cặp màn liền nhau
    │   ├── onboarding/     role.js (MH-01) · relatives.js (MH-02)
    │   ├── home/           elderly.js (MH-03) · student.js (MH-04) · voice-assistant.js (MH-19)
    │   ├── check/          quick-check.js (MH-05) · result.js (MH-06) · message.js (MH-07)
    │   ├── report/         report-form.js (MH-08) · received.js (MH-09) · emergency.js (MH-10)
    │   ├── family/         ask.js (MH-11) · relative-view.js (MH-12)
    │   ├── learn/          lessons.js (MH-13) · quiz.js (MH-14, 15) · compete.js (MH-24) · session-join.js
    │   ├── team/           overview.js (MH-16) · verify.js (MH-17) · propaganda.js (MH-18)
    │   │                   sponsor.js (MH-21) · sessions.js (MH-22, 23)
    │   ├── profile/        profile.js (MH-20)
    │   └── dev/            screen-index.js (danh mục màn hình)
    └── app.js            Khởi động
```

**Quy ước:**
- Mọi module dùng chung một không gian tên `window.App`. Dữ liệu nằm ở `window.LCS_DATA`.
- Dùng `<script>` thường, không dùng ES module, để **mở thẳng `index.html` bằng Chrome vẫn chạy** (`file://` chặn ES module).
- Thứ tự nạp trong `index.html` là thứ tự phụ thuộc: data → core → logic → router → shared → screens → app.
- **Thêm một màn mới:** tạo file trong `js/screens/<nhóm>/`, gọi `A.route(/^\/duong-dan$/, (m, q) => A.screen({...}))`, khai báo thao tác bằng `A.actions['ten'] = el => …` và gắn vào HTML bằng `data-act="ten"`. Sau đó thêm thẻ `<script>` vào `index.html` và thêm đường dẫn vào danh sách `FILES` trong `sw.js`.
- Tham số đọc từ đường dẫn phải được kiểm tra định dạng hoặc escape bằng `A.esc()` trước khi đưa vào HTML.

## Giới hạn của bản mẫu (nói rõ)

- Mọi số điện thoại, đường link, số tài khoản, tên người là **dữ liệu giả lập**.
- Phân tích tin nhắn chạy **tầng luật từ khóa trên máy**. Có thể chọn ảnh PNG, JPG hoặc WebP tối đa 10 MB, rồi rà chữ tiếng Việt hoặc tiếng Anh được nhận diện trước khi phân tích. Bộ đọc ảnh tải theo nhu cầu. Ảnh không được gửi lên máy chủ. Tầng mô hình ngôn ngữ dành cho bản chung kết.
- "Hỏi người thân" trong app là **mô phỏng** trạng thái Đã gửi → Đã xem → Đã trả lời. Gọi điện, SMS, Zalo mở ứng dụng thật của điện thoại.
- Mã QR của buổi tuyên truyền là **mã minh họa** (không quét được). Người dân vào bằng mã 6 số tại `#/buoi`.
- Kênh tiếp nhận tin báo của Công an cần kiểm chứng và cấu hình theo địa phương. App không tự gửi.
