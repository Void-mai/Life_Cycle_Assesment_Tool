const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ML Model Simulation (based on your trained RandomForest model)
function predictWithModel(inputData) {
  const {
    material,
    recycledContent,
    totalMass,
    energySource,
    transportDistance
  } = inputData;

  // Convert to model input format (one-hot encoding)
  const modelInput = {
    amount: totalMass,
    transportDistance: transportDistance,
    materialAluminium: material === 'Aluminium' ? 1 : 0,
    materialCopper: material === 'Copper' ? 1 : 0,
    routeBoth: recycledContent === 'Both' ? 1 : 0,
    routeOre: recycledContent === 'Ore' ? 1 : 0,
    routeRecycled: recycledContent === 'Recycled' ? 1 : 0,
    energyBoth: energySource === 'Both' ? 1 : 0,
    energyCoal: energySource === 'Coal' ? 1 : 0,
    energyElectricity: energySource === 'Electricity' ? 1 : 0,
  };

  let carbonFootprint = 0;
  let circularityScore = 0;

  // Carbon Footprint Logic (based on your dataset patterns)
  if (modelInput.routeRecycled === 1) {
    // Recycled route: very low carbon footprint
    if (modelInput.energyElectricity === 1) {
      carbonFootprint = modelInput.materialAluminium === 1 ? 
        0.89 + (modelInput.transportDistance * 0.0001) : // Aluminium + Electricity
        0.74 + (modelInput.transportDistance * 0.0001);   // Copper + Electricity
    } else if (modelInput.energyCoal === 1) {
      carbonFootprint = modelInput.materialAluminium === 1 ? 
        2.11 + (modelInput.transportDistance * 0.0002) : // Aluminium + Coal
        1.69 + (modelInput.transportDistance * 0.0002);   // Copper + Coal
    } else { // Both energy
      carbonFootprint = modelInput.materialAluminium === 1 ? 1.5 : 1.2;
    }
    circularityScore = 90 + Math.random() * 5; // 90-95 range
  } else if (modelInput.routeBoth === 1) {
    // Mixed route: medium carbon footprint
    if (modelInput.energyElectricity === 1) {
      carbonFootprint = modelInput.materialAluminium === 1 ? 
        8.64 + (modelInput.transportDistance * 0.0003) : // Aluminium + Electricity
        2.58 + (modelInput.transportDistance * 0.0002);   // Copper + Electricity
    } else if (modelInput.energyCoal === 1) {
      carbonFootprint = modelInput.materialAluminium === 1 ? 
        8.63 + (modelInput.transportDistance * 0.0003) : // Aluminium + Coal
        2.65 + (modelInput.transportDistance * 0.0002);   // Copper + Coal
    } else { // Both energy
      carbonFootprint = modelInput.materialAluminium === 1 ? 
        8.61 + (modelInput.transportDistance * 0.0003) : // Aluminium + Both
        2.64 + (modelInput.transportDistance * 0.0002);   // Copper + Both
    }
    circularityScore = 46 + Math.random() * 6; // 46-52 range
  } else { // Ore route
    // Virgin material: high carbon footprint
    if (modelInput.energyElectricity === 1) {
      carbonFootprint = modelInput.materialAluminium === 1 ? 
        8.57 + (modelInput.transportDistance * 0.0004) : // Aluminium + Electricity
        2.58 + (modelInput.transportDistance * 0.0003);   // Copper + Electricity
    } else if (modelInput.energyCoal === 1) {
      carbonFootprint = modelInput.materialAluminium === 1 ? 
        16.90 + (modelInput.transportDistance * 0.0005) : // Aluminium + Coal
        4.84 + (modelInput.transportDistance * 0.0004);    // Copper + Coal
    } else { // Both energy
      carbonFootprint = modelInput.materialAluminium === 1 ? 12.5 : 3.7;
    }
    circularityScore = 5 + Math.random() * 5; // 5-10 range
  }

  // Add some realistic variation
  carbonFootprint += (Math.random() - 0.5) * 0.2;
  circularityScore += (Math.random() - 0.5) * 2;

  // Ensure reasonable bounds
  carbonFootprint = Math.max(0.5, Math.min(20, carbonFootprint));
  circularityScore = Math.max(5, Math.min(95, circularityScore));

  return {
    carbonFootprint: Math.round(carbonFootprint * 100) / 100,
    circularityScore: Math.round(circularityScore * 100) / 100
  };
}

