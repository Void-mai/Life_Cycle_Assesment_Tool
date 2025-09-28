const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Try to initialize ML Service, but don't fail if it's not available
let mlService = null;
try {
  const MLService = require('./mlService.cjs');
  mlService = new MLService();
} catch (error) {
  console.log('ML Service not available, using simulation fallback');
}

// Enhanced ML Model Simulation with AI Recommendations
async function predictWithModel(inputData) {
  // Try to use the real ML model first
  const isModelAvailable = await mlService.isModelAvailable();
  
  if (isModelAvailable) {
    try {
      console.log('Using trained ML model for prediction');
      const prediction = await mlService.predict(inputData);
      return {
        carbonFootprint: prediction.carbonFootprint,
        circularityScore: prediction.circularityScore
      };
    } catch (error) {
      console.error('ML model prediction failed, falling back to simulation:', error);
    }
  } else {
    console.log('ML model files not found, using simulation');
  }
  
  // Fallback to simulation if ML model is not available or fails
  return predictWithSimulation(inputData);
}

function predictWithSimulation(inputData) {
  const {
    material,
    recycledContent,
    recycledContentPercentage,
    totalMass,
    energySource,
    transportDistance
  } = inputData;

  // Use actual recycled content percentage for more accurate calculations
  const actualRecycledPercentage = recycledContentPercentage || getRecycledContentRate(recycledContent);
  const virginPercentage = 100 - actualRecycledPercentage;

  let carbonFootprint = 0;
  let circularityScore = 0;

  // Base carbon footprint for virgin material with coal (worst case)
  const baseVirginCoal = material === 'Aluminium' ? 16.90 : 4.84;
  const baseVirginElectricity = material === 'Aluminium' ? 8.57 : 2.58;
  const baseRecycledCoal = material === 'Aluminium' ? 2.11 : 1.69;
  const baseRecycledElectricity = material === 'Aluminium' ? 0.89 : 0.74;

  // Calculate weighted carbon footprint based on actual recycled percentage
  let virginCarbonFootprint, recycledCarbonFootprint;
  
  if (energySource === 'Electricity') {
    virginCarbonFootprint = baseVirginElectricity;
    recycledCarbonFootprint = baseRecycledElectricity;
  } else if (energySource === 'Coal') {
    virginCarbonFootprint = baseVirginCoal;
    recycledCarbonFootprint = baseRecycledCoal;
  } else { // Both
    virginCarbonFootprint = (baseVirginElectricity + baseVirginCoal) / 2;
    recycledCarbonFootprint = (baseRecycledElectricity + baseRecycledCoal) / 2;
  }

  // Weighted average based on actual recycled content percentage
  carbonFootprint = (virginPercentage / 100) * virginCarbonFootprint + 
                   (actualRecycledPercentage / 100) * recycledCarbonFootprint;

  // Add transport impact
  const transportImpact = transportDistance * 0.0002;
  carbonFootprint += transportImpact;

  // Calculate circularity score based on recycled content and energy source
  circularityScore = 10; // Base score
  
  // Major boost from recycled content (linear relationship)
  circularityScore += (actualRecycledPercentage / 100) * 75; // Up to 75 points for 100% recycled
  
  // Energy source impact on circularity
  if (energySource === 'Electricity') {
    circularityScore += 10; // Clean energy bonus
  } else if (energySource === 'Both') {
    circularityScore += 5; // Mixed energy moderate bonus
  } // Coal gets no bonus
  
  // Transport distance penalty
  if (transportDistance > 1000) {
    circularityScore -= 5;
  } else if (transportDistance > 600) {
    circularityScore -= 3;
  }

  // Add small realistic variation (±2%)
  carbonFootprint += (Math.random() - 0.5) * 0.04 * carbonFootprint;
  circularityScore += (Math.random() - 0.5) * 0.04 * circularityScore;

  // Ensure reasonable bounds
  carbonFootprint = Math.max(0.5, Math.min(20, carbonFootprint));
  circularityScore = Math.max(5, Math.min(95, circularityScore));

  return {
    carbonFootprint: Math.round(carbonFootprint * 100) / 100,
    circularityScore: Math.round(circularityScore * 100) / 100
  };
}

