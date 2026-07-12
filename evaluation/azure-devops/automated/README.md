# Azure DevOps – Automatisierte Tests (Playwright/Axe)

Status: **geplant, noch nicht implementiert** (D-027, `docs/TESTING_GUIDELINES.md` Abschnitt 7 und 8).

## Grundsatz

Automatisierte Tests ersetzen keine manuellen Keyboard- und NVDA-Tests (`CLAUDE.md` Regel 4). Sie sind eine ergänzende Ebene für Reproduzierbarkeit und Regression, nachdem manuelle Befunde bereits bestätigt wurden.

## Playwright

Gemäß `docs/TESTING_GUIDELINES.md` Abschnitt 7: nur bestätigte Erwartungen automatisieren, semantische Selektoren und Rollen bevorzugen, keine gehashten CSS-Klassen, komplexe Widgets mit echten Tastensequenzen testen, Fokus über `document.activeElement` nachvollziehen.

Für Azure DevOps existiert noch keine Testsuite. Konkrete Testfälle werden erst formuliert, sobald ein Keyboard-only-Befund in `../work-items/keyboard-test.md` oder `../pull-requests/keyboard-test.md` tatsächlich bestätigt wurde und reproduzierbar automatisiert werden soll.

## Axe

Gemäß `docs/TESTING_GUIDELINES.md` Abschnitt 8: Basisscans auf Übersichtsseiten und nach Öffnen von Menüs/Dialogen/Detailansichten, Regel-IDs und betroffene Nodes speichern, Ergebnisse manuell validieren. Axe-Ergebnisse gelten nicht als vollständige WCAG-Konformitätsbewertung und erkennen insbesondere keine Fokusreihenfolge-, Screenreader-Ausgabe- oder Informationsdichteprobleme zuverlässig.

Für Azure DevOps existiert noch keine Axe-Konfiguration.

## Funde

Automatisierte Funde erhalten die ID `AZ-AUTO-###` (siehe `../README.md`, ID-Schema) und werden getrennt von manuellen Keyboard-/NVDA-/DOM-Befunden gehalten. Ein automatisierter Fund wird erst dann in `../barrier-log.md` übernommen, wenn er manuell validiert wurde.

Noch keine Funde, da noch keine Tools eingerichtet sind.
