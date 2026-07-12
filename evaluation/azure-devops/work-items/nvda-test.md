# Azure DevOps – Work Items/Boards – NVDA-Testprotokoll

Status: **offen, verpflichtend** (D-024, `docs/TODO.md`).

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 4.1 (Szenario), Abschnitt 6 (NVDA-Tests), Abschnitt 6.4 (Quellcode versus Screenreader).

Testumgebung: siehe `../environment.md`.

## Primäre Azure-Oberfläche

- Primäre Oberfläche für diesen Workflow: **Work Items** (linke Hauptnavigation: Boards → Work Items).
- Boards, Backlogs und Queries sind nur ergänzende Oberflächen. Wird ein Testfall abweichend davon auf Boards/Backlogs/Queries durchgeführt, wird dies im Feld „Getestete Azure-Oberfläche“ ausdrücklich als **ergänzend/abweichend** gekennzeichnet.

## Prüfziele (Abschnitt 6.1)

- Seitenstruktur verständlich
- Überschriften und Landmarks sinnvoll
- Links, Buttons, Form Controls mit zugänglichen Namen
- Rollen und Zustände korrekt angekündigt
- Fokus und Screenreader-Cursor konsistent
- dynamische Änderungen angekündigt
- Menüs, Dialoge, Comboboxen, Listboxen, Tabs verständlich bedienbar
- Fehler, Statusänderungen, Bestätigungen wahrnehmbar

## Prüfschritte (Abschnitt 6.2)

- Seite linear lesen
- Überschriftennavigation verwenden
- Landmark-Navigation verwenden
- Links-/Buttonnavigation verwenden
- Formularfelder prüfen
- Fokusmodus bei interaktiven Widgets prüfen
- Menü-/Listbox-/Tab-Navigation prüfen
- Dialogöffnung und Fokusfang prüfen
- Fokus nach Dialogschluss prüfen
- Assigned To, Zustand, Zeitstempel, Metadaten prüfen
- Informationsdichte notieren, ohne automatisch als Verstoß zu werten

Der folgende Testfallkatalog operationalisiert diese Prüfschritte in 11 konkrete, eigenständig durchführbare Testfälle. Er ersetzt das bisherige generische Ausgabe-Protokoll als primäres Dokumentationsformat.

## Hinweis zu destruktiven Aktionen

Destruktive Aktionen (z. B. Delete Work Item) werden im Rahmen dieses Katalogs nur bis zum geöffneten Bestätigungsdialog durchgeführt und anschließend abgebrochen (`Escape` bzw. Cancel-Aktion). Es wird keine tatsächliche Löschung ausgeführt, solange keine ausdrückliche spätere Freigabe vorliegt.

## Hinweis zu Composite Widgets

Erwartetes Verhalten wird neutral formuliert: Es wird nicht vorausgesetzt, dass jedes Einzelelement eines Composite Widgets einen eigenen Tab-Stopp hat. Ein korrektes Pfeiltasten-, Roving-Tabindex-, Combobox-, Grid- oder Tablist-Pattern mit verständlicher Ansage von Rolle, Name und Zustand gilt als zulässig.

## Testfallkatalog

### TC-AZ-WI-NV-001 — Navigation zur Work-Items-Übersicht

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items
- Getestete Funktion: Ansage von Hauptnavigation und Übersichtsseite
- Seite/Zustand: beliebige Projektseite vor Navigation
- Ausgangszustand: Testaccount angemeldet, NVDA aktiv, kein Filter aktiv
- Benötigte Testdaten: keine speziellen Work Items nötig
- Benötigte Berechtigung: Leserecht (Reader) im Testprojekt
- Ziel: Prüfen, ob Navigation und Zielseite verständlich angekündigt werden
- Genaue Schritte: 1) Landmark-Navigation zur Hauptnavigation 2) Work-Items-Link anfahren 3) öffnen 4) Seitentitel/Überschrift der Übersicht abhören
- Erwartetes Verhalten: Navigationslink mit erkennbarem Namen und Rolle, Übersichtsseite mit erkennbarer Überschrift
- NVDA-Modus (erwartet): Browse Mode
- NVDA-Aktionen: Landmark-Navigation (`D`), Linknavigation (`K`/Tab), Überschriftennavigation (`H`)
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

