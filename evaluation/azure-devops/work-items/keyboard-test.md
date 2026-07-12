# Azure DevOps – Work Items/Boards – Keyboard-only-Testprotokoll

Status: **offen, verpflichtend** (D-024, `docs/TODO.md`).

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 4.1 (Szenario), Abschnitt 5 (Keyboard-only-Regeln), Abschnitt 5.3 (zustandsabhängige Wiederholung), Abschnitt 5.4 (Bewertung roving tabindex).

Testumgebung: siehe `../environment.md` (pro Testlauf verlinken oder Datum referenzieren).

## Primäre Azure-Oberfläche

- Primäre Oberfläche für diesen Workflow: **Work Items** (linke Hauptnavigation: Boards → Work Items).
- Boards, Backlogs und Queries sind nur ergänzende Oberflächen. Wird ein Testfall abweichend davon auf Boards/Backlogs/Queries durchgeführt, wird dies im Feld „Getestete Azure-Oberfläche“ ausdrücklich als **ergänzend/abweichend** gekennzeichnet. Der Katalog unten enthält keinen verpflichtenden Board-spezifischen Testfall (z. B. Spalten-/Kartennavigation); ein solcher kann bei Bedarf später ergänzt und entsprechend gekennzeichnet werden.

## Erlaubte Tasten

`Tab`, `Shift+Tab`, `Enter`, `Space`, Pfeiltasten, `Escape`, ggf. erwartete `Home`/`End` in Composite Widgets. Ab dem definierten Startpunkt keine Maus.

## Szenario

Mindestschritte gemäß Abschnitt 4.1, angepasst an Azure-DevOps-Terminologie und die primäre Oberfläche Work Items:

1. Work-Items-Übersicht öffnen (primär: Work Items; Backlog/Board nur ergänzend und gekennzeichnet)
2. Zustände/Status unterscheiden oder wechseln
3. Suche bzw. Filter bedienen
4. Sortierung bedienen
5. Work Item in der Liste öffnen
6. Detailinformationen erfassen
7. Kommentar verfassen
8. Formatierungsfunktionen im Kommentar-/Beschreibungsfeld prüfen
9. Felder wie Assigned To, Area Path, Iteration, Tags bzw. Sidebar-Aktionen prüfen
10. Status ändern, sofern Testaccount dies erlaubt

Der folgende Testfallkatalog operationalisiert dieses Szenario in 11 konkrete, eigenständig durchführbare Testfälle. Er ersetzt das bisherige generische Schritt-für-Schritt-Protokoll als primäres Dokumentationsformat.

## Hinweis zu destruktiven Aktionen

Destruktive Aktionen (z. B. Delete Work Item) werden im Rahmen dieses Katalogs nur bis zum geöffneten Bestätigungsdialog durchgeführt und anschließend abgebrochen (`Escape` bzw. Cancel-Aktion). Es wird keine tatsächliche Löschung ausgeführt, solange keine ausdrückliche spätere Freigabe vorliegt.

## Hinweis zu Composite Widgets

Erwartetes Verhalten wird neutral formuliert: Es wird nicht vorausgesetzt, dass jedes Einzelelement eines Composite Widgets per `Tab` erreichbar sein muss. Ein korrektes Pfeiltasten-, Roving-Tabindex-, Combobox-, Grid- oder Tablist-Pattern mit einem Tab-Stopp und konsistenter interner Bedienung gilt als zulässig (Abschnitt 5.4).

## Testfallkatalog

