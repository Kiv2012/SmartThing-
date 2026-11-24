# ĐẶC TẢ SẢN PHẨM – LÁ CHẮN SỐ

> Đề 4 – An toàn thông tin · Phòng, chống lừa đảo · Kỹ năng số
> Phiên bản 1.0 · 24/11/2026 · Tài liệu đi kèm: [02_dac_ta_chuc_nang.md](02_dac_ta_chuc_nang.md)

---

## 1. Tóm tắt

**Lá Chắn Số** là **ứng dụng web có giao diện tối ưu cho điện thoại**: mở bằng trình duyệt qua đường link hoặc mã QR, không cần cài từ kho ứng dụng. Sản phẩm **chen vào giữa lúc người dân bị dụ và lúc bấm chuyển tiền**: người dùng kiểm tra số điện thoại, đường link hoặc số tài khoản trong vài giây, rồi **hỏi người thân bằng một chạm**. Sau đó app dạy họ nhận ra đúng kiểu lừa vừa gặp trong 1 phút. Mỗi báo cáo của người dân được chuyển cho **đội thanh niên tình nguyện xã/phường**, để đội biết tuần này cần tuyên truyền gì, ở đâu và cho ai.

**Hai mục tiêu:**
1. **Chặn giao dịch hôm nay:** kiểm tra nhanh, gọi người thân vào cuộc, chuyển tin báo cho Công an.
2. **Miễn dịch ngày mai:** học theo tình huống, kiểm tra khả năng nhận diện, tuyên truyền theo số liệu thật của địa phương.

Ba vế của tên đề ứng với ba khối của sản phẩm:

| Vế của đề | Khối sản phẩm |
|---|---|
| An toàn thông tin | Kiểm tra nhanh, phân tích tin nhắn, bảo vệ dữ liệu người dùng |
| Phòng, chống lừa đảo | Hỏi người thân, báo cáo, kết nối Công an, thống kê cho đội TNV |
| Kỹ năng số | Bài học 1 phút, bài kiểm tra nhận diện, tuyên truyền |

---

## 2. Bối cảnh và vấn đề

| Ý trong đề | Ý nghĩa | Hệ quả cho sản phẩm |
|---|---|---|
| Lừa qua **điện thoại, tin nhắn, đường dẫn giả mạo, tài khoản mạo danh** Công an, ngân hàng | Có 4 kênh tấn công | Ô kiểm tra nhận SĐT, link và STK. **Tài khoản mạng xã hội mạo danh** không tra bằng ô kiểm tra được, nên đi qua **phân tích tin nhắn** |
| "Ngày càng **tinh vi**" | Danh sách đen tĩnh luôn chậm hơn kẻ lừa | Hai lớp bù nhau: **báo cáo cộng đồng** để cập nhật nhanh, và **dạy dấu hiệu** để người dùng tự nhận ra cả khi số chưa ai báo |
| Người cao tuổi và học sinh **dễ tổn thương** | Hai kiểu tổn thương khác nhau | Người già bị đánh vào **nỗi sợ và lòng tin vào chính quyền**. Học sinh bị đánh vào **lòng tham và sự tự tin thái quá**. Mỗi nhóm cần trang chủ, ngôn ngữ và nội dung riêng |
| "Kiểm tra nhanh **trước khi chuyển tiền**" | Thời điểm quyết định là ngay trước khi tiền đi | Mở app là dùng được ngay. Kết quả có trong ≤ 3 giây. Không bắt đăng nhập trước khi kiểm tra |
| "**Và học** kỹ năng nhận diện" | Cần miễn dịch dài hạn | Mỗi lần kiểm tra dẫn sang bài học đúng kiểu lừa vừa gặp |

---

## 3. Người dùng

