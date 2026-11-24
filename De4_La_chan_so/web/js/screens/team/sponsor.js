/* MH-21 Đoàn viên đỡ đầu số + màn cụ đồng ý liên kết – Sáng tạo */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const pseudoQR = A.pseudoQR;
/* ===== MH-21 Hộ đỡ đầu ===== */
A.route(/^\/doi\/do-dau$/, (m, q) => {
  const list = q.state==='trong' ? [] : S.dodau;
  return A.screen({mh:'MH-21', title:'Hộ đỡ đầu', tab:'#/doi/do-dau', back:false, body:`
    <p class="ink2">Bạn là người thân dự phòng cho các cụ trong danh sách. Cụ sống một mình thì bạn là người được báo đầu tiên.</p>
    ${list.length?list.map((h,i)=>{ const due = h.lan_cuoi>=14; return `<div class="card ward stack ${h.canh_bao?'alert':due?'due':''}">
      <div class="kv"><b style="font-size:var(--fs-card)">${esc(h.ten)}</b><span class="small ink2">${esc(h.kp)}</span></div>
      <div class="row wrap">${h.mot_minh?'<span class="tag">Sống một mình</span>':''}<span class="tag ${h.cai_app?'ok':'warn'}">${h.cai_app?'Đã cài app':'Chưa liên kết'}</span><span class="tag">${esc(h.vai_tro)}</span></div>
      ${h.canh_bao?`<p class="err">Cụ vừa bấm Hỏi người thân: cuộc gọi giả danh Công an (NGUY HIỂM) · 2 phút trước</p>`:''}
      ${due?`<p class="hint">Đã ${h.lan_cuoi} ngày chưa liên lạc – đến hạn thăm hỏi</p>`:`<p class="small ink2">Liên lạc gần nhất: ${h.lan_cuoi} ngày trước · cụ đã hỏi ${h.hoi} lần trong tháng</p>`}
      <div class="btn-row"><a class="btn ${h.canh_bao?'btn-call':'btn-ghost'}" href="tel:0912000009">Gọi cụ</a><button class="btn btn-ghost" data-act="tham" data-i="${i}">${h.canh_bao?'Đã xử lý':'Đã thăm, đã gọi'}</button></div></div>`; }).join('')
    :`<div class="empty"><b>Bạn chưa đỡ đầu hộ nào</b>Mỗi đoàn viên có thể giúp tối đa 5 hộ cao tuổi trong xã, phường.</div>`}
    ${list.length<5?`<button class="btn btn-primary" data-act="add-ho">Thêm hộ đỡ đầu</button>`:'<p class="note center">Đã đủ 5 hộ (tối đa cho mỗi đoàn viên)</p>'}`});
});
A.actions.tham = el => { const h = S.dodau[+el.dataset.i]; h.lan_cuoi = 0; h.canh_bao = false; A.save(); A.toast('Đã ghi nhận liên lạc với '+h.ten); A.render(); };
A.actions['add-ho'] = () => {
  const code = String(100000 + Math.floor(Math.random()*899999));
  A.sheet(`<h2>Mã liên kết đỡ đầu</h2>
    <p class="small ink2">Đây là ví dụ về bước đồng ý nhận hỗ trợ. Chưa tạo liên kết giữa hai tài khoản.</p>
    <div class="qr-card" style="border:0;padding:0">${pseudoQR(code)}<span class="code6">${code}</span><span class="note">QR minh họa, chưa quét được. Liên kết hỗ trợ chưa khả dụng.</span></div>
    <a class="btn btn-primary" href="#/lien-ket/${code}" data-act="sheet-close" data-go="#/lien-ket/${code}">Xem ví dụ lời đề nghị hỗ trợ</a>
    <button class="btn btn-ghost" data-act="sheet-close">Đóng</button>`);
};

/* Màn trên máy của cụ: đồng ý liên kết (CN-12) */
A.route(/^\/lien-ket\/(\d{6})$/, (m, q) => {
  A.tmp.dv = A.tmp.dv || 'Đoàn viên Quốc Bảo';
  return A.screen({mh:'MH-21', title:'Lời đề nghị hỗ trợ', noTab:true, back:false, body:`
    <div class="card stack"><p style="font-size:var(--fs-card)"><b>Cháu ${esc(A.tmp.dv.replace('Đoàn viên ',''))}</b>, đoàn viên Chi đoàn Khu phố 5, xin được hỗ trợ khi có cuộc gọi lạ.</p>
      <ol class="ol"><li>Khi bấm "Hỏi người thân", cháu sẽ nhận được cảnh báo.</li><li>Cháu sẽ ghé thăm hoặc gọi hỏi thăm định kỳ.</li><li>Có thể hủy bất cứ lúc nào trong mục Tôi.</li></ol></div>
    <button class="btn btn-primary" data-act="lk-yes">Đồng ý để cháu hỗ trợ</button>
    <button class="btn btn-ghost" data-act="lk-no">Không đồng ý</button>`});
});
A.actions['lk-yes'] = () => {
  const ten = A.tmp.dv.replace('Đoàn viên ','');
  const linked = S.relatives.find(relative=>relative.id==='dv');
  if(!linked && S.relatives.length>=3){
    A.toast('Danh sách đã đủ 3 người. Hãy bỏ một người trong mục Tôi trước khi liên kết.');
    return;
  }
  if(linked) linked.ten = ten;
  else S.relatives.push({id:'dv', ten, sdt:'0912 000 009', qh:'Đoàn viên đỡ đầu', kenh:'Zalo', uu:!S.relatives.length});
  if(!S.contentGroup) S.contentGroup = 'ob';
  A.save();
  A.toast('Đã liên kết với cháu '+ten);
  A.go(A.residentHome());
};
A.actions['lk-no'] = () => { A.toast('Đã từ chối, không liên kết'); A.go(A.roleHome()); };
})();
