"use strict";

const WORK_VALUES_HIGH_THRESHOLD = 70;
const WORK_VALUES_PROFILE_THRESHOLD = 58;

function clampWorkValue(value, minimum = 0, maximum = 100) {
  return Math.max(minimum, Math.min(maximum, value));
}

function scoreWorkValuesResponse(answer) {
  const value = Number(answer);
  if (!Number.isInteger(value) || value < 1 || value > 5) return null;
  return ((value - 1) / 4) * 100;
}

function averageWorkValues(scores) {
  const valid = scores.filter(Number.isFinite);
  if (valid.length === 0) return 0;
  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
}

function classifyWorkValueMatrix(motivatorScore, sensitivityScore) {
  const highMotivator = motivatorScore >= WORK_VALUES_HIGH_THRESHOLD;
  const highSensitivity = sensitivityScore >= WORK_VALUES_HIGH_THRESHOLD;

  if (highMotivator && highSensitivity) return "core";
  if (highMotivator) return "extra";
  if (highSensitivity) return "minimum";
  return "lower";
}

function calculateWorkValuesResult({ session, testId }) {
  const questions = window.WORK_VALUES_QUESTIONS || [];
  const dimensions = window.WORK_VALUES_DIMENSIONS || [];

  const dimensionResults = dimensions.map(dimension => {
    const dimensionQuestions = questions.filter(question => question.dimension === dimension.id);
    const scoredItems = dimensionQuestions.map(question => ({
      ...question,
      score: scoreWorkValuesResponse(session.answers?.[question.id])
    }));

    const valueScores = scoredItems.filter(item => item.facet === "value").map(item => item.score);
    const motivatorScores = scoredItems.filter(item => item.facet === "motivator").map(item => item.score);
    const demotivatorScores = scoredItems.filter(item => item.facet === "demotivator").map(item => item.score);

    const workValueScore = averageWorkValues(valueScores);
    const motivatorScore = averageWorkValues(motivatorScores);
    const demotivatorSensitivity = averageWorkValues(demotivatorScores);
    const totalScore = averageWorkValues(scoredItems.map(item => item.score));
    const matrixType = classifyWorkValueMatrix(motivatorScore, demotivatorSensitivity);

    return {
      ...dimension,
      workValueScore,
      motivatorScore,
      demotivatorSensitivity,
      totalScore,
      matrixType,
      matrixLabel: window.WORK_VALUES_MATRIX_LABELS?.[matrixType]?.title || "Profielwaarde",
      matrixDescription: window.WORK_VALUES_MATRIX_LABELS?.[matrixType]?.description || ""
    };
  });

  const ranking = [...dimensionResults].sort((a, b) =>
    b.totalScore - a.totalScore ||
    b.workValueScore - a.workValueScore ||
    a.title.localeCompare(b.title, "nl-BE")
  );

  const profileSpread = ranking.length > 1
    ? ranking[0].totalScore - ranking[ranking.length - 1].totalScore
    : 0;
  const hasClearDifferences = profileSpread >= 10;
  const topDimensions = hasClearDifferences
    ? ranking.slice(0, 3)
    : [];
  const minimumNeeds = [...dimensionResults]
    .filter(item => item.demotivatorSensitivity >= WORK_VALUES_HIGH_THRESHOLD)
    .sort((a, b) => b.demotivatorSensitivity - a.demotivatorSensitivity)
    .slice(0, 6);
  const extraMotivators = [...dimensionResults]
    .filter(item => item.motivatorScore >= WORK_VALUES_HIGH_THRESHOLD)
    .sort((a, b) => b.motivatorScore - a.motivatorScore)
    .slice(0, 6);

  const tensions = (window.WORK_VALUES_TENSIONS || [])
    .map(tension => {
      const first = dimensionResults.find(item => item.id === tension.ids[0]);
      const second = dimensionResults.find(item => item.id === tension.ids[1]);
      if (!first || !second) return null;
      const relevance = Math.min(first.totalScore, second.totalScore);
      return relevance >= WORK_VALUES_PROFILE_THRESHOLD
        ? { ...tension, relevance }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);

  const contextDimensions = ranking
    .filter(item => item.totalScore >= WORK_VALUES_PROFILE_THRESHOLD)
    .slice(0, 5);

  const vacancyQuestions = [];
  [...topDimensions, ...minimumNeeds].forEach(item => {
    if (item?.vacancyQuestion && !vacancyQuestions.includes(item.vacancyQuestion)) {
      vacancyQuestions.push(item.vacancyQuestion);
    }
  });

  const mainDisplay = hasClearDifferences
    ? topDimensions.map(item => item.short).join(" · ")
    : "Evenwichtig profiel";
  const summary = hasClearDifferences && topDimensions.length === 3
    ? `Je profiel wordt vooral gekenmerkt door ${topDimensions[0].title.toLowerCase()}, ${topDimensions[1].title.toLowerCase()} en ${topDimensions[2].title.toLowerCase()}.`
    : "Je scores liggen dicht bij elkaar. Er is daarom geen kunstmatig scherpe topdrie opgelegd.";

  return {
    schemaVersion: 2,
    testId,
    testTitle: "Werkwaarden- en werkmotivatietest",
    completedAt: new Date().toISOString(),
    resultType: "work-values-motivation-profile",
    mainScoreDisplay: mainDisplay,
    mainScoreHeading: "Jouw belangrijkste werkdrijfveren",
    mainLabel: "wat je in werk zoekt, waardeert en nodig hebt",
    summary,
    dimensions: dimensionResults.map(item => ({
      id: item.id,
      label: item.title,
      score: item.totalScore,
      description: item.description
    })),
    dimensionResults,
    profileSpread,
    hasClearDifferences,
    topDimensions,
    minimumNeeds,
    extraMotivators,
    tensions,
    contextDimensions,
    vacancyQuestions: vacancyQuestions.slice(0, 7),
    strengths: topDimensions.map(item => `${item.title}: je zoekt vooral ${item.seeks}.`),
    development: [],
    meaning: "Iedere dimensie is gemeten met vijf korte stellingen: twee over wat je belangrijk vindt, één over wat je motiveert en twee over wat je kan demotiveren.",
    advice: "Gebruik dit profiel om functies en werkgevers te vergelijken op dagelijkse werkkenmerken, afspraken en verantwoordelijkheden."
  };
}
