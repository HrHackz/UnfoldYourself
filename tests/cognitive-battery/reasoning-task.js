"use strict";

function getCognitiveDifficultyLabel(difficulty) {
  return {
    easy: "Gemakkelijk",
    medium: "Gemiddeld",
    hard: "Moeilijk"
  }[difficulty] || "Opgave";
}

function setCognitiveQuestionChrome({
  counter = "Cognitieve batterij",
  percentage = 0,
  category = "",
  title = "Cognitieve vaardigheidsbatterij",
  instruction = "",
  topbarLabel = "Cognitieve batterij"
} = {}) {
  const safePercentage = Math.max(0, Math.min(100, Number(percentage) || 0));

  questionCounter.textContent = counter;
  questionPercentage.textContent = `${Math.round(safePercentage)}%`;
  questionProgressBar.style.width = `${safePercentage}%`;
  questionCategory.textContent = category;
  questionCategory.hidden = !category;
  questionText.textContent = title;
  questionInstruction.textContent = instruction;
  questionInstruction.hidden = !instruction;
  updateTestTopbar(topbarLabel, safePercentage);
}

function createCognitiveElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text !== undefined && text !== null) {
    element.textContent = String(text);
  }

  return element;
}

function renderCognitiveStimulus(stimulus) {
  if (!stimulus || typeof stimulus !== "object") {
    return null;
  }

  if (
    typeof stimulus.type === "string" &&
    stimulus.type.startsWith("visual-") &&
    window.COGNITIVE_VISUAL_RENDERER?.renderStimulus
  ) {
    return window.COGNITIVE_VISUAL_RENDERER.renderStimulus(stimulus);
  }

  if (stimulus.type === "sequence") {
    const sequence = createCognitiveElement("div", "cognitive-sequence");
    (stimulus.values || []).forEach((value, index) => {
      const token = createCognitiveElement("span", "cognitive-sequence-token", value);
      sequence.appendChild(token);

      if (index < stimulus.values.length - 1) {
        sequence.appendChild(
          createCognitiveElement("span", "cognitive-sequence-divider", "–")
        );
      }
    });
    return sequence;
  }

  if (stimulus.type === "matrix") {
    const table = createCognitiveElement("table", "cognitive-data-table cognitive-matrix-table");
    const body = document.createElement("tbody");

    (stimulus.rows || []).forEach(rowValues => {
      const row = document.createElement("tr");
      rowValues.forEach(value => {
        const cell = createCognitiveElement("td", "", value);
        row.appendChild(cell);
      });
      body.appendChild(row);
    });

    table.appendChild(body);
    const wrapper = createCognitiveElement("div", "cognitive-table-wrap");
    wrapper.appendChild(table);
    return wrapper;
  }

  if (stimulus.type === "table") {
    const table = createCognitiveElement("table", "cognitive-data-table");

    if (stimulus.caption) {
      table.appendChild(createCognitiveElement("caption", "", stimulus.caption));
    }

    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");

    (stimulus.headers || []).forEach(label => {
      headerRow.appendChild(createCognitiveElement("th", "", label));
    });
    header.appendChild(headerRow);

    const body = document.createElement("tbody");
    (stimulus.rows || []).forEach(rowValues => {
      const row = document.createElement("tr");
      rowValues.forEach(value => {
        row.appendChild(createCognitiveElement("td", "", value));
      });
      body.appendChild(row);
    });

    table.append(header, body);
    const wrapper = createCognitiveElement("div", "cognitive-table-wrap");
    wrapper.appendChild(table);
    return wrapper;
  }

  if (stimulus.type === "bar-chart") {
    const namespace = "http://www.w3.org/2000/svg";
    const figure = createCognitiveElement("figure", "cognitive-chart-figure");
    const svg = document.createElementNS(namespace, "svg");
    const width = 520;
    const height = 320;
    const plot = { left: 76, right: 492, top: 42, bottom: 250 };
    const minimum = Number(stimulus.min);
    const maximum = Number(stimulus.max);
    const safeMin = Number.isFinite(minimum) ? minimum : 0;
    const safeMax = Number.isFinite(maximum) && maximum > safeMin ? maximum : safeMin + 1;
    const values = Array.isArray(stimulus.values) ? stimulus.values : [];
    const ticks = Array.isArray(stimulus.ticks) && stimulus.ticks.length
      ? stimulus.ticks.map(Number).filter(Number.isFinite)
      : [safeMin, safeMax];

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", stimulus.description || stimulus.title || "Staafgrafiek");
    svg.classList.add("cognitive-bar-chart");

    const makeSvgElement = (name, attributes = {}, text = null) => {
      const node = document.createElementNS(namespace, name);
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
      if (text !== null) node.textContent = String(text);
      return node;
    };
    const yFor = value => {
      const ratio = (Number(value) - safeMin) / (safeMax - safeMin);
      return plot.bottom - Math.max(0, Math.min(1, ratio)) * (plot.bottom - plot.top);
    };

    if (stimulus.title) {
      svg.appendChild(makeSvgElement("text", { x: width / 2, y: 23, class: "chart-title", "text-anchor": "middle" }, stimulus.title));
    }

    ticks.forEach(tick => {
      const y = yFor(tick);
      svg.appendChild(makeSvgElement("line", { x1: plot.left, y1: y, x2: plot.right, y2: y, class: "chart-grid-line" }));
      svg.appendChild(makeSvgElement("text", { x: plot.left - 12, y: y + 5, class: "chart-tick-label", "text-anchor": "end" }, tick));
    });

    svg.appendChild(makeSvgElement("line", { x1: plot.left, y1: plot.top, x2: plot.left, y2: plot.bottom, class: "chart-axis" }));
    svg.appendChild(makeSvgElement("line", { x1: plot.left, y1: plot.bottom, x2: plot.right, y2: plot.bottom, class: "chart-axis" }));

    // Zichtbare asonderbreking: de verticale as begint bij de opgegeven minimumwaarde, niet bij nul.
    svg.appendChild(makeSvgElement("path", {
      d: `M ${plot.left - 7} ${plot.bottom - 13} l 14 -7 M ${plot.left - 7} ${plot.bottom - 5} l 14 -7`,
      class: "chart-axis-break"
    }));

    if (stimulus.yAxisLabel) {
      svg.appendChild(makeSvgElement("text", {
        x: 20,
        y: (plot.top + plot.bottom) / 2,
        class: "chart-axis-label",
        transform: `rotate(-90 20 ${(plot.top + plot.bottom) / 2})`,
        "text-anchor": "middle"
      }, stimulus.yAxisLabel));
    }

    const slotWidth = (plot.right - plot.left) / Math.max(1, values.length);
    const barWidth = Math.min(112, slotWidth * 0.52);
    values.forEach((entry, index) => {
      const value = Number(entry.value);
      const x = plot.left + slotWidth * index + (slotWidth - barWidth) / 2;
      const y = yFor(value);
      const barHeight = Math.max(0, plot.bottom - y);
      svg.appendChild(makeSvgElement("rect", { x, y, width: barWidth, height: barHeight, rx: 4, class: "chart-bar" }));
      svg.appendChild(makeSvgElement("text", { x: x + barWidth / 2, y: y - 9, class: "chart-value-label", "text-anchor": "middle" }, value));
      svg.appendChild(makeSvgElement("text", { x: x + barWidth / 2, y: plot.bottom + 27, class: "chart-category-label", "text-anchor": "middle" }, entry.label));
    });

    figure.appendChild(svg);
    if (stimulus.caption) {
      figure.appendChild(createCognitiveElement("figcaption", "", stimulus.caption));
    }
    return figure;
  }

  if (stimulus.type === "statements") {
    const statements = createCognitiveElement("div", "cognitive-statements");
    (stimulus.lines || []).forEach(line => {
      statements.appendChild(createCognitiveElement("p", "", line));
    });
    return statements;
  }

  return null;
}

