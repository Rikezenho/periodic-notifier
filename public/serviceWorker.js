const cacheName = "periodicNotifierCache";

const staticAssets = ["./", "./index.html"];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);

  return self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", async (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    event.respondWith(checkCache(req));
  } else {
    event.respondWith(checkNetwork(req));
  }
});

async function checkCache(req) {
  const cache = await caches.open(cacheName);
  const cachedData = await cache.match(req);

  return cachedData || fetch(req);
}

async function checkNetwork(req) {
  const cache = await caches.open(cacheName);

  try {
    const freshData = await fetch(req);
    await cache.put(req, freshData.clone());

    return freshData;
  } catch (err) {
    const cachedData = await cache.match(req);

    return cachedData;
  }
}
