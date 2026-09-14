#!/usr/bin/env node
// IndexNow ping: notify Bing of the new 16,740-URL sitemap.
// Key file must be publicly served at /<key>.txt on the domain (verified 200).
import fs from 'node:fs';
import path from 'node:path';
const SITE = 'https://www.easyfinder.ae';
const KEY  = '3d3d5dcf214b4690a240e6d4df8ef656';
const FILE = process.argv[2] && path.resolve(process.argv[2]) ||
  'C:/Users/learn/AppData/Local/Temp/urls_after.txt';
const BATCH = parseInt(process.argv[3] || '2000', 10);
// optional slice: [start, end) URLs, for a probe before the full fire
const START = parseInt(process.argv[4] || '0', 10);
const END   = parseInt(process.argv[5] || '0', 10) || Infinity;

const urls = fs.readFileSync(FILE, 'utf8').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
console.log(`loaded ${urls.length} URLs from ${FILE}`);
const slice = urls.slice(START, END);
if (slice.length === 0) { console.log('nothing to send'); process.exit(0); }

const batches = [];
for (let i = 0; i < slice.length; i += BATCH) batches.push(slice.slice(i, i + BATCH));

let ok = 0, failed = 0;
for (let b = 0; b < batches.length; b++) {
  const body = { host: 'www.easyfinder.ae', key: KEY, urlList: batches[b] };
  const t0 = Date.now();
  try {
    const r = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    const text = await r.text();
    console.log(`batch ${b + 1}/${batches.length} (${batches[b].length} urls) -> ${r.status} in ${Date.now() - t0}ms ${
      text.length < 300 ? text : text.slice(0, 120) + '...'
    }`);
    if (r.ok) ok++; else failed++;
  } catch (e) {
    console.log(`batch ${b + 1}/${batches.length} -> ERROR ${e.message}`);
    failed++;
  }
  if (b + 1 < batches.length && batches[b].length >= 1500) {
    await new Promise((res) => setTimeout(res, 1200));
  }
}
console.log(`\nTotal: ${ok} ok, ${failed} failed, sent ${ok * 1} batches x ~${BATCH} urls`);
