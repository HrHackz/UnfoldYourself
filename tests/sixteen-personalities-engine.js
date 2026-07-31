"use strict";

/*
  Unfold Yourself — 16 Persoonlijkheden-testmodule
  Afhankelijkheden: sixteen-personalities-questions.js, sixteen-personalities-results.js, core/test-utils.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

/* =========================================================
   16 PERSOONLIJKHEDEN — EXTERNE VRAGEN
========================================================= */

const SIXTEEN_PERSONALITIES_QUESTIONS =
  Array.isArray(
    window.SIXTEEN_PERSONALITIES_QUESTIONS
  )
    ? window.SIXTEEN_PERSONALITIES_QUESTIONS
    : [];


const SIXTEEN_PERSONALITIES_RESULTS =
  window.SIXTEEN_PERSONALITIES_RESULTS &&
  typeof window.SIXTEEN_PERSONALITIES_RESULTS ===
    "object"
    ? window.SIXTEEN_PERSONALITIES_RESULTS
    : {};


/* =========================================================
   16 PERSOONLIJKHEDEN — VOORKEURSPAREN
========================================================= */

const SIXTEEN_PERSONALITIES_PREFERENCE_PAIRS = [
  {
    id: "energie",
    leftCode: "E",
    rightCode: "I",
    leftLabel: "Extraversie",
    rightLabel: "Introversie",
    category: "Energie en sociale gerichtheid"
  },
  {
    id: "informatie",
    leftCode: "S",
    rightCode: "N",
    leftLabel: "Waarneming",
    rightLabel: "Intuïtie",
    category: "Informatie en aandacht"
  },
  {
    id: "besluitvorming",
    leftCode: "T",
    rightCode: "F",
    leftLabel: "Denken",
    rightLabel: "Voelen",
    category: "Besluitvorming"
  },
  {
    id: "levensstijl",
    leftCode: "J",
    rightCode: "P",
    leftLabel: "Structuur",
    rightLabel: "Flexibiliteit",
    category: "Omgang met planning en verandering"
  }
];


const SIXTEEN_PERSONALITIES_PAIR_BY_CODE =
  Object.fromEntries(
    SIXTEEN_PERSONALITIES_PREFERENCE_PAIRS
      .flatMap(pair => {
        return [
          [pair.leftCode, pair],
          [pair.rightCode, pair]
        ];
      })
  );


const SIXTEEN_PERSONALITIES_TYPE_LABELS = {
  ISTJ: "De plichtsgetrouwe organisator",
  ISFJ: "De zorgzame beschermer",
  INFJ: "De inzichtelijke begeleider",
  INTJ: "De strategische architect",
  ISTP: "De praktische oplosser",
  ISFP: "De flexibele bemiddelaar",
  INFP: "De idealistische verkenner",
  INTP: "De analytische denker",
  ESTP: "De energieke doener",
  ESFP: "De spontane verbinder",
  ENFP: "De enthousiaste inspirator",
  ENTP: "De vindingrijke vernieuwer",
  ESTJ: "De daadkrachtige organisator",
  ESFJ: "De betrokken ondersteuner",
  ENFJ: "De mensgerichte motivator",
  ENTJ: "De strategische leider"
};


