# Decisions

## D-001 – WCAG-Version

- **Entscheidung:** WCAG 2.2 Level A/AA ist der normative Bewertungsrahmen.
- **Begründung:** Die Forschungsfrage und das Proposal beziehen sich ausdrücklich auf WCAG 2.2; neue Erfolgskriterien und aktueller Stand sollen berücksichtigt werden.
- **Alternativen:** WCAG 2.1; vollständige AAA-Bewertung.
- **Status:** beschlossen.

## D-002 – Hauptworkflows

- **Entscheidung:** Issues/Work Items und Pull/Merge Requests sind die zwei primären Workflows.
- **Begründung:** zentrale DevOps-Aufgaben, gut zwischen Plattformen vergleichbar und für Prototyp relevant.
- **Alternativen:** CI/CD als dritter gleichwertiger Workflow.
- **Status:** beschlossen; CI/CD nur ergänzend.

## D-003 – Keyboard-Testbrowser

- **Entscheidung:** Google Chrome wird für Keyboard-only-Tests verwendet.
- **Begründung:** bisherige Tests wurden bereits in Chrome durchgeführt; konsistente Testumgebung.
- **Alternativen:** Firefox, Edge, Safari.
- **Status:** beschlossen.

## D-004 – Screenreader

- **Entscheidung:** NVDA unter Windows in Kombination mit Chrome.
- **Begründung:** kostenlos, weit verbreitet und bereits im Projekt verwendet.
- **Alternativen:** JAWS.
- **Status:** beschlossen; JAWS nicht primär vorgesehen.

## D-005 – Beide Methoden decken beide Workflows ab

- **Entscheidung:** Keyboard-only und NVDA sollen grundsätzlich jeweils Issues/Work Items und Pull/Merge Requests untersuchen.
- **Begründung:** vollständige Vergleichsmatrix und Vermeidung methodischer Lücken.
- **Alternativen:** NVDA nur Issues; Keyboard-only beide Workflows.
- **Status:** beschlossen, aber noch nicht vollständig umgesetzt.

## D-006 – GitLab Work Items als Issues-Äquivalent

- **Entscheidung:** GitLab „Work items“ ist der primäre Issues-Vergleich.
- **Begründung:** entspricht der klassischen Issues-Liste besser als Issue Boards.
- **Alternativen:** Issue Boards als primärer Workflow.
- **Status:** beschlossen.

## D-007 – Issue Boards nicht vertiefen

- **Entscheidung:** Issue Boards nur optional betrachten.
- **Begründung:** Board-Logik, Spalten und Drag-and-Drop würden Scope und Komplexität erhöhen.
- **Alternativen:** vollständige Board-Evaluation.
- **Status:** beschlossen für den Minimal-Scope.

## D-008 – Severity-Modell

- **Entscheidung:** vier Kategorien S1 bis S4 mit ausführlicher Definition.
- **Begründung:** Lektor verlangte präzisere Einstufung; Workflow-Auswirkung soll sichtbar sein.
- **Alternativen:** drei Stufen; reine WCAG-Klassifikation.
- **Status:** beschlossen.

## D-009 – S4 ist Beobachtung/positiv

- **Entscheidung:** S4 dokumentiert korrekte oder kontextabhängige Patterns und ist kein Fehler.
- **Begründung:** positive Beispiele und korrekte ARIA-Patterns sollen explizit erfasst werden.
- **Alternativen:** S4 als niedrige Fehlerschwere.
- **Status:** beschlossen.

## D-010 – Screenshots in Ergebniskapitel

- **Entscheidung:** zentrale Probleme werden visuell mit markierten Screenshots belegt.
- **Begründung:** direktes Lektor-Feedback; erleichtert Verständnis.
- **Alternativen:** nur Text und DOM-Snippets.
- **Status:** beschlossen; drei Abbildungen vorhanden.

## D-011 – Heuristischer Ablauf wird explizit dokumentiert

- **Entscheidung:** Abschnitt 4.3.3 „Ablauf und Dokumentation der Evaluation“.
- **Begründung:** Lektor wollte konkreter wissen, wie die heuristische Evaluation durchgeführt wird.
- **Alternativen:** Ablauf nur in 4.3.1 und 4.3.2 verteilen.
- **Status:** beschlossen und im Proposal ergänzt.

