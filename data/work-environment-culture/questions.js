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

window.WEC_QUESTIONS = Object.freeze([
  {
    id: "wec-culture-1",
    type: "culture-distribution",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 1,
    text: "Hoe ziet de algemene sfeer in jouw ideale organisatie eruit?",
    instruction: "Verdeel exact 100 punten. Geef meer punten aan beschrijvingen die sterker bij jouw ideale organisatie passen.",
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
    type: "culture-distribution",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 2,
    text: "Welke vorm van leiderschap past het beste bij jouw ideale organisatie?",
    instruction: "Verdeel exact 100 punten over de vier beschrijvingen.",
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
    type: "culture-distribution",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 3,
    text: "Hoe worden medewerkers in jouw ideale organisatie aangestuurd en betrokken?",
    instruction: "Verdeel exact 100 punten over de vier beschrijvingen.",
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
    type: "culture-distribution",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 4,
    text: "Wat vormt volgens jou het belangrijkste bindmiddel van een sterke organisatie?",
    instruction: "Verdeel exact 100 punten over de vier beschrijvingen.",
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
    type: "culture-distribution",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 5,
    text: "Waar moet jouw ideale organisatie vooral in investeren?",
    instruction: "Verdeel exact 100 punten over de vier beschrijvingen.",
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
    type: "culture-distribution",
    category: "Deel 1 · Gewenste werkcultuur",
    sectionIndex: 6,
    text: "Wanneer is een organisatie volgens jou werkelijk succesvol?",
    instruction: "Verdeel exact 100 punten over de vier beschrijvingen.",
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
    type: "bipolar-slider",
    category: "Deel 2 · Fysieke en logistieke werkomgeving",
    sectionIndex: 1,
    axisId: "scale",
    text: "Bij welke omvang en organisatiestructuur voel jij je waarschijnlijk het meest thuis?",
    instruction: "Plaats de schuif op de positie die het beste bij jouw voorkeur past.",
    left: {
      title: "Kleine onderneming, kmo of start-up",
      description: "Korte communicatielijnen, brede functies, direct contact met beslissers en veel zichtbare invloed op het geheel."
    },
    middle: {
      title: "Geen uitgesproken schaalvoorkeur",
      description: "De concrete functie, het team en de manier van organiseren zijn belangrijker dan de grootte van de organisatie."
    },
    right: {
      title: "Grote organisatie, corporate of multinational",
      description: "Duidelijke afdelingen, gespecialiseerde functies, formele ondersteuning en meer interne of internationale mogelijkheden."
    }
  },
  {
    id: "wec-environment-location",
    type: "bipolar-slider",
    category: "Deel 2 · Fysieke en logistieke werkomgeving",
    sectionIndex: 2,
    axisId: "location",
    text: "Waar bevindt jouw ideale werklocatie zich?",
    instruction: "Plaats de schuif op de positie die het beste bij jouw voorkeur past.",
    left: {
      title: "Landelijk of in een rustige randgemeente",
      description: "Minder drukte, gemakkelijker parkeren, meer ruimte en een kalmere omgeving."
    },
    middle: {
      title: "Gemengde ligging",
      description: "Goed bereikbaar, maar niet noodzakelijk midden in een zeer drukke stad of een uitgesproken landelijke omgeving."
    },
    right: {
      title: "In een dynamische stad of grootstedelijke omgeving",
      description: "Veel bereikbaarheid, stedelijke energie, openbaar vervoer en voorzieningen in de directe omgeving."
    }
  },
  {
    id: "wec-environment-surroundings",
    type: "bipolar-slider",
    category: "Deel 2 · Fysieke en logistieke werkomgeving",
    sectionIndex: 3,
    axisId: "surroundings",
    text: "Wat wil je vooral aantreffen wanneer je tijdens de pauze of na het werk naar buiten stapt?",
    instruction: "Plaats de schuif op de positie die het beste bij jouw voorkeur past.",
    left: {
      title: "Groen en rust",
      description: "Parken, wandelmogelijkheden, natuur en voldoende ruimte om te ontprikkelen."
    },
    middle: {
      title: "Een combinatie",
      description: "Zowel rustige plekken als praktische of sociale voorzieningen binnen bereik."
    },
    right: {
      title: "Levendigheid en voorzieningen",
      description: "Horeca, winkels, koffiebars, sociale activiteit en mogelijkheden om mensen te ontmoeten."
    }
  },
  {
    id: "wec-environment-interior",
    type: "visual-cards",
    category: "Deel 2 · Fysieke en logistieke werkomgeving",
    sectionIndex: 4,
    axisId: "interior",
    text: "Welke werkplekomgeving ondersteunt jouw concentratie, productiviteit en werkbeleving het beste?",
    instruction: "Kies de kaart die het best aansluit. De tekst blijft leidend; de illustratie helpt alleen om de verschillen snel te zien.",
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
    instruction: "Kies de werkvorm die je bij een normale werkweek het liefst zou gebruiken.",
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
