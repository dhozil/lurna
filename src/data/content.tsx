import type { LucideIcon } from "lucide-react";
import {
  Boxes, BrainCircuit, Globe, Lock, Code2, Sparkles,
  ShieldCheck, GraduationCap, Database, PenTool, Rocket,
  Server, Network, FileCode, Palette, Bitcoin,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

/* ───────── types ───────── */

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface Module {
  id: string;
  title: string;
  summary: string;
  quiz: Question[];
}

export interface Track {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export interface CategoryMeta {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
  tint: string;
  group: string;
}

export interface CategoryData extends CategoryMeta {
  tracks: Track[];
}

/* ───────── helpers ───────── */

export const categorySlugs: Record<string, string> = {
  Blockchain: "Blockchain",
  GenLayer: "GenLayer",
  "Smart Contracts": "Smart Contracts",
  Solidity: "Solidity",
  Web3: "Web3",
  Ethereum: "Ethereum",
  DeFi: "DeFi",
  NFT: "NFT",
  Crypto: "Crypto",
  "Artificial Intelligence": "AI",
  "Cyber Security": "Cyber Security",
  "Programming Fundamentals": "Programming",
  JavaScript: "JavaScript",
  TypeScript: "TypeScript",
  React: "React",
  "Next.js": "Next.js",
  Database: "Database",
  Supabase: "Supabase",
  "Product Management": "Product Management",
  "UI/UX Design": "UI/UX Design",
  "Startup Fundamentals": "Startup Fundamentals",
  "Design Systems": "Design Systems",
};

/* ───────── category metadata (shared by index / categories / learn) ───────── */

export const allCategories: CategoryMeta[] = [
  { id: "Blockchain", label: "Blockchain", desc: "Master distributed ledger technology, consensus mechanisms, and blockchain architecture.", icon: Boxes, tint: "from-[oklch(0.85_0.12_260)] to-[oklch(0.75_0.15_255)]", group: "Blockchain & Web3" },
  { id: "GenLayer", label: "GenLayer", desc: "Explore GenLayer Intelligent Contracts, Optimistic Democracy, and AI-powered blockchain development.", icon: GenLayerMark, tint: "from-[oklch(0.9_0.1_295)] to-[oklch(0.78_0.15_285)]", group: "Blockchain & Web3" },
  { id: "Smart Contracts", label: "Smart Contracts", desc: "Learn to build secure, efficient smart contracts for decentralized applications.", icon: Lock, tint: "from-[oklch(0.88_0.08_300)] to-[oklch(0.78_0.12_295)]", group: "Blockchain & Web3" },
  { id: "Solidity", label: "Solidity", desc: "Deep dive into Solidity programming — from syntax to advanced patterns.", icon: FileCode, tint: "from-[oklch(0.85_0.12_0)] to-[oklch(0.75_0.15_355)]", group: "Blockchain & Web3" },
  { id: "Web3", label: "Web3", desc: "Build decentralized applications that connect to blockchain networks.", icon: Globe, tint: "from-[oklch(0.85_0.1_235)] to-[oklch(0.75_0.14_230)]", group: "Blockchain & Web3" },
  { id: "Ethereum", label: "Ethereum", desc: "Understand Ethereum protocol, EVM, gas optimization, and layer 2 scaling.", icon: Network, tint: "from-[oklch(0.85_0.12_260)] to-[oklch(0.75_0.15_255)]", group: "Blockchain & Web3" },
  { id: "DeFi", label: "DeFi", desc: "Explore decentralized finance protocols, AMMs, lending, and yield strategies.", icon: ShieldCheck, tint: "from-[oklch(0.88_0.14_145)] to-[oklch(0.78_0.18_140)]", group: "Blockchain & Web3" },
  { id: "NFT", label: "NFT", desc: "Create, mint, and trade non-fungible tokens across marketplaces.", icon: Sparkles, tint: "from-[oklch(0.88_0.08_300)] to-[oklch(0.78_0.12_295)]", group: "Blockchain & Web3" },
  { id: "Crypto", label: "Crypto", desc: "Foundations of cryptocurrency — wallets, transactions, and security.", icon: Bitcoin, tint: "from-[oklch(0.88_0.12_85)] to-[oklch(0.78_0.16_75)]", group: "Blockchain & Web3" },
  { id: "AI", label: "Artificial Intelligence", desc: "AI fundamentals, machine learning, neural networks, and practical applications.", icon: BrainCircuit, tint: "from-[oklch(0.9_0.12_180)] to-[oklch(0.78_0.16_175)]", group: "AI & Engineering" },
  { id: "Cyber Security", label: "Cyber Security", desc: "Protect systems, networks, and data from digital attacks.", icon: ShieldCheck, tint: "from-[oklch(0.88_0.1_240)] to-[oklch(0.78_0.14_235)]", group: "AI & Engineering" },
  { id: "Programming", label: "Programming Fundamentals", desc: "Core programming concepts — variables, loops, functions, and algorithms.", icon: Code2, tint: "from-[oklch(0.85_0.1_200)] to-[oklch(0.75_0.14_195)]", group: "AI & Engineering" },
  { id: "JavaScript", label: "JavaScript", desc: "Master JavaScript — from basics to async programming and ES6+.", icon: Code2, tint: "from-[oklch(0.92_0.14_85)] to-[oklch(0.82_0.18_75)]", group: "AI & Engineering" },
  { id: "TypeScript", label: "TypeScript", desc: "Type-safe JavaScript with interfaces, generics, and advanced types.", icon: Code2, tint: "from-[oklch(0.85_0.14_240)] to-[oklch(0.75_0.18_235)]", group: "AI & Engineering" },
  { id: "React", label: "React", desc: "Build modern UIs with React — hooks, state management, and component patterns.", icon: Sparkles, tint: "from-[oklch(0.88_0.12_200)] to-[oklch(0.78_0.16_195)]", group: "AI & Engineering" },
  { id: "Next.js", label: "Next.js", desc: "Full-stack React framework with SSR, routing, and API routes.", icon: CpuIcon, tint: "from-[oklch(0.85_0.1_220)] to-[oklch(0.75_0.14_215)]", group: "AI & Engineering" },
  { id: "Database", label: "Database", desc: "Relational and NoSQL databases, query optimization, and data modeling.", icon: Database, tint: "from-[oklch(0.85_0.1_160)] to-[oklch(0.75_0.14_155)]", group: "AI & Engineering" },
  { id: "Supabase", label: "Supabase", desc: "Open-source Firebase alternative — auth, real-time, and PostgreSQL.", icon: Server, tint: "from-[oklch(0.88_0.1_140)] to-[oklch(0.78_0.14_135)]", group: "AI & Engineering" },
  { id: "Product Management", label: "Product Management", desc: "Drive product strategy, roadmaps, and cross-functional teams.", icon: Rocket, tint: "from-[oklch(0.88_0.1_30)] to-[oklch(0.78_0.14_25)]", group: "Product & Design" },
  { id: "UI/UX Design", label: "UI/UX Design", desc: "Design intuitive interfaces with user-centered design principles.", icon: Palette, tint: "from-[oklch(0.88_0.1_30)] to-[oklch(0.78_0.14_25)]", group: "Product & Design" },
  { id: "Startup Fundamentals", label: "Startup Fundamentals", desc: "From idea to product-market fit — building a startup that scales.", icon: GraduationCap, tint: "from-[oklch(0.88_0.1_30)] to-[oklch(0.78_0.14_25)]", group: "Product & Design" },
  { id: "Design Systems", label: "Design Systems", desc: "Build scalable design systems with reusable components and tokens.", icon: PenTool, tint: "from-[oklch(0.88_0.1_30)] to-[oklch(0.78_0.14_25)]", group: "Product & Design" },
];

export function getCategoryMeta(id: string): CategoryMeta | undefined {
  return allCategories.find((c) => c.id === id);
}

export const categoryGroups = [
  { title: "Blockchain & Web3", items: allCategories.filter((c) => c.group === "Blockchain & Web3") },
  { title: "AI & Engineering", items: allCategories.filter((c) => c.group === "AI & Engineering") },
  { title: "Product & Design", items: allCategories.filter((c) => c.group === "Product & Design") },
];

/* ───────── GenLayer category data (tracks, modules, quiz) ───────── */

export const categoriesData: CategoryData[] = [
  {
    ...getCategoryMeta("GenLayer")!,
    tracks: [
      {
        id: "genlayer-fundamentals",
        title: "GenLayer Fundamentals",
        description: "Understand what GenLayer is, how Optimistic Democracy works, and why it matters.",
        modules: [
          {
            id: "what-is-genlayer",
            title: "What is GenLayer?",
            summary:
              "GenLayer is an AI-native blockchain protocol that serves as a synthetic jurisdiction — a decentralized trust layer where validator nodes powered by diverse AI models reach consensus on subjective decisions. Unlike traditional blockchains that only process deterministic logic and numerical data, GenLayer can interpret natural language, evaluate qualitative evidence, and make nuanced judgments. It was designed to fill the gap left by conventional smart contract platforms: the inability to handle ambiguity, context, and real-world complexity without centralized oracles or human intervention. GenLayer's vision is to become the adjudication layer for the agentic economy — where AI agents can transact, dispute, and settle agreements at machine speed with trustless, impartial enforcement.",
            quiz: [
                {
                  id: "gl-q1", points: 20,
                  question: "What makes GenLayer fundamentally different from traditional blockchains like Ethereum?",
                  options: [
                    "It uses a proof-of-work consensus mechanism",
                    "It can process natural language and make subjective judgments",
                    "It only supports numerical data inputs",
                    "It requires human judges for all decisions",
                  ],
                  correctIndex: 1,
                  explanation: "GenLayer's key innovation is its ability to handle subjective, qualitative decisions using diverse AI models — something traditional deterministic blockchains cannot do.",
                },
                {
                  id: "gl-q2", points: 20,
                  question: "What does GenLayer aim to become?",
                  options: [
                    "A cryptocurrency exchange",
                    "The adjudication layer for the agentic economy",
                    "A data storage platform",
                    "A social media network",
                  ],
                  correctIndex: 1,
                  explanation: "GenLayer positions itself as the adjudication layer — a trust infrastructure where AI agents and humans can resolve disputes and enforce contracts at machine speed.",
                },
                {
                  id: "gl-q3", points: 20,
                  question: "What validators in GenLayer use to reach consensus?",
                  options: [
                    "A single AI model",
                    "Diverse AI models running on different nodes",
                    "Human voting",
                    "Proof-of-work mining",
                  ],
                  correctIndex: 1,
                  explanation: "Validators run different AI models (GPT, Claude, Llama, etc.) to reduce bias and prevent any single model from being a point of failure.",
                },
                {
                  id: "gl-q4", points: 20,
                  question: "What problem does GenLayer solve that traditional smart contracts cannot?",
                  options: [
                    "Slow transaction speeds",
                    "Handling ambiguity, context, and qualitative evidence",
                    "High gas fees",
                    "Limited token standards",
                  ],
                  correctIndex: 1,
                  explanation: "Traditional smart contracts are deterministic — they can't evaluate nuance or subjective criteria. GenLayer fills this gap with AI-powered judgment.",
                },
                {
                  id: "gl-q5", points: 20,
                  question: "What type of data can Intelligent Contracts process natively?",
                  options: [
                    "Only integers and booleans",
                    "Text, images, and unstructured data",
                    "Only JSON data",
                    "Only cryptocurrency prices",
                  ],
                  correctIndex: 1,
                  explanation: "Intelligent Contracts can process unstructured data like text, images, and PDFs natively — a capability traditional smart contracts lack.",
                },
              ],
          },
          {
            id: "optimistic-democracy",
            title: "Optimistic Democracy Consensus",
            summary:
              "GenLayer uses a novel consensus mechanism called Optimistic Democracy. In this model, a leader validator proposes an execution result for an Intelligent Contract. Other validators — each running different AI models (such as GPT, Claude, Llama, etc.) — independently verify the result. If a supermajority agrees, the result is accepted. If there is disagreement, an appeals process activates, bringing in more validators until consensus is reached. This multi-model approach prevents any single AI model from dominating or being a single point of failure, reducing bias and increasing fairness. The 'optimistic' part means the system assumes proposals are correct unless challenged, enabling fast execution in the common case.",
            quiz: [
                {
                  id: "od-q1", points: 20,
                  question: "In Optimistic Democracy, who proposes the initial execution result?",
                  options: [
                    "A random user",
                    "A leader validator",
                    "The contract deployer",
                    "An AI model",
                  ],
                  correctIndex: 1,
                  explanation: "A leader validator is selected to propose the initial result. Other validators then independently verify it.",
                },
                {
                  id: "od-q2", points: 20,
                  question: "What happens when validators disagree on a result?",
                  options: [
                    "The transaction is cancelled",
                    "An appeals process adds more validators",
                    "The leader's decision is final",
                    "A human mediator is called",
                  ],
                  correctIndex: 1,
                  explanation: "When validators disagree, the appeals process kicks in — bringing additional validators to reach a broader consensus.",
                },
                {
                  id: "od-q3", points: 20,
                  question: "Why does GenLayer use different AI models for validators?",
                  options: [
                    "To reduce licensing costs",
                    "To prevent bias and single points of failure",
                    "To make the system run faster",
                    "To support multiple programming languages",
                  ],
                  correctIndex: 1,
                  explanation: "Diverse AI models ensure no single model dominates the consensus. Each model has different strengths and biases, creating a more balanced and fair outcome.",
                },
                {
                  id: "od-q4", points: 20,
                  question: "What does 'optimistic' refer to in Optimistic Democracy?",
                  options: [
                    "The system is always positive",
                    "Proposals are assumed correct unless challenged",
                    "Only optimistic people can use it",
                    "It runs on positive reinforcement",
                  ],
                  correctIndex: 1,
                  explanation: "The optimistic model assumes proposals are valid by default, enabling fast execution. Challenges only occur when validators detect issues.",
                },
                {
                  id: "od-q5", points: 20,
                  question: "What happens after a supermajority of validators agrees on a result?",
                  options: [
                    "The result is rejected and retried",
                    "The result is accepted as final",
                    "The result goes to a human court",
                    "The transaction is refunded",
                  ],
                  correctIndex: 1,
                  explanation: "When a supermajority of validators agrees, the result is accepted. This efficiency is what makes Optimistic Democracy fast while remaining secure.",
                },
              ],
          },
          {
            id: "intelligent-contracts",
            title: "Intelligent Contracts",
            summary:
              "Intelligent Contracts are GenLayer's evolution of smart contracts. Written in Python, they can access the internet directly, process unstructured data (text, images, PDFs), and use AI inference during execution. Unlike traditional smart contracts that work with fixed, deterministic inputs, Intelligent Contracts can understand context, evaluate qualitative criteria, and adapt to changing conditions. They are sandboxed in GenVM and can maintain state across executions. Common use cases include dispute resolution, escrow with subjective fulfillment conditions, automated grading (like Lurna!), content moderation, and any application that requires judgment, not just computation.",
            quiz: [
                {
                  id: "ic-q1", points: 20,
                  question: "What programming language are Intelligent Contracts written in?",
                  options: ["Solidity", "Rust", "Python", "Go"],
                  correctIndex: 2,
                  explanation: "Intelligent Contracts use Python, making them accessible to a wider developer audience compared to Solidity or Rust.",
                },
                {
                  id: "ic-q2", points: 20,
                  question: "Which capability do Intelligent Contracts have that traditional smart contracts lack?",
                  options: [
                    "Transfer tokens between accounts",
                    "Access the internet and process unstructured data",
                    "Execute mathematical calculations",
                    "Store data on-chain",
                  ],
                  correctIndex: 1,
                  explanation: "Intelligent Contracts can natively access the web and understand unstructured inputs like text and images — impossible on deterministic platforms like Ethereum.",
                },
                {
                  id: "ic-q3", points: 20,
                  question: "Where are Intelligent Contracts executed?",
                  options: ["EVM (Ethereum Virtual Machine)", "GenVM", "WASM runtime", "Docker containers"],
                  correctIndex: 1,
                  explanation: "Intelligent Contracts run inside GenVM — GenLayer's sandboxed, AI-native execution environment.",
                },
                {
                  id: "ic-q4", points: 20,
                  question: "Which of these is a natural use case for an Intelligent Contract?",
                  options: [
                    "A simple token transfer",
                    "Automated grading of essay answers",
                    "A static website",
                    "A calculator app",
                  ],
                  correctIndex: 1,
                  explanation: "Automated grading requires subjective judgment — evaluating essay quality, depth, and clarity. This is exactly what Intelligent Contracts excel at.",
                },
                {
                  id: "ic-q5", points: 20,
                  question: "Can Intelligent Contracts maintain state across multiple executions?",
                  options: [
                    "No, they are stateless",
                    "Yes, they can maintain evolving state",
                    "Only if deployed on Ethereum",
                    "Only with external databases",
                  ],
                  correctIndex: 1,
                  explanation: "Intelligent Contracts can maintain state across executions, allowing them to learn, adapt, and evolve over time — unlike traditional stateless smart contracts.",
                },
              ],
          },
          {
            id: "use-cases",
            title: "Use Cases & The Future",
            summary:
              "GenLayer enables entirely new categories of decentralized applications. Autonomous escrow services where AI agents negotiate terms and release payments based on fulfillment verification. Decentralized arbitration for marketplace disputes resolved in minutes instead of weeks. AI-governed DAOs where proposals are evaluated on quality and intent, not just token votes. Prediction markets that self-settle by fetching real-world outcomes directly. Content moderation systems that apply nuanced community guidelines. As the agentic economy grows — with AI agents transacting, negotiating, and contracting autonomously — GenLayer's role as the trust layer becomes increasingly critical. It provides programmable fairness for autonomous systems that need to resolve disputes without human courts.",
            quiz: [
                {
                  id: "uc-q1", points: 20,
                  question: "Which of these is a real use case enabled by GenLayer?",
                  options: [
                    "Video streaming",
                    "Autonomous escrow with AI dispute resolution",
                    "Social media platform",
                    "File storage",
                  ],
                  correctIndex: 1,
                  explanation: "Autonomous escrow is a natural fit — AI agents can verify fulfillment conditions and resolve disputes without human intermediaries.",
                },
                {
                  id: "uc-q2", points: 20,
                  question: "What does 'agentic economy' refer to?",
                  options: [
                    "An economy run by government agencies",
                    "An economy where AI agents transact and interact autonomously",
                    "A stock trading platform",
                    "A manual marketplace",
                  ],
                  correctIndex: 1,
                  explanation: "The agentic economy describes a future where AI agents independently negotiate, transact, and resolve disputes — requiring infrastructure like GenLayer for trust.",
                },
                {
                  id: "uc-q3", points: 20,
                  question: "How does GenLayer improve DAO governance compared to traditional models?",
                  options: [
                    "Only founders can vote",
                    "Proposals can be evaluated on quality and intent, not just token count",
                    "Votes are counted manually",
                    "There is no governance mechanism",
                  ],
                  correctIndex: 1,
                  explanation: "With GenLayer, DAOs can evaluate proposals based on merit and quality rather than simply counting token-weighted votes — reducing whale dominance.",
                },
                {
                  id: "uc-q4", points: 20,
                  question: "How does GenLayer handle content moderation differently from traditional platforms?",
                  options: [
                    "It bans users automatically",
                    "It applies nuanced community guidelines through AI consensus",
                    "It uses human moderators only",
                    "It allows all content without moderation",
                  ],
                  correctIndex: 1,
                  explanation: "GenLayer can apply nuanced, context-aware content moderation by evaluating each case against community guidelines using multi-AI consensus — more fair than hard rules.",
                },
                {
                  id: "uc-q5", points: 20,
                  question: "Why is GenLayer considered critical infrastructure for the agentic economy?",
                  options: [
                    "It provides fast internet connections",
                    "It enables trustless dispute resolution for autonomous AI agents",
                    "It replaces all human jobs",
                    "It creates cryptocurrency tokens",
                  ],
                  correctIndex: 1,
                  explanation: "As AI agents increasingly transact autonomously, they need a trust layer to resolve disputes without human courts. GenLayer provides exactly that — programmable fairness at machine speed.",
                },
              ],
          },
        ],
      },
    ],
  },
  /* ───────── Blockchain ───────── */
  {
    ...getCategoryMeta("Blockchain")!,
    tracks: [
      {
        id: "blockchain-fundamentals",
        title: "Blockchain Fundamentals",
        description: "Understand distributed ledger technology, blocks, chains, and how blockchain works under the hood.",
        modules: [
          {
            id: "what-is-blockchain",
            title: "What is Blockchain?",
            summary: "A blockchain is a distributed, immutable ledger that records transactions across a network of computers. Each block contains a set of transactions, a timestamp, and a cryptographic hash linking it to the previous block — forming a chain. This structure makes it extremely difficult to alter historical data without network consensus. Unlike traditional centralized databases, blockchain operates without a single point of control or failure. It was first popularized by Bitcoin in 2009 but has since evolved into a general-purpose technology powering smart contracts, DeFi, NFTs, and decentralized applications across industries from finance to supply chain.",
            quiz: [
              { id: "bc-q1", points: 20, question: "What links blocks together in a blockchain?", options: ["Timestamps", "Cryptographic hashes", "Digital signatures", "Merkle trees"], correctIndex: 1, explanation: "Each block contains a cryptographic hash of the previous block, creating an immutable chain." },
              { id: "bc-q2", points: 20, question: "What makes blockchain different from a traditional centralized database?", options: ["It stores more data", "It has no single point of control or failure", "It runs faster", "It uses SQL"], correctIndex: 1, explanation: "Blockchain is decentralized — no single entity controls it, and there's no single point of failure." },
              { id: "bc-q3", points: 20, question: "What was the first real-world application of blockchain technology?", options: ["Ethereum smart contracts", "Bitcoin cryptocurrency", "NFTs", "DeFi protocols"], correctIndex: 1, explanation: "Bitcoin, launched in 2009, was the first successful blockchain application — a peer-to-peer electronic cash system." },
              { id: "bc-q4", points: 20, question: "What does 'immutable' mean in the context of blockchain?", options: ["Data can be easily edited", "Once recorded, data cannot be altered without consensus", "Data is stored off-chain", "Data expires after a set time"], correctIndex: 1, explanation: "Immutability means that once a block is confirmed, altering it requires re-mining all subsequent blocks — practically impossible on a large network." },
              { id: "bc-q5", points: 20, question: "What is a node in a blockchain network?", options: ["A type of cryptocurrency", "A computer that maintains a copy of the blockchain", "A smart contract", "A wallet address"], correctIndex: 1, explanation: "Nodes are computers that store the full blockchain history and participate in transaction validation." },
            ],
          },
          {
            id: "consensus-mechanisms",
            title: "Consensus Mechanisms",
            summary: "Consensus mechanisms are protocols that ensure all nodes in a blockchain network agree on the current state. Proof of Work (PoW) requires miners to solve computational puzzles, consuming energy but providing high security. Proof of Stake (PoS) selects validators based on the amount of cryptocurrency they stake, offering better energy efficiency. Other mechanisms include Delegated Proof of Stake (DPoS), Practical Byzantine Fault Tolerance (PBFT), and GenLayer's Optimistic Democracy. Each mechanism balances security, decentralization, and speed differently. The choice of consensus mechanism fundamentally shapes a blockchain's properties and use cases.",
            quiz: [
              { id: "cm-q1", points: 20, question: "What does Proof of Work require from miners?", options: ["Staking tokens", "Solving computational puzzles", "Voting on blocks", "Running a full node"], correctIndex: 1, explanation: "PoW miners compete to solve complex mathematical puzzles — the first to solve it earns the right to add the next block." },
              { id: "cm-q2", points: 20, question: "How does Proof of Stake select block validators?", options: ["Random lottery", "Amount of cryptocurrency staked", "Computing power", "Voting by users"], correctIndex: 1, explanation: "In PoS, validators are chosen based on how many tokens they stake — more stake means higher chance of being selected." },
              { id: "cm-q3", points: 20, question: "What is a key advantage of PoS over PoW?", options: ["Higher security", "Better energy efficiency", "Faster internet", "More decentralization"], correctIndex: 1, explanation: "PoS consumes significantly less energy than PoW because it doesn't require intensive computational work." },
              { id: "cm-q4", points: 20, question: "What does consensus in blockchain primarily prevent?", options: ["Slow transactions", "Double-spending", "High fees", "Network congestion"], correctIndex: 1, explanation: "Consensus ensures that no one can spend the same digital asset twice — the fundamental problem that blockchains solve." },
              { id: "cm-q5", points: 20, question: "Which consensus mechanism does GenLayer use?", options: ["Proof of Work", "Proof of Stake", "Optimistic Democracy", "Delegated Proof of Stake"], correctIndex: 2, explanation: "GenLayer uses Optimistic Democracy — a novel mechanism where diverse AI models independently verify execution results." },
            ],
          },
          {
            id: "blocks-transactions",
            title: "Blocks & Transactions",
            summary: "A block is a container holding a batch of validated transactions. Each block includes a header with metadata (timestamp, previous block hash, merkle root) and the transaction data. Transactions represent value transfers or contract interactions. When a user initiates a transaction, it enters the mempool (memory pool) of unconfirmed transactions. Miners or validators select transactions from the mempool, validate them, and include them in the next block. Once confirmed, transactions are considered final — though finality definitions vary by chain. Block size and block time determine a blockchain's throughput capacity.",
            quiz: [
              { id: "bt-q1", points: 20, question: "Where do transactions wait before being added to a block?", options: ["The wallet", "The mempool", "The blockchain", "The exchange"], correctIndex: 1, explanation: "Unconfirmed transactions sit in the mempool until a miner or validator includes them in a block." },
              { id: "bt-q2", points: 20, question: "What does the merkle root in a block header represent?", options: ["The block number", "A summary of all transactions in the block", "The miner's signature", "The previous block hash"], correctIndex: 1, explanation: "The merkle root is a cryptographic hash that summarizes all transactions in the block — allowing efficient verification." },
              { id: "bt-q3", points: 20, question: "What happens when a block reaches its size limit?", options: ["The network slows down", "Transactions must wait for the next block", "The block splits in two", "Fees are refunded"], correctIndex: 1, explanation: "When a block is full, remaining transactions stay in the mempool and wait for inclusion in a future block." },
              { id: "bt-q4", points: 20, question: "What determines which transactions miners prioritize?", options: ["Transaction size", "Transaction fees (gas)", "Sender reputation", "Random selection"], correctIndex: 1, explanation: "Miners typically prioritize transactions with higher fees since they earn those fees as rewards." },
              { id: "bt-q5", points: 20, question: "What does block finality mean?", options: ["The block is encrypted", "The block cannot be reversed", "The block is empty", "The block is archived"], correctIndex: 1, explanation: "Finality means the block and its transactions are permanently confirmed and cannot be reversed." },
            ],
          },
          {
            id: "blockchain-use-cases",
            title: "Blockchain Use Cases",
            summary: "Beyond cryptocurrencies, blockchain enables a wide range of applications. Supply chain tracking uses immutable records to verify product provenance from source to store. Healthcare systems use blockchain for secure, interoperable patient data sharing. Digital identity solutions give users control over their personal information. Voting systems leverage blockchain transparency for tamper-resistant elections. Real estate tokenization allows property fractional ownership. Intellectual property protection uses timestamps to prove creation dates. The common thread is that blockchain provides trust in environments where participants don't fully trust each other — removing intermediaries and reducing friction.",
            quiz: [
              { id: "buc-q1", points: 20, question: "How does blockchain improve supply chain management?", options: ["Faster shipping", "Immutable tracking of product provenance", "Cheaper materials", "Automated packaging"], correctIndex: 1, explanation: "Blockchain creates an unchangeable record of every step in a product's journey, enabling verifiable provenance." },
              { id: "buc-q2", points: 20, question: "What problem does blockchain solve for digital identity?", options: ["Slow internet", "User control over personal data", "Password storage", "Email verification"], correctIndex: 1, explanation: "Blockchain enables self-sovereign identity — users control their own data without relying on centralized providers." },
              { id: "buc-q3", points: 20, question: "What is tokenization in blockchain?", options: ["Creating passwords", "Representing real-world assets as digital tokens", "Encrypting data", "Mining cryptocurrency"], correctIndex: 1, explanation: "Tokenization converts rights to an asset (like real estate or art) into a digital token on the blockchain." },
              { id: "buc-q4", points: 20, question: "Which industry uses blockchain for drug traceability?", options: ["Automotive", "Pharmaceutical", "Entertainment", "Agriculture"], correctIndex: 1, explanation: "Pharmaceutical companies use blockchain to track drugs from manufacturer to patient, combating counterfeits." },
              { id: "buc-q5", points: 20, question: "What common problem do all blockchain use cases address?", options: ["Slow computers", "Lack of trust between parties", "High energy costs", "Data storage limits"], correctIndex: 1, explanation: "Blockchain excels in environments where participants don't fully trust each other — providing transparency and immutability without intermediaries." },
            ],
          },
        ],
      },
    ],
  },
  /* ───────── Smart Contracts ───────── */
  {
    ...getCategoryMeta("Smart Contracts")!,
    tracks: [
      {
        id: "smart-contract-fundamentals",
        title: "Smart Contract Development",
        description: "Learn what smart contracts are, how they work, security best practices, and real-world applications.",
        modules: [
          {
            id: "what-are-smart-contracts",
            title: "What are Smart Contracts?",
            summary: "Smart contracts are self-executing programs deployed on a blockchain that automatically enforce agreements when predefined conditions are met. First proposed by Nick Szabo in the 1990s, they gained practical implementation with Ethereum in 2015. Unlike traditional contracts, smart contracts need no intermediaries — the code itself defines and executes the terms. Once deployed, they run exactly as programmed and cannot be modified (though upgrade patterns exist). They can hold and transfer cryptocurrency, call other contracts, and maintain state. Smart contracts power DeFi lending, NFT marketplaces, DAOs, and virtually every decentralized application.",
            quiz: [
              { id: "sc-q1", points: 20, question: "Who first proposed the concept of smart contracts?", options: ["Vitalik Buterin", "Nick Szabo", "Satoshi Nakamoto", "Gavin Wood"], correctIndex: 1, explanation: "Computer scientist Nick Szabo proposed smart contracts in the 1990s, long before blockchain existed." },
              { id: "sc-q2", points: 20, question: "What blockchain first implemented practical smart contracts?", options: ["Bitcoin", "Ethereum", "Solana", "GenLayer"], correctIndex: 1, explanation: "Ethereum, launched in 2015, was the first blockchain to support Turing-complete smart contracts." },
              { id: "sc-q3", points: 20, question: "Once deployed, can a smart contract be modified?", options: ["Yes, anytime", "No — it's immutable by default", "Only by the creator", "After a community vote"], correctIndex: 1, explanation: "Smart contracts are immutable by default after deployment. Upgrade patterns like proxy contracts provide controlled modifiability." },
              { id: "sc-q4", points: 20, question: "What eliminates the need for intermediaries in smart contracts?", options: ["Legal agreements", "Self-executing code on blockchain", "Digital signatures", "Third-party audits"], correctIndex: 1, explanation: "The code itself enforces the contract terms automatically — no lawyer, bank, or escrow agent needed." },
              { id: "sc-q5", points: 20, question: "Can smart contracts interact with each other?", options: ["No, they are isolated", "Yes, through contract calls", "Only on the same network", "Only through oracles"], correctIndex: 1, explanation: "Smart contracts can call functions in other deployed contracts, enabling composability — a key feature of DeFi." },
            ],
          },
          {
            id: "solidity-basics",
            title: "Solidity Basics",
            summary: "Solidity is the primary programming language for Ethereum smart contracts. It is statically typed, supports inheritance, libraries, and complex user-defined types. Contracts are similar to classes in object-oriented programming. Key concepts include state variables (persistent storage), functions (executable logic), modifiers (access control), events (logging), and mappings (key-value storage). Solidity uses the Ethereum Virtual Machine (EVM) as its runtime. Development typically uses Hardhat or Foundry frameworks, with testing in JavaScript/TypeScript. Security is paramount — even small bugs can lead to significant financial losses.",
            quiz: [
              { id: "sol-q1", points: 20, question: "What runtime environment does Solidity compile to?", options: ["WebAssembly", "EVM bytecode", "JavaScript", "Python bytecode"], correctIndex: 1, explanation: "Solidity compiles to EVM (Ethereum Virtual Machine) bytecode, which runs on all EVM-compatible chains." },
              { id: "sol-q2", points: 20, question: "What Solidity data type is best for storing key-value pairs?", options: ["Arrays", "Mappings", "Structs", "Strings"], correctIndex: 1, explanation: "Mappings provide efficient key-value storage, similar to hash tables in other languages." },
              { id: "sol-q3", points: 20, question: "What is the purpose of a modifier in Solidity?", options: ["To change variable types", "To add reusable access control or validation", "To modify contract state", "To optimize gas"], correctIndex: 1, explanation: "Modifiers are reusable code blocks that can check conditions before a function executes — commonly used for access control like onlyOwner." },
              { id: "sol-q4", points: 20, question: "Which keyword makes a variable permanently stored on-chain?", options: ["memory", "storage", "calldata", "stack"], correctIndex: 1, explanation: "The storage keyword (or declaring at contract level without keyword) makes data persist on the blockchain permanently." },
              { id: "sol-q5", points: 20, question: "What does 'msg.sender' represent in Solidity?", options: ["The contract creator", "The caller of the current function", "The miner", "The transaction signer's address"], correctIndex: 1, explanation: "msg.sender is the address that called the current function — not necessarily the original transaction sender." },
            ],
          },
          {
            id: "security-best-practices",
            title: "Security Best Practices",
            summary: "Smart contract security is critical because bugs can lead to irreversible financial losses — estimated at over $1 billion lost to exploits annually. Common vulnerabilities include reentrancy attacks (where a malicious contract recursively calls back into the vulnerable contract before the first call completes), integer overflow/underflow, front-running, access control flaws, and oracle manipulation. Best practices include using the Checks-Effects-Interactions pattern, thorough testing with tools like Foundry, professional audits, formal verification for critical systems, timelocks on upgrades, and emergency pause mechanisms. The industry standard is multiple independent audits plus a bug bounty program before mainnet deployment.",
            quiz: [
              { id: "sec-q1", points: 20, question: "What is a reentrancy attack?", options: ["Repeating the same transaction", "A recursive call that drains funds before state updates", "Restarting the blockchain", "Re-entering a password"], correctIndex: 1, explanation: "Reentrancy exploits contracts that make external calls before updating their state — allowing the attacker to recursively call back." },
              { id: "sec-q2", points: 20, question: "Which pattern prevents reentrancy attacks?", options: ["Checks-Effects-Interactions", "Singleton pattern", "Factory pattern", "Proxy pattern"], correctIndex: 0, explanation: "Checks-Effects-Interactions ensures all state changes happen before external calls, preventing recursive exploits." },
              { id: "sec-q3", points: 20, question: "What is the minimum recommended security practice before launching a smart contract?", options: ["Peer review only", "At least one professional audit", "Social media announcement", "Whitepaper publication"], correctIndex: 1, explanation: "A professional security audit by a reputable firm is the industry minimum before deploying contracts with real value." },
              { id: "sec-q4", points: 20, question: "What is front-running in blockchain?", options: ["A type of race condition", "Someone observing a pending transaction and submitting their own first", "Deleting transaction history", "Running multiple nodes"], correctIndex: 1, explanation: "Front-running occurs when an attacker sees a pending transaction in the mempool and submits a similar transaction with higher gas to execute first." },
              { id: "sec-q5", points: 20, question: "Why should external calls be the last action in a function?", options: ["To save gas", "To prevent reentrancy and state inconsistency", "To improve readability", "To comply with Solidity syntax"], correctIndex: 1, explanation: "Making external calls after all state changes ensures that even if the call fails or triggers a reentrancy, the contract's state is already updated." },
            ],
          },
          {
            id: "real-world-applications",
            title: "Real-World Applications",
            summary: "Smart contracts power a vast ecosystem of decentralized applications. DeFi protocols like Uniswap (automated market maker), Aave (lending), and MakerDAO (stablecoin) process billions in value. NFT marketplaces like OpenSea use contracts for minting, listing, and trading digital collectibles. DAOs (Decentralized Autonomous Organizations) use governance contracts for proposal voting and treasury management. Supply chain contracts automate payment releases upon delivery confirmation. Insurance protocols use parametric contracts that pay out automatically when conditions are met (e.g., flight delay). Gaming and metaverse platforms use contracts for in-game assets and economies.",
            quiz: [
              { id: "rwa-q1", points: 20, question: "What type of smart contract powers decentralized exchanges like Uniswap?", options: ["Order book contract", "Automated Market Maker (AMM)", "Escrow contract", "Multi-signature wallet"], correctIndex: 1, explanation: "AMMs use mathematical formulas (like x*y=k) to price assets automatically, eliminating the need for traditional order books." },
              { id: "rwa-q2", points: 20, question: "What does a DAO use smart contracts for?", options: ["Mining cryptocurrency", "Proposal voting and treasury management", "Social media", "Email verification"], correctIndex: 1, explanation: "DAOs use governance contracts to manage proposals, voting, and treasury funds — all executed on-chain." },
              { id: "rwa-q3", points: 20, question: "How do parametric insurance contracts work?", options: ["Claims are manually reviewed", "Payouts trigger automatically when predefined conditions are met", "Only doctors can approve claims", "Claims require legal approval"], correctIndex: 1, explanation: "Parametric contracts automatically pay out when verifiable conditions occur (e.g., flight delay > 2 hours) — no claims process needed." },
              { id: "rwa-q4", points: 20, question: "What is composability in DeFi smart contracts?", options: ["Contracts can be written in any language", "Contracts can interact and build on each other like Lego blocks", "Contracts automatically merge", "Contracts cannot interact"], correctIndex: 1, explanation: "Composability allows DeFi protocols to integrate with each other — like using a DEX to swap tokens for a lending protocol deposit." },
              { id: "rwa-q5", points: 20, question: "Which standard is used for NFT smart contracts on Ethereum?", options: ["ERC-20", "ERC-721", "ERC-1155", "ERC-4337"], correctIndex: 1, explanation: "ERC-721 is the standard for non-fungible tokens, where each token is unique and cannot be exchanged 1:1 with another." },
            ],
          },
        ],
      },
    ],
  },
  /* ───────── Crypto ───────── */
  {
    ...getCategoryMeta("Crypto")!,
    tracks: [
      {
        id: "crypto-fundamentals",
        title: "Cryptocurrency Fundamentals",
        description: "Master the basics of cryptocurrency — wallets, transactions, security, and market dynamics.",
        modules: [
          {
            id: "crypto-basics",
            title: "Cryptocurrency Basics",
            summary: "Cryptocurrency is digital money secured by cryptography and verified by decentralized networks. Unlike fiat currency issued by governments, cryptocurrencies operate on blockchain technology without central authorities. Bitcoin, created in 2009, was the first cryptocurrency and remains the largest by market cap. Key concepts include wallets (software to manage keys and addresses), public/private key pairs (cryptographic identity), and transactions (signed transfers between addresses). Cryptocurrencies serve various purposes: store of value (Bitcoin), utility tokens (ETH for gas), governance tokens (voting rights), and stablecoins (peg to fiat). Understanding these fundamentals is essential before trading or investing.",
            quiz: [
              { id: "cr-q1", points: 20, question: "What secures cryptocurrency transactions?", options: ["Passwords", "Cryptography", "Fingerprint scanning", "Bank verification"], correctIndex: 1, explanation: "Cryptocurrencies use cryptographic algorithms to secure transactions, control creation, and verify transfers." },
              { id: "cr-q2", points: 20, question: "What is a private key in cryptocurrency?", options: ["Your account username", "A secret number that proves ownership of funds", "A password for an exchange", "A transaction ID"], correctIndex: 1, explanation: "Your private key is the secret code that allows you to sign transactions and prove you own the associated funds." },
              { id: "cr-q3", points: 20, question: "What is the primary purpose of Bitcoin?", options: ["Running smart contracts", "Peer-to-peer digital cash", "NFT trading", "Decentralized finance"], correctIndex: 1, explanation: "Bitcoin was created as a peer-to-peer electronic cash system — a decentralized alternative to traditional money." },
              { id: "cr-q4", points: 20, question: "What distinguishes a stablecoin from other cryptocurrencies?", options: ["Faster transactions", "Its value is pegged to a stable asset like USD", "It cannot be traded", "Higher volatility"], correctIndex: 1, explanation: "Stablecoins maintain a stable value by pegging to a reserve asset (like USD) or using algorithmic mechanisms." },
              { id: "cr-q5", points: 20, question: "What is a public key derived from?", options: ["Username", "Private key", "Email address", "Phone number"], correctIndex: 1, explanation: "A public key is mathematically derived from the private key and can be shared freely to receive funds." },
            ],
          },
          {
            id: "wallets-transactions",
            title: "Wallets & Transactions",
            summary: "Cryptocurrency wallets manage private keys and interact with blockchain networks. Hardware wallets (Ledger, Trezor) store keys offline for maximum security. Software wallets (MetaMask, Phantom) are browser extensions or mobile apps convenient for daily use. Custodial wallets (exchange wallets) have the provider hold your keys — convenient but risky. A wallet address is derived from your public key and functions like an account number. Transactions require a fee (gas) paid to miners/validators, varying with network congestion. Each transaction has inputs (sources of funds), outputs (destinations), and a digital signature proving authenticity. Confirmation time ranges from seconds (Solana) to minutes (Bitcoin).",
            quiz: [
              { id: "wt-q1", points: 20, question: "What is the most secure type of cryptocurrency wallet?", options: ["Browser extension wallet", "Hardware (cold) wallet", "Exchange wallet", "Mobile wallet"], correctIndex: 1, explanation: "Hardware wallets keep private keys offline, making them immune to online hacking attempts." },
              { id: "wt-q2", points: 20, question: "What happens if you lose your private key?", options: ["You can reset it with email", "You permanently lose access to your funds", "The exchange can recover it", "Create a new key for the same wallet"], correctIndex: 1, explanation: "Private keys are irreversible — lose them and no one can recover your funds. This is why seed phrase backups are critical." },
              { id: "wt-q3", points: 20, question: "What are gas fees in crypto transactions?", options: ["Fees paid to miners or validators for processing", "Subscription fees", "Exchange withdrawal fees", "Yearly membership costs"], correctIndex: 0, explanation: "Gas fees compensate network participants (miners/validators) for including and confirming your transaction." },
              { id: "wt-q4", points: 20, question: "What is a seed phrase?", options: ["A trading strategy", "A human-readable backup of your wallet's private keys", "A password for exchanges", "A transaction memo"], correctIndex: 1, explanation: "A seed phrase (12-24 words) encodes all your wallet's private keys and can restore access if you lose your device." },
              { id: "wt-q5", points: 20, question: "What is the difference between a custodial and non-custodial wallet?", options: ["Custodial: you control keys; Non-custodial: bank controls keys", "Custodial: provider controls keys; Non-custodial: you control keys", "Both are the same", "Custodial is faster"], correctIndex: 1, explanation: "In custodial wallets (like exchanges), the provider holds your keys. Non-custodial wallets give you full control of your private keys." },
            ],
          },
          {
            id: "security-storage",
            title: "Security & Storage",
            summary: "Cryptocurrency security is paramount since transactions are irreversible. Common threats include phishing attacks (fake websites stealing keys), malware (keyloggers), SIM swapping (hijacking phone numbers), and rug pulls (scam projects). Best practices: use hardware wallets for large amounts, enable 2-factor authentication on exchanges, never share your seed phrase, verify URLs carefully, use separate wallets for trading and long-term storage, and research projects before investing. The famous mantra 'not your keys, not your coins' emphasizes that only self-custody gives true ownership. DeFi adds additional risks like smart contract exploits and impermanent loss.",
            quiz: [
              { id: "ss-q1", points: 20, question: "What is a phishing attack in crypto?", options: ["Stealing via fake websites that look legitimate", "A type of mining", "A trading strategy", "Network congestion"], correctIndex: 0, explanation: "Phishing uses lookalike websites or messages to trick users into revealing their private keys or seed phrases." },
              { id: "ss-q2", points: 20, question: "What does 'not your keys, not your coins' mean?", options: ["You need keys to open the app", "Only self-custody gives true ownership of your crypto", "Exchanges are safer than wallets", "Hardware wallets are unnecessary"], correctIndex: 1, explanation: "If a third party (like an exchange) holds your keys, they control your funds. Only you holding your keys gives you full ownership." },
              { id: "ss-q3", points: 20, question: "Where should you store large amounts of cryptocurrency?", options: ["Exchange wallet", "Hardware (cold) wallet", "Mobile wallet", "Paper notebook"], correctIndex: 1, explanation: "Hardware wallets provide the best security for long-term storage by keeping private keys completely offline." },
              { id: "ss-q4", points: 20, question: "What is SIM swapping?", options: ["Exchanging SIM cards", "An attacker tricks a carrier into transferring a phone number to their SIM", "A type of wallet", "A mining method"], correctIndex: 1, explanation: "SIM swapping lets attackers intercept SMS-based 2FA codes. Using authenticator apps or hardware keys is more secure." },
              { id: "ss-q5", points: 20, question: "What should you NEVER do with your seed phrase?", options: ["Write it down on paper", "Store it in a safe", "Enter it into any website or app", "Memorize it"], correctIndex: 2, explanation: "Never type your seed phrase into any website, app, or digital device — only enter it directly into a trusted wallet during recovery." },
            ],
          },
          {
            id: "markets-trading",
            title: "Markets & Trading",
            summary: "Cryptocurrency markets operate 24/7 across hundreds of exchanges globally. Market capitalization (price × circulating supply) ranks cryptocurrencies. Liquidity measures how easily an asset can be bought or sold without affecting price. Trading strategies include HODLing (long-term holding), dollar-cost averaging (regular purchases regardless of price), and various trading approaches (day trading, swing trading, arbitrage). Centralized exchanges (Binance, Coinbase) offer high liquidity but require KYC. Decentralized exchanges (Uniswap) allow permissionless trading directly from wallets. Market volatility in crypto is significantly higher than traditional markets — prices can move 10-20% in a single day.",
            quiz: [
              { id: "mt-q1", points: 20, question: "How is market capitalization of a cryptocurrency calculated?", options: ["Total supply × transaction volume", "Price × circulating supply", "Total traded volume", "Number of wallets × price"], correctIndex: 1, explanation: "Market cap = current price × circulating supply, giving a rough measure of a cryptocurrency's total value." },
              { id: "mt-q2", points: 20, question: "What is dollar-cost averaging (DCA)?", options: ["Buying all at once", "Regular fixed-amount purchases regardless of price", "Selling at a loss", "Only buying at market bottoms"], correctIndex: 1, explanation: "DCA reduces the impact of volatility by spreading purchases over time — buying more when prices are low and less when high." },
              { id: "mt-q3", points: 20, question: "What is the main difference between CEX and DEX?", options: ["CEX is faster", "CEX requires KYC and holds custody; DEX is permissionless with self-custody", "DEX has more coins", "CEX is decentralized"], correctIndex: 1, explanation: "Centralized exchanges (CEX) require identity verification and hold your funds. Decentralized exchanges (DEX) let you trade directly from your wallet." },
              { id: "mt-q4", points: 20, question: "What does HODL mean in crypto slang?", options: ["A trading bot", "Hold On for Dear Life — long-term holding strategy", "A type of order", "High-frequency trading"], correctIndex: 1, explanation: "HODL originated from a typo for 'hold' and became the community term for long-term investment strategy." },
              { id: "mt-q5", points: 20, question: "What is liquidity in a trading market?", options: ["Total market cap", "How easily an asset can be bought/sold without price impact", "Number of traders", "Daily volume only"], correctIndex: 1, explanation: "High liquidity means large orders can be executed without significantly moving the price — essential for efficient trading." },
            ],
          },
        ],
      },
    ],
  },
  /* ───────── AI (Artificial Intelligence) ───────── */
  {
    ...getCategoryMeta("AI")!,
    tracks: [
      {
        id: "ai-fundamentals",
        title: "Artificial Intelligence Fundamentals",
        description: "Explore AI fundamentals, machine learning, neural networks, and the ethical implications of intelligent systems.",
        modules: [
          {
            id: "ai-intro",
            title: "Introduction to AI",
            summary: "Artificial Intelligence (AI) is the simulation of human intelligence by machines. It encompasses everything from rule-based systems (expert systems) to modern machine learning that learns from data. AI is broadly categorized into Narrow AI (designed for specific tasks like facial recognition) and General AI (human-level intelligence across domains — still theoretical). Key milestones include Deep Blue beating Kasparov (1997), ImageNet breakthroughs in computer vision (2012), AlphaGo defeating Go champions (2016), and the recent explosion of Large Language Models like GPT. AI now powers everything from search engines to medical diagnosis, autonomous vehicles, and creative tools.",
            quiz: [
              { id: "ai-q1", points: 20, question: "What is Narrow AI?", options: ["AI that is slow", "AI designed for specific, limited tasks", "AI with human-level intelligence", "AI that runs on limited hardware"], correctIndex: 1, explanation: "Narrow AI (or Weak AI) excels at one specific task — like facial recognition or language translation — but cannot generalize." },
              { id: "ai-q2", points: 20, question: "What milestone did AlphaGo achieve in 2016?", options: ["Won at poker", "Defeated the world Go champion", "Passed the Turing test", "Generated realistic images"], correctIndex: 1, explanation: "AlphaGo's victory over Lee Sedol was a landmark achievement, as Go was considered too complex for AI to master." },
              { id: "ai-q3", points: 20, question: "What does General AI refer to?", options: ["AI that runs on general hardware", "AI with human-level intelligence across any task", "AI for general consumers", "Open-source AI"], correctIndex: 1, explanation: "General AI (or AGI) would match or exceed human capability across all cognitive tasks — it remains theoretical." },
              { id: "ai-q4", points: 20, question: "What are Large Language Models (LLMs) like GPT best at?", options: ["Image generation", "Understanding and generating human language", "Playing chess", "Calculating math"], correctIndex: 1, explanation: "LLMs are trained on vast text data to understand, generate, and reason with natural language." },
              { id: "ai-q5", points: 20, question: "What is the Turing test?", options: ["A programming test", "A test of a machine's ability to exhibit intelligent behavior indistinguishable from a human", "A speed benchmark", "A security audit"], correctIndex: 1, explanation: "The Turing test, proposed by Alan Turing, checks if a machine can converse in a way indistinguishable from a human." },
            ],
          },
          {
            id: "machine-learning",
            title: "Machine Learning",
            summary: "Machine Learning (ML) is a subset of AI where systems learn patterns from data without explicit programming. Supervised learning trains on labeled data (input-output pairs) — used for classification and regression. Unsupervised learning finds hidden patterns in unlabeled data — used for clustering and anomaly detection. Reinforcement learning learns through trial and error with rewards and penalties — used in game AI and robotics. Key concepts include training data, features, model, loss function, and gradient descent. Overfitting occurs when a model memorizes training data but fails on new data. The quality and quantity of training data largely determine model performance.",
            quiz: [
              { id: "ml-q1", points: 20, question: "What distinguishes supervised from unsupervised learning?", options: ["Supervised learning uses labeled data; unsupervised finds patterns in unlabeled data", "Supervised is faster", "Unsupervised needs more data", "They are the same"], correctIndex: 0, explanation: "In supervised learning, the model learns from labeled input-output pairs. Unsupervised learning discovers patterns without labels." },
              { id: "ml-q2", points: 20, question: "What is overfitting in machine learning?", options: ["The model runs too slowly", "The model memorizes training data but performs poorly on new data", "The model needs more memory", "The model is too simple"], correctIndex: 1, explanation: "Overfitting happens when a model learns noise and details in training data too well, failing to generalize to unseen data." },
              { id: "ml-q3", points: 20, question: "What does reinforcement learning use to guide learning?", options: ["Labeled datasets", "Rewards and penalties from interactions", "Pre-trained models", "Human supervision"], correctIndex: 1, explanation: "Reinforcement learning agents learn by taking actions and receiving rewards or penalties — maximizing cumulative reward over time." },
              { id: "ml-q4", points: 20, question: "What is gradient descent used for in ML?", options: ["Sorting data", "Optimizing model parameters to minimize error", "Generating training data", "Visualizing results"], correctIndex: 1, explanation: "Gradient descent iteratively adjusts model parameters to minimize the loss function, improving prediction accuracy." },
              { id: "ml-q5", points: 20, question: "What determines the performance of a machine learning model most?", options: ["Programming language used", "Quality and quantity of training data", "Computer brand", "Internet speed"], correctIndex: 1, explanation: "Data quality and quantity are the most critical factors — even the best algorithm fails with poor or insufficient data." },
            ],
          },
          {
            id: "neural-networks",
            title: "Neural Networks & Deep Learning",
            summary: "Neural networks are computing systems inspired by biological brains. They consist of layers of interconnected nodes (neurons), each applying a mathematical transformation. Deep Learning uses neural networks with many layers (deep networks) to learn hierarchical representations. Convolutional Neural Networks (CNNs) excel at image tasks by learning spatial hierarchies. Recurrent Neural Networks (RNNs) and Transformers handle sequential data like text and time series. The Transformer architecture, introduced in 'Attention Is All You Need' (2017), revolutionized NLP and powers today's LLMs. Training deep networks requires massive data and computational resources — typically GPUs or TPUs running for days or weeks.",
            quiz: [
              { id: "nn-q1", points: 20, question: "What is a neural network inspired by?", options: ["Computer circuits", "The human brain's structure", "Mathematical formulas", "Decision trees"], correctIndex: 1, explanation: "Neural networks are loosely inspired by biological neural networks in the brain, with nodes analogous to neurons." },
              { id: "nn-q2", points: 20, question: "What type of neural network is best for image recognition?", options: ["Recurrent Neural Network", "Convolutional Neural Network (CNN)", "Transformer", "Perceptron"], correctIndex: 1, explanation: "CNNs use convolutional layers to learn spatial hierarchies of features, making them ideal for image processing." },
              { id: "nn-q3", points: 20, question: "What breakthrough architecture powers modern LLMs like GPT?", options: ["CNN", "RNN", "Transformer", "GAN"], correctIndex: 2, explanation: "The Transformer architecture, using self-attention mechanisms, revolutionized NLP and is the foundation of all major LLMs." },
              { id: "nn-q4", points: 20, question: "What does 'deep' in deep learning refer to?", options: ["Deep understanding", "Many layers in the neural network", "Deep pockets required", "Deep computer science knowledge"], correctIndex: 1, explanation: "'Deep' refers to the many hidden layers in the network that learn increasingly abstract features of the data." },
              { id: "nn-q5", points: 20, question: "What hardware is typically used to train deep neural networks?", options: ["CPUs only", "GPUs or TPUs", "RAM modules", "SSD drives"], correctIndex: 1, explanation: "GPUs (and specialized TPUs) are essential for deep learning because they can parallelize the matrix operations used in neural networks." },
            ],
          },
          {
            id: "ai-ethics",
            title: "AI Ethics & Future",
            summary: "As AI becomes more powerful, ethical considerations grow increasingly urgent. Key concerns include bias (models perpetuating societal biases from training data), privacy (data collection and surveillance), job displacement (automation of white and blue-collar work), accountability (who is responsible when AI makes mistakes), and existential safety (ensuring advanced AI aligns with human values). Regulation is evolving — the EU AI Act (2024) is the first comprehensive AI law, classifying applications by risk level. The future of AI includes multimodal models (text, image, video, audio), agentic AI (autonomous goal-directed systems), AI-scientist collaboration, and potentially Artificial General Intelligence (AGI). Responsible development requires diverse teams, transparency, and inclusive governance.",
            quiz: [
              { id: "eth-q1", points: 20, question: "How does bias appear in AI systems?", options: ["AI creates bias from nothing", "Models learn and amplify biases present in training data", "Bias only exists in facial recognition", "Modern AI is completely unbiased"], correctIndex: 1, explanation: "AI models learn from human-generated data, which contains historical and societal biases — they can amplify these without careful mitigation." },
              { id: "eth-q2", points: 20, question: "What is the EU AI Act?", options: ["A programming standard", "The first comprehensive regulation classifying AI by risk level", "An AI development framework", "A research grant program"], correctIndex: 1, explanation: "The EU AI Act (2024) categorizes AI applications by risk level — from minimal to unacceptable — imposing different requirements for each." },
              { id: "eth-q3", points: 20, question: "What does AI alignment mean?", options: ["Making AI code compile", "Ensuring AI systems pursue goals that align with human values", "Aligning text in AI outputs", "Hardware compatibility"], correctIndex: 1, explanation: "Alignment research focuses on ensuring that AI systems understand and reliably pursue human values and intentions." },
              { id: "eth-q4", points: 20, question: "What is agentic AI?", options: ["AI that works for an agency", "Autonomous AI systems that pursue goals with minimal human guidance", "AI that generates images", "A specific AI model"], correctIndex: 1, explanation: "Agentic AI refers to systems that can independently plan, reason, and execute actions to achieve defined objectives." },
              { id: "eth-q5", points: 20, question: "Why is transparency important in AI development?", options: ["It makes code run faster", "It enables accountability, auditability, and public trust", "It reduces costs", "It's only for open-source projects"], correctIndex: 1, explanation: "Transparency allows independent auditing of AI systems, helps identify biases, and builds public trust in the technology." },
            ],
          },
        ],
      },
    ],
  },
];

export function getCategoryData(id: string): CategoryData | undefined {
  return categoriesData.find((c) => c.id === id);
}

export function getModuleById(id: string): { module: Module; category: CategoryMeta; trackTitle: string } | undefined {
  for (const cat of categoriesData) {
    for (const track of cat.tracks) {
      const mod = track.modules.find((m) => m.id === id);
      if (mod) return { module: mod, category: cat, trackTitle: track.title };
    }
  }
}

export function getAllModules() {
  const result: { module: Module; category: CategoryMeta; trackTitle: string; trackId: string }[] = [];
  for (const cat of categoriesData) {
    for (const track of cat.tracks) {
      for (const mod of track.modules) {
        result.push({ module: mod, category: cat, trackTitle: track.title, trackId: track.id });
      }
    }
  }
  return result;
}

/* ───────── inline SVG icons ───────── */

export function GenLayerMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 97.76 91.93" className={className} fill="currentColor">
      <polygon points="44.26 32.35 27.72 67.12 43.29 74.9 0 91.93 44.26 0 44.26 32.35" />
      <polygon points="53.5 32.35 70.04 67.12 54.47 74.9 97.76 91.93 53.5 0 53.5 32.35" />
      <polygon points="48.64 43.78 58.33 62.94 48.64 67.69 39.47 62.92 48.64 43.78" />
    </svg>
  );
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
    </svg>
  );
}

export function BtcIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M14.5 8.5c0-1.5-1-2-2.5-2H10v5h2c1.5 0 2.5-.5 2.5-2v-1Z" />
      <path d="M14.5 14.5c0-1.5-1-2-2.5-2H10v5h2c1.5 0 2.5-.5 2.5-2v-1Z" />
      <path d="M9 6v12" />
    </svg>
  );
}
