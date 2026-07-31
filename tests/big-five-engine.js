"use strict";

/*
  Unfold Yourself — Big Five-testmodule
  Afhankelijkheden: big-five-choices.js, big-five-questions.js, core/test-utils.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

/* =========================================================
   BIG FIVE — EXTERNE VRAGEN EN ANTWOORDKEUZES
========================================================= */

const BIG_FIVE_QUESTIONS =
  Array.isArray(window.BIG_FIVE_QUESTIONS)
    ? window.BIG_FIVE_QUESTIONS
    : [];

const BIG_FIVE_CHOICES =
  window.BIG_FIVE_CHOICES &&
  typeof window.BIG_FIVE_CHOICES === "object"
    ? window.BIG_FIVE_CHOICES
    : {
        plus: [],
        minus: []
      };


/* =========================================================
   BIG FIVE — HOOFDDOMEINEN
========================================================= */

const BIG_FIVE_DOMAIN_DEFINITIONS = [
  {
    code: "O",
    id: "openheid",
    label: "Openheid"
  },
  {
    code: "C",
    id: "consciëntieusheid",
    label: "Consciëntieusheid"
  },
  {
    code: "E",
    id: "extraversie",
    label: "Extraversie"
  },
  {
    code: "A",
    id: "aangenaamheid",
    label: "Aangenaamheid"
  },
  {
    code: "N",
    id: "emotionele-gevoeligheid",
    label: "Emotionele gevoeligheid"
  }
];

const BIG_FIVE_DOMAIN_BY_CODE =
  Object.fromEntries(
    BIG_FIVE_DOMAIN_DEFINITIONS.map(
      domain => [
        domain.code,
        domain
      ]
    )
  );

/* =========================================================
   BIG FIVE — WEERGAVE OP DE RESULTAATKAARTEN

   Dit verandert alleen de zichtbare naam en beschrijving.
   De interne scoring en domeincodes blijven ongewijzigd.
========================================================= */

const BIG_FIVE_RESULT_CARD_CONTENT = {
  openheid: {
    label:
      "Openheid",

    description:
      "Hoe nieuwsgierig, creatief en intellectueel uitdagend je bent ingesteld."
  },

  consciëntieusheid: {
    label:
      "Consciëntieusheid",

    description:
      "Hoe doelgericht, georganiseerd en plichtsgetrouw je te werk gaat."
  },

  extraversie: {
    label:
      "Extraversie",

    description:
      "Hoe sociaal, energiek en spraakzaam je bent in de omgang met anderen."
  },

  aangenaamheid: {
    label:
      "Altruïsme",

    description:
      "Hoe vriendelijk, meegaand, hulpvaardig en meelevend je bent voor je medemens."
  },

  "emotionele-gevoeligheid": {
    label:
      "Neuroticisme",

    description:
      "Hoe gevoelig je bent voor stress, angst, piekeren en emotionele schommelingen."
  }
};

/* =========================================================
   BIG FIVE — FACETNAMEN
========================================================= */

const BIG_FIVE_FACET_LABELS = {
  N: {
    1: "Bezorgdheid",
    2: "Prikkelbaarheid",
    3: "Somberheid",
    4: "Sociale onzekerheid",
    5: "Moeite met impulsbeheersing",
    6: "Stressgevoeligheid"
  },

  E: {
    1: "Sociale warmte",
    2: "Gezelligheid",
    3: "Assertiviteit",
    4: "Activiteitsniveau",
    5: "Sensatie zoeken",
    6: "Positieve emoties"
  },

  O: {
    1: "Verbeelding",
    2: "Artistieke interesse",
    3: "Emotionele openheid",
    4: "Afwisseling en avontuur",
    5: "Intellectuele nieuwsgierigheid",
    6: "Waarden en ideeën"
  },

  A: {
    1: "Vertrouwen",
    2: "Oprechtheid",
    3: "Altruïsme",
    4: "Samenwerking",
    5: "Bescheidenheid",
    6: "Medeleven"
  },

  C: {
    1: "Zelfeffectiviteit",
    2: "Ordelijkheid",
    3: "Plichtsbesef",
    4: "Prestatiegerichtheid",
    5: "Zelfdiscipline",
    6: "Voorzichtigheid"
  }
};

/* =========================================================
   BIG FIVE — INTERPRETATIES VAN DE 30 FACETTEN

   Iedere facetscore krijgt een interpretatie voor:
   - laag: 0 tot en met 40 procent
   - gemiddeld: 41 tot en met 59 procent
   - hoog: 60 tot en met 100 procent
========================================================= */

