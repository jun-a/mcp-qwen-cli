# MCP Gemini CLI

A simple MCP server wrapper for Google's Gemini CLI that enables AI assistants to use Gemini's capabilities through the Model Context Protocol.

## What it does

This server exposes two tools:

- `googleSearch`: Performs Google searches via Gemini CLI
- `geminiChat`: Sends prompts to Gemini models

## Prerequisites

- [Bun](https://bun.sh) runtime installed
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) installed and configured (optional with --allow-npx flag)

## 🚀 Quick Start

### Option 1: Using npx (Recommended)

```bash
# Ensure Gemini CLI is configured
# Run the MCP server
npx @choplin/mcp-gemini-cli

# Or with --allow-npx to auto-install Gemini CLI if needed
npx @choplin/mcp-gemini-cli --allow-npx
```

### Option 2: Local Development

1. Clone and install:

```bash
git clone https://github.com/choplin/mcp-gemini-cli
cd mcp-gemini-cli
bun install
```

1. Ensure Gemini CLI is installed and configured:

```bash
# Install Gemini CLI globally (if not already installed)
npm install -g @google-gemini/cli
```

1. Run the server:

```bash
bun run start
# Or with --allow-npx
bun run start --allow-npx
```

## 🔧 Configuration

### Claude Desktop Integration

Add this to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-gemini-cli": {
      "command": "npx",
      "args": ["@choplin/mcp-gemini-cli"]
    }
  }
}
```

Or for local development:

```json
{
  "mcpServers": {
    "mcp-gemini-cli": {
      "command": "bun",
      "args": ["run", "/path/to/mcp-gemini-cli/index.ts"]
    }
  }
}
```

## 🛠️ Available Tools

### 1. googleSearch

Performs a Google search using Gemini CLI.

**Parameters:**

- `query` (required): The search query
- `limit` (optional): Maximum number of results
- `raw` (optional): Return structured JSON with URLs and snippets
- `sandbox` (optional): Run in sandbox mode
- `yolo` (optional): Skip confirmations
- `model` (optional): Gemini model to use (default: "gemini-2.5-pro")

**Example Usage:**

```typescript
// Simple search
googleSearch({ query: "latest AI news" })

// Structured search with limits
googleSearch({ 
  query: "TypeScript best practices", 
  limit: 5, 
  raw: true 
})
```

### 2. geminiChat

Have a conversation with Gemini.

**Parameters:**

- `prompt` (required): The conversation prompt
- `sandbox` (optional): Run in sandbox mode
- `yolo` (optional): Skip confirmations
- `model` (optional): Gemini model to use (default: "gemini-2.5-pro")

**Example Usage:**

```typescript
// Simple chat
geminiChat({ prompt: "Explain quantum computing in simple terms" })

// Using a different model
geminiChat({ 
  prompt: "Write a haiku about programming", 
  model: "gemini-2.5-flash" 
})
```

## 📝 Development

### Run in Development Mode

```bash
bun run dev
```

### Run Tests

```bash
bun test
```

### Build for Production

```bash
# Development build
bun run build

# Production build (minified)
bun run build:prod
```

### Linting & Formatting

```bash
# Lint code
bun run lint

# Format code
bun run format
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related Links

- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Bun Runtime](https://bun.sh)
