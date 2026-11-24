# ĐẶC TẢ CHỨC NĂNG – LÁ CHẮN SỐ

> Phiên bản 1.0 · 24/11/2026 · Đi kèm: [01_dac_ta_san_pham.md](01_dac_ta_san_pham.md)
> Quy ước: **CN** = chức năng · **QT** = quy tắc nghiệp vụ · **NT** = tiêu chí nghiệm thu · **MH** = màn hình (danh mục ở mục 6 của đặc tả sản phẩm)
> Mức ưu tiên: **P0** bắt buộc cho bài nộp · **P1** điểm cộng hoặc mở rộng · **P2** sau vòng thi

---

## 1. Vai trò và quyền

| Vai trò | Mô tả | Được dùng |
|---|---|---|
| **Ông bà** (người cao tuổi) | Chế độ Dễ nhìn và đọc to bật sẵn | Kiểm tra, AI tin nhắn, Hỏi người thân, Báo cáo, Bài học, Bài kiểm tra, Giọng nói |
| **Học sinh** | Giao diện chuẩn, có thi đua | Như Ông bà, cộng thêm xếp hạng lớp/trường |
| **Đội TNV** | Gắn với một xã/phường | Mọi chức năng người dân, cộng thêm Thống kê, Xác minh, Tuyên truyền, Xuất báo cáo |
| **Người thân** | Không bắt buộc cài app | Nhận cảnh báo, trả lời nhanh |

**QT-01:** Kiểm tra nhanh, AI tin nhắn và Bài học **dùng được mà không cần tài khoản**. Chỉ Báo cáo không ẩn danh, Hỏi người thân và chức năng của đội TNV cần thông tin hồ sơ.

---

## 2. CN-01 Khởi đầu (MH-01, MH-02) · P0

### CN-01.1 Chọn vai trò
- **Đầu vào:** chọn 1 trong 3 thẻ (Ông bà · Học sinh · Đội tình nguyện), tên gọi (không bắt buộc), xã/phường (chọn từ danh sách).
- **Xử lý:**
  - Chọn Ông bà thì tự bật chế độ Dễ nhìn và đọc to (CN-09).
  - Chọn Đội TNV thì bắt buộc chọn xã/phường và nhập mã đội (giả lập).
- **Đầu ra:** chuyển đến MH-02 (Ông bà, Học sinh) hoặc MH-16 (Đội TNV).
- **NT:** nút "Bắt đầu" chỉ bấm được khi đã chọn vai trò. Đổi vai trò được trong Hồ sơ (MH-20).

### CN-01.2 Cài người thân tin cậy ("chỉ định trước")
- **Đầu vào:** 1–3 người. Mỗi người có tên gọi, số điện thoại (nhập tay hoặc chọn từ danh bạ), quan hệ (con, cháu, vợ/chồng, thầy cô, anh chị Đoàn, khác), kênh nhận (Zalo, SMS, cuộc gọi). Đánh dấu **1 người ưu tiên**.
- **QT-02:** người đầu tiên được thêm sẽ mặc định là người ưu tiên.
- **QT-03:** Học sinh có sẵn gợi ý quan hệ "Thầy cô chủ nhiệm" và "Anh chị Đoàn".
- **Trạng thái:**
  - Chưa có ai: hộp trống với nội dung "Thêm người thân để dùng nút Hỏi người thân".
  - Cho phép **"Để sau"**. Nút Hỏi người thân khi đó hiện nhãn "Chưa cài – bấm để thêm".
- **NT:** lưu thành công thì danh sách hiện ngay ở MH-11. Không lưu trùng số điện thoại.

---

## 3. CN-02 Kiểm tra nhanh (MH-05, MH-06) · P0 · Bắt buộc 1

