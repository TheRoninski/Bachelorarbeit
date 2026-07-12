# Azure DevOps – Pull Requests – NVDA-Testprotokoll

Status: **offen, verpflichtend** (D-024, `docs/TODO.md`).

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 4.2 (Szenario), Abschnitt 6 (NVDA-Tests), Abschnitt 6.4 (Quellcode versus Screenreader).

Testumgebung: siehe `../environment.md`.

## Primäre Azure-Oberfläche

- Primäre Oberfläche für diesen Workflow: **Repos → Pull requests**.
- Andere Repos-Ansichten sind nicht Gegenstand dieses Katalogs. Wird ein Testfall dennoch auf einer abweichenden Oberfläche durchgeführt, wird dies im Feld „Getestete Azure-Oberfläche“ ausdrücklich als **ergänzend/abweichend** gekennzeichnet.

## Prüfziele (Abschnitt 6.1)

- Seitenstruktur verständlich
- Überschriften und Landmarks sinnvoll
- Links, Buttons, Form Controls mit zugänglichen Namen
- Rollen und Zustände korrekt angekündigt
- Fokus und Screenreader-Cursor konsistent
- dynamische Änderungen angekündigt (z. B. neue Kommentare, Statuswechsel)
- Menüs, Dialoge, Comboboxen, Listboxen, Tabs verständlich bedienbar
- Fehler, Statusänderungen, Bestätigungen wahrnehmbar

## Prüfschritte (Abschnitt 6.2)

- Seite linear lesen
- Überschriftennavigation
- Landmark-Navigation
- Links-/Buttonnavigation
- Formularfelder prüfen (Kommentar-/Review-Editor)
- Fokusmodus bei interaktiven Widgets prüfen
- Menü-/Listbox-/Tab-Navigation prüfen (Overview/Files/Updates-Tabs, Reviewer-Dropdown)
- Dialogöffnung und Fokusfang prüfen
- Fokus nach Dialogschluss prüfen
- Autor:in, Zeitstempel, Statusmetadaten prüfen
- Informationsdichte notieren, ohne automatisch als Verstoß zu werten

Der folgende Testfallkatalog operationalisiert diese Prüfschritte in 9 konkrete, eigenständig durchführbare Testfälle. Er ersetzt das bisherige generische Ausgabe-Protokoll als primäres Dokumentationsformat.

## Hinweis zu destruktiven Aktionen

Destruktive bzw. weitreichende Aktionen (z. B. Complete Pull Request/Merge) werden im Rahmen dieses Katalogs nur bis zum geöffneten Bestätigungsdialog durchgeführt und anschließend abgebrochen (`Escape` bzw. Cancel-Aktion). Es wird kein tatsächlicher Merge ausgeführt, solange keine ausdrückliche spätere Freigabe vorliegt.

## Hinweis zu Composite Widgets

Erwartetes Verhalten wird neutral formuliert: Es wird nicht vorausgesetzt, dass jedes Einzelelement eines Composite Widgets einen eigenen Tab-Stopp hat. Ein korrektes Pfeiltasten-, Roving-Tabindex-, Combobox-, Grid- oder Tablist-Pattern mit verständlicher Ansage von Rolle, Name und Zustand gilt als zulässig.

## Testfallkatalog

