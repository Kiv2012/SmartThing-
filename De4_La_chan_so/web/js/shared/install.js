/* Gợi ý "Thêm vào màn hình chính" (MH-02a, CN-01.3) */
(function(){
const A = window.App, D = A.D, S = A.S, esc = A.esc, icon = A.icon;
let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; });
function a2hsSheet(){
  A.sheet(`<h2>Thêm Lá Chắn Số ra màn hình chính</h2>
    <p>Để mở nhanh khi có cuộc gọi lạ, nhận cảnh báo từ người thân và dùng được khi mất mạng.</p>
    <ol class="ol small ink2"><li><b>Điện thoại Android (Chrome):</b> bấm "Cài đặt" trên thanh địa chỉ, hoặc menu ⋮ → "Thêm vào màn hình chính".</li>
    <li><b>iPhone (Safari):</b> bấm nút Chia sẻ → "Thêm vào MH chính".</li></ol>
    ${S.contentGroup==='ob'?'<p class="hint">Đoàn viên tình nguyện có thể làm giúp ông bà bước này.</p>':''}
    <button class="btn btn-primary" data-act="a2hs-yes">${deferredInstall?'Thêm ngay':'Tôi đã thêm'}</button>
    <button class="btn btn-ghost" data-act="a2hs-later">Để sau</button>`);
}
A.actions['a2hs-show'] = () => a2hsSheet();
A.actions['a2hs-yes'] = async () => { if(deferredInstall){ deferredInstall.prompt(); try{ await deferredInstall.userChoice; }catch(e){} deferredInstall = null; } S.a2hsDone = true; A.save(); A.closeSheet(); A.go(A.roleHome()); };
A.actions['a2hs-later'] = () => { S.a2hs++; A.save(); A.closeSheet(); A.go(A.roleHome()); };
A.showInstallSheet = a2hsSheet;
})();
