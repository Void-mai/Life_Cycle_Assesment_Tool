# LCA Backend Server

A Node.js Express server that provides API endpoints for Life Cycle Assessment (LCA) data processing.

## Features

- **POST /api/lca-report**: Main endpoint for processing LCA data
- **GET /api/health**: Health check endpoint
- Simulated AI model for realistic data processing
- Comprehensive input validation
- Error handling and logging
- CORS support for frontend integration

## API Documentation

### POST /api/lca-report

Processes LCA input data and returns environmental impact analysis.

**Request Body:**
```json
{
  "material": "Aluminium",
  "recycledContent": 80,
  "totalMass": 100,
  "energySource": "Electricity",
  "energyConsumption": 75,
  "transportDistance": 500,
  "endOfLife": "Open-Loop Recycling",
  "reuseRecyclingPotential": 70
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "material": "Aluminium",
    "scenario": "80% Recycled Aluminium",
    "environmentalImpacts": {
      "carbonFootprint": 2.04,
      "waterUsage": 1.05
    },
    "baselineImpacts": {
      "carbonFootprint": 3.84,
      "waterUsage": 2.0
    },
    "circularityMetrics": {
      "recycledContentRate": 80,
      "circularityScore": 0.75,
      "resourceEfficiency": 0.84,
      "extendedProductLife": "7 years"
    },
    "flowData": [...],
    "recommendations": [...]
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Running the Server

```bash
# Start backend only
npm run dev:server

# Start both frontend and backend
npm run dev:full
```

The server will run on port 3001 by default.