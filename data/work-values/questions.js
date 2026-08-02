"use strict";

/*
  Werkwaarden- en werkmotivatietest — testdata
  45 korte stellingen, één per scherm, met één vaste vijfpuntsschaal.
  Exact vijf stellingen per dimensie:
  - twee werkwaarde-items;
  - één direct motivator-item;
  - twee demotivator-items.
*/

window.WORK_VALUES_DIMENSIONS = [
  {
    "id": "autonomy",
    "short": "Vrijheid",
    "title": "Vrijheid & autonomie",
    "description": "Handelingsruimte, zelfstandigheid en invloed op de eigen werkwijze.",
    "seeks": "ruimte om je werk zelf te organiseren, je eigen methode te kiezen en zelfstandig beslissingen te nemen",
    "supports": "duidelijke doelen en grenzen, gecombineerd met vertrouwen in je aanpak",
    "risk": "micromanagement, starre procedures en voortdurende controle",
    "vacancyQuestion": "Hoeveel vrijheid heb ik om mijn werk zelf te organiseren?"
  },
  {
    "id": "reward",
    "short": "Beloning",
    "title": "Beloning & vooruitgang",
    "description": "Eerlijke beloning, erkenning en zichtbare ontwikkel- of doorgroeimogelijkheden.",
    "seeks": "een eerlijke verhouding tussen inzet, verantwoordelijkheid, beloning, erkenning en vooruitgang",
    "supports": "transparante voorwaarden, zichtbare waardering en realistische kansen om verder te groeien",
    "risk": "extra inzet of verantwoordelijkheid zonder erkenning, betere voorwaarden of perspectief",
    "vacancyQuestion": "Hoe worden prestaties erkend en welke doorgroeimogelijkheden zijn er?"
  },
  {
    "id": "connection",
    "short": "Verbondenheid",
    "title": "Verbondenheid & samenwerking",
    "description": "Contact, ondersteuning, vertrouwen en gezamenlijke resultaten.",
    "seeks": "betekenisvol contact, samenwerking en het gevoel bij een team te horen",
    "supports": "collega’s die informatie delen, elkaar helpen en gezamenlijke resultaten erkennen",
    "risk": "langdurige sociale isolatie, weinig contact of onvoldoende onderlinge steun",
    "vacancyQuestion": "Hoe werkt het team in de praktijk samen?"
  },
  {
    "id": "creativity",
    "short": "Creativiteit",
    "title": "Creativiteit & afwisseling",
    "description": "Nieuwe ideeën, variatie en ruimte om werkwijzen te verbeteren.",
    "seeks": "afwisseling, nieuwe vraagstukken en ruimte om ideeën of verbeteringen uit te proberen",
    "supports": "opdrachten waarin je mag vernieuwen, experimenteren en bestaande aanpakken verbeteren",
    "risk": "sterk repetitief werk zonder veranderingsruimte of inhoudelijke variatie",
    "vacancyQuestion": "Hoeveel afwisseling en vernieuwingsruimte biedt de functie?"
  },
  {
    "id": "security",
    "short": "Zekerheid",
    "title": "Zekerheid & structuur",
    "description": "Duidelijkheid, betrouwbare afspraken en een voorspelbare basis.",
    "seeks": "heldere verwachtingen, stabiele afspraken en voldoende houvast om vooruit te plannen",
    "supports": "tijdige communicatie, duidelijke rollen en betrouwbare arbeidsvoorwaarden",
    "risk": "voortdurende onverwachte veranderingen en onzekerheid over je rol of toekomst",
    "vacancyQuestion": "Hoe stabiel zijn taken, planning en arbeidsvoorwaarden?"
  },
  {
    "id": "mastery",
    "short": "Vakmanschap",
    "title": "Vakmanschap & uitdaging",
    "description": "Kwaliteit, leren, probleemoplossing en verdere expertise.",
    "seeks": "inhoudelijk uitdagend werk waarin je kennis verdiept, problemen oplost en kwaliteit kunt leveren",
    "supports": "voldoende leerkansen, uitdagende opdrachten en ruimte om zorgvuldig te werken",
    "risk": "oppervlakkig haastwerk zonder ruimte voor kwaliteit of verdere ontwikkeling",
    "vacancyQuestion": "Welke mogelijkheden bestaan er om expertise op te bouwen?"
  },
  {
    "id": "meaning",
    "short": "Zingeving",
    "title": "Zingeving & maatschappelijke bijdrage",
    "description": "Werk waarvan je de waarde begrijpt en waar je persoonlijk achter kunt staan.",
    "seeks": "een herkenbare bijdrage aan mensen, de samenleving, het milieu of een doel dat je belangrijk vindt",
    "supports": "zichtbare positieve impact en een organisatie waarvan het handelen voldoende aansluit bij je waarden",
    "risk": "een fundamenteel waardenconflict of werk waarvan de betekenis onduidelijk blijft",
    "vacancyQuestion": "Welke maatschappelijke of menselijke bijdrage levert het werk?"
  },
  {
    "id": "influence",
    "short": "Invloed",
    "title": "Invloed & verantwoordelijkheid",
    "description": "Inspraak, beslissingen nemen, richting geven en verantwoordelijkheid dragen.",
    "seeks": "echte invloed op beslissingen, prioriteiten, mensen, middelen of resultaten",
    "supports": "verantwoordelijkheid die gepaard gaat met voldoende bevoegdheid en beschikbare middelen",
    "risk": "verantwoordelijk worden gehouden zonder inspraak of beslissingsruimte",
    "vacancyQuestion": "Welke beslissingen mag ik zelfstandig nemen?"
  },
  {
    "id": "tangible",
    "short": "Tastbaar resultaat",
    "title": "Praktisch & tastbaar resultaat",
    "description": "Concrete activiteit en zichtbaar, merkbaar of afgerond resultaat.",
    "seeks": "werk waarbij je actief iets maakt, herstelt, organiseert, verbetert of zichtbaar afrondt",
    "supports": "concrete taken en een duidelijk resultaat dat je kunt zien of merken",
    "risk": "uitsluitend abstract werk zonder beweging of herkenbaar eindresultaat",
    "vacancyQuestion": "Welk concreet resultaat lever ik met deze functie?"
  }
];