function generateBaseline(inputData) {
  const baselineInput = {
    ...inputData,
    recycledContent: 'Ore',
    energySource: 'Coal'
  };
  
  const baseline = predictWithModel(baselineInput);
  const current = predictWithModel(inputData);
  
  return {
    carbonFootprint: Math.max(baseline.carbonFootprint, current.carbonFootprint * 1.2),
    circularityScore: Math.min(baseline.circularityScore, current.circularityScore * 0.8)
  };
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simulated AI Model Function
function simulateAIModel(inputData) {
  // Use ML model for predictions
  const prediction = predictWithModel(inputData);
  const baseline = generateBaseline(inputData);

  return {
    material: inputData.material,
    scenario: `${inputData.recycledContent} Route ${inputData.material}`,
    environmentalImpacts: {
      carbonFootprint: prediction.carbonFootprint,
      waterUsage: 0 // Removed as not in your model
    },
    baselineImpacts: {
      carbonFootprint: baseline.carbonFootprint,
      waterUsage: 0 // Removed as not in your model
    },
    circularityMetrics: {
      recycledContentRate: getRecycledContentRate(inputData.recycledContent),
      circularityScore: prediction.circularityScore / 100, // Keep as 0-1 scale for internal use
      resourceEfficiency: calculateResourceEfficiency(inputData),
      extendedProductLife: `${Math.round(3 + (prediction.circularityScore / 100 * 5))} years`
    },
    flowData: generateFlowData(inputData),
    recommendations: generateRecommendations(inputData)
  };
}

function getRecycledContentRate(recycledContent) {
  const rates = {
    'Ore': 0,
    'Both': 50,
    'Recycled': 90
  };
  return rates[recycledContent] || 0;
}

function calculateCircularityScore(inputData) {
  const { recycledContent, reuseRecyclingPotential } = inputData;
  
  const recyclingWeight = 0.4;
  const reuseWeight = 0.3;
  const endOfLifeWeight = 0.3;

  const recyclingScore = getRecycledContentRate(recycledContent) / 100;
  const reuseScore = reuseRecyclingPotential / 100;
  
  // Use default end-of-life score since field is removed
  const endOfLifeScore = 0.7; // Assume moderate recycling scenario

  return (recyclingScore * recyclingWeight) + 
         (reuseScore * reuseWeight) + 
         (endOfLifeScore * endOfLifeWeight);
}

function calculateResourceEfficiency(inputData) {
  const { recycledContent, energyConsumption, transportDistance } = inputData;
  
  const baseEfficiency = 0.6;
  const recyclingBonus = (getRecycledContentRate(recycledContent) / 100) * 0.3;
  const processEfficiency = energyConsumption < 50 ? 0.1 : 0;
  const transportPenalty = transportDistance > 1000 ? -0.05 : 0;

  return Math.min(1.0, baseEfficiency + recyclingBonus + processEfficiency + transportPenalty);
}

function generateRecommendations(inputData) {
  const { recycledContent, transportDistance } = inputData;
  const recommendations = [];

  if (recycledContent === 'Ore') {
    recommendations.push('Consider using both or fully recycled materials for a 30-60% reduction in carbon footprint.');
  } else if (recycledContent === 'Both') {
    recommendations.push('Upgrade to fully recycled materials for an additional 30% reduction in environmental impact.');
  }

  if (transportDistance > 500) {
    recommendations.push('Optimize transport logistics to reduce emissions by 5-10%.');
  }

  // Add general recycling recommendation
  recommendations.push('Consider improving recycling processes to enhance circular economy performance.');

  if (recommendations.length === 0) {
    recommendations.push('Your current configuration shows excellent sustainability practices!');
  }

  return recommendations;
}

function generateFlowData(inputData) {
  const { recycledContent, reuseRecyclingPotential } = inputData;
  
  const recycledValue = getRecycledContentRate(recycledContent);
  const virginValue = 100 - recycledValue;
  const recyclingPotential = 70; // Default recycling potential
  const wasteValue = 100 - recyclingPotential;

  return [
    { source: 'Recycled Material', target: 'Product', value: recycledValue },
    { source: 'Virgin Material', target: 'Product', value: virginValue },
    { source: 'Product', target: 'Recycling Loop', value: recyclingPotential },
    { source: 'Product', target: 'Waste', value: wasteValue }
  ];
}

// Validation function
function validateLCAData(data) {
  const requiredFields = [
    'material',
    'recycledContent',
    'totalMass',
    'energySource',
    'transportDistance'
  ];

  const missingFields = requiredFields.filter(field => 
    data[field] === undefined || data[field] === null || data[field] === ''
  );

  if (missingFields.length > 0) {
    return {
      isValid: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  // Validate ranges
  const validRecycledContent = ['Ore', 'Both', 'Recycled'];
  if (!validRecycledContent.includes(data.recycledContent)) {
    return {
      isValid: false,
      message: 'Route must be one of: Ore, Both, Recycled'
    };
  }

  if (data.totalMass <= 0) {
    return {
      isValid: false,
      message: 'Total mass must be greater than 0'
    };
  }

  if (data.transportDistance < 0) {
    return {
      isValid: false,
      message: 'Transport distance cannot be negative'
    };
  }

  return { isValid: true };
}

// API Endpoint
app.post('/api/lca-report', async (req, res) => {
  try {
    console.log('Received LCA request:', req.body);

    // Validate input data
    const validation = validateLCAData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Invalid input data',
        message: validation.message
      });
    }

    // Simulate processing delay (like AI model inference)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Process data through simulated AI model
    const result = simulateAIModel(req.body);

    console.log('Generated LCA result:', result);

    // Return successful response
    res.status(200).json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing LCA request:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process LCA data'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'LCA Backend API'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong'
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LCA Backend Server running on port ${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api/lca-report`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;