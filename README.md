# Eshaan Sharma — portfolio

Personal portfolio site: algorithmic trading and low-latency systems. A single-page static site deployed on Netlify from `main`.

## Run locally

No build step. Serve the repo root with any static server:

```sh
npx serve .
# or
python3 -m http.server 8000
```

React 18 and Babel standalone load from unpkg, and the `.jsx` screens compile in the browser.

## Where things live

- `data.js`: all site content (`window.ES_DATA`). Edit copy, projects, products and writing here.
- `Home.jsx`, `Work.jsx`, `Products.jsx`, `Writing.jsx`, `About.jsx`: the screens.
- `index.html`: entry point, router and app shell.
- `_ds_bundle.js`: the compiled design-system components. Vendored, don't edit.
- `styles.css` imports `tokens/*.css` and `css/*.css`. `kit.css` holds page layouts.
- `netlify.toml`: cache headers and the SPA fallback redirect.
- `legacy/`: the previous version of the site.
