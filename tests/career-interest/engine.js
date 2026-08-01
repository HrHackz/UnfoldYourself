"use strict";

const CAREER_TEST_ID = "werkorientatie::Interesse- en beroepsrichtingentest";
const CAREER_FIXED_START_IDS = (window.CAREER_INTEREST_ACTIVITY_QUESTIONS || []).filter(q => q.fixedStart).map(q => q.id);
const CAREER_ACTIVITY_BY_ID = Object.fromEntries((window.CAREER_INTEREST_ACTIVITY_QUESTIONS || []).map(q => [q.id,q]));
const CAREER_CONDITION_BY_ID = Object.fromEntries((window.CAREER_INTEREST_CONDITION_QUESTIONS || []).map(q => [q.id,q]));
window.CAREER_OCCUPATION_BY_ID = Object.fromEntries((window.CAREER_OCCUPATIONS || []).map(o => [o.id,o]));
const CAREER_SKILL_GROUP_BY_ID = Object.fromEntries((window.CAREER_SKILL_GROUPS || []).map(g => [g.id,g]));

function createCareerModuleChoiceQuestion() {
  return { id: "career-module-choice", text: "Welk deel wil je invullen?", category: "Testkeuze", type: "module-choice", inputType: "module-choice" };
}
function createCareerGroupChoiceQuestion() {
  return { id: "career-skill-groups", text: "Welke vaardigheidsgroepen zijn voor jou relevant?", category: "Vaardigheden", type: "skill-groups", inputType: "group-select" };
}
function createCareerSkillQuestion(groupId) {
  const group = CAREER_SKILL_GROUP_BY_ID[groupId];
  return { id: `career-skills-${groupId}`, text: group ? `Wat ken of kun je binnen ${group.name.toLowerCase()}?` : "Welke vaardigheden wil je aanduiden?", category: group?.name || "Vaardigheden", type: "skills", inputType: "skills-multi", groupId };
}
function createCareerOccupationQuestion(occupationId) {
  const occupation = window.CAREER_OCCUPATION_BY_ID[occupationId];
  if (!occupation) return null;
  const letters = String(occupation.riasec || "").split("");
  return { id: `career-occ-${occupation.id}`, text: `${occupation.name} lijkt me interessant.`, category: "Beroep", type: "interest", kind: "occupation", occupationId: occupation.id, sector: occupation.sector, primary: letters[0], secondary: letters[1], tertiary: letters[2] };
}
function getCareerQuestionById(id) {
  if (id === "career-module-choice") return createCareerModuleChoiceQuestion();
  if (id === "career-skill-groups") return createCareerGroupChoiceQuestion();
  if (id.startsWith("career-skills-")) return createCareerSkillQuestion(id.replace("career-skills-",""));
  if (id.startsWith("career-occ-")) return createCareerOccupationQuestion(id.replace("career-occ-",""));
  return CAREER_ACTIVITY_BY_ID[id] || CAREER_CONDITION_BY_ID[id] || null;
}
function getCareerQuestionMap(session) {
  const map = { ...CAREER_ACTIVITY_BY_ID, ...CAREER_CONDITION_BY_ID };
  (session?.questionSequence || []).forEach(id => {
    const question = getCareerQuestionById(id);
    if (question) map[id] = question;
  });
  return map;
}
function getCareerSessionQuestions({ session }) {
  return (session?.questionSequence || []).map(getCareerQuestionById).filter(Boolean);
}
function createCareerSession({ startedAt }) {
  return { schemaVersion: 1, mode: null, questionSequence: ["career-module-choice"], currentQuestionIndex: 0, answers: {}, interestTopHistory: [], interestComplete: false, conditionsAdded: false, skillsAdded: false, startedAt };
}

function renderCareerChoiceButtons(container, options, selected, onChange, modifier = "") {
  const grid = document.createElement("div");
  grid.className = `career-choice-grid ${modifier}`.trim();
  options.forEach((option,index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option career-choice-option";
    button.classList.toggle("is-selected", answerValuesEqual(selected, option.value));
    button.setAttribute("aria-pressed", String(answerValuesEqual(selected, option.value)));
    const marker = document.createElement("span");
    marker.className = "answer-option-marker";
    marker.textContent = option.marker || String(index+1);
    const copy = document.createElement("span");
    copy.className = "answer-option-copy";
    const title = document.createElement("strong");
    title.textContent = option.label;
    const description = document.createElement("small");
    description.textContent = option.description || "";
    if (!description.textContent) description.hidden = true;
    copy.append(title,description);
    button.append(marker,copy);
    button.addEventListener("click",() => { onChange(option.value); renderCurrentQuestion(); });
    grid.appendChild(button);
  });
  container.appendChild(grid);
}

