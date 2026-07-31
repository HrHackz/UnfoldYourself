"use strict";

/* Unfold Yourself — neutrale vraagdata voor Deelidentiteiten- en kruispuntdenken v2. */

window.IDENTITY_INTERSECTIONALITY_METADATA = {
  "id": "identity-intersectionality-42-nl-v2",
  "schemaVersion": 2,
  "title": "Deelidentiteiten- en kruispuntdenkentest",
  "itemCount": 42,
  "axisCount": 14,
  "instructions": "Beantwoord alle 42 vragen. De tool plaatst je per as tussen meer structurele benadeling en meer structureel voordeel in de Belgische context.",
  "methodNote": "Elke as wordt afzonderlijk berekend uit drie antwoorden en Belgische contextdata. Een interne schaal van 0 tot 100 plaatst de stip; het percentage blijft verborgen en er is geen totaalscore.",
  "privacyNote": "De antwoorden kunnen gevoelige persoonsgegevens bevatten. Ze blijven lokaal in je browser, tenzij je zelf een back-up downloadt.",
  "lastReviewed": "2026-07-31"
};

window.IDENTITY_INTERSECTIONALITY_AXES = [
  {
    "id": "gender",
    "label": "Geslacht en gender",
    "shortLabel": "Gender",
    "description": "Hoe je genderidentiteit en maatschappelijke verwachtingen je positie kunnen beïnvloeden."
  },
  {
    "id": "sexualOrientation",
    "label": "Seksuele oriëntatie",
    "shortLabel": "Oriëntatie",
    "description": "Hoe openheid, zichtbaarheid en de maatschappelijke norm rond je oriëntatie kunnen doorwerken."
  },
  {
    "id": "skinColor",
    "label": "Huidskleur",
    "shortLabel": "Huidskleur",
    "description": "Hoe huidskleur en zichtbare racialisering invloed kunnen hebben op aannames en behandeling."
  },
  {
    "id": "ethnicity",
    "label": "Etniciteit en herkomst",
    "shortLabel": "Herkomst",
    "description": "Hoe culturele of etnische herkomst, erbij horen en als buitenstaander gezien worden kunnen doorwerken."
  },
  {
    "id": "nationality",
    "label": "Nationaliteit",
    "shortLabel": "Nationaliteit",
    "description": "Hoe nationaliteit samenhangt met formele rechten, mobiliteit en politieke deelname."
  },
  {
    "id": "socialClass",
    "label": "Sociale klasse",
    "shortLabel": "Klasse",
    "description": "Hoe opleiding, financiële achtergrond en toegang tot netwerken je kansen kunnen beïnvloeden."
  },
  {
    "id": "culture",
    "label": "Cultuur",
    "shortLabel": "Cultuur",
    "description": "Hoe gewoonten, communicatie en aanpassingsdruk aansluiten bij dominante normen."
  },
  {
    "id": "religion",
    "label": "Religie en levensbeschouwing",
    "shortLabel": "Levensbeschouwing",
    "description": "Hoe maatschappelijke routines en ruimte voor geloof of levensbeschouwing je positie beïnvloeden."
  },
  {
    "id": "health",
    "label": "Gezondheidssituatie",
    "shortLabel": "Gezondheid",
    "description": "Hoe gezondheid, langdurige omstandigheden en toegankelijkheid je deelname kunnen beïnvloeden."
  },
  {
    "id": "age",
    "label": "Leeftijd",
    "shortLabel": "Leeftijd",
    "description": "Hoe je levensfase samenhangt met erkenning, kansen en uitsluiting."
  },
  {
    "id": "residence",
    "label": "Verblijfsstatuut",
    "shortLabel": "Verblijfsstatuut",
    "description": "Hoe juridische zekerheid en verblijfsrechten je bewegingsruimte beïnvloeden."
  },
  {
    "id": "wealth",
    "label": "Bezit en financiële zekerheid",
    "shortLabel": "Bezit",
    "description": "Hoe vermogen, buffers en inkomensafhankelijkheid je keuzevrijheid beïnvloeden."
  },
  {
    "id": "geopolitics",
    "label": "Noord-Zuid / Oost-West",
    "shortLabel": "Geopolitieke herkomst",
    "description": "Hoe geboorteland, opgroeiregio en beeldvorming over herkomst kunnen doorwerken."
  },
  {
    "id": "socialChange",
    "label": "Maatschappelijke ontwikkeling",
    "shortLabel": "Ontwikkeling",
    "description": "Hoe maatschappelijke veranderingen en je aanpassingsmogelijkheden je kansen beïnvloeden."
  }
];

