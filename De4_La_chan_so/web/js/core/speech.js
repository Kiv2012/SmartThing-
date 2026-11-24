/* Đọc và nhận giọng nói tiếng Việt. */
(function(){
const {toast, xung} = window.App;
const canSpeak = 'speechSynthesis' in window;
const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
let current = null;

function updateButton(){
  const button = document.querySelector('[data-act="speak"]');
  if(!button) return;
  button.setAttribute('aria-label', current ? 'Dừng đọc' : 'Nghe đọc');
  button.querySelector('.listen-label').textContent = current ? 'Dừng' : 'Nghe';
}
function stopSpeech(){
  current = null;
  if(canSpeak) window.speechSynthesis.cancel();
  updateButton();
}
function speak(text){
  if(!canSpeak) return toast('Máy này chưa hỗ trợ đọc to');
  stopSpeech();
  const engine = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.9;
  const voice = engine.getVoices().find(v=>/vi/i.test(v.lang));
  if(voice) utterance.voice = voice;
  const finish = () => {
    if(current!==utterance) return;
    current = null;
    updateButton();
  };
  utterance.onend = finish;
  utterance.onerror = finish;
  current = utterance;
  updateButton();
  engine.speak(utterance);
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
Object.assign(window.App, {Rec, speak, listen, stopSpeech, isSpeaking:()=>current!==null});
})();
