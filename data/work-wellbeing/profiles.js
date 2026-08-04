"use strict";

window.WORK_WELLBEING_DIMENSIONS = [
  {
    id: "pressure",
    label: "Actuele druk",
    cluster: "demands",
    clusterLabel: "Belasting",
    direction: "negative",
    core: "Deze dimensie beschrijft hoeveel hoeveelheid, tempo en tijdsdruk je de afgelopen vier weken hebt ervaren.",
    favorable: "Je belasting lijkt momenteel relatief beheersbaar. Je hebt waarschijnlijk voldoende ruimte om taken zorgvuldig uit te voeren en onverwachte zaken op te vangen.",
    middle: "Je ervaart op meerdere momenten tijdsdruk of een hoge hoeveelheid verplichtingen. De situatie lijkt niet voortdurend overweldigend, maar vraagt wel actief prioriteitenbeheer.",
    unfavorable: "Je ervaart structureel veel hoeveelheid, tempo of tijdsdruk. Wanneer dit lang aanhoudt, kan herstel moeilijker worden en kunnen fouten, irritatie of mentale vermoeidheid toenemen.",
    highStrength: "Ruimte voor kwaliteit, prioriteiten en onverwachte zaken.",
    risk: "Zeer lage druk kan soms samengaan met onvoldoende uitdaging of activering. Bekijk daarom ook je bevlogenheid en tevredenheid.",
    advice: [
      "Maak voor de komende week onderscheid tussen moeten, belangrijk en kan wachten.",
      "Bespreek concrete capaciteit en deadlines in plaats van alleen te zeggen dat het druk is.",
      "Plan korte buffers tussen intensieve taken.",
      "Schrap of verplaats minstens één niet-kritieke verplichting wanneer je structureel achterop raakt."
    ]
  },
  {
    id: "autonomy",
    label: "Autonomie en regelruimte",
    cluster: "resources",
    clusterLabel: "Hulpbronnen",
    direction: "positive",
    core: "Autonomie gaat over hoeveel invloed je ervaart op planning, prioriteiten en de manier waarop je activiteiten uitvoert.",
    favorable: "Je beschikt over veel regelruimte en kunt je aanpak aanpassen aan wat de situatie vraagt. Dat ondersteunt vaak motivatie, verantwoordelijkheid en het omgaan met druk.",
    middle: "Je ervaart op sommige onderdelen ruimte om zelf te kiezen, maar op andere momenten bepalen vaste kaders of anderen sterk wat mogelijk is.",
    unfavorable: "Je ervaart weinig ruimte om je aanpak aan te passen. Daardoor kunnen zelfs haalbare eisen zwaarder aanvoelen, omdat je nauwelijks kunt bijsturen wanneer omstandigheden veranderen.",
    highStrength: "Flexibiliteit, eigenaarschap en kunnen bijsturen onder druk.",
    risk: "Veel vrijheid kan ook leiden tot onduidelijke grenzen, keuzestress of het gevoel alles zelf te moeten organiseren.",
    advice: [
      "Bepaal op welk klein onderdeel je wél zelf invloed kunt uitoefenen.",
      "Maak expliciete afspraken over prioriteiten en beslissingsruimte.",
      "Vraag niet alleen om meer vrijheid, maar formuleer welke concrete keuze je zelf wilt beheren.",
      "Gebruik autonomie om herstel en concentratie te beschermen, niet alleen om meer op te nemen."
    ]
  },
  {
    id: "support",
    label: "Sociale en functionele steun",
    cluster: "resources",
    clusterLabel: "Hulpbronnen",
    direction: "positive",
    core: "Deze dimensie beschrijft of je praktische hulp, begrip en bereikbare ondersteuning ervaart.",
    favorable: "Je ervaart dat relevante mensen beschikbaar zijn wanneer je hulp, informatie of begrip nodig hebt. Dat kan druk verminderen en het vertrouwen vergroten dat problemen oplosbaar zijn.",
    middle: "Steun is aanwezig, maar lijkt niet in iedere situatie vanzelfsprekend, tijdig of voldoende bruikbaar.",
    unfavorable: "Je hebt mogelijk het gevoel veel zelf te moeten oplossen. Hierdoor kunnen problemen langer duren en kan belasting zwaarder worden dan nodig.",
    highStrength: "Bereikbare hulp, begrip en gezamenlijk problemen oplossen.",
    risk: "Veel steun is pas functioneel wanneer hulp ook bruikbaar, tijdig en respectvol is. Ongevraagd overnemen kan autonomie verminderen.",
    advice: [
      "Benoem één concrete vorm van hulp die je nodig hebt.",
      "Vraag tijdig ondersteuning, voordat een probleem urgent wordt.",
      "Maak zichtbaar welke steun je al krijgt en welke nog ontbreekt.",
      "Plan een kort vast contactmoment met iemand die je situatie begrijpt."
    ]
  },
  {
    id: "clarity",
    label: "Duidelijkheid",
    cluster: "resources",
    clusterLabel: "Hulpbronnen",
    direction: "positive",
    core: "Duidelijkheid gaat over weten wat van je wordt verwacht, wat prioriteit heeft en hoe verantwoordelijkheden zijn verdeeld.",
    favorable: "Je weet doorgaans wat belangrijk is en welke resultaten worden verwacht. Dat helpt om keuzes te maken en beperkt vermijdbare onzekerheid.",
    middle: "De hoofdlijnen zijn meestal duidelijk, maar prioriteiten, verwachtingen of verantwoordelijkheden wisselen soms of botsen met elkaar.",
    unfavorable: "Tegenstrijdige verwachtingen of onduidelijke prioriteiten vragen extra mentale energie. Je kunt hard werken en toch onzeker blijven of je met het juiste bezig bent.",
    highStrength: "Gericht keuzes maken en weten waarop succes wordt beoordeeld.",
    risk: "Zeer strakke duidelijkheid kan veranderen in rigiditeit wanneer er geen ruimte meer is om nieuwe informatie mee te nemen.",
    advice: [
      "Vat verwachtingen in eigen woorden samen en laat ze bevestigen.",
      "Vraag expliciet welke taak voorrang krijgt wanneer niet alles haalbaar is.",
      "Noteer verantwoordelijkheden en beslismomenten.",
      "Maak onduidelijkheid concreet: gaat het om doel, timing, kwaliteit of bevoegdheid?"
    ]
  },
  {
    id: "fairness",
    label: "Ervaren rechtvaardigheid",
    cluster: "resources",
    clusterLabel: "Hulpbronnen",
    direction: "positive",
    core: "Deze dimensie beschrijft hoe eerlijk je verdeling, besluitvorming en behandeling ervaart.",
    favorable: "Je voelt je doorgaans eerlijk en respectvol behandeld en begrijpt hoe belangrijke beslissingen tot stand komen.",
    middle: "Je ervaring is gemengd: sommige beslissingen of contacten voelen eerlijk, terwijl andere vragen of twijfel oproepen.",
    unfavorable: "Je ervaart mogelijk dat beslissingen, middelen of behandeling niet voldoende eerlijk of transparant zijn. Dat kan vertrouwen, motivatie en betrokkenheid aantasten.",
    highStrength: "Vertrouwen in criteria, besluitvorming en respectvolle behandeling.",
    risk: "Een eerlijke procedure garandeert niet dat iedere uitkomst gunstig is. Rechtvaardigheid gaat vooral over consistente en begrijpelijke criteria.",
    advice: [
      "Scheid de uitkomst van de manier waarop de beslissing werd genomen.",
      "Vraag welke criteria zijn gebruikt.",
      "Beschrijf concrete feiten en effecten, niet alleen het gevoel van oneerlijkheid.",
      "Zoek een geschikte onafhankelijke persoon wanneer rechtstreeks overleg niet veilig of effectief voelt."
    ]
  },
  {
    id: "safety",
    label: "Ervaren psychologische veiligheid",
    cluster: "resources",
    clusterLabel: "Hulpbronnen",
    direction: "positive",
    core: "Deze dimensie beschrijft hoe veilig je je voelt om vragen, fouten, zorgen en afwijkende ideeën bespreekbaar te maken.",
    favorable: "Je voelt voldoende ruimte om je uit te spreken, hulp te vragen en onzekerheid te tonen zonder direct gezichtsverlies of bestraffing te verwachten.",
    middle: "Je kunt bepaalde zaken bespreken, maar weegt waarschijnlijk af bij wie, wanneer en over welke onderwerpen openheid veilig voelt.",
    unfavorable: "Je houdt mogelijk informatie voor jezelf uit vrees voor negatieve gevolgen. Daardoor kunnen problemen, fouten of zorgen langer verborgen blijven.",
    highStrength: "Openheid, leren van fouten en tijdig hulp durven vragen.",
    risk: "Psychologische veiligheid betekent niet dat alles zonder consequenties kan of dat prestaties niet besproken mogen worden. Openheid en verantwoordelijkheid horen samen.",
    advice: [
      "Begin met een relatief klein en concreet onderwerp.",
      "Zoek een veilige persoon buiten de directe spanningsbron.",
      "Beschrijf wat je hebt waargenomen, wat het effect is en wat je nodig hebt.",
      "Leg ernstige of terugkerende situaties feitelijk vast."
    ]
  },
  {
    id: "engagement",
    label: "Bevlogenheid",
    cluster: "positive-experience",
    clusterLabel: "Positieve beleving",
    direction: "positive",
    core: "Bevlogenheid beschrijft hoeveel energie, toewijding en inhoudelijke betrokkenheid je ervaart.",
    favorable: "Je voelt je energiek en betrokken en kunt opgaan in betekenisvolle activiteiten. Dat ondersteunt vaak leren, volhouden en kwaliteit.",
    middle: "Je ervaart op sommige momenten energie en betekenis, maar die positieve betrokkenheid is niet voortdurend aanwezig.",
    unfavorable: "Je huidige activiteiten geven je weinig energie of betekenis. Je kunt functioneren zonder je werkelijk betrokken of geactiveerd te voelen.",
    highStrength: "Energie, toewijding en kunnen opgaan in betekenisvolle activiteiten.",
    risk: "Hoge bevlogenheid beschermt niet automatisch tegen overbelasting. Sterk betrokken mensen kunnen herstel of grenzen negeren.",
    advice: [
      "Identificeer welke taken je de meeste en minste energie geven.",
      "Bescherm tijd voor betekenisvolle kernactiviteiten.",
      "Controleer of sterke inzet wordt gevolgd door voldoende herstel.",
      "Gebruik enthousiasme niet als reden om structureel meer op te nemen dan haalbaar is."
    ]
  },
  {
    id: "satisfaction",
    label: "Tevredenheid",
    cluster: "positive-experience",
    clusterLabel: "Positieve beleving",
    direction: "positive",
    core: "Tevredenheid is je algemene evaluatie van je huidige situatie.",
    favorable: "Je huidige situatie sluit op meerdere punten aan bij wat je nodig hebt of verwacht. Dat vormt een stabiele basis, maar sluit ontwikkelwensen niet uit.",
    middle: "Je oordeel over je huidige situatie is gemengd. Positieve en negatieve kanten houden elkaar ongeveer in evenwicht.",
    unfavorable: "De negatieve kanten wegen momenteel zwaar of je wenst fundamentele verandering. Onderzoek of dit vooral uit de inhoud, omgeving, relaties of totale belasting voortkomt.",
    highStrength: "Een positieve en stabiele algemene beoordeling van de huidige situatie.",
    risk: "Tevredenheid kan soms voortkomen uit gewenning of lage verwachtingen. Bekijk daarom ook bevlogenheid, autonomie en ontwikkeling.",
    advice: [
      "Benoem drie concrete oorzaken van je tevredenheid of ontevredenheid.",
      "Maak onderscheid tussen tijdelijke frustratie en structurele mismatch.",
      "Kies één beïnvloedbaar onderdeel om te verbeteren.",
      "Behoud expliciet wat goed werkt wanneer je veranderingen doorvoert."
    ]
  },
  {
    id: "recovery",
    label: "Herstelvermogen",
    cluster: "recovery-balance",
    clusterLabel: "Herstel en balans",
    direction: "positive",
    core: "Herstel gaat over mentaal loskomen, opnieuw energie opbouwen en voldoende uitgerust aan een nieuwe dag beginnen.",
    favorable: "Je kunt doorgaans afstand nemen en opnieuw energie opbouwen. Dat helpt om inspanning duurzaam vol te houden.",
    middle: "Herstel lukt gedeeltelijk, maar niet na iedere intensieve dag of periode. Belasting kan zich soms naar de volgende dag meenemen.",
    unfavorable: "Je belasting lijkt onvoldoende af te nemen buiten je verplichtingen. Daardoor kan vermoeidheid zich van dag tot dag opstapelen.",
    highStrength: "Loskomen, opnieuw opladen en duurzaam inspanning kunnen volhouden.",
    risk: "Herstel is meer dan niets doen. Activiteiten met voortdurende nieuwe prikkels kunnen rust lijken maar toch weinig herstel opleveren.",
    advice: [
      "Plan een duidelijk overgangsmoment na werk, studie of andere verplichtingen.",
      "Schakel niet-noodzakelijke meldingen uit tijdens hersteluren.",
      "Kies regelmatig voor een activiteit die contrasteert met je verplichtingen.",
      "Bescherm slaap en rustmomenten tegen inhaalwerk."
    ]
  },
  {
    id: "balance",
    label: "Balans tussen verplichtingen en privéleven",
    cluster: "recovery-balance",
    clusterLabel: "Herstel en balans",
    direction: "positive",
    core: "Balans beschrijft hoeveel ruimte overblijft voor privéleven, relaties, rust en persoonlijke behoeften.",
    favorable: "Je verplichtingen en privéleven lijken grotendeels naast elkaar te kunnen bestaan zonder elkaar voortdurend te verstoren.",
    middle: "De combinatie is meestal werkbaar, maar in drukkere perioden raken persoonlijke tijd, rust of relaties soms in het gedrang.",
    unfavorable: "Verplichtingen nemen momenteel veel tijd of mentale ruimte in. Daardoor kunnen andere belangrijke levensdomeinen structureel naar de achtergrond verdwijnen.",
    highStrength: "Grenzen bewaken en meerdere levensdomeinen duurzaam naast elkaar laten bestaan.",
    risk: "Balans betekent niet dat iedere dag perfect verdeeld is. Belangrijker is dat piekbelasting wordt gevolgd door herstel.",
    advice: [
      "Leg een dagelijks eindmoment vast voor niet-urgente verplichtingen.",
      "Plan privé- en hersteltijd vooraf, niet alleen wanneer tijd overblijft.",
      "Maak afspraken over bereikbaarheid.",
      "Beoordeel de totale belasting over werk, studie, zorg en administratie samen."
    ]
  }
];