## D-012 – Barrier Log

- **Entscheidung:** alle Befunde werden strukturiert in einem Barrier Log erfasst.
- **Begründung:** Vergleichbarkeit, Nachvollziehbarkeit und Reproduzierbarkeit.
- **Alternativen:** nur Fließtext in Kapitel 6.
- **Status:** beschlossen; vollständige Umsetzung offen.

## D-013 – Quellcode allein reicht nicht für Screenreader-Befund

- **Entscheidung:** DOM kann Risiken zeigen, Screenreader-Barrieren müssen mit NVDA verifiziert werden.
- **Begründung:** tatsächliche Accessible-Name-Berechnung und Ausgabe können vom Roh-DOM abweichen.
- **Alternativen:** reine statische DOM-Analyse.
- **Status:** beschlossen.

## D-014 – GitHub Issues NVDA-Ergebnis

- **Entscheidung:** in den überprüften Bereichen keine eindeutige Screenreader-Barriere behaupten.
- **Begründung:** Navigation, Namen und Rollen wurden überwiegend korrekt angekündigt.
- **Alternativen:** frühe DOM-Hypothesen als bestätigte Fehler übernehmen.
- **Status:** beschlossen für den bisherigen Teststand.

## D-015 – Informationsdichte bei NVDA

- **Entscheidung:** lange Ansagen als S3-Beobachtung dokumentieren, nicht automatisch als WCAG-Verstoß.
- **Begründung:** Information kann funktional korrekt und notwendig sein; Auswirkung ist eher Effizienz/Orientierung.
- **Alternativen:** 1.3.1 oder 4.1.2 als eindeutigen Verstoß deklarieren.
- **Status:** beschlossen, vorläufig.

## D-016 – GitLab Filterbefund

- **Entscheidung:** vorläufig S3 wegen notwendiger Pfeiltasten/Enter-Interaktion.
- **Begründung:** Nutzer muss vom vorherrschenden Tab-Modell wechseln.
- **Alternativen:** S4 korrektes Combobox-/Listbox-Pattern.
- **Status:** **unter Prüfung**; darf nicht final bleiben, ohne Rollen, Ansagen und Exit-Verhalten zu testen.

## D-017 – Prototype-Plattform

- **Entscheidung:** Browser-Erweiterung nur für GitHub.
- **Begründung:** GitHub enthält die priorisierten Befunde und erlaubt fokussierte Umsetzung.
- **Alternativen:** plattformübergreifende Extension; GitLab-Prototyp.
- **Status:** beschlossen.

## D-018 – Prototype-Workflows

- **Entscheidung:** Prototyp unterstützt Issues und Pull Requests.
- **Begründung:** genau die zwei Hauptworkflows der Arbeit.
- **Alternativen:** nur Issues; zusätzlich CI/CD.
- **Status:** beschlossen.

## D-019 – Prototype-MVP

- **Entscheidung:** Fokus-Shortcuts, Hilfe-Overlay und Fokus-Hervorhebung als Kern.
- **Begründung:** kleiner, stabiler, messbarer Mehrwert; realistisch implementierbar.
- **Alternativen:** tiefes Patchen von roving tabindex; komplette Ersatztoolbar.
- **Status:** konzeptionell beschlossen, Implementierung offen.

## D-020 – Kein tiefes Überschreiben von GitHubs Fokusmanagement im MVP

- **Entscheidung:** internes roving tabindex nicht umfassend ersetzen.
- **Begründung:** fragil, hoher Aufwand, hohes Regressionsrisiko.
- **Alternativen:** vollständige DOM-/Fokus-Reparatur.
- **Status:** beschlossen.

## D-021 – Studienkolleg:innen als Proxy

- **Entscheidung:** Studienkolleg:innen dürfen ergänzend teilnehmen, wenn sie transparent als Proxy-/Convenience-Gruppe ausgewiesen werden.
- **Begründung:** Rekrutierung echter Zielgruppenpersonen ist schwierig; Keyboard-only-Effizienz kann ergänzend getestet werden.
- **Alternativen:** nur echte Screenreader-/Zielgruppenpersonen; alle Teilnehmenden gemeinsam ausweisen.
- **Status:** methodisch zulässig, finales Studiendesign offen.

