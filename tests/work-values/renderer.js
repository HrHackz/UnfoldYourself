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
    createWorkValuesMetric("Werkwaarde", item.workValueScore, "is-priority"),
    createWorkValuesMetric("Motiverend effect", item.motivatorScore, "is-motivator"),
    createWorkValuesMetric("Demotivatorgevoeligheid", item.demotivatorSensitivity, "is-demotivator")
  );

  card.append(header, metrics, createWorkValuesElement("p", "work-values-matrix-copy", item.matrixDescription));
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
  ["resultStrengthsCard", "resultDevelopmentCard", "resultMeaningCard", "resultAdviceCard"].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });

  const overview = createWorkValuesElement("article", "result-content-card work-values-overview-card");
  overview.dataset.dynamicProfileCard = "true";
  overview.style.gridColumn = "1 / -1";
  overview.append(
    createWorkValuesElement("span", "result-card-label", "Volledig profiel"),
    createWorkValuesElement("h3", "", "Jouw negen werkdrijfveren"),
    createWorkValuesElement("p", "", "Per dimensie zie je wat je belangrijk vindt, welk kenmerk je actief motiveert en hoe gevoelig je bent voor het ontbreken ervan. Een hoge score is niet beter dan een lage score.")
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
    title: "Wat voor jou het zwaarst weegt",
    intro: "Deze drie dimensies hebben de sterkste totale invloed op wat je in werk zoekt en hoe je motivatie reageert.",
    items: result.topDimensions,
    emptyText: "Er konden geen duidelijke topdrijfveren worden bepaald.",
    itemBuilder(item) {
      const block = createWorkValuesElement("section", "work-values-highlight");
      block.append(
        createWorkValuesElement("div", "work-values-highlight-score", `${item.totalScore}%`),
        createWorkValuesElement("div", "work-values-highlight-copy")
      );
      block.lastElementChild.append(
        createWorkValuesElement("h4", "", item.title),
        createWorkValuesElement("p", "", `Je zoekt vooral ${item.seeks}.`),
        createWorkValuesElement("p", "", `Dit wordt ondersteund door ${item.supports}.`),
        createWorkValuesElement("p", "work-values-risk-copy", `Mogelijk demotiverend: ${item.risk}.`)
      );
      return block;
    }
  });

  appendWorkValuesListCard({
    label: "Randvoorwaarden",
    title: "Wat je minimaal nodig kunt hebben",
    intro: "Deze dimensies hebben een hoge demotivatorgevoeligheid. Het ontbreken ervan kan je motivatie duidelijk ondermijnen.",
    items: result.minimumNeeds,
    emptyText: "Geen dimensie kwam als uitgesproken minimale randvoorwaarde naar voren.",
    itemBuilder(item) {
      const row = createWorkValuesElement("section", "work-values-simple-row");
      row.append(
        createWorkValuesElement("strong", "", item.title),
        createWorkValuesElement("span", "work-values-row-score", `${item.demotivatorSensitivity}% gevoeligheid`),
        createWorkValuesElement("p", "", `Let vooral op ${item.risk}.`)
      );
      return row;
    }
  });

  appendWorkValuesListCard({
    label: "Energiebronnen",
    title: "Wat je extra kan motiveren",
    intro: "Deze werkkenmerken kunnen je energie en betrokkenheid actief versterken.",
    items: result.extraMotivators,
    emptyText: "Geen dimensie overschreed de drempel voor een uitgesproken extra motivator.",
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
    intro: "Sterke werkwaarden kunnen elkaar aanvullen, maar soms verschillende voorwaarden vragen.",
    items: result.tensions,
    emptyText: "Er kwamen geen vooraf gedefinieerde spanningsvelden sterk genoeg naar voren.",
    itemBuilder(item) {
      const row = createWorkValuesElement("section", "work-values-simple-row");
      row.append(createWorkValuesElement("strong", "", item.title), createWorkValuesElement("p", "", item.text));
      return row;
    }
  });

  appendWorkValuesListCard({
    label: "Werkcontext",
    title: "Kenmerken van een passende werkcontext",
    intro: "Dit zijn werkkenmerken, geen specifieke beroepen en geen geschiktheidsoordelen.",
    items: result.contextDimensions,
    emptyText: "Er konden nog geen duidelijke werkcontextkenmerken worden samengevat.",
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
    intro: "Gebruik deze vragen om te onderzoeken hoe een functie en organisatie in de praktijk werken.",
    items: result.vacancyQuestions,
    emptyText: "Er konden geen gerichte vragen worden samengesteld.",
    itemBuilder(question) {
      const row = createWorkValuesElement("section", "work-values-question-row");
      row.append(createWorkValuesElement("span", "work-values-question-marker", "?"), createWorkValuesElement("p", "", question));
      return row;
    }
  });

  const closing = createWorkValuesElement("article", "result-content-card work-values-closing-card");
  closing.dataset.dynamicProfileCard = "true";
  closing.style.gridColumn = "1 / -1";
  closing.append(
    createWorkValuesElement("span", "result-card-label", "Interpretatie"),
    createWorkValuesElement("h3", "", "Gebruik het profiel als vergelijkingsinstrument"),
    createWorkValuesElement("p", "", "Vergelijk je profiel met de dagelijkse werkelijkheid van een functie. Kijk naar werkafspraken, verantwoordelijkheid, samenwerking, ontwikkelmogelijkheden en de concrete werkomgeving, niet alleen naar de functietitel.")
  );
  resultContentGrid.appendChild(closing);
}
