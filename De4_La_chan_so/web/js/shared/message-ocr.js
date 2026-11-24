/* Đọc chữ trong Web Worker. Ảnh và chữ nhận diện ở trên thiết bị. */
(function(){
const A = window.App;
const assets = new URL('assets/ocr/', document.baseURI);
let engine;

function loadEngine(){
  if(!engine){
    engine = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL('tesseract.min.js', assets).href;
      script.onload = () => window.Tesseract?.createWorker ? resolve(window.Tesseract) : reject(new Error('OCR unavailable'));
      script.onerror = () => { script.remove(); reject(new Error('OCR unavailable')); };
      document.head.appendChild(script);
    }).catch(error => { engine = null; throw error; });
  }
  return engine;
}

A.readImageText = async (image, signal, updateProgress) => {
  let active = true;
  let worker;
  let reject;
  const failure = new Promise((_, fail) => { reject = fail; });
  const abort = () => reject(new DOMException('Đã hủy đọc ảnh', 'AbortError'));
  const timeout = setTimeout(() => reject(new Error('OCR timeout')), 90000);
  signal.addEventListener('abort', abort, {once:true});
  const run = async () => {
    const ocr = await loadEngine();
    if(!active || signal.aborted) return '';
    const created = await ocr.createWorker(['vie','eng'], ocr.OEM.LSTM_ONLY, {
      workerPath: new URL('worker.min.js', assets).href,
      corePath: new URL('tesseract-core-lstm.wasm.js', assets).href,
      langPath: assets.href,
      workerBlobURL: false,
      errorHandler: reject,
      logger: ({status, progress}) => {
        if(active && status==='recognizing text') updateProgress(progress);
      }
    });
    if(!active || signal.aborted){
      await created.terminate();
      return '';
    }
    worker = created;
    await worker.setParameters({tessedit_pageseg_mode:ocr.PSM.SPARSE_TEXT, user_defined_dpi:'150'});
    const {data} = await worker.recognize(image);
    return data.text.trim();
  };
  try {
    signal.throwIfAborted();
    return await Promise.race([run(), failure]);
  } finally {
    active = false;
    clearTimeout(timeout);
    signal.removeEventListener('abort', abort);
    if(worker) await worker.terminate();
  }
};
})();
