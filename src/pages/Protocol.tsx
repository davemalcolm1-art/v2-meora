import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SiteNav from "@/components/rill/SiteNav";
import Footer from "@/components/rill/Footer";
import CtaBanner from "@/components/rill/CtaBanner";
import FAQ from "@/components/rill/FAQ";
import QuizModal from "@/components/rill/QuizModal";
import { QuizProvider, useQuiz } from "@/components/rill/quizContext";
import { protocols, Protocol as ProtocolType } from "@/config/protocols";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const INK = "#0f0f0f";
const CREAM = "#F7F4EF";
const ORANGE = "#FF5003";

const Protocol = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const protocol = protocols[slug];
  const [quizOpen, setQuizOpen] = useState(false);

  if (!protocol) return <Navigate to="/" replace />;

  return (
    <QuizProvider onOpen={() => setQuizOpen(true)}>
      <SiteNav variant="dark" />
      <main style={{ background: CREAM, color: INK, paddingTop: 96 }}>
        <Hero p={protocol} />
        <Intro p={protocol} />
        <Why p={protocol} />
        <HowItWorks p={protocol} />
        <WhatWeTest p={protocol} />
        <Symptoms p={protocol} />
        <Recognise p={protocol} />
        <Benefits p={protocol} />
        <WhyMeora p={protocol} />
        <CtaBanner />
        <FAQ />
        <Footer showMask />
      </main>
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </QuizProvider>
  );
};

/* ---------------- Sections ---------------- */

const Section = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  const ref = useScrollAnimation<HTMLElement>();
  return (
    <section ref={ref} className="scroll-animate" style={style}>
      {children}
    </section>
  );
};

const Eyebrow = ({ children, color = "rgba(26,43,53,0.5)" }: { children: React.ReactNode; color?: string }) => (
  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color, margin: "0 0 18px" }}>
    {children}
  </p>
);

/* ---- Hero ---- */
const Hero = ({ p }: { p: ProtocolType }) => {
  const { open } = useQuiz();
  return (
    <Section
      style={{
        background: "radial-gradient(ellipse at 15% 0%, #FFF8EC 0%, #FBF8F2 35%, #F7F4EF 65%, #EFEAE2 100%)",
        padding: "80px 0",
        margin: "24px",
        borderRadius: 32,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center" }} className="protocol-hero-grid">
        <div>
          <Eyebrow color={ORANGE}>{p.hero.eyebrow}</Eyebrow>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(44px,5.2vw,76px)", lineHeight: 1.02, letterSpacing: "-0.025em", margin: "0 0 24px", color: INK }}>
            {p.hero.title.replace(/\.$/, "")}<span style={{ color: ORANGE, fontStyle: "italic" }}>.</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 19, lineHeight: 1.55, color: "rgba(26,43,53,0.7)", margin: "0 0 36px", maxWidth: 520 }}>
            {p.hero.sub}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={open} style={pillBtn(ORANGE, "#fff")}>Take the quiz →</button>
            <a href="#how-it-works" style={{ ...pillBtn("transparent", INK), border: `1px solid ${INK}` }}>How it works</a>
          </div>
        </div>
        <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 28, overflow: "hidden", boxShadow: "0 30px 80px -30px rgba(26,43,53,0.35)" }}>
          <img src={p.hero.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .protocol-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
};

/* ---- Intro band ---- */
const Intro = ({ p }: { p: ProtocolType }) => (
  <Section style={{ padding: "120px 24px", textAlign: "center" }}>
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(32px,3.8vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 20px", color: INK }}>
        {p.intro.title}
      </h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: "rgba(26,43,53,0.65)", margin: "0 0 32px" }}>
        {p.intro.sub}
      </p>
    </div>
  </Section>
);

