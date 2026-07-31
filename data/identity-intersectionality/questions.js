"use strict";

/* Unfold Yourself — Deelidentiteiten- en kruispuntdenkentest: vraagdata. */

window.IDENTITY_INTERSECTIONALITY_METADATA = {
  "id": "identity-intersectionality-42-nl",
  "title": "Deelidentiteiten- en kruispuntdenkentest",
  "itemCount": 42,
  "axisCount": 14,
  "instructions": "Beantwoord elke vraag vanuit je huidige maatschappelijke context. Bij gevoelige vragen kun je altijd ‘Zeg ik liever niet’ kiezen. De tool beoordeelt je waarde als persoon niet; hij helpt patronen van toegang en barrières zichtbaar te maken.",
  "methodNote": "Per as worden drie lagen gecombineerd: maatschappelijke positie, zelfgerapporteerde toegang en ervaren barrières. De uitkomst is een transparante reflectie-index en geen bevolkingspercentiel, diagnose of objectief bewijs van discriminatie.",
  "privacyNote": "De antwoorden kunnen gevoelige persoonsgegevens bevatten. Alles blijft lokaal in deze browser, tenzij je zelf een back-upbestand downloadt. Een back-upbestand is niet versleuteld.",
  "lastReviewed": "2026-07-31"
};

window.IDENTITY_INTERSECTIONALITY_AXES = [
  {
    "id": "gender",
    "label": "Gender, genderidentiteit en -expressie",
    "shortLabel": "Gender",
    "icon": "G",
    "description": "Hoe genderidentiteit, genderexpressie en maatschappelijke genderverwachtingen je toegang en behandeling kunnen beïnvloeden."
  },
  {
    "id": "ethnicity",
    "label": "Etniciteit, afkomst en racialisering",
    "shortLabel": "Afkomst",
    "icon": "A",
    "description": "Hoe afkomst, huidskleur, naam en de manier waarop anderen je racialiseren maatschappelijke kansen kunnen beïnvloeden."
  },
  {
    "id": "socioeconomic",
    "label": "Sociale klasse en sociaaleconomische positie",
    "shortLabel": "Socio-economisch",
    "icon": "S",
    "description": "De invloed van financiële zekerheid, vermogen, sociaal netwerk en de achtergrond waarin je bent opgegroeid."
  },
  {
    "id": "education",
    "label": "Onderwijs- en opleidingsniveau",
    "shortLabel": "Onderwijs",
    "icon": "O",
    "description": "Hoe diploma’s, erkenning van kwalificaties en praktisch of theoretisch onderwijs toegang tot kansen beïnvloeden."
  },
  {
    "id": "age",
    "label": "Leeftijd en levensfase",
    "shortLabel": "Leeftijd",
    "icon": "L",
    "description": "Hoe leeftijd en levensfase kunnen samenhangen met geloofwaardigheid, kansen, autonomie en toegang."
  },
  {
    "id": "sexualOrientation",
    "label": "Seksuele oriëntatie",
    "shortLabel": "Oriëntatie",
    "icon": "SO",
    "description": "Hoe heteronormativiteit, zichtbaarheid en veiligheid rondom seksuele oriëntatie kunnen doorwerken."
  },
  {
    "id": "disability",
    "label": "Lichamelijke of verstandelijke mogelijkheden",
    "shortLabel": "Toegankelijkheid",
    "icon": "T",
    "description": "Hoe beperkingen, chronische aandoeningen en de toegankelijkheid van omgevingen participatie beïnvloeden."
  },
  {
    "id": "mentalNeuro",
    "label": "Psychische gezondheid en neurodivergentie",
    "shortLabel": "Psychisch & neuro",
    "icon": "PN",
    "description": "Hoe psychische kwetsbaarheid, neurodivergentie, stigma en passende ondersteuning kunnen samenhangen."
  },
  {
    "id": "religion",
    "label": "Religie en levensbeschouwing",
    "shortLabel": "Levensbeschouwing",
    "icon": "R",
    "description": "Hoe een dominante, minderheids- of zichtbare levensbeschouwing invloed kan hebben op erkenning en ruimte."
  },
  {
    "id": "citizenship",
    "label": "Verblijfsstatus en staatsburgerschap",
    "shortLabel": "Verblijfsstatus",
    "icon": "V",
    "description": "Hoe paspoort, verblijfsrecht en administratieve zekerheid toegang tot rechten en voorzieningen beïnvloeden."
  },
  {
    "id": "language",
    "label": "Taal, accent en taligheid",
    "shortLabel": "Taal",
    "icon": "TA",
    "description": "Hoe beheersing van dominante talen, accent en erkenning van meertaligheid invloed hebben op deelname."
  },
  {
    "id": "geography",
    "label": "Geografische locatie en woonomgeving",
    "shortLabel": "Woonomgeving",
    "icon": "W",
    "description": "Hoe bereikbaarheid, vervoer en nabijheid van werk, onderwijs, zorg en diensten kansen beïnvloeden."
  },
  {
    "id": "appearance",
    "label": "Uiterlijk en lichaamsbouw",
    "shortLabel": "Uiterlijk",
    "icon": "U",
    "description": "Hoe lichaamsbouw, gewicht, zichtbare kenmerken en schoonheidsnormen sociale behandeling kunnen beïnvloeden."
  },
  {
    "id": "digital",
    "label": "Digitale toegang en geletterdheid",
    "shortLabel": "Digitaal",
    "icon": "D",
    "description": "Hoe toegang tot apparaten, verbinding, digitale vaardigheden en ondersteuning maatschappelijke deelname beïnvloeden."
  }
];

