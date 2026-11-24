# SITEMAP VÀ LUỒNG MÀN HÌNH – LÁ CHẮN SỐ

> Phiên bản 1.0 · 24/11/2026 · Nền tảng: ứng dụng web, giao diện ưu tiên điện thoại
> Đi kèm: [01_dac_ta_san_pham.md](01_dac_ta_san_pham.md) · [02_dac_ta_chuc_nang.md](02_dac_ta_chuc_nang.md)
> Mã màn (MH-xx) và mã chức năng (CN-xx) dùng thống nhất với hai tài liệu trên.

---

## 1. Sitemap tổng thể

```mermaid
flowchart TD
    ROOT["laChanSo (web)"] --> MH01["MH-01 Chọn vai trò"]
    MH01 --> MH02["MH-02 Cài người thân tin cậy"]
    MH02 --> MH02a["MH-02a Gợi ý Thêm vào màn hình chính (lớp phủ)"]

    MH02a --> OB["KHU ÔNG BÀ"]
    MH02a --> HS["KHU HỌC SINH"]
    MH01 --> TNV["KHU ĐỘI TNV"]

    subgraph CHUNG["Màn dùng chung"]
        MH05["MH-05 Kiểm tra nhanh"] --> MH06["MH-06 Kết quả kiểm tra"]
        MH07["MH-07 Phân tích tin nhắn AI"]
        MH08["MH-08 Báo cáo lừa đảo (3 bước)"] --> MH09["MH-09 Đã tiếp nhận + Gửi Công an"]
        MH10["MH-10 Khẩn cấp: Tôi đã chuyển tiền"]
        MH11["MH-11 Hỏi người thân"]
        MH13["MH-13 Bài học 1 phút"]
        MH14["MH-14 Bài kiểm tra nhận diện"] --> MH15["MH-15 Kết quả + Chứng nhận"]
        MH20["MH-20 Hồ sơ và cài đặt"]
    end

    OB --> MH03["MH-03 Trang chủ Ông bà"]
    MH03 --> MH19["MH-19 Trợ lý giọng nói"]
    HS --> MH04["MH-04 Trang chủ Học sinh"]
    TNV --> MH16["MH-16 Tổng quan phường (thống kê)"]
    MH16 --> MH17["MH-17 Hàng chờ xác minh"]
    MH16 --> MH18["MH-18 Tạo bài tuyên truyền"]

    MH03 --> CHUNG
    MH04 --> CHUNG

    NT["Người thân (mở từ thông báo / link)"] --> MH12["MH-12 Phía người thân nhận cảnh báo"]
```

### 1.1 Cây trang và đường dẫn web

Mỗi màn có đường dẫn riêng. Người dùng mở thẳng được từ link hoặc thông báo, nút Quay lại của trình duyệt hoạt động đúng, và prototype có thể đi thẳng đến từng màn khi trình diễn.

```
/                         → chuyển theo vai trò đã lưu (chưa có thì /bat-dau)
├── /bat-dau              MH-01 Chọn vai trò
├── /nguoi-than           MH-02 Cài người thân tin cậy   (+ lớp phủ MH-02a)
│
├── /ong-ba               MH-03 Trang chủ Ông bà
│   └── /ong-ba/tro-ly    MH-19 Trợ lý giọng nói
├── /hoc-sinh             MH-04 Trang chủ Học sinh
│
├── /kiem-tra             MH-05 Kiểm tra nhanh     ?q=… (điền sẵn)
│   └── /kiem-tra/ket-qua MH-06 Kết quả kiểm tra   ?q=…
├── /tin-nhan             MH-07 Phân tích tin nhắn AI
├── /bao-cao              MH-08 Báo cáo (bước 1→3) ?tu=ket-qua (điền sẵn)
│   ├── /bao-cao/da-nhan  MH-09 Đã tiếp nhận + Gửi Công an
│   └── /khan-cap         MH-10 Tôi đã chuyển tiền
├── /hoi-nguoi-than       MH-11 Hỏi người thân (gửi + theo dõi)
├── /canh-bao/:ma         MH-12 Phía người thân (mở từ thông báo / SMS / Zalo)
│
├── /hoc                  MH-13 Thư viện 10 bài
│   └── /hoc/:tinhHuong   MH-13 Bài học 1 phút (T01–T10)
├── /thu-thach            MH-14 Bài kiểm tra nhận diện
│   └── /thu-thach/ket-qua MH-15 Kết quả + Chứng nhận
│
├── /doi                  MH-16 Tổng quan phường (thống kê kiểu lừa mới)
│   ├── /doi/xac-minh     MH-17 Hàng chờ xác minh
│   ├── /doi/tuyen-truyen MH-18 Tạo bài tuyên truyền
│   └── /doi/xuat-bao-cao (hộp thoại trong MH-16)
│
└── /toi                  MH-20 Hồ sơ và cài đặt
```

