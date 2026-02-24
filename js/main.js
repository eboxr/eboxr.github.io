'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const VALID_PAGES = ['home', 'about', 'card-wallet', 'team'];
  const PAGE_ALIASES = { services: 'about' };
  const TRANSITION_DURATION = 300; // ms — matches pageExit animation
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let isNavigating = false;
  let currentPage = null;

  // ---- Helpers ----

  function getPage(name) {
    return document.querySelector(`.page[data-page="${name}"]`);
  }

  function getPageFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (PAGE_ALIASES[hash]) return PAGE_ALIASES[hash];
    return VALID_PAGES.includes(hash) ? hash : 'home';
  }

  function activatePage(page, pageName) {
    page.classList.add('page-active');
    currentPage = pageName;
    updateNavActive(pageName);
    showPageElements(page);
    window.scrollTo(0, 0);

    // Focus first heading for screen reader announcement
    const heading = page.querySelector('h1, h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  // ---- 1. Hash Router ----

  function navigateTo(pageName) {
    if (isNavigating || pageName === currentPage) return;

    const target = getPage(pageName);
    if (!target) return;

    const current = currentPage ? getPage(currentPage) : null;

    if (window.location.hash !== `#${pageName}`) {
      history.pushState(null, '', `#${pageName}`);
    }

    if (reducedMotion || !current) {
      if (current) {
        current.classList.remove('page-active', 'page-entering');
      }
      activatePage(target, pageName);
      return;
    }

    isNavigating = true;
    current.classList.add('page-exiting');

    setTimeout(() => {
      current.classList.remove('page-active', 'page-exiting', 'page-entering');
      resetPageElements(current);

      target.classList.add('page-entering');
      activatePage(target, pageName);

      const unlock = () => {
        target.classList.remove('page-entering');
        isNavigating = false;
        target.removeEventListener('animationend', unlock);
        clearTimeout(fallback);
      };
      target.addEventListener('animationend', unlock);
      // Safety fallback if animationend never fires
      const fallback = setTimeout(unlock, 500);
    }, TRANSITION_DURATION);
  }

  function showPageElements(page) {
    page.querySelectorAll('.page-enter-animate').forEach((el, i) => {
      const delay = parseInt(el.dataset.delay, 10) || (i * 100);
      if (reducedMotion) {
        el.classList.add('animated');
      } else {
        setTimeout(() => {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('animated');
        }, 50);
      }
    });
  }

  function resetPageElements(page) {
    page.querySelectorAll('.page-enter-animate').forEach((el) => {
      el.classList.remove('animated');
      el.style.transitionDelay = '';
    });
  }

  function updateNavActive(pageName) {
    document.querySelectorAll('.nav-link[data-page], .dropdown-item[data-page]').forEach((link) => {
      link.classList.remove('page-active');
    });

    const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (activeLink) activeLink.classList.add('page-active');

    const appsDropdown = document.getElementById('appsDropdown');
    if (appsDropdown) {
      const dropdownItem = document.querySelector(`.dropdown-item[data-page="${pageName}"]`);
      appsDropdown.classList.toggle('page-active', !!dropdownItem);
      if (dropdownItem) dropdownItem.classList.add('page-active');
    }
  }

  // ---- 2. Navigation Events ----

  document.querySelectorAll('.nav-link[data-page], .dropdown-item[data-page], .navbar-brand[data-page]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.page);
    });
  });

  document.querySelectorAll('.nav-page-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = link.getAttribute('href').replace('#', '');
      if (VALID_PAGES.includes(hash)) navigateTo(hash);
    });
  });

  window.addEventListener('hashchange', () => navigateTo(getPageFromHash()));

  // Prevent placeholder href="#" links from changing the hash
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    if (!link.dataset.page && !link.dataset.bsToggle) {
      link.addEventListener('click', (e) => e.preventDefault());
    }
  });

  // ---- 3. Initial Load ----

  if (!window.location.hash || !VALID_PAGES.includes(window.location.hash.replace('#', ''))) {
    history.replaceState(null, '', '#home');
  }

  document.querySelectorAll('.page').forEach((p) => p.classList.remove('page-active'));

  const initialPage = getPageFromHash();
  const initialTarget = getPage(initialPage);
  if (initialTarget) activatePage(initialTarget, initialPage);

  // ---- 4. Mobile Nav Close ----

  const navbarCollapse = document.getElementById('navbarNav');

  if (navbarCollapse && typeof bootstrap !== 'undefined') {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });

    navbarCollapse.querySelectorAll('.nav-link, .dropdown-item').forEach((link) => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) bsCollapse.hide();
      });
    });
  }

});
