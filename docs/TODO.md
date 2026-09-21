# TODO

## High Priority

- [ ] QG2-Zwischenversion mit vollständiger Introduction, vollständiger Methodology und ersten Ergebnissen sicherstellen.
- [ ] Engineering-Prozess der Extension als Requirements Engineering, Spezifikation, Implementierung und Testing dokumentieren.
- [ ] Potenziellen Nutzen und Abgrenzung der Extension gegenüber bestehenden Standardansätzen argumentieren.
- [ ] Methoden- und Technologieauswahl begründen und relevante Alternativen diskutieren.
- [ ] Solution-Teil mit User Requirements, Funktionalität, UI, Architektur, Komponenten und Schnittstellen strukturieren.
- [ ] Discussion zu Potenzialen, Einschränkungen, Verbesserungen, Übertragbarkeit und Prozess-Learnings vorbereiten.
- [ ] Azure DevOps Work Items/Boards vollständig Keyboard-only testen.
- [ ] Azure DevOps Work Items/Boards vollständig mit NVDA testen.
- [ ] Azure DevOps Pull Requests vollständig Keyboard-only testen.
- [ ] Azure DevOps Pull Requests vollständig mit NVDA testen.
- [ ] Azure-Ergebnisse in Barrier Log, Screenshots, DOM-/ARIA-Analyse, Plattformvergleich, Diskussion und Fazit integrieren.
- [ ] GitHub Pull Requests vollständig mit NVDA testen.
- [ ] GitLab Merge Requests vollständig Keyboard-only testen.
- [ ] GitLab Work Items vollständig mit NVDA testen.
- [ ] GitLab Merge Requests vollständig mit NVDA testen.
- [ ] Beide Hauptworkflows pro Methode in einer Evaluationsmatrix als abgeschlossen oder offen markieren.
- [ ] Frühe GitHub-DOM-Hypothesen gegen aktuelle UI, Accessibility Tree und NVDA verifizieren.
- [ ] GitLab-Filterbefund neu bewerten: korrektes Composite Widget oder echte Barriere.
- [ ] Alle S1-Befunde auf reale Blockerwirkung prüfen; Severity nicht nur aus `tabindex` ableiten.
- [ ] Barrier Log vollständig anlegen und alle Befunde mit IDs, Reproduktion und Evidenz erfassen.
- [ ] Kapitel 6 vollständig und widerspruchsfrei finalisieren.
- [ ] Kapitel-6-Einleitung auf Keyboard-only und NVDA aktualisieren.
- [x] Prototyp-Probleme anhand bestätigter Befunde priorisieren. (`extension/README.md` Abschnitt 4: vier S1-Befunde aus `KNOWLEDGE_BASE.md` 3.1–3.5 sowie die Shortcut-Hilfe ohne direkten Barrier-Befund ausgewählt und je Shortcut zugeordnet)
- [x] GitHub-Extension-MVP für Issues und Pull Requests implementieren. (`extension/` – Selector-/Fokus-Utilities, Issues- und PR-Adapter, Shortcut-Manager mit zentralem Scope-Guard, Hilfe-Overlay, Styles inkl. Reduced-Motion, Manifest V3 mit soft-navigation-fähiger Aktivierung; Keyboard-only- und NVDA-Verifikation am realen, eingeloggten Account steht noch aus, siehe neuer Punkt unten)
- [ ] Extension-Shortcuts mit echtem, eingeloggtem GitHub-Account Keyboard-only und mit NVDA nachtesten (automatisierter Playwright-Smoke-Test lief unauthentifiziert; Kommentar-Editor-Ziel ist ohne Login gar nicht vorhanden).
- [ ] Vergleichende manuelle Evaluation mit aktivierter und deaktivierter Erweiterung durchführen (Vorher-/Nachher-Vergleich für die in `extension/README.md` Abschnitt 4 priorisierten Befunde).
- [ ] Studien-Build einfrieren und dokumentieren.
- [ ] Studiendesign final entscheiden: Nutzerstudie, Expert:innen-Evaluation oder transparente Mischform.
- [ ] Teilnehmergruppen korrekt definieren und Rekrutierung abschließen.
- [ ] Consent, Datenschutz, Aufgaben, Fragebogen und SUS vorbereiten.
- [ ] Studie durchführen und Daten anonymisiert erfassen.
- [ ] Ergebnisse primär deskriptiv auswerten.
- [ ] Diskussion, Limitationen, Fazit und Abstract auf Basis finaler Daten schreiben.

