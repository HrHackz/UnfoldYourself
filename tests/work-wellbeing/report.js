"use strict";

function createWwElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}

function appendWwList(container, items, className = "ww-report-list") {
  const list = createWwElement("ul", className);
  (items || []).filter(Boolean).forEach(item => list.appendChild(createWwElement("li", "", item)));
  container.appendChild(list);
  return list;
}

function removeWwReportCards() {
  document.querySelectorAll('[data-ww-report="true"]').forEach(element => element.remove());
}

function hideWwGenericCards() {
  ["resultStrengthsCard", "resultDevelopmentCard", "resultMeaningCard", "resultAdviceCard"].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });
  const facets = document.getElementById("facetReport");
  if (facets) facets.hidden = true;
  if (typeof resultDimensions !== "undefined" && resultDimensions) resultDimensions.hidden = true;
}

function getWwToneLabel(tone) {
  if (tone === "risk") return "Vraagt aandacht";
  if (tone === "watch") return "Opvolgen";
  if (tone === "positive") return "Ondersteunend";
  return "Neutraal";
}

function createWwOverviewCard(result) {
  const card = createWwElement("article", "result-content-card ww-report-card ww-overview-card");
  card.dataset.wwReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.dataset.tone = result.balanceBand.tone;

  card.append(
    createWwElement("span", "result-card-label", "Jouw actuele profiel"),
    createWwElement("h3", "", result.headline)
  );

  const header = createWwElement("div", "ww-overview-header");
  const score = createWwElement("div", "ww-balance-score");
  score.append(
    createWwElement("strong", "", String(result.balanceScore)),
    createWwElement("span", "", "van 100"),
    createWwElement("small", "", result.balanceBand.label)
  );

  const copy = createWwElement("div", "ww-overview-copy");
  copy.append(
    createWwElement("span", "ww-status-badge", result.status.label),
    createWwElement("p", "", result.summary),
    createWwElement("p", "ww-norm-note", "Dit overzichtsgetal is een niet-genormeerde profielindicator. De tien afzonderlijke dimensies blijven belangrijker dan het gemiddelde.")
  );
  header.append(score, copy);
  card.appendChild(header);

  const highlights = createWwElement("div", "ww-highlight-grid");
  if (result.strongestResource) {
    const resource = createWwElement("section", "ww-highlight is-positive");
    resource.append(
      createWwElement("span", "ww-highlight-label", "Sterkste hulpbron"),
      createWwElement("h4", "", result.strongestResource.label),
      createWwElement("p", "", `${result.strongestResource.score}/100 · ${result.strongestResource.band.label}`)
    );
    highlights.appendChild(resource);
  }
  if (result.mainAttention) {
    const attention = createWwElement("section", `ww-highlight is-${result.mainAttention.band.tone}`);
    attention.append(
      createWwElement("span", "ww-highlight-label", "Belangrijkste aandachtspunt"),
      createWwElement("h4", "", result.mainAttention.label),
      createWwElement("p", "", `${result.mainAttention.score}/100 · ${result.mainAttention.band.label}`)
    );
    highlights.appendChild(attention);
  }
  card.appendChild(highlights);
  return card;
}

function createWwCombinationCard(result) {
  const card = createWwElement("article", "result-content-card ww-report-card ww-combination-card");
  card.dataset.wwReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createWwElement("span", "result-card-label", "Samenhang tussen de scores"),
    createWwElement("h3", "", "Belangrijke combinaties in je huidige situatie")
  );

  if (!result.combinations?.length) {
    card.appendChild(createWwElement("p", "ww-report-intro", "Er kwam geen vooraf gedefinieerde combinatie naar voren die extra nadruk vraagt. Lees de afzonderlijke dimensies wel in samenhang met elkaar."));
    return card;
  }

  const grid = createWwElement("div", "ww-combination-grid");
  result.combinations.slice(0, 3).forEach(rule => {
    const item = createWwElement("section", "ww-combination-item");
    item.dataset.tone = rule.tone;
    item.append(
      createWwElement("span", "ww-tone-badge", getWwToneLabel(rule.tone)),
      createWwElement("h4", "", rule.title),
      createWwElement("p", "", rule.text)
    );
    grid.appendChild(item);
  });
  card.appendChild(grid);
  return card;
}