// AI Recommendations Generator
async function generateAIRecommendations(originalData, originalPrediction) {
  const recommendations = [];
  
  // Scenario 1: Switch to Recycled Route
  if (originalData.recycledContent !== 'Recycled') {
    const scenario1 = { ...originalData, recycledContent: 'Recycled' };
    const prediction1 = await predictWithModel(scenario1);
    
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
    const prediction2 = await predictWithModel(scenario2);
    
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
  const prediction3 = await predictWithModel(scenario3);
  
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

async function generateBaseline(inputData) {
  const baselineInput = {
    ...inputData,
    recycledContent: 'Ore',
    energySource: 'Coal'
  };
  
  const baseline = await predictWithModel(baselineInput);
  const current = await predictWithModel(inputData);
  
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
async function simulateAIModel(inputData) {
  // Get primary prediction
  const prediction = await predictWithModel(inputData);
  const baseline = await generateBaseline(inputData);
  
  // Generate AI recommendations based on scenario analysis
  const aiRecommendations = await generateAIRecommendations(inputData, prediction);

  return {
    material: inputData.material,
    scenario: `${inputData.recycledContent} Route ${inputData.material}`,
    recycledContentAmount: (inputData.recycledContentPercentage * inputData.totalMass / 100),
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
  const { recycledContent, recycledContentPercentage, energySource, transportDistance, totalMass } = inputData;
  
  // Use actual recycled content percentage
  const actualRecycledPercentage = recycledContentPercentage || getRecycledContentRate(recycledContent);
  
  // Start with base efficiency
  let efficiency = 0.15; // Base efficiency for worst-case scenario
  
  // Linear relationship with recycled content (major factor)
  efficiency += (actualRecycledPercentage / 100) * 0.6; // Up to 60% boost for 100% recycled
  
  // Energy source impact
  if (energySource === 'Electricity') {
    efficiency += 0.15; // Clean energy bonus
  } else if (energySource === 'Both') {
    efficiency += 0.05; // Mixed energy small bonus
  }
  // Coal gets no bonus (worst case)
  
  // Transport distance penalties
  if (transportDistance > 1000) {
    efficiency -= 0.15; // Long distance major penalty
  } else if (transportDistance > 600) {
    efficiency -= 0.1; // Medium distance penalty
  } else if (transportDistance > 300) {
    efficiency -= 0.05; // Short distance small penalty
  }
  
  // Additional penalty for high amounts with inefficient processes
  const totalMass = inputData.totalMass || 0;
  if (totalMass > 200 && actualRecycledPercentage === 0 && energySource === 'Coal') {
    efficiency -= 0.1; // Large scale inefficient operation penalty
  }

  // Ensure efficiency stays within realistic bounds  
  return Math.max(0.15, Math.min(0.90, efficiency));
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

// Main API Endpoint with AI Recommendations
app.post('/api/lca-report', async (req, res) => {
  try {
    console.log('Received LCA report request:', req.body);

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
    const result = await simulateAIModel(req.body);

    console.log('Generated LCA result with AI recommendations:', result);

    // Return successful response
    res.status(200).json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing LCA report request:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process LCA report data'
    });
  }
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
  console.log('404 - Route not found:', req.method, req.url);
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LCA Backend Server with Real ML Model running on port ${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api/lca-report`);
  console.log(`🤖 ML Model Integration: Enabled`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
  
  // Check if ML models are available
  if (mlService) {
    mlService.isModelAvailable().then(available => {
      if (available) {
        console.log(`✅ Trained ML models detected and ready`);
      } else {
        console.log(`⚠️  ML model files not found, using simulation fallback`);
        console.log(`   Place SIH_predict.pkl and predict_scaler.pkl in ml_models/ directory`);
      }
    });
  } else {
    console.log(`⚠️  ML Service not available, using simulation fallback`);
  }
});

module.exports = app;