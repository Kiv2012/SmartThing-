/* MH-03 Trang chủ Ông bà */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const uu = A.priorityRelative;
/* ===== MH-03 Trang chủ Ông bà ===== */
A.route(/^\/ong-ba$/, () => {
  const r = uu();
  const lesson = A.scen('T01');
  return A.screen({mh:'MH-03', brand:true, tab:'#/ong-ba', listen:`Chào ${S.name}. Bấm Kiểm tra số lạ để xem số điện thoại có phải lừa đảo không. Bấm Hỏi người thân để báo cho ${r?r.ten:'con cháu'}.`, body:`
    <h2 style="font-size:var(--fs-hero)">Chào ${esc(S.name)}</h2>
    <a class="btn btn-xl btn-primary" href="#/kiem-tra"><b>Kiểm tra số lạ</b><span>Số điện thoại, đường link, số tài khoản</span></a>
    <a class="btn btn-xl white" href="${r?'#/hoi-nguoi-than':'#/nguoi-than?ret=hoi'}"><b>Hỏi người thân</b><span>${r?`Báo ngay cho ${esc(r.ten)} (${esc(r.qh.toLowerCase())})`:'Chưa cài – bấm để thêm người thân'}</span></a>
    <a class="btn btn-xl white" href="#/ong-ba/tro-ly"><b>Bấm và kể</b><span>Nói cho app nghe chuyện vừa xảy ra</span></a>
    <a class="card" href="#/hoc/T01" style="text-decoration:none;color:inherit">
      <span class="label">Bài học hôm nay · 1 phút</span><b>${esc(lesson.ten)}</b>
      <p class="ink2 small mt8">Công an không bao giờ gọi điện yêu cầu chuyển tiền.</p></a>`});
});
})();
