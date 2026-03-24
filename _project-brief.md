# Ownership Guide — Master Project Brief
> Single source of truth for all Claude and ChatGPT sessions.
> Last updated: March 2026 · Based on repo v0292

---

## 1. What This Site Is

**Ownership Guide** (ownershipguide.com) is a decision library for expensive, long-lived financial decisions — cars, property, family costs, protection, and investing/liquidity.

**Core positioning:** "Make high-cost decisions with clarity." Not a news site, not instalment-only. Focuses on total exposure, liquidity strain, and the frictions that break plans after the headline number looks affordable.

**Brand type:** Faceless editorial. No named author, no personal brand.

### Geographic scope
- **Now:** Singapore-first. All content is Singapore-specific.
- **Eventually:** Global expansion using a universal framework + country-specific data layer. Do not architect for this yet — build SG depth first.

### Topic scope
- **Now:** Transport, Property, Family/Children, Protection/Insurance, Investing/Liquidity
- **Future clusters:** Luxury assets (watches, yachts, art), other wealth ownership topics

### Monetisation (in order)
1. **Google AdSense** — approved and live (Auto Ads). Primary current revenue.
2. **Affiliate/referral** — not started. Natural future layer: insurance comparison, mortgage brokers, car loans.
3. **Sponsored content** — possible later.

---

## 2. Technical Stack

**Stack:** Static HTML, no CMS, no React, no build pipeline. Pure HTML + CSS + vanilla JS.
**Hosting:** GitHub Pages.
**Current version:** v0292

### Key files

| File | Purpose |
|------|---------|
| `includes.js` | ⚠️ Central nervous system — ALL shared behaviour. Never regenerate from scratch. See Section 3. |
| `styles.css` | Global stylesheet |
| `index.html` | Homepage |
| `sitemap.xml` | 500 URLs — regenerate with `python3 generate-sitemap.py` each session |
| `featured.json` | Hub + homepage dynamic data. Keys: `cluster_pages`, `new[]` (sorted by `first_seen` from `page_registry`, NOT last_updated), `popular[]`, `pinned` (dict keyed by cluster — NEVER flatten to list), `page_registry`. Regenerate with `python3 generate-featured.py` each session. |
| `generate-sitemap.py` | Regenerates sitemap.xml. Run from repo root. |
| `generate-featured.py` | Regenerates featured.json. Preserves `pinned` dict, `page_registry`, diversity cap. Run from repo root. |
| `_project-brief.md` | This file. Do not rename, move, delete, deploy, or add to sitemap. |
| `_email-capture-setup.md` | Keep locally — do not upload to GitHub. |

### Directory structure
```
/ (root)          — All content pages (.html files)
/transport/       — Transport hub
/property/        — Property hub
/family/          — Family hub
/protection/      — Protection hub
/investing/       — Investing hub
/financing/       — Financing hub
/calculators/     — Calculators hub
/comparisons/     — Comparisons hub
/start-here/      — Guided entry path
```

### Page taxonomy (required on every content page)
```html
<meta name="og:cluster" content="transport|property|family|protection|investing">
<meta name="og:subtopic" content="comparison|calculator|financing|planning|...">
```

---

## 3. includes.js — Handle With Extreme Care

**Breaking this file takes down the entire site silently.** After any edit: `node --check includes.js`.

### What it controls
- Header/footer injection
- GA4 analytics (G-RH8YDW5LFP)
- AdSense Auto Ads (ca-pub-8718234605112874)
- Auto-related link injection
- "Next steps" decision path module (`_hasCalc` / `_hubByCluster` constants)
- Back-to-cluster links, email capture, Topics nav dropdown hover (`initNavDropdownHover`)
- Search scoring (`scoreResult()` with pillar boost, aging-parents hub +12 boost)

### Critical settings — never change
```javascript
enableAdSenseAutoAds: true        // Auto Ads live — DO NOT CHANGE
enableAutoAdSlots: false          // ⚠️ INTENTIONAL
emailCaptureUrl: "https://script.google.com/macros/s/AKfycbymgo2k_2loWUwDzuCbtEDOMEYeGzQC1FRj7zOYVl5GG5Sv4C2f82oH4QEnnHPuu7s/exec"
```

