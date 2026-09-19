import type { Metadata } from "next";
import { EveChat } from "@/components/eve-chat";

export const metadata: Metadata = {
  title: "Eve Workspace Agent",
  description: "Durable Eve workspace agent — clone, sandbox edit, HITL-gated PR via Vercel Sandbox.",
};

export default function EvePage() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col p-6">
      <h1 className="mb-4 text-2xl font-semibold">Eve Workspace Agent</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Durable agent at <code>/eve/v1/*</code> (same Vercel project via <code>withEve</code>). Try: &quot;create a branch proof-eve with file docs/research/proof.md&quot;.
      </p>
      <EveChat />
    </div>
  );
}
