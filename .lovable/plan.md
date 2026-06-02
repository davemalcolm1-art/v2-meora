## Goal

Make the MEORA wordmark mask section feel like part of the dark blue footer instead of a separate cream band. Reduce its height so the overall block isn't too tall.

## Changes

### 1. `src/components/rill/MaskSection.tsx`
- Change the SVG overlay `<rect fill="#FAF7F2" ...>` to use the footer's dark blue (`#1A2B35`). The letters keep revealing the seascape image; the surround becomes blue and visually continuous with the footer.

### 2. `src/index.css` (mask-section overrides around lines 3336–3343 and 1963–2012)
- Reduce mask height: drop `.mask-section` from `45vh` / `padding: 80px 0` to roughly `30vh` (min-height ~220px) with no vertical padding, so the band is more compact.
- Update `.mask-fade-bottom` gradient from cream (`#EDE8E0`) to the footer blue (`#1A2B35`) so it blends into the footer instead of fading to cream.
- Keep `.mask-fade-top` (already blue) to soften the join with the cream section above.

### 3. `src/components/rill/Footer.tsx`
- Remove the top `borderRadius: "32px 32px 0 0"` on the `<footer>` so the mask band and footer read as a single dark blue block.
- Slightly reduce top padding (e.g. `64px 80px 40px` → `48px 80px 40px`) since the mask now sits directly above.

## Result

The cream "MEORA mask" panel disappears. Instead, the mask sits on a shorter dark blue band that flows straight into the existing footer — one unified dark footer area, with the seascape revealed only inside the letters.