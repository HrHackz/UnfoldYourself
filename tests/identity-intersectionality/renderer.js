"use strict";

/*
  Unfold Yourself — eigen resultaatweergave voor de kruispuntdenkentest.
  Afhankelijkheden: scoring.js, sources.js, benchmarkbestanden en core/test-renderer.js.
*/

function getIdentitySourceById(sourceId) {
  return (window.IDENTITY_INTERSECTIONALITY_SOURCES || []).find(source => {
    return source.id === sourceId;
  }) || null;
}

function getIdentityBenchmarkSet(regionId) {
  const sets = {
    belgium: window.IDENTITY_INTERSECTIONALITY_BENCHMARK_BELGIUM || {},
    europe: window.IDENTITY_INTERSECTIONALITY_BENCHMARK_EUROPE || {},
    global: window.IDENTITY_INTERSECTIONALITY_BENCHMARK_GLOBAL || {}
  };

  return sets[regionId] || sets.belgium;
}

function createIdentityElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (textContent !== undefined && textContent !== null) {
    element.textContent = String(textContent);
  }
  return element;
}

function formatIdentityComponentScore(value) {
  return typeof value === "number" ? `${value}%` : "Niet meegerekend";
}

function createIdentitySourceLinks(sourceIds) {
  const wrapper = createIdentityElement("div", "identity-source-links");

  sourceIds
    .map(getIdentitySourceById)
    .filter(Boolean)
    .forEach(source => {
      const link = document.createElement("a");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = source.citation;
      wrapper.appendChild(link);
    });

  return wrapper;
}

function createIdentityAxisCard(axisResult, regionId) {
  const benchmark = getIdentityBenchmarkSet(regionId)[axisResult.id] || {};
  const card = createIdentityElement("article", "identity-axis-card");
  card.dataset.axisId = axisResult.id;

  const header = createIdentityElement("div", "identity-axis-header");
  const titleGroup = createIdentityElement("div", "identity-axis-title-group");
  titleGroup.append(
    createIdentityElement("span", "identity-axis-kicker", axisResult.shortLabel),
    createIdentityElement("h4", "", axisResult.label)
  );

  const score = createIdentityElement(
    "strong",
    "identity-axis-score",
    typeof axisResult.score === "number" ? `${axisResult.score}%` : "—"
  );

  header.append(titleGroup, score);

  const band = createIdentityElement("p", "identity-axis-band", axisResult.bandLabel);
  const description = createIdentityElement("p", "identity-axis-description", axisResult.interpretation);

  const bar = createIdentityElement("div", "identity-power-bar");
  const barValue = createIdentityElement("span", "identity-power-bar-value");
  barValue.style.width = `${typeof axisResult.score === "number" ? axisResult.score : 0}%`;
  bar.appendChild(barValue);

  const components = createIdentityElement("dl", "identity-axis-components");
  [
    ["Maatschappelijke positie", axisResult.components.position],
    ["Ervaren toegang", axisResult.components.access],
    ["Weinig ervaren barrières", axisResult.components.barrier]
  ].forEach(([label, value]) => {
    components.append(
      createIdentityElement("dt", "", label),
      createIdentityElement("dd", "", formatIdentityComponentScore(value))
    );
  });

  const context = createIdentityElement("section", "identity-benchmark-context");
  context.append(
    createIdentityElement("span", "identity-benchmark-level", benchmark.level || "Contextinformatie"),
    createIdentityElement("p", "identity-benchmark-fact", benchmark.fact || "Geen vergelijkbare benchmark beschikbaar."),
    createIdentityElement("p", "identity-benchmark-explanation", benchmark.context || "De beschikbare data zijn beperkt."),
    createIdentityElement("span", "identity-confidence", `Datakwaliteit: ${benchmark.confidence || "beperkt"}`)
  );

  if (Array.isArray(benchmark.sourceIds) && benchmark.sourceIds.length > 0) {
    context.appendChild(createIdentitySourceLinks(benchmark.sourceIds));
  }

  card.append(header, band, description, bar, components, context);
  return card;
}

function renderIdentityAxisGrid(container, result, regionId) {
  container.replaceChildren();

  (result.axisResults || []).forEach(axisResult => {
    container.appendChild(createIdentityAxisCard(axisResult, regionId));
  });
}

