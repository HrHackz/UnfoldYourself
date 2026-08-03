"use strict";

function setDigitalSkillsQuestionChrome({ area, counter, percentage, text, interactionApi }) {
  const counterElement = document.getElementById("questionCounter");
  const percentageElement = document.getElementById("questionPercentage");
  const progressBar = document.getElementById("questionProgressBar");
  const category = document.getElementById("questionCategory");
  const questionTextElement = document.getElementById("questionText");
  const instruction = document.getElementById("questionInstruction");

  if (counterElement) counterElement.textContent = counter;
  if (percentageElement) percentageElement.textContent = `${percentage}%`;
  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (category) {
    category.textContent = area?.title || "Digitale skills";
    category.hidden = false;
  }
  if (questionTextElement) questionTextElement.textContent = text;
  if (instruction) {
    instruction.textContent = "";
    instruction.hidden = true;
  }

  interactionApi.updateTopbar(area?.title || "Digitale skills", percentage);
}

function createDigitalSkillsElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = String(text);
  return element;
}

function getDigitalSkillsAreaStatus(session, area) {
  const areaState = getDigitalSkillsAreaState(session, area.id);
  const answered = getDigitalSkillsAnsweredCount(session, area.id);
  const total = getDigitalSkillsAreaQuestions(area.id).length;

  if (areaState.status === "completed") {
    const result = session.areaResults?.[area.id] || calculateDigitalSkillsAreaResult(area.id, session.answers);
    return {
      className: "is-completed",
      label: "Voltooid",
      meta: `${result?.displayPercentage ?? 0}% · ${result?.levelLabel || "Resultaat beschikbaar"}`,
      button: "Bekijk gebiedsresultaat"
    };
  }

  if (answered > 0) {
    return {
      className: "is-progress",
      label: "In uitvoering",
      meta: `${answered} van ${total} stellingen beantwoord`,
      button: "Hervat gebied"
    };
  }

  return {
    className: "is-ready",
    label: "Niet gestart",
    meta: `${total} stellingen`,
    button: "Start gebied"
  };
}

function openDigitalSkillsArea(session, areaId, interactionApi, showResult = false) {
  const areaState = getDigitalSkillsAreaState(session, areaId);
  session.selectedAreaId = areaId;
  session.workspaceView = showResult && areaState.status === "completed"
    ? "area-result"
    : "area-question";

  if (areaState.status === "not-started") {
    areaState.status = "in-progress";
    areaState.startedAt = new Date().toISOString();
    areaState.currentIndex = 0;
  }

  session.updatedAt = new Date().toISOString();
  interactionApi.save();
  interactionApi.rerender();
}

function renderDigitalSkillsDashboard(context) {
  const { container, session, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: true, nextHidden: true, saveExitHidden: true });

  const completedCount = DIGITAL_SKILLS_AREAS.filter(area =>
    getDigitalSkillsAreaState(session, area.id).status === "completed"
  ).length;
  const allComplete = completedCount === DIGITAL_SKILLS_AREAS.length;

  setDigitalSkillsQuestionChrome({
    area: null,
    counter: `${completedCount} van 5 gebieden voltooid`,
    percentage: Math.round((completedCount / 5) * 100),
    text: "Kies een digitaal competentiegebied",
    interactionApi
  });

  const wrapper = createDigitalSkillsElement("div", "digital-skills-dashboard");
  const intro = createDigitalSkillsElement(
    "p",
    "digital-skills-dashboard-intro",
    "Je kunt de vijf gebieden in je eigen volgorde invullen. Antwoorden en voortgang worden na iedere keuze lokaal opgeslagen."
  );
  const grid = createDigitalSkillsElement("div", "digital-skills-area-grid");

  DIGITAL_SKILLS_AREAS.forEach(area => {
    const status = getDigitalSkillsAreaStatus(session, area);
    const card = createDigitalSkillsElement("article", `digital-skills-area-card ${status.className}`);
    const badge = createDigitalSkillsElement("span", "digital-skills-area-status", status.label);
    const title = createDigitalSkillsElement("h3", "", area.title);
    const description = createDigitalSkillsElement("p", "", area.description);
    const meta = createDigitalSkillsElement("small", "", status.meta);
    const button = createDigitalSkillsElement("button", "button button-secondary", status.button);
    button.type = "button";
    button.addEventListener("click", () => {
      openDigitalSkillsArea(
        session,
        area.id,
        interactionApi,
        getDigitalSkillsAreaState(session, area.id).status === "completed"
      );
    });
    card.append(badge, title, description, meta, button);
    grid.appendChild(card);
  });

  const actions = createDigitalSkillsElement("div", "digital-skills-dashboard-actions");
  const firstIncomplete = DIGITAL_SKILLS_AREAS.find(area =>
    getDigitalSkillsAreaState(session, area.id).status !== "completed"
  );

  if (firstIncomplete) {
    const continueButton = createDigitalSkillsElement(
      "button",
      "button button-primary",
      completedCount > 0 ? "Ga verder met de volledige test" : "Start de volledige test"
    );
    continueButton.type = "button";
    continueButton.addEventListener("click", () => openDigitalSkillsArea(session, firstIncomplete.id, interactionApi));
    actions.appendChild(continueButton);
  }

  if (allComplete) {
    const resultButton = createDigitalSkillsElement("button", "button button-primary", "Bekijk mijn volledige rapport");
    resultButton.type = "button";
    resultButton.addEventListener("click", () => interactionApi.complete());
    actions.appendChild(resultButton);
  }

  const closeButton = createDigitalSkillsElement("button", "button button-secondary", "Opslaan en terug naar mijn profiel");
  closeButton.type = "button";
  closeButton.addEventListener("click", () => interactionApi.close("Je voortgang is lokaal opgeslagen."));
  actions.appendChild(closeButton);

  wrapper.append(intro, grid, actions);
  container.appendChild(wrapper);
  return true;
}

