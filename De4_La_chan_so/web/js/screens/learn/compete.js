/* MH-24 Thi đua chi đoàn – Sáng tạo */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-24 Thi đua chi đoàn ===== */
A.route(/^\/thi-dua$/, (m, q) => {
  const scope = q.pv || 'truong';
  const list = q.state==='trong' ? [] : D.CHIDOAN.filter(c => scope==='xa' || c.loai==='lop');
  const me = D.CHIDOAN.find(c=>c.id===S.cls);
  const meRank = list.findIndex(c=>c.id===me?.id)+1;
  return A.screen({mh:'MH-24', title:'Thi đua chi đoàn', tab:A.workRole()?'#/doi':'#/thu-thach', body:`
    <div class="seg"><a class="${scope==='truong'?'on':''}" href="#/thi-dua?pv=truong">Trong trường</a><a class="${scope==='xa'?'on':''}" href="#/thi-dua?pv=xa">Trong ${esc(S.ward.replace('Phường ','phường ').replace('Xã ','xã '))}</a></div>
    ${list.length?`<div class="card" style="padding:6px 6px">${list.map((c,i)=>`<div class="rank ${c.id===me?.id?'me':''}"><span class="h">${i+1}</span><span>${esc(c.ten)}</span><span class="pt">${c.diem}</span></div>`).join('')}</div>
    ${A.hasAccount() && !A.workRole() ? `<label class="field"><span class="label">Chi đoàn tham gia thi đua</span>
      <select class="select" data-act-compete="1"><option value="">Chọn chi đoàn</option>${D.CHIDOAN.filter(c=>c.loai==='lop').map(c=>`<option value="${esc(c.id)}" ${c.id===S.cls?'selected':''}>${esc(c.ten)}</option>`).join('')}</select></label>` : ''}
    ${me ? `<div class="card"><div class="kv"><b>${esc(me.ten)}</b><b>${meRank?'Hạng '+meRank+' · ':''}${me.diem} điểm</b></div>
      <table class="table mt8"><tr><th>Thành phần</th><th>Điểm</th><th>Tỷ trọng</th></tr>
      <tr><td>Kết quả học (điểm TB bài kiểm tra)</td><td>${me.hoc}</td><td>40%</td></tr>
      <tr><td>Tỷ lệ thành viên tham gia</td><td>${me.thamgia}</td><td>20%</td></tr>
      <tr><td>Buổi tuyên truyền</td><td>${me.tuyen}</td><td>20%</td></tr>
      <tr><td>Đỡ đầu và xác minh</td><td>${me.dodau}</td><td>20%</td></tr></table>
      <p class="hint mt8">Để lên hạng: tổ chức thêm 1 buổi tuyên truyền có QR, hoặc nhận đỡ đầu thêm 1 hộ cao tuổi.</p></div>` : ''}`
    :`<div class="empty"><b>Chi đoàn chưa có điểm</b>Hãy làm bài kiểm tra đầu tiên để mở điểm thi đua.</div><a class="btn btn-primary" href="#/thu-thach">Làm bài kiểm tra</a>`}
    <p class="source">Chỉ công khai điểm theo chi đoàn, không công khai điểm cá nhân · dữ liệu minh họa</p>`});
});
document.addEventListener('change', event => {
  if(!event.target.dataset.actCompete || !A.hasAccount()) return;
  S.cls = event.target.value;
  A.save();
  A.render();
});
})();
