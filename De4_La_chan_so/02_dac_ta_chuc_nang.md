# ĐẶC TẢ CHỨC NĂNG – LÁ CHẮN SỐ

> Phiên bản 1.2 · 24/11/2026 · Đi kèm: [01_dac_ta_san_pham.md](01_dac_ta_san_pham.md)
> Quy ước: **CN** = chức năng · **QT** = quy tắc nghiệp vụ · **NT** = tiêu chí nghiệm thu · **MH** = màn hình (danh mục ở mục 6 của đặc tả sản phẩm)
> Mức ưu tiên: **P0** bắt buộc cho bài nộp · **P1** điểm cộng hoặc mở rộng · **P2** sau vòng thi

---

## 0. Nền tảng: ứng dụng web, giao diện ưu tiên điện thoại

- **Thiết kế cho điện thoại trước:** khung 360–430px, một cột. Trên màn hình rộng hơn, nội dung giữ tối đa 480px và căn giữa. Riêng màn đội TNV (MH-16 → MH-18) giãn thành 2–3 cột trên máy tính bảng và máy tính.
- **Thanh điều hướng dưới cùng** trong tầm ngón cái. Nút hành động chính nằm ở nửa dưới màn hình.
- **Trình duyệt mục tiêu:** Chrome trên Android và Safari trên iPhone (2 phiên bản gần nhất).
- **Cài lên màn hình chính** (P1): khai báo để trình duyệt cho phép "Thêm vào màn hình chính", có biểu tượng và tên "Lá Chắn Số". Đây là điều kiện để dùng khi mất mạng và nhận thông báo đẩy.

**Giới hạn của web và cách xử lý:**

| Khả năng | Giới hạn trên web | Cách xử lý trong sản phẩm |
|---|---|---|
| Dán từ bộ nhớ tạm | Trình duyệt hỏi quyền hoặc hiện bong bóng "Dán" | Nút "Dán" kèm gợi ý nhấn giữ ô nhập → Dán khi bị từ chối quyền |
| Chọn từ danh bạ | Chỉ một số trình duyệt Android hỗ trợ | Có hỗ trợ thì hiện nút "Chọn từ danh bạ", nếu không thì **nhập tay** (mặc định) |
| Quét mã QR | Cần quyền camera | Xin quyền khi bấm "Quét QR". Có thể chọn ảnh mã QR có sẵn trong máy thay vì quét |
| Gửi SMS / Zalo | Web không tự gửi tin được | SMS: mở ứng dụng tin nhắn với nội dung soạn sẵn. Zalo: **chép nội dung vào bộ nhớ tạm** rồi mở Zalo đến đúng người, người dùng chỉ cần dán và gửi |
| Gọi điện | – | Đường dẫn gọi điện, mở trình quay số với số có sẵn |
| Thông báo đẩy cho người thân | iPhone chỉ nhận khi web đã được thêm vào màn hình chính | Người thân đã cài thì gửi thông báo. Nếu chưa thì dùng SMS/Zalo |
| Nhận và đọc giọng nói tiếng Việt | Giọng và độ chính xác khác nhau tùy máy | Kiểm tra máy có hỗ trợ không. Không hỗ trợ thì ẩn nút 🎤, giữ nút 🔊 (dự phòng bằng dịch vụ giọng nói) |
| Dùng khi mất mạng | Cần lưu sẵn dữ liệu trên máy | Lưu giao diện, danh sách cảnh báo và 10 bài học trên máy |
| Chia sẻ | – | Dùng bảng chia sẻ của điện thoại cho chứng nhận, bài tuyên truyền, kết quả |

---

## 1. Vai trò và quyền

| Role tài khoản | Mô tả | Được dùng |
|---|---|---|
| **Người dùng** | Người dân; nhóm nội dung có thể là Người cao tuổi hoặc Học sinh | Kiểm tra, phân tích tin nhắn, hỏi người tin cậy, báo cáo, học, kiểm tra nhận diện |
| **Tình nguyện viên** | Thành viên chi đoàn được giao nhiệm vụ; có thể là học sinh | Chức năng Người dùng và nhiệm vụ/buổi/hộ được giao, tài liệu đã duyệt, nộp kết quả, thống kê tổng hợp |
| **Điều phối viên** | Người có chức trách cao hơn quản lý hoạt động trong phạm vi được cấp | Chức năng Người dùng và lập kế hoạch, phân công, quản lý thành viên, duyệt tài liệu/kết quả, tổng hợp báo cáo |

Quyền duyệt cảnh báo cấp riêng; người thân là quan hệ hỗ trợ; người tham gia buổi là ngữ cảnh. Không tạo role riêng cho các trường hợp này.

**QT-01:** **Không bắt buộc đăng nhập để tự bảo vệ.** Người đang hoảng không bị chặn ở màn đăng nhập.

| Dùng được khi **chưa đăng nhập** (dữ liệu lưu trên máy) | **Cần tài khoản** (CN-15) |
|---|---|
| Kiểm tra nhanh, phân tích tin nhắn, bài học, bài kiểm tra (không lưu điểm), báo cáo **ẩn danh**, Hỏi người thân (danh sách người thân lưu trên máy), tham gia buổi tuyên truyền bằng QR | Báo cáo có tên và theo dõi trạng thái · đồng bộ người thân và lịch sử giữa các máy · lưu điểm, nhận Chứng nhận có tên · cộng điểm Thi đua chi đoàn · **công tác được cấp quyền** (TNV/điều phối); đăng nhập không tự cấp quyền duyệt cảnh báo |

Khi người chưa đăng nhập chạm vào chức năng cần tài khoản, app hiện bottom sheet "Đăng nhập để lưu và theo dõi" với hai nút **Đăng nhập** và **Để sau**. Riêng chức năng của Đội TNV thì không có nút "Để sau".

---

## 2. CN-01 Khởi đầu (MH-01, MH-02) · P0

