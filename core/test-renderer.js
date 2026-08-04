"use strict";

/*
  Unfold Yourself — algemene resultaatweergave
  Afhankelijkheden: core/test-registry.js en de generieke resultaatcontracten van testmodules.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

/* =========================================================
   BIG FIVE — 30 FACETSCORES WEERGEVEN
========================================================= */

function renderFacetReport(
  result,
  definition
) {
  facetGroups.replaceChildren();

  const facetConfig =
    definition?.facetConfig;

  const facets =
    Array.isArray(result.facets)
      ? result.facets
      : [];

  const domainDefinitions =
    Array.isArray(
      facetConfig
        ?.domainDefinitions
    )
      ? facetConfig
          .domainDefinitions
      : [];

  if (
    !facetConfig ||
    facets.length === 0 ||
    domainDefinitions.length === 0
  ) {
    facetReport.hidden = true;
    return;
  }

  facetReport.hidden = false;
  facetReport.classList.remove(
    "is-collapsed"
  );

  facetReportEyebrow.textContent =
    facetConfig.eyebrow ||
    "Verdiepend profiel";

  facetReportTitle.textContent =
    facetConfig.title ||
    "Bekijk je deelscores";

  facetReportDescription.textContent =
    facetConfig.description ||
    "";

  facetReportDescription.hidden =
    !facetReportDescription.textContent;

  facetExplanationTitle.textContent =
    facetConfig.explanationTitle ||
    "Hoe lees je deze scores?";

  facetExplanationText.textContent =
    facetConfig.explanation ||
    "";

  facetExplanationText.hidden =
    !facetExplanationText.textContent;

  facetToggleButton.textContent =
    "Facetdetails verbergen";

  facetToggleButton.setAttribute(
    "aria-expanded",
    "true"
  );

  const getBandLabel =
    typeof facetConfig
      .getBandLabel ===
      "function"
      ? facetConfig
          .getBandLabel
      : getScoreBandLabel;

  domainDefinitions.forEach(
    domainDefinition => {
      const domainFacets =
        facets
          .filter(facet => {
            return (
              facet.domainId ===
              domainDefinition.id
            );
          })
          .sort((first, second) => {
            return (
              first.facet -
              second.facet
            );
          });

      if (domainFacets.length === 0) {
        return;
      }

      const domainResult =
        Array.isArray(
          result.dimensions
        )
          ? result.dimensions.find(
              dimension => {
                return (
                  dimension.id ===
                  domainDefinition.id
                );
              }
            )
          : null;

      const group =
        document.createElement(
          "section"
        );

      group.className =
        "facet-domain-group";

      const groupHeader =
        document.createElement(
          "div"
        );

      groupHeader.className =
        "facet-domain-header";

      const groupTitle =
        document.createElement(
          "div"
        );

      groupTitle.className =
        "facet-domain-title";

      const groupLabel =
        document.createElement(
          "span"
        );

      groupLabel.textContent =
        facetConfig.groupLabel ||
        "Domein";

      const groupHeading =
        document.createElement(
          "h4"
        );

      groupHeading.textContent =
        domainDefinition
          .resultLabel ||
        domainDefinition.label;

      groupTitle.append(
        groupLabel,
        groupHeading
      );

      const domainScore =
        document.createElement(
          "span"
        );

      domainScore.className =
        "facet-domain-score";

      if (
        typeof facetConfig.getGroupScoreLabel ===
          "function"
      ) {
        domainScore.textContent =
          facetConfig.getGroupScoreLabel({
            domainDefinition,
            domainResult,
            domainFacets,
            result
          });
      } else if (
        domainResult &&
        typeof domainResult.score ===
          "number"
      ) {
        domainScore.textContent =
          `${domainResult.score}% · ` +
          getBandLabel(
            domainResult.score,
            domainResult
          );
      } else {
        domainScore.textContent =
          "Geen score";
      }

      groupHeader.append(
        groupTitle,
        domainScore
      );

      const itemContainer =
        document.createElement(
          "div"
        );

      itemContainer.className =
        "facet-domain-items";

      domainFacets.forEach(
        facet => {
          const item =
            document.createElement(
              "details"
            );

          item.className =
            "facet-item";

          const itemSummary =
            document.createElement(
              "summary"
            );

          itemSummary.className =
            "facet-item-summary";

          const itemHeader =
            document.createElement(
              "div"
            );

          itemHeader.className =
            "facet-item-header";

          const itemTitle =
            document.createElement(
              "h5"
            );

          itemTitle.textContent =
            facet.label;

          const itemScore =
            document.createElement(
              "span"
            );

          itemScore.className =
            "facet-item-score";

          itemScore.textContent =
            `${facet.score}%`;

          itemHeader.append(
            itemTitle,
            itemScore
          );

          const itemBand =
            document.createElement(
              "span"
            );

          itemBand.className =
            "facet-item-band";

          itemBand.textContent =
            getBandLabel(
              facet.score,
              facet
            );

          const bar =
            document.createElement(
              "div"
            );

          bar.className =
            "facet-bar";

          const barValue =
            document.createElement(
              "span"
            );

          barValue.style.width =
            `${Math.max(
              0,
              Math.min(
                100,
                Number(
                  facet.score
                ) || 0
              )
            )}%`;

          bar.appendChild(
            barValue
          );

          const toggleLabel =
            document.createElement(
              "span"
            );

          toggleLabel.className =
            "facet-item-toggle";

          toggleLabel.textContent =
            "Toon uitleg";

          itemSummary.append(
            itemHeader,
            itemBand,
            bar,
            toggleLabel
          );

          const interpretation =
            document.createElement(
              "div"
            );

          interpretation.className =
            "facet-item-interpretation";

          const interpretationLabel =
            document.createElement(
              "span"
            );

          interpretationLabel.className =
            "facet-interpretation-label";

          interpretationLabel.textContent =
            "Wat betekent deze score?";

          const interpretationText =
            document.createElement(
              "p"
            );

          interpretationText.textContent =
            typeof facetConfig
              .getInterpretation ===
              "function"
              ? facetConfig
                  .getInterpretation(
                    facet
                  )
              : "Voor dit facet is nog geen afzonderlijke uitleg beschikbaar.";

          interpretation.append(
            interpretationLabel,
            interpretationText
          );

          item.append(
            itemSummary,
            interpretation
          );

          item.addEventListener(
            "toggle",
            () => {
              toggleLabel.textContent =
                item.open
                  ? "Verberg uitleg"
                  : "Toon uitleg";
            }
          );

          itemContainer.appendChild(
            item
          );
        }
      );

      group.append(
        groupHeader,
        itemContainer
      );

      facetGroups.appendChild(
        group
      );
    }
  );
}


