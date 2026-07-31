"use strict";

/*
  Unfold Yourself — Zelfbeeld-, waarden- en drijfverentest
  Uitsluitend testdata; geen uitvoeringslogica.
*/

window.SELF_VALUES_DRIVES_METADATA = {
  "id": "self-values-drives-77-nl",
  "title": "Zelfbeeld-, waarden- en drijfverentest",
  "itemCount": 77,
  "responseScale": {
    "minimum": 1,
    "maximum": 5
  },
  "components": [
    {
      "id": "self-image",
      "label": "Zelfbeeld",
      "itemCount": 10,
      "scientificBase": "Rosenberg Self-Esteem Scale (RSES)"
    },
    {
      "id": "self-confidence",
      "label": "Zelfvertrouwen",
      "itemCount": 10,
      "scientificBase": "General Self-Efficacy Scale (GSES)"
    },
    {
      "id": "values",
      "label": "Waarden",
      "itemCount": 20,
      "scientificBase": "Theory of Basic Human Values"
    },
    {
      "id": "motivation",
      "label": "Motivatie",
      "itemCount": 12,
      "scientificBase": "Human Motivation Theory / Three Needs Theory"
    },
    {
      "id": "decision-making",
      "label": "Besluitvormingsstijl",
      "itemCount": 25,
      "scientificBase": "General Decision Making Style (GDMS)"
    }
  ],
  "instructions": "Beantwoord iedere uitspraak vanuit hoe je doorgaans denkt, voelt en handelt. Kies het antwoord dat het beste past, niet het antwoord dat ideaal of sociaal wenselijk lijkt.",
  "adaptationNote": "Deze geïntegreerde Nederlandstalige test is inhoudelijk gebaseerd op vijf wetenschappelijke kaders. De formuleringen en uniforme vijfpuntsschaal zijn voor Unfold Yourself aangepast. De samengestelde test is daarom geen officiële of zelfstandig gevalideerde afname van de oorspronkelijke instrumenten.",
  "sources": [
    "Rosenberg, M. (1965). Society and the adolescent self-image. Princeton, NJ: Princeton University Press.",
    "Schwarzer, R., & Jerusalem, M. (1995). Generalized Self-Efficacy scale. In J. Weinman, S. Wright, & M. Johnston, Measures in health psychology: A user’s portfolio. Causal and control beliefs (pp. 35–37). Windsor, UK: NFER-Nelson.",
    "Schwartz, S. H. (1992). Universals in the content and structure of values: Theoretical advances and empirical tests in 20 countries. Advances in Experimental Social Psychology, 25, 1–65.",
    "McClelland, D. C. (1987). Human motivation. Cambridge, UK: Cambridge University Press.",
    "Scott, S. G., & Bruce, R. A. (1995). Decision-making style: The development and assessment of a new measure. Educational and Psychological Measurement, 55(5), 818–831."
  ],
  "limitations": "De uitkomsten zijn beschrijvende zelfrapportagescores. Het zijn geen diagnoses, percentielen of normvergelijkingen en ze vormen op zichzelf geen bewijs van geschiktheid voor studie, werk of selectie."
};

window.SELF_VALUES_DRIVES_CHOICES = [
  {
    "value": 1,
    "marker": "1",
    "label": "Helemaal oneens",
    "description": "Deze uitspraak past helemaal niet bij mij."
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
    "description": "Deze uitspraak past gedeeltelijk, wisselend of niet duidelijk bij mij."
  },
  {
    "value": 4,
    "marker": "4",
    "label": "Eens",
    "description": "Deze uitspraak past redelijk goed bij mij."
  },
  {
    "value": 5,
    "marker": "5",
    "label": "Helemaal eens",
    "description": "Deze uitspraak past zeer goed bij mij."
  }
];

