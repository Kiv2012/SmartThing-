/* MH-06 Kết quả kiểm tra (3 mức + lý do) – Bắt buộc 1 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const uu = A.priorityRelative;
/* ===== MH-06 Kết quả kiểm tra ===== */
A.route(/^\/kiem-tra\/ket-qua$/, (m, q) => {
  let res = A.checkValue(q.v || '');
  if(!res) return A.screen({mh:'MH-06', title:'Kết quả kiểm tra', tab:'#/kiem-tra', body:`<div class="empty"><b>Chưa có gì để kiểm tra</b>Hãy nhập số điện thoại, đường link hoặc số tài khoản.</div><a class="btn btn-primary" href="#/kiem-tra">Kiểm tra</a>`});
  S.lastCheck = Object.assign({raw:q.v, at:Date.now()}, res);
  S.history = [{raw:q.v, value:res.value, level:res.level}, ...S.history.filter(h=>h.value!==res.value)].slice(0,10); A.save();
  const sc = res.type && A.scen(res.type);
  const r = uu();
  const say = `${A.LV[res.level]}. ${res.reasons[0]} ${res.level==='danger'?(S.role==='ob'?'Bà đừng chuyển tiền. Bấm Hỏi người thân ngay.':'Đừng chuyển tiền. Hỏi người thân ngay.'):''}`;
  if(S.deNhin) A.after = () => setTimeout(()=>A.speak(say), 300);
  const askBtn = `<a class="btn btn-primary" href="${r?'#/hoi-nguoi-than':'#/nguoi-than?ret=hoi'}" style="min-height:var(--tap)">${res.level==='danger'?'Hỏi người thân ngay':'Hỏi người thân'}${r?' · '+esc(r.ten):''}</a>`;
  const learn = sc ? `<a class="btn btn-ghost" href="#/hoc/${sc.id}">Học 1 phút về kiểu này</a>` : '';
  const report = `<a class="btn btn-ghost" href="#/bao-cao?tu=kq">Báo cáo</a>`;
  let actions;
  if(res.level==='ok') actions = `<a class="btn btn-primary" href="${A.roleHome()}">Xong</a>${learn}`;
  else if(S.deNhin) actions = `${askBtn}${report}<button class="link-btn" data-act="more-actions" data-t="${sc?sc.id:''}">Xem thêm</button>`;
  else actions = `${askBtn}<div class="btn-row">${report}${learn||'<span></span>'}</div>${res.level==='danger'?'<a class="btn btn-danger" href="#/khan-cap">Tôi đã chuyển tiền</a>':''}`;
  return A.screen({mh:'MH-06', title:'Kết quả kiểm tra', tab:'#/kiem-tra', listen:say, body:`
    <section class="verdict is-${res.level}" aria-live="polite">
      <div class="lvl">${A.verdictIcon(res.level)}<h2>${A.LV[res.level]}</h2></div>
      <p class="what mono">${esc(res.value)}</p>
      <p class="kind">${esc(res.kind)}${sc?' · Kiểu lừa: '+esc(sc.ngan):''}</p>
      <h3>Vì sao?</h3>
      <ol class="ol">${res.reasons.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>
      ${res.level==='ok'?`<p class="remind">Số này đúng, nhưng nếu ai giục ${A.xung()} chuyển tiền gấp, hãy dừng lại và hỏi người thân.</p>`
        : res.level==='danger'?`<p class="remind">Đừng chuyển tiền, đừng đọc mã OTP cho người này.</p>`:''}
    </section>
    <div class="stack">${actions}</div>
    <p class="source">Căn cứ: danh sách đã xác minh, báo cáo cộng đồng, dấu hiệu của đường link · dữ liệu giả lập</p>`});
});
A.actions['more-actions'] = el => {
  A.sheet(`<h2>Việc khác</h2>${el.dataset.t?`<a class="btn btn-ghost" href="#/hoc/${el.dataset.t}">Học 1 phút về kiểu này</a>`:''}
    <a class="btn btn-danger" href="#/khan-cap">Tôi đã chuyển tiền</a><button class="btn btn-ghost" data-act="sheet-close">Đóng</button>`);
};
})();
