"use strict";

const COGNITIVE_SVG_NAMESPACE = "http://www.w3.org/2000/svg";

function createCognitiveSvgElement(tagName, attributes = {}) {
  const element = document.createElementNS(COGNITIVE_SVG_NAMESPACE, tagName);

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, String(value));
  });

  return element;
}

function createCognitiveVisualStage(options = {}) {
  const width = Number(options.width || 160);
  const height = Number(options.height || 120);
  const label = String(options.label || "Abstracte figuur");
  const svg = createCognitiveSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": label,
    preserveAspectRatio: "xMidYMid meet"
  });

  svg.classList.add("cognitive-visual-stage");
  return svg;
}

function normalizeVisualElement(element) {
  return {
    kind: String(element?.kind || "circle"),
    x: Number(element?.x ?? 50),
    y: Number(element?.y ?? 50),
    size: Math.max(4, Number(element?.size ?? 16)),
    filled: Boolean(element?.filled),
    rotation: Number(element?.rotation || 0),
    strokeWidth: Math.max(1.5, Number(element?.strokeWidth || 3))
  };
}

function createTrianglePoints(size) {
  const half = size / 2;
  return `0,${-half} ${half * 0.92},${half * 0.78} ${-half * 0.92},${half * 0.78}`;
}

function drawCognitiveVisualElement(svg, rawElement, scaleX, scaleY) {
  const element = normalizeVisualElement(rawElement);
  const x = element.x * scaleX;
  const y = element.y * scaleY;
  const size = element.size * Math.min(scaleX, scaleY);
  const common = {
    fill: element.filled ? "currentColor" : "#ffffff",
    stroke: "currentColor",
    "stroke-width": element.strokeWidth,
    "vector-effect": "non-scaling-stroke"
  };
  let shape;

  if (element.kind === "circle" || element.kind === "dot") {
    shape = createCognitiveSvgElement("circle", {
      ...common,
      cx: 0,
      cy: 0,
      r: element.kind === "dot" ? Math.max(3, size * 0.32) : size / 2
    });
  } else if (element.kind === "square") {
    shape = createCognitiveSvgElement("rect", {
      ...common,
      x: -size / 2,
      y: -size / 2,
      width: size,
      height: size,
      rx: Math.max(1.5, size * 0.06)
    });
  } else if (element.kind === "diamond") {
    shape = createCognitiveSvgElement("rect", {
      ...common,
      x: -size / 2,
      y: -size / 2,
      width: size,
      height: size,
      rx: Math.max(1.5, size * 0.04)
    });
    element.rotation += 45;
  } else if (element.kind === "triangle") {
    shape = createCognitiveSvgElement("polygon", {
      ...common,
      points: createTrianglePoints(size)
    });
  } else if (element.kind === "line") {
    shape = createCognitiveSvgElement("line", {
      x1: -size / 2,
      y1: 0,
      x2: size / 2,
      y2: 0,
      stroke: "currentColor",
      "stroke-width": element.strokeWidth,
      "stroke-linecap": "round",
      "vector-effect": "non-scaling-stroke"
    });
  } else {
    return;
  }

  const group = createCognitiveSvgElement("g", {
    transform: `translate(${x} ${y}) rotate(${element.rotation})`
  });
  group.appendChild(shape);
  svg.appendChild(group);
}

function drawUnknownPanel(svg, width, height) {
  const text = createCognitiveSvgElement("text", {
    x: width / 2,
    y: height / 2 + 12,
    "text-anchor": "middle",
    "font-size": 44,
    "font-weight": 800,
    fill: "currentColor"
  });
  text.textContent = "?";
  svg.appendChild(text);
}

