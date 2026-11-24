# ĐẶC TẢ SẢN PHẨM – LÁ CHẮN SỐ (Đề 4)
Vòng sơ loại UX/UI · 24/11/2026 · nộp 15:00 · thư mục `Doi[mã đội]_De4`

## 0. Tóm tắt một dòng
App trên điện thoại (web / Zalo Mini App) giúp người Đồng Nai **kiểm tra số lạ, đường dẫn, tài khoản trong 10 giây trước khi chuyển tiền**, **hỏi người thân bằng 1 chạm**, **học nhận diện lừa đảo 1 phút**, và giúp **đội tình nguyện phường** nắm kiểu lừa mới để tuyên truyền.

## 1. Người dùng và nỗi đau (tiêu chí 1 – 25đ)
| Persona | Bối cảnh tại Đồng Nai | Nỗi đau | Việc chính trong app |
|---|---|---|---|
| **Bà Sáu, 65 tuổi**, Trấn Biên | Dùng Zalo gọi con cháu, chữ nhỏ không đọc được | Nhận cuộc gọi "công an" dọa bắt, hoảng, không biết hỏi ai | Kiểm tra số → Hỏi con gái → SOS |
| **Minh, lớp 12**, THPT Ngô Quyền | Lướt TikTok/Zalo, muốn kiếm tiền thêm | Tin nhắn "việc nhẹ lương cao", ngại hỏi người lớn | Dán tin nhắn → AI chỉ cờ đỏ → báo cáo → học 1 phút → thi |
| **Đội TNV phường** (4–6 đoàn viên) | Đi tuyên truyền tại tổ dân phố, trường học | Không biết kiểu lừa nào đang nổi để nói đúng; poster cũ, không ai đọc | Xem thống kê kiểu lừa mới → tạo bài tuyên truyền 1 chạm |

Dữ liệu mẫu (giả lập theo đề): 10 tình huống phổ biến · **120 báo cáo/tháng · 35% là đường dẫn giả mạo**. Số thật có nguồn (NCA 12/2024: 18.900 tỷ đồng thiệt hại, 1/220 người dùng là nạn nhân) chỉ dùng ở thuyết minh.

## 2. Sơ đồ màn hình
```
M0 Chọn vai ─┬ Ông bà → M0a Cài người thân → HOME-OB: [Kiểm tra] [Hỏi con cháu] [SOS] + Bài học hôm nay
             ├ Học sinh → HOME-HS: ô kiểm tra · Dán tin nhắn · Bài học · Thử thách · Thi đua lớp · Cảnh báo phường
             └ Tình nguyện → M6 Tổng quan phường

M1 Kiểm tra ──→ M1r Kết quả (🟢/🟡/🔴 + Vì sao?) ──→ M3b Hỏi người thân → M3c Màn người con (2 phía)
M1b Dán tin nhắn (AI) ─┘                        ├──→ M2 Báo cáo 3 bước → M2c Xác nhận + Gửi Công an
                                                 └──→ M4 Bài học 1 phút → M5 Thử thách (quiz) → Chứng nhận
SOS: đếm ngược 5 phút + kịch bản nói + Gọi con / 113 / Tôi ổn
M6 Tổng quan → M6b Tạo bài tuyên truyền (poster + tin Zalo + bài học) · Xếp hạng phường · Xuất báo cáo CA
Menu dưới: Ông bà [Trang chủ · Kiểm tra · Học · Tôi] · Học sinh [Trang chủ · Kiểm tra · Học · Thử thách · Tôi] · TNV [Tổng quan · Báo cáo · Tuyên truyền · Tôi]
```

## 3. Đặc tả từng màn (tên màn = tên file ảnh trong PDF)

