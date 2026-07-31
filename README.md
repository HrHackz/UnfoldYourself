# Unfold Yourself

Statische Nederlandstalige PWA voor zelftests en een lokaal persoonlijk profiel.

## Structuur

- `app.js`: uitsluitend initialisatie, DOM-koppelingen, events en serviceworkerregistratie.
- `core/`: opslag, generieke testworkflow, profiel-UI, resultaatweergave, afdruklogica en testregistratie.
- `tests/`: één afzonderlijke engine per beschikbare test.
- losse `*-questions.js`, `*-choices.js`, `*-results.js` en mappingbestanden: uitsluitend testdata.

## Modulair testcontract

Iedere testmodule bevat één testdefinitie met vragen, antwoordkeuzes, scorefunctie, rapportconfiguratie en optionele testspecifieke resultaatweergave. De module registreert zichzelf via `window.UNFOLD_TEST_DEFINITIONS`. Daardoor hoeft `core/test-registry.js` bij een nieuwe test niet meer te worden aangepast.

Voor een volgende test zijn normaal alleen nodig:

1. één of meer databestanden;
2. één enginebestand in `tests/`;
3. een catalogusregel in `core/app-config.js`;
4. scripts in `index.html`;
5. paden en een hogere cacheversie in `service-worker.js`.

De Big Five en IPIP-HEXACO delen uitsluitend antwoorden op bronidentieke IPIP-items. Hun scoreberekening, domeinen, facetten en rapportage blijven afzonderlijk.

De applicatie gebruikt klassieke scripts met `defer`, relatieve paden en een expliciete laadvolgorde. Er is geen buildstap nodig.
