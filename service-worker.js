"use strict";

/*
  Unfold Yourself — offline cache

  Verhoog CACHE_VERSION telkens wanneer bestanden of testdata
  op de website wijzigen. Daardoor worden oude caches na een
  update automatisch verwijderd.
*/

const CACHE_VERSION = "v42";
const CACHE_PREFIX = "unfold-yourself";
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;


/* =========================================================
   VERPLICHTE APP-SHELL

   Wanneer een van deze kernbestanden ontbreekt, wordt de nieuwe
   serviceworker niet geactiveerd. Zo wordt geen onvolledige
   basisapplicatie offline aangeboden.
========================================================= */

const ESSENTIAL_APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./fixes.css",
  "./report-uniformity.css",
  "./total-report.css",
  "./theme.css",
  "./theme.js",
  "./core/app-config.js",
  "./core/test-utils.js",
  "./core/test-registry.js",
  "./core/storage.js",
  "./core/backup.js",
  "./core/profile-ui.js",
  "./core/test-engine.js",
  "./core/test-renderer.js",
  "./core/report-uniformity.js",
  "./core/print.js",
  "./core/ui-feedback.js",
  "./app.js",
  "./total-report.js",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./favicon.ico",
  "./icons/favicon-light.svg",
  "./icons/favicon-dark.svg",
  "./icons/brand-icon-light.svg",
  "./icons/brand-icon-dark.svg"
];


/* =========================================================
   AANVULLENDE OFFLINE BESTANDEN

   Deze bestanden worden afzonderlijk gecachet. Eén fout pad
   blokkeert daardoor niet langer de volledige installatie.
========================================================= */