function drawMarker(svg, kind, x, y, size = 7) {
  if (kind === "ring") {
    svg.appendChild(createCognitiveSvgElement("circle", {
      cx: x,
      cy: y,
      r: size,
      fill: "#ffffff",
      stroke: "currentColor",
      "stroke-width": 2.4,
      "vector-effect": "non-scaling-stroke"
    }));
    return;
  }

  svg.appendChild(createCognitiveSvgElement("circle", {
    cx: x,
    cy: y,
    r: Math.max(4, size * 0.72),
    fill: "currentColor"
  }));
}

function drawPolyominoPanel(svg, panel, width, height) {
  const cells = Array.isArray(panel.cells) ? panel.cells : [];
  if (cells.length === 0) {
    return;
  }

  const maxX = Math.max(...cells.map(cell => Number(cell.x) || 0));
  const maxY = Math.max(...cells.map(cell => Number(cell.y) || 0));
  const columns = maxX + 1;
  const rows = maxY + 1;
  const cellSize = Math.min(
    34,
    (width - 24) / Math.max(1, columns),
    (height - 20) / Math.max(1, rows)
  );
  const startX = (width - columns * cellSize) / 2;
  const startY = (height - rows * cellSize) / 2;

  cells.forEach(cell => {
    const x = startX + cell.x * cellSize;
    const y = startY + cell.y * cellSize;
    svg.appendChild(createCognitiveSvgElement("rect", {
      x,
      y,
      width: cellSize,
      height: cellSize,
      rx: Math.max(1.5, cellSize * 0.05),
      fill: "#edf1f7",
      stroke: "currentColor",
      "stroke-width": 2.2,
      "vector-effect": "non-scaling-stroke"
    }));
  });

  (panel.markers || []).forEach(marker => {
    const x = startX + (Number(marker.x) + 0.5) * cellSize;
    const y = startY + (Number(marker.y) + 0.5) * cellSize;
    drawMarker(svg, marker.kind, x, y, Math.min(7, cellSize * 0.2));
  });
}

function drawGridBoardPanel(svg, panel, width, height) {
  const rows = Math.max(1, Number(panel.rows) || 1);
  const columns = Math.max(1, Number(panel.columns) || 1);
  const cellSize = Math.min(36, (width - 26) / columns, (height - 22) / rows);
  const startX = (width - columns * cellSize) / 2;
  const startY = (height - rows * cellSize) / 2;
  const filled = new Set((panel.filledCells || []).map(cell => `${cell.x},${cell.y}`));

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      svg.appendChild(createCognitiveSvgElement("rect", {
        x: startX + x * cellSize,
        y: startY + y * cellSize,
        width: cellSize,
        height: cellSize,
        fill: filled.has(`${x},${y}`) ? "#cfd8e6" : "#ffffff",
        stroke: "currentColor",
        "stroke-width": 2,
        "vector-effect": "non-scaling-stroke"
      }));
    }
  }
}

function drawArrow(svg, x1, y1, x2, y2) {
  svg.appendChild(createCognitiveSvgElement("line", {
    x1,
    y1,
    x2,
    y2,
    stroke: "currentColor",
    "stroke-width": 3,
    "stroke-linecap": "round",
    "vector-effect": "non-scaling-stroke"
  }));
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const p1 = `${x2},${y2}`;
  const p2 = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const p3 = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  svg.appendChild(createCognitiveSvgElement("polygon", {
    points: `${p1} ${p2} ${p3}`,
    fill: "currentColor"
  }));
}

function drawPaperBase(svg, width, height) {
  const size = Math.min(width, height) * 0.68;
  const x = (width - size) / 2;
  const y = (height - size) / 2;
  svg.appendChild(createCognitiveSvgElement("rect", {
    x,
    y,
    width: size,
    height: size,
    fill: "#ffffff",
    stroke: "currentColor",
    "stroke-width": 2.2,
    "vector-effect": "non-scaling-stroke"
  }));
  return { x, y, size };
}

