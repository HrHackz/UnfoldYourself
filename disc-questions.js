"use strict";

/*
  Unfold Yourself — DISC-gedragsstijltest

  Wetenschappelijke vragenbasis:
  Markey & Markey (2009), IPIP-IPC, 32 items.

  Belangrijk:
  - De IPIP-IPC meet acht interpersoonlijke circumplexrichtingen.
  - De oorspronkelijke IPIP-items zijn publiek domein.
  - De Nederlandstalige bewerking is nog niet afzonderlijk
    gevalideerd of genormeerd.
  - Een latere DISC-weergave is een interpretatielaag van
    Unfold Yourself en geen officiële Everything DiSC-meting.
*/

window.DISC_METADATA = {
  "id": "disc-ipip-ipc-32-nl",
  "title": "DISC-gedragsstijltest",
  "scientificInstrument": "IPIP-IPC",
  "itemCount": 32,
  "scaleCount": 8,
  "itemsPerScale": 4,
  "responseScale": {
    "minimum": 1,
    "maximum": 5,
    "allItemsPlusKeyed": true
  },
  "instructions": "Beoordeel hoe herkenbaar iedere uitspraak voor je is. Antwoord vanuit hoe je je doorgaans gedraagt in contact en samenwerking met anderen, niet vanuit hoe je graag zou willen zijn.",
  "scoringNote": "De acht oorspronkelijke IPIP-IPC-schaalscores worden berekend als de som of het gemiddelde van de vier items binnen iedere schaal. Er zijn geen omgekeerd gescoorde items.",
  "positioning": "De IPIP-IPC meet acht richtingen van het interpersoonlijke circumplex. Een latere weergave met DISC-letters is een transparante interpretatielaag van Unfold Yourself en is niet hetzelfde als een officiële of gelicentieerde Everything DiSC-meting.",
  "sources": [
    {
      "role": "historical-background",
      "citation": "Marston, W. M. (1928). Emotions of Normal People."
    },
    {
      "role": "interpersonal-circumplex",
      "citation": "Leary, T. (1957). Interpersonal Diagnosis of Personality."
    },
    {
      "role": "interpersonal-circumplex",
      "citation": "Wiggins, J. S. (1979). A psychological taxonomy of trait-descriptive terms: The interpersonal domain. Journal of Personality and Social Psychology, 37(3), 395–412."
    },
    {
      "role": "instrument-development-and-validation",
      "citation": "Markey, P. M., & Markey, C. N. (2009). A brief assessment of the interpersonal circumplex: The IPIP-IPC. Assessment, 16(4), 352–361. https://doi.org/10.1177/1073191109340382"
    },
    {
      "role": "official-item-and-scoring-source",
      "citation": "International Personality Item Pool (IPIP), Oregon Research Institute."
    }
  ],
  "license": "De oorspronkelijke IPIP-items en -schalen zijn publiek domein. De Nederlandstalige formuleringen in dit bestand zijn een inhoudsgetrouwe bewerking.",
  "limitations": "De oorspronkelijke Engelstalige IPIP-IPC is psychometrisch onderzocht. Deze Nederlandstalige bewerking heeft nog geen eigen Nederlandstalige normgroep of onafhankelijke validatiestudie. Resultaten zijn daarom beschrijvende zelfrapportagescores, geen percentielen, diagnoses of geschiktheidsoordelen."
};