window.WORK_VALUES_DIMENSION_BY_ID = Object.fromEntries(
  window.WORK_VALUES_DIMENSIONS.map(dimension => [dimension.id, dimension])
);

window.WORK_VALUES_CHOICES = [
  {
    "value": 1,
    "marker": "1",
    "label": "Helemaal oneens",
    "description": "Deze uitspraak past helemaal niet bij wat ik in werk belangrijk of motiverend vind."
  },
  {
    "value": 2,
    "marker": "2",
    "label": "Oneens",
    "description": "Deze uitspraak past eerder niet bij mij."
  },
  {
    "value": 3,
    "marker": "3",
    "label": "Neutraal",
    "description": "Ik twijfel, heb geen duidelijke voorkeur of dit hangt sterk van de situatie af."
  },
  {
    "value": 4,
    "marker": "4",
    "label": "Eens",
    "description": "Deze uitspraak past meestal bij mij."
  },
  {
    "value": 5,
    "marker": "5",
    "label": "Helemaal eens",
    "description": "Deze uitspraak past zeer sterk bij mij."
  }
];

window.WORK_VALUES_QUESTIONS = [
  {
    "id": "wv-01",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het belangrijk dat ik zelf kan bepalen hoe ik mijn werk aanpak.",
    "dimension": "autonomy",
    "facet": "value"
  },
  {
    "id": "wv-02",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verkies een functie waarin ik mijn werk grotendeels zelf kan plannen.",
    "dimension": "autonomy",
    "facet": "value"
  },
  {
    "id": "wv-03",
    "category": "Werkwaarden en motivatie",
    "text": "Ik krijg energie wanneer ik zelfstandig beslissingen mag nemen.",
    "dimension": "autonomy",
    "facet": "motivator"
  },
  {
    "id": "wv-04",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verlies motivatie wanneer iedere stap voor mij wordt bepaald.",
    "dimension": "autonomy",
    "facet": "demotivator"
  },
  {
    "id": "wv-05",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind voortdurende controle op mijn werk demotiverend.",
    "dimension": "autonomy",
    "facet": "demotivator"
  },
  {
    "id": "wv-06",
    "category": "Werkwaarden en motivatie",
    "text": "Een eerlijke beloning voor mijn werk is belangrijk voor mij.",
    "dimension": "reward",
    "facet": "value"
  },
  {
    "id": "wv-07",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind duidelijke kansen om vooruit te gaan belangrijk.",
    "dimension": "reward",
    "facet": "value"
  },
  {
    "id": "wv-08",
    "category": "Werkwaarden en motivatie",
    "text": "Ik krijg energie wanneer goede prestaties zichtbaar worden gewaardeerd.",
    "dimension": "reward",
    "facet": "motivator"
  },
  {
    "id": "wv-09",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verlies motivatie wanneer extra inzet niet wordt erkend.",
    "dimension": "reward",
    "facet": "demotivator"
  },
  {
    "id": "wv-10",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het demotiverend wanneer meer verantwoordelijkheid niets extra oplevert.",
    "dimension": "reward",
    "facet": "demotivator"
  },
  {
    "id": "wv-11",
    "category": "Werkwaarden en motivatie",
    "text": "Regelmatig contact met collega’s is belangrijk voor mij.",
    "dimension": "connection",
    "facet": "value"
  },
  {
    "id": "wv-12",
    "category": "Werkwaarden en motivatie",
    "text": "Ik werk het liefst in een team waarin mensen elkaar helpen.",
    "dimension": "connection",
    "facet": "value"
  },
  {
    "id": "wv-13",
    "category": "Werkwaarden en motivatie",
    "text": "Ik krijg energie van samen werken aan een gezamenlijk resultaat.",
    "dimension": "connection",
    "facet": "motivator"
  },
  {
    "id": "wv-14",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verlies motivatie wanneer ik het grootste deel van de tijd alleen werk.",
    "dimension": "connection",
    "facet": "demotivator"
  },
  {
    "id": "wv-15",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het demotiverend wanneer collega’s elkaar nauwelijks ondersteunen.",
    "dimension": "connection",
    "facet": "demotivator"
  },
  {
    "id": "wv-16",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het belangrijk dat ik nieuwe ideeën kan voorstellen.",
    "dimension": "creativity",
    "facet": "value"
  },
  {
    "id": "wv-17",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verkies werk met voldoende afwisseling.",
    "dimension": "creativity",
    "facet": "value"
  },
  {
    "id": "wv-18",
    "category": "Werkwaarden en motivatie",
    "text": "Ik krijg energie wanneer ik een bestaande aanpak mag verbeteren.",
    "dimension": "creativity",
    "facet": "motivator"
  },
  {
    "id": "wv-19",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verlies motivatie door langdurig dezelfde taken te herhalen.",
    "dimension": "creativity",
    "facet": "demotivator"
  },
  {
    "id": "wv-20",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het demotiverend wanneer er geen ruimte is om iets nieuws te proberen.",
    "dimension": "creativity",
    "facet": "demotivator"
  },
  {
    "id": "wv-21",
    "category": "Werkwaarden en motivatie",
    "text": "Duidelijke verwachtingen over mijn werk zijn belangrijk voor mij.",
    "dimension": "security",
    "facet": "value"
  },
  {
    "id": "wv-22",
    "category": "Werkwaarden en motivatie",
    "text": "Ik hecht belang aan stabiele en betrouwbare werkafspraken.",
    "dimension": "security",
    "facet": "value"
  },
  {
    "id": "wv-23",
    "category": "Werkwaarden en motivatie",
    "text": "Ik werk gemotiveerder wanneer rollen en planning duidelijk zijn.",
    "dimension": "security",
    "facet": "motivator"
  },
  {
    "id": "wv-24",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verlies motivatie door onverwachte veranderingen zonder goede uitleg.",
    "dimension": "security",
    "facet": "demotivator"
  },
  {
    "id": "wv-25",
    "category": "Werkwaarden en motivatie",
    "text": "Onzekerheid over mijn functie of toekomst werkt demotiverend voor mij.",
    "dimension": "security",
    "facet": "demotivator"
  },
  {
    "id": "wv-26",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het belangrijk dat ik in mijn werk kan blijven leren.",
    "dimension": "mastery",
    "facet": "value"
  },
  {
    "id": "wv-27",
    "category": "Werkwaarden en motivatie",
    "text": "Ik hecht veel belang aan het leveren van kwalitatief werk.",
    "dimension": "mastery",
    "facet": "value"
  },
  {
    "id": "wv-28",
    "category": "Werkwaarden en motivatie",
    "text": "Ik krijg energie van moeilijke problemen die ik moet uitzoeken.",
    "dimension": "mastery",
    "facet": "motivator"
  },
  {
    "id": "wv-29",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verlies motivatie wanneer werk vooral snel en oppervlakkig moet gebeuren.",
    "dimension": "mastery",
    "facet": "demotivator"
  },
  {
    "id": "wv-30",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het demotiverend wanneer ik mij inhoudelijk niet verder kan ontwikkelen.",
    "dimension": "mastery",
    "facet": "demotivator"
  },
  {
    "id": "wv-31",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het belangrijk dat mijn werk een positieve bijdrage levert.",
    "dimension": "meaning",
    "facet": "value"
  },
  {
    "id": "wv-32",
    "category": "Werkwaarden en motivatie",
    "text": "Ik wil kunnen achterstaan bij het doel en handelen van mijn werkgever.",
    "dimension": "meaning",
    "facet": "value"
  },
  {
    "id": "wv-33",
    "category": "Werkwaarden en motivatie",
    "text": "Ik krijg energie wanneer ik duidelijk zie wie of wat met mijn werk geholpen is.",
    "dimension": "meaning",
    "facet": "motivator"
  },
  {
    "id": "wv-34",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verlies motivatie wanneer mijn werk botst met mijn belangrijke waarden.",
    "dimension": "meaning",
    "facet": "demotivator"
  },
  {
    "id": "wv-35",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het demotiverend wanneer het nut van mijn werk onduidelijk blijft.",
    "dimension": "meaning",
    "facet": "demotivator"
  },
  {
    "id": "wv-36",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het belangrijk dat mijn mening meetelt bij beslissingen.",
    "dimension": "influence",
    "facet": "value"
  },
  {
    "id": "wv-37",
    "category": "Werkwaarden en motivatie",
    "text": "Ik neem graag verantwoordelijkheid wanneer ik ook voldoende bevoegdheid krijg.",
    "dimension": "influence",
    "facet": "value"
  },
  {
    "id": "wv-38",
    "category": "Werkwaarden en motivatie",
    "text": "Ik krijg energie wanneer ik richting kan geven aan belangrijke resultaten.",
    "dimension": "influence",
    "facet": "motivator"
  },
  {
    "id": "wv-39",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verlies motivatie wanneer ik verantwoordelijk ben zonder invloed te hebben.",
    "dimension": "influence",
    "facet": "demotivator"
  },
  {
    "id": "wv-40",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het demotiverend wanneer ik nergens inspraak in krijg.",
    "dimension": "influence",
    "facet": "demotivator"
  },
  {
    "id": "wv-41",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het belangrijk dat ik het resultaat van mijn werk kan zien.",
    "dimension": "tangible",
    "facet": "value"
  },
  {
    "id": "wv-42",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verkies werk met concrete en actieve taken.",
    "dimension": "tangible",
    "facet": "value"
  },
  {
    "id": "wv-43",
    "category": "Werkwaarden en motivatie",
    "text": "Ik krijg energie wanneer ik iets duidelijk kan afronden of verbeteren.",
    "dimension": "tangible",
    "facet": "motivator"
  },
  {
    "id": "wv-44",
    "category": "Werkwaarden en motivatie",
    "text": "Ik verlies motivatie door uitsluitend abstract werk achter een scherm.",
    "dimension": "tangible",
    "facet": "demotivator"
  },
  {
    "id": "wv-45",
    "category": "Werkwaarden en motivatie",
    "text": "Ik vind het demotiverend wanneer mijn werk geen zichtbaar eindresultaat heeft.",
    "dimension": "tangible",
    "facet": "demotivator"
  }
];
