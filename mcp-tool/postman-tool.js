import express from 'express';
import newman from 'newman';
import { z } from 'zod';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const POSTMAN_API_KEY = process.env.POSTMAN_API_KEY;
const POSTMAN_API_BASE = 'https://api.getpostman.com';

// === MCP Tool Definitions ===
const inputSchemaRun = z.object({
  collectionUrl: z.string().url(),
  environmentUrl: z.string().url().optional()
});

const inputSchemaList = z.object({}); // no input needed

// === MCP Manifest ===
app.get('/.well-known/mcp.json', (req, res) => {
  res.json({
    tools: [
      {
        name: 'runPostmanCollection',
        description: 'Run a Postman collection by providing its URL',
        input_schema: {
          type: 'object',
          properties: {
            collectionUrl: { type: 'string' },
            environmentUrl: { type: 'string' }
          },
          required: ['collectionUrl']
        },
        endpoint: '/runPostmanCollection'
      },
      {
        name: 'listPostmanCollections',
        description: 'Lists all Postman collections from your account',
        input_schema: {
          type: 'object',
          properties: {},
          required: []
        },
        endpoint: '/listPostmanCollections'
      }
    ]
  });
});

// === Tool: List Collections ===
app.post('/listPostmanCollections', async (req, res) => {
  if (!POSTMAN_API_KEY) {
    return res.status(500).json({ error: 'Missing POSTMAN_API_KEY environment variable' });
  }

  try {
    const response = await fetch(`${POSTMAN_API_BASE}/collections`, {
      headers: {
        'X-Api-Key': POSTMAN_API_KEY,
      }
    });

    const data = await response.json();
    if (!data.collections) {
      return res.status(500).json({ error: 'Failed to fetch collections' });
    }

    const collections = data.collections.map(c => ({
      name: c.name,
      uid: c.uid,
      link: `https://api.getpostman.com/collections/${c.uid}?apikey=${POSTMAN_API_KEY}`
    }));

    res.json({ collections });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// === Tool: Run Collection ===
app.post('/runPostmanCollection', async (req, res) => {
  const parsed = inputSchemaRun.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error });
  }

  const { collectionUrl, environmentUrl } = parsed.data;

  try {
    const options = {
      collection: collectionUrl,
      reporters: ['cli', 'json'],
    };
    if (environmentUrl) {
      options.environment = environmentUrl;
    }

    newman.run(options, (err, summary) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: 'Postman collection run complete',
        stats: summary.run.stats,
        failures: summary.run.failures
      });
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3333, () => {
  console.log('🚀 MCP Postman Tool running at http://localhost:3333');
  if (!POSTMAN_API_KEY) {
    console.log('⚠️  Warning: POSTMAN_API_KEY environment variable not set');
  }
}); 