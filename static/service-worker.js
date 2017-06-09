var cacheName = 'v1';
var cacheFiles = [
  './',
  './index.html',
  './css/screen.css',
  './css/nav.css',
  'https://fonts.googleapis.com/css?family=Merriweather:300,700,700italic,300italic|Open+Sans:700,400|Inconsolata',
  './js/app.js',
  './images/logo.png',
  './images/cover_polenord.jpg'
]

self.addEventListener('install', function(e) {
  console.log("[ServiceWorker] Installed")

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log("[ServiceWorker] Activated")

  e.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(thisCacheName) {
          if (thisCacheName !== cacheName) {
            console.log("[ServiceWorker] Removing Cached Files from ", thisCacheName);
            return caches.delete(thisCacheName);
          }
        }))
      })
  )

})

self.addEventListener('fetch', function(e) {
  console.log("[ServiceWorker] Fetching", e.request.url)

  e.respondWith(
    caches.match(e.request).then(function(response) {
      if(response) {
        console.log("[ServiceWorker] Found in cache", e.request.url);
        return response;
      }

      var requestClone = e.request.clone();

      fetch(requestClone)
        .then(function(response) {
          if(!response) {
            console.log("[ServiceWorker] No response from fetch");
            return response;
          }

          var responseClone = response.clone();

          caches.open(cacheName).then(function(cache) {
            console.log("[ServiceWorker] New Data new", e.request.url);
            cache.put(e.request, responseClone);
            return response;
          })
        })
        .catch(function(err) {
          console.log("[ServiceWorker] Error fetching and caching new content", err);
        })
    })
  )
})
