---
description: Workspace PR flow — clone, edit, HITL-gated push
---

When creating a branch/PR in the sandbox:
1. Clone `jamon8888/Front` in sandbox bash
2. Create/edit the requested file
3. Commit to `agent/<task>`
4. **HITL gate:** park and ask human "Approve push + PR for <branch>?" — only push on confirm
5. Push via Connect GitHub auth and `gh pr create`
