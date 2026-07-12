# Claude Instructions

Diese Datei ist als vollständige Arbeitsanweisung für Claude Code gedacht. Eine identische Fassung liegt im Projekt-Root als `CLAUDE.md`.

## 1. Projektkontext

Du arbeitest an einer Bachelorarbeit zur Barrierefreiheit ausgewählter DevOps-Weboberflächen. Untersucht werden GitHub, GitLab und Azure DevOps. Azure DevOps ist Bestandteil des finalen Scopes; der gesamte Azure-Testteil ist noch offen. Der normative Rahmen ist WCAG 2.2 Level A/AA. Die Hauptmethoden sind Keyboard-only und NVDA in Google Chrome unter Windows.

Der Prototyp ist eine Browser-Erweiterung ausschließlich für GitHub und ausschließlich für die Workflows Issues und Pull Requests.

Lies vor Änderungen mindestens:

- `docs/PROJECT_OVERVIEW.md`
- `docs/RESEARCH_GUIDELINES.md`
- `docs/TESTING_GUIDELINES.md`
- `docs/EXTENSION_SPEC.md`
- `docs/DECISIONS.md`
- `docs/TODO.md`
- `docs/REFERENCES.md`
- `docs/OFFICIAL_FH_GUIDELINES.md`

## 2. Oberste Regeln

1. Erfinde niemals Forschungsergebnisse, Tests, Quellen, Teilnehmende, Messwerte oder WCAG-Zuordnungen.
2. Trenne bestätigte Befunde, Hypothesen und offene Punkte.
3. Verändere Forschungsfrage, Scope, Severity oder Methodik nicht ohne ausdrückliche Zustimmung.
4. Automatisierte Tests ersetzen keine manuellen Keyboard- und NVDA-Tests.
5. Quellcode allein beweist keine Screenreader-Barriere.
6. Korrekte ARIA-Patterns dürfen nicht als Fehler behandelt werden.
7. Schreibe keine Aussagen in die Thesis, die nicht durch Quelle oder eigene dokumentierte Daten gestützt sind.
8. Verwende WCAG 2.2, nicht WCAG 2.1, außer eine Quelle wird historisch diskutiert.
9. Behandle S4 als Beobachtung/positiv, nicht als Fehlerschwere.
10. Keine personenbezogenen oder sensiblen Daten in Code, Logs, Screenshots oder Testfixtures committen.

## 3. Wann Rückfragen nötig sind

Frage nach, bevor du:

- Azure DevOps aus dem Scope entfernst oder dessen verpflichtenden Testumfang reduzierst
- Forschungsfrage oder Unterfragen änderst
- neue Teilnehmergruppen definierst
- Proxy-Teilnehmende als Expert:innen klassifizierst
- einen Befund einer WCAG-Anforderung zuordnest, wenn die Begründung nicht eindeutig ist
- Severity S1 oder S2 vergibst
- neue Abhängigkeiten oder Frameworks einführst
- Shortcuts festlegst, die mit Browser oder GitHub kollidieren könnten
- GitHubs internes Fokusmanagement überschreibst
- Daten speicherst oder Telemetrie einbaust
- Thesis-Inhalte als „final“ markierst

Keine Rückfrage nötig bei:

- kleinen Refactorings ohne Verhaltensänderung
- Dokumentationskorrekturen ohne neue wissenschaftliche Aussagen
- zusätzlichen Tests für bereits bestätigtes Verhalten
- Formatierungs- und Lint-Fixes

## 4. Wissenschaftliche Regeln

- Verwende primär W3C-, EU-, ETSI-, IEEE-, ACM- und offizielle Plattformquellen.
- Zitiere belegpflichtige Aussagen unmittelbar.
- Übernimm DOI, URL, Autor:innen und Titel exakt.
- Markiere fehlende Metadaten statt sie zu ergänzen.
- Formuliere Ergebnisse auf den getesteten Zustand begrenzt.
- Vermeide „beweist“, „immer“, „alle Nutzer:innen“ und „vollständig barrierefrei“.
- Kleine Stichproben sind explorativ und primär deskriptiv.
- Studienkolleg:innen ohne Beeinträchtigung sind Proxy-/Convenience-Teilnehmende.
- Eigene Beobachtungen benötigen Barrier-Log-ID, Reproduktionsschritte und Testumgebung.

## 5a. Verbindliche FH-Regeln

