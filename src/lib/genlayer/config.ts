import { localnet, studionet, testnetBradbury } from "genlayer-js/chains";

export type GenLayerNetwork = "localnet" | "studionet" | "testnet";

const chainMap = {
  localnet,
  studionet,
  testnet: testnetBradbury,
};

function getNetwork(): GenLayerNetwork {
  const v = import.meta.env.VITE_GENLAYER_NETWORK;
  if (v === "localnet" || v === "studionet" || v === "testnet") return v;
  return "studionet";
}

function getContractAddress(name: string): string {
  return import.meta.env[`VITE_CONTRACT_${name}`] || "";
}

export const genlayerConfig = {
  network: getNetwork(),
  chain: chainMap[getNetwork()],
  contracts: {
    Lurna: getContractAddress("LURNA"),
  },
  get rpcUrl(): string {
    return import.meta.env.VITE_GENLAYER_RPC_URL || "";
  },
} as const;
