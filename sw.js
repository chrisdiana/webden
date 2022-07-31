'use strict';
const VERSION = '0.1.5';

self.importScripts('./js/sw-cache.js');
const CACHE_NAME = 'static-cache-v' + VERSION;

// Install service worker and cache all content
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE_NAME).then(c => c.addAll(['/', 'index.html', 'manifest.json']))));

// Clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(async function() {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter(cacheName => cacheName !== CACHE_NAME)
        .map(cacheName => caches.delete(cacheName)));
  }());
});


// Fetch content from cache if available for
// offline support and cache new resources if available
self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then(r => {
    return r || fetch(e.request).then(res => {
      return caches.open(CACHE_NAME).then(cache => {
        cache.put(e.request, res.clone());
        return res;
      })
    })
  })
));

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
