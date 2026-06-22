import Link from "next/link";

import { ArrowRight, BookOpen, CheckCircle2, Layers, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const foundations = [
  {
    title: "Dark-mode product baseline",
    description:
      "The current zinc/black interface is the source of truth for future pages: restrained, quiet, and developer-first.",
    icon: Layers,
  },
  {
    title: "Evidence before trust",
    description:
      "Important agent outputs should connect to files, commands, logs, reviews, or explicit verification records.",
    icon: ShieldCheck,
  },
  {
    title: "Local-first scope",
    description:
      "The first version targets a technical solo user running local workflows, not a cloud SaaS platform.",
    icon: CheckCircle2,
  },
];

const productObjects = [
  "Agents",
  "Workflow Tasks",
  "Memory Records",
  "Approval Requests",
  "Evidence Records",
];

const milestones = [
  "Preserve the current visual foundation and document it.",
  "Expand the static app preview into a clearer Agentic OS prototype.",
  "Introduce typed local data contracts for agents, tasks, memory, approvals, and evidence.",
  "Spike one narrow local runtime loop only after the UI/data contract is stable.",
];

export default function DocsPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 via-zinc-950 to-zinc-950 p-8 sm:p-10">
        <Badge className="mb-4">Project foundation</Badge>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Cogito starts as a calm, local-first Agentic OS interface.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-400">
          This repo is the fresh starting ground. The immediate goal is to protect the visual quality while turning the static preview into a trustworthy agent workflow product.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href="/app-preview">
            <Button className="group">
              Open App Preview
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Badge>docs/design-system.md</Badge>
          <Badge>docs/product-blueprint.md</Badge>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Foundation rules</h2>
            <p className="mt-2 text-sm text-zinc-400">
              These rules keep the product from drifting into a generic AI dashboard.
            </p>
          </div>
          <BookOpen className="hidden h-5 w-5 text-zinc-500 sm:block" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {foundations.map(({ title, description, icon: Icon }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/70">
                  <Icon className="h-4 w-4 text-zinc-300" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Core product objects</CardTitle>
            <CardDescription>
              The UI should make these objects visible before runtime automation gets complicated.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {productObjects.map((object) => (
              <Badge key={object}>{object}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next milestones</CardTitle>
            <CardDescription>Small slices, not another overbuilt reset.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {milestones.map((milestone, index) => (
              <div key={milestone} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
                <p className="text-xs text-zinc-500">Milestone {index}</p>
                <p className="mt-1 text-sm text-zinc-200">{milestone}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Current verdict</h2>
        <p className="mt-3 max-w-3xl text-zinc-400">
          Conditional Go. The visual foundation is strong enough to build on. The constraint is scope: keep the first product slice static, typed, and evidence-focused before adding a real autonomous runtime.
        </p>
      </section>
    </div>
  );
}
