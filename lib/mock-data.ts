import {
  Bot,
  Brain,
  Cable,
  Database,
  ScrollText,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type {
  Agent,
  ApprovalRequest,
  EvidenceRecord,
  LogEntry,
  MemoryRecord,
  WorkflowLogEntry,
  WorkflowStep,
  WorkflowTask,
} from "@/lib/types";

export const featureList: Array<{ title: string; icon: LucideIcon }> = [
  { title: "Agent registry", icon: Bot },
  { title: "Persistent memory", icon: Brain },
  { title: "Tool orchestration", icon: Cable },
  { title: "Workflow automation", icon: Workflow },
  { title: "Logs and observability", icon: ScrollText },
  { title: "Local first architecture", icon: Database },
];

export const agents: Agent[] = [
  {
    id: "agent-planner",
    name: "Planner",
    role: "Breaks a goal into clear, inspectable steps",
    status: "Running",
    task: "Mapping the website build plan",
    allowedTools: ["planning", "file-read", "handoff"],
  },
  {
    id: "agent-builder",
    name: "Builder",
    role: "Turns approved workflow steps into local changes",
    status: "Idle",
    task: "Waiting for the next implementation slice",
    allowedTools: ["file-write", "terminal", "git"],
  },
  {
    id: "agent-reviewer",
    name: "Reviewer",
    role: "Checks output against evidence before acceptance",
    status: "Queued",
    task: "Reviewing the workflow page prototype",
    allowedTools: ["file-read", "lint", "build"],
  },
];

export const tasks: WorkflowTask[] = [
  {
    id: "WF-001",
    title: "Design the Agentic OS shell",
    description:
      "Define the core Cogito interface: dashboard, workflow case files, approvals, evidence, and logs, while preserving the current dark-mode style.",
    status: "Running",
    progress: 72,
    assignedAgentId: "agent-planner",
    dependencies: [],
    evidenceIds: ["EV-001"],
    approvalIds: [],
  },
  {
    id: "WF-002",
    title: "Build the workflow case-file page",
    description:
      "Create a focused page where a user can inspect one workflow from goal to subtasks, agent activity, approvals, evidence, and logs.",
    status: "Waiting approval",
    progress: 46,
    assignedAgentId: "agent-builder",
    dependencies: ["WF-001"],
    evidenceIds: ["EV-002"],
    approvalIds: ["APR-001"],
  },
  {
    id: "WF-003",
    title: "Connect real local workflow data",
    description:
      "Replace static demo data with a local file-backed workflow state model once the UI shape is stable.",
    status: "Queued",
    progress: 18,
    assignedAgentId: "agent-reviewer",
    dependencies: ["WF-001", "WF-002"],
    evidenceIds: [],
    approvalIds: [],
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    id: "STEP-001-1",
    workflowId: "WF-001",
    title: "Capture the visual rules from the current Cogito site",
    ownerAgentId: "agent-planner",
    status: "Done",
    dependsOn: [],
  },
  {
    id: "STEP-001-2",
    workflowId: "WF-001",
    title: "Define the first product objects: agents, workflows, approvals, evidence, logs",
    ownerAgentId: "agent-planner",
    status: "Running",
    dependsOn: ["STEP-001-1"],
  },
  {
    id: "STEP-001-3",
    workflowId: "WF-001",
    title: "Turn the product objects into clean dashboard panels",
    ownerAgentId: "agent-builder",
    status: "Queued",
    dependsOn: ["STEP-001-2"],
  },
  {
    id: "STEP-002-1",
    workflowId: "WF-002",
    title: "Create the workflow index and detail route",
    ownerAgentId: "agent-builder",
    status: "Done",
    dependsOn: ["STEP-001-2"],
  },
  {
    id: "STEP-002-2",
    workflowId: "WF-002",
    title: "Verify the page with lint, build, and browser inspection",
    ownerAgentId: "agent-reviewer",
    status: "Blocked",
    dependsOn: ["STEP-002-1"],
  },
  {
    id: "STEP-003-1",
    workflowId: "WF-003",
    title: "Design a local JSON state file for workflow records",
    ownerAgentId: "agent-planner",
    status: "Queued",
    dependsOn: ["STEP-002-2"],
  },
];

export const memory: MemoryRecord[] = [
  { key: "project.visualStyle", value: "Minimal dark zinc interface", scope: "project" },
  { key: "project.trustModel", value: "Evidence before trust", scope: "project" },
  { key: "runtime.scope", value: "Local-first before cloud", scope: "workflow" },
];

export const approvals: ApprovalRequest[] = [
  {
    id: "APR-001",
    workflowId: "WF-002",
    riskLevel: "medium",
    actionType: "external_write",
    requestedByAgentId: "agent-builder",
    summary: "Builder wants to publish the workflow page changes to the remote repository.",
    exactAction: "git push origin main",
    status: "Pending",
  },
];

export const evidence: EvidenceRecord[] = [
  {
    id: "EV-001",
    workflowId: "WF-001",
    claim: "The interface follows the Cogito dark-mode design system.",
    artifactPath: "docs/design-system.md",
    verificationCommand: "browser visual inspection + npm run build",
    result: "Design baseline captured and build passed",
    status: "Passed",
  },
  {
    id: "EV-002",
    workflowId: "WF-002",
    claim: "Workflow detail pages are statically generated and reachable from the website.",
    artifactPath: "app/workflows/[id]/page.tsx",
    verificationCommand: "npm run lint && npm run build",
    result: "Awaiting final publish approval",
    status: "Inconclusive",
  },
];

export const workflowLogs: WorkflowLogEntry[] = [
  { id: "LOG-001-1", workflowId: "WF-001", message: "[09:00] Design system captured from the existing site" },
  { id: "LOG-001-2", workflowId: "WF-001", message: "[09:08] Product objects drafted for workflow-first UI" },
  { id: "LOG-001-3", workflowId: "WF-001", message: "[09:16] Dashboard panels updated with approvals and evidence" },
  { id: "LOG-002-1", workflowId: "WF-002", message: "[09:22] Workflow index and case-file route created" },
  { id: "LOG-002-2", workflowId: "WF-002", message: "[09:29] Waiting for approval to publish website changes" },
  { id: "LOG-003-1", workflowId: "WF-003", message: "[09:34] Local state design queued after UI validation" },
];

export const logs: LogEntry[] = [
  "[09:00] Cogito design system captured",
  "[09:08] Agentic OS product objects drafted",
  "[09:16] Dashboard gained approval and evidence panels",
  "[09:22] Workflow case-file route created",
  "[09:34] Local data connection queued as the next slice",
];