### TC-AZ-WI-KB-001 — Navigation zur Work-Items-Übersicht

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items
- Getestete Funktion: Erreichbarkeit der Work-Items-Übersicht über die Hauptnavigation
- Seite/Zustand: beliebige Projektseite vor Navigation
- Ausgangszustand: Testaccount angemeldet, kein Filter aktiv, Fokus auf erstem fokussierbarem Element der Seite
- Benötigte Testdaten: keine speziellen Work Items nötig
- Benötigte Berechtigung: Leserecht (Reader) im Testprojekt
- Ziel: Work-Items-Übersicht ausschließlich per Tastatur erreichen
- Genaue Schritte: 1) Von der Ausgangsseite per Tab zur Hauptnavigation 2) Eintrag „Work Items“ fokussieren 3) mit Enter öffnen 4) Übersichtsseite erreichen
- Erwartetes Verhalten: Navigationseintrag ist per Tab erreichbar, sichtbarer Fokus vorhanden, Enter öffnet die Work-Items-Übersicht
- Relevante Tasten: `Tab`, `Shift+Tab`, `Enter`
- Zu prüfende Accessibility-Aspekte: Reihenfolge der Hauptnavigation, sichtbarer Fokus, Erreichbarkeit ohne Umweg
- Nachbereitung/Reset: keine Nachbereitung nötig (rein navigierende Aktion)
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich 1× nach Reload; bei Abweichung weitere Wiederholung (Abschnitt 5.3/12)
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-KB-002 — Listen-/Tabellenbedienung

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items (Listen-/Grid-Ansicht)
- Navigationspfad: Projekt → Boards → Work Items
- Getestete Funktion: Navigation innerhalb der Work-Items-Liste/des Grids
- Seite/Zustand: Work-Items-Übersicht mit mehreren Einträgen geladen
- Ausgangszustand: Standardquery bzw. „Assigned to me“ oder gleichwertige Ansicht geladen, kein Filter aktiv
- Benötigte Testdaten: mindestens 3 Work Items unterschiedlichen Typs (z. B. Task, Bug, User Story) und unterschiedlichen Status im Testprojekt
- Benötigte Berechtigung: Leserecht (Reader) im Testprojekt
- Ziel: Zeilen und relevante Zellen/Links per Tastatur erreichen
- Genaue Schritte: 1) Tab in die Liste 2) Pfeiltasten/Tab zwischen Zeilen bzw. Zellen testen 3) Titel-Link eines Eintrags fokussieren
- Erwartetes Verhalten: Die Liste/das Grid folgt einem konsistenten, nachvollziehbaren Interaktionsmuster (z. B. Tab-Liste mit einem Stopp pro Zeile oder Grid mit Pfeiltastennavigation und roving tabindex); nicht jede Zelle muss einzeln per Tab erreichbar sein, wenn Pfeiltasten zuverlässig funktionieren und das Fokusziel erkennbar bleibt
- Relevante Tasten: `Tab`, Pfeiltasten, `Enter`
- Zu prüfende Accessibility-Aspekte: Konsistenz des Tastenmodells, roving tabindex (Abschnitt 5.4), Fokusziel je Zeile
- Nachbereitung/Reset: keine Nachbereitung nötig; ggf. versehentlich geänderte Sortierung zurücksetzen
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich je 1× nach Reload und nach Sortierwechsel (Abschnitt 5.3)
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-KB-003 — Suche und Filter

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Filterleiste
- Getestete Funktion: Bedienung von Such-/Filterleiste (State-Filter, Assigned-To-Filter)
- Seite/Zustand: Work-Items-Übersicht ohne aktiven Filter
- Ausgangszustand: Standardansicht geladen, Fokus außerhalb der Filterleiste
- Benötigte Testdaten: mindestens 3 Work Items mit unterschiedlichem Status bzw. Assigned-To-Wert, damit ein Filter sichtbar wirkt
- Benötigte Berechtigung: Leserecht (Reader) im Testprojekt
- Ziel: Filter setzen und wieder entfernen, ausschließlich per Tastatur
- Genaue Schritte: 1) Tab zur Filterleiste 2) Filter-Widget öffnen (Enter/Space) 3) Wert auswählen (Pfeiltasten/Enter) 4) Filter wieder entfernen
- Erwartetes Verhalten: Das Filter-Widget folgt einem erkennbaren Interaktionsmuster (z. B. Button, der eine Listbox öffnet, oder Combobox mit interner Pfeiltastennavigation); ein einzelner Tab-Stopp mit anschließender Pfeiltasten-/Enter-Bedienung ist korrekt, wenn Rolle, Zustand und Exit-Verhalten konsistent sind; Ergebnisliste aktualisiert sich nachvollziehbar
- Relevante Tasten: `Tab`, `Enter`, `Space`, Pfeiltasten, `Escape`
- Zu prüfende Accessibility-Aspekte: Interaktionsmodell (Composite Widget vs. natives Select), Rückkehr des Fokus nach Schließen
- Nachbereitung/Reset: gesetzten Filter nach Test wieder entfernen
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich 1× nach Filterwechsel (Abschnitt 5.3)
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-KB-004 — Öffnen eines Work Items

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Listeneintrag
- Getestete Funktion: Öffnen eines einzelnen Work Items aus der Liste
- Seite/Zustand: Work-Items-Liste mit Fokus auf einem Eintrag
- Ausgangszustand: Standardansicht geladen, mindestens ein Work Item in der Liste sichtbar
- Benötigte Testdaten: mindestens 1 Work Item mit befülltem Titel
- Benötigte Berechtigung: Leserecht (Reader) im Testprojekt
- Ziel: Detailansicht/-panel öffnen und Fokus dort verorten
- Genaue Schritte: 1) Titel-Link fokussieren 2) Enter drücken 3) Fokusziel in der Detailansicht feststellen
- Erwartetes Verhalten: Detailansicht öffnet zuverlässig, Fokus landet an einer nachvollziehbaren Stelle (z. B. Titel-Feld oder Panel-Anfang)
- Relevante Tasten: `Tab`, `Enter`
- Zu prüfende Accessibility-Aspekte: Fokusziel nach Öffnen, Panel vs. neue Seite, Erreichbarkeit des Schließen-Elements
- Nachbereitung/Reset: Detailpanel wieder schließen, keine Änderung vorgenommen
- Anzahl der Wiederholungen: mindestens 1× Grundlauf, zusätzlich 1× nach vorheriger Mausinteraktion (Abschnitt 5.3)
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-KB-005 — Erstellen eines Work Items

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → „New Work Item“
- Getestete Funktion: Neues Work Item über „New Work Item“-Aktion anlegen
- Seite/Zustand: Work-Items-Übersicht geöffnet
- Ausgangszustand: Standardansicht geladen
- Benötigte Testdaten: keine bestehenden Work Items nötig
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Erstellungsformular ausschließlich per Tastatur öffnen und Pflichtfelder erreichen
- Genaue Schritte: 1) Tab zu „New Work Item“ 2) Enter/Auswahl des Work-Item-Typs 3) Titel-Feld erreichen und befüllen 4) weitere Felder per Tab durchlaufen
- Erwartetes Verhalten: Aktion ist per Tastatur auslösbar, Formular öffnet mit erreichbarem Titel-Feld, logische Tab-Reihenfolge
- Relevante Tasten: `Tab`, `Enter`, Texteingabe
- Zu prüfende Accessibility-Aspekte: Erreichbarkeit der Aktion, Formular-Tab-Reihenfolge, Pflichtfeld-Kennzeichnung
- Nachbereitung/Reset: angelegtes Test-Work-Item eindeutig als Testdaten kennzeichnen oder nach Testlauf wieder entfernen, sofern Berechtigung vorhanden; keine Vermischung mit Produktivdaten
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-KB-006 — Bearbeiten von Titel, Beschreibung und Status

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Work-Item-Detailansicht
- Getestete Funktion: Bearbeitung von Titel-Feld, Rich-Text-Beschreibungseditor und Status-Dropdown
- Seite/Zustand: geöffnetes, bearbeitbares Work Item
- Ausgangszustand: Work Item mit befülltem Titel und Beschreibung geöffnet
- Benötigte Testdaten: mindestens 1 bearbeitbares Test-Work-Item
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Alle drei Felder ausschließlich per Tastatur ändern
- Genaue Schritte: 1) Titel-Feld fokussieren, Text ändern 2) Tab zum Beschreibungseditor, Text eingeben, Formatierungs-Toolbar prüfen 3) Tab zum Status-Dropdown, Wert per Pfeiltasten/Enter ändern
- Erwartetes Verhalten: Titel- und Beschreibungsfeld sind erreichbar und bedienbar, Formatierungs-Toolbar ist per Tastatur nutzbar; das Status-Dropdown folgt einem erkennbaren Muster (natives Select oder ARIA-Listbox/Combobox mit Pfeiltasten) – nicht jede Option muss einzeln per Tab erreichbar sein, wenn Pfeiltasten und Auswahlbestätigung konsistent funktionieren
- Relevante Tasten: `Tab`, Texteingabe, Pfeiltasten, `Enter`, `Escape`
- Zu prüfende Accessibility-Aspekte: Editor-Toolbar-Erreichbarkeit (Vergleich zu GitHub-Markdown-Toolbar-Befund), Dropdown-Interaktionsmodell, sichtbarer Fokus im Rich-Text-Editor
- Nachbereitung/Reset: geänderte Felder nach Test auf Ausgangswert zurücksetzen oder Work Item als Testdaten kennzeichnen
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-KB-007 — Kommentare

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Work-Item-Detailansicht → Kommentarbereich
- Getestete Funktion: Kommentar zu einem Work Item verfassen
- Seite/Zustand: geöffnetes Work Item mit vorhandenem Kommentarbereich
- Ausgangszustand: Work Item geöffnet, Kommentarfeld leer
- Benötigte Testdaten: mindestens 1 Work Item mit Kommentarbereich
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Kommentarfeld erreichen, Text eingeben, absenden
- Genaue Schritte: 1) Tab zum Kommentarfeld 2) Text eingeben 3) Senden-Aktion per Tastatur auslösen
- Erwartetes Verhalten: Kommentarfeld ist erreichbar, Senden-Button ist erreichbar und auslösbar, Fokus nach dem Senden ist nachvollziehbar
- Relevante Tasten: `Tab`, Texteingabe, `Enter`
- Zu prüfende Accessibility-Aspekte: Erreichbarkeit, Fokusverhalten nach Absenden
- Nachbereitung/Reset: Testkommentar als solchen kennzeichnen; Entfernen nur, sofern Testaccount dies erlaubt
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-KB-008 — Speichern und Abbrechen

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Work-Item-Detailansicht
- Getestete Funktion: Save/Discard-Aktionen nach Bearbeitung
- Seite/Zustand: Work Item mit ungespeicherten Änderungen
- Ausgangszustand: Work Item geöffnet, ein Feld wird geändert
- Benötigte Testdaten: mindestens 1 bearbeitbares Test-Work-Item
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Speichern und separat Abbrechen jeweils per Tastatur auslösen
- Genaue Schritte: 1) Änderung vornehmen 2) Tab zu Save, mit Enter auslösen 3) erneut Änderung vornehmen 4) Tab zu Discard/Cancel, mit Enter auslösen
- Erwartetes Verhalten: Beide Aktionen sind erreichbar und auslösbar, das Ergebnis (gespeichert/verworfen) ist nachvollziehbar
- Relevante Tasten: `Tab`, `Enter`
- Zu prüfende Accessibility-Aspekte: Erreichbarkeit, Bestätigung/Rückmeldung, Fokus nach Aktion
- Nachbereitung/Reset: bei Save-Durchlauf Feld auf Ausgangswert zurücksetzen; bei Discard-Durchlauf keine Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× je Aktion (Save, Discard)
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-KB-009 — Dialoge und Menüs

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Kontextmenü eines Eintrags bzw. der Detailansicht
- Getestete Funktion: Kontextmenü (z. B. „…“-Menü) und Bestätigungsdialog (z. B. Delete Work Item)
- Seite/Zustand: geöffnetes Work Item oder Listeneintrag mit verfügbarem Kontextmenü
- Ausgangszustand: Work Item bzw. Listeneintrag mit sichtbarem Menü-Trigger
- Benötigte Testdaten: mindestens 1 entbehrliches Test-Work-Item, dessen Löschung im Testprojekt grundsätzlich unkritisch wäre (die Löschung wird dennoch nicht ausgeführt, siehe „Hinweis zu destruktiven Aktionen“)
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor); ein Löschrecht ist nicht zwingend erforderlich, da keine Löschung ausgeführt wird
- Ziel: Menü und Dialog vollständig per Tastatur bedienen, ohne die Löschung tatsächlich auszuführen
- Genaue Schritte: 1) Menü-Trigger fokussieren, mit Enter/Space öffnen 2) mit Pfeiltasten „Delete“-Option anfahren, ohne zu bestätigen 3) mit Enter den Bestätigungsdialog öffnen 4) im Dialog navigieren 5) mit `Escape` bzw. Cancel-Button schließen, **ohne zu löschen**
- Erwartetes Verhalten: Menü öffnet/schließt vorhersehbar, Pfeiltastennavigation funktioniert, der Dialog fängt den Fokus, `Escape`/Cancel schließt ohne Aktion, Fokus kehrt zum Auslöser zurück
- Relevante Tasten: `Enter`, `Space`, Pfeiltasten, `Escape`, `Tab`
- Zu prüfende Accessibility-Aspekte: Fokusfang im Dialog, Fokusrückkehr zum Trigger, Escape-/Cancel-Verhalten
- Nachbereitung/Reset: Dialog abbrechen (Escape/Cancel); keine Löschung ausführen; keine weitere Nachbereitung nötig
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-KB-010 — Fokus nach dynamischen Änderungen

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Work-Item-Detailansicht
- Getestete Funktion: Fokusverhalten nach Statusänderung, Speichern oder Schließen eines Panels
- Seite/Zustand: bearbeitetes, noch nicht gespeichertes Work Item
- Ausgangszustand: Work Item geöffnet, ein Feld wird geändert
- Benötigte Testdaten: mindestens 1 bearbeitbares Test-Work-Item
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Fokusziel nach mehreren dynamischen Zustandswechseln dokumentieren
- Genaue Schritte: 1) Statusänderung auslösen, Fokus danach prüfen 2) Speichern auslösen, Fokus danach prüfen 3) Detailpanel schließen, Fokus danach prüfen (Rückkehr zur Liste?)
- Erwartetes Verhalten: Fokus geht nicht verloren, springt nicht unerwartet, kehrt nach Schließen nachvollziehbar zum Auslöser oder zur Liste zurück
- Relevante Tasten: `Tab`, `Enter`, `Escape`
- Zu prüfende Accessibility-Aspekte: Fokusverlust, unerwartete Sprünge, Rückkehr zum Auslöser (Abschnitt 5.2/5.3)
- Nachbereitung/Reset: vorgenommene Änderungen auf Ausgangswert zurücksetzen
- Anzahl der Wiederholungen: mindestens 1× je Zustandswechsel (Statusänderung, Speichern, Panel schließen); bei Abweichung weitere Wiederholung (Abschnitt 5.3)
- Reproduzierbarkeit: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Evidenz: nicht erhoben
- DOM-/ARIA-Nachprüfung: offen
- WCAG-Kandidat: offen
- Severity: nicht erhoben
- Status: offen

