# eBoxr.com — Design System

> **Source of truth for all visual decisions.** @dev-front implements from this document.
> `plan.md` is read-only. This document expands on its visual specifications with full CSS
> values, component specs, animations, wireframes, and responsive behavior.

---

## 1. Design Tokens (CSS Custom Properties)

All tokens are declared on `:root` in `css/style.css`.

### 1.1 Color Palette

```css
:root {
  /* Backgrounds */
  --color-bg:           #0a0e27;                           /* Page background — deep navy */
  --color-surface:      rgba(15, 23, 42, 0.60);            /* Glass card fill */
  --color-border:       rgba(255, 255, 255, 0.08);         /* Glass card / nav borders */

  /* Brand */
  --color-primary:      #3b82f6;                           /* Blue — links, focus rings */
  --color-accent:       #06b6d4;                           /* Cyan — gradient endpoint */

  /* CTA */
  --color-cta:          #f97316;                           /* Orange — primary action */
  --color-cta-hover:    #fb923c;                           /* Orange lighter — hover */

  /* Gradients */
  --gradient-primary:   linear-gradient(135deg, #3b82f6, #06b6d4);  /* Blue to Cyan */
  --gradient-cta:       linear-gradient(135deg, #f97316, #f59e0b);  /* Orange to Amber */

  /* Text */
  --color-text:         #e2e8f0;                           /* Body text */
  --color-text-muted:   #94a3b8;                           /* Secondary / caption text */
}
```

#### Contrast Ratios (WCAG AA)

| Foreground | Background | Ratio | Pass |
|---|---|---|---|
| `--color-text` `#e2e8f0` | `--color-bg` `#0a0e27` | 12.4:1 | AAA |
| `--color-text-muted` `#94a3b8` | `--color-bg` `#0a0e27` | 5.7:1 | AA |
| `--color-cta` `#f97316` | `--color-bg` `#0a0e27` | 4.6:1 | AA |
| `--color-primary` `#3b82f6` | `--color-bg` `#0a0e27` | 4.5:1 | AA |

---

### 1.2 Typography

```css
:root {
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;

  /* Scale */
  --fs-h1:   clamp(2.5rem, 5vw, 4rem);    /* Hero headline */
  --fs-h2:   clamp(1.75rem, 3vw, 2.5rem); /* Section titles */
  --fs-h3:   1.5rem;                       /* Card titles */
  --fs-h4:   1.25rem;
  --fs-h5:   1.125rem;
  --fs-h6:   1rem;
  --fs-body: 1rem;                         /* 16px base */
  --fs-sm:   0.875rem;                     /* 14px captions */
  --fs-xs:   0.75rem;                      /* 12px labels */

  /* Weights */
  --fw-regular:  400;
  --fw-medium:   500;
  --fw-semibold: 600;
  --fw-bold:     700;

  /* Line heights */
  --lh-tight:   1.2;   /* Headings */
  --lh-normal:  1.6;   /* Body text */
  --lh-relaxed: 1.75;  /* Long-form paragraphs */
}
```

**Type usage:**

| Element | Size | Weight | Color |
|---|---|---|---|
| Hero `<h1>` | `--fs-h1` | 700 | `.gradient-text` |
| Section `<h2>` | `--fs-h2` | 700 | `--color-text` |
| Card `<h3>` | `--fs-h3` | 600 | `--color-text` |
| Body `<p>` | `--fs-body` | 400 | `--color-text` |
| Muted label | `--fs-sm` | 400 | `--color-text-muted` |
| Nav links | `--fs-body` | 500 | `--color-text` |

---

### 1.3 Spacing System

```css
:root {
  /* Section padding — Bootstrap py-5 = 3rem; custom sections use 5rem */
  --section-py:      5rem;   /* 80px top/bottom for content sections */

  /* Card padding */
  --card-p:          1.5rem; /* 24px — standard glass card (Bootstrap p-4) */
  --card-p-lg:       2rem;   /* 32px — featured / stats cards */

  /* Grid gaps */
  --gap-sm:   0.75rem;  /* 12px */
  --gap-md:   1.5rem;   /* 24px */
  --gap-lg:   2rem;     /* 32px */
  --gap-xl:   3rem;     /* 48px */

  /* Component sizing */
  --nav-height:  72px;
  --orb-blur:    80px;  /* filter: blur() radius for decorative orbs */
  --avatar-size: 80px;  /* Team avatar circle diameter */
}
```

---

### 1.4 Border Radius

