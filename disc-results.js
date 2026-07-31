"use strict";

/*
  Unfold Yourself — resultaten voor de DISC-gedragsstijltest

  Primaire meetlaag:
  - IPIP-IPC
  - acht interpersoonlijke circumplexrichtingen

  Secundaire interpretatielaag:
  - vier DISC-geïnspireerde samenvattingen
  - geen officiële of gelicentieerde DISC/Everything DiSC-meting

  De C-samenvatting beschrijft in deze test interpersoonlijke
  afstand en terughoudendheid. De IPIP-IPC meet hiermee geen
  algemene consciëntieusheid, nauwkeurigheid of werkdiscipline.
*/

window.DISC_RESULT_METADATA = {
  "id": "disc-ipip-ipc-results-nl",
  "title": "DISC-gedragsstijltest",
  "scientificBase": {
    "primaryInstrument": "IPIP-IPC, 32 items",
    "model": "Interpersoonlijk circumplex",
    "coreAxes": [
      {
        "id": "agency",
        "dutchLabel": "Sturing en invloed",
        "positivePole": "Dominant en sturend",
        "negativePole": "Volgend en terughoudend"
      },
      {
        "id": "communion",
        "dutchLabel": "Verbondenheid en afstand",
        "positivePole": "Warm en verbindend",
        "negativePole": "Zakelijk en afstandelijk"
      }
    ],
    "sources": [
      "Marston, W. M. (1928). Emotions of Normal People.",
      "Leary, T. (1957). Interpersonal Diagnosis of Personality.",
      "Wiggins, J. S. (1979). A psychological taxonomy of trait-descriptive terms: The interpersonal domain. Journal of Personality and Social Psychology, 37(3), 395–412.",
      "Markey, P. M., & Markey, C. N. (2009). A brief assessment of the interpersonal circumplex: The IPIP-IPC. Assessment, 16(4), 352–361. https://doi.org/10.1177/1073191109340382",
      "International Personality Item Pool, Oregon Research Institute: IPIP-IPC items and scoring key."
    ]
  },
  "interpretationLayer": {
    "description": "De acht IPIP-IPC-richtingen vormen de primaire, wetenschappelijk onderbouwde scorelaag. Unfold Yourself groepeert telkens twee aangrenzende interpersoonlijke richtingen tot een toegankelijke DISC-geïnspireerde samenvatting.",
    "styleAggregation": {
      "D": [
        "PA",
        "BC"
      ],
      "I": [
        "NO",
        "LM"
      ],
      "S": [
        "HI",
        "JK"
      ],
      "C": [
        "DE",
        "FG"
      ]
    },
    "importantLimitation": "Deze groepering is een transparante interpretatielaag van Unfold Yourself. Zij is geen onderdeel van de oorspronkelijke IPIP-IPC en is niet psychometrisch aangetoond als gelijkwaardig aan een officiële of gelicentieerde DISC- of Everything DiSC-meting."
  },
  "scoringGuidance": {
    "octantScore": "Bereken per IPIP-IPC-richting het gemiddelde van de vier antwoorden. Zet dit gemiddelde lineair om van 1–5 naar 0–100.",
    "styleScore": "Bereken iedere DISC-geïnspireerde stijl als het gemiddelde van de twee gekoppelde octantscores.",
    "primaryResult": "De hoogste stijlscore is de primaire samenvatting. De tweede hoogste stijlscore wordt alleen als secundaire invloed getoond wanneer het verschil inhoudelijk klein genoeg is.",
    "percentages": "De percentages zijn omgerekende eigen scores binnen deze vragenlijst. Het zijn geen percentielen en geen vergelijking met een bevolkingsnorm."
  },
  "disclaimer": "Het resultaat beschrijft zelfgerapporteerde interpersoonlijke voorkeuren. Het is geen diagnose, competentiemeting, selectie-instrument of bewijs van geschiktheid. De Nederlandstalige bewerking heeft nog geen eigen normgroep of onafhankelijke validatiestudie."
};

