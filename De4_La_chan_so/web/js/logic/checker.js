/* Kiểm tra nhanh số điện thoại / đường link / số tài khoản (CN-02, QT-04…QT-10) */
(function(){
const {D, scen, fmtPhone, fmtStk} = window.App;
function detect(raw){
  const v = String(raw||'').trim();
  if(!v) return {kind:'empty'};
  const digits = v.replace(/[\s.\-()]/g,'');
  if(/^\+?\d+$/.test(digits)){
    let d = digits.replace(/^\+?84(?=\d{9}$)/,'0');
    if(/^0\d{9}$/.test(d)) return {kind:'phone', value:d, both:true};
    if(D.LIST.phone[d]) return {kind:'phone', value:d};
    if(/^0\d{7,8}$/.test(d)) return {kind:'badphone', value:d};
    if(/^\d{6,19}$/.test(d)) return {kind:'stk', value:d};
    return {kind:'unknown'};
  }
  if(v.length>60 && /\s/.test(v)) return {kind:'text'};
  if(/^(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(v)) return {kind:'link', value:v};
  return {kind:'unknown'};
}
const KIND_LABEL = {phone:'Số điện thoại', stk:'Số tài khoản', link:'Đường link'};
function lev(a,b){ const m=[...Array(a.length+1)].map((_,i)=>[i]); for(let j=1;j<=b.length;j++)m[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return m[a.length][b.length]; }

function checkValue(raw){
  const det = detect(raw);
  if(det.kind==='phone' || det.kind==='stk') return checkNumber(det);
  if(det.kind==='link') return checkLink(det.value);
  return null;
}
function fromReports(rec, kindLabel){
  const r = [];
  if(rec.verified) r.push(`Đã được đội tình nguyện và Công an xác minh là lừa đảo (${rec.reports} người đã báo).`);
  else r.push(`${rec.reports} người ở Đồng Nai đã báo ${kindLabel} này trong 30 ngày qua.`);
  return r;
}
function checkNumber(det){
  const d = det.value; const recs = [];
  const p = D.LIST.phone[d], s = D.LIST.stk[d];
  if(det.kind==='phone' && p) recs.push(['phone',p]);
  if((det.kind==='stk' || det.both) && s) recs.push(['stk',s]);
  const label = det.kind==='phone' ? 'Số điện thoại' : 'Số tài khoản';
  const shown = det.kind==='phone' ? fmtPhone(d) : fmtStk(d);
  const off = recs.find(([,r])=>r.official);
  if(off) return {level:'ok', kind:label, value:shown, reasons:[off[1].official+'.'], type:null};
  const bad = recs.find(([,r])=>r.verified || r.reports>=5) || recs[0];
  if(bad){
    const [k,r] = bad; const sc = scen(r.type);
    const danger = r.verified || r.reports>=5;
    const reasons = fromReports(r, k==='phone'?'số này':'số tài khoản này');
    if(sc) reasons.push(`Thường dùng trong kiểu lừa: ${sc.ngan.toLowerCase()}.`);
    if(sc) reasons.push(sc.nenLam[0]+'.');
    if(det.both && k==='stk') reasons.unshift('Dãy số này cũng có thể là số tài khoản ngân hàng, nên đã tra cả hai.');
    return {level: danger?'danger':'warn', kind:label, value:shown, reasons:reasons.slice(0,3), type:r.type, reports:r.reports};
  }
  return {level:'warn', kind:label, value:shown, type:null, nodata:true,
    reasons:[`Chưa có ai báo ${det.kind==='phone'?'số này':'số tài khoản này'}. Chưa có thông tin không có nghĩa là an toàn.`,
      'Công an, ngân hàng không bao giờ yêu cầu chuyển tiền hay đọc mã OTP qua điện thoại.',
      det.both ? 'Dãy số này cũng có thể là số tài khoản, đã tra cả hai.' : 'Nếu bị giục chuyển tiền gấp, hãy dừng lại và hỏi người thân.']};
}
function checkLink(v){
  const https = /^https:\/\//i.test(v), http = /^http:\/\//i.test(v);
  const clean = v.replace(/^https?:\/\//i,'').replace(/^www\./i,'').replace(/\/$/,'');
  const host = clean.split('/')[0].toLowerCase();
  const short = clean.split('/').slice(0,2).join('/').toLowerCase();
  const rec = D.LIST.link[short] || D.LIST.link[host];
  const reasons = []; let level = null, type = rec && rec.type || null;
  if(rec && rec.official) return {level:'ok', kind:'Đường link', value:host, reasons:[rec.official+'.'], type:null};
  if(rec){ reasons.push(...fromReports(rec,'đường link này')); if(rec.verified || rec.reports>=5) level='danger'; else level='warn'; }
  const labels = host.split('.'); const name = labels.slice(0,-1).join('.');
  const brand = D.LIST.bankBrands.find(b => name.includes(b) || name.split(/[-.]/).some(p => p.length>4 && lev(p,b)<=2));
  if(brand && !D.LIST.link[host]?.official){
    const exact = name.split(/[-.]/).includes(brand);
    reasons.push(exact ? `Tên miền ghép tên ngân hàng "${brand}" với chữ khác. Trang thật của ngân hàng không như vậy.`
      : `Tên miền giả trang ngân hàng (nhái chữ "${brand}").`);
    level = 'danger'; type = type || 'T05';
  }
  if(D.LIST.shorteners.includes(host)){ reasons.push('Đây là link rút gọn, che mất địa chỉ thật phía sau.'); level = level || 'warn'; }
  if(D.LIST.newDomains.includes(host)){ reasons.push('Tên miền mới được tạo chưa đến 30 ngày.'); level = level || 'warn'; }
  const tld = labels[labels.length-1];
  if(D.LIST.badTlds.includes(tld)){ reasons.push(`Đuôi tên miền ".${tld}" hay bị dùng cho trang lừa đảo.`); level = level || 'warn'; }
  if(http && !https){ reasons.push('Trang không có kết nối bảo mật (https).'); level = level || 'warn'; }
  if(!level){ level = 'warn'; reasons.push('Chưa có ai báo đường link này. Chưa có thông tin không có nghĩa là an toàn.'); reasons.push('Không nhập mật khẩu, mã OTP vào trang được gửi qua tin nhắn.'); }
  return {level, kind:'Đường link', value:host, reasons:reasons.slice(0,3), type, nodata:!rec};
}
Object.assign(window.App, {detect, KIND_LABEL, checkValue, checkLink});
})();
