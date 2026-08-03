"use strict";

function getCognitiveReasoningLevel(correct, moduleId, total = 15) {
  const labels = {
    numerical: {
      low: "Vraagt nog veel inspanning",
      developing: "Basis in ontwikkeling",
      solid: "Degelijke numerieke redeneerprestatie",
      strong: "Sterke numerieke redeneerprestatie"
    },
    verbal: {
      low: "Vraagt nog veel inspanning",
      developing: "Basis in ontwikkeling",
      solid: "Degelijke verbale redeneerprestatie",
      strong: "Sterke verbale redeneerprestatie"
    },
    abstractLogical: {
      low: "Vraagt nog veel inspanning",
      developing: "Basis in ontwikkeling",
      solid: "Degelijke abstract-logische redeneerprestatie",
      strong: "Sterke abstract-logische redeneerprestatie"
    },
    spatial: {
      low: "Vraagt nog veel inspanning",
      developing: "Basis in ontwikkeling",
      solid: "Degelijke ruimtelijke redeneerprestatie",
      strong: "Sterke ruimtelijke redeneerprestatie"
    },
    criticalData: {
      low: "Vraagt nog veel inspanning",
      developing: "Basis in ontwikkeling",
      solid: "Degelijke kritische beoordeling",
      strong: "Sterke kritische beoordeling"
    }
  }[moduleId] || {
    low: "Vraagt nog veel inspanning",
    developing: "Basis in ontwikkeling",
    solid: "Degelijke redeneerprestatie",
    strong: "Sterke redeneerprestatie"
  };

  const safeTotal = Math.max(1, Number(total) || 15);
  const ratio = Math.max(0, Number(correct) || 0) / safeTotal;

  if (ratio <= 1 / 3) return labels.low;
  if (ratio <= 0.6) return labels.developing;
  if (ratio <= 0.8) return labels.solid;
  return labels.strong;
}

function calculateReasoningModuleResult(moduleDefinition, moduleState) {
  const items = Array.isArray(moduleDefinition?.items) ? moduleDefinition.items : [];
  const answers = moduleState?.answers && typeof moduleState.answers === "object"
    ? moduleState.answers
    : {};
  const responseTimes = moduleState?.responseTimes && typeof moduleState.responseTimes === "object"
    ? moduleState.responseTimes
    : {};
  const subtypeDefinitions = Array.isArray(moduleDefinition?.subtypes)
    ? moduleDefinition.subtypes
    : [];
  const itemBreakdown = items.map(item => {
    const answered = Object.prototype.hasOwnProperty.call(answers, item.id);
    const selectedAnswer = answered ? answers[item.id] : null;
    const correct = answered && selectedAnswer === item.correctAnswer;

    return {
      itemId: item.id,
      difficulty: item.difficulty,
      subtypeId: item.subtypeId,
      selectedAnswer,
      correct,
      answered,
      responseTimeMs: Math.max(0, Number(responseTimes[item.id]) || 0)
    };
  });
  const answeredItems = itemBreakdown.filter(item => item.answered);
  const correctItems = itemBreakdown.filter(item => item.correct);
  const answeredCount = answeredItems.length;
  const correctCount = correctItems.length;
  const totalCount = items.length;
  const totalResponseTime = answeredItems.reduce((sum, item) => sum + item.responseTimeMs, 0);
  const averageResponseTimeSeconds = answeredCount > 0
    ? Math.round((totalResponseTime / answeredCount) / 100) / 10
    : 0;
  const subtypes = subtypeDefinitions.map(subtype => {
    const matchingItems = itemBreakdown.filter(item => item.subtypeId === subtype.id);
    const subtypeCorrect = matchingItems.filter(item => item.correct).length;
    const subtypeAnswered = matchingItems.filter(item => item.answered).length;
    const subtypeTotal = matchingItems.length;

    return {
      id: subtype.id,
      label: subtype.label,
      description: subtype.description,
      correct: subtypeCorrect,
      answered: subtypeAnswered,
      total: subtypeTotal,
      percentage: subtypeTotal > 0 ? Math.round((subtypeCorrect / subtypeTotal) * 100) : 0
    };
  });

  return {
    schemaVersion: COGNITIVE_BATTERY_SCHEMA_VERSION,
    scoringVersion: Number(moduleDefinition?.scoringVersion) || 1,
    moduleId: moduleDefinition.id,
    moduleTitle: moduleDefinition.title,
    completedAt: new Date().toISOString(),
    correct: correctCount,
    answered: answeredCount,
    total: totalCount,
    accuracy: totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0,
    answeredAccuracy: answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0,
    completion: totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0,
    averageResponseTimeSeconds,
    level: getCognitiveReasoningLevel(correctCount, moduleDefinition.id, totalCount),
    subtypes,
    itemBreakdown,
    timingDisclaimer:
      "Antwoordtijd wordt uitsluitend als aanvullende informatie weergegeven en is zonder pilotgegevens geen maat voor beter of slechter presteren.",
    normDisclaimer:
      "Dit resultaat is geen IQ-score en wordt niet vergeleken met een bevolkingsnorm of percentiel."
  };
}