### CN-02.1 Nhập dữ liệu
| Cách nhập | Mô tả | Ưu tiên |
|---|---|---|
| Gõ | Một ô nhập duy nhất | P0 |
| Dán | Nút "Dán" cạnh ô, lấy nội dung từ bộ nhớ tạm | P0 |
| Ví dụ mẫu | 3–4 chip bấm nhanh để thử (số, link, STK) | P0 |
| Lịch sử | Danh sách "Vừa kiểm tra" (tối đa 10, lưu trên máy) | P0 |
| Nói | Đọc số điện thoại bằng giọng nói (CN-09) | P1 |
| Quét QR chuyển khoản | Đọc mã QR chuyển khoản ngân hàng, lấy STK, ngân hàng, số tiền | P1 |

### CN-02.2 Tự nhận dạng loại dữ liệu
| Loại | Quy tắc nhận dạng (đề xuất) | Chip hiển thị |
|---|---|---|
| Số điện thoại | Sau khi bỏ khoảng trắng, dấu chấm, gạch: `0` + 9 số, hoặc `+84`/`84` + 9 số | 📞 Số điện thoại |
| Đường link | Có `http`, `www.` hoặc dạng `tên.miền` | 🔗 Đường link |
| Số tài khoản | 6–19 chữ số, không khớp định dạng số điện thoại | 🏦 Số tài khoản |
| Không rõ | Các trường hợp còn lại | Gợi ý "Dán tin nhắn? → Phân tích bằng AI" |

- **QT-04:** một dãy **10 số bắt đầu bằng 0** được tra **cả hai loại**, vì nhiều ngân hàng cho dùng số điện thoại làm số tài khoản. Kết quả lấy mức cao hơn.
- **QT-05:** với số tài khoản, có thể chọn thêm ngân hàng (không bắt buộc) để tăng độ chính xác.
- **QT-06:** khi người dùng dán **một đoạn văn dài** (trên 60 ký tự, có khoảng trắng), app tự đề nghị chuyển sang AI phân tích tin nhắn (CN-03).

### CN-02.3 Tra cứu và phân mức
**Nguồn tra cứu:**
- (a) Danh sách chính thức: tổng đài ngân hàng, tên miền cơ quan nhà nước.
- (b) Danh sách cảnh báo: báo cáo đã xác minh và nguồn chính thức.
- (c) Số báo cáo cộng đồng chưa xác minh.
- (d) Dấu hiệu kỹ thuật của đường link.

**QT-07 – Quy tắc phân mức** (ngưỡng là đề xuất, chờ duyệt):

| Mức | Điều kiện (chỉ cần thỏa một) |
|---|---|
| 🔴 **NGUY HIỂM** | Nằm trong danh sách cảnh báo đã xác minh · **≥ 5** báo cáo độc lập trong 30 ngày · link nhái tên miền ngân hàng hoặc cơ quan nhà nước · link khớp mẫu lừa đã biết |
| 🟡 **NGHI NGỜ** | 1–4 báo cáo chưa xác minh · tên miền mới tạo (< 30 ngày) · link rút gọn · link không có HTTPS · **không có dữ liệu** |
| 🟢 **AN TOÀN** | **Chỉ khi** nằm trong danh sách chính thức đã xác thực **và** không có báo cáo đã xác minh |

- **QT-08:** **không có dữ liệu thì luôn xếp NGHI NGỜ, không bao giờ xếp AN TOÀN.**
- **QT-09:** "báo cáo độc lập" là báo cáo từ các thiết bị hoặc tài khoản khác nhau. Nhiều báo cáo từ một nguồn chỉ tính là 1.

### CN-02.4 Hiển thị kết quả (MH-06)
- **Thẻ kết quả** chiếm phần trên màn hình, gồm **màu + biểu tượng + chữ** (🔴 NGUY HIỂM / 🟡 NGHI NGỜ / 🟢 AN TOÀN) và dữ liệu vừa kiểm tra.
- **"Vì sao?"** gồm tối đa 3 lý do bằng lời thường, mỗi lý do có một biểu tượng. Mẫu câu:
  - "23 người ở Đồng Nai đã báo số này giả danh Công an."
  - "Đường link này giả trang của ngân hàng (vietcornbank thay cho vietcombank)."
  - "Chưa ai báo số này, nhưng Công an **không bao giờ** gọi điện yêu cầu chuyển tiền."
