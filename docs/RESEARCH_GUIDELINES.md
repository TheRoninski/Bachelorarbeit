# Research Guidelines

## 1. Normativer Rahmen

- Verwende **WCAG 2.2** als primären normativen Bewertungsrahmen.
- Berücksichtige nur die für die Arbeit ausgewählten Erfolgskriterien der Konformitätsstufen **A und AA**.
- Verwende WAI-ARIA 1.2 und die ARIA Authoring Practices Guide als technische Hilfen für Rollen, Zustände und Interaktionsmuster.
- Behandle die ARIA Authoring Practices nicht als WCAG-Erfolgskriterien. Sie helfen bei der technischen Interpretation, sind aber nicht selbst der Konformitätsstandard.
- WCAG-EM dient als methodische Orientierung. Die Arbeit verwendet bewusst eine szenariobasierte, workfloworientierte Anpassung.
- Accessibility Conformance Reports, VPATs und ACRs sind Kontextquellen. Sie ersetzen keine eigene Prüfung und beweisen nicht, dass die konkret getestete Oberfläche konform ist.

## 2. Aussagen, die belegt werden müssen

Eine externe Quelle ist erforderlich für:

- Definitionen und Anforderungen der WCAG 2.2
- Aussagen über normatives oder erwartetes ARIA-Verhalten
- Aussagen über gesetzliche oder regulatorische Anforderungen
- Aussagen zu EU-Richtlinie 2016/2102, Richtlinie 2019/882 und EN 301 549
- Aussagen über frühere Forschung, Forschungslücken oder bekannte Probleme blinder beziehungsweise motorisch eingeschränkter Entwickler:innen
- Aussagen über offizielle Accessibility-Positionen oder Konformitätsberichte von GitHub, GitLab oder Microsoft
- allgemeine Behauptungen über Screenreader, assistive Technologien oder Nutzergruppen
- methodische Behauptungen, die nicht aus dem eigenen Studiendesign stammen
- Aussagen über die Validität oder Interpretation standardisierter Fragebögen wie SUS

Keine externe Quelle ist zwingend erforderlich für:

- klar als eigene Beobachtung gekennzeichnete Testergebnisse
- dokumentierte Fokusabläufe im eigenen Test
- eigene Messwerte, Screenshots, Barrier-Log-Einträge und Studiendaten
- eigene Designentscheidungen des Prototyps

Eigene Beobachtungen müssen dennoch durch Testprotokoll, Reproduktionsschritte, Screenshots, DOM-Hinweise oder Messdaten nachvollziehbar gemacht werden.

## 3. Quellenhierarchie

Bevorzugte Reihenfolge:

1. Normative Primärquellen: W3C, EU-Recht, ETSI
2. Peer-reviewte Primärforschung: IEEE, ACM und vergleichbare Originalpublikationen
3. Offizielle Plattformdokumentation und ACR/VPAT
4. Methodische Originalquellen
5. Sekundärquellen nur, wenn Primärquellen nicht ausreichen

Nicht als alleinige Belege verwenden:

- Blogposts ohne klare Autorität
- Marketingtexte
- AI-generierte Zusammenfassungen
- Suchergebnis-Snippets
- Forenbeiträge, außer sie sind explizit Untersuchungsgegenstand

## 4. Zitierregeln

- Der Proposal-Stand verwendet numerische Referenzen im Stil `[1]`, `[2]`, ... und ein IEEE-nahes Quellenverzeichnis.
- Jede im Text verwendete Quelle muss im Quellenverzeichnis enthalten sein.
- Jede Quelle im Quellenverzeichnis muss tatsächlich im Text verwendet werden.
- Zitiere die Quelle unmittelbar bei der belegpflichtigen Aussage.
- Für Webseiten müssen Titel, herausgebende Organisation, URL und Zugriffsdatum korrekt erfasst werden.
- Für Papers müssen Autor:innen, Titel, Publikationsort, Jahr und DOI übernommen werden.
- DOIs und URLs dürfen niemals geraten werden.
- Bei direkten Zitaten muss die genaue Fundstelle angegeben werden; Paraphrasen sind zu bevorzugen.
- Screenshots aus der eigenen Evaluation werden als eigene Abbildung behandelt; Plattform, Ansicht, Datum und relevanter Zustand sollen dokumentiert werden.

## 5. Regeln gegen Halluzinationen

Niemals erfinden:

- Testergebnisse
- Fokuspfade
- NVDA-Ausgaben
- WCAG-Zuordnungen
- Plattformversionen
- Browser-, OS- oder NVDA-Versionen
- Anzahl oder Eigenschaften von Teilnehmenden
- Messwerte, SUS-Scores, Erfolgsquoten oder Bearbeitungszeiten
- Code, der angeblich getestet wurde
- Quellen, Autor:innen, Titel, URLs oder DOIs
- Aussagen darüber, dass eine Barriere „bewiesen“ oder „repräsentativ“ sei

