# Ownership Guide — Master Project Brief
> Single source of truth for all Claude and ChatGPT sessions.
> Last updated: 13 Apr 2026 · Based on repo v0347

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
**Current version:** v0347
**Recent update:** v0347 SEO infrastructure bundle — added `og:image` + `og:image:width` + `og:image:height` meta tags to all 609 HTML pages (cluster-specific images: transport, property, family, protection, investing, default), fixed missing `defer` attribute on `includes.js` script tags across 257 pages, added `.nojekyll` file to repo root, and generated 6 branded OG share images (1200×630px PNGs).

### Version history
- **v0347** — SEO infrastructure bundle: added `og:image`, `og:image:width`, `og:image:height` meta tags to all 609 HTML pages with cluster-specific branded images (og-transport.png, og-property.png, og-family.png, og-protection.png, og-investing.png, og-default.png); fixed missing `defer=""` attribute on `includes.js` script tags across 257 pages that were render-blocking; added `.nojekyll` file to repo root for cleaner GitHub Pages builds. No new URLs added. No structural changes to includes.js or featured.json.
- **v0346** — completed a metadata integrity cleanup for the three sibling family school-location bridge calculators by raising their `featured.json` `page_registry.first_seen` dates above newer family entries already in the cluster, then regenerating `featured.json` + `sitemap.xml`.
- **v0345** — added three sibling family school-location bridge calculators — `move-closer-to-school-or-keep-home-and-own-a-car-cost-calculator-singapore.html`, `buy-family-car-or-move-closer-to-work-and-school-first-cost-calculator-singapore.html`, and `move-near-school-or-keep-bigger-home-first-cost-calculator-singapore.html` — refreshed `family/index.html`, `calculators/index.html`, and adjacent school-location bridge pages with explicit inbound links, updated touched pages to the current date, and regenerated `featured.json` + `sitemap.xml`.
- **v0344** — added the sibling family framework page `how-to-choose-school-location-without-overbuying-home-or-second-car-capacity-singapore.html`, refreshed `family/index.html` plus adjacent school-location bridge pages with explicit inbound links, updated touched pages to the current date, and regenerated `featured.json` + `sitemap.xml`.
- **v0343** — added the family framework page `how-to-choose-childcare-location-without-overbuying-home-or-second-car-capacity-singapore.html`, refreshed `family/index.html` plus adjacent childcare-location bridge pages with explicit inbound links, updated touched pages to the current date, and regenerated `featured.json` + `sitemap.xml`.
- **v0342** — expanded the three family cross-cluster bridge calculators above the 1,500-word floor, corrected the broken route-calculation logic on `second-car-or-childcare-near-work-cost-calculator-singapore.html`, and refreshed the project brief.
- **v0341** — added three family cross-cluster bridge calculators — `move-near-childcare-or-keep-home-and-own-a-car-cost-calculator-singapore.html`, `bigger-home-farther-out-vs-smaller-home-near-childcare-cost-calculator-singapore.html`, and `second-car-or-childcare-near-work-cost-calculator-singapore.html` — and refreshed family/calculators hubs, contextual inbound links, SITE index, featured data, and sitemap.
- **v0340** — added three family cross-cluster bridge pages — `move-near-childcare-or-keep-home-and-own-a-car-singapore.html`, `bigger-home-farther-out-vs-smaller-home-near-childcare-singapore.html`, and `second-car-or-childcare-near-work-singapore.html` — and refreshed family/comparisons hubs, contextual inbound links, SITE index, featured data, and sitemap.
- **v0339** — added three family childcare calculator pages — `childcare-vs-helper-cost-calculator-singapore.html`, `childcare-near-home-vs-near-work-cost-calculator-singapore.html`, and `grandparent-care-vs-paid-care-cost-calculator-singapore.html` — and refreshed family/calculators hubs, contextual inbound links, SITE index, featured data, and sitemap.
- **v0338** — added four family childcare operating-model pages — `childcare-vs-grandparent-care-singapore.html`, `childcare-vs-helper-at-home-singapore.html`, `full-day-childcare-vs-half-day-preschool-singapore.html`, and `childcare-near-home-vs-near-work-singapore.html` — and refreshed family/comparisons hubs, contextual inbound links, SITE index, featured data, and sitemap.
- **v0337** — completed the remaining `featured.json` integrity cleanup by canonicalising seven lingering bare-vs-`.html` `page_registry` duplicates to `.html` keys, hardening `generate-featured.py` to merge legacy bare keys automatically, and regenerating `featured.json` + `sitemap.xml`.
- **v0336** — hardened `featured.json` recency surfaces by removing slash/bare `page_registry` duplicates, canonicalising the four v0335 investing-page entries to bare keys with clean first_seen dates, and regenerating `featured.json` + `sitemap.xml`.
- **v0335** — added four investing-led bridge pages linking SSB reserve-building to protection priorities and index-fund compounding to family-obligation trade-offs; refreshed investing/comparisons hubs, contextual inbound links, SITE index, featured data, and sitemap.
- **v0334** — expanded 12 remaining legacy pages above the 1,500-word floor and refreshed touched pages to the current date without adding new URLs.
- **v0333** — repaired 8 missing `SITE` search-index entries, expanded 9 thin pages above the floor, normalised `featured.json` `page_registry`, and regenerated `sitemap.xml` + `featured.json`.
- **v0330** — fixed the missing SITE index entry for `buy-family-car-or-fund-helper-first` and added the parent-proximity/helper, home-upgrade/elder-flexibility, child-enrichment/parents-medical-support, and family-car/location bridge bundle.