### 3.1 Người cao tuổi, 65 tuổi, nhận cuộc gọi lạ
- **Năng lực số:** dùng smartphone, Zalo, có thể có app ngân hàng. Không quen thuật ngữ ("URL", "STK").
- **Hạn chế:** mắt kém, thao tác chạm chậm, khó đọc chữ nhỏ.
- **Tình huống:** bị dọa ("con bà bị bắt", "bà liên quan đường dây rửa tiền") và bị dặn "không được nói với ai". **Kẻ lừa cô lập nạn nhân.**
- **Đầu vào chính:** số điện thoại vừa gọi, số tài khoản được yêu cầu chuyển tiền.
- **Cần từ sản phẩm:** ít lựa chọn, chữ to, nghe được bằng giọng nói, và **một người thân tin cậy vào cuộc ngay**.

### 3.2 Học sinh THPT, nhận tin nhắn "việc nhẹ lương cao"
- **Năng lực số:** rành mạng xã hội, nghĩ mình "không thể bị lừa".
- **Tình huống:** muốn kiếm thêm tiền, gặp lời mời cộng tác viên đặt đơn hoặc làm nhiệm vụ, **ngại hỏi bố mẹ** vì sợ bị mắng.
- **Đầu vào chính:** đoạn tin nhắn, đường link, ảnh chụp màn hình.
- **Cần từ sản phẩm:** kiểm tra riêng tư, không phán xét, có thi đua và điểm số.
- **Vai trò kép:** học sinh cũng là **người thân được hỏi** của ông bà. Sản phẩm nối hai nhóm người dùng trong cùng một gia đình.

### 3.3 Đội thanh niên tình nguyện xã, phường
- **Công việc:** nắm kiểu lừa đang nổi → chọn nội dung → tuyên truyền tại tổ dân phố, ấp, trường học → báo cáo lên Đoàn cấp trên.
- **Phạm vi:** cấp xã/phường (chính quyền hai cấp).
- **Vai trò thêm:** cài app hộ người cao tuổi, giúp họ chọn người thân tin cậy, **xác minh báo cáo**, dùng bài học và bài kiểm tra **ngay trong buổi tuyên truyền**.
- **Ba hình thức dành riêng cho đoàn viên** (chi tiết ở mục 9A):
  - **Đoàn viên đỡ đầu số:** nhận đỡ đầu các hộ cao tuổi, làm **người thân dự phòng** cho cụ sống một mình.
  - **Buổi tuyên truyền có QR:** người dân quét mã, học và làm bài kiểm tra tại chỗ. Số liệu tự về màn của đội.
  - **Thi đua chi đoàn:** xếp hạng các chi đoàn theo kết quả học, số buổi tuyên truyền và số hộ đỡ đầu.

### 3.4 Vai phụ: người thân được chỉ định
Nhận cảnh báo, trả lời nhanh, gọi lại cho người đang bị dụ. Không bắt buộc phải cài app. Người thân có thể là con cháu, hoặc với học sinh là **thầy cô chủ nhiệm, anh chị Đoàn**.

---

## 4. Nguyên tắc sản phẩm

1. **Nhanh trước, đầy đủ sau:** một ô nhập cho mọi loại dữ liệu. Từ màn kết quả hoặc trang chủ Ông bà, **2 chạm** là người thân nhận được tin (gửi bằng thông báo) hoặc đã gọi được người thân (**Gọi ngay**). Khi gửi qua SMS hoặc Zalo thì mất **3 chạm**, do giới hạn của web.
2. **Lời thường:** viết "đường link" thay cho "URL", "số tài khoản" thay cho "STK". Lý do kết quả là câu đời thường, không phải điểm kỹ thuật.
3. **Không bao giờ hứa "an toàn" khi không có căn cứ:** không có dữ liệu thì xếp vào mức "Nghi ngờ".
4. **Màu, biểu tượng, chữ và giọng đọc đi cùng nhau:** không truyền thông tin bằng màu một mình.
5. **Trang chủ khác nhau theo vai trò:** ông bà, học sinh và đội TNV mỗi nhóm thấy đúng việc của mình.
6. **Mọi màn đều dẫn tới hành động kế tiếp:** không có màn cụt.
7. **Tôn trọng dữ liệu cá nhân:** thu tối thiểu, cho báo cáo ẩn danh, che thông tin nhạy cảm trước khi đưa cho AI phân tích.

