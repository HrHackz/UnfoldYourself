"use strict";

function createWorkValuesElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}

function createWorkValuesMetric(label, score, modifier = "") {
  const wrapper = createWorkValuesElement("div", `work-values-metric ${modifier}`.trim());
  const header = createWorkValuesElement("div", "work-values-metric-header");
  header.append(
    createWorkValuesElement("span", "", label),
    createWorkValuesElement("strong", "", `${score}%`)
  );
  const bar = createWorkValuesElement("div", "work-values-metric-bar");
  const fill = createWorkValuesElement("span");
  fill.style.width = `${Math.max(0, Math.min(100, score))}%`;
  bar.appendChild(fill);
  wrapper.append(header, bar);
  return wrapper;
}

function createWorkValuesDimensionDetail(item) {
  const card = createWorkValuesElement("article", "work-values-dimension-detail");
  const header = createWorkValuesElement("div", "work-values-dimension-heading");
  const copy = createWorkValuesElement("div");
  copy.append(
    createWorkValuesElement("h4", "", item.title),
    createWorkValuesElement("p", "", item.description)
  );
  const badge = createWorkValuesElement("span", `work-values-matrix-badge is-${item.matrixType}`, item.matrixLabel);
  header.append(copy, badge);

  const metrics = createWorkValuesElement("div", "work-values-metric-grid");
  metrics.append(
    createWorkValuesMetric("Prioriteit", item.priorityScore, "is-priority"),
    createWorkValuesMetric("Motiverend effect", item.motivatorScore, "is-motivator"),
    createWorkValuesMetric("Demotivatorgevoeligheid", item.demotivatorSensitivity, "is-demotivator")
  );

  const explanation = createWorkValuesElement("p", "work-values-matrix-copy", item.matrixDescription);
  card.append(header, metrics, explanation);
  return card;
}

function appendWorkValuesListCard({ label, title, intro, items, emptyText, itemBuilder }) {
  const card = createWorkValuesElement("article", "result-content-card work-values-report-card");
  card.dataset.dynamicProfileCard = "true";
  card.style.gridColumn = "1 / -1";
  card.append(
    createWorkValuesElement("span", "result-card-label", label),
    createWorkValuesElement("h3", "", title),
    createWorkValuesElement("p", "", intro)
  );

  if (items.length > 0) {
    const list = createWorkValuesElement("div", "work-values-report-list");
    items.forEach(item => list.appendChild(itemBuilder(item)));
    card.appendChild(list);
  } else {
    card.appendChild(createWorkValuesElement("p", "work-values-empty", emptyText));
  }

  resultContentGrid.appendChild(card);
}

