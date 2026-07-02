import { createFileRoute, Link } from "@tanstack/react-router";
import DashboardPage from "@/pages/DashboardPage";

interface DashboardSearch { tab?: string }

export const Route = createFileRoute("/dashboard")({
   validateSearch: (search: Record<string, string | undefined>): DashboardSearch => ({
    tab: search.tab || undefined,
  }),
  head: () => ({}),
  component: DashboardPage,
});
