import { createClient } from "genlayer-js";
import { genlayerConfig } from "./config";

let readClient: ReturnType<typeof createClient> | null = null;
let writeClientCache: { address: string; client: ReturnType<typeof createClient> } | null = null;
let connectedOnce = false;

function getProvider() {
  if (typeof window === "undefined") return null;
  return (window as any).ethereum || null;
}

const NETWORK_PARAMS: Record<string, { chainId: string; chainName: string; rpcUrls: string[]; nativeCurrency: { name: string; symbol: string; decimals: number }; blockExplorerUrls: string[] }> = {
  testnet: {
    chainId: "0x107d",
    chainName: "GenLayer Bradbury Testnet",
    nativeCurrency: { name: "GEN", symbol: "GEN", decimals: 18 },
    rpcUrls: ["https://rpc-bradbury.genlayer.com"],
    blockExplorerUrls: ["https://explorer-bradbury.genlayer.com"],
  },
  studionet: {
    chainId: "0xF22F",
    chainName: "GenLayer Studio",
    nativeCurrency: { name: "GEN", symbol: "GEN", decimals: 18 },
    rpcUrls: ["https://studio.genlayer.com/api"],
    blockExplorerUrls: ["https://studio.genlayer.com/explorer"],
  },
};

const TARGET_CHAIN = genlayerConfig.network === "testnet" ? "0x107d" : "0xF22F";

export async function ensureCorrectNetwork() {
  const eth = getProvider();
  if (!eth) return;

  const chainIdHex = await eth.request({ method: "eth_chainId" });
  if (chainIdHex?.toLowerCase() === TARGET_CHAIN.toLowerCase()) return;

  try {
    await eth.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: TARGET_CHAIN }],
    });
  } catch (switchErr: any) {
    if (switchErr.code === 4902) {
      const params = NETWORK_PARAMS[genlayerConfig.network] || NETWORK_PARAMS.testnet;
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [params],
      });
    } else {
      throw switchErr;
    }
  }
}

export function getGenLayerClient() {
  if (readClient) return readClient;
  readClient = createClient({
    chain: genlayerConfig.chain,
    ...(genlayerConfig.rpcUrl ? { rpcUrl: genlayerConfig.rpcUrl } : {}),
  });
  return readClient;
}

export async function getWriteClient(address: string) {
  if (writeClientCache && writeClientCache.address === address) return writeClientCache.client;

  const eth = getProvider();
  const client = createClient({
    chain: genlayerConfig.chain,
    ...(genlayerConfig.rpcUrl ? { rpcUrl: genlayerConfig.rpcUrl } : {}),
    account: address as `0x${string}`,
    provider: eth || undefined,
  });

  if (!connectedOnce) {
    try {
      await (client as any).connect?.(genlayerConfig.network);
    } catch {}
    connectedOnce = true;
  }

  writeClientCache = { address, client };
  return client;
}