const BIG_FIVE_FACET_INTERPRETATIONS = {
  N: {
    1: {
      low:
        "Je blijft doorgaans rustig en verwacht niet snel dat iets misgaat. Dat ondersteunt vertrouwen en besluitvaardigheid, maar let erop dat je reële risico’s niet te gemakkelijk relativeert.",

      middle:
        "Je ervaart bezorgdheid wanneer daar aanleiding toe is, maar kunt die meestal begrenzen. Je combineert daardoor waakzaamheid met een redelijke mate van rust.",

      high:
        "Je merkt risico’s en mogelijke problemen snel op en denkt vooruit over wat verkeerd kan gaan. Dit kan nuttig zijn voor preventie, maar onder druk kan het omslaan in piekeren of overmatige voorzichtigheid."
    },

    2: {
      low:
        "Je raakt doorgaans niet snel geïrriteerd en kunt frustraties relatief kalm verwerken. Daardoor blijf je vaak constructief, al kan je soms te lang wachten voordat je duidelijk een grens aangeeft.",

      middle:
        "Je kunt irritatie ervaren en uiten zonder dat die doorgaans je gedrag beheerst. De situatie bepaalt meestal hoe sterk je reageert.",

      high:
        "Je reageert waarschijnlijk snel en krachtig op frustratie, onrechtvaardigheid of tegenwerking. Dit kan zorgen voor duidelijkheid en daadkracht, maar verhoogt ook het risico op scherpe of impulsieve reacties."
    },

    3: {
      low:
        "Je behoudt meestal een positieve of stabiele stemming en herstelt relatief snel van teleurstellingen. Let erop dat je somberheid of ontmoediging bij anderen niet onderschat.",

      middle:
        "Je kent normale schommelingen in stemming, maar blijft er doorgaans niet langdurig in vastzitten. Positieve en negatieve ervaringen hebben een evenwichtige invloed.",

      high:
        "Tegenslag en negatieve ervaringen kunnen relatief sterk en langdurig op je stemming wegen. Je bent waarschijnlijk gevoelig voor teleurstelling, waardoor herstel en sociale steun extra belangrijk zijn."
    },

    4: {
      low:
        "Je voelt je doorgaans comfortabel wanneer je zichtbaar bent of door anderen wordt beoordeeld. Dat helpt bij presenteren en netwerken, maar kan maken dat je sociale spanning bij anderen minder snel herkent.",

      middle:
        "Je kunt je in onbekende sociale situaties wat onzeker voelen, maar past je meestal aan. Je mate van zelfbewustzijn hangt sterk af van de context.",

      high:
        "Je bent waarschijnlijk sterk bewust van hoe anderen je zien en kunt spanning ervaren wanneer je in de belangstelling staat. Dit ondersteunt sociale voorzichtigheid, maar kan zichtbaarheid en spontaniteit beperken."
    },

    5: {
      low:
        "Je kunt verleidingen en sterke impulsen doorgaans goed beheersen. Dit ondersteunt zelfcontrole en doordachte keuzes, al bestaat het risico dat je jezelf weinig ruimte voor spontaniteit geeft.",

      middle:
        "Je kunt impulsen meestal reguleren, maar laat soms bewust ruimte voor plezier en spontaniteit. De context bepaalt hoe streng je jezelf controleert.",

      high:
        "Sterke verlangens of onmiddellijke beloningen kunnen relatief veel invloed op je gedrag hebben. Dit ondersteunt spontaniteit, maar vraagt extra aandacht bij keuzes met financiële, relationele of gezondheidsgevolgen."
    },

    6: {
      low:
        "Je blijft doorgaans kalm en handelingsgericht wanneer de druk toeneemt. Dat ondersteunt crisisbestendigheid, maar let erop dat je niet te lang doorgaat zonder herstel.",

      middle:
        "Je kunt spanning ervaren in moeilijke omstandigheden, maar behoudt meestal voldoende overzicht om te handelen. Je reactie hangt af van de ernst en duur van de druk.",

      high:
        "Je kunt je bij hoge druk relatief snel overweldigd of handelingsonzeker voelen. Je merkt belasting vroeg op, maar hebt waarschijnlijk extra baat bij voorbereiding, structuur en tijdig herstel."
    }
  },
  E: {
    1: {
      low:
        "Je bent waarschijnlijk gereserveerd en hebt tijd nodig voordat je je sociaal openstelt. Dit ondersteunt zelfstandigheid en selectieve relaties, maar kan afstandelijk overkomen wanneer anderen je nog niet kennen.",

      middle:
        "Je bent sociaal toegankelijk zonder voortdurend contact nodig te hebben. Je kunt warmte tonen, maar bewaart ook een zekere persoonlijke afstand.",

      high:
        "Je legt waarschijnlijk gemakkelijk contact en straalt sociale toegankelijkheid uit. Dit ondersteunt vertrouwen en netwerkvorming, maar let erop dat je anderen voldoende ruimte geeft."
    },

    2: {
      low:
        "Je geeft waarschijnlijk de voorkeur aan kleine groepen, rust of zelfstandig werken. Dat ondersteunt verdieping, maar langdurige groepsinteractie kan relatief veel energie kosten.",

      middle:
        "Je kunt genieten van gezelschap, maar hebt ook behoefte aan tijd alleen. Je sociale voorkeur hangt waarschijnlijk af van de groep en de situatie.",

      high:
        "Je voelt je waarschijnlijk sterk aangetrokken tot groepen, bijeenkomsten en sociale activiteit. Dat ondersteunt zichtbaarheid en verbondenheid, maar kan ten koste gaan van rust en geconcentreerd individueel werk."
    },

    3: {
      low:
        "Je neemt waarschijnlijk niet automatisch het woord of de leiding. Dit ondersteunt luisteren en samenwerking, maar je ideeën kunnen minder zichtbaar worden wanneer je jezelf te veel op de achtergrond houdt.",

      middle:
        "Je kunt de leiding nemen wanneer dat nodig is, maar voelt niet voortdurend de behoefte om te domineren. Je assertiviteit is waarschijnlijk situationeel.",

      high:
        "Je neemt waarschijnlijk gemakkelijk initiatief, spreekt je uit en beïnvloedt groepsbesluiten. Dit ondersteunt leiderschap, maar vraagt aandacht voor luisteren en gedeelde besluitvorming."
    },

    4: {
      low:
        "Je werkt waarschijnlijk graag in een rustig tempo en hebt voldoende tijd nodig voor herstel. Dit ondersteunt bedachtzaamheid, maar snelle of zeer dynamische omgevingen kunnen vermoeiend zijn.",

      middle:
        "Je kunt actief en productief zijn, maar hebt ook momenten van rust nodig. Je tempo past zich doorgaans aan de omstandigheden aan.",

      high:
        "Je hebt waarschijnlijk een hoog activiteitenniveau en bent graag met meerdere zaken bezig. Dit ondersteunt tempo en productiviteit, maar verhoogt het risico op overbelasting of onvoldoende herstel."
    },

    5: {
      low:
        "Je geeft waarschijnlijk de voorkeur aan voorspelbaarheid en beheersbare prikkels. Dit ondersteunt voorzichtigheid, maar kan maken dat je uitdagende of onbekende ervaringen minder snel opzoekt.",

      middle:
        "Je kunt genieten van spanning en vernieuwing, maar zoekt die niet voortdurend op. Je houdt waarschijnlijk een evenwicht tussen avontuur en zekerheid.",

      high:
        "Je zoekt waarschijnlijk actief spanning, uitdaging en nieuwe prikkels. Dit ondersteunt moed en experimenteren, maar kan leiden tot onnodige risico’s of impulsieve keuzes."
    },

    6: {
      low:
        "Je uit positieve gevoelens waarschijnlijk terughoudend en blijft vaak nuchter. Dit ondersteunt realisme, maar anderen kunnen je enthousiasme soms moeilijk lezen.",

      middle:
        "Je ervaart en toont positieve emoties zonder voortdurend uitbundig te zijn. Je stemming is waarschijnlijk redelijk evenwichtig.",

      high:
        "Je ervaart waarschijnlijk vaak enthousiasme, plezier en optimisme en straalt dit zichtbaar uit. Dit werkt motiverend, maar kan maken dat je negatieve signalen soms te snel relativeert."
    }
  },
  O: {
    1: {
      low:
        "Je denkt waarschijnlijk concreet en praktisch en laat je minder leiden door fantasie. Dit ondersteunt toepasbaarheid, maar kan creatieve alternatieven beperken.",

      middle:
        "Je kunt fantasie en verbeelding gebruiken, maar blijft meestal verbonden met praktische haalbaarheid. Je schakelt tussen creativiteit en realisme.",

      high:
        "Je beschikt waarschijnlijk over een levendige verbeelding en denkt gemakkelijk in mogelijkheden en scenario’s. Dit ondersteunt creativiteit, maar ideeën kunnen soms verder gaan dan wat praktisch uitvoerbaar is."
    },

    2: {
      low:
        "Kunst, vormgeving of esthetiek spelen waarschijnlijk een beperkte rol in je aandacht en beslissingen. Je richt je eerder op functionaliteit en concrete bruikbaarheid.",

      middle:
        "Je kunt schoonheid en creatieve expressie waarderen zonder dat dit een centrale behoefte is. Je belangstelling hangt waarschijnlijk af van het onderwerp.",

      high:
        "Je bent waarschijnlijk sterk gevoelig voor schoonheid, kunst en visuele of emotionele expressie. Dit ondersteunt creativiteit en nuance, maar kan botsen met sterk functionele omgevingen."
    },

    3: {
      low:
        "Je benadert emoties waarschijnlijk rationeel en houdt innerlijke gevoelens eerder op afstand. Dit ondersteunt nuchterheid, maar kan emotionele signalen minder zichtbaar maken.",

      middle:
        "Je kunt gevoelens herkennen en toelaten zonder er volledig door te worden gestuurd. Je combineert emotioneel bewustzijn met enige afstand.",

      high:
        "Je beleeft en herkent emoties waarschijnlijk intens en genuanceerd. Dit ondersteunt empathie en zelfinzicht, maar kan emotionele ervaringen ook zwaarder maken."
    },

    4: {
      low:
        "Je waardeert waarschijnlijk vertrouwde routines en voorspelbare werkwijzen. Dit ondersteunt stabiliteit, maar kan aanpassing aan verandering vertragen.",

      middle:
        "Je staat open voor verandering wanneer er een duidelijke reden voor is, maar waardeert ook continuïteit. Je zoekt meestal een werkbaar evenwicht.",

      high:
        "Je zoekt waarschijnlijk actief afwisseling, nieuwe ervaringen en verandering. Dit ondersteunt flexibiliteit en innovatie, maar routinetaken kunnen snel vervelen."
    },

    5: {
      low:
        "Je geeft waarschijnlijk de voorkeur aan concrete en direct toepasbare informatie. Dit ondersteunt praktische besluitvorming, maar theoretische of abstracte vraagstukken kunnen minder aantrekkelijk zijn.",

      middle:
        "Je kunt abstracte ideeën onderzoeken wanneer ze relevant zijn, maar blijft gericht op toepassing. Je combineert analyse met praktische bruikbaarheid.",

      high:
        "Je geniet waarschijnlijk van complexe, abstracte en theoretische vraagstukken. Dit ondersteunt analyse en innovatie, maar kan leiden tot overdenken of onnodige complexiteit."
    },

    6: {
      low:
        "Je hecht waarschijnlijk waarde aan duidelijke normen, tradities en gevestigde overtuigingen. Dit ondersteunt consistentie, maar kan alternatieve perspectieven minder ruimte geven.",

      middle:
        "Je kunt bestaande waarden respecteren en tegelijk kritisch blijven nadenken. Je overtuigingen zijn waarschijnlijk stabiel maar niet volledig vaststaand.",

      high:
        "Je onderzoekt waarschijnlijk kritisch bestaande normen en staat open voor alternatieve waarden en overtuigingen. Dit ondersteunt inclusie en verandering, maar kan botsen met sterk traditionele omgevingen."
    }
  },
  A: {
    1: {
      low:
        "Je vertrouwt anderen waarschijnlijk niet onmiddellijk en zoekt eerst bewijs van betrouwbaarheid. Dit beschermt tegen naïviteit, maar kan samenwerking en verbondenheid vertragen.",

      middle:
        "Je geeft anderen doorgaans een kans, maar blijft alert op gedrag en context. Vertrouwen groeit waarschijnlijk op basis van ervaring.",

      high:
        "Je gaat waarschijnlijk gemakkelijk uit van goede bedoelingen en geeft anderen snel vertrouwen. Dit ondersteunt relaties, maar verhoogt het risico dat je waarschuwingssignalen te laat opmerkt."
    },

    2: {
      low:
        "Je kunt strategisch en diplomatiek omgaan met informatie en belangen. Dit ondersteunt onderhandelen, maar kan door anderen als minder transparant worden ervaren.",

      middle:
        "Je bent meestal eerlijk en direct, maar houdt rekening met context en gevoeligheden. Je probeert waarheid en diplomatie te combineren.",

      high:
        "Je hecht waarschijnlijk sterk aan eerlijkheid, oprechtheid en duidelijke intenties. Dit ondersteunt vertrouwen, maar zeer directe openheid kan soms weinig tactvol overkomen."
    },

    3: {
      low:
        "Je beschermt waarschijnlijk je tijd en middelen en voelt je niet automatisch verantwoordelijk voor problemen van anderen. Dit ondersteunt grenzen, maar kan minder behulpzaam overkomen.",

      middle:
        "Je helpt anderen wanneer dat redelijk en haalbaar is, zonder jezelf voortdurend weg te cijferen. Je zoekt waarschijnlijk wederkerigheid.",

      high:
        "Je helpt waarschijnlijk gemakkelijk en voelt je betrokken bij het welzijn van anderen. Dit ondersteunt samenwerking, maar verhoogt het risico dat je te veel verantwoordelijkheid overneemt."
    },

    4: {
      low:
        "Je bent waarschijnlijk bereid om stevig te confronteren en je eigen positie te verdedigen. Dit ondersteunt duidelijkheid, maar kan conflicten versterken.",

      middle:
        "Je zoekt meestal samenwerking, maar kunt ook weerstand bieden wanneer dat nodig is. Je past je stijl waarschijnlijk aan de situatie aan.",

      high:
        "Je probeert waarschijnlijk spanning te verminderen en zoekt naar overeenstemming en werkbare oplossingen. Dit ondersteunt harmonie, maar kan leiden tot conflictvermijding."
    },

    5: {
      low:
        "Je erkent waarschijnlijk gemakkelijk je eigen kwaliteiten en durft jezelf zichtbaar te positioneren. Dit ondersteunt zelfpromotie, maar kan bij anderen zelfingenomen overkomen.",

      middle:
        "Je kunt je sterke punten benoemen zonder jezelf voortdurend centraal te stellen. Je zelfpresentatie is waarschijnlijk redelijk evenwichtig.",

      high:
        "Je stelt jezelf waarschijnlijk bescheiden op en zoekt niet snel persoonlijke erkenning. Dit ondersteunt samenwerking, maar je prestaties kunnen daardoor minder zichtbaar worden."
    },

    6: {
      low:
        "Je kunt emotionele afstand bewaren en beslissingen maken zonder sterk door medelijden te worden beïnvloed. Dit ondersteunt objectiviteit, maar kan hard of ongevoelig overkomen.",

      middle:
        "Je kunt meevoelen met anderen en tegelijk voldoende afstand bewaren om praktisch te handelen. Je medeleven is waarschijnlijk situationeel.",

      high:
        "Je bent waarschijnlijk sterk geraakt door het leed en de behoeften van anderen. Dit ondersteunt mensgerichtheid, maar kan emotionele belasting of moeilijke begrenzing veroorzaken."
    }
  },
  C: {
    1: {
      low:
        "Je kunt twijfelen aan je vermogen om complexe taken succesvol af te ronden. Dit kan voorzichtigheid bevorderen, maar ook initiatief en zelfvertrouwen beperken.",

      middle:
        "Je voelt je in veel situaties bekwaam, maar herkent ook wanneer ondersteuning of voorbereiding nodig is. Je zelfvertrouwen is waarschijnlijk realistisch.",

      high:
        "Je vertrouwt waarschijnlijk sterk op je vermogen om problemen op te lossen en resultaten te bereiken. Dit ondersteunt initiatief, maar kan leiden tot onderschatting van complexiteit of benodigde hulp."
    },

    2: {
      low:
        "Je werkt waarschijnlijk flexibel en hecht minder waarde aan vaste orde of structuur. Dit ondersteunt spontaniteit, maar kan leiden tot zoekwerk, fouten of gemiste afspraken.",

      middle:
        "Je gebruikt structuur waar die nuttig is, maar accepteert ook enige rommeligheid. Je organisatiegraad past zich waarschijnlijk aan het belang van de taak aan.",

      high:
        "Je houdt waarschijnlijk sterk van orde, planning en een duidelijke plaats voor informatie en materialen. Dit ondersteunt efficiëntie, maar onverwachte veranderingen kunnen extra frustreren."
    },

    3: {
      low:
        "Je beoordeelt regels en verplichtingen waarschijnlijk op hun praktische waarde en voelt je minder gebonden aan formele verwachtingen. Dit ondersteunt onafhankelijkheid, maar kan betrouwbaarheid onder druk zetten.",

      middle:
        "Je neemt afspraken serieus, maar kunt uitzonderingen accepteren wanneer daar een goede reden voor is. Je combineert verantwoordelijkheid met pragmatisme.",

      high:
        "Je voelt waarschijnlijk een sterk verantwoordelijkheidsgevoel en houdt je zorgvuldig aan afspraken, normen en beloften. Dit ondersteunt vertrouwen, maar kan leiden tot overmatige plichtsdruk."
    },

    4: {
      low:
        "Je legt waarschijnlijk minder nadruk op voortdurende prestatie of het overtreffen van verwachtingen. Dit ondersteunt ontspanning, maar kan ontwikkeling en resultaat beperken.",

      middle:
        "Je wilt goede resultaten behalen, maar behoudt meestal aandacht voor haalbaarheid en balans. Je inzet varieert waarschijnlijk met het belang van het doel.",

      high:
        "Je stelt waarschijnlijk ambitieuze doelen en bent bereid veel inspanning te leveren om ze te bereiken. Dit ondersteunt succes, maar verhoogt het risico op perfectionisme en overbelasting."
    },

    5: {
      low:
        "Je kunt moeite hebben om taken te starten of vol te houden wanneer motivatie ontbreekt. Dit ondersteunt spontaniteit, maar vraagt duidelijke structuur en korte opvolgmomenten.",

      middle:
        "Je kunt jezelf meestal aan het werk zetten, al speelt motivatie nog een merkbare rol. Belangrijke deadlines en structuur helpen je waarschijnlijk.",

      high:
        "Je kunt waarschijnlijk blijven doorwerken, ook wanneer een taak weinig plezier of directe beloning biedt. Dit ondersteunt betrouwbaarheid, maar kan ertoe leiden dat je te lang doorgaat."
    },

    6: {
      low:
        "Je beslist en handelt waarschijnlijk snel en vertrouwt sterk op directe inschatting. Dit ondersteunt tempo, maar verhoogt het risico op onvoorziene gevolgen.",

      middle:
        "Je denkt meestal voldoende na voordat je handelt, zonder iedere beslissing uitgebreid te analyseren. Je combineert snelheid en voorzichtigheid.",

      high:
        "Je overweegt waarschijnlijk zorgvuldig risico’s en gevolgen voordat je een beslissing neemt. Dit ondersteunt kwaliteit, maar kan besluitvorming vertragen."
    }
  }
};