### Must always be preserved
- All 6 SITE cluster entries: `transport`, `property`, `financing`, `family`, `protection`, `investing`
- `scoreResult()` URL scoring: `item?.url` and `uTokens` logic
- `_hasCalc` and `_hubByCluster` constants
- `emailCaptureUrl` value exactly as-is

### Hub dynamic scripts — critical pattern
Hub pages access `pinned` as `data.pinned['family']` (dict access). Never change to `.filter()`.

### ⚠️ SITE block modification rule (v0282 incident)
The keyword `property:` appears in MULTIPLE places in includes.js — once in a nav routing object and once in `const SITE`. Any script that modifies includes.js arrays MUST:
1. Find `const SITE = {` and its matching closing `}` first
2. Only search/operate within those exact character positions
3. Never search for `
    property:` in the full file — it hits the wrong object
4. After modification: verify protection.pillars length is unchanged from original

---

## 4. Core Workflow Rules

1. **Read source first.** Always audit before changing anything.
2. **Every version returns:** changed-files-only zip + commit message
3. **Standard session order:** sweep → fix → generators → enhancements → package
4. **Cannibalisation check** before any new pages
5. **No breaking changes**
6. **Prefer bundles** (3–5 pages + scoped fixes)
7. **Full-file replacements** preferred over partial edits

### Standard sweep checklist (every session)
- Broken internal links
- Duplicate Last updated (except `editorial-policy.html`, `privacy-policy.html`)
- Missing References section (`References (starting points)` and `Sources & references` are valid)
- Missing `<div id="auto-related"></div>` (hub pages excluded)
- Short pages (<1,450w)
- Invalid JSON-LD schema
- Orphan pages (0 inbound links)
- includes.js syntax (`node --check`)
- New pages in SITE search index
- Hub pages updated (all 8 hubs)
- featured.json: `pinned` must be dict keyed by cluster
- **ALL files in any package: 0 bytes = BLOCKER, do not ship**

### Generator commands (every session)
```bash
python3 generate-sitemap.py    # from repo root
python3 generate-featured.py   # from repo root
```

---

## 5. Global Page Standards

### Every content page must have
- Scenario library or decision framework
- FAQ section + FAQPage JSON-LD schema
- Article JSON-LD schema (headline must not contain unescaped double-quotes)
- References section (last before Last updated line)
- `Last updated: DD Mon YYYY`
- `og:cluster` and `og:subtopic` meta tags
- `<div id="auto-related"></div>` immediately before References

### Content standards
- Articles: 1,500–2,000+ words; no padding
- Calculators: tool-first; 1,200+ words; never turn into essays

### Known false positives
- `editorial-policy.html` and `privacy-policy.html` — multiple Last updated by design
- Hub pages — excluded from auto-related and short-page checks

---

## 6. Writing Style Guide

- **Tone:** Direct, analytical, slightly clinical. Not warm/friendly. Not alarmist.
- **Sentences:** Short, declarative. Frequent line breaks. Never padded.
- **Framing:** Wrong question → reframe to right question → model it.
- **Numbers:** Always ranges, never single figures. Label as planning ranges.
- **CTAs:** Framework → calculator → mechanics order.
- **Never:** Marketing language, promises, superlatives, false certainty.

---

## 7. Current Site Health (as of v0282.2)

- ✅ 492 HTML files | ~430 content pages
- ✅ 0 broken internal links
- ✅ 0 orphan pages
- ✅ 0 empty files
- ✅ 0 invalid schema
- ✅ 491 sitemap URLs
- ✅ Article schema on ~268 pages
- ✅ AdSense Auto Ads live | GA4 active | Email capture live
- ✅ featured.json: `pinned` dict, `page_registry` present, diversity cap in generator
- ✅ Topics nav hover working
- ✅ All 5 cluster hubs: "Start with the path" at position 1
- ✅ Family hub: compact 2-column grid for aging-parent sub-topics

---

## 8. Cluster Status

