/* Người dân tham gia buổi tuyên truyền (quét QR / nhập mã) – CN-13 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const buildQuiz = A.quiz.build, quizScreen = A.quiz.screen, resultBody = A.quiz.result;
/* ===== Người dân tại buổi tuyên truyền (quét QR) ===== */
A.route(/^\/buoi$/, (m, q) => A.screen({mh:'MH-22', title:'Tham gia buổi tuyên truyền', noTab:true, backTo:A.roleHome(), body:`
  <p class="ink2">Nhập mã buổi có trên máy này. Chưa hỗ trợ tham gia buổi từ thiết bị khác.</p>
  <form class="stack" data-form="buoi-code"><label class="label" for="code">Mã buổi</label><input id="code" class="input mono" inputmode="numeric" maxlength="6" placeholder="Ví dụ: 482917">
  ${q.loi?'<p class="hint" role="alert">Không tìm thấy buổi với mã này.</p>':''}<button class="btn btn-primary">Vào buổi</button></form>`}));
document.addEventListener('submit', e => { if(e.target.dataset.form==='buoi-code'){ e.preventDefault(); const c = document.getElementById('code').value.trim(); A.go(S.buoi.some(b=>b.ma===c) ? '#/buoi/'+c : '#/buoi?loi=1'); } });
A.route(/^\/buoi\/(\d{6})$/, (m) => {
  const b = S.buoi.find(x=>x.ma===m[0]); if(!b) return A.screen({title:'Buổi tuyên truyền', noTab:true, body:'<div class="empty"><b>Không tìm thấy buổi</b></div>'});
  const nh = A.tmp.sessionGroup?.code===b.ma ? A.tmp.sessionGroup.group : null;
  return A.screen({mh:'MH-22', title:'Buổi tuyên truyền', noTab:true, back:false, body:`
    <div class="card"><span class="label">Đội thanh niên tình nguyện ${esc(S.ward)}</span><b style="font-size:var(--fs-card)">${esc(b.ten)}</b><p class="small ink2">${esc(b.dd)} · ${esc(b.tg)}</p>${b.mo?'':'<p class="tag warn mt8">Buổi đã kết thúc – vẫn học được, kết quả không tính vào buổi</p>'}</div>
    <div class="stack"><span class="label">Bạn thuộc nhóm nào?</span>
      ${[['ob','Người cao tuổi'],['hs','Học sinh'],['dan','Người dân']].map(([k,l])=>`<button class="pick ${nh===k?'on':''}" data-act="nhom" data-v="${k}" data-ma="${b.ma}" aria-pressed="${nh===k}"><b>${l}</b></button>`).join('')}</div>
    <p class="small ink2">Không cần đăng ký. Học 1 phút, làm 5 câu, xem điểm ngay.</p>
    <a class="btn btn-primary ${nh?'':'disabled'}" href="#/hoc/${b.chude[0]}?buoi=${b.ma}" data-act="buoi-go" data-ma="${b.ma}">Bắt đầu bài học</a>`});
});
A.actions.nhom = el => { A.tmp.sessionGroup = {code:el.dataset.ma, group:el.dataset.v}; A.render(); };
A.actions['buoi-go'] = el => { A.go('#/hoc/'+S.buoi.find(b=>b.ma===el.dataset.ma).chude[0]+'?buoi='+el.dataset.ma); };
A.route(/^\/buoi\/(\d{6})\/kiem-tra$/, (m, q) => {
  const nhom = A.tmp.sessionGroup?.code===m[0] ? A.tmp.sessionGroup.group : 'dan';
  if(!A.tmp.quiz || A.tmp.quiz.buoi!==m[0] || A.tmp.quiz.nhom!==nhom || q.moi){
    A.tmp.quiz = Object.assign(buildQuiz('buoi'), {buoi:m[0], nhom});
  }
  return quizScreen(q, m[0]);
});
A.route(/^\/buoi\/(\d{6})\/ket-qua$/, (m, q) => {
  const score = +(q.d||0);
  if(q.luu && A.hasAccount() && A.tmp.recentQuiz?.session===m[0]) A.saveQuiz(A.tmp.recentQuiz);
  const recent = A.tmp.recentQuiz || S.quiz;
  const next = encodeURIComponent(`#/buoi/${m[0]}/ket-qua?d=${score}&luu=1`);
  return A.screen({mh:'MH-15', title:'Kết quả của bạn', noTab:true, back:false, body: resultBody(score, recent?.weak || [], `
    <p class="hint">Kết quả đã được ghi nhận vào buổi tuyên truyền (không lưu tên).</p>
    ${!A.hasAccount() && A.tmp.recentQuiz?.session===m[0] ? `<a class="btn btn-ghost" href="#/dang-nhap?next=${next}">Đăng nhập để lưu điểm</a>` : ''}
    <a class="btn btn-primary" href="#/kiem-tra">Kiểm tra số lạ</a>
    <button class="btn btn-ghost" data-act="a2hs-show">Lưu Lá Chắn Số vào màn hình chính</button>`)});
});
})();
