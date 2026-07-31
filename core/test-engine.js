"use strict";

/*
  Unfold Yourself — algemene testworkflow en vraagmotor
  Afhankelijkheden: core/test-utils.js, core/test-registry.js, core/storage.js, core/profile-ui.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

function getTestDefinition(testId) {
  return testLibrary[testId] || null;
}


function getActiveTestSession(testId) {
  return state.activeTests[testId] || null;
}


function createTestSession(
  definition
) {
  if (
    typeof definition
      ?.createSession ===
      "function"
  ) {
    return definition.createSession({
      definition,
      startedAt:
        new Date().toISOString()
    });
  }

  return {
    currentQuestionIndex: 0,
    answers: {},
    startedAt:
      new Date().toISOString()
  };
}


function getQuestionsForSession(
  definition,
  session
) {
  const baseQuestions =
    Array.isArray(
      definition?.questions
    )
      ? definition.questions
      : [];

  const additionalQuestions =
    Array.isArray(
      session?.additionalQuestions
    )
      ? session.additionalQuestions
      : [];

  return [
    ...baseQuestions,
    ...additionalQuestions
  ];
}


function hideAllTestScreens() {
  testIntroScreen.hidden = true;
  questionScreen.hidden = true;
  resultScreen.hidden = true;
}


function showTestWorkspace() {
  testWorkspace.hidden = false;

  document.body.classList.add("test-active");
  document.body.classList.remove("no-scroll");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function closeTestWorkspace() {
  testWorkspace.hidden = true;

  document.body.classList.remove("test-active");

  activeTestId = null;

  window.setTimeout(() => {
    const profileSection =
      document.querySelector("#profiel");

    if (profileSection) {
      profileSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, 50);
}


function updateTestTopbar(label, percentage) {
  const safePercentage = Math.max(
    0,
    Math.min(100, percentage)
  );

  testTopbarLabel.textContent = label;
  testTopbarProgress.style.width =
    `${safePercentage}%`;
}


function openTestFlow(testId) {
  const definition = getTestDefinition(testId);

  if (!definition) {
    showToast(
      "Deze test wordt in een volgende bouwfase toegevoegd."
    );

    return;
  }

  activeTestId = testId;

  if (typeof definition.prepareStoredState === "function") {
    definition.prepareStoredState({
      definition,
      state,
      testId
    });
    saveState();
  }

  closeDomain();
  showTestWorkspace();

  const storedResult = state.results[testId];

  const isCompleted =
    state.completedTests.includes(testId);

  if (storedResult && isCompleted) {
    renderTestResult(storedResult);
    return;
  }

  showTestIntroduction();
}


function showTestIntroduction() {
  const definition =
    getTestDefinition(activeTestId);

  if (!definition) {
    return;
  }

  hideAllTestScreens();
  testIntroScreen.hidden = false;

  const activeSession =
    getActiveTestSession(activeTestId);

  testIntroDomain.textContent =
    definition.domainTitle;

  testWorkspaceTitle.textContent =
    definition.title;

  testIntroDescription.textContent =
    definition.description;

  testQuestionCount.textContent =
    `${definition.questions.length} vragen`;

  testEstimatedTime.textContent =
    definition.estimatedTime;

 const evidence =
  definition.evidence || {};

testEvidenceSummary.textContent =
  evidence.summary ||
  "Voor deze test is nog geen aanvullende broninformatie opgenomen.";

testEvidenceSource.textContent =
  evidence.source ||
  "Geen specifieke bron vermeld.";

testEvidenceDisclaimer.textContent =
  evidence.disclaimer ||
  "Dit resultaat is bedoeld voor zelfinzicht en persoonlijke ontwikkeling.";

  if (activeSession) {
    const answeredQuestions =
      Object.keys(activeSession.answers || {}).length;

    const sessionQuestions =
      getQuestionsForSession(
        definition,
        activeSession
      );

    const savedPercentage = Math.round(
      (
        answeredQuestions /
        Math.max(
          1,
          sessionQuestions.length
        )
      ) * 100
    );

    beginTestButton.textContent =
      "Verdergaan met deze test";

    updateTestTopbar(
      "Test in uitvoering",
      savedPercentage
    );
  } else {
    beginTestButton.textContent =
      "Start deze test";

    updateTestTopbar(
      "Testvoorbereiding",
      0
    );
  }
}


function beginOrResumeTest() {
  const definition =
    getTestDefinition(activeTestId);

  if (!definition) {
    return;
  }

  if (!state.activeTests[activeTestId]) {
    state.activeTests[
      activeTestId
    ] = createTestSession(
      definition
    );

    saveState();
  }

  hideAllTestScreens();
  questionScreen.hidden = false;

  renderCurrentQuestion();
}


function renderCurrentQuestion() {
  const definition =
    getTestDefinition(activeTestId);

  const session =
    getActiveTestSession(activeTestId);

  if (!definition || !session) {
    return;
  }

  const sessionQuestions =
    getQuestionsForSession(
      definition,
      session
    );

  const totalQuestions =
    sessionQuestions.length;

  const safeQuestionIndex = Math.max(
    0,
    Math.min(
      session.currentQuestionIndex,
      totalQuestions - 1
    )
  );

  session.currentQuestionIndex =
    safeQuestionIndex;

  const question =
    sessionQuestions[
      safeQuestionIndex
    ];

  const questionNumber =
    safeQuestionIndex + 1;

  const isAdditionalQuestion =
    question?.isTieBreak === true;

  const baseQuestionCount =
    definition.questions.length;

  const additionalQuestionCount =
    Array.isArray(
      session.additionalQuestions
    )
      ? session.additionalQuestions.length
      : 0;

  const additionalQuestionNumber =
    isAdditionalQuestion
      ? (
          safeQuestionIndex -
          baseQuestionCount +
          1
        )
      : 0;

  const progressPercentage =
    isAdditionalQuestion
      ? 100
      : Math.round(
          (
            questionNumber /
            baseQuestionCount
          ) * 100
        );

  questionTestTitle.textContent =
    definition.title;

  questionCounter.textContent =
    isAdditionalQuestion
      ? `Aanvullende vraag ${additionalQuestionNumber} van ${additionalQuestionCount}`
      : `Vraag ${questionNumber} van ${baseQuestionCount}`;

  questionPercentage.textContent =
    `${progressPercentage}%`;

  questionProgressBar.style.width =
    `${progressPercentage}%`;

  questionCategory.textContent =
    question.category || "";

  questionCategory.hidden =
    !questionCategory.textContent;

  questionText.textContent =
    question.text ||
    "Vraagtekst niet beschikbaar.";

  updateTestTopbar(
    isAdditionalQuestion
      ? `Aanvullende vraag ${additionalQuestionNumber} van ${additionalQuestionCount}`
      : `Vraag ${questionNumber} van ${baseQuestionCount}`,
    progressPercentage
  );

  previousQuestionButton.disabled =
    safeQuestionIndex === 0;

  const isLastSessionQuestion =
    questionNumber ===
    totalQuestions;

  const mayNeedAdditionalQuestions =
    !isAdditionalQuestion &&
    safeQuestionIndex ===
      baseQuestionCount - 1 &&
    session.additionalQuestionsPrepared !==
      true &&
    typeof definition.getAdditionalQuestions ===
      "function";

  nextQuestionButton.textContent =
    isLastSessionQuestion
      ? (
          mayNeedAdditionalQuestions
            ? "Resultaat berekenen"
            : "Bekijk mijn resultaat"
        )
      : isAdditionalQuestion
        ? "Volgende aanvullende vraag"
        : "Volgende vraag";

  answerWarning.hidden = true;
  answerOptions.replaceChildren();

const selectedAnswer =
  session.answers[question.id];

const currentChoices =
  getChoicesForQuestion(
    definition,
    question
  );

if (currentChoices.length === 0) {
  showToast(
    "De antwoordkeuzes konden niet worden geladen."
  );

  return;
}

if (typeof definition.renderQuestionInput === "function") {
  const handled = definition.renderQuestionInput({
    question,
    choices: currentChoices,
    selectedAnswer,
    container: answerOptions,
    onChange(value) {
      session.answers[question.id] = value;
      answerWarning.hidden = true;
      saveState();
    }
  });

  if (handled === true) {
    saveState();
    return;
  }
}

currentChoices.forEach(
  (answer, answerIndex) => {
    const optionButton =
      document.createElement("button");

    optionButton.type = "button";
    optionButton.className = "answer-option";
    optionButton.dataset.answerIndex =
      String(answerIndex);

    optionButton.setAttribute(
      "role",
      "radio"
    );

    const isSelected =
      hasSavedAnswer(
        session,
        question.id
      ) &&
      answerValuesEqual(
        selectedAnswer,
        answer.value
      );

    optionButton.setAttribute(
      "aria-checked",
      String(isSelected)
    );

    if (isSelected) {
      optionButton.classList.add(
        "is-selected"
      );
    }

    const marker =
      document.createElement("span");

    marker.className =
      "answer-option-marker";

    marker.textContent =
      String(
        answer.marker ??
        answer.color ??
        answerIndex + 1
      );

    const copy =
      document.createElement("span");

    copy.className =
      "answer-option-copy";

    const label =
      document.createElement("strong");

    label.textContent =
      answer.label ||
      String(
        answer.value ?? ""
      );

    const description =
      document.createElement("small");

    description.textContent =
      answer.description || "";

    description.hidden =
      !description.textContent;

    copy.append(
      label,
      description
    );

    optionButton.append(
      marker,
      copy
    );

    optionButton.addEventListener(
      "click",
      () => {
        selectCurrentAnswer(
          question.id,
          answer.value
        );
      }
    );

    answerOptions.appendChild(
      optionButton
    );
  });

  saveState();
}


function selectCurrentAnswer(
  questionId,
  value
) {
  const definition =
    getTestDefinition(
      activeTestId
    );

  const session =
    getActiveTestSession(
      activeTestId
    );

  if (!definition || !session) {
    return;
  }

  session.answers[
    questionId
  ] = value;

  saveState();

  answerWarning.hidden = true;

  const sessionQuestions =
    getQuestionsForSession(
      definition,
      session
    );

  const question =
    sessionQuestions[
      session.currentQuestionIndex
    ];

  const currentChoices =
    getChoicesForQuestion(
      definition,
      question
    );

  const optionButtons =
    answerOptions.querySelectorAll(
      ".answer-option"
    );

  optionButtons.forEach(
    button => {
      const answerIndex =
        Number(
          button.dataset
            .answerIndex
        );

      const buttonAnswer =
        currentChoices[
          answerIndex
        ];

      const isSelected =
        Boolean(buttonAnswer) &&
        answerValuesEqual(
          buttonAnswer.value,
          value
        );

      button.classList.toggle(
        "is-selected",
        isSelected
      );

      button.setAttribute(
        "aria-checked",
        String(isSelected)
      );
    }
  );
}


function goToNextQuestion() {
  const definition =
    getTestDefinition(activeTestId);

  const session =
    getActiveTestSession(activeTestId);

  if (!definition || !session) {
    return;
  }

  let sessionQuestions =
    getQuestionsForSession(
      definition,
      session
    );

  const currentQuestion =
    sessionQuestions[
      session.currentQuestionIndex
    ];

  const currentAnswer = session.answers[currentQuestion.id];
  const hasValidCurrentAnswer =
    typeof definition.isAnswerValid === "function"
      ? definition.isAnswerValid(currentQuestion, currentAnswer)
      : hasSavedAnswer(session, currentQuestion.id);

  if (!hasValidCurrentAnswer) {
    answerWarning.hidden = false;
    return;
  }

  const isLastQuestion =
    session.currentQuestionIndex ===
    sessionQuestions.length - 1;

  if (isLastQuestion) {
    const additionalQuestionsNotPrepared =
      session.additionalQuestionsPrepared !==
        true;

    if (
      additionalQuestionsNotPrepared &&
      typeof definition.getAdditionalQuestions ===
        "function"
    ) {
      const additionalQuestions =
        definition.getAdditionalQuestions({
          definition,
          session
        });

      session.additionalQuestionsPrepared =
        true;

      session.additionalQuestions =
        Array.isArray(
          additionalQuestions
        )
          ? additionalQuestions
          : [];

      sessionQuestions =
        getQuestionsForSession(
          definition,
          session
        );

      if (
        session.additionalQuestions.length >
        0
      ) {
        session.currentQuestionIndex += 1;

        saveState();
        renderCurrentQuestion();

        showToast(
          session.additionalQuestions.length === 1
            ? "Eén voorkeursschaal staat exact gelijk. Er volgt één aanvullende vraag."
            : `${session.additionalQuestions.length} voorkeursschalen staan exact gelijk. Er volgen ${session.additionalQuestions.length} aanvullende vragen.`
        );

        return;
      }
    }

    completeActiveTest();
    return;
  }

  session.currentQuestionIndex += 1;

  saveState();
  renderCurrentQuestion();
}


function goToPreviousQuestion() {
  const session =
    getActiveTestSession(activeTestId);

  if (!session) {
    return;
  }

  if (session.currentQuestionIndex > 0) {
    session.currentQuestionIndex -= 1;

    saveState();
    renderCurrentQuestion();
  }
}


function saveAndExitTest() {
  saveState();
  closeTestWorkspace();

  showToast(
    "Je antwoorden zijn lokaal opgeslagen."
  );
}

/* =========================================================
   ALGEMENE TESTMOTOR — RESULTAAT LATEN BEREKENEN
========================================================= */

