# Testing Guidelines

## 1. Ziel der Evaluation

Die Evaluation untersucht konkrete DevOps-Workflows unter realistischen Bedienbedingungen. Sie kombiniert:

- Keyboard-only-Tests
- NVDA-Tests
- DOM- und Accessibility-Tree-Analyse
- ergänzende automatisierte Tests mit Playwright
- ergänzende Axe-Scans
- visuelle Dokumentation
- Barrier Log

Automatisierung unterstützt Reproduzierbarkeit und Regressionstests, ersetzt aber keine manuelle Keyboard- oder Screenreader-Evaluation.

## 2. Evaluationsmatrix

Jede im finalen Scope enthaltene Plattform soll nach demselben Schema geprüft werden.

| Plattform | Workflow | Keyboard-only | NVDA | Playwright | Axe |
|---|---|---:|---:|---:|---:|
| GitHub | Issues | teilweise abgeschlossen | Issues abgeschlossen | offen | offen |
| GitHub | Pull Requests | teilweise dokumentiert | offen | offen | offen |
| GitLab | Work Items | teilweise abgeschlossen | offen | offen | offen |
| GitLab | Merge Requests | offen | offen | offen | offen |
| Azure DevOps | Work Items/Boards | verpflichtend, offen | verpflichtend, offen | offen | offen |
| Azure DevOps | Pull Requests | verpflichtend, offen | verpflichtend, offen | offen | offen |

## 3. Testumgebung

Bereits festgelegt:

- Betriebssystem: Windows für NVDA
- Browser: Google Chrome
- Screenreader: NVDA

Für jeden Testlauf zusätzlich dokumentieren:

- Datum und Uhrzeit
- Plattform und URL-Typ, nicht zwingend private vollständige URL
- Browser-Version
- Betriebssystem-Version
- NVDA-Version
- UI-Sprache
- Zoomstufe
- Viewport oder Fenstergröße
- Theme, falls relevant
- Testaccount und Berechtigungsstufe, anonymisiert
- Repository-/Projektzustand
- Anzahl und Zustand der Test-Issues, Work Items, PRs oder MRs
- aktivierte Browser-Erweiterungen
- Startzustand der Seite

Fehlende Versionsangaben dürfen nicht nachträglich erfunden werden.

## 4. Szenarien

### 4.1 Issues / Work Items

Mindestens folgende Schritte:

1. Übersichtsseite öffnen
2. offene und geschlossene Einträge unterscheiden oder wechseln
3. Suche beziehungsweise Filter bedienen
4. Sortierung bedienen
5. Eintrag in der Liste öffnen
6. Detailinformationen erfassen
7. Kommentar verfassen
8. Markdown- oder Formatierungsfunktionen prüfen
9. Labels, Assignee, Milestone beziehungsweise Sidebar-Aktionen prüfen
10. Status ändern oder Issue schließen, sofern der Testaccount dies erlaubt

### 4.2 Pull Requests / Merge Requests

Mindestens folgende Schritte:

1. Übersicht öffnen
2. Pull/Merge Request öffnen
3. zwischen Conversation, Commits und Files beziehungsweise Changes navigieren
4. Review- und Kommentarbereich erreichen
5. Kommentar oder Review verfassen
6. Aktionen und Sidebar-Controls bedienen
7. Dialoge, Menüs und Dropdowns prüfen
8. Fokus nach Schließen oder Aktion kontrollieren

### 4.3 CI/CD – ergänzend

Nur wenn final im Scope:

1. fehlgeschlagene Pipeline finden
2. fehlgeschlagenen Job identifizieren
3. Log beziehungsweise Fehlerdetails öffnen
4. relevante Aktion per Tastatur und NVDA erreichen

## 5. Keyboard-only Tests

### 5.1 Erlaubte Tasten

- `Tab`
- `Shift+Tab`
- `Enter`
- `Space`
- Pfeiltasten
- `Escape`
- gegebenenfalls erwartete Home/End-Tasten in Composite Widgets

