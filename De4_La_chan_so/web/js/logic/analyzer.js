/* Phân tích tin nhắn – tầng luật từ khóa (CN-03) */
(function(){
const {D, scen, noMark, checkLink, checkValue} = window.App;
function analyze(text){
  const sents = text.split(/(?<=[.!?…])\s+|\n+/).map(s=>s.trim()).filter(Boolean);
  const score = {}; const out = []; let risk = 0;
  sents.forEach(s => {
    const ns = noMark(s); let best=null, hits=0;
    D.SCEN.forEach(sc => { const h = sc.kw.filter(k => ns.includes(noMark(k))).length; if(h){ score[sc.id]=(score[sc.id]||0)+h; if(h>hits){hits=h;best=sc;} } });
    const urgent = /(gap|ngay|24h|hom nay|het han|khong duoc noi)/.test(ns);
    if(best){ risk += 16 + hits*6 + (urgent?6:0); out.push({s, flag:true, why: whyOf(best, ns)}); }
    else out.push({s, flag:false});
  });
  const found = []; const linkRe = /(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/[^\s]*)?/gi; const numRe = /(\+?84|0)[\d\s.]{8,12}\d|\b\d{9,16}\b/g;
  (text.match(linkRe)||[]).filter(m=>/[a-z]/i.test(m) && m.includes('.') && !/^\d/.test(m)).forEach(m => { const r = checkLink(m); found.push(r); if(r.level==='danger') risk += 30; else risk += 8; });
  (text.match(numRe)||[]).forEach(m => { const r = checkValue(m); if(r){ found.push(r); if(r.level==='danger') risk += 30; } });
  risk = Math.min(100, risk);
  const type = Object.entries(score).sort((a,b)=>b[1]-a[1])[0];
  const level = risk>=60 ? 'danger' : 'warn';
  return {sents:out, risk, level, type: type?type[0]:null, found, flagged: out.filter(x=>x.flag).length};
}
function whyOf(sc, ns){
  const i = sc.kw.findIndex(k => ns.includes(noMark(k)));
  const idx = i<0 ? 0 : Math.min(2, Math.floor(i / Math.max(1, sc.kw.length/3)));
  return sc.dauHieu[idx];
}
Object.assign(window.App, {analyze});
})();
