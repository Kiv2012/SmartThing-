# DESIGN.md – LÁ CHẮN SỐ

> Hệ thống thiết kế cho web mobile Lá Chắn Số (Đề 4) · 24/11/2026
> Nền tảng: nhận diện giao diện Đoàn (xanh Đoàn, đỏ cờ, vàng sao; Bai Jamjuree + Be Vietnam Pro).
> Đi kèm: [01_dac_ta_san_pham.md](01_dac_ta_san_pham.md) · [02_dac_ta_chuc_nang.md](02_dac_ta_chuc_nang.md) · [03_sitemap_luong_man_hinh.md](03_sitemap_luong_man_hinh.md)

---

## 1. Định hướng

**"Sản phẩm của Đoàn, dùng được khi đang hoảng."**

- **Nhận ra ngay là của Đoàn:** đầu trang xanh Đoàn, khối cờ đỏ sao vàng, font tiêu đề Bai Jamjuree.
- **Bình tĩnh, rõ ràng:** nền sáng, một việc chính mỗi màn, chữ to, không có hiệu ứng thừa.
- **Màu cảnh báo tách khỏi màu thương hiệu:** đỏ cờ Đoàn **chỉ** dùng cho logo và con dấu. Mức 🔴 Nguy hiểm dùng một màu đỏ cảnh báo riêng.
- **Hai cấp đọc:** chế độ thường cho học sinh và đoàn viên, **chế độ Dễ nhìn** cho người cao tuổi. Cùng thành phần, chỉ phóng to theo biến.
- **Không sao chép giao diện sản phẩm có sẵn** (yêu cầu của BTC). Màn mô phỏng tin nhắn chỉ gợi bối cảnh, không chép nguyên giao diện của ứng dụng nào.
- **Mộc và tiết chế, không mang "phong cách AI":** trông như một công cụ công vụ đáng tin, không như bản demo công nghệ. **Chữ dẫn đường, icon chỉ hỗ trợ.** Xem mục 1A.

## 1A. Tiết chế: tránh phong cách AI và lạm dụng icon

**Ngân sách icon:** icon chỉ xuất hiện ở **4 chỗ**:

| # | Chỗ được dùng icon | Lý do |
|---|---|---|
| 1 | Thanh điều hướng dưới | Quy ước quen thuộc, luôn kèm nhãn chữ |
| 2 | Dấu mức kết quả (Nguy hiểm / Nghi ngờ / An toàn) | Bắt buộc để không phụ thuộc màu (tiếp cận) |
| 3 | Nút ← Quay lại | Quy ước, kèm nhãn ẩn cho trình đọc màn hình |
| 4 | Nút Nghe đọc, nút Micro | Chức năng nhận ra bằng hình nhanh hơn chữ |

**Ngoại lệ bắt buộc:** nút **"Tiếp tục với Google"** ở MH-25, MH-26 dùng logo Google nhiều màu theo đúng hướng dẫn nhận diện nút đăng nhập của Google. Đây là quy định của bên thứ ba, không phải icon trang trí.

**Mọi chỗ còn lại dùng chữ:** nút, danh sách, lý do "Vì sao?", thẻ chọn vai trò, kiểu lừa, KPI, trạng thái. **Mỗi thành phần tối đa 1 icon.** Không có icon trang trí.

**Không dùng:**

| Không dùng | Thay bằng |
|---|---|
| Gradient (tím–xanh, xanh–xanh), chữ gradient, viền phát sáng, glassmorphism | **Màu phẳng**: nền `--navy` hoặc `--brand` đặc |
| Biểu tượng lấp lánh ✨, nhãn "AI-powered", robot, não bộ cho tính năng AI | Gọi tên việc nó làm: "**Phân tích tin nhắn**", ghi chú nhỏ "có dùng trí tuệ nhân tạo" ở cuối kết quả |
| Emoji ở bất kỳ đâu trên giao diện | Chữ |
| Icon đầu mỗi dòng danh sách, icon trong mọi thẻ | Đánh số 1–2–3 hoặc gạch đầu dòng |
| Thẻ lồng thẻ, đổ bóng khắp nơi, bo góc lớn (≥ 20px) | Viền mảnh `--line`, bo 10–12px, đổ bóng chỉ cho bottom sheet |
| Hình minh họa lớn, hero căn giữa, khối trang trí | Nội dung thật ngay từ dòng đầu |
| Chip bo tròn cho mọi nhãn | Chữ thường màu `--ink-2`. Chỉ dùng chip cho **ví dụ bấm nhanh** |
| Hiệu ứng nhịp, lấp lánh, skeleton chạy sáng | Chữ "Đang kiểm tra…" kèm thanh tiến độ phẳng |
| Huy hiệu, cúp, pháo hoa khi đạt điểm | Con dấu chứng nhận (một lần, ở MH-15) và con số |

