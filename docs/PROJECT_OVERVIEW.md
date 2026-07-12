# Project Overview

## Projektmetadaten

- **Arbeitstitel:** *Barrierefreiheit von DevOps-Weboberflächen: GitHub, GitLab und Azure DevOps für seh- und motorisch eingeschränkte Entwickler:innen*
- **Autor:** Ron Feldmann
- **Studiengang:** Bachelor Informatik (BIF), FH Technikum Wien
- **Betreuer laut Proposal:** Mag. Dr. Christian Osterbauer
- **Primäre Sprache der Arbeit:** Deutsch
- **Normativer Bewertungsrahmen:** WCAG 2.2, Konformitätsstufen A und AA
- **Proposal-Datum:** 16.01.2026
- **Status dieses Dokuments:** Konsolidierung des bisherigen Chatverlaufs und des Proposals. Aussagen zum aktuellen Stand müssen vor Verwendung mit Repository und jüngster Thesis-Version abgeglichen werden.

## Ziel der Bachelorarbeit

Die Arbeit untersucht, wie barrierefrei ausgewählte DevOps-Workflows in den Weboberflächen von GitHub, GitLab und Azure DevOps für Entwickler:innen mit Seh- oder motorischen Beeinträchtigungen sind. Die Evaluation betrachtet insbesondere die Bedienung mit Tastatur und Screenreader und ordnet beobachtete Barrieren relevanten Erfolgskriterien der WCAG 2.2 zu.

Zusätzlich soll ein lauffähiger Browser-Extension-Prototyp für GitHub entstehen. Dieser Prototyp adressiert ausgewählte, empirisch bestätigte Barrieren in den beiden zentralen Workflows „Issues“ und „Pull Requests“. Eine kleine, explorative Nutzerstudie soll untersuchen, ob die Erweiterung Aufgaben schneller, zuverlässiger oder subjektiv angenehmer macht.

## Zentrale Forschungsfrage

> Wie barrierefrei sind ausgewählte DevOps-Workflows in den Weboberflächen von GitHub, GitLab und Azure DevOps für seh- und motorisch eingeschränkte Entwickler:innen gemäß den Anforderungen der WCAG 2.2?

**Verbindlicher Scope-Hinweis:** Azure DevOps ist Bestandteil der finalen Untersuchung. Der gesamte Azure-Testblock fehlt noch und muss vollständig durchgeführt und in Ergebnisse, Vergleich, Diskussion und Fazit integriert werden.

## Unterfragen

1. Welche WCAG-2.2-Erfolgskriterien der Level A und AA sind für DevOps-Weboberflächen besonders relevant?
2. Welche Barrieren treten in ausgewählten DevOps-Workflows der untersuchten Plattformen insbesondere bei Tastatur- und Screenreader-Nutzung auf?
3. In welchen Bereichen unterscheiden sich GitHub, GitLab und Azure DevOps hinsichtlich der Barrierefreiheit?
4. Welche wiederkehrenden Accessibility-Probleme lassen sich identifizieren?

## Scope

### Primäre Zielgruppen

- Entwickler:innen mit Sehbeeinträchtigungen, insbesondere Screenreader-Nutzer:innen
- Entwickler:innen mit motorischen Beeinträchtigungen oder Keyboard-only-Nutzung
- Proxy-Teilnehmende ohne Beeinträchtigung dürfen nur ergänzend für Keyboard-only- und allgemeine Usability-Aufgaben eingesetzt werden. Sie dürfen nicht als echte Zielgruppen- oder Screenreader-Nutzer:innen dargestellt werden.

### Plattformen

- **GitHub:** vollständig untersuchen; Zielplattform des Prototyps
- **GitLab:** als Vergleichsplattform untersuchen
- **Azure DevOps:** verpflichtende dritte Vergleichsplattform; gesamter Testblock noch offen

### Workflows

1. Bearbeiten von Issues beziehungsweise GitLab Work Items
2. Erstellen und Reviewen von Pull Requests beziehungsweise Merge Requests
3. Fehlgeschlagene CI/CD-Pipeline finden – nur ergänzend, falls Zeit und Scope es erlauben

### Evaluationsmethoden