function roundPercentage(value) {
  return Math.round((Number(value) || 0) * 10) / 10;
}

function getAttentionLevel(score) {
  if (score < 60) return "De nauwkeurige doelselectie vroeg nog veel inspanning";
  if (score < 75) return "De basis van de doelselectie is zichtbaar";
  if (score < 90) return "De doelselectie verliep overwegend nauwkeurig";
  return "De doelselectie verliep zeer nauwkeurig";
}

function calculateAttentionResult(attentionState) {
  const rounds = window.COGNITIVE_ATTENTION_DATA?.operationalRounds || [];
  const results = attentionState?.roundResults && typeof attentionState.roundResults === "object"
    ? attentionState.roundResults
    : {};
  const breakdown = rounds.map(round => {
    const stored = results[round.id] || {};
    return {
      roundId: round.id,
      difficulty: round.difficulty,
      completed: Boolean(stored.completed),
      hits: Math.max(0, Number(stored.hits) || 0),
      omissions: Math.max(0, Number(stored.omissions) || 0),
      commissions: Math.max(0, Number(stored.commissions) || 0),
      durationMs: Math.max(0, Number(stored.durationMs) || 0)
    };
  });
  const completedRounds = breakdown.filter(round => round.completed);
  const hits = completedRounds.reduce((sum, round) => sum + round.hits, 0);
  const omissions = completedRounds.reduce((sum, round) => sum + round.omissions, 0);
  const commissions = completedRounds.reduce((sum, round) => sum + round.commissions, 0);
  const targetCount = completedRounds.reduce((sum, round) => sum + round.hits + round.omissions, 0);
  const selections = hits + commissions;
  const detectionRate = targetCount > 0 ? (hits / targetCount) * 100 : 0;
  const selectionPrecision = selections > 0 ? (hits / selections) * 100 : 0;
  const targetSelectionScore = targetCount + commissions > 0
    ? (hits / (targetCount + commissions)) * 100
    : 0;
  const averageRoundTimeSeconds = completedRounds.length > 0
    ? completedRounds.reduce((sum, round) => sum + round.durationMs, 0) / completedRounds.length / 1000
    : 0;
  const difficultyOrder = ["easy", "medium", "hard"];
  const difficultyLabels = { easy: "Gemakkelijk", medium: "Gemiddeld", hard: "Moeilijk" };
  const difficulties = difficultyOrder.map(difficulty => {
    const matching = completedRounds.filter(round => round.difficulty === difficulty);
    const subHits = matching.reduce((sum, round) => sum + round.hits, 0);
    const subOmissions = matching.reduce((sum, round) => sum + round.omissions, 0);
    const subCommissions = matching.reduce((sum, round) => sum + round.commissions, 0);
    const denominator = subHits + subOmissions + subCommissions;
    return {
      id: difficulty,
      label: difficultyLabels[difficulty],
      rounds: matching.length,
      hits: subHits,
      omissions: subOmissions,
      commissions: subCommissions,
      score: denominator > 0 ? Math.round((subHits / denominator) * 100) : 0
    };
  });

  return {
    schemaVersion: COGNITIVE_BATTERY_SCHEMA_VERSION,
    scoringVersion: 1,
    moduleId: "attention",
    moduleTitle: "Aandacht — Symboolselectie",
    completedAt: new Date().toISOString(),
    completedRounds: completedRounds.length,
    totalRounds: rounds.length,
    hits,
    omissions,
    commissions,
    targetCount,
    detectionRate: Math.round(detectionRate),
    selectionPrecision: Math.round(selectionPrecision),
    targetSelectionScore: Math.round(targetSelectionScore),
    averageRoundTimeSeconds: roundPercentage(averageRoundTimeSeconds),
    level: getAttentionLevel(targetSelectionScore),
    difficulties,
    roundBreakdown: breakdown,
    timingDisclaimer:
      "Rondetijd wordt afzonderlijk getoond. Sneller is niet automatisch beter wanneer daarbij meer selectiefouten ontstaan.",
    normDisclaimer:
      "Deze taak stelt geen medische diagnose en wordt niet vergeleken met een bevolkingsnorm."
  };
}

