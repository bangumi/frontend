---
name: panda-css
description: Implement, migrate, review, or debug Panda CSS styles in the Bangumi frontend. Use when editing TS/TSX styles imported from `@bangumi/styled-system`, converting Less or CSS Modules to Panda CSS, adding responsive or conditional styles, modeling component variants, changing `panda.config.ts` or PostCSS integration, regenerating `packages/styled-system`, or diagnosing missing Panda styles.
---

# Panda CSS for Bangumi

Apply Panda CSS in the form already integrated into this repository. Keep source styles statically
extractable, preserve existing UI behavior, and regenerate the committed styled-system artifacts.

## Establish Context

1. Read `AGENTS.md`, `panda.config.ts`, the target component, and adjacent components before editing.
2. Read [references/project-patterns.md](references/project-patterns.md) for repository-specific
   setup, examples, extraction constraints, and migration guidance.
3. Inspect `package.json` and `pnpm-lock.yaml` for the installed Panda version. Treat the checked-in
   configuration and generated types as the source of truth for this repository.
4. When library behavior or API details matter, follow `AGENTS.md` and query current official Panda
   CSS documentation through Context7. Resolve `Panda CSS`, then query with the user's full question.

## Choose the Styling Path

- Add all new TS/TSX styles with Panda CSS.
- Continue using an existing CSS Module or Less file when only adjusting its existing styles and a
  migration is not part of the task. Do not add new rules to `*.module.less`.
- Migrate a complete, coherent component or style unit when migration is requested. Do not leave two
  competing sources for the same rule.
- Reuse `@bangumi/design` and existing local styles before adding a new abstraction.
- Use module-level `css({...})` constants for ordinary component and page styles.
- Use `cx(...)` for a small number of conditional classes.
- Use `cva(...)` only when a reusable component has a real variant API with several combinations.
- Use inline styles or a CSS custom property for truly runtime-only values such as coordinates,
  progress percentages, or asset-derived positions. Keep the surrounding layout in Panda CSS.

## Write Extractable Styles

Import from the generated workspace package:

```tsx
import { css, cx } from '@bangumi/styled-system/css';

const item = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  _hover: { color: '#3db3f5' },
  smDown: { gap: '4px' },
});

const selected = css({ fontWeight: '600' });

<div className={cx(item, isSelected && selected)} />;
```

Keep style keys and values statically visible to Panda. Do not build `css()` calls from arbitrary
props, API data, template strings, or computed property names. For finite variants, enumerate every
value in static classes or `cva`. For unbounded runtime values, use `style` or a CSS variable.

Prefer typed built-in conditions such as `_hover`, `_focusVisible`, `_disabled`, `_before`, and
`_after`. Use `smDown` and other generated breakpoint conditions when they match the design; use an
explicit `@media (...)` key for a nonstandard breakpoint. Use `&` selectors for attributes,
descendants, and legacy class hooks.

Do not invent token names. Reuse a token only after confirming it exists in
`@bangumi/styled-system/tokens` or the generated types. Add shared semantic tokens to
`panda.config.ts` only when the reuse justifies a repository-wide contract.

## Respect Repository Integration

- Confirm the styled source is covered by `panda.config.ts#include`. Extend `include` deliberately if
  Panda styles are added under a new source tree.
- Do not enable Panda preflight casually. This repository sets `preflight: false` and imports
  `reset-css` separately.
- Do not import `packages/styled-system/styles.css` from individual components. The website entry CSS
  already imports it and declares the cascade layer order.
- Do not hand-edit generated files under `packages/styled-system`.
- Preserve the PostCSS repository-root `cwd`; extraction globs depend on it in workspace commands.
- Keep imports compatible with the repository's sorting and type-import rules.

## Regenerate and Verify

After source-only Panda style changes, run:

```bash
pnpm panda:cssgen
```

After changing Panda configuration, tokens, recipes, patterns, conditions, or generated API shape,
run both commands:

```bash
pnpm panda:codegen
pnpm panda:cssgen
```

Review the `packages/styled-system` diff and commit the relevant generated changes. Then run checks in
proportion to the change, normally including:

```bash
pnpm lint
pnpm lint:style
pnpm type-check
pnpm prettier:check
pnpm build
```

Run focused tests for changed behavior. For visual implementation or regression work, use the
repository's `playwright-visual-implementation` skill and screenshot workflow; do not leave a dev or
preview server running.

## Diagnose Missing Styles

Check these causes in order:

1. Confirm the source path matches a `panda.config.ts#include` glob.
2. Confirm the `css`/`cva` definition contains static literals Panda can extract.
3. Confirm the import comes from `@bangumi/styled-system`, not directly from `@pandacss/dev`.
4. Regenerate CSS and inspect the generated diff for the expected declaration.
5. Confirm the application entry imports `packages/styled-system/styles.css` through its normal CSS
   entry and that cascade layer order remains intact.
6. Run the build to catch extraction, import, and type failures.