function createCognitiveChoiceButton(choice, index, selectedValue, onSelect, disabled = false) {
  const button = document.createElement("button");
  const selected = selectedValue === choice.value;

  button.type = "button";
  button.className = "cognitive-answer-option";
  button.classList.toggle("is-selected", selected);
  button.setAttribute("aria-pressed", String(selected));
  button.disabled = disabled;

  const optionLabel = String.fromCharCode(65 + index);
  const marker = createCognitiveElement(
    "span",
    "cognitive-answer-marker",
    optionLabel
  );
  const visual = window.COGNITIVE_VISUAL_RENDERER?.renderChoice
    ? window.COGNITIVE_VISUAL_RENDERER.renderChoice(choice, optionLabel)
    : null;

  button.appendChild(marker);

  if (visual) {
    button.setAttribute(
      "aria-label",
      `Optie ${optionLabel}: ${choice.ariaLabel || choice.label || "antwoordfiguur"}`
    );
    button.classList.add("has-visual");
    button.appendChild(visual);
  } else {
    button.appendChild(
      createCognitiveElement("span", "cognitive-answer-label", choice.label)
    );
  }

  button.addEventListener("click", () => onSelect(choice.value, button));
  return button;
}

function renderCognitiveChoiceGrid({
  choices,
  selectedValue,
  onSelect,
  disabled = false
}) {
  const grid = createCognitiveElement("div", "cognitive-answer-grid");

  (choices || []).forEach((choice, index) => {
    grid.appendChild(
      createCognitiveChoiceButton(
        choice,
        index,
        selectedValue,
        (value, clickedButton) => {
          onSelect(value);
          grid.querySelectorAll(".cognitive-answer-option").forEach(button => {
            const isSelected = button === clickedButton;
            button.classList.toggle("is-selected", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
          });
        },
        disabled
      )
    );
  });

  return grid;
}

function formatCognitiveTime(seconds) {
  const numericSeconds = Math.max(0, Number(seconds) || 0);

  if (numericSeconds < 60) {
    return `${numericSeconds.toFixed(1).replace(".", ",")} sec.`;
  }

  const minutes = Math.floor(numericSeconds / 60);
  const remainingSeconds = Math.round(numericSeconds % 60);
  return `${minutes} min. ${remainingSeconds} sec.`;
}

function startCognitiveItemTimer(moduleState, itemId, interactionApi) {
  let finalized = false;
  moduleState.activeItemStartedAt = Date.now();

  function finalize() {
    if (finalized) {
      return;
    }

    finalized = true;
    const startedAt = Number(moduleState.activeItemStartedAt);
    moduleState.activeItemStartedAt = null;

    if (Number.isFinite(startedAt) && startedAt > 0) {
      const elapsed = Math.max(0, Date.now() - startedAt);
      moduleState.responseTimes[itemId] =
        Math.max(0, Number(moduleState.responseTimes[itemId]) || 0) + elapsed;
    }

    interactionApi.save();
  }

  interactionApi.registerCleanup(finalize);
  return finalize;
}

function renderReasoningModuleIntro(context, moduleDefinition, moduleState) {
  const { container, interactionApi } = context;

  setCognitiveQuestionChrome({
    counter: moduleDefinition.title,
    percentage: 0,
    category: "Module-introductie",
    title: moduleDefinition.title,
    instruction: moduleDefinition.instruction,
    topbarLabel: `${moduleDefinition.shortTitle} · voorbereiding`
  });

  const wrapper = createCognitiveElement("div", "cognitive-module-intro");
  const meta = createCognitiveElement("div", "cognitive-module-meta");
  meta.append(
    createCognitiveElement("span", "", `${moduleDefinition.operationalItemCount || moduleDefinition.items?.length || 0} opgaven`),
    createCognitiveElement("span", "", moduleDefinition.estimatedTime),
    createCognitiveElement("span", "", "Eén oefening vooraf")
  );

  const purposeHeading = createCognitiveElement("h3", "", "Deze module onderzoekt");
  const purposeList = createCognitiveElement("ul", "cognitive-purpose-list");
  (moduleDefinition.purpose || []).forEach(item => {
    purposeList.appendChild(createCognitiveElement("li", "", item));
  });

  const boundary = createCognitiveElement("div", "cognitive-info-note");
  boundary.append(
    createCognitiveElement("strong", "", "Afbakening"),
    createCognitiveElement("span", "", moduleDefinition.boundaries)
  );

  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  const backButton = createCognitiveElement("button", "button button-secondary", "Terug naar moduleoverzicht");
  backButton.type = "button";
  backButton.addEventListener("click", () => {
    showCognitiveDashboard(context.session);
    interactionApi.save();
    interactionApi.rerender();
  });

  const startButton = createCognitiveElement("button", "button button-primary", "Start oefening");
  startButton.type = "button";
  startButton.addEventListener("click", () => {
    moduleState.status = "in-progress";
    moduleState.scoringVersion = Math.max(
      1,
      Number(moduleDefinition.scoringVersion) || 1
    );
    moduleState.phase = "exercise";
    moduleState.startedAt = moduleState.startedAt || new Date().toISOString();
    moduleState.exerciseIndex = 0;
    moduleState.exerciseAnswer = null;
    moduleState.exerciseFeedback = null;
    interactionApi.save();
    interactionApi.rerender();
  });

  actions.append(backButton, startButton);
  wrapper.append(meta, purposeHeading, purposeList, boundary, actions);
  container.appendChild(wrapper);
}

function renderReasoningExercise(context, moduleDefinition, moduleState) {
  const { container, interactionApi } = context;
  const exercises = Array.isArray(moduleDefinition.exercises)
    ? moduleDefinition.exercises
    : [];
  const exerciseIndex = Math.min(
    Math.max(0, Number(moduleState.exerciseIndex) || 0),
    Math.max(0, exercises.length - 1)
  );
  const exercise = exercises[exerciseIndex];

  if (!exercise) {
    moduleState.exerciseCompleted = true;
    moduleState.phase = "items";
    interactionApi.save();
    interactionApi.rerender();
    return;
  }

  setCognitiveQuestionChrome({
    counter: `Oefening ${exerciseIndex + 1}`,
    percentage: 0,
    category: "Oefenopgave — telt niet mee",
    title: exercise.text,
    instruction: "Kies een antwoord en controleer daarna de oplossing.",
    topbarLabel: `${moduleDefinition.shortTitle} · oefening`
  });

  const wrapper = createCognitiveElement("div", "cognitive-exercise");
  const stimulus = renderCognitiveStimulus(exercise.stimulus);
  if (stimulus) {
    wrapper.appendChild(stimulus);
  }

  const feedbackShown = Boolean(moduleState.exerciseFeedback);
  const choiceGrid = renderCognitiveChoiceGrid({
    choices: exercise.choices,
    selectedValue: moduleState.exerciseAnswer,
    disabled: feedbackShown,
    onSelect(value) {
      moduleState.exerciseAnswer = value;
      moduleState.exerciseFeedback = null;
      interactionApi.save();
    }
  });
  wrapper.appendChild(choiceGrid);

  const warning = createCognitiveElement(
    "p",
    "answer-warning cognitive-inline-warning",
    "Kies eerst een antwoord."
  );
  warning.hidden = true;
  wrapper.appendChild(warning);

  const feedback = createCognitiveElement("div", "cognitive-exercise-feedback");
  feedback.hidden = !feedbackShown;

  if (feedbackShown) {
    const isCorrect = moduleState.exerciseFeedback.correct === true;
    feedback.classList.toggle("is-correct", isCorrect);
    feedback.classList.toggle("is-incorrect", !isCorrect);
    feedback.append(
      createCognitiveElement(
        "strong",
        "",
        isCorrect ? "Correct." : "Dit antwoord was niet correct."
      ),
      createCognitiveElement("span", "", exercise.explanation)
    );
  }
  wrapper.appendChild(feedback);

  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  const backButton = createCognitiveElement("button", "button button-secondary", "Terug naar introductie");
  backButton.type = "button";
  backButton.addEventListener("click", () => {
    moduleState.phase = "intro";
    moduleState.exerciseAnswer = null;
    moduleState.exerciseFeedback = null;
    interactionApi.save();
    interactionApi.rerender();
  });

  const actionButton = createCognitiveElement(
    "button",
    "button button-primary",
    feedbackShown
      ? moduleState.exerciseFeedback.correct || exerciseIndex === exercises.length - 1
        ? "Start de module"
        : "Volgende oefening"
      : "Controleer antwoord"
  );
  actionButton.type = "button";
  actionButton.addEventListener("click", () => {
    if (!feedbackShown) {
      if (moduleState.exerciseAnswer === null || moduleState.exerciseAnswer === undefined) {
        warning.hidden = false;
        return;
      }

      moduleState.exerciseFeedback = {
        correct: moduleState.exerciseAnswer === exercise.correctAnswer
      };
      interactionApi.save();
      interactionApi.rerender();
      return;
    }

    if (
      moduleState.exerciseFeedback.correct !== true &&
      exerciseIndex < exercises.length - 1
    ) {
      moduleState.exerciseIndex = exerciseIndex + 1;
      moduleState.exerciseAnswer = null;
      moduleState.exerciseFeedback = null;
      interactionApi.save();
      interactionApi.rerender();
      return;
    }

    moduleState.exerciseCompleted = true;
    moduleState.phase = "items";
    moduleState.currentItemIndex = 0;
    moduleState.exerciseAnswer = null;
    moduleState.exerciseFeedback = null;
    interactionApi.save();
    interactionApi.rerender();
  });

  actions.append(backButton, actionButton);
  wrapper.appendChild(actions);
  container.appendChild(wrapper);
}

function renderCognitiveItemNavigator({
  items,
  moduleState,
  currentIndex,
  onNavigate
}) {
  const navigator = createCognitiveElement("div", "cognitive-item-navigator");
  navigator.setAttribute("aria-label", "Opgavenavigatie");

  items.forEach((item, index) => {
    const button = createCognitiveElement("button", "cognitive-item-dot", index + 1);
    const answered = Object.prototype.hasOwnProperty.call(moduleState.answers, item.id);

    button.type = "button";
    button.classList.toggle("is-current", index === currentIndex);
    button.classList.toggle("is-answered", answered);
    button.setAttribute(
      "aria-label",
      `Opgave ${index + 1}${answered ? ", beantwoord" : ", niet beantwoord"}`
    );
    button.addEventListener("click", () => onNavigate(index));
    navigator.appendChild(button);
  });

  return navigator;
}

function completeReasoningModule(context, moduleDefinition, moduleState, finalizeTimer) {
  const unanswered = moduleDefinition.items.filter(
    item => !Object.prototype.hasOwnProperty.call(moduleState.answers, item.id)
  ).length;

  if (
    unanswered > 0 &&
    !window.confirm(
      `Je hebt ${unanswered} ${unanswered === 1 ? "opgave" : "opgaven"} niet beantwoord. Wil je de module toch afronden?`
    )
  ) {
    return;
  }

  finalizeTimer();
  const result = calculateReasoningModuleResult(moduleDefinition, moduleState);
  moduleState.status = "completed";
  moduleState.phase = "result";
  moduleState.completedAt = result.completedAt;
  moduleState.result = result;
  context.session.moduleResults[moduleDefinition.id] = result;
  context.session.updatedAt = new Date().toISOString();
  context.interactionApi.save();
  context.interactionApi.rerender();
}

function renderReasoningItem(context, moduleDefinition, moduleState) {
  const { container, interactionApi } = context;
  const items = moduleDefinition.items || [];
  const currentIndex = Math.min(
    Math.max(0, Number(moduleState.currentItemIndex) || 0),
    Math.max(0, items.length - 1)
  );
  const item = items[currentIndex];

  if (!item) {
    moduleState.phase = "result";
    moduleState.status = "completed";
    moduleState.result = calculateReasoningModuleResult(moduleDefinition, moduleState);
    context.session.moduleResults[moduleDefinition.id] = moduleState.result;
    interactionApi.save();
    interactionApi.rerender();
    return;
  }

  moduleState.currentItemIndex = currentIndex;
  const answeredCount = items.filter(entry =>
    Object.prototype.hasOwnProperty.call(moduleState.answers, entry.id)
  ).length;
  const progress = Math.round(((currentIndex + 1) / items.length) * 100);

  setCognitiveQuestionChrome({
    counter: `Opgave ${currentIndex + 1} van ${items.length}`,
    percentage: progress,
    category: `${getCognitiveDifficultyLabel(item.difficulty)} · ${item.category}`,
    title: item.text,
    instruction: moduleDefinition.instruction,
    topbarLabel: `${moduleDefinition.shortTitle} · ${currentIndex + 1} van ${items.length}`
  });

  const finalizeTimer = startCognitiveItemTimer(moduleState, item.id, interactionApi);
  const wrapper = createCognitiveElement("div", "cognitive-reasoning-item");
  const stimulus = renderCognitiveStimulus(item.stimulus);
  if (stimulus) {
    wrapper.appendChild(stimulus);
  }

  const selectedValue = Object.prototype.hasOwnProperty.call(moduleState.answers, item.id)
    ? moduleState.answers[item.id]
    : null;
  const choiceGrid = renderCognitiveChoiceGrid({
    choices: item.choices,
    selectedValue,
    onSelect(value) {
      moduleState.answers[item.id] = value;
      context.session.updatedAt = new Date().toISOString();
      interactionApi.save();
      const nextButton = wrapper.querySelector("[data-cognitive-next]");
      if (nextButton && currentIndex < items.length - 1) {
        nextButton.textContent = "Volgende opgave";
      }
    }
  });
  wrapper.appendChild(choiceGrid);

  const status = createCognitiveElement(
    "p",
    "cognitive-answer-status",
    `${answeredCount} van ${items.length} opgaven beantwoord`
  );
  wrapper.appendChild(status);

  const navigator = renderCognitiveItemNavigator({
    items,
    moduleState,
    currentIndex,
    onNavigate(nextIndex) {
      finalizeTimer();
      moduleState.currentItemIndex = nextIndex;
      interactionApi.save();
      interactionApi.rerender();
    }
  });
  wrapper.appendChild(navigator);

  const actions = createCognitiveElement("div", "cognitive-runner-actions cognitive-runner-actions-split");
  const dashboardButton = createCognitiveElement("button", "button button-secondary", "Opslaan en naar overzicht");
  dashboardButton.type = "button";
  dashboardButton.addEventListener("click", () => {
    finalizeTimer();
    showCognitiveDashboard(context.session);
    interactionApi.save();
    interactionApi.rerender();
  });

  const navigation = createCognitiveElement("div", "cognitive-inline-actions");
  const previousButton = createCognitiveElement("button", "button button-secondary", "Vorige opgave");
  previousButton.type = "button";
  previousButton.disabled = currentIndex === 0;
  previousButton.addEventListener("click", () => {
    finalizeTimer();
    moduleState.currentItemIndex = Math.max(0, currentIndex - 1);
    interactionApi.save();
    interactionApi.rerender();
  });

  const nextButton = createCognitiveElement(
    "button",
    "button button-primary",
    currentIndex === items.length - 1
      ? "Module afronden"
      : selectedValue === null
        ? "Opgave overslaan"
        : "Volgende opgave"
  );
  nextButton.type = "button";
  nextButton.dataset.cognitiveNext = "true";
  nextButton.addEventListener("click", () => {
    if (currentIndex === items.length - 1) {
      completeReasoningModule(context, moduleDefinition, moduleState, finalizeTimer);
      return;
    }

    finalizeTimer();
    moduleState.currentItemIndex = currentIndex + 1;
    interactionApi.save();
    interactionApi.rerender();
  });

  navigation.append(previousButton, nextButton);
  actions.append(dashboardButton, navigation);
  wrapper.appendChild(actions);
  container.appendChild(wrapper);
}

function createCognitiveMetric(label, value, description) {
  const card = createCognitiveElement("article", "cognitive-result-metric");
  card.append(
    createCognitiveElement("span", "", label),
    createCognitiveElement("strong", "", value)
  );

  if (description) {
    card.appendChild(createCognitiveElement("small", "", description));
  }

  return card;
}

function renderReasoningResult(context, moduleDefinition, moduleState) {
  const { container, interactionApi } = context;
  const result = moduleState.result || context.session.moduleResults[moduleDefinition.id];

  if (!result) {
    moduleState.result = calculateReasoningModuleResult(moduleDefinition, moduleState);
    context.session.moduleResults[moduleDefinition.id] = moduleState.result;
  }

  const finalResult = moduleState.result;
  setCognitiveQuestionChrome({
    counter: "Module voltooid",
    percentage: 100,
    category: "Moduleresultaat",
    title: moduleDefinition.title,
    instruction:
      "De scores gelden uitsluitend binnen deze ontwikkelmodule en zijn geen IQ-, percentiel- of normscore.",
    topbarLabel: `${moduleDefinition.shortTitle} · voltooid`
  });

  const wrapper = createCognitiveElement("div", "cognitive-module-result");
  const hero = createCognitiveElement("section", "cognitive-result-hero");
  const score = createCognitiveElement("strong", "cognitive-result-score", `${finalResult.correct}/${finalResult.total}`);
  const level = createCognitiveElement("div", "cognitive-result-level", finalResult.level);
  hero.append(
    createCognitiveElement("span", "", "Correcte antwoorden"),
    score,
    level
  );
  wrapper.appendChild(hero);

  const metrics = createCognitiveElement("div", "cognitive-result-metrics");
  metrics.append(
    createCognitiveMetric("Nauwkeurigheid", `${finalResult.accuracy}%`, `Correct ten opzichte van alle ${finalResult.total} opgaven`),
    createCognitiveMetric("Beantwoorde nauwkeurigheid", `${finalResult.answeredAccuracy}%`, "Correct binnen de ingevulde opgaven"),
    createCognitiveMetric("Voltooiingsgraad", `${finalResult.completion}%`, `${finalResult.answered} van ${finalResult.total} beantwoord`),
    createCognitiveMetric("Gemiddelde antwoordtijd", formatCognitiveTime(finalResult.averageResponseTimeSeconds), "Alleen aanvullende informatie")
  );
  wrapper.appendChild(metrics);

  const subtypeHeading = createCognitiveElement("h3", "", "Resultaat per taakvorm");
  const subtypeGrid = createCognitiveElement("div", "cognitive-subtype-grid");
  finalResult.subtypes.forEach(subtype => {
    const card = createCognitiveElement("article", "cognitive-subtype-card");
    const header = createCognitiveElement("div", "cognitive-subtype-header");
    header.append(
      createCognitiveElement("strong", "", subtype.label),
      createCognitiveElement("span", "", `${subtype.correct}/${subtype.total}`)
    );
    const bar = createCognitiveElement("div", "cognitive-subtype-bar");
    const fill = createCognitiveElement("span", "");
    fill.style.width = `${subtype.percentage}%`;
    bar.appendChild(fill);
    card.append(
      header,
      createCognitiveElement("p", "", subtype.description),
      bar
    );
    subtypeGrid.appendChild(card);
  });
  wrapper.append(subtypeHeading, subtypeGrid);

  if (finalResult.completion < 100) {
    const incomplete = createCognitiveElement("div", "cognitive-info-note cognitive-warning-note");
    incomplete.append(
      createCognitiveElement("strong", "", "Onvolledige afname"),
      createCognitiveElement(
        "span",
        "",
        "Niet alle opgaven werden beantwoord. Daardoor geeft het totaalresultaat slechts een gedeeltelijk beeld."
      )
    );
    wrapper.appendChild(incomplete);
  }

  const disclaimer = createCognitiveElement("div", "cognitive-info-note");
  disclaimer.append(
    createCognitiveElement("strong", "", "Voorlopige rapportage"),
    createCognitiveElement("span", "", finalResult.normDisclaimer),
    createCognitiveElement("span", "", finalResult.timingDisclaimer)
  );
  wrapper.appendChild(disclaimer);

  const actions = createCognitiveElement("div", "cognitive-runner-actions");
  const dashboardButton = createCognitiveElement("button", "button button-primary", "Terug naar moduleoverzicht");
  dashboardButton.type = "button";
  dashboardButton.addEventListener("click", () => {
    showCognitiveDashboard(context.session);
    interactionApi.save();
    interactionApi.rerender();
  });

  const restartButton = createCognitiveElement("button", "button button-secondary", "Module opnieuw uitvoeren");
  restartButton.type = "button";
  restartButton.addEventListener("click", () => {
    if (!window.confirm("Wil je deze module opnieuw uitvoeren? Alleen het resultaat en de antwoorden van deze module worden verwijderd.")) {
      return;
    }

    resetCognitiveModule(context.session, moduleDefinition.id);
    interactionApi.save();
    interactionApi.rerender();
  });

  actions.append(restartButton, dashboardButton);
  wrapper.appendChild(actions);
  container.appendChild(wrapper);
}

function renderCognitiveReasoningModule(context, moduleDefinition) {
  const moduleState = getCognitiveModuleState(context.session, moduleDefinition.id);

  if (!moduleState) {
    return false;
  }

  context.interactionApi.configureNavigation({
    previousHidden: true,
    nextHidden: true,
    saveExitHidden: true
  });

  if (moduleState.status === "completed" || moduleState.phase === "result") {
    renderReasoningResult(context, moduleDefinition, moduleState);
    return true;
  }

  if (moduleState.phase === "exercise") {
    renderReasoningExercise(context, moduleDefinition, moduleState);
    return true;
  }

  if (moduleState.phase === "items" && moduleState.exerciseCompleted) {
    renderReasoningItem(context, moduleDefinition, moduleState);
    return true;
  }

  renderReasoningModuleIntro(context, moduleDefinition, moduleState);
  return true;
}
