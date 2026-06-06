import { useEffect, useRef, useState } from "react";
import "./DomainStrips.css";

const HERO_VIDEO = "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/hero-bg.mp4";

const DOMAINS = [
  { name: "Energy",      desc: "Show up fully. Every single day." },
  { name: "Performance", desc: "Built to go further than you thought possible." },
  { name: "Balance",     desc: "When everything feels in sync, everything changes." },
  { name: "Recovery",    desc: "Built for the comeback." },
  { name: "Longevity",   desc: "Play the long game. On your terms." },
  { name: "Beauty",      desc: "Radiant from within. Supported by science." },
];

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform float u_time;
uniform float u_amp;
uniform vec2 u_res;

void main() {
  vec2 uv = v_uv;
  // diagonal coordinate
  float d = (uv.x + uv.y) * 0.5;
  // ribbed pattern (vertical-ish ribs rotated diagonally)
  float ribs = sin(d * 140.0 + u_time * 0.4);
  float ribs2 = sin(d * 60.0 - u_time * 0.2);

  // displacement along diagonal
  vec2 dir = normalize(vec2(1.0, -0.6));
  vec2 offset = dir * ribs * u_amp + dir * ribs2 * u_amp * 0.4;

  vec2 suv = uv + offset;

  // base dark moody color with rib shading
  float shade = 0.5 + 0.5 * ribs;
  vec3 base = mix(vec3(0.04, 0.08, 0.10), vec3(0.10, 0.17, 0.20), shade);

  // streak highlights
  float hi = smoothstep(0.85, 1.0, abs(ribs)) * (u_amp / 0.04);
  base += vec3(0.18, 0.22, 0.24) * hi;

  // fade ribs as amp drops -> reveal transparency
  float alpha = clamp(u_amp / 0.04, 0.0, 1.0);
  gl_FragColor = vec4(base, alpha * 0.92);
}`;

function useGlassShader(canvasRef, hovered) {
  const ampRef = useRef(0.04);
  const targetRef = useRef(0.04);

  useEffect(() => {
    targetRef.current = hovered ? 0.0 : 0.04;
  }, [hovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uAmp = gl.getUniformLocation(prog, "u_amp");
    const uRes = gl.getUniformLocation(prog, "u_res");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf;
    const start = performance.now();
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const render = () => {
      // lerp amp toward target (600ms-ish feel)
      ampRef.current += (targetRef.current - ampRef.current) * 0.06;
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform1f(uAmp, ampRef.current);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [canvasRef]);
}

function Strip({ index, name, desc }) {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  useGlassShader(canvasRef, hovered);

  return (
    <div
      className={`ds-strip ${hovered ? "is-hover" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas ref={canvasRef} className="ds-canvas" />
      <span className="ds-bar" aria-hidden />
      <div className="ds-row">
        <div className="ds-left">
          <span className="ds-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="ds-name">{name}</span>
        </div>
        <div className="ds-right">
          <span className="ds-desc">{desc}</span>
          <span className="ds-arrow" aria-hidden>→</span>
        </div>
      </div>
    </div>
  );
}

export default function DomainStrips() {
  return (
    <section className="ds-section">
      <video
        className="ds-bgvideo"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="ds-bg-tint" aria-hidden />
      <div className="ds-list">
        {DOMAINS.map((d, i) => (
          <Strip key={d.name} index={i} name={d.name} desc={d.desc} />
        ))}
      </div>
    </section>
  );
}
