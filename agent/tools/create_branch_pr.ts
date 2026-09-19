import { defineTool } from "eve/tools";
import { always } from "eve/tools/approval";
import { z } from "zod";

// Minimal workspace tool proving tools/* → agent/tools/* migration
// HITL gate via approval: always() — parks before execute, resumes on human approve
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
    // Real impl would use sandbox handle:
    // const sandbox = await ctx.getSandbox();
    // await sandbox.run({ command: `git clone https://github.com/${input.repo} /tmp/repo` });
    // ... write file, commit, push (gated), gh pr create
    return {
      plannedBranch: `agent/${input.task.toLowerCase().replace(/\s+/g, "-")}`,
      plannedFile: input.filePath,
      status: "stub — HITL approved, in sandbox this would clone/edit/commit/push/PR",
      input,
    };
  },
});
