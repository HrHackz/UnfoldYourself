"use strict";

/*
  Unfold Yourself — DISC/IPIP-IPC-testmodule
  Afhankelijkheden: disc-questions.js, disc-results.js, core/test-utils.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

/* =========================================================
   DISC / IPIP-IPC — EXTERNE VRAGEN EN PROFIELTEKSTEN
========================================================= */

const DISC_METADATA =
  window.DISC_METADATA &&
  typeof window.DISC_METADATA ===
    "object"
    ? window.DISC_METADATA
    : {};

const DISC_SCALES =
  window.DISC_SCALES &&
  typeof window.DISC_SCALES ===
    "object"
    ? window.DISC_SCALES
    : {};

const DISC_CHOICES =
  Array.isArray(
    window.DISC_CHOICES
  )
    ? window.DISC_CHOICES
    : [];

const DISC_QUESTIONS =
  Array.isArray(
    window.DISC_QUESTIONS
  )
    ? window.DISC_QUESTIONS
    : [];

const DISC_RESULT_METADATA =
  window.DISC_RESULT_METADATA &&
  typeof window.DISC_RESULT_METADATA ===
    "object"
    ? window.DISC_RESULT_METADATA
    : {};

const DISC_OCTANT_PROFILES =
  window.DISC_OCTANT_PROFILES &&
  typeof window.DISC_OCTANT_PROFILES ===
    "object"
    ? window.DISC_OCTANT_PROFILES
    : {};

const DISC_STYLE_PROFILES =
  window.DISC_STYLE_PROFILES &&
  typeof window.DISC_STYLE_PROFILES ===
    "object"
    ? window.DISC_STYLE_PROFILES
    : {};

const DISC_BLEND_PROFILES =
  window.DISC_BLEND_PROFILES &&
  typeof window.DISC_BLEND_PROFILES ===
    "object"
    ? window.DISC_BLEND_PROFILES
    : {};

const DISC_INTERPRETATION_MODEL =
  window.DISC_INTERPRETATION_MODEL &&
  typeof window.DISC_INTERPRETATION_MODEL ===
    "object"
    ? window.DISC_INTERPRETATION_MODEL
    : {};


/* =========================================================
   DISC / IPIP-IPC — VRAGEN, ANTWOORDEN EN RESULTAATCONFIGURATIE
========================================================= */

function getDiscQuestionChoices() {
  return DISC_CHOICES.map(
    choice => {
      return {
        value:
          Number(
            choice.value
          ),

        marker:
          String(
            choice.marker ??
            choice.value
          ),

        label:
          String(
            choice.label || ""
          ),

        description:
          String(
            choice.description || ""
          )
      };
    }
  );
}


const mappedDiscQuestions =
  DISC_QUESTIONS
    .filter(question => {
      return Boolean(
        question?.id &&
        question?.text &&
        DISC_SCALES[
          question.scaleCode
        ]
      );
    })
    .map(question => {
      const scale =
        DISC_SCALES[
          question.scaleCode
        ];

      return {
        id:
          question.id,

        number:
          Number(
            question.number
          ),

        text:
          question.text,

        scaleCode:
          question.scaleCode,

        scaleItemNumber:
          Number(
            question.scaleItemNumber
          ),

        category:
          `Interpersoonlijke stijl · ${scale.dutchLabel}`
      };
    });


if (
  mappedDiscQuestions.length !== 32
) {
  console.warn(
    "DISC-controle: er werden " +
    mappedDiscQuestions.length +
    " vragen geladen in plaats van 32."
  );
}


const DISC_STYLE_DEFINITIONS = [
  {
    id: "D",
    code: "D",
    label: "Daadkracht",
    resultLabel:
      "Daadkracht (D)"
  },
  {
    id: "I",
    code: "I",
    label: "Invloed",
    resultLabel:
      "Invloed (I)"
  },
  {
    id: "S",
    code: "S",
    label: "Stabiliteit",
    resultLabel:
      "Stabiliteit (S)"
  },
  {
    id: "C",
    code: "C",
    label:
      "Zakelijke terughoudendheid",
    resultLabel:
      "Zakelijke terughoudendheid (C)"
  }
];


