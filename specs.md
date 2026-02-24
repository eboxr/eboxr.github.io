# eBoxr.com — Technical Specifications

Source of truth: `plan.md` (read-only)

---

## CDN Dependencies

```html
<!-- Bootstrap 5.3.8 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
      crossorigin="anonymous">

<!-- Bootstrap Icons 1.13.1 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
      rel="stylesheet">

<!-- Google Fonts: Inter (400, 500, 600, 700) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet">

<!-- Bootstrap 5.3.8 JS Bundle (includes Popper) — before </body> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
```

---

## File Structure

```
eboxr.com/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── images/
├── plan.md
└── specs.md
```

---

## Global Requirements

- `<html lang="en" data-bs-theme="dark">`
- Viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Single-page layout with smooth-scroll sections (`scroll-behavior: smooth` on `html`)
- All sections use semantic HTML5 elements
- Skip-nav link as first element in `<body>`
- `prefers-reduced-motion` disables all animations and transitions

---

## Section 1: Navigation

### HTML Structure
```
<a class="skip-nav" href="#main">Skip to content</a>
<nav class="navbar navbar-expand-lg fixed-top glass-nav" id="navbar">
  <div class="container">
    <a class="navbar-brand" href="#">
      <span class="gradient-text">e</span>Boxr
    </a>
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false"
            aria-label="Toggle navigation">
      <i class="bi bi-list"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li><a class="nav-link" href="#about">About</a></li>
        <li><a class="nav-link" href="#services">Services</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button"
             data-bs-toggle="dropdown" aria-expanded="false">Apps</a>
          <ul class="dropdown-menu glass-dropdown">
            <li><a class="dropdown-item" href="#card-wallet">Card Wallet</a></li>
          </ul>
        </li>
        <li><a class="nav-link" href="#team">Team</a></li>
        <li><a class="nav-link" href="#contact">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>
```

### CSS Classes
- `.glass-nav`: transparent background, no border initially
- `.glass-nav.scrolled`: `backdrop-filter: blur(12px)`, semi-transparent bg, subtle border-bottom
- `.glass-dropdown`: frosted dropdown matching nav, dark bg with blur
- `.skip-nav`: visually hidden, appears on focus

### JavaScript
- Scroll listener adds `.scrolled` to `#navbar` when `window.scrollY > 50`
- ScrollSpy: highlight Apps dropdown when any `.app-section` is in viewport
- Mobile: collapse hamburger on nav-link click

### Accessibility
- `aria-label="Toggle navigation"` on hamburger button
- `aria-expanded` managed by Bootstrap collapse
- Skip-nav link as first focusable element
- All links keyboard-navigable

### Responsive
- `navbar-expand-lg`: hamburger below 992px
- Dropdown works on mobile via Bootstrap collapse

### Acceptance Criteria
- [ ] Navbar transparent at top, frosted on scroll
- [ ] Logo shows gradient "e"
- [ ] All 5 nav links present and scroll to correct sections
- [ ] Apps dropdown shows Card Wallet
- [ ] Hamburger appears on mobile and collapses nav
- [ ] Skip-nav link visible on keyboard focus

---

## Section 2: Hero

### HTML Structure
```
<section class="hero-section" id="hero">
  <div class="hero-bg"></div>
  <div class="hero-orb hero-orb-1"></div>
  <div class="hero-orb hero-orb-2"></div>
  <div class="hero-orb hero-orb-3"></div>
  <div class="container position-relative">
    <div class="row justify-content-center text-center">
      <div class="col-lg-8">
        <h1 class="display-3 fw-bold mb-4">
          We build apps that <span class="gradient-text">matter.</span>
        </h1>
        <p class="lead text-muted mb-5">
          A small team crafting thoughtful iOS and web applications.
        </p>
        <div class="d-flex gap-3 justify-content-center flex-wrap">
          <a href="#apps" class="btn btn-cta btn-lg">See Our Work</a>
          <a href="#contact" class="btn btn-outline-light btn-lg">Get in Touch</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS Classes
- `.hero-section`: `min-height: 100vh`, `display: flex`, `align-items: center`, `position: relative`, `overflow: hidden`
- `.hero-bg`: `position: absolute`, full-size, animated gradient background (`@keyframes gradientShift`)
- `.hero-orb`: large blurred circles (`border-radius: 50%`, `filter: blur(80px)`), positioned absolutely, animated with `@keyframes float`
- `.hero-orb-1`: blue, top-left area
- `.hero-orb-2`: cyan, bottom-right area
- `.hero-orb-3`: orange/amber, center-bottom area
- `.gradient-text`: blue-to-cyan gradient text
- `.btn-cta`: orange gradient button

### JavaScript
- None directly (animations are CSS-only)

### Accessibility
- Decorative orbs are CSS pseudo-elements or `aria-hidden="true"`
- Semantic `<section>` with visible heading

### Responsive
- Mobile: reduce heading size, stack CTA buttons vertically
- `prefers-reduced-motion`: disable gradientShift and float animations
- Mobile: hide or reduce orbs opacity

### Acceptance Criteria
- [ ] Full-viewport height hero
- [ ] Animated gradient background
- [ ] 3 floating orbs visible on desktop
- [ ] Headline with gradient "matter." text
- [ ] Two CTA buttons: orange "See Our Work", outline "Get in Touch"
- [ ] Both buttons scroll to correct sections

---

## Section 3: About

### HTML Structure
```
<section class="py-5" id="about">
  <div class="container">
    <div class="row align-items-center g-5">
      <div class="col-lg-6 animate-on-scroll">
        <h2 class="display-5 fw-bold mb-4">About <span class="gradient-text">eBoxr</span></h2>
        <p class="text-muted">Small team, big ambitions. We're Stephanie and Nicolas...</p>
        <p class="text-muted">We focus on quality over quantity...</p>
      </div>
      <div class="col-lg-6 animate-on-scroll" data-delay="200">
        <div class="glass-card p-4">
          <div class="row text-center g-4">
            <div class="col-6">
              <h3 class="gradient-text display-6 fw-bold">2</h3>
              <p class="text-muted mb-0">Developers</p>
            </div>
            <div class="col-6">
              <h3 class="gradient-text display-6 fw-bold">iOS</h3>
              <p class="text-muted mb-0">& Web</p>
            </div>
            <div class="col-6">
              <h3 class="gradient-text display-6 fw-bold">100%</h3>
              <p class="text-muted mb-0">Passion</p>
            </div>
            <div class="col-6">
              <i class="bi bi-heart-fill gradient-text display-6"></i>
              <p class="text-muted mb-0">Quality Focus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS Classes