### CN-01.1 Chọn trải nghiệm, không chặn sử dụng

- Mở trang chủ lần đầu: hiện ngay ô kiểm tra và lựa chọn “Chữ lớn, dễ dùng”. Không bắt đăng nhập, chọn nhóm hoặc khai tuổi trước kiểm tra. Link kết quả, buổi QR và yêu cầu hỗ trợ giữ đúng đích ban đầu.
- MH-01 là bước tùy chọn khi cá nhân hóa: hỏi “Bạn muốn xem nội dung dành cho ai?” → Người cao tuổi / Học sinh / Để sau. Chọn nhóm chỉ gợi ý chế độ, không ghi đè lựa chọn hiển thị người dùng đã đặt.
- Dễ nhìn → MH-03; Tiêu chuẩn → MH-04, độc lập với nhóm nội dung. Chưa chọn nhóm: nội dung chung, không đoán tuổi. Trường/lớp chỉ hỏi khi tham gia thi đua, địa phương khi cần báo cáo hoặc nội dung địa phương.
- MH-20 → Cách hiển thị: đổi Dễ nhìn/Tiêu chuẩn, bật/tắt nghe đọc. MH-20 có mục riêng Nội dung phù hợp để đổi nhóm. Đổi các lựa chọn này không sửa role hay phân công.
- MH-20 → Công tác tuyên truyền: có quyền TNV mở MH-28, điều phối viên mở MH-29; chưa được cấp quyền thì xem Yêu cầu tham gia/Chờ duyệt. Có lối Về trang cá nhân ở khu công tác.
- MH-02 cài người tin cậy là tùy chọn, chỉ mở khi người dùng chọn thiết lập hoặc cần hỗ trợ mà chưa có người. Không ép đi qua MH-02/MH-02a sau kiểm tra.
- Mã đỡ đầu chỉ đề xuất nhóm Người cao tuổi và Dễ nhìn; liên kết sau đồng ý, không đổi danh tính, role hoặc tùy chọn hiển thị đã đặt.
- NT: học sinh dùng Dễ nhìn và người cao tuổi dùng Tiêu chuẩn được; cả hai vẫn có toàn bộ công cụ tự bảo vệ. Kiểm tra dùng được khi chưa chọn nhóm. Đổi chế độ rồi tải lại giữ lựa chọn; quyền công tác không thay đổi.

### CN-01.2 Cài người thân tin cậy ("chỉ định trước")
- **Đầu vào:** 1–3 người. Mỗi người có tên gọi, số điện thoại (nhập tay, hoặc chọn từ danh bạ nếu trình duyệt hỗ trợ – xem mục 0), quan hệ (con, cháu, vợ/chồng, thầy cô, anh chị Đoàn, khác), kênh nhận (Zalo, SMS, cuộc gọi). Đánh dấu **1 người ưu tiên**.
- **QT-02:** người đầu tiên được thêm sẽ mặc định là người ưu tiên.
- **QT-03:** Học sinh có sẵn gợi ý quan hệ "Thầy cô chủ nhiệm" và "Anh chị Đoàn".
- **Trạng thái:**
  - Chưa có ai: hộp trống với nội dung "Thêm người thân để dùng nút Hỏi người thân".
  - Cho phép **"Để sau"**. Nút Hỏi người thân khi đó hiện nhãn "Chưa cài – bấm để thêm".
- **NT:** lưu thành công thì danh sách hiện ngay ở MH-11. Không lưu trùng số điện thoại.

### CN-01.3 Gợi ý "Thêm vào màn hình chính" · P1
- **Khi nào hiện:** sau khi cài người thân (hoặc bấm "Để sau"), với người dùng chưa thêm web vào màn hình chính.
- **Nội dung:** một thẻ ngắn "Thêm Lá Chắn Số ra màn hình chính để mở nhanh khi có cuộc gọi lạ", kèm **hướng dẫn bằng hình theo từng trình duyệt**:
  - Chrome Android: nút "Cài đặt" của trình duyệt.
  - Safari iPhone: Chia sẻ → Thêm vào MH chính.
- **Lựa chọn:** "Thêm ngay" · "Để sau". Bấm "Để sau" thì nhắc lại sau 3 lần sử dụng, tối đa 2 lần.
- **QT-26:** với nhóm nội dung Người cao tuổi, bước này được làm nổi bật, vì nó là điều kiện để nhận thông báo và dùng khi mất mạng. Đội TNV có thể làm hộ.
- **NT:** không chặn người dùng ở bước này. Sau khi thêm thành công thì không hiện lại.

---

## 2A. CN-15 Tài khoản bằng Firebase Authentication (MH-25, MH-26, MH-27) · P0

**Nền tảng (đã chốt): Firebase Authentication**, đi cùng **Cloud Firestore** (hồ sơ người dùng), **Cloud Functions** (quyền Đội TNV, dọn dữ liệu khi xóa tài khoản) và **Firebase Hosting** (HTTPS, cùng tên miền với trang đăng nhập Google).

**Nhà cung cấp đăng nhập bật trong Firebase:**

| Nhà cung cấp | Dùng cho |
|---|---|
| **Phone** (OTP qua SMS) | Xác thực số điện thoại khi đăng ký · quên mật khẩu · bổ sung số sau Google |
| **Email/Password** | Đăng nhập hằng ngày bằng **số điện thoại + mật khẩu** (QT-34) |
| **Google** | "Tiếp tục với Google" |
| **Anonymous** | "Dùng ngay, không cần tài khoản" (QT-01). Dữ liệu được giữ khi người dùng tạo tài khoản sau |

