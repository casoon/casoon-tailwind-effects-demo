 # Doku-Autorenleitfaden (@casoon/tailwindcss-effects)

 Dieser Leitfaden zeigt, wie neue Effekt‑Beispiele und Guides erstellt werden, damit die Doku konsistent, verifizierbar und leicht erweiterbar bleibt.

 ## Voraussetzungen
 - Node >= 18, npm >= 8
 - Installiert: `npm install`
 - Dev: `npm run dev` (http://localhost:4321)

 ## Grundbausteine
 - Layout: `src/layouts/DocsBase.astro`
 - Navigation: `src/components/docs/DocNav.astro`
 - Sektionen/Struktur: `DocSection`, `ToC`, `Tips`
 - Code: `CodeBlock` (oder Code‑Slot in `ComponentShowcase`)
 - Preview + Code gemeinsam: `src/components/ComponentShowcase.astro`
 - Token‑Regler: `TokenControls` (wirkt auf nächstliegende `.cs-root`)

 ## Effekt‑Abschnitt hinzufügen (Beispiel: Glass‑Karten)
 1) Seite oder Abschnitt öffnen/erstellen, z. B. `src/pages/docs/glass.astro`.
 2) Innerhalb einer `DocSection` den Showcase bauen:

 ```astro
 ---
 import ComponentShowcase from '../../components/ComponentShowcase.astro';
 import TokenControls from '../../components/docs/TokenControls.astro';
 ---

 <DocSection id="cards" title="Cards" description=".glass-card / .glass-card-light / .glass-card-light-enhanced">
   <ComponentShowcase title="Cards" description="Vordefinierte Card-Komponenten" minHeight="12rem">
     <TokenControls slot="controls" />
     <div slot="light">
       <article class="glass-card-light p-6 rounded-xl">Light</article>
     </div>
     <div slot="dark">
       <article class="glass-card p-6 rounded-xl">Dark</article>
     </div>
     <template slot="code">
 {`<article class="glass-card">...</article>
 <article class="glass-card-light">...</article>`}
     </template>
   </ComponentShowcase>
 </DocSection>
 ```

 Hinweise:
 - `initialTheme="light"` setzen, falls Light als Start sinnvoller ist.
 - `minHeight` / `maxHeight` für sinnvolle Bühne anpassen.
 - Code minimal halten, Fokus auf Effekt‑Klassen.

 ## Guides hinzufügen (Rezept‑Seiten)
 - Route unter `src/pages/docs/guides/` anlegen, z. B. `orbs-glass-hero.astro`.
 - Struktur: kurze Einleitung → Schritte → Demos (Showcases) → Checkliste (A11y/Performance/Responsive).

 ## Tokens dokumentieren
 - Relevante Custom Properties nennen (z. B. `--glass-radius`, `--glass-blur`).
 - Defaults nennen und sinnvolle Bereiche angeben.
 - `TokenControls` integrieren, wenn es beim Verstehen hilft.

 ## Qualitätssicherung
 - Lokal bauen: `npm run build`.
 - Verifizieren: `npm run docs:verify` → prüft, dass referenzierte Klassen in der Build‑CSS vorhanden sind.
 - Visuell prüfen: `/docs/*` Seiten in Light/Dark und gängigen Viewports.

 ## A11y & Performance – Kurzcheck
 - Kontrast: Texte auf Glass sicher lesbar (AA). 
 - Fokus: Interaktive Elemente sichtbar fokussierbar.
 - Motion: Respekt für `prefers-reduced-motion` bei animierten Effekten.
 - Performance: Vorsicht mit starken Blurs/Box‑Shadows und verschachtelten Filtern.

 ## Playground‑Links (optional)
 - Deep‑Link‑Schema (Design): `?effect=glass-card&variant=light&pane=dark&code=1`.
 - In Doku einen „Im Playground öffnen“ Link ergänzen (optional bis implementiert).

 ## PR‑Checkliste
 - [ ] Beispiel minimal & praxistauglich, Code kopierbar
 - [ ] Light/Dark geprüft, sinnvolle `minHeight`/`maxHeight`
 - [ ] Tokens beschrieben (falls relevant)
 - [ ] A11y/Performance‑Hinweise ergänzt
 - [ ] `npm run build && npm run docs:verify` grün
 - [ ] Screenshots/GIFs für PR hinzugefügt (optional)

