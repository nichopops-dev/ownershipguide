# Ownership Guide — Master Project Brief
> Paste this at the start of every Claude or ChatGPT session to restore full context instantly.
> Last updated: March 2026 · Based on repo v0255

---

## 1. What This Site Is

**Ownership Guide** (ownershipguide.com) is a decision library for expensive, long-lived financial decisions — cars, property, family costs, and eventually any major asset class.

**Core positioning:** "Make high-cost decisions with clarity." Not a news site, not instalment-only. Focuses on total exposure, liquidity strain, and the frictions that break plans after the headline number looks affordable.

**Brand type:** Faceless editorial brand — no named author, no personal brand.

### Geographic scope
- **Now:** Singapore-first. All content is Singapore-specific with SG regulatory/cost context.
- **Eventually:** Global expansion using a **universal framework + country-specific data layer** approach. Decision logic is built once ("how to think about car ownership cost"); what changes per country is the data layer (COE → stamp duty, CPF → superannuation, etc.). This means future pages like `car-ownership-cost-australia.html` rather than rebuilding entire cluster hierarchies per country.
- **Do not architect for global expansion yet.** Build SG depth first. Note this intent so no structural decisions accidentally block it later.

### Topic scope
- **Now:** Transport, Property, Family/Children, Protection/Insurance, Investing/Liquidity
- **Future clusters (non-exhaustive):** luxury assets (watches, yachts, art), other wealth ownership topics
- The site name "Ownership Guide" was chosen deliberately to be non-restrictive — it can cover any major ownership decision
- Luxury content tone: **slightly more aspirational but still analytical** — same decision-framework DNA, elevated subject matter. E.g. "5-year total cost of watch ownership including service intervals, resale depreciation by brand, and authentication friction at exit."

### Monetisation goals (in order)
1. **Google AdSense** — approved and live (Auto Ads). Primary current revenue.
2. **Affiliate/referral marketing** — not started yet. Natural future layer: insurance comparison, mortgage brokers, car loan comparison (SingSaver/MoneySmart-type programs)
3. **Sponsored content** — possible later

---

## 2. Technical Stack

**Repo:** Static HTML site. No CMS, no React, no build pipeline. Pure HTML + CSS + vanilla JS.

- **`featured.json` maintenance:** Update this file manually (or via script) when a new version ships. Add new pages to `new[]`, update `recent[]` with newest page per cluster, `popular[]` stays stable unless cluster balance changes significantly.

> ⚠️ **Known recurring issue — includes.js search index:** ChatGPT periodically rewrites `includes.js` entirely and removes the family/protection SITE cluster entries and the URL scoring improvement. Claude re-applies these each session. The Step 3 prompt now includes an explicit guard against this.
> ⚠️ **Related-links rule:** calculator pages should carry the `auto-related` div so `includes.js` can inject onward navigation. Hub pages are intentionally excluded from this rule.
**Hosting:** GitHub Pages (or equivalent static host)
**Current version:** v0255

### Key files
| File | Purpose |
|------|---------|
| `includes.js` | ⚠️ Central nervous system — controls ALL shared behaviour. See Section 5. |
| `styles.css` | Global stylesheet (~28KB) |
| `index.html` | Homepage |
| `sitemap.xml` | ~289 URLs |
| `footer.html` | Shared footer partial |
| `featured.json` | Dynamic homepage + hub data. Stores `cluster_pages` (all pages per cluster sorted by Last updated date), `new[]` (10 most recent across all clusters), `popular[]` (manually curated). Regenerate when new pages ship — Claude does this each session. Not a webpage; do not add to sitemap. |
| `_email-capture-setup.md` | One-time setup instructions for Google Sheets email capture. Keep locally — do not upload to GitHub. |
| `generate-sitemap.py` | Sitemap regeneration script. Claude runs `python3 generate-sitemap.py` from repo root each session — outputs accurate sitemap.xml from actual files. Never add to sitemap itself. |
| `_project-brief.md` | Master project brief. Permanent repo fixture. Do not rename, move, delete, deploy, or add to sitemap. Update only what changed at the end of each shipped version. |

### Directory structure
```
/ (root)              — All content pages (.html files)
/transport/           — Transport hub index
/transport/financing/ — Transport financing sub-hub
/property/            — Property hub index
/property/financing/  — Property financing sub-hub
/calculators/         — Calculators hub index
/comparisons/         — Comparisons hub index
/financing/           — Top-level financing hub
/start-here/          — Guided entry path
/protection/          — Protection / Insurance hub index
/investing/           — Investing / liquidity hub index
```

### Page taxonomy (required on every page)
```html
<meta name="og:cluster" content="transport|property|family|protection|core">
<meta name="og:subtopic" content="comparison|calculator|decision|financing|exit|...">
```
These drive auto-related link injection via includes.js. Every new page must have both.

---

## 3. includes.js — Handle With Extreme Care

**This file is the single source of truth for all shared site behaviour.** A mistake here breaks the entire site.

### What it controls
- Header/footer injection
- GA4 analytics (G-RH8YDW5LFP)
- AdSense Auto Ads (ca-pub-8718234605112874)
- Auto-related link injection (drives "You might also read" sections)
- "Next steps" decision path module on pillar pages
- Back-to-cluster links
- Announcement banner
- Email capture form (injected on calculator pages + any page with `<meta name="og:email-capture" content="true">`)

### Current settings
```javascript
enableHeaderFooter: true
enableGA4: true
enableAdSenseAutoAds: true       // Auto Ads are live — DO NOT CHANGE
enableAutoAdSlots: false         // ⚠️ THIS IS INTENTIONAL — do not change
autoAdSlotAfterH2: 2
maxAutoAdSlots: 2
minH2ForAdSlots: 3
enableAutoRelated: true
relatedPillarsCount: 2
relatedBridgeCount: 1
enableDecisionPathModule: true
enableAutoBackToCluster: true
emailCaptureUrl: "https://script.google.com/macros/s/AKfycbymgo2k_2loWUwDzuCbtEDOMEYeGzQC1FRj7zOYVl5GG5Sv4C2f82oH4QEnnHPuu7s/exec"
```

### ⚠️ Critical AdSense note
`enableAdSenseAutoAds: true` and `enableAutoAdSlots: false` is the **correct and intentional state**.
- Auto Ads (Google-managed) are live and working well — do not touch
- `enableAutoAdSlots` refers to a separate manual slot system — it is OFF intentionally
- Legacy fake `.ad-slot` placeholder boxes were removed from transport pages in earlier versions — do not reintroduce them
- Trust pages are excluded in AdSense UI, not in source code

### Rules for touching includes.js
- Do not touch unless strictly necessary
- If touched: be minimal, explain clearly why, only register new pages/related graph when needed
- Never alter injection logic casually
- History: a long painful debug cycle around header/footer injection, "Next steps" jumping above title, and calculator damage was resolved over many versions — do not reopen these issues

---

## 4. Core Workflow Rules (Every Session)

These were established over a long build history and must be followed:

