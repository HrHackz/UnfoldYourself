"use strict";

/* Unfold Yourself — advies- en steunregels per identiteitsas. */

const IDENTITY_AXIS_ADVICE = {
  gender: {
    ally: "Controleer of genderverwachtingen impliciet bepalen wie spreekt, zorgtaken krijgt, leiding mag nemen of als ‘professioneel’ wordt gezien.",
    support: "Zoek omgevingen waar je naam, voornaamwoorden en expressie worden gerespecteerd; bij discriminatie op basis van gender kan het Instituut voor de gelijkheid van vrouwen en mannen relevant zijn.",
    supportSourceIds: ["igvm-help"]
  },
  ethnicity: {
    ally: "Let op naam-, taal- en cultuurgebonden aannames bij selectie, huisvesting, veiligheid en informele netwerken.",
    support: "Documenteer concrete behandeling en voorwaarden. Unia kan informatie geven over discriminatie op basis van afkomst, huidskleur, nationaliteit of vermeende etniciteit.",
    supportSourceIds: ["unia-help"]
  },
  socioeconomic: {
    ally: "Maak deelname niet afhankelijk van onbetaalde tijd, dure verplaatsingen, informele connecties of kosten die voor anderen onzichtbaar zijn.",
    support: "Breng vaste lasten, schulden, sociale rechten en beschikbare hulp stap voor stap in kaart; lokale sociale diensten of een CAW kunnen praktische ondersteuning bieden.",
    supportSourceIds: []
  },
  education: {
    ally: "Beoordeel aantoonbare competentie en leervermogen, niet alleen formele diploma’s of vertrouwde onderwijsroutes.",
    support: "Maak expliciet welke kennis en ervaring je hebt en onderzoek erkenning, EVC-procedures of brugtrajecten wanneer formele kwalificaties een drempel vormen.",
    supportSourceIds: []
  },
  age: {
    ally: "Vermijd aannames dat jong automatisch onervaren is of ouder automatisch minder flexibel, digitaal of leerbaar.",
    support: "Vraag om concrete criteria en feedback wanneer leeftijd als verborgen selectiegrond lijkt te werken; leeftijd is een beschermd criterium binnen de bevoegdheden van Unia.",
    supportSourceIds: ["unia-help"]
  },
  sexualOrientation: {
    ally: "Gebruik inclusieve taal, neem partner- en gezinsvormen niet aan en reageer op homofobe, bifobe of queerfobe opmerkingen.",
    support: "Kies bewust waar openheid veilig voelt. çavaria en aangesloten regenbooghuizen bieden informatie, netwerken en welzijnsondersteuning.",
    supportSourceIds: ["cavaria-help", "unia-help"]
  },
  disability: {
    ally: "Ontwerp toegankelijkheid vooraf in plaats van te wachten tot iemand individueel om een uitzondering moet vragen.",
    support: "Formuleer de functionele aanpassing die nodig is zonder meer medische informatie te delen dan noodzakelijk. VAPH en Unia kunnen relevante informatie bieden.",
    supportSourceIds: ["vaph-help", "unia-help"]
  },
  mentalNeuro: {
    ally: "Maak ruimte voor verschillende werkritmes, prikkelbehoeften, communicatiestijlen en herstel zonder competentie automatisch in twijfel te trekken.",
    support: "Zoek concrete aanpassingen die energie, prikkels en duidelijkheid verbeteren. Bespreek ondersteuning met een vertrouwde professional wanneer de belasting groot is.",
    supportSourceIds: []
  },
  religion: {
    ally: "Plan niet automatisch rond één religieuze kalender en behandel kleding, voeding en rituelen als legitieme diversiteit zolang veiligheid en rechten worden gerespecteerd.",
    support: "Leg concrete belemmeringen of ongelijke behandeling vast. Unia behandelt binnen zijn bevoegdheden discriminatie op basis van geloof of levensbeschouwing.",
    supportSourceIds: ["unia-help"]
  },
  citizenship: {
    ally: "Maak informatie over documenten, rechten en procedures helder en vermijd dat tijdelijke status wordt verward met minder competentie of betrokkenheid.",
    support: "Bewaar documenten en beslissingen zorgvuldig en vraag gespecialiseerd advies bij complexe verblijfsprocedures. Myria richt zich op de grondrechten van vreemdelingen.",
    supportSourceIds: ["myria-help"]
  },
  language: {
    ally: "Beoordeel inhoud los van accent en bied duidelijke taal, voorbereidingstijd, ondertiteling of tolken waar dat deelname mogelijk maakt.",
    support: "Vraag om schriftelijke bevestiging, extra tijd of taalondersteuning in complexe procedures. Een accent is geen maat voor intelligentie of deskundigheid.",
    supportSourceIds: ["unia-help"]
  },
  geography: {
    ally: "Bied hybride deelname, realistische reistijden en geen onnodige aanwezigheidseisen wanneer afstand geen inhoudelijke meerwaarde heeft.",
    support: "Bundel verplaatsingen, onderzoek lokale en digitale alternatieven en maak vervoerskosten of bereikbaarheid expliciet bij afspraken.",
    supportSourceIds: []
  },
  appearance: {
    ally: "Scheid professionele of sociale beoordeling van gewicht, lichaamsvorm, kledingstijl en schoonheidsnormen die niet functioneel relevant zijn.",
    support: "Benoem concreet gedrag en gevolgen wanneer uiterlijk als uitsluitingsgrond wordt gebruikt. Unia verzamelt en ontsluit equality data over fysieke kenmerken.",
    supportSourceIds: ["unia-help"]
  },
  digital: {
    ally: "Voorzie een menselijk of offline alternatief en test digitale processen op taal, toegankelijkheid, apparaatvereisten en foutgevoeligheid.",
    support: "Vraag om een alternatief kanaal, ondersteuning of extra tijd wanneer een digitaal proces niet toegankelijk is; noteer waar het proces precies vastloopt.",
    supportSourceIds: []
  }
};

function buildIdentityAxisAdvice(axisResults) {
  return axisResults.map(axis => {
    const advice = IDENTITY_AXIS_ADVICE[axis.id] || {};
    const mode = typeof axis.score === "number" && axis.score >= 65
      ? "ally"
      : typeof axis.score === "number" && axis.score <= 49
        ? "support"
        : "balanced";

    return {
      axisId: axis.id,
      mode,
      text: mode === "ally"
        ? advice.ally
        : mode === "support"
          ? advice.support
          : `${advice.ally || "Gebruik je toegang bewust."} ${advice.support || "Erken waar extra steun nodig is."}`,
      supportSourceIds: advice.supportSourceIds || []
    };
  });
}
