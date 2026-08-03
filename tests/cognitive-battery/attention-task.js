"use strict";

window.COGNITIVE_ATTENTION_TASK_CONTRACT = Object.freeze({
  schemaVersion: 1,
  taskId: "attention",
  status: "operational",
  targetCountPerRound: 5,
  cellCountPerRound: 30,
  operationalRoundCount: 12,
  reserveRoundCount: 6,
  roundDurationMs: 20000,
  measures: [
    "hits",
    "omissions",
    "commissions",
    "detectionRate",
    "selectionPrecision",
    "targetSelectionScore",
    "roundTime"
  ]
});

function getAttentionCodeDescription(code) {
  const direction = { V: "verticale", H: "horizontale", D: "diagonale" }[String(code).charAt(0)] || "onbekende";
  const dots = Number(String(code).charAt(1)) || 0;
  return `${direction} lijn met ${dots} ${dots === 1 ? "stip" : "stippen"}`;
}

function createAttentionSymbol(code, options = {}) {
  const symbol = document.createElement(options.button ? "button" : "span");
  symbol.className = "cognitive-attention-symbol";
  symbol.dataset.code = code;
  symbol.setAttribute("aria-label", getAttentionCodeDescription(code));

  if (options.button) {
    symbol.type = "button";
  }

  const line = document.createElement("span");
  line.className = `cognitive-attention-line is-${String(code).charAt(0).toLowerCase()}`;
  symbol.appendChild(line);

  const dotCount = Number(String(code).charAt(1)) || 0;
  for (let index = 0; index < dotCount; index += 1) {
    const dot = document.createElement("span");
    dot.className = `cognitive-attention-dot is-dot-${dotCount}-${index + 1}`;
    symbol.appendChild(dot);
  }

  return symbol;
}

function createAttentionTargetDisplay() {
  const wrapper = createCognitiveElement("div", "cognitive-attention-target");
  wrapper.append(
    createCognitiveElement("span", "", "Doelsymbool"),
    createAttentionSymbol("V2")
  );
  return wrapper;
}

function getAttentionEffectiveRound(state, roundIndex) {
  const data = window.COGNITIVE_ATTENTION_DATA;
  const baseRound = data?.operationalRounds?.[roundIndex] || null;

  if (!baseRound || !(state.interruptedRoundIds || []).includes(baseRound.id)) {
    return { baseRound, shownRound: baseRound };
  }

  const matchingReserves = (data.reserveRounds || []).filter(round => round.difficulty === baseRound.difficulty);
  const replacement = matchingReserves[roundIndex % Math.max(1, matchingReserves.length)] || baseRound;
  return { baseRound, shownRound: replacement };
}

function calculateAttentionRoundOutcome(round, selectedIndices, durationMs) {
  const selected = new Set(selectedIndices);
  const targets = new Set(round.targetIndices);
  const hits = [...selected].filter(index => targets.has(index)).length;
  const commissions = [...selected].filter(index => !targets.has(index)).length;
  const omissions = round.targetIndices.length - hits;

  return {
    completed: true,
    sourceRoundId: round.id,
    selectedIndices: [...selected].sort((a, b) => a - b),
    hits,
    omissions,
    commissions,
    durationMs: Math.max(0, Number(durationMs) || 0)
  };
}

function renderAttentionIntro(context, state) {
  const { container, interactionApi } = context;
  setCognitiveQuestionChrome({
    counter: "Aandacht",
    percentage: 0,
    category: "Subtaak-introductie",
    title: "Aandacht — Symboolselectie",
    instruction: "Selecteer in iedere ronde alle symbolen die exact overeenkomen met het zichtbare doelsymbool.",
    topbarLabel: "Aandacht · voorbereiding"
  });

  const wrapper = createCognitiveElement("div", "cognitive-module-intro");
  const meta = createCognitiveElement("div", "cognitive-module-meta");
  meta.append(
    createCognitiveElement("span", "", "12 rondes"),
    createCognitiveElement("span", "", "20 seconden per ronde"),
    createCognitiveElement("span", "", "2 oefeningen vooraf")
  );
  const target = createAttentionTargetDisplay();
  const list = createCognitiveElement("ul", "cognitive-purpose-list");
  [
    "Selecteer alleen de verticale lijn met exact twee stippen.",
    "Een verkeerde selectie telt als een commissie; een gemist doel als een omissie.",
    "Snel willekeurig aanklikken levert geen voordeel op."
  ].forEach(text => list.appendChild(createCognitiveElement("li", "", text)));
  const boundary = createCognitiveElement("div", "cognitive-info-note");
  boundary.append(
    createCognitiveElement("strong", "", "Afbakening"),
    createCognitiveElement("span", "", "Deze taak stelt geen diagnose en meet geen ADHD. Rondetijd wordt afzonderlijk van nauwkeurigheid gerapporteerd.")
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
    state.exerciseIndex = 0;
    state.exerciseSelections = [];
    state.exerciseFeedback = null;
    interactionApi.save();
    interactionApi.rerender();
  });
  actions.append(back, start);
  wrapper.append(meta, target, list, boundary, actions);
  container.appendChild(wrapper);
}

