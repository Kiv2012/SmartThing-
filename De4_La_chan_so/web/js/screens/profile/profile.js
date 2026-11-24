/* MH-20 Hồ sơ, Dễ nhìn và đọc to, quyền riêng tư */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const tmp = A.tmp;
/* ===== MH-20 Hồ sơ và cài đặt ===== */
const ROLE_NAME = {ob:'Ông bà, người cao tuổi', hs:'Học sinh', tnv:'Đội thanh niên tình nguyện'};
const ST = {received:['Đã nhận','tag'], verified:['Đã xác minh','tag ok'], police:['Đã chuyển Công an','tag ok'], rejected:['Đã bác bỏ','tag warn'], pending:['Chờ xác minh','tag warn']};
A.route(/^\/toi$/, () => A.screen({mh:'MH-20', title:'Tôi', tab:'#/toi', back:false, body:`
  <div class="card person"><span class="avatar">${esc((S.name||'?')[0])}</span><span class="grow"><b>${esc(S.name||'Khách')}</b><br><span class="small ink2">${ROLE_NAME[S.role]||'Chưa chọn vai trò'} · ${esc(S.ward)}${S.role!=='ob'?' · '+esc((D.CHIDOAN.find(c=>c.id===S.cls)||{}).ten||''):''}</span></span></div>
  <div class="card"><label class="switch-row"><span><b>Dễ nhìn và đọc to</b><br><span class="small ink2">Chữ và nút to hơn, tự đọc kết quả</span></span><span class="switch"><input type="checkbox" ${S.deNhin?'checked':''} data-act-check="denhin"><i></i></span></label></div>
  ${S.role!=='tnv'?`<div class="card"><div class="kv"><b>Người thân tin cậy</b><a href="#/nguoi-than">Sửa</a></div>
    ${S.relatives.length?`<p class="small ink2 mt8">${S.relatives.map(r=>esc(r.ten)+(r.uu?' (ưu tiên)':'')).join(' · ')}</p>`:'<p class="small ink2 mt8">Chưa có ai</p>'}</div>`:
    `<div class="card"><b>Công cụ người dân</b><div class="btn-row mt8"><a class="btn btn-ghost" href="#/kiem-tra">Kiểm tra</a><a class="btn btn-ghost" href="#/tin-nhan">Tin nhắn</a></div></div>`}
  <div class="card"><b>Thành tích</b><p class="small ink2 mt8">${S.quiz?`Điểm cao nhất ${S.quiz.best}/100 · ${S.quiz.best>=80?'Đã có Chứng nhận Lá Chắn Số':'Chưa có chứng nhận (cần từ 80 điểm)'}`:'Chưa làm bài kiểm tra.'}</p><a class="link-btn" href="#/thu-thach">Làm bài kiểm tra</a></div>
  <div class="card"><b>Báo cáo của tôi</b>${S.myReports.length?`<ul class="list">${S.myReports.slice(0,5).map(r=>`<li class="kv"><span><span class="mono small">${esc(r.ma)}</span><br><span class="small ink2">${esc((A.scen(r.type)||{ngan:'Không rõ'}).ngan)}</span></span><span class="${ST[r.status][1]}">${ST[r.status][0]}</span></li>`).join('')}</ul>`:'<p class="small ink2 mt8">Chưa gửi báo cáo nào.</p>'}</div>
  <div class="card stack"><b>Quyền riêng tư</b><p class="small ink2">Lịch sử kiểm tra chỉ lưu trên máy này. Báo cáo ẩn danh không gắn tên người báo.</p>
    <button class="btn btn-ghost" data-act="wipe" data-k="history">Xóa lịch sử kiểm tra</button>
    <button class="btn btn-danger" data-act="wipe" data-k="all">Xóa toàn bộ dữ liệu trên máy</button></div>
  <a class="btn btn-ghost" href="#/bat-dau" data-act="reset-role">Đổi vai trò</a>
  <a class="link-btn center" href="#/man-hinh">Danh mục màn hình (trình chiếu)</a>`}));
A.actions.wipe = el => {
  const all = el.dataset.k==='all';
  A.sheet(`<h2>${all?'Xóa toàn bộ dữ liệu?':'Xóa lịch sử kiểm tra?'}</h2><p class="ink2">Thao tác này không hoàn tác được.</p>
    <button class="btn btn-primary" data-act="sheet-close">Giữ lại</button><button class="btn btn-danger" data-act="wipe-do" data-k="${el.dataset.k}">Xóa</button>`);
};
A.actions['wipe-do'] = el => { if(el.dataset.k==='all'){ localStorage.removeItem('lcs-state-v1'); location.hash='#/bat-dau'; location.reload(); } else { S.history = []; A.save(); A.closeSheet(); A.toast('Đã xóa lịch sử'); A.render(); } };
A.actions['reset-role'] = () => { tmp.role = null; A.go('#/bat-dau'); };
document.addEventListener('change', e => { if(e.target.dataset.actCheck==='denhin'){ S.deNhin = e.target.checked; A.save(); A.render(); } });
})();
