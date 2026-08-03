"use strict";

window.COGNITIVE_BATTERY_MODULES = window.COGNITIVE_BATTERY_MODULES || {};
window.COGNITIVE_BATTERY_MODULES.numerical = Object.freeze({
  id: "numerical",
  title: "Numeriek redeneren",
  shortTitle: "Numeriek",
  description: "Numerieke patronen, regels, verhoudingen en data-interpretatie.",
  estimatedTime: "Ongeveer 15 minuten",
  blockId: "block-1",
  order: 1,
  availability: "available",
  statusLabel: "Beschikbaar",
  itemStatus: "operational",
  operationalItemCount: 15,
  reserveItemCount: 9,
  scoringVersion: 1,
  instruction:
    "Kies bij iedere opgave het antwoord dat de numerieke regel of de gegevens het best aanvult. Je mag teruggaan en antwoorden wijzigen.",
  purpose: [
    "Numerieke patronen en cijferreeksen herkennen",
    "Regels in numerieke matrices afleiden",
    "Percentages, verhoudingen en tabellen interpreteren"
  ],
  boundaries:
    "Deze module is geen rekentoets op schoolniveau en bevat geen calculus, goniometrie of ingewikkelde algebra.",
  subtypes: [
    {
      id: "series",
      label: "Cijferreeksen en patronen",
      description: "Opeenvolgende numerieke veranderingen en gecombineerde reeksregels herkennen."
    },
    {
      id: "matrices",
      label: "Numerieke matrices en regels",
      description: "De relatie tussen getallen binnen rijen en kolommen afleiden."
    },
    {
      id: "data",
      label: "Verhoudingen en data-interpretatie",
      description: "Percentages, verhoudingen en tabelgegevens correct vergelijken."
    }
  ],
  exercises: [
    {
      id: "NP01",
      text: "Welk getal volgt logisch in de reeks?",
      stimulus: {
        type: "sequence",
        values: ["2", "4", "6", "8", "?"]
      },
      choices: [
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" }
      ],
      correctAnswer: "10",
      explanation: "De reeks stijgt telkens met 2: 2, 4, 6, 8, 10."
    },
    {
      id: "NP02",
      text: "Welk getal volgt logisch in de reeks?",
      stimulus: {
        type: "sequence",
        values: ["10", "20", "30", "40", "?"]
      },
      choices: [
        { value: "45", label: "45" },
        { value: "50", label: "50" },
        { value: "55", label: "55" },
        { value: "60", label: "60" }
      ],
      correctAnswer: "50",
      explanation: "De reeks stijgt telkens met 10."
    }
  ],
  items: [
    {
      id: "N01",
      difficulty: "easy",
      subtypeId: "series",
      category: "Cijferreeks",
      text: "Welk getal volgt logisch in de reeks?",
      stimulus: { type: "sequence", values: ["3", "6", "9", "12", "?"] },
      choices: [
        { value: "15", label: "15" },
        { value: "14", label: "14" },
        { value: "16", label: "16" },
        { value: "18", label: "18" }
      ],
      correctAnswer: "15"
    },
    {
      id: "N03",
      difficulty: "easy",
      subtypeId: "series",
      category: "Cijferreeks",
      text: "Welk getal volgt logisch in de reeks?",
      stimulus: { type: "sequence", values: ["5", "8", "12", "17", "?"] },
      choices: [
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" }
      ],
      correctAnswer: "23"
    },
    {
      id: "N05",
      difficulty: "easy",
      subtypeId: "series",
      category: "Cijferreeks",
      text: "Welk getal volgt logisch in de reeks?",
      stimulus: { type: "sequence", values: ["3", "5", "10", "12", "24", "?"] },
      choices: [
        { value: "25", label: "25" },
        { value: "28", label: "28" },
        { value: "48", label: "48" },
        { value: "26", label: "26" }
      ],
      correctAnswer: "26"
    },
    {
      id: "N06",
      difficulty: "easy",
      subtypeId: "matrices",
      category: "Numerieke matrix",
      text: "Welk getal hoort op de lege plaats?",
      stimulus: {
        type: "matrix",
        rows: [["2", "3", "5"], ["4", "6", "10"], ["7", "8", "?"]]
      },
      choices: [
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "13", label: "13" },
        { value: "16", label: "16" }
      ],
      correctAnswer: "15"
    },
    {
      id: "N07",
      difficulty: "easy",
      subtypeId: "data",
      category: "Percentage",
      text: "Een team verwerkt in januari 40 dossiers en in februari 50 dossiers. Met hoeveel procent is het aantal dossiers gestegen?",
      stimulus: null,
      choices: [
        { value: "10%", label: "10%" },
        { value: "20%", label: "20%" },
        { value: "40%", label: "40%" },
        { value: "25%", label: "25%" }
      ],
      correctAnswer: "25%"
    },
    {
      id: "N09",
      difficulty: "medium",
      subtypeId: "series",
      category: "Cijferreeks",
      text: "Welk getal volgt logisch in de reeks?",
      stimulus: { type: "sequence", values: ["4", "7", "14", "17", "34", "?"] },
      choices: [
        { value: "36", label: "36" },
        { value: "40", label: "40" },
        { value: "37", label: "37" },
        { value: "68", label: "68" }
      ],
      correctAnswer: "37"
    },
    {
      id: "N11",
      difficulty: "medium",
      subtypeId: "series",
      category: "Cijferreeks",
      text: "Welk getal volgt logisch in de reeks?",
      stimulus: { type: "sequence", values: ["2", "6", "12", "20", "30", "?"] },
      choices: [
        { value: "38", label: "38" },
        { value: "42", label: "42" },
        { value: "40", label: "40" },
        { value: "44", label: "44" }
      ],
      correctAnswer: "42"
    },
    {
      id: "N13",
      difficulty: "medium",
      subtypeId: "matrices",
      category: "Numerieke matrix",
      text: "Welk getal hoort op de lege plaats?",
      stimulus: {
        type: "matrix",
        rows: [["3", "5", "16"], ["4", "6", "25"], ["5", "7", "?"]]
      },
      choices: [
        { value: "34", label: "34" },
        { value: "36", label: "36" },
        { value: "30", label: "30" },
        { value: "35", label: "35" }
      ],
      correctAnswer: "36"
    },
    {
      id: "N14",
      difficulty: "medium",
      subtypeId: "data",
      category: "Tabelinterpretatie",
      text: "Welke productielijn heeft procentueel het grootste aandeel goedgekeurde producten?",
      stimulus: {
        type: "table",
        headers: ["Productielijn", "Geproduceerd", "Afgekeurd"],
        rows: [["A", "250", "10"], ["B", "230", "7"], ["C", "180", "4"]]
      },
      choices: [
        { value: "C", label: "Productielijn C" },
        { value: "A", label: "Productielijn A" },
        { value: "B", label: "Productielijn B" },
        { value: "equal", label: "Alle productielijnen zijn gelijk" }
      ],
      correctAnswer: "C"
    },
    {
      id: "N15",
      difficulty: "medium",
      subtypeId: "data",
      category: "Samengesteld percentage",
      text: "Een product kost €80. De prijs stijgt eerst met 15% en daalt daarna met 10%. Wat is de nieuwe prijs?",
      stimulus: null,
      choices: [
        { value: "80.00", label: "€80,00" },
        { value: "82.80", label: "€82,80" },
        { value: "82.00", label: "€82,00" },
        { value: "84.00", label: "€84,00" }
      ],
      correctAnswer: "82.80"
    },
    {
      id: "N18",
      difficulty: "hard",
      subtypeId: "series",
      category: "Cijferreeks",
      text: "Welk getal volgt logisch in de reeks?",
      stimulus: { type: "sequence", values: ["2", "10", "4", "20", "8", "40", "?"] },
      choices: [
        { value: "12", label: "12" },
        { value: "60", label: "60" },
        { value: "16", label: "16" },
        { value: "80", label: "80" }
      ],
      correctAnswer: "16"
    },
    {
      id: "N19",
      difficulty: "hard",
      subtypeId: "series",
      category: "Cijferreeks",
      text: "Welk getal volgt logisch in de reeks?",
      stimulus: { type: "sequence", values: ["2", "5", "11", "23", "47", "?"] },
      choices: [
        { value: "71", label: "71" },
        { value: "94", label: "94" },
        { value: "95", label: "95" },
        { value: "96", label: "96" }
      ],
      correctAnswer: "95"
    },
    {
      id: "N20",
      difficulty: "hard",
      subtypeId: "matrices",
      category: "Numerieke matrix",
      text: "Welk getal hoort op de lege plaats?",
      stimulus: {
        type: "matrix",
        rows: [["2", "3", "8"], ["4", "5", "24"], ["6", "7", "?"]]
      },
      choices: [
        { value: "48", label: "48" },
        { value: "42", label: "42" },
        { value: "46", label: "46" },
        { value: "54", label: "54" }
      ],
      correctAnswer: "48"
    },
    {
      id: "N21",
      difficulty: "hard",
      subtypeId: "data",
      category: "Procentuele vergelijking",
      text: "Welke afdeling overschrijdt haar budget procentueel het meest?",
      stimulus: {
        type: "table",
        headers: ["Afdeling", "Budget", "Werkelijke kosten"],
        rows: [["A", "€120.000", "€132.000"], ["B", "€80.000", "€92.000"], ["C", "€200.000", "€216.000"]]
      },
      choices: [
        { value: "B", label: "Afdeling B" },
        { value: "A", label: "Afdeling A" },
        { value: "C", label: "Afdeling C" },
        { value: "A-and-B", label: "Afdeling A en B zijn gelijk" }
      ],
      correctAnswer: "B"
    },
    {
      id: "N23",
      difficulty: "hard",
      subtypeId: "data",
      category: "Samengestelde percentages",
      text: "Product A stijgt 20% en daalt daarna 20%. Product B stijgt 10% en daalt daarna 5%. Beide starten op €100. Welke conclusie is correct?",
      stimulus: null,
      choices: [
        { value: "both-100", label: "Beide producten eindigen op €100" },
        { value: "a-higher", label: "Product A eindigt hoger" },
        { value: "b-4.50", label: "Product B eindigt €4,50 hoger" },
        { value: "b-8.50", label: "Product B eindigt €8,50 hoger" }
      ],
      correctAnswer: "b-8.50"
    }
  ]
});
