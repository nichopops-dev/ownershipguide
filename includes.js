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
    enableAdSenseAutoAds: false,
    adSenseClientId: "ca-pub-XXXXXXXXXXXXXXX",

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
    relatedContainerId: "auto-related" // placeholder div id in articles
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
        { url: "/car-insurance-cost-singapore.html", title: "Car Insurance Cost in Singapore (2026)", subtopic: "insurance" },
        { url: "/car-vs-ride-hailing-cost.html", title: "Car vs Ride-Hailing in Singapore: Which Is Cheaper?", subtopic: "ridehailing" },
        { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs Ride-Hailing Break-Even Calculator", subtopic: "calculator" },
        { url: "/car-loan-rates-singapore.html", title: "Car Loan Rates in Singapore (2026): Flat Rate vs Effective Interest Explained", subtopic: "financing" },
        { url: "/coe-cost-singapore.html", title: "COE Cost in Singapore (2026)", subtopic: "coe" }
      ],
      pages: [
        { url: "/car-ownership-cost.html", title: "The Real Cost of Owning a Car in Singapore (5-Year Breakdown)", subtopic: "ownership" },
        { url: "/monthly-cost-of-owning-a-car-singapore.html", title: "True Monthly Cost of Owning a Car in Singapore", subtopic: "ownership" },
        { url: "/car-insurance-cost-singapore.html", title: "Car Insurance Cost in Singapore (2026)", subtopic: "insurance" },
        { url: "/car-vs-ride-hailing-cost.html", title: "Car vs Ride-Hailing in Singapore: Which Is Cheaper?", subtopic: "ridehailing" },
        { url: "/car-vs-ride-hailing-calculator.html", title: "Car vs Ride-Hailing Break-Even Calculator", subtopic: "calculator" },
        { url: "/how-much-salary-to-own-a-car-singapore.html", title: "How Much Salary Do You Need to Own a Car in Singapore? (2026 Reality Check)", subtopic: "affordability" },
        { url: "/is-it-worth-owning-a-car-singapore.html", title: "Is It Worth Owning a Car in Singapore? (2026 Decision Framework)", subtopic: "decision" },
        { url: "/car-leasing-vs-buying-singapore.html", title: "Car Leasing vs Buying in Singapore: Which Is Cheaper?", subtopic: "leasing" },
        { url: "/car-loan-rates-singapore.html", title: "Car Loan Rates in Singapore (2026): Flat Rate vs Effective Interest Explained", subtopic: "financing" },
        { url: "/coe-cost-singapore.html", title: "COE Cost in Singapore (2026)", subtopic: "coe" }
      ],
      bridges: [
  { url: "/property/", title: "Property Cost in Singapore (2026): Full Ownership Breakdown", cluster: "property" }
      ]
    },

    property: {
      label: "Related Singapore Property Breakdowns",
      pillars: [
        { url: "/rental-property-ownership-cost.html", title: "The Real Cost of Owning a Rental Property in Singapore (2026)", subtopic: "rental" },
        { url: "/condo-ownership-cost.html", title: "The Real Cost of Owning a Condo in Singapore (2026)", subtopic: "condo" },
        { url: "/bto-vs-resale-cost.html", title: "BTO vs Resale in Singapore: The Full Cost Comparison (2026)", subtopic: "hdb" }
      ],
      pages: [
        { url: "/rental-property-ownership-cost.html", title: "The Real Cost of Owning a Rental Property in Singapore (2026)", subtopic: "rental" },
        { url: "/condo-ownership-cost.html", title: "The Real Cost of Owning a Condo in Singapore (2026)", subtopic: "condo" },
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

  function uniqByUrl(items) {
    const seen = new Set();
    return items.filter((x) => {
      if (!x || !x.url) return false;
      if (seen.has(x.url)) return false;
      seen.add(x.url);
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

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
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

  function setActiveNav() {
  const path = (location.pathname || "/").toLowerCase();

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

  // =========================
  // 3) HEADER / FOOTER
  // =========================
  if (SETTINGS.enableHeaderFooter) {
    await inject("site-header", "/header.html");
    await inject("site-footer", "/footer.html");
    setActiveNav();
  }

  // =========================
  // 4) ANNOUNCEMENT (optional)
  // =========================
  if (SETTINGS.enableAnnouncement) {
    const bar = document.createElement("div");
    bar.className = "announcement";
    bar.innerHTML = SETTINGS.announcementHtml;
    const container = document.querySelector(".container");
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
  // 6) AdSense Auto Ads (optional)
  // =========================
  if (
    SETTINGS.enableAdSenseAutoAds &&
    SETTINGS.adSenseClientId &&
    !SETTINGS.adSenseClientId.includes("XXXX")
  ) {
    addScriptToHead({
      src:
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
        encodeURIComponent(SETTINGS.adSenseClientId),
      attrs: { crossorigin: "anonymous" }
    });
  }

  // =========================
  // 7) Auto ad slots (optional)
  // =========================
  if (SETTINGS.enableAutoAdSlots) {
    const path = location.pathname;

    if (!SETTINGS.skipAdSlotsOn.includes(path)) {
      const container = document.querySelector(".container");
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
  // 8) Auto-related links
  // =========================
  if (SETTINGS.enableAutoRelated) {
    const relatedHost = document.getElementById(SETTINGS.relatedContainerId);
    if (relatedHost) {
      const path = location.pathname;

      const cluster = getMetaAny("og:cluster");
      const subtopic = getMetaAny("og:subtopic");

      if (cluster && SITE[cluster]) {
        const bucket = SITE[cluster];
        const all = bucket.pages || [];
        const pillars = bucket.pillars || [];
        const bridges = bucket.bridges || [];

        const selfUrl = path === "/" ? "/index.html" : path;

        // If it's a hub page (subtopic=hub), we intentionally avoid same-subtopic linking.
        const isHub = subtopic === "hub";

        const sameSubtopic = (!isHub && subtopic)
          ? all.filter((p) => p.subtopic === subtopic && p.url !== selfUrl)
          : [];

        let chosen = [];
        chosen = chosen.concat(
          pillars.filter((p) => p.url !== selfUrl).slice(0, SETTINGS.relatedPillarsCount)
        );
        chosen = chosen.concat(sameSubtopic.slice(0, SETTINGS.relatedSameSubtopicCount));
        chosen = chosen.concat(bridges.slice(0, SETTINGS.relatedBridgeCount));

        chosen = uniqByUrl(chosen).slice(0, SETTINGS.relatedMaxLinks);

        if (chosen.length) {
          relatedHost.innerHTML = buildRelatedHTML(bucket.label, chosen);
        }
      }
    }
  }
})();
