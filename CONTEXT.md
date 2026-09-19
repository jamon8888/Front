# CONTEXT.md — Front

Glossary for jamon8888/Front. Use these terms verbatim in code, issues, and ADRs (see docs/agents/domain.md).

## Workspace agent
Durable Eve agent that executes repo/file/bash work inside a Vercel Sandbox (isolated VM, `agent/sandbox/sandbox.ts`), parks between messages/tool turns, and resumes on delivery. Anchor job: clone `jamon8888/Front` → edit/create file → commit to new branch → push via Vercel Connect → open PR. Used interchangeably with "agentic backend" in this map.

## HITL gate
Human-in-the-loop approval gate where a tool needing confirmation parks the Eve session until a human resolves it, then resumes seamlessly. For Front, gates the `git push` and `gh pr create` steps of the workspace agent.

## Sandbox
Isolated Vercel Sandbox VM (`vercelSandboxBackend({ runtime: "node24" })`) providing file system and bash execution for the agent. Configured in `agent/sandbox/sandbox.ts`.

## Durable execution
Vercel Workflows checkpointed steps; agents park while waiting (tool/HITL/next message) and resume on delivery. Survives crashes/restarts.

## Connect
Vercel Connect auth for external services (GitHub, etc.) via `connect("github")` / `defineMcpClientConnection`. Tools call without managing tokens.
