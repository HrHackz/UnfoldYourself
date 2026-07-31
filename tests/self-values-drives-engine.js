"use strict";

/*
  Unfold Yourself — Zelfbeeld-, waarden- en drijfverentest
  Afhankelijkheden: self-values-drives-questions.js,
  self-values-drives-results.js en core/test-utils.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

const SELF_VALUES_DRIVES_METADATA =
  window.SELF_VALUES_DRIVES_METADATA &&
  typeof window.SELF_VALUES_DRIVES_METADATA === "object"
    ? window.SELF_VALUES_DRIVES_METADATA
    : {};

const SELF_VALUES_DRIVES_CHOICES =
  Array.isArray(window.SELF_VALUES_DRIVES_CHOICES)
    ? window.SELF_VALUES_DRIVES_CHOICES
    : [];

const SELF_VALUES_DRIVES_QUESTIONS =
  Array.isArray(window.SELF_VALUES_DRIVES_QUESTIONS)
    ? window.SELF_VALUES_DRIVES_QUESTIONS
    : [];

const SELF_VALUES_DRIVES_RESULT_CONTENT =
  window.SELF_VALUES_DRIVES_RESULT_CONTENT &&
  typeof window.SELF_VALUES_DRIVES_RESULT_CONTENT === "object"
    ? window.SELF_VALUES_DRIVES_RESULT_CONTENT
    : {};

const SELF_VALUES_DRIVES_COMPONENTS =
  Array.isArray(SELF_VALUES_DRIVES_RESULT_CONTENT.componentDefinitions)
    ? SELF_VALUES_DRIVES_RESULT_CONTENT.componentDefinitions
    : [];

const SELF_VALUES_DRIVES_SCALE_PROFILES =
  SELF_VALUES_DRIVES_RESULT_CONTENT.scaleProfiles || {};

const SELF_VALUES_DRIVES_EXPECTED_COUNTS = {
  "self-image": 10,
  "self-confidence": 10,
  values: 20,
  motivation: 12,
  "decision-making": 25
};

const SELF_VALUES_DRIVES_SCALE_TYPES = {
  "self-image": "self-image",
  "self-efficacy": "self-confidence",
  "self-direction": "value",
  stimulation: "value",
  hedonism: "value",
  achievement: "value",
  power: "value",
  security: "value",
  conformity: "value",
  tradition: "value",
  benevolence: "value",
  universalism: "value",
  "need-achievement": "motivation",
  "need-affiliation": "motivation",
  "need-power": "motivation",
  rational: "decision",
  intuitive: "decision",
  dependent: "decision",
  avoidant: "decision",
  spontaneous: "decision"
};

function validateSelfValuesDrivesData() {
  const problems = [];
  const questionIds = new Set();
  const normalizedTexts = new Set();
  const componentCounts = {};

  SELF_VALUES_DRIVES_QUESTIONS.forEach(question => {
    if (!question?.id || questionIds.has(question.id)) {
      problems.push(`ongeldig of dubbel vraag-ID: ${question?.id || "ontbreekt"}`);
    }

    questionIds.add(question?.id);

    const normalizedText = String(question?.text || "")
      .trim()
      .toLocaleLowerCase("nl-NL");

    if (!normalizedText || normalizedTexts.has(normalizedText)) {
      problems.push(`lege of dubbele vraagtekst: ${question?.id || "onbekend"}`);
    }

    normalizedTexts.add(normalizedText);
    componentCounts[question.component] =
      (componentCounts[question.component] || 0) + 1;
  });

  if (SELF_VALUES_DRIVES_QUESTIONS.length !== 77) {
    problems.push(`verwacht 77 vragen, geladen: ${SELF_VALUES_DRIVES_QUESTIONS.length}`);
  }

  Object.entries(SELF_VALUES_DRIVES_EXPECTED_COUNTS).forEach(([component, expected]) => {
    if ((componentCounts[component] || 0) !== expected) {
      problems.push(`${component}: verwacht ${expected}, geladen ${componentCounts[component] || 0}`);
    }
  });

  if (problems.length > 0) {
    console.warn(
      `Zelfbeeld-, waarden- en drijfverentest: ${problems.join("; ")}.`
    );
    return false;
  }

  return true;
}

validateSelfValuesDrivesData();

function getSelfValuesDrivesChoices() {
  return SELF_VALUES_DRIVES_CHOICES;
}

function scoreSelfValuesDrivesAnswer(question, answer) {
  if (typeof answer !== "number" || answer < 1 || answer > 5) {
    return null;
  }

  return question.keyed === "minus"
    ? 6 - answer
    : answer;
}

function averageToPercentage(sum, count) {
  if (!count) {
    return 0;
  }

  const average = sum / count;
  return Math.round(((average - 1) / 4) * 100);
}

function getSelfValuesDrivesBand(score) {
  if (score >= 70) {
    return "high";
  }

  if (score <= 44) {
    return "low";
  }

  return "middle";
}

function getSelfValuesDrivesBandLabel(score, item = null) {
  if (item?.scaleType === "value") {
    if (item.rank <= 3) {
      return "Sterkste prioriteit";
    }

    if (item.rank >= 8) {
      return "Minder centraal";
    }

    return "Middengebied";
  }

  if (item?.scaleType === "decision") {
    const band = getSelfValuesDrivesBand(score);
    return band === "high"
      ? "Vaak gebruikt"
      : band === "low"
        ? "Minder gebruikt"
        : "Situationeel";
  }

  if (item?.scaleType === "motivation") {
    const band = getSelfValuesDrivesBand(score);
    return band === "high"
      ? "Sterke drijfveer"
      : band === "low"
        ? "Minder sturend"
        : "Aanwezige drijfveer";
  }

  const band = getSelfValuesDrivesBand(score);
  return band === "high"
    ? "Stevig"
    : band === "low"
      ? "Kwetsbaarder"
      : "Wisselend tot redelijk stevig";
}

function getSelfValuesDrivesInterpretation(facet) {
  const profile = SELF_VALUES_DRIVES_SCALE_PROFILES[facet?.scaleId];

  if (!profile) {
    return "Voor deze deelscore is nog geen afzonderlijke interpretatie beschikbaar.";
  }

  if (facet.scaleType === "value") {
    if (facet.rank <= 3) {
      return profile.central;
    }

    if (facet.rank >= 8) {
      return profile.less;
    }

    return profile.middle;
  }

  return profile[getSelfValuesDrivesBand(facet.score)] || profile.middle;
}

function getScaleLabel(scaleId) {
  return SELF_VALUES_DRIVES_SCALE_PROFILES[scaleId]?.label || scaleId;
}

function rankScores(scaleIds, scaleResults) {
  return scaleIds
    .map(scaleId => scaleResults[scaleId])
    .filter(Boolean)
    .sort((first, second) => {
      const centeredDifference =
        Number(second.centeredScore || 0) - Number(first.centeredScore || 0);

      if (centeredDifference !== 0) {
        return centeredDifference;
      }

      return second.score - first.score;
    })
    .map((item, index) => ({
      ...item,
      rank: index + 1
    }));
}

function getTopPair(items) {
  const safeItems = Array.isArray(items) ? items : [];

  return {
    primary: safeItems[0] || null,
    secondary: safeItems[1] || null,
    isShared:
      safeItems.length > 1 &&
      Math.abs(safeItems[0].score - safeItems[1].score) <= 5
  };
}

function calculateHigherOrderValues(valueResults) {
  const definitions = SELF_VALUES_DRIVES_RESULT_CONTENT.higherOrderValues || {};

  return Object.entries(definitions)
    .map(([id, definition]) => {
      const items = (definition.scales || [])
        .map(scaleId => valueResults[scaleId])
        .filter(Boolean);

      const score = items.length
        ? Math.round(items.reduce((sum, item) => sum + item.score, 0) / items.length)
        : 0;

      const centeredScore = items.length
        ? items.reduce((sum, item) => sum + item.centeredScore, 0) / items.length
        : 0;

      return {
        id,
        label: definition.label,
        description: definition.description,
        score,
        centeredScore
      };
    })
    .sort((first, second) => second.centeredScore - first.centeredScore);
}

function detectValueTensions(valueResults) {
  const tensions = SELF_VALUES_DRIVES_RESULT_CONTENT.valueTensions || [];

  return tensions
    .map(tension => {
      const leftItems = tension.left.map(id => valueResults[id]).filter(Boolean);
      const rightItems = tension.right.map(id => valueResults[id]).filter(Boolean);

      const left = leftItems.length
        ? leftItems.reduce((sum, item) => sum + item.score, 0) / leftItems.length
        : 0;

      const right = rightItems.length
        ? rightItems.reduce((sum, item) => sum + item.score, 0) / rightItems.length
        : 0;

      return {
        ...tension,
        leftScore: Math.round(left),
        rightScore: Math.round(right),
        isActive: left >= 65 && right >= 65
      };
    })
    .filter(tension => tension.isActive);
}

function buildSelfValuesDrivesSynthesis({
  selfImage,
  selfEfficacy,
  rankedValues,
  motivationPair,
  decisionPair,
  activeTensions
}) {
  const topValue = rankedValues[0];
  const primaryMotivation = motivationPair.primary;
  const primaryDecision = decisionPair.primary;

  const selfRelation =
    selfImage.score >= 70 && selfEfficacy.score >= 70
      ? "Je combineert een stevige zelfwaardering met veel vertrouwen in je vermogen om te handelen."
      : selfImage.score < 45 && selfEfficacy.score >= 70
        ? "Je vertrouwt relatief sterk op wat je kunt aanpakken, terwijl je beoordeling van jezelf kritischer blijft. Presteren kan daardoor sneller een manier worden om eigenwaarde te bevestigen."
        : selfImage.score >= 70 && selfEfficacy.score < 45
          ? "Je basisgevoel van eigenwaarde lijkt steviger dan je vertrouwen in het uitvoeren van moeilijke of nieuwe taken."
          : "Je zelfwaardering en handelingsvertrouwen lijken in redelijke mate aanwezig, maar kunnen per situatie wisselen.";

  const tensionText = activeTensions.length > 0
    ? ` Tegelijk zijn ${activeTensions.length === 1 ? "een mogelijke waardenspanning" : "mogelijke waardenspanningen"} zichtbaar, waardoor context en bewuste prioritering extra belangrijk worden.`
    : " Je waardenprofiel toont geen sterke gelijktijdige nadruk op de twee onderzochte tegenpolen.";

  return `${selfRelation} ${topValue ? `${topValue.label} staat bovenaan je waardenrangorde.` : ""} ` +
    `${primaryMotivation ? `${primaryMotivation.label} is je meest uitgesproken motivatiedrijfveer.` : ""} ` +
    `${primaryDecision ? `Bij beslissingen gebruik je vooral een ${primaryDecision.label.toLowerCase()}.` : ""}` +
    tensionText;
}

function calculateSelfValuesDrivesResult({ definition, session, testId }) {
  if (!definition || !session) {
    return null;
  }

  const totals = {};
  const componentTotals = {};

  definition.questions.forEach(question => {
    const answer = session.answers[question.id];
    const scored = scoreSelfValuesDrivesAnswer(question, answer);

    if (scored === null) {
      return;
    }

    totals[question.scaleId] = totals[question.scaleId] || {
      sum: 0,
      count: 0,
      scaleId: question.scaleId,
      component: question.component
    };

    totals[question.scaleId].sum += scored;
    totals[question.scaleId].count += 1;

    componentTotals[question.component] = componentTotals[question.component] || {
      sum: 0,
      count: 0
    };

    componentTotals[question.component].sum += scored;
    componentTotals[question.component].count += 1;
  });

  if (Object.values(totals).reduce((sum, item) => sum + item.count, 0) !== definition.questions.length) {
    return null;
  }

  const scaleResults = {};

  Object.values(totals).forEach(total => {
    scaleResults[total.scaleId] = {
      id: total.scaleId,
      scaleId: total.scaleId,
      label: getScaleLabel(total.scaleId),
      component: total.component,
      scaleType: SELF_VALUES_DRIVES_SCALE_TYPES[total.scaleId],
      score: averageToPercentage(total.sum, total.count),
      rawAverage: Number((total.sum / total.count).toFixed(2)),
      itemCount: total.count
    };
  });

  const valueIds = SELF_VALUES_DRIVES_RESULT_CONTENT.valueOrder || [];
  const valueItems = valueIds.map(id => scaleResults[id]).filter(Boolean);
  const personalValueMean = valueItems.length
    ? valueItems.reduce((sum, item) => sum + item.rawAverage, 0) / valueItems.length
    : 0;

  valueItems.forEach(item => {
    item.centeredScore = Number((item.rawAverage - personalValueMean).toFixed(3));
  });

  const rankedValues = rankScores(valueIds, scaleResults);
  rankedValues.forEach(item => {
    scaleResults[item.scaleId].rank = item.rank;
  });

  const motivationItems = (SELF_VALUES_DRIVES_RESULT_CONTENT.motivationOrder || [])
    .map(id => scaleResults[id])
    .filter(Boolean)
    .sort((first, second) => second.score - first.score);

  const decisionItems = (SELF_VALUES_DRIVES_RESULT_CONTENT.decisionOrder || [])
    .map(id => scaleResults[id])
    .filter(Boolean)
    .sort((first, second) => second.score - first.score);

  const motivationPair = getTopPair(motivationItems);
  const decisionPair = getTopPair(decisionItems);
  const higherOrderValues = calculateHigherOrderValues(scaleResults);
  const activeTensions = detectValueTensions(scaleResults);

  const selfImage = scaleResults["self-image"];
  const selfEfficacy = scaleResults["self-efficacy"];
  const topValue = rankedValues[0];

  const facets = [
    {
      domainId: "self-image",
      facet: 1,
      id: "self-image",
      scaleId: "self-image",
      scaleType: "self-image",
      label: selfImage.label,
      score: selfImage.score
    },
    {
      domainId: "self-confidence",
      facet: 1,
      id: "self-efficacy",
      scaleId: "self-efficacy",
      scaleType: "self-confidence",
      label: selfEfficacy.label,
      score: selfEfficacy.score
    },
    ...rankedValues.map((item, index) => ({
      domainId: "values",
      facet: index + 1,
      id: item.scaleId,
      scaleId: item.scaleId,
      scaleType: "value",
      label: item.label,
      score: item.score,
      rank: item.rank,
      centeredScore: item.centeredScore
    })),
    ...motivationItems.map((item, index) => ({
      domainId: "motivation",
      facet: index + 1,
      id: item.scaleId,
      scaleId: item.scaleId,
      scaleType: "motivation",
      label: item.label,
      score: item.score,
      rank: index + 1
    })),
    ...decisionItems.map((item, index) => ({
      domainId: "decision-making",
      facet: index + 1,
      id: item.scaleId,
      scaleId: item.scaleId,
      scaleType: "decision",
      label: item.label,
      score: item.score,
      rank: index + 1
    }))
  ];

  const dimensions = [
    {
      id: "self-image",
      label: "Zelfbeeld",
      score: selfImage.score,
      scaleType: "component"
    },
    {
      id: "self-confidence",
      label: "Zelfvertrouwen",
      score: selfEfficacy.score,
      scaleType: "component"
    },
    {
      id: "values",
      label: topValue ? `Topwaarde · ${topValue.label}` : "Waardenprofiel",
      score: topValue?.score || 0,
      scaleType: "component",
      topLabel: topValue?.label || "—"
    },
    {
      id: "motivation",
      label: motivationPair.primary ? `Drijfveer · ${motivationPair.primary.label}` : "Motivatie",
      score: motivationPair.primary?.score || 0,
      scaleType: "component",
      topLabel: motivationPair.primary?.label || "—"
    },
    {
      id: "decision-making",
      label: decisionPair.primary ? `Stijl · ${decisionPair.primary.label}` : "Besluitvorming",
      score: decisionPair.primary?.score || 0,
      scaleType: "component",
      topLabel: decisionPair.primary?.label || "—"
    }
  ];

  const summary = buildSelfValuesDrivesSynthesis({
    selfImage,
    selfEfficacy,
    rankedValues,
    motivationPair,
    decisionPair,
    activeTensions
  });

  const strengths = [];
  const development = [];

  if (selfImage.score >= 70) {
    strengths.push("Je zelfwaardering lijkt relatief stevig en blijft waarschijnlijk niet uitsluitend afhankelijk van prestaties of goedkeuring.");
  } else if (selfImage.score < 45) {
    development.push("Onderzoek welke situaties je zelfkritiek activeren en formuleer bewijsgerichte, evenwichtige alternatieven voor harde globale oordelen over jezelf.");
  }

  if (selfEfficacy.score >= 70) {
    strengths.push("Je verwacht doorgaans dat je met strategie, inspanning en hulpbronnen een werkbare aanpak kunt vinden.");
  } else if (selfEfficacy.score < 45) {
    development.push("Verklein moeilijke doelen tot concrete eerstvolgende stappen en leg kleine succeservaringen zichtbaar vast om handelingsvertrouwen op te bouwen.");
  }

  if (topValue) {
    strengths.push(`${topValue.label} geeft een duidelijk aanknopingspunt voor keuzes die langdurig betekenisvol moeten voelen.`);
  }

  if (motivationPair.primary) {
    strengths.push(`${motivationPair.primary.label} is een herkenbare bron van energie die je bewust kunt inzetten bij studie, werk en persoonlijke doelen.`);
  }

  if (decisionPair.primary?.scaleId === "avoidant" && decisionPair.primary.score >= 60) {
    development.push("Maak bij moeilijke keuzes vooraf een beslisdeadline en definieer welk minimum aan informatie voldoende is om een eerste stap te zetten.");
  }

  if (decisionPair.primary?.scaleId === "spontaneous" && decisionPair.primary.score >= 70) {
    development.push("Gebruik bij onomkeerbare keuzes een vaste pauzeregel waarin je risico’s, alternatieven en gevolgen controleert voordat je definitief beslist.");
  }

  if (decisionPair.primary?.scaleId === "dependent" && decisionPair.primary.score >= 70) {
    development.push("Vraag advies, maar noteer vóór het gesprek eerst je eigen voorkeur en argumenten zodat ondersteuning niet ongemerkt je eigenaarschap vervangt.");
  }

  if (activeTensions.length > 0) {
    development.push("Benoem bij belangrijke keuzes expliciet welke twee waarden tegelijk aandacht vragen en welk compromis je bewust aanvaardt.");
  }

  if (development.length === 0) {
    development.push("Kies één actuele beslissing en controleer bewust of je dominante waarden, drijfveer en beslisroutine ook werkelijk passen bij de eisen van die situatie.");
  }

  return {
    testId,
    testTitle: definition.title,
    resultType: "self-values-drives-profile",
    completedAt: new Date().toISOString(),
    mainScoreHeading: "Kern van je profiel",
    mainScoreDisplay: topValue?.label || "Persoonlijk profiel",
    mainLabel:
      `${motivationPair.primary?.label || "Drijfveer niet bepaald"} · ` +
      `${decisionPair.primary?.label || "Besluitvormingsstijl niet bepaald"}`,
    summary,
    dimensions,
    facets,
    strengths,
    development,
    meaning:
      "Dit profiel laat zien hoe je zelfwaardering en handelingsvertrouwen samenhangen met wat je belangrijk vindt, waardoor je gemotiveerd raakt en hoe je keuzes benadert. De onderdelen beïnvloeden elkaar, maar geen enkele score bepaalt op zichzelf hoe je in iedere situatie zult handelen.",
    advice:
      "Gebruik het rapport als reflectiekader. Vergelijk je uitkomst met concrete situaties uit studie, werk en relaties. Let vooral op momenten waarop een sterke waarde of voorkeursstijl behulpzaam is én op situaties waarin een andere aanpak betere gevolgen kan hebben.",
    selfProfile: {
      selfImage,
      selfEfficacy
    },
    valuesProfile: {
      rankedValues,
      higherOrderValues,
      personalValueMean: Number(personalValueMean.toFixed(3)),
      activeTensions
    },
    motivationProfile: {
      ranked: motivationItems,
      primary: motivationPair.primary,
      secondary: motivationPair.secondary,
      isShared: motivationPair.isShared
    },
    decisionProfile: {
      ranked: decisionItems,
      primary: decisionPair.primary,
      secondary: decisionPair.secondary,
      isShared: decisionPair.isShared
    }
  };
}

function formatRankedItems(items, limit = null) {
  const safeItems = Array.isArray(items) ? items : [];
  const selected = limit ? safeItems.slice(0, limit) : safeItems;

  return selected.map((item, index) => {
    return `${index + 1}. ${item.label} — ${item.score}%`;
  });
}

function renderSelfValuesDrivesProfile(result) {
  if (
    result?.resultType !== "self-values-drives-profile" ||
    !resultContentGrid
  ) {
    return;
  }

  const selfImage = result.selfProfile?.selfImage;
  const selfEfficacy = result.selfProfile?.selfEfficacy;
  const rankedValues = result.valuesProfile?.rankedValues || [];
  const higherOrderValues = result.valuesProfile?.higherOrderValues || [];
  const tensions = result.valuesProfile?.activeTensions || [];
  const motivation = result.motivationProfile || {};
  const decision = result.decisionProfile || {};

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Geïntegreerde synthese",
      title: "Hoe de vijf onderdelen samenkomen",
      summary: result.summary,
      sections: [
        {
          title: "Kernsignalen",
          items: [
            selfImage ? `Zelfbeeld: ${selfImage.score}%` : null,
            selfEfficacy ? `Zelfvertrouwen: ${selfEfficacy.score}%` : null,
            rankedValues[0] ? `Topwaarde: ${rankedValues[0].label}` : null,
            motivation.primary ? `Primaire drijfveer: ${motivation.primary.label}` : null,
            decision.primary ? `Voorkeursstijl: ${decision.primary.label}` : null
          ].filter(Boolean)
        }
      ],
      fullWidth: true
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Zelfbeeld en handelingsvertrouwen",
      title: "Hoe je jezelf waardeert en op je aanpak vertrouwt",
      summary:
        `${getSelfValuesDrivesInterpretation({ scaleId: "self-image", score: selfImage?.score || 0 })}\n\n` +
        `${getSelfValuesDrivesInterpretation({ scaleId: "self-efficacy", score: selfEfficacy?.score || 0 })}`,
      sections: [
        {
          title: "Praktische reflectie",
          items: [
            "Is je gevoel van eigenwaarde afhankelijk van een geslaagde prestatie of blijft het ook bij tegenslag overeind?",
            "In welke soorten taken vertrouw je sterk op je aanpak en in welke situaties neemt twijfel het snel over?"
          ]
        }
      ]
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Waardenhiërarchie",
      title: "Wat richting geeft aan je keuzes",
      summary:
        "De rangorde is gebaseerd op je relatieve prioriteiten binnen je eigen antwoordpatroon. Een lager gerangschikte waarde is niet onbelangrijk; andere waarden kregen alleen meer nadruk.",
      sections: [
        {
          title: "Vijf sterkste waarden",
          items: formatRankedItems(rankedValues, 5)
        },
        {
          title: "Brede waarderichtingen",
          items: higherOrderValues.map(item => `${item.label}: ${item.description}`)
        }
      ],
      fullWidth: true
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: motivation.isShared ? "Gedeelde motivatiedrijfveren" : "Motivatiedrijfveren",
      title: motivation.isShared
        ? `${motivation.primary?.label || "—"} en ${motivation.secondary?.label || "—"}`
        : motivation.primary?.label || "Motivatieprofiel",
      summary:
        motivation.primary
          ? getSelfValuesDrivesInterpretation({
              scaleId: motivation.primary.scaleId,
              scaleType: "motivation",
              score: motivation.primary.score
            })
          : "Geen primaire drijfveer beschikbaar.",
      sections: [
        {
          title: "Rangorde",
          items: formatRankedItems(motivation.ranked)
        }
      ]
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: decision.isShared ? "Gecombineerde besluitvormingsstijl" : "Besluitvormingsstijl",
      title: decision.isShared
        ? `${decision.primary?.label || "—"} en ${decision.secondary?.label || "—"}`
        : decision.primary?.label || "Besluitvormingsprofiel",
      summary:
        decision.primary
          ? getSelfValuesDrivesInterpretation({
              scaleId: decision.primary.scaleId,
              scaleType: "decision",
              score: decision.primary.score
            })
          : "Geen primaire besluitvormingsstijl beschikbaar.",
      sections: [
        {
          title: "Alle vijf stijlen",
          items: formatRankedItems(decision.ranked)
        }
      ]
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label: "Spanningen en bewuste keuzes",
      title: tensions.length > 0
        ? "Waarden die tegelijk om aandacht vragen"
        : "Geen sterke waardenspanning gevonden",
      summary:
        tensions.length > 0
          ? "Tegengestelde waarden kunnen allebei belangrijk zijn. Dat is geen inconsistentie: het betekent dat je bij sommige keuzes bewust moet bepalen welke waarde op dat moment prioriteit krijgt."
          : "Je antwoorden tonen binnen de twee onderzochte tegenpolen geen sterke gelijktijdige nadruk. Ook dan blijft context belangrijk: waarden kunnen in concrete situaties anders worden geactiveerd.",
      sections: [
        {
          title: "Mogelijke spanningsvelden",
          items: tensions.map(item => `${item.label}: ${item.explanation}`)
        }
      ],
      fullWidth: true
    })
  );
}

function getSelfValuesDrivesGroupScoreLabel({ domainDefinition, domainResult, result }) {
  if (!domainDefinition) {
    return "";
  }

  if (domainDefinition.id === "values") {
    const top = result?.valuesProfile?.rankedValues?.[0];
    return top ? `Topwaarde: ${top.label}` : "Waardenprofiel";
  }

  if (domainDefinition.id === "motivation") {
    const primary = result?.motivationProfile?.primary;
    return primary ? `Primair: ${primary.label}` : "Motivatieprofiel";
  }

  if (domainDefinition.id === "decision-making") {
    const primary = result?.decisionProfile?.primary;
    return primary ? `Voorkeur: ${primary.label}` : "Besluitvormingsprofiel";
  }

  if (domainResult && typeof domainResult.score === "number") {
    return `${domainResult.score}% · ${getSelfValuesDrivesBandLabel(domainResult.score, domainResult)}`;
  }

  return "Geen score";
}

const SELF_VALUES_DRIVES_TEST_DEFINITION = {
  id: "persoonlijkheid::Zelfbeeld-, waarden- en drijfverentest",
  domainId: "persoonlijkheid",
  domainTitle: "Persoonlijkheid",
  title: "Zelfbeeld-, waarden- en drijfverentest",
  description:
    "Deze geïntegreerde test bevat 77 unieke uitspraken en brengt zelfbeeld, zelfvertrouwen, persoonlijke waarden, motivatiedrijfveren en besluitvormingsstijlen samen in één profiel.",
  estimatedTime: "Ongeveer 12 tot 15 minuten",
  resultType: "self-values-drives-profile",
  mainScoreHeading: "Kern van je profiel",
  printReportSubtitle: "Geïntegreerd zelfbeeld-, waarden- en drijfverenrapport",
  getChoices: getSelfValuesDrivesChoices,
  calculateResult: calculateSelfValuesDrivesResult,
  renderResultDetails: renderSelfValuesDrivesProfile,
  resultCardContent: SELF_VALUES_DRIVES_RESULT_CONTENT.resultCardContent || {},
  facetConfig: {
    eyebrow: "Verdiepend totaalprofiel",
    title: "Bekijk alle 20 deelscores",
    description:
      "Open de onderdelen om te zien hoe je zelfwaardering, zelfeffectiviteit, tien waarden, drie drijfveren en vijf besluitvormingsstijlen in je antwoorden naar voren komen.",
    explanationTitle: "Hoe lees je deze scores?",
    explanation:
      "De percentages zijn omgerekende eigen scores binnen deze vragenlijst en geen bevolkingspercentielen. Waarden worden vooral relatief geïnterpreteerd: de onderlinge rangorde is belangrijker dan één afzonderlijk percentage. Hoog of laag is niet automatisch beter of slechter.",
    groupLabel: "Onderdeel",
    domainDefinitions: SELF_VALUES_DRIVES_COMPONENTS,
    getBandLabel: getSelfValuesDrivesBandLabel,
    getInterpretation: getSelfValuesDrivesInterpretation,
    getGroupScoreLabel: getSelfValuesDrivesGroupScoreLabel
  },
  evidence: {
    summary:
      "Deze geïntegreerde test is inhoudelijk gebaseerd op vijf gevestigde kaders: globale zelfwaardering, algemene zelfeffectiviteit, de tien basiswaarden van Schwartz, de drie motivatiedrijfveren van McClelland en vijf algemene besluitvormingsstijlen.",
    source:
      "Rosenberg, M. (1965), Society and the adolescent self-image. Schwarzer, R., & Jerusalem, M. (1995), Generalized Self-Efficacy scale. Schwartz, S. H. (1992), Universals in the content and structure of values. McClelland, D. C. (1987), Human motivation. Scott, S. G., & Bruce, R. A. (1995), Decision-making style: The development and assessment of a new measure.",
    disclaimer:
      "De formuleringen en uniforme vijfpuntsschaal zijn voor Unfold Yourself aangepast. Dit is daarom geen officiële of zelfstandig gevalideerde afname van de oorspronkelijke instrumenten. De resultaten ondersteunen zelfinzicht en persoonlijke ontwikkeling; ze zijn geen diagnose, normscore of selectie-oordeel."
  },
  dimensions: SELF_VALUES_DRIVES_COMPONENTS.map(component => ({
    id: component.id,
    label: component.label
  })),
  questions: SELF_VALUES_DRIVES_QUESTIONS
};

window.UNFOLD_TEST_DEFINITIONS =
  Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
    ? window.UNFOLD_TEST_DEFINITIONS
    : [];

window.UNFOLD_TEST_DEFINITIONS.push(
  SELF_VALUES_DRIVES_TEST_DEFINITION
);
