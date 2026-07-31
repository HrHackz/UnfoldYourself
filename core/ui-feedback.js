"use strict";

/*
  Unfold Yourself — opslagsamenvatting en meldingen
  Afhankelijkheden: core/storage.js, core/profile-ui.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

/* =========================================================
   OPSLAGSAMENVATTING EN MELDINGEN
========================================================= */

function updateStorageSummary() {
  storageCompletedTests.textContent =
    String(
      state.completedTests.length
    );

  storageActiveTests.textContent =
    String(
      Object.keys(
        state.activeTests
      ).length
    );
}


function showToast(message) {
  if (toastTimer) {
    window.clearTimeout(
      toastTimer
    );
  }

  toastMessage.textContent =
    message;

  toast.hidden = false;

  toastTimer =
    window.setTimeout(() => {
      toast.hidden = true;
    }, 2600);
}

function openFirstIncompleteDomain() {
  const firstIncomplete = domains.find(domain => {
    const progress = getDomainProgress(domain);
    return progress.completed < progress.total;
  });

  openDomain((firstIncomplete || domains[0]).id);
}

