let cacheName = conversionRates;
//let filesToCache = ...;

self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open(cacheName)
        .then((cache)=> cache.addAll(filesToCache) ));
});

self.addEventListener('fetch',(event)=>{
    console.log(event.request);
})