### Key files

| File | Purpose |
|------|---------|
| `includes.js` | ⚠️ Central nervous system — ALL shared behaviour. Never regenerate from scratch. See Section 3. |
| `styles.css` | Global stylesheet |
| `index.html` | Homepage |
| `sitemap.xml` | 500 URLs — regenerate with `python3 generate-sitemap.py` each session |
| `featured.json` | Hub + homepage dynamic data. Keys: `cluster_pages`, `new[]` (sorted by `first_seen` from `page_registry`, NOT last_updated), `popular[]`, `pinned` (dict keyed by cluster — NEVER flatten to list), `page_registry` (canonical `.html` keys only). Regenerate with `python3 generate-featured.py` each session. |
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

## 7. Current Site Health (as of v0314)

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

### Transport (57 content pages) ✅ Very strong
**v0334 hardening note:** lifted `5-year-coe-renewal-worth-it-singapore.html`, `is-it-worth-owning-a-car-singapore.html`, `comprehensive-vs-third-party-car-insurance-singapore.html`, `self-charging-hybrid-vs-plug-in-hybrid-singapore.html`, `car-affordability-calculator-singapore.html`, `coe-renewal-worth-it-singapore.html`, and `how-much-cash-to-buy-car-singapore.html` above the 1,500-word floor with tighter decision guidance rather than new branch expansion.
**v0333 repair note:** restored SITE search-index coverage for `balloon-loan-vs-normal-car-loan-singapore.html` and `car-loan-vs-cash-singapore.html`, and deepened five near-threshold transport pages — `when-cheap-car-insurance-becomes-false-savings-singapore.html`, `car-leasing-vs-buying-singapore.html`, `car-loan-calculator-singapore.html`, `how-much-salary-to-own-a-car-singapore.html`, and `when-to-upgrade-car-with-outstanding-loan-singapore.html`.
**v0329 bridge note:** added `buy-family-car-or-fund-helper-first-singapore.html`, a transport-led bridge for households deciding whether the next operational upgrade should be mobility control or extra household labour.

**v0330 bridge note:** added `buy-family-car-or-move-closer-to-work-and-school-first-singapore.html`, a transport-led bridge for households deciding whether the cleaner fix is mobility control or a better home base.


**v0321 bridge note:** added `buy-family-car-or-increase-hospitalisation-rider-first-singapore.html`, a transport-led bridge for households deciding whether the next weak layer is family mobility or medical-cost protection.
**v0320 bridge note:** added `buy-family-car-or-build-down-payment-fund-first-singapore.html`, a transport-led bridge for households deciding whether family mobility relief should come before first-home capital formation.
Full branch coverage: ownership cost, purchase/financing, lifecycle/exit/COE, alternatives, EV, hybrid, motorcycle (all branches), used-car diligence, maintenance, post-incident, car-type, aging-car, aging-parents bridges.
**v0297 repair note:** discoverability bundle reinforced five existing transport decision pages — `balloon-loan-vs-normal-car-loan-singapore.html`, `car-loan-vs-cash-singapore.html`, `buy-used-car-from-dealer-vs-direct-owner-singapore.html`, `trade-in-vs-direct-sale-car-singapore.html`, and `consignment-vs-dealer-sale-car-singapore.html` — via stronger hub surfacing and manual inbound links from adjacent transport execution pages.

**v0303 note:** transport calculator/mechanics hardening bundle deepened five existing pages — `car-vs-ride-hailing-cost.html`, `coe-cost-singapore.html`, `car-maintenance-repair-cost-singapore.html`, `own-car-vs-public-transport-singapore.html`, and `erp-cost-singapore.html` — and added contextual inbound links from adjacent ownership-cost, timing, car-selection, financing, car-sharing, and depreciation pages.

**v0305 note:** transport cost-and-insurance hardening bundle deepened five existing pages — `buying-car-financial-mistake-singapore.html`, `car-leasing-vs-buying-calculator-singapore.html`, `used-car-vs-new-car-calculator-singapore.html`, `named-driver-vs-any-authorised-driver-car-insurance-singapore.html`, and `high-excess-vs-low-excess-car-insurance-singapore.html` — and added contextual inbound links from adjacent ownership-cost, vehicle-selection, used-car route, and insurance-structure pages.