- **QT-34 – Số điện thoại + mật khẩu trên Firebase:** Firebase không có sẵn kiểu đăng nhập này, nên app làm như sau.
  - Khi đăng ký, xác thực số bằng OTP (Phone), rồi **gắn thêm** thông tin Email/Password bằng `linkWithCredential`. Email là một **email nội bộ sinh từ số điện thoại** theo dạng E.164, ví dụ `+84912000001@sdt.lachanso.vn`. Người dùng không bao giờ thấy email này.
  - Khi đăng nhập, người dùng nhập số + mật khẩu. App đổi số sang email nội bộ rồi gọi `signInWithEmailAndPassword`.
  - Một tài khoản (một `uid`) có thể gắn đủ Phone, Email/Password và Google.

### CN-15.1 Đăng nhập (MH-25)
- **Trên màn:** khối thương hiệu · ô **Số điện thoại** · ô **Mật khẩu** (nút chữ Hiện/Ẩn) · công tắc **Ghi nhớ trên máy này** · nút **Đăng nhập** · "hoặc" · **Tiếp tục với Google** · **Quên mật khẩu?** · **Tạo tài khoản mới** · **Dùng ngay, không cần tài khoản**.
- **Xử lý:**
  - Thành công: đọc hồ sơ `users/{uid}` trên Firestore. Quay lại đích đang làm; không có đích thì về trang cá nhân theo chế độ hiển thị, MH-01 là tùy chọn.
  - Google: dùng `signInWithPopup`. Trình duyệt chặn cửa sổ bật lên thì chuyển sang `signInWithRedirect`. Lần đầu đăng nhập thì sang MH-26 bước "Xác thực số điện thoại".
- **QT-35 – Ghi nhớ:** bật thì dùng `browserLocalPersistence` (giữ đăng nhập đến khi đăng xuất). Tắt thì dùng `browserSessionPersistence` (thoát khi đóng tab).
- **QT-36 – Chống dò mật khẩu:** dùng cơ chế chặn của Firebase. Khi gặp lỗi `auth/too-many-requests`, hiện "Đăng nhập tạm bị khóa do thử sai nhiều lần. Hãy thử lại sau hoặc dùng Quên mật khẩu". Bật **Email enumeration protection** để lỗi không tiết lộ số điện thoại đã có tài khoản hay chưa.
- **Bảng lỗi Firebase → câu hiển thị:**

| Mã lỗi Firebase | Câu hiển thị |
|---|---|
| `auth/invalid-credential`, `auth/wrong-password`, `auth/user-not-found` | Số điện thoại hoặc mật khẩu chưa đúng |
| `auth/too-many-requests` | Tạm khóa do thử sai nhiều lần (QT-36) |
| `auth/network-request-failed` | Cần có mạng để đăng nhập. Bạn vẫn kiểm tra số lạ được (kèm nút sang MH-05) |
| `auth/popup-closed-by-user` | Bạn đã đóng cửa sổ Google. Hãy thử lại |
| `auth/invalid-verification-code` | Mã chưa đúng, kiểm tra lại tin nhắn |
| `auth/code-expired` | Mã đã hết hạn, hãy bấm Gửi lại mã |
| `auth/credential-already-in-use` | Số này đã có tài khoản. Hãy đăng nhập |

- **NT:** người cao tuổi đăng nhập được trong ≤ 3 thao tác nhập. Thông báo lỗi không lộ mã lỗi kỹ thuật.

### CN-15.2 Đăng ký bằng số điện thoại (MH-26, 3 bước)
| Bước | Nội dung | Firebase |
|---|---|---|
| 1. Số điện thoại | Nhập số → **Gửi mã** | Kiểm tra người dùng bằng **reCAPTCHA vô hình** (`RecaptchaVerifier`, size `invisible`) → `signInWithPhoneNumber`. Nếu đang dùng ẩn danh thì dùng `linkWithPhoneNumber` để giữ dữ liệu |
| 2. Mã xác thực | **6 ô** mã OTP · đếm ngược "Gửi lại sau 60 giây" · dòng cảnh báo **"Lá Chắn Số không bao giờ gọi điện hay nhắn tin hỏi mã này. Không đưa mã cho ai."** | `confirmationResult.confirm(code)` |
| 3. Mật khẩu và tên gọi | Mật khẩu (Hiện/Ẩn) · độ mạnh bằng chữ · tên gọi · đồng ý điều khoản và chính sách dữ liệu | `linkWithCredential(EmailAuthProvider.credential(emailNoiBo, matKhau))` · `updateProfile({displayName})` · tạo `users/{uid}` trên Firestore |

Sau bước 3 quay lại đích ban đầu hoặc trang cá nhân; có thể chọn cá nhân hóa ở MH-01 và thiết lập người tin cậy sau.
- **QT-37 – Mã OTP:** độ dài, thời hạn và hạn mức gửi do Firebase quản lý. App chỉ khóa nút "Gửi lại mã" trong **60 giây** để tránh bấm liên tục.
- **QT-38 – Mật khẩu:** bật **chính sách mật khẩu** của Firebase Authentication: tối thiểu **8 ký tự**, có chữ và số. Firebase tự băm mật khẩu (scrypt), app không bao giờ lưu hay ghi mật khẩu.
- **QT-39 – Học sinh dưới 16 tuổi (P1):** ở MH-01, học sinh khai năm sinh. Dưới 16 tuổi thì cần **cha mẹ hoặc giáo viên chủ nhiệm xác nhận** bằng OTP gửi tới số của người đó. Kết quả lưu trong `users/{uid}.xacNhanGiamHo`. Điều khoản pháp lý cụ thể về dữ liệu cá nhân trẻ em cần kiểm chứng.
- **Cấu hình Firebase cần làm:** bật nhà cung cấp Phone · thêm **Việt Nam (+84)** vào **SMS region policy** · khai báo tên miền Hosting trong **Authorized domains** · khai báo **số điện thoại thử nghiệm** (mã cố định) để trình diễn không tốn SMS.
- **NT:** tạo được tài khoản trong ≤ 2 phút. Số chưa xác thực OTP thì không gắn được mật khẩu.

