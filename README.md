# Classic Food Baalbek — Website

Bilingual (Arabic / English) restaurant website for **Classic Food Baalbek** — Ras Al Ain Street, facing Fransabank, Baalbek, Lebanon.

## Pages
| Page | File |
|---|---|
| Home | `index.html` |
| Menu (full 461-item menu, search, grid/list view) | `menu.html` |
| Our Story | `about.html` |
| Location | `location.html` |

## Highlights
- Yellow · black · beige theme built from the restaurant's logo
- Entry animation: the real logo is sliced into layers that drop and stack, then "CLASSIC FOOD" appears (once per visit, tap to skip, off for reduced‑motion users; add `?intro=1` to replay)
- Arabic (RTL) by default with an English switch; choice is remembered
- Mobile-first: bottom tab bar, sticky category tabs, bottom-sheet dish details, WhatsApp ordering
- Dishes with photos show as cards; dishes without photos are listed in a clean "more in this section" list

## Editing the menu
All menu data is in `data/menu.json`:
- `categories[]` → `sections[]` → `items[]`
- item fields: `ar` (name), `en` (English name, optional), `d` (description), `p` (price in USD), `img` (photo path or `null`), `new` (1 = show NEW badge)

Photos live in `images/items/` and `images/sections/` (WebP).

## Run locally
No build step — any static server works:
```
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Deploy
Works as-is on GitHub Pages, Netlify, Vercel or any static host. For GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
