# Ownership Guide — Master Project Brief
> Paste this at the start of every Claude or ChatGPT session to restore full context instantly.
> Last updated: March 2026 · Based on repo v0212

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
- **Now:** Transport, Property, Family/Children, Protection/Insurance
- **Future clusters (non-exhaustive):** Investments, luxury assets (watches, yachts, art), other wealth ownership topics
- The site name "Ownership Guide" was chosen deliberately to be non-restrictive — it can cover any major ownership decision
- Luxury content tone: **slightly more aspirational but still analytical** — same decision-framework DNA, elevated subject matter. E.g. "5-year total cost of watch ownership including service intervals, resale depreciation by brand, and authentication friction at exit."

### Monetisation goals (in order)
1. **Google AdSense** — approved and live (Auto Ads). Primary current revenue.
2. **Affiliate/referral marketing** — not started yet. Natural future layer: insurance comparison, mortgage brokers, car loan comparison (SingSaver/MoneySmart-type programs)
3. **Sponsored content** — possible later

---

## 2. Technical Stack

**Repo:** Static HTML site. No CMS, no React, no build pipeline. Pure HTML + CSS + vanilla JS.
**Hosting:** GitHub Pages (or equivalent static host)
**Current version:** v0212

### Key files
| File | Purpose |
|------|---------|
| `includes.js` | ⚠️ Central nervous system — controls ALL shared behaviour. See Section 5. |
| `styles.css` | Global stylesheet (~28KB) |
| `index.html` | Homepage |
| `sitemap.xml` | ~286 URLs |
| `footer.html` | Shared footer partial |
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

## 7. Current Site Health (as of v0212)

- ✅ 0 broken internal links
- ✅ No duplicate Last updated regressions
- ✅ No shell/empty heading regressions
- ✅ No content-after-References regressions
- ✅ No header/footer source regression
- ✅ AdSense Auto Ads live and working
- ✅ GA4 tracking active
- ✅ Structurally healthy and visually stable

**Current mode:** Content compounding. Protection / Insurance has now been deepened further into accident-cover, hospital-cash, and CI-vs-hospitalisation distinction pages. FAQPage schema has now been standardised across all current FAQ-bearing pages. Still not in cleanup mode and not in aesthetics mode.

### Known background standards debt (opportunistic cleanup only, not standalone priority)
Older pages that predate current standards — fix when touched, not as a dedicated pass:
- `car-ownership-cost.html`
- `car-maintenance-repair-cost-singapore.html`
- `how-much-cash-to-buy-car-singapore.html`
- `property-ownership-cost-singapore.html`
- `used-car-vs-new-car-singapore.html`

---

## 8. Cluster Status

### Transport (~100 pages) ✅ Very strong and broad

**Ownership / running cost / affordability**
car-ownership-cost.html · car-ownership-cost-per-year-singapore.html · monthly-cost-of-owning-a-car-singapore.html · fuel-cost-singapore.html · parking-cost-singapore.html · erp-cost-singapore.html · road-tax-cost-singapore.html · car-maintenance-repair-cost-singapore.html · car-insurance-cost-singapore.html · car-insurance-excess-and-claims-singapore.html · no-claim-discount-ncd-singapore.html · car-affordability-calculator-singapore.html · how-much-salary-to-own-a-car-singapore.html · how-much-cash-to-buy-car-singapore.html

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
motorcycle-ownership-cost-singapore.html · motorcycle-insurance-cost-singapore.html · motorcycle-maintenance-cost-singapore.html · motorcycle-vs-car-cost-singapore.html · motorcycle-depreciation-singapore.html · (+ full used/exit/COE sub-branch)

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

### Property (~92 pages) ✅ Very strong and broad

