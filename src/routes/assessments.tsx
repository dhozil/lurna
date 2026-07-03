import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { useState, useCallback, useEffect, useRef } from "react";
import {
  ChevronLeft, BookOpen, BrainCircuit, ArrowRight,
  ChevronRight, Wallet, Trophy,
} from "lucide-react";
import { categoryGroups, getCategoryData, getModuleById, type Module } from "@/data/all-data";
import type { Question } from "@/data/content";
import { useWalletConnection, useSubmitQuiz } from "@/hooks/useLurnaContracts";
import {
  setLastModule, getGrade, newAnswersToQuestions, shuffleQuiz,
} from "@/lib/quiz-utils";

interface AssSearch {
  category?: string;
  module?: string;
}

export const Route = createFileRoute("/assessments")({
  validateSearch: (search: Record<string, string | undefined>): AssSearch => ({
    category: search.category || undefined,
    module: search.module || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Assessments — Lurna" },
      { name: "description", content: "Explore 20+ learning categories from Blockchain and AI to Web3 and design." },
      { property: "og:title", content: "Assessments — Lurna" },
      { property: "og:description", content: "Explore 20+ learning categories on Lurna." },
    ],
  }),
  component: AssessmentsPage,
});

function AssessmentsPage() {
  const { category, module: moduleId } = Route.useSearch();
  const navigate = useNavigate();
  const catData = category ? getCategoryData(category) : null;

  /* ── Quiz view ── */
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
            onBack={() => navigate({ to: "/assessments", search: { category } })}
          />
        </SiteShell>
      );
    }
  }

  /* ── Category detail (all modules flat) ── */
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
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-foreground">{mod.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{mod.quiz.length} questions · {mod.trackTitle}</div>
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

  /* ── Category grid (default) ── */
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

/* ═══════════════════ Module View (Quiz) ═══════════════════ */

