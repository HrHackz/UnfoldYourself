"use strict";

/*
  Unfold Yourself — lokale back-up en herstel
  Afhankelijkheden: core/app-config.js en core/storage.js.
  Deze module leest of schrijft uitsluitend JSON-data en voert
  nooit inhoud uit een geïmporteerd bestand uit.
*/

const BACKUP_FORMAT_ID = "unfold-yourself-backup";
const BACKUP_FORMAT_VERSION = 1;
const MAX_BACKUP_FILE_SIZE = 10 * 1024 * 1024;

function isPlainBackupObject(value) {
  return Boolean(
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function cloneBackupValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeBackupState(value) {
  if (!isPlainBackupObject(value)) {
    throw new Error("De back-up bevat geen geldige profielgegevens.");
  }

  const completedTests =
    value.completedTests === undefined
      ? []
      : value.completedTests;

  const activeTests =
    value.activeTests === undefined
      ? {}
      : value.activeTests;

  const results =
    value.results === undefined
      ? {}
      : value.results;

  const responseBank =
    value.responseBank === undefined
      ? {}
      : value.responseBank;

  if (
    !Array.isArray(completedTests) ||
    completedTests.some(testId => typeof testId !== "string")
  ) {
    throw new Error("De lijst met voltooide testen is ongeldig.");
  }

  if (!isPlainBackupObject(activeTests)) {
    throw new Error("De opgeslagen actieve testen zijn ongeldig.");
  }

  if (!isPlainBackupObject(results)) {
    throw new Error("De opgeslagen resultaten zijn ongeldig.");
  }

  if (!isPlainBackupObject(responseBank)) {
    throw new Error("De opgeslagen antwoordenbank is ongeldig.");
  }

  return cloneBackupValue({
    completedTests: [...new Set(completedTests)],
    activeTests,
    results,
    responseBank
  });
}

function createBackupDocument(profileState) {
  const normalizedState =
    normalizeBackupState(profileState);

  return {
    backupFormat: BACKUP_FORMAT_ID,
    backupVersion: BACKUP_FORMAT_VERSION,
    application: "Unfold Yourself",
    exportedAt: new Date().toISOString(),
    storageKey: PROFILE_STORAGE_KEY,
    data: normalizedState
  };
}

function parseBackupDocument(text) {
  let documentData;

  try {
    documentData = JSON.parse(text);
  } catch {
    throw new Error("Het gekozen bestand bevat geen geldige JSON-back-up.");
  }

  if (!isPlainBackupObject(documentData)) {
    throw new Error("Het gekozen bestand is geen geldige Unfold Yourself-back-up.");
  }

  if (documentData.backupFormat !== BACKUP_FORMAT_ID) {
    throw new Error("Dit bestand is niet gemaakt door de back-upfunctie van Unfold Yourself.");
  }

  if (documentData.backupVersion !== BACKUP_FORMAT_VERSION) {
    throw new Error("Deze back-upversie wordt nog niet ondersteund.");
  }

  return {
    exportedAt:
      typeof documentData.exportedAt === "string"
        ? documentData.exportedAt
        : null,
    state: normalizeBackupState(documentData.data)
  };
}

function createBackupFilename() {
  const now = new Date();

  const pad = value =>
    String(value).padStart(2, "0");

  const datePart = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate())
  ].join("-");

  const timePart = [
    pad(now.getHours()),
    pad(now.getMinutes())
  ].join("");

  return `Unfold-Yourself-backup-${datePart}-${timePart}.json`;
}

function triggerBackupDownload(profileState) {
  const backupDocument =
    createBackupDocument(profileState);

  const fileContent =
    JSON.stringify(backupDocument, null, 2);

  const fileBlob = new Blob(
    [fileContent],
    { type: "application/json;charset=utf-8" }
  );

  const objectUrl =
    URL.createObjectURL(fileBlob);

  const downloadLink =
    document.createElement("a");

  downloadLink.href = objectUrl;
  downloadLink.download = createBackupFilename();
  downloadLink.hidden = true;

  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();

  window.setTimeout(
    () => URL.revokeObjectURL(objectUrl),
    0
  );
}

function replaceProfileState(targetState, sourceState) {
  targetState.completedTests.splice(
    0,
    targetState.completedTests.length,
    ...sourceState.completedTests
  );

  targetState.activeTests =
    cloneBackupValue(sourceState.activeTests);

  targetState.results =
    cloneBackupValue(sourceState.results);

  targetState.responseBank =
    cloneBackupValue(sourceState.responseBank);
}

function initializeBackupManager(options) {
  const {
    state,
    persistState,
    onRestored,
    showMessage,
    closeDialog
  } = options || {};

  const downloadButton =
    document.querySelector("#downloadBackupButton");

  const importButton =
    document.querySelector("#importBackupButton");

  const fileInput =
    document.querySelector("#backupFileInput");

  if (
    !downloadButton ||
    !importButton ||
    !fileInput ||
    !state ||
    typeof persistState !== "function"
  ) {
    console.warn(
      "Back-upbeheer kon niet worden geïnitialiseerd."
    );
    return;
  }

  if (downloadButton.dataset.backupInitialized === "true") {
    return;
  }

  downloadButton.dataset.backupInitialized = "true";

  downloadButton.addEventListener("click", () => {
    try {
      persistState();
      triggerBackupDownload(state);

      if (typeof showMessage === "function") {
        showMessage("Back-upbestand is gedownload.");
      }
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "De back-up kon niet worden gedownload."
      );
    }
  });

  importButton.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", async () => {
    const [selectedFile] = fileInput.files || [];

    if (!selectedFile) {
      return;
    }

    try {
      if (selectedFile.size > MAX_BACKUP_FILE_SIZE) {
        throw new Error(
          "Het gekozen back-upbestand is onverwacht groot en wordt niet geopend."
        );
      }

      const fileText =
        await selectedFile.text();

      const parsedBackup =
        parseBackupDocument(fileText);

      const completedCount =
        parsedBackup.state.completedTests.length;

      const activeCount =
        Object.keys(
          parsedBackup.state.activeTests
        ).length;

      const confirmed = window.confirm(
        [
          "Wil je deze back-up herstellen?",
          "",
          `Voltooide testen in back-up: ${completedCount}`,
          `Testen in uitvoering in back-up: ${activeCount}`,
          "",
          "De huidige lokale voortgang en resultaten worden vervangen."
        ].join("\n")
      );

      if (!confirmed) {
        return;
      }

      replaceProfileState(
        state,
        parsedBackup.state
      );

      localStorage.removeItem(
        LEGACY_PROFILE_STORAGE_KEY
      );

      persistState();

      if (typeof onRestored === "function") {
        onRestored(parsedBackup);
      }

      if (typeof closeDialog === "function") {
        closeDialog();
      }

      if (typeof showMessage === "function") {
        showMessage(
          "Back-up is hersteld."
        );
      }
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "De back-up kon niet worden hersteld."
      );
    } finally {
      fileInput.value = "";
    }
  });
}