- **Kiểu lừa khớp:** nếu xác định được (T01–T10) thì hiện tên tình huống.
- **Nút hành động theo mức:**

| Mức | Nút chính (to nhất) | Nút phụ |
|---|---|---|
| 🔴 | **Hỏi người thân ngay** | Báo cáo · Học 1 phút về kiểu này · Tôi đã chuyển tiền |
| 🟡 | **Hỏi người thân** | Báo cáo · Học 1 phút |
| 🟢 | Xong | Học 1 phút |

- **QT-10:** ở mức 🟢 luôn hiện thêm dòng: "Số này đúng, nhưng nếu ai giục bạn chuyển tiền gấp, hãy dừng lại và hỏi người thân."
- **Nút 🔊 Nghe đọc:** đọc mức, lý do và nút chính. Ở chế độ Dễ nhìn, nội dung được **tự đọc** khi mở màn.
- **NT:**
  - Kết quả hiện trong ≤ 3 giây.
  - Mỗi kết quả có ít nhất 1 lý do.
  - Từ trang chủ đến lúc gửi Hỏi người thân không quá 3 chạm (Kiểm tra → Kết quả → Hỏi người thân → Gửi).

### CN-02.5 Trạng thái trống và lỗi
| Tình huống | Hiển thị |
|---|---|
| Bấm kiểm tra khi ô trống | Dòng nhắc vàng "Bạn chưa nhập gì. Hãy dán hoặc gõ số, link, số tài khoản." |
| Sai định dạng (ví dụ số điện thoại thiếu số) | "Số này có vẻ thiếu chữ số, bạn xem lại nhé." |
| Mất mạng | Dải xám "Đang dùng danh sách đã tải về lúc [giờ]". Vẫn trả kết quả từ dữ liệu trên máy |
| Đang tra | Hiệu ứng chờ kèm chữ "Đang kiểm tra…" |
| Chưa có lịch sử | Hộp trống "Bạn chưa kiểm tra lần nào" |

---

## 4. CN-03 AI phân tích tin nhắn (MH-07) · P0 · Điểm cộng 1

- **Đầu vào:** đoạn tin nhắn dán vào (tối đa 2.000 ký tự). Ở mức P1, nhận thêm **ảnh chụp màn hình** và đọc chữ trong ảnh.
- **Xử lý hai tầng:**
  1. **Tầng luật:** dò từ khóa và mẫu câu theo 10 tình huống ("việc nhẹ lương cao", "chuyển tiền để xác minh", "nhận quà tri ân", "hoa hồng", "nạp trước"…), kèm link và số trong tin (tự tra theo CN-02).
  2. **Tầng AI:** mô hình ngôn ngữ phân loại kiểu lừa, giải thích từng câu đáng ngờ bằng lời thường, gợi ý việc nên làm.
- **QT-11:** trước khi gửi cho tầng AI, **che số tài khoản, họ tên và số CCCD** trong nội dung.
- **QT-12:** mức cảnh báo do **quy tắc** quyết định, AI chỉ giải thích và gợi ý kiểu lừa. Khi tầng luật và AI cho kết quả khác nhau thì lấy mức cao hơn.
- **Đầu ra:**
  - Đoạn tin với các câu đáng ngờ được **tô đỏ** (chạm vào để xem giải thích).
  - Mức 🔴/🟡/🟢 và **điểm rủi ro trên thang 100**.
  - Kiểu lừa khớp.
  - Các nút: Hỏi người thân · Báo cáo (tự điền sẵn) · Học 1 phút.
- **Trạng thái:**
  - Ô trống: nhắc nhập.
  - Không thấy dấu hiệu: 🟡 "Chưa thấy dấu hiệu rõ, nhưng đừng chuyển tiền hay gửi mã OTP cho người lạ."
  - AI không phản hồi: chỉ dùng kết quả tầng luật, kèm ghi chú.
