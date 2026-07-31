"use strict";

/*
  Unfold Yourself — IPIP-HEXACO-testmodule
  Afhankelijkheden: hexaco-questions.js, hexaco-results.js,
  core/test-utils.js en core/personality-answer-bank.js.
*/

const HEXACO_QUESTIONS = Array.isArray(window.HEXACO_QUESTIONS)
  ? window.HEXACO_QUESTIONS
  : [];

const HEXACO_DOMAIN_PROFILES =
  window.HEXACO_DOMAIN_PROFILES || {};

const HEXACO_FACET_INTERPRETATIONS =
  window.HEXACO_FACET_INTERPRETATIONS || {};

const HEXACO_DOMAIN_DEFINITIONS = [
  {
    code: "H",
    id: "eerlijkheid-bescheidenheid",
    label: "Eerlijkheid-bescheidenheid",
    resultLabel: "Eerlijkheid-bescheidenheid"
  },
  {
    code: "E",
    id: "emotionaliteit",
    label: "Emotionaliteit",
    resultLabel: "Emotionaliteit"
  },
  {
    code: "X",
    id: "extraversie",
    label: "Extraversie",
    resultLabel: "Extraversie"
  },
  {
    code: "A",
    id: "verdraagzaamheid",
    label: "Verdraagzaamheid",
    resultLabel: "Verdraagzaamheid"
  },
  {
    code: "C",
    id: "consciëntieusheid",
    label: "Consciëntieusheid",
    resultLabel: "Consciëntieusheid"
  },
  {
    code: "O",
    id: "openheid",
    label: "Openheid voor ervaringen",
    resultLabel: "Openheid voor ervaringen"
  }
];

const HEXACO_DOMAIN_BY_CODE = Object.fromEntries(
  HEXACO_DOMAIN_DEFINITIONS.map(domain => [domain.code, domain])
);

const HEXACO_FACET_DEFINITIONS = {
  H: [
    { code: "SINC", label: "Oprechtheid" },
    { code: "FAIR", label: "Rechtvaardigheid" },
    { code: "GREE", label: "Vermijding van hebzucht" },
    { code: "MODE", label: "Bescheidenheid" }
  ],
  E: [
    { code: "FEAR", label: "Angstgevoeligheid" },
    { code: "ANXI", label: "Bezorgdheid" },
    { code: "DEPE", label: "Afhankelijkheid" },
    { code: "SENT", label: "Sentimentaliteit" }
  ],
  X: [
    { code: "EXPR", label: "Expressiviteit" },
    { code: "SOCB", label: "Sociale durf" },
    { code: "SOCI", label: "Sociabiliteit" },
    { code: "LIVE", label: "Levendigheid" }
  ],
  A: [
    { code: "FORG", label: "Vergevingsgezindheid" },
    { code: "GENT", label: "Mildheid" },
    { code: "FLEX", label: "Flexibiliteit" },
    { code: "PATI", label: "Geduld" }
  ],
  C: [
    { code: "ORGA", label: "Organisatie" },
    { code: "DILI", label: "IJver" },
    { code: "PERF", label: "Perfectionisme" },
    { code: "PRUD", label: "Voorzichtigheid" }
  ],
  O: [
    { code: "AESA", label: "Esthetische waardering" },
    { code: "INQU", label: "Nieuwsgierigheid" },
    { code: "CREA", label: "Creativiteit" },
    { code: "UNCO", label: "Onconventionaliteit" }
  ]
};

