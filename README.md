<h1 align="center">
  <img src="public/favicon.svg" width="35" height="35" style="vertical-align:middle;margin-right:8px" alt="LURNA">
  Lurna
</h1>

<p align="center">
  <b>Lurna is a decentralized learning platform on GenLayer that grades quizzes through multi-agent AI consensus. Each submission is evaluated by multiple AI validators (GPT, Claude, Llama, etc.) running inside GenLayer smart contracts — if supermajority agrees, the score is accepted on-chain.</b><br>
  Multi-agent quiz grading · On-chain NFT certificates · GenLayer
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/TanStack%20Start-FF4154?style=flat-square&logo=react-query&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/GenLayer-8B5CF6?style=flat-square&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white">
</p>

---

## 📋 Table of Contents

- [Smart Contract](#-smart-contract)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Certificate Tiers](#-certificate-tiers)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Deployment](#-deployment)
- [License](#-license)

---

## 📜 Smart Contract

Deployed on **GenLayer Bradbury** testnet.

| Item | Detail |
|------|--------|
| **Network** | Bradbury |
| **Chain ID** | `4221` (`0x107d`) |
| **RPC** | `https://rpc-bradbury.genlayer.com` |
| **Explorer** | [explorer-bradbury.genlayer.com](https://explorer-bradbury.genlayer.com) |
| **Contract** | `0x72b013f92CaB06529a73d250d70ad6C5D4dceFd2` |
| **Source** | `contracts/Lurna.py` |

A single unified Python contract handles:

- Quiz submission and AI Consensus evaluation
- Score registry with per-module best scores
- Leaderboard ranking
- NFT certificate minting and verification
- Display name registration
- Admin transfer

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **AI Consensus Grading** | Each quiz answer is evaluated by `exec_prompt` with multi-agent validation. Validators confirm the leader produced a valid result — permissive TravelMindAI pattern prevents `VALIDATORS_TIMEOUT`. |
| **On-Chain Certificates** | NFT-style credentials minted for every passing quiz (score ≥ 70%). Stored permanently in `TreeMap[u256, str]` with student, course, category, score, grade, tier, and timestamp. |
| **Leaderboard** | Aggregates per-module best scores across all students. Sorted by total percentage. Displays student address, handle (display name), modules passed, certificates earned, and highest grade. |
| **Wallet Authentication** | EIP-1193 compatible — MetaMask, Rabby, Coinbase Wallet, Brave Wallet, Trust Wallet, and generic browser wallets. Wallet selection modal on "Sign In". |
| **Display Names** | On-chain handle registration. Saved to contract via `set_display_name`, cached in localStorage for fast dashboard loading. |
| **Quiz Timer** | 5-second countdown per question with auto-advance. Configurable in `assessments.tsx`. |
| **Question Shuffle** | Questions and answer options are shuffled each quiz start for fairness. |

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│  TanStack Start · React · TypeScript                 │
│  Tailwind CSS · Shadcn UI · Lucide Icons             │
├─────────────────────────────────────────────────────┤
│                    Blockchain                         │
│  GenLayer (Bradbury testnet)                         │
│  genlayer-js SDK · viem                              │
├─────────────────────────────────────────────────────┤
│                    Smart Contract                     │
│  Python (GenLayer SDK)                                │
│  Single unified contract: Lurna.py                    │
├─────────────────────────────────────────────────────┤
│                    Tooling                            │
│  npm · Vite · ESLint · Prettier                      │
│  TanStack Router (file-based routing)                 │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
lurna/
├── contracts/
│   └── Lurna.py                      # GenLayer smart contract
│
├── public/
│   └── favicon.svg                   # Site favicon
│
├── src/
│   ├── assets/                       # Images (certificate 3D, hero, icons)
│   │
│   ├── components/
│   │   ├── site/                     # Site-wide components
│   │   │   ├── SiteShell.tsx          #   Layout shell (Nav, Footer, DisplayNameModal)
│   │   │   ├── WalletSelectionModal.tsx # Wallet provider picker
│   │   │   └── SectionHeader.tsx      #   Reusable section heading
│   │   └── ui/                       # Shadcn UI primitives (50+ components)
│   │
│   ├── data/                         # Educational content
│   │   ├── content.tsx                #   Core quiz questions & modules
│   │   ├── content-extra.tsx          #   Extra modules
│   │   ├── content-extra2.tsx         #   More modules
│   │   └── all-data.tsx               #   Aggregated data export
│   │
│   ├── hooks/
│   │   ├── useLurnaContracts.ts       #   React Query hooks (display name, scores, certs)
│   │   └── use-mobile.tsx             #   Mobile detection hook
│   │
│   ├── lib/
│   │   ├── contracts/
│   │   │   └── Lurna.ts               #   Contract wrapper (read/write, tx handling)
│   │   ├── genlayer/
│   │   │   ├── client.ts             #   GenLayer client setup (read + write)
│   │   │   ├── config.ts             #   Network & contract config from env
│   │   │   └── WalletContext.tsx      #   Wallet connection context + provider
│   │   ├── wallets.ts                #   Wallet detection utility
│   │   ├── quiz-utils.ts             #   Quiz shuffling, grading utilities
│   │   ├── utils.ts                  #   General utilities (cn helper)
│   │   ├── error-capture.ts          #   Server-side error capture
│   │   ├── error-page.ts             #   Error page renderer
│   │   └── lovable-error-reporting.ts #   Error reporting integration
│   │
│   ├── pages/                        # Extracted page components
│   │   ├── DashboardPage.tsx          #   Dashboard (display name, scores, attempts)
│   │   ├── CertificatesPage.tsx       #   Certificate collection + preview
│   │   └── HowItWorksPage.tsx         #   How it works / about page
│   │
│   ├── routes/                       # TanStack Router file-based routes
│   │   ├── __root.tsx                 #   Root layout
│   │   ├── index.tsx                  #   Home page
│   │   ├── assessments.tsx           #   Quiz taking page
│   │   ├── dashboard.tsx             #   Dashboard route
│   │   ├── certificates.tsx          #   Certificates route
│   │   ├── how-it-works.tsx          #   How it works route
│   │   ├── leaderboard.tsx           #   Leaderboard route
│   │   └── README.md                 #   Routing conventions reference
│   │
│   ├── routeTree.gen.ts              # Auto-generated route tree
│   ├── router.tsx                    # Router instance
│   ├── server.ts                     # SSR server (Vinxi)
│   ├── start.ts                      # App entry point
│   └── styles.css                    # Global styles + Tailwind
│
├── .env.example                      # Environment variable template
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── README.md
```

---

## 🏗 Architecture

### Quiz Flow

```
User selects module → Questions shuffled → 5s timer per question
        ↓
All answers submitted → submit_quiz() called on contract
        ↓
exec_prompt(prompt) → Leader generates scores
        ↓
Validators confirm leader produced valid Return (permissive)
        ↓
Scores recorded → Best score updated → Certificate minted if ≥70%
        ↓
Receipt parsed on frontend → Attempt data displayed
```

### Smart Contract Functions

#### Views (Read)

| Function | Returns | Description |
|----------|---------|-------------|
| `get_evaluation(eval_id)` | `string (JSON)` | Individual question evaluation result |
| `get_total_evaluations()` | `u256` | Total evaluations performed |
| `get_attempt(attempt_id)` | `string (JSON)` | Quiz attempt details |
| `get_student_attempts(student)` | `string (JSON array)` | All attempt IDs for a student |
| `get_student_best_scores(student)` | `string (JSON)` | Per-module best scores for a student |
| `get_student_total_best_score(student)` | `u256` | Sum of best score percentages |
| `get_leaderboard(limit)` | `string (JSON array)` | Top students ranked by total score |
| `get_certificate(cert_id)` | `string (JSON)` | Certificate metadata |
| `get_student_certificates(student)` | `string (JSON array)` | All certificates for a student |
| `get_total_supply()` | `u256` | Total certificates minted |
| `verify_certificate(cert_id, student)` | `bool` | Verify a certificate belongs to a student |
| `get_display_name(address)` | `string` | Get display name for an address |

#### Writes

| Function | Parameters | Description |
|----------|-----------|-------------|
| `submit_quiz(student, module_id, category, course, questions, points_per_question, module_summary)` | Quiz data + answers | Submit quiz for AI Consensus evaluation |
| `set_display_name(student, name)` | Address + name | Register on-chain display name |
| `transfer_admin(new_admin)` | New admin address | Transfer contract ownership |

### Consensus Pattern

Lurna uses a **permissive validator pattern** (inspired by TravelMindAI):

```python
def leader_fn() -> list:
    raw = gl.nondet.exec_prompt(prompt)
    # Handles list, dict, and str return formats
    return parsed_scores

def validator_fn(leader_res) -> bool:
    return isinstance(leader_res, gl.vm.Return)  # Any valid Return passes
```

Validators do NOT re-run `exec_prompt` — each validator has a different AI model, so re-running would produce different scores and cause `VALIDATORS_TIMEOUT`. Instead, validators simply confirm the leader produced a valid `Return` object. Post-processing extracts the scores from `consensus_data`.

---

## 🏅 Certificate Tiers

| Score | Grade | Tier | Gradient | On-Chain |
|-------|-------|------|----------|----------|
| 90–100 | **A** | **Platinum** | Purple | ✅ Minted |
| 80–89 | **B** | **Gold** | Amber | ✅ Minted |
| 70–79 | **C** | **Silver** | Gray | ✅ Minted |
| < 70 | **F** | Not Passed | — | ❌ Not minted |

Only passing scores (≥ 70%) result in on-chain certificate minting.

---

## 🚦 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- MetaMask (or any EIP-1193 wallet) with Bradbury testnet configured
- GEN test tokens for transaction fees (faucet at [GenLayer Discord](https://discord.gg/genlayer))

### Installation

```bash
# Clone the repository
git clone https://github.com/dhozil/lurna.git
cd lurna

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your deployed contract address

# Start development server
npm run dev
```

---

## 💻 Development

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Create production build |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint across the project |
| `npm run format` | Format code with Prettier |

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GENLAYER_NETWORK` | GenLayer network name | `testnet` |
| `VITE_GENLAYER_RPC_URL` | GenLayer RPC endpoint | `https://rpc-bradbury.genlayer.com` |
| `VITE_CONTRACT_LURNA` | Deployed contract address | `0x...` |

### Key Frontend Contracts API

```typescript
// Read
const attempts = await lurna.getStudentAttempts(address);
const certs = await lurna.getStudentCertificates(address);
const scores = await lurna.getStudentBestScores(address);
const leaderboard = await lurna.getLeaderboard(10);

// Write
const result = await lurna.setDisplayName(address, "MyName");
const quizResult = await lurna.submitQuiz(address, moduleId, ...);
```

---

## 📦 Deployment

### Deploy Contract

1. Open [GenLayer Studio](https://studio.genlayer.com)
2. Paste contents of `contracts/Lurna.py`
3. Deploy to Bradbury testnet
4. Copy deployed contract address to `.env`

### Deploy Frontend

```bash
npm run build
# Deploy the .output/ directory to your hosting provider
```

---

## 📄 License

This project is for educational purposes. Built on [GenLayer](https://genlayer.com) with [TanStack Start](https://tanstack.com/start).

---

<p align="center">
  <sub>Built by <a href="https://github.com/dhozil">@dhozil</a></sub>
</p>
