## Scope

Single file: `src/components/rill/ProtocolDomains.tsx`. No other components, no colour/layout/content changes beyond what's listed.

## 1. Background image reframing

Performance and Recovery are even sections — glass card sits on the **right**, so move the subject to the **left** of the frame.

- Performance: `background-position: 20% center` (was `center center`)
- Recovery: `background-position: 25% center` (was `center center`)
- Energy: unchanged (`center 40%`) — card on left, subject already right
- Balance, Longevity: unchanged (`center center`)
- Beauty: unchanged (`center 25%`) — card on right, subject already left-of-centre and face visible

If after build the framing still clips a subject, nudge the percentage by ±10% and re-check.

## 2. Parallax on background images

Each `.pd-bg` div translates vertically at 0.7x scroll speed while its parent section is in viewport.

- Implementation: single `useEffect` on the component that attaches one `scroll` listener (passive) and updates each `.pd-bg`'s `transform: translate3d(0, Ypx, 0) scale(1.08)` via `requestAnimationFrame`.
- Range: when section top hits viewport bottom → `+60px`; when section bottom hits viewport top → `-60px`. Linear interpolation between.
- The existing `.pd-bg` already covers the section; bump `height: 120%` and `top: -10%` so the parallax translate never reveals an edge.
- Add `will-change: transform` to `.pd-bg`.

## 3. Ken Burns drift

Inside each `.pd-bg`, apply a very slow scale animation:

```css
@keyframes pd-kenburns {
  from { transform: scale(1.05); }
  to   { transform: scale(1.12); }
}
.pd-bg { animation: pd-kenburns 20s ease-in-out infinite alternate; }
```

Since parallax also writes `transform`, nest it: outer wrapper `.pd-bg-parallax` handles `translate3d` (JS), inner `.pd-bg` handles the Ken Burns scale (CSS). Background-image moves to the inner element.

## 4. Scroll-triggered reveal

Domain name, tagline, featured card, and protocol pills fade + slide in once when section enters viewport.

- `IntersectionObserver` (threshold 0.25) toggles an `is-visible` class on each `.pd-inner`.
- CSS: children start at `opacity: 0; transform: translateY(24px)`; on `.pd-inner.is-visible` they transition to `opacity: 1; transform: none` over 600ms with staggered delays:
  - domain name: 0ms
  - tagline: 100ms
  - featured card: 200ms
  - pill 1: 300ms
  - pill 2: 400ms
- Transition uses `cubic-bezier(0.22, 1, 0.36, 1)`. Runs once — observer unobserves after first trigger.
- Respect `prefers-reduced-motion: reduce` — skip both parallax and reveal (elements render in final state, Ken Burns disabled).

## 5. What is NOT changing

- Section heights, layout flip (odd/even), colours, glass card styling, pill styling, hover states, divider lines, CTA bar below the six sections.
- Every other component on the page.

## Technical notes

- One scroll handler total (not one per section) for performance.
- One IntersectionObserver instance, observe all six `.pd-inner` nodes.
- All refs gathered via a single `useRef<HTMLElement[]>([])` populated in the `.map`.
- No new dependencies.

## Verification

1. Build clean.
2. Open preview, scroll through the six sections — confirm: images drift slowly, sections reveal on entry once, Performance and Recovery subjects no longer sit behind the glass card.
3. Toggle OS reduced-motion and reload — animations disabled, layout intact.