function renderAttentionGrid(round, selectedIndices, onToggle, feedback = null) {
  const grid = createCognitiveElement("div", "cognitive-attention-grid");
  const selected = new Set(selectedIndices);
  const targets = new Set(round.targetIndices);

  round.cells.forEach((code, index) => {
    const button = createAttentionSymbol(code, { button: true });
    button.classList.toggle("is-selected", selected.has(index));
    button.setAttribute("aria-pressed", String(selected.has(index)));

    if (feedback) {
      button.disabled = true;
      button.classList.toggle("is-correct-target", targets.has(index));
      button.classList.toggle("is-wrong-selection", selected.has(index) && !targets.has(index));
      button.classList.toggle("is-missed-target", targets.has(index) && !selected.has(index));
    } else {
      button.addEventListener("click", () => onToggle(index));
    }

    grid.appendChild(button);
  });

  return grid;
}

function renderAttentionExercise(context, state) {
  const { container, interactionApi } = context;
  const rounds = window.COGNITIVE_ATTENTION_DATA?.practiceRounds || [];
  const index = Math.min(state.exerciseIndex, rounds.length - 1);
  const round = rounds[index];

  if (!round) {
    state.exerciseCompleted = true;
    state.phase = "rounds";
    interactionApi.save();
    interactionApi.rerender();
    return;
  }

  setCognitiveQuestionChrome({
    counter: `Oefening ${index + 1} van 2`,
    percentage: 0,
    category: "Oefenronde — telt niet mee",
    title: "Selecteer alle doelsymbolen",
    instruction: index === 0
      ? "Deze eerste oefening heeft geen tijdslimiet. Controleer daarna je selectie."
      : "Werk nauwkeurig. Deze tweede oefening gebruikt dezelfde tijd als de echte rondes.",
    topbarLabel: `Aandacht · oefening ${index + 1}`
  });

  const wrapper = createCognitiveElement("div", "cognitive-attention-task");
  wrapper.appendChild(createAttentionTargetDisplay());
  const selected = Array.isArray(state.exerciseSelections) ? state.exerciseSelections : [];
  const feedback = state.exerciseFeedback;
  const grid = renderAttentionGrid(round, selected, cellIndex => {
    const next = new Set(state.exerciseSelections || []);
    if (next.has(cellIndex)) next.delete(cellIndex); else next.add(cellIndex);
    state.exerciseSelections = [...next];
    interactionApi.save();
    interactionApi.rerender();
  }, feedback);
  wrapper.appendChild(grid);

  if (feedback) {
    const outcome = feedback.outcome;
    const note = createCognitiveElement(
      "div",
      `cognitive-exercise-feedback ${feedback.correct ? "is-correct" : "is-incorrect"}`
    );
    note.append(
      createCognitiveElement("strong", "", feedback.correct ? "Correct uitgevoerd" : "Bekijk de gemiste of fout geselecteerde symbolen"),
      createCognitiveElement("span", "", `${outcome.hits} correct · ${outcome.omissions} gemist · ${outcome.commissions} fout geselecteerd`)
    );
    wrapper.appendChild(note);
  }

  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  if (!feedback) {
    const check = createCognitiveElement("button", "button button-primary", "Controleer oefening");
    check.type = "button";
    check.addEventListener("click", () => {
      const outcome = calculateAttentionRoundOutcome(round, state.exerciseSelections || [], 0);
      state.exerciseFeedback = {
        correct: outcome.omissions === 0 && outcome.commissions === 0,
        outcome
      };
      interactionApi.save();
      interactionApi.rerender();
    });
    actions.appendChild(check);
  } else {
    const proceed = createCognitiveElement(
      "button",
      "button button-primary",
      index === rounds.length - 1 ? "Start echte rondes" : "Volgende oefening"
    );
    proceed.type = "button";
    proceed.addEventListener("click", () => {
      if (index === rounds.length - 1) {
        state.exerciseCompleted = true;
        state.phase = "rounds";
        state.roundIndex = 0;
      } else {
        state.exerciseIndex += 1;
      }
      state.exerciseSelections = [];
      state.exerciseFeedback = null;
      interactionApi.save();
      interactionApi.rerender();
    });
    actions.appendChild(proceed);
  }
  wrapper.appendChild(actions);
  container.appendChild(wrapper);
}