function getWorkingMemoryExpectedSequence(trial) {
  const sequence = Array.isArray(trial?.sequence) ? [...trial.sequence] : [];
  return trial?.direction === "backward" ? sequence.reverse() : sequence;
}

function getWorkingMemoryLevel(exactTotal) {
  if (exactTotal <= 4) return "Het vasthouden en reproduceren van de reeksen vroeg nog veel inspanning";
  if (exactTotal <= 8) return "De basis van de ruimtelijke reeksverwerking is zichtbaar";
  if (exactTotal <= 11) return "De ruimtelijke reeksen werden overwegend correct verwerkt";
  return "De ruimtelijke reeksen werden zeer nauwkeurig verwerkt";
}

function calculateWorkingMemoryResult(workingState) {
  const trials = window.COGNITIVE_WORKING_MEMORY_DATA?.trials || [];
  const results = workingState?.trialResults && typeof workingState.trialResults === "object"
    ? workingState.trialResults
    : {};
  const breakdown = trials.map(trial => {
    const stored = results[trial.id] || {};
    const response = Array.isArray(stored.response) ? stored.response.map(Number) : [];
    const expected = Array.isArray(stored.expected)
      ? stored.expected.map(Number)
      : getWorkingMemoryExpectedSequence(trial);
    const correctPositions = expected.reduce(
      (sum, value, index) => sum + (response[index] === value ? 1 : 0),
      0
    );
    const exact = response.length === expected.length && correctPositions === expected.length;

    return {
      trialId: trial.id,
      direction: trial.direction,
      length: trial.sequence.length,
      completed: Boolean(stored.completed),
      response,
      expected,
      exact,
      correctPositions,
      responseTimeMs: Math.max(0, Number(stored.responseTimeMs) || 0)
    };
  });
  const completed = breakdown.filter(trial => trial.completed);
  const forward = completed.filter(trial => trial.direction === "forward");
  const backward = completed.filter(trial => trial.direction === "backward");
  const exactForward = forward.filter(trial => trial.exact).length;
  const exactBackward = backward.filter(trial => trial.exact).length;
  const exactTotal = exactForward + exactBackward;
  const correctForwardPositions = forward.reduce((sum, trial) => sum + trial.correctPositions, 0);
  const correctBackwardPositions = backward.reduce((sum, trial) => sum + trial.correctPositions, 0);
  const forwardPositions = forward.reduce((sum, trial) => sum + trial.length, 0);
  const backwardPositions = backward.reduce((sum, trial) => sum + trial.length, 0);
  const allPositions = forwardPositions + backwardPositions;
  const correctPositions = correctForwardPositions + correctBackwardPositions;
  const longestForward = forward.filter(trial => trial.exact).reduce((max, trial) => Math.max(max, trial.length), 0);
  const longestBackward = backward.filter(trial => trial.exact).reduce((max, trial) => Math.max(max, trial.length), 0);
  const averageResponseTimeSeconds = completed.length > 0
    ? completed.reduce((sum, trial) => sum + trial.responseTimeMs, 0) / completed.length / 1000
    : 0;

  return {
    schemaVersion: COGNITIVE_BATTERY_SCHEMA_VERSION,
    scoringVersion: 1,
    moduleId: "workingMemory",
    moduleTitle: "Werkgeheugen — Ruimtelijke reeksen",
    completedAt: new Date().toISOString(),
    completedTrials: completed.length,
    totalTrials: trials.length,
    exactForward,
    forwardTotal: 8,
    exactBackward,
    backwardTotal: 6,
    exactTotal,
    totalExactPossible: 14,
    correctPositions,
    totalPositions: allPositions,
    serialPositionAccuracy: allPositions > 0 ? Math.round((correctPositions / allPositions) * 100) : 0,
    forwardPositionAccuracy: forwardPositions > 0
      ? Math.round((correctForwardPositions / forwardPositions) * 100)
      : 0,
    backwardPositionAccuracy: backwardPositions > 0
      ? Math.round((correctBackwardPositions / backwardPositions) * 100)
      : 0,
    longestForwardSequence: longestForward,
    longestBackwardSequence: longestBackward,
    averageResponseTimeSeconds: roundPercentage(averageResponseTimeSeconds),
    level: getWorkingMemoryLevel(exactTotal),
    trialBreakdown: breakdown,
    timingDisclaimer:
      "Antwoordtijd wordt uitsluitend als aanvullende informatie weergegeven en beïnvloedt de werkgeheugenscore niet.",
    normDisclaimer:
      "Deze taak is geen algemene geheugenmeting en wordt niet vergeleken met een leeftijds- of bevolkingsnorm."
  };
}