const DISC_RESULT_CARD_CONTENT = {
  D: {
    label:
      "Daadkracht (D)",

    description:
      "Directheid, zichtbare sturing, initiatief en kritische tegenspraak."
  },

  I: {
    label:
      "Invloed (I)",

    description:
      "Sociale expressie, relationele warmte, contact en zichtbare betrokkenheid."
  },

  S: {
    label:
      "Stabiliteit (S)",

    description:
      "Bescheidenheid, meegaandheid, ruimte geven en rekening houden met anderen."
  },

  C: {
    label:
      "Zakelijke terughoudendheid (C)",

    description:
      "Zelfstandigheid, privacy, emotionele afstand en gereserveerde deelname."
  }
};


const DISC_OCTANT_TO_STYLE =
  Object.fromEntries(
    Object.entries(
      DISC_INTERPRETATION_MODEL
        ?.styleAggregation ||
      {}
    )
      .flatMap(
        ([styleCode, value]) => {
          const octants =
            Array.isArray(
              value?.octants
            )
              ? value.octants
              : [];

          return octants.map(
            octantCode => {
              return [
                octantCode,
                styleCode
              ];
            }
          );
        }
      )
  );


function getDiscOctantInterpretation(
  facet
) {
  const profile =
    DISC_OCTANT_PROFILES[
      facet?.octantCode
    ];

  if (!profile) {
    return (
      "Voor deze onderliggende richting is nog geen afzonderlijke uitleg beschikbaar."
    );
  }

  if (
    Number(
      facet.score
    ) >= 60
  ) {
    return (
      `${profile.highScoreMeaning} ` +
      `Aandachtspunt: ${profile.watchouts[0]}`
    );
  }

  if (
    Number(
      facet.score
    ) <= 40
  ) {
    return (
      `${profile.lowerScoreMeaning} ` +
      "Dit betekent niet dat de tegenovergestelde stijl automatisch sterk aanwezig is."
    );
  }

  return (
    `${profile.shortDescription} ` +
    "Je score ligt dicht bij het midden van de gebruikte antwoordschaal."
  );
}


const DISC_FACET_CONFIG = {
  eyebrow:
    "Onderliggend circumplexprofiel",

  title:
    "Bekijk je acht interpersoonlijke richtingen",

  description:
    "De vier DISC-geïnspireerde samenvattingen zijn opgebouwd uit acht oorspronkelijke IPIP-IPC-richtingen. Deze deelscores laten zien waar je hoofdprofiel precies vandaan komt.",

  explanationTitle:
    "Hoe lees je deze scores?",

  explanation:
    "Iedere score is het omgerekende gemiddelde van vier uitspraken. De percentages zijn geen percentielen en vergelijken je niet met een bevolkingsnorm.",

  groupLabel:
    "DISC-samenvatting",

  domainDefinitions:
    DISC_STYLE_DEFINITIONS,

  getBandLabel:
    getScoreBandLabel,

  getInterpretation:
    getDiscOctantInterpretation
};


/* =========================================================
   TESTRESULTAAT BEREKENEN
========================================================= */

function calculateNormalizedPercentage(
  sum,
  count
) {
  if (!count) {
    return 0;
  }

  const minimumScore =
    count;

  const maximumScore =
    count * 5;

  const scoreRange =
    maximumScore -
    minimumScore;

  if (scoreRange === 0) {
    return 0;
  }

  const percentage =
    Math.round(
      (
        (
          sum -
          minimumScore
        ) /
        scoreRange
      ) * 100
    );

  return Math.max(
    0,
    Math.min(
      100,
      percentage
    )
  );
}


