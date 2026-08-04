"use strict";

function createTeamRoleElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}

function removeTeamRoleDynamicCards() {
  document.querySelectorAll('[data-team-role-report="true"]').forEach(element => element.remove());
}

function hideTeamRoleGenericCards() {
  ["resultStrengthsCard", "resultDevelopmentCard", "resultMeaningCard", "resultAdviceCard"].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });
  const facets = document.getElementById("facetReport");
  if (facets) facets.hidden = true;
  if (resultDimensions) resultDimensions.hidden = true;
}

function appendTeamRoleBar(container, role) {
  const metric = createTeamRoleElement("div", "team-role-score-row");
  const header = createTeamRoleElement("div", "team-role-score-header");
  header.append(
    createTeamRoleElement("span", "", `${role.rawScore} van ${role.maxScore} punten`),
    createTeamRoleElement("strong", "", `${role.displayPercentage}%`)
  );
  const bar = createTeamRoleElement("div", "team-role-score-bar");
  const fill = createTeamRoleElement("span");
  fill.style.width = `${clampTeamRoleScore(role.percentage)}%`;
  bar.appendChild(fill);
  metric.append(header, bar);
  container.appendChild(metric);
}

function appendTeamRoleProfileContent(container, role) {
  appendTeamRoleBar(container, role);

  const traits = createTeamRoleElement("div", "team-role-traits");
  role.traits.forEach(trait => traits.appendChild(createTeamRoleElement("span", "", trait)));
  container.appendChild(traits);

  const intro = createTeamRoleElement("div", "team-role-profile-intro");
  intro.append(
    createTeamRoleElement("strong", "", role.headline),
    createTeamRoleElement("p", "", role.core)
  );
  container.appendChild(intro);

  const sections = [
    ["Bijdrage aan het team", role.contribution],
    ["Mogelijke kwaliteiten", role.strengths],
    ["Valkuilen bij overgebruik", role.risks],
    ["Hoe je waarschijnlijk samenwerkt", role.collaboration],
    ["Wat je van teamgenoten nodig kunt hebben", role.needs],
    ["Bij relationele spanning", role.relationConflict],
    ["Bij een inhoudelijk meningsverschil", role.taskConflict],
    ["Ontwikkelaandacht", role.development]
  ];

  const sectionGrid = createTeamRoleElement("div", "team-role-section-grid");
  sections.forEach(([title, text]) => {
    const section = createTeamRoleElement("section", "team-role-section");
    section.append(
      createTeamRoleElement("h4", "", title),
      createTeamRoleElement("p", "", text)
    );
    sectionGrid.appendChild(section);
  });
  container.appendChild(sectionGrid);
}

function createTeamRoleProfile(role) {
  const details = document.createElement("details");
  details.className = "team-role-profile";
  details.dataset.printExpand = "true";
  if (role.rank <= 3) details.open = true;

  const summary = document.createElement("summary");
  const left = createTeamRoleElement("span", "team-role-summary-left");
  left.append(
    createTeamRoleElement("span", "team-role-rank", String(role.rank)),
    createTeamRoleElement("span", "team-role-summary-copy")
  );
  const summaryCopy = left.querySelector(".team-role-summary-copy");
  summaryCopy.append(
    createTeamRoleElement("strong", "", role.name),
    createTeamRoleElement("small", `is-${role.fit.id}`, role.fit.label)
  );

  const right = createTeamRoleElement("span", "team-role-summary-right");
  right.append(
    createTeamRoleElement("strong", "", `${role.displayPercentage}%`),
    createTeamRoleElement("span", "team-role-toggle", details.open ? "Verberg uitleg" : "Toon uitleg")
  );
  summary.append(left, right);
  details.appendChild(summary);

  const body = createTeamRoleElement("div", "team-role-profile-body");
  appendTeamRoleProfileContent(body, role);
  details.appendChild(body);

  details.addEventListener("toggle", () => {
    const toggle = details.querySelector(".team-role-toggle");
    if (toggle) toggle.textContent = details.open ? "Verberg uitleg" : "Toon uitleg";
  });

  return details;
}

function createTeamRoleTopCard(role) {
  const card = createTeamRoleElement("article", "team-role-top-card");
  card.append(
    createTeamRoleElement("span", "team-role-rank", String(role.rank)),
    createTeamRoleElement("h4", "", role.name),
    createTeamRoleElement("strong", "team-role-top-score", `${role.displayPercentage}%`),
    createTeamRoleElement("span", `team-role-fit is-${role.fit.id}`, role.fit.label),
    createTeamRoleElement("p", "", role.headline)
  );
  return card;
}

function appendTeamRoleQualityNote(grid, result) {
  const quality = result.responseQuality;
  if (!quality?.uniformPattern && !quality?.lowDifferentiation) return;

  const card = createTeamRoleElement("article", "result-content-card team-role-quality-note");
  card.dataset.teamRoleReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.style.gridColumn = "1 / -1";
  card.append(
    createTeamRoleElement("span", "result-card-label", "Interpretatievoorbehoud"),
    createTeamRoleElement("h3", "", quality.uniformPattern ? "Zeer gelijkmatig antwoordpatroon" : "Weinig verschil tussen de rollen"),
    createTeamRoleElement("p", "", quality.message)
  );
  grid.appendChild(card);
}

