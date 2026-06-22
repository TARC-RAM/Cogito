import Link from "next/link";

import { Calendar, ChevronRight, Database } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sessions } from "@/lib/mock-data";

function formatDate(dateStr?: string) {
  if (!dateStr) return "Unknown";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getSessionTitle(session: (typeof sessions)[0]): string {
  return session.title || `Session ${session.id.slice(-4)}`;
}

function getSessionPreview(session: (typeof sessions)[0]): string {
  return session.preview || `${session.messageCount || 0} messages`;
}

export default function SessionsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 via-zinc-950 to-zinc-950 p-8 sm:p-10">
        <Badge className="mb-4">Hermes Sessions</Badge>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Browse all Hermes sessions on this device.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-400">
          View conversation history, messages, and metadata from your Hermes agent sessions across all profiles.
        </p>
      </section>

      <section className="grid gap-4">
        {sessions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
              <Database className="h-8 w-8 text-zinc-600" />
              <p className="text-center text-sm text-zinc-400">No sessions found</p>
            </CardContent>
          </Card>
        ) : (
          sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Card className="transition-colors hover:bg-zinc-900/40">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <Badge>{session.profile}</Badge>
                      </div>
                      <CardTitle>{getSessionTitle(session)}</CardTitle>
                      <CardDescription className="mt-2 max-w-3xl">{getSessionPreview(session)}</CardDescription>
                    </div>
                    <ChevronRight className="h-5 w-5 text-zinc-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 text-sm md:grid-cols-3">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                      <p className="text-xs text-zinc-500">Created</p>
                      <p className="mt-1 flex items-center gap-2 text-zinc-200">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(session.created || session.timestamp)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                      <p className="text-xs text-zinc-500">Last modified</p>
                      <p className="mt-1 text-zinc-200">{formatDate(session.lastModified)}</p>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                      <p className="text-xs text-zinc-500">Messages</p>
                      <p className="mt-1 text-zinc-200">{session.messageCount || 0} messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}
