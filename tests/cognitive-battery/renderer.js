"use strict";

function createCognitiveModeButton(mode, title, description, selectedMode, onSelect) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "cognitive-mode-button";
  button.dataset.mode = mode;
  button.classList.toggle("is-selected", selectedMode === mode);
  button.setAttribute("aria-pressed", String(selectedMode === mode));

  const heading = document.createElement("strong");
  heading.textContent = title;

  const copy = document.createElement("span");
  copy.textContent = description;

  button.append(heading, copy);
  button.addEventListener("click", () => onSelect(mode));
  return button;
}

function renderCognitiveModuleSelection(context) {
  const {
    selectedAnswer,
    container,
    onChange,
    session,
    interactionApi
  } = context;

  interactionApi.configureNavigation({
    previousHidden: true,
    nextHidden: true,
    saveExitHidden: true
  });

  setCognitiveQuestionChrome({
    counter: "Modulekeuze",
    percentage: 0,
    category: "Cognitieve batterij samenstellen",
    title: "Welke onderdelen wil je uitvoeren?",
    instruction:
      "Alle zes cognitieve modules zijn volledig beschikbaar en kunnen afzonderlijk of gecombineerd worden uitgevoerd.",
    topbarLabel: "Cognitieve batterij · modulekeuze"
  });

  const modules = getCognitiveModuleDefinitions();
  const savedSelection = normalizeCognitiveSelection(
    selectedAnswer || {
      mode: session.mode,
      selectedModules: session.selectedModules
    }
  );

  let mode = savedSelection.mode;
  let selectedModules = [...savedSelection.selectedModules];

  const wrapper = document.createElement("div");
  wrapper.className = "cognitive-setup";

  const developmentNote = document.createElement("div");
  developmentNote.className = "cognitive-development-note";
  developmentNote.innerHTML = `
    <strong>Cognitieve batterij volledig beschikbaar</strong>
    <span>Alle zes modules zijn operationeel. Aandacht en werkgeheugen blijven afzonderlijk gescoorde subtaken.</span>
  `;

  const modeHeading = document.createElement("h3");
  modeHeading.textContent = "Kies de afnamevorm";

  const modeGrid = document.createElement("div");
  modeGrid.className = "cognitive-mode-grid";

  const moduleHeading = document.createElement("h3");
  moduleHeading.textContent = "Kies de modules";

  const moduleGrid = document.createElement("div");
  moduleGrid.className = "cognitive-module-grid";

  const summary = document.createElement("div");
  summary.className = "cognitive-selection-summary";
  summary.setAttribute("aria-live", "polite");

  const actionRow = document.createElement("div");
  actionRow.className = "cognitive-setup-actions";

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.className = "button button-primary";
  saveButton.textContent = "Keuze opslaan en modules bekijken";

  const warning = document.createElement("p");
  warning.className = "answer-warning cognitive-selection-warning";
  warning.hidden = true;
  warning.textContent = "Kies eerst een geldige afnamevorm en het vereiste aantal beschikbare modules.";

  function normalizeForMode() {
    if (mode === "full") {
      selectedModules = modules.map(module => module.id);
      return;
    }

    selectedModules = selectedModules.filter(moduleId =>
      isCognitiveModuleAvailable(moduleId)
    );

    if (mode === "single" && selectedModules.length > 1) {
      selectedModules = selectedModules.slice(0, 1);
    }
  }

  function saveSelection() {
    const normalized = applyCognitiveSelection(session, {
      mode,
      selectedModules
    });

    onChange({
      mode: normalized.mode,
      selectedModules: [...normalized.selectedModules]
    });
  }

  function updateSummary() {
    const selectedTitles = modules
      .filter(module => selectedModules.includes(module.id))
      .map(module => module.title);

    const modeLabel = {
      full: "Volledige batterij",
      selected: "Zelf samengestelde selectie",
      single: "Eén afzonderlijke module"
    }[mode] || "Nog geen afnamevorm gekozen";

    summary.replaceChildren();

    const heading = document.createElement("strong");
    heading.textContent = modeLabel;

    const text = document.createElement("span");
    text.textContent = selectedTitles.length > 0
      ? selectedTitles.join(" · ")
      : "Kies hieronder welke onderdelen je wilt opnemen.";

    summary.append(heading, text);
  }

  function renderModes() {
    modeGrid.replaceChildren(
      createCognitiveModeButton(
        "full",
        "Volledige batterij",
        "Alle zes modules, verdeeld over drie afnameblokken.",
        mode,
        selectMode
      ),
      createCognitiveModeButton(
        "selected",
        "Meerdere modules",
        "Kies twee of meer van de beschikbare modules.",
        mode,
        selectMode
      ),
      createCognitiveModeButton(
        "single",
        "Eén module",
        "Voer één beschikbare module afzonderlijk uit.",
        mode,
        selectMode
      )
    );
  }

  function toggleModule(moduleId) {
    warning.hidden = true;

    if (!isCognitiveModuleAvailable(moduleId) || mode === "full") {
      return;
    }

    if (!mode) {
      mode = "selected";
    }

    if (mode === "single") {
      selectedModules = [moduleId];
    } else if (selectedModules.includes(moduleId)) {
      selectedModules = selectedModules.filter(id => id !== moduleId);
    } else {
      selectedModules = [...selectedModules, moduleId];
    }

    saveSelection();
    renderAll();
  }

  function renderModules() {
    moduleGrid.replaceChildren();

    modules.forEach(module => {
      const selected = selectedModules.includes(module.id);
      const available = isCognitiveModuleAvailable(module.id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cognitive-module-card";
      button.classList.toggle("is-selected", selected);
      button.classList.toggle("is-unavailable", !available);
      button.setAttribute("aria-pressed", String(selected));
      button.disabled = mode === "full" || !available;

      const marker = document.createElement("span");
      marker.className = "cognitive-module-check";
      marker.textContent = selected ? "✓" : available ? "+" : "…";

      const copy = document.createElement("span");
      copy.className = "cognitive-module-copy";

      const title = document.createElement("strong");
      title.textContent = module.title;

      const description = document.createElement("span");
      description.textContent = module.description;

      const meta = document.createElement("small");
      meta.textContent = available
        ? `${module.estimatedTime} · beschikbaar`
        : "Volgt in een volgend werkpakket";

      copy.append(title, description, meta);
      button.append(marker, copy);
      button.addEventListener("click", () => toggleModule(module.id));
      moduleGrid.appendChild(button);
    });
  }

  function selectMode(nextMode) {
    mode = nextMode;
    warning.hidden = true;

    if (mode === "full") {
      selectedModules = modules.map(module => module.id);
    } else if (mode === "single") {
      selectedModules = selectedModules.filter(isCognitiveModuleAvailable).slice(0, 1);
    } else {
      selectedModules = selectedModules.filter(isCognitiveModuleAvailable);
    }

    saveSelection();
    renderAll();
  }

  function renderAll() {
    normalizeForMode();
    renderModes();
    renderModules();
    updateSummary();
  }

  saveButton.addEventListener("click", () => {
    const selection = {
      mode,
      selectedModules
    };

    if (!isCognitiveSelectionValid(selection)) {
      warning.hidden = false;
      return;
    }

    const normalized = applyCognitiveSelection(session, selection);
    session.setupCompleted = true;
    session.workspaceView = "dashboard";
    session.currentModuleId = null;
    session.updatedAt = new Date().toISOString();
    onChange(normalized);
    interactionApi.save();
    interactionApi.rerender();
  });

  actionRow.append(saveButton);
  wrapper.append(
    developmentNote,
    modeHeading,
    modeGrid,
    moduleHeading,
    moduleGrid,
    summary,
    warning,
    actionRow
  );
  container.appendChild(wrapper);

  renderAll();
  return true;
}

function getCognitiveDashboardStatus(moduleDefinition, moduleState) {
  if (!isCognitiveModuleAvailable(moduleDefinition.id)) {
    return {
      label: "Nog niet beschikbaar",
      className: "is-unavailable",
      buttonLabel: "Volgt later"
    };
  }

  if (moduleState?.status === "completed") {
    return {
      label: "Voltooid",
      className: "is-completed",
      buttonLabel: "Bekijk resultaat"
    };
  }

  if (moduleState?.status === "in-progress") {
    return {
      label: "In uitvoering",
      className: "is-progress",
      buttonLabel: "Hervat module"
    };
  }

  return {
    label: "Klaar om te starten",
    className: "is-ready",
    buttonLabel: "Start module"
  };
}

function renderCognitiveDashboard(context) {
  const { container, session, interactionApi } = context;
  interactionApi.configureNavigation({
    previousHidden: true,
    nextHidden: true,
    saveExitHidden: true
  });

  const selectedModules = getCognitiveModuleDefinitions().filter(module =>
    session.selectedModules.includes(module.id)
  );
  const availableSelected = selectedModules.filter(module =>
    isCognitiveModuleAvailable(module.id)
  );
  const completedAvailable = availableSelected.filter(module =>
    getCognitiveModuleState(session, module.id)?.status === "completed"
  ).length;
  const allAvailableModules = getCognitiveModuleDefinitions().filter(module =>
    isCognitiveModuleAvailable(module.id)
  );
  const allModulesCompleted = allAvailableModules.length > 0 && allAvailableModules.every(module =>
    getCognitiveModuleState(session, module.id)?.status === "completed"
  );
  const dashboardProgress = availableSelected.length > 0
    ? Math.round((completedAvailable / availableSelected.length) * 100)
    : 0;

  setCognitiveQuestionChrome({
    counter: "Moduleoverzicht",
    percentage: dashboardProgress,
    category: "Cognitieve vaardigheidsbatterij",
    title: "Jouw gekozen cognitieve modules",
    instruction:
      "Start of hervat een beschikbare module. Iedere module bewaart haar eigen antwoorden, tijden en resultaat.",
    topbarLabel: "Cognitieve batterij · moduleoverzicht"
  });

  const wrapper = document.createElement("div");
  wrapper.className = "cognitive-dashboard";

  const note = document.createElement("div");
  note.className = "cognitive-development-note";
  note.innerHTML = `
    <strong>${availableSelected.length} ${availableSelected.length === 1 ? "geselecteerde module is" : "geselecteerde modules zijn"} nu beschikbaar</strong>
    <span>Alle geselecteerde modules zijn operationeel en bewaren hun eigen antwoorden, tijden en resultaten.</span>
  `;
  wrapper.appendChild(note);

  const grid = document.createElement("div");
  grid.className = "cognitive-dashboard-grid";

  selectedModules.forEach(module => {
    const available = isCognitiveModuleAvailable(module.id);
    const moduleState = available ? getCognitiveModuleState(session, module.id) : null;
    const status = getCognitiveDashboardStatus(module, moduleState);
    const card = document.createElement("article");
    card.className = `cognitive-dashboard-card ${status.className}`;

    const header = document.createElement("div");
    header.className = "cognitive-dashboard-card-header";
    const title = document.createElement("h3");
    title.textContent = module.title;
    const badge = document.createElement("span");
    badge.className = "cognitive-status-badge";
    badge.textContent = status.label;
    header.append(title, badge);

    const description = document.createElement("p");
    description.textContent = module.description;

    const detail = document.createElement("p");
    detail.className = "cognitive-dashboard-detail";

    if (module.id === "attentionWorkingMemory" && available) {
      const attentionStatus = moduleState?.attention?.status || "not-started";
      const memoryStatus = moduleState?.workingMemory?.status || "not-started";
      const labels = { "not-started": "niet gestart", "in-progress": "in uitvoering", completed: "voltooid" };
      detail.textContent = `Aandacht: ${labels[attentionStatus]} · Werkgeheugen: ${labels[memoryStatus]}`;
    } else if (moduleState?.status === "completed" && moduleState.result) {
      detail.textContent = `${moduleState.result.correct}/${moduleState.result.total} correct · ${moduleState.result.level}`;
    } else if (moduleState?.status === "in-progress") {
      const answered = Object.keys(moduleState.answers || {}).length;
      detail.textContent = `${answered} van ${module.operationalItemCount} opgaven beantwoord`;
    } else if (available) {
      detail.textContent = `${module.operationalItemCount} opgaven · ${module.estimatedTime}`;
    } else {
      detail.textContent = "De inhoud is goedgekeurd; de technische taakomgeving volgt.";
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = available ? "button button-primary" : "button button-secondary";
    button.textContent = status.buttonLabel;
    button.disabled = !available;
    button.addEventListener("click", () => {
      if (!openCognitiveModule(session, module.id)) {
        return;
      }

      interactionApi.save();
      interactionApi.rerender();
    });

    card.append(header, description, detail, button);
    grid.appendChild(card);
  });

  if (selectedModules.length === 0) {
    const empty = document.createElement("div");
    empty.className = "cognitive-info-note cognitive-warning-note";
    empty.innerHTML = "<strong>Geen modules geselecteerd</strong><span>Pas je modulekeuze aan om verder te gaan.</span>";
    grid.appendChild(empty);
  }

  const actions = document.createElement("div");
  actions.className = "cognitive-runner-actions";

  const adjustButton = document.createElement("button");
  adjustButton.type = "button";
  adjustButton.className = "button button-secondary";
  adjustButton.textContent = "Modulekeuze aanpassen";
  adjustButton.addEventListener("click", () => {
    session.workspaceView = "setup";
    interactionApi.save();
    interactionApi.rerender();
  });

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "button button-primary";
  closeButton.textContent = allModulesCompleted
    ? "Volledige batterij afronden"
    : "Opslaan en terug naar mijn profiel";
  closeButton.addEventListener("click", () => {
    if (allModulesCompleted) {
      interactionApi.complete();
      return;
    }

    interactionApi.close("Je cognitieve modulevoortgang is lokaal opgeslagen.");
  });

  actions.append(adjustButton, closeButton);
  wrapper.append(grid, actions);
  container.appendChild(wrapper);
  return true;
}

function getCognitiveSubtaskStatus(state) {
  if (state?.status === "completed") {
    return { label: "Voltooid", className: "is-completed", buttonLabel: "Bekijk resultaat" };
  }

  if (state?.status === "in-progress") {
    return { label: "In uitvoering", className: "is-progress", buttonLabel: "Hervat subtaak" };
  }

  return { label: "Klaar om te starten", className: "is-ready", buttonLabel: "Start subtaak" };
}

function renderAttentionWorkingMemoryOverview(context) {
  const { container, session, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: true, nextHidden: true, saveExitHidden: true });

  const attentionState = session.moduleStates.attention;
  const memoryState = session.moduleStates.workingMemory;
  const completedCount = [attentionState, memoryState].filter(state => state.status === "completed").length;

  setCognitiveQuestionChrome({
    counter: "Aandacht en werkgeheugen",
    percentage: completedCount * 50,
    category: "Twee afzonderlijke subtaken",
    title: "Kies een subtaak",
    instruction: "Aandacht en werkgeheugen worden afzonderlijk uitgevoerd en krijgen aparte resultaten.",
    topbarLabel: "Aandacht en werkgeheugen · overzicht"
  });

  const wrapper = document.createElement("div");
  wrapper.className = "cognitive-dual-module";
  const note = document.createElement("div");
  note.className = "cognitive-development-note";
  note.innerHTML = `
    <strong>Geen gecombineerde totaalscore</strong>
    <span>Een hoge score op de ene subtaak verbergt nooit een lagere score op de andere. Beide resultaten blijven zelfstandig zichtbaar.</span>
  `;
  wrapper.appendChild(note);

  const grid = document.createElement("div");
  grid.className = "cognitive-dashboard-grid cognitive-subtask-dashboard";
  [
    {
      id: "attention",
      title: "Aandacht — Symboolselectie",
      description: "Selecteer in twaalf korte rondes alle doelsymbolen tussen sterk gelijkende afleiders.",
      meta: attentionState.status === "completed" && attentionState.result
        ? `${attentionState.result.targetSelectionScore}% doelselectiescore · ${attentionState.result.hits} treffers`
        : attentionState.status === "in-progress"
          ? `${attentionState.roundIndex || 0} van 12 rondes opgeslagen`
          : "12 rondes · ongeveer 5 tot 6 minuten",
      state: attentionState
    },
    {
      id: "workingMemory",
      title: "Werkgeheugen — Ruimtelijke reeksen",
      description: "Reproduceer ruimtelijke reeksen eerst voorwaarts en daarna in omgekeerde volgorde.",
      meta: memoryState.status === "completed" && memoryState.result
        ? `${memoryState.result.exactTotal}/14 exact · ${memoryState.result.serialPositionAccuracy}% positioneel`
        : memoryState.status === "in-progress"
          ? `${memoryState.trialIndex || 0} van 14 reeksen opgeslagen`
          : "14 reeksen · ongeveer 6 tot 7 minuten",
      state: memoryState
    }
  ].forEach(subtask => {
    const status = getCognitiveSubtaskStatus(subtask.state);
    const card = document.createElement("article");
    card.className = `cognitive-dashboard-card ${status.className}`;
    const header = document.createElement("div");
    header.className = "cognitive-dashboard-card-header";
    const title = document.createElement("h3");
    title.textContent = subtask.title;
    const badge = document.createElement("span");
    badge.className = "cognitive-status-badge";
    badge.textContent = status.label;
    header.append(title, badge);
    const description = document.createElement("p");
    description.textContent = subtask.description;
    const detail = document.createElement("p");
    detail.className = "cognitive-dashboard-detail";
    detail.textContent = subtask.meta;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button button-primary";
    button.textContent = status.buttonLabel;
    button.addEventListener("click", () => {
      session.currentSubtaskId = subtask.id;
      interactionApi.save();
      interactionApi.rerender();
    });
    card.append(header, description, detail, button);
    grid.appendChild(card);
  });

  const actions = document.createElement("div");
  actions.className = "cognitive-runner-actions";
  const back = document.createElement("button");
  back.type = "button";
  back.className = "button button-secondary";
  back.textContent = "Terug naar moduleoverzicht";
  back.addEventListener("click", () => {
    showCognitiveDashboard(session);
    interactionApi.save();
    interactionApi.rerender();
  });
  const close = document.createElement("button");
  close.type = "button";
  close.className = "button button-primary";
  close.textContent = "Opslaan en terug naar mijn profiel";
  close.addEventListener("click", () => interactionApi.close("Je cognitieve modulevoortgang is lokaal opgeslagen."));
  actions.append(back, close);
  wrapper.append(grid, actions);
  container.appendChild(wrapper);
  return true;
}

function renderAttentionWorkingMemoryModule(context) {
  if (context.session.currentSubtaskId === "attention") {
    return renderCognitiveAttentionSubtask(context);
  }

  if (context.session.currentSubtaskId === "workingMemory") {
    return renderCognitiveWorkingMemorySubtask(context);
  }

  return renderAttentionWorkingMemoryOverview(context);
}

function renderCognitiveBatteryQuestionInput(context) {
  ensureCognitiveSessionShape(context.session);

  if (context.question?.type !== "cognitive-module-selection") {
    return false;
  }

  if (!context.session.setupCompleted || context.session.workspaceView === "setup") {
    return renderCognitiveModuleSelection(context);
  }

  if (context.session.workspaceView === "module" && context.session.currentModuleId) {
    const moduleDefinition = getCognitiveModuleDefinition(context.session.currentModuleId);

    if (moduleDefinition?.availability === "available") {
      if (moduleDefinition.id === "attentionWorkingMemory") {
        return renderAttentionWorkingMemoryModule(context);
      }
      return renderCognitiveReasoningModule(context, moduleDefinition);
    }

    showCognitiveDashboard(context.session);
  }

  return renderCognitiveDashboard(context);
}

/* =========================================================
   COGNITIEF EINDRAPPORT
========================================================= */

function createCognitiveReportElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}

