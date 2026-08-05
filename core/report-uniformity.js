"use strict";

/*
  Unfold Yourself — uniforme rapportpresentatie

  Deze laag wijzigt uitsluitend de visuele presentatie en volgorde van
  bestaande rapportblokken. Vragen, scoring, profielen, teksten en opslag
  blijven volledig in de afzonderlijke testmodules beheerd.
*/

const UNIFORM_REPORT_REFERENCE_TESTS = new Set([
  "samenwerking::Teamrol- en samenwerkingsstijltest",
  "samenwerking::Werkomgeving- en cultuurvoorkeurtest",
  "werkbeleving::Werkbelevings- en welzijnstest"
]);

const UNIFORM_REPORT_BLOCK_ORDER = {
  overview: 10,
  interpretation: 20,
  strengths: 30,
  details: 40,
  development: 50,
  action: 60,
  quality: 80,
  method: 90,
  other: 45
};

function getUniformReportCardLabel(card) {
  const label = card.querySelector(":scope > .result-card-label, .result-card-label");
  return (label?.textContent || "").trim().toLocaleLowerCase("nl-BE");
}

function includesUniformReportKeyword(value, keywords) {
  return keywords.some(keyword => value.includes(keyword));
}

function classifyUniformReportCard(card) {
  const label = getUniformReportCardLabel(card);
  const identity = `${card.id || ""} ${card.className || ""} ${label}`.toLocaleLowerCase("nl-BE");

  if (card.id === "resultStrengthsCard") return "strengths";
  if (card.id === "resultDevelopmentCard") return "development";
  if (card.id === "resultMeaningCard") return "interpretation";
  if (card.id === "resultAdviceCard") return "action";

  if (
    includesUniformReportKeyword(identity, ["interpretatievoorbehoud", "belangrijke interpretatienoot", "quality", "kwaliteit"])
  ) {
    return "quality";
  }

  if (
    includesUniformReportKeyword(identity, ["methodiek", "hoe de score", "wetenschappelijke basis", "veiligheidsgrenzen"])
  ) {
    return "method";
  }

  if (
    includesUniformReportKeyword(identity, ["sterkte", "sterkst", "topdrijfveren", "energiebronnen"])
  ) {
    return "strengths";
  }

  if (
    includesUniformReportKeyword(identity, ["ontwikkel", "groeikans", "minder vanzelfsprekende", "spanningen en bewuste keuzes"])
  ) {
    return "development";
  }

  if (
    includesUniformReportKeyword(identity, ["gecombineerde interpretatie", "geïntegreerde interpretatie", "samenhang", "interpretatie", "kruispunten", "betekenis"])
  ) {
    return "interpretation";
  }

  if (
    includesUniformReportKeyword(identity, ["volgende stap", "praktische", "kernadvies", "sollicitatiechecklist", "actie"])
  ) {
    return "action";
  }

  if (
    includesUniformReportKeyword(identity, [
      "jouw actuele profiel",
      "jouw cultuurmatch",
      "situationele flexibiliteit",
      "interesseprofiel",
      "zelfbeeld",
      "kernprofiel",
      "overzicht"
    ])
  ) {
    return "overview";
  }

  if (
    includesUniformReportKeyword(identity, [
      "volledig profiel",
      "alle negen",
      "twaalf leiderschapsstijlen",
      "vijf competentiegebieden",
      "beroepsrichtingen",
      "vaardighedeninventaris",
      "waardenhiërarchie",
      "fysieke werkomgeving",
      "cluster",
      "dimensie",
      "profiel"
    ])
  ) {
    return "details";
  }

  return "other";
}

function setUniformReportCardPresentation(card, testId) {
  const blockType = classifyUniformReportCard(card);
  card.dataset.reportBlock = blockType;
  card.classList.add("uy-report-card");

  const usesFullWidth =
    card.style.gridColumn === "1 / -1" ||
    card.matches(
      ".team-role-top-overview, .team-role-combination-card, .team-role-profiles-card, .team-role-lower-card, .team-role-method-card, .team-role-quality-note, .wec-report-card, .ww-report-card, .leadership-flexibility-card, .leadership-quality-note, .leadership-styles-report, .leadership-advice-card, .digital-skills-full-report"
    );

  card.classList.toggle("uy-report-card-full", usesFullWidth);

  if (!UNIFORM_REPORT_REFERENCE_TESTS.has(testId)) {
    card.style.order = String(UNIFORM_REPORT_BLOCK_ORDER[blockType] ?? UNIFORM_REPORT_BLOCK_ORDER.other);
  } else {
    card.style.removeProperty("order");
  }
}