### CN-15.3 Google
- Nút **"Tiếp tục với Google"** đúng nhận diện nút đăng nhập của Google, có logo. Đây là ngoại lệ được phép với quy tắc ít icon (DESIGN.md mục 1A).
- Lần đầu: lấy tên và email từ Google, rồi sang bước **Xác thực số điện thoại** (`linkWithPhoneNumber`, bước 1–2 của MH-26):
  - **Bắt buộc** với Đội TNV.
  - **Bỏ qua được** với Ông bà và Học sinh.
- **QT-40:** Firebase để mặc định **một tài khoản cho mỗi email**. Nếu email Google trùng một tài khoản đã có, Firebase trả `auth/account-exists-with-different-credential`. Khi đó app hướng dẫn đăng nhập bằng cách cũ rồi gắn Google trong Hồ sơ.

### CN-15.4 Quên mật khẩu (MH-27)
- Firebase gửi link đặt lại qua email, nhưng email nội bộ không nhận thư. Vì vậy:
  - Nhập số → OTP (`signInWithPhoneNumber`) → đăng nhập bằng số điện thoại → `updatePassword(matKhauMoi)`. Vừa xác thực xong nên không cần đăng nhập lại.
  - Về MH-25 với thông báo "Đã đổi mật khẩu".
- Tài khoản chưa gắn mật khẩu (chỉ dùng Google) thì hiện "Tài khoản này đăng nhập bằng Google" kèm nút Google.

### CN-15.5 Hồ sơ, vai trò, quyền
- **Hồ sơ trên Firestore** `users/{uid}`: role, nhóm nội dung, chế độ hiển thị, tùy chọn nghe đọc, tên gọi, xã/phường, chi đoàn và người thân tin cậy. **Security Rules:** mỗi người chỉ đọc và ghi hồ sơ của chính mình.
- **Quyền công tác không tự khai được:** lời mời/mã đội chỉ yêu cầu tham gia. Backend kiểm tra quyền TNV, điều phối hoặc duyệt cảnh báo cùng đơn vị, địa bàn và phân công ở từng thao tác; không dùng một claim địa phương để mở toàn bộ hàng chờ và danh sách hộ. Đổi trải nghiệm hiển thị không cấp thêm quyền.
- **Trong MH-20:** xem số điện thoại và Google đã gắn · gắn hoặc gỡ Google · đổi mật khẩu · **Đăng xuất** (`signOut`) · **Đăng xuất mọi máy** (Cloud Function gọi `revokeRefreshTokens`) · **Xóa tài khoản** (`user.delete()`, Cloud Function xóa `users/{uid}`; báo cáo ẩn danh đã gửi vẫn giữ để thống kê).

### CN-15.6 Người cao tuổi
- Màn đăng nhập theo chế độ **Dễ nhìn**: chữ ≥ 20px, ô nhập cao 68px.
- **Đoàn viên đỡ đầu** (CN-12) có thể giúp cụ đăng ký trên máy của cụ. OTP gửi về số của cụ, **cụ tự đọc mã**. Đoàn viên không nhận mã thay cụ.

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
| Quét QR chuyển khoản | Đọc mã QR chuyển khoản ngân hàng bằng camera hoặc từ ảnh có sẵn, lấy STK, ngân hàng, số tiền | P1 |

### CN-02.2 Tự nhận dạng loại dữ liệu
| Loại | Quy tắc nhận dạng (đề xuất) | Dòng chữ hiển thị dưới ô (không icon) |
|---|---|---|
| Số điện thoại | Sau khi bỏ khoảng trắng, dấu chấm, gạch: `0` + 9 số, hoặc `+84`/`84` + 9 số | "Nhận ra: Số điện thoại" |
| Đường link | Có `http`, `www.` hoặc dạng `tên.miền` | "Nhận ra: Đường link" |
| Số tài khoản | 6–19 chữ số, không khớp định dạng số điện thoại | "Nhận ra: Số tài khoản" |
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

**QT-07 – Quy tắc phân mức** (đã chốt, xem mục 16):

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
  - Từ màn kết quả: **2 chạm** để người thân nhận tin qua thông báo (Hỏi người thân → Gửi) hoặc để gọi người thân (Hỏi người thân → Gọi ngay). **3 chạm** khi gửi qua SMS hoặc Zalo (thêm chạm "Gửi" trong ứng dụng tin nhắn).

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
  - Bấm nút thì hiện thẻ người ưu tiên, bản xem trước tin nhắn và **hai nút to ngang hàng**: **"Gửi cho [tên]"** và **"Gọi [tên] ngay"**.
  - **QT-27:** ở chế độ Dễ nhìn (Ông bà), **"Gọi ngay" đứng trước "Gửi"**, vì gọi điện chỉ mất 1 chạm và người thân phản ứng nhanh nhất.
  - Có thể đổi sang người khác trong danh sách.
- **Nội dung soạn sẵn** (tự điền từ ngữ cảnh):
  > "[Mẹ] vừa nhận [cuộc gọi] từ [0909 xxx xxx]. Lá Chắn Số báo **[NGUY HIỂM – giả danh Công an]**. [Con] gọi lại cho [mẹ] ngay nhé."
- **Kênh gửi:**
  - Người thân đã thêm Lá Chắn Số vào màn hình chính: gửi bằng **thông báo đẩy**, đúng 1 chạm. Prototype mô phỏng cách này.
  - Nếu chưa: **SMS** mở ứng dụng tin nhắn với nội dung soạn sẵn. **Zalo** chép nội dung vào bộ nhớ tạm rồi mở Zalo đến đúng người. Người dùng chạm thêm "Gửi" (hoặc Dán → Gửi trên Zalo).
  - Nút **Gọi ngay** mở trình quay số với số có sẵn (xem QT-27).
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

- **QT-17:** mỗi lượt gồm 10 câu ở Tiêu chuẩn hoặc **5 câu ở Dễ nhìn**, độc lập với nhóm nội dung. Tin thật chiếm **20–30%**. Thứ tự câu và đáp án được xáo trộn.
- **QT-18:** Ông bà làm bài **không tính giờ**, có giọng đọc.