function renderCareerGroupSelection({ selectedAnswer, container, onChange }) {
  let selected = Array.isArray(selectedAnswer) ? [...selectedAnswer] : [];
  const intro = document.createElement("p");
  intro.className = "career-field-help";
  intro.textContent = "Kies alleen groepen waarin je minstens één vaardigheid wilt aanduiden. Je opent daarna uitsluitend de gekozen groepen.";
  const grid = document.createElement("div");
  grid.className = "career-group-grid";
  function update() {
    grid.querySelectorAll("button").forEach(button => {
      const active = selected.includes(button.dataset.groupId);
      button.classList.toggle("is-selected",active);
      button.setAttribute("aria-pressed",String(active));
    });
  }
  (window.CAREER_SKILL_GROUPS || []).forEach(group => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "career-group-button";
    button.dataset.groupId = group.id;
    button.innerHTML = `<strong></strong><small></small>`;
    button.querySelector("strong").textContent = group.name;
    button.querySelector("small").textContent = `${group.skills.length} vaardigheden`;
    button.addEventListener("click",() => {
      selected = selected.includes(group.id) ? selected.filter(id => id !== group.id) : [...selected,group.id];
      onChange([...selected]);
      update();
    });
    grid.appendChild(button);
  });
  container.append(intro,grid);
  update();
  return true;
}

function renderCareerSkillSelection({ question, selectedAnswer, container, onChange }) {
  const group = CAREER_SKILL_GROUP_BY_ID[question.groupId];
  if (!group) return false;
  let value = selectedAnswer && typeof selectedAnswer === "object" ? { selected: [...(selectedAnswer.selected || [])], other: [...(selectedAnswer.other || [])] } : { selected: [], other: [] };
  const selectedSet = new Set(value.selected);
  const help = document.createElement("p");
  help.className = "career-field-help";
  help.textContent = "Selecteer wat je voldoende kent om het in een werkcontext te gebruiken. Dit is geen niveautest.";
  const search = document.createElement("input");
  search.type = "search";
  search.className = "career-skill-search";
  search.placeholder = "Zoek binnen deze groep";
  const counter = document.createElement("strong");
  counter.className = "career-selection-counter";
  const grid = document.createElement("div");
  grid.className = "career-skill-grid";
  function save() { value.selected = [...selectedSet]; onChange({ selected: [...value.selected], other: [...value.other] }); }
  function render(filter = "") {
    grid.replaceChildren();
    const normalized = filter.trim().toLocaleLowerCase("nl-BE");
    group.skills.filter(skill => !normalized || skill.name.toLocaleLowerCase("nl-BE").includes(normalized)).forEach(skill => {
      const label = document.createElement("label");
      label.className = "career-skill-option";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = selectedSet.has(skill.id);
      const span = document.createElement("span");
      span.textContent = skill.name;
      checkbox.addEventListener("change",() => { checkbox.checked ? selectedSet.add(skill.id) : selectedSet.delete(skill.id); save(); counter.textContent = `${selectedSet.size} geselecteerd`; label.classList.toggle("is-selected",checkbox.checked); });
      label.classList.toggle("is-selected",checkbox.checked);
      label.append(checkbox,span);
      grid.appendChild(label);
    });
    counter.textContent = `${selectedSet.size} geselecteerd`;
  }
  search.addEventListener("input",() => render(search.value));

  const customWrap = document.createElement("div");
  customWrap.className = "career-custom-skill";
  const customInput = document.createElement("input");
  customInput.type = "text";
  customInput.placeholder = "Andere vaardigheid binnen deze groep";
  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "button button-secondary";
  addButton.textContent = "Toevoegen";
  const customList = document.createElement("div");
  customList.className = "career-custom-skill-list";
  function renderCustom() {
    customList.replaceChildren();
    value.other.forEach((text,index) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.textContent = `${text} ×`;
      chip.addEventListener("click",() => { value.other.splice(index,1); save(); renderCustom(); });
      customList.appendChild(chip);
    });
  }
  addButton.addEventListener("click",() => {
    const text = customInput.value.trim();
    if (!text || value.other.includes(text)) return;
    value.other.push(text); customInput.value = ""; save(); renderCustom();
  });
  customWrap.append(customInput,addButton,customList);
  container.append(help,search,counter,grid,customWrap);
  render(); renderCustom();
  return true;
}

