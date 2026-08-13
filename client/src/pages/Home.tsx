import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Copy, Github, Image as ImageIcon, Menu, Radio, ScanLine, Send, Terminal, X } from "lucide-react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";
import Lenis from "lenis";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, Draggable);

const TELEGRAM_LOTTIE_PATH = "/manus-storage/AirplaneLottieAnimation_f4518aea.json";

// STYLE NOTE: Signal / Clay / Blue — this page is a moving editorial stage,
// not a stack of static pages. Scene state, route lines, jump transitions,
// pointer fields, and evidence panels are the primary design language.

type Project = {
  code: string;
  title: string;
  type: string;
  status: string;
  year: string;
  description: string;
  learnings: string[];
  tags: string[];
  media: string[];
};

const projects: Project[] = [
  {
    code: "LAB.01",
    title: "Packet Weather",
    type: "Learning lab / network fundamentals",
    status: "IN PROGRESS",
    year: "2026",
    description: "A growing field notebook for understanding how packets travel, where they pause, and what the logs are quietly saying.",
    learnings: ["Built small local network experiments", "Mapped traffic patterns into visual notes", "Turned questions into repeatable checklists"],
    tags: ["Wireshark", "Linux", "Notes"],
    media: ["packet map", "local trace"],
  },
  {
    code: "LAB.02",
    title: "Parrot Hours",
    type: "OS / workflow / daily practice",
    status: "ALWAYS ON",
    year: "2025—26",
    description: "The personal operating system around my second love: Parrot OS. Tools, aliases, experiments, and the rituals that make learning stick.",
    learnings: ["Made a repeatable learning environment", "Documented the tools I actually understand", "Kept the fun in the fundamentals"],
    tags: ["Parrot OS", "Bash", "Workflow"],
    media: ["os ritual", "terminal setup"],
  },
  {
    code: "LAB.03",
    title: "Open Channel",
    type: "Community / Telegram / signal sharing",
    status: "TRANSMITTING",
    year: "ONGOING",
    description: "A public trail of notes, links, late-night discoveries, and conversations with people who also like taking things apart to learn how they work.",
    learnings: ["Shared what I was learning in public", "Collected better questions from the community", "Kept the channel human, not performative"],
    tags: ["Telegram", "Community", "Research"],
    media: ["channel signal", "public notes"],
  },
];

const featured = [
  { title: "Learning the stuff", label: "ORIGIN", code: "01", detail: "Curiosity became a practice: small labs, patient notes, and the refusal to stop at the first answer.", metric: "∞", metricLabel: "QUESTIONS OPEN" },
  { title: "Parrot hours", label: "SYSTEM", code: "02", detail: "My second love is Parrot OS. It keeps the work close to the machine and the learning close to the truth.", metric: "24/7", metricLabel: "CURIOUS MODE" },
  { title: "Open channel", label: "SIGNAL", code: "03", detail: "Telegram is where the trail stays public: useful links, honest progress, and conversations that move the next experiment forward.", metric: "LIVE", metricLabel: "TRANSMISSION" },
];

const navItems = [
  ["home", "Home"],
  ["about", "Origin"],
  ["work", "Labs"],
  ["featured", "Signal"],
  ["visuals", "Notes"],
  ["contact", "Contact"],
];

const sceneMeta: Record<string, { ribbon: string; rail: string }> = {
  home: { ribbon: "the signal stayed. everything else changed.", rail: "signal route / home" },
  about: { ribbon: "the rabbit hole got wider.", rail: "signal route / origin" },
  work: { ribbon: "archive open / records moving.", rail: "signal route / labs" },
  featured: { ribbon: "next stop: open channel.", rail: "signal route / featured" },
  visuals: { ribbon: "tabs everywhere / pattern found.", rail: "signal route / visuals" },
  contact: { ribbon: "transmission ready / say hi.", rail: "signal route / contact" },
};

function BrandMark({ hero = false }: { hero?: boolean }) {
  return <span aria-hidden="true" className={`brand-mark ${hero ? "brand-mark--hero" : ""}`} />;
}

function InkRoute({ variant = "default", className = "" }: { variant?: "default" | "signal" | "close"; className?: string }) {
  const paths = {
    default: "M18 116 C120 12 188 168 286 86 S456 28 520 102 S680 164 744 58 C796 -8 854 28 812 74 C776 112 734 102 754 66 C770 38 812 38 824 64",
    signal: "M18 100 C132 82 174 16 280 48 S426 154 534 86 S708 26 812 86 C860 114 922 100 976 44",
    close: "M18 94 C130 10 214 146 324 64 S486 18 568 82 S712 142 792 70 C842 28 894 48 866 88 C842 120 804 104 812 76",
  };
  return <svg className={`ink-route ink-route--${variant} ${className}`} viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true"><path className="ink-route__shadow" d={paths[variant]} /><path className="ink-route__path" d={paths[variant]} /><path className="ink-route__curl" d="M824 64 C852 24 914 42 900 84 C886 122 820 132 796 96 C780 72 798 42 828 46" /><circle className="ink-route__node" cx="286" cy="86" r="7" /><circle className="ink-route__node" cx="744" cy="58" r="7" /></svg>;
}

function TelegramSignalObject() {
  const lottieRef = useRef<HTMLDivElement>(null);
  const [lottieReady, setLottieReady] = useState(false);

  useEffect(() => {
    if (!lottieRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: TELEGRAM_LOTTIE_PATH,
      rendererSettings: { preserveAspectRatio: "xMidYMid meet", progressiveLoad: true, hideOnTransparent: true },
    });
    const handleReady = () => setLottieReady(true);
    animation.addEventListener("DOMLoaded", handleReady);
    return () => { animation.removeEventListener("DOMLoaded", handleReady); animation.destroy(); };
  }, []);

  return <div className={`telegram-signal-object ${lottieReady ? "is-lottie-ready" : ""}`} data-telegram-signal data-lottie-ready={lottieReady} aria-hidden="true"><div className="telegram-signal-object__lottie" ref={lottieRef} /><svg className="telegram-signal-object__fallback" viewBox="0 0 120 96"><ellipse className="telegram-signal-object__orbit" cx="60" cy="48" rx="45" ry="18" /><g className="telegram-signal-object__trail-field"><path className="telegram-signal-object__trail telegram-signal-object__trail--one" d="M10 65C28 61 31 72 42 68" /><path className="telegram-signal-object__trail telegram-signal-object__trail--two" d="M17 72C28 70 32 77 38 74" /><path className="telegram-signal-object__trail telegram-signal-object__trail--three" d="M7 56C20 53 28 61 39 59" /><path className="telegram-signal-object__trail telegram-signal-object__trail--four" d="M12 79C23 76 29 83 36 80" /></g><g className="telegram-signal-object__flight"><path className="telegram-signal-object__shadow" d="M19 49 97 24 67 73 56 55Z" /><path className="telegram-signal-object__plane" d="M19 49 97 24 67 73 56 55Z" /><path className="telegram-signal-object__fold" d="m56 55 11 18 3-27Z" /></g></svg><span>telegram / active</span></div>;
}