window.IDENTITY_INTERSECTIONALITY_CHOICE_SETS = {
  "agreement": [
    {
      "value": 1,
      "marker": "1",
      "label": "Helemaal oneens",
      "description": "Dit is vrijwel nooit mijn ervaring.",
      "score": 0
    },
    {
      "value": 2,
      "marker": "2",
      "label": "Oneens",
      "description": "Dit geldt eerder niet voor mij.",
      "score": 25
    },
    {
      "value": 3,
      "marker": "3",
      "label": "Deels / wisselend",
      "description": "Dit verschilt per situatie of periode.",
      "score": 50
    },
    {
      "value": 4,
      "marker": "4",
      "label": "Eens",
      "description": "Dit geldt meestal voor mij.",
      "score": 75
    },
    {
      "value": 5,
      "marker": "5",
      "label": "Helemaal eens",
      "description": "Dit is zeer duidelijk mijn ervaring.",
      "score": 100
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Dit antwoord wordt niet meegerekend.",
      "score": null
    }
  ],
  "barrierFrequency": [
    {
      "value": 1,
      "marker": "1",
      "label": "Nooit",
      "description": "Ik herken dit niet in mijn ervaring.",
      "score": 100
    },
    {
      "value": 2,
      "marker": "2",
      "label": "Zelden",
      "description": "Dit is uitzonderlijk gebeurd.",
      "score": 75
    },
    {
      "value": 3,
      "marker": "3",
      "label": "Soms",
      "description": "Dit komt af en toe voor.",
      "score": 50
    },
    {
      "value": 4,
      "marker": "4",
      "label": "Regelmatig",
      "description": "Dit speelt merkbaar in meerdere situaties.",
      "score": 25
    },
    {
      "value": 5,
      "marker": "5",
      "label": "Vaak",
      "description": "Dit is een terugkerende barrière.",
      "score": 0
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Dit antwoord wordt niet meegerekend.",
      "score": null
    }
  ],
  "position-gender": [
    {
      "value": "cis-man",
      "marker": "1",
      "label": "Cisgender man",
      "description": "Mijn genderidentiteit en geboortegeslacht komen overeen en ik identificeer mij als man.",
      "score": 90
    },
    {
      "value": "cis-woman",
      "marker": "2",
      "label": "Cisgender vrouw",
      "description": "Mijn genderidentiteit en geboortegeslacht komen overeen en ik identificeer mij als vrouw.",
      "score": 65
    },
    {
      "value": "trans",
      "marker": "3",
      "label": "Transgender persoon",
      "description": "Mijn genderidentiteit komt niet overeen met het geslacht dat mij bij geboorte werd toegewezen.",
      "score": 35
    },
    {
      "value": "nonbinary",
      "marker": "4",
      "label": "Non-binair of genderdivers",
      "description": "Mijn genderidentiteit valt niet uitsluitend binnen man of vrouw.",
      "score": 30
    },
    {
      "value": "intersex-other",
      "marker": "5",
      "label": "Intersekse of anders",
      "description": "Een andere gender- of seksepositie is voor mij relevanter.",
      "score": 30
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-ethnicity": [
    {
      "value": "dominant-majority",
      "marker": "1",
      "label": "Meestal gezien als deel van de dominante witte meerderheid",
      "description": "Mijn naam, uiterlijk of afkomst wordt in België meestal niet als minderheidskenmerk gelezen.",
      "score": 85
    },
    {
      "value": "context-dependent",
      "marker": "2",
      "label": "Mijn positie wisselt per omgeving",
      "description": "Ik word afhankelijk van de context soms als meerderheid en soms als minderheid gezien.",
      "score": 55
    },
    {
      "value": "racialised-minority",
      "marker": "3",
      "label": "Meestal geracialiseerd als zichtbare of culturele minderheid",
      "description": "Mijn naam, huidskleur, uiterlijk of afkomst wordt doorgaans als minderheidskenmerk gelezen.",
      "score": 30
    },
    {
      "value": "not-sure",
      "marker": "4",
      "label": "Ik weet dit niet of herken deze indeling niet",
      "description": "Mijn maatschappelijke positionering is niet eenduidig.",
      "score": 50
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-socioeconomic": [
    {
      "value": "high-security",
      "marker": "1",
      "label": "Ruime financiële zekerheid en sterke vangnetten",
      "description": "Onverwachte kosten en langere inkomensuitval zijn doorgaans op te vangen.",
      "score": 90
    },
    {
      "value": "stable",
      "marker": "2",
      "label": "Redelijk stabiele financiële situatie",
      "description": "De meeste kosten zijn haalbaar, maar grote tegenslagen vragen aanpassing.",
      "score": 70
    },
    {
      "value": "limited",
      "marker": "3",
      "label": "Beperkte financiële ruimte",
      "description": "Geldgebrek beperkt regelmatig keuzes of deelname.",
      "score": 40
    },
    {
      "value": "insecure",
      "marker": "4",
      "label": "Ernstige of langdurige financiële onzekerheid",
      "description": "Basisuitgaven, schulden of instabiel inkomen vormen een terugkerende druk.",
      "score": 20
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-education": [
    {
      "value": "tertiary",
      "marker": "1",
      "label": "Hoger onderwijs afgerond of gelijkwaardig erkend",
      "description": "Bachelor, master, graduaat of een gelijkwaardig erkende kwalificatie.",
      "score": 85
    },
    {
      "value": "upper-secondary",
      "marker": "2",
      "label": "Secundair, technisch of beroepsonderwijs afgerond",
      "description": "Mijn kwalificatie geeft toegang tot een deel van de arbeidsmarkt, maar niet tot alle formele functies.",
      "score": 65
    },
    {
      "value": "lower-secondary",
      "marker": "3",
      "label": "Geen diploma hoger secundair onderwijs",
      "description": "Formele diplomavereisten beperken mijn toegang merkbaar.",
      "score": 35
    },
    {
      "value": "unrecognised",
      "marker": "4",
      "label": "Diploma of ervaring wordt niet volledig erkend",
      "description": "Ik heb kennis of een buitenlands diploma dat niet vanzelf als gelijkwaardig wordt erkend.",
      "score": 35
    },
    {
      "value": "still-studying",
      "marker": "5",
      "label": "Nog in opleiding",
      "description": "Mijn uiteindelijke onderwijspositie is nog in ontwikkeling.",
      "score": 55
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-age": [
    {
      "value": "under-18",
      "marker": "1",
      "label": "Jonger dan 18 jaar",
      "description": "Minderjarigheid kan autonomie en toegang beperken.",
      "score": 40
    },
    {
      "value": "18-24",
      "marker": "2",
      "label": "18 tot en met 24 jaar",
      "description": "Een vroege levensfase kan minder status, inkomen of werkervaring betekenen.",
      "score": 60
    },
    {
      "value": "25-54",
      "marker": "3",
      "label": "25 tot en met 54 jaar",
      "description": "Deze leeftijdsgroep ligt doorgaans het dichtst bij de institutionele norm van de actieve beroepsleeftijd.",
      "score": 85
    },
    {
      "value": "55-64",
      "marker": "4",
      "label": "55 tot en met 64 jaar",
      "description": "Ervaring kan voordeel geven, terwijl leeftijdsselectie kan toenemen.",
      "score": 60
    },
    {
      "value": "65-plus",
      "marker": "5",
      "label": "65 jaar of ouder",
      "description": "Rechten en ervaring kunnen sterk zijn, maar leeftijdsbarrières en digitale of fysieke toegankelijkheid kunnen toenemen.",
      "score": 50
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-sexualOrientation": [
    {
      "value": "heterosexual",
      "marker": "1",
      "label": "Heteroseksueel",
      "description": "Mijn oriëntatie past binnen de maatschappelijke heteronorm.",
      "score": 90
    },
    {
      "value": "gay-lesbian",
      "marker": "2",
      "label": "Homo of lesbisch",
      "description": "Mijn oriëntatie valt buiten de heteronorm.",
      "score": 50
    },
    {
      "value": "bi-pan",
      "marker": "3",
      "label": "Bi-, pan- of multiseksueel",
      "description": "Mijn oriëntatie kan onzichtbaar, verkeerd begrepen of betwist worden.",
      "score": 45
    },
    {
      "value": "asexual-other",
      "marker": "4",
      "label": "Aseksueel, queer of anders",
      "description": "Mijn oriëntatie past niet vanzelf in dominante verwachtingen.",
      "score": 45
    },
    {
      "value": "questioning",
      "marker": "5",
      "label": "Ik ben dit nog aan het verkennen",
      "description": "Mijn positie is nog niet vastgelegd of benoemd.",
      "score": 50
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-disability": [
    {
      "value": "none",
      "marker": "1",
      "label": "Geen langdurige beperking of chronische aandoening",
      "description": "Mijn dagelijkse deelname vraagt doorgaans geen structurele aanpassingen.",
      "score": 90
    },
    {
      "value": "mild",
      "marker": "2",
      "label": "Lichte of wisselende beperking",
      "description": "Sommige situaties vragen aanpassing, maar veel omgevingen blijven toegankelijk.",
      "score": 65
    },
    {
      "value": "moderate",
      "marker": "3",
      "label": "Merkbare langdurige beperking of chronische aandoening",
      "description": "Toegankelijkheid, energie of ondersteuning beïnvloeden mijn deelname geregeld.",
      "score": 40
    },
    {
      "value": "severe",
      "marker": "4",
      "label": "Ernstige of meervoudige beperking",
      "description": "Veel omgevingen of systemen vragen substantiële ondersteuning of aanpassing.",
      "score": 20
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-mentalNeuro": [
    {
      "value": "none",
      "marker": "1",
      "label": "Geen relevante psychische kwetsbaarheid of neurodivergentie",
      "description": "Deze as vraagt momenteel geen bijzondere ondersteuning.",
      "score": 85
    },
    {
      "value": "managed",
      "marker": "2",
      "label": "Een kwetsbaarheid of neurodivergentie die meestal goed ondersteund is",
      "description": "Er is een relevante identiteit of ervaring, maar passende strategieën of steun zijn vaak beschikbaar.",
      "score": 60
    },
    {
      "value": "current",
      "marker": "3",
      "label": "Actuele psychische kwetsbaarheid of onvoldoende ondersteunde neurodivergentie",
      "description": "Stigma, prikkelbelasting, energie of toegang tot steun beïnvloeden mijn functioneren merkbaar.",
      "score": 40
    },
    {
      "value": "multiple",
      "marker": "4",
      "label": "Meerdere of zwaar doorwerkende kwetsbaarheden",
      "description": "Deze as heeft een grote invloed op dagelijkse deelname en veiligheid.",
      "score": 25
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-religion": [
    {
      "value": "dominant-secular",
      "marker": "1",
      "label": "Seculier of behorend tot een cultureel dominante traditie",
      "description": "Mijn levensbeschouwing vraagt doorgaans weinig uitleg of aanpassing in publieke instellingen.",
      "score": 80
    },
    {
      "value": "minority-not-visible",
      "marker": "2",
      "label": "Religieuze of levensbeschouwelijke minderheid die meestal niet zichtbaar is",
      "description": "Mijn positie wijkt af van de norm, maar is niet altijd direct herkenbaar.",
      "score": 55
    },
    {
      "value": "visible-minority",
      "marker": "3",
      "label": "Zichtbare religieuze of levensbeschouwelijke minderheid",
      "description": "Kleding, naam, rituelen of overtuigingen kunnen maatschappelijke behandeling beïnvloeden.",
      "score": 35
    },
    {
      "value": "mixed-other",
      "marker": "4",
      "label": "Gemengde, veranderende of andere levensbeschouwing",
      "description": "Mijn positie past niet volledig in één categorie.",
      "score": 50
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-citizenship": [
    {
      "value": "belgian",
      "marker": "1",
      "label": "Belgisch staatsburger",
      "description": "Ik heb volledige en stabiele burgerrechten in België.",
      "score": 90
    },
    {
      "value": "eu",
      "marker": "2",
      "label": "Burger van een andere EU-lidstaat",
      "description": "Ik heb ruime verblijfs- en arbeidsrechten binnen de EU, met enkele administratieve verschillen.",
      "score": 80
    },
    {
      "value": "permanent-non-eu",
      "marker": "3",
      "label": "Niet-EU-burger met duurzaam of permanent verblijf",
      "description": "Mijn verblijf is relatief stabiel, maar rechten en procedures kunnen verschillen.",
      "score": 60
    },
    {
      "value": "temporary",
      "marker": "4",
      "label": "Tijdelijk verblijfsrecht of verblijfsrecht gekoppeld aan studie, werk of familie",
      "description": "Mijn toegang kan afhankelijk zijn van voorwaarden en verlengingen.",
      "score": 40
    },
    {
      "value": "protection",
      "marker": "5",
      "label": "Erkende vluchtelingenstatus, subsidiaire bescherming of lopende asielprocedure",
      "description": "Rechten, procedures en onzekerheid kunnen mijn toegang sterk bepalen.",
      "score": 30
    },
    {
      "value": "undocumented",
      "marker": "6",
      "label": "Geen stabiel of officieel verblijfsrecht",
      "description": "Toegang tot werk, huisvesting, zorg en bescherming is zeer beperkt.",
      "score": 10
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-language": [
    {
      "value": "dominant-native",
      "marker": "1",
      "label": "Moedertaalspreker van de dominante standaardtaal in mijn omgeving",
      "description": "Mijn taal en accent worden meestal als vanzelfsprekend en gezaghebbend gezien.",
      "score": 90
    },
    {
      "value": "fluent-accent",
      "marker": "2",
      "label": "Zeer vlot, met een herkenbaar accent of andere moedertaal",
      "description": "Ik kan volledig deelnemen, maar mijn accent of taalachtergrond wordt soms opgemerkt.",
      "score": 70
    },
    {
      "value": "functional",
      "marker": "3",
      "label": "Functionele beheersing met merkbare beperkingen",
      "description": "Complexe gesprekken, formulieren of formele situaties kosten extra inspanning.",
      "score": 45
    },
    {
      "value": "limited",
      "marker": "4",
      "label": "Beperkte beheersing van de dominante taal",
      "description": "Taal vormt een duidelijke barrière in meerdere levensdomeinen.",
      "score": 20
    },
    {
      "value": "sign-language",
      "marker": "5",
      "label": "Gebarentaal of alternatieve communicatie is voor mij belangrijk",
      "description": "Toegang hangt sterk af van tolken, ondertiteling of communicatieaanpassingen.",
      "score": 35
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-geography": [
    {
      "value": "well-connected-city",
      "marker": "1",
      "label": "Stedelijk en goed verbonden",
      "description": "Werk, zorg, onderwijs, vervoer en diensten zijn meestal dichtbij of goed bereikbaar.",
      "score": 85
    },
    {
      "value": "suburban-town",
      "marker": "2",
      "label": "Stad, gemeente of randgebied met redelijke voorzieningen",
      "description": "De meeste voorzieningen zijn bereikbaar, soms met extra verplaatsing.",
      "score": 70
    },
    {
      "value": "rural-connected",
      "marker": "3",
      "label": "Landelijk gebied met voldoende vervoer of eigen mobiliteit",
      "description": "Afstand is merkbaar maar meestal overbrugbaar.",
      "score": 55
    },
    {
      "value": "remote",
      "marker": "4",
      "label": "Afgelegen of slecht verbonden woonomgeving",
      "description": "Afstand, vervoer of lokaal aanbod beperken regelmatig mijn keuzes.",
      "score": 30
    },
    {
      "value": "unstable-housing",
      "marker": "5",
      "label": "Instabiele huisvesting of geen vaste woonplaats",
      "description": "Woononzekerheid maakt toegang tot diensten en kansen extra kwetsbaar.",
      "score": 15
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-appearance": [
    {
      "value": "conforming",
      "marker": "1",
      "label": "Mijn uiterlijk en lichaamsbouw sluiten meestal aan bij dominante normen",
      "description": "Ik word zelden negatief beoordeeld om gewicht, lichaamsvorm of zichtbare kenmerken.",
      "score": 80
    },
    {
      "value": "mixed",
      "marker": "2",
      "label": "Mijn positie verschilt per omgeving",
      "description": "Sommige kenmerken passen binnen de norm en andere roepen sneller beoordeling op.",
      "score": 55
    },
    {
      "value": "stigmatised",
      "marker": "3",
      "label": "Mijn uiterlijk of lichaamsbouw wijkt zichtbaar af van dominante normen",
      "description": "Gewicht, littekens, huidaandoeningen, lichaamsvorm of andere kenmerken beïnvloeden behandeling merkbaar.",
      "score": 35
    },
    {
      "value": "not-sure",
      "marker": "4",
      "label": "Ik weet dit niet of herken deze indeling niet",
      "description": "Mijn positionering is niet eenduidig.",
      "score": 50
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ],
  "position-digital": [
    {
      "value": "strong",
      "marker": "1",
      "label": "Betrouwbare toegang en sterke digitale vaardigheden",
      "description": "Ik beschik over geschikte apparaten, verbinding en vaardigheden voor digitale diensten.",
      "score": 90
    },
    {
      "value": "adequate",
      "marker": "2",
      "label": "Voldoende toegang en basisvaardigheden",
      "description": "De meeste digitale taken lukken, al heb ik soms hulp nodig.",
      "score": 70
    },
    {
      "value": "limited",
      "marker": "3",
      "label": "Beperkte apparaten, verbinding of vaardigheden",
      "description": "Digitale vereisten kosten veel tijd of beperken mijn deelname.",
      "score": 40
    },
    {
      "value": "excluded",
      "marker": "4",
      "label": "Zeer beperkte digitale toegang of ondersteuning",
      "description": "Online-only processen sluiten mij regelmatig uit.",
      "score": 20
    },
    {
      "value": "prefer-not",
      "marker": "—",
      "label": "Zeg ik liever niet",
      "description": "Deze positie wordt niet in de score opgenomen.",
      "score": null
    }
  ]
};

window.IDENTITY_INTERSECTIONALITY_QUESTIONS = [
  {
    "id": "identity-intersectionality-01",
    "number": 1,
    "axisId": "gender",
    "questionType": "position",
    "category": "Gender",
    "choiceSet": "position-gender",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij je huidige maatschappelijke positie rond genderidentiteit en genderexpressie?"
  },
  {
    "id": "identity-intersectionality-02",
    "number": 2,
    "axisId": "gender",
    "questionType": "access",
    "category": "Gender",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Ik kan mijn genderidentiteit en genderexpressie tonen zonder voortdurend rekening te houden met afwijzing, onveiligheid of professionele gevolgen."
  },
  {
    "id": "identity-intersectionality-03",
    "number": 3,
    "axisId": "gender",
    "questionType": "barrier",
    "category": "Gender",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik ben minder serieus genomen, uitgesloten of anders behandeld vanwege mijn gender, genderidentiteit of genderexpressie."
  },
  {
    "id": "identity-intersectionality-04",
    "number": 4,
    "axisId": "ethnicity",
    "questionType": "position",
    "category": "Afkomst",
    "choiceSet": "position-ethnicity",
    "weight": 0.4,
    "text": "Hoe word je in België doorgaans maatschappelijk gelezen op basis van afkomst, naam, huidskleur of andere zichtbare kenmerken?"
  },
  {
    "id": "identity-intersectionality-05",
    "number": 5,
    "axisId": "ethnicity",
    "questionType": "access",
    "category": "Afkomst",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Ik verwacht bij solliciteren, wonen, winkelen, onderwijs en publieke diensten dezelfde eerste behandeling als iemand uit de dominante meerderheid."
  },
  {
    "id": "identity-intersectionality-06",
    "number": 6,
    "axisId": "ethnicity",
    "questionType": "barrier",
    "category": "Afkomst",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik ben benadeeld, gewantrouwd of anders behandeld vanwege mijn afkomst, naam, huidskleur of vermeende etniciteit."
  },
  {
    "id": "identity-intersectionality-07",
    "number": 7,
    "axisId": "socioeconomic",
    "questionType": "position",
    "category": "Socio-economisch",
    "choiceSet": "position-socioeconomic",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij je huidige financiële zekerheid en beschikbare vangnetten?"
  },
  {
    "id": "identity-intersectionality-08",
    "number": 8,
    "axisId": "socioeconomic",
    "questionType": "access",
    "category": "Socio-economisch",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Ik kan belangrijke kansen benutten, zoals opleiding, mobiliteit, zorg of een onverwachte uitgave, zonder dat geld meestal de doorslaggevende beperking vormt."
  },
  {
    "id": "identity-intersectionality-09",
    "number": 9,
    "axisId": "socioeconomic",
    "questionType": "barrier",
    "category": "Socio-economisch",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik heb kansen moeten laten liggen of deelname moeten beperken door geldgebrek, schulden, woononzekerheid of het ontbreken van een financieel netwerk."
  },
  {
    "id": "identity-intersectionality-10",
    "number": 10,
    "axisId": "education",
    "questionType": "position",
    "category": "Onderwijs",
    "choiceSet": "position-education",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij je huidige onderwijspositie en de erkenning van je kwalificaties?"
  },
  {
    "id": "identity-intersectionality-11",
    "number": 11,
    "axisId": "education",
    "questionType": "access",
    "category": "Onderwijs",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Mijn diploma’s, opleiding of aantoonbare ervaring geven mij toegang tot de functies en trajecten waarvoor ik inhoudelijk geschikt ben."
  },
  {
    "id": "identity-intersectionality-12",
    "number": 12,
    "axisId": "education",
    "questionType": "barrier",
    "category": "Onderwijs",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik ben onderschat of uitgesloten doordat mijn opleiding praktisch is, mijn diploma ontbreekt, of mijn kwalificatie niet werd erkend."
  },
  {
    "id": "identity-intersectionality-13",
    "number": 13,
    "axisId": "age",
    "questionType": "position",
    "category": "Leeftijd",
    "choiceSet": "position-age",
    "weight": 0.4,
    "text": "In welke leeftijdsgroep bevind je je?"
  },
  {
    "id": "identity-intersectionality-14",
    "number": 14,
    "axisId": "age",
    "questionType": "access",
    "category": "Leeftijd",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Mijn leeftijd wordt meestal als passend gezien voor de verantwoordelijkheden, kansen en zelfstandigheid die ik zoek."
  },
  {
    "id": "identity-intersectionality-15",
    "number": 15,
    "axisId": "age",
    "questionType": "barrier",
    "category": "Leeftijd",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik ben vanwege mijn leeftijd als te jong, te oud, minder betrouwbaar of minder leerbaar behandeld."
  },
  {
    "id": "identity-intersectionality-16",
    "number": 16,
    "axisId": "sexualOrientation",
    "questionType": "position",
    "category": "Oriëntatie",
    "choiceSet": "position-sexualOrientation",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij je seksuele oriëntatie?"
  },
  {
    "id": "identity-intersectionality-17",
    "number": 17,
    "axisId": "sexualOrientation",
    "questionType": "access",
    "category": "Oriëntatie",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Ik kan open zijn over relaties of aantrekking zonder dat ik mijn veiligheid, werk, familiecontact of sociale acceptatie hoef af te wegen."
  },
  {
    "id": "identity-intersectionality-18",
    "number": 18,
    "axisId": "sexualOrientation",
    "questionType": "barrier",
    "category": "Oriëntatie",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik ben uitgesloten, beledigd, bedreigd of anders behandeld vanwege mijn werkelijke of veronderstelde seksuele oriëntatie."
  },
  {
    "id": "identity-intersectionality-19",
    "number": 19,
    "axisId": "disability",
    "questionType": "position",
    "category": "Toegankelijkheid",
    "choiceSet": "position-disability",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij de invloed van een lichamelijke, zintuiglijke, verstandelijke of langdurige gezondheidsbeperking op je dagelijks leven?"
  },
  {
    "id": "identity-intersectionality-20",
    "number": 20,
    "axisId": "disability",
    "questionType": "access",
    "category": "Toegankelijkheid",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Gebouwen, vervoer, informatie, werktijden en digitale diensten zijn doorgaans bruikbaar zonder dat ik zelf telkens om aanpassingen moet vragen."
  },
  {
    "id": "identity-intersectionality-21",
    "number": 21,
    "axisId": "disability",
    "questionType": "barrier",
    "category": "Toegankelijkheid",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik heb niet kunnen deelnemen of ben minderwaardig behandeld omdat een omgeving niet toegankelijk was of mijn ondersteuningsbehoefte niet serieus werd genomen."
  },
  {
    "id": "identity-intersectionality-22",
    "number": 22,
    "axisId": "mentalNeuro",
    "questionType": "position",
    "category": "Psychisch & neuro",
    "choiceSet": "position-mentalNeuro",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij de invloed van psychische kwetsbaarheid of neurodivergentie op je dagelijks functioneren?"
  },
  {
    "id": "identity-intersectionality-23",
    "number": 23,
    "axisId": "mentalNeuro",
    "questionType": "access",
    "category": "Psychisch & neuro",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Ik kan passende ondersteuning, rust, uitleg of aanpassingen vragen zonder dat mijn betrouwbaarheid of competentie daardoor direct in twijfel wordt getrokken."
  },
  {
    "id": "identity-intersectionality-24",
    "number": 24,
    "axisId": "mentalNeuro",
    "questionType": "barrier",
    "category": "Psychisch & neuro",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik heb kansen, relaties of deelname verloren door stigma, onbegrip, prikkelbelasting of onvoldoende ondersteuning rond psychische gezondheid of neurodivergentie."
  },
  {
    "id": "identity-intersectionality-25",
    "number": 25,
    "axisId": "religion",
    "questionType": "position",
    "category": "Levensbeschouwing",
    "choiceSet": "position-religion",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij je religieuze of levensbeschouwelijke positie in je dagelijkse omgeving?"
  },
  {
    "id": "identity-intersectionality-26",
    "number": 26,
    "axisId": "religion",
    "questionType": "access",
    "category": "Levensbeschouwing",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Ik kan mijn levensbeschouwing volgen, tonen of niet volgen zonder dat dit mijn toegang tot werk, onderwijs, dienstverlening of sociale veiligheid beperkt."
  },
  {
    "id": "identity-intersectionality-27",
    "number": 27,
    "axisId": "religion",
    "questionType": "barrier",
    "category": "Levensbeschouwing",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik ben uitgesloten, bespot, verdacht gemaakt of benadeeld vanwege mijn religie, levensbeschouwing, kleding of veronderstelde overtuiging."
  },
  {
    "id": "identity-intersectionality-28",
    "number": 28,
    "axisId": "citizenship",
    "questionType": "position",
    "category": "Verblijfsstatus",
    "choiceSet": "position-citizenship",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij je huidige verblijfsstatus of staatsburgerschap in België?"
  },
  {
    "id": "identity-intersectionality-29",
    "number": 29,
    "axisId": "citizenship",
    "questionType": "access",
    "category": "Verblijfsstatus",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Mijn verblijfsstatus geeft mij voorspelbare toegang tot werk, huisvesting, zorg, onderwijs, reizen en administratieve procedures."
  },
  {
    "id": "identity-intersectionality-30",
    "number": 30,
    "axisId": "citizenship",
    "questionType": "barrier",
    "category": "Verblijfsstatus",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik heb kansen, rechten of diensten misgelopen door mijn paspoort, verblijfsdocumenten, nationaliteit of een onzekere procedure."
  },
  {
    "id": "identity-intersectionality-31",
    "number": 31,
    "axisId": "language",
    "questionType": "position",
    "category": "Taal",
    "choiceSet": "position-language",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij je beheersing van de dominante taal in de omgevingen waarin je woont, studeert of werkt?"
  },
  {
    "id": "identity-intersectionality-32",
    "number": 32,
    "axisId": "language",
    "questionType": "access",
    "category": "Taal",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Ik kan in gesprekken, formulieren, onderwijs en professionele situaties duidelijk overbrengen wat ik bedoel, zonder structureel afhankelijk te zijn van iemand anders."
  },
  {
    "id": "identity-intersectionality-33",
    "number": 33,
    "axisId": "language",
    "questionType": "barrier",
    "category": "Taal",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Mijn accent, taalniveau, meertaligheid of communicatiewijze heeft ertoe geleid dat mensen mijn intelligentie, deskundigheid of betrouwbaarheid lager inschatten."
  },
  {
    "id": "identity-intersectionality-34",
    "number": 34,
    "axisId": "geography",
    "questionType": "position",
    "category": "Woonomgeving",
    "choiceSet": "position-geography",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij je woonomgeving en de bereikbaarheid van dagelijkse voorzieningen?"
  },
  {
    "id": "identity-intersectionality-35",
    "number": 35,
    "axisId": "geography",
    "questionType": "access",
    "category": "Woonomgeving",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Werk, onderwijs, zorg, winkels, sociale contacten en overheidsdiensten zijn voor mij binnen redelijke tijd en kosten bereikbaar."
  },
  {
    "id": "identity-intersectionality-36",
    "number": 36,
    "axisId": "geography",
    "questionType": "barrier",
    "category": "Woonomgeving",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Afstand, vervoersgebrek, beperkte lokale voorzieningen of woononzekerheid hebben mijn kansen of deelname merkbaar beperkt."
  },
  {
    "id": "identity-intersectionality-37",
    "number": 37,
    "axisId": "appearance",
    "questionType": "position",
    "category": "Uiterlijk",
    "choiceSet": "position-appearance",
    "weight": 0.4,
    "text": "Hoe verhoudt je uiterlijk of lichaamsbouw zich volgens jou tot dominante normen in de omgevingen waarin je meestal komt?"
  },
  {
    "id": "identity-intersectionality-38",
    "number": 38,
    "axisId": "appearance",
    "questionType": "access",
    "category": "Uiterlijk",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Ik kan rekenen op respectvolle behandeling zonder dat gewicht, lichaamsvorm, littekens, huidaandoeningen of andere zichtbare kenmerken veel invloed hebben."
  },
  {
    "id": "identity-intersectionality-39",
    "number": 39,
    "axisId": "appearance",
    "questionType": "barrier",
    "category": "Uiterlijk",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik ben uitgelachen, uitgesloten, geseksualiseerd of minder professioneel behandeld vanwege mijn uiterlijk of lichaamsbouw."
  },
  {
    "id": "identity-intersectionality-40",
    "number": 40,
    "axisId": "digital",
    "questionType": "position",
    "category": "Digitaal",
    "choiceSet": "position-digital",
    "weight": 0.4,
    "text": "Welke omschrijving past het best bij je digitale toegang en vaardigheden?"
  },
  {
    "id": "identity-intersectionality-41",
    "number": 41,
    "axisId": "digital",
    "questionType": "access",
    "category": "Digitaal",
    "choiceSet": "agreement",
    "weight": 0.3,
    "text": "Ik kan zelfstandig werken met digitale overheidsdiensten, online formulieren, beveiligde accounts en de apparaten die studie of werk vereisen."
  },
  {
    "id": "identity-intersectionality-42",
    "number": 42,
    "axisId": "digital",
    "questionType": "barrier",
    "category": "Digitaal",
    "choiceSet": "barrierFrequency",
    "weight": 0.3,
    "text": "Ik heb kansen, diensten of informatie gemist doordat een proces uitsluitend digitaal was of doordat geschikte apparatuur, verbinding of hulp ontbrak."
  }
];
