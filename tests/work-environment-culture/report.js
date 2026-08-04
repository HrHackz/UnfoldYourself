"use strict";

function removeWecReportCards() {
  document.querySelectorAll('[data-wec-report="true"]').forEach(element => element.remove());
}

function hideWecGenericCards() {
  ["resultStrengthsCard", "resultDevelopmentCard", "resultMeaningCard", "resultAdviceCard"].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });
  const facets = document.getElementById("facetReport");
  if (facets) facets.hidden = true;
  if (typeof resultDimensions !== "undefined" && resultDimensions) resultDimensions.hidden = true;
}

function appendWecList(container, items) {
  const list = createWecElement("ul", "wec-report-list");
  (items || []).forEach(item => list.appendChild(createWecElement("li", "", item)));
  container.appendChild(list);
}

function createWecRadarChart(cultures) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 360 360");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Vierassig cultuurprofiel");
  svg.classList.add("wec-radar-svg");

  const center = 180;
  const maxRadius = 112;
  const directions = {
    collaborate: [-1, -1],
    create: [1, -1],
    compete: [1, 1],
    control: [-1, 1]
  };
  const normalized = value => maxRadius * (clampWecValue(value) / 100) / Math.sqrt(2);

  [25, 50, 75, 100].forEach(level => {
    const radius = normalized(level);
    const polygon = document.createElementNS(ns, "polygon");
    polygon.setAttribute("points", [
      `${center - radius},${center - radius}`,
      `${center + radius},${center - radius}`,
      `${center + radius},${center + radius}`,
      `${center - radius},${center + radius}`
    ].join(" "));
    polygon.setAttribute("class", "wec-radar-grid");
    svg.appendChild(polygon);
  });

  Object.values(directions).forEach(([dx, dy]) => {
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", String(center));
    line.setAttribute("y1", String(center));
    line.setAttribute("x2", String(center + dx * maxRadius / Math.sqrt(2)));
    line.setAttribute("y2", String(center + dy * maxRadius / Math.sqrt(2)));
    line.setAttribute("class", "wec-radar-axis");
    svg.appendChild(line);
  });

  const byId = Object.fromEntries((cultures || []).map(culture => [culture.id, culture]));
  const pointOrder = ["collaborate", "create", "compete", "control"];
  const profilePoints = pointOrder.map(id => {
    const [dx, dy] = directions[id];
    const radius = normalized(byId[id]?.exactScore || 0);
    return `${center + dx * radius},${center + dy * radius}`;
  });
  const profile = document.createElementNS(ns, "polygon");
  profile.setAttribute("points", profilePoints.join(" "));
  profile.setAttribute("class", "wec-radar-profile");
  svg.appendChild(profile);

  pointOrder.forEach(id => {
    const [dx, dy] = directions[id];
    const radius = normalized(byId[id]?.exactScore || 0);
    const dot = document.createElementNS(ns, "circle");
    dot.setAttribute("cx", String(center + dx * radius));
    dot.setAttribute("cy", String(center + dy * radius));
    dot.setAttribute("r", "5");
    dot.setAttribute("class", "wec-radar-dot");
    svg.appendChild(dot);
  });

  const labels = [
    ["Samenwerken", 55, 42, "start", byId.collaborate?.displayScore],
    ["Vernieuwen", 305, 42, "end", byId.create?.displayScore],
    ["Presteren", 305, 326, "end", byId.compete?.displayScore],
    ["Structureren", 55, 326, "start", byId.control?.displayScore]
  ];
  labels.forEach(([label, x, y, anchor, score]) => {
    const text = document.createElementNS(ns, "text");
    text.setAttribute("x", String(x));
    text.setAttribute("y", String(y));
    text.setAttribute("text-anchor", anchor);
    text.setAttribute("class", "wec-radar-label");
    const first = document.createElementNS(ns, "tspan");
    first.textContent = label;
    first.setAttribute("x", String(x));
    const second = document.createElementNS(ns, "tspan");
    second.textContent = `${score || 0}%`;
    second.setAttribute("x", String(x));
    second.setAttribute("dy", "18");
    second.setAttribute("class", "wec-radar-score");
    text.append(first, second);
    svg.appendChild(text);
  });

  return svg;
}

