"use strict";

function createWecElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}

function recordWecAnswer(context, value) {
  const { session, question, onChange, interactionApi } = context;
  session.answerMeta = session.answerMeta || {};
  const existing = session.answerMeta[question.id] || {};
  const now = new Date().toISOString();
  session.answerMeta[question.id] = {
    firstAnsweredAt: existing.firstAnsweredAt || now,
    lastAnsweredAt: now,
    changes: (Number(existing.changes) || 0) + 1
  };
  onChange(value);
  interactionApi.save();
}

function getWecCultureRankByPoints(points) {
  return (window.WEC_CULTURE_RANKS || []).find(rank => rank.points === Number(points)) || null;
}

function normalizeWecRanking(answer) {
  const allowed = new Set((window.WEC_CULTURE_RANKS || []).map(rank => rank.points));
  const points = {};
  const used = new Set();
  (window.WEC_CULTURE_ORDER || []).forEach(cultureId => {
    const value = Number(answer?.points?.[cultureId]);
    if (allowed.has(value) && !used.has(value)) {
      points[cultureId] = value;
      used.add(value);
    }
  });
  return points;
}

function renderWecCultureRanking(context) {
  const { container, question, selectedAnswer, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: false, nextHidden: false, saveExitHidden: false });

  const order = Array.isArray(question.displayOrder) ? question.displayOrder : [...window.WEC_CULTURE_ORDER];
  const ranks = window.WEC_CULTURE_RANKS || [];
  let points = normalizeWecRanking(selectedAnswer);

  const wrapper = createWecElement("div", "wec-culture-ranking");
  const status = createWecElement("div", "wec-ranking-status");
  const statusText = createWecElement("span");
  const statusCount = createWecElement("strong");
  status.append(statusText, statusCount);

  const cards = createWecElement("div", "wec-culture-option-grid");
  const cardElements = new Map();
  const scoreElements = new Map();

  function commit(nextPoints) {
    points = { ...nextPoints };
    recordWecAnswer(context, { touched: true, points: { ...points } });
    updateUi();
  }

  function assignRank(cultureId, pointsValue) {
    const next = { ...points };
    const currentValue = next[cultureId];
    const previousCulture = Object.keys(next).find(id => id !== cultureId && next[id] === pointsValue);

    if (previousCulture) {
      if (Number.isFinite(currentValue)) next[previousCulture] = currentValue;
      else delete next[previousCulture];
    }

    next[cultureId] = pointsValue;
    commit(next);
  }

  order.forEach((cultureId, index) => {
    const card = createWecElement("article", "wec-culture-option");
    card.dataset.cultureId = cultureId;

    const header = createWecElement("div", "wec-culture-option-header");
    const label = createWecElement("span", "wec-option-number", String(index + 1));
    const score = createWecElement("strong", "wec-option-score", "Nog kiezen");
    scoreElements.set(cultureId, score);
    header.append(label, score);

    const text = createWecElement("p", "", question.options[cultureId]);
    const controls = createWecElement("div", "wec-rank-controls");

    ranks.forEach(rank => {
      const button = createWecElement("button", "wec-rank-button", rank.label);
      button.type = "button";
      button.dataset.points = String(rank.points);
      button.setAttribute("aria-label", `${rank.label} voor beschrijving ${index + 1}`);
      button.addEventListener("click", () => assignRank(cultureId, rank.points));
      controls.appendChild(button);
    });

    card.append(header, text, controls);
    cards.appendChild(card);
    cardElements.set(cultureId, card);
  });

  function updateUi() {
    const assignedCount = Object.keys(points).length;
    statusText.textContent = assignedCount === order.length
      ? "Rangschikking compleet"
      : "Gebruik elke positie precies één keer";
    statusCount.textContent = `${assignedCount} van ${order.length} gekozen`;

    order.forEach(cultureId => {
      const card = cardElements.get(cultureId);
      const selectedValue = points[cultureId];
      const selectedRank = getWecCultureRankByPoints(selectedValue);
      scoreElements.get(cultureId).textContent = selectedRank?.label || "Nog kiezen";
      card.classList.toggle("is-ranked", Boolean(selectedRank));
      card.classList.toggle("is-top-ranked", selectedValue === 40);

      card.querySelectorAll(".wec-rank-button").forEach(button => {
        const buttonValue = Number(button.dataset.points);
        const selected = selectedValue === buttonValue;
        const usedByOther = Object.entries(points).some(([id, value]) => id !== cultureId && value === buttonValue);
        button.classList.toggle("is-selected", selected);
        button.classList.toggle("is-used", usedByOther && !selected);
        button.setAttribute("aria-pressed", String(selected));
        button.title = usedByOther && !selected
          ? "Deze positie is al gebruikt. Klik om de posities om te wisselen."
          : "";
      });
    });
  }

  updateUi();
  wrapper.append(status, cards);
  container.appendChild(wrapper);
  return true;
}

function createWecVisualScene(visual) {
  const scene = createWecElement("div", `wec-scene is-${visual}`);
  scene.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 5; index += 1) {
    scene.appendChild(createWecElement("span", `wec-scene-part part-${index + 1}`));
  }
  return scene;
}

function getWecChoiceGridClass(question) {
  if (question.type === "visual-cards") return "wec-visual-card-grid";
  if (question.type === "axis-choice") return "wec-axis-choice-grid";
  return "wec-choice-card-grid";
}

function renderWecChoiceCards(context) {
  const { container, question, selectedAnswer, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: false, nextHidden: false, saveExitHidden: false });
  const grid = createWecElement("div", getWecChoiceGridClass(question));

  question.options.forEach(option => {
    const button = createWecElement("button", "wec-selection-card");
    button.type = "button";
    const selected = selectedAnswer === option.id;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    if (question.type === "visual-cards") button.appendChild(createWecVisualScene(option.visual));

    const copy = createWecElement("span", "wec-selection-copy");
    if (option.subtitle) copy.appendChild(createWecElement("small", "", option.subtitle));
    copy.append(
      createWecElement("strong", "", option.title),
      createWecElement("span", "", option.description)
    );
    const marker = createWecElement("span", "wec-selection-marker", selected ? "Gekozen" : "Kies");
    button.append(copy, marker);

    button.addEventListener("click", () => {
      recordWecAnswer(context, option.id);
      grid.querySelectorAll(".wec-selection-card").forEach(card => {
        const active = card === button;
        card.classList.toggle("is-selected", active);
        card.setAttribute("aria-pressed", String(active));
        const cardMarker = card.querySelector(".wec-selection-marker");
        if (cardMarker) cardMarker.textContent = active ? "Gekozen" : "Kies";
      });
    });
    grid.appendChild(button);
  });

  container.appendChild(grid);
  return true;
}

function renderWecQuestionInput(context) {
  const { question } = context;
  if (question.type === "culture-ranking") return renderWecCultureRanking(context);
  if (question.type === "axis-choice" || question.type === "visual-cards" || question.type === "choice-cards") {
    return renderWecChoiceCards(context);
  }
  return false;
}
