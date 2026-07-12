# Azure DevOps – Pull Requests – DOM-/ARIA-Hypothesen

Status: **offen**.

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 9 (DOM-Analyse), Abschnitt 10 (ARIA-Analyse), Abschnitt 6.4; `docs/DECISIONS.md` D-013.

Diese Datei enthält **Hypothesen**, keine bestätigten Befunde. Eine Hypothese wird erst durch Keyboard- oder NVDA-Verhalten (siehe `keyboard-test.md`, `nvda-test.md`) bestätigt oder verworfen und erhält erst dann eine Barrier-Log-ID.

## Zu prüfende DOM-/ARIA-Aspekte (Abschnitt 9)

`tabindex`, native Elemente vs. ARIA-Rollen, `role`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-hidden`, `aria-expanded`, `aria-controls`, `aria-selected`, `aria-checked`, zugänglicher Name im Accessibility Tree, DOM-Reihenfolge vs. visuelle Reihenfolge, Listen-/Überschriften-/Landmark-Struktur, Fokusziel nach dynamischen Updates.

## Bekannte positive ARIA-Patterns, die nicht vorschnell als Fehler gelten (Abschnitt 10)

`tablist`/`tab` mit Pfeiltastennavigation, Menü mit Pfeiltasten und Escape, Listbox mit einem Tab-Stopp und interner Pfeiltastennavigation, Combobox mit verständlicher Zustands-/Vorschlagsansage.

## Hypothesenprotokoll

```
### Hypothese: <Kurzbezeichnung>

- Betroffener Bereich: nicht erhoben
- DOM-/ARIA-Ausschnitt: nicht erhoben
- Vermutetes Risiko: nicht erhoben
- Abzugleichen mit: Keyboard-Test | NVDA-Test | beides
- Status: offene Hypothese | durch Test bestätigt (Bezug: AZ-PR-KB-### / AZ-PR-NV-###) | durch Test verworfen
```

## Bereits vorbereitete Beispiele für Hypothesenkategorien (aus Abschnitt 6.4)

Diese Liste ist eine Erinnerung an mögliche Kategorien, keine tatsächliche Beobachtung an Azure DevOps:

- `aria-labelledby` zeigt auf verborgenes Element
- `aria-label=""`
- Icon-only Button ohne berechneten Namen
- ungültige Listenstruktur
- überladener zugänglicher Name

## Ergebnis

Noch keine DOM-/ARIA-Analyse durchgeführt.
