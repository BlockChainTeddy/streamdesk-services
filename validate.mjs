import { readFileSync } from 'node:fs';
export function validateCatalog(catalog) {
  if (!catalog || typeof catalog !== 'object' || Array.isArray(catalog)) throw new Error('Catalog must be an object.');
  if (Object.keys(catalog).some(k => !['schemaVersion','services'].includes(k))) throw new Error('Unexpected catalog field.');
  if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.services) || catalog.services.length > 200) throw new Error('Invalid schema version or service list.');
  const ids = new Set();
  for (const service of catalog.services) {
    if (!service || typeof service !== 'object' || Array.isArray(service)) throw new Error('Invalid service.');
    const allowed = ['id','name','serverUrl','protocol','enabled','logoUrl'];
    if (Object.keys(service).some(k => !allowed.includes(k))) throw new Error('Unexpected service field; credentials must never be included.');
    if (typeof service.id !== 'string' || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(service.id) || ids.has(service.id)) throw new Error('Invalid or duplicate service ID.');
    ids.add(service.id);
    if (typeof service.name !== 'string' || !service.name.trim() || service.name.length > 80) throw new Error('Invalid display name.');
    if (service.protocol !== 'xtream' || typeof service.enabled !== 'boolean') throw new Error('Invalid protocol or enabled flag.');
    checkUrl(service.serverUrl, false);
    if (service.logoUrl !== undefined) checkUrl(service.logoUrl, true);
  }
}
function checkUrl(value, logo) {
  if (typeof value !== 'string' || value.length > 2048) throw new Error('Invalid URL.');
  const url = new URL(value);
  if (!(logo ? ['https:'] : ['http:','https:']).includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error('URLs must not contain credentials, queries or fragments; logos require HTTPS.');
}
if (process.argv[1] && import.meta.url === new URL('file:' + (process.platform === 'win32' ? '/' : '') + process.argv[1].replaceAll('\\','/')).href) {
  try { validateCatalog(JSON.parse(readFileSync(process.argv[2] || 'providers.json','utf8'))); console.log('Provider catalog is valid.'); }
  catch { console.error('Provider catalog validation failed. Check names, IDs, URLs and schema. Do not add credentials.'); process.exitCode = 1; }
}