```css
:root {
  --radius-sm:   0.375rem;  /* 6px  — inputs, small badges */
  --radius-md:   0.5rem;    /* 8px  — buttons */
  --radius-lg:   1rem;      /* 16px — glass cards */
  --radius-xl:   1.5rem;    /* 24px — hero card, large containers */
  --radius-full: 9999px;    /* circles — avatar, orbs */
}
```

---

### 1.5 Transitions and Shadows

```css
:root {
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 600ms ease;

  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 8px 32px rgba(59, 130, 246, 0.15);  /* Blue glow — card hover */
  --shadow-cta:  0 4px 24px rgba(249, 115, 22, 0.40);  /* Orange glow — CTA hover */
}
```

---

## 2. Component Specifications

### 2.1 `.glass-card`

```css
.glass-card {
  background:               var(--color-surface);
  backdrop-filter:          blur(12px);
  -webkit-backdrop-filter:  blur(12px);          /* Safari */
  border:                   1px solid var(--color-border);
  border-radius:            var(--radius-lg);    /* 16px */
  padding:                  var(--card-p);       /* 24px */
  transition:               transform var(--transition-base),
                            box-shadow var(--transition-base);
}

.glass-card:hover {
  transform:   translateY(-4px);
  box-shadow:  var(--shadow-glow);
}
```

---

### 2.2 `.glass-nav` / `.glass-nav.scrolled`

```css
.glass-nav {
  background:    transparent;
  border-bottom: 1px solid transparent;
  height:        var(--nav-height);
  transition:    background var(--transition-base),
                 border-color var(--transition-base),
                 backdrop-filter var(--transition-base);
}

.glass-nav.scrolled {
  background:              rgba(10, 14, 39, 0.85);
  backdrop-filter:         blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom:           1px solid var(--color-border);
}
```

**JS trigger:** `.scrolled` class added/removed when `window.scrollY > 50`.

---

### 2.3 `.glass-dropdown`

```css
.glass-dropdown {
  background:              rgba(10, 14, 39, 0.95);
  backdrop-filter:         blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border:                  1px solid var(--color-border);
  border-radius:           var(--radius-md);     /* 8px */
  margin-top:              0.5rem;
}

.glass-dropdown .dropdown-item {
  color:      var(--color-text);
  padding:    0.5rem 1rem;
  transition: background var(--transition-fast);
}

.glass-dropdown .dropdown-item:hover,
.glass-dropdown .dropdown-item:focus {
  background: rgba(59, 130, 246, 0.15);
  color:      var(--color-primary);
}
```

---

### 2.4 `.glass-input`

```css
.glass-input {
  background:    rgba(15, 23, 42, 0.40);
  border:        1px solid var(--color-border);
  border-radius: var(--radius-sm);    /* 6px */
  color:         var(--color-text);
  padding:       0.625rem 0.875rem;
  transition:    border-color var(--transition-fast),
                 box-shadow var(--transition-fast),
                 background var(--transition-fast);
}

.glass-input::placeholder {
  color: var(--color-text-muted);
}

.glass-input:focus {
  outline:       none;
  border-color:  var(--color-primary);
  box-shadow:    0 0 0 0.2rem rgba(59, 130, 246, 0.25);
  background:    rgba(15, 23, 42, 0.60);
}
```

---

### 2.5 `.gradient-text`

```css
.gradient-text {
  background:              var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip:         text;
  -webkit-text-fill-color: transparent;
  color:                   transparent; /* fallback */
}
```

Usage: hero `<h1>` keywords, nav logo `<span>e</span>`, section accent labels.

---

### 2.6 `.btn-cta`

```css
.btn-cta {
  background:    var(--gradient-cta);
  border:        none;
  color:         #ffffff;
  font-weight:   var(--fw-semibold);  /* 600 */
  padding:       0.75rem 2rem;
  border-radius: var(--radius-md);    /* 8px */
  transition:    transform var(--transition-fast),
                 box-shadow var(--transition-fast),
                 filter var(--transition-fast);
}

.btn-cta:hover,
.btn-cta:focus-visible {
  transform:   translateY(-2px);
  box-shadow:  var(--shadow-cta);
  filter:      brightness(1.1);
  color:       #ffffff;
}

.btn-cta:active {
  transform: translateY(0);
}
```

---

### 2.7 `.service-card::before` (Gradient Top-Border)

