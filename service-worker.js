"use strict";

/*
  Unfold Yourself — offline cache

  Verhoog CACHE_VERSION telkens wanneer bestanden of testdata
  op de website wijzigen. Daardoor worden oude caches na een
  update automatisch verwijderd.
*/

const CACHE_VERSION = "v8";
const CACHE_PREFIX = "unfold-yourself";
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;


/* =========================================================
   BESTANDEN DIE ALTIJD OFFLINE BESCHIKBAAR MOETEN ZIJN
========================================================= */

const CORE_APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./fixes.css",
  "./core/app-config.js",
  "./core/test-utils.js",
  "./core/personality-answer-bank.js",
  "./tests/big-five-engine.js",
  "./tests/hexaco-engine.js",
  "./tests/sixteen-personalities-engine.js",
  "./tests/disc-engine.js",
  "./tests/self-values-drives-engine.js",
  "./core/test-registry.js",
  "./core/storage.js",
  "./core/profile-ui.js",
  "./core/test-engine.js",
  "./core/test-renderer.js",
  "./core/print.js",
  "./core/ui-feedback.js",
  "./app.js",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];


/* =========================================================
   TESTDATA

   Voeg toekomstige losse testbestanden hier toe en controleer
   ieder pad voordat de cacheversie wordt gepubliceerd.
========================================================= */

const TEST_DATA_FILES = [
  "./big-five-choices.js",
  "./big-five-questions.js",
  "./hexaco-answer-bank-map.js",
  "./hexaco-questions.js",
  "./hexaco-results.js",
  "./sixteen-personalities-questions.js",
  "./sixteen-personalities-results.js",
  "./disc-questions.js",
  "./disc-results.js",
  "./self-values-drives-questions.js",
  "./self-values-drives-results.js"
];


const APP_FILES = [
  ...CORE_APP_FILES,
  ...TEST_DATA_FILES
];


/* =========================================================
   INSTALLATIE
========================================================= */

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});


/* =========================================================
   ACTIVATIE EN OUDE CACHES OPRUIMEN
========================================================= */

self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        const obsoleteCaches =
          cacheNames.filter(cacheName => {
            return (
              cacheName.startsWith(
                `${CACHE_PREFIX}-`
              ) &&
              cacheName !== CACHE_NAME
            );
          });

        return Promise.all(
          obsoleteCaches.map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});


/* =========================================================
   HULPFUNCTIES
========================================================= */

function isCacheableResponse(response) {
  return Boolean(
    response &&
    response.ok &&
    (
      response.type === "basic" ||
      response.type === "default"
    )
  );
}


async function saveResponseToCache(
  request,
  response
) {
  if (!isCacheableResponse(response)) {
    return;
  }

  const cache =
    await caches.open(CACHE_NAME);

  await cache.put(
    request,
    response.clone()
  );
}


/*
  Voor HTML-navigatie:
  eerst de nieuwste online versie proberen.
  Zonder internet wordt de opgeslagen pagina gebruikt.
*/

async function networkFirstNavigation(
  request
) {
  try {
    const networkResponse =
      await fetch(request);

    await saveResponseToCache(
      request,
      networkResponse
    );

    return networkResponse;
  } catch {
    const cachedRequest =
      await caches.match(request);

    if (cachedRequest) {
      return cachedRequest;
    }

    const cachedIndex =
      await caches.match("./index.html");

    if (cachedIndex) {
      return cachedIndex;
    }

    return Response.error();
  }
}


/*
  Voor CSS, JavaScript, afbeeldingen en testdata:
  meteen de cache gebruiken en die op de achtergrond bijwerken.
*/

async function cacheFirstWithRefresh(
  request
) {
  const cachedResponse =
    await caches.match(request);

  const networkPromise =
    fetch(request)
      .then(async networkResponse => {
        await saveResponseToCache(
          request,
          networkResponse
        );

        return networkResponse;
      })
      .catch(() => null);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse =
    await networkPromise;

  return (
    networkResponse ||
    Response.error()
  );
}


/* =========================================================
   NETWERKVERZOEKEN
========================================================= */

self.addEventListener("fetch", event => {
  const request =
    event.request;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl =
    new URL(request.url);

  /*
    Alleen bestanden van deze eigen website cachen.
    Externe bronnen en browserextensies worden genegeerd.
  */

  if (
    requestUrl.origin !==
    self.location.origin
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      networkFirstNavigation(request)
    );

    return;
  }

  event.respondWith(
    cacheFirstWithRefresh(request)
  );
});
