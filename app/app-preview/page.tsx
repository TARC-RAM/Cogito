import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agents, logs, memory, tasks } from "@/lib/mock-data";

export default function AppPreviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">App Preview Dashboard</h1>
        <p className="mt-2 text-zinc-400">
          Static preview of agents, tasks, memory, and logs.
        </p>
      </div>
      <div className="grid gap-4 xl:grid-cols-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Agents</CardTitle>
            <CardDescription>Registry and current execution status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/60 p-3"
              >
                <div>
                  <p className="text-sm font-medium">{agent.name}</p>
                  <p className="text-xs text-zinc-400">{agent.task}</p>
                </div>
                <Badge>{agent.status}</Badge>
              </div>
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
                <p className="text-xs text-zinc-400">{item.key}</p>
                <p className="text-sm">{item.value}</p>
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
              <div key={task.id} className="space-y-1">
                <p className="text-xs text-zinc-300">
                  {task.id} · {task.title}
                </p>
                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full bg-zinc-200" style={{ width: `${task.progress}%` }} />
                </div>
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
