# GitHub Accessibility Shortcuts – Prototyp

Browser-Erweiterung (WebExtension, Manifest V3) für Google Chrome. Adressiert ausgewählte, in der Evaluation vorläufig als S1 (kritisch) dokumentierte Keyboard-Barrieren in den GitHub-Workflows **Issues** und **Pull Requests**. Kein vollständiger Ersatz für native Plattformkorrekturen (siehe `docs/EXTENSION_SPEC.md` Abschnitt 1 und 12).

## 1. Installation (Studien-/Testbuild)

1. `chrome://extensions` öffnen.
2. „Entwicklermodus“ aktivieren.
3. „Entpackte Erweiterung laden“ wählen und den Ordner `extension/` auswählen.
4. Auf einer GitHub-Issues- oder Pull-Request-Seite testen.

Deaktivierung/Aktivierung erfolgt über den Standard-Toggle unter `chrome://extensions` (P0-Anforderung „klare Aktivierungs- und Deaktivierungsmöglichkeit“, siehe `docs/EXTENSION_SPEC.md` Abschnitt 5). Eine eigene Optionsseite ist bewusst nicht Teil des MVP (P3, siehe `docs/TODO.md` „Nice to Have“).

Keine Datenübertragung, kein Tracking, keine Berechtigungen über die reine Seiteninjektion hinaus (`manifest.json`: `"permissions": []`, `"host_permissions": []`). Wo das Skript injiziert wird, bestimmt ausschließlich das `content_scripts`-Matching (siehe Architektur), nicht diese leeren Berechtigungsfelder.

## 2. Shortcuts

Alle Shortcuts verwenden `Alt+Shift+<Taste>`, sind deaktiviert während ein Eingabefeld fokussiert ist, und lösen nur eine Fokusverschiebung aus (keine Inhaltsänderung).

| Shortcut | Ziel | Verfügbar auf |
|---|---|---|
| `Alt+Shift+F` | Issues-Filter/Suche | Issues-Liste |
| `Alt+Shift+I` | Issues-Liste / erster Issue-Titel | Issues-Liste |
| `Alt+Shift+C` | Kommentar-/Review-Editor | Issue-Detailansicht, PR-Detailansicht |
| `Alt+Shift+P` | zentraler PR-Bereich (Navigationsbereich bzw. PR-Liste) | PR-Übersicht, PR-Detailansicht |
| `Alt+Shift+H` | Shortcut-Hilfe öffnen/schließen | auf allen unterstützten Issues-/PR-Seiten |

Ist ein Ziel auf der aktuellen Seite nicht anwendbar oder nicht auffindbar, informiert die Erweiterung per ARIA-Live-Region statt stillschweigend nichts zu tun (`src/content.js`, `announce()`).

**Offener Punkt / bekanntes Risiko:** Diese Belegung stammt aus den in `docs/EXTENSION_SPEC.md` Abschnitt 7 vorgeschlagenen, ausdrücklich als „nicht endgültig“ markierten Kombinationen. Geprüft wurde, dass sie keine bekannten Chrome- oder GitHub-Standardbelegungen überschreiben. Nicht abschließend geprüft: Verhalten bei Tastaturlayouts, auf denen `Alt+Shift+<Taste>` ein Zeichen erzeugt, sowie Interferenz mit der Windows-Tastaturlayout-Umschaltung (`Alt+Shift`). Vor dem Studien-Build sollte dies auf der tatsächlichen Testmaschine verifiziert werden.

## 3. Architektur

Entspricht der in `docs/EXTENSION_SPEC.md` Abschnitt 8 spezifizierten Struktur:

