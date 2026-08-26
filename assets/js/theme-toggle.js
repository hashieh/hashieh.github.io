(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var themeColor = document.getElementById('theme-color');
  var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme, persist) {
    var isDark = theme === 'dark';
    root.setAttribute('data-theme', theme);

    if (toggle) {
      toggle.textContent = isDark ? 'Light mode' : 'Dark mode';
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    if (themeColor) {
      themeColor.setAttribute('content', isDark ? '#121820' : '#ffffff');
    }

    if (persist) {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        // The theme still works when browser storage is unavailable.
      }
    }
  }

  setTheme(root.getAttribute('data-theme') || 'light', false);

  if (toggle) {
    toggle.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  }

  mediaQuery.addEventListener('change', function (event) {
    try {
      if (!localStorage.getItem('theme')) {
        setTheme(event.matches ? 'dark' : 'light', false);
      }
    } catch (error) {
      setTheme(event.matches ? 'dark' : 'light', false);
    }
  });
}());
