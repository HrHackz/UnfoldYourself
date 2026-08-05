# Unfold Yourself — Design System & Visuele Richtlijnen

**Status:** Definitieve visuele basis  
**Doel:** Deze richtlijnen bewaken dat Unfold Yourself bij toekomstige uitbreidingen visueel consistent blijft.  
**Stijlnaam:** Soft Editorial Tech  
**Hoofdprincipes:** warm, modern, persoonlijk, premium, rustig, toegankelijk en professioneel.

---

# 1. Merkuitstraling

Unfold Yourself moet aanvoelen als:

- warm en menselijk;
- intelligent en inhoudelijk sterk;
- modern zonder trendgevoelig te worden;
- professioneel zonder klinisch of corporate te ogen;
- rustig en overzichtelijk;
- persoonlijk zonder kinderachtig te worden;
- premium, zacht en verfijnd.

Unfold Yourself mag niet aanvoelen als:

- een klassieke HR-softwaretool;
- een medisch dashboard;
- een schools testsysteem;
- een standaard Bootstrap-website;
- een drukke kleurenregenboog;
- een harde zwart-witte interface;
- een neon-interface waarin accenten grote oppervlakken overnemen.

---

# 2. Algemene ontwerpprincipes

## 2.1 Visuele rust

- Gebruik ruime witruimte.
- Beperk het aantal visuele accenten per scherm.
- Gebruik kleur vooral om betekenis, selectie en hiërarchie aan te geven.
- Vermijd zware schaduwen en dikke randen.
- Maak belangrijke elementen duidelijk zonder elk element even opvallend te maken.

## 2.2 Afgeronde vormtaal

- Hoofdcontainers: 24–32 px afronding.
- Gewone kaarten: 18–24 px afronding.
- Kleine kaarten en invoervelden: 14–18 px afronding.
- Pills, badges en compacte knoppen: volledig afgerond.
- Iconen mogen in ronde of afgerond-vierkante vlakken staan.

## 2.3 Zachte diepte

- Gebruik subtiele schaduwen.
- Combineer schaduw met een zachte rand.
- Gebruik geen harde zwarte schaduwen.
- In dark mode worden elementen vooral gescheiden door lichte randen en nuanceverschillen in oppervlakken.

## 2.4 Informatiehiërarchie

Ieder scherm of rapport volgt bij voorkeur:

1. paginatitel;
2. korte context of samenvatting;
3. belangrijkste resultaat of actie;
4. visueel overzicht;
5. detailinformatie;
6. methodiek, bronnen en disclaimer.

---

# 3. Typografie

## 3.1 Fontstack

```css
font-family:
  Inter,
  "SF Pro Display",
  "SF Pro Text",
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

## 3.2 Richtlijnen

- Grote titels: stevig, compact en duidelijk.
- Sectietitels: sterk maar lichter dan paginatitels.
- Bodytekst: goed leesbaar met voldoende regelhoogte.
- Secundaire tekst: kleiner en zachter, maar altijd voldoende contrast.
- Scorecijfers: groot en stevig.
- Labels en badges: compact.
- Vermijd overmatig gebruik van hoofdletters.
- Vermijd extreem dunne lettergewichten voor belangrijke informatie.

## 3.3 Aanbevolen groottes

```css
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-md: 1.125rem;
--font-size-lg: 1.375rem;
--font-size-xl: 1.75rem;
--font-size-2xl: 2.25rem;
--font-size-3xl: clamp(2.5rem, 5vw, 4rem);
```

## 3.4 Regelhoogtes

```css
--line-height-tight: 1.1;
--line-height-heading: 1.2;
--line-height-body: 1.55;
--line-height-relaxed: 1.7;
```

---

# 4. Light Theme

Light mode is de standaard voor lange teksten, rapporten, professioneel gebruik en print.

## 4.1 Basiskleuren

| Token | Functie | Hex |
|---|---|---|
| `--bg-app` | Algemene appachtergrond | `#F1ECE7` |
| `--bg-alt` | Alternatieve achtergrond | `#E8E0D9` |
| `--surface-1` | Hoofdkaart / primair oppervlak | `#FFFCF8` |
| `--surface-2` | Secundaire kaart | `#F8F3EE` |
| `--surface-3` | Zacht geselecteerd oppervlak | `#F4ECE7` |
| `--text-primary` | Primaire tekst | `#25242B` |
| `--text-secondary` | Secundaire tekst | `#6F6966` |
| `--text-muted` | Gedempte tekst | `#918984` |
| `--border-soft` | Zachte rand | `#DED5CE` |
| `--border-strong` | Sterkere rand | `#CFC3BA` |

