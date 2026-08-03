"use strict";

function createLeadershipElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}

function getLeadershipModuleStatusLabel(state) {
  if (state.status === "completed") return "Voltooid";
  if (state.status === "in-progress") return "In uitvoering";
  return "Niet gestart";
}

function setLeadershipQuestionChrome({ module, counter, percentage, text, interactionApi }) {
  questionTestTitle.textContent = "Leiderschapstest";
  questionCounter.textContent = counter;
  questionPercentage.textContent = `${percentage}%`;
  questionProgressBar.style.width = `${percentage}%`;
  questionCategory.textContent = module.title;
  questionCategory.hidden = false;
  questionText.textContent = text;
  questionInstruction.textContent = "";
  questionInstruction.hidden = true;
  interactionApi.updateTopbar(module.title, percentage);
}

function openLeadershipModule(session, moduleId, interactionApi) {
  const module = getLeadershipModule(moduleId);
  if (!module) return;
  const moduleState = getLeadershipModuleState(session, moduleId);
  session.selectedModuleId = moduleId;
  session.workspaceView = moduleState.status === "completed" ? "module-complete" : "module-question";
  session.updatedAt = new Date().toISOString();
  interactionApi.save();
  interactionApi.rerender();
}

function renderLeadershipDashboard(context) {
  const { container, session, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: true, nextHidden: true, saveExitHidden: true });
  questionTestTitle.textContent = "Leiderschapstest";
  questionCategory.textContent = "Twee geïntegreerde onderdelen";
  questionCategory.hidden = false;
  questionText.textContent = "Kies een onderdeel";
  questionInstruction.textContent = "";
  questionInstruction.hidden = true;

  const completedCount = LEADERSHIP_MODULES.filter(module =>
    getLeadershipModuleState(session, module.id).status === "completed"
  ).length;
  const answeredCount = Object.keys(session.answers || {}).length;
  const progress = Math.round((answeredCount / 80) * 100);
  questionCounter.textContent = `${completedCount} van 2 onderdelen voltooid`;
  questionPercentage.textContent = `${progress}%`;
  questionProgressBar.style.width = `${progress}%`;
  interactionApi.updateTopbar("Leiderschapstest", progress);

  const wrapper = createLeadershipElement("div", "leadership-dashboard");
  wrapper.appendChild(createLeadershipElement(
    "p",
    "leadership-dashboard-intro",
    "De praktijksituaties brengen je situationele voorkeur en afstemming in kaart. De gedragsstellingen tonen welke van twaalf leiderschapsstijlen het natuurlijkst bij je aansluiten."
  ));

  const grid = createLeadershipElement("div", "leadership-module-grid");
  LEADERSHIP_MODULES.forEach((module, index) => {
    const state = getLeadershipModuleState(session, module.id);
    const answered = getLeadershipAnsweredCount(session, module.id);
    const card = createLeadershipElement("article", "leadership-module-card");
    if (state.status === "completed") card.classList.add("is-completed");
    if (state.status === "in-progress") card.classList.add("is-progress");

    const badge = createLeadershipElement("span", "leadership-module-status", getLeadershipModuleStatusLabel(state));
    const title = createLeadershipElement("h3", "", `${index + 1}. ${module.title}`);
    const description = createLeadershipElement("p", "", module.description);
    const meta = createLeadershipElement(
      "small",
      "",
      `${answered} van ${module.questionCount} beantwoord · ${module.estimatedTime}`
    );
    const button = createLeadershipElement(
      "button",
      "button button-secondary",
      state.status === "completed" ? "Bekijk onderdeel" : state.status === "in-progress" ? "Ga verder" : "Start onderdeel"
    );
    button.type = "button";
    button.addEventListener("click", () => openLeadershipModule(session, module.id, interactionApi));
    card.append(badge, title, description, meta, button);
    grid.appendChild(card);
  });

  const actions = createLeadershipElement("div", "leadership-dashboard-actions");
  const firstIncomplete = LEADERSHIP_MODULES.find(module =>
    getLeadershipModuleState(session, module.id).status !== "completed"
  );

  if (firstIncomplete) {
    const continueButton = createLeadershipElement(
      "button",
      "button button-primary",
      answeredCount > 0 ? "Ga verder met de volledige test" : "Start de volledige test"
    );
    continueButton.type = "button";
    continueButton.addEventListener("click", () => openLeadershipModule(session, firstIncomplete.id, interactionApi));
    actions.appendChild(continueButton);
  } else {
    const resultButton = createLeadershipElement("button", "button button-primary", "Bekijk mijn leiderschapsrapport");
    resultButton.type = "button";
    resultButton.addEventListener("click", () => interactionApi.complete());
    actions.appendChild(resultButton);
  }

  const closeButton = createLeadershipElement("button", "button button-secondary", "Opslaan en terug naar mijn profiel");
  closeButton.type = "button";
  closeButton.addEventListener("click", () => interactionApi.close("Je voortgang is lokaal opgeslagen."));
  actions.appendChild(closeButton);

  wrapper.append(grid, actions);
  container.appendChild(wrapper);
  return true;
}

