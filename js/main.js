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
  // Highlight the Apps dropdown toggle when any .app-section is in the viewport
  const appsDropdownToggle = document.querySelector('#navbarNav .dropdown-toggle');
  const appSections = document.querySelectorAll('.app-section');

  if (appsDropdownToggle && appSections.length > 0) {
    const visibleSections = new Set();

    const appObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target);
        } else {
          visibleSections.delete(entry.target);
        }
      });
      appsDropdownToggle.classList.toggle('active', visibleSections.size > 0);
    }, { threshold: 0.1 });

    appSections.forEach((section) => appObserver.observe(section));
  }

  // ---- 3. Scroll Animations ----
  // Trigger .animated class on .animate-on-scroll elements when they enter the viewport
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay;
          if (delay) {
            el.style.transitionDelay = `${delay}ms`;
          }
          el.classList.add('animated');
          scrollObserver.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach((el) => scrollObserver.observe(el));
  }

  // ---- 4. Mobile Nav Close ----
  // Collapse the hamburger menu when a nav link is clicked on mobile
  const navbarCollapse = document.getElementById('navbarNav');

  if (navbarCollapse && typeof bootstrap !== 'undefined') {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {
      toggle: false,
    });

    navbarCollapse.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // ---- 5. Contact Form Handler ----
  // Client-side validation with placeholder success feedback (no backend)
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset previous validation state
      contactForm.querySelectorAll('.form-control').forEach((field) => {
        field.classList.remove('is-invalid', 'is-valid');
      });

      let isValid = true;

      // Validate all required fields
      contactForm.querySelectorAll('[required]').forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          isValid = false;
        } else {
          field.classList.add('is-valid');
        }
      });

      // Validate email format
      const emailField = document.getElementById('email');
      if (emailField && emailField.value.trim() && !emailRegex.test(emailField.value.trim())) {
        emailField.classList.replace('is-valid', 'is-invalid');
        isValid = false;
      }

      if (!isValid) return;

      // Show success message (placeholder — no backend call)
      contactForm.innerHTML = `
        <div class="text-center py-4" role="alert" aria-live="polite">
          <i class="bi bi-check-circle-fill gradient-text display-4 mb-3 d-block"></i>
          <h4 class="fw-bold mb-2">Message Sent!</h4>
          <p class="text-muted mb-0">Thanks for reaching out. We'll get back to you soon.</p>
        </div>
      `;

      // Reset form and restore after 3 seconds
      setTimeout(() => {
        location.reload();
      }, 3000);
    });
  }

});
