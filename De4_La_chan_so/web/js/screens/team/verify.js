/* MH-17 Hàng chờ xác minh */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* ===== MH-17 Hàng chờ xác minh ===== */
S.verify = S.verify || {};
const QUEUE = () => [
  {v:'0789 000 222', k:'Số điện thoại', t:'T05', n:3, last:'Hôm nay 08:40', mo:'Gọi xưng nhân viên ngân hàng, bảo cập nhật sinh trắc học, hỏi mã OTP.'},
  {v:'bit.ly/nhanthuong-vn', k:'Đường link', t:'T10', n:2, last:'Hôm qua 20:15', mo:'Tin nhắn báo trúng xe máy, bắt đóng thuế trước.'},
  {v:'0451 000 777', k:'Số tài khoản', t:'T03', n:2, last:'22/11 19:02', mo:'Tài khoản nhận tiền "nạp nhiệm vụ" của nhóm tuyển cộng tác viên.'},
  ...S.myReports.filter(r=>r.status==='received').map(r=>({v:r.value||r.ma, k:r.kenh||'Không rõ', t:r.type, n:1, last:'Vừa xong', mo:'Báo cáo mới từ người dân.', mine:r.ma}))
];
const VS = {ok:['Đã xác nhận lừa đảo','tag danger'], no:['Đã bác bỏ','tag'], ca:['Đã chuyển Công an','tag ok']};
A.route(/^\/doi\/xac-minh$/, (m, q) => {
  const items = q.state==='trong' ? [] : QUEUE();
  const open = items.filter(i=>!S.verify[i.v]); const done = items.filter(i=>S.verify[i.v]);
  return A.screen({mh:'MH-17', title:'Hàng chờ xác minh', tab:'#/doi/xac-minh', back:false, body:`
    <p class="ink2">Báo cáo được gom theo cùng số, link, tài khoản. Từ 5 báo cáo độc lập, hệ thống tự cảnh báo NGUY HIỂM; xác nhận của đội giúp cảnh báo sớm hơn và chính xác hơn.</p>
    ${open.length?open.map(i=>{ const sc = i.t&&A.scen(i.t); return `<div class="card stack">
      <div class="kv"><b class="mono">${esc(i.v)}</b><span class="tag warn">${i.n} báo cáo</span></div>
      <p class="small ink2">${esc(i.k)} · ${sc?esc(sc.ngan):'Không rõ kiểu'} · gần nhất ${esc(i.last)}</p>
      <p class="small">"${esc(i.mo)}"</p>
      <div class="btn-row"><button class="btn btn-primary" data-act="vf" data-v="${esc(i.v)}" data-s="ok">Xác nhận lừa đảo</button><button class="btn btn-ghost" data-act="vf-no" data-v="${esc(i.v)}">Bác bỏ</button></div>
      <button class="btn btn-ghost" data-act="vf" data-v="${esc(i.v)}" data-s="ca">Chuyển Công an</button></div>`; }).join('')
    :`<div class="empty"><b>Không còn báo cáo chờ xác minh</b>Đội đã xử lý hết. Báo cáo mới sẽ hiện ở đây.</div>`}
    ${done.length?`<div class="card"><span class="label">Đã xử lý (nhật ký)</span><ul class="list">${done.map(i=>`<li class="kv"><span class="mono small">${esc(i.v)}</span><span class="${VS[S.verify[i.v].s][1]}">${VS[S.verify[i.v].s][0]}</span></li>`).join('')}</ul><p class="note">Ghi bởi ${esc(S.name)} · có thể gỡ nhãn khi có khiếu nại.</p></div>`:''}`});
});
A.actions.vf = el => {
  S.verify[el.dataset.v] = {s:el.dataset.s, by:S.name, at:Date.now()};
  const mine = S.myReports.find(r=>(r.value||r.ma)===el.dataset.v); if(mine) mine.status = el.dataset.s==='ca'?'police':'verified';
  A.save(); A.closeSheet(); A.toast(VS[el.dataset.s][0]); A.render();
};
A.actions['vf-no'] = el => A.sheet(`<h2>Bác bỏ báo cáo</h2><p class="small ink2 mono">${esc(el.dataset.v)}</p>
  <div class="field"><label class="label" for="ly-do">Lý do (bắt buộc)</label><select id="ly-do" class="select"><option>Số của người quen, đã xác minh trực tiếp</option><option>Báo nhầm, không có dấu hiệu lừa</option><option>Trùng với báo cáo khác</option></select></div>
  <button class="btn btn-danger" data-act="vf" data-v="${esc(el.dataset.v)}" data-s="no">Bác bỏ</button><button class="btn btn-ghost" data-act="sheet-close">Hủy</button>`);
})();
