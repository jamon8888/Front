# Research: Eve Vercel runtime — Workflows, Sandbox, AI Gateway, Connect, Agent Runs, channels

Source: #3 — https://github.com/jamon8888/Front/issues/3

## Findings

- **Durable execution (Workflows)** Every step checkpointed; agents park when waiting, resume on next message. See https://eve.dev/docs/concepts/execution-model-and-durability and https://vercel.com/eve (Durable execution). Survives crashes/restarts.
- **Sandboxed compute (Vercel Sandbox)** Isolated VMs on demand, file system + bash, `vercelSandboxBackend({ runtime: "node24" })`. See https://eve.dev and https://vercel.com/sandbox.Customize via `agent/sandbox/sandbox.ts`.
- **AI Gateway** Model calls, streaming, `defineAgent({ model: "openai/gpt-5.6-terra" })` or `spacexai/grok-4.5`. Leverages `https://vercel.com/ai-gateway`. Docs: https://eve.dev/docs/getting-started (model choice via --model)
- **Vercel Connect** MCP/HTTP auth for GitHub/Linear/Stripe: `connect("linear")`, `connectSlackCredentials`. Leverages https://vercel.com/connect. Tools call without managing tokens.
- **Multi-channel** One codebase → web chat, Slack, Discord, Teams, API, cron, Chat SDK. See https://vercel.com/eve and https://eve.dev/docs/channels/overview
- **Agent Runs observability** `vercel agent-runs --help` (upgrade via `npm i -g vercel@latest` if missing) + Vercel MCP Agent Runs tools. Inspect runs, lifecycle events, traces, tool calls, token usage. Skill `eve` notes to check `vercel --version` first.
- **Subagents** Delegates specialized work, child prompts/tools/sandbox. Evals: test suites with scoring rubrics, run on deploy/schedule.
- **Mandatory Vercel** Durability/Sandbox/Connect/Channels are Vercel primitives — no Vercel = no Eve. Node 24 required.

## Cost/limits note
Pricing via Vercel primitives + model tokens (not detailed on marketing page); requires Vercel team with AI Gateway access (see getting-started prerequisites). Flag for #6 to quantify.