---

## 2. Màu

### 2.1 Thương hiệu Đoàn

| Biến | Mã | Dùng cho | Không dùng cho |
|---|---|---|---|
| `--brand` | `#0054A6` | Nút chính, thẻ điều hướng đang chọn, liên kết | Nền đoạn chữ dài |
| `--brand-ink` | `#003D82` | Chữ đậm trên nền nhạt | – |
| `--brand-soft` | `#E3EEFA` | Chip, nút phụ, nền ô nhập đang chọn | – |
| `--navy` | `#003D82` | Đầu trang (gradient), số liệu lớn | – |
| `--doan-red` | `#DA251D` | **Chỉ** ô cờ, con dấu chứng nhận | Báo lỗi, mức Nguy hiểm |
| `--star` | `#FFD200` | Điểm nhấn, nút CTA trên nền xanh, điểm số, huy hiệu | Chữ trên nền trắng |
| `--sky` | `#CFE3F5` | Chữ phụ trên nền xanh | – |

Tỷ lệ: xanh Đoàn khoảng 60% · trắng và nền nhạt khoảng 30% · vàng và đỏ không quá 10%.

### 2.2 Trung tính

`--ink #0F1B33` (chữ chính) · `--ink-2 #44506A` (chữ phụ) · `--muted #6B7489` (chú thích) · `--bg #EEF4FB` (nền app) · `--paper #FFFFFF` (thẻ) · `--line #DDE7F3` (viền).

### 2.3 Ba mức kết quả

Mỗi mức gồm **màu + biểu tượng + chữ + câu đọc to**, không bao giờ chỉ dùng màu.

| Mức | Nền thẻ | Màu đậm (biểu tượng, viền, dải trên) | Chữ trên nền nhạt | Biểu tượng | Nhãn |
|---|---|---|---|---|---|
| Nguy hiểm | `--danger-soft #FDECEC` | `--danger #E5373A` | `--danger-ink #B42318` | Tam giác chấm than | **NGUY HIỂM** |
| Nghi ngờ | `--warn-soft #FFF5E0` | `--warn #F2A20C` | `--warn-ink #8A5300` | Dấu chấm hỏi trong tròn | **NGHI NGỜ** |
| An toàn | `--ok-soft #E5F6EC` | `--ok #14A05A` | `--ok-ink #0B7A43` | Khiên có dấu tích | **AN TOÀN** |

- Chữ trên nền nhạt luôn dùng màu `*-ink` để đạt tương phản AA. Không đặt chữ trắng nhỏ trên `--warn`.
- Màn khẩn cấp MH-10 dùng nền `--danger`, chữ trắng **cỡ lớn** (≥ 20px đậm).

### 2.4 Màu mô phỏng bối cảnh

`--chat-bubble #FFFFFF` · `--chat-bg #E8EDF3` · `--chat-flag #FFE1E1` (tô câu đáng ngờ). Chỉ dùng trong khung tin nhắn mô phỏng (MH-07, MH-13, MH-14).

---

## 3. Chữ

| Vai trò | Font | Thường | **Dễ nhìn** | Đậm |
|---|---|---|---|---|
| Tiêu đề lớn (tên app, nhãn kết quả) | Bai Jamjuree | 28px | 34px | 700, có thể IN HOA |
| Tiêu đề màn | Bai Jamjuree | 18px | 22px | 700 |
| Tiêu đề thẻ | Be Vietnam Pro | 16px | 20px | 700 |
| Nội dung | Be Vietnam Pro | **16px** | **20px** | 400–500 |
| Chú thích, nguồn số liệu | Be Vietnam Pro | 14px | 17px | 500 |
| Số liệu KPI | Bai Jamjuree | 32px | 36px | 700 |
| Nút | Be Vietnam Pro | 16px | 20px | 700 |

