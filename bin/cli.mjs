#!/usr/bin/env node
// customs.dog MCP launcher — bridges a local stdio MCP client (Claude Desktop, etc.)
// to the hosted customs.dog MCP server at https://customs.dog/mcp.
// Auth: set CUSTOMS_DOG_API_KEY to your per-household key (mint it at customs.dog → Settings → API keys).
import { spawn } from "node:child_process";

const KEY = process.env.CUSTOMS_DOG_API_KEY || process.env.CUSTOMS_DOG_KEY || "";
const URL = process.env.CUSTOMS_DOG_MCP_URL || "https://customs.dog/mcp";

const args = ["-y", "mcp-remote@latest", URL];
if (KEY) args.push("--header", `Authorization: Bearer ${KEY}`);

const child = spawn("npx", args, { stdio: "inherit", shell: process.platform === "win32" });
child.on("exit", (code) => process.exit(code ?? 0));
child.on("error", (e) => { console.error("customs-dog-mcp: failed to start mcp-remote —", e.message); process.exit(1); });
