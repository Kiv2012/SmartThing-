/* MH-05 Kiểm tra nhanh – Bắt buộc 1 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-05 Kiểm tra nhanh ===== */
A.route(/^\/kiem-tra$/, (m, q) => {
  const st = q.state || '';
  const hist = st==='chua-co' ? [] : S.history;
  const seg = `<div class="seg"><a class="on" href="#/kiem-tra">Số · Link · Tài khoản</a><a href="#/tin-nhan" data-act="to-ai">Dán tin nhắn</a></div>`;
  const msg = st==='trong' ? `<p class="hint" id="check-error" role="alert">${S.contentGroup==='ob'?'Bà':'Bạn'} chưa nhập gì. Hãy dán hoặc gõ số điện thoại, đường link, số tài khoản.</p>`
    : st==='thieu-so' ? `<p class="hint" id="check-error" role="alert">Số này có vẻ thiếu chữ số, ${A.xung()} xem lại nhé.</p>` : st==='khong-ro' ? '<p class="hint" id="check-error" role="alert">Chưa nhận ra số hoặc đường link. Nếu là tin nhắn, hãy chọn Phân tích tin nhắn.</p>' : '';
  A.after = () => {
    const inp = document.getElementById('q'); const out = document.getElementById('detect');
    const upd = () => { const d = A.detect(inp.value);
      out.innerHTML = d.kind==='empty' ? '' : A.KIND_LABEL[d.kind] ? `Nhận ra: <b>${A.KIND_LABEL[d.kind]}</b>${d.both?' (sẽ tra cả số tài khoản)':''}`
        : d.kind==='text' ? `Đây là một đoạn tin nhắn. <a href="#/tin-nhan" data-act="to-ai">Phân tích tin nhắn này</a>` : d.kind==='badphone' ? 'Số điện thoại có vẻ thiếu chữ số' : 'Chưa nhận ra loại dữ liệu'; };
    inp.addEventListener('input', upd); if(q.v || st==='tin-nhan'){ inp.value = q.v || A.tmp.checkInput || ''; upd(); }
    if(st==='dang-kiem-tra') { inp.value='0868 000 111'; upd(); }
  };
  return A.screen({mh:'MH-05', title:'Kiểm tra nhanh', tab:'#/kiem-tra', listen:'Dán hoặc đọc số điện thoại, đường link, số tài khoản rồi bấm Kiểm tra.', body:`
    ${seg}
    <div class="check-workspace">
    <form class="card stack check-panel" data-form="check">
      <label class="check-label" for="q">Số điện thoại, đường link hoặc số tài khoản</label>
      <div class="omni"><input id="q" autocomplete="off" placeholder="Ví dụ: 0868 000 111" aria-describedby="detect${msg?' check-error':''}" ${msg?'aria-invalid="true"':''}>
        <button type="button" class="paste" data-act="paste" data-target="q">Dán</button>
        ${A.Rec?`<button type="button" class="mic" data-act="mic" aria-label="Đọc số bằng giọng nói">${icon('mic')}</button>`:''}</div>
      <div id="detect" class="detect" aria-live="polite"></div>
      ${msg}
      ${st==='dang-kiem-tra'?`<div class="card center"><b>Đang kiểm tra…</b><div class="steps" style="border:0;padding:8px 0 0"><div class="bar"><i style="width:60%"></i></div></div></div>`
        :`<button class="btn btn-primary" type="submit">Kiểm tra</button>`}
    </form>
    <div class="check-details">
    <div class="stack"><span class="label">Thử nhanh</span><div class="chips">${D.EXAMPLES.map(x=>`<button class="chip mono" data-act="example" data-v="${esc(x.v)}">${esc(x.lb)}</button>`).join('')}</div></div>
    <div class="stack"><span class="label">Vừa kiểm tra</span>
      ${hist.length ? `<div class="card"><ul class="list">${hist.slice(0,5).map(h=>`<li><a class="kv" style="text-decoration:none;color:inherit" href="#/kiem-tra/ket-qua?v=${encodeURIComponent(h.raw)}"><span class="mono">${esc(h.value)}</span><span class="tag ${h.level}">${A.LV[h.level]}</span></a></li>`).join('')}</ul></div>`
        : `<div class="empty"><b>${A.xung()==='bà'?'Bà':'Bạn'} chưa kiểm tra lần nào</b>Thử bấm một ví dụ ở trên để xem cách hoạt động.</div>`}
    </div>
    <div class="check-links"><a class="link-btn" href="#/ong-ba/tro-ly">Kể bằng giọng nói</a><a class="link-btn" href="#/khan-cap">Tôi đã chuyển tiền</a></div>
    </div>
    </div>`});
});
A.actions.example = el => { document.getElementById('q').value = el.dataset.v; A.actions['do-check'](); };
A.actions['do-check'] = () => A.submitCheck(document.getElementById('q').value);
A.submitCheck = (v) => {
  const d = A.detect(v);
  if(d.kind==='empty') return A.go('#/kiem-tra?state=trong');
  if(d.kind==='badphone') return A.go('#/kiem-tra?state=thieu-so&v='+encodeURIComponent(v));
  if(d.kind==='text'){
    A.tmp.checkInput = v;
    return A.go('#/kiem-tra?state=tin-nhan');
  }
  if(d.kind==='unknown') return A.go('#/kiem-tra?state=khong-ro&v='+encodeURIComponent(v));
  A.go('#/kiem-tra/ket-qua?v='+encodeURIComponent(v));
};
A.actions['to-ai'] = () => {
  const value = document.getElementById('q').value;
  if(A.detect(value).kind==='text') A.tmp.msg = value;
  A.go('#/tin-nhan');
};
A.actions.mic = el => {
  if(el.classList.contains('on')) return;
  el.classList.add('on'); A.toast('Đang nghe… hãy đọc số');
  A.listen(t => { const inp = document.getElementById('q'); inp.value = t.replace(/[^\d]/g,'').length>=6 ? t.replace(/[^\d+]/g,'') : t; inp.dispatchEvent(new Event('input')); }, () => el.classList.remove('on'));
};
document.addEventListener('submit', e => { if(e.target.dataset.form==='check'){ e.preventDefault(); A.actions['do-check'](); } });
})();