- Không dùng cỡ dưới **14px** ở bất kỳ đâu.
- Giãn dòng: nội dung 1.5, tiêu đề 1.2.
- Căn trái, không căn đều hai bên.
- Số điện thoại và số tài khoản hiển thị theo nhóm 4-3-3 (`0909 123 456`) bằng font có chữ số đều (`font-variant-numeric: tabular-nums`).
- **Font lưu cùng web** (`web/fonts/*.woff2`), không tải từ máy chủ ngoài. Nhờ vậy web chạy được khi mất mạng (PCN-05, PCN-09). Font dự phòng: `system-ui, -apple-system, "Segoe UI", Roboto`.

---

## 4. Khoảng cách, bo góc, đổ bóng

- **Thang khoảng cách:** 4 · 8 · 12 · 16 · 20 · 24 · 32px. Lề màn hình 16px (Dễ nhìn 20px).
- **Bo góc:** thẻ 12px · nút 10px · ô nhập 10px · chip ví dụ 8px.
- **Đổ bóng:** chỉ cho bottom sheet. Mọi thẻ khác, kể cả thẻ kết quả, chỉ dùng viền `--line` (thẻ kết quả dùng viền màu của mức).
- **Vùng chạm:** tối thiểu **48px** (Dễ nhìn **64px**). Nút chính ở trang chủ Ông bà cao **92px**.

---

## 5. Bố cục và lưới

| Khung | Quy tắc |
|---|---|
| Điện thoại (thiết kế chuẩn) | **390 × 844**, một cột, lề 16px |
| Màn rộng hơn (người dân) | Cột nội dung tối đa **480px**, căn giữa, nền `--bg` hai bên |
| Đội TNV từ 768px | Thanh điều hướng chuyển sang **trái**. MH-16 dùng lưới 2 cột (768px) hoặc 3 cột (≥ 1100px) |

**Cấu trúc một màn:**
```
┌────────────────────────────┐
│ Đầu trang: ← Tiêu đề    🔊 │  56px (Dễ nhìn 64px), cố định
│ [Dải mất mạng nếu có]      │
│                            │
│ Nội dung cuộn              │
│                            │
│ [Nút hành động chính]      │  cố định đáy khi màn có 1 hành động chính
├────────────────────────────┤
│ Thanh điều hướng dưới      │  64px (Dễ nhìn 76px)
└────────────────────────────┘
```

- Hành động chính luôn ở **nửa dưới màn hình**, trong tầm ngón cái.
- Màn nhiều bước (MH-08, MH-14) ẩn thanh điều hướng dưới, thay bằng thanh bước ở đầu.

---

## 6. Chế độ Dễ nhìn

- Bật bằng class `.de-nhin` trên `<html>`. Mọi cỡ chữ, khoảng cách và chiều cao nút đều lấy từ biến CSS, nên chỉ cần đổi giá trị biến.
- Vai trò Ông bà **tự bật**. Ai cũng có thể bật/tắt trong Hồ sơ (≤ 2 chạm).
- Khi bật:
  - **Mỗi màn tối đa 3 hành động.** Các hành động phụ chuyển vào "Xem thêm".
  - Nội dung quan trọng **tự đọc** khi mở màn (kết quả, câu trả lời của người thân).
  - Nút có cả biểu tượng và chữ, không có nút chỉ có biểu tượng.
  - Thứ tự nút ở Hỏi người thân: **Gọi ngay** trước **Gửi** (QT-27).

---

## 7. Thành phần

### 7.1 Khung và điều hướng
| Thành phần | Mô tả |
|---|---|
| **Đầu trang thương hiệu** `.brandbar` | Chỉ ở trang chủ: **nền `--navy` phẳng**, khối cờ (ô đỏ cờ + sao vàng, là dấu hiệu nhận diện duy nhất), "LÁ CHẮN SỐ" và dòng "Đoàn TNCS Hồ Chí Minh · [xã/phường]" màu `--sky` |
| **Đầu trang màn con** `.appbar` | Nền trắng, nút ← (48px), tiêu đề màn căn trái, nút Nghe đọc bên phải |
| **Thanh điều hướng dưới** `.tabbar` | 4–5 thẻ theo vai trò (sitemap mục 2.1). Icon nét 22px **kèm nhãn chữ**. Thẻ đang chọn: chữ `--brand` đậm và vạch 3px ở trên |
| **Thanh bước** `.steps` | "Bước 2/3", thanh tiến độ, tên bước |
| **Dải mất mạng** `.offline` | Nền `--ink-2`, chữ trắng 14px: "Đang dùng dữ liệu đã tải về lúc 9:30" |

