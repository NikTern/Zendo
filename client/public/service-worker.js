const CACHE_NAME = 'zendo-cache-v1';
const urlsToCache = [
  '/index.html',
  '/',
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/vendors~main.chunk.js',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Opened cache');
          const cachePromises = urlsToCache.map(url => {
            return cache.add(url).catch(err => {
              console.error(`Failed to cache: ${url}`, err);
            });
          });
          return Promise.all(cachePromises);
        })
    );
  });

// self.addEventListener('fetch', (event) => {
//     const isApiCall = event.request.url.includes('/api/');
  
//     if (isApiCall) {
//       event.respondWith(
//         fetch(event.request)
//           .catch((error) => {
//             console.error('Fetch failed, falling back to cache:', error);
//             return caches.match(event.request);
//           })
//       );


//     if (event.request.method === 'POST') {
//     // Do not cache POST requests
//     return;
//     }

//     } else {
//       event.respondWith(
//         caches.match(event.request)
//           .then((response) => {
//             if (response) {
//               return response;
//             }
  
//             return fetch(event.request)
//               .then((response) => {
//                 if (!response || response.status !== 200 || response.type !== 'basic') {
//                   return response;
//                 }
  
//                 const responseToCache = response.clone();
  
//                 caches.open(CACHE_NAME)
//                   .then((cache) => {
//                     cache.put(event.request, responseToCache);
//                   });
  
//                 return response;
//               });
//           })
//       );
//     }
//   });

self.addEventListener('fetch', (event) => {
    const isApiCall = event.request.url.includes('/api/');
  
    if (isApiCall) {
      event.respondWith(
        fetch(event.request)
          .catch((error) => {
            console.error('Fetch failed, falling back to cache:', error);
            return caches.match(event.request);
          })
      );
    } else {
      event.respondWith(
        // First, try to fetch the resource from the network
        fetch(event.request)
          .then((response) => {
            // If the response is valid, clone it and store it in the cache
            if (response && response.status === 200 && response.type === 'basic') {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return response;
          })
          .catch((error) => {
            // If the network request fails, try to serve the content from the cache
            console.error('Network request failed, falling back to cache:', error);
            return caches.match(event.request);
          })
      );
    }
  });


// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
