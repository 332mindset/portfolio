# hanagumori — portfolio

A fast, static portfolio and contact site (Vite, plain HTML/CSS/JS; no runtime dependencies).

## Run

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Before going live

- Set `SITE_URL` in `vite.config.js` to the final domain. It feeds canonical and Open Graph tags, `robots.txt` and `sitemap.xml`.
- Prices, the "usually reply within a day" line and the process steps live in `index.html`; edit them freely.
- `public/og.jpg` is the social preview; regenerate it from `tools/og.html` (1200×630) if the headline changes.

## Credits

Fonts: Manrope and Unbounded (SIL OFL, see `public/fonts`). The 3D workshop shown in the Work section is a separate project with its own credits page.