function renderCareerQuestionInput(context) {
  const { question, selectedAnswer, container, onChange } = context;
  if (question.type === "module-choice") {
    renderCareerChoiceButtons(container,[
      { value:"interests", marker:"I", label:"Mijn interesses", description:"Ontdek welke werkactiviteiten, sectoren en beroepsrichtingen je aanspreken." },
      { value:"skills", marker:"V", label:"Mijn vaardigheden", description:"Duid zelf aan wat je al kent of kunt. Er wordt niets getest." },
      { value:"both", marker:"I+V", label:"Interesses én vaardigheden", description:"Ontvang het meest complete rapport met matches, groeirichtingen en mogelijke instapfuncties." }
    ],selectedAnswer,onChange,"career-module-grid");
    return true;
  }
  if (question.type === "interest" || question.type === "condition") {
    renderCareerChoiceButtons(container,[
      { value:true, marker:"👍", label:"Interesseert mij", description: question.type === "condition" ? "Dit past bij mijn voorkeur." : "Ja, dit spreekt mij aan." },
      { value:false, marker:"👎", label:"Interesseert mij niet", description: question.type === "condition" ? "Dit past niet bij mijn voorkeur." : "Nee, dit spreekt mij niet aan." }
    ],selectedAnswer,onChange,"career-thumb-grid");
    return true;
  }
  if (question.type === "skill-groups") return renderCareerGroupSelection(context);
  if (question.type === "skills") return renderCareerSkillSelection(context);
  return false;
}

function isCareerAnswerValid(question, answer) {
  if (question.type === "module-choice") return ["interests","skills","both"].includes(answer);
  if (question.type === "interest" || question.type === "condition") return typeof answer === "boolean";
  if (question.type === "skill-groups") return Array.isArray(answer) && answer.length > 0;
  if (question.type === "skills") return Boolean(answer && ((Array.isArray(answer.selected) && answer.selected.length) || (Array.isArray(answer.other) && answer.other.length)));
  return false;
}

function careerAnsweredInterestCount(session) {
  return Object.keys(session.answers || {}).filter(id => {
    const q = getCareerQuestionById(id);
    return q?.type === "interest" && typeof session.answers[id] === "boolean";
  }).length;
}
function careerActivityCounts(session) {
  const counts = Object.fromEntries(CAREER_RIASEC_ORDER.map(code => [code,0]));
  Object.entries(session.answers || {}).forEach(([id,answer]) => {
    const q = getCareerQuestionById(id);
    if (q?.kind === "activity" && typeof answer === "boolean") counts[q.primary] += 1;
  });
  return counts;
}
function chooseNextCareerActivity(session) {
  const used = new Set(session.questionSequence || []);
  const counts = careerActivityCounts(session);
  const underMeasured = CAREER_RIASEC_ORDER.filter(code => counts[code] < 4).sort((a,b) => counts[a]-counts[b]);
  const riasec = calculateCareerRiasec(session);
  const targetCodes = underMeasured.length ? underMeasured : [...riasec.ranking].sort((a,b) => Math.abs(riasec.scores[a]-50)-Math.abs(riasec.scores[b]-50));
  for (const code of targetCodes) {
    const candidates = (window.CAREER_INTEREST_ACTIVITY_QUESTIONS || []).filter(q => !used.has(q.id) && q.primary === code);
    if (candidates.length) return candidates[(session.questionSequence.length + code.charCodeAt(0)) % candidates.length].id;
  }
  return (window.CAREER_INTEREST_ACTIVITY_QUESTIONS || []).find(q => !used.has(q.id))?.id || null;
}
function chooseNextCareerOccupation(session) {
  const used = new Set((session.questionSequence || []).filter(id => id.startsWith("career-occ-")).map(id => id.replace("career-occ-","")));
  const riasec = calculateCareerRiasec(session);
  const eligible = (window.CAREER_OCCUPATIONS || []).filter(o => o.questionEligible && !used.has(o.id));
  const top = riasec.ranking.slice(0,3);
  eligible.sort((a,b) => {
    function value(o) {
      const letters = String(o.riasec || "");
      let score = 0;
      top.forEach((letter,index) => { const pos = letters.indexOf(letter); if (pos >= 0) score += (3-index) * (3-pos); });
      if ((window.CAREER_INTEREST_REQUIRED_OCCUPATIONS || []).includes(o.name)) score += 2;
      return score;
    }
    return value(b)-value(a) || a.name.localeCompare(b.name,"nl");
  });
  return eligible[0] ? `career-occ-${eligible[0].id}` : null;
}
function shouldFinishCareerInterest(session) {
  const answered = careerAnsweredInterestCount(session);
  const counts = careerActivityCounts(session);
  if (answered < 30 || CAREER_RIASEC_ORDER.some(code => counts[code] < 4)) return false;
  const currentCode = calculateCareerRiasec(session).code;
  session.interestTopHistory = [...(session.interestTopHistory || []),currentCode].slice(-6);
  const stable = session.interestTopHistory.length >= 6 && session.interestTopHistory.every(code => code === currentCode);
  return stable || answered >= 42;
}
function appendCareerConditions(session) {
  if (session.conditionsAdded) return;
  session.questionSequence.push(...(window.CAREER_INTEREST_CONDITION_QUESTIONS || []).map(q => q.id));
  session.conditionsAdded = true;
}
function appendCareerSkills(session) {
  if (session.skillsAdded) return;
  session.questionSequence.push("career-skill-groups");
  session.skillsAdded = true;
}