1. **Read source first.** Understand the current state before recommending or changing anything.
2. **Every version returns:** new zip + list of changed files (added/modified) + commit message
3. **Run a debug sweep every version:**
   - Internal link integrity
   - HTML validity on edited files
   - No broken header/footer injection
   - All edited pages use `<main class="container">`
   - `#site-footer` must remain outside `<main>`
   - Nothing after footer
4. **Run a cannibalisation check before proposing new pages:**
   - Semantic/topic overlap with existing pages
   - Prefer extending hierarchy cleanly over overlapping URLs
5. **No breaking changes**
6. **Prefer meaningful bundles**, but small hotfixes are allowed
7. **Do not create churn** for the sake of activity
8. **Full-file replacements** preferred over ambiguous partial edits
9. **Default session mode:** audit → pre-cannibalisation check → build

---

## 5. Global Page Standards

### Every content page must have (exactly one of each where applicable)
- Scenario library
- FAQ section + FAQPage schema
- References section (must be last substantive section)
- Last updated line + policy links (only thing after References)

### Avoid
- Stacked or repeated wrapper blocks
- Empty/shell headings
- Duplicate "Last updated" entries
- Old "More FAQs" pattern
- Decorative headings with no follow-through
- Content appearing after References

### Known false positives (not real defects)
- `editorial-policy.html` and `privacy-policy.html` contain "Last updated" more than once by design

### Article standards
- Important articles: ~1,500–2,000 words, can exceed if useful
- Must feel like proper useful guides, not padded SEO filler
- No repeated ideas, no repeated subheadings, no obvious puff

### Calculator standards
- Tool-first — preserve calculator UI and script behaviour
- Support content: 1,200+ words ideally, without bloating
- Never turn calculator pages into essays
- Structure: what it estimates → how to use → interpretation → scenario examples → common mistakes → FAQ → references → last updated

---

## 6. Writing Style Guide

- **Tone:** Direct, analytical, slightly clinical. Not warm/friendly, not alarmist. Treats reader as an intelligent adult making a serious decision.
- **Sentence structure:** Short declarative sentences. Frequent line breaks. Never padded.
- **Framing pattern:** Start with the wrong question people ask → reframe to the right question → model it properly.
- **Signature phrases:** "The real question is rarely..." / "In Singapore, this is primarily a 5-year exposure and liquidity decision." / "Does ownership outperform alternatives after pricing full exposure?"
- **Numbers:** Always show ranges, never single figures. Always label as planning ranges, not quotes.
- **CTAs:** Always point to a specific next page. Follow framework → calculator → mechanics order.
- **Never:** Marketing language, promises, superlatives, false certainty.
- **Internal linking principle:** Framework page first, then calculator, then mechanics/drill-down. Never send users to a calculator before they've read a framework page.

---

## 7. Current Site Health (as of v0220)

- ✅ 0 broken internal links
- ✅ No duplicate Last updated regressions
- ✅ No shell/empty heading regressions
- ✅ No content-after-References regressions
- ✅ No header/footer source regression
- ✅ AdSense Auto Ads live and working
- ✅ GA4 tracking active
- ✅ Structurally healthy and visually stable
- ✅ Email capture live on all calculator pages (writes to Google Sheet, no 3rd party)
- ✅ Dynamic homepage and hub pages pulling from featured.json (date-sorted, capped)

**Current mode:** Content compounding. Investing / liquidity is now live as a growing pillar, deepened beyond its launch wedge to cover emergency-fund sizing, storage, sequencing, reserve design, drawdown rules, and rebuild logic. The aging-parents branch now extends across liquidity, protection, housing, transport, retirement, caregiving delivery, legal readiness, estate readiness, living arrangement, post-hospital transition, cognitive decline, financial safety, and end-of-life / palliative transition. Protection / Insurance remains mature and bridge-heavy. The dynamic homepage remains powered by `featured.json`. Still not in cleanup mode and not in aesthetics mode.

### Version history
- **v0255** — Aging parents × mobility decline / accessibility release. Added four family mobility pages (early fall risk vs waiting for a major fall, walker-friendly home vs wheelchair-ready home, medical escort and transport vs ad-hoc family driving, and how supporting aging parents changes your mobility-decline decision order), strengthened contextual links across the aging-parents branch, and extended the family cluster into fall-risk response, accessibility standard-setting, clinic-trip logistics, and mobility-stage sequencing before crisis.

- **v0254** — Aging parents × end-of-life / palliative-transition release. Added four family end-of-life pages (palliative care vs continuing aggressive treatment, home hospice vs institutional end-of-life care, practical end-of-life planning, and how supporting aging parents changes your end-of-life decision order), strengthened contextual links across the aging-parents branch, and extended the family cluster into comfort-focused care sequencing, setting fit, caregiver durability, and practical final-stage readiness.

- **v0253** — Aging parents × financial safety / scam-risk release. Added four family financial-safety pages (early scam warning signs vs waiting for a bigger financial loss, help with banking vs keep full financial independence, sharing banking passwords or OTPs vs safer payment support, and how supporting aging parents changes your financial-safety decision order), strengthened contextual links across the aging-parents branch, and fixed the missing comparison-hub entry for rehab vs home recovery support.

- **v0252** — Aging parents × cognitive decline / dementia release. Added four family cognitive-decline pages (early memory decline vs waiting for clearer dementia signs, supervision at home vs independent living with cognitive decline, memory care vs general eldercare setting, and how supporting aging parents changes your cognitive-decline decision order), strengthened contextual links across the aging-parents branch, fixed the homepage `featured.json` cluster-label bug for recently updated pages, and corrected the v0251 respite-care word-count shortfall.

- **v0251** — Aging parents × post-hospital transition release. Added four family post-hospital pages (hospital discharge planning, rehab vs home recovery support, respite care vs running on family burnout, and how supporting aging parents changes your post-hospital decision order), strengthened contextual links across the aging-parents branch, and expanded the family cluster into discharge readiness, recovery sequencing, caregiver durability, and acute-to-stable transition design.

- **v0250** — Aging parents × estate-readiness release. Added four family estate-readiness pages (make a will for aging parents, CPF nomination for aging parents, estate-document readiness for aging parents, and how supporting aging parents changes your estate-readiness decision order), strengthened contextual links across the aging-parents branch, and extended the family cluster into after-death instruction clarity, CPF-specific distribution readiness, survivor retrieval discipline, and sequencing before bereavement forces the issue.

- **v0249** — Aging parents × living-arrangement release. Added four family living-arrangement pages (aging in place vs moving in together, home modifications vs relocating, home care vs nursing home, and how supporting aging parents changes your living-arrangement decision order), strengthened contextual links across the aging-parents branch, and extended the family cluster into home-base selection, housing-fit testing, care-setting escalation, and sequencing before crisis.

- **v0248** — Aging parents × legal readiness release. Added four family legal-readiness pages (lasting power of attorney for aging parents, advance care planning for aging parents, who should manage eldercare decisions in the family, and how supporting aging parents changes your legal-readiness decision order), strengthened contextual links across the aging-parents branch, and extended the family cluster into authority, spokesperson, and coordinator-readiness planning before crisis.

