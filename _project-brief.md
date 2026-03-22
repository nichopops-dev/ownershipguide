# Ownership Guide — Master Project Brief
> Single source of truth for all Claude and ChatGPT sessions.
> Last updated: March 2026 · Based on repo v0280

---

## 1. What This Site Is

**Ownership Guide** (ownershipguide.com) is a decision library for expensive, long-lived financial decisions — cars, property, family costs, protection, and investing/liquidity.

**Core positioning:** "Make high-cost decisions with clarity." Not a news site, not instalment-only. Focuses on total exposure, liquidity strain, and the frictions that break plans after the headline number looks affordable.

**Brand type:** Faceless editorial. No named author, no personal brand.

### Geographic scope
- **Now:** Singapore-first. All content is Singapore-specific.
- **Eventually:** Global expansion using a universal framework + country-specific data layer. Decision logic built once; data layer changes per country. Do not architect for this yet — build SG depth first.

### Topic scope
- **Now:** Transport, Property, Family/Children, Protection/Insurance, Investing/Liquidity
- **Future clusters:** Luxury assets (watches, yachts, art), other wealth ownership topics
- Site name "Ownership Guide" is deliberately non-restrictive

### Monetisation (in order)
1. **Google AdSense** — approved and live (Auto Ads). Primary current revenue.
2. **Affiliate/referral** — not started. Natural future layer: insurance comparison, mortgage brokers, car loans.
3. **Sponsored content** — possible later.

---

## 2. Technical Stack

**Stack:** Static HTML, no CMS, no React, no build pipeline. Pure HTML + CSS + vanilla JS.
**Hosting:** GitHub Pages.
**Current version:** v0280

### Key files