**v0309 bridge note:** added `buy-a-car-or-upgrade-home-first-singapore.html`, a transport-led cross-cluster bridge for households choosing between vehicle ownership and a home upgrade.

**v0308 note:** transport straggler cleanup bundle deepened five existing pages — `ev-vs-petrol-calculator-singapore.html`, `car-vs-ride-hailing-calculator.html`, `no-claim-discount-ncd-singapore.html`, `parking-cost-singapore.html`, and `coe-bidding-strategy-singapore.html` — and added contextual inbound links from adjacent car-selection, ownership-cost, insurance-cost, insurance-claims, parking-budget, timing, and mode-choice pages.

**v0311 bridge note:** added `move-closer-to-school-or-keep-home-and-own-a-car-singapore.html`, a transport-adjacent family bridge for households comparing location change against vehicle ownership as the cleaner school-logistics fix.

**v0315 bridge note:** added `buy-family-car-or-increase-term-life-insurance-first-singapore.html`, a transport-led bridge for households deciding whether the more dangerous missing layer is daily mobility relief or family income protection.
**v0312 metadata note:** refreshed `featured.json` `page_registry` dates for `move-closer-to-school-or-keep-home-and-own-a-car-singapore.html` and `buy-bigger-home-or-fund-helper-first-singapore.html` so family hub recent surfaces and `new[]` ordering treat the v0311 bridge pages as genuinely newest family additions.


**v0324 note:** protection deepening bundle added four new comparison pages — `accident-insurance-vs-term-life-insurance-singapore.html`, `term-life-insurance-vs-hospitalisation-rider-singapore.html`, `disability-income-insurance-vs-hospitalisation-rider-singapore.html`, and `hospital-cash-vs-hospitalisation-rider-singapore.html` — and strengthened hub surfacing plus manual inbound links from adjacent protection pages.

**v0334 hardening note:** strengthened `upgrade-downgrade-property-calculator-singapore.html` and `cpf-accrued-interest-singapore.html` above the floor without changing site structure.

**v0341 bridge-calculator note:** added `move-near-childcare-or-keep-home-and-own-a-car-cost-calculator-singapore.html`, `bigger-home-farther-out-vs-smaller-home-near-childcare-cost-calculator-singapore.html`, and `second-car-or-childcare-near-work-cost-calculator-singapore.html`, extending the childcare location bridge branch with tool-first monthly trade-off calculators.

**v0345 bridge-calculator note:** added `move-closer-to-school-or-keep-home-and-own-a-car-cost-calculator-singapore.html`, `buy-family-car-or-move-closer-to-work-and-school-first-cost-calculator-singapore.html`, and `move-near-school-or-keep-bigger-home-first-cost-calculator-singapore.html`, extending the sibling school-location bridge branch with tool-first monthly trade-off calculators.

### Property (119 content pages) ✅ Very strong
**v0333 repair note:** restored SITE search-index coverage for `pay-down-home-loan-or-help-aging-parents-now-singapore.html`, refreshed `cpf-accrued-interest-calculator-singapore.html` above the content floor, and normalised property-related `page_registry` drift without touching hub dynamic logic.
**v0329 bridge note:** added `build-down-payment-fund-or-pay-down-high-interest-debt-first-singapore.html`, a property-led bridge for households deciding whether housing-entry capital or debt cleanup should move first.

**v0330 bridge note:** added `upgrade-home-now-or-keep-more-flexibility-for-aging-parents-singapore.html`, a property-led bridge for households deciding whether visible housing improvement should wait behind optionality for elder-support demands.

Full branch coverage: financing/borrowing, ownership/holding cost, sell/move/execution, rental/landlord, HDB rules/grants/process, ownership structure, EC/route selection, unit selection/liveability, post-purchase/move-in, right-sizing/later-life, aging-parents bridges, and retirement housing-equity bridge pages.
**Note:** 90 pages were backfilled with `og:cluster="property"` in v0282. These pages existed before the tagging system.

**v0304 note:** property borrowing-and-transaction hardening bundle deepened five existing pages — `reduce-tenure-vs-lower-monthly-instalment-singapore.html`, `what-to-do-when-home-loan-lock-in-ends-singapore.html`, `hdb-income-ceiling-singapore.html`, `family-grant-singapore.html`, and `proximity-housing-grant-phg-singapore.html` — and added contextual inbound links from adjacent refinancing, HDB loan, grant, family-ownership, and lock-in penalty pages.

**v0306 note:** property execution-and-mortgage cleanup bundle deepened five existing pages — `mortgage-amortization-calculator-singapore.html`, `cpf-oa-vs-cash-for-home-loan-singapore.html`, `what-documents-to-prepare-before-selling-property-singapore.html`, `sell-property-cost-singapore.html`, and `cash-over-valuation-cov-singapore.html` — and added contextual inbound links from adjacent valuation, cash-needed, listing-readiness, sale-proceeds, pipeline, mortgage-interest, and ownership-cost pages.

