# Hogwarts School of Witchcraft & Wizardry — Responsive Page

Task 4 submission for the Web Development Internship: a desktop-only Hogwarts-themed page converted to a fully mobile-friendly layout using CSS media queries.

This is a fan-made, **non-commercial** practice project themed to match the Platform 9¾ and Marauder's List projects from Tasks 1 and 2. All copy is original; no text is copied from any book or film.

## What the page includes

- **Nav** — fixed header with horizontal links on desktop, collapsing into an animated hamburger menu on mobile
- **Hero** — full-screen opening section with school name, tagline, and two CTA buttons
- **Houses** — four-column grid of house cards with icons and house color swatches
- **Courses** — three-column grid of subject cards (Divination, Potions, Herbology, DADA, Charms, Astronomy)
- **Quote** — Dumbledore quote section
- **Stats** — four-column grid of castle facts
- **Footer** — school info and nav links

## How responsiveness was handled

All mobile overrides are inside two media query blocks — nothing in the desktop base was deleted, the queries simply layer on top.

- `@media (max-width: 768px)` — main mobile breakpoint:
  - Horizontal nav hidden, hamburger button revealed (JS toggles `.open` class)
  - Houses grid: 4 columns → 2 columns
  - Courses grid: 3 columns → 1 column
  - Stats grid: 4 columns → 2×2 grid
  - Hero buttons stack vertically and go full width
  - Section padding reduced
  - `overflow-x: hidden` prevents any scrollbar from fixed-width children

- `@media (max-width: 420px)` — extra small phones:
  - Houses grid: 2 columns → 1 column

Headings use `clamp()` for fluid type sizing so font sizes scale automatically between breakpoints without needing extra overrides.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure and content |
| `style.css` | Desktop base styles + mobile media queries |
| `script.js` | Hamburger menu toggle (open/close on click and link tap) |

## Running it locally

1. Open the folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` → **Open with Live Server**.
4. Open Chrome DevTools → toggle device toolbar (Cmd+Shift+M) to test at 375px and 768px.

## Key concepts demonstrated

CSS media queries, responsive grid layouts, fluid typography with `clamp()`, hamburger nav pattern, viewport meta tag, and `overflow-x` management.
