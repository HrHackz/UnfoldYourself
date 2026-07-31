"use strict";

/* Testdefinitie en testspecifieke antwoordvelden voor kruispuntdenken v2. */

function getIdentityIntersectionalityChoices(question) {
  return getIdentityIntersectionalityChoiceSet(question);
}

function createIdentitySelectField({ question, choices, selectedAnswer, container, onChange }) {
  const wrapper = document.createElement("div");
  wrapper.className = "identity-select-field";

  const select = document.createElement("select");
  select.className = "identity-select";
  select.setAttribute("aria-label", question.text);

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Kies een antwoord";
  placeholder.disabled = true;
  placeholder.selected = selectedAnswer === undefined || selectedAnswer === null || selectedAnswer === "";
  select.appendChild(placeholder);

  choices.forEach(choice => {
    const option = document.createElement("option");
    option.value = String(choice.value);
    option.textContent = choice.label;
    option.selected = answerValuesEqual(choice.value, selectedAnswer);
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const choice = choices.find(item => String(item.value) === select.value);
    if (choice) {
      onChange(choice.value);
    }
  });

  wrapper.appendChild(select);
  container.appendChild(wrapper);
  return true;
}

function createIdentityMultiSelectField({ question, choices, selectedAnswer, container, onChange }) {
  const wrapper = document.createElement("div");
  wrapper.className = "identity-multi-select-field";

  const controls = document.createElement("div");
  controls.className = "identity-multi-select-controls";

  const select = document.createElement("select");
  select.className = "identity-select";
  select.setAttribute("aria-label", question.text);

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Kies een optie";
  placeholder.selected = true;
  select.appendChild(placeholder);

  choices.forEach(choice => {
    const option = document.createElement("option");
    option.value = String(choice.value);
    option.textContent = choice.label;
    select.appendChild(option);
  });

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "secondary-button identity-add-selection";
  addButton.textContent = "Toevoegen";

  const selectionList = document.createElement("div");
  selectionList.className = "identity-selected-values";

  let selected = Array.isArray(selectedAnswer) ? [...selectedAnswer] : [];
  const specialValues = new Set(["STATELESS", "UNDETERMINED"]);

  function saveAndRender() {
    onChange([...selected]);
    renderSelected();
  }

  function renderSelected() {
    selectionList.replaceChildren();

    selected.forEach(value => {
      const choice = choices.find(item => answerValuesEqual(item.value, value));
      if (!choice) {
        return;
      }

      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "identity-selection-chip";
      chip.textContent = `${choice.label} ×`;
      chip.setAttribute("aria-label", `${choice.label} verwijderen`);
      chip.addEventListener("click", () => {
        selected = selected.filter(item => !answerValuesEqual(item, value));
        saveAndRender();
      });
      selectionList.appendChild(chip);
    });
  }

  addButton.addEventListener("click", () => {
    const choice = choices.find(item => String(item.value) === select.value);
    if (!choice || selected.some(value => answerValuesEqual(value, choice.value))) {
      return;
    }

    if (specialValues.has(String(choice.value))) {
      selected = [choice.value];
    } else {
      selected = selected.filter(value => !specialValues.has(String(value)));
      if (selected.length >= Number(question.maxSelections || 3)) {
        return;
      }
      selected.push(choice.value);
    }

    select.value = "";
    saveAndRender();
  });

  controls.append(select, addButton);
  wrapper.append(controls, selectionList);
  container.appendChild(wrapper);
  renderSelected();
  return true;
}