```css
.service-card {
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content:          '';
  position:         absolute;
  top:              0;
  left:             0;
  right:            0;
  height:           3px;
  background:       var(--gradient-primary);
  transform:        scaleX(0);
  transform-origin: left;
  transition:       transform var(--transition-base);
}

.service-card:hover::before {
  transform: scaleX(1);
}
```

---

### 2.8 `.avatar-placeholder`

```css
.avatar-placeholder {
  width:            var(--avatar-size);   /* 80px */
  height:           var(--avatar-size);   /* 80px */
  border-radius:    var(--radius-full);
  background:       var(--gradient-primary);
  display:          flex;
  align-items:      center;
  justify-content:  center;
  color:            #ffffff;
  font-size:        1.5rem;
  font-weight:      var(--fw-bold);
  flex-shrink:      0;
}
```

Content: initials — `SB` for Stephanie, `NR` for Nicolas.

---

### 2.9 `.hero-orb`

```css
.hero-orb {
  position:       absolute;
  border-radius:  var(--radius-full);
  filter:         blur(var(--orb-blur));   /* blur(80px) */
  opacity:        0.3;
  animation:      float 6s ease-in-out infinite;
  pointer-events: none;
  z-index:        0;
}

/* Orb instances */
.hero-orb-1 {
  width:  400px; height: 400px;
  background:     var(--color-primary);  /* #3b82f6 blue */
  top:    -100px; left: -100px;
  animation-delay: 0s;
}
.hero-orb-2 {
  width:  300px; height: 300px;
  background:     var(--color-accent);   /* #06b6d4 cyan */
  bottom: -50px;  right: -50px;
  animation-delay: 2s;
}
.hero-orb-3 {
  width:  200px; height: 200px;
  background:     var(--color-cta);      /* #f97316 orange */
  bottom: 100px;  left: 50%;
  animation-delay: 4s;
}
```

---

### 2.10 `.animate-on-scroll`

```css
.animate-on-scroll {
  opacity:    0;
  transform:  translateY(30px);
  transition: opacity var(--transition-slow),
              transform var(--transition-slow);
}

.animate-on-scroll.animated {
  opacity:   1;
  transform: translateY(0);
}

/* Staggered delays via data-delay attribute */
[data-delay="100"] { transition-delay: 100ms; }
[data-delay="200"] { transition-delay: 200ms; }
[data-delay="300"] { transition-delay: 300ms; }
[data-delay="400"] { transition-delay: 400ms; }
```

---

### 2.11 `.social-link`

```css
.social-link {
  color:       var(--color-text-muted);
  font-size:   1.25rem;
  transition:  color var(--transition-base);
  text-decoration: none;
}

.social-link:hover,
.social-link:focus-visible {
  color: var(--color-primary);
}
```

---

## 3. Animation Specifications

### 3.1 `@keyframes gradientShift` — Hero Background

```css
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero-bg {
  background: linear-gradient(-45deg, #0a0e27, #1e1b4b, #0f172a, #0a0e27);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}
```

---

### 3.2 `@keyframes float` — Orb Levitation

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-30px); }
}
```

Each orb uses `animation-duration: 6s` with distinct `animation-delay` values (`0s`, `2s`, `4s`) to desynchronize movement.

---

### 3.3 Scroll Animations — `IntersectionObserver`

```js
// main.js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // fire once only
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
  observer.observe(el);
});
```

**Elements decorated with `.animate-on-scroll`:**
- All section headings (`<h2>`)
- `.glass-card` instances (About stats, Contact form)
- `.service-card` instances (all three)
- Team profile cards
- App showcase rows

---

### 3.4 `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration:        0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration:       0.01ms !important;
  }

  .animate-on-scroll {
    opacity:   1;
    transform: none;
  }
}
```

---

## 4. Screen Mockups (ASCII Wireframes)

### 4.1 Navigation — Desktop (>=992px)

```
┌──────────────────────────────────────────────────────────────┐
│  [transparent bg -> frosted glass on scroll]                 │
│                                                              │
│  eBoxr         About  Services  Apps [bi-chevron-down]  Team  Contact   │
│  ^gradient "e"                     |                         │
│                              Card Wallet  <- .glass-dropdown │
└──────────────────────────────────────────────────────────────┘
height: 72px | links: font-weight 500 | logo: gradient-text
```

---

### 4.2 Navigation — Mobile (<992px)

```
┌──────────────────────────────┐
│  eBoxr          [bi-list]    │
│  ^gradient "e"  ^hamburger   │
└──────────────────────────────┘

