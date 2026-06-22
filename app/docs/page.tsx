import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Docs (Placeholder)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-zinc-400">
          <p>
            Documentation is being prepared. This page is a placeholder for setup guides, architecture notes, and workflow recipes.
          </p>
          <Link href="/app-preview">
            <Button variant="secondary">Go to App Preview</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
