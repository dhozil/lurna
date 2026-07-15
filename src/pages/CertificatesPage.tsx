import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { ShieldCheck, Search, Award, Trophy, Star, Sparkles, ArrowRight, Check, Copy, Wallet } from "lucide-react";
import { useState, useMemo } from "react";
import certificate3d from "@/assets/certificate-3d.png";
import { useWalletConnection, useStudentCertificates } from "@/hooks/useLurnaContracts";

interface CertSearch {
  module?: string;
  score?: string;
  total?: string;
  grade?: string;
}

const tierColor: Record<string, string> = {
  Platinum: "bg-gradient-to-br from-[oklch(0.92_0.05_295)] to-[oklch(0.78_0.13_295)] text-[oklch(0.25_0.1_280)]",
  Gold: "bg-gradient-to-br from-[oklch(0.95_0.1_85)] to-[oklch(0.78_0.16_75)] text-[oklch(0.32_0.12_70)]",
  Silver: "bg-gradient-to-br from-[oklch(0.93_0.01_280)] to-[oklch(0.78_0.02_280)] text-[oklch(0.3_0.03_280)]",
};

function certGrade(pct: number): { label: string; grade: string } {
  if (pct >= 90) return { label: "Platinum", grade: "A" };
  if (pct >= 80) return { label: "Gold", grade: "B" };
  if (pct >= 70) return { label: "Silver", grade: "C" };
  return { label: "Not Passed", grade: "F" };
}

