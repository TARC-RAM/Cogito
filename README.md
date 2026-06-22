# Cogito Website (Foundation)

First version of the Cogito website built with Next.js, TypeScript, Tailwind CSS, shadcn/ui-style components, and Lucide icons.

## Pages

- `/` Home landing page
- `/about` About page
- `/docs` Project foundation and direction page
- `/agents` Agent registry page
- `/agents/[id]` Agent detail pages for role, tools, owned workflows, approvals, and evidence
- `/app-preview` App preview dashboard (static mock data)
- `/workflows` Workflow index page
- `/workflows/[id]` Workflow detail pages for task breakdowns, approvals, evidence, and logs

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run lint
npm run build
npm run start
```

## Notes

- App Router is used.
- No backend/database/auth/API integrations are included in this PR.
- Product interface data is static mock data only.
- `docs/design-system.md` captures the dark-mode visual baseline.
- `docs/product-blueprint.md` captures the first Agentic OS product direction and milestones.
