(async function () {
  async function inject(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error(res.status);
      el.innerHTML = await res.text();
    } catch (e) {
      // Fail silently: page still works even if header/footer fail to load
      console.warn("Include failed:", url, e);
    }
  }

  await inject("site-header", "/header.html");
  await inject("site-footer", "/footer.html");
})();