### 7.2 Nhập liệu
| Thành phần | Mô tả |
|---|---|
| **Ô kiểm tra đa năng** `.omni` | Cao 56px (Dễ nhìn 68px), viền 2px `--brand` khi đang nhập. Bên phải ô có nút chữ **Dán** và nút Micro. Dưới ô là **một dòng chữ** cho biết loại đã nhận ra: "Nhận ra: Số điện thoại" / "Đường link" / "Số tài khoản" (không icon, không chip) |
| **Chip ví dụ** `.chip` | Bo tròn, nền `--brand-soft`. Chạm vào là điền sẵn |
| **Ô văn bản tin nhắn** `.textarea` | Tối thiểu 5 dòng, có bộ đếm ký tự và nút Dán |
| **Thẻ lựa chọn** `.pick` | Dùng cho chọn vai trò, kiểu lừa. **Chỉ có chữ**: tên (đậm) và mô tả 1 dòng. Khi chọn: viền 2px `--brand` và nền `--brand-soft` |
| **Công tắc** `.switch` | Ẩn danh, Dễ nhìn. Cao 32px, vùng chạm cả dòng |

### 7.3 Kết quả và phản hồi
| Thành phần | Mô tả |
|---|---|
| **Thẻ kết quả** `.verdict` | Rộng hết cột, viền 2px và dải 6px ở trên theo màu mức, **một** dấu mức 32px cạnh nhãn mức (Bai Jamjuree 28/34px, IN HOA), dữ liệu đã kiểm tra, khối **"Vì sao?"** gồm tối đa 3 dòng **đánh số 1–2–3**, dòng nhắc (QT-10). Có 3 biến thể `.is-danger` `.is-warn` `.is-ok` |
| **Văn bản tô đỏ** `.flagged` | Câu đáng ngờ được gạch chân lượn sóng `--danger` trên nền `--chat-flag`. Chạm vào thì mở bong bóng giải thích |
| **Thước điểm rủi ro** `.risk` | Thanh 0–100 chia 3 vùng màu, có kim chỉ và số lớn |
| **Toast** | Đáy màn, trên thanh điều hướng, tự ẩn sau 3 giây. Dùng cho Đã sao chép, Đã gửi |
| **Bottom sheet xác nhận** | Dùng cho thoát luồng hoặc xóa dữ liệu. Hai nút: **Ở lại** (chính) và **Thoát** (`.btn-danger`) |
| **Trạng thái gửi** `.status` | Một dòng chữ có 3 mốc: Đã gửi · Đã xem · Đã trả lời. Mốc đã qua đậm màu `--brand`, mốc chưa tới màu `--muted`. Không có hiệu ứng nhịp |

### 7.4 Nút
| Class | Dùng cho |
|---|---|
| `.btn-primary` | Hành động chính (nền `--brand`, chữ trắng) |
| `.btn-star` | CTA trên nền xanh (nền `--star`, chữ `--navy-deep`) |
| `.btn-ghost` | Hành động phụ (nền trắng, viền `--line`) |
| `.btn-danger` | Thoát, xóa (nền `--danger-soft`, chữ `--danger-ink`) |
| `.btn-call` | **Gọi ngay** (nền `--ok-ink`, chữ trắng, **chỉ có chữ**) |
| `.btn-xl` | Nút trang chủ Ông bà: cao 92px, **chỉ có chữ**: dòng chính 22px đậm ("Kiểm tra số lạ"), dòng phụ 16px ("Dán hoặc đọc số điện thoại") |

**Nút không có icon.** Ngoại lệ là nút Nghe đọc, nút Micro và nút "Tiếp tục với Google" (mục 1A).

