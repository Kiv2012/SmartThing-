/* MH-11 Hỏi người thân – Bắt buộc 3 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-11 Hỏi người thân ===== */
function askMessage(){
  const c = S.lastCheck, a = S.lastAnalysis; const me = S.contentGroup==='ob' ? 'Mẹ' : 'Con';
  if(c && (!a || c.at >= (a.at||0))){
    const sc = c.type && A.scen(c.type);
    return `${me} vừa gặp ${c.kind.toLowerCase()} ${c.value}. Lá Chắn Số báo ${A.LV[c.level]}${sc?' – '+sc.ngan.toLowerCase():''}. Gọi lại cho ${me.toLowerCase()} ngay nhé.`;
  }
  if(a){ const sc = a.type && A.scen(a.type); return `${me} vừa nhận một tin nhắn đáng ngờ. Lá Chắn Số báo ${A.LV[a.level]}${sc?' – '+sc.ngan.toLowerCase():''}. Gọi lại cho ${me.toLowerCase()} ngay nhé.`; }
  return `${me} đang gặp chuyện đáng ngờ, cần hỏi ý kiến. Gọi lại cho ${me.toLowerCase()} ngay nhé.`;
}
A.route(/^\/hoi-nguoi-than$/, (m, q) => {
  const list = q.state==='chua-cai' ? [] : S.relatives;
  if(!list.length) return A.screen({title:'Hỏi người tin cậy', body:'<p>Thêm người bạn tin cậy để gọi hoặc nhắn tin khi cần.</p><a class="btn btn-primary" href="#/nguoi-than?ret=hoi">Thêm người tin cậy</a>'});
  const sel = list.find(r=>r.id===q.r) || list.find(r=>r.uu) || list[0];
  const msg = askMessage(); const number = sel.sdt.replace(/\s/g,'');
  return A.screen({mh:'MH-11', title:'Hỏi người tin cậy', listen:'Gọi người tin cậy hoặc mở ứng dụng tin nhắn để gửi.', body:`
    <section class="card"><h2>${esc(sel.ten)}</h2><p>${esc(sel.qh)} · ${esc(sel.sdt)}</p></section>
    ${list.length>1 ? `<div class="chips">${list.map(r=>`<a class="chip" href="#/hoi-nguoi-than?r=${encodeURIComponent(r.id)}">${esc(r.ten)}</a>`).join('')}</div>` : ''}
    <a class="btn btn-call" href="tel:${number}">Gọi ${esc(sel.ten)} ngay</a>
    <section class="card"><h2>Nội dung tin nhắn</h2><p>${esc(msg)}</p></section>
    <a class="btn btn-primary" href="sms:${number}?&body=${encodeURIComponent(msg)}">Mở SMS</a>
    ${!A.isOffline(q) ? `<button class="btn btn-ghost" data-act="ask-zalo" data-p="${number}" data-m="${esc(msg)}">Mở Zalo</button>` : ''}
    <p class="note">Kiểm tra người nhận và bấm Gửi trong ứng dụng tin nhắn. Lá Chắn Số không theo dõi được tin đã gửi hoặc đã xem.</p>`});
});
A.actions['ask-zalo'] = async el => { try{ await navigator.clipboard.writeText(el.dataset.m); A.toast('Đã chép nội dung, dán vào Zalo rồi bấm Gửi'); }catch(e){ A.toast('Không chép được nội dung. Hãy sao chép tin nhắn trước khi mở Zalo.'); return; } window.open('https://zalo.me/'+el.dataset.p, '_blank'); };
})();
