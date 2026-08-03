"use strict";

function removeLeadershipDynamicCards() {
  document.querySelectorAll('[data-leadership-report="true"]').forEach(element => element.remove());
}

function restartLeadershipModuleFromResult(result, moduleId) {
  const module = getLeadershipModule(moduleId);
  if (!module) return;
  if (!window.confirm(`Wil je ${module.title} opnieuw invullen? Alleen dit onderdeel wordt opnieuw gestart.`)) return;

  const completedIndex = state.completedTests.indexOf(LEADERSHIP_TEST_ID);
  if (completedIndex >= 0) state.completedTests.splice(completedIndex, 1);
  delete state.results[LEADERSHIP_TEST_ID];
  state.activeTests[LEADERSHIP_TEST_ID] = createLeadershipSessionFromResult(result, moduleId);
  saveState();
  renderDomains();
  renderProgress();
  openTestFlow(LEADERSHIP_TEST_ID);
  beginOrResumeTest();
}

function createLeadershipMetric(label, value, description) {
  const item = createLeadershipElement("div", "leadership-metric");
  item.append(
    createLeadershipElement("span", "", label),
    createLeadershipElement("strong", "", value),
    createLeadershipElement("small", "", description)
  );
  return item;
}

function appendLeadershipStyleContent(container, style) {
  const bar = createLeadershipElement("div", "leadership-style-score-bar");
  const barValue = createLeadershipElement("span");
  barValue.style.width = `${clampLeadershipScore(style.percentage)}%`;
  bar.appendChild(barValue);

  const traits = createLeadershipElement("div", "leadership-traits");
  style.traits.forEach(trait => traits.appendChild(createLeadershipElement("span", "", trait)));

  const body = createLeadershipElement("div", "leadership-style-body");
  const sections = [
    ["Kern", style.core],
    ["Kracht", style.strength],
    ["Voordeel", style.advantage],
    ["Risico bij overgebruik", style.risk],
    ["Werkt vooral goed bij", style.context],
    ["Ontwikkeladvies", style.advice]
  ];

  sections.forEach(([title, text]) => {
    const section = createLeadershipElement("section", "leadership-style-section");
    section.append(
      createLeadershipElement("h4", "", title),
      createLeadershipElement("p", "", text)
    );
    body.appendChild(section);
  });

  container.append(bar, traits, body);
}

function createLeadershipPrimaryStyleCard(style) {
  const card = createLeadershipElement("article", "leadership-style-card leadership-style-primary");
  const header = createLeadershipElement("div", "leadership-style-header");
  const copy = createLeadershipElement("div");
  copy.append(
    createLeadershipElement("span", "leadership-rank", `${style.rank}`),
    createLeadershipElement("h3", "", style.name),
    createLeadershipElement("p", "leadership-category-label", style.category.label)
  );
  header.append(copy, createLeadershipElement("strong", "leadership-style-score", `${style.displayPercentage}%`));
  card.appendChild(header);
  appendLeadershipStyleContent(card, style);
  return card;
}

function createLeadershipExpandableStyleCard(style) {
  const details = document.createElement("details");
  details.className = "leadership-style-card leadership-style-expandable";
  details.dataset.printExpand = "true";

  const summary = document.createElement("summary");
  const copy = createLeadershipElement("span", "leadership-style-summary-copy");
  copy.append(
    createLeadershipElement("span", "leadership-rank", `${style.rank}`),
    createLeadershipElement("strong", "", style.name),
    createLeadershipElement("small", "", style.category.label)
  );
  const score = createLeadershipElement("span", "leadership-style-summary-score", `${style.displayPercentage}%`);
  const toggle = createLeadershipElement("span", "leadership-style-toggle", "Toon uitleg");
  summary.append(copy, score, toggle);
  details.appendChild(summary);

  const body = createLeadershipElement("div", "leadership-style-expandable-body");
  appendLeadershipStyleContent(body, style);
  details.appendChild(body);
  details.addEventListener("toggle", () => {
    toggle.textContent = details.open ? "Verberg uitleg" : "Toon uitleg";
  });
  return details;
}

