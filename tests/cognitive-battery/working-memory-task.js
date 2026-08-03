"use strict";

window.COGNITIVE_WORKING_MEMORY_TASK_CONTRACT = Object.freeze({
  schemaVersion: 1,
  taskId: "workingMemory",
  status: "operational",
  positions: window.COGNITIVE_WORKING_MEMORY_POSITIONS || [],
  highlightDurationMs: 650,
  neutralIntervalMs: 250,
  responseDelayMs: 400,
  forwardTrialCount: 8,
  backwardTrialCount: 6,
  measures: [
    "exactForward",
    "exactBackward",
    "serialPositionAccuracy",
    "longestForwardSequence",
    "longestBackwardSequence",
    "responseTime"
  ]
});

function getWorkingMemoryTimings() {
  const data = window.COGNITIVE_WORKING_MEMORY_DATA || {};
  const fast = Boolean(window.__UNFOLD_TEST_FAST_TIMING__);
  return {
    highlightDurationMs: fast ? 35 : Number(data.highlightDurationMs || 650),
    neutralIntervalMs: fast ? 15 : Number(data.neutralIntervalMs || 250),
    responseDelayMs: fast ? 20 : Number(data.responseDelayMs || 400)
  };
}

function createWorkingMemoryBoard(onSelect) {
  const positions = window.COGNITIVE_WORKING_MEMORY_DATA?.positions || [];
  const board = createCognitiveElement("div", "cognitive-memory-board");
  board.setAttribute("aria-label", "Negen ruimtelijk verspreide antwoordposities");
  const buttons = new Map();

  positions.forEach(position => {
    const button = createCognitiveElement("button", "cognitive-memory-block");
    button.type = "button";
    button.dataset.positionId = String(position.id);
    button.style.left = `${position.x}%`;
    button.style.top = `${position.y}%`;
    button.setAttribute("aria-label", `Ruimtelijke positie ${position.id}`);
    button.disabled = true;
    button.addEventListener("click", () => {
      if (!button.disabled && typeof onSelect === "function") onSelect(position.id);
    });
    board.appendChild(button);
    buttons.set(position.id, button);
  });

  return { board, buttons };
}

function setMemoryBoardInteractive(buttons, enabled) {
  buttons.forEach(button => {
    button.disabled = !enabled;
    button.classList.toggle("is-answerable", enabled);
  });
}

function getWorkingMemoryExerciseTrial(state) {
  const practices = window.COGNITIVE_WORKING_MEMORY_DATA?.practices || [];
  if (state.exerciseStage === "backward") {
    return practices[state.exerciseAttempt > 0 ? 3 : 2] || practices[2];
  }
  return practices[state.exerciseAttempt > 0 ? 1 : 0] || practices[0];
}

function renderWorkingMemoryIntro(context, state) {
  const { container, interactionApi } = context;
  setCognitiveQuestionChrome({
    counter: "Werkgeheugen",
    percentage: 0,
    category: "Subtaak-introductie",
    title: "Werkgeheugen — Ruimtelijke reeksen",
    instruction: "Onthoud welke posities één voor één oplichten en reproduceer ze daarna in dezelfde of omgekeerde volgorde.",
    topbarLabel: "Werkgeheugen · voorbereiding"
  });

  const wrapper = createCognitiveElement("div", "cognitive-module-intro");
  const meta = createCognitiveElement("div", "cognitive-module-meta");
  meta.append(
    createCognitiveElement("span", "", "14 reeksen"),
    createCognitiveElement("span", "", "8 voorwaarts"),
    createCognitiveElement("span", "", "6 achterwaarts")
  );
  const preview = createWorkingMemoryBoard();
  preview.board.classList.add("is-preview");
  const list = createCognitiveElement("ul", "cognitive-purpose-list");
  [
    "Voorwaarts: tik de posities aan in dezelfde volgorde.",
    "Achterwaarts: begin met de positie die als laatste oplichtte.",
    "Tijdens de presentatie kun je niet klikken of pauzeren."
  ].forEach(text => list.appendChild(createCognitiveElement("li", "", text)));
  const boundary = createCognitiveElement("div", "cognitive-info-note");
  boundary.append(
    createCognitiveElement("strong", "", "Afbakening"),
    createCognitiveElement("span", "", "Deze korte taak is geen algemene geheugenmeting en zegt niets over langetermijngeheugen of een medische aandoening.")
  );
  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  const back = createCognitiveElement("button", "button button-secondary", "Terug naar beide subtaken");
  back.type = "button";
  back.addEventListener("click", () => {
    context.session.currentSubtaskId = null;
    interactionApi.save();
    interactionApi.rerender();
  });
  const start = createCognitiveElement("button", "button button-primary", "Start oefeningen");
  start.type = "button";
  start.addEventListener("click", () => {
    state.status = "in-progress";
    state.phase = "exercise";
    state.startedAt = state.startedAt || new Date().toISOString();
    state.exerciseStage = "forward";
    state.exerciseAttempt = 0;
    state.exerciseResponse = [];
    state.exerciseFeedback = null;
    interactionApi.save();
    interactionApi.rerender();
  });
  actions.append(back, start);
  wrapper.append(meta, preview.board, list, boundary, actions);
  container.appendChild(wrapper);
}

