"use strict";

/*
  Unfold Yourself — gedeelde antwoordbank voor bronidentieke persoonlijkheidsitems.
  Afhankelijkheden: core/storage.js wordt pas later aangeroepen; functies lezen de globale state runtime.
*/

function ensurePersonalityAnswerBank() {
  if (
    !state.responseBank ||
    typeof state.responseBank !== "object"
  ) {
    state.responseBank = {};
  }

  return state.responseBank;
}

function getQuestionAnswerBankKey(question) {
  return (
    question &&
    typeof question.answerBankKey === "string" &&
    question.answerBankKey.trim()
  )
    ? question.answerBankKey
    : null;
}

function getStoredRawPersonalityAnswer(question) {
  const key = getQuestionAnswerBankKey(question);

  if (!key) {
    return null;
  }

  const bank = ensurePersonalityAnswerBank();
  const entry = bank[key];

  if (typeof entry === "number") {
    return entry;
  }

  if (
    entry &&
    typeof entry === "object" &&
    typeof entry.value === "number"
  ) {
    return entry.value;
  }

  return null;
}

function rawPersonalityAnswerToScore(question, rawValue) {
  if (
    typeof rawValue !== "number" ||
    rawValue < 1 ||
    rawValue > 5
  ) {
    return null;
  }

  return question?.keyed === "minus"
    ? 6 - rawValue
    : rawValue;
}

function scoredPersonalityAnswerToRaw(question, scoredValue) {
  if (
    typeof scoredValue !== "number" ||
    scoredValue < 1 ||
    scoredValue > 5
  ) {
    return null;
  }

  return question?.keyed === "minus"
    ? 6 - scoredValue
    : scoredValue;
}

function saveRawPersonalityAnswer({
  definition,
  question,
  rawValue
}) {
  const key = getQuestionAnswerBankKey(question);

  if (
    !key ||
    typeof rawValue !== "number" ||
    rawValue < 1 ||
    rawValue > 5
  ) {
    return false;
  }

  const bank = ensurePersonalityAnswerBank();

  bank[key] = {
    value: rawValue,
    sourceTestId: definition?.id || null,
    updatedAt: new Date().toISOString()
  };

  return true;
}

function persistQuestionAnswerToBank({
  definition,
  question,
  selectedChoice,
  selectedValue
}) {
  if (!getQuestionAnswerBankKey(question)) {
    return false;
  }

  const rawValue = Number(
    selectedChoice?.rawValue ??
    selectedChoice?.color ??
    selectedChoice?.marker ??
    (
      question?.keyed === "minus"
        ? 6 - Number(selectedValue)
        : selectedValue
    )
  );

  return saveRawPersonalityAnswer({
    definition,
    question,
    rawValue
  });
}

function getAdaptiveQuestionPlan(definition) {
  const questions = Array.isArray(definition?.questions)
    ? definition.questions
    : [];

  let reusable = 0;

  questions.forEach(question => {
    if (
      typeof getStoredRawPersonalityAnswer(question) === "number"
    ) {
      reusable += 1;
    }
  });

  return {
    total: questions.length,
    reusable,
    remaining: Math.max(0, questions.length - reusable)
  };
}

function createAdaptivePersonalitySession({
  definition,
  startedAt,
  forceAll = false
}) {
  const questions = Array.isArray(definition?.questions)
    ? definition.questions
    : [];

  const answers = {};
  const questionIds = [];
  let reusedAnswerCount = 0;

  questions.forEach(question => {
    const rawValue = forceAll
      ? null
      : getStoredRawPersonalityAnswer(question);

    const scoredValue = rawPersonalityAnswerToScore(
      question,
      rawValue
    );

    if (typeof scoredValue === "number") {
      answers[question.id] = scoredValue;
      reusedAnswerCount += 1;
    } else {
      questionIds.push(question.id);
    }
  });

  return {
    currentQuestionIndex: 0,
    answers,
    questionIds,
    reusedAnswerCount,
    totalModelQuestionCount: questions.length,
    startedAt: startedAt || new Date().toISOString()
  };
}

function migrateActivePersonalitySessionsToAnswerBank() {
  const activeTests = state.activeTests || {};
  let migratedCount = 0;

  Object.entries(activeTests).forEach(([testId, session]) => {
    const definition = getTestDefinition(testId);

    if (
      !definition ||
      definition.usesPersonalityAnswerBank !== true ||
      !session?.answers
    ) {
      return;
    }

    definition.questions.forEach(question => {
      if (
        !Object.prototype.hasOwnProperty.call(
          session.answers,
          question.id
        )
      ) {
        return;
      }

      if (
        typeof getStoredRawPersonalityAnswer(question) === "number"
      ) {
        return;
      }

      const rawValue = scoredPersonalityAnswerToRaw(
        question,
        session.answers[question.id]
      );

      if (
        saveRawPersonalityAnswer({
          definition,
          question,
          rawValue
        })
      ) {
        migratedCount += 1;
      }
    });
  });

  return migratedCount;
}
