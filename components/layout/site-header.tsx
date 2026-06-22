import Link from "next/link";

import { BrainCircuit } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/docs", label: "Docs" },
  { href: "/app-preview", label: "App Preview" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-900/80 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-zinc-100">
          <BrainCircuit className="h-4 w-4" />
          <span className="text-sm font-semibold tracking-wide">Cogito</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-zinc-400">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
