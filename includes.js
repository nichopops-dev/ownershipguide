(async function () {
  const OG_INCLUDES_VERSION = "v0126.5-fix8";
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
      "/property/"
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
      property: "/property-ownership-cost-singapore.html"
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
      property: { href: "/property/", text: "← Back to Property" }
    },

    comparisons: {
      label: "Decision Comparisons (Singapore)",
      pillars: [
        { url: "/car-vs-ride-hailing-cost.html", title: "Car vs Ride-Hailing in Singapore: Which Is Cheaper?", cluster: "transport", subtopic: "comparison" },
        { url: "/rent-vs-buy-property-singapore.html", title: "Rent vs Buy Property in Singapore (2026): 5-Year Cost & Liquidity Framework", cluster: "property", subtopic: "comparison" },
        { url: "/bto-vs-resale-cost.html", title: "BTO vs Resale in Singapore: The Full Cost Comparison (2026)", cluster: "property", subtopic: "comparison" }
      ],
      pages: [
        { url: "/coe-renew-vs-replace-singapore.html", title: "Renew COE vs Replace Car in Singapore (2026): Decision Framework + Break-even", cluster: "transport", subtopic: "comparison" },
        { url: "/own-car-vs-public-transport-singapore.html", title: "Own a Car vs Public Transport in Singapore (2026): The Real Decision", cluster: "transport", subtopic: "comparison" },
        { url: "/car-sharing-vs-owning-a-car-singapore.html", title: "Car-Sharing vs Owning a Car in Singapore (2026): Which Makes More Sense?", cluster: "transport", subtopic: "comparison" },
        { url: "/weekend-car-rental-vs-owning-a-car-singapore.html", title: "Weekend Car Rental vs Owning a Car in Singapore (2026): Which Makes More Sense?", cluster: "transport", subtopic: "comparison" },
        { url: "/does-your-household-need-a-second-car-singapore.html", title: "Does Your Household Need a Second Car in Singapore? (2026 Decision Framework)", cluster: "transport", subtopic: "comparison" },
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

        { url: "/car-leasing-vs-buying-singapore.html", title: "Car Leasing vs Buying in Singapore: Which Is Cheaper?", cluster: "transport", subtopic: "comparison" },
        { url: "/car-loan-vs-cash-singapore.html", title: "Car Loan vs Pay Cash in Singapore (2026): Decision Rules + Worked Example", cluster: "transport", subtopic: "comparison" },
        { url: "/balloon-loan-vs-normal-car-loan-singapore.html", title: "Balloon Loan vs Normal Car Loan in Singapore (2026): Decision Framework + Worked Example", cluster: "transport", subtopic: "comparison" },
        { url: "/used-car-vs-new-car-singapore.html", title: "Used vs New Car in Singapore (2026): Which Is Cheaper Over 5 Years?", cluster: "transport", subtopic: "comparison" }
      ],
      bridges: [
        { url: "/start-here/", title: "Start Here (10-Minute Paths)", cluster: "home" },
        { url: "/calculators/", title: "Calculators Hub", cluster: "calculators" }
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
        { url: "/car-vs-ride-hailing-cost.html", title: "Car vs Ride-Hailing in Singapore: Which Is Cheaper?", subtopic: "ridehailing" },
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
        { url: "/transport/financing/", title: "Transport Financing (Singapore, 2026): Car Loans, Leasing, and Payment Structure", subtopic: "financing" },
        { url: "/coe-renewal-worth-it-singapore.html", title: "Should You Renew COE in Singapore? (2026 Decision Framework + Break-Even)", subtopic: "coe" },
        { url: "/10-year-coe-renewal-worth-it-singapore.html", title: "Is 10-Year COE Renewal Worth It in Singapore? (2026 Financial Breakdown)", subtopic: "coe" },
        { url: "/5-year-coe-renewal-worth-it-singapore.html", title: "5-Year COE Renewal: Is It Worth It in Singapore? (2026 Decision Framework)", subtopic: "coe" },
        { url: "/coe-cost-singapore.html", title: "COE Cost in Singapore (2026)", subtopic: "coe" }
      ],
      pages: [
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
        { url: "/public-transport-cost-singapore.html", title: "Public Transport Cost in Singapore (2026): MRT + Bus Monthly Budget Models", subtopic: "alternative" },
        { url: "/motorcycle-ownership-cost-singapore.html", title: "Motorcycle Ownership Cost in Singapore (2026): Monthly Budget + 5-Year Reality Check", subtopic: "alternative" },
        { url: "/motorcycle-vs-car-cost-singapore.html", title: "Motorcycle vs Car Cost in Singapore (2026): Full Exposure Comparison", cluster: "transport", subtopic: "comparison" },
        { url: "/own-car-vs-public-transport-singapore.html", title: "Own a Car vs Public Transport in Singapore (2026): The Real Decision", subtopic: "comparison" },
        { url: "/car-sharing-vs-owning-a-car-singapore.html", title: "Car-Sharing vs Owning a Car in Singapore (2026): Which Makes More Sense?", subtopic: "comparison" },
        { url: "/weekend-car-rental-vs-owning-a-car-singapore.html", title: "Weekend Car Rental vs Owning a Car in Singapore (2026): Which Makes More Sense?", subtopic: "comparison" },
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
        { url: "/trade-in-vs-direct-sale-car-singapore.html", title: "Trade-In vs Direct Sale for Cars in Singapore (2026): Which Exit Route Actually Leaves You Better Off?", subtopic: "comparison" },
        { url: "/consignment-vs-dealer-sale-car-singapore.html", title: "Consignment vs Dealer Sale for Cars in Singapore (2026): More Upside, More Waiting, or Just More Uncertainty?", subtopic: "comparison" },
        { url: "/should-you-repair-car-before-selling-singapore.html", title: "Should You Repair Your Car Before Selling in Singapore? (2026): What to Fix, What to Leave, and When ‘As-Is’ Is Smarter", subtopic: "decision" },
        { url: "/when-to-sell-your-car-before-coe-expiry-singapore.html", title: "When to Sell Your Car Before COE Expiry in Singapore (2026): Why Waiting Too Long Shrinks Your Options", subtopic: "timing" },
        { url: "/car-leasing-vs-buying-singapore.html", title: "Car Leasing vs Buying in Singapore: Which Is Cheaper?", subtopic: "leasing" },
        { url: "/car-loan-rates-singapore.html", title: "Car Loan Rates in Singapore (2026): Flat Rate vs Effective Interest Explained", subtopic: "financing" },
        { url: "/transport/financing/", title: "Transport Financing (Singapore, 2026): Car Loans, Leasing, and Payment Structure", subtopic: "financing" },
        { url: "/coe-renewal-worth-it-singapore.html", title: "Should You Renew COE in Singapore? (2026 Decision Framework + Break-Even)", subtopic: "coe" },
        { url: "/10-year-coe-renewal-worth-it-singapore.html", title: "Is 10-Year COE Renewal Worth It in Singapore? (2026 Financial Breakdown)", subtopic: "coe" },
        { url: "/5-year-coe-renewal-worth-it-singapore.html", title: "5-Year COE Renewal: Is It Worth It in Singapore? (2026 Decision Framework)", subtopic: "coe" },
        { url: "/coe-cost-singapore.html", title: "COE Cost in Singapore (2026)", subtopic: "coe" }
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
        { url: "/property-valuation-vs-asking-price-singapore.html", title: "Property Valuation vs Asking Price in Singapore (2026): Why Sellers Misread What Their Home Can Actually Fetch", subtopic: "exit" },
        { url: "/selling-property-timeline-singapore.html", title: "Selling Property Timeline in Singapore (2026): How Long It Really Takes and Why Timing Assumptions Break Plans", subtopic: "exit" },
        { url: "/property-seller-agent-commission-singapore.html", title: "Property Seller Agent Commission in Singapore (2026): When Lower Fees Improve Your Outcome and When They Cost You More Than They Save", subtopic: "exit" },
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
      ],
      bridges: [
        { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs Ride-Hailing Break-Even Calculator", cluster: "transport" },
        { url: "/car-ownership-cost.html", title: "The Real Cost of Owning a Car in Singapore (5-Year Breakdown)", cluster: "transport" }
      ]
    }
 
    ,
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
      bridges: []
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
    if (!qt) return 0;

    // base relevance
    let score = 0;
    if (title === qt) score += 100;
    if (title.startsWith(qt)) score += 60;
    if (title.includes(qt)) score += 35;

    // token overlap
    const qTokens = tokens(qt);
    const tTokens = tokens(title);
    const tSet = new Set(tTokens);
    let hit = 0;
    for (const t of qTokens) {
      if (tSet.has(t)) hit++;
    }
    score += hit * 10;

    // small boosts (only after a real match)
    if (score > 0) {
      if (item?.subtopic === "calculator") score += 6;
      if (item?.subtopic === "ownership") score += 3;
    }
    return score;
  }

  function prettyCluster(c) {
    if (!c) return "";
    return c.charAt(0).toUpperCase() + c.slice(1);
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
        resultsEl.innerHTML = head + `<div class="sr-empty"><div class="sr-title">No results</div><div class="sr-meta">Try fewer words, or search “car”, “property”, “calculator”.</div></div>`;
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

const runPrimary = (override && override.runPrimary)
  ? override.runPrimary
  : (cluster === "property"
    ? { url: "/property-affordability-calculator-singapore.html", title: "Property affordability stress test" }
    : { url: "/car-affordability-calculator-singapore.html", title: "Car affordability stress test" });

const runSecondary = (override && override.runSecondary)
  ? override.runSecondary
  : (cluster === "property"
    ? { url: "/mortgage-interest-cost-singapore.html", title: "Mortgage interest cost model" }
    : { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs ride-hailing break-even" });

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
          <div class="og-card-meta">Use a calculator (2 min)</div>
          <a class="og-btn og-primary" href="${runPrimary.url}">Open: ${escapeHtml(runPrimary.title)} → <span class="og-pill">Recommended</span></a>
          <div class="og-card-links">
            <a href="${runSecondary.url}">${escapeHtml(runSecondary.title)}</a>
            <span class="muted"> · </span>
            <a href="/calculators/">All calculators</a>
          </div>
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
  if (SETTINGS.enableHeaderFooter) {
    await inject("site-header", ["/header.html", "header.html", "/ownershipguide-main/header.html"]);
    await inject("site-footer", ["/footer.html", "footer.html", "/ownershipguide-main/footer.html"]);
    setActiveNav();
    initHeaderSearch();
    injectBackToHomeLink();
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