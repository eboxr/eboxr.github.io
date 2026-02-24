# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

eBoxr.com is a static single-page portfolio website. No build tools, no npm, no bundler — just `index.html`, `css/style.css`, and `js/main.js` served directly.

## Tech Stack

- **HTML5** with Bootstrap 5.3.8 dark theme (`data-bs-theme="dark"`)
- **Bootstrap 5.3.8** CSS + JS Bundle via CDN (SRI integrity hashes required)
- **Bootstrap Icons 1.13.1** via CDN (SRI required)
- **Google Fonts: Inter** (400, 500, 600, 700)
- **No dependencies to install** — open `index.html` in a browser

## Architecture

### Virtual Page System (SPA via Hash Routing)

The site uses a custom SPA pattern — a single HTML file with 5 virtual pages toggled by hash routing:

| Hash | Page | In Nav |
|------|------|--------|
| `#home` | Hero with CTAs | Yes |
| `#about` | About + stats | No (reachable via Home CTA) |
| `#services` | 3 service cards | Yes |
| `#card-wallet` | App showcase | Yes (Apps dropdown) |
| `#team` | Team profiles | Yes |

Each page is a `<section class="page" data-page="name">` inside `<main>`. Only one has `.page-active` at a time. The footer lives outside `<main>` and persists across all pages.

### CSS Design System

All design tokens are CSS custom properties in `:root` (style.css lines 5-19):
- `--color-bg`, `--color-surface`, `--color-border`, `--color-primary`, `--color-accent`, `--color-cta`, `--color-text`, `--color-text-muted`
- `--gradient-primary` (blue→cyan), `--gradient-cta` (orange→amber)
- `--navbar-height: 72px` (56px on mobile)

**Glassmorphism** is the core visual pattern: `backdrop-filter: blur(12px)` with semi-transparent backgrounds. Applied via `.glass-nav`, `.glass-card`, `.glass-dropdown`.

### JS Architecture (main.js)

Four logical modules inside a single DOMContentLoaded handler:

1. **Hash Router** — `navigateTo(pageName)` handles page transitions with exit/enter animations, `history.pushState` for hash updates, back/forward via `hashchange` listener
2. **Navigation Events** — Click handlers on `[data-page]` links and `.nav-page-link` CTAs
3. **Initial Load** — Validates hash, activates correct page without animation
4. **Mobile Nav Close** — Collapses Bootstrap navbar on link click

Key state: `currentPage` (string), `isNavigating` (lock to prevent rapid transitions).

Page transitions: `.page-exiting` (300ms) → remove old page → `.page-entering` (400ms) on new page. Skipped entirely when `prefers-reduced-motion: reduce`.

## Specification Documents (Read-Only Source of Truth)

- **`specs.md`** — Exhaustive technical specifications: file structure, CDN deps, color palette with WCAG contrast ratios, global CSS utilities, section-by-section specs, JS module specs
- **`design-system.md`** — Design tokens, component specifications, wireframes, spacing/typography scales
- **`plan.md`** — Virtual page system implementation plan and verification checklist

These documents define the intended behavior. Consult them before making changes to ensure alignment.

## Key Conventions

- **SRI hashes** are mandatory on all CDN `<link>` and `<script>` tags
- **`prefers-reduced-motion`** must be respected — all animations/transitions get near-zero duration, transforms removed
- **Accessibility**: skip-nav link, semantic HTML (`<main>`, `<section>`, `<nav>`, `<footer>`), `aria-label` on icon-only elements, focus management on page navigation (h1/h2 receives focus for screen reader announcement)
- **Staggered animations**: elements with `.page-enter-animate` animate in on page entry; use `data-delay` attribute for custom timing
- **Navigation links** use `data-page` attribute to specify target page
- **Commit messages** follow conventional commits (`fix:`, `refactor:`, `docs:`, `chore:`, `feat:`)