window.WORK_WELLBEING_CLUSTERS = [
  { id: "demands", label: "Belasting", description: "De eisen die momenteel tijd, tempo en mentale energie vragen." },
  { id: "resources", label: "Hulpbronnen", description: "Omstandigheden die helpen om doelen te bereiken, problemen op te lossen en belasting hanteerbaar te houden." },
  { id: "positive-experience", label: "Positieve beleving", description: "De energie, betrokkenheid en algemene tevredenheid die je in je huidige situatie ervaart." },
  { id: "recovery-balance", label: "Herstel en balans", description: "De mate waarin inspanning kan afnemen en andere levensdomeinen voldoende ruimte behouden." }
];

window.WORK_WELLBEING_STATUS_CONTEXT = {
  student: {
    label: "Student",
    situation: "je studiesituatie",
    supporters: "een docent, studiecoach, trajectbegeleider, ombudsdienst of studentenvoorziening",
    specificAdvice: "Bekijk opdrachten, lessen en examenpieken samen in één realistische studieplanning."
  },
  employee: {
    label: "Werkende",
    situation: "je werksituatie",
    supporters: "je leidinggevende, HR, een vertrouwenspersoon, preventieadviseur of arbeidsarts",
    specificAdvice: "Bespreek taakvolume, prioriteiten en bereikbaarheid zo concreet mogelijk binnen je werkcontext."
  },
  "working-student": {
    label: "Werkende student",
    situation: "de combinatie van je werk- en studiesituatie",
    supporters: "je werkgever, opleiding, studiebegeleider of een andere passende ondersteuner",
    specificAdvice: "Bekijk werkrooster, lesrooster, deadlines en herstel als één totale planning in plaats van als twee losse domeinen."
  },
  "self-employed": {
    label: "Zelfstandige of freelancer",
    situation: "je professionele situatie als zelfstandige",
    supporters: "een professioneel netwerk, mentor, boekhouder, intervisiegroep of passende zorgprofessional",
    specificAdvice: "Maak grenzen in klantafspraken, bereikbaarheid, administratie en opdrachtselectie expliciet."
  },
  "not-working": {
    label: "Niet-werkende",
    situation: "je huidige dagelijkse situatie",
    supporters: "een begeleider, maatschappelijk werker, huisarts of andere passende ondersteuner",
    specificAdvice: "Werk met een haalbare dagstructuur en bescherm ook momenten zonder administratie, zorgen of eventuele sollicitatieverplichtingen."
  }
};

