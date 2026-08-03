"use strict";

window.COGNITIVE_BATTERY_MODULES = window.COGNITIVE_BATTERY_MODULES || {};
window.COGNITIVE_BATTERY_MODULES.verbal = Object.freeze({
  id: "verbal",
  title: "Verbaal redeneren",
  shortTitle: "Verbaal",
  description: "Begripsrelaties, syllogismen, verbale regels en ordening.",
  estimatedTime: "Ongeveer 15 minuten",
  blockId: "block-1",
  order: 2,
  availability: "available",
  statusLabel: "Beschikbaar",
  itemStatus: "operational",
  operationalItemCount: 15,
  reserveItemCount: 9,
  scoringVersion: 1,
  instruction:
    "Beoordeel alleen wat uit de gegeven woorden of uitspraken volgt. Gebruik geen extra aannames of eigen voorkennis.",
  purpose: [
    "Relaties tussen begrippen en analogieën herkennen",
    "Syllogistische conclusies zorgvuldig beoordelen",
    "Verbale regels en volgordes correct toepassen"
  ],
  boundaries:
    "Deze module meet geen spelling, obscure woordenschat, algemene feitenkennis of argumentkwaliteit.",
  subtypes: [
    {
      id: "analogies",
      label: "Begripsrelaties en analogieën",
      description: "Dezelfde relatie herkennen tussen verschillende begrippen."
    },
    {
      id: "syllogisms",
      label: "Syllogistisch redeneren",
      description: "Bepalen welke conclusie zeker uit algemene en bijzondere uitspraken volgt."
    },
    {
      id: "rules",
      label: "Verbale regels en ordening",
      description: "Voorwaardelijke regels en volgorde-informatie correct combineren."
    }
  ],
  exercises: [
    {
      id: "VP01",
      text: "Pen staat tot schrijven zoals schaar staat tot …",
      stimulus: null,
      choices: [
        { value: "paper", label: "papier" },
        { value: "cutting", label: "knippen" },
        { value: "drawing", label: "tekenen" },
        { value: "measuring", label: "meten" }
      ],
      correctAnswer: "cutting",
      explanation: "Een pen wordt gebruikt om te schrijven; een schaar wordt gebruikt om te knippen."
    },
    {
      id: "VP02",
      text: "Puppy staat tot hond zoals kitten staat tot …",
      stimulus: null,
      choices: [
        { value: "cat", label: "kat" },
        { value: "mouse", label: "muis" },
        { value: "rabbit", label: "konijn" },
        { value: "bird", label: "vogel" }
      ],
      correctAnswer: "cat",
      explanation: "Een puppy is een jonge hond; een kitten is een jonge kat."
    }
  ],
  items: [
    {
      id: "V01",
      difficulty: "easy",
      subtypeId: "analogies",
      category: "Analogie",
      text: "Handschoen staat tot hand zoals schoen staat tot …",
      stimulus: null,
      choices: [
        { value: "leg", label: "been" },
        { value: "foot", label: "voet" },
        { value: "toe", label: "teen" },
        { value: "sole", label: "zool" }
      ],
      correctAnswer: "foot"
    },
    {
      id: "V02",
      difficulty: "easy",
      subtypeId: "analogies",
      category: "Analogie",
      text: "Thermometer staat tot temperatuur zoals klok staat tot …",
      stimulus: null,
      choices: [
        { value: "time", label: "tijd" },
        { value: "speed", label: "snelheid" },
        { value: "distance", label: "afstand" },
        { value: "direction", label: "richting" }
      ],
      correctAnswer: "time"
    },
    {
      id: "V05",
      difficulty: "easy",
      subtypeId: "syllogisms",
      category: "Syllogisme",
      text: "Welke conclusie volgt zeker?",
      stimulus: {
        type: "statements",
        lines: [
          "Alle verpleegkundigen zijn werknemers.",
          "Geen enkele werknemer in deze organisatie is vrijwilliger."
        ]
      },
      choices: [
        { value: "all-volunteers-nurses", label: "Alle vrijwilligers zijn verpleegkundigen" },
        { value: "some-workers-nurses", label: "Sommige werknemers zijn verpleegkundigen" },
        { value: "some-nurses-volunteers", label: "Sommige verpleegkundigen zijn vrijwilligers" },
        { value: "no-nurses-volunteers", label: "Geen enkele verpleegkundige is vrijwilliger" }
      ],
      correctAnswer: "no-nurses-volunteers"
    },
    {
      id: "V06",
      difficulty: "easy",
      subtypeId: "rules",
      category: "Voorwaardelijke regel",
      text: "Welke conclusie volgt zeker?",
      stimulus: {
        type: "statements",
        lines: [
          "Als een dossier is goedgekeurd, wordt het gearchiveerd.",
          "Dossier X is goedgekeurd."
        ]
      },
      choices: [
        { value: "rejected", label: "Dossier X wordt afgewezen" },
        { value: "all-archived-approved", label: "Alle gearchiveerde dossiers zijn goedgekeurd" },
        { value: "archived", label: "Dossier X wordt gearchiveerd" },
        { value: "reviewed", label: "Dossier X wordt opnieuw beoordeeld" }
      ],
      correctAnswer: "archived"
    },
    {
      id: "V07",
      difficulty: "easy",
      subtypeId: "rules",
      category: "Verbale ordening",
      text: "Wie arriveert als laatste?",
      stimulus: {
        type: "statements",
        lines: ["Lia arriveert eerder dan Omar.", "Omar arriveert eerder dan Noor."]
      },
      choices: [
        { value: "Noor", label: "Noor" },
        { value: "Lia", label: "Lia" },
        { value: "Omar", label: "Omar" },
        { value: "unknown", label: "Niet te bepalen" }
      ],
      correctAnswer: "Noor"
    },
    {
      id: "V09",
      difficulty: "medium",
      subtypeId: "analogies",
      category: "Analogie",
      text: "Sleutel staat tot slot zoals wachtwoord staat tot …",
      stimulus: null,
      choices: [
        { value: "message", label: "bericht" },
        { value: "keyboard", label: "toetsenbord" },
        { value: "account", label: "account" },
        { value: "user", label: "gebruiker" }
      ],
      correctAnswer: "account"
    },
    {
      id: "V12",
      difficulty: "medium",
      subtypeId: "syllogisms",
      category: "Syllogisme",
      text: "Welke conclusie volgt zeker?",
      stimulus: {
        type: "statements",
        lines: ["Alle planners zijn georganiseerd.", "Sommige planners zijn trainers."]
      },
      choices: [
        { value: "all-trainers-organized", label: "Alle trainers zijn georganiseerd" },
        { value: "no-trainers-organized", label: "Geen enkele trainer is georganiseerd" },
        { value: "some-organized-not-planners", label: "Sommige georganiseerde mensen zijn geen planners" },
        { value: "some-trainers-organized", label: "Sommige trainers zijn georganiseerd" }
      ],
      correctAnswer: "some-trainers-organized"
    },
    {
      id: "V13",
      difficulty: "medium",
      subtypeId: "syllogisms",
      category: "Syllogisme",
      text: "Welke conclusie volgt zeker?",
      stimulus: {
        type: "statements",
        lines: ["Geen enkele chauffeur is piloot.", "Sommige piloten zijn leraren."]
      },
      choices: [
        { value: "no-teachers-drivers", label: "Geen enkele leraar is chauffeur" },
        { value: "some-teachers-not-drivers", label: "Sommige leraren zijn geen chauffeur" },
        { value: "some-drivers-teachers", label: "Sommige chauffeurs zijn leraren" },
        { value: "all-pilots-teachers", label: "Alle piloten zijn leraren" }
      ],
      correctAnswer: "some-teachers-not-drivers"
    },
    {
      id: "V15",
      difficulty: "medium",
      subtypeId: "rules",
      category: "Verbale ordening",
      text: "Wie staat als tweede?",
      stimulus: {
        type: "statements",
        lines: [
          "Tessa komt vóór Karim.",
          "Karim komt vóór Lotte.",
          "Mira komt na Lotte."
        ]
      },
      choices: [
        { value: "Karim", label: "Karim" },
        { value: "Tessa", label: "Tessa" },
        { value: "Lotte", label: "Lotte" },
        { value: "Mira", label: "Mira" }
      ],
      correctAnswer: "Karim"
    },
    {
      id: "V16",
      difficulty: "medium",
      subtypeId: "rules",
      category: "Voorwaardelijke regels",
      text: "Welke conclusie volgt zeker?",
      stimulus: {
        type: "statements",
        lines: [
          "Iedere rode map heeft een etiket.",
          "Geen enkele map met een etiket is vergrendeld.",
          "Map X is rood."
        ]
      },
      choices: [
        { value: "locked", label: "Map X is vergrendeld" },
        { value: "no-label", label: "Map X heeft geen etiket" },
        { value: "not-locked", label: "Map X is niet vergrendeld" },
        { value: "confidential", label: "Map X bevat vertrouwelijke documenten" }
      ],
      correctAnswer: "not-locked"
    },
    {
      id: "V17",
      difficulty: "hard",
      subtypeId: "analogies",
      category: "Analogie",
      text: "Diagnose staat tot behandeling zoals analyse staat tot …",
      stimulus: null,
      choices: [
        { value: "information", label: "informatie" },
        { value: "problem", label: "probleem" },
        { value: "research", label: "onderzoek" },
        { value: "decision", label: "beslissing" }
      ],
      correctAnswer: "decision"
    },
    {
      id: "V19",
      difficulty: "hard",
      subtypeId: "syllogisms",
      category: "Syllogisme",
      text: "Welke conclusie volgt zeker?",
      stimulus: {
        type: "statements",
        lines: [
          "Alle consultants zijn adviseurs.",
          "Geen enkele adviseur is operator.",
          "Sommige managers zijn operator."
        ]
      },
      choices: [
        { value: "no-managers-consultants", label: "Geen enkele manager is consultant" },
        { value: "all-operators-managers", label: "Alle operators zijn managers" },
        { value: "some-advisers-managers", label: "Sommige adviseurs zijn managers" },
        { value: "some-managers-not-consultants", label: "Sommige managers zijn geen consultant" }
      ],
      correctAnswer: "some-managers-not-consultants"
    },
    {
      id: "V20",
      difficulty: "hard",
      subtypeId: "syllogisms",
      category: "Syllogisme",
      text: "Welke conclusie volgt zeker?",
      stimulus: {
        type: "statements",
        lines: [
          "Sommige onderzoekers zijn schrijvers.",
          "Alle schrijvers zijn redacteurs.",
          "Geen enkele redacteur is manager."
        ]
      },
      choices: [
        { value: "all-researchers-editors", label: "Alle onderzoekers zijn redacteurs" },
        { value: "some-researchers-not-managers", label: "Sommige onderzoekers zijn geen manager" },
        { value: "no-researchers-managers", label: "Geen enkele onderzoeker is manager" },
        { value: "some-managers-writers", label: "Sommige managers zijn schrijver" }
      ],
      correctAnswer: "some-researchers-not-managers"
    },
    {
      id: "V21",
      difficulty: "hard",
      subtypeId: "rules",
      category: "Voorwaardelijke regels",
      text: "Welke conclusie volgt zeker?",
      stimulus: {
        type: "statements",
        lines: [
          "Als het rapport volledig is, wordt het ondertekend.",
          "Een rapport wordt alleen ondertekend als de directeur aanwezig is.",
          "De directeur is niet aanwezig."
        ]
      },
      choices: [
        { value: "complete", label: "Het rapport is volledig" },
        { value: "not-complete", label: "Het rapport is niet volledig" },
        { value: "signed", label: "Het rapport wordt ondertekend" },
        { value: "errors", label: "Het rapport bevat fouten" }
      ],
      correctAnswer: "not-complete"
    },
    {
      id: "V24",
      difficulty: "hard",
      subtypeId: "rules",
      category: "Voorwaardelijke regels",
      text: "Wie controleerde rapport X?",
      stimulus: {
        type: "statements",
        lines: [
          "Ieder rapport wordt gecontroleerd door Lina of door Mo, maar nooit door beiden.",
          "Rapporten die Lina controleert, worden dezelfde dag verzonden.",
          "Rapport X is niet dezelfde dag verzonden."
        ]
      },
      choices: [
        { value: "Mo", label: "Mo" },
        { value: "Lina", label: "Lina" },
        { value: "both", label: "Lina en Mo" },
        { value: "unknown", label: "Niet te bepalen" }
      ],
      correctAnswer: "Mo"
    }
  ]
});
