"use strict";

/*
  Unfold Yourself — testdefinitie voor Deelidentiteiten- en kruispuntdenken.
  Afhankelijkheden: alle identity-intersectionality data- en testmodules.
*/

function getIdentityIntersectionalityChoices(question) {
  return getIdentityIntersectionalityChoiceSet(question);
}

const IDENTITY_INTERSECTIONALITY_TEST_DEFINITION = {
  id: "identiteit::Deelidentiteiten- en kruispuntdenkentest",
  domainId: "identiteit",
  domainTitle: "Identiteit & kruispuntdenken",
  title: "Deelidentiteiten- en kruispuntdenkentest",
  description:
    "Deze reflectietool onderzoekt 14 identiteits- en maatschappelijke assen met 42 vragen. Je ziet per as waar je relatief meer toegang of juist meer barrières ervaart en kunt de context spiegelen aan België, Europa en wereldwijd.",
  estimatedTime: "Ongeveer 8 tot 10 minuten",
  resultType: "identity-intersectionality-profile",
  mainScoreHeading: "Jouw identiteitslandschap",
  printReportSubtitle: "Deelidentiteiten- en kruispuntdenkenrapport",
  getChoices: getIdentityIntersectionalityChoices,
  calculateResult: calculateIdentityIntersectionalityResult,
  renderResultDetails: renderIdentityIntersectionalityProfile,
  evidence: {
    summary:
      "De tool is gebaseerd op intersectionele theorie van Kimberlé Crenshaw, Peggy McIntosh en Patricia Hill Collins, aangevuld met Belgische beleidsliteratuur en actuele equality data van onder meer Statbel, Unia, IGVM, Eurostat, FRA, World Bank, UNDP, UNESCO en ILO.",
    source:
      "Crenshaw (1989, 1991); McIntosh (1988/1989); Collins (1990); Celis, Outshoorn, Meier & Motmans (2012). Benchmarkgegevens zijn per as voorzien van organisatie, jaar, geografisch bereik en datakwaliteit.",
    disclaimer:
      "Dit is een educatieve zelfreflectietool. De 14 assen zijn een breed operationeel model, geen universeel vastgelegde lijst. Scores zijn transparante reflectie-indices, geen privilegescore, diagnose, bevolkingspercentiel of bewijs van discriminatie. Gevoelige antwoorden blijven lokaal in je browser, tenzij je zelf een niet-versleutelde back-up downloadt."
  },
  dimensions: (window.IDENTITY_INTERSECTIONALITY_AXES || []).map(axis => ({
    id: axis.id,
    label: axis.label
  })),
  questions: window.IDENTITY_INTERSECTIONALITY_QUESTIONS || []
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
  ? window.UNFOLD_TEST_DEFINITIONS
  : [];

window.UNFOLD_TEST_DEFINITIONS.push(IDENTITY_INTERSECTIONALITY_TEST_DEFINITION);
