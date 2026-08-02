"use strict";

const WORK_VALUES_TEST_ID = "werkorientatie::Werkwaarden- en werkmotivatietest";
const WORK_VALUES_SCHEMA_VERSION = 2;

function validateWorkValuesData() {
  const questions = window.WORK_VALUES_QUESTIONS || [];
  const dimensions = window.WORK_VALUES_DIMENSIONS || [];
  const choices = window.WORK_VALUES_CHOICES || [];
  const problems = [];
  const ids = new Set();
  const texts = new Set();
  const counts = {};
  const facetCounts = {};

  questions.forEach(question => {
    if (!question?.id || ids.has(question.id)) {
      problems.push(`ongeldig of dubbel vraag-ID: ${question?.id || "ontbreekt"}`);
    }
    ids.add(question?.id);

    const normalizedText = String(question?.text || "").trim().toLocaleLowerCase("nl-BE");
    if (!normalizedText || texts.has(normalizedText)) {
      problems.push(`lege of dubbele vraagtekst: ${question?.id || "onbekend"}`);
    }
    texts.add(normalizedText);

    counts[question.dimension] = (counts[question.dimension] || 0) + 1;
    const facetKey = `${question.dimension}:${question.facet}`;
    facetCounts[facetKey] = (facetCounts[facetKey] || 0) + 1;
  });

  if (questions.length !== 45) problems.push(`verwacht 45 vragen, geladen: ${questions.length}`);
  if (dimensions.length !== 9) problems.push(`verwacht 9 dimensies, geladen: ${dimensions.length}`);
  if (choices.length !== 5) problems.push(`verwacht 5 antwoordkeuzes, geladen: ${choices.length}`);

  dimensions.forEach(dimension => {
    if ((counts[dimension.id] || 0) !== 5) {
      problems.push(`${dimension.title}: verwacht 5 vragen, geladen ${counts[dimension.id] || 0}`);
    }
    if ((facetCounts[`${dimension.id}:value`] || 0) !== 2) {
      problems.push(`${dimension.title}: verwacht 2 werkwaarde-items`);
    }
    if ((facetCounts[`${dimension.id}:motivator`] || 0) !== 1) {
      problems.push(`${dimension.title}: verwacht 1 motivator-item`);
    }
    if ((facetCounts[`${dimension.id}:demotivator`] || 0) !== 2) {
      problems.push(`${dimension.title}: verwacht 2 demotivator-items`);
    }
  });

  if (problems.length > 0) {
    console.warn(`Werkwaarden- en werkmotivatietest: ${problems.join("; ")}.`);
    return false;
  }
  return true;
}

validateWorkValuesData();

function createWorkValuesSession({ startedAt }) {
  return {
    schemaVersion: WORK_VALUES_SCHEMA_VERSION,
    currentQuestionIndex: 0,
    answers: {},
    startedAt
  };
}

function prepareWorkValuesStoredState({ state, testId }) {
  const session = state.activeTests?.[testId];
  if (session && session.schemaVersion !== WORK_VALUES_SCHEMA_VERSION) {
    delete state.activeTests[testId];
  }

  const result = state.results?.[testId];
  if (result && result.schemaVersion !== WORK_VALUES_SCHEMA_VERSION) {
    delete state.results[testId];
    state.completedTests = (state.completedTests || []).filter(id => id !== testId);
  }
}

const WORK_VALUES_TEST_DEFINITION = {
  id: WORK_VALUES_TEST_ID,
  domainId: "werkorientatie",
  domainTitle: "Werkoriëntatie & beroepsrichting",
  title: "Werkwaarden- en werkmotivatietest",
  description: "Wat je in werk zoekt, waardeert en motiverend of demotiverend vindt.",
  estimatedTime: "Ongeveer 8 tot 12 minuten",
  resultType: "work-values-motivation-profile",
  mainScoreHeading: "Jouw belangrijkste werkdrijfveren",
  printReportSubtitle: "Werkwaarden- en werkmotivatieprofiel",
  schemaVersion: WORK_VALUES_SCHEMA_VERSION,
  questions: window.WORK_VALUES_QUESTIONS || [],
  choices: window.WORK_VALUES_CHOICES || [],
  createSession: createWorkValuesSession,
  prepareStoredState: prepareWorkValuesStoredState,
  getIntroQuestionCountText() {
    return "45 korte stellingen";
  },
  calculateResult: calculateWorkValuesResult,
  renderResultDetails: renderWorkValuesResult,
  evidence: window.WORK_VALUES_EVIDENCE || {}
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
  ? window.UNFOLD_TEST_DEFINITIONS
  : [];
window.UNFOLD_TEST_DEFINITIONS.push(WORK_VALUES_TEST_DEFINITION);
