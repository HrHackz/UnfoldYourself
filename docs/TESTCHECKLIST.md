# Testchecklist vóór publicatie

Deze checklist moet worden uitgevoerd voor iedere wijziging die gebruikers kan raken.

## 1. Basis

- [ ] `index.html` opent zonder consolefouten.
- [ ] Alle lokale scripts en styles laden met status 200.
- [ ] Het manifest is geldige JSON.
- [ ] Alle paden in de serviceworker bestaan.
- [ ] De cacheversie is verhoogd wanneer nodig.

## 2. Navigatie

- [ ] Startpagina en alle zeven profielgebieden zijn bereikbaar.
- [ ] Iedere betrokken test opent correct.
- [ ] Terugnavigatie behoudt de juiste toestand.
- [ ] De totaalrapportselector staat alleen waar bedoeld.

## 3. Testworkflow

- [ ] Nieuwe test starten.
- [ ] Antwoord selecteren en naar volgende vraag gaan.
- [ ] Vorige vraag controleren wanneer beschikbaar.
- [ ] Pagina herladen en sessie hervatten.
- [ ] Test voltooien.
- [ ] Resultaat opnieuw openen.
- [ ] Test opnieuw uitvoeren of resetten volgens ontwerp.

## 4. Rapportage

- [ ] Titel, score en interpretatie kloppen.
- [ ] Geen `undefined`, `NaN`, lege labels of technische ID's zichtbaar.
- [ ] Voortgangsbalken komen slechts één keer voor.
- [ ] Uitlegknoppen hebben één kader en correct gecentreerde inhoud.
- [ ] Geopende uitleg bevat geen ongewenst kader-in-kader.
- [ ] Profielgebiedaccenten zijn correct.
- [ ] Totaalrapport verwerkt beschikbare resultaten correct.

## 5. Thema's en responsive gedrag

- [ ] Light mode desktop.
- [ ] Dark mode desktop.
- [ ] Light mode mobiel.
- [ ] Dark mode mobiel.
- [ ] Lange titels breken zonder overlap.
- [ ] Knoppen blijven volledig zichtbaar en bedienbaar.
- [ ] Focusindicatoren zijn zichtbaar.

## 6. Print en PDF

### Individueel rapport

- [ ] Print vanuit light mode.
- [ ] Print vanuit dark mode.
- [ ] Pagina en alle kaarten zijn wit.
- [ ] Tekst is zwart.
- [ ] Geen navigatie-, terug-, thema- of actieknoppen.
- [ ] Geen knop “Ga naar de inhoud”.
- [ ] Geen blanco eerste of enige pagina.

### Totaalrapport

- [ ] Compact rapport vanuit light en dark.
- [ ] Volledig rapport vanuit light en dark.
- [ ] Uitgebreid rapport vanuit light en dark.
- [ ] Alleen het actieve rapport wordt afgedrukt.
- [ ] Geen donkere of gekleurde achtergrondvlakken.

## 7. Opslag en back-up

- [ ] Voortgang blijft bewaard na herladen.
- [ ] Back-upbestand downloadt als geldige JSON.
- [ ] Herstel toont aantallen en bevestiging.
- [ ] Herstel vervangt de huidige staat correct.
- [ ] Ongeldig bestand wordt geweigerd.
- [ ] Reset verwijdert uitsluitend bedoelde lokale gegevens.

## 8. Offline

- [ ] Eerste online laadbeurt voltooit.
- [ ] Serviceworker activeert zonder fouten.
- [ ] App opent opnieuw zonder netwerk.
- [ ] Betrokken testdata is offline beschikbaar.
- [ ] Nieuwe release vervangt de oude cache.

## 9. Publicatie

- [ ] `CHANGELOG.md` bijgewerkt.
- [ ] Documentatie bijgewerkt.
- [ ] Versienummer/tag bepaald.
- [ ] Definitieve ZIP lokaal bewaard.
- [ ] GitHub Pages na deployment gecontroleerd.