### 5.2 Grundregeln

- Nach dem definierten Startpunkt keine Maus verwenden.
- Mausinteraktion nur in einem separaten Zustandswechsel-Test einsetzen, wenn untersucht wird, ob vorherige Mausnutzung das spätere Fokusverhalten verändert.
- Sichtbaren Fokus beobachten und dokumentieren.
- Reihenfolge und Erreichbarkeit zentraler Funktionen prüfen.
- Fokusfallen, Fokusverlust, unerwartete Sprünge und fehlende Rückkehr zum Auslöser dokumentieren.
- Dialoge und Menüs mit Enter/Space öffnen, mit Pfeiltasten bedienen und mit Escape schließen.
- Prüfen, ob Fokus nach Schließen sinnvoll zurückkehrt.
- Bei Composite Widgets zuerst Rolle und erwartetes Pattern prüfen.

### 5.3 Zustandsabhängige Tests

Für bekannte problematische Bereiche wiederholen nach:

- frischem Reload
- Wechsel Open ↔ Closed
- Filterwechsel
- Sortierwechsel
- Öffnen und Schließen eines Menüs
- Öffnen und Schließen eines Dialogs
- vorheriger Mausinteraktion
- Rücknavigation

Jeder abweichende Zustand wird als eigener Reproduktionsfall dokumentiert.

### 5.4 Bewertung von roving tabindex

Nicht automatisch als Fehler werten:

- genau ein Element mit `tabindex="0"`
- weitere Elemente mit `tabindex="-1"`

Erst als Problem dokumentieren, wenn mindestens eines zutrifft:

- Pfeiltastennavigation funktioniert nicht zuverlässig
- Fokusziel wird nicht aktualisiert
- Elemente werden übersprungen
- Fokus verlässt den Bereich unerwartet
- Rolle und Interaktionsmodell sind nicht verständlich
- Aufgabe ist dadurch eingeschränkt oder blockiert

## 6. NVDA Tests

### 6.1 Ziele

Prüfen, ob:

- Seitenstruktur verständlich ist
- Überschriften und Landmarks sinnvoll sind
- Links, Buttons und Form Controls zugängliche Namen haben
- Rollen und Zustände korrekt angekündigt werden
- Fokus und Screenreader-Cursor konsistent interagieren
- dynamische Änderungen angekündigt werden
- Menüs, Dialoge, Comboboxen, Listboxen und Tabs verständlich bedienbar sind
- Fehler, Statusänderungen und Bestätigungen wahrnehmbar sind

### 6.2 Prüfschritte

- Seite linear lesen
- Überschriftennavigation verwenden
- Landmark-Navigation verwenden
- Links- und Buttonnavigation verwenden
- Formularfelder prüfen
- Fokusmodus bei interaktiven Widgets prüfen
- Menü-, Listbox- und Tab-Navigation prüfen
- Dialogöffnung und Fokusfang prüfen
- Fokus nach Dialogschluss prüfen
- Kommentare, Autor:in, Zeitstempel und Metadaten prüfen
- Informationsdichte notieren, ohne sie automatisch als Verstoß zu werten

### 6.3 Dokumentation

Pro relevanter Ausgabe festhalten:

- fokussiertes Element
- erwartete Ansage
- tatsächliche Ansage
- Rolle
- Name
- Zustand
- zusätzliche oder fehlende Information
- Auswirkung auf Aufgabe

Wenn möglich NVDA Speech Viewer verwenden oder Ansage wörtlich protokollieren. Keine Ansagen aus Erinnerung erfinden.

### 6.4 Quellcode versus Screenreader

DOM und Accessibility Tree können Risiken zeigen, aber kein Screenreader-Problem allein beweisen.

Beispiele für Hypothesen:

- `aria-labelledby` zeigt auf verborgenes Element
- `aria-label=""`
- Icon-only Button ohne berechneten Namen
- ungültige Listenstruktur
- überladener zugänglicher Name

