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
    if (!btn) return;

    var appliedTheme = document.documentElement.getAttribute('data-theme');
    updateThemeButtonIcon(btn, appliedTheme);

    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      updateThemeButtonIcon(btn, next);
    });
  }

  initializeThemeState();

  window.addEventListener('DOMContentLoaded', wireThemeSync);
})();