const SIXTEEN_PERSONALITIES_PREFERENCE_CONTENT = {
  E: {
    label: "Extraversie",
    strength:
      "Je haalt waarschijnlijk energie uit interactie, activiteit en zichtbaar deelnemen.",
    development:
      "Plan ook rustige momenten waarin je kunt luisteren, verwerken en geconcentreerd alleen werken.",
    meaning:
      "je energie doorgaans sterker naar buiten richt en gemakkelijk contact of activiteit opzoekt"
  },

  I: {
    label: "Introversie",
    strength:
      "Je haalt waarschijnlijk energie uit rust, verdieping en zelfstandig nadenken.",
    development:
      "Maak je ideeën bewust zichtbaar en zoek gericht contact wanneer samenwerking of invloed nodig is.",
    meaning:
      "je energie doorgaans sterker naar binnen richt en tijd nodig hebt om ervaringen te verwerken"
  },

  S: {
    label: "Waarneming",
    strength:
      "Je let waarschijnlijk sterk op concrete feiten, ervaring en wat direct toepasbaar is.",
    development:
      "Neem geregeld afstand van de details om ook patronen, alternatieven en toekomstige mogelijkheden te onderzoeken.",
    meaning:
      "je informatie vooral verwerkt via concrete waarnemingen, ervaring en praktische toepasbaarheid"
  },

  N: {
    label: "Intuïtie",
    strength:
      "Je ziet waarschijnlijk gemakkelijk patronen, betekenissen en nieuwe mogelijkheden.",
    development:
      "Controleer ideeën bewust op feiten, haalbaarheid en de concrete stappen die nodig zijn voor uitvoering.",
    meaning:
      "je informatie vooral verwerkt via verbanden, interpretaties en mogelijke toekomstige ontwikkelingen"
  },

  T: {
    label: "Denken",
    strength:
      "Je neemt beslissingen waarschijnlijk graag op basis van logica, consistentie en objectieve criteria.",
    development:
      "Maak naast de inhoud ook expliciet ruimte voor waarden, relaties en de menselijke impact van beslissingen.",
    meaning:
      "je bij beslissingen relatief veel gewicht geeft aan logica, analyse en consequente maatstaven"
  },

  F: {
    label: "Voelen",
    strength:
      "Je neemt beslissingen waarschijnlijk met veel aandacht voor waarden, mensen en onderlinge verhoudingen.",
    development:
      "Controleer belangrijke beslissingen ook op feiten, consistentie en gevolgen op langere termijn.",
    meaning:
      "je bij beslissingen relatief veel gewicht geeft aan persoonlijke waarden en de invloed op anderen"
  },

  J: {
    label: "Structuur",
    strength:
      "Je werkt waarschijnlijk graag met duidelijkheid, planning, afspraken en afgeronde beslissingen.",
    development:
      "Laat bij verandering bewust ruimte voor nieuwe informatie, experimenten en aanpassing van je oorspronkelijke plan.",
    meaning:
      "je voorkeur hebt voor structuur, voorspelbaarheid en tijdig vastgelegde keuzes"
  },

  P: {
    label: "Flexibiliteit",
    strength:
      "Je houdt waarschijnlijk graag opties open en past je gemakkelijk aan nieuwe omstandigheden aan.",
    development:
      "Gebruik duidelijke deadlines en beslismomenten om te voorkomen dat opties te lang open blijven.",
    meaning:
      "je voorkeur hebt voor flexibiliteit, spontaniteit en ruimte om je aanpak onderweg bij te sturen"
  }
};


const SIXTEEN_PERSONALITIES_BALANCED_PAIR_CONTENT = {
  energie: {
    label:
      "Balans tussen extraversie en introversie",

    strength:
      "Je antwoorden tonen een evenwicht tussen sociale gerichtheid en behoefte aan rust en verwerking.",

    development:
      "Blijf per situatie bewust kiezen of actief contact of juist afzondering en reflectie het meest behulpzaam zijn.",

    meaning:
      "je zowel energie kunt halen uit contact met anderen als uit tijd om zelfstandig na te denken"
  },

  informatie: {
    label:
      "Balans tussen waarneming en intuïtie",

    strength:
      "Je antwoorden tonen een evenwicht tussen concrete feiten en bredere patronen of mogelijkheden.",

    development:
      "Controleer bij belangrijke keuzes bewust of je zowel de praktische details als het grotere geheel voldoende hebt bekeken.",

    meaning:
      "je kunt schakelen tussen concrete informatie en abstracte verbanden of toekomstige mogelijkheden"
  },

  besluitvorming: {
    label:
      "Balans tussen denken en voelen",

    strength:
      "Je antwoorden tonen een evenwicht tussen logische criteria en aandacht voor waarden en menselijke gevolgen.",

    development:
      "Maak bij moeilijke beslissingen expliciet welke feiten, principes, waarden en relationele gevolgen je meeweegt.",

    meaning:
      "je beslissingen zowel rationeel kunt analyseren als vanuit persoonlijke en menselijke waarden kunt bekijken"
  },

  levensstijl: {
    label:
      "Balans tussen structuur en flexibiliteit",

    strength:
      "Je antwoorden tonen een evenwicht tussen behoefte aan planning en ruimte om spontaan bij te sturen.",

    development:
      "Bepaal vooraf welke onderdelen echt vast moeten liggen en waar flexibiliteit juist voordeel oplevert.",

    meaning:
      "je zowel met duidelijke planning als met een open en aanpasbare werkwijze kunt functioneren"
  }
};