window.DISC_OCTANT_PROFILES = {
  "PA": {
    "code": "PA",
    "originalLabel": "Assured-Dominant",
    "title": "Zelfverzekerd en sturend",
    "shortDescription": "Je neemt gemakkelijk ruimte in, spreekt zichtbaar en oefent graag invloed uit.",
    "highScoreMeaning": "Een hogere score wijst erop dat je in contact met anderen relatief gemakkelijk de leiding neemt, je aanwezigheid laat merken en richting probeert te geven.",
    "lowerScoreMeaning": "Een lagere score wijst erop dat je minder behoefte hebt om zichtbaar te domineren of aandacht op te eisen.",
    "strengths": [
      "Neemt initiatief wanneer richting ontbreekt.",
      "Maakt standpunten en verwachtingen zichtbaar.",
      "Durft verantwoordelijkheid en invloed op te nemen.",
      "Kan beweging brengen in afwachtende groepen."
    ],
    "watchouts": [
      "Kan te veel ruimte innemen.",
      "Kan anderen onbedoeld overschaduwen.",
      "Kan luisteren verwarren met tijdverlies.",
      "Kan invloed te sterk koppelen aan zichtbaarheid."
    ],
    "communication": "Je communiceert waarschijnlijk het liefst duidelijk, energiek en doelgericht. Gesprekken werken beter wanneer er ruimte blijft voor vragen en inbreng van anderen.",
    "collaboration": "Je draagt vaak bij door initiatief, richting en tempo. Gedeeld eigenaarschap voorkomt dat samenwerking eenrichtingsverkeer wordt.",
    "stressResponse": "Onder druk kun je meer controle zoeken, luider of dwingender communiceren en sneller beslissen dan de groep kan volgen.",
    "growthAdvice": [
      "Vraag bewust wie nog niet aan bod kwam.",
      "Vat het perspectief van een ander samen voordat je richting bepaalt.",
      "Delegeer ook beslissingsruimte, niet alleen taken.",
      "Maak onderscheid tussen zichtbaar leiderschap en effectief leiderschap."
    ]
  },
  "BC": {
    "code": "BC",
    "originalLabel": "Arrogant-Calculating",
    "title": "Confronterend en kritisch",
    "shortDescription": "Je spreekt tegen, test standpunten en vermijdt een stevig meningsverschil niet snel.",
    "highScoreMeaning": "Een hogere score wijst erop dat je relatief direct reageert, ideeën kritisch bevraagt en weinig terughoudend bent wanneer je het ergens niet mee eens bent.",
    "lowerScoreMeaning": "Een lagere score wijst erop dat je confrontatie en scherpe tegenspraak minder snel opzoekt.",
    "strengths": [
      "Benoemt zwakke argumenten en onduidelijkheden.",
      "Durft moeilijke onderwerpen bespreekbaar te maken.",
      "Weerstaat groepsdruk en vanzelfsprekende aannames.",
      "Kan grenzen en onenigheid snel zichtbaar maken."
    ],
    "watchouts": [
      "Directheid kan scherp of kleinerend overkomen.",
      "Discussie kan belangrijker worden dan verbinding.",
      "Kan te snel reageren op irritatie.",
      "Kan nuance missen wanneer de spanning oploopt."
    ],
    "communication": "Je stijl is waarschijnlijk direct en toetsend. Je boodschap wordt sterker wanneer je kritiek koppelt aan feiten, bedoeling en respect.",
    "collaboration": "Je voegt waarde toe door kritische toetsing. Een veilige toon en nieuwsgierige vragen zorgen dat tegenspraak ook bruikbaar blijft.",
    "stressResponse": "Onder druk kun je snauwend, afwijzend of overmatig competitief reageren.",
    "growthAdvice": [
      "Formuleer kritiek als observatie en effect, niet als oordeel over de persoon.",
      "Vraag eerst welke afweging achter een standpunt zit.",
      "Kies bewust welke discussies het resultaat werkelijk verbeteren.",
      "Benoem ook wat al werkt voordat je aanscherpt."
    ]
  },
  "DE": {
    "code": "DE",
    "originalLabel": "Cold-Hearted",
    "title": "Afstandelijk en zelfredzaam",
    "shortDescription": "Je bewaart emotionele afstand en verwacht relatief veel zelfstandigheid van jezelf en anderen.",
    "highScoreMeaning": "Een hogere score wijst erop dat je minder snel wordt meegenomen door emotionele verhalen en verantwoordelijkheid sterk bij het individu laat.",
    "lowerScoreMeaning": "Een lagere score wijst erop dat problemen en emoties van anderen relatief gemakkelijk je aandacht en betrokkenheid oproepen.",
    "strengths": [
      "Kan emotionele afstand bewaren in moeilijke situaties.",
      "Stimuleert zelfstandigheid en persoonlijke verantwoordelijkheid.",
      "Blijft relatief zakelijk wanneer belangen botsen.",
      "Kan besluiten nemen zonder voortdurend bevestiging te zoeken."
    ],
    "watchouts": [
      "Kan ongeïnteresseerd of hard overkomen.",
      "Kan de behoefte aan steun onderschatten.",
      "Kan relationele gevolgen te laat opmerken.",
      "Kan afstand gebruiken om ongemak te vermijden."
    ],
    "communication": "Je communiceert waarschijnlijk zakelijk en compact. Erkenning van de menselijke impact maakt je boodschap toegankelijker zonder de inhoud te verzwakken.",
    "collaboration": "Je brengt zelfstandigheid en nuchterheid. Samenwerking verbetert wanneer je expliciet maakt wanneer en hoe anderen op je kunnen rekenen.",
    "stressResponse": "Onder druk kun je je emotioneel afsluiten, hulpvragen afhouden of sterk benadrukken dat iedereen zijn eigen problemen moet oplossen.",
    "growthAdvice": [
      "Erken emoties voordat je verantwoordelijkheid of oplossingen bespreekt.",
      "Vraag wat iemand nodig heeft in plaats van dat in te vullen.",
      "Maak betrokkenheid zichtbaar via concrete afspraken.",
      "Onderzoek of afstand bescherming biedt of werkelijk functioneel is."
    ]
  },
  "FG": {
    "code": "FG",
    "originalLabel": "Aloof-Introverted",
    "title": "Gereserveerd en privé",
    "shortDescription": "Je blijft sociaal eerder op de achtergrond en deelt persoonlijke informatie selectief.",
    "highScoreMeaning": "Een hogere score wijst erop dat je weinig praat, eerst observeert en je persoonlijke wereld sterk afschermt.",
    "lowerScoreMeaning": "Een lagere score wijst erop dat je gemakkelijker spreekt, zichtbaar deelneemt en persoonlijke informatie deelt.",
    "strengths": [
      "Observeert voordat je reageert.",
      "Kan zelfstandig en zonder veel sociale prikkels werken.",
      "Gaat zorgvuldig om met persoonlijke informatie.",
      "Laat zich minder snel meeslepen door groepsdruk."
    ],
    "watchouts": [
      "Ideeën en behoeften kunnen onzichtbaar blijven.",
      "Kan afstandelijk of moeilijk leesbaar overkomen.",
      "Kan contact uitstellen tot anderen initiatief nemen.",
      "Kan te lang alleen blijven worstelen."
    ],
    "communication": "Je hebt waarschijnlijk baat bij voorbereiding, duidelijke vragen en voldoende verwerkingstijd. Korte expliciete bijdragen voorkomen dat anderen je stilte verkeerd interpreteren.",
    "collaboration": "Je brengt rust en observatie. Teams benutten je bijdrage beter wanneer verwachtingen over contact, bereikbaarheid en besluitvorming helder zijn.",
    "stressResponse": "Onder druk kun je je verder terugtrekken, minder communiceren en problemen volledig zelfstandig proberen op te lossen.",
    "growthAdvice": [
      "Deel voorlopige gedachten voordat ze volledig uitgewerkt zijn.",
      "Benoem wanneer je verwerkingstijd nodig hebt.",
      "Plan gericht één-op-ééncontact in plaats van alleen groepscontact.",
      "Vraag tijdig om informatie of ondersteuning."
    ]
  },
  "HI": {
    "code": "HI",
    "originalLabel": "Unassured-Submissive",
    "title": "Bescheiden en volgend",
    "shortDescription": "Je eist weinig aandacht op, laat anderen uitspreken en neemt niet automatisch de leiding.",
    "highScoreMeaning": "Een hogere score wijst erop dat je jezelf relatief bescheiden opstelt, ruimte geeft en niet graag het middelpunt van de belangstelling bent.",
    "lowerScoreMeaning": "Een lagere score wijst erop dat je gemakkelijker aandacht inneemt, jezelf profileert of richting geeft.",
    "strengths": [
      "Geeft anderen ruimte om zich uit te spreken.",
      "Luistert zonder onmiddellijk over te nemen.",
      "Draagt bij zonder voortdurend erkenning te vragen.",
      "Kan hiërarchie en groepsrollen soepel respecteren."
    ],
    "watchouts": [
      "Eigen ideeën en grenzen kunnen onderbelicht blijven.",
      "Kan te snel meegaan met een dominante ander.",
      "Kan zichtbaarheid vermijden wanneer die nodig is.",
      "Kan erkenning missen doordat prestaties weinig worden benoemd."
    ],
    "communication": "Je communiceert waarschijnlijk rustig en weinig opdringerig. Duidelijke ik-boodschappen helpen om je positie zichtbaar te houden.",
    "collaboration": "Je ondersteunt een respectvolle gespreksruimte. Teams hebben er baat bij wanneer je ook actief aangeeft wat je nodig hebt en waar je anders over denkt.",
    "stressResponse": "Onder druk kun je jezelf verder terugtrekken, besluiten aan anderen overlaten of instemmen terwijl je intern twijfelt.",
    "growthAdvice": [
      "Formuleer je standpunt voordat je naar dat van anderen luistert.",
      "Spreek minimaal één bezwaar of behoefte expliciet uit.",
      "Maak je bijdrage en resultaten feitelijk zichtbaar.",
      "Oefen met vriendelijk maar duidelijk weigeren."
    ]
  },
  "JK": {
    "code": "JK",
    "originalLabel": "Unassuming-Ingenuous",
    "title": "Meegaand en oprecht",
    "shortDescription": "Je houdt sterk rekening met anderen, bent tolerant en probeert eerlijk en ongecompliceerd te handelen.",
    "highScoreMeaning": "Een hogere score wijst erop dat je anderen veel ruimte geeft, hun belangen gemakkelijk meeneemt en weinig behoefte hebt om jezelf voorop te zetten.",
    "lowerScoreMeaning": "Een lagere score wijst erop dat je eigen belang, positie of strategie relatief sterker bewaakt.",
    "strengths": [
      "Toont tolerantie en geduld.",
      "Is doorgaans eerlijk en weinig manipulatief.",
      "Houdt rekening met de impact op anderen.",
      "Ondersteunt samenwerking en wederzijds vertrouwen."
    ],
    "watchouts": [
      "Kan te veel verdragen voordat een grens wordt gesteld.",
      "Kan eigen behoeften structureel uitstellen.",
      "Kan naïef vertrouwen op goede bedoelingen.",
      "Kan moeilijke keuzes vermijden om niemand teleur te stellen."
    ],
    "communication": "Je toon is waarschijnlijk vriendelijk en oprecht. Je communicatie wordt krachtiger wanneer je verwachtingen en grenzen even direct benoemt als je begrip.",
    "collaboration": "Je helpt een coöperatieve cultuur bouwen. Gedeelde verantwoordelijkheid voorkomt dat jij ongemerkt te veel opvangt.",
    "stressResponse": "Onder druk kun je blijven toegeven, frustratie opkroppen of hopen dat een probleem vanzelf verdwijnt.",
    "growthAdvice": [
      "Stel grenzen wanneer de eerste signalen ontstaan.",
      "Controleer aannames over de bedoelingen van anderen.",
      "Maak wederkerigheid bespreekbaar.",
      "Zie een duidelijk verschil van mening niet automatisch als onvriendelijkheid."
    ]
  },
  "LM": {
    "code": "LM",
    "originalLabel": "Warm-Agreeable",
    "title": "Warm en ondersteunend",
    "shortDescription": "Je toont belangstelling, stelt mensen gerust en investeert actief in prettige relaties.",
    "highScoreMeaning": "Een hogere score wijst erop dat je gemakkelijk relationele warmte toont, informeert naar anderen en harmonie in contact belangrijk vindt.",
    "lowerScoreMeaning": "Een lagere score wijst erop dat je betrokkenheid minder zichtbaar of minder relationeel uitdrukt.",
    "strengths": [
      "Laat anderen zich gezien en gehoord voelen.",
      "Biedt geruststelling en emotionele steun.",
      "Bouwt gemakkelijk aan vertrouwen.",
      "Bevordert een toegankelijke en menselijke sfeer."
    ],
    "watchouts": [
      "Kan te veel emotionele verantwoordelijkheid opnemen.",
      "Kan spanning verzachten zonder het probleem op te lossen.",
      "Kan afhankelijk worden van relationele bevestiging.",
      "Kan eigen grenzen minder zichtbaar maken."
    ],
    "communication": "Je communiceert waarschijnlijk warm, bevestigend en mensgericht. Duidelijke inhoud en grenzen helpen voorkomen dat de kernboodschap verloren gaat.",
    "collaboration": "Je versterkt vertrouwen en psychologische toegankelijkheid. Je bijdrage blijft duurzaam wanneer zorg en verantwoordelijkheid worden gedeeld.",
    "stressResponse": "Onder druk kun je extra gaan zorgen, bevestiging zoeken of conflicten te snel proberen glad te strijken.",
    "growthAdvice": [
      "Vraag of iemand steun, advies of alleen aandacht nodig heeft.",
      "Maak onderscheid tussen empathie en verantwoordelijkheid overnemen.",
      "Benoem lastige informatie vriendelijk maar volledig.",
      "Plan herstel na perioden met veel emotionele afstemming."
    ]
  },
  "NO": {
    "code": "NO",
    "originalLabel": "Gregarious-Extraverted",
    "title": "Sociaal en expressief",
    "shortDescription": "Je legt gemakkelijk contact, start gesprekken en haalt energie uit sociale uitwisseling.",
    "highScoreMeaning": "Een hogere score wijst erop dat je je gemakkelijk tussen mensen beweegt, gesprekken initieert en sociale drukte relatief aantrekkelijk vindt.",
    "lowerScoreMeaning": "Een lagere score wijst erop dat je selectiever bent in sociaal contact of meer hersteltijd alleen nodig hebt.",
    "strengths": [
      "Legt snel nieuwe contacten.",
      "Brengt energie en zichtbaarheid in groepen.",
      "Start gesprekken en verlaagt sociale drempels.",
      "Kan uiteenlopende mensen bij elkaar brengen."
    ],
    "watchouts": [
      "Kan stilte of terughoudendheid te snel invullen.",
      "Kan meer spreken dan luisteren.",
      "Kan sociale activiteit boven verwerking plaatsen.",
      "Kan diepgang verliezen door veel contacten tegelijk."
    ],
    "communication": "Je communiceert waarschijnlijk spontaan en interactief. Pauzes, samenvattingen en gerichte vragen helpen om anderen evenveel ruimte te geven.",
    "collaboration": "Je brengt contact, energie en informele verbinding. Teams profiteren het meest wanneer enthousiasme wordt gekoppeld aan opvolging.",
    "stressResponse": "Onder druk kun je nog meer praten, afleiding zoeken of voortdurend bevestiging en contact opzoeken.",
    "growthAdvice": [
      "Laat bewust stiltes vallen voordat je reageert.",
      "Vraag naar de mening van rustige deelnemers.",
      "Plan tijd om gesprekken en besluiten te verwerken.",
      "Koppel sociaal enthousiasme aan concrete vervolgacties."
    ]
  }
};

