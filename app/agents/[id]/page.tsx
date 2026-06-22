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
import { agents, approvals, evidence, tasks, workflowSteps } from "@/lib/mock-data";

export function generateStaticParams() {
  return agents.map((agent) => ({ id: agent.id }));
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

export default async function AgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = agents.find((candidate) => candidate.id === id);

  if (!agent) {
    notFound();
  }

  const ownedWorkflows = tasks.filter((task) => task.assignedAgentId === agent.id);
  const ownedSteps = workflowSteps.filter((step) => step.ownerAgentId === agent.id);
  const requestedApprovals = approvals.filter((approval) => approval.requestedByAgentId === agent.id);
  const linkedEvidence = evidence.filter((record) =>
    ownedWorkflows.some((workflow) => workflow.id === record.workflowId),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/agents">
          <Button variant="secondary">
            <ArrowLeft className="h-4 w-4" />
            Back to agents
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/agents" className="hover:text-zinc-200">Agents</Link>
          <ChevronRight className="h-3 w-3" />
          <span>{agent.name}</span>
        </div>
      </div>

      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 via-zinc-950 to-zinc-950 p-8 sm:p-10">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge>Agent</Badge>
          <Badge className={statusTone(agent.status)}>{agent.status}</Badge>
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {agent.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-zinc-400">{agent.role}</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <p className="text-xs text-zinc-500">Current task</p>
            <p className="mt-1 text-sm text-zinc-200">{agent.task}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <p className="text-xs text-zinc-500">Owned workflows</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{ownedWorkflows.length}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <p className="text-xs text-zinc-500">Tool boundary</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {agent.allowedTools.map((tool) => (
                <span key={tool} className="rounded-full border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Linked Workflows</CardTitle>
            <CardDescription>Workflow case files currently assigned to this agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ownedWorkflows.length > 0 ? (
              ownedWorkflows.map((workflow) => (
                <Link key={workflow.id} href={`/workflows/${workflow.id}`} className="block">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 transition-colors hover:bg-zinc-900">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{workflow.id} · {workflow.title}</p>
                        <p className="mt-1 text-xs text-zinc-400">{workflow.description}</p>
                      </div>
                      <Badge className={statusTone(workflow.status)}>{workflow.status}</Badge>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm text-zinc-400">No workflows assigned.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Owned Steps</CardTitle>
            <CardDescription>Subtasks where this agent is the owner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ownedSteps.map((step) => (
              <div key={step.id} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{step.id}</p>
                    <p className="mt-1 text-xs text-zinc-400">{step.title}</p>
                  </div>
                  <Badge className={statusTone(step.status)}>{step.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Requested Approvals</CardTitle>
            <CardDescription>Risky actions this agent has asked a human to approve</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {requestedApprovals.length > 0 ? (
              requestedApprovals.map((approval) => (
                <div key={approval.id} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                  <p className="text-sm font-medium">{approval.id} · {approval.actionType}</p>
                  <p className="mt-1 text-xs text-zinc-400">{approval.summary}</p>
                  <div className="mt-3 rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-2 font-mono text-xs text-zinc-400">
                    {approval.exactAction}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-400">No approval requests from this agent.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evidence Produced</CardTitle>
            <CardDescription>Evidence attached to workflows owned by this agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {linkedEvidence.length > 0 ? (
              linkedEvidence.map((record) => (
                <div key={record.id} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{record.id} · {record.claim}</p>
                      <p className="mt-1 text-xs text-zinc-500">{record.artifactPath}</p>
                    </div>
                    <Badge className={statusTone(record.status)}>{record.status}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-400">No evidence records linked yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