## 4.2 Light theme-karakter

- Warm beige canvas.
- Witte en ivoorkleurige kaarten.
- Donker antraciet in plaats van puur zwart.
- Zeer zachte schaduwen.
- Accenten worden gericht gebruikt.
- Grote tekstvlakken blijven rustig en licht.

---

# 5. Dark Theme

Dark mode is bedoeld voor schermgebruik, avondgebruik en een krachtigere visuele ervaring.

## 5.1 Basiskleuren

| Token | Functie | Hex |
|---|---|---|
| `--bg-app` | Algemene appachtergrond | `#11101F` |
| `--bg-alt` | Alternatieve achtergrond | `#181529` |
| `--surface-1` | Hoofdkaart / primair oppervlak | `#211E31` |
| `--surface-2` | Secundaire kaart | `#29253A` |
| `--surface-3` | Geselecteerd / verhoogd oppervlak | `#302B43` |
| `--text-primary` | Primaire tekst | `#FAF8F5` |
| `--text-secondary` | Secundaire tekst | `#B9B3C2` |
| `--text-muted` | Gedempte tekst | `#8D8797` |
| `--border-soft` | Zachte rand | `#3A354B` |
| `--border-strong` | Sterkere rand | `#504862` |

## 5.2 Dark theme-karakter

- Geen puur zwart.
- Basis is ink navy / aubergine.
- Kaarten hebben subtiele gelaagdheid.
- Accenten mogen iets levendiger zijn dan in light mode.
- Grote oppervlakken blijven donker en rustig.
- Neonkleuren worden alleen als accent gebruikt.

---

# 6. Accentpalet

| Token | Naam | Hex | Primair gebruik |
|---|---|---|---|
| `--accent-magenta` | Electric Magenta | `#FF0A8F` | primaire actie, geselecteerd antwoord, actieve navigatie |
| `--accent-rose` | Rose Punch | `#FF4D6D` | waarschuwing, belasting, kwetsbaar aandachtspunt |
| `--accent-gold` | Warm Gold | `#FFD166` | aandacht, groei, belangrijke nuance |
| `--accent-mint` | Mint Signal | `#06D6A0` | positief, voltooid, sterke hulpbron |
| `--accent-ink` | Ink Navy | `#1B1B3A` | diepe contrastkleur |
| `--accent-peach` | Soft Peach | `#FFB59D` | zachte warme achtergrond |
| `--accent-blue` | Calm Blue | `#74B9FF` | informatie, cognitie, methodiek |
| `--accent-lilac` | Soft Lilac | `#B8A1FF` | identiteit, reflectie, verdieping |

## 6.1 Kleurgebruik

Gebruik accentkleuren voor:

- actieve of geselecteerde elementen;
- kleine badges;
- iconen;
- dunne accentlijnen;
- grafieken;
- score-indicatoren;
- highlights;
- statusfeedback.

Vermijd:

- volledige pagina’s met felle accentachtergrond;
- willekeurige kleurtoewijzing;
- meer dan drie concurrerende accenten in één kaart;
- fel rood voor normale aandachtspunten;
- kleur als enige betekenisdrager.

---

# 7. Semantische kleuren

