import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">About Cogito</h1>
      <p className="text-zinc-400">
        Cogito is a lightweight agentic OS concept focused on orchestrating autonomous workflows with a clean, developer-first experience.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>What this version is</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400">
            A polished website foundation with a static product interface preview.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What comes later</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400">
            Backend runtime, persistence, auth, and live agent execution workflows.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