function createWecCultureDetails(culture, frictionCulture) {
  const profile = culture.profile;
  const details = document.createElement("details");
  details.className = "wec-culture-details";
  details.dataset.printExpand = "true";
  details.open = culture.rank === 1;
  if (frictionCulture?.id === culture.id) details.classList.add("is-friction");

  const summary = document.createElement("summary");
  const copy = createWecElement("span", "wec-culture-summary-copy");
  copy.append(
    createWecElement("span", "wec-rank-badge", String(culture.rank)),
    createWecElement("span", "wec-culture-title-wrap")
  );
  const titleWrap = copy.querySelector(".wec-culture-title-wrap");
  titleWrap.append(
    createWecElement("strong", "", profile.name),
    createWecElement("small", "", culture.rank === 1 ? "Sterkste cultuurvoorkeur" : frictionCulture?.id === culture.id ? "Vraagt waarschijnlijk de meeste aanpassing" : "Aanvullende cultuurvoorkeur")
  );
  const score = createWecElement("span", "wec-culture-summary-score");
  score.append(
    createWecElement("strong", "", `${culture.displayScore}%`),
    createWecElement("span", "wec-culture-toggle", details.open ? "Verberg uitleg" : "Toon uitleg")
  );
  summary.append(copy, score);

  const body = createWecElement("div", "wec-culture-details-body");
  body.append(
    createWecElement("p", "wec-culture-headline", profile.headline),
    createWecElement("p", "", profile.essence)
  );

  const grid = createWecElement("div", "wec-culture-section-grid");
  const sections = [
    ["Je floreert waarschijnlijk wanneer", profile.flourish, "list"],
    ["Mogelijke voordelen", profile.benefits, "list"],
    ["Mogelijke nadelen bij een extreme cultuur", profile.risks, "list"],
    ["Mogelijke frictie", profile.friction, "text"],
    ["Passend leiderschap", profile.leadership, "list"],
    ["Passend personeelsbeleid", profile.hr, "list"],
    ["Waarop letten bij een werkgever", profile.employerQuestions, "list"]
  ];
  sections.forEach(([title, content, type]) => {
    const section = createWecElement("section", "wec-culture-section");
    section.appendChild(createWecElement("h4", "", title));
    if (type === "list") appendWecList(section, content);
    else section.appendChild(createWecElement("p", "", content));
    grid.appendChild(section);
  });
  body.appendChild(grid);
  details.append(summary, body);
  details.addEventListener("toggle", () => {
    const toggle = details.querySelector(".wec-culture-toggle");
    if (toggle) toggle.textContent = details.open ? "Verberg uitleg" : "Toon uitleg";
  });
  return details;
}

