"use strict";

/*
  Unfold Yourself — 16 Persoonlijkheden-test

  Nederlandstalige vragenlijst met 70 vragen.
  De letters E/I, S/N, T/F en J/P blijven uitsluitend
  technische scorecodes en worden niet aan de gebruiker getoond.
*/

window.SIXTEEN_PERSONALITIES_QUESTIONS = [
  {
    "id": "sixteen-personalities-001",
    "number": 1,
    "text": "Op een feest of sociale bijeenkomst:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Praat je met veel mensen, ook met onbekenden.",
        "score": "E"
      },
      {
        "type": "B",
        "label": "Praat je vooral met een paar mensen die je al kent.",
        "score": "I"
      }
    ]
  },
  {
    "id": "sixteen-personalities-002",
    "number": 2,
    "text": "Ben je eerder:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Realistisch en concreet ingesteld.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Gericht op ideeën, mogelijkheden en veronderstellingen.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-003",
    "number": 3,
    "text": "Wat vind je erger?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Met je hoofd in de wolken lopen.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Vastzitten in een sleur.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-004",
    "number": 4,
    "text": "Wat maakt meer indruk op je?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Principes.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Emoties.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-005",
    "number": 5,
    "text": "Waar voel je je sterker toe aangetrokken?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Iets dat overtuigend en logisch onderbouwd is.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Iets dat je emotioneel raakt.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-006",
    "number": 6,
    "text": "Hoe werk je het liefst?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Met duidelijke deadlines.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Wanneer het op dat moment goed uitkomt.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-007",
    "number": 7,
    "text": "Hoe maak je doorgaans een keuze?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Vrij zorgvuldig en weloverwogen.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Eerder spontaan of impulsief.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-008",
    "number": 8,
    "text": "Op sociale bijeenkomsten:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Blijf je vaak langer en krijg je steeds meer energie.",
        "score": "E"
      },
      {
        "type": "B",
        "label": "Ga je eerder weg wanneer je energie afneemt.",
        "score": "I"
      }
    ]
  },
  {
    "id": "sixteen-personalities-009",
    "number": 9,
    "text": "Tot welke mensen voel je je meer aangetrokken?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Nuchtere en verstandige mensen.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Fantasierijke en vindingrijke mensen.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-010",
    "number": 10,
    "text": "Waar ben je meer in geïnteresseerd?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Wat werkelijk en concreet aanwezig is.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Wat mogelijk zou kunnen zijn.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-011",
    "number": 11,
    "text": "Wanneer je het gedrag van anderen beoordeelt, weegt voor jou zwaarder:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Regels en wetten.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "De omstandigheden waarin iemand zich bevindt.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-012",
    "number": 12,
    "text": "Wanneer je anderen benadert, ben je eerder:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Objectief en zakelijk.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Persoonlijk en betrokken.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-013",
    "number": 13,
    "text": "Ben je meestal:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Stipt.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Ontspannen met tijd.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-014",
    "number": 14,
    "text": "Wat stoort je meer?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Dat iets onafgemaakt blijft.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Dat iets al definitief vastligt of afgerond is.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-015",
    "number": 15,
    "text": "In je sociale kring:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Weet je meestal goed wat er bij anderen speelt.",
        "score": "E"
      },
      {
        "type": "B",
        "label": "Hoor je ontwikkelingen vaak pas later.",
        "score": "I"
      }
    ]
  },
  {
    "id": "sixteen-personalities-016",
    "number": 16,
    "text": "Wanneer je gewone, alledaagse dingen doet:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Doe je ze meestal op de gebruikelijke manier.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Doe je ze liever op je eigen manier.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-017",
    "number": 17,
    "text": "Schrijvers zouden volgens jou:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Rechtstreeks moeten zeggen wat ze bedoelen.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Meer gebruik mogen maken van beeldspraak en vergelijkingen.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-018",
    "number": 18,
    "text": "Wat spreekt je meer aan?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Een consequente en logische gedachtegang.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Harmonieuze menselijke relaties.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-019",
    "number": 19,
    "text": "Waar voel je je prettiger bij wanneer je een oordeel vormt?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Logische afwegingen.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Afwegingen op basis van waarden en gevoelens.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-020",
    "number": 20,
    "text": "Hoe heb je zaken het liefst?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Vastgelegd en beslist.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Open en nog niet definitief beslist.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-021",
    "number": 21,
    "text": "Hoe zou je jezelf eerder omschrijven?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Serieus en vastberaden.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Ontspannen en gemakkelijk in de omgang.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-022",
    "number": 22,
    "text": "Wanneer je iemand belt:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Vertrouw je erop dat het gesprek vanzelf zal lopen.",
        "score": "E"
      },
      {
        "type": "B",
        "label": "Denk je vooraf na over wat je wilt zeggen.",
        "score": "I"
      }
    ]
  },
  {
    "id": "sixteen-personalities-023",
    "number": 23,
    "text": "Feiten:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Spreken meestal voor zichzelf.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Krijgen betekenis doordat ze bredere principes illustreren.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-024",
    "number": 24,
    "text": "Mensen met grootse visies vind je:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Soms eerder irritant.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Eerder fascinerend.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-025",
    "number": 25,
    "text": "Ben je vaker:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Koelbloedig en nuchter.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Warm en meelevend.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-026",
    "number": 26,
    "text": "Wat vind je erger?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Onrechtvaardig zijn.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Genadeloos zijn.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-027",
    "number": 27,
    "text": "Hoe laat je gebeurtenissen meestal tot stand komen?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Door bewust te kiezen en zorgvuldig te plannen.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Spontaan, door toeval en wat zich aandient.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-028",
    "number": 28,
    "text": "Wat geeft je een beter gevoel?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Een aankoop daadwerkelijk afgerond hebben.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Nog vrij kunnen kiezen of je iets koopt.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-029",
    "number": 29,
    "text": "Wanneer je in gezelschap bent:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Begin je zelf een gesprek.",
        "score": "E"
      },
      {
        "type": "B",
        "label": "Wacht je tot iemand jou aanspreekt.",
        "score": "I"
      }
    ]
  },
  {
    "id": "sixteen-personalities-030",
    "number": 30,
    "text": "Gezond verstand:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Is meestal betrouwbaar en hoeft zelden in twijfel te worden getrokken.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Mag vaak kritisch in vraag worden gesteld.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-031",
    "number": 31,
    "text": "Wat doen kinderen volgens jou vaker te weinig?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Zich nuttig maken en praktisch bijdragen.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Hun fantasie en verbeelding gebruiken.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-032",
    "number": 32,
    "text": "Waar voel je je prettiger bij wanneer je beslissingen neemt?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Duidelijke maatstaven en criteria.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Gevoelens en persoonlijke waarden.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-033",
    "number": 33,
    "text": "Ben je eerder:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Standvastig dan zachtaardig.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Zachtaardig dan standvastig.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-034",
    "number": 34,
    "text": "Welke vaardigheid bewonder je meer?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Kunnen organiseren en methodisch werken.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Je kunnen aanpassen en roeien met de riemen die je hebt.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-035",
    "number": 35,
    "text": "Waar hecht je meer waarde aan?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Duidelijkheid en definitieve keuzes.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Openheid en ruimte om je mening of aanpak te veranderen.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-036",
    "number": 36,
    "text": "Wat doet nieuw en ongewoon contact met andere mensen meestal met je?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Het stimuleert je en geeft je energie.",
        "score": "E"
      },
      {
        "type": "B",
        "label": "Het vraagt veel van je beschikbare energie.",
        "score": "I"
      }
    ]
  },
  {
    "id": "sixteen-personalities-037",
    "number": 37,
    "text": "Ben je vaker:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Praktisch ingesteld.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Fantasierijk ingesteld.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-038",
    "number": 38,
    "text": "Wat merk je bij andere mensen eerder op?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Waar ze praktisch goed in zijn of van nut kunnen zijn.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Hoe zij naar de wereld en situaties kijken.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-039",
    "number": 39,
    "text": "Wat geeft je meer voldoening?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Een kwestie grondig bespreken.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Tot overeenstemming komen over een kwestie.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-040",
    "number": 40,
    "text": "Wat stuurt je meestal het sterkst?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Je verstand.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Je hart.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-041",
    "number": 41,
    "text": "Je voelt je prettiger bij werk dat:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Vooraf duidelijk is afgesproken en afgebakend.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Informeel en flexibel wordt ingevuld.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-042",
    "number": 42,
    "text": "Waar zoek je eerder naar?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Orde en structuur.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Wat zich toevallig aandient.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-043",
    "number": 43,
    "text": "Wat verkies je?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Veel vrienden met kortere contacten.",
        "score": "E"
      },
      {
        "type": "B",
        "label": "Een paar vrienden met langere en diepere contacten.",
        "score": "I"
      }
    ]
  },
  {
    "id": "sixteen-personalities-044",
    "number": 44,
    "text": "Waar ga je meer op af?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Concrete feiten.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Bredere principes en ideeën.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-045",
    "number": 45,
    "text": "Waar ben je meer in geïnteresseerd?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Productie en distributie.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Ontwerp en onderzoek.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-046",
    "number": 46,
    "text": "Welk compliment spreekt je meer aan?",
    "answerOptions": [
      {
        "type": "A",
        "label": "“Dat is een heel logisch denkend persoon.”",
        "score": "T"
      },
      {
        "type": "B",
        "label": "“Dat is een echte gevoelsmens.”",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-047",
    "number": 47,
    "text": "Welke eigenschap waardeer je meer in jezelf?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Dat je standvastig bent.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Dat je toegewijd bent.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-048",
    "number": 48,
    "text": "Wat verkies je vaker?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Een definitieve uitspraak die niet meer verandert.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Een voorlopige formulering die later nog kan veranderen.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-049",
    "number": 49,
    "text": "Wanneer voel je je comfortabeler?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Nadat een beslissing is genomen.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Voordat een beslissing definitief is genomen.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-050",
    "number": 50,
    "text": "Wanneer je met onbekenden praat:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Praat je gemakkelijk en vaak uitvoerig.",
        "score": "E"
      },
      {
        "type": "B",
        "label": "Vind je meestal weinig om over te praten.",
        "score": "I"
      }
    ]
  },
  {
    "id": "sixteen-personalities-051",
    "number": 51,
    "text": "Waar vertrouw je eerder op?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Je ervaring.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Je intuïtieve voorgevoel.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-052",
    "number": 52,
    "text": "Hoe zie je jezelf eerder?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Praktischer dan vindingrijk.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Vindingrijker dan praktisch.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-053",
    "number": 53,
    "text": "Wie verdient volgens jou eerder waardering?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Iemand die helder en logisch redeneert.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Iemand met sterke en oprechte gevoelens.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-054",
    "number": 54,
    "text": "Ben je eerder geneigd om:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Onpartijdig en rechtvaardig te oordelen.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Meelevend en begripvol te reageren.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-055",
    "number": 55,
    "text": "Wat heeft meestal je voorkeur?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Ervoor zorgen dat alles geregeld is.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "De dingen gewoon laten gebeuren.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-056",
    "number": 56,
    "text": "In relaties zouden de meeste zaken volgens jou:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Bewust besproken en opnieuw afgesproken moeten kunnen worden.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Spontaan mogen afhangen van toeval en omstandigheden.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-057",
    "number": 57,
    "text": "Wanneer de telefoon overgaat:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Probeer je hem als eerste op te nemen.",
        "score": "E"
      },
      {
        "type": "B",
        "label": "Hoop je dat iemand anders opneemt.",
        "score": "I"
      }
    ]
  },
  {
    "id": "sixteen-personalities-058",
    "number": 58,
    "text": "Welke eigenschap waardeer je meer in jezelf?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Een sterk gevoel voor de realiteit.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Een levendige verbeelding.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-059",
    "number": 59,
    "text": "Waar voel je je sterker toe aangetrokken?",
    "answerOptions": [
      {
        "type": "A",
        "label": "De basis en de hoofdzaak.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Onderliggende betekenissen en nuances.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-060",
    "number": 60,
    "text": "Wat lijkt je de grotere fout?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Te hartstochtelijk of emotioneel zijn.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Te objectief en afstandelijk zijn.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-061",
    "number": 61,
    "text": "Hoe zie je jezelf in de kern?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Nuchter en zakelijk.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Zachtaardig en meevoelend.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-062",
    "number": 62,
    "text": "Welke situatie spreekt je meer aan?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Een gestructureerde en geplande situatie.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Een ongestructureerde en ongeplande situatie.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-063",
    "number": 63,
    "text": "Ben je eerder iemand die:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Meer van routine en voorspelbaarheid houdt dan van grilligheid.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Meer spontaan en speels is dan routinegericht.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-064",
    "number": 64,
    "text": "Ben je eerder:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Gemakkelijk benaderbaar.",
        "score": "E"
      },
      {
        "type": "B",
        "label": "Enigszins gereserveerd.",
        "score": "I"
      }
    ]
  },
  {
    "id": "sixteen-personalities-065",
    "number": 65,
    "text": "Welke schrijfstijl verkies je?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Een meer letterlijke schrijfstijl.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Een meer beeldende en figuurlijke schrijfstijl.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-066",
    "number": 66,
    "text": "Wat vind je moeilijker?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Je met andere mensen identificeren en je in hun positie herkennen.",
        "score": "S"
      },
      {
        "type": "B",
        "label": "Zien hoe je de mogelijkheden of talenten van anderen kunt benutten.",
        "score": "N"
      }
    ]
  },
  {
    "id": "sixteen-personalities-067",
    "number": 67,
    "text": "Welke eigenschap zou je liever sterker ontwikkelen?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Helder en logisch kunnen redeneren.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Sterk medeleven en begrip kunnen tonen.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-068",
    "number": 68,
    "text": "Wat vind je de grotere tekortkoming?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Niet kritisch genoeg onderscheid maken.",
        "score": "T"
      },
      {
        "type": "B",
        "label": "Te kritisch zijn.",
        "score": "F"
      }
    ]
  },
  {
    "id": "sixteen-personalities-069",
    "number": 69,
    "text": "Wat verkies je?",
    "answerOptions": [
      {
        "type": "A",
        "label": "Een geplande gebeurtenis.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Een ongeplande gebeurtenis.",
        "score": "P"
      }
    ]
  },
  {
    "id": "sixteen-personalities-070",
    "number": 70,
    "text": "Ben je doorgaans eerder:",
    "answerOptions": [
      {
        "type": "A",
        "label": "Weloverwogen dan spontaan.",
        "score": "J"
      },
      {
        "type": "B",
        "label": "Spontaan dan weloverwogen.",
        "score": "P"
      }
    ]
  }
];
