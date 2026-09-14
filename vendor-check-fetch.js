
const fs = require('fs');
const env = fs.readFileSync('.env.local','utf8');
const m = env.match(/DIRECTUS_API_TOKEN=[^\n]*/);
if (!m) { console.log('NO_TOKEN_KEY'); process.exit(1); }
const token = m[0].split('=').slice(1).join('=').trim();
if (token.startsWith('["') || token.length < 10) { console.log('TOKEN_SHAPE_WEIRD len='+token.length); process.exit(1); }
console.log('token: loaded, len=' + token.length, '(value not printed)');
async function fetchAll() {
  let all = [], offset = 0;
  while (true) {
    const url = 'https://api.easyfinder.ae/items/vendors?limit=500&offset=' + offset + '&fields=id,name,slug&filter[status][_eq]=published';
    const r = await fetch(url, { headers: { Authorization: 'Bearer ' + token } });
    if (!r.ok) { console.log('HTTP_ERR', r.status, (await r.text()).slice(0,300)); process.exit(1); }
    const d = await r.json();
    all = all.concat(d.data);
    if (d.meta && typeof d.meta.total === 'number') {
      if (offset + all.length % 500 === 0 && (offset + 500) >= d.meta.total && all.length >= d.meta.total) break;
      if (all.length >= d.meta.total) break;
    } else if (d.data.length < 500) break;
    offset += 500;
    if (offset > 40000) { console.log('SAFETY_STOP'); break; }
  }
  return all;
}
fetchAll().then(v => {
  fs.writeFileSync('vendor-check.json', JSON.stringify(v));
  const uniq = new Set(v.map(x => x.id));
  console.log('Fetched vendors:', v.length, 'unique ids:', uniq.size);
}).catch(e => { console.log('FETCH_ERR', e.message); process.exit(2); });