- Keyboard-only in Google Chrome
- Screenreader-Test mit NVDA unter Windows und Google Chrome
- DOM- und Accessibility-Tree-Analyse zur Erklärung beobachteter Effekte
- Geplant beziehungsweise neu angefordert: ergänzende automatisierte Checks mit Playwright und Axe; konkrete Implementierung ist noch offen

### Prototyp

- Nur für GitHub
- Deckt die beiden Workflows Issues und Pull Requests ab
- Kein Anspruch, GitHub vollständig oder plattformübergreifend zu reparieren
- Ziel ist ein kleiner, stabiler, evaluierbarer Mehrwert

## Aktueller Stand

### Methodik

Folgende Methodik ist bereits beschrieben:

- Literatur- und Dokumentenanalyse
- Ableitung szenariobasierter Nutzungsszenarien
- heuristische Evaluation
- Keyboard-only-Testverfahren
- NVDA-Testverfahren
- Ablauf und Dokumentation der Evaluation
- geplante Browser-Erweiterung
- geplante szenariobasierte Nutzerstudie

Kapitel 4.3 wurde nach Feedback des Lektors präzisiert. Die Evaluation soll pro Plattform und Szenario einen reproduzierbaren Startzustand verwenden, Beobachtungen in einem Barrier Log festhalten und Screenshots sowie DOM-Hinweise ergänzen.

### Severity-Modell

Ein vierstufiges Modell ist definiert:

- **S1 kritisch:** Workflow-Schritt nicht zuverlässig oder praktisch nicht durchführbar; Blocker oder Abbruch
- **S2 hoch:** grundsätzlich möglich, aber stark eingeschränkt, mit deutlichen Umwegen, Fehlbedienungen oder Effizienzverlust
- **S3 mittel:** machbar, aber umständlich oder inkonsistent; Workarounds vorhanden
- **S4 Beobachtung/positiv:** kein klarer Fehler; korrektes Pattern oder kontextabhängiges Verhalten

S4 ist keine eigentliche Fehlerschwere, sondern eine Kategorie für positive oder interpretativ wichtige Beobachtungen.

### GitHub – Keyboard-only

Bereits dokumentierte vorläufige Befunde:

- Issues-Liste mit inkonsistenter Tastaturnavigation und roving `tabindex`
- Filter-Toolbar mit nur teilweise per Tab erreichbaren Controls
- zustandsabhängiges Fokusverhalten nach Reload, Open/Closed-Wechsel und Mausinteraktion
- sichtbare Markdown-Toolbar-Buttons mit `tabindex="-1"`
- ähnliche Tab-/Fokus-Probleme in Toolbars und Action-Bars im Pull-Request-Kontext
- korrektes `tablist`-Pattern in PR-Header-Tabs
- grundsätzlich korrektes Pfeiltasten-Verhalten in Dropdown-Menüs

Mehrere dieser Befunde wurden als S1 oder S3 klassifiziert. Die Klassifikation muss vor der Endfassung erneut gegen reale Aufgabenauswirkung und alternative Bedienwege validiert werden.

### GitHub – NVDA

Für den Issues-Workflow wurde ein erster NVDA-Test durchgeführt:

- Navigation, Issues-Liste, Filterbereich und Issue-Detailansicht wurden insgesamt verständlich angekündigt.
- Links und Menüs hatten überwiegend sinnvolle zugängliche Namen und Rollen.
- „Milestones“ wurde als Link korrekt angekündigt.
- Das Reactions-Menü wurde als Menü beziehungsweise Submenü erkannt.
- Teilweise ist die Informationsdichte hoch, etwa bei Suchfiltern, Autor:in und Zeitstempel.
- Daraus wurde keine eindeutige WCAG-Verletzung abgeleitet; überwiegend S4, vereinzelt S3-Beobachtungen.

Der NVDA-Test für GitHub Pull Requests fehlt noch beziehungsweise ist im Chat nicht als abgeschlossen dokumentiert.

### GitLab – Keyboard-only

Für die Work-Items-Listenansicht wurde festgehalten:

- Top-Navigation, Projekt-Sidebar und Hauptbereich ließen sich grundsätzlich in nachvollziehbarer Reihenfolge per Tab durchlaufen.
- Im Filter-/Such-Widget war eine Navigation mit Pfeiltasten und Enter notwendig, bevor die Tab-Navigation sinnvoll fortgesetzt werden konnte.
- Dieser Befund wurde vorläufig als S3 eingeordnet.