function playWorkingMemoryTrial({ trial, buttons, statusElement, onResponseReady, onInterrupted, interactionApi }) {
  const timings = getWorkingMemoryTimings();
  const timeoutIds = [];
  let cancelled = false;
  let totalDelay = 0;

  interactionApi.setNavigationLocked(true, "De ruimtelijke reeks wordt nu getoond.");
  setMemoryBoardInteractive(buttons, false);
  statusElement.textContent = "Kijk naar de oplichtende posities.";

  trial.sequence.forEach(positionId => {
    timeoutIds.push(window.setTimeout(() => {
      if (cancelled) return;
      const button = buttons.get(positionId);
      button?.classList.add("is-lit");
    }, totalDelay));
    totalDelay += timings.highlightDurationMs;
    timeoutIds.push(window.setTimeout(() => {
      if (cancelled) return;
      buttons.get(positionId)?.classList.remove("is-lit");
    }, totalDelay));
    totalDelay += timings.neutralIntervalMs;
  });

  timeoutIds.push(window.setTimeout(() => {
    if (cancelled) return;
    interactionApi.setNavigationLocked(false);
    setMemoryBoardInteractive(buttons, true);
    statusElement.textContent = trial.direction === "backward"
      ? "Tik de posities nu aan in omgekeerde volgorde."
      : "Tik de posities nu aan in dezelfde volgorde.";
    onResponseReady();
  }, totalDelay + timings.responseDelayMs));

  return reason => {
    cancelled = true;
    timeoutIds.forEach(window.clearTimeout);
    buttons.forEach(button => button.classList.remove("is-lit"));
    interactionApi.setNavigationLocked(false);
    if (typeof onInterrupted === "function") onInterrupted(reason);
  };
}