function renderAttentionRoundTask(context, state, baseRound, shownRound) {
  const { container, interactionApi } = context;
  let selectedIndices = [];
  let finalized = false;
  const startedAt = Date.now();
  const durationMs = window.__UNFOLD_TEST_FAST_TIMING__ ? 3000 : (shownRound.durationMs || 20000);

  interactionApi.setNavigationLocked(true, "Rond eerst de actieve aandachtsronde af.");
  setCognitiveQuestionChrome({
    counter: `Ronde ${state.roundIndex + 1} van 12`,
    percentage: Math.round((state.roundIndex / 12) * 100),
    category: `${getCognitiveDifficultyLabel(baseRound.difficulty)} · symboolselectie`,
    title: "Selecteer alle doelsymbolen",
    instruction: "Selecteer uitsluitend de verticale lijn met exact twee stippen.",
    topbarLabel: `Aandacht · ronde ${state.roundIndex + 1}`
  });

  const wrapper = createCognitiveElement("div", "cognitive-attention-task");
  const header = createCognitiveElement("div", "cognitive-attention-live-header");
  header.appendChild(createAttentionTargetDisplay());
  const timer = createCognitiveElement("strong", "cognitive-attention-timer", `${(durationMs / 1000).toFixed(1).replace(".", ",")} s`);
  timer.setAttribute("aria-live", "off");
  header.appendChild(timer);
  wrapper.appendChild(header);

  const gridHolder = createCognitiveElement("div", "cognitive-attention-grid-holder");
  function drawGrid() {
    gridHolder.replaceChildren(renderAttentionGrid(shownRound, selectedIndices, cellIndex => {
      const next = new Set(selectedIndices);
      if (next.has(cellIndex)) next.delete(cellIndex); else next.add(cellIndex);
      selectedIndices = [...next];
      drawGrid();
    }));
  }
  drawGrid();
  wrapper.appendChild(gridHolder);

  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  const submit = createCognitiveElement("button", "button button-primary", "Ronde indienen");
  submit.type = "button";
  actions.appendChild(submit);
  wrapper.appendChild(actions);
  container.appendChild(wrapper);

  function finishRound() {
    if (finalized) return;
    finalized = true;
    window.clearInterval(intervalId);
    const elapsed = Math.min(durationMs, Date.now() - startedAt);
    state.roundResults[baseRound.id] = calculateAttentionRoundOutcome(shownRound, selectedIndices, elapsed);
    state.roundIndex += 1;
    state.activeRoundId = null;
    interactionApi.setNavigationLocked(false);

    if (state.roundIndex >= 12) {
      state.result = calculateAttentionResult(state);
      state.status = "completed";
      state.phase = "result";
      state.completedAt = new Date().toISOString();
      context.session.moduleResults.attention = { ...state.result };
    }

    interactionApi.save();
    interactionApi.rerender();
  }

  submit.addEventListener("click", finishRound);
  const intervalId = window.setInterval(() => {
    const remaining = Math.max(0, durationMs - (Date.now() - startedAt));
    timer.textContent = `${(remaining / 1000).toFixed(1).replace(".", ",")} s`;
    if (remaining <= 0) finishRound();
  }, 100);

  interactionApi.registerCleanup(reason => {
    window.clearInterval(intervalId);
    interactionApi.setNavigationLocked(false);
    if (!finalized) {
      state.activeRoundId = null;
      if (!["question-rendered"].includes(reason)) {
        state.interruptedRoundIds = [...new Set([...(state.interruptedRoundIds || []), baseRound.id])];
        interactionApi.save();
      }
    }
  });
}

