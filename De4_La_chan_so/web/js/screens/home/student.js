/* MH-04 — Trang cá nhân Tiêu chuẩn */
(function(){
const A = window.App, {S, esc} = A;

A.route(/^\/hoc-sinh$/, () => {
  const lesson = A.scen(S.contentGroup==='hs' ? 'T03' : 'T01');
  return A.screen({mh:'MH-04', brand:true, tab:'#/hoc-sinh', body:`
    <div class="landing-hero">
      <section class="landing-main">
        <div class="landing-intro">
          <h1>Kiểm tra trước<br class="hero-break"> khi chuyển tiền.</h1>
          <p>Tra số điện thoại, đường link hoặc số tài khoản lạ. Ai cũng có thể dùng ngay.</p>
        </div>
        <form class="landing-check" data-form="entry-check" aria-labelledby="entry-check-title">
          <h2 id="entry-check-title">Tra cứu nhanh</h2>
          <label class="label" for="entry-q">Số điện thoại, đường link hoặc số tài khoản</label>
          <div class="omni">
            <input id="entry-q" autocomplete="off" placeholder="Ví dụ: 0868 000 111">
            <button type="button" class="paste" data-act="paste" data-target="entry-q">Dán</button>
          </div>
          <button class="btn btn-primary" type="submit">Kiểm tra ngay</button>
          <div class="entry-utilities">
            <button class="link-btn" type="button" data-act="entry-example">Thử số mẫu</button>
            <a class="link-btn" href="#/tin-nhan">Phân tích tin nhắn</a>
          </div>
        </form>
        <button class="link-btn" type="button" data-act="use-easy">Chữ lớn, dễ dùng</button>
        <a class="urgent-link" href="#/khan-cap">Tôi đã chuyển tiền · Xem cách xử lý</a>
      </section>
      <aside class="landing-guide" aria-labelledby="entry-guide-title">
        <div>
          <h2 id="entry-guide-title">Đang bị giục chuyển tiền?</h2>
          <ol>
            <li>Dừng giao dịch, giữ lại tin nhắn.</li>
            <li>Gọi cho người thân qua số bạn đã biết.</li>
            <li>Tra cứu trước khi quyết định.</li>
          </ol>
        </div>
        <a class="btn btn-star" href="#/hoc/T01?dung=1">Học một tình huống trong 1 phút</a>
      </aside>
    </div>
    <div class="section-heading-row">
      <h2>Học và thực hành</h2>
      <a class="link-btn" href="#/bat-dau">Chọn nội dung phù hợp</a>
    </div>
    <div class="btn-row">
      <a class="card link-card" href="#/hoc/${lesson.id}"><span class="label">Bài học 1 phút</span><b>${esc(lesson.ngan)}</b></a>
      <a class="card link-card" href="#/thu-thach"><span class="label">Thử thách</span><b>Kiểm tra nhận diện lừa đảo</b></a>
    </div>
    <div class="check-links">
      <a class="link-btn" href="#/hoi-nguoi-than">Hỏi người tin cậy</a>
      <a class="link-btn" href="#/bao-cao?moi=1">Báo cáo</a>
    </div>
    <p class="note entry-help">Bản trình diễn dùng dữ liệu giả lập. Kết quả hỗ trợ nhận diện dấu hiệu.</p>`});
});

A.actions['entry-example'] = () => A.submitCheck(A.D.EXAMPLES[0].v);
A.actions['use-easy'] = () => {
  S.displayMode = 'easy';
  A.save();
  A.go(A.residentHome());
};
document.addEventListener('submit', event => {
  if(event.target.dataset.form!=='entry-check') return;
  event.preventDefault();
  A.submitCheck(document.getElementById('entry-q').value);
});
})();