## Medium Priority

- [x] Playwright-Testprojekt für reproduzierbare Fokus- und Shortcut-Tests einrichten. (`extension/tests/`, 8 Smoke-Tests gegen microsoft/vscode inkl. Soft-Navigation- und Inertness-Regression für die Aktivierungslogik; ersetzt keine manuelle Keyboard-only-/NVDA-Prüfung)
- [ ] Axe-Scans für Basiszustände und Extension-Oberfläche einrichten.
- [ ] Browser-, OS-, NVDA- und Plattformversionen für alle neuen Testläufe dokumentieren.
- [ ] Testdaten und Startzustände für GitHub und GitLab reproduzierbar beschreiben.
- [ ] Abbildung 1 bis 3 in finaler Auflösung, konsistenter Markierung und korrekter Caption einfügen.
- [ ] Weitere Screenshots nur für zentrale, schwer verständliche Befunde ergänzen.
- [ ] Jede Severity einzeln begründen; keine unklare Bandbreite S1–S3.
- [ ] Positive Patterns gleichwertig dokumentieren.
- [x] Prototyp-README mit Installation, Shortcuts, Grenzen und Testanleitung schreiben. (`extension/README.md`)
- [ ] Architekturdiagramm der Extension erstellen, falls es die Implementierung erklärt.
- [ ] Nutzerstudienkapitel mit Stichprobe, Aufgaben, Ablauf, Instrumenten und Auswertung erstellen.
- [ ] Proxy- und Zielgruppenresultate getrennt oder klar gekennzeichnet auswerten.
- [ ] Code, Fragebogen, Aufgaben, Consent und anonymisierte Rohdaten für Anhang vorbereiten.
- [ ] Quellenverzeichnis gegen `REFERENCES.md` prüfen.
- [ ] Alle Quellen im Text verwenden und verwaiste Einträge entfernen.
- [ ] Inhalts-, Abbildungs- und Tabellenverzeichnis aktualisieren.
- [ ] AI-Nutzung nach FH-Vorgaben dokumentieren.
- [ ] Endkorrektur auf Rechtschreibung, konsistente Begriffe und Genderung.

## Low Priority

- [ ] Ergänzenden CI/CD-Pipeline-Workflow evaluieren, falls er im finalen Scope bleibt.
- [ ] Plattform-ACRs systematisch mit eigenen Befunden vergleichen.
- [ ] zusätzliche DOM-Screenshots oder Accessibility-Tree-Ausschnitte erstellen.
- [ ] quantitative Kennzahl „Tab-Schritte“ für ausgewählte Aufgaben ergänzen.
- [ ] Zeit- und Erfolgsdaten mit einfachen gepaarten Tests prüfen, nur falls Datenlage ausreichend ist.
- [ ] Kapitel „Erwartete Ergebnisse“ für Endfassung mit Betreuung klären.
- [ ] finale Kapitelstruktur Plattform→Methode→Workflow oder Plattform→Workflow→Methode festlegen.

## Nice to Have

- [ ] konfigurierbare Shortcuts in der Extension
- [ ] Optionsseite
- [ ] Shortcut-Konflikterkennung
- [ ] eigenes zugängliches Markdown-Hilfepanel
- [ ] tastaturbedienbare Drag-and-Drop-Alternative
- [ ] zusätzliche GitHub-Workflows
- [ ] Export des Barrier Logs als CSV/JSON
- [ ] automatisierte Screenshot-Dokumentation aus Playwright
- [ ] CI-Pipeline für Extension-Tests
- [ ] Regressionstest gegen mehrere Chrome-Versionen
- [ ] spätere Adapter für GitLab oder Azure DevOps
