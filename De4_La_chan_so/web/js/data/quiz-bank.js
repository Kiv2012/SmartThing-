/* Ngân hàng câu hỏi bài kiểm tra nhận diện
   DỮ LIỆU GIẢ LẬP – không phải thông tin thật. */
(function(){
const DATA = window.LCS_DATA = window.LCS_DATA || {};
/* Ngân hàng câu hỏi. dang: tl (thật/lừa) · tap (chạm dấu hiệu) · act (bạn sẽ làm gì) */
const QUIZ = [
 {id:'Q1', dang:'tl', for:'all', who:'Tin nhắn', msg:'[TRI AN KHACH HANG] Nhan qua 2.000.000d tai quatrian-2026.top truoc 24h.', a:'lua', why:'Quà mình không đăng ký, tên miền đuôi .top lạ, giục trong 24 giờ.', t:'T02'},
 {id:'Q2', dang:'tl', for:'all', who:'Ngân hàng (SMS)', msg:'TK 0123xxx789 +1,500,000VND luc 09:12 24/11. SD: 3,240,000VND. ND: LUONG T11.', a:'that', why:'Thông báo biến động số dư thông thường: không có link, không hỏi mã OTP, không yêu cầu làm gì.', t:null},
 {id:'Q3', dang:'act', for:'all', q:'Một người xưng Công an gọi, bảo bà chuyển tiền để "xác minh". Bà nên làm gì?', o:['Chuyển một ít để chứng minh trong sạch','Cúp máy và gọi cho con cháu','Đọc số tài khoản của mình cho họ kiểm tra'], a:1, why:'Công an không bao giờ yêu cầu chuyển tiền qua điện thoại.', t:'T01'},
 {id:'Q4', dang:'tap', for:'hs', who:'Tuyển dụng', sents:['Chào em, bên chị tuyển CTV đặt đơn online.','Việc nhẹ lương cao 300-500k/ngày.','Em làm buổi tối sau giờ học được nhé.','Nhiệm vụ VIP cần nạp trước 2 triệu.'], flags:[1,3], why:'"Việc nhẹ lương cao" và "nạp trước" là hai dấu hiệu chính của lừa cộng tác viên.', t:'T03'},
 {id:'Q5', dang:'tl', for:'hs', who:'Bạn thân (Zalo)', msg:'Cho mình mượn 5 triệu gấp, chuyển vào tài khoản chị mình nha, mình đang họp không nghe máy.', a:'lua', why:'Mượn gấp, chuyển vào tài khoản người khác, từ chối nghe máy: dấu hiệu tài khoản bị chiếm.', t:'T07'},
 {id:'Q6', dang:'act', for:'hs', q:'Người bán điện thoại giá rẻ bắt cọc trước 1 triệu và không nhận thanh toán khi giao hàng. Bạn làm gì?', o:['Cọc luôn kẻo hết hàng','Kiểm tra số tài khoản và không cọc','Cọc một nửa'], a:1, why:'Giá rẻ bất thường cộng bắt cọc là kịch bản lừa mua bán online.', t:'T09'},
 {id:'Q7', dang:'tap', for:'all', who:'Người gọi', sents:['Tài khoản của bác sẽ bị khóa hôm nay.','Bác vào vietcornbank-xacthuc.com làm theo hướng dẫn.','Chi nhánh mở cửa đến 17 giờ.','Bác đọc giúp em mã OTP vừa gửi.'], flags:[0,1,3], why:'Dọa khóa tài khoản, tên miền nhái "vietcornbank", hỏi mã OTP.', t:'T05'},
 {id:'Q8', dang:'tl', for:'hs', who:'Nhóm đầu tư', msg:'Lãi 30%/tuần, cam kết không lỗ. Nạp tối thiểu 1 triệu để vào nhóm kín.', a:'lua', why:'Không có đầu tư nào cam kết lãi cao mà không lỗ.', t:'T08'},
 {id:'Q9', dang:'tl', for:'all', who:'Nhà trường (Zalo nhóm lớp)', msg:'Thông báo: Thứ Bảy 30/11 học sinh khối 12 tập trung lúc 7 giờ tại sân trường để sinh hoạt chủ điểm.', a:'that', why:'Thông báo không yêu cầu tiền, không có link lạ, không giục gấp.', t:null},
 {id:'Q10', dang:'act', for:'hs', q:'Bạn nhận tin trúng xe máy nhưng phải đóng thuế 4 triệu trước. Bạn làm gì?', o:['Đóng thuế để nhận xe','Không đóng, báo cáo tin nhắn','Hỏi họ giảm phí'], a:1, why:'Phải đóng phí trước mới nhận thưởng là dấu hiệu lừa trúng thưởng.', t:'T10'},
 {id:'Q11', dang:'act', for:'ob', q:'Người lạ gọi báo cháu bà cấp cứu, cần chuyển 30 triệu viện phí ngay. Bà làm gì trước?', o:['Chuyển ngay','Gọi thẳng cho cháu hoặc bố mẹ cháu'], a:1, why:'Kiểm tra trực tiếp với người thân trước. Kẻ lừa luôn giục gấp.', t:'T04'},
 {id:'Q12', dang:'act', for:'ob', q:'Có người gọi báo 2 tiếng nữa cắt điện, bảo chuyển tiền vào tài khoản nhân viên. Ông bà làm gì?', o:['Chuyển để khỏi bị cắt điện','Cúp máy, gọi tổng đài in trên hóa đơn'], a:1, why:'Điện lực không thu tiền vào tài khoản cá nhân nhân viên.', t:'T06'}
];
Object.assign(DATA, {QUIZ});
})();
