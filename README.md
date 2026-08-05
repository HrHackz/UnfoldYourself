# Unfold Yourself

**Unfold Yourself** is een Nederlandstalige, modulaire Progressive Web App voor zelfreflectie over persoonlijkheid, identiteit, werkoriëntatie, redeneervermogen, digitale vaardigheden, samenwerking, leiderschap, cultuur en werkbeleving.

De applicatie werkt zonder account of backend. Antwoorden, voortgang en resultaten worden lokaal in de browser opgeslagen. Na de eerste volledige laadbeurt kan de app via de geïnstalleerde serviceworker ook offline gebruikt worden.

**Live applicatie:** https://hrhackz.github.io/UnfoldYourself/

## Release

- Publieke productversie: **1.0**
- Releasetag: **v1.0.0**
- Releasedatum: **5 augustus 2026**
- Taal en context: **Nederlands (België)**

## Belangrijkste functies

- 14 afzonderlijke testen binnen 7 profielgebieden;
- voortgang lokaal bewaren en later hervatten;
- afzonderlijke resultatenrapporten per test;
- geïntegreerde totaalrapporten in drie detailniveaus;
- print- en PDF-weergave met witte achtergrond en zwarte tekst;
- light en dark mode voor de schermweergave;
- lokale JSON-back-up en herstel;
- installatie als PWA;
- offline app-shell en lokale testdata;
- responsive gebruik op desktop en mobiel;
- geen account, database, serverprofiel of externe analysetracking.

## Profielgebieden en testen

| Profielgebied | Testen |
|---|---|
| Persoonlijkheid & zelfbeeld | Big Five, HEXACO, 16 Persoonlijkheden, DISC, Zelfbeeld/waarden/drijfveren |
| Identiteit & maatschappelijke positie | Deelidentiteiten- en kruispuntdenkentest |
| Werkoriëntatie & beroepsrichting | Interesse- en beroepsrichting, Werkwaarden en werkmotivatie |
| Denken & redeneervermogen | Cognitieve vaardigheidsbatterij |
| Digitale vaardigheden | Digitale skills |
| Samenwerking, leiderschap & cultuur | Leiderschap, Teamrollen en samenwerking, Werkomgeving en cultuur |
| Werkbeleving, welzijn & balans | Werkbeleving en welzijn |

Een uitgebreider overzicht staat in [`docs/TESTCATALOGUS.md`](docs/TESTCATALOGUS.md).

## Privacy en lokale opslag

De applicatie bewaart profielgegevens standaard uitsluitend in `localStorage` van de gebruikte browser. De hoofdopslagsleutel is:

```text
unfold-yourself-profile-v1
```

Een gebruiker kan zelf een JSON-back-up downloaden en later opnieuw importeren. De applicatie voert geen inhoud uit een geïmporteerd back-upbestand uit en controleert het formaat en de bestandsgrootte voor herstel.

Lees [`PRIVACY.md`](PRIVACY.md) en [`docs/DATA_EN_OPSLAG.md`](docs/DATA_EN_OPSLAG.md) voor de volledige uitleg.

## Gebruik en beperkingen

Unfold Yourself is bedoeld voor zelfreflectie en persoonlijke oriëntatie. De uitkomsten zijn geen medische diagnose, klinische beoordeling, formeel geschiktheidsonderzoek of zelfstandig selectie-instrument. Resultaten moeten altijd in hun context worden geïnterpreteerd.

Zie [`DISCLAIMER.md`](DISCLAIMER.md).

## Technische architectuur

De applicatie gebruikt:

- statische HTML;
- CSS;
- vanilla JavaScript;
- klassieke scripts met expliciete laadvolgorde;
- een serviceworker voor offline gebruik;
- een webmanifest voor PWA-installatie;
- lokale browseropslag;
- geen framework, pakketbeheerder, buildproces of backend.

Belangrijke onderdelen:

