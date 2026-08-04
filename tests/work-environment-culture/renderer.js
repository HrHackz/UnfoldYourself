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

function normalizeWecPoints(answer) {
  const points = {};
  (window.WEC_CULTURE_ORDER || []).forEach(id => {
    points[id] = Math.max(0, Math.min(100, Math.round((Number(answer?.points?.[id]) || 0) / 5) * 5));
  });
  const total = Object.values(points).reduce((sum, value) => sum + value, 0);
  if (total !== 100) {
    return Object.fromEntries((window.WEC_CULTURE_ORDER || []).map(id => [id, 25]));
  }
  return points;
}

function renderWecCultureDistributor(context) {
  const { container, question, selectedAnswer, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: false, nextHidden: false, saveExitHidden: false });

  const order = Array.isArray(question.displayOrder) ? question.displayOrder : [...window.WEC_CULTURE_ORDER];
  let points = normalizeWecPoints(selectedAnswer);
  let touched = selectedAnswer?.touched === true;

  const wrapper = createWecElement("div", "wec-culture-input");
  const status = createWecElement("div", "wec-distribution-status");
  const statusText = createWecElement("span", "", touched ? "Verdeling opgeslagen" : "Pas de verdeling aan of bevestig bewust 25–25–25–25");
  const totalText = createWecElement("strong", "", "Totaal: 100 punten");
  status.append(statusText, totalText);

  const track = createWecElement("div", "wec-distribution-track");
  track.setAttribute("aria-label", "Verdeling van 100 punten over vier cultuurbeschrijvingen");
  const segmentLayer = createWecElement("div", "wec-segment-layer");
  const handleLayer = createWecElement("div", "wec-handle-layer");
  track.append(segmentLayer, handleLayer);

  const cards = createWecElement("div", "wec-culture-option-grid");
  const segmentElements = new Map();
  const scoreElements = new Map();
  const cardElements = new Map();
  const handles = [];

  order.forEach((cultureId, index) => {
    const segment = createWecElement("span", `wec-track-segment is-${index + 1}`);
    segmentElements.set(cultureId, segment);
    segmentLayer.appendChild(segment);

    const card = createWecElement("article", `wec-culture-option is-${index + 1}`);
    const header = createWecElement("div", "wec-culture-option-header");
    const label = createWecElement("span", "wec-option-number", String(index + 1));
    const score = createWecElement("strong", "wec-option-score", `${points[cultureId]} punten`);
    scoreElements.set(cultureId, score);
    header.append(label, score);
    const text = createWecElement("p", "", question.options[cultureId]);

    const controls = createWecElement("div", "wec-point-controls");
    const minus = createWecElement("button", "wec-point-button", "−5");
    minus.type = "button";
    minus.setAttribute("aria-label", `Vijf punten minder voor beschrijving ${index + 1}`);
    const plus = createWecElement("button", "wec-point-button", "+5");
    plus.type = "button";
    plus.setAttribute("aria-label", `Vijf punten meer voor beschrijving ${index + 1}`);
    controls.append(minus, plus);
    card.append(header, text, controls);
    cards.appendChild(card);
    cardElements.set(cultureId, card);

    minus.addEventListener("click", () => adjustSegment(index, -5));
    plus.addEventListener("click", () => adjustSegment(index, 5));
  });

  for (let index = 0; index < 3; index += 1) {
    const handle = createWecElement("button", "wec-distribution-handle");
    handle.type = "button";
    handle.setAttribute("aria-label", `Scheidingspunt ${index + 1}. Gebruik de pijltjestoetsen of sleep om de punten te verdelen.`);
    handle.dataset.boundaryIndex = String(index);
    handleLayer.appendChild(handle);
    handles.push(handle);
  }

  const confirmRow = createWecElement("div", "wec-equal-confirm");
  const confirmButton = createWecElement("button", "button button-secondary", "Deze gelijke verdeling past bij mij");
  confirmButton.type = "button";
  confirmButton.hidden = touched || !order.every(id => points[id] === 25);
  confirmButton.addEventListener("click", () => commit(points));
  confirmRow.appendChild(confirmButton);

  function getBoundaries() {
    let cumulative = 0;
    return order.slice(0, 3).map(id => {
      cumulative += points[id];
      return cumulative;
    });
  }

  function commit(nextPoints) {
    points = { ...nextPoints };
    touched = true;
    recordWecAnswer(context, { touched: true, points: { ...points } });
    updateUi();
  }

  function adjustBoundary(index, delta) {
    const leftId = order[index];
    const rightId = order[index + 1];
    if (delta > 0 && points[rightId] < delta) return;
    if (delta < 0 && points[leftId] < Math.abs(delta)) return;
    const next = { ...points };
    next[leftId] += delta;
    next[rightId] -= delta;
    commit(next);
  }

  function adjustBoundaryTo(index, desiredBoundary) {
    const previousBoundary = order.slice(0, index).reduce((sum, id) => sum + points[id], 0);
    const nextBoundary = order.slice(0, index + 2).reduce((sum, id) => sum + points[id], 0);
    const desired = Math.max(previousBoundary, Math.min(nextBoundary, Math.round(desiredBoundary / 5) * 5));
    const current = previousBoundary + points[order[index]];
    adjustBoundary(index, desired - current);
  }

  function adjustSegment(index, delta) {
    const targetId = order[index];
    if (delta < 0) {
      if (points[targetId] < 5) return;
      const receiverId = order[(index + 1) % order.length];
      const next = { ...points };
      next[targetId] -= 5;
      next[receiverId] += 5;
      commit(next);
      return;
    }

    const donorOffsets = [1, -1, 2, -2, 3];
    const donorIndex = donorOffsets
      .map(offset => (index + offset + order.length) % order.length)
      .find(candidate => candidate !== index && points[order[candidate]] >= 5);
    if (donorIndex === undefined) return;
    const next = { ...points };
    next[targetId] += 5;
    next[order[donorIndex]] -= 5;
    commit(next);
  }

  function updateUi() {
    order.forEach((cultureId, index) => {
      const value = points[cultureId];
      const segment = segmentElements.get(cultureId);
      const score = scoreElements.get(cultureId);
      const card = cardElements.get(cultureId);
      segment.style.width = `${value}%`;
      score.textContent = `${value} punten`;
      card.classList.toggle("is-dominant", value === Math.max(...order.map(id => points[id])) && value > 25);
      card.classList.toggle("is-zero", value === 0);
      card.querySelectorAll(".wec-point-button")[0].disabled = value < 5;
      card.querySelectorAll(".wec-point-button")[1].disabled = order.every(id => id === cultureId || points[id] < 5);
      segment.setAttribute("aria-label", `Beschrijving ${index + 1}: ${value} punten`);
    });
    getBoundaries().forEach((boundary, index) => {
      handles[index].style.left = `${boundary}%`;
      handles[index].setAttribute("aria-valuenow", String(boundary));
    });
    statusText.textContent = touched ? "Verdeling opgeslagen" : "Pas de verdeling aan of bevestig bewust 25–25–25–25";
    confirmButton.hidden = touched || !order.every(id => points[id] === 25);
  }

  handles.forEach((handle, index) => {
    handle.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        adjustBoundary(index, -5);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        adjustBoundary(index, 5);
      }
    });

    const startDrag = event => {
      event.preventDefault();
      handle.classList.add("is-dragging");
      const pointerMove = moveEvent => {
        const rect = track.getBoundingClientRect();
        if (!rect.width) return;
        const relative = ((moveEvent.clientX - rect.left) / rect.width) * 100;
        adjustBoundaryTo(index, relative);
      };
      const pointerUp = () => {
        handle.classList.remove("is-dragging");
        window.removeEventListener("pointermove", pointerMove);
        window.removeEventListener("pointerup", pointerUp);
      };
      window.addEventListener("pointermove", pointerMove);
      window.addEventListener("pointerup", pointerUp, { once: true });
      interactionApi.registerCleanup(pointerUp);
    };
    handle.addEventListener("pointerdown", startDrag);
  });

  updateUi();
  wrapper.append(status, track, cards, confirmRow);
  container.appendChild(wrapper);
  return true;
}

