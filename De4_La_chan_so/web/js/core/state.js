/* Trạng thái ứng dụng (lưu trên máy), vai trò, xưng hô */
(function(){
const D = window.LCS_DATA;
const KEY = 'lcs-state-v1';
const DEFAULT = {role:null, name:'', ward:D.MY_WARD, cls:'12A1', relatives:[], deNhin:false, history:[],
  myReports:[], quiz:null, a2hs:0, a2hsDone:false, ask:null, dodau:D.DODAU, buoi:D.BUOI, reportSeq:121};
let S;
try{ S = Object.assign({}, DEFAULT, JSON.parse(localStorage.getItem(KEY)||'{}')); }catch(e){ S = Object.assign({}, DEFAULT); }
const save = () => { try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} };
const roleHome = () => S.role==='ob' ? '#/ong-ba' : S.role==='tnv' ? '#/doi' : S.role==='hs' ? '#/hoc-sinh' : '#/bat-dau';
const xung = () => S.role==='ob' ? 'bà' : 'bạn';
function seedRole(r){
  S.role = r; S.deNhin = r==='ob';
  if(r!=='tnv' && !S.relatives.length) S.relatives = JSON.parse(JSON.stringify(D.RELATIVES_DEFAULT));
  S.name = {ob:'Bà Sáu', hs:'Minh Anh', tnv:'Đoàn viên Quốc Bảo'}[r];
  S.cls = r==='tnv' ? 'KP5' : '12A1';
  save();
}
const priorityRelative = () => S.relatives.find(r=>r.uu) || S.relatives[0];
window.App = Object.assign(window.App || {}, {S, D, save, roleHome, xung, seedRole, priorityRelative, tmp:{role:null}, q:{}, path:'', after:null});
})();