/* =========================================================
   DATUM VAN EEN TESTRESULTAAT FORMATTEREN
========================================================= */

function formatResultDate(
  isoDate
) {
  if (!isoDate) {
    return "Datum niet beschikbaar";
  }

  const parsedDate =
    new Date(isoDate);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "Datum niet beschikbaar";
  }

  return new Intl.DateTimeFormat(
    "nl-BE",
    {
      dateStyle: "long",
      timeStyle: "short"
    }
  ).format(parsedDate);
}

/* =========================================================
   ALGEMENE TESTMOTOR — RESULTAAT WEERGEVEN
========================================================= */

function renderResultList(
  listElement,
  items
) {
  listElement.replaceChildren();

  const safeItems =
    Array.isArray(items)
      ? items
      : [];

  const container =
    listElement.closest(
      ".result-content-card"
    );

  if (container) {
    container.hidden =
      safeItems.length === 0;
  }

  safeItems.forEach(item => {
    const listItem =
      document.createElement(
        "li"
      );

    listItem.textContent =
      String(item);

    listElement.appendChild(
      listItem
    );
  });
}


function renderResultText(
  element,
  value
) {
  const safeValue =
    value ? String(value) : "";

  element.textContent =
    safeValue;

  const container =
    element.closest(
      ".result-content-card"
    );

  if (container) {
    container.hidden =
      !safeValue;
  }
}


function removeDynamicProfileCards() {
  document
    .querySelectorAll(
      "[data-dynamic-profile-card]"
    )
    .forEach(card => {
      card.remove();
    });
}


function createProfileTextBlock(
  text
) {
  const paragraph =
    document.createElement("p");

  paragraph.textContent =
    text || "";

  return paragraph;
}


