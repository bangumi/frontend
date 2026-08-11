---
name: playwright-visual-implementation
description: Use Playwright screenshots to implement or repair a frontend against one or more visual references. Trigger when a user asks to match a screenshot, reproduce an existing page, fix visual differences, perform screenshot-driven UI development, or investigate a visual regression across view modes or viewport sizes.
---

# Playwright Visual Implementation

Implement against rendered evidence, not memory. Iterate through controlled screenshots until the requested state matches the reference without regressing adjacent states.

## 1. Establish The Comparison Contract

Identify before editing:

- Which image is current and which is expected.
- Exact route, viewport, device scale factor, and whether either image is cropped.
- Required UI state: selected tab, view mode, filters, expanded panels, scroll position, and responsive breakpoint.
- Persistent inputs such as local storage, cookies, feature flags, and server preferences.
- Data assumptions that affect layout: item count, title lengths, missing images, progress values, and loading/error states.

Do not compare screenshots from different states. Reproduce the reference state first. If the state is persisted, set or preserve the real persistence mechanism rather than hard-coding a component default.

## 2. Inspect Before Editing

Read the page component, styles, shared components, route, fixtures, tests, and relevant generated types. Check the dirty worktree and preserve unrelated changes.

Determine whether the difference comes from:

1. Wrong structure or view variant.
2. Wrong content source or state.
3. Wrong asset or aspect ratio.
4. Wrong dimensions, spacing, typography, color, or borders.

Fix in that order. CSS cannot repair the wrong component structure or data state.

## 3. Capture A Controlled Baseline

Use the repository's Playwright installation. Capture to `/tmp` unless the project has an established visual-test artifact directory.

Build the website first, then use the screenshot CLI. The CLI starts a temporary Vite preview server for the built `dist` assets, applies the configured `/p1` API proxy, selects an unused local port, and closes the server after capture. Do not ask the user to start or keep a Vite dev server running for visual work.

Prefer the repository's screenshot CLI, `pnpm website screenshot` (`packages/website/scripts/screenshot.mjs`):

```bash
pnpm run build
pnpm website screenshot <route> <output> [options]
```

Useful options:

- `--width` / `--height`: viewport size (default 1440×900)
- `--device-scale-factor <n>`: device scale factor (default 1)
- `--full-page`: capture the full scrollable page
- `--wait-until <state>`: `commit`, `domcontentloaded`, `load`, or `networkidle` (default `domcontentloaded`)
- `--wait-for <selector>`: wait for a selector to become visible
- `--wait-ms <ms>`: additional delay after loading (default 1000)
- `--local-storage key=value`: set local storage before navigation (repeatable)
- `--storage-state <path>`: Playwright storage-state JSON for authentication

Examples:

```bash
pnpm run build
pnpm website screenshot /user/sai /tmp/user.png --full-page
pnpm website screenshot --wait-for main --local-storage view=grid
```

Pass a route such as `/anime`, rather than the address of a manually started server. The CLI accepts a legacy loopback URL by extracting its route, but new commands should use a route. Use the same `--mode` for the build and screenshot command when a non-default Vite mode is required.

Write a small temporary Playwright script only when the CLI cannot express the needed state, for example for clicks, form input, or intercepting API responses with fixtures. It must start the same temporary Vite preview server for the built assets; do not point it at a dev server:

```js
import { preview } from 'vite';
import { chromium } from '@playwright/test';

const previewServer = await preview({
  root: 'packages/website',
  mode: 'production',
  preview: { host: '127.0.0.1', port: 0, strictPort: true },
});
const { port } = previewServer.httpServer.address();
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

try {
  await page.route('**/api/page-data', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: fixture }),
  );

  await page.goto(`http://127.0.0.1:${port}/target-route`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Show details' }).click();
  await page.locator('[data-ready]').waitFor();
  await page.screenshot({ path: output, fullPage: true });
} finally {
  await context.close();
  await browser.close();
  await previewServer.close();
}
```

Use authentication storage supplied by the project or intercept APIs with existing fixtures. Never place credentials or bearer tokens in screenshot scripts. Keep fixture data representative: include long text, odd item counts, future/disabled items, and enough rows to expose the target layout.

Capture at minimum:

- The exact desktop reference state.
- Every alternate view mode touched by shared markup or CSS.
- A mobile viewport when the page is responsive.

## 4. Compare Systematically

Open both images and compare from large geometry to small styling:

1. Page bounds, max width, columns, and major vertical positions.
2. Component structure, row/column count, overflow, and visible first-viewport content.
3. Stable element dimensions and media aspect ratios.
4. Typography: displayed field, font size, weight, line height, and wrapping.
5. Controls and state styling: active, watched, available, disabled, hover, and focus.
6. Borders, radii, shadows, separators, and color.

Normalize measurements when image dimensions or device scale factors differ. Use relative positions or element bounding boxes instead of copying raw screenshot pixels blindly.

When useful, collect geometry with `locator.boundingBox()` and compare exact values. For canvas or 3D output, also verify nonblank pixels.

Write down concrete deltas such as "cover must be square instead of portrait" or "grid cards must not render detail-only metadata." Avoid vague conclusions like "spacing feels off."

## 5. Implement By Variant

Keep view-specific markup and styles explicit. Shared components may share behavior, but do not let detail-only content or CSS leak into compact/grid variants.

Preserve:

- Existing interactions and API mutations.
- Persistence semantics for tabs, view modes, and filters.
- Semantic HTML and accessible labels/pressed states.
- Project design tokens, icons, links, and responsive conventions.

Add disabled or unavailable states from real domain data, not visual guesses. Use the repository's preferred date, state, and routing utilities.

## 6. Iterate With Screenshots

After each meaningful structural or styling pass:

1. Capture the target state again.
2. Inspect the image at original resolution.
3. Capture alternate modes and mobile.
4. Fix the largest remaining mismatch.

Do not declare success from unit tests alone. Do not declare success from one screenshot when shared code affects multiple modes.

## 7. Verify Behavior And Quality

Add or update focused tests for behavior changed during visual work, especially:

- View switching and persistence restoration.
- Selection changing the detail panel.
- Disabled/future item states.
- Existing update or submit actions.

Run the scoped tests, type check, lint, style lint, format check, and build according to the repository instructions. Report pre-existing warnings separately from failures.

Before finishing, confirm the actual URL and summarize the states visually checked.
