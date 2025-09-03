import { describe, expect, test, beforeAll } from "bun:test";
import {
  decideQwenCliCommand,
  executeQwenCli,
  executeQwenSearch,
  executeQwenChat,
  executeQwenAnalyzeFile,
} from "../../index";

// Check if qwen-cli is available
let isQwenCliAvailable = false;

beforeAll(async () => {
  try {
    await decideQwenCliCommand(false);
    isQwenCliAvailable = true;
  } catch {
    isQwenCliAvailable = false;
  }
});

describe("MCP Qwen CLI Integration Tests", () => {
  describe("qwen-cli detection", () => {
    test("decideQwenCliCommand finds qwen-cli or falls back correctly", async () => {
      try {
        // Test without npx fallback
        const cmdWithoutNpx = await decideQwenCliCommand(false);
        expect(cmdWithoutNpx.command).toBe("qwen");
        expect(cmdWithoutNpx.initialArgs).toEqual([]);
      } catch (error) {
        // If qwen-cli is not installed, it should throw the expected error
        expect(error instanceof Error && error.message).toContain(
          "qwen not found globally",
        );
      }

      // Test with npx fallback
      const cmdWithNpx = await decideQwenCliCommand(true);
      expect(cmdWithNpx.command).toBeOneOf(["qwen", "npx"]);
      if (cmdWithNpx.command === "npx") {
        expect(cmdWithNpx.initialArgs).toEqual(["@qwen-code/qwen-code"]);
      }
    });

    test("executeQwenCli handles errors correctly", async () => {
      try {
        // Try to execute a command that will likely fail
        const result = await executeQwenCli(
          { command: "qwen", initialArgs: [] },
          ["--invalid-flag-that-does-not-exist"],
        );
        // If it somehow succeeds, check that we got a string
        expect(typeof result).toBe("string");
      } catch (error) {
        // This is expected to fail
        expect(error).toBeInstanceOf(Error);
        expect(error instanceof Error && error.message).toMatch(
          /qwen exited with code|Executable not found/,
        );
      }
    });
  });

  describe("tool execution", () => {
    test.if(isQwenCliAvailable)(
      "qwenSearchTool executes without error",
      async () => {
        const result = await executeQwenSearch({
          query: "test search",
          limit: 3,
          raw: true,
          sandbox: true,
          yolo: true, // Auto-accept to avoid hanging
          model: "qwen3-coder-plus",
        });

        // Check that we got some result
        expect(result).toBeDefined();
        expect(typeof result).toBe("string");
      },
      30000,
    ); // 30 second timeout

    test.if(isQwenCliAvailable)(
      "chatTool executes without error",
      async () => {
        const result = await executeQwenChat({
          prompt: "Say hello",
          sandbox: true,
          yolo: true, // Auto-accept to avoid hanging
          model: "qwen3-coder-plus",
        });

        // Check that we got a response
        expect(result).toBeDefined();
        expect(typeof result).toBe("string");
      },
      30000,
    ); // 30 second timeout

    test.if(isQwenCliAvailable)(
      "analyzeFileTool executes without error",
      async () => {
        // Create a temporary test file
        const testFilePath = "/tmp/test.txt";
        await Bun.write(testFilePath, "This is a test file for analysis.");

        const result = await executeQwenAnalyzeFile({
          filePath: testFilePath,
          prompt: "Summarize this file",
          sandbox: true,
          yolo: true,
          model: "qwen3-coder-plus",
        });

        // Check that we got a response
        expect(result).toBeDefined();
        expect(typeof result).toBe("string");
      },
      30000,
    ); // 30 second timeout

    if (!isQwenCliAvailable) {
      test("qwen-cli not available", () => {
        expect(true).toBe(true);
      });
    }
  });
});
