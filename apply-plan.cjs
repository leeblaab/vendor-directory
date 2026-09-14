// Apply write-plan to Directus. --apply executes.
const fs = require('fs');
const path = require('path');
const { readFileSync } = require('fs');
function getEnv() {
  const raw = readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i <= 0) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (v) out[k] = v;
  }
  return out;
}
const env = { ...process.env, ...getEnv() };
const tok = env['DIRECTUS_API_TOKEN'];
const base = 'https://api.easyfinder.ae';
const plan = JSON.parse(readFileSync(path.join(__dirname, 'write-plan.json'), 'utf-8'));
const APPLY = process.argv.includes('--apply');
const arg = process.argv.find((a) => a && a.startsWith('--max='));
const MAX = arg ? parseInt(arg.slice(6), 10) : 100000;
function req(method, urlPath, qs, body) {
  let url = base + urlPath;
  if (qs) url += '?' + Object.entries(qs).map(([k, v]) => k + '=' + encodeURIComponent(v)).join('&');
  const headers = { 'Authorization': 'Bearer ' + tok };
  if (body) headers['Content-Type'] = 'application/json';
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? require('https') : require('http');
    const u = new URL(url);
    const opts = { hostname: u.hostname, port: 443, path: u.pathname + u.search, method, headers };
    const r = lib.request(opts, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    r.on('error', reject);
    r.setTimeout(30000, () => { r.destroy(new Error('timeout')); });
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}
async function main() {
  const log = (m) => process.stdout.write(m + '\n');
  let okA = 0, failA = [];
  const A = (plan['A_slugs'] || []).slice(0, MAX);
  for (const it of A) {
    if (!APPLY) {
      log('DRY A  id=' + it.id + ' slug=' + JSON.stringify(it.new).slice(0, 80) + ' (from ' + JSON.stringify(it.old).slice(0, 60) + ')');
      okA++;
      continue;
    }
    const r = await req('PATCH', '/items/vendors/' + it.id, null, { slug: it.new });
    if (r.status >= 200 && r.status < 300) okA++;
    else { failA.push({ id: it.id, status: r.status, body: r.body.slice(0, 300) }); }
  }
  log('---A: ok=' + okA + ' fail=' + failA.length);
  for (const f of failA) log('   FAIL ' + JSON.stringify(f));
  let okC = 0, failC = [];
  const C = (plan['C_draft'] || []).slice(0, MAX);
  for (const it of C) {
    if (!APPLY) {
      log('DRY C  id=' + it.id + ' name=' + JSON.stringify(it.name).slice(0, 50) + ' -> draft (loser of ' + it.slug + ')');
      okC++;
      continue;
    }
    const r = await req('PATCH', '/items/vendors/' + it.id, null, { status: 'draft' });
    if (r.status >= 200 && r.status < 300) okC++;
    else { failC.push({ id: it.id, status: r.status, body: r.body.slice(0, 300) }); }
  }
  log('---C: ok=' + okC + ' fail=' + failC.length);
  for (const f of failC) log('   FAIL ' + JSON.stringify(f));
  if (APPLY) {
    fs.writeFileSync(path.join(__dirname, 'apply-log.json'), JSON.stringify({ ts: new Date().toISOString(), okA, failA, okC, failC }, null, 2));
  }
  process.exit(failA.length + failC.length > 0 ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(2); });
