"use strict";

window.TEAM_ROLE_DEFINITIONS = [
  {
    id: "bedrijfsman",
    name: "Bedrijfsman",
    headline: "Je brengt structuur aan en maakt van plannen uitvoerbaar werk.",
    core: "De Bedrijfsman richt zich op organisatie, duidelijkheid en uitvoering. Deze rol helpt een team om besluiten om te zetten in concrete taken, afspraken en werkmethoden. De voorkeur gaat doorgaans uit naar een ordelijke en praktische aanpak waarmee het team zichtbaar vooruitgang boekt.",
    traits: ["Praktisch", "Betrouwbaar", "Systematisch", "Volhardend", "Uitvoeringsgericht"],
    contribution: "De Bedrijfsman zorgt dat goede bedoelingen niet alleen ideeën blijven. Deze rol maakt duidelijk wat moet gebeuren, brengt volgorde aan en helpt het team efficiënt naar uitvoering over te gaan.",
    strengths: "Sterk in organiseren, haalbaarheid beoordelen, afspraken concretiseren en werkzaamheden consequent uitvoeren.",
    risks: "Kan te sterk vasthouden aan bestaande afspraken, nieuwe ideeën te snel als onpraktisch beoordelen of al beginnen te organiseren voordat doel en richting voldoende duidelijk zijn.",
    collaboration: "Werkt doorgaans prettig met mensen die heldere afspraken nakomen. Vage verantwoordelijkheden, voortdurende koerswijzigingen en lange theoretische discussies kunnen frustrerend zijn.",
    needs: "Duidelijke doelstellingen, betrouwbare afspraken, tijdige beslissingen, praktische informatie en voldoende stabiliteit om het werk goed te organiseren.",
    relationConflict: "Bij persoonlijke spanningen brengt deze rol de aandacht vaak terug naar taken en afspraken. Emotionele discussies kunnen worden ervaren als een belemmering voor de voortgang.",
    taskConflict: "De reactie is meestal praktisch: welke oplossing werkt, wie voert ze uit en wat betekent dit voor planning en middelen?",
    development: "Onderzoek nieuwe ideeën eerst op bruikbare onderdelen voordat je ze als onhaalbaar afwijst. Controleer ook of doel en richting helder zijn voordat je de uitvoering organiseert."
  },
  {
    id: "brononderzoeker",
    name: "Brononderzoeker",
    headline: "Je ontdekt kansen, legt verbindingen en brengt informatie van buiten het team naar binnen.",
    core: "De Brononderzoeker is nieuwsgierig naar mensen, mogelijkheden en ontwikkelingen. Deze rol verkent de omgeving, legt gemakkelijk contacten en ziet vaak waar aanvullende informatie, samenwerking of kansen te vinden zijn.",
    traits: ["Nieuwsgierig", "Enthousiast", "Contactgericht", "Vindingrijk", "Kansgericht"],
    contribution: "De Brononderzoeker voorkomt dat een team uitsluitend naar binnen kijkt. Door contacten, voorbeelden en ontwikkelingen buiten de groep te verkennen, ontstaan nieuwe mogelijkheden en praktische verbindingen.",
    strengths: "Sterk in netwerken, kansen herkennen, improviseren, informatie verzamelen en externe mogelijkheden toegankelijk maken voor het team.",
    risks: "Kan snel afgeleid raken, veel starten maar minder afwerken, enthousiasme verliezen wanneer iets niet meer nieuw is of interessante maar irrelevante zijpaden volgen.",
    collaboration: "Floreert bij afwisseling, uitwisseling en ruimte om te verkennen. Langdurig geïsoleerd werk of een zeer gesloten werkcontext kan de energie verminderen.",
    needs: "Ruimte om contacten te leggen, heldere prioriteiten, ondersteuning bij opvolging, afwisseling en een duidelijk moment waarop verkenning overgaat in uitvoering.",
    relationConflict: "Probeert spanning vaak via gesprek, optimisme of relativering te verminderen. Daardoor kan een moeilijke confrontatie soms te snel worden omzeild.",
    taskConflict: "Brengt nieuwe informatie, contacten of alternatieven in. Dat helpt het team vooruit zolang de discussie gericht blijft op het eigenlijke probleem.",
    development: "Koppel iedere nieuwe mogelijkheid aan een concrete vervolgstap. Maak expliciet wat relevant is voor het team en wat alleen interessant maar niet noodzakelijk is."
  },
  {
    id: "plant",
    name: "Plant",
    headline: "Je ontwikkelt oorspronkelijke ideeën en ziet oplossingen buiten de gebruikelijke aanpak.",
    core: "De Plant levert creatieve denkkracht. Deze rol onderzoekt ongebruikelijke invalshoeken, ontwikkelt alternatieven en zoekt nieuwe oplossingen voor complexe of vastgelopen vraagstukken.",
    traits: ["Origineel", "Vindingrijk", "Onafhankelijk", "Conceptueel", "Vernieuwend"],
    contribution: "De Plant helpt een team wanneer bestaande methoden onvoldoende werken. Vooral in een vroege projectfase, bij innovatie of bij complexe problemen kan deze rol nieuwe mogelijkheden openen.",
    strengths: "Sterk in conceptontwikkeling, onverwachte verbanden zien, vanzelfsprekendheden uitdagen en oorspronkelijke oplossingsrichtingen formuleren.",
    risks: "Kan ideeën onvoldoende praktisch uitwerken, zich verliezen in interessante zijvragen, afstand nemen van het team, moeilijk omgaan met kritiek of blijven vernieuwen nadat een besluit genomen is.",
    collaboration: "Werkt het beste wanneer er ruimte is om zelfstandig na te denken en ideeën nog niet onmiddellijk volledig uitvoerbaar hoeven te zijn.",
    needs: "Denkruimte, openheid voor ongewone voorstellen, respectvolle inhoudelijke kritiek, hulp bij praktische vertaling en duidelijke grenzen rond doel, timing en middelen.",
    relationConflict: "Kan zich bij persoonlijke spanning terugtrekken of uitsluitend op de inhoud richten. Een harde persoonlijke confrontatie kan ertoe leiden dat ideeën niet meer gedeeld worden.",
    taskConflict: "Reageert vaak met een nieuwe invalshoek of alternatieve oplossing. Dat is waardevol, maar kan afleiden wanneer het team al in de uitvoeringsfase zit.",
    development: "Vraag expliciet welke praktische voorwaarden een idee nodig heeft. Blijf betrokken wanneer anderen jouw voorstel toetsen of verder concretiseren."
  },
  {
    id: "monitor",
    name: "Monitor",
    headline: "Je onderzoekt argumenten zorgvuldig en helpt het team weloverwogen beslissingen te nemen.",
    core: "De Monitor brengt afstand, analyse en kritisch oordeel. Deze rol onderzoekt aannames, vergelijkt mogelijkheden en let op zwakke plekken in redeneringen of plannen.",
    traits: ["Analytisch", "Objectief", "Bedachtzaam", "Logisch", "Kritisch"],
    contribution: "De Monitor helpt overhaaste of slecht onderbouwde keuzes voorkomen. Door voor- en nadelen systematisch te beoordelen, verhoogt deze rol de kwaliteit van belangrijke beslissingen.",
    strengths: "Sterk in argumenten afwegen, risico’s en inconsistenties herkennen, beslissingen onderbouwen en afstand bewaren van tijdelijk enthousiasme.",
    risks: "Kan te kritisch reageren op prille ideeën, besluitvorming vertragen, vooral problemen benoemen, weinig enthousiasme tonen of blijven analyseren wanneer handelen nodig is.",
    collaboration: "Werkt graag in een omgeving waarin argumenten, feiten en logica serieus worden genomen. Druk om snel partij te kiezen kan weerstand oproepen.",
    needs: "Voldoende informatie, tijd voor analyse, ruimte om kritische vragen te stellen, een duidelijk beslismoment en onderscheid tussen inhoudelijke kritiek en persoonlijke afwijzing.",
    relationConflict: "Benadert spanningen vaak rationeel en kan de emotionele kant onderschatten. Voor anderen kan dit koel of weinig betrokken overkomen.",
    taskConflict: "Argumenten en bewijs worden zorgvuldig tegen elkaar afgewogen. De Monitor wil begrijpen welke redenering het sterkst is voordat een conclusie wordt getrokken.",
    development: "Combineer kritiek waar mogelijk met een alternatief of verbetervoorstel. Benoem ook welke delen van een idee wel sterk of bruikbaar zijn."
  },
  {
    id: "vormer",
    name: "Vormer",
    headline: "Je brengt energie, uitdaging en tempo wanneer een team vooruit moet.",
    core: "De Vormer richt zich sterk op resultaat en voortgang. Deze rol stelt moeilijke kwesties aan de orde, daagt mensen uit en helpt een team om obstakels of besluiteloosheid te doorbreken.",
    traits: ["Daadkrachtig", "Resultaatgericht", "Direct", "Volhardend", "Energiek"],
    contribution: "De Vormer is vooral waardevol wanneer het team vastloopt, moeilijke keuzes moet maken of onder tijdsdruk moet presteren. Deze rol maakt urgentie zichtbaar en blijft het einddoel benadrukken.",
    strengths: "Sterk in beweging creëren, moeilijke onderwerpen benoemen, druk weerstaan, knopen helpen doorhakken en de focus op resultaat bewaren.",
    risks: "Kan anderen overstemmen, ongeduldig worden, spanning onnodig vergroten, weinig ruimte laten voor nuance of kritiek te persoonlijk formuleren.",
    collaboration: "Werkt graag met mensen die verantwoordelijkheid nemen en openlijk durven discussiëren. Traagheid, vaagheid en het vermijden van lastige kwesties kunnen frustratie oproepen.",
    needs: "Heldere doelen, beslissingsruimte, directe communicatie, zichtbare voortgang en tegenspraak die inhoudelijk en standvastig wordt gebracht.",
    relationConflict: "Benoemt problemen vaak rechtstreeks en wil snel duidelijkheid. Daardoor kan de intensiteit van een persoonlijk conflict toenemen.",
    taskConflict: "Verdedigt standpunten krachtig en daagt zwakke argumenten stevig uit. Dit kan nuttig zijn zolang anderen voldoende ruimte houden om te reageren.",
    development: "Controleer niet alleen of je boodschap duidelijk is, maar ook hoe ze bij anderen aankomt. Gebruik confrontatie om het probleem scherper te maken, niet om de persoon onder druk te zetten."
  },
  {
    id: "voorzitter",
    name: "Voorzitter",
    headline: "Je brengt mensen, bijdragen en besluiten samen rond een gedeelde richting.",
    core: "De Voorzitter bewaakt het gezamenlijke doel en helpt mensen hun kwaliteiten gericht in te zetten. Deze rol zorgt dat verschillende stemmen worden gehoord, vat standpunten samen en begeleidt het team naar een duidelijk besluit.",
    traits: ["Coördinerend", "Ruimdenkend", "Besluitvaardig", "Delegerend", "Overzichtelijk"],
    contribution: "De Voorzitter zorgt voor samenhang wanneer verschillende mensen, belangen of deskundigheden moeten worden gecombineerd. Deze rol voorkomt dat het gesprek versnipperd raakt of door enkele personen wordt gedomineerd.",
    strengths: "Sterk in bijdragen samenbrengen, deelname stimuleren, talenten herkennen, verantwoordelijkheden verdelen en een besluitvormingsproces bewaken.",
    risks: "Kan te sterk op een besluit sturen, procedure belangrijker maken dan nieuwe informatie, rollen te snel vastleggen, te veel delegeren of consensus veronderstellen terwijl bezwaren blijven bestaan.",
    collaboration: "Functioneert goed wanneer mensen bereid zijn hun bijdrage te delen en gezamenlijke afspraken te respecteren.",
    needs: "Open communicatie, bereidheid om verantwoordelijkheid op te nemen, duidelijkheid over belangen, ruimte om bijdragen te coördineren en eerlijke signalen wanneer iemand het niet eens is.",
    relationConflict: "Probeert partijen te laten spreken en de-escalatie mogelijk te maken, zonder het gezamenlijke resultaat uit het oog te verliezen.",
    taskConflict: "Vat verschillende standpunten samen en zoekt vervolgens naar een werkbare keuze of voldoende draagvlak voor een besluit.",
    development: "Controleer of overeenstemming werkelijk bestaat en niet alleen stilzwijgend wordt aangenomen. Blijf bereid rollen en besluiten te herzien wanneer nieuwe informatie dat rechtvaardigt."
  },
  {
    id: "zorgdrager",
    name: "Zorgdrager",
    headline: "Je bewaakt kwaliteit, merkt risico’s op en helpt het team zorgvuldig af te ronden.",
    core: "De Zorgdrager richt zich op nauwkeurigheid, betrouwbaarheid en afwerking. Deze rol ziet wat nog ontbreekt, waar fouten kunnen ontstaan en welke details gecontroleerd moeten worden voordat iets definitief wordt opgeleverd.",
    traits: ["Nauwkeurig", "Kwaliteitsbewust", "Waakzaam", "Gewetensvol", "Controlerend"],
    contribution: "De Zorgdrager voorkomt dat werk te snel als voltooid wordt beschouwd. Vooral bij taken met hoge kwaliteits-, veiligheids- of nauwkeurigheidseisen is deze bijdrage belangrijk.",
    strengths: "Sterk in fouten ontdekken, kwaliteitsnormen bewaken, risico’s voorzien, deadlines serieus nemen en werk zorgvuldig afronden.",
    risks: "Kan overmatig focussen op details, moeilijk delegeren, anderen onzeker maken door voortdurende controles, perfectionistisch worden of te weinig onderscheid maken tussen hoofd- en bijzaken.",
    collaboration: "Werkt graag met mensen die afspraken serieus nemen en voldoende tijd reserveren voor controle en afwerking.",
    needs: "Duidelijke kwaliteitsnormen, realistische deadlines, betrouwbare taakuitvoering, tijd voor eindcontrole en transparantie over fouten en risico’s.",
    relationConflict: "Kan persoonlijke spanningen vermijden en zich sterker op het werk terugtrekken. Bezorgdheid kan daardoor indirect via extra controle zichtbaar worden.",
    taskConflict: "Richt zich vooral op fouten, risico’s, ontbrekende informatie en kwaliteitsvoorwaarden. Dat beschermt het resultaat, maar kan als perfectionistisch worden ervaren.",
    development: "Maak onderscheid tussen kritieke fouten en verbeteringen die wenselijk maar niet noodzakelijk zijn. Spreek vooraf af welk kwaliteitsniveau werkelijk vereist is."
  },
  {
    id: "groepswerker",
    name: "Groepswerker",
    headline: "Je versterkt onderling vertrouwen en helpt mensen constructief met elkaar samenwerken.",
    core: "De Groepswerker heeft aandacht voor relaties, sfeer en onderlinge betrokkenheid. Deze rol luistert, ondersteunt en helpt spanningen verminderen zodat mensen effectief kunnen blijven samenwerken.",
    traits: ["Empathisch", "Tactvol", "Behulpzaam", "Diplomatisch", "Verbindend"],
    contribution: "De Groepswerker houdt samenwerking mogelijk wanneer verschillen, onzekerheid of spanning ontstaan. Deze rol merkt vaak vroeg op wat er tussen mensen speelt.",
    strengths: "Sterk in luisteren, vertrouwen bevorderen, teamleden betrekken, relationele signalen herkennen en spanningen op een constructieve manier verminderen.",
    risks: "Kan confrontaties vermijden, te veel toegeven, moeilijke beslissingen uitstellen, sfeer boven inhoud plaatsen of onvoldoende duidelijk grenzen stellen.",
    collaboration: "Functioneert goed in een respectvolle omgeving waarin mensen aandacht hebben voor de effecten van hun gedrag op anderen.",
    needs: "Psychologische veiligheid, respectvolle communicatie, ruimte om zorgen bespreekbaar te maken, erkenning van relationele signalen en steun bij moeilijke beslissingen.",
    relationConflict: "Probeert spanning te verzachten en wederzijds begrip te herstellen. Wanneer de confrontatie zeer scherp wordt, kan terugtrekking optreden.",
    taskConflict: "Zoekt naar een compromis of oplossing waarmee mensen gezamenlijk verder kunnen. Daardoor kunnen principiële verschillen soms te snel worden afgezwakt.",
    development: "Gebruik je gevoeligheid niet alleen om spanning te verminderen, maar ook om het werkelijke probleem zorgvuldig te benoemen. Harmonie is sterker wanneer verschillen besproken zijn."
  },
  {
    id: "specialist",
    name: "Specialist",
    headline: "Je brengt diepgaande deskundigheid en bewaakt de professionele inhoud binnen jouw vakgebied.",
    core: "De Specialist levert geconcentreerde kennis, ervaring of technische vaardigheid op een specifiek terrein. Deze rol verdiept zich sterk in de inhoud en helpt het team wanneer algemene ideeën moeten worden vertaald naar professionele of vaktechnische kwaliteit.",
    traits: ["Deskundig", "Toegewijd", "Geconcentreerd", "Leergierig", "Professioneel"],
    contribution: "De Specialist brengt kennis die andere teamleden niet noodzakelijk bezitten. Deze bijdrage kan doorslaggevend zijn bij complexe inhoudelijke beslissingen, kwaliteitsbewaking of technische uitvoering.",
    strengths: "Sterk in diepgaande kennis opbouwen, inhoudelijke normen bewaken, complexe vakvragen onderzoeken en een deskundig perspectief toevoegen.",
    risks: "Kan zich te sterk beperken tot het eigen vakgebied, weinig belangstelling tonen voor bredere teamvraagstukken, vakkennis moeilijk toegankelijk uitleggen, defensief reageren of geïsoleerd werken.",
    collaboration: "Functioneert goed wanneer inhoudelijke deskundigheid wordt gerespecteerd en er voldoende ruimte bestaat voor verdieping.",
    needs: "Erkenning van expertise, duidelijke inhoudelijke vragen, tijd om zaken grondig uit te zoeken, toegang tot relevante informatie en hulp om expertise aan het bredere teamdoel te koppelen.",
    relationConflict: "Kan persoonlijke spanning vermijden door zich terug te trekken in inhoudelijk werk. Een professioneel en respectvol gesprek werkt beter dan een sterk emotionele benadering.",
    taskConflict: "Verdedigt doorgaans de normen en inzichten van het eigen vakgebied. Dat is waardevol, maar vraagt ook bereidheid om deskundigheid met andere perspectieven te verbinden.",
    development: "Maak je kennis toegankelijk voor mensen zonder dezelfde achtergrond. Vraag actief hoe jouw expertise aansluit op het gezamenlijke probleem en op de bijdragen van andere disciplines."
  }
];