Die S3-Einordnung ist zu prüfen, weil Pfeiltasten innerhalb eines Combobox-/Listbox-Patterns korrekt sein können. Entscheidend ist, ob Rolle, Zustände, Anleitung, Fokus und Exit-Verhalten verständlich und konsistent sind.

### GitLab – offene Tests

- Merge Requests, Keyboard-only
- Work Items, NVDA
- Merge Requests, NVDA

### Azure DevOps

- Azure DevOps bleibt verbindlicher Bestandteil des finalen Scopes.
- Vollständig offen und verpflichtend:
  - Work Items/Boards, Keyboard-only
  - Work Items/Boards, NVDA
  - Pull Requests, Keyboard-only
  - Pull Requests, NVDA
- Für jeden Testblock sind Barrier Log, Screenshots, DOM-/ARIA-Analyse und reproduzierbare Testschritte zu erstellen.
- Die Ergebnisse müssen anschließend in Plattformvergleich, Diskussion, Limitationen und Fazit integriert werden.

### Visuelle Dokumentation

Drei Abbildungen wurden vorbereitet:

1. GitHub Issues-Übersicht mit markierter Issues-Liste und Filter-Toolbar
2. GitHub Issue-Detailansicht mit markierter Markdown-Toolbar
3. GitLab Work Items mit geöffnetem Token-Dropdown im Filter-/Suchbereich

Lektor-Feedback: Probleme sollen visuell durch Screenshots gestützt werden; Severity-Definitionen sollen ausführlicher sein.

## Geplante Architektur

### Forschungsarchitektur

1. Literatur und Standards
2. Szenarien definieren
3. Plattformen manuell und ergänzend automatisiert evaluieren
4. Befunde in Barrier Log normalisieren
5. wiederkehrende Muster und Plattformunterschiede ableiten
6. priorisierte GitHub-Barrieren auswählen
7. Browser-Erweiterung implementieren
8. Erweiterung mit manuellen und automatisierten Tests prüfen
9. explorative Nutzerstudie ohne/mit Erweiterung durchführen
10. Ergebnisse des Plattformvergleichs und der Prototyp-Evaluation diskutieren

### Extension-Architektur – vorgeschlagener Stand

Die konkrete Implementierung wurde noch nicht festgelegt. Aus dem vereinbarten MVP ergibt sich folgende empfohlene Struktur:

- WebExtension Manifest
- Content Script für GitHub-Seiten
- Page-/Workflow-Erkennung für Issues und Pull Requests
- robuste Selektor- und Fokuszielschicht
- Shortcut-Manager
- Fokus-Hervorhebung
- Hilfe-Overlay
- optional Options-/Settings-Seite
- Playwright-Regressionssuite
- Axe-Scans als ergänzende Prüfung

Keine tiefgreifende Manipulation von GitHubs internem roving-`tabindex` ohne klaren Nachweis, Tests und Fallback.

## Wichtige Entscheidungen

- WCAG 2.2 Level A/AA ist der normative Bewertungsrahmen.
- Google Chrome ist der Browser für die manuellen Tests.
- NVDA unter Windows ist der Screenreader; JAWS wurde verworfen, weil NVDA kostenlos und weit verbreitet ist.
- Beide Methoden – Keyboard-only und NVDA – sollen grundsätzlich beide Hauptworkflows abdecken.
- GitLab „Work items“ ist das Issues-Äquivalent; Issue Boards sind nicht der primäre Vergleichsworkflow.
- Der Prototyp gilt nur für GitHub und nur für Issues und Pull Requests.
- Ein kleiner stabiler MVP ist wichtiger als ein umfassender Eingriff in GitHubs internes Fokusmanagement.
- Studienkolleg:innen dürfen als Proxy-/Convenience-Gruppe teilnehmen, müssen aber korrekt ausgewiesen werden.
- Eigene Beobachtungen werden nicht allein aus dem Quellcode abgeleitet; Screenreader-Probleme müssen mit NVDA verifiziert werden.

## Offene Punkte

### Forschung und Scope

