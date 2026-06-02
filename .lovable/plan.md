## Goal

Replace the four stock photos in the "How it works" section with a consistent set of AI-generated **fine-line editorial ink illustrations** (Aesop / New Yorker register), and decide the card treatment by comparing two rendered design directions.

## Steps

1. **Capture current section** — screenshot the live "How it works" block at 1325px viewport for reference.

2. **Generate two rendered design directions** (no code changes yet) — both locked to the same palette (cream `#F7F4EF` / dark `#1A2B35`), Fraunces + DM Sans, and the same four steps. They differ only in card treatment:

   - **Direction A — Dark image cards, drawing as hero.** Keep the existing 4-up layout. Each card is dark `#1A2B35`, ink illustration sits centered/upper on a cream inset, step number top-left, title + copy bottom in cream. The drawing replaces the photo; no dark photo overlay.
   - **Direction B — Cream editorial cards.** Drop the dark cards entirely. Four tall cream panels separated by hairlines (or floating with generous gutters). Centered ink drawing, large serif numeral, title in Fraunces, body in DM Sans. Quieter, more apothecary. Removes the "Instagram tile" feel.

3. **Present directions** via `ask_questions` (type: prototype) — one question, two options. User picks one.

4. **Generate the four illustrations** with `openai/gpt-image-2` using a single locked style prompt to guarantee a consistent hand:
   - *Style anchor:* "fine single-weight black ink line drawing on warm cream `#F7F4EF` background, loose confident contour, no shading or hatching, no color, generous negative space, editorial apothecary feel, ~1.5px stroke, centered subject, square."
   - *Per step:* (1) a single glass blood collection vial with a drop, (2) a laptop with a doctor's face in a video call window, (3) a wrapped apothecary parcel tied with twine, (4) an abstract recurring cycle / waveform suggesting ongoing review.
   - Save as `src/assets/howitworks/step-{blood,gp,delivery,ongoing}.png` (PNG to preserve clean line edges). Replace the existing `.jpg` imports.

5. **Reorder steps** per the earlier request: Blood panel → Meet your GP → Protocols delivered → Ongoing review (already in this order in current code — confirm, no change needed).

6. **Implement the chosen direction** in `src/components/rill/HowItWorks.tsx`. Keep the numbered timeline and trust strip as-is. Adjust card styles, aspect ratio, and text color tokens to match the chosen treatment exactly.

7. **QA** — view preview, check that the four illustrations read as one set (same stroke weight, same negative space, no rogue color/shading), confirm copy + spacing.

## Technical notes

- Generation uses the agent-side `imagegen--generate_image` tool (model `premium.gemini` or `standard`) with a shared style prompt; all four generated in parallel.
- If any of the four breaks style (shading, color bleed, off-register), regenerate just that one with a tightened prompt rather than re-doing the set.
- No backend, routing, or data changes. Frontend-only edit to one component and four new asset files. Old `.jpg` photos get deleted after the swap.
- A full "How it works" dedicated page (Limitless-style) is **out of scope** for this pass — home section only, per the earlier decision.

## Out of scope

- Copy changes (titles/descriptions stay as written; can refine after visuals land).
- The standalone `/how-it-works` page.
- Any change to the numbered timeline, trust strip, or CTA.