**Financing / borrowing / entry mechanics**
tdsr-msr-singapore.html · loan-to-value-ltv-singapore.html · in-principle-approval-home-loan-singapore.html · cash-over-valuation-cov-singapore.html · how-much-cash-to-buy-property-singapore.html · hdb-loan-vs-bank-loan-singapore.html · fixed-vs-floating-home-loan-singapore.html · refinance-vs-reprice-home-loan-singapore.html · cpf-oa-vs-cash-for-home-loan-singapore.html · pay-down-mortgage-vs-invest-singapore.html · mortgage-interest-cost-singapore.html · (+ full mortgage servicing sub-branch)

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
freehold-vs-leasehold-singapore.html · bigger-home-farther-out-vs-smaller-home-better-location-singapore.html · 2-bedroom-vs-3-bedroom-condo-singapore.html · 4-room-vs-5-room-hdb-singapore.html · (+ full unit-selection sub-branch)

**Post-purchase / move-in execution**
move-in-ready-vs-renovate-singapore.html · defects-and-snagging-after-handover-singapore.html · furnish-all-at-once-or-phase-it-singapore.html

**Right-sizing / later-life re-fit**
should-you-downsize-your-home-singapore.html · release-cash-by-moving-to-smaller-home-singapore.html · downsizing-to-hdb-or-condo-later-life-singapore.html

---

### Family/Children (~15 pages) 🟡 Growing and now structurally integrated

**Current state:** Launched in v0205 and deepened through v0209. Cluster now has a live hub, native header/footer/start-here integration, Family search/related-graph support in `includes.js`, cross-links into selected property and transport pages, and a clearer education-cost ladder extending from preschool to university.

**Early-years / arrival / care branch**
cost-of-having-a-baby-singapore.html · infantcare-vs-childcare-cost-singapore.html · maid-vs-infantcare-cost-singapore.html · stay-at-home-parent-vs-infantcare-cost-singapore.html · how-much-does-preschool-cost-singapore.html

**School-stage / supervision / education-spend branch**
how-much-does-primary-school-cost-singapore.html · student-care-vs-after-school-care-cost-singapore.html · how-much-does-secondary-school-cost-singapore.html · tuition-cost-singapore.html · enrichment-classes-cost-singapore.html · how-much-does-junior-college-cost-singapore.html · polytechnic-vs-junior-college-cost-singapore.html · how-much-does-university-cost-singapore.html

**Household scaling / anchor pages**
how-much-does-it-cost-to-raise-a-child-singapore.html · cost-of-having-a-second-child-singapore.html

**Hub**
family/index.html

**Build rule going forward**
Family is now an active cluster, not a future concept. New family pages should be added to the Family hub, Family related-link graph in `includes.js`, and only bridged into property/transport where the connection is natural and specific.

**Current expansion rule**
Family should now be treated as a full lifecycle cost cluster. New pages should preserve stage-specific roles rather than collapsing multiple education phases into one master article.

---

### Protection / Insurance (~10 pages) 🟡 Growing and structurally integrated

**Current state:** Launched in v0210 and deepened through v0212. Cluster now has a live hub, native header/footer/start-here integration, Protection search/related-graph support in `includes.js`, and a clearer internal ladder from medical-cover structure to life-insurance sizing, disability-income protection, accident-cover, hospital-cash add-on judgment, critical-illness cover, and protection-purpose comparison.

**Medical / health-cover structure**
hospitalisation-insurance-vs-rider-cost-singapore.html · critical-illness-insurance-cost-singapore.html · hospital-cash-insurance-worth-it-singapore.html · critical-illness-vs-hospitalisation-insurance-singapore.html

**Life-insurance / income-protection / sizing**
term-life-vs-whole-life-cost-singapore.html · how-much-life-insurance-do-you-need-singapore.html · disability-income-insurance-cost-singapore.html · term-life-vs-critical-illness-insurance-singapore.html · accident-insurance-cost-singapore.html

**Hub**
protection/index.html

**Build rule going forward**
Protection is now an active cluster, not a future concept. New protection pages should be added to the Protection hub, Protection related-link graph in `includes.js`, and only bridged into Family, Property, or Transport where the connection is specific and not generic.

**Current expansion rule**
Protection should continue to branch carefully by protection purpose. New pages should preserve role clarity between sizing, product-structure comparison, income protection, accident-event cover, illness-event protection, and medical-cover structure.

---

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

*This brief is the single source of truth for all sessions — Claude and ChatGPT alike.*
*Update the version number and version history table whenever a new version ships.*