- CI/CD-Workflow endgültig als ergänzend oder außerhalb des Scopes festlegen
- finale Kapitelstruktur festlegen: Methode zuerst oder Workflow zuerst
- entscheiden, ob Kapitel „Erwartete Ergebnisse“ in der Endfassung bleibt

### Evaluation

- Azure DevOps Work Items/Boards Keyboard-only vollständig durchführen
- Azure DevOps Work Items/Boards mit NVDA vollständig durchführen
- Azure DevOps Pull Requests Keyboard-only vollständig durchführen
- Azure DevOps Pull Requests mit NVDA vollständig durchführen
- Azure-Befunde in Barrier Log, Screenshots, DOM-/ARIA-Analyse, Ergebnisse, Vergleich, Diskussion und Fazit integrieren
- GitHub Pull Requests mit NVDA abschließen
- GitLab Merge Requests Keyboard-only abschließen
- GitLab Work Items und Merge Requests mit NVDA abschließen
- alle Befunde mit aktuellem UI-Zustand, Datum und Version erneut validieren
- frühe DOM-Hypothesen zu ARIA-Namen, Listenstruktur und leeren ARIA-Attributen empirisch bestätigen oder verwerfen
- Playwright- und Axe-Strategie konkretisieren
- vollständiges Barrier Log erstellen

### Prototyp

- genaue Problempriorisierung
- konkrete Shortcuts und Konfliktstrategie
- Technologieentscheidung innerhalb der WebExtension
- Selektorstrategie für GitHub
- MVP implementieren und stabilisieren
- bekannte Einschränkungen dokumentieren

### Studie

- final klären, ob Nutzerstudie, Expert:innen-Evaluation oder Mischform
- Teilnehmendenzahl und Gruppen transparent festlegen
- mindestens zwei feste Zusagen waren im Chat vorhanden, eine dritte war offen; aktueller Stand ist zu prüfen
- Aufgaben, Consent, Datenschutz, Fragebogen und SUS vorbereiten
- Ergebnisse primär deskriptiv interpretieren

### Thesis-Endfassung

- Kapitel 6 vollständig finalisieren
- Diskussion nach vollständiger Evaluation und Studie überarbeiten
- Prototypkapitel, Studienkapitel, Fazit und Abstract ergänzen
- Code, Fragebogen, Aufgaben, Consent und anonymisierte Rohdaten in den Anhang
- Inhalts-, Abbildungs-, Tabellen- und Quellenverzeichnis aktualisieren
- AI-Nutzung nach Hochschulvorgaben dokumentieren
- formale und sprachliche Endkontrolle

## Historische Terminnotiz

Im Chat wurde an einem früheren Planungszeitpunkt mit einer Endabgabe am 19. Mai und einem Checkpoint am 28. April gerechnet. Diese Terminplanung ist historisch und darf nicht als aktueller Termin übernommen werden, ohne sie zu verifizieren.

<!-- OFFICIAL_FH_GUIDELINES START -->
## Verbindliche FH-Rahmenbedingungen

- Die Arbeit weist Engineering-Kompetenz anhand eines nicht trivialen Artefakts nach.
- Das Artefakt ist die GitHub-Browser-Erweiterung für Issues und Pull Requests.
- Potenzieller Nutzen und Abgrenzung zu bestehenden Standardansätzen müssen argumentiert werden.
- Der Entwicklungsprozess wird als aufeinander aufbauende Folge von Requirements Engineering, Spezifikation, Implementierung und Testing dokumentiert.
- Methoden und Werkzeuge werden begründet und mit Alternativen verglichen.
- Das Artefakt wird getestet und hinsichtlich seiner Accessibility- beziehungsweise Usability-Wirkung evaluiert.
- Richtwert der Hauptteile: ungefähr 6.000 Wörter; Introduction 15 %, Methodology 20 %, Solution 50 %, Discussion 15 %.
- Methodik sowie Ergebnisse und Diskussion bilden gemeinsam 80 Prozent der Bewertung.
- QG2 verlangt einen vollständigen Introduction- und Methodenteil sowie erste Ergebnisse.
- Vollständige Details stehen in `docs/OFFICIAL_FH_GUIDELINES.md`.
<!-- OFFICIAL_FH_GUIDELINES END -->
