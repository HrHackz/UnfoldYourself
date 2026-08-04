"use strict";

function wwClamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function getWwDimensionBand(dimension, score) {
  const safeScore = wwClamp(score);
  if (dimension.direction === "negative") {
    if (safeScore <= 24) return { id: "low", label: "Lage druk", tone: "positive" };
    if (safeScore <= 44) return { id: "limited", label: "Beperkte druk", tone: "positive" };
    if (safeScore <= 59) return { id: "raised", label: "Regelmatig verhoogde druk", tone: "watch" };
    if (safeScore <= 79) return { id: "high", label: "Hoge druk", tone: "risk" };
    return { id: "very-high", label: "Zeer hoge druk", tone: "risk" };
  }

  if (safeScore <= 24) return { id: "very-limited", label: "Zeer beperkt beschikbaar", tone: "risk" };
  if (safeScore <= 44) return { id: "limited", label: "Beperkt beschikbaar", tone: "risk" };
  if (safeScore <= 59) return { id: "mixed", label: "Wisselend aanwezig", tone: "watch" };
  if (safeScore <= 79) return { id: "strong", label: "Sterk aanwezig", tone: "positive" };
  return { id: "very-strong", label: "Zeer sterk aanwezig", tone: "positive" };
}

function getWwBalanceBand(score) {
  const safeScore = wwClamp(score);
  if (safeScore <= 29) return { id: "strongly-unbalanced", label: "Sterk uit balans", tone: "risk" };
  if (safeScore <= 44) return { id: "vulnerable", label: "Kwetsbare balans", tone: "risk" };
  if (safeScore <= 59) return { id: "mixed", label: "Gemengde balans", tone: "watch" };
  if (safeScore <= 74) return { id: "mostly-favorable", label: "Overwegend gunstige balans", tone: "positive" };
  return { id: "strong", label: "Sterke werkbelevingsbalans", tone: "positive" };
}

function getWwInterpretation(profile, score) {
  if (profile.direction === "negative") {
    if (score <= 44) return profile.favorable;
    if (score <= 59) return profile.middle;
    return profile.unfavorable;
  }
  if (score >= 60) return profile.favorable;
  if (score >= 45) return profile.middle;
  return profile.unfavorable;
}

function calculateWwDimensionScores(answers) {
  const profiles = window.WORK_WELLBEING_DIMENSIONS || [];
  const questions = (window.WORK_WELLBEING_QUESTIONS || []).filter(question => question.type === "frequency");

  return profiles.map(profile => {
    const items = questions.filter(question => question.dimensionId === profile.id);
    const rawScore = items.reduce((sum, question) => {
      const rawValue = Number(answers[question.id]);
      const codedValue = question.reverse ? 4 - rawValue : rawValue;
      return sum + codedValue;
    }, 0);
    const exactScore = (rawScore / 12) * 100;
    const score = Math.round(exactScore);
    const band = getWwDimensionBand(profile, score);
    return {
      ...profile,
      itemCount: items.length,
      rawScore,
      maxScore: 12,
      exactScore: Math.round(exactScore * 10) / 10,
      score,
      band,
      interpretation: getWwInterpretation(profile, score)
    };
  });
}

function detectWwResponseQuality(session) {
  const answers = session?.answers || {};
  const questions = (window.WORK_WELLBEING_QUESTIONS || []).filter(question => question.type === "frequency");
  const values = questions.map(question => Number(answers[question.id])).filter(Number.isFinite);
  const messages = [];

  const frequencies = values.reduce((map, value) => {
    map[value] = (map[value] || 0) + 1;
    return map;
  }, {});
  const dominantCount = values.length ? Math.max(...Object.values(frequencies)) : 0;
  const lowVariation = dominantCount >= 27;
  if (lowVariation) {
    messages.push("Je hebt vrijwel alle vragen op dezelfde manier beantwoord. Daardoor zijn de verschillen tussen de dimensies beperkt. Bekijk het resultaat vooral als een globaal beeld.");
  }

  const startedAt = Date.parse(session?.startedAt || "");
  const completedAt = Date.now();
  const elapsedSeconds = Number.isFinite(startedAt) ? Math.max(0, Math.round((completedAt - startedAt) / 1000)) : null;
  const veryFast = Number.isFinite(elapsedSeconds) && elapsedSeconds < 75;
  if (veryFast) {
    messages.push("De test werd zeer snel ingevuld. Het resultaat kan daardoor minder zorgvuldig aansluiten op je ervaringen van de afgelopen vier weken.");
  }

  const contradictionPairs = [
    ["WW-RECOVERY-01", "WW-RECOVERY-03"],
    ["WW-BALANCE-02", "WW-BALANCE-01"],
    ["WW-BALANCE-02", "WW-BALANCE-03"],
    ["WW-SAFETY-02", "WW-SAFETY-03"]
  ];
  const contradictionCount = contradictionPairs.filter(([positiveId, negativeId]) => {
    return Number(answers[positiveId]) >= 3 && Number(answers[negativeId]) >= 3;
  }).length;
  if (contradictionCount >= 2) {
    messages.push("Enkele antwoorden lijken inhoudelijk uiteen te lopen. Dat kan betekenen dat je ervaring sterk per situatie verschilt. Lees de dimensieteksten daarom met aandacht voor context.");
  }

  if ((Number(session?.statusChanges) || 0) >= 2) {
    messages.push("Je wijzigde je gekozen statuut meerdere keren. De uiteindelijke formuleringen en interpretaties zijn gebaseerd op je laatst gekozen situatie.");
  }

  return {
    complete: values.length === 30,
    lowVariation,
    dominantCount,
    veryFast,
    elapsedSeconds,
    contradictionCount,
    statusChanges: Number(session?.statusChanges) || 0,
    messages
  };
}

