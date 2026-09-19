# Research: EVE Workflows durables + Neon/Redis/Extend stack

Source: #16 — https://github.com/jamon8888/Front/issues/16
Map: #14

## Findings

- **Stack actée** EVE, Workflows, Sandbox, Extend UI, Neon, Redis — déjà actée (§5).
- **Workflows durables** (tâches programmées) : exécution audit phase D (potentiellement longue), suivi échéances légales phase I (mois), traitement signalement via mécanisme contact. Survit à fermeture onglet, notifie à point validation humaine.
- **Conversationnel** : questionnaire cadrage légal phase A, revue humaine ciblée phase F, discussion dérogation.
- **HITL `always()`** : lot `remediate`, verdict `NeedsReview`, dérogation, validation+publication déclaration — jamais continuation auto.
- **Extend UI** : visionneuse .xlsx/.docx citant élément page, pas téléchargement brut.
- **Neon** : historique cycles pluriannuel (phase I, diligence sur années).
- **Redis/KV** : progression temps réel phase D (page par page) sans détail brut.
- **Distinction** tâches programmées vs conversation courante — audit/suivi dans vue tâches, cadrage/revue en conversation.

## Impact

Valide mapping §5 ; Workflows `approval: always()` + `ctx.getSandbox()` + Neon/Redis déjà prouvés sur prototype/eve-workspace.
