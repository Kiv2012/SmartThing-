/* MH-02 Người thân tin cậy */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const a2hsSheet = () => A.showInstallSheet();
/* ===== MH-02 Cài người thân + MH-02a ===== */
const QH = () => S.role==='hs' ? ['Bố','Mẹ','Anh, chị','Thầy cô chủ nhiệm','Anh chị Đoàn','Khác'] : ['Con gái','Con trai','Cháu','Vợ, chồng','Đoàn viên đỡ đầu','Khác'];
A.route(/^\/nguoi-than$/, (m, q) => {
  const list = q.state==='empty' ? [] : S.relatives;
  const items = list.map((r,i) => `<li class="person"><span class="avatar">${esc(r.ten[0]||'?')}</span><span class="grow"><b>${esc(r.ten)}</b> ${r.uu?'<span class="tag">Ưu tiên</span>':''}<br><span class="ink2 small">${esc(r.qh)} · ${esc(r.sdt)} · ${esc(r.kenh)}</span></span>
     ${r.uu?'':`<button class="link-btn small" data-act="rel-uu" data-i="${i}">Đặt ưu tiên</button>`}<button class="link-btn small" style="color:var(--danger-ink)" data-act="rel-del" data-i="${i}">Xóa</button></li>`).join('');
  const contacts = 'contacts' in navigator && 'ContactsManager' in window;
  return A.screen({mh:'MH-02', title:'Người thân tin cậy', noTab:!!q.dau, listen:'Thêm người thân để dùng nút Hỏi người thân. Khi gặp cuộc gọi lạ, chỉ cần một chạm là người thân biết ngay.', body:`
    <p class="ink2">Khi gặp số lạ hay tin nhắn đáng ngờ, ${A.xung()} chỉ cần một chạm là người thân nhận được cảnh báo. Thêm tối đa 3 người.</p>
    ${list.length ? `<div class="card"><ul class="list">${items}</ul></div>` :
      `<div class="empty"><b>Chưa có người thân nào</b>Thêm người thân để dùng nút "Hỏi người thân". Người đầu tiên sẽ là người ưu tiên.</div>`}
    ${list.length<3 ? `<div class="card stack" id="relform">
      <h2>Thêm người thân</h2>
      ${contacts?`<button class="btn btn-ghost" data-act="rel-contacts">Chọn từ danh bạ</button>`:''}
      <div class="field"><label class="label" for="r-ten">Tên gọi</label><input id="r-ten" class="input" placeholder="Ví dụ: Lan"></div>
      <div class="field"><label class="label" for="r-sdt">Số điện thoại</label><input id="r-sdt" class="input mono" inputmode="tel" placeholder="0912 345 678"></div>
      <div class="field"><label class="label" for="r-qh">Quan hệ</label><select id="r-qh" class="select">${QH().map(x=>`<option>${x}</option>`).join('')}</select></div>
      <div class="field"><label class="label" for="r-kenh">Nhận tin qua</label><select id="r-kenh" class="select"><option>Zalo</option><option>SMS</option><option>Cuộc gọi</option></select></div>
      <div id="r-err"></div>
      <button class="btn btn-ghost" data-act="rel-add">Lưu người này</button>
    </div>` : ''}
    <div class="sticky-cta">
      <button class="btn btn-primary" data-act="rel-done" data-ret="${esc(q.ret||'')}">${list.length?'Xong':'Để sau'}</button>
    </div>`});
});
A.actions['rel-add'] = () => {
  const ten = document.getElementById('r-ten').value.trim();
  const raw = document.getElementById('r-sdt').value; const d = raw.replace(/\D/g,'').replace(/^84(?=\d{9}$)/,'0');
  const err = m => document.getElementById('r-err').innerHTML = `<p class="err">${m}</p>`;
  if(!ten) return err('Hãy nhập tên gọi.');
  if(!/^0\d{9}$/.test(d)) return err('Số điện thoại cần đủ 10 chữ số, bắt đầu bằng 0.');
  if(S.relatives.some(r => r.sdt.replace(/\D/g,'')===d)) return err('Số này đã có trong danh sách.');
  S.relatives.push({id:'r'+Date.now(), ten, sdt:A.fmtPhone(d), qh:document.getElementById('r-qh').value, kenh:document.getElementById('r-kenh').value, uu:!S.relatives.length});
  A.save(); A.toast('Đã lưu '+ten); A.render();
};
A.actions['rel-del'] = el => { const i=+el.dataset.i; const wasUu = S.relatives[i].uu; S.relatives.splice(i,1); if(wasUu && S.relatives[0]) S.relatives[0].uu = true; A.save(); A.render(); };
A.actions['rel-uu'] = el => { S.relatives.forEach((r,i)=>r.uu = i===+el.dataset.i); A.save(); A.render(); };
A.actions['rel-contacts'] = async () => {
  try{ const [c] = await navigator.contacts.select(['name','tel'],{multiple:false}); if(c){ document.getElementById('r-ten').value = (c.name||[''])[0]; document.getElementById('r-sdt').value = (c.tel||[''])[0]; } }catch(e){ A.toast('Không mở được danh bạ, hãy nhập tay'); }
};
A.actions['rel-done'] = el => {
  const ret = el.dataset.ret;
  if(ret==='hoi') return A.go('#/hoi-nguoi-than');
  if(!S.a2hsDone && S.a2hs < 2) return a2hsSheet();
  A.go(A.roleHome());
};
})();
