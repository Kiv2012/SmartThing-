/* MH-22 Buổi tuyên truyền có QR, MH-23 Kết quả buổi – Sáng tạo */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const pseudoQR = A.pseudoQR;
/* ===== MH-22 Buổi tuyên truyền ===== */
A.route(/^\/doi\/buoi$/, (m, q) => {
  if(q.chude && !A.scen(q.chude)) delete q.chude;
  const ch = A.tmp.chude || (q.chude ? [q.chude] : ['T02']);
  if(q.chude && !A.tmp.chudeSet){ A.tmp.chude = [q.chude]; }
  const coordinator = A.workRole()==='dp';
  const showForm = coordinator && (q.moi || !S.buoi.length);
  const sessions = coordinator ? S.buoi : S.buoi.filter(item=>A.workTasks().some(task=>task.session===item.ma && task.status!=='declined'));
  return A.screen({mh:'MH-22', title:'Buổi tuyên truyền', tab:'#/doi/buoi', back:false, body:`
    <div class="seg"><a class="on" href="#/doi/buoi">Buổi tuyên truyền</a><a href="#/doi/tuyen-truyen">Soạn bài</a></div>
    ${showForm?`<form class="card stack" data-form="buoi-new">
      <h2>Tạo buổi mới</h2>
      <div class="field"><label class="label" for="b-ten">Tên buổi</label><input id="b-ten" class="input" required value="Cảnh báo ${esc(A.scen(ch[0]).ngan.toLowerCase())}"></div>
      <div class="field"><label class="label" for="b-dd">Địa điểm</label><input id="b-dd" class="input" required value="Nhà văn hóa Khu phố 5"></div>
      <div class="field"><label class="label" for="b-tg">Thời gian</label><input id="b-tg" class="input" value="19:00 · 26/11/2026"></div>
      <div class="stack"><span class="label">Chủ đề (1–2 kiểu lừa) · gợi ý từ kiểu MỚI</span><div class="chips">${D.SCEN.map(s=>`<button type="button" class="chip ${ch.includes(s.id)?'on':''}" data-act="cd" data-v="${s.id}">${esc(s.ngan)}</button>`).join('')}</div></div>
      <p class="note">Người phụ trách: Quốc Bảo · thông tin minh họa.</p>
      <button class="btn btn-primary">Tạo buổi và phân công</button></form>`
      :coordinator ? '<a class="btn btn-primary" href="#/doi/buoi?moi=1">Tạo buổi mới</a>' : ''}
    <div class="stack"><span class="label">Các buổi của chi đoàn</span>
      ${sessions.map(b=>`<a class="card" href="#/doi/buoi/${b.ma}" style="text-decoration:none;color:inherit"><div class="kv"><b>${esc(b.ten)}</b><span class="tag ${b.mo?'ok':''}">${b.mo?'Đang mở':'Đã đóng'}</span></div><p class="small ink2">${esc(b.dd)} · ${esc(b.tg)}</p><p class="small"><b>${b.kq.nguoi}</b> người tham gia${b.kq.nguoi?` · điểm TB <b>${b.kq.tb}</b> · đạt <b>${b.kq.dat}%</b>`:''}</p></a>`).join('')}</div>`});
});
A.actions.cd = el => { const v = el.dataset.v; let c = A.tmp.chude || [A.q.chude||'T02']; c = c.includes(v) ? c.filter(x=>x!==v) : [...c, v].slice(-2); if(!c.length) c=[v]; A.tmp.chude = c; A.tmp.chudeSet = true; el.parentNode.querySelectorAll('.chip').forEach(n=>n.classList.toggle('on', c.includes(n.dataset.v))); };
document.addEventListener('submit', e => {
  if(e.target.dataset.form!=='buoi-new') return; e.preventDefault();
  if(A.workRole()!=='dp') return;
  let ma;
  do { ma = String(100000 + Math.floor(Math.random()*899999)); } while(S.buoi.some(session=>session.ma===ma));
  const session = {ma, ten:document.getElementById('b-ten').value, dd:document.getElementById('b-dd').value, tg:document.getElementById('b-tg').value, chude:A.tmp.chude||[A.q.chude||'T02'], mo:true, kq:{nguoi:0,tb:0,dat:0,nhom:{ob:0,hs:0,dan:0},saiNhieu:''}};
  S.buoi.unshift(session);
  A.addDemoAssignment(session);
  A.tmp.chude = null; A.tmp.chudeSet = false; A.save(); A.go('#/cong-tac/nhiem-vu/'+ma);
});

