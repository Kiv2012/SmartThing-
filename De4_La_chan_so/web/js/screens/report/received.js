/* MH-09 Đã tiếp nhận + Gửi Công an – Bắt buộc 2, Điểm cộng 3 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-09 Đã tiếp nhận ===== */
A.route(/^\/bao-cao\/da-nhan$/, () => {
  const rp = S.myReports[0] || {ma:'BC-2026-0121', ward:S.ward};
  const nth = +rp.ma.slice(-4);
  return A.screen({mh:'MH-09', title:'Đã tiếp nhận báo cáo', tab:'', backTo:A.roleHome(), body:`
    <div class="card stack">
      <span class="label">Mã báo cáo</span><p class="code6" style="letter-spacing:.05em;font-size:26px">${esc(rp.ma)}</p>
      <p><b>Cảm ơn ${A.xung()}!</b> ${A.xung()==='bà'?'Bà':'Bạn'} là người thứ ${nth} báo cáo trong tháng này tại ${esc(rp.ward)}.</p>
    </div>
    <div class="card"><span class="label">Báo cáo đi đến đâu</span>
      <ol class="ol"><li><b>Đã nhận</b> · vừa xong</li><li class="muted">Đội tình nguyện ${esc(rp.ward)} xác minh</li><li class="muted">Chuyển Công an xã, phường</li></ol>
      <p class="note mt8">Xem trạng thái ở mục Tôi → Báo cáo của tôi.</p></div>
    <div class="stack">
      <button class="btn btn-primary" data-act="to-police">Gửi Công an</button>
      <a class="btn btn-ghost" href="#/hoi-nguoi-than">Hỏi người thân</a>
      <a class="btn btn-ghost" href="${A.roleHome()}">Về trang chủ</a>
    </div>`, noTab:!S.role});
});
A.actions['to-police'] = () => {
  const rp = S.myReports[0] || {}; const sc = rp.type && A.scen(rp.type);
  const hs = `TIN BÁO LỪA ĐẢO · ${rp.ma||''}\nKiểu: ${sc?sc.ten:'Không rõ'}\nKênh: ${rp.kenh||''}\nSố/link/tài khoản: ${rp.value||''}\nNơi: ${rp.ward||S.ward}\nĐã chuyển tiền: ${rp.chuyen==='roi'?'Có':'Chưa'}\nGửi từ Lá Chắn Số`;
  A.sheet(`<h2>Gửi Công an</h2>
    <p class="small ink2">Hồ sơ tin báo đã được chép sẵn. ${A.xung()==='bà'?'Bà':'Bạn'} chỉ cần dán vào kênh tiếp nhận.</p>
    <pre class="card small" style="white-space:pre-wrap;margin:0">${esc(hs)}</pre>
    <a class="btn btn-call" href="tel:113">Gọi 113</a>
    <button class="btn btn-ghost" data-act="copy-police" data-text="${esc(hs)}">Chép hồ sơ và mở kênh tiếp nhận của Công an xã, phường</button>
    <p class="note">Kênh tiếp nhận cụ thể được cấu hình theo từng địa phương (cần kiểm chứng). App không tự gửi và không ghi "đã gửi Công an" thay người dùng.</p>
    <button class="btn btn-ghost" data-act="sheet-close">Đóng</button>`);
};
A.actions['copy-police'] = async el => { try{ await navigator.clipboard.writeText(el.dataset.text); A.toast('Đã chép hồ sơ tin báo'); }catch(e){ A.toast('Không chép được, hãy chụp màn hình'); } };
})();