- **NT:** với 10 tin mẫu ứng với 10 tình huống, app nhận đúng kiểu lừa ít nhất 8/10 và tô đỏ ít nhất 1 câu mỗi tin.

---

## 5. CN-04 Báo cáo lừa đảo (MH-08, MH-09, MH-10) · P0 · Bắt buộc 2

### CN-04.1 Báo cáo ba bước
| Bước | Nội dung | Bắt buộc |
|---|---|---|
| 1. Kiểu lừa | 10 thẻ hình T01–T10, cộng thẻ "Không rõ" | Có |
| 2. Bằng chứng | Số, link, STK (tự điền nếu đi từ CN-02/CN-03) · kênh (gọi, tin nhắn, link, STK, mạng xã hội) · ảnh chụp (tối đa 3) · mô tả ngắn **hoặc ghi âm** (P1) | Kênh bắt buộc, còn lại tùy chọn |
| 3. Nơi và liên lạc | Xã/phường (lấy từ hồ sơ, sửa được) · thời điểm xảy ra · **Bạn đã chuyển tiền chưa?** · ẩn danh (bật/tắt) | Xã/phường và câu hỏi chuyển tiền là bắt buộc |

- **Thanh bước** hiện 1/3, 2/3, 3/3. Có nút Quay lại và giữ nguyên dữ liệu đã nhập.
- **QT-13:** xã/phường, kiểu lừa, kênh và thời điểm là **bắt buộc**, vì đây là dữ liệu đầu vào của thống kê CN-08.
- **QT-14:** thoát giữa chừng thì hỏi xác nhận "Bỏ báo cáo này?".

### CN-04.2 Tiếp nhận (MH-09)
- Hiện **mã báo cáo** (dạng `BC-2026-0121`) và **trạng thái theo dõi**: Đã nhận → Đội TNV đang xác minh → Đã chuyển Công an / Đã bác bỏ.
- Hiện câu "Bạn là người thứ 121 báo cáo trong tháng này tại [xã/phường]", để người báo thấy báo cáo của mình có ý nghĩa.
- Nút **Gửi Công an** (CN-10) và **Hỏi người thân**.

### CN-04.3 Luồng khẩn cấp: đã chuyển tiền (MH-10) · P1
- Kích hoạt khi chọn "Đã chuyển" ở bước 3, hoặc bấm "Tôi đã chuyển tiền" ở MH-06.
- Hiện 3 việc theo thứ tự:
  1. **Gọi tổng đài ngân hàng** để đề nghị phong tỏa giao dịch (chọn ngân hàng → gọi).
  2. **Gọi 113** hoặc mở kênh Công an với hồ sơ soạn sẵn.
  3. **Báo người thân.**
- **NT:** từ MH-06 đến nút gọi ngân hàng không quá 2 chạm.

---

## 6. CN-05 Hỏi người thân (MH-11, MH-12) · P0 · Bắt buộc 3

### CN-05.1 Gửi
- **Vị trí nút:** MH-03 (trang chủ Ông bà), MH-06 (kết quả), MH-07 (AI), MH-09 (tiếp nhận báo cáo).
- **Xử lý:**
  - Bấm nút thì hiện thẻ người ưu tiên, bản xem trước tin nhắn và nút to **"Gửi cho [tên]"**.
  - Có thể đổi sang người khác trong danh sách.
- **Nội dung soạn sẵn** (tự điền từ ngữ cảnh):
  > "[Mẹ] vừa nhận [cuộc gọi] từ [0909 xxx xxx]. Lá Chắn Số báo **[NGUY HIỂM – giả danh Công an]**. [Con] gọi lại cho [mẹ] ngay nhé."
- **Kênh gửi:**
  - Nếu người thân có cài app: gửi bằng **thông báo trong app**, đúng 1 chạm. Prototype mô phỏng cách này.
  - Nếu không: **mở Zalo hoặc SMS với nội dung soạn sẵn**, người dùng chạm thêm "Gửi".
  - Có thêm nút **Gọi ngay**.
