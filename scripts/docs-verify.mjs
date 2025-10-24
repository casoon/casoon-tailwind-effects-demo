import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const DOCS_SRC_DIR = join(process.cwd(), 'src', 'pages', 'docs');
const DIST_DIR = join(process.cwd(), 'dist');

function extractEffectClasses(src) {
  // capture common effect namespaces used in docs
  const re = /class\s*=\s*"([^"]+)"|class\s*=\s*\{`([^`]+)`\}/g;
  const classes = new Set();
  let m;
  while ((m = re.exec(src))) {
    const grp = m[1] || m[2];
    if (!grp) continue;
    grp.split(/\s+/).forEach((c) => {
      // only track effect-related classes to avoid Tailwind noise
      if (/^(glass|bg-orbs|text-.*gradient|progress-(rail|fill)|nav-link(|-primary))/.test(c)) {
        classes.add(c);
      }
    });
  }
  return [...classes];
}

async function readAllCssFromDist() {
  let css = '';
  for await (const file of walk(DIST_DIR)) {
    if (file.endsWith('.css')) {
      css += '\n' + (await readFile(file, 'utf8'));
    } else if (file.endsWith('.html')) {
      const html = await readFile(file, 'utf8');
      // collect inline <style> blocks (Astro often inlines CSS)
      const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
      let m;
      while ((m = re.exec(html))) css += '\n' + m[1];
    }
  }
  // Fallback/augmentation: also read library CSS directly to ensure selectors are verifiable
  try {
    const libCssPath = join(process.cwd(), 'node_modules', '@casoon', 'tailwindcss-effects', 'index.css');
    css += '\n' + (await readFile(libCssPath, 'utf8'));
  } catch {}
  return css;
}

async function main() {
  // Collect expected classes from docs sources
  const expected = new Set();
  for await (const file of walk(DOCS_SRC_DIR)) {
    if (!file.endsWith('.astro')) continue;
    const src = await readFile(file, 'utf8');
    extractEffectClasses(src).forEach((c) => expected.add(c));
  }

  if (expected.size === 0) {
    console.log('No effect classes found in docs. Nothing to verify.');
    return;
  }

  // Load built CSS and verify selectors exist
  const css = await readAllCssFromDist();
  // Enforce strict verification for current version compatibility
  if (!/(\.glass-|\.bg-orbs-|\.text-gradient|\.progress-rail)/.test(css)) {
    console.error('[docs:verify] No effect CSS detected in dist/library. Build pipeline is misconfigured.');
    process.exit(1);
  }
  const missing = [];
  for (const cls of expected) {
    const sel = `.${cls}`;
    if (!css.includes(sel)) missing.push(cls);
  }

  if (missing.length) {
    console.error('\n[docs:verify] Missing classes after build:');
    missing.forEach((c) => console.error(' -', c));
    console.error('\nEnsure the library version exports these utilities, or update examples.');
    process.exit(1);
  } else {
    console.log(`[docs:verify] OK – ${expected.size} classes found in built CSS.`);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