window.DISC_STYLE_PROFILES = {
  "D": {
    "code": "D",
    "title": "Daadkracht",
    "subtitle": "Sturend en direct",
    "octants": [
      "PA",
      "BC"
    ],
    "summary": "Je DISC-geïnspireerde D-score vat de richtingen zelfverzekerd-sturend en confronterend-kritisch samen. Een hogere score wijst op een directe, invloedrijke en weinig afwachtende interpersoonlijke stijl.",
    "strengths": [
      "Neemt initiatief en verantwoordelijkheid.",
      "Maakt besluiten en verwachtingen zichtbaar.",
      "Durft moeilijke onderwerpen aan te kaarten.",
      "Brengt tempo wanneer een groep blijft twijfelen.",
      "Blijft relatief onafhankelijk van sociale goedkeuring."
    ],
    "watchouts": [
      "Kan overheersend of scherp overkomen.",
      "Kan snelheid boven draagvlak plaatsen.",
      "Kan rustige of voorzichtige signalen missen.",
      "Kan tegenspraak als vertraging ervaren.",
      "Kan relationele schade onderschatten."
    ],
    "communication": "Je hebt waarschijnlijk voorkeur voor kernachtige, directe communicatie met een duidelijk doel. Je effect neemt toe wanneer je actief luistert en uitlegt waarom een besluit nodig is.",
    "collaboration": "Je draagt bij via richting, tempo en kritische toetsing. Je werkt het best wanneer bevoegdheden duidelijk zijn en anderen voldoende ruimte houden om expertise en bezwaren in te brengen.",
    "motivators": [
      "Invloed en beslissingsruimte",
      "Uitdagende doelen",
      "Zichtbare voortgang",
      "Autonomie",
      "Eerlijke en directe communicatie"
    ],
    "stressors": [
      "Traagheid zonder duidelijke reden",
      "Onduidelijke verantwoordelijkheid",
      "Weinig invloed op de uitkomst",
      "Indirecte communicatie",
      "Herhaald uitstel van besluiten"
    ],
    "growthAdvice": [
      "Meet succes ook aan draagvlak en duurzame samenwerking.",
      "Vraag expliciet naar risico’s die je zelf minder snel ziet.",
      "Verlaag je tempo wanneer anderen cruciale informatie verwerken.",
      "Formuleer waardering even concreet als kritiek.",
      "Gebruik invloed om eigenaarschap te verdelen."
    ]
  },
  "I": {
    "code": "I",
    "title": "Invloed",
    "subtitle": "Sociaal en verbindend",
    "octants": [
      "NO",
      "LM"
    ],
    "summary": "Je DISC-geïnspireerde I-score vat de richtingen sociaal-expressief en warm-ondersteunend samen. Een hogere score wijst op een toegankelijke, relationele en zichtbaar communicatieve stijl.",
    "strengths": [
      "Legt gemakkelijk contact.",
      "Bouwt enthousiasme en vertrouwen.",
      "Maakt samenwerking sociaal toegankelijk.",
      "Voelt groepsreacties vaak snel aan.",
      "Kan mensen verbinden rond een gesprek of idee."
    ],
    "watchouts": [
      "Kan meer beloven dan praktisch wordt opgevolgd.",
      "Kan kritiek of afwijzing persoonlijk ervaren.",
      "Kan moeilijke inhoud te snel verzachten.",
      "Kan veel praten en minder luisteren.",
      "Kan afhankelijk worden van sociale energie of bevestiging."
    ],
    "communication": "Je communiceert waarschijnlijk levendig, warm en interactief. Structuur, samenvatting en concrete afspraken helpen om enthousiasme om te zetten in duidelijk resultaat.",
    "collaboration": "Je draagt bij via verbinding, sfeer en betrokkenheid. Je werkt het best wanneer er ruimte is voor contact, ideeën en zichtbare waardering, zonder dat opvolging vrijblijvend wordt.",
    "motivators": [
      "Contact en samenwerking",
      "Positieve invloed",
      "Erkenning en feedback",
      "Afwisseling",
      "Een toegankelijke teamsfeer"
    ],
    "stressors": [
      "Langdurige sociale isolatie",
      "Een koude of afwijzende toon",
      "Uitsluitend routinematig werk",
      "Weinig respons of waardering",
      "Conflicten die blijven doorsudderen"
    ],
    "growthAdvice": [
      "Sluit gesprekken af met eigenaar, actie en datum.",
      "Luister door zonder meteen een eigen ervaring te delen.",
      "Behandel kritische feedback als informatie over gedrag.",
      "Maak ook ruimte voor zelfstandig en geconcentreerd werk.",
      "Benoem moeilijke boodschappen volledig en respectvol."
    ]
  },
  "S": {
    "code": "S",
    "title": "Stabiliteit",
    "subtitle": "Bescheiden en meegaand",
    "octants": [
      "HI",
      "JK"
    ],
    "summary": "Je DISC-geïnspireerde S-score vat de richtingen bescheiden-volgend en meegaand-oprecht samen. Een hogere score wijst op een geduldige, weinig dominante en sterk rekening houdende stijl.",
    "strengths": [
      "Luistert en geeft anderen ruimte.",
      "Bouwt vertrouwen via betrouwbaarheid en tolerantie.",
      "Draagt bij aan rust en samenwerking.",
      "Houdt rekening met verschillende belangen.",
      "Trekt niet automatisch alle aandacht naar zichzelf."
    ],
    "watchouts": [
      "Kan grenzen of bezwaren te laat uitspreken.",
      "Kan dominante anderen te veel ruimte geven.",
      "Kan conflict vermijden ten koste van duidelijkheid.",
      "Kan eigen prestaties en behoeften onzichtbaar maken.",
      "Kan te veel verdragen om de relatie goed te houden."
    ],
    "communication": "Je communiceert waarschijnlijk rustig, respectvol en weinig opdringerig. Je invloed groeit wanneer je je eigen positie vroeg en concreet benoemt.",
    "collaboration": "Je draagt bij via geduld, ruimte en wederzijds vertrouwen. Je werkt het best in een respectvolle omgeving waar verandering wordt uitgelegd en waar meningsverschil veilig geuit kan worden.",
    "motivators": [
      "Betrouwbare relaties",
      "Rustige samenwerking",
      "Voorspelbare verwachtingen",
      "Tijd om te luisteren en af te stemmen",
      "Een nuttige ondersteunende bijdrage"
    ],
    "stressors": [
      "Harde confrontatie",
      "Voortdurende druk om zichtbaar te domineren",
      "Plotselinge relationele breuken",
      "Onredelijke tijdsdruk",
      "Een cultuur waarin grenzen weinig worden gerespecteerd"
    ],
    "growthAdvice": [
      "Benoem onenigheid wanneer ze nog klein is.",
      "Maak je grenzen concreet en controleerbaar.",
      "Laat je standpunt niet volledig afhangen van de sterkste stem.",
      "Vraag om tijd wanneer je niet direct wilt beslissen.",
      "Maak je bijdrage en resultaten zichtbaar."
    ]
  },
  "C": {
    "code": "C",
    "title": "Zakelijke terughoudendheid",
    "subtitle": "Gereserveerd en zelfstandig",
    "octants": [
      "DE",
      "FG"
    ],
    "summary": "Je DISC-geïnspireerde C-score vat de richtingen afstandelijk-zelfredzaam en gereserveerd-privé samen. Een hogere score wijst op een zelfstandige, weinig expressieve en relationeel terughoudende stijl.",
    "strengths": [
      "Bewaart afstand en zelfstandigheid.",
      "Observeert voordat er wordt gereageerd.",
      "Laat zich minder snel leiden door groepsdruk.",
      "Gaat selectief om met persoonlijke informatie.",
      "Kan zakelijk blijven wanneer emoties oplopen."
    ],
    "watchouts": [
      "Kan afstandelijk of ongeïnteresseerd overkomen.",
      "Kan steun en relationele gevolgen onderschatten.",
      "Kan ideeën, behoeften en twijfels te weinig delen.",
      "Kan te lang alleen blijven doorwerken.",
      "Kan zakelijkheid gebruiken om ongemak te vermijden."
    ],
    "communication": "Je communiceert waarschijnlijk compact, beheerst en selectief. Context, erkenning en expliciete bereikbaarheid helpen anderen om je stilte of afstand correct te begrijpen.",
    "collaboration": "Je draagt bij via zelfstandigheid, observatie en emotionele beheersing. Je werkt het best met duidelijke grenzen, voldoende voorbereiding en respect voor privacy en concentratie.",
    "motivators": [
      "Autonomie",
      "Rust en concentratie",
      "Duidelijke verantwoordelijkheden",
      "Zakelijke communicatie",
      "Ruimte om eerst te observeren"
    ],
    "stressors": [
      "Voortdurende sociale beschikbaarheid",
      "Emotionele druk",
      "Openbare persoonlijke confrontaties",
      "Onduidelijke grenzen",
      "Veel overleg zonder duidelijke noodzaak"
    ],
    "growthAdvice": [
      "Maak verwachtingen over contact en bereikbaarheid expliciet.",
      "Erken de menselijke impact voordat je naar oplossingen gaat.",
      "Deel voorlopige inzichten eerder.",
      "Vraag tijdig om informatie of hulp.",
      "Laat zelfstandigheid samengaan met zichtbare betrokkenheid."
    ],
    "namingNote": "Deze C-samenvatting gaat uitsluitend over interpersoonlijke afstand en terughoudendheid. De IPIP-IPC meet hier geen algemene consciëntieusheid, nauwkeurigheid of werkdiscipline."
  }
};

