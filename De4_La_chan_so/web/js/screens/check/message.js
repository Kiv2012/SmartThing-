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
  const seg = `<div class="seg"><a href="#/kiem-tra">Số · Link · Tài khoản</a><a class="on" href="#/tin-nhan">Dán tin nhắn</a></div>`;
  A.after = () => {
    releaseDetachedImage();
    const text = document.getElementById('msg');
    if(!text) return;
    text.value = A.tmp.msg ?? A.tmp.messageDraft ?? '';
    A.tmp.msg = null;
    const update = () => {
      A.tmp.messageDraft = text.value;
      document.getElementById('cnt').textContent = text.value.length+' / '+text.maxLength;
    };
    text.addEventListener('input', update);
    update();
  };
  if(res){
    const sc = res.type && A.scen(res.type); const r = uu();
    const lvl = res.flagged ? res.level : 'warn';
    return A.screen({mh:'MH-07', title:'Phân tích tin nhắn', tab:'#/kiem-tra', listen:`${A.LV[lvl]}. ${sc?'Giống kiểu lừa '+sc.ngan+'. ':''}${res.flagged?'Có '+res.flagged+' câu đáng ngờ.':'Chưa thấy dấu hiệu rõ.'}`, body:`
      ${seg}
      <section class="verdict is-${lvl}">
        <div class="lvl">${A.verdictIcon(lvl)}<h2>${A.LV[lvl]}</h2></div>
        ${res.flagged ? `<p class="kind">${sc?'Giống kiểu lừa: <b>'+esc(sc.ngan)+'</b> · ':''}${res.flagged} câu đáng ngờ</p>
          <div class="risk" aria-label="Điểm rủi ro ${res.risk} trên 100"><div class="kv"><span class="small ink2">Điểm rủi ro</span><span class="num">${res.risk}<span class="small ink2">/100</span></span></div><div class="track" aria-hidden="true"><i></i><i></i><i></i><span class="needle" style="left:calc(${res.risk}% - 2px)"></span></div></div>`
        : `<p class="remind">Chưa thấy dấu hiệu rõ, nhưng đừng chuyển tiền hay gửi mã OTP cho người lạ.</p>`}
      </section>
      ${res.flagged?`<div class="stack"><span class="label">Câu đáng ngờ được tô đỏ · chạm để xem vì sao</span>
        <div class="chat"><div class="bubble">${res.sents.map((x,i)=> x.flag?`<button class="flagged flag-button" type="button" data-act="why" data-i="${i}" aria-controls="why">${esc(x.s)}</button>`:esc(x.s)).join(' ')}</div></div>
        <div id="why" class="explain" aria-live="polite">${esc(res.sents.find(x=>x.flag).why)}</div></div>`:''}
      ${res.found.length?`<div class="card"><span class="label">Số và link trong tin nhắn</span><ul class="list">${res.found.map(f=>`<li class="kv"><span class="mono">${esc(f.value)}</span><span class="tag ${f.level}">${A.LV[f.level]}</span></li>`).join('')}</ul></div>`:''}
      ${sc?`<div class="card"><span class="label">Nên làm</span><ol class="ol">${sc.nenLam.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`:''}
      <div class="stack">
        <a class="btn btn-primary" href="${r?'#/hoi-nguoi-than':'#/nguoi-than?ret=hoi'}">Hỏi người thân${r?' · '+esc(r.ten):''}</a>
        <div class="btn-row"><a class="btn btn-ghost" href="#/bao-cao?tu=tn">Báo cáo</a>${sc?`<a class="btn btn-ghost" href="#/hoc/${sc.id}">Học 1 phút</a>`:'<a class="btn btn-ghost" href="#/tin-nhan">Phân tích tin khác</a>'}</div>
      </div>
      ${st==='ai-loi'?'<p class="hint">Phần giải thích chi tiết chưa phản hồi. Bạn vẫn có thể xem các dấu hiệu bên dưới.</p>':''}
      <p class="source">Kết quả mang tính tham khảo. Hãy hỏi người tin cậy nếu còn nghi ngờ.</p>`});
  }
  return A.screen({mh:'MH-07', title:'Phân tích tin nhắn', tab:'#/kiem-tra', body:`
    ${seg}
    <p class="ink2">Dán tin nhắn hoặc chọn ảnh chụp màn hình để kiểm tra dấu hiệu đáng ngờ.</p>
    <form class="stack" data-form="analyze">
      <label class="label" for="msg">Nội dung tin nhắn</label>
      <textarea id="msg" class="textarea" maxlength="2000" placeholder="Dán tin nhắn vào đây"></textarea>
      <div class="message-tools">
        <button type="button" class="btn btn-ghost" data-act="paste" data-target="msg">Dán</button>
        <button type="button" class="btn btn-ghost" data-act="select-message-image" aria-describedby="message-image-help">Tải ảnh chụp</button>
        <span id="cnt" class="counter"></span>
      </div>
      <input id="message-image" type="file" accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp" hidden>
      <p class="note" id="message-image-help">PNG, JPG hoặc WebP, tối đa 10 MB. Ảnh được đọc trên thiết bị.</p>
      <div class="message-image-preview" id="message-image-preview" hidden>
        <img id="message-image-thumb" alt="Ảnh chụp bạn đã chọn">
        <div class="stack">
          <span class="note" id="message-image-name"></span>
          <button class="link-btn" type="button" data-act="remove-message-image">Bỏ ảnh</button>
        </div>
      </div>
      <p id="message-image-status" class="note" role="status"></p>
      <progress id="message-image-progress" aria-label="Tiến độ đọc chữ trong ảnh" max="100" hidden></progress>
      <button class="btn btn-ghost" type="button" data-act="insert-image-text" hidden>Chèn chữ từ ảnh</button>
      ${st==='trong'?'<p class="hint" role="alert">Hãy dán tin nhắn hoặc đọc chữ từ ảnh trước khi phân tích.</p>':''}
      ${st==='dang-phan-tich'?'<div class="card center"><b>Đang phân tích…</b></div>':'<button class="btn btn-primary" type="submit">Phân tích</button>'}
    </form>
    <details><summary>Xem ví dụ tin nhắn</summary><div class="chips">${SAMPLES.map((s,i)=>`<button class="chip" data-act="sample" data-i="${i}">${esc(s.lb)}</button>`).join('')}</div></details>
    <p class="source">Tin nhắn gần nhất được lưu trên thiết bị để điền sẵn khi báo cáo.</p>`});
});
let imageJob = null;

