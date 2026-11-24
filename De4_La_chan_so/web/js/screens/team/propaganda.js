/* MH-18 Soạn bài tuyên truyền */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const pseudoQR = A.pseudoQR;
/* ===== MH-18 Soạn bài tuyên truyền ===== */
A.route(/^\/doi\/tuyen-truyen$/, (m, q) => {
  const t = A.scen(q.t) ? q.t : 'T02'; const sc = A.scen(t);
  const zalo = `CẢNH BÁO TỪ ĐOÀN THANH NIÊN ${S.ward.toUpperCase()}\n${sc.ten}.\nDấu hiệu: ${sc.dauHieu.join('; ')}.\nNên làm: ${sc.nenLam.join('; ')}.\nKiểm tra số lạ, link lạ tại Lá Chắn Số.`;
  const script = `Thưa bà con, tuần này ở ${S.ward} nhiều người báo kiểu lừa "${sc.ngan.toLowerCase()}". ${sc.chat.map(c=>c.t).join(' ')} Đó là lời kẻ gian. Có ba dấu hiệu: ${sc.dauHieu.join('; ')}. Khi gặp, bà con hãy: ${sc.nenLam.join('; ')}. Bà con có thể quét mã QR để học thêm trong 1 phút và làm 5 câu kiểm tra.`;
  return A.screen({mh:'MH-18', title:'Tài liệu tuyên truyền', tab:'#/doi/tuyen-truyen', backTo:A.roleHome(), body:`
    <div class="seg"><a href="#/doi/buoi">Buổi tuyên truyền</a><a class="on" href="#/doi/tuyen-truyen">Soạn bài</a></div>
    <div class="field"><label class="label" for="tt">Kiểu lừa</label><select id="tt" class="select" data-act-tt="1">${D.SCEN.map(s=>`<option value="${s.id}" ${s.id===t?'selected':''}>${esc(s.ten)}</option>`).join('')}</select></div>
    <div class="card stack" id="poster" style="border:2px solid var(--navy)">
      <div class="row"><span class="seal" style="width:40px;height:40px;box-shadow:none">${A.flagSvg}</span><span class="small"><b>ĐOÀN TNCS HỒ CHÍ MINH</b><br>${esc(S.ward)}</span></div>
      <h2 style="font-family:var(--display);font-size:24px;color:var(--danger-ink)">CẢNH BÁO: ${esc(sc.ngan.toUpperCase())}</h2>
      <div><b>3 dấu hiệu</b><ol class="ol">${sc.dauHieu.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>
      <div><b>Nên làm</b><ol class="ol">${sc.nenLam.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>
      <div class="row"><span style="width:84px;flex:none">${pseudoQR('lcs'+t)}</span><span class="small">Quét mã để kiểm tra số lạ, link lạ và học 1 phút với <b>Lá Chắn Số</b></span></div>
    </div>
    <div class="card"><span class="label">Tin nhắn gửi nhóm Zalo tổ dân phố</span><textarea id="zalo" class="textarea" style="min-height:150px">${esc(zalo)}</textarea>
      <button class="btn btn-ghost mt8" data-act="copy" data-src="zalo">Chép tin nhắn</button></div>
    <div class="card"><span class="label">Kịch bản nói 2 phút</span><textarea id="script" class="textarea" style="min-height:170px">${esc(script)}</textarea></div>
    <div class="btn-row"><button class="btn btn-ghost" data-act="print">Tải poster (PDF)</button>${A.workRole()==='dp' ? `<a class="btn btn-primary" href="#/doi/buoi?moi=1&chude=${t}">Tạo buổi về kiểu này</a>` : ''}</div>
    <p class="source">Nội dung soạn tự động từ thư viện 10 tình huống. Bản chính thức dùng trí tuệ nhân tạo viết theo số liệu địa bàn; đội đọc và sửa trước khi gửi.</p>`});
});
document.addEventListener('change', e => { if(e.target.dataset.actTt) A.go('#/doi/tuyen-truyen?t='+e.target.value); });
A.actions.copy = async el => { try{ await navigator.clipboard.writeText(document.getElementById(el.dataset.src).value); A.toast('Đã chép'); }catch(e){ A.toast('Không chép được'); } };
})();
