import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@/lib/genlayer/WalletContext";
import { lurna, type LeaderboardEntry, type BestScore, type CertificateMetadata, type QuizAttempt, type TransactionResult, type ContractError } from "@/lib/contracts/Lurna";

export class ContractErr extends Error {
  type?: ContractError["type"];
  retryable?: boolean;
  constructor(msg: string, type?: ContractError["type"], retryable?: boolean) {
    super(msg);
    this.name = "ContractErr";
    this.type = type;
    this.retryable = retryable;
  }
}

export function useWalletConnection() {
  const wallet = useWallet();
  return {
    ...wallet,
    hasWallet: typeof window !== "undefined" && !!window.ethereum,
  };
}

export function useLeaderboard(limit = 50) {
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["lurna", "leaderboard", limit],
    queryFn: async () => {
      const result = await Promise.race([
        lurna.getLeaderboard(limit),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Leaderboard query timed out")), 15_000)
        ),
      ]);
      return result;
    },
    staleTime: 30_000,
    retry: 1,
    retryDelay: 2000,
  });
}

export function useStudentBestScores(student: string | null) {
  return useQuery<Record<string, BestScore>>({
    queryKey: ["lurna", "bestScores", student],
    queryFn: () => lurna.getStudentBestScores(student!),
    enabled: !!student,
    staleTime: 10_000,
  });
}

export function useStudentCertificates(student: string | null) {
  return useQuery<CertificateMetadata[]>({
    queryKey: ["lurna", "certificates", student],
    queryFn: () => lurna.getStudentCertificates(student!),
    enabled: !!student,
    staleTime: 10_000,
  });
}

export function useTotalSupply() {
  return useQuery<number>({
    queryKey: ["lurna", "totalSupply"],
    queryFn: () => lurna.getTotalSupply(),
    staleTime: 30_000,
  });
}

const CONTRACT_ADDR = import.meta.env.VITE_CONTRACT_LURNA || "";
const STORAGE_KEY = `lurna_displayName_${CONTRACT_ADDR.slice(0, 8)}`;

export function useDisplayName(address: string | null) {
  return useQuery<string>({
    queryKey: ["lurna", "displayName", address],
    queryFn: async () => {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) return cached;
      const name = await lurna.getDisplayName(address!).catch(() => "");
      if (name) localStorage.setItem(STORAGE_KEY, name);
      return name || "";
    },
    enabled: !!address,
    staleTime: 30_000,
  });
}

export function useSetDisplayName() {
  const wallet = useWallet();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!wallet.address) throw new Error("Wallet not connected");
      const result = await lurna.setDisplayName(name);
      if (!result.success) throw new Error(result.error);
      localStorage.setItem(STORAGE_KEY, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lurna", "displayName"] });
      queryClient.invalidateQueries({ queryKey: ["lurna", "leaderboard"] });
    },
  });
}

export function useSubmitQuiz() {
  const wallet = useWallet();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      moduleId: string;
      category: string;
      course: string;
      answers: string;
      questions: string;
      moduleSummary: string;
    }): Promise<QuizAttempt> => {
      if (!wallet.address) throw new ContractErr("Wallet not connected");
      const result = await lurna.submitQuiz(
        params.moduleId,
        params.category,
        params.course,
        params.answers,
        params.questions,
        params.moduleSummary,
      );
      if (!result.success) throw new ContractErr(result.error || "Unknown error", result.errorType, result.retryable);
      return result.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lurna", "leaderboard"] });
      queryClient.invalidateQueries({ queryKey: ["lurna", "bestScores"] });
      queryClient.invalidateQueries({ queryKey: ["lurna", "certificates"] });
      queryClient.invalidateQueries({ queryKey: ["lurna", "totalSupply"] });
    },
  });
}