function renderWorkValuesResult(result) {
  [
    "resultStrengthsCard",
    "resultDevelopmentCard",
    "resultMeaningCard",
    "resultAdviceCard"
  ].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });

  const overview = createWorkValuesElement("article", "result-content-card work-values-overview-card");
  overview.dataset.dynamicProfileCard = "true";
  overview.style.gridColumn = "1 / -1";
  overview.append(
    createWorkValuesElement("span", "result-card-label", "Volledig profiel"),
    createWorkValuesElement("h3", "", "Hoe je negen werkdrijfveren zijn opgebouwd"),
    createWorkValuesElement("p", "", "Per dimensie zie je drie verschillende signalen: relatieve prioriteit, het motiverende effect van een positieve werksituatie en de gevoeligheid voor een mogelijk demotiverende situatie.")
  );
  const detailGrid = createWorkValuesElement("div", "work-values-dimension-grid");
  result.dimensionResults
    .slice()
    .sort((a, b) => b.totalScore - a.totalScore)
    .forEach(item => detailGrid.appendChild(createWorkValuesDimensionDetail(item)));
  overview.appendChild(detailGrid);
  resultContentGrid.appendChild(overview);

  appendWorkValuesListCard({
    label: "Topdrijfveren",
    title: "Jouw belangrijkste drijfveren",
    intro: "Deze drie werkwaarden wegen het zwaarst in je totale profiel. Ze beschrijven wat je waarschijnlijk actief zoekt in werk.",
    items: result.topDimensions,
    emptyText: "Er konden geen duidelijke topdrijfveren worden bepaald.",
    itemBuilder(item) {
      const block = createWorkValuesElement("section", "work-values-highlight");
      block.append(
        createWorkValuesElement("div", "work-values-highlight-score", `${item.totalScore}%`),
        createWorkValuesElement("div", "work-values-highlight-copy")
      );
      const copy = block.lastElementChild;
      copy.append(
        createWorkValuesElement("h4", "", item.title),
        createWorkValuesElement("p", "", `Je zoekt vooral ${item.seeks}.`),
        createWorkValuesElement("p", "", `Dit wordt ondersteund door ${item.supports}.`),
        createWorkValuesElement("p", "work-values-risk-copy", `Let op voor ${item.risk}.`)
      );
      return block;
    }
  });

  appendWorkValuesListCard({
    label: "Randvoorwaarden",
    title: "Wat je minimaal nodig hebt",
    intro: "Deze werkwaarden hebben een hoge demotivatorgevoeligheid. Hun aanwezigheid geeft niet altijd extra energie, maar het ontbreken ervan kan wel duidelijk frustreren.",
    items: result.minimumNeeds,
    emptyText: "Geen enkele dimensie kwam als sterke minimale randvoorwaarde naar voren.",
    itemBuilder(item) {
      const row = createWorkValuesElement("section", "work-values-simple-row");
      row.append(
        createWorkValuesElement("strong", "", item.title),
        createWorkValuesElement("span", "work-values-row-score", `${item.demotivatorSensitivity}% gevoeligheid`),
        createWorkValuesElement("p", "", `Waarschijnlijk werkt vooral ${item.risk} demotiverend.`)
      );
      return row;
    }
  });

  appendWorkValuesListCard({
    label: "Energiebronnen",
    title: "Wat je extra motiveert",
    intro: "Deze situaties kunnen je motivatie actief versterken wanneer ze voldoende aanwezig zijn in het werk.",
    items: result.extraMotivators,
    emptyText: "Geen enkele dimensie overschreed de drempel voor een uitgesproken extra motivator.",
    itemBuilder(item) {
      const row = createWorkValuesElement("section", "work-values-simple-row");
      row.append(
        createWorkValuesElement("strong", "", item.title),
        createWorkValuesElement("span", "work-values-row-score", `${item.motivatorScore}% motiverend effect`),
        createWorkValuesElement("p", "", `Je krijgt waarschijnlijk energie van ${item.supports}.`)
      );
      return row;
    }
  });

  appendWorkValuesListCard({
    label: "Combinaties",
    title: "Mogelijke spanningsvelden",
    intro: "Sterke werkwaarden kunnen elkaar aanvullen, maar soms ook verschillende voorwaarden vragen. Deze combinaties helpen je genuanceerder naar functies en werkgevers te kijken.",
    items: result.tensions,
    emptyText: "Er kwamen geen van de vooraf gedefinieerde spanningsvelden sterk genoeg naar voren.",
    itemBuilder(item) {
      const row = createWorkValuesElement("section", "work-values-simple-row");
      row.append(
        createWorkValuesElement("strong", "", item.title),
        createWorkValuesElement("p", "", item.text)
      );
      return row;
    }
  });

  appendWorkValuesListCard({
    label: "Werkcontext",
    title: "Kenmerken van een passende werkcontext",
    intro: "Dit zijn geen specifieke beroepen en ook geen geschiktheidsoordelen. Het zijn kenmerken die waarschijnlijk bijdragen aan een betere aansluiting tussen jou en je werk.",
    items: result.contextDimensions,
    emptyText: "Er konden nog geen duidelijke kenmerken van een passende werkcontext worden samengevat.",
    itemBuilder(item) {
      const row = createWorkValuesElement("section", "work-values-simple-row");
      row.append(
        createWorkValuesElement("strong", "", item.title),
        createWorkValuesElement("p", "", `Een passende context biedt ${item.supports}.`)
      );
      return row;
    }
  });

  appendWorkValuesListCard({
    label: "Praktische toepassing",
    title: "Vragen voor vacatures en gesprekken",
    intro: "Gebruik deze vragen om vóór een keuze beter te onderzoeken hoe een functie en organisatie in de praktijk werken.",
    items: result.vacancyQuestions,
    emptyText: "Er konden geen gerichte vragen worden samengesteld.",
    itemBuilder(question) {
      const row = createWorkValuesElement("section", "work-values-question-row");
      row.append(
        createWorkValuesElement("span", "work-values-question-marker", "?"),
        createWorkValuesElement("p", "", question)
      );
      return row;
    }
  });

  const closing = createWorkValuesElement("article", "result-content-card work-values-closing-card");
  closing.dataset.dynamicProfileCard = "true";
  closing.style.gridColumn = "1 / -1";
  closing.append(
    createWorkValuesElement("span", "result-card-label", "Interpretatie"),
    createWorkValuesElement("h3", "", "Gebruik het profiel als gesprek- en vergelijkingsinstrument"),
    createWorkValuesElement("p", "", "Een hoge score is niet beter dan een lage score. Het profiel maakt zichtbaar welke kenmerken voor jou zwaarder wegen en welke situaties je motivatie waarschijnlijk versterken of ondermijnen. Vergelijk altijd de dagelijkse praktijk van een functie met het beeld in een vacaturetekst.")
  );
  resultContentGrid.appendChild(closing);
}
