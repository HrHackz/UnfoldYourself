"use strict";

/* =========================================================
   UNFOLD YOURSELF — THEMAREGELING

   - Volgt de systeeminstelling wanneer nog geen keuze bestaat.
   - Bewaart een expliciete licht/donker-keuze uitsluitend lokaal.
   - Heeft geen toegang tot antwoorden, scores of rapportgegevens.
========================================================= */

(() => {
  const STORAGE_KEY = "unfold-yourself-theme";
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  function readStoredPreference() {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return value === LIGHT_THEME || value === DARK_THEME
        ? value
        : null;
    } catch (error) {
      return null;
    }
  }

  function resolveTheme(preference = readStoredPreference()) {
    if (preference === LIGHT_THEME || preference === DARK_THEME) {
      return preference;
    }

    return systemTheme.matches ? DARK_THEME : LIGHT_THEME;
  }

  function updateThemeColor(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
      meta.setAttribute(
        "content",
        theme === DARK_THEME ? "#252541" : "#F7EEE5"
      );
    }
  }

  function updateFavicon(theme) {
    const favicon = document.querySelector("#themeFavicon");

    if (!favicon) {
      return;
    }

    favicon.setAttribute(
      "href",
      theme === DARK_THEME
        ? "./icons/favicon-dark.svg"
        : "./icons/favicon-light.svg"
    );
  }


  function updateToggle(theme) {
    const button = document.querySelector("#themeToggleButton");

    if (!button) {
      return;
    }

    const isDark = theme === DARK_THEME;
    const nextLabel = isDark
      ? "Lichte modus inschakelen"
      : "Donkere modus inschakelen";

    button.setAttribute("aria-label", nextLabel);
    button.setAttribute("title", nextLabel);
    button.setAttribute("aria-pressed", String(isDark));
    button.dataset.currentTheme = theme;

    const modeText = button.querySelector(".theme-toggle-text");
    if (modeText) {
      modeText.textContent = isDark ? "Licht" : "Donker";
    }
  }

  function applyTheme(preference, options = {}) {
    const theme = resolveTheme(preference);

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    updateThemeColor(theme);
    updateFavicon(theme);
    updateToggle(theme);

    if (options.persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } catch (error) {
        /* De app blijft werken wanneer lokale opslag niet beschikbaar is. */
      }
    }

    document.dispatchEvent(
      new CustomEvent("unfold-theme-change", {
        detail: { theme }
      })
    );

    return theme;
  }

  /* Zo vroeg mogelijk uitvoeren om een zichtbare themaflits te beperken. */
  applyTheme(readStoredPreference());

  function initializeToggle() {
    const button = document.querySelector("#themeToggleButton");

    if (!button || button.dataset.themeReady === "true") {
      return;
    }

    button.dataset.themeReady = "true";
    updateToggle(resolveTheme());

    button.addEventListener("click", () => {
      const currentTheme = document.documentElement.dataset.theme;
      const nextTheme = currentTheme === DARK_THEME
        ? LIGHT_THEME
        : DARK_THEME;

      applyTheme(nextTheme, { persist: true });
    });

    requestAnimationFrame(() => {
      document.documentElement.classList.add("theme-ready");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeToggle, {
      once: true
    });
  } else {
    initializeToggle();
  }

  const onSystemThemeChange = () => {
    if (!readStoredPreference()) {
      applyTheme(null);
    }
  };

  if (typeof systemTheme.addEventListener === "function") {
    systemTheme.addEventListener("change", onSystemThemeChange);
  } else if (typeof systemTheme.addListener === "function") {
    systemTheme.addListener(onSystemThemeChange);
  }

  window.UnfoldYourselfTheme = Object.freeze({
    getTheme: () => resolveTheme(),
    setTheme: theme => {
      if (theme !== LIGHT_THEME && theme !== DARK_THEME) {
        throw new TypeError('Thema moet "light" of "dark" zijn.');
      }

      return applyTheme(theme, { persist: true });
    },
    useSystemTheme: () => {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        /* Geen actie nodig. */
      }

      return applyTheme(null);
    }
  });
})();