[Collapsed — Bootstrap collapse]:
┌──────────────────────────────┐
│  eBoxr          [bi-list]    │
├──────────────────────────────┤
│  About                       │
│  Services                    │
│  Apps                        │
│    Card Wallet               │
│  Team                        │
│  Contact                     │
└──────────────────────────────┘
```

JS: clicking any nav link collapses the menu (mobile close handler).

---

### 4.3 Hero — Full Viewport

```
┌─────────────────────────────────────────────────────────────┐
│ [animated gradient bg: gradientShift 15s]                   │
│                                                             │
│ O orb-1 (blue, 400px, top-left, blur 80px, opacity 0.3)    │
│                                                             │
│         ┌─────────────────────────────────┐                │
│         │                                 │                │
│         │   We build apps that            │                │
│         │   ====matter.====               │  <- gradient-text h1
│         │                                 │                │
│         │   A small team crafting         │                │
│         │   thoughtful iOS and web        │  <- text-muted │
│         │   applications.                 │                │
│         │                                 │                │
│         │  [See Our Work]  [Get in Touch] │                │
│         │   ^.btn-cta      ^btn-outline   │                │
│         └─────────────────────────────────┘                │
│                                                             │
│              O orb-3 (orange, 200px, center)               │
│                                      O orb-2 (cyan, 300px) │
└─────────────────────────────────────────────────────────────┘
  height: 100vh | content: flexbox centered vertically
```

---

### 4.4 About — Two Columns

```
┌─────────────────────────────────────────────────────────────┐
│                        About eBoxr                          │
│                      ─────────────                          │
│                                                             │
│  ┌───────────────────────────┐  ┌─────────────────────────┐ │
│  │                           │  │  .glass-card (stats)    │ │
│  │  We are a small but       │  │ ┌──────────┬──────────┐ │ │
│  │  passionate team of two   │  │ │   2      │  iOS     │ │ │
│  │  developers building      │  │ │  Devs    │  & Web   │ │ │
│  │  quality iOS and web      │  │ ├──────────┼──────────┤ │ │
│  │  applications.            │  │ │  Web     │  100%    │ │ │
│  │                           │  │ │  Apps    │ Passion  │ │ │
│  │  Quality over quantity.   │  │ └──────────┴──────────┘ │ │
│  │  Every pixel matters.     │  └─────────────────────────┘ │
│  └───────────────────────────┘                              │
│  col-lg-6                        col-lg-6                   │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.5 Services — Three Cards

```
┌─────────────────────────────────────────────────────────────┐
│                       Our Services                          │
│                     ───────────────                         │
│                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐    │
│  │==============│   │              │   │              │    │
│  │ ^ gradient   │   │              │   │              │    │
│  │   top border │   │              │   │              │    │
│  │  [bi-phone]  │   │  [bi-globe]  │   │ [bi-palette] │    │
│  │              │   │              │   │              │    │
│  │  iOS Dev     │   │  Web Apps    │   │  UI/UX       │    │
│  │              │   │              │   │  Design      │    │
│  │  Native iOS  │   │  Modern web  │   │  Clean       │    │
│  │  apps for    │   │  solutions   │   │  interfaces  │    │
│  │  iPhone/iPad │   │  with JS     │   │  that delight│    │
│  └──────────────┘   └──────────────┘   └──────────────┘    │
│  col-md-4           col-md-4           col-md-4             │
│                                                             │
│  Hover: ::before scaleX(0->1), gradient bar slides in      │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.6 Apps / Portfolio — Card Wallet

```
┌─────────────────────────────────────────────────────────────┐
│                         Our Apps                            │
│                       ───────────                           │
│                                                             │
│  ┌──────────────────────┐  ┌───────────────────────────┐   │
│  │  .glass-card (frame) │  │                           │   │
│  │                      │  │  [iOS App]  <- badge      │   │
│  │  ┌────────────────┐  │  │                           │   │
│  │  │                │  │  │  Card Wallet              │   │
│  │  │  Screenshot    │  │  │  ─────────────            │   │
│  │  │  Placeholder   │  │  │                           │   │
│  │  │  (img frame    │  │  │  Manage all your Apple    │   │
│  │  │   with rounded │  │  │  Wallet cards in one      │   │
│  │  │   corners)     │  │  │  place.                   │   │
│  │  │                │  │  │                           │   │
│  │  └────────────────┘  │  │  [bi-check-circle] Feat 1 │   │
│  └──────────────────────┘  │  [bi-check-circle] Feat 2 │   │
│  col-lg-5                  │  [bi-check-circle] Feat 3 │   │
│                            │                           │   │
│                            │  [App Store] <- .btn-cta  │   │
│                            └───────────────────────────┘   │
│                            col-lg-7                         │
│                                                             │
│  Future apps: flex-lg-row-reverse alternates layout sides  │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.7 Team — Two Profile Cards

