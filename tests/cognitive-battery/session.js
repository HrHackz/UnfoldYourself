"use strict";

const COGNITIVE_BATTERY_TEST_ID = "denken::Cognitieve vaardigheidsbatterij";
const COGNITIVE_BATTERY_SCHEMA_VERSION = 1;
const COGNITIVE_MODULE_ORDER = Object.freeze([
  "numerical",
  "verbal",
  "abstractLogical",
  "spatial",
  "attentionWorkingMemory",
  "criticalData"
]);

function getCognitiveModuleDefinitions() {
  const source = window.COGNITIVE_BATTERY_MODULES || {};

  return COGNITIVE_MODULE_ORDER
    .map(moduleId => source[moduleId])
    .filter(Boolean);
}

function getCognitiveModuleDefinition(moduleId) {
  return getCognitiveModuleDefinitions().find(module => module.id === moduleId) || null;
}

function isCognitiveModuleAvailable(moduleId) {
  return getCognitiveModuleDefinition(moduleId)?.availability === "available";
}

function createCognitiveModuleState(status = "not-started") {
  return {
    status,
    scoringVersion: null,
    phase: "intro",
    currentItemIndex: 0,
    answers: {},
    responseTimes: {},
    exerciseCompleted: false,
    exerciseIndex: 0,
    exerciseAnswer: null,
    exerciseFeedback: null,
    startedAt: null,
    completedAt: null,
    result: null,
    activeItemStartedAt: null
  };
}

function createAttentionState(status = "not-started") {
  return {
    ...createCognitiveModuleState(status),
    phase: "intro",
    exerciseIndex: 0,
    exerciseSelections: [],
    exerciseFeedback: null,
    roundIndex: 0,
    roundResults: {},
    interruptedRoundIds: [],
    activeRoundId: null
  };
}

function createWorkingMemoryState(status = "not-started") {
  return {
    ...createCognitiveModuleState(status),
    phase: "intro",
    exerciseStage: "forward",
    exerciseAttempt: 0,
    exerciseResponse: [],
    exerciseFeedback: null,
    trialIndex: 0,
    trialResults: {},
    interruptedTrialIds: [],
    activeTrialId: null
  };
}

function normalizeCognitiveModuleState(existingState) {
  const defaults = createCognitiveModuleState();
  const source = existingState && typeof existingState === "object"
    ? existingState
    : {};
  const status = ["not-started", "in-progress", "completed"].includes(source.status)
    ? source.status
    : defaults.status;
  const phase = ["intro", "exercise", "items", "result"].includes(source.phase)
    ? source.phase
    : status === "completed"
      ? "result"
      : defaults.phase;

  return {
    ...defaults,
    ...source,
    status,
    scoringVersion: Number(source.scoringVersion) || null,
    phase,
    currentItemIndex: Math.max(0, Number(source.currentItemIndex) || 0),
    answers: source.answers && typeof source.answers === "object"
      ? { ...source.answers }
      : {},
    responseTimes: source.responseTimes && typeof source.responseTimes === "object"
      ? { ...source.responseTimes }
      : {},
    exerciseCompleted: Boolean(source.exerciseCompleted),
    exerciseIndex: Math.max(0, Number(source.exerciseIndex) || 0),
    exerciseAnswer: source.exerciseAnswer ?? null,
    exerciseFeedback: source.exerciseFeedback && typeof source.exerciseFeedback === "object"
      ? { ...source.exerciseFeedback }
      : null,
    result: source.result && typeof source.result === "object"
      ? { ...source.result }
      : null,
    activeItemStartedAt: null
  };
}

function normalizeAttentionState(existingState) {
  const defaults = createAttentionState();
  const source = existingState && typeof existingState === "object" ? existingState : {};
  const status = ["not-started", "in-progress", "completed"].includes(source.status)
    ? source.status
    : defaults.status;
  const phase = ["intro", "exercise", "rounds", "result"].includes(source.phase)
    ? source.phase
    : status === "completed" ? "result" : defaults.phase;

  return {
    ...defaults,
    ...source,
    status,
    phase,
    exerciseCompleted: Boolean(source.exerciseCompleted),
    exerciseIndex: Math.max(0, Math.min(1, Number(source.exerciseIndex) || 0)),
    exerciseSelections: Array.isArray(source.exerciseSelections)
      ? source.exerciseSelections.map(Number).filter(Number.isInteger)
      : [],
    exerciseFeedback: source.exerciseFeedback && typeof source.exerciseFeedback === "object"
      ? { ...source.exerciseFeedback }
      : null,
    roundIndex: Math.max(0, Number(source.roundIndex) || 0),
    roundResults: source.roundResults && typeof source.roundResults === "object"
      ? { ...source.roundResults }
      : {},
    interruptedRoundIds: Array.isArray(source.interruptedRoundIds)
      ? [...new Set(source.interruptedRoundIds.map(String))]
      : [],
    activeRoundId: typeof source.activeRoundId === "string" ? source.activeRoundId : null,
    result: source.result && typeof source.result === "object" ? { ...source.result } : null
  };
}

