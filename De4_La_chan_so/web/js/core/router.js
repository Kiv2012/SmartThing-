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
  if(q.vai && ['ob','hs','tnv'].includes(q.vai)){ seedRole(q.vai); }
  document.documentElement.classList.toggle('de-nhin', !!S.deNhin);
  document.body.classList.toggle('wide', S.role==='tnv' && path.startsWith('/doi'));
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