function createIdentityRegionSelector(onChange) {
  const selector = createIdentityElement("div", "identity-region-selector");
  selector.setAttribute("role", "group");
  selector.setAttribute("aria-label", "Vergelijkingsregio");

  [
    ["belgium", "België"],
    ["europe", "Europa"],
    ["global", "Wereldwijd"]
  ].forEach(([id, label], index) => {
    const button = createIdentityElement("button", "identity-region-button", label);
    button.type = "button";
    button.dataset.regionId = id;
    button.setAttribute("aria-pressed", String(index === 0));
    if (index === 0) {
      button.classList.add("is-active");
    }

    button.addEventListener("click", () => {
      selector.querySelectorAll(".identity-region-button").forEach(candidate => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      onChange(id);
    });

    selector.appendChild(button);
  });

  return selector;
}

function getIdentityAdviceByAxis(result, axisId) {
  return (result.axisAdvice || []).find(item => item.axisId === axisId) || null;
}

function renderIdentityIntersectionalityProfile(result) {
  const regionCard = createIdentityElement("article", "result-content-card identity-overview-card");
  regionCard.dataset.dynamicProfileCard = "true";
  regionCard.style.gridColumn = "1 / -1";

  regionCard.append(
    createIdentityElement("span", "result-card-label", "Regiocontext"),
    createIdentityElement("h3", "", "Spiegel je 14 assen aan België, Europa of wereldwijd"),
    createIdentityElement(
      "p",
      "result-card-text",
      "De balk toont jouw eigen reflectie-index. De regioknop verandert de officiële contextinformatie, niet je persoonlijke antwoorden. Er wordt geen bevolkingspercentiel of totaalscore berekend."
    )
  );

  const grid = createIdentityElement("div", "identity-axis-grid");
  const selector = createIdentityRegionSelector(regionId => {
    renderIdentityAxisGrid(grid, result, regionId);
  });

  regionCard.append(selector, grid);
  renderIdentityAxisGrid(grid, result, "belgium");
  resultContentGrid.appendChild(regionCard);

  const intersectionItems = (result.intersections || []).map(item => {
    return `${item.title}: ${item.explanation}`;
  });

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Kruispunten",
      title: intersectionItems.length > 0
        ? "Waar identiteitsassen elkaar mogelijk versterken"
        : "Geen uitgesproken kruispunt van barrières gevonden",
      summary: intersectionItems.length > 0
        ? "Deze combinaties zijn geselecteerd via expliciete regels omdat meerdere betrokken assen relatief laag of contextafhankelijk scoorden. Ze zijn aandachtspunten, geen voorspellingen."
        : "Ook zonder lage combinaties blijven identiteiten contextueel samenwerken. De tool toont alleen kruispunten waarvoor een voorzichtige, vooraf vastgelegde interpretatie bestaat.",
      sections: [
        {
          title: "Relevante combinaties",
          items: intersectionItems
        }
      ],
      fullWidth: true
    })
  );

  const allyItems = (result.axisResults || [])
    .filter(axis => typeof axis.score === "number" && axis.score >= 65)
    .slice(0, 5)
    .map(axis => {
      const advice = getIdentityAdviceByAxis(result, axis.id);
      return `${axis.shortLabel}: ${advice?.text || "Gebruik je relatief sterke toegang bewust om ruimte en toegankelijkheid voor anderen te vergroten."}`;
    });

  const supportItems = (result.axisResults || [])
    .filter(axis => typeof axis.score === "number" && axis.score <= 49)
    .slice(0, 5)
    .map(axis => {
      const advice = getIdentityAdviceByAxis(result, axis.id);
      return `${axis.shortLabel}: ${advice?.text || "Erken de barrière, documenteer concrete situaties en zoek passende steun."}`;
    });

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Bewustwording en allyship",
      title: "Gebruik toegang zonder schuld, maar met verantwoordelijkheid",
      summary: "Een relatief gunstige positie betekent niet dat je leven gemakkelijk is. Het betekent alleen dat deze specifieke as waarschijnlijk minder extra drempels toevoegt.",
      sections: [
        {
          title: "Praktische acties",
          items: allyItems.length > 0
            ? allyItems
            : window.IDENTITY_INTERSECTIONALITY_CONTENT?.allyship || []
        }
      ]
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Erkenning en weerbaarheid",
      title: "Barrières erkennen zonder je identiteit tot een probleem te maken",
      summary: "Een lage score is geen oordeel over je veerkracht. Terugkerende drempels kunnen voortkomen uit systemen, normen of ontoegankelijke processen.",
      sections: [
        {
          title: "Praktische acties",
          items: supportItems.length > 0
            ? supportItems
            : window.IDENTITY_INTERSECTIONALITY_CONTENT?.resilience || []
        }
      ]
    })
  );

  const supportSources = ["unia-help", "igvm-help", "myria-help", "cavaria-help", "vaph-help"]
    .map(getIdentitySourceById)
    .filter(Boolean)
    .map(source => `${source.citation} ${source.note}`);

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Steun en meldpunten",
      title: "Belgische organisaties die verder kunnen helpen",
      summary: "Gebruik deze organisaties alleen wanneer ze passen bij je concrete vraag. De tool vervangt geen juridisch, medisch of psychosociaal advies.",
      sections: [
        {
          title: "Mogelijke aanspreekpunten",
          items: supportSources
        }
      ],
      fullWidth: true
    })
  );

  const limitations = window.IDENTITY_INTERSECTIONALITY_CONTENT?.limitations || [];
  const theorySources = (window.IDENTITY_INTERSECTIONALITY_SOURCES || [])
    .filter(source => source.type === "theory" || source.type === "method")
    .map(source => source.citation);

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Methodiek en grenzen",
      title: "Hoe je deze uitkomst verantwoord leest",
      summary: "De tool verbindt intersectionele theorie met actuele equality data. Waar datasets niet vergelijkbaar zijn, wordt dat expliciet aangegeven en wordt geen kunstmatige norm berekend.",
      sections: [
        {
          title: "Belangrijke beperkingen",
          items: limitations
        },
        {
          title: "Theoretische en methodische basis",
          items: theorySources
        }
      ],
      fullWidth: true
    })
  );
}