- **QT-15:** chưa cài người thân thì chuyển sang MH-02, xong quay lại đúng bước đang làm.

### CN-05.2 Theo dõi và leo thang
- Trạng thái lần lượt: **Đã gửi → Đã xem → Đã trả lời** (với kênh trong app).
- **QT-16:** sau **2 phút** không có phản hồi, app gợi ý "Gọi [người thứ hai]" hoặc "Gọi điện trực tiếp cho [tên]".
- Khi người thân trả lời, câu trả lời hiện to và được **đọc to** ở chế độ Dễ nhìn.

### CN-05.3 Phía người thân (MH-12) · P1
- Cảnh báo nổi bật, kèm nội dung và mức kết quả.
- Trả lời nhanh: **[Con gọi ngay]** (mở cuộc gọi) · **[Đừng chuyển tiền, chờ con]** · **[Không sao đâu, đã kiểm tra]**.
- **NT:** người thân trả lời được trong 1 chạm. Người hỏi nhận được câu trả lời trong ≤ 5 giây (mô phỏng).

---

## 7. CN-06 Bài học 1 phút (MH-13) · P0 · Bắt buộc 4

- **Thư viện:** 10 bài ứng với T01–T10, lọc theo đối tượng (Ông bà, Học sinh), đánh dấu bài đã học.
- **Cấu trúc một bài, tổng 60 giây**, có thanh thời gian:

| Giây | Phần | Nội dung |
|---|---|---|
| 0–15 | Tình huống | Tái hiện đoạn chat hoặc cuộc gọi |
| 15–35 | 3 dấu hiệu | Tô đỏ từng dấu hiệu trong tình huống |
| 35–50 | Nên làm | 2–3 việc cụ thể |
| 50–60 | Tự kiểm tra | 1 câu hỏi nhanh |

- **Lối vào:** từ MH-06 hoặc MH-07 (đúng kiểu vừa gặp) · "Bài học hôm nay" trên trang chủ · thư viện.
- **Hiển thị theo vai trò:**
  - Học sinh: thẻ dọc lướt từng phần.
  - Ông bà: chữ to, **giọng đọc tự chạy**, nút tạm dừng to.
- **Chế độ trình chiếu** (P1, đội TNV): toàn màn hình, chữ lớn, để chiếu trong buổi tuyên truyền.
- Cuối bài có nút **"Làm bài kiểm tra"** và **"Bài tiếp theo"**.
- **NT:** mỗi bài đọc to hết trong ≤ 60 giây. Mỗi bài có đúng 3 dấu hiệu và ít nhất 2 việc nên làm.

---

## 8. CN-07 Bài kiểm tra nhận diện (MH-14, MH-15) · P0 · Bắt buộc 5

### CN-07.1 Ngân hàng câu hỏi
| Dạng | Mô tả | Ví dụ |
|---|---|---|
| **Thật hay lừa?** | Hiện tin nhắn hoặc cuộc gọi dạng thật, chọn Thật / Lừa đảo | Có **cả tin thật**, ví dụ thông báo biến động số dư chính thống |
| **Chạm vào dấu hiệu** | Chạm vào các câu đáng ngờ trong tin | Chấm theo số dấu hiệu chạm đúng |
| **Bạn sẽ làm gì?** | Chọn 1 trong 3–4 phản ứng | "Người xưng Công an bảo bà chuyển tiền để xác minh" |

- **QT-17:** mỗi lượt gồm 10 câu cho Học sinh hoặc **5 câu cho Ông bà**. Tin thật chiếm **20–30%**. Thứ tự câu và đáp án được xáo trộn.
- **QT-18:** Ông bà làm bài **không tính giờ**, có giọng đọc.

