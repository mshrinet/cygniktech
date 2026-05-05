// Shared site JS — nav, accent setting, simple intersection animations

(function () {
  // ---- Accent persistence (synced w/ tweaks where present) ----
  const STORE_KEY = "cygnik.accent";
  function applyAccent(hex) {
    if (!hex) return;
    document.documentElement.style.setProperty("--accent", hex);
    // derive soft + mid
    const rgb = hexToRgb(hex);
    if (rgb) {
      document.documentElement.style.setProperty("--accent-soft", `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`);
      document.documentElement.style.setProperty("--accent-mid", `rgba(${rgb.r},${rgb.g},${rgb.b},0.32)`);
    }
  }
  function hexToRgb(hex) {
    const m = /^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hex);
    if (!m) return null;
    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
  }
  const stored = localStorage.getItem(STORE_KEY);
  if (stored) applyAccent(stored);
  window.cygnikSetAccent = function (hex) {
    applyAccent(hex);
    try { localStorage.setItem(STORE_KEY, hex); } catch (e) {}
  };

  // ---- Reveal animations ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
})();
