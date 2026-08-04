"use strict";

function clampTeamRoleScore(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function getTeamRoleFit(rawScore) {
  const score = Number(rawScore) || 0;
  if (score >= 13) return { id: "very-strong", label: "Zeer sterke aansluiting" };
  if (score >= 10) return { id: "strong", label: "Sterke aansluiting" };
  if (score >= 7) return { id: "reasonable", label: "Redelijke aansluiting" };
  if (score >= 4) return { id: "limited", label: "Beperkte aansluiting" };
  return { id: "low", label: "Weinig aansluiting" };
}

function getTeamRolePairKey(firstId, secondId) {
  return [String(firstId), String(secondId)].sort().join("|");
}

function getTeamRolePairInsight(first, second) {
  const stored = window.TEAM_ROLE_PAIR_INSIGHTS?.[getTeamRolePairKey(first.id, second.id)];
  if (stored) return stored;
  return {
    synergy: `De combinatie van ${first.name} en ${second.name} maakt twee verschillende bijdragen tegelijk beschikbaar. Afhankelijk van de situatie kan de ene rol richting geven aan de andere.`,
    tension: `De twee rollen kunnen verschillende prioriteiten leggen. Bewust bepalen welke bijdrage op dat moment nodig is, voorkomt dat ze elkaar onbedoeld afremmen.`
  };
}

function detectTeamRoleResponseQuality(answers) {
  const values = (window.TEAM_ROLE_QUESTIONS || [])
    .map(question => Number(answers?.[question.id]))
    .filter(value => Number.isFinite(value));

  if (values.length !== 72) {
    return {
      complete: false,
      uniformPattern: false,
      lowDifferentiation: false,
      message: "Niet alle vragen zijn beantwoord."
    };
  }

  const frequencies = values.reduce((map, value) => {
    map[value] = (map[value] || 0) + 1;
    return map;
  }, {});
  const dominantCount = Math.max(...Object.values(frequencies));

  const roleTotals = window.TEAM_ROLE_ROLE_ORDER.map(roleId => {
    return (window.TEAM_ROLE_QUESTIONS || [])
      .filter(question => question.roleId === roleId)
      .reduce((sum, question) => sum + (Number(answers?.[question.id]) || 0), 0);
  });
  const scoreSpread = Math.max(...roleTotals) - Math.min(...roleTotals);

  const uniformPattern = dominantCount >= 68;
  const lowDifferentiation = scoreSpread <= 2;
  const message = uniformPattern
    ? "Je gebruikte bij vrijwel alle stellingen hetzelfde antwoord. Daardoor is het onderscheid tussen de rollen minder precies."
    : lowDifferentiation
      ? "Je scores liggen zeer dicht bij elkaar. Bekijk de uitkomst daarom als een breed rollenprofiel en niet als een scherpe rangschikking."
      : "";

  return {
    complete: true,
    uniformPattern,
    lowDifferentiation,
    dominantCount,
    scoreSpread,
    message
  };
}

function rankTeamRoleResults(results) {
  const order = new Map((window.TEAM_ROLE_ROLE_ORDER || []).map((id, index) => [id, index]));
  const sorted = [...results].sort((left, right) => {
    if (right.rawScore !== left.rawScore) return right.rawScore - left.rawScore;
    return (order.get(left.id) || 0) - (order.get(right.id) || 0);
  });

  let previousScore = null;
  let previousRank = 0;
  sorted.forEach((item, index) => {
    if (item.rawScore === previousScore) {
      item.rank = previousRank;
    } else {
      item.rank = index + 1;
      previousRank = item.rank;
      previousScore = item.rawScore;
    }
  });

  return sorted;
}

function buildTeamRoleHeadline(topRoles, quality) {
  if (quality.uniformPattern || topRoles.length >= 6) {
    return "Je teamrolprofiel is breed en weinig uitgesproken";
  }

  const names = topRoles.map(role => role.name);
  if (names.length === 1) return `Jouw sterkste teamrol is ${names[0]}`;
  if (names.length === 2) return `Jouw sterkste teamrollen zijn ${names[0]} en ${names[1]}`;
  return `Jouw sterkste teamrollen zijn ${names.slice(0, -1).join(", ")} en ${names.at(-1)}`;
}

function buildTeamRoleSummary(topRoles, quality) {
  if (quality.uniformPattern) {
    return "Je herkende vrijwel alle beschreven bijdragen in dezelfde mate. Daardoor ontstaat een breed profiel zonder duidelijke rangorde. Bekijk vooral welke rolbeschrijvingen in concrete teamsituaties het meest herkenbaar zijn.";
  }

  if (quality.lowDifferentiation) {
    return "Je antwoorden laten verschillende teamrollen in vergelijkbare mate zien. Dat kan betekenen dat je je gedrag sterk aanpast aan de situatie of dat je jezelf breed herkent in teamwork. De rangorde is daardoor minder belangrijk dan de combinatie van bijdragen.";
  }

  const visible = topRoles.slice(0, 3);
  if (visible.length === 0) return "Je teamrolprofiel is berekend.";
  if (visible.length === 1) return `${visible[0].headline} Deze bijdrage komt volgens je antwoorden het meest vanzelfsprekend naar voren.`;
  if (visible.length === 2) return `${visible[0].headline} Tegelijk is ook ${visible[1].name.toLowerCase()} sterk beschikbaar. Samen vormen deze rollen de kern van je huidige samenwerkingsprofiel.`;
  return `${visible[0].headline} Daarnaast zijn ${visible[1].name.toLowerCase()} en ${visible[2].name.toLowerCase()} duidelijk beschikbaar. De combinatie laat zien hoe je waarschijnlijk ideeën, mensen, kwaliteit en uitvoering binnen teamwork met elkaar verbindt.`;
}

function buildTeamRoleCombination(topRoles) {
  const selected = topRoles.slice(0, 3);
  const pairInsights = [];
  for (let firstIndex = 0; firstIndex < selected.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < selected.length; secondIndex += 1) {
      const first = selected[firstIndex];
      const second = selected[secondIndex];
      pairInsights.push({
        pair: `${first.name} + ${second.name}`,
        ...getTeamRolePairInsight(first, second)
      });
    }
  }

  return {
    intro: selected.length > 1
      ? `Je hoogste scores vormen geen losstaande types. De rollen ${selected.map(role => role.name).join(", ")} kunnen elkaar versterken, maar soms ook verschillende prioriteiten oproepen.`
      : "Je hoogste rol geeft de meest herkenbare bijdrage weer. Andere rollen kunnen afhankelijk van de situatie aanvullend beschikbaar zijn.",
    pairInsights
  };
}

