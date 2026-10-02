const CACHE_NAME = "sv-business-manager-v7";

const FILES_TO_CACHE = [
  "/SV-Business-Manager/",
  "/SV-Business-Manager/index.html",
  "/SV-Business-Manager/style.css",
  "/SV-Business-Manager/script.js",
  "/SV-Business-Manager/icon.png"
];

self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

});

self.addEventListener("activate", event => {

  event.waitUntil(

    Promise.all([

      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      ),

      self.clients.claim()

    ])

  );

});

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request).then(response => {

      return response || fetch(event.request);

    })

  );

});
