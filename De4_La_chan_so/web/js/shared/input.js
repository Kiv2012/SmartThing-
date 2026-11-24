/* Nút "Dán" dùng chung cho các ô nhập */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
A.actions.paste = async el => {
  const t = document.getElementById(el.dataset.target);
  try{ const txt = await navigator.clipboard.readText(); t.value = txt; t.dispatchEvent(new Event('input',{bubbles:true})); }
  catch(e){ t.focus(); A.toast('Nhấn giữ vào ô rồi chọn "Dán"'); }
};
})();
