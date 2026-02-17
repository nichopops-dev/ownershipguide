(async function () {
  // =========================
  // 0) SETTINGS (edit only here)
  // =========================
  const SETTINGS = {
    enableHeaderFooter: true,

    // Analytics (Google Analytics 4)
    enableGA4: false,
    ga4MeasurementId: "G-XXXXXXXXXX",

    // AdSense Auto Ads
    enableAdSenseAutoAds: false,
    adSenseClientId: "ca-pub-XXXXXXXXXXXXXXX",

    // In-content ad placeholders (future, optional)
    enableAutoAdSlots: false,
    autoAdSlotAfterH2: 2,
    maxAutoAdSlots: 2,

    // Pages to never inject ad slots into
    skipAdSlotsOn: [
      "/",
      "/index.html",
      "/404.html",
      "/car-vs-ride-hailing-calculator.html"
    ],

    // Minimum content structure before injecting slots
    minH2ForAdSlots: 3,

    // Announcement banner (optional)
    enableAnnouncement: false,
    announcementHtml:
      "New: Transport cluster updated for 2026 → <a href='/car-vs-ride-hailing-calculator.html'>Try the calculator</a>"
  };

  // =========================
  // 1) HELPERS
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

  function setActiveNav() {
    const path = location.pathname;

    const isCalculator = path.includes("calculator");
    const isTransport =
      path.includes("car-") ||
      path.includes("monthly-cost-of-owning-a-car") ||
      path.includes("ride-hailing") ||
      path.includes("leasing");
    const isProperty =
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
  // 2) HEADER / FOOTER
  // =========================
  if (SETTINGS.enableHeaderFooter) {
    await inject("site-header", "/header.html");
    await inject("site-footer", "/footer.html");
    setActiveNav();
  }

  // =========================
  // 3) ANNOUNCEMENT (optional)
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
  // 4) GA4 (optional)
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
  // 5) AdSense Auto Ads (optional)
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
  // 6) Auto insert ad slots (optional)
  // =========================
  if (SETTINGS.enableAutoAdSlots) {
    const path = location.pathname;

    if (!SETTINGS.skipAdSlotsOn.includes(path)) {
      const container = document.querySelector(".container");
      if (!container) return;

      const h2s = Array.from(container.querySelectorAll("h2"));
      if (h2s.length < SETTINGS.minH2ForAdSlots) return;

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
})();