- `manifest.json` – MV3, minimale Berechtigungen (`permissions`/`host_permissions` leer). Content Scripts laden auf `https://github.com/*/*` – das trifft auf Repository-Seiten zu, aber auch auf andere github.com-URLs mit mindestens zwei Pfadsegmenten (z. B. Settings- oder Marketplace-Seiten), nicht nur auf Repositories. Diese breite Ladefläche lässt das Skript schon laufen, bevor GitHub per Soft-Navigation (ohne vollständigen Reload) in Issues oder Pull Requests wechselt; ob ein Shortcut tatsächlich etwas tut, entscheidet ausschließlich die Laufzeit-Prüfung unten.
- `src/selectors.js` – Selector-Layer (Rolle/Name → `data-testid` → semantische Struktur → CSS-Fallback), sichere Fokus-Hilfsfunktion.
- `src/focusHighlight.js` – temporäre, sichtbare Fokus-Hervorhebung mit eigener Outline-Farbe statt `outline: none`; Fokus bleibt dadurch jederzeit sichtbar, auch wenn die native Outline-Darstellung dafür ersetzt wird.
- `src/helpOverlay.js` – zugänglicher modaler Dialog (`role="dialog"`, `aria-modal`), Fokusfalle nur hier (echter Modal-Dialog), Escape schließt, Fokus kehrt zum Auslöser zurück.
- `src/shortcutManager.js` – zentrale Tastenkombination-Registrierung, ignoriert Eingabefelder, hält den Listener idempotent (mehrfacher `start()`-Aufruf ist unschädlich). Ein zentraler Scope-Guard (`setScopeGuard()`) prüft vor jedem Tastendruck, ob die aktuelle Seite überhaupt relevant ist – außerhalb von Issues-/PR-Seiten wird weder ein Shortcut ausgelöst noch `preventDefault()`/`stopPropagation()` aufgerufen.
- `src/adapters/issuesAdapter.js`, `src/adapters/pullRequestsAdapter.js` – Seitenerkennung und Zielsuche getrennt pro Workflow, wie in Abschnitt 8.3 gefordert.
- `src/content.js` – Orchestrierung, Re-Erkennung der Seite bei jedem Tastendruck (GitHub ist eine Turbo/pjax-SPA); setzt den Scope-Guard aus `shortcutManager.js` auf die eigene Seitenerkennung (`currentContext()`).
- `src/styles.css` – isolierte, präfixierte Klassen (`gh-a11y-ext-*`), Light/Dark-Theme-Unterstützung.

Bewusst **nicht** umgesetzt (siehe D-020 und `docs/EXTENSION_SPEC.md` Abschnitt 13): tiefgreifendes Überschreiben von GitHubs internem roving `tabindex`. Die Erweiterung umgeht betroffene Bereiche per direktem Fokussprung, repariert aber nicht die zugrunde liegende Interaktionslogik.

## 4. Feature → Befund → WCAG-Zuordnung

Alle referenzierten Befunde stehen in `docs/KNOWLEDGE_BASE.md` Abschnitt 3 und sind dort als **vorläufige, noch zu reverifizierende S1-Einstufungen** markiert (`docs/TODO.md`: „Alle S1-Befunde auf reale Blockerwirkung prüfen“). Eine formale Barrier-Log-ID existiert noch nicht (Barrier Log laut `docs/TODO.md` noch nicht vollständig angelegt) – die Zuordnung erfolgt daher über die Abschnittsnummer der Knowledge Base.

### 4.1 Shortcut zum Issues-Filter (`Alt+Shift+F`)