function createWwDimensionDetails(dimension, result) {
  const details = createWwElement("details", "ww-dimension-details");
  details.dataset.tone = dimension.band.tone;
  details.open = dimension.id === result.mainAttention?.id || dimension.id === result.strongestResource?.id;

  const summary = createWwElement("summary", "ww-dimension-summary");
  const heading = createWwElement("div", "ww-dimension-heading");
  heading.append(
    createWwElement("h4", "", dimension.label),
    createWwElement("span", "ww-tone-badge", dimension.band.label)
  );
  const score = createWwElement("strong", "ww-dimension-score", `${dimension.score}/100`);
  const toggle = createWwElement("span", "ww-dimension-toggle", details.open ? "Verberg uitleg" : "Toon uitleg");
  summary.append(heading, score, toggle);

  const body = createWwElement("div", "ww-dimension-body");
  body.append(
    createWwElement("p", "ww-dimension-core", dimension.core),
    createWwElement("p", "ww-dimension-interpretation", dimension.interpretation)
  );

  const twoColumns = createWwElement("div", "ww-dimension-columns");
  const strength = createWwElement("section", "ww-dimension-panel is-strength");
  strength.append(
    createWwElement("h5", "", "Mogelijke positieve kant"),
    createWwElement("p", "", dimension.highStrength)
  );
  const risk = createWwElement("section", "ww-dimension-panel is-risk");
  risk.append(
    createWwElement("h5", "", "Waarop letten"),
    createWwElement("p", "", dimension.risk)
  );
  twoColumns.append(strength, risk);
  body.appendChild(twoColumns);

  const advice = createWwElement("section", "ww-dimension-advice");
  advice.appendChild(createWwElement("h5", "", "Direct toepasbare stappen"));
  const adviceItems = [...(dimension.advice || []).slice(0, 2), result.statusContext.specificAdvice];
  appendWwList(advice, [...new Set(adviceItems)]);
  body.appendChild(advice);

  details.append(summary, body);
  details.addEventListener("toggle", () => {
    toggle.textContent = details.open ? "Verberg uitleg" : "Toon uitleg";
  });
  return details;
}

function createWwClusterCard(cluster, result) {
  const dimensions = result.dimensionResults.filter(dimension => dimension.cluster === cluster.id);
  const card = createWwElement("article", "result-content-card ww-report-card ww-cluster-card");
  card.dataset.wwReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createWwElement("span", "result-card-label", cluster.label),
    createWwElement("h3", "", cluster.label),
    createWwElement("p", "ww-report-intro", cluster.description)
  );

  const snapshot = createWwElement("div", "ww-cluster-snapshot");
  dimensions.forEach(dimension => {
    const item = createWwElement("div", "ww-snapshot-item");
    item.dataset.tone = dimension.band.tone;
    item.append(
      createWwElement("span", "", dimension.label),
      createWwElement("strong", "", String(dimension.score)),
      createWwElement("small", "", dimension.band.label)
    );
    snapshot.appendChild(item);
  });
  card.appendChild(snapshot);

  const detailsList = createWwElement("div", "ww-dimension-list");
  dimensions.forEach(dimension => detailsList.appendChild(createWwDimensionDetails(dimension, result)));
  card.appendChild(detailsList);
  return card;
}

function createWwActionCard(result) {
  const card = createWwElement("article", "result-content-card ww-report-card ww-action-card");
  card.dataset.wwReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createWwElement("span", "result-card-label", "Praktische volgende stap"),
    createWwElement("h3", "", "Wat verdient nu als eerste aandacht?")
  );

  const attention = result.mainAttention;
  const actionIntro = attention
    ? `Begin bij ${attention.label.toLowerCase()}. Kleine, concrete veranderingen zijn bruikbaarder dan proberen alle tien dimensies tegelijk te verbeteren.`
    : "Kies één concrete verandering die je huidige situatie duurzamer maakt.";
  card.appendChild(createWwElement("p", "ww-report-intro", actionIntro));

  const actions = attention?.advice?.slice(0, 3) || [];
  appendWwList(card, [...new Set([...actions, result.statusContext.specificAdvice])], "ww-action-list");

  const support = createWwElement("section", "ww-support-note");
  support.append(
    createWwElement("h4", "", "Wanneer ondersteuning passend is"),
    createWwElement("p", "", `Wanneer belasting, onveiligheid of beperkt herstel aanhoudt of je dagelijks functioneren beïnvloedt, bespreek dit dan met ${result.statusContext.supporters}.`)
  );
  card.appendChild(support);
  return card;
}

function createWwQualityCard(result) {
  if (!result.responseQuality?.messages?.length) return null;
  const card = createWwElement("article", "result-content-card ww-report-card ww-quality-card");
  card.dataset.wwReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createWwElement("span", "result-card-label", "Interpretatievoorbehoud"),
    createWwElement("h3", "", "Controleer hoe scherp dit profiel onderscheid maakt")
  );
  appendWwList(card, result.responseQuality.messages);
  return card;
}

function createWwMethodCard() {
  const card = createWwElement("article", "result-content-card ww-report-card ww-method-card");
  card.dataset.wwReport = "true";
  card.dataset.dynamicProfileCard = "true";
  card.append(
    createWwElement("span", "result-card-label", "Methodiek en veiligheidsgrenzen"),
    createWwElement("h3", "", "Hoe moet je dit resultaat lezen?")
  );
  appendWwList(card, window.WORK_WELLBEING_METHOD_TEXT || []);
  card.appendChild(createWwElement("p", "ww-disclaimer", window.WORK_WELLBEING_DISCLAIMER || ""));
  return card;
}

function renderWorkWellbeingReport(result) {
  removeWwReportCards();
  hideWwGenericCards();
  const grid = document.querySelector(".result-content-grid");
  if (!grid) return;

  grid.appendChild(createWwOverviewCard(result));
  grid.appendChild(createWwCombinationCard(result));
  (window.WORK_WELLBEING_CLUSTERS || []).forEach(cluster => grid.appendChild(createWwClusterCard(cluster, result)));
  grid.appendChild(createWwActionCard(result));
  const qualityCard = createWwQualityCard(result);
  if (qualityCard) grid.appendChild(qualityCard);
  grid.appendChild(createWwMethodCard());
}
