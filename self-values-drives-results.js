"use strict";

/*
  Unfold Yourself — resultaatteksten voor de Zelfbeeld-, waarden- en drijfverentest.
  Uitsluitend gegevens; geen uitvoeringslogica.
*/

window.SELF_VALUES_DRIVES_RESULT_CONTENT = {
  "componentDefinitions": [
    {
      "id": "self-image",
      "label": "Zelfbeeld",
      "resultLabel": "Zelfbeeld"
    },
    {
      "id": "self-confidence",
      "label": "Zelfvertrouwen",
      "resultLabel": "Zelfvertrouwen"
    },
    {
      "id": "values",
      "label": "Waarden",
      "resultLabel": "Waardenhiërarchie"
    },
    {
      "id": "motivation",
      "label": "Motivatie",
      "resultLabel": "Motivatiedrijfveren"
    },
    {
      "id": "decision-making",
      "label": "Besluitvorming",
      "resultLabel": "Besluitvormingsstijlen"
    }
  ],
  "scaleProfiles": {
    "self-image": {
      "label": "Zelfwaardering",
      "description": "Hoe stabiel en respectvol je jezelf doorgaans beoordeelt.",
      "low": "Je antwoorden wijzen op een kritische of kwetsbare beoordeling van jezelf. Fouten, vergelijking of negatieve feedback kunnen relatief zwaar doorwegen in je gevoel van eigenwaarde.",
      "middle": "Je zelfwaardering lijkt redelijk aanwezig, maar kan wisselen naargelang prestaties, feedback of sociale vergelijking. Je kunt sterke kanten erkennen, terwijl twijfel op sommige momenten meer ruimte krijgt.",
      "high": "Je antwoorden wijzen op een stevige en relatief stabiele basis van zelfrespect. Je kunt doorgaans waarde in jezelf blijven zien, ook wanneer iets mislukt of verbetering nodig is."
    },
    "self-efficacy": {
      "label": "Zelfeffectiviteit",
      "description": "Hoe sterk je erop vertrouwt dat je problemen kunt aanpakken en doelen kunt beïnvloeden.",
      "low": "Je vertrouwen in je eigen handelingsvermogen kan afnemen wanneer een taak nieuw, ingewikkeld of onzeker is. Duidelijke stappen, oefening en concrete steun kunnen dan helpen om grip op te bouwen.",
      "middle": "Je vertrouwt in veel situaties op je eigen vermogen, maar dat vertrouwen hangt waarschijnlijk samen met ervaring, voorbereiding en beschikbare ondersteuning.",
      "high": "Je verwacht doorgaans dat je met inzet, strategie en hulpbronnen een werkbare aanpak kunt vinden. Dat ondersteunt initiatief, leren en herstel na tegenslag."
    },
    "self-direction": {
      "label": "Zelfsturing",
      "description": "Onafhankelijk denken, kiezen en creëren.",
      "less": "Zelfstandige keuzevrijheid is aanwezig, maar lijkt minder centraal dan andere waarden. Je kunt gemakkelijker richting ontlenen aan afspraken, relaties of vertrouwde kaders.",
      "middle": "Zelfsturing is een betekenisvolle waarde, maar wordt afgewogen tegen andere prioriteiten zoals zekerheid, verbondenheid of gezamenlijke normen.",
      "central": "Autonomie, zelfstandig denken en ruimte voor eigen keuzes staan hoog in je waardenhiërarchie. Beperkende controle of weinig beslisruimte kan daardoor sterk demotiveren."
    },
    "stimulation": {
      "label": "Stimulatie",
      "description": "Afwisseling, uitdaging en nieuwe ervaringen.",
      "less": "Voortdurende verandering of spanning is voor jou waarschijnlijk geen doel op zich. Rust, continuïteit of voorspelbaarheid kunnen zwaarder wegen.",
      "middle": "Je waardeert uitdaging en afwisseling wanneer die betekenisvol zijn, maar hoeft niet voortdurend nieuwe prikkels op te zoeken.",
      "central": "Afwisseling, vernieuwing en uitdaging zijn centrale bronnen van energie. Langdurige routine zonder groeiruimte kan snel beperkend voelen."
    },
    "hedonism": {
      "label": "Hedonisme",
      "description": "Plezier, genieten en aangename ervaringen.",
      "less": "Plezier en comfort spelen mee, maar krijgen waarschijnlijk minder prioriteit dan plicht, groei, verbondenheid of zekerheid.",
      "middle": "Je maakt ruimte voor plezier en ontspanning, terwijl je die doorgaans afweegt tegen verantwoordelijkheden en doelen.",
      "central": "Genieten, comfort en positieve ervaringen zijn belangrijke richtpunten. Een leven dat uitsluitend uit verplichtingen bestaat zal waarschijnlijk weinig duurzaam motiveren."
    },
    "achievement": {
      "label": "Prestatie",
      "description": "Succes tonen door bekwaamheid en resultaat.",
      "less": "Zichtbaar succes of jezelf bewijzen lijkt minder bepalend dan andere waarden. Je kunt resultaten belangrijk vinden zonder er je identiteit sterk aan te koppelen.",
      "middle": "Presteren en competentie tonen zijn betekenisvol, maar worden begrensd door andere waarden zoals welzijn, relaties of autonomie.",
      "central": "Doelen bereiken, bekwaamheid tonen en erkend resultaat boeken staan hoog in je waardenhiërarchie. Onduidelijke maatstaven of weinig vooruitgang kunnen sterk frustreren."
    },
    "power": {
      "label": "Macht en invloed",
      "description": "Status, gezag en controle over middelen of beslissingen.",
      "less": "Status en formele invloed lijken minder belangrijk dan inhoud, relaties, gelijkwaardigheid of persoonlijke vrijheid.",
      "middle": "Je waardeert invloed wanneer die functioneel of verdiend is, maar macht en status zijn waarschijnlijk niet je enige maatstaven voor succes.",
      "central": "Invloed, gezag of toegang tot middelen zijn belangrijke waarden. Je wilt waarschijnlijk merkbare impact hebben en niet uitsluitend uitvoeren wat anderen bepalen."
    },
    "security": {
      "label": "Veiligheid",
      "description": "Stabiliteit, bescherming en voorspelbaarheid.",
      "less": "Je bent waarschijnlijk bereid meer onzekerheid te aanvaarden wanneer autonomie, groei of kansen daartegenover staan.",
      "middle": "Je zoekt een werkbare basis van stabiliteit, maar kunt risico accepteren wanneer het doel voldoende betekenisvol is.",
      "central": "Betrouwbaarheid, bescherming en voorspelbaarheid staan hoog in je waardenhiërarchie. Onverwachte veranderingen of onduidelijke risico’s kunnen daardoor relatief belastend zijn."
    },
    "conformity": {
      "label": "Conformiteit",
      "description": "Gedrag begrenzen om schade, verstoring of normschending te voorkomen.",
      "less": "Je laat je minder vanzelfsprekend leiden door regels of verwachtingen en beoordeelt normen waarschijnlijk kritisch op hun nut.",
      "middle": "Je respecteert regels die samenwerking en veiligheid ondersteunen, maar behoudt ruimte om onredelijke verwachtingen ter discussie te stellen.",
      "central": "Orde, passende zelfbeheersing en rekening houden met gedeelde regels zijn belangrijk. Chaotisch of normoverschrijdend gedrag kan je sterk storen."
    },
    "tradition": {
      "label": "Traditie",
      "description": "Respect voor overgeleverde gebruiken, rituelen en betekenisvolle continuïteit.",
      "less": "Overgeleverde gebruiken zijn voor jou waarschijnlijk pas waardevol wanneer ze ook vandaag betekenis of nut hebben.",
      "middle": "Je kunt tradities waarderen zonder ze automatisch boven vernieuwing of individuele keuze te plaatsen.",
      "central": "Continuïteit, rituelen en verbondenheid met overgeleverde gebruiken zijn belangrijke bronnen van betekenis en identiteit."
    },
    "benevolence": {
      "label": "Welwillendheid",
      "description": "Zorg voor het welzijn van mensen met wie je nauw verbonden bent.",
      "less": "Zorg voor naasten speelt mee, maar kan relatief sneller worden begrensd door autonomie, taakdoelen of bredere principes.",
      "middle": "Je hecht aan betrokkenheid bij naasten, terwijl je ook ruimte houdt voor eigen grenzen en andere verantwoordelijkheden.",
      "central": "Loyaliteit, zorg en praktische steun voor mensen dichtbij staan hoog in je waardenhiërarchie. Relationele breuken of onbetrouwbaarheid kunnen daardoor zwaar wegen."
    },
    "universalism": {
      "label": "Universalisme",
      "description": "Gelijkwaardigheid, begrip en zorg voor mens en natuur in brede zin.",
      "less": "Brede maatschappelijke of ecologische principes lijken minder direct richtinggevend dan concrete relaties, persoonlijke doelen of lokale belangen.",
      "middle": "Je houdt rekening met gelijkwaardigheid en langetermijneffecten, maar weegt die af tegen praktische omstandigheden en nabijere verplichtingen.",
      "central": "Rechtvaardigheid, begrip voor verschillen en zorg voor samenleving en natuur staan hoog in je waardenhiërarchie. Beslissingen met bredere gevolgen krijgen daardoor extra gewicht."
    },
    "need-achievement": {
      "label": "Prestatiegerichtheid",
      "description": "Motivatie door uitdagende doelen, feedback en zichtbare vooruitgang.",
      "low": "Duidelijke prestaties of competitie zijn waarschijnlijk geen constante motor. Betekenis, relaties, zekerheid of interesse kunnen belangrijker zijn om je inzet vast te houden.",
      "middle": "Je wordt gemotiveerd door haalbare uitdaging en vooruitgang, maar hoeft niet iedere situatie in een prestatiemeting te veranderen.",
      "high": "Uitdagende doelen, duidelijke criteria en merkbare vooruitgang geven je waarschijnlijk veel energie. Onduidelijke verwachtingen of langdurige stilstand kunnen demotiveren."
    },
    "need-affiliation": {
      "label": "Verbondenheid",
      "description": "Motivatie door vertrouwen, samenwerking en positieve relaties.",
      "low": "Je inzet is waarschijnlijk minder afhankelijk van sociale harmonie. Je kunt zelfstandig doorwerken, ook wanneer contact of waardering beperkt is.",
      "middle": "Goede relaties ondersteunen je motivatie, maar je kunt ook handelen wanneer niet iedereen het eens is of nabij betrokken blijft.",
      "high": "Vertrouwen, samenwerking en positieve relaties zijn sterke energiebronnen. Langdurig conflict, uitsluiting of afstand kan je motivatie zichtbaar verminderen."
    },
    "need-power": {
      "label": "Invloed",
      "description": "Motivatie door verantwoordelijkheid, richting geven en merkbare impact.",
      "low": "Formele invloed of leiding nemen is waarschijnlijk geen noodzakelijke motivator. Je kunt voldoening halen uit inhoudelijke bijdrage zonder centraal sturend te zijn.",
      "middle": "Je neemt invloed wanneer dat nodig of passend is, maar hoeft niet voortdurend de richting te bepalen.",
      "high": "Verantwoordelijkheid, richting geven en zichtbare impact motiveren je waarschijnlijk sterk. Een rol zonder beslisruimte of invloed kan snel beperkend voelen."
    },
    "rational": {
      "label": "Rationele stijl",
      "description": "Systematisch feiten, criteria en gevolgen afwegen.",
      "low": "Je gebruikt waarschijnlijk niet altijd een uitgebreide analytische aanpak. Snelheid, ervaring of overleg kan eerder richting geven.",
      "middle": "Je analyseert belangrijke keuzes, maar past de hoeveelheid informatie en structuur aan de situatie aan.",
      "high": "Je zoekt feiten, vergelijkt alternatieven en denkt gevolgen systematisch door. Dit ondersteunt zorgvuldigheid, maar kan bij overgebruik tot uitstel of schijnzekerheid leiden."
    },
    "intuitive": {
      "label": "Intuïtieve stijl",
      "description": "Ervaring, patronen en eerste indrukken benutten.",
      "low": "Je vertrouwt minder snel uitsluitend op gevoel of eerste indruk en zoekt waarschijnlijk liever controleerbare argumenten.",
      "middle": "Je neemt intuïtieve signalen serieus, maar toetst ze doorgaans aan feiten, overleg of praktische haalbaarheid.",
      "high": "Je herkent patronen en passende richtingen vaak snel, ook wanneer je redenering nog niet volledig verwoord is. Controleer bij grote risico’s bewust welke aannames achter dat gevoel zitten."
    },
    "dependent": {
      "label": "Afhankelijke stijl",
      "description": "Advies, bevestiging en gedeelde verantwoordelijkheid zoeken.",
      "low": "Je beslist relatief zelfstandig en hebt weinig bevestiging nodig voordat je een richting kiest.",
      "middle": "Je gebruikt advies als extra informatie, maar behoudt doorgaans zelf eigenaarschap over de uiteindelijke keuze.",
      "high": "Je zoekt graag advies en bevestiging bij belangrijke beslissingen. Dat verbreedt perspectieven, maar kan je besluitvorming vertragen wanneer anderen geen eenduidig antwoord geven."
    },
    "avoidant": {
      "label": "Vermijdende stijl",
      "description": "Keuzes uitstellen wanneer spanning, onzekerheid of gevolgen oplopen.",
      "low": "Je gaat beslissingen doorgaans aan, ook wanneer de uitkomst onzeker of ongemakkelijk is.",
      "middle": "Je kunt moeilijke keuzes tijdelijk uitstellen om spanning te reguleren of informatie te verzamelen, maar hervat ze meestal wanneer een besluit nodig wordt.",
      "high": "Spanning of onzekerheid kan ervoor zorgen dat je keuzes lang openhoudt of naar de achtergrond schuift. Een expliciete deadline en een kleiner eerstvolgend besluit kunnen helpen."
    },
    "spontaneous": {
      "label": "Spontane stijl",
      "description": "Snel kiezen en tijdens de uitvoering bijsturen.",
      "low": "Je vermijdt overhaaste keuzes en neemt waarschijnlijk liever tijd om gevolgen of alternatieven te bekijken.",
      "middle": "Je kunt snel beslissen wanneer de situatie dat vraagt, maar neemt meer tijd wanneer de gevolgen groter zijn.",
      "high": "Je kiest graag vlot en vertrouwt op bijsturen onderweg. Dat ondersteunt momentum en kansen benutten, maar vraagt extra remming bij onomkeerbare of risicovolle keuzes."
    }
  },
  "valueOrder": [
    "self-direction",
    "stimulation",
    "hedonism",
    "achievement",
    "power",
    "security",
    "conformity",
    "tradition",
    "benevolence",
    "universalism"
  ],
  "motivationOrder": [
    "need-achievement",
    "need-affiliation",
    "need-power"
  ],
  "decisionOrder": [
    "rational",
    "intuitive",
    "dependent",
    "avoidant",
    "spontaneous"
  ],
  "higherOrderValues": {
    "openheid-voor-verandering": {
      "label": "Openheid voor verandering",
      "scales": [
        "self-direction",
        "stimulation"
      ],
      "description": "Autonomie, vernieuwing en bereidheid om bekende patronen te verlaten."
    },
    "zelfoverstijging": {
      "label": "Zelfoverstijging",
      "scales": [
        "benevolence",
        "universalism"
      ],
      "description": "Zorg voor anderen, gelijkwaardigheid en belangen die verder reiken dan het directe eigen voordeel."
    },
    "behoud": {
      "label": "Behoud",
      "scales": [
        "security",
        "conformity",
        "tradition"
      ],
      "description": "Stabiliteit, orde, continuïteit en bescherming tegen verstoring."
    },
    "zelfversterking": {
      "label": "Zelfversterking",
      "scales": [
        "achievement",
        "power"
      ],
      "description": "Persoonlijk succes, invloed, status en zichtbare bekwaamheid."
    }
  },
  "valueTensions": [
    {
      "left": [
        "self-direction",
        "stimulation"
      ],
      "right": [
        "security",
        "conformity",
        "tradition"
      ],
      "label": "Verandering tegenover behoud",
      "explanation": "Je kunt spanning ervaren tussen vrijheid en vernieuwing enerzijds en voorspelbaarheid, regels of continuïteit anderzijds."
    },
    {
      "left": [
        "achievement",
        "power"
      ],
      "right": [
        "benevolence",
        "universalism"
      ],
      "label": "Eigen positionering tegenover zelfoverstijging",
      "explanation": "Je kunt spanning ervaren tussen persoonlijk succes en invloed enerzijds en zorg, gelijkwaardigheid of brede maatschappelijke belangen anderzijds."
    }
  ],
  "resultCardContent": {
    "self-image": {
      "label": "Zelfbeeld",
      "description": "De stevigheid van je algemene zelfwaardering."
    },
    "self-confidence": {
      "label": "Zelfvertrouwen",
      "description": "Je vertrouwen dat je problemen kunt aanpakken en invloed kunt uitoefenen."
    },
    "values": {
      "label": "Sterkste waarde",
      "description": "De waarde die relatief het hoogst in je persoonlijke rangorde staat."
    },
    "motivation": {
      "label": "Primaire drijfveer",
      "description": "De behoefte die je inzet waarschijnlijk het sterkst activeert."
    },
    "decision-making": {
      "label": "Voorkeursstijl",
      "description": "De besluitvormingsstijl die het vaakst in je antwoorden naar voren komt."
    }
  }
};
