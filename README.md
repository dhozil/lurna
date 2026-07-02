<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Lurna-AI%20Consensus%20Learning-8B5CF6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgM0wzIDEzbDE3IDEwIDE3LTEweiIgZmlsbD0iIzhCNUNGNiIvPjxwYXRoIGQ9Ik0zIDEzdjE0bDE3IDEwIDMtMnYtMTJ6IiBmaWxsPSIjNkI1MkM3Ii8+PHBhdGggZD0iTTM3IDEzVjI3bC0xNyAxMC0zLTJ2LTEyeiIgZmlsbD0iIzdDNENERiIvPjwvc3ZnPg==">
    <img alt="Lurna" src="https://img.shields.io/badge/Lurna-AI%20Consensus%20Learning-8B5CF6?style=for-the-badge">
  </picture>
</p>

<p align="center">
  <b>AI-powered quiz platform with on-chain NFT certificates on GenLayer.</b><br>
  Every answer graded by multi-agent consensus — every certificate minted forever.
</p>

<p align="center">
  <a href="https://github.com/dhozil/lurna"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-dhozil/lurna-181717?style=flat&logo=github"></a>
  <a href="https://genlayer.com"><img alt="GenLayer" src="https://img.shields.io/badge/GenLayer-Bradbury-8B5CF6?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgM0wzIDEzbDE3IDEwIDE3LTEweiIgZmlsbD0iIzhCNUNGNiIvPjxwYXRoIGQ9Ik0zIDEzdjE0bDE3IDEwIDMtMnYtMTJ6IiBmaWxsPSIjNkI1MkM3Ii8+PHBhdGggZD0iTTM3IDEzVjI3bC0xNyAxMC0zLTJ2LTEyeiIgZmlsbD0iIzdDNENERiIvPjwvc3ZnPg=="></a>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss">
  <img alt="TanStack" src="https://img.shields.io/badge/TanStack%20Start-FF4154?style=flat&logo=reactquery">
  <img alt="Python" src="https://img.shields.io/badge/GenLayer%20Contract-3776AB?style=flat&logo=python">
</p>

---

## Smart Contract

Deployed on **GenLayer Bradbury** testnet.

| Network | Contract Address |
|---------|----------------|
| `Bradbury` (chain `4221`) | `0xee338ecDA6ab8617e9F909ddF826043FC34A00ED` |
| Explorer | [View on explorer-bradbury.genlayer.com](https://explorer-bradbury.genlayer.com) |

One unified contract (`contracts/Lurna.py`) handles quiz evaluation, score registry, leaderboard, and certificate minting.

---

## Features

| | |
|---|---|
| **AI Consensus Grading** | Multi-agent evaluation via GenLayer `exec_prompt` — validators reach consensus on each answer |
| **On-Chain Certificates** | NFT credentials minted per passing quiz, stored permanently on GenLayer |
| **Tier System** | Platinum (A), Gold (B), Silver (C) — only scores ≥70% are minted |
| **Leaderboard** | Per-module best scores ranked by total percentage |
| **Wallet Auth** | MetaMask, Rabby, Coinbase, Brave, Trust Wallet — any EIP-1193 provider |
| **Display Names** | On-chain handle registration for leaderboard identity |

---

## Tech Stack

```
Frontend        TanStack Start · React · TypeScript · Tailwind CSS · Shadcn UI
Blockchain      GenLayer (Bradbury testnet, chainId 4221)
Smart Contract  Python (GenLayer SDK) — single unified contract
Package Manager npm
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy env variables (edit contract address as needed)
cp .env.example .env

# Start development
npm run dev
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

---

## Certificate Tiers

| Score | Grade | Tier | On-Chain |
|-------|-------|------|----------|
| 90–100 | A | **Platinum** | Minted |
| 80–89 | B | **Gold** | Minted |
| 70–79 | C | **Silver** | Minted |
| < 70 | F | Not Passed | Not minted |

---

<p align="center">
  Built with · GenLayer · TanStack · TypeScript
</p>
