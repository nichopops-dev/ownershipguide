(async function () {
  const OG_INCLUDES_VERSION = "v0127.0-protection-launch";
  try { document.documentElement.dataset.ogIncludesVersion = OG_INCLUDES_VERSION; } catch(e) {}
  try { console.log("[OwnershipGuide] includes.js", OG_INCLUDES_VERSION); } catch(e) {}

  // =========================
  // 0) SETTINGS (edit only here)
  // =========================
  const SETTINGS = {
    // Content editing guardrail:
    // For calculator pages, keep ONE FAQ section and ONE 'Last updated' line inside <main>.
    // When adding Calculator Kit blocks, merge into existing editorial sections—do not append duplicates.
    enableHeaderFooter: true,

    // Site base URL (for canonical/OG tags)
    siteBaseUrl: "https://ownershipguide.com",

    // Analytics (Google Analytics 4)
    enableGA4: true,
    ga4MeasurementId: "G-RH8YDW5LFP",

    // AdSense Auto Ads
    // Email capture (set to your Google Apps Script web app URL, leave empty to disable)
    emailCaptureUrl: "https://script.google.com/macros/s/AKfycbymgo2k_2loWUwDzuCbtEDOMEYeGzQC1FRj7zOYVl5GG5Sv4C2f82oH4QEnnHPuu7s/exec",

    enableAdSenseAutoAds: true,
    adSenseClientId: "ca-pub-8718234605112874",

    // Auto insert ad slots (optional)
    enableAutoAdSlots: false,
    autoAdSlotAfterH2: 2,
    maxAutoAdSlots: 2,
    minH2ForAdSlots: 3,
    skipAdSlotsOn: [
      "/",
      "/index.html",
      "/404.html",
      "/car-vs-ride-hailing-calculator.html",
      "/transport/",
      "/property/",
      "/family/",
      "/protection/",
      "/investing/"
    ],

    // Announcement banner (optional)
    enableAnnouncement: false,
    announcementHtml:
      "New: Transport cluster updated for 2026 → <a href='/car-vs-ride-hailing-calculator.html'>Try the calculator</a>",

    // Auto-related injection
    enableAutoRelated: true,
    relatedMaxLinks: 6,               // hard cap, always
    relatedPillarsCount: 2,           // always include this many pillars from the same cluster
    relatedSameSubtopicCount: 3,       // include this many from same subtopic (excluding self)
    relatedBridgeCount: 1,             // include this many cross-cluster bridges
    relatedContainerId: "auto-related",// placeholder div id in articles
    enableDecisionPathModule: true,
    decisionPathModuleId: "og-next-steps",
    decisionPathAllowPaths: [
      "/car-ownership-cost.html",
      "/monthly-cost-of-owning-a-car-singapore.html",
      "/car-ownership-cost-per-year-singapore.html",
      "/car-depreciation-singapore.html",
      "/car-loan-rates-singapore.html",
      "/coe-renewal-worth-it-singapore.html",
      "/5-year-coe-renewal-worth-it-singapore.html",
      "/10-year-coe-renewal-worth-it-singapore.html",
      "/should-i-buy-car-now-or-wait-singapore.html",
      "/tdsr-msr-singapore.html",
      "/cpf-accrued-interest-singapore.html",
      "/mortgage-interest-cost-singapore.html",
      "/condo-ownership-cost.html",
      "/bsd-absd-singapore.html",
      "/bsd-absd-calculator-singapore.html",
      "/property-ownership-cost-singapore.html",
      "/sell-property-cost-singapore.html",
      "/rent-vs-buy-property-singapore.html",
      "/bto-vs-resale-cost.html",
      "/should-i-buy-property-now-or-wait-singapore.html"
    ],

// Per-page overrides for the "Next steps" module (normalized paths, no trailing slash, no .html)
decisionPathOverrides: {
  "/car-ownership-cost": {
    runPrimary: { url: "/car-ownership-cost-calculator-singapore.html", title: "Car ownership cost (all-in monthly) calculator" },
    runSecondary: { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs ride-hailing break-even" }
  },
  "/monthly-cost-of-owning-a-car-singapore": {
    runPrimary: { url: "/car-affordability-calculator-singapore.html", title: "Car affordability stress test" },
    runSecondary: { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs ride-hailing break-even" }
  },
  "/car-ownership-cost-per-year-singapore": {
    runPrimary: { url: "/car-affordability-calculator-singapore.html", title: "Car affordability stress test" },
    runSecondary: { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs ride-hailing break-even" }
  },
  "/car-depreciation-singapore": {
    runPrimary: { url: "/car-affordability-calculator-singapore.html", title: "Car affordability stress test" },
    runSecondary: { url: "/car-loan-vs-cash-singapore.html", title: "Car loan vs pay cash" }
  },
  "/car-loan-rates-singapore": {
    runPrimary: { url: "/car-affordability-calculator-singapore.html", title: "Car affordability stress test" },
    runSecondary: { url: "/car-loan-vs-cash-singapore.html", title: "Car loan vs pay cash" }
  },
  "/coe-renewal-worth-it-singapore": {
    runPrimary: { url: "/car-affordability-calculator-singapore.html", title: "Car affordability stress test" },
    runSecondary: { url: "/coe-renew-vs-replace-singapore.html", title: "COE renew vs replace" }
  },
  "/5-year-coe-renewal-worth-it-singapore": {
    runPrimary: { url: "/car-affordability-calculator-singapore.html", title: "Car affordability stress test" },
    runSecondary: { url: "/coe-renew-vs-replace-singapore.html", title: "COE renew vs replace" }
  },
  "/10-year-coe-renewal-worth-it-singapore": {
    runPrimary: { url: "/car-affordability-calculator-singapore.html", title: "Car affordability stress test" },
    runSecondary: { url: "/coe-renew-vs-replace-singapore.html", title: "COE renew vs replace" }
  },
  "/should-i-buy-car-now-or-wait-singapore": {
    runPrimary: { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs ride-hailing break-even" },
    runSecondary: { url: "/car-affordability-calculator-singapore.html", title: "Car affordability stress test" }
  },
  "/tdsr-msr-singapore": {
    runPrimary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
    runSecondary: { url: "/hdb-loan-vs-bank-loan-singapore.html", title: "HDB loan vs Bank loan (decision)" }
  },
  "/cpf-accrued-interest-singapore": {
    runPrimary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
    runSecondary: { url: "/sell-property-cost-singapore.html", title: "Sell property cost (net proceeds reality)" }
  },
  "/mortgage-interest-cost-singapore": {
    runPrimary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
    runSecondary: { url: "/fixed-vs-floating-home-loan-singapore.html", title: "Fixed vs Floating loan (decision)" }
  },
  "/condo-ownership-cost": {
    runPrimary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
    runSecondary: { url: "/mortgage-interest-cost-singapore.html", title: "Mortgage interest cost model" }
  },
  "/bsd-absd-singapore": {
    runPrimary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
    runSecondary: { url: "/rent-vs-buy-property-singapore.html", title: "Rent vs Buy (framework)" }
  },
  "/property-ownership-cost-singapore": {
    runPrimary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
    runSecondary: { url: "/mortgage-interest-cost-singapore.html", title: "Mortgage interest intuition" }
  },
  "/sell-property-cost-singapore": {
    runPrimary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
    runSecondary: { url: "/cpf-accrued-interest-singapore.html", title: "CPF accrued interest (sale proceeds)" }
  },
  "/rent-vs-buy-property-singapore": {
    runPrimary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
    runSecondary: { url: "/rent-vs-buy-calculator-singapore.html", title: "Rent vs Buy calculator (break-even + net worth)" }
  },
  "/bto-vs-resale-cost": {
    runPrimary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
    runSecondary: { url: "/bsd-absd-singapore.html", title: "BSD & ABSD (stamp duty impact)" }
  },
  "/should-i-buy-property-now-or-wait-singapore": {
    runPrimary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
    runSecondary: { url: "/refinance-vs-reprice-home-loan-singapore.html", title: "Refinance vs Reprice (rates strategy)" }
  }},

    // Auto-related safety switches
    // If a page has <meta name="og:norelated" content="true"> (or property=),
    // we will NOT inject related links.
    relatedOptOutMetaKey: "og:norelated",

    // Nav activation (prefer meta-based classification, fallback to path heuristics)
    preferMetaForNav: true,

    // Authority concentration
    // Ensure every cluster reinforces a single canonical "master" pillar page.
    primaryPillarByCluster: {
      transport: "/car-ownership-cost.html",
      property: "/property-ownership-cost-singapore.html",
      family: "/how-much-does-it-cost-to-raise-a-child-singapore.html",
      protection: "/how-much-life-insurance-do-you-need-singapore.html"
    },

    // Calculator anchoring (transport only)
    enableAutoCalculatorCTA: true,

    // Auto insert property "key tools" CTA (property cluster)
    enableAutoPropertyCTA: true,
    propertyCtaId: "auto-property-cta",
    calculatorCtaId: "auto-calculator-cta",

    // Auto insert "Back to Ownership Guide" link near top of every page (except home)
    enableAutoBackToHome: true,
    backToHomeHtml: "<p class='nav'><a href='/'>← Back to Ownership Guide</a></p>"
  ,
    // Auto insert "Back to Cluster" link (e.g., Transport / Property) under the Back-to-Home link.
    // Uses <meta name="og:cluster" content="transport|property"> or <meta property="og:cluster" ...>
    enableAutoBackToCluster: true,
    backToClusterByCluster: {
      transport: { href: "/transport/", text: "← Back to Transport" },
      family: {
      label: "Related Singapore Family Cost Guides",
      pillars: [
        { url: "/family/", title: "Family Cost Hub in Singapore (2026)", subtopic: "hub" },
        { url: "/how-much-does-it-cost-to-raise-a-child-singapore.html", title: "How Much Does It Cost to Raise a Child in Singapore? (2026): A Long-Horizon Planning Framework", subtopic: "core" },
        { url: "/cost-of-having-a-baby-singapore.html", title: "Cost of Having a Baby in Singapore (2026): Pregnancy, Delivery, and First-Year Reality", subtopic: "baby" },
        { url: "/infantcare-vs-childcare-cost-singapore.html", title: "Infantcare vs Childcare Cost in Singapore (2026): The Recurring Cost Difference Parents Feel Most", subtopic: "comparison" },
        { url: "/maid-vs-infantcare-cost-singapore.html", title: "Maid vs Infantcare Cost in Singapore (2026): Which Early-Years Care Route Actually Costs Less?", subtopic: "comparison" },
        { url: "/stay-at-home-parent-vs-infantcare-cost-singapore.html", title: "Stay-at-Home Parent vs Infantcare Cost in Singapore (2026): The Economic Trade-off Households Misread", subtopic: "comparison" },
        { url: "/how-much-does-preschool-cost-singapore.html", title: "How Much Does Preschool Cost in Singapore? (2026): Early-Years Fees, Recurring Pressure, and What Parents Underestimate", subtopic: "preschool" },
        { url: "/how-much-does-primary-school-cost-singapore.html", title: "How Much Does Primary School Cost in Singapore? (2026): The Budget Shift Many Families Underestimate", subtopic: "school" },
        { url: "/student-care-vs-after-school-care-cost-singapore.html", title: "Student Care vs After-School Care Cost in Singapore? (2026): The Post-School Supervision Trade-off Families Misprice", subtopic: "comparison" },
        { url: "/cost-of-having-a-second-child-singapore.html", title: "Cost of Having a Second Child in Singapore (2026): The Step-Change Families Often Underestimate", subtopic: "planning" },
        { url: "/how-much-does-secondary-school-cost-singapore.html", title: "How Much Does Secondary School Cost in Singapore? (2026): The Next Budget Phase Families Often Misread", subtopic: "school" },
        { url: "/tuition-cost-singapore.html", title: "Tuition Cost in Singapore (2026): The School-Stage Spend That Quietly Becomes Structural", subtopic: "education" },
        { url: "/enrichment-classes-cost-singapore.html", title: "Enrichment Classes Cost in Singapore (2026): The Fragmented Family Spend That Adds Up Fast", subtopic: "education" }
      ],
      pages: [
        { url: "/family/", title: "Family Cost Hub in Singapore (2026)", subtopic: "hub" },
        { url: "/cost-of-having-a-baby-singapore.html", title: "Cost of Having a Baby in Singapore (2026): Pregnancy, Delivery, and First-Year Reality", subtopic: "baby" },
        { url: "/infantcare-vs-childcare-cost-singapore.html", title: "Infantcare vs Childcare Cost in Singapore (2026): The Recurring Cost Difference Parents Feel Most", subtopic: "comparison" },
        { url: "/how-much-does-it-cost-to-raise-a-child-singapore.html", title: "How Much Does It Cost to Raise a Child in Singapore? (2026): A Long-Horizon Planning Framework", subtopic: "core" },
        { url: "/maid-vs-infantcare-cost-singapore.html", title: "Maid vs Infantcare Cost in Singapore (2026): Which Early-Years Care Route Actually Costs Less?", subtopic: "comparison" },
        { url: "/stay-at-home-parent-vs-infantcare-cost-singapore.html", title: "Stay-at-Home Parent vs Infantcare Cost in Singapore (2026): The Economic Trade-off Households Misread", subtopic: "comparison" },
        { url: "/how-much-does-preschool-cost-singapore.html", title: "How Much Does Preschool Cost in Singapore? (2026): Early-Years Fees, Recurring Pressure, and What Parents Underestimate", subtopic: "preschool" },
        { url: "/how-much-does-primary-school-cost-singapore.html", title: "How Much Does Primary School Cost in Singapore? (2026): The Budget Shift Many Families Underestimate", subtopic: "school" },
        { url: "/student-care-vs-after-school-care-cost-singapore.html", title: "Student Care vs After-School Care Cost in Singapore? (2026): The Post-School Supervision Trade-off Families Misprice", subtopic: "comparison" },
        { url: "/cost-of-having-a-second-child-singapore.html", title: "Cost of Having a Second Child in Singapore (2026): The Step-Change Families Often Underestimate", subtopic: "planning" },
        { url: "/how-much-does-secondary-school-cost-singapore.html", title: "How Much Does Secondary School Cost in Singapore? (2026): The Next Budget Phase Families Often Misread", subtopic: "school" },
        { url: "/tuition-cost-singapore.html", title: "Tuition Cost in Singapore (2026): The School-Stage Spend That Quietly Becomes Structural", subtopic: "education" }, { url: "/early-critical-illness-vs-critical-illness-singapore.html", title: "Early Critical Illness vs Critical Illness Insurance in Singapore (2026): Same Category, Very Different Trigger Timing", subtopic: "comparison" },
        { url: "/hospitalisation-insurance-vs-accident-insurance-singapore.html", title: "Hospitalisation Insurance vs Accident Insurance in Singapore (2026): Why Medical Cover and Accident Cover Are Not the Same Thing", subtopic: "comparison" },
        { url: "/whole-life-vs-critical-illness-insurance-singapore.html", title: "Whole Life vs Critical Illness Insurance in Singapore (2026): Why a Permanent Life Policy and an Illness Payout Should Not Be Compared Lazily", subtopic: "comparison" },
        { url: "/how-much-critical-illness-insurance-do-you-need-singapore.html", title: "How Much Critical Illness Insurance Do You Need in Singapore? (2026): Sizing the Lump-Sum Buffer Without Guessing", subtopic: "planning" },
        { url: "/how-much-disability-income-insurance-do-you-need-singapore.html", title: "How Much Disability Income Insurance Do You Need in Singapore? (2026): Sizing Income Replacement Without Pretending Recovery Is Binary", subtopic: "planning" },
        { url: "/critical-illness-vs-disability-income-insurance-singapore.html", title: "Critical Illness vs Disability Income Insurance in Singapore (2026): Why Lump-Sum Illness Cover and Income Replacement Are Not the Same Job", subtopic: "comparison" },
        { url: "/life-insurance-and-home-loan-singapore.html", title: "Life Insurance and Your Home Loan in Singapore (2026): What Happens to Your Property If You Die", subtopic: "planning" },
        { url: "/increase-term-life-insurance-or-build-child-education-fund-first-singapore.html", title: "Increase Term Life Insurance or Build a Child Education Fund First in Singapore (2026): Which Gap Is More Dangerous Right Now?", subtopic: "bridge" },
        { url: "/increase-critical-illness-insurance-or-top-up-parents-cpf-first-singapore.html", title: "Increase Critical-Illness Insurance or Top Up Parents’ CPF First in Singapore (2026): Which Family Duty Should Move First?", subtopic: "bridge" },
        { url: "/accident-insurance-vs-disability-income-insurance-singapore.html", title: "Accident Insurance vs Disability Income Insurance in Singapore (2026): Event Payout or Income Continuity?", subtopic: "comparison" },
        { url: "/hospital-cash-vs-critical-illness-insurance-singapore.html", title: "Hospital Cash vs Critical Illness Insurance in Singapore (2026): Cheap Add-On or Real Illness Protection?", subtopic: "comparison" },
        { url: "/home-protection-scheme-vs-term-life-insurance-singapore.html", title: "Home Protection Scheme vs Term Life Insurance in Singapore (2026): Mortgage Cover Is Not Full Family Protection", subtopic: "comparison" }
      ],
      bridges: [
        { url: "/buy-for-current-needs-or-one-stage-ahead-property-singapore.html", title: "Buy for Current Needs or One Stage Ahead Property in Singapore? (2026)", cluster: "property", subtopic: "planning" },
        { url: "/does-your-household-need-a-second-car-singapore.html", title: "Does Your Household Need a Second Car in Singapore? (2026 Decision Framework)", cluster: "transport", subtopic: "comparison" },
        { url: "/cost-of-having-a-baby-singapore.html", title: "Cost of Having a Baby in Singapore (2026): Pregnancy, Delivery, and First-Year Reality", cluster: "family", subtopic: "baby" },
        { url: "/infantcare-vs-childcare-cost-singapore.html", title: "Infantcare vs Childcare Cost in Singapore (2026): The Recurring Cost Difference Parents Feel Most", cluster: "family", subtopic: "comparison" },
        { url: "/how-much-does-it-cost-to-raise-a-child-singapore.html", title: "How Much Does It Cost to Raise a Child in Singapore? (2026): A Long-Horizon Planning Framework", cluster: "family", subtopic: "core" },
        { url: "/maid-vs-infantcare-cost-singapore.html", title: "Maid vs Infantcare Cost in Singapore (2026): Which Early-Years Care Route Actually Costs Less?", cluster: "family", subtopic: "comparison" },
        { url: "/stay-at-home-parent-vs-infantcare-cost-singapore.html", title: "Stay-at-Home Parent vs Infantcare Cost in Singapore (2026): The Economic Trade-off Households Misread", cluster: "family", subtopic: "comparison" },
        { url: "/how-much-does-preschool-cost-singapore.html", title: "How Much Does Preschool Cost in Singapore? (2026): Early-Years Fees, Recurring Pressure, and What Parents Underestimate", cluster: "family", subtopic: "preschool" },
        { url: "/how-much-does-primary-school-cost-singapore.html", title: "How Much Does Primary School Cost in Singapore? (2026): The Budget Shift Many Families Underestimate", cluster: "family", subtopic: "school" },
        { url: "/student-care-vs-after-school-care-cost-singapore.html", title: "Student Care vs After-School Care Cost in Singapore? (2026): The Post-School Supervision Trade-off Families Misprice", cluster: "family", subtopic: "comparison" },
        { url: "/cost-of-having-a-second-child-singapore.html", title: "Cost of Having a Second Child in Singapore (2026): The Step-Change Families Often Underestimate", cluster: "family", subtopic: "planning" },
        { url: "/how-much-does-secondary-school-cost-singapore.html", title: "How Much Does Secondary School Cost in Singapore? (2026): The Next Budget Phase Families Often Misread", cluster: "family", subtopic: "school" },
        { url: "/tuition-cost-singapore.html", title: "Tuition Cost in Singapore (2026): The School-Stage Spend That Quietly Becomes Structural", cluster: "family", subtopic: "education" },
        { url: "/enrichment-classes-cost-singapore.html", title: "Enrichment Classes Cost in Singapore (2026): The Fragmented Family Spend That Adds Up Fast", cluster: "family", subtopic: "education" },
        { url: "/how-much-does-junior-college-cost-singapore.html", title: "How Much Does Junior College Cost in Singapore? (2026): The Post-Secondary Stage Families Still Need to Budget For", cluster: "family", subtopic: "school" },
        { url: "/polytechnic-vs-junior-college-cost-singapore.html", title: "Polytechnic vs Junior College Cost in Singapore (2026): The Post-Secondary Branch Point Families Often Oversimplify", cluster: "family", subtopic: "comparison" },
        { url: "/how-much-does-university-cost-singapore.html", title: "How Much Does University Cost in Singapore? (2026): The Long-Horizon Family Bill Many Plans Leave Too Vague", cluster: "family", subtopic: "education" },
        { url: "/start-here/", title: "Start Here (10-Minute Paths)", cluster: "home" }
      ]
    },

    property: { href: "/property/", text: "← Back to Property" },
      family: { href: "/family/", text: "← Back to Family" },
      protection: { href: "/protection/", text: "← Back to Protection" },
      investing: { href: "/investing/", text: "← Back to Investing" }
    },

    investing: {
      label: "Related Singapore Investing & Liquidity Guides",
      pillars: [
        { url: "/investing/", title: "Investing & Liquidity Hub in Singapore (2026)", subtopic: "hub" },
        { url: "/how-much-emergency-fund-do-you-need-singapore.html", title: "How Much Emergency Fund Do You Need in Singapore? (2026): A Liquidity Buffer Framework for Real Household Fragility", subtopic: "liquidity" },
        { url: "/where-to-keep-your-emergency-fund-singapore.html", title: "Where to Keep Your Emergency Fund in Singapore? (2026): Liquidity, Safety, and Why Yield Is Not the Main Job", subtopic: "liquidity" },
        { url: "/when-to-invest-vs-build-your-emergency-fund-first-singapore.html", title: "When to Invest vs Build Your Emergency Fund First in Singapore (2026): The Liquidity-First Sequence Many Households Skip", subtopic: "liquidity" }
      ],
      pages: [
        { url: "/emergency-fund-vs-sinking-fund-singapore.html", title: "Emergency Fund vs Sinking Fund in Singapore (2026): Why Mixing Shock Reserves with Planned Spending Creates False Safety", cluster: "investing", subtopic: "liquidity" },
        { url: "/when-to-use-your-emergency-fund-singapore.html", title: "When to Use Your Emergency Fund in Singapore (2026): A Practical Boundary Framework for Real Emergencies", cluster: "investing", subtopic: "liquidity" },
        { url: "/how-to-rebuild-your-emergency-fund-after-using-it-singapore.html", title: "How to Rebuild Your Emergency Fund After Using It in Singapore (2026): A Practical Reset Plan Without Pausing Life Indefinitely", cluster: "investing", subtopic: "liquidity" },
        { url: "/should-you-split-your-emergency-fund-across-accounts-singapore.html", title: "Should You Split Your Emergency Fund Across Accounts in Singapore? (2026): A Practical Liquidity Structure for Access, Discipline, and Failure Risk", cluster: "investing", subtopic: "liquidity" },
        { url: "/how-much-of-your-emergency-fund-should-stay-instant-access-singapore.html", title: "How Much of Your Emergency Fund Should Stay Instant Access in Singapore? (2026): Designing the First Liquidity Layer Without Overparking Every Dollar", cluster: "investing", subtopic: "liquidity" },
        { url: "/should-you-invest-part-of-your-emergency-fund-singapore.html", title: "Should You Invest Part of Your Emergency Fund in Singapore? (2026): The Yield Temptation That Often Defeats the Point of the Buffer", cluster: "investing", subtopic: "liquidity" },
        { url: "/how-to-size-an-emergency-fund-if-your-income-is-irregular-singapore.html", title: "How to Size an Emergency Fund If Your Income Is Irregular in Singapore (2026): A Buffer Framework for Variable Cash Flow Without Guesswork", cluster: "investing", subtopic: "liquidity" },
        { url: "/how-having-children-changes-your-emergency-fund-size-singapore.html", title: "How Having Children Changes Your Emergency Fund Size in Singapore (2026): Why Household Burn Rate and Dependency Risk Push the Buffer Higher", cluster: "investing", subtopic: "liquidity" },
        { url: "/how-having-a-mortgage-changes-your-emergency-fund-size-singapore.html", title: "How Having a Mortgage Changes Your Emergency Fund Size in Singapore (2026): Why Fixed Debt Obligations Usually Demand a Bigger Cash Buffer", cluster: "investing", subtopic: "liquidity" }
      ,
        { url: "/cpf-sa-top-up-singapore.html", title: "CPF SA Top-Up in Singapore (2026)", cluster: "investing", subtopic: "investing" },
        { url: "/singapore-savings-bonds-singapore.html", title: "Singapore Savings Bonds (2026)", cluster: "investing", subtopic: "investing" },
        { url: "/index-fund-investing-singapore.html", title: "Index Fund Investing in Singapore (2026)", cluster: "investing", subtopic: "investing" }],
      bridges: [
        { url: "/when-insurance-starts-to-matter-more-than-investing-singapore.html", title: "When Insurance Starts to Matter More Than Investing in Singapore (2026): The Order of Operations Risk-Aware Households Should Respect", cluster: "protection", subtopic: "planning" },
        { url: "/pay-down-mortgage-vs-invest-singapore.html", title: "Pay Down Mortgage vs Invest in Singapore (2026): Framework + Worked Example", cluster: "property", subtopic: "financing" },
        { url: "/how-much-does-it-cost-to-raise-a-child-singapore.html", title: "How Much Does It Cost to Raise a Child in Singapore? (2026): A Long-Horizon Planning Framework", cluster: "family", subtopic: "core" }
      ]
    },

    comparisons: {
      label: "Decision Comparisons (Singapore)",
      pillars: [
        { url: "/buy-a-car-or-upgrade-home-first-singapore.html", title: "Buy a Car or Upgrade Home First in Singapore (2026): Which Big-Ticket Move Should Go First?", cluster: "transport", subtopic: "comparison" },
        { url: "/pay-down-home-loan-or-build-child-education-fund-singapore.html", title: "Pay Down Home Loan or Build a Child Education Fund First in Singapore (2026): Which Long-Horizon Goal Should Get the Next Dollar?", cluster: "property", subtopic: "comparison" },
        { url: "/second-car-or-helper-when-supporting-aging-parents-singapore.html", title: "Second Car or a Helper When Supporting Aging Parents in Singapore (2026): Which Cost Actually Reduces Family Strain?", cluster: "family", subtopic: "comparison" },
        { url: "/buy-investment-property-or-increase-index-fund-investing-singapore.html", title: "Buy an Investment Property or Increase Index-Fund Investing in Singapore (2026): Which Route Builds Wealth With Less Fragility?", cluster: "investing", subtopic: "comparison" },
        { url: "/help-parents-with-housing-costs-or-build-your-own-investment-portfolio-first-singapore.html", title: "Help Parents With Housing Costs or Build Your Own Investment Portfolio First in Singapore (2026): Which Use of the Next Dollar Is More Sustainable?", cluster: "investing", subtopic: "comparison" },
        { url: "/move-closer-to-school-or-keep-home-and-own-a-car-singapore.html", title: "Move Closer to School or Keep Your Home and Own a Car in Singapore (2026): Which Trade-Off Actually Makes Family Logistics Lighter?", cluster: "family", subtopic: "comparison" },
        { url: "/move-closer-to-aging-parents-or-keep-home-and-own-a-second-car-singapore.html", title: "Move Closer to Aging Parents or Keep Your Home and Own a Second Car in Singapore (2026): Which Fix Actually Reduces Family Strain?", cluster: "family", subtopic: "comparison" },
        { url: "/increase-term-life-insurance-or-pay-down-home-loan-first-singapore.html", title: "Increase Term Life Insurance or Pay Down Home Loan First in Singapore (2026): Which Missing Layer Is More Dangerous Right Now?", cluster: "protection", subtopic: "comparison" },
        { url: "/increase-term-life-insurance-or-build-child-education-fund-first-singapore.html", title: "Increase Term Life Insurance or Build a Child Education Fund First in Singapore (2026): Which Gap Is More Dangerous Right Now?", cluster: "protection", subtopic: "comparison" },
        { url: "/pay-down-home-loan-or-help-aging-parents-now-singapore.html", title: "Pay Down Home Loan or Help Aging Parents Now in Singapore (2026): Which Obligation Should Get the Next Dollar First?", cluster: "property", subtopic: "comparison" },
        { url: "/pay-down-home-loan-or-keep-bigger-cash-buffer-before-second-child-singapore.html", title: "Pay Down Home Loan or Keep a Bigger Cash Buffer Before a Second Child in Singapore (2026): Which Move Better Protects the Household?", cluster: "property", subtopic: "comparison" },
        { url: "/buy-bigger-home-or-fund-helper-first-singapore.html", title: "Buy a Bigger Home or Fund a Helper First in Singapore (2026): Which Upgrade Actually Reduces More Family Strain?", cluster: "family", subtopic: "comparison" },
        { url: "/car-vs-ride-hailing-cost.html", title: "Car vs Ride-Hailing in Singapore: Which Is Cheaper?", cluster: "transport", subtopic: "comparison" },
        { url: "/rent-vs-buy-property-singapore.html", title: "Rent vs Buy Property in Singapore (2026): 5-Year Cost & Liquidity Framework", cluster: "property", subtopic: "comparison" },
        { url: "/bto-vs-resale-cost.html", title: "BTO vs Resale in Singapore: The Full Cost Comparison (2026)", cluster: "property", subtopic: "comparison" },
        { url: "/should-i-buy-bigger-home-before-having-kids-singapore.html", title: "Should I Buy a Bigger Home Before Having Kids in Singapore? (2026)", subtopic: "planning" },
        { url: "/should-you-build-your-emergency-fund-before-buying-a-car-singapore.html", title: "Should You Build Your Emergency Fund Before Buying a Car in Singapore? (2026): The Buffer Question That Changes the Car Decision", subtopic: "bridge" },
        { url: "/car-repair-sinking-fund-vs-emergency-fund-singapore.html", title: "Car Repair Sinking Fund vs Emergency Fund in Singapore (2026): Stop Funding Predictable Vehicle Wear from Your Shock Reserve", subtopic: "bridge" },
        { url: "/bigger-car-down-payment-vs-larger-cash-buffer-singapore.html", title: "Bigger Car Down Payment vs Larger Cash Buffer in Singapore (2026): Which One Actually Makes Ownership Safer?", subtopic: "bridge" },
        { url: "/how-car-ownership-changes-your-cash-buffer-plan-singapore.html", title: "How Car Ownership Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", subtopic: "bridge" },
        { url: "/should-you-build-your-emergency-fund-before-buying-a-motorcycle-singapore.html", title: "Should You Build Your Emergency Fund Before Buying a Motorcycle in Singapore? (2026): The Buffer Question Riders Skip", subtopic: "bridge" },
        { url: "/motorcycle-repair-sinking-fund-vs-emergency-fund-singapore.html", title: "Motorcycle Repair Sinking Fund vs Emergency Fund in Singapore (2026): Stop Funding Predictable Bike Wear From Your Shock Reserve", subtopic: "bridge" },
        { url: "/bigger-motorcycle-down-payment-vs-larger-cash-buffer-singapore.html", title: "Bigger Motorcycle Down Payment vs Larger Cash Buffer in Singapore (2026): Which One Actually Makes Ownership Safer?", subtopic: "bridge" },
        { url: "/how-motorcycle-ownership-changes-your-cash-buffer-plan-singapore.html", title: "How Motorcycle Ownership Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", subtopic: "bridge" },
        { url: "/accident-insurance-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html", title: "Accident Insurance vs Bigger Cash Buffer for Motorcycle Riders in Singapore (2026): Which Layer Should Move First?", subtopic: "bridge" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer for Motorcycle Riders in Singapore (2026): Which Fragility Matters More?", subtopic: "bridge" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer for Motorcycle Riders in Singapore (2026): Which Layer Reduces More Friction?", subtopic: "bridge" },
        { url: "/how-motorcycle-ownership-changes-your-insurance-priority-order-singapore.html", title: "How Motorcycle Ownership Changes Your Insurance Priority Order in Singapore (2026): What Actually Moves Up the Queue?", subtopic: "bridge" },
        { url: "/family-car-decision-after-baby-singapore.html", title: "Family Car Decision After Baby in Singapore (2026): Does a Child Change Whether You Need a Car?", subtopic: "planning" },
        { url: "/how-having-a-child-affects-tdsr-borrowing-capacity-singapore.html", title: "How Having a Child Affects Your TDSR and Borrowing Capacity in Singapore (2026)", subtopic: "planning" },
        { url: "/protection-gap-after-having-a-baby-singapore.html", title: "Protection Gap After Having a Baby in Singapore (2026): How Your Insurance Needs Change When a Child Arrives", subtopic: "planning" }
      ],
      pages: [
        { url: "/coe-renew-vs-replace-singapore.html", title: "Renew COE vs Replace Car in Singapore (2026): Decision Framework + Break-even", cluster: "transport", subtopic: "comparison" },
        { url: "/own-car-vs-public-transport-singapore.html", title: "Own a Car vs Public Transport in Singapore (2026): The Real Decision", cluster: "transport", subtopic: "comparison" },
        { url: "/car-sharing-vs-owning-a-car-singapore.html", title: "Car-Sharing vs Owning a Car in Singapore (2026): Which Makes More Sense?", cluster: "transport", subtopic: "comparison" },
        { url: "/weekend-car-rental-vs-owning-a-car-singapore.html", title: "Weekend Car Rental vs Owning a Car in Singapore (2026): Which Makes More Sense?", cluster: "transport", subtopic: "comparison" },
        { url: "/sedan-vs-suv-singapore.html", title: "Sedan vs SUV in Singapore (2026): Which Body Style Actually Fits Your Life?", cluster: "transport", subtopic: "comparison" },
        { url: "/suv-vs-mpv-for-families-singapore.html", title: "SUV vs MPV for Families in Singapore (2026): Which Actually Handles Family Logistics Better?", cluster: "transport", subtopic: "comparison" },
        { url: "/do-you-really-need-a-7-seater-singapore.html", title: "Do You Really Need a 7-Seater in Singapore? (2026): When Extra Seats Solve Real Life — and When They Become Expensive Dead Capacity", cluster: "transport", subtopic: "comparison" },
        { url: "/small-car-vs-big-car-singapore.html", title: "Small Car vs Big Car in Singapore (2026): Which Everyday Size Actually Fits Better?", cluster: "transport", subtopic: "comparison" },
        { url: "/does-your-household-need-a-second-car-singapore.html", title: "Does Your Household Need a Second Car in Singapore? (2026 Decision Framework)", cluster: "transport", subtopic: "comparison" },
        { url: "/cost-of-having-a-baby-singapore.html", title: "Cost of Having a Baby in Singapore (2026): Pregnancy, Delivery, and First-Year Reality", cluster: "family", subtopic: "baby" },
        { url: "/infantcare-vs-childcare-cost-singapore.html", title: "Infantcare vs Childcare Cost in Singapore (2026): The Recurring Cost Difference Parents Feel Most", cluster: "family", subtopic: "comparison" },
        { url: "/how-much-does-it-cost-to-raise-a-child-singapore.html", title: "How Much Does It Cost to Raise a Child in Singapore? (2026): A Long-Horizon Planning Framework", cluster: "family", subtopic: "core" },
        { url: "/maid-vs-infantcare-cost-singapore.html", title: "Maid vs Infantcare Cost in Singapore (2026): Which Early-Years Care Route Actually Costs Less?", cluster: "family", subtopic: "comparison" },
        { url: "/stay-at-home-parent-vs-infantcare-cost-singapore.html", title: "Stay-at-Home Parent vs Infantcare Cost in Singapore (2026): The Economic Trade-off Households Misread", cluster: "family", subtopic: "comparison" },
        { url: "/how-much-does-preschool-cost-singapore.html", title: "How Much Does Preschool Cost in Singapore? (2026): Early-Years Fees, Recurring Pressure, and What Parents Underestimate", cluster: "family", subtopic: "preschool" },
        { url: "/how-much-does-primary-school-cost-singapore.html", title: "How Much Does Primary School Cost in Singapore? (2026): The Budget Shift Many Families Underestimate", cluster: "family", subtopic: "school" },
        { url: "/student-care-vs-after-school-care-cost-singapore.html", title: "Student Care vs After-School Care Cost in Singapore? (2026): The Post-School Supervision Trade-off Families Misprice", cluster: "family", subtopic: "comparison" },
        { url: "/cost-of-having-a-second-child-singapore.html", title: "Cost of Having a Second Child in Singapore (2026): The Step-Change Families Often Underestimate", cluster: "family", subtopic: "planning" },
        { url: "/how-much-does-secondary-school-cost-singapore.html", title: "How Much Does Secondary School Cost in Singapore? (2026): The Next Budget Phase Families Often Misread", cluster: "family", subtopic: "school" },
        { url: "/tuition-cost-singapore.html", title: "Tuition Cost in Singapore (2026): The School-Stage Spend That Quietly Becomes Structural", cluster: "family", subtopic: "education" },
        { url: "/enrichment-classes-cost-singapore.html", title: "Enrichment Classes Cost in Singapore (2026): The Fragmented Family Spend That Adds Up Fast", cluster: "family", subtopic: "education" },
        { url: "/how-much-does-junior-college-cost-singapore.html", title: "How Much Does Junior College Cost in Singapore? (2026): The Post-Secondary Stage Families Still Need to Budget For", cluster: "family", subtopic: "school" },
        { url: "/polytechnic-vs-junior-college-cost-singapore.html", title: "Polytechnic vs Junior College Cost in Singapore (2026): The Post-Secondary Branch Point Families Often Oversimplify", cluster: "family", subtopic: "comparison" },
        { url: "/how-much-does-university-cost-singapore.html", title: "How Much Does University Cost in Singapore? (2026): The Long-Horizon Family Bill Many Plans Leave Too Vague", cluster: "family", subtopic: "education" },
        { url: "/second-car-vs-ride-hailing-singapore.html", title: "Second Car vs Ride-Hailing in Singapore (2026): Which Is Smarter for a One-Car Household?", cluster: "transport", subtopic: "comparison" },
        { url: "/car-sharing-vs-ride-hailing-singapore.html", title: "Car-Sharing vs Ride-Hailing in Singapore (2026): Which Access Model Fits Better?", cluster: "transport", subtopic: "comparison" },
        { url: "/hdb-vs-condo-singapore.html", title: "HDB vs Condo in Singapore (2026): The Real Cost, Lifestyle, and Regret Tradeoffs", cluster: "property", subtopic: "comparison" },
        { url: "/executive-condo-ec-eligibility-singapore.html", title: "Executive Condo (EC) Eligibility in Singapore (2026): The Access Gate Many Households Confuse with Affordability", cluster: "property", subtopic: "hdb" },
        { url: "/should-you-buy-an-executive-condo-singapore.html", title: "Should You Buy an Executive Condo (EC) in Singapore? (2026): Who It Fits, When It Works, and When It Quietly Becomes the Wrong Route", cluster: "property", subtopic: "comparison" },
        { url: "/executive-condo-ec-vs-condo-singapore.html", title: "Executive Condo (EC) vs Condo in Singapore (2026): Entry Price, Flexibility, and Which Route Actually Fits", cluster: "property", subtopic: "comparison" },
        { url: "/new-launch-vs-resale-condo-singapore.html", title: "New Launch vs Resale Condo in Singapore (2026): Premium, Visibility, and Which Condo Route Actually Fits", cluster: "property", subtopic: "comparison" },
        { url: "/rent-out-vs-sell-singapore.html", title: "Rent Out vs Sell Your Property in Singapore (2026): A No-Regret Framework", cluster: "property", subtopic: "comparison" },
        { url: "/fixed-vs-floating-home-loan-singapore.html", title: "Fixed vs Floating Home Loan in Singapore (2026): Simple Decision Framework", cluster: "property", subtopic: "comparison" },
        { url: "/refinance-vs-reprice-home-loan-singapore.html", title: "Refinance vs Reprice Home Loan in Singapore (2026): Break-even Framework", cluster: "property", subtopic: "comparison" },
        { url: "/hdb-loan-vs-bank-loan-singapore.html", title: "HDB Loan vs Bank Loan in Singapore (2026): Decision Framework + Worked Example", cluster: "property", subtopic: "comparison" },
        { url: "/should-i-buy-property-now-or-wait-singapore.html", title: "Buy Property Now vs Wait in Singapore (2026): Decision Framework + Worked Example", cluster: "property", subtopic: "comparison" },
        { url: "/pay-down-mortgage-vs-invest-singapore.html", title: "Pay Down Mortgage vs Invest in Singapore (2026): Framework + Worked Example", cluster: "property", subtopic: "comparison" },
        { url: "/should-you-make-partial-prepayment-home-loan-singapore.html", title: "Should You Make a Partial Prepayment on Your Home Loan in Singapore? (2026)", cluster: "property", subtopic: "financing" },
        { url: "/reduce-tenure-vs-lower-monthly-instalment-singapore.html", title: "Reduce Tenure vs Lower Monthly Instalment in Singapore (2026)", cluster: "property", subtopic: "financing" },
        { url: "/cpf-oa-vs-cash-for-home-loan-singapore.html", title: "CPF OA vs Cash for Home Loan in Singapore (2026)", cluster: "property", subtopic: "financing" },
        { url: "/keep-cash-buffer-vs-partial-home-loan-prepayment-singapore.html", title: "Keep Cash Buffer vs Partial Home Loan Prepayment in Singapore (2026): Which Move Actually Makes the Household Safer?", cluster: "property", subtopic: "financing" },
        { url: "/fixed-rate-certainty-vs-larger-cash-buffer-singapore.html", title: "Fixed-Rate Certainty vs Larger Cash Buffer in Singapore (2026): Which Protection Layer Matters More When Rates Feel Unclear?", cluster: "property", subtopic: "financing" },
        { url: "/use-cpf-oa-vs-preserve-cash-buffer-for-home-loan-singapore.html", title: "Use CPF OA vs Preserve Cash Buffer for Home Loan in Singapore (2026): Which Funding Route Better Protects the Household?", cluster: "property", subtopic: "financing" },
        { url: "/refinance-now-vs-wait-for-more-rate-clarity-singapore.html", title: "Refinance Now vs Wait for More Rate Clarity in Singapore (2026): When Acting Early Beats Watching Another Rate Cycle", cluster: "property", subtopic: "financing" },
        { url: "/what-to-do-when-home-loan-lock-in-ends-singapore.html", title: "What to Do When Your Home Loan Lock-In Ends in Singapore (2026)", cluster: "property", subtopic: "financing" },
        { url: "/should-you-downsize-your-home-singapore.html", title: "Should You Downsize Your Home in Singapore? (2026): When More Space Stops Helping and Starts Costing You", cluster: "property", subtopic: "decision" },
        { url: "/stay-in-current-home-or-right-size-property-singapore.html", title: "Stay in Your Current Home or Right-Size in Singapore? (2026): When Moving Solves the Next Stage — and When It Just Creates New Friction", cluster: "property", subtopic: "decision" },
        { url: "/release-cash-by-moving-to-smaller-home-singapore.html", title: "Release Cash by Moving to a Smaller Home in Singapore? (2026): When Equity Release Helps — and When the Trade-Off Is Smaller Than It Looks", cluster: "property", subtopic: "planning" },
        { url: "/downsizing-to-hdb-or-condo-later-life-singapore.html", title: "Downsizing to HDB or Condo Later in Life in Singapore? (2026): Which Route Actually Fits the Next Stage Better?", cluster: "property", subtopic: "comparison" },

        { url: "/car-leasing-vs-buying-singapore.html", title: "Car Leasing vs Buying in Singapore: Which Is Cheaper?", cluster: "transport", subtopic: "comparison" },
        { url: "/car-loan-vs-cash-singapore.html", title: "Car Loan vs Pay Cash in Singapore (2026): Decision Rules + Worked Example", cluster: "transport", subtopic: "comparison" },
        { url: "/balloon-loan-vs-normal-car-loan-singapore.html", title: "Balloon Loan vs Normal Car Loan in Singapore (2026): Decision Framework + Worked Example", cluster: "transport", subtopic: "comparison" },
        { url: "/used-car-vs-new-car-singapore.html", title: "Used vs New Car in Singapore (2026): Which Is Cheaper Over 5 Years?", cluster: "transport", subtopic: "comparison" },
        { url: "/mileage-vs-age-when-buying-used-car-singapore.html", title: "Mileage vs Age When Buying a Used Car in Singapore (2026): Which Signal Matters More — and When One Quietly Lies to You", cluster: "transport", subtopic: "buying" },
        { url: "/used-car-listing-red-flags-singapore.html", title: "Used-Car Listing Red Flags in Singapore (2026): Which Listings Are Not Worth Your Time — Even Before Viewing", cluster: "transport", subtopic: "buying" },
        { url: "/questions-to-answer-before-you-commit-to-car-deal-singapore.html", title: "Questions to Answer Before You Commit to a Car Deal in Singapore (2026): A Final Decision Filter Before Deposit, Loan, and Regret", cluster: "transport", subtopic: "decision" },
        { url: "/low-monthly-payment-traps-when-buying-car-singapore.html", title: "Low Monthly Payment Traps When Buying a Car in Singapore (2026): Why ‘Can Afford the Monthly’ Is Not the Same as ‘Good Deal’", cluster: "transport", subtopic: "financing" },
        { url: "/hybrid-vs-petrol-singapore.html", title: "Hybrid vs Petrol in Singapore (2026): Is Hybrid Actually the Smarter Middle Path?", cluster: "transport", subtopic: "comparison" },
        { url: "/hybrid-vs-ev-singapore.html", title: "Hybrid vs EV in Singapore (2026): Which Transition Route Actually Fits Better?", cluster: "transport", subtopic: "comparison" },
        { url: "/should-you-buy-a-hybrid-car-singapore.html", title: "Should You Buy a Hybrid Car in Singapore? (2026): Who It Fits, When It Works, and When It Quietly Becomes the Wrong Compromise", cluster: "transport", subtopic: "decision" },
        { url: "/self-charging-hybrid-vs-plug-in-hybrid-singapore.html", title: "Self-Charging Hybrid vs Plug-In Hybrid in Singapore (2026): Which Hybrid Route Actually Fits Better?", cluster: "transport", subtopic: "comparison" },
        { url: "/repair-bill-vs-replace-car-singapore.html", title: "Repair Bill vs Replace Car in Singapore (2026): When a Big Repair Should Change the Decision", cluster: "transport", subtopic: "decision" },
        { url: "/paid-up-old-car-vs-newer-car-with-loan-singapore.html", title: "Paid-Up Old Car vs Newer Car With Loan in Singapore (2026): Is “No Instalment” Still the Smarter Choice?", cluster: "transport", subtopic: "comparison" },
        { url: "/can-your-household-rely-on-an-aging-car-singapore.html", title: "Can Your Household Rely on an Aging Car in Singapore? (2026): When “Still Running” Is No Longer Good Enough", cluster: "transport", subtopic: "decision" },
        { url: "/when-an-old-car-becomes-false-economy-singapore.html", title: "When an Old Car Becomes False Economy in Singapore (2026): It’s Already Paid Up, but Is It Still Actually Cheap?", cluster: "transport", subtopic: "decision" },
        { url: "/comprehensive-vs-third-party-car-insurance-singapore.html", title: "Comprehensive vs Third-Party Car Insurance in Singapore (2026): Which Policy Structure Actually Fits Your Risk?", cluster: "transport", subtopic: "insurance" },
        { url: "/high-excess-vs-low-excess-car-insurance-singapore.html", title: "High Excess vs Low Excess Car Insurance in Singapore (2026): Which Trade-Off Actually Fits Your Buffer?", cluster: "transport", subtopic: "insurance" },
        { url: "/named-driver-vs-any-authorised-driver-car-insurance-singapore.html", title: "Named Driver vs Any Authorised Driver Car Insurance in Singapore (2026): Are You Saving Money or Making the Car Less Usable?", cluster: "transport", subtopic: "insurance" },
        { url: "/when-cheap-car-insurance-becomes-false-savings-singapore.html", title: "When Cheap Car Insurance Becomes False Savings in Singapore (2026): The Premium Is Lower, but Is the Policy Actually Right?", cluster: "transport", subtopic: "insurance" }
      ],
      bridges: [
        { url: "/start-here/", title: "Start Here (10-Minute Paths)", cluster: "home" },
        { url: "/calculators/", title: "Calculators Hub", cluster: "calculators" }
      ]
    },
    protection: {
      label: "Related Singapore Protection & Insurance Guides",
      pillars: [
        { url: "/protection/", title: "Protection & Insurance Hub in Singapore (2026)", cluster: "protection", subtopic: "hub" },
        { url: "/how-much-life-insurance-do-you-need-singapore.html", title: "How Much Life Insurance Do You Need in Singapore? (2026): A Protection-Gap Framework for Real Household Obligations", cluster: "protection", subtopic: "planning" },
        { url: "/term-life-vs-whole-life-cost-singapore.html", title: "Term Life vs Whole Life Cost in Singapore (2026): The Protection Decision That Usually Starts with the Wrong Question", cluster: "protection", subtopic: "comparison" },
        { url: "/hospitalisation-insurance-vs-rider-cost-singapore.html", title: "Hospitalisation Insurance vs Rider Cost in Singapore (2026): When Extra Premium Really Changes the Risk You Keep", cluster: "protection", subtopic: "comparison" },
        { url: "/disability-income-insurance-cost-singapore.html", title: "Disability Income Insurance Cost in Singapore (2026): The Protection Layer Households Overlook Until Income Is the Thing That Breaks", cluster: "protection", subtopic: "income-protection" },
        { url: "/critical-illness-insurance-cost-singapore.html", title: "Critical Illness Insurance Cost in Singapore (2026): The Lump-Sum Protection Layer Families Misunderstand Most", cluster: "protection", subtopic: "ci" },
        { url: "/term-life-vs-critical-illness-insurance-singapore.html", title: "Term Life vs Critical Illness Insurance in Singapore (2026): Why Households Compare the Wrong Things and Still End Up Under-Protected", cluster: "protection", subtopic: "comparison" },
        { url: "/accident-insurance-cost-singapore.html", title: "Accident Insurance Cost in Singapore (2026): Cheap Premium, Real Gap, or Just Another Add-On?", cluster: "protection", subtopic: "accident" },
        { url: "/hospital-cash-insurance-worth-it-singapore.html", title: "Is Hospital Cash Insurance Worth It in Singapore? (2026): Cheap Add-On or Useful Buffer?", cluster: "protection", subtopic: "decision" },
        { url: "/critical-illness-vs-hospitalisation-insurance-singapore.html", title: "Critical Illness vs Hospitalisation Insurance in Singapore (2026): Why Households Confuse These Protection Layers", cluster: "protection", subtopic: "comparison" },
        { url: "/early-critical-illness-vs-critical-illness-singapore.html", title: "Early Critical Illness vs Critical Illness in Singapore (2026): Same Category, Very Different Trigger Timing", cluster: "protection", subtopic: "comparison" },
        { url: "/hospitalisation-insurance-vs-accident-insurance-singapore.html", title: "Hospitalisation Insurance vs Accident Insurance in Singapore (2026): Why Medical Cover and Accident Cover Are Not the Same Thing", cluster: "protection", subtopic: "comparison" },
        { url: "/whole-life-vs-critical-illness-insurance-singapore.html", title: "Whole Life vs Critical Illness Insurance in Singapore (2026): Why a Permanent Life Policy and an Illness Payout Should Not Be Compared Lazily", cluster: "protection", subtopic: "comparison" },
        { url: "/accident-insurance-cost-singapore.html", title: "Accident Insurance Cost in Singapore (2026): Cheap Premium, Real Gap, or Just Another Add-On?", cluster: "protection", subtopic: "accident" },
        { url: "/hospital-cash-insurance-worth-it-singapore.html", title: "Is Hospital Cash Insurance Worth It in Singapore? (2026): Cheap Add-On or Useful Buffer?", cluster: "protection", subtopic: "decision" },
        { url: "/critical-illness-vs-hospitalisation-insurance-singapore.html", title: "Critical Illness vs Hospitalisation Insurance in Singapore (2026): Why Households Confuse These Protection Layers", cluster: "protection", subtopic: "comparison" }
      ],
      pages: [
        { url: "/protection/", title: "Protection & Insurance Hub in Singapore (2026)", cluster: "protection", subtopic: "hub" },
        { url: "/how-much-life-insurance-do-you-need-singapore.html", title: "How Much Life Insurance Do You Need in Singapore? (2026): A Protection-Gap Framework for Real Household Obligations", cluster: "protection", subtopic: "planning" },
        { url: "/term-life-vs-whole-life-cost-singapore.html", title: "Term Life vs Whole Life Cost in Singapore (2026): The Protection Decision That Usually Starts with the Wrong Question", cluster: "protection", subtopic: "comparison" },
        { url: "/hospitalisation-insurance-vs-rider-cost-singapore.html", title: "Hospitalisation Insurance vs Rider Cost in Singapore (2026): When Extra Premium Really Changes the Risk You Keep", cluster: "protection", subtopic: "comparison" },
        { url: "/disability-income-insurance-cost-singapore.html", title: "Disability Income Insurance Cost in Singapore (2026): The Protection Layer Households Overlook Until Income Is the Thing That Breaks", cluster: "protection", subtopic: "income-protection" },
        { url: "/critical-illness-insurance-cost-singapore.html", title: "Critical Illness Insurance Cost in Singapore (2026): The Lump-Sum Protection Layer Families Misunderstand Most", cluster: "protection", subtopic: "ci" },
        { url: "/term-life-vs-critical-illness-insurance-singapore.html", title: "Term Life vs Critical Illness Insurance in Singapore (2026): Why Households Compare the Wrong Things and Still End Up Under-Protected", cluster: "protection", subtopic: "comparison" },
        { url: "/home-protection-scheme-hps-singapore.html", title: "Home Protection Scheme (HPS) in Singapore (2026): What It Protects, What It Does Not, and Why HDB Owners Confuse It with Home Insurance", cluster: "property", subtopic: "protection" } ,
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Protects the Household Better?", cluster: "protection", subtopic: "bridge" },
        { url: "/critical-illness-insurance-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Critical Illness Insurance vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Buys More Breathing Room?", cluster: "protection", subtopic: "bridge" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Reduces More Fragility?", cluster: "protection", subtopic: "bridge" },
        { url: "/term-life-vs-cash-buffer-for-single-income-mortgage-singapore.html", title: "Term Life vs Cash Buffer for a Single-Income Mortgage in Singapore (2026): Which Missing Layer Is More Dangerous Right Now?", cluster: "protection", subtopic: "bridge" },
      ,
        { url: "/life-insurance-calculator-singapore.html", title: "Life Insurance Calculator Singapore (2026)", cluster: "protection", subtopic: "calculator" }],
      bridges: [
        { url: "/how-much-does-it-cost-to-raise-a-child-singapore.html", title: "How Much Does It Cost to Raise a Child in Singapore? (2026): A Long-Horizon Planning Framework", cluster: "family", subtopic: "core" },
        { url: "/cost-of-having-a-second-child-singapore.html", title: "Cost of Having a Second Child in Singapore (2026): The Step-Change Families Often Underestimate", cluster: "family", subtopic: "planning" },
        { url: "/home-protection-scheme-hps-singapore.html", title: "Home Protection Scheme (HPS) in Singapore (2026): What It Protects, What It Does Not, and Why HDB Owners Confuse It with Home Insurance", cluster: "property", subtopic: "protection" },
        { url: "/start-here/", title: "Start Here (10-Minute Paths)", cluster: "home" }
      ]
    }
  };

  // =========================
  // 1) CONTENT MAP (edit only here)
  // =========================
  // Add new pages here once, and related sections update everywhere automatically.
  const SITE = {
    transport: {
      label: "Related Singapore Transport Breakdowns",
      pillars: [
        { url: "/car-ownership-cost.html", title: "The Real Cost of Owning a Car in Singapore (5-Year Breakdown)", subtopic: "ownership" },
        { url: "/monthly-cost-of-owning-a-car-singapore.html", title: "True Monthly Cost of Owning a Car in Singapore", subtopic: "ownership" },
        { url: "/should-i-buy-car-now-or-wait-singapore.html", title: "Should You Buy a Car Now or Wait in Singapore? (2026 COE Timing Framework)", subtopic: "timing" },
        { url: "/car-insurance-cost-singapore.html", title: "Car Insurance Cost in Singapore (2026)", subtopic: "insurance" },
        { url: "/no-claim-discount-ncd-singapore.html", title: "No-Claim Discount (NCD) in Singapore Car Insurance (2026): Why One Claim Can Echo for Years", subtopic: "insurance" },
        { url: "/car-insurance-excess-and-claims-singapore.html", title: "Car Insurance Excess and Claims in Singapore (2026): When Making a Claim Actually Makes Sense", subtopic: "insurance" },
        { url: "/comprehensive-vs-third-party-car-insurance-singapore.html", title: "Comprehensive vs Third-Party Car Insurance in Singapore (2026): Which Policy Structure Actually Fits Your Risk?", subtopic: "insurance" },
        { url: "/high-excess-vs-low-excess-car-insurance-singapore.html", title: "High Excess vs Low Excess Car Insurance in Singapore (2026): Which Trade-Off Actually Fits Your Buffer?", subtopic: "insurance" },
        { url: "/named-driver-vs-any-authorised-driver-car-insurance-singapore.html", title: "Named Driver vs Any Authorised Driver Car Insurance in Singapore (2026): Are You Saving Money or Making the Car Less Usable?", subtopic: "insurance" },
        { url: "/when-cheap-car-insurance-becomes-false-savings-singapore.html", title: "When Cheap Car Insurance Becomes False Savings in Singapore (2026): The Premium Is Lower, but Is the Policy Actually Right?", subtopic: "insurance" },
        { url: "/car-vs-ride-hailing-cost.html", title: "Car vs Ride-Hailing in Singapore: Which Is Cheaper?", subtopic: "ridehailing" },
        { url: "/buy-family-car-or-keep-bigger-cash-buffer-before-second-child-singapore.html", title: "Buy a Family Car or Keep a Bigger Cash Buffer Before a Second Child in Singapore (2026): Which Choice Creates More Stability?", subtopic: "bridge" },
        { url: "/car-affordability-calculator-singapore.html", title: "Car Affordability Calculator Singapore (2026): Stress-Tested True Monthly Cost", subtopic: "calculator" },
        { url: "/car-ownership-cost-calculator-singapore.html", title: "Car Ownership Cost Calculator (Singapore, 2026): True All-In Monthly Cost (5-Year TCO)", subtopic: "calculator" },
        
        { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs Ride-Hailing Break-Even Calculator", subtopic: "calculator" },
        { url: "/car-loan-calculator-singapore.html", title: "Car Loan Calculator (Singapore): Monthly Instalment + Total Interest (Flat vs Effective)", subtopic: "calculator" },
        { url: "/coe-loan-calculator-singapore.html", title: "COE Loan Calculator (Singapore): Monthly Instalment + Total Interest (Flat vs Effective)", subtopic: "calculator" },
        { url: "/car-leasing-vs-buying-calculator-singapore.html", title: "Car Leasing vs Buying Calculator (Singapore, 2026): Which Is Cheaper?", subtopic: "calculator" },
        { url: "/used-car-vs-new-car-calculator-singapore.html", title: "Used vs New Car Calculator (Singapore, 2026): All‑In Cost Over Your Holding Period", subtopic: "calculator" },
        { url: "/ev-vs-petrol-calculator-singapore.html", title: "EV vs Petrol Cost Calculator (Singapore, 2026): Break‑Even Mileage + Total Cost", subtopic: "calculator" },
        { url: "/coe-renew-vs-replace-calculator-singapore.html", title: "COE Renew vs Replace Calculator (Singapore, 2026): Which Costs Less?", subtopic: "calculator" },

        { url: "/car-loan-rates-singapore.html", title: "Car Loan Rates in Singapore (2026): Flat Rate vs Effective Interest Explained", subtopic: "financing" },
        { url: "/sell-car-with-outstanding-loan-singapore.html", title: "Sell a Car With an Outstanding Loan in Singapore (2026): What Actually Happens to Your Equity, Exit Options, and Next Move?", subtopic: "financing" },
        { url: "/trade-in-car-with-outstanding-loan-singapore.html", title: "Trade In a Car With an Outstanding Loan in Singapore (2026): Convenient Exit or Dangerous Financing Shortcut?", subtopic: "financing" },
        { url: "/should-you-settle-car-loan-early-singapore.html", title: "Should You Settle a Car Loan Early in Singapore? (2026): Real Savings, Better Optionality, or Just Emotional Relief?", subtopic: "financing" },
        { url: "/when-to-upgrade-car-with-outstanding-loan-singapore.html", title: "When to Upgrade a Car With an Outstanding Loan in Singapore (2026): Timing It Well vs Forcing the Move Too Early", subtopic: "timing" },
        { url: "/transport/financing/", title: "Transport Financing (Singapore, 2026): Car Loans, Leasing, and Payment Structure", subtopic: "financing" },
        { url: "/coe-renewal-worth-it-singapore.html", title: "Should You Renew COE in Singapore? (2026 Decision Framework + Break-Even)", subtopic: "coe" },
        { url: "/10-year-coe-renewal-worth-it-singapore.html", title: "Is 10-Year COE Renewal Worth It in Singapore? (2026 Financial Breakdown)", subtopic: "coe" },
        { url: "/5-year-coe-renewal-worth-it-singapore.html", title: "5-Year COE Renewal: Is It Worth It in Singapore? (2026 Decision Framework)", subtopic: "coe" },
        { url: "/keep-a-car-vs-use-ride-hailing-when-supporting-aging-parents-singapore.html", title: "Keep a Car vs Use Ride-Hailing When Supporting Aging Parents in Singapore (2026): Which Setup Handles Care Friction Without Weakening the Household?", cluster: "transport", subtopic: "bridge" },
        { url: "/second-car-vs-ride-hailing-when-supporting-aging-parents-singapore.html", title: "Second Car vs Ride-Hailing When Supporting Aging Parents in Singapore (2026): When Does Overflow Care Friction Justify Another Vehicle?", cluster: "transport", subtopic: "bridge" },
        { url: "/family-car-upgrade-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Family Car Upgrade vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Move Actually Makes the Household Safer?", cluster: "transport", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-transport-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Transport Decision Order in Singapore (2026): What Should Move Up the Queue Once Elder Support Becomes Real?", cluster: "transport", subtopic: "bridge" },
        { url: "/coe-cost-singapore.html", title: "COE Cost in Singapore (2026)", subtopic: "coe" }
      ],
      pages: [
        { url: "/buy-family-car-or-build-down-payment-fund-first-singapore.html", title: "Buy a Family Car or Build a Down Payment Fund First in Singapore (2026): Which Goal Deserves the Next Dollar?", subtopic: "bridge" },
        { url: "/buy-family-car-or-top-up-cpf-sa-first-singapore.html", title: "Buy a Family Car or Top Up CPF SA First in Singapore (2026): Which Priority Improves Household Resilience More?", subtopic: "bridge" },
        { url: "/buy-a-car-or-upgrade-home-first-singapore.html", title: "Buy a Car or Upgrade Home First in Singapore (2026): Which Big-Ticket Move Should Go First?", subtopic: "bridge" },
        { url: "/car-ownership-cost.html", title: "The Real Cost of Owning a Car in Singapore (5-Year Breakdown)", subtopic: "ownership" },
        { url: "/coe-bidding-strategy-singapore.html", title: "COE Bidding Strategy in Singapore (2026): Timing, Tactics, and Total Exposure", subtopic: "ownership-core" },
        { url: "/car-depreciation-singapore.html", title: "Car Depreciation in Singapore (2026): The Real Monthly Cost You Can’t Ignore", subtopic: "ownership-core" },
        { url: "/monthly-cost-of-owning-a-car-singapore.html", title: "True Monthly Cost of Owning a Car in Singapore", subtopic: "ownership" },
        { url: "/car-ownership-cost-per-year-singapore.html", title: "Car Ownership Cost Per Year in Singapore (2026)", subtopic: "ownership" },
        { url: "/should-i-buy-car-now-or-wait-singapore.html", title: "Should You Buy a Car Now or Wait in Singapore? (2026 COE Timing Framework)", subtopic: "timing" },
        { url: "/buying-car-financial-mistake-singapore.html", title: "Buying a Car in Singapore: The Financial Mistake Most People Don’t See (2026)", subtopic: "decision" },
        { url: "/car-insurance-cost-singapore.html", title: "Car Insurance Cost in Singapore (2026)", subtopic: "insurance" },
        { url: "/car-maintenance-repair-cost-singapore.html", title: "Car Maintenance & Repair Cost in Singapore (2026): Realistic Monthly Buffer + 5-Year Exposure", subtopic: "maintenance" },
        { url: "/authorised-dealer-vs-independent-workshop-singapore.html", title: "Authorised Dealer vs Independent Workshop in Singapore (2026): Where Should You Service and Repair Your Car?", subtopic: "maintenance" },
        { url: "/car-servicing-package-vs-pay-as-you-go-singapore.html", title: "Car Servicing Package vs Pay-as-You-Go in Singapore (2026): Does Prepaying Actually Save Money?", subtopic: "maintenance" },
        { url: "/preventive-maintenance-vs-waiting-for-breakdown-singapore.html", title: "Preventive Maintenance vs Waiting for Breakdown in Singapore (2026): When Early Action Saves You Money — and When It Does Not", subtopic: "maintenance" },
        { url: "/car-repair-urgency-guide-singapore.html", title: "Car Repair Urgency Guide in Singapore (2026): What Can Wait, What Should Not, and How to Prioritise a Limited Budget", subtopic: "maintenance" },
        { url: "/settle-privately-vs-insurance-claim-car-accident-singapore.html", title: "Settle Privately vs Insurance Claim for a Car Accident in Singapore (2026): Which Route Actually Leaves You Better Off?", subtopic: "insurance" },
        { url: "/repair-cosmetic-car-damage-now-or-later-singapore.html", title: "Repair Cosmetic Car Damage Now or Later in Singapore (2026): When Waiting Is Fine and When It Becomes False Economy", subtopic: "maintenance" },
        { url: "/what-car-downtime-really-costs-singapore.html", title: "What Car Downtime Really Costs in Singapore (2026): The Hidden Price of Being Without the Car for a Few Days", subtopic: "ownership" },
        { url: "/questions-to-answer-after-minor-car-accident-singapore.html", title: "Questions to Answer After a Minor Car Accident in Singapore (2026): A Decision Filter Before You Settle, Claim, or Repair", subtopic: "decision" },
        { url: "/erp-cost-singapore.html", title: "ERP Cost in Singapore (2026): How Much You’ll Pay Per Day + Monthly Budget Model", subtopic: "variable-cost" },
        { url: "/parking-cost-singapore.html", title: "Parking Cost in Singapore (2026): Season Parking, Office, Mall Rates + Real Monthly Budget", subtopic: "variable-cost" },
        { url: "/fuel-cost-singapore.html", title: "Fuel Cost in Singapore (2026): Monthly Budget, Cost Per Km + Realistic Scenarios", subtopic: "variable-cost" },
        { url: "/road-tax-cost-singapore.html", title: "Road Tax Cost in Singapore (2026): How to Budget It Properly for Car Ownership", subtopic: "variable-cost" },
        { url: "/omv-arf-car-taxes-singapore.html", title: "OMV, ARF, and Car Taxes in Singapore (2026): How Car Prices Are Built", subtopic: "pricing" },
        { url: "/car-price-breakdown-singapore.html", title: "Car Price Breakdown in Singapore (2026): What You're Actually Paying For", subtopic: "buying" },
        { url: "/parf-paper-value-deregistration-singapore.html", title: "PARF, Paper Value, and Deregistration in Singapore (2026): What Exit Value Really Means", subtopic: "coe" },
        { url: "/ev-vs-petrol-cost-singapore.html", title: "EV vs Petrol Cost in Singapore (2026): Running Costs, Charging, Road Tax + Break-even", subtopic: "variable-cost" },
        { url: "/ev-charging-cost-singapore.html", title: "EV Charging Cost in Singapore (2026): Home, Public, Fast Charging + Real Monthly Budget", subtopic: "variable-cost" },
        { url: "/home-charging-vs-public-charging-ev-singapore.html", title: "Home Charging vs Public Charging for EVs in Singapore (2026): Cost, Convenience, and Daily Friction", subtopic: "comparison" },
        { url: "/is-an-ev-practical-without-home-charging-singapore.html", title: "Is an EV Practical Without Home Charging in Singapore? (2026 Decision Framework)", subtopic: "decision" },
        { url: "/ev-battery-degradation-singapore.html", title: "EV Battery Degradation in Singapore (2026): What Matters, What Doesn't, and When to Worry", subtopic: "ownership-risk" },
        { url: "/ev-battery-replacement-cost-singapore.html", title: "EV Battery Replacement Cost in Singapore (2026): Real Risk, Warranty Buffer, and When It Matters", subtopic: "ownership-risk" },
        { url: "/should-you-buy-a-used-ev-singapore.html", title: "Should You Buy a Used EV in Singapore? (2026 Decision Framework)", subtopic: "decision" },
        { url: "/ev-resale-value-singapore.html", title: "EV Resale Value in Singapore (2026): What Actually Matters", subtopic: "ownership-risk" },
        { url: "/ev-battery-warranty-singapore.html", title: "EV Battery Warranty in Singapore (2026): Why It Matters More Than Buyers Think", subtopic: "ownership-risk" },
        { url: "/hybrid-vs-petrol-singapore.html", title: "Hybrid vs Petrol in Singapore (2026): Is Hybrid Actually the Smarter Middle Path?", subtopic: "comparison" },
        { url: "/hybrid-vs-ev-singapore.html", title: "Hybrid vs EV in Singapore (2026): Which Transition Route Actually Fits Better?", subtopic: "comparison" },
        { url: "/should-you-buy-a-hybrid-car-singapore.html", title: "Should You Buy a Hybrid Car in Singapore? (2026): Who It Fits, When It Works, and When It Quietly Becomes the Wrong Compromise", subtopic: "decision" },
        { url: "/self-charging-hybrid-vs-plug-in-hybrid-singapore.html", title: "Self-Charging Hybrid vs Plug-In Hybrid in Singapore (2026): Which Hybrid Route Actually Fits Better?", subtopic: "comparison" },
        { url: "/repair-bill-vs-replace-car-singapore.html", title: "Repair Bill vs Replace Car in Singapore (2026): When a Big Repair Should Change the Decision", subtopic: "decision" },
        { url: "/paid-up-old-car-vs-newer-car-with-loan-singapore.html", title: "Paid-Up Old Car vs Newer Car With Loan in Singapore (2026): Is “No Instalment” Still the Smarter Choice?", subtopic: "comparison" },
        { url: "/can-your-household-rely-on-an-aging-car-singapore.html", title: "Can Your Household Rely on an Aging Car in Singapore? (2026): When “Still Running” Is No Longer Good Enough", subtopic: "decision" },
        { url: "/when-an-old-car-becomes-false-economy-singapore.html", title: "When an Old Car Becomes False Economy in Singapore (2026): It’s Already Paid Up, but Is It Still Actually Cheap?", subtopic: "decision" },
        { url: "/public-transport-cost-singapore.html", title: "Public Transport Cost in Singapore (2026): MRT + Bus Monthly Budget Models", subtopic: "alternative" },
        { url: "/motorcycle-ownership-cost-singapore.html", title: "Motorcycle Ownership Cost in Singapore (2026): Monthly Budget + 5-Year Reality Check", subtopic: "alternative" },
        { url: "/motorcycle-insurance-cost-singapore.html", title: "Motorcycle Insurance Cost in Singapore (2026): Premium Ranges, What Moves the Price, and How to Budget It Properly", cluster: "transport", subtopic: "insurance" },
        { url: "/motorcycle-maintenance-cost-singapore.html", title: "Motorcycle Maintenance Cost in Singapore (2026): Servicing, Wear Items, Repair Buffer, and Ownership Reality", cluster: "transport", subtopic: "maintenance" },
        { url: "/how-much-salary-to-own-a-motorcycle-singapore.html", title: "How Much Salary Do You Need to Own a Motorcycle in Singapore? (2026 Affordability Framework)", cluster: "transport", subtopic: "affordability" },
        { url: "/how-much-cash-to-buy-motorcycle-singapore.html", title: "How Much Cash Do You Need to Buy a Motorcycle in Singapore? (2026 Downpayment + Upfront Cost Reality Check)", cluster: "transport", subtopic: "affordability" },
        { url: "/used-motorcycle-vs-new-motorcycle-singapore.html", title: "Used vs New Motorcycle in Singapore (2026): Which Choice Actually Holds Up Better?", cluster: "transport", subtopic: "comparison" },
        { url: "/used-motorcycle-listing-red-flags-singapore.html", title: "Used-Motorcycle Listing Red Flags in Singapore (2026): Which Listings Are Not Worth Your Time Before Viewing?", cluster: "transport", subtopic: "buying" },
        { url: "/buy-used-motorcycle-from-dealer-vs-direct-owner-singapore.html", title: "Buy Used Motorcycle From Dealer vs Direct Owner in Singapore (2026): Which Route Actually Fits You?", cluster: "transport", subtopic: "comparison" },
        { url: "/used-motorcycle-inspection-checklist-singapore.html", title: "Used-Motorcycle Inspection Checklist in Singapore (2026): What to Check Before You Commit", cluster: "transport", subtopic: "buying" },
        { url: "/used-motorcycle-records-checklist-singapore.html", title: "Used-Motorcycle Records Checklist in Singapore (2026): What Paperwork Can — and Cannot — Tell You", cluster: "transport", subtopic: "buying" },
        { url: "/questions-to-answer-before-you-commit-to-used-motorcycle-deal-singapore.html", title: "Questions to Answer Before You Commit to a Used-Motorcycle Deal in Singapore (2026): A Final Decision Filter Before Deposit, Loan, and Regret", cluster: "transport", subtopic: "decision" },
        { url: "/motorcycle-loan-vs-cash-singapore.html", title: "Motorcycle Loan vs Cash in Singapore (2026): When Borrowing Helps and When It Just Makes the Bike Look Cheap", cluster: "transport", subtopic: "financing" },
        { url: "/should-you-build-your-emergency-fund-before-buying-a-motorcycle-singapore.html", title: "Should You Build Your Emergency Fund Before Buying a Motorcycle in Singapore? (2026): The Buffer Question Riders Skip", cluster: "transport", subtopic: "bridge" },
        { url: "/motorcycle-repair-sinking-fund-vs-emergency-fund-singapore.html", title: "Motorcycle Repair Sinking Fund vs Emergency Fund in Singapore (2026): Stop Funding Predictable Bike Wear From Your Shock Reserve", cluster: "transport", subtopic: "bridge" },
        { url: "/bigger-motorcycle-down-payment-vs-larger-cash-buffer-singapore.html", title: "Bigger Motorcycle Down Payment vs Larger Cash Buffer in Singapore (2026): Which One Actually Makes Ownership Safer?", cluster: "transport", subtopic: "bridge" },
        { url: "/how-motorcycle-ownership-changes-your-cash-buffer-plan-singapore.html", title: "How Motorcycle Ownership Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", cluster: "transport", subtopic: "bridge" },
        { url: "/accident-insurance-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html", title: "Accident Insurance vs Bigger Cash Buffer for Motorcycle Riders in Singapore (2026): Which Layer Should Move First?", cluster: "transport", subtopic: "bridge" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer for Motorcycle Riders in Singapore (2026): Which Fragility Matters More?", cluster: "transport", subtopic: "bridge" },
        { url: "/term-life-insurance-vs-bigger-cash-buffer-after-first-child-singapore.html", title: "Term Life Insurance vs Bigger Cash Buffer After First Child in Singapore (2026): Which Gap Deserves the Next Dollar?", cluster: "family", subtopic: "bridge" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-after-first-child-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer After First Child in Singapore (2026): Which Fragility Matters More?", cluster: "family", subtopic: "bridge" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-after-first-child-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer After First Child in Singapore (2026): Which Layer Reduces More Friction?", cluster: "family", subtopic: "bridge" },
        { url: "/how-having-children-changes-your-insurance-priority-order-singapore.html", title: "How Having Children Changes Your Insurance Priority Order in Singapore (2026): What Actually Moves Up the Queue?", cluster: "family", subtopic: "bridge" },
        { url: "/term-life-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Term Life Insurance vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Gap Deserves the Next Dollar?", cluster: "family", subtopic: "bridge" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Fragility Matters More?", cluster: "family", subtopic: "bridge" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Layer Reduces More Friction?", cluster: "family", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-cash-buffer-plan-singapore.html", title: "How Supporting Aging Parents Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", cluster: "family", subtopic: "planning" },
        { url: "/help-aging-parents-now-vs-strengthen-your-own-retirement-first-singapore.html", title: "Help Aging Parents Now vs Strengthen Your Own Retirement First in Singapore (2026): Which Long-Horizon Duty Should Get the Next Dollar?", cluster: "family", subtopic: "bridge" },
        { url: "/top-up-parents-cpf-vs-preserve-your-own-cash-buffer-singapore.html", title: "Top Up Parents' CPF vs Preserve Your Own Cash Buffer in Singapore (2026): Which Move Actually Makes the Family Safer?", cluster: "family", subtopic: "bridge" },
        { url: "/monthly-support-for-aging-parents-vs-build-bigger-emergency-fund-singapore.html", title: "Monthly Support for Aging Parents vs Build a Bigger Emergency Fund in Singapore (2026): Which Layer Should a Sandwich-Generation Household Strengthen First?", cluster: "family", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-investing-priority-order-singapore.html", title: "How Supporting Aging Parents Changes Your Investing Priority Order in Singapore (2026): What Should Move Up the Queue Once Elder Support Becomes Real?", cluster: "family", subtopic: "planning" },
        { url: "/reduce-work-hours-vs-pay-for-caregiving-support-when-supporting-aging-parents-singapore.html", title: "Reduce Work Hours vs Pay for Caregiving Support When Supporting Aging Parents in Singapore (2026): Which Move Actually Protects the Household Better?", cluster: "family", subtopic: "bridge" },
        { url: "/quit-your-job-vs-outsource-more-care-for-aging-parents-singapore.html", title: "Quit Your Job vs Outsource More Care for Aging Parents in Singapore (2026): Which Move Actually Reduces More Household Stress?", cluster: "family", subtopic: "bridge" },
        { url: "/keep-a-flexible-job-vs-higher-pay-when-supporting-aging-parents-singapore.html", title: "Keep a Flexible Job vs Higher Pay When Supporting Aging Parents in Singapore (2026): Which Trade-off Actually Makes the Household Safer?", cluster: "family", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-work-and-income-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Work and Income Decision Order in Singapore (2026): What Should Move Up the Queue Once Care Demands Start Reshaping Work?", cluster: "family", subtopic: "planning" },
        { url: "/split-aging-parent-support-equally-vs-by-income-singapore.html", title: "Split Aging-Parent Support Equally vs by Income in Singapore (2026): What Is Fair When Siblings Cannot Carry the Same Load?", cluster: "family", subtopic: "bridge" },
        { url: "/give-cash-vs-take-on-caregiving-time-for-aging-parents-singapore.html", title: "Give Cash vs Take On Caregiving Time for Aging Parents in Singapore (2026): Which Form of Support Actually Reduces More Family Strain?", cluster: "family", subtopic: "bridge" },
        { url: "/help-siblings-now-vs-preserve-your-own-cash-buffer-when-supporting-parents-singapore.html", title: "Help Siblings Now vs Preserve Your Own Cash Buffer When Supporting Parents in Singapore (2026): When Does Family Bridging Become Household Fragility?", cluster: "family", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-family-burden-sharing-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Family Burden-Sharing Decision Order in Singapore (2026): What Should Siblings Decide First Once Care Obligations Become Real?", cluster: "family", subtopic: "planning" },
        { url: "/hire-home-care-vs-family-caregiver-time-singapore.html", title: "Hire Home Care vs Use Family Caregiver Time in Singapore (2026): Which Form of Capacity Actually Protects the Household Better?", cluster: "family", subtopic: "bridge" },
        { url: "/use-care-insurance-payouts-vs-pay-out-of-pocket-for-home-help-singapore.html", title: "Use Care-Insurance Payouts vs Pay Out of Pocket for Home Help in Singapore (2026): Which Funding Route Actually Keeps Care Sustainable?", cluster: "family", subtopic: "bridge" },
        { url: "/protect-caregiver-income-vs-build-bigger-care-fund-singapore.html", title: "Protect Caregiver Income vs Build a Bigger Care Fund in Singapore (2026): Which Layer Actually Makes the Household Safer?", cluster: "family", subtopic: "bridge" },
        { url: "/caregiver-capacity-vs-home-help-calculator-singapore.html", title: "Caregiver Capacity vs Home Help Calculator Singapore (2026)", cluster: "family", subtopic: "calculator" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer for Motorcycle Riders in Singapore (2026): Which Layer Reduces More Friction?", cluster: "transport", subtopic: "bridge" },
        { url: "/how-motorcycle-ownership-changes-your-insurance-priority-order-singapore.html", title: "How Motorcycle Ownership Changes Your Insurance Priority Order in Singapore (2026): What Actually Moves Up the Queue?", cluster: "transport", subtopic: "bridge" },
        { url: "/motorcycle-depreciation-singapore.html", title: "Motorcycle Depreciation in Singapore (2026): The Quiet Cost That Makes Cheap Bikes Look Cheaper Than They Are", cluster: "transport", subtopic: "ownership-core" },
        { url: "/sell-motorcycle-with-outstanding-loan-singapore.html", title: "Sell a Motorcycle With an Outstanding Loan in Singapore (2026): What Actually Changes About Your Exit, Equity, and Next Move?", cluster: "transport", subtopic: "financing" },
        { url: "/when-to-sell-motorcycle-before-coe-expiry-singapore.html", title: "When to Sell a Motorcycle Before COE Expiry in Singapore (2026): Why Waiting Too Long Shrinks Your Options", cluster: "transport", subtopic: "timing" },
        { url: "/motorcycle-coe-renewal-worth-it-singapore.html", title: "Is Motorcycle COE Renewal Worth It in Singapore? (2026 Decision Framework)", cluster: "transport", subtopic: "coe" },
        { url: "/5-year-vs-10-year-motorcycle-coe-renewal-singapore.html", title: "5-Year vs 10-Year Motorcycle COE Renewal in Singapore (2026): Which Commitment Actually Fits?", cluster: "transport", subtopic: "coe" },
        { url: "/motorcycle-coe-renew-vs-replace-singapore.html", title: "Motorcycle COE Renew vs Replace in Singapore (2026): Which Decision Actually Holds Up?", cluster: "transport", subtopic: "comparison" },
        { url: "/trade-in-vs-direct-sale-motorcycle-singapore.html", title: "Trade-In vs Direct Sale for Motorcycles in Singapore (2026): Which Exit Route Actually Leaves You Better Off?", cluster: "transport", subtopic: "comparison" },
        { url: "/consignment-vs-dealer-sale-motorcycle-singapore.html", title: "Consignment vs Dealer Sale for Motorcycles in Singapore (2026): Which Intermediary Route Actually Fits Sellers Better?", cluster: "transport", subtopic: "comparison" },
        { url: "/should-you-repair-motorcycle-before-selling-singapore.html", title: "Should You Repair a Motorcycle Before Selling in Singapore? (2026): When Fixing Helps, When It Does Not, and What Buyers Actually Notice", cluster: "transport", subtopic: "decision" },
        { url: "/motorcycle-vs-car-cost-singapore.html", title: "Motorcycle vs Car Cost in Singapore (2026): Full Exposure Comparison", cluster: "transport", subtopic: "comparison" },
        { url: "/own-car-vs-public-transport-singapore.html", title: "Own a Car vs Public Transport in Singapore (2026): The Real Decision", subtopic: "comparison" },
        { url: "/car-sharing-vs-owning-a-car-singapore.html", title: "Car-Sharing vs Owning a Car in Singapore (2026): Which Makes More Sense?", subtopic: "comparison" },
        { url: "/weekend-car-rental-vs-owning-a-car-singapore.html", title: "Weekend Car Rental vs Owning a Car in Singapore (2026): Which Makes More Sense?", subtopic: "comparison" },
        { url: "/sedan-vs-suv-singapore.html", title: "Sedan vs SUV in Singapore (2026): Which Body Style Actually Fits Your Life?", subtopic: "comparison" },
        { url: "/suv-vs-mpv-for-families-singapore.html", title: "SUV vs MPV for Families in Singapore (2026): Which Actually Handles Family Logistics Better?", subtopic: "comparison" },
        { url: "/do-you-really-need-a-7-seater-singapore.html", title: "Do You Really Need a 7-Seater in Singapore? (2026): When Extra Seats Solve Real Life — and When They Become Expensive Dead Capacity", subtopic: "comparison" },
        { url: "/small-car-vs-big-car-singapore.html", title: "Small Car vs Big Car in Singapore (2026): Which Everyday Size Actually Fits Better?", subtopic: "comparison" },
        { url: "/off-peak-car-vs-normal-car-singapore.html", title: "Off-Peak Car vs Normal Car in Singapore (2026): Are the Savings Worth the Restrictions?", subtopic: "comparison" },
        { url: "/should-you-buy-an-off-peak-car-singapore.html", title: "Should You Buy an Off-Peak Car in Singapore? (2026): Who It Fits, When It Works, and When It Quietly Becomes the Wrong Compromise", subtopic: "decision" },
        { url: "/company-car-vs-car-allowance-singapore.html", title: "Company Car vs Car Allowance in Singapore (2026): Which Mobility Benefit Actually Leaves You Better Off?", subtopic: "comparison" },
        { url: "/car-subscription-vs-buying-singapore.html", title: "Car Subscription vs Buying in Singapore (2026): When Paying More for Flexibility Is Actually Rational", subtopic: "leasing" },
        { url: "/does-your-household-need-a-second-car-singapore.html", title: "Does Your Household Need a Second Car in Singapore? (2026 Decision Framework)", subtopic: "comparison" },
        { url: "/second-car-vs-ride-hailing-singapore.html", title: "Second Car vs Ride-Hailing in Singapore (2026): Which Is Smarter for a One-Car Household?", subtopic: "comparison" },
        { url: "/car-sharing-vs-ride-hailing-singapore.html", title: "Car-Sharing vs Ride-Hailing in Singapore (2026): Which Access Model Fits Better?", subtopic: "comparison" },
        { url: "/coe-renew-vs-replace-singapore.html", title: "Renew COE vs Replace Car in Singapore (2026): Decision Framework + Break-even", subtopic: "comparison" },
        { url: "/car-vs-ride-hailing-cost.html", title: "Car vs Ride-Hailing in Singapore: Which Is Cheaper?", subtopic: "ridehailing" },
        { url: "/car-affordability-calculator-singapore.html", title: "Car Affordability Calculator Singapore (2026): Stress-Tested True Monthly Cost", subtopic: "calculator" },
        { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs Ride-Hailing Break-Even Calculator", subtopic: "calculator" },
        { url: "/is-it-worth-owning-a-car-singapore.html", title: "Is It Worth Owning a Car in Singapore? (2026 Decision Framework)", subtopic: "decision" },
        { url: "/cheapest-car-to-own-singapore.html", title: "Cheapest Car to Own in Singapore (2026): What “Cheap” Actually Means", subtopic: "affordability" },
        { url: "/how-much-salary-to-own-a-car-singapore.html", title: "How Much Salary Do You Need to Own a Car in Singapore? (2026 Reality Check)", subtopic: "affordability" },
        { url: "/how-much-cash-to-buy-car-singapore.html", title: "How Much Cash Do You Need to Buy a Car in Singapore? (2026 Downpayment + Upfront Costs)", subtopic: "affordability" },
        { url: "/best-car-to-buy-singapore.html", title: "Best Car to Buy in Singapore (2026): Cost vs Practicality Framework (Lowest Regret)", subtopic: "decision" },
        { url: "/used-car-vs-new-car-singapore.html", title: "Used vs New Car in Singapore (2026): Which Is Cheaper Over 5 Years?", subtopic: "ownership" },
        { url: "/used-car-inspection-checklist-singapore.html", title: "Used Car Inspection Checklist in Singapore (2026): What to Check Before You Commit", subtopic: "buying" },
        { url: "/used-car-records-checklist-singapore.html", title: "Used-Car Records Checklist in Singapore (2026): What Paperwork Can — and Cannot — Tell You", subtopic: "buying" },
        { url: "/used-car-dealer-warranty-singapore.html", title: "Used-Car Dealer Warranty in Singapore (2026): What It Actually Protects — and What It Does Not", subtopic: "buying" },
        { url: "/buy-used-car-from-dealer-vs-direct-owner-singapore.html", title: "Buy Used Car From Dealer vs Direct Owner in Singapore (2026): Which Route Actually Fits You?", subtopic: "comparison" },
        { url: "/mileage-vs-age-when-buying-used-car-singapore.html", title: "Mileage vs Age When Buying a Used Car in Singapore (2026): Which Signal Matters More — and When One Quietly Lies to You", subtopic: "buying" },
        { url: "/used-car-listing-red-flags-singapore.html", title: "Used-Car Listing Red Flags in Singapore (2026): Which Listings Are Not Worth Your Time — Even Before Viewing", subtopic: "buying" },
        { url: "/questions-to-answer-before-you-commit-to-car-deal-singapore.html", title: "Questions to Answer Before You Commit to a Car Deal in Singapore (2026): A Final Decision Filter Before Deposit, Loan, and Regret", subtopic: "decision" },
        { url: "/low-monthly-payment-traps-when-buying-car-singapore.html", title: "Low Monthly Payment Traps When Buying a Car in Singapore (2026): Why ‘Can Afford the Monthly’ Is Not the Same as ‘Good Deal’", subtopic: "financing" },
        { url: "/trade-in-vs-direct-sale-car-singapore.html", title: "Trade-In vs Direct Sale for Cars in Singapore (2026): Which Exit Route Actually Leaves You Better Off?", subtopic: "comparison" },
        { url: "/consignment-vs-dealer-sale-car-singapore.html", title: "Consignment vs Dealer Sale for Cars in Singapore (2026): More Upside, More Waiting, or Just More Uncertainty?", subtopic: "comparison" },
        { url: "/should-you-repair-car-before-selling-singapore.html", title: "Should You Repair Your Car Before Selling in Singapore? (2026): What to Fix, What to Leave, and When ‘As-Is’ Is Smarter", subtopic: "decision" },
        { url: "/when-to-sell-your-car-before-coe-expiry-singapore.html", title: "When to Sell Your Car Before COE Expiry in Singapore (2026): Why Waiting Too Long Shrinks Your Options", subtopic: "timing" },
        { url: "/car-leasing-vs-buying-singapore.html", title: "Car Leasing vs Buying in Singapore: Which Is Cheaper?", subtopic: "leasing" },
        { url: "/car-loan-rates-singapore.html", title: "Car Loan Rates in Singapore (2026): Flat Rate vs Effective Interest Explained", subtopic: "financing" },
        { url: "/sell-car-with-outstanding-loan-singapore.html", title: "Sell a Car With an Outstanding Loan in Singapore (2026): What Actually Happens to Your Equity, Exit Options, and Next Move?", subtopic: "financing" },
        { url: "/trade-in-car-with-outstanding-loan-singapore.html", title: "Trade In a Car With an Outstanding Loan in Singapore (2026): Convenient Exit or Dangerous Financing Shortcut?", subtopic: "financing" },
        { url: "/should-you-settle-car-loan-early-singapore.html", title: "Should You Settle a Car Loan Early in Singapore? (2026): Real Savings, Better Optionality, or Just Emotional Relief?", subtopic: "financing" },
        { url: "/when-to-upgrade-car-with-outstanding-loan-singapore.html", title: "When to Upgrade a Car With an Outstanding Loan in Singapore (2026): Timing It Well vs Forcing the Move Too Early", subtopic: "timing" },
        { url: "/transport/financing/", title: "Transport Financing (Singapore, 2026): Car Loans, Leasing, and Payment Structure", subtopic: "financing" },
        { url: "/coe-renewal-worth-it-singapore.html", title: "Should You Renew COE in Singapore? (2026 Decision Framework + Break-Even)", subtopic: "coe" },
        { url: "/10-year-coe-renewal-worth-it-singapore.html", title: "Is 10-Year COE Renewal Worth It in Singapore? (2026 Financial Breakdown)", subtopic: "coe" },
        { url: "/5-year-coe-renewal-worth-it-singapore.html", title: "5-Year COE Renewal: Is It Worth It in Singapore? (2026 Decision Framework)", subtopic: "coe" },
        { url: "/coe-cost-singapore.html", title: "COE Cost in Singapore (2026)", subtopic: "coe" },
        { url: "/buy-family-car-or-increase-hospitalisation-rider-first-singapore.html", title: "Buy a Family Car or Increase Hospitalisation Rider First in Singapore (2026): Which Problem Is More Dangerous to Leave Underbuilt?", subtopic: "bridge" },
        { url: "/buy-family-car-or-fund-helper-first-singapore.html", title: "Buy a Family Car or Fund a Helper First in Singapore (2026): Which Choice Removes More Daily Family Strain?", subtopic: "bridge" },
        { url: "/buy-family-car-or-increase-term-life-insurance-first-singapore.html", title: "Buy a Family Car or Increase Term Life Insurance First in Singapore (2026): Which Gap Is More Dangerous Right Now?", subtopic: "bridge" },
        { url: "/buy-family-car-or-move-closer-to-work-and-school-first-singapore.html", title: "Buy a Family Car or Move Closer to Work and School First in Singapore (2026): Which Choice Actually Reduces More Daily Friction?", subtopic: "bridge" }
      ],
      bridges: [
        { url: "/property-ownership-cost-singapore.html", title: "Property Ownership Cost in Singapore (2026): 5-Year Total Exposure Model", cluster: "property" }
      
      ]
    },

    property: {
      label: "Related Singapore Property Breakdowns",
      pillars: [
        { url: "/property-ownership-cost-singapore.html", title: "Property Ownership Cost in Singapore (2026): 5-Year Total Exposure Model", subtopic: "ownership" },
        { url: "/bsd-absd-singapore.html", title: "BSD & ABSD in Singapore (2026): Stamp Duty Cost, Cash Impact, and Decision Rules", subtopic: "acquisition" },
        { url: "/bsd-absd-calculator-singapore.html", title: "BSD & ABSD Calculator Singapore (2026): Buyer’s Stamp Duty + Additional Buyer’s Stamp Duty", subtopic: "calculator" },
        { url: "/how-much-cash-to-buy-property-calculator-singapore.html", title: "How Much Cash to Buy Property Calculator (Singapore, 2026): Upfront Cash + CPF", subtopic: "calculator" },
        { url: "/sell-property-proceeds-calculator-singapore.html", title: "Sell Property Proceeds Calculator (Singapore, 2026): Cash vs CPF Reality", subtopic: "calculator" },
        { url: "/buy-bigger-home-or-help-parents-with-housing-costs-first-singapore.html", title: "Buy a Bigger Home or Help Parents With Housing Costs First in Singapore (2026): Which Commitment Should Go First?", subtopic: "bridge" },
        { url: "/upgrade-home-now-or-keep-more-flexibility-for-aging-parents-singapore.html", title: "Upgrade Home Now or Keep More Flexibility for Aging Parents in Singapore (2026): Which Choice Keeps the Household Safer?", subtopic: "bridge" },
        { url: "/property-valuation-vs-asking-price-singapore.html", title: "Property Valuation vs Asking Price in Singapore (2026): Why Sellers Misread What Their Home Can Actually Fetch", subtopic: "exit" },
        { url: "/selling-property-timeline-singapore.html", title: "Selling Property Timeline in Singapore (2026): How Long It Really Takes and Why Timing Assumptions Break Plans", subtopic: "exit" },
        { url: "/property-seller-agent-commission-singapore.html", title: "Property Seller Agent Commission in Singapore (2026): When Lower Fees Improve Your Outcome and When They Cost You More Than They Save", subtopic: "exit" },
        { url: "/how-to-price-your-property-to-sell-singapore.html", title: "How to Price Your Property to Sell in Singapore (2026): Set an Asking Price That Actually Executes", subtopic: "exit" },
        { url: "/lower-asking-price-now-vs-wait-longer-property-singapore.html", title: "Lower Asking Price Now vs Wait Longer for Property in Singapore (2026): When Patience Helps and When It Gets Expensive", subtopic: "timing" },
        { url: "/how-to-position-property-to-sell-faster-singapore.html", title: "How to Position Property to Sell Faster in Singapore (2026): Reduce Friction Without Confusing Hype for Value", subtopic: "exit" },
        { url: "/renovate-before-selling-or-sell-as-is-singapore.html", title: "Renovate Before Selling or Sell As-Is in Singapore? (2026): When Pre-Sale Spending Helps and When It Just Shrinks Your Net Proceeds", subtopic: "exit" },
        { url: "/sell-before-or-after-moving-out-singapore.html", title: "Sell Before or After Moving Out in Singapore (2026): Which Route Actually Makes Your Sale Easier?", subtopic: "exit" },
        { url: "/sell-property-with-tenant-or-vacant-possession-singapore.html", title: "Sell Property With Tenant or Vacant Possession in Singapore (2026): Which Route Actually Fits Your Exit?", subtopic: "exit" },
        { url: "/property-listing-readiness-checklist-singapore.html", title: "Property Listing Readiness Checklist in Singapore (2026): Are You Actually Ready to Sell Yet?", subtopic: "exit" },
        { url: "/what-documents-to-prepare-before-selling-property-singapore.html", title: "What Documents to Prepare Before Selling Property in Singapore (2026): Seller Prep That Prevents Delay", subtopic: "exit" },
        { url: "/bridging-loan-singapore.html", title: "Bridging Loan in Singapore (2026): When It Solves a Timing Gap and When It Just Hides an Overstretched Move", subtopic: "planning" },
        { url: "/extension-of-stay-after-selling-property-singapore.html", title: "Extension of Stay After Selling Property in Singapore (2026): When It Helps the Move and When It Only Delays a Weak Plan", subtopic: "planning" },
        { url: "/option-to-purchase-otp-singapore.html", title: "Option to Purchase (OTP) in Singapore Property (2026): When Interest Turns Into Commitment and Why Many Moves Get Too Real Too Fast", subtopic: "mechanics" },
        { url: "/property-option-fee-exercise-fee-singapore.html", title: "Property Option Fee & Exercise Fee in Singapore (2026): The Early Cash Commitments Buyers Misread", subtopic: "mechanics" },
        { url: "/conveyancing-legal-fees-property-singapore.html", title: "Conveyancing & Legal Fees for Property in Singapore (2026): What Buyers Actually Pay For", subtopic: "mechanics" },
        { url: "/bank-valuation-for-property-purchase-singapore.html", title: "Bank Valuation for Property Purchase in Singapore (2026): When It Matters and Why Buyers Misread It", subtopic: "financing" },
        { url: "/property-buyer-agent-commission-singapore.html", title: "Property Buyer Agent Commission in Singapore (2026): When Paying for Representation Helps and When It Does Not", subtopic: "acquisition" },
        { url: "/property-viewing-checklist-singapore.html", title: "Property Viewing Checklist in Singapore (2026): What to Check Before You Fall in Love With a Unit", subtopic: "buying" },
        { url: "/resale-property-defects-checklist-singapore.html", title: "Resale Property Defects Checklist in Singapore (2026): What to Notice, What to Price In, and When to Walk Away", subtopic: "buying" },
        { url: "/how-to-check-mcst-management-before-buying-condo-singapore.html", title: "How to Check MCST Management Before Buying a Condo in Singapore (2026): Estate Quality, Upkeep, and the Signals Buyers Miss", subtopic: "condo" },
        { url: "/questions-to-answer-before-making-property-offer-singapore.html", title: "Questions to Answer Before Making a Property Offer in Singapore (2026): A Pre-Commitment Filter for Buyers", subtopic: "decision" },
        { url: "/freehold-vs-leasehold-singapore.html", title: "Freehold vs Leasehold in Singapore (2026): When Tenure Matters and When Buyers Overpay for the Story", subtopic: "comparison" },
        { url: "/high-floor-vs-low-floor-property-singapore.html", title: "High Floor vs Low Floor Property in Singapore (2026): What Actually Matters Beyond Status and View", subtopic: "comparison" },
        { url: "/bigger-home-farther-out-vs-smaller-home-better-location-singapore.html", title: "Bigger Home Farther Out vs Smaller Home in a Better Location in Singapore (2026): Which Compromise Actually Hurts Less?", subtopic: "comparison" },
        { url: "/sun-heat-noise-and-road-exposure-property-singapore.html", title: "Sun, Heat, Noise, and Road Exposure for Property in Singapore (2026): The Hidden Daily Friction Buyers Underweight", subtopic: "buying" },
        { url: "/2-bedroom-vs-3-bedroom-condo-singapore.html", title: "2-Bedroom vs 3-Bedroom Condo in Singapore (2026): Which Size Actually Fits Your Household Without Forcing an Early Upgrade?", subtopic: "comparison" },
        { url: "/4-room-vs-5-room-hdb-singapore.html", title: "4-Room vs 5-Room HDB in Singapore (2026): Which Size Actually Fits the Household Without Paying for Dead Space?", subtopic: "comparison" },
        { url: "/layout-efficiency-vs-bigger-square-footage-singapore.html", title: "Layout Efficiency vs Bigger Square Footage in Singapore (2026): Why a Smaller Home Can Still Work Better Than a Larger One", subtopic: "comparison" },
        { url: "/buy-for-current-needs-or-one-stage-ahead-property-singapore.html", title: "Buy for Current Needs or One Stage Ahead in Singapore Property (2026): How Much Future-Proofing Is Actually Rational?", subtopic: "decision" },
        { url: "/should-you-downsize-your-home-singapore.html", title: "Should You Downsize Your Home in Singapore? (2026): When More Space Stops Helping and Starts Costing You", subtopic: "decision" },
        { url: "/stay-in-current-home-or-right-size-property-singapore.html", title: "Stay in Your Current Home or Right-Size in Singapore? (2026): When Moving Solves the Next Stage — and When It Just Creates New Friction", subtopic: "decision" },
        { url: "/release-cash-by-moving-to-smaller-home-singapore.html", title: "Release Cash by Moving to a Smaller Home in Singapore? (2026): When Equity Release Helps — and When the Trade-Off Is Smaller Than It Looks", subtopic: "planning" },
        { url: "/downsizing-to-hdb-or-condo-later-life-singapore.html", title: "Downsizing to HDB or Condo Later in Life in Singapore? (2026): Which Route Actually Fits the Next Stage Better?", subtopic: "comparison" },
        { url: "/move-in-ready-vs-renovate-singapore.html", title: "Move-In Ready vs Renovate in Singapore (2026): Which Post-Purchase Setup Path Actually Fits?", subtopic: "decision" },
        { url: "/how-much-renovation-buffer-singapore.html", title: "How Much Renovation Buffer Do You Need in Singapore? (2026): Budgeting for Overruns Without Breaking the Move", subtopic: "planning" },
        { url: "/defects-and-snagging-after-handover-singapore.html", title: "Defects and Snagging After Handover in Singapore (2026): What to Do When the Home Is Handed Over but Not Truly Ready", subtopic: "buying" },
        { url: "/furnish-all-at-once-or-phase-it-singapore.html", title: "Furnish All at Once or Phase It in Singapore? (2026): How to Set Up a Home Without Destroying Your Liquidity", subtopic: "ownership" },
        { url: "/rent-out-vs-sell-calculator-singapore.html", title: "Rent Out vs Sell Calculator (Singapore, 2026): Net Worth After X Years", subtopic: "calculator" },
        { url: "/upgrade-downgrade-property-calculator-singapore.html", title: "Upgrade / Downgrade Property Calculator (Singapore, 2026): Sell → Buy Next, Cash + CPF", subtopic: "calculator" },
        { url: "/property-upgrade-ladder-calculator-singapore.html", title: "Property Upgrade Ladder Calculator (Singapore, 2026): Target Price → Required Income + Cash Buffer", subtopic: "calculator" },
        
        { url: "/mortgage-interest-cost-singapore.html", title: "Mortgage Interest Cost in Singapore (2026): How Much You Really Pay Over 25–30 Years", subtopic: "financing" },
        { url: "/mortgage-amortization-calculator-singapore.html", title: "Mortgage Amortization Calculator (Singapore, 2026): Monthly Payment + Total Interest", subtopic: "calculator" },
        { url: "/pay-down-mortgage-vs-invest-calculator-singapore.html", title: "Pay Down Mortgage vs Invest Calculator (Singapore, 2026)", subtopic: "calculator" },
        { url: "/refinance-savings-calculator-singapore.html", title: "Refinance Savings Calculator (Singapore, 2026): Break‑Even Months + Interest Saved", subtopic: "calculator" },
        { url: "/hdb-loan-vs-bank-loan-calculator-singapore.html", title: "HDB vs Bank Loan Calculator Singapore (2026): Monthly + Total Interest", subtopic: "calculator" },
        { url: "/tdsr-msr-singapore.html", title: "TDSR & MSR in Singapore (2026): How Much You Can Really Borrow for Property", subtopic: "financing" },
        { url: "/loan-to-value-ltv-singapore.html", title: "Loan-to-Value (LTV) in Singapore Property (2026): What It Really Limits", subtopic: "financing" },
        { url: "/in-principle-approval-home-loan-singapore.html", title: "Approval in Principle (AIP / IPA) for Home Loans in Singapore (2026)", subtopic: "financing" },
        { url: "/home-loan-lock-in-prepayment-penalty-singapore.html", title: "Home Loan Lock-In Period and Prepayment Penalty in Singapore (2026): When Flexibility Matters", subtopic: "financing" },
        { url: "/home-loan-refinancing-costs-singapore.html", title: "Home Loan Refinancing Costs in Singapore (2026): Fees, Subsidies, and Break-Even Reality", subtopic: "financing" },
        { url: "/tdsr-msr-calculator-singapore.html", title: "TDSR / MSR Calculator Singapore (2026): Max Home Loan & Borrowing Limit", subtopic: "calculator" },
        { url: "/property/financing/", title: "Property Financing (Singapore, 2026): Home Loans, Refinancing, Borrowing Rules", subtopic: "financing" },
        { url: "/cash-over-valuation-cov-singapore.html", title: "Cash Over Valuation (COV) in Singapore (2026): Why Resale Deals Can Still Fail", subtopic: "acquisition" },
        { url: "/property-tax-singapore.html", title: "Property Tax in Singapore (2026): How It Changes the Real Cost of Holding a Home", subtopic: "holding-cost" },
        { url: "/hdb-service-conservancy-charges-singapore.html", title: "HDB Service and Conservancy Charges in Singapore (2026): The Recurring Cost Many Buyers Underweight", subtopic: "holding-cost" },
        { url: "/minimum-occupation-period-mop-singapore.html", title: "Minimum Occupation Period (MOP) in Singapore (2026): The Flexibility Lock-Up Many Buyers Underestimate", subtopic: "hdb" },
        { url: "/resale-levy-singapore.html", title: "Resale Levy in Singapore (2026): The Subsidy Clawback Many Second-Timers Underestimate", subtopic: "hdb" },
        { url: "/enhanced-cpf-housing-grant-ehg-singapore.html", title: "Enhanced CPF Housing Grant (EHG) in Singapore (2026): How It Changes Affordability, Route Choice, and Grant Expectations", subtopic: "hdb" },
        { url: "/family-grant-singapore.html", title: "Family Grant in Singapore (2026): How It Changes Resale HDB Economics, Speed, and Upgrade Planning", subtopic: "hdb" },
        { url: "/proximity-housing-grant-phg-singapore.html", title: "Proximity Housing Grant (PHG) in Singapore (2026): When Living Near Family Changes the Real Housing Decision", subtopic: "hdb" },
        { url: "/hdb-income-ceiling-singapore.html", title: "HDB Income Ceiling in Singapore (2026): The Eligibility Gate Many Buyers Confuse with Affordability", subtopic: "hdb" },
        { url: "/hfe-letter-singapore.html", title: "HFE Letter in Singapore (2026): The HDB Process Gate That Shapes Eligibility, Grants, and Loan Planning", subtopic: "hdb" },
        { url: "/deferred-income-assessment-singapore.html", title: "Deferred Income Assessment in Singapore (2026): When Young Buyers Should Delay the HDB Income Test", subtopic: "hdb" },
        { url: "/staggered-downpayment-singapore.html", title: "Staggered Downpayment in Singapore (2026): When HDB Cashflow Sequencing Makes a Flat More Workable", subtopic: "hdb" },
        { url: "/sales-of-balance-flats-sbf-singapore.html", title: "Sales of Balance Flats (SBF) in Singapore (2026): When It Beats Waiting for BTO or Stretching for Resale", subtopic: "hdb" },
        { url: "/open-booking-of-flats-singapore.html", title: "Open Booking of Flats in Singapore (2026): When Immediate Access Beats Waiting for the Ideal Launch", subtopic: "hdb" },
        { url: "/bto-ballot-and-wait-time-singapore.html", title: "BTO Ballot and Wait Time in Singapore (2026): When a Cheaper Route Becomes Expensive Through Delay and Uncertainty", subtopic: "hdb" },
        { url: "/joint-tenancy-vs-tenancy-in-common-singapore.html", title: "Joint Tenancy vs Tenancy in Common in Singapore (2026): The Ownership Choice That Shapes Exit, Inheritance, and Flexibility", subtopic: "ownership-structure" },
        { url: "/property-decoupling-singapore.html", title: "Property Decoupling in Singapore (2026): When It Helps, When It Backfires, and Why It Is Not a Default Trick", subtopic: "ownership-structure" },
        { url: "/buying-property-with-parents-or-family-singapore.html", title: "Buying Property With Parents or Family in Singapore (2026): When Co-Ownership Helps and When It Becomes Future Friction", subtopic: "ownership-structure" },
        { url: "/what-happens-to-property-when-an-owner-dies-singapore.html", title: "What Happens to Property When an Owner Dies in Singapore (2026): Title Structure, Survivorship, and the Decisions Families Face Next", subtopic: "inheritance" },
        { url: "/selling-an-inherited-property-singapore.html", title: "Selling an Inherited Property in Singapore (2026): Why Succession Sales Feel Different from Ordinary Resales", subtopic: "inheritance" },
        { url: "/sales-of-balance-flats-sbf-singapore.html", title: "Sales of Balance Flats (SBF) in Singapore (2026): When It Beats Waiting for BTO or Stretching for Resale", subtopic: "hdb" },
        { url: "/open-booking-of-flats-singapore.html", title: "Open Booking of Flats in Singapore (2026): When Immediate Access Beats Waiting for the Ideal Launch", subtopic: "hdb" },
        { url: "/bto-ballot-and-wait-time-singapore.html", title: "BTO Ballot and Wait Time in Singapore (2026): When a Cheaper Route Becomes Expensive Through Delay and Uncertainty", subtopic: "hdb" },
        { url: "/condo-maintenance-fees-mcst-sinking-fund-singapore.html", title: "Condo Maintenance Fees in Singapore (2026): MCST, Sinking Funds, and the Real Monthly Carrying Cost", subtopic: "holding-cost" },
        { url: "/home-maintenance-cost-singapore.html", title: "Home Maintenance Cost in Singapore (2026): Repairs, Replacements, and the Real Upkeep Budget", subtopic: "maintenance" },
        { url: "/home-protection-scheme-hps-singapore.html", title: "Home Protection Scheme (HPS) in Singapore (2026): What It Protects, What It Does Not, and Why HDB Owners Confuse It with Home Insurance", subtopic: "protection" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Protects the Household Better?", subtopic: "bridge" },
        { url: "/critical-illness-insurance-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Critical Illness Insurance vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Buys More Breathing Room?", subtopic: "bridge" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Reduces More Fragility?", subtopic: "bridge" },
        { url: "/term-life-vs-cash-buffer-for-single-income-mortgage-singapore.html", title: "Term Life vs Cash Buffer for a Single-Income Mortgage in Singapore (2026): Which Missing Layer Is More Dangerous Right Now?", subtopic: "bridge" },
        { url: "/move-house-for-school-vs-stay-put-singapore.html", title: "Move House for School vs Stay Put in Singapore (2026): When a School-Driven Move Actually Improves Family Fit", subtopic: "planning" },
        { url: "/live-near-parents-vs-live-near-school-singapore.html", title: "Live Near Parents vs Live Near School in Singapore (2026): Which Location Advantage Actually Makes Family Life Easier?", subtopic: "planning" },
        { url: "/pay-down-home-loan-or-keep-bigger-cash-buffer-before-second-child-singapore.html", title: "Pay Down Home Loan or Keep a Bigger Cash Buffer Before a Second Child in Singapore (2026): Which Move Better Protects the Household?", subtopic: "bridge" },
        { url: "/home-insurance-vs-fire-insurance-singapore.html", title: "Home Insurance vs Fire Insurance in Singapore (2026): What Homeowners Actually Need to Know", subtopic: "protection" },
        { url: "/progressive-payment-vs-resale-payment-timeline-singapore.html", title: "Progressive Payment vs Resale Payment Timeline in Singapore (2026): Why Cashflow Feels Different", subtopic: "mechanics" },
        { url: "/cpf-accrued-interest-singapore.html", title: "CPF Accrued Interest in Singapore Property (2026): Why Your Sale Proceeds “Disappear”", subtopic: "cpf" },
        { url: "/cpf-accrued-interest-calculator-singapore.html", title: "CPF Accrued Interest Calculator Singapore (OA): Estimate Refund on Sale", subtopic: "cpf" },
        { url: "/property-upgrade-planner-singapore.html", title: "Property Upgrade Planner Singapore: Sell → Buy Next (Step-by-Step)", subtopic: "planning" },
        { url: "/property-sell-buy-pipeline-calculator-singapore.html", title: "Sell → Buy Next Pipeline Calculator (Singapore, 2026): Prefilled Tools", subtopic: "planning" },
        { url: "/renovation-cost-singapore.html", title: "Renovation Cost in Singapore (2026): Realistic Budgets and Cash Shock Planning", subtopic: "setup" },
        { url: "/sell-property-cost-singapore.html", title: "Sell Property Cost in Singapore (2026): Fees, SSD, and Net Proceeds Reality", subtopic: "exit" },
        { url: "/condo-ownership-cost.html", title: "The Real Cost of Owning a Condo in Singapore (2026)", subtopic: "condo" },
        { url: "/rental-property-ownership-cost.html", title: "The Real Cost of Owning a Rental Property in Singapore (2026)", subtopic: "rental" },
        { url: "/vacancy-turnover-cost-rental-property-singapore.html", title: "Vacancy and Turnover Cost for Rental Property in Singapore (2026): The Friction That Gross Rent Hides", subtopic: "rental" },
        { url: "/gross-vs-net-rental-yield-singapore.html", title: "Gross vs Net Rental Yield in Singapore (2026): Why Headline Yield Misleads", subtopic: "rental" },
        { url: "/rental-agent-commission-singapore.html", title: "Rental Agent Commission in Singapore (2026): When It Hurts Returns and When It Still Makes Sense", subtopic: "rental" },
        { url: "/lease-renewal-vs-new-tenant-cost-singapore.html", title: "Lease Renewal vs New Tenant Cost in Singapore (2026): Why Chasing Market Rent Can Backfire", subtopic: "rental" },
        { url: "/how-to-screen-tenants-singapore.html", title: "How to Screen Tenants in Singapore (2026): Reduce Rental Friction Before the Lease Starts", subtopic: "rental" },
        { url: "/furnished-vs-unfurnished-rental-singapore.html", title: "Furnished vs Unfurnished Rental in Singapore (2026): Which Setup Actually Fits the Landlord Strategy?", subtopic: "rental" },
        { url: "/rental-security-deposit-and-repair-friction-singapore.html", title: "Rental Security Deposit and Repair Friction in Singapore (2026): The Small Lease Fights That Erode Returns", subtopic: "rental" },
        { url: "/diplomatic-clause-and-early-termination-risk-singapore.html", title: "Diplomatic Clause and Early Termination Risk in Singapore (2026): Why Headline Rent Is Not the Whole Lease", subtopic: "rental" },
        { url: "/how-to-price-rental-property-singapore.html", title: "How to Price Rental Property in Singapore (2026): Set Asking Rent Without Self-Inflicted Vacancy", subtopic: "rental" },
        { url: "/lower-rent-now-vs-hold-out-longer-singapore.html", title: "Lower Rent Now vs Hold Out Longer in Singapore (2026): When Vacancy Costs More Than Pride", subtopic: "rental" },
        { url: "/how-to-position-rental-property-to-rent-faster-singapore.html", title: "How to Position Rental Property to Rent Faster in Singapore (2026): Reduce Mismatch Before You Cut Price", subtopic: "rental" },
        { url: "/when-to-cut-asking-rent-rental-singapore.html", title: "When to Cut Asking Rent for Your Rental Property in Singapore (2026): Reset Early Before the Listing Goes Stale", subtopic: "rental" },
        { url: "/how-to-screen-tenants-singapore.html", title: "How to Screen Tenants in Singapore (2026): Reduce Rental Friction Before the Lease Starts", subtopic: "rental" },
        { url: "/furnished-vs-unfurnished-rental-singapore.html", title: "Furnished vs Unfurnished Rental in Singapore (2026): Which Setup Actually Fits the Landlord Strategy?", subtopic: "rental" },
        { url: "/rental-security-deposit-and-repair-friction-singapore.html", title: "Rental Security Deposit and Repair Friction in Singapore (2026): The Small Lease Fights That Erode Returns", subtopic: "rental" },
        { url: "/diplomatic-clause-and-early-termination-risk-singapore.html", title: "Diplomatic Clause and Early Termination Risk in Singapore (2026): Why Headline Rent Is Not the Whole Lease", subtopic: "rental" },
        { url: "/how-to-price-rental-property-singapore.html", title: "How to Price Rental Property in Singapore (2026): Set Asking Rent Without Self-Inflicted Vacancy", subtopic: "rental" },
        { url: "/lower-rent-now-vs-hold-out-longer-singapore.html", title: "Lower Rent Now vs Hold Out Longer in Singapore (2026): When Vacancy Costs More Than Pride", subtopic: "rental" },
        { url: "/how-to-position-rental-property-to-rent-faster-singapore.html", title: "How to Position Rental Property to Rent Faster in Singapore (2026): Reduce Mismatch Before You Cut Price", subtopic: "rental" },
        { url: "/when-to-cut-asking-rent-rental-singapore.html", title: "When to Cut Asking Rent for Your Rental Property in Singapore (2026): Reset Early Before the Listing Goes Stale", subtopic: "rental" },
        { url: "/bto-vs-resale-cost.html", title: "BTO vs Resale in Singapore: The Full Cost Comparison (2026)", subtopic: "hdb" },
        { url: "/property-tax-singapore.html", title: "Property Tax in Singapore (2026): How It Changes the Real Cost of Holding a Home", subtopic: "holding-cost" },
        { url: "/condo-maintenance-fees-mcst-sinking-fund-singapore.html", title: "Condo Maintenance Fees in Singapore (2026): MCST, Sinking Funds, and the Real Monthly Carrying Cost", subtopic: "holding-cost" },
        { url: "/home-insurance-vs-fire-insurance-singapore.html", title: "Home Insurance vs Fire Insurance in Singapore (2026): What Homeowners Actually Need to Know", subtopic: "protection" }
      ],
      pages: [
        { url: "/increase-critical-illness-insurance-or-build-down-payment-fund-first-singapore.html", title: "Increase Critical Illness Insurance or Build a Down Payment Fund First in Singapore (2026): Which Gap Is More Dangerous To Leave Open?", cluster: "property", subtopic: "bridge" },
        { url: "/pay-down-home-loan-or-build-child-education-fund-singapore.html", title: "Pay Down Home Loan or Build a Child Education Fund First in Singapore (2026): Which Long-Horizon Goal Should Get the Next Dollar?", subtopic: "bridge" },
        { url: "/property-ownership-cost-singapore.html", title: "Property Ownership Cost in Singapore (2026): 5-Year Total Exposure Model", subtopic: "ownership" },
        { url: "/condo-ownership-cost.html", title: "The Real Cost of Owning a Condo in Singapore (2026)", subtopic: "condo" },
        { url: "/rental-property-ownership-cost.html", title: "The Real Cost of Owning a Rental Property in Singapore (2026)", subtopic: "rental" },
        { url: "/vacancy-turnover-cost-rental-property-singapore.html", title: "Vacancy and Turnover Cost for Rental Property in Singapore (2026): The Friction That Gross Rent Hides", subtopic: "rental" },
        { url: "/gross-vs-net-rental-yield-singapore.html", title: "Gross vs Net Rental Yield in Singapore (2026): Why Headline Yield Misleads", subtopic: "rental" },
        { url: "/rental-agent-commission-singapore.html", title: "Rental Agent Commission in Singapore (2026): When It Hurts Returns and When It Still Makes Sense", subtopic: "rental" },
        { url: "/lease-renewal-vs-new-tenant-cost-singapore.html", title: "Lease Renewal vs New Tenant Cost in Singapore (2026): Why Chasing Market Rent Can Backfire", subtopic: "rental" },
        { url: "/property-seller-agent-commission-singapore.html", title: "Property Seller Agent Commission in Singapore (2026): When Lower Fees Improve Your Outcome and When They Cost You More Than They Save", subtopic: "exit" },
        { url: "/bridging-loan-singapore.html", title: "Bridging Loan in Singapore (2026): When It Solves a Timing Gap and When It Just Hides an Overstretched Move", subtopic: "planning" },
        { url: "/extension-of-stay-after-selling-property-singapore.html", title: "Extension of Stay After Selling Property in Singapore (2026): When It Helps the Move and When It Only Delays a Weak Plan", subtopic: "planning" },
        { url: "/option-to-purchase-otp-singapore.html", title: "Option to Purchase (OTP) in Singapore Property (2026): When Interest Turns Into Commitment and Why Many Moves Get Too Real Too Fast", subtopic: "mechanics" },
        { url: "/property-viewing-checklist-singapore.html", title: "Property Viewing Checklist in Singapore (2026): What to Check Before You Fall in Love With a Unit", subtopic: "buying" },
        { url: "/resale-property-defects-checklist-singapore.html", title: "Resale Property Defects Checklist in Singapore (2026): What to Notice, What to Price In, and When to Walk Away", subtopic: "buying" },
        { url: "/how-to-check-mcst-management-before-buying-condo-singapore.html", title: "How to Check MCST Management Before Buying a Condo in Singapore (2026): Estate Quality, Upkeep, and the Signals Buyers Miss", subtopic: "condo" },
        { url: "/questions-to-answer-before-making-property-offer-singapore.html", title: "Questions to Answer Before Making a Property Offer in Singapore (2026): A Pre-Commitment Filter for Buyers", subtopic: "decision" },
        { url: "/should-i-buy-property-now-or-wait-singapore.html", title: "Should You Buy Property Now or Wait in Singapore? (2026 Timing Framework)", subtopic: "timing" },
        { url: "/rent-vs-buy-property-singapore.html", title: "Rent vs Buy Property in Singapore (2026): 5-Year Cost & Liquidity Framework", subtopic: "decision" },
        { url: "/hdb-vs-condo-singapore.html", title: "HDB vs Condo in Singapore (2026): The Real Cost, Lifestyle, and Regret Tradeoffs", subtopic: "comparison" },
        { url: "/executive-condo-ec-eligibility-singapore.html", title: "Executive Condo (EC) Eligibility in Singapore (2026): The Access Gate Many Households Confuse with Affordability", subtopic: "hdb" },
        { url: "/should-you-buy-an-executive-condo-singapore.html", title: "Should You Buy an Executive Condo (EC) in Singapore? (2026): Who It Fits, When It Works, and When It Quietly Becomes the Wrong Route", subtopic: "comparison" },
        { url: "/executive-condo-ec-vs-condo-singapore.html", title: "Executive Condo (EC) vs Condo in Singapore (2026): Entry Price, Flexibility, and Which Route Actually Fits", subtopic: "comparison" },
        { url: "/new-launch-vs-resale-condo-singapore.html", title: "New Launch vs Resale Condo in Singapore (2026): Premium, Visibility, and Which Condo Route Actually Fits", subtopic: "comparison" },
        { url: "/mortgage-interest-cost-singapore.html", title: "Mortgage Interest Cost in Singapore (2026): How Much You Really Pay Over 25–30 Years", subtopic: "financing" },
        { url: "/renovation-cost-singapore.html", title: "Renovation Cost in Singapore (2026): Realistic Budgets and Cash Shock Planning", subtopic: "setup" },
        { url: "/sell-property-cost-singapore.html", title: "Sell Property Cost in Singapore (2026): Fees, SSD, and Net Proceeds Reality", subtopic: "exit" },
        { url: "/rent-out-vs-sell-singapore.html", title: "Rent Out vs Sell Your Property in Singapore (2026): A No-Regret Framework", subtopic: "comparison" },
        { url: "/loan-to-value-ltv-singapore.html", title: "Loan-to-Value (LTV) in Singapore Property (2026): What It Really Limits", subtopic: "financing" },
        { url: "/in-principle-approval-home-loan-singapore.html", title: "Approval in Principle (AIP / IPA) for Home Loans in Singapore (2026)", subtopic: "financing" },
        { url: "/home-loan-lock-in-prepayment-penalty-singapore.html", title: "Home Loan Lock-In Period and Prepayment Penalty in Singapore (2026): When Flexibility Matters", subtopic: "financing" },
        { url: "/home-loan-refinancing-costs-singapore.html", title: "Home Loan Refinancing Costs in Singapore (2026): Fees, Subsidies, and Break-Even Reality", subtopic: "financing" },
        { url: "/how-much-cash-to-buy-property-singapore.html", title: "How Much Cash Do You Need to Buy Property in Singapore? (2026 Real Breakdown)", subtopic: "affordability" },
        { url: "/cash-over-valuation-cov-singapore.html", title: "Cash Over Valuation (COV) in Singapore (2026): Why Resale Deals Can Still Fail", subtopic: "acquisition" },
        { url: "/property-tax-singapore.html", title: "Property Tax in Singapore (2026): How It Changes the Real Cost of Holding a Home", subtopic: "holding-cost" },
        { url: "/hdb-service-conservancy-charges-singapore.html", title: "HDB Service and Conservancy Charges in Singapore (2026): The Recurring Cost Many Buyers Underweight", subtopic: "holding-cost" },
        { url: "/minimum-occupation-period-mop-singapore.html", title: "Minimum Occupation Period (MOP) in Singapore (2026): The Flexibility Lock-Up Many Buyers Underestimate", subtopic: "hdb" },
        { url: "/resale-levy-singapore.html", title: "Resale Levy in Singapore (2026): The Subsidy Clawback Many Second-Timers Underestimate", subtopic: "hdb" },
        { url: "/hfe-letter-singapore.html", title: "HFE Letter in Singapore (2026): The HDB Process Gate That Shapes Eligibility, Grants, and Loan Planning", subtopic: "hdb" },
        { url: "/deferred-income-assessment-singapore.html", title: "Deferred Income Assessment in Singapore (2026): When Young Buyers Should Delay the HDB Income Test", subtopic: "hdb" },
        { url: "/staggered-downpayment-singapore.html", title: "Staggered Downpayment in Singapore (2026): When HDB Cashflow Sequencing Makes a Flat More Workable", subtopic: "hdb" },
        { url: "/condo-maintenance-fees-mcst-sinking-fund-singapore.html", title: "Condo Maintenance Fees in Singapore (2026): MCST, Sinking Funds, and the Real Monthly Carrying Cost", subtopic: "holding-cost" },
        { url: "/home-maintenance-cost-singapore.html", title: "Home Maintenance Cost in Singapore (2026): Repairs, Replacements, and the Real Upkeep Budget", subtopic: "maintenance" },
        { url: "/home-protection-scheme-hps-singapore.html", title: "Home Protection Scheme (HPS) in Singapore (2026): What It Protects, What It Does Not, and Why HDB Owners Confuse It with Home Insurance", subtopic: "protection" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Protects the Household Better?", subtopic: "bridge" },
        { url: "/critical-illness-insurance-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Critical Illness Insurance vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Buys More Breathing Room?", subtopic: "bridge" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Reduces More Fragility?", subtopic: "bridge" },
        { url: "/term-life-vs-cash-buffer-for-single-income-mortgage-singapore.html", title: "Term Life vs Cash Buffer for a Single-Income Mortgage in Singapore (2026): Which Missing Layer Is More Dangerous Right Now?", subtopic: "bridge" },
        { url: "/home-insurance-vs-fire-insurance-singapore.html", title: "Home Insurance vs Fire Insurance in Singapore (2026): What Homeowners Actually Need to Know", subtopic: "protection" },
        { url: "/progressive-payment-vs-resale-payment-timeline-singapore.html", title: "Progressive Payment vs Resale Payment Timeline in Singapore (2026): Why Cashflow Feels Different", subtopic: "mechanics" },
        { url: "/how-much-cash-to-buy-property-calculator-singapore.html", title: "Upfront Cash to Buy Property Calculator (Singapore, 2026): Cash + CPF Split", subtopic: "calculator" },
        { url: "/upgrade-downgrade-property-calculator-singapore.html", title: "Upgrade / Downgrade Property Calculator (Singapore, 2026): Sell → Buy Next, Cash + CPF", subtopic: "calculator" },
        { url: "/rent-vs-buy-calculator-singapore.html", title: "Rent vs Buy Calculator (Singapore, 2026): Break‑Even + Net Worth Difference", subtopic: "calculator" },
        { url: "/property-affordability-calculator-singapore.html", title: "Property Affordability Stress Test Calculator (Singapore, 2026)", subtopic: "calculator" },
        { url: "/mortgage-amortization-calculator-singapore.html", title: "Mortgage Amortization Calculator (Singapore, 2026): Monthly Payment + Total Interest", subtopic: "calculator" },
        { url: "/hdb-loan-vs-bank-loan-calculator-singapore.html", title: "HDB vs Bank Loan Calculator Singapore (2026): Monthly + Total Interest", subtopic: "calculator" },
        { url: "/bto-vs-resale-cost.html", title: "BTO vs Resale in Singapore: The Full Cost Comparison (2026)", subtopic: "hdb" },
        { url: "/property-tax-singapore.html", title: "Property Tax in Singapore (2026): How It Changes the Real Cost of Holding a Home", subtopic: "holding-cost" },
        { url: "/condo-maintenance-fees-mcst-sinking-fund-singapore.html", title: "Condo Maintenance Fees in Singapore (2026): MCST, Sinking Funds, and the Real Monthly Carrying Cost", subtopic: "holding-cost" },
        { url: "/home-insurance-vs-fire-insurance-singapore.html", title: "Home Insurance vs Fire Insurance in Singapore (2026): What Homeowners Actually Need to Know", subtopic: "protection" }
      ,
        { url: "/2-bedroom-vs-3-bedroom-condo-singapore.html", title: "2-Bedroom vs 3-Bedroom Condo in Singapore (2026): Which Size Actually Fits Your ", cluster: "property", subtopic: "comparison" },
        { url: "/4-room-vs-5-room-hdb-singapore.html", title: "4-Room vs 5-Room HDB in Singapore (2026): Which Size Actually Fits the Household", cluster: "property", subtopic: "comparison" },
        { url: "/bank-valuation-for-property-purchase-singapore.html", title: "Bank Valuation for Property Purchase in Singapore (2026): When It Matters and Wh", cluster: "property", subtopic: "planning" },
        { url: "/bsd-absd-calculator-singapore.html", title: "BSD &amp; ABSD Calculator Singapore (2026): Buyer’s Stamp Duty + Additional Buye", cluster: "property", subtopic: "calculator" },
        { url: "/bsd-absd-singapore.html", title: "BSD &amp; ABSD in Singapore (2026): Stamp Duty Cost, Cash Impact, and Decision R", cluster: "property", subtopic: "planning" },
        { url: "/bto-ballot-and-wait-time-singapore.html", title: "BTO Ballot and Wait Time in Singapore (2026): When a “Cheaper” Route Becomes Exp", cluster: "property", subtopic: "hdb" },
        { url: "/buy-for-current-needs-or-one-stage-ahead-property-singapore.html", title: "Buy for Current Needs or One Stage Ahead in Singapore Property (2026): How Much ", cluster: "property", subtopic: "planning" },
        { url: "/buying-property-with-parents-or-family-singapore.html", title: "Buying Property With Parents or Family in Singapore (2026): When Co-Ownership He", cluster: "property", subtopic: "planning" },
        { url: "/conveyancing-legal-fees-property-singapore.html", title: "Conveyancing &amp; Legal Fees for Property in Singapore (2026): What Buyers Actu", cluster: "property", subtopic: "planning" },
        { url: "/cpf-oa-vs-cash-for-home-loan-singapore.html", title: "CPF OA vs Cash for Home Loan in Singapore (2026)", cluster: "property", subtopic: "financing" },
        { url: "/defects-and-snagging-after-handover-singapore.html", title: "Defects and Snagging After Handover in Singapore (2026): What to Do When the Hom", cluster: "property", subtopic: "planning" },
        { url: "/downsizing-to-hdb-or-condo-later-life-singapore.html", title: "Downsizing to HDB or Condo Later in Life in Singapore? (2026): Which Route Actua", cluster: "property", subtopic: "planning" },
        { url: "/sell-home-and-rent-in-retirement-vs-stay-put-singapore.html", title: "Sell Your Home and Rent in Retirement vs Stay Put in Singapore? (2026): When Flexibility Beats Ownership — and When It Just Creates a New Fragility", cluster: "property", subtopic: "comparison" },
        { url: "/right-size-home-vs-keep-home-and-draw-from-portfolio-retirement-singapore.html", title: "Right-Size Your Home vs Keep It and Draw From Your Portfolio in Retirement? (2026): When Housing Should Do the Work — and When the Portfolio Should", cluster: "property", subtopic: "comparison" },
        { url: "/use-housing-equity-vs-preserve-home-asset-in-retirement-singapore.html", title: "Use Housing Equity vs Preserve the Home Asset in Retirement in Singapore? (2026): When Monetising the House Makes Sense — and When Preservation Is the Better Bet", cluster: "property", subtopic: "comparison" },
        { url: "/enhanced-cpf-housing-grant-ehg-singapore.html", title: "Enhanced CPF Housing Grant (EHG) in Singapore (2026): How It Changes Affordabili", cluster: "property", subtopic: "hdb" },
        { url: "/family-grant-singapore.html", title: "Family Grant in Singapore (2026): How It Changes Resale HDB Economics, Speed, an", cluster: "property", subtopic: "hdb" },
        { url: "/fixed-rate-certainty-vs-larger-cash-buffer-singapore.html", title: "Fixed-Rate Certainty vs Larger Cash Buffer in Singapore (2026): Which Protection", cluster: "property", subtopic: "financing" },
        { url: "/fixed-vs-floating-home-loan-singapore.html", title: "Fixed vs Floating Home Loan in Singapore (2026): Which Is Safer, Cheaper, and Lo", cluster: "property", subtopic: "comparison" },
        { url: "/freehold-vs-leasehold-singapore.html", title: "Freehold vs Leasehold in Singapore (2026): When Tenure Matters and When Buyers O", cluster: "property", subtopic: "comparison" },
        { url: "/hdb-income-ceiling-singapore.html", title: "HDB Income Ceiling in Singapore (2026): The Eligibility Gate Many Buyers Confuse", cluster: "property", subtopic: "hdb" },
        { url: "/hdb-loan-vs-bank-loan-singapore.html", title: "HDB Loan vs Bank Loan in Singapore (2026): Decision Framework + Worked Example", cluster: "property", subtopic: "comparison" },
        { url: "/high-floor-vs-low-floor-property-singapore.html", title: "High Floor vs Low Floor Property in Singapore (2026): What Actually Matters Beyo", cluster: "property", subtopic: "comparison" },
        { url: "/how-having-a-child-affects-tdsr-borrowing-capacity-singapore.html", title: "How Having a Child Affects Your TDSR and Borrowing Capacity in Singapore (2026)", cluster: "property", subtopic: "financing" },
        { url: "/how-much-renovation-buffer-singapore.html", title: "How Much Renovation Buffer Do You Need in Singapore? (2026): Budgeting for Overr", cluster: "property", subtopic: "planning" },
        { url: "/how-to-position-property-to-sell-faster-singapore.html", title: "How to Position Property to Sell Faster in Singapore (2026): Reduce Friction Wit", cluster: "property", subtopic: "planning" },
        { url: "/how-to-position-rental-property-to-rent-faster-singapore.html", title: "How to Position Rental Property to Rent Faster in Singapore (2026): Reduce Misma", cluster: "property", subtopic: "planning" },
        { url: "/how-to-price-rental-property-singapore.html", title: "How to Price Rental Property in Singapore (2026): Set Asking Rent Without Self-I", cluster: "property", subtopic: "planning" },
        { url: "/how-to-price-your-property-to-sell-singapore.html", title: "How to Price Your Property to Sell in Singapore (2026): Set an Asking Price That", cluster: "property", subtopic: "planning" },
        { url: "/how-to-screen-tenants-singapore.html", title: "How to Screen Tenants in Singapore (2026): Reduce Rental Friction Before the Lea", cluster: "property", subtopic: "planning" },
        { url: "/joint-tenancy-vs-tenancy-in-common-singapore.html", title: "Joint Tenancy vs Tenancy in Common in Singapore (2026): The Ownership Choice Tha", cluster: "property", subtopic: "comparison" },
        { url: "/keep-cash-buffer-vs-partial-home-loan-prepayment-singapore.html", title: "Keep Cash Buffer vs Partial Home Loan Prepayment in Singapore (2026): Which Move", cluster: "property", subtopic: "financing" },
        { url: "/life-insurance-and-home-loan-singapore.html", title: "Life Insurance and Your Home Loan in Singapore (2026): What Happens to Your Prop", cluster: "property", subtopic: "financing" },
        { url: "/live-near-parents-vs-live-near-school-singapore.html", title: "Live Near Parents vs Live Near School in Singapore (2026): Which Location Advant", cluster: "property", subtopic: "planning" },
        { url: "/lower-asking-price-now-vs-wait-longer-property-singapore.html", title: "Lower Asking Price Now vs Wait Longer for Property in Singapore (2026): When Pat", cluster: "property", subtopic: "comparison" },
        { url: "/move-house-for-school-vs-stay-put-singapore.html", title: "Move House for School vs Stay Put in Singapore (2026): When a School-Driven Move", cluster: "property", subtopic: "planning" },
        { url: "/open-booking-of-flats-singapore.html", title: "Open Booking of Flats in Singapore (2026): When Immediate Access Beats Waiting f", cluster: "property", subtopic: "hdb" },
        { url: "/pay-down-mortgage-vs-invest-calculator-singapore.html", title: "Pay Down Mortgage vs Invest Calculator (Singapore, 2026): Interest Saved vs Futu", cluster: "property", subtopic: "calculator" },
        { url: "/pay-down-mortgage-vs-invest-singapore.html", title: "Pay Down Mortgage vs Invest in Singapore (2026): Framework + Worked Example", cluster: "property", subtopic: "comparison" },
        { url: "/property-buyer-agent-commission-singapore.html", title: "Property Buyer Agent Commission in Singapore (2026): When Paying for Representat", cluster: "property", subtopic: "planning" },
        { url: "/property-decoupling-singapore.html", title: "Property Decoupling in Singapore (2026): When It Helps, When It Backfires, and W", cluster: "property", subtopic: "planning" },
        { url: "/property-listing-readiness-checklist-singapore.html", title: "Property Listing Readiness Checklist in Singapore (2026): Are You Actually Ready", cluster: "property", subtopic: "planning" },
        { url: "/property-option-fee-exercise-fee-singapore.html", title: "Property Option Fee &amp; Exercise Fee in Singapore (2026): The Early Cash Commi", cluster: "property", subtopic: "planning" },
        { url: "/property-sell-buy-pipeline-calculator-singapore.html", title: "Sell → Buy Next Pipeline Calculator (Singapore)", cluster: "property", subtopic: "calculator" },
        { url: "/property-upgrade-ladder-calculator-singapore.html", title: "Property Upgrade Ladder Calculator (Singapore, 2026): Target Price → Required In", cluster: "property", subtopic: "calculator" },
        { url: "/property-upgrade-planner-singapore.html", title: "Property Upgrade Planner Singapore: Sell → Buy Next (Step-by-Step)", cluster: "property", subtopic: "planning" },
        { url: "/property-valuation-vs-asking-price-singapore.html", title: "Property Valuation vs Asking Price in Singapore (2026): Why Sellers Misread What", cluster: "property", subtopic: "comparison" },
        { url: "/proximity-housing-grant-phg-singapore.html", title: "Proximity Housing Grant (PHG) in Singapore (2026): When Living Near Family Chang", cluster: "property", subtopic: "hdb" },
        { url: "/reduce-tenure-vs-lower-monthly-instalment-singapore.html", title: "Reduce Tenure vs Lower Monthly Instalment in Singapore (2026)", cluster: "property", subtopic: "financing" },
        { url: "/refinance-now-vs-wait-for-more-rate-clarity-singapore.html", title: "Refinance Now vs Wait for More Rate Clarity in Singapore (2026): When Acting Ear", cluster: "property", subtopic: "financing" },
        { url: "/refinance-savings-calculator-singapore.html", title: "Refinance Savings Calculator Singapore (2026): Break‑Even Months + Interest Save", cluster: "property", subtopic: "calculator" },
        { url: "/refinance-vs-reprice-home-loan-singapore.html", title: "Refinance vs Reprice Home Loan in Singapore (2026): Break-even Framework", cluster: "property", subtopic: "comparison" },
        { url: "/sales-of-balance-flats-sbf-singapore.html", title: "Sales of Balance Flats (SBF) in Singapore (2026): When It Beats Waiting for BTO ", cluster: "property", subtopic: "hdb" },
        { url: "/sell-property-proceeds-calculator-singapore.html", title: "Sell Property Proceeds Calculator (Singapore, 2026): Cash vs CPF Reality", cluster: "property", subtopic: "calculator" },
        { url: "/sell-property-with-tenant-or-vacant-possession-singapore.html", title: "Sell Property With Tenant or Vacant Possession in Singapore (2026): Which Route ", cluster: "property", subtopic: "planning" },
        { url: "/selling-an-inherited-property-singapore.html", title: "Selling an Inherited Property in Singapore (2026): Why Succession Sales Feel Dif", cluster: "property", subtopic: "planning" },
        { url: "/selling-property-timeline-singapore.html", title: "Selling Property Timeline in Singapore (2026): How Long It Really Takes and Why ", cluster: "property", subtopic: "planning" },
        { url: "/should-you-downsize-your-home-singapore.html", title: "Should You Downsize Your Home in Singapore? (2026): When More Space Stops Helpin", cluster: "property", subtopic: "planning" },
        { url: "/should-you-make-partial-prepayment-home-loan-singapore.html", title: "Should You Make a Partial Prepayment on Your Home Loan in Singapore? (2026)", cluster: "property", subtopic: "financing" },
        { url: "/stay-in-current-home-or-right-size-property-singapore.html", title: "Stay in Your Current Home or Right-Size in Singapore? (2026): When Moving Solves", cluster: "property", subtopic: "planning" },
        { url: "/sun-heat-noise-and-road-exposure-property-singapore.html", title: "Sun, Heat, Noise, and Road Exposure for Property in Singapore (2026): The Hidden", cluster: "property", subtopic: "planning" },
        { url: "/tdsr-msr-calculator-singapore.html", title: "TDSR / MSR Calculator Singapore (2026): Max Home Loan &amp; Borrowing Limit", cluster: "property", subtopic: "calculator" },
        { url: "/tdsr-msr-singapore.html", title: "TDSR &amp; MSR in Singapore (2026): How Much You Can Really Borrow for Property", cluster: "property", subtopic: "financing" },
        { url: "/use-cpf-oa-vs-preserve-cash-buffer-for-home-loan-singapore.html", title: "Use CPF OA vs Preserve Cash Buffer for Home Loan in Singapore (2026): Which Fund", cluster: "property", subtopic: "financing" },
        { url: "/what-documents-to-prepare-before-selling-property-singapore.html", title: "What Documents to Prepare Before Selling Property in Singapore (2026): Seller Pr", cluster: "property", subtopic: "planning" },
        { url: "/what-happens-to-property-when-an-owner-dies-singapore.html", title: "What Happens to Property When an Owner Dies in Singapore (2026): Title Structure", cluster: "property", subtopic: "planning" },
        { url: "/what-to-do-when-home-loan-lock-in-ends-singapore.html", title: "What to Do When Your Home Loan Lock-In Ends in Singapore (2026)", cluster: "property", subtopic: "financing" },
        { url: "/build-down-payment-fund-or-help-parents-with-housing-costs-first-singapore.html", title: "Build a Down Payment Fund or Help Parents With Housing Costs First in Singapore (2026): Which Housing Duty Should Go First?", subtopic: "bridge" },
        { url: "/build-down-payment-fund-or-pay-down-high-interest-debt-first-singapore.html", title: "Build a Down Payment Fund or Pay Down High-Interest Debt First in Singapore (2026): Which Move Actually Strengthens the Path to Homeownership?", subtopic: "bridge" }],
      bridges: [
        { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs Ride-Hailing Break-Even Calculator", cluster: "transport" },
        { url: "/car-ownership-cost.html", title: "The Real Cost of Owning a Car in Singapore (5-Year Breakdown)", cluster: "transport" },
        { url: "/bigger-home-vs-education-budget-singapore.html", title: "Bigger Home vs Education Budget in Singapore (2026): Which Family Upgrade Actually Improves the Next 10 Years?", cluster: "family" },
        { url: "/pay-down-mortgage-vs-save-for-university-singapore.html", title: "Pay Down Mortgage vs Save for University in Singapore (2026): Which Future Obligation Should Get the Next Dollar?", cluster: "family" }
      
      ]
    },

    financing: {
      label: "Related Singapore Financing & Leverage",
      pillars: [
        { url: "/financing/", title: "Financing Hub (Singapore, 2026): Property Loans, Car Loans, Leverage", subtopic: "hub" },
        { url: "/property/financing/", title: "Property Financing (Singapore, 2026): Home Loans, Refinancing, Borrowing Rules", subtopic: "property" },
        { url: "/transport/financing/", title: "Transport Financing (Singapore, 2026): Car Loans, Balloon Loans, Leasing", subtopic: "transport" },
        { url: "/car-loan-rates-singapore.html", title: "Car Loan Rates in Singapore (2026): What You Actually Pay", subtopic: "loan" },
        { url: "/tdsr-msr-singapore.html", title: "TDSR & MSR in Singapore (2026): What Limits Your Loan", subtopic: "rules" },
        { url: "/loan-to-value-ltv-singapore.html", title: "Loan-to-Value (LTV) in Singapore Property (2026): What It Really Limits", subtopic: "rules" },
        { url: "/in-principle-approval-home-loan-singapore.html", title: "Approval in Principle (AIP / IPA) for Home Loans in Singapore (2026)", subtopic: "rules" },
        { url: "/home-loan-lock-in-prepayment-penalty-singapore.html", title: "Home Loan Lock-In Period and Prepayment Penalty in Singapore (2026): When Flexibility Matters", subtopic: "mechanics" },
        { url: "/home-loan-refinancing-costs-singapore.html", title: "Home Loan Refinancing Costs in Singapore (2026): Fees, Subsidies, and Break-Even Reality", subtopic: "mechanics" },
        { url: "/cash-over-valuation-cov-singapore.html", title: "Cash Over Valuation (COV) in Singapore (2026): Why Resale Deals Can Still Fail", subtopic: "tax" },
        { url: "/mortgage-interest-cost-singapore.html", title: "Mortgage Interest Cost in Singapore: The Intuition That Prevents Mistakes", subtopic: "mechanics" },
        { url: "/mortgage-amortization-calculator-singapore.html", title: "Mortgage Amortization Calculator (Singapore, 2026)", subtopic: "calculator" },
        { url: "/upgrade-downgrade-property-calculator-singapore.html", title: "Upgrade / Downgrade Property Calculator (Singapore, 2026): Sell → Buy Next", subtopic: "calculator" },
        { url: "/cpf-accrued-interest-singapore.html", title: "CPF Accrued Interest: The Hidden Cost in Singapore Property", subtopic: "cpf" },
        { url: "/bsd-absd-singapore.html", title: "BSD & ABSD in Singapore (2026): Property Taxes That Change Your Decision", subtopic: "tax" }
      ],
      pages: [
        { url: "/balance-transfer-vs-personal-loan-singapore.html", title: "Balance Transfer vs Personal Loan in Singapore (2026): Which Debt Tool Actually Lowers Cost Without Creating a Worse Trap?", subtopic: "comparison" },
        { url: "/debt-consolidation-plan-vs-balance-transfer-singapore.html", title: "Debt Consolidation Plan vs Balance Transfer in Singapore (2026): Which Reset Actually Helps You Exit Debt More Safely?", subtopic: "comparison" },
        { url: "/personal-loan-vs-line-of-credit-singapore.html", title: "Personal Loan vs Line of Credit in Singapore (2026): Which Borrowing Structure Causes Less Long-Term Damage?", subtopic: "comparison" },
        { url: "/cash-advance-vs-personal-loan-singapore.html", title: "Cash Advance vs Personal Loan in Singapore (2026): Which Expensive Short-Term Fix Does Less Harm?", subtopic: "comparison" }
      ],
      bridges: [
        { url: "/how-having-children-changes-your-emergency-fund-size-singapore.html", title: "How Having Children Changes Your Emergency Fund Size in Singapore (2026): Why Household Burn Rate and Dependency Risk Push the Buffer Higher", cluster: "investing", subtopic: "liquidity" },
        { url: "/should-i-buy-bigger-home-before-having-kids-singapore.html", title: "Should I Buy a Bigger Home Before Having Kids in Singapore? (2026)", cluster: "property", subtopic: "planning" },
        { url: "/fixed-rate-certainty-vs-larger-cash-buffer-singapore.html", title: "Fixed-Rate Certainty vs Larger Cash Buffer in Singapore (2026): Which Protection Layer Matters More When Rates Feel Unclear?", subtopic: "financing" },
        { url: "/keep-cash-buffer-vs-partial-home-loan-prepayment-singapore.html", title: "Keep Cash Buffer vs Partial Home Loan Prepayment in Singapore (2026): Which Move Actually Makes the Household Safer?", subtopic: "financing" },
        { url: "/refinance-now-vs-wait-for-more-rate-clarity-singapore.html", title: "Refinance Now vs Wait for More Rate Clarity in Singapore (2026): When Acting Early Beats Watching Another Rate Cycle", subtopic: "financing" },
        { url: "/use-cpf-oa-vs-preserve-cash-buffer-for-home-loan-singapore.html", title: "Use CPF OA vs Preserve Cash Buffer for Home Loan in Singapore (2026): Which Funding Route Better Protects the Household?", subtopic: "financing" }
      ]
    },
    family: {
      label: "Related Singapore Family Cost Guides",
      pillars: [
        { url: "/how-much-does-it-cost-to-raise-a-child-singapore.html", title: "How Much Does It Cost to Raise a Child in Singapore? (2026): A Long-Horizon Planning Framework", subtopic: "core" },
        { url: "/cost-of-having-a-baby-singapore.html", title: "Cost of Having a Baby in Singapore (2026): Pregnancy, Delivery, and First-Year Reality", subtopic: "baby" },
        { url: "/cost-of-having-a-second-child-singapore.html", title: "Cost of Having a Second Child in Singapore (2026): The Step-Change Families Often Underestimate", subtopic: "planning" }
      ],
      pages: [
        { url: "/move-near-school-or-keep-bigger-home-first-singapore.html", title: "Move Near School or Keep a Bigger Home First in Singapore (2026): Which Family Choice Actually Removes More Daily Strain?", subtopic: "bridge" },
        { url: "/move-near-grandparents-or-buy-bigger-home-first-singapore.html", title: "Move Near Grandparents or Buy a Bigger Home First in Singapore (2026): Which Choice Solves Family Friction With Less Financial Drag?", subtopic: "bridge" },
        { url: "/move-closer-to-aging-parents-or-pay-for-adult-day-care-first-singapore.html", title: "Move Closer to Aging Parents or Pay for Adult Day Care First in Singapore (2026): Which Support Route Reduces Family Strain More Sustainably?", subtopic: "bridge" },
        { url: "/second-car-or-helper-when-supporting-aging-parents-singapore.html", title: "Second Car or a Helper When Supporting Aging Parents in Singapore (2026): Which Cost Actually Reduces Family Strain?", subtopic: "bridge" },
        { url: "/move-closer-to-aging-parents-or-keep-home-and-own-a-second-car-singapore.html", title: "Move Closer to Aging Parents or Keep Your Home and Own a Second Car in Singapore (2026): Which Fix Actually Reduces Family Strain?", subtopic: "bridge" },
        { url: "/infantcare-vs-childcare-cost-singapore.html", title: "Infantcare vs Childcare Cost in Singapore (2026): The Recurring Cost Difference Parents Feel Most", subtopic: "comparison" },
        { url: "/maid-vs-infantcare-cost-singapore.html", title: "Maid vs Infantcare Cost in Singapore (2026): Which Early-Years Care Route Actually Costs Less?", subtopic: "comparison" },
        { url: "/stay-at-home-parent-vs-infantcare-cost-singapore.html", title: "Stay-at-Home Parent vs Infantcare Cost in Singapore (2026): The Economic Trade-off Households Misread", subtopic: "comparison" },
        { url: "/how-much-does-preschool-cost-singapore.html", title: "How Much Does Preschool Cost in Singapore? (2026): Early-Years Fees, Recurring Pressure, and What Parents Underestimate", subtopic: "preschool" },
        { url: "/how-much-does-primary-school-cost-singapore.html", title: "How Much Does Primary School Cost in Singapore? (2026): The Budget Shift Many Families Underestimate", subtopic: "school" },
        { url: "/student-care-vs-after-school-care-cost-singapore.html", title: "Student Care vs After-School Care Cost in Singapore (2026): The Post-School Supervision Trade-off Families Misprice", subtopic: "comparison" },
        { url: "/how-much-does-secondary-school-cost-singapore.html", title: "How Much Does Secondary School Cost in Singapore? (2026): The Next Budget Phase Families Often Misread", subtopic: "school" },
        { url: "/tuition-cost-singapore.html", title: "Tuition Cost in Singapore (2026): The School-Stage Spend That Quietly Becomes Structural", subtopic: "education" },
        { url: "/enrichment-classes-cost-singapore.html", title: "Enrichment Classes Cost in Singapore (2026): The Fragmented Family Spend That Adds Up Fast", subtopic: "education" },
        { url: "/tuition-vs-enrichment-classes-cost-singapore.html", title: "Tuition vs Enrichment Classes Cost in Singapore (2026): The Academic Spend and Development Spend Families Should Stop Mixing", subtopic: "comparison" },
        { url: "/how-much-does-junior-college-cost-singapore.html", title: "How Much Does Junior College Cost in Singapore? (2026): The Post-Secondary Stage Families Still Need to Budget For", subtopic: "school" },
        { url: "/polytechnic-vs-junior-college-cost-singapore.html", title: "Polytechnic vs Junior College Cost in Singapore (2026): The Post-Secondary Branch Point Families Often Oversimplify", subtopic: "comparison" },
        { url: "/student-care-vs-tuition-cost-singapore.html", title: "Student Care vs Tuition Cost in Singapore (2026): Solve the Supervision Problem or the Academic Problem First", subtopic: "comparison" },
        { url: "/how-much-does-university-cost-singapore.html", title: "How Much Does University Cost in Singapore? (2026): The Long-Horizon Family Bill Many Plans Leave Too Vague", subtopic: "education" },
        { url: "/polytechnic-vs-university-cost-singapore.html", title: "Polytechnic vs University Cost in Singapore (2026): The Tertiary Route Decision That Should Not Start with Prestige Alone", subtopic: "comparison" },
        { url: "/local-university-vs-overseas-university-cost-singapore.html", title: "Local University vs Overseas University Cost in Singapore (2026): The Prestige Decision That Should Start with Full Exposure", subtopic: "comparison" },
        { url: "/bigger-home-vs-education-budget-singapore.html", title: "Bigger Home vs Education Budget in Singapore (2026): Which Family Upgrade Actually Improves the Next 10 Years?", subtopic: "planning" },
        { url: "/pay-down-mortgage-vs-save-for-university-singapore.html", title: "Pay Down Mortgage vs Save for University in Singapore (2026): Which Future Obligation Should Get the Next Dollar?", subtopic: "planning" },
        { url: "/should-i-buy-bigger-home-before-having-kids-singapore.html", title: "Should I Buy a Bigger Home Before Having Kids in Singapore? (2026)", subtopic: "planning" },
        { url: "/family-car-decision-after-baby-singapore.html", title: "Family Car Decision After Baby in Singapore (2026): Does a Child Change Whether You Need a Car?", subtopic: "planning" },
        { url: "/how-having-a-child-affects-tdsr-borrowing-capacity-singapore.html", title: "How Having a Child Affects Your TDSR and Borrowing Capacity in Singapore (2026)", subtopic: "planning" },
        { url: "/protection-gap-after-having-a-baby-singapore.html", title: "Protection Gap After Having a Baby in Singapore (2026)", subtopic: "planning" },
        { url: "/should-you-build-your-emergency-fund-before-having-a-baby-singapore.html", title: "Should You Build Your Emergency Fund Before Having a Baby in Singapore? (2026): The Reserve Question Most Couples Leave Too Late", subtopic: "planning" },
        { url: "/how-a-second-child-changes-your-cash-buffer-plan-singapore.html", title: "How a Second Child Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", subtopic: "planning" },
        { url: "/school-fee-sinking-fund-vs-emergency-fund-singapore.html", title: "School-Fee Sinking Fund vs Emergency Fund in Singapore (2026): Stop Funding Predictable Education Bills from Your Shock Reserve", subtopic: "comparison" },
        { url: "/save-for-university-vs-strengthen-your-own-retirement-first-singapore.html", title: "Save for University vs Strengthen Your Own Retirement First in Singapore (2026): Which Long-Horizon Family Obligation Deserves Priority?", subtopic: "planning" },
        { url: "/term-life-insurance-vs-bigger-cash-buffer-after-first-child-singapore.html", title: "Term Life Insurance vs Bigger Cash Buffer After First Child in Singapore (2026): Which Gap Deserves the Next Dollar?", subtopic: "bridge" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-after-first-child-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer After First Child in Singapore (2026): Which Fragility Matters More?", subtopic: "bridge" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-after-first-child-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer After First Child in Singapore (2026): Which Layer Reduces More Friction?", subtopic: "bridge" },
        { url: "/how-having-children-changes-your-insurance-priority-order-singapore.html", title: "How Having Children Changes Your Insurance Priority Order in Singapore (2026): What Actually Moves Up the Queue?", subtopic: "bridge" },
        { url: "/term-life-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Term Life Insurance vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Gap Deserves the Next Dollar?", subtopic: "bridge" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Fragility Matters More?", subtopic: "bridge" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Layer Reduces More Friction?", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-cash-buffer-plan-singapore.html", title: "How Supporting Aging Parents Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", subtopic: "planning" },
        { url: "/move-closer-to-aging-parents-vs-keep-housing-cost-lower-singapore.html", title: "Move Closer to Aging Parents vs Keep Housing Cost Lower in Singapore (2026): Which Constraint Should a Sandwich-Generation Household Optimise First?", subtopic: "bridge" },
        { url: "/help-parents-with-housing-costs-vs-strengthen-your-own-cash-buffer-singapore.html", title: "Help Parents With Housing Costs vs Strengthen Your Own Cash Buffer in Singapore (2026): Which Obligation Should Get the Next Dollar First?", subtopic: "bridge" },
        { url: "/use-cpf-oa-vs-preserve-cash-when-supporting-aging-parents-singapore.html", title: "Use CPF OA vs Preserve Cash When Supporting Aging Parents in Singapore (2026): Which Funding Route Better Protects the Sandwich-Generation Household?", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-housing-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Housing Decision Order in Singapore (2026): What Should Move Up the Queue Once Elder Support Becomes Real?", subtopic: "planning" },
        { url: "/help-aging-parents-now-vs-strengthen-your-own-retirement-first-singapore.html", title: "Help Aging Parents Now vs Strengthen Your Own Retirement First in Singapore (2026): Which Long-Horizon Duty Should Get the Next Dollar?", subtopic: "bridge" },
        { url: "/top-up-parents-cpf-vs-preserve-your-own-cash-buffer-singapore.html", title: "Top Up Parents' CPF vs Preserve Your Own Cash Buffer in Singapore (2026): Which Move Actually Makes the Family Safer?", subtopic: "bridge" },
        { url: "/monthly-support-for-aging-parents-vs-build-bigger-emergency-fund-singapore.html", title: "Monthly Support for Aging Parents vs Build a Bigger Emergency Fund in Singapore (2026): Which Layer Should a Sandwich-Generation Household Strengthen First?", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-investing-priority-order-singapore.html", title: "How Supporting Aging Parents Changes Your Investing Priority Order in Singapore (2026): What Should Move Up the Queue Once Elder Support Becomes Real?", subtopic: "planning" },
        { url: "/hire-a-helper-vs-use-home-care-services-for-aging-parents-singapore.html", title: "Hire a Helper vs Use Home-Care Services for Aging Parents in Singapore (2026): Which Caregiving Route Actually Fits the Household Better?", subtopic: "comparison" },
        { url: "/adult-day-care-vs-keeping-a-parent-at-home-singapore.html", title: "Adult Day Care vs Keeping a Parent at Home in Singapore (2026): Which Caregiving Model Actually Reduces More Household Strain?", subtopic: "comparison" },
        { url: "/caregiving-costs-now-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Caregiving Costs Now vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Layer Should the Household Strengthen First?", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-caregiving-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Caregiving Decision Order in Singapore (2026): What Should Move Up the Queue Once Elder Care Becomes Real?", subtopic: "planning" },
        { url: "/use-parents-medisave-vs-pay-cash-for-eldercare-costs-singapore.html", title: "Use Parents' MediSave vs Pay Cash for Eldercare Costs in Singapore (2026): Which Funding Route Protects the Household Better?", subtopic: "bridge" },
        { url: "/careshield-life-supplement-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "CareShield Life Supplement vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Layer Should Get the Next Dollar First?", subtopic: "bridge" },
        { url: "/hospital-cash-plan-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Hospital Cash Plan vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Layer Actually Helps the Family More?", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-medical-financing-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Medical-Financing Decision Order in Singapore (2026): What Should Move Up the Queue Once Elder Care Becomes Real?", subtopic: "planning" },
        { url: "/reduce-work-hours-vs-pay-for-caregiving-support-when-supporting-aging-parents-singapore.html", title: "Reduce Work Hours vs Pay for Caregiving Support When Supporting Aging Parents in Singapore (2026): Which Move Actually Protects the Household Better?", subtopic: "bridge" },
        { url: "/quit-your-job-vs-outsource-more-care-for-aging-parents-singapore.html", title: "Quit Your Job vs Outsource More Care for Aging Parents in Singapore (2026): Which Move Actually Reduces More Household Stress?", subtopic: "bridge" },
        { url: "/keep-a-flexible-job-vs-higher-pay-when-supporting-aging-parents-singapore.html", title: "Keep a Flexible Job vs Higher Pay When Supporting Aging Parents in Singapore (2026): Which Trade-off Actually Makes the Household Safer?", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-work-and-income-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Work and Income Decision Order in Singapore (2026): What Should Move Up the Queue Once Care Demands Start Reshaping Work?", subtopic: "planning" },
        { url: "/split-aging-parent-support-equally-vs-by-income-singapore.html", title: "Split Aging-Parent Support Equally vs by Income in Singapore (2026): What Is Fair When Siblings Cannot Carry the Same Load?", subtopic: "bridge" },
        { url: "/give-cash-vs-take-on-caregiving-time-for-aging-parents-singapore.html", title: "Give Cash vs Take On Caregiving Time for Aging Parents in Singapore (2026): Which Form of Support Actually Reduces More Family Strain?", subtopic: "bridge" },
        { url: "/help-siblings-now-vs-preserve-your-own-cash-buffer-when-supporting-parents-singapore.html", title: "Help Siblings Now vs Preserve Your Own Cash Buffer When Supporting Parents in Singapore (2026): When Does Family Bridging Become Household Fragility?", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-family-burden-sharing-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Family Burden-Sharing Decision Order in Singapore (2026): What Should Siblings Decide First Once Care Obligations Become Real?", subtopic: "planning" },
        { url: "/hire-home-care-vs-family-caregiver-time-singapore.html", title: "Hire Home Care vs Use Family Caregiver Time in Singapore (2026): Which Form of Capacity Actually Protects the Household Better?", subtopic: "bridge" },
        { url: "/use-care-insurance-payouts-vs-pay-out-of-pocket-for-home-help-singapore.html", title: "Use Care-Insurance Payouts vs Pay Out of Pocket for Home Help in Singapore (2026): Which Funding Route Actually Keeps Care Sustainable?", subtopic: "bridge" },
        { url: "/protect-caregiver-income-vs-build-bigger-care-fund-singapore.html", title: "Protect Caregiver Income vs Build a Bigger Care Fund in Singapore (2026): Which Layer Actually Makes the Household Safer?", subtopic: "bridge" },
        { url: "/lasting-power-of-attorney-for-aging-parents-singapore.html", title: "Lasting Power of Attorney for Aging Parents in Singapore (2026): Why Care Plans Break Without Legal Authority", subtopic: "planning" },
        { url: "/advance-care-planning-for-aging-parents-singapore.html", title: "Advance Care Planning for Aging Parents in Singapore (2026): Why Medical Clarity Matters Before Crisis", subtopic: "planning" },
        { url: "/who-should-manage-eldercare-decisions-in-the-family-singapore.html", title: "Who Should Manage Eldercare Decisions in the Family in Singapore (2026): How to Choose the Real Coordinator Before Stress Forces It", subtopic: "decision" },
        { url: "/how-supporting-aging-parents-changes-your-legal-readiness-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Legal Readiness Decision Order in Singapore (2026): What Should Move Up the Queue Before a Crisis Forces It?", subtopic: "planning" },
        { url: "/aging-in-place-vs-moving-in-with-aging-parents-singapore.html", title: "Aging in Place vs Moving In Together With Aging Parents in Singapore (2026): Which Living Arrangement Actually Reduces More Friction?", subtopic: "bridge" },
        { url: "/home-modifications-vs-relocating-for-aging-parents-singapore.html", title: "Home Modifications vs Relocating for Aging Parents in Singapore (2026): Which Housing Fix Actually Solves the Real Problem?", subtopic: "bridge" },
        { url: "/lift-access-home-vs-walk-up-flat-for-aging-parents-singapore.html", title: "Lift-Access Home vs Walk-Up Flat for Aging Parents in Singapore (2026): Which Living Setup Fails Less Once Clinic Trips, Fall Risk, and Family Support Become Real?", subtopic: "comparison" },
        { url: "/single-storey-home-vs-multi-level-home-for-aging-parents-singapore.html", title: "Single-Storey Home vs Multi-Level Home for Aging Parents in Singapore (2026): Which Layout Stays Usable Once Fatigue, Toileting Urgency, and Night Risk Become Real?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-home-access-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Home-Access Decision Order in Singapore (2026): What Should Move Up the Queue Once Stairs, Floor Layout, and Escort Friction Become Real?", subtopic: "planning" },
        { url: "/rent-near-aging-parents-vs-buy-near-aging-parents-singapore.html", title: "Rent Near Aging Parents vs Buy Near Aging Parents in Singapore (2026): Which Proximity Move Preserves More Flexibility Once Care Needs Start Escalating?", subtopic: "comparison" },
        { url: "/live-near-aging-parents-vs-live-near-medical-services-singapore.html", title: "Live Near Aging Parents vs Live Near Medical Services in Singapore (2026): Which Location Logic Reduces More Friction Once Follow-Ups, Urgent Visits, and Escort Burden Become Recurring?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-location-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Location Decision Order in Singapore (2026): What Should Move Up the Queue Once Distance Starts Reshaping Care, Clinic Travel, and Family Capacity?", subtopic: "planning" },
        { url: "/move-aging-parents-into-your-home-vs-maintain-two-nearby-households-singapore.html", title: "Move Aging Parents Into Your Home vs Maintain Two Nearby Households in Singapore (2026): Which Support Structure Fails Less Once Care Is Frequent but Privacy, Marriage, and Routine Still Matter?", subtopic: "comparison" },
        { url: "/buy-a-larger-shared-home-vs-keep-two-smaller-households-singapore.html", title: "Buy a Larger Shared Home vs Keep Two Smaller Households in Singapore (2026): Which Housing Structure Carries Aging-Parent Support Better Once Space, Privacy, Exit Flexibility, and Cash Drag Are Counted?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-co-residence-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Co-Residence Decision Order in Singapore (2026): What Should Move Up the Queue Once One Roof Starts Looking Efficient but May Reshape Marriage, Space, and Exit Flexibility?", subtopic: "planning" },
        { url: "/downsize-your-home-to-support-aging-parents-vs-stay-put-singapore.html", title: "Downsize Your Home to Support Aging Parents vs Stay Put in Singapore (2026): When Does Releasing Housing Slack Strengthen the Family More Than Holding Space That No Longer Pays for It?", subtopic: "comparison" },
        { url: "/use-housing-equity-vs-preserve-cashflow-when-supporting-aging-parents-singapore.html", title: "Use Housing Equity vs Preserve Cashflow When Supporting Aging Parents in Singapore (2026): Which Funding Route Protects the Household Better Once Eldercare Starts Competing With Mortgage, Buffers, and Retirement?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-housing-liquidity-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Housing-Liquidity Decision Order in Singapore (2026): What Should Move Up the Queue Once Property Stops Being Just Shelter and Starts Acting Like a Reserve Decision Too?", subtopic: "planning" },
        { url: "/home-care-vs-nursing-home-for-aging-parents-singapore.html", title: "Home Care vs Nursing Home for Aging Parents in Singapore (2026): Which Care Setting Actually Fits the Next Stage?", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-living-arrangement-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Living-Arrangement Decision Order in Singapore (2026): What Should Move Up the Queue Before Crisis Forces the Home Question?", subtopic: "planning" },
        { url: "/make-a-will-for-aging-parents-singapore.html", title: "Make a Will for Aging Parents in Singapore (2026): Why Families Should Not Leave Distribution Logic to Crisis or Intestacy", subtopic: "planning" },
        { url: "/cpf-nomination-for-aging-parents-singapore.html", title: "CPF Nomination for Aging Parents in Singapore (2026): Why Families Should Not Assume CPF Savings Follow the Same Route as the Rest of the Estate", subtopic: "planning" },
        { url: "/estate-document-readiness-for-aging-parents-singapore.html", title: "Estate-Document Readiness for Aging Parents in Singapore (2026): The Simple Organising Work That Prevents Scrambling After Death", subtopic: "planning" },
        { url: "/how-supporting-aging-parents-changes-your-estate-readiness-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Estate-Readiness Decision Order in Singapore (2026): What Should Move Up the Queue Before Bereavement Turns Gaps Into Stress", subtopic: "planning" },
        { url: "/hospital-discharge-planning-for-aging-parents-singapore.html", title: "Hospital Discharge Planning for Aging Parents in Singapore (2026): What Families Should Set Up Before the Parent Comes Home", subtopic: "planning" },
        { url: "/rehab-vs-home-recovery-support-for-aging-parents-singapore.html", title: "Rehab vs Home Recovery Support for Aging Parents in Singapore (2026): Which Next Step Actually Fits the Parent After Hospital?", subtopic: "comparison" },
        { url: "/respite-care-vs-running-on-family-burnout-when-supporting-aging-parents-singapore.html", title: "Respite Care vs Running on Family Burnout When Supporting Aging Parents in Singapore (2026): Which Choice Actually Protects the Care System?", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-post-hospital-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Post-Hospital Decision Order in Singapore (2026): What Should Move Up the Queue Once an Acute Episode Ends?", subtopic: "planning" },
        { url: "/early-memory-decline-vs-waiting-for-clearer-dementia-signs-singapore.html", title: "Early Memory Decline vs Waiting for Clearer Dementia Signs in Singapore (2026): When Should Families Move Before Delay Removes Better Options?", subtopic: "planning" },
        { url: "/supervision-at-home-vs-independent-living-for-aging-parents-with-cognitive-decline-singapore.html", title: "Supervision at Home vs Independent Living for Aging Parents With Cognitive Decline in Singapore (2026): When Does the Independence Label Stop Matching Reality?", subtopic: "comparison" },
        { url: "/memory-care-vs-general-eldercare-setting-for-aging-parents-singapore.html", title: "Memory Care vs General Eldercare Setting for Aging Parents in Singapore (2026): When Does Cognitive Decline Need a More Dementia-Specific Environment?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-cognitive-decline-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Cognitive-Decline Decision Order in Singapore (2026): What Should Move Up the Queue Once Memory and Judgment Start Shifting?", subtopic: "planning" },
        { url: "/palliative-care-vs-continuing-aggressive-treatment-for-aging-parents-singapore.html", title: "Palliative Care vs Continuing Aggressive Treatment for Aging Parents in Singapore (2026): When Does the Goal Shift From Extending Every Possible Day to Protecting Comfort and Decision Quality?", subtopic: "comparison" },
        { url: "/home-hospice-vs-institutional-end-of-life-care-for-aging-parents-singapore.html", title: "Home Hospice vs Institutional End-of-Life Care for Aging Parents in Singapore (2026): Which Setting Actually Protects Comfort, Dignity, and Family Stability?", subtopic: "comparison" },
        { url: "/practical-end-of-life-planning-for-aging-parents-singapore.html", title: "Practical End-of-Life Planning for Aging Parents in Singapore (2026): What Families Should Organise Before the Final Stage Becomes a Rushed Operations Problem", subtopic: "planning" },
        { url: "/how-supporting-aging-parents-changes-your-end-of-life-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your End-of-Life Decision Order in Singapore (2026): What Should Move Up the Queue Once Care Is Shifting From Recovery to Comfort?", subtopic: "planning" },
        { url: "/early-fall-risk-vs-waiting-for-a-major-fall-with-aging-parents-singapore.html", title: "Early Fall Risk vs Waiting for a Major Fall With Aging Parents in Singapore (2026): When Should Families Move Before ‘Still Managing’ Turns Into Fracture, Admission, or Fast Loss of Independence?", subtopic: "planning" },
        { url: "/walker-friendly-home-vs-wheelchair-ready-home-for-aging-parents-singapore.html", title: "Walker-Friendly Home vs Wheelchair-Ready Home for Aging Parents in Singapore (2026): Which Standard Should Families Design Around Before the Current Layout Fails?", subtopic: "comparison" },
        { url: "/medical-escort-and-transport-vs-ad-hoc-family-driving-for-aging-parents-singapore.html", title: "Medical Escort and Transport vs Ad-Hoc Family Driving for Aging Parents in Singapore (2026): When Do Clinic Trips Stop Being a Scheduling Problem and Start Becoming a Care Design Problem?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-mobility-decline-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Mobility-Decline Decision Order in Singapore (2026): What Should Move Up the Queue Once Stability, Transfers, and Accessibility Start Breaking the Old Setup?", subtopic: "planning" },
        { url: "/early-appetite-decline-vs-waiting-for-visible-weight-loss-with-aging-parents-singapore.html", title: "Early Appetite Decline vs Waiting for Visible Weight Loss With Aging Parents in Singapore (2026): When Should Families Move Before ‘Eating Less’ Starts Breaking Energy, Medication Tolerance, and Recovery?", subtopic: "planning" },
        { url: "/meal-prep-at-home-vs-meal-delivery-for-aging-parents-singapore.html", title: "Meal Prep at Home vs Meal Delivery for Aging Parents in Singapore (2026): Which Support Model Actually Keeps Intake Stable When Cooking Energy, Time, or Supervision Is Breaking Down?", subtopic: "comparison" },
        { url: "/regular-meals-vs-texture-modified-meals-for-aging-parents-with-swallowing-difficulty-singapore.html", title: "Regular Meals vs Texture-Modified Meals for Aging Parents With Swallowing Difficulty in Singapore (2026): When Does Normal Food Stop Being the Safer or More Realistic Choice?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-nutrition-support-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Nutrition-Support Decision Order in Singapore (2026): What Should Move Up the Queue Once Meal Reliability, Swallowing Fit, and Energy Start Breaking Down?", subtopic: "planning" },
        { url: "/early-medication-confusion-vs-waiting-for-a-serious-missed-dose-with-aging-parents-singapore.html", title: "Early Medication Confusion vs Waiting for a Serious Missed Dose With Aging Parents in Singapore (2026): When Should Families Move Before ‘Mostly Managing’ Turns Into a Preventable Medication Failure?", subtopic: "planning" },
        { url: "/pillbox-and-reminder-system-vs-family-medication-supervision-for-aging-parents-singapore.html", title: "Pillbox and Reminder System vs Family Medication Supervision for Aging Parents in Singapore (2026): When Is a Better System Enough, and When Does the Household Need Real Oversight?", subtopic: "comparison" },
        { url: "/polypharmacy-review-vs-just-adding-more-meds-for-aging-parents-singapore.html", title: "Polypharmacy Review vs Just Adding More Meds for Aging Parents in Singapore (2026): When Does ‘One More Prescription’ Stop Solving the Problem and Start Compounding Fragility?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-medication-management-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Medication-Management Decision Order in Singapore (2026): What Should Move Up the Queue Once Prescriptions, Missed Doses, and Routine Complexity Start Breaking the Old Setup?", subtopic: "planning" },
        { url: "/early-hearing-or-vision-decline-vs-waiting-for-a-major-incident-with-aging-parents-singapore.html", title: "Early Hearing or Vision Decline vs Waiting for a Major Incident With Aging Parents in Singapore (2026): When Should Families Move Before ‘It’s Just Ageing’ Turns Into a Preventable Safety or Communication Failure?", subtopic: "planning" },
        { url: "/hearing-aids-or-vision-support-vs-managing-without-it-for-aging-parents-singapore.html", title: "Hearing Aids or Vision Support vs Managing Without It for Aging Parents in Singapore (2026): When Does ‘Still Coping’ Stop Being a Sensible Standard?", subtopic: "comparison" },
        { url: "/better-lighting-and-communication-adjustments-vs-keeping-old-home-routines-for-aging-parents-with-sensory-decline-singapore.html", title: "Better Lighting and Communication Adjustments vs Keeping Old Home Routines for Aging Parents With Sensory Decline in Singapore (2026): When Does the Environment Need to Change, Not Just the Parent?", subtopic: "comparison" },
                { url: "/how-supporting-aging-parents-changes-your-sensory-decline-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Sensory-Decline Decision Order in Singapore (2026): What Should Move Up the Queue Once Hearing, Vision, and Everyday Cues Start Breaking the Old Setup?", subtopic: "planning" },
        { url: "/early-continence-decline-vs-waiting-for-a-major-accident-with-aging-parents-singapore.html", title: "Early Continence Decline vs Waiting for a Major Accident With Aging Parents in Singapore (2026): When Should Families Move Before ‘Occasional Leaks’ Turn Into Falls, Skin Problems, or an Overnight Care Crisis?", subtopic: "planning" },
        { url: "/bathroom-setup-and-commode-vs-keeping-a-standard-bathroom-for-aging-parents-singapore.html", title: "Bathroom Setup and Commode vs Keeping a Standard Bathroom for Aging Parents in Singapore (2026): When Does the Toilet Route Need Redesign Before Urgency, Transfers, and Night Waking Break the Old Setup?", subtopic: "comparison" },
        { url: "/pads-and-cleanup-system-vs-pretending-the-issue-is-still-occasional-for-aging-parents-singapore.html", title: "Pads and Cleanup System vs Pretending the Issue Is Still Occasional for Aging Parents in Singapore (2026): When Should Families Stop Managing Leakage Casually and Build a Real Routine?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-continence-support-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Continence-Support Decision Order in Singapore (2026): What Should Move Up the Queue Once Toileting Reliability, Night Waking, and Cleanup Load Start Breaking the Old Setup?", subtopic: "planning" },
        { url: "/early-night-waking-or-wandering-vs-waiting-for-a-serious-overnight-incident-with-aging-parents-singapore.html", title: "Early Night Waking or Wandering vs Waiting for a Serious Overnight Incident With Aging Parents in Singapore (2026): When Should Families Move Before Broken Sleep Turns Into a Fall, Exit Risk, or Household Collapse?", subtopic: "planning" },
        { url: "/bed-alarm-and-room-setup-vs-ad-hoc-night-checking-for-aging-parents-singapore.html", title: "Bed Alarm and Room Setup vs Ad-Hoc Night Checking for Aging Parents in Singapore (2026): When Does the Household Need a Real Overnight Safety System Instead of Light Sleep and Guesswork?", subtopic: "comparison" },
        { url: "/one-exhausted-caregiver-vs-shared-overnight-coverage-for-aging-parents-singapore.html", title: "One Exhausted Caregiver vs Shared Overnight Coverage for Aging Parents in Singapore (2026): When Does ‘I Can Handle It’ Stop Being Responsible and Start Becoming the Risk?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-overnight-supervision-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Overnight Supervision Decision Order in Singapore (2026): What Should Move Up the Queue Once Night Waking, Wandering, and Household Sleep Start Breaking the Old Setup?", subtopic: "planning" },
        { url: "/early-missed-appointments-vs-waiting-for-a-serious-follow-up-lapse-with-aging-parents-singapore.html", title: "Early Missed Appointments vs Waiting for a Serious Follow-Up Lapse With Aging Parents in Singapore (2026): When Should Families Move Before One Skipped Visit Turns Into Preventable Deterioration?", subtopic: "planning" },
        { url: "/one-fragmented-specialist-schedule-vs-consolidated-appointment-planning-for-aging-parents-singapore.html", title: "One Fragmented Specialist Schedule vs Consolidated Appointment Planning for Aging Parents in Singapore (2026): When Does ‘Just Book Whatever Is Available’ Start Breaking the Household?", subtopic: "comparison" },
        { url: "/ad-hoc-family-coordination-vs-shared-appointment-and-records-system-for-aging-parents-singapore.html", title: "Ad-Hoc Family Coordination vs Shared Appointment and Records System for Aging Parents in Singapore (2026): When Does Helpful Informality Stop Being Reliable Enough?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-appointment-coordination-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Appointment-Coordination Decision Order in Singapore (2026): What Should Move Up the Queue Once Follow-Up Load Starts Running the Household?", subtopic: "planning" },
        { url: "/aging-parents-caregiving-cost-calculator-singapore.html", title: "Aging Parents Caregiving Cost Calculator Singapore (2026): Estimate the Monthly Support Load Before It Starts Running the Household", subtopic: "calculator" },
        { url: "/helper-vs-home-care-cost-calculator-singapore.html", title: "Helper vs Home-Care Cost Calculator Singapore (2026): Compare the Live-In Route Against Formal Service Hours Before the Household Commits", subtopic: "calculator" },
        { url: "/adult-day-care-vs-keep-at-home-cost-calculator-singapore.html", title: "Adult Day Care vs Keep-at-Home Cost Calculator Singapore (2026): Compare Structured Daytime Care Against the Hidden Household Cost of Keeping Everything at Home", subtopic: "calculator" },
        { url: "/appointment-and-transport-burden-calculator-singapore.html", title: "Appointment and Transport Burden Calculator Singapore (2026): Compare Ad-Hoc Family Follow-Up Against a More Structured Support Model Before It Starts Running the Household", subtopic: "calculator" },
        { url: "/overnight-supervision-burden-calculator-singapore.html", title: "Overnight Supervision Burden Calculator Singapore (2026): Compare Ad-Hoc Night Checking Against a More Structured Overnight-Coverage Model Before One Bad Month Reshapes the Household", subtopic: "calculator" },
        { url: "/medication-management-burden-calculator-singapore.html", title: "Medication Management Burden Calculator Singapore (2026): Compare Ad-Hoc Family Medication Handling Against a More Structured Support Model Before Confusion Turns Into Daily Friction", subtopic: "calculator" },
        { url: "/nutrition-support-burden-calculator-singapore.html", title: "Nutrition Support Burden Calculator Singapore (2026): Compare Ad-Hoc Family Meal Support Against a More Structured Nutrition Route Before Under-Eating Becomes the Household Default", subtopic: "calculator" },
        { url: "/continence-support-burden-calculator-singapore.html", title: "Continence Support Burden Calculator Singapore (2026): Compare Ad-Hoc Cleanup and Rushing Against a More Structured Support System Before the Household Starts Organising Life Around Near-Misses", subtopic: "calculator" },
        { url: "/home-modifications-vs-relocating-cost-calculator-singapore.html", title: "Home Modifications vs Relocating Cost Calculator Singapore (2026): Compare Adapting the Current Home Against Moving to a Better-Fit Place Before the Household Pays Twice", subtopic: "calculator" },
        { url: "/walker-friendly-home-vs-wheelchair-ready-home-calculator-singapore.html", title: "Walker-Friendly Home vs Wheelchair-Ready Home Calculator Singapore (2026): Compare Small Adaptations Against a More Complete Accessibility Build Before Rework Starts Costing More Than the Upgrade", subtopic: "calculator" },
        { url: "/hearing-vision-home-adjustment-cost-calculator-singapore.html", title: "Hearing and Vision Home-Adjustment Cost Calculator Singapore (2026): Compare Ad-Hoc Prompting Against a More Structured Sensory-Support Setup Before Confusion Becomes the Household Default", subtopic: "calculator" },
        { url: "/shared-home-vs-two-households-cost-calculator-singapore.html", title: "Shared Home vs Two Households Cost Calculator Singapore (2026): Compare One Larger Shared Home Against Two Nearby Smaller Households Before Space Efficiency Hides Exit Fragility", subtopic: "calculator" },
        { url: "/move-parents-in-vs-maintain-nearby-households-cost-calculator-singapore.html", title: "Move Parents In vs Maintain Nearby Households Cost Calculator Singapore (2026): Compare One-Roof Convenience Against Nearby Separate Living Before Response Speed Hides Household Strain", subtopic: "calculator" },
        { url: "/rent-near-parents-vs-buy-near-parents-cost-calculator-singapore.html", title: "Rent Near Parents vs Buy Near Parents Cost Calculator Singapore (2026): Compare Flexibility Against Ownership Commitment Before Proximity Becomes an Expensive Shortcut", subtopic: "calculator" },
        { url: "/early-missed-appointments-vs-waiting-for-a-serious-follow-up-lapse-with-aging-parents-singapore.html", title: "Early Missed Appointments vs Waiting for a Serious Follow-Up Lapse With Aging Parents in Singapore (2026): When Should Families Move Before One Skipped Visit Turns Into Preventable Deterioration?", subtopic: "planning" },
        { url: "/one-fragmented-specialist-schedule-vs-consolidated-appointment-planning-for-aging-parents-singapore.html", title: "One Fragmented Specialist Schedule vs Consolidated Appointment Planning for Aging Parents in Singapore (2026): When Does ‘Just Book Whatever Is Available’ Start Breaking the Household?", subtopic: "comparison" },
        { url: "/ad-hoc-family-coordination-vs-shared-appointment-and-records-system-for-aging-parents-singapore.html", title: "Ad-Hoc Family Coordination vs Shared Appointment and Records System for Aging Parents in Singapore (2026): When Does Helpful Informality Stop Being Reliable Enough?", subtopic: "comparison" },
        { url: "/how-supporting-aging-parents-changes-your-appointment-coordination-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Appointment-Coordination Decision Order in Singapore (2026): What Should Move Up the Queue Once Follow-Up Load Starts Running the Household?", subtopic: "planning" },
        { url: "/move-near-school-or-pay-for-student-care-first-singapore.html", title: "Move Near School or Pay for Student Care First in Singapore (2026): Which Family Fix Reduces More Daily Strain?", subtopic: "bridge" },
        { url: "/move-near-grandparents-or-pay-for-student-care-first-singapore.html", title: "Move Near Grandparents or Pay for Student Care First in Singapore (2026): Which Fix Actually Creates More Daily Stability?", subtopic: "bridge" },
        { url: "/move-near-grandparents-or-pay-for-infantcare-first-singapore.html", title: "Move Near Grandparents or Pay for Infantcare First in Singapore (2026): Which Fix Actually Makes Early-Years Logistics More Sustainable?", subtopic: "bridge" },
        { url: "/move-near-parents-or-pay-for-helper-first-singapore.html", title: "Move Near Parents or Pay for a Helper First in Singapore (2026): Which Support Choice Removes More Daily Strain?", subtopic: "bridge" },
        { url: "/fund-child-enrichment-or-support-parents-medical-costs-first-singapore.html", title: "Fund Child Enrichment or Support Parents’ Medical Costs First in Singapore (2026): Which Spend Actually Deserves Priority?", subtopic: "bridge" },
      
      
        { url: "/preschool-vs-stay-at-home-parent-singapore.html", title: "Preschool vs Stay-at-Home Parent in Singapore (2026): Which Family Operating Model Actually Holds Up?", subtopic: "comparison" },
        { url: "/student-care-vs-reduce-work-hours-singapore.html", title: "Student Care vs Reduce Work Hours in Singapore (2026): Which Post-School Model Is Actually Stronger?", subtopic: "comparison" },
        { url: "/enrichment-classes-vs-bigger-cash-buffer-after-first-child-singapore.html", title: "Enrichment Classes vs Bigger Cash Buffer After First Child in Singapore (2026): Which Should Families Strengthen First?", subtopic: "comparison" },
        { url: "/have-a-second-child-now-or-build-bigger-cash-buffer-first-singapore.html", title: "Have a Second Child Now or Build a Bigger Cash Buffer First in Singapore (2026): Which Sequencing Is Safer?", subtopic: "comparison" },],
      bridges: [
        { url: "/move-house-for-school-vs-stay-put-singapore.html", title: "Move House for School vs Stay Put in Singapore (2026): When a School-Driven Move Actually Improves Family Fit", cluster: "property" },
        { url: "/live-near-parents-vs-live-near-school-singapore.html", title: "Live Near Parents vs Live Near School in Singapore (2026): Which Location Advantage Actually Makes Family Life Easier?", cluster: "property" },
        { url: "/how-having-a-child-affects-tdsr-borrowing-capacity-singapore.html", title: "How Having a Child Affects Your TDSR and Borrowing Capacity in Singapore (2026)", cluster: "property" }
      
      ]
    },
    protection: {
      label: "Related Singapore Protection & Insurance Guides",
      pillars: [
        { url: "/how-much-life-insurance-do-you-need-singapore.html", title: "How Much Life Insurance Do You Need in Singapore? (2026): A Protection-Gap Framework for Real Household Obligations", subtopic: "planning" },
        { url: "/term-life-vs-whole-life-cost-singapore.html", title: "Term Life vs Whole Life Cost in Singapore (2026): The Protection Decision That Usually Starts with the Wrong Question", subtopic: "comparison" },
        { url: "/critical-illness-insurance-cost-singapore.html", title: "Critical Illness Insurance Cost in Singapore (2026): The Lump-Sum Protection Layer Families Misunderstand Most", subtopic: "planning" }
      ],
      pages: [
        { url: "/accident-insurance-vs-term-life-insurance-singapore.html", title: "Accident Insurance vs Term Life Insurance in Singapore (2026): Cheap Event Cover vs Family Income Protection", subtopic: "comparison" },
        { url: "/term-life-insurance-vs-hospitalisation-rider-singapore.html", title: "Term Life Insurance vs Hospitalisation Rider in Singapore (2026): Dependency Protection vs Reducing Medical-Cost Friction", subtopic: "comparison" },
        { url: "/disability-income-insurance-vs-hospitalisation-rider-singapore.html", title: "Disability Income Insurance vs Hospitalisation Rider in Singapore (2026): Income Continuity vs Medical-Cost Friction", subtopic: "comparison" },
        { url: "/hospital-cash-vs-hospitalisation-rider-singapore.html", title: "Hospital Cash vs Hospitalisation Rider in Singapore (2026): Daily Cash Allowance vs Reducing Medical Bill Friction", subtopic: "comparison" },
        { url: "/increase-hospitalisation-rider-or-build-child-education-fund-first-singapore.html", title: "Increase a Hospitalisation Rider or Build a Child-Education Fund First in Singapore (2026): Which Gap Is More Dangerous to Leave Open?", subtopic: "bridge" },
        { url: "/hospitalisation-insurance-vs-rider-cost-singapore.html", title: "Hospitalisation Insurance vs Rider Cost in Singapore (2026): When Extra Premium Really Changes the Risk You Keep", subtopic: "planning" },
        { url: "/increase-hospitalisation-rider-or-pay-down-home-loan-first-with-aging-parents-singapore.html", title: "Increase a Hospitalisation Rider or Pay Down Home Loan First When Supporting Aging Parents in Singapore (2026): Which Layer Protects Household Stability Better?", subtopic: "bridge" },
        { url: "/term-life-vs-critical-illness-insurance-singapore.html", title: "Term Life vs Critical Illness Insurance in Singapore (2026): Why Households Compare the Wrong Things and Still End Up Under-Protected", subtopic: "comparison" },
        { url: "/disability-income-insurance-cost-singapore.html", title: "Disability Income Insurance Cost in Singapore (2026): The Protection Layer Households Overlook Until Income Is the Thing That Breaks", subtopic: "planning" },
        { url: "/home-protection-scheme-hps-singapore.html", title: "Home Protection Scheme (HPS) Singapore (2026): The Compulsory HDB Mortgage Insurance Most Buyers Underread", subtopic: "planning" },
        { url: "/home-insurance-vs-fire-insurance-singapore.html", title: "Home Insurance vs Fire Insurance Singapore (2026): Coverage Gap, Structural Risk, and What Actually Protects Your Asset", subtopic: "comparison" },
        { url: "/accident-insurance-cost-singapore.html", title: "Accident Insurance Cost in Singapore (2026): Cheap Premium, Real Gap, or Just Another Add-On?", subtopic: "comparison" },
        { url: "/critical-illness-vs-hospitalisation-insurance-singapore.html", title: "Critical Illness vs Hospitalisation Insurance in Singapore (2026): Why Households Confuse These Protection Layers", subtopic: "comparison" },
        { url: "/hospital-cash-insurance-worth-it-singapore.html", title: "Is Hospital Cash Insurance Worth It in Singapore? (2026): Cheap Add-On or Useful Buffer?", subtopic: "comparison" },
        { url: "/early-critical-illness-vs-critical-illness-singapore.html", title: "Early Critical Illness vs Critical Illness in Singapore (2026): Same Category, Very Different Trigger Timing", subtopic: "comparison" },
        { url: "/hospitalisation-insurance-vs-accident-insurance-singapore.html", title: "Hospitalisation Insurance vs Accident Insurance in Singapore (2026): Why Medical Cover and Accident Cover Are Not the Same Thing", subtopic: "comparison" },
        { url: "/whole-life-vs-critical-illness-insurance-singapore.html", title: "Whole Life vs Critical Illness Insurance in Singapore (2026): Why a Permanent Life Policy and an Illness Payout Should Not Be Compared Lazily", subtopic: "comparison" },
        { url: "/life-insurance-and-home-loan-singapore.html", title: "Life Insurance and Your Home Loan in Singapore (2026): What Happens to Your Property If You Die", subtopic: "planning" },
        { url: "/accident-insurance-vs-critical-illness-insurance-singapore.html", title: "Accident Insurance vs Critical Illness Insurance in Singapore (2026): Cheap Event Cover vs Flexible Diagnosis-Stage Cash", subtopic: "comparison" },
        { url: "/term-life-vs-disability-income-insurance-singapore.html", title: "Term Life vs Disability Income Insurance in Singapore (2026): Death Cover Is Not Income Continuity", subtopic: "comparison" },
        { url: "/how-a-second-child-changes-your-insurance-needs-singapore.html", title: "How a Second Child Changes Your Insurance Needs in Singapore (2026): The Protection Review Families Delay Too Long", subtopic: "planning" },
        { url: "/how-marriage-changes-your-insurance-needs-singapore.html", title: "How Marriage Changes Your Insurance Needs in Singapore (2026): The Protection Review Couples Delay Too Long", subtopic: "planning" },
        { url: "/how-a-property-upgrade-changes-your-insurance-needs-singapore.html", title: "How a Property Upgrade Changes Your Insurance Needs in Singapore (2026): Bigger Mortgage, Bigger Protection Consequences", subtopic: "planning" },
        { url: "/when-insurance-starts-to-matter-more-than-investing-singapore.html", title: "When Insurance Starts to Matter More Than Investing in Singapore (2026): The Order of Operations Risk-Aware Households Should Respect", subtopic: "planning" },
        { url: "/how-becoming-self-employed-changes-your-insurance-needs-singapore.html", title: "How Becoming Self-Employed Changes Your Insurance Needs in Singapore (2026): The Protection Reset Most New Founders Delay", subtopic: "planning" },
        { url: "/how-a-single-income-household-changes-your-insurance-needs-singapore.html", title: "How a Single-Income Household Changes Your Insurance Needs in Singapore (2026): The Protection Review Dependency Concentration Demands", subtopic: "planning" },
        { url: "/how-supporting-aging-parents-changes-your-insurance-needs-singapore.html", title: "How Supporting Aging Parents Changes Your Insurance Needs in Singapore (2026): The Protection Review the Sandwich Generation Cannot Skip", subtopic: "planning" },
        { url: "/how-divorce-changes-your-insurance-needs-singapore.html", title: "How Divorce Changes Your Insurance Needs in Singapore (2026): The Protection Reset Most Households Delay Too Long", subtopic: "planning" },
        { url: "/how-buying-an-investment-property-changes-your-insurance-needs-singapore.html", title: "How Buying an Investment Property Changes Your Insurance Needs in Singapore (2026): The Protection Review Many Investors Skip", subtopic: "planning" },
        { url: "/how-retirement-changes-your-insurance-needs-singapore.html", title: "How Retirement Changes Your Insurance Needs in Singapore (2026): The Protection Reset That Is Not Just About Paying Less", subtopic: "planning" },
        { url: "/how-paying-off-your-home-loan-changes-your-insurance-needs-singapore.html", title: "How Paying Off Your Home Loan Changes Your Insurance Needs in Singapore (2026): The Protection Review Most Owners Forget to Do", subtopic: "planning" },
        { url: "/how-changing-jobs-changes-your-insurance-needs-singapore.html", title: "How Changing Jobs Changes Your Insurance Needs in Singapore (2026): The Protection Review Employees Usually Skip", subtopic: "planning" },
        { url: "/how-having-no-dependants-changes-your-insurance-needs-singapore.html", title: "How Having No Dependants Changes Your Insurance Needs in Singapore (2026): The Protection Stack Looks Different When Nobody Depends on Your Income", subtopic: "planning" },
        { url: "/accident-insurance-vs-disability-income-insurance-singapore.html", title: "Accident Insurance vs Disability Income Insurance in Singapore (2026): Event Payout or Income Continuity?", subtopic: "comparison" },
        { url: "/critical-illness-vs-disability-income-insurance-singapore.html", title: "Critical Illness vs Disability Income Insurance in Singapore (2026): Why Lump-Sum Illness Cover and Income Replacement Are Not the Same Job", subtopic: "comparison" },
        { url: "/home-protection-scheme-vs-term-life-insurance-singapore.html", title: "Home Protection Scheme vs Term Life Insurance in Singapore (2026): Mortgage Cover Is Not Full Family Protection", subtopic: "comparison" },
        { url: "/hospital-cash-vs-critical-illness-insurance-singapore.html", title: "Hospital Cash vs Critical Illness Insurance in Singapore (2026): Cheap Add-On or Real Illness Protection?", subtopic: "comparison" },
        { url: "/how-much-critical-illness-insurance-do-you-need-singapore.html", title: "How Much Critical Illness Insurance Do You Need in Singapore? (2026): Sizing the Lump-Sum Buffer Without Guessing", subtopic: "planning" },
        { url: "/how-much-disability-income-insurance-do-you-need-singapore.html", title: "How Much Disability Income Insurance Do You Need in Singapore? (2026): Sizing Income Replacement Without Pretending Recovery Is Binary", subtopic: "planning" },
        { url: "/emergency-fund-vs-term-life-insurance-first-singapore.html", title: "Emergency Fund vs Term Life Insurance First in Singapore (2026): Which Protection Layer Comes First When Budget Is Tight?", subtopic: "bridge" },
        { url: "/emergency-fund-vs-hospitalisation-rider-first-singapore.html", title: "Emergency Fund vs Hospitalisation Rider First in Singapore (2026): Which Medical-Risk Decision Deserves the Next Dollar?", subtopic: "bridge" },
        { url: "/self-fund-long-term-care-vs-insure-for-it-singapore.html", title: "Self-Fund Long-Term Care vs Insure for It in Singapore (2026): When a Care Reserve Beats More Premium and When It Does Not", subtopic: "comparison" },
        { url: "/use-housing-equity-vs-buy-more-long-term-care-cover-singapore.html", title: "Use Housing Equity vs Buy More Long-Term-Care Cover in Singapore (2026): Which Layer Actually Closes the Later-Life Care Gap?", subtopic: "comparison" },
        { url: "/set-aside-care-fund-vs-keep-investing-for-retirement-singapore.html", title: "Set Aside a Care Fund vs Keep Investing for Retirement in Singapore (2026): Which Trade-Off Better Protects Later-Life Flexibility?", subtopic: "comparison" },
        { url: "/life-insurance-calculator-singapore.html", title: "Life Insurance Calculator Singapore (2026)", cluster: "protection", subtopic: "calculator" },
        { url: "/long-term-care-funding-calculator-singapore.html", title: "Long-Term Care Funding Calculator Singapore (2026)", cluster: "protection", subtopic: "calculator" },
        { url: "/increase-disability-income-insurance-or-fund-helper-first-singapore.html", title: "Increase Disability Income Insurance or Fund a Helper First in Singapore (2026): Which Layer Better Protects the Household?", subtopic: "bridge" }],
      bridges: [
        { url: "/save-more-vs-buy-more-insurance-singapore.html", title: "Save More vs Buy More Insurance in Singapore (2026): When Extra Liquidity Beats Extra Coverage and When It Does Not", cluster: "investing", subtopic: "bridge" },
        { url: "/pay-down-debt-vs-build-emergency-fund-singapore.html", title: "Pay Down Debt vs Build Emergency Fund in Singapore (2026): Which Fragility Should You Reduce First?", cluster: "investing", subtopic: "bridge" },
        { url: "/accident-insurance-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html", title: "Accident Insurance vs Bigger Cash Buffer for Motorcycle Riders in Singapore (2026): Which Layer Should Move First?", cluster: "transport", subtopic: "bridge" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer for Motorcycle Riders in Singapore (2026): Which Fragility Matters More?", cluster: "transport", subtopic: "bridge" },
        { url: "/term-life-insurance-vs-bigger-cash-buffer-after-first-child-singapore.html", title: "Term Life Insurance vs Bigger Cash Buffer After First Child in Singapore (2026): Which Gap Deserves the Next Dollar?", cluster: "family", subtopic: "bridge" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-after-first-child-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer After First Child in Singapore (2026): Which Fragility Matters More?", cluster: "family", subtopic: "bridge" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-after-first-child-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer After First Child in Singapore (2026): Which Layer Reduces More Friction?", cluster: "family", subtopic: "bridge" },
        { url: "/how-having-children-changes-your-insurance-priority-order-singapore.html", title: "How Having Children Changes Your Insurance Priority Order in Singapore (2026): What Actually Moves Up the Queue?", cluster: "family", subtopic: "bridge" },
        { url: "/term-life-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Term Life Insurance vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Gap Deserves the Next Dollar?", cluster: "family", subtopic: "bridge" },
        { url: "/disability-income-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Fragility Matters More?", cluster: "family", subtopic: "bridge" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Layer Reduces More Friction?", cluster: "family", subtopic: "bridge" },
        { url: "/how-supporting-aging-parents-changes-your-cash-buffer-plan-singapore.html", title: "How Supporting Aging Parents Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", cluster: "family", subtopic: "planning" },
        { url: "/hospitalisation-rider-vs-bigger-cash-buffer-for-motorcycle-riders-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer for Motorcycle Riders in Singapore (2026): Which Layer Reduces More Friction?", cluster: "transport", subtopic: "bridge" },
        { url: "/how-motorcycle-ownership-changes-your-insurance-priority-order-singapore.html", title: "How Motorcycle Ownership Changes Your Insurance Priority Order in Singapore (2026): What Actually Moves Up the Queue?", cluster: "transport", subtopic: "bridge" }
      ]
    },

    investing: {
      pillar: "/how-much-emergency-fund-do-you-need-singapore.html",
      pages: [
        { url: "/top-up-cpf-sa-or-pay-for-after-school-care-first-singapore.html", title: "Top Up CPF SA or Pay for After-School Care First in Singapore (2026): Which Use of Surplus Solves the More Time-Sensitive Problem?", subtopic: "bridge" },
        { url: "/increase-index-fund-investing-or-pay-for-after-school-care-first-singapore.html", title: "Increase Index-Fund Investing or Pay for After-School Care First in Singapore (2026): Which Use of Cash Solves the More Time-Sensitive Constraint?", cluster: "investing", subtopic: "bridge" },
        { url: "/buy-bigger-home-or-increase-index-fund-investing-first-singapore.html", title: "Buy a Bigger Home or Increase Index-Fund Investing First in Singapore (2026): Which Use of Capital Builds More Flexibility?", cluster: "property", subtopic: "bridge" },
        { url: "/buy-investment-property-or-increase-index-fund-investing-singapore.html", title: "Buy an Investment Property or Increase Index-Fund Investing in Singapore (2026): Which Route Builds Wealth With Less Fragility?", subtopic: "bridge" },
        { url: "/help-parents-with-housing-costs-or-build-your-own-investment-portfolio-first-singapore.html", title: "Help Parents With Housing Costs or Build Your Own Investment Portfolio First in Singapore (2026): Which Use of the Next Dollar Is More Sustainable?", subtopic: "bridge" },
        { url: "/emergency-fund-vs-sinking-fund-singapore.html", title: "Emergency Fund vs Sinking Fund in Singapore (2026): Why Mixing Shock Reserves with Planned Spending Creates False Safety", subtopic: "comparison" },
        { url: "/how-having-a-mortgage-changes-your-emergency-fund-size-singapore.html", title: "How Having a Mortgage Changes Your Emergency Fund Size in Singapore (2026): Why Fixed Debt Obligations Usually Demand a Bigger Cash Buffer", subtopic: "planning" },
        { url: "/how-having-children-changes-your-emergency-fund-size-singapore.html", title: "How Having Children Changes Your Emergency Fund Size in Singapore (2026): Why Household Burn Rate and Dependency Risk Push the Buffer Higher", subtopic: "planning" },
        { url: "/how-much-emergency-fund-do-you-need-singapore.html", title: "How Much Emergency Fund Do You Need in Singapore? (2026): A Liquidity Buffer Framework for Real Household Fragility", subtopic: "planning" },
        { url: "/how-much-of-your-emergency-fund-should-stay-instant-access-singapore.html", title: "How Much of Your Emergency Fund Should Stay Instant Access in Singapore? (2026): Designing the First Liquidity Layer Without Overparking Every Dollar", subtopic: "planning" },
        { url: "/how-to-rebuild-your-emergency-fund-after-using-it-singapore.html", title: "How to Rebuild Your Emergency Fund After Using It in Singapore (2026): A Practical Reset Plan Without Pausing Life Indefinitely", subtopic: "planning" },
        { url: "/how-to-size-an-emergency-fund-if-your-income-is-irregular-singapore.html", title: "How to Size an Emergency Fund If Your Income Is Irregular in Singapore (2026): A Buffer Framework for Variable Cash Flow Without Guesswork", subtopic: "planning" },
        { url: "/should-you-invest-part-of-your-emergency-fund-singapore.html", title: "Should You Invest Part of Your Emergency Fund in Singapore? (2026): The Yield Temptation That Often Defeats the Point of the Buffer", subtopic: "decision" },
        { url: "/should-you-split-your-emergency-fund-across-accounts-singapore.html", title: "Should You Split Your Emergency Fund Across Accounts in Singapore? (2026): A Practical Liquidity Structure for Access, Discipline, and Failure Risk", subtopic: "decision" },
        { url: "/when-to-invest-vs-build-your-emergency-fund-first-singapore.html", title: "When to Invest vs Build Your Emergency Fund First in Singapore (2026): The Liquidity-First Sequence Many Households Skip", subtopic: "decision" },
        { url: "/when-to-use-your-emergency-fund-singapore.html", title: "When to Use Your Emergency Fund in Singapore (2026): A Practical Boundary Framework for Real Emergencies", subtopic: "decision" },
        { url: "/where-to-keep-your-emergency-fund-singapore.html", title: "Where to Keep Your Emergency Fund in Singapore? (2026): Liquidity, Safety, and Why Yield Is Not the Main Job", subtopic: "planning" },
        { url: "/pay-down-debt-vs-build-emergency-fund-singapore.html", title: "Pay Down Debt vs Build Emergency Fund in Singapore (2026): Which Fragility Should You Reduce First?", subtopic: "bridge" },
        { url: "/save-more-vs-buy-more-insurance-singapore.html", title: "Save More vs Buy More Insurance in Singapore (2026): When Extra Liquidity Beats Extra Coverage and When It Does Not", subtopic: "bridge" }
      ,
        { url: "/cpf-oa-investment-singapore.html", title: "CPF OA Investment in Singapore (2026)", cluster: "investing", subtopic: "investing" },
        { url: "/srs-account-singapore.html", title: "SRS Account in Singapore (2026)", cluster: "investing", subtopic: "investing" },
        { url: "/regular-savings-plan-vs-lump-sum-singapore.html", title: "Regular Savings Plan vs Lump Sum Investing in Singapore (2026)", cluster: "investing", subtopic: "investing" },
        { url: "/how-much-to-invest-each-month-singapore.html", title: "How Much to Invest Each Month in Singapore (2026)", cluster: "investing", subtopic: "investing" },
        { url: "/cpf-sa-top-up-singapore.html", title: "CPF SA Top-Up in Singapore (2026)", cluster: "investing", subtopic: "investing" },
        { url: "/singapore-savings-bonds-singapore.html", title: "Singapore Savings Bonds (2026)", cluster: "investing", subtopic: "investing" },
        { url: "/index-fund-investing-singapore.html", title: "Index Fund Investing in Singapore (2026)", cluster: "investing", subtopic: "investing" },
        { url: "/t-bills-vs-singapore-savings-bonds-singapore.html", title: "T-Bills vs Singapore Savings Bonds in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/singapore-savings-bonds-vs-fixed-deposit-singapore.html", title: "Singapore Savings Bonds vs Fixed Deposit in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cash-management-account-vs-singapore-savings-bonds-singapore.html", title: "Cash Management Account vs Singapore Savings Bonds in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cash-management-account-vs-t-bills-singapore.html", title: "Cash Management Account vs T-Bills in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/t-bills-vs-fixed-deposit-singapore.html", title: "T-Bills vs Fixed Deposit in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/srs-vs-cpf-sa-top-up-singapore.html", title: "SRS vs CPF SA Top-Up in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cpf-sa-top-up-vs-pay-down-mortgage-singapore.html", title: "CPF SA Top-Up vs Pay Down Mortgage in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/srs-vs-pay-down-mortgage-singapore.html", title: "SRS vs Pay Down Mortgage in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/srs-vs-cpf-oa-investment-singapore.html", title: "SRS vs CPF OA Investment in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cpf-sa-top-up-vs-cpf-oa-investment-singapore.html", title: "CPF SA Top-Up vs CPF OA Investment in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/surplus-cash-allocation-calculator-singapore.html", title: "Surplus Cash Allocation Calculator Singapore (2026)", cluster: "investing", subtopic: "calculator" },
        { url: "/cash-buffer-vs-srs-singapore.html", title: "Cash Buffer vs SRS in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cash-buffer-vs-cpf-sa-top-up-singapore.html", title: "Cash Buffer vs CPF SA Top-Up in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cash-buffer-vs-cpf-oa-investment-singapore.html", title: "Cash Buffer vs CPF OA Investment in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/srs-vs-index-fund-investing-singapore.html", title: "SRS vs Index Fund Investing in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cpf-oa-investment-vs-index-fund-investing-singapore.html", title: "CPF OA Investment vs Index Fund Investing in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cpf-sa-top-up-vs-index-fund-investing-singapore.html", title: "CPF SA Top-Up vs Index Fund Investing in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cpf-life-vs-dividend-portfolio-singapore.html", title: "CPF LIFE vs Dividend Portfolio in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cpf-life-vs-ssb-ladder-singapore.html", title: "CPF LIFE vs SSB Ladder in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/srs-withdrawal-order-vs-tax-smoothing-singapore.html", title: "SRS Withdrawal Order vs Tax Smoothing in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/retirement-income-layering-calculator-singapore.html", title: "Retirement Income Layering Calculator Singapore (2026)", cluster: "investing", subtopic: "calculator" },
        { url: "/cpf-life-standard-vs-escalating-plan-singapore.html", title: "CPF LIFE Standard vs Escalating Plan in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cpf-life-basic-vs-standard-plan-singapore.html", title: "CPF LIFE Basic vs Standard Plan in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/cpf-life-basic-vs-escalating-plan-singapore.html", title: "CPF LIFE Basic vs Escalating Plan in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/sell-units-vs-live-off-dividends-in-retirement-singapore.html", title: "Sell Units vs Live Off Dividends in Retirement in Singapore (2026)", cluster: "investing", subtopic: "comparison" },
        { url: "/how-much-cash-bucket-before-cpf-life-singapore.html", title: "How Much Cash Bucket Before CPF LIFE in Singapore (2026)", cluster: "investing", subtopic: "planning" },
        { url: "/how-to-start-investing-singapore.html", title: "How to Start Investing in Singapore (2026): A Sequencing Framework for the First Real Allocation", cluster: "investing", subtopic: "planning" },
        { url: "/etf-vs-unit-trust-singapore.html", title: "ETF vs Unit Trust in Singapore (2026): Which Fund Structure Fits the Way Your Household Actually Invests?", cluster: "investing", subtopic: "comparison" },
        { url: "/robo-advisor-vs-diy-index-fund-singapore.html", title: "Robo-Advisor vs DIY Index Fund in Singapore (2026): Which Implementation Route Fits Your Household's Real Behaviour?", cluster: "investing", subtopic: "comparison" },
        { url: "/dividend-investing-vs-index-fund-investing-singapore.html", title: "Dividend Investing vs Index Fund Investing in Singapore (2026): Which Strategy Actually Fits Your Household's Real Objective?", cluster: "investing", subtopic: "comparison" }],
      bridges: [
        { url: "/emergency-fund-vs-term-life-insurance-first-singapore.html", title: "Emergency Fund vs Term Life Insurance First in Singapore (2026): Which Protection Layer Comes First When Budget Is Tight?", cluster: "protection", subtopic: "bridge" },
        { url: "/emergency-fund-vs-hospitalisation-rider-first-singapore.html", title: "Emergency Fund vs Hospitalisation Rider First in Singapore (2026): Which Medical-Risk Decision Deserves the Next Dollar?", cluster: "protection", subtopic: "bridge" },
        { url: "/should-you-build-your-emergency-fund-before-buying-a-car-singapore.html", title: "Should You Build Your Emergency Fund Before Buying a Car in Singapore? (2026): The Buffer Question That Changes the Car Decision", cluster: "transport", subtopic: "bridge" },
        { url: "/car-repair-sinking-fund-vs-emergency-fund-singapore.html", title: "Car Repair Sinking Fund vs Emergency Fund in Singapore (2026): Stop Funding Predictable Vehicle Wear from Your Shock Reserve", cluster: "transport", subtopic: "bridge" },
        { url: "/bigger-car-down-payment-vs-larger-cash-buffer-singapore.html", title: "Bigger Car Down Payment vs Larger Cash Buffer in Singapore (2026): Which One Actually Makes Ownership Safer?", cluster: "transport", subtopic: "bridge" },
        { url: "/how-car-ownership-changes-your-cash-buffer-plan-singapore.html", title: "How Car Ownership Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", cluster: "transport", subtopic: "bridge" }
        ,{ url: "/disability-income-insurance-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Protects the Household Better?", cluster: "protection", subtopic: "bridge" }
        ,{ url: "/critical-illness-insurance-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Critical Illness Insurance vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Buys More Breathing Room?", cluster: "protection", subtopic: "bridge" }
        ,{ url: "/hospitalisation-rider-vs-bigger-cash-buffer-with-mortgage-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer With a Mortgage in Singapore (2026): Which Layer Actually Reduces More Fragility?", cluster: "protection", subtopic: "bridge" }
        ,{ url: "/term-life-vs-cash-buffer-for-single-income-mortgage-singapore.html", title: "Term Life vs Cash Buffer for a Single-Income Mortgage in Singapore (2026): Which Missing Layer Is More Dangerous Right Now?", cluster: "protection", subtopic: "bridge" }
        ,{ url: "/should-you-build-your-emergency-fund-before-buying-a-motorcycle-singapore.html", title: "Should You Build Your Emergency Fund Before Buying a Motorcycle in Singapore? (2026): The Buffer Question Riders Skip", cluster: "transport", subtopic: "bridge" }
        ,{ url: "/motorcycle-repair-sinking-fund-vs-emergency-fund-singapore.html", title: "Motorcycle Repair Sinking Fund vs Emergency Fund in Singapore (2026): Stop Funding Predictable Bike Wear From Your Shock Reserve", cluster: "transport", subtopic: "bridge" }
        ,{ url: "/bigger-motorcycle-down-payment-vs-larger-cash-buffer-singapore.html", title: "Bigger Motorcycle Down Payment vs Larger Cash Buffer in Singapore (2026): Which One Actually Makes Ownership Safer?", cluster: "transport", subtopic: "bridge" }
        ,{ url: "/how-motorcycle-ownership-changes-your-cash-buffer-plan-singapore.html", title: "How Motorcycle Ownership Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", cluster: "transport", subtopic: "bridge" }
        ,{ url: "/term-life-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Term Life Insurance vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Gap Deserves the Next Dollar?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/disability-income-insurance-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Disability Income Insurance vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Fragility Matters More?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/hospitalisation-rider-vs-bigger-cash-buffer-when-supporting-aging-parents-singapore.html", title: "Hospitalisation Rider vs Bigger Cash Buffer When Supporting Aging Parents in Singapore (2026): Which Layer Reduces More Friction?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/how-supporting-aging-parents-changes-your-cash-buffer-plan-singapore.html", title: "How Supporting Aging Parents Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", cluster: "family", subtopic: "planning" }
        ,{ url: "/help-aging-parents-now-vs-strengthen-your-own-retirement-first-singapore.html", title: "Help Aging Parents Now vs Strengthen Your Own Retirement First in Singapore (2026): Which Long-Horizon Duty Should Get the Next Dollar?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/top-up-parents-cpf-vs-preserve-your-own-cash-buffer-singapore.html", title: "Top Up Parents' CPF vs Preserve Your Own Cash Buffer in Singapore (2026): Which Move Actually Makes the Family Safer?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/monthly-support-for-aging-parents-vs-build-bigger-emergency-fund-singapore.html", title: "Monthly Support for Aging Parents vs Build a Bigger Emergency Fund in Singapore (2026): Which Layer Should a Sandwich-Generation Household Strengthen First?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/how-supporting-aging-parents-changes-your-investing-priority-order-singapore.html", title: "How Supporting Aging Parents Changes Your Investing Priority Order in Singapore (2026): What Should Move Up the Queue Once Elder Support Becomes Real?", cluster: "family", subtopic: "planning" }
        ,{ url: "/split-aging-parent-support-equally-vs-by-income-singapore.html", title: "Split Aging-Parent Support Equally vs by Income in Singapore (2026): What Is Fair When Siblings Cannot Carry the Same Load?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/give-cash-vs-take-on-caregiving-time-for-aging-parents-singapore.html", title: "Give Cash vs Take On Caregiving Time for Aging Parents in Singapore (2026): Which Form of Support Actually Reduces More Family Strain?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/help-siblings-now-vs-preserve-your-own-cash-buffer-when-supporting-parents-singapore.html", title: "Help Siblings Now vs Preserve Your Own Cash Buffer When Supporting Parents in Singapore (2026): When Does Family Bridging Become Household Fragility?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/how-supporting-aging-parents-changes-your-family-burden-sharing-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Family Burden-Sharing Decision Order in Singapore (2026): What Should Siblings Decide First Once Care Obligations Become Real?", cluster: "family", subtopic: "planning" }
        ,{ url: "/lasting-power-of-attorney-for-aging-parents-singapore.html", title: "Lasting Power of Attorney for Aging Parents in Singapore (2026): Why Care Plans Break Without Legal Authority", cluster: "family", subtopic: "planning" }
        ,{ url: "/advance-care-planning-for-aging-parents-singapore.html", title: "Advance Care Planning for Aging Parents in Singapore (2026): Why Medical Clarity Matters Before Crisis", cluster: "family", subtopic: "planning" }
        ,{ url: "/who-should-manage-eldercare-decisions-in-the-family-singapore.html", title: "Who Should Manage Eldercare Decisions in the Family in Singapore (2026): How to Choose the Real Coordinator Before Stress Forces It", cluster: "family", subtopic: "decision" }
        ,{ url: "/how-supporting-aging-parents-changes-your-legal-readiness-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Legal Readiness Decision Order in Singapore (2026): What Should Move Up the Queue Before a Crisis Forces It?", cluster: "family", subtopic: "planning" }
        ,{ url: "/aging-in-place-vs-moving-in-with-aging-parents-singapore.html", title: "Aging in Place vs Moving In Together With Aging Parents in Singapore (2026): Which Living Arrangement Actually Reduces More Friction?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/home-modifications-vs-relocating-for-aging-parents-singapore.html", title: "Home Modifications vs Relocating for Aging Parents in Singapore (2026): Which Housing Fix Actually Solves the Real Problem?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/home-care-vs-nursing-home-for-aging-parents-singapore.html", title: "Home Care vs Nursing Home for Aging Parents in Singapore (2026): Which Care Setting Actually Fits the Next Stage?", cluster: "family", subtopic: "bridge" }
        ,{ url: "/how-supporting-aging-parents-changes-your-living-arrangement-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Living-Arrangement Decision Order in Singapore (2026): What Should Move Up the Queue Before Crisis Forces the Home Question?", cluster: "family", subtopic: "planning" }
        ,{ url: "/make-a-will-for-aging-parents-singapore.html", title: "Make a Will for Aging Parents in Singapore (2026): Why Families Should Not Leave Distribution Logic to Crisis or Intestacy", cluster: "family", subtopic: "planning" }
        ,{ url: "/cpf-nomination-for-aging-parents-singapore.html", title: "CPF Nomination for Aging Parents in Singapore (2026): Why Families Should Not Assume CPF Savings Follow the Same Route as the Rest of the Estate", cluster: "family", subtopic: "planning" }
        ,{ url: "/estate-document-readiness-for-aging-parents-singapore.html", title: "Estate-Document Readiness for Aging Parents in Singapore (2026): The Simple Organising Work That Prevents Scrambling After Death", cluster: "family", subtopic: "planning" }
        ,{ url: "/how-supporting-aging-parents-changes-your-estate-readiness-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Estate-Readiness Decision Order in Singapore (2026): What Should Move Up the Queue Before Bereavement Turns Gaps Into Stress", cluster: "family", subtopic: "planning" }
        ,{ url: "/early-memory-decline-vs-waiting-for-clearer-dementia-signs-singapore.html", title: "Early Memory Decline vs Waiting for Clearer Dementia Signs in Singapore (2026): When Should Families Move Before Delay Removes Better Options?", cluster: "family", subtopic: "planning" }
        ,{ url: "/supervision-at-home-vs-independent-living-for-aging-parents-with-cognitive-decline-singapore.html", title: "Supervision at Home vs Independent Living for Aging Parents With Cognitive Decline in Singapore (2026): When Does the Independence Label Stop Matching Reality?", cluster: "family", subtopic: "comparison" }
        ,{ url: "/memory-care-vs-general-eldercare-setting-for-aging-parents-singapore.html", title: "Memory Care vs General Eldercare Setting for Aging Parents in Singapore (2026): When Does Cognitive Decline Need a More Dementia-Specific Environment?", cluster: "family", subtopic: "comparison" }
        ,{ url: "/how-supporting-aging-parents-changes-your-cognitive-decline-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Cognitive-Decline Decision Order in Singapore (2026): What Should Move Up the Queue Once Memory and Judgment Start Shifting?", cluster: "family", subtopic: "planning" }
        ,{ url: "/early-scam-warning-signs-vs-waiting-for-a-bigger-financial-loss-with-aging-parents-singapore.html", title: "Early Scam Warning Signs vs Waiting for a Bigger Financial Loss With Aging Parents in Singapore (2026): When Should Families Step In Before One More Mistake Becomes Expensive?", cluster: "family", subtopic: "planning" }
        ,{ url: "/help-with-banking-vs-keep-full-financial-independence-for-aging-parents-singapore.html", title: "Help With Banking vs Keep Full Financial Independence for Aging Parents in Singapore (2026): When Does Support Reduce Risk Without Turning Into a Takeover?", cluster: "family", subtopic: "comparison" }
        ,{ url: "/sharing-banking-passwords-or-otps-vs-safer-payment-support-for-aging-parents-singapore.html", title: "Sharing Banking Passwords or OTPs vs Safer Payment Support for Aging Parents in Singapore (2026): Which Convenience Shortcut Creates Bigger Risk?", cluster: "family", subtopic: "comparison" }
        ,{ url: "/how-supporting-aging-parents-changes-your-financial-safety-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your Financial-Safety Decision Order in Singapore (2026): What Should Move Up the Queue Once Scam Risk and Money Errors Start Appearing?", cluster: "family", subtopic: "planning" }
        ,{ url: "/palliative-care-vs-continuing-aggressive-treatment-for-aging-parents-singapore.html", title: "Palliative Care vs Continuing Aggressive Treatment for Aging Parents in Singapore (2026): When Does the Goal Shift From Extending Every Possible Day to Protecting Comfort and Decision Quality?", cluster: "family", subtopic: "comparison" }
        ,{ url: "/home-hospice-vs-institutional-end-of-life-care-for-aging-parents-singapore.html", title: "Home Hospice vs Institutional End-of-Life Care for Aging Parents in Singapore (2026): Which Setting Actually Protects Comfort, Dignity, and Family Stability?", cluster: "family", subtopic: "comparison" }
        ,{ url: "/practical-end-of-life-planning-for-aging-parents-singapore.html", title: "Practical End-of-Life Planning for Aging Parents in Singapore (2026): What Families Should Organise Before the Final Stage Becomes a Rushed Operations Problem", cluster: "family", subtopic: "planning" }
        ,{ url: "/how-supporting-aging-parents-changes-your-end-of-life-decision-order-singapore.html", title: "How Supporting Aging Parents Changes Your End-of-Life Decision Order in Singapore (2026): What Should Move Up the Queue Once Care Is Shifting From Recovery to Comfort?", cluster: "family", subtopic: "planning" },
        { url: "/increase-index-fund-investing-or-pay-for-infantcare-first-singapore.html", title: "Increase Index-Fund Investing or Pay for Infantcare First in Singapore (2026): Which Move Should the Next Dollar Solve?", subtopic: "bridge" },
      
      
      ]
    }
 };

  // =========================

  // =========================
  // 1.5) DECISION PATH PRESETS (Financing loop)
  // =========================
  // These pages benefit from a financing-focused loop: mechanics → comparisons → calculators.
  const FINANCING_LOOP_PRESETS = {
    "/tdsr-msr-singapore": {
      compare: { href: "/property/financing/", label: "Property financing", meta: "Borrowing limits & loan choices" },
      related: [
        { href: "/hdb-loan-vs-bank-loan-singapore.html", label: "HDB loan vs Bank loan" },
        { href: "/fixed-vs-floating-home-loan-singapore.html", label: "Fixed vs Floating loan" },
        { href: "/refinance-vs-reprice-home-loan-singapore.html", label: "Refinance vs Reprice" }
      ]
    },
    "/cpf-accrued-interest-singapore": {
      compare: { href: "/property/financing/", label: "Property financing", meta: "CPF + cashflow reality" },
      related: [
        { href: "/sell-property-cost-singapore.html", label: "Sell property cost" },
        { href: "/rent-out-vs-sell-singapore.html", label: "Rent out vs Sell" },
        { href: "/refinance-vs-reprice-home-loan-singapore.html", label: "Refinance vs Reprice" }
      ]
    },
    "/mortgage-amortization-calculator-singapore": {
      compare: { href: "/property/financing/", label: "Property financing", meta: "Repayment schedule + interest exposure" },
      related: [
        { href: "/property-affordability-calculator-singapore.html", label: "Property affordability stress test" },
        { href: "/refinance-vs-reprice-home-loan-singapore.html", label: "Refinance vs Reprice" },
        { href: "/mortgage-interest-cost-singapore.html", label: "Mortgage interest cost intuition" }
      ]
    },
    "/mortgage-interest-cost-singapore": {
      compare: { href: "/property/financing/", label: "Property financing", meta: "Rates, interest, amortisation" },
      related: [
        { href: "/fixed-vs-floating-home-loan-singapore.html", label: "Fixed vs Floating loan" },
        { href: "/pay-down-mortgage-vs-invest-singapore.html", label: "Pay down mortgage vs Invest" },
        { href: "/refinance-vs-reprice-home-loan-singapore.html", label: "Refinance vs Reprice" }
      ]
    },
    "/bsd-absd-singapore": {
      compare: { href: "/property/financing/", label: "Property financing", meta: "Upfront cash & affordability" },
      related: [
        { href: "/rent-vs-buy-property-singapore.html", label: "Rent vs Buy (property)" },
        { href: "/hdb-vs-condo-singapore.html", label: "HDB vs Condo" },
        { href: "/property-affordability-calculator-singapore.html", label: "Property affordability stress test" }
      ]
    },
    "/sell-property-cost-singapore": {
      compare: { href: "/property/financing/", label: "Property financing", meta: "Exit costs & cashflow" },
      related: [
        { href: "/sell-property-proceeds-calculator-singapore.html", label: "Sell proceeds calculator" },
        { href: "/upgrade-downgrade-property-calculator-singapore.html", label: "Upgrade / downgrade property" },
        { href: "/rent-out-vs-sell-singapore.html", label: "Rent out vs Sell" },
        { href: "/cpf-accrued-interest-singapore.html", label: "CPF accrued interest" },
        { href: "/refinance-vs-reprice-home-loan-singapore.html", label: "Refinance vs Reprice" }
      ]
    },
    "/property-ownership-cost-singapore": {
      compare: { href: "/property/financing/", label: "Property financing", meta: "All-in exposure & leverage" },
      related: [
        { href: "/hdb-vs-condo-singapore.html", label: "HDB vs Condo" },
        { href: "/rent-vs-buy-property-singapore.html", label: "Rent vs Buy (property)" },
        { href: "/fixed-vs-floating-home-loan-singapore.html", label: "Fixed vs Floating loan" }
      ]
    },
    "/car-loan-rates-singapore": {
      compare: { href: "/transport/financing/", label: "Transport financing", meta: "Transport financing basics" },
      related: [
                { href: "/balloon-loan-vs-normal-car-loan-singapore.html", label: "Balloon loan vs Normal loan" },
        { href: "/car-loan-vs-cash-singapore.html", label: "Car loan vs Pay cash" },
        { href: "/car-affordability-calculator-singapore.html", label: "Car affordability stress test" }]
    }
  };

  // 2) HELPERS
  // =========================
  function normalizePath(p) {
    if (!p) return "/";
    let out = String(p).trim();
    // strip query/hash if present
    out = out.split("?")[0].split("#")[0];
    // ensure leading slash for relative paths
    if (!out.startsWith("/")) out = "/" + out;
    // collapse duplicate slashes
    out = out.replace(/\/{2,}/g, "/");
    // keep "/" as-is
    if (out === "/") return "/";
    // preserve trailing slash ONLY for directory hubs (heuristic: no dot extension)
    const hasExt = /\.[a-z0-9]+$/i.test(out);
    if (!hasExt && !out.endsWith("/")) out = out + "/";
    // for file pages, remove trailing slash if any
    if (hasExt && out.endsWith("/")) out = out.slice(0, -1);
    return out;
  }

  function getSelfPath() {
    const path = normalizePath(location.pathname || "/");
    // treat root "/" as "/"
    return path;
  }

  function getCanonicalPath() {
    const canon = document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
    if (!canon) return "";
    try {
      const u = new URL(canon, location.origin);
      return normalizePath(u.pathname);
    } catch {
      return "";
    }
  }

  function uniqByUrl(items) {
    const seen = new Set();
    return items.filter((x) => {
      if (!x || !x.url) return false;
      const key = normalizePath(x.url);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // =========================
  // 2.5) SITE SEARCH (header)
  // =========================
  function buildSearchIndex() {
    const out = [];
    for (const [clusterKey, cluster] of Object.entries(SITE || {})) {
      const pushAll = (arr, kind) => {
        (arr || []).forEach((p) => {
          if (!p || !p.url || !p.title) return;
          out.push({
            url: normalizePath(p.url),
            title: String(p.title),
            // allow individual entries (e.g., bridges) to override display cluster
            cluster: String(p.cluster || clusterKey),
            subtopic: String(p.subtopic || kind || "").toLowerCase()
          });
        });
      };
      pushAll(cluster.pillars, "pillar");
      pushAll(cluster.pages, "page");
      pushAll(cluster.bridges, "bridge");
    }

    // Also index the Comparisons map if present (kept under SETTINGS to avoid duplicating SITE pillars/pages).
    // This ensures new comparison pages show up in header search even if they are not part of a specific cluster map.
    if (SETTINGS && SETTINGS.comparisons) {
      const cKey = "comparisons";
      const c = SETTINGS.comparisons;
      const pushAll = (arr, kind) => {
        (arr || []).forEach((p) => {
          if (!p || !p.url || !p.title) return;
          out.push({
            url: normalizePath(p.url),
            title: String(p.title),
            cluster: String(p.cluster || cKey),
            subtopic: String(p.subtopic || kind || "").toLowerCase()
          });
        });
      };
      pushAll(c.pillars, "pillar");
      pushAll(c.pages, "page");
      pushAll(c.bridges, "bridge");
    }
    // Core pages (outside SITE map)
    out.unshift(
      { url: "/", title: "Ownership Guide (Home)", cluster: "home", subtopic: "start" },
      { url: "/start-here/", title: "Start Here", cluster: "home", subtopic: "start" },
      { url: "/transport/", title: "Transport Hub", cluster: "transport", subtopic: "start" },
      { url: "/property/", title: "Property Hub", cluster: "property", subtopic: "start" },
      { url: "/family/", title: "Family Hub", cluster: "family", subtopic: "start" },
      { url: "/how-a-second-child-changes-your-cash-buffer-plan-singapore.html", title: "How a Second Child Changes Your Cash-Buffer Plan in Singapore (2026): Why the Old Emergency-Fund Target Often Stops Being Enough", cluster: "family", subtopic: "planning" },
      { url: "/local-university-vs-overseas-university-cost-singapore.html", title: "Local University vs Overseas University Cost in Singapore (2026): The Prestige Decision That Should Start with Full Exposure", cluster: "family", subtopic: "education" },
      { url: "/polytechnic-vs-university-cost-singapore.html", title: "Polytechnic vs University Cost in Singapore (2026): The Tertiary Route Decision That Should Not Start with Prestige Alone", cluster: "family", subtopic: "education" },
      { url: "/save-for-university-vs-strengthen-your-own-retirement-first-singapore.html", title: "Save for University vs Strengthen Your Own Retirement First in Singapore (2026): Which Long-Horizon Family Obligation Deserves Priority?", cluster: "family", subtopic: "planning" },
      { url: "/school-fee-sinking-fund-vs-emergency-fund-singapore.html", title: "School-Fee Sinking Fund vs Emergency Fund in Singapore (2026): Stop Funding Predictable Education Bills from Your Shock Reserve", cluster: "family", subtopic: "planning" },
      { url: "/should-you-build-your-emergency-fund-before-having-a-baby-singapore.html", title: "Should You Build Your Emergency Fund Before Having a Baby in Singapore? (2026): The Reserve Question Most Couples Leave Too Late", cluster: "family", subtopic: "planning" },
      { url: "/student-care-vs-tuition-cost-singapore.html", title: "Student Care vs Tuition Cost in Singapore (2026): Solve the Supervision Problem or the Academic Problem First", cluster: "family", subtopic: "education" },
      { url: "/tuition-vs-enrichment-classes-cost-singapore.html", title: "Tuition vs Enrichment Classes Cost in Singapore (2026): The Academic Spend and Development Spend Families Should Stop Mixing", cluster: "family", subtopic: "education" },
            { url: "/protection/", title: "Protection Hub", cluster: "protection", subtopic: "start" },
      { url: "/investing/", title: "Investing Hub", cluster: "investing", subtopic: "start" },
      { url: "/calculators/", title: "Calculators Hub", cluster: "calculators", subtopic: "numbers" },
      { url: "/comparisons/", title: "Decision Comparisons Hub", cluster: "comparisons", subtopic: "decisions" }
    );

    // de-dupe by url (keep first). Also warn if we detect potential cannibalisation (same URL indexed twice).
    const seen = new Set();
    const dupes = new Set();
    const filtered = out.filter((x) => {
      if (!x || !x.url) return false;
      if (seen.has(x.url)) {
        dupes.add(x.url);
        return false;
      }
      seen.add(x.url);
      return true;
    });
    if (dupes.size && typeof console !== "undefined" && console.warn) {
      console.warn("[OG] Search index duplicates detected (deduped):", Array.from(dupes).slice(0, 20));
    }
    return filtered;
  }

  function tokens(s) {
    return String(s || "")
      .toLowerCase()
      .trim()
      .split(/[^a-z0-9]+/g)
      .filter(Boolean);
  }

  function scoreResult(q, item) {
    const qt = String(q || "").toLowerCase().trim();
    const title = String(item?.title || "").toLowerCase();
    const url = String(item?.url || "").toLowerCase();
    if (!qt) return 0;

    // base relevance on title
    let score = 0;
    if (title === qt) score += 100;
    if (title.startsWith(qt)) score += 60;
    if (title.includes(qt)) score += 35;

    // URL slug match (catches keyword mismatches between title and search term)
    if (url.includes(qt)) score += 20;

    // token overlap on title + URL
    const qTokens = tokens(qt);
    const tTokens = tokens(title);
    const uTokens = tokens(url.replace(/-/g, " "));
    const tSet = new Set(tTokens);
    const uSet = new Set(uTokens);
    let hit = 0;
    for (const t of qTokens) {
      if (tSet.has(t)) hit++;
      else if (uSet.has(t)) hit += 0.5;
    }
    score += hit * 10;

    // small boosts (only after a real match)
    if (score > 0) {
      if (item?.subtopic === "calculator") score += 6;
      if (item?.subtopic === "ownership") score += 3;
      // Boost pillar pages so they surface above mechanics pages for the same cluster
      const PILLARS = [
        "/car-ownership-cost.html", "/property-ownership-cost-singapore.html",
        "/car-vs-ride-hailing-cost.html", "/rent-vs-buy-property-singapore.html",
        "/how-much-does-it-cost-to-raise-a-child-singapore.html",
        "/how-much-life-insurance-do-you-need-singapore.html",
        "/how-much-emergency-fund-do-you-need-singapore.html",
        "/how-much-does-it-cost-to-raise-a-child-singapore.html",
        "/cost-of-having-a-baby-singapore.html"
      ];
      if (PILLARS.includes(item?.url)) score += 15;
      // Boost aging-parents sub-topic hub pages so broad searches surface decision-order pages
      if (item?.url && item.url.includes("how-supporting-aging-parents-changes-your-")) score += 12;
    }
    return score;
  }

  function prettyCluster(c) {
    if (!c) return "";
    return c.charAt(0).toUpperCase() + c.slice(1);
  }


  function initNavDropdownHover() {
    // Belt-and-suspenders hover support for the Topics dropdown.
    // CSS already handles :hover but adding JS mouseenter/mouseleave ensures
    // the menu stays open smoothly across the gap and works consistently.
    const navDrop = document.querySelector('.nav-dropdown');
    if (!navDrop) return;
    let closeTimer = null;

    navDrop.addEventListener('mouseenter', function() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      navDrop.classList.add('hover-open');
    });
    navDrop.addEventListener('mouseleave', function() {
      // Small delay so cursor can move to a menu item without it closing
      closeTimer = setTimeout(function() {
        navDrop.classList.remove('hover-open');
      }, 80);
    });
  }
  function initHeaderSearch() {
    const input = document.getElementById("og-site-search");
    const resultsEl = document.getElementById("og-site-search-results");
    const clearBtn = document.getElementById("og-site-search-clear");
    if (!input || !resultsEl) return;

    // Basic accessibility wiring (safe even if attributes already exist)
    try {
      resultsEl.setAttribute("role", "listbox");
      if (!resultsEl.getAttribute("aria-label")) resultsEl.setAttribute("aria-label", "Search results");
      input.setAttribute("aria-controls", resultsEl.id);
      if (!input.getAttribute("aria-expanded")) input.setAttribute("aria-expanded", "false");
      input.setAttribute("aria-autocomplete", "list");
    } catch { /* no-op */ }

    const INDEX = buildSearchIndex();
    let activeIndex = -1;
    let current = [];

    function close() {
      resultsEl.classList.remove("open");
      resultsEl.innerHTML = "";
      activeIndex = -1;
      current = [];
      updateClear();
      try { input.setAttribute("aria-expanded", "false"); } catch { /* no-op */ }
    }

    function open() {
      if (!resultsEl.classList.contains("open")) {
        resultsEl.classList.add("open");
      }
      updateClear();
      try { input.setAttribute("aria-expanded", "true"); } catch { /* no-op */ }
    }

    function updateClear() {
      if (!clearBtn) return;
      const has = String(input.value || "").length > 0;
      clearBtn.hidden = !has;
    }

    function setActive(i) {
      activeIndex = i;
      const links = Array.from(resultsEl.querySelectorAll("a[data-idx]"));
      links.forEach((a) => {
        a.classList.remove("active");
        a.setAttribute("aria-selected", "false");
      });
      if (activeIndex >= 0 && links[activeIndex]) {
        links[activeIndex].classList.add("active");
        links[activeIndex].setAttribute("aria-selected", "true");
        links[activeIndex].scrollIntoView({ block: "nearest" });
      }
    }

    function render(q, matches) {
      if (!q || q.trim().length < 2) {
        close();
        return;
      }

      current = matches;
      const head = `<div class="sr-head">Top matches for “${escapeHtml(q)}”${matches.length ? ` <span class="sr-count">(${matches.length})</span>` : ""}</div>`;
      if (!matches.length) {
        resultsEl.innerHTML = head + `<div class="sr-empty"><div class="sr-title">No results for \"${escapeHtml(q)}\"</div><div class="sr-meta">Try a broader term, or start from one of these:</div><div class="sr-suggestions" style="margin-top:8px;display:flex;flex-direction:column;gap:4px"><a href="/car-ownership-cost.html" style="font-size:13px">Car ownership cost →</a><a href="/property-ownership-cost-singapore.html" style="font-size:13px">Property ownership cost →</a><a href="/how-much-does-it-cost-to-raise-a-child-singapore.html" style="font-size:13px">Cost of raising a child →</a><a href="/how-much-life-insurance-do-you-need-singapore.html" style="font-size:13px">Life insurance sizing →</a><a href="/how-much-emergency-fund-do-you-need-singapore.html" style="font-size:13px">Emergency fund sizing →</a></div></div>`;
        open();
        setActive(-1);
        return;
      }

      const items = matches
        .map((m, idx) => {
          const clusterLabel = prettyCluster(m.cluster);
          const typeLabel = (function(){
            const st = String(m.subtopic || "").toLowerCase();
            if (st === "calculator") return "Calculator";
            if (st === "comparison") return "Comparison";
            if (st.includes("hub") || String(m.url||"").endsWith("/")) return "Hub";
            return "Guide";
          })();

          const badges = [
            clusterLabel ? `<span class="sr-badge" data-badge="cluster">${escapeHtml(clusterLabel)}</span>` : "",
            typeLabel ? `<span class="sr-badge" data-badge="type">${escapeHtml(typeLabel)}</span>` : ""
          ].filter(Boolean).join("");

          const metaText = [m.subtopic].filter(Boolean).join(" · ");
          return `
            <a href="${m.url}" data-idx="${idx}" role="option" aria-selected="false">
              <div class="sr-title">${highlightMatch(m.title, q)}</div>
              <div class="sr-meta">
                ${badges}
                ${metaText ? `<span class="sr-meta-text">${escapeHtml(metaText)}</span>` : ""}
              </div>
            </a>
          `;
        })
        .join("");

      resultsEl.innerHTML = head + items;
      open();
      setActive(0);
    }

    function run() {
      const q = String(input.value || "").trim();
      updateClear();
      if (q.length < 2) {
        close();
        return;
      }
      const scored = INDEX
        .map((it) => ({ it, s: scoreResult(q, it) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 8)
        .map((x) => x.it);
      render(q, scored);
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        input.focus();
        updateClear();
        close();
      });
    }

    input.addEventListener("input", run);
    input.addEventListener("focus", run);

    input.addEventListener("keydown", (e) => {
      if (!resultsEl.classList.contains("open")) return;
      const max = current.length;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!max) return;
        setActive((activeIndex + 1) % max);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!max) return;
        setActive((activeIndex - 1 + max) % max);
        return;
      }
      if (e.key === "Enter") {
        if (!max) return;
        e.preventDefault();
        const links = Array.from(resultsEl.querySelectorAll("a[data-idx]"));
        const a = links[activeIndex] || links[0];
        if (a && a.getAttribute("href")) location.href = a.getAttribute("href");
      }
    });

    resultsEl.addEventListener("mousemove", (e) => {
      const a = e.target?.closest?.("a[data-idx]");
      if (!a) return;
      const idx = parseInt(a.getAttribute("data-idx"), 10);
      if (!Number.isNaN(idx)) setActive(idx);
    });

    
    // Keyboard shortcuts: Cmd/Ctrl+K or / to focus search (unless typing in an input/textarea)
    document.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
      const typing = tag === "input" || tag === "textarea" || (e.target && e.target.isContentEditable);
      const metaK = (e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K");
      const slash = e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey;
      if ((metaK || slash) && !typing) {
        e.preventDefault();
        input.focus();
        input.select();
        run();
      }
    });
    document.addEventListener("click", (e) => {
      const within = e.target?.closest?.(".site-search");
      if (!within) close();
    });
  }

  // Supports both:
  // <meta name="og:cluster" ...>
  // <meta property="og:cluster" ...>
  function getMetaAny(key) {
    const byName = document.querySelector(`meta[name="${key}"]`);
    if (byName) return (byName.getAttribute("content") || "").trim();

    const byProp = document.querySelector(`meta[property="${key}"]`);
    if (byProp) return (byProp.getAttribute("content") || "").trim();

    return "";
  }


  // Prefer the "main" content container (avoid header/footer containers).
  function getMainContainer() {
    // Common layout: #site-header then .container for page content
    const direct = document.querySelector("#site-header + .container");
    if (direct) return direct;

    const containers = Array.from(document.querySelectorAll(".container"));
    if (!containers.length) return null;

    // Prefer a container not nested inside header/footer includes
    for (const c of containers) {
      if (c.closest("#site-header") || c.closest("#site-footer")) continue;
      return c;
    }
    // Fallback: last container in DOM
    return containers[containers.length - 1];
  }

  function metaIsTrue(key) {
    const v = (getMetaAny(key) || "").toLowerCase();
    return v === "true" || v === "1" || v === "yes";
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function highlightMatch(title, q) {
    const text = String(title || "");
    const query = String(q || "").trim();
    if (!text || !query) return escapeHtml(text);
    const i = text.toLowerCase().indexOf(query.toLowerCase());
    if (i < 0) return escapeHtml(text);
    const before = text.slice(0, i);
    const mid = text.slice(i, i + query.length);
    const after = text.slice(i + query.length);
    return `${escapeHtml(before)}<mark>${escapeHtml(mid)}</mark>${escapeHtml(after)}`;
  }

  function injectBackToHomeLink() {
    if (!SETTINGS.enableAutoBackToHome) return;

    const selfPath = getSelfPath();
    const canonPath = getCanonicalPath();
    const path = canonPath || selfPath;

    // Skip home and 404
    const skip = new Set([normalizePath("/"), normalizePath("/index.html"), normalizePath("/404.html")]);
    if (skip.has(normalizePath(path))) return;

    const container = getMainContainer();
    if (!container) return;

    // If a page explicitly opts out, do nothing:
    // <meta name="og:noback" content="true">
    if (metaIsTrue("og:noback")) return;

    // Avoid double insert if author already placed it
    const existing = Array.from(container.querySelectorAll('a[href="/"]'))
      .find(a => /back to ownership guide/i.test((a.textContent || "").trim()));
    if (existing) return;

    // Insert at the top of the container (below header)
    const wrapper = document.createElement("div");
    wrapper.innerHTML = SETTINGS.backToHomeHtml;
    const node = wrapper.firstElementChild;
    if (!node) return;

    container.prepend(node);
  }

  function ensureCanonicalAndOgUrl() {
    const base = String(SETTINGS.siteBaseUrl || "").replace(/\/$/, "");
    if (!base) return;

    const head = document.head || document.getElementsByTagName("head")[0];
    if (!head) return;

    const canonPath = getCanonicalPath() || getSelfPath() || "/";
    const canonicalUrl = base + canonPath;

    // <link rel="canonical" href="...">
    const existingCanon = head.querySelector('link[rel="canonical"]');
    if (!existingCanon) {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", canonicalUrl);
      head.appendChild(link);
    }

    // <meta property="og:url" content="...">
    const existingOg = head.querySelector('meta[property="og:url"], meta[name="og:url"]');
    if (!existingOg) {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:url");
      meta.setAttribute("content", canonicalUrl);
      head.appendChild(meta);
    }

    // Lightweight Twitter card defaults (safe even without images)
    const existingTw = head.querySelector('meta[name="twitter:card"]');
    if (!existingTw) {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "twitter:card");
      meta.setAttribute("content", "summary");
      head.appendChild(meta);
    }
  }

  
  function injectBackToClusterLink() {
    if (!SETTINGS.enableAutoBackToCluster) return;

    // Allow per-page opt-out:
    // <meta name="og:nobackcluster" content="true">
    if (metaIsTrue("og:nobackcluster")) return;

    const cluster = (getMetaAny("og:cluster") || "").toLowerCase();
    if (!cluster) return;

    const def = SETTINGS.backToClusterByCluster && SETTINGS.backToClusterByCluster[cluster];
    if (!def || !def.href || !def.text) return;

    const selfPath = getSelfPath();
    const canonPath = getCanonicalPath();
    const path = canonPath || selfPath;

    // Skip if you're already on the cluster hub
    if (normalizePath(path) === normalizePath(def.href)) return;

    const container = getMainContainer();
    if (!container) return;

    // Avoid double insert if author already placed it
    const existing = Array.from(container.querySelectorAll(`a[href="${def.href}"]`))
      .find(a => /back to/i.test((a.textContent || "").trim()));
    if (existing) return;

    const html = `<p class="nav"><a href="${def.href}">${escapeHtml(def.text)}</a></p>`;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    const node = wrapper.firstElementChild;
    if (!node) return;

    // Prefer inserting after the Back-to-Home link if it exists, otherwise prepend
    const backHome = Array.from(container.querySelectorAll('a[href="/"]'))
      .find(a => /back to ownership guide/i.test((a.textContent || "").trim()));

    if (backHome) {
      const p = backHome.closest("p");
      if (p && p.parentElement === container) {
        p.insertAdjacentElement("afterend", node);
      } else {
        backHome.insertAdjacentElement("afterend", node);
      }
    } else {
      container.prepend(node);
    }
  }

function buildRelatedHTML(label, links) {
    const lis = links
      .map((l) => `<li><a href="${l.url}">${escapeHtml(l.title)}</a></li>`)
      .join("");
    return `
      <div class="related-box">
        <h3>${escapeHtml(label)}</h3>
        <ul>${lis}</ul>
      </div>
    `;
  }

  async function inject(id, urlOrUrls) {
  // Back-compat: some pages still use older placeholder ids
  let el = document.getElementById(id);
  if (!el) {
    if (id === "site-header") el = document.getElementById("header-placeholder");
    if (id === "site-footer") el = document.getElementById("footer-placeholder");
  }
  if (!el) {
    console.warn("Include skipped: missing placeholder", id);
    return;
  }

  const urls = Array.isArray(urlOrUrls) ? urlOrUrls : [urlOrUrls];
  let lastErr = null;

  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      // Basic sanity: don't inject empty
      if (!html || !html.trim()) throw new Error("Empty response");
      el.innerHTML = html;
      return;
    } catch (e) {
      lastErr = e;
    }
  }

  console.warn("Include failed:", id, urls, lastErr);
}

  function addScriptToHead({ src, async = true, attrs = {} }) {
    const s = document.createElement("script");
    if (src) s.src = src;
    s.async = async;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    document.head.appendChild(s);
  }

  function setActiveNav() {
    const path = (location.pathname || "/").toLowerCase();
    const pathN = normalizePath(path);

    // Pages that belong to the Financing cluster but are not under /financing/
    // Keep this list short and intent-based.
    const FINANCING_SLUG_HINTS = [
      "fixed-vs-floating-home-loan",
      "refinance-vs-reprice-home-loan",
      "hdb-loan-vs-bank-loan",
      "pay-down-mortgage-vs-invest",
      "mortgage",
      "home-loan",
      "tdsr",
      "msr"
    ];
    const looksLikeFinancingPage = FINANCING_SLUG_HINTS.some((s) => pathN.includes(s));

    // Prefer meta-based nav if available, because it avoids heuristic drift
    if (SETTINGS.preferMetaForNav) {
      const cluster = (getMetaAny("og:cluster") || "").toLowerCase();
      const subtopic = (getMetaAny("og:subtopic") || "").toLowerCase();

      const activate = (key) => {
        const a = document.querySelector(`[data-nav="${key}"]`);
        if (a) a.classList.add("active");
      };

      if (path.startsWith("/start-here")) {
        activate("start");
        return;
      }

      if (path.startsWith("/comparisons")) {
        activate("comparisons");
        return;
      }

      if (path.startsWith("/financing")) {
        activate("financing");
        return;
      }

      if (subtopic === "calculator" || path.includes("calculator")) {
        activate("calculators");
        return;
      }

      if (cluster === "transport") {
        activate("transport");
        return;
      }

      if (cluster === "property") {
        activate("property");
        return;
      }

      if (cluster === "family") {
        activate("family");
        return;
      }

      if (cluster === "protection") {
        activate("protection");
        return;
      }

      if (cluster === "financing") {
        activate("financing");
        return;
      }

      // Meta can be missing on older pages; fall back to URL hints for financing.
      if (looksLikeFinancingPage) {
        activate("financing");
        return;
      }

      activate("home");
      return;
    }

    // Fallback heuristics (kept, but meta is safer)
    const isCalculator =
      path.startsWith("/calculator") ||
      path.includes("calculator");

    const isFinancing = path.startsWith("/financing");

    const isStart = path.startsWith("/start-here");

    const isComparisons = path.startsWith("/comparisons");

    const isTransport =
      path.startsWith("/transport") ||
      path.includes("car-") ||
      path.includes("coe") ||
      path.includes("monthly-cost-of-owning-a-car") ||
      path.includes("ride-hailing") ||
      path.includes("leasing") ||
      path.includes("insurance");

    const isProperty =
      path.startsWith("/property") ||
      path.includes("rental-property") ||
      path.includes("condo-") ||
      path.includes("bto-") ||
      path.includes("resale");

    const isFamily =
      path.startsWith("/family") ||
      path.includes("baby") ||
      path.includes("childcare") ||
      path.includes("raise-a-child") ||
      path.includes("primary-school") ||
      path.includes("second-child") ||
      path.includes("student-care");

    const isProtection =
      path.startsWith("/protection") ||
      path.includes("life-insurance") ||
      path.includes("whole-life") ||
      path.includes("hospitalisation-insurance") ||
      path.includes("home-protection-scheme") ||
      path.includes("rider-cost");

    const activate = (key) => {
      const a = document.querySelector(`[data-nav="${key}"]`);
      if (a) a.classList.add("active");
    };

    if (isStart) activate("start");
    else if (isComparisons) activate("comparisons");
    else if (isFinancing || looksLikeFinancingPage) activate("financing");
    else if (isCalculator) activate("calculators");
    else if (isTransport) activate("transport");
    else if (isProperty) activate("property");
    else if (isFamily) activate("family");
    else if (isProtection) activate("protection");
    else activate("home");
  }

  function isHubPage(subtopic, selfPath) {
    // Treat directory pages as hubs even if meta is missing
    const looksLikeDir = selfPath.endsWith("/") && selfPath !== "/";
    return subtopic === "hub" || looksLikeDir;
  }

  function pickRelatedLinks({ bucket, cluster, subtopic, selfPath, isHub }) {
    const all = dedupeByUrl(bucket.pages || []);
    const pillars = dedupeByUrl(bucket.pillars || []);
    const bridges = dedupeByUrl(bucket.bridges || []);

    // normalize everything once for accurate self-exclusion + de-dupe
    const selfN = normalizePath(selfPath);

    const sameSubtopic = (!isHub && subtopic)
      ? all.filter((p) => p.subtopic === subtopic && normalizePath(p.url) !== selfN)
      : [];

    function byUrl(url) {
      const n = normalizePath(url);
      return (bucket.pages || []).find((x) => normalizePath(x.url) === n)
        || (bucket.pillars || []).find((x) => normalizePath(x.url) === n)
        || (bucket.bridges || []).find((x) => normalizePath(x.url) === n)
        || null;
    }

    function primaryPillarLink() {
      const pUrl = SETTINGS.primaryPillarByCluster?.[cluster] || "";
      if (!pUrl) return null;
      const p = byUrl(pUrl);
      if (!p) return null;
      if (normalizePath(p.url) === selfN) return null;
      return { url: p.url, title: p.title };
    }

    function pickCalculatorLink() {
      // Transport: reinforce calculators on non-calculator pages
      if (cluster === "transport") {
        if ((subtopic || "").toLowerCase() === "calculator") return null;
        const wantRide = (subtopic || "").toLowerCase() === "ridehailing";
        const calcUrl = wantRide
          ? "/car-vs-ride-hailing-calculator.html"
          : "/car-affordability-calculator-singapore.html";
        const c = byUrl(calcUrl);
        if (!c) return null;
        if (normalizePath(c.url) === selfN) return null;
        return { url: c.url, title: c.title };
      }

      // Property: reinforce the affordability stress test on non-calculator pages
      if (cluster === "property") {
        if ((subtopic || "").toLowerCase() === "calculator") return null;
        const calcUrl = "/property-affordability-calculator-singapore.html";
        const c = byUrl(calcUrl);
        if (!c) return null;
        if (normalizePath(c.url) === selfN) return null;
        return { url: c.url, title: c.title };
      }

      return null;
    }


    // Always include the primary pillar first (excluding self)
    let chosen = [];
    const primary = primaryPillarLink();
    if (primary) chosen.push(primary);

    // Then include remaining pillars (excluding self + excluding primary)
    const remainingPillars = pillars
      .filter((p) => normalizePath(p.url) !== selfN)
      .filter((p) => !primary || normalizePath(p.url) !== normalizePath(primary.url));
    chosen = chosen.concat(
      remainingPillars.slice(
        0,
        Math.max(0, SETTINGS.relatedPillarsCount - (primary ? 1 : 0))
      )
    );

    // Then include same-subtopic links
    chosen = chosen.concat(sameSubtopic.slice(0, SETTINGS.relatedSameSubtopicCount));

    // Ensure at least 1 calculator anchor appears for transport (when relevant)
    const calc = pickCalculatorLink();
    if (calc) chosen.push(calc);

    // Add bridges last
    chosen = chosen.concat(bridges.slice(0, SETTINGS.relatedBridgeCount));

    // Final dedupe + cap
    chosen = uniqByUrl(chosen).slice(0, SETTINGS.relatedMaxLinks);

    // Extra guard: never show an empty module
    return chosen;
  }

  function injectCalculatorCTA() {
    if (!SETTINGS.enableAutoCalculatorCTA) return;

    // Anchor all inserts inside the same main content container used by back-links & titles.
    const main = getMainContainer() || document.querySelector("main.container") || document.querySelector("main");
    if (!main) return;

    // Avoid double-inserting
    if (document.getElementById(SETTINGS.calculatorCtaId)) return;

    const cluster = (getMetaAny("og:cluster") || "").toLowerCase();
    const subtopic = (getMetaAny("og:subtopic") || "").toLowerCase();
    if (cluster !== "transport") return;
    if (subtopic === "calculator") return;

    const wantRide = subtopic === "ridehailing";
    const url = wantRide
      ? "/car-vs-ride-hailing-calculator.html"
      : "/car-affordability-calculator-singapore.html";
    const title = wantRide
      ? "Run the Car vs Ride-Hailing Break-Even Calculator"
      : "Run the Car Affordability Stress Test Calculator";
    const desc = wantRide
      ? "Enter your monthly ride-hailing spend and see your personal break-even point versus ownership."
      : "Stress-test your true monthly car cost (not just instalment) and see if it fits your income.";

    const box = document.createElement("div");
    box.className = "cta-box";
    box.id = SETTINGS.calculatorCtaId;
    box.innerHTML = `
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(desc)}</p>
      <p><a class="cta-button" href="${url}">Open calculator →</a></p>
    `;
    // Prefer inserting near the end of the article (but before References / Last updated),
    // so the CTA doesn't appear above the page title or back-links.
    const findHeadingByText = (tagNames, rx) => {
      const els = Array.from(main.querySelectorAll(tagNames.join(",")));
      for (const el of els) {
        const t = (el.textContent || "").trim();
        if (rx.test(t)) return el;
      }
      return null;
    };

    const insertBeforeEl =
      // 1) Before "References" (keeps References as last substantive section)
      findHeadingByText(["h2","h3"], /^References(\s*&\s*updates)?$/i)
      // 2) Otherwise, before the LAST standalone "Last updated" marker (so last updated stays last)
      || (() => {
        const candidates = Array.from(main.querySelectorAll("p,div,section"))
          .filter(el => /^\s*Last\s+updated\s*:/i.test((el.textContent || "").trim()));
        return candidates.length ? candidates[candidates.length - 1] : null;
      })();

    if (insertBeforeEl) {
      insertBeforeEl.insertAdjacentElement("beforebegin", box);
    } else {
      // Safe fallback: append to end of main content (never above title)
      main.appendChild(box);
    }
  }

  function injectPropertyCTA() {
    if (!SETTINGS.enableAutoPropertyCTA) return;

    const host = document.getElementById(SETTINGS.relatedContainerId)
      || main.querySelector(".related-box")
      || main.querySelector("[data-related]")
      || main.querySelector("section.related")
      || main.querySelector(".og-related");

    // If the page uses an older template without the expected related container,
    // fall back to inserting near the end of the main content.
    const fallbackHost = host || main;

    // Avoid double-inserting
    if (document.getElementById(SETTINGS.propertyCtaId)) return;

    const cluster = (getMetaAny("og:cluster") || "").toLowerCase();
    const subtopic = (getMetaAny("og:subtopic") || "").toLowerCase();
    if (cluster !== "property") return;
    if (subtopic === "calculator") return;

    const url = "/property-affordability-calculator-singapore.html";
    const title = "Run the Property Affordability Stress Test";
    const desc = "Model borrowing limits (TDSR/MSR), instalment sensitivity, and upfront cash exposure in one place.";

    const box = document.createElement("div");
    box.className = "cta-box";
    box.id = SETTINGS.propertyCtaId;
    box.innerHTML = `
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(desc)}</p>
      <p><a class="cta-button" href="${url}">Open calculator →</a></p>
      <p class="muted" style="margin-top:10px;">
        Key mechanics: <a href="/cpf-accrued-interest-singapore.html">CPF accrued interest</a> ·
        <a href="/sell-property-cost-singapore.html">Selling costs</a>
      </p>
    `;

    if (host) {
      host.insertAdjacentElement("beforebegin", box);
    } else {
      // Append at the end of main content as a safe fallback.
      fallbackHost.appendChild(box);
    }
  }

  function injectDecisionPathModule() {
    if (!SETTINGS.enableDecisionPathModule) return;

    // Anchor ALL decision-path logic to the same main container used for article content.
    const main = (typeof getMainContainer === "function" ? getMainContainer() : null)
      || document.querySelector("main.container")
      || document.querySelector("main");
    if (!main) return;

    const host = main.querySelector("#" + SETTINGS.relatedContainerId)
      || main.querySelector(".related-box")
      || main.querySelector("[data-related]")
      || main.querySelector("section.related")
      || main.querySelector(".og-related");

    // If the page uses an older template without the expected related container,
    // fall back to inserting near the end of the main content.
    const fallbackHost = host || document.querySelector("main") || document.querySelector(".container") || document.body;

    // Avoid double-inserting
    if (document.getElementById(SETTINGS.decisionPathModuleId)) return;

    const cluster = (getMetaAny("og:cluster") || "").toLowerCase();
    const subtopic = (getMetaAny("og:subtopic") || "").toLowerCase();
    if (!cluster) return;

    // Keep this module for "pillar/explainer" articles only
    if (subtopic === "calculator" || subtopic === "comparison") return;

    const rawPath = (location.pathname || "/");
    const norm = (s) => (s || "/")
      .trim()
      .replace(/\/+$/, "")
      .replace(/\.html$/i, "");
    const pathN = norm(rawPath);

// Do not inject on comparison pages (they already have their own next-step modules)
const isComparisonPage = (() => {
  try {
    if (rawPath.startsWith("/comparisons")) return true;
    const metaEl = document.querySelector(".meta");
    if (metaEl && /decision\s+comparison/i.test(metaEl.textContent || "")) return true;

    // Check against configured comparison URLs
    const urls = [];
    const walk = (node) => {
      if (!node) return;
      if (Array.isArray(node)) { node.forEach(walk); return; }
      if (typeof node === "object") {
        if (typeof node.url === "string") urls.push(node.url);
        for (const k in node) walk(node[k]);
      }
    };
    if (SETTINGS.comparisons) walk(SETTINGS.comparisons);
    const cmpSet = new Set(urls.map(u => norm(u)));
    return cmpSet.has(pathN);
  } catch (e) {
    return false;
  }
})();
if (isComparisonPage) return;

    const allowList = (SETTINGS.decisionPathAllowPaths || []);
    const canonicalHref = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || "";
    let canonicalPathN = "";
    try { canonicalPathN = norm(new URL(canonicalHref, location.origin).pathname); } catch(e) { canonicalPathN = ""; }

    const allow = allowList.length === 0 || allowList.some(p => {
      const pn = norm(p);
      return pn === pathN || (canonicalPathN && pn === canonicalPathN);
    });

    // Failsafe: if page has a real cluster tag and an H1, we still inject even if allowList misses this path.
    // (Prevents silent disappearance when URL rewrites differ.)
    const hasH1 = !!main.querySelector("h1");
    if (!allow && !hasH1) return;

    
const override = (SETTINGS.decisionPathOverrides || {})[pathN] || null;

const _hubByCluster = {
  family:     { url: "/family/",     label: "Explore the Family hub",      meta: "Baby costs, childcare, education, and long-horizon planning" },
  protection: { url: "/protection/", label: "Explore the Protection hub",  meta: "Life insurance, CI, disability income, and hospitalisation cover" },
  investing:  { url: "/investing/",  label: "Explore the Investing hub",   meta: "Emergency fund sizing, storage, and sequencing" },
};
const _hasCalc = (cluster === "transport" || cluster === "property");
const _hubInfo = _hubByCluster[cluster] || null;

const _calcByCluster = {
  transport:  { primary: { url: "/car-affordability-calculator-singapore.html",      title: "Car affordability stress test" },
                secondary: { url: "/car-vs-ride-hailing-calculator.html",              title: "Car vs ride-hailing break-even" } },
  property:   { primary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
                secondary: { url: "/mortgage-interest-cost-singapore.html",           title: "Mortgage interest cost model" } },
  family:     { primary: { url: "/car-vs-ride-hailing-calculator.html",              title: "Car vs ride-hailing break-even" },
                secondary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" } },
  protection: { primary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
                secondary: { url: "/car-affordability-calculator-singapore.html",     title: "Car affordability stress test" } },
  investing:  { primary: { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" },
                secondary: { url: "/car-affordability-calculator-singapore.html",     title: "Car affordability stress test" } },
};
const _calcDefaults = _calcByCluster[cluster] || _calcByCluster["transport"];

const runPrimary = (override && override.runPrimary)
  ? override.runPrimary
  : _calcDefaults.primary;

const runSecondary = (override && override.runSecondary)
  ? override.runSecondary
  : _calcDefaults.secondary;

const preset = (typeof FINANCING_LOOP_PRESETS !== "undefined") ? (FINANCING_LOOP_PRESETS[pathN] || null) : null;

const compareCfg = (preset && preset.compare) ? preset.compare : null;
const financingDefault = (() => {
  const p = pathN;
  const isProp = (cluster === "property");
  const isTrans = (cluster === "transport");
  if (isProp && /(tdsr|msr|mortgage|home-loan|refinance|bsd|absd|cpf|interest-cost|sell-property|property-ownership)/.test(p)) {
    return { href: "/property/financing/", label: "Property financing", meta: "Loans, limits, and cashflow" };
  }
  if (isTrans && /(car-loan|balloon-loan|leasing|loan-vs-cash)/.test(p)) {
    return { href: "/transport/financing/", label: "Transport financing", meta: "Loan structure & fragility" };
  }
  return null;
})();

const compareHref = compareCfg ? compareCfg.href : (financingDefault ? financingDefault.href : "/comparisons/");
const compareLabel = compareCfg ? compareCfg.label : (financingDefault ? financingDefault.label : "Decision comparisons");
const compareMeta = compareCfg ? compareCfg.meta : (financingDefault ? financingDefault.meta : "Choose the right model");

const relatedLinks = (preset && Array.isArray(preset.related)) ? preset.related : null;
const relatedLabel = (preset && preset.relatedLabel) ? preset.relatedLabel : (financingDefault ? (financingDefault.href.includes("/transport/") ? "Related (transport financing)" : "Related (property financing)") : "Related");
const relatedHtml = (relatedLinks && relatedLinks.length)
  ? `<div class="og-nextsteps-related">
        <div class="muted og-nextsteps-related-label">${escapeHtml(relatedLabel)}</div>
        <div class="og-nextsteps-related-links">
          ${relatedLinks.map((l, i) => `${i ? '<span class="muted"> · </span>' : ''}<a href="${l.href}">${escapeHtml(l.label)}</a>`).join('')}
        </div>
      </div>`
  : "";


const box = document.createElement("section");
    box.className = "og-section";
    box.id = SETTINGS.decisionPathModuleId;

    box.innerHTML = `
      <h2>Next steps</h2>
      <p class="muted" style="margin-top:-8px;">Use the decision path: choose the right model → run the numbers → learn the mechanics.</p>

      <div class="og-card-grid three og-nextsteps-grid" style="margin-top:14px;">
        <a class="og-card og-next-card" href="/start-here/">
          <div class="og-card-title"><span class="og-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.5 9.5l-2 6-6 2 2-6 6-2z"/></svg></span><span>Start here (10 min)</span></div>
          <div class="og-card-meta">Recommended path</div>
        </a>

        <a class="og-card og-next-card" href="${compareHref}">
          <div class="og-card-title"><span class="og-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M6 7h12"/><path d="M7 7l-4 7h8l-4-7z"/><path d="M21 14h-8l4-7 4 7z"/><path d="M6 21h12"/></svg></span><span>${escapeHtml(compareLabel)}</span></div>
          <div class="og-card-meta">${escapeHtml(compareMeta)}</div>
        </a>

        <div class="og-card og-next-card">
          <div class="og-card-title"><span class="og-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M8 7h8"/><path d="M9 11h1"/><path d="M13 11h1"/><path d="M9 14h1"/><path d="M13 14h1"/><path d="M9 17h1"/><path d="M13 17h1"/></svg></span><span>Run the numbers</span></div>
          ${_hasCalc ? `<div class="og-card-meta">Use a calculator (2 min)</div>
          <a class="og-btn og-primary" href="${runPrimary.url}">Open: ${escapeHtml(runPrimary.title)} → <span class="og-pill">Recommended</span></a>
          <div class="og-card-links">
            <a href="${runSecondary.url}">${escapeHtml(runSecondary.title)}</a>
            <span class="muted"> · </span>
            <a href="/calculators/">All calculators</a>
          </div>` : (_hubInfo ? `<div class="og-card-meta">${_hubInfo.meta}</div>
          <a class="og-btn og-primary" href="${_hubInfo.url}">${escapeHtml(_hubInfo.label)} → <span class="og-pill">Recommended</span></a>
          <div class="og-card-links"><a href="/calculators/">Browse all calculators</a></div>` : "")}
        </div>
      </div>
      
      ${relatedHtml}
      <hr style="margin-top:22px;">

`;


    // Prefer inserting near the end of the article (but before References / Last updated),
    // so the module doesn't appear above the page title or back-links.
    // main already resolved above

    const findHeadingByText = (tagNames, rx) => {
      const root = main;
      const els = Array.from(root.querySelectorAll(tagNames.join(",")));
      for (const el of els) {
        const t = (el.textContent || "").trim();
        if (rx.test(t)) return el;
      }
      return null;
    };

    // 1) Prefer inserting before a real "References" heading.
    //    Covers: <h2>References</h2>, <h2>References & updates</h2>, and inline strong labels like "References (where applicable):"
    const referencesAnchor =
      findHeadingByText(["h2","h3"], /^References(\s*&\s*updates)?$/i)
      || (() => {
        const root = main;
        const strongs = Array.from(root.querySelectorAll("strong"));
        for (const st of strongs) {
          const t = (st.textContent || "").trim();
          if (/^References\b/i.test(t)) return st.closest("p,div,section") || st;
        }
        return null;
      })();

    // 2) Otherwise, insert before the *last* standalone "Last updated" marker (so it stays last).
    const lastUpdatedAnchor = (() => {
      // Prefer the true bottom marker, not inline/meta mentions.
      const candidates = Array.from(main.querySelectorAll("p,div,section"))
        .filter(el => {
          if (el.classList && el.classList.contains("meta")) return false;
          const t = (el.textContent || "").trim();
          // Match either the strong marker or line-start marker.
          const hasStrong = !!(el.querySelector && el.querySelector("strong") && /last\s+updated\s*:/i.test(el.querySelector("strong").textContent || ""));
          const hasLine = /^last\s+updated\s*:/i.test(t);
          return hasStrong || hasLine;
        });
      return candidates.length ? candidates[candidates.length - 1] : null;
    })();

    const insertBeforeEl = referencesAnchor || lastUpdatedAnchor;

    if (insertBeforeEl) {
      insertBeforeEl.insertAdjacentElement("beforebegin", box);
    } else {
      // Append at the end of main content as a safe fallback.
      main.appendChild(box);
    }
  }





  // =========================
  // 3) HEADER / FOOTER
  // =========================
  // EMAIL CAPTURE (no 3rd party)
  // Reads SETTINGS.emailCaptureUrl — set this to your Google Apps Script web app URL
  // Pages opted in via: <meta name="og:email-capture" content="true">
  // =========================
  function injectEmailCapture() {
    if (!SETTINGS.emailCaptureUrl) return;
    
    // Only inject on pages that opt in OR on calculator pages
    var meta = getMetaAny('og:email-capture');
    var isCalc = (location.pathname || '').includes('calculator');
    if (meta !== 'true' && !isCalc) return;
    
    // Don't show if already dismissed (sessionStorage)
    try { if (sessionStorage.getItem('og-email-dismissed') === '1') return; } catch(e) {}
    
    var container = getMainContainer();
    if (!container) return;
    
    var box = document.createElement('div');
    box.id = 'og-email-capture';
    box.className = 'box';
    box.style.cssText = 'margin:24px 0;border-left:3px solid #1d4ed8;';
    box.innerHTML = [
      '<p style="margin:0 0 4px;font-weight:600;font-size:15px;color:#111827">Get notified when rules change</p>',
      '<p style="margin:0 0 14px;font-size:14px;color:var(--muted);line-height:1.5">COE thresholds, property cooling measures, CPF rule updates — one email when something material changes. No spam.</p>',
      '<div id="og-email-form" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">',
      '<input type="email" id="og-email-input" placeholder="your@email.com" style="flex:1;min-width:180px;padding:9px 12px;border:1px solid var(--border);border-radius:10px;font-size:14px;background:#fff;color:var(--text)">',
      '<button type="button" id="og-email-submit" class="btn btn-primary" style="padding:9px 18px;font-size:14px;white-space:nowrap">Notify me</button>',
      '<button type="button" id="og-email-dismiss" style="padding:9px 10px;background:none;border:none;font-size:13px;color:var(--muted);cursor:pointer;text-decoration:underline">No thanks</button>',
      '</div>',
      '<p id="og-email-msg" style="margin:10px 0 0;font-size:13px;display:none"></p>'
    ].join('');
    
    // Insert before auto-related or References
    var ar = container.querySelector('#auto-related');
    if (ar) { ar.parentNode.insertBefore(box, ar); }
    else { container.appendChild(box); }
    
    document.getElementById('og-email-submit').addEventListener('click', function() {
      var email = document.getElementById('og-email-input').value.trim();
      var msg = document.getElementById('og-email-msg');
      if (!email || !email.includes('@')) {
        msg.style.display = 'block';
        msg.style.color = '#dc2626';
        msg.textContent = 'Please enter a valid email address.';
        return;
      }
      this.disabled = true;
      this.textContent = 'Sending...';
      fetch(SETTINGS.emailCaptureUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email: email, page: location.pathname, source: 'ownership-guide' }).toString()
      })
      .then(function() {
        document.getElementById('og-email-form').style.display = 'none';
        msg.style.display = 'block';
        msg.style.color = '#059669';
        msg.textContent = "Done — you'll hear from us when something meaningful changes.";
        try { sessionStorage.setItem('og-email-dismissed', '1'); } catch(e) {}
      })
      .catch(function() {
        msg.style.display = 'block';
        msg.style.color = '#dc2626';
        msg.textContent = 'Something went wrong — please try again.';
        document.getElementById('og-email-submit').disabled = false;
        document.getElementById('og-email-submit').textContent = 'Notify me';
      });
    });
    
    document.getElementById('og-email-dismiss').addEventListener('click', function() {
      box.style.display = 'none';
      try { sessionStorage.setItem('og-email-dismissed', '1'); } catch(e) {}
    });
  }

  // =========================
  if (SETTINGS.enableHeaderFooter) {
    await inject("site-header", ["/header.html", "header.html", "/ownershipguide-main/header.html"]);
    await inject("site-footer", ["/footer.html", "footer.html", "/ownershipguide-main/footer.html"]);
    setActiveNav();
    initHeaderSearch();
    initNavDropdownHover();
    injectBackToHomeLink();
    injectEmailCapture();
    injectBackToClusterLink();
    ensureCanonicalAndOgUrl();
  }

    // Ensure back-to-home (and back-to-cluster) links exist even if header/footer is disabled
  injectBackToHomeLink();
  injectBackToClusterLink();
  ensureCanonicalAndOgUrl();

// =========================
  // 4) ANNOUNCEMENT (optional)
  // =========================
  if (SETTINGS.enableAnnouncement) {
    const bar = document.createElement("div");
    bar.className = "announcement";
    bar.innerHTML = SETTINGS.announcementHtml;
    const container = getMainContainer();
    if (container) container.prepend(bar);
    else document.body.prepend(bar);
  }



  // =========================
  // 4.9) BreadcrumbList JSON-LD (auto, based on nav.breadcrumbs)
  // =========================
  function injectBreadcrumbSchema() {
    try {
      // If the page already has BreadcrumbList schema, don't add another.
      const existing = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .some(s => (s.textContent || '').includes('"BreadcrumbList"'));
      if (existing) return;

      const bc = document.querySelector('nav.breadcrumbs');
      if (!bc) return;

      const links = Array.from(bc.querySelectorAll('a'))
        .map(a => ({
          name: (a.textContent || '').trim(),
          url: new URL(a.getAttribute('href') || '/', window.location.origin).href
        }))
        .filter(x => x.name && x.url);

      const h1 = document.querySelector('h1');
      const currentName = (h1 ? (h1.textContent || '').trim() : '').replace(/\s+/g, ' ');
      const currentUrl = window.location.href.split('#')[0];

      if (links.length === 0 || !currentName) return;

      const itemListElement = [];
      links.forEach((x, i) => {
        itemListElement.push({
          '@type': 'ListItem',
          position: i + 1,
          name: x.name,
          item: x.url
        });
      });
      itemListElement.push({
        '@type': 'ListItem',
        position: links.length + 1,
        name: currentName,
        item: currentUrl
      });

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    } catch (e) {
      // Fail silently; breadcrumbs are non-critical.
    }
  }

  

  // =========================
  // 4.95) Organization JSON-LD (site-wide trust signal)
  // =========================
  function injectOrganizationSchema() {
    try {
      const existing = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .some(s => {
          const t = (s.textContent || '').replace(/\s+/g, '');
          return t.includes('"@type":"Organization"');
        });
      if (existing) return;

      const org = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ownership Guide",
        "url": (SETTINGS.siteBaseUrl || (window.location.origin + "/")),
        "description": "Independent, model-driven breakdowns of ownership costs in Singapore — transport, property, and financing decision models.",
        "sameAs": []
      };

      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(org);
      document.head.appendChild(s);
    } catch (e) {
      // no-op
    }
  }

// =========================
// 4.96) WebSite JSON-LD (site-wide trust signal)
// =========================
function injectWebSiteSchema() {
  try {
    const existing = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
      .some(s => {
        const t = (s.textContent || '').replace(/\s+/g, '');
        return t.includes('"@type":"WebSite"');
      });
    if (existing) return;

    const base = String(SETTINGS.siteBaseUrl || (window.location.origin + "/")).replace(/\/$/, "");
    const site = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Ownership Guide",
      "url": base + "/",
      "publisher": {
        "@type": "Organization",
        "name": "Ownership Guide",
        "url": base + "/"
      }
    };

    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(site);
    document.head.appendChild(s);
  } catch (e) {
    // no-op
  }
}

// =========================
  // 5) GA4 (optional)
  // =========================
  if (
    SETTINGS.enableGA4 &&
    SETTINGS.ga4MeasurementId &&
    !SETTINGS.ga4MeasurementId.includes("XXXX")
  ) {
    addScriptToHead({
      src:
        "https://www.googletagmanager.com/gtag/js?id=" +
        encodeURIComponent(SETTINGS.ga4MeasurementId)
    });

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", SETTINGS.ga4MeasurementId, { anonymize_ip: true });
  }

  // =========================
  // 6) AdSense Auto Ads + Verification
  // =========================
  if (
    SETTINGS.enableAdSenseAutoAds &&
    SETTINGS.adSenseClientId &&
    !SETTINGS.adSenseClientId.includes("XXXX")
  ) {
    // 1) Inject AdSense script
    addScriptToHead({
      src:
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
        encodeURIComponent(SETTINGS.adSenseClientId),
      attrs: { crossorigin: "anonymous" }
    });

    // 2) Inject verification meta tag (for site ownership verification)
    const meta = document.createElement("meta");
    meta.name = "google-adsense-account";
    meta.content = SETTINGS.adSenseClientId;
    document.head.appendChild(meta);
  }

  // =========================
  // 7) Auto ad slots (optional)
  // =========================
  if (SETTINGS.enableAutoAdSlots) {
    const selfPath = getSelfPath();
    const canonPath = getCanonicalPath();
    const comparePath = canonPath || selfPath;

    const normalizedSkip = new Set(SETTINGS.skipAdSlotsOn.map(normalizePath));
    if (!normalizedSkip.has(normalizePath(comparePath))) {
      const container = getMainContainer();
      if (container) {
        const h2s = Array.from(container.querySelectorAll("h2"));
        if (h2s.length >= SETTINGS.minH2ForAdSlots) {
          let inserted = 0;
          for (
            let i = SETTINGS.autoAdSlotAfterH2 - 1;
            i < h2s.length;
            i += SETTINGS.autoAdSlotAfterH2
          ) {
            if (inserted >= SETTINGS.maxAutoAdSlots) break;
            const slot = document.createElement("div");
            slot.className = "ad-slot";
            slot.setAttribute("aria-label", "Advertisement");
            h2s[i].insertAdjacentElement("afterend", slot);
            inserted++;
          }
        }
      }
    }
  }

  // =========================
  // 7.5) Calculator CTA (authority anchoring)
  // =========================
  injectCalculatorCTA();
  injectPropertyCTA();
  injectDecisionPathModule();
  injectBreadcrumbSchema();
  injectOrganizationSchema();
  injectWebSiteSchema();

  // =========================
  // 8) Auto-related links (cluster-aware, capped, non-clutter)
  // =========================
  if (SETTINGS.enableAutoRelated) {
    const relatedHost = document.getElementById(SETTINGS.relatedContainerId);
    if (relatedHost) {
      // Per-page opt-out
      if (metaIsTrue(SETTINGS.relatedOptOutMetaKey)) {
        // Intentionally do nothing
      } else {
        const selfPath = getSelfPath();
        const canonPath = getCanonicalPath();
        const effectiveSelf = canonPath || selfPath;

        const cluster = (getMetaAny("og:cluster") || "").toLowerCase();
        const subtopic = (getMetaAny("og:subtopic") || "").toLowerCase();

        if (cluster && SITE[cluster]) {
          const bucket = SITE[cluster];
          const hub = isHubPage(subtopic, normalizePath(effectiveSelf));

          const chosen = pickRelatedLinks({
            bucket,
            cluster,
            subtopic,
            selfPath: effectiveSelf,
            isHub: hub
          });

          if (chosen.length) {
            relatedHost.innerHTML = buildRelatedHTML(bucket.label, chosen);
          }
        }
      }
    }
  }
})();