window.DISC_SCALES = {
  "PA": {
    "code": "PA",
    "originalLabel": "Assured-Dominant",
    "dutchLabel": "Zelfverzekerd en sturend",
    "angleDegrees": 90,
    "summary": "Neiging om zichtbaar richting te geven, ruimte in te nemen en invloed uit te oefenen."
  },
  "BC": {
    "code": "BC",
    "originalLabel": "Arrogant-Calculating",
    "dutchLabel": "Confronterend en kritisch",
    "angleDegrees": 135,
    "summary": "Neiging om stevig tegen te spreken, scherp te reageren en weinig terughoudend te zijn in confrontaties."
  },
  "DE": {
    "code": "DE",
    "originalLabel": "Cold-Hearted",
    "dutchLabel": "Afstandelijk en zakelijk",
    "angleDegrees": 180,
    "summary": "Neiging om emotionele afstand te bewaren en zelfstandigheid zwaarder te laten wegen dan zorg voor anderen."
  },
  "FG": {
    "code": "FG",
    "originalLabel": "Aloof-Introverted",
    "dutchLabel": "Gereserveerd en terughoudend",
    "angleDegrees": 225,
    "summary": "Neiging om sociaal op de achtergrond te blijven en persoonlijke informatie beperkt te delen."
  },
  "HI": {
    "code": "HI",
    "originalLabel": "Unassured-Submissive",
    "dutchLabel": "Bescheiden en volgend",
    "angleDegrees": 270,
    "summary": "Neiging om weinig aandacht op te eisen, ruimte te geven en niet snel de leiding naar zich toe te trekken."
  },
  "JK": {
    "code": "JK",
    "originalLabel": "Unassuming-Ingenuous",
    "dutchLabel": "Meegaand en oprecht",
    "angleDegrees": 315,
    "summary": "Neiging om tolerant, eerlijk en sterk rekening houdend met anderen op te treden."
  },
  "LM": {
    "code": "LM",
    "originalLabel": "Warm-Agreeable",
    "dutchLabel": "Warm en ondersteunend",
    "angleDegrees": 0,
    "summary": "Neiging om belangstelling, geruststelling en relationele warmte te tonen."
  },
  "NO": {
    "code": "NO",
    "originalLabel": "Gregarious-Extraverted",
    "dutchLabel": "Sociaal en expressief",
    "angleDegrees": 45,
    "summary": "Neiging om gemakkelijk contact te leggen, gesprekken te starten en sociale drukte op te zoeken."
  }
};

window.DISC_CHOICES = [
  {
    "value": 1,
    "marker": "1",
    "label": "Helemaal niet herkenbaar",
    "description": "Deze uitspraak beschrijft mij doorgaans helemaal niet."
  },
  {
    "value": 2,
    "marker": "2",
    "label": "Eerder niet herkenbaar",
    "description": "Deze uitspraak beschrijft mij doorgaans eerder niet."
  },
  {
    "value": 3,
    "marker": "3",
    "label": "Noch herkenbaar, noch onherkenbaar",
    "description": "Deze uitspraak past soms wel en soms niet bij mij."
  },
  {
    "value": 4,
    "marker": "4",
    "label": "Eerder herkenbaar",
    "description": "Deze uitspraak beschrijft mij doorgaans redelijk goed."
  },
  {
    "value": 5,
    "marker": "5",
    "label": "Heel herkenbaar",
    "description": "Deze uitspraak beschrijft mij doorgaans zeer goed."
  }
];

