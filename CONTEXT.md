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

## Régime (RGAA/EAA/bi-régime)
Résultat du questionnaire cadrage légal (secteur parmi 6 B2C, taille salariés, CA, nature publique/privée/délégataire) déterminant si RGAA seul, EAA seul, ou bi-régime (→ déclaration RGAA plus protectrice). Bloque tout `analyze` tant que non déterminé.

## Schéma pluriannuel (3 ans)
Engagement orga publié en premier, avant tout audit détaillé : gouvernance, moyens, périmètre. Vérifié/créé avec le client avant `analyze`.

## Plan annuel
Déclinaison annuelle du schéma : liste sites/services à auditer cette année avec échéances programmées (même fin d'année y figure), programme les audits.

## Référent accessibilité
Interlocuteur client obligatoire (public) qui seul valide schéma, dérogation, publication déclaration — engagement juridique.

## Dossier client
Traverse `Cadrage → Schéma actif → Plan → Échantillon → Audit → Remédiation → Revue → Livrables brouillon → En attente validation → Déclaration publiée → Suivi → nouveau Plan`. Schéma/Plan partagés orga, sous-états par site.

## Échantillon (RGAA)
7 pages obligatoires + gabarits internes → ~15 pages (Holo-RGAA `analyze` par URL, jamais `audit_url` global). Validé par le référent (risque paiement/réclamation).

## Remédiation (RGAA)
Lot `Fail` → patch `remediate` Holo-RGAA (`rgaa-remediation`) approuvé individuellement, tracé `qui + horodaté` (Workflow `approval: always()`).

## NeedsReview / Dérogation
`NeedsReview` = verdicts réels session (jamais précalculé), 7.5 toujours `Manuel`. Dérogation charge disproportionnée jamais automatique — proposée/motivée par auditeur, validée explicitement par le référent (HITL).
