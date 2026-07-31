"use strict";

/*
  Unfold Yourself — modulair testregister
  Afhankelijkheden: testmodules die vóór dit bestand zijn geladen.

  Nieuwe testmodules registreren zichzelf door hun definitie toe te voegen aan:
  window.UNFOLD_TEST_DEFINITIONS

  Daardoor hoeft dit centrale bestand bij latere testen niet meer te worden uitgebreid.
*/

const testLibrary = {};

function validateTestDefinition(definition) {
  const problems = [];

  if (!definition?.id) {
    problems.push("id ontbreekt");
  }

  if (!definition?.title) {
    problems.push("titel ontbreekt");
  }

  if (!Array.isArray(definition?.questions) || definition.questions.length === 0) {
    problems.push("geen vragen geladen");
  }

  if (
    typeof definition?.getChoices !== "function" &&
    !Array.isArray(definition?.choices)
  ) {
    problems.push("geen antwoordkeuzes geconfigureerd");
  }

  if (typeof definition?.calculateResult !== "function") {
    problems.push("geen scoreberekening geconfigureerd");
  }

  if (problems.length > 0) {
    console.warn(
      `Testconfiguratie "${definition?.title || "Onbekende test"}": ${problems.join(", ")}.`
    );
    return false;
  }

  return true;
}

function registerTestDefinition(definition) {
  if (!validateTestDefinition(definition)) {
    return false;
  }

  if (testLibrary[definition.id]) {
    console.warn(`Dubbele testregistratie genegeerd: ${definition.id}.`);
    return false;
  }

  testLibrary[definition.id] = definition;
  return true;
}

const discoveredTestDefinitions =
  Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
    ? window.UNFOLD_TEST_DEFINITIONS
    : [];

/*
  Tijdelijke terugwaartse compatibiliteit met eerder gecachete testmodules.
  Nieuwe en bijgewerkte modules gebruiken uitsluitend zelfregistratie.
*/
const legacyTestDefinitions = [
  typeof BIG_FIVE_TEST_DEFINITION !== "undefined" ? BIG_FIVE_TEST_DEFINITION : null,
  typeof HEXACO_TEST_DEFINITION !== "undefined" ? HEXACO_TEST_DEFINITION : null,
  typeof SIXTEEN_PERSONALITIES_TEST_DEFINITION !== "undefined" ? SIXTEEN_PERSONALITIES_TEST_DEFINITION : null,
  typeof DISC_TEST_DEFINITION !== "undefined" ? DISC_TEST_DEFINITION : null,
  typeof SELF_VALUES_DRIVES_TEST_DEFINITION !== "undefined" ? SELF_VALUES_DRIVES_TEST_DEFINITION : null
].filter(Boolean);

[
  ...discoveredTestDefinitions,
  ...legacyTestDefinitions
].forEach(definition => {
  if (!testLibrary[definition.id]) {
    registerTestDefinition(definition);
  }
});