- **v0246** — Aging parents × family coordination / burden-sharing release. Added four sibling-coordination and burden-sharing pages (split support equally vs by income, give cash vs take on caregiving time, help siblings now vs preserve your own cash buffer, and how supporting aging parents changes your family burden-sharing decision order), strengthened contextual links across Family and Investing, and extended the aging-parents branch into sibling contribution design, reserve-protection boundaries, and family coordination sequence.

- **v0245** — Aging parents × work/career trade-off release. Added four elder-support work and income sequencing pages (reduce work hours vs pay for caregiving support, quit your job vs outsource more care, keep a flexible job vs higher pay, and how supporting aging parents changes your work and income decision order), strengthened contextual links across Family and Investing, and extended the aging-parents branch into career flexibility, earnings durability, and work-capacity trade-offs.

- **v0244** — Aging parents × medical-financing bridge release. Added four elder medical-funding and long-term-care sequencing pages (use parents' MediSave vs pay cash for eldercare costs, CareShield Life supplement vs bigger cash buffer, hospital cash plan vs bigger cash buffer, and how supporting aging parents changes your medical-financing decision order), strengthened contextual links across Family and Protection, and extended the aging-parents branch beyond caregiving delivery into medical-cost funding sequence and long-term-care financing trade-offs.

- **v0243** — Aging parents × caregiving-costs bridge release. Added four eldercare delivery and cost-sequencing pages (hire a helper vs use home-care services, adult day care vs keeping a parent at home, caregiving costs now vs bigger cash buffer, and how supporting aging parents changes your caregiving decision order), strengthened contextual links across Family and Investing, and extended the aging-parents branch beyond liquidity, protection, housing, transport, and retirement into care-delivery decisions and operating-cost trade-offs.

- **v0242** — Aging parents × investing/retirement bridge release. Added four sandwich-generation capital-allocation pages (help aging parents now vs strengthen your own retirement first, top up parents' CPF vs preserve your own cash buffer, monthly support for aging parents vs build a bigger emergency fund, and how supporting aging parents changes your investing priority order), strengthened contextual links across Family and Investing, and extended the aging-parents branch beyond protection, housing, and transport into retirement and investing sequence.

- **v0241** — Aging parents × transport bridge release. Added four elder-support transport sequencing pages (keep a car vs ride-hailing, second car vs ride-hailing, family car upgrade vs bigger cash buffer, and how supporting aging parents changes your transport decision order), strengthened contextual links across Family and Transport, and extended the aging-parents branch beyond protection, liquidity, and housing into mobility and caregiving logistics.

- **v0240** — Aging parents × property/financing bridge release. Added four housing and mortgage sequencing pages for sandwich-generation households (move closer vs keep housing cost lower, help parents with housing costs vs strengthen your own cash buffer, use CPF OA vs preserve cash when supporting aging parents, and how supporting aging parents changes your housing decision order), strengthened contextual links from Family and Property/Financing pages into the new bridge layer, and extended the aging-parents branch beyond protection/liquidity into housing and financing trade-offs.

- **v0239** — Aging parents × protection/liquidity bridge release. Added four sandwich-generation sequencing pages (term life vs bigger cash buffer, disability income vs bigger cash buffer, hospitalisation rider vs bigger cash buffer, and how supporting aging parents changes cash-buffer design), strengthened manual hub/contextual links across Family, Protection, and Investing, and extended the family-protection bridge layer beyond children into elder-support obligations.

- **v0238** — Family × protection bridge release. Added four first-child protection sequencing pages (term life vs bigger cash buffer, disability income vs bigger cash buffer, hospitalisation rider vs bigger cash buffer, and how having children changes insurance priority order), strengthened manual hub and contextual interlinking between Family and Protection, and extended the first-child decision layer beyond cost and reserve design into protection ordering.

- **v0233** — interlinking consolidation release. Added manual hub links across cluster and financing hubs, strengthened contextual in-body links from older framework pages into recent bridge pages, and improved surfacing for recent liquidity / sequencing content without expanding the sitemap.

- **v0236** — Motorcycle × liquidity bridge release. Added four motorcycle reserve-design / sequencing pages (build emergency fund first, repair sinking fund vs emergency fund, bigger down payment vs larger buffer, and how motorcycle ownership changes cash-buffer design), strengthened manual hub and contextual interlinking into the motorcycle branch, and applied two selective validated placement/order fixes where methodology sections were sitting between auto-related and References.

- **v0237** — Motorcycle × protection bridge release. Added four motorcycle-specific protection sequencing pages (accident insurance vs bigger cash buffer, disability income insurance vs bigger cash buffer, hospitalisation rider vs bigger cash buffer, and how motorcycle ownership changes insurance priority order), strengthened contextual links from core motorcycle and protection pages into the new bridge layer, updated hub surfacing in Transport and Protection, and normalised two selective order/placement cases where the page clearly benefited from a stricter template order.
### Known background standards debt (opportunistic cleanup only, not standalone priority)
Older pages that predate current standards — fix when touched, not as a dedicated pass:
- `car-ownership-cost.html`
- `car-maintenance-repair-cost-singapore.html`
- `how-much-cash-to-buy-car-singapore.html`
- `property-ownership-cost-singapore.html`
- `used-car-vs-new-car-singapore.html`


## 8. Cluster Status

### Transport (~108 pages) ✅ Very strong and broad

**Current state:** Deepened through v0237. Transport now includes both a motorcycle–liquidity bridge layer and a motorcycle–protection bridge layer, extending the branch from purchase and upkeep into reserve design, insurance sequencing, medical-friction decisions, and income-protection order.


**Ownership / running cost / affordability**
car-ownership-cost.html · car-ownership-cost-per-year-singapore.html · monthly-cost-of-owning-a-car-singapore.html · fuel-cost-singapore.html · parking-cost-singapore.html · erp-cost-singapore.html · road-tax-cost-singapore.html · car-maintenance-repair-cost-singapore.html · car-insurance-cost-singapore.html · car-insurance-excess-and-claims-singapore.html · no-claim-discount-ncd-singapore.html · car-affordability-calculator-singapore.html · how-much-salary-to-own-a-car-singapore.html · how-much-cash-to-buy-car-singapore.html · should-you-build-your-emergency-fund-before-buying-a-car-singapore.html · car-repair-sinking-fund-vs-emergency-fund-singapore.html · bigger-car-down-payment-vs-larger-cash-buffer-singapore.html · how-car-ownership-changes-your-cash-buffer-plan-singapore.html

**Purchase / financing / structure**
car-loan-rates-singapore.html · car-loan-vs-cash-singapore.html · balloon-loan-vs-normal-car-loan-singapore.html · car-price-breakdown-singapore.html · omv-arf-car-taxes-singapore.html

**Lifecycle / exit / COE / value**
used-car-vs-new-car-singapore.html · cheapest-car-to-own-singapore.html · best-car-to-buy-singapore.html · car-depreciation-singapore.html · coe-cost-singapore.html · should-i-buy-car-now-or-wait-singapore.html · coe-renewal-worth-it-singapore.html · 5-year-coe-renewal-worth-it-singapore.html · 10-year-coe-renewal-worth-it-singapore.html · coe-renew-vs-replace-singapore.html · parf-paper-value-deregistration-singapore.html · trade-in-vs-direct-sale-car-singapore.html · consignment-vs-dealer-sale-car-singapore.html · sell-car-with-outstanding-loan-singapore.html · trade-in-car-with-outstanding-loan-singapore.html · should-you-settle-car-loan-early-singapore.html · when-to-upgrade-car-with-outstanding-loan-singapore.html

**Transport alternatives / household realism**
is-it-worth-owning-a-car-singapore.html · own-car-vs-public-transport-singapore.html · car-vs-ride-hailing-cost.html · car-sharing-vs-owning-a-car-singapore.html · does-your-household-need-a-second-car-singapore.html · weekend-car-rental-vs-owning-a-car-singapore.html · second-car-vs-ride-hailing-singapore.html · car-sharing-vs-ride-hailing-singapore.html · car-leasing-vs-buying-singapore.html · off-peak-car-vs-normal-car-singapore.html · company-car-vs-car-allowance-singapore.html · car-subscription-vs-buying-singapore.html

**EV branch**
ev-vs-petrol-cost-singapore.html · ev-charging-cost-singapore.html · home-charging-vs-public-charging-ev-singapore.html · is-an-ev-practical-without-home-charging-singapore.html · ev-battery-degradation-singapore.html · ev-battery-replacement-cost-singapore.html · should-you-buy-a-used-ev-singapore.html · ev-resale-value-singapore.html · ev-battery-warranty-singapore.html

**Hybrid branch**
hybrid-vs-petrol-singapore.html · hybrid-vs-ev-singapore.html · should-you-buy-a-hybrid-car-singapore.html · self-charging-hybrid-vs-plug-in-hybrid-singapore.html

**Motorcycle branch**
motorcycle-ownership-cost-singapore.html · motorcycle-insurance-cost-singapore.html · motorcycle-maintenance-cost-singapore.html · motorcycle-vs-car-cost-singapore.html · motorcycle-depreciation-singapore.html · should-you-build-your-emergency-fund-before-buying-a-motorcycle-singapore.html · motorcycle-repair-sinking-fund-vs-emergency-fund-singapore.html · bigger-motorcycle-down-payment-vs-larger-cash-buffer-singapore.html · how-motorcycle-ownership-changes-your-cash-buffer-plan-singapore.html · accident-insurance-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html · disability-income-insurance-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html · hospitalisation-rider-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html · how-motorcycle-ownership-changes-your-insurance-priority-order-singapore.html · (+ full used/exit/COE sub-branch)

**Used-car diligence / transaction discipline**
used-car-inspection-checklist-singapore.html · used-car-records-checklist-singapore.html · used-car-dealer-warranty-singapore.html · buy-used-car-from-dealer-vs-direct-owner-singapore.html · mileage-vs-age-when-buying-used-car-singapore.html · used-car-listing-red-flags-singapore.html · questions-to-answer-before-you-commit-to-car-deal-singapore.html · low-monthly-payment-traps-when-buying-car-singapore.html

**Maintenance / servicing / repair decisions**
authorised-dealer-vs-independent-workshop-singapore.html · car-servicing-package-vs-pay-as-you-go-singapore.html · preventive-maintenance-vs-waiting-for-breakdown-singapore.html · car-repair-urgency-guide-singapore.html

**Post-incident / insurance / downtime**
settle-privately-vs-insurance-claim-car-accident-singapore.html · repair-cosmetic-car-damage-now-or-later-singapore.html · what-car-downtime-really-costs-singapore.html · comprehensive-vs-third-party-car-insurance-singapore.html · high-excess-vs-low-excess-car-insurance-singapore.html · named-driver-vs-any-authorised-driver-car-insurance-singapore.html · when-cheap-car-insurance-becomes-false-savings-singapore.html

**Household-fit / car-type choice**
sedan-vs-suv-singapore.html · suv-vs-mpv-for-families-singapore.html · do-you-really-need-a-7-seater-singapore.html · small-car-vs-big-car-singapore.html

**Aging-car economics / reliability**
repair-bill-vs-replace-car-singapore.html · paid-up-old-car-vs-newer-car-with-loan-singapore.html · can-your-household-rely-on-an-aging-car-singapore.html · when-an-old-car-becomes-false-economy-singapore.html

---

### Property (~96 pages) ✅ Very strong and broad

**Financing / borrowing / entry mechanics**
tdsr-msr-singapore.html · loan-to-value-ltv-singapore.html · in-principle-approval-home-loan-singapore.html · cash-over-valuation-cov-singapore.html · how-much-cash-to-buy-property-singapore.html · hdb-loan-vs-bank-loan-singapore.html · fixed-vs-floating-home-loan-singapore.html · refinance-vs-reprice-home-loan-singapore.html · cpf-oa-vs-cash-for-home-loan-singapore.html · keep-cash-buffer-vs-partial-home-loan-prepayment-singapore.html · fixed-rate-certainty-vs-larger-cash-buffer-singapore.html · use-cpf-oa-vs-preserve-cash-buffer-for-home-loan-singapore.html · refinance-now-vs-wait-for-more-rate-clarity-singapore.html · pay-down-mortgage-vs-invest-singapore.html · mortgage-interest-cost-singapore.html · (+ full mortgage servicing sub-branch)

**Ownership / holding cost**
property-ownership-cost-singapore.html · condo-ownership-cost.html · rental-property-ownership-cost.html · property-tax-singapore.html · home-maintenance-cost-singapore.html · condo-maintenance-fees-mcst-sinking-fund-singapore.html

**Sell / move / execution friction**
sell-property-cost-singapore.html · property-sell-buy-pipeline-calculator-singapore.html · bridging-loan-singapore.html · option-to-purchase-otp-singapore.html · selling-property-timeline-singapore.html · (+ full seller execution sub-branch)

**Rental / landlord friction**
rent-out-vs-sell-singapore.html · gross-vs-net-rental-yield-singapore.html · vacancy-turnover-cost-rental-property-singapore.html · how-to-screen-tenants-singapore.html · (+ full landlord operating sub-branch)

**HDB rules / grants / process**
minimum-occupation-period-mop-singapore.html · resale-levy-singapore.html · enhanced-cpf-housing-grant-ehg-singapore.html · family-grant-singapore.html · proximity-housing-grant-phg-singapore.html · bto-ballot-and-wait-time-singapore.html · (+ full HDB sub-branch)

**Ownership structure / co-ownership / inheritance**
joint-tenancy-vs-tenancy-in-common-singapore.html · property-decoupling-singapore.html · buying-property-with-parents-or-family-singapore.html · what-happens-to-property-when-an-owner-dies-singapore.html · selling-an-inherited-property-singapore.html

**EC / route selection**
executive-condo-ec-eligibility-singapore.html · should-you-buy-an-executive-condo-singapore.html · executive-condo-ec-vs-condo-singapore.html · new-launch-vs-resale-condo-singapore.html

**Unit selection / liveability trade-offs**
freehold-vs-leasehold-singapore.html · bigger-home-farther-out-vs-smaller-home-better-location-singapore.html · move-house-for-school-vs-stay-put-singapore.html · live-near-parents-vs-live-near-school-singapore.html · 2-bedroom-vs-3-bedroom-condo-singapore.html · 4-room-vs-5-room-hdb-singapore.html · (+ full unit-selection sub-branch)

**Post-purchase / move-in execution**
move-in-ready-vs-renovate-singapore.html · defects-and-snagging-after-handover-singapore.html · furnish-all-at-once-or-phase-it-singapore.html

**Right-sizing / later-life re-fit**
should-you-downsize-your-home-singapore.html · release-cash-by-moving-to-smaller-home-singapore.html · downsizing-to-hdb-or-condo-later-life-singapore.html

---

### Family/Children (~23 pages) 🟡 Growing and now structurally integrated

**Current state:** Launched in v0205 and deepened through v0255. Cluster now has a live hub, native header/footer/start-here integration, Family search/related-graph support in `includes.js`, cross-links into selected property and transport pages, a broader education-cost ladder extending from preschool to university, a family–property bridge layer covering school-driven moves, location trade-offs, housing stretch versus education capacity, and mortgage reduction versus university saving, a family–liquidity bridge layer covering pre-baby reserve sequencing, second-child buffer redesign, school-fee sinking-fund separation, university saving versus parental retirement strength, and an aging-parents branch covering elder-support protection sequencing, reserve redesign, housing order, transport order, investing/retirement priority, caregiving delivery, medical-financing sequence, work/career trade-offs, sibling coordination, legal readiness, living-arrangement sequencing, estate-readiness sequencing, post-hospital transition sequencing, cognitive-decline sequencing, financial-safety sequencing, end-of-life / palliative-transition sequencing, and mobility-decline / accessibility sequencing.

**Early-years / arrival / care branch**
cost-of-having-a-baby-singapore.html · infantcare-vs-childcare-cost-singapore.html · maid-vs-infantcare-cost-singapore.html · stay-at-home-parent-vs-infantcare-cost-singapore.html · how-much-does-preschool-cost-singapore.html

**School-stage / supervision / education-spend branch**
how-much-does-primary-school-cost-singapore.html · student-care-vs-after-school-care-cost-singapore.html · student-care-vs-tuition-cost-singapore.html · how-much-does-secondary-school-cost-singapore.html · tuition-cost-singapore.html · enrichment-classes-cost-singapore.html · tuition-vs-enrichment-classes-cost-singapore.html · how-much-does-junior-college-cost-singapore.html · polytechnic-vs-junior-college-cost-singapore.html · polytechnic-vs-university-cost-singapore.html · how-much-does-university-cost-singapore.html · local-university-vs-overseas-university-cost-singapore.html

**Household scaling / anchor pages**
how-much-does-it-cost-to-raise-a-child-singapore.html · cost-of-having-a-second-child-singapore.html

**Cross-cluster bridges**
should-i-buy-bigger-home-before-having-kids-singapore.html · move-house-for-school-vs-stay-put-singapore.html · live-near-parents-vs-live-near-school-singapore.html · bigger-home-vs-education-budget-singapore.html · pay-down-mortgage-vs-save-for-university-singapore.html · family-car-decision-after-baby-singapore.html · how-having-a-child-affects-tdsr-borrowing-capacity-singapore.html · protection-gap-after-having-a-baby-singapore.html · should-you-build-your-emergency-fund-before-having-a-baby-singapore.html · how-a-second-child-changes-your-cash-buffer-plan-singapore.html · school-fee-sinking-fund-vs-emergency-fund-singapore.html · save-for-university-vs-strengthen-your-own-retirement-first-singapore.html · term-life-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html · disability-income-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html · hospitalisation-rider-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html · how-supporting-aging-parents-changes-your-cash-buffer-plan-singapore.html · help-aging-parents-now-vs-strengthen-your-own-retirement-first-singapore.html · top-up-parents-cpf-vs-preserve-your-own-cash-buffer-singapore.html · monthly-support-for-aging-parents-vs-build-bigger-emergency-fund-singapore.html · how-supporting-aging-parents-changes-your-investing-priority-order-singapore.html

**Hub**
family/index.html

**Build rule going forward**
Family is now an active cluster, not a future concept. New family pages should be added to the Family hub, Family related-link graph in `includes.js`, and only bridged into property/transport where the connection is natural and specific.

**Current expansion rule**
Family should now be treated as a full lifecycle cost cluster. New pages should preserve stage-specific roles rather than collapsing multiple education phases into one master article.

**New in v0254 (aging parents × end-of-life / palliative transition):** palliative-care-vs-continuing-aggressive-treatment-for-aging-parents-singapore.html · home-hospice-vs-institutional-end-of-life-care-for-aging-parents-singapore.html · practical-end-of-life-planning-for-aging-parents-singapore.html · how-supporting-aging-parents-changes-your-end-of-life-decision-order-singapore.html

**New in v0253 (aging parents × financial safety):** early-scam-warning-signs-vs-waiting-for-a-bigger-financial-loss-with-aging-parents-singapore.html · help-with-banking-vs-keep-full-financial-independence-for-aging-parents-singapore.html · sharing-banking-passwords-or-otps-vs-safer-payment-support-for-aging-parents-singapore.html · how-supporting-aging-parents-changes-your-financial-safety-decision-order-singapore.html

**New in v0252 (aging parents × cognitive decline):** early-memory-decline-vs-waiting-for-clearer-dementia-signs-singapore.html · supervision-at-home-vs-independent-living-for-aging-parents-with-cognitive-decline-singapore.html · memory-care-vs-general-eldercare-setting-for-aging-parents-singapore.html · how-supporting-aging-parents-changes-your-cognitive-decline-decision-order-singapore.html

**New in v0251 (aging parents × post-hospital transition):** hospital-discharge-planning-for-aging-parents-singapore.html · rehab-vs-home-recovery-support-for-aging-parents-singapore.html · respite-care-vs-running-on-family-burnout-when-supporting-aging-parents-singapore.html · how-supporting-aging-parents-changes-your-post-hospital-decision-order-singapore.html

**New in v0250 (aging parents × estate readiness):** make-a-will-for-aging-parents-singapore.html · cpf-nomination-for-aging-parents-singapore.html · estate-document-readiness-for-aging-parents-singapore.html · how-supporting-aging-parents-changes-your-estate-readiness-decision-order-singapore.html

**New in v0249 (aging parents × living arrangement):** aging-in-place-vs-moving-in-with-aging-parents-singapore.html · home-modifications-vs-relocating-for-aging-parents-singapore.html · home-care-vs-nursing-home-for-aging-parents-singapore.html · how-supporting-aging-parents-changes-your-living-arrangement-decision-order-singapore.html

**New in v0248 (aging parents × legal readiness):** lasting-power-of-attorney-for-aging-parents-singapore.html · advance-care-planning-for-aging-parents-singapore.html · who-should-manage-eldercare-decisions-in-the-family-singapore.html · how-supporting-aging-parents-changes-your-legal-readiness-decision-order-singapore.html

---

### Protection / Insurance (~27 pages) 🟡 Growing and structurally integrated

**Current state:** Launched in v0210 and deepened through v0242. Cluster now has a live hub, native header/footer/start-here integration, Protection search/related-graph support in `includes.js`, a clear internal ladder from medical-cover structure to life-insurance sizing, critical-illness sizing, disability-income sizing, accident-cover, hospital-cash add-on judgment, and a growing bridge layer linking Protection to Family, Property, employment status, debt stage, dependency level, multi-generational obligations, mortgage-stage liquidity trade-offs, single-income housing risk, first-child sequencing, motorcycle-specific protection sequencing, and aging-parent support sequencing.

**Medical / health-cover structure**
hospitalisation-insurance-vs-rider-cost-singapore.html · critical-illness-insurance-cost-singapore.html · hospital-cash-insurance-worth-it-singapore.html · critical-illness-vs-hospitalisation-insurance-singapore.html · hospitalisation-insurance-vs-accident-insurance-singapore.html · hospital-cash-vs-critical-illness-insurance-singapore.html · accident-insurance-vs-critical-illness-insurance-singapore.html

**Life-insurance / income-protection / sizing**
term-life-vs-whole-life-cost-singapore.html · how-much-life-insurance-do-you-need-singapore.html · disability-income-insurance-cost-singapore.html · how-much-disability-income-insurance-do-you-need-singapore.html · term-life-vs-critical-illness-insurance-singapore.html · accident-insurance-cost-singapore.html · accident-insurance-vs-disability-income-insurance-singapore.html · term-life-vs-disability-income-insurance-singapore.html

**Critical-illness / protection-purpose comparison**
critical-illness-insurance-cost-singapore.html · early-critical-illness-vs-critical-illness-singapore.html · critical-illness-vs-hospitalisation-insurance-singapore.html · whole-life-vs-critical-illness-insurance-singapore.html · how-much-critical-illness-insurance-do-you-need-singapore.html · critical-illness-vs-disability-income-insurance-singapore.html

**Property–Protection bridge**
home-protection-scheme-vs-term-life-insurance-singapore.html
how-buying-an-investment-property-changes-your-insurance-needs-singapore.html

**Family–Protection bridge**
how-a-second-child-changes-your-insurance-needs-singapore.html
how-marriage-changes-your-insurance-needs-singapore.html
how-a-property-upgrade-changes-your-insurance-needs-singapore.html
when-insurance-starts-to-matter-more-than-investing-singapore.html
disability-income-insurance-vs-bigger-cash-buffer-with-mortgage-singapore.html · critical-illness-insurance-vs-bigger-cash-buffer-with-mortgage-singapore.html · hospitalisation-rider-vs-bigger-cash-buffer-with-mortgage-singapore.html · term-life-vs-cash-buffer-for-single-income-mortgage-singapore.html
how-becoming-self-employed-changes-your-insurance-needs-singapore.html
how-a-single-income-household-changes-your-insurance-needs-singapore.html
how-supporting-aging-parents-changes-your-insurance-needs-singapore.html
term-life-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html · disability-income-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html · hospitalisation-rider-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html · how-supporting-aging-parents-changes-your-cash-buffer-plan-singapore.html · help-aging-parents-now-vs-strengthen-your-own-retirement-first-singapore.html · top-up-parents-cpf-vs-preserve-your-own-cash-buffer-singapore.html · monthly-support-for-aging-parents-vs-build-bigger-emergency-fund-singapore.html · how-supporting-aging-parents-changes-your-investing-priority-order-singapore.html
how-divorce-changes-your-insurance-needs-singapore.html
how-retirement-changes-your-insurance-needs-singapore.html
emergency-fund-vs-term-life-insurance-first-singapore.html
emergency-fund-vs-hospitalisation-rider-first-singapore.html

**Hub**
protection/index.html

**Build rule going forward**
Protection is now an active cluster, not a future concept. New protection pages should be added to the Protection hub, Protection related-link graph in `includes.js`, and only bridged into Family, Property, or Transport where the connection is specific and not generic.

**Current expansion rule**
Protection should continue to branch carefully by protection purpose. New pages should preserve role clarity between sizing, product-structure comparison, income protection, accident-event cover, illness-event protection, medical-cover structure, and bridge pages only where the purpose distinction is still clean. Family–Protection and Property–Protection bridge pages now cover baby, second-child, marriage, home-loan, and property-upgrade transitions, while a broader protection-versus-investing priority page also exists. Future bridge pages should stay explicit and narrow rather than becoming generic cross-cluster essays.

---

### Investing / Liquidity (growing and structurally integrated) 🟡

**Current state:** Launched in v0222 and deepened through v0228. All 15 pages now indexed in SITE. Hub has dynamic section. Cluster now has a live hub, Topics-dropdown/header/footer/start-here integration, an `investing` SITE entry in `includes.js`, homepage support, and a liquidity-first wedge covering emergency-fund sizing, storage, sequencing, reserve design, drawdown rules, rebuild logic, account splitting, instant-access layering, and the boundary between reserve cash and risk assets. It now also covers sizing variants for irregular income, households with children, and households carrying a mortgage.

**Current page set**
- `investing/index.html`
- `how-much-emergency-fund-do-you-need-singapore.html`
- `where-to-keep-your-emergency-fund-singapore.html`
- `when-to-invest-vs-build-your-emergency-fund-first-singapore.html`
- `emergency-fund-vs-sinking-fund-singapore.html`
- `when-to-use-your-emergency-fund-singapore.html`
- `how-to-rebuild-your-emergency-fund-after-using-it-singapore.html`
- `should-you-split-your-emergency-fund-across-accounts-singapore.html`
- `how-much-of-your-emergency-fund-should-stay-instant-access-singapore.html`
- `should-you-invest-part-of-your-emergency-fund-singapore.html`
- `how-to-size-an-emergency-fund-if-your-income-is-irregular-singapore.html`
- `how-having-children-changes-your-emergency-fund-size-singapore.html`
- `how-having-a-mortgage-changes-your-emergency-fund-size-singapore.html`
- `pay-down-debt-vs-build-emergency-fund-singapore.html`
- `save-more-vs-buy-more-insurance-singapore.html`

**Rules for future Investing pages**
- Keep this cluster distinct from Financing. Financing is debt/funding structure; Investing starts with liquidity, sequencing, and later capital-allocation logic.
- Do not touch `featured.json` `cluster_pages` manually during normal bundle builds; only update `new[]`.
- New investing pages should preserve the liquidity-first wedge until the cluster has enough depth to branch into broader investing topics.

### Future clusters (not started, long-term)
- Investments (CPF investment, stocks, REITs, etc.)
- Luxury assets (watches, yachts, art) — analytical tone, slightly aspirational
- Others TBD — list is intentionally non-exhaustive

---

## 9. Version History (Recent)

| Version | Branch |
|---------|--------|
| v0175 | Property buy-side execution mechanics |
| v0176 | EC / condo route-selection branch |
| v0177 | Used-car due-diligence branch |
| v0178 | Car exit / seller-decision branch |
| v0179 | Property due-diligence / pre-commitment branch |
| v0180 | Landlord operating-friction branch |
| v0181 | Alternative car-access / off-peak / subscription branch |
| v0182 | Rental pricing / vacancy-control branch |
| v0183 | Transport maintenance / repair-decision branch |
| v0184 | Property unit-selection / asset-quality trade-offs |
| v0185 | Transport post-incident / claims / downtime branch |
| v0186 | Property seller execution / listing-discipline branch |
| v0187 | Transport household-fit / car-type choice branch |
| v0188 | Property post-purchase setup / move-in execution branch |
| v0189 | Transport financed exit / upgrade-timing branch |
| v0190 | Property mortgage servicing / repayment strategy branch |
| v0191 | Used-car listing / deal-discipline branch + broken-link hotfix |
| v0192 | Property exit-readiness / pre-list execution branch |
| v0193 | Hybrid decision branch |
| v0194 | Property household-fit / liveability-planning branch |
| v0195 | Transport insurance structure / policy-fit branch |
| v0196 | Property right-sizing / later-life housing re-fit |
| v0197 | Transport aging-car economics / reliability branch |
| v0198 | Motorcycle affordability / used-vs-new / loan-vs-cash branch |
| v0199 | Used-motorcycle diligence branch |
| v0200 | Used-motorcycle records + pre-commitment branch |
| v0201 | Motorcycle insurance / maintenance / upfront-cash branch |
| v0202 | Motorcycle depreciation / financed exit / pre-COE sale timing branch |
| v0203 | Motorcycle renewal / replace branch + same-page anchor hotfix sweep |
| v0204 | Motorcycle sell-side execution branch |
| v0205 | Family cluster launch: hub + baby cost + infantcare vs childcare + child-cost anchor |
| v0206 | Family early-years care alternatives + preschool branch |
| v0207 | Family primary-school / post-school care / second-child branch |
| v0208 | Family secondary-school / tuition / enrichment branch |
| v0209 | Family junior-college / JC-vs-poly / university branch |
| v0210 | Protection / Insurance cluster launch: hub + hospitalisation vs rider + term vs whole life + life-insurance sizing |
| v0210 | Protection cluster launch: life insurance, term vs whole life, hospitalisation vs rider |
| v0210.1 | FAQ schema added to 142 pages; nav header redesigned with Topics dropdown; 2 invalid schema fixes |
| v0211 | Protection deepening: disability-income + critical-illness + term-vs-CI comparison; FAQ schema standardised across remaining hubs/calculators |
| v0212 | Protection deepening: accident insurance + hospital cash + CI-vs-hospitalisation comparison; FAQ schema completion closed across all current FAQ-bearing pages |
| v0212.1 | Search fix (includes.js overwrite recurrence fixed); 9 family pages missing refs fixed; auto-related div added to 41 pages; CI vs hospitalisation page expanded to 1,610w |
| v0213 | Protection deepening: early CI vs CI, hospitalisation vs accident, whole life vs CI |
| v0214 | Cross-cluster bridge pages (5 pages): property×family, transport×family, property/financing×family, protection×property, protection×family; v0213 fixes (dup Last updated, 2 short pages, 3 new pages missing from search index) |
| v0214.1 | Internal linking audit (0 orphans fixed, 34 links added); dynamic homepage with featured.json; how-much-does-it-cost-to-raise-a-child refs fixed |
| v0215 | Protection sizing branch: how much CI, how much disability-income cover, and CI-vs-disability-income comparison; featured.json updated |
| v0216 | Protection comparison branch: accident-vs-disability-income, hospital-cash-vs-CI, and HPS-vs-term-life bridge; featured.json updated |
| v0217 | Protection bridge/comparison branch: accident-vs-critical-illness, term-life-vs-disability-income, and second-child protection review bridge; auto-related placement normalized on affected content/calculator pages |
| v0218 | Protection bridge branch: marriage-stage protection review, property-upgrade protection review, and insurance-vs-investing priority framework |
| v0219 | Protection bridge branch: self-employment, single-income household, and aging-parent support protection review pages |
| v0220 | Protection bridge branch: divorce reset, investment-property protection review, and retirement-stage protection review pages |
| v0220.1 | Sweep: 6 pages added to search index; 6 duplicate References fixed; 4 pages FAQ added; 15 short pages expanded to 1500w+; featured.json capped at 5 items; 7 inbound links added |
| v0220.2 | Dynamic homepage/hubs rebuilt (date-sorted, configurable max); email capture added to includes.js (disabled until Google Apps Script URL set); featured.json rebuilt with accurate dates |
| v0220.2a | Email capture styling updated to match site .box card style with blue left border accent |
| v0220.2b | Email capture CORS fix: switched to no-cors mode + URL-encoded form data (application/x-www-form-urlencoded); Apps Script updated to use e.parameter instead of JSON.parse |
| v0220.2c | Google Apps Script URL activated: emailCaptureUrl set to live endpoint in includes.js SETTINGS |

---

## 10. SEO Status

- ✅ Canonical tags on all pages (injected via includes.js)
- ✅ Sitemap at /sitemap.xml (~118 URLs)
- ✅ FAQPage schema now standardised across all current FAQ-bearing pages
- ✅ "Last updated" visible on all pages (freshness signal)
- ✅ URL pattern: `{topic}-singapore.html`
- ⚠️ Article schema only on ~3 pages (expand to top traffic pages opportunistically)
- ⚠️ HowTo schema: 0 pages (add to checklist pages opportunistically)
- ⚠️ Some meta tag inconsistency: standardise to `name="og:cluster"` not `property="og:cluster"`

---

## 11. Publishing Pace & Working Style

- **No fixed cadence** — publish when ready, no pressure to ship on a schedule
- **Careful, systematic, conservative** — do not rewrite good pages unnecessarily
- **Cluster-level thinking** — always think in branches, not isolated pages
- **Cannibalisation check required** before any new page proposal
- **Do not jump into random additions** — every new page needs a clear place in the hierarchy

---

## 12. How to Start a Session

**Strategy session** (big picture, no files needed)
→ Paste this brief only. Ask your question.

**Build session** (adding/editing pages)
→ Paste this brief + attach the zip or specific file(s) to work on
→ State: what cluster, what branch, what the goal is

**Audit session** (checking health)
→ Paste this brief + attach zip
→ Ask for: internal links, schema gaps, cluster completeness, cannibalisation check

**First thing any AI should do in a build session:**
1. Run post-push audit of the uploaded source
2. Check: internal links, duplicate Last updated, shell headings, page endings
3. Report site health
4. Then propose next bundle with cannibalisation mapping

---

---

## 13. Working Preferences & Session Conventions

*These apply to Claude and ChatGPT alike. They were established over many sessions and should not require re-explanation in each new chat.*

### Bundle size & pace
- Prefer meaningful bundles — typically 3–5 new pages plus any tightly scoped fixes
- Do not create churn for the sake of activity
- Do not rewrite good pages unnecessarily
- Small hotfixes are allowed when warranted; they do not need to be bundled with new content

### Recommendation style
- Give one clear concrete recommendation, not a menu of equal options
- Run audit first, then recommend — do not propose next version before seeing source state
- When suggesting a new cluster, explain why now is the right timing vs continuing the current one
- Prefer compounding content depth over random breadth unless there is a strong reason to open a new branch

### Audit discipline
- Always verify against the actual uploaded source before making claims
- If a finding is uncertain, do not state it confidently — flag it as uncertain
- Known false positives to avoid flagging:
  - Pages using `<h3>References (starting points)</h3>` or `Sources & references` — these are valid reference sections
  - Hub pages (`transport/`, `property/`, `family/`, `protection/`, `investing/` index.html) intentionally excluded from auto-related and some other checks
  - Do not assume a live-site issue is a source issue without confirming in the uploaded source

### includes.js discipline
- Never regenerate includes.js from scratch — only make minimal targeted edits
- After every edit: run `node --check includes.js` before packaging
- Never drop: family/protection/investing SITE entries, URL scoring in scoreResult(), emailCaptureUrl setting
- When inserting a new cluster into SITE, always add a comma after the previous cluster's closing `}` before the new cluster key

### Output format (every session)
- Return changed files only — never the full repo zip
- Always include: changed files list, what was done, validation summary, commit message
- If something is not fully compliant, say so plainly rather than claiming it is done
- If there is a mismatch between what you see in the uploaded zip and what I see locally, call it out explicitly

### Tone
- Practical, direct, low-drama
- No fluff, no excessive caveats
- Treat the owner as someone who understands the site well

### Division of labour
- **ChatGPT:** content expansion (new pages, cluster deepening)
- **Claude:** sweeps, structural fixes, schema, search index, featured.json regeneration, enhancements (dynamic features, email capture, UX improvements)
- Claude does not propose new content pages — that is ChatGPT's job


*This brief is the single source of truth for all sessions — Claude and ChatGPT alike.*
*Update the version number and version history table whenever a new version ships.*

| v0221 | Protection bridge expansion: mortgage-free, job-change, and no-dependants transition pages |
| v0222 | Investing cluster launch: hub + emergency-fund sizing, storage, and invest-vs-buffer sequencing pages |
| v0223 | Investing liquidity deepening: emergency-fund vs sinking fund, when to use the fund, and how to rebuild after using it |
| v0224 | Investing liquidity deepening: account-splitting, instant-access layering, and whether part of the reserve should be invested |

| v0225 | Investing liquidity deepening: irregular-income, children, and mortgage-based emergency-fund sizing variants, plus targeted auto-related placement fixes |
| v0225.1 | Sweep: investing cluster (12 pages) added to SITE search index; featured.json regenerated with investing cluster; _project-brief.md updated with working preferences section and ChatGPT handoff conventions |
| v0225.2 | Hotfix sweep: removed invisible control-character corruption from 9 family/education pages, fixed 5 content-after-References regressions, added missing FAQ blocks/schema to key calculator and routing pages, and updated _project-brief.md; changed-files-only zip returned for GitHub upload |
| v0226 | Family education comparison deepening: added tuition-vs-enrichment-classes-cost-singapore.html, student-care-vs-tuition-cost-singapore.html, polytechnic-vs-university-cost-singapore.html, and local-university-vs-overseas-university-cost-singapore.html; updated sitemap.xml, includes.js family SITE/related graph, featured.json new[], and _project-brief.md |
| v0227 | Family × Property bridge expansion: added move-house-for-school-vs-stay-put-singapore.html, bigger-home-vs-education-budget-singapore.html, pay-down-mortgage-vs-save-for-university-singapore.html, and live-near-parents-vs-live-near-school-singapore.html; updated sitemap.xml, includes.js property/family SITE and bridge graph, featured.json new[], and _project-brief.md |

| v0228 | Protection × Investing bridge expansion: added emergency-fund-vs-term-life-insurance-first-singapore.html, emergency-fund-vs-hospitalisation-rider-first-singapore.html, pay-down-debt-vs-build-emergency-fund-singapore.html, and save-more-vs-buy-more-insurance-singapore.html; updated includes.js SITE/bridge graph, sitemap.xml, featured.json new[], _project-brief.md, and validated auto-related/reference placement fixes on selected legacy property pages |
| v0233.1 | Sweep: 3 orphans fixed (25 links added); 4 property pages added to SITE search index; 26 low-inbound pages — top 9 boosted; family hub +8 pages, investing hub +7, protection hub +3; generate-sitemap.py added (357 URLs, auto-generated); featured.json regenerated (127 pages, 5 clusters) |
| v0233.2 | UX + interlinking pass: 8 family pages added to related graph; 11 pillar→new-page links added (car/property/family/protection pillars); generate-featured.py added; featured.json regenerated; hub pages updated (family +8, investing +7, protection +3) |
| v0234 | UX overhaul: Next Steps calculator routing fixed (family/protection/investing now show hub links instead of wrong car calculator); homepage stale sections removed, Protection + Investing journey rows added to Recommended Journeys; financing hub: dynamic section added + 4 missing pages; sitemap regenerated (357 URLs); featured.json regenerated |
| v0234.1 | Hotfix: financing hub dynamic section moved inside <main> (was rendering after </html>, causing display below footer); sweep clean |
| v0235 | UX + SEO pass: Article schema added to 29 high-traffic pages (51 total); search: pillar boost + no-results suggestions; financing hub dynamic section fixed (before References, inside main); comparisons hub: Family/Protection/Investing sections added (22 new comparison links); start-here: Protection + Investing cards updated, "If your situation changed recently" life-stage section added |
| v0235 | UX + SEO bundle: financing hub dynamic section placement fixed; Article schema added to 29 high-traffic pages (51 total); search pillar boost + no-results updated to all 5 clusters; comparisons hub: 9 missing pages added (4 family, 5 motorcycle); start-here: life-stage cross-cluster entry section added; sitemap + featured.json regenerated |
| v0247 | Sweep + UX fixes: 2 invalid schema fixed; 1 orphan fixed (4 links); comparisons hub +2 aging-parent entries; 10 inbound links added to 6 low-traffic pages; Topics nav hover fixed (CSS gap removed, JS hover-open class added — was requiring click to keep dropdown open); sitemap regenerated (401 URLs); featured.json regenerated (171 pages, 5 clusters) |
| v0247 (full) | Article schema: added to 141 more pages (212 total, all eligible content pages); featured.json: pinned[] added per cluster (foundational pages always surface first in hub); hub pages: "Where to start + recent" replaces "Recently updated" — pinned pages shown first; start-here: aging-parents cross-cluster path added to Common life situations; generate-featured.py updated to preserve pinned on regeneration |

| v0255 | Family accessibility deepening: added early-fall-risk-vs-waiting-for-a-major-fall-with-aging-parents-singapore.html, walker-friendly-home-vs-wheelchair-ready-home-for-aging-parents-singapore.html, medical-escort-and-transport-vs-ad-hoc-family-driving-for-aging-parents-singapore.html, and how-supporting-aging-parents-changes-your-mobility-decline-decision-order-singapore.html; updated sitemap.xml, includes.js family SITE/related graph, family/index.html, comparisons/index.html, featured.json new[], and _project-brief.md |
