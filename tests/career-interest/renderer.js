"use strict";

function createCareerElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function createCareerOccupationCard(item, mode) {
  const card = createCareerElement("article", "career-occupation-card");
  const header = createCareerElement("div", "career-occupation-header");
  const copy = createCareerElement("div");
  copy.append(
    createCareerElement("span", "career-sector", item.occupation.sector),
    createCareerElement("h4", "", item.occupation.name)
  );
  const score = mode === "both" ? item.combined : mode === "interests" ? item.interestFit : item.skillsFit;
  header.append(copy, createCareerElement("strong", "career-fit-label", getCareerFitLabel(score)));
  card.appendChild(header);

  const reasons = createCareerElement("div", "career-reasons");
  if (item.interestFit !== null) {
    reasons.appendChild(createCareerElement("p", "", `Interesseaansluiting: ${getCareerFitLabel(item.interestFit).toLowerCase()}.`));
  }
  if (item.skillDetail) {
    const matched = [...item.skillDetail.matchedCore, ...item.skillDetail.matchedAdditional].slice(0,5).map(skill => skill.name);
    if (matched.length) reasons.appendChild(createCareerElement("p", "", `Sluit aan bij wat je aangaf: ${matched.join(", ")}.`));
    if (item.skillDetail.missingCore.length) reasons.appendChild(createCareerElement("p", "career-growth-copy", `Mogelijke groeistappen: ${item.skillDetail.missingCore.map(skill => skill.name).join(", ")}.`));
  }
  if (item.occupation.bottleneck) reasons.appendChild(createCareerElement("p", "career-market-note", "Dit is momenteel een Vlaams knelpuntberoep. Dat is aanvullende arbeidsmarktinformatie en verandert je persoonlijke match niet."));
  card.appendChild(reasons);
  return card;
}

function appendCareerBlock(title, intro, items, mode, emptyText) {
  const section = createCareerElement("section", "result-content-card career-result-block");
  section.dataset.dynamicProfileCard = "true";
  section.style.gridColumn = "1 / -1";
  section.append(
    createCareerElement("span", "result-card-label", "Beroepsrichtingen"),
    createCareerElement("h3", "", title),
    createCareerElement("p", "", intro)
  );
  const grid = createCareerElement("div", "career-occupation-grid");
  if (items.length) items.forEach(item => grid.appendChild(createCareerOccupationCard(item, mode)));
  else grid.appendChild(createCareerElement("p", "career-empty-state", emptyText));
  section.appendChild(grid);
  resultContentGrid.appendChild(section);
}

function renderCareerInterestResult(result) {
  ["resultStrengthsCard","resultDevelopmentCard","resultMeaningCard","resultAdviceCard"].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  });

  if (result.hasInterests && result.riasec) {
    const top = result.riasec.ranking.slice(0,3);
    const section = createCareerElement("article", "result-content-card career-profile-card");
    section.dataset.dynamicProfileCard = "true";
    section.style.gridColumn = "1 / -1";
    section.append(
      createCareerElement("span", "result-card-label", "Interesseprofiel"),
      createCareerElement("h3", "", `Jouw sterkste combinatie: ${result.riasec.code}`),
      createCareerElement("p", "", `Je antwoorden wijzen vooral op ${CAREER_RIASEC_CONTENT[top[0]].label.toLowerCase()}, aangevuld door ${CAREER_RIASEC_CONTENT[top[1]].label.toLowerCase()} en ${CAREER_RIASEC_CONTENT[top[2]].label.toLowerCase()}.`)
    );
    const list = createCareerElement("ul", "career-profile-list");
    top.forEach(code => list.appendChild(createCareerElement("li", "", `${CAREER_RIASEC_CONTENT[code].label}: ${CAREER_RIASEC_CONTENT[code].description}`)));
    section.appendChild(list);
    resultContentGrid.appendChild(section);
  }

  if (result.hasSkills) {
    const section = createCareerElement("article", "result-content-card career-profile-card");
    section.dataset.dynamicProfileCard = "true";
    section.style.gridColumn = "1 / -1";
    section.append(
      createCareerElement("span", "result-card-label", "Vaardighedeninventaris"),
      createCareerElement("h3", "", `${result.selectedSkills.ids.length} geselecteerde vaardigheden`),
      createCareerElement("p", "", "Dit overzicht toont uitsluitend wat je zelf hebt aangeduid. Het is geen beoordeling of toets van je niveau.")
    );
    const groups = createCareerElement("div", "career-skill-summary-grid");
    result.selectedSkillGroups.forEach(group => {
      const box = createCareerElement("div", "career-skill-summary");
      box.append(createCareerElement("strong", "", group.name), createCareerElement("p", "", group.skills.join(" · ")));
      groups.appendChild(box);
    });
    if (result.selectedSkills.custom.length) {
      const box = createCareerElement("div", "career-skill-summary");
      box.append(createCareerElement("strong", "", "Zelf toegevoegd"), createCareerElement("p", "", result.selectedSkills.custom.join(" · ")));
      groups.appendChild(box);
    }
    section.appendChild(groups);
    resultContentGrid.appendChild(section);
  }

  if (result.mode === "both") {
    appendCareerBlock("Wat je graag wilt én waar je al op aansluit", "Deze beroepen combineren een duidelijke interesseaansluiting met meerdere kernvaardigheden die je zelf hebt aangeduid.", result.aligned, "both", "Er is nog geen beroep dat beide kanten sterk genoeg combineert. Bekijk vooral de groeirichtingen en mogelijke instapfuncties.");
    appendCareerBlock("Wat je interesseert en waarin je kunt groeien", "Deze beroepen passen bij je interesses. De ontbrekende kernvaardigheden zijn concrete mogelijke leerstappen, geen afwijzing.", result.growth, "interests", "Er kwamen geen afzonderlijke groeirichtingen naar voren die voldoende sterk en onderscheidend waren.");
    appendCareerBlock("Wat nu al aansluit bij wat je aangeeft te kunnen", "Deze functies sluiten aan bij vaardigheden die je al selecteerde. Ze kunnen een instap, tussenstap of verbreding vormen.", result.current, "skills", "Je selectie is nog te beperkt om betrouwbare mogelijke instapfuncties te tonen.");
  } else if (result.mode === "interests") {
    appendCareerBlock("Beroepsrichtingen die bij je interesses aansluiten", "Omdat je geen vaardighedeninventaris invulde, doet dit overzicht geen uitspraken over wat je al kunt of direct kunt uitvoeren.", result.suggestions, "interests", "Er kwamen nog geen voldoende duidelijke beroepsrichtingen naar voren.");
  } else {
    appendCareerBlock("Beroepen die aansluiten bij wat je aangeeft te kunnen", "Omdat je het interessegedeelte niet invulde, zegt dit overzicht niet of deze beroepen je ook werkelijk aanspreken.", result.suggestions, "skills", "Selecteer minstens zes relevante vaardigheden om betrouwbare beroepssuggesties te krijgen.");
  }

  const closing = createCareerElement("article", "result-content-card career-closing-card");
  closing.dataset.dynamicProfileCard = "true";
  closing.style.gridColumn = "1 / -1";
  closing.append(
    createCareerElement("span", "result-card-label", "Volgende stap"),
    createCareerElement("h3", "", "Gebruik dit rapport als verkenning"),
    createCareerElement("p", "", "Vergelijk functies op werkzaamheden, werkomgeving, vereisten en ontwikkelmogelijkheden. Controleer bij een concrete overstap altijd of een diploma, erkenning, rijbewijs of attest vereist is.")
  );
  resultContentGrid.appendChild(closing);
}
