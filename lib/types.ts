export type AgentStatus = "Idle" | "Running" | "Queued" | "Blocked";

export type Agent = {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  task: string;
  allowedTools: string[];
};

export type WorkflowTask = {
  id: string;
  title: string;
  description: string;
  status: "Running" | "Queued" | "Waiting approval" | "Succeeded" | "Blocked";
  progress: number;
  assignedAgentId: string;
  dependencies: string[];
  evidenceIds: string[];
  approvalIds: string[];
};

export type WorkflowStep = {
  id: string;
  workflowId: string;
  title: string;
  ownerAgentId: string;
  status: "Done" | "Running" | "Queued" | "Blocked";
  dependsOn: string[];
};

export type MemoryRecord = {
  key: string;
  value: string;
  scope: "project" | "agent" | "workflow" | "user";
};

export type LogEntry = string;

export type ApprovalRequest = {
  id: string;
  workflowId: string;
  riskLevel: "medium" | "high" | "critical";
  actionType: "shell_command" | "file_delete" | "external_write" | "deploy";
  requestedByAgentId: string;
  summary: string;
  exactAction: string;
  status: "Pending" | "Approved" | "Rejected";
};

export type EvidenceRecord = {
  id: string;
  workflowId: string;
  claim: string;
  artifactPath: string;
  verificationCommand: string;
  result: string;
  status: "Passed" | "Failed" | "Inconclusive" | "Unverified";
};

export type WorkflowLogEntry = {
  id: string;
  workflowId: string;
  message: string;
};
