# Ondersteuning

## Eerst controleren

Bij onverwacht gedrag:

1. vernieuw de pagina met `Ctrl + F5`;
2. sluit andere open tabbladen van dezelfde applicatie;
3. controleer of JavaScript en lokale opslag zijn toegestaan;
4. probeer de actuele versie in een moderne browser;
5. controleer of de nieuwste serviceworker actief is;
6. maak vóór het wissen van sitegegevens een back-up.

## Bekende oorzaken

### Een oude versie blijft zichtbaar

De PWA gebruikt een serviceworker. Voer een harde vernieuwing uit. Wanneer dat niet volstaat, sluit alle tabbladen van de app, verwijder de sitecache en open de website opnieuw.

### Resultaten zijn verdwenen

Resultaten staan lokaal in het gebruikte browserprofiel. Zij zijn niet automatisch beschikbaar in een andere browser, privémodus of op een ander apparaat. Herstel een eerder gedownloade JSON-back-up wanneer beschikbaar.

### De app werkt niet via een lokaal bestand

Open het project via een lokale HTTP-server. Serviceworkers werken niet correct via `file://`.

### Print of PDF ziet er anders uit dan op het scherm

Dat is bewust: rapporten worden bij printen omgezet naar een witte achtergrond met zwarte tekst. Interactieve knoppen en schermnavigatie worden verborgen.

## Een bug melden

Gebruik het bugrapportformulier en vermeld:

- testnaam of rapporttype;
- exacte stappen;
- verwacht en werkelijk resultaat;
- browser en besturingssysteem;
- light of dark mode;
- online of offline;
- screenshot zonder gevoelige antwoorden;
- consolemelding wanneer relevant.

Meld beveiligingsproblemen volgens [`SECURITY.md`](SECURITY.md).