### TC-AZ-WI-NV-002 — Listen-/Tabellenbedienung

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items (Listen-/Grid-Ansicht)
- Navigationspfad: Projekt → Boards → Work Items
- Getestete Funktion: Ansage der Work-Items-Liste/des Grids
- Seite/Zustand: Work-Items-Übersicht mit mehreren Einträgen geladen
- Ausgangszustand: Standardansicht geladen, kein Filter aktiv
- Benötigte Testdaten: mindestens 3 Work Items unterschiedlichen Typs und Status im Testprojekt
- Benötigte Berechtigung: Leserecht (Reader) im Testprojekt
- Ziel: Prüfen, ob Listen-/Tabellenstruktur, Spaltenüberschriften und Zeileninhalt verständlich sind
- Genaue Schritte: 1) In die Liste/das Grid navigieren 2) Tabellennavigation bzw. lineares Lesen testen 3) einzelne Zeile/Zelle anhören
- Erwartetes Verhalten: Die Struktur wird als List-/Table-/Grid-Rolle erkannt; bei Tabellen ist der Spaltenbezug einer Zelle nachvollziehbar. Nicht jedes Element muss einen eigenen Tab-Stopp haben, wenn Pfeiltastennavigation und Ansage konsistent sind
- NVDA-Modus (erwartet): Browse Mode; bei Grid ggf. automatischer Wechsel zu Focus Mode
- NVDA-Aktionen: Tabellennavigation (`Strg+Alt+Pfeiltasten`, falls Tabelle), lineares Lesen (Pfeil ab)
- Zu prüfende Accessibility-Aspekte: Rolle (list/table/grid), Spaltenüberschriften-Zuordnung, Zeilenkontext
- Nachbereitung/Reset: keine Nachbereitung nötig; ggf. versehentlich geänderte Sortierung zurücksetzen
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich je 1× nach Reload und nach Sortierwechsel
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-NV-003 — Suche und Filter

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Filterleiste
- Getestete Funktion: Ansage von Filter-Widgets
- Seite/Zustand: Work-Items-Übersicht ohne aktiven Filter
- Ausgangszustand: Standardansicht geladen
- Benötigte Testdaten: mindestens 3 Work Items mit unterschiedlichem Status bzw. Assigned-To-Wert
- Benötigte Berechtigung: Leserecht (Reader) im Testprojekt
- Ziel: Prüfen, ob Filter-Widget-Rolle, Zustand und Optionen verständlich angesagt werden
- Genaue Schritte: 1) Filter-Widget fokussieren 2) Ansage von Rolle/Name/Zustand abhören 3) öffnen, Optionen abhören 4) Auswahl treffen, Bestätigung abhören
- Erwartetes Verhalten: Rolle (z. B. Combobox/Button), `aria-expanded`-Zustand und ausgewählter Wert werden angesagt; ein einzelner Tab-Stopp mit interner Pfeiltastennavigation ist zulässig
- NVDA-Modus (erwartet): automatischer Wechsel (Browse Mode → Focus Mode beim Öffnen des Widgets)
- NVDA-Aktionen: Fokusmodus prüfen, Formularfeld-Navigation
- Zu prüfende Accessibility-Aspekte: Rolle, Name, Zustand (`aria-expanded`, `aria-selected`), Informationsdichte
- Nachbereitung/Reset: gesetzten Filter nach Test wieder entfernen
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich 1× nach Filterwechsel
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-NV-004 — Öffnen eines Work Items

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Listeneintrag
- Getestete Funktion: Ansage beim Öffnen der Detailansicht
- Seite/Zustand: Fokus auf einem Listeneintrag
- Ausgangszustand: Standardansicht geladen, mindestens ein Work Item sichtbar
- Benötigte Testdaten: mindestens 1 Work Item mit befülltem Titel
- Benötigte Berechtigung: Leserecht (Reader) im Testprojekt
- Ziel: Prüfen, ob Kontextwechsel (Panel/neue Seite) und neuer Fokus verständlich angekündigt werden
- Genaue Schritte: 1) Eintrag öffnen 2) Ansage direkt nach dem Öffnen abhören 3) fokussiertes Element identifizieren
- Erwartetes Verhalten: Der Wechsel wird wahrnehmbar, das neue fokussierte Element hat einen erkennbaren Namen/Rolle
- NVDA-Modus (erwartet): Browse Mode mit automatischer Ansage nach Aktivierung
- NVDA-Aktionen: automatische Ansage nach Aktivierung, ggf. Überschriftennavigation
- Zu prüfende Accessibility-Aspekte: Ankündigung des Kontextwechsels, Name/Rolle des neuen Fokusziels
- Nachbereitung/Reset: Detailpanel wieder schließen, keine Änderung vorgenommen
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich 1× nach vorheriger Mausinteraktion
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-NV-005 — Erstellen eines Work Items

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → „New Work Item“
- Getestete Funktion: Ansage des Erstellungsformulars
- Seite/Zustand: Work-Items-Übersicht geöffnet
- Ausgangszustand: Standardansicht geladen
- Benötigte Testdaten: keine bestehenden Work Items nötig
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Prüfen, ob Formular, Pflichtfelder und Titel-Label verständlich sind
- Genaue Schritte: 1) „New Work Item“ auslösen 2) Formular abhören 3) Titel-Feld-Label prüfen 4) Pflichtfeld-Kennzeichnung prüfen
- Erwartetes Verhalten: Formularfelder haben ein erkennbares Label, Pflichtfelder werden angesagt, sofern entsprechend ausgezeichnet
- NVDA-Modus (erwartet): automatischer Wechsel zu Focus Mode im Formular
- NVDA-Aktionen: Formularfeld-Navigation, Fokusmodus
- Zu prüfende Accessibility-Aspekte: Label-Zuordnung, Pflichtfeld-Ansage, Reihenfolge
- Nachbereitung/Reset: angelegtes Test-Work-Item eindeutig als Testdaten kennzeichnen oder nach Testlauf wieder entfernen, sofern Berechtigung vorhanden
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-NV-006 — Bearbeiten von Titel, Beschreibung und Status

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Work-Item-Detailansicht
- Getestete Funktion: Ansage von Titel-Feld, Rich-Text-Editor und Status-Dropdown
- Seite/Zustand: geöffnetes, bearbeitbares Work Item
- Ausgangszustand: Work Item mit befülltem Titel und Beschreibung geöffnet
- Benötigte Testdaten: mindestens 1 bearbeitbares Test-Work-Item
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Prüfen, ob Editor-Rolle, Toolbar und Status-Optionen verständlich sind
- Genaue Schritte: 1) Titel-Feld abhören 2) Beschreibungseditor abhören, Formatierungs-Toolbar-Buttons prüfen 3) Status-Dropdown abhören, Optionen und aktuelle Auswahl prüfen
- Erwartetes Verhalten: Editor-Rolle ist erkennbar, Toolbar-Buttons haben einen zugänglichen Namen, Status-Optionen und aktueller Wert sind erkennbar; ein einzelner Tab-Stopp mit interner Pfeiltastennavigation im Dropdown ist zulässig
- NVDA-Modus (erwartet): automatischer Wechsel zu Focus Mode in Editor und Dropdown
- NVDA-Aktionen: Fokusmodus im Editor, Formularfeld-Navigation
- Zu prüfende Accessibility-Aspekte: Icon-Button-Namen in der Toolbar, `aria-selected`/aktueller Wert im Dropdown
- Nachbereitung/Reset: geänderte Felder nach Test auf Ausgangswert zurücksetzen oder Work Item als Testdaten kennzeichnen
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-NV-007 — Kommentare

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Work-Item-Detailansicht → Kommentarbereich
- Getestete Funktion: Ansage von Kommentarfeld und vorhandenen Kommentaren
- Seite/Zustand: geöffnetes Work Item mit Kommentarbereich
- Ausgangszustand: Work Item geöffnet, mindestens ein vorhandener Kommentar (falls im Testdatensatz vorhanden) oder leerer Kommentarbereich
- Benötigte Testdaten: mindestens 1 Work Item mit Kommentarbereich, nach Möglichkeit mit mindestens 1 vorhandenem Kommentar
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Prüfen, ob Kommentarfeld, Autor:in und Zeitstempel verständlich sind
- Genaue Schritte: 1) Kommentarbereich abhören 2) Kommentarfeld fokussieren 3) Text eingeben und absenden, Bestätigung abhören
- Erwartetes Verhalten: Kommentarfeld hat ein erkennbares Label, vorhandene Kommentare sind mit Autor/Zeitstempel nachvollziehbar
- NVDA-Modus (erwartet): Browse Mode zum Lesen vorhandener Kommentare, automatischer Wechsel zu Focus Mode im Eingabefeld
- NVDA-Aktionen: lineares Lesen, Formularfeld-Navigation
- Zu prüfende Accessibility-Aspekte: Label des Kommentarfelds, Metadaten-Ansage, Informationsdichte
- Nachbereitung/Reset: Testkommentar als solchen kennzeichnen; Entfernen nur, sofern Testaccount dies erlaubt
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-NV-008 — Speichern und Abbrechen

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Work-Item-Detailansicht
- Getestete Funktion: Ansage von Save/Discard-Aktionen und deren Ergebnis
- Seite/Zustand: Work Item mit ungespeicherten Änderungen
- Ausgangszustand: Work Item geöffnet, ein Feld wird geändert
- Benötigte Testdaten: mindestens 1 bearbeitbares Test-Work-Item
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Prüfen, ob Aktionen und Statusrückmeldung (z. B. „Saved“) wahrnehmbar sind
- Genaue Schritte: 1) Save auslösen, Rückmeldung abhören 2) erneut ändern, Discard auslösen, Rückmeldung abhören
- Erwartetes Verhalten: Buttons haben einen erkennbaren Namen, Statusänderung wird angekündigt (z. B. über Live-Region)
- NVDA-Modus (erwartet): Browse Mode mit automatischer Ansage bei Live-Region-Updates
- NVDA-Aktionen: automatische Ansage, Live-Region-Beobachtung
- Zu prüfende Accessibility-Aspekte: Ansage von Statusänderungen, Button-Namen
- Nachbereitung/Reset: bei Save-Durchlauf Feld auf Ausgangswert zurücksetzen; bei Discard-Durchlauf keine Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× je Aktion (Save, Discard)
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-NV-009 — Dialoge und Menüs

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Kontextmenü eines Eintrags bzw. der Detailansicht
- Getestete Funktion: Ansage von Kontextmenü und Bestätigungsdialog (z. B. Delete Work Item)
- Seite/Zustand: geöffnetes Work Item oder Listeneintrag mit verfügbarem Kontextmenü
- Ausgangszustand: Work Item bzw. Listeneintrag mit sichtbarem Menü-Trigger
- Benötigte Testdaten: mindestens 1 entbehrliches Test-Work-Item, dessen Löschung im Testprojekt grundsätzlich unkritisch wäre (die Löschung wird dennoch nicht ausgeführt, siehe „Hinweis zu destruktiven Aktionen“)
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor); ein Löschrecht ist nicht zwingend erforderlich, da keine Löschung ausgeführt wird
- Ziel: Prüfen, ob Dialogrolle, Fokusfang und Fokusrückkehr verständlich sind, ohne die Löschung tatsächlich auszuführen
- Genaue Schritte: 1) Menü öffnen, Rolle/Optionen abhören 2) „Delete“-Option anfahren, Bestätigungsdialog öffnen, Titel/Rolle abhören 3) im Dialog navigieren 4) mit `Escape`/Cancel schließen, **ohne zu löschen**, Fokus danach prüfen
- Erwartetes Verhalten: Der Dialog wird als solcher angekündigt (Rolle, Titel), der Fokus bleibt im Dialog, kehrt nach Schließen zum Auslöser zurück
- NVDA-Modus (erwartet): automatischer Wechsel zu Focus Mode (modaler Dialog)
- NVDA-Aktionen: automatische Ansage, Fokusmodus, Dialog-Navigation
- Zu prüfende Accessibility-Aspekte: Dialogrolle/-titel, Fokusfang, Fokusrückkehr
- Nachbereitung/Reset: Dialog abbrechen (Escape/Cancel); keine Löschung ausführen; keine weitere Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-NV-010 — Fokus nach dynamischen Änderungen

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Work-Item-Detailansicht
- Getestete Funktion: Ansage dynamischer Aktualisierungen (Statusänderung, Speichern, Panel schließen)
- Seite/Zustand: bearbeitetes, noch nicht gespeichertes Work Item
- Ausgangszustand: Work Item geöffnet, ein Feld wird geändert
- Benötigte Testdaten: mindestens 1 bearbeitbares Test-Work-Item
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Prüfen, ob Änderungen und das neue Fokusziel angekündigt werden
- Genaue Schritte: 1) Statusänderung auslösen, Ansage abhören 2) Speichern auslösen, Ansage abhören 3) Panel schließen, Ansage und Fokusziel abhören
- Erwartetes Verhalten: Änderungen werden über Live-Region oder Fokuswechsel wahrnehmbar, kein stiller Zustandswechsel
- NVDA-Modus (erwartet): Browse Mode mit automatischer Ansage bei Live-Region-Updates
- NVDA-Aktionen: Live-Region-Beobachtung, automatische Ansage
- Zu prüfende Accessibility-Aspekte: Ankündigung dynamischer Änderungen (Abschnitt 6.1), Fokuskonsistenz
- Nachbereitung/Reset: vorgenommene Änderungen auf Ausgangswert zurücksetzen
- Anzahl der Wiederholungen: mindestens 1× je Zustandswechsel (Statusänderung, Speichern, Panel schließen); bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Sinngemäße/kurze wörtliche Ansage: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-NV-011 — Ansage und Zuordnung von Validierungsfehlern

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Work-Item-Detailansicht
- Getestete Funktion: Screenreader-Ansage von Validierungsfehlern und deren Zuordnung zum betroffenen Feld
- Seite/Zustand: neues oder bearbeitetes Work Item mit ungültigem/fehlendem Pflichtfeld
- Ausgangszustand: Work Item geöffnet, Pflichtfeld (z. B. Titel) wird geleert bzw. ungültig gesetzt
- Benötigte Testdaten: mindestens 1 Work Item mit editierbarem Pflichtfeld (z. B. Titel)
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Prüfen, ob der Fehler angesagt wird und die Zuordnung (z. B. über `aria-describedby`/`aria-invalid`) verständlich ist
- Genaue Schritte: 1) Pflichtfeld leeren bzw. ungültig setzen 2) Speichern auslösen 3) Ansage abhören 4) betroffenes Feld erneut fokussieren, Fehlerhinweis-Ansage prüfen
- Erwartetes Verhalten: Der Fehler wird angekündigt (z. B. über Live-Region oder Fokussetzung auf den Fehler), das betroffene Feld kündigt bei erneutem Fokus den Fehlerzustand bzw. -hinweis an
- NVDA-Modus (erwartet): automatischer Wechsel (Formularfeld → Focus Mode), Live-Region-Ansage ggf. im Browse Mode wahrnehmbar
- NVDA-Aktionen: automatische Ansage, Formularfeld-Navigation, Live-Region-Beobachtung
- Zu prüfende Accessibility-Aspekte: `aria-invalid`, `aria-describedby`-Verknüpfung, Live-Region-Ankündigung
- Nachbereitung/Reset: Pflichtfeld nach Test wieder gültig befüllen; Work Item speichern oder Änderung verwerfen
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
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

11 Testfälle definiert (TC-AZ-WI-NV-001 bis TC-AZ-WI-NV-011). Noch keine Testläufe durchgeführt. Kein Befund, keine Severity, keine WCAG-Zuordnung bis zur tatsächlichen Durchführung.