function normalizeWorkingMemoryState(existingState) {
  const defaults = createWorkingMemoryState();
  const source = existingState && typeof existingState === "object" ? existingState : {};
  const status = ["not-started", "in-progress", "completed"].includes(source.status)
    ? source.status
    : defaults.status;
  const phase = ["intro", "exercise", "trials", "result"].includes(source.phase)
    ? source.phase
    : status === "completed" ? "result" : defaults.phase;

  return {
    ...defaults,
    ...source,
    status,
    phase,
    exerciseCompleted: Boolean(source.exerciseCompleted),
    exerciseStage: ["forward", "backward"].includes(source.exerciseStage)
      ? source.exerciseStage
      : "forward",
    exerciseAttempt: Math.max(0, Number(source.exerciseAttempt) || 0),
    exerciseResponse: Array.isArray(source.exerciseResponse)
      ? source.exerciseResponse.map(Number).filter(Number.isInteger)
      : [],
    exerciseFeedback: source.exerciseFeedback && typeof source.exerciseFeedback === "object"
      ? { ...source.exerciseFeedback }
      : null,
    trialIndex: Math.max(0, Number(source.trialIndex) || 0),
    trialResults: source.trialResults && typeof source.trialResults === "object"
      ? { ...source.trialResults }
      : {},
    interruptedTrialIds: Array.isArray(source.interruptedTrialIds)
      ? [...new Set(source.interruptedTrialIds.map(String))]
      : [],
    activeTrialId: typeof source.activeTrialId === "string" ? source.activeTrialId : null,
    result: source.result && typeof source.result === "object" ? { ...source.result } : null
  };
}

function createCognitiveSession({ startedAt }) {
  return {
    schemaVersion: COGNITIVE_BATTERY_SCHEMA_VERSION,
    mode: null,
    selectedModules: [],
    moduleOrder: [],
    currentModuleId: null,
    currentSubtaskId: null,
    workspaceView: "setup",
    setupCompleted: false,
    currentQuestionIndex: 0,
    answers: {},
    moduleStates: {
      numerical: createCognitiveModuleState(),
      verbal: createCognitiveModuleState(),
      abstractLogical: createCognitiveModuleState(),
      spatial: createCognitiveModuleState(),
      attention: createAttentionState(),
      workingMemory: createWorkingMemoryState(),
      criticalData: createCognitiveModuleState()
    },
    moduleResults: {},
    startedAt,
    updatedAt: startedAt
  };
}

function normalizeCognitiveSelection(selection) {
  const safeSelection = selection && typeof selection === "object" ? selection : {};
  const requestedMode = ["full", "selected", "single"].includes(safeSelection.mode)
    ? safeSelection.mode
    : null;
  const requestedModules = Array.isArray(safeSelection.selectedModules)
    ? safeSelection.selectedModules.filter(moduleId => COGNITIVE_MODULE_ORDER.includes(moduleId))
    : [];
  const uniqueModules = [...new Set(requestedModules)];

  if (requestedMode === "full") {
    return { mode: "full", selectedModules: [...COGNITIVE_MODULE_ORDER] };
  }

  if (requestedMode === "single") {
    return { mode: "single", selectedModules: uniqueModules.slice(0, 1) };
  }

  return { mode: requestedMode, selectedModules: uniqueModules };
}

function applyCognitiveSelection(session, selection) {
  const normalized = normalizeCognitiveSelection(selection);

  session.mode = normalized.mode;
  session.selectedModules = [...normalized.selectedModules];
  session.moduleOrder = COGNITIVE_MODULE_ORDER.filter(moduleId =>
    normalized.selectedModules.includes(moduleId)
  );
  session.currentModuleId = session.currentModuleId && session.moduleOrder.includes(session.currentModuleId)
    ? session.currentModuleId
    : session.moduleOrder[0] || null;
  session.updatedAt = new Date().toISOString();

  return normalized;
}

function isCognitiveSelectionValid(selection) {
  const normalized = normalizeCognitiveSelection(selection);

  if (normalized.mode === "full") {
    return normalized.selectedModules.length === COGNITIVE_MODULE_ORDER.length;
  }

  if (normalized.mode === "single") {
    return normalized.selectedModules.length === 1;
  }

  if (normalized.mode === "selected") {
    return normalized.selectedModules.length >= 2;
  }

  return false;
}

