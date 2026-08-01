"use strict";

const CAREER_RIASEC_ORDER = ["R", "I", "A", "S", "E", "C"];
const CAREER_RIASEC_CONTENT = {
  R: { label: "Praktisch en technisch", short: "Praktisch", description: "Tastbaar werk, techniek, materialen, machines, natuur en fysieke activiteit." },
  I: { label: "Onderzoekend en analytisch", short: "Onderzoekend", description: "Vraagstukken analyseren, informatie onderzoeken en begrijpen hoe iets werkt." },
  A: { label: "Creatief en vernieuwend", short: "Creatief", description: "Ontwerpen, creëren, vormgeven, optreden en originele ideeën ontwikkelen." },
  S: { label: "Mensgericht en ondersteunend", short: "Mensgericht", description: "Mensen helpen, begeleiden, verzorgen, informeren en opleiden." },
  E: { label: "Ondernemend en beïnvloedend", short: "Ondernemend", description: "Initiatief nemen, overtuigen, organiseren en resultaatgericht richting geven." },
  C: { label: "Organiserend en gestructureerd", short: "Gestructureerd", description: "Planning, administratie, gegevens, procedures en nauwkeurige opvolging." }
};

function clampCareerScore(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

function calculateCareerRiasec(session) {
  const parameters = Object.fromEntries(CAREER_RIASEC_ORDER.map(code => [code, { alpha: 2, beta: 2 }]));
  const questionMap = getCareerQuestionMap(session);

  Object.entries(session.answers || {}).forEach(([questionId, answer]) => {
    const question = questionMap[questionId];
    if (!question || question.type !== "interest" || typeof answer !== "boolean") return;
    const isOccupation = question.kind === "occupation";
    const primaryWeight = isOccupation ? 0.45 : 1;
    const secondaryWeight = isOccupation ? 0.25 : 0.35;
    const tertiaryWeight = isOccupation ? 0.15 : 0;
    [[question.primary, primaryWeight], [question.secondary, secondaryWeight], [question.tertiary, tertiaryWeight]].forEach(([code, weight]) => {
      if (!code || !parameters[code] || !weight) return;
      parameters[code][answer ? "alpha" : "beta"] += weight;
    });
  });

  const scores = {};
  CAREER_RIASEC_ORDER.forEach(code => {
    const item = parameters[code];
    scores[code] = Math.round(100 * item.alpha / (item.alpha + item.beta));
  });
  const ranking = [...CAREER_RIASEC_ORDER].sort((a,b) => scores[b] - scores[a] || CAREER_RIASEC_ORDER.indexOf(a)-CAREER_RIASEC_ORDER.indexOf(b));
  return { scores, ranking, code: ranking.slice(0,3).join("-") };
}

function getCareerSelectedSkills(session) {
  const selected = new Set();
  const custom = [];
  Object.entries(session.answers || {}).forEach(([questionId, answer]) => {
    if (!questionId.startsWith("career-skills-")) return;
    const value = answer && typeof answer === "object" ? answer : {};
    (Array.isArray(value.selected) ? value.selected : []).forEach(id => selected.add(id));
    (Array.isArray(value.other) ? value.other : []).forEach(text => {
      const clean = String(text || "").trim();
      if (clean && !custom.includes(clean)) custom.push(clean);
    });
  });
  return { ids: [...selected], custom };
}

function careerWeightedCoverage(items, selectedSet) {
  if (!Array.isArray(items) || items.length === 0) return { ratio: null, matched: [], total: 0 };
  const totalWeight = items.reduce((sum,item) => sum + Number(item.w || 1), 0);
  const matched = items.filter(item => selectedSet.has(item.id));
  const matchedWeight = matched.reduce((sum,item) => sum + Number(item.w || 1), 0);
  return { ratio: totalWeight ? matchedWeight / totalWeight : 0, matched, total: items.length };
}

function calculateCareerSkillsFit(occupation, selectedSet) {
  const core = careerWeightedCoverage(occupation.core, selectedSet);
  if (core.ratio === null) return null;
  const additional = careerWeightedCoverage(occupation.additional, selectedSet);
  const bridge = careerWeightedCoverage(occupation.bridge, selectedSet);
  let score = 100 * (0.70 * core.ratio + 0.18 * (additional.ratio || 0) + 0.12 * (bridge.ratio || 0));
  if (core.total >= 3 && core.matched.length < 2) score = Math.min(score, 54);
  if (core.ratio < 0.35) score = Math.min(score, 59);
  return {
    score: Math.round(score),
    coreCoverage: core.ratio,
    matchedCore: core.matched,
    matchedAdditional: additional.matched,
    matchedBridge: bridge.matched,
    missingCore: occupation.core.filter(item => !selectedSet.has(item.id)).slice(0,4)
  };
}

function calculateCareerInterestFit(occupation, riasec, session) {
  const letters = String(occupation.riasec || "").slice(0,3).split("");
  const weights = [1, 0.65, 0.35];
  let numerator = 0;
  let denominator = 0;
  letters.forEach((letter,index) => {
    if (riasec.scores[letter] === undefined) return;
    numerator += riasec.scores[letter] * weights[index];
    denominator += weights[index];
  });
  let score = denominator ? numerator / denominator : 50;

  const directQuestionId = `career-occ-${occupation.id}`;
  if (typeof session.answers?.[directQuestionId] === "boolean") {
    score += session.answers[directQuestionId] ? 8 : -12;
  }

  const sectorSignals = {};
  (session.questionSequence || []).forEach(id => {
    if (!id.startsWith("career-occ-")) return;
    const answer = session.answers?.[id];
    if (typeof answer !== "boolean") return;
    const asked = window.CAREER_OCCUPATION_BY_ID?.[id.replace("career-occ-","")];
    if (!asked) return;
    sectorSignals[asked.sector] = (sectorSignals[asked.sector] || 0) + (answer ? 1 : -1);
  });
  const signal = sectorSignals[occupation.sector] || 0;
  score += Math.max(-8, Math.min(6, signal * 2));

  const conditions = getCareerConditionPreferences(session);
  let penalty = 0;
  (occupation.workFlags || []).forEach(flag => {
    const preference = conditions[flag];
    if (preference === false) penalty += 8;
  });
  if (conditions.outdoor === true && !(occupation.workFlags || []).includes("outdoor")) penalty += 3;
  score -= Math.min(24, penalty);
  return Math.round(clampCareerScore(score));
}

function getCareerConditionPreferences(session) {
  const result = {};
  (window.CAREER_INTEREST_CONDITION_QUESTIONS || []).forEach(question => {
    const answer = session.answers?.[question.id];
    if (typeof answer === "boolean") result[question.condition] = answer;
  });
  return result;
}

function careerCombinedRank(interestFit, skillsFit) {
  return Math.round(clampCareerScore(0.55 * interestFit + 0.45 * skillsFit - 0.20 * Math.abs(interestFit - skillsFit)));
}

function getCareerFitLabel(score) {
  if (score >= 80) return "Zeer sterke aansluiting";
  if (score >= 70) return "Sterke aansluiting";
  if (score >= 60) return "Goede aansluiting";
  if (score >= 50) return "Gedeeltelijke aansluiting";
  return "Beperkte aansluiting";
}

function selectCareerDiverseResults(items, maximum) {
  const selected = [];
  const sectorCounts = {};
  for (const item of items) {
    if ((sectorCounts[item.occupation.sector] || 0) >= 2) continue;
    const nearDuplicate = selected.some(existing => {
      if (existing.occupation.sector !== item.occupation.sector) return false;
      const a = new Set(existing.occupation.core.map(skill => skill.id));
      const b = new Set(item.occupation.core.map(skill => skill.id));
      const union = new Set([...a,...b]);
      const overlap = [...a].filter(id => b.has(id)).length;
      return union.size > 0 && overlap / union.size >= 0.8;
    });
    if (nearDuplicate) continue;
    selected.push(item);
    sectorCounts[item.occupation.sector] = (sectorCounts[item.occupation.sector] || 0) + 1;
    if (selected.length >= maximum) break;
  }
  return selected;
}

function calculateCareerInterestResult({ session, testId }) {
  const mode = session.mode || session.answers?.["career-module-choice"] || "both";
  const hasInterests = mode === "interests" || mode === "both";
  const hasSkills = mode === "skills" || mode === "both";
  const riasec = hasInterests ? calculateCareerRiasec(session) : null;
  const selectedSkills = getCareerSelectedSkills(session);
  const selectedSet = new Set(selectedSkills.ids);

  const matches = (window.CAREER_OCCUPATIONS || []).map(occupation => {
    const interestFit = hasInterests ? calculateCareerInterestFit(occupation, riasec, session) : null;
    const skillDetail = hasSkills ? calculateCareerSkillsFit(occupation, selectedSet) : null;
    const skillsFit = skillDetail?.score ?? null;
    const combined = interestFit !== null && skillsFit !== null ? careerCombinedRank(interestFit, skillsFit) : null;
    return { occupation, interestFit, skillsFit, combined, skillDetail };
  });

  let aligned = [];
  let growth = [];
  let current = [];
  let suggestions = [];

  if (hasInterests && hasSkills) {
    aligned = selectCareerDiverseResults(matches.filter(item => item.interestFit >= 65 && item.skillsFit >= 60 && item.skillDetail?.coreCoverage >= 0.50 && item.skillDetail?.matchedCore.length >= 2).sort((a,b) => b.combined-a.combined),6);
    const used = new Set(aligned.map(item => item.occupation.id));
    growth = selectCareerDiverseResults(matches.filter(item => !used.has(item.occupation.id) && item.interestFit >= 68 && item.occupation.core.length > 0).sort((a,b) => (0.78*b.interestFit + 0.22*(b.skillsFit || 0)) - (0.78*a.interestFit + 0.22*(a.skillsFit || 0))),6);
    growth.forEach(item => used.add(item.occupation.id));
    current = selectCareerDiverseResults(matches.filter(item => !used.has(item.occupation.id) && selectedSkills.ids.length >= 6 && item.skillsFit >= 62 && item.skillDetail?.coreCoverage >= 0.55 && item.skillDetail?.matchedCore.length >= 2).sort((a,b) => (0.85*b.skillsFit + 0.15*b.interestFit) - (0.85*a.skillsFit + 0.15*a.interestFit)),5);

    if (selectedSkills.ids.length >= 6 && current.length < 3) {
      const currentIds = new Set(current.map(item => item.occupation.id));
      const supplemental = matches.filter(item =>
        !used.has(item.occupation.id) &&
        !currentIds.has(item.occupation.id) &&
        item.skillsFit >= 50 &&
        item.skillDetail?.coreCoverage >= 0.35 &&
        item.skillDetail?.matchedCore.length >= 2
      ).sort((a,b) => (0.85*b.skillsFit + 0.15*b.interestFit) - (0.85*a.skillsFit + 0.15*a.interestFit));
      current = selectCareerDiverseResults([...current, ...supplemental], 5);
    }
  } else if (hasInterests) {
    suggestions = selectCareerDiverseResults(matches.filter(item => item.interestFit >= 55).sort((a,b) => b.interestFit-a.interestFit),10);
  } else if (hasSkills && selectedSkills.ids.length >= 6) {
    suggestions = selectCareerDiverseResults(matches.filter(item => item.skillsFit >= 48 && item.skillDetail?.coreCoverage >= 0.30 && item.skillDetail?.matchedCore.length >= 2).sort((a,b) => b.skillsFit-a.skillsFit),10);
  }

  const dimensions = riasec ? CAREER_RIASEC_ORDER.map(code => ({ id: code, label: CAREER_RIASEC_CONTENT[code].label, score: riasec.scores[code], description: CAREER_RIASEC_CONTENT[code].description })) : [];
  const mainDisplay = riasec?.code || `${selectedSkills.ids.length} vaardigheden`;
  const topLabels = riasec ? riasec.ranking.slice(0,3).map(code => CAREER_RIASEC_CONTENT[code].short) : [];
  const summary = hasInterests && hasSkills
    ? `Je interesseprofiel ${riasec.code} wordt gecombineerd met ${selectedSkills.ids.length} zelfaangegeven vaardigheden.`
    : hasInterests
      ? `Je sterkste interessegebieden zijn ${topLabels.join(", ")}.`
      : `Je selecteerde ${selectedSkills.ids.length} vaardigheden die aan beroepsprofielen zijn gekoppeld.`;

  return {
    schemaVersion: 1,
    testId,
    testTitle: "Interesse- en beroepsrichtingentest",
    completedAt: new Date().toISOString(),
    resultType: "career-interest-profile",
    mode,
    hasInterests,
    hasSkills,
    mainScoreDisplay: mainDisplay,
    mainScoreHeading: hasInterests ? "Jouw RIASEC-code" : "Inventaris",
    mainLabel: hasInterests ? topLabels.join(" · ") : "zelfaangegeven vaardigheden",
    summary,
    dimensions,
    riasec,
    selectedSkills,
    selectedSkillGroups: getCareerSelectedGroupSummaries(session, selectedSet),
    conditions: getCareerConditionPreferences(session),
    aligned,
    growth,
    current,
    suggestions,
    strengths: topLabels.length ? topLabels.map(label => `${label} komt duidelijk naar voren in je beroepsinteresses.`) : [],
    development: [],
    meaning: hasInterests && hasSkills ? "De resultaten tonen waar je interesses en je huidige zelfinventaris elkaar versterken of juist een ontwikkelroute zichtbaar maken." : "Dit rapport beschrijft alleen het onderdeel dat je hebt ingevuld.",
    advice: "Vergelijk vooral werkzaamheden, werkomgeving en leerpaden; gebruik een functietitel nooit als enige beslissingsbasis."
  };
}

function getCareerSelectedGroupSummaries(session, selectedSet) {
  return (window.CAREER_SKILL_GROUPS || []).map(group => ({
    id: group.id,
    name: group.name,
    skills: group.skills.filter(skill => selectedSet.has(skill.id)).map(skill => skill.name)
  })).filter(group => group.skills.length > 0);
}