function createWecCultureReportCard(result) {
  const card = createWecElement("article", "result-content-card wec-report-card wec-culture-report");
  card.dataset.wecReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createWecElement("span", "result-card-label", "Jouw cultuurmatch"),
    createWecElement("h3", "", result.headline),
    createWecElement("p", "wec-report-intro", "De vier percentages vormen samen exact 100%. Ze tonen de relatieve nadruk die je binnen zes cultuuronderwerpen aan iedere organisatielogica gaf.")
  );

  const overview = createWecElement("div", "wec-culture-overview");
  const visual = createWecElement("div", "wec-radar-wrap");
  visual.appendChild(createWecRadarChart(result.cultures));

  const ranking = createWecElement("div", "wec-culture-ranking");
  result.cultures.forEach(culture => {
    const row = createWecElement("div", "wec-culture-rank-row");
    if (culture.rank === 1) row.classList.add("is-primary");
    if (result.frictionCulture?.id === culture.id) row.classList.add("is-friction");
    row.append(
      createWecElement("span", "wec-rank-badge", String(culture.rank)),
      createWecElement("span", "wec-rank-name", culture.profile.name),
      createWecElement("strong", "", `${culture.displayScore}%`)
    );
    ranking.appendChild(row);
  });
  const mode = createWecElement("div", "wec-profile-mode");
  mode.append(
    createWecElement("strong", "", result.cultureMode.label),
    createWecElement("p", "", result.combination.text)
  );
  ranking.appendChild(mode);
  overview.append(visual, ranking);
  card.appendChild(overview);

  const combination = createWecElement("section", "wec-combination-card");
  combination.append(
    createWecElement("span", "wec-section-kicker", "Combinatie van je twee hoogste culturen"),
    createWecElement("h4", "", result.combination.title),
    createWecElement("p", "", result.combination.text),
    createWecElement("p", "wec-combination-risk", `Aandachtspunt: ${result.combination.risk}`)
  );
  card.appendChild(combination);

  if (result.frictionCulture) {
    const friction = createWecElement("section", "wec-friction-card");
    friction.append(
      createWecElement("span", "wec-section-kicker", result.frictionCulture.isClearFriction ? "Duidelijke mogelijke frictiezone" : "Cultuur die waarschijnlijk meer aanpassing vraagt"),
      createWecElement("h4", "", result.frictionCulture.profile.name),
      createWecElement("p", "", result.frictionCulture.profile.friction)
    );
    card.appendChild(friction);
  }

  const detailsWrap = createWecElement("div", "wec-culture-details-list");
  result.cultures.forEach(culture => detailsWrap.appendChild(createWecCultureDetails(culture, result.frictionCulture)));
  card.appendChild(detailsWrap);
  return card;
}

function createWecSliderProfile(axis, title, leftLabel, rightLabel) {
  const section = createWecElement("section", "wec-environment-axis");
  section.append(
    createWecElement("span", "wec-environment-badge", axis.badge),
    createWecElement("h4", "", title),
    createWecElement("p", "", axis.headline)
  );
  const scale = createWecElement("div", "wec-axis-scale");
  const line = createWecElement("span", "wec-axis-line");
  const marker = createWecElement("span", "wec-axis-marker");
  marker.style.left = `${clampWecValue(axis.value)}%`;
  line.appendChild(marker);
  const labels = createWecElement("div", "wec-axis-labels");
  labels.append(createWecElement("span", "", leftLabel), createWecElement("span", "", rightLabel));
  scale.append(line, labels);
  section.appendChild(scale);
  if (axis.benefits?.length || axis.risks?.length) {
    const miniGrid = createWecElement("div", "wec-environment-mini-grid");
    if (axis.benefits?.length) {
      const benefit = createWecElement("div");
      benefit.appendChild(createWecElement("strong", "", "Mogelijke voordelen"));
      appendWecList(benefit, axis.benefits);
      miniGrid.appendChild(benefit);
    }
    if (axis.risks?.length) {
      const risk = createWecElement("div");
      risk.appendChild(createWecElement("strong", "", "Aandachtspunten"));
      appendWecList(risk, axis.risks);
      miniGrid.appendChild(risk);
    }
    section.appendChild(miniGrid);
  }
  return section;
}