window.IDENTITY_INTERSECTIONALITY_CHOICE_SETS = {
  "genderIdentity": [
    {
      "value": "man",
      "label": "Man",
      "marker": "1",
      "score": 85
    },
    {
      "value": "woman",
      "label": "Vrouw",
      "marker": "2",
      "score": 65
    },
    {
      "value": "nonbinary",
      "label": "Non-binair",
      "marker": "3",
      "score": 30
    },
    {
      "value": "genderfluid",
      "label": "Genderfluïde",
      "marker": "4",
      "score": 30
    },
    {
      "value": "other",
      "label": "Anders",
      "marker": "5",
      "score": 35
    }
  ],
  "alignment": [
    {
      "value": 1,
      "label": "Volledig",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Grotendeels",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Gedeeltelijk",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Nauwelijks",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Helemaal niet",
      "marker": "5",
      "score": 0
    }
  ],
  "frequencyBarrier": [
    {
      "value": 1,
      "label": "Nooit",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Zelden",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Soms",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Vaak",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Zeer vaak",
      "marker": "5",
      "score": 0
    }
  ],
  "orientation": [
    {
      "value": "heterosexual",
      "label": "Heteroseksueel",
      "score": 92,
      "marker": "1"
    },
    {
      "value": "homosexual",
      "label": "Homoseksueel",
      "score": 44,
      "marker": "2"
    },
    {
      "value": "lesbian",
      "label": "Lesbisch",
      "score": 44,
      "marker": "3"
    },
    {
      "value": "bisexual",
      "label": "Biseksueel",
      "score": 40,
      "marker": "4"
    },
    {
      "value": "pansexual",
      "label": "Panseksueel",
      "score": 38,
      "marker": "5"
    },
    {
      "value": "asexual",
      "label": "Aseksueel",
      "score": 45,
      "marker": "6"
    },
    {
      "value": "queer",
      "label": "Queer",
      "score": 35,
      "marker": "7"
    },
    {
      "value": "other",
      "label": "Een andere oriëntatie",
      "score": 40,
      "marker": "8"
    },
    {
      "value": "unsure",
      "label": "Nog niet zeker",
      "score": 42,
      "marker": "9"
    }
  ],
  "commonness": [
    {
      "value": 1,
      "label": "Zeer gebruikelijk",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Gebruikelijk",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Wisselend",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Ongebruikelijk",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Zeer ongebruikelijk",
      "marker": "5",
      "score": 0
    }
  ],
  "openness": [
    {
      "value": 1,
      "label": "Volledig",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Grotendeels",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Gedeeltelijk",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Nauwelijks",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Helemaal niet",
      "marker": "5",
      "score": 0
    }
  ],
  "skinTone": [
    {
      "value": 1,
      "label": "Zeer licht",
      "marker": "1",
      "score": 92
    },
    {
      "value": 2,
      "label": "Licht",
      "marker": "2",
      "score": 82
    },
    {
      "value": 3,
      "label": "Tussen licht en donker",
      "marker": "3",
      "score": 55
    },
    {
      "value": 4,
      "label": "Donker",
      "marker": "4",
      "score": 30
    },
    {
      "value": 5,
      "label": "Zeer donker",
      "marker": "5",
      "score": 20
    }
  ],
  "majorityPerception": [
    {
      "value": 1,
      "label": "Vrijwel altijd",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Meestal",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Soms",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Zelden",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Vrijwel nooit",
      "marker": "5",
      "score": 0
    }
  ],
  "ethnicity": [
    {
      "value": "belgian",
      "label": "Belgisch",
      "score": 90,
      "marker": ""
    },
    {
      "value": "north-west-europe",
      "label": "Noord- of West-Europees",
      "score": 82,
      "marker": ""
    },
    {
      "value": "south-europe",
      "label": "Zuid-Europees",
      "score": 70,
      "marker": ""
    },
    {
      "value": "central-east-europe",
      "label": "Centraal- of Oost-Europees",
      "score": 60,
      "marker": ""
    },
    {
      "value": "north-africa",
      "label": "Noord-Afrikaans",
      "score": 35,
      "marker": ""
    },
    {
      "value": "sub-saharan-africa",
      "label": "Sub-Saharaans Afrikaans",
      "score": 30,
      "marker": ""
    },
    {
      "value": "middle-east-west-asia",
      "label": "Midden-Oosters of West-Aziatisch",
      "score": 35,
      "marker": ""
    },
    {
      "value": "south-asia",
      "label": "Zuid-Aziatisch",
      "score": 40,
      "marker": ""
    },
    {
      "value": "east-asia",
      "label": "Oost-Aziatisch",
      "score": 50,
      "marker": ""
    },
    {
      "value": "southeast-asia",
      "label": "Zuidoost-Aziatisch",
      "score": 45,
      "marker": ""
    },
    {
      "value": "north-america",
      "label": "Noord-Amerikaans",
      "score": 75,
      "marker": ""
    },
    {
      "value": "latin-caribbean",
      "label": "Latijns-Amerikaans of Caribisch",
      "score": 45,
      "marker": ""
    },
    {
      "value": "oceania-pacific",
      "label": "Oceanië of Pacifisch",
      "score": 60,
      "marker": ""
    },
    {
      "value": "mixed",
      "label": "Gemengde herkomst",
      "score": 55,
      "marker": ""
    },
    {
      "value": "other",
      "label": "Andere herkomst",
      "score": 50,
      "marker": ""
    }
  ],
  "belonging": [
    {
      "value": 1,
      "label": "Volledig",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Grotendeels",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Gedeeltelijk",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Nauwelijks",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Helemaal niet",
      "marker": "5",
      "score": 0
    }
  ],
  "mobility": [
    {
      "value": 1,
      "label": "Zeer veel",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Veel",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Gemiddeld",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Weinig",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Zeer weinig",
      "marker": "5",
      "score": 0
    }
  ],
  "politicalRights": [
    {
      "value": "full",
      "label": "Volledig stemrecht",
      "marker": "1",
      "score": 100
    },
    {
      "value": "most",
      "label": "Stemrecht bij de meeste verkiezingen",
      "marker": "2",
      "score": 80
    },
    {
      "value": "local",
      "label": "Alleen beperkt of lokaal stemrecht",
      "marker": "3",
      "score": 50
    },
    {
      "value": "none",
      "label": "Geen stemrecht",
      "marker": "4",
      "score": 10
    },
    {
      "value": "underage",
      "label": "Nog niet stemgerechtigd door mijn leeftijd",
      "marker": "5",
      "score": 55
    }
  ],
  "education": [
    {
      "value": "none",
      "label": "Geen diploma",
      "score": 10,
      "marker": ""
    },
    {
      "value": "primary",
      "label": "Basisonderwijs",
      "score": 20,
      "marker": ""
    },
    {
      "value": "lower-secondary",
      "label": "Lager secundair onderwijs",
      "score": 30,
      "marker": ""
    },
    {
      "value": "upper-secondary",
      "label": "Hoger secundair onderwijs",
      "score": 50,
      "marker": ""
    },
    {
      "value": "vocational",
      "label": "Beroeps- of vakopleiding",
      "score": 55,
      "marker": ""
    },
    {
      "value": "graduate",
      "label": "Graduaat",
      "score": 68,
      "marker": ""
    },
    {
      "value": "professional-bachelor",
      "label": "Professionele bachelor",
      "score": 78,
      "marker": ""
    },
    {
      "value": "academic-bachelor",
      "label": "Academische bachelor",
      "score": 80,
      "marker": ""
    },
    {
      "value": "master",
      "label": "Master",
      "score": 90,
      "marker": ""
    },
    {
      "value": "doctorate",
      "label": "Doctoraat",
      "score": 95,
      "marker": ""
    },
    {
      "value": "studying",
      "label": "Nog bezig met een opleiding",
      "score": 55,
      "marker": ""
    },
    {
      "value": "foreign",
      "label": "Buitenlands diploma dat moeilijk te vergelijken is",
      "score": 45,
      "marker": ""
    }
  ],
  "upbringingFinance": [
    {
      "value": 1,
      "label": "Er waren vaak tekorten",
      "marker": "1",
      "score": 0
    },
    {
      "value": 2,
      "label": "Er waren regelmatig financiële zorgen",
      "marker": "2",
      "score": 25
    },
    {
      "value": 3,
      "label": "De basisbehoeften konden meestal worden betaald",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Er was voldoende financiële ruimte",
      "marker": "4",
      "score": 75
    },
    {
      "value": 5,
      "label": "Er was veel financiële zekerheid",
      "marker": "5",
      "score": 100
    }
  ],
  "networkAccess": [
    {
      "value": 1,
      "label": "Zeer veel",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Veel",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Gemiddeld",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Weinig",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Zeer weinig",
      "marker": "5",
      "score": 0
    }
  ],
  "culturalFit": [
    {
      "value": 1,
      "label": "Volledig",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Grotendeels",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Gedeeltelijk",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Nauwelijks",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Helemaal niet",
      "marker": "5",
      "score": 0
    }
  ],
  "religion": [
    {
      "value": "christianity",
      "label": "Christendom",
      "score": 85,
      "marker": ""
    },
    {
      "value": "islam",
      "label": "Islam",
      "score": 45,
      "marker": ""
    },
    {
      "value": "judaism",
      "label": "Jodendom",
      "score": 45,
      "marker": ""
    },
    {
      "value": "hinduism",
      "label": "Hindoeïsme",
      "score": 45,
      "marker": ""
    },
    {
      "value": "buddhism",
      "label": "Boeddhisme",
      "score": 50,
      "marker": ""
    },
    {
      "value": "sikhism",
      "label": "Sikhisme",
      "score": 40,
      "marker": ""
    },
    {
      "value": "other-religion",
      "label": "Andere religie",
      "score": 40,
      "marker": ""
    },
    {
      "value": "multiple",
      "label": "Meerdere religieuze tradities",
      "score": 45,
      "marker": ""
    },
    {
      "value": "spiritual",
      "label": "Spiritueel, maar niet religieus",
      "score": 65,
      "marker": ""
    },
    {
      "value": "humanistic",
      "label": "Humanistisch",
      "score": 72,
      "marker": ""
    },
    {
      "value": "agnostic",
      "label": "Agnostisch",
      "score": 75,
      "marker": ""
    },
    {
      "value": "atheist",
      "label": "Atheïstisch",
      "score": 78,
      "marker": ""
    },
    {
      "value": "none",
      "label": "Geen specifieke levensbeschouwing",
      "score": 80,
      "marker": ""
    }
  ],
  "healthGeneral": [
    {
      "value": 1,
      "label": "Zeer goed",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Goed",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Gemiddeld",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Minder goed",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Slecht",
      "marker": "5",
      "score": 0
    }
  ],
  "healthSituation": [
    {
      "value": "none",
      "label": "Geen langdurige gezondheidsproblemen",
      "score": 100,
      "marker": ""
    },
    {
      "value": "chronic",
      "label": "Een chronische lichamelijke aandoening",
      "score": 50,
      "marker": ""
    },
    {
      "value": "physical",
      "label": "Een lichamelijke beperking",
      "score": 30,
      "marker": ""
    },
    {
      "value": "sensory",
      "label": "Een zintuiglijke beperking, zoals slechtziendheid of slechthorendheid",
      "score": 35,
      "marker": ""
    },
    {
      "value": "cognitive",
      "label": "Een verstandelijke of cognitieve beperking",
      "score": 25,
      "marker": ""
    },
    {
      "value": "learning",
      "label": "Een leerstoornis",
      "score": 45,
      "marker": ""
    },
    {
      "value": "neurodivergent",
      "label": "Neurodivergentie, zoals ADHD of autisme",
      "score": 45,
      "marker": ""
    },
    {
      "value": "mental",
      "label": "Een langdurige psychische kwetsbaarheid",
      "score": 40,
      "marker": ""
    },
    {
      "value": "multiple",
      "label": "Meerdere van deze situaties",
      "score": 15,
      "marker": ""
    },
    {
      "value": "other",
      "label": "Een andere langdurige gezondheidssituatie",
      "score": 40,
      "marker": ""
    }
  ],
  "ageGroup": [
    {
      "value": "18-24",
      "label": "18 tot en met 24 jaar",
      "score": 55,
      "marker": "1"
    },
    {
      "value": "25-34",
      "label": "25 tot en met 34 jaar",
      "score": 85,
      "marker": "2"
    },
    {
      "value": "35-44",
      "label": "35 tot en met 44 jaar",
      "score": 90,
      "marker": "3"
    },
    {
      "value": "45-54",
      "label": "45 tot en met 54 jaar",
      "score": 78,
      "marker": "4"
    },
    {
      "value": "55+",
      "label": "55 jaar of ouder",
      "score": 55,
      "marker": "5"
    }
  ],
  "residenceStatus": [
    {
      "value": "citizen",
      "label": "Staatsburger",
      "score": 100,
      "marker": ""
    },
    {
      "value": "eu-free-movement",
      "label": "Burger met verblijfsrecht door vrij verkeer",
      "score": 90,
      "marker": ""
    },
    {
      "value": "permanent",
      "label": "Permanent verblijfsrecht",
      "score": 90,
      "marker": ""
    },
    {
      "value": "temporary",
      "label": "Tijdelijke verblijfsvergunning",
      "score": 65,
      "marker": ""
    },
    {
      "value": "work-study",
      "label": "Verblijfsrecht via werk of studie",
      "score": 60,
      "marker": ""
    },
    {
      "value": "family",
      "label": "Verblijfsrecht via partner of familie",
      "score": 60,
      "marker": ""
    },
    {
      "value": "refugee",
      "label": "Erkende vluchtelingenstatus",
      "score": 55,
      "marker": ""
    },
    {
      "value": "temporary-protection",
      "label": "Tijdelijke bescherming",
      "score": 45,
      "marker": ""
    },
    {
      "value": "asylum",
      "label": "Asielprocedure loopt",
      "score": 25,
      "marker": ""
    },
    {
      "value": "undocumented",
      "label": "Geen officieel verblijfsrecht",
      "score": 5,
      "marker": ""
    },
    {
      "value": "other",
      "label": "Ander verblijfsstatuut",
      "score": 45,
      "marker": ""
    }
  ],
  "certainty": [
    {
      "value": 1,
      "label": "Zeer zeker",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Zeker",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Wisselend",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Onzeker",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Zeer onzeker",
      "marker": "5",
      "score": 0
    }
  ],
  "wealthSituation": [
    {
      "value": "debt",
      "label": "Mijn schulden zijn groter dan mijn bezit",
      "score": 0,
      "marker": "1"
    },
    {
      "value": "minimal",
      "label": "Ik heb nauwelijks spaargeld of bezit",
      "score": 20,
      "marker": "2"
    },
    {
      "value": "limited",
      "label": "Ik heb een beperkte financiële reserve",
      "score": 45,
      "marker": "3"
    },
    {
      "value": "months",
      "label": "Ik heb voldoende reserve om meerdere maanden te overbruggen",
      "score": 75,
      "marker": "4"
    },
    {
      "value": "substantial",
      "label": "Ik heb veel spaargeld, beleggingen, vastgoed of ander bezit",
      "score": 100,
      "marker": "5"
    }
  ],
  "unexpectedExpense": [
    {
      "value": 1,
      "label": "Zeer gemakkelijk",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Gemakkelijk",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Met enige moeite",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Alleen met hulp of een lening",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Helemaal niet",
      "marker": "5",
      "score": 0
    }
  ],
  "dependency": [
    {
      "value": 1,
      "label": "Volledig",
      "marker": "1",
      "score": 0
    },
    {
      "value": 2,
      "label": "Grotendeels",
      "marker": "2",
      "score": 25
    },
    {
      "value": 3,
      "label": "Gedeeltelijk",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Nauwelijks",
      "marker": "4",
      "score": 75
    },
    {
      "value": 5,
      "label": "Helemaal niet",
      "marker": "5",
      "score": 100
    }
  ],
  "worldRegion": [
    {
      "value": "europe",
      "label": "Europa",
      "score": 80,
      "marker": "1"
    },
    {
      "value": "africa",
      "label": "Afrika",
      "score": 35,
      "marker": "2"
    },
    {
      "value": "asia",
      "label": "Azië",
      "score": 50,
      "marker": "3"
    },
    {
      "value": "north-america",
      "label": "Noord-Amerika",
      "score": 75,
      "marker": "4"
    },
    {
      "value": "latin-caribbean",
      "label": "Latijns-Amerika en het Caribisch gebied",
      "score": 45,
      "marker": "5"
    },
    {
      "value": "oceania",
      "label": "Oceanië",
      "score": 65,
      "marker": "6"
    },
    {
      "value": "multiple",
      "label": "In meerdere wereldregio’s",
      "score": 55,
      "marker": "7"
    }
  ],
  "perception": [
    {
      "value": 1,
      "label": "Zeer positief",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Positief",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Neutraal",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Negatief",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Zeer negatief",
      "marker": "5",
      "score": 0
    }
  ],
  "socialDevelopments": [
    {
      "value": "digital-ai",
      "label": "Digitalisering en artificiële intelligentie",
      "score": 50,
      "marker": "1"
    },
    {
      "value": "economy-work",
      "label": "Economie en arbeidsmarkt",
      "score": 50,
      "marker": "2"
    },
    {
      "value": "politics-migration",
      "label": "Politiek, migratie en internationale spanningen",
      "score": 50,
      "marker": "3"
    },
    {
      "value": "climate-energy",
      "label": "Klimaat en energie",
      "score": 50,
      "marker": "4"
    },
    {
      "value": "education-health-social",
      "label": "Onderwijs, gezondheidszorg en sociale bescherming",
      "score": 50,
      "marker": "5"
    }
  ],
  "changeImpact": [
    {
      "value": 1,
      "label": "Sterk verbeterd",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Verbeterd",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Nauwelijks veranderd",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Verslechterd",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Sterk verslechterd",
      "marker": "5",
      "score": 0
    }
  ],
  "adaptation": [
    {
      "value": 1,
      "label": "Zeer veel",
      "marker": "1",
      "score": 100
    },
    {
      "value": 2,
      "label": "Veel",
      "marker": "2",
      "score": 75
    },
    {
      "value": 3,
      "label": "Gemiddeld",
      "marker": "3",
      "score": 50
    },
    {
      "value": 4,
      "label": "Weinig",
      "marker": "4",
      "score": 25
    },
    {
      "value": 5,
      "label": "Zeer weinig",
      "marker": "5",
      "score": 0
    }
  ]
};