function renderAttentionRounds(context, state) {
  const { container, interactionApi } = context;
  const rounds = window.COGNITIVE_ATTENTION_DATA?.operationalRounds || [];

  if (state.roundIndex >= rounds.length) {
    state.result = state.result || calculateAttentionResult(state);
    state.status = "completed";
    state.phase = "result";
    context.session.moduleResults.attention = { ...state.result };
    interactionApi.save();
    interactionApi.rerender();
    return;
  }

  const { baseRound, shownRound } = getAttentionEffectiveRound(state, state.roundIndex);
  if (state.activeRoundId === baseRound.id) {
    renderAttentionRoundTask(context, state, baseRound, shownRound);
    return;
  }

  setCognitiveQuestionChrome({
    counter: `Ronde ${state.roundIndex + 1} van 12`,
    percentage: Math.round((state.roundIndex / 12) * 100),
    category: `${getCognitiveDifficultyLabel(baseRound.difficulty)} · klaarzetten`,
    title: "Klaar voor de volgende ronde?",
    instruction: "De timer start pas nadat je op Start ronde klikt.",
    topbarLabel: `Aandacht · ronde ${state.roundIndex + 1}`
  });

  const wrapper = createCognitiveElement("div", "cognitive-round-ready");
  wrapper.append(
    createAttentionTargetDisplay(),
    createCognitiveElement("p", "", "Je krijgt 20 seconden voor 30 symbolen. Er staan precies vijf doelsymbolen in het raster.")
  );
  const progress = createCognitiveElement("div", "cognitive-info-note");
  progress.append(
    createCognitiveElement("strong", "", `${state.roundIndex} rondes opgeslagen`),
    createCognitiveElement("span", "", "Je kunt veilig stoppen tussen twee rondes.")
  );
  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  const back = createCognitiveElement("button", "button button-secondary", "Opslaan en terug naar subtaken");
  back.type = "button";
  back.addEventListener("click", () => {
    context.session.currentSubtaskId = null;
    interactionApi.save();
    interactionApi.rerender();
  });
  const start = createCognitiveElement("button", "button button-primary", "Start ronde");
  start.type = "button";
  start.addEventListener("click", () => {
    state.activeRoundId = baseRound.id;
    interactionApi.rerender();
  });
  actions.append(back, start);
  wrapper.append(progress, actions);
  container.appendChild(wrapper);
}

function renderAttentionResult(context, state) {
  const { container, interactionApi } = context;
  const result = state.result || calculateAttentionResult(state);
  state.result = result;
  context.session.moduleResults.attention = { ...result };

  setCognitiveQuestionChrome({
    counter: "Aandacht voltooid",
    percentage: 100,
    category: "Subtaakresultaat",
    title: "Aandacht — Symboolselectie",
    instruction: "Treffers, gemiste doelen en foutieve selecties worden afzonderlijk weergegeven.",
    topbarLabel: "Aandacht · resultaat"
  });

  const wrapper = createCognitiveElement("div", "cognitive-module-result");
  const metrics = createCognitiveElement("div", "cognitive-result-metrics cognitive-attention-metrics");
  [
    [String(result.targetSelectionScore), "Doelselectiescore (%)"],
    [`${result.hits}/${result.targetCount}`, "Treffers"],
    [String(result.omissions), "Gemiste doelen"],
    [String(result.commissions), "Foutieve selecties"],
    [`${result.averageRoundTimeSeconds} s`, "Gemiddelde rondetijd"]
  ].forEach(([value, label]) => {
    const card = createCognitiveElement("div", "cognitive-result-metric");
    card.append(createCognitiveElement("strong", "", value), createCognitiveElement("span", "", label));
    metrics.appendChild(card);
  });
  const level = createCognitiveElement("div", "cognitive-info-note");
  level.append(createCognitiveElement("strong", "", result.level), createCognitiveElement("span", "", "Deze omschrijving geldt alleen binnen deze ontwikkeltaak."));
  const detailGrid = createCognitiveElement("div", "cognitive-subtype-grid");
  result.difficulties.forEach(item => {
    const card = createCognitiveElement("article", "cognitive-subtype-card");
    card.append(
      createCognitiveElement("h3", "", item.label),
      createCognitiveElement("strong", "cognitive-subtype-score", `${item.score}%`),
      createCognitiveElement("p", "", `${item.hits} treffers · ${item.omissions} gemist · ${item.commissions} fout geselecteerd`)
    );
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
  const restart = createCognitiveElement("button", "button button-primary", "Aandacht opnieuw uitvoeren");
  restart.type = "button";
  restart.addEventListener("click", () => {
    resetCognitiveSubtask(context.session, "attention");
    interactionApi.save();
    interactionApi.rerender();
  });
  actions.append(overview, restart);
  wrapper.append(metrics, level, detailGrid, disclaimer, actions);
  container.appendChild(wrapper);
}

function renderCognitiveAttentionSubtask(context) {
  const state = context.session.moduleStates.attention;
  context.interactionApi.configureNavigation({ previousHidden: true, nextHidden: true, saveExitHidden: true });

  if (state.status === "completed" || state.phase === "result") return renderAttentionResult(context, state);
  if (state.phase === "exercise") return renderAttentionExercise(context, state);
  if (state.phase === "rounds") return renderAttentionRounds(context, state);
  return renderAttentionIntro(context, state);
}
