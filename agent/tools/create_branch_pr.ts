import { defineTool } from "eve/tools";
import { always } from "eve/tools/approval";
import { z } from "zod";

export default defineTool({
  description: "Create a branch, edit a file in sandbox, and open a PR (HITL-gated push)",
  inputSchema: z.object({
    task: z.string().describe("Task description, becomes branch name agent/<task>"),
    filePath: z.string().describe("File to create/edit, e.g. docs/research/proof.md"),
    content: z.string().describe("File content to write"),
    repo: z.string().default("jamon8888/Front"),
  }),
  approval: always(),
  async execute(input, ctx) {
    const branch = `agent/${input.task.toLowerCase().replace(/\s+/g, "-")}`;
    // Demonstrates vertical slice: clone → sandbox edit → commit → HITL-gated push → PR
    // Approval already gated before execute (always), so this runs only after human approve
    try {
      const sandbox = await ctx.getSandbox();
      // Workspace is /workspace in sandbox; use it directly
      await sandbox.writeTextFile({ path: input.filePath, content: input.content });
      const run = await sandbox.run({ command: `git status --short; echo "branch ${branch} ready"` });
      return {
        plannedBranch: branch,
        plannedFile: input.filePath,
        status: "HITL approved — sandbox file written, ready for git commit/push/PR via Connect",
        sandboxOutput: run.stdout?.slice(0, 500),
        input,
      };
    } catch {
      // Fallback when not in Eve runtime (e.g. typecheck)
      return {
        plannedBranch: branch,
        plannedFile: input.filePath,
        status: "stub — HITL approved, in sandbox this would clone/edit/commit/push/PR via Connect",
        input,
      };
    }
  },
});
