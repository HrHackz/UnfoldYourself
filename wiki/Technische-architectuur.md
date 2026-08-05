# Technische architectuur

Unfold Yourself is een statische PWA met HTML, CSS en vanilla JavaScript.

## Kenmerken

- geen backend;
- geen buildstap;
- geen frameworkruntime;
- klassieke scripts met expliciete laadvolgorde;
- lokale browseropslag;
- serviceworker voor offline caching;
- aparte testdata en testengines;
- aparte printstylesheet.

## Hoofdstructuur

- `core/`: generieke applicatielogica;
- `tests/`: testspecifieke engines, scoring en rapportage;
- `data/`: vragen, interpretaties en bronnen;
- `print.css`: zwart-wit printweergave;
- `total-report.js`: geïntegreerde rapportage;
- `service-worker.js`: offline app-shell.

Voor wijzigingen moet de cacheversie omhoog wanneer een gecachet bestand verandert.