**v0309 bridge note:** added `pay-down-home-loan-or-build-child-education-fund-singapore.html`, a property-led cross-cluster bridge for households weighing mortgage resilience against child-education funding.

**v0307 note:** property equity-and-yield cleanup bundle deepened five existing pages — `cpf-accrued-interest-calculator-singapore.html`, `cpf-accrued-interest-singapore.html`, `rent-out-vs-sell-calculator-singapore.html`, `gross-vs-net-rental-yield-singapore.html`, and `should-i-buy-property-now-or-wait-singapore.html` — and added contextual inbound links from adjacent sale-proceeds, sale-cost, hold-vs-sell, ownership-cost, affordability, and rent-vs-buy pages.

**v0311 bridge note:** added `pay-down-home-loan-or-help-aging-parents-now-singapore.html`, a property-led cross-cluster bridge for households deciding between mortgage improvement and immediate elder-support funding.

**v0321 bridge note:** added `build-down-payment-fund-or-help-parents-with-housing-costs-first-singapore.html`, a property-led bridge for households weighing their own housing-entry capital against immediate support for parents’ housing strain.
**v0315 bridge note:** added `buy-bigger-home-or-increase-index-fund-investing-first-singapore.html`, a property-led cross-cluster bridge for households comparing owner-occupier housing upgrades against continued diversified investing.
**v0312 metadata note:** refreshed `featured.json` `page_registry` date for `pay-down-home-loan-or-help-aging-parents-now-singapore.html` so property recent surfaces and `new[]` ordering treat it as the newest property addition from the v0311 bridge wave.

**v0302 note:** property mechanics hardening bundle deepened five existing pages — `pay-down-mortgage-vs-invest-calculator-singapore.html`, `how-having-a-child-affects-tdsr-borrowing-capacity-singapore.html`, `mortgage-interest-cost-singapore.html`, `tdsr-msr-singapore.html`, and `bsd-absd-singapore.html` — and added contextual inbound links from adjacent affordability, refinancing, ownership-cost, family-budget, and stamp-duty calculator pages.

**v0334 hardening note:** lifted `how-much-does-preschool-cost-singapore.html` above the floor with more explicit all-in household cost framing.

## 8. Cluster Status

### Family (158 content pages) ✅ Largest cluster
**v0344 framework note:** added `how-to-choose-school-location-without-overbuying-home-or-second-car-capacity-singapore.html`, a school-stage sequencing page that sits above the family location-vs-car branch and links back into the core school bridge comparisons.
**v0343 framework note:** added `how-to-choose-childcare-location-without-overbuying-home-or-second-car-capacity-singapore.html`, a top-level sequencing framework tying together childcare anchor choice, home location, space trade-offs, and second-car decisions before households commit to the wrong high-cost fix.

**v0340 bridge note:** added `move-near-childcare-or-keep-home-and-own-a-car-singapore.html`, `bigger-home-farther-out-vs-smaller-home-near-childcare-singapore.html`, and `second-car-or-childcare-near-work-singapore.html`, a family-led bridge bundle linking childcare-location choices to housing footprint and transport-capacity trade-offs.

**v0339 calculator note:** added `childcare-vs-helper-cost-calculator-singapore.html`, `childcare-near-home-vs-near-work-cost-calculator-singapore.html`, and `grandparent-care-vs-paid-care-cost-calculator-singapore.html` to convert the early-years childcare operating-model branch into tool-first monthly planning pages.

**v0338 operating-model note:** added `childcare-vs-grandparent-care-singapore.html`, `childcare-vs-helper-at-home-singapore.html`, `full-day-childcare-vs-half-day-preschool-singapore.html`, and `childcare-near-home-vs-near-work-singapore.html` to deepen the early-years family cluster around sustainable childcare setup decisions rather than fee tables alone.

**v0330 bridge note:** added `move-near-parents-or-pay-for-helper-first-singapore.html` and `fund-child-enrichment-or-support-parents-medical-costs-first-singapore.html`, extending the family cluster into parent-support location decisions and intergenerational spend sequencing.

**v0321 bridge note:** added `move-near-school-or-pay-for-student-care-first-singapore.html`, a family-led bridge for households choosing between location relief and paid after-school coverage.

