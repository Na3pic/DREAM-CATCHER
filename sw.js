// Attrape-rêves : garde l'appli disponible même sans réseau (sauf l'IA).
const VERSION = "attrape-reves-v2";
const FICHIERS = ["./", "./index.html", "./manifest.webmanifest", "./icone-192.png", "./icone-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(cles => Promise.all(cles.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  // L'IA (Gemini) passe toujours par le réseau.
  if(url.hostname.endsWith("googleapis.com") && !url.hostname.startsWith("fonts.")) return;
  // Polices : on les garde en cache une fois téléchargées.
  if(url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com"){
    e.respondWith(caches.open(VERSION).then(async c => {
      const deja = await c.match(req);
      if(deja) return deja;
      const rep = await fetch(req);
      c.put(req, rep.clone());
      return rep;
    }));
    return;
  }
  if(url.origin !== location.origin) return;
  // Fichiers de l'appli : d'abord le réseau (pour recevoir les mises à jour), sinon le cache.
  e.respondWith(fetch(req).then(rep => {
    const copie = rep.clone();
    caches.open(VERSION).then(c => c.put(req, copie));
    return rep;
  }).catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
});
