"use strict";

/*
  Unfold Yourself — expliciete kruispuntregels.
  Geen generatieve conclusies en geen optelling tot een totaalscore.
*/

const IDENTITY_INTERSECTION_RULES = [
  {
    ids: ["gender", "ethnicity"],
    title: "Gender en racialisering",
    explanation: "Genderverwachtingen en racialisering kunnen elkaar versterken in zichtbaarheid, stereotypering, veiligheid en professionele beoordeling."
  },
  {
    ids: ["gender", "sexualOrientation"],
    title: "Gender en seksuele oriëntatie",
    explanation: "Gendernormen en heteronormativiteit kunnen samen bepalen hoe veilig openheid, relaties en zelfexpressie voelen."
  },
  {
    ids: ["ethnicity", "religion"],
    title: "Afkomst en levensbeschouwing",
    explanation: "Naam, uiterlijk, kleding en veronderstelde religie kunnen door anderen als één geheel worden gelezen, ook wanneer die aannames niet kloppen."
  },
  {
    ids: ["ethnicity", "language"],
    title: "Afkomst en taal",
    explanation: "Accent, naam en geracialiseerde verwachtingen kunnen samen beïnvloeden hoe deskundigheid, betrouwbaarheid of ‘erbij horen’ worden beoordeeld."
  },
  {
    ids: ["citizenship", "language"],
    title: "Verblijfsstatus en taal",
    explanation: "Administratieve afhankelijkheid en taalcomplexiteit kunnen elkaar versterken bij werk, huisvesting, zorg en overheidsprocedures."
  },
  {
    ids: ["socioeconomic", "education"],
    title: "Socio-economische positie en onderwijs",
    explanation: "Financiële ruimte beïnvloedt toegang tot opleiding, terwijl diploma’s en netwerken later opnieuw economische kansen beïnvloeden."
  },
  {
    ids: ["socioeconomic", "geography"],
    title: "Inkomen en woonomgeving",
    explanation: "Beperkte middelen en een slecht bereikbare woonomgeving kunnen samen de kosten van vervoer, zorg, studie en werk vergroten."
  },
  {
    ids: ["disability", "geography"],
    title: "Toegankelijkheid en woonomgeving",
    explanation: "Een beperking wordt zwaarder wanneer aangepast vervoer, zorg, hulpmiddelen of toegankelijke voorzieningen ver weg zijn."
  },
  {
    ids: ["disability", "digital"],
    title: "Toegankelijkheid en digitalisering",
    explanation: "Digitale diensten kunnen drempels verminderen, maar ontoegankelijke interfaces of verplichte online procedures kunnen nieuwe barrières creëren."
  },
  {
    ids: ["mentalNeuro", "socioeconomic"],
    title: "Psychische of neurodivergente kwetsbaarheid en financiële ruimte",
    explanation: "Kosten, wachttijden, werkonzekerheid en energiebeperkingen kunnen elkaar versterken wanneer passende ondersteuning niet snel beschikbaar is."
  },
  {
    ids: ["age", "digital"],
    title: "Leeftijd en digitale toegang",
    explanation: "Digitale verwachtingen verschillen per generatie, maar individuele vaardigheden lopen sterk uiteen; leeftijd mag daarom niet als automatische competentiemaat worden gebruikt."
  },
  {
    ids: ["appearance", "gender"],
    title: "Uiterlijk en gendernormen",
    explanation: "Lichaams- en schoonheidsnormen worden vaak anders toegepast naargelang gender, leeftijd, sector en sociale omgeving."
  }
];

function detectIdentityIntersections(axisResults) {
  const byId = Object.fromEntries(
    axisResults.map(axis => [axis.id, axis])
  );

  const results = [];

  IDENTITY_INTERSECTION_RULES.forEach(rule => {
    const axes = rule.ids.map(id => byId[id]).filter(Boolean);

    if (axes.length !== rule.ids.length) {
      return;
    }

    const numericScores = axes
      .map(axis => axis.score)
      .filter(score => typeof score === "number");

    if (numericScores.length !== axes.length) {
      return;
    }

    const lowest = Math.min(...numericScores);
    const average = Math.round(
      numericScores.reduce((sum, score) => sum + score, 0) /
      numericScores.length
    );

    const relevant = lowest <= 49 || average <= 57;

    if (!relevant) {
      return;
    }

    results.push({
      id: rule.ids.join("--"),
      title: rule.title,
      explanation: rule.explanation,
      axisIds: rule.ids,
      averageScore: average,
      priority: lowest <= 34 ? 1 : 2
    });
  });

  return results
    .sort((first, second) => {
      return first.priority - second.priority || first.averageScore - second.averageScore;
    })
    .slice(0, 5);
}
