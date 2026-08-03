"use strict";

const LEADERSHIP_TEST_ID = "samenwerking::Leiderschapstest";
const LEADERSHIP_SCHEMA_VERSION = 1;
const LEADERSHIP_CONTENT_VERSION = 1;
const LEADERSHIP_SCORING_VERSION = 1;

const LEADERSHIP_MODULES = Object.freeze([
  {
    id: "situational",
    title: "Situationeel leidinggeven",
    description: "Twintig praktijksituaties over richting geven, begeleiden, steunen en delegeren.",
    questionCount: 20,
    estimatedTime: "Ongeveer 7–10 minuten"
  },
  {
    id: "styles",
    title: "Natuurlijke leiderschapsstijlen",
    description: "Zestig gedragsstellingen over twaalf verschillende leiderschapsstijlen.",
    questionCount: 60,
    estimatedTime: "Ongeveer 11–15 minuten"
  }
]);

function createLeadershipModuleState(moduleId) {
  return {
    moduleId,
    status: "not-started",
    currentIndex: 0,
    startedAt: null,
    completedAt: null
  };
}

function getLeadershipModule(moduleId) {
  return LEADERSHIP_MODULES.find(module => module.id === moduleId) || null;
}

function getLeadershipModuleQuestions(moduleId) {
  if (moduleId === "situational") return LEADERSHIP_SCENARIOS;
  if (moduleId === "styles") return LEADERSHIP_STYLE_QUESTIONS;
  return [];
}

function createLeadershipSession({ startedAt = new Date().toISOString() } = {}) {
  const moduleStates = {};
  LEADERSHIP_MODULES.forEach(module => {
    moduleStates[module.id] = createLeadershipModuleState(module.id);
  });

  return {
    schemaVersion: LEADERSHIP_SCHEMA_VERSION,
    contentVersion: LEADERSHIP_CONTENT_VERSION,
    scoringVersion: LEADERSHIP_SCORING_VERSION,
    currentQuestionIndex: 0,
    answers: {},
    answerMeta: {},
    workspaceView: "dashboard",
    selectedModuleId: null,
    moduleStates,
    startedAt,
    updatedAt: startedAt
  };
}

function getLeadershipModuleState(session, moduleId) {
  if (!session.moduleStates || typeof session.moduleStates !== "object") {
    session.moduleStates = {};
  }

  if (!session.moduleStates[moduleId]) {
    session.moduleStates[moduleId] = createLeadershipModuleState(moduleId);
  }

  return session.moduleStates[moduleId];
}

function getLeadershipAnsweredCount(session, moduleId) {
  return getLeadershipModuleQuestions(moduleId).filter(question =>
    Object.prototype.hasOwnProperty.call(session.answers || {}, question.id)
  ).length;
}

function isLeadershipModuleComplete(session, moduleId) {
  const questions = getLeadershipModuleQuestions(moduleId);
  return questions.length > 0 && questions.every(question =>
    Object.prototype.hasOwnProperty.call(session.answers || {}, question.id)
  );
}

function areAllLeadershipModulesComplete(session) {
  return LEADERSHIP_MODULES.every(module => isLeadershipModuleComplete(session, module.id));
}

function normalizeLeadershipSession(session) {
  const normalized = session && typeof session === "object"
    ? session
    : createLeadershipSession();

  normalized.schemaVersion = LEADERSHIP_SCHEMA_VERSION;
  normalized.contentVersion = LEADERSHIP_CONTENT_VERSION;
  normalized.scoringVersion = LEADERSHIP_SCORING_VERSION;
  normalized.currentQuestionIndex = 0;
  normalized.answers = normalized.answers && typeof normalized.answers === "object" ? normalized.answers : {};
  normalized.answerMeta = normalized.answerMeta && typeof normalized.answerMeta === "object" ? normalized.answerMeta : {};
  normalized.moduleStates = normalized.moduleStates && typeof normalized.moduleStates === "object" ? normalized.moduleStates : {};
  normalized.workspaceView = ["dashboard", "module-question", "module-complete"].includes(normalized.workspaceView)
    ? normalized.workspaceView
    : "dashboard";

  LEADERSHIP_MODULES.forEach(module => {
    const state = getLeadershipModuleState(normalized, module.id);
    const questions = getLeadershipModuleQuestions(module.id);
    state.currentIndex = Math.max(0, Math.min(Number(state.currentIndex) || 0, Math.max(0, questions.length - 1)));

    if (isLeadershipModuleComplete(normalized, module.id)) {
      state.status = "completed";
      state.completedAt = state.completedAt || new Date().toISOString();
    } else if (getLeadershipAnsweredCount(normalized, module.id) > 0) {
      state.status = "in-progress";
    } else {
      state.status = "not-started";
      state.currentIndex = 0;
      state.completedAt = null;
    }
  });

  if (!getLeadershipModule(normalized.selectedModuleId)) {
    normalized.selectedModuleId = null;
    normalized.workspaceView = "dashboard";
  }

  normalized.startedAt = normalized.startedAt || new Date().toISOString();
  normalized.updatedAt = normalized.updatedAt || normalized.startedAt;
  return normalized;
}

function resetLeadershipModule(session, moduleId) {
  getLeadershipModuleQuestions(moduleId).forEach(question => {
    delete session.answers[question.id];
    delete session.answerMeta[question.id];
  });

  session.moduleStates[moduleId] = createLeadershipModuleState(moduleId);
  session.selectedModuleId = moduleId;
  session.workspaceView = "module-question";
  session.updatedAt = new Date().toISOString();
  return normalizeLeadershipSession(session);
}

function createLeadershipSessionFromResult(result, moduleId) {
  const session = createLeadershipSession({
    startedAt: result?.startedAt || new Date().toISOString()
  });

  session.answers = result?.answers && typeof result.answers === "object"
    ? { ...result.answers }
    : {};
  session.answerMeta = result?.answerMeta && typeof result.answerMeta === "object"
    ? { ...result.answerMeta }
    : {};

  LEADERSHIP_MODULES.forEach(module => {
    const complete = getLeadershipModuleQuestions(module.id).every(question =>
      Object.prototype.hasOwnProperty.call(session.answers, question.id)
    );
    session.moduleStates[module.id] = {
      moduleId: module.id,
      status: complete ? "completed" : "not-started",
      currentIndex: 0,
      startedAt: complete ? result?.startedAt || session.startedAt : null,
      completedAt: complete ? result?.completedAt || null : null
    };
  });

  return resetLeadershipModule(session, moduleId);
}

function prepareLeadershipStoredState({ state, testId }) {
  if (state.activeTests?.[testId]) {
    state.activeTests[testId] = normalizeLeadershipSession(state.activeTests[testId]);
  }
}