Diese Fälle müssen mit Accessibility Tree und NVDA-Ausgabe überprüft werden.

## 7. Playwright

### 7.1 Status

Playwright wurde im ursprünglichen Verlauf noch nicht konkret implementiert. Es soll als ergänzende Reproduktions- und Regressionsebene aufgenommen werden.

### 7.2 Einsatzgebiete

- definierte Startzustände herstellen
- Tastatursequenzen reproduzieren
- aktives Element nach jedem Schritt protokollieren
- Fokusreihenfolge für konkrete Szenarien prüfen
- Zustandswechsel wiederholen
- Screenshots an definierten Prüfpunkten erzeugen
- Prototypfunktionen regressionssicher testen

### 7.3 Testprinzipien

- Nur bestätigte Erwartungen automatisieren.
- Nicht behaupten, ein Playwright-Test beweise vollständige Barrierefreiheit.
- Semantische Selektoren und Rollen bevorzugen.
- Fragile, gehashte CSS-Klassen vermeiden.
- GitHub-/GitLab-UI-Änderungen als mögliche Ursache fehlschlagender Tests dokumentieren.
- Fokus über `document.activeElement` und zugängliche Rollen nachvollziehen.
- Komplexe Widgets mit tatsächlichen Tastensequenzen testen.
- Testdaten reproduzierbar anlegen.

### 7.4 Beispielhafte Testfälle

Diese Beispiele sind Planung, keine bereits implementierten Tests:

- Issues-Filter per Tastatur erreichen und verlassen
- Issue-Liste nach Reload und Open/Closed-Wechsel navigieren
- Markdown-Editor und Formatierungsfunktionen erreichen
- PR-Header-Tabs mit Pfeiltasten bedienen
- Extension-Shortcut setzt Fokus auf korrektes Ziel
- Help-Overlay öffnet, ist fokussierbar, schließt mit Escape und stellt Fokus wieder her

## 8. Axe

### 8.1 Status

Axe wurde noch nicht konkret konfiguriert. Es wird als ergänzender automatisierter Check vorgesehen.

### 8.2 Einsatz

- Basisscan auf Übersichtsseiten
- Scan nach Öffnen von Menüs, Dialogen und Detailansichten
- Scan mit und ohne Erweiterung
- Regel-IDs und betroffene Nodes speichern
- Ergebnisse manuell validieren

### 8.3 Grenzen

Axe erkennt nicht zuverlässig:

- sinnvolle Fokusreihenfolge im gesamten Workflow
- gute Screenreader-Ausgabe
- korrekte Informationsdichte
- Nutzbarkeit komplexer Tastaturinteraktionen
- zustandsabhängige Fokusfehler
- subjektive Verständlichkeit

Axe-Ergebnisse dürfen nicht als vollständige WCAG-Konformitätsbewertung dargestellt werden.

## 9. DOM-Analyse

Prüfen:

- `tabindex`
- native Elemente versus ARIA-Rollen
- `role`
- `aria-label`
- `aria-labelledby`
- `aria-describedby`
- `aria-hidden`
- `aria-expanded`
- `aria-controls`
- `aria-selected`
- `aria-checked`
- zugänglicher Name im Accessibility Tree
- DOM-Reihenfolge und visuelle Reihenfolge
- Listen-, Überschriften- und Landmark-Struktur
- Fokusziel nach dynamischen Updates

DOM-Befunde immer mit realem Verhalten verknüpfen.

## 10. ARIA-Analyse

### Positive Patterns

- `tablist` / `tab` mit Pfeiltastennavigation
- Menü mit Pfeiltasten und Escape
- Listbox mit einem Tab-Stopp und interner Pfeiltastennavigation
- Combobox mit verständlicher Ansage von Zustand und Vorschlägen

### Mögliche Probleme

