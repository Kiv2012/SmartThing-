/* MH-25–27 — mô phỏng luồng tài khoản, dùng dữ liệu mẫu. */
(function(){
const A = window.App;
const samplePhone = '0900000000';
const samplePassword = 'matkhaumau';

function returnTo(work=false){
  const next = A.q.next || '';
  if(work) return /^#\/(doi|cong-tac|dieu-phoi)([/?]|$)/.test(next) ? next : A.roleHome();
  return /^#\/(?!dang-(?:nhap|ky)|quen-mat-khau)[a-z0-9-]+(?:[/?].*)?$/.test(next) ? next : A.residentHome();
}

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
  mh:'MH-25', noTab:true, title:query.work ? 'Khu công tác' : 'Đăng nhập', backTo:A.residentHome(),
  body:`
  <div class="account-layout">
    ${query.preview!=='1' ? `<section class="card stack"><h2>Đăng nhập chưa khả dụng</h2><p>Chưa kết nối dịch vụ tài khoản. Bạn vẫn có thể kiểm tra và học mà không cần đăng nhập.</p><a class="btn btn-primary" href="${A.residentHome()}">Dùng ngay</a></section>` : `<form class="card stack" data-form="demo-login">
      <h2>Đăng nhập bằng tài khoản minh họa</h2>
      <p class="note">Bản trình diễn. Chỉ dùng dữ liệu mẫu, mật khẩu mẫu là <b>${samplePassword}</b>.</p>
      ${phone()}${password()}
      <div id="account-feedback" role="alert"></div>
      <button class="btn btn-primary">Đăng nhập</button>
      <div class="account-links"><a href="#/dang-ky?preview=1&next=${encodeURIComponent(query.next || '')}">Tạo tài khoản</a><a href="#/quen-mat-khau?preview=1">Quên mật khẩu?</a></div>
      <a class="btn btn-ghost" href="${A.residentHome()}">Dùng ngay, không cần tài khoản</a>
    </form>`}
    ${query.preview==='1' ? `<section class="card stack" aria-labelledby="preview-accounts">
      <h2 id="preview-accounts">Tài khoản công tác minh họa</h2>
      <p class="note">Các tài khoản này đã được cấp quyền trong bản trình diễn.</p>
      <button class="role-choice" type="button" data-act="sign-in-work" data-work="tnv"><b>Tình nguyện viên</b><span>Nhận nhiệm vụ, đi tuyên truyền và nộp kết quả.</span></button>
      <button class="role-choice" type="button" data-act="sign-in-work" data-work="dp"><b>Điều phối viên</b><span>Lập kế hoạch, phân công và duyệt kết quả hoạt động.</span></button>
    </section>` : ''}
  </div>`
}));

A.route(/^\/(dang-ky|quen-mat-khau)$/, ([mode], query) => {
  if(query.preview!=='1') return A.screen({title:'Dịch vụ tài khoản chưa khả dụng', noTab:true, backTo:'#/dang-nhap', body:`<p>Chưa thể tạo tài khoản hoặc đổi mật khẩu. Bạn vẫn có thể kiểm tra và học.</p><a class="btn btn-primary" href="${A.residentHome()}">Dùng ngay</a>`});
  const signup = mode==='dang-ky';
  const step = ['2','3'].includes(query.b) ? Number(query.b) : 1;
  const heading = signup ? 'Tạo tài khoản' : 'Đặt lại mật khẩu';
  const section = step===1 ? 'Số điện thoại' : step===2 ? 'Mã xác minh' : 'Mật khẩu';
  return A.screen({mh:signup?'MH-26':'MH-27', title:heading, noTab:true, backTo:step===1 ? '#/dang-nhap' : `#/${mode}?b=${step-1}&preview=1&next=${encodeURIComponent(query.next || '')}`,
    steps:[step, 3, section], body:`<form class="card stack account-step" data-form="demo-account-step" data-mode="${mode}" data-step="${step}">
      <h2>${section}</h2>
      <p class="note">Chỉ dùng thông tin mẫu. Chưa tạo tài khoản hoặc gửi mã xác minh thật.</p>
      ${step===1 ? phone() : step===2 ? `<label class="field"><span class="label">Mã mẫu 123456</span><input class="input" id="account-otp" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required></label>` : `${password('Mật khẩu mẫu mới')}${signup ? '<label class="field"><span class="label">Tên mẫu</span><input class="input" id="account-name" value="Minh Anh" required></label>' : ''}`}
      <div id="account-feedback" role="alert"></div>
      <button class="btn btn-primary">${step===1 ? 'Tiếp tục' : step===2 ? 'Xác nhận' : 'Hoàn tất'}</button>
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
A.actions['sign-in-work'] = button => {
  A.signIn(button.dataset.work);
  if(A.q.work && A.enterWork()) A.go(returnTo(true));
  else A.go(returnTo());
};
A.actions['open-work'] = () => { if(A.enterWork()) A.go(A.roleHome()); };
A.actions['exit-work'] = () => { A.leaveWork(); A.go(A.residentHome()); };
A.actions['sign-out'] = () => { A.signOut(); A.go(A.residentHome()); };

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
    else { A.signIn('user'); A.go(returnTo()); }
    return;
  }
  const step = Number(form.dataset.step);
  const otp = document.getElementById('account-otp');
  if(otp && otp.value!=='123456'){
    accountError('Hãy nhập mã mẫu 123456.',otp);
    return;
  }
  if(step<3) A.go(`#/${form.dataset.mode}?b=${step+1}&preview=1&next=${encodeURIComponent(A.q.next || '')}`);
  else if(form.dataset.mode==='dang-ky') {
    const name = document.getElementById('account-name').value.trim();
    if(!A.S.name && name==='Minh Anh') A.S.name = name;
    A.save();
    A.signIn('user');
    A.go(returnTo());
  }
  else { A.toast('Đã xem xong luồng tài khoản mẫu'); A.go('#/dang-nhap'); }
});
})();
