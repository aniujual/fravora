(function () {
  var THEME_KEY = 'fravora-theme';
  var WINDOW_THEME_PREFIX = 'fravora-theme:';

  function isValidTheme(value) {
    return value === 'dark' || value === 'light';
  }

  function getThemeFromLocalStorage() {
    try {
      var value = window.localStorage.getItem(THEME_KEY);
      return isValidTheme(value) ? value : null;
    } catch (err) {
      return null;
    }
  }

  function setThemeToLocalStorage(theme) {
    if (!isValidTheme(theme)) return;
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (err) {
      // Ignore storage errors (private mode/file:// restrictions).
    }
  }

  function getThemeFromWindowName() {
    var value = window.name || '';
    if (value.indexOf(WINDOW_THEME_PREFIX) !== 0) return null;
    var parsed = value.slice(WINDOW_THEME_PREFIX.length);
    return isValidTheme(parsed) ? parsed : null;
  }

  function setThemeToWindowName(theme) {
    if (!isValidTheme(theme)) return;
    window.name = WINDOW_THEME_PREFIX + theme;
  }

  function resolveTheme() {
    return getThemeFromLocalStorage() || getThemeFromWindowName() || 'dark';
  }

  function setTheme(theme) {
    var nextTheme = isValidTheme(theme) ? theme : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    setThemeToLocalStorage(nextTheme);
    setThemeToWindowName(nextTheme);
    return nextTheme;
  }

  function updateThemeButtonIcon(btn, theme) {
    if (!btn) return;
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function initializeThemeState() {
    var initialTheme = resolveTheme();
    setTheme(initialTheme);
  }

  function wireThemeSync() {
    var btn = document.getElementById('themeBtn');
    var appliedTheme = document.documentElement.getAttribute('data-theme');
    if (!isValidTheme(appliedTheme)) {
      appliedTheme = resolveTheme();
      setTheme(appliedTheme);
    }
    updateThemeButtonIcon(btn, appliedTheme);

    if (!btn) return;

    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      if (!isValidTheme(current)) current = resolveTheme();
      var next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      updateThemeButtonIcon(btn, next);
    });
  }

  initializeThemeState();

  function injectSharedLogoStyles() {
    if (document.getElementById('sharedNavLogoStyles')) return;
    var style = document.createElement('style');
    style.id = 'sharedNavLogoStyles';
    style.textContent = [
      'nav {',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  justify-content: space-between !important;',
      '  padding: 0 2rem !important;',
      '  height: 64px !important;',
      '  background: var(--nav-bg) !important;',
      '  border-bottom: 1px solid var(--border) !important;',
      '  backdrop-filter: blur(16px) !important;',
      '}',
      'nav .nav-logo, .topnav .topnav-logo {',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  gap: 0.6rem !important;',
      '  text-decoration: none !important;',
      '}',
      'nav .nav-logo img, .topnav .topnav-logo img {',
      '  width: 32px !important;',
      '  height: 32px !important;',
      '  border-radius: 8px !important;',
      '  display: block !important;',
      '}',
      'nav .nav-logo span, .topnav .topnav-logo span {',
      '  font-family: "Syne", sans-serif !important;',
      '  font-weight: 700 !important;',
      '  font-size: 1.15rem !important;',
      '  letter-spacing: 0.02em !important;',
      '  line-height: 1.2 !important;',
      '  color: var(--text) !important;',
      '}',
      'nav .nav-links {',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  gap: 0.25rem !important;',
      '  overflow-x: auto !important;',
      '  flex-wrap: nowrap !important;',
      '}',
      'nav .nav-links a {',
      '  text-decoration: none !important;',
      '  color: var(--muted) !important;',
      '  font-size: 0.9rem !important;',
      '  font-weight: 500 !important;',
      '  padding: 0.4rem 0.85rem !important;',
      '  border-radius: 6px !important;',
      '  border: none !important;',
      '  background: transparent !important;',
      '  transition: color 0.2s, background 0.2s !important;',
      '}',
      'nav .nav-links a:hover, nav .nav-links a.active {',
      '  color: var(--text) !important;',
      '  background: var(--surface) !important;',
      '}',
      'nav .theme-btn {',
      '  margin-left: 0.75rem !important;',
      '  width: 36px !important;',
      '  height: 36px !important;',
      '  border-radius: 8px !important;',
      '  border: 1px solid var(--border) !important;',
      '  background: var(--surface) !important;',
      '  color: var(--muted) !important;',
      '  cursor: pointer !important;',
      '  font-size: 1rem !important;',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  justify-content: center !important;',
      '  transition: background 0.2s, border-color 0.2s, color 0.2s !important;',
      '}',
      'nav .theme-btn:hover {',
      '  color: var(--accent) !important;',
      '  border-color: var(--accent) !important;',
      '}',
      'nav .nav-toggle {',
      '  width: 36px !important;',
      '  height: 36px !important;',
      '  border-radius: 8px !important;',
      '  border: 1px solid var(--border) !important;',
      '  background: var(--surface) !important;',
      '  color: var(--muted) !important;',
      '  font-size: 1.05rem !important;',
      '}',
      '@media (max-width: 900px) {',
      '  nav { padding: 0 1rem !important; }',
      '  nav .nav-toggle { display: inline-flex !important; align-items: center !important; justify-content: center !important; }',
      '  nav .nav-links {',
      '    display: none !important;',
      '    position: absolute !important;',
      '    top: 100% !important;',
      '    left: 0 !important;',
      '    right: 0 !important;',
      '    flex-direction: column !important;',
      '    align-items: stretch !important;',
      '    gap: 0.45rem !important;',
      '    padding: 0.75rem 1rem 1rem !important;',
      '    background: var(--nav-bg) !important;',
      '    border-bottom: 1px solid var(--border) !important;',
      '    backdrop-filter: blur(16px) !important;',
      '    max-height: calc(100vh - 64px) !important;',
      '    overflow-y: auto !important;',
      '  }',
      '  nav .nav-links.open { display: flex !important; }',
      '  nav .theme-btn { margin-left: 0 !important; margin-top: 0.35rem !important; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function navLink(activeKey, key, href, label) {
    var cls = activeKey === key ? ' class="active"' : '';
    return '<a' + cls + ' href="' + href + '">' + label + '</a>';
  }

  function renderSiteNav(base, active) {
    return (
      '<nav>' +
        '<a class="nav-logo" href="' + base + 'index.html">' +
          '<img src="' + base + 'images/fravora.png" alt="Fravora logo" />' +
          '<span>Fravora</span>' +
        '</a>' +
        '<button class="nav-toggle" id="navToggleBtn" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="siteNav">☰</button>' +
        '<div class="nav-links" id="siteNav">' +
          navLink(active, 'home', base + 'index.html', 'Home') +
          navLink(active, 'features', base + 'features.html', 'Features') +
          navLink(active, 'how-it-works', base + 'how-it-works.html', 'How It Works') +
          navLink(active, 'download', base + 'download.html', 'Download') +
          navLink(active, 'blog', base + 'blog/index.html', 'Blog') +
          navLink(active, 'manual', base + 'manual.html', 'User Manual') +
          navLink(active, 'glossary', base + 'glossary.html', 'Glossary') +
          navLink(active, 'privacy', base + 'privacy.html', 'Privacy Policy') +
          navLink(active, 'data-deletion', base + 'data-deletion.html', 'Data Deletion') +
          navLink(active, 'release-notes', base + 'release-notes.html', 'Release Notes') +
          '<button class="theme-btn" id="themeBtn" title="Toggle theme" aria-label="Toggle theme">🌙</button>' +
        '</div>' +
      '</nav>'
    );
  }

  function renderManualTopNav() {
    return (
      '<nav class="topnav">' +
        '<a class="topnav-logo" href="index.html">' +
          '<img src="images/fravora.png" alt="Fravora" />' +
          '<span>Fravora</span>' +
        '</a>' +
        '<div class="topnav-links">' +
          '<a href="index.html">Home</a>' +
          '<a href="features.html">Features</a>' +
          '<a href="how-it-works.html">How It Works</a>' +
          '<a href="download.html">Download</a>' +
          '<a href="blog/index.html">Blog</a>' +
          '<a href="manual.html" class="active">User Manual</a>' +
          '<a href="privacy.html">Privacy Policy</a>' +
          '<a href="data-deletion.html">Data Deletion</a>' +
          '<a href="release-notes.html">Release Notes</a>' +
          '<button class="theme-btn" id="themeBtn" title="Toggle theme" aria-label="Toggle theme">🌙</button>' +
          '<button class="mobile-menu-btn" onclick="toggleSidebar()" id="menuBtn">☰ Menu</button>' +
        '</div>' +
      '</nav>'
    );
  }

  var siteMount = document.getElementById('siteNavMount');
  injectSharedLogoStyles();

  if (siteMount) {
    var base = siteMount.getAttribute('data-base') || '';
    var active = siteMount.getAttribute('data-active') || '';
    siteMount.outerHTML = renderSiteNav(base, active);
  }

  var manualMount = document.getElementById('manualTopNavMount');
  if (manualMount) {
    manualMount.outerHTML = renderManualTopNav();
  }

  wireThemeSync();
})();