function releaseImage(){
  if(!imageJob) return;
  imageJob.controller.abort();
  if(imageJob.url) URL.revokeObjectURL(imageJob.url);
  imageJob = null;
}
function releaseDetachedImage(){
  if(imageJob && !imageJob.panel.isConnected) releaseImage();
}
window.addEventListener('hashchange', releaseDetachedImage);
window.addEventListener('pagehide', releaseImage);

async function validateImage(file){
  if(file.size>10*1024*1024) return 'Ảnh vượt quá 10 MB. Hãy chọn ảnh nhỏ hơn.';
  const bytes = new Uint8Array(await file.slice(0,12).arrayBuffer());
  const png = [137,80,78,71,13,10,26,10].every((byte,i)=>bytes[i]===byte);
  const jpeg = bytes[0]===255 && bytes[1]===216 && bytes[2]===255;
  const webp = String.fromCharCode(...bytes.slice(0,4))==='RIFF' &&
    String.fromCharCode(...bytes.slice(8,12))==='WEBP';
  return png || jpeg || webp ? '' : 'Hãy chọn ảnh PNG, JPG hoặc WebP hợp lệ.';
}
function scaleForReading(img){
  const {naturalWidth:width, naturalHeight:height} = img;
  if(!width || !height || width*height>40_000_000) throw new Error('Unsupported image size');
  const scale = Math.min(1, 3000/Math.max(width,height), Math.sqrt(6_000_000/(width*height)));
  if(scale===1) return img;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width*scale));
  canvas.height = Math.max(1, Math.round(height*scale));
  canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
  return canvas;
}
function imageStatus(job, text, type='note'){
  const status = job.panel.querySelector('#message-image-status');
  status.className = type;
  status.textContent = text;
}
function insertImageText(job){
  const field = job.panel.querySelector('#msg');
  const prefix = field.value.trim() ? field.value+'\n\n' : '';
  const available = Math.max(0, field.maxLength-prefix.length);
  if(!available){
    imageStatus(job, 'Ô tin nhắn đã đầy. Xóa bớt nội dung trước khi chèn ảnh.', 'hint');
    return;
  }
  field.value = prefix+job.text.slice(0,available);
  field.dispatchEvent(new Event('input'));
  job.panel.querySelector('[data-act="insert-image-text"]').hidden = true;
  imageStatus(job, job.text.length>available
    ? 'Đã chèn tới giới hạn 2.000 ký tự. Kiểm tra lại đoạn được chèn.'
    : 'Đã chèn chữ từ ảnh. Kiểm tra lại nội dung trước khi phân tích.');
}
async function readMessageImage(file, panel){
  releaseImage();
  const job = {panel, controller:new AbortController()};
  imageJob = job;
  const preview = panel.querySelector('#message-image-preview');
  const img = panel.querySelector('#message-image-thumb');
  const progress = panel.querySelector('#message-image-progress');
  const insert = panel.querySelector('[data-act="insert-image-text"]');
  preview.hidden = true;
  progress.hidden = true;
  insert.hidden = true;
  img.removeAttribute('src');
  imageStatus(job,'Đang mở ảnh…');
  const current = () => imageJob===job && panel.isConnected;
  try {
    const error = await validateImage(file);
    if(!current()) return;
    if(error){ imageStatus(job,error,'err'); return; }

    job.url = URL.createObjectURL(file);
    img.src = job.url;
    await img.decode();
    if(!current()) return;
    const image = scaleForReading(img);
    panel.querySelector('#message-image-name').textContent = file.name;
    preview.hidden = false;
    imageStatus(job,'Đang chuẩn bị bộ đọc ảnh…');
    progress.removeAttribute('value');
    progress.hidden = false;
    job.text = await A.readImageText(image,job.controller.signal,value=>{
      if(!current()) return;
      if(!progress.hasAttribute('value')) imageStatus(job,'Đang đọc chữ trong ảnh…');
      progress.value = value*100;
    });
    if(!current()) return;
    if(!job.text){
      imageStatus(job,'Không đọc được chữ. Hãy thử ảnh rõ hơn hoặc dán tin nhắn.','hint');
      return;
    }
    if(panel.querySelector('#msg').value.trim()){
      insert.hidden = false;
      imageStatus(job,'Đã đọc ảnh. Bấm Chèn chữ từ ảnh để thêm vào tin nhắn đang có.');
    }else insertImageText(job);
  } catch {
    if(current()) imageStatus(job, navigator.onLine
      ? 'Chưa đọc được ảnh. Thử ảnh rõ hơn hoặc dán tin nhắn.'
      : 'Bộ đọc ảnh chưa sẵn sàng khi mất mạng. Bạn vẫn có thể dán tin nhắn.', 'hint');
  } finally {
    if(current()) progress.hidden = true;
  }
}