function prepareCareerNextQuestion({ session, currentQuestion }) {
  const isCurrentEndOfSequence =
    session.currentQuestionIndex ===
    (session.questionSequence || []).length - 1;

  if (!isCurrentEndOfSequence) {
    return { continue: true };
  }

  if (currentQuestion.type === "module-choice") {
    session.mode = session.answers[currentQuestion.id];
    if (session.mode === "skills") appendCareerSkills(session);
    else session.questionSequence.push(...CAREER_FIXED_START_IDS);
    return { continue: true };
  }

  if (currentQuestion.type === "interest") {
    if (shouldFinishCareerInterest(session)) {
      appendCareerConditions(session);
    } else {
      const answered = careerAnsweredInterestCount(session);
      const occupationAsked = (session.questionSequence || []).filter(id => id.startsWith("career-occ-")).length;
      const shouldAskOccupation = answered >= 12 && occupationAsked < 8 && currentQuestion.kind !== "occupation" && answered % 2 === 0;
      const nextId = shouldAskOccupation ? chooseNextCareerOccupation(session) : chooseNextCareerActivity(session);
      if (nextId && !session.questionSequence.includes(nextId)) session.questionSequence.push(nextId);
      else if (!session.conditionsAdded) appendCareerConditions(session);
    }
    return { continue: true };
  }

  if (currentQuestion.type === "condition") {
    const conditionIds = (window.CAREER_INTEREST_CONDITION_QUESTIONS || []).map(q => q.id);
    if (currentQuestion.id === conditionIds[conditionIds.length-1]) {
      session.interestComplete = true;
      if (session.mode === "both") appendCareerSkills(session);
      else return { complete: true };
    }
    return { continue: true };
  }

  if (currentQuestion.type === "skill-groups") {
    const groups = session.answers[currentQuestion.id] || [];
    groups.forEach(groupId => {
      const id = `career-skills-${groupId}`;
      if (!session.questionSequence.includes(id)) session.questionSequence.push(id);
    });
    return { continue: true };
  }

  if (currentQuestion.type === "skills") {
    const selected = session.answers["career-skill-groups"] || [];
    const lastId = selected.length ? `career-skills-${selected[selected.length-1]}` : null;
    if (currentQuestion.id === lastId) return { complete: true };
  }
  return { continue: true };
}