---

## 5. Phạm vi

### Trong phạm vi
- 6 màn bắt buộc của đề và các màn phụ cần để luồng liền mạch (mục 6).
- 3 điểm cộng: AI phân tích tin nhắn, chế độ giọng nói, kết nối kênh tin báo Công an.
- Dữ liệu mẫu theo đề (mục 8).

### Ngoài phạm vi, nói rõ với giám khảo
- **Không chặn và không nghe lén cuộc gọi.** App được dùng sau khi cúp máy hoặc trước khi chuyển tiền.
- **Không tự động đọc SMS hay tin nhắn Zalo.** Người dùng tự dán nội dung hoặc chụp màn hình.
- **Không thay thế Công an:** app chuyển tin báo, không xử lý vụ việc.
- **Không gọi API của Công an.** Hiện không có API công khai. Kết nối bằng đường dẫn mở kênh chính thức kèm nội dung soạn sẵn.

### Những điều làm sản phẩm thất bại dù chạy đúng kỹ thuật
- Báo "An toàn" sai, khiến người dùng yên tâm chuyển tiền.
- Ông bà không tìm ra nút cần bấm khi đang hoảng.
- Báo cáo bừa làm một số điện thoại vô tội bị gắn nhãn đỏ.
- Màn đội TNV chỉ hiện biểu đồ, không chỉ ra được việc cần làm.

---

## 6. Danh mục màn hình

| Mã | Tên màn | Yêu cầu của đề | Vai trò dùng | Ưu tiên |
|---|---|---|---|---|
| MH-01 | Chọn vai trò | Ngầm định (3 người dùng) | Tất cả | P0 |
| MH-02 | Cài người thân tin cậy | Ngầm định ("chỉ định trước") | Ông bà, Học sinh | P0 |
| MH-03 | Trang chủ Ông bà | – | Ông bà | P0 |
| MH-04 | Trang chủ Học sinh | – | Học sinh | P0 |
| **MH-05** | **Kiểm tra nhanh** | **Bắt buộc 1** | Tất cả | P0 |
| **MH-06** | **Kết quả kiểm tra** (3 mức + lý do) | **Bắt buộc 1** | Tất cả | P0 |
| MH-07 | Phân tích tin nhắn bằng AI | Điểm cộng 1 | Học sinh, Ông bà | P0 |
| **MH-08** | **Báo cáo lừa đảo** (3 bước) | **Bắt buộc 2** | Tất cả | P0 |
| MH-09 | Báo cáo đã tiếp nhận và Gửi Công an | Bắt buộc 2, Điểm cộng 3 | Tất cả | P0 |
| MH-10 | Khẩn cấp: Tôi đã chuyển tiền | Mở rộng | Tất cả | P1 |
| **MH-11** | **Hỏi người thân** (gửi và theo dõi) | **Bắt buộc 3** | Ông bà, Học sinh | P0 |
| MH-12 | Phía người thân nhận cảnh báo | Mở rộng | Người thân | P1 |
| **MH-13** | **Bài học 1 phút** (thư viện và bài học) | **Bắt buộc 4** | Tất cả | P0 |
| **MH-14** | **Bài kiểm tra nhận diện** | **Bắt buộc 5** | Tất cả | P0 |
| MH-15 | Kết quả bài kiểm tra và chứng nhận | Bắt buộc 5 ("có chấm điểm") | Tất cả | P0 |
| **MH-16** | **Màn hình đội tình nguyện: thống kê kiểu lừa mới tại địa phương** | **Bắt buộc 6** | Đội TNV | P0 |
| MH-17 | Hàng chờ xác minh báo cáo | Mở rộng (chống báo cáo bừa) | Đội TNV | P1 |
| MH-18 | Tạo bài tuyên truyền | Mở rộng | Đội TNV | P1 |
| MH-19 | Trợ lý giọng nói (lớp phủ) | Điểm cộng 2 | Ông bà | P1 |
| MH-20 | Hồ sơ và cài đặt (Dễ nhìn và đọc to) | Điểm cộng 2 | Tất cả | P1 |
| MH-21 | Hộ đỡ đầu (Đoàn viên đỡ đầu số) | Sáng tạo – đoàn viên | Đội TNV | P0 |
| MH-22 | Buổi tuyên truyền: tạo buổi và mã QR | Sáng tạo – đoàn viên | Đội TNV | P0 |
| MH-23 | Kết quả buổi tuyên truyền | Sáng tạo – đoàn viên (đo tác động) | Đội TNV | P0 |
| MH-24 | Thi đua chi đoàn | Sáng tạo – đoàn viên | Học sinh, Đội TNV | P0 |

