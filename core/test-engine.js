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


/* =========================================================
   INTERACTIEVE TESTTAKEN — VEILIGE LEVENSCYCLUS
========================================================= */

let activeQuestionCleanup = null;
let testNavigationLocked = false;
let testNavigationLockMessage = "Deze taak is nog bezig. Rond de huidige stap eerst af.";


function registerActiveQuestionCleanup(cleanup) {
  activeQuestionCleanup =
    typeof cleanup === "function"
      ? cleanup
      : null;
}


function clearActiveQuestionResources(reason = "cleanup") {
  const cleanup = activeQuestionCleanup;
  activeQuestionCleanup = null;

  if (typeof cleanup !== "function") {
    return;
  }

  try {
    cleanup(reason);
  } catch (error) {
    console.warn(
      "Een interactieve testtaak kon niet volledig worden opgeruimd.",
      error
    );
  }
}


function setTestNavigationLocked(locked, message) {
  testNavigationLocked = Boolean(locked);

  if (typeof message === "string" && message.trim()) {
    testNavigationLockMessage = message.trim();
  }

  const session = activeTestId
    ? getActiveTestSession(activeTestId)
    : null;

  previousQuestionButton.disabled =
    testNavigationLocked ||
    !session ||
    Number(session.currentQuestionIndex || 0) === 0;

  nextQuestionButton.disabled = testNavigationLocked;
  saveAndExitButton.disabled = testNavigationLocked;
}


function configureQuestionNavigation(options = {}) {
  if (typeof options.previousHidden === "boolean") {
    previousQuestionButton.hidden = options.previousHidden;
  }

  if (typeof options.nextHidden === "boolean") {
    nextQuestionButton.hidden = options.nextHidden;
  }

  if (typeof options.saveExitHidden === "boolean") {
    saveAndExitButton.hidden = options.saveExitHidden;
  }

  if (typeof options.previousLabel === "string") {
    previousQuestionButton.textContent = options.previousLabel;
  }

  if (typeof options.nextLabel === "string") {
    nextQuestionButton.textContent = options.nextLabel;
  }
}


function resetQuestionNavigationState() {
  previousQuestionButton.hidden = false;
  nextQuestionButton.hidden = false;
  saveAndExitButton.hidden = false;
  previousQuestionButton.textContent = "Vorige vraag";
  testNavigationLocked = false;
  testNavigationLockMessage =
    "Deze taak is nog bezig. Rond de huidige stap eerst af.";
  nextQuestionButton.disabled = false;
  saveAndExitButton.disabled = false;
}


