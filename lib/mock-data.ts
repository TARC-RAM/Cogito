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
  WorkflowTask,
  WorkflowLogEntry,
  WorkflowStep,
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
    id: "agent-research",
    name: "Research-Agent",
    role: "Source and context analyst",
    status: "Idle",
    task: "Collect release notes",
    allowedTools: ["web", "file-read"],
  },
  {
    id: "agent-planner",
    name: "Planner-Agent",
    role: "Workflow decomposition",
    status: "Running",
    task: "Draft workflow graph",
    allowedTools: ["file-read", "file-write"],
  },
  {
    id: "agent-exec",
    name: "Exec-Agent",
    role: "Bounded local execution",
    status: "Queued",
    task: "Run sync protocol",
    allowedTools: ["terminal", "git", "file-write"],
  },
];

export const tasks: WorkflowTask[] = [
  {
    id: "WF-102",
    title: "Review incoming tool outputs",
    description: "Inspect a returned agent packet, check its claims against local artifacts, and decide whether the output can be accepted.",
    status: "Running",
    progress: 72,
    assignedAgentId: "agent-planner",
    dependencies: [],
    evidenceIds: ["EV-201"],
    approvalIds: ["APR-032"],
  },
  {
    id: "WF-109",
    title: "Schedule nightly memory compaction",
    description: "Prepare a recurring local maintenance action, but pause before any destructive cleanup command is allowed to run.",
    status: "Waiting approval",
    progress: 46,
    assignedAgentId: "agent-exec",
    dependencies: ["WF-102"],
    evidenceIds: [],
    approvalIds: ["APR-031"],
  },
  {
    id: "WF-114",
    title: "Assemble summary packet",
    description: "Collect source-backed findings into a final packet with links to the artifacts used for each claim.",
    status: "Queued",
    progress: 88,
    assignedAgentId: "agent-research",
    dependencies: ["WF-102"],
    evidenceIds: ["EV-204"],
    approvalIds: [],
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    id: "STEP-102-1",
    workflowId: "WF-102",
    title: "Parse incoming report and extract claims",
    ownerAgentId: "agent-planner",
    status: "Done",
    dependsOn: [],
  },
  {
    id: "STEP-102-2",
    workflowId: "WF-102",
    title: "Map each claim to a local file or command output",
    ownerAgentId: "agent-research",
    status: "Running",
    dependsOn: ["STEP-102-1"],
  },
  {
    id: "STEP-102-3",
    workflowId: "WF-102",
    title: "Approve or reject the packet with an evidence note",
    ownerAgentId: "agent-planner",
    status: "Queued",
    dependsOn: ["STEP-102-2"],
  },
  {
    id: "STEP-109-1",
    workflowId: "WF-109",
    title: "Draft local compaction command",
    ownerAgentId: "agent-exec",
    status: "Done",
    dependsOn: [],
  },
  {
    id: "STEP-109-2",
    workflowId: "WF-109",
    title: "Wait for human approval before cleanup",
    ownerAgentId: "agent-exec",
    status: "Blocked",
    dependsOn: ["STEP-109-1"],
  },
  {
    id: "STEP-114-1",
    workflowId: "WF-114",
    title: "Collect accepted source links",
    ownerAgentId: "agent-research",
    status: "Queued",
    dependsOn: ["STEP-102-3"],
  },
];

export const memory: MemoryRecord[] = [
  { key: "project.priorities", value: "Reliability, speed, simplicity", scope: "project" },
  { key: "ops.lastCheckpoint", value: "2026-06-21T22:10:00Z", scope: "workflow" },
  { key: "workflows.active", value: "12", scope: "project" },
];

export const approvals: ApprovalRequest[] = [
  {
    id: "APR-031",
    workflowId: "WF-109",
    riskLevel: "high",
    actionType: "shell_command",
    requestedByAgentId: "agent-exec",
    summary: "Exec-Agent wants to run a filesystem cleanup command after a completed workflow.",
    exactAction: "rm -rf ./tmp/workflow-WF-109",
    status: "Pending",
  },
  {
    id: "APR-032",
    workflowId: "WF-102",
    riskLevel: "medium",
    actionType: "external_write",
    requestedByAgentId: "agent-planner",
    summary: "Planner-Agent wants to update the project status artifact.",
    exactAction: "write docs/status/WF-102.md",
    status: "Pending",
  },
];

export const evidence: EvidenceRecord[] = [
  {
    id: "EV-201",
    workflowId: "WF-102",
    claim: "Workflow output references existing local files only.",
    artifactPath: "reports/WF-102-output.md",
    verificationCommand: "npm run lint && npm run build",
    result: "Passed locally",
    status: "Passed",
  },
  {
    id: "EV-204",
    workflowId: "WF-114",
    claim: "Summary packet includes source links for each accepted claim.",
    artifactPath: "reports/WF-114-summary.md",
    verificationCommand: "manual source check",
    result: "Needs one more review",
    status: "Inconclusive",
  },
];

export const workflowLogs: WorkflowLogEntry[] = [
  { id: "LOG-102-1", workflowId: "WF-102", message: "[05:10:21] Planner-Agent accepted workflow draft" },
  { id: "LOG-102-2", workflowId: "WF-102", message: "[05:11:09] Tool chain resolved 4 dependencies" },
  { id: "LOG-102-3", workflowId: "WF-102", message: "[05:14:02] Evidence EV-201 passed local verification" },
  { id: "LOG-109-1", workflowId: "WF-109", message: "[05:13:17] Approval APR-031 opened for destructive shell command" },
  { id: "LOG-114-1", workflowId: "WF-114", message: "[05:15:40] Research-Agent queued source packet assembly" },
];

export const logs: LogEntry[] = [
  "[05:10:21] Planner-Agent accepted workflow draft",
  "[05:11:09] Tool chain resolved 4 dependencies",
  "[05:12:00] Memory write completed (3 entries)",
  "[05:13:17] Approval APR-031 opened for destructive shell command",
  "[05:14:02] Evidence EV-201 passed local verification",
];