function createProfileListBlock(
  title,
  items
) {
  const wrapper =
    document.createElement("div");

  const heading =
    document.createElement("h4");

  heading.textContent =
    title;

  const list =
    document.createElement("ul");

  const safeItems =
    Array.isArray(items)
      ? items
      : [];

  safeItems.forEach(item => {
    const listItem =
      document.createElement("li");

    listItem.textContent =
      String(item);

    list.appendChild(
      listItem
    );
  });

  wrapper.append(
    heading,
    list
  );

  return wrapper;
}


function createDynamicProfileCard({
  label,
  title,
  summary,
  sections = [],
  fullWidth = false
}) {
  const card =
    document.createElement("article");

  card.className =
    "result-content-card";

  card.dataset.dynamicProfileCard =
    "true";

  if (fullWidth) {
    card.style.gridColumn =
      "1 / -1";
  }

  const cardLabel =
    document.createElement("span");

  cardLabel.className =
    "result-card-label";

  cardLabel.textContent =
    label;

  const heading =
    document.createElement("h3");

  heading.textContent =
    title;

  card.append(
    cardLabel,
    heading
  );

  if (summary) {
    String(summary)
      .split(
        /\n\s*\n/
      )
      .filter(Boolean)
      .forEach(paragraph => {
        card.appendChild(
          createProfileTextBlock(
            paragraph
          )
        );
      });
  }

  sections.forEach(section => {
    if (
      Array.isArray(
        section.items
      ) &&
      section.items.length > 0
    ) {
      card.appendChild(
        createProfileListBlock(
          section.title,
          section.items
        )
      );
    }
  });

  return card;
}


function formatMainResultScore(
  result
) {
  if (
    result.mainScoreDisplay !==
    undefined
  ) {
    return String(
      result.mainScoreDisplay
    );
  }

  if (
    typeof result.mainScore ===
    "number"
  ) {
    return `${result.mainScore}%`;
  }

  if (
    result.mainScore !==
      undefined &&
    result.mainScore !== null
  ) {
    return String(
      result.mainScore
    );
  }

  return "—";
}


function configurePersonalityCrossTestButton(result) {
  personalityCrossTestButton.hidden = true;
  personalityCrossTestButton.dataset.targetTestId = "";

  const pair = {
    "persoonlijkheid::Big Five-test": {
      targetId: "persoonlijkheid::HEXACO-test",
      targetLabel: "HEXACO"
    },
    "persoonlijkheid::HEXACO-test": {
      targetId: "persoonlijkheid::Big Five-test",
      targetLabel: "Big Five"
    }
  };

  const relation = pair[result?.testId];

  if (!relation) {
    return;
  }

  const targetDefinition =
    getTestDefinition(
      relation.targetId
    );

  if (!targetDefinition) {
    return;
  }

  const isCompleted =
    state.completedTests.includes(
      relation.targetId
    ) &&
    Boolean(
      state.results[
        relation.targetId
      ]
    );

  const isActive =
    Boolean(
      state.activeTests[
        relation.targetId
      ]
    );

  const plan =
    typeof targetDefinition.getQuestionPlan === "function"
      ? targetDefinition.getQuestionPlan()
      : {
          total: targetDefinition.questions.length,
          reusable: 0,
          remaining: targetDefinition.questions.length
        };

  if (isCompleted) {
    personalityCrossTestButton.textContent =
      `Bekijk mijn ${relation.targetLabel}-resultaat`;
  } else if (isActive) {
    personalityCrossTestButton.textContent =
      `Ga verder met ${relation.targetLabel}`;
  } else if (plan.remaining === 0) {
    personalityCrossTestButton.textContent =
      `Maak mijn ${relation.targetLabel}-rapport direct`;
  } else if (plan.reusable > 0) {
    personalityCrossTestButton.textContent =
      `Breid uit naar ${relation.targetLabel} · nog ${plan.remaining} vragen`;
  } else {
    personalityCrossTestButton.textContent =
      `Start de ${relation.targetLabel}-test`;
  }

  personalityCrossTestButton.dataset.targetTestId =
    relation.targetId;
  personalityCrossTestButton.hidden = false;
}


