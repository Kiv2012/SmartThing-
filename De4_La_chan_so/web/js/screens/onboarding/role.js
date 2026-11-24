/* MH-01 — tra cứu ngay hoặc chọn cách sử dụng */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc;
const tmp = A.tmp;

const roles = [
  {id:'ob', name:'Ông bà', detail:'Chữ lớn, đọc thành tiếng và gọi người thân.'},
  {id:'hs', name:'Học sinh', detail:'Phân tích tin nhắn, học và thử thách theo tình huống.'},
  {id:'tnv', name:'Đội tình nguyện', detail:'Theo dõi cảnh báo và tổ chức tuyên truyền.'}
];

A.route(/^\/bat-dau$/, () => {
  const current = tmp.role;
  const options = D.WARDS.map(ward => `<option ${ward===(tmp.ward || S.ward)?'selected':''}>${esc(ward)}</option>`).join('');
  const roleButtons = roles.map(role => `
    <button class="role-choice" type="button" data-act="pick-role" data-role="${role.id}" aria-pressed="${current===role.id}">
      <b>${role.name}</b><span>${role.detail}</span>
    </button>`).join('');
  const extra = current==='hs' ? `
    <label class="field"><span class="label">Lớp (chi đoàn)</span><select class="select" id="f-cls">
      ${['12A1','12A2','11A3','10A2'].map(cls => `<option>${cls}</option>`).join('')}
    </select></label>` : current==='tnv' ? `
    <label class="field"><span class="label">Chi đoàn</span><select class="select" id="f-cls">
      <option value="KP5">Chi đoàn Khu phố 5</option><option value="KP2">Chi đoàn Khu phố 2</option><option value="12A1">Chi đoàn 12A1</option>
    </select></label>
    <label class="field"><span class="label">Mã đội (mẫu: 2026)</span><input class="input" id="f-code" inputmode="numeric" value="2026"></label>` : '';

  return A.screen({mh:'MH-01', brand:true, noTab:true, body:`
    <div class="landing-hero">
      <div class="landing-intro">
        <h1>Dừng lại.<br>Kiểm tra trước.</h1>
        <p>Nếu ai đó giục chuyển tiền, hãy kiểm tra thông tin và hỏi người thân.</p>
      </div>
      <form class="landing-check" data-form="entry-check" aria-labelledby="entry-check-title">
        <h2 id="entry-check-title">Kiểm tra nhanh</h2>
        <label class="label" for="entry-q">Số điện thoại, đường link hoặc số tài khoản</label>
        <div class="omni">
          <input id="entry-q" autocomplete="off" placeholder="Ví dụ: 0868 000 111">
          <button type="button" class="paste" data-act="paste" data-target="entry-q">Dán</button>
        </div>
        <button class="btn btn-star" type="submit">Kiểm tra ngay</button>
        <div class="entry-utilities">
          <button class="link-btn" type="button" data-act="entry-example">Thử số mẫu</button>
          <a class="link-btn" href="#/khan-cap">Tôi đã chuyển tiền</a>
        </div>
      </form>
    </div>
    <section class="landing-roles" aria-labelledby="role-title">
      <h2 id="role-title">Bạn sử dụng với vai trò nào?</h2>
      <div class="role-list">${roleButtons}</div>
      ${current ? `
        <div class="role-setup">
          <label class="field"><span class="label">Tên gọi (không bắt buộc)</span>
            <input class="input" id="f-name" value="${esc(tmp.name || '')}" placeholder="Ví dụ: Bà Sáu">
          </label>
          <label class="field"><span class="label">Xã, phường</span>
            <select class="select" id="f-ward">${options}</select>
          </label>
          ${extra}
          <button class="btn btn-primary" data-act="start">${current==='tnv'?'Mở tổng quan':'Bắt đầu'}</button>
        </div>` : ''}
    </section>
    <p class="note entry-help">Bản thử nghiệm sử dụng dữ liệu giả lập.</p>`});
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
  if(!tmp.role) return;
  const r = tmp.role;
  S.name = document.getElementById('f-name').value.trim() || (r==='ob'?'Bà Sáu':r==='hs'?'Minh Anh':'Đoàn viên Quốc Bảo');
  S.ward = document.getElementById('f-ward').value;
  const cls = document.getElementById('f-cls');
  if(cls) S.cls = cls.value;
  S.role = r;
  S.deNhin = r==='ob';
  A.save();
  A.go(r==='tnv' ? '#/doi' : '#/nguoi-than?dau=1');
};
document.addEventListener('submit', event => {
  if(event.target.dataset.form!=='entry-check') return;
  event.preventDefault();
  A.submitCheck(document.getElementById('entry-q').value);
});
})();
