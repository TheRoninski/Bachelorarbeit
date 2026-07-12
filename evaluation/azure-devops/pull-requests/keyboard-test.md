# Azure DevOps – Pull Requests – Keyboard-only-Testprotokoll

Status: **offen, verpflichtend** (D-024, `docs/TODO.md`).

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 4.2 (Szenario), Abschnitt 5 (Keyboard-only-Regeln), Abschnitt 5.3 (zustandsabhängige Wiederholung), Abschnitt 5.4 (Bewertung roving tabindex).

Testumgebung: siehe `../environment.md`.

## Primäre Azure-Oberfläche

- Primäre Oberfläche für diesen Workflow: **Repos → Pull requests**.
- Andere Repos-Ansichten (z. B. Files, Commits außerhalb des PR-Kontexts) sind nicht Gegenstand dieses Katalogs. Wird ein Testfall dennoch auf einer abweichenden Oberfläche durchgeführt, wird dies im Feld „Getestete Azure-Oberfläche“ ausdrücklich als **ergänzend/abweichend** gekennzeichnet.

## Erlaubte Tasten

`Tab`, `Shift+Tab`, `Enter`, `Space`, Pfeiltasten, `Escape`, ggf. erwartete `Home`/`End` in Composite Widgets. Ab dem definierten Startpunkt keine Maus.

## Szenario (Abschnitt 4.2)

1. Pull-Request-Übersicht öffnen (primär: Repos → Pull requests)
2. Pull Request öffnen
3. zwischen Overview/Conversation, Files bzw. Files changed und Updates/Commits navigieren
4. Review- und Kommentarbereich erreichen
5. Kommentar oder Review verfassen
6. Aktionen und Sidebar-Controls (z. B. Reviewers, Work Items verknüpfen, Complete/Abandon) bedienen
7. Dialoge, Menüs und Dropdowns prüfen
8. Fokus nach Schließen oder Aktion kontrollieren

Der folgende Testfallkatalog operationalisiert dieses Szenario in 9 konkrete, eigenständig durchführbare Testfälle. Er ersetzt das bisherige generische Schritt-für-Schritt-Protokoll als primäres Dokumentationsformat.

## Hinweis zu destruktiven Aktionen

Destruktive bzw. weitreichende Aktionen (z. B. Complete Pull Request/Merge) werden im Rahmen dieses Katalogs nur bis zum geöffneten Bestätigungsdialog durchgeführt und anschließend abgebrochen (`Escape` bzw. Cancel-Aktion). Es wird kein tatsächlicher Merge ausgeführt, solange keine ausdrückliche spätere Freigabe vorliegt.

## Hinweis zu Composite Widgets

Erwartetes Verhalten wird neutral formuliert: Es wird nicht vorausgesetzt, dass jedes Einzelelement eines Composite Widgets per `Tab` erreichbar sein muss. Ein korrektes Pfeiltasten-, Roving-Tabindex-, Combobox-, Grid- oder Tablist-Pattern mit einem Tab-Stopp und konsistenter interner Bedienung gilt als zulässig (Abschnitt 5.4).

## Testfallkatalog

