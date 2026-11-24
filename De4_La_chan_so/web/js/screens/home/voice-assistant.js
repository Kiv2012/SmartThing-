/* MH-19 Bấm và kể – trợ lý giọng nói */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const uu = A.priorityRelative;
/* ===== MH-19 Trợ lý giọng nói ===== */
A.route(/^\/ong-ba\/tro-ly$/, (m, q) => {
  const res = A.tmp.voice; const r = uu();
  let out = '';
  if(res){
    const sc = res.type && A.scen(res.type);
    const answer = sc ? `${sc.nenLam[0]}. ${S.contentGroup==='ob'?'Bà':'Bạn'} đừng chuyển tiền. Bấm Gọi ${r?r.ten:'người thân'} ngay.` : `${S.contentGroup==='ob'?'Bà':'Bạn'} đừng chuyển tiền cho người lạ. Hỏi người thân trước đã.`;
    A.after = () => setTimeout(()=>A.speak(answer), 300);
    out = `<div class="card"><span class="label">${A.xung()==='bà'?'Bà':'Bạn'} vừa kể</span><p>"${esc(res.text)}"</p></div>
      <section class="verdict is-${res.flagged?res.level:'warn'}"><div class="lvl">${A.verdictIcon(res.flagged?res.level:'warn')}<h2>${A.LV[res.flagged?res.level:'warn']}</h2></div>
      ${sc?`<p class="kind">Giống kiểu lừa: <b>${esc(sc.ngan)}</b></p>`:''}<p class="remind">${esc(answer)}</p></section>
      <div class="stack">${r?`<a class="btn btn-call" href="tel:${r.sdt.replace(/\s/g,'')}">Gọi ${esc(r.ten)} ngay</a><a class="btn btn-primary" href="#/hoi-nguoi-than">Gửi cho ${esc(r.ten)}</a>`:`<a class="btn btn-primary" href="#/nguoi-than?ret=hoi">Thêm người thân</a>`}</div>`;
  }
  return A.screen({mh:'MH-19', title:'Bấm và kể', tab:'#/ong-ba', body:`
    ${!res?`<p class="ink2" style="font-size:var(--fs-card)">Bấm nút micro rồi kể chuyện vừa xảy ra, ví dụ: "Có người xưng công an bảo tôi chuyển tiền".</p>`:''}
    ${A.Rec?`<div class="listening"><button class="micbig" data-act="voice" aria-label="Bấm để nói">${icon('mic')}</button><span id="vstate" class="ink2">Bấm để nói</span></div>`
      :`<div class="empty"><b>Máy này chưa hỗ trợ nghe giọng nói</b>${A.xung()==='bà'?'Bà':'Bạn'} vẫn có thể kiểm tra bằng cách dán hoặc gõ số.</div><a class="btn btn-ghost" href="#/kiem-tra">Kiểm tra số lạ</a>`}
    ${!res?`<button class="btn btn-ghost" data-act="voice-demo">Thử với câu mẫu</button>`:''}
    ${out}`});
});
A.actions.voice = el => {
  el.classList.add('on'); document.getElementById('vstate').textContent = 'Đang nghe…';
  const r = A.listen(t => { A.tmp.voice = Object.assign({text:t}, A.analyze(t)); A.render(); }, () => { el.classList.remove('on'); const v = document.getElementById('vstate'); if(v) v.textContent = 'Bấm để nói'; });
  if(!r){ el.classList.remove('on'); A.toast('Không mở được micro'); }
};
A.actions['voice-demo'] = () => { const t = 'Có người xưng công an gọi bảo tôi liên quan rửa tiền, phải chuyển tiền để xác minh, không được nói với ai.'; A.tmp.voice = Object.assign({text:t}, A.analyze(t)); A.render(); };
})();
