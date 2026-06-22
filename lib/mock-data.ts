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
    status: "Running",
    progress: 72,
    assignedAgentId: "agent-planner",
    evidenceIds: ["EV-201"],
  },
  {
    id: "WF-109",
    title: "Schedule nightly memory compaction",
    status: "Waiting approval",
    progress: 46,
    assignedAgentId: "agent-exec",
    evidenceIds: [],
  },
  {
    id: "WF-114",
    title: "Assemble summary packet",
    status: "Queued",
    progress: 88,
    assignedAgentId: "agent-research",
    evidenceIds: ["EV-204"],
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
    riskLevel: "high",
    actionType: "shell_command",
    requestedByAgentId: "agent-exec",
    summary: "Exec-Agent wants to run a filesystem cleanup command after a completed workflow.",
    exactAction: "rm -rf ./tmp/workflow-WF-109",
    status: "Pending",
  },
  {
    id: "APR-032",
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
    claim: "Workflow output references existing local files only.",
    artifactPath: "reports/WF-102-output.md",
    verificationCommand: "npm run lint && npm run build",
    result: "Passed locally",
    status: "Passed",
  },
  {
    id: "EV-204",
    claim: "Summary packet includes source links for each accepted claim.",
    artifactPath: "reports/WF-114-summary.md",
    verificationCommand: "manual source check",
    result: "Needs one more review",
    status: "Inconclusive",
  },
];

export const logs: LogEntry[] = [
  "[05:10:21] Planner-Agent accepted workflow draft",
  "[05:11:09] Tool chain resolved 4 dependencies",
  "[05:12:00] Memory write completed (3 entries)",
  "[05:13:17] Approval APR-031 opened for destructive shell command",
  "[05:14:02] Evidence EV-201 passed local verification",
];
