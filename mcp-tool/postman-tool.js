import express from 'express';
import newman from 'newman';
import { z } from 'zod';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

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
  console.log('📋 MCP Manifest requested');
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
  console.log('📋 List Postman Collections requested');
  if (!POSTMAN_API_KEY) {
    console.log('❌ Missing POSTMAN_API_KEY environment variable');
    return res.status(500).json({ error: 'Missing POSTMAN_API_KEY environment variable' });
  }

  try {
    console.log('🔍 Fetching collections from Postman API...');
    const response = await fetch(`${POSTMAN_API_BASE}/collections`, {
      headers: {
        'X-Api-Key': POSTMAN_API_KEY,
      }
    });

    const data = await response.json();
    if (!data.collections) {
      console.log('❌ Failed to fetch collections from API');
      return res.status(500).json({ error: 'Failed to fetch collections' });
    }

    const collections = data.collections.map(c => ({
      name: c.name,
      uid: c.uid,
      link: `https://api.getpostman.com/collections/${c.uid}?apikey=${POSTMAN_API_KEY}`
    }));

    console.log(`✅ Found ${collections.length} collections:`, collections.map(c => c.name));
    res.json({ collections });
  } catch (e) {
    console.log('❌ Error fetching collections:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// === Tool: Run Collection ===
app.post('/runPostmanCollection', async (req, res) => {
  console.log('🚀 Run Postman Collection requested');
  const parsed = inputSchemaRun.safeParse(req.body);
  if (!parsed.success) {
    console.log('❌ Invalid request body:', parsed.error);
    return res.status(400).json({ error: parsed.error });
  }

  const { collectionUrl, environmentUrl } = parsed.data;
  console.log('📋 Collection URL:', collectionUrl);
  if (environmentUrl) {
    console.log('🌍 Environment URL:', environmentUrl);
  }

  try {
    const options = {
      collection: collectionUrl,
      reporters: ['cli', 'json'],
    };
    if (environmentUrl) {
      options.environment = environmentUrl;
    }

    console.log('🔄 Starting Newman collection run...');
    newman.run(options, (err, summary) => {
      if (err) {
        console.log('❌ Newman run failed:', err.message);
        return res.status(500).json({ error: err.message });
      }

      console.log('✅ Newman run completed successfully');
      console.log('📊 Stats:', summary.run.stats);
      if (summary.run.failures && summary.run.failures.length > 0) {
        console.log('❌ Failures:', summary.run.failures);
      }

      res.json({
        message: 'Postman collection run complete',
        stats: summary.run.stats,
        failures: summary.run.failures
      });
    });
  } catch (e) {
    console.log('❌ Error running collection:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(3333, () => {
  console.log('🚀 MCP Postman Tool running at http://localhost:3333');
  console.log('📋 Available endpoints:');
  console.log('   GET  /.well-known/mcp.json');
  console.log('   POST /listPostmanCollections');
  console.log('   POST /runPostmanCollection');
  if (!POSTMAN_API_KEY) {
    console.log('⚠️  Warning: POSTMAN_API_KEY environment variable not set');
  } else {
    console.log('✅ POSTMAN_API_KEY is configured');
  }
}); 