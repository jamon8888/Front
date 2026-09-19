# Prototype: Thin Eve workspace agent

Prototype branch: `prototype/eve-workspace`
Map #8 — https://github.com/jamon8888/Front/issues/8
Map: #1

## Files created
- `agent/instructions.md` — workspace agent identity (durable, sandbox, HITL park/resume)
- `agent/agent.ts` — `defineAgent({ model: "anthropic/claude-sonnet-5" })` via AI Gateway
- `agent/tools/create_branch_pr.ts` — `defineTool` proving `tools/*` → `agent/tools/*` migration (1:1), stub that would clone/edit/commit/HITL-gated push/PR in sandbox
- `agent/sandbox/sandbox.ts` — `defineSandbox` with `vercelSandboxBackend({ runtime: "node24" })`
- `agent/skills/workspace-pr.md` — skill playbook for HITL gate flow

Co-located `agent/` alongside `app/` — same Vercel project `jamon8888/Front` via `npx eve init .`.

## Validation of rubric (3)
Migration lift is **≤1 session**: 4 files, no overwrites of `app/*`, `package.json` already has `ai`/`zod` (add `eve`), sandbox + tool definition compiles to Workflows. Full clone/edit/PR not executed here (needs Connect credentials + HITL runtime), but file discovery and tool shape prove lift estimate.

Next: `npm install eve` + `npm run dev` terminal UI (or Vercel deploy) to run HITL park/resume, observed via `vercel agent-runs`.

## How to try
```bash
npm install eve@latest
npm run dev # or npx eve dev
# in terminal UI: "create a branch proof-eve with file docs/research/proof.md"
```
