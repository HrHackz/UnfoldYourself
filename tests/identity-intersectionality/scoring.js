"use strict";

/*
  Unfold Yourself — scoring voor Deelidentiteiten- en kruispuntdenken.
  Afhankelijkheden: data/identity-intersectionality/questions.js en interpretations.js.
*/

function getIdentityIntersectionalityChoiceSet(question) {
  const sets = window.IDENTITY_INTERSECTIONALITY_CHOICE_SETS || {};
  return Array.isArray(sets[question?.choiceSet])
    ? sets[question.choiceSet]
    : [];
}

function getIdentityIntersectionalityChoice(question, answerValue) {
  return getIdentityIntersectionalityChoiceSet(question).find(choice => {
    return answerValuesEqual(choice.value, answerValue);
  }) || null;
}

function getIdentityIntersectionalityBand(score) {
  const bands = window.IDENTITY_INTERSECTIONALITY_CONTENT?.bands || [];
  return bands.find(band => Number(score) <= Number(band.max)) || bands[bands.length - 1] || {
    id: "mixed",
    label: "Gemengde positie",
    summary: "De score vraagt contextuele interpretatie."
  };
}

function roundIdentityIntersectionalityScore(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function calculateIdentityIntersectionalityAxis(axis, definition, session) {
  const questions = definition.questions.filter(question => question.axisId === axis.id);
  const components = {};
  let weightedSum = 0;
  let weightTotal = 0;
  let answeredCount = 0;
  let positionLabel = "Niet ingevuld";

  questions.forEach(question => {
    const choice = getIdentityIntersectionalityChoice(
      question,
      session.answers[question.id]
    );

    const score = choice && typeof choice.score === "number"
      ? choice.score
      : null;

    components[question.questionType] = score;

    if (question.questionType === "position" && choice) {
      positionLabel = choice.label;
    }

    if (score === null) {
      return;
    }

    weightedSum += score * Number(question.weight || 0);
    weightTotal += Number(question.weight || 0);
    answeredCount += 1;
  });

  const score = weightTotal > 0
    ? roundIdentityIntersectionalityScore(weightedSum / weightTotal)
    : null;

  const band = score === null
    ? {
        id: "insufficient",
        label: "Onvoldoende informatie",
        summary: "Je koos op deze as onvoldoende antwoorden om een reflectie-index te berekenen."
      }
    : getIdentityIntersectionalityBand(score);

  return {
    id: axis.id,
    label: axis.label,
    shortLabel: axis.shortLabel,
    description: axis.description,
    score,
    bandId: band.id,
    bandLabel: band.label,
    interpretation: band.summary,
    positionLabel,
    components,
    answeredCount,
    questionCount: questions.length
  };
}

function calculateIdentityIntersectionalityResult({ definition, session, testId }) {
  if (!definition || !session) {
    return null;
  }

  const axes = window.IDENTITY_INTERSECTIONALITY_AXES || [];

  const allQuestionsAnswered = definition.questions.every(question => {
    return Object.prototype.hasOwnProperty.call(session.answers, question.id);
  });

  if (!allQuestionsAnswered) {
    return null;
  }

  const axisResults = axes.map(axis => {
    return calculateIdentityIntersectionalityAxis(axis, definition, session);
  });

  const scoredAxes = axisResults.filter(axis => typeof axis.score === "number");
  const accessAxes = [...scoredAxes]
    .filter(axis => axis.score >= 65)
    .sort((first, second) => second.score - first.score);
  const barrierAxes = [...scoredAxes]
    .filter(axis => axis.score <= 49)
    .sort((first, second) => first.score - second.score);
  const mixedAxes = [...scoredAxes]
    .filter(axis => axis.score >= 50 && axis.score < 65)
    .sort((first, second) => first.score - second.score);

  const intersections = typeof detectIdentityIntersections === "function"
    ? detectIdentityIntersections(axisResults)
    : [];

  const axisAdvice = typeof buildIdentityAxisAdvice === "function"
    ? buildIdentityAxisAdvice(axisResults)
    : [];

  const summaryParts = [
    `${scoredAxes.length} van de 14 assen konden worden berekend.`,
    accessAxes.length > 0
      ? `${accessAxes.length} assen tonen relatief meer structurele toegang.`
      : "Geen as werd als sterke structurele toegang samengevat.",
    barrierAxes.length > 0
      ? `${barrierAxes.length} assen vragen extra aandacht voor mogelijke barrières.`
      : "Geen as kwam in de sterkste barrièrezone terecht."
  ];

  return {
    testId,
    testTitle: definition.title,
    resultType: "identity-intersectionality-profile",
    completedAt: new Date().toISOString(),
    mainScoreDisplay: "14 assen",
    mainLabel: "Geen totaalscore — iedere as blijft afzonderlijk zichtbaar",
    mainScoreHeading: "Jouw identiteitslandschap",
    summary: summaryParts.join(" "),
    dimensions: [],
    axisResults,
    intersections,
    axisAdvice,
    accessAxes: accessAxes.map(axis => axis.id),
    barrierAxes: barrierAxes.map(axis => axis.id),
    mixedAxes: mixedAxes.map(axis => axis.id),
    strengths: accessAxes.slice(0, 3).map(axis => {
      return `${axis.shortLabel}: ${axis.bandLabel.toLowerCase()}.`;
    }),
    development: barrierAxes.slice(0, 3).map(axis => {
      return `${axis.shortLabel}: erken de mogelijke structurele drempels en bepaal welke steun of aanpassing praktisch helpt.`;
    }),
    meaning:
      "De balken geven per as een transparante reflectie-index op basis van je maatschappelijke positie, ervaren toegang en gemelde barrières. Ze zijn geen percentielen en worden niet opgeteld tot één privilegescore.",
    advice:
      "Gebruik de resultaten om onderscheid te maken tussen persoonlijke keuzes en omstandigheden die door systemen, instellingen of sociale normen worden beïnvloed. Op assen met veel toegang ligt een kans voor bewust allyship; op assen met meer barrières ligt de focus op erkenning, grenzen, steun en praktische risicoreductie.",
    methodology: {
      itemCount: definition.questions.length,
      axisCount: axes.length,
      weights: {
        position: 0.4,
        access: 0.3,
        barrier: 0.3
      },
      defaultRegion: "belgium",
      lastReviewed: window.IDENTITY_INTERSECTIONALITY_METADATA?.lastReviewed || null
    }
  };
}
