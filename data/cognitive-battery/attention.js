"use strict";

(function registerAttentionAndWorkingMemoryModule() {
  const TARGET_CODE = "V2";

  function parseGrid(rows) {
    const cells = rows.flatMap(row => row.trim().split(/\s+/));

    if (cells.length !== 30) {
      throw new Error(`Aandachtsraster bevat ${cells.length} in plaats van 30 symbolen.`);
    }

    return cells;
  }

  function createRound(id, difficulty, rows, options = {}) {
    const cells = parseGrid(rows);
    const targetIndices = cells
      .map((code, index) => code === TARGET_CODE ? index : -1)
      .filter(index => index >= 0);

    if (targetIndices.length !== Number(options.targetCount || 5)) {
      throw new Error(`${id} bevat ${targetIndices.length} doelen in plaats van ${options.targetCount || 5}.`);
    }

    return Object.freeze({
      id,
      difficulty,
      cells: Object.freeze(cells),
      targetIndices: Object.freeze(targetIndices),
      durationMs: Number(options.durationMs || 20000),
      timed: options.timed !== false,
      practice: Boolean(options.practice)
    });
  }

  const practiceRounds = Object.freeze([
    createRound("AP01", "practice", [
      "H3 H1 D3 V2 H3",
      "H3 D3 D1 D1 V2",
      "D3 D1 H3 D3 D1",
      "D1 H1 V2 H1 D3",
      "H3 H1 D1 H1 V2",
      "H1 D3 H3 H1 H3"
    ], { targetCount: 4, durationMs: 0, timed: false, practice: true }),
    createRound("AP02", "practice", [
      "V1 V2 V1 V1 V3",
      "D2 V1 V3 V2 D2",
      "H2 H2 D2 H2 V2",
      "D2 V3 V1 H2 V3",
      "V1 V2 H2 D2 V3",
      "V1 V3 V2 D2 H2"
    ], { targetCount: 5, durationMs: 20000, practice: true })
  ]);

  const operationalRounds = Object.freeze([
    createRound("R01", "easy", [
      "D1 V2 H3 H3 D3", "D1 H1 H1 V2 H3", "D1 D3 V2 H3 D1",
      "H1 D1 D3 D1 H1", "D3 V2 H1 D3 H3", "H3 H1 V2 H1 D3"
    ]),
    createRound("R02", "easy", [
      "H1 H3 H3 H3 V2", "D3 V2 H1 H3 D3", "D1 D1 D3 D3 D1",
      "V2 D1 H1 D3 H3", "V2 H1 D3 H3 D1", "H1 H1 H3 D1 V2"
    ]),
    createRound("R03", "easy", [
      "V2 D3 H1 H3 D3", "H3 D3 H1 D1 V2", "D1 D3 D1 V2 H1",
      "D1 H1 D1 V2 H3", "H1 H1 H3 D1 H3", "V2 D3 D3 H3 D1"
    ]),
    createRound("R04", "easy", [
      "D1 H3 D1 V2 H3", "D3 D1 V2 H1 H1", "D1 H1 D3 H3 H1",
      "H3 V2 D1 D3 H3", "D1 H1 V2 H1 D3", "D3 D3 H3 V2 D3"
    ]),
    createRound("R05", "medium", [
      "V3 V3 V2 V1 H2", "V1 V1 H2 D2 D2", "V2 H2 D2 D2 V2",
      "V3 V1 V1 V3 V1", "H2 H2 H2 V2 D2", "V3 V2 D2 D2 V3"
    ]),
    createRound("R06", "medium", [
      "D2 V3 V3 V3 H2", "V2 D2 V1 V2 D2", "H2 V1 V3 V1 H2",
      "D2 V3 V2 H2 V2", "H2 V3 V1 D2 H2", "V1 D2 V1 V2 V1"
    ]),
    createRound("R07", "medium", [
      "H2 V2 V1 V1 V3", "V3 H2 H2 H2 D2", "V3 V2 D2 D2 V3",
      "V2 D2 V1 V3 V3", "V1 D2 D2 H2 V2", "V3 V1 H2 V1 V2"
    ]),
    createRound("R08", "medium", [
      "V1 H2 V3 V3 V2", "D2 V1 H2 V1 V2", "V3 H2 D2 V2 D2",
      "V3 D2 V3 H2 V1", "H2 V2 D2 H2 D2", "V1 H2 V2 V3 V1"
    ]),
    createRound("R09", "hard", [
      "V2 V1 V1 V3 H2", "V1 H2 V2 D2 V3", "V3 V3 H2 V1 D2",
      "D2 V2 V3 H2 V1", "V3 V1 V2 D2 V3", "V2 V1 D2 H2 H2"
    ]),
    createRound("R10", "hard", [
      "V1 H2 V1 V2 D2", "V1 V3 V3 D2 V3", "V2 V3 V1 D2 V2",
      "V3 H2 V1 D2 H2", "V2 H2 V3 H2 D2", "H2 V1 H2 V3 V2"
    ]),
    createRound("R11", "hard", [
      "V3 D2 V2 V3 D2", "H2 V1 V1 V2 D2", "V3 V3 V1 D2 D2",
      "H2 V1 V2 H2 V1", "H2 H2 D2 V2 V1", "V3 V2 V1 V3 D2"
    ]),
    createRound("R12", "hard", [
      "V1 V3 D2 H2 V1", "V2 V3 D2 V3 V3", "H2 V2 D2 V3 H2",
      "V2 V1 D2 V1 V2", "D2 D2 V1 H2 V3", "D2 H2 H2 V2 V1"
    ])
  ]);

  const reserveRounds = Object.freeze([
    createRound("R13", "easy", [
      "H1 D1 V2 D1 H3", "D1 V2 D3 D1 H1", "D1 H1 D3 H3 V2",
      "D1 D3 H3 H3 H1", "H1 D3 H3 V2 H1", "D3 H1 D3 V2 H3"
    ]),
    createRound("R14", "easy", [
      "V2 D1 H1 D3 H3", "D3 D1 H1 H3 H3", "V2 H3 D3 H1 D3",
      "D3 V2 H3 D1 D1", "H1 V2 H3 D1 H1", "D1 H1 H3 D3 V2"
    ]),
    createRound("R15", "medium", [
      "D2 V3 V1 D2 V2", "V3 H2 H2 V2 V3", "H2 D2 V3 V2 V1",
      "H2 D2 V1 H2 V2", "D2 D2 V1 V3 V1", "V3 V2 V1 H2 D2"
    ]),
    createRound("R16", "medium", [
      "D2 V2 V1 V3 H2", "D2 H2 D2 V3 V2", "V1 V3 V1 V1 D2",
      "V2 H2 H2 V3 H2", "D2 V1 V2 V1 D2", "H2 V1 V2 V3 V3"
    ]),
    createRound("R17", "hard", [
      "H2 V3 D2 V2 V1", "V1 V3 V2 H2 V3", "V1 H2 D2 V3 H2",
      "V3 H2 V2 V1 D2", "V2 V3 H2 V1 V3", "V2 V1 D2 D2 V1"
    ]),
    createRound("R18", "hard", [
      "V3 V3 H2 H2 V1", "V2 D2 D2 V1 V1", "V3 V2 D2 H2 V2",
      "V1 V1 H2 V1 V3", "H2 D2 D2 D2 V2", "D2 V3 V3 V3 V2"
    ])
  ]);

  window.COGNITIVE_ATTENTION_DATA = Object.freeze({
    targetCode: TARGET_CODE,
    targetDescription: "verticale lijn met exact twee stippen",
    practiceRounds,
    operationalRounds,
    reserveRounds,
    roundDurationMs: 20000
  });

  window.COGNITIVE_BATTERY_MODULES = window.COGNITIVE_BATTERY_MODULES || {};
  window.COGNITIVE_BATTERY_MODULES.attentionWorkingMemory = Object.freeze({
    id: "attentionWorkingMemory",
    title: "Aandacht en werkgeheugen",
    shortTitle: "Aandacht en werkgeheugen",
    description: "Visuele doelselectie en voorwaartse en achterwaartse ruimtelijke reeksen.",
    estimatedTime: "Ongeveer 13 tot 16 minuten",
    blockId: "block-3",
    order: 5,
    availability: "available",
    statusLabel: "Beschikbaar",
    itemStatus: "operational",
    operationalItemCount: 26,
    scoringVersion: 1,
    instruction:
      "Voer aandacht en werkgeheugen afzonderlijk uit. De resultaten blijven gescheiden en vormen geen gecombineerde totaalscore.",
    purpose: [
      "Visuele doelen tussen gelijkende afleiders selecteren",
      "Korte ruimtelijke reeksen in dezelfde volgorde reproduceren",
      "Ruimtelijke reeksen tijdelijk vasthouden en omgekeerd reproduceren"
    ],
    boundaries:
      "Deze module stelt geen medische diagnose en meet geen ADHD, algemene intelligentie of langetermijngeheugen.",
    subtasks: ["attention", "workingMemory"]
  });
})();