### TC-AZ-PR-NV-001 — Navigation zur PR-Übersicht

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests
- Getestete Funktion: Ansage von Hauptnavigation und PR-Übersicht
- Seite/Zustand: beliebige Projekt-/Repo-Seite vor Navigation
- Ausgangszustand: Testaccount angemeldet, NVDA aktiv
- Benötigte Testdaten: keine speziellen PRs nötig
- Benötigte Berechtigung: Leserecht (Reader) im Testrepository
- Ziel: Prüfen, ob Navigation und Zielseite verständlich angekündigt werden
- Genaue Schritte: 1) Landmark-/Linknavigation zur Hauptnavigation 2) Pull-Requests-Link anfahren 3) öffnen 4) Seitentitel/Überschrift abhören
- Erwartetes Verhalten: Link mit erkennbarem Namen/Rolle, Übersichtsseite mit erkennbarer Überschrift
- NVDA-Modus (erwartet): Browse Mode
- NVDA-Aktionen: Landmark-Navigation (`D`), Linknavigation (`K`), Überschriftennavigation (`H`)
- Zu prüfende Accessibility-Aspekte: Landmark-Struktur, Linkname, Seitentitel
- Nachbereitung/Reset: keine Nachbereitung nötig (rein navigierende Aktion)
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich 1× nach Reload; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-NV-002 — Öffnen eines Pull Requests

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → Listeneintrag
- Getestete Funktion: Ansage beim Öffnen der PR-Detailansicht
- Seite/Zustand: Fokus auf einem PR-Listeneintrag
- Ausgangszustand: Standardansicht (z. B. „Active“) geladen
- Benötigte Testdaten: mindestens 1 aktiver Test-Pull-Request
- Benötigte Berechtigung: Leserecht (Reader) im Testrepository
- Ziel: Prüfen, ob Kontextwechsel und neuer Fokus verständlich angekündigt werden
- Genaue Schritte: 1) PR öffnen 2) Ansage direkt danach abhören 3) fokussiertes Element identifizieren
- Erwartetes Verhalten: Wechsel ist wahrnehmbar, neues Fokusziel hat erkennbaren Namen/Rolle
- NVDA-Modus (erwartet): Browse Mode mit automatischer Ansage nach Aktivierung
- NVDA-Aktionen: automatische Ansage, ggf. Überschriftennavigation
- Zu prüfende Accessibility-Aspekte: Ankündigung des Kontextwechsels, Name/Rolle des Fokusziels
- Nachbereitung/Reset: keine Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich 1× nach vorheriger Mausinteraktion
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-NV-003 — Tabs und Bereiche

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht
- Getestete Funktion: Ansage der Overview/Files/Updates-Tabs
- Seite/Zustand: geöffneter Pull Request
- Ausgangszustand: PR-Detailansicht geladen, Overview-Tab aktiv
- Benötigte Testdaten: mindestens 1 PR mit mehreren geänderten Dateien und mindestens 1 Commit-Update
- Benötigte Berechtigung: Leserecht (Reader) im Testrepository
- Ziel: Prüfen, ob `tablist`/`tab`-Rollen und aktiver Zustand verständlich angesagt werden
- Genaue Schritte: 1) Tab-Leiste fokussieren 2) Rolle/Anzahl abhören 3) mit Pfeiltasten wechseln, `aria-selected`-Ansage prüfen
- Erwartetes Verhalten: Die Tabs werden als solche erkannt, der aktive Tab wird angesagt (analog zum bereits als korrekt dokumentierten GitHub-PR-Tabs-Pattern); ein einzelner Tab-Stopp mit interner Pfeiltastennavigation ist zulässig
- NVDA-Modus (erwartet): automatischer Wechsel zu Focus Mode bei Tab-Wechsel
- NVDA-Aktionen: Fokusmodus, automatische Ansage bei Tab-Wechsel
- Zu prüfende Accessibility-Aspekte: Rolle, Name, `aria-selected`-Zustand
- Nachbereitung/Reset: keine Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-NV-004 — Dateien und Änderungen

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht → Files
- Getestete Funktion: Ansage des Dateibaums und der Diff-Inhalte
- Seite/Zustand: geöffneter PR mit mehreren geänderten Dateien
- Ausgangszustand: Files-Tab aktiv
- Benötigte Testdaten: mindestens 1 PR mit mindestens 3 geänderten Dateien
- Benötigte Berechtigung: Leserecht (Reader) im Testrepository
- Ziel: Prüfen, ob Dateistruktur und Diff-Inhalt (Added/Removed) verständlich sind
- Genaue Schritte: 1) Dateibaum abhören 2) Datei öffnen 3) Diff-Inhalt abhören, insbesondere Kennzeichnung geänderter Zeilen
- Erwartetes Verhalten: Die Dateibaum-Struktur ist erkennbar (Baum-/Listenmuster mit einem Tab-Stopp und interner Pfeiltastennavigation ist zulässig); Diff-Zeilen sind mit erkennbarem Status (hinzugefügt/entfernt) versehen, soweit von Azure DevOps vorgesehen
- NVDA-Modus (erwartet): Browse Mode für Diff-Inhalt, automatischer Wechsel zu Focus Mode im Dateibaum
- NVDA-Aktionen: lineares Lesen, Fokusmodus
- Zu prüfende Accessibility-Aspekte: Struktur-Ansage, Informationsdichte, Kennzeichnung von Änderungen
- Nachbereitung/Reset: keine Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-NV-005 — Kommentare und Review-Kommentare

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht (Files bzw. Overview)
- Getestete Funktion: Ansage von Inline- und allgemeinen Kommentaren
- Seite/Zustand: geöffneter PR mit Kommentarbereich
- Ausgangszustand: PR-Detailansicht geladen
- Benötigte Testdaten: mindestens 1 PR mit mindestens 1 geänderter Datei, nach Möglichkeit mit vorhandenem Kommentar
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) mit Kommentarrecht im Testrepository
- Ziel: Prüfen, ob Kommentar-Threads, Autor:in, Zeitstempel und Antwortfeld verständlich sind
- Genaue Schritte: 1) Kommentarbereich abhören 2) Inline-Kommentar-Trigger abhören 3) Eingabefeld fokussieren, Label prüfen
- Erwartetes Verhalten: Kommentar-Trigger und -Feld haben einen erkennbaren Namen, Thread-Struktur ist nachvollziehbar
- NVDA-Modus (erwartet): Browse Mode zum Lesen der Threads, automatischer Wechsel zu Focus Mode im Eingabefeld
- NVDA-Aktionen: lineares Lesen, Formularfeld-Navigation
- Zu prüfende Accessibility-Aspekte: Label, Thread-Struktur, Informationsdichte
- Nachbereitung/Reset: Testkommentare als solche kennzeichnen; Entfernen nur, sofern Testaccount dies erlaubt
- Anzahl der Wiederholungen: mindestens 1× je Kommentarart (Inline, Conversation)
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-NV-006 — Status- und Aktionsmenüs

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht → Sidebar
- Getestete Funktion: Ansage von Reviewers-Dropdown und Work-Item-Verknüpfung
- Seite/Zustand: geöffneter PR, Sidebar sichtbar
- Ausgangszustand: PR-Detailansicht geladen
- Benötigte Testdaten: mindestens 1 PR mit Sidebar-Bereich für Reviewers und verlinkte Work Items
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testrepository
- Ziel: Prüfen, ob Menürolle, Optionen und aktuelle Auswahl verständlich sind
- Genaue Schritte: 1) Reviewers-Aktion fokussieren, Rolle/Name abhören 2) öffnen, Optionen abhören 3) Auswahl treffen, Bestätigung abhören
- Erwartetes Verhalten: Rolle und Zustand (`aria-expanded`, ausgewählte Reviewer) sind erkennbar; ein einzelner Tab-Stopp mit interner Pfeiltastennavigation ist zulässig
- NVDA-Modus (erwartet): automatischer Wechsel zu Focus Mode beim Öffnen des Menüs
- NVDA-Aktionen: Fokusmodus, automatische Ansage
- Zu prüfende Accessibility-Aspekte: Rolle, Name, Zustand
- Nachbereitung/Reset: vorgenommene Reviewer-/Work-Item-Verknüpfung nach Test wieder entfernen, sofern Berechtigung vorhanden
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-NV-007 — Approve bzw. Vote

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht
- Getestete Funktion: Ansage des Vote-Zustands vor und nach Aktion
- Seite/Zustand: geöffneter PR mit verfügbarem Vote-Button
- Ausgangszustand: PR-Detailansicht geladen, Testaccount als Reviewer eingetragen
- Benötigte Testdaten: mindestens 1 PR, bei dem der Testaccount als Reviewer eingetragen ist
- Benötigte Berechtigung: Reviewer-Recht (Vote-Berechtigung) auf dem Test-PR
- Ziel: Prüfen, ob aktueller Vote-Zustand und Statuswechsel wahrnehmbar sind
- Genaue Schritte: 1) Vote-Button/-Dropdown abhören (aktueller Zustand) 2) Option auslösen 3) neue Ansage abhören
- Erwartetes Verhalten: Zustand vor und nach Aktion wird angesagt, Statuswechsel ist wahrnehmbar (z. B. über Live-Region oder Fokus)
- NVDA-Modus (erwartet): Browse Mode mit automatischer Ansage bei Live-Region-Updates
- NVDA-Aktionen: automatische Ansage, Live-Region-Beobachtung
- Zu prüfende Accessibility-Aspekte: Zustandsansage, Ankündigung der Änderung
- Nachbereitung/Reset: Vote nach Test auf Ausgangswert (z. B. „No vote“) zurücksetzen, sofern Berechtigung vorhanden
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-NV-008 — Dialoge

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht → Complete-Aktion
- Getestete Funktion: Ansage von Bestätigungsdialogen (z. B. Complete Pull Request)
- Seite/Zustand: geöffneter PR, Complete-Aktion verfügbar
- Ausgangszustand: PR-Detailansicht geladen, Complete-Button sichtbar
- Benötigte Testdaten: mindestens 1 PR, bei dem die Complete-Aktion grundsätzlich verfügbar ist (Merge wird nicht ausgeführt, siehe „Hinweis zu destruktiven Aktionen“)
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) mit Complete-Recht im Testrepository
- Ziel: Prüfen, ob Dialogrolle, Fokusfang und Formularelemente verständlich sind, **ohne den Pull Request zu mergen**
- Genaue Schritte: 1) Dialog öffnen, Titel/Rolle abhören 2) Formularelemente (Checkboxen, Merge-Optionen) abhören, ohne zu bestätigen 3) mit `Escape` bzw. Cancel schließen, **ohne zu mergen**, Fokus danach prüfen
- Erwartetes Verhalten: Der Dialog ist als solcher erkennbar, Formularelemente haben erkennbare Namen, der Fokus bleibt im Dialog und kehrt nach Schließen zurück
- NVDA-Modus (erwartet): automatischer Wechsel zu Focus Mode (modaler Dialog)
- NVDA-Aktionen: automatische Ansage, Fokusmodus, Dialog-Navigation
- Zu prüfende Accessibility-Aspekte: Dialogrolle/-titel, Fokusfang, Fokusrückkehr
- Nachbereitung/Reset: Dialog abbrechen (Escape/Cancel); kein Merge ausführen; keine weitere Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-PR-NV-009 — Fokus nach Aktionen und dynamischen Aktualisierungen

