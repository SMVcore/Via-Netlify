# SMVcore — Frank Poulsen Kirk

Hjemmeside for SMVcore: struktureret salgsmodning og vækstparathed for ejerledede SMV'er.

## Hurtig start

Åbn `smvcore.html` direkte i en browser — ingen build-trin nødvendigt.

## Deployment via Netlify

1. Push dette repo til GitHub
2. Gå til [netlify.com](https://www.netlify.com) → "Add new site" → "Import an existing project"
3. Vælg GitHub og dit repo
4. Build command: *(efterlad tomt)*
5. Publish directory: `.`  *(dvs. rod-mappen)*
6. Klik "Deploy site" — siden er live inden for 1–2 minutter

`netlify.toml` er allerede konfigureret korrekt.

## Filstruktur

| Fil | Beskrivelse |
|-----|-------------|
| `smvcore.html` | **Primær webside** — komplet, selvstændig HTML-fil |
| `netlify.toml` | Netlify deploy-konfiguration |
| `index.css` | Global CSS til fremtidig React-opsætning |
| `components/` | React-komponenter (klar til fremtidig brug) |

## Aktivering af kommende sektioner

Følgende sektioner er klar i koden men ikke synlige endnu:

### Kurser
I `smvcore.html`, find:
```html
<div class="coming-soon-section" id="kurser" aria-hidden="true">
```
Skift til:
```html
<div id="kurser">
```
Tilføj derefter `<li><a href="#kurser" class="nav-link">Kurser</a></li>` i nav.

### Sidekicks
Samme fremgangsmåde — find `id="sidekicks"` med `class="coming-soon-section"`.

## Kontakt

frank@smvcore.dk
