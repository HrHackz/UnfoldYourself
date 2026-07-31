"use strict";

/* Beknopte resultaatweergave voor Deelidentiteiten- en kruispuntdenken v2. */

function createIdentityElement(tagName, className = "", textContent = "") {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

function createIdentitySourceLinks(sourceIds) {
  const wrapper = createIdentityElement("div", "identity-source-links");

  (sourceIds || [])
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

function createIdentityPowerAxis(axisResult) {
  const details = createIdentityElement("details", "identity-axis-card");
  details.dataset.axisId = axisResult.id;
  details.dataset.printExpand = "true";

  const summary = createIdentityElement("summary", "identity-axis-summary");
  const heading = createIdentityElement("div", "identity-axis-heading");
  heading.append(
    createIdentityElement("h4", "", axisResult.label),
    createIdentityElement("span", `identity-axis-band identity-band-${axisResult.bandId}`, axisResult.bandLabel)
  );

  const scale = createIdentityElement("div", "identity-scale");
  scale.setAttribute("aria-label", `${axisResult.label}: ${axisResult.bandLabel}`);
  const marker = createIdentityElement("span", "identity-scale-marker");
  marker.style.left = `${Math.max(0, Math.min(100, axisResult.score || 0))}%`;
  marker.setAttribute("aria-hidden", "true");
  scale.appendChild(marker);

  const labels = createIdentityElement("div", "identity-scale-labels");
  labels.append(
    createIdentityElement("span", "", "Zeer benadeeld"),
    createIdentityElement("span", "", "Zeer bevoorrecht")
  );

  summary.append(heading, scale, labels);

  const content = createIdentityElement("div", "identity-axis-detail");
  const benchmark = window.IDENTITY_INTERSECTIONALITY_BENCHMARK_BELGIUM?.[axisResult.id] || {};
  const selectedLabels = axisResult.answers
    .flatMap(answer => answer.labels || [])
    .filter(Boolean)
    .slice(0, 6);

  const position = createIdentityElement("div", "identity-detail-block");
  position.append(
    createIdentityElement("strong", "", "Jouw positie"),
    createIdentityElement("p", "", axisResult.interpretation)
  );

  if (selectedLabels.length > 0) {
    position.appendChild(
      createIdentityElement("small", "identity-answer-summary", selectedLabels.join(" · "))
    );
  }

  const belgium = createIdentityElement("div", "identity-detail-block");
  belgium.append(
    createIdentityElement("strong", "", "Belgische context"),
    createIdentityElement("p", "", benchmark.fact || "Deze as wordt vergeleken met de Belgische maatschappelijke context.")
  );

  const awareness = createIdentityElement("div", "identity-detail-block");
  awareness.append(
    createIdentityElement("strong", "", "Awareness"),
    createIdentityElement("p", "", getIdentityAxisAwareness(axisResult))
  );

  content.append(position, belgium, awareness);

  if (Array.isArray(benchmark.sourceIds) && benchmark.sourceIds.length > 0) {
    content.appendChild(createIdentitySourceLinks(benchmark.sourceIds));
  }

  details.append(summary, content);
  return details;
}

function renderIdentityIntersectionalityProfile(result) {
  const overview = createIdentityElement("article", "result-content-card identity-overview-card");
  overview.dataset.dynamicProfileCard = "true";
  overview.style.gridColumn = "1 / -1";

  overview.append(
    createIdentityElement("span", "result-card-label", "Belgische context"),
    createIdentityElement("h3", "", "Jouw positie op 14 maatschappelijke assen"),
    createIdentityElement(
      "p",
      "identity-overview-intro",
      "Links betekent meer structurele benadeling; rechts meer structureel voordeel. Open een as voor een korte uitleg, Belgische context en awarenessboodschap."
    )
  );

  const grid = createIdentityElement("div", "identity-axis-grid");
  (result.axisResults || []).forEach(axisResult => {
    grid.appendChild(createIdentityPowerAxis(axisResult));
  });
  overview.appendChild(grid);
  resultContentGrid.appendChild(overview);

  const intersectionItems = (result.intersections || []).map(item => {
    return `${item.title}: ${item.explanation}`;
  });

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Kruispunten",
      title: intersectionItems.length > 0
        ? "Waar assen elkaar kunnen versterken"
        : "Geen sterk uitgesproken kruispunt gevonden",
      summary: intersectionItems.length > 0
        ? "Deze combinaties verdienen extra aandacht. Ze zijn geen voorspelling of diagnose."
        : "Je assen blijven elkaar beïnvloeden, maar geen vooraf vastgelegde combinatie kwam sterk naar voren.",
      sections: [
        {
          title: "Belangrijkste combinaties",
          items: intersectionItems
        }
      ],
      fullWidth: true
    })
  );

  const theorySources = (window.IDENTITY_INTERSECTIONALITY_SOURCES || [])
    .filter(source => source.type === "theory")
    .map(source => source.citation);

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Methodiek",
      title: "Awareness, geen oordeel",
      summary: "Elke as weegt even zwaar in het overzicht. De stip wordt intern uit je drie antwoorden berekend; er is bewust geen algemene privilegescore.",
      sections: [
        {
          title: "Theoretische basis",
          items: theorySources
        }
      ],
      fullWidth: true
    })
  );
}
