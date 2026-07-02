# Lurna

AI Consensus learning platform with on-chain certificates, built on [GenLayer](https://genlayer.com).

## Contract

| Network | Address |
|---------|---------|
| Bradbury (testnet) | `0xee338ecDA6ab8617e9F909ddF826043FC34A00ED` |

## Tech Stack

- **Frontend**: TanStack Start, React, TypeScript, Tailwind CSS, Shadcn UI
- **Blockchain**: GenLayer (Bradbury testnet)
- **Smart Contract**: Python (GenLayer SDK) — single unified contract in `contracts/Lurna.py`

## Features

- AI Consensus quiz evaluation — multi-agent grading
- On-chain NFT certificates with tier system (Platinum / Gold / Silver)
- Leaderboard with per-module best scores
- Wallet-based authentication (MetaMask, Rabby, Coinbase, etc.)
- Display name registration
- Real-time quiz timer and auto-submit

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your deployed contract address

# Start dev server
npm run dev
```

## Development

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
```

## Certificate Tiers

| Score | Grade | Tier |
|-------|-------|------|
| 90–100 | A | Platinum |
| 80–89 | B | Gold |
| 70–79 | C | Silver |
| < 70 | F | Not Passed |
