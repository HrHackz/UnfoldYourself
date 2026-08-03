"use strict";

function removeDigitalSkillsDynamicCards() {
  document.querySelectorAll('[data-digital-skills-report="true"]').forEach(element => element.remove());
}

function hideDigitalSkillsDefaultReportCards() {
  ["resultStrengthsCard", "resultDevelopmentCard", "resultMeaningCard", "resultAdviceCard"].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });
  const dimensions = document.getElementById("resultDimensions");
  if (dimensions) dimensions.hidden = true;
  const facets = document.getElementById("facetReport");
  if (facets) facets.hidden = true;
}

function restartDigitalSkillsAreaFromResult(result, areaId) {
  const area = getDigitalSkillsArea(areaId);
  if (!area) return;
  if (!window.confirm(`Wil je ${area.title} opnieuw invullen? Alleen dit gebied wordt opnieuw gestart.`)) return;

  const completedIndex = state.completedTests.indexOf(DIGITAL_SKILLS_TEST_ID);
  if (completedIndex >= 0) state.completedTests.splice(completedIndex, 1);
  delete state.results[DIGITAL_SKILLS_TEST_ID];
  state.activeTests[DIGITAL_SKILLS_TEST_ID] = createDigitalSkillsSessionFromResult(result, areaId);
  saveState();
  renderDomains();
  renderProgress();
  openTestFlow(DIGITAL_SKILLS_TEST_ID);
  beginOrResumeTest();
}

function createDigitalSkillsReportArea(areaResult, result) {
  const details = document.createElement("details");
  details.className = "digital-skills-report-area";
  details.dataset.digitalSkillsReport = "true";

  const summary = document.createElement("summary");
  const copy = document.createElement("span");
  copy.append(
    createDigitalSkillsElement("strong", "", areaResult.title),
    createDigitalSkillsElement("small", "", areaResult.description)
  );
  const score = createDigitalSkillsElement("span", "digital-skills-report-score", `${areaResult.displayPercentage}% · ${areaResult.levelLabel}`);
  summary.append(copy, score);

  const body = createDigitalSkillsElement("div", "digital-skills-report-area-body");
  const bar = createDigitalSkillsElement("div", "digital-skills-report-bar");
  const barValue = createDigitalSkillsElement("span", "");
  barValue.style.width = `${Math.max(0, Math.min(100, areaResult.percentage))}%`;
  bar.appendChild(barValue);
  body.appendChild(bar);

  const competencies = createDigitalSkillsElement("div", "digital-skills-report-competences");
  areaResult.competenceResults.forEach(item => competencies.appendChild(createDigitalSkillsCompetenceFeedback(item)));
  body.appendChild(competencies);

  const retry = createDigitalSkillsElement("button", "button button-secondary digital-skills-report-retry", "Dit gebied opnieuw invullen");
  retry.type = "button";
  retry.addEventListener("click", () => restartDigitalSkillsAreaFromResult(result, areaResult.id));
  body.appendChild(retry);
  details.append(summary, body);
  return details;
}

function createDigitalSkillsProfileCard(label, title, items, emptyText) {
  const card = createDigitalSkillsElement("article", "result-content-card digital-skills-profile-card");
  card.dataset.digitalSkillsReport = "true";
  card.append(
    createDigitalSkillsElement("span", "result-card-label", label),
    createDigitalSkillsElement("h3", "", title)
  );

  if (items.length === 0) {
    card.appendChild(createDigitalSkillsElement("p", "", emptyText));
    return card;
  }

  const list = document.createElement("ul");
  items.forEach(item => {
    const li = document.createElement("li");
    const strong = createDigitalSkillsElement("strong", "", item.title);
    const span = createDigitalSkillsElement("span", "", item.description);
    li.append(strong, span);
    list.appendChild(li);
  });
  card.appendChild(list);
  return card;
}

function renderDigitalSkillsReport(result) {
  removeDigitalSkillsDynamicCards();
  hideDigitalSkillsDefaultReportCards();

  const grid = document.querySelector(".result-content-grid");
  if (!grid) return;

  const areasCard = createDigitalSkillsElement("article", "result-content-card digital-skills-full-report");
  areasCard.dataset.digitalSkillsReport = "true";
  areasCard.style.gridColumn = "1 / -1";
  areasCard.append(
    createDigitalSkillsElement("span", "result-card-label", "Vijf competentiegebieden"),
    createDigitalSkillsElement("h3", "", "Jouw DigCompSAT-overzicht"),
    createDigitalSkillsElement("p", "", "Open een gebied om de onderliggende competenties en eventuele ontwikkelboodschappen te bekijken.")
  );

  const areaList = createDigitalSkillsElement("div", "digital-skills-report-area-list");
  DIGITAL_SKILLS_AREAS.forEach(area => {
    const areaResult = result.areaResults?.[area.id];
    if (areaResult) areaList.appendChild(createDigitalSkillsReportArea(areaResult, result));
  });
  areasCard.appendChild(areaList);
  grid.appendChild(areasCard);

  const strengths = createDigitalSkillsProfileCard(
    "Sterktes",
    "Wat komt het duidelijkst naar voren?",
    result.strongestCompetences || [],
    "Er konden geen duidelijke sterke onderdelen worden samengevat."
  );
  const growth = createDigitalSkillsProfileCard(
    "Groeikansen",
    "Waar ervaar je nog ontwikkelruimte?",
    result.growthCompetences || [],
    "Geen competentie kwam onder de interne ontwikkelgrens van 48% uit."
  );
  grid.append(strengths, growth);
}
