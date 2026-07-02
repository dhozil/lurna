import { createFileRoute } from "@tanstack/react-router";
import CertificatesPage from "@/pages/CertificatesPage";

interface CertSearch {
  module?: string;
  score?: string;
  total?: string;
  grade?: string;
}

export const Route = createFileRoute("/certificates")({
  validateSearch: (search: Record<string, string | undefined>): CertSearch => ({
    module: search.module || undefined,
    score: search.score || undefined,
    total: search.total || undefined,
    grade: search.grade || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Certificates — Lurna" },
      { name: "description", content: "Browse on-chain NFT certificates issued by AI Consensus on GenLayer." },
      { property: "og:title", content: "Certificates — Lurna" },
      { property: "og:description", content: "On-chain NFT certificates issued by AI Consensus." },
    ],
  }),
  component: CertificatesRoute,
});

function CertificatesRoute() {
  const search = Route.useSearch();
  return <CertificatesPage certSearch={search} />;
}
