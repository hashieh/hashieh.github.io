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

  function sortRecentUpdates() {
    var list = document.querySelector('.recent-updates__list');

    if (!list) {
      return;
    }

    var updates = Array.prototype.slice.call(list.querySelectorAll('.recent-update'));
    updates.sort(function (first, second) {
      var firstDate = first.querySelector('time').getAttribute('datetime');
      var secondDate = second.querySelector('time').getAttribute('datetime');
      return secondDate.localeCompare(firstDate);
    });

    updates.forEach(function (update) {
      list.appendChild(update);
    });
  }

  function limitRecentUpdates() {
    var list = document.querySelector('.recent-updates__list');

    if (!list) {
      return;
    }

    var updates = Array.prototype.slice.call(list.querySelectorAll('.recent-update'));
    list.classList.remove('is-scrollable');
    list.style.maxHeight = '';

    if (updates.length <= 4) {
      return;
    }

    list.classList.add('is-scrollable');
    var visibleHeight = updates.slice(0, 4).reduce(function (height, update) {
      return height + update.getBoundingClientRect().height;
    }, 0);
    list.style.maxHeight = Math.ceil(visibleHeight) + 'px';
  }

  function openLinksInNewTabs() {
    var links = document.querySelectorAll('a[href]');

    links.forEach(function (link) {
      if (link.getAttribute('href').charAt(0) === '#') {
        return;
      }

      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    });
  }

  setTheme(root.getAttribute('data-theme') || 'light', false);
  sortRecentUpdates();
  limitRecentUpdates();
  openLinksInNewTabs();

  window.addEventListener('resize', limitRecentUpdates);

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