/* =========================================================
   16 PERSOONLIJKHEDEN — AANVULLENDE BESLISSINGSVRAGEN

   Alleen een voorkeurspaar dat na de 70 gewone vragen
   exact gelijk staat, krijgt één aanvullende vraag.
   Deze vraag bepaalt uitsluitend de letter in de typecode.
   De oorspronkelijke percentages blijven 50% tegenover 50%.
========================================================= */

const SIXTEEN_PERSONALITIES_TIE_BREAK_QUESTIONS = {
  energie: {
    id:
      "sixteen-personalities-tiebreak-energy",

    pairId:
      "energie",

    isTieBreak:
      true,

    category:
      "Aanvullende beslissingsvraag · Energie",

    text:
      "Na een intensieve week herstel je meestal het beste door:",

    answerOptions: [
      {
        type: "A",
        label:
          "Contact en activiteit met andere mensen op te zoeken.",
        score: "E"
      },
      {
        type: "B",
        label:
          "Tijd alleen en weinig externe prikkels te nemen.",
        score: "I"
      }
    ]
  },

  informatie: {
    id:
      "sixteen-personalities-tiebreak-information",

    pairId:
      "informatie",

    isTieBreak:
      true,

    category:
      "Aanvullende beslissingsvraag · Informatie",

    text:
      "Bij een nieuw onderwerp begin je het liefst met:",

    answerOptions: [
      {
        type: "A",
        label:
          "Concrete voorbeelden, feiten en praktische uitleg.",
        score: "S"
      },
      {
        type: "B",
        label:
          "Het grotere idee, mogelijke verbanden en toekomstige toepassingen.",
        score: "N"
      }
    ]
  },

  besluitvorming: {
    id:
      "sixteen-personalities-tiebreak-decisions",

    pairId:
      "besluitvorming",

    isTieBreak:
      true,

    category:
      "Aanvullende beslissingsvraag · Besluitvorming",

    text:
      "Bij een moeilijke beslissing geeft uiteindelijk vaker de doorslag:",

    answerOptions: [
      {
        type: "A",
        label:
          "Welke keuze logisch en consequent het best te verdedigen is.",
        score: "T"
      },
      {
        type: "B",
        label:
          "Welke keuze het best aansluit bij je waarden en de betrokken mensen.",
        score: "F"
      }
    ]
  },

  levensstijl: {
    id:
      "sixteen-personalities-tiebreak-lifestyle",

    pairId:
      "levensstijl",

    isTieBreak:
      true,

    category:
      "Aanvullende beslissingsvraag · Levensstijl",

    text:
      "Bij een belangrijke opdracht voel je je prettiger wanneer:",

    answerOptions: [
      {
        type: "A",
        label:
          "De aanpak, planning en beslismomenten vroeg duidelijk zijn.",
        score: "J"
      },
      {
        type: "B",
        label:
          "Er lang ruimte blijft om de aanpak aan nieuwe omstandigheden aan te passen.",
        score: "P"
      }
    ]
  }
};


function countSixteenPersonalitiesBaseScores(
  definition,
  session
) {
  if (
    !definition ||
    !session ||
    !Array.isArray(
      definition.questions
    )
  ) {
    return null;
  }

  const scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  };

  for (
    const question
    of definition.questions
  ) {
    const answer =
      session.answers?.[
        question.id
      ];

    if (
      typeof answer !== "string" ||
      !Object.prototype.hasOwnProperty.call(
        scores,
        answer
      )
    ) {
      return null;
    }

    scores[answer] += 1;
  }

  return scores;
}