function createIdentityMultiButtonField({ question, choices, selectedAnswer, container, onChange }) {
  const grid = document.createElement("div");
  grid.className = "identity-multi-button-grid";
  let selected = Array.isArray(selectedAnswer) ? [...selectedAnswer] : [];

  function update() {
    grid.querySelectorAll(".answer-option").forEach(button => {
      const value = button.dataset.value;
      const active = selected.some(item => String(item) === value);
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option identity-multi-option";
    button.dataset.value = String(choice.value);
    button.setAttribute("aria-pressed", "false");

    const marker = document.createElement("span");
    marker.className = "answer-option-marker";
    marker.textContent = String(index + 1);

    const copy = document.createElement("span");
    copy.className = "answer-option-copy";
    const label = document.createElement("strong");
    label.textContent = choice.label;
    copy.appendChild(label);
    button.append(marker, copy);

    button.addEventListener("click", () => {
      const present = selected.some(item => answerValuesEqual(item, choice.value));
      if (present) {
        selected = selected.filter(item => !answerValuesEqual(item, choice.value));
      } else if (selected.length < Number(question.maxSelections || 2)) {
        selected.push(choice.value);
      }
      onChange([...selected]);
      update();
    });

    grid.appendChild(button);
  });

  container.appendChild(grid);
  update();
  return true;
}

function renderIdentityIntersectionalityQuestionInput(context) {
  const inputType = context.question?.inputType || "buttons";

  if (inputType === "select") {
    return createIdentitySelectField(context);
  }
  if (inputType === "multi-select") {
    return createIdentityMultiSelectField(context);
  }
  if (inputType === "multi-buttons") {
    return createIdentityMultiButtonField(context);
  }
  return false;
}

function isIdentityIntersectionalityAnswerValid(question, answer) {
  if (question?.inputType === "multi-select" || question?.inputType === "multi-buttons") {
    return Array.isArray(answer) && answer.length > 0;
  }
  return answer !== undefined && answer !== null && answer !== "";
}

function prepareIdentityIntersectionalityStoredState({ state, testId }) {
  const activeSession = state.activeTests?.[testId];
  if (activeSession && activeSession.schemaVersion !== 2) {
    delete state.activeTests[testId];
  }

  const storedResult = state.results?.[testId];
  if (storedResult && storedResult.schemaVersion !== 2) {
    delete state.results[testId];
    state.completedTests = (state.completedTests || []).filter(id => id !== testId);
  }
}

const IDENTITY_INTERSECTIONALITY_TEST_DEFINITION = {
  id: "identiteit::Deelidentiteiten- en kruispuntdenkentest",
  domainId: "identiteit",
  domainTitle: "Identiteit & kruispuntdenken",
  title: "Deelidentiteiten- en kruispuntdenkentest",
  description: "Beantwoord 42 duidelijke vragen over 14 assen. Na afloop zie je per as waar je in de Belgische context relatief meer structurele barrières of meer structurele voordelen ervaart.",
  estimatedTime: "Ongeveer 8 tot 10 minuten",
  resultType: "identity-intersectionality-profile",
  mainScoreHeading: "Jouw identiteitslandschap",
  printReportSubtitle: "Deelidentiteiten- en kruispuntdenkenrapport",
  schemaVersion: 2,
  createSession({ startedAt }) {
    return {
      schemaVersion: 2,
      currentQuestionIndex: 0,
      answers: {},
      startedAt
    };
  },
  prepareStoredState: prepareIdentityIntersectionalityStoredState,
  getChoices: getIdentityIntersectionalityChoices,
  renderQuestionInput: renderIdentityIntersectionalityQuestionInput,
  isAnswerValid: isIdentityIntersectionalityAnswerValid,
  calculateResult: calculateIdentityIntersectionalityResult,
  renderResultDetails: renderIdentityIntersectionalityProfile,
  evidence: {
    summary: "De tool is gebaseerd op intersectionaliteit en privilege-awareness, met Belgische contextdata van onder meer Statbel, Unia, het Instituut voor de gelijkheid van vrouwen en mannen, FRA, de Dienst Vreemdelingenzaken en de Nationale Bank.",
    source: "Crenshaw (1989, 1991), McIntosh (1988/1989) en Collins (1990). Belgische cijfers en regels worden per as met bron vermeld.",
    disclaimer: "Dit is een educatieve zelfreflectietool. De stippen zijn transparante reflectieposities, geen juridisch oordeel, diagnose of bewijs dat iedere ervaring door één identiteit wordt veroorzaakt."
  },
  dimensions: (window.IDENTITY_INTERSECTIONALITY_AXES || []).map(axis => ({
    id: axis.id,
    label: axis.label
  })),
  questions: window.IDENTITY_INTERSECTIONALITY_QUESTIONS || []
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
  ? window.UNFOLD_TEST_DEFINITIONS
  : [];

window.UNFOLD_TEST_DEFINITIONS.push(IDENTITY_INTERSECTIONALITY_TEST_DEFINITION);
