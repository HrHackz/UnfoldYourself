# Technische architectuur

## Overzicht

Unfold Yourself is een statische PWA zonder backend of buildproces. Alle gebruikersinteractie, scoring, rapportage en lokale opslag gebeurt in de browser.

## Lagen

### 1. Interface

- `index.html`
- `styles.css`
- `fixes.css`
- `theme.css`
- `report-uniformity.css`
- `total-report.css`
- `print.css`

`print.css` wordt uitsluitend gebruikt voor print en PDF. Schermkleuren mogen daarbuiten niet door printregels worden beïnvloed.

### 2. Applicatiekern

| Bestand | Verantwoordelijkheid |
|---|---|
| `core/app-config.js` | Profielgebieden, testcatalogus, storage keys en accentconfiguratie |
| `core/test-registry.js` | Registratie en opzoeking van testdefinities |
| `core/test-engine.js` | Generieke testworkflow |
| `core/test-renderer.js` | Generieke scherm- en resultaatweergave |
| `core/storage.js` | Laden en opslaan van lokale profielstatus |
| `core/backup.js` | JSON-export en gecontroleerd herstel |
| `core/profile-ui.js` | Profiel- en catalogusinterface |
| `core/report-uniformity.js` | Uniformering van rapportcomponenten |
| `core/print.js` | Printstatus voor individuele rapporten |
| `core/ui-feedback.js` | Gebruikersmeldingen en feedback |
| `core/personality-answer-bank.js` | Hergebruik van bronidentieke persoonlijkheidsitems |

### 3. Tests

Tests staan in `tests/`. Eenvoudige modules hebben één enginebestand. Complexere modules scheiden:

- sessiestatus;
- scoring;
- rendering;
- rapportage;
- testspecifieke styles;
- taaklogica.

Elke test registreert een definitie via het bestaande globale testcontract.

### 4. Data

Testvragen, antwoordschalen, interpretaties, normatieve context en bronverwijzingen staan afzonderlijk in `data/` of in historische losse `*-questions.js` en `*-results.js` bestanden.

Data hoort geen DOM-logica te bevatten. Engines horen geen grote vraagbanken inline te dupliceren.

### 5. Rapportage

- individuele rapporten worden vanuit de testdefinitie opgebouwd;
- `total-report.js` combineert beschikbare resultaten;
- `total-report.css` bevat schermopmaak van totaalrapporten;
- `print.css` normaliseert alle rapporttypes naar zwart op wit.

### 6. Opslag

De hoofdstatus heeft vier domeinen:

```js
{
  completedTests: [],
  activeTests: {},
  results: {},
  responseBank: {}
}
```

Hoofdsleutel:

```text
unfold-yourself-profile-v1
```

Een historische sleutel kan bij het laden worden gemigreerd.

### 7. Offline gebruik

`service-worker.js` gebruikt:

- een versiegebonden cachenaam;
- een verplichte app-shell;
- aanvullende optionele bestanden;
- opruiming van oude caches;
- netwerk- en cacheafhandeling voor statische bronnen.

Wanneer een gecachet bestand wijzigt, moet `CACHE_VERSION` omhoog.

## Scriptvolgorde

Het project gebruikt klassieke scripts met `defer`. De volgorde in `index.html` is functioneel en mag niet willekeurig worden aangepast. Configuratie en data moeten geladen zijn vóór engines die ervan afhankelijk zijn.

## Geen externe runtime-afhankelijkheden

De productieapp heeft geen npm-pakketten, frameworkruntime of CDN nodig. Daardoor blijven hosting, offline caching en inspecteerbaarheid eenvoudig.