### Transport (56 content pages) ✅ Very strong
Full branch coverage: ownership cost, purchase/financing, lifecycle/exit/COE, alternatives, EV, hybrid, motorcycle (all branches), used-car diligence, maintenance, post-incident, car-type, aging-car, aging-parents bridges.

### Property (118 content pages) ✅ Very strong
Full branch coverage: financing/borrowing, ownership/holding cost, sell/move/execution, rental/landlord, HDB rules/grants/process, ownership structure, EC/route selection, unit selection/liveability, post-purchase/move-in, right-sizing/later-life, aging-parents bridges, and retirement housing-equity bridge pages.
**Note:** 90 pages were backfilled with `og:cluster="property"` in v0282. These pages existed before the tagging system.

### Family (131 content pages) ✅ Largest cluster
Full branch coverage: early-years/childcare, school-stage/education, household scaling, aging-parents branch (24 sub-topics: financial, protection/medical, housing, caregiving, health/condition support, legal/estate). 14 calculators.

### Protection/Insurance (24 content pages) ✅ Mature
Full coverage: hospitalisation, life insurance, CI, disability income, accident, hospital cash, bridge pages for all major life events.

### Investing/Liquidity (43 content pages) 🟡 Growing
Three layers: liquidity foundation (14 pages) + voluntary investing entry (4 pages: CPF OA, SRS, RSP vs lump sum, how much to invest) + investing vehicles / conservative parking / tax-wrapper comparisons (14 pages: CPF SA top-up, SSBs, index fund investing, t-bills vs SSBs, SSBs vs fixed deposit, cash management account vs SSBs, SRS vs CPF SA top-up, CPF SA top-up vs pay down mortgage, SRS vs pay down mortgage, SRS vs CPF OA investment, CPF SA top-up vs CPF OA investment, cash buffer vs SRS, cash buffer vs CPF SA top-up, cash buffer vs CPF OA investment, SRS vs index fund investing, CPF OA investment vs index fund investing, CPF SA top-up vs index fund investing) + allocation tools (2 pages: surplus cash allocation calculator, retirement income layering calculator) + retirement-income comparisons (5 pages: CPF LIFE vs dividend portfolio, CPF LIFE vs SSB ladder, SRS withdrawal order vs tax smoothing, CPF LIFE Standard vs Escalating Plan, sell units vs live off dividends in retirement) + retirement implementation planning (1 page: how much cash bucket before CPF LIFE).

### Calculators (39 pages) ✅ | Comparisons (60 pages) ✅

---

## 9. Version History

