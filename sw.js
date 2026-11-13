const C='caja-chica-v17';
const SHELL=['./','index.html','manifest.webmanifest','icon-gato-192.png','icon-gato-512.png','exceljs.min.js','ocr/tesseract.min.js','ocr/worker.min.js','ocr/tesseract-core-simd-lstm.wasm.js','ocr/tesseract-core-lstm.wasm.js','ocr/spa.traineddata.gz'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(/\.(webmanifest|png)$/.test(u.pathname)){ e.respondWith(fetch(r).then(res=>{ if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));} return res; }).catch(()=>caches.match(r))); return; }
  if(r.mode==='navigate'){ e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put('index.html',cp));return res;}).catch(()=>caches.match('index.html'))); return; }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{ if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));} return res; })));
});
