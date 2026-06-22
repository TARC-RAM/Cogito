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
  if (status === "Running") {
    return "border-zinc-700 bg-zinc-200 text-zinc-950";
  }

  if (status === "Blocked") {
    return "border-zinc-700 bg-zinc-100 text-zinc-950";
  }

  return "border-zinc-800 bg-zinc-900 text-zinc-300";
}

export default function AgentsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 via-zinc-950 to-zinc-950 p-8 sm:p-10">
        <Badge className="mb-4">Agent registry</Badge>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          See who is doing the work, what they can touch, and what they own.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-400">
          Agents are intentionally bounded workers. Their pages show role, current task, allowed tools, and linked workflows.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {agents.map((agent) => {
          const ownedWorkflows = tasks.filter((task) => task.assignedAgentId === agent.id);

          return (
            <Link key={agent.id} href={`/agents/${agent.id}`}>
              <Card className="h-full transition-colors hover:bg-zinc-900/40">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Badge className={statusTone(agent.status)}>{agent.status}</Badge>
                    <ChevronRight className="h-4 w-4 text-zinc-500" />
                  </div>
                  <CardTitle>{agent.name}</CardTitle>
                  <CardDescription>{agent.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                    <p className="text-xs text-zinc-500">Current task</p>
                    <p className="mt-1 text-sm text-zinc-200">{agent.task}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs text-zinc-500">Allowed tools</p>
                    <div className="flex flex-wrap gap-1.5">
                      {agent.allowedTools.map((tool) => (
                        <span key={tool} className="rounded-full border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500">
                    {ownedWorkflows.length} linked workflow{ownedWorkflows.length === 1 ? "" : "s"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
