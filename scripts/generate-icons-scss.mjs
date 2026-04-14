#!/usr/bin/env node
// Generate _sass/_icons.scss with UI icons inlined as URL-encoded data URIs.
// Reads SVG path data directly from @hugeicons/core-free-icons — no intermediate
// files on disk. Icons paint with the CSS; content/demo pages use the HGI CDN
// font (loaded via _includes/head.html when `use_hgi_font: true`).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_CORE = path.join(ROOT, '_sass', '_icons.scss');

const UI_ICONS = [
  // pseudo-element icons
  'alert-circle', 'arrow-left-01', 'cancel-circle',
  'checkmark-circle-01', 'checkmark-circle-02', 'eye', 'information-circle',
  'link-square-02', 'remove-01', 'tick-02', 'zoom-in-area',
  // template chrome icons (_includes markup)
  'cancel-01', 'door-01', 'identity-card', 'link-04',
  'linkedin-02', 'lock-password', 'mail-01', 'menu-01', 'menu-02', 'mic-01',
  'moon-02', 'new-twitter', 'plus-sign', 'search-01', 'share-01',
  'smart-phone-01', 'square-lock-01', 'view-off', 'whatsapp',
  // data-driven chrome icons (mainnav + hero + footer YAML)
  'facebook-02', 'headphones', 'location-01', 'notification-02', 'youtube',
  'translation', 'user',
  // JS-injected icons
  'arrow-left-02', 'award-05', 'calendar-03', 'clock-01',
  'cloud', 'cloud-angled-rain', 'cloud-angled-rain-zap', 'cloud-snow',
  'moon-cloud', 'slow-winds', 'square-arrow-shrink-01', 'sun-01', 'sun-03',
  'sun-cloud-01', 'zoom-out-area', 'refresh',
  // table sort indicators
  'sort-by-down-02', 'sort-by-up-02',
];

// Hand-authored path overrides — wins over the npm-extracted version. Use when
// the @hugeicons/core-free-icons glyph drifts from the design we want shipped
// (e.g. a filled variant instead of stroke). `body` is the inner SVG markup
// (paths, no <svg> wrapper). `viewBox` defaults to '0 0 24 24'. Use
// `currentColor` for fills/strokes so colour follows the surrounding text.
const OVERRIDES = {
  user: {
    body: `<path fill-rule='evenodd' clip-rule='evenodd' d='M8.25 6.5C8.25 4.42893 9.92893 2.75 12 2.75C14.0711 2.75 15.75 4.42893 15.75 6.5C15.75 8.57107 14.0711 10.25 12 10.25C9.92893 10.25 8.25 8.57107 8.25 6.5ZM12 1.25C9.1005 1.25 6.75 3.6005 6.75 6.5C6.75 9.39949 9.1005 11.75 12 11.75C14.8995 11.75 17.25 9.39949 17.25 6.5C17.25 3.6005 14.8995 1.25 12 1.25ZM6.96146 16.126C10.0426 14.2913 13.9577 14.2913 17.0389 16.126C17.2068 16.226 17.3907 16.3303 17.5834 16.4397L17.5835 16.4397C18.2961 16.844 19.1281 17.316 19.7082 17.8838C20.0683 18.2363 20.2218 18.5271 20.2464 18.7517C20.2659 18.9301 20.2208 19.2242 19.7702 19.6535C18.7343 20.6404 17.6818 21.25 16.4093 21.25H7.59104C6.3186 21.25 5.26602 20.6404 4.23017 19.6535C3.77954 19.2242 3.73445 18.9301 3.75395 18.7517C3.77851 18.5271 3.93202 18.2363 4.29214 17.8838C4.87223 17.316 5.70426 16.844 6.41686 16.4397L6.417 16.4396C6.60966 16.3303 6.7936 16.226 6.96146 16.126ZM18.2288 15.0792C18.0662 14.9874 17.9226 14.9064 17.8063 14.8372C14.2523 12.7209 9.74809 12.7209 6.19404 14.8372C6.07773 14.9064 5.93405 14.9875 5.77139 15.0793C5.05857 15.4814 3.98106 16.0893 3.2429 16.8118C2.78123 17.2637 2.34257 17.8592 2.26283 18.5888C2.17802 19.3646 2.51649 20.0927 3.1955 20.7396C4.36695 21.8556 5.77274 22.75 7.59104 22.75H16.4093C18.2276 22.75 19.6334 21.8556 20.8048 20.7396C21.4839 20.0927 21.8223 19.3646 21.7375 18.5888C21.6578 17.8592 21.2191 17.2637 20.7575 16.8118C20.0193 16.0893 18.9418 15.4814 18.229 15.0793L18.2288 15.0792Z' fill='currentColor'/>`,
  },
};

