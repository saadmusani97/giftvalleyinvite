import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactElement, type RefObject } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GiftValley — Grand Opening Invitation" },
      {
        name: "description",
        content:
          "You are cordially invited to the Grand Opening of GiftValley — 1 July 2026, Shop No. 8, Akash Ganga Building, Naya Nagar.",
      },
      { property: "og:title", content: "GiftValley — Grand Opening" },
      {
        property: "og:description",
        content: "Where Every Gift Tells a Story. 1 July 2026.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,400&family=Italiana&family=Inter:wght@300;400;500;600&family=Great+Vibes&display=swap",
      },
    ],
  }),
  component: Invitation,
});

const NAME = "GIFTVALLEY";
const DATE_TEXT = "1 · JULY · 2026";

type Cat = { name: string; tag: string; icon: ReactElement };

const ICON_PROPS = {
  width: 56,
  height: 56,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CATEGORIES: Cat[] = [
  { name: "Gifts", tag: "01", icon: (<svg {...ICON_PROPS}><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18"/><path d="M12 9v12"/><path d="M12 9c-1.5-2-4-2.5-5-1.2C6 9 7.5 9 9 9h3z"/><path d="M12 9c1.5-2 4-2.5 5-1.2C18 9 16.5 9 15 9h-3z"/></svg>) },
  { name: "Toys", tag: "02", icon: (<svg {...ICON_PROPS}><circle cx="8" cy="6" r="1.6"/><circle cx="16" cy="6" r="1.6"/><path d="M7 8c-1.5 1.2-2 3-2 4.5C5 17 8 20 12 20s7-3 7-7.5c0-1.5-.5-3.3-2-4.5"/><circle cx="10" cy="13" r=".7"/><circle cx="14" cy="13" r=".7"/></svg>) },
  { name: "Showpieces", tag: "03", icon: (<svg {...ICON_PROPS}><path d="M9 4h6l-1 3a3 3 0 11-4 0L9 4z"/><path d="M11 10v5"/><path d="M13 10v5"/><path d="M8 15h8"/><path d="M7 20h10"/></svg>) },
  { name: "Sports", tag: "04", icon: (<svg {...ICON_PROPS}><path d="M4 20l8-8"/><path d="M10 10l5-5c1-1 3-1 4 0s1 3 0 4l-5 5"/><circle cx="18" cy="18" r="2.2"/></svg>) },
  { name: "Video Games", tag: "05", icon: (<svg {...ICON_PROPS}><path d="M6 8h12a3 3 0 013 3v4a2.5 2.5 0 01-4.5 1.5L15 14H9l-1.5 2.5A2.5 2.5 0 013 15v-4a3 3 0 013-3z"/><circle cx="9" cy="12" r=".9"/><circle cx="15" cy="12" r=".9"/></svg>) },
  { name: "RC Cars", tag: "06", icon: (<svg {...ICON_PROPS}><path d="M5 16h14l-1.5-4a2 2 0 00-2-1.4H8.5a2 2 0 00-2 1.4L5 16z"/><path d="M3 16h18"/><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/></svg>) },
  { name: "Bikes", tag: "07", icon: (<svg {...ICON_PROPS}><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8"/><path d="M10 9l2 4"/><path d="M14 6h2l-1 3"/></svg>) },
];

function Invitation() {
  const [toast, setToast] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) { await navigator.share({ title: "GiftValley Grand Opening", url }); return; }
    } catch { /* ignore */ }
    try { await navigator.clipboard.writeText(url); } catch { /* ignore */ }
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="gv">
      <style>{CSS}</style>

      <PageLoader videoRef={videoRef} onReady={() => setLoaded(true)} />

      <div className={"gv-main" + (loaded ? " gv-main--visible" : "")}>
        <Cursor />
        <Nav />
        <ProgressBar />

        <CurtainRevealAct videoRef={videoRef} videoReady={loaded} />
        <InvitedAct />
        <ScratchAct />
        <DateAct />
        <FinaleAct onShare={onShare} />

        <footer className="gv-footer">
          <div className="gv-footer-row">
            <span className="gv-mark">GV</span>
            <span>GiftValley · Est. 2026</span>
            <span>Naya Nagar</span>
          </div>
        </footer>

        <div className={"gv-toast" + (toast ? " show" : "")}>Link copied</div>
      </div>
    </div>
  );
}

/* ============== NAV / CURSOR / PROGRESS ============== */

function Nav() {
  return (
    <div className="gv-nav">
      <div className="gv-nav-mark">GV</div>
      <div className="gv-nav-meta">
        <span className="gv-dot" />
        <span>Grand Opening · 01.07.2026</span>
      </div>
    </div>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      className="gv-progress"
      style={{ scaleX: w }}
    />
  );
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <div ref={ref} className="gv-cursor" aria-hidden />;
}

/* ============== ACT 1: HERO ENVELOPE OPENS ============== */

function HeroOpening({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Three beats inside the pinned hero:
  // 0.00 - 0.18  →  envelope intro / scroll hint
  // 0.18 - 0.55  →  seal cracks, flap opens
  // 0.55 - 1.00  →  letter rises, "You are invited" reveals, transitions out
  const sealHalfL = useTransform(scrollYProgress, [0.18, 0.45], [0, -160]);
  const sealHalfR = useTransform(scrollYProgress, [0.18, 0.45], [0, 160]);
  const sealRotL = useTransform(scrollYProgress, [0.18, 0.45], [0, -38]);
  const sealRotR = useTransform(scrollYProgress, [0.18, 0.45], [0, 38]);
  const sealOpacity = useTransform(scrollYProgress, [0.18, 0.5], [1, 0]);
  const sealScale = useTransform(scrollYProgress, [0, 0.18], [0.8, 1]);

  const flapRotate = useTransform(scrollYProgress, [0.25, 0.6], [0, -178]);
  const letterY = useTransform(scrollYProgress, [0.45, 0.85], ["0%", "-46%"]);
  const letterTextOpacity = useTransform(scrollYProgress, [0.6, 0.78], [0, 1]);
  const letterTextY = useTransform(scrollYProgress, [0.6, 0.82], [24, 0]);

  const envelopeScale = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0.92, 1, 1.02, 1.08]);
  const envelopeY = useTransform(scrollYProgress, [0, 1], ["0vh", "-6vh"]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 1, 0]);
  const vignette = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);

  return (
    <section ref={ref} className="gv-hero">
      <div className="gv-hero-sticky">
        <motion.div
          className="gv-vignette"
          style={{ opacity: vignette as unknown as number }}
          aria-hidden
        />
        <FilmGrain />

        {/* Top label */}
        <div className="gv-act-label">
          <span className="gv-line" />
          <span>I.  The Invitation</span>
        </div>

        <motion.div
          className="gv-envelope-wrap"
          style={{ scale: envelopeScale, y: envelopeY }}
        >
          <div className="gv-envelope">
            {/* back */}
            <div className="gv-env-back" />

            {/* letter inside */}
            <motion.div className="gv-letter" style={{ y: letterY }}>
              <motion.div
                className="gv-letter-content"
                style={{ opacity: letterTextOpacity, y: letterTextY }}
              >
                <div className="gv-letter-mono">G · V</div>
                <h2 className="gv-script">You are invited</h2>
                <div className="gv-hairline" />
                <p className="gv-letter-sub">to a quiet unveiling of</p>
                <p className="gv-letter-brand">GiftValley</p>
              </motion.div>
            </motion.div>

            {/* front pocket */}
            <div className="gv-env-front" />

            {/* top flap */}
            <motion.div className="gv-env-flap" style={{ rotateX: flapRotate }}>
              <div className="gv-env-flap-inner" />
            </motion.div>

            {/* wax seal */}
            <motion.div
              className="gv-seal"
              style={{ opacity: sealOpacity, scale: sealScale }}
              aria-hidden
            >
              <motion.div
                className="gv-seal-half gv-seal-l"
                style={{ x: sealHalfL, rotate: sealRotL }}
              >
                <span>G</span>
              </motion.div>
              <motion.div
                className="gv-seal-half gv-seal-r"
                style={{ x: sealHalfR, rotate: sealRotR }}
              >
                <span>V</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="gv-scroll-hint" style={{ opacity: hintOpacity }}>
          <span>Scroll to open</span>
          <div className="gv-scroll-arrow" />
        </motion.div>
      </div>
      {reduce ? null : null}
    </section>
  );
}

