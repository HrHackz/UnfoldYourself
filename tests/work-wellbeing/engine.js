"use strict";

const WORK_WELLBEING_SCHEMA_VERSION = 1;

function validateWorkWellbeingData() {
  const questions = window.WORK_WELLBEING_QUESTIONS || [];
  const dimensions = window.WORK_WELLBEING_DIMENSIONS || [];
  const statuses = window.WORK_WELLBEING_STATUSES || [];
  const problems = [];
  const ids = new Set();
  const dimensionCounts = {};

  questions.forEach(question => {
    if (!question?.id || ids.has(question.id)) problems.push(`ongeldig of dubbel vraag-ID: ${question?.id || "ontbreekt"}`);
    ids.add(question?.id);
    if (question.type === "frequency") {
      dimensionCounts[question.dimensionId] = (dimensionCounts[question.dimensionId] || 0) + 1;
      statuses.forEach(status => {
        if (!String(question.texts?.[status.id] || "").trim()) problems.push(`${question.id}: tekst ontbreekt voor ${status.id}`);
      });
    }
  });

  if (questions.length !== 31) problems.push(`verwacht 31 stappen inclusief statuutkeuze, geladen: ${questions.length}`);
  if (questions.filter(question => question.type === "status").length !== 1) problems.push("verwacht één statuutkeuze");
  if (questions.filter(question => question.type === "frequency").length !== 30) problems.push("verwacht 30 welzijnsvragen");
  if (dimensions.length !== 10) problems.push(`verwacht 10 dimensies, geladen: ${dimensions.length}`);
  if (statuses.length !== 5) problems.push(`verwacht 5 statuten, geladen: ${statuses.length}`);
  dimensions.forEach(dimension => {
    if ((dimensionCounts[dimension.id] || 0) !== 3) problems.push(`${dimension.label}: verwacht 3 vragen, geladen ${dimensionCounts[dimension.id] || 0}`);
  });

  if (problems.length) {
    console.warn(`Werkbelevings- en welzijnstest: ${problems.join("; ")}.`);
    return false;
  }
  return true;
}

validateWorkWellbeingData();

function createWorkWellbeingSession({ startedAt }) {
  return {
    schemaVersion: WORK_WELLBEING_SCHEMA_VERSION,
    currentQuestionIndex: 0,
    answers: {},
    answerMeta: {},
    statusSnapshot: null,
    statusChanges: 0,
    startedAt,
    updatedAt: startedAt
  };
}

function prepareWorkWellbeingStoredState({ state, testId }) {
  const session = state.activeTests?.[testId];
  if (session && session.schemaVersion !== WORK_WELLBEING_SCHEMA_VERSION) delete state.activeTests[testId];
  const result = state.results?.[testId];
  if (result && result.schemaVersion !== WORK_WELLBEING_SCHEMA_VERSION) {
    delete state.results[testId];
    state.completedTests = (state.completedTests || []).filter(id => id !== testId);
  }
}

function getWorkWellbeingSessionQuestions({ session }) {
  const selectedStatus = session?.answers?.["WW-STATUS"] || "employee";
  return (window.WORK_WELLBEING_QUESTIONS || []).map(question => {
    if (question.type !== "frequency") return question;
    return {
      ...question,
      text: question.texts?.[selectedStatus] || question.texts?.employee || "Vraagtekst niet beschikbaar."
    };
  });
}

function getWorkWellbeingChoices(question) {
  return question?.type === "status"
    ? window.WORK_WELLBEING_STATUS_CHOICES || []
    : window.WORK_WELLBEING_FREQUENCY_CHOICES || [];
}

function isValidWorkWellbeingAnswer(question, answer) {
  if (question?.type === "status") {
    return (window.WORK_WELLBEING_STATUSES || []).some(status => status.id === answer);
  }
  return Number.isInteger(Number(answer)) && Number(answer) >= 0 && Number(answer) <= 4;
}