- **Befund:** `docs/KNOWLEDGE_BASE.md` 3.2 „Filter-Toolbar“ – nur „Author“ zuverlässig per Tab erreichbar, weitere Controls teilweise aus der Tab-Reihenfolge entfernt. Dort als offen markiert: ob die Toolbar absichtlich als Composite Widget mit Pfeiltastennavigation implementiert ist – falls ja, wäre das beobachtete Tab-Verhalten kein Fehler, sondern erwartbares Widget-Verhalten.
- **Zielgruppe:** Keyboard-only-Nutzer:innen.
- **Workflow:** Issues – Filter-/Suchbereich.
- **Verhalten ohne Erweiterung:** Tab-Reihenfolge zur Filter-Toolbar ist inkonsistent bzw. überspringt Controls.
- **Verhalten mit Erweiterung:** ein Tastendruck fokussiert direkt das Such-/Filterfeld, unabhängig von diesem Tab-Verhalten – ein Workaround für das beobachtete Interaktionsproblem, keine Aussage über dessen WCAG-Konformität.
- **Technische Umsetzung:** `issuesAdapter.findFilter()` (Rolle `textbox`/`combobox` mit Name „search“/„filter“, Fallback auf bekannte IDs/Attribute).
- **Mögliche WCAG-Relevanz (unbestätigt):** falls das Tab-Verhalten kein absichtliches Composite-Widget-Pattern ist, kämen 2.1.1 (Keyboard) und 2.4.3 (Focus Order) infrage – weder bestätigt noch widerlegt; erfordert manuelle Keyboard-only-/NVDA-Nachprüfung des Interaktionsmusters selbst.
- **Bekannte Grenzen:** löst nicht das zugrunde liegende Tab-Reihenfolge-Problem, unabhängig davon, ob dieses tatsächlich einen WCAG-Verstoß darstellt; funktioniert nur, wenn GitHubs DOM-Struktur den implementierten Selektor-Fallbacks entspricht.
- **Bezug zur Studie:** Kandidat für Zeit-/Erfolgsmessung „Filter erreichen“.

### 4.2 Shortcut zur Issues-Liste (`Alt+Shift+I`)

- **Befund:** `docs/KNOWLEDGE_BASE.md` 3.1 „Issues-Liste“ – nur ein Eintrag im Tab-Flow, roving `tabindex` inkonsistent, Einträge werden übersprungen.
- **Zielgruppe:** Keyboard-only-Nutzer:innen.
- **Workflow:** Issues – Listenansicht.
- **Verhalten ohne Erweiterung:** unzuverlässige, zustandsabhängige Navigation zu Listeneinträgen.
- **Verhalten mit Erweiterung:** ein Tastendruck fokussiert direkt den ersten Issue-Titel-Link.
- **Technische Umsetzung:** `issuesAdapter.findFirstIssueLink()`.
- **WCAG-Bezug (vorläufig):** 2.1.1, 2.4.3.
- **Bekannte Grenzen:** springt nur zum ersten Eintrag, repariert nicht die interne Navigation zwischen weiteren Einträgen.
- **Bezug zur Studie:** Kandidat für Zeit-/Erfolgsmessung „ersten Issue öffnen“.

### 4.3 Shortcut zum Kommentar-/Review-Editor (`Alt+Shift+C`)

- **Befund:** `docs/KNOWLEDGE_BASE.md` 3.4 „Markdown-Toolbar“ (Formatierungsbuttons nicht per Tab erreichbar) und 3.3 „Zustandsabhängiger Fokus“ (Tab-Verhalten ändert sich nach Interaktion).
- **Zielgruppe:** Keyboard-only-Nutzer:innen.
- **Workflow:** Issues – Kommentarbereich; Pull Requests – Conversation-Kommentarbereich.
- **Verhalten ohne Erweiterung:** Erreichbarkeit des Editors bzw. der Formatierungsfunktionen hängt vom vorherigen Fokuszustand ab.
- **Verhalten mit Erweiterung:** ein zustandsunabhängiger Tastendruck fokussiert immer direkt das Kommentar-Textfeld.
- **Technische Umsetzung:** `selectors.commonTargets.findCommentTextarea()`, von beiden Adaptern wiederverwendet.
- **WCAG-Bezug (vorläufig):** 2.1.1, 2.4.3.
- **Bekannte Grenzen:** löst **nicht** das dokumentierte Problem, dass die sichtbaren Markdown-Toolbar-Buttons selbst `tabindex="-1"` haben – das Textfeld wird erreichbar, die Formatierungsbuttons bleiben unangetastet (bewusst kein Ersatz-Toolbar-Fix im MVP, siehe P3 „Markdown-Hilfen oder zugängliche Ersatztoolbar“).
- **Bezug zur Studie:** Kandidat für Zeit-/Erfolgsmessung „Kommentar verfassen“.