**v0325 note:** family deepening bundle added four new comparison pages — `preschool-vs-stay-at-home-parent-singapore.html`, `student-care-vs-reduce-work-hours-singapore.html`, `enrichment-classes-vs-bigger-cash-buffer-after-first-child-singapore.html`, and `have-a-second-child-now-or-build-bigger-cash-buffer-first-singapore.html` — and strengthened hub surfacing plus manual inbound links from adjacent child-cost, student-care, enrichment, and second-child planning pages.
**v0326 note:** family hardening bundle deepened `preschool-vs-stay-at-home-parent-singapore.html`, `student-care-vs-reduce-work-hours-singapore.html`, `enrichment-classes-vs-bigger-cash-buffer-after-first-child-singapore.html`, and `have-a-second-child-now-or-build-bigger-cash-buffer-first-singapore.html`, and added all four pages to `comparisons/index.html` for proper comparison-hub discovery.
**v0320 bridge note:** added `move-near-school-or-keep-bigger-home-first-singapore.html`, a family-led bridge for households choosing between school-location convenience and more home space.
Full branch coverage: early-years/childcare, school-stage/education, household scaling, aging-parents branch (24 sub-topics: financial, protection/medical, housing, caregiving, health/condition support, legal/estate) plus care-execution bridge pages linking caregiving delivery, home-help funding, caregiver-income protection, reserve design, caregiver-capacity modelling, and transport-versus-home-support trade-offs. 18 calculators.

**v0309 bridge note:** added `second-car-or-helper-when-supporting-aging-parents-singapore.html`, a family-led cross-cluster bridge for households deciding whether the real elder-support bottleneck is movement or in-home help.

**v0310 note:** hardened `second-car-or-helper-when-supporting-aging-parents-singapore.html` above threshold and added follow-through inbound links from adjacent aging-parent transport and care-delivery pages.

**v0311 bridge note:** added `buy-bigger-home-or-fund-helper-first-singapore.html`, a family-led cross-cluster bridge for households deciding whether the next upgrade should be more space or more household support capacity.

**v0315 bridge note:** added `move-near-grandparents-or-pay-for-infantcare-first-singapore.html`, a family-led cross-cluster bridge for households comparing housing/location change against formal early-years care spending.

**v0334 hardening note:** lifted `whole-life-vs-critical-illness-insurance-singapore.html` and `hospital-cash-insurance-worth-it-singapore.html` above the floor by tightening product-purpose sequencing and buffer logic.

### Protection/Insurance (25 content pages) ✅ Mature
**v0333 repair note:** restored SITE search-index coverage for `increase-critical-illness-insurance-or-top-up-parents-cpf-first-singapore.html`, `increase-term-life-insurance-or-build-child-education-fund-first-singapore.html`, and `increase-term-life-insurance-or-pay-down-home-loan-first-singapore.html`.

**v0320 bridge note:** added `increase-hospitalisation-rider-or-build-child-education-fund-first-singapore.html`, a protection-led bridge for families comparing medical-cost protection against longer-horizon education funding.
Full coverage: hospitalisation, life insurance, CI, disability income, accident, hospital cash, bridge pages for all major life events.

**v0311 bridge note:** added `increase-term-life-insurance-or-pay-down-home-loan-first-singapore.html`, a protection-led cross-cluster bridge for mortgage households deciding whether the bigger immediate gap is family cover or debt reduction.
**v0312 metadata note:** refreshed `featured.json` `page_registry` date for `increase-term-life-insurance-or-pay-down-home-loan-first-singapore.html` so protection recent surfaces and `new[]` ordering treat it as the newest protection addition from the v0311 bridge wave.

**v0315 bridge note:** added `increase-disability-income-insurance-or-fund-helper-first-singapore.html`, a protection-led cross-cluster bridge for households deciding whether the deeper missing layer is income-continuity cover or paid household support capacity.

**v0336 metadata note:** normalised `featured.json` `page_registry` for the four v0335 investing bridge pages so `new[]` and hub recency sections rely on canonical bare-key entries with clean first_seen ordering.

### Investing/Liquidity (52 content pages) 🟡 Growing

**v0335 bridge note:** added `build-ssb-ladder-or-increase-term-life-insurance-first-singapore.html`, `build-ssb-ladder-or-increase-hospitalisation-rider-first-singapore.html`, `increase-index-fund-investing-or-support-parents-medical-costs-first-singapore.html`, and `increase-index-fund-investing-or-build-child-education-fund-first-singapore.html` to deepen the investing-led cross-cluster bridge lattice into protection and family support decisions.

**v0323 depth note:** added `t-bills-vs-fixed-deposit-singapore.html`, `cash-management-account-vs-t-bills-singapore.html`, `cpf-life-basic-vs-standard-plan-singapore.html`, and `cpf-life-basic-vs-escalating-plan-singapore.html` to deepen the conservative-cash and CPF LIFE choice matrix inside the investing cluster.

