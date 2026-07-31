"use strict";

/*
  Unfold Yourself — Nederlandstalige HEXACO-resultaatteksten.
  Uitsluitend gegevens; geen uitvoeringslogica.
*/

window.HEXACO_DOMAIN_PROFILES = {
  "eerlijkheid-bescheidenheid": {
    low: {
      strength: "Je bent waarschijnlijk competitief, strategisch en weinig geremd door conventionele verwachtingen rond status of eigenbelang.",
      development: "Controleer bewust of persoonlijk voordeel, prestige of beïnvloeding niet ten koste gaat van vertrouwen, wederkerigheid of rechtvaardigheid.",
      meaning: "je relatief sterk gericht kunt zijn op status, invloed en eigen voordeel, en minder vanzelfsprekend terughoudend bent bij zelfpromotie of strategisch gedrag"
    },
    middle: {
      strength: "Je combineert doorgaans eigenbelang met aandacht voor eerlijkheid, gelijkwaardigheid en redelijke bescheidenheid.",
      development: "Maak in situaties met macht, geld of belangenconflicten expliciet welke principes voor jou niet onderhandelbaar zijn.",
      meaning: "je meestal een werkbare balans zoekt tussen eigen belangen, oprechtheid, rechtvaardigheid en bescheidenheid"
    },
    high: {
      strength: "Je komt waarschijnlijk oprecht, eerlijk, weinig hebzuchtig en bescheiden over en bent terughoudend met manipulatie of oneerlijk voordeel.",
      development: "Waak ervoor dat je jezelf niet structureel onderschat, kansen laat liggen of te weinig grenzen stelt tegenover mensen die jouw integriteit uitbuiten.",
      meaning: "oprechtheid, rechtvaardigheid, bescheidenheid en weinig behoefte aan status of persoonlijk voordeel sterk in je antwoorden naar voren komen"
    }
  },
  emotionaliteit: {
    low: {
      strength: "Je blijft waarschijnlijk zelfstandig, nuchter en relatief onbevreesd wanneer spanning of emotionele belasting toeneemt.",
      development: "Let erop dat je behoefte aan steun, kwetsbaarheid of emotionele verbondenheid bij jezelf en anderen niet te snel minimaliseert.",
      meaning: "je doorgaans weinig angst, bezorgdheid en afhankelijkheid ervaart en emotionele situaties relatief rationeel benadert"
    },
    middle: {
      strength: "Je kunt emoties en risico’s serieus nemen zonder er doorgaans volledig door te worden beheerst.",
      development: "Blijf onderscheiden wanneer zelfstandigheid passend is en wanneer steun vragen of gevoelens uitspreken juist effectiever is.",
      meaning: "je een evenwichtige verhouding lijkt te hebben tussen emotionele gevoeligheid, zelfstandigheid, voorzichtigheid en verbondenheid"
    },
    high: {
      strength: "Je merkt dreiging, spanning en emotionele signalen snel op en hecht waarschijnlijk veel waarde aan steun en verbondenheid.",
      development: "Werk aan manieren om bezorgdheid te begrenzen, zelfstandig keuzes te maken en onder druk voldoende handelingsruimte te behouden.",
      meaning: "angstgevoeligheid, bezorgdheid, behoefte aan steun en emotionele verbondenheid sterk in je antwoorden aanwezig zijn"
    }
  },
  extraversie: {
    low: {
      strength: "Je bent waarschijnlijk gereserveerd, zelfstandig en comfortabel met rust, beperkte sociale prikkels en observeren vóór je spreekt.",
      development: "Oefen met zichtbaarheid, initiatief en het uitspreken van ideeën wanneer terughoudendheid kansen of samenwerking beperkt.",
      meaning: "je eerder rustig, gereserveerd en selectief sociaal bent en minder behoefte hebt aan aandacht of voortdurende interactie"
    },
    middle: {
      strength: "Je kunt sociaal zichtbaar en energiek zijn, maar hebt doorgaans ook behoefte aan rust en selectief contact.",
      development: "Stem je sociale inzet bewust af op de situatie in plaats van automatisch mee te gaan in drukte of terugtrekking.",
      meaning: "je waarschijnlijk flexibel schakelt tussen sociale betrokkenheid, zelfstandigheid, levendigheid en rust"
    },
    high: {
      strength: "Je komt waarschijnlijk sociaal zelfverzekerd, expressief, energiek en gemakkelijk benaderbaar over.",
      development: "Let erop dat je gesprekken niet domineert, voldoende luistert en ruimte laat voor mensen met een rustiger tempo.",
      meaning: "sociale durf, expressiviteit, sociabiliteit en levendigheid sterk in je antwoorden naar voren komen"
    }
  },
  verdraagzaamheid: {
    low: {
      strength: "Je kunt kritisch, direct en standvastig reageren en laat waarschijnlijk niet gemakkelijk over je grenzen heen lopen.",
      development: "Onderzoek of irritatie, hardheid of wrok soms langer blijft doorwerken dan functioneel is voor samenwerking of herstel.",
      meaning: "je relatief kritisch, snel geprikkeld en standvastig kunt reageren, vooral bij frustratie, tegenspraak of ervaren onrecht"
    },
    middle: {
      strength: "Je combineert doorgaans geduld en redelijkheid met het vermogen om grenzen en bezwaren duidelijk te benoemen.",
      development: "Blijf bewust kiezen wanneer flexibiliteit helpt en wanneer juist een duidelijke grens of stevig standpunt nodig is.",
      meaning: "je meestal een balans zoekt tussen vergevingsgezindheid, mildheid, flexibiliteit en het bewaken van grenzen"
    },
    high: {
      strength: "Je bent waarschijnlijk geduldig, vergevingsgezind, mild en bereid je aan te passen bij meningsverschillen.",
      development: "Voorkom dat je conflicten te snel gladstrijkt, terechte boosheid onderdrukt of te veel toegeeft om de harmonie te bewaren.",
      meaning: "geduld, mildheid, flexibiliteit en vergevingsgezindheid sterk in je antwoorden aanwezig zijn"
    }
  },
  "consciëntieusheid": {
    low: {
      strength: "Je werkt waarschijnlijk spontaan en flexibel en kunt gemakkelijk loslaten wanneer omstandigheden veranderen.",
      development: "Bouw vaste systemen voor planning, opvolging, kwaliteitscontrole en taakafronding wanneer vrijblijvendheid tot fouten of uitstel leidt.",
      meaning: "je relatief spontaan en weinig gestructureerd werkt en minder nadruk legt op planning, detailcontrole en volharding"
    },
    middle: {
      strength: "Je combineert doorgaans structuur en inzet met voldoende flexibiliteit om plannen aan te passen.",
      development: "Bepaal per taak hoeveel organisatie, nauwkeurigheid en voorbereiding werkelijk nodig is en bewaak vervolgens de uitvoering.",
      meaning: "je een werkbare balans lijkt te zoeken tussen organisatie, ijver, nauwkeurigheid, voorzichtigheid en flexibiliteit"
    },
    high: {
      strength: "Je werkt waarschijnlijk georganiseerd, volhardend, zorgvuldig en doordacht en bewaakt kwaliteit en afspraken actief.",
      development: "Let op overplanning, perfectionisme, moeite met delegeren of onnodige vertraging doordat alles volledig moet kloppen.",
      meaning: "organisatie, ijver, kwaliteitsgerichtheid en bedachtzaamheid sterk in je antwoorden naar voren komen"
    }
  },
  openheid: {
    low: {
      strength: "Je bent waarschijnlijk praktisch, vertrouwd met bestaande werkwijzen en gericht op concrete toepasbaarheid.",
      development: "Zoek af en toe bewust nieuwe ideeën, kunstvormen, perspectieven of experimenten op om mentale flexibiliteit te vergroten.",
      meaning: "je relatief praktisch, conventioneel en weinig aangetrokken tot abstracte, artistieke of ongewone ervaringen bent"
    },
    middle: {
      strength: "Je staat open voor nieuwe ideeën en ervaringen, maar beoordeelt ze doorgaans ook op bruikbaarheid en aansluiting bij de context.",
      development: "Blijf afwisselen tussen verkennen en toepassen: niet ieder nieuw idee hoeft gevolgd te worden, maar niet ieder vertrouwd idee hoeft behouden te blijven.",
      meaning: "je nieuwsgierigheid, creativiteit en waardering voor nieuwe ervaringen combineert met een praktische en selectieve houding"
    },
    high: {
      strength: "Je bent waarschijnlijk nieuwsgierig, creatief, esthetisch gevoelig en bereid conventies of bekende denkpatronen ter discussie te stellen.",
      development: "Zorg dat verkenning, originaliteit en complexiteit uiteindelijk ook worden vertaald naar begrijpelijke keuzes en uitvoerbare acties.",
      meaning: "nieuwsgierigheid, creativiteit, esthetische waardering en onconventioneel denken sterk in je antwoorden aanwezig zijn"
    }
  }
};

