# Knowledge Base

## 1. Forschungsgegenstand

Die Bachelorarbeit untersucht Accessibility in webbasierten DevOps-Plattformen. Der Schwerpunkt liegt nicht auf IDEs, sondern auf konkreten Web-Workflows, die für Zusammenarbeit und Code-Review zentral sind.

Ursprünglich vorgesehen:

- GitHub
- GitLab
- Azure DevOps

Hauptworkflows:

- Issues beziehungsweise Work Items
- Pull Requests beziehungsweise Merge Requests

Ergänzend:

- fehlgeschlagene CI/CD-Pipeline finden

Bewertungsrahmen:

- WCAG 2.2 Level A/AA
- WAI-ARIA 1.2
- ARIA Authoring Practices
- WCAG-EM als methodische Orientierung
- EU-Richtlinien und EN 301 549 zur Einordnung

## 2. Zentrale Forschungslogik

1. Relevante Forschung und Standards untersuchen.
2. DevOps-Workflows szenariobasiert definieren.
3. Plattformen mit Keyboard-only und NVDA evaluieren.
4. DOM- und ARIA-Strukturen zur Erklärung untersuchen.
5. Befunde nach Plattform, Workflow, Nutzergruppe, WCAG und Severity klassifizieren.
6. positive Beispiele ebenfalls dokumentieren.
7. wiederkehrende Muster und Plattformunterschiede ableiten.
8. GitHub-Barrieren für einen Prototyp priorisieren.
9. Prototyp in einer kleinen Nutzerstudie vergleichen.

## 3. GitHub – Keyboard-only-Erkenntnisse

### 3.1 Issues-Liste

Beobachtung:

- nur ein Issue-Eintrag war direkt im Tab-Flow
- weitere Einträge hatten `tabindex="-1"`
- Navigation war nicht zuverlässig
- Einträge wurden teilweise übersprungen
- Fokus sprang teilweise in Richtung Footer
- Verhalten änderte sich abhängig von Reload, Open/Closed-Wechsel und vorheriger Mausinteraktion

Interpretation:

- roving `tabindex` ist nicht grundsätzlich falsch
- das Problem ist die inkonsistente Implementierung beziehungsweise das nicht reproduzierbare Verhalten
- vorläufiger Bezug: WCAG 2.1.1 und 2.4.3
- vorläufige Severity: S1

Offen:

- mit aktuellem GitHub-Zustand erneut reproduzieren
- echte Aufgabenblockade dokumentieren
- Pfeiltastennavigation und Fokusziel-Aktualisierung genau protokollieren

### 3.2 Filter-Toolbar

Beobachtung:

- „Author“ war per Tab erreichbar
- Labels, Projects, Milestones, Assignees und Sortierung waren teilweise aus der Tab-Reihenfolge entfernt
- Tab verließ die Toolbar teilweise, bevor alle sichtbaren Controls erreicht wurden

Interpretation:

- zentrale Filterfunktion kann für Keyboard-only-Nutzer:innen schwer oder nicht direkt erreichbar sein
- vorläufiger Bezug: 2.1.1 und 2.4.3
- vorläufig S1

Offen:

- prüfen, ob Toolbar als Composite Widget absichtlich mit Pfeiltasten bedient wird
- konkrete Reproduktion und Exit-Verhalten dokumentieren

### 3.3 Zustandsabhängiger Fokus

Beobachtung:

- nach Klick auf ein Issue änderte sich das Tab-Verhalten
- Fokus blieb an aktiven Elementen hängen oder verhielt sich anders

Interpretation:

- fehlende Vorhersehbarkeit und Reproduzierbarkeit
- vorläufig 2.4.3, S1

### 3.4 Markdown-Toolbar

Beobachtung:

- sichtbare Formatierungsbuttons H, B, I, Listen usw. waren nicht direkt per Tab erreichbar
- Buttons hatten `tabindex="-1"`

Interpretation:

- alternative Bedienwege können existieren
- Severity hängt davon ab, ob die Aufgabe ohne die Buttons sinnvoll abgeschlossen werden kann
- vorläufig 2.1.1 und 2.4.3, S1

Offen:

- prüfen, ob Pfeiltasten oder Shortcuts vorgesehen sind
- S1 kritisch hinterfragen, falls Editorfunktion ohne Toolbar vollständig nutzbar bleibt

### 3.5 Toolbars und Action-Bars in Pull Requests

Beobachtung:

- ähnliche Muster wie bei Issues
- sichtbare Buttons teilweise aus Tab-Reihenfolge
- Fokus konnte an einzelnen Elementen hängen

Problem im bisherigen Text:

- Severity wurde als Bandbreite S1–S3 beschrieben

Verbesserung:

- konkrete Instanzen trennen
- jeder Instanz genau eine Severity geben

### 3.6 Korrekte Patterns

PR-Header:

- `role="tablist"` und `role="tab"`
- ein aktiver Tab im Tab-Flow
- Pfeiltastennavigation
- als korrektes Pattern S4 dokumentiert

Dropdown-Menüs:

- Pfeiltastennavigation innerhalb des Menüs
- Tab verlässt Menü
- korrekt, sofern Fokus beim Öffnen, Schließen und Verlassen stimmt

Sidebar:

- Mischung aus Menü, Tablist und Listbox kann korrekt sein
- problematisch nur bei Fokus-, Exit- oder Ankündigungsfehlern

## 4. GitHub – DOM-/ARIA-Hypothesen

Frühe Analyse nannte folgende mögliche Probleme:

- Icon-only Buttons ohne zugänglichen Namen
- `aria-labelledby` auf Tooltip mit `aria-hidden="true"`
- systemisches Tooltip-als-Label-Muster
- überladene `aria-label` in der Issues-Liste
- semantisch unsaubere Listenstruktur
- leere ARIA-Attribute

Späterer NVDA-Test fand in den überprüften Issues-Bereichen keine eindeutige Screenreader-Barriere.

Daher gilt:

- Diese Punkte sind **Hypothesen oder historische DOM-Beobachtungen**, keine bestätigten aktuellen Ergebnisse.
- Sie müssen gegen aktuellen Accessibility Tree und NVDA erneut geprüft werden.
- Bei Widerspruch hat das reproduzierbare aktuelle Verhalten Vorrang.

## 5. GitHub – NVDA-Erkenntnisse

Getestete Bereiche:

- globale Navigation
- Issues-Liste
- Filterbereich
- Issue-Detailansicht
- Footer
- Kommentarbereich
- Sidebar
- Reactions-Menü

Beobachtungen:

- grundlegende Elemente wurden verständlich angekündigt
- „Milestones“ hatte klaren Namen und Rolle Link
- Reactions-Menü wurde als Menü/Submenü angekündigt
- Profilbild, Nutzername und Zeitangabe wurden vorgelesen
- UI-Begriffe wurden teilweise englisch beziehungsweise mit deutschem Sprachklang ausgesprochen
- englische Aussprache ist bei englischer UI nicht automatisch ein GitHub-Fehler
- manche Elemente lieferten sehr viel Kontext

Bewertung:

- überwiegend S4 positiv
- vereinzelt S3-Beobachtung zur Informationsdichte
- kein eindeutiger WCAG-Verstoß aus der Informationsmenge abgeleitet

Offen:

- Pull-Request-Workflow mit NVDA
- dynamische Statusmeldungen
- längere Dialog- und Review-Interaktionen

## 6. GitLab – Work Items

### 6.1 Abgrenzung

GitLab verwendet in der getesteten Oberfläche „Work items“ als Issues-Äquivalent.

Primärer Vergleich:

- Plan → Work items

Nicht primär:

- Issue boards

Begründung:

- Work-Items-Liste ist besser mit GitHub Issues vergleichbar
- Boards bringen zusätzliche Board-, Spalten- und Drag-and-Drop-Interaktionen in den Scope

### 6.2 Keyboard-only

Beobachtung:

- Topbar: globale Suche, Plus/Create und Profil erreichbar
- linke Projekt-Sidebar ließ sich vollständig durchlaufen
- Hauptpanel war erreichbar
- Reihenfolge insgesamt stabil

Filter-/Suchbereich:

- Fokus gelangte per Tab hinein
- innerhalb des Token-/Filter-Widgets waren Pfeiltasten und Enter nötig
- danach konnte Tab-Navigation fortgesetzt werden

Vorläufige Bewertung:

- als S3 kombiniertes Interaktionsmodell dokumentiert

Wichtige Korrektur:

- Pfeiltasten innerhalb einer Combobox/Listbox können korrekt sein
- zu prüfen sind Rolle, Ansage, Fokus, Escape, Auswahl und Exit
- WCAG 3.2.3 ist dafür nicht automatisch passend

### 6.3 Abbildung

Screenshot zeigt:

- Work-Items-Liste
- Filterleiste mit Token „State is Any“
- geöffnetes Dropdown mit Assignee, Author, Confidential, Contact, Label usw.
- rote Rahmen um Filterleiste und Dropdown

## 7. GitLab – offene Bereiche

- Merge Requests Keyboard-only
- Work Items NVDA
- Merge Requests NVDA
- genaue DOM-/ARIA-Analyse
- automatisierte Tests

## 8. Azure DevOps

Azure DevOps ist verpflichtender Bestandteil des finalen Scopes.

Vollständig offen und noch durchzuführen:

