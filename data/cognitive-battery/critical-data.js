"use strict";

window.COGNITIVE_BATTERY_MODULES = window.COGNITIVE_BATTERY_MODULES || {};
window.COGNITIVE_BATTERY_MODULES.criticalData = Object.freeze({
  id: "criticalData",
  title: "Kritisch denken en data-interpretatie",
  shortTitle: "Kritisch denken en data",
  description: "Korte vragen over conclusies, aannames, bewijs, percentages en grafieken.",
  estimatedTime: "Ongeveer 8–10 minuten",
  blockId: "block-3",
  order: 6,
  availability: "available",
  statusLabel: "Beschikbaar",
  itemStatus: "operational",
  operationalItemCount: 12,
  reserveItemCount: 0,
  scoringVersion: 3,
  itemBankVersion: 3,
  instruction:
    "Gebruik alleen de informatie op het scherm. Kies het antwoord dat rechtstreeks uit de gegevens volgt.",
  purpose: [
    "Conclusies en aannames herkennen",
    "Sterk en zwak bewijs onderscheiden",
    "Percentages, tabellen en grafieken correct lezen"
  ],
  boundaries:
    "De moeilijkheid zit in het redeneren, niet in lange teksten of ingewikkelde formuleringen. De module is geen kennistoets en geen IQ-test.",
  subtypes: [
    {
      id: "critical",
      label: "Kritisch denken",
      description: "Conclusies, aannames, verbanden en bewijs beoordelen."
    },
    {
      id: "data",
      label: "Data-interpretatie",
      description: "Percentages, vergelijkingen, tabellen en grafieken correct lezen."
    }
  ],
  exercises: [
    {
      id: "KP01",
      text: "Wat weten we zeker?",
      stimulus: {
        type: "statements",
        lines: ["Een team rondde 8 van 10 taken af."]
      },
      choices: [
        { value: "eight", label: "Acht taken zijn afgerond." },
        { value: "faster", label: "Het team werkte sneller." },
        { value: "easy", label: "De taken waren eenvoudig." },
        { value: "all", label: "Alle taken zijn afgerond." }
      ],
      correctAnswer: "eight",
      explanation: "Alleen het aantal afgeronde taken is gegeven."
    },
    {
      id: "KP02",
      text: "Wat volgt uit de informatie?",
      stimulus: {
        type: "statements",
        lines: ["Mensen met een agenda missen gemiddeld minder afspraken."]
      },
      choices: [
        { value: "cause", label: "Een agenda voorkomt gemiste afspraken." },
        { value: "link", label: "Er is een verband." },
        { value: "only", label: "Alleen agenda’s helpen." },
        { value: "everyone", label: "Iedereen heeft een agenda nodig." }
      ],
      correctAnswer: "link",
      explanation: "De informatie toont een verband, maar geen bewezen oorzaak."
    }
  ],
  items: [
    {
      id: "K01",
      difficulty: "easy",
      subtypeId: "critical",
      category: "Conclusie",
      text: "Wat weten we zeker?",
      stimulus: {
        type: "statements",
        lines: ["Tijdens een proef daalt het aantal fouten van 20 naar 12."]
      },
      choices: [
        { value: "fewer", label: "Tijdens de proef waren er minder fouten." },
        { value: "caused", label: "Het systeem veroorzaakte de daling." },
        { value: "every", label: "Het systeem werkt in elk team." },
        { value: "faster", label: "Het team werkte sneller." }
      ],
      correctAnswer: "fewer"
    },
    {
      id: "K02",
      difficulty: "easy",
      subtypeId: "critical",
      category: "Aanname",
      text: "Wat moet daarvoor waar zijn?",
      stimulus: {
        type: "statements",
        lines: ["Een manager wil de weekmeeting schrappen omdat alle updates in een dashboard staan."]
      },
      choices: [
        { value: "cost", label: "De meeting kost veel geld." },
        { value: "views", label: "Iedereen bekijkt het dashboard." },
        { value: "new", label: "Het dashboard is pas vernieuwd." },
        { value: "home", label: "Het team werkt vaak thuis." }
      ],
      correctAnswer: "views"
    },
    {
      id: "K03",
      difficulty: "easy",
      subtypeId: "critical",
      category: "Verband",
      text: "Wat volgt hieruit?",
      stimulus: {
        type: "statements",
        lines: ["Mensen die vaker sporten, melden gemiddeld minder stress."]
      },
      choices: [
        { value: "prevents", label: "Sport voorkomt stress." },
        { value: "blocks", label: "Stress verhindert sporten." },
        { value: "link", label: "Er is een verband." },
        { value: "must", label: "Iedereen moet meer sporten." }
      ],
      correctAnswer: "link"
    },
    {
      id: "K04",
      difficulty: "medium",
      subtypeId: "critical",
      category: "Bewijs",
      text: "Welke aanpak geeft het sterkste bewijs?",
      stimulus: {
        type: "statements",
        lines: ["Een bedrijf wil weten of een reminder-app te late betalingen vermindert."]
      },
      choices: [
        { value: "interview", label: "Gebruikers achteraf interviewen." },
        { value: "before", label: "Eén maand vóór en na vergelijken." },
        { value: "opinions", label: "Online klantmeningen verzamelen." },
        { value: "groups", label: "Vergelijkbare groepen apart testen." }
      ],
      correctAnswer: "groups"
    },
    {
      id: "K05",
      difficulty: "easy",
      subtypeId: "critical",
      category: "Andere verklaring",
      text: "Wat kan de stijging eveneens verklaren?",
      stimulus: {
        type: "statements",
        lines: ["Na een prijsverlaging stijgt de verkoop. In dezelfde week begint ook de soldenperiode."]
      },
      choices: [
        { value: "sale", label: "De soldenperiode." },
        { value: "colour", label: "De kleur van het product." },
        { value: "font", label: "Het lettertype van de website." },
        { value: "date", label: "De datum op de factuur." }
      ],
      correctAnswer: "sale"
    },
    {
      id: "K06",
      difficulty: "medium",
      subtypeId: "critical",
      category: "Begrensde conclusie",
      text: "Welke conclusie is verantwoord?",
      stimulus: {
        type: "statements",
        lines: ["Dertig vrijwilligers testen een cursus. Daarvan zijn er 27 tevreden."]
      },
      choices: [
        { value: "everyone", label: "De cursus werkt voor iedereen." },
        { value: "volunteers", label: "Van de vrijwilligers waren er 27 tevreden." },
        { value: "all-users", label: "90% van alle gebruikers is tevreden." },
        { value: "learned", label: "De vrijwilligers leerden meer dan anderen." }
      ],
      correctAnswer: "volunteers"
    },
    {
      id: "K07",
      difficulty: "medium",
      subtypeId: "data",
      category: "Conversie",
      text: "Welk kanaal heeft het hoogste aandeel aangenomen kandidaten?",
      stimulus: {
        type: "table",
        caption: "Kandidaten en aangenomen kandidaten per kanaal",
        headers: ["Kanaal", "Kandidaten", "Aangenomen"],
        rows: [
          ["A", "40", "10"],
          ["B", "100", "20"],
          ["C", "20", "6"]
        ]
      },
      choices: [
        { value: "A", label: "Kanaal A" },
        { value: "B", label: "Kanaal B" },
        { value: "C", label: "Kanaal C" },
        { value: "equal", label: "Allemaal gelijk" }
      ],
      correctAnswer: "C"
    },
    {
      id: "K08",
      difficulty: "easy",
      subtypeId: "data",
      category: "Percentage",
      text: "Wat is correct?",
      stimulus: {
        type: "table",
        caption: "Bestellingen en klachten per maand",
        headers: ["Maand", "Bestellingen", "Klachten"],
        rows: [
          ["Januari", "100", "10"],
          ["Februari", "150", "15"],
          ["Maart", "200", "20"]
        ]
      },
      choices: [
        { value: "down", label: "Het klachtenpercentage daalt." },
        { value: "up", label: "Het klachtenpercentage stijgt." },
        { value: "changes", label: "Het percentage verandert iedere maand." },
        { value: "same", label: "Het percentage blijft 10%." }
      ],
      correctAnswer: "same"
    },
    {
      id: "K09",
      difficulty: "medium",
      subtypeId: "data",
      category: "Aandeel",
      text: "Welk team heeft het hoogste aandeel afwezige medewerkers?",
      stimulus: {
        type: "table",
        caption: "Medewerkers en afwezigheden per team",
        headers: ["Team", "Medewerkers", "Afwezig"],
        rows: [
          ["A", "10", "3"],
          ["B", "40", "8"],
          ["C", "30", "6"]
        ]
      },
      choices: [
        { value: "A", label: "Team A" },
        { value: "B", label: "Team B" },
        { value: "C", label: "Team C" },
        { value: "equal", label: "Allemaal gelijk" }
      ],
      correctAnswer: "A"
    },
    {
      id: "K10",
      difficulty: "easy",
      subtypeId: "data",
      category: "Patroon",
      text: "Welke uitspraak klopt?",
      stimulus: {
        type: "table",
        caption: "Downloads per maand",
        headers: ["Maand", "Downloads"],
        rows: [
          ["Januari", "100"],
          ["Februari", "130"],
          ["Maart", "110"],
          ["April", "150"]
        ]
      },
      choices: [
        { value: "down", label: "Het aantal daalt iedere maand." },
        { value: "april", label: "April heeft de meeste downloads." },
        { value: "march", label: "Maart ligt hoger dan februari." },
        { value: "always", label: "Het aantal stijgt zonder onderbreking." }
      ],
      correctAnswer: "april"
    },
    {
      id: "K11",
      difficulty: "hard",
      subtypeId: "data",
      category: "Vergelijking per groep",
      text: "Welk programma heeft binnen beide groepen het hoogste succespercentage?",
      stimulus: {
        type: "table",
        caption: "Succes per programma en dossiertype",
        headers: ["Dossiers", "Programma A", "Programma B"],
        rows: [
          ["Gemakkelijk", "90 van 100", "19 van 20"],
          ["Moeilijk", "8 van 20", "36 van 80"]
        ]
      },
      choices: [
        { value: "A", label: "Programma A" },
        { value: "mixed", label: "A gemakkelijk, B moeilijk" },
        { value: "B", label: "Programma B" },
        { value: "equal", label: "Beide scoren gelijk" }
      ],
      correctAnswer: "B"
    },
    {
      id: "K12",
      difficulty: "medium",
      subtypeId: "data",
      category: "Grafiek",
      text: "Waarom kan de grafiek misleidend zijn?",
      stimulus: {
        type: "bar-chart",
        title: "Teamscore",
        yAxisLabel: "Punten",
        min: 94,
        max: 100,
        ticks: [94, 96, 98, 100],
        values: [
          { label: "Team A", value: 96 },
          { label: "Team B", value: 98 }
        ],
        caption: "Score per team.",
        description: "Staafgrafiek met Team A op 96 punten en Team B op 98 punten. De verticale as loopt van 94 tot 100."
      },
      choices: [
        { value: "names", label: "De teams hebben geen naam." },
        { value: "unit", label: "De eenheid ontbreekt." },
        { value: "wrong", label: "De getoonde cijfers zijn fout." },
        { value: "scale", label: "Het verschil lijkt groter dan het is." }
      ],
      correctAnswer: "scale"
    }
  ]
});