| File | Purpose |
|------|---------|
| `includes.js` | ⚠️ Central nervous system — ALL shared behaviour. Never regenerate from scratch. See Section 3. |
| `styles.css` | Global stylesheet |
| `index.html` | Homepage |
| `sitemap.xml` | 483 URLs — regenerate with `python3 generate-sitemap.py` each session |
| `featured.json` | Hub + homepage dynamic data. Structure: `cluster_pages` (all pages per cluster sorted by date), `new[]` (10 most recent — sorted by `first_seen` from `page_registry`, NOT last_updated), `popular[]` (manual), `pinned` (dict keyed by cluster — NEVER flatten to list), `page_registry` (tracks first_seen per page). Regenerate with `python3 generate-featured.py` each session. Do not add to sitemap. |
| `generate-sitemap.py` | Regenerates sitemap.xml from actual files. Run from repo root. |
| `generate-featured.py` | Regenerates featured.json. Preserves `pinned` dict and `page_registry`. Run from repo root. |
| `_project-brief.md` | This file. Do not rename, move, delete, deploy, or add to sitemap. |
| `_email-capture-setup.md` | One-time Google Sheets setup. Keep locally — do not upload to GitHub. |

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
<meta name="og:subtopic" content="comparison|calculator|planning|...">
```

---

## 3. includes.js — Handle With Extreme Care

**Breaking this file takes down the entire site silently.** After any edit, run `node --check includes.js`.

### What it controls
- Header/footer injection
- GA4 analytics (G-RH8YDW5LFP)
- AdSense Auto Ads (ca-pub-8718234605112874)
- Auto-related link injection
- "Next steps" decision path module (with `_hasCalc` / `_hubByCluster` constants)
- Back-to-cluster links
- Email capture form
- Topics nav dropdown hover behaviour (`initNavDropdownHover`)
- Search scoring (`scoreResult()` with pillar boost, aging-parents hub boost)

### Critical settings — never change these
```javascript
enableAdSenseAutoAds: true        // Auto Ads live — DO NOT CHANGE
enableAutoAdSlots: false          // ⚠️ INTENTIONAL — do not change
emailCaptureUrl: "https://script.google.com/macros/s/AKfycbymgo2k_2loWUwDzuCbtEDOMEYeGzQC1FRj7zOYVl5GG5Sv4C2f82oH4QEnnHPuu7s/exec"
```

### Things that must always be preserved
- All 6 SITE cluster entries: `transport`, `property`, `financing`, `family`, `protection`, `investing`
- `scoreResult()` URL scoring: lines referencing `item?.url` and `uTokens`
- `_hasCalc` and `_hubByCluster` constants in the decision-path module
- `emailCaptureUrl` value exactly as-is

### Hub dynamic scripts — critical pattern
Each cluster hub page accesses `pinned` using **dict access**: `data.pinned['family']`. Never change this to `data.pinned.filter(...)` — the flat-list filter pattern silently returns nothing and breaks hub sections.

---

## 4. Core Workflow Rules

1. **Read source first.** Always audit before recommending or changing anything.
2. **Every version returns:** changed-files-only zip + commit message
3. **Standard session order:** run sweep → fix findings → run generators → enhancements → package
4. **Cannibalisation check** before proposing any new pages
5. **No breaking changes**
6. **Prefer meaningful bundles** (3–5 pages + scoped fixes); hotfixes allowed
7. **Full-file replacements** preferred over partial edits

### Standard sweep checklist (every session)
- Broken internal links
- Duplicate Last updated (except `editorial-policy.html`, `privacy-policy.html`)
- Missing References section (`References (starting points)` and `Sources & references` are valid — do not flag)
- Missing `<div id="auto-related"></div>` (hub pages intentionally excluded)
- Short pages (<1,450w)
- Invalid JSON-LD schema
- Orphan pages (0 inbound links)
- Duplicate References h2 sections
- includes.js syntax (`node --check`)
- New pages in SITE search index
- New pages in related graph
- Hub pages updated (transport, property, family, protection, investing, financing, calculators, comparisons)
- featured.json: `pinned` must be a dict keyed by cluster (not a flat list)
- Hub scripts: must use `data.pinned['cluster']` dict access (not `.filter()`)

### Generator commands (run every session)
```bash
python3 generate-sitemap.py      # from repo root
python3 generate-featured.py     # from repo root
```

---

## 5. Global Page Standards

### Every content page must have
- Scenario library or decision framework
- FAQ section + FAQPage JSON-LD schema
- Article JSON-LD schema on pillar/framework pages (headline must not contain unescaped double-quotes)
- References section (last substantive section before Last updated line)
- `Last updated: DD Mon YYYY`
- `og:cluster` and `og:subtopic` meta tags
- `<div id="auto-related"></div>` immediately before the References section

### Content standards
- Articles: 1,500–2,000 words minimum; no padding, no repeated ideas
- Calculators: tool-first; 1,200+ words of support content; never turn into essays
- Tone: direct, analytical, clinical — treats reader as an intelligent adult

### Known false positives (do not flag)
- `editorial-policy.html` and `privacy-policy.html` — multiple Last updated by design
- Hub pages — intentionally excluded from auto-related and short-page checks
- `References (starting points)` or `Sources & references` headings — valid formats

---

## 6. Writing Style Guide

- **Tone:** Direct, analytical, slightly clinical. Not warm/friendly. Not alarmist.
- **Sentences:** Short, declarative. Frequent line breaks. Never padded.
- **Framing:** Wrong question people ask → reframe to right question → model it properly.
- **Numbers:** Always ranges, never single figures. Label as planning ranges.
- **CTAs:** Point to a specific next page. Framework → calculator → mechanics order.
- **Never:** Marketing language, promises, superlatives, false certainty.

---

## 7. Current Site Health (as of v0280)

- ✅ 477 HTML files | 428 content pages
- ✅ 0 broken internal links
- ✅ 0 orphan pages
- ✅ 0 invalid schema
- ✅ 483 sitemap URLs
- ✅ 456 pages in search index
- ✅ Article schema on ~268 pages (all eligible content pages covered)
- ✅ AdSense Auto Ads live
- ✅ GA4 tracking active
- ✅ Email capture live (writes to Google Sheet)
- ✅ Dynamic homepage + hub pages pulling from featured.json
- ✅ featured.json: `pinned` is correct dict structure, `page_registry` present
- ✅ Topics nav hover working (CSS gap fix + JS initNavDropdownHover)
- ✅ All 5 cluster hubs: "Start with the path" at position 1
- ✅ Family hub: compact 2-column grid for 22 aging-parent sub-topics (8 h2s, ~9,000px)

---

## 8. Cluster Status

### Transport (56 content pages) ✅ Very strong and broad

Full branch coverage: ownership cost, purchase/financing, lifecycle/exit/COE, transport alternatives, EV, hybrid, motorcycle (purchase, insurance, maintenance, depreciation, exit, liquidity bridges, protection bridges), used-car diligence, maintenance/servicing, post-incident/insurance, household-fit/car-type choice, aging-car economics, aging-parents transport bridges.

Key files: `car-ownership-cost.html` · `car-vs-ride-hailing-cost.html` · `motorcycle-ownership-cost-singapore.html` · `ev-vs-petrol-cost-singapore.html` + 52 more

### Property (20 content pages) ✅ Strong and broad

Full branch coverage: financing/borrowing/entry, ownership/holding cost, sell/move/execution friction, rental/landlord friction, HDB rules/grants/process, ownership structure/co-ownership, EC/route selection, unit selection/liveability, post-purchase/move-in, right-sizing/later-life, aging-parents property bridges.

Key files: `property-ownership-cost-singapore.html` · `rent-vs-buy-property-singapore.html` + 18 more

### Family (131 content pages) ✅ Largest cluster — deep and active

Full branch coverage: early-years/childcare, school-stage/supervision/education-spend, household scaling, and an extensive **aging-parents branch** covering:

*Financial/reserve:* cash buffer redesign, investing priority, burden-sharing, sibling coordination, work/career trade-offs

*Protection/medical:* first-child protection sequencing, aging-parent protection sequencing, medical-financing sequence (MediSave, CareShield, hospital cash)

*Housing/property:* living-arrangement decisions, home access, location, co-residence, housing liquidity/equity, home modifications

*Caregiving delivery:* helper vs home care, adult day care, caregiving costs, overnight supervision, appointment coordination, post-hospital transition, respite care

*Health/condition support:* cognitive decline/dementia, financial safety/scams, end-of-life/palliative, mobility/accessibility, nutrition/eating support, medication management, continence/toileting, sensory decline/hearing/vision

*Legal/estate:* legal readiness (LPA, ACP), estate readiness (wills, CPF nomination)

**Calculators (14):** caregiving cost, helper vs home care, adult day care vs home, appointment burden, overnight supervision, shared home vs two households, move parents in vs nearby, rent near vs buy near, home modifications vs relocating, walker-friendly vs wheelchair-ready, hearing/vision adjustment, medication burden, nutrition burden, continence burden

**Hub:** `family/index.html` — 8 h2 sections, compact 2-column grid for aging-parent sub-topics, jump navigation

### Protection/Insurance (24 content pages) ✅ Mature and bridge-heavy

Full coverage: hospitalisation/medical structure, life insurance, critical illness, disability income, accident cover, hospital cash, and bridge pages for: first child, second child, marriage, property upgrade, single-income household, self-employed, aging-parent support, mortgage-stage, retirement-stage, motorcycle riders.

**Hub:** `protection/index.html` — "Start with the path" at position 1

### Investing/Liquidity (14 content pages) 🟡 Growing

Coverage: emergency fund sizing, storage, sequencing (invest vs build), vs sinking fund, when to use, how to rebuild, account splitting, instant-access layering, irregular income variant, children variant, mortgage variant, pay down debt vs build, save more vs buy more insurance.

**Build rule:** Keep liquidity-first wedge. Do not expand into broader investing topics until sufficient depth.

### Calculators (38 pages) ✅
Transport (9): car vs ride-hailing, car affordability, car ownership cost, car loan, leasing vs buying, used vs new car, COE loan, EV vs petrol, COE renew vs replace
Property (14): sell→buy pipeline, upgrade/downgrade, upgrade ladder, CPF accrued interest, affordability, rent vs buy, cash to buy, sell proceeds, rent out vs sell, amortization, pay down vs invest, HDB vs bank loan, TDSR/MSR, BSD/ABSD
Family (14): 14 aging-parent caregiving and housing calculators (see Family section above)
All 31 calculators in the browse hub have one-line descriptions.

### Comparisons (52 pages) ✅
Structured in comparisons hub with 5 cluster sections. Family section has 4 sub-groups: childcare, education, aging-parent care, aging-parent housing.

---

## 9. Version History

| Version | Work |
|---------|------|
| v0175–v0204 | Transport and Property branch deepening (buy-side, sell-side, lifecycle, EV, hybrid, motorcycle branches) |
| v0205 | Family cluster launch |
| v0206–v0209 | Family early-years, care, education branches |
| v0210 | Protection cluster launch |
| v0210.1 | FAQ schema 142 pages; nav redesign with Topics dropdown |
| v0211–v0213 | Protection deepening (disability income, CI, accident, hospital cash) |
| v0214 | 5 cross-cluster bridge pages; dynamic homepage |
| v0215–v0220 | Protection sizing, comparison, and bridge expansion (18 pages) |
| v0220.1–v0220.2c | Sweep fixes; dynamic hubs; email capture live |
| v0221 | Protection bridges: mortgage-free, job-change, no-dependants |
| v0222–v0225 | Investing cluster launch + deepening (emergency fund sizing, storage, sequencing, variants) |
| v0225.1–v0225.2 | Search index fix; control-character corruption fix; FAQ cleanup |
| v0226–v0228 | Family education comparisons; Family×Property bridges; Protection×Investing bridges |
| v0233.1–v0233.2 | Interlinking consolidation; generate-sitemap.py and generate-featured.py added |
| v0234–v0235 | UX: Next Steps calculator routing fixed; Article schema 51 pages; search improvements; comparisons hub rebuilt; start-here life-stage section |
| v0236–v0237 | Motorcycle×liquidity and motorcycle×protection bridge pages |
| v0238–v0246 | Family aging-parents branch: first-child protection, protection/liquidity, housing, transport, investing/retirement, caregiving, medical-financing, work/career, burden-sharing |
| v0247 | Sweep + UX; 212 pages with Article schema; pinned[] per cluster; hub "Where to start" |
| v0248–v0261 | Family aging-parents branch deepening: legal, living-arrangement, estate, post-hospital, cognitive decline, financial safety, end-of-life, mobility, nutrition, medication, continence, sensory decline, overnight supervision, appointment coordination |
| v0262 | featured.json pinned[] repair; generate-featured.py hardened; schema fixes; 8 orphans fixed; 268 Article schema pages |
| v0263 | Internal linking density: 80 links added, 58 weak pages addressed |
| v0264–v0277 | Family aging-parents calculator layer (14 calculators); aging-parents housing/location/co-residence/liquidity branches |
| v0278 | Hub user flow: family reordered (Start at position 1, 29h2→8), jump nav; transport reordered; 16 cross-sub-topic links; Article schema dateModified patched (73 pages); start-here 3 aging-parent paths; search boost |
| v0278.1 | featured.json new[] fix: page_registry added, sorts by first_seen not last_updated; family hub headings renamed to "Aging-parent support: X" |
| v0279 | Comparisons hub: duplicate/rogue sections removed, Family restructured into 4 sub-groups; Protection hub reordered; Homepage Family journey updated |
| v0280 | UX consistency: family hub 22 boxes → compact 2-column grid; property + investing hubs reordered; calculator descriptions (31); "I am supporting aging parents" card on homepage; all 5 hubs have Start at position 1 |

---

## 10. SEO Status (as of v0280)

- ✅ Canonical tags on all pages (via includes.js)
- ✅ Sitemap at /sitemap.xml (483 URLs)
- ✅ FAQPage schema on all FAQ-bearing pages
- ✅ Article schema on ~268 pages (all eligible content pages)
- ✅ `dateModified` in Article schema kept current (patched v0278)
- ✅ "Last updated" visible on all pages (freshness signal)
- ✅ URL pattern: `{topic}-singapore.html`
- ✅ Aging-parent hub pages get +12 search boost in scoreResult()
- ⚠️ HowTo schema: 0 pages (add to checklist pages opportunistically)
- ⚠️ Some meta tag attribute order inconsistency (`name="og:cluster"` vs `property="og:cluster"`)

---

## 11. Publishing Pace & Working Style

- No fixed cadence — publish when ready
- Careful, systematic, conservative — do not rewrite good pages unnecessarily
- Cluster-level thinking — always think in branches, not isolated pages
- Cannibalisation check required before any new page proposal
- Do not open new branches randomly — every page needs a clear place in the hierarchy

---

## 12. Division of Labour

- **ChatGPT:** content expansion (new pages, cluster deepening)
- **Claude:** sweeps, structural fixes, schema, search index, generators, UX enhancements
- Claude does not propose new content pages — that is ChatGPT's job

---

## 13. Working Preferences & Session Conventions

### Bundle size & pace
- Prefer bundles of 3–5 new pages plus tightly scoped fixes
- Small hotfixes allowed; do not need to be bundled with content
- Do not create churn for the sake of activity

### Recommendation style
- One clear concrete recommendation, not a menu
- Run audit first, then recommend
- Prefer compounding depth over random breadth

### Audit discipline
- Always verify against the uploaded source before making claims
- Known false positives: `References (starting points)`, `Sources & references`, hub pages excluded from auto-related checks

### includes.js discipline
- Never regenerate from scratch
- After every edit: `node --check includes.js`
- Never drop: 6 SITE cluster entries, URL scoring, emailCaptureUrl, _hasCalc, _hubByCluster

### Output format (every session)
- Changed files only — never full repo zip
- Always include: what was done, validation summary, commit message
- State plainly if something is not fully compliant

### Tone
- Practical, direct, low-drama. No fluff.
- Treat the owner as someone who understands the site well.

---

## 14. How to Start a Session

**Any AI — first thing to do in a build session:**
1. Read this brief fully
2. Run post-push audit of uploaded source
3. Check: broken links, duplicate Last updated, schema, orphans, hub coverage, includes.js, featured.json structure
4. Report findings
5. Propose next bundle with cannibalisation mapping

**Strategy session** (no files) → Paste this brief. Ask question.
**Build session** (adding pages) → Paste brief + attach zip + state cluster, branch, goal.
**Audit session** → Paste brief + attach zip + ask for health check.
