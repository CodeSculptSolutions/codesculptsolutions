# CodeSculptSolutions

Personal studio website for Jake Lourence A. Villar — CodeSculptSolutions.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Lenis

---

## Getting started

```bash
cp .env.local.example .env.local
# Add your RESEND_API_KEY to .env.local

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Fonts

The site uses **General Sans** via Fontshare CDN in development. For production:

1. Download `.woff2` files from [fontshare.com/fonts/general-sans](https://www.fontshare.com/fonts/general-sans)
2. Place in `/public/fonts/` as `general-sans-400.woff2`, `general-sans-500.woff2`, `general-sans-600.woff2`, `general-sans-700.woff2`
3. Replace the `@import url(...)` in `globals.css` with `next/font/local` in `layout.tsx`

Google Fonts (Manrope, Fraunces, JetBrains Mono, Caveat) load via `next/font/google` — no action needed.

---

## Contact form

Uses [Resend](https://resend.com) for email delivery. Add `RESEND_API_KEY` to `.env.local`.
Emails send to `hello@codesculptsolutions.com`. Domain must be verified in Resend.

---

## Structure

```
app/
  layout.tsx          — fonts, metadata, Lenis, structured data
  page.tsx            — all sections assembled
  globals.css         — design tokens, base styles (Tailwind v4 @theme)
  api/contact/        — Resend email handler

components/
  nav/                — sticky nav with squiggle-underline active state
  hero/               — left headline + right breathing blob
  about/              — manifesto spread, staggered stats, tech stack
  collaborators/      — typographic collaborator strip
  services/           — vertical service entries with blob vessels
  work/               — bento project grid with blob masks
  process/            — horizontal GSAP scroll, dark section
  notes/              — masonry studio notes
  contact/            — split contact + form with Resend
  footer/             — minimal footer
  shapes/             — Blob SVG, SculptCursor (easter egg)
  ui/                 — TextLink, SmoothScroll (Lenis)

lib/
  blobs.ts            — SVG path constants
  motion.ts           — shared easings and Framer Motion variants
```

---

## Easter egg

Hover the hero blob — the cursor changes to a sculpting tool. Click and hold to deform the blob toward the cursor, then watch it spring back.
