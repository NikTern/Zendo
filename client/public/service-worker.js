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
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open(CACHE_NAME)
//         .then((cache) => {
//           console.log('Opened cache');
//           const cachePromises = urlsToCache.map(url => {
//             return cache.add(url).catch(err => {
//               console.error(`Failed to cache: ${url}`, err);
//             });
//           });
//           return Promise.all(cachePromises);
//         })
//     );
//   });
  
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



self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('api.unsplash.com') || event.request.url.includes('api-ninja.com') || event.request.url.includes('www.googleapis.com/youtube')) {
      return;
    }
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
  });