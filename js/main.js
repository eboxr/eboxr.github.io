(() => {
  'use strict';

  // Hash-routed virtual-page SPA: one section visible at a time, menu-driven.
  // Keeps the sticky header, custom mobile menu, and auto-year; replaces the
  // scroll-spy + IntersectionObserver with page-activation reveals (.reveal
  // elements stagger in when their page becomes active).

  const VALID_PAGES = ['home', 'about', 'services', 'card-wallet', 'team'];
  const TRANSITION_DURATION = 250; // matches @keyframes pageExit

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!header || !menuToggle || !mobileMenu) return;

  const mobileLinks = mobileMenu.querySelectorAll('a');
  const currentYear = document.getElementById('current-year');

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  let currentPage = null;
  let isNavigating = false;

  /* ---------- Router ---------- */

  const getPage = (name) =>
    document.querySelector(`.page[data-page="${name}"]`);

  const getPageFromHash = () => {
    const hash = location.hash.replace(/^#/, '');
    return VALID_PAGES.includes(hash) ? hash : 'home';
  };

  const updateNavActive = (pageName) => {
    document
      .querySelectorAll('.desktop-nav a[data-page], .mobile-menu a[data-page]')
      .forEach((link) => {
        link.classList.toggle('active', link.dataset.page === pageName);
      });
  };

  const showPageElements = (page) => {
    const els = page.querySelectorAll('.reveal');
    els.forEach((el) => {
      const delay = el.getAttribute('data-delay');
      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.classList.add('visible');
    });
  };

  const resetPageElements = (page) => {
    const els = page.querySelectorAll('.reveal');
    els.forEach((el) => {
      el.classList.remove('visible');
      el.style.transitionDelay = '';
    });
  };

  const activatePage = (page, pageName, { focusHeading = true } = {}) => {
    page.classList.add('page-active');
    currentPage = pageName;
    updateNavActive(pageName);
    showPageElements(page);
    window.scrollTo(0, 0);

    // Announce the new page to screen readers (without moving the scroll).
    if (focusHeading) {
      const heading = page.querySelector('h1, h2');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }
  };

  const navigateTo = (pageName) => {
    if (isNavigating || pageName === currentPage) return;
    const target = getPage(pageName);
    if (!target) return;

    if (location.hash !== `#${pageName}`) {
      history.pushState(null, '', `#${pageName}`);
    }

    const current = currentPage ? getPage(currentPage) : null;

    // Instant swap: reduced motion, or first activation (no page to exit).
    if (reducedMotion || !current) {
      if (current) {
        current.classList.remove('page-active');
        resetPageElements(current);
      }
      activatePage(target, pageName);
      return;
    }

    // Animated swap: fade current out, then activate target.
    isNavigating = true;
    current.classList.add('page-exiting');

    setTimeout(() => {
      current.classList.remove('page-active', 'page-exiting');
      resetPageElements(current);
      activatePage(target, pageName);
      isNavigating = false;
    }, TRANSITION_DURATION);
  };

  /* ---------- Click handlers ---------- */

  // Any element with data-page routes to that virtual page (nav links,
  // header CTA, mobile links, brand marks, hero buttons).
  document.querySelectorAll('[data-page]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      navigateTo(el.dataset.page);
    });
  });

  // Footer "Back to top" scrolls the current page to top (no page change).
  document.querySelectorAll('[data-scroll-top]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    });
  });

  // Back/forward navigation.
  window.addEventListener('hashchange', () => {
    navigateTo(getPageFromHash());
  });

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

  /* ---------- Sticky header (solidifies on intra-page scroll) ---------- */

  const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 16);
  };

  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------- Auto copyright year ---------- */

  if (currentYear) {
    const year = new Date().getFullYear();
    if (year > 2026) currentYear.textContent = String(year);
  }

  /* ---------- Initial load ---------- */

  if (
    !location.hash ||
    !VALID_PAGES.includes(location.hash.replace(/^#/, ''))
  ) {
    history.replaceState(null, '', '#home');
  }

  // Strip any server-rendered active state so activation is deterministic.
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.remove('page-active');
  });

  const initialPage = getPageFromHash();
  const initialEl = getPage(initialPage);
  if (initialEl) activatePage(initialEl, initialPage, { focusHeading: false });

  updateHeader();
})();
