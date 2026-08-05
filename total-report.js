"use strict";

/*
  Unfold Yourself — geïntegreerd totaalrapport
  Afhankelijkheden: app.js en alle bestaande testmodules.
  Dit bestand leest uitsluitend bestaande resultaten. Het wijzigt geen
  vragen, scores, rapportteksten, test-ID's of opslagstructuren.
*/

(() => {
  const REPORT_MODES = Object.freeze({
    compact: {
      id: "compact",
      label: "Compact overzicht",
      title: "Compact persoonlijk overzicht",
      subtitle: "De kern van je profiel in een bondig, geïntegreerd rapport."
    },
    full: {
      id: "full",
      label: "Volledig rapport",
      title: "Volledig persoonlijk rapport",
      subtitle: "Alle beschikbare testinformatie, thematisch geordend en zonder losse rapporten achter elkaar te plaatsen."
    },
    ultimate: {
      id: "ultimate",
      label: "Ultiem rapport",
      title: "Ultiem geïntegreerd rapport",
      subtitle: "Alle testinformatie, aangevuld met verbanden, spanningsvelden en afgeleide profielinzichten."
    }
  });

  const TEST_META = Object.freeze([
    { id: "persoonlijkheid::Big Five-test", title: "Big Five-test", domain: "persoonlijkheid", theme: "foundation" },
    { id: "persoonlijkheid::HEXACO-test", title: "HEXACO-test", domain: "persoonlijkheid", theme: "foundation" },
    { id: "persoonlijkheid::16 Persoonlijkheden-test", title: "16 Persoonlijkheden-test", domain: "persoonlijkheid", theme: "foundation" },
    { id: "persoonlijkheid::DISC-gedragsstijltest", title: "DISC-gedragsstijltest", domain: "persoonlijkheid", theme: "collaboration" },
    { id: "persoonlijkheid::Zelfbeeld-, waarden- en drijfverentest", title: "Zelfbeeld-, waarden- en drijfverentest", domain: "persoonlijkheid", theme: "foundation" },
    { id: "identiteit::Deelidentiteiten- en kruispuntdenkentest", title: "Deelidentiteiten- en kruispuntdenkentest", domain: "identiteit", theme: "context" },
    { id: "werkorientatie::Interesse- en beroepsrichtingentest", title: "Interesse- en beroepsrichtingentest", domain: "werkorientatie", theme: "career" },
    { id: "werkorientatie::Werkwaarden- en werkmotivatietest", title: "Werkwaarden- en werkmotivatietest", domain: "werkorientatie", theme: "career" },
    { id: "denken::Cognitieve vaardigheidsbatterij", title: "Cognitieve vaardigheidsbatterij", domain: "denken", theme: "thinking" },
    { id: "vaardigheden::Digitale skills", title: "Digitale skills", domain: "vaardigheden", theme: "thinking" },
    { id: "samenwerking::Leiderschapstest", title: "Leiderschapstest", domain: "samenwerking", theme: "collaboration" },
    { id: "samenwerking::Teamrol- en samenwerkingsstijltest", title: "Teamrol- en samenwerkingsstijltest", domain: "samenwerking", theme: "collaboration" },
    { id: "samenwerking::Werkomgeving- en cultuurvoorkeurtest", title: "Werkomgeving- en cultuurvoorkeurtest", domain: "samenwerking", theme: "career" },
    { id: "werkbeleving::Werkbelevings- en welzijnstest", title: "Werkbelevings- en welzijnstest", domain: "werkbeleving", theme: "wellbeing" }
  ]);

  const TEST_META_BY_ID = Object.freeze(Object.fromEntries(TEST_META.map(item => [item.id, item])));

  const THEME_META = Object.freeze({
    foundation: {
      title: "Persoonlijke basis",
      eyebrow: "Persoonlijkheid, zelfbeeld en waarden",
      description: "Relatief stabiele voorkeuren, gedragsneigingen, zelfbeeld, waarden en besluitvormingspatronen."
    },
    thinking: {
      title: "Denken, leren en digitale werking",
      eyebrow: "Cognitief en praktisch profiel",
      description: "Hoe je binnen de afgenomen opdrachten redeneert en hoe je jouw digitale competenties inschat."
    },
    career: {
      title: "Werk, motivatie en passende context",
      eyebrow: "Loopbaan en werkfit",
      description: "Interesses, werkwaarden, beroepsrichtingen, cultuurvoorkeuren en gewenste werkomstandigheden."
    },
    collaboration: {
      title: "Samenwerking, communicatie en invloed",
      eyebrow: "Team en leiderschap",
      description: "De bijdragen, gedragsstijlen en leiderschapsvoorkeuren die in samenwerking naar voren komen."
    },
    wellbeing: {
      title: "Energie, belasting en herstel",
      eyebrow: "Actuele werkbeleving",
      description: "De huidige balans tussen eisen, hulpbronnen, betrokkenheid, herstel en privéleven."
    },
    context: {
      title: "Identiteit en maatschappelijke context",
      eyebrow: "Context en kruispunten",
      description: "De manier waarop verschillende identiteitsassen en maatschappelijke omstandigheden kansen of drempels kunnen beïnvloeden."
    }
  });

  const DOMAIN_META = Object.freeze({
    persoonlijkheid: "Persoonlijkheid & zelfbeeld",
    identiteit: "Identiteit & maatschappelijke positie",
    werkorientatie: "Werkoriëntatie & beroepsrichting",
    denken: "Denken & redeneervermogen",
    vaardigheden: "Digitale vaardigheden",
    samenwerking: "Samenwerking, leiderschap & cultuur",
    werkbeleving: "Werkbeleving, welzijn & balans"
  });

  const DOMAIN_COLORS = Object.freeze({
    persoonlijkheid: "#F90E8E",
    identiteit: "#AA0DD1",
    werkorientatie: "#F9CE66",
    denken: "#0D93D1",
    vaardigheden: "#0DCED1",
    samenwerking: "#F84F6C",
    werkbeleving: "#0CD29F"
  });

  const workspace = document.getElementById("totalReportWorkspace");
  const documentRoot = document.getElementById("totalReportDocument");
  const closeButton = document.getElementById("closeTotalReportButton");
  const printButton = document.getElementById("printTotalReportButton");
  const topbarTitle = document.getElementById("totalReportTopbarTitle");
  const printTitle = document.getElementById("totalReportPrintTitle");
  const printDate = document.getElementById("totalReportPrintDate");
  const launcherCount = document.getElementById("totalReportLauncherCount");
  const launcherCoverageText = document.getElementById("totalReportLauncherCoverageText");
  const launcherProgress = document.getElementById("totalReportLauncherProgress");
  const launcherDomainCoverage = document.getElementById("totalReportDomainCoverage");
  const modeTabs = Array.from(document.querySelectorAll("[data-total-report-tab]"));
  const modeButtons = Array.from(document.querySelectorAll("[data-open-total-report]"));

  if (!workspace || !documentRoot) {
    return;
  }

  let activeMode = "compact";
  let printOpenStates = [];

  function safeArray(value) {
    return Array.isArray(value) ? value.filter(item => item !== null && item !== undefined) : [];
  }

  function cleanText(value) {
    if (value === null || value === undefined) return "";
    return String(value).replace(/\s+/g, " ").trim();
  }

  function uniqueTexts(values, limit = null) {
    const seen = new Set();
    const result = [];
    safeArray(values).flat(Infinity).forEach(value => {
      const text = cleanText(value);
      const key = text.toLocaleLowerCase("nl-BE");
      if (!text || seen.has(key)) return;
      seen.add(key);
      result.push(text);
    });
    return limit ? result.slice(0, limit) : result;
  }

  function clampScore(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return null;
    return Math.max(0, Math.min(100, Math.round(numeric)));
  }

  function formatDate(value) {
    const date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime())) return "Datum niet beschikbaar";
    return new Intl.DateTimeFormat("nl-BE", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function element(tag, className = "", text = "") {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== "") node.textContent = text;
    return node;
  }

  function paragraph(text) {
    return element("p", "", cleanText(text));
  }

  function appendTextList(parent, values) {
    const items = uniqueTexts(values);
    if (items.length === 0) return null;
    const list = element("ul");
    items.forEach(value => list.appendChild(element("li", "", value)));
    parent.appendChild(list);
    return list;
  }

  function getAppState() {
    try {
      return typeof state !== "undefined" && state && typeof state === "object"
        ? state
        : { completedTests: [], results: {} };
    } catch {
      return { completedTests: [], results: {} };
    }
  }

  function findTestDefinition(testId) {
    try {
      if (typeof getTestDefinition === "function") {
        const definition = getTestDefinition(testId);
        if (definition) return definition;
      }
    } catch {
      // Gebruik de geladen definitielijst als veilige terugvaloptie.
    }
    return safeArray(window.UNFOLD_TEST_DEFINITIONS).find(definition => definition?.id === testId) || null;
  }

  function getCompletedReportData() {
    const currentState = getAppState();
    const completed = new Set(safeArray(currentState.completedTests));
    return TEST_META.map(meta => {
      const result = currentState.results?.[meta.id];
      if (!completed.has(meta.id) || !result || typeof result !== "object") return null;
      return normalizeTestResult(meta, result);
    }).filter(Boolean);
  }

  function getDimension(result, ids) {
    const accepted = new Set(safeArray(ids).map(id => String(id).toLocaleLowerCase("nl-BE")));
    return safeArray(result?.dimensions).find(item => {
      const values = [item?.id, item?.code, item?.label].map(value => cleanText(value).toLocaleLowerCase("nl-BE"));
      return values.some(value => accepted.has(value));
    }) || null;
  }

  function dimensionScore(result, ids) {
    return clampScore(getDimension(result, ids)?.score);
  }

  function resultById(reports, id) {
    return reports.find(report => report.id === id)?.raw || null;
  }

  function metric(label, score, description = "") {
    const normalized = clampScore(score);
    if (normalized === null) return null;
    return { label: cleanText(label), score: normalized, description: cleanText(description) };
  }

  function section(title, type, data, description = "") {
    return { title, type, data, description };
  }

  function richText(title, text) {
    const value = cleanText(text);
    return value ? { title: cleanText(title), text: value } : null;
  }

  function richList(title, items) {
    const values = uniqueTexts(items);
    return values.length ? { title: cleanText(title), items: values } : null;
  }

  function richCard({ title, subtitle = "", text = "", badges = [], sections = [] }) {
    return {
      title: cleanText(title),
      subtitle: cleanText(subtitle),
      text: cleanText(text),
      badges: uniqueTexts(badges),
      sections: safeArray(sections).filter(Boolean)
    };
  }

  function careerFitLabel(score) {
    const value = Number(score);
    if (!Number.isFinite(value)) return "";
    if (value >= 80) return "Zeer sterke aansluiting";
    if (value >= 70) return "Sterke aansluiting";
    if (value >= 60) return "Goede aansluiting";
    if (value >= 50) return "Gedeeltelijke aansluiting";
    return "Beperkte aansluiting";
  }

  function normalizeTestResult(meta, result) {
    const mainDisplay = cleanText(
      result.mainScoreDisplay ??
      result.mainScore ??
      result.typeCode ??
      result.mainLabel ??
      "Resultaat beschikbaar"
    );

    const dimensions = safeArray(result.dimensions).map(item => metric(
      item?.label || item?.title || item?.id || "Onderdeel",
      item?.score ?? item?.percentage ?? item?.displayPercentage,
      item?.description || item?.bandLabel || ""
    )).filter(Boolean);

    return {
      id: meta.id,
      title: result.testTitle || meta.title,
      domain: meta.domain,
      theme: meta.theme,
      completedAt: result.completedAt || null,
      mainDisplay,
      mainLabel: cleanText(result.mainLabel || result.mainScoreHeading || ""),
      headline: cleanText(result.headline || ""),
      summary: cleanText(result.summary || ""),
      strengths: uniqueTexts(result.strengths),
      development: uniqueTexts(result.development),
      meaning: cleanText(result.meaning || ""),
      advice: cleanText(result.advice || result.overallAdvice || ""),
      dimensions,
      sections: buildDetailedSections(meta.id, result, dimensions),
      raw: result
    };
  }

  function buildDetailedSections(testId, result, genericDimensions) {
    const sections = [];

    if (genericDimensions.length > 0) {
      sections.push(section("Scores en dimensies", "metrics", genericDimensions));
    }

    if (testId === "persoonlijkheid::Big Five-test" || testId === "persoonlijkheid::HEXACO-test") {
      const facets = safeArray(result.facets).map(item => {
        let description = "";
        try {
          if (testId === "persoonlijkheid::Big Five-test" && typeof getBigFiveFacetInterpretation === "function") {
            description = getBigFiveFacetInterpretation(item);
          }
          if (testId === "persoonlijkheid::HEXACO-test" && typeof getHexacoFacetInterpretation === "function") {
            description = getHexacoFacetInterpretation(item);
          }
        } catch {
          description = "";
        }
        return {
          group: cleanText(item.domainLabel || item.domainId || "Domein"),
          label: cleanText(item.label || "Facet"),
          score: clampScore(item.score),
          description: cleanText(description)
        };
      }).filter(item => item.score !== null);
      if (facets.length > 0) sections.push(section("Onderliggende facetten", "groupedMetrics", facets));
    }

    if (testId === "persoonlijkheid::16 Persoonlijkheden-test") {
      const profile = result.profile || {};
      if (safeArray(profile.characteristicTraits).length) sections.push(section("Kenmerkende voorkeuren", "list", profile.characteristicTraits));
      if (profile.workAndCareer?.summary) {
        sections.push(section("Werk en loopbaan", "compound", {
          text: profile.workAndCareer.summary,
          lists: [
            { title: "Werkt vaak goed wanneer", items: profile.workAndCareer.worksBestWhen },
            { title: "Kan uitdagender zijn wanneer", items: profile.workAndCareer.challengingWhen },
            { title: "Voorbeeldrichtingen", items: profile.workAndCareer.exampleDirections }
          ]
        }));
      }
      if (profile.relationships?.summary) {
        sections.push(section("Samenwerking en relaties", "compound", {
          text: profile.relationships.summary,
          lists: [
            { title: "Sterke kanten", items: profile.relationships.strengths },
            { title: "Aandachtspunten", items: profile.relationships.watchouts }
          ]
        }));
      }
      if (profile.stressAndRecovery) {
        sections.push(section("Stress en herstel", "compound", {
          text: "",
          lists: [
            { title: "Mogelijke signalen", items: profile.stressAndRecovery.signals },
            { title: "Mogelijke herstelacties", items: profile.stressAndRecovery.recovery }
          ]
        }));
      }
      if (profile.cognitiveFunctions) {
        const rows = Object.values(profile.cognitiveFunctions).map(item => [item.code || "", item.name || "", item.description || ""]);
        sections.push(section("Cognitieve voorkeurstaal", "table", {
          headers: ["Code", "Voorkeur", "Beschrijving"],
          rows
        }, "Dit is typologische voorkeurstaal en geen cognitieve vaardigheidsmeting."));
      }
    }

    if (testId === "persoonlijkheid::DISC-gedragsstijltest") {
      const styleScores = safeArray(result.styleScores).map(item => metric(item.label || item.code, item.score, item.description)).filter(Boolean);
      if (styleScores.length) sections.push(section("Vier gedragsrichtingen", "metrics", styleScores));
      const facets = safeArray(result.facets).map(item => {
        let description = "";
        try {
          description = typeof getDiscOctantInterpretation === "function" ? getDiscOctantInterpretation(item) : "";
        } catch {
          description = "";
        }
        return {
          group: item.domainLabel || "DISC",
          label: item.label,
          score: clampScore(item.score),
          description: cleanText(description)
        };
      }).filter(item => item.score !== null);
      if (facets.length) sections.push(section("Verdiepende gedragsfacetten", "groupedMetrics", facets));
    }

    if (testId === "persoonlijkheid::Zelfbeeld-, waarden- en drijfverentest") {
      const selfProfile = result.selfProfile || {};
      const selfRows = [
        [selfProfile.selfImage?.label || "Zelfbeeld", `${clampScore(selfProfile.selfImage?.score) ?? "—"}%`],
        [selfProfile.selfEfficacy?.label || "Zelfvertrouwen", `${clampScore(selfProfile.selfEfficacy?.score) ?? "—"}%`]
      ];
      sections.push(section("Zelfbeeld en handelingsvertrouwen", "keyValue", selfRows));
      const values = safeArray(result.valuesProfile?.rankedValues).map(item => metric(item.label, item.score, item.rank ? `Rang ${item.rank}` : "")).filter(Boolean);
      if (values.length) sections.push(section("Waardenprofiel", "metrics", values));
      const motivations = safeArray(result.motivationProfile?.ranked).map(item => metric(item.label, item.score)).filter(Boolean);
      if (motivations.length) sections.push(section("Drijfveren", "metrics", motivations));
      const decisions = safeArray(result.decisionProfile?.ranked).map(item => metric(item.label, item.score)).filter(Boolean);
      if (decisions.length) sections.push(section("Besluitvormingsstijlen", "metrics", decisions));
      const tensions = safeArray(result.valuesProfile?.activeTensions).map(item => item.text || item.description || item.title || item.label).filter(Boolean);
      if (tensions.length) sections.push(section("Actieve waardenspanningen", "list", tensions));
    }

    if (testId === "identiteit::Deelidentiteiten- en kruispuntdenkentest") {
      const axes = safeArray(result.axisResults).map(item => richCard({
        title: item.shortLabel || item.label || item.id,
        subtitle: item.bandLabel || "Positie binnen deze as",
        text: item.description || "",
        sections: [richText("Interpretatie", item.interpretation)]
      }));
      if (axes.length) {
        sections.push(section(
          "Veertien maatschappelijke assen",
          "richCards",
          axes,
          "De positie wordt bewust zonder percentage weergegeven. De assen worden niet opgeteld tot één privilegescore."
        ));
      }
      const intersections = safeArray(result.intersections).map(item => item.text || item.description || item.title || item.label).filter(Boolean);
      if (intersections.length) sections.push(section("Kruispunten", "list", intersections));
    }

    if (testId === "werkorientatie::Interesse- en beroepsrichtingentest") {
      const riasec = result.riasec;
      if (riasec?.ranking) {
        sections.push(section("RIASEC-rangschikking", "keyValue", safeArray(riasec.ranking).map((code, index) => [
          `${index + 1}. ${code}`,
          `${clampScore(riasec.scores?.[code]) ?? "—"}%`
        ])));
      }
      const skillGroups = safeArray(result.selectedSkillGroups).map(group => ({ title: group.name, items: group.skills }));
      if (skillGroups.length) sections.push(section("Zelfaangegeven vaardigheden", "groupLists", skillGroups));
      const conditionQuestions = Object.fromEntries(
        safeArray(window.CAREER_INTEREST_CONDITION_QUESTIONS).map(question => [question.condition, question.text])
      );
      const conditions = Object.entries(result.conditions || {}).map(([conditionId, value]) => [
        conditionQuestions[conditionId] || conditionId,
        value ? "Past bij mij" : "Past niet bij mij"
      ]);
      if (conditions.length) sections.push(section("Praktische werkvoorkeuren", "keyValue", conditions));
      [
        ["Sterke aansluiting", result.aligned],
        ["Interessante ontwikkelroutes", result.growth],
        ["Aansluiting op huidige vaardigheden", result.current],
        ["Beroepssuggesties", result.suggestions]
      ].forEach(([title, items]) => {
        const cards = safeArray(items).map(item => {
          const occupation = item.occupation || item;
          const matchedSkills = [
            ...safeArray(item.skillDetail?.matchedCore),
            ...safeArray(item.skillDetail?.matchedAdditional)
          ].slice(0, 5).map(skill => skill.name);
          const scoreBadges = [
            item.interestFit !== null && item.interestFit !== undefined ? `Interesse ${Math.round(item.interestFit)}%` : "",
            item.skillsFit !== null && item.skillsFit !== undefined ? `Vaardigheden ${Math.round(item.skillsFit)}%` : "",
            item.combined !== null && item.combined !== undefined ? `Gecombineerd ${Math.round(item.combined)}%` : "",
            occupation.bottleneck ? "Vlaams knelpuntberoep" : ""
          ];
          const explanations = [
            item.interestFit !== null && item.interestFit !== undefined
              ? richText("Interesseaansluiting", `${careerFitLabel(item.interestFit)} (${Math.round(item.interestFit)}%).`)
              : null,
            item.skillsFit !== null && item.skillsFit !== undefined
              ? richText("Vaardigheidsaansluiting", `${careerFitLabel(item.skillsFit)} (${Math.round(item.skillsFit)}%).`)
              : null,
            richList("Herkenbare vaardigheden", matchedSkills),
            occupation.bottleneck
              ? richText("Arbeidsmarktcontext", "Dit is momenteel een Vlaams knelpuntberoep. Die arbeidsmarktinformatie verandert je persoonlijke aansluiting niet.")
              : null
          ];
          return richCard({
            title: occupation.name || occupation.title || "Beroepsrichting",
            subtitle: occupation.sector || "",
            badges: scoreBadges,
            sections: explanations
          });
        });
        if (cards.length) sections.push(section(title, "richCards", cards));
      });
    }

    if (testId === "werkorientatie::Werkwaarden- en werkmotivatietest") {
      const rows = safeArray(result.dimensionResults).map(item => [
        item.title || item.label || item.id,
        `${clampScore(item.workValueScore) ?? "—"}%`,
        `${clampScore(item.motivatorScore) ?? "—"}%`,
        `${clampScore(item.demotivatorSensitivity) ?? "—"}%`,
        item.matrixLabel || ""
      ]);
      if (rows.length) sections.push(section("Werkwaardenmatrix", "table", {
        headers: ["Dimensie", "Belangrijk", "Motiveert", "Gevoelig voor ontbreken", "Profiel"],
        rows
      }));
      const needs = safeArray(result.minimumNeeds).map(item => `${item.title}: ${item.seeks || item.matrixDescription || "belangrijke minimumvoorwaarde"}`);
      if (needs.length) sections.push(section("Minimumvoorwaarden", "list", needs));
      const motivators = safeArray(result.extraMotivators).map(item => `${item.title}: ${item.seeks || item.matrixDescription || "kan extra motiveren"}`);
      if (motivators.length) sections.push(section("Extra motivatoren", "list", motivators));
      const profiles = safeArray(result.dimensionResults).map(item => richCard({
        title: item.title || item.label || item.id,
        subtitle: item.matrixLabel || "Werkwaardendimensie",
        text: item.description || "",
        badges: [
          `Belangrijk ${clampScore(item.workValueScore) ?? "—"}%`,
          `Motiveert ${clampScore(item.motivatorScore) ?? "—"}%`,
          `Gevoeligheid ${clampScore(item.demotivatorSensitivity) ?? "—"}%`
        ],
        sections: [
          richText("Wat je hierin zoekt", item.seeks ? `Je zoekt vooral ${item.seeks}.` : ""),
          richText("Wat dit ondersteunt", item.supports ? `Dit wordt ondersteund door ${item.supports}.` : ""),
          richText("Mogelijk demotiverend", item.risk),
          richText("Vraag voor een vacature of werkgever", item.vacancyQuestion),
          richText("Profielbetekenis", item.matrixDescription)
        ]
      }));
      if (profiles.length) sections.push(section("Betekenis per werkwaardendimensie", "richCards", profiles));
      const tensions = safeArray(result.tensions).map(item => item.text || item.description || item.title || item.label).filter(Boolean);
      if (tensions.length) sections.push(section("Werkwaardenspanningen", "list", tensions));
      if (safeArray(result.vacancyQuestions).length) sections.push(section("Vragen voor vacatures of werkgevers", "list", result.vacancyQuestions));
    }

    if (testId === "denken::Cognitieve vaardigheidsbatterij") {
      const cognitiveDimensions = safeArray(result.cognitiveReport?.dimensions).map(item => metric(item.label, item.score, item.description)).filter(Boolean);
      if (cognitiveDimensions.length) sections.push(section("Cognitieve modules", "metrics", cognitiveDimensions));
      const moduleRows = Object.entries(result.moduleResults || {}).map(([id, item]) => [
        id,
        item?.score !== undefined ? `${Math.round(Number(item.score) || 0)}%` : item?.percentage !== undefined ? `${Math.round(Number(item.percentage) || 0)}%` : "Voltooid",
        item?.summary || item?.interpretation || item?.label || ""
      ]);
      if (moduleRows.length) sections.push(section("Ruwe modulegegevens", "table", {
        headers: ["Module", "Resultaat", "Toelichting"],
        rows: moduleRows
      }));
    }

    if (testId === "vaardigheden::Digitale skills") {
      const areas = Object.values(result.areaResults || {}).map(item => metric(item.title, item.percentage, `${item.levelLabel}. ${item.description || ""}`)).filter(Boolean);
      if (areas.length) sections.push(section("Vijf DigCompSAT-gebieden", "metrics", areas));
      const competences = safeArray(result.competenceResults).map(item => metric(item.title, item.percentage, item.description)).filter(Boolean);
      if (competences.length) sections.push(section("Digitale competenties", "metrics", competences));
      const digitalProfiles = [
        safeArray(result.strongestCompetences).length ? richCard({
          title: "Wat komt het duidelijkst naar voren?",
          subtitle: "Sterktes",
          sections: safeArray(result.strongestCompetences).map(item => richText(item.title, item.description))
        }) : null,
        safeArray(result.growthCompetences).length ? richCard({
          title: "Waar ervaar je nog ontwikkelruimte?",
          subtitle: "Groeikansen",
          sections: safeArray(result.growthCompetences).map(item => richText(item.title, item.description))
        }) : null
      ].filter(Boolean);
      if (digitalProfiles.length) sections.push(section("Sterktes en groeikansen", "richCards", digitalProfiles));
    }

    if (testId === "samenwerking::Leiderschapstest") {
      const styles = safeArray(result.styleProfile?.styles).map(item => metric(
        item.name || item.categoryLabel || item.id,
        item.score ?? item.displayPercentage,
        item.fit?.label || item.availability?.label || item.definition || ""
      )).filter(Boolean);
      if (styles.length) sections.push(section("Twaalf leiderschapsstijlen", "metrics", styles));
      const styleProfiles = safeArray(result.styleProfile?.styles).map(item => richCard({
        title: item.name || item.categoryLabel || item.id,
        subtitle: item.category?.label || item.categoryLabel || item.availability?.label || "Leiderschapsstijl",
        text: item.definition || "",
        badges: [
          `${item.displayPercentage ?? clampScore(item.score) ?? "—"}%`,
          item.availability?.label || item.fit?.label || "",
          ...safeArray(item.traits)
        ],
        sections: [
          richText("Kern", item.core),
          richText("Kracht", item.strength),
          richText("Voordeel", item.advantage),
          richText("Risico bij overgebruik", item.risk),
          richText("Werkt vooral goed bij", item.context),
          richText("Ontwikkeladvies", item.advice)
        ]
      }));
      if (styleProfiles.length) sections.push(section("Betekenis per leiderschapsstijl", "richCards", styleProfiles));
      const situational = result.situational;
      if (situational) {
        const rows = [
          ["Flexibiliteit", situational.flexibilityLabel || ""],
          ["Correcte keuzes", `${situational.correctCount ?? "—"}/${situational.totalCount ?? "—"}`],
          ["Interpretatie", situational.interpretation || ""]
        ];
        sections.push(section("Situationele flexibiliteit", "keyValue", rows));
      }
      if (result.overallAdvice) sections.push(section("Geïntegreerd leiderschapsadvies", "text", result.overallAdvice));
    }

    if (testId === "samenwerking::Teamrol- en samenwerkingsstijltest") {
      const roles = safeArray(result.roles).map(item => metric(item.name, item.displayPercentage, `${item.fit?.label || ""} · ${item.rawScore ?? "—"}/${item.maxScore ?? "—"}`)).filter(Boolean);
      if (roles.length) sections.push(section("Negen teamrollen", "metrics", roles));
      const roleProfiles = safeArray(result.roles).map(item => richCard({
        title: item.name || item.id,
        subtitle: item.fit?.label || "Teamrol",
        text: item.headline || item.core || "",
        badges: [
          `Rang ${item.rank ?? "—"}`,
          `${item.displayPercentage ?? "—"}%`,
          `${item.rawScore ?? "—"}/${item.maxScore ?? "—"} punten`,
          ...safeArray(item.traits)
        ],
        sections: [
          richText("Kern", item.core),
          richText("Bijdrage aan het team", item.contribution),
          richText("Mogelijke kwaliteiten", item.strengths),
          richText("Valkuilen bij overgebruik", item.risks),
          richText("Hoe je waarschijnlijk samenwerkt", item.collaboration),
          richText("Wat je van teamgenoten nodig kunt hebben", item.needs),
          richText("Bij relationele spanning", item.relationConflict),
          richText("Bij een inhoudelijk meningsverschil", item.taskConflict),
          richText("Ontwikkelaandacht", item.development)
        ]
      }));
      if (roleProfiles.length) sections.push(section("Volledig profiel per teamrol", "richCards", roleProfiles));
      const pairInsights = safeArray(result.combination?.pairInsights).map(item => ({
        title: item.pair,
        text: [item.synergy, item.tension].filter(Boolean).join(" ")
      }));
      if (pairInsights.length) sections.push(section("Combinaties tussen je topteamrollen", "cards", pairInsights));
      if (result.responseQuality?.message) sections.push(section("Antwoordkwaliteit", "text", result.responseQuality.message));
    }

    if (testId === "samenwerking::Werkomgeving- en cultuurvoorkeurtest") {
      const cultures = safeArray(result.cultures).map(item => metric(
        item.profile?.name || item.id,
        item.displayScore,
        item.profile?.headline || ""
      )).filter(Boolean);
      if (cultures.length) sections.push(section("Cultuurverdeling", "metrics", cultures));
      const cultureProfiles = safeArray(result.cultures).map(item => {
        const profile = item.profile || {};
        return richCard({
          title: profile.name || item.id,
          subtitle: item.rank === 1 ? "Sterkste cultuurvoorkeur" : result.frictionCulture?.id === item.id ? "Vraagt waarschijnlijk de meeste aanpassing" : "Aanvullende cultuurvoorkeur",
          text: profile.headline || profile.essence || "",
          badges: [`Rang ${item.rank ?? "—"}`, `${item.displayScore ?? "—"}%`],
          sections: [
            richText("Essentie", profile.essence),
            richList("Je floreert waarschijnlijk wanneer", profile.flourish),
            richList("Mogelijke voordelen", profile.benefits),
            richList("Mogelijke nadelen bij een extreme cultuur", profile.risks),
            richText("Mogelijke frictie", profile.friction),
            richList("Passend leiderschap", profile.leadership),
            richList("Passend personeelsbeleid", profile.hr),
            richList("Waarop letten bij een werkgever", profile.employerQuestions)
          ]
        });
      });
      if (cultureProfiles.length) sections.push(section("Volledig profiel per cultuurtype", "richCards", cultureProfiles));
      const environment = result.environment || {};
      const environmentRows = Object.entries(environment).map(([key, value]) => [
        ({ scale: "Organisatieschaal", location: "Ligging", surroundings: "Directe omgeving", interior: "Interieur", rhythm: "Werkritme" })[key] || key,
        value?.badge || value?.name || value?.headline || value?.label || value?.id || ""
      ]).filter(row => row[1]);
      if (environmentRows.length) sections.push(section("Werkomgeving", "keyValue", environmentRows));
      if (result.combination?.text || result.combination?.title) sections.push(section(result.combination.title || "Cultuurcombinatie", "text", [result.combination.text, result.combination.risk].filter(Boolean).join(" ")));
      if (result.energy) {
        sections.push(section("Energiegevers en energienemers", "compound", {
          text: "",
          lists: [
            { title: "Geeft waarschijnlijk energie", items: result.energy.givers },
            { title: "Kan energie kosten", items: result.energy.takers }
          ]
        }));
      }
      if (safeArray(result.checklist).length) sections.push(section("Vragen om werkfit te onderzoeken", "list", result.checklist));
    }

    if (testId === "werkbeleving::Werkbelevings- en welzijnstest") {
      const dimensions = safeArray(result.dimensionResults).map(item => metric(item.label, item.score, item.band?.label || item.description || "")).filter(Boolean);
      if (dimensions.length) sections.push(section("Tien dimensies", "metrics", dimensions));
      const wellbeingProfiles = safeArray(result.dimensionResults).map(item => richCard({
        title: item.label || item.id,
        subtitle: item.band?.label || "Werkbelevingsdimensie",
        text: item.core || item.interpretation || "",
        badges: [`${item.score ?? "—"}/100`, item.clusterLabel || item.cluster || ""],
        sections: [
          richText("Jouw situatie", item.interpretation),
          richText("Mogelijke kracht", item.highStrength),
          richText("Mogelijk risico of aandachtspunt", item.risk),
          richList("Direct toepasbare stappen", [
            ...safeArray(item.advice),
            result.statusContext?.specificAdvice
          ])
        ]
      }));
      if (wellbeingProfiles.length) sections.push(section("Betekenis per welzijnsdimensie", "richCards", wellbeingProfiles));
      const combinations = safeArray(result.combinations).map(item => ({ title: item.title, text: item.text }));
      if (combinations.length) sections.push(section("Belangrijke combinaties", "cards", combinations));
      if (result.responseQuality?.messages?.length) sections.push(section("Antwoordkwaliteit", "list", result.responseQuality.messages));
      if (result.status?.label || result.statusContext?.situation) {
        sections.push(section("Gekozen context", "keyValue", [["Statuut", result.status?.label || result.statusContext?.situation]]));
      }
    }

    const definition = findTestDefinition(testId);
    const evidence = definition?.evidence || {};
    const evidenceCards = [
      evidence.summary || evidence.source || evidence.disclaimer
        ? richCard({
            title: "Wetenschappelijke en methodische basis",
            subtitle: "Onderbouwing van de afzonderlijke test",
            sections: [
              richText("Samenvatting", evidence.summary),
              richText("Bron of theoretische basis", evidence.source),
              richText("Grenzen en disclaimer", evidence.disclaimer)
            ]
          })
        : null
    ].filter(Boolean);
    if (evidenceCards.length) sections.push(section("Methodiek, bron en grenzen", "richCards", evidenceCards));

    return sections;
  }

  function calculateCoverage(reports) {
    const completedIds = new Set(reports.map(report => report.id));
    const domainCoverage = Object.keys(DOMAIN_META).map(domainId => {
      const tests = TEST_META.filter(test => test.domain === domainId);
      const completed = tests.filter(test => completedIds.has(test.id)).length;
      return {
        id: domainId,
        label: DOMAIN_META[domainId],
        completed,
        total: tests.length,
        percentage: tests.length ? Math.round((completed / tests.length) * 100) : 0,
        color: DOMAIN_COLORS[domainId] || "#F90E8E"
      };
    });
    return {
      completed: reports.length,
      total: TEST_META.length,
      percentage: Math.round((reports.length / TEST_META.length) * 100),
      domainCoverage
    };
  }

  function average(values) {
    const numeric = safeArray(values).map(Number).filter(Number.isFinite);
    return numeric.length ? numeric.reduce((sum, value) => sum + value, 0) / numeric.length : null;
  }

  function buildFacts(reports) {
    const bigFive = resultById(reports, "persoonlijkheid::Big Five-test");
    const hexaco = resultById(reports, "persoonlijkheid::HEXACO-test");
    const sixteen = resultById(reports, "persoonlijkheid::16 Persoonlijkheden-test");
    const disc = resultById(reports, "persoonlijkheid::DISC-gedragsstijltest");
    const selfValues = resultById(reports, "persoonlijkheid::Zelfbeeld-, waarden- en drijfverentest");
    const identity = resultById(reports, "identiteit::Deelidentiteiten- en kruispuntdenkentest");
    const career = resultById(reports, "werkorientatie::Interesse- en beroepsrichtingentest");
    const workValues = resultById(reports, "werkorientatie::Werkwaarden- en werkmotivatietest");
    const cognitive = resultById(reports, "denken::Cognitieve vaardigheidsbatterij");
    const digital = resultById(reports, "vaardigheden::Digitale skills");
    const leadership = resultById(reports, "samenwerking::Leiderschapstest");
    const teamRoles = resultById(reports, "samenwerking::Teamrol- en samenwerkingsstijltest");
    const culture = resultById(reports, "samenwerking::Werkomgeving- en cultuurvoorkeurtest");
    const wellbeing = resultById(reports, "werkbeleving::Werkbelevings- en welzijnstest");

    const personality = {
      openness: average([
        dimensionScore(bigFive, ["openheid", "O"]),
        dimensionScore(hexaco, ["openheid", "openheid voor ervaringen", "O"])
      ]),
      conscientiousness: average([
        dimensionScore(bigFive, ["consciëntieusheid", "C"]),
        dimensionScore(hexaco, ["consciëntieusheid", "C"])
      ]),
      extraversion: average([
        dimensionScore(bigFive, ["extraversie", "E"]),
        dimensionScore(hexaco, ["extraversie", "X"])
      ]),
      agreeableness: dimensionScore(bigFive, ["aangenaamheid", "altruïsme", "A"]),
      emotionalSensitivity: dimensionScore(bigFive, ["emotionele-gevoeligheid", "neuroticisme", "N"]),
      hexacoEmotionality: dimensionScore(hexaco, ["emotionaliteit", "E"]),
      honesty: dimensionScore(hexaco, ["eerlijkheid-bescheidenheid", "H"])
    };

    const workValueTop = safeArray(workValues?.topDimensions).slice(0, 3);
    const roleTop = safeArray(teamRoles?.topRoles).slice(0, 3);
    const cultureTop = safeArray(culture?.cultures).slice(0, 2);
    const leadershipTop = safeArray(leadership?.styleProfile?.primaryStyles).slice(0, 3);
    const cognitiveTop = safeArray(cognitive?.cognitiveReport?.dimensions).slice().sort((a, b) => Number(b.score) - Number(a.score)).slice(0, 3);
    const digitalTop = safeArray(digital?.strongestCompetences).slice(0, 3);
    const workValueNeeds = safeArray(workValues?.minimumNeeds).slice(0, 4);
    const careerTop = career?.riasec?.ranking ? safeArray(career.riasec.ranking).slice(0, 3) : [];
    const wellbeingDimensions = safeArray(wellbeing?.dimensionResults);
    const wellbeingMap = Object.fromEntries(wellbeingDimensions.map(item => [item.id, Number(item.score)]));

    return {
      reports,
      bigFive,
      hexaco,
      sixteen,
      disc,
      selfValues,
      identity,
      career,
      workValues,
      cognitive,
      digital,
      leadership,
      teamRoles,
      culture,
      wellbeing,
      personality,
      workValueTop,
      workValueNeeds,
      roleTop,
      cultureTop,
      leadershipTop,
      cognitiveTop,
      digitalTop,
      careerTop,
      wellbeingMap
    };
  }

  function sourceLabel(id) {
    return TEST_META_BY_ID[id]?.title || id;
  }

  function makeInsight({ title, text, tone = "context", sources = [], strength = "Waarschijnlijke tendens", practical = "" }) {
    return {
      title,
      text,
      tone,
      sources: uniqueTexts(sources.map(sourceLabel)),
      strength,
      practical: cleanText(practical)
    };
  }

  function hasTopRole(facts, id) {
    return facts.roleTop.some(role => role.id === id || cleanText(role.name).toLocaleLowerCase("nl-BE").includes(id));
  }

  function cultureScore(facts, id) {
    const item = safeArray(facts.culture?.cultures).find(culture => culture.id === id);
    return Number(item?.displayScore ?? item?.exactScore);
  }

  function workValueHigh(facts, id, threshold = 65) {
    const item = safeArray(facts.workValues?.dimensionResults).find(value => value.id === id || cleanText(value.title).toLocaleLowerCase("nl-BE").includes(id));
    return Number(item?.totalScore) >= threshold;
  }

  function buildConnections(facts) {
    const insights = [];
    const P = facts.personality;
    const wellbeing = facts.wellbeingMap;

    if (
      P.conscientiousness >= 68 &&
      (hasTopRole(facts, "bedrijfsman") || hasTopRole(facts, "zorgdrager") || cultureScore(facts, "control") >= 27)
    ) {
      insights.push(makeInsight({
        title: "Betrouwbaarheid wordt een zichtbare werkbijdrage",
        text: "Je profiel wijst niet alleen op een zorgvuldige en doelgerichte persoonlijke stijl. Ook in teamwork of cultuurvoorkeur komt een nadruk op uitvoering, opvolging, kwaliteit of duidelijke processen naar voren. Daardoor kun je vaak vertrouwen creëren door afspraken concreet en controleerbaar te maken.",
        tone: "positive",
        sources: [
          facts.bigFive ? "persoonlijkheid::Big Five-test" : "persoonlijkheid::HEXACO-test",
          facts.teamRoles ? "samenwerking::Teamrol- en samenwerkingsstijltest" : "samenwerking::Werkomgeving- en cultuurvoorkeurtest"
        ],
        strength: "Sterk patroon",
        practical: "Bewaak dat betrouwbaarheid niet verandert in alles zelf controleren of te lang perfectioneren."
      }));
    }

    if (
      P.openness >= 65 &&
      cultureScore(facts, "create") >= 25 &&
      (cultureScore(facts, "control") >= 20 || workValueHigh(facts, "structuur", 60) || wellbeing.clarity <= 55)
    ) {
      insights.push(makeInsight({
        title: "Vernieuwing werkt waarschijnlijk het best met houvast",
        text: "Je lijkt ruimte te waarderen voor ideeën, alternatieven en experiment, maar dat betekent niet dat volledige chaos bij je past. De combinatie suggereert dat innovatie binnen heldere doelen, verantwoordelijkheden en kwaliteitsgrenzen beter kan werken dan permanent improviseren.",
        tone: "context",
        sources: [
          facts.bigFive || facts.hexaco ? (facts.bigFive ? "persoonlijkheid::Big Five-test" : "persoonlijkheid::HEXACO-test") : "",
          "samenwerking::Werkomgeving- en cultuurvoorkeurtest",
          facts.workValues ? "werkorientatie::Werkwaarden- en werkmotivatietest" : facts.wellbeing ? "werkbeleving::Werkbelevings- en welzijnstest" : ""
        ].filter(Boolean),
        strength: "Sterk patroon",
        practical: "Zoek rollen waarin experiment mogelijk is, maar besluitvorming en afronding niet vrijblijvend blijven."
      }));
    }

    if (
      (P.extraversion >= 62 || dimensionScore(facts.disc, ["I", "Invloed"]) >= 60) &&
      (hasTopRole(facts, "groepswerker") || hasTopRole(facts, "voorzitter") || cultureScore(facts, "collaborate") >= 27)
    ) {
      insights.push(makeInsight({
        title: "Sociale energie kan worden omgezet in verbinding",
        text: "Sociale zichtbaarheid of expressie lijkt samen te gaan met een teamgerichte bijdrage. Je kunt daardoor niet alleen contact leggen, maar mogelijk ook informatie verbinden, draagvlak creëren of mensen actief bij het werk betrekken.",
        tone: "positive",
        sources: [
          facts.disc ? "persoonlijkheid::DISC-gedragsstijltest" : facts.bigFive ? "persoonlijkheid::Big Five-test" : "persoonlijkheid::HEXACO-test",
          facts.teamRoles ? "samenwerking::Teamrol- en samenwerkingsstijltest" : "samenwerking::Werkomgeving- en cultuurvoorkeurtest"
        ],
        strength: "Sterk patroon",
        practical: "Zorg dat relatiegerichtheid niet ten koste gaat van duidelijke grenzen of lastige feedback."
      }));
    }

    if (
      P.extraversion !== null && P.extraversion <= 45 &&
      (hasTopRole(facts, "groepswerker") || hasTopRole(facts, "voorzitter") || cultureScore(facts, "collaborate") >= 25)
    ) {
      insights.push(makeInsight({
        title: "Betrokken samenwerken zonder voortdurende sociale druk",
        text: "Je kunt sterk gericht zijn op samenwerking en anderen ondersteunen, terwijl je energiehuishouding eerder rust, voorbereiding of kleinere interacties vraagt. Dat is geen tegenstelling: de kwaliteit en betekenis van contact kunnen belangrijker zijn dan de hoeveelheid sociale prikkels.",
        tone: "context",
        sources: [
          facts.bigFive ? "persoonlijkheid::Big Five-test" : "persoonlijkheid::HEXACO-test",
          facts.teamRoles ? "samenwerking::Teamrol- en samenwerkingsstijltest" : "samenwerking::Werkomgeving- en cultuurvoorkeurtest"
        ],
        strength: "Sterk patroon",
        practical: "Plan concentratietijd rond overleg en kies waar mogelijk voor kleinere, inhoudelijke samenwerkingsvormen."
      }));
    }

    if (
      workValueHigh(facts, "autonomie", 65) &&
      (cultureScore(facts, "create") >= 25 || facts.culture?.environment?.rhythm?.id === "remote" || facts.culture?.environment?.rhythm?.id === "hybrid")
    ) {
      insights.push(makeInsight({
        title: "Eigenaarschap is waarschijnlijk een kernvoorwaarde",
        text: "Zowel je werkwaarden als je gewenste context wijzen op behoefte aan regelruimte. Je functioneert waarschijnlijk beter wanneer je zelf keuzes kunt maken over aanpak, planning of prioriteiten, zolang doelen en beslissingsgrenzen duidelijk blijven.",
        tone: "positive",
        sources: ["werkorientatie::Werkwaarden- en werkmotivatietest", "samenwerking::Werkomgeving- en cultuurvoorkeurtest"],
        strength: "Sterk patroon",
        practical: "Vraag bij functies expliciet welke beslissingen zelfstandig mogen worden genomen en hoe resultaten worden opgevolgd."
      }));
    }

    if (
      facts.wellbeing &&
      wellbeing.pressure >= 67 &&
      (wellbeing.recovery <= 42 || wellbeing.balance <= 42) &&
      (
        P.conscientiousness >= 65 ||
        Number(facts.wellbeingMap.engagement) >= 67 ||
        cultureScore(facts, "compete") >= 27
      )
    ) {
      insights.push(makeInsight({
        title: "Sterke motoren kunnen overbelasting langer verbergen",
        text: "Doelgerichtheid, betrokkenheid of prestatiedrang helpen je om veel te dragen. Juist daardoor kan je functioneren nog lang redelijk lijken terwijl herstel of privéruimte al achterblijft. Het belangrijkste risico is hier mogelijk niet een gebrek aan motivatie, maar te lang blijven doorgaan.",
        tone: "watch",
        sources: [
          "werkbeleving::Werkbelevings- en welzijnstest",
          P.conscientiousness >= 65 ? (facts.bigFive ? "persoonlijkheid::Big Five-test" : "persoonlijkheid::HEXACO-test") : "samenwerking::Werkomgeving- en cultuurvoorkeurtest"
        ],
        strength: "Sterk patroon",
        practical: "Gebruik herstel en begrenzing als prestatievoorwaarde, niet als iets dat pas na al het werk komt."
      }));
    }

    if (
      facts.leadership?.situational &&
      ["very-flexible", "flexible"].includes(facts.leadership.situational.flexibilityId) &&
      facts.roleTop.length >= 2
    ) {
      insights.push(makeInsight({
        title: "Een breed repertoire ondersteunt situationele invloed",
        text: "Je leiderschapsresultaat laat aanpassingsvermogen zien, terwijl je teamrolprofiel meerdere bijdragen beschikbaar maakt. Dat kan helpen om afhankelijk van de taak te schakelen tussen richting, verbinding, analyse en uitvoering.",
        tone: "positive",
        sources: ["samenwerking::Leiderschapstest", "samenwerking::Teamrol- en samenwerkingsstijltest"],
        strength: "Sterk patroon",
        practical: "Leg aan anderen uit waarom je van aanpak verandert, zodat flexibiliteit niet als onvoorspelbaarheid wordt ervaren."
      }));
    }

    if (
      (hasTopRole(facts, "monitor") || hasTopRole(facts, "zorgdrager")) &&
      facts.cognitiveTop.some(item => ["kritisch redeneren en data", "aandacht"].some(label => cleanText(item.label).toLocaleLowerCase("nl-BE").includes(label)))
    ) {
      insights.push(makeInsight({
        title: "Analyse kan worden vertaald naar kwaliteitsbewaking",
        text: "Binnen cognitieve opdrachten kwamen controle, analyse of aandacht relatief duidelijk naar voren en ook je teamrolprofiel bevat een kritische of afrondende bijdrage. Dat kan waardevol zijn in werk waar beslissingen moeten worden getoetst en details betrouwbaar moeten worden opgevolgd.",
        tone: "positive",
        sources: ["denken::Cognitieve vaardigheidsbatterij", "samenwerking::Teamrol- en samenwerkingsstijltest"],
        strength: "Sterk patroon",
        practical: "Maak vooraf duidelijk wanneer verdere analyse nog waarde toevoegt en wanneer een werkbare beslissing nodig is."
      }));
    }

    if (
      facts.career?.riasec &&
      facts.workValues &&
      facts.culture
    ) {
      insights.push(makeInsight({
        title: "Werkfit vraagt meer dan een passende functietitel",
        text: `Je interesses wijzen in de richting van ${facts.careerTop.join("-") || "meerdere beroepsgebieden"}, maar duurzame werkfit hangt ook af van je belangrijkste werkwaarden en cultuurvoorkeuren. Een inhoudelijk interessant beroep kan daarom alsnog slecht passen wanneer autonomie, samenwerking, structuur of erkenning onvoldoende aansluiten.`,
        tone: "context",
        sources: ["werkorientatie::Interesse- en beroepsrichtingentest", "werkorientatie::Werkwaarden- en werkmotivatietest", "samenwerking::Werkomgeving- en cultuurvoorkeurtest"],
        strength: "Sterk patroon",
        practical: "Vergelijk functies tegelijk op werkzaamheden, dagelijkse context en minimumvoorwaarden."
      }));
    }

    if (
      facts.selfValues?.valuesProfile?.activeTensions?.length &&
      facts.workValues?.tensions?.length
    ) {
      insights.push(makeInsight({
        title: "Keuzes kunnen meerdere belangrijke waarden tegelijk raken",
        text: "Zowel je algemene waardenprofiel als je werkwaarden tonen mogelijke spanningen. Dat betekent niet dat je inconsistent bent; het wijst erop dat belangrijke keuzes vaak meerdere legitieme behoeften tegelijk raken en daarom bewuste afweging vragen.",
        tone: "context",
        sources: ["persoonlijkheid::Zelfbeeld-, waarden- en drijfverentest", "werkorientatie::Werkwaarden- en werkmotivatietest"],
        strength: "Waarschijnlijke tendens",
        practical: "Benoem vóór een belangrijke keuze welke twee waarden botsen en welk compromis je bewust accepteert."
      }));
    }

    if (
      facts.wellbeing &&
      wellbeing.safety <= 42 &&
      (wellbeing.support <= 42 || cultureScore(facts, "compete") >= 30)
    ) {
      insights.push(makeInsight({
        title: "Openheid en ondersteuning verdienen prioriteit",
        text: "Je huidige werkbeleving toont weinig ruimte om problemen of onzekerheid bespreekbaar te maken. Wanneer steun eveneens beperkt is of de context sterk prestatiegericht is, kunnen relevante signalen te lang verborgen blijven.",
        tone: "watch",
        sources: ["werkbeleving::Werkbelevings- en welzijnstest", facts.culture ? "samenwerking::Werkomgeving- en cultuurvoorkeurtest" : ""].filter(Boolean),
        strength: "Betekenisvol aandachtspunt",
        practical: "Zoek een veilige persoon of formeel kanaal en bespreek één concreet, observeerbaar probleem voordat het verder opstapelt."
      }));
    }

    return insights.slice(0, 12);
  }

  function buildThemeSyntheses(facts) {
    const syntheses = [];

    const personalityParts = [];
    if (facts.personality.conscientiousness !== null) {
      personalityParts.push(facts.personality.conscientiousness >= 65
        ? "Doelgerichtheid, organisatie en verantwoordelijkheid komen relatief duidelijk naar voren."
        : facts.personality.conscientiousness <= 40
          ? "Je lijkt eerder flexibel en spontaan dan sterk procedureel of planmatig te werken."
          : "Je profiel bevat een redelijke balans tussen structuur en flexibiliteit.");
    }
    if (facts.personality.openness !== null) {
      personalityParts.push(facts.personality.openness >= 65
        ? "Nieuwsgierigheid, ideeën en alternatieve perspectieven zijn waarschijnlijk belangrijke bronnen van stimulatie."
        : facts.personality.openness <= 40
          ? "Concrete informatie, ervaring en praktische toepasbaarheid krijgen waarschijnlijk sneller voorrang."
          : "Je kunt vermoedelijk schakelen tussen vertrouwde werkwijzen en nieuwe ideeën.");
    }
    if (facts.sixteen?.typeCode) personalityParts.push(`De 16-persoonlijkhedenvoorkeurstaal vat je profiel samen als ${facts.sixteen.typeCode}: ${facts.sixteen.typeLabel}.`);
    if (facts.selfValues?.valuesProfile?.rankedValues?.[0]) personalityParts.push(`${facts.selfValues.valuesProfile.rankedValues[0].label} staat bovenaan in je algemene waardenrangschikking.`);
    if (personalityParts.length) syntheses.push({ theme: "foundation", text: personalityParts.join(" ") });

    const thinkingParts = [];
    if (facts.cognitiveTop.length) thinkingParts.push(`Binnen de cognitieve opdrachten kwamen ${facts.cognitiveTop.map(item => item.label).join(", ")} relatief het duidelijkst naar voren.`);
    if (facts.digitalTop.length) thinkingParts.push(`In je digitale zelfbeoordeling behoren ${facts.digitalTop.map(item => item.title).join(", ")} tot je sterkste competenties.`);
    if (thinkingParts.length) syntheses.push({ theme: "thinking", text: thinkingParts.join(" ") });

    const careerParts = [];
    if (facts.careerTop.length) careerParts.push(`Je RIASEC-profiel start met ${facts.careerTop.join("-")}.`);
    if (facts.workValueTop.length) careerParts.push(`Je belangrijkste werkdrijfveren zijn ${facts.workValueTop.map(item => item.title).join(", ")}.`);
    if (facts.cultureTop.length) careerParts.push(`Qua cultuur staan ${facts.cultureTop.map(item => item.profile?.name || item.id).join(" en ")} bovenaan.`);
    if (careerParts.length) syntheses.push({ theme: "career", text: careerParts.join(" ") });

    const collaborationParts = [];
    if (facts.roleTop.length) collaborationParts.push(`In teams komen vooral ${facts.roleTop.map(item => item.name).join(", ")} naar voren.`);
    if (facts.leadershipTop.length) collaborationParts.push(`Je meest beschikbare leiderschapsstijlen zijn ${facts.leadershipTop.map(item => item.categoryLabel || item.name).join(", ")}.`);
    if (facts.disc?.mainLabel) collaborationParts.push(`Je DISC-profiel wordt samengevat als ${facts.disc.mainLabel.toLowerCase()}.`);
    if (collaborationParts.length) syntheses.push({ theme: "collaboration", text: collaborationParts.join(" ") });

    if (facts.wellbeing) {
      const balance = facts.wellbeing.balanceBand?.label || facts.wellbeing.mainLabel || "huidige balans";
      const parts = [`Je actuele werkbeleving wordt samengevat als ${balance.toLowerCase()}.`];
      if (facts.wellbeing.strongestResource?.label) parts.push(`${facts.wellbeing.strongestResource.label} is je duidelijkste hulpbron.`);
      if (facts.wellbeing.mainAttention?.label) parts.push(`${facts.wellbeing.mainAttention.label} verdient relatief de meeste aandacht.`);
      syntheses.push({ theme: "wellbeing", text: parts.join(" ") });
    }

    if (facts.identity) {
      syntheses.push({
        theme: "context",
        text: "Je identiteitsrapport toont per maatschappelijke as waar context relatief meer steun of meer drempels kan geven. Deze informatie kleurt kansen en ervaringen, maar vormt geen algemene privilegescore."
      });
    }

    return syntheses;
  }

  function buildCoreStrengths(facts, insights) {
    const cross = insights.filter(item => item.tone === "positive").map(item => item.title);
    const sourceStrengths = facts.reports.flatMap(report => report.strengths.slice(0, 2));
    const topSignals = [
      facts.roleTop[0]?.name ? `${facts.roleTop[0].name} is je sterkste teamrolbijdrage.` : "",
      facts.workValueTop[0]?.title ? `${facts.workValueTop[0].title} is een centrale werkdrijfveer.` : "",
      facts.cognitiveTop[0]?.label ? `${facts.cognitiveTop[0].label} kwam binnen de cognitieve opdrachten relatief duidelijk naar voren.` : "",
      facts.wellbeing?.strongestResource?.label ? `${facts.wellbeing.strongestResource.label} ondersteunt je huidige werkbeleving.` : ""
    ];
    return uniqueTexts([...cross, ...topSignals, ...sourceStrengths], 7);
  }

  function buildCoreWatchouts(facts, insights) {
    const integrated = insights.filter(item => item.tone === "watch").map(item => item.title);
    const development = facts.reports.flatMap(report => report.development.slice(0, 1));
    const wellbeing = facts.wellbeing?.mainAttention?.label ? [`${facts.wellbeing.mainAttention.label} is momenteel een relatief aandachtspunt.`] : [];
    return uniqueTexts([...integrated, ...wellbeing, ...development], 6);
  }

  function buildWorkConfiguration(facts) {
    const items = [];
    facts.workValueTop.slice(0, 3).forEach(value => items.push(`${value.title}: ${value.seeks || value.matrixDescription || "belangrijke werkvoorwaarde"}.`));
    facts.workValueNeeds.slice(0, 3).forEach(value => items.push(`${value.title} lijkt een minimumvoorwaarde om demotivatie te voorkomen.`));
    facts.cultureTop.slice(0, 2).forEach(culture => items.push(`${culture.profile?.name || culture.id}: ${culture.profile?.headline || "sluit relatief sterk aan"}`));
    const environment = facts.culture?.environment || {};
    ["scale", "location", "surroundings", "interior", "rhythm"].forEach(key => {
      const value = environment[key];
      const label = value?.badge || value?.name || value?.headline;
      if (label) items.push(label);
    });
    if (facts.careerTop.length) items.push(`Werkzaamheden die passen bij je RIASEC-richting ${facts.careerTop.join("-")} verdienen inhoudelijke verkenning.`);
    return uniqueTexts(items, 10);
  }

  function buildActionCompass(facts, insights) {
    const now = [];
    const threeMonths = [];
    const longer = [];

    const watch = insights.find(item => item.tone === "watch");
    if (watch?.practical) now.push(watch.practical);
    if (facts.wellbeing?.mainAttention?.label) now.push(`Kies één concrete actie rond ${facts.wellbeing.mainAttention.label.toLowerCase()} en evalueer binnen twee weken wat verandert.`);
    if (facts.workValues?.vacancyQuestions?.[0]) now.push(facts.workValues.vacancyQuestions[0]);

    const growth = facts.reports.flatMap(report => report.development).filter(Boolean);
    if (growth[0]) threeMonths.push(growth[0]);
    if (facts.digital?.growthCompetences?.[0]) threeMonths.push(`Oefen gericht met ${facts.digital.growthCompetences[0].title.toLowerCase()} via één concrete praktijksituatie.`);
    if (facts.cognitiveTop.length) threeMonths.push(`Onderzoek hoe je sterkere cognitieve gebieden kunnen helpen om een moeilijker onderdeel te ondersteunen.`);

    if (facts.careerTop.length) longer.push(`Verken minstens drie rollen met verschillende functietitels maar vergelijkbare werkzaamheden binnen ${facts.careerTop.join("-")}.`);
    if (facts.culture?.checklist?.[0]) longer.push(facts.culture.checklist[0]);
    if (facts.workValueTop[0]) longer.push(`Gebruik ${facts.workValueTop[0].title.toLowerCase()} als vast criterium bij grotere loopbaan- of studiekeuzes.`);

    return {
      now: uniqueTexts(now, 3),
      threeMonths: uniqueTexts(threeMonths, 3),
      longer: uniqueTexts(longer, 3)
    };
  }

  function createSectionHeader(eyebrow, title, description = "") {
    const header = element("div", "tr-section-header");
    const copy = element("div");
    copy.append(element("span", "tr-eyebrow", eyebrow), element("h2", "", title));
    header.appendChild(copy);
    if (description) header.appendChild(paragraph(description));
    return header;
  }

  function renderHero(mode, coverage, headline, summary) {
    const hero = element("section", "tr-hero");
    const copy = element("div");
    copy.append(
      element("span", "tr-eyebrow", REPORT_MODES[mode].label),
      element("h1", "", headline),
      paragraph(summary)
    );
    const score = element("div", "tr-hero-score");
    score.append(
      element("span", "", "Profieldekking"),
      element("strong", "", `${coverage.completed}/${coverage.total}`),
      element("small", "", `${coverage.percentage}% van de testen voltooid`)
    );
    hero.append(copy, score);
    return hero;
  }

  function renderCoverage(coverage) {
    const sectionNode = element("section", "tr-section");
    sectionNode.appendChild(createSectionHeader(
      "Onderbouwing",
      "Profieldekking",
      "Het rapport gebruikt uitsluitend voltooide testen met een bewaard resultaat. Minder ingevulde domeinen leiden tot voorzichtigere conclusies."
    ));
    const card = element("div", "tr-card");
    const grid = element("div", "tr-coverage-grid");
    coverage.domainCoverage.forEach(item => {
      const node = element("div", "tr-coverage-item");
      node.style.setProperty("--domain-color", item.color);
      node.append(
        element("strong", "", item.label),
        element("span", "", `${item.completed} van ${item.total} voltooid`)
      );
      const meter = element("div", "tr-meter");
      const fill = element("span");
      fill.style.width = `${item.percentage}%`;
      meter.appendChild(fill);
      node.appendChild(meter);
      grid.appendChild(node);
    });
    card.appendChild(grid);
    sectionNode.appendChild(card);
    return sectionNode;
  }

  function renderThemeCards(syntheses) {
    const sectionNode = element("section", "tr-section");
    sectionNode.appendChild(createSectionHeader(
      "Geïntegreerd overzicht",
      "Jouw profiel per hoofdthema",
      "De teksten brengen verwante resultaten samen zonder afzonderlijke rapporten letterlijk te herhalen."
    ));
    const grid = element("div", "tr-grid tr-grid-3");
    syntheses.forEach(synthesis => {
      const meta = THEME_META[synthesis.theme];
      const card = element("article", "tr-theme-card");
      card.append(
        element("span", "tr-eyebrow", meta.eyebrow),
        element("h3", "", meta.title),
        paragraph(synthesis.text)
      );
      grid.appendChild(card);
    });
    sectionNode.appendChild(grid);
    return sectionNode;
  }

  function renderListCard(title, items, tone, eyebrow = "Kernpunten") {
    const card = element("article", `tr-card ${tone ? `is-${tone}` : ""}`.trim());
    card.append(element("span", "tr-eyebrow", eyebrow), element("h3", "", title));
    appendTextList(card, items);
    return card;
  }

  function renderStrengthsAndWatchouts(strengths, watchouts) {
    const sectionNode = element("section", "tr-section");
    sectionNode.appendChild(createSectionHeader(
      "Samengevat",
      "Sterkste patronen en belangrijkste aandachtspunten",
      "Patronen krijgen meer gewicht wanneer meerdere resultaten in dezelfde richting wijzen."
    ));
    const grid = element("div", "tr-grid");
    grid.append(
      renderListCard("Wat je waarschijnlijk sterk kunt inzetten", strengths, "positive", "Sterktes"),
      renderListCard("Wat bewust opvolging verdient", watchouts.length ? watchouts : ["Er kwam geen uitgesproken geïntegreerd risicopatroon naar voren. Bekijk de afzonderlijke groeipunten voor nuance."], "watch", "Aandacht")
    );
    sectionNode.appendChild(grid);
    return sectionNode;
  }

  function renderConnections(insights) {
    const sectionNode = element("section", "tr-section");
    sectionNode.appendChild(createSectionHeader(
      "Extra meerwaarde",
      "Verbanden en spanningsvelden tussen testen",
      "Deze inzichten ontstaan pas wanneer resultaten uit meerdere testen samen worden gelezen. Ze zijn richtinggevend en geen absolute voorspellingen."
    ));
    const grid = element("div", "tr-grid");
    if (insights.length === 0) {
      grid.appendChild(renderListCard(
        "Nog onvoldoende kruisverbanden",
        ["Vul testen uit meerdere profielgebieden in om betrouwbare verbindingen tussen persoonlijkheid, werkvoorkeuren, samenwerking en welzijn te kunnen tonen."],
        "context",
        "Profieldekking"
      ));
    }
    insights.forEach(insight => {
      const card = element("article", `tr-insight-card is-${insight.tone}`);
      card.append(
        element("span", "tr-eyebrow", insight.strength),
        element("h3", "", insight.title),
        paragraph(insight.text)
      );
      if (insight.practical) {
        const practical = element("p");
        practical.append(element("strong", "", "Praktische betekenis: "), document.createTextNode(insight.practical));
        card.appendChild(practical);
      }
      const badges = element("div", "tr-badge-row");
      insight.sources.forEach(source => badges.appendChild(element("span", "tr-badge", source)));
      card.appendChild(badges);
      grid.appendChild(card);
    });
    sectionNode.appendChild(grid);
    return sectionNode;
  }

  function renderWorkConfiguration(items) {
    const sectionNode = element("section", "tr-section");
    sectionNode.appendChild(createSectionHeader(
      "Werkfit",
      "Jouw ideale werkconfiguratie",
      "Een passende functie bestaat uit een combinatie van taakinhoud, cultuur, regelruimte, omgeving en minimumvoorwaarden."
    ));
    sectionNode.appendChild(renderListCard(
      "Voorwaarden die waarschijnlijk belangrijk zijn",
      items.length ? items : ["Vul de interesse-, werkwaarden- en cultuurtest in om deze werkconfiguratie verder te onderbouwen."],
      "context",
      "Passende context"
    ));
    return sectionNode;
  }

  function renderActionCompass(compass) {
    const sectionNode = element("section", "tr-section");
    sectionNode.appendChild(createSectionHeader(
      "Van inzicht naar actie",
      "Persoonlijk kompas",
      "Geen lange algemene actielijst, maar een beperkte set eerstvolgende stappen op verschillende termijnen."
    ));
    const grid = element("div", "tr-grid tr-grid-3");
    grid.append(
      renderListCard("Nu", compass.now.length ? compass.now : ["Kies één resultaat dat je het meest herkent en verbind het aan een concrete situatie van de afgelopen maand."], "watch", "Eerstvolgende stap"),
      renderListCard("Komende drie maanden", compass.threeMonths.length ? compass.threeMonths : ["Kies één ontwikkelpunt en test een kleine, observeerbare gedragsverandering."], "context", "Experiment"),
      renderListCard("Langere termijn", compass.longer.length ? compass.longer : ["Gebruik je belangrijkste waarden en contextvoorkeuren als criteria bij toekomstige keuzes."], "positive", "Richting")
    );
    sectionNode.appendChild(grid);
    return sectionNode;
  }

  function renderMetricGrid(items) {
    const grid = element("div", "tr-metric-grid");
    safeArray(items).forEach(item => {
      const card = element("div", "tr-metric");
      const top = element("div", "tr-metric-top");
      top.append(element("strong", "", cleanText(item.label)), element("span", "", `${clampScore(item.score) ?? 0}%`));
      const meter = element("div", "tr-meter");
      const fill = element("span");
      fill.style.width = `${clampScore(item.score) ?? 0}%`;
      meter.appendChild(fill);
      card.append(top, meter);
      if (item.description) card.appendChild(paragraph(item.description));
      grid.appendChild(card);
    });
    return grid;
  }

  function renderGroupedMetrics(items) {
    const container = element("div", "tr-test-group");
    const groups = new Map();
    safeArray(items).forEach(item => {
      const key = item.group || "Onderdeel";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    });
    groups.forEach((groupItems, label) => {
      const details = element("details", "tr-detail-section");
      details.dataset.printExpand = "true";
      details.appendChild(element("summary", "", label));
      const body = element("div", "tr-detail-section-body");
      body.appendChild(renderMetricGrid(groupItems));
      details.appendChild(body);
      container.appendChild(details);
    });
    return container;
  }

  function renderKeyValue(rows) {
    const list = element("dl", "tr-key-value");
    safeArray(rows).forEach(row => {
      list.append(element("dt", "", cleanText(row?.[0])), element("dd", "", cleanText(row?.[1])));
    });
    return list;
  }

  function renderTable(data) {
    const wrap = element("div", "tr-table-wrap");
    const table = element("table", "tr-table");
    const head = element("thead");
    const headerRow = element("tr");
    safeArray(data?.headers).forEach(header => headerRow.appendChild(element("th", "", cleanText(header))));
    head.appendChild(headerRow);
    table.appendChild(head);
    const body = element("tbody");
    safeArray(data?.rows).forEach(row => {
      const tr = element("tr");
      safeArray(row).forEach(value => tr.appendChild(element("td", "", cleanText(value))));
      body.appendChild(tr);
    });
    table.appendChild(body);
    wrap.appendChild(table);
    return wrap;
  }

  function renderCards(items) {
    const grid = element("div", "tr-grid");
    safeArray(items).forEach(item => {
      const card = element("article", "tr-card");
      card.append(element("h3", "", item.title || "Onderdeel"));
      if (item.text) card.appendChild(paragraph(item.text));
      grid.appendChild(card);
    });
    return grid;
  }

  function renderCompound(data) {
    const wrap = element("div");
    if (data?.text) wrap.appendChild(paragraph(data.text));
    safeArray(data?.lists).forEach(list => {
      wrap.appendChild(element("h4", "", list.title));
      appendTextList(wrap, list.items);
    });
    return wrap;
  }

  function renderGroupLists(groups) {
    const grid = element("div", "tr-grid");
    safeArray(groups).forEach(group => {
      const card = element("article", "tr-card");
      card.appendChild(element("h3", "", group.title));
      appendTextList(card, group.items);
      grid.appendChild(card);
    });
    return grid;
  }

  function renderRichCards(items) {
    const grid = element("div", "tr-rich-grid");
    safeArray(items).forEach((item, index) => {
      const details = element("details", "tr-rich-card");
      details.dataset.printExpand = "true";
      details.open = index === 0;

      const summary = element("summary", "tr-rich-card-summary");
      const copy = element("div", "tr-rich-card-copy");
      copy.appendChild(element("h4", "", item.title || "Onderdeel"));
      if (item.subtitle) copy.appendChild(element("p", "", item.subtitle));
      const marker = element("span", "tr-rich-toggle uy-report-toggle-label", "Toon volledige uitleg");
      summary.append(copy, marker);
      details.appendChild(summary);

      const body = element("div", "tr-rich-card-body");
      if (item.text) body.appendChild(paragraph(item.text));
      if (safeArray(item.badges).length) {
        const badges = element("div", "tr-badges");
        uniqueTexts(item.badges).forEach(badge => badges.appendChild(element("span", "tr-badge", badge)));
        body.appendChild(badges);
      }
      safeArray(item.sections).forEach(subsection => {
        const block = element("section", "tr-rich-subsection");
        if (subsection.title) block.appendChild(element("h5", "", subsection.title));
        if (subsection.text) block.appendChild(paragraph(subsection.text));
        if (safeArray(subsection.items).length) appendTextList(block, subsection.items);
        body.appendChild(block);
      });
      details.appendChild(body);
      details.addEventListener("toggle", () => {
        marker.textContent = details.open ? "Verberg volledige uitleg" : "Toon volledige uitleg";
      });
      if (details.open) marker.textContent = "Verberg volledige uitleg";
      grid.appendChild(details);
    });
    return grid;
  }

  function renderDetailedSection(sectionData) {
    const details = element("details", "tr-detail-section");
    details.dataset.printExpand = "true";
    details.appendChild(element("summary", "", sectionData.title));
    const body = element("div", "tr-detail-section-body");
    if (sectionData.description) body.appendChild(paragraph(sectionData.description));
    switch (sectionData.type) {
      case "metrics": body.appendChild(renderMetricGrid(sectionData.data)); break;
      case "groupedMetrics": body.appendChild(renderGroupedMetrics(sectionData.data)); break;
      case "list": appendTextList(body, sectionData.data); break;
      case "text": body.appendChild(paragraph(sectionData.data)); break;
      case "keyValue": body.appendChild(renderKeyValue(sectionData.data)); break;
      case "table": body.appendChild(renderTable(sectionData.data)); break;
      case "cards": body.appendChild(renderCards(sectionData.data)); break;
      case "compound": body.appendChild(renderCompound(sectionData.data)); break;
      case "groupLists": body.appendChild(renderGroupLists(sectionData.data)); break;
      case "richCards": body.appendChild(renderRichCards(sectionData.data)); break;
      default: body.appendChild(paragraph("Geen aanvullende detailweergave beschikbaar."));
    }
    details.appendChild(body);
    return details;
  }

  function renderTestCard(report, open = false) {
    const details = element("details", "tr-test-card");
    details.dataset.printExpand = "true";
    details.open = open;

    const summary = element("summary", "tr-test-card-summary");
    const copy = element("div", "tr-test-card-summary-copy");
    copy.append(element("h3", "", report.title));
    if (report.summary) copy.appendChild(paragraph(report.summary));
    const main = element("div", "tr-test-card-main");
    main.append(element("strong", "", report.mainDisplay || "Resultaat"));
    if (report.mainLabel) main.appendChild(element("span", "", report.mainLabel));
    summary.append(copy, main);
    details.appendChild(summary);

    const body = element("div", "tr-test-card-body");
    if (report.headline && report.headline !== report.summary) {
      const intro = element("div", "tr-card is-context");
      intro.append(element("span", "tr-eyebrow", "Kernuitkomst"), element("h3", "", report.headline));
      body.appendChild(intro);
    }

    if (report.strengths.length || report.development.length) {
      const grid = element("div", "tr-grid");
      if (report.strengths.length) grid.appendChild(renderListCard("Sterkste onderdelen", report.strengths, "positive", "Bestaand rapport"));
      if (report.development.length) grid.appendChild(renderListCard("Ontwikkelpunten", report.development, "watch", "Bestaand rapport"));
      body.appendChild(grid);
    }

    if (report.meaning || report.advice) {
      const grid = element("div", "tr-grid");
      if (report.meaning) {
        const card = element("article", "tr-card");
        card.append(element("span", "tr-eyebrow", "Praktische betekenis"), element("h3", "", "Wat betekent dit resultaat?"), paragraph(report.meaning));
        grid.appendChild(card);
      }
      if (report.advice) {
        const card = element("article", "tr-card");
        card.append(element("span", "tr-eyebrow", "Volgende stap"), element("h3", "", "Hoe kun je verder?"), paragraph(report.advice));
        grid.appendChild(card);
      }
      body.appendChild(grid);
    }

    report.sections.forEach(sectionData => body.appendChild(renderDetailedSection(sectionData)));

    const source = element("p", "tr-confidence", `Bronresultaat voltooid op ${formatDate(report.completedAt)}`);
    body.appendChild(source);
    details.appendChild(body);
    return details;
  }

  function renderAllTests(reports, openFirst = false) {
    const sectionNode = element("section", "tr-section");
    sectionNode.appendChild(createSectionHeader(
      "Volledige onderbouwing",
      "Alle beschikbare testresultaten",
      "De informatie is per hoofdthema geordend. Teksten en scores komen uit de bestaande resultaten; de rapportmotor verandert de inhoud niet."
    ));

    const themes = ["foundation", "thinking", "career", "collaboration", "wellbeing", "context"];
    themes.forEach(theme => {
      const themedReports = reports.filter(report => report.theme === theme);
      if (!themedReports.length) return;
      const group = element("div", "tr-section");
      group.appendChild(createSectionHeader(THEME_META[theme].eyebrow, THEME_META[theme].title, THEME_META[theme].description));
      const list = element("div", "tr-test-group");
      themedReports.forEach((report, index) => list.appendChild(renderTestCard(report, openFirst && index === 0)));
      group.appendChild(list);
      sectionNode.appendChild(group);
    });
    return sectionNode;
  }

  function renderMethod(reports, mode) {
    const sectionNode = element("section", "tr-section");
    sectionNode.appendChild(createSectionHeader(
      "Transparantie",
      "Hoe dit totaalrapport tot stand komt",
      "Het totaalrapport leest lokaal opgeslagen resultaten en maakt daar een thematisch overzicht van."
    ));
    const grid = element("div", "tr-grid");
    const methodCard = element("article", "tr-card");
    methodCard.append(element("h3", "", "Werkwijze"));
    appendTextList(methodCard, [
      "Alleen voltooide testen met een geldig lokaal resultaat worden gebruikt.",
      "Het compacte rapport selecteert kernpatronen en laat details weg.",
      "Het volledige rapport ordent bestaande testinformatie thematisch.",
      "Het ultieme rapport voegt uitsluitend voorzichtige verbanden toe wanneer meerdere resultaten daarvoor relevante aanwijzingen bieden.",
      "Een verband wordt niet voorgesteld als diagnose, zekerheid of voorspelling van functioneren."
    ]);
    const boundaryCard = element("article", "tr-card");
    boundaryCard.append(element("h3", "", "Grenzen"));
    appendTextList(boundaryCard, [
      "Resultaten blijven zelfrapportages of prestaties binnen de specifieke opdrachten van een test.",
      "Scores uit verschillende testen worden niet behandeld alsof zij exact hetzelfde construct meten.",
      "Een onvolledig profiel kan bruikbaar zijn, maar ondersteunt minder brede conclusies.",
      "Het rapport is bedoeld voor zelfinzicht en ontwikkeling, niet voor diagnose, selectie of automatische besluitvorming."
    ]);
    grid.append(methodCard, boundaryCard);
    sectionNode.appendChild(grid);

    const sourceCard = element("details", "tr-source-card");
    sourceCard.dataset.printExpand = "true";
    sourceCard.appendChild(element("summary", "", "Gebruikte testresultaten bekijken"));
    const body = element("div", "tr-source-card-body");
    appendTextList(body, reports.map(report => `${report.title} — voltooid op ${formatDate(report.completedAt)}`));
    sourceCard.appendChild(body);
    sectionNode.appendChild(sourceCard);

    const footer = element("div", "tr-report-footer");
    footer.textContent = `${REPORT_MODES[mode].title} · gegenereerd op ${formatDate(new Date().toISOString())} · gegevens uitsluitend lokaal verwerkt.`;
    sectionNode.appendChild(footer);
    return sectionNode;
  }

  function buildHeadline(facts, insights, mode) {
    const primary = insights[0];
    if (mode === "ultimate" && primary) return primary.title;
    if (facts.workValueTop[0]?.title && facts.roleTop[0]?.name) {
      return `${facts.workValueTop[0].title} stuurt je werkkeuzes, terwijl ${facts.roleTop[0].name.toLowerCase()} je teamrolprofiel kleurt`;
    }
    if (facts.sixteen?.typeLabel) return `Een geïntegreerd profiel rond ${facts.sixteen.typeLabel.toLowerCase()}`;
    if (facts.wellbeing?.headline) return facts.wellbeing.headline;
    return "Jouw geïntegreerde persoonlijke profiel";
  }

  function buildSummary(facts, coverage, insights, mode) {
    const parts = [`Dit rapport gebruikt ${coverage.completed} van de ${coverage.total} beschikbare testen.`];
    if (mode === "compact") parts.push("Het toont alleen de belangrijkste patronen, voorwaarden en aandachtspunten.");
    if (mode === "full") parts.push("Alle beschikbare testinformatie is thematisch geordend, zodat je niet door veertien losse rapporten hoeft te bladeren.");
    if (mode === "ultimate") parts.push(`Naast alle testinformatie zijn ${insights.length} relevante verbindingen of spanningsvelden tussen resultaten onderzocht.`);
    if (facts.wellbeing?.balanceBand?.label) parts.push(`Je actuele werkbelevingsbalans wordt beschreven als ${facts.wellbeing.balanceBand.label.toLowerCase()}.`);
    return parts.join(" ");
  }

  function renderCompactReport(reports, facts, coverage, insights) {
    const fragment = document.createDocumentFragment();
    const syntheses = buildThemeSyntheses(facts);
    fragment.append(
      renderHero("compact", coverage, buildHeadline(facts, insights, "compact"), buildSummary(facts, coverage, insights, "compact")),
      renderCoverage(coverage),
      renderThemeCards(syntheses),
      renderStrengthsAndWatchouts(buildCoreStrengths(facts, insights), buildCoreWatchouts(facts, insights)),
      renderWorkConfiguration(buildWorkConfiguration(facts)),
      renderActionCompass(buildActionCompass(facts, insights)),
      renderMethod(reports, "compact")
    );
    return fragment;
  }

  function renderFullReport(reports, facts, coverage, insights) {
    const fragment = document.createDocumentFragment();
    fragment.append(
      renderHero("full", coverage, buildHeadline(facts, insights, "full"), buildSummary(facts, coverage, insights, "full")),
      renderCoverage(coverage),
      renderThemeCards(buildThemeSyntheses(facts)),
      renderStrengthsAndWatchouts(buildCoreStrengths(facts, insights), buildCoreWatchouts(facts, insights)),
      renderWorkConfiguration(buildWorkConfiguration(facts)),
      renderAllTests(reports, false),
      renderActionCompass(buildActionCompass(facts, insights)),
      renderMethod(reports, "full")
    );
    return fragment;
  }

  function renderUltimateReport(reports, facts, coverage, insights) {
    const fragment = document.createDocumentFragment();
    fragment.append(
      renderHero("ultimate", coverage, buildHeadline(facts, insights, "ultimate"), buildSummary(facts, coverage, insights, "ultimate")),
      renderCoverage(coverage),
      renderThemeCards(buildThemeSyntheses(facts)),
      renderConnections(insights),
      renderStrengthsAndWatchouts(buildCoreStrengths(facts, insights), buildCoreWatchouts(facts, insights)),
      renderWorkConfiguration(buildWorkConfiguration(facts)),
      renderActionCompass(buildActionCompass(facts, insights)),
      renderAllTests(reports, false),
      renderMethod(reports, "ultimate")
    );
    return fragment;
  }

  function renderEmptyReport() {
    const empty = element("section", "tr-empty-state");
    empty.append(
      element("h2", "", "Nog geen totaalrapport beschikbaar"),
      paragraph("Voltooi minstens één test om een persoonlijk totaaloverzicht te maken. Voor verbanden tussen resultaten zijn testen uit meerdere profielgebieden nodig.")
    );
    const button = element("button", "button button-primary", "Terug naar mijn profiel");
    button.type = "button";
    button.addEventListener("click", closeTotalReport);
    empty.appendChild(button);
    return empty;
  }

  function renderActiveReport() {
    const reports = getCompletedReportData();
    const coverage = calculateCoverage(reports);
    documentRoot.replaceChildren();

    if (reports.length === 0) {
      documentRoot.appendChild(renderEmptyReport());
      updateWorkspaceLabels(coverage);
      return;
    }

    const facts = buildFacts(reports);
    const insights = buildConnections(facts);
    let content;
    if (activeMode === "full") content = renderFullReport(reports, facts, coverage, insights);
    else if (activeMode === "ultimate") content = renderUltimateReport(reports, facts, coverage, insights);
    else content = renderCompactReport(reports, facts, coverage, insights);

    documentRoot.appendChild(content);
    updateWorkspaceLabels(coverage);
  }

  function updateWorkspaceLabels(coverage) {
    const config = REPORT_MODES[activeMode];
    topbarTitle.textContent = config.title;
    printTitle.textContent = config.title;
    printDate.textContent = `Gegenereerd op ${formatDate(new Date().toISOString())} · ${coverage.completed} van ${coverage.total} testen voltooid`;
    modeTabs.forEach(tab => {
      const selected = tab.dataset.totalReportTab === activeMode;
      tab.setAttribute("aria-selected", String(selected));
    });
  }

  function openTotalReport(mode = "compact") {
    activeMode = REPORT_MODES[mode] ? mode : "compact";
    renderActiveReport();
    workspace.hidden = false;
    workspace.setAttribute("aria-hidden", "false");
    document.body.classList.add("total-report-open");
    workspace.scrollTop = 0;
    closeButton?.focus();
  }

  function closeTotalReport() {
    workspace.hidden = true;
    workspace.setAttribute("aria-hidden", "true");
    document.body.classList.remove("total-report-open");
    document.body.classList.remove("total-report-printing");
  }

  function prepareTotalReportPrint() {
    if (workspace.hidden) return;
    printOpenStates = Array.from(documentRoot.querySelectorAll("details")).map(details => ({ details, open: details.open }));
    documentRoot.querySelectorAll("details").forEach(details => { details.open = true; });
    document.body.classList.add("total-report-printing");
  }

  function restoreTotalReportPrint() {
    if (!document.body.classList.contains("total-report-printing")) return;
    printOpenStates.forEach(item => { item.details.open = item.open; });
    printOpenStates = [];
    document.body.classList.remove("total-report-printing");
  }

  function printTotalReport() {
    prepareTotalReportPrint();
    window.print();
  }

  function updateLauncher() {
    const reports = getCompletedReportData();
    const coverage = calculateCoverage(reports);
    if (launcherCount) launcherCount.textContent = String(coverage.completed);
    if (launcherCoverageText) launcherCoverageText.textContent = `${coverage.completed} van ${coverage.total} testen beschikbaar voor je totaalrapport`;
    if (launcherProgress) launcherProgress.style.width = `${coverage.percentage}%`;
    if (launcherDomainCoverage) {
      launcherDomainCoverage.replaceChildren();
      coverage.domainCoverage.forEach(item => {
        const row = element("div", "total-report-domain-line");
        row.style.setProperty("--domain-color", item.color);
        row.appendChild(element("span", "", item.label));
        const progress = element("div", "linear-progress");
        const fill = element("span");
        fill.style.width = `${item.percentage}%`;
        progress.appendChild(fill);
        row.appendChild(progress);
        row.appendChild(element("small", "", `${item.completed}/${item.total}`));
        launcherDomainCoverage.appendChild(row);
      });
    }
    modeButtons.forEach(button => {
      button.disabled = reports.length === 0;
      button.title = reports.length === 0 ? "Voltooi eerst minstens één test" : "";
    });
  }

  modeButtons.forEach(button => button.addEventListener("click", () => openTotalReport(button.dataset.openTotalReport)));
  modeTabs.forEach(tab => tab.addEventListener("click", () => {
    const mode = tab.dataset.totalReportTab;
    if (!REPORT_MODES[mode] || mode === activeMode) return;
    activeMode = mode;
    renderActiveReport();
    workspace.scrollTop = 0;
  }));

  closeButton?.addEventListener("click", closeTotalReport);
  printButton?.addEventListener("click", printTotalReport);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !workspace.hidden) closeTotalReport();
  });

  window.addEventListener("beforeprint", () => {
    if (!workspace.hidden) prepareTotalReportPrint();
  });
  window.addEventListener("afterprint", restoreTotalReportPrint);

  const progressTarget = document.getElementById("totalProgressText");
  if (progressTarget) {
    new MutationObserver(updateLauncher).observe(progressTarget, { childList: true, subtree: true, characterData: true });
  }

  window.refreshTotalReport = updateLauncher;
  updateLauncher();
})();