function createQuestionInteractionApi(definition, session, question) {
  return {
    definition,
    session,
    question,
    state,
    testId: activeTestId,
    save() {
      session.updatedAt = new Date().toISOString();
      saveState();
    },
    rerender() {
      renderCurrentQuestion();
    },
    close(message) {
      session.updatedAt = new Date().toISOString();
      saveState();
      closeTestWorkspace();

      if (typeof message === "string" && message.trim()) {
        showToast(message.trim());
      }
    },
    complete() {
      session.updatedAt = new Date().toISOString();
      saveState();
      completeActiveTest();
    },
    setNavigationLocked(locked, message) {
      setTestNavigationLocked(locked, message);
    },
    configureNavigation(options) {
      configureQuestionNavigation(options);
    },
    registerCleanup(cleanup) {
      registerActiveQuestionCleanup(cleanup);
    },
    updateTopbar(label, percentage) {
      updateTestTopbar(label, percentage);
    }
  };
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
  if (typeof definition?.getSessionQuestions === "function") {
    const customQuestions = definition.getSessionQuestions({ definition, session });
    return Array.isArray(customQuestions) ? customQuestions : [];
  }

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



function applyActiveTestDomainTheme(definition) {
  const catalogDomain = domains.find(domain => domain.id === definition?.domainId);

  if (!catalogDomain) {
    testWorkspace.style.removeProperty("--test-accent");
    testWorkspace.style.removeProperty("--test-gradient");
    testWorkspace.style.removeProperty("--test-on-accent");
    delete testWorkspace.dataset.domainId;
    delete document.body.dataset.activeTestDomain;
    return;
  }

  testWorkspace.style.setProperty("--test-accent", catalogDomain.color);
  testWorkspace.style.setProperty("--test-gradient", catalogDomain.gradient || catalogDomain.color);
  testWorkspace.style.setProperty("--test-on-accent", catalogDomain.onGradient || "#F9F4F0");
  testWorkspace.dataset.domainId = catalogDomain.id;
  document.body.dataset.activeTestDomain = catalogDomain.id;
}

function clearActiveTestDomainTheme() {
  testWorkspace.style.removeProperty("--test-accent");
  testWorkspace.style.removeProperty("--test-gradient");
  testWorkspace.style.removeProperty("--test-on-accent");
  delete testWorkspace.dataset.domainId;
  delete document.body.dataset.activeTestDomain;
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
  clearActiveQuestionResources("workspace-closed");
  resetQuestionNavigationState();
  testWorkspace.hidden = true;

  document.body.classList.remove("test-active");
  clearActiveTestDomainTheme();

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
  if (activeTestId && activeTestId !== testId) {
    clearActiveQuestionResources("test-changed");
  }

  const definition = getTestDefinition(testId);

  if (!definition) {
    showToast(
      "Deze test wordt in een volgende bouwfase toegevoegd."
    );

    return;
  }

  activeTestId = testId;
  applyActiveTestDomainTheme(definition);

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

  const catalogDomain =
    domains.find(domain => {
      return domain.id === definition.domainId;
    });

  testIntroDomain.textContent =
    catalogDomain?.title ||
    definition.domainTitle;

  testWorkspaceTitle.textContent =
    definition.title;

  testIntroDescription.textContent =
    definition.description;

  testQuestionCount.textContent =
    typeof definition.getIntroQuestionCountText === "function"
      ? definition.getIntroQuestionCountText({ definition, activeSession })
      : `${definition.questions.length} vragen`;

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

  const defaultGuidance = [
    "Antwoord zo eerlijk mogelijk vanuit je normale gedrag.",
    "Kies niet wat sociaal wenselijk of professioneel ideaal klinkt.",
    "Denk aan hoe je meestal handelt, niet aan één uitzonderlijke situatie."
  ];

  const guidanceItems =
    Array.isArray(definition.introGuidance) && definition.introGuidance.length > 0
      ? definition.introGuidance
      : defaultGuidance;

  testGuidanceList.replaceChildren();
  guidanceItems.forEach(itemText => {
    const item = document.createElement("li");
    item.textContent = String(itemText);
    testGuidanceList.appendChild(item);
  });

  const defaultPreviewItems = [
    "Kernresultaat",
    "Scores per onderdeel",
    "Sterktes en ontwikkelpunten",
    "Praktische betekenis",
    "Persoonlijke ontwikkeltips"
  ];

  const previewItems =
    Array.isArray(definition.previewItems) && definition.previewItems.length > 0
      ? definition.previewItems
      : defaultPreviewItems;

  testPreviewTitle.textContent =
    definition.previewTitle ||
    "Een persoonlijk testresultaat";

  testPreviewList.replaceChildren();
  previewItems.forEach(itemText => {
    const item = document.createElement("li");
    item.textContent = String(itemText);
    testPreviewList.appendChild(item);
  });

  testPreviewText.textContent =
    definition.previewText ||
    "Het resultaat wordt toegevoegd aan je centrale profiel.";

  if (activeSession) {
    const answeredQuestions =
      Object.keys(activeSession.answers || {}).length;

    const sessionQuestions =
      getQuestionsForSession(
        definition,
        activeSession
      );

    const savedPercentage =
      typeof definition.getSavedProgressPercentage === "function"
        ? Math.max(0, Math.min(100, Number(definition.getSavedProgressPercentage({
            definition,
            activeSession,
            answeredQuestions,
            sessionQuestions
          })) || 0))
        : Math.round(
            (
              answeredQuestions /
              Math.max(1, sessionQuestions.length)
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

  clearActiveQuestionResources("question-rendered");
  resetQuestionNavigationState();

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

  const customProgress =
    typeof definition.getProgress === "function"
      ? definition.getProgress({
          definition,
          session,
          question,
          currentIndex: safeQuestionIndex,
          totalQuestions
        })
      : null;

  questionTestTitle.textContent =
    definition.title;

  questionCounter.textContent =
    customProgress?.counter || (
      isAdditionalQuestion
        ? `Aanvullende vraag ${additionalQuestionNumber} van ${additionalQuestionCount}`
        : `Vraag ${questionNumber} van ${baseQuestionCount}`
    );

  const visibleProgress =
    customProgress?.percentage ?? progressPercentage;

  questionPercentage.textContent =
    `${visibleProgress}%`;

  questionProgressBar.style.width =
    `${visibleProgress}%`;

  questionCategory.textContent =
    question.category || "";

  questionCategory.hidden =
    !questionCategory.textContent;

  questionText.textContent =
    question.text ||
    "Vraagtekst niet beschikbaar.";

  questionInstruction.textContent =
    question.instruction ||
    definition.questionInstruction ||
    "Kies het antwoord dat het beste bij jou past.";

  questionInstruction.hidden =
    !questionInstruction.textContent;

  updateTestTopbar(
    customProgress?.label || (
      isAdditionalQuestion
        ? `Aanvullende vraag ${additionalQuestionNumber} van ${additionalQuestionCount}`
        : `Vraag ${questionNumber} van ${baseQuestionCount}`
    ),
    visibleProgress
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
    customProgress?.nextLabel || (
      isLastSessionQuestion
        ? (
            mayNeedAdditionalQuestions
              ? "Resultaat berekenen"
              : "Bekijk mijn resultaat"
          )
        : isAdditionalQuestion
          ? "Volgende aanvullende vraag"
          : "Volgende vraag"
    );

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
    definition,
    session,
    state,
    testId: activeTestId,
    currentIndex: safeQuestionIndex,
    totalQuestions,
    question,
    choices: currentChoices,
    selectedAnswer,
    container: answerOptions,
    interactionApi: createQuestionInteractionApi(
      definition,
      session,
      question
    ),
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
  if (testNavigationLocked) {
    showToast(testNavigationLockMessage);
    return;
  }

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

  clearActiveQuestionResources("next-question");

  if (typeof definition.prepareNextQuestion === "function") {
    const customAdvance = definition.prepareNextQuestion({
      definition,
      session,
      currentQuestion
    }) || {};

    saveState();

    if (customAdvance.complete === true) {
      completeActiveTest();
      return;
    }

    sessionQuestions = getQuestionsForSession(
      definition,
      session
    );
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
  if (testNavigationLocked) {
    showToast(testNavigationLockMessage);
    return;
  }

  const session =
    getActiveTestSession(activeTestId);

  if (!session) {
    return;
  }

  if (session.currentQuestionIndex > 0) {
    clearActiveQuestionResources("previous-question");
    session.currentQuestionIndex -= 1;

    saveState();
    renderCurrentQuestion();
  }
}


function saveAndExitTest() {
  clearActiveQuestionResources("save-and-exit");
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
  clearActiveQuestionResources("test-completed");

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
  clearActiveQuestionResources("test-restarted");

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