/* =========================================================
   BESCHRIJVING BIJ DE VIJF ANTWOORDKEUZES
========================================================= */

const BIG_FIVE_ANSWER_DESCRIPTIONS = {
  "Zeer oneens":
    "Deze uitspraak past helemaal niet bij mij.",

  "Oneens":
    "Deze uitspraak past meestal niet bij mij.",

  "Noch eens, noch oneens":
    "Deze uitspraak past soms wel en soms niet bij mij.",

  "Eens":
    "Deze uitspraak past meestal bij mij.",

  "Zeer eens":
    "Deze uitspraak past volledig bij mij."
};


/* =========================================================
   ANTWOORDKEUZES PER VRAAG OPHALEN

   Bij een plusvraag loopt de score van 1 naar 5.
   Bij een minusvraag wordt de score uit choices.js gebruikt
   en dus automatisch omgekeerd.
========================================================= */

function getBigFiveQuestionChoices(question) {
  const sourceChoices =
    BIG_FIVE_CHOICES[
      question.keyed
    ];

  if (!Array.isArray(sourceChoices)) {
    return [];
  }

  return sourceChoices.map(choice => {
    return {
      value: Number(choice.score),
      rawValue: Number(choice.color),
      color: Number(choice.color),
      label: String(choice.text),

      description:
        BIG_FIVE_ANSWER_DESCRIPTIONS[
          choice.text
        ] || ""
    };
  });
}


