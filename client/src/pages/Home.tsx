import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Copy, Github, Menu, Radio, Send, Terminal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// STYLE NOTE: Signal / Clay / Blue — asymmetrical narrative sections, clay paper
// fields, signal-blue chapters, and terminal metadata carry Zxornatoe’s voice.

type Project = {
  code: string;
  title: string;
  type: string;
  status: string;
  year: string;
  description: string;
  learnings: string[];
  tags: string[];
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

function BrandMark({ hero = false }: { hero?: boolean }) {
  return <span aria-hidden="true" className={`brand-mark ${hero ? "brand-mark--hero" : ""}`} />;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
}

export default function Home() {
  const progress = useScrollProgress();
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const current = featured[featuredIndex];
  const progressLabel = useMemo(() => `${Math.round(progress).toString().padStart(2, "0")}%`, [progress]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setFeaturedIndex((value) => (value + 1) % featured.length);
      if (event.key === "ArrowLeft") setFeaturedIndex((value) => (value - 1 + featured.length) % featured.length);
      if (event.key === "Escape") { setActiveProject(null); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const copyHandle = async () => {
    await navigator.clipboard?.writeText("@zxornatoe");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="overflow-hidden bg-[#ede5d7] text-[#221f1b]">
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-black/15 bg-[#ede5d7]/85 px-4 py-2 backdrop-blur-md sm:px-6">
        <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.14em] sm:text-xs">
          <button className="signal-mono flex items-center gap-2 font-semibold" onClick={() => goTo("home")} aria-label="Go to home"><span className="grid h-7 w-7 place-items-center bg-[#3e4cff] text-[#ede5d7]"><BrandMark /></span><span className="hidden lowercase tracking-[-0.08em] sm:inline">zxornatoe <span className="opacity-45">/ signal portfolio</span></span><span className="sm:hidden">zx / 01</span></button>
          <div className="hidden flex-1 items-center justify-center gap-3 sm:flex"><span className="opacity-55">SYS.TRACK_ACTIVE</span><span className="h-px w-12 bg-black/35" /><span>LEARNING / 2026</span></div>
          <div className="flex items-center gap-3"><span className="signal-mono tabular-nums">{progressLabel}</span><button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={16} /> : <Menu size={16} />}</button></div>
        </div>
        <div className="mt-2 h-1 bg-black/10"><div className="h-full bg-[#3e4cff] transition-[width] duration-300" style={{ width: `${progress}%` }} /></div>
        {menuOpen && <nav className="absolute left-0 right-0 top-full grid grid-cols-3 gap-px border-b border-black bg-[#ede5d7] p-2 sm:hidden">{navItems.map(([id, label]) => <button className="border border-black/15 px-2 py-3 text-left text-[10px] uppercase" key={id} onClick={() => goTo(id)}>{label}</button>)}</nav>}
      </header>

      <nav className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 border border-black bg-[#ede5d7] p-1 shadow-[5px_5px_0_#221f1b] sm:block" aria-label="Section navigation"><div className="flex items-center gap-1">{navItems.map(([id, label], index) => <button key={id} onClick={() => goTo(id)} className={`px-3 py-2 text-[10px] uppercase tracking-[0.12em] transition hover:bg-[#3e4cff] hover:text-[#ede5d7] ${index === 0 ? "bg-[#3e4cff] text-[#ede5d7]" : ""}`}>{label}</button>)}</div></nav>

      <section id="home" className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-[#3e4cff] px-5 pb-16 pt-32 text-[#f4efe5] sm:px-10 lg:px-16"><div className="absolute inset-0 opacity-50 [background-image:linear-gradient(125deg,transparent_0_48%,rgba(244,239,229,.24)_48.2%,transparent_48.5%),linear-gradient(25deg,transparent_0_65%,rgba(20,15,15,.3)_65.2%,transparent_65.5%)]" /><div className="absolute left-[9%] top-[23%] h-[42vw] w-[42vw] max-h-[540px] max-w-[540px] rounded-full bg-[#191512] shadow-[18px_18px_0_rgba(244,239,229,.16)]" /><div className="absolute left-[11%] top-[31%] h-px w-[32vw] bg-[#f4efe5]/60" /><div className="absolute right-[8%] top-[22%] hidden w-56 rotate-3 border border-[#f4efe5]/70 p-3 font-mono text-[10px] uppercase leading-5 lg:block"><span className="text-[#ed8b5a]">status: curious</span><br />second love: parrot os<br />signal: telegram<br />mode: learning</div><div className="relative z-10 w-full"><div className="mb-10 flex items-center gap-4 sm:ml-[8%]"><BrandMark hero /><p className="signal-mono text-[10px] uppercase tracking-[0.18em]">Zxornatoe / independent learner / systems curious</p></div><div className="grid items-end gap-8 lg:grid-cols-[.7fr_1.7fr_.7fr]"><div className="order-2 space-y-6 text-xs leading-5 lg:order-1 lg:pb-8"><span className="clip-label inline-block bg-[#ed8b5a] px-3 py-1 text-[#221f1b]">01 — the intro</span><p className="signal-prose text-base">My second love is Parrot OS.<br />The first one is still under investigation.</p><a className="inline-flex items-center gap-2 border-b border-[#f4efe5] pb-1" href="#about" onClick={(e) => { e.preventDefault(); goTo("about"); }}>keep scrolling <ArrowDown size={13} /></a></div><h1 className="signal-display order-1 max-w-4xl text-[17vw] font-semibold leading-[.78] tracking-[-0.08em] lg:order-2 lg:text-[15vw]">zxorna<span className="text-[#ed8b5a]">t</span>oe</h1><div className="order-3 justify-self-end pb-2 text-right text-[11px] uppercase tracking-[.12em] lg:pb-8"><span className="block border-b border-[#f4efe5]/60 pb-2">learning the stuff</span><span className="block pt-2 text-[#ed8b5a]">is the actual flex</span></div></div></div><div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[.16em] sm:left-10 sm:right-10"><span>SCROLL DOWN</span><span>∞ / 100</span><span className="hidden sm:inline">BUILT FROM CURIOSITY</span></div></section>

      <div className="signal-ticker flex gap-10 overflow-hidden border-y border-black bg-[#221f1b] px-4 py-3 text-[10px] uppercase tracking-[.2em] text-[#ede5d7]"><span>signal ticker — parrot_os / telegram / always_learning / no fake guru energy</span><span aria-hidden="true">signal ticker — parrot_os / telegram / always_learning</span></div>

      <section id="about" className="grain relative bg-[#ede5d7] px-5 py-24 sm:px-10 lg:px-16 lg:py-36"><div className="absolute right-8 top-12 hidden text-[#3e4cff] lg:block"><BrandMark /></div><div className="mb-16 flex items-start justify-between gap-6"><div><p className="signal-mono mb-3 text-[10px] uppercase tracking-[.2em] text-[#3e4cff]">01 / origin — the learning log</p><h2 className="signal-display max-w-3xl text-5xl leading-[.95] sm:text-7xl lg:text-8xl">I keep pulling<br /><em>the thread.</em></h2></div><span className="signal-mono hidden pt-1 text-[10px] uppercase sm:block">open book / no final form</span></div><div className="route-line mb-8 w-full" /><div className="grid gap-12 lg:grid-cols-[.8fr_1.4fr_.7fr] lg:items-end"><div className="offset-rule rotate-[-3deg] border border-black bg-[#3e4cff] p-6 text-[#f4efe5]"><Terminal size={24} /><p className="signal-condensed mt-10 text-4xl uppercase leading-[.85]">Started with<br />questions.<br /><span className="text-[#ed8b5a]">Stayed for<br />the rabbit hole.</span></p><p className="signal-mono mt-12 text-[10px] uppercase leading-5">note / curiosity has<br />excellent uptime</p></div><div className="signal-prose space-y-8 text-lg leading-[1.55] sm:text-2xl"><p>I love hacking, cracking, and techy things — the ethical kind, the kind that happens in labs, write-ups, and authorised spaces where learning is the point.</p><p className="max-w-2xl">I’m active on Telegram, collecting better questions and sharing the things I’m learning. I don’t pretend to know everything. I just keep opening the next tab.</p></div><div className="border-t border-black pt-4 text-xs leading-5"><p className="mb-6 uppercase tracking-[.15em] text-[#3e4cff]">current operating notes</p><p>01. learn by doing</p><p>02. document the weird parts</p><p>03. stay curious longer</p></div></div><div className="mt-20 grid gap-4 border-t border-black pt-4 text-[10px] uppercase tracking-[.12em] sm:grid-cols-3"><span>favorite environment: Parrot OS</span><span>public trail: Telegram</span><span>default state: learning</span></div></section>

      <section id="work" className="grain bg-[#221f1b] px-5 py-24 text-[#ede5d7] sm:px-10 lg:px-16 lg:py-36"><div className="mb-14 flex flex-wrap items-end justify-between gap-5"><div><p className="signal-mono mb-3 text-[10px] uppercase tracking-[.2em] text-[#ed8b5a]">02 / labs — index active</p><h2 className="signal-display text-6xl leading-[.9] sm:text-8xl">Things I’m<br /><em>figuring out.</em></h2></div><p className="signal-prose max-w-xs text-base leading-6 text-[#ede5d7]/75">A work index for experiments, systems, notes, and the public trail. Open a record for the longer version.</p></div><div className="route-line mb-5 w-full opacity-70" /><div className="border-y border-[#ede5d7]/35">{projects.map((project, index) => <div key={project.code} className="border-b border-[#ede5d7]/25 last:border-0"><button className="group grid w-full gap-4 py-6 text-left sm:grid-cols-[90px_1fr_150px_30px] sm:items-center" onClick={() => setActiveProject(activeProject === index ? null : index)} aria-expanded={activeProject === index}><span className="signal-mono text-[10px] text-[#ed8b5a]">{project.code}</span><span className="signal-condensed text-4xl uppercase leading-none transition group-hover:translate-x-2 group-hover:text-[#3e4cff] sm:text-5xl">{project.title}</span><span className="signal-mono text-[10px] uppercase text-[#ede5d7]/55">{project.status}<br />{project.year}</span><span className="text-[#3e4cff]">{activeProject === index ? <X size={18} /> : <ArrowUpRight size={18} />}</span></button>{activeProject === index && <div className="grid gap-8 border-t border-[#ede5d7]/25 py-8 sm:grid-cols-[90px_1.2fr_1fr]"><div className="signal-mono text-[10px] uppercase text-[#ed8b5a]">trace<br />0{index + 1}</div><div><p className="signal-prose mb-5 text-lg leading-7">{project.description}</p><p className="signal-mono text-[10px] uppercase tracking-[.12em] text-[#ed8b5a]">{project.type}</p><p className="signal-mono mt-6 border-l border-[#3e4cff] pl-3 text-[10px] uppercase leading-5 text-[#ede5d7]/55">evidence trail / {project.tags.join(" → ")}</p></div><div><p className="signal-mono mb-4 text-[10px] uppercase tracking-[.12em]">what stayed with me</p><ul className="space-y-2 text-sm text-[#ede5d7]/75">{project.learnings.map((learning) => <li key={learning}>// {learning}</li>)}</ul><div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="border border-[#ede5d7]/30 px-2 py-1 text-[10px] uppercase">{tag}</span>)}</div></div></div>}</div>)}</div></section>

      <section id="featured" className="grain relative overflow-hidden bg-[#3e4cff] px-5 py-24 text-[#f4efe5] sm:px-10 lg:min-h-[100svh] lg:px-16 lg:py-32"><div className="absolute -right-20 top-16 h-72 w-72 rounded-full border-[1px] border-[#f4efe5]/35 lg:h-[520px] lg:w-[520px]" /><div className="absolute right-16 top-32 h-2 w-2 rounded-full bg-[#ed8b5a] shadow-[0_0_0_8px_#3e4cff,0_0_0_9px_#ed8b5a]" /><div className="relative z-10 flex h-full min-h-[620px] flex-col justify-between"><div className="flex items-start justify-between gap-5"><div><p className="signal-mono mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-[#ed8b5a]"><BrandMark /> 03 / signal — featured trail</p><h2 className="signal-condensed max-w-2xl text-7xl font-bold uppercase leading-[.8] tracking-[-.03em] sm:text-[9rem]">Open<br />channel.</h2></div><div className="hidden max-w-[190px] text-right text-[10px] uppercase leading-5 lg:block">Use arrow keys<br />or the controls<br />to browse the route.</div></div><div className="grid items-end gap-12 lg:grid-cols-[1fr_.8fr]"><div className="max-w-2xl"><div className="mb-6 flex items-center gap-3"><span className="signal-mono text-[10px]">{current.code} / {current.label}</span><span className="h-px flex-1 bg-[#f4efe5]/40" /></div><h3 className="signal-display min-h-[100px] text-5xl leading-[.95] sm:text-7xl">{current.title}</h3><p className="signal-prose mt-8 max-w-xl text-base leading-7 text-[#f4efe5]/85 sm:text-xl">{current.detail}</p><div className="mt-8 flex items-center gap-3"><button aria-label="Previous featured item" className="grid h-11 w-11 place-items-center border border-[#f4efe5] transition hover:bg-[#f4efe5] hover:text-[#3e4cff]" onClick={() => setFeaturedIndex((featuredIndex - 1 + featured.length) % featured.length)}><ArrowLeft size={17} /></button><button aria-label="Next featured item" className="grid h-11 w-11 place-items-center border border-[#f4efe5] transition hover:bg-[#f4efe5] hover:text-[#3e4cff]" onClick={() => setFeaturedIndex((featuredIndex + 1) % featured.length)}><ArrowRight size={17} /></button><span className="signal-mono ml-3 text-[10px] uppercase">{featuredIndex + 1} / {featured.length}</span></div></div><div className="justify-self-start border-l border-[#f4efe5]/50 pl-6 lg:justify-self-end"><p className="signal-condensed text-8xl leading-none text-[#ed8b5a]">{current.metric}</p><p className="signal-mono mt-2 text-[10px] uppercase tracking-[.16em]">{current.metricLabel}</p></div></div></div></section>

      <section id="visuals" className="grain relative bg-[#ede5d7] px-5 py-24 sm:px-10 lg:px-16 lg:py-36"><div className="mb-16 grid gap-8 lg:grid-cols-[1fr_.8fr]"><div><p className="signal-mono mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-[#3e4cff]"><BrandMark /> 04 / notes — visual fragments</p><h2 className="signal-display text-6xl leading-[.9] sm:text-8xl">A brain full<br /><em>of tabs.</em></h2></div><p className="signal-prose max-w-sm self-end text-base leading-6">Screenshots will come later. For now, the visual language is made from signal, texture, terminal geometry, and the small satisfaction of a route finally making sense.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div className="offset-rule aspect-[4/5] rotate-[-2deg] bg-[#3e4cff] p-4 text-[#f4efe5]"><div className="flex justify-between text-[10px]"><span>01</span><BrandMark /></div><div className="flex h-full items-center justify-center"><p className="signal-condensed text-center text-5xl uppercase leading-[.8]">curious<br /><span className="text-[#ed8b5a]">by<br />default</span></p></div></div><div className="aspect-[4/5] border border-black bg-[#ed8b5a] p-4"><div className="flex justify-between text-[10px]"><span>02</span><BrandMark /></div><div className="mt-16 space-y-3 text-[10px] uppercase"><div className="border-b border-black/50 pb-2">parrot_os — open</div><div className="border-b border-black/50 pb-2">telegram — active</div><div className="border-b border-black/50 pb-2">learning — ongoing</div></div><div className="mt-16 text-right text-6xl">?</div></div><div className="relative aspect-[4/5] overflow-hidden bg-[#221f1b] p-4 text-[#ede5d7]"><div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3e4cff] shadow-[0_0_0_20px_#221f1b,0_0_0_21px_#3e4cff]" /><div className="relative flex justify-between text-[10px]"><span>03</span><BrandMark /></div><p className="signal-mono absolute bottom-4 left-4 text-[10px] uppercase">signal acquired</p></div><div className="aspect-[4/5] border border-black bg-[#e5dccd] p-4"><div className="flex justify-between text-[10px]"><span>04</span><ArrowUpRight size={14} /></div><div className="mt-16 h-px bg-black" /><div className="mt-2 h-px bg-[#3e4cff]" /><div className="mt-20"><p className="signal-display text-5xl leading-[.85]">Keep<br /><em>digging.</em></p></div><p className="signal-mono mt-20 text-[10px] uppercase">note to self / repeat</p></div></div></section>

      <section id="contact" className="grain relative overflow-hidden bg-[#221f1b] px-5 py-24 text-[#ede5d7] sm:px-10 lg:px-16 lg:py-36"><div className="absolute -left-24 bottom-[-140px] h-80 w-80 rounded-full border border-[#3e4cff] shadow-[0_0_0_24px_#221f1b,0_0_0_25px_#3e4cff]" /><div className="relative z-10 grid gap-16 lg:grid-cols-[1fr_.8fr]"><div><p className="signal-mono mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-[#ed8b5a]"><BrandMark /> 05 / contact — transmission end</p><h2 className="signal-display max-w-4xl text-6xl leading-[.88] sm:text-8xl lg:text-[9rem]">Say hi<br /><em>before</em><br />overthinking it.</h2><a href="mailto:hello@zxornatoe.dev" className="group mt-12 inline-flex items-center gap-3 border-b border-[#ede5d7] pb-2 text-lg transition hover:text-[#3e4cff]">hello@zxornatoe.dev <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div><div className="flex flex-col justify-end gap-8 lg:pb-3"><p className="signal-prose max-w-sm text-base leading-6 text-[#ede5d7]/80">If you like learning in public, opening the terminal again, or following a weird question until it turns into something useful, we’ll probably get along.</p><div className="grid gap-2 text-xs uppercase"><a className="flex items-center justify-between border-t border-[#ede5d7]/30 py-3 transition hover:text-[#3e4cff]" href="https://t.me/zxornatoe" target="_blank" rel="noreferrer"><span className="flex items-center gap-3"><Send size={15} /> Telegram</span><ArrowUpRight size={14} /></a><a className="flex items-center justify-between border-t border-[#ede5d7]/30 py-3 transition hover:text-[#3e4cff]" href="https://github.com/zxornatoe" target="_blank" rel="noreferrer"><span className="flex items-center gap-3"><Github size={15} /> GitHub</span><ArrowUpRight size={14} /></a><button className="flex items-center justify-between border-t border-[#ede5d7]/30 py-3 text-left uppercase transition hover:text-[#3e4cff]" onClick={copyHandle}><span className="flex items-center gap-3"><Copy size={15} /> {copied ? "Handle copied" : "Copy Telegram handle"}</span><span className="signal-mono text-[10px]">@zxornatoe</span></button></div></div></div><footer className="relative z-10 mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-[#ede5d7]/30 pt-4 text-[10px] uppercase tracking-[.14em] text-[#ede5d7]/55"><span>built from curiosity / powered by late tabs</span><span>zxornatoe © 2026</span><a href="#home" onClick={(e) => { e.preventDefault(); goTo("home"); }}>back to top ↑</a></footer></section>
    </main>
  );
}
