// Shared snippets for nav + footer (used by service-detail templates via document.write)
window.cygnikNav = function(active) {
  return `
<nav class="nav">
  <div class="nav__inner">
    <a class="nav__brand" href="index.html">
      <span class="nav__mark">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M21 8 L21 18 Q21 22 17 22 L9 22 Q5 22 5 18 L5 8 Q5 4 9 4 L17 4 Q21 4 21 8 Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M16 9 L11 13 L16 17" stroke="var(--accent)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      Cygnik <span style="opacity:.5">/</span> <span style="color:var(--accent)">AI</span>
    </a>
    <div class="nav__links">
      <a href="index.html" class="${active==='home'?'is-active':''}">Home</a>
      <a href="services.html" class="${active==='services'?'is-active':''}">Services</a>
      <a href="verticals.html" class="${active==='verticals'?'is-active':''}">Verticals</a>
      <a href="approach.html" class="${active==='approach'?'is-active':''}">Approach</a>
      <a href="msp.html" class="${active==='msp'?'is-active':''}">MSP</a>
      <a href="contact.html" class="${active==='contact'?'is-active':''}">Contact</a>
    </div>
    <a class="nav__cta" href="contact.html">Book intro <span class="arr">→</span></a>
  </div>
</nav>`;
};

window.cygnikFooter = function() {
  return `
<footer class="footer">
  <div class="shell">
    <div class="footer__grid">
      <div class="footer__col"><p class="footer__manifesto">AI is a <span class="it">productivity tool</span>, not magic. We help you treat it that way.</p></div>
      <div class="footer__col">
        <h4>Services</h4>
        <ul>
          <li><a href="services-strategy.html">AI Strategy &amp; Readiness</a></li>
          <li><a href="services-automation.html">Workflow Automation</a></li>
          <li><a href="services-integration.html">AI Integration</a></li>
          <li><a href="services-retainer.html">Ongoing Retainer</a></li>
          <li><a href="msp.html">MSP / IT</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Practice</h4>
        <ul>
          <li><a href="approach.html">Approach</a></li>
          <li><a href="verticals.html">Verticals</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Cygnik</h4>
        <ul>
          <li>Toronto, ON</li>
          <li>Washington, DC</li>
          <li><a href="mailto:hello@cygnik.com">hello@cygnik.com</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© 2026 Cygnik Tech Inc.</span>
      <span class="city"><span class="pulse"></span>Online · TO ↔ DC</span>
    </div>
  </div>
</footer>`;
};
