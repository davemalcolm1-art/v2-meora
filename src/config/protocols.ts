import recoveryHero from "@/assets/domains/recovery-hero.jpg.asset.json";
import biomarker1 from "@/assets/protocols/recovery/biomarker-1.jpg.asset.json";
import biomarker2 from "@/assets/protocols/recovery/biomarker-2.jpg.asset.json";
import biomarker3 from "@/assets/protocols/recovery/biomarker-3.jpg.asset.json";
import biomarker4 from "@/assets/protocols/recovery/biomarker-4.jpg.asset.json";
import symptomsHero from "@/assets/protocols/recovery/symptoms-hero.jpg.asset.json";

export type Protocol = {
  slug: string;
  name: string;
  tagline: string;
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    image: string;
  };
  intro: {
    title: string;
    sub: string;
  };
  why: {
    headline: string;
    claim: string;
    supportingTitle: string;
    supportingBody: string;
    stat: { value: string; label: string };
  };
  howItWorks: { n: string; title: string; desc: string; chips: string[] }[];
  biomarkers: { name: string; desc: string; image: string }[];
  symptomsHero: string;
  symptoms: { label: string; x: string; y: string }[];
  benefits: { title: string; body: string }[];
  whyMeora: { title: string; body: string }[];
};

const recovery: Protocol = {
  slug: "recovery",
  name: "Recovery",
  tagline: "Repair & Resilience",
  hero: {
    eyebrow: "RECOVERY PROTOCOL",
    title: "Built for the comeback.",
    sub: "Repair faster. Train smarter. Stay in the game — at every age.",
    image: recoveryHero.url,
  },
  intro: {
    title: "Strength and recovery, built for your life.",
    sub: "A clinically guided protocol that supports how you repair, sleep, and rebound — so the next day feels like a step forward, not a setback.",
  },
  why: {
    headline: "Stronger recovery supports a longer, more resilient life.",
    claim: "Recovery isn't a luxury — it's how the body adapts. Poor recovery is linked to elevated inflammation, disrupted sleep, blunted hormones, and a higher risk of injury over time.",
    supportingTitle: "Why recovery matters",
    supportingBody: "We measure the inputs that drive how well your body repairs — inflammation, recovery hormones, sleep markers — and translate them into a protocol your doctor designs around your goals.",
    stat: { value: "62%", label: "of adults under-recover from week to week" },
  },
  howItWorks: [
    { n: "01", title: "Comprehensive intake", desc: "Share your training load, sleep, and recovery history. We build a clinical picture, not a guess.", chips: ["Lifestyle review", "Goals", "Symptoms"] },
    { n: "02", title: "Test what matters", desc: "A targeted blood panel measures inflammation, hormones, and recovery biomarkers.", chips: ["hs-CRP", "Cortisol · DHEA", "Creatine kinase"] },
    { n: "03", title: "Review with your doctor", desc: "An AHPRA-registered doctor reviews your results with you via telehealth.", chips: ["Telehealth", "30 minutes", "Doctor-led"] },
    { n: "04", title: "Action plan", desc: "Receive a personalised recovery protocol — delivered, monitored, and adjusted as you progress.", chips: ["Compounded protocol", "Cold-chain delivery", "Quarterly review"] },
  ],
  biomarkers: [
    { name: "Inflammation", desc: "hs-CRP and supporting markers show how hard your system is working between sessions.", image: biomarker1.url },
    { name: "Recovery hormones", desc: "Cortisol and DHEA reveal whether your stress response is helping or holding you back.", image: biomarker2.url },
    { name: "Muscle repair", desc: "Creatine kinase tracks the tissue cost of training — and how fast you're bouncing back.", image: biomarker3.url },
    { name: "Sleep & stress load", desc: "A combined view of the markers most tied to deep, restorative sleep.", image: biomarker4.url },
  ],
  symptomsHero: symptomsHero.url,
  symptoms: [
    { label: "Slow recovery", x: "8%", y: "18%" },
    { label: "Persistent soreness", x: "10%", y: "52%" },
    { label: "Disrupted sleep", x: "6%", y: "78%" },
    { label: "Low energy", x: "44%", y: "12%" },
    { label: "Frequent niggles", x: "38%", y: "82%" },
    { label: "Mood dips", x: "50%", y: "46%" },
  ],
  benefits: [
    { title: "Support faster recovery", body: "Targeted peptides and nutrients help your tissue repair pathways do what they do best — only faster." },
    { title: "Reduce inflammation", body: "Bring chronic, low-grade inflammation down so the body can spend energy on rebuilding, not firefighting." },
    { title: "Improve sleep quality", body: "Better sleep architecture means deeper recovery — physically, hormonally, and cognitively." },
    { title: "Sustain energy", body: "Steadier hormones and lower inflammation translate to consistent energy across the week, not just the weekend." },
  ],
  whyMeora: [
    { title: "Treatment informed by comprehensive labs", body: "Every protocol starts with the right diagnostics, not a one-size questionnaire." },
    { title: "Clinically guided, comprehensive testing", body: "Reviewed by AHPRA-registered Australian doctors. Compounded by registered pharmacy partners." },
    { title: "Convenient Australia-wide", body: "Telehealth consults and cold-chain delivery to your door — no clinic visits required." },
    { title: "Ongoing care focused on prevention", body: "Quarterly reviews keep your protocol adapting as your numbers, goals, and life change." },
  ],
};

export const protocols: Record<string, Protocol> = {
  recovery,
};
