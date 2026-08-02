"use strict";

const WORK_VALUES_HIGH_THRESHOLD = 67;
const WORK_VALUES_PROFILE_THRESHOLD = 55;

function clampWorkValue(value, minimum = 0, maximum = 100) {
  return Math.max(minimum, Math.min(maximum, value));
}

function roundWorkValue(value) {
  return Math.round(clampWorkValue(value));
}

function getWorkValueImpactScore(answer) {
  return roundWorkValue(((Number(answer) + 3) / 6) * 100);
}

function getWorkValueDemotivatorSensitivity(answer) {
  return roundWorkValue(((3 - Number(answer)) / 6) * 100);
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
  const dimensionMap = Object.fromEntries(
    (window.WORK_VALUES_DIMENSIONS || []).map(dimension => [
      dimension.id,
      {
        ...dimension,
        priorityPoints: 0,
        motivatorAnswer: null,
        demotivatorAnswer: null
      }
    ])
  );

  (window.WORK_VALUES_ALLOCATION_QUESTIONS || []).forEach(question => {
    const answer = session.answers?.[question.id] || {};

    question.items.forEach(item => {
      const value = Number(answer[item.dimension]);
      if (Number.isFinite(value)) {
        dimensionMap[item.dimension].priorityPoints += value;
      }
    });
  });

  (window.WORK_VALUES_IMPACT_QUESTIONS || []).forEach(question => {
    const answer = session.answers?.[question.id];
    if (!Number.isFinite(Number(answer))) return;

    if (question.polarity === "motivator") {
      dimensionMap[question.dimension].motivatorAnswer = Number(answer);
    } else {
      dimensionMap[question.dimension].demotivatorAnswer = Number(answer);
    }
  });

  const dimensionResults = (window.WORK_VALUES_DIMENSIONS || []).map(dimension => {
    const values = dimensionMap[dimension.id];
    const priorityScore = roundWorkValue((values.priorityPoints / 30) * 100);
    const motivatorScore = getWorkValueImpactScore(values.motivatorAnswer);
    const demotivatorSensitivity = getWorkValueDemotivatorSensitivity(values.demotivatorAnswer);
    const totalScore = roundWorkValue(
      0.60 * priorityScore +
      0.20 * motivatorScore +
      0.20 * demotivatorSensitivity
    );
    const matrixType = classifyWorkValueMatrix(
      motivatorScore,
      demotivatorSensitivity
    );

    return {
      id: dimension.id,
      title: dimension.title,
      short: dimension.short,
      description: dimension.description,
      seeks: dimension.seeks,
      supports: dimension.supports,
      risk: dimension.risk,
      vacancyQuestion: dimension.vacancyQuestion,
      priorityPoints: values.priorityPoints,
      priorityScore,
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
    b.priorityScore - a.priorityScore ||
    a.title.localeCompare(b.title, "nl-BE")
  );

  const topDimensions = ranking.slice(0, 3);
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
      const [firstId, secondId] = tension.ids;
      const first = dimensionResults.find(item => item.id === firstId);
      const second = dimensionResults.find(item => item.id === secondId);
      if (!first || !second) return null;
      const relevance = Math.min(first.totalScore, second.totalScore);
      if (relevance < WORK_VALUES_PROFILE_THRESHOLD) return null;
      return {
        ...tension,
        relevance,
        dimensions: [first.title, second.title]
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);

  const contextDimensions = ranking
    .filter(item => item.totalScore >= WORK_VALUES_PROFILE_THRESHOLD)
    .slice(0, 5);

  const vacancyQuestions = [];
  [...topDimensions, ...minimumNeeds].forEach(item => {
    if (
      item?.vacancyQuestion &&
      !vacancyQuestions.includes(item.vacancyQuestion)
    ) {
      vacancyQuestions.push(item.vacancyQuestion);
    }
  });

  const mainDisplay = topDimensions.map(item => item.short).join(" · ");
  const summary = topDimensions.length === 3
    ? `Je werkwaardenprofiel wordt vooral gekenmerkt door ${topDimensions[0].title.toLowerCase()}, ${topDimensions[1].title.toLowerCase()} en ${topDimensions[2].title.toLowerCase()}.`
    : "Je werkwaardenprofiel is berekend.";

  return {
    schemaVersion: 1,
    testId,
    testTitle: "Werkwaarden- en werkmotivatietest",
    completedAt: new Date().toISOString(),
    resultType: "work-values-motivation-profile",
    mainScoreDisplay: mainDisplay,
    mainScoreHeading: "Jouw belangrijkste werkdrijfveren",
    mainLabel: "wat je in werk zoekt en nodig hebt",
    summary,
    dimensions: dimensionResults.map(item => ({
      id: item.id,
      label: item.title,
      score: item.totalScore,
      description: item.description
    })),
    dimensionResults,
    topDimensions,
    minimumNeeds,
    extraMotivators,
    tensions,
    contextDimensions,
    vacancyQuestions: vacancyQuestions.slice(0, 7),
    strengths: topDimensions.map(item =>
      `${item.title}: je zoekt vooral ${item.seeks}.`
    ),
    development: [],
    meaning: "De totaalscore combineert je relatieve prioriteiten met situaties die je waarschijnlijk motiveren of juist demotiveren. De drie deelscores blijven afzonderlijk zichtbaar in het rapport.",
    advice: "Gebruik dit profiel om functies en werkgevers gerichter te vergelijken. Let daarbij niet alleen op functietitels, maar vooral op werkafspraken, verantwoordelijkheden, samenwerking en dagelijkse werkomstandigheden."
  };
}
