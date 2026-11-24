/* MH-12 Màn hình phía người thân nhận cảnh báo */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-12 Phía người thân ===== */
A.route(/^\/canh-bao\/(\w+)$/, (m, q) => {
  const sent = q.tl;
  return A.screen({mh:'MH-12', title:'Cảnh báo từ Mẹ', noTab:true, back:false, body:`
    <section class="verdict is-danger"><div class="lvl">${A.verdictIcon('danger')}<h2>MẸ CẦN CON</h2></div>
      <p class="what">Mẹ vừa nhận cuộc gọi NGUY HIỂM</p><p class="kind">Từ số <span class="mono">0868 000 111</span> · giả danh Công an · 2 phút trước</p>
      <p class="remind">23 người đã báo số này lừa đảo. Hãy gọi cho mẹ ngay để mẹ không chuyển tiền.</p></section>
    ${sent?`<div class="reply"><b>Câu trả lời minh họa</b><p>"${esc(sent)}"</p></div>`:''}
    <div class="stack">
      <a class="btn btn-call" href="tel:0912000003">Con gọi mẹ ngay</a>
      <a class="btn btn-primary" href="#/canh-bao/${esc(m[0])}?tl=${encodeURIComponent('Mẹ đừng chuyển tiền, chờ con nhé.')}">Đừng chuyển tiền, chờ con</a>
      <a class="btn btn-ghost" href="#/canh-bao/${esc(m[0])}?tl=${encodeURIComponent('Không sao đâu mẹ, con đã kiểm tra rồi.')}">Không sao đâu, con đã kiểm tra</a>
    </div>
    <p class="source">Tình huống minh họa. Chưa có yêu cầu hỗ trợ thực.</p>`});
});
})();
