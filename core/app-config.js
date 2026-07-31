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
    id: "persoonlijkheid",
    short: "PS",
    title: "Persoonlijkheid",
    color: "#6f5cff",
    tests: [
      ["Big Five-test", "Openheid, consciëntieusheid, extraversie, aangenaamheid en emotionele stabiliteit."],
      ["16 Persoonlijkheden-test", "Persoonlijkheidsvoorkeuren aan de hand van zestien herkenbare types."],
      ["DISC-gedragsstijltest", "32 uitspraken over acht interpersoonlijke richtingen, samengevat in D, I, S en C."],
      ["HEXACO-test", "Zes brede persoonlijkheidsdimensies, waaronder eerlijkheid en bescheidenheid."],
      ["Zelfbeeld-, waarden- en drijfverentest", "Zelfbeeld, zelfvertrouwen, waarden, motivatie en besluitvormingsstijl."]
    ]
  },
  {
    id: "identiteit",
    short: "ID",
    title: "Identiteit & kruispuntdenken",
    color: "#b0528d",
    tests: [
      ["Deelidentiteiten- en kruispuntdenkentest", "Identiteitsaspecten, ervaren voordelen en barrières, inclusie en maatschappelijke normposities."]
    ]
  },
  {
    id: "motivatie",
    short: "MW",
    title: "Motivatie & waarden",
    color: "#d96d4b",
    tests: [
      ["Interesse- en beroepsrichtingentest", "Werkinteresses, activiteiten, sectoren en beroepsfamilies."],
      ["Werkwaarden- en motivatietest", "Autonomie, zekerheid, erkenning, inkomen, betekenis en ontwikkeling."],
      ["Werkomgeving- en cultuurvoorkeurtest", "Structuur, vrijheid, tempo, thuiswerk, samenwerking en organisatietype."]
    ]
  },
  {
    id: "intelligentie",
    short: "IQ",
    title: "Intelligentie & denkvermogen",
    color: "#3875c5",
    tests: [
      ["IQ-test", "Algemene cognitieve vaardigheid op basis van verschillende redeneervragen."],
      ["Rekenkundige bewerkingentest", "Rekenen, percentages, verhoudingen en basisberekeningen."],
      ["Tegenstellingentest", "Woordenschat en verbaal redeneervermogen."],
      ["Eliminatietest", "Logisch uitsluiten en afwijkende elementen herkennen."],
      ["Enkelvoudige analogietest", "Verbanden tussen woorden, begrippen en concepten."],
      ["Numerieke en ruimtelijke intelligentietest", "Cijferreeksen, figuurreeksen, ruimtelijke relaties en patronen."],
      ["Aandacht- en cognitieve prestatietest", "Concentratie, nauwkeurigheid, geheugen en verwerkingssnelheid."],
      ["Kritisch denken en data-interpretatie", "Grafieken, tabellen, argumenten, informatiekwaliteit en conclusies."]
    ]
  },
  {
    id: "competenties",
    short: "DV",
    title: "Competenties & digitale vaardigheden",
    color: "#159b83",
    tests: [
      ["Competentie- en jobbereiktest", "Aanwezige competenties en beroepen waarvoor die relevant zijn."],
      ["Digitale basisvaardigheden- en AI-test", "Bestandsbeheer, cloud, samenwerken, informatiekwaliteit en AI-geletterdheid."],
      ["Windows-test", "Besturingssysteem, bestanden, instellingen en dagelijks computergebruik."],
      ["Word-test", "Tekstopmaak, stijlen, tabellen, documenten en functies."],
      ["Excel-test", "Formules, tabellen, analyse, grafieken en gegevensbeheer."],
      ["PowerPoint-test", "Dia-opbouw, ontwerpen, presenteren en visuele communicatie."],
      ["Computerbeveiligingstest", "Phishing, wachtwoorden, privacy, malware en veilig online gedrag."],
      ["HTML-test", "Structuur, tags, formulieren en webpaginaopbouw."],
      ["PHP-test", "Variabelen, logica, formulieren, functies en server-side basiskennis."]
    ]
  },
  {
    id: "werkgedrag",
    short: "WG",
    title: "Werkgedrag & soft skills",
    color: "#9a6d24",
    tests: [
      ["Softskillstest", "Dertig veelgevraagde professionele en interpersoonlijke vaardigheden."],
      ["Uitsteltest", "Taakinitiatie, vermijding, motivatie, perfectionisme en uitstelpatronen."],
      ["Tijdsbeheertest", "Plannen, prioriteren, tijd inschatten, afleiding en opvolging."]
    ]
  },
  {
    id: "leiderschap",
    short: "LT",
    title: "Leiderschap & teamrollen",
    color: "#7a5ea6",
    tests: [
      ["Leiderschapstest", "Leiderschapsstijl, mens- en taakgerichtheid, coachen, delegeren en beslissen."],
      ["Belbin-teamrollentest", "Dominante, ondersteunende en minder natuurlijke teamrollen."]
    ]
  },
  {
    id: "loopbaan",
    short: "LJ",
    title: "Loopbaan & jobmatch",
    color: "#26728a",
    tests: [
      ["Basisprofieltest", "Welk type werk en welke functies passen bij je persoonlijkheid."],
      ["Loopbaantest", "Loopbaanfase, richting, tevredenheid, barrières en vervolgstappen."],
      ["Sollicitatie- en employabilitytest", "Cv, gesprekken, arbeidsmarktkennis, netwerk en inzetbaarheid."],
      ["Ondernemerschapsprofiel", "Initiatief, autonomie, commerciële gerichtheid en risicoacceptatie."]
    ]
  },
  {
    id: "welzijn",
    short: "WB",
    title: "Welzijn & balans",
    color: "#2f855f",
    tests: [
      ["Stresstest", "Positieve en negatieve stress, werkdruk, herstel en signalen van uitputting."],
      ["Jobtevredenheids- en werkbelevingstest", "Tevredenheid, bevlogenheid, autonomie, erkenning en psychologische veiligheid."],
      ["Werk-privébalanstest", "Tijd, mentale belasting, bereikbaarheid, herstel en grenzen."]
    ]
  }
];

const totalTests = domains.reduce((sum, domain) => sum + domain.tests.length, 0);