## D-022 – Keine Falschklassifikation von Teilnehmenden

- **Entscheidung:** Personen ohne Beeinträchtigung oder Assistive-Tech-Erfahrung dürfen nicht als echte Zielgruppenpersonen oder Expert:innen dargestellt werden.
- **Begründung:** wissenschaftliche Transparenz und Vermeidung irreführender Generalisierung.
- **Alternativen:** simulierte Einschränkung als Ersatz für Zielgruppe.
- **Status:** beschlossen.

## D-023 – Studie primär deskriptiv

- **Entscheidung:** Auswertung primär deskriptiv; einfache gepaarte Tests nur bei ausreichender Datenlage.
- **Begründung:** kleine Stichprobe.
- **Alternativen:** inferenzstatistische Hauptauswertung.
- **Status:** beschlossen.

## D-024 – Azure DevOps

- **Entscheidung:** Azure DevOps bleibt verpflichtender Bestandteil des finalen Scopes.
- **Begründung:** Azure ist Teil der Forschungsfrage und des vorgesehenen Plattformvergleichs; der gesamte Azure-Teil wurde ausdrücklich als noch zu erledigender Pflichtpunkt festgelegt.
- **Alternativen:** aus Zeitgründen reduzieren, in den Ausblick verschieben oder vollständig streichen.
- **Status:** beschlossen. Die Alternativen sind verworfen; Work Items/Boards und Pull Requests müssen jeweils Keyboard-only und mit NVDA getestet werden.

## D-025 – Kapitel 5 „Erwartete Ergebnisse“

- **Entscheidung:** vorläufig beibehalten und beim Lektor nachfragen.
- **Begründung:** Proposal-Struktur versus Endfassung unklar.
- **Alternativen:** in Endfassung entfernen oder in Forschungsdesign integrieren.
- **Status:** offen.

## D-026 – Kapitel-6-Struktur

- **Entscheidung:** aktuelle Struktur ist verwendbar, solange beide Methoden beide Workflows abdecken.
- **Begründung:** Plattform- und Methodenvergleich bleibt nachvollziehbar.
- **Alternativen:** Plattform → Workflow → Methode.
- **Status:** offen für finale Glättung.

## D-027 – Playwright und Axe

- **Entscheidung:** als ergänzende Testebenen in die Knowledge Base aufnehmen.
- **Begründung:** aktuelle Anforderung zur langfristigen Claude-Code-Arbeit und Reproduzierbarkeit.
- **Alternativen:** ausschließlich manuelle Tests.
- **Status:** geplant, noch nicht implementiert.

<!-- FH_DECISIONS START -->
## D-028 – Offizielle FH-Guidelines als verbindliche Grundlage

- **Entscheidung:** Die hochgeladene Unterlage `Bachelorarbeit: Prozess und Vorgehen` und die daraus erstellte Datei `docs/OFFICIAL_FH_GUIDELINES.md` sind verbindliche Grundlagen für Prozess, Struktur und Bewertung.
- **Begründung:** Die Unterlage enthält die offiziellen Quality-Gate-Anforderungen, Bewertungskriterien und CS-spezifischen Erwartungen an Artefakt, Methodik, Solution, Discussion und Appendix.
- **Alternativen:** ausschließlich auf frühere Chat-Zusammenfassungen oder allgemeine Annahmen vertrauen.
- **Status:** beschlossen.

## D-029 – Browser-Erweiterung als technisches Artefakt

- **Entscheidung:** Die GitHub-Browser-Erweiterung wird als nicht triviales Engineering-Artefakt der Bachelorarbeit dokumentiert.
- **Begründung:** Die FH-Guidelines verlangen Prozess und Ergebnis eines technischen Artefakts sowie Anforderungen, Spezifikation, Implementierung, Testing und Evaluation.
- **Alternativen:** Extension nur als kleine Ergänzung ohne vollständige Engineering-Dokumentation behandeln.
- **Status:** beschlossen.
<!-- FH_DECISIONS END -->