### CN-07.2 Chấm điểm
- Thang **100 điểm**, chia đều theo số câu. Câu "chạm vào dấu hiệu" được tính điểm theo tỷ lệ chạm đúng, trừ điểm khi chạm sai.
- **Giải thích ngay** sau từng câu: đúng hay sai, và vì sao.
- **Màn kết quả (MH-15):** tổng điểm · **kiểu lừa còn yếu** · gợi ý bài học tương ứng · nút Làm lại.
- **QT-19:** đạt **≥ 80 điểm** thì nhận **Chứng nhận Lá Chắn Số** (xem và chia sẻ được dưới dạng ảnh).
- **Thi đua:** điểm của học sinh và đoàn viên được cộng vào **Thi đua chi đoàn** (CN-14), **không công khai điểm cá nhân**.
- **NT:** điểm tính đúng theo QT-17/18. Mỗi câu đều có giải thích. Chứng nhận chỉ mở khi đạt ngưỡng.

---

## 9. CN-08 Đội tình nguyện (MH-16, MH-17, MH-18) · P0 · Bắt buộc 6

### CN-08.1 Thống kê kiểu lừa mới tại địa phương (MH-16) · P0
- **Bộ lọc:** xã/phường (mặc định là xã/phường của đội) · khoảng thời gian (tuần, tháng) · đối tượng bị nhắm (người cao tuổi, học sinh, tất cả).
- **Khối "MỚI TUẦN NÀY"** đặt trên cùng: tên kiểu lừa · mức tăng · đối tượng bị nhắm · TNV có nút **Xem tài liệu / Đề xuất chủ đề**; điều phối viên có nút **Lập buổi tuyên truyền**.
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
- Chỉ người có quyền duyệt cảnh báo trong địa bàn được thao tác; TNV chỉ bổ sung thông tin. Thao tác: **Xác nhận lừa đảo** (đưa vào danh sách cảnh báo) · **Bác bỏ** (ghi lý do) · **Chuyển Công an**.
- **QT-21:** mọi thao tác được ghi nhật ký (ai, lúc nào). Số hoặc link bị đánh dấu nhầm có thể được **gỡ nhãn** khi người có quyền duyệt xử lý khiếu nại, ghi căn cứ và lý do.

### CN-08.3 Tạo bài tuyên truyền (MH-18) · P1
- Chọn kiểu lừa, AI soạn sẵn **poster** (tiêu đề, 3 dấu hiệu, việc nên làm, mã QR tải app), **tin nhắn Zalo** gửi nhóm tổ dân phố, và **kịch bản nói 2 phút**.
- TNV dùng bản đã duyệt hoặc đề xuất bản nháp. Điều phối viên duyệt và phát hành phiên bản; bản cần sửa trả lại kèm lý do. Không phát hành bản nháp như tài liệu chính thức.

### CN-08.4 Xuất báo cáo · P1
- Chỉ điều phối viên xuất tổng hợp trong phạm vi quản lý; TNV xem kết quả nhiệm vụ của mình. Báo cáo tuần/tháng gồm số liệu, danh sách ca đã xác minh và hoạt động tuyên truyền. Định dạng PDF, dùng **cho Đoàn cấp trên** và **cho Công an xã/phường**.

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
- **QT-23:** app **không gửi tự động** và **không giả lập là đã gửi tới Công an**. App chỉ mở kênh chính thức. Trạng thái "Đã chuyển Công an" chỉ do người có quyền duyệt cảnh báo cập nhật kèm căn cứ chuyển; mở đường dẫn chưa phải đã chuyển.
- **QT-24:** danh sách kênh và đường dẫn **phải được kiểm chứng** và cấu hình được theo từng địa phương.
- **NT:** hồ sơ tin báo được chép đầy đủ, mở đúng kênh đã chọn.

---

## 12. CN-11 Hồ sơ và quyền riêng tư (MH-20) · P1

- Hồ sơ: tên gọi, role được cấp, nhóm nội dung, xã/phường, người thân tin cậy, Cách hiển thị và tùy chọn nghe đọc.
- Thành tích: điểm cao nhất, chứng nhận, số bài đã học.
- Báo cáo của tôi: danh sách và trạng thái.
- **Quyền riêng tư:** xóa lịch sử kiểm tra · xóa toàn bộ dữ liệu · xem app lưu những gì.
- **QT-25:** lịch sử kiểm tra **chỉ lưu trên máy**. Báo cáo ẩn danh không gắn danh tính người báo.

---

## 12A. CN-12 Đoàn viên đỡ đầu số (MH-21) · P0 · Sáng tạo

- **Mục tiêu:** cụ sống một mình hoặc xa con cháu vẫn có **người thân dự phòng** khi bấm Hỏi người thân.
- **Danh sách hộ đỡ đầu (MH-21):** tên gọi cụ, ấp/khu phố, tình trạng (đã cài app · đã có người thân · sống một mình), lần liên lạc gần nhất, số lần cụ hỏi trong tháng.
- **Thêm hộ đỡ đầu sau phân công của điều phối viên; TNV chỉ xem hộ được giao:**
  1. Đoàn viên bấm "Thêm hộ" và app tạo **mã liên kết** (mã QR kèm 6 số).
  2. Đoàn viên mở web trên máy của cụ và quét hoặc nhập mã. App đề xuất nhóm Người cao tuổi và Dễ nhìn, giữ tùy chọn đã đặt, điền sẵn đoàn viên vào danh sách người thân (CN-01).
  3. **Cụ đồng ý** bằng nút "Đồng ý để cháu [tên] hỗ trợ". Không có bước này thì không liên kết.
