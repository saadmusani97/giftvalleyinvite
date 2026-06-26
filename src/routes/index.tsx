import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GiftValley — Grand Opening Invitation" },
      {
        name: "description",
        content:
          "You are cordially invited to the Grand Opening of GiftValley — 29 June 2026, Shop No. 8, Akash Ganga Building, Naya Nagar.",
      },
      { property: "og:title", content: "GiftValley — Grand Opening" },
      {
        property: "og:description",
        content: "Where Every Gift Tells a Story. 29 June 2026.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap",
      },
    ],
  }),
  component: Invitation,
});

const COLORS = ["#7B2FBE", "#2563EB", "#06B6D4", "#EC4899", "#F97316", "#FBBF24"];
const LETTER_COLORS = [
  "#7B2FBE","#2563EB","#06B6D4","#EC4899","#F97316","#FBBF24",
  "#7B2FBE","#2563EB","#06B6D4","#EC4899",
];
const NAME = "GiftValley";
const DATE_TEXT = "29 June 2026";

type Cat = { name: string; icon: JSX.Element; border: [string, string] };

const ICON_PROPS = {
  width: 36,
  height: 36,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "white",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CATEGORIES: Cat[] = [
  {
    name: "Gifts",
    border: ["#7B2FBE", "#EC4899"],
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="9" width="18" height="12" rx="1" />
        <path d="M3 13h18" />
        <path d="M12 9v12" />
        <path d="M12 9c-1.5-2-4-2.5-5-1.2C6 9 7.5 9 9 9h3z" />
        <path d="M12 9c1.5-2 4-2.5 5-1.2C18 9 16.5 9 15 9h-3z" />
      </svg>
    ),
  },
  {
    name: "Toys",
    border: ["#EC4899", "#F97316"],
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="8" cy="6" r="1.6" />
        <circle cx="16" cy="6" r="1.6" />
        <path d="M7 8c-1.5 1.2-2 3-2 4.5C5 17 8 20 12 20s7-3 7-7.5c0-1.5-.5-3.3-2-4.5" />
        <circle cx="10" cy="13" r=".7" />
        <circle cx="14" cy="13" r=".7" />
        <path d="M10.5 16c.5.5 2.5.5 3 0" />
      </svg>
    ),
  },
  {
    name: "Sports",
    border: ["#06B6D4", "#2563EB"],
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 20l8-8" />
        <path d="M10 10l5-5c1-1 3-1 4 0s1 3 0 4l-5 5" />
        <circle cx="18" cy="18" r="2.2" />
      </svg>
    ),
  },
  {
    name: "Video Games",
    border: ["#2563EB", "#06B6D4"],
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M6 8h12a3 3 0 013 3v4a2.5 2.5 0 01-4.5 1.5L15 14H9l-1.5 2.5A2.5 2.5 0 013 15v-4a3 3 0 013-3z" />
        <circle cx="9" cy="12" r=".9" />
        <circle cx="15" cy="12" r=".9" />
      </svg>
    ),
  },
  {
    name: "RC Cars",
    border: ["#F97316", "#FBBF24"],
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M5 16h14l-1.5-4a2 2 0 00-2-1.4H8.5a2 2 0 00-2 1.4L5 16z" />
        <path d="M3 16h18" />
        <circle cx="8" cy="18" r="2" />
        <circle cx="16" cy="18" r="2" />
        <path d="M17 10V5" />
        <circle cx="17" cy="4" r=".8" />
      </svg>
    ),
  },
  {
    name: "Showpieces",
    border: ["#FBBF24", "#7B2FBE"],
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9 4h6l-1 3a3 3 0 11-4 0L9 4z" />
        <path d="M11 10v5" />
        <path d="M13 10v5" />
        <path d="M8 15h8" />
        <path d="M7 20h10" />
        <path d="M8 15l-1 5" />
        <path d="M16 15l1 5" />
      </svg>
    ),
  },
  {
    name: "Bikes",
    border: ["#7B2FBE", "#06B6D4"],
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="17" r="3" />
        <path d="M6 17l4-8h5l3 8" />
        <path d="M10 9l2 4" />
        <path d="M14 6h2l-1 3" />
        <path d="M9 9h3" />
      </svg>
    ),
  },
];

