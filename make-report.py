import json, re, urllib.parse, collections

vendors = {str(x['id']): x for x in json.load(open('vendor-check2.json', encoding='utf-8')) if isinstance(x, dict)}

def norm(s):
    if s is None:
        return None
    n = urllib.parse.unquote(str(s)).strip()
    if not n:
        return None
    n = n.replace('+', ' ').strip()
    if ':' in n:
        n = n.split(':', 1)[0].strip()
    return n

def core(n):
    return re.sub(r'[^a-z0-9]', '', n.lower())

degenerate = []
short = []
by_norm = collections.defaultdict(list)
for i, v in sorted(vendors.items(), key=lambda kv: kv[1]['name']):
    n = norm(v.get('slug'))
    c = core(n) if n else ''
    if not c:
        degenerate.append(v)
    elif len(c) < 3:
        short.append(v)
    else:
        by_norm[n.lower()].append(v)

dups = {n: vs for n, vs in by_norm.items() if len(vs) > 1}

def score(v):
    return (len(v.get('phone') or ''), len(v.get('website') or ''), 1 if v.get('verified') else 0, len(v.get('description') or ''), -v['id'])

lines = []
lines.append('# EasyFinder — Vendor Slug Audit (approval sheet)')
lines.append('')
lines.append('Source: live Directus api.easyfinder.ae, status=published, 16,968 vendors, 10 Sep 2026')
lines.append('')
lines.append('| Bucket | Count |')
lines.append('|---|---|')
lines.append('| A — Degenerate (slug null/empty/no letters) | {} |'.format(len(degenerate)))
lines.append('| B — Too short (1-2 chars) — KEEP | {} |'.format(len(short)))
lines.append('| C — Duplicate-slug groups ({groups} groups / {n} losers) | {n} |'.format(groups=len(dups), n=sum(len(v) - 1 for v in dups.values())))
clean = sum(len(v) for v in by_norm.values()) - sum(len(v) for v in dups.values())
lines.append('| Clean (single vendor, usable slug) | {} |'.format(clean))
lines.append('')
lines.append('**Total vendors to 404 + remove from sitemap: {}** (records, reviews and data all stay in Directus; they keep working in /search and /vendors browse via ID)'.format(len(degenerate) + sum(len(v) - 1 for v in dups.values())))
lines.append('')
lines.append('---')
lines.append('')
lines.append('## A) Degenerate slugs ({}) — 404 + exit sitemap'.format(len(degenerate)))
lines.append('')
lines.append('| ID | Name | Stored slug | URL today |')
lines.append('|---|---|---|---|')
for v in degenerate:
    raw = json.dumps(v.get('slug'), ensure_ascii=False)
    if v.get('slug'):
        u = 'https://www.easyfinder.ae/vendors/' + urllib.parse.quote(str(v['slug']))
    else:
        u = '(no URL — slug null)'
    nm = v['name'].replace('|', r'\|')
    lines.append('| {} | {} | {} | {} |'.format(v['id'], nm, raw, u))
lines.append('')
lines.append('## B) Too short ({}) — KEEP, no action (3M is a real brand)'.format(len(short)))
lines.append('')
lines.append('| ID | Name | Slug |')
lines.append('|---|---|---|')
for v in short:
    lines.append('| {} | {} | {} |'.format(v['id'], v['name'].replace('|', r'\|'), v['slug']))
lines.append('')
lines.append('## C) Duplicate-slug groups ({}) — winner KEEPS slug, losers 404 + exit sitemap'.format(len(dups)))
lines.append('')
lines.append('Winner rule (deterministic, override any row): has phone > has website > verified > has description > lower ID.')
lines.append('')
for n, vs in sorted(dups.items(), key=lambda kv: (-len(kv[1]), kv[0])):
    ranked = sorted(vs, key=score, reverse=True)
    w = ranked[0]
    lines.append('### `{}` — {} vendors — winner: **{} · {}**'.format(n, len(vs), w['id'], w['name']))
    lines.append('')
    lines.append('| ID | Name | Decision | has |')
    lines.append('|---|---|---|---|')
    for v in ranked:
        mark = 'KEEP (winner)' if v is w else '404 + exit'
        has = []
        if v.get('phone'): has.append('phone')
        if v.get('website'): has.append('website')
        if v.get('verified'): has.append('verified')
        if v.get('description'): has.append('description')
        lines.append('| {} | {} | {} | {} |'.format(v['id'], v['name'].replace('|', r'\|'), mark, ', '.join(has)))
    lines.append('')
lines.append('---')
lines.append('')
lines.append('**Proposed implementation, after your approval:**')
lines.append('1. Directus PATCH: for each loser/degenerate vendor, set `slug` to a unique machine suffix (e.g. append `-v<id>`) — reversible, no deletion, no mass redirects. Vendors themselves stay published and findable in /search and /vendors browse.')
lines.append('2. Code: re-push sitemap (it reads slugs live); no app-code change needed if we just fix the slugs, because sitemap.ts already maps vendor.slug one-to-one. (If we want a code-level safety gate too, I will add one in sitemap.ts as a filter — small diff.)')
lines.append('3. GSC: resubmit sitemap + VALIDATE FIX on the canonical/redirect rows (the 1,208 "Crawled not indexed" + 11 "alternate/redirect" buckets).')
lines.append('')
lines.append('Nothing else changes: /vendors browse, /search, /categories, reviews, schema — all untouched.')

open('slug-audit-REPORT.md', 'w', encoding='utf-8').write('\n'.join(lines))
print('degenerate:', len(degenerate), '| short:', len(short), '| dup groups:', len(dups), '| dup losers:', sum(len(v) - 1 for v in dups.values()))
print('TOTAL to 404+exit:', len(degenerate) + sum(len(v) - 1 for v in dups.values()))
print('WROTE slug-audit-REPORT.md')