/* ============== ACT 2: "INVITED" KINETIC TEXT ============== */

function InvitedAct() {
  const ref = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const m = () => {
      const r = rowRef.current;
      if (!r) return;
      setDist(Math.max(0, r.scrollWidth - window.innerWidth + 40));
    };
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [80, -dist]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="gv-marquee">
      <motion.div ref={rowRef} className="gv-marquee-row" style={{ x, opacity }}>
        <span className="gv-marquee-word">warmly</span>
        <span className="gv-marquee-amp">&</span>
        <span className="gv-marquee-word italic">invited</span>
        <span className="gv-marquee-amp">·</span>
        <span className="gv-marquee-word">to witness</span>
      </motion.div>
      <div className="gv-marquee-sub">
        A retail house of toys, gifts, showpieces, sports, video games, RC cars & bikes.
      </div>
    </section>
  );
}

/* ============== ACT 3: BRAND NAME REVEAL ============== */

function NameAct() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const containerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0.1, 0.6], ["0.4em", "0.08em"]);
  const scale = useTransform(scrollYProgress, [0.1, 0.6], [0.85, 1]);

  return (
    <section ref={ref} className="gv-name-act">
      <div className="gv-name-sticky">
        <motion.div className="gv-name-eye" style={{ opacity: containerOpacity }}>
          exclusive offers · 3 days only
        </motion.div>
        <motion.h2
          className="gv-name"
          style={{
            opacity: containerOpacity,
            letterSpacing: letterSpacing as unknown as string,
            scale,
          }}
        >
          {NAME.split("").map((ch, i) => {
            const start = 0.15 + i * 0.04;
            const end = start + 0.08;
            return (
              <Letter key={i} progress={scrollYProgress} start={start} end={end} ch={ch} />
            );
          })}
        </motion.h2>
        <motion.div className="gv-name-tag" style={{ opacity: containerOpacity }}>
          special deals for the first 3 days of opening
        </motion.div>
      </div>
    </section>
  );
}

function Letter({
  progress,
  start,
  end,
  ch,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  ch: string;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [40, 0]);
  const blur = useTransform(progress, [start, end], [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return (
    <motion.span style={{ opacity, y, filter }} className="gv-name-letter">
      {ch}
    </motion.span>
  );
}

/* ============== PAGE LOADER ============== */

function PageLoader({ videoRef, onReady }: { videoRef: RefObject<HTMLVideoElement | null>; onReady: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let prog = 0;
    // faster tick — jumps to 90% quickly so it feels snappy
    const tick = setInterval(() => {
      prog = Math.min(prog + Math.random() * 9 + 3, 90);
      setProgress(Math.round(prog));
    }, 80);

    const vid = videoRef.current;
    if (!vid) return () => clearInterval(tick);

    const done = () => {
      clearInterval(tick);
      setProgress(100);
      // shorter pause before exit
      setTimeout(() => {
        setExiting(true);
        setTimeout(onReady, 600);
      }, 300);
    };

    // readyState 3 = have future data, good enough to start playing
    if (vid.readyState >= 3) { done(); return () => clearInterval(tick); }

    // canplay fires as soon as browser can start — much earlier than canplaythrough
    vid.addEventListener("canplay", done, { once: true });
    // fallback cut from 12s → 4s
    const fallback = setTimeout(done, 4000);

    return () => {
      clearInterval(tick);
      clearTimeout(fallback);
      vid.removeEventListener("canplay", done);
    };
  }, [onReady, videoRef]);

  return (
    <div className={"gv-loader" + (exiting ? " gv-loader--exit" : "")}>
      <div className="gv-loader-inner">
        <div className="gv-loader-mono">GV</div>
        <p className="gv-loader-script">You are invited</p>
        <div className="gv-loader-sub">GiftValley · Grand Opening · 1 July 2026</div>
        <div className="gv-loader-bar-wrap">
          <div className="gv-loader-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ============== ACT 1: CURTAIN REVEAL ============== */

type RevealPhase = "idle" | "playing" | "paused-ribbon" | "resuming" | "done";

function CurtainRevealAct({ videoRef, videoReady }: { videoRef: RefObject<HTMLVideoElement | null>; videoReady: boolean }) {
  const [phase, setPhase] = useState<RevealPhase>("idle");
  const seekingRef = useRef(false);

  const handleTap = () => {
    const vid = videoRef.current;
    if (!vid || !videoReady || seekingRef.current) return;

    if (phase === "idle") {
      // On mobile, seek to 0 first, wait for seeked, then play
      seekingRef.current = true;
      setPhase("playing");

      const doPlay = () => {
        seekingRef.current = false;
        vid.play().catch(() => { /* autoplay blocked — already muted so shouldn't happen */ });
      };

      if (vid.currentTime === 0) {
        // Already at start — play immediately
        doPlay();
      } else {
        vid.addEventListener("seeked", doPlay, { once: true });
        vid.currentTime = 0;
      }
    } else if (phase === "paused-ribbon") {
      vid.play();
      setPhase("resuming");
    }
  };

  // Pause at exactly 3s
  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (phase === "playing" && vid.currentTime >= 4) {
      vid.pause();
      setPhase("paused-ribbon");
    }
  };

  // Video finished → crossfade to card
  const handleEnded = () => {
    setPhase("done");
  };

  const tapLabel =
    phase === "idle" ? "Tap to reveal" :
    phase === "paused-ribbon" ? "Tap to cut ribbon" :
    null;

  const showOverlay = phase === "idle" || phase === "paused-ribbon";
  const isDone = phase === "done";

  return (
    <section className="gv-curtain-section">
      <div
        className="gv-curtain-stage"
        onClick={handleTap}
        role="button"
        tabIndex={0}
        aria-label={tapLabel ?? "Grand Opening reveal"}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleTap(); }}
      >
        {/* video — always in DOM, fades out when done */}
        <video
          ref={videoRef}
          className={"gv-curtain-video" + (isDone ? " gv-curtain-video--out" : "")}
          src="/curtainsrevealingvideo.mp4"
          poster="/curtains-poster.jpg"
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />

        {/* card image — always in DOM, fades in when done */}
        <img
          src="/cardimage.png"
          alt="GiftValley Grand Opening Invitation Card"
          className={"gv-curtain-card-img" + (isDone ? " gv-curtain-card-img--in" : "")}
          aria-hidden={!isDone}
        />

        {/* glass pill scroll button — overlaid on card bottom */}
        {isDone && (
          <div className="gv-curtain-scroll-pill">
            <span>Scroll Down</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        )}

        {/* tap overlay — idle: text only; paused: blur + dim + text */}
        {showOverlay && (
          <div className={`gv-curtain-overlay${phase === "paused-ribbon" ? " gv-curtain-overlay--blur" : ""}`}>
            <div className="gv-curtain-tap-label">{tapLabel}</div>
          </div>
        )}
      </div>

    </section>
  );
}