| Version | Work |
|---------|------|
| v0175–v0237 | Transport and Property branches; Family/Protection/Investing cluster launches |
| v0238–v0263 | Family aging-parents branch (all 24 sub-topics); internal linking; schema |
| v0264–v0277 | Family aging-parents calculators (14); housing/location/co-residence/liquidity branches |
| v0292 | Add retirement housing-equity bridge bundle (sell home and rent in retirement vs stay put, right-size home vs keep home and draw from portfolio, use housing equity vs preserve home asset in retirement); refresh property hub, comparisons hub, SITE index, featured data, sitemap, and brief. |
| v0291 | Fix featured-data omission for retirement income layering calculator; add retirement implementation bundle (CPF LIFE Standard vs Escalating Plan, sell units vs live off dividends in retirement, how much cash bucket before CPF LIFE); refresh investing hub, comparisons hub, SITE index, featured data, sitemap, and brief. |
| v0290 | Repair v0289 retirement-income integration: expand 3 retirement-income comparison pages above threshold, wire them into investing hub, comparisons hub, SITE index, and featured data; add retirement income layering calculator; patch generate-featured.py first_seen logic; regenerate sitemap and featured data. |
| v0289 | Add retirement-income transition bundle (CPF LIFE vs dividend portfolio, CPF LIFE vs SSB ladder, SRS withdrawal order vs tax smoothing). |
| v0288 | Fix cash-buffer vs CPF SA top-up depth shortfall; add wrapper-vs-taxable investing bridge bundle (SRS vs index fund investing, CPF OA investment vs index fund investing, CPF SA top-up vs index fund investing) |
| v0287 | Investing bridge bundle: added cash buffer vs SRS, cash buffer vs CPF SA top-up, and cash buffer vs CPF OA investment; refreshed investing hub, comparisons hub, inbound links, SITE index, featured data, sitemap, and brief. |
| v0286 | Fixed a live property hub duplication block appended below the footer; added the surplus cash allocation calculator plus SRS vs CPF OA investment and CPF SA top-up vs CPF OA investment; refreshed investing hub, calculators hub, comparisons hub, SITE index, featured data, sitemap, and brief. |
| v0285 | Investing bundle: fixed the word-count shortfall on cash management account vs SSBs; added SRS vs CPF SA top-up, CPF SA top-up vs pay down mortgage, and SRS vs pay down mortgage; refreshed investing hub, comparisons hub, SITE index, featured data, and sitemap. |
| v0278 | Hub user flow: Start at position 1 on all hubs; jump nav; cross-sub-topic links; schema drift patch; search boost |
| v0278.1 | featured.json new[] fix: page_registry + first_seen sorting; family hub headings renamed |
| v0279 | Comparisons hub repair; Protection hub reordered; Homepage Family journey updated |
| v0280 | UX consistency: family hub compact grid; all 5 hubs Start at position 1; calculator descriptions; homepage aging-parents card |
| v0280.1 | Project brief rebuilt (683→360 lines); generators run |
| v0281 | Investing cluster deepened (4 pages: CPF OA, SRS, RSP, how much to invest); diversity cap in generator; start-here Family card sub-paths; comparisons jump nav |
| v0282 | INCIDENT — see Section 15 for full post-mortem |
| v0282-hotfix | includes.js rebuilt from v0280 base; protection.pillars verified identical |
| v0282.2 | Emergency restore: 64 empty property pages restored from v0280 backup with og:cluster tags; 3 orphans fixed; brief restored; sitemap 487 URLs; featured.json 314 pages |
| v0283 | 4 build items: (1) Property hub jump nav — anchor IDs + pill nav for all 15 branch sections; (2) Investing cluster 3 new pages — CPF SA top-up, Singapore Savings Bonds, index fund investing; (3) Protection — life insurance sizing calculator with full needs-based JS calc; (4) Brief updated with v0282 incident history; 11 remaining empty files from v0282 restored; sitemap 491 URLs; featured.json 317 pages (investing 21) |
| v0283.2 | Sweep fixes: 4 v0283 new pages added to SITE search index (cpf-sa-top-up, singapore-savings-bonds, index-fund-investing, life-insurance-calculator); 9 comparison-tagged pages added to comparisons hub (6 property: valuation-vs-asking-price, progressive-payment, lower-asking-price, lease-renewal, gross-vs-net-rental-yield, joint-tenancy-vs-tenancy-in-common; 3 family: stay-at-home-vs-infantcare, supervision-vs-independent-living, better-lighting-vs-old-routines); generators run |
| v0284 | Investing cluster deepening bundle: added 3 conservative parking comparison pages (t-bills-vs-singapore-savings-bonds, singapore-savings-bonds-vs-fixed-deposit, cash-management-account-vs-singapore-savings-bonds); fixed 4 broken links in comparisons hub; added manual hub links and SITE index entries; generators run |
| v0284.1 | Fix: 3 new investing pages (cash-management-account-vs-ssb, ssb-vs-fixed-deposit, t-bills-vs-ssb) were invisible in homepage new[] and investing hub — root cause: page_registry first_seen dates matched existing v0283 pages so diversity cap excluded them; fixed by setting first_seen and Last Updated to 2026-03-24 (one day ahead); featured.json regenerated |

---

## 10. SEO Status (as of v0282.2)

- ✅ Canonical tags, sitemap (487 URLs), FAQPage schema, Article schema (~268 pages)
- ✅ `dateModified` current, `og:cluster` + `og:subtopic` on all content pages
- ✅ Aging-parent hub pages +12 search boost in scoreResult()
- ✅ Life insurance sizing calculator added (protection cluster)
- ⚠️ HowTo schema: 0 pages (opportunistic)
- ⚠️ Some `property=` vs `name=` inconsistency on og meta tags

---

