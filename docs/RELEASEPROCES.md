# Releaseproces

## Versies

De gebruikersversie in de interface kan compact worden weergegeven, bijvoorbeeld `Versie 1.0`. GitHub-releases gebruiken bij voorkeur een semantische tag, bijvoorbeeld `v1.0.0`.

- patch: foutcorrectie zonder nieuw gebruikersconcept;
- minor: nieuwe compatibele functie of test;
- major: onverenigbare architectuur- of opslagwijziging.

## Stappen

### 1. Releasekandidaat vastzetten

- werk vanuit de actuele `main`;
- stop niet-gerelateerde wijzigingen;
- maak een volledige lokale kopie;
- bevestig welke bestanden onderdeel zijn van de release.

### 2. Technische controle

Voer [`TESTCHECKLIST.md`](TESTCHECKLIST.md) volledig uit.

Extra controle:

- JavaScript-syntax;
- CSS-parsing;
- JSON-validatie;
- lokale paden;
- serviceworkerbestanden;
- individuele en totale printoutput;
- offline herladen.

### 3. Versies bijwerken

Wanneer applicatiebestanden wijzigen:

- verhoog `CACHE_VERSION` in `service-worker.js`;
- pas de zichtbare productversie alleen aan bij een bewuste productrelease;
- werk `CHANGELOG.md` bij;
- werk relevante documentatie bij.

### 4. Commit en tag

Voorbeeld:

```bash
git add .
git commit -m "release: Unfold Yourself 1.0.0"
git tag -a v1.0.0 -m "Unfold Yourself 1.0.0"
git push origin main
git push origin v1.0.0
```

### 5. GitHub Release

Maak een release op basis van de tag met:

- heldere titel;
- samenvatting van toegevoegde functies;
- belangrijkste correcties;
- privacy- of opslagwijzigingen;
- bekende beperkingen;
- volledige project-ZIP als releasebestand.

Een klaar releasebericht staat in [`RELEASE_NOTES_1.0.0.md`](RELEASE_NOTES_1.0.0.md).

### 6. Deploymentcontrole

Na GitHub Pages-publicatie:

- open de live URL in een schoon browservenster;
- controleer dat de nieuwe serviceworker actief wordt;
- test één eenvoudige en één complexe test;
- open een individueel rapport;
- open het totaalrapport;
- test print/PDF;
- test offline openen.

### 7. Archief

Bewaar:

- de volledige release-ZIP;
- de documentatiepatch;
- de commit-hash;
- de tag;
- de releasedatum;
- een korte lijst met bekende beperkingen.