**Tổng: 25 màn** (MH-01 → MH-24 và lớp phủ MH-02a). Trong đó có 9 màn đáp ứng 6 yêu cầu bắt buộc. Các màn còn lại do đội thiết kế thêm để luồng liền mạch và để ghi điểm sáng tạo.

**P0:** bắt buộc có trong bài nộp. **P1:** nên có để ghi điểm cộng và cho thấy luồng khép kín.
Sitemap và luồng màn hình: xem [03_sitemap_luong_man_hinh.md](03_sitemap_luong_man_hinh.md).

---

## 7. Luồng giá trị

```
Người dân ──kiểm tra──> Kết quả ──┬──> Hỏi người thân ──> Người thân gọi lại ──> DỪNG chuyển tiền
                                  ├──> Báo cáo ──> Đội TNV xác minh ──> Công an xã/phường
                                  │                     │
                                  │                     └──> Thống kê kiểu mới ──> Tuyên truyền ─┐
                                  └──> Bài học 1 phút ──> Bài kiểm tra ──> Chứng nhận            │
Người dân nhận diện tốt hơn  <──────────────────────────────────────────────────────────────────┘
```

**Luồng chính của sản phẩm (đã chốt)** là **tập các luồng giải quyết trực tiếp yêu cầu của đề**, không chọn riêng một luồng:

| Vấn đề trong đề | Luồng giải quyết |
|---|---|
| Kiểm tra nhanh trước khi chuyển tiền + hỏi người thân | F1 (Ông bà), F4 (Hỏi người thân hai phía) |
| Tin nhắn "việc nhẹ lương cao" của học sinh | F2 (AI tin nhắn → báo cáo → học → kiểm tra) |
| Báo cáo một trường hợp lừa đảo | F3 (Báo cáo 3 bước) |
| Học kỹ năng nhận diện | F5 (Bài học 1 phút → Bài kiểm tra → Thi đua chi đoàn) |
| Đội tình nguyện nắm kiểu lừa mới tại địa phương | F6 (Thống kê → Xác minh → Tuyên truyền) |
| Cụ sống một mình không có người thân gần | F9 (Đoàn viên đỡ đầu số) |
| Tuyên truyền đo được tác động | F10 (Buổi tuyên truyền có QR) |

Mọi luồng được làm hoàn chỉnh ngang nhau. Thứ tự trình diễn do đội quyết định sau khi web dựng xong. Chi tiết từng luồng: [03_sitemap_luong_man_hinh.md](03_sitemap_luong_man_hinh.md).

**Ba luồng theo vai trò:**
- **Ông bà:** nhận cuộc gọi lạ → mở app → Kiểm tra số → 🔴 Nguy hiểm, kèm 3 lý do → **Hỏi người thân** (Gọi Lan ngay / Gửi cho Lan) → Lan trả lời "Đừng chuyển, con gọi ngay".
- **Học sinh:** dán tin nhắn "việc nhẹ lương cao" → AI tô đỏ dấu hiệu → Báo cáo → Bài học 1 phút → Bài kiểm tra.
- **Đội TNV:** Tổng quan → kiểu lừa mới tuần này → Xác minh báo cáo → Tạo bài tuyên truyền → Xuất báo cáo.