- `docs/OFFICIAL_FH_GUIDELINES.md` und die dort referenzierte Original-PDF sind die verbindliche interne Grundlage für Prozess, Aufbau und Bewertung.
- Beide Quality Gates müssen positiv abgeschlossen sein, bevor die Arbeit abgegeben werden darf.
- Für Quality Gate 2 muss eine Zwischenversion mit vollständigem Introduction- und Methodenteil sowie ersten Ergebnissen vorliegen.
- Die QG2-Präsentation fokussiert Methodendurchführung, Preliminary Results und Diskussion.
- Empfohlene Dauer: 5 Minuten Präsentation und 10 bis 15 Minuten Fragen.
- Die Arbeit muss Engineering-Kompetenz anhand eines nicht trivialen Artefakts dokumentieren.
- Für das Projekt ist die GitHub-Browser-Erweiterung das technische Artefakt.
- Begründe den potenziellen Nutzen sowie, warum Standardansätze die ausgewählten Probleme nicht ausreichend lösen.
- Dokumentiere den Entwicklungsprozess strukturiert: Requirements Engineering, Spezifikation, Implementierung und Testing.
- Begründe Methoden, Technologien und Werkzeuge anhand nachvollziehbarer Auswahlkriterien und diskutiere Alternativen.
- Evaluiere das Artefakt technisch und hinsichtlich Usability beziehungsweise Accessibility-Wirkung.
- Richtwert für die Hauptteile 1 bis 4: ungefähr 6.000 Wörter.
- Richtstruktur: Introduction 15 %, Methodology 20 %, Solution 50 %, Discussion 15 %. Diese Werte sind Orientierung, keine starre Vorgabe.
- Der Solution-Teil dokumentiert User Requirements, Funktionalität, UI, Architektur, Komponenten, Schnittstellen und repräsentative Screenshots.
- Die Discussion behandelt Potenziale, Einschränkungen, Verbesserungen, Übertragbarkeit und Erkenntnisse aus dem Entwicklungsprozess.
- Der Haupttext muss ohne Anhang verständlich bleiben; Code, zusätzliche Screenshots und Interviewtranskripte dürfen in den Anhang.
- Bewertungsschwerpunkte: Methodik und Lösungsansatz 40 Punkte, Ergebnisse und Diskussion 40 Punkte; alle anderen Kriterien jeweils 5 Punkte.
- Nutze für die Arbeit den gewählten IEEE-nahen Zitierstil konsequent.
- Dokumentiere generative AI nur nach den tatsächlich geprüften FH-Regeln. Die separate verlinkte AI-Richtlinie darf nicht aus ihrem Titel oder Link rekonstruiert werden.
- Prüfe vor einer finalen Ausgabe Rechtschreibung, Genderung, Querverweise und alle Verzeichnisse.

## 5. WCAG-Regeln

- Primärstandard: WCAG 2.2 A/AA.
- Häufige Kriterien im Projekt: 2.1.1, 2.4.3, 1.3.1, 4.1.2.
- Weitere Kriterien nur nach Prüfung ergänzen.
- Ein `tabindex="-1"` ist nicht automatisch ein Verstoß.
- Roving `tabindex` ist in Composite Widgets oft korrekt.
- Pfeiltastennavigation in Tabs, Menüs und Listboxen ist erwartbar.
- WCAG 3.2.3 nicht verwenden, nur weil ein Widget Pfeiltasten nutzt.
- ARIA APG ist technische Guidance, kein WCAG-Erfolgskriterium.

## 6. Coding Standards

### Allgemein

- Halte Änderungen klein, nachvollziehbar und testbar.
- Bevorzuge einfache Lösungen und geringe Abhängigkeiten.
- Folge bestehendem Projektstil; führe keinen Frameworkwechsel ohne Zustimmung durch.
- Wenn noch kein Stack festgelegt ist, verwende standardbasierte WebExtension-Technik und begründe jede zusätzliche Abhängigkeit.
- Codebezeichner und technische Kommentare auf Englisch.
- Forschungs- und Thesis-Dokumentation auf Deutsch, sofern die vorhandene Datei deutsch ist.
- Keine toten Dateien, Debug-Ausgaben oder auskommentierten Blöcke committen.
- Fehlerfälle explizit behandeln.

### Accessibility

- Native HTML vor ARIA.
- Keine positiven `tabindex`-Werte.
- Sichtbaren Fokus nicht entfernen.
- Fokus nur nach Nutzeraktion verschieben.
- Fokus nach Dialog/Overlay wiederherstellen.
- Escape-Verhalten implementieren, wo erwartet.
- Alle Icon-Buttons brauchen zugängliche Namen.
- Rollen, Namen und Zustände müssen zusammenpassen.
- Keine Keyboard-Shortcuts auslösen, während Nutzer:innen normal in Eingabefeldern schreiben, sofern nicht ausdrücklich definiert.
- Kontrast und Theme-Kompatibilität berücksichtigen.

### Selektoren

Priorität:

1. Rollen und zugängliche Namen
2. stabile Testattribute
3. semantische DOM-Struktur
4. CSS-Fallbacks

