import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactElement } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GiftValley — You Are Invited" },
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
        href: "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Cinzel:wght@500;700&family=Poppins:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Invitation,
});

const NAME = "GiftValley";
const DATE_TEXT = "29 June 2026";

type Cat = { name: string; icon: ReactElement };

const ICON_PROPS = {
  width: 32,
  height: 32,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#3a2418",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CATEGORIES: Cat[] = [
  { name: "Gifts", icon: (<svg {...ICON_PROPS}><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18"/><path d="M12 9v12"/><path d="M12 9c-1.5-2-4-2.5-5-1.2C6 9 7.5 9 9 9h3z"/><path d="M12 9c1.5-2 4-2.5 5-1.2C18 9 16.5 9 15 9h-3z"/></svg>) },
  { name: "Toys", icon: (<svg {...ICON_PROPS}><circle cx="8" cy="6" r="1.6"/><circle cx="16" cy="6" r="1.6"/><path d="M7 8c-1.5 1.2-2 3-2 4.5C5 17 8 20 12 20s7-3 7-7.5c0-1.5-.5-3.3-2-4.5"/><circle cx="10" cy="13" r=".7"/><circle cx="14" cy="13" r=".7"/><path d="M10.5 16c.5.5 2.5.5 3 0"/></svg>) },
  { name: "Sports", icon: (<svg {...ICON_PROPS}><path d="M4 20l8-8"/><path d="M10 10l5-5c1-1 3-1 4 0s1 3 0 4l-5 5"/><circle cx="18" cy="18" r="2.2"/></svg>) },
  { name: "Video Games", icon: (<svg {...ICON_PROPS}><path d="M6 8h12a3 3 0 013 3v4a2.5 2.5 0 01-4.5 1.5L15 14H9l-1.5 2.5A2.5 2.5 0 013 15v-4a3 3 0 013-3z"/><circle cx="9" cy="12" r=".9"/><circle cx="15" cy="12" r=".9"/></svg>) },
  { name: "RC Cars", icon: (<svg {...ICON_PROPS}><path d="M5 16h14l-1.5-4a2 2 0 00-2-1.4H8.5a2 2 0 00-2 1.4L5 16z"/><path d="M3 16h18"/><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/></svg>) },
  { name: "Showpieces", icon: (<svg {...ICON_PROPS}><path d="M9 4h6l-1 3a3 3 0 11-4 0L9 4z"/><path d="M11 10v5"/><path d="M13 10v5"/><path d="M8 15h8"/><path d="M7 20h10"/></svg>) },
  { name: "Bikes", icon: (<svg {...ICON_PROPS}><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8"/><path d="M10 9l2 4"/><path d="M14 6h2l-1 3"/></svg>) },
];

// Sage green floral pattern SVG (data URI) used for envelope + letter
const FLORAL_BG =
  "url(\"data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
       <defs>
         <pattern id='p' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'>
           <g fill='none' stroke='#6f8a5e' stroke-width='0.7' opacity='0.55'>
             <circle cx='40' cy='40' r='14'/>
             <circle cx='40' cy='40' r='8'/>
             <circle cx='40' cy='40' r='3' fill='#6f8a5e' opacity='0.6'/>
             <path d='M40 8 Q46 22 40 30 Q34 22 40 8Z' fill='#7a9968' opacity='0.5'/>
             <path d='M40 72 Q46 58 40 50 Q34 58 40 72Z' fill='#7a9968' opacity='0.5'/>
             <path d='M8 40 Q22 46 30 40 Q22 34 8 40Z' fill='#7a9968' opacity='0.5'/>
             <path d='M72 40 Q58 46 50 40 Q58 34 72 40Z' fill='#7a9968' opacity='0.5'/>
             <path d='M18 18 Q28 26 30 30 Q26 28 18 18Z' fill='#6f8a5e' opacity='0.4'/>
             <path d='M62 18 Q52 26 50 30 Q54 28 62 18Z' fill='#6f8a5e' opacity='0.4'/>
             <path d='M18 62 Q28 54 30 50 Q26 52 18 62Z' fill='#6f8a5e' opacity='0.4'/>
             <path d='M62 62 Q52 54 50 50 Q54 52 62 62Z' fill='#6f8a5e' opacity='0.4'/>
             <circle cx='0' cy='0' r='4'/>
             <circle cx='80' cy='0' r='4'/>
             <circle cx='0' cy='80' r='4'/>
             <circle cx='80' cy='80' r='4'/>
           </g>
         </pattern>
       </defs>
       <rect width='160' height='160' fill='url(#p)'/>
     </svg>`
  ) +
  "\")";

function Invitation() {
  const [stage, setStage] = useState<"sealed" | "opening" | "letter" | "details">("sealed");
  const [toast, setToast] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const playCrack = () => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
      const ac = audioCtxRef.current;
      // wax crack: short noise burst
      const dur = 0.18;
      const buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) {
        const t = i / d.length;
        d[i] = (Math.random() * 2 - 1) * (1 - t) * 0.6;
      }
      const src = ac.createBufferSource();
      src.buffer = buf;
      const g = ac.createGain();
      g.gain.value = 0.6;
      const f = ac.createBiquadFilter();
      f.type = "bandpass"; f.frequency.value = 1200; f.Q.value = 0.8;
      src.connect(f).connect(g).connect(ac.destination);
      src.start();
      // chime after
      const notes = [523.25, 659.25, 783.99];
      let t0 = ac.currentTime + 0.25;
      notes.forEach((freq) => {
        const o = ac.createOscillator();
        const gg = ac.createGain();
        o.type = "sine"; o.frequency.value = freq;
        gg.gain.setValueAtTime(0, t0);
        gg.gain.linearRampToValueAtTime(0.25, t0 + 0.02);
        gg.gain.linearRampToValueAtTime(0, t0 + 0.25);
        o.connect(gg).connect(ac.destination);
        o.start(t0); o.stop(t0 + 0.3);
        t0 += 0.18;
      });
    } catch { /* ignore */ }
  };

  const openEnvelope = () => {
    if (stage !== "sealed") return;
    playCrack();
    setStage("opening");
    setTimeout(() => setStage("letter"), 1400);
    setTimeout(() => setStage("details"), 5200);
  };

  const onShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) { await navigator.share({ title: "GiftValley Grand Opening", url }); return; }
    } catch { /* fallthrough */ }
    try { await navigator.clipboard.writeText(url); } catch { /* ignore */ }
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="gv-root" data-stage={stage}>
      <style>{CSS}</style>

      {/* Backdrop: dark warm wood/velvet */}
      <div className="gv-backdrop" aria-hidden />

      {/* ENVELOPE SCENE */}
      {stage !== "details" && (
        <div className="gv-scene" onClick={openEnvelope} role="button" aria-label="Open invitation">
          <div className="gv-envelope">
            {/* Envelope body (back) */}
            <div className="gv-env-body" />
            {/* Letter inside (slides up) */}
            <div className="gv-letter">
              <div className="gv-letter-inner">
                <div className="gv-monogram">GV</div>
                <h2 className="gv-you-are">You are invited</h2>
                <div className="gv-flourish" aria-hidden>
                  <svg viewBox="0 0 200 20" width="180" height="18">
                    <path d="M2 10 Q50 -2 100 10 T 198 10" fill="none" stroke="#8a3a2a" strokeWidth="0.8"/>
                    <circle cx="100" cy="10" r="2" fill="#8a3a2a"/>
                  </svg>
                </div>
                <p className="gv-letter-sub">to the grand opening of</p>
                <h3 className="gv-letter-name">GiftValley</h3>
              </div>
            </div>
            {/* Front flap (bottom triangle decorative) */}
            <div className="gv-env-front" />
            {/* Top flap (opens) */}
            <div className="gv-env-flap">
              <div className="gv-env-flap-inner" />
            </div>
            {/* Wax seal */}
            <div className="gv-seal" aria-hidden>
              <div className="gv-seal-half gv-seal-left">
                <div className="gv-seal-mark">G</div>
              </div>
              <div className="gv-seal-half gv-seal-right">
                <div className="gv-seal-mark">V</div>
              </div>
            </div>
          </div>

          <div className="gv-tap-hint">
            <span className="gv-tap-dot" />
            <span>Tap the wax seal to open</span>
          </div>
        </div>
      )}

      {/* INVITATION DETAILS */}
      {stage === "details" && (
        <main className="gv-details">
          <div className="gv-paper">
            <div className="gv-paper-inner">
              <div className="gv-mono-small">GV</div>
              <div className="gv-eyebrow">— You are cordially invited to the —</div>
              <h1 className="gv-grand">Grand Opening</h1>
              <div className="gv-rule" />
              <h2 className="gv-brand">{NAME}</h2>
              <p className="gv-tagline">Where Every Gift Tells a Story</p>

              <div className="gv-date">{DATE_TEXT}</div>
              <div className="gv-time">Monday · 11:00 AM onwards</div>

              <div className="gv-addr">
                <div className="gv-addr-1">Shop No. 8, Akash Ganga Building</div>
                <div className="gv-addr-2">Naya Nagar</div>
              </div>

              <div className="gv-cats">
                {CATEGORIES.map((c) => (
                  <div key={c.name} className="gv-cat">
                    <div className="gv-cat-icon">{c.icon}</div>
                    <div className="gv-cat-label">{c.name}</div>
                  </div>
                ))}
              </div>

              <div className="gv-actions">
                <a
                  className="gv-btn gv-btn-primary"
                  href="https://maps.google.com/?q=Shop+No+8+Akash+Ganga+Building+Naya+Nagar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
                <button className="gv-btn gv-btn-ghost" onClick={onShare}>
                  Share Invite
                </button>
              </div>

              <div className="gv-foot">With warm regards · The GiftValley Family</div>
            </div>
          </div>
        </main>
      )}

      <div className={"gv-toast" + (toast ? " gv-toast-show" : "")}>Link copied to clipboard</div>
    </div>
  );
}

const SAGE = "#b8c5a0";
const SAGE_DEEP = "#8fa478";
const WAX = "#a8362a";
const WAX_DARK = "#7a2418";
const PAPER = "#e9e3d0";
const INK = "#3a2418";

const CSS = `
.gv-root {
  position: fixed; inset: 0; overflow: hidden;
  font-family: 'Cormorant Garamond', serif;
  color: ${INK};
  background: #1a1410;
}
.gv-backdrop {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 50% 40%, #3a2a1f 0%, #1a110c 70%, #0a0604 100%);
}
.gv-backdrop::after {
  content: ""; position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,200,140,0.06), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(255,180,120,0.05), transparent 40%);
}

/* ENVELOPE SCENE */
.gv-scene {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer;
  perspective: 1400px;
  padding: 20px;
  animation: gv-scene-in 0.9s ease-out both;
}
@keyframes gv-scene-in {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
.gv-root[data-stage="opening"] .gv-scene,
.gv-root[data-stage="letter"]  .gv-scene { cursor: default; }

.gv-envelope {
  position: relative;
  width: min(380px, 86vw);
  aspect-ratio: 3 / 4.2;
  transform-style: preserve-3d;
  filter: drop-shadow(0 30px 50px rgba(0,0,0,0.6));
}

.gv-env-body {
  position: absolute; inset: 0;
  background-color: ${SAGE};
  background-image: ${FLORAL_BG};
  background-size: 140px 140px;
  border-radius: 6px;
  box-shadow:
    inset 0 0 0 1px rgba(60,80,40,0.25),
    inset 0 0 60px rgba(80,100,60,0.25);
}

/* Letter sits inside the envelope */
.gv-letter {
  position: absolute;
  left: 4%; right: 4%; top: 6%; bottom: 6%;
  background: ${PAPER};
  background-image:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4), transparent 70%),
    ${FLORAL_BG};
  background-size: auto, 110px 110px;
  background-blend-mode: overlay, normal;
  border-radius: 3px;
  box-shadow:
    inset 0 0 0 1px rgba(120,90,40,0.2),
    0 6px 18px rgba(0,0,0,0.4);
  z-index: 2;
  transform: translateY(0);
  transition: transform 1.4s cubic-bezier(0.22,1,0.36,1) 0.7s;
  display: flex; align-items: center; justify-content: center;
  padding: 18px;
  text-align: center;
}
.gv-root[data-stage="letter"] .gv-letter {
  transform: translateY(-46%);
}
.gv-letter-inner {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.8s ease 1.6s, transform 0.8s ease 1.6s;
}
.gv-root[data-stage="letter"] .gv-letter-inner {
  opacity: 1; transform: translateY(0);
}
.gv-monogram {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: ${WAX};
  font-size: 14px;
  margin-bottom: 14px;
  opacity: 0.85;
}
.gv-you-are {
  font-family: 'Great Vibes', cursive;
  font-weight: 400;
  color: ${INK};
  font-size: clamp(2.4rem, 9vw, 3.6rem);
  margin: 0;
  line-height: 1;
  letter-spacing: 0.01em;
}
.gv-flourish { margin: 10px 0 12px; opacity: 0.85; }
.gv-letter-sub {
  font-style: italic;
  color: rgba(58,36,24,0.7);
  font-size: clamp(0.85rem, 2.6vw, 1rem);
  margin: 0 0 4px;
  letter-spacing: 0.04em;
}
.gv-letter-name {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  color: ${WAX_DARK};
  font-size: clamp(1.2rem, 4.5vw, 1.6rem);
  letter-spacing: 0.18em;
  margin: 0;
}

/* Envelope front (bottom V) */
.gv-env-front {
  position: absolute; inset: 0;
  background-color: ${SAGE_DEEP};
  background-image: ${FLORAL_BG};
  background-size: 140px 140px;
  clip-path: polygon(0 35%, 100% 35%, 100% 100%, 0 100%);
  border-radius: 6px;
  z-index: 3;
  box-shadow: inset 0 6px 14px rgba(0,0,0,0.18);
}
.gv-env-front::before {
  content: ""; position: absolute; left: 0; right: 0; top: 35%;
  height: 1px; background: rgba(60,80,40,0.35);
}

/* Top flap */
.gv-env-flap {
  position: absolute; left: 0; right: 0; top: 0;
  height: 62%;
  transform-origin: 50% 0%;
  transform-style: preserve-3d;
  z-index: 4;
  transition: transform 1.2s cubic-bezier(0.6, 0, 0.4, 1);
}
.gv-env-flap-inner {
  position: absolute; inset: 0;
  background-color: ${SAGE_DEEP};
  background-image: ${FLORAL_BG};
  background-size: 140px 140px;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  border-radius: 6px;
  box-shadow: inset 0 -8px 18px rgba(0,0,0,0.25);
}
.gv-root[data-stage="opening"] .gv-env-flap,
.gv-root[data-stage="letter"]  .gv-env-flap {
  transform: rotateX(-178deg) translateY(-2px);
  z-index: 1;
}

/* Wax seal */
.gv-seal {
  position: absolute;
  left: 50%; top: 38%;
  width: 100px; height: 100px;
  transform: translate(-50%, -50%);
  z-index: 6;
  pointer-events: none;
}
.gv-seal-half {
  position: absolute; top: 0;
  width: 50px; height: 100px;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.5,0,0.4,1), opacity 0.6s ease 0.4s;
}
.gv-seal-left  { left: 0; }
.gv-seal-right { left: 50px; }
.gv-seal-half::before {
  content: "";
  position: absolute; top: 0;
  width: 100px; height: 100px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 30%, #d44a36, ${WAX} 45%, ${WAX_DARK} 100%);
  box-shadow:
    inset -6px -8px 12px rgba(0,0,0,0.4),
    inset 4px 4px 8px rgba(255,255,255,0.18),
    0 6px 14px rgba(0,0,0,0.45);
}
.gv-seal-left::before  { left: 0; }
.gv-seal-right::before { left: -50px; }
/* drip edges */
.gv-seal-half::after {
  content: "";
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 50% 50%, transparent 44px, rgba(168,54,42,0.6) 46px, transparent 50px);
}
.gv-seal-mark {
  position: absolute;
  top: 50%;
  font-family: 'Cinzel', serif;
  font-weight: 700;
  font-size: 34px;
  color: rgba(40,10,5,0.55);
  text-shadow: 0 1px 0 rgba(255,255,255,0.15);
  transform: translateY(-50%);
  z-index: 2;
}
.gv-seal-left  .gv-seal-mark { right: -4px; }
.gv-seal-right .gv-seal-mark { left: -4px; }

