import type { Module, Question } from "@/data/all-data";

/* ─── Grading ─── */

export const GRADE_THRESHOLDS = [
  { label: "Platinum", grade: "A", min: 90 },
  { label: "Gold", grade: "B", min: 80 },
  { label: "Silver", grade: "C", min: 70 },
  { label: "Not Passed", grade: "F", min: 0 },
] as const;

export function getGrade(score: number, total: number) {
  const pct = (score / total) * 100;
  return GRADE_THRESHOLDS.find((t) => pct >= t.min) ?? GRADE_THRESHOLDS[GRADE_THRESHOLDS.length - 1];
}

export function newAnswersToQuestions(answers: Record<string, number>, questions: Question[]) {
  return questions.map((q) => ({
    question: q.question,
    student_answer: q.options[answers[q.id]] ?? "",
    correct_answer: q.options[q.correctIndex],
  }));
}

/* ─── SSR-safe localStorage ─── */

function ssrSafe<T>(fn: () => T, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { return fn(); } catch { return fallback; }
}

export function getBestScores(): Record<string, { score: number; total: number; grade: string; pct: number }> {
  return ssrSafe(() => JSON.parse(localStorage.getItem("lurna_best_scores") || "{}"), {});
}

export function saveBestScore(moduleId: string, score: number, total: number, grade: string) {
  if (typeof window === "undefined") return;
  const all = getBestScores();
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const existing = all[moduleId];
  if (existing && pct <= existing.pct) return;
  all[moduleId] = { score, total, grade, pct };
  localStorage.setItem("lurna_best_scores", JSON.stringify(all));
}

export function getLastModule(): string | null {
  return ssrSafe(() => localStorage.getItem("lurna_last_module"), null);
}

export function setLastModule(id: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("lurna_last_module", id);
}

/* ─── Shuffle (Fisher-Yates) ─── */

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function shuffleQuiz(questions: Question[]): Question[] {
  return shuffleArray(questions).map((q) => {
    const entries = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correctIndex }));
    const shuffled = shuffleArray(entries);
    return {
      ...q,
      options: shuffled.map((e) => e.opt),
      correctIndex: shuffled.findIndex((e) => e.isCorrect),
    };
  });
}
