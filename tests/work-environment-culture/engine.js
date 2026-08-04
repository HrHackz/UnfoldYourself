"use strict";

const WEC_SCHEMA_VERSION = 1;

function validateWecData() {
  const questions = window.WEC_QUESTIONS || [];
  const ids = new Set();
  const problems = [];
  questions.forEach(question => {
    if (!question?.id || ids.has(question.id)) problems.push(`ongeldig of dubbel vraag-ID: ${question?.id || "ontbreekt"}`);
    ids.add(question?.id);
  });
  const cultureCount = questions.filter(question => question.type === "culture-distribution").length;
  const sliderCount = questions.filter(question => question.type === "bipolar-slider").length;
  const visualCount = questions.filter(question => question.type === "visual-cards").length;
  const choiceCount = questions.filter(question => question.type === "choice-cards").length;
  if (questions.length !== 11) problems.push(`verwacht 11 onderdelen, geladen: ${questions.length}`);
  if (cultureCount !== 6) problems.push(`verwacht 6 cultuurblokken, geladen: ${cultureCount}`);
  if (sliderCount !== 3) problems.push(`verwacht 3 omgevingssliders, geladen: ${sliderCount}`);
  if (visualCount !== 1 || choiceCount !== 1) problems.push("verwacht één interieurkeuze en één werkritmekeuze");
  questions.filter(question => question.type === "culture-distribution").forEach(question => {
    const optionIds = Object.keys(question.options || {});
    if ((window.WEC_CULTURE_ORDER || []).some(id => !optionIds.includes(id))) problems.push(`${question.id}: cultuurtekst ontbreekt`);
  });
  if (problems.length) {
    console.warn(`Werkomgeving- en cultuurvoorkeurtest: ${problems.join("; ")}.`);
    return false;
  }
  return true;
}

validateWecData();

function createWecSession({ startedAt }) {
  return {
    schemaVersion: WEC_SCHEMA_VERSION,
    currentQuestionIndex: 0,
    answers: {},
    answerMeta: {},
    startedAt,
    updatedAt: startedAt
  };
}

function prepareWecStoredState({ state, testId }) {
  const session = state.activeTests?.[testId];
  if (session && session.schemaVersion !== WEC_SCHEMA_VERSION) delete state.activeTests[testId];
  const result = state.results?.[testId];
  if (result && result.schemaVersion !== WEC_SCHEMA_VERSION) {
    delete state.results[testId];
    state.completedTests = (state.completedTests || []).filter(id => id !== testId);
  }
}

function getWecProgress({ currentIndex, question }) {
  if (question.type === "culture-distribution") {
    return {
      counter: `Cultuurblok ${question.sectionIndex} van 6`,
      percentage: Math.round(((currentIndex + 1) / 11) * 100),
      label: "Gewenste werkcultuur",
      nextLabel: question.sectionIndex === 6 ? "Naar mijn werkomgeving" : "Volgend cultuurblok"
    };
  }
  return {
    counter: `Werkomgeving ${question.sectionIndex} van 5`,
    percentage: Math.round(((currentIndex + 1) / 11) * 100),
    label: "Fysieke en logistieke werkomgeving",
    nextLabel: question.sectionIndex === 5 ? "Bekijk mijn resultaat" : "Volgende voorkeur"
  };
}

const WEC_TEST_DEFINITION = {
  id: window.WORK_ENVIRONMENT_CULTURE_TEST_ID,
  domainId: "samenwerking",
  domainTitle: "Samenwerking, leiderschap & cultuur",
  title: "Werkomgeving- en cultuurvoorkeurtest",
  description: "Ontdek welke organisatiecultuur, fysieke werkomgeving en werkvorm het sterkst aansluiten bij de manier waarop jij graag werkt.",
  estimatedTime: "Ongeveer 6 tot 7 minuten",
  developmentStatus: "available",
  resultType: "work-environment-culture-profile",
  mainScoreHeading: "Primaire cultuurvoorkeur",
  printReportSubtitle: "Werkomgeving- en cultuurvoorkeurprofiel",
  schemaVersion: WEC_SCHEMA_VERSION,
  questions: window.WEC_QUESTIONS || [],
  choices: [{ value: "custom", label: "Interactieve invoer" }],
  createSession: createWecSession,
  prepareStoredState: prepareWecStoredState,
  calculateResult: calculateWecResult,
  renderQuestionInput: renderWecQuestionInput,
  renderResultDetails: renderWecReport,
  isAnswerValid: isValidWecAnswer,
  getProgress: getWecProgress,
  getIntroQuestionCountText() {
    return "6 cultuurblokken en 5 voorkeuren voor je concrete werkomgeving";
  },
  introGuidance: [
    "Verdeel in het cultuurdeel per onderwerp exact 100 punten. Meer nadruk op één beschrijving betekent automatisch minder nadruk op andere beschrijvingen.",
    "Denk aan wat werkelijk bij je past, niet aan wat professioneel, modern of sociaal wenselijk zou moeten klinken.",
    "Je beoordeelt je ideale werkomgeving. De test meet niet hoe je huidige werkgever werkelijk functioneert.",
    "Iedere keuze wordt automatisch lokaal opgeslagen; je kunt tussentijds stoppen en later hervatten."
  ],
  previewTitle: "Een praktisch werkcultuur- en omgevingsprofiel",
  previewItems: [
    "Vier cultuurvoorkeuren die samen exact 100% vormen",
    "Je primaire, secundaire en minst aansluitende cultuur",
    "Voorkeuren voor organisatieschaal, ligging en directe omgeving",
    "Je gewenste kantoorinterieur en werkritme",
    "Energiegevers, mogelijke fricties en een sollicitatiechecklist"
  ],
  previewText: "Het resultaat is een persoonlijk voorkeursprofiel en geen objectieve beoordeling van een organisatie of garantie op werkgeluk.",
  evidence: window.WEC_EVIDENCE || {}
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
  ? window.UNFOLD_TEST_DEFINITIONS
  : [];
window.UNFOLD_TEST_DEFINITIONS.push(WEC_TEST_DEFINITION);
