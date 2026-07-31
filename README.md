# Unfold Yourself

Statische Nederlandstalige PWA voor zelftests en een lokaal persoonlijk profiel.

## Structuur

- `app.js`: initialisatie, DOM-koppelingen, events en serviceworkerregistratie.
- `core/`: opslag, testregister, algemene testworkflow, profiel-UI, resultaten, afdruklogica en de gedeelde persoonlijkheidsantwoordbank.
- `tests/`: afzonderlijke modules voor Big Five, IPIP-HEXACO, 16 Persoonlijkheden en DISC/IPIP-IPC.
- losse `*-questions.js`, `*-choices.js`, `*-results.js` en mappingbestanden: uitsluitend testdata.

De Big Five en IPIP-HEXACO delen uitsluitend antwoorden op bronidentieke IPIP-items. Hun scoreberekening, domeinen, facetten en rapportage blijven afzonderlijk.

De applicatie gebruikt klassieke scripts met `defer`, relatieve paden en een expliciete laadvolgorde in `index.html`. Er is geen buildstap nodig.