function appendTeamRoleTopOverview(grid, result) {
  const card = createTeamRoleElement("article", "result-content-card team-role-top-overview");
  card.dataset.teamRoleReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.style.gridColumn = "1 / -1";
  card.append(
    createTeamRoleElement("span", "result-card-label", "Sterkst aansluitende bijdragen"),
    createTeamRoleElement("h3", "", result.topRoles.length > 3 ? "Gedeelde posities binnen je top drie" : "Jouw top drie"),
    createTeamRoleElement("p", "", "Deze rollen komen volgens je antwoorden het meest vanzelfsprekend naar voren. Gelijke scores krijgen dezelfde rangpositie.")
  );

  const cards = createTeamRoleElement("div", "team-role-top-grid");
  result.topRoles.forEach(role => cards.appendChild(createTeamRoleTopCard(role)));
  card.appendChild(cards);
  grid.appendChild(card);
}

function appendTeamRoleCombinationCard(grid, result) {
  const card = createTeamRoleElement("article", "result-content-card team-role-combination-card");
  card.dataset.teamRoleReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.style.gridColumn = "1 / -1";
  card.append(
    createTeamRoleElement("span", "result-card-label", "Gecombineerde interpretatie"),
    createTeamRoleElement("h3", "", "Hoe je sterkste rollen elkaar kunnen aanvullen"),
    createTeamRoleElement("p", "", result.combination.intro)
  );

  if (result.combination.pairInsights.length > 0) {
    const list = createTeamRoleElement("div", "team-role-combination-list");
    result.combination.pairInsights.forEach(item => {
      const section = createTeamRoleElement("section", "team-role-combination-item");
      section.append(
        createTeamRoleElement("h4", "", item.pair),
        createTeamRoleElement("p", "", item.synergy),
        createTeamRoleElement("p", "team-role-tension", `Mogelijke spanning: ${item.tension}`)
      );
      list.appendChild(section);
    });
    card.appendChild(list);
  }
  grid.appendChild(card);
}

function appendTeamRoleProfilesCard(grid, result) {
  const card = createTeamRoleElement("article", "result-content-card team-role-profiles-card");
  card.dataset.teamRoleReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.style.gridColumn = "1 / -1";
  card.append(
    createTeamRoleElement("span", "result-card-label", "Alle negen teamrollen"),
    createTeamRoleElement("h3", "", "Van meest naar minst vanzelfsprekend"),
    createTeamRoleElement("p", "", "De percentages zijn zelfstandige aansluitingsscores en tellen niet op tot 100%. Rollen binnen je top drie staan open; de overige uitleg kun je afzonderlijk bekijken.")
  );

  const list = createTeamRoleElement("div", "team-role-profile-list");
  result.roles.forEach(role => list.appendChild(createTeamRoleProfile(role)));
  card.appendChild(list);
  grid.appendChild(card);
}

function appendTeamRoleLowerContributions(grid, result) {
  const card = createTeamRoleElement("article", "result-content-card team-role-lower-card");
  card.dataset.teamRoleReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.style.gridColumn = "1 / -1";
  card.append(
    createTeamRoleElement("span", "result-card-label", "Minder vanzelfsprekende bijdragen"),
    createTeamRoleElement("h3", "", "Rollen die je waarschijnlijk bewuster inzet"),
    createTeamRoleElement("p", "", "Een lagere score betekent niet dat je deze rol niet kunt opnemen. De bijdrage kan minder natuurlijk voelen, alleen in specifieke situaties verschijnen of binnen jouw teams vaker door anderen worden ingevuld.")
  );

  const list = createTeamRoleElement("ul", "team-role-lower-list");
  result.lowerRoles.forEach(role => {
    const item = createTeamRoleElement("li");
    item.append(
      createTeamRoleElement("strong", "", `${role.name} · ${role.displayPercentage}%`),
      createTeamRoleElement("span", "", role.headline)
    );
    list.appendChild(item);
  });
  card.appendChild(list);
  grid.appendChild(card);
}

function appendTeamRoleMethodCard(grid) {
  const card = createTeamRoleElement("article", "result-content-card team-role-method-card");
  card.dataset.teamRoleReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.style.gridColumn = "1 / -1";
  card.append(
    createTeamRoleElement("span", "result-card-label", "Hoe de score is berekend"),
    createTeamRoleElement("h3", "", "Acht items per rol, dezelfde weging voor iedere rol"),
    createTeamRoleElement("p", "", "Ieder antwoord levert 0, 1 of 2 punten op. Iedere teamrol wordt met exact acht vragen gemeten en kan maximaal 16 punten behalen. Het percentage is de behaalde rolscore gedeeld door 16. Er worden geen normgroep, percentiel of objectieve prestatieclaims gebruikt.")
  );
  grid.appendChild(card);
}

function renderTeamRoleReport(result) {
  removeTeamRoleDynamicCards();
  hideTeamRoleGenericCards();

  resultEyebrow.textContent = "Jouw teamrollenprofiel";
  resultTestTitle.textContent = result.headline || "Jouw teamrollenprofiel";
  resultSummary.textContent = result.summary || "Je teamrollenprofiel is berekend.";

  const grid = document.querySelector(".result-content-grid");
  if (!grid) return;

  appendTeamRoleQualityNote(grid, result);
  appendTeamRoleTopOverview(grid, result);
  appendTeamRoleCombinationCard(grid, result);
  appendTeamRoleProfilesCard(grid, result);
  appendTeamRoleLowerContributions(grid, result);
  appendTeamRoleMethodCard(grid);
}