/* ============== ACT 4 (ORIGINAL): CATEGORY HORIZONTAL SCROLL ============== */

function CategoryAct() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(d);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.12], [1, 1, 0]);

  return (
    <section ref={ref} className="gv-cats">
      <div className="gv-cats-sticky">
        <motion.div className="gv-cats-title" style={{ opacity: titleOpacity }}>
          <div className="gv-act-label dark">
            <span className="gv-line dark" />
            <span>II.  The Collection</span>
          </div>
          <h3>
            Seven worlds <em>under one roof.</em>
          </h3>
        </motion.div>
        <motion.div ref={trackRef} className="gv-cats-track" style={{ x }}>
          {CATEGORIES.map((c, i) => (
            <article key={c.name} className="gv-cat" data-i={i}>
              <div className="gv-cat-tag">{c.tag}</div>
              <div className="gv-cat-icon">{c.icon}</div>
              <h4 className="gv-cat-name">{c.name}</h4>
              <div className="gv-cat-rule" />
              <p className="gv-cat-desc">{CAT_DESC[c.name]}</p>
            </article>
          ))}
          <div className="gv-cats-end" />
        </motion.div>
      </div>
    </section>
  );
}

const CAT_DESC: Record<string, string> = {
  Gifts: "Wrapped, ribboned, ready. For birthdays, anniversaries, and quiet thank-yous.",
  Toys: "From soft plush to clever builds — joy for every small pair of hands.",
  Showpieces: "Curated objects that make a shelf feel like a story.",
  Sports: "Gear that meets you at the start line and stays the whole way.",
  "Video Games": "Worlds you fall into, controllers that feel just right.",
  "RC Cars": "Pocket horsepower. Real engineering. Outright fun.",
  Bikes: "First rides, mountain runs, weekend commutes. Pick a saddle.",
};

/* ============== SCRATCH CARD ============== */

function ScratchAct() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const [percent, setPercent] = useState(0);
  const isDrawing = useRef(false);
  const hasPopped = useRef(false);

  // Build the scratch layer once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Silver scratch surface
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0,   "#c8c8c8");
    grad.addColorStop(0.4, "#e8e8e8");
    grad.addColorStop(0.6, "#b0b0b0");
    grad.addColorStop(1,   "#d4d4d4");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Texture lines
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i < W; i += 6) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
    }

    // Hint text
    ctx.fillStyle = "rgba(80,60,40,0.55)";
    ctx.font = "bold 15px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦  Scratch to reveal your offer  ✦", W / 2, H / 2);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    e.preventDefault();
    const { x, y } = getPos(e, canvas);
    ctx.globalCompositeOperation = "destination-out";

    // Large soft brush — one swipe clears a big area
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 60);
    gradient.addColorStop(0,   "rgba(0,0,0,1)");
    gradient.addColorStop(0.6, "rgba(0,0,0,0.9)");
    gradient.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 60, 0, Math.PI * 2);
    ctx.fill();

    // Sample every 4th pixel for perf
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    const total = (canvas.width * canvas.height) / 4;
    for (let i = 3; i < data.length; i += 16) if (data[i] === 0) cleared++;
    const pct = Math.round((cleared / total) * 100);
    setPercent(pct);
  };

  const autoComplete = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx || hasPopped.current) return;
    hasPopped.current = true;

    // Animate the remaining silver away in steps
    let alpha = 1;
    const fade = () => {
      alpha -= 0.12;
      if (alpha <= 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setRevealed(true);
        return;
      }
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${0.12})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(fade);
    };
    requestAnimationFrame(fade);
  };

  const startScratch = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    setScratching(true);
    scratch(e);
  };

  const stopScratch = () => {
    isDrawing.current = false;
    setScratching(false);
    // If user lifted finger with >50% scratched, auto-complete with burst
    const canvas = canvasRef.current;
    if (canvas && percent >= 50 && !hasPopped.current) {
      autoComplete(canvas);
    }
  };

  return (
    <section className="gv-scratch-section">
      <div className="gv-scratch-eyebrow">— Special Offer —</div>
      <h3 className="gv-scratch-title">You've unlocked a special deal</h3>
      <p className="gv-scratch-sub">Scratch the card below to reveal your exclusive offer</p>

      <div className={`gv-scratch-wrap${revealed ? " gv-scratch-wrap--revealed" : ""}`}>
        {/* Reward underneath */}
        <div className="gv-scratch-reward">
          <div className="gv-scratch-badge">25% OFF</div>
          <div className="gv-scratch-reward-line">on your first purchase</div>
          <div className="gv-scratch-reward-valid">Valid for first 3 days of opening</div>
          {revealed && (
            <div className="gv-scratch-confetti" aria-hidden>
              {["✦","★","✦","★","✦","★","✦","★","✦","★","✦","★"].map((s, i) => (
                <span key={i} className="gv-scratch-star" style={{ "--i": i } as React.CSSProperties}>{s}</span>
              ))}
            </div>
          )}
        </div>

        {/* Scratch canvas on top */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className={`gv-scratch-canvas${scratching ? " gv-scratch-canvas--active" : ""}`}
            width={560}
            height={280}
            onMouseDown={startScratch}
            onMouseMove={scratch}
            onMouseUp={stopScratch}
            onMouseLeave={stopScratch}
            onTouchStart={startScratch}
            onTouchMove={scratch}
            onTouchEnd={stopScratch}
          />
        )}

        {/* Progress hint */}
        {!revealed && percent > 5 && percent <= 55 && (
          <div className="gv-scratch-progress">
            {percent < 30 ? "Keep scratching…" : "Almost there…"}
          </div>
        )}
      </div>

      {/* Scratch to unlock — pulsing pop banner below card */}
      {!revealed && (
        <div className="gv-scratch-unlock">
          <span className="gv-scratch-unlock-icon">✦</span>
          <span className="gv-scratch-unlock-text">Scratch to Unlock Offer</span>
          <span className="gv-scratch-unlock-icon">✦</span>
        </div>
      )}
    </section>
  );
}

/* ============== ACT 5: GRAND OPENING DATE ============== */