| Betekenis | Accent |
|---|---|
| Positief / voltooid / sterke hulpbron | Mint Signal |
| Aandacht / nuance / groeikans | Warm Gold |
| Belasting / kwetsbaar aandachtspunt | Rose Punch |
| Primaire actie / selectie / focus | Electric Magenta |
| Informatie / methodiek / cognitie | Calm Blue |
| Reflectie / identiteit / verdieping | Soft Lilac |

Alle semantische kleurvlakken moeten ook tekst en/of symbolen bevatten. Kleur alleen is niet voldoende.

---

# 8. Afmetingen en radii

```css
--radius-xs: 10px;
--radius-sm: 14px;
--radius-md: 18px;
--radius-lg: 24px;
--radius-xl: 32px;
--radius-pill: 999px;
```

Gebruik:

- invoervelden: `--radius-sm`
- gewone kaarten: `--radius-md` of `--radius-lg`
- grote dashboard- en rapportpanelen: `--radius-lg` of `--radius-xl`
- badges en navigatiepills: `--radius-pill`

---

# 9. Schaduwen

## Light mode

```css
--shadow-sm: 0 4px 16px rgba(55, 45, 40, 0.06);
--shadow-md: 0 10px 30px rgba(55, 45, 40, 0.08);
--shadow-lg: 0 20px 50px rgba(55, 45, 40, 0.10);
```

## Dark mode

```css
--shadow-sm: 0 4px 18px rgba(0, 0, 0, 0.20);
--shadow-md: 0 12px 34px rgba(0, 0, 0, 0.28);
--shadow-lg: 0 22px 60px rgba(0, 0, 0, 0.34);
```

Schaduwen moeten zacht en breed zijn. Gebruik geen harde zwarte rand rondom elk element.

---