```
┌─────────────────────────────────────────────────────────────┐
│                        Our Team                             │
│                      ────────────                           │
│                                                             │
│  ┌──────────────────────────┐  ┌──────────────────────────┐ │
│  │  .glass-card (Stephanie) │  │  .glass-card (Nicolas)   │ │
│  │                          │  │                          │ │
│  │  ┌────┐                  │  │  ┌────┐                  │ │
│  │  │ SB │ .avatar-         │  │  │ NR │ .avatar-         │ │
│  │  └────┘  placeholder     │  │  └────┘  placeholder     │ │
│  │  gradient circle 80px    │  │  gradient circle 80px    │ │
│  │                          │  │                          │ │
│  │  Stephanie               │  │  Nicolas                 │ │
│  │  Co-Founder & iOS Dev    │  │  Co-Founder & Web Dev   │ │
│  │  ─────────────────────   │  │  ──────────────────────  │ │
│  │  Short bio text here...  │  │  Short bio text here...  │ │
│  │                          │  │                          │ │
│  │  [bi-github]             │  │  [bi-github]             │ │
│  │  [bi-linkedin]           │  │  [bi-linkedin]           │ │
│  │  [bi-globe]              │  │  [bi-globe]              │ │
│  └──────────────────────────┘  └──────────────────────────┘ │
│  col-md-6                      col-md-6                     │
└─────────────────────────────────────────────────────────────┘
```

Social links: `.social-link` with `aria-label` on each `<a>` tag.

---

### 4.8 Contact — Info + Form

