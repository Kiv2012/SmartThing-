/* MH-04 Trang chủ Học sinh */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-04 Trang chủ Học sinh ===== */
A.route(/^\/hoc-sinh$/, () => {
  const me = D.CHIDOAN.findIndex(c=>c.id===S.cls); const cd = D.CHIDOAN[me] || D.CHIDOAN[0];
  return A.screen({mh:'MH-04', brand:true, tab:'#/hoc-sinh', body:`
    <h2 style="font-size:22px">Chào ${esc(S.name)}</h2>
    <form class="stack" data-form="home-check">
      <div class="omni"><input id="home-q" placeholder="Dán số, link, số tài khoản…" aria-label="Nội dung cần kiểm tra"><button type="button" class="paste" data-act="paste" data-target="home-q">Dán</button></div>
      <button class="btn btn-primary" type="submit">Kiểm tra</button>
    </form>
    <a class="btn btn-ghost" href="#/tin-nhan">Dán tin nhắn lạ để phân tích</a>
    <div class="card stack">
      <span class="label">Cảnh báo tại ${esc(S.ward)} · tuần này</span>
      <p><span class="tag new">MỚI</span> <b>Link nhận quà tri ân</b> tăng gấp 4 lần</p>
      <p><span class="tag new">MỚI</span> <b>Đầu tư lãi cao</b> lần đầu xuất hiện, nhắm vào học sinh</p>
      <p class="source">Dữ liệu giả lập · báo cáo từ người dân và đội tình nguyện</p>
    </div>
    <div class="btn-row">
      <a class="card" href="#/hoc/T03" style="text-decoration:none;color:inherit"><span class="label">Bài học 1 phút</span><b>Việc nhẹ lương cao</b></a>
      <a class="card" href="#/thu-thach" style="text-decoration:none;color:inherit"><span class="label">Thử thách</span><b>10 câu nhận diện</b></a>
    </div>
    <a class="card" href="#/thi-dua" style="text-decoration:none;color:inherit">
      <span class="label">Thi đua chi đoàn</span>
      <div class="kv"><b>${esc(cd.ten)}</b><b>Hạng ${me+1} · ${cd.diem} điểm</b></div>
    </a>`});
});
document.addEventListener('submit', e => {
  if(e.target.dataset.form!=='home-check') return; e.preventDefault();
  const v = document.getElementById('home-q').value; A.go(v.trim() ? '#/kiem-tra/ket-qua?v='+encodeURIComponent(v) : '#/kiem-tra?state=trong');
});
})();
