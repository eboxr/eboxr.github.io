# eBoxr.com — Design System

---

## 1. Color Palette (CSS Custom Properties)

```css
:root {
  --color-bg: #0a0e27;
  --color-surface: rgba(15, 23, 42, 0.60);
  --color-border: rgba(255, 255, 255, 0.08);
  --color-primary: #3b82f6;
  --color-accent: #06b6d4;
  --color-cta: #f97316;
  --color-cta-hover: #fb923c;
  --gradient-primary: linear-gradient(135deg, #3b82f6, #06b6d4);
  --gradient-cta: linear-gradient(135deg, #f97316, #f59e0b);
  --color-text: #e2e8f0;
  --color-text-muted: #94a3b8;
}
```

---

## 2. Typography

| Token         | Value                              |
|---------------|------------------------------------|
| Font family   | `'Inter', sans-serif`              |
| h1 / display  | `3rem` / `fw-bold` (700)          |
| h2 / display-5| `2.5rem` / `fw-bold` (700)        |
| h3 / h5       | `1.25rem` / `fw-bold` (700)       |
| Body          | `1rem` / 400                       |
| Small / muted | `0.875rem` / 400                   |
| Lead          | `1.25rem` / 400, `text-muted`     |
| Line height   | 1.6 (body), 1.2 (headings)        |

---

## 3. Spacing System

| Token              | Value    |
|--------------------|----------|
| Section padding    | `py-5` (3rem top/bottom) |
| Container          | Bootstrap `.container` (max-width responsive) |
| Card padding       | `p-4` (1.5rem) |
| Row gap            | `g-4` (1.5rem) or `g-5` (3rem) |
| Component gap      | `gap-3` (1rem) |
| Heading margin     | `mb-4` (1.5rem) or `mb-5` (3rem) |

---

## 4. Component Specifications

### .glass-card
```css
.glass-card {
  background: var(--color-surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
}
```

### .glass-nav
```css
.glass-nav {
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}
.glass-nav.scrolled {
  background: rgba(10, 14, 39, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}
```

### .glass-dropdown
```css
.glass-dropdown {
  background: rgba(10, 14, 39, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
}
```

### .glass-input
```css
.glass-input {
  background: rgba(15, 23, 42, 0.40);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 0.5rem;
}
.glass-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
  background: rgba(15, 23, 42, 0.60);
}
```