const OPTIONAL_APP_FILES = [
  "./core/personality-answer-bank.js",
  "./tests/big-five-engine.js",
  "./tests/hexaco-engine.js",
  "./tests/sixteen-personalities-engine.js",
  "./tests/disc-engine.js",
  "./tests/self-values-drives-engine.js",
  "./tests/identity-intersectionality/intersections.js",
  "./tests/identity-intersectionality/advice.js",
  "./tests/identity-intersectionality/scoring.js",
  "./tests/identity-intersectionality/renderer.js",
  "./tests/identity-intersectionality/engine.js",
  "./tests/career-interest/scoring.js",
  "./tests/career-interest/renderer.js",
  "./tests/career-interest/engine.js",
  "./tests/work-values/scoring.js",
  "./tests/work-values/renderer.js",
  "./tests/work-values/engine.js",
  "./tests/cognitive-battery/styles.css",
  "./tests/cognitive-battery/session.js",
  "./tests/cognitive-battery/scoring.js",
  "./tests/cognitive-battery/visual-renderer.js",
  "./tests/cognitive-battery/attention-task.js",
  "./tests/cognitive-battery/working-memory-task.js",
  "./tests/cognitive-battery/reasoning-task.js",
  "./tests/cognitive-battery/renderer.js",
  "./tests/cognitive-battery/engine.js",
  "./tests/digital-skills/styles.css",
  "./tests/digital-skills/session.js",
  "./tests/digital-skills/scoring.js",
  "./tests/digital-skills/renderer.js",
  "./tests/digital-skills/report.js",
  "./tests/digital-skills/engine.js",
  "./tests/leadership/styles.css",
  "./tests/leadership/session.js",
  "./tests/leadership/scoring.js",
  "./tests/leadership/renderer.js",
  "./tests/leadership/report.js",
  "./tests/leadership/engine.js",
  "./tests/team-roles/styles.css",
  "./tests/team-roles/scoring.js",
  "./tests/team-roles/report.js",
  "./tests/team-roles/engine.js",
  "./tests/work-environment-culture/styles.css",
  "./tests/work-environment-culture/scoring.js",
  "./tests/work-environment-culture/renderer.js",
  "./tests/work-environment-culture/report.js",
  "./tests/work-environment-culture/engine.js",
  "./tests/work-wellbeing/styles.css",
  "./tests/work-wellbeing/scoring.js",
  "./tests/work-wellbeing/renderer.js",
  "./tests/work-wellbeing/report.js",
  "./tests/work-wellbeing/engine.js",
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
  "./self-values-drives-results.js",
  "./data/identity-intersectionality/countries.js",
  "./data/identity-intersectionality/questions.js",
  "./data/identity-intersectionality/sources.js",
  "./data/identity-intersectionality/benchmarks-belgium.js",
  "./data/identity-intersectionality/interpretations.js",
  "./data/career-interest/questions.js",
  "./data/career-interest/skills.js",
  "./data/career-interest/occupations.js",
  "./data/work-values/questions.js",
  "./data/work-values/interpretations.js",
  "./data/work-values/sources.js",
  "./data/cognitive-battery/numerical.js",
  "./data/cognitive-battery/verbal.js",
  "./data/cognitive-battery/abstract-logical.js",
  "./data/cognitive-battery/spatial.js",
  "./data/cognitive-battery/attention.js",
  "./data/cognitive-battery/working-memory.js",
  "./data/cognitive-battery/critical-data.js",
  "./data/cognitive-battery/interpretations.js",
  "./data/cognitive-battery/sources.js",
  "./data/digital-skills/answer-scales.js",
  "./data/digital-skills/areas.js",
  "./data/digital-skills/questions.js",
  "./data/digital-skills/sources.js",
  "./data/leadership/scenarios.js",
  "./data/leadership/styles.js",
  "./data/leadership/sources.js",
  "./data/team-roles/questions.js",
  "./data/team-roles/roles.js",
  "./data/team-roles/sources.js",
  "./data/work-environment-culture/questions.js",
  "./data/work-environment-culture/profiles.js",
  "./data/work-environment-culture/sources.js",
  "./data/work-wellbeing/questions.js",
  "./data/work-wellbeing/profiles.js",
  "./data/work-wellbeing/sources.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-16.png",
  "./icons/favicon-32.png",
  "./icons/favicon-48.png",
  "./icons/app-icon-source.svg",
  "./icons/app-icon-maskable-source.svg",
  "./BRAND_ICON_SYSTEM.md"
];


/* =========================================================
   INSTALLATIEHULPFUNCTIES
========================================================= */

async function fetchForInstall(path) {
  const response = await fetch(path, {
    cache: "reload"
  });

  if (!response || !response.ok) {
    throw new Error(
      `Offlinebestand kon niet worden geladen: ${path}`
    );
  }

  return response;
}


async function cacheRequiredFiles(cache, paths) {
  const failures = [];

  await Promise.all(
    paths.map(async path => {
      try {
        const response = await fetchForInstall(path);
        await cache.put(path, response);
      } catch (error) {
        failures.push(path);
        console.error(error);
      }
    })
  );

  if (failures.length > 0) {
    throw new Error(
      `Verplichte app-shell onvolledig: ${failures.join(", ")}`
    );
  }
}


async function cacheOptionalFiles(cache, paths) {
  const results = await Promise.all(
    paths.map(async path => {
      try {
        const response = await fetchForInstall(path);
        await cache.put(path, response);
        return true;
      } catch (error) {
        console.warn(
          `Optioneel offlinebestand overgeslagen: ${path}`,
          error
        );
        return false;
      }
    })
  );

  const cachedCount = results.filter(Boolean).length;
  console.info(
    `${cachedCount} van ${paths.length} aanvullende offlinebestanden gecachet.`
  );
}


/* =========================================================
   INSTALLATIE
========================================================= */

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(async cache => {
        await cacheRequiredFiles(
          cache,
          ESSENTIAL_APP_FILES
        );

        await cacheOptionalFiles(
          cache,
          OPTIONAL_APP_FILES
        );
      })
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
