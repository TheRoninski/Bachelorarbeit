# Azure DevOps – Pull Requests – NVDA-Testprotokoll

Status: **offen, verpflichtend** (D-024, `docs/TODO.md`).

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 4.2 (Szenario), Abschnitt 6 (NVDA-Tests), Abschnitt 6.4 (Quellcode versus Screenreader).

Testumgebung: siehe `../environment.md`.

## Prüfziele (Abschnitt 6.1)

- Seitenstruktur verständlich
- Überschriften und Landmarks sinnvoll
- Links, Buttons, Form Controls mit zugänglichen Namen
- Rollen und Zustände korrekt angekündigt
- Fokus und Screenreader-Cursor konsistent
- dynamische Änderungen angekündigt (z. B. neue Kommentare, Statuswechsel)
- Menüs, Dialoge, Comboboxen, Listboxen, Tabs verständlich bedienbar
- Fehler, Statusänderungen, Bestätigungen wahrnehmbar

## Prüfschritte (Abschnitt 6.2)

- Seite linear lesen
- Überschriftennavigation
- Landmark-Navigation
- Links-/Buttonnavigation
- Formularfelder prüfen (Kommentar-/Review-Editor)
- Fokusmodus bei interaktiven Widgets prüfen
- Menü-/Listbox-/Tab-Navigation prüfen (Overview/Files/Updates-Tabs, Reviewer-Dropdown)
- Dialogöffnung und Fokusfang prüfen
- Fokus nach Dialogschluss prüfen
- Autor:in, Zeitstempel, Statusmetadaten prüfen
- Informationsdichte notieren, ohne automatisch als Verstoß zu werten

## Testprotokoll je Ausgabe (Abschnitt 6.3)

```
### Ausgabe: <Kurzbezeichnung, z. B. Files-changed-Tab-Ansage>

- Fokussiertes Element: nicht erhoben
- Erwartete Ansage: nicht erhoben
- Tatsächliche Ansage (wörtlich): nicht erhoben
- Rolle: nicht erhoben
- Name: nicht erhoben
- Zustand: nicht erhoben
- Zusätzliche/fehlende Information: nicht erhoben
- Auswirkung auf Aufgabe: nicht erhoben
- Vorläufiger Befund-Bezug: keiner | AZ-PR-NV-###
```

## Quellcode versus Screenreader

DOM-Hypothesen aus `dom-aria-notes.md` gelten hier erst als bestätigt, wenn die tatsächliche NVDA-Ausgabe sie stützt. Ein Screenshot oder DOM-Fund allein beweist kein Screenreader-Problem (D-013).

## Ergebnis dieses Testblocks

Noch keine Testläufe durchgeführt. Kein Befund, keine Severity, keine WCAG-Zuordnung bis zur tatsächlichen Durchführung.
