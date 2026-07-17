<h1 align="center">
  <img src="public/favicon.svg" width="35" height="35" style="vertical-align:middle;margin-right:8px" alt="LURNA">
  Lurna
</h1>

<p align="center">
  <b>Lurna is a decentralized learning platform on GenLayer that grades essays through multi-agent AI consensus. Each submission is evaluated by multiple AI validators (GPT, Claude, Llama, etc.) running inside GenLayer smart contracts — if supermajority agrees, the score is accepted on-chain.</b><br>
  AI-graded essays · On-chain NFT certificates · GenLayer
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

Deployed on **GenLayer StudioNet** testnet.

| Item | Detail |
|------|--------|
| **Network** | StudioNet |
| **RPC** | `https://studio.genlayer.com/api` |
| **Contract** | `0x1C63A5Ff844ec5Dd3e269f5ba8a66EDaF25ea146` |
| **Source** | `contracts/Lurna.py` |

A single unified Python contract handles:

- Quiz submission and AI Consensus evaluation
- Score registry with per-module best scores
- Leaderboard ranking
- NFT certificate minting and verification
- Display name registration
- Error taxonomy: `EXTERNAL` / `LLM_ERROR` / `CONSENSUS_FAILURE` / `TRANSIENT`

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **AI Consensus Grading** | Each essay answer is evaluated by `gl.vm.run_nondet_unsafe`. Leader runs AI evaluation via `exec_prompt(prompt, response_format="json")`; validators independently re-run with their own AI model and cross-validate scores for ±12 consistency. |
| **On-Chain Certificates** | NFT-style credentials minted for every passing essay (score ≥ 70%). Stored permanently in `TreeMap[u256, str]` with student, course, category, score, grade, tier, and timestamp. |
| **Leaderboard** | Aggregates per-module best scores across all students. Sorted by total percentage. Displays student address, handle (display name), modules passed, certificates earned, and highest grade. |
| **Wallet Authentication** | EIP-1193 compatible — MetaMask, Rabby, etc. Wallet selection modal on "Sign In". Sender bound via `gl.message.sender_address` — no `student` parameter accepted. |
| **Display Names** | On-chain handle registration via `set_display_name`. Sender bound — no address parameter. |
| **Essay-Only** | All 154 modules use scenario-based essay questions (3 per module). No MCQ, no answer key — AI grades purely on depth, clarity, critical thinking, originality, and detail. |
| **Anti-Manipulation** | Questions verified by on-chain rolling hash — caller cannot fabricate easier questions. Consensus failures (`total_score == 0`) excluded from state — no certificates or leaderboard entries manufactured. |

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│  TanStack Start · React · TypeScript                 │
│  Tailwind CSS · Shadcn UI · Lucide Icons             │
├─────────────────────────────────────────────────────┤
│                    Blockchain                         │
│  GenLayer (StudioNet)                                 │
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
│   ├── data/                         # Educational content (151 modules, essay questions only)
│   │   ├── content.tsx                #   Core modules (GenLayer, Blockchain, Smart Contracts, Crypto, AI)
│   │   ├── content-extra.tsx          #   Extra modules (Solidity, Web3, Ethereum, DeFi, NFT)
│   │   ├── content-extra2.tsx         #   More modules (84 across 12 categories)
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
│   │   ├── quiz-utils.ts             #   Grading thresholds, localStorage helpers
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
│   │   ├── assessments.tsx           #   Assessment page (Learn + Essay tabs)
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

### Essay Flow