## 11. Publishing Pace & Working Style

- No fixed cadence; careful, systematic, conservative
- Cluster-level thinking — always think in branches
- Cannibalisation check required before any new page
- Do not open new branches randomly

---

## 12. Division of Labour

- **ChatGPT:** content expansion (new pages, cluster deepening)
- **Claude:** sweeps, fixes, schema, generators, UX enhancements
- Claude does not propose new content pages

---

## 13. Working Preferences & Session Conventions

### Bundle size & pace
- 3–5 new pages + scoped fixes per session; hotfixes allowed separately

### Recommendation style
- One concrete recommendation; run audit first; prefer depth over breadth

### Audit discipline
- Always verify against uploaded source before making claims
- False positives: `References (starting points)`, `Sources & references`, hub pages

### includes.js discipline
- Never regenerate from scratch; `node --check` after every edit
- Never drop: 6 SITE cluster entries, URL scoring, emailCaptureUrl, _hasCalc, _hubByCluster
- SITE block rule: always scope modifications to `const SITE = {` boundaries

### Output format
- Changed files only; always include: what changed, validation summary, commit message
- State plainly if something is not compliant

### Tone — Practical, direct, low-drama. No fluff.

---

## 14. How to Start a Session

**Any AI — first thing in a build session:**
1. Read this brief fully
2. Run post-push audit
3. Report findings
4. Propose next bundle with cannibalisation mapping

**Session types:** Strategy (brief only) | Build (brief + zip) | Audit (brief + zip)

---

## 15. Critical Safety Rules (Added After v0282 Incident — NEVER SKIP)

### What happened in v0282
Two separate bugs caused cascading site-wide damage:

**Bug 1 — Empty file writes:** A script added `og:cluster` tags to 90 property pages using
`open(path,'w').write(new_c)` in a loop. When content was accidentally empty or the write
partially failed, it silently produced 0-byte files. **64 pages went completely blank on GitHub.**
The site returned 200 OK with empty bodies for all affected pages.

**Bug 2 — Wrong SITE block targeting:** A dedup script searched for `\n    property:` in the
full includes.js file to find the property cluster. That string appears earlier in a nav routing
object, not in `const SITE`. The script ran on the wrong object, rebuilding protection.pillars
with 13 entries instead of the correct 16. **This broke header/footer injection site-wide.**

### Rule 1 — Validate every file write

```python
# Before writing: assert the new content is valid
assert len(new_content) > 100, f"Content too short after modification: {fn}"
assert '<html' in new_content, f"Missing <html> tag: {fn}"
assert 'site-header' in new_content, f"Missing site-header: {fn}"

# After writing: assert the file is not empty
open(path, 'w').write(new_content)
written_size = os.path.getsize(path)
assert written_size > 0, f"FILE WRITE PRODUCED EMPTY FILE: {path}"
```

### Rule 2 — Scope all includes.js operations to const SITE block

```python
# ALWAYS find SITE boundaries first
site_start = js.find('const SITE = {')
site_end = find_matching_brace(js, site_start)
# ONLY operate within site_block, never in full js
site_block = js[site_start:site_end+1]
```

### Rule 3 — Validate includes.js structural integrity after every modification

After any includes.js change, verify these counts have not changed from baseline:
- `protection.pillars`: must remain at original count (check before + after)
- The string `[OwnershipGuide] includes.js v` must still exist
- `node --check` must pass

### Rule 4 — Mandatory pre-package validation

```python
# This check MUST run before creating any zip
for fn in package_files:
    assert os.path.getsize(fn) > 0, f"EMPTY FILE — DO NOT SHIP: {fn}"
    if fn.endswith('.html'):
        c = open(fn).read()
        assert '<html' in c and 'site-header' in c, f"BROKEN HTML: {fn}"
print(f"Package validation passed: {len(package_files)} files, all non-empty")
```

### Rule 5 — Never bulk-modify more than 5 files without dry-run verification

If a script will touch more than 5 files:
1. Run in dry-run mode first (print what WOULD change, do not write)
2. Spot-check 3 sample files manually before proceeding
3. Write to staging area first, verify, then copy to repo