function drawPaperFoldPanel(svg, panel, width, height) {
  const paper = drawPaperBase(svg, width, height);
  const { x, y, size } = paper;

  if (panel.foldedRegion === "right-half") {
    svg.appendChild(createCognitiveSvgElement("rect", {
      x: x + size / 2,
      y,
      width: size / 2,
      height: size,
      fill: "#e5ebf4",
      stroke: "none"
    }));
  } else if (panel.foldedRegion === "bottom-left-quarter") {
    svg.appendChild(createCognitiveSvgElement("rect", {
      x,
      y: y + size / 2,
      width: size / 2,
      height: size / 2,
      fill: "#e5ebf4",
      stroke: "none"
    }));
  }

  (panel.folds || []).forEach((fold, index) => {
    if (fold.axis === "vertical") {
      svg.appendChild(createCognitiveSvgElement("line", {
        x1: x + size / 2,
        y1: y,
        x2: x + size / 2,
        y2: y + size,
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-dasharray": "6 5",
        "vector-effect": "non-scaling-stroke"
      }));
      if (fold.direction === "right") {
        drawArrow(svg, x + size * 0.22, y + size * (0.32 + index * 0.18), x + size * 0.76, y + size * (0.32 + index * 0.18));
      } else {
        drawArrow(svg, x + size * 0.78, y + size * (0.32 + index * 0.18), x + size * 0.24, y + size * (0.32 + index * 0.18));
      }
    } else if (fold.axis === "horizontal") {
      svg.appendChild(createCognitiveSvgElement("line", {
        x1: x,
        y1: y + size / 2,
        x2: x + size,
        y2: y + size / 2,
        stroke: "currentColor",
        "stroke-width": 2,
        "stroke-dasharray": "6 5",
        "vector-effect": "non-scaling-stroke"
      }));
      if (fold.direction === "down") {
        drawArrow(svg, x + size * (0.35 + index * 0.16), y + size * 0.22, x + size * (0.35 + index * 0.16), y + size * 0.78);
      } else {
        drawArrow(svg, x + size * (0.35 + index * 0.16), y + size * 0.78, x + size * (0.35 + index * 0.16), y + size * 0.22);
      }
    }
  });

  (panel.holes || []).forEach(hole => {
    drawMarker(svg, "ring", x + hole.x * size, y + hole.y * size, Math.max(5, size * 0.055));
  });
}

function drawPaperPatternPanel(svg, panel, width, height) {
  const paper = drawPaperBase(svg, width, height);
  (panel.holes || []).forEach(hole => {
    drawMarker(svg, "ring", paper.x + hole.x * paper.size, paper.y + hole.y * paper.size, Math.max(5, paper.size * 0.055));
  });
}

function getFaceSymbolPosition(symbol, x, y, size) {
  const offset = size * 0.24;
  const positions = {
    top: [0, -offset],
    bottom: [0, offset],
    left: [-offset, 0],
    right: [offset, 0],
    "top-left": [-offset, -offset],
    "top-right": [offset, -offset],
    "bottom-left": [-offset, offset],
    "bottom-right": [offset, offset]
  };
  const [dx, dy] = positions[symbol?.position] || [0, 0];
  return { x: x + dx, y: y + dy };
}