window.SELF_VALUES_DRIVES_QUESTIONS = [
  {
    "id": "self-values-drives-01",
    "number": 1,
    "component": "self-image",
    "scaleId": "self-image",
    "category": "Zelfbeeld",
    "keyed": "plus",
    "text": "Ik heb doorgaans respect voor wie ik ben."
  },
  {
    "id": "self-values-drives-02",
    "number": 2,
    "component": "self-image",
    "scaleId": "self-image",
    "category": "Zelfbeeld",
    "keyed": "plus",
    "text": "Ik kan mijn sterke kanten erkennen zonder ze kleiner te maken."
  },
  {
    "id": "self-values-drives-03",
    "number": 3,
    "component": "self-image",
    "scaleId": "self-image",
    "category": "Zelfbeeld",
    "keyed": "minus",
    "text": "Wanneer ik fouten maak, voelt het snel alsof ik als persoon tekortschiet."
  },
  {
    "id": "self-values-drives-04",
    "number": 4,
    "component": "self-image",
    "scaleId": "self-image",
    "category": "Zelfbeeld",
    "keyed": "plus",
    "text": "Ik vind dat ik evenveel waard ben als andere mensen."
  },
  {
    "id": "self-values-drives-05",
    "number": 5,
    "component": "self-image",
    "scaleId": "self-image",
    "category": "Zelfbeeld",
    "keyed": "minus",
    "text": "Ik ben vaak ontevreden over mezelf, ook wanneer anderen positief reageren."
  },
  {
    "id": "self-values-drives-06",
    "number": 6,
    "component": "self-image",
    "scaleId": "self-image",
    "category": "Zelfbeeld",
    "keyed": "plus",
    "text": "Ik kan mezelf accepteren, inclusief eigenschappen die ik nog wil ontwikkelen."
  },
  {
    "id": "self-values-drives-07",
    "number": 7,
    "component": "self-image",
    "scaleId": "self-image",
    "category": "Zelfbeeld",
    "keyed": "minus",
    "text": "Ik twijfel geregeld of ik wel iets waardevols te bieden heb."
  },
  {
    "id": "self-values-drives-08",
    "number": 8,
    "component": "self-image",
    "scaleId": "self-image",
    "category": "Zelfbeeld",
    "keyed": "plus",
    "text": "Ik voel me meestal op mijn gemak met de persoon die ik ben."
  },
  {
    "id": "self-values-drives-09",
    "number": 9,
    "component": "self-image",
    "scaleId": "self-image",
    "category": "Zelfbeeld",
    "keyed": "minus",
    "text": "Ik vergelijk mezelf zo sterk met anderen dat mijn eigenwaarde eronder lijdt."
  },
  {
    "id": "self-values-drives-10",
    "number": 10,
    "component": "self-image",
    "scaleId": "self-image",
    "category": "Zelfbeeld",
    "keyed": "plus",
    "text": "Ook na een teleurstelling behoud ik een basaal gevoel van eigenwaarde."
  },
  {
    "id": "self-values-drives-11",
    "number": 11,
    "component": "self-confidence",
    "scaleId": "self-efficacy",
    "category": "Zelfvertrouwen",
    "keyed": "plus",
    "text": "Wanneer ik voor een nieuw probleem sta, vertrouw ik erop dat ik een aanpak kan vinden."
  },
  {
    "id": "self-values-drives-12",
    "number": 12,
    "component": "self-confidence",
    "scaleId": "self-efficacy",
    "category": "Zelfvertrouwen",
    "keyed": "plus",
    "text": "Als een eerste poging mislukt, kan ik meestal een andere strategie bedenken."
  },
  {
    "id": "self-values-drives-13",
    "number": 13,
    "component": "self-confidence",
    "scaleId": "self-efficacy",
    "category": "Zelfvertrouwen",
    "keyed": "plus",
    "text": "Ik kan moeilijke taken opdelen in stappen die uitvoerbaar worden."
  },
  {
    "id": "self-values-drives-14",
    "number": 14,
    "component": "self-confidence",
    "scaleId": "self-efficacy",
    "category": "Zelfvertrouwen",
    "keyed": "plus",
    "text": "Ook onder druk geloof ik dat ik invloed kan uitoefenen op wat er gebeurt."
  },
  {
    "id": "self-values-drives-15",
    "number": 15,
    "component": "self-confidence",
    "scaleId": "self-efficacy",
    "category": "Zelfvertrouwen",
    "keyed": "plus",
    "text": "Ik weet doorgaans welke hulpbronnen of mensen ik kan inschakelen wanneer dat nodig is."
  },
  {
    "id": "self-values-drives-16",
    "number": 16,
    "component": "self-confidence",
    "scaleId": "self-efficacy",
    "category": "Zelfvertrouwen",
    "keyed": "plus",
    "text": "Onverwachte hindernissen brengen me niet snel volledig van mijn plan af."
  },
  {
    "id": "self-values-drives-17",
    "number": 17,
    "component": "self-confidence",
    "scaleId": "self-efficacy",
    "category": "Zelfvertrouwen",
    "keyed": "plus",
    "text": "Ik durf aan taken te beginnen waarvan ik nog niet precies weet hoe ik ze moet uitvoeren."
  },
  {
    "id": "self-values-drives-18",
    "number": 18,
    "component": "self-confidence",
    "scaleId": "self-efficacy",
    "category": "Zelfvertrouwen",
    "keyed": "plus",
    "text": "Ik kan mezelf meestal opnieuw motiveren nadat mijn vooruitgang stilvalt."
  },
  {
    "id": "self-values-drives-19",
    "number": 19,
    "component": "self-confidence",
    "scaleId": "self-efficacy",
    "category": "Zelfvertrouwen",
    "keyed": "plus",
    "text": "Bij ingewikkelde situaties vertrouw ik op mijn vermogen om prioriteiten te stellen."
  },
  {
    "id": "self-values-drives-20",
    "number": 20,
    "component": "self-confidence",
    "scaleId": "self-efficacy",
    "category": "Zelfvertrouwen",
    "keyed": "plus",
    "text": "Ik verwacht dat ik met voldoende inzet veel nieuwe vaardigheden kan leren."
  },
  {
    "id": "self-values-drives-21",
    "number": 21,
    "component": "values",
    "scaleId": "self-direction",
    "category": "Waarden · Zelfsturing",
    "keyed": "plus",
    "text": "Ik vind het belangrijk dat ik zelf kan bepalen hoe ik mijn leven en werk vormgeef."
  },
  {
    "id": "self-values-drives-22",
    "number": 22,
    "component": "values",
    "scaleId": "self-direction",
    "category": "Waarden · Zelfsturing",
    "keyed": "plus",
    "text": "Nieuwe ideeën zelfstandig onderzoeken geeft mij meer voldoening dan alleen bestaande regels volgen."
  },
  {
    "id": "self-values-drives-23",
    "number": 23,
    "component": "values",
    "scaleId": "stimulation",
    "category": "Waarden · Stimulatie",
    "keyed": "plus",
    "text": "Ik zoek geregeld ervaringen die afwisseling en uitdaging brengen."
  },
  {
    "id": "self-values-drives-24",
    "number": 24,
    "component": "values",
    "scaleId": "stimulation",
    "category": "Waarden · Stimulatie",
    "keyed": "plus",
    "text": "Een leven met weinig verandering zou voor mij snel beklemmend voelen."
  },
  {
    "id": "self-values-drives-25",
    "number": 25,
    "component": "values",
    "scaleId": "hedonism",
    "category": "Waarden · Hedonisme",
    "keyed": "plus",
    "text": "Genieten en plezier maken behoren voor mij tot de dingen die het leven waardevol maken."
  },
  {
    "id": "self-values-drives-26",
    "number": 26,
    "component": "values",
    "scaleId": "hedonism",
    "category": "Waarden · Hedonisme",
    "keyed": "plus",
    "text": "Ik maak bewust ruimte voor comfort, ontspanning en aangename ervaringen."
  },
  {
    "id": "self-values-drives-27",
    "number": 27,
    "component": "values",
    "scaleId": "achievement",
    "category": "Waarden · Prestatie",
    "keyed": "plus",
    "text": "Het is belangrijk voor mij om zichtbaar te laten zien wat ik kan bereiken."
  },
  {
    "id": "self-values-drives-28",
    "number": 28,
    "component": "values",
    "scaleId": "achievement",
    "category": "Waarden · Prestatie",
    "keyed": "plus",
    "text": "Ik haal veel voldoening uit doelen waarbij ik mijn bekwaamheid kan bewijzen."
  },
  {
    "id": "self-values-drives-29",
    "number": 29,
    "component": "values",
    "scaleId": "power",
    "category": "Waarden · Macht en invloed",
    "keyed": "plus",
    "text": "Ik vind het aantrekkelijk om invloed te hebben op belangrijke beslissingen."
  },
  {
    "id": "self-values-drives-30",
    "number": 30,
    "component": "values",
    "scaleId": "power",
    "category": "Waarden · Macht en invloed",
    "keyed": "plus",
    "text": "Status, gezag of toegang tot middelen spelen een betekenisvolle rol in mijn ambities."
  },
  {
    "id": "self-values-drives-31",
    "number": 31,
    "component": "values",
    "scaleId": "security",
    "category": "Waarden · Veiligheid",
    "keyed": "plus",
    "text": "Voorspelbaarheid en bescherming tegen risico geven mij rust."
  },
  {
    "id": "self-values-drives-32",
    "number": 32,
    "component": "values",
    "scaleId": "security",
    "category": "Waarden · Veiligheid",
    "keyed": "plus",
    "text": "Ik vind het belangrijk dat mijn omgeving stabiel en betrouwbaar is."
  },
  {
    "id": "self-values-drives-33",
    "number": 33,
    "component": "values",
    "scaleId": "conformity",
    "category": "Waarden · Conformiteit",
    "keyed": "plus",
    "text": "Ik houd rekening met regels die nodig zijn om anderen niet te hinderen of te schaden."
  },
  {
    "id": "self-values-drives-34",
    "number": 34,
    "component": "values",
    "scaleId": "conformity",
    "category": "Waarden · Conformiteit",
    "keyed": "plus",
    "text": "Ik vind het belangrijk mijn gedrag aan te passen wanneer dat de samenwerking ordelijk houdt."
  },
  {
    "id": "self-values-drives-35",
    "number": 35,
    "component": "values",
    "scaleId": "tradition",
    "category": "Waarden · Traditie",
    "keyed": "plus",
    "text": "Gewoonten en gebruiken die van generatie op generatie zijn doorgegeven verdienen mijn respect."
  },
  {
    "id": "self-values-drives-36",
    "number": 36,
    "component": "values",
    "scaleId": "tradition",
    "category": "Waarden · Traditie",
    "keyed": "plus",
    "text": "Ik voel me verbonden met rituelen of tradities die betekenis geven aan een gemeenschap."
  },
  {
    "id": "self-values-drives-37",
    "number": 37,
    "component": "values",
    "scaleId": "benevolence",
    "category": "Waarden · Welwillendheid",
    "keyed": "plus",
    "text": "Het welzijn van mensen die dicht bij mij staan weegt zwaar in mijn keuzes."
  },
  {
    "id": "self-values-drives-38",
    "number": 38,
    "component": "values",
    "scaleId": "benevolence",
    "category": "Waarden · Welwillendheid",
    "keyed": "plus",
    "text": "Ik zet me graag in om mensen in mijn directe omgeving praktisch te ondersteunen."
  },
  {
    "id": "self-values-drives-39",
    "number": 39,
    "component": "values",
    "scaleId": "universalism",
    "category": "Waarden · Universalisme",
    "keyed": "plus",
    "text": "Ik vind het belangrijk dat mensen eerlijk worden behandeld, ook wanneer ze sterk van mij verschillen."
  },
  {
    "id": "self-values-drives-40",
    "number": 40,
    "component": "values",
    "scaleId": "universalism",
    "category": "Waarden · Universalisme",
    "keyed": "plus",
    "text": "De bescherming van natuur en samenleving op lange termijn hoort mee te wegen in persoonlijke keuzes."
  },
  {
    "id": "self-values-drives-41",
    "number": 41,
    "component": "motivation",
    "scaleId": "need-achievement",
    "category": "Motivatie · Prestatiegerichtheid",
    "keyed": "plus",
    "text": "Ik voel me het meest gemotiveerd wanneer een doel uitdagend maar haalbaar is."
  },
  {
    "id": "self-values-drives-42",
    "number": 42,
    "component": "motivation",
    "scaleId": "need-achievement",
    "category": "Motivatie · Prestatiegerichtheid",
    "keyed": "plus",
    "text": "Ik wil graag weten aan welke maatstaven mijn prestaties worden beoordeeld."
  },
  {
    "id": "self-values-drives-43",
    "number": 43,
    "component": "motivation",
    "scaleId": "need-achievement",
    "category": "Motivatie · Prestatiegerichtheid",
    "keyed": "plus",
    "text": "Ik zoek taken op waarbij het resultaat duidelijk aan mijn eigen inzet kan worden gekoppeld."
  },
  {
    "id": "self-values-drives-44",
    "number": 44,
    "component": "motivation",
    "scaleId": "need-achievement",
    "category": "Motivatie · Prestatiegerichtheid",
    "keyed": "plus",
    "text": "Vooruitgang en beheersing motiveren mij meer dan alleen bezig blijven."
  },
  {
    "id": "self-values-drives-45",
    "number": 45,
    "component": "motivation",
    "scaleId": "need-affiliation",
    "category": "Motivatie · Verbondenheid",
    "keyed": "plus",
    "text": "Een gevoel van verbondenheid met de mensen om mij heen verhoogt mijn inzet."
  },
  {
    "id": "self-values-drives-46",
    "number": 46,
    "component": "motivation",
    "scaleId": "need-affiliation",
    "category": "Motivatie · Verbondenheid",
    "keyed": "plus",
    "text": "Ik werk liever in een omgeving waar onderling vertrouwen belangrijk is."
  },
  {
    "id": "self-values-drives-47",
    "number": 47,
    "component": "motivation",
    "scaleId": "need-affiliation",
    "category": "Motivatie · Verbondenheid",
    "keyed": "plus",
    "text": "Ik voel me extra gemotiveerd wanneer mijn bijdrage de samenwerking versterkt."
  },
  {
    "id": "self-values-drives-48",
    "number": 48,
    "component": "motivation",
    "scaleId": "need-affiliation",
    "category": "Motivatie · Verbondenheid",
    "keyed": "plus",
    "text": "Langdurige spanning in relaties kan mijn energie voor een taak sterk verminderen."
  },
  {
    "id": "self-values-drives-49",
    "number": 49,
    "component": "motivation",
    "scaleId": "need-power",
    "category": "Motivatie · Invloed",
    "keyed": "plus",
    "text": "Ik krijg energie van situaties waarin ik richting kan geven."
  },
  {
    "id": "self-values-drives-50",
    "number": 50,
    "component": "motivation",
    "scaleId": "need-power",
    "category": "Motivatie · Invloed",
    "keyed": "plus",
    "text": "Het motiveert mij wanneer mijn ideeën merkbare invloed hebben op het resultaat."
  },
  {
    "id": "self-values-drives-51",
    "number": 51,
    "component": "motivation",
    "scaleId": "need-power",
    "category": "Motivatie · Invloed",
    "keyed": "plus",
    "text": "Ik neem graag verantwoordelijkheid voor beslissingen die anderen raken."
  },
  {
    "id": "self-values-drives-52",
    "number": 52,
    "component": "motivation",
    "scaleId": "need-power",
    "category": "Motivatie · Invloed",
    "keyed": "plus",
    "text": "Ik wil middelen, mensen of processen kunnen organiseren om verandering tot stand te brengen."
  },
  {
    "id": "self-values-drives-53",
    "number": 53,
    "component": "decision-making",
    "scaleId": "rational",
    "category": "Besluitvorming · Rationeel",
    "keyed": "plus",
    "text": "Voor een belangrijke beslissing verzamel ik eerst de relevante feiten."
  },
  {
    "id": "self-values-drives-54",
    "number": 54,
    "component": "decision-making",
    "scaleId": "rational",
    "category": "Besluitvorming · Rationeel",
    "keyed": "plus",
    "text": "Ik vergelijk mogelijke keuzes aan de hand van vooraf bepaalde criteria."
  },
  {
    "id": "self-values-drives-55",
    "number": 55,
    "component": "decision-making",
    "scaleId": "rational",
    "category": "Besluitvorming · Rationeel",
    "keyed": "plus",
    "text": "Ik denk bewust na over de gevolgen op korte en lange termijn."
  },
  {
    "id": "self-values-drives-56",
    "number": 56,
    "component": "decision-making",
    "scaleId": "rational",
    "category": "Besluitvorming · Rationeel",
    "keyed": "plus",
    "text": "Een overzicht op papier helpt mij om alternatieven zorgvuldig te beoordelen."
  },
  {
    "id": "self-values-drives-57",
    "number": 57,
    "component": "decision-making",
    "scaleId": "rational",
    "category": "Besluitvorming · Rationeel",
    "keyed": "plus",
    "text": "Ik neem liever pas een definitief besluit wanneer ik voldoende informatie heb gecontroleerd."
  },
  {
    "id": "self-values-drives-58",
    "number": 58,
    "component": "decision-making",
    "scaleId": "intuitive",
    "category": "Besluitvorming · Intuïtief",
    "keyed": "plus",
    "text": "Mijn eerste indruk geeft mij vaak bruikbare richting bij een keuze."
  },
  {
    "id": "self-values-drives-59",
    "number": 59,
    "component": "decision-making",
    "scaleId": "intuitive",
    "category": "Besluitvorming · Intuïtief",
    "keyed": "plus",
    "text": "Ik vertrouw op patronen die ik aanvoel zonder ze meteen volledig te kunnen uitleggen."
  },
  {
    "id": "self-values-drives-60",
    "number": 60,
    "component": "decision-making",
    "scaleId": "intuitive",
    "category": "Besluitvorming · Intuïtief",
    "keyed": "plus",
    "text": "Een lichamelijk gevoel van rust of spanning weegt mee in mijn beslissingen."
  },
  {
    "id": "self-values-drives-61",
    "number": 61,
    "component": "decision-making",
    "scaleId": "intuitive",
    "category": "Besluitvorming · Intuïtief",
    "keyed": "plus",
    "text": "Met onvolledige informatie kan ik vaak toch kiezen op basis van ervaring."
  },
  {
    "id": "self-values-drives-62",
    "number": 62,
    "component": "decision-making",
    "scaleId": "intuitive",
    "category": "Besluitvorming · Intuïtief",
    "keyed": "plus",
    "text": "Soms herken ik de passende keuze voordat ik precies kan verwoorden waarom."
  },
  {
    "id": "self-values-drives-63",
    "number": 63,
    "component": "decision-making",
    "scaleId": "dependent",
    "category": "Besluitvorming · Afhankelijk",
    "keyed": "plus",
    "text": "Bij belangrijke keuzes vraag ik advies aan mensen van wie ik het oordeel vertrouw."
  },
  {
    "id": "self-values-drives-64",
    "number": 64,
    "component": "decision-making",
    "scaleId": "dependent",
    "category": "Besluitvorming · Afhankelijk",
    "keyed": "plus",
    "text": "Ik voel me zekerder wanneer iemand anders mijn redenering bevestigt."
  },
  {
    "id": "self-values-drives-65",
    "number": 65,
    "component": "decision-making",
    "scaleId": "dependent",
    "category": "Besluitvorming · Afhankelijk",
    "keyed": "plus",
    "text": "Beslissingen met grote gevolgen neem ik liever niet volledig alleen."
  },
  {
    "id": "self-values-drives-66",
    "number": 66,
    "component": "decision-making",
    "scaleId": "dependent",
    "category": "Besluitvorming · Afhankelijk",
    "keyed": "plus",
    "text": "Ik zoek bewust mensen met meer ervaring op voordat ik een richting vastleg."
  },
  {
    "id": "self-values-drives-67",
    "number": 67,
    "component": "decision-making",
    "scaleId": "dependent",
    "category": "Besluitvorming · Afhankelijk",
    "keyed": "plus",
    "text": "Door mijn keuze met anderen te bespreken krijg ik meestal pas voldoende duidelijkheid."
  },
  {
    "id": "self-values-drives-68",
    "number": 68,
    "component": "decision-making",
    "scaleId": "avoidant",
    "category": "Besluitvorming · Vermijdend",
    "keyed": "plus",
    "text": "Ik stel beslissingen uit wanneer de mogelijke gevolgen mij ongemakkelijk maken."
  },
  {
    "id": "self-values-drives-69",
    "number": 69,
    "component": "decision-making",
    "scaleId": "avoidant",
    "category": "Besluitvorming · Vermijdend",
    "keyed": "plus",
    "text": "Ik houd opties soms langer open om te vermijden dat ik mij definitief moet vastleggen."
  },
  {
    "id": "self-values-drives-70",
    "number": 70,
    "component": "decision-making",
    "scaleId": "avoidant",
    "category": "Besluitvorming · Vermijdend",
    "keyed": "plus",
    "text": "Bij moeilijke keuzes hoop ik geregeld dat het probleem zichzelf oplost."
  },
  {
    "id": "self-values-drives-71",
    "number": 71,
    "component": "decision-making",
    "scaleId": "avoidant",
    "category": "Besluitvorming · Vermijdend",
    "keyed": "plus",
    "text": "Ik richt me op andere taken wanneer een beslissing veel spanning oproept."
  },
  {
    "id": "self-values-drives-72",
    "number": 72,
    "component": "decision-making",
    "scaleId": "avoidant",
    "category": "Besluitvorming · Vermijdend",
    "keyed": "plus",
    "text": "Onzekerheid over de uitkomst kan ervoor zorgen dat ik een keuze onnodig lang uitstel."
  },
  {
    "id": "self-values-drives-73",
    "number": 73,
    "component": "decision-making",
    "scaleId": "spontaneous",
    "category": "Besluitvorming · Spontaan",
    "keyed": "plus",
    "text": "Wanneer zich een kans voordoet, beslis ik graag snel."
  },
  {
    "id": "self-values-drives-74",
    "number": 74,
    "component": "decision-making",
    "scaleId": "spontaneous",
    "category": "Besluitvorming · Spontaan",
    "keyed": "plus",
    "text": "Lang nadenken over een keuze kost mij vaak meer energie dan het oplevert."
  },
  {
    "id": "self-values-drives-75",
    "number": 75,
    "component": "decision-making",
    "scaleId": "spontaneous",
    "category": "Besluitvorming · Spontaan",
    "keyed": "plus",
    "text": "Ik kies meestal de eerste optie die voldoende werkbaar lijkt."
  },
  {
    "id": "self-values-drives-76",
    "number": 76,
    "component": "decision-making",
    "scaleId": "spontaneous",
    "category": "Besluitvorming · Spontaan",
    "keyed": "plus",
    "text": "Ik beslis liever vlot en stuur later bij dan vooraf alles uit te zoeken."
  },
  {
    "id": "self-values-drives-77",
    "number": 77,
    "component": "decision-making",
    "scaleId": "spontaneous",
    "category": "Besluitvorming · Spontaan",
    "keyed": "plus",
    "text": "Tijdsdruk maakt mij vaak besluitvaardiger in plaats van voorzichtiger."
  }
];