### .gradient-text
```css
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### .btn-cta
```css
.btn-cta {
  background: var(--gradient-cta);
  border: none;
  color: #fff;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}
.btn-cta:hover {
  box-shadow: 0 4px 24px rgba(249, 115, 22, 0.4);
  transform: translateY(-2px);
  color: #fff;
}
```

### .service-card::before
```css
.service-card {
  position: relative;
  overflow: hidden;
}
.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
.service-card:hover::before {
  transform: scaleX(1);
}
```

### .avatar-placeholder
```css
.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
```

### .social-link
```css
.social-link {
  color: var(--color-text-muted);
  font-size: 1.25rem;
  transition: color 0.3s ease;
  text-decoration: none;
}
.social-link:hover {
  color: var(--color-primary);
}
```

---

## 5. Animation Specifications

### Hero gradient background
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

### Hero orbs
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-30px); }
}
.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}
.hero-orb-1 {
  width: 400px; height: 400px;
  background: var(--color-primary);
  top: -100px; left: -100px;
  animation-delay: 0s;
}
.hero-orb-2 {
  width: 300px; height: 300px;
  background: var(--color-accent);
  bottom: -50px; right: -50px;
  animation-delay: 2s;
}
.hero-orb-3 {
  width: 200px; height: 200px;
  background: var(--color-cta);
  bottom: 100px; left: 50%;
  animation-delay: 4s;
}
```

### Scroll animations
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.animate-on-scroll.animated {
  opacity: 1;
  transform: translateY(0);
}
```

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .animate-on-scroll {
    opacity: 1;
    transform: none;
  }
}
```

---

## 6. Icon System (Bootstrap Icons)

| Icon              | Class               | Usage                   |
|-------------------|---------------------|-------------------------|
| Phone             | `bi-phone`          | iOS Development service |
| Globe             | `bi-globe`          | Web Apps service + portfolio link |
| Palette           | `bi-palette`        | UI/UX Design service    |
| GitHub            | `bi-github`         | Social link             |
| LinkedIn          | `bi-linkedin`       | Social link             |
| X/Twitter         | `bi-twitter-x`      | Social link             |
| Envelope          | `bi-envelope`       | Contact email           |
| Geo Alt           | `bi-geo-alt`        | Location                |
| Check Circle      | `bi-check-circle`   | Feature list items      |
| Arrow Right       | `bi-arrow-right`    | Form submit button      |
| List (hamburger)  | `bi-list`           | Mobile nav toggle       |
| Person Fill       | `bi-person-fill`    | Avatar placeholder      |
| Heart Fill        | `bi-heart-fill`     | About stats             |
| Apple             | `bi-apple`          | iOS badge               |

---

## 7. Responsive Breakpoints

| Breakpoint | Width     | Behavior                              |
|------------|-----------|---------------------------------------|
| Desktop    | ≥992px    | Full multi-column layout              |
| Tablet     | 768–991px | 2-column grids collapse appropriately |
| Mobile     | <768px    | Single column, hamburger nav          |

### Mobile-specific adjustments
- Hero heading: reduce to `2rem`
- Hero orbs: `display: none` or `opacity: 0.1`
- Service cards: full-width stack
- Team cards: full-width stack
- Contact form: full-width
- Footer: centered stack

---

## 8. Screen Mockups

### Navigation (Desktop)
```
┌──────────────────────────────────────────────────────┐
│  eBoxr    About  Services  Apps▾  Team  Contact      │
│                              └─ Card Wallet          │
└──────────────────────────────────────────────────────┘
```

### Navigation (Mobile)
```
┌─────────────────────────┐
│  eBoxr              ☰   │
├─────────────────────────┤
│  About                  │
│  Services               │
│  Apps ▾                 │
│    Card Wallet          │
│  Team                   │
│  Contact                │
└─────────────────────────┘
```

### Hero
```
┌──────────────────────────────────────────────────────┐
│  ○ (orb 1, blue blur)                                │
│                                                      │
│           We build apps that matter.                 │
│                                                      │
│     A small team crafting thoughtful iOS and          │
│              web applications.                       │
│                                                      │
│       [See Our Work]  [Get in Touch]                 │
│                                                      │
│                    ○ (orb 3, orange)                  │
│                              ○ (orb 2, cyan blur)    │
└──────────────────────────────────────────────────────┘
```

### About
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  About eBoxr                 ┌──────────────────┐    │
│                              │  2    │  iOS      │    │
│  Small team, big ambitions.  │ Devs  │  & Web    │    │
│  We're Stephanie and         ├───────┼──────────┤    │
│  Nicolas...                  │ 100%  │  ♥        │    │
│                              │Passion│ Quality   │    │
│                              └──────────────────┘    │
└──────────────────────────────────────────────────────┘
```

### Services
```
┌──────────────────────────────────────────────────────┐
│              What We Do                              │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  📱       │  │  🌐       │  │  🎨       │           │
│  │  iOS Dev  │  │  Web Apps │  │  UI/UX   │           │
│  │  Native   │  │  Modern   │  │  Design  │           │
│  │  Swift... │  │  web...   │  │  Clean...│           │
│  └──────────┘  └──────────┘  └──────────┘           │
└──────────────────────────────────────────────────────┘
```

### Apps (Card Wallet)
```
┌──────────────────────────────────────────────────────┐
│              Our Apps                                │
│                                                      │
│  ┌──────────────┐    [iOS] badge                     │
│  │              │    Card Wallet                     │
│  │   📱 Screen  │    Your Apple Wallet               │
│  │  placeholder │    management companion...         │
│  │              │    ✓ Feature 1                     │
│  └──────────────┘    ✓ Feature 2                     │
│                      ✓ Feature 3                     │
│                      [ App Store ]                   │
└──────────────────────────────────────────────────────┘
```

### Team
```
┌──────────────────────────────────────────────────────┐
│              Meet the Team                           │
│                                                      │
│     ┌──────────────┐    ┌──────────────┐             │
│     │     (○)      │    │     (○)      │             │
│     │  Stephanie   │    │   Nicolas    │             │
│     │  iOS Dev &   │    │  Web Dev &   │             │
│     │  Designer    │    │  Engineer    │             │
│     │  Bio text... │    │  Bio text... │             │
│     │  🔗 🔗 🔗     │    │  🔗 🔗 🔗     │             │
│     └──────────────┘    └──────────────┘             │
└──────────────────────────────────────────────────────┘
```

### Contact
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  Get in Touch              ┌──────────────────┐      │
│                            │  Name  [_______]  │      │
│  Have a project in mind?   │  Email [_______]  │      │
│                            │  Subj  [_______]  │      │
│  ✉ hello@eboxr.com        │  Msg   [_______]  │      │
│  📍 Remote — Worldwide     │         [_______]  │      │
│                            │  [Send Message →] │      │
│                            └──────────────────┘      │
└──────────────────────────────────────────────────────┘
```

### Footer
```
┌──────────────────────────────────────────────────────┐
│  eBoxr       © 2026 eBoxr. All rights reserved.  🔗🔗🔗│
└──────────────────────────────────────────────────────┘
```
