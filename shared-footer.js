(function () {
  function injectSharedFooterStyles() {
    if (document.getElementById('sharedFooterStyles')) return;
    var style = document.createElement('style');
    style.id = 'sharedFooterStyles';
    style.textContent = [
      'body {',
      '  min-height: 100vh !important;',
      '  display: flex !important;',
      '  flex-direction: column !important;',
      '}',
      'footer {',
      '  max-width: 1100px !important;',
      '  margin: 0 auto !important;',
      '  margin-top: auto !important;',
      '  padding: 2rem 1rem !important;',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  justify-content: space-between !important;',
      '  flex-wrap: wrap !important;',
      '  gap: 1rem !important;',
      '  border-top: 1px solid var(--border) !important;',
      '}',
      'footer .footer-left {',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  gap: 0.5rem !important;',
      '  font-size: 0.85rem !important;',
      '  color: var(--muted) !important;',
      '}',
      'footer .footer-left img {',
      '  width: 22px !important;',
      '  height: 22px !important;',
      '  border-radius: 5px !important;',
      '}',
      'footer .footer-links {',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  flex-wrap: wrap !important;',
      '  gap: 1rem !important;',
      '}',
      'footer .footer-links a {',
      '  font-size: 0.85rem !important;',
      '  color: var(--muted) !important;',
      '  text-decoration: none !important;',
      '}',
      'footer .footer-links a:hover {',
      '  color: var(--accent) !important;',
      '}',
      '@media (max-width: 900px) {',
      '  footer { padding: 1.5rem 1rem 2rem !important; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function renderFooter(base) {
    return (
      '<footer>' +
        '<div class="footer-left">' +
          '<img src="' + base + 'images/fravora.png" alt="" />' +
          '<span>© 2026 aniujual software</span>' +
        '</div>' +
        '<div class="footer-links">' +
          '<a href="mailto:aniujual.dev@yahoo.com">Contact</a>' +
          '<a href="' + base + 'manual.html">User Manual</a>' +
          '<a href="' + base + 'features.html">Features</a>' +
          '<a href="' + base + 'how-it-works.html">How It Works</a>' +
          '<a href="' + base + 'download.html">Download</a>' +
          '<a href="' + base + 'blog/index.html">Blog</a>' +
          '<a href="' + base + 'glossary.html">Glossary</a>' +
          '<a href="' + base + 'privacy.html">Privacy Policy</a>' +
          '<a href="' + base + 'data-deletion.html">Data Deletion</a>' +
          '<a href="' + base + 'release-notes.html">Release Notes</a>' +
        '</div>' +
      '</footer>'
    );
  }

  var footerMount = document.getElementById('siteFooterMount');
  if (!footerMount) return;

  injectSharedFooterStyles();
  var base = footerMount.getAttribute('data-base') || '';
  footerMount.outerHTML = renderFooter(base);
})();