function Invitation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [toast, setToast] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Particle burst
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const count = (navigator.hardwareConcurrency || 4) < 4 ? 45 : 100;
    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; star: boolean; rot: number };
    const particles: P[] = [];
    let started = false;
    const start = () => {
      started = true;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 7;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          max: 70 + Math.random() * 50,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          star: Math.random() < 0.4,
          rot: Math.random() * Math.PI,
        });
      }
    };
    const burstTimer = window.setTimeout(start, 900);

    let raf = 0;
    let paused = false;
    const drawStar = (x: number, y: number, r: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = rot + (i * Math.PI) / 4;
        const rr = i % 2 === 0 ? r : r * 0.35;
        const px = x + Math.cos(a) * rr;
        const py = y + Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!started) {
        // pulsing pinpoint
        const t = (performance.now() % 1000) / 1000;
        const r = 2 + Math.sin(t * Math.PI * 2) * 2;
        ctx.fillStyle = "rgba(255,255,255," + (0.7 + 0.3 * Math.sin(t * Math.PI * 2)) + ")";
        ctx.beginPath();
        ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        for (const p of particles) {
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          const alpha = Math.max(0, 1 - p.life / p.max);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          if (p.star) drawStar(p.x, p.y, 4, p.rot + p.life * 0.05);
          else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }
      if (!paused) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVis = () => {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(raf);
      } else if (paused) {
        paused = false;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // Stop burst loop after ~3s, hand off to confetti
    const stopTimer = window.setTimeout(() => {
      paused = true;
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3500);

    return () => {
      clearTimeout(burstTimer);
      clearTimeout(stopTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Confetti loop (starts at 12s)
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type C = { x: number; y: number; vy: number; rot: number; vr: number; shape: 0 | 1 | 2; w: number; h: number; color: string };
    const confetti: C[] = [];
    const make = (): C => {
      const w = 4 + Math.random() * 6;
      return {
        x: Math.random() * window.innerWidth,
        y: -10 - Math.random() * window.innerHeight,
        vy: 0.4 + Math.random() * 1.2,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.04,
        shape: Math.floor(Math.random() * 3) as 0 | 1 | 2,
        w,
        h: w * (0.4 + Math.random()),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    };
    for (let i = 0; i < 35; i++) confetti.push(make());

    let raf = 0;
    let active = false;
    let paused = false;
    const startTimer = window.setTimeout(() => {
      active = true;
    }, 11800);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (active) {
        for (const c of confetti) {
          c.y += c.vy;
          c.rot += c.vr;
          if (c.y > window.innerHeight + 20) {
            c.y = -20;
            c.x = Math.random() * window.innerWidth;
          }
          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate(c.rot);
          ctx.fillStyle = c.color;
          ctx.globalAlpha = 0.85;
          if (c.shape === 0) {
            ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
          } else if (c.shape === 1) {
            ctx.beginPath();
            ctx.arc(0, 0, c.w / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(-c.w, -0.5, c.w * 2, 1);
          }
          ctx.restore();
        }
        ctx.globalAlpha = 1;
      }
      if (!paused) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVis = () => {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(raf);
      } else if (paused) {
        paused = false;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const playChime = () => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
      const ac = audioCtxRef.current;
      const notes = [523.25, 659.25, 783.99];
      let t = ac.currentTime + 0.02;
      notes.forEach((f) => {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.type = "sine";
        o.frequency.value = f;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.35, t + 0.01);
        g.gain.setValueAtTime(0.35, t + 0.08);
        g.gain.linearRampToValueAtTime(0, t + 0.16);
        o.connect(g).connect(ac.destination);
        o.start(t);
        o.stop(t + 0.18);
        t += 0.16 + 0.04;
      });
    } catch {
      /* ignore */
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (!next) playChime();
  };

  const onShare = async () => {
    const url = window.location.href;
    const data = { title: "GiftValley Grand Opening", url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
    } catch {
      /* fall through to clipboard */
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
    setToast(true);
    window.setTimeout(() => setToast(false), 2000);
  };

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="gv-root">
      <style>{CSS}</style>
      <canvas ref={canvasRef} className="gv-canvas gv-canvas-burst" />
      <canvas ref={confettiCanvasRef} className="gv-canvas gv-canvas-confetti" />
      <div className="gv-mesh" aria-hidden />

      <button
        className="gv-audio"
        onClick={toggleMute}
        aria-label={muted ? "Unmute sound" : "Mute sound"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9v6h4l5 4V5L8 9H4z" />
          {!muted && (
            <>
              <path d="M16 8c1.5 1.2 1.5 6.8 0 8" />
              <path d="M19 5c3 2.5 3 11.5 0 14" />
            </>
          )}
        </svg>
      </button>

      <main className="gv-stage">
        <h1 className="gv-name" aria-label={NAME}>
          {NAME.split("").map((ch, i) => (
            <span
              key={i}
              className="gv-letter"
              style={{
                color: LETTER_COLORS[i],
                textShadow: `0 0 18px ${LETTER_COLORS[i]}99, 0 0 32px ${LETTER_COLORS[i]}55`,
                animationDelay: `${2000 + i * 75}ms`,
              }}
            >
              {ch}
            </span>
          ))}
        </h1>
        <p className="gv-tagline">Where Every Gift Tells a Story</p>

        <div className="gv-grid">
          {CATEGORIES.map((c, i) => (
            <div
              key={c.name}
              className={"gv-tile" + (i === 6 ? " gv-tile-last" : "")}
              style={{
                animationDelay: `${4000 + i * 350}ms`,
                ["--b1" as string]: c.border[0],
                ["--b2" as string]: c.border[1],
              }}
            >
              <div className="gv-tile-icon">{c.icon}</div>
              <div className="gv-tile-label">{c.name}</div>
            </div>
          ))}
        </div>

        <section className="gv-card">
          <div className="gv-eyebrow">You are cordially invited to</div>
          <h2 className="gv-grand">GRAND OPENING</h2>
          <div className="gv-divider" />
          <div className="gv-date">
            {DATE_TEXT.split("").map((ch, i) => (
              <span
                key={i}
                className="gv-date-ch"
                style={{ animationDelay: `${9400 + i * 60}ms` }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
          <div className="gv-time">Grand Opening Day — Monday</div>
          <div className="gv-addr gv-addr-1">GiftValley</div>
          <div className="gv-addr gv-addr-2">Shop No. 8, Akash Ganga Building</div>
          <div className="gv-addr gv-addr-3">Naya Nagar</div>

          <div className="gv-actions">
            <a
              className="gv-btn gv-btn-dir"
              href="https://maps.google.com/?q=Shop+No+8+Akash+Ganga+Building+Naya+Nagar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>Get Directions</span>
            </a>
            <button className="gv-btn gv-btn-share" onClick={onShare}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4" />
                <path d="M7 9l5-5 5 5" />
                <path d="M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5" />
              </svg>
              <span>Share Invite</span>
            </button>
          </div>
        </section>
      </main>

      <div className={"gv-toast" + (toast ? " gv-toast-show" : "")}>Link copied to clipboard</div>
    </div>
  );
}

const CSS = `
.gv-root {
  position: fixed; inset: 0;
  background: #0A0A0F;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}
.gv-canvas { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; }
.gv-canvas-burst { z-index: 2; }
.gv-canvas-confetti { z-index: 1; }

.gv-mesh {
  position: fixed; inset: -10%; z-index: 0;
  background:
    radial-gradient(circle at 30% 30%, rgba(123,47,190,0.22), transparent 45%),
    radial-gradient(circle at 70% 60%, rgba(37,99,235,0.20), transparent 50%),
    radial-gradient(circle at 50% 80%, rgba(236,72,153,0.18), transparent 50%);
  animation: gv-mesh 7s ease-in-out infinite alternate;
  opacity: 0; animation-delay: 0s;
}
@keyframes gv-mesh {
  0%   { transform: translate(-2%, -2%) scale(1); opacity: 1; }
  50%  { transform: translate(3%, 1%) scale(1.05); }
  100% { transform: translate(-1%, 3%) scale(1); opacity: 1; }
}
.gv-root .gv-mesh { animation: gv-mesh 7s ease-in-out infinite alternate, gv-fade-mesh 1s ease 1.6s forwards; }
@keyframes gv-fade-mesh { to { opacity: 1; } }

.gv-stage {
  position: relative; z-index: 3;
  width: 100vw; height: 100vh;
  display: flex; flex-direction: column; align-items: center;
  justify-content: flex-start;
  padding: clamp(14px, 4vh, 28px) 16px;
  box-sizing: border-box;
  gap: clamp(8px, 1.5vh, 14px);
}

.gv-name {
  font-family: 'Cinzel Decorative', serif;
  font-weight: 900;
  font-size: clamp(2.8rem, 10vw, 6rem);
  margin: clamp(8px, 3vh, 24px) 0 0;
  line-height: 1;
  display: flex; gap: 0.01em;
  animation: gv-pulse 3s ease-in-out infinite;
  animation-delay: 12s;
}
.gv-letter {
  display: inline-block;
  opacity: 0; transform: translateY(20px);
  animation: gv-letter-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
}
@keyframes gv-letter-in { to { opacity: 1; transform: translateY(0); } }
@keyframes gv-pulse {
  0%, 100% { filter: brightness(1); }
  50%      { filter: brightness(1.15); }
}

.gv-tagline {
  font-style: italic;
  font-size: clamp(0.7rem, 2.4vw, 0.9rem);
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.7);
  margin: 0;
  opacity: 0;
  animation: gv-fade 0.6s ease forwards;
  animation-delay: 3.4s;
  text-align: center;
}
@keyframes gv-fade { to { opacity: 1; } }

.gv-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(6px, 1.5vw, 10px);
  width: min(420px, 92vw);
  margin-top: clamp(6px, 1.5vh, 12px);
}
.gv-tile {
  position: relative;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: clamp(8px, 2vh, 14px) 6px;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  opacity: 0; transform: scale(0.6);
  animation: gv-pop 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
}
.gv-tile::before {
  content: ""; position: absolute; inset: 0; border-radius: 12px;
  padding: 1.5px;
  background: linear-gradient(135deg, var(--b1), var(--b2));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
  box-shadow: 0 0 14px color-mix(in oklab, var(--b1) 35%, transparent) inset;
}
.gv-tile-icon { display: flex; }
.gv-tile-icon svg { width: clamp(28px, 7vw, 36px); height: clamp(28px, 7vw, 36px); }
.gv-tile-label {
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.85);
}
@keyframes gv-pop { to { opacity: 1; transform: scale(1); } }
.gv-tile-last { grid-column: 1 / -1; justify-self: center; width: 50%; }
@media (min-width: 600px) {
  .gv-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); width: min(720px, 92vw); }
  .gv-tile-last { grid-column: auto; width: auto; }
}

.gv-card {
  position: relative;
  width: min(440px, 92vw);
  margin-top: clamp(10px, 2vh, 18px);
  padding: clamp(14px, 3vh, 22px) clamp(14px, 5vw, 24px);
  border-radius: 20px;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  text-align: center;
  opacity: 0; transform: translateY(80px);
  animation: gv-card-in 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
  animation-delay: 8s;
  box-shadow: 0 20px 60px -20px rgba(123,47,190,0.45);
}
.gv-card::before {
  content: ""; position: absolute; inset: 0; border-radius: 20px;
  padding: 1.5px;
  background: linear-gradient(135deg, #7B2FBE, #2563EB, #06B6D4, #EC4899, #F97316, #FBBF24);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
@keyframes gv-card-in { to { opacity: 1; transform: translateY(0); } }

.gv-eyebrow {
  font-variant: small-caps;
  letter-spacing: 0.22em;
  font-size: clamp(0.6rem, 2vw, 0.72rem);
  color: rgba(255,255,255,0.55);
  opacity: 0; animation: gv-fade 0.5s ease forwards;
  animation-delay: 8.8s;
}
.gv-grand {
  font-family: 'Cinzel Decorative', serif;
  font-weight: 900;
  font-size: clamp(2rem, 8vw, 4rem);
  margin: 6px 0 8px;
  background: linear-gradient(90deg, #7B2FBE, #2563EB, #06B6D4, #EC4899, #F97316, #FBBF24, #7B2FBE);
  background-size: 300% 100%;
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  animation: gv-fade 0.5s ease forwards, gv-grad 4s linear infinite;
  animation-delay: 8.9s, 8.9s;
  line-height: 1.05;
}
@keyframes gv-grad {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}

.gv-divider {
  height: 1.5px; width: 80%; margin: 8px auto 12px;
  background: linear-gradient(90deg, transparent, #FBBF24, transparent);
  transform: scaleX(0); transform-origin: left;
  animation: gv-draw 0.8s ease forwards;
  animation-delay: 9.2s;
}
@keyframes gv-draw { to { transform: scaleX(1); } }

.gv-date {
  font-weight: 600; color: #FBBF24;
  font-size: clamp(1rem, 4vw, 1.3rem);
  margin: 4px 0;
  min-height: 1.4em;
}
.gv-date-ch { display: inline-block; opacity: 0; animation: gv-fade 0.05s linear forwards; }

.gv-time {
  color: #fff; font-size: clamp(0.78rem, 2.6vw, 0.92rem);
  opacity: 0; animation: gv-fade 0.4s ease forwards;
  animation-delay: 10.6s;
  margin-bottom: 8px;
}
.gv-addr {
  color: rgba(255,255,255,0.65);
  font-size: clamp(0.72rem, 2.4vw, 0.85rem);
  opacity: 0; animation: gv-fade 0.4s ease forwards;
  line-height: 1.5;
}
.gv-addr-1 { animation-delay: 11s; color: rgba(255,255,255,0.85); font-weight: 500; }
.gv-addr-2 { animation-delay: 11.35s; }
.gv-addr-3 { animation-delay: 11.7s; }

.gv-actions {
  display: flex; gap: 10px; justify-content: center;
  margin-top: clamp(12px, 2.5vh, 18px);
  flex-wrap: wrap;
}
.gv-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px;
  border-radius: 100px;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.78rem, 2.4vw, 0.88rem);
  font-weight: 500;
  color: #fff; text-decoration: none;
  border: none; cursor: pointer;
  opacity: 0; transform: scale(0);
  animation: gv-bounce 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards;
}
.gv-btn-dir { background: linear-gradient(135deg, #7B2FBE, #2563EB); animation-delay: 12.2s; }
.gv-btn-share { background: linear-gradient(135deg, #EC4899, #F97316); animation-delay: 12.4s; }
@keyframes gv-bounce { to { opacity: 1; transform: scale(1); } }

.gv-audio {
  position: fixed; top: 20px; right: 20px; z-index: 10;
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}

.gv-toast {
  position: fixed; left: 50%; bottom: 30px;
  transform: translate(-50%, 80px);
  background: rgba(15,15,22,0.95);
  color: #fff;
  padding: 10px 18px; border-radius: 100px;
  font-size: 0.8rem; font-family: 'Poppins', sans-serif;
  border: 1px solid rgba(255,255,255,0.1);
  opacity: 0; transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 20;
}
.gv-toast-show { transform: translate(-50%, 0); opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .gv-letter, .gv-tagline, .gv-tile, .gv-card, .gv-eyebrow,
  .gv-grand, .gv-divider, .gv-date-ch, .gv-time, .gv-addr, .gv-btn, .gv-mesh, .gv-name {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .gv-canvas { display: none; }
}
`;
