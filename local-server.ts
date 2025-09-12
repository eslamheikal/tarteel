import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: any) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// --- Dynamic API Route Loader ---
const apiDirectory = path.join(__dirname, 'api/endpoints');

// Check if the api directory exists
console.log(`📁 Looking for API endpoints in: ${apiDirectory}`);
if (fs.existsSync(apiDirectory)) {
  const files = fs.readdirSync(apiDirectory);
  console.log(`📄 Found files:`, files);
  files.forEach(file => {
    // We only want to register .ts files as routes
    if (file.endsWith('.ts')) {
      const routeName = file.replace('.endpoint.ts', '').replace('.ts', '');
      const routePath = `/api/${routeName}`;
      const modulePath = path.join(apiDirectory, file);
      console.log(`🔧 Processing file: ${file} -> Route: ${routePath}`);

      // Use app.all() to handle any HTTP method (GET, POST, etc.)
      // Use a more flexible route pattern that handles query parameters
      app.all(`${routePath}*`, (req: Request, res: Response) => {
        try {
          console.log(`🔍 Loading handler for ${routePath} from ${file}`);
          // Dynamically require the module
          const handler = require(modulePath).default;
          console.log(`📦 Handler loaded:`, typeof handler);
          if (typeof handler === 'function') {
            console.log(`✅ Executing handler for ${req.method} ${req.originalUrl}`);
            // Execute the Vercel-compatible function
            handler(req, res);
          } else {
            console.error(`❌ No default export found in ${file}`);
            res.status(500).send(`Error: No default export found in ${file}`);
          }
        } catch (error) {
          console.error(`❌ Error handling request for ${routePath}:`, error);
          res.status(500).send('Internal Server Error');
        }
      });

      console.log(`✔️  Mapped route ${routePath}* to ${file}`);
    }
  });
} else {
  console.warn('⚠️  `api` directory not found. No API routes loaded.');
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK',
    message: 'Tarteel API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Not found',
    message: `Route ${req.originalUrl} not found` 
  });
});

// Start the server
console.log(`🔧 Starting server on port: ${PORT}`);
app.listen(PORT, () => {
  console.log(`\n🚀 Tarteel API server is running at http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`👥 Users endpoints: http://localhost:${PORT}/api/users`);
  console.log(`📖 Readers endpoints: http://localhost:${PORT}/api/readers`);
  console.log(`🎵 Audio recordings endpoints: http://localhost:${PORT}/api/audio-recordings`);
  console.log(`🏠 Health: http://localhost:${PORT}/api/health`);
  console.log(`📝 Dynamic API routes loaded from api/ directory`);
});