### 4.4 Shortcut zum zentralen PR-Bereich (`Alt+Shift+P`)

- **Befund:** `docs/KNOWLEDGE_BASE.md` 3.5 „Toolbars und Action-Bars in Pull Requests“ – ähnliche Tab-Reihenfolge-Probleme wie bei Issues, Fokus kann hängen bleiben. Der Eintrag selbst markiert seine bisherige Severity-Bandbreite (S1–S3) als ungenau und noch zu präzisieren; ein konkretes WCAG-Kriterium ist dort nicht angegeben.
- **Zielgruppe:** Keyboard-only-Nutzer:innen.
- **Workflow:** Pull Requests – Übersicht und Detailansicht.
- **Verhalten ohne Erweiterung:** Erreichen des zentralen Bereichs (Navigationsbereich bzw. PR-Liste) erfordert ggf. mehrere Umwege.
- **Verhalten mit Erweiterung:** ein Tastendruck fokussiert auf der Detailseite den aktiven Eintrag im PR-Kopfbereich (Conversation/Commits/Checks/Files changed), auf der Übersichtsseite den ersten PR-Link. Ob GitHub dort aktuell ein `role="tab"`/`tablist`-Pattern mit Pfeiltastennavigation verwendet, ist nicht mehr gesichert – ein automatisierter DOM-Check fand dort keine entsprechenden ARIA-Rollen mehr (Details in `docs/KNOWLEDGE_BASE.md` Abschnitt 17). Die Erweiterung fokussiert deshalb robust über `aria-current` bzw. den sichtbaren Linktext statt sich auf eine bestimmte ARIA-Rolle zu verlassen. Eine manuelle Keyboard-only-/NVDA-Nachprüfung dieses Bereichs steht noch aus.
- **Technische Umsetzung:** `pullRequestsAdapter.findMainArea()`.
- **WCAG-Bezug:** in `docs/KNOWLEDGE_BASE.md` 3.5 nicht mit einem konkreten Kriterium hinterlegt (dort nur als offenes Severity-Problem markiert). Eine belastbare WCAG-Zuordnung steht noch aus; sie wird hier nicht durch Analogieschluss zum Issues-Befund ersetzt.
- **Bekannte Grenzen:** ändert nichts an GitHubs eigenen Navigationslinks selbst; adressiert nur den Einstieg, nicht jede einzelne Action-Bar im PR-Kontext.
- **Bezug zur Studie:** Kandidat für Zeit-/Erfolgsmessung „PR-Bereich erreichen“.

### 4.5 Shortcut-Hilfe-Overlay (`Alt+Shift+H`)

- **Befund:** kein direkter Barrier-Befund; MVP-Anforderung aus `docs/EXTENSION_SPEC.md` Abschnitt 6 „Shortcut-Hilfe“, notwendig damit die neuen Shortcuts selbst auffindbar und zugänglich sind.
- **Zielgruppe:** Keyboard-only- und Screenreader-Nutzer:innen.
- **Workflow:** alle unterstützten Seiten.
- **Verhalten ohne Erweiterung:** nicht zutreffend (Erweiterungsfunktion).
- **Verhalten mit Erweiterung:** modaler, per Tastatur vollständig bedienbarer Dialog mit allen Shortcuts; Escape schließt, Fokus kehrt zuverlässig zum Auslöser zurück (mit Fallback auf `<body>`, falls das Element nicht mehr existiert).
- **Technische Umsetzung:** `src/helpOverlay.js`.
- **WCAG-Bezug (vorläufig):** 2.1.1, 2.4.3, 4.1.2 (Name, Role, Value – Dialog-Rolle, -Name, -Zustand).
- **Bekannte Grenzen:** Inhalte sind statisch aus der Shortcut-Registry generiert; nicht lokalisiert (nur Englisch, passend zur getesteten englischen GitHub-Oberfläche).
- **Bezug zur Studie:** ermöglicht Teilnehmenden, Shortcuts während der Aufgaben nachzuschlagen.

