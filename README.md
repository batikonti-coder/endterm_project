# Batyrkhan Travels — Endterm Project

## Project Overview
This project is the endterm continuation of our midterm travel website **Batyrkhan Travels**.
We kept the same topic, the 5 pages, the Bootstrap navigation and the responsive layout,
and added interactive features with JavaScript and jQuery.

**Live website:** https://batikonti-coder.github.io/endterm_project/

## Team
* **Батырхан** — Group SE-2524 — all pages, JavaScript, jQuery, form validation

## Pages
| Page | What is interactive |
|------|---------------------|
| `index.html` | Theme switcher, "back to top" button |
| `destinations.html` | Photo viewer (click on a photo) |
| `tours.html` | Tour cards from an array, search, filter by type, favorites list |
| `about.html` | FAQ accordion (jQuery) |
| `contact.html` | Booking form with validation |

## Project Structure
```
index.html, destinations.html, tours.html, about.html, contact.html
styles.css
js/
  data.js             - arrays with project data (tours, tourTypes)
  theme.js            - dark / light theme switcher (saved in localStorage)
  tours.js            - render cards, search, filter, favorites (add / remove)
  form.js             - booking form validation
  jquery-features.js  - FAQ accordion, photo viewer, back to top button
```

## New Endterm Features
1. **Dynamic tour cards** — cards on the Tours page are created with JavaScript from the `tours` array.
2. **Search** — real-time search by tour name (`input` event).
3. **Filter by type** — Nature / Beach / City (`change` event). Options are created from the `tourTypes` array.
4. **Favorites list** — add a tour to favorites, remove it with the ✕ button, total price is calculated. Saved in localStorage.
5. **Theme switcher** — dark / light mode on every page, saved in localStorage.
6. **Form validation** — name, email, tour, number of travelers and message are checked; errors are shown under each field.
7. **FAQ accordion (jQuery)** — `slideToggle()` / `slideUp()`.
8. **Photo viewer (jQuery)** — `fadeIn()` / `fadeOut()`, closes with ✕, click on background or `Escape`.
9. **Back to top button (jQuery)** — appears after scrolling, `animate()` scrolls the page up.

## Where the requirements are in the code
| Requirement | Where |
|-------------|-------|
| Arrays | `tours`, `tourTypes` (data.js), `favoriteIds` (tours.js), `formRules` (form.js) |
| Loops | `for...of` in `getFilteredTours()`, `for` in `renderFavorites()`, `forEach` in `renderTours()` and `fillTypeFilter()` |
| Functions with return value | `formatPrice()`, `findTourById()`, `isFavorite()`, `getFilteredTours()`, `createTourCard()`, `checkName()`, `checkEmail()`... |
| Create / remove DOM elements | `createTourCard()`, `renderFavorites()` (createElement / appendChild), remove from favorites, jQuery `append()` for the back to top button |
| Change classes / text / attributes / visibility | `applyTheme()`, `showFieldResult()`, `renderTours()` (d-none), photo viewer `attr("src")` |
| Event types | `DOMContentLoaded`, `click`, `input`, `change`, `submit`, `keydown`, `scroll` |
| `event` object + `preventDefault()` | form `submit` in form.js, `event.target.closest()` in tours.js |
| jQuery selectors | ID `#gallery-modal`, class `.faq-title`, element+class `img.gallery-img`, attribute `[data-close='modal']` |
| jQuery traversal | `next()`, `parent()`, `siblings()`, `find()`, `closest()` |
| jQuery events | `click`, `keydown`, `scroll` |
| jQuery effects | `slideToggle()`, `slideUp()`, `fadeIn()`, `fadeOut()`, `animate()` |

## How to Test
1. **Theme:** click "🌙 Dark mode" in the menu, then open another page — the theme stays.
2. **Tours page:** type `lake` in the search box — only 2 tours are shown. Choose "Beach" in the filter — only Alakol Lake is left. Type `zzz` — a "No tours found" message appears.
3. **Favorites:** click "Add to Favorites" on 2 tours — they appear in the list on the right with the total price. Click ✕ to remove one. Reload the page — favorites are still there.
4. **Form (Contact page):** click "Send Request" with empty fields — a red message appears under every field. Enter wrong values (name `Ab`, email `abc@`, travelers `15`) — specific messages are shown. Fill everything correctly — a green success message appears and the form is cleared.
5. **FAQ (About page):** click a question — the answer slides down, other answers close.
6. **Photo viewer (Destinations page):** click a photo — it opens in full size. Close with ✕, click outside the photo or press `Escape`.
7. **Back to top:** scroll down on any long page — a round ↑ button appears; click it to scroll up.

## Technologies
HTML5, CSS3, Bootstrap 5.3, JavaScript (ES6), jQuery 3.7.1
