# MCP Qwen CLI

A simple MCP server wrapper for Qwen Code CLI that enables AI assistants to use Qwen's capabilities through the Model Context Protocol.

## What it does

This server exposes three tools that interact with Qwen Code CLI:

- `qwenSearch`: Asks Qwen to perform a web search using your query
- `chat`: Sends prompts directly to Qwen for general conversations
- `analyzeFile`: Analyzes files (images, PDFs, text) using Qwen's multimodal capabilities

## Prerequisites

- [Qwen Code CLI](https://github.com/QwenLM/qwen-code) installed and configured (optional with --allow-npx flag)

## Authentication Setup

Qwen CLI supports both browser authentication and API key authentication:

### Option 1: Browser Authentication (Recommended for personal use)

1. Install Qwen CLI: `npm install -g @qwen-code/qwen-code`
2. Run `qwen` once to complete browser authentication
3. No additional environment variables needed

### Option 2: API Key Authentication

Set up environment variables for API access:

```bash
# For DashScope (Alibaba Cloud) - Recommended
export OPENAI_API_KEY="your_api_key_here"
export OPENAI_BASE_URL="https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
export OPENAI_MODEL="qwen3-coder-plus"

# For OpenRouter (free tier available)
export OPENAI_API_KEY="your_api_key_here"
export OPENAI_BASE_URL="https://openrouter.ai/api/v1"
export OPENAI_MODEL="qwen/qwen3-coder:free"
```

The server automatically detects which authentication method to use based on your environment.

## 🚀 Quick Start with Claude Code

### 1. Add the MCP server

```bash
claude mcp add -s project qwen-cli -- npx mcp-qwen-cli --allow-npx
```

Or configure your MCP client with the settings shown in the Installation Options section below.

### 2. Try it out

Example prompts:

- **Search**: "Search for the latest TypeScript 5.0 features using Qwen"
- **Chat**: "Ask Qwen to explain the difference between async/await and promises in JavaScript"
- **File Analysis**: "Ask Qwen to analyze the image at /path/to/screenshot.png"

## 🔧 Installation Options

### Using npx with --allow-npx flag

```json
{
  "mcpServers": {
    "mcp-qwen-cli": {
      "command": "npx",
      "args": ["mcp-qwen-cli", "--allow-npx"]
    }
  }
}
```

### Local Development

1. Clone and install:

```bash
git clone https://github.com/choplin/mcp-qwen-cli
cd mcp-qwen-cli
bun install
```

1. Add to Claude Desktop config:

```json
{
  "mcpServers": {
    "mcp-qwen-cli": {
      "command": "bun",
      "args": ["run", "/path/to/mcp-qwen-cli/index.ts"]
    }
  }
}
```

## 🛠️ Available Tools

### 1. qwenSearch

Performs a web search using Qwen Code CLI.

**Parameters:**

- `query` (required): The search query
- `limit` (optional): Maximum number of results
- `sandbox` (optional): Run in sandbox mode
- `yolo` (optional): Skip confirmations
- `model` (optional): Qwen model to use (default: "qwen3-coder-plus")

### 2. chat

Have a conversation with Qwen.

**Parameters:**

- `prompt` (required): The conversation prompt
- `sandbox` (optional): Run in sandbox mode
- `yolo` (optional): Skip confirmations
- `model` (optional): Qwen model to use (default: "qwen3-coder-plus")

### 3. analyzeFile

Analyze files using Qwen's multimodal capabilities.

**Supported file types:**

- **Images**: PNG, JPG, JPEG, GIF, WEBP, SVG, BMP
- **Text**: TXT, MD, TEXT
- **Documents**: PDF

**Parameters:**

- `filePath` (required): The absolute path to the file to analyze
- `prompt` (optional): Additional instructions for analyzing the file
- `sandbox` (optional): Run in sandbox mode
- `yolo` (optional): Skip confirmations
- `model` (optional): Qwen model to use (default: "qwen3-coder-plus")

## 💡 Example Prompts

Try these prompts to see mcp-qwen-cli in action:

- **Search**: "Search for the latest TypeScript 5.0 features using Qwen"
- **Chat**: "Ask Qwen to explain the difference between async/await and promises in JavaScript"
- **File Analysis**: "Ask Qwen to describe what's in this image: /Users/me/Desktop/screenshot.png"

## 🛠️ Example Usage

### qwenSearch

```typescript
// Simple search
qwenSearch({ query: "latest AI news" });

// Search with limit
qwenSearch({
  query: "TypeScript best practices",
  limit: 5,
});
```

### chat

```typescript
// Simple chat
chat({ prompt: "Explain quantum computing in simple terms" });

// Using a different model
chat({
  prompt: "Write a haiku about programming",
  model: "qwen3-coder",
});
```

### analyzeFile

```typescript
// Analyze an image
analyzeFile({
  filePath: "/path/to/image.png",
  prompt: "What objects are in this image?"
});

// Analyze a PDF
analyzeFile({
  filePath: "/path/to/document.pdf",
  prompt: "Summarize the key points in this document"
});

// General analysis without specific instructions
analyzeFile({ filePath: "/path/to/file.jpg" });
```

## 📝 Development

> **Note**: Development requires [Bun](https://bun.sh) runtime.

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

## 📋 Changelog

### [0.4.0] - 2025-09-03

#### Breaking Changes

- Migrated from Gemini CLI to Qwen Code CLI
- Tool names: `googleSearch` → `qwenSearch`
- Package name: `mcp-gemini-cli` → `mcp-qwen-cli`
- Default model: `gemini-2.5-pro` → `qwen3-coder-plus`

#### New Features (0.3.1)

- Support for Qwen Code CLI with enhanced code understanding
- Updated authentication methods for Qwen services

### [0.3.1] - 2025-07-03

#### Fixed

- Fixed Windows compatibility issue with `which` command

### [0.3.0] - 2025-07-02

#### Breaking Changes (0.3.0)

- Tool names: `geminiChat` → `chat`, `geminiAnalyzeFile` → `analyzeFile`
- Package name: `@choplin/mcp-gemini-cli` → `mcp-gemini-cli`

#### New Features (0.3.0)

- `analyzeFile` tool for images (PNG/JPG/GIF/etc), PDFs, and text files

### [0.2.0] - Previous

- Initial release with `googleSearch` and `geminiChat` tools

## 🔗 Related Links

- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- [Qwen Code CLI](https://github.com/QwenLM/qwen-code)
- [Bun Runtime](https://bun.sh)
