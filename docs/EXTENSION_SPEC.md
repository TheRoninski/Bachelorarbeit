# Extension Specification

## 1. Zweck

Die Browser-Erweiterung ist ein exemplarischer Prototyp für GitHub. Sie soll ausgewählte, durch die Evaluation bestätigte Accessibility-Probleme in den Workflows Issues und Pull Requests auf Clientseite entschärfen.

Sie ist kein vollständiger Ersatz für native Plattformkorrekturen und kein allgemeiner Accessibility-Layer für alle DevOps-Plattformen.

## 2. Ziele

- zentrale Bereiche mit Keyboard-only schneller und zuverlässiger erreichbar machen
- Fokusführung und Orientierung verbessern
- Umwege in Issues- und Pull-Request-Workflows reduzieren
- einen klar messbaren Mehrwert für die Nutzerstudie erzeugen
- demonstrieren, wie wiederkehrende Barrieren clientseitig prototypisch adressiert werden können
- Änderungen robust, reversibel und transparent halten

## 3. Zielplattform und Workflows

### Plattform

- GitHub in Google Chrome

### Workflow 1 – Issues

- Filter-/Suchbereich
- Issues-Liste
- Issue-Detailansicht
- Kommentar-Editor
- gegebenenfalls Sidebar-/Aktionsbereiche

### Workflow 2 – Pull Requests

- PR-Übersicht und Detailansicht
- Conversation/Commits/Files beziehungsweise Files changed
- Kommentar-/Review-Editor
- Review- und Aktionsbereiche

## 4. Zu adressierende Probleme

### Bestätigte beziehungsweise vorläufig bestätigte Keyboard-Probleme

- zentrale Bereiche sind nicht immer schnell oder zuverlässig per Tab erreichbar
- Fokusverhalten kann zustandsabhängig sein
- Toolbars und Action-Bars enthalten sichtbare Elemente außerhalb der Tab-Reihenfolge
- Markdown-Toolbar ist nicht direkt per Tab erreichbar
- Wechsel zwischen Tab und Pfeiltasten ist teilweise schwer erkennbar
- Fokus und Orientierung in dynamischen UI-Bereichen sind aufwendig

### Nicht als primärer Extension-Fix behandeln

- korrekte `tablist`-Patterns
- korrekte Menü- und Listbox-Interaktionen
- englische Aussprache englischer UI-Texte
- nicht bestätigte DOM-Hypothesen ohne reale Nutzerauswirkung

## 5. Prioritäten

### P0 – Voraussetzung

- Extension lädt zuverlässig nur auf relevanten GitHub-Seiten
- keine Beeinträchtigung nativer Bedienung
- kein Verlust von Fokus oder Tastatureingaben
- klare Aktivierungs- und Deaktivierungsmöglichkeit

### P1 – MVP

- Shortcut zum Issues-Filter beziehungsweise zur Suche
- Shortcut zur Issues-Liste oder zum ersten sichtbaren Issue
- Shortcut zum Kommentar-Editor
- Shortcut zu zentralem Pull-Request-Bereich
- Shortcut zum PR-Kommentar-/Review-Editor
- sichtbare Fokus-Hervorhebung
- Hilfe-Overlay mit den verfügbaren Shortcuts

### P2 – Stabilisierung

- robuste Workflow-Erkennung
- sinnvolle Fallbacks bei GitHub-UI-Änderungen
- Fokuswiederherstellung nach Overlay
- Konflikterkennung für Shortcuts
- Fehlerzustände für nicht gefundene Ziele
- Playwright-Regressionstests
- Axe-Scans der Extension-Oberfläche

### P3 – spätere Erweiterungen

- konfigurierbare Shortcuts
- Optionsseite
- ergänzte ARIA-Attribute, aber nur bei eindeutig bestätigten Problemen
- eigene tastaturbedienbare Alternativen für einzelne Funktionen
- Markdown-Hilfen oder zugängliche Ersatztoolbar
- tastaturbedienbare Alternativen zu Drag-and-Drop
- zusätzliche GitHub-Workflows

