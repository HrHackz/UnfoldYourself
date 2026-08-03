"use strict";

const DIGITAL_SKILLS_TEST_ID = "vaardigheden::Digitale skills";
const DIGITAL_SKILLS_SCHEMA_VERSION = 1;
const DIGITAL_SKILLS_CONTENT_VERSION = 1;
const DIGITAL_SKILLS_SCORING_VERSION = 1;
const DIGITAL_SKILLS_TRANSLATION_VERSION = 1;

function createDigitalSkillsAreaState(areaId) {
  return {
    areaId,
    status: "not-started",
    currentIndex: 0,
    startedAt: null,
    completedAt: null
  };
}

function createDigitalSkillsSession({ startedAt = new Date().toISOString() } = {}) {
  const areaStates = {};
  DIGITAL_SKILLS_AREAS.forEach(area => {
    areaStates[area.id] = createDigitalSkillsAreaState(area.id);
  });

  return {
    schemaVersion: DIGITAL_SKILLS_SCHEMA_VERSION,
    contentVersion: DIGITAL_SKILLS_CONTENT_VERSION,
    scoringVersion: DIGITAL_SKILLS_SCORING_VERSION,
    translationVersion: DIGITAL_SKILLS_TRANSLATION_VERSION,
    currentQuestionIndex: 0,
    answers: {},
    answerMeta: {},
    workspaceView: "dashboard",
    selectedAreaId: null,
    areaStates,
    areaResults: {},
    startedAt,
    updatedAt: startedAt
  };
}

function getDigitalSkillsArea(areaId) {
  return DIGITAL_SKILLS_AREAS.find(area => area.id === areaId) || null;
}

function getDigitalSkillsAreaQuestions(areaId) {
  return DIGITAL_SKILLS_QUESTIONS.filter(question => question.areaId === areaId);
}

function getDigitalSkillsAreaState(session, areaId) {
  if (!session.areaStates || typeof session.areaStates !== "object") {
    session.areaStates = {};
  }

  if (!session.areaStates[areaId]) {
    session.areaStates[areaId] = createDigitalSkillsAreaState(areaId);
  }

  return session.areaStates[areaId];
}

function getDigitalSkillsAnsweredCount(session, areaId) {
  const questions = getDigitalSkillsAreaQuestions(areaId);
  return questions.filter(question => Object.prototype.hasOwnProperty.call(session.answers || {}, question.id)).length;
}

function isDigitalSkillsAreaComplete(session, areaId) {
  const questions = getDigitalSkillsAreaQuestions(areaId);
  return questions.length > 0 && questions.every(question =>
    Object.prototype.hasOwnProperty.call(session.answers || {}, question.id)
  );
}

function normalizeDigitalSkillsSession(session) {
  const normalized = session && typeof session === "object"
    ? session
    : createDigitalSkillsSession();

  normalized.schemaVersion = DIGITAL_SKILLS_SCHEMA_VERSION;
  normalized.contentVersion = DIGITAL_SKILLS_CONTENT_VERSION;
  normalized.scoringVersion = DIGITAL_SKILLS_SCORING_VERSION;
  normalized.translationVersion = DIGITAL_SKILLS_TRANSLATION_VERSION;
  normalized.currentQuestionIndex = 0;
  normalized.answers = normalized.answers && typeof normalized.answers === "object" ? normalized.answers : {};
  normalized.answerMeta = normalized.answerMeta && typeof normalized.answerMeta === "object" ? normalized.answerMeta : {};
  normalized.areaResults = normalized.areaResults && typeof normalized.areaResults === "object" ? normalized.areaResults : {};
  normalized.areaStates = normalized.areaStates && typeof normalized.areaStates === "object" ? normalized.areaStates : {};
  normalized.workspaceView = ["dashboard", "area-question", "area-result"].includes(normalized.workspaceView)
    ? normalized.workspaceView
    : "dashboard";

  DIGITAL_SKILLS_AREAS.forEach(area => {
    const state = getDigitalSkillsAreaState(normalized, area.id);
    const questions = getDigitalSkillsAreaQuestions(area.id);
    state.currentIndex = Math.max(0, Math.min(Number(state.currentIndex) || 0, Math.max(0, questions.length - 1)));

    if (isDigitalSkillsAreaComplete(normalized, area.id)) {
      state.status = "completed";
      state.completedAt = state.completedAt || new Date().toISOString();
    } else if (getDigitalSkillsAnsweredCount(normalized, area.id) > 0) {
      state.status = "in-progress";
    } else {
      state.status = "not-started";
      state.currentIndex = 0;
      state.completedAt = null;
    }
  });

  if (!getDigitalSkillsArea(normalized.selectedAreaId)) {
    normalized.selectedAreaId = null;
    normalized.workspaceView = "dashboard";
  }

  normalized.updatedAt = normalized.updatedAt || new Date().toISOString();
  return normalized;
}

function resetDigitalSkillsArea(session, areaId) {
  getDigitalSkillsAreaQuestions(areaId).forEach(question => {
    delete session.answers[question.id];
    delete session.answerMeta[question.id];
  });

  session.areaStates[areaId] = createDigitalSkillsAreaState(areaId);
  delete session.areaResults[areaId];
  session.selectedAreaId = areaId;
  session.workspaceView = "area-question";
  session.updatedAt = new Date().toISOString();
  return session;
}

function createDigitalSkillsSessionFromResult(result, areaId) {
  const session = createDigitalSkillsSession({
    startedAt: result?.startedAt || new Date().toISOString()
  });

  session.answers = result?.answers && typeof result.answers === "object"
    ? { ...result.answers }
    : {};
  session.answerMeta = result?.answerMeta && typeof result.answerMeta === "object"
    ? { ...result.answerMeta }
    : {};
  session.areaResults = result?.areaResults && typeof result.areaResults === "object"
    ? JSON.parse(JSON.stringify(result.areaResults))
    : {};

  DIGITAL_SKILLS_AREAS.forEach(area => {
    const complete = getDigitalSkillsAreaQuestions(area.id).every(question =>
      Object.prototype.hasOwnProperty.call(session.answers, question.id)
    );
    session.areaStates[area.id] = {
      areaId: area.id,
      status: complete ? "completed" : "not-started",
      currentIndex: 0,
      startedAt: complete ? result?.startedAt || session.startedAt : null,
      completedAt: complete ? result?.areaResults?.[area.id]?.completedAt || result?.completedAt || null : null
    };
  });

  resetDigitalSkillsArea(session, areaId);
  return normalizeDigitalSkillsSession(session);
}

function prepareDigitalSkillsStoredState({ state, testId }) {
  if (state.activeTests?.[testId]) {
    state.activeTests[testId] = normalizeDigitalSkillsSession(state.activeTests[testId]);
  }
}