window.TEAM_ROLE_BY_ID = Object.fromEntries(
  window.TEAM_ROLE_DEFINITIONS.map(role => [role.id, role])
);

window.TEAM_ROLE_PAIR_INSIGHTS = {
  "monitor|plant": {
    synergy: "Je combineert het ontwikkelen van nieuwe ideeën met het kritisch toetsen van hun kwaliteit en haalbaarheid.",
    tension: "Je kunt intern wisselen tussen vrij verkennen en streng beoordelen. Wanneer beoordeling te vroeg komt, kan vernieuwing worden afgeremd."
  },
  "brononderzoeker|plant": {
    synergy: "Je verbindt oorspronkelijke ideeën met externe informatie, contacten en kansen.",
    tension: "Veel nieuwe mogelijkheden kunnen de focus en consequente opvolging onder druk zetten."
  },
  "monitor|zorgdrager": {
    synergy: "Je koppelt inhoudelijke analyse aan nauwkeurige kwaliteitscontrole.",
    tension: "De combinatie kan leiden tot lang blijven toetsen en moeite om iets goed genoeg te verklaren."
  },
  "bedrijfsman|vormer": {
    synergy: "Je maakt tempo en vertaalt richting snel naar concrete uitvoering.",
    tension: "Snelheid en daadkracht kunnen ten koste gaan van draagvlak, reflectie of ruimte voor alternatieven."
  },
  "vormer|zorgdrager": {
    synergy: "Je combineert prestatiedrang met aandacht voor kwaliteit en risico’s.",
    tension: "De Vormer wil doorpakken terwijl de Zorgdrager nog wil controleren; dit kan spanning geven rond timing."
  },
  "groepswerker|voorzitter": {
    synergy: "Je bewaakt zowel de gezamenlijke richting als de onderlinge verhoudingen.",
    tension: "De behoefte aan draagvlak kan het nemen van een moeilijk of impopulair besluit vertragen."
  },
  "vormer|voorzitter": {
    synergy: "Je combineert coördinatie en betrokkenheid met duidelijke daadkracht.",
    tension: "Direct resultaatgericht optreden kan botsen met de ruimte die nodig is om iedereen werkelijk te horen."
  },
  "bedrijfsman|zorgdrager": {
    synergy: "Je zorgt voor ordelijke uitvoering én zorgvuldige afwerking.",
    tension: "Structuur en controle kunnen doorschieten naar rigiditeit of perfectionisme."
  },
  "monitor|specialist": {
    synergy: "Je verbindt diepgaande deskundigheid met een objectieve beoordeling van argumenten en opties.",
    tension: "Sterke inhoudelijke overtuiging kan het moeilijk maken om tijdig tot een pragmatisch besluit te komen."
  },
  "plant|specialist": {
    synergy: "Je combineert vakinhoudelijke diepgang met vernieuwende oplossingsrichtingen.",
    tension: "Nieuwe ideeën kunnen zeer gespecialiseerd of moeilijk toegankelijk worden voor de rest van het team."
  },
  "brononderzoeker|voorzitter": {
    synergy: "Je brengt externe mogelijkheden binnen en koppelt ze aan gezamenlijke doelen en verantwoordelijkheden.",
    tension: "De stroom aan nieuwe kansen kan botsen met de behoefte om richting vast te leggen en besluiten af te ronden."
  },
  "groepswerker|zorgdrager": {
    synergy: "Je combineert aandacht voor mensen met aandacht voor kwaliteit en betrouwbaarheid.",
    tension: "Bezorgdheid om kwaliteit en harmonie kan lastige feedback te voorzichtig of indirect maken."
  }
};
