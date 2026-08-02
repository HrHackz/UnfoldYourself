"use strict";

const WORK_VALUES_TEST_ID = "werkorientatie::Werkwaarden- en werkmotivatietest";

function createWorkValuesSession({ startedAt }) {
  return {
    schemaVersion: 1,
    currentQuestionIndex: 0,
    answers: {},
    startedAt
  };
}

function getWorkValuesChoices(question) {
  if (question.type === "impact") {
    return window.WORK_VALUES_IMPACT_CHOICES || [];
  }

  return [
    {
      value: true,
      label: "Verdeel 10 punten"
    }
  ];
}

function normalizeAllocationAnswer(question, selectedAnswer) {
  const answer = {};
  question.items.forEach(item => {
    const raw = Number(selectedAnswer?.[item.dimension]);
    answer[item.dimension] = Number.isInteger(raw)
      ? Math.max(0, Math.min(10, raw))
      : 0;
  });
  return answer;
}

function renderWorkValuesAllocation({ question, selectedAnswer, container, onChange }) {
  answerWarning.textContent = "Verdeel exact 10 punten over de drie mogelijkheden voordat je verdergaat.";

  const answer = normalizeAllocationAnswer(question, selectedAnswer);
  const introduction = document.createElement("p");
  introduction.className = "work-values-question-help";
  introduction.textContent = "Geef meer punten aan wat voor jou persoonlijk belangrijker is. Je mag 0 punten geven, maar het totaal moet precies 10 zijn.";

  const totalPanel = document.createElement("div");
  totalPanel.className = "work-values-total-panel";
  const totalLabel = document.createElement("span");
  totalLabel.textContent = "Nog te verdelen";
  const totalValue = document.createElement("strong");
  totalPanel.append(totalLabel, totalValue);

  const grid = document.createElement("div");
  grid.className = "work-values-allocation-grid";

  function getTotal() {
    return Object.values(answer).reduce((sum, value) => sum + Number(value || 0), 0);
  }

  function updateTotal() {
    const remaining = 10 - getTotal();
    totalValue.textContent = remaining === 0
      ? "Klaar · 10 van 10"
      : `${remaining} punt${Math.abs(remaining) === 1 ? "" : "en"}`;
    totalPanel.classList.toggle("is-complete", remaining === 0);
    totalPanel.classList.toggle("is-over", remaining < 0);
  }

  question.items.forEach((item, index) => {
    const dimension = window.WORK_VALUES_DIMENSION_BY_ID?.[item.dimension];
    const card = document.createElement("article");
    card.className = "work-values-allocation-card";

    const heading = document.createElement("div");
    heading.className = "work-values-allocation-heading";
    const marker = document.createElement("span");
    marker.textContent = String.fromCharCode(65 + index);
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = dimension?.title || "Werkwaarde";
    const text = document.createElement("p");
    text.textContent = item.text;
    copy.append(title, text);
    heading.append(marker, copy);

    const controls = document.createElement("div");
    controls.className = "work-values-stepper";
    const minus = document.createElement("button");
    minus.type = "button";
    minus.setAttribute("aria-label", `Verlaag punten voor ${dimension?.title || "deze optie"}`);
    minus.textContent = "−";
    const value = document.createElement("output");
    value.textContent = String(answer[item.dimension]);
    value.setAttribute("aria-live", "polite");
    const plus = document.createElement("button");
    plus.type = "button";
    plus.setAttribute("aria-label", `Verhoog punten voor ${dimension?.title || "deze optie"}`);
    plus.textContent = "+";
    const pointsLabel = document.createElement("span");
    pointsLabel.textContent = "punten";

    function change(delta) {
      const currentTotal = getTotal();
      const currentValue = answer[item.dimension];
      const nextValue = Math.max(0, Math.min(10, currentValue + delta));

      if (delta > 0 && currentTotal >= 10) return;
      if (nextValue === currentValue) return;

      answer[item.dimension] = nextValue;
      value.textContent = String(nextValue);
      updateTotal();
      answerWarning.hidden = true;
      onChange({ ...answer });
    }

    minus.addEventListener("click", () => change(-1));
    plus.addEventListener("click", () => change(1));
    controls.append(minus, value, plus, pointsLabel);
    card.append(heading, controls);
    grid.appendChild(card);
  });

  container.append(introduction, totalPanel, grid);
  updateTotal();
  return true;
}

