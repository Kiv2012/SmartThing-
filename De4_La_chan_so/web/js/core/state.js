/* Trạng thái ứng dụng (lưu trên máy), vai trò, xưng hô */
(function(){
const D = window.LCS_DATA;
const KEY = 'lcs-state-v1';
const DEFAULT = {role:null, name:'', ward:D.MY_WARD, cls:'12A1', relatives:[], deNhin:false, history:[],
  myReports:[], quiz:null, a2hs:0, a2hsDone:false, ask:null, dodau:D.DODAU, buoi:D.BUOI, reportSeq:121};
let S;
try{ S = Object.assign({}, DEFAULT, JSON.parse(localStorage.getItem(KEY)||'{}')); }catch(e){ S = Object.assign({}, DEFAULT); }
if(S.role==='tnv') S.role = null;
const save = () => { try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} };
let work = null;
try {
  const stored = sessionStorage.getItem('lcs-demo-work');
  if(stored==='tnv' || stored==='dp') work = stored;
} catch {}
const workRole = () => work;
function setWork(role){
  work = role;
  try {
    if(role) sessionStorage.setItem('lcs-demo-work', role);
    else sessionStorage.removeItem('lcs-demo-work');
  } catch {}
}
const leaveWork = () => setWork(null);
const residentHome = () => S.role==='ob' ? '#/ong-ba' : S.role==='hs' ? '#/hoc-sinh' : '#/bat-dau';
const roleHome = () => work==='tnv' ? '#/cong-tac' : work==='dp' ? '#/dieu-phoi' : residentHome();
const xung = () => S.role==='ob' ? 'bà' : 'bạn';
function seedRole(r){
  S.role = r; S.deNhin = r==='ob';
  if(r!=='tnv' && !S.relatives.length) S.relatives = JSON.parse(JSON.stringify(D.RELATIVES_DEFAULT));
  S.name = {ob:'Bà Sáu', hs:'Minh Anh', tnv:'Đoàn viên Quốc Bảo'}[r];
  S.cls = r==='tnv' ? 'KP5' : '12A1';
  save();
}
const priorityRelative = () => S.relatives.find(r=>r.uu) || S.relatives[0];
window.App = Object.assign(window.App || {}, {S, D, save, roleHome, residentHome, workRole, setWork, leaveWork, xung, seedRole, priorityRelative, tmp:{role:null}, q:{}, path:'', after:null});
})();
