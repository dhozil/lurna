import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, ShieldCheck, BrainCircuit, Lock, Globe,
  Trophy, ArrowRight, Check, Play, BookOpen,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SectionHeader } from "@/components/site/SectionHeader";
import { allCategories, GenLayerMark, BtcIcon } from "@/data/all-data";
import heroLearner from "@/assets/hero-learner.png";
import certificate3d from "@/assets/certificate-3d.png";
import iconLearn from "@/assets/icon-learn.png";
import iconAi from "@/assets/icon-ai.png";
import iconTrophy from "@/assets/icon-trophy.png";
import iconRocket from "@/assets/icon-rocket.png";
import iconGlobe from "@/assets/icon-globe.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lurna — Learn. Verify. Certify." },
      {
        name: "description",
        content:
          "Lurna is a GenLayer-powered learning platform where AI Consensus validates knowledge before issuing trusted on-chain credentials.",
      },
      { property: "og:title", content: "Lurna — Learn. Verify. Certify." },
      {
        property: "og:description",
        content:
          "AI Consensus learning platform that issues verifiable on-chain certificates.",
      },
    ],
  }),
  component: LurnaLanding,
});

function LurnaLanding() {
  return (
    <SiteShell>
      <Hero />
      <TrustStrip />
      <Features />
      <HowItWorks />
      <Categories />
      <CertificateShowcase />
      <Consensus />
      <CTA />
    </SiteShell>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div aria-hidden className="absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
      <div aria-hidden className="absolute -right-24 top-40 -z-10 h-72 w-72 rounded-full bg-[var(--mint)]/30 blur-3xl" />

      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 text-xs font-semibold text-foreground/80 shadow-card backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Powered by GenLayer AI Consensus
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Learn Anything,
            <br />
            <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.24_300)] bg-clip-text text-transparent">
              Prove Everything
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Lurna is a learning platform where AI Consensus validates what you
            actually know — then mints it as a verifiable on-chain certificate.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              search={{}}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              Start Learning Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground shadow-card transition-colors hover:bg-secondary"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                <Play className="h-3 w-3" fill="currentColor" />
              </span>
              See How It Works
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { v: "20+", l: "Categories" },
              { v: "100%", l: "On-Chain" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="text-2xl font-extrabold tracking-tight text-foreground">{s.v}</dt>
                <dd className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-[var(--lavender)] to-primary-soft" />
          <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-gradient-to-br from-[oklch(0.94_0.05_295)] to-[oklch(0.86_0.09_290)] p-4 shadow-glow">
            <img
              src={heroLearner}
              alt="Learner with laptop surrounded by AI icons"
              width={1024}
              height={1024}
              className="h-full w-full object-contain"
            />
            <FloatChip className="absolute left-4 top-10 animate-float" icon={<BrainCircuit className="h-4 w-4 text-primary" />} label="AI Consensus" sub="Multi-AI evaluation" />
            <FloatChip className="absolute right-4 top-20 animate-float-slow" icon={<ShieldCheck className="h-4 w-4 text-[oklch(0.55_0.17_175)]" />} label="On-Chain" sub="NFT Certificate" />
            <FloatChip className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float" icon={<Trophy className="h-4 w-4 text-[oklch(0.65_0.18_70)]" />} label="Proof of Knowledge" sub="Real competency" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatChip({ className, icon, label, sub }: { className?: string; icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className={"flex items-center gap-2.5 rounded-2xl border border-border/60 bg-card/95 px-3 py-2 shadow-card backdrop-blur " + (className ?? "")}>
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft">{icon}</div>
      <div className="pr-1 leading-tight">
        <div className="text-[12px] font-bold text-foreground">{label}</div>
        <div className="text-[10px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

function TrustStrip() {
  const items = ["GenLayer", "Web3", "Ethereum", "Supabase", "AI Consensus", "Smart Contracts"];
  return (
    <section className="border-y border-border/60 bg-card/60">
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Built on</span>
        {items.map((i) => (
          <span key={i} className="text-sm font-semibold text-foreground/70">{i}</span>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: iconAi, title: "AI Consensus Evaluation", desc: "Multiple AI agents independently grade your answers — the final score comes from their consensus, not one model alone.", tint: "from-[oklch(0.94_0.06_295)] to-[oklch(0.88_0.09_290)]" },
    { icon: iconTrophy, title: "On-Chain Certificate", desc: "Every credential is minted as an NFT. Permanent, transparent, and verifiable by anyone — anywhere.", tint: "from-[oklch(0.96_0.08_85)] to-[oklch(0.9_0.12_75)]" },
    { icon: iconLearn, title: "AI Summary Learning", desc: "Long material is distilled by AI into short, structured modules that are easy to digest at any level.", tint: "from-[oklch(0.94_0.06_180)] to-[oklch(0.88_0.1_175)]" },
    { icon: iconRocket, title: "Personalized Feedback", desc: "Find out exactly where you're strong, where you're weak, and what to study next.", tint: "from-[oklch(0.95_0.08_15)] to-[oklch(0.88_0.13_12)]" },
    { icon: iconGlobe, title: "Proof of Knowledge Profile", desc: "A public profile showcasing every on-chain credential you've earned — shareable with recruiters and peers.", tint: "from-[oklch(0.93_0.07_245)] to-[oklch(0.86_0.11_245)]" },
    { icon: iconAi, title: "Essay Grading Engine", desc: "Scenario-based essay questions evaluated by multi-agent AI consensus — depth and reasoning matter, not memorization.", tint: "from-[oklch(0.94_0.05_300)] to-[oklch(0.88_0.09_295)]" },
  ];

  return (
    <section className="mx-auto max-w-[90rem] px-5 py-20 md:py-28 lg:px-8">
      <SectionHeader eyebrow="Why Lurna" title="Learning you can actually prove" sub="Lurna blends curated lessons, AI Consensus grading, and on-chain certification into one seamless experience." />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <article key={f.title} className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
            <div className={`pointer-events-none absolute inset-0 opacity-[0.07] bg-gradient-to-br ${f.tint}`} />
            <div className={`mb-5 inline-grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br ${f.tint} shadow-lg`}>
              <img src={f.icon} alt="" width={64} height={64} loading="lazy" className="h-14 w-14 object-contain drop-shadow-sm" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", icon: BookOpen, title: "Choose a Category", desc: "Start from Blockchain, AI, Web3, Programming, and many more." },
    { n: "02", icon: Sparkles, title: "Read AI Summary", desc: "Concise modules curated by AI and subject experts." },
    { n: "03", icon: BrainCircuit, title: "Write Your Essay", desc: "Scenario-based essay questions that test your understanding, reasoning, and depth of knowledge." },
    { n: "04", icon: ShieldCheck, title: "AI Consensus Grades", desc: "Multi-agent AI evaluates and decides your final score." },
    { n: "05", icon: Trophy, title: "Certificate Minted", desc: "Pass and your NFT credential lands in your wallet." },
    { n: "06", icon: Globe, title: "Public Verification", desc: "Share your Proof of Knowledge link with anyone." },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-primary-soft/40 py-20 md:py-28">
      <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
        <SectionHeader eyebrow="How It Works" title="From learning to proof — in six steps" sub="A simple flow that turns every study session into a credential that lasts forever." />
        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-3xl border border-border/60 bg-card p-7 shadow-card">
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-3xl font-extrabold tracking-tight text-primary/30">{s.n}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const popularIds = ["Blockchain", "GenLayer", "AI", "Crypto", "Web3", "Smart Contracts", "Solidity", "JavaScript", "TypeScript", "React", "DeFi", "UI/UX Design"];

function Categories() {
  const cats = popularIds
    .map((id) => allCategories.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-[90rem] px-5 py-20 md:py-28 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Popular Categories</span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">20+ categories, from fundamentals to advanced</h2>
        </div>
        <Link to="/assessments" className="text-sm font-semibold text-primary hover:underline">See all categories →</Link>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {cats.map((c) => {
          const Icon = c!.icon;
          return (
            <div key={c!.id} className="flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-card p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-border/70 hover:shadow-md hover:cursor-default">
              <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${c!.tint} text-white shadow-sm transition-transform hover:scale-110`}>
                <Icon className="h-7 w-7" />
              </div>
              <span className="text-sm font-semibold text-foreground">{c!.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CertificateShowcase() {
  const features = [
    "NFT credential minted directly to your wallet",
    "Score & grade (A/B/C) signed by consensus",
    "Public verification link for recruiters",
    "Impossible to forge, never expires",
  ];
  return (
    <section className="py-20 text-primary-foreground md:py-28" style={{ background: "linear-gradient(135deg, oklch(0.22 0.08 275) 0%, oklch(0.18 0.1 285) 100%)" }}>
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-primary/30 blur-3xl" />
          <div className="mx-auto max-w-md rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur">
            <div className="flex items-center justify-between text-white/80">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--sun)]" />
                <span className="text-sm font-semibold">Lurna · Verified Certificate</span>
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">On-Chain</span>
            </div>
            <img src={certificate3d} alt="Lurna NFT certificate" width={768} height={768} loading="lazy" className="mx-auto my-6 h-56 w-56 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
            <h3 className="text-center text-2xl font-extrabold">Blockchain Fundamentals</h3>
            <p className="mt-1 text-center text-sm text-white/60">Issued to Lurna User · 2026</p>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50">Score</div>
                <div className="text-3xl font-extrabold">92/100</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50">Grade</div>
                <div className="text-3xl font-extrabold text-[var(--sun)]">A</div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">On-Chain Certificates</span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Credentials you can truly
            <span className="block bg-gradient-to-r from-white to-[var(--lavender)] bg-clip-text text-transparent">prove.</span>
          </h2>
          <p className="mt-5 max-w-lg text-white/70">
            Every Lurna certificate is issued as an NFT on GenLayer the moment
            AI Consensus confirms you've passed. Transparent, permanent,
            impossible to fake.
          </p>
          <ul className="mt-8 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-white/85">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-[var(--mint)] text-[oklch(0.2_0.05_280)]">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Link to="/certificates" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[oklch(0.22_0.08_280)] shadow-glow transition-transform hover:scale-[1.02]">
            View sample certificate
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Consensus() {
  return (
    <section className="mx-auto max-w-[90rem] px-5 py-20 md:py-28 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">AI Consensus</span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Many AIs grade. One fair result.</h2>
          <p className="mt-5 text-muted-foreground">
            Your answers — especially essays, case studies, and coding
            challenges — are evaluated by several independent AI agents. The
            final score is the consensus of all of them, reducing bias and
            keeping grading consistent.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: BrainCircuit, t: "Multi-agent review", s: "Each answer seen from multiple angles." },
              { icon: ShieldCheck, t: "Bias-resistant", s: "Never depends on a single model." },
              { icon: Sparkles, t: "Detailed feedback", s: "Know exactly why you got your score." },
              { icon: Lock, t: "Immutable results", s: "Scores are stored on-chain once final." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <b.icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-sm font-bold">{b.t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{b.s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 translate-y-6 rounded-[2.5rem] bg-primary-soft" />
          <div className="rounded-[2rem] border border-border/60 bg-card p-7 shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">How it works</div>
                <div className="text-lg font-extrabold">AI Consensus in action</div>
              </div>
              <span className="rounded-full bg-[var(--mint)]/20 px-3 py-1 text-xs font-bold text-[oklch(0.45_0.13_175)]">Consensus</span>
            </div>
            <div className="mt-6 rounded-2xl bg-primary-soft p-4 text-sm text-foreground/80">
              <div className="flex items-center gap-2 font-semibold text-primary">
                <Sparkles className="h-4 w-4" /> Multi-agent grading
              </div>
              <p className="mt-1.5">
                Multiple AI agents independently evaluate your answer. The final score
                is the consensus — fair, transparent, and on-chain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-[90rem] px-5 pb-24 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary p-10 text-center shadow-glow md:p-16">
        <div aria-hidden className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">
          <Sparkles className="h-3.5 w-3.5" /> Free to start
        </span>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-primary-foreground md:text-5xl">
          It's time for your credentials to speak for themselves.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
          Prove your real skills with Lurna's
          AI Consensus and on-chain certificates.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/dashboard" search={{}} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-primary shadow-soft transition-transform hover:scale-[1.03]">
            Start Learning Now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/leaderboard" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
            Join the Community
          </Link>
        </div>
      </div>
    </section>
  );
}
