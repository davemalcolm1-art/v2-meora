## Plan — Freshen "Your Goals · Your Protocol" (Domains section)

The section currently runs `filter: brightness(0.72)` on every image plus near-black scrims (`rgba(0,0,0,0.94)` top). That's why it feels dark and dead. Fix it by replacing the imagery with bright editorial macros + a single human hero, and stripping the heavy darkening.

### Imagery direction (confirmed)
- **5 small tiles** → bright botanical / texture macros in the style of the reference (soft cream backdrops, water droplets, sunlit leaves, silk, marble, skin macro). Brand-owned, premium, fresh.
- **Hero tile (large left)** → a bright, sunlit human moment that rotates with the carousel. One person per domain, daylight, candid — not stock-photo gloss.

Per-domain art direction:
| Domain | Small-tile texture | Hero person moment |
|---|---|---|
| Energy | Citrus macro with droplets, sunlit | Person stretching at sunrise window, golden light |
| Performance | Chalk on hands / linen weave, bright | Runner mid-stride, daylight, clean sky |
| Balance | Marble + soft botanical, cream tones | Person in warm meditation, soft window light |
| Recovery | Warm water surface / steam in light | Person resting post-workout, warm tones |
| Longevity | **Reference image** — leaf macro + droplets on cream | Older couple laughing outdoors, sunlit |
| Beauty | Silk / soft skin macro / dewy petals | Close portrait, natural skin, bright daylight |

### Code changes
1. **Generate 12 new images** with `imagegen` (standard quality, 1536×1024 / 3:2):
   - `src/assets/domains/{name}-texture.jpg` × 6
   - `src/assets/domains/{name}-hero.jpg` × 6
   - Upload via `lovable-assets`, write `.asset.json` pointers, remove the originals.
2. **`src/components/rill/Domains.tsx`**:
   - Import both `texture` and `hero` URLs per domain; `DomainSlot` chooses based on `isHero`.
   - Default `textTone` → `dark` (ink on light) for texture tiles; hero stays `light`.
   - CSS:
     - `.tile-img` filter → `brightness(1.02) contrast(1.02) saturate(1.05)` (was 0.72/1.08/0.98).
     - Replace `.tile-scrim` with a soft bottom-only gradient: `linear-gradient(180deg, transparent 0% 60%, rgba(247,244,239,0.7) 100%)` so dark ink on bright tiles stays legible without darkening the photo.
     - Keep `.tile-scrim-hero` but lighten: `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.55) 100%)` — just enough to anchor white copy top + bottom.
     - Text shadow tightened to subtle 1px lift (no heavy halos).
   - Section background nudged brighter: `radial-gradient(ellipse at 50% 0%, #FBF8F2 0%, #F7F4EF 55%, #EFEAE2 100%)`.
   - Hover shadow → soft warm cream tint instead of dark.
3. **Delete the 6 old `domains/*.jpg.asset.json`** once new pointers are in.

### Files touched
- `src/components/rill/Domains.tsx`
- `src/assets/domains/*.jpg.asset.json` (replace 6, add 6 hero pointers)

### Out of scope
- No grid/layout change — same bento, same rotation.
- No copy changes.
- Protocols carousel and rest of site untouched (separate question if you want to lighten more sections).

### Result
Section reads bright, fresh, alive: 5 premium texture tiles in the reference's visual language + one warm human hero that rotates. Borrows Limitless's daylight energy without becoming a stock-photo grid.