### CN-07.2 Chấm điểm
- Thang **100 điểm**, chia đều theo số câu. Câu "chạm vào dấu hiệu" được tính điểm theo tỷ lệ chạm đúng, trừ điểm khi chạm sai.
- **Giải thích ngay** sau từng câu: đúng hay sai, và vì sao.
- **Màn kết quả (MH-15):** tổng điểm · **kiểu lừa còn yếu** · gợi ý bài học tương ứng · nút Làm lại.
- **QT-19:** đạt **≥ 80 điểm** thì nhận **Chứng nhận Lá Chắn Số** (xem và chia sẻ được dưới dạng ảnh).
- **Thi đua** (Học sinh, P1): xếp hạng **theo lớp và trường bằng điểm trung bình**, **không công khai điểm cá nhân**.
- **NT:** điểm tính đúng theo QT-17/18. Mỗi câu đều có giải thích. Chứng nhận chỉ mở khi đạt ngưỡng.

---

## 9. CN-08 Đội tình nguyện (MH-16, MH-17, MH-18) · P0 · Bắt buộc 6

### CN-08.1 Thống kê kiểu lừa mới tại địa phương (MH-16) · P0
- **Bộ lọc:** xã/phường (mặc định là xã/phường của đội) · khoảng thời gian (tuần, tháng) · đối tượng bị nhắm (người cao tuổi, học sinh, tất cả).
- **Khối "MỚI TUẦN NÀY"** đặt trên cùng: tên kiểu lừa · mức tăng · đối tượng bị nhắm · nút **Tạo bài tuyên truyền**.
- **KPI:** tổng báo cáo (120) · đường dẫn giả mạo (42 – 35%) · số báo cáo chờ xác minh · số người đã học hoặc đạt chứng nhận.
- **Biểu đồ:**
  - 10 kiểu lừa xếp theo số ca, có mũi tên ▲▼ so với kỳ trước.
  - Cơ cấu theo kênh.
  - Xu hướng theo tuần.
- **Danh sách điểm nóng** theo tổ dân phố, ấp (P1).
- **QT-20 – định nghĩa "kiểu mới":** một kiểu lừa được gắn nhãn MỚI khi **lần đầu xuất hiện tại xã/phường trong 7 ngày qua**, hoặc **số ca trong 7 ngày ≥ 2 lần trung bình 4 tuần trước và ≥ 3 ca**.
- **Trạng thái:** không có báo cáo mới trong tuần thì hiện hộp "Tuần này chưa ghi nhận kiểu lừa mới" và gợi ý bài tuyên truyền theo kiểu nhiều nhất tháng.
- **NT:** nhìn màn hình là biết ngay kiểu lừa cần tuyên truyền. Số liệu khớp dữ liệu mẫu (120 / 42 / 35%).

### CN-08.2 Hàng chờ xác minh (MH-17) · P1
- Danh sách báo cáo chưa xác minh, gom theo cùng số, link hoặc STK.
- Thao tác: **Xác nhận lừa đảo** (đưa vào danh sách cảnh báo) · **Bác bỏ** (ghi lý do) · **Chuyển Công an**.
- **QT-21:** mọi thao tác được ghi nhật ký (ai, lúc nào). Số hoặc link bị đánh dấu nhầm có thể được **gỡ nhãn** khi đội TNV xử lý khiếu nại.

### CN-08.3 Tạo bài tuyên truyền (MH-18) · P1
- Chọn kiểu lừa, AI soạn sẵn **poster** (tiêu đề, 3 dấu hiệu, việc nên làm, mã QR tải app), **tin nhắn Zalo** gửi nhóm tổ dân phố, và **kịch bản nói 2 phút**.
- Đội sửa được trước khi tải về hoặc chia sẻ.

### CN-08.4 Xuất báo cáo · P1
- Báo cáo tuần/tháng gồm số liệu, danh sách ca đã xác minh và hoạt động tuyên truyền. Định dạng PDF, dùng **cho Đoàn cấp trên** và **cho Công an xã/phường**.

---

## 10. CN-09 Giọng nói và Dễ nhìn · Điểm cộng 2