window.WORK_WELLBEING_COMBINATION_RULES = [
  {
    id: "pressure-low-recovery",
    priority: 100,
    condition: scores => scores.pressure >= 67 && scores.recovery <= 42,
    title: "Hoge belasting zonder voldoende herstel",
    text: "Je ervaart momenteel veel druk, terwijl je herstelmogelijkheden beperkt lijken. Daardoor kan belasting zich opstapelen, ook wanneer je nog gemotiveerd of productief bent.",
    tone: "risk"
  },
  {
    id: "pressure-low-autonomy",
    priority: 95,
    condition: scores => scores.pressure >= 67 && scores.autonomy <= 42,
    title: "Veel druk en weinig regelruimte",
    text: "Je ervaart niet alleen veel druk, maar hebt ook weinig ruimte om planning, tempo of aanpak zelf bij te sturen. Juist die combinatie kan de belasting versterken.",
    tone: "risk"
  },
  {
    id: "engagement-low-recovery",
    priority: 92,
    condition: scores => scores.engagement >= 75 && scores.recovery <= 42,
    title: "Sterke inzet, maar onvoldoende herstel",
    text: "Je bent sterk betrokken en kunt veel energie in je activiteiten steken. Tegelijk herstel je onvoldoende. Bevlogenheid kan dan verhullen dat je structureel meer geeft dan je opnieuw opbouwt.",
    tone: "risk"
  },
  {
    id: "support-safety",
    priority: 90,
    condition: scores => scores.support <= 42 && scores.safety <= 42,
    title: "Weinig steun én weinig ruimte om problemen te bespreken",
    text: "Je ervaart weinig beschikbare steun en voelt je bovendien niet altijd veilig om vragen, fouten of zorgen te bespreken. Hierdoor kunnen problemen langer onzichtbaar blijven.",
    tone: "risk"
  },
  {
    id: "pressure-balance",
    priority: 88,
    condition: scores => scores.pressure >= 67 && scores.balance <= 42,
    title: "Verplichtingen drukken sterk op je privéleven",
    text: "De huidige belasting lijkt niet beperkt te blijven tot je werk-, studie- of dagelijkse domein. Ook je vrije tijd, persoonlijke behoeften of privéleven komen onder druk te staan.",
    tone: "risk"
  },
  {
    id: "engagement-balance",
    priority: 82,
    condition: scores => scores.engagement >= 75 && scores.balance <= 42,
    title: "Je betrokkenheid neemt veel ruimte in",
    text: "Je bent sterk betrokken, maar je activiteiten blijven ook buiten de formele tijd veel aandacht opeisen. Daardoor kan een positieve inzet geleidelijk ten koste gaan van andere levensdomeinen.",
    tone: "watch"
  },
  {
    id: "pressure-resources",
    priority: 65,
    condition: scores => {
      const mean = [scores.autonomy, scores.support, scores.clarity, scores.safety, scores.recovery].reduce((a, b) => a + b, 0) / 5;
      return scores.pressure >= 67 && mean >= 67;
    },
    title: "Hoge druk, ondersteund door sterke hulpbronnen",
    text: "Je ervaart veel druk, maar beschikt ook over meerdere hulpbronnen die helpen om daarmee om te gaan. Dat maakt de situatie beter hanteerbaar, maar hoge belasting blijft inspanning vragen wanneer ze lang aanhoudt.",
    tone: "watch"
  },
  {
    id: "engaged-not-satisfied",
    priority: 62,
    condition: scores => scores.engagement >= 67 && scores.satisfaction <= 42,
    title: "Betrokken bij de inhoud, ontevreden over de situatie",
    text: "Je kunt energie of betekenis ervaren in wat je doet, terwijl je toch ontevreden bent over de bredere omstandigheden. De activiteit zelf lijkt mogelijk beter te passen dan de context waarin je ze uitvoert.",
    tone: "watch"
  },
  {
    id: "satisfied-not-engaged",
    priority: 55,
    condition: scores => scores.satisfaction >= 67 && scores.engagement <= 42,
    title: "Tevreden, maar beperkt geactiveerd",
    text: "Je huidige situatie voelt mogelijk comfortabel of aanvaardbaar, maar geeft je niet veel energie of inhoudelijke betrokkenheid. Stabiliteit en bevlogenheid hoeven niet altijd samen te vallen.",
    tone: "neutral"
  },
  {
    id: "strong-positive-cycle",
    priority: 45,
    condition: scores => {
      const mean = [scores.autonomy, scores.support, scores.clarity, scores.fairness, scores.safety].reduce((a, b) => a + b, 0) / 5;
      return mean >= 75 && scores.engagement >= 67 && scores.satisfaction >= 67;
    },
    title: "Een krachtige combinatie van hulpbronnen en positieve beleving",
    text: "Je beschikt over meerdere ondersteunende omstandigheden en ervaart tegelijk betrokkenheid en tevredenheid. Dat is een sterke basis om duurzaam te functioneren, zolang herstel en grenzen voldoende aandacht blijven krijgen.",
    tone: "positive"
  }
];
