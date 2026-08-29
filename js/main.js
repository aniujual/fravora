document.addEventListener('DOMContentLoaded', function() {
  // Nav Toggle
  const navToggleBtn = document.getElementById('navToggleBtn');
  const navLinks = document.getElementById('siteNav');

  if (navToggleBtn && navLinks) {
    const closeNav = () => {
      navLinks.classList.remove('open');
      navToggleBtn.setAttribute('aria-expanded', 'false');
    };
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeNav());
    });
    document.addEventListener('click', (event) => {
      if (!navLinks.contains(event.target) && !navToggleBtn.contains(event.target)) {
        closeNav();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeNav();
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const btn = i.querySelector('.faq-q');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Tabs accessibility state
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => {
        const isActive = t === tab;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        t.tabIndex = isActive ? 0 : -1;
      });

      document.querySelectorAll('.screenshot-panel').forEach(panel => {
        const isActive = panel.id === `tab-${target}`;
        panel.classList.toggle('active', isActive);
      });
    });
  });
});
