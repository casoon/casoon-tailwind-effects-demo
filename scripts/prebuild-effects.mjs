import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

async function main(){
  const src = join(projectRoot, 'node_modules', '@casoon', 'tailwindcss-effects', 'index.css');
  const dest = join(projectRoot, 'public', 'vendor', 'casoon-effects', 'index.css');
  await mkdir(dirname(dest), { recursive: true });

  const raw = await readFile(src, 'utf8');
  const importRe = /@import\s+"(@casoon\/[^"]+)"\s*;\s*/g;
  const parts = [];
  let m;
  while ((m = importRe.exec(raw))) {
    const pkg = m[1];
    const p = join(projectRoot, 'node_modules', pkg);
    try {
      const css = await readFile(p, 'utf8');
      parts.push(`/* ${pkg} */\n` + css + '\n');
    } catch (err) {
      console.warn('[prebuild-effects] Warn: could not read', p, err?.message);
    }
  }
  const out = `/* Built bundle of @casoon/tailwindcss-effects */\n` + parts.join('\n');
  await writeFile(dest, out, 'utf8');
  console.log('[prebuild-effects] Bundled', parts.length, 'sub-packages →', dest);
}

main().catch((err)=>{ console.error('[prebuild-effects] Failed:', err); process.exit(1); });