---

## 2. Điều hướng theo vai trò

### 2.1 Thanh điều hướng dưới cùng (điện thoại)

| Vai trò | Thẻ 1 | Thẻ 2 | Thẻ 3 | Thẻ 4 | Thẻ 5 |
|---|---|---|---|---|---|
| **Ông bà** (4 thẻ, cao 72px, có chữ) | 🏠 Trang chủ | 🔍 Kiểm tra | 📖 Học | 👤 Tôi | – |
| **Học sinh** (5 thẻ) | 🏠 Trang chủ | 🔍 Kiểm tra | 📖 Học | 🏆 Thử thách | 👤 Tôi |
| **Đội TNV** (4 thẻ) | 📊 Tổng quan | ✅ Xác minh | 📣 Tuyên truyền | 👤 Tôi | – |

- Thẻ **Kiểm tra** của Học sinh có hai phần chuyển qua lại: **[Số / Link / STK]** (MH-05) và **[Dán tin nhắn]** (MH-07).
- Với Ông bà, MH-07 không có thẻ riêng. App tự chuyển sang khi người dùng dán một đoạn văn dài (QT-06), hoặc khi bấm "Kể bằng giọng nói" (MH-19).
- Đội TNV vẫn dùng được các công cụ của người dân qua mục **Tôi → Công cụ người dân**.
- **Trên máy tính bảng và máy tính (≥ 768px)**, khu Đội TNV thay thanh dưới bằng **thanh bên trái**. MH-16 hiển thị 2–3 cột.

### 2.2 Thành phần có ở mọi màn

| Thành phần | Vị trí | Ghi chú |
|---|---|---|
| Nút Quay lại | Góc trên trái | Đồng bộ với nút Quay lại của trình duyệt |
| Nút 🔊 Nghe đọc | Góc trên phải | Có trên MH-06, MH-07, MH-11, MH-13, MH-14 |
| Dải mất mạng | Dưới thanh tiêu đề | "Đang dùng dữ liệu đã tải về lúc [giờ]" |
| Thanh điều hướng dưới | Đáy màn | Ẩn trong các luồng nhiều bước (MH-08, MH-14) để tập trung |

---

## 3. Luồng khởi đầu (F0)

```mermaid
flowchart LR
    A["Mở link / quét QR"] --> B{"Đã có vai trò?"}
    B -- "Có" --> H["Trang chủ theo vai trò"]
    B -- "Chưa" --> C["MH-01 Chọn vai trò + xã/phường"]
    C -- "Ông bà (bật Dễ nhìn)" --> D["MH-02 Cài người thân"]
    C -- "Học sinh" --> D
    C -- "Đội TNV (nhập mã đội)" --> T["MH-16 Tổng quan phường"]
    D -- "Lưu / Để sau" --> E["MH-02a Gợi ý Thêm vào màn hình chính"]
    E -- "Thêm ngay / Để sau" --> H
```

