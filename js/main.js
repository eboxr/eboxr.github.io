'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ---- 2. ScrollSpy: Apps Dropdown ----
  const appsDropdown = document.getElementById('appsDropdown');
  const appSections = document.querySelectorAll('.app-section');

  if (appsDropdown && appSections.length > 0) {
    const appObserver = new IntersectionObserver((entries) => {
      const anyVisible = entries.some((entry) => entry.isIntersecting);
      appsDropdown.classList.toggle('active', anyVisible);
    }, { threshold: 0.2 });

    appSections.forEach((section) => appObserver.observe(section));
  }

  // ---- 3. Scroll Animations ----
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
  const navbarCollapse = document.getElementById('navbarNav');

  if (navbarCollapse) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {
      toggle: false
    });

    navbarCollapse.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // ---- 5. Contact Form ----
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset validation
      contactForm.querySelectorAll('.glass-input').forEach((input) => {
        input.classList.remove('is-invalid', 'is-valid');
      });

      let isValid = true;

      // Validate required fields
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
      if (emailField.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.remove('is-valid');
        emailField.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        contactForm.classList.add('d-none');
        formSuccess.classList.remove('d-none');

        setTimeout(() => {
          contactForm.reset();
          contactForm.querySelectorAll('.glass-input').forEach((input) => {
            input.classList.remove('is-valid');
          });
          contactForm.classList.remove('d-none');
          formSuccess.classList.add('d-none');
        }, 3000);
      }
    });
  }

});
