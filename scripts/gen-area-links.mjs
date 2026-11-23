// Regenerates src/lib/area-links.json — the cross-link graph between
// category pages and gated area pages. Committed to the repo so dynamic
// pages never need the 17k-row vendor fetch just to render link chips.
// Run: node scripts/gen-area-links.mjs  (after approving new vendors)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = fs.readFileSync(path.join(root, ".env.local"), "utf8");
const tok = env.split(/\r?\n/).find((l) => l.startsWith("DIRECTUS_API_TOKEN"))?.split("=").slice(1).join("=").trim();
const base = "https://api.easyfinder.ae";

const rows = [];
for (let page = 1; page <= 10; page++) {
  const r = await fetch(
    `${base}/items/vendors?limit=5000&page=${page}` +
      `&fields=id,name,category.name,category.slug,status,service_areas` +
      `&filter[status][_eq]=published`,
    { headers: { Authorization: `Bearer ${tok}` } },
  );
  if (!r.ok) { console.error("API", r.status, await r.text()); process.exit(1); }
  const j = await r.json();
  rows.push(...j.data);
  if (j.data.length < 5000) break;
}
console.log("vendors:", rows.length);

// --- mirror of src/lib/areas.ts normalizers (keep in sync!) ---
function parseAreaValues(raw) {
  let arr = raw;
  if (typeof raw === "string") { try { arr = JSON.parse(raw); } catch { arr = [raw]; } }
  return Array.isArray(arr) ? arr.map((x) => (typeof x === "string" ? x : "")).filter(Boolean) : [];
}
function normalizeArea(raw) {
  let s = raw.trim();
  for (let i = 0; i < 3; i++) {
    const p = s.replace(/^\[+/, "").replace(/\]+$/, "").replace(/^"+|"+$/g, "").trim();
    if (p === s) break; s = p;
  }
  s = s.replace(/\s+/g, " ");
  if (s.length < 2 || s.length > 60) return "";
  if (/^[a-z]?\d[\d\s-]*$/i.test(s)) return "";
  return s;
}
const areaSlug = (s) => s.toLowerCase().replace(/[\s_]+/g, "-").replace(/["'[\]()/.,&]+/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
const titleCase = (s) => s.split(" ").map((w) => (/^[a-z]/.test(w) ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");

const MIN = 10;
const areas = new Map(); // slug -> { counts:Map, cats:Map }
for (const v of rows) {
  const seen = new Set();
  for (const raw of parseAreaValues(v.service_areas)) {
    const norm = normalizeArea(raw);
    if (!norm) continue;
    const slug = areaSlug(norm);
    if (!slug || slug === "-" || seen.has(slug)) continue;
    seen.add(slug);
    let a = areas.get(slug);
    if (!a) { a = { slug, counts: new Map(), cats: new Map() }; areas.set(slug, a); }
    a.counts.set(norm, (a.counts.get(norm) || 0) + 1);
    const cs = v.category?.slug ?? v.category;
    if (typeof cs === "string" && cs) a.cats.set(cs, (a.cats.get(cs) || 0) + 1);
  }
}

const gated = [...areas.values()].filter((a) => [...a.counts.values()].reduce((s, n) => s + n, 0) >= MIN);
// NOTE: gate counts unique area-slots per vendor (seen set) — same as areas.ts.
const byCat = {};
for (const a of gated) {
  const variants = [...a.counts.entries()];
  const nice = variants.filter(([v]) => /^[\p{Lu}\p{Script=Arabic}]/u.test(v)).sort((x, y) => y[1] - x[1]);
  const name = titleCase(nice[0]?.[0] || variants.sort((x, y) => y[1] - x[1])[0]?.[0] || a.slug);
  const total = [...a.counts.values()].reduce((s, n) => s + n, 0);
  for (const [cs, n] of a.cats) {
    (byCat[cs] ??= []).push({ slug: a.slug, name, count: n });
  }
}
for (const cs of Object.keys(byCat)) {
  byCat[cs] = byCat[cs].sort((x, y) => y.count - x.count).slice(0, 8);
}

const out = { generatedAt: new Date().toISOString(), gatedAreaCount: gated.length, byCategory: byCat };
fs.writeFileSync(path.join(root, "src", "lib", "area-links.json"), JSON.stringify(out, null, 1));
console.log("gated areas:", gated.length, "| categories linked:", Object.keys(byCat).length);
console.log("plumbers top areas:", (byCat.plumbers || []).map((a) => `${a.name}(${a.count})`).join(", "));
