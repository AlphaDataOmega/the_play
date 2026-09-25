import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT ?? 8080);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer from 1 to 65535.');
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const target = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    const relative = target.slice(root.length);
    if (!target.startsWith(root.endsWith(sep) ? root : root + sep) ||
        relative.split(sep).some(part => part.startsWith('.'))) {
      response.writeHead(403).end();
      return;
    }
    const data = await readFile(target);
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.md': 'text/plain' };
    response.writeHead(200, { 'Content-Type': (types[extname(target)] ?? 'application/octet-stream') + '; charset=utf-8',
      'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404).end('Not found');
  }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Natural Intelligence: http://127.0.0.1:${port}`));