function finishDigitalSkillsArea(session, areaId, interactionApi) {
  const areaState = getDigitalSkillsAreaState(session, areaId);
  const result = calculateDigitalSkillsAreaResult(areaId, session.answers);
  areaState.status = "completed";
  areaState.completedAt = new Date().toISOString();
  session.areaResults[areaId] = { ...result, completedAt: areaState.completedAt };
  session.workspaceView = "area-result";
  session.updatedAt = new Date().toISOString();
  interactionApi.save();
  interactionApi.rerender();
}

function renderDigitalSkillsAreaQuestion(context) {
  const { container, session, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: true, nextHidden: true, saveExitHidden: true });

  const area = getDigitalSkillsArea(session.selectedAreaId);
  if (!area) {
    session.workspaceView = "dashboard";
    interactionApi.rerender();
    return true;
  }

  const areaState = getDigitalSkillsAreaState(session, area.id);
  const questions = getDigitalSkillsAreaQuestions(area.id);
  const index = Math.max(0, Math.min(areaState.currentIndex, questions.length - 1));
  areaState.currentIndex = index;
  areaState.status = "in-progress";
  areaState.startedAt = areaState.startedAt || new Date().toISOString();
  const question = questions[index];
  const percentage = Math.round(((index + 1) / questions.length) * 100);

  setDigitalSkillsQuestionChrome({
    area,
    counter: `Vraag ${index + 1} van ${questions.length}`,
    percentage,
    text: question.textNl,
    interactionApi
  });

  const wrapper = createDigitalSkillsElement("div", "digital-skills-question");
  const options = createDigitalSkillsElement("div", "digital-skills-answer-grid");
  const scale = DIGITAL_SKILLS_ANSWER_SCALES[question.answerScale] || [];
  const selected = session.answers[question.id];
  let advancing = false;

  scale.forEach(answer => {
    const button = createDigitalSkillsElement("button", "digital-skills-answer-button", answer.label);
    button.type = "button";
    button.classList.toggle("is-selected", Number(selected) === Number(answer.value));
    button.setAttribute("aria-pressed", String(Number(selected) === Number(answer.value)));
    button.addEventListener("click", () => {
      if (advancing) return;
      const existed = Object.prototype.hasOwnProperty.call(session.answers, question.id);
      const previous = session.answers[question.id];
      session.answers[question.id] = answer.value;
      session.answerMeta[question.id] = {
        answeredAt: new Date().toISOString(),
        changed: Boolean(existed && Number(previous) !== Number(answer.value))
      };
      session.updatedAt = new Date().toISOString();
      interactionApi.save();

      options.querySelectorAll(".digital-skills-answer-button").forEach(option => {
        const active = option === button;
        option.classList.toggle("is-selected", active);
        option.setAttribute("aria-pressed", String(active));
      });

      advancing = true;
      window.setTimeout(() => {
        if (index === questions.length - 1) {
          finishDigitalSkillsArea(session, area.id, interactionApi);
        } else {
          areaState.currentIndex = index + 1;
          session.updatedAt = new Date().toISOString();
          interactionApi.save();
          interactionApi.rerender();
        }
      }, 180);
    });
    options.appendChild(button);
  });

  const actions = createDigitalSkillsElement("div", "digital-skills-question-actions");
  if (index > 0) {
    const previousButton = createDigitalSkillsElement("button", "button button-secondary", "Vorige stelling");
    previousButton.type = "button";
    previousButton.addEventListener("click", () => {
      areaState.currentIndex = index - 1;
      interactionApi.save();
      interactionApi.rerender();
    });
    actions.appendChild(previousButton);
  }

  const overviewButton = createDigitalSkillsElement("button", "button button-secondary", "Opslaan en naar gebieden");
  overviewButton.type = "button";
  overviewButton.addEventListener("click", () => {
    session.workspaceView = "dashboard";
    session.selectedAreaId = null;
    interactionApi.save();
    interactionApi.rerender();
  });
  actions.appendChild(overviewButton);

  wrapper.append(options, actions);
  container.appendChild(wrapper);
  return true;
}