- Work Items/Boards Keyboard-only
- Work Items/Boards NVDA
- Pull Requests Keyboard-only
- Pull Requests NVDA
- DOM-/ARIA-Analyse der relevanten Zustände
- Screenshots und Barrier-Log-Einträge
- Integration in Plattformvergleich, Diskussion, Limitationen und Fazit

Historischer Kontext:

- Zwischenzeitlich wurde aus Zeitgründen diskutiert, Azure zu reduzieren oder zu streichen.
- Diese Alternative wurde verworfen.
- Der aktuelle verbindliche Stand lautet: Azure bleibt enthalten und muss vollständig bearbeitet werden.

## 9. Severity-Modell

### S1 kritisch

- nicht zuverlässig oder praktisch nicht durchführbar
- Blocker oder Abbruch

### S2 hoch

- grundsätzlich möglich
- stark eingeschränkt
- deutliche Umwege oder Effizienzverluste

### S3 mittel

- machbar
- umständlich oder inkonsistent
- Workaround vorhanden

### S4 Beobachtung/positiv

- kein klarer Fehler
- korrektes Pattern oder kontextabhängiges Verhalten

Lektor-Feedback:

- Definitionen nicht nur als Halbsatz
- ungefähr zwei erklärende Sätze pro Stufe

## 10. Screenshots und Abbildungen

### Abbildung 1

GitHub Issues-Übersicht:

- Issues-Liste markiert
- Filter-Toolbar markiert
- Screenshot zeigt Ort der Probleme, nicht den Fokusverlauf selbst

### Abbildung 2

GitHub Issue-Detailansicht:

- Kommentar-Editor sichtbar
- Markdown-Toolbar rot markiert

### Abbildung 3

GitLab Work Items:

- Filter-/Suchbereich rot markiert
- Token-Dropdown geöffnet

Formatdiskussion:

- Fließtext 11 pt
- Bildunterschriften 10 pt kursiv
- Abbildungsverzeichnis aktualisieren
- Screenshot direkt beim zugehörigen Befund

## 11. Methodik und Lektor-Feedback

Lektor-Feedback:

- Probleme visuell mit Screenshots zeigen
- Severity genauer definieren
- heuristische Arbeitsweise in 4.3 konkreter beschreiben

Reaktion:

- 4.3.3 „Ablauf und Dokumentation der Evaluation“ ergänzt
- reproduzierbarer Startpunkt
- Schritt-für-Schritt-Aufgaben
- Barrier Log
- Screenshots und DOM-Hinweise
- Zustandswechsel erneut prüfen

## 12. Kapitelstruktur

Aktueller Proposal-Aufbau:

- Plattform
- Methode
- Workflow

Beispiel:

- GitHub Keyboard-only
  - Issues
  - Pull Requests
- GitHub NVDA
- GitLab Keyboard-only
  - Work Items
  - Merge Requests
- GitLab NVDA

Diskussion:

- beide Methoden sollen beide Workflows abdecken
- alternative Endstruktur wäre Plattform → Workflow → Methode
- keine endgültige Strukturentscheidung

Weitere offene Strukturfrage:

- Kapitel 5 „Erwartete Ergebnisse“ wurde für QG2 beibehalten
- Nutzer wollte beim Lektor fragen, ob es für Endfassung entfernt werden soll

## 13. Prototyp

### Beschlossener Scope

- nur GitHub
- Issues und Pull Requests

### Ziel

- zentralen Fokus schneller erreichbar machen
- Orientierung verbessern
- messbaren Mehrwert erzeugen

### MVP-Ideen

- Shortcuts zu Filter, Liste, Editor und PR-Bereichen
- Hilfe-Overlay
- Fokus-Hervorhebung

### Verworfene beziehungsweise riskante Idee

- GitHubs internes roving-`tabindex` vollständig überschreiben

Begründung:

- hoher Aufwand
- fragil bei UI-Änderungen
- Risiko neuer Accessibility-Probleme

### Weitere mögliche Features

- ARIA-Ergänzungen
- Markdown-Ersatztoolbar
- tastaturbedienbare Drag-and-Drop-Alternative
- Settings

## 14. Nutzerstudie

Proposal:

- etwa 6–10 Personen
- möglichst inklusive Entwickler:innen mit Seh- oder Motorikbeeinträchtigungen
- Aufgaben ohne und mit Erweiterung
- Zeit, Erfolgsquote und subjektive Zufriedenheit
- primär deskriptive Auswertung

Späterer Rekrutierungsstand im Chat:

- zwei fixe Zusagen
- eventuell dritte Person
- Wunschgröße eher sechs

Diskutierte Lösung:

- echte Zielgruppen-/Accessibility-nahe Teilnehmende
- ergänzende Studienkolleg:innen als Proxy-/Convenience-Gruppe