# 10. Spacing-systeem

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.25rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-10: 2.5rem;
--space-12: 3rem;
--space-16: 4rem;
```

Richtlijnen:

- Kaartpadding desktop: 24–32 px.
- Kaartpadding mobiel: 18–24 px.
- Sectieafstand: 32–48 px.
- Kleine kaartafstand: 12–20 px.
- Vermijd uitzonderlijke losse marges buiten dit systeem.

---

# 11. Knoppen

## 11.1 Primaire knop

- pill of sterk afgerond;
- donker in light mode of magenta-accent;
- heldere tekst;
- subtiele hover;
- duidelijke focusring;
- minimaal 44 px hoog op mobiel.

## 11.2 Secundaire knop

- lichte kaartkleur;
- zachte rand;
- primaire tekstkleur;
- hover met lichte achtergrondverandering.

## 11.3 Geselecteerd antwoord

- duidelijke magenta-accentkleur;
- voldoende tekstcontrast;
- zichtbare buitenring;
- subtiele verhoging;
- niet alleen kleur gebruiken: ook rand, icoon of gewicht aanpassen.

## 11.4 Focus

```css
outline: 3px solid color-mix(in srgb, var(--accent-magenta) 40%, transparent);
outline-offset: 3px;
```

---

# 12. Kaarten en panelen

## 12.1 Hoofdkaart

- groot afgerond;
- `surface-1`;
- zachte rand;
- middelgrote schaduw;
- 24–32 px padding.

## 12.2 Secundaire kaart

- `surface-2`;
- kleinere schaduw;
- zachte rand;
- 18–24 px padding.

## 12.3 Kernsamenvatting

- mag visueel sterker zijn;
- zachte gradient of diep contrastoppervlak;
- korte tekst;
- kernresultaat groot;
- maximaal enkele badges.

## 12.4 Waarschuwing

- zachte rose/peach achtergrond;
- Rose Punch als accentlijn of icoon;
- geen groot fel rood vlak;
- rustig en niet-alarmistisch.

## 12.5 Positief inzicht

- zachte mintachtergrond;
- Mint Signal als accent;
- donkere, goed leesbare tekst.

---

# 13. Testvragen

- Eén centrale vraagkaart.
- Veel ademruimte rond de vraag.
- Grote antwoordknoppen.
- Geen sliders tenzij inhoudelijk absoluut noodzakelijk.
- Geselecteerde keuze duidelijk zichtbaar.
- Voortgangsbalk dun, afgerond en elegant.
- Navigatieknoppen consequent geplaatst.
- Op mobiel grote tikvlakken en één duidelijke actie per moment.

---

# 14. Rapporten

## 14.1 Rapportvolgorde

1. kernsamenvatting;
2. visueel overzicht;
3. belangrijkste resultaten;
4. verdieping per onderdeel;
5. praktische betekenis;
6. methodiek, bronnen en grenzen.

## 14.2 Scorekaarten

- score prominent;
- label direct eronder;
- dunne accentlijn;
- rustige achtergrond;
- afgeronde scorebalken;
- consistente kleuren.

## 14.3 Openklapbare onderdelen

Gebruik overal:

- `⌄ Toon volledige uitleg`
- `⌃ Verberg volledige uitleg`

Richtlijnen:

- volledige kopregel klikbaar;
- icoon rechts;
- subtiele hover;
- geopend blok krijgt lichte achtergrond- of randverandering;
- pijlicoon mag draaien via CSS;
- alle details worden in print automatisch geopend.

---

# 15. Navigatie

## 15.1 Desktop

- rustige boven- of zijnavigatie;
- duidelijke actieve status;
- pill-elementen waar passend;
- voldoende witruimte;
- geen overvolle menubalk.

## 15.2 Mobiel

Voorkeur: zwevende navigatiepill onderaan.

Kenmerken:

- gecentreerd;
- los van de schermrand;
- afgeronde capsule;
- zachte transparantie;
- subtiele blur;
- zachte schaduw;
- maximaal 4–5 centrale acties;
- actieve actie in magenta;
- theme-toggle mag hierin worden opgenomen.

---

# 16. Theme Toggle

## 16.1 Opties

- Systeem
- Licht
- Donker

## 16.2 Gedrag

- Eerste bezoek: systeeminstelling volgen.
- Keuze lokaal opslaan.
- Thema onmiddellijk wisselen.
- Geen invloed op testresultaten of opslag.
- Print blijft altijd licht.

## 16.3 Technische afspraak

Gebruik op `<html>`:

```html
<html data-theme="light">
```

of:

```html
<html data-theme="dark">
```

Opslagsleutel:

```text
unfold-yourself-theme
```

CSS wordt gebaseerd op centrale variabelen. Vermijd hard gecodeerde kleuren in losse componenten.

---

# 17. Grafieken

- Gebruik een vaste semantische kleurset.
- Rasterlijnen zacht en gedempt.
- Labels altijd leesbaar.
- Vermijd willekeurige regenboogkleuren.
- Donkere grafieken krijgen heldere lijnen zonder overdreven glow.
- Scores moeten ook zonder kleur interpreteerbaar blijven.
- Hard gecodeerde grafiekkleuren in JavaScript moeten later naar centrale tokens worden vertaald.

---

# 18. Animaties

- Kort en subtiel.
- Gebruik vooral opacity, transform en kleurtransities.
- Hoveranimaties: 150–220 ms.
- Grotere paneelovergangen: 220–320 ms.
- Geen bewegende achtergronden tijdens vragen.
- Respecteer `prefers-reduced-motion`.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

# 19. Toegankelijkheid

- Tekstcontrast minimaal WCAG AA waar praktisch haalbaar.
- Tikdoelen minimaal 44 × 44 px.
- Focusstatus altijd zichtbaar.
- Geen betekenis uitsluitend via kleur.
- Tekst mag op mobiel niet kleiner dan ongeveer 14 px worden.
- Interface moet bruikbaar blijven bij 200% zoom.
- Dark mode mag geen laagcontrast grijze tekst opleveren.
- Hoverstatus mag nooit de enige feedback zijn.

---

# 20. Print en PDF

Print gebruikt altijd een lichte, gecontroleerde stijl:

- witte achtergrond;
- donkere tekst;
- gedempte accentkleuren;
- geen zware schaduwen;
- navigatie en interactieve knoppen verborgen;
- openklapbare details volledig zichtbaar;
- kaarten zo min mogelijk over pagina’s splitsen;
- kop bij bijbehorende inhoud houden;
- voldoende marges en witruimte.

Dark mode wordt nooit letterlijk naar PDF of papier gekopieerd.

---

# 21. Technische CSS-regels

## Verplicht

- Alle hoofdkleuren als CSS-variabelen.
- Light en dark mode via dezelfde tokens.
- Geen willekeurige hex-codes verspreid over componentbestanden.
- Nieuwe componenten moeten bestaande radius-, spacing- en typografietokens gebruiken.
- Testlogica en styling gescheiden houden.
- Printregels apart beheren.
- Mobiele media queries centraal en overzichtelijk houden.

## Vermijden

- `!important` tenzij technisch noodzakelijk.
- Kleurwaarden rechtstreeks in JavaScript.
- Inline styles voor structurele vormgeving.
- Losse marges die het spacing-systeem omzeilen.
- Nieuwe componentstijlen die bestaande patronen dupliceren.
- Pure zwarte achtergronden of pure witte tekst in dark mode.

---

# 22. Voorbeeld van thematokens

```css
:root,
html[data-theme="light"] {
  --bg-app: #F1ECE7;
  --bg-alt: #E8E0D9;
  --surface-1: #FFFCF8;
  --surface-2: #F8F3EE;
  --surface-3: #F4ECE7;

  --text-primary: #25242B;
  --text-secondary: #6F6966;
  --text-muted: #918984;

  --border-soft: #DED5CE;
  --border-strong: #CFC3BA;

  --accent-magenta: #FF0A8F;
  --accent-rose: #FF4D6D;
  --accent-gold: #FFD166;
  --accent-mint: #06D6A0;
  --accent-ink: #1B1B3A;
  --accent-peach: #FFB59D;
  --accent-blue: #74B9FF;
  --accent-lilac: #B8A1FF;
}