| Chức năng | Mô tả | Ưu tiên |
|---|---|---|
| **Chế độ Dễ nhìn** | Chữ nội dung ≥ 20px, nút ≥ 64px, độ tương phản cao, mỗi màn tối đa 3 hành động | P0 |
| **Đọc to** | Nút 🔊 trên MH-06, MH-07, MH-11, MH-13, MH-14. Ở chế độ Dễ nhìn, nội dung quan trọng tự đọc khi mở màn | P0 |
| **Nói để nhập** | Nút 🎤 trong ô kiểm tra: đọc số điện thoại, app chuyển thành số | P1 |
| **Trợ lý hội thoại** (MH-19) | Nút "Bấm và kể". Người dùng kể tình huống, app nhận dạng kiểu lừa theo CN-03 và trả lời bằng giọng nói kèm gợi ý Hỏi người thân | P1 |

- **QT-22:** giọng đọc dùng tiếng Việt, tốc độ chậm hơn bình thường (khoảng 0,9×). Nên dùng giọng miền Nam nếu dịch vụ có hỗ trợ.
- **NT:** bật hoặc tắt Dễ nhìn trong ≤ 2 chạm từ Hồ sơ. Mọi kết quả kiểm tra đều đọc được thành tiếng.

---

## 11. CN-10 Kết nối kênh tin báo Công an · Điểm cộng 3

- **Vị trí nút "Gửi Công an":** MH-09, MH-10, MH-17.
- **Xử lý:**
  - Đóng gói **hồ sơ tin báo**: thời điểm, kênh, số/link/STK, kiểu lừa, mô tả, ảnh, xã/phường, số tiền (nếu có), mã báo cáo.
  - Cho chọn kênh: **113** (gọi) · kênh tiếp nhận tin báo chính thức của Công an (mở đường dẫn, nội dung được chép sẵn vào bộ nhớ tạm) · với link giả mạo thì thêm kênh báo cáo website lừa đảo của cơ quan an toàn thông tin.
- **QT-23:** app **không gửi tự động** và **không giả lập là đã gửi tới Công an**. App chỉ mở kênh chính thức. Trạng thái "Đã chuyển Công an" chỉ do đội TNV cập nhật.
- **QT-24:** danh sách kênh và đường dẫn **phải được kiểm chứng** và cấu hình được theo từng địa phương.
- **NT:** hồ sơ tin báo được chép đầy đủ, mở đúng kênh đã chọn.

---

## 12. CN-11 Hồ sơ và quyền riêng tư (MH-20) · P1

- Hồ sơ: tên gọi, vai trò, xã/phường, người thân tin cậy, công tắc Dễ nhìn và đọc to.
- Thành tích: điểm cao nhất, chứng nhận, số bài đã học.
- Báo cáo của tôi: danh sách và trạng thái.
- **Quyền riêng tư:** xóa lịch sử kiểm tra · xóa toàn bộ dữ liệu · xem app lưu những gì.
- **QT-25:** lịch sử kiểm tra **chỉ lưu trên máy**. Báo cáo ẩn danh không gắn danh tính người báo.

---

## 13. Dữ liệu (thực thể chính)

| Thực thể | Trường chính |
|---|---|
| NguoiDung | id, vai_tro, ten_goi, xa_phuong, de_nhin (bật/tắt) |
| NguoiThan | id, nguoi_dung_id, ten_goi, so_dien_thoai, quan_he, kenh, uu_tien |
| LuotKiemTra *(trên máy)* | thoi_diem, noi_dung, loai (SĐT/link/STK), muc, ly_do[], tinh_huong_id |
| MucCanhBao | gia_tri, loai, muc, nguon (chính thức/xác minh/cộng đồng), so_bao_cao, cap_nhat |
| BaoCao | ma, tinh_huong_id, kenh, gia_tri, mo_ta, anh[], xa_phuong, thoi_diem, da_chuyen_tien, so_tien, an_danh, trang_thai |
| TinhHuong | id (T01–T10), ten, kenh_chinh, doi_tuong, dau_hieu[3], nen_lam[] |
| BaiHoc | id, tinh_huong_id, cac_phan[4], cau_tu_kiem_tra |
| CauHoi | id, dang, noi_dung, dap_an, dau_hieu_dung[], giai_thich, tinh_huong_id |
| KetQuaThi | nguoi_dung_id, diem, cau_sai[], thoi_diem, dat_chung_nhan |
| HoiNguoiThan | id, nguoi_gui, nguoi_nhan, noi_dung, trang_thai, tra_loi, thoi_diem |
| BaiTuyenTruyen | id, tinh_huong_id, xa_phuong, poster, tin_zalo, kich_ban |

