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

//1: always shows cached files
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
// //   if (event.request.method === 'POST') {
// //       return;
// //   }
// //   if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) {
// //     return;
// //   }
// // Exclude API calls from being cached
//   if (event.request.url.includes('api.unsplash.com') || event.request.url.includes('api-ninja.com') || event.request.url.includes('www.googleapis.com/youtube')) {
//     return;
//     }
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         if (response) {
//         //   return response;
//         }

//         return fetch(event.request).then(
//           (response) => {
//             if (!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }

//             const responseToCache = response.clone();

//             caches.open(CACHE_NAME)
//               .then((cache) => {
//                 cache.put(event.request, responseToCache);
//               });

//             return response;
//           }
//         );
//       })
//   );
// });


//2: short but same
// self.addEventListener('fetch', (event) => {
//     if (event.request.url.includes('api.unsplash.com') || event.request.url.includes('api-ninja.com') || event.request.url.includes('www.googleapis.com/youtube')) {
//       return;
//     }
//     event.respondWith(
//       fetch(event.request).catch(() => {
//         return caches.match(event.request);
//       })
//     );
//   });



//9/05 attempt

// const CACHE_NAME = 'my-cache';
// const urlsToCache = [
//   '/index.html',
//   '/',
//   '/static/js/bundle.js',
//   '/static/js/main.chunk.js',
//   '/static/js/0.chunk.js',
//   '/static/js/vendors~main.chunk.js',
//   '/manifest.json',
// ];

// // Install event
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => cache.addAll(urlsToCache))
//   );
// });

// Fetch event
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         if (response) {
//           return response;
//         }

//         return fetch(event.request)
//           .then((response) => {
//             if (!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }

//             const responseToCache = response.clone();

//             caches.open(CACHE_NAME)
//               .then((cache) => {
//                 cache.put(event.request, responseToCache);
//               });

//             return response;
//           });
//       })
//   );
// });

// Fetch event it told me to replce the fetch event with
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


    if (event.request.method === 'POST') {
    // Do not cache POST requests
    return;
    }
    
    } else {
      event.respondWith(
        caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
  
            return fetch(event.request)
              .then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }
  
                const responseToCache = response.clone();
  
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  });
  
                return response;
              });
          })
      );
    }
  });



//new test one:
// Fetch event
// self.addEventListener('fetch', (event) => {
//     const isApiCall = event.request.url.includes('/api/');
  
//     if (isApiCall) {
//       event.respondWith(
//         fetch(event.request)
//           .then((response) => {
//             if (!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }
  
//             const responseToCache = response.clone();
  
//             caches.open(CACHE_NAME)
//               .then((cache) => {
//                 cache.put(event.request, responseToCache);
//               });
  
//             return response;
//           })
//           .catch((error) => {
//             console.error('Fetch failed, falling back to cache:', error);
//             return caches.match(event.request);
//           })
//       );
//     } else {
//       event.respondWith(
//         caches.match(event.request)
//           .then((response) => {
//             return response || fetch(event.request);
//           })
//       );
//     }
//   });


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
