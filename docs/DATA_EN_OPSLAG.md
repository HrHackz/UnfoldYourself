# Data en lokale opslag

## Profielstatus

De applicatie gebruikt browser-`localStorage` voor:

- voltooide testen;
- testen in uitvoering;
- antwoorden en sessiestatus;
- resultaten;
- gedeelde antwoordenbank voor bronidentieke items.

Hoofdsleutel:

```text
unfold-yourself-profile-v1
```

Historische sleutel:

```text
unfold-yourself-big-five-v1
```

De historische sleutel wordt alleen gebruikt voor migratie en kan na succesvolle opslag onder de actuele sleutel worden verwijderd.

## Back-upformaat

Een back-up is JSON met:

```json
{
  "backupFormat": "unfold-yourself-backup",
  "backupVersion": 1,
  "application": "Unfold Yourself",
  "exportedAt": "ISO-8601 datum",
  "storageKey": "unfold-yourself-profile-v1",
  "data": {
    "completedTests": [],
    "activeTests": {},
    "results": {},
    "responseBank": {}
  }
}
```

Bij import controleert de applicatie:

- of het bestand geldige JSON bevat;
- of het juiste back-upformaat aanwezig is;
- of de back-upversie wordt ondersteund;
- of de hoofdvelden het juiste type hebben;
- of het bestand niet groter is dan de ingestelde limiet;
- of de gebruiker vervanging bevestigt.

## Vertrouwelijkheid

Back-upbestanden kunnen gevoelige gegevens bevatten. Zij mogen niet in GitHub-issues, screenshots, commits of openbare cloudmappen worden geplaatst.

## Verwijdering

Het wissen van browsercookies verwijdert niet in iedere browser automatisch alle lokale opslag, maar het wissen van sitegegevens doorgaans wel. De applicatiereset verwijdert de eigen profielstatus. Maak eerst een back-up wanneer behoud gewenst is.

## Ontwikkelaarsregel

Wijzig de storage key, test-ID's of resultaatstructuur niet zonder:

1. expliciete versieanalyse;
2. migratiecode;
3. hersteltest met bestaande back-ups;
4. changelogvermelding;
5. terugvalgedrag bij ongeldige data.