### 7.4A Tài khoản (MH-25, MH-26, MH-27)
| Thành phần | Mô tả |
|---|---|
| **Ô mật khẩu** `.pw` | Như `.input`, bên phải có nút chữ **Hiện / Ẩn** (không dùng icon con mắt) |
| **Ô mã OTP** `.otp` | 6 ô vuông 48px (Dễ nhìn 56px), số Bai Jamjuree 24px, tự nhảy ô, dán được cả 6 số. Dưới ô: đếm ngược "Gửi lại sau 0:45" rồi chuyển thành nút chữ "Gửi lại mã" |
| **reCAPTCHA** | Dùng dạng **vô hình** của Firebase. Chỉ khi Google nghi ngờ mới hiện ô kiểm tra, đặt dưới nút "Gửi mã", không che nội dung. Giữ dòng ghi chú bản quyền reCAPTCHA cỡ 14px ở cuối màn |
| **Cảnh báo OTP** `.hint` | Luôn hiện dưới ô OTP: "Lá Chắn Số không bao giờ gọi điện hay nhắn tin hỏi mã này. Không đưa mã cho ai." |
| **Thước độ mạnh mật khẩu** | Thanh 3 đoạn kèm **chữ** Yếu / Được / Mạnh (màu `--danger-ink` / `--warn-ink` / `--ok-ink`) |
| **Nút Google** `.btn-google` | Nền trắng, viền `#747775`, logo Google 20px, chữ "Tiếp tục với Google", cao bằng `.btn` |
| **Dải phân cách** | Đường mảnh `--line` với chữ "hoặc" ở giữa |
| **Liên kết phụ** | "Quên mật khẩu?" · "Tạo tài khoản mới" · **"Dùng ngay, không cần tài khoản"** (nút `.btn-ghost`, luôn ở cuối màn MH-25) |

### 7.5 Học và thi đua
| Thành phần | Mô tả |
|---|---|
| **Thẻ bài học** `.lesson` | Thanh 60 giây ở trên, chia 4 đoạn (tình huống, dấu hiệu, nên làm, tự kiểm tra). Nội dung lướt ngang theo đoạn |
| **Khung tin nhắn mô phỏng** `.chat` | Bong bóng trái/phải, tên người gửi, giờ. Câu đáng ngờ dùng `.flagged` |
| **Câu hỏi** `.quiz` | Đầu thẻ ghi số câu (3/10), khung tình huống, các đáp án là thẻ cao ≥ 56px. Đúng thì viền `--ok` và tích, sai thì viền `--danger` và giải thích hiện ngay |
| **Chứng nhận** `.cert` | Nền trắng, viền kép xanh Đoàn, **con dấu** `.seal` (tròn đỏ cờ, sao vàng), tên, điểm, ngày, "Lá Chắn Số" |
| **Dòng xếp hạng** `.rank` | Bảng thường: số hạng (Bai Jamjuree), tên chi đoàn, điểm. Không huy hiệu, không cúp. Chi đoàn của mình nền `--brand-soft` và chữ đậm |

### 7.6 Tình nguyện viên và điều phối viên
| Thành phần | Mô tả |
|---|---|
| **Khối "MỚI TUẦN NÀY"** `.alert-new` | Nền `--navy` phẳng, nhãn chữ "MỚI" màu `--star`, tên kiểu lừa (chữ trắng 20px), mức tăng, đối tượng bị nhắm, TNV có nút "Xem tài liệu"; điều phối viên có nút `.btn-star` "Lập buổi tuyên truyền" |
| **Ô số liệu** `.kpi` | Số lớn Bai Jamjuree `--navy`, nhãn, **nguồn hoặc kỳ dữ liệu** dưới con số ("Dữ liệu giả lập · tháng 11/2026") |
| **Biểu đồ thanh ngang** `.bars` | 10 kiểu lừa xếp giảm dần, cột màu `--brand`, **kiểu MỚI màu `--warn`**, có mũi tên ▲▼ và nhãn số trên từng thanh |
| **Thẻ hộ đỡ đầu** `.ward` | Tên cụ, ấp/khu phố, 3 nhãn trạng thái, lần liên lạc gần nhất, nút "Đã thăm / Đã gọi". Hộ có cảnh báo: viền trái 4px `--danger` |
| **Thẻ mã QR** `.qr-card` | QR lớn (≥ 240px) trên nền trắng, mã 6 số cỡ 28px, tên buổi, nút "Chiếu toàn màn hình" |

---

## 8. Biểu tượng

