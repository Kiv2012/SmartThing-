/* QT-20: phát hiện kiểu lừa MỚI tại địa phương */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* QT-20: kiểu MỚI = lần đầu trong 7 ngày, hoặc ≥ 2 lần trung bình 4 tuần trước và ≥ 3 ca */
const newTypes = () => D.SCEN.map(s => ({s, w:D.WEEK[s.id], b:D.BASE[s.id]}))
  .filter(x => x.w>0 && (x.b===0 || (x.w >= 2*x.b && x.w >= 3)))
  .sort((a,b) => b.w - a.w);
A.newTypes = newTypes;
})();
