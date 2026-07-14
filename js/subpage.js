(() => {
  'use strict';

  // Lightweight behavior for the standalone card-wallet sub-pages
  // (privacy-policy.html, support.html). Mirrors the main site's header,
  // mobile menu, sticky-on-scroll, back-to-top, reveal-on-scroll, and
  // auto-year — but deliberately WITHOUT the SPA hash router from main.js.
  //
  // Why not main.js: main.js is a hash router that calls
  // history.replaceState('#home') on load and toggles .page sections. These
  // pages are standalone documents whose URLs are registered verbatim with
  // the App Store, so the URL must stay clean (no #home hash appended) and
  // there are no .page sections to route between.

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!header || !menuToggle || !mobileMenu) return;

  const mobileLinks = mobileMenu.querySelectorAll('a');
  const currentYear = document.getElementById('current-year');

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ---------- Mobile menu ---------- */

  const setMenuState = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    mobileMenu.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  const closeMenu = () => setMenuState(false);

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  /* ---------- Sticky header (solidifies on scroll) ---------- */

  const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 16);
  };

  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------- Back to top (footer link) ---------- */

  document.querySelectorAll('[data-scroll-top]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    });
  });

  /* ---------- Reveal on scroll ---------- */

  const reveals = document.querySelectorAll('.reveal');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay');
            if (delay) entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  /* ---------- Auto copyright year ---------- */

  if (currentYear) {
    const year = new Date().getFullYear();
    if (year > 2026) currentYear.textContent = String(year);
  }

  updateHeader();
})();
