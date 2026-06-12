const CACHE = 'flow-v1';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./'])));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  // API calls always go to network
  if (e.request.url.includes('groq.com') || e.request.url.includes('unpkg.com')) {
    e.respondWith(fetch(e.request));
    return;
  }
  // Everything else: cache first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
