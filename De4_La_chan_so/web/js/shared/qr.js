/* Mã QR minh họa (không quét được) cho buổi tuyên truyền, liên kết đỡ đầu */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
/* Mã QR minh họa (không quét được) */
function pseudoQR(code){
  const n = 25; let seed = [...String(code)].reduce((s,c)=>s*31+c.charCodeAt(0),7)%2147483647;
  const rnd = () => (seed = seed*16807%2147483647)/2147483647;
  const finder = (x,y) => [[0,0],[n-7,0],[0,n-7]].some(([fx,fy]) => x>=fx && x<fx+7 && y>=fy && y<fy+7);
  const fin = (x,y) => { for(const [fx,fy] of [[0,0],[n-7,0],[0,n-7]]){ if(x>=fx&&x<fx+7&&y>=fy&&y<fy+7){ const dx=x-fx, dy=y-fy; return dx===0||dx===6||dy===0||dy===6||(dx>=2&&dx<=4&&dy>=2&&dy<=4); } } return false; };
  let r = '';
  for(let y=0;y<n;y++) for(let x=0;x<n;x++){ const on = finder(x,y) ? fin(x,y) : rnd()<.5; if(on) r += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }
  return `<svg viewBox="-2 -2 ${n+4} ${n+4}" role="img" aria-label="Mã QR buổi ${code} (minh họa)"><rect x="-2" y="-2" width="${n+4}" height="${n+4}" fill="#fff"/><g fill="#0f1b33">${r}</g></svg>`;
}
A.pseudoQR = pseudoQR;
})();