function createWecEnvironmentReportCard(result) {
  const environment = result.environment;
  const card = createWecElement("article", "result-content-card wec-report-card wec-environment-report");
  card.dataset.wecReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createWecElement("span", "result-card-label", "Jouw fysieke werkomgeving"),
    createWecElement("h3", "", "Waar, hoe en in welke setting je het liefst werkt"),
    createWecElement("p", "wec-report-intro", "Deze voorkeuren zijn geen kwaliteitslabels. Ze beschrijven welke praktische omstandigheden waarschijnlijk het meest natuurlijk of energiebesparend voelen.")
  );

  const badgeGrid = createWecElement("div", "wec-environment-badge-grid");
  [environment.scale, environment.location, environment.surroundings, environment.interior, environment.rhythm].forEach(item => {
    if (item?.badge) badgeGrid.appendChild(createWecElement("span", "wec-environment-badge", item.badge));
  });
  card.appendChild(badgeGrid);

  const axisGrid = createWecElement("div", "wec-environment-axis-grid");
  axisGrid.append(
    createWecSliderProfile(environment.scale, "Organisatieschaal", "Kleinere schaal", "Grotere schaal"),
    createWecSliderProfile(environment.location, "Geografische ligging", "Rustig / landelijk", "Grootstedelijk"),
    createWecSliderProfile(environment.surroundings, "Directe omgeving", "Groen en rust", "Levendigheid")
  );
  card.appendChild(axisGrid);

  const selectionGrid = createWecElement("div", "wec-environment-selection-grid");
  [
    ["Kantoorinterieur", environment.interior],
    ["Werkritme", environment.rhythm]
  ].forEach(([title, item]) => {
    const section = createWecElement("section", "wec-environment-selection");
    section.append(
      createWecElement("span", "wec-environment-badge", item.badge),
      createWecElement("h4", "", title),
      createWecElement("p", "", item.headline)
    );
    if (item.risk) section.appendChild(createWecElement("p", "wec-environment-risk", `Aandachtspunt: ${item.risk}`));
    selectionGrid.appendChild(section);
  });
  card.appendChild(selectionGrid);
  return card;
}

function createWecEnergyCard(result) {
  const card = createWecElement("article", "result-content-card wec-report-card wec-energy-report");
  card.dataset.wecReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createWecElement("span", "result-card-label", "Geïntegreerde interpretatie"),
    createWecElement("h3", "", "Energiegevers en mogelijke energievreters")
  );
  const grid = createWecElement("div", "wec-energy-grid");
  const givers = createWecElement("section", "wec-energy-panel is-positive");
  givers.appendChild(createWecElement("h4", "", "Waarschijnlijk energiegevend"));
  appendWecList(givers, result.energy.givers);
  const takers = createWecElement("section", "wec-energy-panel is-caution");
  takers.appendChild(createWecElement("h4", "", "Kan meer aanpassing vragen"));
  appendWecList(takers, result.energy.takers);
  grid.append(givers, takers);
  card.appendChild(grid);
  return card;
}

function createWecChecklistCard(result) {
  const card = createWecElement("article", "result-content-card wec-report-card wec-checklist-report");
  card.dataset.wecReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createWecElement("span", "result-card-label", "Sollicitatiechecklist"),
    createWecElement("h3", "", "Vragen om je vermoedelijke match in de praktijk te toetsen"),
    createWecElement("p", "wec-report-intro", "Een organisatiebeschrijving of vacaturetekst toont niet altijd hoe het dagelijkse werk werkelijk verloopt. Gebruik deze vragen tijdens gesprekken of een werkplekbezoek.")
  );
  const list = createWecElement("ol", "wec-checklist");
  result.checklist.forEach(question => list.appendChild(createWecElement("li", "", question)));
  card.appendChild(list);
  return card;
}

function createWecQualityCard(result) {
  const quality = result.responseQuality;
  if (!quality?.messages?.length) return null;
  const card = createWecElement("article", "result-content-card wec-report-card wec-quality-report");
  card.dataset.wecReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createWecElement("span", "result-card-label", "Interpretatievoorbehoud"),
    createWecElement("h3", "", "Controleer de scherpte van je cultuurprofiel")
  );
  appendWecList(card, quality.messages);
  return card;
}

function renderWecReport(result) {
  removeWecReportCards();
  hideWecGenericCards();
  const grid = document.querySelector(".result-content-grid");
  if (!grid) return;

  const cultureCard = createWecCultureReportCard(result);
  const environmentCard = createWecEnvironmentReportCard(result);
  const energyCard = createWecEnergyCard(result);
  const checklistCard = createWecChecklistCard(result);
  const qualityCard = createWecQualityCard(result);

  grid.append(cultureCard, environmentCard, energyCard, checklistCard);
  if (qualityCard) grid.appendChild(qualityCard);
}
