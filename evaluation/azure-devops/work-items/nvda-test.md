# Azure DevOps – Work Items/Boards – NVDA-Testprotokoll

Status: **offen, verpflichtend** (D-024, `docs/TODO.md`).

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 4.1 (Szenario), Abschnitt 6 (NVDA-Tests), Abschnitt 6.4 (Quellcode versus Screenreader).

Testumgebung: siehe `../environment.md`.

## Prüfziele (Abschnitt 6.1)

- Seitenstruktur verständlich
- Überschriften und Landmarks sinnvoll
- Links, Buttons, Form Controls mit zugänglichen Namen
- Rollen und Zustände korrekt angekündigt
- Fokus und Screenreader-Cursor konsistent
- dynamische Änderungen angekündigt
- Menüs, Dialoge, Comboboxen, Listboxen, Tabs verständlich bedienbar
- Fehler, Statusänderungen, Bestätigungen wahrnehmbar

## Prüfschritte (Abschnitt 6.2)

- Seite linear lesen
- Überschriftennavigation
- Landmark-Navigation
- Links-/Buttonnavigation
- Formularfelder prüfen
- Fokusmodus bei interaktiven Widgets prüfen
- Menü-/Listbox-/Tab-Navigation prüfen (Boards: Spalten- und Kartennavigation, falls per ARIA modelliert)
- Dialogöffnung und Fokusfang prüfen
- Fokus nach Dialogschluss prüfen
- Assigned To, Zustand, Zeitstempel, Metadaten prüfen
- Informationsdichte notieren, ohne automatisch als Verstoß zu werten

## Testprotokoll je Ausgabe (Abschnitt 6.3)

Pro relevanter Ansage folgenden Block kopieren. Ansage wörtlich protokollieren (NVDA Speech Viewer, falls verfügbar) oder als **nicht erhoben** markieren – nicht aus Erinnerung ergänzen.

```
### Ausgabe: <Kurzbezeichnung, z. B. Work-Item-Titel-Link in Liste>

- Fokussiertes Element: nicht erhoben
- Erwartete Ansage: nicht erhoben
- Tatsächliche Ansage (wörtlich): nicht erhoben
- Rolle: nicht erhoben
- Name: nicht erhoben
- Zustand: nicht erhoben
- Zusätzliche/fehlende Information: nicht erhoben
- Auswirkung auf Aufgabe: nicht erhoben
- Vorläufiger Befund-Bezug: keiner | AZ-WI-NV-###
```

## Quellcode versus Screenreader

DOM-Hypothesen aus `dom-aria-notes.md` gelten hier erst als bestätigt, wenn die tatsächliche NVDA-Ausgabe sie stützt. Ein Screenshot oder DOM-Fund allein beweist kein Screenreader-Problem (D-013).

## Ergebnis dieses Testblocks

Noch keine Testläufe durchgeführt. Kein Befund, keine Severity, keine WCAG-Zuordnung bis zur tatsächlichen Durchführung.
