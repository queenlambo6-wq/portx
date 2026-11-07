import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

// Persistent Data Directory
const DATA_DIR = path.join(__dirname, 'data');
const SHIPMENTS_FILE = path.join(DATA_DIR, 'shipments.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read shipments from central JSON database
function readShipments(): any[] {
  try {
    if (fs.existsSync(SHIPMENTS_FILE)) {
      const content = fs.readFileSync(SHIPMENTS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('[Server] Failed to read shipments.json:', err);
  }
  return [];
}

// Helper to write shipments to central JSON database
function writeShipments(shipments: any[]): boolean {
  try {
    fs.writeFileSync(SHIPMENTS_FILE, JSON.stringify(shipments, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Server] Failed to write shipments.json:', err);
    return false;
  }
}

async function startServer() {
  const app = express();

  // Enable CORS & JSON parsing
  app.use(express.json({ limit: '10mb' }));
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  // -------------------------------------------------------------
  // REST API Endpoints for Central Multi-Browser Tracking Sync
  // -------------------------------------------------------------

  // GET /api/shipments - List all shipments
  app.get('/api/shipments', (req, res) => {
    const list = readShipments();
    res.json(list);
  });

  // GET /api/shipments/:code - Get single shipment by trackingNumber, bookingRef, bol, container
  app.get('/api/shipments/:code', (req, res) => {
    const code = (req.params.code || '').trim().toUpperCase();
    const normalized = code.replace(/[^A-Z0-9]/g, '');
    const list = readShipments();

    const found = list.find((s: any) => {
      if (!s) return false;
      const sTn = (s.trackingNumber || '').trim().toUpperCase();
      const sTnNorm = sTn.replace(/[^A-Z0-9]/g, '');
      if (sTn === code || (normalized.length >= 3 && sTnNorm === normalized)) return true;
      if (s.bookingRef && (s.bookingRef.toUpperCase() === code || s.bookingRef.toUpperCase().replace(/[^A-Z0-9]/g, '') === normalized)) return true;
      if (s.bolNumber && (s.bolNumber.toUpperCase() === code || s.bolNumber.toUpperCase().replace(/[^A-Z0-9]/g, '') === normalized)) return true;
      if (s.containerNumber && s.containerNumber.toUpperCase().replace(/[^A-Z0-9]/g, '') === normalized) return true;
      if (s.id && s.id.toUpperCase() === code) return true;
      return false;
    });

    if (found) {
      res.json(found);
    } else {
      res.status(404).json({ error: `No shipment found with code "${code}"` });
    }
  });

  // POST /api/shipments - Create a new shipment
  app.post('/api/shipments', (req, res) => {
    const newShipment = req.body;
    if (!newShipment || !newShipment.trackingNumber) {
      return res.status(400).json({ error: 'trackingNumber is required' });
    }

    const list = readShipments();
    const trimmedCode = (newShipment.trackingNumber || '').trim().toUpperCase();

    // Check duplicate
    const isDuplicate = list.some((s: any) => s.trackingNumber?.trim().toUpperCase() === trimmedCode);
    if (isDuplicate) {
      return res.status(409).json({ error: `Tracking code ${trimmedCode} already exists.` });
    }

    const created = {
      ...newShipment,
      id: newShipment.id || `sh-${Date.now()}`,
      trackingNumber: trimmedCode,
      createdAt: newShipment.createdAt || new Date().toISOString()
    };

    list.unshift(created);
    writeShipments(list);
    console.log(`[Server] Created new shipment ${trimmedCode} (${list.length} total)`);
    res.status(201).json(created);
  });

  // PUT /api/shipments/:id - Update shipment
  app.put('/api/shipments/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const list = readShipments();
    const index = list.findIndex((s: any) => s.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    list[index] = { ...list[index], ...updates };
    writeShipments(list);
    res.json(list[index]);
  });

  // DELETE /api/shipments/:id - Delete shipment
  app.delete('/api/shipments/:id', (req, res) => {
    const { id } = req.params;
    let list = readShipments();
    const initialLen = list.length;
    list = list.filter((s: any) => s.id !== id);

    if (list.length === initialLen) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    writeShipments(list);
    res.json({ success: true, remaining: list.length });
  });

  // POST /api/shipments/:id/milestones - Append milestone
  app.post('/api/shipments/:id/milestones', (req, res) => {
    const { id } = req.params;
    const milestone = req.body;
    const list = readShipments();
    const shipment = list.find((s: any) => s.id === id);

    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    if (!shipment.milestones) shipment.milestones = [];
    const newM = {
      ...milestone,
      id: milestone.id || `m-${Date.now()}`
    };
    shipment.milestones.push(newM);
    writeShipments(list);
    res.status(201).json(newM);
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // -------------------------------------------------------------
  // Frontend Serving: Vite Dev Middleware or Static Dist
  // -------------------------------------------------------------
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] PortX Global Logistics server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal server startup error:', err);
  process.exit(1);
});