Nicht erlaubt:

- Studienkolleg:innen als echte Screenreader-Nutzer:innen oder Menschen mit Beeinträchtigung darstellen
- alle Gruppen gemeinsam interpretieren, ohne Unterschiede auszuweisen

Empfehlung:

- Pilotstudie oder explorative Studie
- getrennte Auswertung oder klare Kennzeichnung
- P01, P02 usw.
- Consent und Datenschutz

## 15. Zeitplanung

Historische Schätzung im Chat:

- fehlende Tests ohne Azure: ungefähr ein konzentrierter Arbeitstag plus Dokumentation
- sinnvoller GitHub-MVP: mehrere konzentrierte Arbeitstage
- Studie und Auswertung: mehrere Termine und Schreibarbeit
- Rest der Endfassung: Diskussion, Fazit, Abstract, Anhang, Verzeichnisse, Quellen und Korrektur

Historische Deadline-Diskussion:

- Checkpoint 28. April
- Endabgabe 19. Mai

Diese Daten sind nicht als aktueller Termin zu verwenden.

## 16. Literatur und Quellen

Die 16 Proposal-Quellen sind vollständig in `REFERENCES.md` dokumentiert.

Kernquellen:

- WCAG 2.2
- Mealin & Murphy-Hill
- CodeTalk
- Accessibility of UI Frameworks and Libraries
- Programming by Voice
- Keyboard Accessibility Failures in Web Applications
- Accessibility Issues in Popular GitHub Projects
- EU 2016/2102
- EU 2019/882
- EN 301 549
- GitHub, GitLab und Microsoft ACRs
- WCAG-EM
- WAI-ARIA 1.2
- ARIA APG

## 17. Widersprüche und Unsicherheiten

### Drei Plattformen versus reduzierte Evaluation

- Proposal: GitHub, GitLab und Azure DevOps
- Historische Diskussion: Azure aus Zeitgründen reduzieren oder streichen
- Verbindliche Entscheidung: Azure bleibt im Scope
- Status: Widerspruch aufgelöst; der gesamte Azure-Testteil ist noch offen und verpflichtend

### GitHub Screenreader-DOM-Probleme

- frühe DOM-Analyse: mehrere mögliche ARIA-Probleme
- späterer NVDA-Test: keine klare Issues-Barriere
- Status: alte Hypothesen erneut prüfen

### GitLab Filter

- vorläufig S3 wegen Wechsel zu Pfeiltasten
- kann korrektes Combobox-/Listbox-Pattern sein
- Status: verifizieren

### Studie

- Proposal: 6–10 Personen
- reale Rekrutierung: 2–3 Zielgruppen-/Expertise-nahe Zusagen
- Proxy-Gruppe möglich
- Status: Design finalisieren

### Chapter 6

- vorläufige Ergebnisse sagen anfangs nur Keyboard-only
- NVDA-Ergebnisse sind bereits enthalten
- Einleitung muss beide Methoden korrekt abbilden

## 18. Separate administrative Arbeit

Im Chat wurde zusätzlich eine Berufspraxisreflexion erstellt. Sie ist nicht Teil der Bachelorarbeit und sollte nicht in dieses Repository oder die Forschungsdaten gemischt werden.

<!-- OFFICIAL_FH_GUIDELINES START -->
## 18. Offizielle FH-Guidelines

Die hochgeladene Unterlage `Bachelorarbeit: Prozess und Vorgehen` ist nun als offizielle Projektquelle hinterlegt.

Zentrale Konsequenzen:

- zwei positive Quality Gates sind Voraussetzung für die Abgabe,
- QG2 benötigt vollständige Introduction und Methodology sowie erste Ergebnisse,
- die Arbeit dokumentiert ein nicht triviales Engineering-Artefakt,
- Bedarf, Neuheit und Abgrenzung zu Standardansätzen müssen argumentiert werden,
- der Prozess umfasst Anforderungen, Spezifikation, Implementierung und Testing,
- Methoden und Werkzeuge müssen begründet und Alternativen diskutiert werden,
- das Artefakt muss getestet und evaluiert werden,
- Richtstruktur: Introduction 15 %, Methodology 20 %, Solution 50 %, Discussion 15 %,
- ungefähr 6.000 Wörter für die Hauptteile als Richtwert,
- Methodik und Ergebnisse/Diskussion tragen jeweils 40 von 100 Bewertungspunkten,
- Haupttext muss ohne Anhang verständlich sein,
- Details stehen in `docs/OFFICIAL_FH_GUIDELINES.md`,
- Original-PDF liegt unter `docs/sources/`.
<!-- OFFICIAL_FH_GUIDELINES END -->