window.DISC_BLEND_PROFILES = {
  "DI": {
    "code": "DI",
    "title": "Daadkracht met sociale invloed",
    "primary": "D",
    "secondary": "I",
    "summary": "Je combineert initiatief en directheid met zichtbare sociale energie en overtuigingskracht.",
    "strengths": [
      "Brengt mensen snel rond een richting in beweging.",
      "Communiceert ambitie en energie zichtbaar.",
      "Durft initiatief te nemen in sociale situaties."
    ],
    "watchouts": [
      "Kan tempo en enthousiasme boven haalbaarheid plaatsen.",
      "Kan veel ruimte innemen.",
      "Kan luisteren uitstellen tot na het besluit."
    ],
    "communication": "Direct, energiek en overtuigend; het meeste effect ontstaat met concrete afspraken en bewuste luistermomenten."
  },
  "ID": {
    "code": "ID",
    "title": "Sociale invloed met daadkracht",
    "primary": "I",
    "secondary": "D",
    "summary": "Je legt gemakkelijk contact en gebruikt enthousiasme om invloed en voortgang te creëren.",
    "strengths": [
      "Maakt mensen enthousiast voor actie.",
      "Bouwt snel contact en zichtbaarheid.",
      "Durft ideeën krachtig te presenteren."
    ],
    "watchouts": [
      "Kan kritiek persoonlijk nemen en toch hard reageren.",
      "Kan te veel tegelijk toezeggen.",
      "Kan sociale overtuiging boven inhoudelijke toetsing plaatsen."
    ],
    "communication": "Warm en overtuigend, met een duidelijk actiedoel; controleer regelmatig of iedereen dezelfde verwachtingen heeft."
  },
  "IS": {
    "code": "IS",
    "title": "Invloed met stabiliteit",
    "primary": "I",
    "secondary": "S",
    "summary": "Je combineert sociale toegankelijkheid met aandacht, geduld en relationele veiligheid.",
    "strengths": [
      "Laat mensen zich welkom voelen.",
      "Verbindt enthousiasme met ondersteuning.",
      "Bouwt gemakkelijk duurzame relaties."
    ],
    "watchouts": [
      "Kan moeilijke boodschappen te lang verzachten.",
      "Kan veel emotionele verantwoordelijkheid opnemen.",
      "Kan besluitvorming uitstellen om harmonie te bewaren."
    ],
    "communication": "Warm, bevestigend en uitnodigend; voeg tijdig grenzen, besluiten en verantwoordelijkheden toe."
  },
  "SI": {
    "code": "SI",
    "title": "Stabiliteit met sociale invloed",
    "primary": "S",
    "secondary": "I",
    "summary": "Je creëert vertrouwen vanuit een rustige basis en maakt daarna actief verbinding met anderen.",
    "strengths": [
      "Bouwt contact zonder sterk te domineren.",
      "Luistert en betrekt verschillende mensen.",
      "Ondersteunt een positieve, veilige groepssfeer."
    ],
    "watchouts": [
      "Kan eigen voorkeuren onvoldoende uitspreken.",
      "Kan te lang wachten op overeenstemming.",
      "Kan spanning intern dragen om de sfeer goed te houden."
    ],
    "communication": "Rustig, vriendelijk en inclusief; benoem je eigen positie voordat je volledig op de groep afstemt."
  },
  "SC": {
    "code": "SC",
    "title": "Stabiliteit met zakelijke terughoudendheid",
    "primary": "S",
    "secondary": "C",
    "summary": "Je combineert bescheiden samenwerking met behoefte aan rust, privacy en duidelijke grenzen.",
    "strengths": [
      "Luistert zorgvuldig en reageert beheerst.",
      "Biedt een rustige en betrouwbare aanwezigheid.",
      "Geeft anderen ruimte zonder veel aandacht op te eisen."
    ],
    "watchouts": [
      "Kan moeilijk leesbaar worden.",
      "Kan verandering of conflict lang vermijden.",
      "Kan hulpvragen en grenzen te weinig expliciteren."
    ],
    "communication": "Rustig en bedachtzaam; duidelijke verwachtingen en voorbereiding helpen je om tijdig zichtbaar bij te dragen."
  },
  "CS": {
    "code": "CS",
    "title": "Zakelijke terughoudendheid met stabiliteit",
    "primary": "C",
    "secondary": "S",
    "summary": "Je werkt vanuit zelfstandigheid en observatie, maar houdt tegelijk sterk rekening met rust en samenwerking.",
    "strengths": [
      "Reageert zorgvuldig en weinig impulsief.",
      "Respecteert ruimte, privacy en continuïteit.",
      "Kan zelfstandig bijdragen zonder de groep te verstoren."
    ],
    "watchouts": [
      "Kan te weinig communiceren over voortgang.",
      "Kan spanning vermijden door zich terug te trekken.",
      "Kan relationele behoeften pas laat benoemen."
    ],
    "communication": "Compact en respectvol; deel eerder wat je ziet, nodig hebt en van plan bent."
  },
  "CD": {
    "code": "CD",
    "title": "Zakelijke terughoudendheid met daadkracht",
    "primary": "C",
    "secondary": "D",
    "summary": "Je combineert zelfstandige afstand met een directe, kritische en grensstellende kant.",
    "strengths": [
      "Blijft onafhankelijk bij druk of groepsdenken.",
      "Kan moeilijke conclusies duidelijk benoemen.",
      "Bewaakt grenzen en verantwoordelijkheid."
    ],
    "watchouts": [
      "Kan koel en hard overkomen.",
      "Kan relationele signalen onderschatten.",
      "Kan kritiek geven zonder voldoende context of erkenning."
    ],
    "communication": "Zakelijk en scherp; vergroot je effect door bedoeling, menselijke impact en vervolgstappen expliciet te maken."
  },
  "DC": {
    "code": "DC",
    "title": "Daadkracht met zakelijke terughoudendheid",
    "primary": "D",
    "secondary": "C",
    "summary": "Je neemt richting en bewaart tegelijk afstand, autonomie en kritische onafhankelijkheid.",
    "strengths": [
      "Durft zelfstandig besluiten te nemen.",
      "Bewaakt grenzen en voortgang.",
      "Blijft relatief ongevoelig voor sociale druk."
    ],
    "watchouts": [
      "Kan weinig toegankelijk of zeer controlerend overkomen.",
      "Kan steun en inspraak onderschatten.",
      "Kan sneller besluiten dan vertrouwen wordt opgebouwd."
    ],
    "communication": "Direct en beheerst; leg de reden, afweging en ruimte voor relevante tegenspraak duidelijk uit."
  }
};