function calculateDiscResult({
  definition,
  session,
  testId
}) {
  if (!definition || !session) {
    return null;
  }

  const octantTotals = {};

  Object.keys(
    DISC_SCALES
  ).forEach(scaleCode => {
    octantTotals[
      scaleCode
    ] = {
      sum: 0,
      count: 0
    };
  });

  for (
    const question
    of definition.questions
  ) {
    const answer =
      session.answers?.[
        question.id
      ];

    if (
      typeof answer !== "number" ||
      answer < 1 ||
      answer > 5
    ) {
      return null;
    }

    const total =
      octantTotals[
        question.scaleCode
      ];

    if (!total) {
      return null;
    }

    total.sum += answer;
    total.count += 1;
  }

  const octantScores =
    Object.fromEntries(
      Object.entries(
        octantTotals
      )
        .map(
          ([scaleCode, total]) => {
            return [
              scaleCode,
              calculateNormalizedPercentage(
                total.sum,
                total.count
              )
            ];
          }
        )
    );

  const styleScores =
    DISC_STYLE_DEFINITIONS
      .map(style => {
        const octants =
          DISC_INTERPRETATION_MODEL
            ?.styleAggregation
            ?.[style.code]
            ?.octants || [];

        const validScores =
          octants
            .map(octantCode => {
              return octantScores[
                octantCode
              ];
            })
            .filter(score => {
              return (
                typeof score ===
                  "number"
              );
            });

        const score =
          validScores.length > 0
            ? Math.round(
                validScores.reduce(
                  (sum, value) => {
                    return sum + value;
                  },
                  0
                ) /
                validScores.length
              )
            : 0;

        return {
          id:
            style.id,

          code:
            style.code,

          label:
            style.label,

          score,

          octants
        };
      })
      .sort(
        (first, second) => {
          return (
            second.score -
            first.score
          );
        }
      );

  const highestScore =
    styleScores[0]?.score ?? 0;

  const lowestScore =
    styleScores[
      styleScores.length - 1
    ]?.score ?? 0;

  const styleSpread =
    highestScore -
    lowestScore;

  const isBalancedProfile =
    styleSpread <= 5;

  const primary =
    styleScores[0];

  const secondary =
    styleScores[1];

  const scoreDifference =
    Math.abs(
      primary.score -
      secondary.score
    );

  const proposedBlendCode =
    `${primary.code}${secondary.code}`;

  const blendProfile =
    !isBalancedProfile &&
    scoreDifference <= 12
      ? DISC_BLEND_PROFILES[
          proposedBlendCode
        ] || null
      : null;

  const isSplitProfile =
    !isBalancedProfile &&
    !blendProfile &&
    scoreDifference <= 2;

  const primaryProfile =
    DISC_STYLE_PROFILES[
      primary.code
    ] || null;

  const secondaryProfile =
    DISC_STYLE_PROFILES[
      secondary.code
    ] || null;

  const dimensions =
    DISC_STYLE_DEFINITIONS.map(
      style => {
        const styleResult =
          styleScores.find(
            item => {
              return (
                item.code ===
                style.code
              );
            }
          );

        const contributingOctants =
          styleResult?.octants
            ?.map(octantCode => {
              return (
                DISC_OCTANT_PROFILES[
                  octantCode
                ]?.title ||
                octantCode
              );
            })
            .join(" en ");

        return {
          id:
            style.id,

          code:
            style.code,

          label:
            style.resultLabel,

          score:
            styleResult?.score || 0,

          description:
            `Samenvatting van ${contributingOctants}.`
        };
      }
    );

  const facets =
    Object.keys(
      DISC_SCALES
    )
      .map(octantCode => {
        const profile =
          DISC_OCTANT_PROFILES[
            octantCode
          ];

        const styleCode =
          DISC_OCTANT_TO_STYLE[
            octantCode
          ];

        const styleOctants =
          DISC_INTERPRETATION_MODEL
            ?.styleAggregation
            ?.[styleCode]
            ?.octants || [];

        return {
          domainId:
            styleCode,

          domainLabel:
            DISC_STYLE_PROFILES[
              styleCode
            ]?.title ||
            styleCode,

          domainCode:
            styleCode,

          facet:
            Math.max(
              1,
              styleOctants.indexOf(
                octantCode
              ) + 1
            ),

          octantCode,

          label:
            profile?.title ||
            octantCode,

          score:
            octantScores[
              octantCode
            ]
        };
      });

  const topOctants =
    [...facets]
      .sort(
        (first, second) => {
          return (
            second.score -
            first.score
          );
        }
      )
      .slice(0, 2);

  if (isBalancedProfile) {
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
        "BALANS",

      mainLabel:
        "Evenwichtig interpersoonlijk profiel",

      primaryStyleCode:
        null,

      secondaryStyleCode:
        null,

      blendCode:
        null,

      isBalancedProfile:
        true,

      styleSpread,

      styleScores,

      octantScores,

      dimensions,

      facets,

      summary:
        "Je vier DISC-geïnspireerde samenvattingen liggen zeer dicht bij elkaar. Er komt daarom geen enkele hoofdstijl duidelijk bovenuit. Kijk vooral naar de acht onderliggende richtingen en naar verschillen tussen situaties.",

      strengths: [
        "Je antwoorden wijzen op flexibiliteit tussen meerdere interpersoonlijke benaderingen.",
        "Je lijkt gedrag relatief sterk aan de situatie te kunnen aanpassen.",
        "Geen enkele DISC-geïnspireerde samenvatting domineert je volledige resultaat."
      ],

      development: [
        "Een evenwichtig profiel kan ook betekenen dat je veel middenantwoorden gebruikte.",
        "Onderzoek in concrete situaties welk gedrag spontaan ontstaat en welk gedrag aangeleerd of aangepast is.",
        "Gebruik de acht onderliggende scores in plaats van jezelf toch in één letter te dwingen."
      ],

      meaning:
        `Je hoogste onderliggende richtingen zijn ${topOctants.map(item => item.label.toLowerCase()).join(" en ")}. De vier hoofdstijlen verschillen maximaal ${styleSpread} procentpunten.`,

      advice:
        "Vergelijk je gedrag in minstens twee contexten, bijvoorbeeld werk en privé. Noteer waar je meer sturend, verbindend, meegaand of terughoudend handelt.",

      discProfile: {
        primaryStyleCode:
          null,

        secondaryStyleCode:
          null,

        blendCode:
          null,

        topOctantCodes:
          topOctants.map(
            item => {
              return item.octantCode;
            }
          )
      }
    };
  }

  const resultTitle =
    blendProfile
      ? blendProfile.title
      : isSplitProfile
        ? `Gedeeld profiel: ${primary.label} en ${secondary.label}`
        : primaryProfile?.title ||
          primary.label;

  const resultCode =
    blendProfile
      ? blendProfile.code
      : isSplitProfile
        ? `${primary.code}/${secondary.code}`
        : primary.code;

  const resultSummary =
    blendProfile
      ? (
          `${blendProfile.summary} ` +
          `Je primaire score is ${primary.label.toLowerCase()} (${primary.score}%) en je tweede score is ${secondary.label.toLowerCase()} (${secondary.score}%).`
        )
      : isSplitProfile
        ? (
            `Je twee hoogste, niet-aangrenzende samenvattingen liggen vrijwel gelijk: ` +
            `${primary.label.toLowerCase()} (${primary.score}%) en ${secondary.label.toLowerCase()} (${secondary.score}%). ` +
            "Daarom wordt geen enkele letter als enige hoofdstijl aangewezen."
          )
        : (
            `${primaryProfile?.summary || ""} ` +
            `${secondary.label} is je tweede invloed met ${secondary.score}%.`
          ).trim();

  const strengths =
    blendProfile
      ? blendProfile.strengths
      : isSplitProfile
        ? [
            ...(primaryProfile?.strengths || []).slice(0, 3),
            ...(secondaryProfile?.strengths || []).slice(0, 3)
          ]
        : primaryProfile?.strengths || [];

  const development =
    blendProfile
      ? blendProfile.watchouts
      : isSplitProfile
        ? [
            ...(primaryProfile?.watchouts || []).slice(0, 3),
            ...(secondaryProfile?.watchouts || []).slice(0, 3)
          ]
        : primaryProfile?.watchouts || [];

  const meaning =
    blendProfile
      ? (
          `${blendProfile.communication} ` +
          `De onderliggende richtingen die het sterkst naar voren komen zijn ${topOctants.map(item => item.label.toLowerCase()).join(" en ")}.`
        )
      : isSplitProfile
        ? (
            `${primaryProfile?.communication || ""} ` +
            `${secondaryProfile?.communication || ""}`
          ).trim()
        : (
            `${primaryProfile?.communication || ""} ` +
            `${primaryProfile?.collaboration || ""}`
          ).trim();

  const advice =
    isSplitProfile
      ? [
          ...(primaryProfile?.growthAdvice || []).slice(0, 2),
          ...(secondaryProfile?.growthAdvice || []).slice(0, 2)
        ].join(" ")
      : primaryProfile?.growthAdvice
          ?.slice(0, 3)
          .join(" ") ||
        "Gebruik het resultaat als vertrekpunt voor reflectie en niet als vaststaand label.";

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
      resultCode,

    mainLabel:
      resultTitle,

    primaryStyleCode:
      primary.code,

    secondaryStyleCode:
      secondary.code,

    blendCode:
      blendProfile?.code ||
      null,

    isBalancedProfile:
      false,

    isSplitProfile,

    styleSpread,

    styleScores,

    octantScores,

    dimensions,

    facets,

    summary:
      resultSummary,

    strengths,

    development,

    meaning,

    advice,

    discProfile: {
      primaryStyleCode:
        primary.code,

      secondaryStyleCode:
        secondary.code,

      blendCode:
        blendProfile?.code ||
        null,

      isSplitProfile,

      topOctantCodes:
        topOctants.map(
          item => {
            return item.octantCode;
          }
        )
    }
  };
}


