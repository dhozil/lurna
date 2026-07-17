import { createClient } from "genlayer-js";
import { getGenLayerClient, getWriteClient, ensureCorrectNetwork } from "@/lib/genlayer/client";
import { genlayerConfig } from "@/lib/genlayer/config";
import { TransactionStatus } from "genlayer-js/types";
import type { Address } from "viem";

/* ── Types ── */

export interface EvaluationResult {
  question: string;
  student_answer: string;
  score: number;
  reasoning: string;
}

export interface QuizAttempt {
  attempt_id: number;
  student: string;
  module_id: string;
  category: string;
  course: string;
  score: number;
  max_score: number;
  percentage: number;
  passed: boolean;
  timestamp?: string | number;
  eval_start?: number;
}

export interface BestScore {
  module_id: string;
  category: string;
  course: string;
  percentage: number;
  score: number;
  max_score: number;
  passed: boolean;
  grade: string;
  earned_at: string | number;
}

export interface LeaderboardEntry {
  student: string;
  handle: string;
  total_best_score: number;
  modules_passed: number;
  certificates_earned: number;
  highest_grade: string;
}

export interface CertificateMetadata {
  student: string;
  category: string;
  course: string;
  score: number;
  max_score: number;
  percentage: number;
  grade: string;
  tier: string;
  timestamp: number;
  attempt_id: number;
}

export interface TransactionResult<T = void> {
  success: boolean;
  data?: T;
  txHash?: string;
  error?: string;
  errorType?: "EXTERNAL" | "LLM_ERROR" | "CONSENSUS_FAILURE" | "TRANSIENT";
  retryable?: boolean;
}

/* ── Helpers ── */

function parseJSON<T>(raw: unknown): T {
  if (typeof raw === "string") {
    try { return JSON.parse(raw) as T; } catch { /* fall through */ }
  }
  return raw as T;
}

function normalizeContractResult(val: unknown): unknown {
  if (val === null || val === undefined) return null;
  if (Array.isArray(val)) {
    return val.map(normalizeContractResult);
  }
  if (typeof val === "object" && !Array.isArray(val)) {
    const obj = val as Record<string, unknown>;
    if (obj.type === "BigInt" || obj.type === "bigint") return Number(obj.value ?? obj);
    if (obj.value !== undefined) return obj.value;
    if (obj.inner !== undefined) return obj.inner;
  }
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return val; }
  }
  if (typeof val === "object" && val !== null) {
    const normalized: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      if (v && typeof v === "object" && !Array.isArray(v)) {
        const vObj = v as Record<string, unknown>;
        if (vObj.type === "BigInt" || vObj.type === "bigint") {
          normalized[k] = Number(vObj.value ?? v);
        } else {
          normalized[k] = normalizeContractResult(v);
        }
      } else {
        normalized[k] = v;
      }
    }
    return normalized;
  }
  return val;
}

export interface ContractError {
  error: string;
  type?: "EXTERNAL" | "LLM_ERROR" | "CONSENSUS_FAILURE" | "TRANSIENT";
}

function tryParseContractError(msg: string): ContractError | null {
  try {
    const parsed = JSON.parse(msg);
    if (parsed && typeof parsed === "object" && parsed.error) {
      return parsed as ContractError;
    }
  } catch {}
  return null;
}

function isTransient(ce: ContractError): boolean {
  return ce.type === "LLM_ERROR" || ce.type === "CONSENSUS_FAILURE" || ce.type === "TRANSIENT";
}

/* ── GenLayer Error Parser ── */

function parseGenLayerError(err: unknown): { message: string; type?: "EXTERNAL" | "LLM_ERROR" | "CONSENSUS_FAILURE" | "TRANSIENT"; retryable: boolean } {
  const msg = err instanceof Error ? err.message : String(err);

  const ce = tryParseContractError(msg);
  if (ce) {
    return {
      message: ce.error,
      type: ce.type,
      retryable: isTransient(ce),
    };
  }

  if (msg.includes("User denied") || msg.includes("user rejected") || msg.includes("code 4001")) {
    return { message: "Transaction rejected in wallet", retryable: false };
  }
  if (msg.includes("VALIDATORS_TIMEOUT") || msg.includes("validators timeout")) {
    return { message: "Validators timed out — network may be congested. Try again.", retryable: true };
  }
  if (msg.includes("LEADER_TIMEOUT") || msg.includes("leader timeout")) {
    return { message: "Leader timed out — try again.", retryable: true };
  }
  if (msg.includes("UNDETERMINED") || msg.includes("undetermined")) {
    return { message: "Consensus could not be reached. Try again.", retryable: true };
  }
  if (msg.includes("insufficient funds") || msg.includes("gas")) {
    return { message: "Insufficient GEN tokens for gas.", retryable: false };
  }
  if (msg.includes("rate limit") || msg.includes("LimitExceeded")) {
    return { message: "Rate limited — please wait a moment and try again.", retryable: true };
  }
  return { message: msg.slice(0, 200), retryable: false };
}