| Mã | Tên màn | Chức năng hiển thị | Trạng thái trống / lỗi | Điều kiện đề |
|---|---|---|---|---|
| M0 | Chọn vai | 3 thẻ: Ông bà / Học sinh / Đội TNV · ô tên · chọn Ông bà tự bật **Dễ nhìn & đọc to** | Chưa chọn vai → nút Bắt đầu mờ | 3 người dùng |
| M0a | Người thân tin cậy | Thêm tối đa 2 người: tên, SĐT/Zalo, quan hệ; đánh dấu "ưu tiên" | Chưa có ai → hộp trống "Thêm người thân để dùng nút Hỏi con cháu" | "chỉ định trước" |
| HOME-OB | Trang chủ Ông bà | 3 nút cao 92px: Kiểm tra · Hỏi con cháu · SOS; bài học hôm nay; nút loa đọc màn | Chưa cài người thân → nút "Hỏi con cháu" ghi "Chưa cài – bấm để thêm" | Người cao tuổi |
| HOME-HS | Trang chủ Học sinh | Ô kiểm tra · Dán tin nhắn · 2 thẻ (Bài học, Thử thách) · Thi đua lớp 95% · Cảnh báo phường | – | Học sinh |
| M1 | Kiểm tra nhanh | 1 ô nhập tự nhận dạng (chip SĐT/Link/STK) · nút Dán · nút 🎤 · 4 ví dụ bấm nhanh · "Vừa kiểm tra" | Nhập rỗng → thanh vàng "Bạn chưa nhập gì"; mất mạng → dải xám "dùng danh sách đã tải về"; chưa có lịch sử → hộp trống | M1 |
| M1r | Kết quả kiểm tra | Thẻ toàn màn 🟢 AN TOÀN / 🟡 NGHI NGỜ / 🔴 NGUY HIỂM (màu + icon + chữ) · **Vì sao?** 3 dòng (cộng đồng · danh sách Công an · dấu hiệu nội dung) · 3 nút: Hỏi người thân / Báo cáo / Không chuyển tiền · "Học 1 phút về kiểu này" · loa | Không có dữ liệu → "Chưa có thông tin, vẫn cẩn thận" (mức Nghi ngờ) | "kèm lý do dễ hiểu" |
| M1b | Phân tích tin nhắn | Textarea · Phân tích → tô đỏ câu đáng ngờ · điểm nguy hiểm /100 · kiểu lừa · nút Báo cáo / Hỏi người thân · ghi chú 2 tầng (luật từ khóa + AI) | Dán rỗng → báo; không thấy dấu hiệu → "Chưa thấy dấu hiệu, vẫn không chuyển tiền cho người lạ" | Điểm cộng AI |
| M2 | Báo cáo lừa đảo | B1 chọn 1/10 kiểu · B2 bằng chứng (điền sẵn từ M1, dán ảnh, mô tả) · B3 phường + ẩn danh · thanh bước | Chưa chọn kiểu → nút Tiếp mờ + nhắc | M2 |
| M2c | Đã tiếp nhận | Mã BC-2026-0121 · "Đã chuyển đội TNV phường Trấn Biên" · **Gửi Công an** (Zalo OA / 113, nội dung soạn sẵn) · "Bạn là báo cáo thứ 121 tháng này" | – | Điểm cộng kênh CA |
| M3b | Hỏi người thân | Thẻ người nhận ưu tiên · xem trước tin soạn sẵn + kết quả · nút to "Gửi cho Lan" · trạng thái Đã gửi → Đã xem → Trả lời | Chưa có người thân → chuyển M0a | M3 |
| M3c | Màn người con | Cảnh báo đỏ "Mẹ vừa gặp cuộc gọi NGUY HIỂM" · nội dung · **Gọi mẹ ngay** / **Đã kiểm tra, an toàn** | – | Vượt đề |
| SOS | Tôi đang bị ép | Nền đỏ · đếm ngược 5:00 · 3 câu nên nói · Gọi con / 113 / Tôi ổn | – | Vượt đề |
| M4 | Bài học 1 phút | 10 thẻ tình huống · bài: thanh 60 giây · 3 cờ đỏ · "Nên làm" · nghe đọc · "Làm bài kiểm tra" | – | M4 |
| M5 | Thử thách | 5 kịch bản chat nhập vai · đáp án xáo trộn · điểm /100 · chứng nhận · chia sẻ | Chưa đủ 5 → chứng nhận khóa có hướng dẫn | M5 "có chấm điểm" |
| M6 | Tổng quan phường | KPI 120 báo cáo · 35% link giả · 9 kiểu mới · biểu đồ 10 kiểu · **Mới tuần này tại Trấn Biên** · bản đồ nóng · xếp hạng phường · Tạo bài tuyên truyền · Xuất báo cáo CA | Chưa có báo cáo mới tuần này → hộp trống "Tuần yên ổn" | M6 |
| M6b | Tạo bài tuyên truyền | Chọn kiểu lừa → poster + tin Zalo + bài học tự sinh → Gửi cảnh báo phường | – | Vòng khép kín |
| Tôi | Hồ sơ | Điểm, chứng nhận, người thân, công tắc Dễ nhìn & đọc to, chơi lại | – | – |