## 6. MVP-Funktionsumfang

### Shortcut-Hilfe

- Ein Shortcut öffnet ein kleines zugängliches Overlay.
- Overlay enthält alle verfügbaren Shortcuts und Zielbeschreibungen.
- Fokus wird beim Öffnen sinnvoll gesetzt.
- Escape schließt das Overlay.
- Fokus kehrt zum auslösenden Element zurück.

### Fokusziele

Issues:

- Suche/Filter
- Liste beziehungsweise erster Issue-Titel
- Kommentar-Editor

Pull Requests:

- Hauptnavigation der PR-Ansicht oder PR-Tabs
- Files/Changes-Bereich
- Kommentar-/Review-Editor

### Fokus-Hervorhebung

- Ziel erhält eine sichtbare, temporäre Hervorhebung.
- Hervorhebung darf native Fokusindikatoren nicht entfernen.
- Kontrast und Sichtbarkeit müssen angemessen sein.

## 7. Vorläufige Shortcut-Ideen

Im Chat wurden beispielhaft folgende Kombinationen diskutiert:

- `Alt+Shift+F` – Filter/Suche
- `Alt+Shift+I` – Issues-Liste
- `Alt+Shift+C` – Kommentar-Editor
- `Alt+Shift+P` – Pull-Request-Hauptbereich
- `Alt+Shift+H` – Hilfe

Diese Belegung ist nicht endgültig. Vor Implementierung müssen Browser-, Betriebssystem- und GitHub-Konflikte geprüft werden.

## 8. Architektur

### 8.1 Manifest

- Chrome-kompatible WebExtension
- minimale Berechtigungen
- nur notwendige GitHub-Hosts
- keine unnötige Datensammlung

### 8.2 Content Script

Verantwortlich für:

- Erkennen der aktuellen GitHub-Seite
- Finden semantischer Fokusziele
- Registrieren der Shortcuts
- Fokussetzen
- Anzeigen der Hervorhebung
- Öffnen und Schließen des Hilfe-Overlays

### 8.3 Workflow Adapter

Empfohlene Trennung:

- `issuesAdapter`
- `pullRequestsAdapter`

Jeder Adapter kapselt:

- Seitenerkennung
- Zielsuche
- Fallbacks
- Workflow-spezifische Tests

### 8.4 Selector Layer

Priorität:

1. Rollen und zugängliche Namen
2. stabile Attribute wie `data-testid`, falls vorhanden
3. semantische Strukturen
4. CSS-Selektoren nur als Fallback

Keine Abhängigkeit von gehashten oder rein visuellen Klassen.

### 8.5 Overlay

- semantisches Dialog- oder Hilfepanel
- klarer Titel
- beschriftete Schließen-Schaltfläche
- Keyboard-Bedienung
- Fokusmanagement
- keine unnötige Focus Trap, außer als echter modaler Dialog

### 8.6 Styles

- isolierte Klassen oder Shadow DOM, falls sinnvoll
- keine Überschreibung globaler GitHub-Styles
- sichtbarer Fokus
- Dark- und Light-Theme berücksichtigen

## 9. Technische Regeln

- Native HTML-Elemente vor ARIA bevorzugen.
- Keine positiven `tabindex`-Werte.
- Keine globalen Keyboard-Handler, die Texteingabe stören.
- Shortcuts in Eingabefeldern nur auslösen, wenn ausdrücklich vorgesehen.
- Fokus nur nach expliziter Nutzeraktion verschieben.
- Nutzer:innen über erfolglose Zielsuche informieren.
- Keine automatische Änderung von GitHub-Inhalten ohne klare Aktion.
- Keine tiefgreifende Reparatur des internen roving-`tabindex` im MVP.
- Erweiterung muss deaktivierbar sein und darf keine persistenten Seiteneffekte hinterlassen.