/* ── Contract wrapper ── */

class LurnaContract {
  private get address(): Address {
    return genlayerConfig.contracts.Lurna as Address;
  }

  private readClient: ReturnType<typeof createClient> | null = null;

  constructor() {}

  private getReadClient() {
    if (this.readClient) return this.readClient;
    this.readClient = createClient({
      chain: genlayerConfig.chain,
      ...(genlayerConfig.rpcUrl ? { rpcUrl: genlayerConfig.rpcUrl } : {}),
    });
    return this.readClient;
  }

  private async read<T>(fn: string, args: unknown[]): Promise<T> {
    try {
      const client = this.getReadClient();
      const raw = await client.readContract({
        address: this.address,
        functionName: fn,
        args: args as [],
      });
      if (typeof raw === "string") {
        try { return JSON.parse(raw) as T; } catch { return raw as T; }
      }
      if (raw instanceof Map) {
        return Object.fromEntries(raw.entries()) as T;
      }
      return raw as T;
    } catch (e) {
      console.error(`read(${fn}) failed:`, e);
      throw e;
    }
  }

  private async writeAndWait(fn: string, args: unknown[]): Promise<TransactionResult<{ txHash: string; receipt: Record<string, unknown> }>> {
    const RETRYABLE = ["LEADER_TIMEOUT", "PENDING", "PROPOSING", "WAITING"];

    try {
      const eth = typeof window !== "undefined" ? (window as any).ethereum : undefined;
      if (!eth) return { success: false, error: "No wallet provider detected. Install MetaMask, Rabby, or another EIP-1193 wallet." };

      const accounts = await eth.request({ method: "eth_requestAccounts" });
      if (!accounts?.length) return { success: false, error: "No wallet connected" };

      const address = accounts[0] as string;
      await ensureCorrectNetwork();
      const client = await getWriteClient(address);

      const txHash = await client.writeContract({
        account: { address } as any,
        address: this.address,
        functionName: fn,
        args: args as never[],
        value: 0n,
      }) as unknown as string;

      const waitForAccept = async (): Promise<Record<string, unknown>> => {
        for (let attempt = 0; attempt < 200; attempt++) {
          try {
            const receipt = await (client as any).waitForTransactionReceipt({
              hash: txHash,
              status: TransactionStatus.ACCEPTED,
              retries: 1,
              interval: 2000,
              fullTransaction: true,
              timeout: 5000,
            }) as Record<string, unknown>;

            const statusName = (receipt as any).statusName as string | undefined;
            const txResultName = (receipt as any).txExecutionResultName as string | undefined;

            if (statusName === "ACCEPTED") return receipt;

            if (txResultName && RETRYABLE.includes(txResultName)) {
              await new Promise((r) => setTimeout(r, 3000));
              continue;
            }

            if (statusName && RETRYABLE.includes(statusName)) {
              await new Promise((r) => setTimeout(r, 3000));
              continue;
            }
          } catch {}
          await new Promise((r) => setTimeout(r, 3000));
        }
        throw new Error("LEADER_TIMEOUT");
      };

      const receipt = await waitForAccept();

      const execResultName = (receipt as any).txExecutionResultName;
      if (execResultName && ["FAIL", "VALIDATORS_TIMEOUT", "UNDETERMINED"].includes(execResultName)) {
        const parsed = parseGenLayerError(new Error(execResultName));
        return { success: false, error: parsed.message, errorType: parsed.type, retryable: parsed.retryable };
      }

      const consensusError = (receipt as any).consensus_data?.execution_error;
      if (consensusError) {
        const ceStr = typeof consensusError === "string" ? consensusError : JSON.stringify(consensusError);
        const parsed = parseGenLayerError(new Error(ceStr));
        return { success: false, error: parsed.message, errorType: parsed.type, retryable: parsed.retryable };
      }

      return { success: true, data: { txHash, receipt } };
    } catch (err) {
      const parsed = parseGenLayerError(err);
      return { success: false, error: parsed.message, errorType: parsed.type, retryable: parsed.retryable };
    }
  }

  // ── Views ──

  async getEvaluation(evalId: number): Promise<EvaluationResult> {
    return parseJSON(await this.read("get_evaluation", [evalId]));
  }

  async getTotalEvaluations(): Promise<number> {
    return this.read("get_total_evaluations", []);
  }

