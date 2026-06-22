import Link from "next/link";

import { ArrowLeft, Calendar, MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getMessageRole(role: string) {
  const roles: Record<string, { label: string; color: string }> = {
    user: { label: "User", color: "bg-zinc-800 text-zinc-100" },
    assistant: { label: "Assistant", color: "bg-zinc-700 text-zinc-100" },
    tool: { label: "Tool", color: "bg-zinc-900 text-zinc-400" },
  };
  return roles[role] || roles.assistant;
}

function getSessionTitle(session: (typeof sessions)[0]): string {
  return session.title || `Session ${session.id.slice(-4)}`;
}

function getSessionDate(session: (typeof sessions)[0]): string {
  return session.created || session.timestamp || new Date().toISOString();
}

export default function SessionDetailPage({ params }: { params: { id: string } }) {
  const session = sessions.find((s) => s.id === params.id);

  if (!session) {
    return (
      <div className="space-y-6">
        <Link href="/sessions">
          <Button variant="secondary">
            <ArrowLeft className="h-4 w-4" />
            Back to sessions
          </Button>
        </Link>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
            <MessageCircle className="h-8 w-8 text-zinc-600" />
            <p className="text-center text-sm text-zinc-400">Session not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/sessions">
            <Button variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Back to sessions
            </Button>
          </Link>
        </div>
      </div>

      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 via-zinc-950 to-zinc-950 p-8 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>{session.profile}</Badge>
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              {getSessionTitle(session)}
            </h1>
            {session.preview && (
              <p className="mt-4 max-w-2xl text-base text-zinc-400">{session.preview}</p>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-zinc-500" />
              <p className="text-sm text-zinc-300">{formatDate(getSessionDate(session))}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Last modified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-zinc-500" />
              <p className="text-sm text-zinc-300">{formatDate(session.lastModified)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Message count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-zinc-500" />
              <p className="text-sm text-zinc-300">{session.messageCount || 0} messages</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
            <CardDescription>
              {session.messages && session.messages.length > 0
                ? `${session.messages.length} messages in this session`
                : "Messages will load from the Hermes database"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {session.messages && session.messages.length > 0 ? (
              <div className="space-y-4">
                {session.messages.map((message) => {
                  const roleInfo = getMessageRole(message.role);
                  return (
                    <div key={message.id || message.role} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <Badge className={roleInfo.color}>{roleInfo.label}</Badge>
                        {message.timestamp && (
                          <p className="text-xs text-zinc-500">{formatDate(message.timestamp)}</p>
                        )}
                      </div>
                      <p className="whitespace-pre-wrap text-sm text-zinc-200">{message.content}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 py-12">
                <MessageCircle className="h-8 w-8 text-zinc-600" />
                <p className="text-center text-sm text-zinc-400">
                  Messages will be loaded from the Hermes database
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