/* =========================================================
   BIG FIVE-VRAGEN OMZETTEN NAAR DE TESTSTRUCTUUR
========================================================= */

const mappedBigFiveQuestions =
  BIG_FIVE_QUESTIONS
    .filter(question => {
      return Boolean(
        BIG_FIVE_DOMAIN_BY_CODE[
          question.domain
        ]
      );
    })
    .map(question => {
      const domain =
        BIG_FIVE_DOMAIN_BY_CODE[
          question.domain
        ];

      const facetLabel =
        BIG_FIVE_FACET_LABELS[
          question.domain
        ]?.[question.facet] ||
        `Facet ${question.facet}`;

      return {
        id: question.id,

        text: question.text,

        keyed: question.keyed,

        domainCode:
          question.domain,

        dimension:
          domain.id,

        facet:
          Number(question.facet),

        facetLabel,

        answerBankKey:
          window.BIG_FIVE_ANSWER_BANK_KEYS?.[
            question.id
          ] ||
          `ipip-neo-120:${question.id}`,

        category:
          `${domain.label} · ${facetLabel}`
      };
    });


if (mappedBigFiveQuestions.length !== 120) {
  console.warn(
    "Big Five-controle: er werden " +
    mappedBigFiveQuestions.length +
    " vragen geladen in plaats van 120."
  );
}