function DraggableSticker({ children, className = "" }: { children: ReactNode; className?: string }) {
  const stickerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!stickerRef.current || !window.matchMedia("(pointer: fine)").matches) return;
    const instance = Draggable.create(stickerRef.current, {
      type: "x,y",
      edgeResistance: .7,
      bounds: stickerRef.current.parentElement ?? undefined,
      onPress: function () { gsap.to(this.target, { scale: 1.06, rotation: "+=2", duration: .18, ease: "power2.out" }); },
      onRelease: function () { gsap.to(this.target, { scale: 1, rotation: "-=2", duration: .45, ease: "elastic.out(1, .45)" }); },
    })[0];
    return () => { instance.kill(); };
  }, []);

  return <div ref={stickerRef} className={`draggable-sticker ${className}`} role="img" aria-label="Draggable signal note">{children}</div>;
}

function MobileRouteSheet({ activeIndex, onSelect, onMove }: { activeIndex: number; onSelect: (index: number) => void; onMove: (direction: 1 | -1) => void }) {
  const sheet = featured[activeIndex];
  const [offset, setOffset] = useState(0);
  const [pressed, setPressed] = useState(false);
  const offsetRef = useRef(0);
  const pointerRef = useRef<{ id: number; start: number; last: number; lastAt: number; velocity: number; grabOffset: number } | null>(null);
  const frameRef = useRef<number | null>(null);
  const springVelocityRef = useRef(0);

  const springTo = (target: number, initialVelocity = 0, complete?: () => void) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      offsetRef.current = target;
      setOffset(target);
      springVelocityRef.current = 0;
      complete?.();
      return;
    }
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    let value = offsetRef.current;
    let velocity = initialVelocity || springVelocityRef.current;
    const tick = () => {
      const distance = target - value;
      velocity = velocity * .78 + distance * .075;
      value += velocity;
      springVelocityRef.current = velocity;
      offsetRef.current = value;
      setOffset(value);
      if (Math.abs(distance) < .5 && Math.abs(velocity) < .5) {
        offsetRef.current = target;
        setOffset(target);
        springVelocityRef.current = 0;
        frameRef.current = null;
        complete?.();
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    pointerRef.current = { id: event.pointerId, start: event.clientY, last: event.clientY, lastAt: performance.now(), velocity: 0, grabOffset: offsetRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    setPressed(true);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    const now = performance.now();
    const elapsed = Math.max(8, now - pointer.lastAt);
    pointer.velocity = (event.clientY - pointer.last) / elapsed * 16;
    pointer.last = event.clientY;
    pointer.lastAt = now;
    const raw = pointer.grabOffset + event.clientY - pointer.start;
    const next = raw > 0 ? raw * .28 : raw < -260 ? -260 + (raw + 260) * .25 : raw;
    offsetRef.current = next;
    setOffset(next);
  };
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    const projected = offsetRef.current + pointer.velocity * 18;
    pointerRef.current = null;
    setPressed(false);
    if (projected < -70) springTo(-320, pointer.velocity, () => { offsetRef.current = 0; setOffset(0); onMove(1); });
    else if (projected > 70) springTo(180, pointer.velocity, () => { offsetRef.current = 0; setOffset(0); onMove(-1); });
    else springTo(0, pointer.velocity);
  };

  return <div className={`mobile-route-sheet ${pressed ? "is-pressed" : ""}`}><div className="mobile-route-sheet__underlay"><div className="mobile-route-sheet__route">{featured.map((stop, index) => <button key={stop.code} className={index === activeIndex ? "is-active" : ""} aria-label={`Go to ${stop.label}`} aria-current={index === activeIndex ? "step" : undefined} onPointerDown={(event) => event.stopPropagation()} onClick={() => { onSelect(index); springTo(0); }}><i /><span>{stop.code}</span></button>)}</div><div className="mobile-route-sheet__underlay-copy"><span>next action</span><strong>pull up to inspect</strong></div></div><article className="mobile-route-sheet__panel" style={{ transform: `translate3d(0, ${offset}px, 0)` }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={() => { pointerRef.current = null; setPressed(false); springTo(0); }}><div className="mobile-route-sheet__grabber" /><div className="mobile-route-sheet__panel-head"><span>{sheet.code} / {sheet.label}</span><span>signal / live</span></div><div key={sheet.code} className="mobile-route-sheet__readout"><h3>{sheet.title}</h3><p>{sheet.detail}</p><div className="mobile-route-sheet__trace"><span>trace / {sheet.metricLabel}</span><strong>{sheet.metric}</strong></div></div><div className="mobile-route-sheet__panel-foot"><span>pull / release / continue</span><button data-cursor="NEXT" aria-label="Next featured signal" onPointerDown={(event) => event.stopPropagation()} onClick={() => onMove(1)}><ArrowRight size={15} /></button></div></article></div>;
}

function useSceneState() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    document.querySelectorAll("section[id]").forEach((section) => sectionObserver.observe(section));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    if (!reducedMotion) {
      lenis = new Lenis({ autoRaf: false, duration: 0.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, syncTouch: false });
      lenisRef.current = lenis;
      lenis.on("scroll", ({ scroll }) => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? (scroll / max) * 100 : 0);
        ScrollTrigger.update();
      });
      const ticker = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
      window.setTimeout(() => lenis?.start(), 950);
      return () => {
        window.removeEventListener("scroll", updateProgress);
        gsap.ticker.remove(ticker);
        lenis?.destroy();
        lenisRef.current = null;
        sectionObserver.disconnect();
      };
    }

    return () => {
      window.removeEventListener("scroll", updateProgress);
      sectionObserver.disconnect();
    };
  }, []);

  const scrollTo = (target: number) => {
    const nextTarget = Math.max(0, target);
    const settleNativeScroll = () => {
      lenisRef.current?.scrollTo(nextTarget, { immediate: true, force: true });
      document.documentElement.scrollTop = nextTarget;
      document.body.scrollTop = nextTarget;
      window.scrollTo({ top: nextTarget, behavior: "auto" });
    };
    let frames = 0;
    const enforceScroll = () => {
      settleNativeScroll();
      if (frames++ < 24) window.requestAnimationFrame(enforceScroll);
    };
    if (lenisRef.current) {
      enforceScroll();
      window.requestAnimationFrame(() => {
        ScrollTrigger.update();
        ScrollTrigger.refresh();
        enforceScroll();
      });
    } else {
      enforceScroll();
      window.requestAnimationFrame(() => { ScrollTrigger.update(); ScrollTrigger.refresh(); enforceScroll(); });
    }
  };

  const getScrollPosition = () => window.scrollY;

  return { progress, activeSection, scrollTo, getScrollPosition };
}

function useGsapCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !finePointer || !cursorRef.current) return;
    const cursor = cursorRef.current;
    const label = cursor.querySelector<HTMLElement>("[data-cursor-label]");
    const core = cursor.querySelector<HTMLElement>("[data-cursor-core]");
    const trail = Array.from(cursor.querySelectorAll<HTMLElement>("[data-cursor-trail]"));
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let leaderX = mouseX;
    let leaderY = mouseY;
    const points = trail.map((el, index) => ({ el, x: mouseX, y: mouseY, size: Math.max(2, 16 - index * 1.1), opacity: 1 - index * .05 }));

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (label) label.textContent = target?.dataset.cursor ?? "MOVE";
      gsap.to(cursor, { opacity: 1, duration: .18, overwrite: true });
    };
    const onLeave = () => gsap.to(cursor, { opacity: 0, duration: .18, overwrite: true });
    const onDown = () => gsap.to(core, { scale: .5, duration: .1, overwrite: true });
    const onUp = () => {
      gsap.to(core, { scale: 1, duration: .4, ease: "back.out(3)", overwrite: true });
      const ripple = document.createElement("span");
      ripple.className = "cursor-ripple";
      cursor.appendChild(ripple);
      gsap.set(ripple, { x: mouseX, y: mouseY, xPercent: -50, yPercent: -50, width: 20, height: 20 });
      gsap.to(ripple, { width: 120, height: 120, opacity: 0, duration: .6, ease: "power2.out", onComplete: () => ripple.remove() });
    };
    const onOver = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor]");
      if (!target) return;
      gsap.to(core, { scale: .72, opacity: .35, duration: .16, ease: "power2.out", overwrite: true });
      gsap.to(points[0]?.el, { width: 46, height: 46, backgroundColor: "transparent", borderWidth: 2, duration: .4, ease: "back.out(2)", overwrite: true });
      points.slice(1).forEach((point) => gsap.to(point.el, { scale: .78, opacity: .2, duration: .16, ease: "power2.out", overwrite: true }));
    };
    const onOut = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor]");
      if (!target || target.contains(event.relatedTarget as Node | null)) return;
      gsap.to(core, { scale: 1, duration: .2, overwrite: true });
      points.forEach((point, index) => gsap.to(point.el, { width: point.size, height: point.size, scale: 1, opacity: point.opacity, backgroundColor: "#f4efe5", borderWidth: 0, duration: .3 + index * .015, ease: "back.out(1.5)", overwrite: true }));
    };
    const tick = () => {
      leaderX = mouseX;
      leaderY = mouseY;
      if (label) gsap.set(label, { x: mouseX, y: mouseY });
      if (core) gsap.set(core, { x: mouseX, y: mouseY });
      points.forEach((point) => { point.x += (leaderX - point.x) * .4; point.y += (leaderY - point.y) * .4; gsap.set(point.el, { x: point.x, y: point.y }); leaderX = point.x; leaderY = point.y; });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    gsap.ticker.add(tick);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerleave", onLeave); window.removeEventListener("mousedown", onDown); window.removeEventListener("mouseup", onUp); document.removeEventListener("mouseover", onOver); document.removeEventListener("mouseout", onOut); gsap.ticker.remove(tick); };
  }, []);

  return cursorRef;
}

