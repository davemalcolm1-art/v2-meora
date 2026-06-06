import { useEffect, useRef, useState } from "react";
import "./DomainStrips.css";
import energyHero from "@/assets/domains/energy-hero.jpg.asset.json";
import performanceHero from "@/assets/domains/performance-hero.jpg.asset.json";
import balanceHero from "@/assets/domains/balance-hero.jpg.asset.json";
import recoveryHero from "@/assets/domains/recovery-hero.jpg.asset.json";
import longevityHero from "@/assets/domains/longevity-hero.jpg.asset.json";
import beautyHero from "@/assets/domains/beauty-hero.jpg.asset.json";

const DOMAINS = [
  { name: "Energy",      desc: "Show up fully. Every single day.",                   image: energyHero.url },
  { name: "Performance", desc: "Built to go further than you thought possible.",     image: performanceHero.url },
  { name: "Balance",     desc: "When everything feels in sync, everything changes.", image: balanceHero.url },
  { name: "Recovery",    desc: "Built for the comeback.",                            image: recoveryHero.url },
  { name: "Longevity",   desc: "Play the long game. On your terms.",                 image: longevityHero.url },
  { name: "Beauty",      desc: "Radiant from within. Supported by science.",         image: beautyHero.url },
];

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  // flip Y for image textures
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// Fluted glass: sample image with strong horizontal displacement that varies
// along a near-vertical axis -> creates vertical "ribs" of refraction.
const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_amp;       // 0 = clear, 1 = fully fluted
uniform vec2 u_res;
uniform float u_aspect;    // texW/texH

void main() {
  vec2 uv = v_uv;

  // Rib coordinate: slight diagonal so it reads like fluted glass at angle
  float ribCoord = uv.x * 1.0 + uv.y * 0.18;

  // ~28 ribs across the strip
  float ribs = sin(ribCoord * 90.0);
  float ribs2 = sin(ribCoord * 30.0 + 0.6);

  // displacement primarily horizontal (perpendicular to rib direction)
  vec2 disp = vec2(ribs * 0.022 + ribs2 * 0.010,
                   ribs * 0.004) * u_amp;

  vec2 suv = uv + disp;
  vec3 col = texture2D(u_tex, suv).rgb;

  // subtle chromatic offset along ribs
  float ca = 0.004 * u_amp;
  col.r = texture2D(u_tex, suv + vec2(ca, 0.0)).r;
  col.b = texture2D(u_tex, suv - vec2(ca, 0.0)).b;

  // rib shading: darker valleys + bright highlights at rib peaks
  float shade = 0.5 + 0.5 * ribs;
  col *= mix(1.0, 0.78 + 0.34 * shade, u_amp);

  // specular highlight streaks where |ribs| ~ 1
  float hi = pow(max(0.0, ribs), 12.0);
  col += vec3(1.0) * hi * 0.35 * u_amp;

  gl_FragColor = vec4(col, 1.0);
}`;

function useGlassShader(canvasRef, imageUrl, hovered) {
  const ampRef = useRef(1.0);
  const targetRef = useRef(1.0);

  useEffect(() => {
    targetRef.current = hovered ? 0.0 : 1.0;
  }, [hovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, alpha: false });
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

    const uAmp = gl.getUniformLocation(prog, "u_amp");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTex = gl.getUniformLocation(prog, "u_tex");
    const uAspect = gl.getUniformLocation(prog, "u_aspect");

    // Texture
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // 1x1 placeholder
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([26,43,53,255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(uTex, 0);

    let aspect = 1;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      aspect = img.width / img.height;
    };
    img.src = imageUrl;

    let raf;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, canvas.clientWidth * dpr);
      const h = Math.max(1, canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const render = () => {
      ampRef.current += (targetRef.current - ampRef.current) * 0.07;
      gl.uniform1f(uAmp, ampRef.current);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uAspect, aspect);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [canvasRef, imageUrl]);
}

function Strip({ index, name, desc, image }) {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  useGlassShader(canvasRef, image, hovered);

  return (
    <div
      className={`ds-strip ${hovered ? "is-hover" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas ref={canvasRef} className="ds-canvas" />
      <div className="ds-tint" aria-hidden />
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
      <div className="ds-list">
        {DOMAINS.map((d, i) => (
          <Strip key={d.name} index={i} name={d.name} desc={d.desc} image={d.image} />
        ))}
      </div>
    </section>
  );
}