| Bước | Màn | Người dùng làm | Hệ thống phản hồi |
|---|---|---|---|
| 1 | MH-01 | Chọn thẻ vai trò, chọn xã/phường | Ông bà: tự bật Dễ nhìn và đọc lời chào |
| 2 | MH-02 | Thêm người thân (tên, số, quan hệ) hoặc "Để sau" | Người đầu tiên là người ưu tiên |
| 3 | MH-02a | "Thêm ngay" (xem hướng dẫn theo trình duyệt) hoặc "Để sau" | Không chặn, nhắc lại tối đa 2 lần |
| 4 | Trang chủ | – | Hiện "Bài học hôm nay" |

**Kiểm tra mà không cần khởi đầu (QT-01):** người mở thẳng link `/kiem-tra` được kiểm tra ngay. App chỉ hỏi vai trò khi người đó cần Hỏi người thân hoặc Báo cáo không ẩn danh.

---

> **Phạm vi dựng (đã chốt):** mọi luồng F0–F8 được làm hoàn chỉnh ngang nhau. Thứ tự trình diễn do đội quyết định sau khi web dựng xong.

## 4. Luồng Ông bà: kiểm tra số lạ và hỏi người thân (F1)

> Đi qua Bắt buộc 1 và Bắt buộc 3, cùng Điểm cộng 2.

```mermaid
flowchart TD
    S["Nhận cuộc gọi lạ, bị dọa → cúp máy"] --> H["MH-03 Trang chủ Ông bà"]
    H -- "Chạm: KIỂM TRA SỐ / LINK" --> K["MH-05 Kiểm tra nhanh"]
    H -- "Chạm: HỎI NGƯỜI THÂN" --> N
    H -- "Chạm: BẤM VÀ KỂ" --> V["MH-19 Trợ lý giọng nói"]
    K -- "Dán / nói số → Kiểm tra" --> R{"MH-06 Kết quả"}
    V -- "Nhận ra kiểu lừa" --> R
    R -- "🔴 Nguy hiểm" --> N["MH-11 Hỏi người thân"]
    R -- "🟡 Nghi ngờ" --> N
    R -- "🟢 An toàn" --> X["Xong (kèm nhắc: bị giục chuyển tiền thì dừng)"]
    R -- "Học 1 phút về kiểu này" --> L["MH-13 Bài học"]
    R -- "Báo cáo" --> B["MH-08 Báo cáo"]
    R -- "Tôi đã chuyển tiền" --> E["MH-10 Khẩn cấp"]
    N -- "GỌI [tên] NGAY" --> C["Trình quay số"]
    N -- "GỬI CHO [tên]" --> W{"Người thân có nhận thông báo?"}
    W -- "Có" --> P["Thông báo đẩy → MH-12"]
    W -- "Không" --> Z["Mở SMS / Zalo, nội dung soạn sẵn"]
    P --> T["Trạng thái: Đã gửi → Đã xem → Đã trả lời"]
    T -- "2 phút không phản hồi" --> T2["Gợi ý gọi người thứ hai"]
    T -- "Người thân trả lời" --> A["Hiện to + đọc to: 'Đừng chuyển, con gọi ngay'"]
```

| # | Màn | Chạm | Nội dung chính trên màn |
|---|---|---|---|
| 1 | MH-03 | 1 | 3 nút cao 92px: **Kiểm tra số / link** · **Hỏi người thân** · **Bấm và kể** · thẻ "Bài học hôm nay" |
| 2 | MH-05 | 1–2 | Nút **Dán** to hoặc 🎤 nói số → **Kiểm tra** |
| 3 | MH-06 | – | Thẻ 🔴 **NGUY HIỂM** toàn chiều ngang · 3 lý do · **tự đọc to** · nút chính **HỎI NGƯỜI THÂN NGAY** |
| 4 | MH-11 | 1 | **Gọi Lan ngay** (đứng trước, QT-27) · **Gửi cho Lan** · xem trước tin soạn sẵn |
| 5 | MH-11 | – | Trạng thái gửi · câu trả lời của người thân hiện to và được đọc to |

**Tổng: từ kết quả đến khi người thân vào cuộc là 2 chạm (Gọi hoặc Gửi bằng thông báo), hoặc 3 chạm khi gửi qua SMS/Zalo.**

