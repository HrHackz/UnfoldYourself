"use strict";

/*
  Unfold Yourself — profielwiel, voortgang en zijpaneel
  Afhankelijkheden: core/app-config.js, core/test-registry.js, core/storage.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

function makeTestId(domainId, testName) {
  return `${domainId}::${testName}`;
}

function getDomainProgress(domain) {
  const completed = domain.tests.filter(([name]) =>
    state.completedTests.includes(makeTestId(domain.id, name))
  ).length;

  return {
    completed,
    total: domain.tests.length,
    percentage: Math.round((completed / domain.tests.length) * 100)
  };
}

function getOverallProgress() {
  const completed = state.completedTests.length;
  return {
    completed,
    percentage: Math.round((completed / totalTests) * 100)
  };
}

function createDomainButton(domain, index, forMobile = false) {
  const fragment = domainButtonTemplate.content.cloneNode(true);
  const button = fragment.querySelector(".domain-node");
  const icon = fragment.querySelector(".domain-icon");
  const title = fragment.querySelector(".domain-copy strong");
  const meta = fragment.querySelector(".domain-copy small");
  const percentage = fragment.querySelector(".domain-percentage");
  const progress = getDomainProgress(domain);

  button.dataset.domainId = domain.id;
  button.style.setProperty("--domain-color", domain.color);
  button.setAttribute("aria-label", `${domain.title}: ${progress.completed} van ${progress.total} testen voltooid`);

  icon.textContent = domain.short;
  title.textContent = domain.title;
  meta.textContent = `${progress.completed} van ${progress.total} voltooid`;
  percentage.textContent = `${progress.percentage}%`;

  if (!forMobile) {
    const radius = 38.5;
    const angle = -90 + index * (360 / domains.length);
    const radians = angle * (Math.PI / 180);
    const x = 50 + Math.cos(radians) * radius;
    const y = 50 + Math.sin(radians) * radius;
    button.style.left = `${x}%`;
    button.style.top = `${y}%`;
  }

  button.addEventListener("click", () => openDomain(domain.id));
  return fragment;
}

function renderDomains() {
  domainLayer.replaceChildren();
  mobileDomainGrid.replaceChildren();

  domains.forEach((domain, index) => {
    domainLayer.appendChild(createDomainButton(domain, index, false));
    mobileDomainGrid.appendChild(createDomainButton(domain, index, true));
  });
}

function renderProgress() {
  const progress = getOverallProgress();

  document.querySelector("#heroProgressLabel").textContent = `${progress.percentage}%`;
  document.querySelector("#heroCompletedCount").textContent = progress.completed;
  document.querySelector("#heroProgressRing").style.setProperty("--progress", progress.percentage);
  document.querySelector("#totalProgressBar").style.width = `${progress.percentage}%`;
  document.querySelector("#totalProgressText").textContent = `${progress.completed} van ${totalTests} voltooid`;
  document.querySelector("#centerProgress").textContent = `${progress.percentage}%`;
}

function openDomain(domainId) {
  const domain = domains.find(item => item.id === domainId);
  if (!domain) return;

  activeDomainId = domainId;
  const progress = getDomainProgress(domain);

  document.querySelector("#drawerEyebrow").textContent = "Profielgebied";
  document.querySelector("#drawerTitle").textContent = domain.title;
  document.querySelector("#drawerProgressLabel").textContent =
    `${progress.completed} van ${progress.total} testen voltooid`;
  document.querySelector("#drawerProgressPercent").textContent = `${progress.percentage}%`;
  document.querySelector("#drawerProgressBar").style.width = `${progress.percentage}%`;

  testList.replaceChildren();

  domain.tests.forEach(([name, description]) => {
    const testId = makeTestId(domain.id, name);
    const isCompleted = state.completedTests.includes(testId);

    const article = document.createElement("article");
    article.className = "test-card";

    const copy = document.createElement("div");
    const heading = document.createElement("h3");
    const paragraph = document.createElement("p");
    heading.textContent = name;
    paragraph.textContent = description;
    copy.append(heading, paragraph);

const testDefinition = testLibrary[testId];

const isActive =
  Boolean(state.activeTests[testId]);

const status = document.createElement("span");
status.className = "test-status";

if (isCompleted) {
  status.textContent = "VOLTOOID";
} else if (isActive) {
  status.textContent = "IN UITVOERING";
} else if (testDefinition) {
  status.textContent = "BESCHIKBAAR";
} else {
  status.textContent = "BINNENKORT";
}

    const actions = document.createElement("div");
    actions.className = "test-card-actions";

const actionButton = document.createElement("button");

actionButton.type = "button";
actionButton.className = "test-start-button";

if (!testDefinition) {
  actionButton.textContent = "Binnenkort beschikbaar";
  actionButton.disabled = true;
} else if (isCompleted) {
  actionButton.textContent = "Bekijk resultaat";

  actionButton.addEventListener("click", () => {
    openTestFlow(testId);
  });
} else if (isActive) {
  actionButton.textContent = "Ga verder";

  actionButton.addEventListener("click", () => {
    openTestFlow(testId);
  });
} else {
  actionButton.textContent = "Start test";

  actionButton.addEventListener("click", () => {
    openTestFlow(testId);
  });
}

    actions.appendChild(actionButton);
    article.append(copy, status, actions);
    testList.appendChild(article);
  });

  overlay.hidden = false;
  domainDrawer.classList.add("is-open");
  domainDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  document.querySelector("#closeDrawerButton").focus();
}

function closeDomain() {
  domainDrawer.classList.remove("is-open");
  domainDrawer.setAttribute("aria-hidden", "true");
  overlay.hidden = true;
  document.body.classList.remove("no-scroll");
  activeDomainId = null;
}

function toggleDemoCompletion(testId) {
  const existingIndex = state.completedTests.indexOf(testId);

  if (existingIndex >= 0) {
    state.completedTests.splice(existingIndex, 1);
  } else {
    state.completedTests.push(testId);
  }

  saveState();
  renderDomains();
  renderProgress();

  if (activeDomainId) openDomain(activeDomainId);
}