/* =========================================================
   GEÏNTEGREERD COGNITIEF RAPPORT
   Compacte, taakgebonden interpretatie zonder normclaims.
========================================================= */

const COGNITIVE_REPORT_ORDER = Object.freeze([
  "numerical",
  "verbal",
  "abstractLogical",
  "spatial",
  "attention",
  "workingMemory",
  "criticalData"
]);

const COGNITIVE_REPORT_META = Object.freeze({
  numerical: {
    label: "Numeriek redeneren",
    strength: "Nauwkeurig omgaan met numerieke patronen en verhoudingen",
    growth: "Het combineren van cijferregels en gegevens kan verder worden gestimuleerd."
  },
  verbal: {
    label: "Verbaal redeneren",
    strength: "Logische relaties en regels in taal herkennen",
    growth: "Verbale regels en conclusies kunnen verder worden geoefend."
  },
  abstractLogical: {
    label: "Abstract en logisch redeneren",
    strength: "Visuele patronen en abstracte regels herkennen",
    growth: "Het tegelijk volgen van meerdere visuele regels kan verder worden gestimuleerd."
  },
  spatial: {
    label: "Ruimtelijk redeneren",
    strength: "Vormen mentaal draaien, vouwen en samenstellen",
    growth: "Ruimtelijke veranderingen en gezichtspunten kunnen verder worden geoefend."
  },
  attention: {
    label: "Aandacht",
    strength: "Relevante visuele informatie zorgvuldig selecteren",
    growth: "Gericht zoeken en afleiders negeren kan verder worden gestimuleerd."
  },
  workingMemory: {
    label: "Werkgeheugen",
    strength: "Korte ruimtelijke reeksen vasthouden en bewerken",
    growth: "Het vasthouden en mentaal omkeren van meerdere stappen kan verder worden ondersteund."
  },
  criticalData: {
    label: "Kritisch denken en data-interpretatie",
    strength: "Bewijs, conclusies en gegevens zorgvuldig beoordelen",
    growth: "Conclusies begrenzen en gegevens vergelijken kan verder worden geoefend."
  }
});

function getCognitiveReportScore(moduleId, moduleResults) {
  const result = moduleResults?.[moduleId];
  if (!result) return 0;
  if (moduleId === "attention") return Math.max(0, Number(result.targetSelectionScore) || 0);
  if (moduleId === "workingMemory") return Math.max(0, Number(result.serialPositionAccuracy) || 0);
  return Math.max(0, Number(result.accuracy) || 0);
}

