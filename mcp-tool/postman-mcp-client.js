import fetch from 'node-fetch';

class PostmanMCPClient {
  constructor(baseUrl = 'http://localhost:3333') {
    this.baseUrl = baseUrl;
  }

  async getManifest() {
    try {
      const response = await fetch(`${this.baseUrl}/.well-known/mcp.json`);
      const manifest = await response.json();
      console.log('📋 MCP Manifest:');
      console.log(JSON.stringify(manifest, null, 2));
      return manifest;
    } catch (error) {
      console.error('❌ Failed to get manifest:', error.message);
      throw error;
    }
  }

  async listCollections() {
    try {
      const response = await fetch(`${this.baseUrl}/listPostmanCollections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      
      const result = await response.json();
      console.log('📋 Available Collections:');
      if (result.collections) {
        result.collections.forEach(collection => {
          console.log(`  - ${collection.name} (${collection.uid})`);
        });
      } else {
        console.log('  No collections found or error occurred');
      }
      return result;
    } catch (error) {
      console.error('❌ Failed to list collections:', error.message);
      throw error;
    }
  }

  async runCollection(collectionUrl, environmentUrl = null) {
    try {
      const payload = { collectionUrl };
      if (environmentUrl) {
        payload.environmentUrl = environmentUrl;
      }

      console.log(`🚀 Running collection: ${collectionUrl}`);
      const response = await fetch(`${this.baseUrl}/runPostmanCollection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      console.log('✅ Collection run result:');
      console.log(JSON.stringify(result, null, 2));
      return result;
    } catch (error) {
      console.error('❌ Failed to run collection:', error.message);
      throw error;
    }
  }

  async testConnection() {
    console.log('🔗 Testing connection to Postman MCP server...');
    try {
      await this.getManifest();
      await this.listCollections();
      console.log('✅ Connection test successful!');
      return true;
    } catch (error) {
      console.log('❌ Connection test failed!');
      return false;
    }
  }
}

// Example usage
async function main() {
  const client = new PostmanMCPClient();
  
  console.log('🚀 Postman MCP Client');
  console.log('=====================\n');
  
  // Test the connection
  const isConnected = await client.testConnection();
  
  if (isConnected) {
    console.log('\n🎉 Successfully connected to Postman MCP server on port 3333!');
    console.log('\nAvailable tools:');
    console.log('  - listPostmanCollections: Lists all Postman collections');
    console.log('  - runPostmanCollection: Runs a Postman collection by URL');
    
    // Example: Run a specific collection (uncomment and modify as needed)
    // const collectionUrl = 'https://api.getpostman.com/collections/YOUR_COLLECTION_UID?apikey=YOUR_API_KEY';
    // await client.runCollection(collectionUrl);
  } else {
    console.log('\n❌ Failed to connect to Postman MCP server');
    console.log('Make sure the server is running on port 3333');
  }
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default PostmanMCPClient; 