- **Nét SVG**, nét 2px, khung 22px (Dễ nhìn 26px), một màu theo `currentColor`. Không tô màu, không hai tông.
- **Chỉ dùng ở 4 chỗ** trong mục 1A. **Không dùng emoji** trên giao diện.
- **Bộ icon tối đa 14 hình:**
  - Thanh điều hướng (9): nhà, kính lúp, sách, ngôi sao thi đua, người, biểu đồ, danh sách xác minh, loa phát thanh (tuyên truyền), tay đỡ (đỡ đầu).
  - Ba mức kết quả (3): tam giác chấm than, tròn chấm hỏi, tròn dấu tích.
  - Chức năng (2): loa (nghe đọc), micro.
  - Cộng thêm mũi tên lui cho nút Quay lại.
- Mọi hành động khác như chia sẻ, tải xuống, dán, gọi, gửi đều là **nút chữ**.

---

## 9. Giọng nói và câu chữ

| Nguyên tắc | Đúng | Sai |
|---|---|---|
| Lời thường | "Đường link này giả trang ngân hàng" | "URL có dấu hiệu typosquatting" |
| Nói việc cần làm | "Đừng chuyển tiền. Gọi cho con trước." | "Rủi ro cao." |
| Xưng hô theo vai trò | Ông bà: "bà/ông" · Học sinh: "bạn" · Đội: "đội" | Gọi chung "người dùng" |
| Không đổ lỗi | "Kẻ gian rất tinh vi, ai cũng có thể gặp." | "Bạn đã bất cẩn." |
| Trạng thái trống chỉ việc tiếp theo | "Bạn chưa đỡ đầu hộ nào. Mỗi đoàn viên có thể giúp tối đa 5 hộ. [Thêm hộ]" | "Không có dữ liệu." |
| Số liệu ghi nguồn | "120 báo cáo · Dữ liệu giả lập tháng 11/2026" | "120 báo cáo" (không nguồn) |

Câu đọc to ngắn hơn câu hiển thị: một mệnh đề, kết thúc bằng việc cần làm.

---

## 10. Chuyển động

- **Tối thiểu:** chuyển màn không có hiệu ứng (hiện ngay). Chỉ bottom sheet trượt lên 200ms và toast mờ dần.
- Thẻ kết quả hiện ngay, không phóng to, **không rung, không nhấp nháy** ở mức Nguy hiểm, vì dễ làm người cao tuổi hoảng thêm.
- Khi người dùng bật giảm chuyển động (`prefers-reduced-motion`), tắt toàn bộ chuyển động.

---

## 11. Trạng thái bắt buộc phải vẽ (để chấm tiêu chí 2)

| Màn | Trạng thái cần vẽ trong PDF |
|---|---|
| MH-05 Kiểm tra nhanh | Ô trống · bấm khi chưa nhập · sai định dạng · đang kiểm tra · mất mạng · chưa có lịch sử |
| MH-06 Kết quả | 🔴 · 🟡 (có báo cáo) · 🟡 (không có dữ liệu) · 🟢 |
| MH-07 AI tin nhắn | Trống · đang phân tích · có dấu hiệu · không thấy dấu hiệu · AI không phản hồi (chỉ tầng luật) |
| MH-08 Báo cáo | Chưa chọn kiểu (nút Tiếp mờ) · hộp xác nhận thoát |
| MH-11 Hỏi người thân | Chưa cài người thân · đã gửi · đã trả lời · quá 2 phút · mất mạng (chỉ còn Gọi) |
| MH-13/14/15 | Bài đã học · trả lời đúng · trả lời sai · dưới 80 (chứng nhận khóa) · đạt |
| MH-16 Tổng quan | Có kiểu MỚI · tuần yên ổn (không có kiểu mới) |
| MH-21 Đỡ đầu | Chưa có hộ · hộ có cảnh báo · đến hạn thăm hỏi |
| MH-23 Kết quả buổi | Chưa có người tham gia · đang có người tham gia |
| MH-24 Thi đua | Chi đoàn chưa có điểm · có xếp hạng |
| MH-25 Đăng nhập | Ô trống (nút mờ) · sai số hoặc mật khẩu · khóa tạm 15 phút (đếm ngược) · mất mạng · chế độ Dễ nhìn |
| MH-26 Đăng ký | Số đã có tài khoản · OTP sai · OTP hết hạn · đang đếm ngược gửi lại · mật khẩu yếu · bước bổ sung số sau Google |
| MH-27 Quên mật khẩu | Gửi mã · đổi thành công · tài khoản chỉ dùng Google |