function finishLeadershipModule(session, moduleId, interactionApi) {
  const state = getLeadershipModuleState(session, moduleId);
  state.status = "completed";
  state.completedAt = new Date().toISOString();
  state.currentIndex = Math.max(0, getLeadershipModuleQuestions(moduleId).length - 1);
  session.workspaceView = "module-complete";
  session.updatedAt = new Date().toISOString();
  interactionApi.save();
  interactionApi.rerender();
}

function getLeadershipQuestionChoices(moduleId, question) {
  if (moduleId === "situational") {
    return question.options.map(option => ({ value: option.id, label: option.text }));
  }
  return LEADERSHIP_FREQUENCY_CHOICES;
}

function leadershipAnswerValuesEqual(left, right) {
  return String(left) === String(right);
}

function renderLeadershipModuleQuestion(context) {
  const { container, session, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: true, nextHidden: true, saveExitHidden: true });

  const module = getLeadershipModule(session.selectedModuleId);
  if (!module) {
    session.workspaceView = "dashboard";
    interactionApi.rerender();
    return true;
  }

  const moduleState = getLeadershipModuleState(session, module.id);
  const questions = getLeadershipModuleQuestions(module.id);
  const index = Math.max(0, Math.min(moduleState.currentIndex, questions.length - 1));
  moduleState.currentIndex = index;
  moduleState.status = "in-progress";
  moduleState.startedAt = moduleState.startedAt || new Date().toISOString();
  const question = questions[index];
  const percentage = Math.round(((index + 1) / questions.length) * 100);

  setLeadershipQuestionChrome({
    module,
    counter: `${module.id === "situational" ? "Situatie" : "Stelling"} ${index + 1} van ${questions.length}`,
    percentage,
    text: question.text,
    interactionApi
  });

  const wrapper = createLeadershipElement("div", "leadership-question");
  const options = createLeadershipElement("div", "leadership-answer-grid");
  const choices = getLeadershipQuestionChoices(module.id, question);
  const selected = session.answers[question.id];
  let advancing = false;

  choices.forEach(answer => {
    const button = createLeadershipElement("button", "leadership-answer-button", answer.label);
    button.type = "button";
    const isSelected = leadershipAnswerValuesEqual(selected, answer.value);
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));

    button.addEventListener("click", () => {
      if (advancing) return;
      const existed = Object.prototype.hasOwnProperty.call(session.answers, question.id);
      const previous = session.answers[question.id];
      session.answers[question.id] = answer.value;
      session.answerMeta[question.id] = {
        answeredAt: new Date().toISOString(),
        changed: Boolean(existed && !leadershipAnswerValuesEqual(previous, answer.value))
      };
      session.updatedAt = new Date().toISOString();
      interactionApi.save();

      options.querySelectorAll(".leadership-answer-button").forEach(option => {
        const active = option === button;
        option.classList.toggle("is-selected", active);
        option.setAttribute("aria-pressed", String(active));
      });

      advancing = true;
      window.setTimeout(() => {
        if (index === questions.length - 1) {
          finishLeadershipModule(session, module.id, interactionApi);
        } else {
          moduleState.currentIndex = index + 1;
          session.updatedAt = new Date().toISOString();
          interactionApi.save();
          interactionApi.rerender();
        }
      }, 180);
    });
    options.appendChild(button);
  });

  const actions = createLeadershipElement("div", "leadership-question-actions");
  if (index > 0) {
    const previousButton = createLeadershipElement("button", "button button-secondary", module.id === "situational" ? "Vorige situatie" : "Vorige stelling");
    previousButton.type = "button";
    previousButton.addEventListener("click", () => {
      moduleState.currentIndex = index - 1;
      interactionApi.save();
      interactionApi.rerender();
    });
    actions.appendChild(previousButton);
  }

  const dashboardButton = createLeadershipElement("button", "button button-secondary", "Opslaan en naar onderdelen");
  dashboardButton.type = "button";
  dashboardButton.addEventListener("click", () => {
    session.workspaceView = "dashboard";
    session.selectedModuleId = null;
    interactionApi.save();
    interactionApi.rerender();
  });
  actions.appendChild(dashboardButton);

  wrapper.append(options, actions);
  container.appendChild(wrapper);
  return true;
}

