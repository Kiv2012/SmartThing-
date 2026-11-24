/* MH-13 Thư viện và bài học 1 phút – Bắt buộc 4 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
S.learned = S.learned || [];
/* ===== MH-13 Thư viện ===== */
A.route(/^\/hoc$/, (m, q) => {
  const f = q.loc || (S.contentGroup==='ob'?'ob':S.contentGroup==='hs'?'hs':'all');
  const list = D.SCEN.filter(s => f==='all' || s.doiTuong===f || s.doiTuong==='all');
  return A.screen({mh:'MH-13', title:'Bài học 1 phút', tab:'#/hoc', back:false, body:`
    <p class="ink2">Mỗi bài là một tình huống thật, học trong 60 giây.</p>
    <div class="seg"><a class="${f==='all'?'on':''}" href="#/hoc?loc=all">Tất cả</a><a class="${f==='ob'?'on':''}" href="#/hoc?loc=ob">Ông bà</a><a class="${f==='hs'?'on':''}" href="#/hoc?loc=hs">Học sinh</a></div>
    <div class="card"><ul class="list">${list.map((s,i)=>`<li><a class="kv" style="text-decoration:none;color:inherit" href="#/hoc/${s.id}"><span><b>${esc(s.ten)}</b><br><span class="small ink2">${esc(s.kenh)} · 1 phút</span></span>${S.learned.includes(s.id)?'<span class="tag ok">Đã học</span>':''}</a></li>`).join('')}</ul></div>
    <a class="btn btn-primary" href="#/thu-thach">Làm bài kiểm tra nhận diện</a>`});
});

/* ===== MH-13 Bài học 60 giây ===== */
const PARTS = [['Tình huống',15],['3 dấu hiệu',20],['Nên làm',15],['Tự kiểm tra',10]];
let lt = null;
A.route(/^\/hoc\/(T\d\d)$/, (m, q) => {
  const sc = A.scen(m[0]); if(!sc) return A.screen({title:'Bài học', body:'<div class="empty"><b>Không tìm thấy bài học</b></div>'});
  const p = Math.min(3, Math.max(0, parseInt(q.p,10)||0)); const buoi = /^\d{6}$/.test(q.buoi||'') ? q.buoi : null;
  const proj = q.chieu ? 'style="font-size:22px"' : '';
  clearInterval(lt);
  let body = '';
  const chat = (flag) => `<div class="chat"><span class="who">${esc(sc.chat[0].w)}</span>${sc.chat.map(c=>`<div class="bubble">${flag&&c.f?`<span class="flagged">${esc(c.t)}</span>`:esc(c.t)}</div>`).join('')}</div>`;
  if(p===0) body = `<p class="ink2">Chuyện thường gặp:</p>${chat(false)}`;
  if(p===1) body = `${chat(true)}<div class="card"><span class="label">3 dấu hiệu nhận ra</span><ol class="ol">${sc.dauHieu.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`;
  if(p===2) body = `<div class="card"><span class="label">Nên làm</span><ol class="ol">${sc.nenLam.map(x=>`<li><b>${esc(x)}</b></li>`).join('')}</ol></div>`;
  if(p===3){
    const a = q.tl;
    body = `<div class="card stack"><b>${esc(sc.tuKiem.q)}</b>${sc.tuKiem.o.map((o,i)=>{
      const cls = a==null ? '' : i===sc.tuKiem.a ? 'right' : (+a===i ? 'wrong' : '');
      return `<a class="quiz-opt ${cls}" href="#/hoc/${sc.id}?p=3&tl=${i}${buoi?'&buoi='+buoi:''}${q.chieu?'&chieu=1':''}">${esc(o)}</a>`;}).join('')}
      ${a!=null?`<p class="${+a===sc.tuKiem.a?'tag ok':'tag danger'}">${+a===sc.tuKiem.a?'Đúng rồi!':'Chưa đúng.'} ${esc(sc.nenLam[0])}.</p>`:''}</div>`;
    if(a!=null && !S.learned.includes(sc.id)){ S.learned.push(sc.id); A.save(); }
  }
  const nextHref = `#/hoc/${sc.id}?p=${p+1}${buoi?'&buoi='+buoi:''}${q.chieu?'&chieu=1':''}${q['tu-dong']==='1'?'&tu-dong=1':''}`;
  const timerHref = `#/hoc/${sc.id}?p=${p}${buoi?'&buoi='+buoi:''}${q.chieu?'&chieu=1':''}`;
  const idx = D.SCEN.indexOf(sc); const nextLesson = D.SCEN[(idx+1)%D.SCEN.length];
  const endBtns = buoi ? `<a class="btn btn-primary" href="#/buoi/${buoi}/kiem-tra">Làm 5 câu kiểm tra</a>`
    : `<a class="btn btn-primary" href="#/thu-thach">Làm bài kiểm tra</a><a class="btn btn-ghost" href="#/hoc/${nextLesson.id}">Bài tiếp theo</a>`;
  const say = p===0 ? sc.chat.map(c=>c.t).join(' ') : p===1 ? 'Ba dấu hiệu. '+sc.dauHieu.join('. ') : p===2 ? 'Nên làm. '+sc.nenLam.join('. ') : sc.tuKiem.q;
  A.after = () => {
    if(S.readAloud) setTimeout(()=>{ if(A.path===`/hoc/${sc.id}` && S.readAloud) A.speak(say); }, 250);
    if(p<3 && q['tu-dong']==='1'){
      const dur = PARTS[p][1]; let t = 0; const bar = document.querySelector('.lessonbar i.cur b'); const tm = document.getElementById('timer');
      const left0 = PARTS.slice(p).reduce((s,x)=>s+x[1],0);
      lt = setInterval(() => { t += .25; if(bar) bar.style.width = Math.min(100, t/dur*100)+'%'; if(tm) tm.textContent = Math.ceil(left0 - t)+' giây';
        if(t>=dur){ clearInterval(lt); if(A.path===`/hoc/${sc.id}`) location.hash = nextHref; } }, 250);
    }
  };
  const left = PARTS.slice(p).reduce((s,x)=>s+x[1],0);
  return A.screen({mh:'MH-13', title:sc.ngan, tab:buoi?'':'#/hoc', noTab:!!buoi||!!q.chieu, backTo:buoi?'#/buoi/'+buoi:'#/hoc', listen:say, body:`
    <div class="lessonbar" aria-hidden="true">${PARTS.map((x,i)=>`<i class="${i<p?'done':i===p?'cur':''}"><b></b></i>`).join('')}</div>
    <div class="kv"><h2 class="part-title">${PARTS[p][0]}</h2><span class="timer" id="timer">${p<3?left+' giây':''}</span></div>
    <div ${proj} class="stack">${body}</div>
    <div class="stack mt8">${p<3?`<div class="btn-row"><a class="btn btn-ghost" href="${timerHref}${q['tu-dong']==='1'?'':'&tu-dong=1'}">${q['tu-dong']==='1'?'Tạm dừng':'Tự chạy'}</a><a class="btn btn-primary" href="${nextHref}">Tiếp</a></div>` : endBtns}</div>
    ${!buoi && A.workRole() && !q.chieu?`<a class="link-btn" href="#/hoc/${sc.id}?chieu=1">Chế độ trình chiếu</a>`:''}`});
});
})();
