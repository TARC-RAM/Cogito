import Link from "next/link";

import { ArrowRight, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agents, featureList, logs, memory, tasks } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 p-8 sm:p-12">
        <Badge className="mb-4">Agentic OS Preview</Badge>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Cogito is a lightweight agentic OS for autonomous workflows.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
          Manage agents, memory, tools, and workflows from one clean interface.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/app-preview">
            <Button size="lg" className="group">
              Enter Preview
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="/agents">
            <Button size="lg" variant="secondary">
              View Agents
            </Button>
          </Link>
          <Link href="/workflows">
            <Button size="lg" variant="secondary">
              View Workflows
            </Button>
          </Link>
          <Link href="/docs">
            <Button size="lg" variant="secondary">
              Read Docs
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureList.map(({ title, icon: Icon }) => (
            <Card key={title}>
              <CardContent className="flex items-center gap-3 p-5">
                <Icon className="h-4 w-4 text-zinc-300" />
                <p className="text-sm text-zinc-200">{title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Product Preview</h2>
          <Link href="/workflows" className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-100">
            Browse workflows
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Agents</CardTitle>
              <CardDescription>Realtime status snapshot (static mock data)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents.map((agent) => (
                <Link
                  key={agent.name}
                  href={`/agents/${agent.id}`}
                  className="block rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 transition-colors hover:bg-zinc-900"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{agent.name}</p>
                      <p className="text-xs text-zinc-400">{agent.status} · {agent.task}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-500" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tasks + Logs</CardTitle>
              <CardDescription>Execution queue and observability feed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.slice(0, 2).map((task) => (
                <Link
                  key={task.id}
                  href={`/workflows/${task.id}`}
                  className="block rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 transition-colors hover:bg-zinc-900"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{task.id} · {task.title}</p>
                      <p className="text-xs text-zinc-400">Progress: {task.progress}%</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-500" />
                  </div>
                </Link>
              ))}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                <p className="mb-2 text-sm font-medium">Recent Logs</p>
                {logs.slice(0, 2).map((log) => (
                  <p key={log} className="text-xs text-zinc-400">
                    {log}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Philosophy</h2>
        <p className="mt-3 max-w-3xl text-zinc-400">
          Cogito is built to be lightweight, modular, local first, and visually clean. The interface focuses on fast workflows, composable primitives, and clear observability without unnecessary clutter.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-300">
          {memory.map((item) => (
            <Badge key={item.key}>{item.key}</Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