function renderDiscProfile(
  result
) {
  if (
    result?.resultType !==
      "disc-circumplex" ||
    !resultContentGrid
  ) {
    return;
  }

  const primaryCode =
    result.discProfile
      ?.primaryStyleCode;

  const secondaryCode =
    result.discProfile
      ?.secondaryStyleCode;

  const blendCode =
    result.discProfile
      ?.blendCode;

  const primaryProfile =
    primaryCode
      ? DISC_STYLE_PROFILES[
          primaryCode
        ]
      : null;

  const secondaryProfile =
    secondaryCode
      ? DISC_STYLE_PROFILES[
          secondaryCode
        ]
      : null;

  const blendProfile =
    blendCode
      ? DISC_BLEND_PROFILES[
          blendCode
        ]
      : null;

  const isSplitProfile =
    result.discProfile
      ?.isSplitProfile ===
        true;

  const topOctantCodes =
    Array.isArray(
      result.discProfile
        ?.topOctantCodes
    )
      ? result.discProfile
          .topOctantCodes
      : [];

  const topOctantProfiles =
    topOctantCodes
      .map(code => {
        return (
          DISC_OCTANT_PROFILES[
            code
          ] || null
        );
      })
      .filter(Boolean);

  if (
    result.isBalancedProfile
  ) {
    resultContentGrid.appendChild(
      createDynamicProfileCard({
        label:
          "Gebalanceerde uitkomst",

        title:
          "Geen enkele hoofdstijl domineert",

        summary:
          "De vier DISC-geïnspireerde samenvattingen liggen zeer dicht bij elkaar. Dat kan wijzen op situationele flexibiliteit, maar ook op veel antwoorden rond het midden van de schaal.",

        sections: [
          {
            title:
              "Sterkste onderliggende richtingen",

            items:
              topOctantProfiles.map(
                profile => {
                  return (
                    `${profile.title}: ${profile.shortDescription}`
                  );
                }
              )
          }
        ],

        fullWidth:
          true
      })
    );

    resultContentGrid.appendChild(
      createDynamicProfileCard({
        label:
          "Praktische reflectie",

        title:
          "Vergelijk verschillende situaties",

        summary:
          "Beschrijf afzonderlijk hoe je reageert wanneer je invloed hebt, wanneer spanning ontstaat, wanneer iemand steun nodig heeft en wanneer je met onbekenden samenwerkt. Dat levert meer betekenis op dan één geforceerde letter."
      })
    );

    return;
  }

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        blendProfile
          ? "Gecombineerd gedragsprofiel"
          : isSplitProfile
            ? "Gedeelde hoofdstijlen"
            : "Primaire gedragsstijl",

      title:
        blendProfile
          ? `${blendProfile.code} · ${blendProfile.title}`
          : isSplitProfile
            ? `${primaryCode}/${secondaryCode} · ${result.mainLabel}`
            : `${primaryCode} · ${primaryProfile?.title || "Gedragsstijl"}`,

      summary:
        blendProfile
          ?.summary ||
        (
          isSplitProfile
            ? result.summary
            : primaryProfile
                ?.summary
        ),

      sections: [
        {
          title:
            "Sterktes",

          items:
            blendProfile
              ?.strengths ||
            (
              isSplitProfile
                ? result.strengths
                : primaryProfile
                    ?.strengths
            )
        },
        {
          title:
            "Aandachtspunten",

          items:
            blendProfile
              ?.watchouts ||
            (
              isSplitProfile
                ? result.development
                : primaryProfile
                    ?.watchouts
            )
        }
      ],

      fullWidth:
        true
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        "Communicatie en samenwerking",

      title:
        "Hoe je waarschijnlijk contact en invloed vormgeeft",

      summary:
        blendProfile
          ?.communication ||
        primaryProfile
          ?.communication,

      sections: [
        {
          title:
            "Samenwerking",

          items:
            primaryProfile
              ?.collaboration
              ? [
                  primaryProfile
                    .collaboration
                ]
              : []
        },
        {
          title:
            "Secundaire invloed",

          items:
            secondaryProfile
              ? [
                  `${secondaryCode} · ${secondaryProfile.title}: ${secondaryProfile.summary}`
                ]
              : []
        }
      ]
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        "Motivatie en spanning",

      title:
        "Wat energie kan geven of kosten",

      sections: [
        {
          title:
            "Mogelijke motivatoren",

          items:
            primaryProfile
              ?.motivators
        },
        {
          title:
            "Mogelijke stressoren",

          items:
            primaryProfile
              ?.stressors
        }
      ]
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        "Onderliggende richtingen",

      title:
        "Je twee hoogste IPIP-IPC-richtingen",

      sections: [
        {
          title:
            "Sterkste richtingen",

          items:
            topOctantProfiles.map(
              profile => {
                return (
                  `${profile.title}: ${profile.highScoreMeaning}`
                );
              }
            )
        },
        {
          title:
            "Gedrag onder druk",

          items:
            topOctantProfiles.map(
              profile => {
                return (
                  `${profile.title}: ${profile.stressResponse}`
                );
              }
            )
        }
      ],

      fullWidth:
        true
    })
  );

  resultContentGrid.appendChild(
    createDynamicProfileCard({
      label:
        "Ontwikkeling",

      title:
        "Concrete groeistappen",

      sections: [
        {
          title:
            "Ontwikkeladvies",

          items:
            primaryProfile
              ?.growthAdvice
        }
      ]
    })
  );

  if (
    primaryCode === "C" ||
    secondaryCode === "C"
  ) {
    resultContentGrid.appendChild(
      createDynamicProfileCard({
        label:
          "Belangrijke interpretatienoot",

        title:
          "Wat C in deze test betekent",

        summary:
          DISC_STYLE_PROFILES
            ?.C
            ?.namingNote ||
          "De C-score beschrijft in deze test interpersoonlijke terughoudendheid en niet algemene nauwkeurigheid of werkdiscipline.",

        fullWidth:
          true
      })
    );
  }
}



