# Cogito Design System

Cogito starts from a restrained, developer-first dark-mode interface. The goal is to keep the product calm, legible, and operationally useful while the Agentic OS grows underneath it.

## Visual Positioning

Cogito should feel closer to Linear, Vercel, and Raycast than to a loud AI landing page.

Principles:

- Dark by default.
- Zinc/neutral palette first; accents only when they carry state or meaning.
- Quiet borders instead of heavy shadows.
- Clear hierarchy through spacing, typography, and contrast.
- Product UI and marketing pages should share the same component language.
- No decorative AI clutter: no random neon blobs, excessive gradients, glass panels, or fake 3D.

## Color System

Use Tailwind zinc as the base palette.

| Purpose | Token / Class | Usage |
|---|---|---|
| App canvas | `bg-zinc-950` | Body background |
| Primary card | `bg-zinc-950/80` | Standard surfaces |
| Secondary surface | `bg-zinc-900/50`, `bg-zinc-900/60` | Hero blocks, nested cards |
| Main border | `border-zinc-800/80` | Cards |
| Quiet border | `border-zinc-900/80` | Header/footer separators |
| Heading text | `text-zinc-50`, `text-zinc-100` | Page titles and important labels |
| Body text | `text-zinc-400` | Descriptions and metadata |
| Secondary icon text | `text-zinc-300` | Icons, badges, subtle active states |
| Primary action | `bg-zinc-100 text-zinc-900` | Main CTA on dark background |

Avoid adding a brand accent until the product has real states that need one. When accents are introduced, they should be sparse and semantic, not decorative.

## Typography

Global font stack:

```css
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Guidelines:

- Page hero: `text-3xl sm:text-5xl font-semibold tracking-tight`.
- Page title: `text-3xl font-semibold tracking-tight`.
- Section heading: `text-2xl font-semibold tracking-tight`.
- Card title: `text-base font-semibold tracking-tight`.
- Body copy: `text-sm` or `text-base` with `text-zinc-400`.
- Logs and machine output: `font-mono text-xs text-zinc-400`.

## Layout

Global shell:

```tsx
<body className="min-h-full bg-zinc-950 text-zinc-100 antialiased">
  <SiteHeader />
  <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">...</main>
  <SiteFooter />
</body>
```

Use these defaults:

- Max content width: `max-w-6xl`.
- Page horizontal padding: `px-6`.
- Page vertical padding: `py-12`.
- Landing page rhythm: `space-y-16`.
- Dashboard rhythm: `space-y-6`.
- Card grids: `grid gap-4` with responsive columns.

## Components

### Card

Standard card:

```tsx
rounded-xl border border-zinc-800/80 bg-zinc-950/80 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.01)]
```

Nested card:

```tsx
rounded-lg border border-zinc-800 bg-zinc-900/60 p-3
```

### Badge

```tsx
inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300
```

Use badges for state, capability tags, compact metadata, and product primitives.

### Button

Primary:

```tsx
bg-zinc-100 text-zinc-900 hover:bg-zinc-200
```

Secondary:

```tsx
border border-zinc-800/70 bg-zinc-900 text-zinc-100 hover:bg-zinc-800
```

Ghost:

```tsx
text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100
```

## Agentic OS Screen Patterns

Future product screens should reuse these patterns:

1. Dashboard overview
   - Top row: active agents, workflow tasks, memory status.
   - Bottom row: logs, approvals, recent evidence.

2. Agent detail
   - Header: agent name, role, status.
   - Cards: current task, queue, memory, tool permissions, recent messages.

3. Workflow graph
   - Use cards/lists first. Add node graph visualization only after the data model is stable.

4. Approval queue
   - Destructive or sensitive actions should use stark but minimal cards.
   - Use a clear status badge and exact command/action preview.

5. Evidence view
   - Show claim, source artifact, verification command, result, timestamp.
   - Prefer monospace blocks for command output.

## Do / Do Not

Do:

- Keep pages visually quiet.
- Use fewer colors.
- Use real product data as soon as available.
- Keep logs and machine output readable.
- Add whitespace before adding decoration.

Do not:

- Add generic AI gradients.
- Introduce multiple accent colors at once.
- Build dense dashboards before the runtime model exists.
- Hide important state behind animations.
- Make marketing pages and product pages look unrelated.
