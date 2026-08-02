"use strict";

/*
  Werkwaarden- en werkmotivatietest — vragen en dimensies
  45 gescoorde items in 27 schermstappen:
  - 27 prioriteitsitems in 9 verdeelvragen;
  - 9 motivatorsituaties;
  - 9 demotivatorsituaties.
*/

window.WORK_VALUES_DIMENSIONS = [
  {
    id: "autonomy",
    short: "Vrijheid",
    title: "Vrijheid & autonomie",
    description: "Handelingsruimte, zelfstandigheid en invloed op de eigen werkwijze.",
    seeks: "ruimte om je werk zelf te organiseren, je eigen methode te kiezen en zelfstandig beslissingen te nemen",
    supports: "duidelijke resultaten en grenzen, gecombineerd met vertrouwen in je aanpak",
    risk: "micromanagement, starre procedures en voortdurende goedkeuring",
    vacancyQuestion: "Hoeveel vrijheid heb ik om mijn werk zelf te organiseren?"
  },
  {
    id: "reward",
    short: "Beloning",
    title: "Beloning & vooruitgang",
    description: "Eerlijke waardering, passende arbeidsvoorwaarden, erkenning en zichtbare groei.",
    seeks: "een eerlijke verhouding tussen inzet, verantwoordelijkheid, beloning, erkenning en doorgroeimogelijkheden",
    supports: "transparante voorwaarden, zichtbare erkenning en realistische kansen om vooruit te gaan",
    risk: "structureel meer bijdragen zonder erkenning, betere voorwaarden of ontwikkelmogelijkheden",
    vacancyQuestion: "Hoe worden prestaties erkend en beloond?"
  },
  {
    id: "connection",
    short: "Verbondenheid",
    title: "Verbondenheid & samenwerking",
    description: "Contact, ondersteuning, vertrouwen en gezamenlijke resultaten.",
    seeks: "betekenisvol contact, samenwerking en het gevoel bij een team of gemeenschap te horen",
    supports: "collega’s die informatie delen, elkaar helpen en gezamenlijke successen erkennen",
    risk: "langdurige sociale isolatie, weinig contact of een sterk onderling competitieve omgeving",
    vacancyQuestion: "Hoe werkt het team in de praktijk samen?"
  },
  {
    id: "creativity",
    short: "Creativiteit",
    title: "Creativiteit & afwisseling",
    description: "Nieuwe ideeën, variatie en ruimte om werkwijzen te vernieuwen.",
    seeks: "afwisseling, nieuwe vraagstukken en ruimte om ideeën of verbeteringen uit te proberen",
    supports: "opdrachten waarin je mag ontwerpen, experimenteren, vernieuwen en bijsturen",
    risk: "sterk repetitief werk zonder veranderingsruimte of inhoudelijke variatie",
    vacancyQuestion: "Hoeveel afwisseling en vernieuwingsruimte biedt de functie?"
  },
  {
    id: "security",
    short: "Zekerheid",
    title: "Zekerheid & structuur",
    description: "Duidelijkheid, betrouwbare afspraken en een voorspelbare basis.",
    seeks: "heldere verwachtingen, stabiele afspraken en voldoende houvast om vooruit te plannen",
    supports: "tijdige communicatie, duidelijke rollen en betrouwbare arbeidsvoorwaarden",
    risk: "voortdurende reorganisaties, wisselende prioriteiten en onduidelijkheid over je functie of toekomst",
    vacancyQuestion: "Hoe stabiel zijn taken, planning en arbeidsvoorwaarden?"
  },
  {
    id: "mastery",
    short: "Vakmanschap",
    title: "Vakmanschap & uitdaging",
    description: "Kwaliteit, leren, probleemoplossing en verdere expertise.",
    seeks: "inhoudelijk uitdagend werk waarin je kennis verdiept, problemen oplost en kwaliteit kunt leveren",
    supports: "voldoende tijd, leergelegenheden en complexe opdrachten die verdere expertise vragen",
    risk: "oppervlakkig haastwerk zonder ruimte om kwaliteit te verbeteren of bij te leren",
    vacancyQuestion: "Welke mogelijkheden bestaan er om expertise op te bouwen?"
  },
  {
    id: "meaning",
    short: "Zingeving",
    title: "Zingeving & maatschappelijke bijdrage",
    description: "Werk waarvan je de waarde begrijpt en waar je persoonlijk achter kunt staan.",
    seeks: "een herkenbare bijdrage aan mensen, de samenleving, het milieu of een doel dat je belangrijk vindt",
    supports: "zichtbare impact en een organisatie waarvan doelen en handelen voldoende aansluiten bij je waarden",
    risk: "een fundamenteel waardenconflict of werk waarvan de bijdrage voor jou onduidelijk blijft",
    vacancyQuestion: "Welke maatschappelijke bijdrage levert het werk?"
  },
  {
    id: "influence",
    short: "Invloed",
    title: "Invloed & verantwoordelijkheid",
    description: "Beslissingen nemen, richting geven en verantwoordelijkheid dragen.",
    seeks: "echte invloed op beslissingen, prioriteiten, mensen, middelen of resultaten",
    supports: "verantwoordelijkheid die gepaard gaat met voldoende bevoegdheid en beschikbare middelen",
    risk: "aansprakelijk worden gehouden voor resultaten zonder inspraak of beslissingsruimte",
    vacancyQuestion: "Welke beslissingen mag ik zelfstandig nemen?"
  },
  {
    id: "tangible",
    short: "Tastbaar resultaat",
    title: "Praktisch & tastbaar resultaat",
    description: "Concrete activiteit en zichtbaar, merkbaar of afgerond resultaat.",
    seeks: "werk waarbij je actief iets maakt, herstelt, organiseert, verbetert of zichtbaar afrondt",
    supports: "direct contact met materialen, apparatuur, mensen of concrete werkprocessen",
    risk: "uitsluitend abstract schermwerk zonder beweging of duidelijk zichtbaar eindresultaat",
    vacancyQuestion: "Welk concreet resultaat lever ik met deze functie?"
  }
];

