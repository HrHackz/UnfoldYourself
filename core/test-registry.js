"use strict";

/*
  Unfold Yourself — testregister
  Afhankelijkheden: tests/big-five-engine.js, tests/sixteen-personalities-engine.js, tests/disc-engine.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

const testLibrary = {
  [BIG_FIVE_TEST_DEFINITION.id]:
    BIG_FIVE_TEST_DEFINITION,

  [SIXTEEN_PERSONALITIES_TEST_DEFINITION.id]:
    SIXTEEN_PERSONALITIES_TEST_DEFINITION,

  [DISC_TEST_DEFINITION.id]:
    DISC_TEST_DEFINITION
};

/* =========================================================
   ALGEMENE TESTMOTOR — CONTROLE VAN TESTCONFIGURATIES
========================================================= */

function validateTestDefinition(
  definition
) {
  const problems = [];

  if (!definition?.id) {
    problems.push("id ontbreekt");
  }

  if (!definition?.title) {
    problems.push("titel ontbreekt");
  }

  if (
    !Array.isArray(
      definition?.questions
    ) ||
    definition.questions.length === 0
  ) {
    problems.push(
      "geen vragen geladen"
    );
  }

  if (
    typeof definition?.getChoices !==
      "function" &&
    !Array.isArray(
      definition?.choices
    )
  ) {
    problems.push(
      "geen antwoordkeuzes geconfigureerd"
    );
  }

  if (
    typeof definition?.calculateResult !==
      "function"
  ) {
    problems.push(
      "geen scoreberekening geconfigureerd"
    );
  }

  if (problems.length > 0) {
    console.warn(
      `Testconfiguratie "${definition?.title || "Onbekende test"}": ${problems.join(", ")}.`
    );

    return false;
  }

  return true;
}


Object.values(
  testLibrary
).forEach(
  validateTestDefinition
);

