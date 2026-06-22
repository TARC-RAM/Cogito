import {
  Bot,
  Brain,
  Cable,
  Database,
  ScrollText,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const featureList: Array<{ title: string; icon: LucideIcon }> = [
  { title: "Agent registry", icon: Bot },
  { title: "Persistent memory", icon: Brain },
  { title: "Tool orchestration", icon: Cable },
  { title: "Workflow automation", icon: Workflow },
  { title: "Logs and observability", icon: ScrollText },
  { title: "Local first architecture", icon: Database },
];

export const agents = [
  { name: "Research-Agent", status: "Idle", task: "Collect release notes" },
  { name: "Planner-Agent", status: "Running", task: "Draft workflow graph" },
  { name: "Exec-Agent", status: "Queued", task: "Run sync protocol" },
];

export const tasks = [
  { id: "WF-102", title: "Review incoming tool outputs", progress: 72 },
  { id: "WF-109", title: "Schedule nightly memory compaction", progress: 46 },
  { id: "WF-114", title: "Assemble summary packet", progress: 88 },
];

export const memory = [
  { key: "project.priorities", value: "Reliability, speed, simplicity" },
  { key: "ops.lastCheckpoint", value: "2026-06-21T22:10:00Z" },
  { key: "workflows.active", value: "12" },
];

export const logs = [
  "[05:10:21] Planner-Agent accepted workflow draft",
  "[05:11:09] Tool chain resolved 4 dependencies",
  "[05:12:00] Memory write completed (3 entries)",
  "[05:13:17] Execution queue healthy",
];
