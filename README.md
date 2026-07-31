# Unfold Yourself

Statische Nederlandstalige PWA voor zelftests en een lokaal persoonlijk profiel.

## Structuur

- `app.js`: initialisatie, DOM-koppelingen, events en serviceworkerregistratie.
- `core/`: opslag, register, algemene testworkflow, profiel-UI, resultaten en afdruklogica.
- `tests/`: afzonderlijke modules voor Big Five, 16 Persoonlijkheden en DISC/IPIP-IPC.
- losse `*-questions.js`, `*-choices.js` en `*-results.js`: uitsluitend testdata.

De applicatie gebruikt klassieke scripts met `defer`, relatieve paden en een expliciete laadvolgorde in `index.html`. Er is geen buildstap nodig.
