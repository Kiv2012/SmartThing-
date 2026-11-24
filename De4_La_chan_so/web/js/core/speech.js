/* Đọc to và nhận giọng nói tiếng Việt (Web Speech API) */
(function(){
const {toast, xung} = window.App;
const canSpeak = 'speechSynthesis' in window;
const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
function speak(text){
  if(!canSpeak) return toast('Máy này chưa hỗ trợ đọc to');
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'vi-VN'; u.rate = 0.9;
  const v = speechSynthesis.getVoices().find(v => /vi/i.test(v.lang));
  if(v) u.voice = v;
  speechSynthesis.speak(u);
}
function listen(onText, onEnd){
  if(!Rec) return null;
  const r = new Rec(); r.lang='vi-VN'; r.interimResults=false; r.maxAlternatives=1;
  r.onresult = e => onText(e.results[0][0].transcript);
  r.onend = () => onEnd && onEnd();
  r.onerror = () => { toast('Chưa nghe rõ, '+xung()+' thử lại nhé'); onEnd && onEnd(); };
  try{ r.start(); }catch(e){ return null; }
  return r;
}
Object.assign(window.App, {canSpeak, Rec, speak, listen});
})();
