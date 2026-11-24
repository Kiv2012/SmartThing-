/* 120 báo cáo/tháng – phân bổ khớp đề: 42 đường dẫn giả mạo (35%)
   DỮ LIỆU GIẢ LẬP – không phải thông tin thật. */
(function(){
const DATA = window.LCS_DATA = window.LCS_DATA || {};
const {SCEN, WARDS, MY_WARD} = DATA;
/* 120 báo cáo: phân bổ tình huống × kênh khớp 42 link / 36 gọi / 30 tin nhắn-MXH / 12 STK */
const ALLOC = {
 T02:{link:22}, T01:{goi:18}, T03:{tin:10,link:4,stk:2}, T05:{goi:6,link:8}, T04:{goi:10,stk:2},
 T07:{tin:8,stk:2}, T10:{link:6,tin:4}, T09:{tin:4,stk:4}, T06:{goi:2,link:2,tin:2}, T08:{tin:2,stk:2}
};
/* Số ca trong 7 ngày gần nhất (18–24/11) và trung bình/tuần của 4 tuần trước (tháng 10, giả lập) */
const WEEK = {T02:12,T01:4,T03:4,T05:3,T04:3,T07:2,T10:2,T09:2,T06:1,T08:4};
const BASE = {T02:3,T01:5,T03:4,T05:3,T04:3,T07:2,T10:3,T09:2,T06:2,T08:0};
const PREV_MONTH = {T02:12,T01:21,T03:15,T05:13,T04:12,T07:9,T10:11,T09:8,T06:7,T08:0};

let seed = 7; const rnd = () => (seed = (seed*9301+49297)%233280)/233280;
const REPORTS = []; let n = 1;
Object.entries(ALLOC).forEach(([t,ch]) => {
  const list = []; Object.entries(ch).forEach(([k,c]) => { for(let i=0;i<c;i++) list.push(k); });
  const week = WEEK[t];
  list.forEach((k,i) => {
    const recent = i < week;
    const day = recent ? 18 + Math.floor(rnd()*7) : 1 + Math.floor(rnd()*17);
    const sc = SCEN.find(s=>s.id===t);
    const target = sc.doiTuong==='all' ? (rnd()<.5?'ob':'hs') : sc.doiTuong;
    const w = rnd()<.55 ? MY_WARD : WARDS[1+Math.floor(rnd()*4)];
    const st = rnd(); const status = st<.62?'verified':st<.85?'pending':st<.93?'police':'rejected';
    REPORTS.push({ma:'BC-2026-'+String(n++).padStart(4,'0'), type:t, kenh:k, ward:w, day, target, status});
  });
});
Object.assign(DATA, {REPORTS, WEEK, BASE, PREV_MONTH});
})();
