# Plan: Convert eBoxr.com to SPA-Style Virtual Page Navigation

## Context

The site currently stacks 8 sections vertically with smooth-scroll navigation. The goal is to keep a single `index.html` but make it **feel like a multi-page site** — only one "page" visible at a time, with fade+slide transitions, hash-based routing, and browser back/forward support. Contact section is removed entirely.

---

## Virtual Pages (5)

| Hash | Page | In Nav? | Content |
|------|------|---------|---------|
| `#home` | Home | Yes | Hero: headline, tagline, 2 CTAs ("About Us" → #about, "Meet the Team" → #team) |
| `#about` | About | No (CTA from Home) | About eBoxr text + stats card (2 Devs, iOS & Web, 100% Passion, Quality) |
| `#services` | Services | Yes | 3 service cards (iOS, Web, UI/UX) |
| `#card-wallet` | Card Wallet | Yes (Apps dropdown) | Card Wallet showcase (screenshot placeholder, features, App Store CTA) |
| `#team` | Team | Yes | Stephanie & Nicolas profiles with social links |

**Nav bar:** Home, Services, Apps▾ (Card Wallet), Team
**Removed:** About nav link, Contact nav link, Contact section
**Footer:** Persists outside page system, visible on all pages

---

## Files to Modify

### 1. `index.html` — HTML restructuring

**Navigation changes:**
- Remove "About" and "Contact" nav links
- Add "Home" as first nav link: `<a class="nav-link" href="#home" data-page="home">Home</a>`
- Add `data-page` attribute to all nav links for router binding
- Apps dropdown: toggle stays as dropdown opener, "Card Wallet" item gets `data-page="card-wallet"`
- Brand logo: `href="#home"`

**Section restructuring:**
- Wrap each kept section in `<section class="page" data-page="...">` with unique ID
- Home page (`#home`): keep hero content, change CTAs:
  - "See Our Work" → "About Us" linking to `#about`
  - "Get in Touch" → "Meet the Team" linking to `#team`
  - Add `nav-page-link` class to both CTA buttons for router interception
- About page (`#about`): keep existing about text + stats card, wrap as page
- Services page (`#services`): keep 3 service cards, wrap as page
- Card Wallet page (`#card-wallet`): keep app showcase content, wrap as page (remove `app-section` class)
- Team page (`#team`): keep both profile cards, wrap as page
- **Delete:** Contact section entirely (lines 300-364)
- Home page gets `page-active` class as default
- Replace all `animate-on-scroll` → `page-enter-animate` throughout

**Footer:** Stays outside `<main>`, no changes needed

### 2. `css/style.css` — CSS changes

**Remove:**
- `html { scroll-behavior: smooth; }` — no more scrolling between sections
- `.glass-nav.scrolled` variant — navbar is always frosted now
- `.animate-on-scroll` / `.animate-on-scroll.animated` — replaced by page system
- `.glass-input` styles (lines 121-137) — contact form removed
- Scroll-based navbar transition logic

**Modify:**
- `.glass-nav`: always apply frosted glass (blur, bg, border) — no `.scrolled` needed
- `.hero-section`: remove `padding-top: 5rem` (the `.page` wrapper handles navbar offset), keep `min-height: calc(100vh - 72px)`
- Active nav link: add `.nav-link.page-active` with gradient underline indicator

**Add:**
```css
/* Virtual Page System */
.page { display: none; min-height: calc(100vh - 72px); padding-top: 72px; }
.page.page-active { display: block; }
.page.page-entering { animation: pageEnter 0.4s ease forwards; }
.page.page-exiting { animation: pageExit 0.3s ease forwards; }

@keyframes pageEnter {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pageExit {
  from { opacity: 1; }
  to { opacity: 0; transform: translateY(-10px); }
}

/* Page-enter animations (replaces scroll animations) */
.page-enter-animate { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
.page-active .page-enter-animate.animated { opacity: 1; transform: translateY(0); }
```

**Update `prefers-reduced-motion`:** Add page system classes — skip all animations, show pages instantly

**Update responsive:** Adjust `.page` padding-top for mobile navbar height (56px)

### 3. `js/main.js` — Complete rewrite

**Remove all 5 existing modules** (navbar scroll, scrollspy, scroll animations, mobile nav close, contact form)

**New modules (4):**

1. **Hash Router** — core SPA logic:
   - `getPageFromHash()` — parse URL hash, validate against known pages, default to `home`
   - `navigateTo(pageName)` — exit-animate current page → show target page with enter animation
   - `showPage(page)` — display page, trigger `page-enter-animate` elements with staggered delays
   - `updateNavActive(pageName)` — toggle `.page-active` on nav links, handle Apps dropdown
   - Handle `#card-wallet` from dropdown correctly as its own page

2. **Navigation Events:**
   - Click handlers on all `[data-page]` nav links and `.nav-page-link` CTA buttons
   - `hashchange` listener for browser back/forward
   - Brand logo click → `#home`

3. **Initial Load:**
   - Read hash from URL, navigate to that page (or default `#home`)

4. **Mobile Nav Close** (kept, updated):
   - Close Bootstrap collapse on any nav link or dropdown item click

**Edge cases:**
- Invalid hash → redirect to `#home`
- Same-page click → no-op (no re-animation)
- Navigation lock during transition (prevent rapid clicks)
- `prefers-reduced-motion` → instant page swaps, no animation

---

## Implementation Order

0. **Overwrite `plan.md`** with this new plan (replaces the old scroll-based plan)
1. **CSS first:** Add `.page` system classes, modify navbar to always-frosted, add page-enter animations, remove scroll animation classes, remove contact form styles
2. **HTML second:** Restructure sections into `.page` wrappers, update nav links, merge/move content, remove contact section
3. **JS third:** Complete rewrite — hash router, navigation events, initial load, mobile nav close
4. **Cleanup:** Remove dead CSS, update `prefers-reduced-motion`, verify responsive

---

## Verification

1. Open `index.html` — Home page loads by default, navbar is frosted
2. Click each nav link — page transitions with fade+slide, correct content shows
3. Click "About Us" CTA on Home → About page appears
4. Click Apps > Card Wallet → Card Wallet page appears
5. Browser back/forward buttons work correctly
6. Direct URL `index.html#team` loads Team page
7. Invalid hash `#contact` redirects to Home
8. Mobile: hamburger menu works, closes on link click
9. `prefers-reduced-motion`: instant page swaps, no animations
10. Footer visible on every page
11. All content preserved (hero, about text+stats, services, card wallet, team profiles)