Wenn Information fehlt:

- als **offen**, **nicht erhoben**, **nicht verifiziert** oder **Hypothese** markieren
- Rückfrage stellen, bevor eine endgültige Aussage oder Implementierung daraus entsteht
- bei UI-Änderungen die aktuelle Plattform erneut prüfen

## 6. Wissenschaftliches Schreiben

- Schreibe klar, präzise und in einem konsistenten studentisch-wissenschaftlichen Stil.
- Vermeide übertriebene Sicherheit und absolute Formulierungen.
- Trenne Beobachtung, Interpretation und Schlussfolgerung sichtbar voneinander.
- Verwende Formulierungen wie „im getesteten Zustand“, „in den überprüften Bereichen“, „deutet darauf hin“ und „konnte nicht eindeutig abgeleitet werden“.
- Verwende „Barriere“ nur, wenn eine reale Einschränkung oder ein begründeter normativer Verstoß dokumentiert ist.
- Verwende „Beobachtung“ für Reibungen, Informationsdichte oder mögliche Risiken ohne klaren Verstoß.
- Bezeichne korrekte ARIA-Patterns ausdrücklich als positive Beispiele.
- Vermeide umgangssprachliche Formulierungen in der Endfassung.
- Verwende konsistente Schreibweisen: GitHub, GitLab, Azure DevOps, NVDA, Keyboard-only, Pull Request, Merge Request, Work Item.
- Gendergerechte Sprache muss konsistent sein.
- Automatische AI- oder Plagiatsdetektoren sind kein wissenschaftlicher Nachweis. Entscheidend sind Eigenständigkeit, korrekte Quellen und nachvollziehbare eigene Arbeit.

## 7. Regeln zur WCAG-Auswertung

### Grundsatz

Eine WCAG-Zuordnung erfolgt nicht nur aufgrund eines DOM-Musters. Sie muss aus der Auswirkung auf den getesteten Workflow und dem Wortlaut des Erfolgskriteriums begründet werden.

### Vorgehen

1. Beobachtung exakt beschreiben.
2. Betroffene Nutzergruppe festhalten.
3. Reproduktionsschritte dokumentieren.
4. Prüfen, ob das Verhalten im getesteten Zustand zuverlässig auftritt.
5. Relevanten WCAG-Wortlaut lesen.
6. Prüfen, ob das Erfolgskriterium tatsächlich anwendbar ist.
7. Zuordnung begründen und Unsicherheit markieren.
8. Gegen korrekte ARIA-Patterns und alternative Bedienwege prüfen.

### Besondere Vorsicht

- Ein Element mit `tabindex="-1"` ist nicht automatisch ein Verstoß.
- Roving `tabindex` ist in Tabs, Menüs, Listboxen und anderen Composite Widgets häufig korrekt.
- Nur ein Tab-Stopp innerhalb eines Composite Widgets kann korrekt sein, wenn Pfeiltasten funktionieren und Fokus, Rollen und Zustände verständlich sind.
- Unterschiedliche Tastenmodelle sind nicht automatisch inkonsistente Navigation im Sinn von WCAG 3.2.3.
- WCAG 3.2.3 darf nicht allein deshalb verwendet werden, weil Nutzer:innen zwischen Tab und Pfeiltasten wechseln.
- Ein langer zugänglicher Name ist nicht automatisch ein WCAG-Verstoß. Informationsdichte kann als Beobachtung dokumentiert werden.
- Englisch ausgesprochene englische UI-Begriffe bei englischer Plattformoberfläche sind nicht automatisch ein Produktfehler.
- Ein Screenshot allein beweist kein dynamisches Fokusproblem. Er zeigt nur den betroffenen Bereich.

### Im Chat verwendete Kriterien

- **2.1.1 Keyboard**
- **2.4.3 Focus Order**
- **1.3.1 Info and Relationships**
- **4.1.2 Name, Role, Value**

Weitere Kriterien dürfen nur nach Prüfung des tatsächlichen Befunds ergänzt werden.

## 8. Severity-Regeln

### S1 – kritisch

Der Workflow-Schritt ist mit der untersuchten Methode nicht zuverlässig oder praktisch nicht durchführbar. Betroffene Nutzer:innen bleiben hängen, verlieren den Kontext oder müssen die Aufgabe abbrechen. S1 darf nur vergeben werden, wenn kein realistischer, zugänglicher Weg vorhanden ist oder das Verhalten so instabil ist, dass die Aufgabe nicht zuverlässig abgeschlossen werden kann.

### S2 – hoch

Der Workflow-Schritt bleibt grundsätzlich möglich, ist aber stark eingeschränkt. Es bestehen erhebliche Umwege, wiederholte Fehlbedienungen, große Orientierungsprobleme oder eine deutlich reduzierte Effizienz. Ein Workaround kann vorhanden sein, ist aber schwer auffindbar, unverhältnismäßig oder für viele Betroffene problematisch.