/* Testspecificatie voor registratie door core/test-registry.js. */

const DISC_TEST_DEFINITION = {
    id:
      "persoonlijkheid::DISC-gedragsstijltest",

    domainId:
      "persoonlijkheid",

    domainTitle:
      "Persoonlijkheid",

    title:
      "DISC-gedragsstijltest",

    description:
      "Deze compacte test bevat 32 uitspraken en meet acht interpersoonlijke richtingen uit de IPIP-IPC. De resultaten worden daarna transparant samengevat in D, I, S en C.",

    estimatedTime:
      "Ongeveer 5 tot 7 minuten",

    resultType:
      "disc-circumplex",

    mainScoreHeading:
      "Gedragsstijl",

    printReportSubtitle:
      "Interpersoonlijk gedragsstijlprofiel",

    getChoices:
      getDiscQuestionChoices,

    calculateResult:
      calculateDiscResult,

    renderResultDetails:
      renderDiscProfile,

    resultCardContent:
      DISC_RESULT_CARD_CONTENT,

    facetConfig:
      DISC_FACET_CONFIG,

    evidence: {
      summary:
        "De primaire meetlaag is de 32-item IPIP-IPC van Markey en Markey. Deze vragenlijst meet acht richtingen van het interpersoonlijke circumplex. Unfold Yourself groepeert die acht scores daarna in vier toegankelijke DISC-geïnspireerde samenvattingen.",

      source:
        "Historische achtergrond: Marston, W. M. (1928), Emotions of Normal People. Circumplexmodel: Leary, T. (1957), Interpersonal Diagnosis of Personality; Wiggins, J. S. (1979), A psychological taxonomy of trait-descriptive terms: The interpersonal domain, Journal of Personality and Social Psychology, 37(3), 395–412. Vragenlijst: Markey, P. M., & Markey, C. N. (2009), A brief assessment of the interpersonal circumplex: The IPIP-IPC, Assessment, 16(4), 352–361. Item- en scoringsbron: International Personality Item Pool, Oregon Research Institute.",

      disclaimer:
        "De oorspronkelijke Engelstalige IPIP-IPC is psychometrisch onderzocht. Deze Nederlandstalige bewerking heeft nog geen eigen normgroep of onafhankelijke validatiestudie. De D-, I-, S- en C-weergave is een interpretatielaag van Unfold Yourself en geen officiële of gelicentieerde Everything DiSC-meting. De percentages zijn eigen omgerekende scores, geen percentielen, diagnose of geschiktheidsoordeel."
    },

    dimensions:
      DISC_STYLE_DEFINITIONS.map(
        style => {
          return {
            id:
              style.id,

            label:
              style.label,

            code:
              style.code
          };
        }
      ),

    questions:
      mappedDiscQuestions
};


window.UNFOLD_TEST_DEFINITIONS =
  Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
    ? window.UNFOLD_TEST_DEFINITIONS
    : [];

window.UNFOLD_TEST_DEFINITIONS.push(
  DISC_TEST_DEFINITION
);
