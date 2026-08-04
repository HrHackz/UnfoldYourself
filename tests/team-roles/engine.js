"use strict";

const TEAM_ROLE_SCHEMA_VERSION = 1;

function validateTeamRoleData() {
  const questions = window.TEAM_ROLE_QUESTIONS || [];
  const roles = window.TEAM_ROLE_DEFINITIONS || [];
  const problems = [];
  const ids = new Set();
  const texts = new Set();
  const roleCounts = {};
  const sectionCounts = {};

  questions.forEach(question => {
    if (!question?.id || ids.has(question.id)) problems.push(`ongeldig of dubbel vraag-ID: ${question?.id || "ontbreekt"}`);
    ids.add(question?.id);

    const normalizedText = String(question?.text || "").trim().toLocaleLowerCase("nl-BE");
    if (!normalizedText || texts.has(normalizedText)) problems.push(`lege of dubbele vraagtekst: ${question?.id || "onbekend"}`);
    texts.add(normalizedText);

    roleCounts[question.roleId] = (roleCounts[question.roleId] || 0) + 1;
    sectionCounts[question.section] = (sectionCounts[question.section] || 0) + 1;
  });

  if (questions.length !== 72) problems.push(`verwacht 72 vragen, geladen: ${questions.length}`);
  if (roles.length !== 9) problems.push(`verwacht 9 rollen, geladen: ${roles.length}`);
  if ((sectionCounts.preference || 0) !== 27) problems.push(`verwacht 27 voorkeursitems`);
  if ((sectionCounts.characteristic || 0) !== 27) problems.push(`verwacht 27 gedragsitems`);
  if ((sectionCounts.quote || 0) !== 18) problems.push(`verwacht 18 uitspraken`);

  roles.forEach(role => {
    if ((roleCounts[role.id] || 0) !== 8) {
      problems.push(`${role.name}: verwacht 8 vragen, geladen ${roleCounts[role.id] || 0}`);
    }
  });

  if (problems.length > 0) {
    console.warn(`Teamrol- en samenwerkingsstijltest: ${problems.join("; ")}.`);
    return false;
  }
  return true;
}

validateTeamRoleData();

function createTeamRoleSession({ startedAt }) {
  return {
    schemaVersion: TEAM_ROLE_SCHEMA_VERSION,
    currentQuestionIndex: 0,
    answers: {},
    startedAt
  };
}

function prepareTeamRoleStoredState({ state, testId }) {
  const session = state.activeTests?.[testId];
  if (session && session.schemaVersion !== TEAM_ROLE_SCHEMA_VERSION) {
    delete state.activeTests[testId];
  }

  const result = state.results?.[testId];
  if (result && result.schemaVersion !== TEAM_ROLE_SCHEMA_VERSION) {
    delete state.results[testId];
    state.completedTests = (state.completedTests || []).filter(id => id !== testId);
  }
}

function getTeamRoleChoices(question) {
  return question?.section === "quote"
    ? window.TEAM_ROLE_CHOICES.quote
    : window.TEAM_ROLE_CHOICES.characteristic;
}

const TEAM_ROLE_TEST_DEFINITION = {
  id: window.TEAM_ROLE_TEST_ID,
  domainId: "samenwerking",
  domainTitle: "Samenwerking, leiderschap & cultuur",
  title: "Teamrol- en samenwerkingsstijltest",
  description: "Ontdek welke functionele bijdragen je van nature vaak levert binnen een team en welke rollen minder vanzelfsprekend voelen.",
  estimatedTime: "Ongeveer 10 tot 13 minuten",
  developmentStatus: "available",
  resultType: "team-role-profile",
  mainScoreHeading: "Sterkste aansluiting",
  printReportSubtitle: "Teamrol- en samenwerkingsstijlprofiel",
  schemaVersion: TEAM_ROLE_SCHEMA_VERSION,
  questions: window.TEAM_ROLE_QUESTIONS || [],
  getChoices: getTeamRoleChoices,
  createSession: createTeamRoleSession,
  prepareStoredState: prepareTeamRoleStoredState,
  calculateResult: calculateTeamRoleResult,
  renderResultDetails: renderTeamRoleReport,
  getIntroQuestionCountText() {
    return "72 vragen: voorkeuren, gedragskenmerken en typische uitspraken";
  },
  introGuidance: [
    "Antwoord vanuit hoe je doorgaans werkelijk samenwerkt, niet vanuit wat binnen jouw functie ideaal zou zijn.",
    "Denk aan verschillende teams en projecten, zodat één uitzonderlijke ervaring je antwoord niet bepaalt.",
    "Meerdere rollen kunnen sterk bij je aansluiten; het doel is niet om één vast teamtype toe te kennen."
  ],
  previewTitle: "Een gecombineerd teamrollenprofiel",
  previewItems: [
    "Je drie sterkst aansluitende teamrollen",
    "Een score en aansluitingsniveau voor alle negen rollen",
    "Kwaliteiten en mogelijke valkuilen bij overgebruik",
    "Samenwerkingsbehoeften en reacties op conflicten",
    "Interpretatie van de combinatie tussen je sterkste rollen"
  ],
  previewText: "De percentages zijn onafhankelijke aansluitingsscores en hoeven samen geen 100% te vormen.",
  evidence: window.TEAM_ROLE_EVIDENCE || {}
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
  ? window.UNFOLD_TEST_DEFINITIONS
  : [];
window.UNFOLD_TEST_DEFINITIONS.push(TEAM_ROLE_TEST_DEFINITION);