---

## 8. Dữ liệu mẫu (giả lập theo đề)

### 8.1 Mười tình huống lừa đảo

| # | Tình huống | Kênh chính | Nhắm vào | Nguồn |
|---|---|---|---|---|
| T01 | Giả danh Công an yêu cầu chuyển tiền để "xác minh" | Cuộc gọi | Người cao tuổi | Đề |
| T02 | Đường dẫn nhận quà tri ân | Đường dẫn | Người cao tuổi | Đề |
| T03 | Tuyển cộng tác viên đặt đơn, làm nhiệm vụ | Tin nhắn, mạng xã hội | Học sinh | Đề |
| T04 | Người thân gặp tai nạn, cần tiền gấp | Cuộc gọi | Người cao tuổi | Đề |
| T05 | Giả nhân viên ngân hàng: cập nhật sinh trắc học, nâng hạn mức | Cuộc gọi, đường dẫn | Người cao tuổi | Đề xuất |
| T06 | Giả điện lực, nhà mạng: cắt điện, khóa SIM | Cuộc gọi | Người cao tuổi | Đề xuất |
| T07 | Chiếm tài khoản Zalo, Facebook rồi nhắn mượn tiền người quen | Mạng xã hội | Cả hai | Đề xuất |
| T08 | Đầu tư, tiền ảo lãi cao | Mạng xã hội | Học sinh | Đề xuất |
| T09 | Mua bán online bắt đặt cọc | Mạng xã hội, STK | Học sinh | Đề xuất |
| T10 | Trúng thưởng, hoàn tiền | Tin nhắn, đường dẫn | Cả hai | Đề xuất |

### 8.2 Báo cáo trong tháng: 120 lượt

**Theo kênh.** Con số 35% đường dẫn là của đề, các kênh còn lại là giả lập.

| Kênh | Số lượt | Tỷ lệ |
|---|---|---|
| Đường dẫn giả mạo | **42** | **35%** |
| Cuộc gọi | 36 | 30% |
| Tin nhắn, mạng xã hội | 30 | 25% |
| Số tài khoản | 12 | 10% |
| **Tổng** | **120** | 100% |

**Theo tình huống** (giả lập, tổng 120):
T02: 22 · T01: 18 · T03: 16 · T05: 14 · T04: 12 · T07: 10 · T10: 10 · T09: 8 · T06: 6 · T08: 4.

Mọi số điện thoại, đường link, số tài khoản và tên người trong prototype đều **giả lập**, không dùng thông tin cá nhân thật.

---

## 9. Ba điểm cộng: giải pháp

| Điểm cộng | Mức cơ bản | Mức theo xu hướng | Phục vụ |
|---|---|---|---|
| **AI phân tích tin nhắn dán vào** | Dán tin → tô đỏ câu đáng ngờ, gọi tên kiểu lừa, giải thích bằng lời thường, gợi ý việc nên làm | **Chụp màn hình thay cho dán** (đọc chữ trong ảnh) · **AI tự phân loại báo cáo**, giúp màn đội TNV tự cập nhật kiểu mới · **AI soạn bài tuyên truyền** | Cả 3 nhóm |
| **Chế độ giọng nói cho người cao tuổi** | Đọc to kết quả và bài học · nói số điện thoại thay vì gõ | **Trợ lý hội thoại:** bà kể lại cuộc gọi, app trả lời bằng giọng nói và gợi ý Hỏi người thân · giọng đọc miền Nam | Người cao tuổi |
| **Kết nối kênh tin báo Công an** | Nút mở 113 và kênh tiếp nhận chính thức, kèm nội dung soạn sẵn | **Đội TNV làm cầu nối:** xác minh và gom ca trùng, xuất báo cáo tuần cho Công an xã/phường. Vòng khép kín người dân → đội TNV → Công an → cảnh báo → người dân | Đội TNV, người dân |