**v0321 bridge note:** added `increase-index-fund-investing-or-pay-for-infantcare-first-singapore.html`, an investing-led bridge for households comparing long-term compounding against immediate infantcare capacity.
**v0320 bridge note:** added `top-up-cpf-sa-or-pay-for-after-school-care-first-singapore.html`, an investing-led bridge for households comparing protected compounding against current after-school supervision spending.
Three layers: liquidity foundation (14 pages) + voluntary investing entry (4 pages: CPF OA, SRS, RSP vs lump sum, how much to invest) + investing vehicles / conservative parking / tax-wrapper comparisons (14 pages: CPF SA top-up, SSBs, index fund investing, t-bills vs SSBs, SSBs vs fixed deposit, cash management account vs SSBs, SRS vs CPF SA top-up, CPF SA top-up vs pay down mortgage, SRS vs pay down mortgage, SRS vs CPF OA investment, CPF SA top-up vs CPF OA investment, cash buffer vs SRS, cash buffer vs CPF SA top-up, cash buffer vs CPF OA investment, SRS vs index fund investing, CPF OA investment vs index fund investing, CPF SA top-up vs index fund investing) + allocation tools (2 pages: surplus cash allocation calculator, retirement income layering calculator) + retirement-income comparisons (5 pages: CPF LIFE vs dividend portfolio, CPF LIFE vs SSB ladder, SRS withdrawal order vs tax smoothing, CPF LIFE Standard vs Escalating Plan, sell units vs live off dividends in retirement) + retirement implementation planning (1 page: how much cash bucket before CPF LIFE).
**v0309 bridge note:** added `buy-investment-property-or-increase-index-fund-investing-singapore.html`, an investing-led cross-cluster bridge comparing property concentration against broader index-fund exposure.

**v0310 note:** hardened `buy-investment-property-or-increase-index-fund-investing-singapore.html` above threshold and added follow-through inbound links from adjacent investing, property-timing, and property-risk pages.

**v0315 bridge note:** added `buy-bigger-home-or-increase-index-fund-investing-first-singapore.html`, an investing-adjacent bridge for households deciding whether the next capital move should stay diversified or be concentrated into a larger own-stay home.

**v0301 note:** investing hardening bundle deepened five existing investing pages — `surplus-cash-allocation-calculator-singapore.html`, `cpf-sa-top-up-vs-cpf-oa-investment-singapore.html`, `srs-vs-cpf-oa-investment-singapore.html`, `cpf-sa-top-up-vs-index-fund-investing-singapore.html`, and `srs-vs-pay-down-mortgage-singapore.html` — and added contextual inbound links from adjacent cash-buffer, investing-allocation, CPF wrapper, and mortgage trade-off pages.


### Calculators (39 pages) ✅ | Comparisons (60 pages) ✅
**v0298 note:** hardened six existing calculators for depth and discoverability; added `life-insurance-calculator-singapore.html` to `calculators/index.html`.
**v0299 note:** transport hardening bundle deepened five existing transport pages — `10-year-coe-renewal-worth-it-singapore.html`, `car-depreciation-singapore.html`, `car-insurance-excess-and-claims-singapore.html`, `coe-loan-calculator-singapore.html`, and `coe-renew-vs-replace-calculator-singapore.html` — and added contextual inbound links from adjacent transport financing, insurance, and ownership-framework pages.
**v0300 note:** property hardening bundle deepened five existing property calculators — `upgrade-downgrade-property-calculator-singapore.html`, `property-sell-buy-pipeline-calculator-singapore.html`, `how-much-cash-to-buy-property-calculator-singapore.html`, `property-upgrade-ladder-calculator-singapore.html`, and `sell-property-proceeds-calculator-singapore.html` — and added contextual inbound links from adjacent property planning, financing, cash-readiness, selling-cost, and affordability pages.

---

## 9. Version History

