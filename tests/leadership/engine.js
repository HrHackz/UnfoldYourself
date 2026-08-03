"use strict";

const LEADERSHIP_WORKSPACE_QUESTION = Object.freeze({
  id: "leadership-workspace",
  category: "Leiderschapstest",
  text: "Kies een onderdeel"
});

const LEADERSHIP_TEST_DEFINITION = {
  id: LEADERSHIP_TEST_ID,
  domainId: "samenwerking",
  domainTitle: "Samenwerking, leiderschap & cultuur",
  title: "Leiderschapstest",
  description: "Zelfreflectie over twaalf leiderschapsstijlen en de flexibiliteit waarmee je richting geeft, begeleidt, steunt en delegeert.",
  estimatedTime: "Ongeveer 18–25 minuten, verdeeld over twee onderdelen",
  developmentStatus: "available",
  resultType: "leadership-profile",
  mainScoreHeading: "Situationele flexibiliteit",
  printReportSubtitle: "Leiderschapstest · stijlprofiel en situationele flexibiliteit",
  questions: [LEADERSHIP_WORKSPACE_QUESTION],
  choices: [{ value: "workspace", label: "Leiderschapstest" }],
  createSession: createLeadershipSession,
  prepareStoredState: prepareLeadershipStoredState,
  calculateResult: calculateLeadershipResult,
  renderQuestionInput: renderLeadershipQuestionInput,
  renderResultDetails: renderLeadershipReport,
  isAnswerValid() {
    return true;
  },
  getIntroQuestionCountText() {
    return "80 vragen: 20 praktijksituaties en 60 gedragsstellingen";
  },
  getSavedProgressPercentage({ activeSession }) {
    const normalized = normalizeLeadershipSession(activeSession);
    return Math.round((Object.keys(normalized.answers || {}).length / 80) * 100);
  },
  getProgress({ session }) {
    const normalized = normalizeLeadershipSession(session);
    const completed = LEADERSHIP_MODULES.filter(module =>
      getLeadershipModuleState(normalized, module.id).status === "completed"
    ).length;
    return {
      counter: `${completed} van 2 onderdelen voltooid`,
      percentage: Math.round((Object.keys(normalized.answers || {}).length / 80) * 100),
      label: "Leiderschapstest"
    };
  },
  introGuidance: [
    "Kies bij de praktijksituaties wat je waarschijnlijk werkelijk zou doen, niet wat theoretisch het beste klinkt.",
    "Beoordeel bij de gedragsstellingen hoe vaak het gedrag doorgaans bij je voorkomt wanneer je iemand, een project of een groep aanstuurt.",
    "Je kunt na ieder onderdeel stoppen en later verdergaan; iedere keuze wordt automatisch lokaal opgeslagen."
  ],
  previewTitle: "Eén geïntegreerd leiderschapsprofiel",
  previewItems: [
    "Vier situationele voorkeuren die samen 100% vormen",
    "Situationele afstemming, repertoirebreedte en flexibiliteit",
    "Twaalf onafhankelijke leiderschapsstijlen",
    "Rangschikking van natuurlijke naar minder vanzelfsprekende stijlen",
    "Krachten, risico’s, passende context en ontwikkeladvies"
  ],
  previewText: "Je resultaat beschrijft een combinatie van voorkeuren. Bijna niemand is volledig één type leider, en geen enkele stijl is in elke situatie automatisch de beste.",
  questionInstruction: "",
  resultCardContent: {
    S1: {
      label: "S1 Richting geven",
      description: "Duidelijkheid, structuur, concrete instructies en opvolging."
    },
    S2: {
      label: "S2 Begeleiden",
      description: "Richting combineren met uitleg, feedback en motivatie."
    },
    S3: {
      label: "S3 Steunen",
      description: "Luisteren, betrekken, faciliteren en vertrouwen versterken."
    },
    S4: {
      label: "S4 Delegeren",
      description: "Verantwoordelijkheid overdragen met duidelijke grenzen."
    }
  },
  evidence: LEADERSHIP_EVIDENCE
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
  ? window.UNFOLD_TEST_DEFINITIONS
  : [];
window.UNFOLD_TEST_DEFINITIONS.push(LEADERSHIP_TEST_DEFINITION);