const HEXACO_RESULT_CARD_CONTENT = {
  "eerlijkheid-bescheidenheid": {
    label: "Eerlijkheid-bescheidenheid",
    description:
      "Hoe oprecht, rechtvaardig, weinig hebzuchtig en bescheiden je doorgaans handelt."
  },
  emotionaliteit: {
    label: "Emotionaliteit",
    description:
      "Hoe sterk angst, bezorgdheid, behoefte aan steun en emotionele verbondenheid bij je naar voren komen."
  },
  extraversie: {
    label: "Extraversie",
    description:
      "Hoe expressief, sociaal zelfverzekerd, sociabel en levendig je doorgaans bent."
  },
  verdraagzaamheid: {
    label: "Verdraagzaamheid",
    description:
      "Hoe vergevingsgezind, mild, flexibel en geduldig je reageert op conflict en frustratie."
  },
  "consciëntieusheid": {
    label: "Consciëntieusheid",
    description:
      "Hoe georganiseerd, ijverig, kwaliteitsgericht en voorzichtig je te werk gaat."
  },
  openheid: {
    label: "Openheid voor ervaringen",
    description:
      "Hoe sterk je esthetische waardering, nieuwsgierigheid, creativiteit en onconventioneel denken zijn."
  }
};

const HEXACO_ANSWER_DESCRIPTIONS = {
  "Zeer oneens": "Deze uitspraak past helemaal niet bij mij.",
  "Oneens": "Deze uitspraak past meestal niet bij mij.",
  "Noch eens, noch oneens": "Deze uitspraak past soms wel en soms niet bij mij.",
  "Eens": "Deze uitspraak past meestal bij mij.",
  "Zeer eens": "Deze uitspraak past volledig bij mij."
};

const HEXACO_RAW_CHOICES = [
  { rawValue: 1, label: "Zeer oneens" },
  { rawValue: 2, label: "Oneens" },
  { rawValue: 3, label: "Noch eens, noch oneens" },
  { rawValue: 4, label: "Eens" },
  { rawValue: 5, label: "Zeer eens" }
];

function getHexacoQuestionChoices(question) {
  return HEXACO_RAW_CHOICES.map(choice => ({
    value:
      question.keyed === "minus"
        ? 6 - choice.rawValue
        : choice.rawValue,
    rawValue: choice.rawValue,
    color: choice.rawValue,
    label: choice.label,
    description: HEXACO_ANSWER_DESCRIPTIONS[choice.label] || ""
  }));
}

const mappedHexacoQuestions = HEXACO_QUESTIONS
  .filter(question => Boolean(HEXACO_DOMAIN_BY_CODE[question.domain]))
  .map(question => {
    const domain = HEXACO_DOMAIN_BY_CODE[question.domain];

    return {
      id: question.id,
      text: question.text,
      keyed: question.keyed,
      domainCode: question.domain,
      dimension: domain.id,
      facet: Number(question.facet),
      facetCode: question.facetCode,
      facetLabel: question.facetLabel,
      answerBankKey: question.answerBankKey,
      category: `${domain.label} · ${question.facetLabel}`
    };
  });

if (mappedHexacoQuestions.length !== 240) {
  console.warn(
    `HEXACO-controle: er werden ${mappedHexacoQuestions.length} vragen geladen in plaats van 240.`
  );
}

function calculateHexacoPercentage(sum, count) {
  if (!count) {
    return 0;
  }

  const minimum = count;
  const maximum = count * 5;

  return Math.round(
    ((sum - minimum) / Math.max(1, maximum - minimum)) * 100
  );
}

function getHexacoDomainInterpretation(dimension) {
  const profile = HEXACO_DOMAIN_PROFILES[dimension.id];

  if (!profile) {
    return {
      strength: "Deze dimensie geeft aanvullende informatie over je persoonlijkheidsprofiel.",
      development: "Gebruik deze score als vertrekpunt voor verdere reflectie.",
      meaning: "deze persoonlijkheidstendens in je antwoorden zichtbaar is"
    };
  }

  return profile[getScoreBand(dimension.score)] || profile.middle;
}

function getHexacoFacetInterpretation(facet) {
  return (
    HEXACO_FACET_INTERPRETATIONS?.[facet.domainCode]?.[facet.facetCode]?.[
      getScoreBand(facet.score)
    ] ||
    "Voor dit facet is nog geen afzonderlijke interpretatie beschikbaar."
  );
}

