"use strict";

/* Unfold Yourself — scoring Deelidentiteiten- en kruispuntdenken v2. */

function getIdentityIntersectionalityChoiceSet(question) {
  const sets = window.IDENTITY_INTERSECTIONALITY_CHOICE_SETS || {};
  return Array.isArray(sets[question?.choiceSet]) ? sets[question.choiceSet] : [];
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
    summary: "Je positie vraagt verdere context."
  };
}

function clampIdentityScore(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function getIdentityAnswerScore(question, answerValue) {
  const choices = getIdentityIntersectionalityChoiceSet(question);

  if (Array.isArray(answerValue)) {
    const selected = answerValue
      .map(value => choices.find(choice => answerValuesEqual(choice.value, value)))
      .filter(Boolean)
      .filter(choice => typeof choice.score === "number");

    if (selected.length === 0) {
      return null;
    }

    if (question.axisId === "nationality") {
      return Math.max(...selected.map(choice => choice.score));
    }

    return selected.reduce((sum, choice) => sum + choice.score, 0) / selected.length;
  }

  const choice = getIdentityIntersectionalityChoice(question, answerValue);
  return choice && typeof choice.score === "number" ? choice.score : null;
}

function getIdentityAnswerLabels(question, answerValue) {
  const choices = getIdentityIntersectionalityChoiceSet(question);
  const values = Array.isArray(answerValue) ? answerValue : [answerValue];

  return values
    .map(value => choices.find(choice => answerValuesEqual(choice.value, value)))
    .filter(Boolean)
    .map(choice => choice.label);
}

function calculateIdentityIntersectionalityAxis(axis, definition, session) {
  const questions = definition.questions.filter(question => question.axisId === axis.id);
  let weightedSum = 0;
  let weightTotal = 0;
  const answers = [];

  questions.forEach(question => {
    const rawValue = session.answers[question.id];
    const score = getIdentityAnswerScore(question, rawValue);
    const labels = getIdentityAnswerLabels(question, rawValue);

    answers.push({
      questionId: question.id,
      question: question.text,
      labels,
      score
    });

    if (typeof score !== "number") {
      return;
    }

    const weight = Number(question.weight || 0);
    weightedSum += score * weight;
    weightTotal += weight;
  });

  const score = weightTotal > 0
    ? clampIdentityScore(weightedSum / weightTotal)
    : null;

  const band = score === null
    ? {
        id: "missing",
        label: "Geen positie",
        summary: "Er zijn onvoldoende antwoorden om deze as te plaatsen."
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
    answers
  };
}

function calculateIdentityIntersectionalityResult({ definition, session, testId }) {
  if (!definition || !session) {
    return null;
  }

  const allQuestionsAnswered = definition.questions.every(question => {
    const answer = session.answers[question.id];
    return typeof definition.isAnswerValid === "function"
      ? definition.isAnswerValid(question, answer)
      : Object.prototype.hasOwnProperty.call(session.answers, question.id);
  });

  if (!allQuestionsAnswered) {
    return null;
  }

  const axes = window.IDENTITY_INTERSECTIONALITY_AXES || [];
  const axisResults = axes.map(axis => {
    return calculateIdentityIntersectionalityAxis(axis, definition, session);
  });

  const intersections = typeof detectIdentityIntersections === "function"
    ? detectIdentityIntersections(axisResults)
    : [];

  return {
    schemaVersion: 2,
    testId,
    testTitle: definition.title,
    resultType: "identity-intersectionality-profile",
    completedAt: new Date().toISOString(),
    mainScoreDisplay: "14 assen",
    mainLabel: "Jouw maatschappelijke positie per as",
    mainScoreHeading: "Jouw identiteitslandschap",
    summary: "Bekijk waar je per as relatief meer structurele barrières of meer structurele voordelen ervaart binnen de Belgische context.",
    dimensions: [],
    axisResults,
    intersections,
    strengths: axisResults
      .filter(axis => typeof axis.score === "number" && axis.score >= 80)
      .slice(0, 3)
      .map(axis => `${axis.shortLabel}: ${axis.bandLabel.toLowerCase()}.`),
    development: axisResults
      .filter(axis => typeof axis.score === "number" && axis.score <= 39)
      .slice(0, 3)
      .map(axis => `${axis.shortLabel}: deze as kan extra drempels veroorzaken.`),
    meaning: "De stip op iedere as wordt intern berekend uit drie antwoorden. Het percentage blijft verborgen en wordt niet opgeteld tot één algemene privilegescore.",
    advice: "Gebruik de uitkomst als bewustwording: erken waar systemen je helpen en waar ze extra inspanning, aanpassing of steun vragen."
  };
}