function renderLeadershipReport(result) {
  removeLeadershipDynamicCards();

  resultEyebrow.textContent = "Jouw leiderschapsprofiel";
  resultTestTitle.textContent = result.headline || "Jouw leiderschapsprofiel";

  const grid = document.querySelector(".result-content-grid");
  if (!grid) return;

  ["resultStrengthsCard", "resultDevelopmentCard", "resultMeaningCard", "resultAdviceCard"].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });
  const facets = document.getElementById("facetReport");
  if (facets) facets.hidden = true;

  const flexibilityCard = createLeadershipElement("article", "result-content-card leadership-flexibility-card");
  flexibilityCard.dataset.leadershipReport = "true";
  flexibilityCard.dataset.dynamicProfileCard = "true";
  flexibilityCard.style.gridColumn = "1 / -1";
  flexibilityCard.append(
    createLeadershipElement("span", "result-card-label", "Situationele flexibiliteit"),
    createLeadershipElement("h3", "", result.situational.flexibilityLabel),
    createLeadershipElement("p", "", result.situational.interpretation)
  );

  const metrics = createLeadershipElement("div", "leadership-metric-grid");
  metrics.append(
    createLeadershipMetric(
      "Situationele afstemming",
      `${result.situational.fitDisplay}%`,
      "Hoe vaak je keuze volledig of gedeeltelijk aansloot bij de taakervaring en betrokkenheid in de situatie."
    ),
    createLeadershipMetric(
      "Repertoirebreedte",
      `${result.situational.breadthDisplay}%`,
      "Hoe breed je de vier manieren van aansturen over de twintig situaties gebruikte."
    ),
    createLeadershipMetric(
      "Gecombineerde index",
      `${result.situational.flexibilityIndex}%`,
      "Afstemming telt voor 75% mee; repertoirebreedte voor 25%."
    )
  );
  flexibilityCard.appendChild(metrics);
  grid.appendChild(flexibilityCard);

  if (result.uniformPattern) {
    const warning = createLeadershipElement("article", "result-content-card leadership-quality-note");
    warning.dataset.leadershipReport = "true";
    warning.dataset.dynamicProfileCard = "true";
    warning.style.gridColumn = "1 / -1";
    warning.append(
      createLeadershipElement("span", "result-card-label", "Interpretatievoorbehoud"),
      createLeadershipElement("h3", "", "Weinig onderscheid in de gedragsstellingen"),
      createLeadershipElement("p", "", "Je gebruikte bij minstens 57 van de 60 gedragsstellingen hetzelfde antwoord. Daardoor kan het onderscheid tussen de twaalf stijlen minder precies zijn. Bekijk de rangschikking vooral als een brede eerste indruk.")
    );
    grid.appendChild(warning);
  }

  const stylesCard = createLeadershipElement("article", "result-content-card leadership-styles-report");
  stylesCard.dataset.leadershipReport = "true";
  stylesCard.dataset.dynamicProfileCard = "true";
  stylesCard.style.gridColumn = "1 / -1";
  stylesCard.append(
    createLeadershipElement("span", "result-card-label", "Twaalf leiderschapsstijlen"),
    createLeadershipElement("h3", "", "Van meest naar minst natuurlijk passend"),
    createLeadershipElement("p", "", "De percentages zijn onafhankelijke passingsscores en tellen daarom niet op tot 100%. De eerste stijl staat volledig open; alle andere stijlen kun je afzonderlijk bekijken.")
  );

  const styleList = createLeadershipElement("div", "leadership-style-list");
  result.styleProfile.styles.forEach((style, index) => {
    styleList.appendChild(index === 0
      ? createLeadershipPrimaryStyleCard(style)
      : createLeadershipExpandableStyleCard(style));
  });
  stylesCard.appendChild(styleList);
  grid.appendChild(stylesCard);

  const adviceCard = createLeadershipElement("article", "result-content-card leadership-advice-card");
  adviceCard.dataset.leadershipReport = "true";
  adviceCard.dataset.dynamicProfileCard = "true";
  adviceCard.style.gridColumn = "1 / -1";
  adviceCard.append(
    createLeadershipElement("span", "result-card-label", "Kernadvies"),
    createLeadershipElement("h3", "", "Groeien zonder je basisstijl te verliezen"),
    createLeadershipElement("p", "", result.overallAdvice)
  );

  const actions = createLeadershipElement("div", "leadership-report-actions");
  LEADERSHIP_MODULES.forEach(module => {
    const button = createLeadershipElement("button", "button button-secondary", `${module.title} opnieuw invullen`);
    button.type = "button";
    button.addEventListener("click", () => restartLeadershipModuleFromResult(result, module.id));
    actions.appendChild(button);
  });
  adviceCard.appendChild(actions);
  grid.appendChild(adviceCard);
}