window.DISC_QUESTIONS = [
  {
    "id": "disc-ipip-ipc-01",
    "number": 1,
    "sourceItemNumber": 1,
    "scaleCode": "FG",
    "scaleItemNumber": 1,
    "keyed": "plus",
    "text": "Ik ben stil in het gezelschap van mensen die ik niet ken.",
    "originalEnglish": "Am quiet around strangers"
  },
  {
    "id": "disc-ipip-ipc-02",
    "number": 2,
    "sourceItemNumber": 2,
    "scaleCode": "HI",
    "scaleItemNumber": 1,
    "keyed": "plus",
    "text": "Ik spreek meestal zacht.",
    "originalEnglish": "Speak softly"
  },
  {
    "id": "disc-ipip-ipc-03",
    "number": 3,
    "sourceItemNumber": 3,
    "scaleCode": "JK",
    "scaleItemNumber": 1,
    "keyed": "plus",
    "text": "Ik verdraag veel van anderen.",
    "originalEnglish": "Tolerate a lot from others"
  },
  {
    "id": "disc-ipip-ipc-04",
    "number": 4,
    "sourceItemNumber": 4,
    "scaleCode": "LM",
    "scaleItemNumber": 1,
    "keyed": "plus",
    "text": "Ik ben geïnteresseerd in andere mensen.",
    "originalEnglish": "Am interested in people"
  },
  {
    "id": "disc-ipip-ipc-05",
    "number": 5,
    "sourceItemNumber": 5,
    "scaleCode": "NO",
    "scaleItemNumber": 1,
    "keyed": "plus",
    "text": "Ik voel me op mijn gemak tussen andere mensen.",
    "originalEnglish": "Feel comfortable around people"
  },
  {
    "id": "disc-ipip-ipc-06",
    "number": 6,
    "sourceItemNumber": 6,
    "scaleCode": "PA",
    "scaleItemNumber": 1,
    "keyed": "plus",
    "text": "Ik wil nadrukkelijk in het middelpunt van de belangstelling staan.",
    "originalEnglish": "Demand to be the center of interest"
  },
  {
    "id": "disc-ipip-ipc-07",
    "number": 7,
    "sourceItemNumber": 7,
    "scaleCode": "BC",
    "scaleItemNumber": 1,
    "keyed": "plus",
    "text": "Ik haal anderen soms hard onderuit.",
    "originalEnglish": "Cut others to pieces"
  },
  {
    "id": "disc-ipip-ipc-08",
    "number": 8,
    "sourceItemNumber": 8,
    "scaleCode": "DE",
    "scaleItemNumber": 1,
    "keyed": "plus",
    "text": "Ik vind dat mensen vooral voor zichzelf moeten zorgen.",
    "originalEnglish": "Believe people should fend for themselves"
  },
  {
    "id": "disc-ipip-ipc-09",
    "number": 9,
    "sourceItemNumber": 9,
    "scaleCode": "FG",
    "scaleItemNumber": 2,
    "keyed": "plus",
    "text": "Ik houd mijn persoonlijke leven sterk voor mezelf.",
    "originalEnglish": "Am a very private person"
  },
  {
    "id": "disc-ipip-ipc-10",
    "number": 10,
    "sourceItemNumber": 10,
    "scaleCode": "HI",
    "scaleItemNumber": 2,
    "keyed": "plus",
    "text": "Ik laat anderen uitspreken.",
    "originalEnglish": "Let others finish what they are saying"
  },
  {
    "id": "disc-ipip-ipc-11",
    "number": 11,
    "sourceItemNumber": 11,
    "scaleCode": "JK",
    "scaleItemNumber": 2,
    "keyed": "plus",
    "text": "Ik neem de dingen zoals ze komen.",
    "originalEnglish": "Take things as they come"
  },
  {
    "id": "disc-ipip-ipc-12",
    "number": 12,
    "sourceItemNumber": 12,
    "scaleCode": "LM",
    "scaleItemNumber": 2,
    "keyed": "plus",
    "text": "Ik stel anderen gerust.",
    "originalEnglish": "Reassure others"
  },
  {
    "id": "disc-ipip-ipc-13",
    "number": 13,
    "sourceItemNumber": 13,
    "scaleCode": "NO",
    "scaleItemNumber": 2,
    "keyed": "plus",
    "text": "Ik begin gesprekken.",
    "originalEnglish": "Start conversations"
  },
  {
    "id": "disc-ipip-ipc-14",
    "number": 14,
    "sourceItemNumber": 14,
    "scaleCode": "PA",
    "scaleItemNumber": 2,
    "keyed": "plus",
    "text": "Ik ben meestal degene die het meeste praat.",
    "originalEnglish": "Do most of the talking"
  },
  {
    "id": "disc-ipip-ipc-15",
    "number": 15,
    "sourceItemNumber": 15,
    "scaleCode": "BC",
    "scaleItemNumber": 2,
    "keyed": "plus",
    "text": "Ik spreek anderen tegen.",
    "originalEnglish": "Contradict others"
  },
  {
    "id": "disc-ipip-ipc-16",
    "number": 16,
    "sourceItemNumber": 16,
    "scaleCode": "DE",
    "scaleItemNumber": 2,
    "keyed": "plus",
    "text": "Ik laat me niet meeslepen door zielige verhalen.",
    "originalEnglish": "Don't fall for sob-stories"
  },
  {
    "id": "disc-ipip-ipc-17",
    "number": 17,
    "sourceItemNumber": 17,
    "scaleCode": "FG",
    "scaleItemNumber": 3,
    "keyed": "plus",
    "text": "Ik praat niet veel.",
    "originalEnglish": "Don't talk a lot"
  },
  {
    "id": "disc-ipip-ipc-18",
    "number": 18,
    "sourceItemNumber": 18,
    "scaleCode": "HI",
    "scaleItemNumber": 3,
    "keyed": "plus",
    "text": "Ik schep zelden op over mezelf.",
    "originalEnglish": "Seldom toot my own horn"
  },
  {
    "id": "disc-ipip-ipc-19",
    "number": 19,
    "sourceItemNumber": 19,
    "scaleCode": "JK",
    "scaleItemNumber": 3,
    "keyed": "plus",
    "text": "Ik denk eerst aan anderen.",
    "originalEnglish": "Think of others first"
  },
  {
    "id": "disc-ipip-ipc-20",
    "number": 20,
    "sourceItemNumber": 20,
    "scaleCode": "LM",
    "scaleItemNumber": 3,
    "keyed": "plus",
    "text": "Ik vraag hoe het met anderen gaat.",
    "originalEnglish": "Inquire about others' well-being"
  },
  {
    "id": "disc-ipip-ipc-21",
    "number": 21,
    "sourceItemNumber": 21,
    "scaleCode": "NO",
    "scaleItemNumber": 3,
    "keyed": "plus",
    "text": "Op feestjes praat ik met veel verschillende mensen.",
    "originalEnglish": "Talk to a lot of different people at parties"
  },
  {
    "id": "disc-ipip-ipc-22",
    "number": 22,
    "sourceItemNumber": 22,
    "scaleCode": "PA",
    "scaleItemNumber": 3,
    "keyed": "plus",
    "text": "Ik spreek luid.",
    "originalEnglish": "Speak loudly"
  },
  {
    "id": "disc-ipip-ipc-23",
    "number": 23,
    "sourceItemNumber": 23,
    "scaleCode": "BC",
    "scaleItemNumber": 3,
    "keyed": "plus",
    "text": "Ik reageer soms snauwend op mensen.",
    "originalEnglish": "Snap at people"
  },
  {
    "id": "disc-ipip-ipc-24",
    "number": 24,
    "sourceItemNumber": 24,
    "scaleCode": "DE",
    "scaleItemNumber": 3,
    "keyed": "plus",
    "text": "Ik denk meestal niet lang over dingen na.",
    "originalEnglish": "Don't put a lot of thought into things"
  },
  {
    "id": "disc-ipip-ipc-25",
    "number": 25,
    "sourceItemNumber": 25,
    "scaleCode": "FG",
    "scaleItemNumber": 4,
    "keyed": "plus",
    "text": "Ik heb meestal weinig te zeggen.",
    "originalEnglish": "Have little to say"
  },
  {
    "id": "disc-ipip-ipc-26",
    "number": 26,
    "sourceItemNumber": 26,
    "scaleCode": "HI",
    "scaleItemNumber": 4,
    "keyed": "plus",
    "text": "Ik sta niet graag in het middelpunt van de belangstelling.",
    "originalEnglish": "Dislike being the center of attention"
  },
  {
    "id": "disc-ipip-ipc-27",
    "number": 27,
    "sourceItemNumber": 27,
    "scaleCode": "JK",
    "scaleItemNumber": 4,
    "keyed": "plus",
    "text": "Ik verdraai de waarheid zelden.",
    "originalEnglish": "Seldom stretch the truth"
  },
  {
    "id": "disc-ipip-ipc-28",
    "number": 28,
    "sourceItemNumber": 28,
    "scaleCode": "LM",
    "scaleItemNumber": 4,
    "keyed": "plus",
    "text": "Ik kan goed met anderen overweg.",
    "originalEnglish": "Get along well with others"
  },
  {
    "id": "disc-ipip-ipc-29",
    "number": 29,
    "sourceItemNumber": 29,
    "scaleCode": "NO",
    "scaleItemNumber": 4,
    "keyed": "plus",
    "text": "Ik houd van grote feesten.",
    "originalEnglish": "Love large parties"
  },
  {
    "id": "disc-ipip-ipc-30",
    "number": 30,
    "sourceItemNumber": 30,
    "scaleCode": "PA",
    "scaleItemNumber": 4,
    "keyed": "plus",
    "text": "Ik eis aandacht op.",
    "originalEnglish": "Demand attention"
  },
  {
    "id": "disc-ipip-ipc-31",
    "number": 31,
    "sourceItemNumber": 31,
    "scaleCode": "BC",
    "scaleItemNumber": 4,
    "keyed": "plus",
    "text": "Ik kan scherp uit de hoek komen.",
    "originalEnglish": "Have a sharp tongue"
  },
  {
    "id": "disc-ipip-ipc-32",
    "number": 32,
    "sourceItemNumber": 32,
    "scaleCode": "DE",
    "scaleItemNumber": 4,
    "keyed": "plus",
    "text": "De problemen van anderen interesseren me meestal niet.",
    "originalEnglish": "Am not interested in other people's problems"
  }
];
