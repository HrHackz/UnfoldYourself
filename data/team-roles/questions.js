"use strict";

window.TEAM_ROLE_TEST_ID = "samenwerking::Teamrol- en samenwerkingsstijltest";

window.TEAM_ROLE_ROLE_ORDER = [
  "bedrijfsman",
  "brononderzoeker",
  "plant",
  "monitor",
  "vormer",
  "voorzitter",
  "zorgdrager",
  "groepswerker",
  "specialist"
];

window.TEAM_ROLE_CHOICES = Object.freeze({
  characteristic: [
    { value: 0, marker: "1", label: "Niet kenmerkend" },
    { value: 1, marker: "2", label: "Enigszins kenmerkend" },
    { value: 2, marker: "3", label: "Heel kenmerkend" }
  ],
  quote: [
    { value: 0, marker: "1", label: "Hoor je mij zelden zeggen" },
    { value: 1, marker: "2", label: "Zou ik kunnen zeggen" },
    { value: 2, marker: "3", label: "Ja, typisch een zin van mij" }
  ]
});

window.TEAM_ROLE_QUESTIONS = [
  { id: "tr-01", section: "preference", roleId: "vormer", category: "Waar houd je van?", text: "Ik houd van een omgeving waarin mensen elkaar uitdagen om sterke resultaten neer te zetten.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-02", section: "preference", roleId: "monitor", category: "Waar houd je van?", text: "Ik houd ervan om eerst te begrijpen hoe een idee, probleem of redenering precies in elkaar zit.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-03", section: "preference", roleId: "brononderzoeker", category: "Waar houd je van?", text: "Ik houd ervan nieuwe mensen, informatiebronnen en mogelijkheden te ontdekken.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-04", section: "preference", roleId: "zorgdrager", category: "Waar houd je van?", text: "Ik houd ervan werk af te leveren dat zorgvuldig gecontroleerd en van hoge kwaliteit is.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-05", section: "preference", roleId: "voorzitter", category: "Waar houd je van?", text: "Ik houd ervan verschillende bijdragen samen te brengen rond één gezamenlijk doel.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-06", section: "preference", roleId: "plant", category: "Waar houd je van?", text: "Ik houd ervan oorspronkelijke oplossingen te bedenken die nog niet eerder zijn geprobeerd.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-07", section: "preference", roleId: "bedrijfsman", category: "Waar houd je van?", text: "Ik houd van duidelijke structuren waarmee plannen praktisch kunnen worden uitgevoerd.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-08", section: "preference", roleId: "groepswerker", category: "Waar houd je van?", text: "Ik houd van een team waarin mensen zich verbonden en bij elkaar betrokken voelen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-09", section: "preference", roleId: "specialist", category: "Waar houd je van?", text: "Ik houd ervan mij grondig te verdiepen in één inhoudelijk of professioneel vakgebied.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-10", section: "preference", roleId: "brononderzoeker", category: "Waar houd je van?", text: "Ik houd van afwisseling en van het verkennen van nieuwe situaties en kansen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-11", section: "preference", roleId: "bedrijfsman", category: "Waar houd je van?", text: "Ik houd van heldere afspraken, een logische werkwijze en een duidelijke taakverdeling.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-12", section: "preference", roleId: "plant", category: "Waar houd je van?", text: "Ik houd van vraagstukken waarvoor verbeeldingskracht en diep denkwerk nodig zijn.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-13", section: "preference", roleId: "groepswerker", category: "Waar houd je van?", text: "Ik houd van samenwerking waarin mensen rekening houden met elkaar en elkaar ondersteunen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-14", section: "preference", roleId: "monitor", category: "Waar houd je van?", text: "Ik houd ervan meerdere mogelijkheden zorgvuldig tegen elkaar af te wegen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-15", section: "preference", roleId: "vormer", category: "Waar houd je van?", text: "Ik houd van stevige doelen waarvoor doorzettingsvermogen en daadkracht nodig zijn.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-16", section: "preference", roleId: "specialist", category: "Waar houd je van?", text: "Ik houd ervan mijn deskundigheid voortdurend verder te ontwikkelen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-17", section: "preference", roleId: "voorzitter", category: "Waar houd je van?", text: "Ik houd ervan overzicht te bewaren en mensen te helpen hun bijdrage goed op elkaar af te stemmen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-18", section: "preference", roleId: "zorgdrager", category: "Waar houd je van?", text: "Ik houd van zekerheid dat afspraken, details en kwaliteitsnormen goed worden opgevolgd.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-19", section: "preference", roleId: "plant", category: "Waar houd je van?", text: "Ik houd van ruimte om bestaande werkwijzen ter discussie te stellen en iets nieuws te ontwikkelen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-20", section: "preference", roleId: "bedrijfsman", category: "Waar houd je van?", text: "Ik houd ervan ideeën snel te vertalen naar concrete en uitvoerbare acties.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-21", section: "preference", roleId: "specialist", category: "Waar houd je van?", text: "Ik houd ervan langdurig geconcentreerd te werken aan een onderwerp waarin ik veel kennis kan opbouwen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-22", section: "preference", roleId: "groepswerker", category: "Waar houd je van?", text: "Ik houd van een prettige teamsfeer waarin mensen vrijuit met elkaar kunnen samenwerken.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-23", section: "preference", roleId: "vormer", category: "Waar houd je van?", text: "Ik houd van situaties waarin tempo, druk en een uitdagend resultaat centraal staan.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-24", section: "preference", roleId: "monitor", category: "Waar houd je van?", text: "Ik houd ervan de onderliggende argumenten en aannames van een voorstel te onderzoeken.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-25", section: "preference", roleId: "voorzitter", category: "Waar houd je van?", text: "Ik houd ervan een besluitvormingsproces te begeleiden en uiteindelijk tot duidelijkheid te komen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-26", section: "preference", roleId: "brononderzoeker", category: "Waar houd je van?", text: "Ik houd ervan buiten het directe team te zoeken naar contacten, voorbeelden en nieuwe mogelijkheden.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-27", section: "preference", roleId: "zorgdrager", category: "Waar houd je van?", text: "Ik houd ervan werk zorgvuldig af te ronden en mogelijke fouten tijdig te ontdekken.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },

  { id: "tr-28", section: "characteristic", roleId: "vormer", category: "Hoe herken je jezelf?", text: "Ik ben sterk gedreven om een afgesproken resultaat daadwerkelijk te bereiken.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-29", section: "characteristic", roleId: "monitor", category: "Hoe herken je jezelf?", text: "Ik ben iemand die argumenten rustig onderzoekt voordat ik tot een oordeel kom.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-30", section: "characteristic", roleId: "groepswerker", category: "Hoe herken je jezelf?", text: "Ik ben behulpzaam wanneer een teamgenoot ondersteuning of een luisterend oor nodig heeft.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-31", section: "characteristic", roleId: "zorgdrager", category: "Hoe herken je jezelf?", text: "Ik ben terughoudend om belangrijk werk uit handen te geven wanneer de kwaliteit ervan onzeker is.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-32", section: "characteristic", roleId: "bedrijfsman", category: "Hoe herken je jezelf?", text: "Ik ben systematisch in het ordenen, plannen en uitvoeren van werkzaamheden.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-33", section: "characteristic", roleId: "brononderzoeker", category: "Hoe herken je jezelf?", text: "Ik ben enthousiast wanneer zich nieuwe kansen, contacten of mogelijkheden voordoen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-34", section: "characteristic", roleId: "voorzitter", category: "Hoe herken je jezelf?", text: "Ik ben goed in het bewaken van het overzicht wanneer meerdere mensen en belangen samenkomen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-35", section: "characteristic", roleId: "plant", category: "Hoe herken je jezelf?", text: "Ik ben onafhankelijk in mijn denken en kom regelmatig met onverwachte ideeën.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-36", section: "characteristic", roleId: "specialist", category: "Hoe herken je jezelf?", text: "Ik ben sterk gericht op het opbouwen en onderhouden van diepgaande vakkennis.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-37", section: "characteristic", roleId: "vormer", category: "Hoe herken je jezelf?", text: "Ik ben doelgericht en blijf druk zetten wanneer de voortgang dreigt stil te vallen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-38", section: "characteristic", roleId: "monitor", category: "Hoe herken je jezelf?", text: "Ik ben goed in het objectief beoordelen van voorstellen, ook wanneer anderen er enthousiast over zijn.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-39", section: "characteristic", roleId: "voorzitter", category: "Hoe herken je jezelf?", text: "Ik ben goed in het samenbrengen van verschillende opvattingen tot een werkbaar gezamenlijk besluit.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-40", section: "characteristic", roleId: "bedrijfsman", category: "Hoe herken je jezelf?", text: "Ik ben praktisch ingesteld en kijk snel naar wat werkelijk uitvoerbaar is.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-41", section: "characteristic", roleId: "brononderzoeker", category: "Hoe herken je jezelf?", text: "Ik ben gemakkelijk in het leggen van nieuwe contacten en het aanspreken van anderen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-42", section: "characteristic", roleId: "zorgdrager", category: "Hoe herken je jezelf?", text: "Ik ben nauwkeurig en merk regelmatig details of onvolkomenheden op die anderen missen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-43", section: "characteristic", roleId: "groepswerker", category: "Hoe herken je jezelf?", text: "Ik ben geneigd spanningen te verzachten en te zoeken naar een oplossing waarmee mensen verder kunnen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-44", section: "characteristic", roleId: "plant", category: "Hoe herken je jezelf?", text: "Ik ben iemand die graag zelfstandig nadenkt voordat ik mijn ideeën met de groep deel.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-45", section: "characteristic", roleId: "specialist", category: "Hoe herken je jezelf?", text: "Ik ben sterk toegewijd aan mijn eigen vakgebied of inhoudelijke specialisatie.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-46", section: "characteristic", roleId: "voorzitter", category: "Hoe herken je jezelf?", text: "Ik ben goed in het verdelen van verantwoordelijkheden op basis van de kwaliteiten van mensen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-47", section: "characteristic", roleId: "brononderzoeker", category: "Hoe herken je jezelf?", text: "Ik ben breed nieuwsgierig en raak gemakkelijk enthousiast over uiteenlopende onderwerpen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-48", section: "characteristic", roleId: "bedrijfsman", category: "Hoe herken je jezelf?", text: "Ik ben betrouwbaar in het consequent uitvoeren van afgesproken werkzaamheden.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-49", section: "characteristic", roleId: "plant", category: "Hoe herken je jezelf?", text: "Ik ben goed in het bedenken van oplossingen die buiten de gebruikelijke aanpak vallen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-50", section: "characteristic", roleId: "specialist", category: "Hoe herken je jezelf?", text: "Ik ben veeleisend als het gaat om de professionele normen binnen mijn eigen deskundigheidsgebied.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-51", section: "characteristic", roleId: "vormer", category: "Hoe herken je jezelf?", text: "Ik ben rechtstreeks en aarzel niet om een moeilijk punt duidelijk te benoemen.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-52", section: "characteristic", roleId: "monitor", category: "Hoe herken je jezelf?", text: "Ik ben beschouwend en neem graag voldoende tijd om een situatie vanuit meerdere kanten te bekijken.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-53", section: "characteristic", roleId: "groepswerker", category: "Hoe herken je jezelf?", text: "Ik ben gevoelig voor wat er tussen mensen speelt en pas mijn benadering daarop aan.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },
  { id: "tr-54", section: "characteristic", roleId: "zorgdrager", category: "Hoe herken je jezelf?", text: "Ik ben vaak alert op wat fout kan gaan of nog niet voldoende is afgewerkt.", instruction: "Geef aan in hoeverre dit voor jou kenmerkend is." },

  { id: "tr-55", section: "quote", roleId: "monitor", category: "Wat zou jij kunnen zeggen?", text: "‘Welke argumenten spreken voor deze keuze en welke spreken ertegen?’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-56", section: "quote", roleId: "voorzitter", category: "Wat zou jij kunnen zeggen?", text: "‘Ik hoor verschillende standpunten. Laat me samenvatten waarover we het al eens zijn.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-57", section: "quote", roleId: "brononderzoeker", category: "Wat zou jij kunnen zeggen?", text: "‘Ik ken misschien iemand buiten het team die ons hiermee verder kan helpen.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-58", section: "quote", roleId: "zorgdrager", category: "Wat zou jij kunnen zeggen?", text: "‘Voor we dit afronden, wil ik de details nog één keer zorgvuldig controleren.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-59", section: "quote", roleId: "plant", category: "Wat zou jij kunnen zeggen?", text: "‘Wat gebeurt er als we het probleem vanuit een volledig andere invalshoek bekijken?’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-60", section: "quote", roleId: "groepswerker", category: "Wat zou jij kunnen zeggen?", text: "‘Laten we eerst zorgen dat we elkaar goed begrijpen voordat we verdergaan.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-61", section: "quote", roleId: "bedrijfsman", category: "Wat zou jij kunnen zeggen?", text: "‘We hebben voldoende besproken. Ik zet de acties en verantwoordelijkheden op een rij.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-62", section: "quote", roleId: "vormer", category: "Wat zou jij kunnen zeggen?", text: "‘Het doel is duidelijk. Nu moeten we tempo maken en doorpakken.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-63", section: "quote", roleId: "specialist", category: "Wat zou jij kunnen zeggen?", text: "‘Op basis van mijn vakkennis zie ik een inhoudelijk punt dat we niet mogen missen.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-64", section: "quote", roleId: "monitor", category: "Wat zou jij kunnen zeggen?", text: "‘Welke aannames liggen eigenlijk onder dit voorstel?’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-65", section: "quote", roleId: "voorzitter", category: "Wat zou jij kunnen zeggen?", text: "‘Wie heeft zijn of haar standpunt nog niet kunnen toelichten?’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-66", section: "quote", roleId: "brononderzoeker", category: "Wat zou jij kunnen zeggen?", text: "‘Ik ga buiten het team kijken welke andere mogelijkheden of voorbeelden er bestaan.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-67", section: "quote", roleId: "zorgdrager", category: "Wat zou jij kunnen zeggen?", text: "‘Waar kan dit plan nog mislopen en hoe voorkomen we dat?’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-68", section: "quote", roleId: "plant", category: "Wat zou jij kunnen zeggen?", text: "‘Ik heb nog een onverwachte oplossingsrichting die we kunnen onderzoeken.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-69", section: "quote", roleId: "groepswerker", category: "Wat zou jij kunnen zeggen?", text: "‘Ik wil dat we dit oplossen zonder iemand buiten te sluiten.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-70", section: "quote", roleId: "bedrijfsman", category: "Wat zou jij kunnen zeggen?", text: "‘Wie neemt welke taak op en tegen wanneer is ze klaar?’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-71", section: "quote", roleId: "vormer", category: "Wat zou jij kunnen zeggen?", text: "‘Ik zeg liever rechtstreeks wat er nodig is dan dat we om het probleem heen draaien.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." },
  { id: "tr-72", section: "quote", roleId: "specialist", category: "Wat zou jij kunnen zeggen?", text: "‘Ik wil dit inhoudelijk verder uitzoeken voordat we een definitieve beslissing nemen.’", instruction: "Geef aan in hoeverre dit een typische uitspraak van jou zou zijn in een team." }
];
