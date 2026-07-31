"use strict";

/*
  Unfold Yourself — gedeelde testhulpfuncties
  Afhankelijkheden: core/app-config.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

/* =========================================================
   ALGEMENE TESTMOTOR — ANTWOORDKEUZES EN ANTWOORDWAARDEN
========================================================= */

function getChoicesForQuestion(
  definition,
  question
) {
  if (
    definition &&
    typeof definition.getChoices ===
      "function"
  ) {
    const choices =
      definition.getChoices(
        question
      );

    return Array.isArray(choices)
      ? choices
      : [];
  }

  if (
    definition &&
    Array.isArray(definition.choices)
  ) {
    return definition.choices;
  }

  return [];
}


function answerValuesEqual(
  first,
  second
) {
  if (Object.is(first, second)) {
    return true;
  }

  try {
    return (
      JSON.stringify(first) ===
      JSON.stringify(second)
    );
  } catch {
    return false;
  }
}


function hasSavedAnswer(
  session,
  questionId
) {
  return Boolean(
    session &&
    session.answers &&
    Object.prototype.hasOwnProperty.call(
      session.answers,
      questionId
    )
  );
}


/* Gedeelde scorebanden voor Big Five- en DISC-resultaten. */

function getScoreBand(score) {
  if (score >= 60) {
    return "high";
  }

  if (score <= 40) {
    return "low";
  }

  return "middle";
}


function getScoreBandLabel(score) {
  const band =
    getScoreBand(score);

  if (band === "high") {
    return "Hoger";
  }

  if (band === "low") {
    return "Lager";
  }

  return "Gemiddeld";
}