/* ---- Why it matters ---- */
const Why = ({ p }: { p: ProtocolType }) => (
  <Section
    style={{
      background: "linear-gradient(135deg, #F4ECF5 0%, #F7F4EF 60%, #F1E6E0 100%)",
      padding: "100px 0",
      margin: "24px",
      borderRadius: 32,
    }}
  >
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="why-grid">
      <div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(32px,3.6vw,48px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, color: INK }}>
          {p.why.headline}
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.6, color: "rgba(26,43,53,0.65)", marginTop: 20 }}>
          {p.why.claim}
        </p>
      </div>
      <div style={{ background: "#fff", borderRadius: 28, padding: 36, boxShadow: "0 20px 60px -30px rgba(26,43,53,0.2)" }}>
        <Eyebrow color={ORANGE}>{p.why.supportingTitle}</Eyebrow>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.6, color: "rgba(26,43,53,0.75)", margin: "0 0 28px" }}>
          {p.why.supportingBody}
        </p>
        <div style={{ borderTop: "1px solid rgba(26,43,53,0.1)", paddingTop: 24 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 56, fontWeight: 400, color: ORANGE, lineHeight: 1, letterSpacing: "-0.03em" }}>
            {p.why.stat.value}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(26,43,53,0.6)", marginTop: 8 }}>
            {p.why.stat.label}
          </div>
        </div>
      </div>
    </div>
    <style>{`@media (max-width: 900px) { .why-grid { grid-template-columns: 1fr !important; } }`}</style>
  </Section>
);

