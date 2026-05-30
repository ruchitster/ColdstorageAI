# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\login.spec.js >> invalid login shows error alert / stays on login
- Location: tests\auth\login.spec.js:3:1

# Error details

```
TimeoutError: locator.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for getByTestId('login-username')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: "[plugin:vite:oxc] Transform failed with 1 error: [PARSE_ERROR] Expected `,` or `)` but found `}` ╭─[ src/pages/InwardStockMovementReport.jsx:184:8 ] │ 102 │ ) : ( │ ┬ │ ╰── Opened here │ 184 │ )} │ ┬ │ ╰── `,` or `)` expected ─────╯"
  - generic [ref=e5]: D:/ReactProject/AIcoldstorage/frontend/src/pages/InwardStockMovementReport.jsx
  - generic [ref=e6]: at transformWithOxc (file:///D:/ReactProject/AIcoldstorage/frontend/node_modules/vite/dist/node/chunks/node.js:3339:19) at TransformPluginContext.transform (file:///D:/ReactProject/AIcoldstorage/frontend/node_modules/vite/dist/node/chunks/node.js:3410:26) at EnvironmentPluginContainer.transform (file:///D:/ReactProject/AIcoldstorage/frontend/node_modules/vite/dist/node/chunks/node.js:30271:51) at async loadAndTransform (file:///D:/ReactProject/AIcoldstorage/frontend/node_modules/vite/dist/node/chunks/node.js:24532:26) at async viteTransformMiddleware (file:///D:/ReactProject/AIcoldstorage/frontend/node_modules/vite/dist/node/chunks/node.js:24326:20)
  - generic [ref=e7]:
    - text: Click outside, press Esc key, or fix the code to dismiss.
    - text: You can also disable this overlay by setting
    - code [ref=e8]: server.hmr.overlay
    - text: to
    - code [ref=e9]: "false"
    - text: in
    - code [ref=e10]: vite.config.js
    - text: .
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('invalid login shows error alert / stays on login', async ({ page }) => {
  4  |   await page.goto('/');
  5  | 
> 6  |   await page.getByTestId('login-username').fill('wrong');
     |                                            ^ TimeoutError: locator.fill: Timeout 15000ms exceeded.
  7  |   await page.getByTestId('login-password').fill('wrong');
  8  |   await page.getByTestId('login-submit').click();
  9  | 
  10 |   // Current app uses alert(...) on invalid credentials.
  11 |   // We assert we are still on login page by locating the submit button.
  12 |   await expect(page.getByTestId('login-submit')).toBeVisible();
  13 | });
  14 | 
  15 | 
  16 | 
  17 | 
  18 | 
  19 | 
  20 | 
```