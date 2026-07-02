import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import {
  ArrowRight, BookOpen,
  BrainCircuit, Trophy, Sparkles,
  BarChart3, Award, BookMarked, TrendingUp, Wallet,
} from "lucide-react";
import { getAllModules, getModuleById } from "@/data/all-data";
import laptopImg from "@/assets/laptop.png";
import { useWalletConnection, useDisplayName, useSetDisplayName, useStudentBestScores, useStudentCertificates } from "@/hooks/useLurnaContracts";
import { getBestScores, getLastModule } from "@/lib/quiz-utils";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  return <SiteShell><Dashboard /></SiteShell>;
}

function Dashboard() {
  const allMods = getAllModules();
  const { address, isConnected, connect, isConnecting } = useWalletConnection();
  const { data: displayName } = useDisplayName(isConnected ? address : null);
  const { data: chainScores } = useStudentBestScores(isConnected ? address : null);
  const { data: chainCerts } = useStudentCertificates(isConnected ? address : null);

  const [bestScores, setBestScores] = useState<Record<string, any>>({});
  const [lastId, setLastId] = useState<string | null>(null);

  useEffect(() => {
    setBestScores(getBestScores());
    setLastId(getLastModule());
  }, []);

  const localArr = Object.entries(bestScores).map(([moduleId, data]) => ({ moduleId, ...data }));
  const chainArr = chainScores ? Object.entries(chainScores).map(([moduleId, data]) => ({ moduleId, ...data })) : [];

  const bestArr = isConnected && chainArr.length > 0 ? chainArr : localArr;
  const lastMod = lastId ? getModuleById(lastId) : null;

  const completedCount = bestArr.length;
  const avgScore = bestArr.length
    ? Math.round(bestArr.reduce((s, r) => s + r.pct || r.percentage, 0) / bestArr.length)
    : 0;
  const passedCount = isConnected && chainCerts
    ? chainCerts.length
    : bestArr.filter((r) => r.grade !== "F").length;

  return (
    <div className="mx-auto max-w-[90rem] px-5 py-12 lg:px-8">
      {/* ─── Hero ─── */}
      <div className="relative mb-14 overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-primary/5 shadow-card">
        <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[var(--mint)]/10 blur-3xl" />
        <div className="relative grid items-center gap-8 p-8 md:p-12 lg:grid-cols-2">
          {/* Left: text + buttons */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Welcome back
            </span>
            {displayName && (
              <p className="mt-2 text-2xl font-extrabold tracking-tight">{displayName}</p>
            )}
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              Your <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.24_300)] bg-clip-text text-transparent">Learning Dashboard</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Track progress, continue where you left off, and prove your skills.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/assessments"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-secondary/60 transition cursor-pointer"
              >
                <BookOpen className="h-4 w-4" /> Browse All
              </Link>
              <Link to="/certificates"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform"
              >
                <Trophy className="h-4 w-4" /> Certificates
              </Link>
              {isConnected ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2.5 text-sm font-semibold text-green-700 shadow-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-green-600 text-white"><Wallet className="h-3 w-3" /></span>
                  {displayName || address!.slice(0, 6) + "..." + address!.slice(-4)}
                </span>
              ) : (
                <button
                  onClick={connect}
                  disabled={isConnecting}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.24_300)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                >
                  <Wallet className="h-4 w-4" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </button>
              )}
            </div>
          </div>

          {/* Right: laptop image */}
          <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/10 to-[var(--mint)]/10 blur-2xl" />
            <img
              src={laptopImg}
              alt="Laptop with learning dashboard"
              width={600}
              height={400}
              className="h-auto w-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Display name */}
          {isConnected && <DisplayNameEditor address={address!} />}

          {/* Stats row — full width */}
          <div className="lg:col-span-2 mt-4 grid gap-3 border-t border-border/30 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><BrainCircuit className="h-4 w-4" /></span>
                <div>
                  <p className="text-xl font-extrabold">{completedCount}</p>
                  <p className="text-[11px] text-muted-foreground">Quizzes done</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-green-500/10 text-green-600"><Award className="h-4 w-4" /></span>
                <div>
                  <p className="text-xl font-extrabold">{passedCount}</p>
                  <p className="text-[11px] text-muted-foreground">Certificates</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-500/10 text-amber-600"><TrendingUp className="h-4 w-4" /></span>
                <div>
                  <p className="text-xl font-extrabold">{avgScore}%</p>
                  <p className="text-[11px] text-muted-foreground">Avg score</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet-500/10 text-violet-600"><BookMarked className="h-4 w-4" /></span>
                <div>
                  <p className="text-xl font-extrabold">{allMods.length}</p>
                  <p className="text-[11px] text-muted-foreground">Modules</p>
                </div>
              </div>
            </div>
        </div>
      </div>
      </div>

      {/* ─── Content ─── */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          {lastMod && (
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <h2 className="text-base font-bold flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-amber-500" /> Continue Learning
              </h2>
              <div className="flex items-start gap-4">
                <div className={`grid h-14 w-14 flex-none place-items-center rounded-2xl bg-gradient-to-br ${lastMod.category.tint} text-white shadow-md`}>
                  <BrainCircuit className="h-7 w-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{lastMod.category.label} · {lastMod.trackTitle}</span>
                  <h3 className="text-base font-bold mt-0.5">{lastMod.module.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{lastMod.module.summary.slice(0, 100)}…</p>
                </div>
                <Link
                  to="/assessments"
                  search={{ category: lastMod.category.id, module: lastMod.module.id }}
                  className="flex-none inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
                >
                  Resume <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          {bestArr.length > 0 && (
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <h2 className="text-base font-bold flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 text-primary" /> Recent Activity
              </h2>
              <div className="space-y-3">
                {bestArr.slice(0, 5).map((r) => {
                  const entry = getModuleById(r.moduleId);
                  if (!entry) return null;
                  const total = r.total || r.max_score || 1;
                  const pct = Math.round((r.score / total) * 100);
                  const passed = r.grade !== "F";
                  return (
                    <Link key={r.moduleId}
                      to="/assessments"
                      search={{ category: entry.category.id, module: r.moduleId }}
                      className="w-full flex items-center gap-3 rounded-xl border border-border/40 p-3 hover:border-border/60 hover:bg-secondary/30 transition cursor-pointer text-left"
                    >
                      <span className={`grid h-9 w-9 flex-none place-items-center rounded-lg bg-gradient-to-br ${entry.category.tint} text-white text-[10px] font-bold`}>
                        {pct}%
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{entry.module.title}</p>
                        <p className="text-xs text-muted-foreground">{entry.category.label} · Grade {r.grade}</p>
                      </div>
                      <span className={`flex-none text-xs font-bold px-2 py-0.5 rounded-full ${passed ? "bg-green-500/15 text-green-600" : "bg-red-500/15 text-red-600"}`}>
                        {passed ? "Passed" : "Failed"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!lastMod && bestArr.length === 0 && (
            <div className="rounded-2xl border border-border/60 bg-card p-10 text-center shadow-sm">
              <BrainCircuit className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <h3 className="mt-4 text-lg font-bold">Start your learning journey</h3>
              <p className="mt-1 text-sm text-muted-foreground">Pick a module from Assessments to begin.</p>
              <Link to="/assessments" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform">
                Browse Assessments <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="text-base font-bold mb-4">Quick Actions</h2>
            <div className="grid gap-3">
              <Link to="/assessments"
                className="flex items-center gap-3 rounded-xl border border-border/40 p-4 hover:border-primary/40 hover:bg-primary/5 transition cursor-pointer"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><BookOpen className="h-4 w-4" /></span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Browse Assessments</p>
                  <p className="text-xs text-muted-foreground">All modules by category</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link to="/certificates"
                className="flex items-center gap-3 rounded-xl border border-border/40 p-4 hover:border-primary/40 hover:bg-primary/5 transition cursor-pointer"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-500/10 text-amber-600"><Trophy className="h-4 w-4" /></span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">My Certificates</p>
                  <p className="text-xs text-muted-foreground">Mint and view credentials</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link to="/how-it-works"
                className="flex items-center gap-3 rounded-xl border border-border/40 p-4 hover:border-primary/40 hover:bg-primary/5 transition cursor-pointer"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet-500/10 text-violet-600"><BookMarked className="h-4 w-4" /></span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">How It Works</p>
                  <p className="text-xs text-muted-foreground">Learn about the platform</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplayNameEditor({ address }: { address: string }) {
  const { data: currentName } = useDisplayName(address);
  const mutation = useSetDisplayName();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  const handleSave = () => {
    if (!name.trim()) return;
    mutation.mutate(name.trim(), { onSuccess: () => setEditing(false) });
  };

  if (!editing && currentName) {
    return (
      <div className="lg:col-span-2 mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{currentName}</span>
        <button onClick={() => { setName(currentName); setEditing(true); }} className="text-xs text-primary hover:underline cursor-pointer">Edit</button>
      </div>
    );
  }

  if (!editing) {
    return (
      <div className="lg:col-span-2 mt-4">
        <button onClick={() => setEditing(true)} className="text-xs text-primary hover:underline cursor-pointer">Set display name</button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 mt-4 flex items-center gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your display name"
        maxLength={32}
        className="rounded-lg border border-border/60 bg-background px-3 py-1.5 text-sm outline-none focus:border-primary"
      />
      <button onClick={handleSave} disabled={mutation.isPending || !name.trim()}
        className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground cursor-pointer hover:opacity-90 disabled:opacity-40"
      >
        {mutation.isPending ? "Saving..." : "Save"}
      </button>
      <button onClick={() => setEditing(false)} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">Cancel</button>
    </div>
  );
}
