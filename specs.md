# eBoxr.com — Technical Specifications

> **Contract for all agents.** Changes require @pm approval.
> Source of truth: `plan.md` (read-only). This is a static site — no backend, no API.

---

## Table of Contents

1. [File Structure](#file-structure)
2. [CDN Dependencies](#cdn-dependencies)
3. [Color Palette & CSS Custom Properties](#color-palette--css-custom-properties)
4. [Global Accessibility Requirements](#global-accessibility-requirements)
5. [Section Specs](#section-specs)
   - [1. Navigation](#1-navigation)
   - [2. Hero](#2-hero)
   - [3. About](#3-about)
   - [4. Services](#4-services)
   - [5. Apps / Portfolio](#5-apps--portfolio)
   - [6. Team](#6-team)
   - [7. Contact](#7-contact)
   - [8. Footer](#8-footer)
6. [JavaScript Modules (main.js)](#javascript-modules-mainjs)
7. [CSS Architecture (style.css)](#css-architecture-stylecss)

---

## File Structure

```
eboxr.com/
├── index.html              (~450 lines)
├── css/
│   └── style.css           (~350 lines)
├── js/
│   └── main.js             (~120 lines)
├── assets/
│   └── images/             (empty placeholder directory)
├── plan.md                 (read-only source of truth)
└── specs.md                (this file)
```

**`index.html`** — Single-page application shell. All sections live here as `<section>` elements. Uses Bootstrap 5.3.8 dark mode (`data-bs-theme="dark"` on `<html>`).

**`css/style.css`** — Custom styles layered on top of Bootstrap. Contains CSS variables, glassmorphism utilities, animation keyframes, and responsive overrides.

**`js/main.js`** — Five discrete JS modules (no frameworks, no build tools). Loaded as a deferred `<script>` at bottom of `<body>`.

**`assets/images/`** — Empty directory. Reserved for logos, app screenshots. No images in initial build.

---

## CDN Dependencies

All CDN links must appear **exactly** as listed below with these integrity hashes and crossorigin attributes.

### CSS (in `<head>`, before `css/style.css`)

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
```

### JavaScript (at end of `<body>`, before `js/main.js`)

```html
<!-- Bootstrap 5.3.8 JS Bundle (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>

<!-- Custom JS -->
<script src="js/main.js" defer></script>
```

### Custom stylesheet (last CSS link in `<head>`)

```html
<link rel="stylesheet" href="css/style.css">
```

---

## Color Palette & CSS Custom Properties

All custom properties are declared on `:root` in `css/style.css`.

| CSS Variable          | Value                                       | Usage                          |
|-----------------------|---------------------------------------------|--------------------------------|
| `--color-bg`          | `#0a0e27`                                   | `<body>` background            |
| `--color-surface`     | `rgba(15, 23, 42, 0.60)`                    | Glass card backgrounds         |
| `--color-border`      | `rgba(255, 255, 255, 0.08)`                 | Glass card borders             |
| `--color-primary`     | `#3b82f6`                                   | Primary blue (links, icons)    |
| `--color-accent`      | `#06b6d4`                                   | Cyan accent                    |
| `--color-cta`         | `#f97316`                                   | Orange CTA buttons             |
| `--color-cta-hover`   | `#fb923c`                                   | CTA hover state                |
| `--gradient-primary`  | `linear-gradient(135deg, #3b82f6, #06b6d4)` | Blue-to-cyan gradient          |
| `--gradient-cta`      | `linear-gradient(135deg, #f97316, #f59e0b)` | Orange-to-amber gradient       |
| `--color-text`        | `#e2e8f0`                                   | Body text                      |
| `--color-text-muted`  | `#94a3b8`                                   | Secondary / muted text         |

**Typography:** `font-family: 'Inter', sans-serif` on `body`. Weights: 400 (body), 500 (labels), 600 (subheadings), 700 (headings).

---

## Global Accessibility Requirements

These apply to the entire page and every section:

| Requirement | Implementation |
|-------------|----------------|
| Skip navigation | First focusable element: `<a href="#main-content" class="visually-hidden-focusable">Skip to main content</a>` placed before `<nav>` |
| Semantic structure | `<nav>`, `<main id="main-content">`, `<section>`, `<footer>` — never use `<div>` for structural landmarks |
| ARIA labels on icon-only links | All links containing only an icon (`<i class="bi-...">`) must have `aria-label="[description]"` |
| Focus visible | Custom `:focus-visible` outline: `2px solid var(--color-primary)`, `outline-offset: 3px` |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all CSS animations and transitions; JS IntersectionObserver skips delays (adds `.animated` immediately) |
| Color contrast | WCAG AA: body text (`#e2e8f0` on `#0a0e27`) ≥ 4.5:1; large text ≥ 3:1 |
| Form labels | Every form input has an associated `<label>` with matching `for`/`id` pair |
| Keyboard navigation | All interactive elements reachable and operable by keyboard; no keyboard traps |
| Language | `<html lang="en" data-bs-theme="dark">` |
| Page title | `<title>eBoxr — We build apps that matter</title>` |
| Viewport meta | `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Meta description | `<meta name="description" content="eBoxr is a two-person iOS and web app development studio building apps that matter.">` |
| Smooth scroll | `scroll-behavior: smooth` on `html` element |

---

## Section Specs

---

### 1. Navigation

#### HTML Structure

```html
<a href="#main-content" class="visually-hidden-focusable">Skip to main content</a>

<nav class="navbar navbar-expand-lg glass-nav fixed-top" id="mainNav" aria-label="Main navigation">
  <div class="container">

    <!-- Brand / Logo -->
    <a class="navbar-brand" href="#hero">
      <span class="gradient-text">e</span>Boxr
    </a>

    <!-- Mobile toggle -->
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Collapsible nav links -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto align-items-lg-center">

        <li class="nav-item">
          <a class="nav-link" href="#about">About</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#services">Services</a>
        </li>

        <!-- Apps dropdown -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#apps"
             id="appsDropdown"
             role="button"
             data-bs-toggle="dropdown"
             aria-expanded="false">
            Apps
          </a>
          <ul class="dropdown-menu glass-dropdown" aria-labelledby="appsDropdown">
            <li>
              <a class="dropdown-item" href="#card-wallet">Card Wallet</a>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#team">Team</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#contact">Contact</a>
        </li>

      </ul>
    </div>
  </div>
</nav>
```

#### CSS Classes Required

| Class | Purpose |
|-------|---------|
| `.glass-nav` | Transparent background initially; `backdrop-filter: blur(0)`, `background: transparent` |
| `.glass-nav.scrolled` | Applied by JS at 50px scroll; `backdrop-filter: blur(20px)`, `background: rgba(10,14,39,0.85)`, `border-bottom: 1px solid var(--color-border)` |
| `.glass-dropdown` | Dropdown menu: `backdrop-filter: blur(20px)`, `background: var(--color-surface)`, `border: 1px solid var(--color-border)` |
| `.gradient-text` | Applied to the "e" in the logo; `background: var(--gradient-primary)`, `background-clip: text`, `-webkit-background-clip: text`, `color: transparent` |

#### JavaScript Behavior

**Module: Navbar scroll** (see §JS Module 1)
- Listens to `window.scroll` event (passive)
- At `scrollY >= 50`: adds `.scrolled` to `#mainNav`
- At `scrollY < 50`: removes `.scrolled` from `#mainNav`

**Module: Mobile nav close** (see §JS Module 4)
- Queries all `.nav-link` inside `#navbarNav`
- On click: calls `bootstrap.Collapse.getInstance(navbarNav).hide()`

**Module: ScrollSpy dropdown** (see §JS Module 2)
- When `#card-wallet` is in viewport (>20%): adds `active` class to `#appsDropdown`
- When no app section visible: removes `active` class

#### Accessibility

- `<nav aria-label="Main navigation">` — unique label for the landmark
- Hamburger button: `aria-controls="navbarNav"`, `aria-expanded` toggled by Bootstrap
- Dropdown: `aria-expanded` managed by Bootstrap; `aria-labelledby="appsDropdown"`
- All nav links keyboard-reachable via Tab; dropdown opens on Enter/Space
- Skip-nav `<a>` is first focusable element in DOM

#### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `>= lg (992px)` | Horizontal nav links, dropdown on click |
| `< lg` | Links collapse; hamburger button visible; collapse opens vertical menu |

#### Acceptance Criteria

- [ ] Navbar is fixed to top; does not push content down
- [ ] On page load, navbar is fully transparent
- [ ] After scrolling 50px, navbar shows frosted-glass effect
- [ ] Logo "e" is rendered in blue-to-cyan gradient
- [ ] All 5 links smooth-scroll to correct section
- [ ] "Apps" dropdown opens and links to `#card-wallet`
- [ ] Mobile hamburger toggles menu
- [ ] Clicking a nav link on mobile closes the menu
- [ ] Tab key navigates all links in correct order
- [ ] Skip-nav link visible on keyboard focus, hidden otherwise

---

### 2. Hero

#### HTML Structure

```html
<main id="main-content">
  <section id="hero" class="hero-section d-flex align-items-center">

    <!-- Decorative orbs (CSS-only, aria-hidden) -->
    <div class="hero-orb hero-orb--1" aria-hidden="true"></div>
    <div class="hero-orb hero-orb--2" aria-hidden="true"></div>
    <div class="hero-orb hero-orb--3" aria-hidden="true"></div>

    <div class="container position-relative">
      <div class="row justify-content-center text-center">
        <div class="col-lg-8 col-xl-7">

          <h1 class="display-3 fw-bold mb-4 animate-on-scroll" data-delay="0">
            We build apps that
            <span class="gradient-text">matter.</span>
          </h1>

          <p class="lead mb-5 animate-on-scroll" data-delay="100"
             style="color: var(--color-text-muted);">
            A two-person studio crafting beautiful, high-quality iOS and web
            applications with a focus on user experience and performance.
          </p>

          <div class="d-flex flex-wrap gap-3 justify-content-center animate-on-scroll"
               data-delay="200">
            <a href="#apps" class="btn btn-cta btn-lg px-5">See Our Work</a>
            <a href="#contact" class="btn btn-outline-light btn-lg px-5">Get in Touch</a>
          </div>

        </div>
      </div>
    </div>
  </section>
```

> Note: `<main id="main-content">` opens here and wraps all content sections through to before `<footer>`.

#### CSS Classes Required

| Class | Purpose |
|-------|---------|
| `.hero-section` | `min-height: 100vh`, `position: relative`, `overflow: hidden`, animated gradient background via `@keyframes gradientShift` |
| `.hero-orb` | `position: absolute`, `border-radius: 50%`, `filter: blur(80px)`, `animation: float [duration] ease-in-out infinite alternate`, `pointer-events: none` |
| `.hero-orb--1` | Blue (`rgba(59,130,246,0.3)`), top-left, `width: 600px`, `height: 600px` |
| `.hero-orb--2` | Cyan (`rgba(6,182,212,0.2)`), bottom-right, `width: 400px`, `height: 400px` |
| `.hero-orb--3` | Orange (`rgba(249,115,22,0.15)`), center-right, `width: 300px`, `height: 300px` |
| `.btn-cta` | `background: var(--gradient-cta)`, `border: none`, `color: #fff`, `font-weight: 600`, hover: `box-shadow: 0 0 20px rgba(249,115,22,0.5)` |
| `.animate-on-scroll` | `opacity: 0`, `transform: translateY(30px)`, `transition: opacity 0.6s ease, transform 0.6s ease` |
| `.animate-on-scroll.animated` | `opacity: 1`, `transform: translateY(0)` |

**Keyframes:**
- `@keyframes gradientShift` — shifts `background-position` on the hero animated gradient
- `@keyframes float` — oscillates between `translateY(-20px)` and `translateY(20px)` for orbs

#### JavaScript Behavior

**Module: Scroll animations** (see §JS Module 3)
- Hero `.animate-on-scroll` elements animate on initial page load (already in viewport)
- `data-delay` attribute (ms) applied as `transition-delay` before adding `.animated`

#### Accessibility

- `<h1>` present exactly once on the page (in hero)
- Orbs are `aria-hidden="true"` — purely decorative
- CTA buttons are `<a>` with meaningful text
- `prefers-reduced-motion`: stop `gradientShift` and `float` animations; static background

#### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `>= lg` | Full-size `display-3` headline; orbs at full size |
| `< md (768px)` | Orbs hidden (`display: none`); heading may use `display-4`; CTAs stack (`flex-column`) |

#### Acceptance Criteria

- [ ] Section fills full viewport height (`100vh`)
- [ ] Animated gradient background cycles smoothly
- [ ] Three blurred orbs visible on desktop, hidden on mobile
- [ ] "matter." renders in blue-to-cyan gradient
- [ ] "See Our Work" button is orange gradient
- [ ] "Get in Touch" button is outline/white
- [ ] Both buttons scroll to correct sections
- [ ] Hero elements fade + slide up on page load
- [ ] With `prefers-reduced-motion: reduce`, no animations play

---

### 3. About

#### HTML Structure

```html
<section id="about" class="section-padding">
  <div class="container">

    <div class="row align-items-center g-5">

      <!-- Left: text content -->
      <div class="col-lg-6 animate-on-scroll" data-delay="0">
        <h2 class="display-5 fw-bold mb-4">
          About <span class="gradient-text">eBoxr</span>
        </h2>
        <p class="mb-3" style="color: var(--color-text-muted);">
          We are a boutique iOS and web development studio founded by
          Stephanie and Nicolas. We believe great software comes from
          small, focused teams who care deeply about the craft.
        </p>
        <p style="color: var(--color-text-muted);">
          From idea to App Store, we handle design, development, and
          deployment — building apps that are fast, accessible, and
          delightful to use.
        </p>
      </div>

      <!-- Right: glass stats card -->
      <div class="col-lg-6 animate-on-scroll" data-delay="200">
        <div class="glass-card p-4 p-lg-5">
          <div class="row g-4 text-center">

            <div class="col-6">
              <div class="gradient-text display-4 fw-bold">2</div>
              <div style="color: var(--color-text-muted);">Developers</div>
            </div>

            <div class="col-6">
              <div class="gradient-text display-4 fw-bold">iOS</div>
              <div style="color: var(--color-text-muted);">Platform</div>
            </div>

            <div class="col-6">
              <div class="gradient-text display-4 fw-bold">Web</div>
              <div style="color: var(--color-text-muted);">Platform</div>
            </div>

            <div class="col-6">
              <div class="gradient-text display-4 fw-bold">100%</div>
              <div style="color: var(--color-text-muted);">Passion</div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

#### CSS Classes Required

| Class | Purpose |
|-------|---------|
| `.section-padding` | `padding: 100px 0` (desktop); `padding: 60px 0` (mobile `< md`) |
| `.glass-card` | `background: var(--color-surface)`, `backdrop-filter: blur(12px)`, `-webkit-backdrop-filter: blur(12px)`, `border: 1px solid var(--color-border)`, `border-radius: 1rem` |
| `.gradient-text` | Applied to stat values and section heading highlight |
| `.animate-on-scroll` | Fade + translate animation triggered by IntersectionObserver |

#### JavaScript Behavior

**Module: Scroll animations** — both columns have `.animate-on-scroll` with staggered `data-delay` (0ms, 200ms).

#### Accessibility

- Heading hierarchy: `<h2>` (only one `<h1>` exists in hero)
- Stats are plain text — no special ARIA needed
- Section has a visible heading describing the content

#### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `>= lg` | Two columns side by side |
| `< lg` | Text column stacks above stats card; full width |

#### Acceptance Criteria

- [ ] `<h2>` present with "eBoxr" in gradient text
- [ ] Two columns side-by-side on desktop, stacked on mobile
- [ ] Stats card uses glassmorphism (blurred, semi-transparent)
- [ ] Four stats: 2 Developers, iOS, Web, 100% Passion (all in gradient text)
- [ ] Both columns fade in on scroll with staggered delay
- [ ] No images used

---

### 4. Services

#### HTML Structure

```html
<section id="services" class="section-padding">
  <div class="container">

    <div class="text-center mb-5 animate-on-scroll">
      <h2 class="display-5 fw-bold">
        What We <span class="gradient-text">Build</span>
      </h2>
      <p class="mt-3" style="color: var(--color-text-muted);">
        End-to-end development from concept to launch.
      </p>
    </div>

    <div class="row g-4">

      <!-- iOS Development -->
      <div class="col-lg-4 col-md-6 animate-on-scroll" data-delay="0">
        <div class="glass-card service-card h-100 p-4">
          <div class="mb-3">
            <i class="bi bi-phone" style="font-size: 2.5rem; color: var(--color-primary);" aria-hidden="true"></i>
          </div>
          <h3 class="h4 fw-semibold mb-2">iOS Development</h3>
          <p class="mb-0" style="color: var(--color-text-muted);">
            Native Swift apps for iPhone and iPad. Designed for performance,
            accessibility, and App Store success.
          </p>
        </div>
      </div>

      <!-- Web Applications -->
      <div class="col-lg-4 col-md-6 animate-on-scroll" data-delay="100">
        <div class="glass-card service-card h-100 p-4">
          <div class="mb-3">
            <i class="bi bi-globe" style="font-size: 2.5rem; color: var(--color-primary);" aria-hidden="true"></i>
          </div>
          <h3 class="h4 fw-semibold mb-2">Web Applications</h3>
          <p class="mb-0" style="color: var(--color-text-muted);">
            Modern, responsive web apps built with clean HTML, CSS, and
            JavaScript. Fast, accessible, and maintainable.
          </p>
        </div>
      </div>

      <!-- UI/UX Design -->
      <div class="col-lg-4 col-md-6 animate-on-scroll" data-delay="200">
        <div class="glass-card service-card h-100 p-4">
          <div class="mb-3">
            <i class="bi bi-palette" style="font-size: 2.5rem; color: var(--color-primary);" aria-hidden="true"></i>
          </div>
          <h3 class="h4 fw-semibold mb-2">UI/UX Design</h3>
          <p class="mb-0" style="color: var(--color-text-muted);">
            Thoughtful interfaces that feel intuitive. Every interaction
            designed with the end user in mind.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
```

#### CSS Classes Required

| Class | Purpose |
|-------|---------|
| `.service-card` | Extends `.glass-card`; adds `position: relative`, `overflow: hidden`, `transition: transform 0.3s ease`; hover: `transform: translateY(-4px)` |
| `.service-card::before` | `content: ''`, `position: absolute`, `top: 0`, `left: 0`, `right: 0`, `height: 3px`, `background: var(--gradient-primary)`, `transform: scaleX(0)`, `transition: transform 0.3s ease`, `transform-origin: left` |
| `.service-card:hover::before` | `transform: scaleX(1)` — gradient top-border slides in from left |

#### JavaScript Behavior

**Module: Scroll animations** — each column has `.animate-on-scroll` with staggered `data-delay` (0, 100, 200ms).

No other JS — hover effect is pure CSS.

#### Accessibility

- Service icons are `aria-hidden="true"` — decorative
- Each card has an `<h3>` heading
- `prefers-reduced-motion`: disable `::before` transition and card lift transition

#### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `>= lg` | 3 columns (`col-lg-4`) |
| `md` | 2 columns (`col-md-6`) |
| `< md` | Single column, full width |

#### Acceptance Criteria

- [ ] Three service cards in a row on desktop
- [ ] Each card has: icon (`bi-phone`, `bi-globe`, `bi-palette`), `<h3>` heading, description
- [ ] On hover, gradient top-border slides in from left
- [ ] Cards lift slightly on hover (`translateY(-4px)`)
- [ ] Section `<h2>` with "Build" in gradient text
- [ ] Staggered scroll-in animations

---

### 5. Apps / Portfolio

#### HTML Structure

```html
<section id="apps" class="section-padding">
  <div class="container">

    <div class="text-center mb-5 animate-on-scroll">
      <h2 class="display-5 fw-bold">
        Our <span class="gradient-text">Apps</span>
      </h2>
    </div>

    <!-- Card Wallet app -->
    <div id="card-wallet" class="row align-items-center g-5 animate-on-scroll">

      <!-- Left: screenshot placeholder -->
      <div class="col-lg-5">
        <div class="glass-card p-3 text-center app-screenshot-frame">
          <div class="app-screenshot-placeholder">
            <i class="bi bi-phone" aria-hidden="true"
               style="font-size: 6rem; color: var(--color-text-muted);"></i>
            <p style="color: var(--color-text-muted);" class="mt-2 mb-0">
              Screenshot coming soon
            </p>
          </div>
        </div>
      </div>

      <!-- Right: app details -->
      <div class="col-lg-7">

        <span class="badge rounded-pill mb-3"
              style="background: var(--gradient-primary); color: #fff; font-size: 0.8rem;">
          <i class="bi bi-apple" aria-hidden="true"></i> iOS
        </span>

        <h3 class="display-6 fw-bold mb-3">Card Wallet</h3>

        <p class="mb-4" style="color: var(--color-text-muted);">
          The smart way to manage your Apple Wallet. Organize, preview, and
          quickly access all your passes — loyalty cards, boarding passes,
          event tickets, and more.
        </p>

        <!-- Feature checklist -->
        <ul class="list-unstyled mb-4">
          <li class="mb-2">
            <i class="bi bi-check-circle-fill me-2"
               style="color: var(--color-primary);" aria-hidden="true"></i>
            Manage all Apple Wallet passes in one place
          </li>
          <li class="mb-2">
            <i class="bi bi-check-circle-fill me-2"
               style="color: var(--color-primary);" aria-hidden="true"></i>
            Quick preview without opening Wallet
          </li>
          <li class="mb-2">
            <i class="bi bi-check-circle-fill me-2"
               style="color: var(--color-primary);" aria-hidden="true"></i>
            Organize passes into custom collections
          </li>
          <li class="mb-2">
            <i class="bi bi-check-circle-fill me-2"
               style="color: var(--color-primary);" aria-hidden="true"></i>
            Available on iPhone and iPad
          </li>
        </ul>

        <a href="#" class="btn btn-cta btn-lg px-5" aria-label="Download Card Wallet on the App Store">
          <i class="bi bi-apple me-2" aria-hidden="true"></i>
          Download on App Store
        </a>

      </div>
    </div>
    <!-- End #card-wallet -->

    <!-- Future apps: add new .row blocks here; add class flex-lg-row-reverse to alternate sides -->

  </div>
</section>
```

#### CSS Classes Required

| Class | Purpose |
|-------|---------|
| `.app-screenshot-frame` | Extends `.glass-card`; `border-radius: 1.5rem` |
| `.app-screenshot-placeholder` | `min-height: 300px`, `display: flex`, `flex-direction: column`, `align-items: center`, `justify-content: center` |

**Future app layout note:** Add `class="flex-lg-row-reverse"` to the `.row` of the second app to alternate image/text sides on desktop.

**ScrollSpy note:** `#card-wallet` must also carry a `data-app-section` attribute for JS Module 2 detection:
```html
<div id="card-wallet" data-app-section class="row ...">
```

#### JavaScript Behavior

**Module: ScrollSpy dropdown** — `[data-app-section]` elements are observed; when in viewport, `active` class added to `#appsDropdown`.

**Module: Scroll animations** — `.animate-on-scroll` on the app row.

#### Accessibility

- Screenshot placeholder: decorative `<i>` is `aria-hidden="true"`; descriptive text below it is sufficient
- Checklist icons: `aria-hidden="true"` — text content is sufficient
- "Download on App Store": `aria-label` provides full context
- Each app has its own `id` for deep linking from navbar dropdown
- Future real `<img>` must include descriptive `alt` text

#### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `>= lg` | Screenshot left (`col-lg-5`), details right (`col-lg-7`) |
| `< lg` | Screenshot stacks above details; both full width |
| Future alternating | `flex-lg-row-reverse` only reverses on `>= lg` |

#### Acceptance Criteria

- [ ] Section `id="apps"`, app has `id="card-wallet"` and `data-app-section`
- [ ] Nav "Apps" → "Card Wallet" scrolls to `#card-wallet`
- [ ] Screenshot placeholder in glass card frame
- [ ] iOS gradient badge above app title
- [ ] Feature checklist with 4 items, `bi-check-circle-fill` icons
- [ ] "Download on App Store" is orange CTA with Apple icon
- [ ] Stacks vertically on mobile

---

### 6. Team

#### HTML Structure

```html
<section id="team" class="section-padding">
  <div class="container">

    <div class="text-center mb-5 animate-on-scroll">
      <h2 class="display-5 fw-bold">
        Meet the <span class="gradient-text">Team</span>
      </h2>
    </div>

    <div class="row g-4 justify-content-center">

      <!-- Stephanie -->
      <div class="col-lg-5 col-md-6 animate-on-scroll" data-delay="0">
        <div class="glass-card team-card text-center p-4 p-lg-5 h-100">

          <div class="avatar-placeholder mx-auto mb-3" aria-hidden="true">
            <span class="avatar-initials">S</span>
          </div>

          <h3 class="h4 fw-bold mb-1">Stephanie</h3>
          <p class="mb-3" style="color: var(--color-primary); font-weight: 500;">
            iOS Developer &amp; Co-founder
          </p>
          <p class="mb-4" style="color: var(--color-text-muted);">
            Passionate iOS developer crafting native Swift applications
            with a focus on elegant UI and seamless user experience.
          </p>

          <div class="d-flex gap-3 justify-content-center">
            <a href="#" class="team-social-link" aria-label="Stephanie's GitHub profile">
              <i class="bi bi-github" aria-hidden="true"></i>
            </a>
            <a href="#" class="team-social-link" aria-label="Stephanie's LinkedIn profile">
              <i class="bi bi-linkedin" aria-hidden="true"></i>
            </a>
            <a href="#" class="team-social-link" aria-label="Stephanie's portfolio">
              <i class="bi bi-globe" aria-hidden="true"></i>
            </a>
          </div>

        </div>
      </div>

      <!-- Nicolas -->
      <div class="col-lg-5 col-md-6 animate-on-scroll" data-delay="150">
        <div class="glass-card team-card text-center p-4 p-lg-5 h-100">

          <div class="avatar-placeholder mx-auto mb-3" aria-hidden="true">
            <span class="avatar-initials">N</span>
          </div>

          <h3 class="h4 fw-bold mb-1">Nicolas</h3>
          <p class="mb-3" style="color: var(--color-primary); font-weight: 500;">
            Web Developer &amp; Co-founder
          </p>
          <p class="mb-4" style="color: var(--color-text-muted);">
            Full-stack web developer building fast, accessible, and
            beautifully designed web experiences from the ground up.
          </p>

          <div class="d-flex gap-3 justify-content-center">
            <a href="#" class="team-social-link" aria-label="Nicolas's GitHub profile">
              <i class="bi bi-github" aria-hidden="true"></i>
            </a>
            <a href="#" class="team-social-link" aria-label="Nicolas's LinkedIn profile">
              <i class="bi bi-linkedin" aria-hidden="true"></i>
            </a>
            <a href="#" class="team-social-link" aria-label="Nicolas's portfolio">
              <i class="bi bi-globe" aria-hidden="true"></i>
            </a>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
```

#### CSS Classes Required

| Class | Purpose |
|-------|---------|
| `.team-card` | Extends `.glass-card`; hover: `transform: translateY(-6px)`, `transition: transform 0.3s ease` |
| `.avatar-placeholder` | `width: 80px`, `height: 80px`, `border-radius: 50%`, `background: var(--gradient-primary)`, `display: flex`, `align-items: center`, `justify-content: center` |
| `.avatar-initials` | `color: #fff`, `font-size: 1.75rem`, `font-weight: 700` |
| `.team-social-link` | `color: var(--color-text-muted)`, `font-size: 1.25rem`, hover: `color: var(--color-primary)`, `transition: color 0.2s ease` |

#### JavaScript Behavior

**Module: Scroll animations** — staggered `.animate-on-scroll` on each card column (0ms, 150ms).

#### Accessibility

- Avatar placeholders: `aria-hidden="true"` (decorative)
- Social links: `aria-label` per person per platform (e.g., `"Stephanie's GitHub profile"`)
- Social icons: `aria-hidden="true"`
- All social URLs are `href="#"` placeholders
- `prefers-reduced-motion`: disable hover `translateY` transition

#### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `>= lg` | Two cards side by side (`col-lg-5`, centered) |
| `md` | Two cards (`col-md-6`) |
| `< md` | Single column, full width |

#### Acceptance Criteria

- [ ] Two team cards: Stephanie and Nicolas
- [ ] Each card: gradient avatar with initial, name, role (primary blue color), bio, 3 social links
- [ ] Social links (GitHub, LinkedIn, Globe/Portfolio) each have `aria-label`
- [ ] Cards side-by-side on desktop, stacked on mobile
- [ ] Card lifts on hover
- [ ] Social link icons change to primary blue on hover

---

### 7. Contact

#### HTML Structure

```html
<section id="contact" class="section-padding">
  <div class="container">

    <div class="text-center mb-5 animate-on-scroll">
      <h2 class="display-5 fw-bold">
        Get in <span class="gradient-text">Touch</span>
      </h2>
      <p class="mt-3" style="color: var(--color-text-muted);">
        Have a project in mind? We'd love to hear from you.
      </p>
    </div>

    <div class="row g-5 justify-content-center">

      <!-- Left: contact info -->
      <div class="col-lg-4 animate-on-scroll" data-delay="0">

        <div class="d-flex align-items-start gap-3 mb-4">
          <i class="bi bi-envelope flex-shrink-0"
             style="font-size: 1.5rem; color: var(--color-primary); margin-top: 2px;" aria-hidden="true"></i>
          <div>
            <h3 class="h6 fw-semibold mb-1">Email</h3>
            <a href="mailto:hello@eboxr.com" style="color: var(--color-text-muted);">
              hello@eboxr.com
            </a>
          </div>
        </div>

        <div class="d-flex align-items-start gap-3 mb-4">
          <i class="bi bi-geo-alt flex-shrink-0"
             style="font-size: 1.5rem; color: var(--color-primary); margin-top: 2px;" aria-hidden="true"></i>
          <div>
            <h3 class="h6 fw-semibold mb-1">Location</h3>
            <p style="color: var(--color-text-muted);" class="mb-0">Remote — worldwide</p>
          </div>
        </div>

      </div>

      <!-- Right: contact form -->
      <div class="col-lg-6 animate-on-scroll" data-delay="100">
        <div class="glass-card p-4 p-lg-5">

          <form id="contactForm" novalidate>

            <div class="mb-3">
              <label for="contactName" class="form-label">Name</label>
              <input type="text" class="form-control glass-input"
                     id="contactName" name="name"
                     placeholder="Your name" required>
              <div class="invalid-feedback">Please enter your name.</div>
            </div>

            <div class="mb-3">
              <label for="contactEmail" class="form-label">Email</label>
              <input type="email" class="form-control glass-input"
                     id="contactEmail" name="email"
                     placeholder="your@email.com" required>
              <div class="invalid-feedback">Please enter a valid email address.</div>
            </div>

            <div class="mb-3">
              <label for="contactSubject" class="form-label">Subject</label>
              <input type="text" class="form-control glass-input"
                     id="contactSubject" name="subject"
                     placeholder="What's this about?">
            </div>

            <div class="mb-4">
              <label for="contactMessage" class="form-label">Message</label>
              <textarea class="form-control glass-input"
                        id="contactMessage" name="message"
                        rows="5" placeholder="Tell us about your project..." required></textarea>
              <div class="invalid-feedback">Please enter a message.</div>
            </div>

            <button type="submit" class="btn btn-cta w-100 btn-lg">
              Send Message
            </button>

            <!-- Success message (hidden by default) -->
            <div id="contactSuccess" class="alert alert-success mt-3 d-none" role="alert">
              <i class="bi bi-check-circle me-2" aria-hidden="true"></i>
              Thanks! We'll get back to you soon.
            </div>

          </form>

        </div>
      </div>

    </div>
  </div>
</section>

</main>
<!-- End of <main id="main-content"> -->
```

#### CSS Classes Required

| Class | Purpose |
|-------|---------|
| `.glass-input` | `background: rgba(255,255,255,0.05)`, `border: 1px solid var(--color-border)`, `color: var(--color-text)`, `border-radius: 0.5rem`; focus: `border-color: var(--color-primary)`, `box-shadow: 0 0 0 3px rgba(59,130,246,0.25)`, `outline: none` |
| `.glass-input::placeholder` | `color: var(--color-text-muted)` |

#### JavaScript Behavior

**Module: Contact form** (see §JS Module 5)

1. Attach `submit` listener to `#contactForm`
2. `event.preventDefault()`
3. Add `was-validated` class to form
4. Check `form.checkValidity()`:
   - **Invalid**: stop; Bootstrap `.invalid-feedback` displays via `was-validated` + `:invalid`
   - **Valid**:
     1. Disable submit button; set text to "Sending…"
     2. Wait 800ms (simulated async)
     3. Remove `d-none` from `#contactSuccess`
     4. `form.reset()`, remove `was-validated`, re-enable button, restore "Send Message"

**Validation rules:**
- `name`: required
- `email`: required, type="email" (browser validates format)
- `subject`: optional
- `message`: required

#### Accessibility

- All inputs have associated `<label>` via `for`/`id` pairs
- `novalidate` on form — Bootstrap handles validation UI
- `#contactSuccess` has `role="alert"` for screen reader announcement
- Submit is `<button type="submit">` (not `<a>` or `<div>`)
- Placeholders do not replace visible labels

#### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `>= lg` | Info column (4-wide) left, form column (6-wide) right |
| `< lg` | Info stacks above form; both full width |

#### Acceptance Criteria

- [ ] `<h2>` with "Touch" in gradient text
- [ ] Contact info: email (`hello@eboxr.com`) and location visible
- [ ] Form fields: Name (required), Email (required), Subject (optional), Message (required)
- [ ] Each field has a visible `<label>` above it
- [ ] Invalid submission shows Bootstrap validation messages
- [ ] Valid submission shows `#contactSuccess` alert and resets form
- [ ] Inputs use glassmorphism style with blue focus ring
- [ ] Submit button is full-width orange CTA
- [ ] `#contactSuccess` has `role="alert"`

---

### 8. Footer

#### HTML Structure

```html
<footer class="footer-section">
  <div class="container">
    <div class="row align-items-center g-4">

      <!-- Logo -->
      <div class="col-md-4 text-center text-md-start">
        <a class="footer-brand" href="#hero">
          <span class="gradient-text">e</span>Boxr
        </a>
      </div>

      <!-- Copyright -->
      <div class="col-md-4 text-center">
        <p class="mb-0" style="color: var(--color-text-muted);">
          &copy; 2026 eBoxr. All rights reserved.
        </p>
      </div>

      <!-- Social icons -->
      <div class="col-md-4 text-center text-md-end">
        <div class="d-flex gap-3 justify-content-center justify-content-md-end">

          <a href="#" class="footer-social-link" aria-label="eBoxr on GitHub">
            <i class="bi bi-github" aria-hidden="true"></i>
          </a>
          <a href="#" class="footer-social-link" aria-label="eBoxr on X (Twitter)">
            <i class="bi bi-twitter-x" aria-hidden="true"></i>
          </a>
          <a href="#" class="footer-social-link" aria-label="eBoxr on LinkedIn">
            <i class="bi bi-linkedin" aria-hidden="true"></i>
          </a>

        </div>
      </div>

    </div>
  </div>
</footer>
```

#### CSS Classes Required

| Class | Purpose |
|-------|---------|
| `.footer-section` | `padding: 40px 0`, `border-top: 1px solid var(--color-border)`, `background: var(--color-bg)` |
| `.footer-brand` | `text-decoration: none`, `color: var(--color-text)`, `font-weight: 700`, `font-size: 1.25rem` |
| `.footer-social-link` | `color: var(--color-text-muted)`, `font-size: 1.25rem`, hover: `color: var(--color-primary)`, `transition: color 0.2s ease` |

#### JavaScript Behavior

None. Footer is fully static.

#### Accessibility

- `<footer>` has implicit `contentinfo` landmark role (no explicit `role` needed)
- Social icon links: `aria-label` with platform name (e.g., `"eBoxr on GitHub"`)
- All social icons: `aria-hidden="true"`
- Logo link returns user to `#hero`

#### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `>= md` | Three columns: logo left, copyright center, social right |
| `< md` | Single column, all centered; stacked |

#### Acceptance Criteria

- [ ] Three-column layout on desktop
- [ ] Logo links to `#hero`
- [ ] Copyright reads "© 2026 eBoxr. All rights reserved."
- [ ] Social icons: `bi-github`, `bi-twitter-x`, `bi-linkedin`
- [ ] Each social link has `aria-label`
- [ ] Border-top separates footer
- [ ] Stacks centered on mobile

---

## JavaScript Modules (main.js)

`main.js` contains 5 discrete function modules. No global namespace pollution. All initialized inside a single `DOMContentLoaded` listener.

### Module 1 — Navbar Scroll

**Purpose:** Adds/removes `.scrolled` class on the navbar based on scroll position.

```javascript
function initNavbarScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY >= 50);
  }, { passive: true });
}
```

- Threshold: 50px
- Event: `scroll` with `{ passive: true }` for performance
- Target: `#mainNav`

### Module 2 — ScrollSpy Dropdown

**Purpose:** Highlights the Apps nav dropdown when an app section enters the viewport.

```javascript
function initScrollSpyDropdown() {
  const appSections = document.querySelectorAll('[data-app-section]');
  const appsDropdown = document.getElementById('appsDropdown');
  if (!appsDropdown || !appSections.length) return;

  const observer = new IntersectionObserver((entries) => {
    const anyVisible = entries.some(e => e.isIntersecting);
    appsDropdown.classList.toggle('active', anyVisible);
  }, { threshold: 0.2 });

  appSections.forEach(section => observer.observe(section));
}
```

- Attribute selector: `[data-app-section]` on app rows
- Threshold: 20% visible

### Module 3 — Scroll Animations

**Purpose:** Triggers fade-in + slide-up animations when elements enter the viewport.

```javascript
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('.animate-on-scroll');

  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('animated'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(() => entry.target.classList.add('animated'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}
```

- Trigger threshold: 10% of element in viewport
- Animate once: `observer.unobserve` after trigger
- Delay: `data-delay` attribute in ms (integer); default 0
- Reduced motion: all elements immediately set to `.animated`

### Module 4 — Mobile Nav Close

**Purpose:** Collapses the mobile nav menu when a nav link is clicked.

```javascript
function initMobileNavClose() {
  const navCollapse = document.getElementById('navbarNav');
  if (!navCollapse) return;

  navCollapse.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = bootstrap.Collapse.getInstance(navCollapse);
      if (collapse) collapse.hide();
    });
  });
}
```

- Target: all `.nav-link` inside `#navbarNav`
- Only has effect when Bootstrap collapse is expanded

### Module 5 — Contact Form

**Purpose:** Client-side validation and simulated async submission feedback.

```javascript
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successAlert = document.getElementById('contactSuccess');
  const submitBtn = form ? form.querySelector('[type="submit"]') : null;
  if (!form || !successAlert || !submitBtn) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('was-validated');

    if (!form.checkValidity()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      successAlert.classList.remove('d-none');
      form.reset();
      form.classList.remove('was-validated');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }, 800);
  });
}
```

### Initialization

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initScrollSpyDropdown();
  initScrollAnimations();
  initMobileNavClose();
  initContactForm();
});
```

---

## CSS Architecture (style.css)

File organized in the following sections (in order):

```
1.  CSS Custom Properties (:root variables)
2.  Base Styles (body, html, a, ::selection, scroll-behavior)
3.  Skip Navigation Link (.visually-hidden-focusable override)
4.  Focus Visible (:focus-visible outline)
5.  Glassmorphism Utilities (.glass-card, .glass-nav, .glass-nav.scrolled, .glass-dropdown, .glass-input)
6.  Typography Utilities (.gradient-text)
7.  Button Utilities (.btn-cta, .btn-cta:hover)
8.  Animation Utilities (.animate-on-scroll, .animate-on-scroll.animated)
9.  Keyframes (@keyframes gradientShift, @keyframes float)
10. Hero Section (.hero-section, .hero-orb, .hero-orb--1/2/3)
11. Section Layout (.section-padding)
12. Services (.service-card, .service-card::before, .service-card:hover)
13. Apps (.app-screenshot-frame, .app-screenshot-placeholder)
14. Team (.team-card, .avatar-placeholder, .avatar-initials, .team-social-link)
15. Footer (.footer-section, .footer-brand, .footer-social-link)
16. Responsive Media Queries (@media max-width: 768px)
17. Reduced Motion (@media prefers-reduced-motion: reduce)
```

### Cross-browser Notes

- `backdrop-filter` requires `-webkit-backdrop-filter` prefix for Safari
- `background-clip: text` requires `-webkit-background-clip: text` for Chrome/Safari
- `color: transparent` required alongside `-webkit-background-clip: text` for gradient text

### Reduced Motion (Section 17)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

JS Module 3 also reads `window.matchMedia('(prefers-reduced-motion: reduce)')` to skip animation delays and immediately apply `.animated` to all elements.

---

*End of specs.md — eBoxr.com Technical Specifications*