function renderWorkValuesImpact({ selectedAnswer, container, onChange }) {
  answerWarning.textContent = "Kies welk effect deze situatie waarschijnlijk op jouw werkmotivatie heeft.";

  const help = document.createElement("p");
  help.className = "work-values-question-help";
  help.textContent = "Beoordeel alleen het verwachte effect van deze situatie op jou: van zeer sterk demotiverend tot zeer sterk motiverend.";

  const scale = document.createElement("div");
  scale.className = "work-values-impact-scale";

  (window.WORK_VALUES_IMPACT_CHOICES || []).forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "work-values-impact-option";
    button.classList.toggle("is-selected", Number(selectedAnswer) === choice.value);
    button.setAttribute("aria-pressed", String(Number(selectedAnswer) === choice.value));

    const marker = document.createElement("strong");
    marker.textContent = choice.marker;
    const label = document.createElement("span");
    label.textContent = choice.label;
    button.append(marker, label);

    button.addEventListener("click", () => {
      scale.querySelectorAll(".work-values-impact-option").forEach(option => {
        option.classList.remove("is-selected");
        option.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-selected");
      button.setAttribute("aria-pressed", "true");
      answerWarning.hidden = true;
      onChange(choice.value);
    });

    scale.appendChild(button);
  });

  const anchors = document.createElement("div");
  anchors.className = "work-values-impact-anchors";
  anchors.append(
    Object.assign(document.createElement("span"), { textContent: "Demotiverend" }),
    Object.assign(document.createElement("span"), { textContent: "Neutraal" }),
    Object.assign(document.createElement("span"), { textContent: "Motiverend" })
  );

  container.append(help, scale, anchors);
  return true;
}

function renderWorkValuesQuestionInput(context) {
  if (context.question.type === "allocation") {
    return renderWorkValuesAllocation(context);
  }

  if (context.question.type === "impact") {
    return renderWorkValuesImpact(context);
  }

  return false;
}

function isWorkValuesAnswerValid(question, answer) {
  if (question.type === "allocation") {
    if (!answer || typeof answer !== "object") return false;
    const values = question.items.map(item => Number(answer[item.dimension]));
    return values.every(value => Number.isInteger(value) && value >= 0 && value <= 10) &&
      values.reduce((sum, value) => sum + value, 0) === 10;
  }

  if (question.type === "impact") {
    return Number.isInteger(Number(answer)) && Number(answer) >= -3 && Number(answer) <= 3;
  }

  return false;
}

function getWorkValuesProgress({ currentIndex, totalQuestions, question }) {
  const number = currentIndex + 1;
  const percentage = Math.round((number / totalQuestions) * 100);
  const allocationCount = (window.WORK_VALUES_ALLOCATION_QUESTIONS || []).length;
  const impactPosition = Math.max(0, number - allocationCount);

  if (question.type === "allocation") {
    return {
      counter: `Prioriteitsvraag ${number} van ${allocationCount}`,
      label: "Werkwaarden prioriteren",
      percentage,
      nextLabel: number === allocationCount ? "Naar motivatie en demotivatie" : "Volgende prioriteit"
    };
  }

  return {
    counter: `Situatie ${impactPosition} van ${totalQuestions - allocationCount}`,
    label: "Motivatoren en demotivatoren",
    percentage,
    nextLabel: number === totalQuestions ? "Bekijk mijn resultaat" : "Volgende situatie"
  };
}

function prepareWorkValuesStoredState({ state, testId }) {
  const session = state.activeTests?.[testId];
  if (session && session.schemaVersion !== 1) {
    delete state.activeTests[testId];
  }

  const result = state.results?.[testId];
  if (result && result.schemaVersion !== 1) {
    delete state.results[testId];
    state.completedTests = (state.completedTests || []).filter(id => id !== testId);
  }
}

const WORK_VALUES_TEST_DEFINITION = {
  id: WORK_VALUES_TEST_ID,
  domainId: "werkorientatie",
  domainTitle: "Werkoriëntatie & beroepsrichting",
  title: "Werkwaarden- en werkmotivatietest",
  description: "Ontdek wat je in werk zoekt en waardeert, welke omstandigheden je motiveren en wat je motivatie juist kan ondermijnen.",
  estimatedTime: "Ongeveer 10 tot 15 minuten",
  resultType: "work-values-motivation-profile",
  mainScoreHeading: "Jouw belangrijkste werkdrijfveren",
  printReportSubtitle: "Werkwaarden- en werkmotivatieprofiel",
  schemaVersion: 1,
  questions: window.WORK_VALUES_QUESTIONS || [],
  getChoices: getWorkValuesChoices,
  createSession: createWorkValuesSession,
  prepareStoredState: prepareWorkValuesStoredState,
  getIntroQuestionCountText() {
    return "45 stellingen in 27 korte stappen";
  },
  getProgress: getWorkValuesProgress,
  renderQuestionInput: renderWorkValuesQuestionInput,
  isAnswerValid: isWorkValuesAnswerValid,
  calculateResult: calculateWorkValuesResult,
  renderResultDetails: renderWorkValuesResult,
  evidence: window.WORK_VALUES_EVIDENCE || {}
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
  ? window.UNFOLD_TEST_DEFINITIONS
  : [];
window.UNFOLD_TEST_DEFINITIONS.push(WORK_VALUES_TEST_DEFINITION);
