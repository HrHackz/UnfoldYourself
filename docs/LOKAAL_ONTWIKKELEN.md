# Lokaal ontwikkelen

## Vereisten

- een moderne desktopbrowser;
- een eenvoudige lokale HTTP-server;
- een teksteditor;
- Git voor versiebeheer.

Er is geen Node.js-, npm- of buildstap vereist.

## Project starten

Open een terminal in de projectmap:

```bash
python -m http.server 8080
```

Open:

```text
http://localhost:8080
```

Gebruik geen rechtstreekse `file://`-URL omdat serviceworkers een geldige HTTP(S)-context vereisen.

## Serviceworker tijdens ontwikkeling

De browser kan oude bestanden uit cache tonen. Bij een wijziging:

1. verhoog `CACHE_VERSION` wanneer een gecachet bestand verandert;
2. herlaad met `Ctrl + F5`;
3. sluit zo nodig alle app-tabbladen;
4. verwijder de oude serviceworker en cache via ontwikkelaarstools;
5. open de app opnieuw.

## Testdata behouden

Maak vóór ingrijpende opslagwijzigingen een JSON-back-up via de applicatie. Gebruik geen echte gevoelige antwoorden in openbare bugrapporten.

## Mappen

```text
core/                  Generieke logica
data/                  Testdata en broninformatie
tests/                 Testspecifieke functionaliteit
icons/                 Merk- en PWA-iconen
docs/                  Technische en procesdocumentatie
.github/               GitHub-templates en repositorybeleid
wiki/                  Klaargezette Wiki-pagina's
```

## Veelvoorkomende wijzigingstypes

### Alleen inhoud

Pas het relevante databestand en de interpretaties aan. Controleer scoring, rapport en bronvermelding.

### Visuele wijziging

Controleer desktop, mobiel, light, dark en print. Voeg geen tweede CSS-laag toe die dezelfde component opnieuw vormgeeft zonder de bestaande selectorstructuur te begrijpen.

### Printwijziging

Werk uitsluitend in `print.css`, tenzij de printmodusstatus zelf aangepast moet worden. Controleer individuele en totale rapporten vanuit zowel light als dark mode.

### Nieuwe test

Volg het modulecontract in `CONTRIBUTING.md` en de volledige testchecklist.
