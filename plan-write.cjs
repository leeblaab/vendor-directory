
const fs = require('fs');
const path = require('path');
const audit = JSON.parse(fs.readFileSync(path.join(__dirname, 'vendor-audit-final.json'), 'utf-8'));

const degenerateIds = new Set(audit.degenerate.map(v => String(v.id)));
const loserIds = new Set();
const loserList = [];
for (const [slug, grp] of Object.entries(audit.dups)) {
  const sorted = grp.slice().sort((a, b) => Number(a.id) - Number(b.id));
  for (let i = 1; i < sorted.length; i++) {
    loserIds.add(String(sorted[i].id));
    loserList.push({ id: sorted[i].id, name: sorted[i].name, duplicateOf: sorted[0].id, slug });
  }
}
const full = JSON.parse(fs.readFileSync(path.join(__dirname, 'vendor-check2.json'), 'utf-8'))
  .filter(v => typeof v === 'object' && v);
const reserved = new Set();
for (const v of full) {
  const id = String(v.id);
  if (!degenerateIds.has(id) && !loserIds.has(id) && typeof v.slug === 'string') {
    reserved.add(v.slug.toLowerCase());
  }
}
function coreOf(s) {
  s = (s || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  return s.toLowerCase().replace(/[\s\-_::.\u200b\u200e\u200f+\u00a0]+/g, '');
}
function makeSlug(v) {
  const core = coreOf(v.name);
  if (core.length >= 3) return core.slice(0, 80);
  return 'vendor-' + v.id;
}
const planA = [];
for (const v of audit.degenerate) {
  let slug = makeSlug(v);
  if (reserved.has(slug)) slug = slug + '-' + v.id;
  planA.push({ id: v.id, name: v.name, old: v.slug, new: slug });
  reserved.add(slug.toLowerCase());
}
const planC = loserList;
const out = { A_slugs: planA, C_draft: planC, summary: {
  degenerate: planA.length, dupLosers: planC.length,
  groups: Object.keys(audit.dups).length } };
fs.writeFileSync(path.join(__dirname, 'write-plan.json'), JSON.stringify(out, null, 1));
console.log('PLAN A (slug writes):', planA.length);
for (const p of planA) console.log('  ', p.id, '|', (p.new).slice(0,60), '| from', JSON.stringify(p.old));
console.log('PLAN C (status->draft):', planC.length);
const byGroup = {};
for (const l of planC) { byGroup[l.slug] = (byGroup[l.slug] || 0) + 1; }
const top = Object.entries(byGroup).sort((a,b) => b[1]-a[1]).slice(0, 12);
for (const [s, n] of top) console.log('  ', n + 'x', s);
// sanity: any plan-A slug colliding with another plan-A slug?
const seen = new Map();
for (const p of planA) {
  if (seen.has(p.new)) console.log('COLLISION at', p.new, seen.get(p.new), 'vs', p.id);
  seen.set(p.new, p.id);
}
console.log('collisions checked:', seen.size, 'unique');
console.log('WROTE write-plan.json');
