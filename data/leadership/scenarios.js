"use strict";

const LEADERSHIP_SITUATIONAL_STYLES = Object.freeze([
  {
    "id": "S1",
    "name": "Richting geven",
    "title": "S1 Richting geven",
    "description": "Duidelijkheid, structuur, concrete instructies en opvolging."
  },
  {
    "id": "S2",
    "name": "Begeleiden",
    "title": "S2 Begeleiden",
    "description": "Richting combineren met uitleg, feedback en motivatie."
  },
  {
    "id": "S3",
    "name": "Steunen",
    "title": "S3 Steunen",
    "description": "Luisteren, betrekken, faciliteren en vertrouwen versterken."
  },
  {
    "id": "S4",
    "name": "Delegeren",
    "title": "S4 Delegeren",
    "description": "Verantwoordelijkheid overdragen met duidelijke grenzen."
  }
]);

const LEADERSHIP_SCENARIOS = Object.freeze([
  {
    "id": "leadership-sit-01",
    "number": 1,
    "targetStyle": "S1",
    "text": "Een nieuwe medewerker gaat voor het eerst met een belangrijk administratief systeem werken. Die persoon is enthousiast, maar kent het systeem en de procedures nog niet.",
    "options": [
      {
        "id": "A",
        "style": "S1",
        "text": "Ik leg de stappen duidelijk uit, geef aan wat eerst moet gebeuren en controleer de eerste uitvoeringen."
      },
      {
        "id": "B",
        "style": "S2",
        "text": "Ik leg de werkwijze en het achterliggende doel uit, oefen samen en geef regelmatig feedback."
      },
      {
        "id": "C",
        "style": "S3",
        "text": "Ik vraag hoe de medewerker de taak zelf zou aanpakken en bied ondersteuning waar die persoon onzeker over is."
      },
      {
        "id": "D",
        "style": "S4",
        "text": "Ik spreek het gewenste resultaat en de deadline af en laat de medewerker de uitvoering zelfstandig organiseren."
      }
    ]
  },
  {
    "id": "leadership-sit-02",
    "number": 2,
    "targetStyle": "S2",
    "text": "Een medewerker begrijpt de basis van een nieuwe taak, maar maakt nog regelmatig fouten. De eerste motivatie begint hierdoor af te nemen.",
    "options": [
      {
        "id": "A",
        "style": "S3",
        "text": "Ik laat de medewerker zelf analyseren wat er misloopt en ondersteun de gekozen verbeteringen."
      },
      {
        "id": "B",
        "style": "S2",
        "text": "Ik bespreek de fouten, leg een betere aanpak uit, oefen samen en geef gerichte feedback."
      },
      {
        "id": "C",
        "style": "S4",
        "text": "Ik geef de medewerker volledige verantwoordelijkheid en beoordeel het eindresultaat achteraf."
      },
      {
        "id": "D",
        "style": "S1",
        "text": "Ik schrijf exact voor welke werkwijze moet worden gevolgd en controleer iedere stap."
      }
    ]
  },
  {
    "id": "leadership-sit-03",
    "number": 3,
    "targetStyle": "S3",
    "text": "Een ervaren medewerker beheerst de taak goed, maar twijfelt sinds een eerdere kritische reactie sterk aan de eigen aanpak.",
    "options": [
      {
        "id": "A",
        "style": "S4",
        "text": "Ik draag de volledige verantwoordelijkheid over en laat de medewerker zelf bepalen wat nodig is."
      },
      {
        "id": "B",
        "style": "S1",
        "text": "Ik leg vast welke aanpak moet worden gevolgd en plan meerdere controlemomenten."
      },
      {
        "id": "C",
        "style": "S3",
        "text": "Ik bespreek de twijfels, betrek de medewerker bij de keuzes en versterk het vertrouwen in de eigen deskundigheid."
      },
      {
        "id": "D",
        "style": "S2",
        "text": "Ik stel een werkwijze voor, leg die uitgebreid uit en begeleid de medewerker tijdens de uitvoering."
      }
    ]
  },
  {
    "id": "leadership-sit-04",
    "number": 4,
    "targetStyle": "S4",
    "text": "Een ervaren projectleider heeft meerdere vergelijkbare projecten succesvol afgerond en is gemotiveerd om opnieuw de leiding te nemen.",
    "options": [
      {
        "id": "A",
        "style": "S1",
        "text": "Ik geef gedetailleerde instructies en volg de uitvoering frequent op."
      },
      {
        "id": "B",
        "style": "S2",
        "text": "Ik leg mijn voorkeursaanpak uit en begeleid de projectleider bij belangrijke beslissingen."
      },
      {
        "id": "C",
        "style": "S3",
        "text": "Ik blijf nauw betrokken en neem belangrijke beslissingen samen met de projectleider."
      },
      {
        "id": "D",
        "style": "S4",
        "text": "Ik spreek resultaat, grenzen en rapportagemomenten af en laat de projectleider de uitvoering zelfstandig leiden."
      }
    ]
  },
  {
    "id": "leadership-sit-05",
    "number": 5,
    "targetStyle": "S1",
    "text": "Een stagiair behandelt binnenkort voor het eerst een klacht van een klant. De stagiair wil graag beginnen, maar kent de procedure nog niet.",
    "options": [
      {
        "id": "A",
        "style": "S3",
        "text": "Ik vraag hoe de stagiair het gesprek zelf zou voeren en bied vooral ondersteuning."
      },
      {
        "id": "B",
        "style": "S4",
        "text": "Ik geef de stagiair volledige verantwoordelijkheid en blijf alleen beschikbaar voor vragen."
      },
      {
        "id": "C",
        "style": "S2",
        "text": "Ik leg de procedure en de achterliggende redenen uit en oefen het gesprek samen."
      },
      {
        "id": "D",
        "style": "S1",
        "text": "Ik geef een duidelijke gespreksstructuur, concrete stappen en volg de eerste klachten nauw op."
      }
    ]
  },
  {
    "id": "leadership-sit-06",
    "number": 6,
    "targetStyle": "S2",
    "text": "Een medewerker heeft de basis van een nieuw rapporteringsprogramma geleerd, maar raakt gefrustreerd door terugkerende problemen en verliest motivatie.",
    "options": [
      {
        "id": "A",
        "style": "S2",
        "text": "Ik doorloop de taak opnieuw, demonstreer moeilijke onderdelen en laat de medewerker onder begeleiding oefenen."
      },
      {
        "id": "B",
        "style": "S1",
        "text": "Ik geef een exacte werkinstructie en controleer iedere rapportage."
      },
      {
        "id": "C",
        "style": "S4",
        "text": "Ik draag het volledige rapporteringsproces over en bespreek alleen het eindresultaat."
      },
      {
        "id": "D",
        "style": "S3",
        "text": "Ik luister naar de frustratie en laat de medewerker zelf bepalen welke aanpassing nodig is."
      }
    ]
  },
  {
    "id": "leadership-sit-07",
    "number": 7,
    "targetStyle": "S3",
    "text": "Een ervaren specialist kan een nieuwe prioriteit inhoudelijk uitvoeren, maar staat er kritisch tegenover en toont weinig betrokkenheid.",
    "options": [
      {
        "id": "A",
        "style": "S1",
        "text": "Ik leg de vereiste stappen vast en controleer of ze worden uitgevoerd."
      },
      {
        "id": "B",
        "style": "S3",
        "text": "Ik onderzoek de bezwaren, betrek de specialist bij de concrete aanpak en bespreek wat nodig is om verder te kunnen."
      },
      {
        "id": "C",
        "style": "S2",
        "text": "Ik leg mijn plan uit en begeleid de specialist stap voor stap bij de invoering."
      },
      {
        "id": "D",
        "style": "S4",
        "text": "Ik laat de specialist volledig zelf beslissen of en hoe de prioriteit wordt uitgevoerd."
      }
    ]
  },
  {
    "id": "leadership-sit-08",
    "number": 8,
    "targetStyle": "S4",
    "text": "Een zelfsturend team levert al geruime tijd sterke resultaten. Het team begint aan een nieuw project dat inhoudelijk sterk lijkt op eerdere opdrachten.",
    "options": [
      {
        "id": "A",
        "style": "S2",
        "text": "Ik bespreek mijn voorkeursaanpak en blijf tijdens de uitvoering intensief coachen."
      },
      {
        "id": "B",
        "style": "S1",
        "text": "Ik verdeel de rollen, leg de planning vast en controleer de werkzaamheden frequent."
      },
      {
        "id": "C",
        "style": "S4",
        "text": "Ik spreek resultaten, randvoorwaarden en mijlpalen af en laat het team de uitvoering organiseren."
      },
      {
        "id": "D",
        "style": "S3",
        "text": "Ik faciliteer de gezamenlijke keuzes en blijf bij belangrijke beslissingen nauw betrokken."
      }
    ]
  },
  {
    "id": "leadership-sit-09",
    "number": 9,
    "targetStyle": "S1",
    "text": "Een enthousiaste vrijwilliger coördineert voor het eerst een groot evenement, maar heeft nog geen ervaring met planning of taakverdeling.",
    "options": [
      {
        "id": "A",
        "style": "S4",
        "text": "Ik laat de vrijwilliger het evenement volledig ontwerpen en kom alleen tussenbeide wanneer daarom wordt gevraagd."
      },
      {
        "id": "B",
        "style": "S3",
        "text": "Ik vraag hoe de vrijwilliger het wil aanpakken en bied ondersteuning waar nodig."
      },
      {
        "id": "C",
        "style": "S1",
        "text": "Ik leg de planningsstappen, verantwoordelijkheden en eerste controlemomenten duidelijk vast."
      },
      {
        "id": "D",
        "style": "S2",
        "text": "Ik maak samen een plan, licht de keuzes toe en begeleid de vrijwilliger tijdens de voorbereiding."
      }
    ]
  },
  {
    "id": "leadership-sit-10",
    "number": 10,
    "targetStyle": "S2",
    "text": "Een medewerker heeft enige ervaring met onderhandelingen, maar enkele recente mislukkingen hebben het vertrouwen en de motivatie verminderd.",
    "options": [
      {
        "id": "A",
        "style": "S3",
        "text": "Ik laat de medewerker de eerdere gesprekken analyseren en ondersteun de gekozen verbeteringen."
      },
      {
        "id": "B",
        "style": "S4",
        "text": "Ik draag een volgende onderhandeling volledig over en bespreek achteraf het resultaat."
      },
      {
        "id": "C",
        "style": "S1",
        "text": "Ik schrijf een exacte gesprekstechniek voor en controleer vooraf iedere stap."
      },
      {
        "id": "D",
        "style": "S2",
        "text": "Ik analyseer de gesprekken samen met de medewerker, leg aanvullende technieken uit en oefen die vooraf."
      }
    ]
  },
  {
    "id": "leadership-sit-11",
    "number": 11,
    "targetStyle": "S3",
    "text": "Een ervaren medewerker kan het werk goed uitvoeren, maar voelt zich onzeker door een ingrijpende organisatorische verandering.",
    "options": [
      {
        "id": "A",
        "style": "S3",
        "text": "Ik luister naar de bezorgdheden, betrek de medewerker bij keuzes en bespreek welke ondersteuning of ruimte nodig is."
      },
      {
        "id": "B",
        "style": "S2",
        "text": "Ik leg de verandering uitgebreid uit en geef een concrete werkwijze voor de komende periode."
      },
      {
        "id": "C",
        "style": "S4",
        "text": "Ik draag alle beslissingen rond de eigen werkzaamheden over en bespreek pas later hoe het ging."
      },
      {
        "id": "D",
        "style": "S1",
        "text": "Ik stel exacte taken en deadlines vast en volg de uitvoering nauw op."
      }
    ]
  },
  {
    "id": "leadership-sit-12",
    "number": 12,
    "targetStyle": "S4",
    "text": "Een ervaren team lost terugkerende problemen van klanten doorgaans snel en zorgvuldig op. De deskundigheid en betrokkenheid zijn hoog.",
    "options": [
      {
        "id": "A",
        "style": "S1",
        "text": "Ik centraliseer de beslissingen en laat iedere oplossing vooraf goedkeuren."
      },
      {
        "id": "B",
        "style": "S4",
        "text": "Ik leg resultaat- en escalatiegrenzen vast en laat het team de problemen zelfstandig afhandelen."
      },
      {
        "id": "C",
        "style": "S3",
        "text": "Ik begeleid de bespreking van iedere belangrijke situatie en neem beslissingen samen met het team."
      },
      {
        "id": "D",
        "style": "S2",
        "text": "Ik geef een voorkeursaanpak, licht die toe en geef bij iedere situatie feedback."
      }
    ]
  },
  {
    "id": "leadership-sit-13",
    "number": 13,
    "targetStyle": "S1",
    "text": "Een nieuwe coördinator moet voor het eerst een belangrijke wettelijke deadline bewaken. De motivatie is hoog, maar de inhoudelijke kennis ontbreekt nog.",
    "options": [
      {
        "id": "A",
        "style": "S4",
        "text": "Ik laat de coördinator het volledige plan opstellen en blijf beschikbaar voor vragen."
      },
      {
        "id": "B",
        "style": "S1",
        "text": "Ik leg de stappen, deadlines, verantwoordelijkheden en kwaliteitscontroles nauwkeurig vast."
      },
      {
        "id": "C",
        "style": "S2",
        "text": "Ik bespreek de vereisten, maak samen een plan en begeleid de coördinator bij de uitvoering."
      },
      {
        "id": "D",
        "style": "S3",
        "text": "Ik vraag de coördinator zelf een plan te ontwerpen en ondersteun waar onzekerheid ontstaat."
      }
    ]
  },
  {
    "id": "leadership-sit-14",
    "number": 14,
    "targetStyle": "S2",
    "text": "Een medewerker voert de routineonderdelen van een functie zelfstandig uit, maar loopt vast bij complexere dossiers en raakt daardoor gefrustreerd.",
    "options": [
      {
        "id": "A",
        "style": "S1",
        "text": "Ik geef per dossier directe instructies en controleer iedere beslissing."
      },
      {
        "id": "B",
        "style": "S3",
        "text": "Ik vraag de medewerker zelf oplossingen te bedenken en ondersteun vooral het vertrouwen."
      },
      {
        "id": "C",
        "style": "S2",
        "text": "Ik leg mijn redenering uit, werk enkele voorbeelden samen uit en bouw de zelfstandigheid geleidelijk op."
      },
      {
        "id": "D",
        "style": "S4",
        "text": "Ik draag ook de complexe dossiers volledig over en beoordeel ze alleen achteraf."
      }
    ]
  },
  {
    "id": "leadership-sit-15",
    "number": 15,
    "targetStyle": "S3",
    "text": "Een ervaren team beschikt over alle kennis voor een procesverbetering, maar interne meningsverschillen hebben het vertrouwen en de betrokkenheid verminderd.",
    "options": [
      {
        "id": "A",
        "style": "S4",
        "text": "Ik laat het team de meningsverschillen volledig zelfstandig oplossen."
      },
      {
        "id": "B",
        "style": "S2",
        "text": "Ik presenteer mijn voorkeursoplossing, licht die toe en begeleid de invoering."
      },
      {
        "id": "C",
        "style": "S1",
        "text": "Ik beslis welke oplossing wordt gebruikt en verdeel de taken."
      },
      {
        "id": "D",
        "style": "S3",
        "text": "Ik faciliteer het gesprek, breng bezorgdheden boven tafel en laat het team de oplossing mee vormgeven."
      }
    ]
  },
  {
    "id": "leadership-sit-16",
    "number": 16,
    "targetStyle": "S4",
    "text": "Een senior specialist beheerst het eigen domein, levert consequent sterke resultaten en vraagt om een verbeterproject zelfstandig te leiden.",
    "options": [
      {
        "id": "A",
        "style": "S4",
        "text": "Ik spreek succescriteria en beslissingsruimte af en laat de specialist het project leiden, met enkele vaste mijlpalen."
      },
      {
        "id": "B",
        "style": "S3",
        "text": "Ik blijf bij belangrijke keuzes actief betrokken en neem beslissingen samen met de specialist."
      },
      {
        "id": "C",
        "style": "S2",
        "text": "Ik geef een aanbevolen projectaanpak en coach de specialist door alle fasen."
      },
      {
        "id": "D",
        "style": "S1",
        "text": "Ik bepaal de exacte methode en vraag dagelijkse voortgangsinformatie."
      }
    ]
  },
  {
    "id": "leadership-sit-17",
    "number": 17,
    "targetStyle": "S1",
    "text": "Een nieuw samengesteld team moet onverwacht een noodprocedure uitvoeren die de teamleden nog nooit hebben geoefend. Ze willen helpen, maar zijn zichtbaar verward.",
    "options": [
      {
        "id": "A",
        "style": "S1",
        "text": "Ik wijs duidelijke rollen toe, geef de volgorde van handelen aan en controleer de eerste stappen onmiddellijk."
      },
      {
        "id": "B",
        "style": "S4",
        "text": "Ik laat het team zichzelf organiseren en grijp alleen in bij ernstige problemen."
      },
      {
        "id": "C",
        "style": "S3",
        "text": "Ik vraag het team welke ondersteuning nodig is en laat de aanpak verder aan hen over."
      },
      {
        "id": "D",
        "style": "S2",
        "text": "Ik leg de procedure en de redenen erachter uit en begeleid het team tijdens de uitvoering."
      }
    ]
  },
  {
    "id": "leadership-sit-18",
    "number": 18,
    "targetStyle": "S2",
    "text": "Een medewerker is onlangs voor het eerst leidinggevende geworden. De motivatie is groot, maar de nieuwe verantwoordelijkheden voelen overweldigend en de managementervaring is beperkt.",
    "options": [
      {
        "id": "A",
        "style": "S3",
        "text": "Ik luister naar de bezorgdheden en laat de medewerker zelf een aanpak ontwikkelen."
      },
      {
        "id": "B",
        "style": "S2",
        "text": "Ik help prioriteiten bepalen, leg belangrijke managementkeuzes uit en plan regelmatige coaching."
      },
      {
        "id": "C",
        "style": "S1",
        "text": "Ik schrijf voor welke beslissingen genomen moeten worden en controleer de uitvoering nauwgezet."
      },
      {
        "id": "D",
        "style": "S4",
        "text": "Ik draag de volledige verantwoordelijkheid over en laat de medewerker zelfstandig groeien in de functie."
      }
    ]
  },
  {
    "id": "leadership-sit-19",
    "number": 19,
    "targetStyle": "S3",
    "text": "Een ervaren projectmanager beschikt over de juiste vaardigheden, maar aarzelt om opnieuw een moeilijke stakeholder aan te spreken na een eerder conflict.",
    "options": [
      {
        "id": "A",
        "style": "S2",
        "text": "Ik stel een gesprekstechniek voor, licht die toe en oefen het gesprek vooraf."
      },
      {
        "id": "B",
        "style": "S4",
        "text": "Ik laat de projectmanager het stakeholdergesprek volledig zelfstandig afhandelen."
      },
      {
        "id": "C",
        "style": "S3",
        "text": "Ik bespreek de aarzeling, help mogelijke opties afwegen en laat de projectmanager de aanpak kiezen."
      },
      {
        "id": "D",
        "style": "S1",
        "text": "Ik schrijf exact voor wat er gezegd moet worden en laat de aanpak vooraf goedkeuren."
      }
    ]
  },
  {
    "id": "leadership-sit-20",
    "number": 20,
    "targetStyle": "S4",
    "text": "Een volwassen team werkt al lange tijd samen, kent de verantwoordelijkheden goed en levert stabiele resultaten zonder veel aansturing.",
    "options": [
      {
        "id": "A",
        "style": "S1",
        "text": "Ik leg een gedetailleerde werkwijze vast en voer frequente controles in."
      },
      {
        "id": "B",
        "style": "S2",
        "text": "Ik leg mijn voorkeursaanpak uit en coach het team bij de uitvoering."
      },
      {
        "id": "C",
        "style": "S3",
        "text": "Ik blijf nauw betrokken bij de beslissingen en ondersteun het team actief."
      },
      {
        "id": "D",
        "style": "S4",
        "text": "Ik spreek doelen en grenzen af, laat het team de aanpak bepalen en plan alleen periodieke evaluaties."
      }
    ]
  }
]);
