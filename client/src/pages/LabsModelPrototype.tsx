import { useEffect, useLayoutEffect, useRef, useState } from "react";

// STYLE NOTE: Isolated Signal / Clay / Blue prototype — the model must feel like a physical cyber-artifact crossing the editorial copy, while the picker remains neutral harness chrome.

type Variant = {
  name: string;
  code: string;
  title: string;
  detail: string;
  cue: string;
};

const variants: Variant[] = [
  {
    name: "Signal Orb",
    code: "01 / orbital index",
    title: "A question with gravity.",
    detail: "A wireframe learning orb hovers in front of the copy, rotating only when the route changes. It makes the Labs intro feel like a discovered instrument.",
    cue: "quiet / dimensional / curious",
  },
  {
    name: "Terminal Totem",
    code: "02 / stacked console",
    title: "The machine keeps receipts.",
    detail: "A compact terminal sculpture sits over the headline like a physical desk object, with a blue cursor pulse and stacked paper plates for depth.",
    cue: "tactile / technical / grounded",
  },
  {
    name: "Prism Relay",
    code: "03 / refracted signal",
    title: "Evidence changes angle.",
    detail: "A faceted blue-and-clay prism crosses the intro copy and refracts the section title into a small, kinetic signal marker.",
    cue: "graphic / sharp / alive",
  },
];

function Model({ index }: { index: number }) {
  if (index === 1) {
    return <div className="labs-model__terminal" aria-hidden="true"><div className="labs-model__terminal-screen"><span>zx://labs</span><strong>?</strong><i /></div><div className="labs-model__terminal-plate labs-model__terminal-plate--one" /><div className="labs-model__terminal-plate labs-model__terminal-plate--two" /><div className="labs-model__terminal-base" /></div>;
  }
  if (index === 2) {
    return <div className="labs-model__prism" aria-hidden="true"><span className="labs-model__prism-face labs-model__prism-face--front" /><span className="labs-model__prism-face labs-model__prism-face--side" /><span className="labs-model__prism-face labs-model__prism-face--top" /><i /><b>03</b></div>;
  }
  return <div className="labs-model__orb" aria-hidden="true"><span className="labs-model__orb-ring labs-model__orb-ring--a" /><span className="labs-model__orb-ring labs-model__orb-ring--b" /><span className="labs-model__orb-ring labs-model__orb-ring--c" /><div className="labs-model__orb-core"><strong>?</strong><small>trace</small></div><i className="labs-model__orb-node labs-model__orb-node--a" /><i className="labs-model__orb-node labs-model__orb-node--b" /></div>;
}

export default function LabsModelPrototype() {
  const pickerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [current, setCurrent] = useState(() => Math.max(0, Math.min(variants.length - 1, (Number(new URLSearchParams(window.location.search).get("v")) || 1) - 1)));
  const [replayKey, setReplayKey] = useState(0);

  useLayoutEffect(() => {
    const moveHighlight = () => {
      const item = itemRefs.current[current];
      const highlight = pickerRef.current?.querySelector<HTMLElement>(".proto-picker-highlight");
      if (!item || !highlight) return;
      highlight.style.width = `${item.offsetWidth}px`;
      highlight.style.transform = `translateX(${item.offsetLeft}px)`;
    };
    moveHighlight();
    window.addEventListener("resize", moveHighlight);
    requestAnimationFrame(() => requestAnimationFrame(() => pickerRef.current?.setAttribute("data-ready", "")));
    return () => window.removeEventListener("resize", moveHighlight);
  }, [current]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowRight") setCurrent((value) => (value + 1) % variants.length);
      else if (event.key === "ArrowLeft") setCurrent((value) => (value - 1 + variants.length) % variants.length);
      else if (event.key.toLowerCase() === "r") setReplayKey((value) => value + 1);
      else if (/^[1-3]$/.test(event.key)) setCurrent(Number(event.key) - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(current + 1));
    window.history.replaceState(null, "", url);
  }, [current]);

  const variant = variants[current];

  return <main className="labs-model-prototype">
    <header className="labs-model-prototype__top"><a href="/">← back to portfolio</a><span>isolated visual study / production untouched</span><b>LABS / MODEL TEST</b></header>
    <section className="labs-model-prototype__intro"><p className="signal-mono">Three possible artifacts to place in front of the Labs introduction.</p><h1>Pick the object<br /><em>that carries the question.</em></h1><p className="labs-model-prototype__lede">These are separate visual directions, not a production change. Use the picker or keys <b>1–3</b> to compare the model's scale, overlap, and motion grammar against the exact Labs copy.</p></section>
    <section className="labs-model__stage" key={`${current}-${replayKey}`} aria-label={`${variant.name} visual model prototype`}>
      <div className="labs-model__wash" aria-hidden="true" />
      <div className={`labs-model__model labs-model__model--${current + 1}`}><Model index={current} /></div>
      <div className="labs-model__copy"><p className="signal-mono">02 / labs — source board / signal found</p><h2>Questions with a purpose.<br /><em>Proof gets messy.</em></h2><p>Same field, different evidence: Packet Weather, Parrot Hours, and Open Channel pinned to the learning trail.</p><span>model study / {variant.code}</span></div>
      <div className="labs-model__caption"><b>{variant.name}</b><span>{variant.cue}</span><p>{variant.detail}</p></div>
      <div className="labs-model__stamp">ZXORNATOE<br />LEARNING LAB</div>
    </section>
    <nav ref={pickerRef} className="proto-picker" aria-label="Prototype variants"><span className="proto-picker-highlight" aria-hidden="true" />{variants.map((item, index) => <button key={item.name} ref={(element) => { itemRefs.current[index] = element; }} className="proto-picker-item" data-active={current === index ? "" : undefined} aria-current={current === index ? "true" : undefined} onClick={() => setCurrent(index)}>{item.name}</button>)}<span className="proto-picker-divider" aria-hidden="true" /><button className="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" onClick={() => setReplayKey((value) => value + 1)}>↻</button></nav>
  </main>;
}
