# Privacyverklaring — Unfold Yourself

**Versie:** 1.0  
**Datum:** 5 augustus 2026

## Kernprincipe

Unfold Yourself is ontworpen als een lokale browserapplicatie. Antwoorden, voortgang en resultaten worden standaard op het gebruikte apparaat in de browser opgeslagen en niet naar een eigen applicatieserver verzonden.

## Welke gegevens lokaal kunnen worden opgeslagen

Afhankelijk van de gebruikte testen kan de lokale profielstatus bevatten:

- beantwoorde testvragen;
- actieve en voltooide testen;
- tussentijdse voortgang;
- berekende testresultaten;
- gegevens voor geïntegreerde totaalrapporten;
- een lokale antwoordenbank voor bronidentieke items;
- de gekozen light- of dark-modus.

Sommige testen kunnen gevoelige informatie bevatten, bijvoorbeeld over identiteit, maatschappelijke positie, welzijn of persoonlijke voorkeuren.

## Opslaglocatie

De profielstatus wordt opgeslagen via browser-`localStorage`, hoofdzakelijk onder:

```text
unfold-yourself-profile-v1
```

De themakeuze gebruikt een afzonderlijke lokale instelling.

## Back-ups

De gebruiker kan zelf een JSON-back-up downloaden. Dat bestand staat buiten de browser en valt vanaf dat moment onder de verantwoordelijkheid van de gebruiker.

Bewaar een back-up niet op een gedeelde of publiek toegankelijke locatie. Een herstelde back-up vervangt de huidige lokale profielstatus na bevestiging.

## Offline caching

De serviceworker bewaart statische applicatiebestanden lokaal zodat de app na de eerste volledige laadbeurt offline kan functioneren. Deze cache bevat applicatiecode, styles, iconen en testdata; de persoonlijke profielstatus wordt afzonderlijk in `localStorage` bewaard.

## Geen account of eigen backend

De applicatie bevat geen:

- gebruikersaccount;
- login;
- eigen serverdatabase;
- centraal gebruikersprofiel;
- ingebouwde advertentietracking;
- ingebouwde analysetracking.

De hostingprovider en browser kunnen onafhankelijk hun eigen technische logs of beleidsregels hanteren. Die vallen buiten de lokale applicatielogica van Unfold Yourself.

## Gegevens verwijderen

Lokale gegevens kunnen worden verwijderd via de resetfunctie van de applicatie of door de sitegegevens van de browser te wissen. Maak vooraf een back-up wanneer resultaten behouden moeten blijven.

## Gedeeld apparaat

Gebruik bij voorkeur geen gedeeld of openbaar apparaat voor gevoelige antwoorden. Wie toegang heeft tot hetzelfde browserprofiel kan mogelijk de lokaal opgeslagen resultaten bekijken.

## Wijzigingen

Bij wijzigingen aan de gegevensverwerking wordt deze verklaring bijgewerkt en opgenomen in het changelog.
