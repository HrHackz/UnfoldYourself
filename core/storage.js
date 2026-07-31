"use strict";

/*
  Unfold Yourself — lokale opslag
  Afhankelijkheden: core/app-config.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

function loadState() {
  const fallback = {
    completedTests: [],
    activeTests: {},
    results: {},
    responseBank: {}
  };

  try {
    const currentValue =
      localStorage.getItem(
        PROFILE_STORAGE_KEY
      );

    const legacyValue =
      localStorage.getItem(
        LEGACY_PROFILE_STORAGE_KEY
      );

    const rawValue =
      currentValue ?? legacyValue;

    if (!rawValue) {
      return fallback;
    }

    const saved =
      JSON.parse(rawValue);

    if (
      !saved ||
      typeof saved !== "object"
    ) {
      return fallback;
    }

    const normalizedState = {
      completedTests:
        Array.isArray(
          saved.completedTests
        )
          ? saved.completedTests
          : [],

      activeTests:
        saved.activeTests &&
        typeof saved.activeTests ===
          "object"
          ? saved.activeTests
          : {},

      results:
        saved.results &&
        typeof saved.results ===
          "object"
          ? saved.results
          : {},

      responseBank:
        saved.responseBank &&
        typeof saved.responseBank ===
          "object"
          ? saved.responseBank
          : {}
    };

    if (
      !currentValue &&
      legacyValue
    ) {
      localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(
          normalizedState
        )
      );
    }

    return normalizedState;
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state));
}

