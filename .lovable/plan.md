## Problem

Two issues at the bottom of the homepage where `CtaBanner` (dark navy `#1A2B35` email capture) meets the `MaskSection`/`Footer`:

1. **Hard seam**: The CTA banner sits as a flat full-width dark block; immediately below, the MEORA mask section starts with rounded top corners against the cream page background. The straight-edged dark block above the rounded dark block reads as two disconnected slabs.
2. **Low contrast text**: The supporting paragraph ("Join for clinically guided perspectives…") and the fine print ("By subscribing you agree…") both use `var(--text-dim)`, which on `#1A2B35` is a muted blue-grey on dark blue — barely legible.

## Plan (edit only `src/components/rill/CtaBanner.tsx`)

1. **Unify the dark slabs visually**
   - Add `border-radius: 24px 24px 0 0` to the CTA banner so its bottom flows seamlessly into the rounded MEORA mask section below, and its top has a soft rounded shoulder against the cream above.
   - Sit the section on a cream background wrapper (small horizontal margin like the Protocols section uses) so the banner reads as a contained dark card, not a full-bleed stripe — matching the existing rounded-card language used elsewhere on the page.
   - Alternative if the user prefers full-bleed: keep edge-to-edge but round only the top corners and remove the gap so it visually fuses with the mask section below.

2. **Fix text contrast on the dark navy**
   - Subtitle paragraph: change color from `var(--text-dim)` to `rgba(250, 247, 242, 0.78)` (warm cream at high opacity) so it reads cleanly on `#1A2B35`.
   - Fine print line: bump to `rgba(250, 247, 242, 0.55)` — still secondary, but legible.
   - Leave the headline (already cream) and orange accent untouched.

3. **No other files touched.** Footer, MaskSection, Protocols, and Index layout remain as-is.

## Open question for you

Do you want the CTA banner to become a **contained rounded card** (cream margin around it, matching Protocols' style), or stay **full-bleed** and just fuse with the rounded mask section below it? I'll default to contained rounded card unless you say otherwise.
