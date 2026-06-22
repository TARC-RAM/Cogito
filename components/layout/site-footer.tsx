import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-900/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-zinc-400 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-medium text-zinc-200">Cogito</p>
          <p>Lightweight agentic OS website preview.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-zinc-100">
            About
          </Link>
          <Link href="/docs" className="hover:text-zinc-100">
            Docs
          </Link>
          <Link href="/workflows" className="hover:text-zinc-100">
            Workflows
          </Link>
          <Link href="/app-preview" className="hover:text-zinc-100">
            Preview
          </Link>
        </div>
      </div>
    </footer>
  );
}
