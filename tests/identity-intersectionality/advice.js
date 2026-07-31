"use strict";

/* Korte awarenessboodschappen per as. */

const IDENTITY_AXIS_AWARENESS = {
  gender: {
    privilege: "Let erop dat genderverwachtingen niet bepalen wie spreekt, zorgtaken krijgt of leiding mag nemen.",
    barrier: "Terugkerende genderverwachtingen zijn niet automatisch een persoonlijk tekort; zoek omgevingen waar je identiteit wordt gerespecteerd."
  },
  sexualOrientation: {
    privilege: "Gebruik inclusieve taal en neem niet automatisch aan dat iedereen heteroseksueel is.",
    barrier: "Je hoeft niet overal even open te zijn; veiligheid en vertrouwen mogen mee bepalen wat je deelt."
  },
  skinColor: {
    privilege: "Sta stil bij voordelen van niet of weinig geracialiseerd worden in selectie, veiligheid en dienstverlening.",
    barrier: "Aannames op basis van huidskleur zijn een maatschappelijke barrière, geen weerspiegeling van jouw waarde of bekwaamheid."
  },
  ethnicity: {
    privilege: "Let op hoe namen, accenten en culturele gewoonten onbewust worden beoordeeld.",
    barrier: "Als buitenstaander behandeld worden kan structureel zijn; erken je ervaring en documenteer concrete situaties."
  },
  nationality: {
    privilege: "Volledig stemrecht en ruime mobiliteit zijn rechten die voor veel inwoners niet vanzelfsprekend zijn.",
    barrier: "Beperkingen door nationaliteit zijn formele drempels; controleer rechten en procedures via officiële kanalen."
  },
  socialClass: {
    privilege: "Maak kansen niet afhankelijk van onbetaalde tijd, dure deelname of informele connecties.",
    barrier: "Minder toegang tot opleiding, geld of netwerken zegt niets over talent; maak vaardigheden en ervaring zichtbaar."
  },
  culture: {
    privilege: "Wie makkelijk binnen dominante omgangsvormen past, hoeft minder energie te besteden aan aanpassen.",
    barrier: "Voortdurend aanpassen kan energie kosten; zoek ruimtes waar verschillende communicatiestijlen worden geaccepteerd."
  },
  religion: {
    privilege: "Plan niet automatisch rond één kalender of levensbeschouwing en laat ruimte voor andere praktijken.",
    barrier: "Een minderheidspositie kan extra uitleg vragen; ongelijke behandeling op basis van geloof is niet jouw verantwoordelijkheid."
  },
  health: {
    privilege: "Ontwerp toegankelijkheid vooraf in plaats van te wachten tot iemand om een uitzondering vraagt.",
    barrier: "Veel drempels ontstaan door ontoegankelijke omgevingen; vraag om concrete, redelijke aanpassingen."
  },
  age: {
    privilege: "Vermijd aannames dat jong onervaren of ouder minder flexibel, leerbaar of digitaal vaardig is.",
    barrier: "Leeftijdsbeelden kunnen kansen beperken; vraag om concrete criteria en feedback."
  },
  residence: {
    privilege: "Zeker verblijfsrecht is een onzichtbaar voordeel bij wonen, werken en plannen op lange termijn.",
    barrier: "Bewaar documenten en beslissingen zorgvuldig en zoek gespecialiseerd advies bij onzekerheid."
  },
  wealth: {
    privilege: "Een financiële buffer maakt risico nemen en tegenslag opvangen makkelijker; houd rekening met verborgen kosten voor anderen.",
    barrier: "Financiële kwetsbaarheid beperkt keuzes; onderzoek sociale rechten en praktische steun zonder jezelf de schuld te geven."
  },
  geopolitics: {
    privilege: "Herkomst uit een machtige of positief bekeken regio kan deuren openen zonder dat dit zichtbaar is.",
    barrier: "Negatieve beeldvorming over een regio is geen beoordeling van jou als persoon."
  },
  socialChange: {
    privilege: "Gebruik toegang tot opleiding, tijd en technologie om verandering ook voor anderen toegankelijker te maken.",
    barrier: "Aanpassingsmogelijkheden zijn ongelijk verdeeld; zoek haalbare steun, opleiding en alternatieve toegang."
  }
};

function getIdentityAxisAwareness(axisResult) {
  const content = IDENTITY_AXIS_AWARENESS[axisResult.id] || {};
  return axisResult.score >= 60
    ? content.privilege || "Gebruik je toegang bewust."
    : content.barrier || "Erken waar extra steun nodig is.";
}