- **QT-28:** nếu cụ không có người thân nào khác, đoàn viên đỡ đầu là **người ưu tiên**. Nếu có, đoàn viên là **người thứ hai**, được gợi ý sau 2 phút (QT-16).
- **QT-29:** mỗi đoàn viên đỡ đầu tối đa **5 hộ**. Cụ có thể hủy liên kết bất cứ lúc nào trong Hồ sơ.
- **Nhận cảnh báo:** khi cụ bấm Hỏi người thân, đoàn viên nhận như người thân (MH-12) và hộ đó được tô nổi trên MH-21.
- **Nhắc thăm hỏi:** sau **14 ngày** không liên lạc thì nhắc đoàn viên. Đoàn viên ghi nhanh "Đã thăm / Đã gọi".
- **Trạng thái trống:** chưa đỡ đầu hộ nào thì hiện hộp "Bạn chưa đỡ đầu hộ nào. Mỗi đoàn viên có thể giúp tối đa 5 hộ", kèm nút "Thêm hộ".
- **NT:** liên kết chỉ thành công khi cụ đồng ý. Đoàn viên xuất hiện đúng vị trí trong danh sách người thân của cụ (QT-28).

---

## 12B. CN-13 Buổi tuyên truyền có QR (MH-22, MH-23) · P0 · Sáng tạo

- **Tạo buổi (MH-22), chỉ điều phối viên:**
  - Đầu vào: tên buổi, địa điểm (ấp/khu phố/trường), thời gian, **chủ đề** (1–2 kiểu lừa, gợi ý sẵn kiểu đang "MỚI" từ MH-16).
  - Đầu ra: **mã QR lớn** để chiếu hoặc in, đường dẫn ngắn `/buoi/:ma`.
- **Người tham gia** (quét QR, không cần tài khoản):
  1. Chọn nhóm: Người cao tuổi / Học sinh / Người dân.
  2. Xem **bài học 1 phút** theo chủ đề (MH-13).
  3. Làm **5 câu kiểm tra** (MH-14).
  4. Xem điểm, nhận chứng nhận nếu đạt, có thể lưu web vào màn hình chính.
- **Kết quả buổi (MH-23)**, cập nhật trực tiếp: **số người tham gia**, **điểm trung bình**, **tỷ lệ đạt ≥ 80**, câu sai nhiều nhất (gợi ý nội dung cần nhấn mạnh), cơ cấu nhóm tham gia.
- **QT-30:** mỗi thiết bị chỉ tính một lượt cho mỗi buổi. Buổi tự đóng sau **24 giờ**.
- **QT-31:** số liệu học trực tiếp là tạm tính; thành tích hoạt động chỉ cộng sau duyệt tại MH-30. Kết quả học được cộng vào KPI "số người đã học" của MH-16, vào báo cáo xuất (CN-08.4) và vào điểm thi đua của chi đoàn tổ chức (CN-14).
- **Trạng thái trống:** buổi chưa có ai tham gia thì hiện "Đang chờ người tham gia, hãy chiếu mã QR lên màn hình".
- **NT:** quét QR là vào thẳng bài học, không qua bước khởi đầu. Số liệu trên MH-23 khớp số lượt làm bài.

---

## 12C. CN-14 Thi đua chi đoàn (MH-24) · P0 · Sáng tạo

- **Phạm vi xếp hạng:** trong trường (giữa các lớp) · trong xã/phường (giữa các chi đoàn).
- **QT-32 – điểm thi đua** (thang 100):

| Thành phần | Tỷ trọng | Cách tính |
|---|---|---|
| Kết quả học | 40% | Điểm trung bình bài kiểm tra của thành viên chi đoàn |
| Mức tham gia | 20% | Tỷ lệ thành viên đã làm ít nhất 1 bài kiểm tra |
| Tuyên truyền | 20% | Số người tham gia các buổi tuyên truyền do chi đoàn tổ chức (CN-13) |
| Hỗ trợ người dân | 20% | Hoạt động hỗ trợ hộ đỡ đầu đã được duyệt; không tính số ca xác nhận lừa đảo |

- **Hiển thị:** bảng xếp hạng có vị trí của chi đoàn mình được tô nổi · 4 thành phần điểm của chi đoàn mình · gợi ý "Để lên hạng: tổ chức thêm 1 buổi tuyên truyền".
- **QT-33:** chỉ công khai điểm **theo chi đoàn**, không công khai điểm cá nhân.
- **Trạng thái trống:** chi đoàn chưa có hoạt động thì hiện "Chi đoàn chưa có điểm. Hãy làm bài kiểm tra đầu tiên".
- **NT:** tổng tỷ trọng là 100%. Tên chi đoàn trong dữ liệu mẫu là giả lập.

---

## CN-16 Phân công và thực hiện hoạt động · P0

| Màn | Người dùng | Nội dung |
|---|---|---|
| MH-28 Việc của tôi | TNV | Buổi sắp tới, nhận nhiệm vụ, tài liệu đã duyệt, hộ được giao |
| MH-29 Quản lý hoạt động | Điều phối viên | Kế hoạch, thành viên, phân công, kết quả chờ duyệt và báo cáo |
| MH-30 Chi tiết nhiệm vụ | Theo quyền | TNV nhận/từ chối, vận hành buổi và nộp kết quả; điều phối viên theo dõi, duyệt hoặc trả bổ sung |

Luồng: Điều phối viên xem tình hình địa phương MH-16 → tạo buổi MH-22, chọn tài liệu đã duyệt, phân công → TNV nhận tại MH-28/MH-30 → trực tiếp tuyên truyền, mở QR buổi được giao → người dân học và làm bài → MH-23 ghi số liệu tạm tính → TNV nộp kết quả → điều phối viên duyệt → tổng hợp hoạt động và thi đua.

