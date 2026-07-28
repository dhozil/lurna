import { studionet } from "genlayer-js/chains";

const DEFAULT_RPC = "https://studio.genlayer.com/api";
const DEFAULT_CONTRACT = "0xD101ef58775FF960fFF3aE38E52fD16a5575c923";

function getNetworkName(): string {
  const v = import.meta.env.VITE_GENLAYER_NETWORK;
  return v || "studionet";
}

function getContractAddress(name: string): string {
  return import.meta.env[`VITE_CONTRACT_${name}`] || DEFAULT_CONTRACT;
}

export const genlayerConfig = {
  network: getNetworkName(),
  chain: studionet,
  contracts: {
    Lurna: getContractAddress("LURNA"),
  },
  get rpcUrl(): string {
    return import.meta.env.VITE_GENLAYER_RPC_URL || DEFAULT_RPC;
  },
} as const;