### TC-AZ-PR-KB-001 — Navigation zur PR-Übersicht

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests
- Getestete Funktion: Erreichbarkeit der PR-Übersicht über die Repos-Hauptnavigation
- Seite/Zustand: beliebige Projekt-/Repo-Seite vor Navigation
- Ausgangszustand: Testaccount angemeldet, kein Filter aktiv, Fokus auf erstem fokussierbarem Element der Seite
- Benötigte Testdaten: keine speziellen PRs nötig
- Benötigte Berechtigung: Leserecht (Reader) im Testrepository
- Ziel: PR-Übersicht ausschließlich per Tastatur erreichen
- Genaue Schritte: 1) Tab zur Hauptnavigation 2) Pull-Requests-Eintrag fokussieren 3) mit Enter öffnen
- Erwartetes Verhalten: Navigationseintrag ist per Tab erreichbar, sichtbarer Fokus vorhanden, Enter öffnet die Übersicht
- Relevante Tasten: `Tab`, `Enter`
- Zu prüfende Accessibility-Aspekte: Reihenfolge Hauptnavigation, sichtbarer Fokus
- Nachbereitung/Reset: keine Nachbereitung nötig (rein navigierende Aktion)
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich 1× nach Reload; bei Abweichung weitere Wiederholung (Abschnitt 5.3/12)
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-KB-002 — Öffnen eines Pull Requests

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → Listeneintrag
- Getestete Funktion: Öffnen eines einzelnen PR aus der Liste
- Seite/Zustand: PR-Übersicht mit mindestens einem Eintrag
- Ausgangszustand: Standardansicht (z. B. „Active“) geladen
- Benötigte Testdaten: mindestens 1 aktiver Test-Pull-Request
- Benötigte Berechtigung: Leserecht (Reader) im Testrepository
- Ziel: PR-Detailansicht öffnen und Fokusziel feststellen
- Genaue Schritte: 1) PR-Titel-Link fokussieren 2) mit Enter öffnen 3) Fokusziel in der Detailansicht feststellen
- Erwartetes Verhalten: PR öffnet zuverlässig, Fokus landet an nachvollziehbarer Stelle
- Relevante Tasten: `Tab`, `Enter`
- Zu prüfende Accessibility-Aspekte: Fokusziel nach Öffnen, Ladezeit-/Zwischenzustand
- Nachbereitung/Reset: keine Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich 1× nach vorheriger Mausinteraktion
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-KB-003 — Tabs und Bereiche

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht
- Getestete Funktion: Wechsel zwischen Overview/Files/Updates-Tabs (Bezeichnung je nach Azure-DevOps-Version)
- Seite/Zustand: geöffneter Pull Request, Fokus auf erstem Tab
- Ausgangszustand: PR-Detailansicht geladen, Overview-Tab aktiv
- Benötigte Testdaten: mindestens 1 PR mit mehreren geänderten Dateien und mindestens 1 Commit-Update
- Benötigte Berechtigung: Leserecht (Reader) im Testrepository
- Ziel: Zwischen allen Tabs ausschließlich per Tastatur wechseln
- Genaue Schritte: 1) Tab-Leiste fokussieren 2) mit Pfeiltasten zwischen Tabs wechseln 3) Tab-Inhalt prüfen
- Erwartetes Verhalten: Die Tab-Leiste folgt einem tablist/tab-Pattern mit einem Tab-Stopp und interner Pfeiltastennavigation (kein Anspruch, dass jeder einzelne Tab einen eigenen Tab-Stopp benötigt); der aktive Tab ist erkennbar
- Relevante Tasten: `Tab`, Pfeiltasten, `Enter`
- Zu prüfende Accessibility-Aspekte: Tastenmodell (ein Tab-Stopp + Pfeiltasten korrekt, Abschnitt 5.4), aktiver Zustand
- Nachbereitung/Reset: keine Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-KB-004 — Dateien und Änderungen

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht → Files
- Getestete Funktion: Navigation im Files-changed-Bereich, Öffnen einer Datei-Diff
- Seite/Zustand: geöffneter PR mit mehreren geänderten Dateien
- Ausgangszustand: Files-Tab aktiv
- Benötigte Testdaten: mindestens 1 PR mit mindestens 3 geänderten Dateien
- Benötigte Berechtigung: Leserecht (Reader) im Testrepository
- Ziel: Dateibaum/-liste durchlaufen und Diff-Inhalt erreichen
- Genaue Schritte: 1) Tab zum Dateibaum 2) Pfeiltasten/Tab zwischen Dateien 3) Datei öffnen 4) im Diff-Bereich navigieren (falls fokussierbar)
- Erwartetes Verhalten: Der Dateibaum folgt einem Baum-/Listenmuster (z. B. ein Tab-Stopp mit interner Pfeiltastennavigation gemäß Tree-Pattern); nicht jede Datei muss einzeln per Tab erreichbar sein. Der Diff-Bereich ist ohne Fokusfalle erreichbar und verlassbar
- Relevante Tasten: `Tab`, Pfeiltasten, `Enter`
- Zu prüfende Accessibility-Aspekte: Fokusfalle im Diff-Viewer, Reihenfolge Dateibaum vs. Diff-Inhalt
- Nachbereitung/Reset: keine Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-KB-005 — Kommentare und Review-Kommentare

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht (Files bzw. Overview)
- Getestete Funktion: Inline-Kommentar an einer Diff-Zeile sowie allgemeiner Conversation-Kommentar
- Seite/Zustand: geöffneter PR im Files- bzw. Overview-Tab
- Ausgangszustand: PR-Detailansicht geladen
- Benötigte Testdaten: mindestens 1 PR mit mindestens 1 geänderter Datei
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) mit Kommentarrecht im Testrepository
- Ziel: Beide Kommentararten ausschließlich per Tastatur erreichen und absenden
- Genaue Schritte: 1) Diff-Zeile fokussieren, Kommentar-Aktion auslösen 2) Text eingeben, absenden 3) im Overview-Tab allgemeines Kommentarfeld erreichen, Text eingeben, absenden
- Erwartetes Verhalten: Kommentar-Trigger ist erreichbar, Eingabefeld ist erreichbar, Absenden-Aktion ist auslösbar, Fokus danach ist nachvollziehbar
- Relevante Tasten: `Tab`, `Enter`, Texteingabe
- Zu prüfende Accessibility-Aspekte: Erreichbarkeit des Inline-Kommentar-Triggers, Fokus nach Absenden
- Nachbereitung/Reset: Testkommentare als solche kennzeichnen; Entfernen nur, sofern Testaccount dies erlaubt
- Anzahl der Wiederholungen: mindestens 1× je Kommentarart (Inline, Conversation)
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-KB-006 — Status- und Aktionsmenüs

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht → Sidebar
- Getestete Funktion: Reviewers-Dropdown und Work-Item-Verknüpfung in der Sidebar
- Seite/Zustand: geöffneter PR, Sidebar mit Reviewers-/Work-Items-Bereich sichtbar
- Ausgangszustand: PR-Detailansicht geladen
- Benötigte Testdaten: mindestens 1 PR mit Sidebar-Bereich für Reviewers und verlinkte Work Items
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testrepository
- Ziel: Menüs ausschließlich per Tastatur öffnen, Option wählen, schließen
- Genaue Schritte: 1) Tab zu Reviewers-Aktion 2) mit Enter/Space öffnen 3) mit Pfeiltasten/Tippen Option wählen 4) mit Enter bestätigen oder Escape abbrechen
- Erwartetes Verhalten: Das Menü folgt einem erkennbaren Interaktionsmuster (z. B. Listbox mit Pfeiltasten); ein einzelner Tab-Stopp mit anschließender Pfeiltasten-/Enter-Bedienung ist korrekt, wenn Rolle, Zustand und Exit-Verhalten konsistent sind. Fokus kehrt nach Schließen zurück
- Relevante Tasten: `Tab`, `Enter`, `Space`, Pfeiltasten, `Escape`
- Zu prüfende Accessibility-Aspekte: Interaktionsmodell, Fokusrückkehr
- Nachbereitung/Reset: vorgenommene Reviewer-/Work-Item-Verknüpfung nach Test wieder entfernen, sofern Berechtigung vorhanden
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-KB-007 — Approve bzw. Vote

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht
- Getestete Funktion: Vote-Aktion (z. B. Approve, Approve with suggestions, Wait, Reject)
- Seite/Zustand: geöffneter PR mit verfügbarem Vote-Button
- Ausgangszustand: PR-Detailansicht geladen, Testaccount als Reviewer eingetragen
- Benötigte Testdaten: mindestens 1 PR, bei dem der Testaccount als Reviewer eingetragen ist
- Benötigte Berechtigung: Reviewer-Recht (Vote-Berechtigung) auf dem Test-PR
- Ziel: Vote-Button per Tastatur erreichen und Aktion auslösen
- Genaue Schritte: 1) Tab zum Vote-Button/-Dropdown 2) mit Enter/Space öffnen, falls Dropdown 3) Option wählen 4) Ergebnis-Fokus prüfen
- Erwartetes Verhalten: Button/Dropdown ist erreichbar, Aktion ist auslösbar, neuer Zustand ist fokussierbar/erkennbar
- Relevante Tasten: `Tab`, `Enter`, `Space`, Pfeiltasten
- Zu prüfende Accessibility-Aspekte: Erreichbarkeit, Zustand vor/nach Aktion, Fokus nach Aktion
- Nachbereitung/Reset: Vote nach Test auf Ausgangswert (z. B. „No vote“) zurücksetzen, sofern Berechtigung vorhanden
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-KB-008 — Dialoge

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht → Complete-Aktion
- Getestete Funktion: Bestätigungsdialog, z. B. Complete Pull Request bzw. Merge-Optionen
- Seite/Zustand: geöffneter PR, Complete-Aktion verfügbar
- Ausgangszustand: PR-Detailansicht geladen, Complete-Button sichtbar
- Benötigte Testdaten: mindestens 1 PR, bei dem die Complete-Aktion grundsätzlich verfügbar ist (Merge wird nicht ausgeführt, siehe „Hinweis zu destruktiven Aktionen“)
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) mit Complete-Recht im Testrepository
- Ziel: Dialog vollständig per Tastatur bedienen und mit Escape verlassen, **ohne den Pull Request zu mergen**
- Genaue Schritte: 1) Complete-Aktion auslösen, Dialog öffnet 2) im Dialog navigieren (Merge-Optionen, Checkboxen), ohne zu bestätigen 3) mit `Escape` bzw. Cancel-Button schließen, **ohne zu mergen**
- Erwartetes Verhalten: Fokus wird beim Öffnen sinnvoll gesetzt, alle Optionen sind erreichbar, `Escape`/Cancel schließt ohne Aktion, Fokus kehrt zum Auslöser zurück
- Relevante Tasten: `Tab`, `Space`, `Enter`, `Escape`
- Zu prüfende Accessibility-Aspekte: Fokusfang, Escape-/Cancel-Verhalten, Fokusrückkehr zum Auslöser
- Nachbereitung/Reset: Dialog abbrechen (Escape/Cancel); kein Merge ausführen; keine weitere Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-KB-009 — Fokus nach Aktionen und dynamischen Aktualisierungen

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht
- Getestete Funktion: Fokusverhalten nach Kommentar absenden, Vote abgeben, Dialog schließen
- Seite/Zustand: geöffneter PR
- Ausgangszustand: PR-Detailansicht geladen
- Benötigte Testdaten: mindestens 1 PR mit Kommentarmöglichkeit und Vote-Berechtigung für den Testaccount
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) mit Kommentar- und Vote-Recht im Testrepository
- Ziel: Fokusziel nach mehreren dynamischen Zustandswechseln dokumentieren
- Genaue Schritte: 1) Kommentar absenden, Fokus danach prüfen 2) Vote abgeben, Fokus danach prüfen 3) Dialog öffnen und mit Escape schließen (siehe TC-AZ-PR-KB-008), Fokus danach prüfen
- Erwartetes Verhalten: Fokus geht nicht verloren, springt nicht unerwartet, kehrt sinnvoll zurück
- Relevante Tasten: `Tab`, `Enter`, `Escape`
- Zu prüfende Accessibility-Aspekte: Fokusverlust, unerwartete Sprünge (Abschnitt 5.2/5.3)
- Nachbereitung/Reset: Testkommentar kennzeichnen, Vote zurücksetzen, kein Merge ausgeführt
- Anzahl der Wiederholungen: mindestens 1× je Zustandswechsel (Kommentar, Vote, Dialog); bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

## Bewertung roving tabindex und Composite Widgets

Nicht automatisch als Fehler werten (Abschnitt 5.4): genau ein Element mit `tabindex="0"` plus weitere Elemente mit `tabindex="-1"` innerhalb eines Composite Widgets. Erst als Problem dokumentieren, wenn Pfeiltastennavigation unzuverlässig ist, Fokusziel nicht aktualisiert wird, Elemente übersprungen werden, Fokus den Bereich unerwartet verlässt, Rolle/Interaktionsmodell unverständlich sind oder die Aufgabe dadurch eingeschränkt/blockiert ist. „Erwartetes Verhalten“ wird in diesem Katalog durchgängig neutral formuliert und schreibt kein bestimmtes Tastenmodell vor (siehe „Hinweis zu Composite Widgets“ oben).

## Ergebnis dieses Testblocks

9 Testfälle definiert (TC-AZ-PR-KB-001 bis TC-AZ-PR-KB-009). Noch keine Testläufe durchgeführt. Kein Befund, keine Severity, keine WCAG-Zuordnung bis zur tatsächlichen Durchführung.