function drawFaceSymbol(svg, symbol, x, y, size = 24) {
  if (!symbol) {
    return;
  }

  const position = getFaceSymbolPosition(symbol, x, y, size);
  const cx = position.x;
  const cy = position.y;
  const rotation = Number(symbol.rotation || 0);
  const group = createCognitiveSvgElement("g", {
    transform: `translate(${cx} ${cy}) rotate(${rotation})`
  });
  const common = {
    fill: symbol.filled ? "currentColor" : "#ffffff",
    stroke: "currentColor",
    "stroke-width": 2.2,
    "vector-effect": "non-scaling-stroke"
  };
  let shape = null;

  if (symbol.kind === "circle" || symbol.kind === "ring") {
    shape = createCognitiveSvgElement("circle", {
      ...common,
      r: size * 0.27,
      cx: 0,
      cy: 0,
      fill: symbol.kind === "ring" ? "#ffffff" : common.fill
    });
  } else if (symbol.kind === "dot") {
    shape = createCognitiveSvgElement("circle", {
      cx: 0,
      cy: 0,
      r: size * 0.22,
      fill: "currentColor"
    });
  } else if (symbol.kind === "triangle") {
    shape = createCognitiveSvgElement("polygon", {
      ...common,
      points: createTrianglePoints(size * 0.62)
    });
  } else if (symbol.kind === "square") {
    shape = createCognitiveSvgElement("rect", {
      ...common,
      x: -size * 0.25,
      y: -size * 0.25,
      width: size * 0.5,
      height: size * 0.5
    });
  } else if (symbol.kind === "diamond") {
    shape = createCognitiveSvgElement("rect", {
      ...common,
      x: -size * 0.22,
      y: -size * 0.22,
      width: size * 0.44,
      height: size * 0.44,
      transform: "rotate(45)"
    });
  } else if (symbol.kind === "parallel-lines") {
    [-size * 0.12, size * 0.12].forEach(offset => {
      group.appendChild(createCognitiveSvgElement("line", {
        x1: -size * 0.28,
        y1: offset,
        x2: size * 0.28,
        y2: offset,
        stroke: "currentColor",
        "stroke-width": 2.4,
        "stroke-linecap": "round",
        "vector-effect": "non-scaling-stroke"
      }));
    });
  } else if (symbol.kind === "question") {
    const text = createCognitiveSvgElement("text", {
      x: 0,
      y: size * 0.25,
      "text-anchor": "middle",
      "font-size": size * 0.9,
      "font-weight": 800,
      fill: "currentColor"
    });
    text.textContent = "?";
    group.appendChild(text);
  }

  if (shape) {
    group.appendChild(shape);
  }
  svg.appendChild(group);
}

function drawCubeNetPanel(svg, panel, width, height) {
  const faces = Array.isArray(panel.faces) ? panel.faces : [];
  if (faces.length === 0) {
    return;
  }
  const minX = Math.min(...faces.map(face => face.x));
  const maxX = Math.max(...faces.map(face => face.x));
  const minY = Math.min(...faces.map(face => face.y));
  const maxY = Math.max(...faces.map(face => face.y));
  const columns = maxX - minX + 1;
  const rows = maxY - minY + 1;
  const cellSize = Math.min(34, (width - 20) / columns, (height - 16) / rows);
  const startX = (width - columns * cellSize) / 2;
  const startY = (height - rows * cellSize) / 2;

  faces.forEach(face => {
    const x = startX + (face.x - minX) * cellSize;
    const y = startY + (face.y - minY) * cellSize;
    svg.appendChild(createCognitiveSvgElement("rect", {
      x,
      y,
      width: cellSize,
      height: cellSize,
      fill: "#ffffff",
      stroke: "currentColor",
      "stroke-width": 2,
      "vector-effect": "non-scaling-stroke"
    }));
    drawFaceSymbol(svg, face.symbol, x + cellSize / 2, y + cellSize / 2, cellSize * 0.74);
  });
}

function drawFaceSymbolPanel(svg, panel, width, height) {
  drawFaceSymbol(svg, panel.symbol, width / 2, height / 2, Math.min(width, height) * 0.55);
}

function polygonPoints(points) {
  return points.map(point => `${point.x},${point.y}`).join(" ");
}