function createSixteenPersonalitiesTieBreakQuestions({
  definition,
  session
}) {
  const scores =
    countSixteenPersonalitiesBaseScores(
      definition,
      session
    );

  if (!scores) {
    return [];
  }

  return SIXTEEN_PERSONALITIES_PREFERENCE_PAIRS
    .filter(pair => {
      return (
        scores[pair.leftCode] ===
        scores[pair.rightCode]
      );
    })
    .map(pair => {
      const sourceQuestion =
        SIXTEEN_PERSONALITIES_TIE_BREAK_QUESTIONS[
          pair.id
        ];

      return {
        ...sourceQuestion,

        answerOptions:
          sourceQuestion.answerOptions.map(
            option => {
              return {
                ...option
              };
            }
          )
      };
    });
}


function getSixteenPersonalitiesPair(
  question
) {
  const scoreCodes =
    Array.isArray(
      question?.answerOptions
    )
      ? question.answerOptions
          .map(option => {
            return option?.score;
          })
          .filter(Boolean)
      : [];

  return (
    scoreCodes
      .map(code => {
        return (
          SIXTEEN_PERSONALITIES_PAIR_BY_CODE[
            code
          ] || null
        );
      })
      .find(Boolean) ||
    null
  );
}


function getSixteenPersonalitiesChoices(
  question
) {
  if (
    !Array.isArray(
      question?.answerOptions
    )
  ) {
    return [];
  }

  return question.answerOptions
    .filter(option => {
      return Boolean(
        option &&
        option.type &&
        option.label &&
        option.score
      );
    })
    .map(option => {
      return {
        value:
          String(option.score),

        marker:
          String(option.type),

        label:
          String(option.label),

        description:
          ""
      };
    });
}


const mappedSixteenPersonalitiesQuestions =
  SIXTEEN_PERSONALITIES_QUESTIONS
    .filter(question => {
      return Boolean(
        question?.id &&
        question?.text &&
        Array.isArray(
          question.answerOptions
        ) &&
        question.answerOptions.length === 2
      );
    })
    .map(question => {
      const pair =
        getSixteenPersonalitiesPair(
          question
        );

      return {
        id:
          question.id,

        number:
          Number(question.number),

        text:
          question.text,

        answerOptions:
          question.answerOptions,

        category:
          pair?.category ||
          "Persoonlijkheidsvoorkeur"
      };
    });


if (
  mappedSixteenPersonalitiesQuestions
    .length !== 70
) {
  console.warn(
    "16 Persoonlijkheden-controle: er werden " +
    mappedSixteenPersonalitiesQuestions.length +
    " vragen geladen in plaats van 70."
  );
}


