/* MH-20 Hồ sơ, Dễ nhìn và đọc to, quyền riêng tư */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const tmp = A.tmp;
/* ===== MH-20 Hồ sơ và cài đặt ===== */
const ACCOUNT_NAME = {user:'Người dùng', tnv:'Tình nguyện viên', dp:'Điều phối viên'};
const GROUP_NAME = {ob:'Người cao tuổi', hs:'Học sinh'};
const ST = {received:['Đã nhận','tag'], verified:['Đã xác minh','tag ok'], police:['Đã chuyển Công an','tag ok'], rejected:['Đã bác bỏ','tag warn'], pending:['Chờ xác minh','tag warn']};
A.route(/^\/toi$/, () => A.screen({mh:'MH-20', title:'Tôi', tab:'#/toi', back:false, body:`
  <section class="card person"><span class="avatar">${esc((S.name||'?')[0])}</span><div class="grow">
    <h2>${esc(S.name || (A.hasAccount() ? 'Thông tin của bạn' : 'Thông tin của bạn'))}</h2>
    <p class="small ink2">${ACCOUNT_NAME[A.accountRole()] || 'Đang dùng không cần tài khoản'}</p>
  </div></section>
  <section class="card stack" aria-labelledby="display-title">
    <h2 id="display-title">Cách hiển thị</h2>
    <div class="seg" role="group" aria-label="Cỡ giao diện">
      <button type="button" data-act="set-display" data-mode="standard" aria-pressed="${!A.easyView()}" class="${!A.easyView()?'on':''}">Tiêu chuẩn</button>
      <button type="button" data-act="set-display" data-mode="easy" aria-pressed="${A.easyView()}" class="${A.easyView()?'on':''}">Dễ nhìn</button>
    </div>
    <label class="switch-row"><span><b>Nghe đọc tự động</b><br><span class="small ink2">Đọc kết quả và hướng dẫn khi mở màn</span></span>
      <span class="switch"><input type="checkbox" ${S.readAloud?'checked':''} data-act-check="read-aloud"><i></i></span>
    </label>
  </section>
  <section class="card stack">
    <h2>Nội dung phù hợp</h2><p class="small ink2">${GROUP_NAME[S.contentGroup] || 'Đang xem nội dung chung'}</p>
    <a class="link-btn" href="#/bat-dau?tu=toi">Chọn nhóm nội dung</a>
  </section>
  <section class="card stack">
    <h2>Người tin cậy</h2>
    <p class="small ink2">${S.relatives.length ? S.relatives.map(r=>esc(r.ten)+(r.uu?' (ưu tiên)':'')).join(' · ') : 'Chưa thêm người tin cậy'}</p>
    <a class="link-btn" href="#/nguoi-than">Thiết lập người tin cậy</a>
  </section>
  <section class="card stack">
    <h2>Công tác tuyên truyền</h2>
    ${A.workRole() ? '<button class="btn btn-ghost" data-act="exit-work">Về trang cá nhân</button>'
      : ['tnv','dp'].includes(A.accountRole()) ? '<button class="btn btn-primary" data-act="open-work">Công tác tuyên truyền</button>'
      : A.hasAccount() ? (S.workRequested ? '<p class="hint">Đang chờ duyệt yêu cầu tham gia.</p>' : '<button class="btn btn-ghost" data-act="request-work">Yêu cầu tham gia</button>')
      : '<a class="btn btn-ghost" href="#/dang-nhap?work=1">Đăng nhập để xem nhiệm vụ</a>'}
  </section>
  <div class="card"><b>Thành tích</b><p class="small ink2 mt8">${S.quiz?`Điểm cao nhất ${S.quiz.best}/100 · ${S.quiz.best>=80?'Đã có Chứng nhận Lá Chắn Số':'Chưa có chứng nhận (cần từ 80 điểm)'}`:'Chưa làm bài kiểm tra.'}</p><a class="link-btn" href="#/thu-thach">Làm bài kiểm tra</a></div>
  <div class="card"><b>Báo cáo của tôi</b>${A.hasAccount() && S.myReports.some(r=>!r.anonymous)?`<ul class="list">${S.myReports.filter(r=>!r.anonymous).slice(0,5).map(r=>`<li class="kv"><span><span class="mono small">${esc(r.ma)}</span><br><span class="small ink2">${esc((A.scen(r.type)||{ngan:'Không rõ'}).ngan)}</span></span><span class="${ST[r.status][1]}">${ST[r.status][0]}</span></li>`).join('')}</ul>`:'<p class="small ink2 mt8">Chưa gửi báo cáo nào.</p>'}</div>
  <div class="card stack"><b>Quyền riêng tư</b><p class="small ink2">Lịch sử kiểm tra chỉ lưu trên máy này. Báo cáo ẩn danh không gắn tên người báo.</p>
    <button class="btn btn-ghost" data-act="wipe" data-k="history">Xóa lịch sử kiểm tra</button>
    <button class="btn btn-danger" data-act="wipe" data-k="all">Xóa toàn bộ dữ liệu trên máy</button></div>
  ${A.hasAccount() ? '<button class="btn btn-ghost" data-act="sign-out">Đăng xuất</button>' : '<a class="btn btn-ghost" href="#/dang-nhap?next=%23%2Ftoi">Đăng nhập</a>'}
`}));
A.actions.wipe = el => {
  const all = el.dataset.k==='all';
  A.sheet(`<h2>${all?'Xóa toàn bộ dữ liệu?':'Xóa lịch sử kiểm tra?'}</h2><p class="ink2">Thao tác này không hoàn tác được.</p>
    <button class="btn btn-primary" data-act="sheet-close">Giữ lại</button><button class="btn btn-danger" data-act="wipe-do" data-k="${el.dataset.k}">Xóa</button>`);
};
A.actions['wipe-do'] = el => { if(el.dataset.k==='all'){ A.signOut(); localStorage.removeItem('lcs-state-v1'); location.hash='#/hoc-sinh'; location.reload(); } else { S.history = []; A.save(); A.closeSheet(); A.toast('Đã xóa lịch sử'); A.render(); } };
A.actions['set-display'] = button => {
  S.displayMode = button.dataset.mode;
  A.save();
  A.render();
  document.querySelector('[data-act="set-display"][aria-pressed="true"]')?.focus({preventScroll:true});
};
A.actions['request-work'] = () => {
  if(A.accountRole()!=='user') return;
  S.workRequested = true;
  A.save();
  A.render();
};
document.addEventListener('change', event => {
  if(event.target.dataset.actCheck!=='read-aloud') return;
  S.readAloud = event.target.checked;
  A.save();
});
})();
