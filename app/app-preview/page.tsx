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
import { agents, approvals, evidence, logs, memory, tasks } from "@/lib/mock-data";

function approvalTone(riskLevel: string) {
  if (riskLevel === "critical" || riskLevel === "high") {
    return "border-zinc-700 bg-zinc-100 text-zinc-950";
  }

  return "border-zinc-800 bg-zinc-900 text-zinc-300";
}

function evidenceTone(status: string) {
  if (status === "Passed") {
    return "border-zinc-700 bg-zinc-200 text-zinc-950";
  }

  if (status === "Failed") {
    return "border-zinc-700 bg-zinc-100 text-zinc-950";
  }

  return "border-zinc-800 bg-zinc-900 text-zinc-300";
}

export default function AppPreviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">App Preview Dashboard</h1>
        <p className="mt-2 text-zinc-400">
          Static preview of agents, tasks, memory, approvals, evidence, and logs.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Agents</CardTitle>
            <CardDescription>Registry, role, permissions, and current execution status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {agents.map((agent) => (
              <Link
                key={agent.name}
                href={`/agents/${agent.id}`}
                className="flex items-start justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 transition-colors hover:bg-zinc-900"
              >
                <div>
                  <p className="text-sm font-medium">{agent.name}</p>
                  <p className="text-xs text-zinc-500">{agent.role}</p>
                  <p className="mt-1 text-xs text-zinc-400">{agent.task}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {agent.allowedTools.map((tool) => (
                      <span key={tool} className="rounded-full border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{agent.status}</Badge>
                  <ChevronRight className="h-4 w-4 text-zinc-500" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Memory</CardTitle>
            <CardDescription>Persistent snapshot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {memory.map((item) => (
              <div key={item.key} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-zinc-400">{item.key}</p>
                  <span className="text-[11px] text-zinc-600">{item.scope}</span>
                </div>
                <p className="mt-1 text-sm">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workflow Tasks</CardTitle>
            <CardDescription>Queue progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => (
              <Link
                key={task.id}
                href={`/workflows/${task.id}`}
                className="block space-y-1.5 rounded-lg transition-colors hover:bg-zinc-900/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-zinc-300">
                    {task.id} · {task.title}
                  </p>
                  <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                    {task.status}
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full bg-zinc-200" style={{ width: `${task.progress}%` }} />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Approval Queue</CardTitle>
            <CardDescription>Risky actions pause here before execution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {approvals.map((approval) => (
              <div key={approval.id} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{approval.id} · {approval.actionType}</p>
                    <p className="mt-1 text-xs text-zinc-400">{approval.summary}</p>
                  </div>
                  <Badge className={approvalTone(approval.riskLevel)}>{approval.riskLevel}</Badge>
                </div>
                <div className="mt-3 rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-2 font-mono text-xs text-zinc-400">
                  {approval.exactAction}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evidence</CardTitle>
            <CardDescription>Claims connected to artifacts and checks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {evidence.map((record) => (
              <div key={record.id} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{record.id} · {record.claim}</p>
                    <p className="mt-1 text-xs text-zinc-500">{record.artifactPath}</p>
                  </div>
                  <Badge className={evidenceTone(record.status)}>{record.status}</Badge>
                </div>
                <p className="mt-3 font-mono text-xs text-zinc-400">{record.verificationCommand}</p>
                <p className="mt-1 text-xs text-zinc-500">Result: {record.result}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logs</CardTitle>
          <CardDescription>Observability feed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 font-mono text-xs text-zinc-400">
          {logs.map((log) => (
            <p key={log}>{log}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