function getCareerProgress({ session, question, currentIndex, totalQuestions }) {
  if (question.type === "module-choice") return { counter:"Start", label:"Kies je testonderdeel", percentage:0, nextLabel:"Verder" };
  if (question.type === "skill-groups") return { counter:"Vaardigheden · groepen kiezen", label:"Vaardighedeninventaris", percentage: session.mode === "both" ? 72 : 10, nextLabel:"Open gekozen groepen" };
  if (question.type === "skills") {
    const groups = session.answers["career-skill-groups"] || [];
    const position = Math.max(0, groups.indexOf(question.groupId));
    const percentage = session.mode === "both" ? 75 + Math.round(((position+1)/Math.max(1,groups.length))*25) : Math.round(((position+1)/Math.max(1,groups.length))*100);
    return { counter:`Vaardigheidsgroep ${position+1} van ${groups.length}`, label:"Vaardighedeninventaris", percentage, nextLabel: position === groups.length-1 ? "Bekijk mijn resultaat" : "Volgende groep" };
  }
  if (question.type === "condition") {
    const conditions = window.CAREER_INTEREST_CONDITION_QUESTIONS || [];
    const pos = conditions.findIndex(q => q.id === question.id);
    return { counter:`Werkvoorkeur ${pos+1} van ${conditions.length}`, label:"Werkomgeving verfijnen", percentage: Math.min(session.mode === "both" ? 70 : 96, 84 + Math.round(((pos+1)/conditions.length)*12)), nextLabel: pos === conditions.length-1 ? (session.mode === "both" ? "Naar mijn vaardigheden" : "Bekijk mijn resultaat") : "Volgende voorkeur" };
  }
  const answered = careerAnsweredInterestCount(session);
  return { counter:`Interessevraag ${Math.max(1,answered+1)}`, label: question.kind === "occupation" ? "Beroepsvoorkeur" : "Interesseprofiel", percentage: Math.min(session.mode === "both" ? 68 : 82, Math.round((Math.max(1,answered)/42)*(session.mode === "both" ? 68 : 82))), nextLabel:"Volgende vraag" };
}

function prepareCareerStoredState({ state, testId }) {
  const session = state.activeTests?.[testId];
  if (session && session.schemaVersion !== 1) delete state.activeTests[testId];
  const result = state.results?.[testId];
  if (result && result.schemaVersion !== 1) {
    delete state.results[testId];
    state.completedTests = (state.completedTests || []).filter(id => id !== testId);
  }
}

const CAREER_INTEREST_TEST_DEFINITION = {
  id: CAREER_TEST_ID,
  domainId: "werkorientatie",
  domainTitle: "Werkoriëntatie & beroepsrichting",
  title: "Interesse- en beroepsrichtingentest",
  description: "Verken welke werkzaamheden en beroepen je aanspreken, inventariseer wat je al kent of kunt, of combineer beide onderdelen in één gericht beroepsrapport.",
  estimatedTime: "Ongeveer 8 tot 20 minuten, afhankelijk van je keuze",
  resultType: "career-interest-profile",
  mainScoreHeading: "Jouw beroepsrichting",
  printReportSubtitle: "Interesse- en beroepsrichtingenrapport",
  schemaVersion: 1,
  questions: [createCareerModuleChoiceQuestion()],
  choices: [{ value:"both", label:"Interesses én vaardigheden" }],
  createSession: createCareerSession,
  prepareStoredState: prepareCareerStoredState,
  getSessionQuestions: getCareerSessionQuestions,
  getIntroQuestionCountText() { return "Kies één of beide onderdelen"; },
  getProgress: getCareerProgress,
  renderQuestionInput: renderCareerQuestionInput,
  isAnswerValid: isCareerAnswerValid,
  prepareNextQuestion: prepareCareerNextQuestion,
  calculateResult: calculateCareerInterestResult,
  renderResultDetails: renderCareerInterestResult,
  evidence: {
    summary: "Het interessegedeelte gebruikt de zes RIASEC-richtingen van Hollands beroepsinteressemodel. Beroeps- en vaardigheidskoppelingen zijn gebaseerd op een vaste Belgische momentopname van beroepsprofielen.",
    source: "Holland, J. L. (1997), O*NET Interest Profiler en VDAB Competent 2.0, release 3.27 (2026 Q2). Arbeidsmarktinformatie: VDAB Knelpuntberoepen 2026.",
    disclaimer: "Dit is een hulpmiddel voor zelfreflectie en beroepsverkenning. De vaardigheden zijn zelf gerapporteerd en niet getoetst. Een suggestie vervangt geen selectieprocedure en bewijst niet dat je aan diploma-, erkennings- of attestvereisten voldoet."
  }
};

window.UNFOLD_TEST_DEFINITIONS = Array.isArray(window.UNFOLD_TEST_DEFINITIONS) ? window.UNFOLD_TEST_DEFINITIONS : [];
window.UNFOLD_TEST_DEFINITIONS.push(CAREER_INTEREST_TEST_DEFINITION);