Danh sách kênh tiếp nhận cụ thể của Công an (số, tài khoản Zalo, cổng trực tuyến) **phải được kiểm chứng** trước khi đưa vào bài nộp.

---

## 9A. Sáng tạo dành cho đoàn viên

| Hình thức | Vấn đề giải quyết | Cách hoạt động | Tiêu chí chấm |
|---|---|---|---|
| **🤝 Đoàn viên đỡ đầu số** | Kẻ lừa nhắm vào người **cô lập**. Cụ sống một mình thì nút "Hỏi người thân" không có ai để hỏi | Mỗi đoàn viên đỡ đầu vài hộ cao tuổi trong xã/phường. Đoàn viên **cài app hộ** bằng mã liên kết, có sự đồng ý của cụ, và trở thành **người thân dự phòng** (người ưu tiên nếu cụ sống một mình). Khi cụ bấm Hỏi người thân, đoàn viên nhận cảnh báo. App nhắc đoàn viên thăm hỏi định kỳ | 1 (đúng nỗi đau cô lập), 4 (triển khai thật ở cơ sở) |
| **📣 Buổi tuyên truyền có QR** | Tuyên truyền truyền thống không đo được ai đã hiểu | Đội tạo buổi (địa điểm ấp/khu phố/trường, chủ đề kiểu lừa) và nhận **mã QR**. Người dân quét mã thì mở web **không cần tài khoản**, xem bài học 1 phút và làm 5 câu kiểm tra. **Số người tham gia, điểm trung bình, tỷ lệ đạt** hiện trực tiếp trên màn của đội và cộng vào thống kê xã/phường | 3 (dữ liệu), 4 (**đo được tác động**) |
| **🏆 Thi đua chi đoàn** | Phong trào cần động lực và số liệu so sánh | Ở trường THPT, **mỗi lớp là một chi đoàn**. Xếp hạng chi đoàn theo **điểm trung bình bài kiểm tra**, **số buổi tuyên truyền**, **số người tham gia**, **số hộ đỡ đầu**, **số ca đã xác minh**. Không công khai điểm cá nhân | 1, 4 (gắn với phong trào Đoàn) |

---

## 10. Góc nhìn của ba giám khảo

| Giám khảo | Phần họ quan tâm | Sản phẩm trả lời bằng |
|---|---|---|
| **Hiệu trưởng trường chuyên** | Giá trị giáo dục, đưa vào nhà trường, an toàn cho học sinh | Bài học theo tình huống 60 giây · bài kiểm tra đo khả năng **phân biệt**, không đo trí nhớ · thi đua theo lớp, không công khai điểm cá nhân · được hỏi thầy cô thay vì bố mẹ |
| **Ủy viên BCH Đoàn, Phó Bí thư Thành đoàn** | Vai trò đội cơ sở, số liệu phong trào, nhân rộng, phối hợp Công an | Màn đội TNV trả lời câu hỏi "tuần này tuyên truyền gì" · hàng chờ xác minh · xuất báo cáo · chứng nhận Lá Chắn Số làm tiêu chí phong trào |
| **Giám đốc công nghệ** | Khả thi, căn cứ dữ liệu, độ chính xác, quyền riêng tư | Quy tắc phân mức minh bạch · chỉ cho "An toàn" khi đã xác thực · ngưỡng chống báo cáo bừa · AI hai tầng, che dữ liệu nhạy cảm · nói rõ những gì app không làm |

---

## 10A. Đối chiếu tiêu chí chấm của Ban Tổ chức