- Icon-only Button ohne zugänglichen Namen
- Label verweist auf `aria-hidden`-Inhalt
- leeres ARIA-Attribut
- überladene oder redundante Namen
- Rolle passt nicht zum Bedienverhalten
- Fokuszustand wird nicht aktualisiert
- falsche oder fehlende Beziehungen

ARIA nicht hinzufügen, wenn natives HTML das Problem sauberer löst.

## 11. Barrier Log

Jeder Eintrag enthält mindestens:

- eindeutige ID
- Plattform
- Workflow
- Seite beziehungsweise Zustand
- Testmethode
- Datum
- Browser/OS/NVDA-Version
- Startvoraussetzungen
- Reproduktionsschritte
- erwartetes Verhalten
- tatsächliches Verhalten
- betroffene Nutzergruppe
- Auswirkung auf Aufgabe
- WCAG-Kriterium
- normative Begründung
- Severity
- DOM-/Accessibility-Tree-Hinweise
- Screenshot-/Video-Referenz
- Reproduzierbarkeit
- Status: offen, bestätigt, verworfen, behoben, Regression
- Notizen zur Erweiterung

## 12. Reproduzierbarkeit

- Startzustand exakt festhalten.
- Test mehrfach wiederholen und Anzahl dokumentieren.
- Abweichende Ergebnisse nicht mitteln, sondern als zustandsabhängig dokumentieren.
- Private Daten anonymisieren.
- Testdaten im Repository oder in Setup-Skripten beschreiben.
- Änderungen der Plattformoberfläche mit Datum dokumentieren.
- Nicht reproduzierbare Beobachtungen als unbestätigt markieren.

## 13. Screenshots

### Anforderungen

- relevanten Bereich ausreichend groß zeigen
- irrelevante Fläche wegschneiden
- rote Rahmen konsistent verwenden
- Fokuszustand sichtbar machen, wenn möglich
- keine sensiblen Daten zeigen
- Plattform, Workflow und Zustand aus dem Bild oder der Caption erkennbar machen

### Platzierung

- direkt nach dem zugehörigen Befund
- im Text auf Abbildung verweisen
- Screenshot erklärt den Ort; Reproduktionsschritte erklären das Verhalten

### Bereits geplante Abbildungen

1. GitHub Issues-Liste und Filter-Toolbar
2. GitHub Markdown-Toolbar im Issue-Kommentar
3. GitLab Work-Items-Filter mit Token-Dropdown

## 14. Abschluss eines Testblocks

Ein Workflow gilt erst als abgeschlossen, wenn:

- alle definierten Schritte getestet wurden
- Keyboard-only und NVDA durchgeführt wurden, sofern im Scope
- relevante Zustände wiederholt wurden
- Barrier Log vollständig ist
- WCAG-Zuordnung geprüft ist
- Severity begründet ist
- Screenshots oder andere Belege vorhanden sind
- positive Patterns dokumentiert sind
- offene Hypothesen gekennzeichnet sind

<!-- FH_ARTIFACT_EVALUATION START -->
## 15. FH-Anforderungen an die Artefakt-Evaluation

- Die Extension muss als technisches Artefakt getestet und analysiert werden.
- Der Testplan muss aus den User Requirements und bestätigten Accessibility-Befunden abgeleitet sein.
- Methodenwahl und Werkzeugwahl sind zu begründen; Alternativen sind zu diskutieren.
- Technische Tests, Keyboard-only, NVDA, Playwright und Axe haben unterschiedliche Aussagebereiche und dürfen nicht gegenseitig ersetzt werden.
- Die Ergebnisdarstellung muss die Zielsetzung aufgreifen und Grenzen kritisch diskutieren.
- Azure DevOps ist verpflichtender Bestandteil der Plattform-Evaluation. Die vier offenen manuellen Testblöcke sind vollständig durchzuführen.
- Die Nutzer:innen- oder Expert:innenstudie evaluiert die Wirkung des GitHub-Prototyps; sie ersetzt nicht die Plattform-Evaluation.
<!-- FH_ARTIFACT_EVALUATION END -->