function calculateHexacoResult({ definition, session, testId }) {
  if (!definition || !session) {
    return null;
  }

  const domainTotals = {};
  const facetTotals = {};

  HEXACO_DOMAIN_DEFINITIONS.forEach(domain => {
    domainTotals[domain.id] = { sum: 0, count: 0 };

    HEXACO_FACET_DEFINITIONS[domain.code].forEach((facet, index) => {
      facetTotals[`${domain.code}:${facet.code}`] = {
        sum: 0,
        count: 0,
        facet: index + 1,
        label: facet.label
      };
    });
  });

  for (const question of definition.questions) {
    const scoredAnswer = session.answers[question.id];

    if (typeof scoredAnswer !== "number") {
      return null;
    }

    domainTotals[question.dimension].sum += scoredAnswer;
    domainTotals[question.dimension].count += 1;

    const facetKey = `${question.domainCode}:${question.facetCode}`;
    facetTotals[facetKey].sum += scoredAnswer;
    facetTotals[facetKey].count += 1;
  }

  const dimensions = HEXACO_DOMAIN_DEFINITIONS.map(domain => {
    const total = domainTotals[domain.id];

    return {
      id: domain.id,
      label: domain.label,
      code: domain.code,
      score: calculateHexacoPercentage(total.sum, total.count)
    };
  });

  const facets = [];

  HEXACO_DOMAIN_DEFINITIONS.forEach(domain => {
    HEXACO_FACET_DEFINITIONS[domain.code].forEach((facet, index) => {
      const total = facetTotals[`${domain.code}:${facet.code}`];

      facets.push({
        domainId: domain.id,
        domainLabel: domain.label,
        domainCode: domain.code,
        facet: index + 1,
        facetCode: facet.code,
        label: facet.label,
        score: calculateHexacoPercentage(total.sum, total.count)
      });
    });
  });

  const pronouncedDimensions = [...dimensions].sort((first, second) => {
    return Math.abs(second.score - 50) - Math.abs(first.score - 50);
  });

  const primary = pronouncedDimensions[0];
  const secondary = pronouncedDimensions[1];
  const primaryInterpretation = getHexacoDomainInterpretation(primary);
  const secondaryInterpretation = getHexacoDomainInterpretation(secondary);
  const primaryBandLabel = getScoreBandLabel(primary.score);
  const secondaryBandLabel = getScoreBandLabel(secondary.score);

  const honestyDimension = dimensions.find(
    dimension => dimension.id === "eerlijkheid-bescheidenheid"
  );

  const conflictDimension = dimensions.find(
    dimension => dimension.id === "verdraagzaamheid"
  );

  return {
    testId,
    testTitle: definition.title,
    resultType: definition.resultType,
    mainScoreHeading: definition.mainScoreHeading,
    completedAt: new Date().toISOString(),
    mainScore: primary.score,
    mainLabel: `${primary.label} · ${primaryBandLabel}`,
    dimensions,
    facets,
    summary:
      `Je meest uitgesproken HEXACO-dimensie is ${primary.label.toLowerCase()} ` +
      `(${primaryBandLabel.toLowerCase()}, ${primary.score}%). Daarna volgt ` +
      `${secondary.label.toLowerCase()} (${secondaryBandLabel.toLowerCase()}, ` +
      `${secondary.score}%). Anders dan de Big Five kijkt dit rapport afzonderlijk ` +
      `naar eerlijkheid-bescheidenheid en verdeelt het emotionele en conflictgerichte ` +
      `kenmerken volgens de HEXACO-structuur.`,
    strengths: [
      primaryInterpretation.strength,
      secondaryInterpretation.strength,
      honestyDimension
        ? `Je score op eerlijkheid-bescheidenheid is ${honestyDimension.score}%. Deze dimensie beschrijft je verhouding tot oprechtheid, rechtvaardigheid, status, persoonlijk voordeel en bescheidenheid.`
        : ""
    ].filter(Boolean),
    development: [
      primaryInterpretation.development,
      secondaryInterpretation.development,
      conflictDimension
        ? `Je score op verdraagzaamheid is ${conflictDimension.score}%. Gebruik vooral de onderliggende facetten om te onderzoeken hoe je reageert op frustratie, kritiek, fouten en herstel na conflict.`
        : ""
    ].filter(Boolean),
    meaning:
      `Je profiel wijst erop dat ${primaryInterpretation.meaning}. Daarnaast laat ` +
      `het resultaat zien dat ${secondaryInterpretation.meaning}. De combinatie van ` +
      `zes domeinen is belangrijker dan één afzonderlijke hoge of lage score.`,
    advice:
      "Gebruik de facetdetails om concrete situaties te onderzoeken: omgaan met macht en voordeel, reageren op risico en emotionele steun, sociale zichtbaarheid, conflictgedrag, werkorganisatie en openheid voor nieuwe ideeën. Kies één situatie waarin je een sterke voorkeur bewust inzet en één situatie waarin meer flexibiliteit waardevol kan zijn."
  };
}