function renderTestResult(result) {
  if (!result) {
    return;
  }

  result =
    hydrateSixteenPersonalityResult(
      result
    );

  const definition =
    getTestDefinition(
      result.testId
    );

  activeTestId =
    result.testId;

  hideAllTestScreens();
  resultScreen.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });

  updateTestTopbar(
    "Test voltooid",
    100
  );

  const visibleTestTitle =
    result.testTitle ||
    definition?.title ||
    "Testresultaat";

  resultTestTitle.textContent =
    visibleTestTitle;

  resultEyebrow.textContent =
    "Test voltooid";

  printTestTitle.textContent =
    visibleTestTitle;

  printReportSubtitle.textContent =
    definition?.printReportSubtitle ||
    "Persoonlijk testresultaat";

  resultSummary.textContent =
    result.summary ||
    "Je resultaat is berekend.";

  const formattedCompletedDate =
    formatResultDate(
      result.completedAt
    );

  resultCompletedDate.textContent =
    `Voltooid op ${formattedCompletedDate}`;

  printCompletedDate.textContent =
    `Voltooid op ${formattedCompletedDate}`;

  resultMainScoreHeading.textContent =
    result.mainScoreHeading ||
    definition?.mainScoreHeading ||
    "Kernresultaat";

  resultMainScore.textContent =
    formatMainResultScore(
      result
    );

  resultScoreLabel.textContent =
    result.mainLabel || "";

  resultDimensions.replaceChildren();

  const dimensions =
    Array.isArray(
      result.dimensions
    )
      ? result.dimensions
      : [];

  resultDimensions.hidden =
    dimensions.length === 0;

  dimensions.forEach(
    dimension => {
      const card =
        document.createElement(
          "article"
        );

      card.className =
        "dimension-card";

      const header =
        document.createElement(
          "div"
        );

      header.className =
        "dimension-card-header";

      const cardContent =
        definition
          ?.resultCardContent
          ?.[dimension.id] || {
            label:
              dimension.label,

            description:
              ""
          };

      const title =
        document.createElement(
          "h3"
        );

      title.textContent =
        cardContent.label ||
        dimension.label ||
        "Resultaat";

      const score =
        document.createElement(
          "strong"
        );

      score.textContent =
        typeof dimension.score ===
          "number"
          ? `${dimension.score}%`
          : String(
              dimension.score ??
              "—"
            );

      header.append(
        title,
        score
      );

      const description =
        document.createElement(
          "p"
        );

      description.className =
        "dimension-card-description";

      description.textContent =
        cardContent.description ||
        dimension.description ||
        "";

      description.hidden =
        !description.textContent;

      const bar =
        document.createElement(
          "div"
        );

      bar.className =
        "dimension-bar";

      const barValue =
        document.createElement(
          "span"
        );

      barValue.style.width =
        `${Math.max(
          0,
          Math.min(
            100,
            Number(
              dimension.score
            ) || 0
          )
        )}%`;

      bar.appendChild(
        barValue
      );

      card.append(
        header,
        description,
        bar
      );

      resultDimensions.appendChild(
        card
      );
    }
  );

  renderFacetReport(
    result,
    definition
  );

  renderResultList(
    resultStrengths,
    result.strengths
  );

  renderResultList(
    resultDevelopment,
    result.development
  );

  renderResultText(
    resultMeaning,
    result.meaning
  );

  renderResultText(
    resultAdvice,
    result.advice
  );

  removeDynamicProfileCards();

  if (
    typeof definition?.renderResultDetails ===
      "function"
  ) {
    definition.renderResultDetails(
      result,
      definition
    );
  }

  const evidence =
    definition?.evidence || {};

  resultMethodSource.textContent =
    evidence.source ||
    "Geen specifieke bron vermeld.";

  resultMethodDisclaimer.textContent =
    evidence.disclaimer ||
    "Dit resultaat is bedoeld voor zelfinzicht en persoonlijke ontwikkeling.";

  if (
    typeof applyUniformReportPresentation ===
      "function"
  ) {
    applyUniformReportPresentation(
      result,
      definition
    );
  }

  configurePersonalityCrossTestButton(
    result
  );

  finishTestButton.textContent =
    "Terug naar mijn profiel";
}