Vermeide gehashte Klassen und positionsabhängige Selektoren.

## 7. Architekturregeln

- GitHub Issues und Pull Requests als getrennte Workflow-Adapter behandeln.
- Shortcut-Logik, Zielsuche, Overlay und Styles modular trennen.
- Keine tiefgreifende Mutation des GitHub-DOM im MVP.
- Jede Fokusaktion braucht einen sicheren Fallback.
- Extension muss ohne Datenübertragung funktionieren.
- Berechtigungen im Manifest minimieren.

## 8. Testregeln

### Vor jedem Feature

- zugehörigen Barrier-Log-Eintrag oder Forschungsbedarf identifizieren
- erwartete Nutzerwirkung definieren
- Akzeptanzkriterien schreiben

### Manuell

- Keyboard-only testen
- NVDA testen, wenn zugängliche Namen, Fokus oder Dialoge betroffen sind
- GitHub-Zustände Reload, Navigation und Editor prüfen

### Playwright

- echte Tastensequenzen verwenden
- Fokusziel prüfen
- Overlay-Fokus und Fokuswiederherstellung prüfen
- robuste Selektoren verwenden
- keine vollständige Barrierefreiheit aus Testgrün ableiten

### Axe

- Extension-Oberfläche und relevante Zustände scannen
- Findings manuell prüfen
- Rule IDs und Entscheidungen dokumentieren

### Definition of Done

- Code funktioniert
- Tests bestehen
- Keyboard-only geprüft
- NVDA geprüft, wenn relevant
- Dokumentation aktualisiert
- keine unbestätigte wissenschaftliche Behauptung ergänzt

## 9. Dokumentation

Jede Feature-Dokumentation enthält:

- Problem und Barrier-Log-ID
- Zielgruppe
- betroffener Workflow
- Verhalten ohne Erweiterung
- Verhalten mit Erweiterung
- technische Umsetzung
- bekannte Grenzen
- Testfälle
- Bezug zur Studie

Jeder Befund enthält:

- Startzustand
- Schritte
- erwartet/tatsächlich
- Auswirkung
- WCAG-Bezug
- Severity
- Evidenz
- Status

## 10. Commit-Regeln

Verwende atomare Commits im Format:

`type(scope): kurze imperative Zusammenfassung`

Erlaubte Typen:

- `feat`
- `fix`
- `test`
- `docs`
- `refactor`
- `chore`
- `research`

Beispiele:

- `feat(issues): add shortcut to focus issue filter`
- `fix(overlay): restore focus after closing help dialog`
- `test(pr): cover review editor focus shortcut`
- `research(gitlab): document work item filter interaction`
- `docs(thesis): clarify severity definitions`

Commit-Regeln:

- ein Thema pro Commit
- keine erfundenen Ergebnisse in Commit-Text
- Tests im selben oder unmittelbar folgenden Commit
- keine Secrets oder personenbezogenen Daten
- Breaking Changes ausdrücklich nennen

## 11. Pull Requests und Reviews

Eine PR-Beschreibung enthält:

- Zweck
- zugehöriger Befund oder TODO
- Änderungen
- manuelle Tests
- automatisierte Tests
- Accessibility-Auswirkung
- Screenshots, falls UI betroffen
- bekannte Einschränkungen

Review-Priorität:

1. wissenschaftliche Korrektheit
2. Accessibility-Regressionen
3. Fokus- und Keyboard-Verhalten
4. Datenschutz
5. Testbarkeit
6. Wartbarkeit

## 12. Verbotene Handlungen

- Ergebnisse aus Screenshots erraten
- NVDA-Ausgaben simulieren und als echt darstellen
- ACRs als Beweis für Konformität verwenden
- Proxy-Personen als behinderte Nutzer:innen darstellen
- Severity erhöhen, um Ergebnisse stärker wirken zu lassen
- WCAG-Kriterien nur anhand von Stichwortähnlichkeit zuordnen
- GitHub-spezifische Korrektur als plattformübergreifende Lösung darstellen
- Rohdaten oder Teilnehmendennamen committen
- bestehende Thesis-Zitate ohne Quellenprüfung verändern

## 13. Arbeitsablauf

1. Relevante Knowledge-Base-Dateien lesen.
2. Task und Scope zusammenfassen.
3. Unsicherheiten markieren.
4. Bei wissenschaftlicher oder architektonischer Tragweite Rückfrage stellen.
5. Kleine Implementierung planen.
6. Tests zuerst oder gemeinsam mit Code erstellen.
7. Manuelle Accessibility-Prüfung durchführen.
8. Dokumentation und TODO aktualisieren.
9. Atomaren Commit vorbereiten.
10. Keine Aufgabe als abgeschlossen markieren, solange Evidenz fehlt.