export default function CertificatesPage({ certSearch }: { certSearch: CertSearch }) {
  const { module: mod, score, total, grade } = certSearch;
  const [copied, setCopied] = useState(false);

  const { address: walletAddress, isConnected, connect, isConnecting } = useWalletConnection();

  const certData = mod && score && total
    ? { module: mod, scoreNum: Number(score), totalNum: Number(total), grade: grade || certGrade(Math.round(Number(score) / Number(total) * 100)).grade }
    : null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { data: chainCerts, isLoading: certsLoading, isError: certsError } = useStudentCertificates(isConnected ? walletAddress : null);

  /* ── Merge local (accepted) + chain (finalized) certs ── */
  const allCerts = useMemo(() => {
    const map: Record<string, any> = {};
    try {
      const raw = localStorage.getItem("lurna_local_scores");
      if (raw) {
        for (const d of Object.values(JSON.parse(raw))) {
          const entry = d as Record<string, any>;
          if (entry && typeof entry === "object" && entry.grade !== "F") {
            const course = entry.course || entry.module_id || "";
            map[course] = {
              course,
              category: entry.category || "",
              score: entry.score,
              max_score: entry.max_score,
              percentage: entry.percentage ?? Math.round((entry.score / (entry.max_score || 1)) * 100),
              grade: entry.grade,
              timestamp: entry.earned_at || Date.now(),
              attempt_id: 0,
              student: "",
            };
          }
        }
      }
    } catch {}
    if (chainCerts) {
      for (const c of chainCerts) {
        map[c.course] = { ...c };
      }
    }
    return Object.values(map);
  }, [chainCerts]);

  /* ── Certificate preview from quiz result ── */
  if (certData) {
    const pct = Math.round((certData.scoreNum / certData.totalNum) * 100);
    const g = certGrade(pct);
    const passed = g.grade !== "F";
    return (
      <SiteShell>
        <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-primary text-4xl font-extrabold text-primary-foreground shadow-glow">
              {passed ? <Trophy className="h-10 w-10" /> : <span className="text-3xl">—</span>}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">{passed ? "Certificate Preview" : "Not Passed"}</h1>
            <p className="mt-3 text-muted-foreground">
              {passed
                ? "Connect your wallet and submit the quiz to mint via AI Consensus."
                : "A minimum score of 70% is required to earn a certificate."}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-lg">
            <div className="rounded-[2.5rem] border border-border/60 bg-card p-8 shadow-card">
              <div className="flex items-center justify-between text-white/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--sun)]" />
                  <span className="text-sm font-semibold">Lurna · Verified Certificate</span>
                </div>
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">On-Chain</span>
              </div>
              <img src={certificate3d} alt="Lurna NFT certificate" width={768} height={768} loading="lazy"
                className="mx-auto my-6 h-56 w-56 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
              <h3 className="text-center text-2xl font-extrabold">{certData.module}</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">Issued · 2026</p>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/60 pt-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Score</div>
                  <div className="text-3xl font-extrabold">{pct}%</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Grade</div>
                  <div className="text-3xl font-extrabold text-[var(--sun)]">{certData.grade}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => handleCopy(`lurna.xyz/verify/${certData.module.toLowerCase().replace(/\s+/g, "-")}-${certData.scoreNum}`)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-card/80 transition"
            >
              {copied ? <><Check className="h-4 w-4 text-green-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy verify link</>}
            </button>
          </div>
        </section>
      </SiteShell>
    );
  }

  /* ── Normal view (no cert params) ── */
  return (
    <SiteShell>
      <PageHeader
        eyebrow="On-Chain Certificates"
        title={<>Credentials, <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.24_300)] bg-clip-text text-transparent">verifiable forever.</span></>}
        description="Every Lurna certificate is minted as an NFT on GenLayer the moment AI Consensus approves your result."
      />

      <div className="mx-auto max-w-[90rem] px-5 pt-6 lg:px-8">
        <div className="flex justify-end">
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
      </div>

      {/* ── My Certificates Collection ── */}
      {isConnected && (
        <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">My Certificates</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your on-chain credential collection, stored permanently on GenLayer. Only passing scores (70%+) are minted — scores below Silver are not recorded on-chain.
            </p>
          </div>

          {certsLoading && allCerts.length === 0 && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Loading certificates from blockchain...
            </div>
          )}

          {allCerts.length === 0 && !certsLoading && certsError && (
            <div className="rounded-3xl border border-red-500/30 bg-card p-12 text-center">
              <h3 className="text-lg font-bold text-red-600">Failed to load certificates</h3>
              <p className="mt-1 text-sm text-muted-foreground">Could not read from the blockchain. Please try again later.</p>
            </div>
          )}

          {allCerts.length === 0 && !certsLoading && !certsError && (
            <div className="rounded-3xl border border-dashed border-border/60 bg-card/50 p-12 text-center">
              <Trophy className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <h3 className="mt-4 text-lg font-bold">No certificates yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Complete a learning track and pass the AI Consensus quiz to mint your first on-chain certificate.
              </p>
            </div>
          )}

          {allCerts.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {allCerts.map((cert, idx) => {
                const pct = cert.percentage ?? Math.round(cert.score / 300 * 100);
                const g = certGrade(pct);
                const tier = cert.tier || g.label;
                const tierBg = tier === "Platinum"
                  ? "from-[oklch(0.92_0.05_295)] to-[oklch(0.78_0.13_295)]"
                  : tier === "Gold"
                  ? "from-[oklch(0.95_0.1_85)] to-[oklch(0.78_0.16_75)]"
                  : "from-[oklch(0.93_0.01_280)] to-[oklch(0.78_0.02_280)]";
                const ts = cert.timestamp;
                const date = ts
                  ? typeof ts === "number"
                    ? new Date(ts * 1000).toLocaleDateString()
                    : String(ts)
                  : "—";
                return (
                  <div
                    key={cert.attempt_id || idx}
                    className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card"
                  >
                    {/* Header gradient */}
                    <div className={`bg-gradient-to-br ${tierBg} p-6`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-80">{tier}</span>
                        <Sparkles className="h-4 w-4 opacity-60" />
                      </div>
                      <img src={certificate3d} alt="Certificate" className="mx-auto my-4 h-24 w-24 object-contain drop-shadow-lg" />
                      <div className="text-center">
                        <div className="text-lg font-extrabold">{cert.course}</div>
                        <div className="text-xs opacity-70 mt-1">{cert.category}</div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-primary/5 p-3 text-center">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</div>
                          <div className="text-xl font-extrabold">{pct}%</div>
                        </div>
                        <div className="rounded-xl bg-amber-500/5 p-3 text-center">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Grade</div>
                          <div className="text-xl font-extrabold text-amber-600">{cert.grade}</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Issued</span>
                          <span className="font-medium text-foreground">{date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Attempt</span>
                          <span className="font-medium text-foreground">#{cert.attempt_id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Student</span>
                          <span className="font-mono text-foreground">{cert.student?.slice(0, 6)}...{cert.student?.slice(-4)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ── About section ── */}
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        {/* Featured cert */}
        <div className="grid gap-10 rounded-[2.5rem] border border-border/60 bg-card p-8 shadow-card md:p-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-primary-soft" />
            <div className="grid place-items-center rounded-[2rem] bg-gradient-to-br from-[oklch(0.94_0.05_295)] to-[oklch(0.86_0.09_290)] p-8">
              <img src={certificate3d} alt="Lurna NFT certificate" width={768} height={768} loading="lazy" className="h-72 w-72 object-contain" />
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> On-chain credentials
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Your achievements, minted forever</h2>
            <p className="mt-3 text-muted-foreground">
              Pass an AI Consensus quiz and your certificate is minted as an NFT on GenLayer.
              Permanent, transparent, and verifiable by anyone.
            </p>
          </div>
        </div>

        {/* Tier explainer */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            { name: "Platinum", range: "90% – 100%", desc: "Grade A — mastery confirmed by consensus." , icon: Trophy },
            { name: "Gold", range: "80% – 89%", desc: "Grade B — strong, professional-level competency." , icon: Award },
            { name: "Silver", range: "70% – 79%", desc: "Grade C — solid foundation, room to deepen." , icon: Star },
          ].map((t) => (
            <div key={t.name} className="rounded-3xl border border-border/60 bg-card p-7 shadow-card">
              <div className={`inline-grid h-12 w-12 place-items-center rounded-2xl ${tierColor[t.name]}`}>
                <t.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.range}</div>
              <div className="mt-1 text-xl font-extrabold">{t.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Verify section */}
        <div className="mt-16 rounded-3xl border border-border/60 bg-gradient-to-br from-primary-soft to-[var(--lavender)] p-8 md:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Verify any credential</h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground/70">Paste a certificate hash, wallet address, or Lurna handle to verify authenticity instantly.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="0x… or @username"
                className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm shadow-card outline-none focus:border-primary"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft cursor-pointer hover:scale-[1.02]">
              <ShieldCheck className="h-4 w-4" /> Verify
            </button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
