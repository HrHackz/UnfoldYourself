"use strict";

window.WORK_ENVIRONMENT_CULTURE_TEST_ID = "samenwerking::Werkomgeving- en cultuurvoorkeurtest";

window.WEC_CULTURE_ORDER = Object.freeze([
  "collaborate",
  "create",
  "compete",
  "control"
]);

window.WEC_CULTURE_LABELS = Object.freeze({
  collaborate: "Teamgerichte familiecultuur",
  create: "Horizontale start-upcultuur",
  compete: "Prestatiecultuur",
  control: "Hiërarchische organisatiecultuur"
});

window.WEC_CULTURE_RANKS = Object.freeze([
  { id: "most", label: "Past het meest", points: 40 },
  { id: "strong", label: "Past sterk", points: 30 },
  { id: "less", label: "Past minder", points: 20 },
  { id: "least", label: "Past het minst", points: 10 }
]);

window.WEC_QUESTIONS = Object.freeze([
  {
    id: "wec-culture-1",
    type: "culture-ranking",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 1,
    text: "Hoe ziet de algemene sfeer in jouw ideale organisatie eruit?",
    instruction: "Ken aan elke beschrijving één unieke positie toe: van ‘Past het meest’ tot ‘Past het minst’.",
    displayOrder: ["collaborate", "create", "compete", "control"],
    options: {
      collaborate: "De organisatie voelt persoonlijk en betrokken. Mensen kennen elkaar, helpen elkaar en voelen zich gezamenlijk verantwoordelijk voor wat er gebeurt.",
      create: "De organisatie is beweeglijk en ondernemend. Mensen proberen nieuwe mogelijkheden uit, nemen initiatief en durven berekende risico’s te nemen.",
      compete: "De organisatie is ambitieus en sterk resultaatgericht. Mensen willen zichtbaar presteren, doelen overtreffen en zich meten met sterke concurrenten.",
      control: "De organisatie werkt ordelijk en voorspelbaar. Duidelijke structuren, verantwoordelijkheden en procedures zorgen ervoor dat het werk beheerst verloopt."
    }
  },
  {
    id: "wec-culture-2",
    type: "culture-ranking",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 2,
    text: "Welke vorm van leiderschap past het beste bij jouw ideale organisatie?",
    instruction: "Ken aan elke beschrijving één unieke positie toe: van ‘Past het meest’ tot ‘Past het minst’.",
    displayOrder: ["create", "control", "collaborate", "compete"],
    options: {
      collaborate: "Leidinggevenden begeleiden, ondersteunen en ontwikkelen medewerkers. Ze luisteren, coachen en investeren in vertrouwen en samenwerking.",
      create: "Leidinggevenden geven ruimte aan initiatief, vernieuwing en experiment. Ze zetten een richting uit, maar laten medewerkers nieuwe wegen verkennen.",
      compete: "Leidinggevenden stellen uitdagende doelen, spreken mensen duidelijk aan op resultaten en houden het tempo en prestatieniveau hoog.",
      control: "Leidinggevenden coördineren, plannen en bewaken processen. Ze zorgen voor duidelijke taken, consistente afspraken en een efficiënte uitvoering."
    }
  },
  {
    id: "wec-culture-3",
    type: "culture-ranking",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 3,
    text: "Hoe worden medewerkers in jouw ideale organisatie aangestuurd en betrokken?",
    instruction: "Ken aan elke beschrijving één unieke positie toe: van ‘Past het meest’ tot ‘Past het minst’.",
    displayOrder: ["compete", "collaborate", "control", "create"],
    options: {
      collaborate: "Teamwerk, overleg en gezamenlijke verantwoordelijkheid staan centraal. Medewerkers worden betrokken bij beslissingen en ondersteunen elkaar.",
      create: "Medewerkers krijgen veel vrijheid om eigen ideeën, werkwijzen en projecten te ontwikkelen. Initiatief en eigenheid worden aangemoedigd.",
      compete: "Medewerkers krijgen duidelijke prestatiedoelen en worden aangespoord om hoge standaarden te behalen. Resultaten en persoonlijke verantwoordelijkheid wegen zwaar.",
      control: "Medewerkers werken binnen duidelijke rollen, afspraken en bevoegdheden. Continuïteit, betrouwbaarheid en voorspelbaar handelen zijn belangrijk."
    }
  },
  {
    id: "wec-culture-4",
    type: "culture-ranking",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 4,
    text: "Wat vormt volgens jou het belangrijkste bindmiddel van een sterke organisatie?",
    instruction: "Ken aan elke beschrijving één unieke positie toe: van ‘Past het meest’ tot ‘Past het minst’.",
    displayOrder: ["control", "compete", "create", "collaborate"],
    options: {
      collaborate: "Onderling vertrouwen, loyaliteit en betrokkenheid zorgen ervoor dat mensen zich met de organisatie en met elkaar verbonden voelen.",
      create: "De gezamenlijke wil om te vernieuwen en vooruit te gaan verbindt mensen. Nieuwe ideeën en ontwikkelingen geven de organisatie energie.",
      compete: "Gezamenlijke ambitie en de wil om sterke resultaten te behalen houden de organisatie scherp en doelgericht.",
      control: "Duidelijke regels, vaste afspraken en consistente werkmethoden zorgen voor samenhang en een betrouwbare uitvoering."
    }
  },
  {
    id: "wec-culture-5",
    type: "culture-ranking",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 5,
    text: "Waar moet jouw ideale organisatie vooral in investeren?",
    instruction: "Ken aan elke beschrijving één unieke positie toe: van ‘Past het meest’ tot ‘Past het minst’.",
    displayOrder: ["collaborate", "control", "create", "compete"],
    options: {
      collaborate: "In de ontwikkeling van mensen, open communicatie, vertrouwen en duurzame samenwerking.",
      create: "In experimenteren, nieuwe mogelijkheden, groei, innovatie en het vroeg herkennen van toekomstige kansen.",
      compete: "In sterke markt- of klantresultaten, productiviteit, ambitieuze doelstellingen en een onderscheidende positie.",
      control: "In stabiliteit, efficiënte processen, kwaliteitsbewaking, voorspelbaarheid en een betrouwbare dagelijkse werking."
    }
  },
  {
    id: "wec-culture-6",
    type: "culture-ranking",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 6,
    text: "Wanneer is een organisatie volgens jou werkelijk succesvol?",
    instruction: "Ken aan elke beschrijving één unieke positie toe: van ‘Past het meest’ tot ‘Past het minst’.",
    displayOrder: ["create", "compete", "collaborate", "control"],
    options: {
      collaborate: "Wanneer medewerkers zich betrokken voelen, goed samenwerken, zich kunnen ontwikkelen en langdurig bij de organisatie willen blijven.",
      create: "Wanneer de organisatie nieuwe oplossingen ontwikkelt, vooroploopt in vernieuwing en kansen benut die anderen nog niet hebben gezien.",
      compete: "Wanneer ambitieuze resultaten worden behaald, klanten of markten worden gewonnen en de organisatie beter presteert dan vergelijkbare organisaties.",
      control: "Wanneer werk betrouwbaar, tijdig en efficiënt wordt uitgevoerd, met constante kwaliteit en zo weinig mogelijk fouten of verspilling."
    }
  },
  {
    id: "wec-environment-scale",
    type: "axis-choice",
    category: "Deel 2 · Fysieke en logistieke werkomgeving",
    sectionIndex: 1,
    axisId: "scale",
    text: "Bij welke omvang en organisatiestructuur voel jij je waarschijnlijk het meest thuis?",
    instruction: "Klik op de keuze die het beste bij jouw voorkeur past.",
    options: [
      {
        id: "very-small",
        value: 0,
        title: "Duidelijk kleinere organisatie",
        description: "Een kleine onderneming, kmo of start-up met korte lijnen, brede functies en rechtstreeks contact met beslissers."
      },
      {
        id: "rather-small",
        value: 25,
        title: "Eerder een kleinere organisatie",
        description: "Ik verkies meestal een beperkte schaal, maar enige structuur en specialisatie zijn welkom."
      },
      {
        id: "neutral-scale",
        value: 50,
        title: "Geen duidelijke schaalvoorkeur",
        description: "De concrete functie, het team en de manier van organiseren zijn belangrijker dan de grootte."
      },
      {
        id: "rather-large",
        value: 75,
        title: "Eerder een grotere organisatie",
        description: "Ik verkies meestal meer afdelingen, ondersteuning en doorgroeimogelijkheden, zonder dat maximale schaal noodzakelijk is."
      },
      {
        id: "very-large",
        value: 100,
        title: "Duidelijk grotere organisatie",
        description: "Een corporate of multinational met gespecialiseerde functies, formele ondersteuning en interne of internationale mogelijkheden."
      }
    ]
  },
  {
    id: "wec-environment-location",
    type: "axis-choice",
    category: "Deel 2 · Fysieke en logistieke werkomgeving",
    sectionIndex: 2,
    axisId: "location",
    text: "Waar bevindt jouw ideale werklocatie zich?",
    instruction: "Klik op de keuze die het beste bij jouw voorkeur past.",
    options: [
      {
        id: "very-rural",
        value: 0,
        title: "Duidelijk landelijk of zeer rustig",
        description: "Een dorp, landelijke omgeving of rustige randgemeente met weinig drukte, veel ruimte en eenvoudig parkeren."
      },
      {
        id: "rather-rural",
        value: 25,
        title: "Eerder rustig gelegen",
        description: "Een kalme locatie buiten de drukste stadskern, maar nog voldoende bereikbaar en verbonden."
      },
      {
        id: "mixed-location",
        value: 50,
        title: "Gemengde ligging",
        description: "Goed bereikbaar en niet uitgesproken landelijk of grootstedelijk."
      },
      {
        id: "rather-urban",
        value: 75,
        title: "Eerder stedelijk gelegen",
        description: "Een levendige, goed bereikbare omgeving met stedelijke voorzieningen, zonder dat het absolute stadscentrum nodig is."
      },
      {
        id: "very-urban",
        value: 100,
        title: "Duidelijk grootstedelijk",
        description: "Het centrum van een dynamische stad of metropool met openbaar vervoer, voorzieningen en stedelijke energie."
      }
    ]
  },
  {
    id: "wec-environment-surroundings",
    type: "axis-choice",
    category: "Deel 2 · Fysieke en logistieke werkomgeving",
    sectionIndex: 3,
    axisId: "surroundings",
    text: "Wat wil je vooral aantreffen wanneer je tijdens de pauze of na het werk naar buiten stapt?",
    instruction: "Klik op de keuze die het beste bij jouw voorkeur past.",
    options: [
      {
        id: "very-green",
        value: 0,
        title: "Vooral groen en rust",
        description: "Parken, natuur, wandelmogelijkheden en voldoende ruimte om volledig te ontprikkelen."
      },
      {
        id: "rather-green",
        value: 25,
        title: "Eerder groen en rustig",
        description: "Rust en groen wegen zwaarder, al zijn enkele voorzieningen in de buurt welkom."
      },
      {
        id: "mixed-surroundings",
        value: 50,
        title: "Een evenwichtige combinatie",
        description: "Zowel rustige plekken als praktische en sociale voorzieningen binnen bereik."
      },
      {
        id: "rather-lively",
        value: 75,
        title: "Eerder levendig en voorzien",
        description: "Horeca, winkels en sociale activiteit wegen zwaarder, maar enige rust blijft belangrijk."
      },
      {
        id: "very-lively",
        value: 100,
        title: "Vooral levendigheid en voorzieningen",
        description: "Veel horeca, winkels, koffiebars en sociale activiteit direct rond de werkplek."
      }
    ]
  },
  {
    id: "wec-environment-interior",
    type: "visual-cards",
    category: "Deel 2 · Fysieke en logistieke werkomgeving",
    sectionIndex: 4,
    axisId: "interior",
    text: "Welke werkplekomgeving ondersteunt jouw concentratie, productiviteit en werkbeleving het beste?",
    instruction: "Klik op de kaart die het beste aansluit. De tekst blijft leidend; de illustratie helpt alleen om de verschillen snel te zien.",
    options: [
      {
        id: "creative-hub",
        title: "Warm en informeel",
        subtitle: "Creative Hub",
        description: "Een huiselijke omgeving met planten, zachte materialen, informele zithoeken en ruimte voor spontane ontmoetingen.",
        visual: "creative"
      },
      {
        id: "corporate",
        title: "Strak en professioneel",
        subtitle: "Corporate en representatief",
        description: "Een moderne, verzorgde en minimalistische omgeving die professionaliteit, status en zakelijkheid uitstraalt.",
        visual: "corporate"
      },
      {
        id: "functional",
        title: "Praktisch en functioneel",
        subtitle: "No-nonsense",
        description: "Een sobere, overzichtelijke werkplek met goed materiaal, betrouwbare technologie en weinig afleidende vormgeving.",
        visual: "functional"
      },
      {
        id: "focus",
        title: "Rust en afscherming",
        subtitle: "Focusomgeving",
        description: "Stiltezones, afzonderlijke werkplekken of gesloten ruimtes waarin langdurige concentratie mogelijk is.",
        visual: "focus"
      }
    ]
  },
  {
    id: "wec-environment-rhythm",
    type: "choice-cards",
    category: "Deel 2 · Fysieke en logistieke werkomgeving",
    sectionIndex: 5,
    axisId: "rhythm",
    text: "Welke verdeling tussen werken op locatie en werken op afstand past het beste bij jou?",
    instruction: "Klik op de werkvorm die je bij een normale werkweek het liefst zou gebruiken.",
    options: [
      {
        id: "onsite",
        title: "Volledig op locatie",
        description: "Ik werk bij voorkeur vrijwel iedere werkdag op een vaste locatie. De fysieke scheiding tussen werk en privé en het dagelijkse contact met collega’s zijn belangrijk voor mij."
      },
      {
        id: "hybrid",
        title: "Hybride",
        description: "Ik combineer thuiswerk met werken op locatie. Ik gebruik thuiswerk voor zelfstandige taken en kantoor voor overleg, samenwerking en contact."
      },
      {
        id: "remote",
        title: "Volledig of grotendeels op afstand",
        description: "Ik werk bij voorkeur locatieonafhankelijk. Digitale samenwerking en vrijheid in waar ik werk wegen voor mij zwaarder dan dagelijkse aanwezigheid op kantoor."
      }
    ]
  }
]);
