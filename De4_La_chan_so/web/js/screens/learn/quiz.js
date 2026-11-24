/* MH-14 Bài kiểm tra nhận diện, MH-15 Kết quả và chứng nhận – Bắt buộc 5 */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
const buildQuiz = A.quiz.build, quizScreen = A.quiz.screen, resultBody = A.quiz.result;
/* ===== MH-14 Bài kiểm tra ===== */
A.route(/^\/thu-thach$/, (m, q) => {
  if(!q.lam){
    const ob = S.role==='ob';
    return A.screen({mh:'MH-14', title:'Thử thách', tab:'#/thu-thach', back:false, body:`
      <div class="card stack"><h2 style="font-size:var(--fs-title);font-family:var(--display)">Bài kiểm tra nhận diện lừa đảo</h2>
        <p>${ob?'5 câu · không tính giờ · có đọc to':'10 câu · khoảng 3 phút'}</p>
        <ol class="ol small ink2"><li>Tin này thật hay lừa đảo?</li><li>Chạm vào câu đáng ngờ</li><li>Bạn sẽ làm gì?</li></ol>
        <p class="small ink2">Từ 80 điểm nhận Chứng nhận Lá Chắn Số. Điểm được cộng cho chi đoàn, không công khai điểm cá nhân.</p></div>
      ${S.quiz?`<p class="ink2">Điểm cao nhất của ${A.xung()}: <b>${S.quiz.best}/100</b></p>`:''}
      <a class="btn btn-primary" href="#/thu-thach?lam=1" data-act="quiz-start">Bắt đầu</a>
      ${S.role!=='ob'?`<a class="btn btn-ghost" href="#/thi-dua">Xem thi đua chi đoàn</a>`:''}`});
  }
  if(!A.tmp.quiz) A.tmp.quiz = buildQuiz(S.role==='ob'?'ob':'hs');
  return quizScreen(q, null);
});
A.actions['quiz-start'] = () => { A.tmp.quiz = buildQuiz(S.role==='ob'?'ob':'hs'); A.go('#/thu-thach?lam=1'); };
/* ===== MH-15 Kết quả và chứng nhận ===== */
A.route(/^\/thu-thach\/ket-qua$/, (m, q) => {
  const score = +(q.d ?? (S.quiz||{}).last ?? 0); const weak = q.d!=null && S.quiz ? S.quiz.weak||[] : [];
  if(score>=80 && S.deNhin) A.after = () => A.speak(`Chúc mừng, ${A.xung()} được ${score} điểm và nhận Chứng nhận Lá Chắn Số.`);
  return A.screen({mh:'MH-15', title:'Kết quả bài kiểm tra', tab:'#/thu-thach', backTo:'#/thu-thach', body: resultBody(score, weak, `
    <div class="stack">${score>=80?'<button class="btn btn-primary" data-act="share">Chia sẻ chứng nhận</button>':''}
      <a class="btn ${score>=80?'btn-ghost':'btn-primary'}" href="#/thu-thach?lam=1" data-act="quiz-start">Làm lại</a>
      ${S.role!=='ob'?'<a class="btn btn-ghost" href="#/thi-dua">Xem thi đua chi đoàn</a>':''}</div>`)});
});
A.actions.share = async () => {
  const t = `Mình vừa đạt Chứng nhận Lá Chắn Số – nhận diện lừa đảo trực tuyến. Thử ngay!`;
  if(navigator.share){ try{ await navigator.share({title:'Lá Chắn Số', text:t}); }catch(e){} } else { try{ await navigator.clipboard.writeText(t); A.toast('Đã chép nội dung chia sẻ'); }catch(e){} }
};
})();