/* ===== MH-23 Kết quả buổi ===== */
let poll = null;
A.route(/^\/doi\/buoi\/(\d{6})$/, (m) => {
  clearInterval(poll);
  const b = S.buoi.find(x=>x.ma===m[0] && (A.workRole()==='dp' || A.workTasks().some(task=>task.session===x.ma && !['assigned','declined'].includes(task.status)))); if(!b) return A.screen({title:'Buổi tuyên truyền', body:'<div class="empty"><b>Không tìm thấy buổi</b></div>'});
  const k = b.kq;
  if(b.mo) A.after = () => { poll = setInterval(() => { if(A.path!=='/doi/buoi/'+b.ma) return clearInterval(poll); try{ const s = JSON.parse(localStorage.getItem('lcs-state-v1')); const nb = s.buoi.find(x=>x.ma===b.ma); if(nb && nb.kq.nguoi!==k.nguoi){ Object.assign(b, nb); A.render(); } }catch(e){} }, 3000); };
  return A.screen({mh:'MH-23', title:'Kết quả buổi', tab:'#/doi/buoi', backTo:'#/doi/buoi', body:`
    <div class="card"><b style="font-size:var(--fs-card)">${esc(b.ten)}</b><p class="small ink2">${esc(b.dd)} · ${esc(b.tg)} · Chủ đề: ${b.chude.map(t=>esc(A.scen(t).ngan)).join(', ')}</p></div>
    ${b.mo?`<div class="qr-card" id="qrc">${pseudoQR(b.ma)}<span class="code6">${b.ma}</span><span class="note">QR minh họa, chưa quét được. Mở trang tham gia để xem nội dung.</span>
      <div class="btn-row" style="width:100%"><button class="btn btn-ghost" data-act="fs">Chiếu toàn màn hình</button><a class="btn btn-ghost" href="#/buoi/${b.ma}">Xem trang tham gia</a></div></div>`:''}
    ${k.nguoi?`<div class="kpis">
      <div class="kpi"><div class="n">${k.nguoi}</div><div class="l">Người tham gia</div></div>
      <div class="kpi"><div class="n">${k.tb}</div><div class="l">Điểm trung bình</div></div>
      <div class="kpi"><div class="n">${k.dat}%</div><div class="l">Đạt từ 80 điểm</div></div>
      <div class="kpi"><div class="n">${k.nhom.ob}·${k.nhom.hs}·${k.nhom.dan}</div><div class="l">Cao tuổi · Học sinh · Người dân</div></div></div>
      ${k.saiNhieu?`<div class="card"><span class="label">Câu sai nhiều nhất – nên nhấn mạnh</span><p>${esc(k.saiNhieu)}</p></div>`:''}
      <p class="source">Mỗi thiết bị tính một lượt · không lưu tên người tham gia · số liệu tạm tính cho đến khi điều phối viên duyệt</p>`
      :`<div class="empty"><b>Đang chờ người tham gia</b>Mở trang tham gia để xem bài học của buổi.</div>`}
    ${b.mo?`<button class="btn btn-danger" data-act="close-buoi" data-ma="${b.ma}">Đóng buổi</button>`:''}`});
});
A.actions.fs = () => { const el = document.getElementById('qrc'); if(el.requestFullscreen) el.requestFullscreen().catch(()=>{}); };
A.actions['close-buoi'] = el => A.sheet(`<h2>Đóng buổi tuyên truyền?</h2><p class="ink2">Sau khi đóng, người quét mã vẫn học được nhưng kết quả không tính vào buổi.</p>
  <button class="btn btn-primary" data-act="sheet-close">Chưa đóng</button><button class="btn btn-danger" data-act="close-buoi-do" data-ma="${el.dataset.ma}">Đóng buổi</button>`);
A.actions['close-buoi-do'] = el => { S.buoi.find(b=>b.ma===el.dataset.ma).mo = false; A.save(); A.closeSheet(); A.render(); };
})();