.gv-root[data-stage="opening"] .gv-seal-left,
.gv-root[data-stage="letter"]  .gv-seal-left {
  transform: translateX(-40px) rotate(-22deg);
  opacity: 0;
}
.gv-root[data-stage="opening"] .gv-seal-right,
.gv-root[data-stage="letter"]  .gv-seal-right {
  transform: translateX(40px) rotate(22deg);
  opacity: 0;
}

/* Tap hint */
.gv-tap-hint {
  margin-top: 32px;
  display: flex; align-items: center; gap: 10px;
  color: rgba(245,230,200,0.7);
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  animation: gv-hint-pulse 2.2s ease-in-out infinite;
}
.gv-root[data-stage="opening"] .gv-tap-hint,
.gv-root[data-stage="letter"]  .gv-tap-hint { opacity: 0; transition: opacity 0.4s ease; }
.gv-tap-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: ${WAX};
  box-shadow: 0 0 12px ${WAX};
}
@keyframes gv-hint-pulse {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}

/* DETAILS PAGE */
.gv-details {
  position: absolute; inset: 0;
  overflow-y: auto;
  display: flex; align-items: flex-start; justify-content: center;
  padding: 24px 16px 40px;
  animation: gv-details-in 0.9s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes gv-details-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.gv-paper {
  width: min(520px, 100%);
  background: ${PAPER};
  background-image:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4), transparent 70%),
    ${FLORAL_BG};
  background-size: auto, 130px 130px;
  background-blend-mode: overlay, normal;
  border-radius: 4px;
  box-shadow:
    0 30px 80px rgba(0,0,0,0.55),
    inset 0 0 0 1px rgba(120,90,40,0.18);
  padding: 36px 28px 32px;
  text-align: center;
  position: relative;
}
.gv-paper::before, .gv-paper::after {
  content: ""; position: absolute; left: 12px; right: 12px;
  height: 1px; background: rgba(58,36,24,0.18);
}
.gv-paper::before { top: 12px; }
.gv-paper::after  { bottom: 12px; }
.gv-paper-inner { position: relative; }