## 10. Testing

### Manuell

- Issues und Pull Requests vollständig mit Keyboard-only
- NVDA auf Extension-Overlay und Fokusaktionen
- Dark/Light Theme
- Reload und GitHub-interne Navigation
- Eingabefelder und Editor
- Shortcut-Konflikte

### Playwright

- Extension lädt auf Zielseiten
- Shortcuts setzen erwarteten Fokus
- Overlay öffnet/schließt
- Fokus wird wiederhergestellt
- keine Aktivierung in Textfeldern bei Konflikten
- Fallback bei fehlendem Ziel

### Axe

- Overlay und Optionsseite scannen
- zentrale Seiten mit Extension aktiv vergleichen
- Ergebnisse manuell prüfen

## 11. Messbarer Mehrwert

Die Nutzerstudie kann vergleichen:

- Bearbeitungszeit
- Erfolgsquote
- Anzahl Fehlversuche
- Anzahl Tab-Schritte oder Navigationsumwege
- subjektive Zufriedenheit
- SUS, falls final eingesetzt
- qualitative Aussagen zur Orientierung

Die Extension muss mindestens eine Aufgabe messbar vereinfachen, damit der Prototyp wissenschaftlich relevant ist.

## 12. Nicht-Ziele

- vollständige WCAG-Konformität von GitHub herstellen
- GitHub-DOM dauerhaft umstrukturieren
- Screenreader-Ausgabe für alle GitHub-Bereiche ersetzen
- GitLab oder Azure DevOps unterstützen
- komplexe native Widgets ohne bestätigten Bedarf überschreiben
- Plattformänderungen serverseitig vornehmen

## 13. Bekannte Risiken

- GitHub verändert DOM und Klassen
- Shortcuts kollidieren mit Browser, Betriebssystem oder GitHub
- Fokusziel ist je nach Zustand nicht vorhanden
- eigene Fokusmanipulation kann native Logik stören
- zu viele Features gefährden Stabilität und Studienzeitplan
- Extension kann eine Barriere nur umgehen, nicht die Plattformursache beseitigen

## 14. Definition of Done

Der MVP ist fertig, wenn:

- beide GitHub-Workflows unterstützt werden
- vereinbarte Fokus-Shortcuts funktionieren
- Hilfe-Overlay zugänglich ist
- Fokus-Hervorhebung sichtbar ist
- keine kritische Regression in Keyboard- oder NVDA-Nutzung entsteht
- Playwright-Kernfälle bestehen
- Axe keine ungeprüften kritischen Probleme in der Extension-Oberfläche meldet
- README, Installation, Shortcuts und Einschränkungen dokumentiert sind
- ein Studien-Build eingefroren wurde

<!-- FH_ARTIFACT_REQUIREMENTS START -->
## 15. Einordnung als Bachelorarbeits-Artefakt

Die Browser-Erweiterung ist das nicht triviale technische Artefakt der Bachelorarbeit. Deshalb muss ihre Entwicklung nicht nur als Code, sondern als vollständiger Engineering-Prozess dokumentiert werden:

1. Anforderungen aus bestätigten Accessibility-Befunden ableiten
2. User Requirements beziehungsweise User Stories formulieren
3. ideale Lösung unabhängig von technischen Randbedingungen beschreiben
4. Alternativen und bestehende Standardansätze vergleichen
5. Architektur, Komponenten und Schnittstellen spezifizieren
6. MVP implementieren
7. technisch, mit Keyboard-only und mit NVDA testen
8. Accessibility- und Usability-Wirkung evaluieren
9. Grenzen, Übertragbarkeit und Verbesserungsmöglichkeiten diskutieren

Der Solution-Teil der Thesis soll repräsentative Screenshots, Funktionalität aus Nutzer:innenperspektive und die Softwarearchitektur enthalten. Vollständiger Code und zusätzliche Screenshots können in den Anhang.
<!-- FH_ARTIFACT_REQUIREMENTS END -->
