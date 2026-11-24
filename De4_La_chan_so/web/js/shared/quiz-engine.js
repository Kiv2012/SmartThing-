/* Bộ máy bài kiểm tra: tạo đề, hiển thị câu hỏi, chấm điểm, trang kết quả (CN-07) */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const shuffle = a => { const b = a.slice(); for(let i=b.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [b[i],b[j]]=[b[j],b[i]]; } return b; };
function buildQuiz(kind){
  let qs;
  if(kind==='ob') qs = ['Q1','Q2','Q3','Q11','Q12'].map(id=>D.QUIZ.find(x=>x.id===id));
  else if(kind==='buoi') qs = ['Q1','Q2','Q3','Q7','Q5'].map(id=>D.QUIZ.find(x=>x.id===id));
  else qs = D.QUIZ.filter(x => x.for==='all' || x.for==='hs').slice(0,10);
  return {kind, qs: shuffle(qs).map(x => x.dang==='act' ? (()=>{ const order = shuffle(x.o.map((_,i)=>i)); return Object.assign({}, x, {o:order.map(i=>x.o[i]), a:order.indexOf(x.a)}); })() : x), i:0, pts:[], ans:null};
}
function quizScreen(q, buoi){
  const Z = A.tmp.quiz; const n = Z.qs.length; const it = Z.qs[Z.i]; const ans = Z.ans;
  let body = '';
  if(it.dang==='tl'){
    body = `<p class="part-title">Tin này thật hay lừa đảo?</p>
      <div class="chat"><span class="who">${esc(it.who)}</span><div class="bubble">${esc(it.msg)}</div></div>
      <div class="btn-row">${['that','lua'].map(v=>{ const cls = ans==null?'':v===it.a?'right':(ans===v?'wrong':''); return `<button class="quiz-opt ${cls}" data-act="qa" data-v="${v}" ${ans!=null?'disabled':''}>${v==='that'?'Tin thật':'Lừa đảo'}</button>`; }).join('')}</div>`;
  } else if(it.dang==='act'){
    body = `<p class="part-title">${esc(it.q)}</p><div class="stack">${it.o.map((o,i)=>{ const cls = ans==null?'':i===it.a?'right':(ans===i?'wrong':''); return `<button class="quiz-opt ${cls}" data-act="qa" data-v="${i}" ${ans!=null?'disabled':''}>${esc(o)}</button>`; }).join('')}</div>`;
  } else {
    const sel = Z.sel || [];
    body = `<p class="part-title">Chạm vào các câu đáng ngờ, rồi bấm Kiểm tra</p>
      <div class="chat"><span class="who">${esc(it.who)}</span><div class="bubble">${it.sents.map((s,i)=>{
        let cls = sel.includes(i)?'on':''; if(ans!=null){ cls = it.flags.includes(i) ? (sel.includes(i)?'right':'missed') : (sel.includes(i)?'wrong':''); }
        return `<span class="tapsent ${cls}" role="button" tabindex="0" data-act="qtap" data-i="${i}">${esc(s)}</span>`; }).join(' ')}</div></div>
      ${ans==null?`<button class="btn btn-primary" data-act="qa" data-v="tap" ${sel.length?'':'disabled'}>Kiểm tra</button>`:''}`;
  }
  const right = ans!=null && Z.pts[Z.i] >= 99;
  const fb = ans!=null ? `<div class="card ${right?'':''}" aria-live="polite"><p class="tag ${right?'ok':Z.pts[Z.i]>0?'warn':'danger'}">${right?'Đúng':Z.pts[Z.i]>0?'Đúng một phần':'Chưa đúng'}</p><p class="mt8">${esc(it.why)}</p></div>
    <button class="btn btn-primary" data-act="qnext">${Z.i<n-1?'Câu tiếp theo':'Xem kết quả'}</button>` : '';
  return A.screen({mh:'MH-14', title:'Kiểm tra nhận diện', noTab:true, steps:[Z.i+1, n, (S.deNhin||Z.kind==='ob')?'Không tính giờ':'Câu '+(Z.i+1)], confirm:'Dừng bài kiểm tra?', backTo: buoi?'#/buoi/'+buoi:A.roleHome(), listen: it.msg || it.q || it.sents.join(' '), body: body + fb});
}
A.actions.qtap = el => { const Z = A.tmp.quiz; if(Z.ans!=null) return; Z.sel = Z.sel||[]; const i=+el.dataset.i; Z.sel = Z.sel.includes(i)?Z.sel.filter(x=>x!==i):[...Z.sel,i]; A.render(); };
A.actions.qa = el => {
  const Z = A.tmp.quiz; const it = Z.qs[Z.i]; let pt = 0;
  if(it.dang==='tl'){ Z.ans = el.dataset.v; pt = Z.ans===it.a?100:0; }
  else if(it.dang==='act'){ Z.ans = +el.dataset.v; pt = Z.ans===it.a?100:0; }
  else { Z.ans = 'tap'; const sel = Z.sel||[]; const good = sel.filter(i=>it.flags.includes(i)).length, bad = sel.filter(i=>!it.flags.includes(i)).length; pt = Math.max(0, Math.round((good - bad)/it.flags.length*100)); }
  Z.pts[Z.i] = pt; A.render();
  if(S.deNhin) A.speak((pt>=99?'Đúng. ':'Chưa đúng. ')+it.why);
};
A.actions.qnext = () => {
  const Z = A.tmp.quiz; Z.ans = null; Z.sel = [];
  if(Z.i < Z.qs.length-1){ Z.i++; A.render(); return; }
  const score = Math.round(Z.pts.reduce((s,x)=>s+x,0)/Z.qs.length);
  const weak = [...new Set(Z.qs.filter((x,i)=>Z.pts[i]<99 && x.t).map(x=>x.t))];
  if(Z.kind==='buoi'){
    const b = S.buoi.find(x=>x.ma===Z.buoi); if(b){ const k=b.kq; k.tb = Math.round((k.tb*k.nguoi+score)/(k.nguoi+1)); k.dat = Math.round(((k.dat/100*k.nguoi)+(score>=80?1:0))/(k.nguoi+1)*100); k.nguoi++; k.nhom[Z.nhom||'dan']++; A.save(); }
  }
  S.quiz = {best: Math.max(score, (S.quiz||{}).best||0), last:score, weak}; A.save();
  A.go(Z.kind==='buoi' ? `#/buoi/${Z.buoi}/ket-qua?d=${score}` : `#/thu-thach/ket-qua?d=${score}`);
};
function resultBody(score, weak, extra){
  const ok = score>=80;
  return `<div class="card center stack"><span class="label">Điểm của ${A.xung()}</span><p class="score">${score}<span style="font-size:24px">/100</span></p>
      <p class="tag ${ok?'ok':'warn'}" style="align-self:center">${ok?'Đạt – nhận Chứng nhận':'Còn '+(80-score)+' điểm nữa để nhận Chứng nhận'}</p></div>
    ${weak.length?`<div class="card"><span class="label">Kiểu lừa ${A.xung()} cần học thêm</span><ul class="list">${weak.map(t=>`<li><a href="#/hoc/${t}">${esc(A.scen(t).ten)}</a></li>`).join('')}</ul></div>`:`<div class="card"><b>Không sai câu nào.</b> ${A.xung()==='bà'?'Bà':'Bạn'} nhận diện rất tốt!</div>`}
    <div class="cert ${ok?'':'locked'}"><span class="seal">${A.flagSvg.replace('width="22" height="22"','width="40" height="40"')}</span>
      <h2>CHỨNG NHẬN LÁ CHẮN SỐ</h2><p><b>${esc(S.name||'Người tham gia')}</b></p><p class="small ink2">${ok?'Đã hoàn thành bài kiểm tra nhận diện lừa đảo · '+score+' điểm · 24/11/2026':'Chứng nhận mở khi đạt từ 80 điểm. Học thêm các bài ở trên rồi làm lại nhé.'}</p></div>
    ${extra||''}`;
}
A.quiz = {build: buildQuiz, screen: quizScreen, result: resultBody};
})();
