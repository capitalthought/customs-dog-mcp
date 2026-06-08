# customs.dog MCP server

Connect your AI assistant to **[customs.dog](https://customs.dog)** — your pets' travel documents and **border trip-readiness** checks. Ask "is Stormey cleared to fly to Mexico next month?" and get a `cleared` / `caution` / `blocked` verdict with the exact paperwork that's missing.

customs.dog is a hosted **remote MCP server**. This package is a thin launcher that bridges a local stdio MCP client (Claude Desktop, Cursor, etc.) to it.

## Tools

| Tool | What it does |
|------|--------------|
| `customs_prep` | Validate your key, confirm the pet roster, report health. Call first. |
| `customs_overview` | Counts of pets/documents by status and what's expiring soon. |
| `customs_list_pets` | List the household's pets (source of `pet_id`). |
| `customs_list_documents` | List a pet's documents, filterable by category/status. |
| `customs_check_trip_readiness` | **Flagship** — `cleared` / `caution` / `blocked` for a pet + destination + return date, with a per-requirement breakdown. |
| `customs_upcoming_trips` | Upcoming trips from your connected travel calendar (TripIt/Flighty/Google/Apple), each with per-pet readiness. |

## Setup

1. **Get an API key** — sign in at [customs.dog](https://customs.dog) → **Settings → API keys**. One key = one household (read-only).
2. **Add it to your MCP client.**

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "customs-dog": {
      "command": "npx",
      "args": ["-y", "@capitalthought/customs-dog-mcp"],
      "env": { "CUSTOMS_DOG_API_KEY": "cdk_your_key_here" }
    }
  }
}
```

### Any client that speaks remote MCP

Point it straight at the endpoint — no launcher needed:

```
https://customs.dog/mcp
Authorization: Bearer cdk_your_key_here
```

## How it works

This package shells out to [`mcp-remote`](https://www.npmjs.com/package/mcp-remote), pointing it at `https://customs.dog/mcp` (streamable-HTTP, JSON-RPC 2.0) with your key as a Bearer header. Override the URL with `CUSTOMS_DOG_MCP_URL` if needed.

## Links

- 🌐 [customs.dog](https://customs.dog) · 🤖 [Agent contract](https://customs.dog/AGENTS.md) · 📇 [MCP server card](https://customs.dog/.well-known/mcp-server-card.json) · 📄 [llms.txt](https://customs.dog/llms.txt)

---

customs.dog is a preparation assistant operated by Capital Thought, LLC (Texas) — not legal, veterinary, or immigration advice. Only the border authority decides admission. MIT licensed.
