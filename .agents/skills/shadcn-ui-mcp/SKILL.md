---
name: shadcn-ui-mcp
description: Guide and instructions for setting up and using shadcn/ui and its MCP server to add components, customize styles, and integrate with React/Next.js applications.
license: MIT
metadata:
  author: antigravity
  version: "1.0.0"
---

# shadcn/ui MCP Skill

This skill explains how to utilize shadcn/ui and its Model Context Protocol (MCP) server tools to add, manage, and customize premium React components.

## 1. Setup and Installation

### 1.1 CLI Commands
To initialize shadcn/ui in a project (React, Next.js, or Vite):
```bash
npx shadcn@latest init
# Or when using Bun:
bunx shadcn@latest init
```

### 1.2 Adding Components
To add individual components (e.g., button, card, dialog, input):
```bash
npx shadcn@latest add button card dialog input
```

## 2. MCP Server Integration

If you have a shadcn/ui MCP server configured, it exposes the following capabilities:
- **`list_components`**: Lists all available shadcn/ui components.
- **`get_component_code`**: Retrieves the code and implementation details for a component.
- **`add_component`**: Programmatically adds a component to the codebase.

### 2.1 Configuration in `mcp_config.json`
To configure the shadcn/ui MCP server in your client environment, add:
```json
{
  "mcpServers": {
    "shadcn-mcp": {
      "command": "npx",
      "args": ["-y", "shadcn-mcp-server"]
    }
  }
}
```

## 3. Best Practices
- **Tailwind Integration:** Always ensure `tailwind.config.js` is properly updated by the initializer to resolve components correctly.
- **CSS Variables:** shadcn uses CSS variables for themes (e.g., `--background`, `--primary`). Customize these in the global CSS file (`globals.css` or `index.css`) rather than hardcoding Tailwind classes.
- **TypeScript Support:** Verify that path aliases (e.g., `@/components/*`) are configured in `tsconfig.json`.
