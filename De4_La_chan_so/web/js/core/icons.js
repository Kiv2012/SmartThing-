/* Icon nét SVG – chỉ dùng ở 4 chỗ (DESIGN.md mục 1A) */
(function(){
const P = {
 home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
 book:'<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
 chart:'<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16v-5"/><path d="M12 16V8"/><path d="M16 16v-3"/>',
 check:'<path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="M4 6l1 1 2-2"/><path d="M4 12l1 1 2-2"/><path d="M4 18l1 1 2-2"/>',
 mega:'<path d="M3 10v4h4l6 4V6L7 10z"/><path d="M17 9a4 4 0 010 6"/>',
 hand:'<path d="M7 11V6a2 2 0 014 0v4"/><path d="M11 10V5a2 2 0 014 0v6"/><path d="M15 11V8a2 2 0 014 0v6a7 7 0 01-7 7h-1a6 6 0 01-5-3l-2.5-4a2 2 0 013.3-2.2L7 13"/>',
 danger:'<path d="M12 3l10 18H2z"/><path d="M12 10v4"/><path d="M12 17.5v.5"/>',
 warn:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 114 2c-1 .6-1.5 1.2-1.5 2.5"/><path d="M12 17.5v.5"/>',
 ok:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
 speaker:'<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16.5 8.5a5 5 0 010 7"/><path d="M19 6a8.5 8.5 0 010 12"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 18v3"/>',
 back:'<path d="M15 5l-7 7 7 7"/>'
};
const icon = (n, cls='') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
const flagSvg = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="#ffd200" d="M12 2.8l2.6 6.1 6.6.5-5 4.3 1.5 6.5L12 16.7l-5.7 3.5 1.5-6.5-5-4.3 6.6-.5z"/></svg>';
const verdictIcon = l => icon(l==='danger'?'danger':l==='warn'?'warn':'ok');
Object.assign(window.App, {icon, flagSvg, verdictIcon});
})();