/* =========================================================
   INTERPRETATIE PER BIG FIVE-DIMENSIE
========================================================= */

const dimensionProfiles = {
  openheid: {
    high: {
      strength:
        "Je staat sterk open voor nieuwe ideeën, ervaringen, perspectieven en intellectuele uitdaging.",

      development:
        "Let erop dat nieuwsgierigheid niet leidt tot versnippering of voortdurend nieuwe ideeën zonder afronding.",

      meaning:
        "je waarschijnlijk energie krijgt van leren, vernieuwing, creativiteit en het verkennen van mogelijkheden"
    },

    middle: {
      strength:
        "Je combineert openheid voor nieuwe ideeën met een praktische waardering voor bekende en bewezen werkwijzen.",

      development:
        "Onderzoek per situatie bewust of vernieuwing of juist stabiliteit de meeste waarde biedt.",

      meaning:
        "je doorgaans kunt schakelen tussen vernieuwing en een meer praktische, vertrouwde aanpak"
    },

    low: {
      strength:
        "Je bent waarschijnlijk praktisch, nuchter en gericht op duidelijke, concrete en bewezen oplossingen.",

      development:
        "Zoek af en toe bewust een onbekende aanpak, bron of ervaring op om bestaande denkpatronen uit te dagen.",

      meaning:
        "je waarschijnlijk het best functioneert met concrete informatie, herkenbare werkwijzen en duidelijke toepasbaarheid"
    }
  },


  consciëntieusheid: {
    high: {
      strength:
        "Je werkt waarschijnlijk georganiseerd, doelgericht, zorgvuldig en met een sterk verantwoordelijkheidsgevoel.",

      development:
        "Waak ervoor dat planning, perfectionisme of controle niet ten koste gaan van flexibiliteit en snelheid.",

      meaning:
        "je waarschijnlijk goed functioneert met duidelijke doelen, verantwoordelijkheid en een planmatige werkwijze"
    },

    middle: {
      strength:
        "Je kunt structuur gebruiken wanneer dat nodig is, maar behoudt doorgaans ook enige ruimte voor spontaniteit.",

      development:
        "Maak vooral bij belangrijke of langdurige opdrachten expliciet welke planning en opvolging nodig zijn.",

      meaning:
        "je doorgaans een werkbare balans zoekt tussen structuur, flexibiliteit en resultaat"
    },

    low: {
      strength:
        "Je kunt waarschijnlijk spontaan, flexibel en snel reageren wanneer omstandigheden veranderen.",

      development:
        "Maak prioriteiten, deadlines en concrete vervolgstappen zichtbaar om uitstel en onafgewerkte taken te beperken.",

      meaning:
        "je waarschijnlijk meer baat hebt bij eenvoudige structuren, korte opvolgmomenten en duidelijk afgebakende taken"
    }
  },


  extraversie: {
    high: {
      strength:
        "Je brengt waarschijnlijk sociale energie, zichtbaarheid, initiatief en actieve betrokkenheid in groepen.",

      development:
        "Geef anderen voldoende ruimte en plan ook momenten zonder sociale prikkels of voortdurende activiteit.",

      meaning:
        "sociale interactie, overleg, afwisseling en actieve deelname waarschijnlijk belangrijke energiebronnen voor je zijn"
    },

    middle: {
      strength:
        "Je kunt sociaal en zichtbaar optreden, maar hebt waarschijnlijk ook behoefte aan rust en zelfstandige verwerking.",

      development:
        "Stem je mate van sociale activiteit bewust af op de situatie en op je beschikbare energie.",

      meaning:
        "je waarschijnlijk kunt schakelen tussen samenwerking, zichtbaarheid en zelfstandig werken"
    },

    low: {
      strength:
        "Je bent waarschijnlijk bedachtzaam, zelfstandig en comfortabel met rust, verdieping en beperkte sociale prikkels.",

      development:
        "Oefen met zichtbaar deelnemen, je mening uitspreken en gericht contact leggen wanneer een situatie dit vraagt.",

      meaning:
        "je waarschijnlijk het best functioneert met voldoende zelfstandigheid, rust en ruimte om na te denken"
    }
  },


  aangenaamheid: {
    high: {
      strength:
        "Je bent waarschijnlijk sterk gericht op samenwerking, vertrouwen, begrip en het welzijn van anderen.",

      development:
        "Blijf ook je eigen grenzen, belangen en kritische oordeel bewaken wanneer harmonie onder druk staat.",

      meaning:
        "samenwerking, vertrouwen en de kwaliteit van relaties waarschijnlijk zwaar meewegen in je gedrag"
    },

    middle: {
      strength:
        "Je kunt doorgaans rekening houden met anderen zonder je eigen positie volledig uit het oog te verliezen.",

      development:
        "Maak bewust onderscheid tussen situaties waarin samenwerking of juist duidelijke tegenspraak nodig is.",

      meaning:
        "je waarschijnlijk een balans zoekt tussen verbondenheid, eerlijkheid en eigen belangen"
    },

    low: {
      strength:
        "Je kunt waarschijnlijk direct, kritisch, onafhankelijk en resultaatgericht optreden in moeilijke discussies.",

      development:
        "Onderzoek bewust het perspectief en de behoeften van anderen voordat je een standpunt of beslissing vastlegt.",

      meaning:
        "je waarschijnlijk meer nadruk legt op duidelijkheid, onafhankelijkheid en inhoud dan op harmonie"
    }
  },


  "emotionele-gevoeligheid": {
    high: {
      strength:
        "Je merkt spanning, risico’s, onzekerheid en emotionele signalen waarschijnlijk snel en intens op.",

      development:
        "Bouw vaste herstelmomenten en strategieën in om piekeren, spanning en emotionele belasting tijdig te reguleren.",

      meaning:
        "je waarschijnlijk sterk reageert op druk, onzekerheid, conflicten en mogelijke negatieve gevolgen"
    },

    middle: {
      strength:
        "Je ervaart waarschijnlijk normale emotionele reacties zonder voortdurend door spanning of onrust te worden beheerst.",

      development:
        "Blijf tijdig aandacht geven aan signalen van oplopende druk en aan voldoende herstel.",

      meaning:
        "je doorgaans een werkbare balans hebt tussen emotionele alertheid en stabiliteit"
    },

    low: {
      strength:
        "Je blijft waarschijnlijk relatief kalm, stabiel en herstelgericht wanneer spanning of onzekerheid toeneemt.",

      development:
        "Let erop dat kalmte er niet toe leidt dat je eigen emoties of signalen van anderen te snel relativeert.",

      meaning:
        "je waarschijnlijk veel situaties met rust, vertrouwen en emotionele stabiliteit benadert"
    }
  }
};


