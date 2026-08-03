"use strict";

(function registerWorkingMemoryData() {
  const positions = Object.freeze([
    { id: 1, x: 12, y: 19 },
    { id: 2, x: 44, y: 10 },
    { id: 3, x: 79, y: 23 },
    { id: 4, x: 27, y: 41 },
    { id: 5, x: 61, y: 36 },
    { id: 6, x: 88, y: 51 },
    { id: 7, x: 10, y: 73 },
    { id: 8, x: 43, y: 66 },
    { id: 9, x: 73, y: 81 }
  ]);

  function trial(id, direction, sequence, options = {}) {
    return Object.freeze({
      id,
      direction,
      sequence: Object.freeze([...sequence]),
      practice: Boolean(options.practice),
      reserve: Boolean(options.reserve)
    });
  }

  const practices = Object.freeze([
    trial("WP01", "forward", [2, 7], { practice: true }),
    trial("WP02", "forward", [6, 1, 8], { practice: true, reserve: true }),
    trial("WP03", "backward", [3, 9], { practice: true }),
    trial("WP04", "backward", [5, 1, 7], { practice: true, reserve: true })
  ]);

  const trials = Object.freeze([
    trial("W01", "forward", [2, 7, 5]),
    trial("W02", "forward", [6, 1, 8]),
    trial("W03", "forward", [4, 9, 2, 6]),
    trial("W04", "forward", [8, 3, 5, 1]),
    trial("W05", "forward", [1, 6, 8, 3, 7]),
    trial("W06", "forward", [9, 4, 2, 8, 5]),
    trial("W07", "forward", [3, 7, 5, 1, 8, 4]),
    trial("W08", "forward", [6, 2, 9, 4, 7, 1]),
    trial("W09", "backward", [2, 8, 4]),
    trial("W10", "backward", [7, 3, 5]),
    trial("W11", "backward", [1, 6, 3, 8]),
    trial("W12", "backward", [9, 2, 5, 7]),
    trial("W13", "backward", [4, 1, 8, 6, 3]),
    trial("W14", "backward", [2, 9, 5, 1, 7])
  ]);

  const reserveTrials = Object.freeze([
    trial("WR01", "forward", [3, 8, 1], { reserve: true }),
    trial("WR02", "forward", [7, 2, 6, 9], { reserve: true }),
    trial("WR03", "forward", [5, 1, 9, 4, 8], { reserve: true }),
    trial("WR04", "forward", [2, 6, 7, 3, 9, 4], { reserve: true }),
    trial("WR05", "backward", [8, 1, 6, 3], { reserve: true }),
    trial("WR06", "backward", [6, 2, 9, 5, 1], { reserve: true })
  ]);

  window.COGNITIVE_WORKING_MEMORY_POSITIONS = positions;
  window.COGNITIVE_WORKING_MEMORY_DATA = Object.freeze({
    positions,
    practices,
    trials,
    reserveTrials,
    highlightDurationMs: 650,
    neutralIntervalMs: 250,
    responseDelayMs: 400
  });
})();
