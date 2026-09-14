/* Sluggify: Arabic keeps spaces + diacritics stripped; Latin NFKD-transliterated; ASCII-only fallback. */
const fs = require('fs');
const path = require('path');
const audit = JSON.parse(fs.readFileSync(path.join(__dirname, 'vendor-audit-final.json'), 'utf-8'));
const full = JSON.parse(fs.readFileSync(path.join(__dirname, 'vendor-check2.json'), 'utf-8')).filter(v => typeof v === 'object' && v);

const degenerateIds = new Set(audit.degenerate.map(v => String(v.id)));
const loserIds = new Set();
for (const grp of Object.values(audit.dups)) {
  const sorted = grp.slice().sort((a, b) => Number(a.id) - Number(b.id));
  for (let i = 1; i < sorted.length; i++) loserIds.add(String(sorted[i].id));
}
const reserved = new Set();
for (const v of full) {
  const id = String(v.id);
  if (!degenerateIds.has(id) && !loserIds.has(id) && typeof v.slug === 'string') reserved.add(v.slug.toLowerCase());
}

const AR = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const ASCII = /[A-Za-z0-9]/;

function slugify(name) {
  let s = String(name || '').trim();
  s = s.replace(/\|/g, ' ');                    // pipes
  s = s.replace(/[\u0200-\u02FF\u1D00-\u1D7F\uFF00-\uFFEF\u2100-\u214F]/g, (c) => { // script letters -> base if mapped
    const m = c.normalize('NFKD')[0];
    return m && /[A-Za-z0-9]/.test(m) ? m : ' ';
  });
  s = s.normalize('NFKD');
  s = s.replace(/[\u0300-\u036f]/g, '');   // latin combining marks only
  if (AR.test(s) && !ASCII.test(s)) {
    const ar = s.replace(/[^\u0600-\u06FF\s]/g, '').trim();
    return (ar || '').replace(/\s+/g, '-').replace(/^-+|-+$/g, '').slice(0, 160);
  }
  const ascii = s.replace(/[^\x20-\x7E]/g, '').replace(/[^\w\s-]/g, ' ').trim().replace(/\s+/g, '-').replace(/^-+|-+$/g, '').toLowerCase().slice(0, 100);
  return ascii.length >= 3 ? ascii : null;
}

const planA = [];
const used = new Set();
for (const v of audit.degenerate) {
  let base = slugify(v.name) || ('vendor-' + v.id);
  let slug = base;
  let n = 2;
  while (reserved.has(slug.toLowerCase()) || used.has(slug)) { slug = base + '-' + n; n++; }
  planA.push({ id: v.id, name: v.name, old: v.slug, new: slug });
  used.add(slug); reserved.add(slug.toLowerCase());
}

// Rebuild C: winner = richest record (fields present), tie -> smallest id; losers -> draft.
const planC = [];
const winners = [];
const thinGroups = [];
const richness = (v) =>
  ((v.phone || '').trim().length > 0 ? 8 : 0) +
  ((v.website || '').trim().length > 0 ? 4 : 0) +
  Math.min((v.description || '').trim().length, 400) * 0.02 +
  (v.verified ? 4 : 0);
for (const [slug, grp] of Object.entries(audit.dups)) {
  let best = grp[0];
  for (const g of grp) {
    if (richness(g) > richness(best) || (richness(g) === richness(best) && Number(g.id) < Number(best.id))) best = g;
  }
  if (richness(best) < 2) thinGroups.push({ slug, size: grp.length, winnerName: best.name });
  winners.push({ slug, winnerId: best.id, winnerName: best.name, size: grp.length, score: +richness(best).toFixed(2) });
  for (const g of grp) if (String(g.id) !== String(best.id)) planC.push({ id: g.id, name: g.name, duplicateOf: best.id, slug });
}

fs.writeFileSync(path.join(__dirname, 'write-plan.json'), JSON.stringify({
  A_slugs: planA, C_draft: planC, winners,
  summary: { degenerate: planA.length, dupLosers: planC.length, groups: winners.length, thinGroups: thinGroups.length }
}, null, 1));

console.log('PLAN A:', planA.length);
for (const p of planA) console.log('  ', p.id, '|', p.new.slice(0, 70), '| from', JSON.stringify(p.old).slice(0, 50));
console.log('\nPlan C losers:', planC.length, 'in', winners.length, 'groups | thin winners flagged:', thinGroups.length);
for (const g of thinGroups) console.log('  THIN:', g.slug, '| winner:', g.winnerName);
const seen = new Map(); let coll = 0;
for (const p of planA) { if (seen.has(p.new)) coll++; seen.set(p.new, 1); }
console.log('A-slug collisions among new slugs:', coll);
console.log('WROTE write-plan.json');