function useReferenceMotion() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set("[data-reveal]", { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        gsap.set(".boot-screen", { autoAlpha: 0, display: "none" });
        gsap.set("[data-telegram-signal]", { x: "72vw", y: "18vh", rotation: -8, scale: .88, autoAlpha: .78 });
        return;
      }

      gsap.set("[data-reveal]", { autoAlpha: 0, y: 38, filter: "blur(6px)" });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: .9,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", end: "top 58%", scrub: .7, once: true },
        });
      });

      const heroTl = gsap.timeline({ defaults: { overwrite: "auto" } });
      const loading = { value: 0 };
      heroTl.fromTo(".boot-screen__line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power4.inOut" }, 0)
        .fromTo(".boot-screen__copy", { autoAlpha: 0, y: 18, filter: "blur(24px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" }, .15)
        .to(".boot-char", { autoAlpha: 1, filter: "blur(0px)", duration: 1, stagger: .025, ease: "power2.out" }, .25)
        .to(loading, { value: 100, duration: 4.9, ease: "power1.inOut", onUpdate: () => { const percent = document.querySelector<HTMLElement>("[data-boot-percent]"); const bar = document.querySelector<HTMLElement>("[data-boot-bar]"); const value = Math.floor(loading.value).toString().padStart(2, "0"); if (percent) percent.textContent = `${value}%`; if (bar) bar.style.width = `${loading.value}%`; } }, 0)
        .fromTo("#home .scene-parallax", { scale: .88, autoAlpha: 0, filter: "blur(18px)" }, { scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" }, .45)
        .fromTo("#home .brand-mark--hero", { scale: .12, rotation: -4, y: -114, autoAlpha: 0 }, { scale: 1, rotation: -4, y: 0, autoAlpha: 1, duration: 1.65, ease: "expo.out" }, .7)
        .fromTo("#home h1", { y: 90, autoAlpha: 0, filter: "blur(24px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.35, ease: "expo.out" }, .85)
        .fromTo(".signal-nav-shell", { autoAlpha: 0, y: 30, filter: "blur(8px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "expo.out" }, 1.45)
        .to(".boot-screen", { autoAlpha: 0, clipPath: "inset(0 0 100% 0)", duration: .9, ease: "power4.inOut" }, 1.9);

      const sections = ["#about", "#work", "#featured", "#visuals", "#contact"];
      sections.forEach((selector) => {
        const section = document.querySelector<HTMLElement>(selector);
        if (!section) return;
        gsap.fromTo(section, { "--scene-depth": 0 }, { "--scene-depth": 1, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
      });

      const routeScenes = [
        [".ink-route-layer--hero", "#home"],
        [".ink-route-layer--origin", "#about"],
        [".ink-route-layer--signal", "#featured"],
        [".ink-route-layer--close", "#contact"],
      ] as const;
      routeScenes.forEach(([routeSelector, triggerSelector]) => {
        const route = document.querySelector<SVGSVGElement>(`${routeSelector} .ink-route`);
        if (!route) return;
        const path = route.querySelector<SVGPathElement>(".ink-route__path");
        const curl = route.querySelector<SVGPathElement>(".ink-route__curl");
        const nodes = route.querySelectorAll<SVGCircleElement>(".ink-route__node");
        gsap.timeline({ scrollTrigger: { trigger: triggerSelector, start: "top 84%", end: "top 18%", scrub: 1.1 } })
          .to(path, { strokeDashoffset: 0, ease: "sine.inOut", duration: 1 }, 0)
          .to(curl, { strokeDashoffset: 0, ease: "elastic.out(1, .5)", duration: .7 }, .55)
          .to(nodes, { autoAlpha: 1, scale: 1, stagger: .16, ease: "back.out(1.8)", duration: .25 }, .72)
          .to(route, { rotation: routeSelector.includes("signal") ? 4 : -2, transformOrigin: "50% 50%", ease: "sine.inOut", duration: .5 }, .5);
      });

      gsap.to("#about .scene-route path", { strokeDashoffset: 0, duration: 2.4, ease: "sine.inOut", scrollTrigger: { trigger: "#about", start: "top 72%", end: "top 26%", scrub: 1 } });
      gsap.fromTo("#about .draggable-sticker", { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: .8, stagger: .12, ease: "back.out(1.2)", scrollTrigger: { trigger: "#about", start: "top 72%", once: true } });
      gsap.fromTo("#work .project-record", { x: -18, autoAlpha: .2 }, { x: 0, autoAlpha: 1, duration: .7, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: "#work", start: "top 72%", once: true } });
      gsap.fromTo("#work .project-record", { y: 34, rotate: (index) => index % 2 === 0 ? -1.4 : 1.1, clipPath: "inset(0 0 100% 0)" }, { y: 0, rotate: 0, clipPath: "inset(0 0 0% 0)", duration: .9, stagger: .16, ease: "elastic.out(1, .68)", scrollTrigger: { trigger: "#work", start: "top 78%", once: true } });
      gsap.fromTo("#featured .scene-orbit", { rotation: -18, scale: .85, autoAlpha: .2 }, { rotation: 12, scale: 1, autoAlpha: 1, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: "#featured", start: "top 78%", once: true } });
      gsap.fromTo("#visuals [data-cursor=INSPECT]", { clipPath: "inset(0 0 100% 0)", y: 50, rotation: -3 }, { clipPath: "inset(0 0 0% 0)", y: 0, rotation: 0, duration: .9, stagger: .14, ease: "expo.out", scrollTrigger: { trigger: "#visuals", start: "top 78%", once: true } });
      gsap.to(".ink-route-layer--close", { x: 70, ease: "none", scrollTrigger: { trigger: "#contact", start: "top bottom", end: "bottom top", scrub: 1.2 } });

      const telegram = document.querySelector<HTMLElement>("[data-telegram-signal]");
      if (telegram) {
        gsap.timeline({ scrollTrigger: { trigger: "#home", start: "top top", end: () => `+=${Math.max(1, document.documentElement.scrollHeight - window.innerHeight)}`, scrub: 1.1, invalidateOnRefresh: true } })
          .set(telegram, { x: () => window.innerWidth * .1, y: () => window.innerHeight * .24, rotation: -8, scale: .92, autoAlpha: .92 }, 0)
          .to(telegram, { x: () => window.innerWidth * .7, y: () => window.innerHeight * .26, rotation: 14, scale: 1.05, duration: .18, ease: "none" }, .14)
          .to(telegram, { x: () => window.innerWidth * .22, y: () => window.innerHeight * .46, rotation: -16, scale: .84, duration: .2, ease: "none" }, .34)
          .to(telegram, { x: () => window.innerWidth * .72, y: () => window.innerHeight * .52, rotation: 10, scale: 1.1, duration: .2, ease: "none" }, .54)
          .to(telegram, { x: () => window.innerWidth * .26, y: () => window.innerHeight * .34, rotation: -12, scale: .88, duration: .2, ease: "none" }, .74)
          .to(telegram, { x: () => window.innerWidth * .74, y: () => window.innerHeight * .6, rotation: 7, scale: .98, duration: .2, ease: "none" }, .88);
      }
    });

    return () => context.revert();
  }, []);
}

export default function Home() {
  const { progress, activeSection, scrollTo, getScrollPosition } = useSceneState();
  const cursorRef = useGsapCursor();
  useReferenceMotion();
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeMedia, setActiveMedia] = useState<{ project: number; frame: number } | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jumping, setJumping] = useState(false);
  const dragStart = useRef<number | null>(null);
  const current = featured[featuredIndex];
  const progressLabel = useMemo(() => `${Math.round(progress).toString().padStart(2, "0")}%`, [progress]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setSlideDirection(direction === 1 ? "next" : "prev");
        setFeaturedIndex((value) => (value + direction + featured.length) % featured.length);
      }
      if (event.key === "Escape") {
        setActiveProject(null);
        setActiveMedia(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const changeFeatured = (direction: 1 | -1) => {
    setSlideDirection(direction === 1 ? "next" : "prev");
    setFeaturedIndex((value) => (value + direction + featured.length) % featured.length);
  };

  const goTo = (id: string) => {
    if (jumping) return;
    setMenuOpen(false);
    setJumping(true);
    document.body.classList.add("traveling");
    const target = document.getElementById(id);
    const currentScroll = getScrollPosition();
    let targetScroll = target ? currentScroll + target.getBoundingClientRect().top : 0;
    if (id === "about") targetScroll += window.innerHeight * .4;
    const sectionName = navItems.find(([sectionId]) => sectionId === id)?.[1] ?? id;
    const label = document.querySelector<HTMLElement>(".signal-jump__label");
    if (label) label.textContent = `routing signal / ${sectionName}`;

    const timeline = gsap.timeline({ onComplete: () => { setJumping(false); document.body.classList.remove("traveling"); } });
    timeline.to(".signal-nav-item", { autoAlpha: 0, duration: .2, ease: "power2.out" }, 0)
      .to(".signal-nav-shell", { scaleX: 1.12, scaleY: 1.35, y: 4, duration: .6, ease: "power4.inOut" }, .1)
      .to(".signal-stage", { scale: .82, rotationX: 28, y: "-4vh", transformPerspective: 1200, transformOrigin: "center center", borderRadius: "24px", filter: "brightness(.35) blur(6px)", duration: .6, ease: "power3.inOut" }, .1)
      .to(".signal-jump__line", { scaleX: 1, duration: .3, ease: "power4.inOut" }, 0)
      .add(() => scrollTo(targetScroll), .6)
      .to(".signal-nav-ticks", { x: "-200%", duration: 1.8, ease: "power2.inOut" }, .4)
      .to(".signal-jump__line", { scaleX: 0, duration: .8, ease: "power2.inOut" }, .5)
      .to(".signal-stage", { scale: 1, rotationX: 0, y: "0vh", borderRadius: "0px", filter: "brightness(1) blur(0px)", duration: .9, ease: "expo.out" }, 2)
      .to(".signal-nav-shell", { scaleX: 1, scaleY: 1, y: 0, duration: .7, ease: "expo.out" }, 2)
      .to(".signal-nav-item", { autoAlpha: 1, duration: .4, ease: "power2.out" }, 2.3);
  };

  const copyHandle = async () => {
    await navigator.clipboard?.writeText("@zxornatoe");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const delta = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 45) changeFeatured(delta < 0 ? 1 : -1);
  };

  return (
    <main data-scene={activeSection} className="signal-world overflow-hidden bg-[#ede5d7] text-[#221f1b]">
      <div className="boot-screen" aria-hidden="true">
        <div className="boot-screen__line" />
        <div className="boot-screen__copy"><BrandMark hero /><span className="boot-screen__chars">{"opening signal / zxornatoe".split("").map((character, index) => <i className="boot-char" key={`${character}-${index}`}>{character === " " ? "\u00a0" : character}</i>)}</span><strong>READY</strong></div>
        <div className="boot-screen__counter"><span data-boot-percent>00%</span><div><span data-boot-bar /></div></div>
        <button data-cursor="SKIP" className="boot-screen__skip" onClick={() => { gsap.killTweensOf(".boot-screen"); gsap.to(".boot-screen", { autoAlpha: 0, clipPath: "inset(0 0 100% 0)", duration: .45, ease: "power3.inOut" }); gsap.to(".signal-nav-shell", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .45, ease: "expo.out" }); }}>SKIP INTRO →</button>
      </div>

      <div className={`signal-jump ${jumping ? "is-active" : ""}`} aria-hidden="true"><span className="signal-jump__line" /><span className="signal-jump__label">routing signal / {activeSection}</span></div>
      <div className={`cinematic-vignette ${jumping ? "is-active" : ""}`} aria-hidden="true" />
      {activeSection === "featured" && <div className="mobile-touch-feature"><MobileRouteSheet activeIndex={featuredIndex} onSelect={(index) => { setFeaturedIndex(index); setSlideDirection(index >= featuredIndex ? "next" : "prev"); }} onMove={changeFeatured} /></div>}
      <div ref={cursorRef} className="pointer-field pointer-field--gsap" aria-hidden="true"><span data-cursor-label>MOVE</span><b data-cursor-core /><div className="cursor-trail">{Array.from({ length: 10 }, (_, index) => <i key={index} data-cursor-trail />)}</div></div>

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-black/15 bg-[#ede5d7]/85 px-4 py-2 backdrop-blur-md sm:px-6">
        <div className="parity-top-ribbon"><span>zxornatoe / signal world</span><span className="parity-top-ribbon__mid">{sceneMeta[activeSection]?.ribbon ?? sceneMeta.home.ribbon}</span><span>{progressLabel}</span></div>
        <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.14em] sm:text-xs">
          <button data-cursor="HOME" className="signal-mono flex items-center gap-2 font-semibold" onClick={() => goTo("home")} aria-label="Go to home"><span className="grid h-7 w-7 place-items-center bg-[#3e4cff] text-[#ede5d7]"><BrandMark /></span><span className="hidden lowercase tracking-[-0.08em] sm:inline">zxornatoe <span className="opacity-45">/ signal portfolio</span></span><span className="sm:hidden">zx / 01</span></button>
          <div className="hidden flex-1 items-center justify-center gap-3 sm:flex"><span className="opacity-55">SYS.TRACK_ACTIVE</span><span className="h-px w-12 bg-black/35" /><span>LEARNING / 2026</span></div>
          <div className="flex items-center gap-3"><button data-cursor="SOUND" className="parity-sound hidden sm:inline-flex" onClick={() => setSoundOn((value) => !value)} aria-label="Toggle sound">{soundOn ? "SOUND / ON" : "SOUND / OFF"}</button><span className="signal-mono tabular-nums">{progressLabel}</span><button data-cursor="MENU" className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={16} /> : <Menu size={16} />}</button></div>
        </div>
        <div className="mt-2 h-1 overflow-hidden bg-black/10"><div className="hero-scroll-meter__fill h-full origin-left bg-[#3e4cff]" style={{ transform: `scaleX(${progress / 100})` }} /></div>
        {menuOpen && <nav className="absolute left-0 right-0 top-full grid grid-cols-3 gap-px border-b border-black bg-[#ede5d7] p-2 sm:hidden">{navItems.map(([id, label]) => <button data-cursor={label.toUpperCase()} className="border border-black/15 px-2 py-3 text-left text-[10px] uppercase" key={id} onClick={() => goTo(id)}>{label}</button>)}</nav>}
      </header>

      <nav className="signal-nav-shell fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 border border-black bg-[#ede5d7] p-1 shadow-[5px_5px_0_#221f1b] sm:block" aria-label="Section navigation"><div className="signal-nav-ticks" aria-hidden="true">{Array.from({ length: 60 }, (_, index) => <i key={index} className={index % 5 === 0 ? "is-major" : ""} />)}</div><div className="flex items-center gap-1">{navItems.map(([id, label]) => <button data-cursor={label.toUpperCase()} key={id} onClick={() => goTo(id)} className={`signal-nav-item px-3 py-2 text-[10px] uppercase tracking-[0.12em] transition hover:bg-[#3e4cff] hover:text-[#ede5d7] ${activeSection === id ? "bg-[#3e4cff] text-[#ede5d7]" : ""}`}>{label}</button>)}</div></nav>

      <div className="fixed bottom-0 left-0 top-0 z-30 hidden w-8 flex-col items-center justify-center gap-3 border-r border-black/10 bg-[#ede5d7]/35 lg:flex"><span className="signal-mono -rotate-90 whitespace-nowrap text-[9px] uppercase tracking-[.18em]">{sceneMeta[activeSection]?.rail ?? sceneMeta.home.rail}</span><div className="h-32 w-px bg-black/20"><div className="w-full bg-[#3e4cff] transition-[height] duration-500" style={{ height: `${progress}%` }} /></div></div>

      <div className="signal-stage">
        <div className="ink-route-layer ink-route-layer--hero"><InkRoute variant="default" /></div>
        <div className="ink-route-layer ink-route-layer--origin"><InkRoute variant="default" /></div>
        <div className="ink-route-layer ink-route-layer--signal"><InkRoute variant="signal" /></div>
        <div className="ink-route-layer ink-route-layer--close"><InkRoute variant="close" /></div>
        <TelegramSignalObject />

      <section id="home" className="scene-section grain relative flex min-h-[100svh] items-end overflow-hidden bg-[#3e4cff] px-5 pb-16 pt-32 text-[#f4efe5] sm:px-10 lg:px-16"><div className="hero-field-overlay absolute inset-0" /><div className="absolute inset-0 opacity-50 [background-image:linear-gradient(125deg,transparent_0_48%,rgba(244,239,229,.24)_48.2%,transparent_48.5%),linear-gradient(25deg,transparent_0_65%,rgba(20,15,15,.3)_65.2%,transparent_65.5%)]" /><div className="scene-parallax absolute left-[9%] top-[23%] h-[42vw] w-[42vw] max-h-[540px] max-w-[540px] rounded-full bg-[#191512] shadow-[18px_18px_0_rgba(244,239,229,.16)]" style={{ transform: `translate3d(0, ${progress * -0.16}px, 0)` }} /><div className="absolute left-[11%] top-[31%] h-px w-[32vw] bg-[#f4efe5]/60 scene-route-line" /><div className="absolute right-[8%] top-[22%] hidden w-56 rotate-3 border border-[#f4efe5]/70 p-3 font-mono text-[10px] uppercase leading-5 scene-float lg:block"><span className="text-[#ed8b5a]">status: curious</span><br />second love: parrot os<br />signal: telegram<br />mode: learning</div><div className="relative z-10 w-full"><div data-reveal className="mb-10 flex items-center gap-4 sm:ml-[8%]"><BrandMark hero /><p className="signal-mono text-[10px] uppercase tracking-[0.18em]">Zxornatoe / independent learner / systems curious</p></div><div className="grid items-end gap-8 lg:grid-cols-[.7fr_1.7fr_.7fr]"><div data-reveal className="order-2 space-y-6 text-xs leading-5 lg:order-1 lg:pb-8"><span className="clip-label inline-block bg-[#ed8b5a] px-3 py-1 text-[#221f1b]">01 — the intro</span><p className="signal-prose text-base">My second love is Parrot OS.<br />The first one is still under investigation.</p><a data-cursor="SCROLL" className="inline-flex items-center gap-2 border-b border-[#f4efe5] pb-1" href="#about" onClick={(e) => { e.preventDefault(); goTo("about"); }}>keep scrolling <ArrowDown size={13} /></a></div><h1 data-reveal className="signal-display signal-hand hero-wordmark order-1 max-w-4xl text-[17vw] font-semibold leading-[.78] tracking-[-0.08em] lg:order-2 lg:text-[15vw]">zxorna<span className="text-[#ed8b5a]">t</span>oe</h1><div data-reveal className="order-3 justify-self-end pb-2 text-right text-[11px] uppercase tracking-[.12em] lg:pb-8"><span className="block border-b border-[#f4efe5]/60 pb-2">learning the stuff</span><span className="block pt-2 text-[#ed8b5a]">is the actual flex</span></div></div></div><div className="hero-meter absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[.16em] sm:left-10 sm:right-10"><span className="hero-meter__value">{progressLabel}</span><span className="hero-meter__line"><i style={{ width: `${progress}%` }} /></span><span>SCROLL DOWN</span><span className="hidden sm:inline">BUILT FROM CURIOSITY</span></div></section>

      <div className="signal-ticker flex gap-10 overflow-hidden border-y border-black bg-[#221f1b] px-4 py-3 text-[10px] uppercase tracking-[.2em] text-[#ede5d7]"><span>signal ticker — parrot_os / telegram / always_learning / no fake guru energy</span><span aria-hidden="true">signal ticker — parrot_os / telegram / always_learning</span></div>

      <section id="about" className="scene-section grain relative bg-[#ede5d7] px-5 py-24 sm:px-10 lg:px-16 lg:py-36"><div className="absolute right-8 top-12 hidden text-[#3e4cff] lg:block scene-float"><BrandMark /></div><DraggableSticker className="left-[68%] top-[13%] hidden rotate-6 border border-black bg-[#ed8b5a] p-3 text-[10px] uppercase shadow-[5px_5px_0_#3e4cff] lg:block"><span className="signal-mono block text-[9px] text-[#221f1b]/70">drag note / 001</span><span className="signal-condensed mt-5 block text-3xl leading-[.8]">ask<br />better<br />questions</span></DraggableSticker><DraggableSticker className="left-[76%] top-[34%] hidden -rotate-3 border border-black bg-[#3e4cff] p-3 text-[#f4efe5] shadow-[5px_5px_0_#221f1b] lg:block"><span className="signal-mono block text-[9px]">parrot os / second love</span><span className="mt-5 block text-3xl">↗</span></DraggableSticker><div data-reveal className="mb-16 flex items-start justify-between gap-6"><div><p className="signal-mono mb-3 text-[10px] uppercase tracking-[.2em] text-[#3e4cff]">01 / origin — the learning log</p><h2 className="signal-display max-w-3xl text-5xl leading-[.95] sm:text-7xl lg:text-8xl">I keep pulling<br /><em>the thread.</em></h2></div><span className="signal-mono hidden pt-1 text-[10px] uppercase sm:block">open book / no final form</span></div><svg className="scene-route" viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden="true"><path className={`route-path ${activeSection === "about" || activeSection === "work" ? "is-active" : ""}`} d="M0,45 C120,45 140,15 240,15 S390,75 520,42 S770,10 1000,48" /><circle cx="240" cy="15" r="5" /><circle cx="520" cy="42" r="5" /><circle cx="1000" cy="48" r="5" /></svg><div data-reveal className="grid gap-12 lg:grid-cols-[.8fr_1.4fr_.7fr] lg:items-end"><div className="offset-rule rotate-[-3deg] border border-black bg-[#3e4cff] p-6 text-[#f4efe5]"><Terminal size={24} /><p className="signal-condensed mt-10 text-4xl uppercase leading-[.85]">Started with<br />questions.<br /><span className="text-[#ed8b5a]">Stayed for<br />the rabbit hole.</span></p><p className="signal-mono mt-12 text-[10px] uppercase leading-5">note / curiosity has<br />excellent uptime</p></div><div className="signal-prose space-y-8 text-lg leading-[1.55] sm:text-2xl"><p>I love hacking, cracking, and techy things — the ethical kind, the kind that happens in labs, write-ups, and authorised spaces where learning is the point.</p><p className="max-w-2xl">I’m active on Telegram, collecting better questions and sharing the things I’m learning. I don’t pretend to know everything. I just keep opening the next tab.</p></div><div className="border-t border-black pt-4 text-xs leading-5"><p className="mb-6 uppercase tracking-[.15em] text-[#3e4cff]">current operating notes</p><p>01. learn by doing</p><p>02. document the weird parts</p><p>03. stay curious longer</p></div></div><div className="mt-20 grid gap-4 border-t border-black pt-4 text-[10px] uppercase tracking-[.12em] sm:grid-cols-3"><span>favorite environment: Parrot OS</span><span>public trail: Telegram</span><span>default state: learning</span></div></section>

      <section id="work" className="scene-section grain bg-[#221f1b] px-5 py-24 text-[#ede5d7] sm:px-10 lg:px-16 lg:py-36"><div data-reveal className="mb-14 flex flex-wrap items-end justify-between gap-5"><div><p className="signal-mono mb-3 text-[10px] uppercase tracking-[.2em] text-[#ed8b5a]">02 / labs — index active</p><h2 className="signal-display text-6xl leading-[.9] sm:text-8xl">Things I’m<br /><em>figuring out.</em></h2></div><p className="signal-prose max-w-xs text-base leading-6 text-[#ede5d7]/75">A work index for experiments, systems, notes, and the public trail. Open a record for the longer version.</p></div><div className="route-line mb-3 w-full opacity-70" /><div className="archive-hint signal-mono mb-5 flex items-center justify-between text-[9px] uppercase tracking-[.16em] text-[#ede5d7]/50"><span>ARCHIVE / OPEN RECORD</span><span>ESC TO CLOSE · 03 ACTIVE TRACES</span></div><div className="border-y border-[#ede5d7]/35">{projects.map((project, index) => { const isOpen = activeProject === index; return <div key={project.code} className={`project-record ${isOpen ? "is-open" : ""}`}><button data-cursor="OPEN RECORD" className="group grid w-full gap-4 py-6 text-left sm:grid-cols-[90px_1fr_150px_30px] sm:items-center" onClick={() => setActiveProject(isOpen ? null : index)} aria-expanded={isOpen}><span className="signal-mono text-[10px] text-[#ed8b5a]">{project.code}</span><span className="signal-condensed text-4xl uppercase leading-none transition group-hover:translate-x-2 group-hover:text-[#3e4cff] sm:text-5xl">{project.title}</span><span className="signal-mono text-[10px] uppercase text-[#ede5d7]/55">{project.status}<br />{project.year}</span><span className="text-[#3e4cff]">{isOpen ? <X size={18} /> : <ArrowUpRight size={18} />}</span></button><div className="project-detail"><div className="grid gap-8 border-t border-[#ede5d7]/25 py-8 sm:grid-cols-[90px_1.2fr_1fr]"><div className="signal-mono text-[10px] uppercase text-[#ed8b5a]">trace<br />0{index + 1}</div><div><p className="signal-prose mb-5 text-lg leading-7">{project.description}</p><p className="signal-mono text-[10px] uppercase tracking-[.12em] text-[#ed8b5a]">{project.type}</p><p className="signal-mono mt-6 border-l border-[#3e4cff] pl-3 text-[10px] uppercase leading-5 text-[#ede5d7]/55">evidence trail / {project.tags.join(" → ")}</p><div className="mt-7 grid grid-cols-2 gap-2">{project.media.map((frame, frameIndex) => <button key={frame} data-cursor="VIEW FRAME" onClick={() => setActiveMedia({ project: index, frame: frameIndex })} className="evidence-thumb"><ImageIcon size={15} /><span>{frame}</span><ArrowUpRight size={13} /></button>)}</div></div><div><p className="signal-mono mb-4 text-[10px] uppercase tracking-[.12em]">what stayed with me</p><ul className="space-y-2 text-sm text-[#ede5d7]/75">{project.learnings.map((learning) => <li key={learning}>// {learning}</li>)}</ul><div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="border border-[#ede5d7]/30 px-2 py-1 text-[10px] uppercase">{tag}</span>)}</div></div></div></div></div>; })}</div></section>

      <section id="featured" className="scene-section grain signal-relay-scene relative overflow-hidden bg-[#3e4cff] px-5 py-24 text-[#f4efe5] sm:px-10 lg:min-h-[100svh] lg:px-16 lg:py-32"><div className="signal-relay-scene__grid" /><div className="absolute -right-20 top-10 h-72 w-72 rounded-full border-[1px] border-[#f4efe5]/35 lg:h-[520px] lg:w-[520px] scene-orbit" /><div className="absolute right-16 top-32 h-2 w-2 rounded-full bg-[#ed8b5a] shadow-[0_0_0_8px_#3e4cff,0_0_0_9px_#ed8b5a]" /><div className="relative z-10 flex min-h-[660px] flex-col justify-between"><div data-reveal className="signal-relay-scene__heading"><p className="signal-mono mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-[#ed8b5a]"><BrandMark /> 03 / signal — relay active</p><h2 className="signal-condensed max-w-2xl text-7xl font-bold uppercase leading-[.78] tracking-[-.04em] sm:text-[9rem]">Follow<br /><span className="text-[#ed8b5a]">the signal.</span></h2><p className="signal-prose mt-6 max-w-sm text-base leading-6 text-[#f4efe5]/80">Every stop leaves a trace. Every trace opens another question.</p></div><div data-reveal className="signal-relay-console" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { dragStart.current = null; }}><div className="signal-relay-console__head"><span>route / zxo-03</span><span>status / {current.label}</span></div><div className="signal-relay-route" aria-label="Signal route stops">{featured.map((stop, index) => <button key={stop.code} data-cursor={`STOP ${stop.code}`} className={index === featuredIndex ? "is-active" : ""} onClick={() => { setSlideDirection(index >= featuredIndex ? "next" : "prev"); setFeaturedIndex(index); }}><i /><span>{stop.code}</span><small>{stop.label}</small></button>)}</div><div className={`signal-relay-readout signal-relay-readout--${slideDirection}`} key={current.code}><div><span className="signal-mono text-[10px] uppercase tracking-[.12em]">{current.code} / {current.label}</span><h3 className="signal-display mt-3 text-5xl leading-[.86] sm:text-7xl">{current.title}</h3><p className="signal-prose mt-5 max-w-xl text-base leading-7 text-[#f4efe5]/80 sm:text-lg">{current.detail}</p></div><strong className="signal-condensed">{current.metric}</strong></div><div className="signal-relay-console__footer"><div className="flex items-center gap-3"><button data-cursor="PREV" aria-label="Previous featured item" className="grid h-10 w-10 place-items-center border border-[#f4efe5] transition hover:bg-[#f4efe5] hover:text-[#3e4cff]" onClick={() => changeFeatured(-1)}><ArrowLeft size={16} /></button><span className="signal-mono text-[10px] uppercase">{featuredIndex + 1} / {featured.length}</span><button data-cursor="NEXT" aria-label="Next featured item" className="grid h-10 w-10 place-items-center border border-[#f4efe5] transition hover:bg-[#f4efe5] hover:text-[#3e4cff]" onClick={() => changeFeatured(1)}><ArrowRight size={16} /></button></div><button data-cursor="STEP OUT" className="terminal-step-out" onClick={() => goTo("work")}>STEP OUT / INSPECT LABS <ArrowUpRight size={13} /></button></div></div></div></section>

      <section id="visuals" className="scene-section grain relative bg-[#ede5d7] px-5 py-24 sm:px-10 lg:px-16 lg:py-36"><div data-reveal className="mb-16 grid gap-8 lg:grid-cols-[1fr_.8fr]"><div><p className="signal-mono mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-[#3e4cff]"><BrandMark /> 04 / notes — visual fragments</p><h2 className="signal-display text-6xl leading-[.9] sm:text-8xl">A brain full<br /><em>of tabs.</em></h2></div><p className="signal-prose max-w-sm self-end text-base leading-6">Screenshots will come later. For now, the visual language is made from signal, texture, terminal geometry, and the small satisfaction of a route finally making sense.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div data-reveal data-cursor="INSPECT" className="offset-rule aspect-[4/5] rotate-[-2deg] bg-[#3e4cff] p-4 text-[#f4efe5]"><div className="flex justify-between text-[10px]"><span>01</span><BrandMark /></div><div className="flex h-full items-center justify-center"><p className="signal-condensed text-center text-5xl uppercase leading-[.8]">curious<br /><span className="text-[#ed8b5a]">by<br />default</span></p></div></div><div data-reveal data-cursor="INSPECT" className="aspect-[4/5] border border-black bg-[#ed8b5a] p-4"><div className="flex justify-between text-[10px]"><span>02</span><BrandMark /></div><div className="mt-16 space-y-3 text-[10px] uppercase"><div className="border-b border-black/50 pb-2">parrot_os — open</div><div className="border-b border-black/50 pb-2">telegram — active</div><div className="border-b border-black/50 pb-2">learning — ongoing</div></div><div className="mt-16 text-right text-6xl">?</div></div><div data-reveal data-cursor="INSPECT" className="relative aspect-[4/5] overflow-hidden bg-[#221f1b] p-4 text-[#ede5d7]"><div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3e4cff] shadow-[0_0_0_20px_#221f1b,0_0_0_21px_#3e4cff] scene-orbit" /><div className="relative flex justify-between text-[10px]"><span>03</span><BrandMark /></div><p className="signal-mono absolute bottom-4 left-4 text-[10px] uppercase">signal acquired</p></div><div data-reveal data-cursor="INSPECT" className="aspect-[4/5] border border-black bg-[#e5dccd] p-4"><div className="flex justify-between text-[10px]"><span>04</span><ArrowUpRight size={14} /></div><div className="mt-16 h-px bg-black" /><div className="mt-2 h-px bg-[#3e4cff]" /><div className="mt-20"><p className="signal-display text-5xl leading-[.85]">Keep<br /><em>digging.</em></p></div><p className="signal-mono mt-20 text-[10px] uppercase">note to self / repeat</p></div></div></section>

      <section id="contact" className="scene-section grain relative overflow-hidden bg-[#221f1b] px-5 py-24 text-[#ede5d7] sm:px-10 lg:px-16 lg:py-36"><div className="absolute -left-24 bottom-[-140px] h-80 w-80 rounded-full border border-[#3e4cff] shadow-[0_0_0_24px_#221f1b,0_0_0_25px_#3e4cff] scene-orbit" /><div data-reveal className="relative z-10 grid gap-16 lg:grid-cols-[1fr_.8fr]"><div><p className="signal-mono mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-[#ed8b5a]"><BrandMark /> 05 / contact — transmission end</p><h2 className="signal-display max-w-4xl text-6xl leading-[.88] sm:text-8xl lg:text-[9rem]">Say hi<br /><em>before</em><br />overthinking it.</h2><a data-cursor="MAIL" href="mailto:hello@zxornatoe.dev" className="group mt-12 inline-flex items-center gap-3 border-b border-[#ede5d7] pb-2 text-lg transition hover:text-[#3e4cff]">hello@zxornatoe.dev <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div><div className="flex flex-col justify-end gap-8 lg:pb-3"><p className="signal-prose max-w-sm text-base leading-6 text-[#ede5d7]/80">If you like learning in public, opening the terminal again, or following a weird question until it turns into something useful, we’ll probably get along.</p><div className="grid gap-2 text-xs uppercase"><a data-cursor="TELEGRAM" className="flex items-center justify-between border-t border-[#ede5d7]/30 py-3 transition hover:text-[#3e4cff]" href="https://t.me/zxornatoe" target="_blank" rel="noreferrer"><span className="flex items-center gap-3"><Send size={15} /> Telegram</span><ArrowUpRight size={14} /></a><a data-cursor="GITHUB" className="flex items-center justify-between border-t border-[#ede5d7]/30 py-3 transition hover:text-[#3e4cff]" href="https://github.com/zxornatoe" target="_blank" rel="noreferrer"><span className="flex items-center gap-3"><Github size={15} /> GitHub</span><ArrowUpRight size={14} /></a><button data-cursor="COPY" className="flex items-center justify-between border-t border-[#ede5d7]/30 py-3 text-left uppercase transition hover:text-[#3e4cff]" onClick={copyHandle}><span className="flex items-center gap-3"><Copy size={15} /> {copied ? "Handle copied" : "Copy Telegram handle"}</span><span className="signal-mono text-[10px]">@zxornatoe</span></button></div></div></div><footer className="relative z-10 mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-[#ede5d7]/30 pt-4 text-[10px] uppercase tracking-[.14em] text-[#ede5d7]/55"><span>built from curiosity / powered by late tabs</span><span>zxornatoe © 2026</span><a data-cursor="TOP" href="#home" onClick={(e) => { e.preventDefault(); goTo("home"); }}>back to top ↑</a></footer></section>
      </div>
      {activeMedia && <div className="media-drawer" role="dialog" aria-modal="true" aria-labelledby="media-drawer-title"><div className="media-drawer__bar"><span className="signal-mono text-[10px] uppercase">evidence frame / {projects[activeMedia.project].code}</span><button data-cursor="CLOSE" onClick={() => setActiveMedia(null)} aria-label="Close evidence frame"><X size={18} /></button></div><div className={`evidence-frame evidence-frame--${activeMedia.frame}`}><div className="evidence-frame__grid" /><ScanLine size={28} /><span className="signal-mono">{projects[activeMedia.project].media[activeMedia.frame]}</span><strong id="media-drawer-title">{projects[activeMedia.project].title}</strong><small>{projects[activeMedia.project].tags.join(" / ")}</small><i>{String(activeMedia.frame + 1).padStart(2, "0")} / 02</i></div><p className="signal-prose max-w-md text-center text-lg">Visual evidence placeholder — replace this frame with a real project screenshot or experiment artifact when the work is ready.</p></div>}
    </main>
  );
}
