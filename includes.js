(async function () {
  // =========================
  // 0) SETTINGS (edit only here)
  // =========================

  // Turn these on only when ready
  const SETTINGS = {
    enableHeaderFooter: true,

    // Analytics (Google Analytics 4)
    enableGA4: false,
    ga4MeasurementId: "G-XXXXXXXXXX",

    // AdSense Auto Ads
    enableAdSenseAutoAds: false,
    adSenseClientId: "ca-pub-XXXXXXXXXXXXXXX",

    // In-content ad placeholders (future, optional)
    // This inserts <div class="ad-slot"></div> automatically after headings
    // without editing each article.
    enableAutoAdSlots: false,
    autoAdSlotAfterH2: 2, // insert after every Nth H2 (e.g., 2 => after H2 #2, #4, #6...)
    maxAutoAdSlots: 2,    // keep it conservative
    skipAdSlotsOn: ["/", "/index.html", "/car-vs-ride-hailing-calculator.html"],

    // Announcement banner (optional)
    enableAnnouncement: false,
    announcementHtml: "New: Transport cluster updated for 2026 → <a href='/car-vs-ride-hailing-calculator.html'>Try the calculator</a>"
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

  // =========================
  // 2) HEADER / FOOTER
  // =========================
  if (SETTINGS.enableHeaderFooter) {
    await inject("site-header", "/header.html");
    await inject("site-footer", "/footer.html");
  }

  // =========================
  // 3) ANNOUNCEMENT (optional)
  // =========================
  if (SETTINGS.enableAnnouncement) {
    const bar = document.createElement("div");
    bar.className = "announcement";
    bar.innerHTML = SETTINGS.announcementHtml;
    // Put it at the top of the container if possible
    const container = document.querySelector(".container");
    if (container) container.prepend(bar);
    else document.body.prepend(bar);
  }

  // =========================
  // 4) GA4 (optional)
  // =========================
  if (SETTINGS.enableGA4 && SETTINGS.ga4MeasurementId && !SETTINGS.ga4MeasurementId.includes("XXXX")) {
    addScriptToHead({
      src: "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(SETTINGS.ga4MeasurementId)
    });

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", SETTINGS.ga4MeasurementId, { anonymize_ip: true });
  }

  // =========================
  // 5) AdSense Auto Ads (optional)
  // =========================
  if (SETTINGS.enableAdSenseAutoAds && SETTINGS.adSenseClientId && !SETTINGS.adSenseClientId.includes("XXXX")) {
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
      const h2s = Array.from(document.querySelectorAll(".container h2"));
      let inserted = 0;

      for (let i = SETTINGS.autoAdSlotAfterH2 - 1; i < h2s.length; i += SETTINGS.autoAdSlotAfterH2) {
        if (inserted >= SETTINGS.maxAutoAdSlots) break;

        const slot = document.createElement("div");
        slot.className = "ad-slot";
        slot.innerHTML = ""; // AdSense fill later, or leave empty for now

        // Insert after the H2 section heading
        h2s[i].insertAdjacentElement("afterend", slot);
        inserted++;
      }
    }
  }
})();