function DateAct() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yKick = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const opK = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  const dateScale = useTransform(scrollYProgress, [0.2, 0.6], [1.4, 1]);
  const dateOp = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const subOp = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);

  return (
    <section ref={ref} className="gv-date-act">
      <div className="gv-date-sticky">
        <motion.div className="gv-date-kicker" style={{ y: yKick, opacity: opK }}>
          <span className="gv-hairline-h" />
          MARK THE DAY
          <span className="gv-hairline-h" />
        </motion.div>
        <motion.h2
          className="gv-date-big"
          style={{ scale: dateScale, opacity: dateOp }}
        >
          {DATE_TEXT}
        </motion.h2>
        <motion.p className="gv-date-sub" style={{ opacity: subOp }}>
          Wednesday · opening in the evening
        </motion.p>
      </div>
    </section>
  );
}

/* ============== ACT 6: FINALE / INVITATION CARD ============== */

function FinaleAct({ onShare }: { onShare: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.5], [120, 0]);
  const op = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} className="gv-finale">
      <motion.div className="gv-card" style={{ y, opacity: op }}>
        <div className="gv-card-corner tl" />
        <div className="gv-card-corner tr" />
        <div className="gv-card-corner bl" />
        <div className="gv-card-corner br" />

        <div className="gv-card-mono">GV</div>
        <div className="gv-card-eyebrow">— Grand Opening —</div>
        <h2 className="gv-card-title">
          <span className="gv-script-lg">You're invited</span>
        </h2>
        <div className="gv-card-rule" />
        <div className="gv-card-meta">
          <div>
            <div className="gv-meta-k">DATE</div>
            <div className="gv-meta-v">1 July 2026</div>
          </div>
          <div>
            <div className="gv-meta-k">TIME</div>
            <div className="gv-meta-v">Evening</div>
          </div>
          <div>
            <div className="gv-meta-k">DAY</div>
            <div className="gv-meta-v">Wednesday</div>
          </div>
        </div>
        <div className="gv-card-rule" />
        <div className="gv-card-addr">
          <div className="gv-addr-line strong">GiftValley · Shop No. 8</div>
          <div className="gv-addr-line">Akash Ganga Building, Naya Nagar</div>
        </div>

        <div className="gv-card-actions">
          <a
            className="gv-btn primary"
            href="https://maps.google.com/?q=Akash+Ganga+Building+Naya+Nagar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
            <Arrow />
          </a>
          <button className="gv-btn ghost" onClick={onShare}>
            Share Invite
            <Arrow />
          </button>
        </div>
        <div className="gv-card-foot">With warmest regards · The GiftValley Family</div>
      </motion.div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function FilmGrain() {
  return <div className="gv-grain" aria-hidden />;
}

/* ============== STYLES ============== */

const INK = "#0E0B08";
const PAPER = "#EDE6D6";
const WAX = "#A8362A";
const WAX_DEEP = "#6E2014";
const SAGE = "#B6C29B";
const SAGE_DEEP = "#7E9067";
const GOLD = "#C9A24E";

const FLORAL = (color: string) =>
  "url(\"data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
       <g fill='none' stroke='${color}' stroke-width='0.6' opacity='0.45'>
         <circle cx='100' cy='100' r='44'/>
         <circle cx='100' cy='100' r='28'/>
         <circle cx='100' cy='100' r='14'/>
         <circle cx='100' cy='100' r='4' fill='${color}' opacity='0.6'/>
         <path d='M100 20 Q112 56 100 80 Q88 56 100 20Z' fill='${color}' opacity='0.35'/>
         <path d='M100 180 Q112 144 100 120 Q88 144 100 180Z' fill='${color}' opacity='0.35'/>
         <path d='M20 100 Q56 112 80 100 Q56 88 20 100Z' fill='${color}' opacity='0.35'/>
         <path d='M180 100 Q144 112 120 100 Q144 88 180 100Z' fill='${color}' opacity='0.35'/>
         <path d='M44 44 Q74 74 90 90'/>
         <path d='M156 44 Q126 74 110 90'/>
         <path d='M44 156 Q74 126 90 110'/>
         <path d='M156 156 Q126 126 110 110'/>
       </g>
     </svg>`
  ) +
  "\")";

const CSS = `
:root {
  --ink: ${INK};
  --paper: ${PAPER};
  --wax: ${WAX};
  --wax-deep: ${WAX_DEEP};
  --sage: ${SAGE};
  --sage-deep: ${SAGE_DEEP};
  --gold: ${GOLD};
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { background: ${INK}; }

html, body { overflow-x: clip; }
.gv {
  background: ${INK};
  color: ${PAPER};
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
  cursor: none;
}
@media (max-width: 768px) { .gv { cursor: auto; } .gv-cursor { display: none; } }

.gv-cursor {
  position: fixed; top: 0; left: 0; width: 24px; height: 24px;
  border-radius: 50%; pointer-events: none; z-index: 100;
  border: 1px solid ${PAPER};
  mix-blend-mode: difference;
  will-change: transform;
}

.gv-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  display: flex; justify-content: space-between; align-items: center;
  padding: 22px 32px;
  font-family: 'Fraunces', serif;
  pointer-events: none;
}
.gv-nav-mark {
  font-weight: 700; letter-spacing: 0.2em;
  font-size: 14px;
  color: ${PAPER};
}
.gv-nav-meta {
  display: flex; align-items: center; gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(237,230,214,0.55);
}
.gv-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: ${WAX};
  box-shadow: 0 0 10px ${WAX};
  animation: gv-pulse 2s ease-in-out infinite;
}
@keyframes gv-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

.gv-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, ${WAX}, ${GOLD});
  transform-origin: 0%;
  z-index: 60;
}

.gv-act-label {
  position: absolute; top: 90px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
  color: rgba(237,230,214,0.55);
  z-index: 5;
}
.gv-act-label.dark { color: rgba(14,11,8,0.55); }
.gv-line { display: inline-block; width: 40px; height: 1px; background: rgba(237,230,214,0.4); }
.gv-line.dark { background: rgba(14,11,8,0.35); }

/* ====== HERO ENVELOPE ====== */
.gv-hero { position: relative; height: 400vh; background: ${INK}; }
.gv-hero-sticky {
  position: sticky; top: 0;
  width: 100vw; height: 100vh;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 50%, #1a130c 0%, #0b0805 70%, #050302 100%);
}
.gv-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.9) 100%);
  pointer-events: none;
}

.gv-grain {
  position: absolute; inset: -50%;
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.08;
  mix-blend-mode: overlay;
  pointer-events: none;
  animation: gv-grain 0.4s steps(3) infinite;
}
@keyframes gv-grain {
  0% { transform: translate(0,0); }
  33% { transform: translate(-2%, 1%); }
  66% { transform: translate(1%, -2%); }
  100% { transform: translate(0,0); }
}