.gv-mono-small {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: ${WAX};
  font-size: 13px;
  margin-bottom: 18px;
}
.gv-eyebrow {
  font-style: italic;
  color: rgba(58,36,24,0.65);
  font-size: clamp(0.78rem, 2.4vw, 0.92rem);
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.gv-grand {
  font-family: 'Great Vibes', cursive;
  font-weight: 400;
  font-size: clamp(2.8rem, 11vw, 4.4rem);
  color: ${INK};
  margin: 0 0 6px;
  line-height: 1;
}
.gv-rule {
  width: 60%; height: 1px;
  margin: 12px auto;
  background: linear-gradient(90deg, transparent, ${WAX}, transparent);
}
.gv-brand {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  color: ${WAX_DARK};
  letter-spacing: 0.22em;
  font-size: clamp(1.3rem, 5vw, 1.7rem);
  margin: 0;
}
.gv-tagline {
  font-style: italic;
  color: rgba(58,36,24,0.7);
  font-size: clamp(0.85rem, 2.6vw, 1rem);
  margin: 6px 0 18px;
}

.gv-date {
  font-family: 'Cinzel', serif;
  font-weight: 500;
  font-size: clamp(1.1rem, 4.2vw, 1.4rem);
  color: ${INK};
  letter-spacing: 0.1em;
}
.gv-time {
  color: rgba(58,36,24,0.7);
  font-size: clamp(0.85rem, 2.6vw, 1rem);
  margin-top: 2px;
}

.gv-addr { margin: 16px 0 22px; line-height: 1.5; }
.gv-addr-1 {
  font-weight: 600;
  color: ${INK};
  font-size: clamp(0.95rem, 2.8vw, 1.05rem);
}
.gv-addr-2 {
  color: rgba(58,36,24,0.75);
  font-size: clamp(0.85rem, 2.6vw, 0.95rem);
  font-style: italic;
}

.gv-cats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px 6px;
  margin: 8px 0 22px;
  padding: 14px 4px;
  border-top: 1px dashed rgba(58,36,24,0.25);
  border-bottom: 1px dashed rgba(58,36,24,0.25);
}
.gv-cat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.gv-cat-icon svg { width: 28px; height: 28px; }
.gv-cat-label {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(58,36,24,0.75);
}
@media (max-width: 380px) {
  .gv-cats { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

.gv-actions {
  display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;
  margin-top: 8px;
}
.gv-btn {
  font-family: 'Cinzel', serif;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  padding: 12px 22px;
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid ${WAX_DARK};
  transition: transform 0.2s ease, background 0.2s ease;
}
.gv-btn:hover { transform: translateY(-1px); }
.gv-btn-primary { background: ${WAX}; color: ${PAPER}; }
.gv-btn-primary:hover { background: ${WAX_DARK}; }
.gv-btn-ghost { background: transparent; color: ${WAX_DARK}; }
.gv-btn-ghost:hover { background: rgba(168,54,42,0.08); }

.gv-foot {
  margin-top: 22px;
  font-style: italic;
  color: rgba(58,36,24,0.55);
  font-size: 0.85rem;
}

/* Toast */
.gv-toast {
  position: fixed; left: 50%; bottom: 30px;
  transform: translate(-50%, 80px);
  background: rgba(20,12,8,0.95);
  color: ${PAPER};
  padding: 10px 18px; border-radius: 100px;
  font-size: 0.85rem;
  font-family: 'Cormorant Garamond', serif;
  border: 1px solid rgba(255,255,255,0.1);
  opacity: 0; transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 50;
}
.gv-toast-show { transform: translate(-50%, 0); opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .gv-env-flap, .gv-letter, .gv-seal-half, .gv-letter-inner,
  .gv-scene, .gv-details { transition: none !important; animation: none !important; }
}
`;
