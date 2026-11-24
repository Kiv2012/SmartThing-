/* Thành phần khung: toast, bottom sheet, đầu trang, thanh điều hướng, khung màn hình */
(function(){
const {S, esc, xung, icon, flagSvg} = window.App;
let toastT;
function toast(msg){
  let t = document.querySelector('.toast');
  if(!t){ t = document.createElement('div'); t.className='toast'; t.setAttribute('role','status'); document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity = 1;
  clearTimeout(toastT); toastT = setTimeout(()=>{ t.style.opacity = 0; }, 3000);
}
function sheet(html){
  closeSheet();
  const bg = document.createElement('div'); bg.className='sheet-bg';
  bg.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}</div>`;
  bg.addEventListener('click', e => { if(e.target===bg) closeSheet(); });
  document.body.appendChild(bg);
  const f = bg.querySelector('button'); f && f.focus();
}
function closeSheet(){ document.querySelectorAll('.sheet-bg').forEach(n=>n.remove()); }
function confirmLeave(to, msg){
  sheet(`<h2>${esc(msg||'Bỏ báo cáo này?')}</h2><p class="ink2">Những gì ${xung()} đã làm sẽ không được lưu.</p>
    <button class="btn btn-primary" data-act="sheet-close">Ở lại</button>
    <button class="btn btn-danger" data-go="${esc(to)}" data-act="sheet-close">Thoát</button>`);
}
const TABS = {
 ob:[['#/ong-ba','home','Trang chủ'],['#/kiem-tra','search','Kiểm tra'],['#/hoc','book','Học'],['#/toi','user','Tôi']],
 hs:[['#/hoc-sinh','home','Trang chủ'],['#/kiem-tra','search','Kiểm tra'],['#/hoc','book','Học'],['#/thu-thach','star','Thử thách'],['#/toi','user','Tôi']],
 tnv:[['#/doi','chart','Tổng quan'],['#/doi/xac-minh','check','Xác minh'],['#/doi/buoi','mega','Tuyên truyền'],['#/doi/do-dau','hand','Đỡ đầu'],['#/toi','user','Tôi']]
};
function tabbar(active){
  const tabs = TABS[S.role] || TABS.hs;
  return `<nav class="tabbar ${tabs.length>4?'five':''}" style="grid-template-columns:repeat(${tabs.length},1fr)" aria-label="Điều hướng chính">${
    tabs.map(([h,ic,lb]) => `<a class="tab ${active===h?'on':''}" href="${h}" ${active===h?'aria-current="page"':''}>${icon(ic)}<span>${lb}</span></a>`).join('')}</nav>`;
}
function isOffline(q){ return (q && q.state==='offline') || !navigator.onLine; }
function screen(o){
  const off = isOffline(App.q) ? `<div class="offline" role="status">Đang dùng dữ liệu đã tải về lúc 9:30</div>` : '';
  const head = o.brand ? `<header class="brandbar"><span class="flag">${flagSvg}</span><span class="grow"><b>LÁ CHẮN SỐ</b><small>Đoàn TNCS Hồ Chí Minh · ${esc(S.ward)}</small></span>${o.listen?`<button class="iconbtn" style="color:#fff" data-act="speak" data-text="${esc(o.listen)}" aria-label="Nghe đọc">${icon('speaker')}</button>`:''}</header>`
    : `<header class="appbar">${o.back===false?'<span style="width:8px"></span>':`<button class="iconbtn" data-act="back" ${o.backTo?`data-to="${esc(o.backTo)}"`:''} ${o.confirm?`data-confirm="1" data-msg="${esc(o.confirm===true?'':o.confirm)}"`:''} aria-label="Quay lại">${icon('back')}</button>`}<h1>${esc(o.title)}</h1>${o.listen?`<button class="listen" data-act="speak" data-text="${esc(o.listen)}">${icon('speaker')}Nghe</button>`:''}</header>`;
  const steps = o.steps ? `<div class="steps"><div class="kv small"><b>Bước ${o.steps[0]}/${o.steps[1]}</b><span class="ink2">${esc(o.steps[2])}</span></div><div class="bar"><i style="width:${o.steps[0]/o.steps[1]*100}%"></i></div></div>` : '';
  const noTab = o.noTab || !S.role;
  return `<div class="screen" data-mh="${o.mh||''}">${head}${off}${steps}<main class="content ${noTab?'no-tab':''}" id="main">${o.body}</main>${noTab?'':tabbar(o.tab)}</div>`;
}
Object.assign(window.App, {toast, sheet, closeSheet, confirmLeave, tabbar, isOffline, screen});
})();