window.IDENTITY_INTERSECTIONALITY_CHOICE_SETS.nationalityCountries = [
  ...(window.IDENTITY_INTERSECTIONALITY_COUNTRY_OPTIONS || []),
  { value: "STATELESS", label: "Staatloos", score: 5, marker: "" },
  { value: "UNDETERMINED", label: "Nationaliteit nog niet officieel vastgesteld", score: 10, marker: "" }
];

window.IDENTITY_INTERSECTIONALITY_CHOICE_SETS.birthCountries = [
  ...(window.IDENTITY_INTERSECTIONALITY_COUNTRY_OPTIONS || []),
  { value: "STATELESS", label: "Staatloos geboren", score: 15, marker: "" },
  { value: "HISTORIC", label: "Mijn geboorteland bestaat niet meer of heeft een andere naam", score: 45, marker: "" }
];

window.IDENTITY_INTERSECTIONALITY_QUESTIONS = [
  {
    "id": "identity-intersectionality-v2-01",
    "number": 1,
    "axisId": "gender",
    "category": "Gender",
    "choiceSet": "genderIdentity",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe identificeer jij je qua gender?"
  },
  {
    "id": "identity-intersectionality-v2-02",
    "number": 2,
    "axisId": "gender",
    "category": "Gender",
    "choiceSet": "alignment",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Komt jouw genderidentiteit overeen met het geslacht dat je bij je geboorte kreeg toegewezen?"
  },
  {
    "id": "identity-intersectionality-v2-03",
    "number": 3,
    "axisId": "gender",
    "category": "Gender",
    "choiceSet": "frequencyBarrier",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe vaak merk je dat anderen verwachtingen hebben over hoe iemand met jouw gender zich hoort te gedragen?"
  },
  {
    "id": "identity-intersectionality-v2-04",
    "number": 4,
    "axisId": "sexualOrientation",
    "category": "Oriëntatie",
    "choiceSet": "orientation",
    "inputType": "select",
    "weight": 0.3333333333333333,
    "text": "Hoe omschrijf jij je seksuele of romantische oriëntatie?"
  },
  {
    "id": "identity-intersectionality-v2-05",
    "number": 5,
    "axisId": "sexualOrientation",
    "category": "Oriëntatie",
    "choiceSet": "commonness",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe gebruikelijk is jouw oriëntatie in de omgeving waarin je leeft?"
  },
  {
    "id": "identity-intersectionality-v2-06",
    "number": 6,
    "axisId": "sexualOrientation",
    "category": "Oriëntatie",
    "choiceSet": "openness",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "In hoeverre kun jij open zijn over je seksuele of romantische oriëntatie?"
  },
  {
    "id": "identity-intersectionality-v2-07",
    "number": 7,
    "axisId": "skinColor",
    "category": "Huidskleur",
    "choiceSet": "skinTone",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe zou jij je huidskleur omschrijven?"
  },
  {
    "id": "identity-intersectionality-v2-08",
    "number": 8,
    "axisId": "skinColor",
    "category": "Huidskleur",
    "choiceSet": "majorityPerception",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Word jij op basis van je huidskleur meestal gezien als deel van de meerderheid in je omgeving?"
  },
  {
    "id": "identity-intersectionality-v2-09",
    "number": 9,
    "axisId": "skinColor",
    "category": "Huidskleur",
    "choiceSet": "frequencyBarrier",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe vaak merk je dat mensen aannames over jou maken op basis van je huidskleur?"
  },
  {
    "id": "identity-intersectionality-v2-10",
    "number": 10,
    "axisId": "ethnicity",
    "category": "Herkomst",
    "choiceSet": "ethnicity",
    "inputType": "select",
    "weight": 0.3333333333333333,
    "text": "Met welke culturele of etnische herkomst identificeer jij je het meest?"
  },
  {
    "id": "identity-intersectionality-v2-11",
    "number": 11,
    "axisId": "ethnicity",
    "category": "Herkomst",
    "choiceSet": "belonging",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "In hoeverre voel jij je thuis in de cultuur van je huidige woonomgeving?"
  },
  {
    "id": "identity-intersectionality-v2-12",
    "number": 12,
    "axisId": "ethnicity",
    "category": "Herkomst",
    "choiceSet": "frequencyBarrier",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe vaak word jij door je naam, afkomst, taal, gewoonten of familiegeschiedenis als buitenstaander gezien?"
  },
  {
    "id": "identity-intersectionality-v2-13",
    "number": 13,
    "axisId": "nationality",
    "category": "Nationaliteit",
    "choiceSet": "nationalityCountries",
    "inputType": "multi-select",
    "weight": 0.3333333333333333,
    "text": "Welke nationaliteit of nationaliteiten heb jij?",
    "maxSelections": 3
  },
  {
    "id": "identity-intersectionality-v2-14",
    "number": 14,
    "axisId": "nationality",
    "category": "Nationaliteit",
    "choiceSet": "mobility",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoeveel mogelijkheden geeft jouw nationaliteit je om internationaal te reizen, wonen of werken?"
  },
  {
    "id": "identity-intersectionality-v2-15",
    "number": 15,
    "axisId": "nationality",
    "category": "Nationaliteit",
    "choiceSet": "politicalRights",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Welke politieke rechten heb jij in het land waar je woont?"
  },
  {
    "id": "identity-intersectionality-v2-16",
    "number": 16,
    "axisId": "socialClass",
    "category": "Klasse",
    "choiceSet": "education",
    "inputType": "select",
    "weight": 0.3333333333333333,
    "text": "Wat is je hoogste voltooide opleidingsniveau?"
  },
  {
    "id": "identity-intersectionality-v2-17",
    "number": 17,
    "axisId": "socialClass",
    "category": "Klasse",
    "choiceSet": "upbringingFinance",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe was de financiële situatie van het gezin waarin je bent opgegroeid?"
  },
  {
    "id": "identity-intersectionality-v2-18",
    "number": 18,
    "axisId": "socialClass",
    "category": "Klasse",
    "choiceSet": "networkAccess",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoeveel toegang heb jij via familie, opleiding, werk of kennissen tot invloedrijke netwerken?"
  },
  {
    "id": "identity-intersectionality-v2-19",
    "number": 19,
    "axisId": "culture",
    "category": "Cultuur",
    "choiceSet": "culturalFit",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "In hoeverre passen jouw gewoonten en omgangsvormen bij wat in je omgeving normaal wordt gevonden?"
  },
  {
    "id": "identity-intersectionality-v2-20",
    "number": 20,
    "axisId": "culture",
    "category": "Cultuur",
    "choiceSet": "culturalFit",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "In hoeverre wordt jouw manier van communiceren begrepen en aanvaard op school, op het werk of bij officiële diensten?"
  },
  {
    "id": "identity-intersectionality-v2-21",
    "number": 21,
    "axisId": "culture",
    "category": "Cultuur",
    "choiceSet": "frequencyBarrier",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe vaak pas jij je taalgebruik, gedrag of uitstraling bewust aan om erbij te horen?"
  },
  {
    "id": "identity-intersectionality-v2-22",
    "number": 22,
    "axisId": "religion",
    "category": "Levensbeschouwing",
    "choiceSet": "religion",
    "inputType": "select",
    "weight": 0.3333333333333333,
    "text": "Welke religie of levensbeschouwing past het best bij jou?"
  },
  {
    "id": "identity-intersectionality-v2-23",
    "number": 23,
    "axisId": "religion",
    "category": "Levensbeschouwing",
    "choiceSet": "alignment",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "In hoeverre sluiten officiële feestdagen en vrije dagen aan bij jouw religie of levensbeschouwing?"
  },
  {
    "id": "identity-intersectionality-v2-24",
    "number": 24,
    "axisId": "religion",
    "category": "Levensbeschouwing",
    "choiceSet": "openness",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "In hoeverre kun jij je religie of levensbeschouwing openlijk beleven?"
  },
  {
    "id": "identity-intersectionality-v2-25",
    "number": 25,
    "axisId": "health",
    "category": "Gezondheid",
    "choiceSet": "healthGeneral",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe ervaar jij je gezondheid in het algemeen?"
  },
  {
    "id": "identity-intersectionality-v2-26",
    "number": 26,
    "axisId": "health",
    "category": "Gezondheid",
    "choiceSet": "healthSituation",
    "inputType": "select",
    "weight": 0.3333333333333333,
    "text": "Welke situatie past het best bij jou?"
  },
  {
    "id": "identity-intersectionality-v2-27",
    "number": 27,
    "axisId": "health",
    "category": "Gezondheid",
    "choiceSet": "alignment",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "In hoeverre zijn gebouwen, vervoer, informatie en digitale diensten toegankelijk voor jou?"
  },
  {
    "id": "identity-intersectionality-v2-28",
    "number": 28,
    "axisId": "age",
    "category": "Leeftijd",
    "choiceSet": "ageGroup",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "In welke leeftijdsgroep val jij?"
  },
  {
    "id": "identity-intersectionality-v2-29",
    "number": 29,
    "axisId": "age",
    "category": "Leeftijd",
    "choiceSet": "alignment",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "In hoeverre worden jouw mening en ervaring serieus genomen, ongeacht je leeftijd?"
  },
  {
    "id": "identity-intersectionality-v2-30",
    "number": 30,
    "axisId": "age",
    "category": "Leeftijd",
    "choiceSet": "frequencyBarrier",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe vaak beperkt je leeftijd je kansen op werk, opleiding, diensten of maatschappelijke deelname?"
  },
  {
    "id": "identity-intersectionality-v2-31",
    "number": 31,
    "axisId": "residence",
    "category": "Verblijfsstatuut",
    "choiceSet": "residenceStatus",
    "inputType": "select",
    "weight": 0.3333333333333333,
    "text": "Wat is jouw verblijfsstatuut in het land waar je woont?"
  },
  {
    "id": "identity-intersectionality-v2-32",
    "number": 32,
    "axisId": "residence",
    "category": "Verblijfsstatuut",
    "choiceSet": "certainty",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe zeker is jouw recht om in het land te blijven?"
  },
  {
    "id": "identity-intersectionality-v2-33",
    "number": 33,
    "axisId": "residence",
    "category": "Verblijfsstatuut",
    "choiceSet": "frequencyBarrier",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe vaak ervaar jij stress of onzekerheid over je verblijfsrecht?"
  },
  {
    "id": "identity-intersectionality-v2-34",
    "number": 34,
    "axisId": "wealth",
    "category": "Bezit",
    "choiceSet": "wealthSituation",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Welke omschrijving past het best bij jouw huidige financiële situatie?"
  },
  {
    "id": "identity-intersectionality-v2-35",
    "number": 35,
    "axisId": "wealth",
    "category": "Bezit",
    "choiceSet": "unexpectedExpense",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Kun jij een grote onverwachte uitgave betalen zonder dat je basisbehoeften in gevaar komen?"
  },
  {
    "id": "identity-intersectionality-v2-36",
    "number": 36,
    "axisId": "wealth",
    "category": "Bezit",
    "choiceSet": "dependency",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe afhankelijk ben jij van je maandelijkse inkomen om wonen, voeding en andere basisbehoeften te betalen?"
  },
  {
    "id": "identity-intersectionality-v2-37",
    "number": 37,
    "axisId": "geopolitics",
    "category": "Geopolitieke herkomst",
    "choiceSet": "birthCountries",
    "inputType": "select",
    "weight": 0.3333333333333333,
    "text": "In welk land ben jij geboren?"
  },
  {
    "id": "identity-intersectionality-v2-38",
    "number": 38,
    "axisId": "geopolitics",
    "category": "Geopolitieke herkomst",
    "choiceSet": "worldRegion",
    "inputType": "select",
    "weight": 0.3333333333333333,
    "text": "In welke wereldregio ben jij hoofdzakelijk opgegroeid?"
  },
  {
    "id": "identity-intersectionality-v2-39",
    "number": 39,
    "axisId": "geopolitics",
    "category": "Geopolitieke herkomst",
    "choiceSet": "perception",
    "inputType": "buttons",
    "weight": 0.3333333333333333,
    "text": "Hoe kijken mensen in jouw huidige omgeving volgens jou naar je geboorteland of herkomstregio?"
  },
  {
    "id": "identity-intersectionality-v2-40",
    "number": 40,
    "axisId": "socialChange",
    "category": "Ontwikkeling",
    "choiceSet": "socialDevelopments",
    "inputType": "multi-buttons",
    "weight": 0.15,
    "text": "Welke maatschappelijke ontwikkelingen hebben momenteel de meeste invloed op jouw leven en kansen?",
    "maxSelections": 2
  },
  {
    "id": "identity-intersectionality-v2-41",
    "number": 41,
    "axisId": "socialChange",
    "category": "Ontwikkeling",
    "choiceSet": "changeImpact",
    "inputType": "buttons",
    "weight": 0.425,
    "text": "Hoe hebben recente maatschappelijke veranderingen jouw kansen beïnvloed?"
  },
  {
    "id": "identity-intersectionality-v2-42",
    "number": 42,
    "axisId": "socialChange",
    "category": "Ontwikkeling",
    "choiceSet": "adaptation",
    "inputType": "buttons",
    "weight": 0.425,
    "text": "Hoeveel mogelijkheden heb jij om je aan maatschappelijke veranderingen aan te passen? Denk bijvoorbeeld aan tijd, geld, opleiding, technologie of ondersteuning."
  }
];
