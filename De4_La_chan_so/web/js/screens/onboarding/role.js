/* MH-01 Chọn vai trò */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const tmp = A.tmp;
/* ===== MH-01 Chọn vai trò ===== */
A.route(/^\/bat-dau$/, () => {
  const r = tmp.role;
  const pick = (id, b, s) => `<button class="pick ${r===id?'on':''}" data-act="pick-role" data-role="${id}" aria-pressed="${r===id}"><b>${b}</b><span>${s}</span></button>`;
  const wardOpts = D.WARDS.map(w => `<option ${w===S.ward?'selected':''}>${esc(w)}</option>`).join('');
  return A.screen({mh:'MH-01', brand:true, noTab:true, body:`
    <div class="stack">
      <h2 style="font-size:24px">Kiểm tra trước khi chuyển tiền</h2>
      <p class="ink2">Kiểm tra số điện thoại, đường link, số tài khoản lạ và hỏi người thân chỉ với vài chạm.</p>
    </div>
    <div class="stack" role="group" aria-label="Bạn là ai?">
      <span class="label">Bạn là ai?</span>
      ${pick('ob','Ông bà, người cao tuổi','Chữ to, có đọc to, nút Hỏi người thân')}
      ${pick('hs','Học sinh','Dán tin nhắn lạ để phân tích, học và thi đua')}
      ${pick('tnv','Đội thanh niên tình nguyện','Thống kê kiểu lừa mới, tuyên truyền, đỡ đầu')}
    </div>
    <div class="field"><label class="label" for="f-name">Tên gọi (không bắt buộc)</label><input id="f-name" class="input" value="${esc(tmp.name||'')}" placeholder="Ví dụ: Bà Sáu" data-act-input="name"></div>
    <div class="field"><label class="label" for="f-ward">Xã, phường</label><select id="f-ward" class="select">${wardOpts}</select></div>
    ${r==='hs'?`<div class="field"><label class="label" for="f-cls">Lớp (chi đoàn) · ${esc(D.SCHOOL)}</label><select id="f-cls" class="select">${['12A1','12A2','11A3','10A2'].map(c=>`<option>${c}</option>`).join('')}</select></div>`:''}
    ${r==='tnv'?`<div class="field"><label class="label" for="f-cls">Chi đoàn</label><select id="f-cls" class="select"><option value="KP5">Chi đoàn Khu phố 5</option><option value="KP2">Chi đoàn Khu phố 2</option><option value="12A1">Chi đoàn 12A1</option></select></div>
      <div class="field"><label class="label" for="f-code">Mã đội (giả lập: 2026)</label><input id="f-code" class="input" inputmode="numeric" value="2026"></div>`:''}
    <div class="sticky-cta">
      <button class="btn btn-primary" data-act="start" ${r?'':'disabled'}>Bắt đầu</button>
      ${r?'':'<p class="note center">Chọn một vai trò để bắt đầu</p>'}
      <button class="btn btn-ghost" data-go="#/kiem-tra">Kiểm tra ngay, không cần đăng ký</button>
    </div>`});
});
A.actions['pick-role'] = el => { tmp.name = (document.getElementById('f-name')||{}).value||''; tmp.role = el.dataset.role; A.render(); };
A.actions.start = () => {
  const r = tmp.role; if(!r) return;
  S.name = document.getElementById('f-name').value.trim() || (r==='ob'?'Bà Sáu':r==='hs'?'Minh Anh':'Đoàn viên Quốc Bảo');
  S.ward = document.getElementById('f-ward').value;
  const c = document.getElementById('f-cls'); if(c) S.cls = c.value;
  S.role = r; S.deNhin = r==='ob'; A.save();
  A.go(r==='tnv' ? '#/doi' : '#/nguoi-than?dau=1');
};
})();
