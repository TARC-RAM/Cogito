import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  agents,
  approvals,
  evidence,
  tasks,
  workflowLogs,
  workflowSteps,
} from "@/lib/mock-data";

export function generateStaticParams() {
  return tasks.map((task) => ({ id: task.id }));
}

function statusTone(status: string) {
  if (status === "Running" || status === "Done" || status === "Passed") {
    return "border-zinc-700 bg-zinc-200 text-zinc-950";
  }

  if (status === "Blocked" || status === "Waiting approval") {
    return "border-zinc-700 bg-zinc-100 text-zinc-950";
  }

  return "border-zinc-800 bg-zinc-900 text-zinc-300";
}

function getAgentName(agentId: string) {
  return agents.find((agent) => agent.id === agentId)?.name ?? agentId;
}

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workflow = tasks.find((task) => task.id === id);

  if (!workflow) {
    notFound();
  }

  const assignedAgent = agents.find((agent) => agent.id === workflow.assignedAgentId);
  const steps = workflowSteps.filter((step) => step.workflowId === workflow.id);
  const workflowApprovals = approvals.filter((approval) => approval.workflowId === workflow.id);
  const workflowEvidence = evidence.filter((record) => record.workflowId === workflow.id);
  const logs = workflowLogs.filter((log) => log.workflowId === workflow.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/workflows">
          <Button variant="secondary">
            <ArrowLeft className="h-4 w-4" />
            Back to workflows
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/workflows" className="hover:text-zinc-200">Workflows</Link>
          <ChevronRight className="h-3 w-3" />
          <span>{workflow.id}</span>
        </div>
      </div>

      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 via-zinc-950 to-zinc-950 p-8 sm:p-10">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge>{workflow.id}</Badge>
          <Badge className={statusTone(workflow.status)}>{workflow.status}</Badge>
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {workflow.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-zinc-400">{workflow.description}</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <p className="text-xs text-zinc-500">Progress</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{workflow.progress}%</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full bg-zinc-200" style={{ width: `${workflow.progress}%` }} />
            </div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <p className="text-xs text-zinc-500">Assigned agent</p>
            <p className="mt-1 text-sm font-medium">{assignedAgent?.name ?? workflow.assignedAgentId}</p>
            <p className="mt-1 text-xs text-zinc-400">{assignedAgent?.role ?? "Unknown role"}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <p className="text-xs text-zinc-500">Dependencies</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {workflow.dependencies.length > 0 ? (
                workflow.dependencies.map((dependency) => <Badge key={dependency}>{dependency}</Badge>)
              ) : (
                <span className="text-sm text-zinc-400">None</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Task Breakdown</CardTitle>
            <CardDescription>Subtasks, owners, and dependency gates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {steps.map((step) => (
              <div key={step.id} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{step.id} · {step.title}</p>
                    <p className="mt-1 text-xs text-zinc-400">Owner: {getAgentName(step.ownerAgentId)}</p>
                  </div>
                  <Badge className={statusTone(step.status)}>{step.status}</Badge>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  Depends on: {step.dependsOn.length > 0 ? step.dependsOn.join(", ") : "none"}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agent Activity</CardTitle>
            <CardDescription>Current worker context and tool boundary</CardDescription>
          </CardHeader>
          <CardContent>
            {assignedAgent ? (
              <Link href={`/agents/${assignedAgent.id}`} className="block rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 transition-colors hover:bg-zinc-900">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{assignedAgent.name}</p>
                    <p className="mt-1 text-xs text-zinc-400">{assignedAgent.task}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{assignedAgent.status}</Badge>
                    <ChevronRight className="h-4 w-4 text-zinc-500" />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {assignedAgent.allowedTools.map((tool) => (
                    <span key={tool} className="rounded-full border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400">
                      {tool}
                    </span>
                  ))}
                </div>
              </Link>
            ) : (
              <p className="text-sm text-zinc-400">No assigned agent found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Approval Gates</CardTitle>
            <CardDescription>Human checkpoints before risky actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {workflowApprovals.length > 0 ? (
              workflowApprovals.map((approval) => (
                <div key={approval.id} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{approval.id} · {approval.actionType}</p>
                      <p className="mt-1 text-xs text-zinc-400">{approval.summary}</p>
                    </div>
                    <Badge className={statusTone(approval.status)}>{approval.status}</Badge>
                  </div>
                  <div className="mt-3 rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-2 font-mono text-xs text-zinc-400">
                    {approval.exactAction}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-400">No approval gates for this workflow.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evidence Trail</CardTitle>
            <CardDescription>Claims tied to artifacts and verification commands</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {workflowEvidence.length > 0 ? (
              workflowEvidence.map((record) => (
                <div key={record.id} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{record.id} · {record.claim}</p>
                      <p className="mt-1 text-xs text-zinc-500">{record.artifactPath}</p>
                    </div>
                    <Badge className={statusTone(record.status)}>{record.status}</Badge>
                  </div>
                  <p className="mt-3 font-mono text-xs text-zinc-400">{record.verificationCommand}</p>
                  <p className="mt-1 text-xs text-zinc-500">Result: {record.result}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-400">No evidence records attached yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Logs</CardTitle>
          <CardDescription>Timeline scoped to this workflow only</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 font-mono text-xs text-zinc-400">
          {logs.length > 0 ? logs.map((log) => <p key={log.id}>{log.message}</p>) : <p>No logs yet.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