function getUniformReportToggle(details, summary) {
  const existing = summary.querySelector(
    ".uy-report-toggle-label, .facet-item-toggle, .team-role-toggle, .leadership-style-toggle, .wec-culture-toggle, .ww-dimension-toggle"
  );

  if (existing) {
    existing.classList.add("uy-report-toggle-label");
    return existing;
  }

  const visibleTextNodes = Array.from(summary.childNodes).filter(node => {
    return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
  });

  if (
    summary.children.length === 0 &&
    visibleTextNodes.length > 0 &&
    /^(toon|verberg).*(uitleg|details)/i.test(summary.textContent.trim())
  ) {
    summary.replaceChildren();
  }

  const toggle = document.createElement("span");
  toggle.className = "uy-report-toggle-label";
  summary.appendChild(toggle);
  return toggle;
}

function updateUniformReportToggle(details, toggle) {
  toggle.textContent = details.open
    ? "Verberg volledige uitleg"
    : "Toon volledige uitleg";
}

function normalizeUniformReportDetails(root) {
  root.querySelectorAll("details").forEach(details => {
    const summary = details.querySelector(":scope > summary");
    if (!summary) return;

    details.classList.add("uy-report-details");
    summary.classList.add("uy-report-details-summary");

    const toggle = getUniformReportToggle(details, summary);
    updateUniformReportToggle(details, toggle);

    if (details.dataset.uniformReportToggleBound !== "true") {
      details.dataset.uniformReportToggleBound = "true";
      details.addEventListener("toggle", () => {
        updateUniformReportToggle(details, toggle);
      });
    }
  });
}

function normalizeUniformFacetToggle(root) {
  const button = root.querySelector("#facetToggleButton");
  const report = root.querySelector("#facetReport");
  if (!button || !report) return;

  button.classList.add("uy-report-section-toggle");

  const update = () => {
    const isCollapsed = report.classList.contains("is-collapsed");
    button.textContent = isCollapsed
      ? "Toon volledige uitleg"
      : "Verberg volledige uitleg";
  };

  update();

  if (button.dataset.uniformReportToggleBound !== "true") {
    button.dataset.uniformReportToggleBound = "true";
    button.addEventListener("click", update);
  }
}


function removeDuplicateUniformProgressTracks(root) {
  const cardSelectors = [
    ".dimension-card",
    ".cognitive-module-card",
    ".leadership-style-card",
    ".digital-skills-area-card",
    ".tr-coverage-item",
    ".tr-metric"
  ].join(",");

  root.querySelectorAll(cardSelectors).forEach(card => {
    const tracks = Array.from(
      card.querySelectorAll(
        ":scope > .dimension-bar, :scope > .facet-bar, :scope > .linear-progress, :scope > .tr-meter"
      )
    );

    const seen = new Set();
    tracks.forEach(track => {
      const key = Array.from(track.classList).sort().join(" ");
      if (seen.has(key)) {
        track.remove();
        return;
      }
      seen.add(key);
    });
  });
}

function normalizeUniformScoreCards(root) {
  root.querySelectorAll(".dimension-card").forEach(card => {
    card.classList.add("uy-uniform-score-card");
    card.classList.toggle(
      "uy-uniform-score-card-has-details",
      Boolean(card.querySelector(":scope > details"))
    );
  });
}

function applyUniformReportPresentation(result) {
  const root = document.getElementById("resultScreen");
  if (!root) return;

  const testId = result?.testId || "";
  root.classList.add("uy-report-uniform");
  root.dataset.reportTestId = testId;
  root.dataset.reportReference = String(UNIFORM_REPORT_REFERENCE_TESTS.has(testId));

  root.querySelectorAll(".result-content-card").forEach(card => {
    setUniformReportCardPresentation(card, testId);
  });

  const dimensions = root.querySelector("#resultDimensions");
  if (dimensions) dimensions.classList.add("uy-report-score-overview");

  const facetReportElement = root.querySelector("#facetReport");
  if (facetReportElement) facetReportElement.classList.add("uy-report-detail-section");

  const methodNote = root.querySelector("#resultMethodNote");
  if (methodNote) methodNote.classList.add("uy-report-method-section");

  normalizeUniformReportDetails(root);
  normalizeUniformFacetToggle(root);
  removeDuplicateUniformProgressTracks(root);
  normalizeUniformScoreCards(root);
}