### S3 – mittel

Der Workflow-Schritt ist machbar, aber umständlich, irritierend oder inkonsistent. Ein praktikabler Workaround ist vorhanden. Die Barriere führt zu Zusatzschritten oder wiederkehrenden Reibungen, blockiert die Aufgabe jedoch nicht.

### S4 – Beobachtung oder positives Beispiel

Es liegt kein klarer Fehler vor. Das Verhalten entspricht einem erwartbaren Interaktionsmuster, ist kontextabhängig oder stellt eine positive Umsetzung dar. S4 darf nicht als „leichter Fehler“ interpretiert werden.

### Severity-Zuordnung

- Severity bezieht sich auf die Auswirkung im Workflow, nicht auf die technische Auffälligkeit im DOM.
- Ein Befund erhält keine Bandbreite wie „S1–S3“, wenn nicht klar beschrieben ist, welche konkrete Instanz welcher Severity entspricht.
- Bei Unsicherheit vorläufige Severity markieren und erneut testen.
- Severity und WCAG-Konformität sind getrennte Dimensionen. Ein WCAG-Verstoß kann je nach Workflow unterschiedliche praktische Schwere haben.

## 9. Interpretation der Ergebnisse

- Ergebnisse gelten nur für die getesteten Plattformzustände, Accounts, Workflows, Browser- und Assistive-Tech-Konfigurationen.
- Kleine Stichproben liefern explorative Hinweise, keine repräsentativen Aussagen.
- Zwei oder drei Zielgruppenpersonen dürfen nicht zu Verallgemeinerungen über alle Screenreader-Nutzer:innen führen.
- Proxy-Teilnehmende dürfen Aussagen zu Keyboard-only-Usability und Prototypbedienung liefern, aber nicht die Perspektive behinderter Nutzer:innen ersetzen.
- Keine Plattform darf allein aufgrund der Anzahl gefundener Befunde als „barrierefreier“ bezeichnet werden, wenn Umfang, Tiefe oder Zustände der Tests nicht vergleichbar sind.
- Positive Beispiele müssen ebenso dokumentiert werden wie Barrieren.
- Fehlende Befunde bedeuten nur, dass in den getesteten Bereichen keine eindeutige Barriere gefunden wurde.
- Automatisierte Tools ergänzen manuelle Tests, ersetzen sie aber nicht.
- DOM-Hypothesen müssen durch Accessibility Tree, Keyboard-Verhalten oder Screenreader-Ausgabe bestätigt werden.
- Plattform-ACRs sind zur Einordnung geeignet, nicht zur Widerlegung eigener reproduzierbarer Befunde.

## 10. Nutzerstudie

- Die geplante Studie ist klein und primär deskriptiv.
- Eine Bezeichnung als Pilotstudie oder explorative Studie ist angemessen, falls die Stichprobe klein bleibt.
- Teilnehmende werden anonymisiert oder pseudonymisiert, etwa P01, P02 usw.
- Zielgruppen-, Expert:innen- und Proxy-Teilnehmende müssen getrennt ausgewiesen werden.
- Studienkolleg:innen ohne Assistive-Tech-Erfahrung dürfen nicht als Screenreader-Nutzer:innen, Accessibility-Expert:innen oder Menschen mit Beeinträchtigung dargestellt werden.
- Nur tatsächlich erhobene Daten berichten.
- Consent, Datenschutz, optionale Aufzeichnungen und Umgang mit sensiblen Angaben müssen dokumentiert werden.

<!-- FH_SCIENTIFIC_EXPECTATIONS START -->
## 11. Wissenschaftliche Erwartungen der FH

- Die Problemstellung muss klar, präzise und wissenschaftlich eingeordnet sein.
- Zielsetzung und gegebenenfalls Messgrößen müssen eindeutig formuliert werden.
- Die Methodik muss logisch, nachvollziehbar, zur Zielsetzung passend, literaturbasiert begründet und wissenschaftlich vertretbar sein.
- Die Wahl von Methoden und Werkzeugen muss begründet werden; relevante Alternativen sind mit Vor- und Nachteilen zu diskutieren.
- Ergebnisse sind fundiert zu analysieren und auf die Zielsetzung zu beziehen.
- Die Diskussion muss Relevanz, Grenzen, Verbesserungsmöglichkeiten und Übertragbarkeit kritisch behandeln.
- Die Arbeit dokumentiert den Entwicklungsprozess und das Ergebnis eines nicht trivialen technischen Artefakts.
- Der potenzielle Bedarf und die Abgrenzung zu bestehenden Standardansätzen müssen nachvollziehbar argumentiert werden.
- Methodik sowie Ergebnisse und Diskussion sind die zentralen Bewertungsschwerpunkte.
- Detailregeln und Seitenbezüge stehen in `docs/OFFICIAL_FH_GUIDELINES.md`.
<!-- FH_SCIENTIFIC_EXPECTATIONS END -->