```text
index.html                 Hoofdinterface en scriptvolgorde
app.js                     Initialisatie en globale events
core/                      Generieke applicatie- en rapportlogica
tests/                     Testspecifieke engines en renderers
data/                      Testvragen, interpretaties en brongegevens
styles.css                 Algemene schermopmaak
theme.css                  Light/dark en profielaccenten
print.css                  Uitsluitend print- en PDF-opmaak
total-report.js            Geïntegreerde totaalrapporten
service-worker.js          Offline caching
manifest.webmanifest       PWA-configuratie
```

Lees [`docs/ARCHITECTUUR.md`](docs/ARCHITECTUUR.md) voor de volledige structuur.

## Lokaal uitvoeren

Omdat de applicatie een serviceworker gebruikt, moet zij via HTTP worden geopend en niet rechtstreeks via `file://`.

Met Python:

```bash
python -m http.server 8080
```

Open daarna:

```text
http://localhost:8080
```

Andere eenvoudige lokale webservers zijn eveneens geschikt. Er is geen installatie- of buildstap nodig.

Lees [`docs/LOKAAL_ONTWIKKELEN.md`](docs/LOKAAL_ONTWIKKELEN.md).

## Wijzigingen en bijdragen

Lees vóór een wijziging:

- [`CONTRIBUTING.md`](CONTRIBUTING.md)
- [`docs/TESTCHECKLIST.md`](docs/TESTCHECKLIST.md)
- [`docs/RELEASEPROCES.md`](docs/RELEASEPROCES.md)
- [`UNFOLD_YOURSELF_DESIGN_SYSTEM.md`](UNFOLD_YOURSELF_DESIGN_SYSTEM.md)

Belangrijke projectregels:

1. Bestaande test-ID's en opslagstructuren niet wijzigen zonder migratieplan.
2. Nieuwe testinhoud strikt binnen het eigen meetgebied houden.
3. Klassieke scripts en expliciete laadvolgorde behouden.
4. Cacheversie verhogen wanneer gecachete applicatiebestanden wijzigen.
5. Zowel light, dark, mobiel, print/PDF als offline gedrag controleren.
6. Geen gevoelige gegevens, tokens of privé-informatie committen.

## Problemen melden

Gebruik de GitHub-issuetemplates voor:

- reproduceerbare bugs;
- inhoudelijke fouten;
- toegankelijkheidsproblemen;
- gerichte wijzigingsvoorstellen.

Meld beveiligingsproblemen niet openbaar. Volg [`SECURITY.md`](SECURITY.md).

## Documentatie

| Document | Onderwerp |
|---|---|
| [`CHANGELOG.md`](CHANGELOG.md) | Releasegeschiedenis |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Bijdrage- en wijzigingsproces |
| [`SECURITY.md`](SECURITY.md) | Beveiligingsmeldingen |
| [`PRIVACY.md`](PRIVACY.md) | Privacy en lokale gegevensverwerking |
| [`DISCLAIMER.md`](DISCLAIMER.md) | Gebruik, interpretatie en beperkingen |
| [`SUPPORT.md`](SUPPORT.md) | Ondersteuning en probleemoplossing |
| [`docs/ARCHITECTUUR.md`](docs/ARCHITECTUUR.md) | Technische architectuur |
| [`docs/TESTCATALOGUS.md`](docs/TESTCATALOGUS.md) | Overzicht van alle testen |
| [`docs/TESTCHECKLIST.md`](docs/TESTCHECKLIST.md) | Verplichte controles vóór publicatie |
| [`docs/RELEASEPROCES.md`](docs/RELEASEPROCES.md) | Releaseprocedure |
| [`docs/REPOSITORY_INSTELLINGEN.md`](docs/REPOSITORY_INSTELLINGEN.md) | Aanbevolen GitHub-instellingen |
| [`wiki/`](wiki/) | Klaargezette GitHub Wiki-pagina's |

## Auteursrecht en licentie

Deze repository bevat **geen open-sourcelicentie**. Er wordt geen algemene toestemming verleend om de broncode, testinhoud, rapportteksten, vormgeving of datasets te kopiëren, wijzigen, verspreiden of commercieel te gebruiken.

Zie [`COPYRIGHT.md`](COPYRIGHT.md) en [`docs/LICENTIEKEUZE.md`](docs/LICENTIEKEUZE.md).