function renderLeadershipModuleComplete(context) {
  const { container, session, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: true, nextHidden: true, saveExitHidden: true });
  const module = getLeadershipModule(session.selectedModuleId);
  if (!module) {
    session.workspaceView = "dashboard";
    interactionApi.rerender();
    return true;
  }

  setLeadershipQuestionChrome({
    module,
    counter: "Onderdeel voltooid",
    percentage: 100,
    text: module.title,
    interactionApi
  });

  const wrapper = createLeadershipElement("div", "leadership-module-complete");
  const card = createLeadershipElement("section", "leadership-complete-card");
  card.append(
    createLeadershipElement("span", "leadership-complete-badge", "Voltooid"),
    createLeadershipElement("h3", "", `${module.questionCount} van ${module.questionCount} antwoorden opgeslagen`),
    createLeadershipElement(
      "p",
      "",
      "De uitkomsten van dit onderdeel worden samen met het andere onderdeel verwerkt in je volledige leiderschapsrapport."
    )
  );

  const actions = createLeadershipElement("div", "leadership-question-actions");
  const nextModule = LEADERSHIP_MODULES.find(candidate =>
    getLeadershipModuleState(session, candidate.id).status !== "completed"
  );

  if (nextModule) {
    const nextButton = createLeadershipElement("button", "button button-primary", `Ga verder met ${nextModule.title}`);
    nextButton.type = "button";
    nextButton.addEventListener("click", () => openLeadershipModule(session, nextModule.id, interactionApi));
    actions.appendChild(nextButton);
  } else {
    const resultButton = createLeadershipElement("button", "button button-primary", "Bekijk mijn volledige rapport");
    resultButton.type = "button";
    resultButton.addEventListener("click", () => interactionApi.complete());
    actions.appendChild(resultButton);
  }

  const overviewButton = createLeadershipElement("button", "button button-secondary", "Terug naar de twee onderdelen");
  overviewButton.type = "button";
  overviewButton.addEventListener("click", () => {
    session.workspaceView = "dashboard";
    session.selectedModuleId = null;
    interactionApi.save();
    interactionApi.rerender();
  });
  actions.appendChild(overviewButton);

  const retryButton = createLeadershipElement("button", "button button-secondary", "Dit onderdeel opnieuw invullen");
  retryButton.type = "button";
  retryButton.addEventListener("click", () => {
    if (!window.confirm(`Wil je ${module.title} opnieuw invullen? Alleen de antwoorden van dit onderdeel worden verwijderd.`)) return;
    resetLeadershipModule(session, module.id);
    interactionApi.save();
    interactionApi.rerender();
  });
  actions.appendChild(retryButton);

  wrapper.append(card, actions);
  container.appendChild(wrapper);
  return true;
}

function renderLeadershipQuestionInput(context) {
  const session = normalizeLeadershipSession(context.session);
  if (session.workspaceView === "module-question") return renderLeadershipModuleQuestion({ ...context, session });
  if (session.workspaceView === "module-complete") return renderLeadershipModuleComplete({ ...context, session });
  return renderLeadershipDashboard({ ...context, session });
}
