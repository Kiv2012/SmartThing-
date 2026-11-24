/* Hồ sơ cá nhân, tùy chọn hiển thị và phiên tài khoản demo. */
(function(){
const D = window.LCS_DATA;
const KEY = 'lcs-state-v1';
const DEFAULT = {
  contentGroup:null, displayMode:null, readAloud:false,
  name:'', ward:D.MY_WARD, cls:null, relatives:[], history:[],
  myReports:[], quiz:null, a2hs:0, a2hsDone:false, ask:null,
  dodau:D.DODAU, buoi:D.BUOI, reportSeq:121
};

let saved = {};
try { saved = JSON.parse(localStorage.getItem(KEY)||'{}') || {}; } catch {}
const S = Object.assign({}, DEFAULT, saved);
if(!Object.hasOwn(saved,'contentGroup') && ['ob','hs'].includes(saved.role)) S.contentGroup = saved.role;
if(!Object.hasOwn(saved,'displayMode') && typeof saved.deNhin==='boolean' && saved.role==='ob' && !saved.deNhin){
  S.displayMode = 'standard';
}
delete S.role;
delete S.deNhin;

let account = null;
let work = null;
try {
  const previousWork = sessionStorage.getItem('lcs-demo-work');
  const stored = sessionStorage.getItem('lcs-demo-account') || previousWork;
  if(['user','tnv','dp'].includes(stored)) account = stored;
  if(previousWork===account && ['tnv','dp'].includes(account)) work = account;
} catch {}

const save = () => { try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch{} };
const accountRole = () => account;
const workRole = () => work;
const hasAccount = () => account !== null;

function signIn(role){
  if(!['user','tnv','dp'].includes(role)) return;
  if(work && work!==role) leaveWork();
  account = role;
  try { sessionStorage.setItem('lcs-demo-account',role); } catch {}
}
function enterWork(){
  if(!['tnv','dp'].includes(account)) return false;
  work = account;
  try { sessionStorage.setItem('lcs-demo-work',work); } catch {}
  return true;
}
function leaveWork(){
  work = null;
  try { sessionStorage.removeItem('lcs-demo-work'); } catch {}
}
function signOut(){
  leaveWork();
  account = null;
  try { sessionStorage.removeItem('lcs-demo-account'); } catch {}
}
const easyView = () => S.displayMode ? S.displayMode==='easy' : S.contentGroup==='ob';
const residentHome = () => easyView() ? '#/ong-ba' : '#/hoc-sinh';
const roleHome = () => work==='tnv' ? '#/cong-tac' : work==='dp' ? '#/dieu-phoi' : residentHome();
const xung = () => S.contentGroup==='ob' ? 'bà' : 'bạn';
const priorityRelative = () => S.relatives.find(r=>r.uu) || S.relatives[0];

window.App = Object.assign(window.App || {}, {
  S, D, save, roleHome, residentHome, easyView, xung, priorityRelative,
  workRole, accountRole, hasAccount, signIn, signOut, enterWork, leaveWork,
  tmp:{}, q:{}, path:'', after:null
});
})();
