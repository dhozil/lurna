import { Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { BookOpen, Sparkles, BrainCircuit, ShieldCheck, Trophy, Globe, ArrowRight, Check, X } from "lucide-react";

const steps = [
  { n: "01", icon: BookOpen, title: "Choose a Category", desc: "Start from Blockchain, AI, Web3, Programming, or any of 20+ tracks." },
  { n: "02", icon: Sparkles, title: "Read the Summary", desc: "Concise modules curated by AI and reviewed by subject experts — study the material first." },
  { n: "03", icon: BrainCircuit, title: "Write the Essay", desc: "Scenario-based essay questions graded by AI consensus — no answer keys, just deep thinking." },
  { n: "04", icon: ShieldCheck, title: "AI Consensus Grades", desc: "Multiple AI agents independently score your work and reach consensus." },
  { n: "05", icon: Trophy, title: "Certificate Minted", desc: "Pass and your NFT credential is minted to your wallet automatically." },
  { n: "06", icon: Globe, title: "Public Verification", desc: "Share your Proof of Knowledge link with recruiters, peers, or anyone." },
];

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="How It Works"
        title={<>From learning to <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.24_300)] bg-clip-text text-transparent">proof,</span> in six steps.</>}
        description="A simple, transparent flow that turns every study session into a credential that lasts forever."
      />

      {/* Steps timeline */}
      <section className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8">
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </section>

      {/* AI Consensus deep dive */}
      <section className="border-y border-border/60 bg-gradient-to-b from-primary-soft/40 to-background py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Under the hood</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">How AI Consensus actually grades</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { t: "Submit Essay", d: "Your answers are sent to the GenLayer contract, which binds the submission to your wallet.", c: "1 tx · instant" },
              { t: "AI Leader Evaluates", d: "The leader runs exec_prompt with a grading rubric — each essay scored 0–100 with written reasoning.", c: "1 AI agent · ~5s" },
              { t: "Validators Cross-Check", d: "Each validator independently re-runs exec_prompt with their own AI model, comparing scores within ±20 tolerance.", c: "3 AI agents · ~5s" },
              { t: "Consensus Reached", d: "If supermajority agrees, the score is finalized, best score updated, and certificate minted on-chain.", c: "≥75% agreement" },
            ].map((q) => (
              <div key={q.t} className="rounded-3xl border border-border/60 bg-card p-7 shadow-card">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">{q.c}</div>
                <h3 className="mt-2 text-xl font-bold">{q.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{q.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional vs Lurna */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Traditional learning vs Lurna</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Course completion isn't competency. Lurna fixes that.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border/60 bg-card p-8 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Traditional</div>
            <h3 className="mt-2 text-2xl font-extrabold">Completion-based certificates</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {["Easy to obtain", "Inconsistent essay grading", "Hard for employers to verify", "Completion ≠ competency", "Centralized, can disappear"].map((i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-destructive/15 text-destructive">
                    <X className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary-soft to-[var(--lavender)] p-8 shadow-glow">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Lurna</div>
            <h3 className="mt-2 text-2xl font-extrabold">Proof of Knowledge</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {["AI Consensus grading", "Real competency validation", "On-chain credentials", "Public verification link", "Impossible to forge"].map((i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-[var(--mint)] text-[oklch(0.2_0.05_280)]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-16 text-center">
          <Link to="/dashboard" search={{}} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02]">
            Try a track now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
