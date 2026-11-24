/* MH-28–30 — công việc và duyệt kết quả trên cùng dữ liệu demo. */
(function(){
const A = window.App, {S, esc} = A;
const stages = {
  assigned:'Chờ nhận', accepted:'Đã nhận', active:'Đang thực hiện',
  review:'Chờ duyệt', changes:'Cần bổ sung', done:'Hoàn thành', declined:'Đã từ chối'
};
const seed = [
  {id:'kp5', title:'Nhận diện đường link giả mạo', place:'Nhà văn hóa Khu phố 5', time:'19:00 · 26/11/2026', lead:'Quốc Bảo', topic:'T02', session:'915364', status:'assigned', log:[]},
  {id:'thpt', title:'Phòng tránh bẫy việc nhẹ lương cao', place:'THPT Ngô Quyền', time:'15:30 · 23/11/2026', lead:'Quốc Bảo', topic:'T03', session:'482917', status:'review', log:[{text:'Đã tuyên truyền cho 34 học sinh và hướng dẫn thực hành nhận diện tin nhắn giả mạo.', label:'Đã nộp kết quả'}]}
];
const see = status => `<span class="work-status ${status==='done'?'is-done':status==='review'?'is-review':''}">${stages[status]}</span>`;
const tasks = () => S.activity || (S.activity = structuredClone(seed));
A.workTasks = tasks;
A.addDemoAssignment = session => {
  tasks().unshift({
    id:session.ma, title:session.ten, place:session.dd, time:session.tg,
    lead:'Quốc Bảo', topic:session.chude[0], session:session.ma, status:'assigned', log:[]
  });
};
const detail = id => '#/cong-tac/nhiem-vu/'+id;
const cards = list => list.length ? `<div class="work-list">${list.map(task => `
  <a class="task-row" href="${detail(task.id)}"><div class="task-row-head"><b>${esc(task.title)}</b>${see(task.status)}</div>
    <span>${esc(task.time)} · ${esc(task.place)}</span></a>`).join('')}</div>` :
  '<div class="empty"><b>Chưa có nhiệm vụ</b>Nhiệm vụ mới sẽ xuất hiện ở đây khi được phân công.</div>';

A.route(/^\/cong-tac$/, (match, query) => {
  const all = query.state==='trong' ? [] : tasks();
  const next = all.find(t => ['assigned','accepted','active','changes'].includes(t.status));
  return A.screen({mh:'MH-28', title:'Việc của tôi', tab:'#/cong-tac', back:false, body:`
    ${next ? `<section class="work-lead"><p>Buổi tiếp theo</p><h2>${esc(next.title)}</h2>
      <p>${esc(next.time)} · ${esc(next.place)}</p>
      <a class="btn btn-star" href="${detail(next.id)}">Xem nhiệm vụ và tài liệu</a></section>` : ''}
    <section class="stack"><h2 class="dashboard-title">Nhiệm vụ được giao</h2>${cards(all)}</section>
    <button class="btn btn-ghost" data-act="exit-work">Về trang cá nhân</button>`
  });
});

A.route(/^\/dieu-phoi$/, (match, query) => {
  const tab = { 'ke-hoach':'Kế hoạch', 'thanh-vien':'Thành viên', 'bao-cao':'Báo cáo' }[query.muc];
  const list = tasks();
  const count = status => list.filter(t => t.status===status).length;
  const body = query.muc==='ke-hoach' ? `
    <div class="section-heading-row"><h2>Các buổi đã phân công</h2><a class="link-btn" href="#/doi/buoi?moi=1">Tạo buổi tuyên truyền</a></div>${cards(list)}`
    : query.muc==='thanh-vien' ? `<section class="card"><h2>Chi đoàn Khu phố 5</h2><p>Quốc Bảo · Tình nguyện viên</p><p class="note">Dữ liệu minh họa. Chưa hỗ trợ thay đổi thành viên.</p></section>`
    : query.muc==='bao-cao' ? `<section class="stack"><h2 class="dashboard-title">Kết quả đã duyệt</h2>${cards(list.filter(t=>t.status==='done'))}<a class="btn btn-ghost" href="#/doi">Xem tình hình địa bàn</a></section>` : `
    <section class="work-lead"><p>${esc(S.ward)}</p><h2>Quản lý hoạt động</h2>
      <p>${count('review')} kết quả đang chờ duyệt · ${count('assigned')} nhiệm vụ chờ nhận</p>
      <a class="btn btn-star" href="#/dieu-phoi?muc=ke-hoach">Mở kế hoạch</a></section>
    <section class="stack"><h2 class="dashboard-title">Kết quả chờ duyệt</h2>${cards(list.filter(t=>t.status==='review'))}</section>
    <a class="btn btn-ghost" href="#/doi">Xem tình hình địa bàn</a>`;
  return A.screen({mh:'MH-29', title:tab || 'Điều phối hoạt động', tab:tab ? '#/dieu-phoi?muc='+query.muc : '#/dieu-phoi', back:!!tab, backTo:'#/dieu-phoi', body:body+'<button class="btn btn-ghost" data-act="exit-work">Về trang cá nhân</button>'});
});

const actionsByRole = {
  tnv:{assigned:['accepted','Nhận nhiệm vụ', 'Đã nhận nhiệm vụ'], accepted:['active','Bắt đầu buổi', 'Đã bắt đầu buổi'], active:['review','Nộp kết quả', 'Đã nộp kết quả'], changes:['review','Nộp lại kết quả', 'Đã nộp lại kết quả']},
  dp:{review:['done','Duyệt kết quả', 'Đã duyệt kết quả']}
};
A.route(/^\/cong-tac\/nhiem-vu\/(kp5|thpt|[0-9]{6})$/, ([id]) => {
  const task = tasks().find(item=>item.id===id);
  if(!task) return A.screen({mh:'MH-30', title:'Chi tiết nhiệm vụ', backTo:A.roleHome(), body:'<p class="empty">Không tìm thấy nhiệm vụ này.</p>'});
  const role = A.workRole();
  const action = actionsByRole[role][task.status];
  const mustExplain = role==='tnv' && ['active','changes'].includes(task.status);
  const alternative = role==='dp' && task.status==='review' ? ['changes','Yêu cầu bổ sung'] :
    role==='tnv' && task.status==='assigned' ? ['declined','Từ chối nhiệm vụ'] : null;
  return A.screen({mh:'MH-30', title:'Chi tiết nhiệm vụ', tab:A.roleHome(), backTo:A.roleHome(), body:`
    <section class="work-lead">${see(task.status)}<h2>${esc(task.title)}</h2><p>${esc(task.time)} · ${esc(task.place)}</p></section>
    <section class="card stack"><h2>Thông tin buổi</h2><p>Phụ trách: ${esc(task.lead)}</p>
      <div class="work-links"><a class="link-btn" href="#/hoc/${task.topic}?dung=1">Tài liệu tình huống</a>
        ${!['assigned','declined'].includes(task.status) ? `<a class="link-btn" href="#/doi/buoi/${task.session}">Mã buổi và số liệu tạm tính</a>` : ''}</div></section>
    ${task.log.length ? `<section class="card stack"><h2>Lịch sử thực hiện</h2><ul class="list">${task.log.map(item=>`<li><b>${esc(item.label)}</b>${item.text ? `<p>${esc(item.text)}</p>` : ''}</li>`).join('')}</ul></section>` : ''}
    ${action ? `<form class="card stack" data-form="work-transition" data-task="${task.id}">
      ${(mustExplain || alternative) ? `<label class="field"><span class="label">${mustExplain ? 'Tóm tắt kết quả' : '' + (role==='dp' ? 'Nhận xét / Nội dung cần bổ sung' : 'Lý do từ chối (nếu từ chối)') + ''}</span>
        <textarea class="textarea" name="summary" maxlength="400"${mustExplain?' required':''}></textarea></label>` : ''}
      <div id="work-feedback" role="alert"></div>
      <button class="btn btn-primary" name="transition" value="${action[0]}">${action[1]}</button>
      ${alternative ? `<button class="btn btn-ghost" name="transition" value="${alternative[0]}">${alternative[1]}</button>` : ''}
    </form>` : ''}
  `});
});

document.addEventListener('submit', event => {
  const form = event.target;
  if(form.dataset.form!=='work-transition') return;
  event.preventDefault();
  const task = tasks().find(item=>item.id===form.dataset.task);
  const role = A.workRole();
  const action = actionsByRole[role]?.[task.status];
  if(!action) return;
  const next = event.submitter?.value || action[0];
  const alternate = (task.status==='review' && role==='dp' && next==='changes') ||
    (task.status==='assigned' && role==='tnv' && next==='declined');
  if(next!==action[0] && !alternate) return;
  const field = form.elements.namedItem('summary');
  const text = field?.value.trim() || '';
  const needsText = alternate || (next==='review' && role==='tnv');
  if(needsText && !text){
    const error = document.getElementById('work-feedback');
    error.className = 'err';
    error.textContent = 'Hãy nhập nội dung trước khi tiếp tục.';
    field.setAttribute('aria-describedby',error.id);
    field.focus();
    return;
  }
  const label = alternate ? (next==='changes'?'Yêu cầu bổ sung':'Đã từ chối nhiệm vụ') : action[2];
  task.status = next;
  task.log.push({label, text});
  A.save();
  A.render();
  A.toast(label);
});
})();