function calculateSixteenPersonalitiesResult({
  definition,
  session,
  testId
}) {
  if (!definition || !session) {
    return null;
  }

  const scores =
    countSixteenPersonalitiesBaseScores(
      definition,
      session
    );

  if (!scores) {
    return null;
  }

  const additionalQuestions =
    Array.isArray(
      session.additionalQuestions
    )
      ? session.additionalQuestions
      : [];

  const preferencePairs =
    SIXTEEN_PERSONALITIES_PREFERENCE_PAIRS
      .map(pair => {
        const leftScore =
          scores[pair.leftCode];

        const rightScore =
          scores[pair.rightCode];

        const total =
          leftScore + rightScore;

        const isTie =
          leftScore === rightScore;

        const tieBreakQuestion =
          isTie
            ? additionalQuestions.find(
                question => {
                  return (
                    question.pairId ===
                    pair.id
                  );
                }
              )
            : null;

        const tieBreakAnswer =
          tieBreakQuestion
            ? session.answers?.[
                tieBreakQuestion.id
              ]
            : null;

        if (
          isTie &&
          tieBreakAnswer !==
            pair.leftCode &&
          tieBreakAnswer !==
            pair.rightCode
        ) {
          return null;
        }

        const preferredCode =
          isTie
            ? tieBreakAnswer
            : leftScore > rightScore
              ? pair.leftCode
              : pair.rightCode;

        const leftPercentage =
          total > 0
            ? Math.round(
                (
                  leftScore /
                  total
                ) * 100
              )
            : 0;

        const rightPercentage =
          total > 0
            ? 100 -
              leftPercentage
            : 0;

        const preferredLabel =
          preferredCode ===
            pair.leftCode
            ? pair.leftLabel
            : pair.rightLabel;

        const preferredPercentage =
          isTie
            ? 50
            : preferredCode ===
                pair.leftCode
              ? leftPercentage
              : rightPercentage;

        return {
          id:
            pair.id,

          leftCode:
            pair.leftCode,

          rightCode:
            pair.rightCode,

          leftLabel:
            pair.leftLabel,

          rightLabel:
            pair.rightLabel,

          leftScore,

          rightScore,

          leftPercentage,

          rightPercentage,

          preferredCode,

          preferredLabel,

          preferredPercentage,

          isTie,

          resolvedByAdditionalQuestion:
            isTie
        };
      });

  if (
    preferencePairs.some(
      pair => {
        return !pair;
      }
    )
  ) {
    return null;
  }

  const typeCode =
    preferencePairs
      .map(pair => {
        return pair.preferredCode;
      })
      .join("");

  const tiedPairs =
    preferencePairs.filter(
      pair => {
        return pair.isTie;
      }
    );

  const tieCount =
    tiedPairs.length;

  const profile =
    SIXTEEN_PERSONALITIES_RESULTS[
      typeCode
    ] || null;

  const typeLabel =
    profile?.name ||
    SIXTEEN_PERSONALITIES_TYPE_LABELS[
      typeCode
    ] ||
    "Persoonlijkheidsprofiel";

  const preferredProfiles =
    preferencePairs
      .map(pair => {
        return (
          SIXTEEN_PERSONALITIES_PREFERENCE_CONTENT[
            pair.preferredCode
          ]
        );
      })
      .filter(Boolean);

  const dimensions =
    preferencePairs.map(pair => {
      const tieExplanation =
        pair.isTie
          ? ` · lichte voorkeur voor ${pair.preferredCode} op basis van een aanvullende beslissingsvraag`
          : "";

      return {
        id:
          pair.id,

        code:
          pair.preferredCode,

        label:
          `${pair.preferredLabel} (${pair.preferredCode})`,

        score:
          pair.preferredPercentage,

        description:
          `${pair.leftLabel} ${pair.leftPercentage}% · ` +
          `${pair.rightLabel} ${pair.rightPercentage}%` +
          tieExplanation
      };
    });

  const tieSummary =
    tieCount === 0
      ? ""
      : (
          tieCount === 1
            ? " Eén voorkeursschaal stond na de 70 gewone vragen exact op 50% tegenover 50%. Een aanvullende beslissingsvraag heeft alleen de betreffende letter bepaald."
            : ` ${tieCount} voorkeursschalen stonden na de 70 gewone vragen exact op 50% tegenover 50%. Aanvullende beslissingsvragen hebben alleen de betreffende letters bepaald.`
        );

  const defaultSummary =
    `Je antwoorden wijzen het sterkst in de richting van ${typeCode}: ${typeLabel.toLowerCase()}. De vier letters tonen je relatieve voorkeur binnen ieder paar.`;

  const profileSummary =
    profile?.shortDescription
      ? `${profile.shortDescription}${tieSummary}`
      : `${defaultSummary}${tieSummary}`;

  const profileStrengths =
    Array.isArray(
      profile?.strengths
    ) &&
    profile.strengths.length > 0
      ? profile.strengths
      : preferredProfiles.map(
          preference => {
            return preference.strength;
          }
        );

  const profileDevelopment =
    Array.isArray(
      profile?.developmentAreas
    ) &&
    profile.developmentAreas.length > 0
      ? profile.developmentAreas
      : preferredProfiles.map(
          preference => {
            return preference.development;
          }
        );

  const profileMeaning =
    profile?.overview
      ? profile.overview.replace(
          /\s*\n\s*/g,
          " "
        )
      : `Dit profiel wijst erop dat ${preferredProfiles.map(
          preference => {
            return preference.meaning;
          }
        ).join("; ")}.`;

  const profileAdvice =
    Array.isArray(
      profile?.growthAdvice
    ) &&
    profile.growthAdvice.length > 0
      ? profile.growthAdvice.join(" ")
      : (
          tieCount === 0
            ? "Gebruik je typecode als taal om voorkeuren te onderzoeken, niet als grens voor wat je kunt leren of doen."
            : "Gebruik een letter die via een aanvullende vraag is bepaald als een lichte voorkeur. Bij 50% tegenover 50% kun je waarschijnlijk gemakkelijk tussen beide kanten schakelen."
        );

  return {
    testId,

    testTitle:
      definition.title,

    resultType:
      definition.resultType,

    mainScoreHeading:
      definition.mainScoreHeading,

    completedAt:
      new Date().toISOString(),

    mainScoreDisplay:
      typeCode,

    mainLabel:
      typeLabel,

    typeCode,

    typeLabel,

    rawScores:
      scores,

    preferencePairs,

    dimensions,

    profile,

    summary:
      profileSummary,

    strengths:
      profileStrengths,

    development:
      profileDevelopment,

    meaning:
      profileMeaning,

    advice:
      profileAdvice
  };
}