function calculateActiveTestResult() {
  const definition =
    getTestDefinition(
      activeTestId
    );

  const session =
    getActiveTestSession(
      activeTestId
    );

  if (
    !definition ||
    !session ||
    typeof definition.calculateResult !==
      "function"
  ) {
    return null;
  }

  return definition.calculateResult({
    definition,
    session,
    testId:
      activeTestId
  });
}


function completeActiveTest() {
  const result =
    calculateActiveTestResult();

  if (!result) {
    showToast(
      "Het resultaat kon niet worden berekend."
    );

    return;
  }

  state.results[activeTestId] =
    result;

  if (
    !state.completedTests.includes(
      activeTestId
    )
  ) {
    state.completedTests.push(
      activeTestId
    );
  }

  delete state.activeTests[
    activeTestId
  ];

  saveState();

  renderDomains();
  renderProgress();

  renderTestResult(result);
}

function restartActiveTest() {
  if (!activeTestId) {
    return;
  }

  const confirmed = window.confirm(
    "Wil je deze test opnieuw uitvoeren? Het huidige resultaat wordt verwijderd."
  );

  if (!confirmed) {
    return;
  }

  const completedIndex =
    state.completedTests.indexOf(
      activeTestId
    );

  if (completedIndex >= 0) {
    state.completedTests.splice(
      completedIndex,
      1
    );
  }

  delete state.results[
    activeTestId
  ];

  const definition =
    getTestDefinition(
      activeTestId
    );

  if (!definition) {
    showToast(
      "Deze testconfiguratie kon niet worden geladen."
    );

    return;
  }

  state.activeTests[
    activeTestId
  ] = createTestSession(
    definition
  );

  saveState();

  renderDomains();
  renderProgress();

  showTestIntroduction();

  showToast(
    "De test is opnieuw gestart."
  );
}