function findWwCombinationRules(scores) {
  return (window.WORK_WELLBEING_COMBINATION_RULES || [])
    .filter(rule => {
      try {
        return Boolean(rule.condition(scores));
      } catch {
        return false;
      }
    })
    .sort((left, right) => (right.priority || 0) - (left.priority || 0));
}

function buildWwHeadline(balanceBand, primaryRule, strongestResource, mainAttention) {
  if (primaryRule?.tone === "risk") return primaryRule.title;
  if (balanceBand.tone === "risk") return "Je huidige werkbelevingsbalans vraagt duidelijke aandacht";
  if (primaryRule) return primaryRule.title;
  if (strongestResource && mainAttention) {
    return `${strongestResource.label} ondersteunt je, terwijl ${mainAttention.label.toLowerCase()} meer aandacht vraagt`;
  }
  return balanceBand.label;
}

function buildWwSummary(statusContext, balanceBand, strongestResource, mainAttention, primaryRule) {
  const parts = [`Voor ${statusContext.situation} ontstaat momenteel een ${balanceBand.label.toLowerCase()}.`];
  if (strongestResource) {
    parts.push(`${strongestResource.label} komt als een van je duidelijkste ondersteunende factoren naar voren.`);
  }
  if (mainAttention) {
    if (mainAttention.id === "pressure") parts.push(`${mainAttention.band.label} is het belangrijkste belastingssignaal in je profiel.`);
    else parts.push(`${mainAttention.label} is momenteel relatief beperkt beschikbaar en verdient daarom extra aandacht.`);
  }
  if (primaryRule) parts.push(primaryRule.text);
  return parts.join(" ");
}

function calculateWorkWellbeingResult({ session, testId }) {
  const answers = session?.answers || {};
  const statusId = answers["WW-STATUS"];
  const status = (window.WORK_WELLBEING_STATUSES || []).find(item => item.id === statusId);
  const statusContext = window.WORK_WELLBEING_STATUS_CONTEXT?.[statusId];
  const frequencyQuestions = (window.WORK_WELLBEING_QUESTIONS || []).filter(question => question.type === "frequency");

  if (!status || !statusContext) return null;
  if (frequencyQuestions.some(question => !Object.prototype.hasOwnProperty.call(answers, question.id))) return null;

  const dimensions = calculateWwDimensionScores(answers);
  const scores = Object.fromEntries(dimensions.map(dimension => [dimension.id, dimension.score]));
  const favorableScores = dimensions.map(dimension => dimension.id === "pressure" ? 100 - dimension.score : dimension.score);
  const balanceExact = favorableScores.reduce((sum, score) => sum + score, 0) / favorableScores.length;
  const balanceScore = Math.round(balanceExact);
  const balanceBand = getWwBalanceBand(balanceScore);

  const resourceIds = new Set(["autonomy", "support", "clarity", "fairness", "safety"]);
  const resourceDimensions = dimensions.filter(dimension => resourceIds.has(dimension.id));
  const strongestResource = [...resourceDimensions].sort((left, right) => right.score - left.score)[0] || null;

  const pressure = dimensions.find(dimension => dimension.id === "pressure");
  const positiveDimensions = dimensions.filter(dimension => dimension.id !== "pressure");
  const lowestPositive = [...positiveDimensions].sort((left, right) => left.score - right.score)[0] || null;
  const mainAttention = pressure?.score >= 60 ? pressure : (lowestPositive?.score <= 59 ? lowestPositive : null);

  const combinations = findWwCombinationRules(scores);
  const primaryRule = combinations[0] || null;
  const responseQuality = detectWwResponseQuality(session);
  const completedAt = new Date().toISOString();

  return {
    schemaVersion: 1,
    testId,
    testTitle: "Werkbelevings- en welzijnstest",
    completedAt,
    statusId,
    status,
    statusContext,
    headline: buildWwHeadline(balanceBand, primaryRule, strongestResource, mainAttention),
    summary: buildWwSummary(statusContext, balanceBand, strongestResource, mainAttention, primaryRule),
    mainScore: balanceScore,
    mainScoreExact: Math.round(balanceExact * 10) / 10,
    mainScoreHeading: "Samenvattende werkbelevingsbalans",
    mainLabel: balanceBand.label,
    dimensions: [],
    dimensionResults: dimensions,
    scores,
    balanceScore,
    balanceBand,
    strongestResource,
    mainAttention,
    combinations,
    primaryRule,
    responseQuality,
    strengths: [],
    development: [],
    meaning: "",
    advice: ""
  };
}
