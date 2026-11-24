/* MH-11 Hỏi người thân – Bắt buộc 3 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-11 Hỏi người thân ===== */
function askMessage(){
  const c = S.lastCheck, a = S.lastAnalysis; const me = S.role==='ob' ? 'Mẹ' : 'Con';
  if(c && (!a || c.at >= (a.at||0))){
    const sc = c.type && A.scen(c.type);
    return `${me} vừa gặp ${c.kind.toLowerCase()} ${c.value}. Lá Chắn Số báo ${A.LV[c.level]}${sc?' – '+sc.ngan.toLowerCase():''}. Gọi lại cho ${me.toLowerCase()} ngay nhé.`;
  }
  if(a){ const sc = a.type && A.scen(a.type); return `${me} vừa nhận một tin nhắn đáng ngờ. Lá Chắn Số báo ${A.LV[a.level]}${sc?' – '+sc.ngan.toLowerCase():''}. Gọi lại cho ${me.toLowerCase()} ngay nhé.`; }
  return `${me} đang gặp chuyện đáng ngờ, cần hỏi ý kiến. Gọi lại cho ${me.toLowerCase()} ngay nhé.`;
}
let askTimers = [];
A.route(/^\/hoi-nguoi-than$/, (m, q) => {
  askTimers.forEach(clearTimeout); askTimers = [];
  const st = q.state || (S.ask && Date.now()-S.ask.at < 600000 ? S.ask.state : '');
  const list = q.state==='chua-cai' ? [] : S.relatives;
  if(!list.length) return A.screen({mh:'MH-11', title:'Hỏi người thân', tab:'', body:`
    <div class="empty"><b>Chưa có người thân nào</b>Thêm người thân tin cậy để khi gặp chuyện lạ, ${A.xung()} chỉ cần một chạm là họ biết ngay.</div>
    <a class="btn btn-primary" href="#/nguoi-than?ret=hoi">Thêm người thân</a>`});
  const sel = list.find(r=>r.id===q.r) || list.find(r=>r.uu) || list[0];
  const other = list.find(r=>r!==sel);
  const msg = askMessage(); const tel = 'tel:'+sel.sdt.replace(/\s/g,'');
  const off = A.isOffline(q);
  const call = `<a class="btn btn-call" href="${tel}">Gọi ${esc(sel.ten)} ngay</a>`;
  const send = off ? '' : `<button class="btn btn-primary" data-act="ask-send" data-r="${sel.id}">Gửi cho ${esc(sel.ten)}</button>`;
  let status = '';
  if(st){
    const order = ['sent','seen','replied']; const cur = st==='timeout' ? 0 : order.indexOf(st);
    const done = s => order.indexOf(s) <= cur;
    status = `<div class="card stack" aria-live="polite"><div class="status"><span class="${done('sent')?'done':''}">Đã gửi</span><i>·</i><span class="${done('seen')?'done':''}">Đã xem</span><i>·</i><span class="${done('replied')?'done':''}">Đã trả lời</span></div>
      ${st==='replied'?`<div class="reply"><b>${esc(sel.ten)} trả lời</b><p>"${S.role==='ob'?'Mẹ đừng chuyển tiền nhé, con gọi mẹ ngay.':'Đừng chuyển tiền, chờ mình gọi nhé.'}"</p></div>`:''}
      ${st==='timeout'?`<p class="hint">${esc(sel.ten)} chưa trả lời sau 2 phút.</p>${other?`<a class="btn btn-call" href="tel:${other.sdt.replace(/\s/g,'')}">Gọi ${esc(other.ten)} (${esc(other.qh.toLowerCase())})</a>`:''}${call}`:''}
    </div>`;
    if(st==='sent' && !q.state){ askTimers.push(setTimeout(()=>{ S.ask.state='seen'; A.save(); A.render(); }, 2000)); }
    if(st==='seen' && !q.state){ askTimers.push(setTimeout(()=>{ S.ask.state='replied'; A.save(); A.render(); if(S.deNhin) A.speak(sel.ten+' trả lời: Mẹ đừng chuyển tiền nhé, con gọi mẹ ngay.'); }, 3000)); }
  }
  const order = S.deNhin ? call+send : send+call;
  return A.screen({mh:'MH-11', title:'Hỏi người thân', tab:'', listen:`Bấm Gọi ${sel.ten} ngay để gọi điện, hoặc bấm Gửi cho ${sel.ten} để gửi tin.`, body:`
    <div class="card person"><span class="avatar">${esc(sel.ten[0])}</span><span class="grow"><b style="font-size:var(--fs-card)">${esc(sel.ten)}</b><br><span class="ink2 small">${esc(sel.qh)} · <span class="mono">${esc(sel.sdt)}</span></span></span>${sel.uu?'<span class="tag">Ưu tiên</span>':''}</div>
    ${list.length>1?`<div class="chips">${list.map(r=>`<a class="chip ${r===sel?'on':''}" href="#/hoi-nguoi-than?r=${r.id}">${esc(r.ten)}</a>`).join('')}</div>`:''}
    ${status}
    ${st!=='replied'?`<div class="stack">${order}</div>`:`<div class="stack">${call}<a class="btn btn-ghost" href="${A.roleHome()}">Về trang chủ</a></div>`}
    <div class="card"><span class="label">Tin sẽ gửi (soạn sẵn)</span><p>${esc(msg)}</p></div>
    ${off?'<p class="hint">Đang mất mạng nên chưa gửi tin được. Hãy gọi điện trực tiếp.</p>':`<div class="btn-row"><a class="btn btn-ghost" href="sms:${sel.sdt.replace(/\s/g,'')}?&body=${encodeURIComponent(msg)}">Gửi qua SMS</a><button class="btn btn-ghost" data-act="ask-zalo" data-p="${sel.sdt.replace(/\s/g,'')}" data-m="${esc(msg)}">Gửi qua Zalo</button></div>
    <p class="note">Gửi trong app: người thân nhận thông báo ngay (khi đã thêm Lá Chắn Số vào màn hình chính). SMS, Zalo: cần bấm Gửi thêm một lần.</p>`}`});
});
A.actions['ask-send'] = () => { S.ask = {state:'sent', at:Date.now()}; A.save(); A.toast('Đã gửi'); A.render(); };
A.actions['ask-zalo'] = async el => { try{ await navigator.clipboard.writeText(el.dataset.m); A.toast('Đã chép nội dung, dán vào Zalo rồi bấm Gửi'); }catch(e){} window.open('https://zalo.me/'+el.dataset.p, '_blank'); };
})();