function renderMemoryInteractiveTrial(context, state, trial, options = {}) {
  const { container, interactionApi } = context;
  let response = [];
  let responseStartedAt = null;
  let finalized = false;
  let responseReady = false;
  const isExercise = Boolean(options.exercise);
  const totalLabel = isExercise ? "Oefening" : `Reeks ${state.trialIndex + 1} van 14`;

  setCognitiveQuestionChrome({
    counter: totalLabel,
    percentage: isExercise ? 0 : Math.round((state.trialIndex / 14) * 100),
    category: `${trial.direction === "backward" ? "Achterwaarts" : "Voorwaarts"} · lengte ${trial.sequence.length}`,
    title: "Onthoud de ruimtelijke reeks",
    instruction: trial.direction === "backward"
      ? "Tik na de presentatie de posities in omgekeerde volgorde aan."
      : "Tik na de presentatie de posities in dezelfde volgorde aan.",
    topbarLabel: `Werkgeheugen · ${trial.direction === "backward" ? "achterwaarts" : "voorwaarts"}`
  });

  const wrapper = createCognitiveElement("div", "cognitive-memory-task");
  const status = createCognitiveElement("p", "cognitive-memory-status", "De reeks wordt voorbereid.");
  status.setAttribute("aria-live", "polite");
  const { board, buttons } = createWorkingMemoryBoard(positionId => {
    if (!responseReady || response.length >= trial.sequence.length) return;
    response.push(positionId);
    updateResponseView();
  });
  const responseView = createCognitiveElement("div", "cognitive-memory-response");
  const dots = createCognitiveElement("div", "cognitive-memory-response-dots");
  const responseText = createCognitiveElement("span", "", `0 van ${trial.sequence.length} posities gekozen`);
  responseView.append(dots, responseText);
  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  const undo = createCognitiveElement("button", "button button-secondary", "Laatste verwijderen");
  undo.type = "button";
  undo.disabled = true;
  const submit = createCognitiveElement("button", "button button-primary", "Antwoord indienen");
  submit.type = "button";
  submit.disabled = true;
  actions.append(undo, submit);
  wrapper.append(status, board, responseView, actions);
  container.appendChild(wrapper);

  function updateResponseView() {
    dots.replaceChildren();
    for (let index = 0; index < trial.sequence.length; index += 1) {
      const dot = createCognitiveElement("span", "cognitive-memory-response-dot");
      dot.classList.toggle("is-filled", index < response.length);
      dots.appendChild(dot);
    }
    responseText.textContent = `${response.length} van ${trial.sequence.length} posities gekozen`;
    undo.disabled = response.length === 0;
    submit.disabled = response.length !== trial.sequence.length;
  }
  updateResponseView();

  undo.addEventListener("click", () => {
    response.pop();
    updateResponseView();
  });

  function finalizeResponse() {
    if (finalized || response.length !== trial.sequence.length) return;
    finalized = true;
    const expected = getWorkingMemoryExpectedSequence(trial);
    const correctPositions = expected.reduce((sum, value, index) => sum + (response[index] === value ? 1 : 0), 0);
    const exact = correctPositions === expected.length;
    const responseTimeMs = responseStartedAt ? Math.max(0, Date.now() - responseStartedAt) : 0;
    state.activeTrialId = null;

    if (isExercise) {
      state.exerciseResponse = [...response];
      state.exerciseFeedback = { exact, correctPositions, expected, response: [...response] };
    } else {
      state.trialResults[trial.id] = {
        completed: true,
        response: [...response],
        expected: [...expected],
        exact,
        correctPositions,
        responseTimeMs
      };
      state.trialIndex += 1;
      if (state.trialIndex >= 14) {
        state.result = calculateWorkingMemoryResult(state);
        state.status = "completed";
        state.phase = "result";
        state.completedAt = new Date().toISOString();
        context.session.moduleResults.workingMemory = { ...state.result };
      }
    }

    interactionApi.save();
    interactionApi.rerender();
  }
  submit.addEventListener("click", finalizeResponse);

  const cleanupPlayback = playWorkingMemoryTrial({
    trial,
    buttons,
    statusElement: status,
    interactionApi,
    onResponseReady() {
      responseReady = true;
      responseStartedAt = Date.now();
    },
    onInterrupted(reason) {
      if (!finalized && !["question-rendered"].includes(reason)) {
        state.activeTrialId = null;
        if (!isExercise) {
          state.interruptedTrialIds = [...new Set([...(state.interruptedTrialIds || []), trial.id])];
        }
        interactionApi.save();
      }
    }
  });
  interactionApi.registerCleanup(cleanupPlayback);
}

function renderWorkingMemoryExercise(context, state) {
  const { container, interactionApi } = context;
  const trial = getWorkingMemoryExerciseTrial(state);

  if (state.activeTrialId === trial.id && !state.exerciseFeedback) {
    renderMemoryInteractiveTrial(context, state, trial, { exercise: true });
    return;
  }

  setCognitiveQuestionChrome({
    counter: state.exerciseStage === "forward" ? "Voorwaartse oefening" : "Achterwaartse oefening",
    percentage: 0,
    category: "Oefening — telt niet mee",
    title: state.exerciseStage === "forward" ? "Dezelfde volgorde" : "Omgekeerde volgorde",
    instruction: "Start de korte reeks wanneer je klaar bent.",
    topbarLabel: `Werkgeheugen · oefening ${state.exerciseStage === "forward" ? "voorwaarts" : "achterwaarts"}`
  });

  const wrapper = createCognitiveElement("div", "cognitive-round-ready");
  const copy = state.exerciseStage === "forward"
    ? "Tik de posities na de presentatie in exact dezelfde volgorde aan."
    : "Tik eerst de positie aan die als laatste oplichtte en werk terug naar het begin.";
  wrapper.append(createCognitiveElement("p", "", copy));

  if (state.exerciseFeedback) {
    const feedback = state.exerciseFeedback;
    const note = createCognitiveElement(
      "div",
      `cognitive-exercise-feedback ${feedback.exact ? "is-correct" : "is-incorrect"}`
    );
    note.append(
      createCognitiveElement("strong", "", feedback.exact ? "Correct uitgevoerd" : "De volgorde was nog niet volledig correct"),
      createCognitiveElement("span", "", `${feedback.correctPositions} van ${feedback.expected.length} seriële posities correct.`)
    );
    wrapper.appendChild(note);
  }

  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  if (!state.exerciseFeedback) {
    const back = createCognitiveElement("button", "button button-secondary", "Terug naar beide subtaken");
    back.type = "button";
    back.addEventListener("click", () => {
      context.session.currentSubtaskId = null;
      interactionApi.save();
      interactionApi.rerender();
    });
    const start = createCognitiveElement("button", "button button-primary", "Toon oefenreeks");
    start.type = "button";
    start.addEventListener("click", () => {
      state.activeTrialId = trial.id;
      interactionApi.rerender();
    });
    actions.append(back, start);
  } else {
    const exact = state.exerciseFeedback.exact;
    const proceed = createCognitiveElement(
      "button",
      "button button-primary",
      exact
        ? state.exerciseStage === "forward" ? "Ga naar achterwaartse oefening" : "Start echte reeksen"
        : "Probeer een andere oefenreeks"
    );
    proceed.type = "button";
    proceed.addEventListener("click", () => {
      if (!exact) {
        state.exerciseAttempt = 1;
      } else if (state.exerciseStage === "forward") {
        state.exerciseStage = "backward";
        state.exerciseAttempt = 0;
      } else {
        state.exerciseCompleted = true;
        state.phase = "trials";
        state.trialIndex = 0;
      }
      state.exerciseResponse = [];
      state.exerciseFeedback = null;
      state.activeTrialId = null;
      interactionApi.save();
      interactionApi.rerender();
    });
    actions.appendChild(proceed);
  }
  wrapper.appendChild(actions);
  container.appendChild(wrapper);
}