---

## 14. Yêu cầu phi chức năng

| Mã | Yêu cầu |
|---|---|
| PCN-01 | Kết quả kiểm tra trong ≤ 3 giây. Nếu AI không phản hồi trong 8 giây thì trả kết quả tầng luật |
| PCN-02 | Chữ nội dung ≥ 16px (Dễ nhìn ≥ 20px). Vùng chạm ≥ 48px (Dễ nhìn ≥ 64px). Tương phản đạt WCAG AA |
| PCN-03 | Mức kết quả luôn có **màu + biểu tượng + chữ**, đọc được thành tiếng |
| PCN-04 | Mọi màn có nút Quay lại. Thao tác làm mất dữ liệu đều hỏi xác nhận |
| PCN-05 | Kiểm tra vẫn hoạt động khi mất mạng, dùng danh sách đã tải về |
| PCN-06 | Thu tối thiểu dữ liệu, che dữ liệu nhạy cảm trước khi đưa cho AI, cho báo cáo ẩn danh, tuân thủ quy định pháp luật về bảo vệ dữ liệu cá nhân |
| PCN-07 | Giao diện mobile-first (rộng 360–430px). Riêng màn đội TNV dùng được cả trên máy tính bảng và máy tính |
| PCN-08 | Toàn bộ dữ liệu trong prototype là giả lập |

---

## 15. Đối chiếu yêu cầu đề với chức năng

| Yêu cầu của đề | Chức năng | Màn hình |
|---|---|---|
| Kiểm tra nhanh SĐT, đường dẫn, STK – 3 mức kèm lý do dễ hiểu | CN-02 | MH-05, MH-06 |
| Báo cáo một trường hợp lừa đảo | CN-04 | MH-08, MH-09 |
| Nút "Hỏi người thân" gửi nhanh cho người được chỉ định trước | CN-01.2, CN-05 | MH-02, MH-11 |
| Bài học ngắn 01 phút theo tình huống | CN-06 | MH-13 |
| Bài kiểm tra nhận diện lừa đảo có chấm điểm | CN-07 | MH-14, MH-15 |
| Màn hình đội tình nguyện: thống kê kiểu lừa mới tại địa phương | CN-08.1 | MH-16 |
| Điểm cộng: AI phân tích nội dung tin nhắn dán vào | CN-03 (và CN-08.3) | MH-07, MH-18 |
| Điểm cộng: chế độ giọng nói cho người cao tuổi | CN-09 | MH-19, MH-20 |
| Điểm cộng: kết nối kênh tiếp nhận tin báo của Công an | CN-10 | MH-09, MH-10, MH-17 |
| Dữ liệu mẫu: 10 tình huống, 120 báo cáo, 35% đường dẫn | Đặc tả sản phẩm mục 8 | MH-13, MH-16 |
| Người dùng: người cao tuổi · học sinh · đội TNV | CN-01, CN-09, CN-08 | MH-01, MH-03, MH-04, MH-16 |

---

## 16. Quyết định chờ duyệt

1. Ngưỡng phân mức (QT-07): **≥ 5 báo cáo độc lập trong 30 ngày** thì xếp Nguy hiểm.
2. Định nghĩa "kiểu mới" (QT-20).
3. Thời gian chờ trước khi gợi ý người thân thứ hai (QT-16): **2 phút**.
4. Ngưỡng chứng nhận (QT-19): **80 điểm**.
5. Số câu mỗi lượt kiểm tra: **10 cho Học sinh, 5 cho Ông bà**.
6. Phân định P0/P1 (có thể đổi khi có thang điểm của vòng thi).
