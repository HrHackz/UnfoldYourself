"use strict";

function roundDigitalSkillsPercentage(value) {
  return Math.round((Number(value) || 0) * 10) / 10;
}

function getDigitalSkillsLevel(percentage) {
  const score = Number(percentage) || 0;
  if (score < 30) return { id: "low", label: "Laag" };
  if (score < 48) return { id: "foundation", label: "Basisniveau" };
  if (score < 81) return { id: "intermediate", label: "Gemiddeld niveau" };
  return { id: "advanced", label: "Gevorderd niveau" };
}

function getDigitalSkillsCompetenceResult(competence, answers) {
  const questions = DIGITAL_SKILLS_QUESTIONS.filter(question => question.competenceId === competence.id);
  const values = questions.map(question => Number(answers?.[question.id])).filter(value => Number.isFinite(value));
  const rawScore = values.reduce((sum, value) => sum + value, 0);
  const maxScore = questions.length * 3;
  const complete = values.length === questions.length;
  const percentage = maxScore > 0 ? (rawScore / maxScore) * 100 : 0;

  return {
    id: competence.id,
    areaId: competence.areaId,
    title: competence.title,
    description: competence.description,
    rawScore,
    maxScore,
    percentage: roundDigitalSkillsPercentage(percentage),
    displayPercentage: Math.round(percentage),
    complete,
    needsDevelopmentFeedback: complete && percentage < 48,
    feedbackBand: percentage < 30 ? "low" : percentage < 48 ? "foundation" : null
  };
}

function getDigitalSkillsAreaResult(area, answers) {
  const questions = getDigitalSkillsAreaQuestions(area.id);
  const values = questions.map(question => Number(answers?.[question.id])).filter(value => Number.isFinite(value));
  const rawScore = values.reduce((sum, value) => sum + value, 0);
  const maxScore = questions.length * 3;
  const complete = values.length === questions.length;
  const percentage = maxScore > 0 ? (rawScore / maxScore) * 100 : 0;
  const level = getDigitalSkillsLevel(percentage);
  const competenceResults = DIGITAL_SKILLS_COMPETENCES
    .filter(competence => competence.areaId === area.id)
    .map(competence => getDigitalSkillsCompetenceResult(competence, answers));

  return {
    id: area.id,
    title: area.title,
    shortTitle: area.shortTitle,
    description: area.description,
    itemCount: questions.length,
    answeredCount: values.length,
    rawScore,
    maxScore,
    percentage: roundDigitalSkillsPercentage(percentage),
    displayPercentage: Math.round(percentage),
    levelId: level.id,
    levelLabel: level.label,
    complete,
    competenceResults,
    completedAt: complete ? new Date().toISOString() : null
  };
}

function calculateDigitalSkillsAreaResult(areaId, answers) {
  const area = getDigitalSkillsArea(areaId);
  return area ? getDigitalSkillsAreaResult(area, answers) : null;
}

function createDigitalSkillsSummary(areaResults) {
  const complete = areaResults.filter(area => area.complete);
  if (complete.length === 0) {
    return "Er zijn nog geen volledige gebieden afgerond.";
  }

  const sorted = complete.slice().sort((a, b) => b.percentage - a.percentage);
  const strongest = sorted[0];
  const growth = sorted.at(-1);
  const spread = strongest.percentage - growth.percentage;

  if (spread < 8) {
    return `Je zelfbeoordeling is vrij gelijkmatig over de vijf digitale competentiegebieden. Je ervaart binnen ${strongest.title} iets meer vertrouwen, maar de verschillen tussen de gebieden blijven beperkt. Dit resultaat beschrijft je eigen inschatting en is geen praktische vaardigheidstest of certificaat.`;
  }

  return `Je beoordeelt je digitale kennis, vaardigheden en houding het sterkst binnen ${strongest.title}. Binnen ${growth.title} ervaar je relatief meer ruimte om verder te verkennen of te oefenen. De vijf gebieden laten samen zien waar je jezelf momenteel zelfstandig voelt en waar ondersteuning nuttig kan zijn. Dit resultaat is gebaseerd op zelfreflectie en vormt geen praktische vaardigheidstest of certificaat.`;
}

function calculateDigitalSkillsResult({ session, testId }) {
  const normalized = normalizeDigitalSkillsSession(session);
  const areaResults = DIGITAL_SKILLS_AREAS.map(area => getDigitalSkillsAreaResult(area, normalized.answers));

  if (!areaResults.every(area => area.complete)) {
    return null;
  }

  const competenceResults = DIGITAL_SKILLS_COMPETENCES.map(competence =>
    getDigitalSkillsCompetenceResult(competence, normalized.answers)
  );
  const strongestCompetences = competenceResults
    .slice()
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);
  const growthCompetences = competenceResults
    .filter(item => item.percentage < 48)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);

  const completedAt = new Date().toISOString();
  const areaResultMap = Object.fromEntries(areaResults.map(area => [area.id, area]));

  return {
    testId,
    testTitle: "Digitale skills",
    schemaVersion: DIGITAL_SKILLS_SCHEMA_VERSION,
    contentVersion: DIGITAL_SKILLS_CONTENT_VERSION,
    scoringVersion: DIGITAL_SKILLS_SCORING_VERSION,
    translationVersion: DIGITAL_SKILLS_TRANSLATION_VERSION,
    startedAt: normalized.startedAt,
    completedAt,
    mainScoreDisplay: "5 gebieden",
    mainScoreHeading: "DigCompSAT-overzicht",
    mainLabel: "afzonderlijk beoordeeld",
    summary: createDigitalSkillsSummary(areaResults),
    dimensions: [],
    strengths: [],
    development: [],
    meaning: "",
    advice: "",
    areaResults: areaResultMap,
    competenceResults,
    strongestCompetences,
    growthCompetences,
    answers: { ...normalized.answers },
    answerMeta: { ...normalized.answerMeta }
  };
}
