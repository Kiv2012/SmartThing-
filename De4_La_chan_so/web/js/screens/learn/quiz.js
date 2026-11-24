/* MH-14 Bài kiểm tra nhận diện, MH-15 Kết quả và chứng nhận – Bắt buộc 5 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const buildQuiz = A.quiz.build, quizScreen = A.quiz.screen, resultBody = A.quiz.result;
/* ===== MH-14 Bài kiểm tra ===== */
A.route(/^\/thu-thach$/, (m, q) => {
  if(!q.lam){
    const ob = A.easyView();
    return A.screen({mh:'MH-14', title:'Thử thách', tab:'#/thu-thach', back:false, body:`
      <div class="card stack"><h2 style="font-size:var(--fs-title);font-family:var(--display)">Bài kiểm tra nhận diện lừa đảo</h2>
        <p>${ob?'5 câu · không tính giờ · có đọc to':'10 câu · khoảng 3 phút'}</p>
        <ol class="ol small ink2"><li>Tin này thật hay lừa đảo?</li><li>Chạm vào câu đáng ngờ</li><li>Bạn sẽ làm gì?</li></ol>
        <p class="small ink2">Từ 80 điểm nhận Chứng nhận Lá Chắn Số. Điểm được cộng cho chi đoàn, không công khai điểm cá nhân.</p></div>
      ${S.quiz?`<p class="ink2">Điểm cao nhất của ${A.xung()}: <b>${S.quiz.best}/100</b></p>`:''}
      <a class="btn btn-primary" href="#/thu-thach?lam=1" data-act="quiz-start">Bắt đầu</a>
      ${!A.easyView()?`<a class="btn btn-ghost" href="#/thi-dua">Xem thi đua chi đoàn</a>`:''}`});
  }
  const kind = A.easyView() ? 'ob' : 'hs';
  if(!A.tmp.quiz || A.tmp.quiz.kind!==kind) A.tmp.quiz = buildQuiz(kind);
  return quizScreen(q, null);
});
A.actions['quiz-start'] = () => { A.tmp.quiz = buildQuiz(A.easyView()?'ob':'hs'); A.go('#/thu-thach?lam=1'); };
/* ===== MH-15 Kết quả và chứng nhận ===== */
A.route(/^\/thu-thach\/ket-qua$/, (m, q) => {
  const localQuiz = A.tmp.recentQuiz?.session===null ? A.tmp.recentQuiz : null;
  const recent = localQuiz || S.quiz;
  const score = +(q.d ?? recent?.last ?? 0);
  const weak = recent?.weak || [];
  if(q.luu && A.hasAccount() && localQuiz) A.saveQuiz(localQuiz);
  if(score>=80 && S.readAloud) A.after = () => A.speak(`Chúc mừng, ${A.xung()} được ${score} điểm và nhận Chứng nhận Lá Chắn Số.`);
  return A.screen({mh:'MH-15', title:'Kết quả bài kiểm tra', tab:'#/thu-thach', backTo:'#/thu-thach', body: resultBody(score, weak, `
    <div class="stack">${score>=80 && A.hasAccount()?'<button class="btn btn-primary" data-act="share">Chia sẻ chứng nhận</button>':''}
      ${!A.hasAccount() && localQuiz ? `<a class="btn btn-primary" href="#/dang-nhap?next=${encodeURIComponent('#/thu-thach/ket-qua?luu=1')}">Đăng nhập để lưu điểm</a>` : ''}
      <a class="btn ${score>=80?'btn-ghost':'btn-primary'}" href="#/thu-thach?lam=1" data-act="quiz-start">Làm lại</a>
      ${!A.easyView()?'<a class="btn btn-ghost" href="#/thi-dua">Xem thi đua chi đoàn</a>':''}</div>`)});
});
A.actions.share = async () => {
  const t = `Mình vừa đạt Chứng nhận Lá Chắn Số – nhận diện lừa đảo trực tuyến. Thử ngay!`;
  if(navigator.share){ try{ await navigator.share({title:'Lá Chắn Số', text:t}); }catch(e){} } else { try{ await navigator.clipboard.writeText(t); A.toast('Đã chép nội dung chia sẻ'); }catch(e){} }
};
})();