.gv-envelope-wrap {
  perspective: 1800px;
  filter: drop-shadow(0 50px 80px rgba(0,0,0,0.7));
}
.gv-envelope {
  position: relative;
  width: min(420px, 80vw);
  aspect-ratio: 3 / 4.4;
  transform-style: preserve-3d;
}
.gv-env-back {
  position: absolute; inset: 0;
  background-color: ${SAGE};
  background-image: ${FLORAL(SAGE_DEEP)};
  background-size: 180px 180px;
  border-radius: 4px;
  box-shadow:
    inset 0 0 0 1px rgba(50,70,30,0.3),
    inset 0 0 80px rgba(50,70,30,0.25);
}
.gv-letter {
  position: absolute;
  left: 5%; right: 5%; top: 7%; bottom: 7%;
  background: ${PAPER};
  background-image:
    radial-gradient(circle at 50% 40%, rgba(255,255,255,0.4), transparent 70%),
    ${FLORAL(SAGE_DEEP)};
  background-size: auto, 130px 130px;
  background-blend-mode: overlay, normal;
  border-radius: 2px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(100,80,40,0.2);
  z-index: 2;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  text-align: center;
  color: ${INK};
}
.gv-letter-content { width: 100%; }
.gv-letter-mono {
  font-family: 'Fraunces', serif; font-weight: 700;
  letter-spacing: 0.35em; color: ${WAX}; font-size: 13px;
  margin-bottom: 18px;
}
.gv-script {
  font-family: 'Great Vibes', cursive; font-weight: 400;
  font-size: clamp(2.6rem, 9vw, 3.8rem);
  margin: 0; line-height: 1; color: ${INK};
}
.gv-hairline {
  width: 60%; height: 1px; margin: 14px auto;
  background: linear-gradient(90deg, transparent, ${WAX}, transparent);
}
.gv-letter-sub {
  font-family: 'Fraunces', serif; font-style: italic;
  color: rgba(14,11,8,0.65); margin: 0 0 4px;
  font-size: clamp(0.85rem, 2.6vw, 1rem);
}
.gv-letter-brand {
  font-family: 'Fraunces', serif; font-weight: 700;
  letter-spacing: 0.18em;
  color: ${WAX_DEEP};
  font-size: clamp(1.1rem, 4vw, 1.4rem);
  margin: 0;
}
.gv-env-front {
  position: absolute; inset: 0;
  background-color: ${SAGE_DEEP};
  background-image: ${FLORAL(INK)};
  background-size: 180px 180px;
  clip-path: polygon(0 38%, 100% 38%, 100% 100%, 0 100%);
  border-radius: 4px;
  z-index: 3;
  box-shadow: inset 0 8px 18px rgba(0,0,0,0.3);
}
.gv-env-flap {
  position: absolute; left: 0; right: 0; top: 0;
  height: 62%;
  transform-origin: 50% 0%;
  transform-style: preserve-3d;
  z-index: 4;
}
.gv-env-flap-inner {
  position: absolute; inset: 0;
  background-color: ${SAGE_DEEP};
  background-image: ${FLORAL(INK)};
  background-size: 180px 180px;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  border-radius: 4px;
  box-shadow: inset 0 -10px 18px rgba(0,0,0,0.3);
  backface-visibility: hidden;
}

.gv-seal {
  position: absolute;
  left: 50%; top: 38%;
  width: 110px; height: 110px;
  transform: translate(-50%, -50%);
  z-index: 6; pointer-events: none;
  display: flex;
  margin-left: 0;
}.gv-seal-half {
  position: relative;
  width: 55px; height: 110px;
  overflow: hidden;
  font-family: 'Fraunces', serif;
  font-weight: 900; font-size: 38px;
  display: flex; align-items: center;
  color: rgba(40,8,4,0.55);
}
.gv-seal-half::before {
  content: ""; position: absolute; top: 0;
  width: 110px; height: 110px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 30%, #d24a36 0%, ${WAX} 45%, ${WAX_DEEP} 100%);
  box-shadow:
    inset -8px -10px 16px rgba(0,0,0,0.4),
    inset 6px 6px 10px rgba(255,255,255,0.2),
    0 8px 18px rgba(0,0,0,0.5);
}
.gv-seal-half::after {
  content: ""; position: absolute; top: 0;
  width: 110px; height: 110px;
  background:
    radial-gradient(circle at 50% 50%, transparent 48px, rgba(168,54,42,0.5) 52px, transparent 56px);
}
.gv-seal-l::before { left: 0; }
.gv-seal-r::before { left: -55px; }
.gv-seal-l { justify-content: flex-end; padding-right: 0; }
.gv-seal-r { justify-content: flex-start; padding-left: 0; }
.gv-seal-half span { position: relative; z-index: 2; }

