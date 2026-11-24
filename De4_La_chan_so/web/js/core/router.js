/* Điều hướng #/... và sự kiện chung (data-go, data-act) */
(function(){
const {closeSheet, confirmLeave, roleHome} = window.App;
const routes = [];
function route(re, fn){ routes.push([re, fn]); }
function parse(){
  const raw = location.hash.slice(1) || '/';
  const [path, qs] = raw.split('?');
  const q = Object.fromEntries(new URLSearchParams(qs||''));
  return {path, q};
}
const workRoute = /^\/(doi|cong-tac|dieu-phoi)(\/|$)/;
function render(){
  App.stopSpeech();
  closeSheet();
  let {path, q} = parse();
  if(path==='/' || path==='/ong-ba' || path==='/hoc-sinh'){
    App.leaveWork();
    const home = App.residentHome().slice(1);
    if(path!==home){
      path = home;
      q = {};
      history.replaceState(history.state, '', '#'+home);
    }
  }
  const isWorkRoute = workRoute.test(path);
  if(isWorkRoute && !App.workRole()) App.enterWork();
  Object.assign(App, {path, q});
  document.documentElement.classList.toggle('de-nhin', App.easyView());
  document.body.classList.toggle('wide', Boolean(App.workRole()) && isWorkRoute);
  const unauthorized = isWorkRoute && !App.workRole();
  const denied = path==='/doi/xac-minh' ||
    (path.startsWith('/dieu-phoi') && App.workRole()==='tnv') ||
    (path==='/cong-tac' && App.workRole()==='dp') ||
    (path==='/doi/buoi' && q.moi && App.workRole()==='tnv');
  if(unauthorized || denied){
    const title = unauthorized ? 'Công tác tuyên truyền' : 'Chưa có quyền truy cập';
    const target = unauthorized ? (App.hasAccount() ? '#/toi' : '#/dang-nhap?work=1&next='+encodeURIComponent(location.hash)) : roleHome();
    document.getElementById('app').innerHTML = App.screen({title, noTab:true, backTo:roleHome(), body:`
      <div class="empty"><b>${title}</b>${unauthorized ? 'Khu công tác dành cho tài khoản được cấp quyền.' : 'Màn này cần quyền phù hợp. Tài khoản trình diễn hiện tại chưa được cấp quyền này.'}</div>
      <a class="btn btn-primary" href="${App.esc(target)}">${unauthorized ? (App.hasAccount() ? 'Kiểm tra quyền trong mục Tôi' : 'Đăng nhập để vào công tác') : 'Về khu công tác'}</a>`});
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
actions.speak = el => App.isSpeaking() ? App.stopSpeech() : App.speak(el.dataset.text);
window.addEventListener('hashchange', () => {
  render();
  document.getElementById('main')?.focus({preventScroll:true});
});
window.addEventListener('online', render); window.addEventListener('offline', render);
Object.assign(window.App, {route, render, go, actions});
})();
