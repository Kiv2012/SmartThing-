/* MH-03 — Trang chủ Ông bà */
(function(){
const A = window.App, S = A.S, esc = A.esc;

A.route(/^\/ong-ba$/, () => {
  const relative = A.priorityRelative();
  const helpUrl = relative ? '#/hoi-nguoi-than' : '#/nguoi-than?ret=hoi';
  return A.screen({mh:'MH-03', brand:true, tab:'#/ong-ba',
    listen:`Chào ${S.name}. Bấm Kiểm tra số lạ để tra số điện thoại, đường link hoặc số tài khoản. Bấm Hỏi người thân để báo cho ${relative ? relative.ten : 'con cháu'}.`,
    body:`
      <section class="home-hero">
        <h1>Chào ${esc(S.name)}</h1>
        <p>Nếu có người giục chuyển tiền, hãy dừng lại và kiểm tra trước.</p>
        <a class="btn btn-xl btn-star" href="#/kiem-tra">
          <b>Kiểm tra số lạ</b><span>Số điện thoại, đường link, số tài khoản</span>
        </a>
      </section>
      <div class="home-actions">
        <a class="action-row" href="${helpUrl}">
          <b>Hỏi người thân</b><span>${relative ? `Báo cho ${esc(relative.ten)} (${esc(relative.qh.toLowerCase())})` : 'Thêm một người bà tin cậy'}</span>
        </a>
        <a class="action-row" href="#/ong-ba/tro-ly">
          <b>Bấm và kể</b><span>Dùng giọng nói để kể chuyện vừa xảy ra</span>
        </a>
      </div>`});
});
})();
