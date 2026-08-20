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
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
});
