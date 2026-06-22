import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agents, tasks } from "@/lib/mock-data";

function statusTone(status: string) {
  if (status === "Running" || status === "Succeeded") {
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

export default function WorkflowsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 via-zinc-950 to-zinc-950 p-8 sm:p-10">
        <Badge className="mb-4">Workflow case files</Badge>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Inspect agentic workflows from task to evidence.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-400">
          Each workflow page shows the job, assigned agent, dependencies, approval gates, evidence trail, and scoped logs.
        </p>
      </section>

      <section className="grid gap-4">
        {tasks.map((workflow) => (
          <Link key={workflow.id} href={`/workflows/${workflow.id}`}>
            <Card className="transition-colors hover:bg-zinc-900/40">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Badge>{workflow.id}</Badge>
                      <Badge className={statusTone(workflow.status)}>{workflow.status}</Badge>
                    </div>
                    <CardTitle>{workflow.title}</CardTitle>
                    <CardDescription className="mt-2 max-w-3xl">{workflow.description}</CardDescription>
                  </div>
                  <ChevronRight className="h-5 w-5 text-zinc-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 text-sm md:grid-cols-3">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                    <p className="text-xs text-zinc-500">Progress</p>
                    <p className="mt-1 text-zinc-200">{workflow.progress}%</p>
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                    <p className="text-xs text-zinc-500">Assigned agent</p>
                    <p className="mt-1 text-zinc-200">{getAgentName(workflow.assignedAgentId)}</p>
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                    <p className="text-xs text-zinc-500">Evidence / approvals</p>
                    <p className="mt-1 text-zinc-200">
                      {workflow.evidenceIds.length} evidence · {workflow.approvalIds.length} approvals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
