# Platform 9¾ — Responsive Landing Page

Task 1 submission for the Web Development Internship: a simple, responsive landing page built with plain HTML & CSS.

This is a fan-made, **non-commercial** practice project themed around the wizarding-school world — built to make a basic header/hero/footer exercise more fun to design and read. All copy is original; no text is copied from any book or film, and the artwork (envelope, wax seal, house cards) is hand-drawn in SVG rather than copied from any official logo or crest.

## What was built

- **Header** — quill-and-envelope logo mark + nav links, sticky, collapses into a hamburger menu on small screens.
- **Hero** — "Your letter has arrived" heading, supporting paragraph, two CTAs, and an original SVG illustration of a wax-sealed envelope with a quill as the page's signature visual.
- **Houses section** — a 4-column CSS Grid of house cards (one per house, colored to match), reflowing to 2 then 1 column on smaller screens.
- **Departures section** — a two-column layout (copy + a "departures board" list) that stacks on tablet/mobile.
- **Footer** — brand mark, playful link labels, and a copyright line, using Flexbox with wrapping.

## How responsiveness was handled

- CSS Grid for the hero and house-card layouts; Flexbox for the header and footer.
- Media queries at `900px`, `700px`, and `480px` to stack columns, collapse the nav into a toggle menu, and resize type for small screens.
- Fluid type sizing via `clamp()` for headings.
- A small inline script toggles the mobile nav and closes it on link tap; no other JavaScript is used.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure/content |
| `style.css` | All styling, layout, and media queries |

## Running it locally

1. Open the folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` → **Open with Live Server**.
4. Resize the browser (or use DevTools device toolbar) to check the breakpoints at 900px, 700px, and 480px.

## Key concepts demonstrated

HTML5 semantic structure, CSS3, Flexbox, Grid, media queries, responsive design, accessible focus states, and a mobile nav pattern.