---

## 5. Luồng Học sinh: tin nhắn "việc nhẹ lương cao" (F2)

> Đi qua Điểm cộng 1 (AI), Bắt buộc 2, Bắt buộc 4, Bắt buộc 5.

```mermaid
flowchart TD
    S["Nhận tin 'việc nhẹ lương cao'"] --> H["MH-04 Trang chủ Học sinh"]
    H -- "Dán tin nhắn" --> AI["MH-07 Phân tích tin nhắn AI"]
    AI --> R["Tô đỏ câu đáng ngờ · điểm rủi ro /100 · kiểu: T03 Cộng tác viên đặt đơn"]
    R -- "Báo cáo (điền sẵn)" --> B1["MH-08 Bước 1: Kiểu lừa (đã chọn T03)"]
    B1 --> B2["Bước 2: Bằng chứng (tin nhắn + link đã điền)"]
    B2 --> B3["Bước 3: Xã/phường · Đã chuyển tiền? · Ẩn danh"]
    B3 -- "Chưa chuyển" --> OK["MH-09 Đã tiếp nhận · mã BC-2026-0121"]
    B3 -- "Đã chuyển" --> E["MH-10 Khẩn cấp"]
    OK -- "Học 1 phút về kiểu này" --> L["MH-13 Bài học T03 (60 giây)"]
    L -- "Làm bài kiểm tra" --> Q["MH-14 Bài kiểm tra (10 câu)"]
    Q --> KQ["MH-15 Điểm /100 · kiểu còn yếu · Chứng nhận nếu ≥ 80"]
    KQ -- "Chia sẻ" --> SH["Bảng chia sẻ của điện thoại"]
    R -- "Hỏi người thân (thầy cô / anh chị Đoàn)" --> N["MH-11 Hỏi người thân"]
```

| # | Màn | Điểm nhấn thiết kế |
|---|---|---|
| 1 | MH-04 | Ô kiểm tra ở trên cùng · nút **Dán tin nhắn** · thẻ Thử thách · thi đua lớp · cảnh báo xã/phường |
| 2 | MH-07 | Câu đáng ngờ tô đỏ, chạm vào để xem giải thích · ghi chú "Đã che số tài khoản và họ tên trước khi phân tích" |
| 3 | MH-08 | Thanh bước 1/3–3/3 · dữ liệu điền sẵn · ẩn thanh điều hướng dưới |
| 4 | MH-09 | Mã báo cáo · trạng thái theo dõi · "Bạn là người thứ 121 tháng này" |
| 5 | MH-13 → MH-14 → MH-15 | Học đúng kiểu vừa gặp → kiểm tra → chứng nhận |

---

## 6. Luồng Báo cáo chi tiết (F3) – Bắt buộc 2

```mermaid
flowchart LR
    IN["Vào từ: MH-06 · MH-07 · Trang chủ · thẻ Kiểm tra"] --> S1["Bước 1: Chọn kiểu lừa (10 thẻ + Không rõ)"]
    S1 -- "Chưa chọn → nút Tiếp mờ" --> S1
    S1 --> S2["Bước 2: Kênh · số/link/STK · ảnh · mô tả / ghi âm"]
    S2 --> S3["Bước 3: Xã/phường · thời điểm · Đã chuyển tiền? · Ẩn danh"]
    S3 -- "Chưa" --> D["MH-09 Đã tiếp nhận"]
    S3 -- "Đã chuyển" --> K["MH-10 Khẩn cấp: 1. Gọi ngân hàng 2. Gọi 113 3. Báo người thân"]
    K --> D
    D -- "Gửi Công an" --> CA["Chọn kênh: 113 / kênh chính thức · nội dung được chép sẵn"]
    D -- "Hỏi người thân" --> N["MH-11"]
    D -- "Về trang chủ" --> H["Trang chủ"]
    S1 & S2 & S3 -- "Thoát" --> X{"Bỏ báo cáo này?"}
```