## 4. Luồng chính (nộp trong prototype – "trọn 01 luồng chính")
**Luồng Ông bà (chính):** M0 chọn Ông bà → M0a thêm Lan (con gái) → HOME-OB → Kiểm tra → dán số 0909… → 🔴 NGUY HIỂM + 3 lý do → Hỏi con cháu → Đã gửi → (mô phỏng) Lan trả lời "Đừng chuyển, con gọi mẹ ngay". **4 chạm từ trang chủ đến khi có người thân vào cuộc.**
Luồng phụ: Học sinh (dán tin nhắn → AI → báo cáo → học → thi) và TNV (tổng quan → tạo bài tuyên truyền).

## 5. Điểm cộng
| | Thể hiện | Khả thi |
|---|---|---|
| AI phân tích tin nhắn | M1b: tô đỏ, điểm /100, kiểu lừa | Tầng 1 luật từ khóa + danh sách đen (chạy ngay); tầng 2 gọi AI khi có kinh phí |
| Giọng nói người cao tuổi | Chế độ Dễ nhìn (chữ ×1.25, nút ≥60px); nút loa đọc kết quả/bài học; mic nhập | Web Speech API có sẵn trong trình duyệt/Zalo |
| Kênh Công an | Nút "Gửi Công an" mở Zalo OA Công an / 113 / 1022 với nội dung soạn sẵn | Không cần API; CA Đồng Nai có 182 tài khoản Zalo tiếp nhận tin báo (VietTimes) |

## 6. Khả thi – MVP 24h (tiêu chí 4 – 25đ)
- **Làm trong 24h:** M1 + M1r (luật từ khóa, danh sách đen mẫu), M2, M3 (gửi Zalo/SMS), M4 (10 bài tĩnh), M5 (quiz), M6 (thống kê từ bảng báo cáo), chế độ Dễ nhìn + đọc to.
- **Công nghệ:** web app 1 trang (HTML/CSS/JS hoặc React) đóng gói thành **Zalo Mini App** (không cần cài, hợp người cao tuổi); backend nhẹ (Node/Supabase) lưu báo cáo + danh sách đen; Web Speech API; biểu đồ đơn giản.
- **Triển khai thật:** phường tạo mã QR dán tủ lạnh / phát ở tổ dân phố; trường đưa vào sinh hoạt lớp; đội TNV cập nhật danh sách đen hàng tuần từ báo cáo + Công an phường.
- **Lộ trình:** tuần 1 web + Zalo Mini App · tháng 1–3 phối hợp Công an phường cập nhật danh sách · sau đó thêm AI.

## 7. Sản phẩm nộp & phân công
| Sản phẩm | Nội dung | Ai làm |
|---|---|---|
| PDF thiết kế | 1 trang/màn, tên màn theo mã M0–M6, xuất từ ảnh prototype | Claude dựng + 1 bạn kiểm tra tên màn |
| Prototype | `index.html` mở bằng Chrome, deep link `?role=ob&screen=…` | Claude |
| Thuyết minh ≤3 trang | (a) vấn đề & người dùng (b) luồng chính (c) MVP 24h (d) kiến trúc (e) **công cụ AI đã dùng** | Claude soạn, đội trưởng duyệt |
| Kiểm thử | 1 người lớn tuổi + 1 học sinh dùng thử 5 phút, ghi 2 câu nói | 2 bạn gọi video về nhà |
| Trình chiếu | Luyện demo luồng Ông bà trong 90 giây | Đội trưởng |

**Nguyên tắc:** chữ nội dung ≥ 15px (Dễ nhìn ≥ 19px), nút ≥ 48px, màu + icon + chữ cho 3 mức kết quả, mọi màn có nút quay lại, thao tác mất dữ liệu có xác nhận, không dùng thông tin cá nhân thật.
