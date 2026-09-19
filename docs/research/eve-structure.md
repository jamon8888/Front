# Research: Eve filesystem-first structure

Source: jamon8888/Front Wayfinder #2 — https://github.com/jamon8888/Front/issues/2
Map: #1

## Findings (primary sources)

- **Source of truth** Ships in `eve` package: `node_modules/eve/docs/` (Skill `eve` says read `node_modules/eve/docs/README.md` first). Scaffold via `npx eve@latest init my-agent` or `npx eve@latest init .` for existing project. Docs: https://eve.dev/docs/getting-started
- **Project layout** `agent/` is the agent dir. See https://eve.dev/docs/concepts/project-structure and https://eve.dev/docs/reference/agent-files
  - `agent/instructions.md` — identity/role in markdown; a complete agent (default model if no `agent.ts`)
  - `agent/agent.ts` — `defineAgent({ model: "spacexai/grok-4.5" })` choose model (via AI Gateway), runtime config
  - `agent/skills/*.md` — markdown playbooks loaded when relevant
  - `agent/tools/*.ts` — `defineTool({ description, inputSchema: z.object, execute })` filename = tool name, no registration
  - `agent/sandbox/sandbox.ts` — `defineSandbox({ backend: vercelSandboxBackend({ runtime: "node24" }) })` isolated VM, file/bash
  - `agent/connections/*.ts` — `defineMcpClientConnection({ url, auth: connect("linear") })` via Vercel Connect
  - `agent/channels/*.ts` — e.g. `slackChannel({ credentials: connectSlackCredentials("slack/my-agent") })` via Chat SDK
  - `agent/subagents/<name>/` — child agents with own prompts/tools/sandbox (`defineAgent` with description)
  - `agent/schedules/*.md` — front-matter `cron: "0 8 * * *"` + body = job; durable, parks between runs
- **Discovery** Files auto-wired by path; `node_modules/eve/docs/README.md` is index. See /llms.txt, /sitemap.md for semantic overview.
- **Compilation** `agent/` compiles to durable Workflows, wires sandbox, channels, connections. Local `npm run dev` reloads on edit.