- Nhiệm vụ: Chờ nhận → Đã nhận → Đang thực hiện → Chờ duyệt → Hoàn thành. Từ chối kèm lý do trả về điều phối viên để giao lại. Yêu cầu bổ sung trả về TNV, giữ lịch sử các lần nộp.
- Buổi: Nháp → Đã phân công → Đang diễn ra → Kết thúc thu bài → Chờ duyệt kết quả → Hoàn thành; có nhánh Hủy. Đóng QR sau 24 giờ không tự duyệt hoạt động.
- TNV chỉ vận hành buổi được giao, không tự đổi lịch, hủy buổi, sửa phân công hoặc duyệt kết quả của mình. Nộp lại không tạo điểm/kết quả trùng.
- Thống kê học trực tiếp có nhãn tạm tính; chỉ hoạt động đã duyệt mới tính thành tích hoạt động. Giữ riêng số liệu học và kết quả duyệt hoạt động.
- Đỡ đầu: điều phối viên phân công → TNV đề nghị liên kết → cụ đồng ý → TNV hỗ trợ. Chuyển TNV cần cụ đồng ý lại; hủy liên kết thu hồi quyền người cũ.
- Trạng thái bắt buộc: chờ cấp quyền, không có quyền, chưa có nhiệm vụ, từ chối, đổi lịch, buổi bị hủy, gửi thất bại giữ nháp, chờ duyệt, cần bổ sung, hoàn thành. Đổi lịch/hủy phải thông báo TNV.
- NT: TNV không xem/sửa dữ liệu cá nhân và nhiệm vụ ngoài phân công; điều phối viên chỉ quản lý phạm vi được cấp. Phân công/duyệt/trả bổ sung lưu người thực hiện, thời điểm, lý do. Cách cấp quyền điều phối viên đầu tiên cần chốt trước triển khai thật.

## 13. Dữ liệu (thực thể chính)

| Thực thể | Trường chính |
|---|---|
| NguoiDung (Firestore `users/{uid}`) | uid (từ Firebase Authentication), role (nguoi_dung/tnv/dieu_phoi), nhom_noi_dung (chua_chon/nguoi_cao_tuoi/hoc_sinh), che_do_hien_thi (de_nhin/tieu_chuan), doc_to, ten_goi, xa_phuong, chi_doan, nguoi_than[], de_nhin, xac_nhan_giam_ho |
| Tài khoản, mật khẩu, mã OTP, phiên đăng nhập | **Do Firebase Authentication quản lý**, app không lưu |
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
| ChiDoan | id, ten, loai (lớp THPT / chi đoàn khu phố), truong, xa_phuong |
| DoDau | id, doan_vien_id, nguoi_cao_tuoi_id, ma_lien_ket, dong_y (thời điểm), vai_tro (ưu tiên/thứ hai), lan_lien_lac_cuoi |
| BuoiTuyenTruyen | ma, chi_doan_id, ten, dia_diem, thoi_gian, chu_de[], nguoi_tao, nguoi_phu_trach, tai_lieu_phien_ban, trang_thai_buoi, trang_thai_thu_bai |
| PhanCong | id, buoi_ma, tnv_uid, nhiem_vu, han, trang_thai, ly_do |
| KetQuaHoatDong | id, buoi_ma, nguoi_nop, phien_ban, noi_dung, trang_thai_duyet, nguoi_duyet, ly_do, thoi_diem |
| QuyenCongTac | uid, don_vi, dia_ban, quyen[], nguoi_cap, thu_hoi |
| LuotThamGia | buoi_ma, thiet_bi, nhom, diem, cau_sai[], thoi_diem |

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
| PCN-07 | **Ứng dụng web, giao diện ưu tiên điện thoại** (360–430px, cột nội dung tối đa 480px trên màn hình rộng). Riêng màn đội TNV giãn ra trên máy tính bảng và máy tính. Chạy tốt trên Chrome Android và Safari iPhone. Xem mục 0 |
| PCN-09 | Lần đầu mở trang hiển thị trong ≤ 3 giây trên mạng 4G. Giao diện không phụ thuộc thư viện tải từ máy chủ ngoài |
| PCN-08 | Toàn bộ dữ liệu trong prototype là giả lập |
| PCN-10 | **Bảo mật tài khoản (Firebase):** Firebase Hosting, chỉ HTTPS · mật khẩu do Firebase băm (scrypt) · bật Email enumeration protection, chính sách mật khẩu, SMS region policy chỉ +84 · reCAPTCHA cho đăng nhập số điện thoại · Firestore Security Rules: chỉ đọc/ghi dữ liệu của mình, quyền công tác tách riêng theo vai trò, địa bàn và phân công · không ghi mật khẩu hay OTP vào nhật ký · nên bật App Check (P1) |
| PCN-11 | **Mã nguồn Firebase SDK được đóng gói cùng web** (bản dựng chung kết dùng công cụ đóng gói), không tải SDK từ CDN, để giữ PCN-09. Đăng nhập cần có mạng, còn Kiểm tra nhanh vẫn chạy khi mất mạng |

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
| Nền tảng: ứng dụng web, giao diện ưu tiên điện thoại | Mục 0, CN-01.3, PCN-07, PCN-09 | Tất cả |
| Tiêu chí 1 (người dùng, nỗi đau) + Tiêu chí 4 (triển khai ở cơ sở) | CN-12 Đoàn viên đỡ đầu số | MH-21 |
| Tiêu chí 3 (dữ liệu) + Tiêu chí 4 (tác động) | CN-13 Buổi tuyên truyền có QR | MH-22, MH-23 |
| Tiêu chí 1, 4 (phong trào Đoàn) | CN-14 Thi đua chi đoàn | MH-24 |
| Tài khoản người dùng: số điện thoại + mật khẩu hoặc Google | CN-15 | MH-25, MH-26, MH-27 |

---

## 16. Quyết định đã chốt (24/11/2026)

