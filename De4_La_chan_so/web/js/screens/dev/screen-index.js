/* Danh mục màn hình (trình chiếu, chụp PDF) */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== Danh mục màn hình (trình chiếu, chụp PDF) ===== */
const MAP = [
 ['Khởi đầu', [['MH-01 Chọn vai trò','#/bat-dau'],['MH-02 Người thân tin cậy','#/nguoi-than?vai=ob'],['MH-02 – Trống','#/nguoi-than?state=empty']]],
 ['Trang chủ', [['MH-03 Trang chủ Ông bà','#/ong-ba?vai=ob'],['MH-04 Trang chủ Học sinh','#/hoc-sinh?vai=hs']]],
 ['Bắt buộc 1 · Kiểm tra nhanh', [['MH-05 Kiểm tra nhanh','#/kiem-tra?vai=hs'],['MH-05 – Chưa nhập','#/kiem-tra?state=trong'],['MH-05 – Thiếu số','#/kiem-tra?state=thieu-so&v=0868000'],['MH-05 – Đang kiểm tra','#/kiem-tra?state=dang-kiem-tra'],['MH-05 – Mất mạng','#/kiem-tra?state=offline'],['MH-05 – Chưa có lịch sử','#/kiem-tra?state=chua-co'],
   ['MH-06 Kết quả – Nguy hiểm (số)','#/kiem-tra/ket-qua?v=0868000111'],['MH-06 Kết quả – Nguy hiểm (link nhái)','#/kiem-tra/ket-qua?v=https://vietcornbank-xacthuc.com/kyc'],['MH-06 Kết quả – Nghi ngờ (có báo cáo)','#/kiem-tra/ket-qua?v=0789000222'],['MH-06 Kết quả – Nghi ngờ (không có dữ liệu)','#/kiem-tra/ket-qua?v=0912345678'],['MH-06 Kết quả – An toàn','#/kiem-tra/ket-qua?v=113'],['MH-06 Kết quả – Số tài khoản','#/kiem-tra/ket-qua?v=190388886666']]],
 ['Điểm cộng 1 · AI phân tích tin nhắn', [['MH-07 Phân tích tin nhắn','#/tin-nhan'],['MH-07 – Chưa dán','#/tin-nhan?state=trong'],['MH-07 – Kết quả (sau khi phân tích)','#/tin-nhan?state=ket-qua'],['MH-07 – AI chưa phản hồi','#/tin-nhan?state=ai-loi']]],
 ['Bắt buộc 2 · Báo cáo', [['MH-08 Báo cáo – Bước 1','#/bao-cao?moi=1'],['MH-08 – Bước 2','#/bao-cao?b=2'],['MH-08 – Bước 3','#/bao-cao?b=3'],['MH-09 Đã tiếp nhận','#/bao-cao/da-nhan'],['MH-10 Khẩn cấp: đã chuyển tiền','#/khan-cap']]],
 ['Bắt buộc 3 · Hỏi người thân', [['MH-11 Hỏi người thân','#/hoi-nguoi-than?vai=ob'],['MH-11 – Chưa cài người thân','#/hoi-nguoi-than?state=chua-cai'],['MH-11 – Đã gửi','#/hoi-nguoi-than?state=sent'],['MH-11 – Đã trả lời','#/hoi-nguoi-than?state=replied'],['MH-11 – Quá 2 phút','#/hoi-nguoi-than?state=timeout'],['MH-11 – Mất mạng','#/hoi-nguoi-than?state=offline'],['MH-12 Phía người thân','#/canh-bao/A1']]],
 ['Bắt buộc 4, 5 · Học và kiểm tra', [['MH-13 Thư viện bài học','#/hoc'],['MH-13 Bài học – Tình huống','#/hoc/T01?dung=1'],['MH-13 – 3 dấu hiệu','#/hoc/T01?p=1&dung=1'],['MH-13 – Nên làm','#/hoc/T01?p=2&dung=1'],['MH-13 – Tự kiểm tra','#/hoc/T01?p=3&tl=1'],['MH-14 Bài kiểm tra – giới thiệu','#/thu-thach'],['MH-14 Làm bài','#/thu-thach?lam=1'],['MH-15 Kết quả – Đạt','#/thu-thach/ket-qua?d=90'],['MH-15 Kết quả – Chưa đạt','#/thu-thach/ket-qua?d=60']]],
 ['Bắt buộc 6 · Đội tình nguyện', [['Mở tài khoản công tác trình diễn','#/dang-nhap?work=1'],['MH-16 Tổng quan địa bàn','#/doi'],['MH-16 – Tuần yên ổn','#/doi?state=yen-on'],['MH-17 Hàng chờ xác minh','#/doi/xac-minh'],['MH-17 – Trống','#/doi/xac-minh?state=trong'],['MH-18 Soạn bài tuyên truyền','#/doi/tuyen-truyen']]],
 ['Sáng tạo · Đoàn viên', [['MH-21 Hộ đỡ đầu','#/doi/do-dau'],['MH-21 – Trống','#/doi/do-dau?state=trong'],['MH-21 Cụ đồng ý liên kết','#/lien-ket/123456'],['MH-22 Buổi tuyên truyền','#/doi/buoi'],['MH-23 Kết quả buổi','#/doi/buoi/482917'],['MH-23 – Chờ người tham gia','#/doi/buoi/915364'],['Người dân quét QR','#/buoi/915364'],['MH-24 Thi đua chi đoàn','#/thi-dua'],['MH-24 – Chưa có điểm','#/thi-dua?state=trong']]],
 ['Tài khoản và công tác', [['MH-25 Đăng nhập','#/dang-nhap'],['MH-26 Tạo tài khoản','#/dang-ky'],['MH-27 Đặt lại mật khẩu','#/quen-mat-khau'],['MH-28 Việc của tôi','#/cong-tac'],['MH-29 Quản lý hoạt động','#/dieu-phoi'],['MH-30 Chi tiết nhiệm vụ','#/cong-tac/nhiem-vu/kp5']]],
 ['Điểm cộng 2 · Giọng nói', [['MH-19 Bấm và kể','#/ong-ba/tro-ly?vai=ob'],['MH-20 Hồ sơ (bật Dễ nhìn)','#/toi']]]
];
A.route(/^\/man-hinh$/, () => A.screen({mh:'', title:'Danh mục màn hình', noTab:true, backTo:A.roleHome(), body:`
  <p class="ink2">Dùng khi trình chiếu và chụp ảnh cho bản PDF. Liên kết có "vai=" sẽ đổi vai trò tương ứng.</p>
  ${MAP.map(([g,items])=>`<div class="card"><span class="label">${esc(g)}</span><ul class="list">${items.map(([l,h])=>`<li><a href="${h}">${esc(l)}</a></li>`).join('')}</ul></div>`).join('')}`}));
})();