---

## 12. Quy ước đặt tên khi xuất PDF

- Mỗi trang PDF là một màn, tiêu đề trang ghi **"MH-xx Tên màn"**, kèm nhãn **"Bắt buộc 1–6"** hoặc **"Điểm cộng 1–3"** hoặc **"Sáng tạo"** nếu có.
- Các trạng thái ghi hậu tố: "MH-05 Kiểm tra nhanh – Mất mạng".
- Ảnh chụp ở khung **390 × 844**. Màn đội TNV chụp thêm khung 1280 × 800.

---

## 13. Kiểm tra trước khi nộp

- [ ] Mở ở 390 × 844: không có thanh cuộn ngang, chữ không tràn.
- [ ] Mọi màn có nút quay lại. Thao tác thoát hoặc xóa có hộp xác nhận.
- [ ] Màu chỉ lấy từ biến. Đỏ cờ chỉ có ở logo và con dấu.
- [ ] Icon chỉ ở 4 chỗ cho phép (mục 1A). Không emoji, không gradient, không biểu tượng lấp lánh cho AI.
- [ ] Tiêu đề dùng Bai Jamjuree, nội dung dùng Be Vietnam Pro, không chữ nào dưới 14px.
- [ ] Ba mức kết quả có đủ màu + biểu tượng + chữ + đọc to.
- [ ] Bật Dễ nhìn: chữ ≥ 20px, nút ≥ 64px, mỗi màn tối đa 3 hành động.
- [ ] Số liệu có ghi nguồn hoặc "dữ liệu giả lập".
- [ ] Console trình duyệt không có lỗi. Web chạy được khi tắt mạng (font và dữ liệu lưu cùng web).
- [ ] Không có thông tin cá nhân thật.

## 14. Giao diện công tác theo quyền

- MH-28: ưu tiên nhiệm vụ sắp tới, giờ/nơi thực hiện, tài liệu và hộ được giao. Một hành động chính theo trạng thái; không mở đầu bằng dashboard quản lý.
- MH-29: ưu tiên việc cần phân công, kết quả chờ duyệt và tiến độ. Bộ lọc đơn vị/địa bàn và kỳ dữ liệu luôn rõ.
- MH-30: hiện trạng thái, người phụ trách, lịch, tài liệu và lịch sử yêu cầu bổ sung. TNV thấy Nhận/Từ chối/Nộp kết quả theo bước; điều phối viên thấy Phân công/Duyệt/Yêu cầu bổ sung.
- Vẽ trạng thái chưa có nhiệm vụ, chờ cấp quyền, không có quyền, đổi lịch/hủy, nộp thất bại giữ nháp, chờ duyệt, cần bổ sung, hoàn thành.
- Phân biệt số liệu học trực tiếp tạm tính với kết quả hoạt động đã duyệt. Không hiện quyền duyệt cảnh báo khi tài khoản chưa được cấp riêng.


## Quyết định phân cấp hoạt động

Nguồn: người dùng xác nhận trong phiên làm việc rằng tình nguyện viên là thành viên chi đoàn trực tiếp đi tuyên truyền; người quản lý hoạt động phải là vai trò cấp cao hơn riêng biệt. Tên “Điều phối viên” là tên đề xuất cho vai trò quản lý này.

- Người cao tuổi và Học sinh là nhóm trải nghiệm; TNV và Điều phối viên là quyền công tác được cấp. Một học sinh có thể đồng thời là TNV. Đổi giao diện không cấp thêm quyền.
- TNV nhận nhiệm vụ, dùng tài liệu đã duyệt, trực tiếp tuyên truyền, hỗ trợ hộ được giao và nộp kết quả.
- Điều phối viên lập kế hoạch, tạo buổi, phân công, duyệt tài liệu và kết quả, quản lý thành viên, tổng hợp báo cáo trong phạm vi được giao.
- Duyệt hoạt động không phải xác nhận lừa đảo. Quyền duyệt cảnh báo cấp riêng cho tài khoản được chỉ định; không mặc định thuộc TNV hoặc mọi điều phối viên.
- Người thân là quan hệ hỗ trợ có sự đồng ý. Người tham gia buổi là ngữ cảnh sử dụng, không cần một loại tài khoản riêng.
