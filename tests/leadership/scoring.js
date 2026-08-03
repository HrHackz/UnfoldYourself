"use strict";

function clampLeadershipScore(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function roundLeadershipScore(value, decimals = 1) {
  const factor = 10 ** decimals;
  return Math.round((Number(value) || 0) * factor) / factor;
}

function getLeadershipScenarioOption(question, answerId) {
  return question?.options?.find(option => option.id === answerId) || null;
}

function getLeadershipFitPoints(targetStyle, chosenStyle) {
  if (targetStyle === chosenStyle) return 2;

  const adjacent = {
    S1: ["S2", "S4"],
    S2: ["S1", "S3"],
    S3: ["S2", "S4"],
    S4: ["S3", "S1"]
  };

  return adjacent[targetStyle]?.includes(chosenStyle) ? 1 : 0;
}

function getLeadershipFlexibilityLabel(rawIndex, fitPercentage) {
  const labels = [
    { id: "low", label: "Weinig flexibel" },
    { id: "limited", label: "Beperkt flexibel" },
    { id: "reasonable", label: "Redelijk flexibel" },
    { id: "flexible", label: "Flexibel" },
    { id: "very-flexible", label: "Zeer flexibel" }
  ];

  let level = rawIndex >= 85 ? 4 : rawIndex >= 70 ? 3 : rawIndex >= 55 ? 2 : rawIndex >= 40 ? 1 : 0;
  const fitCap = fitPercentage < 40 ? 0 : fitPercentage < 55 ? 1 : fitPercentage < 70 ? 2 : 4;
  level = Math.min(level, fitCap);
  return { ...labels[level], level };
}

function getLeadershipFlexibilityInterpretation(labelId) {
  const text = {
    "very-flexible": "Je gebruikt meerdere manieren van aansturen en je keuzes sluiten meestal goed aan bij wat iemand voor een specifieke taak nodig heeft.",
    flexible: "Je kunt tussen verschillende manieren van aansturen schakelen en stemt je aanpak vaak passend af op de situatie.",
    reasonable: "Je beschikt over meerdere manieren van aansturen, maar enkele situaties lokken nog een duidelijke voorkeursreactie of minder passende keuze uit.",
    limited: "Je valt relatief vaak terug op een beperkt aantal manieren van aansturen. Bewuster diagnosticeren kan je repertoire beter laten aansluiten op de situatie.",
    low: "Je antwoorden tonen een sterke voorkeur voor een vaste aanpak of geregeld een beperkte afstemming op de beschreven situatie."
  };
  return text[labelId] || text.reasonable;
}

function calculateLeadershipSituationalResult(answers) {
  const counts = { S1: 0, S2: 0, S3: 0, S4: 0 };
  let fitPoints = 0;
  let answered = 0;

  LEADERSHIP_SCENARIOS.forEach(question => {
    const answerId = answers?.[question.id];
    const option = getLeadershipScenarioOption(question, answerId);
    if (!option) return;
    answered += 1;
    counts[option.style] += 1;
    fitPoints += getLeadershipFitPoints(question.targetStyle, option.style);
  });

  const distributions = LEADERSHIP_SITUATIONAL_STYLES.map(style => {
    const count = counts[style.id] || 0;
    return {
      ...style,
      count,
      percentage: answered > 0 ? roundLeadershipScore((count / answered) * 100, 1) : 0,
      displayPercentage: answered === 20 ? count * 5 : Math.round(answered > 0 ? (count / answered) * 100 : 0)
    };
  });

  const percentagesForBreadth = LEADERSHIP_SITUATIONAL_STYLES.map(style => {
    return answered > 0 ? ((counts[style.id] || 0) / answered) * 100 : 0;
  });
  const deviation = percentagesForBreadth.reduce((sum, percentage) => sum + Math.abs(percentage - 25), 0);
  const breadth = answered > 0 ? clampLeadershipScore(100 - ((deviation / 150) * 100)) : 0;
  const fitPercentage = answered > 0 ? clampLeadershipScore((fitPoints / (answered * 2)) * 100) : 0;
  const rawFlexibility = (0.75 * fitPercentage) + (0.25 * breadth);
  const flexibility = getLeadershipFlexibilityLabel(rawFlexibility, fitPercentage);

  return {
    answered,
    complete: answered === LEADERSHIP_SCENARIOS.length,
    counts,
    distributions,
    fitPoints,
    maxFitPoints: answered * 2,
    fitPercentage: roundLeadershipScore(fitPercentage, 1),
    fitDisplay: Math.round(fitPercentage),
    breadthPercentage: roundLeadershipScore(breadth, 1),
    breadthDisplay: Math.round(breadth),
    rawFlexibilityIndex: roundLeadershipScore(rawFlexibility, 1),
    flexibilityIndex: Math.round(rawFlexibility),
    flexibilityId: flexibility.id,
    flexibilityLabel: flexibility.label,
    flexibilityLevel: flexibility.level,
    interpretation: getLeadershipFlexibilityInterpretation(flexibility.id)
  };
}

function getLeadershipStyleCategory(score, highestScore, isPrimary) {
  if (isPrimary) return { id: "primary", label: "Jouw go-to-basisstijl" };
  const difference = highestScore - score;
  if (score >= 70 && difference <= 10) return { id: "easy", label: "Makkelijk beschikbare stijl" };
  if (score >= 60 && difference <= 20) return { id: "strong", label: "Sluit sterk bij je aan" };
  if (score >= 45 && difference <= 30) return { id: "conscious", label: "Beschikbaar met bewuste aanpassing" };
  if (score >= 25) return { id: "effort", label: "Vraagt meer inspanning" };
  return { id: "low", label: "Weinig natuurlijke aansluiting" };
}

function calculateLeadershipStyleResults(answers) {
  const order = new Map(LEADERSHIP_STYLE_DEFINITIONS.map((style, index) => [style.id, index]));
  const results = LEADERSHIP_STYLE_DEFINITIONS.map(style => {
    const questions = LEADERSHIP_STYLE_QUESTIONS.filter(question => question.styleId === style.id);
    const values = questions
      .map(question => Number(answers?.[question.id]))
      .filter(value => Number.isFinite(value));
    const rawScore = values.reduce((sum, value) => sum + value, 0);
    const maxScore = questions.length * 4;
    const percentage = maxScore > 0 ? (rawScore / maxScore) * 100 : 0;
    return {
      ...style,
      answered: values.length,
      questionCount: questions.length,
      complete: values.length === questions.length,
      rawScore,
      maxScore,
      percentage: roundLeadershipScore(percentage, 1),
      displayPercentage: Math.round(percentage)
    };
  });

  const sorted = [...results].sort((left, right) => {
    if (right.rawScore !== left.rawScore) return right.rawScore - left.rawScore;
    if (right.percentage !== left.percentage) return right.percentage - left.percentage;
    return (order.get(left.id) || 0) - (order.get(right.id) || 0);
  });

  const highestScore = sorted[0]?.percentage || 0;
  const highestRawScore = sorted[0]?.rawScore || 0;
  const primaryIds = sorted.filter(item => item.rawScore === highestRawScore).map(item => item.id);
  const sharedPrimary = primaryIds.length > 1;

  sorted.forEach((item, index) => {
    const primary = primaryIds.includes(item.id);
    const previous = sorted[index - 1];
    item.rank = index === 0
      ? 1
      : previous && previous.rawScore === item.rawScore
        ? previous.rank
        : index + 1;
    item.isPrimary = primary;
    item.category = getLeadershipStyleCategory(item.percentage, highestScore, primary);
    if (primary && sharedPrimary) {
      item.category = { id: "primary-shared", label: "Gedeelde basisstijl" };
    }
  });

  return {
    complete: results.every(item => item.complete),
    styles: sorted,
    primaryStyles: sorted.filter(item => item.isPrimary),
    sharedPrimary,
    highestScore,
    easyStyles: sorted.filter(item => item.category.id === "easy"),
    strongStyles: sorted.filter(item => item.category.id === "strong"),
    broadProfile: sorted.length > 0 && (sorted[0].percentage - sorted[sorted.length - 1].percentage) <= 15
  };
}

function detectLeadershipUniformResponsePattern(answers) {
  const values = LEADERSHIP_STYLE_QUESTIONS
    .map(question => Number(answers?.[question.id]))
    .filter(value => Number.isFinite(value));

  if (values.length !== LEADERSHIP_STYLE_QUESTIONS.length) return false;
  const frequencies = values.reduce((map, value) => {
    map[value] = (map[value] || 0) + 1;
    return map;
  }, {});
  return Math.max(...Object.values(frequencies)) >= 57;
}

function getLeadershipPrimaryTitle(styleResult) {
  const flexibility = styleResult.situational.flexibilityLabel.toLowerCase();
  const primary = styleResult.styleProfile.primaryStyles;

  if (primary.length > 3) {
    return `Je bent een ${flexibility} leider met een breed, gedeeld stijlprofiel`;
  }

  if (primary.length > 1) {
    const names = primary.map(item => item.categoryLabel.toLowerCase()).join(" en ");
    return `Je bent een ${flexibility} leider met een gedeelde basisstijl: ${names}`;
  }

  const top = primary[0] || styleResult.styleProfile.styles[0];
  return `Je bent een ${flexibility} leider met een ${top.adjective} basisstijl`;
}

function getLeadershipSummary(situational, styleProfile, uniformPattern) {
  const primary = styleProfile.primaryStyles;
  const top = primary[0] || styleProfile.styles[0];
  const primaryText = primary.length > 3
    ? "Je antwoorden laten geen afzonderlijke basisstijl boven de andere uitsteken."
    : primary.length > 1
      ? `Je natuurlijke voorkeur is gedeeld tussen ${primary.map(item => item.name.toLowerCase()).join(" en ")}.`
      : `Je natuurlijke voorkeur ligt vooral bij ${top.name.toLowerCase()}.`;

  const available = [...styleProfile.easyStyles, ...styleProfile.strongStyles]
    .filter(item => !item.isPrimary)
    .slice(0, 2);
  const availableText = available.length > 0
    ? `${available.map(item => item.name).join(" en ")} ${available.length === 1 ? "is" : "zijn"} eveneens duidelijk beschikbaar in je repertoire.`
    : "Andere stijlen vragen volgens je antwoorden meestal een bewustere aanpassing.";

  const broadText = styleProfile.broadProfile
    ? "Je stijlprofiel is breed en weinig uitgesproken: je herkent veel verschillende leiderschapsgedragingen bij jezelf."
    : "De rangschikking laat zien welke gedragingen vanzelfsprekender en welke minder natuurlijk beschikbaar zijn.";

  const caution = uniformPattern
    ? " Omdat je vrijwel overal hetzelfde antwoord gebruikte, is het onderscheid tussen de stijlen minder precies."
    : "";

  return `${primaryText} ${top.core} ${availableText} In situationele keuzes ben je ${situational.flexibilityLabel.toLowerCase()}: ${situational.interpretation.toLowerCase()} ${broadText}${caution}`;
}

function getLeadershipOverallAdvice(situational, styleProfile) {
  const top = styleProfile.primaryStyles[0] || styleProfile.styles[0];
  const flexibilityAdvice = {
    "very-flexible": "Blijf aan anderen uitleggen waarom je je aanpak verandert, zodat flexibel gedrag niet als willekeurig overkomt.",
    flexible: "Oefen vooral met de situaties waarin je nog terugvalt op een minder passende voorkeursreactie.",
    reasonable: "Neem vóór belangrijke interventies bewust twee vragen door: hoeveel taakervaring is er en hoeveel betrokkenheid of zekerheid is er?",
    limited: "Bouw je repertoire stap voor stap uit door in veilige situaties één minder vertrouwde aanpak bewust te oefenen.",
    low: "Begin met het herkennen van D1-, D2-, D3- en D4-signalen en kies pas daarna hoeveel richting en ondersteuning nodig is."
  };
  return `${flexibilityAdvice[situational.flexibilityId]} Voor je basisstijl geldt daarnaast: ${top.advice}`;
}

function calculateLeadershipResult({ session, testId }) {
  const normalized = normalizeLeadershipSession(session);
  const situational = calculateLeadershipSituationalResult(normalized.answers);
  const styleProfile = calculateLeadershipStyleResults(normalized.answers);

  if (!situational.complete || !styleProfile.complete) return null;

  const uniformPattern = detectLeadershipUniformResponsePattern(normalized.answers);
  const completedAt = new Date().toISOString();
  const resultShell = { situational, styleProfile };
  const headline = getLeadershipPrimaryTitle(resultShell);
  const top = styleProfile.primaryStyles[0] || styleProfile.styles[0];
  const mainLabel = styleProfile.primaryStyles.length > 3
    ? "Geen uitgesproken afzonderlijke basisstijl"
    : styleProfile.sharedPrimary
      ? `Gedeelde basisstijl: ${styleProfile.primaryStyles.map(item => item.categoryLabel).join(" en ")}`
      : `${top.categoryLabel} als basisstijl`;

  return {
    schemaVersion: LEADERSHIP_SCHEMA_VERSION,
    contentVersion: LEADERSHIP_CONTENT_VERSION,
    scoringVersion: LEADERSHIP_SCORING_VERSION,
    testId,
    testTitle: "Leiderschapstest",
    resultType: "leadership-profile",
    startedAt: normalized.startedAt,
    completedAt,
    mainScoreHeading: "Situationele flexibiliteit",
    mainScoreDisplay: situational.flexibilityLabel,
    mainLabel,
    headline,
    summary: getLeadershipSummary(situational, styleProfile, uniformPattern),
    dimensions: situational.distributions.map(item => ({
      id: item.id,
      label: item.title,
      score: item.displayPercentage,
      description: item.description
    })),
    strengths: [],
    development: [],
    meaning: "",
    advice: "",
    situational,
    styleProfile,
    overallAdvice: getLeadershipOverallAdvice(situational, styleProfile),
    uniformPattern,
    answers: { ...normalized.answers },
    answerMeta: { ...normalized.answerMeta }
  };
}
