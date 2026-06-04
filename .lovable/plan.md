# Domain Page Template — starting with Recovery

Build one reusable, data-driven template now, fill it with Recovery copy, and wire one route. Other domains drop in later by adding a config entry.

## Route

- `/protocols/recovery` → `pages/Protocol.tsx` (dynamic via `:slug`)
- Added above the catch-all in `src/App.tsx`
- Link the Recovery tile in `Domains.tsx` to this route

## File structure

```text
src/
  pages/
    Protocol.tsx                  // route handler, looks up slug → config
  components/rill/protocol/
    ProtocolHero.tsx              // hero card (image right, copy left, CTAs)
    ProtocolIntro.tsx             // centered intro band ("Strength & recovery built for your life")
    ProtocolWhy.tsx               // 2-col stat / "why it matters" block
    ProtocolHowItWorks.tsx        // 4-step timeline (reuses HowItWorks visual language)
    ProtocolWhatWeTest.tsx        // 4 biomarker tiles w/ portrait imagery
    ProtocolSymptoms.tsx          // "Signs you may notice" floating-pill collage
    ProtocolRecognise.tsx         // soft pink "Do you recognise…" + quiz CTA
    ProtocolBenefits.tsx          // dark band — "What to expect" 4 columns
    ProtocolWhyMeora.tsx          // 4 reason cards grid
  config/
    protocols.ts                  // typed config per domain (copy, images, biomarkers, symptoms, benefits)
```

Reuse existing site chrome (`Nav` if present, `CtaBanner`, `FAQ`, `Footer`) wrapped around the protocol sections in `Protocol.tsx`.

## Section order (mirrors reference, Meora styling)

1. Hero — short headline, supporting line, two CTAs (Take quiz / Learn more), hero image right
2. Intro band — one-line promise + sub + button
3. Why it matters — editorial 2-col: bold claim + supporting research-style callout card
4. How it works — 4 steps (Comprehensive intake → Test → View results → Action plan), portrait + chips
5. What we test — 4 biomarker tiles with face/portrait imagery + label overlay
6. Signs you may notice — hero portrait with floating pill-labels (symptoms)
7. Recognise these signs — soft band + "Check eligibility" CTA
8. What to expect — dark ink panel, 4-column benefits
9. Why Meora — 4 cards (comprehensive labs, clinically guided, AU-wide, ongoing care)
10. Reuse `CtaBanner` + `FAQ` + `Footer`

## Data model (`config/protocols.ts`)

```ts
type Protocol = {
  slug: "recovery" | "performance" | "balance" | "beauty" | "energy" | "longevity";
  name: string;          // "Recovery"
  tagline: string;       // "Repair & Resilience"
  hero: { eyebrow; title; sub; image; ctas: {label,href}[] };
  intro: { title; sub; cta };
  why:  { headline; claim; supportingCard: { title; body; stat? } };
  howItWorks: { step; title; desc; chips: string[]; image }[];
  biomarkers: { name; desc; image }[];          // 4
  symptoms: { label; position: {x,y} }[];       // pills over heroPortrait
  symptomsHero: string;
  benefits: { title; body }[];                  // 4
  whyMeora: { title; body; image? }[];          // 4
};
```

## Recovery copy (drafted, on-brand placeholder)

- Hero: "Built for the comeback." / "Repair faster. Train smarter. Stay in the game longer." CTAs: Take the quiz · How it works
- Why: "Stronger recovery supports a longer, more resilient life."
- Biomarkers: Inflammation (hs-CRP), Recovery hormones (Cortisol, DHEA), Muscle repair (Creatine kinase), Sleep & stress (HRV proxy panel)
- Symptoms: Slow recovery · Persistent soreness · Disrupted sleep · Low energy · Frequent niggles · Mood dips
- Benefits: Support faster recovery · Reduce inflammation · Improve sleep quality · Sustain energy
- WhyMeora: Reuses the 4 cards already on the homepage pattern

## Imagery

For Recovery, reuse existing `recovery-hero.jpg` for hero. Generate (in build phase) ~4 new portrait/biomarker images via `imagegen` + `lovable-assets` under `src/assets/protocols/recovery/`. Keep brightness/grading consistent with `Domains.tsx` rules.

## Styling rules

- Use existing tokens (`#1A2B35` INK, `#F7F4EF` CREAM, `#FF5003` orange, Fraunces + DM Sans)
- Match the cream radial background + 32px rounded section cards used in `Domains.tsx`
- No text drop-shadows (per prior preference)
- `useScrollAnimation` for section reveals

## Out of scope for this pass

- Other 5 domains (template will be ready; we'll add their config + route entries next)
- Copy revisions — initial copy is placeholder
- Quiz logic changes — CTAs open existing `QuizModal`

## Technical notes

- `Protocol.tsx` uses `useParams<{slug}>()` → lookup in `protocols` map → 404 if missing
- All sections accept their slice of the Protocol object as props (no global state)
- Lazy-load route to keep `Index` bundle lean
