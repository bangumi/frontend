# Bangumi Panda CSS Patterns

## Contents

- Repository setup
- Preferred source patterns
- Runtime values and static extraction
- Variants and composition
- Responsive styles and selectors
- Migration guidance
- Generation and debugging

## Repository Setup

The root `panda.config.ts` currently defines these important contracts:

- `outdir: 'packages/styled-system'`
- `importMap: '@bangumi/styled-system'`
- `jsxFramework: 'react'`
- `preflight: false`
- extraction from website source, design components, design root files, and icon root files

The exact `include` globs are authoritative. A source file outside them can type-check while producing
no CSS, so inspect the config rather than assuming every workspace is scanned.

`packages/website/postcss.config.js` and `packages/design/postcss.config.js` pass the repository root
as Panda's `cwd`. This is required because the Vite processes run from workspace package directories.

`packages/website/src/index.css` imports reset CSS and `packages/styled-system/styles.css`, then
declares the layer order `reset, base, tokens, recipes, utilities`. Panda preflight is disabled.

`packages/styled-system` is a private generated workspace package. Its generated CSS and TypeScript
API are committed. Never patch generated `.mjs`, `.d.ts`, or `styles.css` files by hand.

## Preferred Source Patterns

Define stable classes once at module scope and apply the returned class name:

```tsx
import { css } from '@bangumi/styled-system/css';

const container = css({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

export function Layout({ children }: React.PropsWithChildren) {
  return <div className={container}>{children}</div>;
}
```

This matches `packages/website/src/components/GlobalLayout/index.tsx`. Use normal CSS property names
and string values. Panda's generated types catch invalid property names and conditions.

For a small boolean state, compose static classes with `cx`:

```tsx
import { css, cx } from '@bangumi/styled-system/css';

const item = css({ borderColor: '#e8e3e3' });
const itemSelected = css({ borderColor: '#369cf8' });

<button className={cx(item, selected && itemSelected)} />;
```

This matches the approach in `packages/design/components/Topic/Reactions.tsx`.

Keep semantic HTML, state attributes, accessibility behavior, and event handling separate from the
class definitions. Styling an ARIA state with a selector does not replace setting the ARIA state.

## Runtime Values and Static Extraction

Panda generates CSS by inspecting source code. It cannot enumerate arbitrary runtime input:

```tsx
// Avoid: the extractor cannot know every API-provided color.
const dynamic = css({ color: user.color });
```

Choose one of these approaches:

1. Enumerate a finite set as static classes and select with `cx`.
2. Define a static `cva` variant map for a reusable component API.
3. Put an unbounded value in React's `style` prop while Panda owns the stable layout.
4. Pass an unbounded value through a CSS custom property consumed by a static Panda declaration.

The subject index page demonstrates the third approach: sprite layout is declared with Panda, while
`backgroundImage` and `backgroundPosition` derived from runtime data use `style`.

Keep CSS values literal where possible. Avoid computed keys, dynamically assembled selectors, and
wrappers that hide style objects from extraction unless their behavior is explicitly supported by the
installed Panda version.

## Variants and Composition

Use separate classes plus `cx` for one or two local boolean states. This keeps the call site obvious
and matches current repository code.

Use `cva` for a reusable component with named finite variants:

```tsx
import { cva } from '@bangumi/styled-system/css';

const badge = cva({
  base: { display: 'inline-flex', alignItems: 'center' },
  variants: {
    tone: {
      neutral: { color: '#595555', background: '#f5f5f5' },
      accent: { color: '#fff', background: '#f09199' },
    },
    compact: {
      true: { padding: '2px 6px' },
      false: { padding: '4px 8px' },
    },
  },
  defaultVariants: { tone: 'neutral', compact: false },
});

<span className={badge({ tone, compact })} />;
```

Keep every variant key and value static. Use `sva` only for a component with multiple coordinated
slots. Do not add a config recipe or a new package export for a single call site.

Before adopting a less-used generated API such as patterns, JSX factories, `cva`, or `sva`, confirm
its export and types under `packages/styled-system` and check current Panda documentation.

## Responsive Styles and Selectors

Prefer generated condition names for standard breakpoints:

```tsx
const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 7fr) minmax(260px, 3fr)',
  smDown: { gridTemplateColumns: 'minmax(0, 1fr)' },
});
```

Use explicit media queries when matching a legacy or design-specific breakpoint:

```tsx
const nav = css({
  marginLeft: '30px',
  '@media (max-width: 1260px)': { margin: 'auto 20px' },
});
```

Prefer built-in conditions for common states and pseudo-elements:

```tsx
const button = css({
  _hover: { background: '#e7848e' },
  _focusVisible: { outline: '2px solid #3db3f5' },
  _disabled: { cursor: 'default' },
  _before: { content: '""', position: 'absolute' },
});
```

Use `&` for selectors not represented by a condition:

```tsx
const trigger = css({
  "&[aria-expanded='true']": { color: '#fff' },
  '& > span': { display: 'block' },
  '& .bgm-menu-item:hover': { color: '#f09199' },
});
```

Keep selector scope as narrow as possible. Legacy global class hooks are acceptable during gradual
migration, but do not broaden them beyond the component boundary.

## Migration Guidance

When migrating a CSS Module or Less unit:

1. Inventory every selector, modifier, pseudo-state, media query, animation, and external class hook.
2. Move stable rules to module-level Panda declarations from outer layout to inner elements.
3. Replace local modifier classes with `cx` or a finite `cva` variant.
4. Preserve global selectors deliberately with `&`; do not silently drop specificity or `!important`
   behavior required by an existing component.
5. Keep runtime-only values inline or behind CSS variables.
6. Remove obsolete stylesheet imports and rules only after all call sites move.
7. Regenerate CSS, run checks, and compare the rendered result at relevant viewports.

Do not perform unrelated stylesheet cleanup during migration. Panda does not enable preflight here,
so preserve any explicit reset-dependent declarations the component needs.

## Generation and Debugging

Use `pnpm panda:cssgen` after changing extractable source styles. Use
`pnpm panda:codegen && pnpm panda:cssgen` after changing config or generated API shape.

The website `build` and `dev` scripts run CSS generation first, but explicit generation is still useful
for reviewing the committed artifact diff. Configuration changes can rewrite many generated files;
verify that the scope is expected.

During Vite development, `packages/website/panda-dev-hmr.ts` invalidates the entry CSS when Panda
sources, configuration, or generated output change. If styles appear stale, first distinguish an HMR
problem from an extraction problem by running CSS generation and checking whether the expected rule
exists in generated output.
