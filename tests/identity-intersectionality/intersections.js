"use strict";

/* Korte, vooraf vastgelegde kruispunten voor de Belgische context. */

const IDENTITY_INTERSECTION_RULES = [
  {
    ids: ["skinColor", "ethnicity"],
    title: "Huidskleur en herkomst",
    text: "Zichtbare racialisering en herkomst kunnen elkaar versterken in hoe anderen je lezen en behandelen."
  },
  {
    ids: ["nationality", "residence"],
    title: "Nationaliteit en verblijfsstatuut",
    text: "Formele rechten, mobiliteit en verblijfszekerheid hangen vaak nauw samen."
  },
  {
    ids: ["socialClass", "wealth"],
    title: "Klasse en bezit",
    text: "Opleiding, familiale startpositie, netwerken en financiële buffers kunnen kansen opstapelen."
  },
  {
    ids: ["gender", "sexualOrientation"],
    title: "Gender en seksuele oriëntatie",
    text: "Gendernormen en heteronormativiteit kunnen samen bepalen hoeveel ruimte en veiligheid iemand ervaart."
  },
  {
    ids: ["health", "wealth"],
    title: "Gezondheid en financiële zekerheid",
    text: "Gezondheidsdrempels wegen vaak zwaarder wanneer hulp, aanpassingen of inkomensverlies moeilijk op te vangen zijn."
  },
  {
    ids: ["age", "socialChange"],
    title: "Leeftijd en maatschappelijke verandering",
    text: "Veranderingen kunnen kansen openen, maar ook extra druk geven wanneer opleiding, technologie of steun minder bereikbaar zijn."
  },
  {
    ids: ["religion", "culture"],
    title: "Levensbeschouwing en cultuur",
    text: "Zichtbare overtuigingen en afwijkende routines kunnen de nood om zich aan te passen vergroten."
  },
  {
    ids: ["geopolitics", "ethnicity"],
    title: "Geopolitieke herkomst en etniciteit",
    text: "Beeldvorming over een regio kan doorwerken in hoe afkomst, naam en cultuur worden beoordeeld."
  }
];

function detectIdentityIntersections(axisResults) {
  const byId = Object.fromEntries(axisResults.map(axis => [axis.id, axis]));

  return IDENTITY_INTERSECTION_RULES
    .map(rule => {
      const axes = rule.ids.map(id => byId[id]).filter(Boolean);
      if (axes.length !== rule.ids.length || axes.some(axis => typeof axis.score !== "number")) {
        return null;
      }

      const lowest = Math.min(...axes.map(axis => axis.score));
      const average = Math.round(axes.reduce((sum, axis) => sum + axis.score, 0) / axes.length);

      if (lowest > 39 && average > 49) {
        return null;
      }

      return {
        id: rule.ids.join("--"),
        title: rule.title,
        explanation: rule.text,
        axisIds: rule.ids,
        averageScore: average,
        priority: lowest <= 19 ? 1 : lowest <= 39 ? 2 : 3
      };
    })
    .filter(Boolean)
    .sort((first, second) => first.priority - second.priority || first.averageScore - second.averageScore)
    .slice(0, 3);
}
