import { defineTool } from "eve/tools";
import { z } from "zod";

// Minimal workspace tool proving tools/* → agent/tools/* migration
// In sandbox, this would run: git clone, edit file, commit, push (HITL-gated), gh pr create via Connect
export default defineTool({
  description: "Create a branch, edit a file in sandbox, and open a PR (HITL-gated push)",
  inputSchema: z.object({
    task: z.string().describe("Task description, becomes branch name agent/<task>"),
    filePath: z.string().describe("File to create/edit, e.g. docs/research/proof.md"),
    content: z.string().describe("File content to write"),
    repo: z.string().default("jamon8888/Front"),
  }),
  async execute(input) {
    // Stub execution — real impl runs in sandbox bash:
    // `git clone https://github.com/${input.repo} /tmp/repo && ...`
    // HITL gate would park here awaiting human approval for `git push` + `gh pr create`
    return {
      plannedBranch: `agent/${input.task.toLowerCase().replace(/\s+/g, "-")}`,
      plannedFile: input.filePath,
      status: "stub — in sandbox this would clone, edit, commit, and await HITL for push/PR",
      input,
    };
  },
});
