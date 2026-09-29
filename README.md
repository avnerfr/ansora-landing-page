# Ansora landing page

The public marketing site for Ansora — the AI marketing partner that interviews a small
business over WhatsApp and then writes, designs, schedules and publishes its social posts.

Vite + React + TypeScript + Tailwind, with shadcn/ui primitives in `src/components/ui/`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

---

## Hebrew first

The product's market is Israel, so Hebrew is the default and the page is built RTL-first.

**Each language is its own URL:** `/` is Hebrew, `/en/` is English. `npm run build` prerenders
both to static HTML (`dist/index.html`, `dist/en/index.html`) with their own `<title>`,
description, canonical, `hreflang` alternates, Open Graph tags and JSON-LD, so search engines
and link previews see real content without running JavaScript. React then hydrates that
markup. The pipeline: client build → SSR build of `src/entry-server.tsx` → `scripts/prerender.mjs`.
The host must serve `dist/en/index.html` for `/en/` (any static host does by default).

Visitors are sent to their language by an inline script in `index.html`'s `<head>`, before
anything paints, in priority order:

1. a choice made in the language switcher (saved in `localStorage`)
2. `?lang=he` / `?lang=en` in the URL — for linking marketing campaigns at a specific version
3. first visit to `/` only: English, unless the browser locale is Hebrew **or** the timezone
   is `Asia/Jerusalem`

Crawlers and link-preview bots are never redirected, so both versions stay indexable.
`public/robots.txt`, `public/sitemap.xml` and `SITE_URL` in `src/lib/i18n.ts` point at
`https://ansora.io` — update all three if the domain changes.

## Deploying

Vercel deploys from a separate repo, `avnerfr/ansora-landing-page`, not from this monorepo.
`scripts/sync-to-landing-repo.sh` mirrors this folder into a clone of it and stages the
result; review, commit and push there.

Copy lives in one flat dictionary in `src/lib/i18n.ts`, keyed `section.thing` with an
`{ en, he }` pair each — the same shape as `frontend/lib/i18n.ts`, so strings can move
between the app and this page without reformatting. `t()` is typed against the dictionary,
so a typo in a key is a compile error rather than a key rendered on screen.

**Writing RTL-safe markup:** use Tailwind's logical utilities — `ms-`/`me-`, `start-`/`end-`,
`text-start`/`text-end` — never `ml-`/`left-`/`text-left`. Anything genuinely physical (the
macOS traffic lights in the hero mockup) is pinned with an explicit `dir="ltr"`.

## Fonts

Inter is the brand sans, matching `frontend/app/layout.tsx`. Inter ships no Hebrew glyphs, so
**Heebo** is loaded alongside it and the `--font-sans` stack puts Heebo first under
`[dir="rtl"]` (`src/index.css`). Latin text gets Inter, Hebrew gets Heebo, and the two are
close enough in skeleton to read as one typeface. Without this, Hebrew silently falls back to
Arial/Tahoma and looks nothing like the app.

## Colors

`src/index.css` mirrors `frontend/app/globals.css`: brand hue 214, `--brand: 25 108 230`, plus
the glass-morphism surfaces and the gradient + 64px mesh background from
`frontend/DESIGN_SYSTEM.md`. The shadcn tokens (`--primary`, `--border`, …) are the same
colors expressed as HSL, because every primitive in `src/components/ui/` is written as
`hsl(var(--token))`.

## Motion

Everything animated is CSS plus one `IntersectionObserver` (`src/lib/motion.ts`) — no
animation library. The whole vocabulary costs ~4KB of CSS where framer-motion would add
~110KB of JS to a page whose job is to load fast on a phone on 4G.

| Hook | Used for |
| --- | --- |
| `useReveal` | one element animating in on scroll |
| `useStaggeredReveal` | a group; delays assigned from DOM order, so a list that changes length can't gap |
| `usePointerParallax` | the hero's depth planes (throttled to one read per frame) |
| `useScrollProgress` | the bar under the navbar |
| `useScrolledPast` | navbar glass, sticky CTA entrance |

`<Reveal>` / `<RevealGroup>` in `src/components/Reveal.tsx` wrap the first two.

`prefers-reduced-motion` is honoured throughout: loops stop, and reveals are forced *fully
visible* rather than merely instant — an element left at `opacity: 0` because its observer
never fired would be permanently invisible, not just un-animated.

**Careful with transforms.** Tailwind's `scale-*` / `translate-*` classes and an inline
`style={{ transform }}` write the same property, and the inline style wins. `HeroShowcase`
therefore nests three elements — parallax translate, scale, float animation — one transform
each. Collapsing any two silently drops one.

## Screen captures

`public/desktop.png` and `public/mobile.png` are copies of `frontend/public/`. To refresh the
shots, replace those two files; no component changes are needed, but keep the aspect ratios
(the `width`/`height` attributes are set to reserve space and avoid layout shift — update
them if the new images differ).

The hero shows the desktop frame with the WhatsApp recording (`public/whatsapp.gif`, 945×2048)
overlapping its outer corner. Below `sm` it shows **only** the chat: both at once leaves the
screenshot too small to read, and the chat is the half that carries the pitch. The full
interface still gets a readable panel of its own in the `Anywhere` section.

## Registration and plans

Every CTA points at `https://www.app.ansora.io/register/sb?plan=<id>` (`registerUrl()` in
`src/lib/i18n.ts`). The three plans are defined once in `src/lib/plans.ts` and rendered by
both the pricing section and the sticky CTA's sheet.

Two things to know before this goes live:

- **`?plan=` is not read by the app yet.** `frontend/app/register/sb/page.tsx` ignores the
  parameter, so a visitor's choice is currently an attribution signal only — it does not
  pre-select anything on the registration form.
- **The prices are placeholders** pending a real small-business price list.
  `frontend/app/register/pricing/page.tsx` carries a different set (Free / Pro / Legend at
  $0 / $29 / $79) belonging to the market-intelligence product — a separate funnel from this
  one. Don't assume the two should match.

---

Originally scaffolded from [shadcn-landing-page](https://github.com/leoMirandaa/shadcn-landing-page)
by Leopoldo Miranda (MIT — see `LICENSE`).