function drawCubeViewPanel(svg, panel, width, height) {
  const cx = width / 2;
  const cy = height * 0.48;
  const halfW = Math.min(width * 0.28, 45);
  const topH = Math.min(height * 0.22, 28);
  const sideH = Math.min(height * 0.38, 48);
  const top = [
    { x: cx, y: cy - topH },
    { x: cx + halfW, y: cy - topH / 2 },
    { x: cx, y: cy },
    { x: cx - halfW, y: cy - topH / 2 }
  ];
  const front = [
    top[3],
    top[2],
    { x: cx, y: cy + sideH },
    { x: cx - halfW, y: cy + sideH - topH / 2 }
  ];
  const right = [
    top[2],
    top[1],
    { x: cx + halfW, y: cy + sideH - topH / 2 },
    { x: cx, y: cy + sideH }
  ];

  [
    { points: top, fill: "#f5f7fb" },
    { points: front, fill: "#ffffff" },
    { points: right, fill: "#e5ebf4" }
  ].forEach(face => {
    svg.appendChild(createCognitiveSvgElement("polygon", {
      points: polygonPoints(face.points),
      fill: face.fill,
      stroke: "currentColor",
      "stroke-width": 2.1,
      "stroke-linejoin": "round",
      "vector-effect": "non-scaling-stroke"
    }));
  });

  drawFaceSymbol(svg, panel.top, cx, cy - topH * 0.48, Math.min(halfW, sideH) * 0.58);
  drawFaceSymbol(svg, panel.front, cx - halfW * 0.44, cy + sideH * 0.48, Math.min(halfW, sideH) * 0.58);
  drawFaceSymbol(svg, panel.right, cx + halfW * 0.44, cy + sideH * 0.48, Math.min(halfW, sideH) * 0.58);
}

function cubePolygonAt(cube, size) {
  const dx = size * 0.72;
  const dy = size * 0.38;
  const dz = size * 0.88;
  const cx = (cube.x - cube.y) * dx;
  const cy = (cube.x + cube.y) * dy - cube.z * dz;
  const top = [
    { x: cx, y: cy - dz * 0.48 },
    { x: cx + dx, y: cy - dz * 0.18 },
    { x: cx, y: cy + dz * 0.12 },
    { x: cx - dx, y: cy - dz * 0.18 }
  ];
  const front = [
    top[3],
    top[2],
    { x: top[2].x, y: top[2].y + dz },
    { x: top[3].x, y: top[3].y + dz }
  ];
  const right = [
    top[2],
    top[1],
    { x: top[1].x, y: top[1].y + dz },
    { x: top[2].x, y: top[2].y + dz }
  ];
  return { top, front, right, centerTop: { x: cx, y: cy - dz * 0.12 } };
}

function drawBlockStructurePanel(svg, panel, width, height) {
  const cubes = Array.isArray(panel.cubes) ? panel.cubes : [];
  if (cubes.length === 0) {
    return;
  }
  const size = 23;
  const geometry = cubes.map(cube => ({ cube, geometry: cubePolygonAt(cube, size) }));
  const allPoints = geometry.flatMap(entry => [
    ...entry.geometry.top,
    ...entry.geometry.front,
    ...entry.geometry.right
  ]);
  const minX = Math.min(...allPoints.map(point => point.x));
  const maxX = Math.max(...allPoints.map(point => point.x));
  const minY = Math.min(...allPoints.map(point => point.y));
  const maxY = Math.max(...allPoints.map(point => point.y));
  const translateX = width / 2 - (minX + maxX) / 2;
  const translateY = height / 2 - (minY + maxY) / 2;
  const sorted = [...geometry].sort((a, b) => {
    const depthA = a.cube.x + a.cube.y + a.cube.z * 0.05;
    const depthB = b.cube.x + b.cube.y + b.cube.z * 0.05;
    return depthA - depthB;
  });

  sorted.forEach(entry => {
    [
      { points: entry.geometry.top, fill: "#f7f9fc" },
      { points: entry.geometry.front, fill: "#ffffff" },
      { points: entry.geometry.right, fill: "#dfe6f1" }
    ].forEach(face => {
      svg.appendChild(createCognitiveSvgElement("polygon", {
        points: polygonPoints(face.points.map(point => ({ x: point.x + translateX, y: point.y + translateY }))),
        fill: face.fill,
        stroke: "currentColor",
        "stroke-width": 1.8,
        "stroke-linejoin": "round",
        "vector-effect": "non-scaling-stroke"
      }));
    });
  });

  if (panel.marker) {
    const marked = geometry.find(entry =>
      entry.cube.x === panel.marker.x &&
      entry.cube.y === panel.marker.y &&
      entry.cube.z === panel.marker.z
    );
    if (marked) {
      drawMarker(
        svg,
        panel.marker.kind,
        marked.geometry.centerTop.x + translateX,
        marked.geometry.centerTop.y + translateY,
        5.3
      );
    }
  }

  if (panel.viewer === "front") {
    const label = createCognitiveSvgElement("text", {
      x: width / 2,
      y: height - 4,
      "text-anchor": "middle",
      "font-size": 11,
      "font-weight": 700,
      fill: "currentColor"
    });
    label.textContent = "vooraanzicht";
    svg.appendChild(label);
    drawArrow(svg, width / 2, height - 18, width / 2, height - 42);
  }
}

