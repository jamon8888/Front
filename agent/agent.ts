import { defineAgent } from "eve";

export default defineAgent({
  model: "anthropic/claude-sonnet-5",
  // instructions.md holds identity; sandbox/backend and tools are auto-wired by file path
});
