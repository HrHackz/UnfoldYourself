"use strict";

const COGNITIVE_SETUP_QUESTION = Object.freeze({
  id: "cognitive-module-selection",
  type: "cognitive-module-selection",
  category: "Modulekeuze",
  text: "Welke onderdelen wil je in je cognitieve batterij opnemen?",
  instruction:
    "Kies de volledige batterij, één module of een combinatie van meerdere modules. Je keuze wordt lokaal bewaard."
});

const COGNITIVE_BATTERY_TEST_DEFINITION = {
  id: COGNITIVE_BATTERY_TEST_ID,
  domainId: "denken",
  domainTitle: "Denken & redeneervermogen",
  title: "Cognitieve vaardigheidsbatterij",
  description:
    "Een modulaire, CHC-geïnformeerde batterij voor numeriek, verbaal, abstract, ruimtelijk en kritisch redeneren, aandacht en werkgeheugen.",
  estimatedTime: "Ongeveer 15 minuten per beschikbare module",
  developmentStatus: "available",
  resultType: "cognitive-battery-profile",
  mainScoreHeading: "Jouw cognitieve moduleprofiel",
  printReportSubtitle: "Cognitief moduleprofiel",
  schemaVersion: COGNITIVE_BATTERY_SCHEMA_VERSION,
  questions: [COGNITIVE_SETUP_QUESTION],
  choices: [
    {
      value: "module-selection",
      label: "Modulekeuze"
    }
  ],
  createSession: createCognitiveSession,
  prepareStoredState: prepareCognitiveStoredState,
  calculateResult: calculateCognitiveBatteryResult,
  renderQuestionInput: renderCognitiveBatteryQuestionInput,
  renderResultDetails: renderCognitiveBatteryReport,
  isAnswerValid(question, answer) {
    if (question?.type === "cognitive-module-selection") {
      return isCognitiveSelectionValid(answer);
    }

    return answer !== undefined && answer !== null;
  },
  getIntroQuestionCountText() {
    return "6 modules, afzonderlijk of gecombineerd";
  },
  getProgress({ session }) {
    return {
      counter: "Modulekeuze",
      percentage: 0,
      label: session?.setupCompleted
        ? "Modulekeuze opgeslagen"
        : "Batterij samenstellen",
      nextLabel: "Keuze opslaan"
    };
  },
  introGuidance: [
    "Alle zes cognitieve modules zijn volledig uitvoerbaar, met aandacht en werkgeheugen als afzonderlijk gescoorde subtaken.",
    "Je kunt iedere beschikbare module of subtaak afzonderlijk starten, hervatten en opnieuw uitvoeren.",
    "Resultaten worden per module weergegeven; er komt geen algemene IQ- of cognitieve totaalscore."
  ],
  previewTitle: "Een modulair cognitief profiel",
  previewItems: [
    "15 operationele opgaven per beschikbare redeneermodule",
    "12 aandachtsrondes en 14 ruimtelijke geheugenreeksen",
    "Oefening met feedback vóór de echte opgaven",
    "Nauwkeurigheid, voltooiing en taakgerichte subscores",
    "Lokale voortgang en antwoordtijd per module",
    "Geen IQ- of percentielclaim"
  ],
  previewText:
    "Alle zes modules zijn beschikbaar. Resultaten worden afzonderlijk weergegeven en vormen geen algemene cognitieve totaalscore.",
  questionInstruction:
    "Kies een afnamevorm en start daarna een beschikbare module.",
  evidence: window.COGNITIVE_BATTERY_EVIDENCE || {}
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
  ? window.UNFOLD_TEST_DEFINITIONS
  : [];
window.UNFOLD_TEST_DEFINITIONS.push(COGNITIVE_BATTERY_TEST_DEFINITION);