function prepareNextWorkWellbeingQuestion({ session, currentQuestion }) {
  if (currentQuestion?.type !== "status") return {};
  const selectedStatus = session.answers?.["WW-STATUS"];
  if (session.statusSnapshot && session.statusSnapshot !== selectedStatus) {
    (window.WORK_WELLBEING_QUESTIONS || [])
      .filter(question => question.type === "frequency")
      .forEach(question => {
        delete session.answers[question.id];
        if (session.answerMeta) delete session.answerMeta[question.id];
      });
    session.statusChanges = (Number(session.statusChanges) || 0) + 1;
  }
  session.statusSnapshot = selectedStatus;
  return {};
}

function getWorkWellbeingProgress({ currentIndex }) {
  if (currentIndex === 0) {
    return {
      counter: "Voorbereiding",
      percentage: 3,
      label: "Kies je huidige situatie",
      nextLabel: "Start de 30 vragen"
    };
  }
  const questionNumber = currentIndex;
  return {
    counter: `Vraag ${questionNumber} van 30`,
    percentage: Math.round((questionNumber / 30) * 100),
    label: `Werkbeleving en welzijn · ${questionNumber} van 30`,
    nextLabel: questionNumber === 30 ? "Bekijk mijn resultaat" : "Volgende vraag"
  };
}

const WORK_WELLBEING_TEST_DEFINITION = {
  id: window.WORK_WELLBEING_TEST_ID,
  domainId: "werkbeleving",
  domainTitle: "Werkbeleving, welzijn & balans",
  title: "Werkbelevings- en welzijnstest",
  description: "Breng in kaart wat je momenteel energie geeft, waar druk ontstaat en welke hulpbronnen je ondersteunen.",
  estimatedTime: "Ongeveer 4 tot 5 minuten",
  developmentStatus: "available",
  resultType: "work-wellbeing-profile",
  mainScoreHeading: "Samenvattende werkbelevingsbalans",
  printReportSubtitle: "Actuele werkbeleving, welzijn en balans",
  schemaVersion: WORK_WELLBEING_SCHEMA_VERSION,
  questions: window.WORK_WELLBEING_QUESTIONS || [],
  getSessionQuestions: getWorkWellbeingSessionQuestions,
  getChoices: getWorkWellbeingChoices,
  createSession: createWorkWellbeingSession,
  prepareStoredState: prepareWorkWellbeingStoredState,
  prepareNextQuestion: prepareNextWorkWellbeingQuestion,
  calculateResult: calculateWorkWellbeingResult,
  renderQuestionInput: renderWorkWellbeingQuestionInput,
  renderResultDetails: renderWorkWellbeingReport,
  isAnswerValid: isValidWorkWellbeingAnswer,
  getProgress: getWorkWellbeingProgress,
  getSavedProgressPercentage({ activeSession }) {
    const answered = Object.keys(activeSession?.answers || {}).length;
    return Math.round((answered / 31) * 100);
  },
  getIntroQuestionCountText() {
    return "30 vragen na een korte keuze van je huidige statuut";
  },
  introGuidance: [
    "Denk bij alle antwoorden aan de afgelopen vier weken.",
    "Kies eerst je huidige situatie; de vraagteksten en adviezen worden daarop afgestemd.",
    "Gebruik telkens één van de vijf grote antwoordknoppen: Nooit, Zelden, Soms, Vaak of Altijd.",
    "De test geeft een momentopname voor zelfreflectie en stelt geen medische of psychologische diagnose."
  ],
  previewTitle: "Een actueel welzijns- en werkbelevingsprofiel",
  previewItems: [
    "Tien afzonderlijke scores voor belasting, hulpbronnen, beleving, herstel en balans",
    "Een samenvattende, niet-genormeerde werkbelevingsbalans",
    "Belangrijke combinaties, zoals hoge druk met beperkt herstel",
    "Statuutafhankelijke interpretaties en concrete micro-adviezen",
    "Duidelijke veiligheidsgrenzen zonder diagnoseclaims"
  ],
  previewText: "Scores van 0 tot 100 tonen je positie op het theoretische bereik van de vragen. Het zijn geen percentielen of klinische normen.",
  evidence: window.WORK_WELLBEING_EVIDENCE || {}
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
  ? window.UNFOLD_TEST_DEFINITIONS
  : [];
window.UNFOLD_TEST_DEFINITIONS.push(WORK_WELLBEING_TEST_DEFINITION);