**Sau khi gửi, báo cáo đi tiếp như sau:** Đã nhận → xuất hiện trong **MH-17 Hàng chờ xác minh** của đội TNV xã/phường → Xác nhận / Bác bỏ / Chuyển Công an → trạng thái được cập nhật ở **MH-20 → Báo cáo của tôi**.

---

## 7. Luồng Hỏi người thân, hai phía (F4) – Bắt buộc 3

```mermaid
sequenceDiagram
    participant OB as Ông bà (MH-11)
    participant HT as Hệ thống
    participant NT as Người thân (MH-12)
    OB->>HT: Chạm "Gửi cho Lan" (kèm kết quả 🔴)
    HT->>NT: Thông báo đẩy / SMS / Zalo soạn sẵn
    HT-->>OB: Trạng thái "Đã gửi"
    NT->>HT: Mở /canh-bao/:ma
    HT-->>OB: "Đã xem"
    alt Người thân trả lời trong 2 phút
        NT->>HT: Chạm "Đừng chuyển tiền, chờ con"
        HT-->>OB: Hiện to + đọc to câu trả lời
        NT->>OB: Chạm "Con gọi ngay" → cuộc gọi
    else Quá 2 phút không phản hồi
        HT-->>OB: Gợi ý "Gọi Hùng (người thứ hai)" / "Gọi Lan"
    end
```

| Trường hợp | Xử lý |
|---|---|
| Chưa cài người thân | MH-11 → MH-02 → quay lại MH-11 đúng bước đang làm (QT-15) |
| Người thân chưa thêm web vào màn hình chính | Dùng SMS/Zalo. Trạng thái chỉ hiện "Đã mở tin nhắn", không theo dõi được Đã xem |
| Không có mạng | Ẩn "Gửi". Chỉ còn **Gọi ngay** |

---

## 8. Luồng Học và Kiểm tra (F5) – Bắt buộc 4, 5

```mermaid
flowchart LR
    V["Vào: thẻ Học · Bài học hôm nay · từ MH-06/MH-07/MH-09"] --> LIB["MH-13 Thư viện 10 bài (lọc Ông bà / Học sinh)"]
    LIB --> LS["Bài 60 giây: Tình huống 15s → 3 dấu hiệu 20s → Nên làm 15s → Tự kiểm tra 10s"]
    LS -- "Bài tiếp theo" --> LS
    LS -- "Làm bài kiểm tra" --> Q["MH-14 Bài kiểm tra: Thật hay lừa? · Chạm vào dấu hiệu · Bạn sẽ làm gì?"]
    Q -- "Giải thích sau mỗi câu" --> Q
    Q --> R["MH-15 Điểm /100 · kiểu còn yếu"]
    R -- "≥ 80" --> C["Chứng nhận Lá Chắn Số → Chia sẻ"]
    R -- "< 80" --> W["Gợi ý bài học cho kiểu còn yếu → MH-13"]
    R -- "Làm lại" --> Q
```

---

## 9. Luồng Đội tình nguyện (F6) – Bắt buộc 6

```mermaid
flowchart TD
    O["MH-16 Tổng quan phường"] --> NEW["Khối MỚI TUẦN NÀY: kiểu lừa · mức tăng · đối tượng bị nhắm"]
    O --> KPI["120 báo cáo · 42 link giả (35%) · số chờ xác minh · số người đạt chứng nhận"]
    O --> CH["Biểu đồ 10 kiểu ▲▼ · cơ cấu kênh · xu hướng tuần · bộ lọc"]
    NEW -- "Tạo bài tuyên truyền" --> TT["MH-18 AI soạn poster + tin Zalo + kịch bản 2 phút"]
    TT -- "Sửa → Tải về / Chia sẻ" --> SH["Nhóm Zalo tổ dân phố · in poster"]
    KPI -- "Chờ xác minh" --> XM["MH-17 Hàng chờ (gom theo số/link/STK)"]
    XM -- "Xác nhận" --> DS["Vào danh sách cảnh báo → MH-06 của người dân báo 🔴"]
    XM -- "Bác bỏ (ghi lý do)" --> BB["Cập nhật trạng thái cho người báo"]
    XM -- "Chuyển Công an" --> CA["Hồ sơ tin báo → kênh chính thức"]
    O -- "Xuất báo cáo" --> PDF["PDF tuần/tháng: Đoàn cấp trên / Công an xã/phường"]
    TT -- "Chế độ trình chiếu" --> PJ["MH-13 toàn màn hình trong buổi tuyên truyền"]
```