window.DISC_INTERPRETATION_MODEL = {
  "octantOrder": [
    "PA",
    "NO",
    "LM",
    "JK",
    "HI",
    "FG",
    "DE",
    "BC"
  ],
  "axisCoordinates": {
    "PA": {
      "communion": 0.0,
      "agency": 1.0
    },
    "NO": {
      "communion": 0.7071,
      "agency": 0.7071
    },
    "LM": {
      "communion": 1.0,
      "agency": 0.0
    },
    "JK": {
      "communion": 0.7071,
      "agency": -0.7071
    },
    "HI": {
      "communion": 0.0,
      "agency": -1.0
    },
    "FG": {
      "communion": -0.7071,
      "agency": -0.7071
    },
    "DE": {
      "communion": -1.0,
      "agency": 0.0
    },
    "BC": {
      "communion": -0.7071,
      "agency": 0.7071
    }
  },
  "styleAggregation": {
    "D": {
      "octants": [
        "PA",
        "BC"
      ],
      "label": "Daadkracht"
    },
    "I": {
      "octants": [
        "NO",
        "LM"
      ],
      "label": "Invloed"
    },
    "S": {
      "octants": [
        "HI",
        "JK"
      ],
      "label": "Stabiliteit"
    },
    "C": {
      "octants": [
        "DE",
        "FG"
      ],
      "label": "Zakelijke terughoudendheid"
    }
  },
  "adjacentBlendCodes": [
    "DI",
    "ID",
    "IS",
    "SI",
    "SC",
    "CS",
    "CD",
    "DC"
  ],
  "nonAdjacentBlendFallback": "Wanneer de twee hoogste stijlen niet aangrenzend zijn, toon dan de primaire stijl met de secundaire stijl als aanvullende invloed, zonder een apart blendlabel te forceren."
};
