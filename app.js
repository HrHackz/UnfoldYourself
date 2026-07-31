"use strict";

/*
  Unfold Yourself — initialisatie en eventbinding
  Afhankelijkheden: alle scripts die vóór app.js in index.html staan.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

const state = loadState();

const domainLayer = document.querySelector("#domainLayer");
const mobileDomainGrid = document.querySelector("#mobileDomainGrid");
const domainButtonTemplate = document.querySelector("#domainButtonTemplate");
const domainDrawer = document.querySelector("#domainDrawer");
const overlay = document.querySelector("#overlay");
const testList = document.querySelector("#testList");
const storageDialog = document.querySelector("#storageDialog");
const menuButton = document.querySelector("#menuButton");
const mainNavigation = document.querySelector("#mainNavigation");

/* =========================================================
   TESTOMGEVING — HTML-ELEMENTEN
========================================================= */

const testWorkspace = document.querySelector("#testWorkspace");

const testIntroScreen = document.querySelector("#testIntroScreen");
const questionScreen = document.querySelector("#questionScreen");
const resultScreen = document.querySelector("#resultScreen");

const testTopbarLabel = document.querySelector("#testTopbarLabel");
const testTopbarProgress = document.querySelector("#testTopbarProgress");

const testIntroDomain = document.querySelector("#testIntroDomain");
const testWorkspaceTitle = document.querySelector("#testWorkspaceTitle");
const testIntroDescription = document.querySelector("#testIntroDescription");
const testQuestionCount = document.querySelector("#testQuestionCount");
const testEstimatedTime = document.querySelector("#testEstimatedTime");

const testEvidenceSummary = document.querySelector("#testEvidenceSummary");
const testEvidenceSource = document.querySelector("#testEvidenceSource");
const testEvidenceDisclaimer = document.querySelector("#testEvidenceDisclaimer");

const beginTestButton = document.querySelector("#beginTestButton");
const cancelTestButton = document.querySelector("#cancelTestButton");
const exitTestButton = document.querySelector("#exitTestButton");
const saveAndExitButton = document.querySelector("#saveAndExitButton");

const questionTestTitle = document.querySelector("#questionTestTitle");
const questionCounter = document.querySelector("#questionCounter");
const questionPercentage = document.querySelector("#questionPercentage");
const questionProgressBar = document.querySelector("#questionProgressBar");
const questionCategory = document.querySelector("#questionCategory");
const questionText = document.querySelector("#questionText");
const answerOptions = document.querySelector("#answerOptions");
const answerWarning = document.querySelector("#answerWarning");

const previousQuestionButton = document.querySelector("#previousQuestionButton");
const nextQuestionButton = document.querySelector("#nextQuestionButton");

const resultTestTitle = document.querySelector("#resultTestTitle");
const resultEyebrow = document.querySelector("#resultEyebrow");
const resultSummary = document.querySelector("#resultSummary");
const resultMainScoreHeading = document.querySelector("#resultMainScoreHeading");
const printReportSubtitle = document.querySelector("#printReportSubtitle");
const printTestTitle = document.querySelector("#printTestTitle");
const resultMainScore = document.querySelector("#resultMainScore");
const resultScoreLabel = document.querySelector("#resultScoreLabel");
const resultDimensions = document.querySelector("#resultDimensions");
const facetReport = document.querySelector("#facetReport");
const facetReportEyebrow = document.querySelector("#facetReportEyebrow");
const facetReportTitle = document.querySelector("#facetReportTitle");
const facetReportDescription = document.querySelector("#facetReportDescription");
const facetExplanationTitle = document.querySelector("#facetExplanationTitle");
const facetExplanationText = document.querySelector("#facetExplanationText");
const facetToggleButton = document.querySelector("#facetToggleButton");
const facetGroups = document.querySelector("#facetGroups");
const resultStrengths = document.querySelector("#resultStrengths");
const resultDevelopment = document.querySelector("#resultDevelopment");
const resultMeaning = document.querySelector("#resultMeaning");
const resultAdvice = document.querySelector("#resultAdvice");
const resultContentGrid = document.querySelector(".result-content-grid");
const resultCompletedDate = document.querySelector("#resultCompletedDate");
const printCompletedDate = document.querySelector("#printCompletedDate");
const printResultButton = document.querySelector("#printResultButton");
const personalityCrossTestButton = document.querySelector("#personalityCrossTestButton");
const resultMethodSource = document.querySelector("#resultMethodSource");
const resultMethodDisclaimer = document.querySelector("#resultMethodDisclaimer");

