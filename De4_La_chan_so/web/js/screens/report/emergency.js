/* MH-10 Khẩn cấp: tôi đã chuyển tiền */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-10 Khẩn cấp ===== */
A.route(/^\/khan-cap$/, (m, q) => A.screen({mh:'MH-10', title:'Tôi đã chuyển tiền', noTab:true, backTo:A.roleHome(), listen:'Bình tĩnh. Làm ngay ba việc. Một, gọi tổng đài ngân hàng để đề nghị phong tỏa. Hai, gọi một một ba. Ba, báo người thân.', body:`
  <div class="emergency"><h2>Bình tĩnh, làm ngay 3 việc</h2><p>Càng nhanh càng có cơ hội giữ lại tiền.</p></div>
  <div class="card stack"><div class="estep"><span class="n">1</span><div class="grow"><b>Gọi tổng đài ngân hàng</b><p class="small ink2">Gọi số in ở mặt sau thẻ ngân hàng, đề nghị phong tỏa giao dịch vừa chuyển.</p></div></div>
    <button class="btn btn-ghost" data-act="tick" data-t="Đã gọi ngân hàng">Tôi đã gọi ngân hàng</button></div>
  <div class="card stack"><div class="estep"><span class="n">2</span><div class="grow"><b>Báo Công an</b><p class="small ink2">Gọi 113 hoặc đến Công an xã, phường gần nhất.</p></div></div>
    <a class="btn btn-call" href="tel:113">Gọi 113</a></div>
  <div class="card stack"><div class="estep"><span class="n">3</span><div class="grow"><b>Báo người thân</b><p class="small ink2">Để có người cùng xử lý, tránh bị lừa lần hai.</p></div></div>
    <a class="btn btn-ghost" href="#/hoi-nguoi-than">Hỏi người thân</a></div>
  <a class="btn btn-primary" href="${q.bc?'#/bao-cao/da-nhan':'#/bao-cao?moi=1'}">${q.bc?'Xem báo cáo đã gửi':'Báo cáo trường hợp này'}</a>`}));
A.actions.tick = el => { el.textContent = '✓ '+el.dataset.t; el.disabled = true; };
})();