| Tiêu chí | Điểm | Sản phẩm đáp ứng bằng |
|---|---|---|
| **1. Hiểu vấn đề và người dùng** | 25 | 3 nhóm người dùng, phân tích nỗi đau theo từng từ khóa của đề (mục 2–3) · bối cảnh cấp xã/phường của Đồng Nai, chính quyền hai cấp · luồng chính giải quyết từng vấn đề của đề (mục 7) · đỡ đầu số cho người cô lập |
| **2. Thiết kế UX/UI** *(xét trước khi bằng điểm)* | 30 | 2 chạm để người thân vào cuộc · trang chủ theo vai trò · chế độ Dễ nhìn và đọc to · **mỗi màn có trạng thái trống, lỗi, mất mạng được vẽ trong PDF** · nhận diện thống nhất (DESIGN.md) |
| **3. Sáng tạo** | 20 | AI hai tầng (tô đỏ dấu hiệu, tự phân loại báo cáo, soạn bài tuyên truyền) · dữ liệu cộng đồng có xác minh · quét mã QR chuyển khoản · bài kiểm tra "chạm vào dấu hiệu" · Hỏi người thân hai phía · buổi tuyên truyền có QR · đỡ đầu số |
| **4. Khả thi, tác động** *(xét thứ hai khi bằng điểm)* | 25 | Web không cần cài · MVP 24 giờ rõ ràng (mục 11) · nói thật giới hạn của web và những gì app không làm · triển khai qua đội TNV, chi đoàn, nhà trường · **đo tác động** bằng số liệu buổi tuyên truyền và thi đua |

## 10B. Sản phẩm nộp vòng sơ loại (theo yêu cầu của BTC)

| Sản phẩm | Nội dung | Nguồn |
|---|---|---|
| **Bản thiết kế giao diện (PDF)** | Mỗi màn một trang, **tên màn = mã + tên** (ví dụ "MH-06 Kết quả kiểm tra"). Có đủ 6 màn bắt buộc, được đánh dấu "Bắt buộc 1–6" | Ảnh chụp từ web prototype |
| **Prototype bấm được** | Web mobile, đường dẫn ghi trong thuyết minh. Bấm được trọn các luồng giải quyết yêu cầu của đề | Thư mục web trong repo này |
| **Thuyết minh (tối đa 3 trang)** | (a) vấn đề và người dùng · (b) luồng sử dụng chính · (c) MVP 24 giờ · (d) kiến trúc, công nghệ · (e) công cụ AI đã dùng vào việc gì | Rút gọn từ 3 tài liệu đặc tả |
| **Thư mục nộp** | `Doi[mã đội]_De4` trên màn hình máy tính, nộp đúng 15:00 | – |

Nguyên tắc của BTC phải giữ: không sao chép nguyên giao diện sản phẩm có sẵn · dữ liệu là giả lập · không dùng thông tin cá nhân thật · ghi rõ công cụ AI đã dùng.

## 11. Khả thi và công nghệ (đề xuất)

**MVP 24 giờ ở vòng chung kết (đã chốt): toàn bộ các màn P0.**

| Nhóm | Màn P0 | Chức năng |
|---|---|---|
| Khởi đầu | MH-01, MH-02 | Chọn vai trò, xã/phường, lớp/chi đoàn · cài người thân |
| Trang chủ | MH-03, MH-04 | Theo vai trò |
| Kiểm tra | MH-05, MH-06 | Nhận dạng, tra danh sách mẫu, xếp 3 mức kèm lý do, đọc to |
| AI | MH-07 | Tầng luật từ khóa + một lần gọi mô hình ngôn ngữ |
| Báo cáo | MH-08, MH-09 | 3 bước, mã báo cáo, mở kênh Công an |
| Hỏi người thân | MH-11 | Gọi ngay, gửi SMS/Zalo soạn sẵn, trạng thái mô phỏng |
| Học | MH-13, MH-14, MH-15 | 10 bài, bài kiểm tra chấm điểm, chứng nhận |
| Đội TNV | MH-16 | Thống kê, khối "Mới tuần này", biểu đồ |
| Đoàn viên | MH-21, MH-22, MH-23, MH-24 | Đỡ đầu, buổi tuyên truyền QR và kết quả, thi đua chi đoàn |

