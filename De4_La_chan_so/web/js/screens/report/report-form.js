/* MH-08 Báo cáo lừa đảo 3 bước – Bắt buộc 2 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-08 Báo cáo 3 bước ===== */
const KENH = ['Cuộc gọi','Tin nhắn','Đường link','Số tài khoản','Mạng xã hội'];
const draft = () => (S.draft = S.draft || {type:null, kenh:null, value:'', anh:0, mota:'', ward:S.ward, when:'Hôm nay', chuyen:null, an:!A.hasAccount()});
A.route(/^\/bao-cao$/, (m, q) => {
  if(q.tu==='kq' && S.lastCheck && !q.b){ S.draft = null; const d = draft(); d.type = S.lastCheck.type; d.value = S.lastCheck.value; d.kenh = {'Số điện thoại':'Cuộc gọi','Đường link':'Đường link','Số tài khoản':'Số tài khoản'}[S.lastCheck.kind]; A.save(); }
  if(q.tu==='tn' && S.lastAnalysis && !q.b){ S.draft = null; const d = draft(); d.type = S.lastAnalysis.type; d.kenh = 'Tin nhắn'; d.mota = S.lastAnalysis.text.slice(0,300); A.save(); }
  if(q.moi){ S.draft = null; }
  const d = draft(); const b = +(q.b||1);
  if(!A.hasAccount()) d.an = true;
  if(q['co-ten'] && A.hasAccount()) d.an = false;
  let body = '';
  if(b===1){
    body = `<p class="ink2">Chọn kiểu lừa giống nhất với điều ${A.xung()} gặp.</p>
      <div class="pick-grid">${D.SCEN.map(s=>`<button class="pick ${d.type===s.id?'on':''}" data-act="d-type" data-v="${s.id}" aria-pressed="${d.type===s.id}"><b>${esc(s.ngan)}</b></button>`).join('')}
      <button class="pick ${d.type==='X'?'on':''}" data-act="d-type" data-v="X"><b>Không rõ</b></button></div>
      ${!d.type?'<p class="note">Chọn một kiểu để đi tiếp</p>':''}
      <div class="sticky-cta">${d.type ? '<a class="btn btn-primary" href="#/bao-cao?b=2">Tiếp</a>' : '<button class="btn btn-primary" disabled>Tiếp</button>'}</div>`;
  } else if(b===2){
    body = `<div class="stack"><span class="label">Kẻ gian liên lạc qua (bắt buộc)</span><div class="chips">${KENH.map(k=>`<button class="chip ${d.kenh===k?'on':''}" data-act="d-kenh" data-v="${k}">${k}</button>`).join('')}</div></div>
      <div class="field"><label class="label" for="d-val">Số điện thoại, đường link hoặc số tài khoản</label><input id="d-val" class="input mono" value="${esc(d.value)}" data-act-input="value"></div>
      <div class="field"><span class="label">Ảnh chụp màn hình (tối đa 3)</span><label class="btn btn-ghost">Thêm ảnh<input type="file" accept="image/*" multiple class="sr" data-act-file="1"></label><span class="note">${d.anh?`Đã chọn ${d.anh} ảnh`:'Chưa có ảnh'}</span></div>
      <div class="field"><label class="label" for="d-mota">Mô tả ngắn</label><textarea id="d-mota" class="textarea" style="min-height:96px" placeholder="Chuyện gì đã xảy ra?">${esc(d.mota)}</textarea></div>
      ${q.loi?'<p class="hint" role="alert">Hãy chọn kênh kẻ gian đã liên lạc.</p>':''}
      <div class="sticky-cta"><button class="btn btn-primary" data-act="d-next2">Tiếp</button></div>`;
  } else {
    body = `<div class="field"><label class="label" for="d-ward">Xã, phường nơi xảy ra</label><select id="d-ward" class="select">${D.WARDS.map(w=>`<option ${w===d.ward?'selected':''}>${esc(w)}</option>`).join('')}</select></div>
      <div class="stack"><span class="label">Thời điểm</span><div class="chips">${['Hôm nay','Hôm qua','Tuần này','Lâu hơn'].map(k=>`<button class="chip ${d.when===k?'on':''}" data-act="d-when" data-v="${k}">${k}</button>`).join('')}</div></div>
      <div class="stack"><span class="label">${A.xung()==='bà'?'Bà':'Bạn'} đã chuyển tiền chưa? (bắt buộc)</span>
        <div class="btn-row"><button class="pick ${d.chuyen==='chua'?'on':''}" data-act="d-chuyen" data-v="chua"><b>Chưa chuyển</b></button><button class="pick ${d.chuyen==='roi'?'on':''}" data-act="d-chuyen" data-v="roi"><b>Đã chuyển</b></button></div></div>
      <label class="switch-row"><span><b>Gửi ẩn danh</b><br><span class="small ink2">Không gửi tên và số điện thoại của ${A.xung()}</span></span><span class="switch"><input type="checkbox" ${d.an?'checked':''} data-act-check="an"><i></i></span></label>
      ${q.loi?'<p class="hint" role="alert">Hãy cho biết đã chuyển tiền hay chưa.</p>':''}
      <div class="sticky-cta"><button class="btn btn-primary" data-act="d-send">Gửi báo cáo</button></div>`;
  }
  const names = ['Kiểu lừa','Bằng chứng','Nơi xảy ra'];
  return A.screen({mh:'MH-08', title:'Báo cáo lừa đảo', noTab:true, steps:[b,3,names[b-1]], back:true, confirm:b===1, backTo: b===1?A.roleHome():'#/bao-cao?b='+(b-1), body});
});
const keepD = () => { const d = draft(); const v = document.getElementById('d-val'), mo = document.getElementById('d-mota'), w = document.getElementById('d-ward'); if(v) d.value = v.value; if(mo) d.mota = mo.value; if(w) d.ward = w.value; A.save(); };
A.actions['d-type'] = el => { draft().type = el.dataset.v; A.save(); A.render(); };
A.actions['d-kenh'] = el => { keepD(); draft().kenh = el.dataset.v; A.save(); A.go('#/bao-cao?b=2'); };
A.actions['d-when'] = el => { keepD(); draft().when = el.dataset.v; A.save(); A.go('#/bao-cao?b=3'); };
A.actions['d-chuyen'] = el => { keepD(); draft().chuyen = el.dataset.v; A.save(); A.go('#/bao-cao?b=3'); };
A.actions['d-next2'] = () => { keepD(); if(!draft().kenh) return A.go('#/bao-cao?b=2&loi=1'); A.go('#/bao-cao?b=3'); };
document.addEventListener('change', e => {
  if(e.target.dataset.actFile){ const d = draft(); d.anh = Math.min(3, e.target.files.length); keepD(); A.save(); A.render(); }
  if(e.target.dataset.actCheck==='an'){
    keepD();
    if(!e.target.checked && !A.hasAccount()){
      e.target.checked = true;
      draft().an = true;
      A.save();
      const next = encodeURIComponent('#/bao-cao?b=3&co-ten=1');
      A.sheet(`<h2>Đăng nhập để lưu và theo dõi</h2><p>Bạn vẫn có thể gửi báo cáo ẩn danh.</p>
        <a class="btn btn-primary" href="#/dang-nhap?next=${next}">Đăng nhập</a>
        <button class="btn btn-ghost" data-act="sheet-close">Để sau</button>`);
    }else{
      draft().an = e.target.checked;
      A.save();
    }
  }
});
A.actions['d-send'] = () => {
  keepD(); const d = draft();
  if(!d.chuyen) return A.go('#/bao-cao?b=3&loi=1');
  const ma = 'BC-2026-'+String(S.reportSeq).padStart(4,'0');
  S.myReports.unshift({ma, type:d.type, kenh:d.kenh, value:d.value, ward:d.ward, anonymous:d.an || !A.hasAccount(), status:'received', at:Date.now(), chuyen:d.chuyen});
  S.lastReport = ma; S.reportSeq++; S.draft = null; A.save();
  A.go(d.chuyen==='roi' ? '#/khan-cap?bc=1' : '#/bao-cao/da-nhan');
};
})();
