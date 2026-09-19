# Research: Migration path — Front AI SDK → Eve

Source: #4 — https://github.com/jamon8888/Front/issues/4
Map: #1

## Current Front stack
- Next.js 16.2.6 + AI SDK `app/api/chat/route.ts` `streamText({ model: getModel(modelId), messages, tools: getTools(modelId), stopWhen: isStepCount(5), maxOutputTokens: 8192 })`, `maxDuration=30` (stateless)
- `tools/` : `github_repo` (github_repo.ts), `web_search` (getWebSearch(modelId)), `ask_user` (HITL gate), wired via `getTools(modelId)` → `InferUITools`
- `lib/models.ts` MODELS gateway + OpenRouter + NVIDIA NIM, `lib/providers` `getModel`
- UI: `app/page.tsx` + `components/ai-elements` + `ai` `validateUIMessages` / `convertToModelMessages` / `createUIMessageStreamResponse`

## Eve equivalents
- `tools/github_repo.ts` → `agent/tools/github_repo.ts` `defineTool({ inputSchema: z.object, execute: async (input) => ... })` (fetch GitHub API, needs Connect or env token). Filename = tool name.
- `tools/web_search.ts` → `agent/tools/web_search.ts` (same, via fetch)
- `tools/ask_user.ts` → HITL approval gate (Eve human-in-the-loop: tool needs confirmation parks session until resolved, then resumes — matches `human-in-the-loop` marketing point)
- `lib/models.ts` + `lib/providers` → `agent/agent.ts` `defineAgent({ model: "anthropic/claude-sonnet-5" | "openai/gpt-5.6-terra" | ...) })`; default model if no file
- `app/api/chat` streaming → Eve web channel or API channel; frontend frameworks guide https://eve.dev/docs/guides/frontend/overview (keep Next.js UI, call Eve via Channel API)
- `npx eve@latest init .` in existing repo adds `eve`, `ai`, `zod` deps without overwriting files; then create `agent/` alongside `app/`

## What stays vs moves
- Stays in Next.js: `app/page`, `ai-elements`, layout, static assets, auth/route protection (see https://eve.dev/docs/guides/auth-and-route-protection)
- Moves to `agent/`: durable tool execution, sandbox file ops, subagents, schedules, instructions/skills

## Local vs deploy delta
- Local `npm run dev` (terminal UI, `/login`, `/add` for channels/integrations) — no Vercel project needed to chat; changing account/team/key doesn't rebuild
- Deploy via Vercel agent deploy (see https://eve.dev/docs/guides/deployment/overview) — wires Workflows/Sandbox/Connect/Agent Runs

## Open for grilling
- Co-location vs separate Vercel project; secret handling (AI Gateway key vs AI_GATEWAY_API_KEY, GitHub token via Connect)
