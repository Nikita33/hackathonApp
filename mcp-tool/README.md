# Postman MCP Server

A Model Context Protocol (MCP) server that integrates with Postman collections.

## Features

- List all Postman collections from your account
- Run Postman collections via API
- MCP-compatible for integration with Cursor and other MCP clients

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Postman API key:
   ```
   POSTMAN_API_KEY=your_postman_api_key_here
   ```
   
   Get your API key from: https://web.postman.com/settings/me/api-keys

3. **Start the server:**
   ```bash
   npm start
   ```

## Usage

The server runs on `http://localhost:3333` and provides:

- **MCP Manifest**: `GET /.well-known/mcp.json`
- **List Collections**: `POST /listPostmanCollections`
- **Run Collection**: `POST /runPostmanCollection`

## Cursor Integration

Add to your `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "postman-tool": {
      "command": "node",
      "args": ["/path/to/your/postman-tool.js"]
    }
  }
}
```

## Security

- Never commit your `.env` file
- Keep your Postman API key secure
- The `.env` file is already in `.gitignore` 