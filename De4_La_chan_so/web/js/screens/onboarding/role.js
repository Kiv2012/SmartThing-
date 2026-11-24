/* MH-01 — Chọn nội dung tùy ý. */
(function(){
const A = window.App, {S} = A;
const groups = [
  ['ob','Người cao tuổi','Ví dụ về cuộc gọi lạ, giả danh người thân và chuyển tiền.'],
  ['hs','Học sinh','Ví dụ về việc làm online, tin nhắn lạ và tài khoản giả.']
];

A.route(/^\/bat-dau$/, (match, query) => {
  const back = query.tu==='toi' ? '#/toi' : A.residentHome();
  return A.screen({mh:'MH-01', title:'Nội dung phù hợp', noTab:true, backTo:back, body:`
    <section class="stack" aria-labelledby="group-title">
      <h2 class="dashboard-title" id="group-title">Bạn muốn xem nội dung dành cho ai?</h2>
      <p class="note">Bạn có thể đổi cỡ chữ trong mục Tôi.</p>
      ${groups.map(([group,label,description])=>`
        <button class="role-choice" type="button" data-act="save-content" data-group="${group}" data-back="${query.tu==='toi'?'toi':''}" aria-pressed="${S.contentGroup===group}">
          <b>${label}</b><span>${description}</span>
        </button>`).join('')}
      ${S.contentGroup ? '<button class="link-btn" type="button" data-act="save-content" data-group="" data-back="'+(query.tu==='toi'?'toi':'')+'">Dùng nội dung chung</button>' : ''}
      <a class="btn btn-ghost" href="${back}">Để sau</a>
    </section>`});
});
A.actions['save-content'] = button => {
  S.contentGroup = button.dataset.group || null;
  A.save();
  A.go(button.dataset.back==='toi' ? '#/toi' : A.residentHome());
};
})();
