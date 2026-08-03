"use strict";

const LEADERSHIP_STYLE_DEFINITIONS = Object.freeze([
  {
    "id": "democratic",
    "shortCode": "DEM",
    "name": "Democratisch leiderschap",
    "adjective": "democratische",
    "categoryLabel": "Democratisch",
    "traits": [
      "overleg",
      "gedeelde besluitvorming",
      "draagvlak",
      "meerdere perspectieven"
    ],
    "definition": "De mate waarin je anderen betrekt bij besluitvorming, perspectieven verzamelt en draagvlak probeert te creëren.",
    "core": "Je betrekt anderen actief bij besluiten en gelooft dat meerdere perspectieven de kwaliteit en aanvaarding van keuzes kunnen verbeteren. Je ziet leidinggeven minder als eenrichtingsverkeer en meer als het organiseren van een goed besluitvormingsproces.",
    "strength": "Je kunt draagvlak, betrokkenheid en gezamenlijke verantwoordelijkheid creëren.",
    "advantage": "Mensen voelen zich gehoord en leveren gemakkelijker ideeën of kritische informatie aan.",
    "risk": "Overmatig overleg kan besluitvorming vertragen. Niet iedere situatie vraagt consensus, en soms moet een leider tijdig zelf de knoop doorhakken.",
    "context": "Complexe vraagstukken, veranderingen, creatieve opdrachten en beslissingen waarbij uitvoering afhankelijk is van breed draagvlak.",
    "advice": "Maak vooraf duidelijk welke onderdelen bespreekbaar zijn, wie uiteindelijk beslist en wanneer het overleg stopt."
  },
  {
    "id": "authentic",
    "shortCode": "AUT",
    "name": "Authentiek leiderschap",
    "adjective": "authentieke",
    "categoryLabel": "Authentiek",
    "traits": [
      "zelfbewust",
      "transparant",
      "waardengedreven",
      "geloofwaardig"
    ],
    "definition": "Zelfbewust, waardengedreven en transparant handelen, zonder relevante tegeninformatie uit de weg te gaan.",
    "core": "Je probeert geloofwaardig en consistent te handelen vanuit duidelijke waarden. Je laat relevante twijfel of fouten zien en staat open voor informatie die je eerste oordeel kan tegenspreken.",
    "strength": "Je kunt vertrouwen opbouwen doordat mensen begrijpen waar je voor staat en hoe je beslissingen tot stand komen.",
    "advantage": "Je gedrag wordt voorspelbaar zonder dat je star hoeft te zijn. Openheid kan ook psychologische veiligheid ondersteunen.",
    "risk": "Transparantie kan doorslaan in te veel persoonlijke openheid. Trouw blijven aan jezelf mag geen reden worden om feedback of noodzakelijke gedragsaanpassing af te wijzen.",
    "context": "Verandering, ethische dilemma’s, vertrouwensherstel en situaties waarin geloofwaardigheid cruciaal is.",
    "advice": "Deel alleen persoonlijke informatie die functioneel is voor de samenwerking en toets je waarden ook aan feiten en andere perspectieven."
  },
  {
    "id": "situational",
    "shortCode": "SIT",
    "name": "Situationeel leiderschap",
    "adjective": "situationele",
    "categoryLabel": "Situationeel",
    "traits": [
      "adaptief",
      "observerend",
      "taakgericht diagnosticeren",
      "ondersteuning afstemmen"
    ],
    "definition": "De natuurlijke neiging om taakbekwaamheid en betrokkenheid te beoordelen en daarna de hoeveelheid richting en ondersteuning aan te passen.",
    "core": "Je probeert je manier van aansturen af te stemmen op de specifieke taak, ervaring en betrokkenheid van de ander. Je beschouwt leiderschap niet als één vaste aanpak.",
    "strength": "Je kunt beginners structuur bieden zonder ervaren medewerkers onnodig te controleren.",
    "advantage": "De hoeveelheid sturing en ondersteuning kan beter aansluiten bij wat iemand op dat moment nodig heeft.",
    "risk": "Veel schakelen kan voor anderen inconsistent of onvoorspelbaar lijken. Een onjuiste inschatting van competentie of motivatie kan tot over- of ondersturing leiden.",
    "context": "Teams met uiteenlopende ervaringsniveaus, leerprocessen, verandering en wisselende opdrachten.",
    "advice": "Leg uit waarom je iemand meer of minder sturing geeft en beoordeel ontwikkeling per taak in plaats van per persoon."
  },
  {
    "id": "transactional",
    "shortCode": "TRA",
    "name": "Transactioneel leiderschap",
    "adjective": "transactionele",
    "categoryLabel": "Transactioneel",
    "traits": [
      "heldere afspraken",
      "meetbare verwachtingen",
      "opvolging",
      "consequenties"
    ],
    "definition": "Sturen via heldere afspraken, meetbare verwachtingen, opvolging en consequenties.",
    "core": "Je creëert duidelijkheid via afspraken, meetbare verwachtingen, opvolging en consequenties. Mensen weten welke prestaties worden verwacht en wat daar tegenover staat.",
    "strength": "Je kunt structuur, voorspelbaarheid en operationele discipline creëren.",
    "advantage": "Taken, verantwoordelijkheden en prestatienormen worden minder dubbelzinnig.",
    "risk": "Een sterke nadruk op externe beloning en controle kan initiatief, experiment en intrinsieke motivatie beperken.",
    "context": "Gestandaardiseerde processen, korte deadlines, veiligheidsnormen, kwaliteitsbewaking en duidelijke prestatiedoelen.",
    "advice": "Combineer heldere afspraken met aandacht voor betekenis, autonomie en leren. Beloon niet alleen uitkomsten, maar ook verantwoord initiatief en samenwerking."
  },
  {
    "id": "transformational",
    "shortCode": "TRF",
    "name": "Transformationeel leiderschap",
    "adjective": "transformationele",
    "categoryLabel": "Transformationeel",
    "traits": [
      "visionair",
      "inspirerend",
      "verandergericht",
      "intellectueel stimulerend"
    ],
    "definition": "Mensen inspireren rond een toekomstbeeld, bestaande aannames uitdagen en groei of verandering stimuleren.",
    "core": "Je probeert mensen te verbinden aan een aantrekkelijk toekomstbeeld en stimuleert hen om bestaande aannames, werkwijzen en grenzen te overstijgen.",
    "strength": "Je kunt energie creëren voor vernieuwing, groei en langdurige verandering.",
    "advantage": "Mensen kunnen zich onderdeel voelen van een ambitie die groter is dan hun afzonderlijke taken.",
    "risk": "Een sterk toekomstbeeld kan dagelijkse uitvoering, haalbaarheid en operationele details overschaduwen. Inspiratie zonder structuur kan vermoeiend of ongeloofwaardig worden.",
    "context": "Cultuurverandering, innovatie, strategische vernieuwing en organisaties die een nieuwe richting zoeken.",
    "advice": "Vertaal iedere visie naar concrete mijlpalen, middelen en verantwoordelijkheden. Controleer of het team niet alleen geïnspireerd, maar ook praktisch toegerust is."
  },
  {
    "id": "laissez-faire",
    "shortCode": "LAI",
    "name": "Laissez-faire leiderschap",
    "adjective": "laissez-faire",
    "categoryLabel": "Laissez-faire",
    "traits": [
      "autonomie",
      "weinig inmenging",
      "ruimte",
      "terughoudend ingrijpen"
    ],
    "definition": "Een voorkeur voor zeer grote autonomie en weinig directe inmenging. Dit kan bewuste ruimte zijn, maar ook te weinig aanwezigheid worden.",
    "core": "Je geeft mensen veel vrijheid en beperkt je directe inmenging. Je vertrouwt erop dat deskundige professionals zelf bepalen hoe zij hun resultaat bereiken.",
    "strength": "Je kunt autonomie, eigenaarschap en onafhankelijk handelen stimuleren.",
    "advantage": "Sterke professionals krijgen ruimte om snel beslissingen te nemen zonder onnodige hiërarchische vertraging.",
    "risk": "Autonomie kan omslaan in afwezigheid. Wanneer doelen, bevoegdheden of ondersteuning onduidelijk zijn, kan het team gebrek aan leiding ervaren.",
    "context": "Zelfstandige experts, creatieve professionals en volwassen teams met duidelijke doelen en voldoende onderling vertrouwen.",
    "advice": "Geef vrijheid binnen expliciete grenzen. Spreek resultaat, beslissingsruimte, escalatiecriteria en vaste contactmomenten vooraf af."
  },
  {
    "id": "activist",
    "shortCode": "ACT",
    "name": "Activistisch leiderschap",
    "adjective": "activistische",
    "categoryLabel": "Activistisch",
    "traits": [
      "actiegericht",
      "ondernemend",
      "experimenterend",
      "hoog tempo"
    ],
    "definition": "Mobiliseren door actie, experimenteren, zichtbaar voorbeeldgedrag en een hoog uitvoeringstempo.",
    "core": "Je creëert beweging door zelf initiatief te nemen, te experimenteren en anderen via zichtbaar voorbeeldgedrag te mobiliseren.",
    "strength": "Je kunt traagheid doorbreken en snel een eerste tastbaar resultaat realiseren.",
    "advantage": "Teams ervaren energie en leren door concrete actie in plaats van uitsluitend door analyse.",
    "risk": "Een voortdurend hoog tempo kan onrust, versnippering of overbelasting veroorzaken. Niet ieder probleem is gebaat bij onmiddellijke actie.",
    "context": "Crisisherstel, ondernemende omgevingen, maatschappelijke bewegingen, innovatie en situaties waarin stilstand het grootste risico vormt.",
    "advice": "Bepaal vooraf wanneer een experiment wordt geëvalueerd en welke initiatieven niet verder worden voortgezet. Bouw bewust herstel en consolidatie in."
  },
  {
    "id": "authoritarian",
    "shortCode": "AUR",
    "name": "Autoritair leiderschap",
    "adjective": "autoritaire",
    "categoryLabel": "Autoritair",
    "traits": [
      "directief",
      "besluitvaardig",
      "controlerend",
      "taakgericht"
    ],
    "definition": "Centrale besluitvorming, directe instructie, controle en snelle naleving.",
    "core": "Je neemt de regie sterk in handen, neemt beslissingen centraal en verwacht duidelijke uitvoering van instructies.",
    "strength": "Je kunt snel orde, duidelijkheid en coördinatie creëren wanneer twijfel of vertraging riskant is.",
    "advantage": "Rollen en acties zijn onmiddellijk helder, wat in acute situaties fouten of gevaar kan beperken.",
    "risk": "Langdurige centrale controle kan initiatief, tegenspraak, leren en motivatie verminderen. Mensen kunnen relevante problemen verzwijgen wanneer afwijkende meningen ongewenst lijken.",
    "context": "Noodsituaties, ernstige veiligheidsrisico’s, acute tijdsdruk en situaties waarin snelle uniforme actie noodzakelijk is.",
    "advice": "Maak duidelijk wanneer directieve besluitvorming tijdelijk nodig is. Herstel daarna ruimte voor feedback, initiatief en gedeelde verantwoordelijkheid."
  },
  {
    "id": "participative",
    "shortCode": "PAR",
    "name": "Participerend leiderschap",
    "adjective": "participerende",
    "categoryLabel": "Participerend",
    "traits": [
      "samenwerkend",
      "operationeel betrokken",
      "benaderbaar",
      "gedeelde verantwoordelijkheid"
    ],
    "definition": "Als leider actief naast het team werken, operationeel betrokken blijven en verantwoordelijkheid delen.",
    "core": "Je blijft dicht bij het dagelijkse werk en ziet jezelf als actief onderdeel van het team. Je lost problemen regelmatig samen met anderen op.",
    "strength": "Je kunt verbondenheid creëren en problemen vroeg waarnemen doordat je de praktijk rechtstreeks kent.",
    "advantage": "De afstand tussen leiding en uitvoering blijft klein en mensen ervaren de leider als benaderbaar.",
    "risk": "Je kunt te veel operationeel werk naar je toe trekken. De formele leiderschapsrol kan vervagen en impopulaire beslissingen kunnen moeilijker worden.",
    "context": "Kleine teams, operationele verbeteringen, intensieve projectfasen en situaties waarin samenwerking en praktisch inzicht centraal staan.",
    "advice": "Werk mee zonder het eigenaarschap van anderen over te nemen. Reserveer voldoende tijd voor richting, prioriteiten en beslissingen die alleen jij kunt nemen."
  },
  {
    "id": "goal-oriented",
    "shortCode": "DOE",
    "name": "Doelgericht leiderschap",
    "adjective": "doelgerichte",
    "categoryLabel": "Doelgericht",
    "traits": [
      "focus",
      "koersvast",
      "resultaatgericht",
      "voortgangsbewaking"
    ],
    "definition": "Een centrale missie vertalen naar prioriteiten, voortgang bewaken en afleiding terugbrengen naar het afgesproken resultaat.",
    "core": "Je organiseert werk rond een duidelijke missie en bewaakt actief of tijd, middelen en inspanningen nog bijdragen aan het gewenste resultaat.",
    "strength": "Je kunt focus creëren en voorkomen dat een team energie verspreidt over te veel minder belangrijke activiteiten.",
    "advantage": "Mensen begrijpen waar zij naartoe werken en hoe hun bijdrage aansluit bij het geheel.",
    "risk": "Een sterke resultaatfocus kan de menselijke maat, kwaliteit van samenwerking of veranderende omstandigheden naar de achtergrond drukken.",
    "context": "Strategische prioriteiten, complexe programma’s, prestatieherstel en omgevingen met veel concurrerende verzoeken.",
    "advice": "Controleer niet alleen of het doel wordt gehaald, maar ook tegen welke menselijke en organisatorische kosten. Herbekijk doelen wanneer de context wezenlijk verandert."
  },
  {
    "id": "coaching",
    "shortCode": "COA",
    "name": "Coachend leiderschap",
    "adjective": "coachende",
    "categoryLabel": "Coachend",
    "traits": [
      "ontwikkelingsgericht",
      "luisterend",
      "stimulerend",
      "feedbackgericht"
    ],
    "definition": "Mensen ontwikkelen via vragen, feedback, oefening en geleidelijke zelfstandigheid.",
    "core": "Je gebruikt vragen, feedback en gerichte uitdaging om mensen te helpen zelfstandiger en deskundiger te worden.",
    "strength": "Je bouwt capaciteit op die ook zonder jouw directe tussenkomst beschikbaar blijft.",
    "advantage": "Mensen leren zelf analyseren, beslissen en verantwoordelijkheid dragen.",
    "risk": "Coachen vraagt tijd en is niet altijd passend bij noodsituaties of taken waarvoor iemand eerst duidelijke instructie nodig heeft.",
    "context": "Talentontwikkeling, nieuwe verantwoordelijkheden, reflectie, loopbaangroei en het opbouwen van duurzame zelfstandigheid.",
    "advice": "Maak onderscheid tussen een leerprobleem, een motivatieprobleem en een situatie waarin iemand simpelweg een helder antwoord of besluit nodig heeft."
  },
  {
    "id": "spiritual",
    "shortCode": "SPI",
    "name": "Spiritueel leiderschap",
    "adjective": "spirituele",
    "categoryLabel": "Spiritueel",
    "traits": [
      "waardengedreven",
      "verbindend",
      "betekenisgericht",
      "reflectief"
    ],
    "definition": "Leidinggeven vanuit gedeelde betekenis, waarden, verbondenheid en een bijdrage die verder reikt dan uitsluitend directe prestaties.",
    "core": "Je verbindt werk aan gedeelde waarden, betekenis en een bijdrage die verder gaat dan uitsluitend directe prestaties of financiële resultaten.",
    "strength": "Je kunt verbondenheid en intrinsieke betrokkenheid ondersteunen door duidelijk te maken waarom het werk ertoe doet.",
    "advantage": "Mensen kunnen hun dagelijkse bijdrage gemakkelijker plaatsen binnen een groter geheel.",
    "risk": "Abstracte taal over zingeving kan leeg of afstandelijk klinken wanneer zij niet wordt verbonden aan concrete beslissingen en gedrag. Waarden mogen ook niet worden opgelegd.",
    "context": "Missiegedreven organisaties, cultuurvorming, maatschappelijke dienstverlening en perioden waarin mensen opnieuw betekenis zoeken.",
    "advice": "Vertaal gedeelde waarden naar waarneembare keuzes, prioriteiten en omgangsvormen. Vraag medewerkers zelf welke betekenis zij in het werk ervaren."
  }
]);