// Aliases that reuse another icon's data URI with a CSS transform —
// avoids inlining the same SVG twice when one is just a mirror/rotation.
const MIRRORED = {
  // arrow-01 family: base points LEFT. All other directions derive via CSS
  // transforms. Components that need "down" natively (select/date-picker
  // carets, menu-btn chevron) mask arrow-left-01 and apply their own rotate(-90deg).
  'arrow-right-01': { source: 'arrow-left-01', transform: 'scaleX(-1)'     },
  'arrow-up-01':    { source: 'arrow-left-01', transform: 'rotate(90deg)'  },
  'arrow-down-01':  { source: 'arrow-left-01', transform: 'rotate(-90deg)' },
  // arrow-02 family
  'arrow-right-02': { source: 'arrow-left-02', transform: 'scaleX(-1)' },
};

function kebabToPascalIcon(name) {
  return name.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'Icon';
}

function attrsToString(attrs) {
  return Object.entries(attrs)
    .map(([k, v]) => {
      if (k === 'key') return null;
      const attr = k.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
      return `${attr}='${v}'`;
    })
    .filter(Boolean)
    .join(' ');
}

function wrapSvg(body, viewBox = '0 0 24 24') {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='${viewBox}' fill='none'>${body}</svg>`;
}

function buildSvgFromPathArray(pathArray) {
  const body = pathArray
    .map(([tag, attrs]) => `<${tag} ${attrsToString(attrs)}/>`)
    .join('');
  return wrapSvg(body);
}

function urlEncodeSvg(svg) {
  return svg
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E');
}

const rootTokens = [];
const uiAliases = [];

for (const name of [...UI_ICONS].sort()) {
  let svg;
  if (OVERRIDES[name]) {
    svg = wrapSvg(OVERRIDES[name].body, OVERRIDES[name].viewBox);
  } else {
    const modName = kebabToPascalIcon(name);
    const modPath = `@hugeicons/core-free-icons/dist/esm/${modName}`;
    let mod;
    try {
      mod = await import(modPath);
    } catch (e) {
      console.error(`missing icon in @hugeicons/core-free-icons: ${name} (${modName})`);
      process.exit(1);
    }
    svg = buildSvgFromPathArray(mod.default);
  }
  const uri = `data:image/svg+xml;utf8,${urlEncodeSvg(svg)}`;
  rootTokens.push(`  --nds-icon-${name}: url("${uri}");`);
  uiAliases.push(`.nds-hgi-${name} { --nds-icon: var(--nds-icon-${name}); }`);
}

const mirroredAliases = Object.entries(MIRRORED).flatMap(([alias, { source, transform }]) => {
  if (!UI_ICONS.includes(source)) {
    console.error(`mirrored alias '${alias}' references unknown source '${source}'`);
    process.exit(1);
  }
  // Apply the transform to ::before (the masked glyph) so the outer element's
  // transform stays free for component-level overrides (pagination flip,
  // dropmenu open-state rotation, etc.) without collision.
  return [
    `.nds-hgi-${alias} { --nds-icon: var(--nds-icon-${source}); }`,
    `.nds-hgi-${alias}::before { transform: ${transform}; }`,
  ];
});

const coreOutput = `// Auto-generated by scripts/generate-icons-scss.mjs. Do not edit by hand.
// UI icons inlined as data URIs — covers chrome, pseudo-elements, and
// JS-injected icons. Content/demo pages use the HGI font instead.

:root {
${rootTokens.join('\n')}
}

.nds-icon {
  display: inline-block;
  position: relative;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
}

// The icon glyph lives in ::before so sibling children (e.g. .nds-badge)
// are not clipped by the mask.
.nds-icon::before {
  content: "";
  position: absolute;
  inset: 0;
  background: currentColor;
  mask: var(--nds-icon) center / contain no-repeat;
}

${uiAliases.join('\n')}

// Mirrored aliases (reuse another icon's data URI with a CSS transform)
${mirroredAliases.join('\n')}
`;

fs.writeFileSync(OUT_CORE, coreOutput);
const size = fs.statSync(OUT_CORE).size;
console.log(`wrote ${OUT_CORE} (${(size / 1024).toFixed(1)} KB, ${UI_ICONS.length} UI icons)`);