function createDigitalSkillsCompetenceFeedback(item) {
  const row = createDigitalSkillsElement("section", "digital-skills-competence-row");
  row.append(
    createDigitalSkillsElement("strong", "", item.title),
    createDigitalSkillsElement("p", "", item.description)
  );

  if (item.needsDevelopmentFeedback) {
    row.classList.add("needs-development");
    row.appendChild(createDigitalSkillsElement(
      "p",
      "digital-skills-development-note",
      item.feedbackBand === "low"
        ? "Dit onderdeel biedt nog duidelijke ruimte om verder te verkennen en te oefenen."
        : "Je geeft aan dat je hier al enige basis in hebt. Verdere oefening of uitleg kan helpen om zelfstandiger te worden."
    ));
  }

  return row;
}

function renderDigitalSkillsAreaResult(context) {
  const { container, session, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: true, nextHidden: true, saveExitHidden: true });
  const area = getDigitalSkillsArea(session.selectedAreaId);
  if (!area) {
    session.workspaceView = "dashboard";
    interactionApi.rerender();
    return true;
  }

  const result = session.areaResults?.[area.id] || calculateDigitalSkillsAreaResult(area.id, session.answers);
  setDigitalSkillsQuestionChrome({
    area,
    counter: "Gebiedsresultaat",
    percentage: 100,
    text: area.title,
    interactionApi
  });

  const wrapper = createDigitalSkillsElement("div", "digital-skills-area-result");
  const scoreCard = createDigitalSkillsElement("div", "digital-skills-area-score-card");
  scoreCard.append(
    createDigitalSkillsElement("strong", "", `${result.displayPercentage}%`),
    createDigitalSkillsElement("span", "", result.levelLabel),
    createDigitalSkillsElement("p", "", "Dit resultaat beschrijft je eigen inschatting binnen dit gebied.")
  );

  const competenceList = createDigitalSkillsElement("div", "digital-skills-competence-list");
  result.competenceResults.forEach(item => competenceList.appendChild(createDigitalSkillsCompetenceFeedback(item)));

  const actions = createDigitalSkillsElement("div", "digital-skills-question-actions");
  const overviewButton = createDigitalSkillsElement("button", "button button-primary", "Terug naar de vijf gebieden");
  overviewButton.type = "button";
  overviewButton.addEventListener("click", () => {
    session.workspaceView = "dashboard";
    session.selectedAreaId = null;
    interactionApi.save();
    interactionApi.rerender();
  });
  actions.appendChild(overviewButton);

  const nextArea = DIGITAL_SKILLS_AREAS.find(candidate =>
    getDigitalSkillsAreaState(session, candidate.id).status !== "completed"
  );
  if (nextArea) {
    const nextButton = createDigitalSkillsElement("button", "button button-secondary", "Start het volgende gebied");
    nextButton.type = "button";
    nextButton.addEventListener("click", () => openDigitalSkillsArea(session, nextArea.id, interactionApi));
    actions.appendChild(nextButton);
  } else {
    const finalButton = createDigitalSkillsElement("button", "button button-primary", "Bekijk mijn volledige rapport");
    finalButton.type = "button";
    finalButton.addEventListener("click", () => interactionApi.complete());
    actions.appendChild(finalButton);
  }

  const retryButton = createDigitalSkillsElement("button", "button button-secondary", "Dit gebied opnieuw invullen");
  retryButton.type = "button";
  retryButton.addEventListener("click", () => {
    if (!window.confirm(`Wil je ${area.title} opnieuw invullen? Alleen de antwoorden van dit gebied worden verwijderd.`)) return;
    resetDigitalSkillsArea(session, area.id);
    interactionApi.save();
    interactionApi.rerender();
  });
  actions.appendChild(retryButton);

  wrapper.append(scoreCard, competenceList, actions);
  container.appendChild(wrapper);
  return true;
}

function renderDigitalSkillsQuestionInput(context) {
  const session = normalizeDigitalSkillsSession(context.session);
  if (session.workspaceView === "area-question") return renderDigitalSkillsAreaQuestion({ ...context, session });
  if (session.workspaceView === "area-result") return renderDigitalSkillsAreaResult({ ...context, session });
  return renderDigitalSkillsDashboard({ ...context, session });
}
