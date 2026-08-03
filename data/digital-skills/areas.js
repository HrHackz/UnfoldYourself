"use strict";

const DIGITAL_SKILLS_AREAS = Object.freeze([
  {
    "id": "information-data",
    "number": 1,
    "title": "Informatie- en datageletterdheid",
    "shortTitle": "Informatie en data",
    "description": "Informatie zoeken, beoordelen, organiseren en met gegevens werken.",
    "questionIds": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ]
  },
  {
    "id": "communication-collaboration",
    "number": 2,
    "title": "Communicatie en samenwerking",
    "shortTitle": "Communicatie en samenwerking",
    "description": "Digitaal communiceren, delen, deelnemen, samenwerken en je online identiteit beheren.",
    "questionIds": [
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35
    ]
  },
  {
    "id": "content-creation",
    "number": 3,
    "title": "Digitale inhoud creëren",
    "shortTitle": "Digitale inhoud creëren",
    "description": "Digitale inhoud maken, aanpassen, combineren en verantwoord hergebruiken.",
    "questionIds": [
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51
    ]
  },
  {
    "id": "safety",
    "number": 4,
    "title": "Veiligheid",
    "shortTitle": "Veiligheid",
    "description": "Apparaten, persoonsgegevens, welzijn en milieu beschermen bij digitaal gebruik.",
    "questionIds": [
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      62,
      63,
      64,
      65,
      66,
      67
    ]
  },
  {
    "id": "problem-solving",
    "number": 5,
    "title": "Problemen oplossen",
    "shortTitle": "Problemen oplossen",
    "description": "Technische problemen aanpakken, passende oplossingen kiezen en digitale vaardigheden ontwikkelen.",
    "questionIds": [
      68,
      69,
      70,
      71,
      72,
      73,
      74,
      75,
      76,
      77,
      78,
      79,
      80,
      81,
      82
    ]
  }
]);
window.DIGITAL_SKILLS_AREAS = DIGITAL_SKILLS_AREAS;

const DIGITAL_SKILLS_COMPETENCES = Object.freeze([
  {
    "id": "1.1",
    "areaId": "information-data",
    "title": "Zoeken en filteren van informatie en digitale inhoud",
    "description": "Informatie doelgericht zoeken en relevante resultaten terugvinden."
  },
  {
    "id": "1.2",
    "areaId": "information-data",
    "title": "Informatie en digitale inhoud beoordelen",
    "description": "De bedoeling, betrouwbaarheid en kwaliteit van online informatie beoordelen."
  },
  {
    "id": "1.3",
    "areaId": "information-data",
    "title": "Informatie, gegevens en digitale inhoud beheren",
    "description": "Bestanden en gegevens organiseren, verplaatsen en met software verwerken."
  },
  {
    "id": "2.1",
    "areaId": "communication-collaboration",
    "title": "Communiceren via digitale technologie",
    "description": "Geschikte digitale communicatiemiddelen kiezen en gebruiken."
  },
  {
    "id": "2.2",
    "areaId": "communication-collaboration",
    "title": "Delen via digitale technologie",
    "description": "Digitale inhoud delen en bronnen of toegangsrechten correct beheren."
  },
  {
    "id": "2.3",
    "areaId": "communication-collaboration",
    "title": "Deelnemen via digitale technologie",
    "description": "Digitale diensten gebruiken voor werk, aankopen en maatschappelijke deelname."
  },
  {
    "id": "2.4",
    "areaId": "communication-collaboration",
    "title": "Digitaal samenwerken",
    "description": "Met anderen op afstand aan gedeelde digitale inhoud werken."
  },
  {
    "id": "2.5",
    "areaId": "communication-collaboration",
    "title": "Gepast en respectvol online handelen",
    "description": "Online passend handelen en reageren op schadelijk gedrag."
  },
  {
    "id": "2.6",
    "areaId": "communication-collaboration",
    "title": "Digitale identiteit beheren",
    "description": "Online profielen, cookies en persoonlijke digitale sporen beheren."
  },
  {
    "id": "3.1",
    "areaId": "content-creation",
    "title": "Digitale inhoud ontwikkelen",
    "description": "Tekst, presentaties en andere digitale inhoud maken."
  },
  {
    "id": "3.2",
    "areaId": "content-creation",
    "title": "Digitale inhoud combineren en aanpassen",
    "description": "Bestaande digitale bronnen aanpassen en tot nieuwe inhoud combineren."
  },
  {
    "id": "3.3",
    "areaId": "content-creation",
    "title": "Auteursrecht en licenties",
    "description": "Digitale inhoud gebruiken met aandacht voor auteursrecht en licenties."
  },
  {
    "id": "3.4",
    "areaId": "content-creation",
    "title": "Programmeren en automatiseren",
    "description": "Taken in stappen opdelen en digitale automatisering begrijpen of toepassen."
  },
  {
    "id": "4.1",
    "areaId": "safety",
    "title": "Apparaten en digitale systemen beschermen",
    "description": "Apparaten, software en back-ups veilig beheren."
  },
  {
    "id": "4.2",
    "areaId": "safety",
    "title": "Persoonsgegevens en privacy beschermen",
    "description": "Persoonsgegevens, locatie en privacy-instellingen beschermen."
  },
  {
    "id": "4.3",
    "areaId": "safety",
    "title": "Gezondheid en welzijn beschermen",
    "description": "Digitale belasting en schadelijke online contacten of inhoud beperken."
  },
  {
    "id": "4.4",
    "areaId": "safety",
    "title": "Het milieu beschermen",
    "description": "Digitale apparaten energiezuinig en milieubewust gebruiken en afvoeren."
  },
  {
    "id": "5.1",
    "areaId": "problem-solving",
    "title": "Technische problemen oplossen",
    "description": "Technische oorzaken herkennen en systematisch naar oplossingen zoeken."
  },
  {
    "id": "5.2",
    "areaId": "problem-solving",
    "title": "Behoeften herkennen en digitale oplossingen kiezen",
    "description": "Een passend digitaal hulpmiddel of toegankelijkheidsoplossing kiezen."
  },
  {
    "id": "5.3",
    "areaId": "problem-solving",
    "title": "Digitale technologie creatief gebruiken",
    "description": "Digitale technologie en data inzetten voor vernieuwing en probleemoplossing."
  },
  {
    "id": "5.4",
    "areaId": "problem-solving",
    "title": "De eigen digitale vaardigheden ontwikkelen",
    "description": "Nieuwe digitale ontwikkelingen volgen, leren en anderen ondersteunen."
  }
]);
window.DIGITAL_SKILLS_COMPETENCES = DIGITAL_SKILLS_COMPETENCES;
