# The Marauder's List — Themed To-Do App

Task 2 submission for the Web Development Internship: a dynamic to-do list built with vanilla HTML, CSS, and JavaScript.

This is a fan-made, **non-commercial** practice project themed to match the "Platform 9¾" landing page from Task 1, reusing the same parchment/gold/maroon palette and typefaces. All copy is original; no text is copied from any book or film, and the wax-seal icon is hand-drawn in SVG.

## Features

- Add a task by typing and pressing the wax-seal button (or Enter)
- Mark a task complete by clicking its circular check — toggles an `.is-managed` class with a strikethrough
- Remove a task with the × button (appears on hover)
- Filter by All / Active / Completed
- "Clear completed" button removes all completed tasks at once
- Live task counter
- Empty-state message when there are no tasks
- All updates happen instantly in the DOM, no page reload

## How it works

- **`index.html`** — page structure: header, input form, list container, filter/clear footer
- **`style.css`** — visual styling, reusing the design tokens from the Platform 9¾ landing page
- **`script.js`** — app logic:
  - Tasks live in an `entries` array in memory: `{ id, text, managed }`
  - `render()` rebuilds the visible list from current state + active filter
  - A single delegated `click` listener on the `<ul>` handles checking and removing tasks, so it correctly handles tasks added after the page first loads
  - `addEntry`, `toggleEntry`, `removeEntry`, and `clearManaged` update state, then call `render()`

## Concepts practiced

DOM manipulation, event listeners, event delegation, `preventDefault`, template literals, array methods (`filter`, `find`), and dynamic class toggling.

## Tools used

VS Code, Chrome DevTools, Live Server extension.

## Running it locally

1. Open the folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` → **Open with Live Server**.