function getBigFiveDimensionInterpretation(
  dimension
) {
  const profile =
    dimensionProfiles[
      dimension.id
    ];

  const band =
    getScoreBand(
      dimension.score
    );

  return profile[band];
}
/* =========================================================
   INTERPRETATIE VOOR ÉÉN FACETSCORE OPHALEN
========================================================= */

function getBigFiveFacetInterpretation(
  facet
) {
  const domainInterpretations =
    BIG_FIVE_FACET_INTERPRETATIONS[
      facet.domainCode
    ];

  const facetInterpretations =
    domainInterpretations?.[
      facet.facet
    ];

  if (!facetInterpretations) {
    return (
      "Voor dit facet is nog geen afzonderlijke " +
      "interpretatie beschikbaar."
    );
  }

  const scoreBand =
    getScoreBand(
      facet.score
    );

  return (
    facetInterpretations[
      scoreBand
    ] ||
    "Voor deze score is nog geen interpretatie beschikbaar."
  );
}
function calculateBigFiveResult({
  definition,
  session,
  testId
}) {
  if (!definition || !session) {
    return null;
  }


  /* -----------------------------------------------
     TOTALEN PER HOOFDDOMEIN
  ------------------------------------------------ */

  const dimensionTotals = {};

  definition.dimensions.forEach(
    dimension => {
      dimensionTotals[
        dimension.id
      ] = {
        sum: 0,
        count: 0
      };
    }
  );


  /* -----------------------------------------------
     TOTALEN PER FACET
  ------------------------------------------------ */

  const facetTotals = {};

  BIG_FIVE_DOMAIN_DEFINITIONS.forEach(
    domain => {
      for (
        let facet = 1;
        facet <= 6;
        facet += 1
      ) {
        const facetKey =
          `${domain.id}::${facet}`;

        facetTotals[
          facetKey
        ] = {
          sum: 0,
          count: 0
        };
      }
    }
  );


  /* -----------------------------------------------
     ALLE ANTWOORDEN VERWERKEN

     De opgeslagen antwoordwaarde is al de correcte
     plus- of minusscore uit choices.js.
  ------------------------------------------------ */

  for (
    const question
    of definition.questions
  ) {
    const scoredAnswer =
      session.answers[
        question.id
      ];

    if (
      typeof scoredAnswer !==
      "number"
    ) {
      return null;
    }

    dimensionTotals[
      question.dimension
    ].sum += scoredAnswer;

    dimensionTotals[
      question.dimension
    ].count += 1;

    const facetKey =
      `${question.dimension}::${question.facet}`;

    facetTotals[
      facetKey
    ].sum += scoredAnswer;

    facetTotals[
      facetKey
    ].count += 1;
  }


  /* -----------------------------------------------
     PERCENTAGE PER HOOFDDOMEIN
  ------------------------------------------------ */

  const dimensions =
    definition.dimensions.map(
      dimension => {
        const total =
          dimensionTotals[
            dimension.id
          ];

        return {
          id:
            dimension.id,

          label:
            dimension.label,

          code:
            dimension.code,

          score:
            calculateNormalizedPercentage(
              total.sum,
              total.count
            )
        };
      }
    );


  /* -----------------------------------------------
     PERCENTAGE PER FACET
  ------------------------------------------------ */

  const facets = [];

  BIG_FIVE_DOMAIN_DEFINITIONS.forEach(
    domain => {
      for (
        let facet = 1;
        facet <= 6;
        facet += 1
      ) {
        const facetKey =
          `${domain.id}::${facet}`;

        const total =
          facetTotals[
            facetKey
          ];

        facets.push({
          domainId:
            domain.id,

          domainLabel:
            domain.label,

          domainCode:
            domain.code,

          facet,

          label:
            BIG_FIVE_FACET_LABELS[
              domain.code
            ][facet],

          score:
            calculateNormalizedPercentage(
              total.sum,
              total.count
            )
        });
      }
    }
  );


  /* -----------------------------------------------
     MEEST UITGESPROKEN RESULTATEN

     Niet automatisch de hoogste score, maar de score
     die het verst van het middenpunt 50% ligt.
  ------------------------------------------------ */

  const pronouncedDimensions =
    [...dimensions].sort(
      (first, second) => {
        const firstDistance =
          Math.abs(
            first.score - 50
          );

        const secondDistance =
          Math.abs(
            second.score - 50
          );

        return (
          secondDistance -
          firstDistance
        );
      }
    );

  const primary =
    pronouncedDimensions[0];

  const secondary =
    pronouncedDimensions[1];

  const primaryInterpretation =
    getBigFiveDimensionInterpretation(
      primary
    );

  const secondaryInterpretation =
    getBigFiveDimensionInterpretation(
      secondary
    );

  const primaryBandLabel =
    getScoreBandLabel(
      primary.score
    );

  const secondaryBandLabel =
    getScoreBandLabel(
      secondary.score
    );


  return {
    testId,

    testTitle:
      definition.title,

    resultType:
      definition.resultType,

    mainScoreHeading:
      definition.mainScoreHeading,

    completedAt:
      new Date().toISOString(),

    mainScore:
      primary.score,

    mainLabel:
      `${primary.label} · ${primaryBandLabel}`,

    dimensions,

    facets,

    summary:
      `Je meest uitgesproken resultaat ligt bij ${primary.label.toLowerCase()} (${primaryBandLabel.toLowerCase()}, ${primary.score}%). Daarna volgt ${secondary.label.toLowerCase()} (${secondaryBandLabel.toLowerCase()}, ${secondary.score}%). De scores beschrijven persoonlijkheidstendensen en zijn geen beoordeling van goed of fout.`,

    strengths: [
      primaryInterpretation.strength,
      secondaryInterpretation.strength
    ],

    development: [
      primaryInterpretation.development,
      secondaryInterpretation.development
    ],

    meaning:
      `Je profiel wijst erop dat ${primaryInterpretation.meaning}. Daarnaast laat het resultaat zien dat ${secondaryInterpretation.meaning}.`,

    advice:
      `Gebruik je meest uitgesproken voorkeuren bewust als sterkte, maar controleer altijd of ze ook passen bij de concrete situatie. Kies één ontwikkelactie waarmee je meer flexibiliteit opbouwt in een domein dat sterk hoog of laag scoort.`
  };
}