window.WORK_VALUES_DIMENSION_BY_ID = Object.fromEntries(
  window.WORK_VALUES_DIMENSIONS.map(dimension => [dimension.id, dimension])
);

window.WORK_VALUES_ALLOCATION_QUESTIONS = [
  {
    id: "wv-allocation-01",
    type: "allocation",
    category: "Deel 1 · Prioriteiten",
    text: "Je begint aan een belangrijk nieuw project. Wat maakt het project voor jou aantrekkelijk?",
    items: [
      { id: "wv-item-01", dimension: "autonomy", text: "Ik kan grotendeels zelf bepalen hoe ik mijn tijd indeel en hoe ik het werk aanpak." },
      { id: "wv-item-02", dimension: "mastery", text: "Ik kan me inhoudelijk verdiepen en nieuwe expertise opbouwen." },
      { id: "wv-item-03", dimension: "reward", text: "Een sterk resultaat vergroot aantoonbaar mijn kans op een betere beloning of doorgroei." }
    ]
  },
  {
    id: "wv-allocation-02",
    type: "allocation",
    category: "Deel 1 · Prioriteiten",
    text: "Welke kenmerken maken een werkomgeving voor jou aantrekkelijk?",
    items: [
      { id: "wv-item-04", dimension: "connection", text: "Collega’s werken nauw samen, helpen elkaar en zorgen dat mensen zich onderdeel van het team voelen." },
      { id: "wv-item-05", dimension: "security", text: "Taken, werktijden, verantwoordelijkheden en verwachtingen zijn duidelijk en voorspelbaar." },
      { id: "wv-item-06", dimension: "influence", text: "Ik mag beslissingen nemen en heb merkbare invloed op het resultaat." }
    ]
  },
  {
    id: "wv-allocation-03",
    type: "allocation",
    category: "Deel 1 · Prioriteiten",
    text: "Welke werkdag zou jou het meeste voldoening geven?",
    items: [
      { id: "wv-item-07", dimension: "creativity", text: "Ik mag nieuwe ideeën ontwikkelen, verschillende dingen proberen en bestaande werkwijzen verbeteren." },
      { id: "wv-item-08", dimension: "meaning", text: "Ik zie dat mijn werk een positieve bijdrage levert aan andere mensen, de samenleving of het milieu." },
      { id: "wv-item-09", dimension: "tangible", text: "Ik maak, herstel, organiseer of realiseer iets waarvan ik het concrete resultaat kan zien." }
    ]
  },
  {
    id: "wv-allocation-04",
    type: "allocation",
    category: "Deel 1 · Prioriteiten",
    text: "Je kunt kiezen uit verschillende nieuwe functies. Wat weegt voor jou het zwaarst?",
    items: [
      { id: "wv-item-10", dimension: "autonomy", text: "Ik krijg ruimte om mijn eigen werkmethode te kiezen en zelfstandig beslissingen te nemen." },
      { id: "wv-item-11", dimension: "connection", text: "Ik werk veel met anderen samen en bouw sterke professionele relaties op." },
      { id: "wv-item-12", dimension: "creativity", text: "De inhoud verandert regelmatig en vraagt om nieuwe ideeën en oplossingen." }
    ]
  },
  {
    id: "wv-allocation-05",
    type: "allocation",
    category: "Deel 1 · Prioriteiten",
    text: "Je vergelijkt drie werkgevers. Wat maakt een werkgever voor jou aantrekkelijk?",
    items: [
      { id: "wv-item-13", dimension: "reward", text: "Goede prestaties worden eerlijk beloond en er zijn duidelijke doorgroeimogelijkheden." },
      { id: "wv-item-14", dimension: "security", text: "De organisatie biedt stabiliteit, duidelijke afspraken en betrouwbare arbeidsvoorwaarden." },
      { id: "wv-item-15", dimension: "meaning", text: "De organisatie doet werk waar ik persoonlijk achter kan staan en waarvan ik de waarde begrijp." }
    ]
  },
  {
    id: "wv-allocation-06",
    type: "allocation",
    category: "Deel 1 · Prioriteiten",
    text: "Je krijgt een uitdagende opdracht. Wat spreekt je daarin het meeste aan?",
    items: [
      { id: "wv-item-16", dimension: "mastery", text: "De opdracht vraagt diepgaande kennis, kwaliteit en zorgvuldig probleemoplossend denken." },
      { id: "wv-item-17", dimension: "influence", text: "Ik krijg eindverantwoordelijkheid en mag belangrijke keuzes maken." },
      { id: "wv-item-18", dimension: "tangible", text: "Mijn inspanning leidt tot een concreet product, een zichtbare verbetering of een afgeronde oplossing." }
    ]
  },
  {
    id: "wv-allocation-07",
    type: "allocation",
    category: "Deel 1 · Prioriteiten",
    text: "Onder welke voorwaarde zou je graag meer verantwoordelijkheid opnemen?",
    items: [
      { id: "wv-item-19", dimension: "autonomy", text: "Ik krijg voldoende handelingsruimte om zelf te bepalen hoe ik het resultaat bereik." },
      { id: "wv-item-20", dimension: "meaning", text: "De verantwoordelijkheid draagt bij aan een doel dat ik persoonlijk belangrijk vind." },
      { id: "wv-item-21", dimension: "influence", text: "Ik krijg echte beslissingsbevoegdheid en kan richting geven aan mensen, middelen of prioriteiten." }
    ]
  },
  {
    id: "wv-allocation-08",
    type: "allocation",
    category: "Deel 1 · Prioriteiten",
    text: "Wanneer voelt een werkweek voor jou geslaagd?",
    items: [
      { id: "wv-item-22", dimension: "reward", text: "Mijn inzet en resultaten worden zichtbaar erkend en leveren mij iets op." },
      { id: "wv-item-23", dimension: "connection", text: "Ik heb prettig met anderen samengewerkt en we hebben gezamenlijk iets bereikt." },
      { id: "wv-item-24", dimension: "tangible", text: "Ik kan duidelijk aanwijzen wat ik heb gemaakt, afgerond, hersteld of verbeterd." }
    ]
  },
  {
    id: "wv-allocation-09",
    type: "allocation",
    category: "Deel 1 · Prioriteiten",
    text: "Wat heb je nodig om een functie jarenlang interessant te blijven vinden?",
    items: [
      { id: "wv-item-25", dimension: "creativity", text: "Ik blijf nieuwe opdrachten, ideeën, werkwijzen of uitdagingen tegenkomen." },
      { id: "wv-item-26", dimension: "security", text: "Ik weet waar ik aan toe ben en kan rekenen op duidelijke, stabiele afspraken." },
      { id: "wv-item-27", dimension: "mastery", text: "Ik kan mijn vakkennis blijven verdiepen en steeds beter worden in inhoudelijk veeleisend werk." }
    ]
  }
];