function createCognitiveReportListCard({ label, title, items, modifier = "" }) {
  const card = createCognitiveReportElement(
    "article",
    `result-content-card cognitive-report-card ${modifier}`.trim()
  );
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createCognitiveReportElement("span", "result-card-label", label),
    createCognitiveReportElement("h3", "", title)
  );

  const list = createCognitiveReportElement("ul", "cognitive-report-list");
  items.forEach(item => list.appendChild(createCognitiveReportElement("li", "", item)));
  card.appendChild(list);
  return card;
}

function enhanceCognitiveDimensionCards(result, report) {
  const cards = Array.from(resultDimensions.querySelectorAll(".dimension-card"));

  report.dimensions.forEach((dimension, index) => {
    const card = cards[index];
    if (!card) return;

    card.classList.add("cognitive-report-dimension");
    card.dataset.cognitiveDimension = dimension.id;

    const existingDescription = card.querySelector(".dimension-card-description");
    if (existingDescription) existingDescription.remove();

    const details = createCognitiveReportElement("details", "cognitive-dimension-details");
    const summary = createCognitiveReportElement("summary", "", "Toon uitleg");
    const description = createCognitiveReportElement("p", "", dimension.description);
    details.append(summary, description);
    details.addEventListener("toggle", () => {
      summary.textContent = details.open ? "Verberg uitleg" : "Toon uitleg";
    });

    const bar = card.querySelector(".dimension-bar");
    if (bar) card.insertBefore(details, bar);
    else card.appendChild(details);
  });
}

function renderCognitiveBatteryReport(result) {
  const report = buildCognitiveBatteryReport(result?.moduleResults || {});

  resultSummary.textContent = report.summary;
  enhanceCognitiveDimensionCards(result, report);

  ["resultStrengthsCard", "resultDevelopmentCard", "resultMeaningCard", "resultAdviceCard"].forEach(id => {
    const card = document.getElementById(id);
    if (card) card.hidden = true;
  });

  const strengthsCard = createCognitiveReportListCard({
    label: "Sterktes",
    title: "Wat kwam duidelijk naar voren?",
    items: report.strengths,
    modifier: "is-strengths"
  });

  const growthCard = createCognitiveReportListCard({
    label: "Groeikansen",
    title: "Wat kun je verder stimuleren?",
    items: report.growthItems,
    modifier: "is-growth"
  });

  resultContentGrid.append(strengthsCard, growthCard);
}
