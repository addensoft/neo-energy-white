# NEO ENERGY — standalone "Under Construction" page

A self-contained copy of the `/under-construction` route from the main site,
written as plain HTML + CSS so it can be dropped onto any host while the rest
of the site is being built. No build step, no framework, no dependencies.

## Deploying

Upload the **contents** of this folder to your web root, keeping the
structure intact:

```
index.html
styles.css
favicon.ico
images/
  logo.webp
  artwork.webp
```

`index.html` at the web root means the page serves at `https://yourdomain.com`.
That's it — nothing to install or compile.

Works on any static host: cPanel/shared hosting, Netlify, Vercel, Cloudflare
Pages, S3, GitHub Pages.

## What's in it

Same design as the live route: brand lockup, UNDER / CONSTRUCTION headline,
intro copy, the four-item capability strip, the battery/robot render with its
edges dissolved into the page, closing line + Get In Touch button, the dark
contact bar, and the floating WhatsApp button.

Fonts (Geist, Geist Mono, Inter) load from Google Fonts, so the page needs an
internet connection to render exactly as designed — it falls back to system
sans-serif otherwise.

The page is marked `noindex`, so it won't be picked up by search engines and
can't outrank the real site once that launches. **Remove that meta tag if you
actually want this indexed:**

```html
<meta name="robots" content="noindex, follow" />
```

## Editing details

| What | Where |
| --- | --- |
| WhatsApp number | `index.html` — `6580712233` in two `wa.me` links, **plus** the displayed `+65 8071 2233` (written with spaces, so search for both) |
| Email address | `index.html` — `contact@neoenergy.sg`, 3 places (Get In Touch link, contact-bar link, and its visible text) |
| Copy | `index.html` — plain text in the markup |
| Colours | `styles.css` — the `:root` block at the top (`--ink`, `--ion`) |
| Artwork / logo | replace the files in `images/`, keeping the same filenames |

## Note

This is a **snapshot**, not a live copy. Later changes to the Next.js route
won't flow through here — if the design changes, this folder needs
regenerating.
