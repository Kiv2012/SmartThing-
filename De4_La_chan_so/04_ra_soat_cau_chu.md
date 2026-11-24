# Rà soát câu chữ giao diện

Nguồn yêu cầu: người dùng yêu cầu xử lý các câu mang giọng trình diễn, thuật ngữ kỹ thuật và thông tin thừa trên giao diện hiện tại. Đối chiếu mã nguồn ở commit 3d035b8. Đây là nội dung chuẩn bị thay đổi, chưa phải xác nhận giao diện đã sửa.

## Nguyên tắc

- Nhãn chính gọi tên công việc người dùng đang làm; không đưa mã màn, tiêu chí thi hoặc chi tiết triển khai vào luồng cá nhân/công tác.
- Giữ thông tin dữ liệu minh họa tại kết quả tra cứu và thống kê. Không làm dữ liệu mẫu trông như thông tin đã kiểm chứng ngoài đời.
- Không đổi thao tác mô phỏng thành lời hứa đã gửi OTP, gửi tin, tạo tài khoản thật hoặc đã chuyển tin báo.
- Công cụ chọn tài khoản mẫu và danh mục màn hình chuyển vào khu xem trước riêng; không đặt trong hồ sơ hoặc đăng nhập chính.

## Nội dung thay theo màn

| File trong web/js | Hiện tại | Nội dung đề xuất / xử lý |
|---|---|---|
| screens/onboarding/account.js | Thử đăng nhập; Đăng nhập thử | Giao diện chính: Đăng nhập. Nếu dịch vụ chưa kết nối, hiện Đăng nhập chưa khả dụng và nút Dùng ngay; luồng thử giữ trong khu xem trước |
| screens/onboarding/account.js | Số điện thoại mẫu; Mật khẩu mẫu; Tên mẫu | Giao diện chính dùng nhãn Số điện thoại; Mật khẩu; Tên gọi. Không nhận dữ liệu thật vào biểu mẫu chỉ kiểm tra giá trị mẫu |
| screens/onboarding/account.js | Tài khoản công tác trình diễn | Chuyển bộ chọn TNV/điều phối sang khu xem trước, có nhãn Tài khoản minh họa; không cho tự chọn quyền trong đăng nhập chính |
| screens/onboarding/account.js | Xem bước nhập mã; Xác minh mã mẫu; Hoàn thành bản thử | Chỉ trong khu xem trước: Tiếp tục; Xác nhận; Hoàn tất. Ghi một thông báo chung: Chưa tạo tài khoản hoặc gửi mã xác minh thật. Không đổi thành Gửi mã khi chưa có gửi mã |
| screens/profile/profile.js | Tài khoản mẫu; Hồ sơ trên máy | Thông tin của bạn; giữ thông tin dữ liệu chỉ lưu trên máy trong mục Quyền riêng tư |
| screens/profile/profile.js | Đăng xuất tài khoản mẫu | Đăng xuất |
| screens/profile/profile.js | Danh mục màn hình (trình chiếu) | Bỏ khỏi mục Tôi; giữ đường dẫn trực tiếp dành cho xem trước |
| screens/profile/profile.js | Nội dung chung · Chưa chọn nhóm | Đang xem nội dung chung |
| screens/profile/profile.js | Vào khu công tác; Đăng nhập để vào công tác | Công tác tuyên truyền; Đăng nhập để xem nhiệm vụ |
| screens/home/student.js | Thử số mẫu | Xem ví dụ; đưa vào trợ giúp thu gọn |
| screens/home/student.js | Bản trình diễn dùng dữ liệu giả lập. Kết quả hỗ trợ nhận diện dấu hiệu. | Dữ liệu minh họa. Kết quả chỉ hỗ trợ nhận diện dấu hiệu. |
| screens/check/quick-check.js | Thử nhanh | Ví dụ cách nhập; thu gọn mặc định |
| screens/check/quick-check.js | Thử bấm một ví dụ ở trên để xem cách hoạt động. | Nhập số điện thoại, đường link hoặc số tài khoản cần kiểm tra. |
| screens/check/message.js | Thử với tin nhắn mẫu | Xem ví dụ; thu gọn mặc định |
| screens/check/message.js | Bản mẫu phân tích bằng quy tắc trên thiết bị. | Kết quả mang tính tham khảo. Hãy hỏi người tin cậy nếu còn nghi ngờ. |
| screens/check/message.js | Đang hiển thị kết quả kiểm tra theo luật. | Bạn vẫn có thể xem các dấu hiệu bên dưới. |
| screens/home/voice-assistant.js | Thử với câu mẫu | Xem ví dụ; đặt sau thao tác chính |
| screens/check/result.js | Dữ liệu giả lập · danh sách đã xác minh, báo cáo cộng đồng và dấu hiệu từ đường link. | Dữ liệu minh họa, không dùng để xác nhận giao dịch thực tế. |
| screens/team/work.js | Địa bàn và thành viên mẫu. | Dữ liệu minh họa. Chưa hỗ trợ thay đổi thành viên. |
| screens/team/work.js | Lý do (khi chọn thao tác phụ) | Với điều phối: Nhận xét / Nội dung cần bổ sung. Với TNV chưa nhận: Lý do từ chối (nếu từ chối). Giữ bắt buộc nhập khi từ chối hoặc yêu cầu bổ sung |
| core/router.js | Màn này cần quyền phù hợp. Tài khoản trình diễn hiện tại chưa được cấp quyền này. | Bạn chưa được cấp quyền xem nội dung này. Liên hệ người phụ trách nếu cần truy cập. |
| screens/team/sessions.js | Thử như người tham gia | Xem trang tham gia |
| screens/team/sessions.js | Mã QR minh họa · người dân quét hoặc nhập mã tại trang Lá Chắn Số | QR minh họa, chưa quét được. Mở trang tham gia để xem nội dung. Không hứa dùng mã trên thiết bị khác khi dữ liệu chỉ lưu cục bộ |
| screens/team/sessions.js | Hãy chiếu mã QR lên màn hình hoặc đọc mã 6 số cho bà con. | Chưa có kết quả. Mở trang tham gia để xem bài học của buổi. |
| screens/team/sponsor.js | Quét mã hoặc nhập 6 số; hiệu lực 10 phút | Nếu mã chưa được kiểm tra và chưa chia sẻ giữa thiết bị: ghi Liên kết hỗ trợ chưa khả dụng; ví dụ đồng ý chỉ đặt trong khu xem trước |
| screens/learn/session-join.js | Quét mã QR bằng máy ảnh điện thoại | Chưa dùng hướng dẫn này khi QR chỉ là hình minh họa; giữ hướng dẫn truy cập phù hợp với dữ liệu cục bộ |
| screens/family/ask.js | Gửi cho [tên]; Đã gửi → Đã xem → Đã trả lời tự động | Chuyển hành động gửi thật sang SMS/Zalo hoặc gọi. Phản hồi mẫu chỉ hiển thị trong khu xem trước; không xóa ghi chú mô phỏng mà vẫn để trạng thái tự chạy trong luồng chính |
| screens/family/relative-view.js | Màn hình người thân mở từ thông báo, tin SMS hoặc Zalo · dữ liệu giả lập | Tình huống minh họa. Chưa có yêu cầu hỗ trợ thực. Giữ rõ trạng thái cho đến khi có liên kết gửi/nhận thật |
| screens/report/received.js | Gửi Công an | Chuẩn bị tin báo; chỉ mở nội dung, chưa tự gửi |
| screens/report/received.js | Hồ sơ tin báo đã được chép sẵn. | Kiểm tra nội dung bên dưới rồi chọn Chép nội dung tin báo. |
| screens/report/received.js | Chép hồ sơ và mở kênh tiếp nhận của Công an xã, phường | Chép nội dung tin báo |
| screens/report/received.js | Kênh tiếp nhận cụ thể được cấu hình theo từng địa phương (cần kiểm chứng). | Chưa có kênh tiếp nhận của địa phương này. App chưa gửi tin báo. |
| screens/learn/compete.js | dữ liệu giả lập | Dữ liệu minh họa; giữ thông tin không công khai điểm cá nhân |