const finishTestButton = document.querySelector("#finishTestButton");
const restartTestButton = document.querySelector("#restartTestButton");

const storageCompletedTests = document.querySelector("#storageCompletedTests");
const storageActiveTests = document.querySelector("#storageActiveTests");

const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toastMessage");

let activeDomainId = null;
let activeTestId = null;
let toastTimer = null;

const migratedPersonalityAnswers =
  migrateActivePersonalitySessionsToAnswerBank();

if (migratedPersonalityAnswers > 0) {
  saveState();
}


/* Applicatie-events en serviceworkerregistratie. */

document.querySelector("#closeDrawerButton").addEventListener("click", closeDomain);
overlay.addEventListener("click", closeDomain);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && domainDrawer.classList.contains("is-open")) {
    closeDomain();
  }
});

document.querySelector("#continueButton").addEventListener("click", openFirstIncompleteDomain);

document.querySelector("#storageButton").addEventListener("click", () => {
  updateStorageSummary();

  if (
    typeof storageDialog.showModal ===
    "function"
  ) {
    storageDialog.showModal();
  }
});

initializeBackupManager({
  state,
  persistState: saveState,
  onRestored: () => {
    renderDomains();
    renderProgress();
    updateStorageSummary();
  },
  showMessage: showToast,
  closeDialog: () => storageDialog.close()
});

document.querySelector("#resetProgressButton").addEventListener("click", () => {
  const confirmed = window.confirm(
    "Wil je alle lokaal opgeslagen antwoorden, resultaten en voortgang wissen?"
  );

  if (!confirmed) {
    return;
  }

  state.completedTests.splice(
    0,
    state.completedTests.length
  );

  state.activeTests = {};
  state.results = {};
  state.responseBank = {};

  localStorage.removeItem(
    LEGACY_PROFILE_STORAGE_KEY
  );

  saveState();

  renderDomains();
  renderProgress();
  updateStorageSummary();

  storageDialog.close();

  showToast(
    "Alle lokale gegevens zijn gewist."
  );
});

/* =========================================================
   KNOPPEN VAN DE TESTOMGEVING
========================================================= */

beginTestButton.addEventListener(
  "click",
  beginOrResumeTest
);


cancelTestButton.addEventListener(
  "click",
  closeTestWorkspace
);


exitTestButton.addEventListener(
  "click",
  () => {
    const activeSession =
      activeTestId
        ? state.activeTests[activeTestId]
        : null;

    if (activeSession) {
      saveAndExitTest();
    } else {
      closeTestWorkspace();
    }
  }
);


saveAndExitButton.addEventListener(
  "click",
  saveAndExitTest
);


previousQuestionButton.addEventListener(
  "click",
  goToPreviousQuestion
);


nextQuestionButton.addEventListener(
  "click",
  goToNextQuestion
);


finishTestButton.addEventListener(
  "click",
  finishActiveTest
);


restartTestButton.addEventListener(
  "click",
  restartActiveTest
);

printResultButton.addEventListener(
  "click",
  printActiveResult
);

personalityCrossTestButton.addEventListener(
  "click",
  () => {
    const targetTestId =
      personalityCrossTestButton.dataset.targetTestId;

    if (!targetTestId) {
      return;
    }

    openTestFlow(targetTestId);
  }
);


window.addEventListener(
  "beforeprint",
  prepareResultForPrint
);


window.addEventListener(
  "afterprint",
  restoreResultAfterPrint
);

facetToggleButton.addEventListener(
  "click",
  () => {
    const isCollapsed =
      facetReport.classList.toggle(
        "is-collapsed"
      );

    facetToggleButton.textContent =
      isCollapsed
        ? "Facetdetails bekijken"
        : "Facetdetails verbergen";

    facetToggleButton.setAttribute(
      "aria-expanded",
      String(!isCollapsed)
    );
  }
);

menuButton.addEventListener("click", () => {
  const isOpen = mainNavigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mainNavigation.addEventListener("click", event => {
  if (event.target.matches("a")) {
    mainNavigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(error => {
      console.warn("Service worker kon niet worden geregistreerd:", error);
    });
  });
}

renderDomains();
renderProgress();

