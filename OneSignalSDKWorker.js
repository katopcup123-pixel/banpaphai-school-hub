// Unified Service Worker: OneSignal Web Push v16 + BPP Connect PWA Cache
// Merging both prevents scope conflict on GitHub Pages (/banpaphai-school-hub/)
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

const CACHE_NAME = "bpp-connect-v37";
const ASSETS = [
  "./",
  "./index.html",
  "./docs.html",
  "./album.html",
  "./attendance.html",
  "./leave.html",
  "./students-data.js",
  "./pdf-export.js",
  "./styles.css",
  "./app.js",
  "./shader-bg.js",
  "./apps-config.js",
  "./manifest.webmanifest",
  "./icons/school-logo.png",
  "./icons/garuda.svg",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("bpp-connect-") && k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    fetch(event.request, { cache: "no-cache" })
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