function calculateTeamRoleResult({ session, testId }) {
  const questions = window.TEAM_ROLE_QUESTIONS || [];
  const roles = window.TEAM_ROLE_DEFINITIONS || [];
  const answers = session?.answers || {};

  if (questions.some(question => !Object.prototype.hasOwnProperty.call(answers, question.id))) {
    return null;
  }

  const scoredRoles = roles.map(role => {
    const roleQuestions = questions.filter(question => question.roleId === role.id);
    const rawScore = roleQuestions.reduce((sum, question) => sum + (Number(answers[question.id]) || 0), 0);
    const maxScore = roleQuestions.length * 2;
    const percentageExact = maxScore > 0 ? (rawScore / maxScore) * 100 : 0;
    const fit = getTeamRoleFit(rawScore);
    return {
      ...role,
      questionCount: roleQuestions.length,
      rawScore,
      maxScore,
      percentage: Math.round(percentageExact * 10) / 10,
      displayPercentage: Math.round(percentageExact),
      fit
    };
  });

  const rankedRoles = rankTeamRoleResults(scoredRoles);
  const quality = detectTeamRoleResponseQuality(answers);
  const topRoles = rankedRoles.filter(role => role.rank <= 3);
  const primary = rankedRoles[0];
  const lowestRoles = rankedRoles.slice().reverse().slice(0, 3).reverse();
  const completedAt = new Date().toISOString();

  return {
    schemaVersion: 1,
    testId,
    testTitle: "Teamrol- en samenwerkingsstijltest",
    completedAt,
    headline: buildTeamRoleHeadline(topRoles, quality),
    summary: buildTeamRoleSummary(topRoles, quality),
    mainScore: primary.displayPercentage,
    mainScoreHeading: "Sterkste aansluiting",
    mainLabel: `${primary.name} · ${primary.fit.label} · ${primary.rawScore}/${primary.maxScore}`,
    dimensions: [],
    strengths: [],
    development: [],
    meaning: "",
    advice: "",
    roles: rankedRoles,
    topRoles,
    lowerRoles: lowestRoles,
    combination: buildTeamRoleCombination(topRoles),
    responseQuality: quality
  };
}