- `.glass-card`: glassmorphism card with backdrop-filter, semi-transparent bg, border
- `.animate-on-scroll`: initially `opacity: 0` + `translateY(30px)`, animated when in viewport
- `data-delay`: configurable delay for staggered animations

### JavaScript
- IntersectionObserver triggers `.animated` class on `.animate-on-scroll` elements

### Acceptance Criteria
- [ ] Two-column layout on desktop, stacked on mobile
- [ ] Glass card with 4 stats
- [ ] Fade-in animation on scroll
- [ ] Staggered animation delay on stats card

---

## Section 4: Services

### HTML Structure
```
<section class="py-5" id="services">
  <div class="container">
    <div class="text-center mb-5 animate-on-scroll">
      <h2 class="display-5 fw-bold">What We <span class="gradient-text">Do</span></h2>
      <p class="text-muted">From concept to App Store — we handle it all.</p>
    </div>
    <div class="row g-4">
      <!-- Repeat 3x -->
      <div class="col-md-4 animate-on-scroll" data-delay="N">
        <div class="glass-card service-card p-4 text-center h-100">
          <i class="bi bi-phone display-4 gradient-text mb-3"></i>
          <h3 class="h5 fw-bold">iOS Development</h3>
          <p class="text-muted mb-0">Native Swift apps for iPhone and iPad...</p>
        </div>
      </div>
      <!-- Icons: bi-phone, bi-globe, bi-palette -->
    </div>
  </div>
</section>
```

### CSS Classes
- `.service-card::before`: gradient top-border (`height: 3px`, `scaleX(0)` → `scaleX(1)` on hover)
- `.service-card`: extends `.glass-card` with hover transition

### Acceptance Criteria
- [ ] Three cards in a row on desktop, stacked on mobile
- [ ] Each card: icon, title, description
- [ ] Gradient top-border appears on hover
- [ ] Staggered scroll animation

---

## Section 5: Apps / Portfolio (Card Wallet)

### HTML Structure
```
<section class="py-5" id="apps">
  <div class="container">
    <div class="text-center mb-5 animate-on-scroll">
      <h2 class="display-5 fw-bold">Our <span class="gradient-text">Apps</span></h2>
    </div>
    <div class="row align-items-center g-5 app-section" id="card-wallet">
      <div class="col-lg-6 animate-on-scroll">
        <div class="glass-card p-4 text-center">
          <div class="app-screenshot-placeholder">
            <i class="bi bi-phone display-1 text-muted"></i>
            <p class="text-muted mt-2 mb-0">Screenshot coming soon</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 animate-on-scroll" data-delay="200">
        <span class="badge bg-primary mb-3">
          <i class="bi bi-apple"></i> iOS
        </span>
        <h3 class="h2 fw-bold">Card Wallet</h3>
        <p class="text-muted">Your Apple Wallet management companion...</p>
        <ul class="list-unstyled">
          <li class="mb-2"><i class="bi bi-check-circle gradient-text me-2"></i> Feature 1</li>
          <li class="mb-2"><i class="bi bi-check-circle gradient-text me-2"></i> Feature 2</li>
          <li class="mb-2"><i class="bi bi-check-circle gradient-text me-2"></i> Feature 3</li>
        </ul>
        <a href="#" class="btn btn-cta">
          <i class="bi bi-apple me-2"></i>App Store
        </a>
      </div>
    </div>
  </div>
</section>
```

