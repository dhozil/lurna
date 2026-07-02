import { Link } from "@tanstack/react-router";
import { ArrowRight, Star, Wallet, Sun, Moon } from "lucide-react";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useWalletConnection, useDisplayName, useSetDisplayName } from "@/hooks/useLurnaContracts";
import { WalletSelectionModal } from "@/components/site/WalletSelectionModal";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/assessments", label: "Assessments" },
  { to: "/certificates", label: "Certificates" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/leaderboard", label: "Leaderboard" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-soft">
        <Star className="h-5 w-5 text-primary-foreground" fill="currentColor" />
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[var(--sun)]" />
      </div>
      <div className="leading-none">
        <div className="text-xl font-extrabold tracking-tight">Lurna</div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Learn · Verify · Certify
        </div>
      </div>
    </Link>
  );
}

function Nav() {
  const { address, isConnected, connect, isConnecting } = useWalletConnection();
  const { data: displayName } = useDisplayName(isConnected ? address : null);
  const [dark, setDark] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lurna_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("lurna_theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{
                className: "text-foreground font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-primary",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="hidden md:inline-flex cursor-pointer rounded-full border border-border/60 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {isConnected ? (
            <span className="hidden items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-700 shadow-sm md:inline-flex">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-green-600 text-white"><Wallet className="h-3 w-3" /></span>
              {displayName || address!.slice(0, 6) + "..." + address!.slice(-4)}
            </span>
          ) : (
            <button
              onClick={() => setWalletModalOpen(true)}
              disabled={isConnecting}
              className="hidden cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.24_300)] px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] disabled:opacity-50 md:inline-flex"
            >
              <Wallet className="h-4 w-4" />
              {isConnecting ? "Connecting..." : "Sign In"}
            </button>
          )}

        </div>
      </div>
      <WalletSelectionModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
    </header>
  );
}

function DisplayNameModal() {
  const { address, isConnected } = useWalletConnection();
  const { data: name, isFetched } = useDisplayName(isConnected ? address : null);
  const mutation = useSetDisplayName();
  const [input, setInput] = useState("");
  const [dismissed, setDismissed] = useState(false);

  const show = isConnected && isFetched && !name && !dismissed;
  const saving = mutation.isPending;

  const handleSave = useCallback(() => {
    if (!input.trim() || saving) return;
    mutation.mutate(input.trim(), { onSuccess: () => setDismissed(true) });
  }, [input, saving, mutation]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-border/60 bg-card p-8 shadow-2xl">
        <h2 className="text-xl font-extrabold">Set Your Display Name</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a name to appear on the leaderboard and dashboard.
        </p>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. CryptoLearner"
          maxLength={32}
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="mt-5 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={!input.trim() || saving}
            className="flex-1 rounded-full bg-gradient-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-soft cursor-pointer hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Name"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const cols: { title: string; items: { label: string; to: string }[] }[] = [
    { title: "Product", items: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Assessments", to: "/assessments" },
      { label: "Certificates", to: "/certificates" },
      { label: "Leaderboard", to: "/leaderboard" },
    ]},
    { title: "Learn", items: [
      { label: "How It Works", to: "/how-it-works" },
      { label: "Learning Paths", to: "/assessments" },
      { label: "Categories", to: "/assessments" },
      { label: "FAQ", to: "/how-it-works" },
    ]},
    { title: "Connect", items: [
      { label: "Home", to: "/" },
      { label: "GenLayer", to: "https://genlayer.com" },
      { label: "Twitter", to: "https://x.com/genlayer" },
      { label: "Discord", to: "https://discord.gg/genlayer" },
    ]},
  ];
  return (
    <footer className="border-t border-border/60 bg-card/60">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-14 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Lurna — an AI Consensus learning platform with on-chain certificates,
            built on GenLayer.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-bold text-foreground">{c.title}</div>
            <ul className="mt-4 space-y-2">
              {c.items.map((i) => (
                <li key={i.label}>
                  {i.to.startsWith("http") ? (
                    <a href={i.to} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                      {i.label}
                    </a>
                  ) : (
                    <Link to={i.to} className="text-sm text-muted-foreground hover:text-foreground">
                      {i.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground lg:px-8">
          <span>© {new Date().getFullYear()} Lurna. Learn. Verify. Certify.</span>
          <span>Built on GenLayer · AI Consensus</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <DisplayNameModal />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-hero">
      <div aria-hidden className="absolute -left-32 top-10 -z-0 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div aria-hidden className="absolute -right-24 -top-10 -z-0 h-72 w-72 rounded-full bg-[var(--mint)]/25 blur-3xl" />
      <div className="relative mx-auto max-w-[90rem] px-5 py-16 md:py-24 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-card backdrop-blur">
          {eyebrow}
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
        )}
      </div>
    </section>
  );
}
