import { localnet, studionet, testnetBradbury } from "genlayer-js/chains";

export type GenLayerNetwork = "localnet" | "studionet" | "testnet";

const chainMap = {
  localnet,
  studionet,
  testnet: testnetBradbury,
};

const BRADBURY_RPC = "https://rpc-bradbury.genlayer.com";
const BRADBURY_CONTRACT = "0x26069691307b5a2EfB984f178a0d77B5E2B5366A";

function getNetwork(): GenLayerNetwork {
  const v = import.meta.env.VITE_GENLAYER_NETWORK;
  if (v === "localnet" || v === "studionet" || v === "testnet") return v;
  return "testnet";
}

function getContractAddress(name: string): string {
  return import.meta.env[`VITE_CONTRACT_${name}`] || BRADBURY_CONTRACT;
}

export const genlayerConfig = {
  network: getNetwork(),
  chain: chainMap[getNetwork()],
  contracts: {
    Lurna: getContractAddress("LURNA"),
  },
  get rpcUrl(): string {
    return import.meta.env.VITE_GENLAYER_RPC_URL || BRADBURY_RPC;
  },
} as const;