html[data-theme="dark"] {
  --bg-app: #11101F;
  --bg-alt: #181529;
  --surface-1: #211E31;
  --surface-2: #29253A;
  --surface-3: #302B43;

  --text-primary: #FAF8F5;
  --text-secondary: #B9B3C2;
  --text-muted: #8D8797;

  --border-soft: #3A354B;
  --border-strong: #504862;
}
```

---

# 23. Besluitregel voor toekomstige uitbreidingen

Elke nieuwe functie of nieuw scherm moet vooraf worden gecontroleerd op:

1. gebruikt het de centrale CSS-tokens?
2. werkt het in light en dark mode?
3. werkt het op mobiel?
4. blijft het toegankelijk?
5. print het correct wanneer het in rapporten voorkomt?
6. sluit de vorm aan bij de bestaande kaart- en knopstijl?
7. introduceert het geen nieuwe willekeurige kleuren of radii?
8. verandert het geen bestaande test- of scorelogica?

---

# 24. Visuele referentie in één zin

> Warm beige en wit in light mode, diepe ink-navy en aubergine in dark mode, grote afgeronde premiumkaarten, geometrische sans-serif typografie, zwevende pill-navigatie en gecontroleerde magenta-, mint-, gold- en peachaccenten.

---

# 25. Releasebeheer

Bij iedere visuele release:

- volledige actuele ZIP bewaren;
- cacheversie verhogen;
- changelog bijhouden;
- light en dark mode controleren;
- mobiel testen;
- print/PDF testen;
- minimaal één rapport uit iedere testgroep controleren;
- geen scoring- of inhoudswijzigingen opnemen in dezelfde stylingpatch tenzij expliciet gepland.