.gv-scroll-hint {
  position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
  color: rgba(237,230,214,0.5);
}
.gv-scroll-arrow {
  width: 1px; height: 40px;
  background: linear-gradient(180deg, transparent, ${PAPER});
  animation: gv-arrow 1.6s ease-in-out infinite;
}
@keyframes gv-arrow {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* ====== ACT 2 MARQUEE ====== */
.gv-marquee {
  position: relative;
  height: 80vh;
  padding: 6vh 0 4vh;
  background: ${INK};
  overflow: hidden;
}
.gv-marquee--static {
  height: auto !important;
  padding: 60px 20px 40px !important;
  display: flex; flex-direction: column; align-items: center;
  text-align: center; gap: 8px;
  overflow: visible !important;
}
.gv-marquee-static-row {
  display: flex; align-items: center; justify-content: center; gap: 18px;
  font-family: 'Fraunces', serif; font-weight: 500; line-height: 1;
  font-size: clamp(3rem, 14vw, 5rem);
  color: ${PAPER};
  white-space: nowrap;
}
.gv-marquee-row {
  display: flex; align-items: center; gap: 60px;
  font-family: 'Fraunces', serif;
  font-size: clamp(4rem, 14vw, 11rem);
  font-weight: 500;
  line-height: 0.9;
  white-space: nowrap;
  color: ${PAPER};
}
.gv-marquee-word.italic { font-style: italic; font-weight: 400; color: ${GOLD}; }
.gv-marquee-amp {
  font-family: 'Italiana', serif;
  font-size: 0.5em;
  color: ${WAX};
  opacity: 0.7;
}
.gv-marquee-sub {
  margin-top: 60px;
  text-align: center;
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: clamp(0.95rem, 2.4vw, 1.2rem);
  color: rgba(237,230,214,0.55);
  max-width: 720px; margin-left: auto; margin-right: auto;
  padding: 0 20px;
}

/* ====== ACT 3 NAME ====== */
.gv-name-act {
  position: relative;
  height: 100vh;
  background: ${INK};
}
.gv-name-sticky {
  position: sticky; top: 0;
  height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center;
  background:
    radial-gradient(ellipse at center, #1a120a 0%, ${INK} 70%);
}
.gv-name-eye {
  font-family: 'Inter', sans-serif;
  font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase;
  color: rgba(237,230,214,0.5);
  margin-bottom: 32px;
}
.gv-name {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 11vw, 9rem);
  line-height: 1;
  color: ${PAPER};
  margin: 0;
  display: flex;
  background: linear-gradient(180deg, ${PAPER} 0%, ${GOLD} 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.gv-name-letter { display: inline-block; }
.gv-name-tag {
  margin-top: 28px;
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: clamp(0.95rem, 2.6vw, 1.2rem);
  color: rgba(237,230,214,0.6);
  letter-spacing: 0.05em;
}

/* ====== PAGE LOADER ====== */
.gv-loader {
  position: fixed; inset: 0; z-index: 9999;
  background: ${INK};
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.5s ease;
}
.gv-loader--exit {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
.gv-loader-inner {
  display: flex; flex-direction: column; align-items: center;
  gap: 18px; text-align: center; padding: 0 32px;
}
.gv-loader-mono {
  width: 72px; height: 72px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Fraunces', serif; font-weight: 700; font-size: 22px;
  letter-spacing: 0.06em; color: #f5e6cf;
  background: radial-gradient(circle at 35% 30%, #d24a36 0%, ${WAX} 50%, ${WAX_DEEP} 100%);
  box-shadow: 0 8px 24px rgba(0,0,0,0.5), 0 0 60px rgba(168,54,42,0.25);
  margin-bottom: 8px;
  animation: gv-loader-glow 2.4s ease-in-out infinite;
}
@keyframes gv-loader-glow {
  0%,100% { box-shadow: 0 8px 24px rgba(0,0,0,0.5), 0 0 40px rgba(168,54,42,0.2); }
  50%      { box-shadow: 0 8px 24px rgba(0,0,0,0.5), 0 0 80px rgba(168,54,42,0.45); }
}
.gv-loader-script {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(3rem, 12vw, 5.5rem);
  font-weight: 400; line-height: 1.2;
  color: ${PAPER};
  margin: 0;
  padding-bottom: 0.15em;
  overflow: visible;
  animation: gv-tap-breathe 3s ease-in-out infinite;
}
.gv-loader-sub {
  font-family: 'Inter', sans-serif;
  font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
  color: rgba(237,230,214,0.45);
  margin-top: 4px;
}
.gv-loader-bar-wrap {
  width: min(240px, 60vw); height: 1px;
  background: rgba(237,230,214,0.12);
  margin-top: 20px; overflow: hidden;
}
.gv-loader-bar {
  height: 100%;
  background: linear-gradient(90deg, ${WAX}, ${GOLD});
  transition: width 0.3s ease;
}

/* ====== MAIN CONTENT FADE-IN ====== */
.gv-main {
  opacity: 0;
  transition: opacity 0.6s ease 0.1s;
}
.gv-main--visible { opacity: 1; }

/* ====== ACT 4 CURTAIN REVEAL ====== */
.gv-curtain-section {
  position: relative;
  background: ${INK};
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 80px 20px 60px;
}

/* stacked stage — video + image sit on top of each other */
.gv-curtain-stage {
  position: relative;
  width: min(520px, 92vw);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 40px 90px rgba(0,0,0,0.7);
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  /* establish stacking context */
  isolation: isolate;
}

.gv-curtain-video {
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
  position: relative;
  z-index: 1;
  transition: opacity 0.7s ease;
  opacity: 1;
}
.gv-curtain-video--out {
  opacity: 0;
}

/* card image sits underneath, fades in */
.gv-curtain-card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.7s ease 0.2s;
  pointer-events: none;
}
.gv-curtain-card-img--in {
  opacity: 1;
  pointer-events: auto;
}

.gv-curtain-overlay {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 20px;
  z-index: 2;
  pointer-events: none;
  transition: background 0.3s ease;
}
.gv-curtain-overlay--blur {
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.gv-curtain-tap-label {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: clamp(1.1rem, 4vw, 1.5rem);
  color: ${PAPER};
  letter-spacing: 0.06em;
  text-align: center;
  text-shadow: 0 2px 12px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6);
  animation: gv-tap-breathe 2.4s ease-in-out infinite;
}
@keyframes gv-tap-breathe {
  0%,100% { opacity: 1; }
  50%      { opacity: 0.55; }
}

/* glass pill scroll button — absolute on card image bottom */
.gv-curtain-scroll-pill {
  position: absolute;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex; align-items: center; gap: 8px;
  padding: 10px 28px;
  border-radius: 999px;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.35);
  box-shadow:
    0 4px 24px rgba(0,0,0,0.18),
    inset 0 1px 0 rgba(255,255,255,0.5),
    inset 0 -1px 0 rgba(0,0,0,0.08);
  color: #111;
  font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  pointer-events: none;
  animation: gv-hint-fadein 0.8s ease both, gv-pill-bob 2s ease-in-out 0.8s infinite;
}
@keyframes gv-pill-bob {
  0%,100% { transform: translateX(-50%) translateY(0); }
  50%      { transform: translateX(-50%) translateY(-5px); }
}

/* ====== ACT 4 CATEGORIES (HIDDEN / TEMPORARY) ====== */
.gv-cats {
  position: relative;
  height: 350vh;
  background: ${PAPER};
  color: ${INK};
}
.gv-cats-sticky {
  position: sticky; top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex; flex-direction: column;
  justify-content: center;
  background:
    linear-gradient(180deg, ${PAPER} 0%, #e3dac7 100%);
}
.gv-cats-title {
  position: absolute; top: 0; left: 0; right: 0;
  padding: 90px 32px 0;
  text-align: center;
  pointer-events: none;
}
.gv-cats-title h3 {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: clamp(2rem, 6vw, 4rem);
  margin: 60px 0 0;
  color: ${INK};
  line-height: 1.05;
}
.gv-cats-title em { font-style: italic; color: ${WAX_DEEP}; font-weight: 400; }
.gv-cats-track {
  display: flex; align-items: center; gap: 32px;
  padding: 0 8vw;
  will-change: transform;
}
.gv-cat {
  flex: 0 0 380px;
  height: 60vh; max-height: 540px;
  background: ${PAPER};
  border: 1px solid rgba(14,11,8,0.12);
  padding: 36px 28px;
  display: flex; flex-direction: column;
  position: relative;
  color: ${INK};
  box-shadow: 0 30px 60px -30px rgba(0,0,0,0.2);
}
.gv-cat::before {
  content: ""; position: absolute; inset: 8px;
  border: 1px solid rgba(14,11,8,0.08);
  pointer-events: none;
}
.gv-cat-tag {
  font-family: 'Fraunces', serif; font-weight: 700;
  font-size: 12px; letter-spacing: 0.25em;
  color: ${WAX};
}
.gv-cat-icon {
  margin: 28px 0;
  color: ${INK};
  display: flex; justify-content: center;
  flex: 1; align-items: center;
}
.gv-cat-icon svg { width: 72px; height: 72px; stroke-width: 1; }
.gv-cat-name {
  font-family: 'Fraunces', serif; font-weight: 500;
  font-size: 32px;
  margin: 0;
  letter-spacing: -0.01em;
}
.gv-cat-rule {
  height: 1px; width: 40px; background: ${WAX};
  margin: 14px 0;
}
.gv-cat-desc {
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: 15px; line-height: 1.5;
  color: rgba(14,11,8,0.65);
  margin: 0;
}
.gv-cats-end { flex: 0 0 8vw; }
@media (max-width: 768px) {
  .gv-cat { flex: 0 0 82vw; height: auto; min-height: 460px; max-height: none; padding: 26px 22px; }
  .gv-cats-track { gap: 16px; padding: 0 9vw; }
  .gv-cats-title { padding: 80px 20px 0; }
  .gv-cats-title h3 { margin-top: 20px; font-size: clamp(1.6rem, 7vw, 2.2rem); }
  .gv-cats { height: 500vh; }
  .gv-cat-name { font-size: 26px; }
  .gv-cat-icon svg { width: 56px; height: 56px; }
}

/* ====== SCRATCH CARD ====== */
.gv-scratch-section {
  background: ${INK};
  padding: 40px 20px 100px;
  display: flex; flex-direction: column; align-items: center;
  text-align: center;
}
.gv-scratch-eyebrow {
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: 13px; letter-spacing: 0.12em;
  color: rgba(237,230,214,0.5);
  margin-bottom: 16px;
}
.gv-scratch-title {
  font-family: 'Fraunces', serif; font-weight: 500;
  font-size: clamp(1.6rem, 5vw, 2.8rem);
  color: ${PAPER}; margin: 0 0 12px;
  line-height: 1.1;
}
.gv-scratch-sub {
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: clamp(0.9rem, 2.5vw, 1.05rem);
  color: rgba(237,230,214,0.5);
  margin: 0 0 40px;
}
.gv-scratch-wrap {
  position: relative;
  width: min(560px, 92vw);
  border-radius: 6px;
  overflow: visible;
  box-shadow: 0 30px 70px rgba(0,0,0,0.55);
}
.gv-scratch-reward {
  width: 100%; height: 280px;
  background: ${PAPER};
  background-image: radial-gradient(circle at 50% 40%, rgba(255,255,255,0.5), transparent 70%);
  border-radius: 6px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
}
.gv-scratch-badge {
  font-family: 'Fraunces', serif; font-weight: 900;
  font-size: clamp(3rem, 14vw, 5.5rem);
  color: ${WAX};
  line-height: 1;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 20px rgba(168,54,42,0.3);
}
.gv-scratch-reward-line {
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: clamp(1rem, 3.5vw, 1.3rem);
  color: ${INK};
}
.gv-scratch-reward-valid {
  font-family: 'Inter', sans-serif;
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(14,11,8,0.5);
}
.gv-scratch-reward-code {
  margin-top: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 13px; letter-spacing: 0.25em; text-transform: uppercase;
  color: ${INK};
  background: rgba(168,54,42,0.12);
  padding: 6px 18px; border-radius: 2px;
  border: 1px dashed ${WAX};
}
.gv-scratch-canvas {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  border-radius: 6px;
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='12' fill='rgba(200,200,200,0.7)' stroke='white' stroke-width='2'/></svg>") 16 16, crosshair;
  touch-action: none;
}
.gv-scratch-canvas--active { cursor: none; }
.gv-scratch-progress {
  position: absolute; bottom: -32px; left: 50%;
  transform: translateX(-50%);
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: 13px; color: rgba(237,230,214,0.5);
  white-space: nowrap;
  animation: gv-tap-breathe 1.5s ease-in-out infinite;
}
/* pop animation on full reveal */
.gv-scratch-wrap--revealed .gv-scratch-badge {
  animation: gv-scratch-pop 0.6s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes gv-scratch-pop {
  0%   { transform: scale(0.3) rotate(-8deg); opacity: 0; }
  60%  { transform: scale(1.18) rotate(3deg); }
  80%  { transform: scale(0.95) rotate(-1deg); }
  100% { transform: scale(1) rotate(0deg);  opacity: 1; }
}
/* confetti stars */
.gv-scratch-confetti {
  position: absolute; inset: 0;
  pointer-events: none;
  overflow: visible;
}
.gv-scratch-star {
  position: absolute;
  font-size: clamp(16px, 4vw, 26px);
  color: ${GOLD};
  animation: gv-star-burst 1.6s cubic-bezier(0.22,1,0.36,1) both;
  animation-delay: calc(var(--i) * 0.05s);
  left: calc(4% + var(--i) * 8.5%);
  top: 50%;
}
@keyframes gv-star-burst {
  0%   { opacity: 0;   transform: translateY(0)     scale(0)   rotate(0deg); }
  30%  { opacity: 1;   transform: translateY(-40px)  scale(1.6) rotate(40deg); }
  60%  { opacity: 0.9; transform: translateY(-90px)  scale(1.2) rotate(80deg); }
  100% { opacity: 0;   transform: translateY(-150px) scale(0.6) rotate(120deg); }
}
@media (max-width: 768px) {
  .gv-scratch-section { padding: 60px 16px 80px; }
  .gv-scratch-reward  { height: 240px; }
}

/* scratch unlock banner */
.gv-scratch-unlock {
  display: flex; align-items: center; justify-content: center; gap: 14px;
  margin-top: 36px;
  padding: 18px 36px;
  border-radius: 999px;
  background: linear-gradient(135deg, ${WAX} 0%, ${WAX_DEEP} 100%);
  box-shadow: 0 8px 32px rgba(168,54,42,0.45), 0 0 0 0 rgba(168,54,42,0.4);
  animation: gv-unlock-pop 1.6s cubic-bezier(0.36,0.07,0.19,0.97) infinite;
  cursor: default;
}
.gv-scratch-unlock-text {
  font-family: 'Fraunces', serif; font-weight: 700;
  font-size: clamp(1rem, 4.5vw, 1.5rem);
  letter-spacing: 0.08em; text-transform: uppercase;
  color: ${PAPER};
  white-space: nowrap;
}
.gv-scratch-unlock-icon {
  font-size: clamp(0.9rem, 3vw, 1.2rem);
  color: ${GOLD};
  animation: gv-star-spin 3s linear infinite;
}
.gv-scratch-unlock-icon:last-child {
  animation-direction: reverse;
}
@keyframes gv-unlock-pop {
  0%   { transform: scale(1);    box-shadow: 0 8px 32px rgba(168,54,42,0.45), 0 0 0 0 rgba(168,54,42,0.5); }
  40%  { transform: scale(1.06); box-shadow: 0 12px 40px rgba(168,54,42,0.55), 0 0 0 14px rgba(168,54,42,0); }
  60%  { transform: scale(0.97); }
  100% { transform: scale(1);    box-shadow: 0 8px 32px rgba(168,54,42,0.45), 0 0 0 0 rgba(168,54,42,0); }
}
@keyframes gv-star-spin {
  0%   { transform: rotate(0deg)   scale(1); }
  50%  { transform: rotate(180deg) scale(1.3); }
  100% { transform: rotate(360deg) scale(1); }
}

/* ====== ACT 5 DATE ====== */
.gv-date-act {
  position: relative;
  height: 200vh;
  background: ${INK};
}
.gv-date-sticky {
  position: sticky; top: 0;
  height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center;
  background:
    radial-gradient(ellipse at center, rgba(168,54,42,0.18) 0%, ${INK} 60%);
}
.gv-date-kicker {
  display: flex; align-items: center; gap: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase;
  color: ${GOLD};
  margin-bottom: 40px;
}
.gv-hairline-h { width: 60px; height: 1px; background: ${GOLD}; opacity: 0.6; }
.gv-date-big {
  font-family: 'Italiana', serif;
  font-weight: 400;
  font-size: clamp(2.6rem, 11vw, 9rem);
  line-height: 1;
  margin: 0;
  color: ${PAPER};
  letter-spacing: 0.05em;
}
.gv-date-sub {
  margin-top: 32px;
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: clamp(0.95rem, 2.6vw, 1.2rem);
  color: rgba(237,230,214,0.65);
}

/* ====== ACT 6 FINALE CARD ====== */
.gv-finale {
  min-height: 110vh;
  background: linear-gradient(180deg, ${INK} 0%, #1a120a 100%);
  display: flex; align-items: center; justify-content: center;
  padding: 80px 20px;
  position: relative;
}
.gv-card {
  position: relative;
  width: min(540px, 100%);
  background: ${PAPER};
  background-image:
    radial-gradient(circle at 50% 30%, rgba(255,255,255,0.5), transparent 70%),
    ${FLORAL(SAGE_DEEP)};
  background-size: auto, 160px 160px;
  background-blend-mode: overlay, normal;
  padding: 48px 36px 36px;
  color: ${INK};
  text-align: center;
  box-shadow: 0 40px 100px rgba(0,0,0,0.6);
}
.gv-card-corner {
  position: absolute; width: 18px; height: 18px;
  border: 1px solid ${WAX};
}
.gv-card-corner.tl { top: 14px; left: 14px; border-right: 0; border-bottom: 0; }
.gv-card-corner.tr { top: 14px; right: 14px; border-left: 0; border-bottom: 0; }
.gv-card-corner.bl { bottom: 14px; left: 14px; border-right: 0; border-top: 0; }
.gv-card-corner.br { bottom: 14px; right: 14px; border-left: 0; border-top: 0; }
.gv-card-mono {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.05em;
  color: #f5e6cf;
  background:
    radial-gradient(circle at 35% 30%, #d24a36 0%, ${WAX} 50%, ${WAX_DEEP} 100%);
  box-shadow:
    0 8px 20px rgba(0,0,0,0.45),
    inset 0 0 0 2px rgba(255,255,255,0.18),
    inset 0 -6px 12px rgba(0,0,0,0.35);
  z-index: 3;
}
.gv-card-eyebrow {
  margin-top: 28px;
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: 13px; letter-spacing: 0.1em;
  color: rgba(14,11,8,0.55);
}
.gv-card-title { margin: 6px 0 0; }
.gv-script-lg {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(2.8rem, 10vw, 4.4rem);
  font-weight: 400;
  color: ${INK};
  line-height: 1;
}
.gv-card-rule {
  height: 1px; margin: 22px auto;
  width: 80%;
  background: linear-gradient(90deg, transparent, ${WAX}, transparent);
}
.gv-card-meta {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 4px 0;
}
.gv-meta-k {
  font-family: 'Inter', sans-serif;
  font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
  color: ${WAX}; opacity: 0.8;
  margin-bottom: 6px;
}
.gv-meta-v {
  font-family: 'Fraunces', serif; font-weight: 500;
  font-size: clamp(1rem, 3vw, 1.15rem);
  color: ${INK};
}
.gv-card-addr { margin: 4px 0 4px; }
.gv-addr-line {
  font-family: 'Fraunces', serif;
  font-size: 14px;
  color: rgba(14,11,8,0.75);
  line-height: 1.6;
}
.gv-addr-line.strong { font-weight: 600; color: ${INK}; font-size: 15px; }
.gv-card-actions {
  display: flex; gap: 10px; justify-content: center;
  margin-top: 24px; flex-wrap: wrap;
}
.gv-btn {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
  padding: 14px 24px;
  border-radius: 0;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid ${WAX_DEEP};
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.gv-btn:hover { transform: translateY(-1px); }
.gv-btn.primary { background: ${WAX}; color: ${PAPER}; }
.gv-btn.primary:hover { background: ${WAX_DEEP}; }
.gv-btn.ghost { background: transparent; color: ${WAX_DEEP}; }
.gv-btn.ghost:hover { background: rgba(168,54,42,0.08); }
.gv-card-foot {
  margin-top: 22px;
  font-family: 'Fraunces', serif; font-style: italic;
  font-size: 12px;
  color: rgba(14,11,8,0.5);
}

/* footer */
.gv-footer {
  padding: 40px 24px;
  background: ${INK};
  border-top: 1px solid rgba(237,230,214,0.08);
}
.gv-footer-row {
  display: flex; justify-content: space-between; align-items: center;
  max-width: 1200px; margin: 0 auto;
  font-family: 'Inter', sans-serif;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(237,230,214,0.45);
  gap: 16px; flex-wrap: wrap;
}
.gv-mark {
  font-family: 'Fraunces', serif; font-weight: 700;
  color: ${PAPER};
}

.gv-toast {
  position: fixed; left: 50%; bottom: 30px;
  transform: translate(-50%, 80px);
  background: ${PAPER}; color: ${INK};
  padding: 12px 22px;
  font-family: 'Inter', sans-serif;
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 200;
}
.gv-toast.show { transform: translate(-50%, 0); opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .gv-grain, .gv-scroll-arrow, .gv-dot { animation: none !important; }
}

@media (max-width: 768px) {
  .gv-nav { padding: 14px 18px; }
  .gv-nav-mark { font-size: 12px; }
  .gv-nav-meta { font-size: 9px; letter-spacing: 0.16em; gap: 6px; }
  .gv-act-label { top: 56px; font-size: 9px; letter-spacing: 0.22em; gap: 10px; }
  .gv-line, .gv-line.dark { width: 24px; }

  .gv-hero { height: 320vh; }
  .gv-envelope { width: 78vw; }
  .gv-letter { padding: 18px 16px; }
  .gv-seal { width: 92px; height: 92px; top: 38%; }
  .gv-seal-half { width: 46px; height: 92px; font-size: 32px; }
  .gv-seal-half::before, .gv-seal-half::after { width: 92px; height: 92px; }
  .gv-seal-r::before { left: -46px; }
  .gv-scroll-hint { bottom: 22px; font-size: 9px; letter-spacing: 0.24em; }
  .gv-scroll-arrow { height: 28px; }

  .gv-marquee { padding: 4vh 0 3vh; height: 80vh; position: relative; }
  .gv-marquee-row { gap: 20px; font-size: clamp(2rem, 9vw, 3.2rem); }
  .gv-marquee-sub { margin-top: 36px; padding: 0 24px; font-size: 0.95rem; }

  .gv-name-act { height: 100vh; }
  .gv-name { font-size: clamp(2.2rem, 14vw, 4rem); }
  .gv-name-eye { font-size: 10px; letter-spacing: 0.32em; margin-bottom: 22px; }
  .gv-name-tag { margin-top: 22px; font-size: 1rem; padding: 0 24px; }

  .gv-date-act { height: 170vh; }
  .gv-date-big { font-size: clamp(2.4rem, 14vw, 5rem); }
  .gv-date-kicker { font-size: 10px; letter-spacing: 0.32em; gap: 12px; margin-bottom: 28px; }
  .gv-hairline-h { width: 36px; }
  .gv-date-sub { margin-top: 22px; font-size: 0.95rem; padding: 0 24px; }

  .gv-finale { padding: 60px 16px; }
  .gv-card { padding: 38px 22px 28px; }
  .gv-card-meta { gap: 8px; }
  .gv-meta-k { font-size: 9px; letter-spacing: 0.18em; }
  .gv-card-actions { gap: 8px; flex-direction: column; }
  .gv-btn { width: 100%; justify-content: center; padding: 14px 18px; }
  .gv-footer-row { flex-direction: column; gap: 8px; text-align: center; font-size: 10px; }
}

@media (max-width: 380px) {
  .gv-envelope { width: 84vw; }
  .gv-marquee-row { font-size: clamp(2rem, 9vw, 3rem); gap: 20px; }
  .gv-card { padding: 32px 18px 24px; }
}
`;
