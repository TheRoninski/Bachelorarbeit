# Azure DevOps – Evaluationsstruktur

## Zweck

Dieser Ordner enthält die vollständige Accessibility-Evaluation von Azure DevOps gemäß `docs/TESTING_GUIDELINES.md`, `docs/RESEARCH_GUIDELINES.md` und `docs/DECISIONS.md` (D-024). Azure DevOps ist verpflichtender Bestandteil des finalen Scopes; alle vier Testblöcke sind laut `docs/PROJECT_OVERVIEW.md` und `docs/TODO.md` vollständig offen.

Dieser Ordner enthält zum aktuellen Zeitpunkt **ausschließlich Struktur und Vorlagen**. Es sind keine Testergebnisse, keine Befunde und keine WCAG-Zuordnungen enthalten, solange die zugehörigen manuellen Tests nicht tatsächlich durchgeführt wurden.

## Abgedeckte Testblöcke

1. Work Items/Boards – Keyboard-only
2. Work Items/Boards – NVDA
3. Pull Requests – Keyboard-only
4. Pull Requests – NVDA

Für jeden Testblock gilt `docs/TESTING_GUIDELINES.md` Abschnitt 14 („Abschluss eines Testblocks“) als Definition of Done.

## Ordnerstruktur

```
evaluation/azure-devops/
  README.md                    – diese Datei
  environment.md                – Testumgebung(en), pro Testlauf auszufüllen
  work-items/
    keyboard-test.md            – Keyboard-only-Testprotokoll Work Items/Boards
    nvda-test.md                – NVDA-Testprotokoll Work Items/Boards
    dom-aria-notes.md           – DOM-/ARIA-Hypothesen Work Items/Boards
  pull-requests/
    keyboard-test.md            – Keyboard-only-Testprotokoll Pull Requests
    nvda-test.md                – NVDA-Testprotokoll Pull Requests
    dom-aria-notes.md           – DOM-/ARIA-Hypothesen Pull Requests
  barrier-log.md                – normalisiertes Barrier Log (bestätigte Befunde)
  positive-examples.md          – S4-Beobachtungen und positive Patterns
  automated/
    README.md                   – Status Playwright/Axe für Azure DevOps
  evidence/
    README.md                   – Ablageregeln für Screenshots/Videos
```

## Trennung der Methoden

Gemäß Vorgabe bleiben folgende Ebenen strikt getrennt und werden nicht gegenseitig als Beleg verwendet:

- **Keyboard-only** (`*/keyboard-test.md`) – reines Tastaturverhalten, keine Screenreader-Aussage.
- **NVDA** (`*/nvda-test.md`) – Screenreader-Ausgabe, keine reine DOM-Interpretation.
- **DOM/ARIA-Hypothesen** (`*/dom-aria-notes.md`) – statische Beobachtungen am Markup/Accessibility Tree; beweisen laut D-013 allein keine Screenreader-Barriere und müssen mit NVDA-Tests abgeglichen werden.
- **Automatisierte Tool-Funde** (`automated/`) – Playwright/Axe-Ergebnisse, ergänzend, ersetzen keine manuelle Prüfung (D-027).

Die drei manuellen Protokolldateien pro Workflow (`keyboard-test.md`, `nvda-test.md`, `dom-aria-notes.md`) sind Rohprotokolle einzelner Testläufe. Bestätigte Barrieren werden von dort **normalisiert** in `barrier-log.md` übernommen; positive/kontextabhängige S4-Beobachtungen werden in `positive-examples.md` übernommen. Ein Befund existiert im Barrier Log erst, nachdem er tatsächlich beobachtet und nach `docs/RESEARCH_GUIDELINES.md` Abschnitt 7 geprüft wurde.

## ID-Schema

Alle IDs sind eindeutig, aufsteigend nummeriert (3-stellig, `001`, `002`, …) und werden nie wiederverwendet.

| Präfix | Bedeutung |
|---|---|
| `AZ-WI-KB-###` | Azure DevOps, Work Items/Boards, Keyboard-only-Befund |
| `AZ-WI-NV-###` | Azure DevOps, Work Items/Boards, NVDA-Befund |
| `AZ-WI-DOM-###` | Azure DevOps, Work Items/Boards, DOM-/ARIA-Hypothese |
| `AZ-PR-KB-###` | Azure DevOps, Pull Requests, Keyboard-only-Befund |
| `AZ-PR-NV-###` | Azure DevOps, Pull Requests, NVDA-Befund |
| `AZ-PR-DOM-###` | Azure DevOps, Pull Requests, DOM-/ARIA-Hypothese |
| `AZ-AUTO-###` | Azure DevOps, automatisierter Tool-Fund (Playwright/Axe) |
| `AZ-POS-###` | Azure DevOps, positive Beispiele/S4-Beobachtungen (workflow-/methodenübergreifend, Workflow wird im Eintrag vermerkt) |

Eine DOM-/ARIA-Hypothese erhält erst dann eine Barrier-Log-ID (`AZ-WI-KB-###`, `AZ-WI-NV-###`, `AZ-PR-KB-###`, `AZ-PR-NV-###`), wenn sie durch tatsächliches Keyboard- oder NVDA-Verhalten bestätigt wurde.

## Severity

Severity wird ausschließlich nach `docs/RESEARCH_GUIDELINES.md` Abschnitt 8 vergeben, erst nach tatsächlicher Beobachtung, nie im Voraus:

- **S1 kritisch**, **S2 hoch**, **S3 mittel** – bezeichnen einen begründeten Fehler mit Auswirkung auf den Workflow.
- **S4** – ist keine Fehlerschwere, sondern eine Beobachtung oder ein positives Beispiel. S4-Einträge gehören nach `positive-examples.md`, nicht in `barrier-log.md`.

## Scope-Hinweis

Azure DevOps bleibt gemäß D-024 verpflichtender Bestandteil des finalen Scopes. Dieser Ordner ändert weder Forschungsfrage noch Scope noch Methodik. Alle Vorlagen folgen den bestehenden Vorgaben aus `docs/TESTING_GUIDELINES.md` und `docs/RESEARCH_GUIDELINES.md`.

## Datenschutz

Es dürfen keine Zugangsdaten, Cookies, Sessions, personenbezogenen Daten oder privaten vollständigen URLs abgelegt werden. Testaccounts werden nur anonymisiert mit Berechtigungsstufe beschrieben (siehe `environment.md`).
