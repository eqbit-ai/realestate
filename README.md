# AURELIA — Dubai Luxury Real Estate Demo

A frontend-only React + Framer Motion + Tailwind CSS demo site, built for pitching real estate website projects to clients in Dubai.

## Stack
- React 18 + Vite
- Framer Motion (all animations, scroll effects, transitions)
- Tailwind CSS (custom "AURELIA" design tokens — ivory/sand/navy/brass palette, Fraunces + Manrope type)
- lucide-react (icons)

No backend, no API keys, no database — everything (contact form, chatbot) runs entirely client-side with mock/scripted logic, ready to swap in real integrations later.

## Getting started
```bash
npm install
npm run dev       # start local dev server
npm run build     # production build → /dist
npm run preview   # preview the production build
```

## Structure
```
src/
  App.jsx              orchestrates all sections + intro curtain animation
  data.js              all mock content: listings, services, gallery, testimonials
  index.css            Tailwind directives + global styles
  components/
    Navbar.jsx          scroll-aware frosted navbar
    Hero.jsx             fullscreen video hero, staggered headline reveal, parallax
    Services.jsx         6 service cards, staggered scroll reveal, hover fill
    Portfolio.jsx        numbered listing cards + detail modal
    Gallery.jsx           masonry image grid + lightbox
    Testimonials.jsx      autoplay quote carousel
    Contact.jsx            validated form, local-only "submission"
    Chatbot.jsx             floating concierge widget, scripted keyword replies
    Footer.jsx
```

## Before showing a client
1. **Hero video** — `src/components/Hero.jsx` currently uses a free Mixkit stock clip as a placeholder. Swap the `<source src>` for licensed drone/property footage (ideally < 8MB, muted-safe, looping cleanly).
2. **Images** — `src/data.js` uses Unsplash stock photography for listings and gallery. Replace with the client's real property photography before any client-facing demo.
3. **Copy** — all text (agency name "AURELIA", listings, testimonials, service descriptions) is placeholder copy written for this demo. Replace with the client's actual brand name, licensing info (RERA/DLD number, etc.), and real listings.
4. **Contact form & chatbot** — both are fully frontend, no data is sent anywhere. Wire the form to your CRM/email API, and connect the chatbot to a real AI/agent backend when moving to production.

## Notes on animation
- Hero: parallax video scale/scroll, word-by-word headline reveal, animated scroll cue.
- Section reveals: `whileInView` staggered fade/slide throughout (Services, Portfolio, Gallery, Testimonials, Contact).
- Portfolio & Gallery: hover scale/zoom on cards, modal/lightbox transitions.
- Page load: navy "curtain" intro animation before the hero is revealed.
- `prefers-reduced-motion` is respected globally via CSS.