function ensureCognitiveSessionShape(session) {
  if (!session || typeof session !== "object") {
    return null;
  }

  session.schemaVersion = COGNITIVE_BATTERY_SCHEMA_VERSION;
  session.answers = session.answers && typeof session.answers === "object" ? session.answers : {};
  session.moduleResults = session.moduleResults && typeof session.moduleResults === "object"
    ? session.moduleResults
    : {};
  session.moduleStates = session.moduleStates && typeof session.moduleStates === "object"
    ? session.moduleStates
    : {};

  ["numerical", "verbal", "abstractLogical", "spatial", "criticalData"].forEach(moduleId => {
    session.moduleStates[moduleId] = normalizeCognitiveModuleState(session.moduleStates[moduleId]);

    if (!session.moduleStates[moduleId].result && session.moduleResults[moduleId]) {
      session.moduleStates[moduleId].result = { ...session.moduleResults[moduleId] };
      session.moduleStates[moduleId].status = "completed";
      session.moduleStates[moduleId].phase = "result";
    }

    const definition = getCognitiveModuleDefinition(moduleId);
    const expectedVersion = Math.max(1, Number(definition?.scoringVersion) || 1);
    const moduleState = session.moduleStates[moduleId];
    const storedVersion = Math.max(
      1,
      Number(
        moduleState.scoringVersion ||
        moduleState.result?.scoringVersion ||
        session.moduleResults[moduleId]?.scoringVersion
      ) || 1
    );

    if (moduleState.status !== "not-started" && storedVersion !== expectedVersion) {
      session.moduleStates[moduleId] = {
        ...createCognitiveModuleState(),
        scoringVersion: expectedVersion
      };
      delete session.moduleResults[moduleId];
    } else if (moduleState.status !== "not-started") {
      moduleState.scoringVersion = expectedVersion;
    }
  });

  session.moduleStates.attention = normalizeAttentionState(session.moduleStates.attention);
  session.moduleStates.workingMemory = normalizeWorkingMemoryState(session.moduleStates.workingMemory);

  ["attention", "workingMemory"].forEach(moduleId => {
    if (!session.moduleStates[moduleId].result && session.moduleResults[moduleId]) {
      session.moduleStates[moduleId].result = { ...session.moduleResults[moduleId] };
      session.moduleStates[moduleId].status = "completed";
      session.moduleStates[moduleId].phase = "result";
    }
  });

  const normalizedSelection = applyCognitiveSelection(session, {
    mode: session.mode,
    selectedModules: session.selectedModules
  });

  session.setupCompleted = Boolean(session.setupCompleted) && isCognitiveSelectionValid(normalizedSelection);
  session.currentSubtaskId = ["attention", "workingMemory"].includes(session.currentSubtaskId)
    ? session.currentSubtaskId
    : null;
  session.workspaceView = ["setup", "dashboard", "module"].includes(session.workspaceView)
    ? session.workspaceView
    : session.setupCompleted ? "dashboard" : "setup";

  if (!session.setupCompleted) {
    session.workspaceView = "setup";
  }

  return session;
}

function getCognitiveCombinedModuleStatus(session) {
  const attention = session?.moduleStates?.attention || createAttentionState();
  const workingMemory = session?.moduleStates?.workingMemory || createWorkingMemoryState();
  const completed = attention.status === "completed" && workingMemory.status === "completed";
  const started = attention.status !== "not-started" || workingMemory.status !== "not-started";

  return {
    status: completed ? "completed" : started ? "in-progress" : "not-started",
    attention,
    workingMemory
  };
}

function getCognitiveModuleState(session, moduleId) {
  if (!session?.moduleStates) {
    return null;
  }

  if (moduleId === "attentionWorkingMemory") {
    return getCognitiveCombinedModuleStatus(session);
  }

  return session.moduleStates[moduleId] || null;
}

function openCognitiveModule(session, moduleId) {
  if (!session || !isCognitiveModuleAvailable(moduleId)) {
    return false;
  }

  if (moduleId !== "attentionWorkingMemory" && !getCognitiveModuleState(session, moduleId)) {
    return false;
  }

  session.currentModuleId = moduleId;
  session.currentSubtaskId = null;
  session.workspaceView = "module";
  session.updatedAt = new Date().toISOString();
  return true;
}

function showCognitiveDashboard(session) {
  if (!session) {
    return;
  }

  session.workspaceView = "dashboard";
  session.currentModuleId = null;
  session.currentSubtaskId = null;
  session.updatedAt = new Date().toISOString();
}