function getCognitiveReportBand(score) {
  if (score >= 85) return "strong";
  if (score >= 70) return "solid";
  if (score >= 50) return "developing";
  return "effort";
}

function joinCognitiveLabels(labels) {
  const safe = labels.filter(Boolean);
  if (safe.length <= 1) return safe[0] || "";
  if (safe.length === 2) return `${safe[0]} en ${safe[1]}`;
  return `${safe.slice(0, -1).join(", ")} en ${safe.at(-1)}`;
}

function getCognitiveSubtypeSentence(result) {
  const subtypes = Array.isArray(result?.subtypes) ? result.subtypes : [];
  if (subtypes.length < 2) return "";
  const sorted = [...subtypes].sort((a, b) => b.percentage - a.percentage);
  const highest = sorted[0];
  const lowest = sorted.at(-1);
  if (highest.percentage - lowest.percentage <= 10) {
    return "De verschillende taakvormen lagen dicht bij elkaar.";
  }
  return `${highest.label} kwam het duidelijkst naar voren; ${lowest.label.toLowerCase()} vroeg relatief meer aandacht.`;
}

function getCognitiveDimensionDescription(moduleId, moduleResults) {
  const result = moduleResults?.[moduleId] || {};
  const score = getCognitiveReportScore(moduleId, moduleResults);
  const band = getCognitiveReportBand(score);
  const lead = {
    strong: "Je voerde de meeste opdrachten binnen dit onderdeel nauwkeurig uit.",
    solid: "Je verwerkte het merendeel van de opdrachten binnen dit onderdeel correct.",
    developing: "De basis van dit onderdeel was zichtbaar, met nog variatie tussen de taakvormen.",
    effort: "Dit onderdeel vroeg binnen deze afname relatief veel inspanning."
  }[band];

  if (moduleId === "attention") {
    const targets = Number(result.targetCount) || 0;
    const hits = Number(result.hits) || 0;
    const omissions = Number(result.omissions) || 0;
    const commissions = Number(result.commissions) || 0;
    return `${lead} Je selecteerde ${hits} van de ${targets} doelen; ${omissions} doelen werden gemist en ${commissions} afleiders werden geselecteerd. Dit is een taakgebonden beschrijving en geen medische beoordeling van aandacht.`;
  }

  if (moduleId === "workingMemory") {
    const forward = `${Number(result.exactForward) || 0}/${Number(result.forwardTotal) || 8}`;
    const backward = `${Number(result.exactBackward) || 0}/${Number(result.backwardTotal) || 6}`;
    const difference = (Number(result.exactForward) || 0) / 8 - (Number(result.exactBackward) || 0) / 6;
    let comparison = "Voorwaartse en achterwaartse reproductie lagen relatief dicht bij elkaar.";
    if (difference >= 0.2) comparison = "Het rechtstreeks reproduceren ging relatief gemakkelijker dan het mentaal omkeren van de reeks.";
    if (difference <= -0.2) comparison = "Het achterwaarts reproduceren verliep binnen deze afname relatief vlot.";
    return `${lead} Voorwaarts werden ${forward} reeksen exact gereproduceerd en achterwaarts ${backward}. ${comparison}`;
  }

  const subtypeSentence = getCognitiveSubtypeSentence(result);
  const boundaries = {
    numerical: "De score gaat over patronen, regels en eenvoudige gegevens, niet over algemene wiskundekennis.",
    verbal: "De score gaat over taalrelaties en verbale logica binnen deze korte opdrachten.",
    abstractLogical: "Daarbij werd gelet op veranderingen in vorm, aantal, positie en vulling.",
    spatial: "Daarbij werden rotatie, spiegeling, vouwen en ruimtelijke samenstelling gebruikt.",
    criticalData: "De score gaat over korte conclusies, aannames, percentages, tabellen en grafieken."
  }[moduleId] || "";
  return [lead, subtypeSentence, boundaries].filter(Boolean).join(" ");
}