## Kiểm tra nghiệm thu khi được triển khai

1. Đăng nhập chính và Tôi không còn bộ chọn tài khoản trình diễn hoặc danh mục màn hình.
2. Ví dụ nhập liệu nằm trong mục trợ giúp, không cạnh tranh với thao tác chính.
3. Không hiển thị Đã gửi/Đã xem/Đã trả lời trong luồng chính nếu không có sự kiện thật tương ứng.
4. Nhãn chép tin báo không hứa mở kênh; thông báo thành công chỉ xuất hiện sau khi chép thành công.
5. QR chưa quét được và dữ liệu minh họa vẫn được ghi đúng giới hạn.
6. Kiểm tra cú pháp JavaScript, liên kết, thao tác mở/đóng mục ví dụ và trạng thái chưa khả dụng; kiểm tra trình duyệt ở 390 × 844 và chế độ Dễ nhìn.

## Trạng thái

Người dùng đã duyệt trực tiếp việc điều chỉnh sau khi được thông báo giới hạn gate. Đã áp dụng sửa câu chữ, tách tài khoản minh họa khỏi đăng nhập chính, thu gọn ví dụ nhập liệu, bỏ trạng thái gửi/xem/trả lời tự động và dùng gọi/SMS/Zalo. Tài khoản thật vẫn chưa khả dụng; QR vẫn được ghi rõ chưa quét được.

Kiểm tra: 46 file JavaScript qua node --check; git diff --check đạt. Tám kiểm tra hành vi và sáu lượt tạo nội dung route trong Node với DOM giả lập đạt. Chưa kiểm tra trực quan hoặc thao tác trong trình duyệt, chưa xác nhận gửi SMS/Zalo thực tế. Core chưa được đánh dấu đạt gate và các tiêu chí dự án vẫn giữ nguyên.