A.actions['select-message-image'] = () => document.getElementById('message-image').click();
A.actions['remove-message-image'] = button => {
  const panel = button.closest('form');
  releaseImage();
  panel.querySelector('#message-image-thumb').removeAttribute('src');
  panel.querySelector('#message-image-preview').hidden = true;
  panel.querySelector('#message-image-progress').hidden = true;
  panel.querySelector('[data-act="insert-image-text"]').hidden = true;
  imageStatus({panel},'Đã bỏ ảnh. Nội dung trong ô tin nhắn vẫn được giữ.');
  panel.querySelector('[data-act="select-message-image"]').focus();
};
A.actions['insert-image-text'] = () => { if(imageJob?.text) insertImageText(imageJob); };
document.addEventListener('change', event => {
  const input = event.target;
  if(input.id!=='message-image' || !input.files.length) return;
  const file = input.files[0];
  input.value = '';
  readMessageImage(file,input.form);
});

document.addEventListener('submit', event => {
  const form = event.target;
  if(form.dataset.form!=='analyze') return;
  event.preventDefault();
  const text = form.querySelector('#msg').value;
  if(!text.trim()){ A.go('#/tin-nhan?state=trong'); return; }
  const button = form.querySelector('button[type=submit]');
  button.textContent = 'Đang phân tích…';
  button.disabled = true;
  setTimeout(() => {
    if(!form.isConnected) return;
    S.lastAnalysis = Object.assign({text, at:Date.now()}, A.analyze(text));
    A.tmp.messageDraft = '';
    A.save();
    A.go('#/tin-nhan?state=ket-qua');
  },700);
});
A.actions.sample = el => {
  const field = document.getElementById('msg');
  field.value = SAMPLES[+el.dataset.i].t;
  field.dispatchEvent(new Event('input'));
};
A.actions.why = el => { const a = S.lastAnalysis.sents[+el.dataset.i]; document.querySelectorAll('.flagged').forEach(n=>n.classList.remove('sel')); el.classList.add('sel'); document.getElementById('why').textContent = a.why; };
})();
