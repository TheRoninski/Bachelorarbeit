# Azure DevOps – Barrier Log

Bezug: `docs/TESTING_GUIDELINES.md` Abschnitt 11 (Barrier Log), Abschnitt 14 (Abschluss eines Testblocks); `docs/RESEARCH_GUIDELINES.md` Abschnitt 7 (WCAG-Auswertung) und Abschnitt 8 (Severity-Regeln).

Dieses Log enthält ausschließlich **bestätigte** Befunde, die aus einem tatsächlich durchgeführten Testlauf (`work-items/keyboard-test.md`, `work-items/nvda-test.md`, `pull-requests/keyboard-test.md`, `pull-requests/nvda-test.md`) übernommen wurden. S4-Beobachtungen und positive Patterns gehören nicht hierher, sondern in `positive-examples.md`.

## Voraussetzung für einen Eintrag

- Beobachtung wurde tatsächlich durchgeführt und ist reproduzierbar oder explizit als nicht reproduzierbar markiert.
- WCAG-Zuordnung folgt dem Vorgehen aus `docs/RESEARCH_GUIDELINES.md` Abschnitt 7 (Wortlaut prüfen, nicht nur DOM-Muster).
- Severity folgt Abschnitt 8 der Research Guidelines und ist einzeln begründet, keine Bandbreite wie „S1–S3“.
- S1 oder S2 wird laut `CLAUDE.md` nur nach Rückfrage vergeben, sofern die Begründung nicht eindeutig ist.

## Eintragsvorlage

Ein Eintrag pro eindeutiger ID. Kopieren, nicht überschreiben.

```
### <ID, z. B. AZ-WI-KB-001>

- Plattform: Azure DevOps
- Workflow: Work Items/Boards | Pull Requests
- Seite/Zustand: nicht erhoben
- Testmethode: Keyboard-only | NVDA
- Datum: nicht erhoben
- Browser/OS/NVDA-Version: nicht erhoben
- Startvoraussetzungen: nicht erhoben
- Reproduktionsschritte: nicht erhoben
- Erwartetes Verhalten: nicht erhoben
- Tatsächliches Verhalten: nicht erhoben
- Betroffene Nutzergruppe: nicht erhoben
- Auswirkung auf Aufgabe: nicht erhoben
- WCAG-Kriterium: nicht erhoben
- Normative Begründung: nicht erhoben
- Severity: nicht erhoben
- DOM-/Accessibility-Tree-Hinweise: nicht erhoben (Bezug ggf. dom-aria-notes.md)
- Screenshot-/Video-Referenz: nicht erhoben (Ablage gemäß evidence/README.md)
- Reproduzierbarkeit: nicht erhoben
- Status: offen | bestätigt | verworfen | behoben | Regression
- Notizen zur Erweiterung: nicht zutreffend (Prototyp ist auf GitHub beschränkt, D-017)
```

## Einträge

Noch keine bestätigten Befunde. Dieser Abschnitt wird erst nach tatsächlicher Testdurchführung befüllt.
