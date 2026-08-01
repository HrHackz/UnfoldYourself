"use strict";

/*
  Unfold Yourself — applicatieconfiguratie en testcatalogus
  Afhankelijkheden: geen.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

const PROFILE_STORAGE_KEY = "unfold-yourself-profile-v1";
const LEGACY_PROFILE_STORAGE_KEY = "unfold-yourself-big-five-v1";

const domains = [
  {
    "id": "persoonlijkheid",
    "short": "PZ",
    "title": "Persoonlijkheid & zelfbeeld",
    "color": "#6f5cff",
    "tests": [
      [
        "Big Five-test",
        "Brede persoonlijkheidsstructuur volgens het Five-Factor Model."
      ],
      [
        "HEXACO-test",
        "Persoonlijkheid binnen zes factoren, inclusief eerlijkheid en bescheidenheid."
      ],
      [
        "16 Persoonlijkheden-test",
        "Voorkeuren in energie, informatieverwerking, besluitvorming en levensstijl."
      ],
      [
        "DISC-gedragsstijltest",
        "Gedrags-, communicatie- en interactiestijl in contact en samenwerking."
      ],
      [
        "Zelfbeeld-, waarden- en drijfverentest",
        "Zelfwaardering, algemene waarden, drijfveren en besluitvormingsstijl."
      ]
    ]
  },
  {
    "id": "identiteit",
    "short": "IM",
    "title": "Identiteit & maatschappelijke positie",
    "color": "#b0528d",
    "tests": [
      [
        "Deelidentiteiten- en kruispuntdenkentest",
        "Structurele voordelen en barrières binnen de Belgische maatschappelijke context."
      ]
    ]
  },
  {
    "id": "werkorientatie",
    "short": "WO",
    "title": "Werkoriëntatie & beroepsrichting",
    "color": "#d96d4b",
    "tests": [
      [
        "Interesse- en beroepsrichtingentest",
        "RIASEC-interesses, favoriete werkzaamheden en relevante beroepsfamilies."
      ],
      [
        "Werkwaarden- en werkmotivatietest",
        "Wat je in werk zoekt, waardeert en motiverend of demotiverend vindt."
      ]
    ]
  },
  {
    "id": "denken",
    "short": "DR",
    "title": "Denken & redeneervermogen",
    "color": "#3875c5",
    "tests": [
      [
        "Cognitieve vaardigheidsbatterij",
        "Modulaire meting van numeriek, verbaal, abstract, ruimtelijk en kritisch redeneren, aandacht en werkgeheugen."
      ]
    ]
  },
  {
    "id": "vaardigheden",
    "short": "VP",
    "title": "Vaardigheden & professioneel werkgedrag",
    "color": "#159b83",
    "tests": [
      [
        "Softskillstest",
        "Communicatie, samenwerking, probleemoplossing, aanpassingsvermogen, organisatie, zelfmanagement, professioneel handelen en feedback."
      ],
      [
        "Digitale basisvaardigheden- en AI-test",
        "Digitale informatie, communicatie, gegevensbeheer, hulpmiddelen, AI, privacy, inclusie en probleemoplossing."
      ],
      [
        "Digitale werkplektest",
        "Afzonderlijke niveaus voor Windows, Word, Excel en PowerPoint, samengebracht in één werkplekprofiel."
      ],
      [
        "Computerbeveiligingstest",
        "Phishing, wachtwoorden, privacy, updates, apparaten, gegevensdeling en veilig digitaal werken."
      ]
    ]
  },
  {
    "id": "samenwerking",
    "short": "SL",
    "title": "Samenwerking, leiderschap & cultuur",
    "color": "#7a5ea6",
    "tests": [
      [
        "Leiderschapstest",
        "Richting geven, ondersteunen, delegeren, besluiten, ontwikkelen, veranderen en ethisch inclusief leiden."
      ],
      [
        "Teamrol- en samenwerkingsstijltest",
        "Voorkeursrollen, bijdragen en samenwerkingspatronen binnen teams."
      ],
      [
        "Werkomgeving- en cultuurvoorkeurtest",
        "Voorkeuren voor hiërarchie, samenwerking, stabiliteit, resultaat, formaliteit, autonomie en innovatie."
      ]
    ]
  },
  {
    "id": "werkbeleving",
    "short": "WW",
    "title": "Werkbeleving, welzijn & balans",
    "color": "#2f855f",
    "tests": [
      [
        "Werkbelevings- en welzijnstest",
        "Actuele werkdruk, autonomie, steun, duidelijkheid, rechtvaardigheid, bevlogenheid, tevredenheid, herstel, balans en psychologische veiligheid."
      ]
    ]
  }
];

const totalTests = domains.reduce((sum, domain) => sum + domain.tests.length, 0);
