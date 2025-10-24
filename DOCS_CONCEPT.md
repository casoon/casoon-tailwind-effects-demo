 # @casoon/tailwindcss-effects – Dokumentationskonzept

 ## Zielbild
 - Einsteiger sind in 5 Minuten produktiv (Install, 2 Snippets, Preview).
 - Fortgeschrittene finden präzise Referenzen, Best Practices und A11y/Performance‑Hinweise.
 - Abdeckung aller aktuellen Effekte sowie zukunftssichere Erweiterbarkeit (neue Klassen, Varianten, Tokens, Patterns).
 - Jede Seite zeigt: Live‑Vorschau, kopierbaren Code, kurze Do/Don’ts, Playground‑Link.

 ## Zielgruppen
 - Einsteiger: schnelle Snippets und minimale Konfiguration.
 - Produktteams: konsistente Patterns, Theming/Tokens, Accessibility, Performance.
 - Contributors: klare Templates, Contribution‑Checklisten, automatische Validierung.

 ## Leitprinzipien
 - Beispiel‑First: Preview + Copy‑Code mit minimalem Markup.
 - Konsistent: einheitliche Seitenstruktur, identische Bedienmuster.
 - Systematisch: Effekte katalogisieren, Tokens als „Sprache“, Rezepte für typische UI‑Aufgaben.
 - Verifizierbar: Docs‑Beispiele referenzieren reale Klassen aus dem Build (Gate).
 - Skalierbar: Neue Effekte/Varianten fügen sich ohne Reorganisation ein.

 ## Informationsarchitektur (Astro Routen)
 - `/docs`: Übersicht, Prinzipien, Navigation.
 - `/docs/getting-started`: Setup Tailwind v4, Install, Minimalbeispiele.
 - `/docs/guides/*`: Rezepte (z. B. orbs-glass-hero, theming-tokens, performance).
 - `/docs/glass`, `/docs/orbs`, `/docs/gradients`: Effekt‑Kataloge mit Unterabschnitten.
 - `/docs/conventions`: Benennungen, Komposition, Responsive/States, A11y.
 - Optional: `/docs/changelog`, `/docs/migration` (für Breaking Changes/Upgrades).

 ## Seitentemplates (lebende Komponenten)
 - Bereits vorhanden: `src/components/ComponentShowcase.astro` (Preview/Code, Light/Dark, Copy, Code‑Toggle).
 - Docs‑Bausteine: `DocSection`, `CodeBlock`, `ToC`, `Tips`, `TokenControls`.
 - Effektseite umfasst:
   - Überschrift + Einzeiler Nutzen.
   - Vorschau (Light/Dark, min/max‑Höhe, optional Controls via `TokenControls`).
   - Minimaler Code‑Block (kopierbar), Klassen/Modifier als kurze Liste.
   - Relevante Tokens (Custom Properties) und Defaults.
   - A11y/Performance Do/Don’ts.
   - Playground‑Link.

 ## Tokens & Theming
 - Dokumentation der wichtigsten CSS Custom Properties (z. B. `--glass-radius`, `--glass-blur`).
 - Empfehlungen für Wertebereiche und Scopes (`:root`, Light/Dark, lokale Overrides).
 - `TokenControls` stellt interaktive Regler für Demos bereit; wirkt lokal auf `.cs-root`.

 ## Qualitätssicherung
 - Build‑Gate: `npm run build` muss erfolgreich sein.
 - Docs‑Verify: `npm run docs:verify` stellt sicher, dass alle in den Docs referenzierten Klassen in der gebauten CSS vorhanden sind.
 - Visuelles Smoke‑Testing: Playwright Screenshots der Hauptseiten (Mobile/Tablet/Desktop) optional.
 - A11y‑Checks: Kontrast (AA), sichtbare Fokuszustände, `prefers-reduced-motion` bei Animationen.

 ## Versionierung & Kompatibilität
 - Version‑Badge: „Verifiziert mit“ (Paketversion aus `package.json`).
 - Changelog/Migration: dokumentiert Breaking Changes (Klassenumbenennungen, Token‑Änderungen).
 - Optional Versioniertes Routing (Aliases) für ältere Major‑Versionen.

 ## Playground‑Deep‑Links (Design‑Vorschlag)
 - Query‑Parameter: `?effect=glass-card&variant=light&pane=dark&code=1`.
 - Parameter:
   - `effect`: Effekt/Komponente (z. B. `glass-card`).
   - `variant`: Variante (z. B. `light`, `enhanced`).
   - `pane`: initialer Theme‑Pane (`light`|`dark`).
   - `code`: Code‑Bereich geöffnet (`1`/`0`).
 - In Docs: „Im Playground öffnen“ als Link mit vorbefüllten Parametern (Implementierung optional, dieses Dokument dient als Spezifikation).

 ## Beitrags‑Workflow
 - Authoring über Astro‑Snippets: `ComponentShowcase` + `DocSection` + optional `TokenControls`.
 - Review‑Checkliste (Kurzform):
   - Beispiel minimal und praxistauglich? Code kopierbar?
   - Klassen konsistent und existieren im Build (`docs:verify` grün)?
   - A11y/Performance‑Hinweise ergänzt? Light/Dark geprüft?
   - Playground‑Link sinnvoll?
 - PR‑Gates: Build + docs:verify grün; Beschreibung + Screenshots.

 ## Akzeptanzkriterien
 - Onboarding in 5 Min: Getting Started liefert funktionierende Preview + 1 Glass‑ und 1 Orbs‑Snippet.
 - Jeder Effekt: Preview, kopierbarer Code, Klassenliste, Tokens, A11y/Perf‑Hinweise, Playground‑Link.
 - Konsistenz: Einheitliche Nutzung der vorhandenen Docs‑Bausteine.
 - Stabilität: `npm run build && npm run docs:verify` ohne Fehler.
 - Skalierbarkeit: Neue Effekte/Varianten via Hinzufügen einer Seite/Section integrierbar (keine Reorganisation nötig).

 ## Roadmap
 - Phase 1: Bestehende Seiten nach Template vereinheitlichen, Getting Started schärfen, Playground‑Links ergänzen, `docs:verify` als Pflicht.
 - Phase 2: Effekt‑Katalog vervollständigen (Glass, Orbs, Gradients, Utilities), Tokens‑Referenz ausbauen.
 - Phase 3: Deep‑Links zum Playground, Playwright Screenshot‑Checks der Hauptseiten.
 - Phase 4: Metadaten‑Quelle (z. B. `src/docs/effects.json`) + Generator‑Script für Index/Navi; Changelog/Migration‑Sektion.

 ---

 Dieses Dokument definiert Anforderungen und Struktur, sodass das Team die Doku konsistent weiterführen und für zukünftige Bibliotheksversionen erweitern kann.