function getWecSliderDisplay(question, value) {
  const score = clampWecValue(value);
  if (score <= 35) return { title: question.left.title, side: "left" };
  if (score >= 66) return { title: question.right.title, side: "right" };
  return { title: question.middle.title, side: "middle" };
}

function renderWecBipolarSlider(context) {
  const { container, question, selectedAnswer, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: false, nextHidden: false, saveExitHidden: false });
  let value = Number.isFinite(Number(selectedAnswer?.value)) ? clampWecValue(selectedAnswer.value) : 50;
  let touched = selectedAnswer?.touched === true;

  const wrapper = createWecElement("div", "wec-slider-input");
  const current = createWecElement("div", "wec-slider-current");
  const currentLabel = createWecElement("span", "", "Jouw positie");
  const currentValue = createWecElement("strong");
  current.append(currentLabel, currentValue);

  const range = document.createElement("input");
  range.type = "range";
  range.min = "0";
  range.max = "100";
  range.step = "1";
  range.value = String(value);
  range.className = "wec-bipolar-range";
  range.setAttribute("aria-label", question.text);

  const anchorGrid = createWecElement("div", "wec-slider-anchors");
  [question.left, question.middle, question.right].forEach((anchor, index) => {
    const card = createWecElement("article", `wec-slider-anchor is-${index === 0 ? "left" : index === 1 ? "middle" : "right"}`);
    card.append(
      createWecElement("strong", "", anchor.title),
      createWecElement("p", "", anchor.description)
    );
    anchorGrid.appendChild(card);
  });

  const confirmButton = createWecElement("button", "button button-secondary", "Deze middenpositie past bij mij");
  confirmButton.type = "button";
  confirmButton.hidden = touched || value !== 50;

  function updateUi() {
    const display = getWecSliderDisplay(question, value);
    currentValue.textContent = `${display.title} · ${Math.round(value)}/100`;
    current.dataset.side = display.side;
    range.value = String(value);
    confirmButton.hidden = touched || value !== 50;
  }

  function commit(nextValue) {
    value = clampWecValue(nextValue);
    touched = true;
    recordWecAnswer(context, { touched: true, value });
    updateUi();
  }

  range.addEventListener("input", () => commit(Number(range.value)));
  confirmButton.addEventListener("click", () => commit(value));

  updateUi();
  wrapper.append(current, range, anchorGrid, confirmButton);
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

function renderWecChoiceCards(context) {
  const { container, question, selectedAnswer, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: false, nextHidden: false, saveExitHidden: false });
  const grid = createWecElement("div", question.type === "visual-cards" ? "wec-visual-card-grid" : "wec-choice-card-grid");

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
  if (question.type === "culture-distribution") return renderWecCultureDistributor(context);
  if (question.type === "bipolar-slider") return renderWecBipolarSlider(context);
  if (question.type === "visual-cards" || question.type === "choice-cards") return renderWecChoiceCards(context);
  return false;
}
