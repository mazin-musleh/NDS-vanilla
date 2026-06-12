// Gzip static server mirroring GitHub Pages (text assets gzipped at level 9;
// images/fonts served raw — they're already compressed). Serves a built Jekyll
// site under its baseurl prefix so URLs match production.
//
// CLI:    node gz-serve.mjs <siteDir> [port] [baseurl]
// import: const { startServer } = await import('./gz-serve.mjs')
//
// WHY gzip: `jekyll serve` ships assets uncompressed and inflates every
// transfer-bound metric ~4× — a pure artifact. Always measure against gzip.
import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import url from 'url';

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
  '.txt': 'text/plain', '.xml': 'application/xml',
};

export function startServer({ dir, port = 0, baseurl = '/NDS-vanilla' } = {}) {
  const root = path.resolve(dir);
  const prefix = baseurl.replace(/\/$/, '');
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (prefix && !p.startsWith(prefix)) { res.writeHead(404); res.end(); return; }
    p = p.slice(prefix.length) || '/';
    if (p.endsWith('/')) p += 'index.html';
    let file = path.join(root, p);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    let status = 200;
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      if (fs.existsSync(file + '.html')) file += '.html';
      else if (fs.existsSync(path.join(root, '404.html'))) { file = path.join(root, '404.html'); status = 404; }
      else { res.writeHead(404); res.end('not found'); return; }
    }
    const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const buf = fs.readFileSync(file);
    if (/text|javascript|json|svg|xml/.test(type)) {
      res.writeHead(status, { 'content-type': type, 'content-encoding': 'gzip' });
      res.end(zlib.gzipSync(buf, { level: 9 }));
    } else {
      res.writeHead(status, { 'content-type': type });
      res.end(buf);
    }
  });
  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => resolve({ server, port: server.address().port, baseurl: prefix }));
  });
}

// Run standalone when invoked directly (not when imported).
if (process.argv[1] && import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  const [dir, port = '4100', baseurl = '/NDS-vanilla'] = process.argv.slice(2);
  if (!dir) { console.error('usage: node gz-serve.mjs <siteDir> [port] [baseurl]'); process.exit(1); }
  startServer({ dir, port: +port, baseurl }).then(({ port, baseurl }) =>
    console.log(`serving ${path.resolve(dir)} on http://localhost:${port}${baseurl}/  (Ctrl+C to stop)`));
}
