"use strict";

(function registerAbstractLogicalModule() {
  function element(kind, x, y, size = 22, filled = false, rotation = 0) {
    return { kind, x, y, size, filled, rotation };
  }

  function panel(elements, label = "Abstracte figuur") {
    return { elements, label };
  }

  function unknown(label = "Ontbrekende figuur") {
    return { unknown: true, label };
  }

  function repeated(kind, count, filled = false, rotation = 0, centerX = 50, centerY = 50, size = 20, spacing = 24) {
    const startX = centerX - ((count - 1) * spacing) / 2;
    return panel(
      Array.from({ length: count }, (_, index) =>
        element(kind, startX + index * spacing, centerY, size, filled, rotation)
      ),
      `${count} ${filled ? "gevulde" : "omlijnde"} ${kind === "circle" ? "cirkels" : kind === "square" ? "vierkanten" : "driehoeken"}`
    );
  }

  const CORNERS = Object.freeze({
    TL: [27, 27],
    TR: [73, 27],
    BL: [27, 73],
    BR: [73, 73]
  });

  function cornerPanel(positionIds, label) {
    return panel(
      positionIds.map(positionId => {
        const [x, y] = CORNERS[positionId];
        return element("circle", x, y, 18, false, 0);
      }),
      label || `Cirkels op ${positionIds.join(", ")}`
    );
  }

  function shapePanel(kind, filled = false, rotation = 0, count = 1, label) {
    const result = repeated(kind, count, filled, rotation, 50, 50, count === 1 ? 34 : 21, count === 1 ? 0 : 24);
    result.label = label || result.label;
    return result;
  }

  function groupedCircles(count, filled, zone) {
    const centerX = { left: 24, middle: 50, right: 76 }[zone];
    return repeated("circle", count, filled, 0, centerX, 50, 14, 15);
  }

  function nestedPanel(outerKind, innerKind, innerFilled, options = {}) {
    return panel([
      element(outerKind, 50, 50, options.outerSize || 58, Boolean(options.outerFilled), options.outerRotation || 0),
      element(innerKind, 50, 50, options.innerSize || 25, innerFilled, options.innerRotation || 0)
    ], options.label || `${outerKind} met ${innerFilled ? "gevulde" : "omlijnde"} ${innerKind}`);
  }

  function visualChoice(value, visual, ariaLabel) {
    return {
      value,
      label: "Antwoordfiguur",
      ariaLabel,
      visual
    };
  }

  window.COGNITIVE_BATTERY_MODULES = window.COGNITIVE_BATTERY_MODULES || {};
  window.COGNITIVE_BATTERY_MODULES.abstractLogical = Object.freeze({
    id: "abstractLogical",
    title: "Abstract en logisch redeneren",
    shortTitle: "Abstract-logisch",
    description: "Visuele reeksen, matrixpatronen en logische combinaties van abstracte kenmerken.",
    estimatedTime: "Ongeveer 15 minuten",
    blockId: "block-2",
    order: 3,
    availability: "available",
    statusLabel: "Beschikbaar",
    itemStatus: "operational",
    operationalItemCount: 15,
    reserveItemCount: 9,
    scoringVersion: 1,
    instruction:
      "Bekijk de figuren en zoek de regel die het patroon bepaalt. Kies de antwoordfiguur die de reeks of matrix logisch aanvult.",
    purpose: [
      "Veranderingen in aantal, richting, positie en vulling herkennen",
      "Analogieën en onafhankelijke matrixregels afleiden",
      "Elementen samenvoegen, vergelijken, verwijderen of combineren"
    ],
    boundaries:
      "Deze module gebruikt abstracte tweedimensionale regels. Complexe mentale rotatie en driedimensionale objecten horen bij ruimtelijk redeneren.",
    subtypes: [
      {
        id: "sequences",
        label: "Reeksen en transformaties",
        description: "Veranderingen in aantal, richting, positie en vulling doorheen een reeks herkennen."
      },
      {
        id: "matrices",
        label: "Analogieën en matrixpatronen",
        description: "Overeenkomstige relaties en onafhankelijke rij- en kolomregels afleiden."
      },
      {
        id: "elementLogic",
        label: "Elementlogica en kenmerkcombinatie",
        description: "Samenvoegen, doorsnede, aftrekken, XOR en kenmerkoverdracht toepassen."
      }
    ],
    exercises: [
      {
        id: "AP01",
        text: "Welke figuur volgt logisch in de reeks?",
        stimulus: {
          type: "visual-sequence",
          panels: [
            shapePanel("circle", false, 0, 1, "Omlijnde cirkel"),
            shapePanel("circle", true, 0, 1, "Gevulde cirkel"),
            shapePanel("circle", false, 0, 1, "Omlijnde cirkel"),
            unknown()
          ]
        },
        choices: [
          visualChoice("outline", shapePanel("circle", false), "Omlijnde cirkel"),
          visualChoice("filled", shapePanel("circle", true), "Gevulde cirkel"),
          visualChoice("square", shapePanel("square", false), "Omlijnd vierkant"),
          visualChoice("two", repeated("circle", 2, true), "Twee gevulde cirkels")
        ],
        correctAnswer: "filled",
        explanation: "De vulling wisselt telkens tussen omlijnd en gevuld."
      },
      {
        id: "AP02",
        text: "Welke figuur volgt logisch in de reeks?",
        stimulus: {
          type: "visual-sequence",
          panels: [
            repeated("square", 1, false),
            repeated("square", 2, false),
            repeated("square", 3, false),
            unknown()
          ]
        },
        choices: [
          visualChoice("three", repeated("square", 3, false), "Drie omlijnde vierkanten"),
          visualChoice("four", repeated("square", 4, false, 0, 50, 50, 17, 20), "Vier omlijnde vierkanten"),
          visualChoice("four-filled", repeated("square", 4, true, 0, 50, 50, 17, 20), "Vier gevulde vierkanten"),
          visualChoice("two", repeated("square", 2, false), "Twee omlijnde vierkanten")
        ],
        correctAnswer: "four",
        explanation: "Bij iedere stap wordt één omlijnd vierkant toegevoegd."
      }
    ],
    items: [
      {
        id: "A01",
        difficulty: "easy",
        subtypeId: "sequences",
        category: "Aantal en vulling",
        text: "Welke figuur volgt logisch in de reeks?",
        stimulus: {
          type: "visual-sequence",
          panels: [
            repeated("circle", 1, false),
            repeated("circle", 2, true),
            repeated("circle", 3, false),
            repeated("circle", 1, true),
            repeated("circle", 2, false),
            unknown()
          ]
        },
        choices: [
          visualChoice("two-filled", repeated("circle", 2, true), "Twee gevulde cirkels"),
          visualChoice("three-outline", repeated("circle", 3, false), "Drie omlijnde cirkels"),
          visualChoice("one-filled", repeated("circle", 1, true), "Eén gevulde cirkel"),
          visualChoice("three-filled", repeated("circle", 3, true), "Drie gevulde cirkels")
        ],
        correctAnswer: "three-filled"
      },
      {
        id: "A03",
        difficulty: "easy",
        subtypeId: "sequences",
        category: "Toenemend aantal",
        text: "Welke figuur volgt logisch in de reeks?",
        stimulus: {
          type: "visual-sequence",
          panels: [
            repeated("circle", 1, false),
            repeated("circle", 2, false),
            repeated("circle", 3, false),
            repeated("circle", 4, false, 0, 50, 50, 17, 20),
            unknown()
          ]
        },
        choices: [
          visualChoice("five", repeated("circle", 5, false, 0, 50, 50, 15, 17), "Vijf omlijnde cirkels"),
          visualChoice("four", repeated("circle", 4, false, 0, 50, 50, 17, 20), "Vier omlijnde cirkels"),
          visualChoice("six", repeated("circle", 6, false, 0, 50, 50, 13, 15), "Zes omlijnde cirkels"),
          visualChoice("three", repeated("circle", 3, false), "Drie omlijnde cirkels")
        ],
        correctAnswer: "five"
      },
      {
        id: "A04",
        difficulty: "easy",
        subtypeId: "matrices",
        category: "Visuele analogie",
        text: "Welke figuur hoort op de lege plaats?",
        stimulus: {
          type: "visual-matrix",
          columns: 2,
          panels: [
            shapePanel("circle", false),
            shapePanel("circle", true),
            shapePanel("triangle", false, 0),
            unknown()
          ]
        },
        choices: [
          visualChoice("filled-square", shapePanel("square", true), "Gevuld vierkant"),
          visualChoice("filled-triangle", shapePanel("triangle", true), "Gevulde driehoek"),
          visualChoice("outline-triangle", shapePanel("triangle", false), "Omlijnde driehoek"),
          visualChoice("filled-circle", shapePanel("circle", true), "Gevulde cirkel")
        ],
        correctAnswer: "filled-triangle"
      },
      {
        id: "A06",
        difficulty: "easy",
        subtypeId: "matrices",
        category: "Visuele analogie",
        text: "Welke figuur hoort op de lege plaats?",
        stimulus: {
          type: "visual-matrix",
          columns: 2,
          panels: [
            repeated("circle", 1, false),
            repeated("circle", 3, false),
            repeated("square", 1, false),
            unknown()
          ]
        },
        choices: [
          visualChoice("three-squares", repeated("square", 3, false), "Drie omlijnde vierkanten"),
          visualChoice("two-squares", repeated("square", 2, false), "Twee omlijnde vierkanten"),
          visualChoice("three-circles", repeated("circle", 3, false), "Drie omlijnde cirkels"),
          visualChoice("four-squares", repeated("square", 4, false, 0, 50, 50, 17, 20), "Vier omlijnde vierkanten")
        ],
        correctAnswer: "three-squares"
      },
      {
        id: "A08",
        difficulty: "easy",
        subtypeId: "matrices",
        category: "Matrixpatroon",
        text: "Welke figuur hoort op de lege plaats?",
        stimulus: {
          type: "visual-matrix",
          columns: 3,
          panels: [
            repeated("circle", 1, false), repeated("circle", 2, false), repeated("circle", 3, false),
            repeated("triangle", 1, false), repeated("triangle", 2, false), repeated("triangle", 3, false),
            repeated("square", 1, false), repeated("square", 2, false), unknown()
          ]
        },
        choices: [
          visualChoice("two-squares", repeated("square", 2, false), "Twee omlijnde vierkanten"),
          visualChoice("three-triangles", repeated("triangle", 3, false), "Drie omlijnde driehoeken"),
          visualChoice("four-squares", repeated("square", 4, false, 0, 50, 50, 17, 20), "Vier omlijnde vierkanten"),
          visualChoice("three-squares", repeated("square", 3, false), "Drie omlijnde vierkanten")
        ],
        correctAnswer: "three-squares"
      },
      {
        id: "A09",
        difficulty: "medium",
        subtypeId: "sequences",
        category: "Rotatie en vulling",
        text: "Welke figuur volgt logisch in de reeks?",
        stimulus: {
          type: "visual-sequence",
          panels: [
            shapePanel("triangle", false, 0),
            shapePanel("triangle", true, 90),
            shapePanel("triangle", false, 180),
            shapePanel("triangle", true, 270),
            unknown()
          ]
        },
        choices: [
          visualChoice("filled-up", shapePanel("triangle", true, 0), "Gevulde driehoek omhoog"),
          visualChoice("outline-up", shapePanel("triangle", false, 0), "Omlijnde driehoek omhoog"),
          visualChoice("outline-right", shapePanel("triangle", false, 90), "Omlijnde driehoek naar rechts"),
          visualChoice("filled-right", shapePanel("triangle", true, 90), "Gevulde driehoek naar rechts")
        ],
        correctAnswer: "outline-up"
      },
      {
        id: "A11",
        difficulty: "medium",
        subtypeId: "elementLogic",
        category: "Samenvoegen",
        text: "In iedere rij worden de posities uit de eerste twee vakken samengevoegd. Welke figuur hoort op de lege plaats?",
        stimulus: {
          type: "visual-matrix",
          columns: 3,
          panels: [
            cornerPanel(["TL"]), cornerPanel(["BR"]), cornerPanel(["TL", "BR"]),
            cornerPanel(["TR"]), cornerPanel(["BL"]), cornerPanel(["TR", "BL"]),
            cornerPanel(["TL", "BL"]), cornerPanel(["TR"]), unknown()
          ]
        },
        choices: [
          visualChoice("tl-bl", cornerPanel(["TL", "BL"]), "Cirkels linksboven en linksonder"),
          visualChoice("tr", cornerPanel(["TR"]), "Cirkel rechtsboven"),
          visualChoice("tl-tr-bl", cornerPanel(["TL", "TR", "BL"]), "Cirkels linksboven, rechtsboven en linksonder"),
          visualChoice("all", cornerPanel(["TL", "TR", "BL", "BR"]), "Cirkels op alle vier de hoeken")
        ],
        correctAnswer: "tl-tr-bl"
      },
      {
        id: "A13",
        difficulty: "medium",
        subtypeId: "matrices",
        category: "Cyclische matrix",
        text: "Welke figuur hoort op de lege plaats?",
        stimulus: {
          type: "visual-matrix",
          columns: 3,
          panels: [
            shapePanel("circle"), shapePanel("triangle"), shapePanel("square"),
            shapePanel("square"), shapePanel("circle"), shapePanel("triangle"),
            shapePanel("triangle"), shapePanel("square"), unknown()
          ]
        },
        choices: [
          visualChoice("square", shapePanel("square"), "Omlijnd vierkant"),
          visualChoice("triangle", shapePanel("triangle"), "Omlijnde driehoek"),
          visualChoice("circle", shapePanel("circle"), "Omlijnde cirkel"),
          visualChoice("diamond", shapePanel("diamond"), "Omlijnde ruit")
        ],
        correctAnswer: "circle"
      },
      {
        id: "A14",
        difficulty: "medium",
        subtypeId: "sequences",
        category: "Aantal, positie en vulling",
        text: "Welke figuur volgt logisch in de reeks?",
        stimulus: {
          type: "visual-sequence",
          panels: [
            groupedCircles(1, false, "left"),
            groupedCircles(2, false, "middle"),
            groupedCircles(3, false, "right"),
            groupedCircles(1, true, "left"),
            groupedCircles(2, true, "middle"),
            unknown()
          ]
        },
        choices: [
          visualChoice("outline-right", groupedCircles(3, false, "right"), "Drie omlijnde cirkels rechts"),
          visualChoice("two-filled-right", groupedCircles(2, true, "right"), "Twee gevulde cirkels rechts"),
          visualChoice("three-filled-left", groupedCircles(3, true, "left"), "Drie gevulde cirkels links"),
          visualChoice("three-filled-right", groupedCircles(3, true, "right"), "Drie gevulde cirkels rechts")
        ],
        correctAnswer: "three-filled-right"
      },
      {
        id: "A16",
        difficulty: "medium",
        subtypeId: "elementLogic",
        category: "Doorsnede",
        text: "In iedere rij blijven alleen de posities staan die in beide eerste vakken voorkomen. Welke figuur hoort op de lege plaats?",
        stimulus: {
          type: "visual-matrix",
          columns: 3,
          panels: [
            cornerPanel(["TL", "TR"]), cornerPanel(["TR", "BR"]), cornerPanel(["TR"]),
            cornerPanel(["BL", "BR"]), cornerPanel(["TL", "BL"]), cornerPanel(["BL"]),
            cornerPanel(["TL", "BR"]), cornerPanel(["TR", "BR"]), unknown()
          ]
        },
        choices: [
          visualChoice("tl", cornerPanel(["TL"]), "Cirkel linksboven"),
          visualChoice("br", cornerPanel(["BR"]), "Cirkel rechtsonder"),
          visualChoice("tr-br", cornerPanel(["TR", "BR"]), "Cirkels rechtsboven en rechtsonder"),
          visualChoice("empty", panel([], "Leeg paneel"), "Leeg paneel")
        ],
        correctAnswer: "br"
      },
      {
        id: "A17",
        difficulty: "hard",
        subtypeId: "elementLogic",
        category: "Gericht aftrekken",
        text: "In iedere rij worden de posities uit het tweede vak verwijderd uit het eerste vak. Welke figuur hoort op de lege plaats?",
        stimulus: {
          type: "visual-matrix",
          columns: 3,
          panels: [
            cornerPanel(["TL", "TR", "BR"]), cornerPanel(["TR"]), cornerPanel(["TL", "BR"]),
            cornerPanel(["TL", "BL", "BR"]), cornerPanel(["TL", "BR"]), cornerPanel(["BL"]),
            cornerPanel(["TL", "TR", "BL", "BR"]), cornerPanel(["TR", "BL"]), unknown()
          ]
        },
        choices: [
          visualChoice("tl-br", cornerPanel(["TL", "BR"]), "Cirkels linksboven en rechtsonder"),
          visualChoice("all", cornerPanel(["TL", "TR", "BL", "BR"]), "Cirkels op alle vier de hoeken"),
          visualChoice("tr-bl", cornerPanel(["TR", "BL"]), "Cirkels rechtsboven en linksonder"),
          visualChoice("empty", panel([], "Leeg paneel"), "Leeg paneel")
        ],
        correctAnswer: "tl-br"
      },
      {
        id: "A19",
        difficulty: "hard",
        subtypeId: "sequences",
        category: "Drie gelijktijdige regels",
        text: "Welke figuur volgt logisch in de reeks?",
        stimulus: {
          type: "visual-sequence",
          panels: [
            shapePanel("triangle", false, 0, 1),
            shapePanel("triangle", true, 90, 2),
            shapePanel("triangle", false, 180, 3),
            shapePanel("triangle", true, 270, 1),
            shapePanel("triangle", false, 0, 2),
            unknown()
          ]
        },
        choices: [
          visualChoice("three-filled-right", shapePanel("triangle", true, 90, 3), "Drie gevulde driehoeken naar rechts"),
          visualChoice("three-outline-right", shapePanel("triangle", false, 90, 3), "Drie omlijnde driehoeken naar rechts"),
          visualChoice("two-filled-right", shapePanel("triangle", true, 90, 2), "Twee gevulde driehoeken naar rechts"),
          visualChoice("three-filled-down", shapePanel("triangle", true, 180, 3), "Drie gevulde driehoeken omlaag")
        ],
        correctAnswer: "three-filled-right"
      },
      {
        id: "A20",
        difficulty: "hard",
        subtypeId: "matrices",
        category: "Meervoudig matrixpatroon",
        text: "Welke figuur hoort op de lege plaats?",
        stimulus: {
          type: "visual-matrix",
          columns: 3,
          panels: [
            shapePanel("triangle", false, 0, 1), shapePanel("triangle", true, 90, 2), shapePanel("triangle", false, 180, 3),
            shapePanel("triangle", true, 90, 2), shapePanel("triangle", false, 180, 3), shapePanel("triangle", true, 270, 1),
            shapePanel("triangle", false, 180, 3), shapePanel("triangle", true, 270, 1), unknown()
          ]
        },
        choices: [
          visualChoice("two-filled-up", shapePanel("triangle", true, 0, 2), "Twee gevulde driehoeken omhoog"),
          visualChoice("two-outline-right", shapePanel("triangle", false, 90, 2), "Twee omlijnde driehoeken naar rechts"),
          visualChoice("two-outline-up", shapePanel("triangle", false, 0, 2), "Twee omlijnde driehoeken omhoog"),
          visualChoice("one-outline-up", shapePanel("triangle", false, 0, 1), "Eén omlijnde driehoek omhoog")
        ],
        correctAnswer: "two-outline-up"
      },
      {
        id: "A22",
        difficulty: "hard",
        subtypeId: "elementLogic",
        category: "Kenmerkcombinatie",
        text: "De derde figuur van iedere rij combineert kenmerken uit de eerste twee figuren. Welke figuur hoort op de lege plaats?",
        stimulus: {
          type: "visual-matrix",
          columns: 3,
          panels: [
            nestedPanel("circle", "square", true), nestedPanel("triangle", "diamond", false), nestedPanel("circle", "diamond", true),
            nestedPanel("square", "circle", false), nestedPanel("diamond", "triangle", true), nestedPanel("square", "triangle", false),
            nestedPanel("triangle", "circle", true), nestedPanel("circle", "square", false), unknown()
          ]
        },
        choices: [
          visualChoice("outline-inner", nestedPanel("triangle", "square", false), "Omlijnde driehoek met omlijnd vierkant"),
          visualChoice("circle-outer", nestedPanel("circle", "square", true), "Omlijnde cirkel met gevuld vierkant"),
          visualChoice("correct", nestedPanel("triangle", "square", true), "Omlijnde driehoek met gevuld vierkant"),
          visualChoice("filled-outer", nestedPanel("triangle", "square", true, { outerFilled: true }), "Gevulde driehoek met gevuld vierkant")
        ],
        correctAnswer: "correct"
      },
      {
        id: "A24",
        difficulty: "hard",
        subtypeId: "elementLogic",
        category: "XOR-relatie",
        text: "Een positie blijft alleen bestaan wanneer ze in precies één van de twee vergelijkingsvakken voorkomt. Welke figuur hoort op de lege plaats?",
        stimulus: {
          type: "visual-matrix",
          columns: 3,
          panels: [
            cornerPanel(["TL", "TR"]), cornerPanel(["TR", "BR"]), cornerPanel(["TL", "BR"]),
            cornerPanel(["TL", "BL"]), cornerPanel(["BL", "BR"]), cornerPanel(["TL", "BR"]),
            cornerPanel(["TR", "BL"]), cornerPanel(["TR", "BL"]), unknown()
          ]
        },
        choices: [
          visualChoice("tr-bl", cornerPanel(["TR", "BL"]), "Cirkels rechtsboven en linksonder"),
          visualChoice("all", cornerPanel(["TL", "TR", "BL", "BR"]), "Cirkels op alle vier de hoeken"),
          visualChoice("tl-br", cornerPanel(["TL", "BR"]), "Cirkels linksboven en rechtsonder"),
          visualChoice("empty", panel([], "Leeg paneel"), "Leeg paneel")
        ],
        correctAnswer: "empty"
      }
    ]
  });
})();