/* Testspecificatie voor registratie door core/test-registry.js. */

const BIG_FIVE_TEST_DEFINITION = {
    id:
      "persoonlijkheid::Big Five-test",

    domainId:
      "persoonlijkheid",

    domainTitle:
      "Persoonlijkheid",

    title:
      "Big Five-test",

    description:
      "Deze uitgebreide test bevat 120 uitspraken en brengt vijf persoonlijkheidsdomeinen en dertig onderliggende facetten in kaart.",

    estimatedTime:
      "Ongeveer 15 tot 20 minuten",

    resultType:
      "faceted-dimensions",

    usesPersonalityAnswerBank:
      true,

    createSession({
      definition,
      startedAt,
      forceAll = false
    }) {
      return createAdaptivePersonalitySession({
        definition,
        startedAt,
        forceAll
      });
    },

    getQuestionPlan() {
      return getAdaptiveQuestionPlan(this);
    },

    mainScoreHeading:
      "Meest uitgesproken score",

    getChoices:
      getBigFiveQuestionChoices,

    calculateResult:
      calculateBigFiveResult,

    resultCardContent:
      BIG_FIVE_RESULT_CARD_CONTENT,

    facetConfig: {
      eyebrow:
        "Verdiepend profiel",

      title:
        "Bekijk je 30 facetscores",

      description:
        "Elk Big Five-domein bestaat uit zes onderliggende kenmerken. Deze facetscores geven meer detail over waar je domeinscore precies vandaan komt.",

      explanationTitle:
        "Hoe lees je deze scores?",

      explanation:
        "Een hogere score betekent dat het betreffende kenmerk sterker in je antwoorden naar voren komt. Een hoge of lage score is niet automatisch beter of slechter.",

      groupLabel:
        "Big Five-domein",

      domainDefinitions:
        BIG_FIVE_DOMAIN_DEFINITIONS,

      getBandLabel:
        getScoreBandLabel,

      getInterpretation:
        getBigFiveFacetInterpretation
    },

    evidence: {
      summary:
        "De Big Five-test in Unfold Yourself is gebaseerd op de IPIP-NEO-120. Dit is een uitgebreide zelfrapportagevragenlijst die vijf brede persoonlijkheidsdomeinen en dertig onderliggende facetten meet.",

      source:
        "Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. Journal of Research in Personality, 51, 78–89. De Nederlandstalige vragen volgen de Dutch Translation of the IPIP-NEO-120 van de International Personality Item Pool.",

      disclaimer:
        "Deze test ondersteunt zelfinzicht en persoonlijke ontwikkeling. Het resultaat is geen psychologische of medische diagnose en vormt op zichzelf geen bewijs van geschiktheid voor een functie. De getoonde percentages zijn omgerekende ruwe scores binnen deze vragenlijst en geen percentielen of vergelijking met een bevolkingsnorm."
    },

    dimensions:
      BIG_FIVE_DOMAIN_DEFINITIONS.map(
        domain => {
          return {
            id: domain.id,
            label: domain.label,
            code: domain.code
          };
        }
      ),

    questions:
      mappedBigFiveQuestions
};


window.UNFOLD_TEST_DEFINITIONS =
  Array.isArray(window.UNFOLD_TEST_DEFINITIONS)
    ? window.UNFOLD_TEST_DEFINITIONS
    : [];

window.UNFOLD_TEST_DEFINITIONS.push(
  BIG_FIVE_TEST_DEFINITION
);