**Để sau vòng chung kết (P1):** MH-02a, MH-10, MH-12, MH-17, MH-18, MH-19, MH-20 · thông báo đẩy · quét QR chuyển khoản · nói để nhập · xuất PDF.

- **Nền tảng (đã chốt): ứng dụng web, giao diện ưu tiên điện thoại.**
  - Bố cục thiết kế cho màn hình rộng 360–430px. Màn hình rộng hơn vẫn dùng được: cột nội dung tối đa 480px, căn giữa. Riêng màn đội TNV giãn ra trên máy tính bảng và máy tính.
  - Mở bằng đường link hoặc mã QR. Có thể **"Thêm vào màn hình chính"** để có biểu tượng như app, dùng được khi mất mạng và nhận thông báo. Đội TNV làm thao tác này giúp ông bà.
  - Dùng tốt trên Chrome (Android) và Safari (iPhone), là hai trình duyệt phổ biến nhất của người dùng mục tiêu.
- **Kiểm tra:** danh sách cảnh báo (từ báo cáo đã xác minh và nguồn chính thức) + danh sách số và tên miền chính thức + luật nhận dạng link (tên miền nhái, link rút gọn, tên miền mới tạo).
- **AI:** tầng 1 là luật từ khóa, chạy ngay và không tốn chi phí. Tầng 2 là mô hình ngôn ngữ lớn để giải thích và phân loại, dữ liệu được che trước khi gửi.
- **Giọng nói:** bộ nhận dạng và đọc giọng nói tiếng Việt có sẵn trong trình duyệt. Chất lượng giọng tiếng Việt khác nhau tùy máy, nên dự phòng bằng dịch vụ giọng nói tiếng Việt trong nước.
- **Dữ liệu:** backend nhẹ lưu báo cáo, danh sách cảnh báo và thống kê theo xã/phường.
- **Triển khai:** đội TNV phát mã QR tại tổ dân phố và cài hộ ông bà · nhà trường đưa bài học và bài kiểm tra vào tiết sinh hoạt lớp · đội cập nhật danh sách cảnh báo hằng tuần cùng Công an xã/phường.

---

## 12. Rủi ro và cách giảm thiểu

| Rủi ro | Giảm thiểu |
|---|---|
| Báo "An toàn" sai | Chỉ xanh khi nằm trong danh sách chính thức. Luôn kèm nhắc "dừng lại nếu bị giục chuyển tiền" |
| Báo cáo bừa, vu khống số vô tội | Ngưỡng số báo cáo độc lập · đội TNV xác minh · có quy trình khiếu nại gỡ nhãn |
| Lộ dữ liệu cá nhân | Thu tối thiểu · báo cáo ẩn danh · che STK và họ tên trước khi đưa AI · tuân thủ quy định pháp luật về bảo vệ dữ liệu cá nhân |
| AI phân tích sai | AI chỉ giải thích, mức cảnh báo do quy tắc quyết định. Khi không chắc thì xếp "Nghi ngờ" |
| Người cao tuổi không dùng được | Trang chủ 2–3 nút to · giọng nói · đội TNV cài hộ · thử với người dùng thật |

---

## 13. Điểm còn mở

1. Danh sách kênh tiếp nhận tin báo của Công an: **cần kiểm chứng**.

**Đã chốt (24/11/2026):**
- Luồng chính là tập luồng giải quyết yêu cầu đề (mục 7). Mọi luồng làm hoàn chỉnh, thứ tự trình diễn do đội tự quyết.
- MVP 24 giờ là toàn bộ các màn P0 (mục 11).
- Thêm 3 hình thức cho đoàn viên: đỡ đầu số, buổi tuyên truyền có QR, thi đua chi đoàn (mục 9A).
- Các ngưỡng và tham số nghiệp vụ: xem mục 16 trong đặc tả chức năng.
- Người thân mẫu: Lan (con gái), Hùng (con trai).
- Thể lệ và tiêu chí chấm của BTC: đã có, đối chiếu ở mục 10A–10B.