function resetCognitiveSubtask(session, subtaskId) {
  if (!session?.moduleStates) {
    return false;
  }

  if (subtaskId === "attention") {
    session.moduleStates.attention = createAttentionState();
  } else if (subtaskId === "workingMemory") {
    session.moduleStates.workingMemory = createWorkingMemoryState();
  } else {
    return false;
  }

  delete session.moduleResults[subtaskId];
  session.currentModuleId = "attentionWorkingMemory";
  session.currentSubtaskId = subtaskId;
  session.workspaceView = "module";
  session.updatedAt = new Date().toISOString();
  return true;
}

function resetCognitiveModule(session, moduleId) {
  if (!session?.moduleStates) {
    return false;
  }

  if (moduleId === "attentionWorkingMemory") {
    session.moduleStates.attention = createAttentionState();
    session.moduleStates.workingMemory = createWorkingMemoryState();
    delete session.moduleResults.attention;
    delete session.moduleResults.workingMemory;
  } else if (session.moduleStates[moduleId]) {
    const expectedVersion = Math.max(
      1,
      Number(getCognitiveModuleDefinition(moduleId)?.scoringVersion) || 1
    );
    session.moduleStates[moduleId] = {
      ...createCognitiveModuleState(),
      scoringVersion: expectedVersion
    };
    delete session.moduleResults[moduleId];
  } else {
    return false;
  }

  session.currentModuleId = moduleId;
  session.workspaceView = "module";
  session.updatedAt = new Date().toISOString();
  return true;
}

function createCognitiveSessionFromStoredResult(storedResult) {
  const now = new Date().toISOString();
  const session = createCognitiveSession({
    startedAt: storedResult?.completedAt || now
  });

  applyCognitiveSelection(session, {
    mode: "full",
    selectedModules: [...COGNITIVE_MODULE_ORDER]
  });
  session.setupCompleted = true;
  session.workspaceView = "dashboard";
  session.currentModuleId = null;
  session.currentSubtaskId = null;

  const storedModuleResults = storedResult?.moduleResults && typeof storedResult.moduleResults === "object"
    ? storedResult.moduleResults
    : {};

  Object.entries(storedModuleResults).forEach(([moduleId, result]) => {
    if (!result || typeof result !== "object" || moduleId === "criticalData") {
      return;
    }

    session.moduleResults[moduleId] = { ...result };

    if (moduleId === "attention") {
      session.moduleStates.attention = {
        ...createAttentionState("completed"),
        phase: "result",
        completedAt: result.completedAt || now,
        result: { ...result }
      };
      return;
    }

    if (moduleId === "workingMemory") {
      session.moduleStates.workingMemory = {
        ...createWorkingMemoryState("completed"),
        phase: "result",
        completedAt: result.completedAt || now,
        result: { ...result }
      };
      return;
    }

    if (session.moduleStates[moduleId]) {
      session.moduleStates[moduleId] = {
        ...createCognitiveModuleState("completed"),
        scoringVersion: Number(result.scoringVersion) || 1,
        phase: "result",
        completedAt: result.completedAt || now,
        result: { ...result }
      };
    }
  });

  session.moduleStates.criticalData = {
    ...createCognitiveModuleState(),
    scoringVersion: Math.max(
      1,
      Number(getCognitiveModuleDefinition("criticalData")?.scoringVersion) || 1
    )
  };
  session.updatedAt = now;
  return session;
}

function prepareCognitiveStoredState({ state, testId }) {
  const activeSession = state.activeTests?.[testId];

  if (activeSession) {
    if (activeSession.schemaVersion !== COGNITIVE_BATTERY_SCHEMA_VERSION) {
      delete state.activeTests[testId];
    } else {
      ensureCognitiveSessionShape(activeSession);
    }
  }

  const storedResult = state.results?.[testId];
  const expectedCriticalVersion = Math.max(
    1,
    Number(getCognitiveModuleDefinition("criticalData")?.scoringVersion) || 1
  );
  const storedCriticalVersion = Math.max(
    1,
    Number(storedResult?.moduleResults?.criticalData?.scoringVersion) || 1
  );
  const invalidSchema = Boolean(
    storedResult && storedResult.schemaVersion !== COGNITIVE_BATTERY_SCHEMA_VERSION
  );
  const outdatedCriticalResult = Boolean(
    storedResult && storedCriticalVersion !== expectedCriticalVersion
  );

  if (invalidSchema) {
    delete state.results[testId];
    state.completedTests = (state.completedTests || []).filter(id => id !== testId);
    return;
  }

  if (outdatedCriticalResult) {
    state.activeTests = state.activeTests && typeof state.activeTests === "object"
      ? state.activeTests
      : {};
    state.activeTests[testId] = createCognitiveSessionFromStoredResult(storedResult);
    delete state.results[testId];
    state.completedTests = (state.completedTests || []).filter(id => id !== testId);
  }
}