window.HEXACO_FACET_INTERPRETATIONS = {
  H: {
    SINC: {
      low: "Je past je presentatie waarschijnlijk gemakkelijk aan om invloed uit te oefenen of een gewenst effect te bereiken. Dat kan sociaal strategisch zijn, maar vraagt aandacht voor transparantie en consistentie.",
      middle: "Je communiceert meestal oprecht, maar houdt ook rekening met context, diplomatie en het effect van je woorden. Je kunt schakelen zonder voortdurend een rol te spelen.",
      high: "Je komt waarschijnlijk direct, authentiek en weinig manipulatief over. Je probeert anderen niet snel via vleierij, schijnvertoon of verborgen bedoelingen te sturen."
    },
    FAIR: {
      low: "Regels en eerlijkheid kunnen voor jou relatief ondergeschikt worden wanneer er voordeel te behalen valt. Maak vooraf duidelijke ethische grenzen voor situaties met geld, macht of weinig toezicht.",
      middle: "Je probeert doorgaans eerlijk te handelen, maar weegt regels en omstandigheden pragmatisch tegen elkaar af. Belangenconflicten kunnen extra bewuste afweging vragen.",
      high: "Je hecht waarschijnlijk sterk aan eerlijkheid, eigendom, betrouwbaarheid en het vermijden van oneerlijk voordeel, ook wanneer misbruik moeilijk zichtbaar zou zijn."
    },
    GREE: {
      low: "Status, luxe, invloed en materieel succes kunnen belangrijke motivatoren voor je zijn. Dat kan ambitie ondersteunen, maar verhoogt het risico dat externe waardering te dominant wordt.",
      middle: "Je waardeert comfort, erkenning en vooruitgang zonder dat die doorgaans allesbepalend zijn. Je kunt materiële doelen combineren met andere waarden.",
      high: "Je lijkt weinig behoefte te hebben aan prestige, luxe, macht of opvallend statusvertoon. Waak ervoor dat je legitieme ambities of financiële belangen niet te gemakkelijk wegcijfert."
    },
    MODE: {
      low: "Je hebt waarschijnlijk veel vertrouwen in je eigen kwaliteiten en bent bereid die zichtbaar te maken. Dat helpt bij profilering, maar kan door anderen als zelfverheffing worden ervaren.",
      middle: "Je kunt je kwaliteiten erkennen en presenteren zonder jezelf voortdurend boven anderen te plaatsen. Je zelfbeeld lijkt doorgaans realistisch en contextgevoelig.",
      high: "Je stelt jezelf waarschijnlijk niet snel boven anderen en zoekt weinig bewondering. Let erop dat bescheidenheid niet verandert in jezelf kleiner maken of prestaties onvoldoende zichtbaar maken."
    }
  },
  E: {
    FEAR: {
      low: "Je treedt gevaar en fysieke risico’s waarschijnlijk vrij onbevreesd tegemoet. Dat ondersteunt daadkracht, maar kan leiden tot onderschatting van veiligheidsrisico’s.",
      middle: "Je neemt gevaar serieus zonder doorgaans te verstarren. Je risico-inschatting hangt af van de concrete situatie en beschikbare controle.",
      high: "Je reageert waarschijnlijk sterk op lichamelijk gevaar en onveilige situaties. Dit ondersteunt voorzichtigheid, maar kan risicovermijding en spanning versterken."
    },
    ANXI: {
      low: "Je piekert weinig en blijft meestal kalm onder druk. Dat ondersteunt besluitvaardigheid, al kun je vroege waarschuwingssignalen soms te gemakkelijk relativeren.",
      middle: "Je maakt je zorgen wanneer daar aanleiding toe is, maar kunt die meestal begrenzen. Je combineert waakzaamheid met redelijke emotionele stabiliteit.",
      high: "Je merkt mogelijke problemen snel op en kunt langdurig bezorgd blijven. Voorbereiding helpt, maar piekeren kan energie en besluitvorming beperken."
    },
    DEPE: {
      low: "Je vertrouwt sterk op jezelf en zoekt niet snel geruststelling of emotionele steun. Dat ondersteunt autonomie, maar kan hulp vragen onnodig moeilijk maken.",
      middle: "Je kunt zelfstandig handelen en tegelijk steun zoeken wanneer dat echt nodig is. Je afhankelijkheid van bevestiging lijkt doorgaans beperkt en contextgebonden.",
      high: "Je hebt waarschijnlijk relatief veel behoefte aan steun, bevestiging en nabijheid bij spanning. Dat versterkt verbondenheid, maar kan zelfstandig beslissen bemoeilijken."
    },
    SENT: {
      low: "Je bewaart waarschijnlijk emotionele afstand en wordt niet snel meegesleept door gevoelens of leed van anderen. Dat helpt bij nuchter handelen, maar kan koel overkomen.",
      middle: "Je kunt geraakt worden door emoties en verhalen zonder er voortdurend door te worden overspoeld. Empathie en nuchterheid zijn redelijk in balans.",
      high: "Je wordt waarschijnlijk sterk geraakt door emoties, verbondenheid en het leed van anderen. Dat ondersteunt empathie, maar vraagt voldoende emotionele grenzen."
    }
  },
  X: {
    EXPR: {
      low: "Je praat waarschijnlijk selectief, beheerst je expressie en houdt gevoelens eerder voor jezelf. Daardoor kun je rustig overkomen, maar minder zichtbaar zijn.",
      middle: "Je bent doorgaans voldoende expressief zonder voortdurend het gesprek of de aandacht over te nemen. Je past je communicatiestijl aan de situatie aan.",
      high: "Je uit gedachten en gevoelens gemakkelijk en bent waarschijnlijk verbaal en zichtbaar aanwezig. Let erop dat anderen ook voldoende ruimte krijgen."
    },
    SOCB: {
      low: "Je voelt je waarschijnlijk minder comfortabel met publieke aandacht, onbekenden of spontaan leiderschap. Voorbereiding en vertrouwde context helpen je zichtbaar te worden.",
      middle: "Je kunt sociale zichtbaarheid en initiatief opnemen wanneer dat nodig is, maar zoekt niet voortdurend het middelpunt op.",
      high: "Je treedt waarschijnlijk zelfverzekerd naar voren, spreekt gemakkelijk voor groepen en durft sociaal initiatief te nemen."
    },
    SOCI: {
      low: "Je hebt waarschijnlijk weinig behoefte aan veel sociale interactie en kiest liever voor rust of enkele vertrouwde contacten. Dat ondersteunt zelfstandigheid.",
      middle: "Je geniet van contact, maar hebt ook voldoende tijd alleen nodig. Je sociale behoefte wisselt waarschijnlijk met context en energie.",
      high: "Je zoekt en onderhoudt gemakkelijk contact en haalt waarschijnlijk veel energie uit groepen, gesprekken en gezamenlijke activiteiten."
    },
    LIVE: {
      low: "Je energieniveau en positieve uitbundigheid zijn waarschijnlijk eerder rustig of wisselend. Je functioneert mogelijk beter met een beheerst tempo en voldoende herstel.",
      middle: "Je hebt doorgaans voldoende energie en plezier, maar hoeft niet voortdurend actief of opgewekt te zijn. Je tempo past zich aan de omstandigheden aan.",
      high: "Je komt waarschijnlijk energiek, opgewekt en levenslustig over en brengt gemakkelijk activiteit en enthousiasme in een groep."
    }
  },
  A: {
    FORG: {
      low: "Je onthoudt krenkingen en onrecht waarschijnlijk lang en bent terughoudend met vergeven. Dat beschermt tegen herhaling, maar kan herstel of samenwerking blokkeren.",
      middle: "Je kunt vergeven wanneer verantwoordelijkheid en herstel geloofwaardig zijn, zonder ervaringen zomaar te vergeten. Je beoordeelt dit per situatie.",
      high: "Je laat conflicten en beledigingen waarschijnlijk relatief gemakkelijk los. Dat ondersteunt herstel, maar bewaak grenzen bij herhaald schadelijk gedrag."
    },
    GENT: {
      low: "Je bent waarschijnlijk kritisch en direct en benoemt tekortkomingen snel. Dat kan helderheid geven, maar ook hard of afkeurend overkomen.",
      middle: "Je kunt kritisch zijn zonder doorgaans voortdurend te oordelen of te klagen. Je combineert duidelijkheid met redelijke mildheid.",
      high: "Je accepteert mensen gemakkelijk en communiceert waarschijnlijk mild en weinig veroordelend. Let erop dat noodzakelijke feedback niet te vaag wordt."
    },
    FLEX: {
      low: "Je houdt sterk vast aan je eigen aanpak en reageert gevoelig op kritiek, fouten of onverwachte wijzigingen. Dat ondersteunt consistentie, maar kan samenwerking verharden.",
      middle: "Je kunt je aanpassen en advies meenemen, maar behoudt ook je eigen oordeel. Je flexibiliteit hangt af van argumenten en context.",
      high: "Je past je gemakkelijk aan, kunt advies aannemen en verdraagt tegenspraak relatief goed. Bewaak dat flexibiliteit niet omslaat in besluiteloosheid."
    },
    PATI: {
      low: "Je raakt waarschijnlijk snel geïrriteerd of boos wanneer iets traag, fout of frustrerend verloopt. Dat maakt grenzen zichtbaar, maar kan escalatie versnellen.",
      middle: "Je kunt irritatie ervaren en benoemen zonder meestal je geduld te verliezen. De duur en ernst van de situatie bepalen je reactie.",
      high: "Je blijft doorgaans geduldig en rustig bij fouten, vertraging of frustratie. Let erop dat je ergernis niet te lang inslikt voordat je een grens aangeeft."
    }
  },
  C: {
    ORGA: {
      low: "Je werkt waarschijnlijk flexibel en verdraagt rommel of onvoltooide structuur relatief goed. Gebruik eenvoudige routines om overzicht en opvolging te bewaken.",
      middle: "Je houdt doorgaans voldoende orde zonder dat alles voortdurend perfect georganiseerd hoeft te zijn. Je past structuur aan het belang van de taak aan.",
      high: "Je houdt waarschijnlijk van orde, vaste plaatsen en tijdige afronding. Dat ondersteunt overzicht, maar kan spanning geven wanneer anderen minder gestructureerd werken."
    },
    DILI: {
      low: "Je inspanning neemt waarschijnlijk af wanneer werk moeilijk, saai of weinig betekenisvol wordt. Kleine startstappen en zichtbare deadlines kunnen helpen.",
      middle: "Je werkt doorgaans degelijk en volhardend, maar bewaakt ook je energie. Je inzet hangt waarschijnlijk samen met belang en haalbaarheid.",
      high: "Je zet sterk door, begint snel en stelt hoge eisen aan je eigen inzet. Let op overbelasting en het onnodig moeilijk maken om te stoppen."
    },
    PERF: {
      low: "Je accepteert waarschijnlijk gemakkelijker onvolmaaktheid en besteedt minder tijd aan details. Dat ondersteunt snelheid, maar verhoogt het risico op gemiste fouten.",
      middle: "Je bewaakt kwaliteit en details zonder doorgaans ieder onderdeel volledig te perfectioneren. Je kunt proportionaliteit toepassen.",
      high: "Je merkt details en fouten snel op en streeft naar hoge kwaliteit. Bewaak tijd, prioriteiten en de grens tussen zorgvuldig en overmatig perfectionistisch."
    },
    PRUD: {
      low: "Je handelt waarschijnlijk spontaan en beslist snel, soms voordat gevolgen volledig zijn afgewogen. Een korte controlepauze kan fouten beperken.",
      middle: "Je denkt meestal voldoende vooruit, maar kunt ook snel handelen wanneer de situatie dat vraagt. Je voorzichtigheid is contextafhankelijk.",
      high: "Je plant, denkt vooruit en vermijdt impulsieve beslissingen. Dat ondersteunt betrouwbaarheid, maar kan tempo en experimenteren afremmen."
    }
  },
  O: {
    AESA: {
      low: "Kunst, muziek, poëzie en esthetische ervaringen spelen waarschijnlijk een beperkte rol in je aandacht of ontspanning. Je voorkeur kan sterker praktisch gericht zijn.",
      middle: "Je kunt kunst en schoonheid waarderen zonder dat die centraal staan in je dagelijks leven. Je esthetische interesse is selectief.",
      high: "Je wordt waarschijnlijk sterk geraakt door kunst, muziek, natuur en subtiele schoonheid. Esthetische ervaringen voeden mogelijk je reflectie en inspiratie."
    },
    INQU: {
      low: "Je richt je waarschijnlijk vooral op concrete, vertrouwde of direct toepasbare informatie. Complexe theoretische onderwerpen trekken je minder aan.",
      middle: "Je bent nieuwsgierig naar nieuwe kennis, maar kiest onderwerpen selectief op relevantie en interesse. Praktijk en theorie blijven in balans.",
      high: "Je onderzoekt graag complexe onderwerpen, wetenschap, geschiedenis en maatschappelijke vraagstukken. Let erop dat verdieping ook tot keuzes of toepassing leidt."
    },
    CREA: {
      low: "Je vertrouwt waarschijnlijk op bekende oplossingen en concrete voorbeelden. Dat ondersteunt voorspelbaarheid, maar kan nieuwe mogelijkheden onbenut laten.",
      middle: "Je kunt nieuwe ideeën bedenken wanneer dat nodig is, maar hoeft niet voortdurend origineel te zijn. Je combineert vernieuwing met haalbaarheid.",
      high: "Je hebt waarschijnlijk een levendige verbeelding en genereert gemakkelijk nieuwe ideeën en invalshoeken. Structuur helpt om ideeën uitvoerbaar te maken."
    },
    UNCO: {
      low: "Je voelt je waarschijnlijk comfortabel met gebruikelijke normen, rollen en werkwijzen. Dat ondersteunt aansluiting, maar kan afwijkende ideeën sneller uitsluiten.",
      middle: "Je kunt conventies volgen wanneer ze functioneel zijn en ervan afwijken wanneer daar een goede reden voor is. Je originaliteit is selectief.",
      high: "Je staat waarschijnlijk open voor afwijkende ideeën, ongewone keuzes en het uitdagen van gezag of conventies. Houd rekening met draagvlak en consequenties."
    }
  }
};