### Notes
- Each app gets its own `id` for nav dropdown linking
- Future apps alternate layout with `flex-lg-row-reverse` on the row
- `.app-section` class for ScrollSpy detection

### Acceptance Criteria
- [ ] Image left, text right (desktop)
- [ ] iOS badge, title, description, feature checklist, CTA
- [ ] Glass card frame around screenshot placeholder
- [ ] Nav dropdown "Card Wallet" scrolls to `#card-wallet`

---

## Section 6: Team

### HTML Structure
```
<section class="py-5" id="team">
  <div class="container">
    <div class="text-center mb-5 animate-on-scroll">
      <h2 class="display-5 fw-bold">Meet the <span class="gradient-text">Team</span></h2>
    </div>
    <div class="row g-4 justify-content-center">
      <!-- Repeat 2x: Stephanie, Nicolas -->
      <div class="col-md-6 col-lg-5 animate-on-scroll" data-delay="N">
        <div class="glass-card p-4 text-center">
          <div class="avatar-placeholder mx-auto mb-3">
            <i class="bi bi-person-fill display-4"></i>
          </div>
          <h3 class="h5 fw-bold">Stephanie</h3>
          <p class="text-muted mb-3">iOS Developer & Designer</p>
          <p class="text-muted small">Bio text here...</p>
          <div class="d-flex justify-content-center gap-3">
            <a href="#" class="social-link" aria-label="GitHub">
              <i class="bi bi-github"></i>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <i class="bi bi-linkedin"></i>
            </a>
            <a href="#" class="social-link" aria-label="Portfolio">
              <i class="bi bi-globe"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS Classes
- `.avatar-placeholder`: `width: 80px`, `height: 80px`, `border-radius: 50%`, gradient background, centered icon
- `.social-link`: icon link with hover gradient color

### Acceptance Criteria
- [ ] Two profile cards side by side on desktop
- [ ] Each card: avatar, name, role, bio, 3 social links
- [ ] Social links have `aria-label` for accessibility
- [ ] All portfolio URLs are `#` placeholders

---

## Section 7: Contact

### HTML Structure
```
<section class="py-5" id="contact">
  <div class="container">
    <div class="row g-5">
      <div class="col-lg-5 animate-on-scroll">
        <h2 class="display-5 fw-bold mb-4">Get in <span class="gradient-text">Touch</span></h2>
        <p class="text-muted mb-4">Have a project in mind? We'd love to hear from you.</p>
        <div class="mb-3">
          <i class="bi bi-envelope gradient-text me-2"></i>
          <a href="mailto:hello@eboxr.com" class="text-muted">hello@eboxr.com</a>
        </div>
        <div class="mb-3">
          <i class="bi bi-geo-alt gradient-text me-2"></i>
          <span class="text-muted">Remote — Worldwide</span>
        </div>
      </div>
      <div class="col-lg-7 animate-on-scroll" data-delay="200">
        <div class="glass-card p-4">
          <form id="contact-form" novalidate>
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control glass-input" id="name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control glass-input" id="email" required>
            </div>
            <div class="mb-3">
              <label for="subject" class="form-label">Subject</label>
              <input type="text" class="form-control glass-input" id="subject" required>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">Message</label>
              <textarea class="form-control glass-input" id="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-cta w-100">
              Send Message <i class="bi bi-arrow-right ms-2"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS Classes
- `.glass-input`: dark transparent bg, `border: 1px solid var(--color-border)`, blue focus ring (`box-shadow`)

### JavaScript
- Client-side validation on submit (check `required` fields, email format)
- On valid submit: show success toast/message, reset form
- No backend — placeholder behavior only

### Acceptance Criteria
- [ ] Left: email and location info
- [ ] Right: glass card with 4-field form
- [ ] All inputs have proper labels
- [ ] Validation feedback on submit
- [ ] Success message after "submission"

---

## Section 8: Footer

### HTML Structure
```
<footer class="py-4 border-top" style="border-color: var(--color-border) !important">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-4">
        <span class="navbar-brand">
          <span class="gradient-text">e</span>Boxr
        </span>
      </div>
      <div class="col-md-4 text-center">
        <p class="text-muted mb-0">&copy; 2026 eBoxr. All rights reserved.</p>
      </div>
      <div class="col-md-4 text-end">
        <a href="#" class="social-link me-3" aria-label="GitHub"><i class="bi bi-github"></i></a>
        <a href="#" class="social-link me-3" aria-label="X"><i class="bi bi-twitter-x"></i></a>
        <a href="#" class="social-link" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
      </div>
    </div>
  </div>
</footer>
```

### Acceptance Criteria
- [ ] Three columns: logo, copyright, social icons
- [ ] Social links have `aria-label`
- [ ] Copyright shows 2026
