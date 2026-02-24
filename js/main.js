'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');

  if (navbar) {
    const handleNavbarScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  }

  // ---- 2. ScrollSpy: Apps Dropdown ----
  const appsDropdownToggle = document.querySelector('#navbarNav .dropdown-toggle');
  const appSections = document.querySelectorAll('.app-section');

  if (appsDropdownToggle) {
    const visibleSections = new Set();

    const appObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visibleSections[entry.isIntersecting ? 'add' : 'delete'](entry.target);
      });
      appsDropdownToggle.classList.toggle('active', visibleSections.size > 0);
    }, { threshold: 0.1 });

    appSections.forEach((section) => appObserver.observe(section));
  }

  // ---- 3. Scroll Animations ----
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.delay) el.style.transitionDelay = `${el.dataset.delay}ms`;
      el.classList.add('animated');
      scrollObserver.unobserve(el);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach((el) => scrollObserver.observe(el));

  // ---- 4. Mobile Nav Close ----
  const navbarCollapse = document.getElementById('navbarNav');

  if (navbarCollapse && typeof bootstrap !== 'undefined') {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });

    navbarCollapse.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) bsCollapse.hide();
      });
    });
  }

  // ---- 5. Contact Form Handler ----
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      contactForm.querySelectorAll('.form-control').forEach((field) => {
        field.classList.remove('is-invalid', 'is-valid');
      });

      let isValid = true;

      contactForm.querySelectorAll('[required]').forEach((field) => {
        const filled = field.value.trim().length > 0;
        field.classList.add(filled ? 'is-valid' : 'is-invalid');
        if (!filled) isValid = false;
      });

      const emailField = document.getElementById('email');
      if (emailField && emailField.value.trim() && !emailRegex.test(emailField.value.trim())) {
        emailField.classList.replace('is-valid', 'is-invalid');
        isValid = false;
      }

      if (!isValid) return;

      // Show placeholder success message, then restore the form
      const savedHTML = contactForm.innerHTML;

      contactForm.innerHTML = `
        <div class="text-center py-4" role="alert" aria-live="polite">
          <i class="bi bi-check-circle-fill gradient-text display-4 mb-3 d-block"></i>
          <h4 class="fw-bold mb-2">Message Sent!</h4>
          <p class="text-muted mb-0">Thanks for reaching out. We'll get back to you soon.</p>
        </div>
      `;

      setTimeout(() => {
        contactForm.innerHTML = savedHTML;
        contactForm.reset();
      }, 3000);
    });
  }

});
