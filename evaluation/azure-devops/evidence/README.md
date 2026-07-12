# Azure DevOps – Evidence (Screenshots/Videos)

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 13 (Screenshots); `CLAUDE.md` Regel 10 (keine personenbezogenen oder sensiblen Daten).

Dieser Ordner enthält aktuell **keine** Screenshots oder Videos. Es werden hier nur Ablageregeln und Dateinamenskonventionen vorbereitet. Dateien werden erst abgelegt, wenn ein tatsächlicher Testlauf sie erzeugt hat; keine Datei wird vorab erfunden oder platzhalterhaft mit Inhalt angelegt.

## Anforderungen an Screenshots (Abschnitt 13)

- relevanten Bereich ausreichend groß zeigen, irrelevante Fläche wegschneiden
- rote Rahmen konsistent verwenden
- Fokuszustand sichtbar machen, wenn möglich
- keine sensiblen Daten zeigen (keine echten Namen, E-Mail-Adressen, Tokens, private Repository-/Projektinhalte)
- Plattform, Workflow und Zustand aus Dateiname oder Caption erkennbar machen

## Dateinamenskonvention

```
az-<workflow>-<methode>-<kurzbeschreibung>-<laufende-nummer>.<ext>
```

- `<workflow>`: `wi` (Work Items/Boards) oder `pr` (Pull Requests)
- `<methode>`: `kb` (Keyboard-only), `nvda`, `dom` (DOM-/Accessibility-Tree-Ausschnitt)
- `<kurzbeschreibung>`: kurz, englisch, kebab-case
- `<laufende-nummer>`: 3-stellig, pro Kombination aus Workflow/Methode/Kurzbeschreibung neu vergeben
- `<ext>`: `png` für Screenshots, `mp4`/`webm` für Videos

Beispiele (Dateiname als Konvention, keine tatsächlich vorhandene Datei): `az-wi-kb-filter-toolbar-001.png`, `az-pr-nvda-review-dialog-focus-001.mp4`.

## Verknüpfung mit Befunden

Jede Evidence-Datei wird im zugehörigen Barrier-Log- oder Positive-Examples-Eintrag unter „Screenshot-/Video-Referenz“ mit Dateinamen referenziert. Umgekehrt darf keine Evidence-Datei ohne zugehörigen Eintrag in `../barrier-log.md` oder `../positive-examples.md` interpretiert werden.

## Datenschutz

- keine Zugangsdaten, Cookies, Session-Tokens
- keine echten Personennamen oder E-Mail-Adressen sichtbarer Testaccounts
- keine privaten, nicht-anonymisierten Organisations- oder Projektdaten
- bei Unsicherheit: Bereich vor dem Screenshot schwärzen oder Ausschnitt enger wählen

## Aktueller Inhalt

Leer. Noch keine Testläufe durchgeführt.
