/* MH-01 — tra cứu công khai và chọn chế độ người dân */
(function(){
const A = window.App, {D, S, esc, tmp} = A;

const roles = [
  ['ob', 'Ông bà', 'Chữ lớn, có đọc to và gọi người thân.'],
  ['hs', 'Học sinh', 'Phân tích tin nhắn và luyện nhận diện lừa đảo.']
];

A.route(/^\/bat-dau$/, () => {
  const current = tmp.role;
  const options = D.WARDS.map(ward => `<option ${ward===(tmp.ward || S.ward)?'selected':''}>${esc(ward)}</option>`).join('');
  return A.screen({mh:'MH-01', brand:true, noTab:true, body:`
    <div class="landing-hero">
      <section class="landing-main">
        <div class="landing-intro">
          <h1>Kiểm tra trước<br class="hero-break"> khi chuyển tiền.</h1>
          <p>Tra số điện thoại, đường link hoặc số tài khoản lạ. Ai cũng có thể dùng ngay.</p>
        </div>
        <form class="landing-check" data-form="entry-check" aria-labelledby="entry-check-title">
          <h2 id="entry-check-title">Tra cứu nhanh</h2>
          <label class="label" for="entry-q">Số điện thoại, đường link hoặc số tài khoản</label>
          <div class="omni">
            <input id="entry-q" autocomplete="off" placeholder="Ví dụ: 0868 000 111">
            <button type="button" class="paste" data-act="paste" data-target="entry-q">Dán</button>
          </div>
          <button class="btn btn-primary" type="submit">Kiểm tra ngay</button>
          <div class="entry-utilities">
            <button class="link-btn" type="button" data-act="entry-example">Thử số mẫu</button>
            <a class="link-btn" href="#/tin-nhan">Phân tích tin nhắn</a>
          </div>
        </form>
        <a class="urgent-link" href="#/khan-cap">Tôi đã chuyển tiền · Xem cách xử lý</a>
      </section>
      <aside class="landing-guide" aria-labelledby="entry-guide-title">
        <div>
          <h2 id="entry-guide-title">Đang bị giục chuyển tiền?</h2>
          <ol>
            <li>Dừng giao dịch, giữ lại tin nhắn.</li>
            <li>Gọi cho người thân qua số bạn đã biết.</li>
            <li>Tra cứu trước khi quyết định.</li>
          </ol>
        </div>
        <a class="btn btn-star" href="#/hoc/T01?dung=1">Học một tình huống trong 1 phút</a>
      </aside>
    </div>
    <section class="landing-roles" aria-labelledby="role-title">
      <div class="section-heading-row">
        <h2 id="role-title">Chọn cách dùng phù hợp</h2>
        <a class="link-btn" href="#/dang-nhap?work=1">Khu công tác</a>
      </div>
      <div class="role-list">${roles.map(([id, name, detail]) => `
        <button class="role-choice" type="button" data-act="pick-role" data-role="${id}" aria-pressed="${current===id}">
          <b>${name}</b><span>${detail}</span>
        </button>`).join('')}</div>
      ${current ? `<div class="role-setup">
        <label class="field"><span class="label">Tên gọi (không bắt buộc)</span>
          <input class="input" id="f-name" value="${esc(tmp.name || '')}" placeholder="Ví dụ: Bà Sáu">
        </label>
        <label class="field"><span class="label">Xã, phường</span>
          <select class="select" id="f-ward">${options}</select>
        </label>
        ${current==='hs' ? `<label class="field"><span class="label">Lớp (chi đoàn)</span>
          <select class="select" id="f-cls">${['12A1','12A2','11A3','10A2'].map(cls => `<option>${cls}</option>`).join('')}</select>
        </label>` : ''}
        <button class="btn btn-primary" data-act="start">Bắt đầu</button>
      </div>` : ''}
    </section>
    <p class="note entry-help">Bản trình diễn dùng dữ liệu giả lập. Kết quả chỉ hỗ trợ nhận diện dấu hiệu.</p>`});
});

A.actions['entry-example'] = () => A.submitCheck(D.EXAMPLES[0].v);
A.actions['pick-role'] = (el, event) => {
  tmp.name = document.getElementById('f-name')?.value ?? tmp.name;
  tmp.ward = document.getElementById('f-ward')?.value ?? tmp.ward;
  tmp.role = el.dataset.role;
  const scrollY = window.scrollY;
  A.render();
  window.scrollTo(0, scrollY);
  document.querySelector('.role-choice[aria-pressed="true"]').focus({preventScroll:true});
  if(event.detail!==0) document.querySelector('.role-setup').scrollIntoView({block:'nearest'});
};
A.actions.start = () => {
  const r = tmp.role;
  if(!r) return;
  A.leaveWork();
  S.name = document.getElementById('f-name').value.trim() || (r==='ob'?'Bà Sáu':'Minh Anh');
  S.ward = document.getElementById('f-ward').value;
  const cls = document.getElementById('f-cls');
  if(cls) S.cls = cls.value;
  S.role = r;
  S.deNhin = r==='ob';
  A.save();
  A.go('#/nguoi-than?dau=1');
};
document.addEventListener('submit', event => {
  if(event.target.dataset.form!=='entry-check') return;
  event.preventDefault();
  A.submitCheck(document.getElementById('entry-q').value);
});
})();
