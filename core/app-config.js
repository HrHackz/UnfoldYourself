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
    "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"8\" r=\"3.2\"></circle><path d=\"M5.5 20c.8-4.1 3-6.2 6.5-6.2s5.7 2.1 6.5 6.2\"></path><path d=\"M18.2 4.2l.55 1.25 1.25.55-1.25.55-.55 1.25-.55-1.25-1.25-.55 1.25-.55.55-1.25Z\"></path></svg>",
    "title": "Persoonlijkheid & zelfbeeld",
    "color": "#F90E8E",
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
    "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"8.3\" cy=\"9\" r=\"3.2\"></circle><circle cx=\"15.7\" cy=\"9\" r=\"3.2\"></circle><path d=\"M3.5 20c.5-3.7 2.1-5.6 4.8-5.6 1.6 0 2.8.7 3.7 2\"></path><path d=\"M12 16.4c.9-1.3 2.1-2 3.7-2 2.7 0 4.3 1.9 4.8 5.6\"></path></svg>",
    "title": "Identiteit & maatschappelijke positie",
    "color": "#F84F6C",
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
    "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z\"></path><circle cx=\"12\" cy=\"12\" r=\"1.2\"></circle></svg>",
    "title": "Werkoriëntatie & beroepsrichting",
    "color": "#F9CE66",
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
    "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M9.2 4.2A3.5 3.5 0 0 0 6 9.1 3.4 3.4 0 0 0 6.7 15 3.3 3.3 0 0 0 11 19.5V5.4a2 2 0 0 0-1.8-1.2Z\"></path><path d=\"M14.8 4.2A3.5 3.5 0 0 1 18 9.1a3.4 3.4 0 0 1-.7 5.9 3.3 3.3 0 0 1-4.3 4.5V5.4a2 2 0 0 1 1.8-1.2Z\"></path><path d=\"M7.2 9.2h3.2M13.6 9.2h3.2M7.5 14.1h2.9M13.6 14.1h2.9\"></path></svg>",
    "title": "Denken & redeneervermogen",
    "color": "#0CD29F",
    "tests": [
      [
        "Cognitieve vaardigheidsbatterij",
        "Modulaire meting van numeriek, verbaal, abstract, ruimtelijk en kritisch redeneren, aandacht en werkgeheugen."
      ]
    ]
  },
  {
    "id": "vaardigheden",
    "short": "DV",
    "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"13\" rx=\"2.4\"></rect><path d=\"M8 21h8M12 17v4M9.3 8.2 7.5 10l1.8 1.8M14.7 8.2l1.8 1.8-1.8 1.8\"></path></svg>",
    "title": "Digitale vaardigheden",
    "color": "#0DCED1",
    "tests": [
      [
        "Digitale skills",
        "Zelfreflectie over informatie, communicatie, digitale inhoud, veiligheid en probleemoplossing op basis van DigCompSAT."
      ]
    ]
  },
  {
    "id": "samenwerking",
    "short": "SL",
    "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"7.5\" r=\"3\"></circle><circle cx=\"5.5\" cy=\"10\" r=\"2.2\"></circle><circle cx=\"18.5\" cy=\"10\" r=\"2.2\"></circle><path d=\"M6.5 20c.5-3.8 2.3-5.8 5.5-5.8s5 2 5.5 5.8M1.8 19c.3-2.7 1.5-4.1 3.7-4.1 1.1 0 2 .4 2.7 1.2M22.2 19c-.3-2.7-1.5-4.1-3.7-4.1-1.1 0-2 .4-2.7 1.2\"></path></svg>",
    "title": "Samenwerking, leiderschap & cultuur",
    "color": "#0D93D1",
    "tests": [
      [
        "Leiderschapstest",
        "Twaalf leiderschapsstijlen en de flexibiliteit waarmee je richting geeft, begeleidt, steunt en delegeert."
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
    "icon": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M20.6 5.8c-2.2-2.3-5.8-1.6-7.2.7L12 8.6l-1.4-2.1C9.2 4.2 5.6 3.5 3.4 5.8 1 8.4 2.1 12 4.2 14.2L12 21l7.8-6.8c2.1-2.2 3.2-5.8.8-8.4Z\"></path><path d=\"M5.8 12h3l1.2-2.3 2.1 4.7 1.5-2.4h4.6\"></path></svg>",
    "title": "Werkbeleving, welzijn & balans",
    "color": "#AA0DD1",
    "tests": [
      [
        "Werkbelevings- en welzijnstest",
        "Actuele werkdruk, autonomie, steun, duidelijkheid, rechtvaardigheid, bevlogenheid, tevredenheid, herstel, balans en psychologische veiligheid."
      ]
    ]
  }
];

const totalTests = domains.reduce((sum, domain) => sum + domain.tests.length, 0);
