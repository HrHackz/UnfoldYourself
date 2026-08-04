"use strict";

function clampWecValue(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function getWecCultureQuestions() {
  return (window.WEC_QUESTIONS || []).filter(question => question.type === "culture-distribution");
}

function getWecEnvironmentQuestion(axisId) {
  return (window.WEC_QUESTIONS || []).find(question => question.axisId === axisId);
}

function isValidWecCultureAnswer(answer) {
  if (!answer || answer.touched !== true || typeof answer.points !== "object") return false;
  const values = (window.WEC_CULTURE_ORDER || []).map(id => Number(answer.points[id]));
  return values.every(value => Number.isFinite(value) && value >= 0 && value <= 100 && value % 5 === 0) &&
    values.reduce((sum, value) => sum + value, 0) === 100;
}

function isValidWecSliderAnswer(answer) {
  return Boolean(answer && answer.touched === true && Number.isFinite(Number(answer.value)) && Number(answer.value) >= 0 && Number(answer.value) <= 100);
}

function isValidWecChoiceAnswer(question, answer) {
  return Array.isArray(question?.options) && question.options.some(option => option.id === answer);
}

function isValidWecAnswer(question, answer) {
  if (!question) return false;
  if (question.type === "culture-distribution") return isValidWecCultureAnswer(answer);
  if (question.type === "bipolar-slider") return isValidWecSliderAnswer(answer);
  if (question.type === "visual-cards" || question.type === "choice-cards") return isValidWecChoiceAnswer(question, answer);
  return false;
}

function roundWecPercentagesToHundred(exactScores) {
  const entries = Object.entries(exactScores).map(([id, score], index) => {
    const safeScore = Math.max(0, Number(score) || 0);
    const floor = Math.floor(safeScore);
    return { id, index, exact: safeScore, floor, remainder: safeScore - floor };
  });
  let remaining = 100 - entries.reduce((sum, item) => sum + item.floor, 0);
  entries
    .slice()
    .sort((left, right) => right.remainder - left.remainder || left.index - right.index)
    .forEach(item => {
      if (remaining > 0) {
        const original = entries.find(entry => entry.id === item.id);
        original.floor += 1;
        remaining -= 1;
      }
    });
  return Object.fromEntries(entries.map(item => [item.id, item.floor]));
}

function rankWecCultures(cultures) {
  const order = new Map((window.WEC_CULTURE_ORDER || []).map((id, index) => [id, index]));
  const sorted = [...cultures].sort((left, right) => {
    if (right.exactScore !== left.exactScore) return right.exactScore - left.exactScore;
    return (order.get(left.id) || 0) - (order.get(right.id) || 0);
  });
  let previousScore = null;
  let previousRank = 0;
  sorted.forEach((culture, index) => {
    const comparable = Math.round(culture.exactScore * 1000) / 1000;
    if (comparable === previousScore) {
      culture.rank = previousRank;
    } else {
      culture.rank = index + 1;
      previousRank = culture.rank;
      previousScore = comparable;
    }
  });
  return sorted;
}

function getWecCultureProfileMode(rankedCultures) {
  const highest = rankedCultures[0]?.exactScore || 0;
  const second = rankedCultures[1]?.exactScore || 0;
  const lowest = rankedCultures.at(-1)?.exactScore || 0;
  const topDifference = highest - second;
  const spread = highest - lowest;

  if (spread <= 8) return { id: "broad", label: "Breed cultuurprofiel" };
  if (topDifference <= 2) return { id: "shared", label: "Gedeelde primaire voorkeur" };
  if (topDifference <= 8) return { id: "mixed", label: "Gemengd profiel" };
  return { id: "clear", label: "Duidelijke primaire voorkeur" };
}

function getWecSliderSide(value) {
  const score = clampWecValue(value);
  if (score <= 35) return "left";
  if (score >= 66) return "right";
  return "middle";
}

function getWecSliderIntensity(value) {
  const score = clampWecValue(value);
  if (score <= 15 || score >= 85) return "zeer duidelijk";
  if (score <= 35 || score >= 66) return "duidelijk";
  return "flexibel";
}

function buildWecEnvironmentResult(axisId, answer) {
  const profiles = window.WEC_ENVIRONMENT_PROFILES?.[axisId];
  const value = clampWecValue(answer?.value);
  const side = getWecSliderSide(value);
  const profile = profiles?.[side] || {};
  return {
    axisId,
    value,
    side,
    intensity: getWecSliderIntensity(value),
    ...profile
  };
}

function getWecPairKey(firstId, secondId) {
  return [String(firstId), String(secondId)].sort().join("|");
}

function getWecCombination(rankedCultures, mode) {
  if (mode.id === "broad") {
    return {
      title: "Je kunt waarschijnlijk tussen verschillende culturen schakelen",
      text: "Je scores liggen relatief dicht bij elkaar. Daardoor lijk je minder afhankelijk van één uitgesproken cultuurtype. De concrete functie, leidinggevende, collega’s en werkafspraken kunnen voor jou belangrijker zijn dan het algemene cultuurlabel.",
      risk: "Een breed profiel betekent niet dat iedere concrete werkomgeving automatisch passend is. De dagelijkse praktijk blijft doorslaggevend."
    };
  }
  const first = rankedCultures[0];
  const second = rankedCultures[1];
  return window.WEC_CULTURE_COMBINATIONS?.[getWecPairKey(first.id, second.id)] || {
    title: `${first.profile.shortName} en ${second.profile.shortName}`,
    text: `Je voorkeur combineert kenmerken van ${first.profile.name.toLowerCase()} en ${second.profile.name.toLowerCase()}.`,
    risk: "De twee culturen leggen soms andere accenten. De concrete balans bepaalt hoe passend de organisatie werkelijk voelt."
  };
}

function detectWecResponseQuality(session) {
  const questions = getWecCultureQuestions();
  const answers = session?.answers || {};
  const distributions = questions.map(question => {
    const points = answers[question.id]?.points || {};
    return (window.WEC_CULTURE_ORDER || []).map(id => Number(points[id]) || 0);
  });
  const flatCount = distributions.filter(values => values.every(value => value === 25)).length;
  const signatures = distributions.map(values => values.join("-"));
  const frequencyMap = signatures.reduce((map, signature) => {
    map[signature] = (map[signature] || 0) + 1;
    return map;
  }, {});
  const repeatedCount = Math.max(0, ...Object.values(frequencyMap));
  const cultureTimes = questions
    .map(question => session?.answerMeta?.[question.id]?.firstAnsweredAt)
    .filter(Boolean)
    .map(value => new Date(value).getTime())
    .filter(Number.isFinite);
  const rapidSeconds = cultureTimes.length >= 2
    ? Math.round((Math.max(...cultureTimes) - Math.min(...cultureTimes)) / 1000)
    : null;

  return {
    flatProfile: flatCount === questions.length,
    repeatedPattern: repeatedCount >= 5,
    veryFast: Number.isFinite(rapidSeconds) && rapidSeconds < 45,
    flatCount,
    repeatedCount,
    cultureDurationSeconds: rapidSeconds,
    messages: [
      flatCount === questions.length
        ? "Je hebt de vier cultuurbeschrijvingen in alle blokken gelijk beoordeeld. Daardoor ontstaat een breed profiel zonder duidelijke primaire voorkeur."
        : "",
      repeatedCount >= 5 && flatCount !== questions.length
        ? "Je hebt meerdere cultuuronderwerpen op exact dezelfde manier verdeeld. Controleer of jouw voorkeur werkelijk op ieder onderdeel even sterk is."
        : "",
      Number.isFinite(rapidSeconds) && rapidSeconds < 45
        ? "Het cultuurdeel werd zeer snel ingevuld. Daardoor kan het resultaat minder zorgvuldig aansluiten op je werkelijke voorkeuren."
        : ""
    ].filter(Boolean)
  };
}

function buildWecHeadline(rankedCultures, mode) {
  const first = rankedCultures[0];
  const second = rankedCultures[1];
  if (mode.id === "broad") return "Je hebt een breed en relatief evenwichtig cultuurprofiel";
  if (mode.id === "shared") return `Je gedeelde cultuurvoorkeuren zijn ${first.profile.name} en ${second.profile.name}`;
  if (mode.id === "mixed") return `Je zoekt vooral ${first.profile.name.toLowerCase()}, gecombineerd met ${second.profile.name.toLowerCase()}`;
  return `Je sterkste cultuurvoorkeur is ${first.profile.name}`;
}

function buildWecSummary(rankedCultures, mode, environment, frictionCulture) {
  const first = rankedCultures[0];
  const second = rankedCultures[1];
  const scale = environment.scale;
  const location = environment.location;
  const rhythm = environment.rhythm;
  const cultureSentence = mode.id === "broad"
    ? "Je verdeelde je voorkeuren relatief gelijk over samenwerken, vernieuwen, presteren en structureren."
    : mode.id === "shared"
      ? `Je profiel combineert ${first.profile.name.toLowerCase()} en ${second.profile.name.toLowerCase()} vrijwel even sterk.`
      : `Je profiel legt de meeste nadruk op ${first.profile.name.toLowerCase()}, met ${second.profile.name.toLowerCase()} als belangrijke aanvulling.`;
  const environmentSentence = `Je omgevingsvoorkeur wijst op ${scale.badge.toLowerCase()}, ${location.badge.toLowerCase()} en een ${rhythm.badge.replace("Werkritme: ", "").toLowerCase()} werkritme.`;
  const frictionSentence = frictionCulture
    ? `${frictionCulture.profile.name} vraagt volgens je verdeling waarschijnlijk de meeste aanpassing.`
    : "Geen van de vier culturen vormt een duidelijke frictiezone.";
  return `${cultureSentence} ${environmentSentence} ${frictionSentence}`;
}

function buildWecEnergyProfile(rankedCultures, environment, frictionCulture) {
  const givers = [];
  const takers = [];
  rankedCultures.slice(0, 2).forEach(culture => givers.push(culture.profile.energyGiver));
  if (environment.interior?.headline) givers.push(environment.interior.headline);
  if (environment.surroundings?.headline) givers.push(environment.surroundings.headline);
  if (frictionCulture?.profile?.energyTaker) takers.push(frictionCulture.profile.energyTaker);
  if (environment.interior?.risk) takers.push(environment.interior.risk);
  if (environment.scale?.risks?.length) takers.push(environment.scale.risks.slice(0, 2).join(" en "));
  return {
    givers: [...new Set(givers)].slice(0, 3),
    takers: [...new Set(takers)].slice(0, 3)
  };
}

function buildWecChecklist(rankedCultures, frictionCulture, environment) {
  const questions = [];
  const add = value => {
    if (value && !questions.includes(value)) questions.push(value);
  };
  rankedCultures[0]?.profile?.employerQuestions?.slice(0, 2).forEach(add);
  rankedCultures[1]?.profile?.employerQuestions?.slice(0, 1).forEach(add);
  if (frictionCulture) frictionCulture.profile.employerQuestions?.slice(-1).forEach(add);
  const physical = window.WEC_GENERAL_CHECKLIST?.physical || [];
  const rhythm = window.WEC_GENERAL_CHECKLIST?.rhythm || [];
  const scale = window.WEC_GENERAL_CHECKLIST?.scale || [];
  add(environment.interior?.id === "focus" ? physical[1] : physical[0]);
  add(environment.location?.side === "right" ? physical[4] : physical[3]);
  add(environment.rhythm?.id === "hybrid" ? rhythm[1] : environment.rhythm?.id === "remote" ? rhythm[3] : rhythm[0]);
  add(scale[environment.scale?.side === "middle" ? 0 : 1]);
  return questions.slice(0, 8);
}

function calculateWecResult({ session, testId }) {
  const questions = window.WEC_QUESTIONS || [];
  const answers = session?.answers || {};
  if (questions.some(question => !isValidWecAnswer(question, answers[question.id]))) return null;

  const cultureQuestions = getWecCultureQuestions();
  const cultureTotals = Object.fromEntries((window.WEC_CULTURE_ORDER || []).map(id => [id, 0]));
  cultureQuestions.forEach(question => {
    (window.WEC_CULTURE_ORDER || []).forEach(id => {
      cultureTotals[id] += Number(answers[question.id].points[id]) || 0;
    });
  });
  const exactScores = Object.fromEntries(Object.entries(cultureTotals).map(([id, total]) => [id, total / cultureQuestions.length]));
  const displayScores = roundWecPercentagesToHundred(exactScores);
  const cultures = (window.WEC_CULTURE_ORDER || []).map(id => ({
    id,
    exactScore: Math.round(exactScores[id] * 100) / 100,
    displayScore: displayScores[id],
    totalPoints: cultureTotals[id],
    profile: window.WEC_CULTURE_PROFILES[id]
  }));
  const rankedCultures = rankWecCultures(cultures);
  const mode = getWecCultureProfileMode(rankedCultures);
  const lowest = rankedCultures.at(-1);
  const third = rankedCultures[2];
  const clearFriction = lowest.exactScore <= 15 && (third.exactScore - lowest.exactScore) >= 5;
  const frictionCulture = lowest ? { ...lowest, isClearFriction: clearFriction } : null;

  const environment = {
    scale: buildWecEnvironmentResult("scale", answers["wec-environment-scale"]),
    location: buildWecEnvironmentResult("location", answers["wec-environment-location"]),
    surroundings: buildWecEnvironmentResult("surroundings", answers["wec-environment-surroundings"]),
    interior: window.WEC_ENVIRONMENT_PROFILES?.interior?.[answers["wec-environment-interior"]],
    rhythm: window.WEC_ENVIRONMENT_PROFILES?.rhythm?.[answers["wec-environment-rhythm"]]
  };
  const responseQuality = detectWecResponseQuality(session);
  const combination = getWecCombination(rankedCultures, mode);
  const energy = buildWecEnergyProfile(rankedCultures, environment, frictionCulture);
  const checklist = buildWecChecklist(rankedCultures, frictionCulture, environment);
  const completedAt = new Date().toISOString();

  return {
    schemaVersion: 1,
    testId,
    testTitle: "Werkomgeving- en cultuurvoorkeurtest",
    completedAt,
    headline: buildWecHeadline(rankedCultures, mode),
    summary: buildWecSummary(rankedCultures, mode, environment, frictionCulture),
    mainScore: rankedCultures[0].displayScore,
    mainScoreHeading: "Primaire cultuurvoorkeur",
    mainLabel: `${rankedCultures[0].profile.name} · ${mode.label}`,
    dimensions: [],
    strengths: [],
    development: [],
    meaning: "",
    advice: "",
    cultures: rankedCultures,
    cultureMode: mode,
    combination,
    frictionCulture,
    environment,
    energy,
    checklist,
    responseQuality
  };
}
