/* MH-03 — Trang cá nhân Dễ nhìn */
(function(){
const A = window.App, {S, esc} = A;

A.route(/^\/ong-ba$/, () => {
  const relative = A.priorityRelative();
  const lesson = A.scen(S.contentGroup==='hs' ? 'T03' : 'T01');
  return A.screen({mh:'MH-03', brand:true, tab:'#/ong-ba',
    listen:'Kiểm tra số lạ trước khi chuyển tiền. Bạn cũng có thể gọi người tin cậy để hỏi ý kiến.',
    body:`
      <section class="home-hero">
        <h1>${S.name ? 'Chào '+esc(S.name) : 'Kiểm tra trước khi chuyển tiền'}</h1>
        <p>Nếu có người giục chuyển tiền, hãy dừng lại và kiểm tra trước.</p>
        <a class="btn btn-xl btn-star" href="#/kiem-tra">
          <b>Kiểm tra số lạ</b><span>Số điện thoại, đường link hoặc số tài khoản</span>
        </a>
      </section>
      <div class="home-actions">
        <a class="action-row" href="${relative ? '#/hoi-nguoi-than' : '#/nguoi-than?ret=hoi'}">
          <b>Gọi người tin cậy</b><span>${relative ? 'Gọi hoặc gửi tin cho '+esc(relative.ten) : 'Thêm người bạn tin cậy để dễ gọi khi cần'}</span>
        </a>
        <a class="action-row" href="#/hoc/${lesson.id}">
          <b>Bài học 1 phút</b><span>${esc(lesson.ngan)}</span>
        </a>
      </div>`});
});
})();
