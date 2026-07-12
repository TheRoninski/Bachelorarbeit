# Azure DevOps – Pull Requests – Keyboard-only-Testprotokoll

Status: **offen, verpflichtend** (D-024, `docs/TODO.md`).

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 4.2 (Szenario), Abschnitt 5 (Keyboard-only-Regeln), Abschnitt 5.3 (zustandsabhängige Wiederholung), Abschnitt 5.4 (Bewertung roving tabindex).

Testumgebung: siehe `../environment.md`.

## Erlaubte Tasten

`Tab`, `Shift+Tab`, `Enter`, `Space`, Pfeiltasten, `Escape`, ggf. erwartete `Home`/`End` in Composite Widgets. Ab dem definierten Startpunkt keine Maus.

## Szenario (Abschnitt 4.2)

1. Pull-Request-Übersicht öffnen
2. Pull Request öffnen
3. zwischen Overview/Conversation, Files bzw. Files changed und Updates/Commits navigieren
4. Review- und Kommentarbereich erreichen
5. Kommentar oder Review verfassen
6. Aktionen und Sidebar-Controls (z. B. Reviewers, Work Items verknüpfen, Complete/Abandon) bedienen
7. Dialoge, Menüs und Dropdowns prüfen
8. Fokus nach Schließen oder Aktion kontrollieren

## Testprotokoll je Schritt

```
### Schritt: <Nr./Kurzbezeichnung>

- Zustand: <z. B. nach Reload | nach Tab-Wechsel | nach Menü öffnen/schließen | nach Dialog öffnen/schließen | nach vorheriger Mausinteraktion | nach Rücknavigation>
- Fokussiertes Element vor Aktion: nicht erhoben
- Tastenfolge: nicht erhoben
- Erwartetes Verhalten: nicht erhoben
- Beobachtetes Verhalten: nicht erhoben
- Fokusfalle/Fokusverlust/unerwarteter Sprung: nicht erhoben
- Wiederholungen (Anzahl, Abweichungen): nicht erhoben
- Vorläufiger Befund-Bezug: keiner | AZ-PR-KB-###
```

## Bewertung roving tabindex

Nicht automatisch als Fehler werten (Abschnitt 5.4): genau ein `tabindex="0"` plus weitere `tabindex="-1"` innerhalb eines Composite Widgets. Erst als Problem dokumentieren, wenn Pfeiltastennavigation unzuverlässig ist, Fokusziel nicht aktualisiert wird, Elemente übersprungen werden, Fokus den Bereich unerwartet verlässt, Rolle/Interaktionsmodell unverständlich sind oder die Aufgabe dadurch eingeschränkt/blockiert ist.

## Ergebnis dieses Testblocks

Noch keine Testläufe durchgeführt. Kein Befund, keine Severity, keine WCAG-Zuordnung bis zur tatsächlichen Durchführung.