function getEffectiveWorkingMemoryTrial(state, trialIndex) {
  const data = window.COGNITIVE_WORKING_MEMORY_DATA || {};
  const baseTrial = data.trials?.[trialIndex] || null;
  if (!baseTrial || !(state.interruptedTrialIds || []).includes(baseTrial.id)) {
    return { baseTrial, shownTrial: baseTrial };
  }
  const reserves = (data.reserveTrials || []).filter(trial =>
    trial.direction === baseTrial.direction && trial.sequence.length === baseTrial.sequence.length
  );
  return { baseTrial, shownTrial: reserves[0] || baseTrial };
}

function renderWorkingMemoryTrials(context, state) {
  const { container, interactionApi } = context;
  const trials = window.COGNITIVE_WORKING_MEMORY_DATA?.trials || [];

  if (state.trialIndex >= trials.length) {
    state.result = state.result || calculateWorkingMemoryResult(state);
    state.status = "completed";
    state.phase = "result";
    context.session.moduleResults.workingMemory = { ...state.result };
    interactionApi.save();
    interactionApi.rerender();
    return;
  }

  const { baseTrial, shownTrial } = getEffectiveWorkingMemoryTrial(state, state.trialIndex);
  if (state.activeTrialId === baseTrial.id) {
    const trialForDisplay = shownTrial.id === baseTrial.id
      ? baseTrial
      : { ...shownTrial, id: baseTrial.id };
    renderMemoryInteractiveTrial(context, state, trialForDisplay);
    return;
  }

  const directionChange = state.trialIndex === 8;
  setCognitiveQuestionChrome({
    counter: `Reeks ${state.trialIndex + 1} van 14`,
    percentage: Math.round((state.trialIndex / 14) * 100),
    category: `${baseTrial.direction === "backward" ? "Achterwaarts" : "Voorwaarts"} · lengte ${baseTrial.sequence.length}`,
    title: directionChange ? "Nu beginnen de achterwaartse reeksen" : "Klaar voor de volgende reeks?",
    instruction: "De presentatie start pas nadat je op Toon reeks klikt.",
    topbarLabel: `Werkgeheugen · reeks ${state.trialIndex + 1}`
  });

  const wrapper = createCognitiveElement("div", "cognitive-round-ready");
  wrapper.append(createCognitiveElement(
    "p",
    "",
    baseTrial.direction === "backward"
      ? "Onthoud de reeks en antwoord daarna van de laatste positie terug naar de eerste."
      : "Onthoud de reeks en tik de posities daarna in dezelfde volgorde aan."
  ));
  const progress = createCognitiveElement("div", "cognitive-info-note");
  progress.append(
    createCognitiveElement("strong", "", `${state.trialIndex} reeksen opgeslagen`),
    createCognitiveElement("span", "", "Je kunt veilig stoppen tussen twee reeksen.")
  );
  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  const back = createCognitiveElement("button", "button button-secondary", "Opslaan en terug naar subtaken");
  back.type = "button";
  back.addEventListener("click", () => {
    context.session.currentSubtaskId = null;
    interactionApi.save();
    interactionApi.rerender();
  });
  const start = createCognitiveElement("button", "button button-primary", "Toon reeks");
  start.type = "button";
  start.addEventListener("click", () => {
    state.activeTrialId = baseTrial.id;
    interactionApi.rerender();
  });
  actions.append(back, start);
  wrapper.append(progress, actions);
  container.appendChild(wrapper);
}

