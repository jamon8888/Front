# Research: rgaa-audit-express engine

Source: #15 — https://github.com/jamon8888/Front/issues/15
Map: #14

## Findings

- **Moteur** `rgaa-audit-express` (skills, MCP, livrables déjà spécifiés) est le moteur ; agent EVE en est couche produit (interface, tâches durables, multi-utilisateur, historique). Ne pas réimplémenter les 4 livrables — déjà `livrables-officiels`.
- **Skills** `analyze` page par page (jamais `audit_url` global), `remediate` par lots `Fail`, `NeedsReview` réels de la session (jamais précalculé), critère 7.5 structurellement `Manuel`, catalogue `tests-guides-catalogue` pour clavier/modale/formulaire.
- **Agrégation** RGAA officielle : NC sur une page = NC pour le site.
- **Livrables** Grille .xlsx, rapport .docx, déclaration — déjà spécifiés ; l'agent génère brouillon, validation client obligatoire.
- **Shift-left** `/gate-pr` en parallèle — hors MVP pour cette spec technique (Out of scope).

## Impact

Mappage direct vers Workflows EVE phases D-F ; traçabilité `qui + horodaté` par patch approuvé pour preuve DGCCRF/ARCOM.

## Correction 2026-09-19

**Moteur = Holo-RGAA** (`/home/jamin/Documents/Holo-RGAA`) — workspace Rust `rgaa-rs` (rgaa-core, rgaa-rules, rgaa-holo, rgaa-agent, rgaa-obscura, etc.), 73 déterministes + 32 Holo3 vision + 1 manuel 7.5. `rgaa-audit-express` dans la spec = ancien nom/logique, implémentation = Holo-RGAA. Spec technique pointera vers ce chemin comme source.
