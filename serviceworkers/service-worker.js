"use strict";
var CACHE_NAME = "my-site-cache-v1",
	shell = [
		'',
		'/serviceworkers/',
		'/serviceworkers/index.html',
		'/serviceworkers/css/bootstrap.min.css',
		'/serviceworkers/css/jquery.countdown.css',
		'/serviceworkers/fonts/custom_font/style.css',
		'/serviceworkers/css/main.min.css',
		'/serviceworkers/js/lib/require.js',
		'/serviceworkers/js/start.js',
		'/serviceworkers/js/config.js'
	];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(shell);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log('from cache: ' + response.url);
          return response;
        }

        console.log('no cache found for: ' + event.request.url);

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have 2 stream.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                console.log('put in cache: ' + event.request.url);
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
});


self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['my-site-cache-v1','my-site-cache-v2'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