## 5. Testing

### Status

- **Automatisiert (Syntax/Struktur):** `manifest.json` als valides JSON geprüft, alle `src/**/*.js` mit `node --check` auf Syntaxfehler geprüft. Kein Build-Schritt nötig (reines WebExtension-JS, keine Bundler-Abhängigkeit).
- **Playwright:** `extension/tests/shortcuts.spec.js`, 6 Smoke-Tests, laufen mit der unverpackt geladenen Erweiterung gegen das echte, öffentliche Repository `microsoft/vscode` (unauthentifizierte Sitzung). Alle 6 Tests bestehen reproduzierbar (zuletzt erneut lokal bestätigt). Getestet werden die real beobachtbaren Effekte (Fokuswechsel über `document.activeElement`, sichtbarer Hilfe-Dialog), nicht interne Implementierungsdetails – das sind Regressions-/Verhaltensprüfungen, kein Nachweis umfassender Barrierefreiheit. Zusätzlich wurden Soft-Navigation-Szenarien (Repo-Seite → Issues/PRs über GitHubs eigene In-App-Navigation, ohne Reload) manuell mit Playwright gegengeprüft; das ist bislang nicht Teil der eingecheckten, wiederholbaren Testsuite. Grenzen: läuft nur gegen ein einzelnes, aktuell verfügbares öffentliches Repository; der Kommentar-Editor-Test prüft mangels Login nur den dokumentierten Graceful-Failure-Pfad, nicht das eigentliche, authentifizierte Fokusziel (siehe `docs/TODO.md`). Weitere Details in `docs/TESTING_GUIDELINES.md` Abschnitt 7.
- **Keyboard-only manuell:** **noch nicht durchgeführt.** Muss vor jeder Aussage zur tatsächlichen Wirkung nachgeholt werden (`docs/TESTING_GUIDELINES.md` Abschnitt 1: Automatisierung ersetzt keine manuelle Keyboard- oder Screenreader-Evaluation).
- **NVDA manuell:** **noch nicht durchgeführt.**
- **Axe:** **noch nicht konfiguriert** (siehe `docs/TESTING_GUIDELINES.md` Abschnitt 8).

Bis zur manuellen Verifikation gilt jede Aussage zur Wirksamkeit der Erweiterung als **Implementierungsstand, nicht als bestätigtes Evaluationsergebnis.**

## 6. Bekannte Grenzen (gesamt)

- Nur GitHub, nur Issues und Pull Requests (D-017, D-018).
- Kein Eingriff in GitHubs internes roving-`tabindex` (D-020).
- Selektoren sind Best-Effort-Fallback-Ketten; bei GitHub-UI-Änderungen können Ziele nicht mehr gefunden werden (die Erweiterung meldet das dann per Live-Region, bricht aber nicht mit einem Fehler ab).
- Shortcut-Belegung ist vorläufig und noch nicht auf allen Tastaturlayouts/Betriebssystem-Kombinationen geprüft.
- Keine Optionsseite, keine konfigurierbaren Shortcuts (P3/Nice-to-have, nicht Teil des MVP).
- Content Scripts laden breiter (`https://github.com/*/*`) als die tatsächlich unterstützten Workflows; die Laufzeit-Scope-Prüfung hält das Verhalten trotzdem auf Issues-/PR-Seiten beschränkt (siehe Architektur).
- Vollständige Keyboard-only- und NVDA-Prüfung des fertigen Prototyps steht noch aus.
- Das authentifizierte Kommentar-/Review-Editor-Ziel ist bisher nicht mit einem echten, eingeloggten Account verifiziert.
- Automatisierte Tests laufen gegen das echte, öffentliche `github.com` und hängen damit vom aktuellen UI- und Netzwerkzustand dieser Seite ab.