```
User selects module → Read summary (Learn tab) → Answer 3 essay questions (Assess tab)
        ↓
All answers submitted → submit_quiz() called on contract (sender bound via gl.message.sender_address)
        ↓
Leader: exec_prompt(prompt) → AI evaluates all 3 essays (critical teacher, grades 0–100)
        ↓
Validator: independently re-runs exec_prompt (different AI model) → cross-validates scores for consistency
        ↓
Consensus reached → Scores recorded → Best score updated → Certificate minted if ≥70%
        ↓
Receipt parsed → Poll chain view → Dashboard reads finalized data directly (no localStorage fallback)
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
| `submit_quiz(module_id, category, course, answers, questions, module_summary)` | Module + pipe-delimited answers/questions | Submit essay for AI Consensus evaluation; sender bound via `gl.message.sender_address`. Returns `{"error":"...","type":"..."}` on failure |
| `set_display_name(name)` | Name | Register on-chain display name; sender bound via `gl.message.sender_address` |

### Anti-Cheat: Hash-Verified Questions

The full curriculum (154 modules × 3 essay questions) is too large to store on-chain (~250KB). Instead, Lurna stores only a **rolling hash** of each module's questions (~5KB):

```
Module "ai-intro" → hash(q1 + "|||" + q2 + "|||" + q3) = "4054525318"
```

When a student submits, the caller **must send both answers and questions** (as pipe-delimited strings). The contract parses with `json.loads` first, falls back to `split("|||")`, then recomputes `_checksum("|||".join(questions))` and rejects if it doesn't match the stored hash. This prevents anyone from fabricating easier questions — the hash is immutable on-chain.

The `_checksum` function uses a polynomial rolling hash (`h = (h × 31 + ord(c)) & 0xFFFFFFFF`) — deterministic, no imports, and identical between the JS hash generator (`scripts/gen-hashes.cjs`) and the Python contract.

### Consensus Pattern

Lurna uses `gl.vm.run_nondet_unsafe` — the leader evaluates essays via AI, and validators independently re-run the same prompt with their own AI model, then compare scores:

```python
def leader_fn() -> list:
    raw = gl.nondet.exec_prompt(prompt, response_format="json")
    # AI returns JSON array of {"score": N, "reasoning": "..."}
    # response_format="json" returns parsed list/dict directly
    try:
        return json.loads(raw_clean) if isinstance(raw_clean, str) else raw_clean
    except:
        # Fallback: regex for "score: N"
        scores = re.findall(r"score[\":\s]+(\d+)", raw, re.I)
        return [{"score": s, "reasoning": ""} for s in scores]

def validator_fn(leader_res) -> bool:
    if not isinstance(leader_res, gl.vm.Return): return False
    leader_data = leader_res.calldata
    if len(leader_data) != num_q: return False
    mine = leader_fn()  # Re-run with different AI model
    if len(mine) != num_q: return False
    # Both returned all zeros = agree on failure → excluded from state
    if all(s == 0 for s in leader_data) and all(s == 0 for s in mine):
        return True
    for i in range(num_q):
        if abs(leader_data[i]["score"] - mine[i]["score"]) > 12:
            return False
    return True

result = gl.vm.run_nondet_unsafe(leader_fn, validator_fn)
```

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
- MetaMask (or any EIP-1193 wallet) with StudioNet configured
- No gas fees required on StudioNet

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
| `VITE_GENLAYER_NETWORK` | GenLayer network name | `studionet` |
| `VITE_GENLAYER_RPC_URL` | GenLayer RPC endpoint | `https://studio.genlayer.com/api` |
| `VITE_CONTRACT_LURNA` | Deployed contract address | `0x...` |

### Key Frontend Contracts API

```typescript
// Read
const attempts = await lurna.getStudentAttempts(address);
const certs = await lurna.getStudentCertificates(address);
const scores = await lurna.getStudentBestScores(address);
const leaderboard = await lurna.getLeaderboard(10);

// Write (sender bound automatically via connected wallet)
const result = await lurna.setDisplayName("MyName");
const quizResult = await lurna.submitQuiz(moduleId, category, course, answers, questions, moduleSummary);
```

---

## 📦 Deployment

### Deploy Contract

1. Open [GenLayer Studio](https://studio.genlayer.com)
2. Paste contents of `contracts/Lurna.py`
3. Deploy to StudioNet
4. Copy deployed contract address to `.env`

### Deploy Frontend

```bash
npm run build
# Deploy the dist/ directory to Cloudflare Pages or your hosting provider
```

---

## 📄 License

This project is for educational purposes. Built on [GenLayer](https://genlayer.com) with [TanStack Start](https://tanstack.com/start).

---

<p align="center">
  <sub>Built by <a href="https://github.com/dhozil">@dhozil</a></sub>
</p>
