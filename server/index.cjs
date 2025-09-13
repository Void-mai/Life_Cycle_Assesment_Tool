const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Enhanced ML Model Simulation with AI Recommendations
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
    'Amount (tons)': totalMass,
    'Transport Distance (km)': transportDistance,
    'Material_Aluminium': material === 'Aluminium' ? 1 : 0,
    'Material_Copper': material === 'Copper' ? 1 : 0,
    'Route_Ore': recycledContent === 'Ore' ? 1 : 0,
    'Route_Recycled': recycledContent === 'Recycled' ? 1 : 0,
    'Route_Both': recycledContent === 'Both' ? 1 : 0,
    'Energy Source_Coal': energySource === 'Coal' ? 1 : 0,
    'Energy Source_Electricity': energySource === 'Electricity' ? 1 : 0,
    'Energy Source_Both': energySource === 'Both' ? 1 : 0,
  };

  let carbonFootprint = 0;
  let circularityScore = 0;

  // Carbon Footprint Logic (based on your dataset patterns)
  if (modelInput['Route_Recycled'] === 1) {
    // Recycled route: very low carbon footprint
    if (modelInput['Energy Source_Electricity'] === 1) {
      carbonFootprint = modelInput['Material_Aluminium'] === 1 ? 
        0.89 + (modelInput['Transport Distance (km)'] * 0.0001) : // Aluminium + Electricity
        0.74 + (modelInput['Transport Distance (km)'] * 0.0001);   // Copper + Electricity
    } else if (modelInput['Energy Source_Coal'] === 1) {
      carbonFootprint = modelInput['Material_Aluminium'] === 1 ? 
        2.11 + (modelInput['Transport Distance (km)'] * 0.0002) : // Aluminium + Coal
        1.69 + (modelInput['Transport Distance (km)'] * 0.0002);   // Copper + Coal
    } else { // Both energy
      carbonFootprint = modelInput['Material_Aluminium'] === 1 ? 1.5 : 1.2;
    }
    circularityScore = 90 + Math.random() * 5; // 90-95 range
  } else if (modelInput['Route_Both'] === 1) {
    // Mixed route: medium carbon footprint
    if (modelInput['Energy Source_Electricity'] === 1) {
      carbonFootprint = modelInput['Material_Aluminium'] === 1 ? 
        8.64 + (modelInput['Transport Distance (km)'] * 0.0003) : // Aluminium + Electricity
        2.58 + (modelInput['Transport Distance (km)'] * 0.0002);   // Copper + Electricity
    } else if (modelInput['Energy Source_Coal'] === 1) {
      carbonFootprint = modelInput['Material_Aluminium'] === 1 ? 
        8.63 + (modelInput['Transport Distance (km)'] * 0.0003) : // Aluminium + Coal
        2.65 + (modelInput['Transport Distance (km)'] * 0.0002);   // Copper + Coal
    } else { // Both energy
      carbonFootprint = modelInput['Material_Aluminium'] === 1 ? 
        8.61 + (modelInput['Transport Distance (km)'] * 0.0003) : // Aluminium + Both
        2.64 + (modelInput['Transport Distance (km)'] * 0.0002);   // Copper + Both
    }
    circularityScore = 46 + Math.random() * 6; // 46-52 range
  } else { // Ore route
    // Virgin material: high carbon footprint
    if (modelInput['Energy Source_Electricity'] === 1) {
      carbonFootprint = modelInput['Material_Aluminium'] === 1 ? 
        8.57 + (modelInput['Transport Distance (km)'] * 0.0004) : // Aluminium + Electricity
        2.58 + (modelInput['Transport Distance (km)'] * 0.0003);   // Copper + Electricity
    } else if (modelInput['Energy Source_Coal'] === 1) {
      carbonFootprint = modelInput['Material_Aluminium'] === 1 ? 
        16.90 + (modelInput['Transport Distance (km)'] * 0.0005) : // Aluminium + Coal
        4.84 + (modelInput['Transport Distance (km)'] * 0.0004);    // Copper + Coal
    } else { // Both energy
      carbonFootprint = modelInput['Material_Aluminium'] === 1 ? 12.5 : 3.7;
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

// AI Recommendations Generator
function generateAIRecommendations(originalData, originalPrediction) {
  const recommendations = [];
  
  // Scenario 1: Switch to Recycled Route
  if (originalData.recycledContent !== 'Recycled') {
    const scenario1 = { ...originalData, recycledContent: 'Recycled' };
    const prediction1 = predictWithModel(scenario1);
    
    if (prediction1.carbonFootprint < originalPrediction.carbonFootprint) {
      const saving = ((originalPrediction.carbonFootprint - prediction1.carbonFootprint) / originalPrediction.carbonFootprint) * 100;
      recommendations.push(`Switch to recycled materials to save ${saving.toFixed(1)}% CO₂ emissions.`);
    }
    
    if (prediction1.circularityScore > originalPrediction.circularityScore) {
      const gain = prediction1.circularityScore - originalPrediction.circularityScore;
      recommendations.push(`Switching to recycled materials boosts circularity score by +${gain.toFixed(1)}.`);
    }
  }
  
  // Scenario 2: Switch to Electricity
  if (originalData.energySource !== 'Electricity') {
    const scenario2 = { ...originalData, energySource: 'Electricity' };
    const prediction2 = predictWithModel(scenario2);
    
    if (prediction2.carbonFootprint < originalPrediction.carbonFootprint) {
      const saving = ((originalPrediction.carbonFootprint - prediction2.carbonFootprint) / originalPrediction.carbonFootprint) * 100;
      recommendations.push(`Switch to electricity to save ${saving.toFixed(1)}% CO₂ emissions.`);
    }
    
    if (prediction2.circularityScore > originalPrediction.circularityScore) {
      const gain = prediction2.circularityScore - originalPrediction.circularityScore;
      recommendations.push(`Switching to electricity boosts circularity score by +${gain.toFixed(1)}.`);
    }
  }
  
  // Scenario 3: Reduce Transport Distance by 50%
  const scenario3 = { ...originalData, transportDistance: originalData.transportDistance * 0.5 };
  const prediction3 = predictWithModel(scenario3);
  
  if (prediction3.carbonFootprint < originalPrediction.carbonFootprint) {
    const saving = ((originalPrediction.carbonFootprint - prediction3.carbonFootprint) / originalPrediction.carbonFootprint) * 100;
    recommendations.push(`Reduce transport distance by 50% to save ${saving.toFixed(1)}% CO₂ emissions.`);
  }
  
  if (prediction3.circularityScore > originalPrediction.circularityScore) {
    const gain = prediction3.circularityScore - originalPrediction.circularityScore;
    recommendations.push(`Reducing transport distance boosts circularity score by +${gain.toFixed(1)}.`);
  }
  
  // Add general recommendations if no specific improvements found
  if (recommendations.length === 0) {
    recommendations.push('Your current configuration shows excellent sustainability practices!');
    recommendations.push('Consider monitoring emerging technologies for further optimization opportunities.');
  }
  
  return recommendations;
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

// Enhanced AI Model Function with Recommendations
function simulateAIModel(inputData) {
  // Get primary prediction
  const prediction = predictWithModel(inputData);
  const baseline = generateBaseline(inputData);
  
  // Generate AI recommendations based on scenario analysis
  const aiRecommendations = generateAIRecommendations(inputData, prediction);

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
    recommendations: aiRecommendations // Use AI-generated recommendations
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

function calculateResourceEfficiency(inputData) {
  const { recycledContent, transportDistance } = inputData;
  
  const baseEfficiency = 0.6;
  const recyclingBonus = (getRecycledContentRate(recycledContent) / 100) * 0.3;
  const transportPenalty = transportDistance > 1000 ? -0.05 : 0;

  return Math.min(1.0, baseEfficiency + recyclingBonus + transportPenalty);
}

function generateFlowData(inputData) {
  const { recycledContent } = inputData;
  
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

// Updated API Endpoint with AI Recommendations
app.post('/api/predict-lca', async (req, res) => {
  try {
    console.log('Received LCA prediction request:', req.body);

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

    // Process data through enhanced AI model with recommendations
    const result = simulateAIModel(req.body);

    console.log('Generated LCA result with AI recommendations:', result);

    // Return successful response
    res.status(200).json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing LCA prediction request:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process LCA prediction data'
    });
  }
});

// Keep backward compatibility with existing endpoint
app.post('/api/lca-report', async (req, res) => {
  // Redirect to new endpoint
  return app._router.handle(req, res, () => {
    req.url = '/api/predict-lca';
    app._router.handle(req, res);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'LCA Backend API with AI Recommendations'
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
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LCA Backend Server with AI Recommendations running on port ${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api/predict-lca`);
  console.log(`🤖 AI Recommendations: Enabled`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;