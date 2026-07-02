import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Wallet, ExternalLink, Cpu } from "lucide-react";
import { detectWallets, type WalletInfo } from "@/lib/wallets";
import { useWallet } from "@/lib/genlayer/WalletContext";
import { useCallback } from "react";

const INSTALL_URLS: Record<string, string> = {
  metamask: "https://metamask.io/download/",
  rabby: "https://rabby.io/",
  coinbase: "https://www.coinbase.com/wallet",
  brave: "https://brave.com/wallet/",
  trust: "https://trustwallet.com/",
};

export function WalletSelectionModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { connect, isConnecting } = useWallet();
  const { detected, others, hasWallet } = detectWallets();

  const handleConnect = useCallback(async () => {
    await connect();
    onOpenChange(false);
  }, [connect, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription>
            Choose how to connect your wallet to Lurna.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-2">
          {detected.length > 0 && (
            <>
              {detected.map((w) => (
                <button
                  key={w.id}
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5 text-left transition hover:border-primary/50 hover:bg-primary/5 cursor-pointer disabled:opacity-50"
                >
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl text-lg" style={{ backgroundColor: w.color + "20" }}>
                    {w.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{w.name}</div>
                    <div className="text-xs text-muted-foreground">Detected · Click to connect</div>
                  </div>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </>
          )}

          {!hasWallet && (
            <div className="rounded-xl border border-dashed border-border/60 bg-card/50 p-4 text-center">
              <Cpu className="mx-auto h-6 w-6 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">No wallet detected</p>
              <p className="text-xs text-muted-foreground mt-1">
                Install a browser wallet to get started.
              </p>
            </div>
          )}

          {!hasWallet && others.length > 0 && (
            <div className="mt-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                Install a wallet
              </p>
              <div className="grid gap-2">
                {others.map((w) => (
                  <a
                    key={w.id}
                    href={INSTALL_URLS[w.id] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/50 p-2.5 text-left text-sm transition hover:bg-card hover:border-border/80 group"
                  >
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-lg text-base" style={{ backgroundColor: w.color + "15" }}>
                      {w.icon}
                    </span>
                    <span className="flex-1 font-medium">{w.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {detected.length === 0 && hasWallet && (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5 text-left transition hover:border-primary/50 hover:bg-primary/5 cursor-pointer disabled:opacity-50"
            >
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">Browser Wallet</div>
                <div className="text-xs text-muted-foreground">Click to connect</div>
              </div>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