const HEXACO_TEST_DEFINITION = {
  id: "persoonlijkheid::HEXACO-test",
  domainId: "persoonlijkheid",
  domainTitle: "Persoonlijkheid",
  title: "HEXACO-test",
  description:
    "Deze uitgebreide Nederlandstalige IPIP-HEXACO-test bevat 240 uitspraken en brengt zes persoonlijkheidsdomeinen en vierentwintig onderliggende facetten in kaart.",
  estimatedTime: "Ongeveer 30 tot 40 minuten",
  resultType: "faceted-dimensions",
  mainScoreHeading: "Meest uitgesproken HEXACO-score",
  printReportSubtitle: "Uitgebreid HEXACO-persoonlijkheidsrapport",
  usesPersonalityAnswerBank: true,

  createSession({ definition, startedAt, forceAll = false }) {
    return createAdaptivePersonalitySession({
      definition,
      startedAt,
      forceAll
    });
  },

  getQuestionPlan() {
    return getAdaptiveQuestionPlan(this);
  },

  getChoices: getHexacoQuestionChoices,
  calculateResult: calculateHexacoResult,
  resultCardContent: HEXACO_RESULT_CARD_CONTENT,

  facetConfig: {
    eyebrow: "HEXACO-verdieping",
    title: "Bekijk je 24 HEXACO-facetscores",
    description:
      "Ieder HEXACO-domein bestaat uit vier facetten. Deze details laten zien welke onderdelen je domeinscore versterken, afzwakken of nuanceren.",
    explanationTitle: "Hoe lees je deze scores?",
    explanation:
      "Een hogere score betekent dat het betreffende kenmerk sterker in je antwoorden naar voren komt. De percentages zijn omgerekende ruwe schaalwaarden en geen bevolkingspercentielen. Hoog of laag is niet automatisch beter of slechter.",
    groupLabel: "HEXACO-domein",
    domainDefinitions: HEXACO_DOMAIN_DEFINITIONS,
    getBandLabel: getScoreBandLabel,
    getInterpretation: getHexacoFacetInterpretation
  },

  evidence: {
    summary:
      "Deze test is een Nederlandstalige bewerking van de publieke IPIP-schalen die 24 facetten van het HEXACO-model benaderen. Iedere facetschaal bevat tien items, samen 240 uitspraken.",
    source:
      "Ashton, M. C., Lee, K., & Goldberg, L. R. (2007). The IPIP–HEXACO scales: An alternative, public-domain measure of the personality constructs in the HEXACO model. Personality and Individual Differences, 42, 1515–1526. Items en scoringssleutels: International Personality Item Pool, Oregon Research Institute.",
    disclaimer:
      "Dit is een Nederlandstalige bewerking van publieke IPIP-items en niet de officiële HEXACO-PI-R. De test ondersteunt zelfinzicht en persoonlijke ontwikkeling, is geen psychologische of medische diagnose en vormt op zichzelf geen bewijs van geschiktheid voor een functie."
  },

  dimensions: HEXACO_DOMAIN_DEFINITIONS.map(domain => ({
    id: domain.id,
    label: domain.label,
    code: domain.code
  })),

  questions: mappedHexacoQuestions
};
