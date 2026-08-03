"use strict";

const DIGITAL_SKILLS_WORKSPACE_QUESTION = Object.freeze({
  id: "digital-skills-workspace",
  category: "Digitale skills",
  text: "Kies een digitaal competentiegebied"
});

const DIGITAL_SKILLS_TEST_DEFINITION = {
  id: DIGITAL_SKILLS_TEST_ID,
  domainId: "vaardigheden",
  domainTitle: "Digitale vaardigheden",
  title: "Digitale skills",
  description: "Zelfreflectie over digitale kennis, vaardigheden en houding binnen de vijf gebieden van DigCompSAT.",
  estimatedTime: "Ongeveer 23–30 minuten, verdeeld over vijf gebieden",
  developmentStatus: "available",
  resultType: "digital-skills-profile",
  mainScoreHeading: "DigCompSAT-overzicht",
  printReportSubtitle: "Digitale skills · DigCompSAT",
  questions: [DIGITAL_SKILLS_WORKSPACE_QUESTION],
  choices: [{ value: "workspace", label: "Digitale skills" }],
  createSession: createDigitalSkillsSession,
  prepareStoredState: prepareDigitalSkillsStoredState,
  calculateResult: calculateDigitalSkillsResult,
  renderQuestionInput: renderDigitalSkillsQuestionInput,
  renderResultDetails: renderDigitalSkillsReport,
  isAnswerValid() {
    return true;
  },
  getIntroQuestionCountText() {
    return "82 stellingen, verdeeld over vijf gebieden";
  },
  getSavedProgressPercentage({ activeSession }) {
    const normalized = normalizeDigitalSkillsSession(activeSession);
    const answered = DIGITAL_SKILLS_QUESTIONS.filter(question =>
      Object.prototype.hasOwnProperty.call(normalized.answers, question.id)
    ).length;
    return Math.round((answered / DIGITAL_SKILLS_QUESTIONS.length) * 100);
  },
  getProgress({ session }) {
    const normalized = normalizeDigitalSkillsSession(session);
    const completed = DIGITAL_SKILLS_AREAS.filter(area =>
      getDigitalSkillsAreaState(normalized, area.id).status === "completed"
    ).length;
    return {
      counter: `${completed} van 5 gebieden voltooid`,
      percentage: Math.round((completed / 5) * 100),
      label: "Digitale skills"
    };
  },
  introGuidance: [
    "Kies telkens het antwoord dat het beste past bij wat je op dit moment werkelijk weet, kunt of bij jezelf herkent.",
    "Je kunt de vijf gebieden afzonderlijk invullen, tussentijds stoppen en later verdergaan.",
    "Dit is een zelfreflectietest en geen praktische vaardigheidstest of certificaat."
  ],
  previewTitle: "Een modulair DigCompSAT-profiel",
  previewItems: [
    "82 officiële DigCompSAT-stellingen",
    "Vijf digitale competentiegebieden",
    "21 onderliggende competenties",
    "Vier antwoordniveaus per stelling",
    "Lokale opslag en hervatten per gebied"
  ],
  previewText: "Na ieder voltooid gebied kun je al feedback bekijken. Het volledige rapport verschijnt na alle vijf gebieden.",
  questionInstruction: "",
  evidence: DIGITAL_SKILLS_EVIDENCE
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
  ? window.UNFOLD_TEST_DEFINITIONS
  : [];
window.UNFOLD_TEST_DEFINITIONS.push(DIGITAL_SKILLS_TEST_DEFINITION);