function buildCognitiveSummary(entries) {
  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const top = sorted.slice(0, 2).map(entry => entry.label);
  const bottom = sorted.at(-1);
  const spread = sorted[0]?.score - bottom?.score;
  const strongCount = entries.filter(entry => entry.score >= 85).length;

  const sentences = ["Je hebt alle onderdelen van de cognitieve vaardigheidsbatterij afgerond."];
  if (strongCount >= 2) {
    sentences.push(`Binnen deze opdrachten kwamen ${joinCognitiveLabels(top)} het duidelijkst naar voren.`);
  } else {
    sentences.push(`Binnen je eigen resultaten kwamen ${joinCognitiveLabels(top)} relatief het duidelijkst naar voren.`);
  }

  if (spread <= 10) {
    sentences.push("De verschillende onderdelen lagen dicht bij elkaar, waardoor het profiel vrij gelijkmatig is.");
  } else if (bottom) {
    sentences.push(`${bottom.label} vroeg relatief meer inspanning en biedt daardoor de meeste ruimte om verder te oefenen of te ondersteunen.`);
  }

  sentences.push("De beschrijvingen gelden alleen voor deze taken en vormen geen IQ-, percentiel- of vergelijking met andere personen.");
  return sentences.join(" ");
}

function selectCognitiveStrengths(entries) {
  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const clear = sorted.filter(entry => entry.score >= 80).slice(0, 5);
  const selected = clear.length >= 3 ? clear : sorted.slice(0, 3);
  return selected.map(entry => {
    const prefix = entry.score >= 80 ? "" : "Relatief positief binnen je eigen profiel: ";
    return `${prefix}${COGNITIVE_REPORT_META[entry.id].strength}.`;
  });
}

function selectCognitiveGrowth(entries) {
  const sorted = [...entries].sort((a, b) => a.score - b.score);
  const clear = sorted.filter(entry => entry.score < 75).slice(0, 3);
  if (clear.length > 0) {
    return {
      ids: clear.map(entry => entry.id),
      items: clear.map(entry => `${COGNITIVE_REPORT_META[entry.id].label}: ${COGNITIVE_REPORT_META[entry.id].growth}`)
    };
  }

  const enrichment = sorted.slice(0, 2);
  return {
    ids: enrichment.map(entry => entry.id),
    items: enrichment.map(entry => `${COGNITIVE_REPORT_META[entry.id].label}: geen uitgesproken groeipunt, maar dit onderdeel kan met extra variatie verder worden uitgedaagd.`)
  };
}

function buildCognitiveBatteryReport(moduleResults = {}) {
  const entries = COGNITIVE_REPORT_ORDER.map(id => ({
    id,
    label: COGNITIVE_REPORT_META[id].label,
    score: getCognitiveReportScore(id, moduleResults),
    description: getCognitiveDimensionDescription(id, moduleResults)
  }));
  const growth = selectCognitiveGrowth(entries);

  return {
    summary: buildCognitiveSummary(entries),
    dimensions: entries,
    strengths: selectCognitiveStrengths(entries),
    growthItems: growth.items,
    growthIds: growth.ids
  };
}

function calculateCognitiveBatteryResult({ session }) {
  const modules = getCognitiveModuleDefinitions().filter(module =>
    isCognitiveModuleAvailable(module.id)
  );
  const allModulesCompleted = modules.length > 0 && modules.every(module =>
    getCognitiveModuleState(session, module.id)?.status === "completed"
  );

  if (!allModulesCompleted) return null;

  const moduleResults = { ...(session.moduleResults || {}) };
  const report = buildCognitiveBatteryReport(moduleResults);

  return {
    schemaVersion: COGNITIVE_BATTERY_SCHEMA_VERSION,
    reportVersion: 1,
    testId: COGNITIVE_BATTERY_TEST_ID,
    testTitle: "Cognitieve vaardigheidsbatterij",
    resultType: "cognitive-battery-profile",
    completedAt: new Date().toISOString(),
    selectedModules: [...COGNITIVE_MODULE_ORDER],
    moduleResults,
    mainScoreDisplay: `${modules.length}/${modules.length}`,
    mainLabel: "modules voltooid",
    dimensions: report.dimensions,
    summary: report.summary,
    strengths: report.strengths,
    development: report.growthItems,
    cognitiveReport: report
  };
}