function drawColumnViewPanel(svg, panel, width, height) {
  const heights = Array.isArray(panel.heights) ? panel.heights : [];
  const maxHeight = Math.max(1, ...heights);
  const cellSize = Math.min(30, (width - 28) / Math.max(1, heights.length), (height - 22) / maxHeight);
  const startX = (width - heights.length * cellSize) / 2;
  const baseline = (height + maxHeight * cellSize) / 2;

  heights.forEach((columnHeight, x) => {
    for (let y = 0; y < columnHeight; y += 1) {
      svg.appendChild(createCognitiveSvgElement("rect", {
        x: startX + x * cellSize,
        y: baseline - (y + 1) * cellSize,
        width: cellSize,
        height: cellSize,
        fill: "#e7edf5",
        stroke: "currentColor",
        "stroke-width": 2,
        "vector-effect": "non-scaling-stroke"
      }));
    }
  });
}

function createCognitiveVisualPanel(panel = {}, options = {}) {
  const width = Number(options.width || 150);
  const height = Number(options.height || 112);
  const label = String(options.label || panel.label || "Abstracte figuur");
  const svg = createCognitiveVisualStage({ width, height, label });

  svg.classList.add("cognitive-visual-panel-svg");

  if (panel.unknown) {
    drawUnknownPanel(svg, width, height);
    return svg;
  }

  if (panel.type === "polyomino") {
    drawPolyominoPanel(svg, panel, width, height);
    return svg;
  }

  if (panel.type === "grid-board") {
    drawGridBoardPanel(svg, panel, width, height);
    return svg;
  }

  if (panel.type === "paper-fold") {
    drawPaperFoldPanel(svg, panel, width, height);
    return svg;
  }

  if (panel.type === "paper-pattern") {
    drawPaperPatternPanel(svg, panel, width, height);
    return svg;
  }

  if (panel.type === "cube-net") {
    drawCubeNetPanel(svg, panel, width, height);
    return svg;
  }

  if (panel.type === "face-symbol") {
    drawFaceSymbolPanel(svg, panel, width, height);
    return svg;
  }

  if (panel.type === "cube-view") {
    drawCubeViewPanel(svg, panel, width, height);
    return svg;
  }

  if (panel.type === "block-structure") {
    drawBlockStructurePanel(svg, panel, width, height);
    return svg;
  }

  if (panel.type === "column-view") {
    drawColumnViewPanel(svg, panel, width, height);
    return svg;
  }

  const scaleX = width / 100;
  const scaleY = height / 100;
  (panel.elements || []).forEach(element => {
    drawCognitiveVisualElement(svg, element, scaleX, scaleY);
  });

  return svg;
}

