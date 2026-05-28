import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import upliftImg from "@/assets/moodies-uplift.jpg";
import calmImg from "@/assets/moodies-combo.jpg";
import balanceImg from "@/assets/moodies-trio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moodies | Taste Your Mood" },
      { name: "description", content: "Scroll through a sensory journey of Uplift, Calm and Balance — premium wellness edibles by Moodies." },
      { property: "og:title", content: "Moodies | Taste Your Mood" },
      { property: "og:description", content: "A scroll-driven story of mood, designed in three chapters." },
      { property: "og:url", content: "https://www.moodies.site/" },
      { property: "og:image", content: "https://www.moodies.site/og-image.jpg" },
      { name: "twitter:title", content: "Moodies | Taste Your Mood" },
      { name: "twitter:description", content: "A scroll-driven story of mood, designed in three chapters." },
      { name: "twitter:image", content: "https://www.moodies.site/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.moodies.site/" }],
  }),
  component: StoryPage,
});

type Chapter = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  accent: [number, number, number]; // 0..1
  bg: string;
  image?: string;
};

const CHAPTERS: Chapter[] = [
  {
    id: "hero",
    eyebrow: "Moodies",
    title: "Taste Your Mood",
    body: "A three-chapter story of wellness, designed for the way you actually feel.",
    accent: [0.95, 0.95, 0.95],
    bg: "#0a0a0a",
  },
  {
    id: "uplift",
    eyebrow: "Chapter I",
    title: "Uplift",
    body: "Morning clarity. Creative spark. The first warm light against the wall — bottled into a citrus-bright ritual.",
    accent: [1.0, 0.82, 0.12],
    bg: "#1a1407",
    image: upliftImg,
  },
  {
    id: "calm",
    eyebrow: "Chapter II",
    title: "Calm",
    body: "Evening unwind. Quiet focus. A slow exhale that settles into mint, lavender, and the soft hush of the day.",
    accent: [0.31, 0.63, 0.62],
    bg: "#06151a",
    image: calmImg,
  },
  {
    id: "balance",
    eyebrow: "Chapter III",
    title: "Balance",
    body: "Anytime equilibrium. The centered middle. Berry and bloom for the hours that ask you to stay present.",
    accent: [0.55, 0.37, 0.62],
    bg: "#16091a",
    image: balanceImg,
  },
  {
    id: "cta",
    eyebrow: "Begin",
    title: "Experience the Collection",
    body: "Hand-formulated in small batches. Shipped across South Africa.",
    accent: [1, 1, 1],
    bg: "#000000",
  },
];

function StoryPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  // Three.js shader background — cursor-reactive painted noise tinted per chapter
  useEffect(() => {
    let raf = 0;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (disposed || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseTarget: { value: new THREE.Vector2(0.5, 0.5) },
        uColorA: { value: new THREE.Color(CHAPTERS[0].accent[0], CHAPTERS[0].accent[1], CHAPTERS[0].accent[2]) },
        uColorB: { value: new THREE.Color(CHAPTERS[1].accent[0], CHAPTERS[1].accent[1], CHAPTERS[1].accent[2]) },
        uMix: { value: 0 },
      };

      const frag = /* glsl */ `
        precision highp float;
        uniform float uTime;
        uniform vec2 uRes;
        uniform vec2 uMouse;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uMix;

        // hash + simplex-ish noise (lightweight)
        vec3 hash3(vec2 p){
          vec3 q = vec3(dot(p,vec2(127.1,311.7)),
                        dot(p,vec2(269.5,183.3)),
                        dot(p,vec2(419.2,371.9)));
          return fract(sin(q)*43758.5453);
        }
        float noise(vec2 p){
          vec2 i = floor(p); vec2 f = fract(p);
          float a = hash3(i).x;
          float b = hash3(i+vec2(1.0,0.0)).x;
          float c = hash3(i+vec2(0.0,1.0)).x;
          float d = hash3(i+vec2(1.0,1.0)).x;
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
        }
        float fbm(vec2 p){
          float v = 0.0; float a = 0.5;
          for(int i=0;i<5;i++){ v += a*noise(p); p*=2.02; a*=0.5; }
          return v;
        }
        void main(){
          vec2 uv = gl_FragCoord.xy / uRes.xy;
          vec2 p = uv * vec2(uRes.x/uRes.y, 1.0);
          float t = uTime * 0.06;
          vec2 q = vec2(fbm(p + t), fbm(p - t + 3.1));
          float n = fbm(p*1.8 + q*1.6 + t);
          // cursor halo
          float d = distance(uv, uMouse);
          float halo = smoothstep(0.45, 0.0, d) * 0.55;
          vec3 col = mix(uColorA, uColorB, uMix);
          // painterly brush — modulate luminance, keep deep base
          float k = smoothstep(0.15, 0.95, n + halo*0.5);
          vec3 base = vec3(0.02, 0.02, 0.03);
          vec3 paint = mix(base, col, k * 0.55 + halo * 0.35);
          // vignette
          float vig = smoothstep(1.2, 0.2, length(uv - 0.5));
          paint *= vig;
          gl_FragColor = vec4(paint, 1.0);
        }
      `;

      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `void main(){ gl_Position = vec4(position, 1.0); }`,
        fragmentShader: frag,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      scene.add(mesh);

      const resize = () => {
        const w = window.innerWidth, h = window.innerHeight;
        renderer.setSize(w, h, false);
        uniforms.uRes.value.set(w, h);
      };
      resize();
      window.addEventListener("resize", resize);

      const onMove = (e: PointerEvent) => {
        uniforms.uMouseTarget.value.set(
          e.clientX / window.innerWidth,
          1 - e.clientY / window.innerHeight,
        );
      };
      window.addEventListener("pointermove", onMove);

      const tmpA = new THREE.Color();
      const tmpB = new THREE.Color();
      const start = performance.now();
      const tick = () => {
        const idx = activeRef.current;
        const next = Math.min(CHAPTERS.length - 1, idx + 1);
        const a = CHAPTERS[idx].accent;
        const b = CHAPTERS[next].accent;
        tmpA.setRGB(a[0], a[1], a[2]);
        tmpB.setRGB(b[0], b[1], b[2]);
        uniforms.uColorA.value.lerp(tmpA, 0.04);
        uniforms.uColorB.value.lerp(tmpB, 0.04);

        // mouse damp
        uniforms.uMouse.value.lerp(uniforms.uMouseTarget.value, 0.08);
        uniforms.uTime.value = (performance.now() - start) / 1000;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
        mesh.geometry.dispose();
        mat.dispose();
        renderer.dispose();
      };
    })();

    return () => { disposed = true; cleanup?.(); };
  }, []);

  // Lenis smooth scroll + GSAP ScrollTrigger per-chapter animations
  useEffect(() => {
    let cleanup: (() => void) | null = null;
    (async () => {
      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
      function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);

      const sections = gsap.utils.toArray<HTMLElement>("[data-chapter]");
      sections.forEach((sec, i) => {
        const eyebrow = sec.querySelector("[data-eyebrow]");
        const title = sec.querySelector("[data-title]");
        const body = sec.querySelector("[data-body]");
        const media = sec.querySelector("[data-media]");
        gsap.set([eyebrow, title, body, media].filter(Boolean), { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: sec,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => {
            activeRef.current = i;
            setActive(i);
            gsap.to([eyebrow, title, body, media].filter(Boolean), {
              opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.12,
            });
          },
          onEnterBack: () => {
            activeRef.current = i;
            setActive(i);
          },
        });
      });

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        lenis.destroy();
      };
    })();
    return () => { cleanup?.(); };
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
        aria-hidden
      />

      {/* fixed chapter indicator */}
      <div className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {CHAPTERS.map((c, i) => (
          <div key={c.id} className="flex items-center gap-3">
            <span
              className="h-px transition-all duration-500"
              style={{
                width: active === i ? 36 : 14,
                background: active === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.3em] transition-opacity"
              style={{ opacity: active === i ? 1 : 0.35 }}
            >
              {c.eyebrow}
            </span>
          </div>
        ))}
      </div>

      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10">
        <span className="text-sm font-light tracking-[0.4em]">MOODIES</span>
        <a
          href="mailto:hello@moodies.site"
          className="text-[10px] uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
        >
          hello@moodies.site
        </a>
      </header>

      <main className="relative z-10">
        {CHAPTERS.map((c, i) => (
          <Section key={c.id} chapter={c} index={i} />
        ))}
      </main>

      <footer className="relative z-10 border-t border-white/10 px-6 py-10 text-center text-[10px] uppercase tracking-[0.3em] text-white/40 md:px-10">
        © {new Date().getFullYear()} Moodies — Crafted in South Africa
      </footer>
    </div>
  );
}

function Section({ chapter, index }: { chapter: Chapter; index: number }) {
  const isHero = index === 0;
  const isCta = chapter.id === "cta";

  return (
    <section
      data-chapter={chapter.id}
      className="relative flex min-h-screen items-center px-6 py-32 md:px-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className={isHero || isCta ? "md:col-span-2 md:text-center" : ""}>
          <p
            data-eyebrow
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ color: `rgb(${chapter.accent.map((v) => Math.round(v * 255)).join(",")})` }}
          >
            {chapter.eyebrow}
          </p>
          <h2
            data-title
            className={`mt-6 font-light leading-[0.95] tracking-tight ${
              isHero ? "text-6xl md:text-[9rem]" : "text-5xl md:text-7xl"
            }`}
          >
            {chapter.title}
          </h2>
          <p
            data-body
            className={`mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg ${
              isHero || isCta ? "md:mx-auto" : ""
            }`}
          >
            {chapter.body}
          </p>
          {isHero && (
            <p data-body className="mt-10 text-[10px] uppercase tracking-[0.4em] text-white/40">
              Scroll to begin ↓
            </p>
          )}
          {isCta && (
            <div data-body className="mt-12 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:hello@moodies.site?subject=Order%20enquiry"
                className="rounded-full bg-white px-7 py-3.5 text-xs uppercase tracking-[0.25em] text-black transition hover:bg-white/90"
              >
                Order now
              </a>
              <a
                href="mailto:hello@moodies.site?subject=Tell%20me%20more"
                className="rounded-full border border-white/30 px-7 py-3.5 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-black"
              >
                Learn more
              </a>
            </div>
          )}
        </div>

        {chapter.image && (
          <div data-media className="relative">
            <div
              className="absolute -inset-6 rounded-3xl opacity-40 blur-3xl"
              style={{
                background: `rgb(${chapter.accent.map((v) => Math.round(v * 255)).join(",")})`,
              }}
              aria-hidden
            />
            <img
              src={chapter.image}
              alt={`${chapter.title} mood`}
              className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl"
              loading={index <= 1 ? "eager" : "lazy"}
            />
          </div>
        )}
      </div>
    </section>
  );
}
