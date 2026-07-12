# Azure DevOps – Work Items/Boards – Keyboard-only-Testprotokoll

Status: **offen, verpflichtend** (D-024, `docs/TODO.md`).

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 4.1 (Szenario), Abschnitt 5 (Keyboard-only-Regeln), Abschnitt 5.3 (zustandsabhängige Wiederholung), Abschnitt 5.4 (Bewertung roving tabindex).

Testumgebung: siehe `../environment.md` (pro Testlauf verlinken oder Datum referenzieren).

## Erlaubte Tasten

`Tab`, `Shift+Tab`, `Enter`, `Space`, Pfeiltasten, `Escape`, ggf. erwartete `Home`/`End` in Composite Widgets. Ab dem definierten Startpunkt keine Maus.

## Szenario

Mindestschritte gemäß Abschnitt 4.1, angepasst an Azure-DevOps-Terminologie (Work Item statt Issue, Board optional ergänzend):

1. Work-Items-Übersicht bzw. Backlog/Board öffnen
2. offene und geschlossene bzw. Zustands-Spalten (z. B. New/Active/Closed) unterscheiden oder wechseln
3. Suche bzw. Filter bedienen
4. Sortierung bedienen
5. Work Item in der Liste bzw. auf dem Board öffnen
6. Detailinformationen erfassen
7. Kommentar verfassen
8. Formatierungsfunktionen im Kommentar-/Beschreibungsfeld prüfen
9. Felder wie Assigned To, Area Path, Iteration, Tags bzw. Sidebar-Aktionen prüfen
10. Status ändern, sofern Testaccount dies erlaubt

Board-spezifisch, falls im Testlauf enthalten: Spaltennavigation, Kartenreihenfolge, Drag-and-Drop-Alternative per Tastatur (falls vorhanden) prüfen.

## Testprotokoll je Schritt

Pro Schritt und relevantem Zustand folgenden Block kopieren. Erwartetes und beobachtetes Verhalten strikt trennen; kein beobachtetes Verhalten vorwegnehmen.

```
### Schritt: <Nr./Kurzbezeichnung>

- Zustand: <z. B. nach Reload | nach Filterwechsel | nach Sortierwechsel | nach Menü öffnen/schließen | nach vorheriger Mausinteraktion | nach Rücknavigation>
- Fokussiertes Element vor Aktion: nicht erhoben
- Tastenfolge: nicht erhoben
- Erwartetes Verhalten: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Fokusfalle/Fokusverlust/unerwarteter Sprung: nicht erhoben
- Wiederholungen (Anzahl, Abweichungen): nicht erhoben
- Vorläufiger Befund-Bezug: keiner | AZ-WI-KB-###
```

## Bewertung roving tabindex

Nicht automatisch als Fehler werten (Abschnitt 5.4): genau ein `tabindex="0"` plus weitere `tabindex="-1"` innerhalb eines Composite Widgets. Erst als Problem dokumentieren, wenn Pfeiltastennavigation unzuverlässig ist, Fokusziel nicht aktualisiert wird, Elemente übersprungen werden, Fokus den Bereich unerwartet verlässt, Rolle/Interaktionsmodell unverständlich sind oder die Aufgabe dadurch eingeschränkt/blockiert ist.

## Ergebnis dieses Testblocks

Noch keine Testläufe durchgeführt. Kein Befund, keine Severity, keine WCAG-Zuordnung bis zur tatsächlichen Durchführung.
