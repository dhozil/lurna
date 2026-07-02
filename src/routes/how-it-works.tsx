import { createFileRoute, Link } from "@tanstack/react-router";
import HowItWorksPage from "@/pages/HowItWorksPage";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Lurna" },
      { name: "description", content: "From learning to AI Consensus grading to on-chain certificates — see how Lurna works end to end." },
      { property: "og:title", content: "How It Works — Lurna" },
      { property: "og:description", content: "Learn how Lurna validates knowledge with AI Consensus and mints on-chain credentials." },
    ],
  }),
  component: HowItWorksPage,
});
