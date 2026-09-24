// Shared browser launch for scripts/*.mjs. ENGINE=webkit runs a check as Safari;
// CDP calls (throttling, touch, traces) are Chromium-only and throw under it.
// WebKit lives in tmp/webkit/browsers and is fetched on first use, or again when a
// playwright-core update needs a newer build.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', '..');
// Read when playwright-core loads, so it is set before the import.
process.env.PLAYWRIGHT_BROWSERS_PATH ||= join(ROOT, 'tmp', 'webkit', 'browsers');
const { chromium, webkit } = await import('playwright-core');

export const ENGINE = process.env.ENGINE || 'chromium';

const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
].find((p) => p && existsSync(p));

export async function launch(opts = {}) {
    if (ENGINE === 'webkit') {
        try { return await webkit.launch(opts); } catch (e) {
            if (!/Executable doesn't exist/.test(e.message)) throw e;
            console.error('WebKit missing or outdated — downloading the build this playwright-core needs…');
            execFileSync(process.execPath, [join(ROOT, 'node_modules', 'playwright-core', 'cli.js'), 'install', 'webkit'], { stdio: 'inherit' });
            return webkit.launch(opts);
        }
    }
    if (!CHROME) { console.error('Chrome not found — set CHROME_PATH'); process.exit(1); }
    return chromium.launch({ executablePath: CHROME, ...opts });
}

export const cdp = (page) => page.context().newCDPSession(page);