window.WORK_VALUES_IMPACT_QUESTIONS = [
  { id: "wv-impact-01", type: "impact", polarity: "motivator", dimension: "autonomy", category: "Deel 2 · Motivatie en demotivatie", text: "Je leidinggevende spreekt een duidelijk resultaat en een deadline met je af. Je mag vervolgens zelf bepalen hoe je het werk organiseert en uitvoert." },
  { id: "wv-impact-02", type: "impact", polarity: "demotivator", dimension: "autonomy", category: "Deel 2 · Motivatie en demotivatie", text: "Je werkwijze, planning en dagelijkse prioriteiten worden nauwkeurig voor je bepaald en regelmatig gecontroleerd, ook wanneer je het werk zelfstandig aankunt." },
  { id: "wv-impact-03", type: "impact", polarity: "motivator", dimension: "reward", category: "Deel 2 · Motivatie en demotivatie", text: "Sterke prestaties leiden aantoonbaar tot financiële waardering, persoonlijke erkenning of een realistische doorgroeimogelijkheid." },
  { id: "wv-impact-04", type: "impact", polarity: "demotivator", dimension: "reward", category: "Deel 2 · Motivatie en demotivatie", text: "Je krijgt structureel meer taken en verantwoordelijkheid, maar dit leidt niet tot erkenning, betere voorwaarden of nieuwe ontwikkelmogelijkheden." },
  { id: "wv-impact-05", type: "impact", polarity: "motivator", dimension: "connection", category: "Deel 2 · Motivatie en demotivatie", text: "Je werkt in een team waarin collega’s informatie delen, elkaar ondersteunen en gezamenlijke successen erkennen." },
  { id: "wv-impact-06", type: "impact", polarity: "demotivator", dimension: "connection", category: "Deel 2 · Motivatie en demotivatie", text: "Je werkt het grootste deel van de tijd alleen en hebt nauwelijks inhoudelijk of sociaal contact met collega’s." },
  { id: "wv-impact-07", type: "impact", polarity: "motivator", dimension: "creativity", category: "Deel 2 · Motivatie en demotivatie", text: "Je wordt gevraagd een nieuwe aanpak te ontwerpen en krijgt ruimte om verschillende oplossingen uit te proberen." },
  { id: "wv-impact-08", type: "impact", polarity: "demotivator", dimension: "creativity", category: "Deel 2 · Motivatie en demotivatie", text: "Je voert gedurende lange tijd vrijwel dezelfde taken uit en mag de bestaande werkwijze niet aanpassen." },
  { id: "wv-impact-09", type: "impact", polarity: "motivator", dimension: "security", category: "Deel 2 · Motivatie en demotivatie", text: "Je functie, verantwoordelijkheden, werktijden en arbeidsvoorwaarden zijn duidelijk en veranderen alleen na tijdige communicatie." },
  { id: "wv-impact-10", type: "impact", polarity: "demotivator", dimension: "security", category: "Deel 2 · Motivatie en demotivatie", text: "De organisatie verandert regelmatig van structuur en prioriteiten, terwijl onduidelijk blijft wat dit voor jouw functie en toekomst betekent." },
  { id: "wv-impact-11", type: "impact", polarity: "motivator", dimension: "mastery", category: "Deel 2 · Motivatie en demotivatie", text: "Je krijgt een inhoudelijk moeilijke opdracht waarvoor je nieuwe kennis kunt opbouwen en voldoende tijd krijgt om kwalitatief werk te leveren." },
  { id: "wv-impact-12", type: "impact", polarity: "demotivator", dimension: "mastery", category: "Deel 2 · Motivatie en demotivatie", text: "Je moet vooral oppervlakkige taken snel afwerken, zonder ruimte om kwaliteit te verbeteren of inhoudelijk bij te leren." },
  { id: "wv-impact-13", type: "impact", polarity: "motivator", dimension: "meaning", category: "Deel 2 · Motivatie en demotivatie", text: "Je ziet concreet hoe jouw werk mensen helpt, maatschappelijke waarde creëert of bijdraagt aan een doel waar je achter staat." },
  { id: "wv-impact-14", type: "impact", polarity: "demotivator", dimension: "meaning", category: "Deel 2 · Motivatie en demotivatie", text: "Je organisatie neemt beslissingen die volgens jou duidelijk botsen met belangrijke sociale, ethische of ecologische waarden." },
  { id: "wv-impact-15", type: "impact", polarity: "motivator", dimension: "influence", category: "Deel 2 · Motivatie en demotivatie", text: "Je krijgt verantwoordelijkheid voor een belangrijk resultaat en beschikt ook over de bevoegdheid en middelen om beslissingen te nemen." },
  { id: "wv-impact-16", type: "impact", polarity: "demotivator", dimension: "influence", category: "Deel 2 · Motivatie en demotivatie", text: "Je wordt verantwoordelijk gehouden voor het resultaat, maar hebt nauwelijks invloed op beslissingen, prioriteiten of beschikbare middelen." },
  { id: "wv-impact-17", type: "impact", polarity: "motivator", dimension: "tangible", category: "Deel 2 · Motivatie en demotivatie", text: "Je bent actief bezig met materialen, apparatuur, mensen of concrete werkprocessen en ziet aan het einde van de dag wat je hebt gerealiseerd." },
  { id: "wv-impact-18", type: "impact", polarity: "demotivator", dimension: "tangible", category: "Deel 2 · Motivatie en demotivatie", text: "Je werkt vrijwel de hele dag aan abstracte informatie op een scherm, zonder beweging en zonder een duidelijk zichtbaar eindresultaat." }
];

window.WORK_VALUES_QUESTIONS = [
  ...window.WORK_VALUES_ALLOCATION_QUESTIONS,
  ...window.WORK_VALUES_IMPACT_QUESTIONS
];

window.WORK_VALUES_IMPACT_CHOICES = [
  { value: -3, marker: "−3", label: "Zeer sterk demotiverend" },
  { value: -2, marker: "−2", label: "Duidelijk demotiverend" },
  { value: -1, marker: "−1", label: "Enigszins demotiverend" },
  { value: 0, marker: "0", label: "Neutraal" },
  { value: 1, marker: "+1", label: "Enigszins motiverend" },
  { value: 2, marker: "+2", label: "Duidelijk motiverend" },
  { value: 3, marker: "+3", label: "Zeer sterk motiverend" }
];
