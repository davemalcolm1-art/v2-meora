import { useEffect, useRef, useState } from "react";
import "./DomainStrips.css";

const MARK = {
  gold: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-gold.png",
  steel: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-steel.png",
  marble: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-marble.png",
  water: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-water.png",
  jungle: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-jungle.png",
  rosegold: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-rosegold.png",
};

const BG = {
  energy: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-energy.jpg",
  performance: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-performance.jpg",
  balance: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-balance.jpg",
  recovery: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-recovery.jpg",
  longevity: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-longevity.jpg",
  beauty: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-beauty.jpg",
};

const DOMAINS = [
  {
    id: "energy", name: "Energy", tagline: "Show up fully. Every single day.", image: BG.energy,
    featured: { heading: "Daily Energy & Clarity", secondaryLabel: "Foundation.ME",
                desc: "Sustained energy, sharper focus and consistent output — every single day.", mark: MARK.gold },
    pills: [
      { name: "Advanced Energy Support", slug: "advanced-energy-support" },
      { name: "Drive & Vitality", slug: "drive-and-vitality" },
    ],
  },
  {
    id: "performance", name: "Performance", tagline: "Built to go further than you thought possible.", image: BG.performance,
    featured: { heading: "Strength & Body Recomposition", secondaryLabel: "Performance.ME",
                desc: "Build lean muscle, reduce body fat and perform at your peak.", mark: MARK.steel },
    pills: [
      { name: "Peak Athletic Performance", slug: "peak-athletic-performance" },
      { name: "Cognitive Edge", slug: "cognitive-edge" },
    ],
  },
  {
    id: "balance", name: "Balance", tagline: "When everything feels in sync, everything changes.", image: BG.balance,
    featured: { heading: "Weight Management", secondaryLabel: "Weight Loss.ME",
                desc: "A smarter, medically supervised path to sustainable body composition.", mark: MARK.jungle },
    pills: [
      { name: "Advanced Weight Loss", slug: "advanced-weight-loss" },
      { name: "GLP-1 Program", slug: "glp-1-program" },
    ],
  },
  {
    id: "recovery", name: "Recovery", tagline: "Built for the comeback.", image: BG.recovery,
    featured: { heading: "Injury & Muscle Recovery", secondaryLabel: "Recovery.ME",
                desc: "Repair faster, reduce inflammation and come back stronger.", mark: MARK.marble },
    pills: [],
  },
  {
    id: "longevity", name: "Longevity", tagline: "Play the long game. On your terms.", image: BG.longevity,
    featured: { heading: "Long-Term Health Optimisation", secondaryLabel: "Longevity.ME",
                desc: "Protect what you've built and invest in the decades ahead.", mark: MARK.water },
    pills: [
      { name: "Comprehensive Longevity Protocol", slug: "comprehensive-longevity-protocol" },
    ],
  },
  {
    id: "beauty", name: "Beauty", tagline: "Radiant from within. Supported by science.", image: BG.beauty,
    featured: { heading: "Skin & Collagen Support", secondaryLabel: "Skin & Collagen.ME",
                desc: "Radiant, resilient skin supported by peptide science from within.", mark: MARK.rosegold },
    pills: [],
  },
];

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// Procedural fluted-glass overlay: transparent ribbed pattern that sits
// over a real <img> below. No texture sampling -> no CORS dependency.
// Very subtle frosted ribbing — reads as faint heat-haze, not corrugated metal.
const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform float u_amp;
void main() {
  vec2 uv = v_uv;
  float ribCoord = uv.x + uv.y * 0.08;
  float ribs  = sin(ribCoord * 320.0);
  float ribs2 = sin(ribCoord * 140.0 + 0.6);

  float shade = 0.5 + 0.5 * ribs;
  float band = mix(shade, 0.5 + 0.5 * ribs2, 0.3);

  vec3 valley = vec3(0.05, 0.09, 0.12);
  vec3 peak   = vec3(0.78, 0.84, 0.90);
  vec3 col    = mix(valley, peak, band);

  // very thin specular highlights only at sharp peaks
  float hi = pow(max(0.0, ribs), 28.0);
  col += vec3(1.0) * hi * 0.18;

  // amplitude controls coverage — kept very low for subtlety
  float alpha = u_amp * 0.18;
  gl_FragColor = vec4(col, alpha);
}`;

function useGlassShader(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true });
    if (!gl) return;
    const compile = (t, s) => { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); return sh; };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uAmp = gl.getUniformLocation(prog, "u_amp");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const draw = () => {
      gl.uniform1f(uAmp, 1.0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      draw();
    };
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
    return () => { ro.disconnect(); };
  }, [canvasRef]);
}

function Strip({ index, domain, isOpen, onToggle }) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`ds-strip ${isOpen ? "is-open" : ""} ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <img src={domain.image} alt="" className="ds-img" loading="lazy" />
      <div className="ds-frost" aria-hidden />
      <div className="ds-tint" aria-hidden />
      <span className="ds-bar" aria-hidden />


      <div className="ds-row">
        <div className="ds-left">
          <span className="ds-name">{domain.name}</span>
        </div>
        <div className="ds-right">
          <span className="ds-desc">{domain.tagline}</span>
          <span className="ds-arrow" aria-hidden>{isOpen ? "−" : "→"}</span>
        </div>
      </div>


      <div className="ds-panel">
        <div className="ds-panel-inner">
          <div className="ds-panel-left">
            <a href={`/protocols/${domain.id}`} className="pd-featured" style={{ textDecoration: "none" }}>
              <img src={domain.featured.mark} alt="" className="pd-fmark" />
              <div className="pd-fname">{domain.featured.heading}</div>
              <div className="pd-fsublabel">{domain.featured.secondaryLabel}</div>
              <div className="pd-fdesc">{domain.featured.desc}</div>
              <div className="pd-flearn">Learn more →</div>
            </a>
          </div>
          <div className="ds-panel-right">
            <div>
              <div className="pd-dname">{domain.name}</div>
              <div className="pd-dtag">{domain.tagline}</div>
            </div>
            {domain.pills.length > 0 && (
              <div className="pd-pills">
                {domain.pills.map((p) => (
                  <a key={p.name} href={`/protocols/${p.slug}`} className="pd-pill" style={{ textDecoration: "none" }}>
                    <span className="pd-pill-name">{p.name}</span>
                    <span className="pd-pill-arrow">→</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DomainStrips() {
  const [openId, setOpenId] = useState(null);
  return (
    <section className="ds-section">
      <video
        className="ds-video"
        src="https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/heroV3.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="ds-list" onMouseLeave={() => setOpenId(null)}>
        {DOMAINS.map((d, i) => (
          <Strip
            key={d.id}
            index={i}
            domain={d}
            isOpen={openId === d.id}
            onToggle={(open) => setOpenId(open ? d.id : (openId === d.id ? null : openId))}
          />
        ))}
      </div>
    </section>
  );
}
