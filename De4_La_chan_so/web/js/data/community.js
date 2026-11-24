/* Địa bàn, chi đoàn, hộ đỡ đầu, buổi tuyên truyền, người thân mẫu
   DỮ LIỆU GIẢ LẬP – không phải thông tin thật. */
(function(){
const DATA = window.LCS_DATA = window.LCS_DATA || {};
const WARDS = ['Phường Trấn Biên','Phường Tam Hiệp','Phường Long Bình','Phường Hố Nai','Xã Long Thành'];
const MY_WARD = WARDS[0];
const NEIGHBORHOODS = ['Khu phố 1','Khu phố 2','Khu phố 3','Khu phố 4','Khu phố 5'];
const CHIDOAN = [
 {id:'12A1', ten:'Chi đoàn 12A1', loai:'lop', hoc:86, thamgia:94, tuyen:60, dodau:40},
 {id:'11A3', ten:'Chi đoàn 11A3', loai:'lop', hoc:82, thamgia:88, tuyen:75, dodau:55},
 {id:'KP5', ten:'Chi đoàn Khu phố 5', loai:'kp', hoc:74, thamgia:70, tuyen:95, dodau:90},
 {id:'12A2', ten:'Chi đoàn 12A2', loai:'lop', hoc:80, thamgia:76, tuyen:40, dodau:30},
 {id:'10A2', ten:'Chi đoàn 10A2', loai:'lop', hoc:71, thamgia:82, tuyen:20, dodau:10},
 {id:'KP2', ten:'Chi đoàn Khu phố 2', loai:'kp', hoc:68, thamgia:55, tuyen:70, dodau:65}
];
CHIDOAN.forEach(c => c.diem = Math.round(c.hoc*.4 + c.thamgia*.2 + c.tuyen*.2 + c.dodau*.2));
CHIDOAN.sort((a,b)=>b.diem-a.diem);

const DODAU = [
 {id:'H1', ten:'Bà Năm', kp:'Khu phố 5', mot_minh:true, cai_app:true, co_nguoi_than:false, lan_cuoi:3, hoi:2, canh_bao:true, vai_tro:'Người ưu tiên'},
 {id:'H2', ten:'Ông Bảy', kp:'Khu phố 3', mot_minh:false, cai_app:true, co_nguoi_than:true, lan_cuoi:16, hoi:0, canh_bao:false, vai_tro:'Người thứ hai'},
 {id:'H3', ten:'Bà Tư', kp:'Khu phố 5', mot_minh:true, cai_app:true, co_nguoi_than:false, lan_cuoi:6, hoi:1, canh_bao:false, vai_tro:'Người ưu tiên'},
 {id:'H4', ten:'Ông Hai', kp:'Khu phố 1', mot_minh:false, cai_app:false, co_nguoi_than:true, lan_cuoi:1, hoi:0, canh_bao:false, vai_tro:'Chờ liên kết'}
];

const BUOI = [
 {ma:'482917', ten:'Cảnh báo link nhận quà tri ân', dd:'Nhà văn hóa Khu phố 5', tg:'19:00 · 22/11/2026', chude:['T02','T05'], mo:false,
  kq:{nguoi:34, tb:76, dat:62, nhom:{ob:19,hs:6,dan:9}, saiNhieu:'Trang nhận quà hỏi mã OTP – 41% chọn "Nhập OTP để nhận quà"'}},
 {ma:'915364', ten:'Việc nhẹ lương cao – Sinh hoạt lớp', dd:'Trường THPT Trấn Biên (giả lập)', tg:'07:00 · 24/11/2026', chude:['T03','T08'], mo:true,
  kq:{nguoi:0, tb:0, dat:0, nhom:{ob:0,hs:0,dan:0}, saiNhieu:''}}
];
const RELATIVES_DEFAULT = [
 {id:'r1', ten:'Lan', sdt:'0912 000 001', qh:'Con gái', kenh:'Zalo', uu:true},
 {id:'r2', ten:'Hùng', sdt:'0912 000 002', qh:'Con trai', kenh:'SMS', uu:false}
];
Object.assign(DATA, {WARDS, MY_WARD, NEIGHBORHOODS, CHIDOAN, DODAU, BUOI, RELATIVES_DEFAULT, SCHOOL:'Trường THPT Trấn Biên (giả lập)'});
})();
