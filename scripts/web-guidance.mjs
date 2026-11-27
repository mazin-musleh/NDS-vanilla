#!/usr/bin/env node
// Runs Google's modern-web-guidance CLI at the version pinned in the nds-web-audit skill,
// with telemetry off (it reports search text and guide ids otherwise). Output → tmp/mwg/.
//
//   node scripts/web-guidance.mjs search "<query>"
//   node scripts/web-guidance.mjs retrieve <id>[,<id>...]   → tmp/mwg/guides/<ids>.md
//   node scripts/web-guidance.mjs scan [paths...]           legacy-scan minus drops.json
//   node scripts/web-guidance.mjs update                    diff latest guides vs the lock
//   node scripts/web-guidance.mjs lock [version]            pin a version + hash its guides
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKILL = path.join(ROOT, '.claude/skills/nds-web-audit');
const LOCK = path.join(SKILL, 'guides.lock.json');
const OUT = path.join(ROOT, 'tmp/mwg');
const ENV = { ...process.env, DISABLE_TELEMETRY: '1' };

// One quoted command string: Windows needs a shell for npx.cmd, and args must not split on spaces.
const run = (bin, args, opts = {}) => spawnSync([bin, ...args.map(a => `"${String(a).replace(/"/g, '\\"')}"`)].join(' '),
    { cwd: ROOT, env: ENV, encoding: 'utf8', shell: true, maxBuffer: 64 * 1024 * 1024, timeout: 300000, ...opts });
const readJson = (f, d) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d);
const lock = readJson(LOCK, null);
const pinned = () => {
    if (!lock) die('No guides.lock.json: run `node scripts/web-guidance.mjs lock` first.');
    return lock.version;
};
function die(msg) { console.error(msg); process.exit(1); }

function cli(args, version = pinned()) {
    const r = run('npx', ['-y', `modern-web-guidance@${version}`, ...args]);
    if (r.status !== 0) die(r.stderr || r.error?.message || `exit ${r.status}`);
    return r.stdout;
}

// The npx cache dir that holds this version's guides, found via the PATH npm exec sets up.
function packageDir(version) {
    const r = run('npm', ['exec', '--yes', `--package=modern-web-guidance@${version}`, '--',
        'node', '-e', 'console.log(process.env.PATH)']);
    const bin = (r.stdout || '').split(path.delimiter)
        .find(p => /_npx/.test(p) && /node_modules[\\/]\.bin$/.test(p.trim()));
    if (!bin) die(`Could not locate modern-web-guidance@${version} in the npx cache.`);
    return path.join(bin.trim(), '..', 'modern-web-guidance', 'skills', 'modern-web-guidance');
}

function hashGuides(dir) {
    const guides = {};
    const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith('.md')) {
            const text = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
            guides[e.name.slice(0, -3)] = createHash('sha1').update(text).digest('hex').slice(0, 12);
        }
    });
    walk(path.join(dir, 'guides'));
    return Object.fromEntries(Object.entries(guides).sort());
}

// Guide id → the MAP.md rows (components) that list it in backticks.
function mapIndex() {
    const idx = {};
    const map = path.join(SKILL, 'MAP.md');
    if (!fs.existsSync(map)) return idx;
    for (const line of fs.readFileSync(map, 'utf8').split('\n')) {
        const m = line.match(/^\|\s*([^|]+?)\s*\|(.*)\|\s*$/);
        if (!m) continue;
        for (const [, id] of m[2].matchAll(/`([a-z0-9-]+)`/g)) (idx[id] ||= []).push(m[1]);
    }
    return idx;
}

const [cmd, ...args] = process.argv.slice(2);
fs.mkdirSync(path.join(OUT, 'guides'), { recursive: true });

if (cmd === 'search') {
    process.stdout.write(cli(['search', args.join(' ')]));
} else if (cmd === 'retrieve') {
    const ids = args.join(',');
    const file = path.join(OUT, 'guides', ids.replace(/[^a-z0-9,-]/gi, '').replace(/,/g, '+') + '.md');
    const out = cli(['retrieve', ids]);
    // Over ~9.5 KB the CLI writes the guide to the OS temp dir and prints only its path.
    const saved = out.match(/saved to (.+?\.md) to prevent/)?.[1];
    fs.writeFileSync(file, saved ? fs.readFileSync(saved, 'utf8') : out);
    if (saved) fs.rmSync(saved, { force: true });
    console.log(`${path.relative(ROOT, file)} (${fs.statSync(file).size} bytes)`);
} else if (cmd === 'scan') {
    const drops = readJson(path.join(SKILL, 'drops.json'), []);
    const kept = [], dropped = {};
    for (const dir of args.length ? args : ['_js', '_sass', '_includes', '_layouts']) {
        const res = JSON.parse(cli(['legacy-scan', dir, '--json']));
        for (const g of res.guides) for (const rule of g.rules) for (const f of rule.findings) {
            const file = path.join(dir, f.file).replace(/\\/g, '/');
            const drop = drops.find(d => d.rule === rule.ruleId
                && (!d.file || file.endsWith(d.file))
                && (!d.match || (f.lineContent || '').includes(d.match)));
            if (drop) dropped[rule.ruleId] = (dropped[rule.ruleId] || 0) + 1;
            else kept.push(`${rule.ruleId} | ${file}:${f.line} | ${(f.lineContent || '').trim().slice(0, 100)}`);
        }
    }
    console.log(kept.length ? kept.join('\n') : 'No findings.');
    const d = Object.entries(dropped);
    if (d.length) console.log(`\nDropped by drops.json: ${d.map(([r, n]) => `${r} ×${n}`).join(', ')}`);
} else if (cmd === 'lock') {
    const version = args[0] || run('npm', ['view', 'modern-web-guidance', 'version']).stdout.trim();
    const dir = packageDir(version);
    const skillVersion = fs.readFileSync(path.join(dir, 'skill-version.txt'), 'utf8').trim();
    const guides = hashGuides(dir);
    fs.writeFileSync(LOCK, JSON.stringify({ version, skillVersion, guides }, null, 2) + '\n');
    console.log(`Pinned modern-web-guidance@${version} (guides ${skillVersion}, ${Object.keys(guides).length} guides).`);
} else if (cmd === 'update') {
    const latest = run('npm', ['view', 'modern-web-guidance', 'version']).stdout.trim();
    const was = lock?.guides || {};
    const now = hashGuides(packageDir(latest));
    const idx = mapIndex();
    const where = id => (idx[id] ? ` → ${idx[id].join(', ')}` : ' → not in MAP.md');
    const added = Object.keys(now).filter(id => !(id in was));
    const removed = Object.keys(was).filter(id => !(id in now));
    const changed = Object.keys(now).filter(id => id in was && was[id] !== now[id]);
    console.log(`Pinned ${pinned()} · latest ${latest}`);
    if (!added.length && !removed.length && !changed.length) console.log('Guides unchanged.');
    for (const [label, ids] of [['New', added], ['Removed', removed], ['Changed', changed]])
        if (ids.length) console.log(`\n${label} (${ids.length}):\n` + ids.map(id => `  ${id}${where(id)}`).join('\n'));
} else {
    die('Usage: node scripts/web-guidance.mjs search|retrieve|scan|update|lock [args]');
}