const LEADERSHIP_STYLE_QUESTIONS = Object.freeze([
  {
    "id": "leadership-style-01",
    "number": 1,
    "styleId": "democratic",
    "styleCode": "DEM",
    "itemIndex": 1,
    "text": "Voordat ik een belangrijke beslissing neem, verzamel ik actief de inzichten van de betrokken mensen."
  },
  {
    "id": "leadership-style-02",
    "number": 2,
    "styleId": "authentic",
    "styleCode": "AUT",
    "itemIndex": 1,
    "text": "Ik leg uit welke waarden of principes een belangrijke beslissing sturen."
  },
  {
    "id": "leadership-style-03",
    "number": 3,
    "styleId": "situational",
    "styleCode": "SIT",
    "itemIndex": 1,
    "text": "Voordat ik iemand aanstuur, beoordeel ik hoeveel ervaring en vertrouwen die persoon voor deze specifieke taak heeft."
  },
  {
    "id": "leadership-style-04",
    "number": 4,
    "styleId": "transactional",
    "styleCode": "TRA",
    "itemIndex": 1,
    "text": "Ik maak vooraf concreet welke prestaties, termijnen en kwaliteitsnormen worden verwacht."
  },
  {
    "id": "leadership-style-05",
    "number": 5,
    "styleId": "transformational",
    "styleCode": "TRF",
    "itemIndex": 1,
    "text": "Ik verbind dagelijkse werkzaamheden aan een aantrekkelijk beeld van wat we op langere termijn willen bereiken."
  },
  {
    "id": "leadership-style-06",
    "number": 6,
    "styleId": "laissez-faire",
    "styleCode": "LAI",
    "itemIndex": 1,
    "text": "Ik geef deskundige medewerkers veel vrijheid en plan weinig vaste controlemomenten."
  },
  {
    "id": "leadership-style-07",
    "number": 7,
    "styleId": "activist",
    "styleCode": "ACT",
    "itemIndex": 1,
    "text": "Wanneer een probleem lang blijft liggen, zet ik liever snel een eerste experiment op dan nog langer te overleggen."
  },
  {
    "id": "leadership-style-08",
    "number": 8,
    "styleId": "authoritarian",
    "styleCode": "AUR",
    "itemIndex": 1,
    "text": "Wanneer snelheid of veiligheid centraal staat, neem ik de beslissing zonder uitgebreid overleg."
  },
  {
    "id": "leadership-style-09",
    "number": 9,
    "styleId": "participative",
    "styleCode": "PAR",
    "itemIndex": 1,
    "text": "Wanneer dat nuttig is, werk ik zelf mee aan operationele taken in plaats van alleen opdrachten te verdelen."
  },
  {
    "id": "leadership-style-10",
    "number": 10,
    "styleId": "goal-oriented",
    "styleCode": "DOE",
    "itemIndex": 1,
    "text": "Ik vertaal een bredere missie naar concrete prioriteiten, mijlpalen en verantwoordelijkheden."
  },
  {
    "id": "leadership-style-11",
    "number": 11,
    "styleId": "coaching",
    "styleCode": "COA",
    "itemIndex": 1,
    "text": "Wanneer iemand vastloopt, stel ik eerst vragen voordat ik zelf een oplossing geef."
  },
  {
    "id": "leadership-style-12",
    "number": 12,
    "styleId": "spiritual",
    "styleCode": "SPI",
    "itemIndex": 1,
    "text": "Ik verbind het werk aan de bredere betekenis of bijdrage die het voor anderen kan hebben."
  },
  {
    "id": "leadership-style-13",
    "number": 13,
    "styleId": "transformational",
    "styleCode": "TRF",
    "itemIndex": 2,
    "text": "Ik daag mensen uit om bestaande werkwijzen kritisch te onderzoeken en nieuwe mogelijkheden te verkennen."
  },
  {
    "id": "leadership-style-14",
    "number": 14,
    "styleId": "transactional",
    "styleCode": "TRA",
    "itemIndex": 2,
    "text": "Ik koppel erkenning of beloning duidelijk aan gemaakte afspraken en geleverde resultaten."
  },
  {
    "id": "leadership-style-15",
    "number": 15,
    "styleId": "situational",
    "styleCode": "SIT",
    "itemIndex": 2,
    "text": "Ik geef verschillende mensen bewust een verschillend niveau van sturing bij vergelijkbare opdrachten."
  },
  {
    "id": "leadership-style-16",
    "number": 16,
    "styleId": "authentic",
    "styleCode": "AUT",
    "itemIndex": 2,
    "text": "Ik geef het openlijk toe wanneer ik een fout heb gemaakt of iets nog niet weet."
  },
  {
    "id": "leadership-style-17",
    "number": 17,
    "styleId": "democratic",
    "styleCode": "DEM",
    "itemIndex": 2,
    "text": "Bij een verschil van mening zorg ik dat meerdere standpunten worden besproken voordat een besluit wordt genomen."
  },
  {
    "id": "leadership-style-18",
    "number": 18,
    "styleId": "spiritual",
    "styleCode": "SPI",
    "itemIndex": 2,
    "text": "Ik gebruik gedeelde waarden als toetssteen bij belangrijke beslissingen."
  },
  {
    "id": "leadership-style-19",
    "number": 19,
    "styleId": "coaching",
    "styleCode": "COA",
    "itemIndex": 2,
    "text": "Ik pas mijn feedback aan de leerbehoefte en ontwikkelingsfase van de persoon aan."
  },
  {
    "id": "leadership-style-20",
    "number": 20,
    "styleId": "goal-oriented",
    "styleCode": "DOE",
    "itemIndex": 2,
    "text": "Ik volg regelmatig op of de werkzaamheden nog voldoende bijdragen aan het belangrijkste doel."
  },
  {
    "id": "leadership-style-21",
    "number": 21,
    "styleId": "participative",
    "styleCode": "PAR",
    "itemIndex": 2,
    "text": "Ik deel de verantwoordelijkheid voor zowel successen als mislukkingen zichtbaar met het team."
  },
  {
    "id": "leadership-style-22",
    "number": 22,
    "styleId": "authoritarian",
    "styleCode": "AUR",
    "itemIndex": 2,
    "text": "Nadat een beslissing is genomen, verwacht ik dat instructies worden uitgevoerd zonder de discussie opnieuw te openen."
  },
  {
    "id": "leadership-style-23",
    "number": 23,
    "styleId": "activist",
    "styleCode": "ACT",
    "itemIndex": 2,
    "text": "Ik probeer anderen te mobiliseren door zelf zichtbaar als eerste in actie te komen."
  },
  {
    "id": "leadership-style-24",
    "number": 24,
    "styleId": "laissez-faire",
    "styleCode": "LAI",
    "itemIndex": 2,
    "text": "Ik wacht meestal tot een team zelf om mijn tussenkomst vraagt voordat ik ingrijp."
  },
  {
    "id": "leadership-style-25",
    "number": 25,
    "styleId": "coaching",
    "styleCode": "COA",
    "itemIndex": 3,
    "text": "Ik geef mensen bewust opdrachten die net buiten hun huidige comfortzone liggen."
  },
  {
    "id": "leadership-style-26",
    "number": 26,
    "styleId": "spiritual",
    "styleCode": "SPI",
    "itemIndex": 3,
    "text": "Ik maak ruimte om met een team te bespreken waarom het werk de moeite waard is."
  },
  {
    "id": "leadership-style-27",
    "number": 27,
    "styleId": "democratic",
    "styleCode": "DEM",
    "itemIndex": 3,
    "text": "Ik laat mensen die door een beslissing worden geraakt, meedenken over de uiteindelijke keuze."
  },
  {
    "id": "leadership-style-28",
    "number": 28,
    "styleId": "authentic",
    "styleCode": "AUT",
    "itemIndex": 3,
    "text": "Ook onder druk probeer ik te handelen volgens dezelfde principes die ik normaal belangrijk vind."
  },
  {
    "id": "leadership-style-29",
    "number": 29,
    "styleId": "situational",
    "styleCode": "SIT",
    "itemIndex": 3,
    "text": "Wanneer iemand een taak beter begint te beheersen, verminder ik geleidelijk mijn directe begeleiding."
  },
  {
    "id": "leadership-style-30",
    "number": 30,
    "styleId": "transactional",
    "styleCode": "TRA",
    "itemIndex": 3,
    "text": "Ik volg afwijkingen van afspraken actief op en grijp in wanneer resultaten achterblijven."
  },
  {
    "id": "leadership-style-31",
    "number": 31,
    "styleId": "transformational",
    "styleCode": "TRF",
    "itemIndex": 3,
    "text": "Ik stimuleer mensen om verder te kijken dan hun directe eigen belang wanneer een gezamenlijk doel belangrijk is."
  },
  {
    "id": "leadership-style-32",
    "number": 32,
    "styleId": "laissez-faire",
    "styleCode": "LAI",
    "itemIndex": 3,
    "text": "Ik laat mensen hun eigen werkwijze bepalen, ook wanneer er nog enige onzekerheid bestaat."
  },
  {
    "id": "leadership-style-33",
    "number": 33,
    "styleId": "activist",
    "styleCode": "ACT",
    "itemIndex": 3,
    "text": "Ik behandel kleine mislukkingen vooral als informatie waarmee we de volgende poging kunnen verbeteren."
  },
  {
    "id": "leadership-style-34",
    "number": 34,
    "styleId": "authoritarian",
    "styleCode": "AUR",
    "itemIndex": 3,
    "text": "In risicovolle omstandigheden houd ik de controle liever sterk bij mezelf."
  },
  {
    "id": "leadership-style-35",
    "number": 35,
    "styleId": "participative",
    "styleCode": "PAR",
    "itemIndex": 3,
    "text": "Ik zorg dat teamleden mij gemakkelijk kunnen aanspreken over dagelijkse problemen."
  },
  {
    "id": "leadership-style-36",
    "number": 36,
    "styleId": "goal-oriented",
    "styleCode": "DOE",
    "itemIndex": 3,
    "text": "Wanneer overleg afdwaalt, breng ik de aandacht terug naar het resultaat dat we moeten bereiken."
  },
  {
    "id": "leadership-style-37",
    "number": 37,
    "styleId": "situational",
    "styleCode": "SIT",
    "itemIndex": 4,
    "text": "Ik leg uit waarom ik bij de ene persoon directiever optreed dan bij de andere."
  },
  {
    "id": "leadership-style-38",
    "number": 38,
    "styleId": "authentic",
    "styleCode": "AUT",
    "itemIndex": 4,
    "text": "Ik nodig mensen uit om informatie te delen die mijn eigen standpunt kan tegenspreken."
  },
  {
    "id": "leadership-style-39",
    "number": 39,
    "styleId": "democratic",
    "styleCode": "DEM",
    "itemIndex": 4,
    "text": "Ik neem bewust extra tijd voor overleg wanneer dit het draagvlak voor een beslissing kan vergroten."
  },
  {
    "id": "leadership-style-40",
    "number": 40,
    "styleId": "spiritual",
    "styleCode": "SPI",
    "itemIndex": 4,
    "text": "Ik besteed aandacht aan de mate waarin mensen zich verbonden en werkelijk onderdeel van de groep voelen."
  },
  {
    "id": "leadership-style-41",
    "number": 41,
    "styleId": "coaching",
    "styleCode": "COA",
    "itemIndex": 4,
    "text": "Ik bespreek niet alleen de huidige prestatie, maar ook welke vaardigheden iemand verder wil ontwikkelen."
  },
  {
    "id": "leadership-style-42",
    "number": 42,
    "styleId": "goal-oriented",
    "styleCode": "DOE",
    "itemIndex": 4,
    "text": "Ik herverdeel tijd of middelen wanneer blijkt dat een belangrijk doel anders niet gehaald wordt."
  },
  {
    "id": "leadership-style-43",
    "number": 43,
    "styleId": "participative",
    "styleCode": "PAR",
    "itemIndex": 4,
    "text": "Bij een lastig probleem werk ik regelmatig samen met het team aan de oplossing."
  },
  {
    "id": "leadership-style-44",
    "number": 44,
    "styleId": "authoritarian",
    "styleCode": "AUR",
    "itemIndex": 4,
    "text": "Ik leg rollen, procedures en verantwoordelijkheden vaak gedetailleerd vast."
  },
  {
    "id": "leadership-style-45",
    "number": 45,
    "styleId": "activist",
    "styleCode": "ACT",
    "itemIndex": 4,
    "text": "Wanneer een doel dringend is, creëer ik bewust tempo en een gevoel van gezamenlijke beweging."
  },
  {
    "id": "leadership-style-46",
    "number": 46,
    "styleId": "laissez-faire",
    "styleCode": "LAI",
    "itemIndex": 4,
    "text": "Wanneer een team tijdelijk weinig richting ervaart, probeer ik te voorkomen dat ik de regie te snel overneem."
  },
  {
    "id": "leadership-style-47",
    "number": 47,
    "styleId": "transformational",
    "styleCode": "TRF",
    "itemIndex": 4,
    "text": "Ik spreek vertrouwen uit in wat mensen kunnen ontwikkelen, ook wanneer ze dat zelf nog niet volledig zien."
  },
  {
    "id": "leadership-style-48",
    "number": 48,
    "styleId": "transactional",
    "styleCode": "TRA",
    "itemIndex": 4,
    "text": "Ik maak duidelijk welke middelen en ondersteuning beschikbaar zijn in ruil voor afgesproken verantwoordelijkheden."
  },
  {
    "id": "leadership-style-49",
    "number": 49,
    "styleId": "participative",
    "styleCode": "PAR",
    "itemIndex": 5,
    "text": "Ik baseer beslissingen graag op wat ik zelf rechtstreeks in de dagelijkse praktijk heb waargenomen."
  },
  {
    "id": "leadership-style-50",
    "number": 50,
    "styleId": "goal-oriented",
    "styleCode": "DOE",
    "itemIndex": 5,
    "text": "Ik bescherm afgesproken prioriteiten tegen verzoeken die veel energie kosten maar weinig bijdragen aan het hoofddoel."
  },
  {
    "id": "leadership-style-51",
    "number": 51,
    "styleId": "coaching",
    "styleCode": "COA",
    "itemIndex": 5,
    "text": "Ik accepteer soms een tijdelijk lager werktempo wanneer iemand daardoor duurzaam zelfstandiger kan worden."
  },
  {
    "id": "leadership-style-52",
    "number": 52,
    "styleId": "spiritual",
    "styleCode": "SPI",
    "itemIndex": 5,
    "text": "Ook onder hoge prestatiedruk probeer ik menselijke waardigheid en respect als duidelijke grens te bewaken."
  },
  {
    "id": "leadership-style-53",
    "number": 53,
    "styleId": "democratic",
    "styleCode": "DEM",
    "itemIndex": 5,
    "text": "Ook onder tijdsdruk probeer ik kort ruimte te maken voor relevante input uit het team."
  },
  {
    "id": "leadership-style-54",
    "number": 54,
    "styleId": "authentic",
    "styleCode": "AUT",
    "itemIndex": 5,
    "text": "Ik maak mijn redenering zichtbaar wanneer dit anderen helpt begrijpen waarom ik een keuze maak."
  },
  {
    "id": "leadership-style-55",
    "number": 55,
    "styleId": "situational",
    "styleCode": "SIT",
    "itemIndex": 5,
    "text": "Wanneer mijn aanpak niet het gewenste effect heeft, verander ik bewust de manier waarop ik leidinggeef."
  },
  {
    "id": "leadership-style-56",
    "number": 56,
    "styleId": "transactional",
    "styleCode": "TRA",
    "itemIndex": 5,
    "text": "Mijn feedback gaat vaak over de mate waarin afgesproken normen of doelstellingen zijn behaald."
  },
  {
    "id": "leadership-style-57",
    "number": 57,
    "styleId": "transformational",
    "styleCode": "TRF",
    "itemIndex": 5,
    "text": "Ik probeer energie en overtuiging vast te houden tijdens ingrijpende veranderingen."
  },
  {
    "id": "leadership-style-58",
    "number": 58,
    "styleId": "laissez-faire",
    "styleCode": "LAI",
    "itemIndex": 5,
    "text": "Ik laat interne problemen zo lang mogelijk door het team zelf oplossen, tenzij het resultaat duidelijk in gevaar komt."
  },
  {
    "id": "leadership-style-59",
    "number": 59,
    "styleId": "activist",
    "styleCode": "ACT",
    "itemIndex": 5,
    "text": "Ik start regelmatig nieuwe initiatieven om vooruitgang of verandering te versnellen."
  },
  {
    "id": "leadership-style-60",
    "number": 60,
    "styleId": "authoritarian",
    "styleCode": "AUR",
    "itemIndex": 5,
    "text": "Wanneer iemand duidelijk van een noodzakelijke werkwijze afwijkt, corrigeer ik dat snel en rechtstreeks."
  }
]);

const LEADERSHIP_FREQUENCY_CHOICES = Object.freeze([
  { value: 0, label: "Bijna nooit" },
  { value: 1, label: "Zelden" },
  { value: 2, label: "Soms" },
  { value: 3, label: "Vaak" },
  { value: 4, label: "Bijna altijd" }
]);