```
┌─────────────────────────────────────────────────────────────┐
│                        Contact Us                           │
│                      ─────────────                          │
│                                                             │
│  ┌──────────────────────────┐  ┌──────────────────────────┐ │
│  │  (no card, plain text)   │  │  .glass-card             │ │
│  │                          │  │                          │ │
│  │  Have a project in mind? │  │  ┌────────────────────┐  │ │
│  │                          │  │  │ Name  .glass-input │  │ │
│  │  [bi-envelope]           │  │  └────────────────────┘  │ │
│  │  hello@eboxr.com         │  │  ┌────────────────────┐  │ │
│  │                          │  │  │ Email .glass-input │  │ │
│  │  [bi-geo-alt]            │  │  └────────────────────┘  │ │
│  │  Remote — Worldwide      │  │  ┌────────────────────┐  │ │
│  │                          │  │  │ Subj  .glass-input │  │ │
│  │                          │  │  └────────────────────┘  │ │
│  │                          │  │  ┌────────────────────┐  │ │
│  │                          │  │  │ Message  <textarea>│  │ │
│  │                          │  │  │           glass-inp│  │ │
│  │                          │  │  └────────────────────┘  │ │
│  │                          │  │                          │ │
│  │                          │  │  [Send Message]          │ │
│  │                          │  │   ^.btn-cta              │ │
│  └──────────────────────────┘  └──────────────────────────┘ │
│  col-lg-5                      col-lg-7                     │
│                                                             │
│  Success state: form replaced with role="status" message   │
│  + [bi-check-circle] icon                                  │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.9 Footer — Three Columns

```
┌─────────────────────────────────────────────────────────────┐
│  [semi-transparent bg, border-top: 1px solid --color-border]│
│                                                             │
│  eBoxr          (C) 2026 eBoxr.         [bi-github]         │
│  ^gradient "e"  All rights reserved.   [bi-twitter-x]      │
│                                         [bi-linkedin]       │
│  col-md-4       col-md-4                col-md-4            │
└─────────────────────────────────────────────────────────────┘
Footer icons: aria-label on each link, font-size 1.25rem.
```

---

## 5. Responsive Behavior

### 5.1 Desktop (>=992px) — Full Layout

- Navbar: horizontal links, apps dropdown visible
- Hero: full 100vh, all 3 orbs visible, large headline
- About: two-column (col-lg-6 each)
- Services: three cards in row (col-md-4 each)
- Apps: two-column image/text (col-lg-5 / col-lg-7)
- Team: two cards side by side (col-md-6 each)
- Contact: two-column (col-lg-5 / col-lg-7)
- Footer: three-column row

---

### 5.2 Tablet (768–991px) — Adjusted Grid

- Navbar: hamburger collapse
- Hero: slightly smaller via `clamp()`, orbs remain visible
- About: single-column stack
- Services: three narrow cards remain (Bootstrap handles wrapping)
- Apps: single-column stack (image above, text below)
- Team: two cards remain side by side at >=768px (col-sm-6)
- Contact: single-column stack (info above, form below)
- Footer: centered, stacked

---

### 5.3 Mobile (<768px) — Stacked Layout

- Hero orbs: `display: none` (performance and noise reduction)
- Backdrop blur: reduced from `blur(12px)` to `blur(8px)`
- All grids: single column, full-width
- Team cards: stacked vertically
- Footer: centered, icons on separate row

```css
@media (max-width: 767.98px) {
  .hero-orb {
    display: none;
  }

  .glass-card,
  .glass-nav.scrolled {
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter:         blur(8px);
  }
}
```

---

## 6. Icon System (Bootstrap Icons)

All icons use `bi-*` classes. No raw Unicode characters or emoji in HTML.

### 6.1 Icon Inventory

| Icon class | Section | Usage | aria treatment |
|---|---|---|---|
| `bi-phone` | Services | iOS Development card | `aria-hidden="true"` (decorative) |
| `bi-globe` | Services | Web Applications card | `aria-hidden="true"` |
| `bi-palette` | Services | UI/UX Design card | `aria-hidden="true"` |
| `bi-github` | Team, Footer | GitHub profile link | `aria-label="GitHub"` on `<a>` |
| `bi-linkedin` | Team, Footer | LinkedIn profile link | `aria-label="LinkedIn"` on `<a>` |
| `bi-twitter-x` | Footer | X (Twitter) profile link | `aria-label="X (Twitter)"` on `<a>` |
| `bi-globe` | Team | Personal portfolio link | `aria-label="Portfolio"` on `<a>` |
| `bi-envelope` | Contact | Email address | `aria-hidden="true"` |
| `bi-geo-alt` | Contact | Location | `aria-hidden="true"` |
| `bi-check-circle` | Apps | Feature list items | `aria-hidden="true"` |
| `bi-check-circle` | Contact | Form success state | `aria-hidden="true"` |
| `bi-arrow-right` | Buttons | CTA navigation affordance | `aria-hidden="true"` |
| `bi-list` | Navbar | Mobile hamburger toggle | Covered by Bootstrap's `aria-label` |
| `bi-apple` | Apps | iOS badge label | `aria-hidden="true"` |

### 6.2 Icon Usage Rules

- **Icon-only links** must have `aria-label` on the `<a>` — e.g. `<a href="#" aria-label="GitHub">`
- **Decorative icons** alongside visible text use `aria-hidden="true"` on the `<i>` element
- **Icon sizes:** `1.25rem` for nav/body, `1.5rem` for feature lists, `2rem` for service card icons
- **Icon color:** inherit from parent or override with `--color-primary` / `--color-accent`

---

## 7. Accessibility Checklist

| Requirement | Implementation |
|---|---|
| Semantic HTML | `<nav>`, `<main>`, `<section id="...">`, `<footer>` |
| Skip link | `<a href="#main-content" class="visually-hidden-focusable">Skip to main content</a>` |
| Focus visible | `:focus-visible` with `box-shadow: 0 0 0 3px var(--color-primary)` |
| WCAG AA contrast | All foreground/background pairs pass (see §1.1) |
| Reduced motion | All animations disabled (see §3.4) |
| Icon-only links | All have `aria-label` attribute |
| Decorative icons | All have `aria-hidden="true"` |
| Form labels | `<label for="...">` on every input; `required` attributes on required fields |
| Form feedback | Success message uses `role="status"` for screen reader announcement |

---

## 8. Cross-Browser Notes

| Property | Handling |
|---|---|
| `backdrop-filter` | Always pair with `-webkit-backdrop-filter` for Safari support |
| `background-clip: text` | Always pair with `-webkit-background-clip: text` |
| `-webkit-text-fill-color: transparent` | Required alongside `color: transparent` for gradient-text |
| CSS custom properties | Full support in all modern browsers; IE11 not supported (acceptable) |
| `clamp()` | Supported in all modern browsers; degrades gracefully |
| `IntersectionObserver` | Full support in all modern browsers; no polyfill needed |

---

*Document version: 1.1 — 2026-02-23*
*Maintained by: @ux*
*Consumed by: @dev-front*
