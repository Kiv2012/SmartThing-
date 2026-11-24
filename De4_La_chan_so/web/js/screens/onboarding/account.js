/* MH-25–27 — mô phỏng luồng tài khoản, dùng dữ liệu mẫu. */
(function(){
const A = window.App;
const samplePhone = '0900000000';
const samplePassword = 'matkhaumau';

function phone(){
  return `<label class="field"><span class="label">Số điện thoại mẫu</span>
    <input class="input" id="account-phone" inputmode="tel" value="${samplePhone}" required></label>`;
}

function password(label='Mật khẩu mẫu'){
  return `<div class="field"><label class="label" for="account-password">${label}</label>
    <div class="omni"><input id="account-password" type="password" minlength="8" required>
      <button class="paste" type="button" data-act="account-show" aria-controls="account-password">Hiện</button></div></div>`;
}

A.route(/^\/dang-nhap$/, (match, query) => A.screen({
  mh:'MH-25', noTab:true, title:query.work ? 'Khu công tác' : 'Đăng nhập', backTo:'#/bat-dau',
  body:`
  <div class="account-layout">
    ${query.work ? '' : `<form class="card stack" data-form="demo-login">
      <h2>Thử đăng nhập</h2>
      <p class="note">Bản trình diễn. Chỉ dùng dữ liệu mẫu, mật khẩu mẫu là <b>${samplePassword}</b>.</p>
      ${phone()}${password()}
      <div id="account-feedback" role="alert"></div>
      <button class="btn btn-primary">Đăng nhập thử</button>
      <div class="account-links"><a href="#/dang-ky">Tạo tài khoản</a><a href="#/quen-mat-khau">Quên mật khẩu?</a></div>
      <a class="btn btn-ghost" href="#/bat-dau">Dùng ngay, không cần tài khoản</a>
    </form>`}
    <section class="card stack" aria-labelledby="preview-accounts">
      <h2 id="preview-accounts">Tài khoản công tác trình diễn</h2>
      <p class="note">Chọn tài khoản mẫu để xem các nhiệm vụ và thao tác tương ứng.</p>
      <button class="role-choice" type="button" data-act="enter-work" data-work="tnv"><b>Tình nguyện viên</b><span>Nhận nhiệm vụ, đi tuyên truyền và nộp kết quả.</span></button>
      <button class="role-choice" type="button" data-act="enter-work" data-work="dp"><b>Điều phối viên</b><span>Lập kế hoạch, phân công và duyệt kết quả hoạt động.</span></button>
    </section>
  </div>`
}));

A.route(/^\/(dang-ky|quen-mat-khau)$/, ([mode], query) => {
  const signup = mode==='dang-ky';
  const step = ['2','3'].includes(query.b) ? Number(query.b) : 1;
  const heading = signup ? 'Tạo tài khoản' : 'Đặt lại mật khẩu';
  const section = step===1 ? 'Số điện thoại' : step===2 ? 'Mã xác minh' : 'Mật khẩu';
  return A.screen({mh:signup?'MH-26':'MH-27', title:heading, noTab:true, backTo:step===1 ? '#/dang-nhap' : `#/${mode}?b=${step-1}`,
    steps:[step, 3, section], body:`<form class="card stack account-step" data-form="demo-account-step" data-mode="${mode}" data-step="${step}">
      <h2>${section}</h2>
      <p class="note">Luồng trình diễn sử dụng dữ liệu mẫu.</p>
      ${step===1 ? phone() : step===2 ? `<label class="field"><span class="label">Mã mẫu 123456</span><input class="input" id="account-otp" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required></label>` : `${password('Mật khẩu mẫu mới')}${signup ? '<label class="field"><span class="label">Tên mẫu</span><input class="input" id="account-name" value="Minh Anh" required></label>' : ''}`}
      <div id="account-feedback" role="alert"></div>
      <button class="btn btn-primary">${step===1 ? 'Xem bước nhập mã' : step===2 ? 'Xác minh mã mẫu' : 'Hoàn thành bản thử'}</button>
    </form>`});
});

function accountError(message, field){
  const error = document.getElementById('account-feedback');
  error.className = 'err';
  error.textContent = message;
  field.setAttribute('aria-invalid','true');
  field.setAttribute('aria-describedby',error.id);
  field.focus();
}

A.actions['account-show'] = button => {
  const field = document.getElementById('account-password');
  const hidden = field.type==='password';
  field.type = hidden ? 'text' : 'password';
  button.textContent = hidden ? 'Ẩn' : 'Hiện';
};
A.actions['enter-work'] = button => {
  A.setWork(button.dataset.work);
  A.go(A.roleHome());
};
A.actions['exit-work'] = () => { A.leaveWork(); A.go(A.residentHome()); };

document.addEventListener('submit', event => {
  const form = event.target;
  if(!['demo-login','demo-account-step'].includes(form.dataset.form)) return;
  event.preventDefault();
  const phoneField = document.getElementById('account-phone');
  const passField = document.getElementById('account-password');
  if(phoneField && phoneField.value.replace(/\s/g,'')!==samplePhone){
    accountError('Hãy dùng số điện thoại mẫu đã điền sẵn.', phoneField);
    return;
  }
  if(form.dataset.form==='demo-login'){
    if(passField.value!==samplePassword) accountError('Mật khẩu mẫu là '+samplePassword+'.', passField);
    else A.go(A.residentHome());
    return;
  }
  const step = Number(form.dataset.step);
  const otp = document.getElementById('account-otp');
  if(otp && otp.value!=='123456'){
    accountError('Hãy nhập mã mẫu 123456.',otp);
    return;
  }
  if(step<3) A.go(`#/${form.dataset.mode}?b=${step+1}`);
  else { A.toast('Đã xem xong luồng tài khoản mẫu'); A.go('#/dang-nhap'); }
});
})();
