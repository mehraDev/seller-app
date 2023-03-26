if (typeof self !== 'undefined') {
  const cacheName = 'seller-app-v1';
  const filesToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/styles.css',
  ];

  self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
      caches.open(cacheName)
        .then((cache) => {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(filesToCache);
        }),
    );
  });

  self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
      caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }))),
    );
  });

  self.addEventListener('fetch', (event) => {
    console.log('[ServiceWorker] Fetch', event.request.url);
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request)),
    );
  });
}
