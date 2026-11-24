/* Điều hướng #/... và sự kiện chung (data-go, data-act) */
(function(){
const {S, canSpeak, speak, closeSheet, confirmLeave, seedRole, roleHome} = window.App;
const routes = [];
function route(re, fn){ routes.push([re, fn]); }
function parse(){
  const raw = location.hash.slice(1) || '/';
  const [path, qs] = raw.split('?');
  const q = Object.fromEntries(new URLSearchParams(qs||''));
  return {path, q};
}
function render(){
  if(canSpeak) window.speechSynthesis.cancel();
  closeSheet();
  const {path, q} = parse(); App.q = q; App.path = path;
  if(q.vai && ['ob','hs'].includes(q.vai)){ seedRole(q.vai); }
  document.documentElement.classList.toggle('de-nhin', !!S.deNhin);
  document.body.classList.toggle('wide', App.workRole() && /^\/(doi|cong-tac|dieu-phoi)(\/|$)/.test(path));
  const unauthorized = /^\/(doi|cong-tac|dieu-phoi)(\/|$)/.test(path) && !App.workRole();
  const denied = path==='/doi/xac-minh' ||
    (path.startsWith('/dieu-phoi') && App.workRole()==='tnv') ||
    (path==='/cong-tac' && App.workRole()==='dp') ||
    (path==='/doi/buoi' && q.moi && App.workRole()==='tnv');
  if(unauthorized || denied){
    const title = unauthorized ? 'Mở khu công tác' : 'Chưa có quyền truy cập';
    document.getElementById('app').innerHTML = App.screen({title, noTab:true, backTo:roleHome(), body:`
      <div class="empty"><b>${title}</b>${unauthorized ? 'Chọn tài khoản trình diễn phù hợp để xem công việc theo vai trò.' : 'Màn này cần quyền phù hợp. Tài khoản trình diễn hiện tại chưa được cấp quyền này.'}</div>
      <a class="btn btn-primary" href="${unauthorized ? '#/dang-nhap?work=1' : roleHome()}">${unauthorized ? 'Chọn tài khoản trình diễn' : 'Về khu công tác'}</a>`});
    document.title = title + ' – Lá Chắn Số';
    window.scrollTo(0,0);
    return;
  }
  for(const [re, fn] of routes){
    const m = path.match(re);
    if(m){
      App.after = null;
      document.getElementById('app').innerHTML = fn(m.slice(1), q);
      window.scrollTo(0,0);
      const heading = document.querySelector('.appbar h1, main h1');
      document.title = heading ? heading.textContent + ' – Lá Chắn Số' : 'Lá Chắn Số';
      App.after && App.after();
      return;
    }
  }
  location.hash = roleHome();
}
function go(h){ if(location.hash===h) render(); else location.hash = h; }
const actions = {};
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]');
  const a = e.target.closest('[data-act]');
  if(a){ const fn = actions[a.dataset.act]; if(fn){ e.preventDefault(); fn(a, e); } }
  if(g && !(a && a.dataset.act!=='sheet-close')){ e.preventDefault(); closeSheet(); go(g.dataset.go); }
});
actions['sheet-close'] = () => closeSheet();
actions.back = el => {
  if(el.dataset.confirm) return confirmLeave(el.dataset.to || roleHome(), el.dataset.msg || undefined);
  if(el.dataset.to) return go(el.dataset.to);
  if(history.length>1) history.back(); else go(roleHome());
};
actions.speak = el => speak(el.dataset.text);
window.addEventListener('hashchange', () => {
  render();
  document.getElementById('main')?.focus({preventScroll:true});
});
window.addEventListener('online', render); window.addEventListener('offline', render);
Object.assign(window.App, {route, render, go, actions});
})();