| # | Nội dung | Quyết định |
|---|---|---|
| 1 | Ngưỡng 🔴 từ báo cáo cộng đồng (QT-07) | **≥ 5 báo cáo độc lập trong 30 ngày**. 1–4 báo cáo thì xếp 🟡 |
| 2 | Định nghĩa "kiểu mới" (QT-20) | **Lần đầu xuất hiện** tại xã/phường trong 7 ngày, **hoặc** số ca 7 ngày **≥ 2 lần** trung bình 4 tuần trước và ≥ 3 ca |
| 3 | Chờ trước khi gợi ý người thân thứ hai (QT-16) | **2 phút** |
| 4 | Bài kiểm tra (QT-17, QT-19) | **10 câu cho Học sinh, 5 câu cho Ông bà**. Chứng nhận khi đạt **≥ 80 điểm** |
| 5 | Phạm vi dựng | **Mọi luồng (F0–F10) làm hoàn chỉnh**. Thứ tự trình diễn do đội tự quyết sau khi dựng xong |
| 6 | Dữ liệu mẫu người thân | **Lan (con gái, ưu tiên)**, **Hùng (con trai)** |
| 7 | Luồng chính | **Tập các luồng giải quyết yêu cầu đề** (đặc tả sản phẩm mục 7), không chọn riêng một luồng |
| 8 | MVP 24 giờ ở chung kết | **Toàn bộ các màn P0** (đặc tả sản phẩm mục 11) |
| 9 | Sáng tạo cho đoàn viên | Thêm **CN-12 Đỡ đầu số**, **CN-13 Buổi tuyên truyền có QR**, **CN-14 Thi đua chi đoàn** (đều P0) |

**Tham số của chức năng mới** (do đội phân tích đặt, sửa được): tối đa 5 hộ cho mỗi đoàn viên (QT-29) · nhắc thăm hỏi sau 14 ngày · buổi tuyên truyền tự đóng sau 24 giờ (QT-30) · tỷ trọng điểm thi đua 40/20/20/20 (QT-32).

**Tài khoản (CN-15):** **đã chốt dùng Firebase Authentication** (Phone, Email/Password với email nội bộ sinh từ số điện thoại, Google, Anonymous) cùng Firestore, Cloud Functions, Hosting. Do đội phân tích đặt, chờ duyệt: không bắt buộc đăng nhập để tự bảo vệ (QT-01) · ghi nhớ đăng nhập bằng `browserLocalPersistence` (QT-35) · chống dò mật khẩu bằng cơ chế của Firebase (QT-36) · khóa nút gửi lại OTP 60 giây (QT-37) · mật khẩu từ 8 ký tự, có chữ và số (QT-38) · Google bắt buộc bổ sung số điện thoại với Đội TNV · quyền TNV/điều phối/duyệt cảnh báo được cấp riêng theo đơn vị và phạm vi.

**Còn mở:** danh sách kênh tiếp nhận tin báo Công an cần kiểm chứng (QT-24) · điều khoản pháp lý cụ thể về dữ liệu của học sinh dưới 16 tuổi (QT-38) · chi phí SMS OTP của Firebase (phải dùng gói trả theo mức dùng, cần kiểm tra bảng giá hiện hành) · đánh giá việc lưu dữ liệu cá nhân trên máy chủ Firebase ở nước ngoài theo quy định chuyển dữ liệu cá nhân ra nước ngoài.


## Quyết định phân cấp hoạt động

Nguồn: người dùng xác nhận trong phiên làm việc rằng tình nguyện viên là thành viên chi đoàn trực tiếp đi tuyên truyền; người quản lý hoạt động phải là vai trò cấp cao hơn riêng biệt. Tên “Điều phối viên” là tên đề xuất cho vai trò quản lý này.

- Người cao tuổi và Học sinh là nhóm trải nghiệm; TNV và Điều phối viên là quyền công tác được cấp. Một học sinh có thể đồng thời là TNV. Đổi giao diện không cấp thêm quyền.
- TNV nhận nhiệm vụ, dùng tài liệu đã duyệt, trực tiếp tuyên truyền, hỗ trợ hộ được giao và nộp kết quả.
- Điều phối viên lập kế hoạch, tạo buổi, phân công, duyệt tài liệu và kết quả, quản lý thành viên, tổng hợp báo cáo trong phạm vi được giao.
- Duyệt hoạt động không phải xác nhận lừa đảo. Quyền duyệt cảnh báo cấp riêng cho tài khoản được chỉ định; không mặc định thuộc TNV hoặc mọi điều phối viên.
- Người thân là quan hệ hỗ trợ có sự đồng ý. Người tham gia buổi là ngữ cảnh sử dụng, không cần một loại tài khoản riêng.


## Mô hình quyền và trải nghiệm đã thống nhất

Chỉ có 3 role tài khoản: Người dùng, Tình nguyện viên, Điều phối viên. TNV là thành viên chi đoàn trực tiếp làm nhiệm vụ tuyên truyền, có thể là học sinh; điều phối viên là người có chức trách cao hơn phụ trách hoạt động. TNV và điều phối viên vẫn có đầy đủ chức năng cá nhân của Người dùng trên cùng tài khoản.

Người cao tuổi/Học sinh là nhóm nội dung, không phải role. Dễ nhìn/Tiêu chuẩn là chế độ hiển thị độc lập với nhóm nội dung và quyền. Chọn nhóm Người cao tuổi gợi ý Dễ nhìn, chọn Học sinh gợi ý Tiêu chuẩn; người dùng có thể thay đổi. Không suy ra quyền hoặc bắt buộc tuổi từ lựa chọn này.

Người thân tin cậy là quan hệ hỗ trợ; người tham gia buổi là ngữ cảnh sử dụng. Quyền duyệt cảnh báo là quyền chuyên môn bổ sung được cấp riêng, không phải role thứ tư. Chi đoàn và xã/phường là đơn vị/phạm vi dữ liệu.

Một học sinh có thể dùng Dễ nhìn, có quyền TNV và được bà chọn làm người thân tin cậy trên cùng tài khoản. Chuyển vào khu công tác không đổi nhóm nội dung, chế độ hiển thị hoặc người thân.