**Vòng khép kín giữa các vai trò:**

```
Người dân báo cáo (MH-08) → Đội TNV xác minh (MH-17) → Danh sách cảnh báo
      ↑                                                        ↓
Người dân học (MH-13) ← Tuyên truyền (MH-18) ← Kiểu mới (MH-16)   Kết quả 🔴 cho người kiểm tra sau (MH-06)
```

---

## 10. Luồng Khẩn cấp: đã chuyển tiền (F7)

```mermaid
flowchart LR
    IN["Vào từ: MH-06 'Tôi đã chuyển tiền' · MH-08 bước 3 · Trang chủ"] --> E["MH-10 nền đỏ, 3 việc theo thứ tự"]
    E --> B1["1. Gọi tổng đài ngân hàng (chọn ngân hàng → gọi)"]
    E --> B2["2. Gọi 113 / kênh Công an (hồ sơ chép sẵn)"]
    E --> B3["3. Báo người thân (MH-11)"]
    B1 & B2 & B3 --> D["Hoàn tất báo cáo → MH-09"]
```

Từ MH-06 đến nút gọi ngân hàng: **2 chạm**.

---

## 11. Luồng Trợ lý giọng nói (F8) – Điểm cộng 2

```mermaid
flowchart LR
    H["MH-03: chạm BẤM VÀ KỂ"] --> M{"Máy hỗ trợ nhận giọng nói?"}
    M -- "Không" --> K["Chuyển sang MH-05, chỉ có 🔊 đọc to"]
    M -- "Có" --> L["MH-19 Đang nghe… (sóng âm lớn)"]
    L --> T["Chuyển lời nói thành chữ, hiện lên để xác nhận"]
    T --> AI["Phân tích như MH-07"]
    AI --> S["Đọc to: 'Công an không bao giờ gọi đòi chuyển tiền. Bà đừng chuyển.'"]
    S --> N["Nút to: GỌI LAN NGAY · GỬI CHO LAN"]
```

---

## 12. Ma trận màn hình

