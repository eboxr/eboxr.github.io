'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const VALID_PAGES = ['home', 'about', 'services', 'card-wallet', 'team'];
  const TRANSITION_DURATION = 300; // ms — matches pageExit animation
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let isNavigating = false;
  let currentPage = null;

  // ---- 1. Hash Router ----

  function getPageFromHash() {
    const hash = window.location.hash.replace('#', '');
    return VALID_PAGES.includes(hash) ? hash : 'home';
  }

  function navigateTo(pageName) {
    if (isNavigating || pageName === currentPage) return;

    const target = document.querySelector(`.page[data-page="${pageName}"]`);
    if (!target) return;

    const current = currentPage
      ? document.querySelector(`.page[data-page="${currentPage}"]`)
      : null;

    // Update hash without triggering hashchange handler
    if (window.location.hash !== `#${pageName}`) {
      history.pushState(null, '', `#${pageName}`);
    }

    if (reducedMotion || !current) {
      // Instant swap
      if (current) {
        current.classList.remove('page-active', 'page-entering');
      }
      target.classList.add('page-active');
      currentPage = pageName;
      updateNavActive(pageName);
      showPageElements(target);
      window.scrollTo(0, 0);
      return;
    }

    // Animated transition
    isNavigating = true;
    current.classList.add('page-exiting');

    setTimeout(() => {
      current.classList.remove('page-active', 'page-exiting', 'page-entering');
      resetPageElements(current);

      target.classList.add('page-active', 'page-entering');
      currentPage = pageName;
      updateNavActive(pageName);
      showPageElements(target);
      window.scrollTo(0, 0);

      // Clean up entering class after animation completes
      const onEnd = () => {
        target.classList.remove('page-entering');
        isNavigating = false;
        target.removeEventListener('animationend', onEnd);
      };
      target.addEventListener('animationend', onEnd);
    }, TRANSITION_DURATION);
  }

  function showPageElements(page) {
    const elements = page.querySelectorAll('.page-enter-animate');
    elements.forEach((el, i) => {
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
    // Remove active from all nav links
    document.querySelectorAll('[data-page]').forEach((link) => {
      if (link.classList.contains('nav-link') || link.classList.contains('dropdown-item')) {
        link.classList.remove('page-active');
      }
    });

    // Set active on matching nav link
    const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (activeLink) {
      activeLink.classList.add('page-active');
    }

    // Handle Apps dropdown: highlight toggle when a dropdown page is active
    const appsDropdown = document.getElementById('appsDropdown');
    if (appsDropdown) {
      const dropdownItem = document.querySelector(`.dropdown-item[data-page="${pageName}"]`);
      appsDropdown.classList.toggle('page-active', !!dropdownItem);
      if (dropdownItem) {
        dropdownItem.classList.add('page-active');
      }
    }
  }

  // ---- 2. Navigation Events ----

  // Nav links and dropdown items with data-page
  document.querySelectorAll('[data-page]').forEach((link) => {
    // Skip page sections (only handle nav elements)
    if (link.tagName === 'SECTION') return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) navigateTo(page);
    });
  });

  // CTA buttons with nav-page-link class
  document.querySelectorAll('.nav-page-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = link.getAttribute('href').replace('#', '');
      if (VALID_PAGES.includes(hash)) navigateTo(hash);
    });
  });

  // Browser back/forward
  window.addEventListener('hashchange', () => {
    const page = getPageFromHash();
    navigateTo(page);
  });

  // ---- 3. Initial Load ----

  const initialPage = getPageFromHash();

  // Ensure hash is set
  if (!window.location.hash || !VALID_PAGES.includes(window.location.hash.replace('#', ''))) {
    history.replaceState(null, '', '#home');
  }

  // Remove default page-active from HTML (in case hash differs)
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('page-active'));

  const initialTarget = document.querySelector(`.page[data-page="${initialPage}"]`);
  if (initialTarget) {
    initialTarget.classList.add('page-active');
    currentPage = initialPage;
    updateNavActive(initialPage);
    showPageElements(initialTarget);
  }

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
