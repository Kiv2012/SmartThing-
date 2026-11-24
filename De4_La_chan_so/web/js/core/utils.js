/* Tiện ích chuỗi, định dạng số, nhãn mức kết quả */
(function(){
const {D} = window.App;
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const noMark = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
const fmtPhone = d => d.length===10 ? d.slice(0,4)+' '+d.slice(4,7)+' '+d.slice(7) : d;
const fmtStk = d => d.replace(/(\d{4})(?=\d)/g,'$1 ');
const scen = id => D.SCEN.find(s => s.id===id);
const LV = {danger:'NGUY HIỂM', warn:'NGHI NGỜ', ok:'AN TOÀN'};
Object.assign(window.App, {esc, noMark, fmtPhone, fmtStk, scen, LV});
})();
