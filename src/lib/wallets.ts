export interface WalletInfo {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface DetectedWallet extends WalletInfo {
  detected: true;
  provider: NonNullable<Window["ethereum"]>;
}

interface WalletOption extends WalletInfo {
  detected: boolean;
  provider?: NonNullable<Window["ethereum"]>;
}

const WALLETS: WalletOption[] = [
  { id: "metamask", name: "MetaMask", icon: "🦊", color: "#F5841F", detected: false },
  { id: "rabby", name: "Rabby", icon: "🐰", color: "#8697FF", detected: false },
  { id: "coinbase", name: "Coinbase Wallet", icon: "🔵", color: "#0052FF", detected: false },
  { id: "brave", name: "Brave Wallet", icon: "🦁", color: "#FB542B", detected: false },
  { id: "trust", name: "Trust Wallet", icon: "🛡️", color: "#3375BB", detected: false },
];

export function detectWallets(): {
  detected: DetectedWallet[];
  others: WalletInfo[];
  hasWallet: boolean;
} {
  const eth = typeof window !== "undefined" ? window.ethereum : undefined;
  const detected: DetectedWallet[] = [];
  const others: WalletInfo[] = [];

  const flags: Record<string, { id: string; name: string; icon: string; color: string }> = {
    isMetaMask: { id: "metamask", name: "MetaMask", icon: "🦊", color: "#F5841F" },
    isRabby: { id: "rabby", name: "Rabby", icon: "🐰", color: "#8697FF" },
    isCoinbaseWallet: { id: "coinbase", name: "Coinbase Wallet", icon: "🔵", color: "#0052FF" },
    isBraveWallet: { id: "brave", name: "Brave Wallet", icon: "🦁", color: "#FB542B" },
    isTrust: { id: "trust", name: "Trust Wallet", icon: "🛡️", color: "#3375BB" },
  };

  for (const [flag, info] of Object.entries(flags)) {
    if ((eth as any)?.[flag]) {
      detected.push({ ...info, detected: true as const, provider: eth! });
    }
  }

  if (eth && detected.length === 0) {
    detected.push({
      id: "injected",
      name: "Browser Wallet",
      icon: "🔗",
      color: "#6B7280",
      detected: true as const,
      provider: eth,
    });
  }

  for (const w of WALLETS) {
    if (!detected.some((d) => d.id === w.id)) {
      others.push({ id: w.id, name: w.name, icon: w.icon, color: w.color });
    }
  }

  return { detected, others, hasWallet: !!eth };
}