| Mã | Màn | Đường dẫn | Vào từ | Đi tới | Luồng |
|---|---|---|---|---|---|
| MH-01 | Chọn vai trò | /bat-dau | Lần đầu mở · Tôi → Đổi vai trò | MH-02 · MH-16 | F0 |
| MH-02 | Cài người thân | /nguoi-than | MH-01 · MH-11 · MH-20 | MH-02a · quay lại MH-11 | F0, F4 |
| MH-02a | Gợi ý Thêm vào MH chính | lớp phủ | MH-02 | Trang chủ | F0 |
| MH-03 | Trang chủ Ông bà | /ong-ba | F0 · thẻ Trang chủ | MH-05 · MH-11 · MH-19 · MH-13 | F1 |
| MH-04 | Trang chủ Học sinh | /hoc-sinh | F0 · thẻ Trang chủ | MH-05 · MH-07 · MH-13 · MH-14 | F2 |
| **MH-05** | **Kiểm tra nhanh** | /kiem-tra | Trang chủ · thẻ Kiểm tra · link ngoài | MH-06 · MH-07 (văn bản dài) | F1 |
| **MH-06** | **Kết quả kiểm tra** | /kiem-tra/ket-qua | MH-05 · MH-19 | MH-11 · MH-08 · MH-13 · MH-10 | F1 |
| MH-07 | Phân tích tin nhắn AI | /tin-nhan | MH-04 · MH-05 · MH-19 | MH-11 · MH-08 · MH-13 | F2 |
| **MH-08** | **Báo cáo lừa đảo** | /bao-cao | MH-06 · MH-07 · Trang chủ | MH-09 · MH-10 | F3 |
| MH-09 | Đã tiếp nhận + Gửi Công an | /bao-cao/da-nhan | MH-08 · MH-10 | MH-11 · MH-13 · kênh Công an | F3 |
| MH-10 | Khẩn cấp | /khan-cap | MH-06 · MH-08 | Quay số · MH-11 · MH-09 | F7 |
| **MH-11** | **Hỏi người thân** | /hoi-nguoi-than | MH-03 · MH-06 · MH-07 · MH-09 · MH-10 | Quay số · SMS/Zalo · MH-02 | F1, F4 |
| MH-12 | Phía người thân | /canh-bao/:ma | Thông báo · SMS · Zalo | Quay số · trả lời nhanh | F4 |
| **MH-13** | **Bài học 1 phút** | /hoc, /hoc/:id | Thẻ Học · MH-06 · MH-07 · MH-09 · MH-15 | MH-14 · bài tiếp theo | F5 |
| **MH-14** | **Bài kiểm tra nhận diện** | /thu-thach | MH-13 · MH-04 · thẻ Thử thách | MH-15 | F5 |
| MH-15 | Kết quả + Chứng nhận | /thu-thach/ket-qua | MH-14 | MH-13 · làm lại · chia sẻ | F5 |
| **MH-16** | **Tổng quan phường** | /doi | F0 · thẻ Tổng quan | MH-17 · MH-18 · xuất PDF | F6 |
| MH-17 | Hàng chờ xác minh | /doi/xac-minh | MH-16 · thẻ Xác minh | Kênh Công an | F6 |
| MH-18 | Tạo bài tuyên truyền | /doi/tuyen-truyen | MH-16 · thẻ Tuyên truyền | Chia sẻ · trình chiếu MH-13 | F6 |
| MH-19 | Trợ lý giọng nói | /ong-ba/tro-ly | MH-03 | MH-06 · MH-11 | F8 |
| MH-20 | Hồ sơ và cài đặt | /toi | Thẻ Tôi | MH-01 · MH-02 · báo cáo của tôi | – |

---

## 13. Kiểm tra đủ yêu cầu của đề

| Yêu cầu | Màn | Luồng | Số chạm từ trang chủ |
|---|---|---|---|
| Kiểm tra nhanh, 3 mức kèm lý do | MH-05, MH-06 | F1 | 2–3 (mở → dán → kiểm tra) |
| Báo cáo một trường hợp | MH-08, MH-09 | F2, F3 | 4–5 (3 bước + gửi) |
| Nút "Hỏi người thân" | MH-11 | F1, F4 | **2** (Hỏi người thân → Gọi/Gửi) |
| Bài học 01 phút | MH-13 | F5 | 1–2 |
| Bài kiểm tra có chấm điểm | MH-14, MH-15 | F5 | 1–2 |
| Màn đội TNV: thống kê kiểu lừa mới | MH-16 | F6 | 0 (là trang chủ của đội) |
| Điểm cộng AI | MH-07, MH-18 | F2, F6 | 1–2 |
| Điểm cộng giọng nói | MH-19, 🔊 mọi màn | F1, F8 | 1 |
| Điểm cộng kênh Công an | MH-09, MH-10, MH-17 | F3, F6, F7 | – |

---

## 14. Quyết định và điểm còn mở

**Đã chốt:** mọi luồng làm hoàn chỉnh, thứ tự trình diễn do đội tự quyết · người thân mẫu là **Lan** (con gái, ưu tiên) và **Hùng** (con trai) · chờ 2 phút rồi gợi ý người thứ hai · các ngưỡng nghiệp vụ như mục 16 của đặc tả chức năng.

**Còn mở:** đường dẫn web (mục 1.1) là đề xuất cho prototype, có thể đổi khi dựng.
