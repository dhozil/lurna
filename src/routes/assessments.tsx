import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { useState, useCallback, useEffect } from "react";
import {
  ChevronLeft, BookOpen, ArrowRight,
  ChevronRight, Wallet, Trophy, PenTool,
} from "lucide-react";
import { categoryGroups, getCategoryData, getModuleById, type Module } from "@/data/all-data";
import type { EssayQuestion } from "@/data/content";
import { useWalletConnection, useSubmitQuiz } from "@/hooks/useLurnaContracts";
import { lurna } from "@/lib/contracts/Lurna";
import type { EvaluationResult } from "@/lib/contracts/Lurna";
import { setLastModule, getGrade, newEssayQuestions } from "@/lib/quiz-utils";

interface AssSearch {
  category?: string;
  module?: string;
  tab?: string;
}

export const Route = createFileRoute("/assessments")({
  validateSearch: (search: Record<string, string | undefined>): AssSearch => ({
    category: search.category || undefined,
    module: search.module || undefined,
    tab: search.tab || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Assessments — Lurna" },
      { name: "description", content: "Explore learning categories and test your knowledge with AI-graded essays." },
      { property: "og:title", content: "Assessments — Lurna" },
      { property: "og:description", content: "Explore learning categories on Lurna." },
    ],
  }),
  component: AssessmentsPage,
});

