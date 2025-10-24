import { spawn } from 'node:child_process';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const PAGES = ['/docs', '/docs/glass', '/docs/orbs', '/docs/gradients', '/docs/templates'];
const PORT = process.env.PREVIEW_PORT || '5555';
const BASE = `http://localhost:${PORT}`;

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) return true;
    } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

async function run() {
  // Build first
  await new Promise((resolve, reject) => {
    const p = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
    p.on('exit', (code) => code === 0 ? resolve(0) : reject(new Error('build failed')));
  });

  // Preview on known port
  const preview = spawn('npm', ['run', 'preview', '--', '--port', PORT], { stdio: 'inherit' });
  const ok = await waitForServer(`${BASE}/docs`, 40000);
  if (!ok) {
    preview.kill();
    throw new Error('preview did not start in time');
  }

  const { default: lighthouse } = await import('lighthouse');
  const { launch } = await import('chrome-launcher');

  await mkdir('.logs', { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-');

  const scores = {};
  for (const path of PAGES) {
    const url = `${BASE}${path}`;
    const chrome = await launch({ chromeFlags: ['--headless', `--remote-debugging-port=9222`] });
    const runnerResult = await lighthouse(url, {
      port: 9222,
      onlyCategories: ['performance'],
      output: ['json'],
      logLevel: 'error',
    });
    await chrome.kill();
    const outJson = runnerResult.report;
    const perfScore = runnerResult.lhr.categories.performance.score;
    scores[path] = perfScore;
    const file = join('.logs', `lighthouse-${ts}${path.replace(/\//g, '_')}.json`);
    await writeFile(file, outJson, 'utf8');
    console.log(`[lighthouse] ${path} performance: ${Math.round(perfScore * 100)}%`);
  }

  preview.kill();

  // Basic threshold
  const min = Number(process.env.LH_MIN || 0.6);
  const fails = Object.entries(scores).filter(([_, s]) => s < min);
  if (fails.length) {
    console.error('\nLighthouse performance below threshold for:');
    fails.forEach(([p, s]) => console.error(` - ${p}: ${Math.round(s*100)}%`));
    process.exit(1);
  }
}

run().catch((e) => { console.error(e); process.exit(1); });