| Version | Work |
|---------|------|
| v0319 | Bridge indexing, comparisons-hub, and auto-related cleanup bundle: add `move-near-grandparents-or-buy-bigger-home-first-singapore.html`, `buy-family-car-or-top-up-cpf-sa-first-singapore.html`, `increase-critical-illness-insurance-or-build-down-payment-fund-first-singapore.html`, and `increase-index-fund-investing-or-pay-for-after-school-care-first-singapore.html` into the `includes.js` SITE search index under the correct clusters; add all 4 to `comparisons/index.html`; move `auto-related` to the correct pre-References position on `rent-out-vs-sell-calculator-singapore.html`, `rent-out-vs-sell-singapore.html`, and `rent-vs-buy-property-singapore.html`; refresh brief and validation sweep. |
| v0317 | Bridge indexing and freshness cleanup bundle: add `move-closer-to-aging-parents-or-pay-for-adult-day-care-first-singapore.html`, `buy-family-car-or-keep-bigger-cash-buffer-before-second-child-singapore.html`, `increase-hospitalisation-rider-or-pay-down-home-loan-first-with-aging-parents-singapore.html`, and `buy-bigger-home-or-help-parents-with-housing-costs-first-singapore.html` into the `includes.js` SITE search index under the correct clusters; refresh `featured.json` `page_registry.first_seen` for `buy-family-car-or-keep-bigger-cash-buffer-before-second-child-singapore.html` so it is the newest transport addition; regenerate featured data; update brief and validation sweep. |
| v0312 | Bridge discoverability metadata cleanup bundle: refresh `featured.json` `page_registry.first_seen` dates for `move-closer-to-school-or-keep-home-and-own-a-car-singapore.html`, `buy-bigger-home-or-fund-helper-first-singapore.html`, `increase-term-life-insurance-or-pay-down-home-loan-first-singapore.html`, and `pay-down-home-loan-or-help-aging-parents-now-singapore.html` so they sort as genuinely newest within their clusters; regenerate `featured.json`; update brief and validation sweep. |
| v0311 | Second cross-cluster bridge-page bundle: add `move-closer-to-school-or-keep-home-and-own-a-car-singapore.html`, `increase-term-life-insurance-or-pay-down-home-loan-first-singapore.html`, `pay-down-home-loan-or-help-aging-parents-now-singapore.html`, and `buy-bigger-home-or-fund-helper-first-singapore.html`; wire them into family/property/protection/transport/comparisons hubs, SITE index, featured data, sitemap, and brief; add explicit inbound links from adjacent existing pages; run generators and validation sweep. |
| v0310 | Bridge-page hardening and discoverability follow-through bundle: expand `buy-investment-property-or-increase-index-fund-investing-singapore.html` and `second-car-or-helper-when-supporting-aging-parents-singapore.html` above threshold; add explicit inbound links from adjacent investing/property-timing/property-risk and aging-parent transport/care-delivery pages; refresh brief and run validation sweep. |
| v0309 | Cross-cluster bridge-page bundle: add `buy-a-car-or-upgrade-home-first-singapore.html`, `pay-down-home-loan-or-build-child-education-fund-singapore.html`, `buy-investment-property-or-increase-index-fund-investing-singapore.html`, and `second-car-or-helper-when-supporting-aging-parents-singapore.html`; wire them into transport/property/family/investing hubs, comparisons hub, SITE index, featured data, sitemap, and brief; add explicit inbound links from adjacent existing pages; run generators and validation sweep. |
| v0304 | Property borrowing-and-transaction hardening bundle on existing pages only: expand `reduce-tenure-vs-lower-monthly-instalment-singapore.html`, `what-to-do-when-home-loan-lock-in-ends-singapore.html`, `hdb-income-ceiling-singapore.html`, `family-grant-singapore.html`, and `proximity-housing-grant-phg-singapore.html`; add contextual inbound links from `refinance-vs-reprice-home-loan-singapore.html`, `hdb-loan-vs-bank-loan-singapore.html`, `hdb-loan-vs-bank-loan-calculator-singapore.html`, `enhanced-cpf-housing-grant-ehg-singapore.html`, `buying-property-with-parents-or-family-singapore.html`, `hdb-vs-condo-singapore.html`, and `home-loan-lock-in-prepayment-penalty-singapore.html`; run generators and validation sweep. |
| v0303 | Transport calculator/mechanics hardening bundle on existing pages only: expand `car-vs-ride-hailing-cost.html`, `coe-cost-singapore.html`, `car-maintenance-repair-cost-singapore.html`, `own-car-vs-public-transport-singapore.html`, and `erp-cost-singapore.html`; add contextual inbound links from `car-ownership-cost-calculator-singapore.html`, `should-i-buy-car-now-or-wait-singapore.html`, `best-car-to-buy-singapore.html`, `car-loan-rates-singapore.html`, `car-sharing-vs-owning-a-car-singapore.html`, and `car-depreciation-singapore.html`; run generators and validation sweep. |
| v0302 | Property mechanics hardening bundle on existing pages only: expand `pay-down-mortgage-vs-invest-calculator-singapore.html`, `how-having-a-child-affects-tdsr-borrowing-capacity-singapore.html`, `mortgage-interest-cost-singapore.html`, `tdsr-msr-singapore.html`, and `bsd-absd-singapore.html` above threshold; add contextual inbound links from `pay-down-mortgage-vs-invest-singapore.html`, `refinance-vs-reprice-home-loan-singapore.html`, `property-affordability-calculator-singapore.html`, `tdsr-msr-calculator-singapore.html`, `bigger-home-vs-education-budget-singapore.html`, `property-ownership-cost-singapore.html`, `bsd-absd-calculator-singapore.html`, and `how-much-cash-to-buy-property-singapore.html`; run generators and validation sweep. |
| v0335 | Investing-led cross-cluster bridge bundle: added `build-ssb-ladder-or-increase-term-life-insurance-first-singapore.html`, `build-ssb-ladder-or-increase-hospitalisation-rider-first-singapore.html`, `increase-index-fund-investing-or-support-parents-medical-costs-first-singapore.html`, and `increase-index-fund-investing-or-build-child-education-fund-first-singapore.html`; refreshed investing/comparisons hubs, inbound links, SITE index, featured data, and sitemap. |
| v0301 | Investing hardening bundle on existing pages only: expand `surplus-cash-allocation-calculator-singapore.html`, `cpf-sa-top-up-vs-cpf-oa-investment-singapore.html`, `srs-vs-cpf-oa-investment-singapore.html`, `cpf-sa-top-up-vs-index-fund-investing-singapore.html`, and `srs-vs-pay-down-mortgage-singapore.html` above threshold; add contextual inbound links from `cash-buffer-vs-srs-singapore.html`, `cash-buffer-vs-cpf-sa-top-up-singapore.html`, `cash-buffer-vs-cpf-oa-investment-singapore.html`, `cpf-oa-investment-vs-index-fund-investing-singapore.html`, `srs-vs-index-fund-investing-singapore.html`, `cpf-sa-top-up-vs-pay-down-mortgage-singapore.html`, and `how-much-to-invest-each-month-singapore.html`; run generators and validation sweep. |
| v0300 | Property hardening bundle on existing pages only: expand `upgrade-downgrade-property-calculator-singapore.html`, `property-sell-buy-pipeline-calculator-singapore.html`, `how-much-cash-to-buy-property-calculator-singapore.html`, `property-upgrade-ladder-calculator-singapore.html`, and `sell-property-proceeds-calculator-singapore.html` above threshold; add contextual inbound links from `property-upgrade-planner-singapore.html`, `bridging-loan-singapore.html`, `how-much-cash-to-buy-property-singapore.html`, `sell-property-cost-singapore.html`, and `property-affordability-calculator-singapore.html`; run generators and validation sweep. |
| v0299 | Transport hardening bundle on existing pages only: expand `10-year-coe-renewal-worth-it-singapore.html`, `car-depreciation-singapore.html`, `car-insurance-excess-and-claims-singapore.html`, `coe-loan-calculator-singapore.html`, and `coe-renew-vs-replace-calculator-singapore.html` above threshold; add contextual inbound links from `car-loan-rates-singapore.html`, `car-insurance-cost-singapore.html`, `car-ownership-cost.html`, and `should-i-buy-car-now-or-wait-singapore.html`; run generators and validation sweep. |
| v0298 | Calculator hardening bundle: expand `life-insurance-calculator-singapore.html`, `property-affordability-calculator-singapore.html`, `rent-vs-buy-calculator-singapore.html`, `refinance-savings-calculator-singapore.html`, `car-ownership-cost-calculator-singapore.html`, and `tdsr-msr-calculator-singapore.html` above threshold; add `life-insurance-calculator-singapore.html` to `calculators/index.html`; add contextual inbound links from adjacent framework pages; run generators and validation sweep. |
| v0297 | Discoverability repair bundle for 5 existing transport decision pages: strengthen manual surfacing in transport and comparisons hubs; add explicit inbound links from adjacent quote, financing, and exit-execution pages; refresh touched-page Last updated dates; run generators and validation sweep. |
| v0175–v0237 | Transport and Property branches; Family/Protection/Investing cluster launches |
| v0238–v0263 | Family aging-parents branch (all 24 sub-topics); internal linking; schema |
| v0264–v0277 | Family aging-parents calculators (14); housing/location/co-residence/liquidity branches |
| v0294 | Repair protection SITE indexing for v0293 pages; add long-term-care funding calculator; update protection/calculators hubs and featured pipeline |
| v0295 | Add care-execution bridge bundle across family and protection: home care vs family caregiver time, insurance payouts vs out-of-pocket home-help funding, and caregiver-income protection vs bigger care fund. |
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

| v0293 | Protection retirement-care funding bridge bundle: self-fund vs insure, housing equity vs more cover, and care fund vs keep investing |

| v0296 | Added care-execution calculator, repaired comparisons hub wiring for v0295 pages, refreshed family/calculator/search wiring. |


**v0313 bridge note:** added `move-closer-to-aging-parents-or-keep-home-and-own-a-second-car-singapore.html`, `pay-down-home-loan-or-keep-bigger-cash-buffer-before-second-child-singapore.html`, `increase-term-life-insurance-or-build-child-education-fund-first-singapore.html`, and `help-parents-with-housing-costs-or-build-your-own-investment-portfolio-first-singapore.html` as the third cross-cluster bridge-page bundle.

| v0315 | Fourth cross-cluster bridge-page bundle: added move-near-grandparents vs infantcare, family car vs term life, bigger home vs index-fund investing, and disability-income insurance vs helper first; updated hubs, comparisons, includes.js, featured metadata, sitemap, and project brief. |


| v0328 | Financing indexing and freshness cleanup: added the four new financing comparison pages to `includes.js` SITE indexing, restored `featured.json -> page_registry` freshness entries, and updated `_project-brief.md` version metadata. |
