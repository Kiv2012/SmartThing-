/* MH-04 Trang chủ Học sinh */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-04 Trang chủ Học sinh ===== */
A.route(/^\/hoc-sinh$/, () => {
  const me = D.CHIDOAN.findIndex(c=>c.id===S.cls); const cd = D.CHIDOAN[me] || D.CHIDOAN[0];
  return A.screen({mh:'MH-04', brand:true, tab:'#/hoc-sinh', body:`
    <section class="home-hero student-hero"><h1>Chào ${esc(S.name)}</h1>
    <form class="stack" data-form="home-check">
      <label for="home-q" class="check-label">Kiểm tra số, đường link hoặc số tài khoản</label>
      <div class="omni"><input id="home-q" placeholder="Ví dụ: 0868 000 111"><button type="button" class="paste" data-act="paste" data-target="home-q">Dán</button></div>
      <button class="btn btn-star" type="submit">Kiểm tra</button>
    </form></section>
    <a class="btn btn-ghost" href="#/tin-nhan">Dán tin nhắn lạ để phân tích</a>
    <div class="card stack">
      <span class="label">Cảnh báo tại ${esc(S.ward)} · tuần này</span>
      <p><span class="tag new">MỚI</span> <b>Link nhận quà tri ân</b> tăng gấp 4 lần</p>
      <p><span class="tag new">MỚI</span> <b>Đầu tư lãi cao</b> lần đầu xuất hiện, nhắm vào học sinh</p>
      <p class="source">Dữ liệu giả lập · báo cáo từ người dân và đội tình nguyện</p>
    </div>
    <div class="btn-row">
      <a class="card link-card" href="#/hoc/T03"><span class="label">Bài học 1 phút</span><b>Việc nhẹ lương cao</b></a>
      <a class="card link-card" href="#/thu-thach"><span class="label">Thử thách</span><b>10 câu nhận diện</b></a>
    </div>
    <a class="card link-card" href="#/thi-dua">
      <span class="label">Thi đua chi đoàn</span>
      <div class="kv"><b>${esc(cd.ten)}</b><b>Hạng ${me+1} · ${cd.diem} điểm</b></div>
    </a>`});
});
document.addEventListener('submit', e => {
  if(e.target.dataset.form!=='home-check') return; e.preventDefault();
  A.submitCheck(document.getElementById('home-q').value);
});
})();
