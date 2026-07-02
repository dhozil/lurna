import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ArrowRight, Sparkles, Award, BrainCircuit, Medal, TrendingUp, Crown, Trophy, Wallet } from "lucide-react";
import trophyImg from "@/assets/icon-trophy.png";
import { useLeaderboard, useWalletConnection } from "@/hooks/useLurnaContracts";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Lurna" },
      { name: "description", content: "Top learners and verified credentials on Lurna — see who leads the leaderboard." },
      { property: "og:title", content: "Leaderboard — Lurna" },
      { property: "og:description", content: "Top learners and verified credentials on Lurna." },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const { address: walletAddress, isConnected, connect, isConnecting } = useWalletConnection();
  const { data: leaderboard, isLoading, isError } = useLeaderboard(50);
  const entries = leaderboard ?? [];

  const topScore = entries.length > 0 ? entries[0].total_best_score : 0;
  const mostCerts = entries.length > 0 ? Math.max(...entries.map((e) => e.certificates_earned)) : 0;
  const totalLearners = entries.length;

  const podiumEntries = entries.slice(0, 3);

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-hero">
        <div aria-hidden className="absolute -left-32 top-10 -z-0 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div aria-hidden className="absolute -right-24 -top-10 -z-0 h-72 w-72 rounded-full bg-[var(--mint)]/25 blur-3xl" />
        <div className="relative mx-auto max-w-[90rem] px-5 py-16 md:py-24 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-card backdrop-blur">
                <Crown className="h-3.5 w-3.5" />
                Leaderboard
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
                Top learners. <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.24_300)] bg-clip-text text-transparent">Proven skills.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
                See who leads the rankings — scores, certificates earned, and on-chain credentials verified by AI Consensus.
              </p>
            </div>
            <div className="hidden flex-none lg:block">
              <img src={trophyImg} alt="Trophy" width={200} height={200} className="h-44 w-44 object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        {/* Wallet connect */}
        <div className="mb-8 flex justify-end">
          {isConnected ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-700 shadow-sm">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-green-600 text-white"><Wallet className="h-3 w-3" /></span>
              {walletAddress!.slice(0, 6)}...{walletAddress!.slice(-4)}
            </span>
          ) : (
            <button onClick={connect} disabled={isConnecting}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.24_300)] px-5 py-2 text-xs font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform cursor-pointer disabled:opacity-50"
            >
              <Wallet className="h-4 w-4" /> {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>

        {/* Stats bar */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border/40 bg-card p-5 text-center shadow-sm">
            <Trophy className="mx-auto h-6 w-6 text-amber-500" />
            <p className="mt-2 text-2xl font-extrabold">{isLoading ? "..." : topScore}</p>
            <p className="text-xs text-muted-foreground">Top Score</p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5 text-center shadow-sm">
            <Award className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-2 text-2xl font-extrabold">{isLoading ? "..." : mostCerts}</p>
            <p className="text-xs text-muted-foreground">Most Certificates</p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card p-5 text-center shadow-sm">
            <BrainCircuit className="mx-auto h-6 w-6 text-violet-500" />
            <p className="mt-2 text-2xl font-extrabold">{isLoading ? "..." : totalLearners}</p>
            <p className="text-xs text-muted-foreground">Total Learners</p>
          </div>
        </div>

        {/* Podium */}
        <div className="mb-12 grid items-end gap-4 md:grid-cols-3">
          {[1, 0, 2].map((idx) => {
            const entry = podiumEntries[idx];
            const rank = idx + 1;
            const isFirst = rank === 1;
            return (
              <div key={rank} className={`text-center ${isFirst ? "md:order-2 md:-mt-6" : rank === 2 ? "md:order-1" : "md:order-3"}`}>
                <div className={`mx-auto mb-3 grid place-items-center rounded-full bg-muted ring-4 ring-background ${isFirst ? "h-20 w-20" : "h-16 w-16"}`}>
                  {entry ? (
                    <span className="text-lg font-bold text-foreground">{rank}</span>
                  ) : (
                    <span className="text-lg text-muted-foreground/40">
                      {isFirst ? <Crown className="h-8 w-8" /> : <Medal className={`h-6 w-6 ${rank === 2 ? "text-slate-400" : "text-orange-600/40"}`} />}
                    </span>
                  )}
                </div>
                <div className={`mx-auto rounded-2xl border p-4 ${isFirst ? "max-w-[200px]" : ""} ${entry ? "border-border/60 bg-card" : "border-dashed border-border/40"}`}>
                  <span className="text-2xl font-extrabold text-foreground">#{rank}</span>
                  {entry ? (
                    <>
                      <p className="mt-1 text-sm font-semibold truncate">{entry.handle || entry.student.slice(0, 10) + "..."}</p>
                      <p className="text-xs text-muted-foreground">{entry.total_best_score} pts · {entry.modules_passed} modules</p>
                    </>
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground/40">
                      {isLoading ? "Loading..." : "Waiting for learners"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rankings list */}
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border/20 px-6 py-4">
            <h2 className="text-sm font-bold flex items-center gap-2 text-foreground">
              <TrendingUp className="h-4 w-4" /> All Rankings
            </h2>
            <span className="text-xs text-muted-foreground">{isLoading ? "..." : `${totalLearners} learners`}</span>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="mt-4 text-sm text-muted-foreground">Loading rankings...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Trophy className="h-10 w-10 text-muted-foreground/20" />
              <p className="mt-4 text-sm font-semibold text-muted-foreground/60">No rankings yet</p>
              <p className="mt-1 text-xs text-muted-foreground/40">Be the first to earn a certificate and claim the #1 spot.</p>
              <Link to="/assessments" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform">
                Start learning <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border/20">
              {entries.map((entry, idx) => (
                <div key={entry.student} className="flex items-center gap-4 px-6 py-4 hover:bg-secondary/20 transition">
                  <span className={`flex-none w-8 text-center text-sm font-extrabold ${idx === 0 ? "text-amber-500" : idx === 1 ? "text-slate-400" : idx === 2 ? "text-orange-600" : "text-muted-foreground"}`}>
                    {idx + 1}
                  </span>
                  <span className={`grid h-9 w-9 flex-none place-items-center rounded-full text-xs font-bold ${idx === 0 ? "bg-amber-500/20 text-amber-600" : idx === 1 ? "bg-slate-400/20 text-slate-500" : idx === 2 ? "bg-orange-600/20 text-orange-700" : "bg-muted text-muted-foreground"}`}>
                    {entry.handle ? entry.handle[0].toUpperCase() : "?"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{entry.handle || entry.student.slice(0, 10) + "..."}</p>
                    <p className="text-xs text-muted-foreground">{entry.student.slice(0, 6)}...{entry.student.slice(-4)}</p>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-sm font-bold tabular-nums">{entry.total_best_score}</p>
                      <p className="text-[10px] text-muted-foreground">PTS</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-bold">{entry.modules_passed}</p>
                      <p className="text-[10px] text-muted-foreground">MODULES</p>
                    </div>
                    <div className="hidden md:block">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${entry.highest_grade === "A" ? "bg-green-500/20 text-green-600" : entry.highest_grade === "B" ? "bg-blue-500/20 text-blue-600" : "bg-amber-500/20 text-amber-600"}`}>
                        Grade {entry.highest_grade || "—"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 overflow-hidden rounded-[2.5rem] bg-gradient-primary p-10 text-center shadow-glow md:p-14">
          <Sparkles className="mx-auto h-8 w-8 text-white/80" />
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-primary-foreground md:text-4xl">
            Start climbing the ranks
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Earn certificates and XP with every quiz you pass. The leaderboard resets monthly — can you make #1?</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/assessments" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary shadow-soft hover:scale-[1.03] transition-transform">
              Take a quiz <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" search={{}} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
