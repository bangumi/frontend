import { defineConfig, devices } from '@playwright/test';

const PORT = 5173;
const isCI = !!process.env.CI;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // maxFailures: 1,
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: isCI
    ? [['dot'], ['html', { open: 'never' }], ['github']]
    : [['list'], ['html', { open: 'on-failure' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://127.0.0.1:${PORT}/`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  // Directory that will be recursively scanned for test files.
  testDir: './e2e',

  // reportSlowTests: isCI ? null : undefined,

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  webServer: {
    reuseExistingServer: true,
    command: 'npm run dev',
    port: PORT,
  },

  expect: {
    timeout: 10 * 1000,
  },

  projects: [
    {
      // 离线可跑：页面渲染/布局/404，API 全部用本地 fixtures 拦截
      name: 'fixtures',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /(main|404)\.spec\.ts/,
    },
    // TODO: 需要真实后端（本地 next.bgm.tv 或 CI 的 server-private），
    // server 集成就绪后恢复以下 project（group.spec.ts / e2e/setup）
    // {
    //   name: 'setup',
    //   testDir: './e2e/setup',
    //   testMatch: /.*\.setup\.ts/,
    // },
    // {
    //   name: 'server',
    //   use: { ...devices['Desktop Chrome'] },
    //   dependencies: ['setup'],
    //   testMatch: /group\.spec\.ts/,
    // },
  ],
});