  async getAttempt(attemptId: number): Promise<QuizAttempt> {
    return parseJSON(await this.read("get_attempt", [attemptId]));
  }

  async getStudentAttempts(student: string): Promise<QuizAttempt[]> {
    return parseJSON(await this.read("get_student_attempts", [student]));
  }

  async getStudentBestScores(student: string): Promise<Record<string, BestScore>> {
    return parseJSON(await this.read("get_student_best_scores", [student]));
  }

  async getStudentTotalBestScore(student: string): Promise<number> {
    return this.read("get_student_total_best_score", [student]);
  }

  async getLeaderboard(limit: number): Promise<LeaderboardEntry[]> {
    return parseJSON(await this.read("get_leaderboard", [limit]));
  }

  async getTotalAttempts(): Promise<number> {
    return this.read("get_total_attempts", []);
  }

  async getLeaderboardCount(): Promise<number> {
    return this.read("get_leaderboard_count", []);
  }

  async getCertificate(certId: number): Promise<CertificateMetadata> {
    return parseJSON(await this.read("get_certificate", [certId]));
  }

  async getStudentCertificates(student: string): Promise<CertificateMetadata[]> {
    return parseJSON(await this.read("get_student_certificates", [student]));
  }

  async getTotalSupply(): Promise<number> {
    return this.read("get_total_supply", []);
  }

  async verifyCertificate(certId: number, student: string): Promise<boolean> {
    return this.read("verify_certificate", [certId, student]);
  }

  async getDisplayName(address: string): Promise<string> {
    return this.read("get_display_name", [address]);
  }

  async getStudentAttemptIds(student: string): Promise<number[]> {
    return parseJSON(await this.read("get_student_attempts", [student]));
  }

  // ── Writes ──

  async setDisplayName(name: string): Promise<TransactionResult> {
    const result = await this.writeAndWait("set_display_name", [name]);
    return { success: result.success, txHash: result.data?.txHash, error: result.error };
  }

  async submitQuiz(
    moduleId: string,
    category: string,
    course: string,
    answers: string,
    questions: string,
    moduleSummary: string,
  ): Promise<TransactionResult<QuizAttempt>> {
    const MAX_RETRIES = 3;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const countBefore = await this.getTotalAttempts();

      const result = await this.writeAndWait("submit_quiz", [
        moduleId, category, course, answers, questions, moduleSummary,
      ]);

      if (result.success) {
        const { txHash, receipt } = result.data!;
        return await this._extractAttempt(countBefore, txHash, receipt);
      }

      if (result.retryable && attempt < MAX_RETRIES - 1) {
        await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
        continue;
      }

      return { success: false, error: result.error || "Unknown error", errorType: result.errorType, retryable: result.retryable };
    }

    return { success: false, error: "Max retries exceeded" };
  }

  private async _extractAttempt(
    countBefore: number,
    txHash: string,
    receipt: Record<string, unknown>,
  ): Promise<TransactionResult<QuizAttempt>> {

    /* ── Extract attempt from receipt (same data tx explorer uses) ── */

    const parseFromReceipt = (): QuizAttempt | null => {
      try {
        const lr = (receipt as any).consensus_data?.leader_receipt?.[0];
        if (!lr) return null;
        const raw = lr.genvm_result || lr.execution_result;
        if (!raw || typeof raw !== "string") return null;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && parsed.attempt_id) return normalizeContractResult(parsed) as QuizAttempt;
      } catch {}
      try {
        const d = (receipt as any).data;
        if (d && typeof d === "object" && d.attempt_id) return normalizeContractResult(d) as QuizAttempt;
      } catch {}
      return null;
    };

    const fromReceipt = parseFromReceipt();
    if (fromReceipt) return { success: true, data: fromReceipt, txHash };

    /* ── Fallback: poll get_attempt view ── */

    const expectedId = countBefore + 1;

    const fetchAttempt = async (): Promise<QuizAttempt | null> => {
      try {
        const raw = await this.read("get_attempt", [expectedId]);
        const attempt = parseJSON<QuizAttempt>(raw);
        if (attempt && attempt.attempt_id === expectedId) return attempt;
      } catch {}
      return null;
    };

    await new Promise((r) => setTimeout(r, 5000));

    for (let i = 0; i < 30; i++) {
      const fallback = await fetchAttempt();
      if (fallback) return { success: true, data: fallback, txHash };
      await new Promise((r) => setTimeout(r, 4000));
    }

    return {
      success: false,
      error: "Transaction accepted but result not yet visible. Check your dashboard shortly.",
      txHash,
    };
  }
}

export const lurna = new LurnaContract();
