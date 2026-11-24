/* MH-16 Tổng quan địa bàn: thống kê kiểu lừa mới – Bắt buộc 6 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const newTypes = A.newTypes;
const KENH = {link:'Đường dẫn giả mạo', goi:'Cuộc gọi', tin:'Tin nhắn, mạng xã hội', stk:'Số tài khoản'};
const TG = {ob:'người cao tuổi', hs:'học sinh', all:'mọi người'};
/* ===== MH-16 Tổng quan ===== */
A.route(/^\/doi$/, (m, q) => {
  const ward = q.xa || 'all', tg = q.dt || 'all', ky = q.ky || 'thang';
  const R = D.REPORTS.filter(r => (ward==='all'||r.ward===ward) && (tg==='all'||r.target===tg) && (ky==='thang'||r.day>=18));
  const total = R.length, link = R.filter(r=>r.kenh==='link').length;
  const pending = R.filter(r=>r.status==='pending').length;
  const learned = S.buoi.reduce((s,b)=>s+b.kq.nguoi,0);
  const byType = D.SCEN.map(s => ({s, n:R.filter(r=>r.type===s.id).length, prev:D.PREV_MONTH[s.id]})).sort((a,b)=>b.n-a.n);
  const max = Math.max(1, ...byType.map(x=>x.n));
  const nt = q.state==='yen-on' ? [] : newTypes(); const top = nt[0];
  const weeks = [[1,6,'1–6/11'],[7,12,'7–12/11'],[13,17,'13–17/11'],[18,24,'18–24/11']].map(([a,b,l]) => ({l, n:R.filter(r=>r.day>=a&&r.day<=b).length}));
  const wmax = Math.max(1, ...weeks.map(w=>w.n));
  const alertHo = S.dodau.find(h=>h.canh_bao);
  const sel = (id, opts, cur, key) => `<select class="select" aria-label="${id}" data-act-filter="${key}">${opts.map(([v,l])=>`<option value="${esc(v)}" ${v===cur?'selected':''}>${esc(l)}</option>`).join('')}</select>`;
  const mostT = byType[0].s;
  return A.screen({mh:'MH-16', title:'Tổng quan địa bàn', tab:'#/doi', back:false, body:`
    <div class="filters">
      ${sel('Xã, phường', [['all','Tất cả xã, phường trên địa bàn'], ...D.WARDS.map(w=>[w,w])], ward, 'xa')}
      ${sel('Khoảng thời gian', [['thang','Tháng 11/2026'],['tuan','7 ngày qua']], ky, 'ky')}
      ${sel('Đối tượng bị nhắm', [['all','Mọi đối tượng'],['ob','Người cao tuổi'],['hs','Học sinh']], tg, 'dt')}
    </div>
    ${alertHo?`<a class="card ward alert" href="#/doi/do-dau" style="text-decoration:none;color:inherit"><b>${esc(alertHo.ten)} (${esc(alertHo.kp)}) vừa bấm Hỏi người thân</b><p class="small ink2">Cụ sống một mình, bạn là người ưu tiên. Gọi cho cụ ngay.</p></a>`:''}
    <div class="doi-grid">
    <div class="stack">
    ${top?`<section class="alert-new"><span><span class="tag new">MỚI TUẦN NÀY</span></span>
      <span class="t">${esc(top.s.ten)}</span>
      <span class="s">${top.b?`${top.w} ca trong 7 ngày, gấp ${Math.round(top.w/top.b)} lần trung bình 4 tuần trước`:`Lần đầu xuất hiện: ${top.w} ca trong 7 ngày`} · nhắm vào ${TG[top.s.doiTuong]}</span>
      <a class="btn btn-star" href="#/doi/buoi?moi=1&chude=${top.s.id}">Tạo buổi tuyên truyền về kiểu này</a>
      ${nt[1]?`<span class="s">Cũng mới: <b style="color:#fff">${esc(nt[1].s.ngan)}</b> – ${nt[1].b?'tăng mạnh':'lần đầu xuất hiện'}, nhắm vào ${TG[nt[1].s.doiTuong]}</span>`:''}
    </section>`:`<div class="empty"><b>Tuần này chưa ghi nhận kiểu lừa mới</b>Kiểu nhiều nhất tháng là "${esc(mostT.ngan)}". Có thể nhắc lại trong buổi sinh hoạt tới. <a href="#/doi/buoi?moi=1&chude=${mostT.id}">Tạo buổi tuyên truyền</a></div>`}
    <div class="kpis">
      <div class="kpi"><div class="n">${total}</div><div class="l">Báo cáo</div></div>
      <div class="kpi"><div class="n">${link}<span style="font-size:18px"> · ${total?Math.round(link/total*100):0}%</span></div><div class="l">Đường dẫn giả mạo</div></div>
      <a class="kpi" href="#/doi/xac-minh" style="text-decoration:none"><div class="n">${pending}</div><div class="l">Chờ xác minh</div></a>
      <div class="kpi"><div class="n">${learned}</div><div class="l">Người đã học tại buổi</div></div>
    </div>
    <p class="source">Dữ liệu giả lập · ${ky==='thang'?'tháng 11/2026':'18–24/11/2026'} · ${ward==='all'?'tất cả xã, phường':esc(ward)}</p>
    </div>
    <div class="card"><h2>10 kiểu lừa · so với tháng trước</h2>
      ${total?`<div class="bars">${byType.map(x=>{ const isNew = nt.some(n=>n.s.id===x.s.id); const d = x.n - (ky==='thang'?x.prev:0);
        return `<div class="b ${isNew?'new':''}"><span class="nm">${isNew?'<span class="tag new">MỚI</span> ':''}${esc(x.s.ngan)}</span><span class="v">${x.n} ${ky==='thang'&&ward==='all'&&tg==='all'?(d>0?`<span class="up">▲${d}</span>`:d<0?`<span class="down">▼${-d}</span>`:''):''}</span><span class="tr"><i style="width:${x.n/max*100}%"></i></span></div>`; }).join('')}</div>`
        :'<div class="empty"><b>Không có báo cáo</b>Thử đổi bộ lọc.</div>'}
    </div>
    <div class="stack">
    <div class="card"><h2>Theo kênh</h2><div class="bars">${Object.entries(KENH).map(([k,l])=>{ const c = R.filter(r=>r.kenh===k).length; return `<div class="b"><span class="nm">${l}</span><span class="v">${c} · ${total?Math.round(c/total*100):0}%</span><span class="tr"><i style="width:${total?c/total*100:0}%"></i></span></div>`; }).join('')}</div></div>
    <div class="card"><h2>Theo tuần</h2><div class="weeks">${weeks.map(w=>`<div><b>${w.n}</b><i style="height:${w.n/wmax*70}px"></i><span class="ink2">${w.l}</span></div>`).join('')}</div></div>
    <a class="card" href="#/thi-dua?pv=xa" style="text-decoration:none;color:inherit"><span class="label">Thi đua chi đoàn</span><div class="kv"><b>${esc(D.CHIDOAN[0].ten)} dẫn đầu</b><b>${D.CHIDOAN[0].diem} điểm</b></div></a>
    <div class="btn-row"><a class="btn btn-ghost" href="#/doi/tuyen-truyen${top?'?t='+top.s.id:''}">Soạn bài tuyên truyền</a><button class="btn btn-ghost" data-act="export">Xuất báo cáo</button></div>
    </div></div>`});
});
document.addEventListener('change', e => {
  const k = e.target.dataset.actFilter; if(!k) return;
  const q = Object.assign({}, A.q, {[k]: e.target.value}); delete q.state;
  A.go('#/doi?'+new URLSearchParams(q).toString());
});
A.actions.export = () => A.sheet(`<h2>Xuất báo cáo tháng 11/2026</h2>
  <p class="small ink2">Gồm số liệu theo kiểu lừa và kênh, danh sách ca đã xác minh, các buổi tuyên truyền và số người tham gia.</p>
  <button class="btn btn-primary" data-act="print">Báo cáo cho Đoàn cấp trên (PDF)</button>
  <button class="btn btn-ghost" data-act="print">Báo cáo cho Công an xã, phường (PDF)</button>
  <p class="note">Bản mẫu: dùng chức năng in của trình duyệt để lưu PDF.</p>
  <button class="btn btn-ghost" data-act="sheet-close">Đóng</button>`);
A.actions.print = () => { A.closeSheet(); setTimeout(()=>window.print(), 100); };
})();