function hydrateSixteenPersonalityResult(
  result
) {
  const sixteenTestId =
    "persoonlijkheid::16 Persoonlijkheden-test";

  if (
    !result ||
    result.testId !== sixteenTestId ||
    !result.typeCode
  ) {
    return result;
  }

  const profile =
    result.profile ||
    SIXTEEN_PERSONALITIES_RESULTS[
      result.typeCode
    ] ||
    null;

  if (!profile) {
    return result;
  }

  const tieCount =
    Array.isArray(
      result.preferencePairs
    )
      ? result.preferencePairs.filter(
          pair => {
            return pair?.isTie;
          }
        ).length
      : 0;

  const tieSummary =
    tieCount === 0
      ? ""
      : (
          tieCount === 1
            ? " Eén voorkeursschaal stond na de 70 gewone vragen exact op 50% tegenover 50%. Een aanvullende beslissingsvraag heeft alleen de betreffende letter bepaald."
            : ` ${tieCount} voorkeursschalen stonden na de 70 gewone vragen exact op 50% tegenover 50%. Aanvullende beslissingsvragen hebben alleen de betreffende letters bepaald.`
        );

  const enrichedResult = {
    ...result,

    profile,

    mainLabel:
      profile.name ||
      result.mainLabel,

    summary:
      profile.shortDescription
        ? `${profile.shortDescription}${tieSummary}`
        : result.summary,

    strengths:
      Array.isArray(
        profile.strengths
      )
        ? profile.strengths
        : result.strengths,

    development:
      Array.isArray(
        profile.developmentAreas
      )
        ? profile.developmentAreas
        : result.development,

    meaning:
      profile.overview
        ? profile.overview.replace(
            /\s*\n\s*/g,
            " "
          )
        : result.meaning,

    advice:
      Array.isArray(
        profile.growthAdvice
      ) &&
      profile.growthAdvice.length > 0
        ? profile.growthAdvice.join(
            " "
          )
        : result.advice
  };

  if (
    state?.results?.[
      sixteenTestId
    ]
  ) {
    state.results[
      sixteenTestId
    ] = enrichedResult;

    saveState();
  }

  return enrichedResult;
}


