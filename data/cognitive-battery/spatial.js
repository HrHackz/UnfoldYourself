"use strict";

(function registerSpatialModule() {
  function normalize2D(points) {
    const minX = Math.min(...points.map(point => point.x));
    const minY = Math.min(...points.map(point => point.y));
    return points.map(point => ({ ...point, x: point.x - minX, y: point.y - minY }));
  }

  function transformPolyomino(cells, markers = [], transform) {
    const transformedCells = cells.map(cell => ({ ...transform(cell), source: cell }));
    const minX = Math.min(...transformedCells.map(cell => cell.x));
    const minY = Math.min(...transformedCells.map(cell => cell.y));
    const normalizedCells = transformedCells.map(({ source, ...cell }) => ({
      ...source,
      ...cell,
      x: cell.x - minX,
      y: cell.y - minY
    }));
    const transformedMarkers = markers.map(marker => {
      const point = transform(marker);
      return { ...marker, x: point.x - minX, y: point.y - minY };
    });

    return { cells: normalizedCells, markers: transformedMarkers };
  }

  function rotatePolyomino(cells, markers = [], quarterTurns = 1) {
    let result = { cells: cells.map(cell => ({ ...cell })), markers: markers.map(marker => ({ ...marker })) };
    const turns = ((quarterTurns % 4) + 4) % 4;

    for (let index = 0; index < turns; index += 1) {
      result = transformPolyomino(result.cells, result.markers, point => ({
        x: -point.y,
        y: point.x
      }));
    }

    return result;
  }

  function mirrorPolyomino(cells, markers = []) {
    return transformPolyomino(cells, markers, point => ({ x: -point.x, y: point.y }));
  }

  function polyPanel(cells, markers = [], label = "Blokvorm") {
    return {
      type: "polyomino",
      cells: normalize2D(cells),
      markers: markers.map(marker => ({ ...marker })),
      label
    };
  }

  function polyPanelFromTransform(result, label) {
    return polyPanel(result.cells, result.markers, label);
  }

  function gridBoardPanel(rows, columns, filledCells, label) {
    return {
      type: "grid-board",
      rows,
      columns,
      filledCells: filledCells.map(([x, y]) => ({ x, y })),
      label
    };
  }

  function paperFoldPanel({ folds = [], holes = [], foldedRegion = null, label }) {
    return {
      type: "paper-fold",
      folds,
      holes,
      foldedRegion,
      label
    };
  }

  function paperPatternPanel(holes, label) {
    return {
      type: "paper-pattern",
      holes: holes.map(([x, y]) => ({ x, y })),
      label
    };
  }

  function faceSymbol(kind, options = {}) {
    return {
      kind,
      filled: Boolean(options.filled),
      rotation: Number(options.rotation || 0),
      position: options.position || "center"
    };
  }

  function cubeNetPanel(faces, label) {
    return {
      type: "cube-net",
      faces: faces.map(face => ({ ...face })),
      label
    };
  }

  function symbolPanel(symbol, label) {
    return {
      type: "face-symbol",
      symbol,
      label
    };
  }

  function cubeViewPanel({ top, front, right, label }) {
    return {
      type: "cube-view",
      top,
      front,
      right,
      label
    };
  }

  function normalizeCubes(cubes) {
    const minX = Math.min(...cubes.map(cube => cube.x));
    const minY = Math.min(...cubes.map(cube => cube.y));
    const minZ = Math.min(...cubes.map(cube => cube.z));
    return cubes.map(cube => ({
      ...cube,
      x: cube.x - minX,
      y: cube.y - minY,
      z: cube.z - minZ
    }));
  }

  function rotateCubesZ(cubes, marker, quarterTurns = 1) {
    let rotatedCubes = cubes.map(cube => ({ ...cube }));
    let rotatedMarker = marker ? { ...marker } : null;
    const turns = ((quarterTurns % 4) + 4) % 4;

    for (let index = 0; index < turns; index += 1) {
      rotatedCubes = rotatedCubes.map(cube => ({ ...cube, x: -cube.y, y: cube.x }));
      if (rotatedMarker) {
        rotatedMarker = { ...rotatedMarker, x: -rotatedMarker.y, y: rotatedMarker.x };
      }
      const minX = Math.min(...rotatedCubes.map(cube => cube.x));
      const minY = Math.min(...rotatedCubes.map(cube => cube.y));
      rotatedCubes = rotatedCubes.map(cube => ({ ...cube, x: cube.x - minX, y: cube.y - minY }));
      if (rotatedMarker) {
        rotatedMarker.x -= minX;
        rotatedMarker.y -= minY;
      }
    }

    return { cubes: normalizeCubes(rotatedCubes), marker: rotatedMarker };
  }

  function blockPanel(cubes, marker = null, label = "Blokconstructie", viewer = null) {
    return {
      type: "block-structure",
      cubes: normalizeCubes(cubes),
      marker,
      viewer,
      label
    };
  }

  function columnViewPanel(heights, label) {
    return {
      type: "column-view",
      heights: [...heights],
      label
    };
  }

  function visualChoice(value, visual, ariaLabel) {
    return {
      value,
      label: "Antwoordfiguur",
      ariaLabel,
      visual
    };
  }

  const s01Cells = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 }
  ];
  const s01Markers = [{ x: 0, y: 0, kind: "dot" }];

  const s03Cells = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 2 }
  ];
  const s03Markers = [{ x: 0, y: 0, kind: "ring" }];

  const s09Cells = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 2 }
  ];
  const s09Markers = [{ x: 2, y: 0, kind: "dot" }];

  const s14Cells = [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 0 },
    { x: 0, y: 2 }
  ];
  const s14Markers = [{ x: 2, y: 0, kind: "dot" }];

  const s24Cells = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 2 }
  ];
  const s24Markers = [
    { x: 0, y: 0, kind: "dot" },
    { x: 2, y: 1, kind: "ring" }
  ];

  const s19Cubes = [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 2, y: 0, z: 0 },
    { x: 2, y: 1, z: 0 },
    { x: 2, y: 1, z: 1 }
  ];
  const s19Marker = { x: 0, y: 0, z: 0, face: "top", kind: "dot" };
  const s19Correct = rotateCubesZ(s19Cubes, s19Marker, 1);

  const s20Cubes = [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 1, y: 1, z: 0 },
    { x: 2, y: 1, z: 0 },
    { x: 1, y: 1, z: 1 },
    { x: 2, y: 1, z: 1 }
  ];

  const commonCubeFaces = {
    circle: faceSymbol("circle"),
    triangle: faceSymbol("triangle"),
    square: faceSymbol("square"),
    diamond: faceSymbol("diamond"),
    dot: faceSymbol("dot", { filled: true }),
    ring: faceSymbol("ring"),
    lines: faceSymbol("parallel-lines", { rotation: 0 })
  };

  window.COGNITIVE_BATTERY_MODULES = window.COGNITIVE_BATTERY_MODULES || {};
  window.COGNITIVE_BATTERY_MODULES.spatial = Object.freeze({
    id: "spatial",
    title: "Ruimtelijk redeneren",
    shortTitle: "Ruimtelijk",
    description: "Rotatie, spiegeling, samenstellen, vouwen en driedimensionale oriëntatie.",
    estimatedTime: "Ongeveer 15 minuten",
    blockId: "block-2",
    order: 4,
    availability: "available",
    statusLabel: "Beschikbaar",
    itemStatus: "operational",
    operationalItemCount: 15,
    reserveItemCount: 9,
    scoringVersion: 1,
    instruction:
      "Stel je voor hoe de vorm of het object eruitziet na draaien, spiegelen, samenstellen, vouwen of veranderen van gezichtspunt.",
    purpose: [
      "Vlakke vormen mentaal draaien en spiegelbeelden onderscheiden",
      "Onderdelen combineren en de gevolgen van papier- of kubusvouwen voorspellen",
      "Kubussen en eenvoudige blokconstructies vanuit andere gezichtspunten herkennen"
    ],
    boundaries:
      "Deze module meet ruimtelijke manipulatie. Abstracte matrixregels, schoolse meetkunde en ingewikkelde berekeningen maken geen deel uit van de taak.",
    subtypes: [
      {
        id: "rotation",
        label: "Rotatie en spiegeling",
        description: "Vormen mentaal draaien, markers laten meebewegen en spiegelbeelden onderscheiden."
      },
      {
        id: "assembly",
        label: "Samenstellen en vouwen",
        description: "Ontbrekende onderdelen herkennen en gevolgen van papier- en kubusvouwen voorspellen."
      },
      {
        id: "orientation3d",
        label: "Driedimensionale oriëntatie",
        description: "Vlakrelaties, blokconstructies en verschillende gezichtspunten ruimtelijk verwerken."
      }
    ],
    exercises: [
      {
        id: "SP01",
        text: "Welke antwoordfiguur toont dezelfde vorm na een draaiing van 90 graden met de klok mee?",
        stimulus: {
          type: "visual-panel",
          panel: polyPanel(s01Cells, s01Markers, "Startvorm met stip")
        },
        choices: [
          visualChoice("original", polyPanel(s01Cells, s01Markers), "De oorspronkelijke vorm"),
          visualChoice("mirror", polyPanelFromTransform(mirrorPolyomino(s01Cells, s01Markers)), "Een gespiegeld exemplaar"),
          visualChoice("correct", polyPanelFromTransform(rotatePolyomino(s01Cells, s01Markers, 1)), "De vorm 90 graden met de klok mee gedraaid"),
          visualChoice("half", polyPanelFromTransform(rotatePolyomino(s01Cells, s01Markers, 2)), "De vorm 180 graden gedraaid")
        ],
        correctAnswer: "correct",
        explanation: "De volledige vorm én de stip draaien samen 90 graden met de klok mee. De onderlinge plaatsing verandert niet."
      }
    ],
    items: [
      {
        id: "S01",
        difficulty: "easy",
        subtypeId: "rotation",
        category: "Vlakke rotatie",
        text: "De startvorm wordt 90 graden met de klok mee gedraaid. Welke antwoordfiguur is correct?",
        stimulus: { type: "visual-panel", panel: polyPanel(s01Cells, s01Markers, "Startvorm") },
        choices: [
          visualChoice("original", polyPanel(s01Cells, s01Markers), "De oorspronkelijke vorm"),
          visualChoice("mirror", polyPanelFromTransform(mirrorPolyomino(s01Cells, s01Markers)), "Een gespiegeld resultaat"),
          visualChoice("correct", polyPanelFromTransform(rotatePolyomino(s01Cells, s01Markers, 1)), "Correct gedraaid resultaat"),
          visualChoice("wrong-marker", polyPanelFromTransform(rotatePolyomino(s01Cells, [{ x: 1, y: 2, kind: "dot" }], 1)), "Juiste contour met de stip op het verkeerde blok")
        ],
        correctAnswer: "correct"
      },
      {
        id: "S03",
        difficulty: "easy",
        subtypeId: "rotation",
        category: "Dezelfde vorm herkennen",
        text: "Welke antwoordfiguur toont exact dezelfde vorm na rotatie?",
        stimulus: { type: "visual-panel", panel: polyPanel(s03Cells, s03Markers, "Asymmetrische trapvorm met ring") },
        choices: [
          visualChoice("mirror", polyPanelFromTransform(mirrorPolyomino(s03Cells, s03Markers)), "Gespiegelde vorm"),
          visualChoice("wrong-marker", polyPanelFromTransform(rotatePolyomino(s03Cells, [{ x: 1, y: 1, kind: "ring" }], 1)), "Gedraaide vorm met ring op het verkeerde blok"),
          visualChoice("changed", polyPanel([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }], [{ x: 0, y: 0, kind: "ring" }]), "Vorm met een veranderde verbinding"),
          visualChoice("correct", polyPanelFromTransform(rotatePolyomino(s03Cells, s03Markers, 1)), "Correct gedraaide vorm")
        ],
        correctAnswer: "correct"
      },
      {
        id: "S04",
        difficulty: "easy",
        subtypeId: "assembly",
        category: "Figuur aanvullen",
        text: "Het grijze onderdeel ligt al in een rechthoek van twee bij drie vakken. Welk onderdeel vult de rechthoek exact aan?",
        stimulus: {
          type: "visual-panel",
          panel: gridBoardPanel(2, 3, [[0, 0], [1, 0], [2, 0], [0, 1]], "Rechthoek met vier gevulde vakken")
        },
        choices: [
          visualChoice("vertical", polyPanel([{ x: 0, y: 0 }, { x: 0, y: 1 }]), "Twee verticale vakken"),
          visualChoice("horizontal", polyPanel([{ x: 0, y: 0 }, { x: 1, y: 0 }]), "Twee horizontale vakken"),
          visualChoice("single", polyPanel([{ x: 0, y: 0 }]), "Eén vak"),
          visualChoice("corner", polyPanel([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }]), "L-vorm van drie vakken")
        ],
        correctAnswer: "horizontal"
      },
      {
        id: "S06",
        difficulty: "easy",
        subtypeId: "assembly",
        category: "Papier vouwen",
        text: "De linkerhelft wordt naar rechts gevouwen. Daarna wordt één gaatje gemaakt. Welk patroon ontstaat na volledig openvouwen?",
        stimulus: {
          type: "visual-sequence",
          panels: [
            paperFoldPanel({ folds: [{ axis: "vertical", direction: "right" }], label: "Linkerhelft naar rechts vouwen" }),
            paperFoldPanel({ foldedRegion: "right-half", holes: [{ x: 0.82, y: 0.24 }], label: "Gevouwen blad met één gaatje" })
          ]
        },
        choices: [
          visualChoice("two-horizontal", paperPatternPanel([[0.18, 0.24], [0.82, 0.24]]), "Twee horizontaal gespiegelde gaatjes bovenaan"),
          visualChoice("one", paperPatternPanel([[0.82, 0.24]]), "Eén gaatje rechtsboven"),
          visualChoice("two-vertical", paperPatternPanel([[0.82, 0.24], [0.82, 0.76]]), "Twee verticaal gespiegelde gaatjes rechts"),
          visualChoice("four", paperPatternPanel([[0.18, 0.24], [0.82, 0.24], [0.18, 0.76], [0.82, 0.76]]), "Vier symmetrische gaatjes")
        ],
        correctAnswer: "two-horizontal"
      },
      {
        id: "S08",
        difficulty: "easy",
        subtypeId: "orientation3d",
        category: "Kubusnet",
        text: "Welk symbool komt na het vouwen tegenover de omlijnde cirkel te liggen?",
        stimulus: {
          type: "visual-panel",
          panel: cubeNetPanel([
            { x: 1, y: 1, symbol: commonCubeFaces.circle },
            { x: 0, y: 1, symbol: commonCubeFaces.triangle },
            { x: 2, y: 1, symbol: commonCubeFaces.square },
            { x: 1, y: 0, symbol: commonCubeFaces.diamond },
            { x: 1, y: 2, symbol: faceSymbol("circle", { filled: true }) },
            { x: 1, y: 3, symbol: commonCubeFaces.lines }
          ], "Kruisvormig kubusnet")
        },
        choices: [
          visualChoice("triangle", symbolPanel(commonCubeFaces.triangle), "Omlijnde driehoek"),
          visualChoice("lines", symbolPanel(commonCubeFaces.lines), "Twee evenwijdige lijnen"),
          visualChoice("filled-circle", symbolPanel(faceSymbol("circle", { filled: true })), "Gevulde cirkel"),
          visualChoice("square", symbolPanel(commonCubeFaces.square), "Omlijnd vierkant")
        ],
        correctAnswer: "lines"
      },
      {
        id: "S09",
        difficulty: "medium",
        subtypeId: "rotation",
        category: "Complexere rotatie",
        text: "De startvorm wordt 90 graden tegen de klok in gedraaid. Welke antwoordfiguur is correct?",
        stimulus: { type: "visual-panel", panel: polyPanel(s09Cells, s09Markers, "Startvorm met stip") },
        choices: [
          visualChoice("clockwise", polyPanelFromTransform(rotatePolyomino(s09Cells, s09Markers, 1)), "90 graden met de klok mee"),
          visualChoice("mirror", polyPanelFromTransform(mirrorPolyomino(s09Cells, s09Markers)), "Gespiegelde vorm"),
          visualChoice("wrong-marker", polyPanelFromTransform(rotatePolyomino(s09Cells, [{ x: 0, y: 0, kind: "dot" }], 3)), "Juiste contour met stip op het verkeerde blok"),
          visualChoice("correct", polyPanelFromTransform(rotatePolyomino(s09Cells, s09Markers, 3)), "90 graden tegen de klok in")
        ],
        correctAnswer: "correct"
      },
      {
        id: "S11",
        difficulty: "medium",
        subtypeId: "assembly",
        category: "Vierkant aanvullen",
        text: "Het grijze onderdeel ligt al in een vierkant van drie bij drie vakken. Welk onderdeel vult het vierkant volledig aan?",
        stimulus: {
          type: "visual-panel",
          panel: gridBoardPanel(3, 3, [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2]], "Vierkant met bovenste rij en linker kolom gevuld")
        },
        choices: [
          visualChoice("line", polyPanel([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]), "Verticale strook van drie vakken"),
          visualChoice("square", polyPanel([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]), "Vierkant van twee bij twee vakken"),
          visualChoice("l", polyPanel([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]), "L-vorm van drie vakken"),
          visualChoice("row", polyPanel([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]), "Horizontale strook van drie vakken")
        ],
        correctAnswer: "square"
      },
      {
        id: "S13",
        difficulty: "medium",
        subtypeId: "orientation3d",
        category: "Tegenoverliggende vlakken",
        text: "Welke twee symbolen liggen na het vouwen tegenover elkaar? Kies het symbool dat tegenover de omlijnde cirkel ligt.",
        stimulus: {
          type: "visual-panel",
          panel: cubeNetPanel([
            { x: 0, y: 1, symbol: commonCubeFaces.circle },
            { x: 1, y: 1, symbol: commonCubeFaces.triangle },
            { x: 2, y: 1, symbol: commonCubeFaces.square },
            { x: 3, y: 1, symbol: commonCubeFaces.diamond },
            { x: 1, y: 0, symbol: commonCubeFaces.dot },
            { x: 1, y: 2, symbol: commonCubeFaces.ring }
          ], "Kubusnet met vier vlakken in een horizontale strook")
        },
        choices: [
          visualChoice("dot", symbolPanel(commonCubeFaces.dot), "Gevulde stip"),
          visualChoice("triangle", symbolPanel(commonCubeFaces.triangle), "Omlijnde driehoek"),
          visualChoice("ring", symbolPanel(commonCubeFaces.ring), "Ring"),
          visualChoice("square", symbolPanel(commonCubeFaces.square), "Omlijnd vierkant")
        ],
        correctAnswer: "square"
      },
      {
        id: "S14",
        difficulty: "medium",
        subtypeId: "rotation",
        category: "Spiegelbeeld herkennen",
        text: "Welke antwoordfiguur kan niet door uitsluitend draaien uit de startvorm ontstaan?",
        stimulus: { type: "visual-panel", panel: polyPanel(s14Cells, s14Markers, "Startvorm") },
        choices: [
          visualChoice("rot90", polyPanelFromTransform(rotatePolyomino(s14Cells, s14Markers, 1)), "Startvorm 90 graden gedraaid"),
          visualChoice("mirror", polyPanelFromTransform(mirrorPolyomino(s14Cells, s14Markers)), "Gespiegeld exemplaar"),
          visualChoice("rot180", polyPanelFromTransform(rotatePolyomino(s14Cells, s14Markers, 2)), "Startvorm 180 graden gedraaid"),
          visualChoice("rot270", polyPanelFromTransform(rotatePolyomino(s14Cells, s14Markers, 3)), "Startvorm 270 graden gedraaid")
        ],
        correctAnswer: "mirror"
      },
      {
        id: "S16",
        difficulty: "medium",
        subtypeId: "assembly",
        category: "Dubbele papiervouw",
        text: "De rechterhelft wordt naar links gevouwen en daarna de bovenste helft naar beneden. Er wordt één gaatje buiten beide vouwlijnen gemaakt. Welk patroon ontstaat na openvouwen?",
        stimulus: {
          type: "visual-sequence",
          panels: [
            paperFoldPanel({ folds: [{ axis: "vertical", direction: "left" }, { axis: "horizontal", direction: "down" }], label: "Twee opeenvolgende vouwen" }),
            paperFoldPanel({ foldedRegion: "bottom-left-quarter", holes: [{ x: 0.18, y: 0.78 }], label: "Gevouwen kwart met één gaatje" })
          ]
        },
        choices: [
          visualChoice("four", paperPatternPanel([[0.18, 0.22], [0.82, 0.22], [0.18, 0.78], [0.82, 0.78]]), "Vier horizontaal en verticaal symmetrische gaatjes"),
          visualChoice("vertical", paperPatternPanel([[0.18, 0.22], [0.18, 0.78]]), "Twee verticale gaatjes links"),
          visualChoice("center", paperPatternPanel([[0.42, 0.42], [0.58, 0.42], [0.42, 0.58], [0.58, 0.58]]), "Vier gaatjes dicht rond het midden"),
          visualChoice("horizontal", paperPatternPanel([[0.18, 0.78], [0.82, 0.78]]), "Twee horizontale gaatjes onderaan")
        ],
        correctAnswer: "four"
      },
      {
        id: "S17",
        difficulty: "hard",
        subtypeId: "orientation3d",
        category: "Kubus vanuit twee aanzichten",
        text: "De twee figuren tonen dezelfde kubus. Welk vlak ligt tegenover de driehoek?",
        stimulus: {
          type: "visual-cube-views",
          views: [
            cubeViewPanel({ top: commonCubeFaces.circle, front: commonCubeFaces.triangle, right: commonCubeFaces.square, label: "Eerste aanzicht" }),
            cubeViewPanel({ top: commonCubeFaces.circle, front: commonCubeFaces.square, right: commonCubeFaces.diamond, label: "Tweede aanzicht" })
          ]
        },
        choices: [
          visualChoice("diamond", symbolPanel(commonCubeFaces.diamond), "Omlijnde ruit"),
          visualChoice("square", symbolPanel(commonCubeFaces.square), "Omlijnd vierkant"),
          visualChoice("circle", symbolPanel(commonCubeFaces.circle), "Omlijnde cirkel"),
          visualChoice("unknown", symbolPanel(faceSymbol("question")), "Niet te bepalen")
        ],
        correctAnswer: "diamond"
      },
      {
        id: "S19",
        difficulty: "hard",
        subtypeId: "orientation3d",
        category: "Blokconstructie roteren",
        text: "Welke antwoordfiguur toont dezelfde blokconstructie na een ruimtelijke rotatie?",
        stimulus: { type: "visual-panel", panel: blockPanel(s19Cubes, s19Marker, "Startconstructie") },
        choices: [
          visualChoice("top-middle", blockPanel([
            { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 2, y: 0, z: 0 }, { x: 1, y: 1, z: 0 }, { x: 1, y: 1, z: 1 }
          ], { x: 0, y: 0, z: 0, face: "top", kind: "dot" }), "Bovenste kubus boven het midden"),
          visualChoice("mirror", blockPanel([
            { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 2, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 1, z: 1 }
          ], { x: 2, y: 0, z: 0, face: "top", kind: "dot" }), "Gespiegelde constructie"),
          visualChoice("correct", blockPanel(s19Correct.cubes, s19Correct.marker, "Correct geroteerde constructie"), "Dezelfde constructie na rotatie"),
          visualChoice("wrong-end", blockPanel([
            { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 2, y: 0, z: 0 }, { x: 2, y: 1, z: 0 }, { x: 0, y: 0, z: 1 }
          ], { x: 0, y: 0, z: 0, face: "top", kind: "dot" }), "Bovenste kubus aan het verkeerde uiteinde")
        ],
        correctAnswer: "correct"
      },
      {
        id: "S20",
        difficulty: "hard",
        subtypeId: "orientation3d",
        category: "Vooraanzicht",
        text: "Welke antwoordfiguur toont het correcte vooraanzicht van de blokconstructie?",
        stimulus: { type: "visual-panel", panel: blockPanel(s20Cubes, null, "Blokconstructie bekeken vanaf de voorzijde", "front") },
        choices: [
          visualChoice("121", columnViewPanel([1, 2, 1]), "Drie kolommen met hoogtes één, twee, één"),
          visualChoice("22", columnViewPanel([2, 2]), "Twee kolommen met gelijke hoogte"),
          visualChoice("122", columnViewPanel([1, 2, 2]), "Drie kolommen met hoogtes één, twee, twee"),
          visualChoice("112", columnViewPanel([1, 1, 2]), "Drie kolommen met alleen de rechterkolom verhoogd")
        ],
        correctAnswer: "122"
      },
      {
        id: "S22",
        difficulty: "hard",
        subtypeId: "assembly",
        category: "Georiënteerd kubusnet",
        text: "Welke kubus kan correct uit het getoonde net worden gevouwen? Let ook op de richting en positie van de markeringen.",
        stimulus: {
          type: "visual-panel",
          panel: cubeNetPanel([
            { x: 0, y: 1, symbol: commonCubeFaces.circle },
            { x: 1, y: 1, symbol: faceSymbol("triangle", { rotation: 0 }) },
            { x: 2, y: 1, symbol: faceSymbol("ring", { position: "top" }) },
            { x: 3, y: 1, symbol: commonCubeFaces.square },
            { x: 1, y: 0, symbol: faceSymbol("parallel-lines", { rotation: 90 }) },
            { x: 2, y: 2, symbol: commonCubeFaces.diamond }
          ], "Kubusnet met georiënteerde markeringen")
        },
        choices: [
          visualChoice("wrong-adjacency", cubeViewPanel({ top: commonCubeFaces.square, front: faceSymbol("triangle", { rotation: 0 }), right: faceSymbol("ring", { position: "top" }) }), "Onmogelijke combinatie van aangrenzende vlakken"),
          visualChoice("wrong-triangle", cubeViewPanel({ top: faceSymbol("parallel-lines", { rotation: 0 }), front: faceSymbol("triangle", { rotation: 180 }), right: faceSymbol("ring", { position: "top" }) }), "Juiste vlakken maar de driehoek wijst verkeerd"),
          visualChoice("wrong-lines", cubeViewPanel({ top: faceSymbol("parallel-lines", { rotation: 90 }), front: faceSymbol("triangle", { rotation: 0 }), right: faceSymbol("ring", { position: "bottom" }) }), "Ring op de verkeerde zijde van het vlak"),
          visualChoice("correct", cubeViewPanel({ top: faceSymbol("parallel-lines", { rotation: 90 }), front: faceSymbol("triangle", { rotation: 0 }), right: faceSymbol("ring", { position: "top" }) }), "Correct gevouwen kubus")
        ],
        correctAnswer: "correct"
      },
      {
        id: "S24",
        difficulty: "hard",
        subtypeId: "rotation",
        category: "Complexe rotatie",
        text: "Welke antwoordfiguur toont exact dezelfde vorm na rotatie, zonder spiegeling?",
        stimulus: { type: "visual-panel", panel: polyPanel(s24Cells, s24Markers, "Startvorm met stip en ring") },
        choices: [
          visualChoice("swapped", polyPanelFromTransform(rotatePolyomino(s24Cells, [
            { x: 0, y: 0, kind: "ring" }, { x: 2, y: 1, kind: "dot" }
          ], 3)), "Gedraaide vorm met stip en ring verwisseld"),
          visualChoice("mirror", polyPanelFromTransform(mirrorPolyomino(s24Cells, s24Markers)), "Gespiegelde vorm"),
          visualChoice("correct", polyPanelFromTransform(rotatePolyomino(s24Cells, s24Markers, 3)), "Correct geroteerde vorm"),
          visualChoice("changed", polyPanel([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }], [{ x: 0, y: 0, kind: "dot" }, { x: 2, y: 1, kind: "ring" }]), "Vorm met één verbinding aan de verkeerde zijde")
        ],
        correctAnswer: "correct"
      }
    ]
  });
})();
