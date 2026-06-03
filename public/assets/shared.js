// Shared site JS — nav, accent setting, mobile hamburger, reveal animations

(function () {
  // ---- Accent persistence (synced w/ tweaks where present) ----
  const STORE_KEY = "cygnik.accent";
  function applyAccent(hex) {
    if (!hex) return;
    document.documentElement.style.setProperty("--accent", hex);
    const rgb = hexToRgb(hex);
    if (rgb) {
      document.documentElement.style.setProperty("--accent-soft", `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`);
      document.documentElement.style.setProperty("--accent-mid", `rgba(${rgb.r},${rgb.g},${rgb.b},0.32)`);
    }
  }
  function hexToRgb(hex) {
    const m = hex && hex.match(/^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i);
    if (!m) return null;
    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
  }
  const stored = localStorage.getItem(STORE_KEY);
  if (stored) applyAccent(stored);
  window.cygnikSetAccent = function (hex) {
    applyAccent(hex);
    try { localStorage.setItem(STORE_KEY, hex); } catch (e) {}
  };

  // ---- Mobile hamburger nav ----
  function makeEl(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    if (children) children.forEach(c => el.appendChild(c));
    return el;
  }

  function initHamburger() {
    const nav = document.querySelector('.nav');
    const navInner = nav && nav.querySelector('.nav__inner');
    if (!navInner || navInner.querySelector('.nav__hamburger')) return;

    const btn = makeEl('button', {
      class: 'nav__hamburger',
      'aria-label': 'Open menu',
      'aria-expanded': 'false',
    }, [
      document.createElement('span'),
      document.createElement('span'),
      document.createElement('span'),
    ]);
    navInner.appendChild(btn);

    const menu = makeEl('div', {
      class: 'nav__mobile-menu',
      role: 'navigation',
      'aria-label': 'Mobile navigation',
    });

    const activeEl = navInner.querySelector('.nav__links .is-active');
    const activeHref = activeEl ? activeEl.getAttribute('href') : '';

    [
      { href: 'index.html',    label: 'Home' },
      { href: 'services.html', label: 'Services' },
      { href: 'verticals.html',label: 'Verticals' },
      { href: 'approach.html', label: 'Approach' },
      { href: 'msp.html',      label: 'MSP' },
      { href: 'contact.html',  label: 'Contact' },
    ].forEach(({ href, label }) => {
      const a = makeEl('a', { href });
      a.textContent = label;
      if (href === activeHref) a.classList.add('is-active');
      menu.appendChild(a);
    });

    const cta = makeEl('a', { href: 'contact.html', class: 'nav__mobile-cta' });
    cta.textContent = 'Book intro →';
    menu.appendChild(cta);

    document.body.appendChild(menu);

    function toggle(open) {
      const isOpen = typeof open === 'boolean' ? open : !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', isOpen);
      nav.classList.toggle('nav--open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    btn.addEventListener('click', () => toggle());
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburger);
  } else {
    initHamburger();
  }

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