function renderSixteenPersonalityProfile(
  result
) {
  removeDynamicProfileCards();

  const profile =
    result?.profile ||
    SIXTEEN_PERSONALITIES_RESULTS[
      result?.typeCode
    ] ||
    null;

  if (
    !profile ||
    !resultContentGrid
  ) {
    return;
  }

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        profile.preferenceSummary ||
        "Persoonlijkheidsprofiel",

      title:
        `${profile.type} · ${profile.name}`,

      summary:
        profile.overview,

      sections: [
        {
          title:
            "Kenmerkende eigenschappen",

          items:
            profile.characteristicTraits
        }
      ],

      fullWidth:
        true
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        "Relaties en samenwerking",

      title:
        "Hoe je verbinding aangaat",

      summary:
        profile.relationships?.summary,

      sections: [
        {
          title:
            "Sterktes in relaties",

          items:
            profile.relationships?.strengths
        },
        {
          title:
            "Aandachtspunten",

          items:
            profile.relationships?.watchouts
        }
      ]
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        "Werk en loopbaan",

      title:
        "Waar je waarschijnlijk tot je recht komt",

      summary:
        profile.workAndCareer?.summary,

      sections: [
        {
          title:
            "Werkt vaak goed wanneer",

          items:
            profile.workAndCareer?.worksBestWhen
        },
        {
          title:
            "Kan uitdagend zijn wanneer",

          items:
            profile.workAndCareer?.challengingWhen
        },
        {
          title:
            "Voorbeeldrichtingen",

          items:
            profile.workAndCareer?.exampleDirections
        }
      ]
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        "Stress en herstel",

      title:
        "Signalen en herstelstrategieën",

      sections: [
        {
          title:
            "Mogelijke stresssignalen",

          items:
            profile.stressAndRecovery?.signals
        },
        {
          title:
            "Wat herstel kan ondersteunen",

          items:
            profile.stressAndRecovery?.recovery
        }
      ]
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        "Persoonlijke ontwikkeling",

      title:
        "Concrete groeistappen",

      sections: [
        {
          title:
            "Ontwikkeladvies",

          items:
            profile.growthAdvice
        }
      ]
    })
  );

  const cognitiveFunctionItems =
    [
      [
        "Dominant",
        profile.cognitiveFunctions?.dominant
      ],
      [
        "Ondersteunend",
        profile.cognitiveFunctions?.auxiliary
      ],
      [
        "Tertiair",
        profile.cognitiveFunctions?.tertiary
      ],
      [
        "Inferieur",
        profile.cognitiveFunctions?.inferior
      ]
    ]
      .filter(([, item]) => {
        return Boolean(item);
      })
      .map(([position, item]) => {
        return (
          `${position}: ${item.name} (${item.code}) — ` +
          item.description
        );
      });

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        "Cognitieve voorkeuren",

      title:
        "De vier voorkeursfuncties",

      sections: [
        {
          title:
            "Functievolgorde",

          items:
            cognitiveFunctionItems
        }
      ],

      fullWidth:
        true
    })
  );
}



/* Testspecificatie voor registratie door core/test-registry.js. */

const SIXTEEN_PERSONALITIES_TEST_DEFINITION = {
    id:
      "persoonlijkheid::16 Persoonlijkheden-test",

    domainId:
      "persoonlijkheid",

    domainTitle:
      "Persoonlijkheid",

    title:
      "16 Persoonlijkheden-test",

    description:
      "Deze test bevat 70 vragen en brengt vier persoonlijke voorkeurparen in kaart: energie, informatieverwerking, besluitvorming en levensstijl.",

    estimatedTime:
      "Ongeveer 10 tot 15 minuten",

    resultType:
      "preference-pairs",

    mainScoreHeading:
      "Persoonlijkheidstype",

    printReportSubtitle:
      "Persoonlijk voorkeursprofiel",

    getChoices:
      getSixteenPersonalitiesChoices,

    calculateResult:
      calculateSixteenPersonalitiesResult,

    renderResultDetails:
      renderSixteenPersonalityProfile,

    getAdditionalQuestions:
      createSixteenPersonalitiesTieBreakQuestions,

    evidence: {
      summary:
        "Deze vragenlijst brengt vier Jungiaanse voorkeurparen in kaart: Extraversie–Introversie, Waarneming–Intuïtie, Denken–Voelen en Structuur–Flexibiliteit. De combinatie van de vier sterkste voorkeuren vormt één van zestien mogelijke typecodes.",

      source:
        "Bron: Myers, I. B., & McCaulley, M. H. (1985). Manual: A Guide to the Development and Use of the Myers-Briggs Type Indicator. Palo Alto, CA: Consulting Psychologists Press (CPP). Context: Geschreven in samenwerking met psychologe Mary McCaulley. Dit boek geldt als het historische fundament waarin de zestien persoonlijkheidstypen en de vier voorkeursschalen E/I, S/N, T/F en J/P academisch werden uitgewerkt voor onder meer loopbaanbegeleiding en coaching.",

      disclaimer:
        "Het resultaat beschrijft relatieve voorkeuren en geen vaste eigenschappen, vaardigheden, diagnose of geschiktheidsoordeel. Een score dicht bij 50% wijst op een beperkt verschil tussen beide voorkeuren. Gebruik het profiel als vertrekpunt voor reflectie en niet als definitief label."
    },

    questions:
      mappedSixteenPersonalitiesQuestions
};


window.UNFOLD_TEST_DEFINITIONS =
  Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
    ? window.UNFOLD_TEST_DEFINITIONS
    : [];

window.UNFOLD_TEST_DEFINITIONS.push(
  SIXTEEN_PERSONALITIES_TEST_DEFINITION
);
