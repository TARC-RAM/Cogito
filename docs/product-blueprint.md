# Cogito Agentic OS Product Blueprint

Cogito is the fresh starting ground for the Agentic OS project. The current site is not just a landing page; it is the visual and structural baseline for the product.

## Goal

Build a local-first Agentic OS for coordinating autonomous workflows with clear visibility into:

- agents;
- tasks;
- memory;
- tools;
- approvals;
- logs;
- evidence;
- human decision points.

The product should help the user trust what agents did, why they did it, and what still needs human approval.

## Target User

Initial target user:

- A technical solo user running Hermes-style agents locally.
- Wants practical project execution, not vague automation demos.
- Needs evidence-before-trust workflows: every important output should connect to files, commands, logs, or review artifacts.

Future users may include small technical teams, but the first version should stay personal and local-first.

## Scope

### In scope for the first real product slice

- Static but polished product shell.
- Agent registry UI.
- Workflow task queue UI.
- Memory snapshot UI.
- Observability/log feed UI.
- Approval queue design.
- Evidence records design.
- File-backed architecture documents.
- A narrow local runtime interface later, only after the UI/data contract is clear.

### Non-goals for the first slice

- Full autonomous runtime.
- Cloud deployment.
- Multi-user auth.
- Billing.
- Vector database integration.
- Browser/computer-use automation.
- Production deployment pipelines.
- Complex graph visualization before basic task lists work.

## Design Baseline

The current dark-mode site is the baseline. See:

- `docs/design-system.md`
- `app/layout.tsx`
- `components/ui/card.tsx`
- `components/ui/button.tsx`
- `components/ui/badge.tsx`

Any new page should preserve the same dark zinc palette, quiet borders, high whitespace, and restrained product feel.

## Core Product Objects

### Agent

An agent is a bounded worker with a role, task queue, memory view, tool permissions, and status.

Suggested fields:

- `id`
- `name`
- `role`
- `status`: `idle | queued | running | blocked | done | failed`
- `currentTaskId`
- `allowedTools`
- `lastHeartbeat`
- `recentMessages`

### Workflow Task

A workflow task is a unit of work in a dependency graph.

Suggested fields:

- `id`
- `title`
- `description`
- `status`: `queued | running | blocked | waiting_approval | succeeded | failed`
- `assignedAgentId`
- `dependencies`
- `progress`
- `evidenceIds`
- `createdAt`
- `updatedAt`

### Memory Record

A memory record is durable context used by agents.

Suggested fields:

- `key`
- `value`
- `scope`: `project | agent | workflow | user`
- `source`
- `updatedAt`

### Approval Request

An approval request gates risky or destructive actions.

Suggested fields:

- `id`
- `riskLevel`: `low | medium | high | critical`
- `actionType`: `file_delete | shell_command | deploy | credential_access | database_migration | external_write`
- `requestedByAgentId`
- `summary`
- `exactAction`
- `status`: `pending | approved | rejected | expired`
- `createdAt`

### Evidence Record

An evidence record connects a claim to verification.

Suggested fields:

- `id`
- `claim`
- `artifactPath`
- `verificationCommand`
- `result`
- `status`: `unverified | passed | failed | inconclusive`
- `createdAt`

## First Milestones

### Milestone 0: Preserve the foundation

Status: started.

Deliverables:

- Keep current dark-mode site intact.
- Document the design system.
- Replace placeholder docs with real project direction.
- Add product object/data contracts.

### Milestone 1: Static product prototype

Goal: make the UI communicate the intended OS clearly without backend complexity.

Deliverables:

- Expand `/app-preview` with panels for approvals and evidence.
- Add an agent detail page or workflow detail page.
- Replace generic mock data with realistic Agentic OS sample data.
- Keep all data local/static.

### Milestone 2: Local data layer

Goal: introduce a simple local data source without full runtime complexity.

Deliverables:

- Define TypeScript types for agents, tasks, memory, approvals, and evidence.
- Store sample state in structured files or local fixtures.
- Add utility functions to query state.
- Keep the UI server-rendered/static where possible.

### Milestone 3: Runtime bridge spike

Goal: prove one narrow loop from local state to visible UI.

Possible loop:

1. A workflow task is created.
2. A command or script produces an evidence record.
3. The dashboard displays the new task/evidence state.
4. A risky action creates an approval request instead of executing.

### Milestone 4: Real Hermes integration

Only after the local contract is stable:

- Connect to Hermes profile subprocesses or exported task reports.
- Preserve human approval gates.
- Record evidence before accepting agent outputs.
- Avoid recursive autonomous spawning until explicit safeguards exist.

## Risks

| Risk | Probability | Impact | Mitigation |
|---|---:|---:|---|
| Rebuilding the old overlarge Agentic OS too early | High | High | Start with UI/data contracts and one narrow loop |
| Visual quality degrades as features are added | Medium | Medium | Enforce `docs/design-system.md` |
| Dashboard becomes fake/demo-only | Medium | High | Move from mock data to file-backed sample state quickly |
| Too much automation before trust exists | High | High | Approval and evidence objects are first-class product concepts |
| Scope expands into cloud SaaS | Medium | Medium | Keep first target local solo user |

## Current Recommendation

Verdict: Conditional Go.

Proceed, but only through small slices. The current website is a strong enough visual foundation. The next practical step is to turn the static app preview into a clearer Agentic OS prototype by adding approval and evidence panels with typed mock data.
