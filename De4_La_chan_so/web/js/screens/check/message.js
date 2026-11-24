/* MH-07 Phân tích tin nhắn – Điểm cộng 1 (AI) */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const uu = A.priorityRelative;
/* ===== MH-07 Phân tích tin nhắn ===== */
const SAMPLES = [
 {lb:'Việc nhẹ lương cao', t:'Chào em! Bên chị tuyển CTV đặt đơn online, việc nhẹ lương cao 300-500k/ngày. Em chỉ cần đặt đơn hộ shop, hoàn tiền gốc kèm hoa hồng 10%. Nhiệm vụ VIP cần nạp trước 2 triệu, liên hệ qua Telegram để nhận việc ngay hôm nay.'},
 {lb:'Quà tri ân', t:'[TRI AN KHACH HANG] Chuc mung Quy khach nhan qua tri an 2.000.000d. Nhan qua tai quatrian-2026.top truoc 24h hom nay. Vui long nhap tai khoan va ma OTP de xac nhan.'},
 {lb:'Bạn mượn tiền', t:'Ê cho mình mượn 5 triệu gấp, mai trả liền. Chuyển giúp vào tài khoản chị mình nha 0451000777, tài khoản mình bị lỗi. Đang họp không nghe máy được.'}
];
A.route(/^\/tin-nhan$/, (m, q) => {
  const st = q.state || '';
  const res = st==='ket-qua' || st==='ai-loi' ? S.lastAnalysis : null;
  const seg = S.role==='hs' ? `<div class="seg"><a href="#/kiem-tra">Số · Link · Tài khoản</a><a class="on" href="#/tin-nhan">Dán tin nhắn</a></div>` : '';
  A.after = () => { const ta = document.getElementById('msg'), c = document.getElementById('cnt'); if(!ta) return;
    if(A.tmp.msg){ ta.value = A.tmp.msg; A.tmp.msg = null; }
    const upd = () => c.textContent = ta.value.length+' / 2000'; ta.addEventListener('input', upd); upd(); };
  if(res){
    const sc = res.type && A.scen(res.type); const r = uu();
    const lvl = res.flagged ? res.level : 'warn';
    return A.screen({mh:'MH-07', title:'Phân tích tin nhắn', tab:'#/kiem-tra', listen:`${A.LV[lvl]}. ${sc?'Giống kiểu lừa '+sc.ngan+'. ':''}${res.flagged?'Có '+res.flagged+' câu đáng ngờ.':'Chưa thấy dấu hiệu rõ.'}`, body:`
      ${seg}
      <section class="verdict is-${lvl}">
        <div class="lvl">${A.verdictIcon(lvl)}<h2>${A.LV[lvl]}</h2></div>
        ${res.flagged ? `<p class="kind">${sc?'Giống kiểu lừa: <b>'+esc(sc.ngan)+'</b> · ':''}${res.flagged} câu đáng ngờ</p>
          <div class="risk" aria-label="Điểm rủi ro ${res.risk} trên 100"><div class="kv"><span class="small ink2">Điểm rủi ro</span><span class="num">${res.risk}<span class="small ink2">/100</span></span></div><div class="track"><span class="needle" style="left:calc(${res.risk}% - 2px)"></span></div></div>`
        : `<p class="remind">Chưa thấy dấu hiệu rõ, nhưng đừng chuyển tiền hay gửi mã OTP cho người lạ.</p>`}
      </section>
      ${res.flagged?`<div class="stack"><span class="label">Câu đáng ngờ được tô đỏ · chạm để xem vì sao</span>
        <div class="chat"><div class="bubble">${res.sents.map((x,i)=> x.flag?`<span class="flagged" tabindex="0" role="button" data-act="why" data-i="${i}">${esc(x.s)}</span>`:esc(x.s)).join(' ')}</div></div>
        <div id="why" class="explain" aria-live="polite">${esc(res.sents.find(x=>x.flag).why)}</div></div>`:''}
      ${res.found.length?`<div class="card"><span class="label">Số và link trong tin nhắn</span><ul class="list">${res.found.map(f=>`<li class="kv"><span class="mono">${esc(f.value)}</span><span class="tag ${f.level}">${A.LV[f.level]}</span></li>`).join('')}</ul></div>`:''}
      ${sc?`<div class="card"><span class="label">Nên làm</span><ol class="ol">${sc.nenLam.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`:''}
      <div class="stack">
        <a class="btn btn-primary" href="${r?'#/hoi-nguoi-than':'#/nguoi-than?ret=hoi'}">Hỏi người thân${r?' · '+esc(r.ten):''}</a>
        <div class="btn-row"><a class="btn btn-ghost" href="#/bao-cao?tu=tn">Báo cáo</a>${sc?`<a class="btn btn-ghost" href="#/hoc/${sc.id}">Học 1 phút</a>`:'<a class="btn btn-ghost" href="#/tin-nhan">Phân tích tin khác</a>'}</div>
      </div>
      ${st==='ai-loi'?'<p class="hint">Phần giải thích chi tiết chưa phản hồi. Đang hiển thị kết quả kiểm tra theo luật.</p>':''}
      <p class="source">Đã che số tài khoản, họ tên trước khi phân tích. Kết quả do quy tắc nhận diện quyết định, phần giải thích có dùng trí tuệ nhân tạo. Bản mẫu chạy tầng luật trên máy.</p>`});
  }
  return A.screen({mh:'MH-07', title:'Phân tích tin nhắn', tab:'#/kiem-tra', body:`
    ${seg}
    <p class="ink2">Dán nguyên tin nhắn lạ (Zalo, SMS, Facebook…). App chỉ ra câu đáng ngờ và kiểu lừa giống nhất.</p>
    <form class="stack" data-form="analyze">
      <label class="label" for="msg">Nội dung tin nhắn</label>
      <textarea id="msg" class="textarea" maxlength="2000" placeholder="Dán tin nhắn vào đây"></textarea>
      <div class="kv"><button type="button" class="chip" data-act="paste" data-target="msg">Dán</button><span id="cnt" class="counter"></span></div>
      ${st==='trong'?'<p class="hint" role="alert">Bạn chưa dán tin nhắn nào.</p>':''}
      ${st==='dang-phan-tich'?'<div class="card center"><b>Đang phân tích…</b></div>':'<button class="btn btn-primary" type="submit">Phân tích</button>'}
    </form>
    <div class="stack"><span class="label">Thử với tin nhắn mẫu</span><div class="chips">${SAMPLES.map((s,i)=>`<button class="chip" data-act="sample" data-i="${i}">${esc(s.lb)}</button>`).join('')}</div></div>
    <p class="source">Tin nhắn được che số tài khoản và họ tên trước khi phân tích. Không lưu nội dung.</p>`});
});
document.addEventListener('submit', e => { if(e.target.dataset.form==='analyze'){ e.preventDefault(); runAnalyze(document.getElementById('msg').value); } });
A.actions.sample = el => { document.getElementById('msg').value = SAMPLES[+el.dataset.i].t; document.getElementById('msg').dispatchEvent(new Event('input')); };
function runAnalyze(t){
  if(!t.trim()) return A.go('#/tin-nhan?state=trong');
  const btn = document.querySelector('[data-form="analyze"] button[type=submit]'); if(btn){ btn.textContent='Đang phân tích…'; btn.disabled = true; }
  setTimeout(() => { S.lastAnalysis = Object.assign({text:t, at:Date.now()}, A.analyze(t)); A.save(); A.go('#/tin-nhan?state=ket-qua'); }, 700);
}
A.actions.why = el => { const a = S.lastAnalysis.sents[+el.dataset.i]; document.querySelectorAll('.flagged').forEach(n=>n.classList.remove('sel')); el.classList.add('sel'); document.getElementById('why').textContent = a.why; };
})();
