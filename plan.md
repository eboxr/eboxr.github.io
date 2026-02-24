# eBoxr.com — Modern Portfolio Website Plan

## Context

eBoxr is a small two-person (Stephanie & Nicolas) iOS/web app development company that needs a modern portfolio website at eboxr.com. The site will showcase their apps (starting with Card Wallet, an iOS Apple Wallet management app), present the team, and provide contact information. Currently the project directory is empty — this is a fresh build.

## Tech Stack

- **Static HTML** — single `index.html` with smooth-scroll sections
- **Bootstrap 5.3.8** via CDN (dark mode with `data-bs-theme="dark"`)
- **Bootstrap Icons 1.13.1** via CDN
- **Inter font** via Google Fonts CDN
- **Custom CSS + JS** — no build tools, no npm

## Visual Style

Dark navy theme (`#0a0e27`) with glassmorphism cards, blue-to-cyan gradient accents, orange CTA buttons, floating decorative orbs, and scroll-triggered fade animations.

## File Structure

```
eboxr.com/
├── index.html              (~450 lines)
├── css/
│   └── style.css           (~350 lines)
├── js/
│   └── main.js             (~120 lines)
├── assets/
│   └── images/             (empty, for future logos/screenshots)
└── plan.md                 (this file)
```

## Sections (in order)

### 1. Navigation — Fixed-top glassmorphism navbar
- Logo: `<span class="gradient-text">e</span>Boxr`
- Links: About, Services, Apps (dropdown with Card Wallet), Team, Contact
- Transparent on top, frosted-glass on scroll (JS adds `.scrolled` class)
- Mobile hamburger via Bootstrap collapse

### 2. Hero — Full-viewport animated intro
- Animated gradient background (`@keyframes gradientShift`)
- 3 decorative floating blurred orbs (CSS-only)
- Headline: "We build apps that **matter.**" (gradient text)
- Sub-text + two CTAs: "See Our Work" (orange) + "Get in Touch" (outline)

### 3. About — Two-column layout
- Left: text about eBoxr (small team, quality focus)
- Right: glassmorphism card with stats (2 Developers, iOS, Web, 100% Passion)

### 4. Services — Three glass cards in a row
- iOS Development (`bi-phone`), Web Applications (`bi-globe`), UI/UX Design (`bi-palette`)
- Hover effect: gradient top-border slides in

### 5. Apps/Portfolio — Card Wallet showcase
- Left: screenshot placeholder in glass card frame
- Right: iOS badge, title, description, feature checklist, App Store CTA button
- Each app gets its own `id` for nav dropdown linking
- Future apps alternate image/text sides via `flex-lg-row-reverse`

### 6. Team — Two profile cards
- **Stephanie** and **Nicolas** side by side
- Gradient avatar placeholder, role, bio, social links (GitHub, LinkedIn, Portfolio)
- All portfolio URLs are `#` placeholders for now

### 7. Contact — Info + form
- Left column: email (hello@eboxr.com), location info
- Right column: glass card with contact form (name, email, subject, message)
- Form is static (no backend) — placeholder submit with JS success feedback

### 8. Footer — Three columns
- Logo | Copyright 2026 | Social icons (GitHub, X, LinkedIn)

## Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.glass-card` | `backdrop-filter: blur(12px)`, semi-transparent bg, subtle border |
| `.glass-nav` / `.glass-nav.scrolled` | Transparent → frosted navbar on scroll |
| `.glass-dropdown` | Frosted dropdown menu matching nav |
| `.glass-input` | Dark transparent form inputs with blue focus ring |
| `.gradient-text` | Blue-to-cyan gradient via `background-clip: text` |
| `.btn-cta` | Orange gradient button with hover glow |
| `.animate-on-scroll` | `opacity: 0` + transform, animated via IntersectionObserver |
| `.hero-orb` | Large blurred circles with float animation |
| `.service-card::before` | Gradient top-border that scales in on hover |
| `.avatar-placeholder` | Circular gradient container for team avatars |

## JavaScript (main.js) — 5 modules

1. **Navbar scroll** — add/remove `.scrolled` class at 50px threshold
2. **ScrollSpy dropdown** — highlight Apps dropdown when any app section is active
3. **Scroll animations** — `IntersectionObserver` adds `.animated` to `.animate-on-scroll` elements with configurable delays
4. **Mobile nav close** — collapse hamburger menu on link click
5. **Contact form** — client-side validation + placeholder success feedback

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0a0e27` | Page background |
| `--color-surface` | `rgba(15, 23, 42, 0.60)` | Glass card backgrounds |
| `--color-border` | `rgba(255, 255, 255, 0.08)` | Glass card borders |
| `--color-primary` | `#3b82f6` | Primary blue |
| `--color-accent` | `#06b6d4` | Cyan accent |
| `--color-cta` | `#f97316` | Orange CTA buttons |
| `--color-cta-hover` | `#fb923c` | CTA hover state |
| `--gradient-primary` | `linear-gradient(135deg, #3b82f6, #06b6d4)` | Blue-to-cyan gradient |
| `--gradient-cta` | `linear-gradient(135deg, #f97316, #f59e0b)` | Orange-to-amber gradient |
| `--color-text` | `#e2e8f0` | Body text |
| `--color-text-muted` | `#94a3b8` | Secondary text |

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

<!-- Bootstrap 5.3.8 JS Bundle (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
```

## Implementation Order

### Phase 1: Foundation
- Create `index.html` with full HTML skeleton, CDN links, empty section shells
- Create `css/style.css` with CSS variables, base styles, utility classes
- Create `js/main.js` (empty scaffold)
- Create `assets/images/` directory

### Phase 2: Navigation + Hero
- Build navbar HTML with glassmorphism and dropdown
- Build hero section with animated gradient and orbs
- Add navbar scroll JS and mobile close handler

### Phase 3: Content Sections
- About section (two-column + glass stats card)
- Services section (three glass cards)
- Apps section (Card Wallet showcase)
- Team section (Stephanie + Nicolas profiles)
- Contact section (info + glass form)
- Footer

### Phase 4: Animations + Polish
- Add `data-animation` attributes to all elements
- Add IntersectionObserver scroll animation JS
- Add responsive media queries (mobile hero, hide orbs, reduce blur)
- Add `prefers-reduced-motion` support
- Add skip-nav link and focus-visible styles
- Contact form validation JS

## Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
- `aria-label` on all icon-only links
- `prefers-reduced-motion` disables all animations
- WCAG AA contrast ratios maintained
- Skip navigation link
- Proper form labels
- Keyboard-navigable

## Verification

1. Open `index.html` in browser — dark theme, correct fonts, Bootstrap loaded
2. Scroll — navbar transitions, animations trigger, orbs float
3. Resize to mobile — responsive grid, hamburger menu works
4. Click all nav links — smooth scroll to correct sections
5. Test with `prefers-reduced-motion: reduce` — no animations
6. Test contact form — validation feedback works
7. Cross-browser: Safari (`-webkit-backdrop-filter`), Firefox, Chrome

## Future Enhancements (not in scope)

- Form backend (Formspree/Netlify Forms)
- Real portfolio URLs for Stephanie and Nicolas
- App Store link and screenshots for Card Wallet
- SVG favicon with gradient "e"
- Open Graph meta tags
- Additional app pages