function renderWorkingMemoryResult(context, state) {
  const { container, interactionApi } = context;
  const result = state.result || calculateWorkingMemoryResult(state);
  state.result = result;
  context.session.moduleResults.workingMemory = { ...result };

  setCognitiveQuestionChrome({
    counter: "Werkgeheugen voltooid",
    percentage: 100,
    category: "Subtaakresultaat",
    title: "Werkgeheugen — Ruimtelijke reeksen",
    instruction: "Exacte reeksen en correcte seriële posities worden afzonderlijk weergegeven.",
    topbarLabel: "Werkgeheugen · resultaat"
  });

  const wrapper = createCognitiveElement("div", "cognitive-module-result");
  const metrics = createCognitiveElement("div", "cognitive-result-metrics");
  [
    [`${result.exactTotal}/14`, "Exact correcte reeksen"],
    [`${result.serialPositionAccuracy}%`, "Positionele nauwkeurigheid"],
    [`${result.exactForward}/8`, "Voorwaarts exact"],
    [`${result.exactBackward}/6`, "Achterwaarts exact"],
    [`${result.averageResponseTimeSeconds} s`, "Gemiddelde antwoordtijd"]
  ].forEach(([value, label]) => {
    const card = createCognitiveElement("div", "cognitive-result-metric");
    card.append(createCognitiveElement("strong", "", value), createCognitiveElement("span", "", label));
    metrics.appendChild(card);
  });
  const level = createCognitiveElement("div", "cognitive-info-note");
  level.append(createCognitiveElement("strong", "", result.level), createCognitiveElement("span", "", "Deze omschrijving geldt uitsluitend binnen deze eigen taak."));
  const detailGrid = createCognitiveElement("div", "cognitive-subtype-grid");
  [
    ["Voorwaartse reproductie", `${result.exactForward}/8 exact · ${result.forwardPositionAccuracy}% positioneel`, `Langste exacte reeks: ${result.longestForwardSequence}`],
    ["Achterwaartse reproductie", `${result.exactBackward}/6 exact · ${result.backwardPositionAccuracy}% positioneel`, `Langste exacte reeks: ${result.longestBackwardSequence}`]
  ].forEach(([title, score, detail]) => {
    const card = createCognitiveElement("article", "cognitive-subtype-card");
    card.append(createCognitiveElement("h3", "", title), createCognitiveElement("strong", "cognitive-subtype-score", score), createCognitiveElement("p", "", detail));
    detailGrid.appendChild(card);
  });
  const disclaimer = createCognitiveElement("div", "cognitive-info-note cognitive-warning-note");
  disclaimer.append(createCognitiveElement("strong", "", "Voorzichtige interpretatie"), createCognitiveElement("span", "", result.normDisclaimer));
  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  const overview = createCognitiveElement("button", "button button-secondary", "Terug naar beide subtaken");
  overview.type = "button";
  overview.addEventListener("click", () => {
    context.session.currentSubtaskId = null;
    interactionApi.save();
    interactionApi.rerender();
  });
  const restart = createCognitiveElement("button", "button button-primary", "Werkgeheugen opnieuw uitvoeren");
  restart.type = "button";
  restart.addEventListener("click", () => {
    resetCognitiveSubtask(context.session, "workingMemory");
    interactionApi.save();
    interactionApi.rerender();
  });
  actions.append(overview, restart);
  wrapper.append(metrics, level, detailGrid, disclaimer, actions);
  container.appendChild(wrapper);
}

function renderCognitiveWorkingMemorySubtask(context) {
  const state = context.session.moduleStates.workingMemory;
  context.interactionApi.configureNavigation({ previousHidden: true, nextHidden: true, saveExitHidden: true });

  if (state.status === "completed" || state.phase === "result") return renderWorkingMemoryResult(context, state);
  if (state.phase === "exercise") return renderWorkingMemoryExercise(context, state);
  if (state.phase === "trials") return renderWorkingMemoryTrials(context, state);
  return renderWorkingMemoryIntro(context, state);
}