- Workflow: Pull Requests
- Getestete Azure-Oberfläche: primär – Repos → Pull requests
- Navigationspfad: Projekt → Repos → Pull requests → PR-Detailansicht
- Getestete Funktion: Ansage dynamischer Aktualisierungen nach Kommentar, Vote, Dialogschluss
- Seite/Zustand: geöffneter PR
- Ausgangszustand: PR-Detailansicht geladen
- Benötigte Testdaten: mindestens 1 PR mit Kommentarmöglichkeit und Vote-Berechtigung für den Testaccount
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) mit Kommentar- und Vote-Recht im Testrepository
- Ziel: Prüfen, ob Änderungen und das neue Fokusziel angekündigt werden
- Genaue Schritte: 1) Kommentar absenden, Ansage abhören 2) Vote abgeben, Ansage abhören 3) Dialog öffnen und mit Escape schließen (siehe TC-AZ-PR-NV-008), Ansage/Fokus abhören
- Erwartetes Verhalten: Änderungen sind wahrnehmbar, kein stiller Zustandswechsel
- NVDA-Modus (erwartet): Browse Mode mit automatischer Ansage bei Live-Region-Updates
- NVDA-Aktionen: Live-Region-Beobachtung, automatische Ansage
- Zu prüfende Accessibility-Aspekte: Ankündigung dynamischer Änderungen, Fokuskonsistenz
- Nachbereitung/Reset: Testkommentar kennzeichnen, Vote zurücksetzen, kein Merge ausgeführt
- Anzahl der Wiederholungen: mindestens 1× je Zustandswechsel (Kommentar, Vote, Dialog); bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

## Quellcode versus Screenreader

DOM-Hypothesen aus `dom-aria-notes.md` gelten hier erst als bestätigt, wenn die tatsächliche NVDA-Ausgabe sie stützt. Ein Screenshot oder DOM-Fund allein beweist kein Screenreader-Problem (D-013).

## Ergebnis dieses Testblocks

9 Testfälle definiert (TC-AZ-PR-NV-001 bis TC-AZ-PR-NV-009). Noch keine Testläufe durchgeführt. Kein Befund, keine Severity, keine WCAG-Zuordnung bis zur tatsächlichen Durchführung.
