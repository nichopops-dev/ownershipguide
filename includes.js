(async function () {
  // =========================
  // 0) SETTINGS (edit only here)
  // =========================
  const SETTINGS = {
    enableHeaderFooter: true,

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
        { url: "/car-vs-ride-hailing-cost.html", title: "Car vs Ride-Hailing in Singapore: Which Is Cheaper?", subtopic: "ridehailing" },
        { url: "/car-affordability-calculator-singapore.html", title: "Car Affordability Calculator Singapore (2026): Stress-Tested True Monthly Cost", subtopic: "calculator" },
        { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs Ride-Hailing Break-Even Calculator", subtopic: "calculator" },
        { url: "/car-loan-rates-singapore.html", title: "Car Loan Rates in Singapore (2026): Flat Rate vs Effective Interest Explained", subtopic: "financing" },
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
        { url: "/erp-cost-singapore.html", title: "ERP Cost in Singapore (2026): How Much You’ll Pay Per Day + Monthly Budget Model", subtopic: "variable-cost" },
        { url: "/parking-cost-singapore.html", title: "Parking Cost in Singapore (2026): Season Parking, Office, Mall Rates + Real Monthly Budget", subtopic: "variable-cost" },
        { url: "/fuel-cost-singapore.html", title: "Fuel Cost in Singapore (2026): Monthly Budget, Cost Per Km + Realistic Scenarios", subtopic: "variable-cost" },
        { url: "/ev-vs-petrol-cost-singapore.html", title: "EV vs Petrol Cost in Singapore (2026): Running Costs, Charging, Road Tax + Break-even", subtopic: "variable-cost" },
        { url: "/public-transport-cost-singapore.html", title: "Public Transport Cost in Singapore (2026): MRT + Bus Monthly Budget Models", subtopic: "alternative" },
        { url: "/motorcycle-ownership-cost-singapore.html", title: "Motorcycle Ownership Cost in Singapore (2026): Monthly Budget + 5-Year Reality Check", subtopic: "alternative" },
        { url: "/motorcycle-vs-car-cost-singapore.html", title: "Motorcycle vs Car Cost in Singapore (2026): Full Exposure Comparison", cluster: "transport", subtopic: "comparison" },
        { url: "/car-vs-ride-hailing-cost.html", title: "Car vs Ride-Hailing in Singapore: Which Is Cheaper?", subtopic: "ridehailing" },
        { url: "/car-affordability-calculator-singapore.html", title: "Car Affordability Calculator Singapore (2026): Stress-Tested True Monthly Cost", subtopic: "calculator" },
        { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs Ride-Hailing Break-Even Calculator", subtopic: "calculator" },
        { url: "/is-it-worth-owning-a-car-singapore.html", title: "Is It Worth Owning a Car in Singapore? (2026 Decision Framework)", subtopic: "decision" },
        { url: "/cheapest-car-to-own-singapore.html", title: "Cheapest Car to Own in Singapore (2026): What “Cheap” Actually Means", subtopic: "affordability" },
        { url: "/how-much-salary-to-own-a-car-singapore.html", title: "How Much Salary Do You Need to Own a Car in Singapore? (2026 Reality Check)", subtopic: "affordability" },
        { url: "/how-much-cash-to-buy-car-singapore.html", title: "How Much Cash Do You Need to Buy a Car in Singapore? (2026 Downpayment + Upfront Costs)", subtopic: "affordability" },
        { url: "/best-car-to-buy-singapore.html", title: "Best Car to Buy in Singapore (2026): Cost vs Practicality Framework (Lowest Regret)", subtopic: "decision" },
        { url: "/used-car-vs-new-car-singapore.html", title: "Used vs New Car in Singapore (2026): Which Is Cheaper Over 5 Years?", subtopic: "ownership" },
        { url: "/car-leasing-vs-buying-singapore.html", title: "Car Leasing vs Buying in Singapore: Which Is Cheaper?", subtopic: "leasing" },
        { url: "/car-loan-rates-singapore.html", title: "Car Loan Rates in Singapore (2026): Flat Rate vs Effective Interest Explained", subtopic: "financing" },
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
        { url: "/condo-ownership-cost.html", title: "The Real Cost of Owning a Condo in Singapore (2026)", subtopic: "condo" },
        { url: "/rental-property-ownership-cost.html", title: "The Real Cost of Owning a Rental Property in Singapore (2026)", subtopic: "rental" },
        { url: "/bto-vs-resale-cost.html", title: "BTO vs Resale in Singapore: The Full Cost Comparison (2026)", subtopic: "hdb" }
      ],
      pages: [
        { url: "/property-ownership-cost-singapore.html", title: "Property Ownership Cost in Singapore (2026): 5-Year Total Exposure Model", subtopic: "ownership" },
        { url: "/condo-ownership-cost.html", title: "The Real Cost of Owning a Condo in Singapore (2026)", subtopic: "condo" },
        { url: "/rental-property-ownership-cost.html", title: "The Real Cost of Owning a Rental Property in Singapore (2026)", subtopic: "rental" },
        { url: "/should-i-buy-property-now-or-wait-singapore.html", title: "Should You Buy Property Now or Wait in Singapore? (2026 Timing Framework)", subtopic: "timing" },
        { url: "/rent-vs-buy-property-singapore.html", title: "Rent vs Buy Property in Singapore (2026): 5-Year Cost & Liquidity Framework", subtopic: "decision" },
        { url: "/how-much-cash-to-buy-property-singapore.html", title: "How Much Cash Do You Need to Buy Property in Singapore? (2026 Real Breakdown)", subtopic: "affordability" },
        { url: "/bto-vs-resale-cost.html", title: "BTO vs Resale in Singapore: The Full Cost Comparison (2026)", subtopic: "hdb" }
      ],
      bridges: [
        { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs Ride-Hailing Break-Even Calculator", cluster: "transport" },
        { url: "/car-ownership-cost.html", title: "The Real Cost of Owning a Car in Singapore (5-Year Breakdown)", cluster: "transport" }
      ]
    }
  };

  // =========================
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

  async function inject(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error(String(res.status));
      el.innerHTML = await res.text();
    } catch (e) {
      console.warn("Include failed:", url, e);
    }
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

    // Prefer meta-based nav if available, because it avoids heuristic drift
    if (SETTINGS.preferMetaForNav) {
      const cluster = (getMetaAny("og:cluster") || "").toLowerCase();
      const subtopic = (getMetaAny("og:subtopic") || "").toLowerCase();

      const activate = (key) => {
        const a = document.querySelector(`[data-nav="${key}"]`);
        if (a) a.classList.add("active");
      };

      if (subtopic === "calculator" || path.includes("calculator")) {
        activate("calculator");
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

      activate("home");
      return;
    }

    // Fallback heuristics (kept, but meta is safer)
    const isCalculator =
      path.startsWith("/calculator") ||
      path.includes("calculator");

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

    if (isCalculator) activate("calculator");
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
    const all = bucket.pages || [];
    const pillars = bucket.pillars || [];
    const bridges = bucket.bridges || [];

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
      if (cluster !== "transport") return null;
      // If current page IS a calculator, don't reinforce calculators again.
      if ((subtopic || "").toLowerCase() === "calculator") return null;

      // Prefer the most context-relevant calculator.
      const wantRide = (subtopic || "").toLowerCase() === "ridehailing";
      const calcUrl = wantRide
        ? "/car-vs-ride-hailing-calculator.html"
        : "/car-affordability-calculator-singapore.html";
      const c = byUrl(calcUrl);
      if (!c) return null;
      if (normalizePath(c.url) === selfN) return null;
      return { url: c.url, title: c.title };
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

    const host = document.getElementById(SETTINGS.relatedContainerId);
    if (!host) return;

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

    host.insertAdjacentElement("beforebegin", box);
  }

  // =========================
  // 3) HEADER / FOOTER
  // =========================
  if (SETTINGS.enableHeaderFooter) {
    await inject("site-header", "/header.html");
    await inject("site-footer", "/footer.html");
    setActiveNav();
    injectBackToHomeLink();
    injectBackToClusterLink();
  }

    // Ensure back-to-home (and back-to-cluster) links exist even if header/footer is disabled
  injectBackToHomeLink();
  injectBackToClusterLink();

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
