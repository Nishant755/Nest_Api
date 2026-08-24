---
name: playwright-mcp
description: Instructions and guidelines for installing Playwright, running end-to-end (E2E) tests, capturing screenshots, and utilizing Playwright MCP server capabilities.
license: MIT
metadata:
  author: antigravity
  version: "1.0.0"
---

# Playwright MCP Skill

This skill outlines how to write E2E tests with Playwright, configure the environment, and integrate Playwright MCP servers for testing automation.

## 1. Setup & Installation

### 1.1 Getting Started
Install Playwright in your target frontend project:
```bash
npm init playwright@latest
# Or using Bun:
bunx create-playwright
```

Follow the prompts to configure:
- TypeScript or JavaScript support.
- Location of the test directory (typically `tests/` or `e2e/`).
- Adding a GitHub Actions workflow.

### 1.2 Running Tests
- **Run all tests:** `npx playwright test`
- **Run in UI mode:** `npx playwright test --ui`
- **Run a specific test file:** `npx playwright test tests/login.spec.ts`
- **Show HTML report:** `npx playwright show-report`

## 2. Playwright MCP Server

A Playwright MCP server exposes tools to programmatically control a headless browser, navigate pages, click elements, fill forms, and take screenshots.

### 2.1 Configuration in `mcp_config.json`
Add the Playwright MCP server to your client configuration:
```json
{
  "mcpServers": {
    "playwright-mcp": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    }
  }
}
```

### 2.2 Key Tools
- **`playwright_navigate`**: Load a URL.
- **`playwright_click`**: Click a selector.
- **`playwright_fill`**: Type value into input selector.
- **`playwright_screenshot`**: Capture full-page or element screenshots for validation.

## 3. Writing Robust E2E Tests
- **Use Locators:** Prefer user-visible locators like `page.getByRole()`, `page.getByText()`, and `page.getByLabel()` instead of CSS class selectors.
- **Auto-waiting:** Playwright automatically waits for elements to be actionable before performing actions.
- **Screenshots on Failure:** Configure `playwright.config.ts` to capture screenshots and traces on failure:
  ```typescript
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  }
  ```