function AssessmentsPage() {
  const { category, module: moduleId, tab } = Route.useSearch();
  const navigate = useNavigate();
  const catData = category ? getCategoryData(category) : null;

  if (moduleId) {
    const modData = getModuleById(moduleId);
    if (modData) {
      return (
        <SiteShell>
          <ModuleView
            module={modData.module}
            trackTitle={modData.trackTitle}
            categoryId={modData.category.id}
            categoryLabel={modData.category.label}
            categoryTint={modData.category.tint}
            initialTab={tab === "assess" ? "assess" : "learn"}
            onBack={() => navigate({ to: "/assessments", search: { category } })}
          />
        </SiteShell>
      );
    }
  }

  if (catData) {
    const allMods = catData.tracks.flatMap((t) =>
      t.modules.map((m) => ({ ...m, trackTitle: t.title }))
    );
    return (
      <SiteShell>
        <section className="mx-auto max-w-[90rem] px-5 py-12 lg:px-8">
          <button
            onClick={() => navigate({ to: "/assessments", search: {} })}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer mb-2"
          >
            <ChevronLeft className="h-4 w-4" /> All categories
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${catData.tint} text-white`}>
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</span>
              <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">{catData.label}</h1>
            </div>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground">{catData.desc}</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allMods.map((mod) => (
              <Link
                key={mod.id}
                to="/assessments"
                search={{ category, module: mod.id }}
                className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
              >
                <div className={`grid h-14 w-14 flex-none place-items-center rounded-2xl bg-gradient-to-br ${catData.tint} text-white shadow-md transition-transform group-hover:scale-110`}>
                  <PenTool className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-foreground">{mod.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{mod.essayQuestions.length} essay questions</span>
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600">Essay</span>
                    <span>· {mod.trackTitle}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {allMods.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border/40 p-12 text-center">
              <p className="text-sm text-muted-foreground">No modules in this category yet.</p>
            </div>
          )}
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-hero">
        <div aria-hidden className="absolute -left-32 top-10 -z-0 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div aria-hidden className="absolute -right-24 -top-10 -z-0 h-72 w-72 rounded-full bg-[var(--mint)]/25 blur-3xl" />
        <div className="mx-auto max-w-[90rem] px-5 py-16 md:py-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-card backdrop-blur">
            Assessments
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Every skill worth <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.24_300)] bg-clip-text text-transparent">proving.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Browse our growing library of categories — from blockchain fundamentals to AI engineering and product craft.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">

        {categoryGroups.map((g) => (
          <div key={g.title} className="mb-16 last:mb-0">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{g.title}</h2>
              <span className="text-sm text-muted-foreground">{g.items.length} categories</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((i) => {
                const Icon = i.icon;
                return (
                  <button
                    key={i.id}
                    onClick={() => navigate({ to: "/assessments", search: { category: i.id } })}
                    className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card text-left transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft cursor-pointer"
                  >
                    <div className={`grid h-14 w-14 flex-none place-items-center rounded-2xl bg-gradient-to-br ${i.tint} text-white shadow-md transition-transform group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-foreground">{i.label}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{getCategoryData(i.id)?.tracks.reduce((s, t) => s + t.modules.length, 0) ?? 0} modules</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}

/* ═══════════════════ Module View ═══════════════════ */

function ModuleView({ module, trackTitle, categoryId, categoryLabel, categoryTint, initialTab, onBack }: {
  module: Module; trackTitle: string; categoryId: string; categoryLabel: string; categoryTint: string; initialTab: string; onBack: () => void;
}) {
  const [tab, setTab] = useState(initialTab);

  useEffect(() => { setLastModule(module.id); }, [module.id]);
  useEffect(() => { setTab(initialTab); }, [initialTab]);

  const navigate = useNavigate();
  const switchTab = (t: string) => {
    setTab(t);
    navigate({ to: "/assessments", search: { category: categoryId, module: module.id, tab: t }, replace: true });
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <button onClick={onBack} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer mb-2">
        <ChevronLeft className="h-4 w-4" /> All modules
      </button>
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <button onClick={onBack} className="hover:text-foreground cursor-pointer transition">Modules</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">{module.title}</span>
      </nav>

      <div className="flex items-center gap-3 mb-3">
        <div className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${categoryTint} text-white`}>
          <PenTool className="h-4 w-4" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{categoryLabel} · {trackTitle}</span>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{module.title}</h1>

      {/* Tabs */}
      <div className="mt-8 flex gap-1 rounded-xl bg-secondary p-1 w-fit">
        <button onClick={() => switchTab("learn")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition cursor-pointer ${tab === "learn" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <BookOpen className="h-4 w-4" /> Learn
        </button>
        <button onClick={() => switchTab("assess")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition cursor-pointer ${tab === "assess" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <PenTool className="h-4 w-4" /> Assess
        </button>
      </div>

      {tab === "learn" ? (
        <LearnView module={module} categoryTint={categoryTint} onStart={() => switchTab("assess")} />
      ) : (
        <AssessView module={module} categoryLabel={categoryLabel} categoryTint={categoryTint} trackTitle={trackTitle} />
      )}
    </div>
  );
}

/* ═══════════════════ Learn View ═══════════════════ */

function LearnView({ module, categoryTint, onStart }: { module: Module; categoryTint: string; onStart: () => void }) {
  return (
    <div className="mt-6 rounded-3xl border border-border/60 bg-card p-8 shadow-card">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" /> Study Material
      </h2>
      <div className="text-sm leading-relaxed text-muted-foreground space-y-4 whitespace-pre-line">
        {module.summary.split(/(?<=\.) /).map((s, i) => (
          <p key={i}>{s}</p>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button onClick={onStart}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-soft cursor-pointer hover:scale-[1.02] transition-transform"
        >
          Start Essay <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════ Assess View ═══════════════════ */

function AssessView({ module, categoryLabel, categoryTint, trackTitle }: { module: Module; categoryLabel: string; categoryTint: string; trackTitle: string }) {
  const [essayAnswers, setEssayAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [evaluations, setEvaluations] = useState<EvaluationResult[]>([]);

  const { address: walletAddress, isConnected } = useWalletConnection();
  const submitQuiz = useSubmitQuiz();

  const questions: EssayQuestion[] = module.essayQuestions;

  const chainResult = submitQuiz.isSuccess ? submitQuiz.data : undefined;
  const result = chainResult
    ? { score: chainResult.score, total: chainResult.max_score, grade: getGrade(chainResult.score, chainResult.max_score).grade }
    : undefined;

  const hasEvals = evaluations.length === questions.length;

  /* ── Save to localStorage so dashboard sees accepted tx ── */
  useEffect(() => {
    if (!result) return;
    try {
      const key = "lurna_local_scores";
      const raw = localStorage.getItem(key);
      const map: Record<string, any> = raw ? JSON.parse(raw) : {};
      const pct = Math.round((result.score / result.total) * 100);
      map[module.id] = {
        module_id: module.id, category: categoryLabel, course: module.title,
        score: result.score, max_score: result.total, percentage: pct,
        passed: result.grade !== "F", grade: result.grade, earned_at: Date.now(),
        pct,
      };
      localStorage.setItem(key, JSON.stringify(map));
    } catch {}
  }, [result, module.id]);

  useEffect(() => {
    if (!chainResult?.eval_start) return;
    const evalStart = chainResult.eval_start;
    let cancelled = false;
    (async () => {
      const evals: EvaluationResult[] = [];
      for (let i = 0; i < questions.length; i++) {
        try {
          const e = await lurna.getEvaluation(evalStart + i);
          if (e) evals.push(e);
        } catch { break; }
      }
      if (!cancelled && evals.length === questions.length) setEvaluations(evals);
    })();
    return () => { cancelled = true; };
  }, [chainResult, questions.length]);

  const handleEssayChange = useCallback((id: string, text: string) => {
    if (submitting || result) return;
    setEssayAnswers((prev) => ({ ...prev, [id]: text }));
  }, [submitting, result]);

  const handleSubmit = useCallback(() => {
    if (!walletAddress || submitting) return;
    setSubmitting(true);
    submitQuiz.mutate(
      {
        moduleId: module.id,
        category: categoryLabel,
        course: module.title,
        answers: JSON.stringify(newEssayQuestions(essayAnswers, questions)),
        questions: JSON.stringify(questions.map((q) => q.question)),
        moduleSummary: module.summary,
      },
      { onSettled: () => setSubmitting(false) },
    );
  }, [walletAddress, module.id, categoryLabel, module.title, module.summary, essayAnswers, questions, submitQuiz, submitting]);

  const resetQuiz = useCallback(() => {
    setEssayAnswers({}); setSubmitting(false); submitQuiz.reset();
  }, [submitQuiz]);

  /* ── Results ── */

  if (result) {
    const pct = Math.round((result.score / result.total) * 100);
    return (
      <div className="mt-6 rounded-3xl border border-border/60 bg-card p-10 text-center shadow-card">
        <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-gradient-primary text-4xl font-extrabold text-primary-foreground shadow-glow">
          {pct}%
        </div>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight">
          {result.score}/{result.total} · Grade {result.grade}
        </h2>
        {chainResult && (
          <p className="mt-1 text-sm text-muted-foreground">{getGrade(chainResult.score, chainResult.max_score).label}</p>
        )}
        <div className="mx-auto mt-4 h-2.5 max-w-xs rounded-full bg-secondary">
          <div className="h-full rounded-full bg-gradient-primary transition-all" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={resetQuiz} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-card/80 transition">
            Retry Essay
          </button>
          <Link to="/certificates"
            search={{ module: module.title, score: String(result.score), total: String(result.total), grade: result.grade }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform"
          >
            <Trophy className="h-4 w-4" /> View Certificate
          </Link>
        </div>

        {hasEvals && (
          <div className="mt-10 space-y-4 text-left">
            <h3 className="text-lg font-bold">Per-Question Breakdown</h3>
            {evaluations.map((ev, i) => (
              <div key={i} className="rounded-2xl border border-border/50 bg-secondary/30 p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-sm font-semibold">Q{i + 1}</span>
                  <span className={`text-sm font-bold ${ev.score >= 70 ? "text-green-600" : ev.score >= 40 ? "text-amber-600" : "text-red-600"}`}>
                    {ev.score}/100
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{ev.question}</p>
                {ev.reasoning && (
                  <div className="rounded-xl bg-card border border-border/30 px-4 py-3 text-sm text-muted-foreground">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">AI Reasoning</span>
                    <p className="mt-1">{ev.reasoning}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── Submitting ── */

  if (submitting) {
    return (
      <div className="mt-6 rounded-3xl border border-border/60 bg-card p-16 text-center shadow-card">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
        <h2 className="mt-6 text-xl font-extrabold">Waiting for AI Consensus...</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          GenLayer validators are evaluating your answers
        </p>
      </div>
    );
  }

  /* ── Error ── */

  if (submitQuiz.isError) {
    return (
      <div className="mt-6 rounded-3xl border border-red-500/30 bg-card p-16 text-center shadow-card">
        <h2 className="text-xl font-extrabold text-red-600">Submission failed</h2>
        <p className="mt-2 text-sm text-muted-foreground">{(submitQuiz.error as Error)?.message || "Unknown error"}</p>
        <button onClick={resetQuiz} className="mt-6 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground cursor-pointer">
          Try Again
        </button>
      </div>
    );
  }

  /* ── Questions ── */

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <PenTool className="h-4 w-4 text-primary" />
        <span className="text-sm text-muted-foreground">Answer all {questions.length} questions · No time limit · Be detailed and specific</span>
      </div>

      {questions.map((q, idx) => (
        <div key={q.id} className="rounded-3xl border border-border/60 bg-card p-8 shadow-card">
          <div className="flex items-start gap-4">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 text-sm font-extrabold text-amber-600">
              {idx + 1}
            </span>
            <div className="flex-1">
              <h3 className="text-lg font-bold">{q.question}</h3>
            </div>
          </div>
          <div className="mt-4">
            <textarea
              value={essayAnswers[q.id] ?? ""}
              onChange={(e) => handleEssayChange(q.id, e.target.value)}
              placeholder="Write your answer here..."
              rows={6}
              className="w-full rounded-2xl border border-border/60 bg-card p-4 text-sm outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 resize-y"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button onClick={handleSubmit} disabled={submitting || !isConnected}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-soft cursor-pointer hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {!isConnected ? "Connect Wallet to Submit" : submitting ? "Submitting..." : "Submit All Answers"} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
