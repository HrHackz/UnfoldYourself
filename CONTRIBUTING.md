# Bijdragen aan Unfold Yourself

Bedankt voor je belangstelling. Unfold Yourself is een inhoudelijk en technisch samenhangend product. Wijzigingen moeten daarom gericht, controleerbaar en compatibel blijven met de bestaande PWA, lokale opslag en rapportstructuur.

## Eerst een issue openen

Open vóór grotere wijzigingen een issue waarin je beschrijft:

- welk probleem je oplost;
- voor welke test, pagina of component;
- welke huidige werking behouden moet blijven;
- hoe je de wijziging wilt testen;
- of opslag, rapportage, print, offline caching of toegankelijkheid geraakt worden.

Gebruik geen openbaar issue voor beveiligingsproblemen. Volg daarvoor [`SECURITY.md`](SECURITY.md).

## Ontwikkelprincipes

1. **Beperk de scope.** Eén pull request behandelt één duidelijk probleem of één samenhangende wijziging.
2. **Behoud compatibiliteit.** Wijzig geen bestaande test-ID's, storage keys of resultaatstructuren zonder migratieplan.
3. **Respecteer meetgrenzen.** Voeg geen vragen toe die inhoudelijk thuishoren in een andere test.
4. **Behoud lokale verwerking.** Introduceer geen backend, tracking of externe opslag zonder expliciete architectuurbeslissing.
5. **Geen buildstap.** Het project blijft rechtstreeks uitvoerbare HTML/CSS/JavaScript, tenzij een toekomstige hoofdrelease dit bewust wijzigt.
6. **Geen verborgen afhankelijkheden.** Voeg geen externe CDN's, lettertypen of scripts toe zonder noodzaak en documentatie.
7. **Scherm en print scheiden.** Printspecifieke wijzigingen horen in `print.css` en mogen light/dark op het scherm niet beïnvloeden.
8. **Toegankelijkheid behouden.** Semantiek, toetsenbordbediening, focus en leesbaar contrast blijven verplicht.

## Lokale werkwijze

1. Maak een branch vanaf de actuele `main`.
2. Start een lokale HTTP-server.
3. Voer uitsluitend de noodzakelijke wijzigingen uit.
4. Test de volledige betrokken route.
5. Verhoog `CACHE_VERSION` in `service-worker.js` wanneer een gecachet applicatiebestand verandert.
6. Werk `CHANGELOG.md` bij wanneer de wijziging gebruikers raakt.
7. Open een pull request met de ingevulde template.

Voorbeeld:

```bash
git checkout main
git pull
git checkout -b fix/korte-beschrijving
python -m http.server 8080
```

## Nieuwe test toevoegen

Een nieuwe test vereist normaal:

1. testdata in `data/<test-id>/` of passende losse databestanden;
2. een engine in `tests/<test-id>/`;
3. optionele scoring-, renderer-, report- en stylebestanden;
4. een catalogusregel in `core/app-config.js`;
5. scripts en eventuele styles in `index.html`;
6. cachepaden en een nieuwe cacheversie in `service-worker.js`;
7. inhoudelijke bronnen, interpretaties en grenzen;
8. resultaten- en totaalrapportintegratie;
9. light-, dark-, mobiel-, offline- en printtests.

## Codeafspraken

- Gebruik duidelijke, beschrijvende namen.
- Behoud `"use strict"` in klassieke JavaScriptbestanden.
- Vermijd globale variabelen tenzij ze deel zijn van het bestaande modulecontract.
- Voeg geen minified bronbestanden toe.
- Houd data, scoring, rendering en sessielogica gescheiden.
- Schrijf commentaar voor intentie en uitzonderingen, niet voor vanzelfsprekende syntaxis.
- Gebruik UTF-8 en Nederlandse gebruikersinterface-teksten.

## Verplichte testcontrole

Volg [`docs/TESTCHECKLIST.md`](docs/TESTCHECKLIST.md). Minimaal:

- nieuwe sessie;
- hervatten na herladen;
- voltooien en resultaat tonen;
- light en dark mode;
- mobiel formaat;
- individueel rapport printen;
- totaalrapport printen;
- offline herladen;
- back-up downloaden en herstellen;
- controle op consolefouten.

## Pull request

Een pull request moet bevatten:

- een korte probleemomschrijving;
- een lijst van gewijzigde bestanden;
- exacte teststappen;
- screenshots bij visuele wijzigingen;
- bevestiging dat opslag en print niet onbedoeld zijn gewijzigd;
- vermelding van de nieuwe cacheversie wanneer relevant.

Een wijziging is pas klaar wanneer zij reproduceerbaar getest is en geen bestaande testroute breekt.