### TC-AZ-WI-KB-011 — Validierung und Fehlermeldungen

- Workflow: Work Items/Boards
- Getestete Azure-Oberfläche: primär – Work Items
- Navigationspfad: Projekt → Boards → Work Items → Work-Item-Detailansicht
- Getestete Funktion: Auslösen und Erreichen von Validierungsfehlern beim Speichern (z. B. Pflichtfeld Titel leer bzw. ungültig)
- Seite/Zustand: neues oder bearbeitetes Work Item mit ungültigem/fehlendem Pflichtfeld
- Ausgangszustand: Work Item geöffnet, Pflichtfeld (z. B. Titel) wird geleert bzw. ungültig gesetzt
- Benötigte Testdaten: mindestens 1 Work Item mit editierbarem Pflichtfeld (z. B. Titel)
- Benötigte Berechtigung: Bearbeitungsrecht (Contributor) im Testprojekt
- Ziel: Prüfen, ob der Fehlerzustand nach fehlgeschlagener Validierung per Tastatur erreichbar und der Fokus nachvollziehbar ist
- Genaue Schritte: 1) Pflichtfeld leeren bzw. ungültig setzen 2) Speichern auslösen 3) prüfen, wohin der Fokus springt 4) Fehlermeldung per Tastatur lokalisieren und erreichen
- Erwartetes Verhalten: Nach fehlgeschlagener Validierung wird der Fokus nachvollziehbar gesetzt (z. B. auf das fehlerhafte Feld oder die Fehlermeldung), die Fehlermeldung ist per Tastatur auffindbar
- Relevante Tasten: `Tab`, `Enter`
- Zu prüfende Accessibility-Aspekte: Fokusverhalten nach Validierungsfehler, Erreichbarkeit der Fehlermeldung, Zusammenhang zwischen Feld und Fehlertext
- Nachbereitung/Reset: Pflichtfeld nach Test wieder gültig befüllen; Work Item speichern oder Änderung verwerfen
- Anzahl der Wiederholungen: mindestens 1× Grundlauf; bei Abweichung weitere Wiederholung
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

11 Testfälle definiert (TC-AZ-WI-KB-001 bis TC-AZ-WI-KB-011). Noch keine Testläufe durchgeführt. Kein Befund, keine Severity, keine WCAG-Zuordnung bis zur tatsächlichen Durchführung.