function ModuleView({ module, trackTitle, categoryId, categoryLabel, categoryTint, onBack }: {
  module: Module; trackTitle: string; categoryId: string; categoryLabel: string; categoryTint: string; onBack: () => void;
}) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [shuffled, setShuffled] = useState<Question[] | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [timer, setTimer] = useState(5);

  const { address: walletAddress, isConnected } = useWalletConnection();
  const submitQuiz = useSubmitQuiz();

  useEffect(() => { setLastModule(module.id); }, [module.id]);

  const questions = shuffled ?? module.quiz;
  const q = questions[currentQ];
  const isLast = currentQ === questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const totalPoints = questions.reduce((s, q) => s + q.points, 0);

  const startQuiz = useCallback(() => {
    setShuffled(shuffleQuiz(module.quiz));
    setQuizStarted(true);
  }, [module.quiz]);

  /* ── Result from chain ── */
  const chainResult = submitQuiz.isSuccess ? submitQuiz.data : undefined;
  const result = chainResult
    ? { score: chainResult.score, total: chainResult.max_score, grade: getGrade(chainResult.score, chainResult.max_score).grade }
    : undefined;

  /* ── Timer per question (pauses when answer selected) ── */
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!quizStarted || !shuffled || result || submitting || selected !== null || allAnswered) return;
    const qid = q.id;
    const last = isLast;
    const ans = answers;
    setTimer(5);
    let count = 5;
    intervalRef.current = setInterval(() => {
      count--;
      setTimer(count);
      if (count <= 0) {
        clearInterval(intervalRef.current);
        const allAnswers = { ...ans, [qid]: -1 };
        setAnswers(allAnswers);
        if (last) finishQuiz(allAnswers);
        else setCurrentQ((c) => c + 1);
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [currentQ, quizStarted, shuffled, result, submitting, selected]);

  const finishQuiz = useCallback((finalAnswers: Record<string, number>) => {
    if (!walletAddress) return;
    setSubmitting(true);
    submitQuiz.mutate(
      {
        student: walletAddress,
        moduleId: module.id,
        category: categoryLabel,
        course: module.title,
        questionsJSON: JSON.stringify(newAnswersToQuestions(finalAnswers, questions)),
        pointsPerQuestion: questions[0]?.points || 0,
        moduleSummary: module.summary,
      },
      { onSettled: () => setSubmitting(false) },
    );
  }, [walletAddress, module.id, categoryLabel, trackTitle, questions, submitQuiz]);

  const allAnswered = Object.keys(answers).length === questions.length;
  const timeUp = timer <= 0;

  const handleSelect = useCallback((idx: number) => { if (!timeUp && !submitting && !result) setSelected(idx); }, [timeUp, submitting, result]);
  const handleNext = useCallback(() => {
    if (selected === null || submitting || result) return;
    const updated = { ...answers, [q.id]: selected };
    setAnswers(updated);
    setSelected(null);
    setTimer(5);
    if (isLast) finishQuiz(updated);
    else setCurrentQ((c) => c + 1);
  }, [selected, q?.id, isLast, submitting, result, answers, questions, finishQuiz]);

  const resetQuiz = useCallback(() => {
    setCurrentQ(0); setSelected(null); setAnswers({}); setSubmitting(false);
    setShuffled(null); setTimer(5); submitQuiz.reset(); setQuizStarted(false);
  }, [submitQuiz]);

  const breadcrumb = (
    <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
      <button onClick={onBack} className="hover:text-foreground cursor-pointer transition">Modules</button>
      <span>/</span>
      <span className="text-foreground font-medium">{module.title}</span>
    </nav>
  );

  /* ── summary ── */
  if (!quizStarted) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer mb-2">
          <ChevronLeft className="h-4 w-4" /> All modules
        </button>
        {breadcrumb}
        <div className="flex items-center gap-3 mb-3">
          <div className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${categoryTint} text-white`}>
            <BrainCircuit className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{categoryLabel} · {trackTitle}</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{module.title}</h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-border/60 bg-card p-8 shadow-card">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> AI Summary
            </h2>
            <div className="text-sm leading-relaxed text-muted-foreground space-y-4 whitespace-pre-line">
              {module.summary.split(/(?<=\.) /).map((s, i) => (
                <p key={i}>{s}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-border/60 bg-card p-6 text-center shadow-card">
              <BrainCircuit className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-4 text-xl font-extrabold">Quiz</h3>
              <p className="mt-1 text-sm text-muted-foreground">{questions.length} questions · {totalPoints} pts</p>
              <p className="text-xs text-muted-foreground">5s per question · ~{questions.length * 5}s total</p>
              {isConnected ? (
                <button onClick={startQuiz}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  Start Quiz <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button disabled
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-muted px-5 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed"
                >
                  <Wallet className="h-4 w-4" /> Connect Wallet to Start
                </button>
              )}
              <div className="mt-5 text-left text-xs text-muted-foreground space-y-2">
                <div className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-green-500/20 text-green-600 text-[10px] font-bold">{questions[0]?.points ?? 0}</span> pts per correct</div>
                <div className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-primary-soft text-primary text-[10px] font-bold">70%</span> to pass</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── results ── */
  if (result) {
    const pct = Math.round((result.score / result.total) * 100);
    return (
      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer mb-2">
          <ChevronLeft className="h-4 w-4" /> All modules
        </button>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{categoryLabel} · {module.title}</span>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card p-10 text-center shadow-card">
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

          <div className="mt-8 space-y-4 text-left">
            {questions.map((question, idx) => {
              const userAns = answers[question.id];
              const correct = userAns === question.correctIndex;
              return (
                <div key={question.id} className={`rounded-2xl border p-4 ${correct ? "border-green-500/40 bg-green-500/5" : "border-red-500/40 bg-red-500/5"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-muted-foreground">Q{idx + 1}</span>
                      <p className="mt-0.5 text-sm font-semibold">{question.question}</p>
                    </div>
                    <span className={`flex-none text-[11px] font-bold px-2.5 py-0.5 rounded-full ${correct ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"}`}>
                      {correct ? `+${question.points}` : "0"}/{question.points}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Your answer: <span className={correct ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{question.options[userAns]}</span>
                    {!correct && <> · Correct: <span className="text-green-600 font-semibold">{question.options[question.correctIndex]}</span></>}
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground/80">{question.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={resetQuiz} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-card/80 transition">
              Retry Quiz
            </button>
            <button onClick={onBack} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-card/80 transition">
              All Modules
            </button>
            <Link to="/certificates"
              search={{ module: module.title, score: String(result.score), total: String(result.total), grade: result.grade }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform"
            >
              <Trophy className="h-4 w-4" /> View Certificate
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── waiting for blockchain ── */
  if (allAnswered && submitting) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="rounded-3xl border border-border/60 bg-card p-16 text-center shadow-card">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
          <h2 className="mt-6 text-xl font-extrabold">Waiting for AI Consensus...</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            GenLayer validators are evaluating your answers
          </p>
        </div>
      </div>
    );
  }
  if (submitQuiz.isError) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="rounded-3xl border border-red-500/30 bg-card p-16 text-center shadow-card">
          <h2 className="text-xl font-extrabold text-red-600">Submission failed</h2>
          <p className="mt-2 text-sm text-muted-foreground">{(submitQuiz.error as Error)?.message || "Unknown error"}</p>
          <button onClick={resetQuiz} className="mt-6 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground cursor-pointer">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ── quiz ── */
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
      <button onClick={onBack} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer mb-2">
        <ChevronLeft className="h-4 w-4" /> All modules
      </button>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{categoryLabel} · {module.title}</span>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
        <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          {currentQ + 1} / {questions.length}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-secondary max-w-xs">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((answeredCount + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
        <span className="text-xs">{answeredCount}/{questions.length}</span>
      </div>

      <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-card">
        <div className="flex items-start gap-4">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-gradient-to-br from-primary-soft to-[var(--lavender)] text-sm font-extrabold text-primary">
            {currentQ + 1}
          </span>
          <h3 className="text-lg font-bold pt-1">{q.question}</h3>
        </div>

        <div className="mt-6 grid gap-3">
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx;
            return (
              <button key={idx} onClick={() => handleSelect(idx)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm cursor-pointer transition-all ${isSelected ? "border-primary/60 bg-primary/5 shadow-sm" : "border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5"}`}
              >
                <span className={`grid h-8 w-8 flex-none place-items-center rounded-full border text-xs font-bold transition ${isSelected ? "border-primary bg-primary text-primary-foreground scale-105" : "border-border text-muted-foreground"}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center border-t border-border/60 pt-6">
          <div className="flex items-center gap-2">
            <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-all ${
              timer <= 1 ? "bg-red-500 text-white animate-pulse" :
              timer <= 3 ? "bg-amber-500 text-white" :
              "bg-primary/10 text-primary"
            }`}>{timer}</span>
            <span className="text-xs text-muted-foreground">
              {selected !== null ? "Answer selected" : timer <= 1 ? "Time's almost up!" : `Seconds remaining`}
            </span>
          </div>
          <button onClick={handleNext} disabled={selected === null || submitting}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft cursor-pointer hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLast ? "Submit Answers" : "Next"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
