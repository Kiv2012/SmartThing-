/* Thành phần khung: toast, bottom sheet, đầu trang, thanh điều hướng, khung màn hình */
(function(){
const {S, esc, xung, icon, workRole} = window.App;
let toastT;
function toast(msg){
  let t = document.querySelector('.toast');
  if(!t){ t = document.createElement('div'); t.className='toast'; t.setAttribute('role','status'); document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity = 1;
  clearTimeout(toastT); toastT = setTimeout(()=>{ t.style.opacity = 0; }, 3000);
}
function sheet(html){
  closeSheet();
  const dialog = document.createElement('dialog');
  dialog.className = 'sheet';
  dialog.innerHTML = html;
  const title = dialog.querySelector('h2');
  if(title){
    title.id = 'sheet-title';
    dialog.setAttribute('aria-labelledby', title.id);
  }
  dialog.addEventListener('close', () => dialog.remove());
  dialog.addEventListener('click', event => {
    if(event.target !== dialog) return;
    const {left, right, top, bottom} = dialog.getBoundingClientRect();
    if(event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) closeSheet();
  });
  document.body.appendChild(dialog);
  dialog.showModal();
}
function closeSheet(){
  const dialog = document.querySelector('dialog.sheet[open]');
  if(dialog) dialog.close();
}
function confirmLeave(to, msg){
  sheet(`<h2>${esc(msg||'Bỏ báo cáo này?')}</h2><p class="ink2">Những gì ${xung()} đã làm sẽ không được lưu.</p>
    <button class="btn btn-primary" data-act="sheet-close">Ở lại</button>
    <button class="btn btn-danger" data-go="${esc(to)}" data-act="sheet-close">Thoát</button>`);
}
const TABS = {
 ob:[['#/ong-ba','home','Trang chủ'],['#/kiem-tra','search','Kiểm tra'],['#/hoc','book','Học'],['#/toi','user','Tôi']],
 hs:[['#/hoc-sinh','home','Trang chủ'],['#/kiem-tra','search','Kiểm tra'],['#/hoc','book','Học'],['#/thu-thach','star','Thử thách'],['#/toi','user','Tôi']],
 tnv:[['#/cong-tac','home','Việc của tôi'],['#/doi','chart','Tình hình'],['#/doi/tuyen-truyen','book','Tài liệu'],['#/doi/do-dau','hand','Đỡ đầu'],['#/toi','user','Tôi']],
 dp:[['#/dieu-phoi','home','Tổng quan'],['#/dieu-phoi?muc=ke-hoach','check','Kế hoạch'],['#/dieu-phoi?muc=thanh-vien','user','Thành viên'],['#/dieu-phoi?muc=bao-cao','chart','Báo cáo'],['#/toi','user','Tôi']]
};
function tabbar(active){
  const tabs = TABS[workRole() || S.role] || TABS.hs;
  const mark = workRole() ? '<img class="rail-mark" src="assets/huy-hieu-doan.webp" width="30" height="34" alt="">' : '';
  return `<nav class="tabbar ${tabs.length>4?'five':''}" aria-label="Điều hướng chính">
    <span class="tabbar-title">${mark}Lá Chắn Số</span>
    ${tabs.map(([h,ic,lb]) => `<a class="tab ${active===h?'on':''}" href="${h}" ${active===h?'aria-current="page"':''}>${icon(ic)}<span>${lb}</span></a>`).join('')}
  </nav>`;
}
function isOffline(q){ return (q && q.state==='offline') || !navigator.onLine; }
function screen(o){
  const off = isOffline(App.q) ? `<div class="offline" role="status">Đang dùng dữ liệu đã tải về lúc 9:30</div>` : '';
  const head = o.brand ? `<header class="brandbar"><img class="brand-mark" src="assets/huy-hieu-doan.webp" width="44" height="44" alt=""><div class="brand-label"><b>Lá Chắn Số</b><small>Đoàn TNCS Hồ Chí Minh</small></div>${o.listen?`<button class="listen" data-act="speak" data-text="${esc(o.listen)}" aria-label="Nghe đọc">${icon('speaker')}Nghe</button>`:o.mh==='MH-01'?'<a class="brand-signin" href="#/dang-nhap">Đăng nhập</a>':''}</header>`
    : `<header class="appbar">${o.back===false?'':`<button class="iconbtn" data-act="back" ${o.backTo?`data-to="${esc(o.backTo)}"`:''} ${o.confirm?`data-confirm="1" data-msg="${esc(o.confirm===true?'':o.confirm)}"`:''} aria-label="Quay lại">${icon('back')}</button>`}<h1>${esc(o.title)}</h1>${o.listen?`<button class="listen" data-act="speak" data-text="${esc(o.listen)}" aria-label="Nghe đọc">${icon('speaker')}Nghe</button>`:''}</header>`;
  const steps = o.steps ? `<div class="steps"><div class="kv small"><b>Bước ${o.steps[0]}/${o.steps[1]}</b><span class="ink2">${esc(o.steps[2])}</span></div><div class="bar"><i style="width:${o.steps[0]/o.steps[1]*100}%"></i></div></div>` : '';
  const noTab = o.noTab || (!S.role && !workRole());
  return `<div class="screen" data-mh="${o.mh||''}">${head}${off}${steps}<main class="content ${noTab?'no-tab':''}" id="main" tabindex="-1">${o.body}</main>${noTab?'':tabbar(o.tab)}</div>`;
}
Object.assign(window.App, {toast, sheet, closeSheet, confirmLeave, tabbar, isOffline, screen});
})();
