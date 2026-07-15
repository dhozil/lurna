import type { EssayQuestion } from "@/data/all-data";

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

export function newEssayQuestions(essayAnswers: Record<string, string>, questions: EssayQuestion[]): string[] {
  return questions.map((q) => essayAnswers[q.id] || "");
}

function ssrSafe<T>(fn: () => T, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { return fn(); } catch { return fallback; }
}

export function getLastModule(): string | null {
  return ssrSafe(() => localStorage.getItem("lurna_last_module"), null);
}

export function setLastModule(id: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("lurna_last_module", id);
}
