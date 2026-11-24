/* Danh sách tra cứu (chính thức / đã xác minh / cộng đồng) và ví dụ bấm nhanh
   DỮ LIỆU GIẢ LẬP – không phải thông tin thật. */
(function(){
const DATA = window.LCS_DATA = window.LCS_DATA || {};
/* Danh sách tra cứu (giả lập). src: official | verified | community */
const LIST = {
 phone:{
  '0868000111':{reports:23, verified:true, type:'T01'},
  '0789000222':{reports:3, verified:false, type:'T05'},
  '0565000333':{reports:7, verified:false, type:'T04'},
  '113':{official:'Số gọi khẩn cấp chính thức của Công an'}
 },
 link:{
  'vietcornbank-xacthuc.com':{reports:11, verified:true, type:'T05', fake:'vietcombank.com.vn'},
  'quatrian-2026.top':{reports:18, verified:true, type:'T02'},
  'bit.ly/nhanthuong-vn':{reports:2, verified:false, type:'T10'},
  'vietcombank.com.vn':{official:'Trang chính thức của ngân hàng Vietcombank'},
  'dichvucong.gov.vn':{official:'Cổng Dịch vụ công quốc gia (tên miền .gov.vn của cơ quan nhà nước)'}
 },
 stk:{
  '190388886666':{reports:9, verified:true, type:'T09', bank:'Ngân hàng mẫu A'},
  '0451000777':{reports:2, verified:false, type:'T03', bank:'Ngân hàng mẫu B'}
 },
 bankBrands:['vietcombank','vietinbank','bidv','agribank','techcombank','mbbank','acb','sacombank','tpbank','vpbank'],
 shorteners:['bit.ly','tinyurl.com','shorturl.at','cutt.ly','t.ly','rb.gy'],
 badTlds:['top','xyz','click','icu','buzz','cyou','sbs'],
 newDomains:['quatrian-2026.top','nhan-qua-tet.click']
};

const EXAMPLES = [
 {lb:'0868 000 111', v:'0868 000 111'},
 {lb:'vietcornbank-xacthuc.com', v:'https://vietcornbank-xacthuc.com/kyc'},
 {lb:'1903 8888 6666', v:'1903 8888 6666'},
 {lb:'113', v:'113'}
];
Object.assign(DATA, {LIST, EXAMPLES});
})();