function renderCognitiveVisualSequence(stimulus, options = {}) {
  const wrapper = document.createElement("div");
  wrapper.className = "cognitive-visual-sequence";

  (stimulus.panels || []).forEach((panel, index) => {
    const panelWrap = document.createElement("div");
    panelWrap.className = "cognitive-visual-panel";
    panelWrap.appendChild(
      createCognitiveVisualPanel(panel, {
        width: Number(options.panelWidth || 126),
        height: Number(options.panelHeight || 94),
        label: panel.label || `Figuur ${index + 1}`
      })
    );
    wrapper.appendChild(panelWrap);

    if (index < stimulus.panels.length - 1) {
      const divider = document.createElement("span");
      divider.className = "cognitive-visual-sequence-divider";
      divider.setAttribute("aria-hidden", "true");
      divider.textContent = "→";
      wrapper.appendChild(divider);
    }
  });

  return wrapper;
}

function renderCognitiveVisualMatrix(stimulus, options = {}) {
  const wrapper = document.createElement("div");
  wrapper.className = "cognitive-visual-matrix";
  const columns = Number(stimulus.columns || 3);
  wrapper.style.setProperty("--cognitive-matrix-columns", String(columns));
  wrapper.classList.toggle("is-columns-2", columns === 2);

  (stimulus.panels || []).forEach((panel, index) => {
    const cell = document.createElement("div");
    cell.className = "cognitive-visual-matrix-cell";
    cell.appendChild(
      createCognitiveVisualPanel(panel, {
        width: Number(options.panelWidth || 132),
        height: Number(options.panelHeight || 104),
        label: panel.label || `Matrixvak ${index + 1}`
      })
    );
    wrapper.appendChild(cell);
  });

  return wrapper;
}

function renderCognitiveCubeViews(stimulus) {
  const wrapper = document.createElement("div");
  wrapper.className = "cognitive-cube-views";

  (stimulus.views || []).forEach((view, index) => {
    const item = document.createElement("div");
    item.className = "cognitive-cube-view-item";
    item.appendChild(createCognitiveVisualPanel(view, {
      width: 190,
      height: 155,
      label: view.label || `Kubusaanzicht ${index + 1}`
    }));
    const caption = document.createElement("span");
    caption.textContent = view.label || `Aanzicht ${index + 1}`;
    item.appendChild(caption);
    wrapper.appendChild(item);
  });

  return wrapper;
}

function renderCognitiveVisualStimulus(stimulus) {
  if (!stimulus || typeof stimulus !== "object") {
    return null;
  }

  if (stimulus.type === "visual-sequence") {
    return renderCognitiveVisualSequence(stimulus);
  }

  if (stimulus.type === "visual-matrix") {
    return renderCognitiveVisualMatrix(stimulus);
  }

  if (stimulus.type === "visual-cube-views") {
    return renderCognitiveCubeViews(stimulus);
  }

  if (stimulus.type === "visual-panel") {
    const wrapper = document.createElement("div");
    wrapper.className = "cognitive-visual-single";
    wrapper.appendChild(
      createCognitiveVisualPanel(stimulus.panel || {}, {
        width: 230,
        height: 175,
        label: stimulus.label || stimulus.panel?.label || "Visuele figuur"
      })
    );
    return wrapper;
  }

  return null;
}

function renderCognitiveVisualChoice(choice, optionLabel) {
  if (!choice?.visual) {
    return null;
  }

  const wrapper = document.createElement("span");
  wrapper.className = "cognitive-answer-visual";
  wrapper.appendChild(
    createCognitiveVisualPanel(choice.visual, {
      width: 150,
      height: 112,
      label: choice.ariaLabel || `Antwoordfiguur ${optionLabel}`
    })
  );
  return wrapper;
}

window.COGNITIVE_VISUAL_RENDERER = Object.freeze({
  version: 3,
  createElement: createCognitiveSvgElement,
  createStage: createCognitiveVisualStage,
  createPanel: createCognitiveVisualPanel,
  renderStimulus: renderCognitiveVisualStimulus,
  renderChoice: renderCognitiveVisualChoice
});