/* ---- How it works ---- */
const HowItWorks = ({ p }: { p: ProtocolType }) => (
  <Section style={{ padding: "120px 0" }}>
    <div id="how-it-works" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <Eyebrow>How it works</Eyebrow>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(32px,3.6vw,48px)", margin: 0, letterSpacing: "-0.02em" }}>
          A clear path, end to end.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="hiw-grid">
        {p.howItWorks.map((s) => (
          <article key={s.n} style={{ borderTop: `1px solid ${INK}`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", color: ORANGE }}>{s.n}</div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>{s.title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, lineHeight: 1.55, color: "rgba(26,43,53,0.65)", margin: 0 }}>{s.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
              {s.chips.map((c) => (
                <span key={c} style={{ alignSelf: "flex-start", background: "rgba(26,43,53,0.06)", color: INK, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 999 }}>{c}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) { .hiw-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .hiw-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  </Section>
);

/* ---- What we test ---- */
const WhatWeTest = ({ p }: { p: ProtocolType }) => (
  <Section style={{ padding: "100px 0" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end", marginBottom: 48 }} className="wwt-head">
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(32px,3.6vw,48px)", margin: 0, letterSpacing: "-0.02em" }}>
          What we test<br/>to understand your {p.name.toLowerCase()}.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.6, color: "rgba(26,43,53,0.65)", margin: 0 }}>
          Targeted diagnostics, interpreted by a doctor. The biomarkers we measure tell us how your body is actually performing — not what an average tells us.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="wwt-grid">
        {p.biomarkers.map((b) => (
          <article key={b.name} style={{ position: "relative", aspectRatio: "3/4", borderRadius: 24, overflow: "hidden" }}>
            <img src={b.image} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88) saturate(0.95)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, padding: 22, display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#fff" }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 400, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{b.name}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.5, margin: 0, color: "rgba(255,255,255,0.85)" }}>{b.desc}</p>
            </div>
          </article>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) { .wwt-head { grid-template-columns: 1fr !important; } .wwt-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .wwt-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  </Section>
);

/* ---- Symptoms collage ---- */
const Symptoms = ({ p }: { p: ProtocolType }) => (
  <Section
    style={{
      background: "linear-gradient(135deg, #E8EBE5 0%, #F0EDE6 60%, #F5EFE8 100%)",
      padding: "0",
      margin: "24px",
      borderRadius: 32,
      overflow: "hidden",
    }}
  >
    <div style={{ position: "relative", minHeight: 560, width: "100%" }}>
      <img src={p.symptomsHero} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(245,239,232,0.85) 0%, rgba(245,239,232,0.2) 50%, transparent 100%)" }} />
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "80px 48px", minHeight: 560 }}>
        <Eyebrow color={ORANGE}>Signs you may notice</Eyebrow>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(32px,3.6vw,52px)", margin: "0 0 24px", letterSpacing: "-0.02em", color: INK, maxWidth: 480 }}>
          The small signals your body is telling you.
        </h2>
        {p.symptoms.map((s) => (
          <span key={s.label} style={{
            position: "absolute",
            left: s.x, top: s.y,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(26,43,53,0.08)",
            borderRadius: 999,
            padding: "10px 18px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: INK,
            boxShadow: "0 10px 30px -10px rgba(26,43,53,0.25)",
            whiteSpace: "nowrap",
          }}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  </Section>
);

/* ---- Recognise ---- */
const Recognise = ({ p }: { p: ProtocolType }) => {
  const { open } = useQuiz();
  return (
    <Section
      style={{
        background: "linear-gradient(135deg, #F5E6E8 0%, #F0E0E5 100%)",
        padding: "80px 48px",
        margin: "24px",
        borderRadius: 32,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, alignItems: "center" }} className="recog-grid">
        <div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(28px,3vw,40px)", margin: "0 0 16px", letterSpacing: "-0.02em", color: INK }}>
            Do you recognise any of these signals?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.6, color: "rgba(26,43,53,0.7)", margin: "0 0 24px", maxWidth: 520 }}>
            A 2-minute quiz helps your doctor understand where you are today — and whether a {p.name.toLowerCase()} protocol is right for you.
          </p>
          <button onClick={open} style={pillBtn(INK, "#fff")}>Check eligibility →</button>
        </div>
        <div />
      </div>
      <style>{`@media (max-width: 800px) { .recog-grid { grid-template-columns: 1fr !important; } }`}</style>
    </Section>
  );
};

/* ---- Benefits (dark band) ---- */
const Benefits = ({ p }: { p: ProtocolType }) => (
  <Section
    style={{
      background: "radial-gradient(ellipse at 30% 50%, #2D5470 0%, #1A3347 30%, #0f0f0f 65%, #0F1820 100%)",
      padding: "100px 48px",
      margin: "24px",
      borderRadius: 32,
      color: "#fff",
    }}
  >
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(32px,3.6vw,48px)", margin: 0, letterSpacing: "-0.02em", color: "#fff" }}>
          What to expect from {p.name.toLowerCase()} support.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="benefits-grid">
        {p.benefits.map((b) => (
          <div key={b.title} style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: 24 }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 400, margin: "0 0 14px", color: "#fff", letterSpacing: "-0.01em" }}>{b.title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", margin: 0 }}>{b.body}</p>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) { .benefits-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .benefits-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  </Section>
);

/* ---- Why Meora ---- */
const WhyMeora = ({ p }: { p: ProtocolType }) => (
  <Section style={{ padding: "120px 0" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <Eyebrow>Why Meora</Eyebrow>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(32px,3.6vw,48px)", margin: 0, letterSpacing: "-0.02em" }}>
          Why {p.name.toLowerCase()} care<br/>with Meora.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="why-meora-grid">
        {p.whyMeora.map((c) => (
          <article key={c.title} style={{ background: "#fff", borderRadius: 24, padding: 32, boxShadow: "0 20px 50px -30px rgba(26,43,53,0.2)" }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 400, margin: "0 0 12px", letterSpacing: "-0.01em", color: INK }}>{c.title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.6, color: "rgba(26,43,53,0.65)", margin: 0 }}>{c.body}</p>
          </article>
        ))}
      </div>
      <style>{`@media (max-width: 700px) { .why-meora-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  </Section>
);

/* ---- helpers ---- */
const pillBtn = (bg: string, color: string): React.CSSProperties => ({
  background: bg,
  color,
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  border: "none",
  borderRadius: 999,
  padding: "16px 28px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
});

export default Protocol;
