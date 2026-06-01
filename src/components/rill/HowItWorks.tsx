import { useState, useEffect, useRef } from 'react';

const steps = [
  { label: 'Step 01', title: 'Complete your assessment', desc: 'Tell us your goals and health history. Takes five minutes. Our clinical intake guides you through everything.' },
  { label: 'Step 02', title: 'Consult your GP', desc: 'An AHPRA-registered doctor reviews your intake and discusses the right protocol for you via telehealth.' },
  { label: 'Step 03', title: 'Blood panel & approval', desc: 'A targeted blood test confirms your baseline. Your doctor reviews results and releases your prescription.' },
  { label: 'Step 04', title: 'Compounds delivered', desc: 'Your protocol is prepared by a registered compounding pharmacy and dispatched cold-chain to your door.' },
];

const cardData = [
  { num: '01', label: 'Complete your\nassessment' },
  { num: '02', label: 'Consult\nyour GP' },
  { num: '03', label: 'Blood panel\n& approval' },
  { num: '04', label: 'Compounds\ndelivered' },
];

export default function HowItWorks() {
  const [cur, setCur] = useState(0);
  const [infoKey, setInfoKey] = useState(0);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const pillX = useRef(0);
  const pillW = useRef(0);
  const targetX = useRef(0);
  const targetW = useRef(0);
  const animRef = useRef<number | undefined>(undefined);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  function getCardRect(i) {
    const sr = stageRef.current.getBoundingClientRect();
    const cr = cardRefs.current[i].getBoundingClientRect();
    return { x: cr.left - sr.left, w: cr.width };
  }

  function drawFrost(px, pw) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(20,35,45,0.75)';
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, 14);
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.beginPath();
    ctx.roundRect(px + 4, 4, pw - 8, H - 8, 10);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  function updateCanvas() {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = stage.offsetWidth * dpr;
    canvas.height = stage.offsetHeight * dpr;
    drawFrost(pillX.current, pillW.current);
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    pillX.current = lerp(pillX.current, targetX.current, 0.1);
    pillW.current = lerp(pillW.current, targetW.current, 0.1);
    drawFrost(pillX.current, pillW.current);
    if (ringRef.current) {
      ringRef.current.style.left = (pillX.current + 4) + 'px';
      ringRef.current.style.width = (pillW.current - 8) + 'px';
    }
    if (Math.abs(pillX.current - targetX.current) > 0.5 || Math.abs(pillW.current - targetW.current) > 0.5) {
      animRef.current = requestAnimationFrame(animate);
    }
  }

  function go(i) {
    setCur(i);
    setInfoKey(k => k + 1);
    const r = getCardRect(i);
    targetX.current = r.x;
    targetW.current = r.w;
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    setTimeout(() => {
      const r = getCardRect(0);
      pillX.current = targetX.current = r.x;
      pillW.current = targetW.current = r.w;
      updateCanvas();
      if (ringRef.current) {
        ringRef.current.style.left = (r.x + 4) + 'px';
        ringRef.current.style.width = (r.w - 8) + 'px';
      }
      timerRef.current = setInterval(() => {
        setCur(c => {
          const next = (c + 1) % 4;
          setTimeout(() => go(next), 0);
          return c;
        });
      }, 4000);
    }, 150);
    window.addEventListener('resize', updateCanvas);
    return () => {
      window.removeEventListener('resize', updateCanvas);
      clearInterval(timerRef.current);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section style={{ background: '#1A2B35', padding: '80px 0', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .hiw-fade { animation: fadeUp 0.3s ease both; }
      `}</style>

      <div style={{ padding: '0 60px 48px' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8571A', marginBottom: 12 }}>HOW IT WORKS</p>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 4px', lineHeight: 1.1 }}>
          Simple steps.<br /><em style={{ color: '#FF5003', fontStyle: 'italic' }}>Serious medicine.</em>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: 0 }}>From your first consultation to compounds at your door.</p>
      </div>

      <div ref={stageRef} style={{ position: 'relative', height: 150, margin: '0 60px 36px' }}>
        <div style={{ display: 'flex', position: 'absolute', inset: 0, gap: 12 }}>
          {cardData.map((card, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              onClick={() => { go(i); clearInterval(timerRef.current); }}
              style={{ flex: 1, borderRadius: 14, background: 'rgba(232,220,200,0.08)', border: '1px solid rgba(232,220,200,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', padding: '0 10px', textAlign: 'center' }}
            >
              <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700, fontSize: 30, color: 'rgba(255,255,255,0.9)', lineHeight: 1 }}>{card.num}</span>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{card.label}</span>
            </div>
          ))}
        </div>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', borderRadius: 14 }} />
        <div ref={ringRef} style={{ position: 'absolute', top: 4, bottom: 4, borderRadius: 12, border: '2px solid rgba(232,87,26,0.8)', boxShadow: '0 0 20px rgba(232,87,26,0.15)', pointerEvents: 'none', zIndex: 3 }} />
      </div>

      <div key={infoKey} className="hiw-fade" style={{ textAlign: 'center', minHeight: 90, padding: '0 60px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8571A', marginBottom: 6 }}>{steps[cur].label}</p>
        <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{steps[cur].title}</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', maxWidth: 380, margin: '0 auto', lineHeight: 1.65 }}>{steps[cur].desc}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
        {steps.map((_, i) => (
          <button key={i} onClick={() => { go(i); clearInterval(timerRef.current); }} style={{ width: cur === i ? 20 : 6, height: 6, borderRadius: cur === i ? 3 : '50%', background: cur === i ? '#E8571A' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
        ))}
      </div>

      <button style={{ display: 'block', margin: '24px auto 0', background: '#E8571A', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.06em', border: 'none', borderRadius: 999, padding: '13px 32px', cursor: 'pointer' }}>
        START YOUR ASSESSMENT →
      </button>
    </section>
  );
}
